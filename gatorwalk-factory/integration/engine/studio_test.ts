// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals, assertMatch } from "@std/assert";
import { join } from "@std/path";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import {
  BUILD_DEFINITION,
  readExample,
  type SwampRepo,
  withRepo,
} from "../harness.ts";

// ---------------------------------------------------------------------------
// The studio's serve method through the installed swamp CLI: it starts on a
// free port, serves the page and each factory's model definition file, pushes
// an edit made on disk over server-sent events, refuses a foreign Host on the
// real server, and ends cleanly on Ctrl-C.
// ---------------------------------------------------------------------------

const decoder = new TextDecoder();

/** Collects a stream's text, and resolves the first match of a pattern. */
function watchOutput(stream: ReadableStream<Uint8Array>) {
  let text = "";
  const waiters: { pattern: RegExp; resolve: (m: RegExpMatchArray) => void }[] =
    [];
  const done = (async () => {
    for await (const chunk of stream) {
      text += decoder.decode(chunk, { stream: true });
      for (const w of [...waiters]) {
        const m = text.match(w.pattern);
        if (m !== null) {
          waiters.splice(waiters.indexOf(w), 1);
          w.resolve(m);
        }
      }
    }
  })();
  return {
    text: () => text,
    done,
    match(pattern: RegExp): Promise<RegExpMatchArray> {
      const m = text.match(pattern);
      if (m !== null) return Promise.resolve(m);
      return new Promise((resolve) => waiters.push({ pattern, resolve }));
    },
  };
}

async function within<T>(ms: number, what: string, p: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      p,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`timed out: ${what}`)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/** A raw request, so the Host header is exactly what the test says. */
async function rawGet(
  port: number,
  path: string,
  host: string,
): Promise<string> {
  const conn = await Deno.connect({ hostname: "127.0.0.1", port });
  try {
    await conn.write(
      new TextEncoder().encode(
        `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nConnection: close\r\n\r\n`,
      ),
    );
    let out = "";
    const buf = new Uint8Array(4096);
    for (;;) {
      const n = await conn.read(buf);
      if (n === null) break;
      out += decoder.decode(buf.subarray(0, n));
    }
    return out;
  } finally {
    conn.close();
  }
}

async function serve(repo: SwampRepo) {
  await repo.swamp(["model", "create", STUDIO_TYPE, "studio", "--json"]);
  const child = repo.spawn([
    "model",
    "method",
    "run",
    "studio",
    "serve",
    "--input",
    "port=0",
  ]);
  const stdout = watchOutput(child.stdout);
  const stderr = watchOutput(child.stderr);
  const output = () => `${stdout.text()}\n${stderr.text()}`;
  return { child, stdout, stderr, output };
}

Deno.test("studio: serve shows the factory's model definition file, reloads an edit, refuses strangers, and stops on Ctrl-C", async () => {
  await withRepo(async (repo) => {
    const { definition, scenarios } = await readExample(BUILD_DEFINITION);
    await repo.factory("team", definition, { scenarios });
    const file = repo.factoryFile("team");
    const { child, stdout, stderr, output } = await serve(repo);
    let exited = false;
    try {
      const [, base, portText] = await within(
        120_000,
        "the logged studio URL",
        Promise.race([
          stdout.match(/studio: (http:\/\/127\.0\.0\.1:(\d+))\//),
          child.status.then((s) => {
            throw new Error(
              `serve exited ${s.code} before listening:\n${output()}`,
            );
          }),
        ]),
      );
      const port = Number(portText);

      // The page, with its CSP.
      const page = await fetch(`${base}/`);
      assertEquals(page.status, 200);
      assertMatch(
        page.headers.get("content-security-policy") ?? "",
        /default-src 'self'/,
      );
      assertMatch(await page.text(), /src="\/assets\/app\.js"/);

      // The page's files, from the three generated modules: the script (the
      // engine and Design mode), the styles, and a font.
      const assetOf = async (name: string, type: RegExp, body?: RegExp) => {
        const res = await fetch(`${base}/assets/${name}`);
        assertEquals(res.status, 200, name);
        assertMatch(res.headers.get("content-type") ?? "", type);
        const text = await res.text();
        if (body !== undefined) assertMatch(text, body);
      };
      await assetOf("app.js", /^text\/javascript/, /GATORWALK/);
      await assetOf("studio.css", /^text\/css/, /\.canvas/);
      await assetOf(
        "fonts/orbitron-latin-700-normal.woff2",
        /^font\/woff2$/,
      );

      // The factory list and its model definition file, which swamp's
      // definition repository names.
      const list = await (await fetch(`${base}/api/factories`)).json();
      assertEquals(list, { factories: [{ name: "team", path: file }] });
      const before = await (await fetch(`${base}/api/factories/team`)).json();
      assertEquals(before.text, await Deno.readTextFile(join(repo.dir, file)));

      // An edit on disk arrives as an event, and the new text reads back.
      const events = await fetch(`${base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        assertEquals((await reader.read()).value, ": connected\n\n");
        const edited = `${before.text}\n# edited by the agent\n`;
        await Deno.writeTextFile(join(repo.dir, file), edited);
        let seen = "";
        while (!seen.includes('"kind":"definition"')) {
          const { value, done } = await within(
            10_000,
            "the change event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
        assertMatch(seen, /data: \{"kind":"definition","factory":"team"\}/);
        const after = await (await fetch(`${base}/api/factories/team`)).json();
        assertEquals(after.text, edited);
        assert(after.digest !== before.digest);
      } finally {
        await reader.cancel();
      }

      // A foreign Host is refused (DNS rebinding); the right one is not.
      assertMatch(
        await rawGet(port, "/api/factories", `evil.example:${port}`),
        /^HTTP\/1\.1 403/,
      );
      assertMatch(
        await rawGet(port, "/api/factories", `localhost:${port}`),
        /^HTTP\/1\.1 200/,
      );

      // Scenarios are in the same file; there is no route of their own.
      const scenarioRoute = await fetch(`${base}/api/factories/team/scenarios`);
      assertEquals(scenarioRoute.status, 404);
      await scenarioRoute.body?.cancel();

      // Ctrl-C ends the method cleanly, event streams and all.
      const open = await fetch(`${base}/api/events`);
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      exited = true;
      await open.body?.cancel().catch(() => {});
      await Promise.all([stdout.done, stderr.done]);
      // The method returns normally; swamp itself exits non-zero after an
      // interrupt, so the exit code says nothing about the method.
      assertMatch(output(), /serve on studio succeeded/);
    } finally {
      if (!exited) {
        try {
          child.kill("SIGKILL");
        } catch {
          // Already gone.
        }
        await child.status;
        await Promise.all([stdout.done, stderr.done]).catch(() => {});
      }
    }
  });
});

Deno.test("studio: a factory created while the studio runs is listed without a reload", async () => {
  await withRepo(async (repo) => {
    const { child, stdout, stderr } = await serve(repo);
    try {
      const [, base] = await within(
        120_000,
        "the logged studio URL",
        stdout.match(/studio: (http:\/\/127\.0\.0\.1:\d+)\//),
      );
      assertEquals(await (await fetch(`${base}/api/factories`)).json(), {
        factories: [],
      });
      const events = await fetch(`${base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        await reader.read();
        await repo.factory(
          "team",
          (await readExample(BUILD_DEFINITION)).definition,
        );
        let seen = "";
        while (!seen.includes('"kind":"factories"')) {
          const { value, done } = await within(
            15_000,
            "the factories event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
      } finally {
        await reader.cancel();
      }
      assertEquals(await (await fetch(`${base}/api/factories`)).json(), {
        factories: [{ name: "team", path: repo.factoryFile("team") }],
      });
    } finally {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([stdout.done, stderr.done]);
    }
  });
});
