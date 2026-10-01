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
import { parse as parseYaml } from "@std/yaml";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import {
  BUILD_DEFINITION,
  FACTORY_TYPE,
  type SwampRepo,
  withRepo,
} from "../harness.ts";

// ---------------------------------------------------------------------------
// The studio's serve method through the installed swamp CLI: it starts on a
// free port, serves the page and the files, pushes an edit made on disk over
// server-sent events, refuses a foreign Host and a symlink out of the repo on
// the real server, and ends cleanly on Ctrl-C.
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

Deno.test("studio: serve shows the files, reloads an edit, refuses strangers, and stops on Ctrl-C", async () => {
  await withRepo(async (repo) => {
    await repo.factory(
      "team",
      parseYaml(await Deno.readTextFile(BUILD_DEFINITION)),
    );
    const outside = await Deno.makeTempDir({ prefix: "gatorwalk-outside-" });
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
      assertMatch(await page.text(), /GATORWALK/);

      // The factory list and the definition file.
      const list = await (await fetch(`${base}/api/factories`)).json();
      assertEquals(list, {
        factories: [{ name: "team", path: "factories/team.yaml" }],
      });
      const before = await (await fetch(`${base}/api/factories/team`)).json();
      assertEquals(
        before.text,
        await Deno.readTextFile(join(repo.dir, "factories/team.yaml")),
      );

      // An edit on disk arrives as an event, and the new text reads back.
      const events = await fetch(`${base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        assertEquals((await reader.read()).value, ": connected\n\n");
        const edited = `${before.text}\n# edited by the agent\n`;
        await Deno.writeTextFile(join(repo.dir, "factories/team.yaml"), edited);
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

      // A scenario symlinked out of the repo is refused on the real file system.
      await Deno.writeTextFile(join(outside, "secret.yaml"), "secret: true\n");
      await Deno.mkdir(join(repo.dir, "scenarios/team"), { recursive: true });
      await Deno.symlink(
        join(outside, "secret.yaml"),
        join(repo.dir, "scenarios/team/sneaky.yaml"),
      );
      const sneaky = await fetch(`${base}/api/factories/team/scenarios/sneaky`);
      assertEquals(sneaky.status, 403);
      assert(!(await sneaky.text()).includes("secret: true"));

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
      await Deno.remove(outside, { recursive: true });
    }
  });
});

Deno.test("studio: a definition whose directory does not exist yet is picked up when it appears", async () => {
  await withRepo(async (repo) => {
    // The factory names a file in a directory nobody has made yet.
    await repo.swamp([
      "model",
      "create",
      FACTORY_TYPE,
      "later",
      "--global-arg",
      "definition=teams/later/factory.yaml",
      "--global-arg",
      "tracker=board",
      "--json",
    ]);
    const { child, stdout, stderr, output } = await serve(repo);
    try {
      const [, base] = await within(
        120_000,
        "the logged studio URL",
        stdout.match(/studio: (http:\/\/127\.0\.0\.1:\d+)\//),
      );
      const missing = await fetch(`${base}/api/factories/later`);
      assertEquals(missing.status, 422, output());
      await missing.body?.cancel();

      const events = await fetch(`${base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        await reader.read();
        await Deno.mkdir(join(repo.dir, "teams/later"), { recursive: true });
        await Deno.writeTextFile(
          join(repo.dir, "teams/later/factory.yaml"),
          await Deno.readTextFile(BUILD_DEFINITION),
        );
        let seen = "";
        while (!seen.includes('"factory":"later"')) {
          const { value, done } = await within(
            10_000,
            "the change event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
      } finally {
        await reader.cancel();
      }
      const found = await fetch(`${base}/api/factories/later`);
      assertEquals(found.status, 200);
      assertEquals(
        (await found.json()).text,
        await Deno.readTextFile(BUILD_DEFINITION),
      );
    } finally {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([stdout.done, stderr.done]);
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
          parseYaml(await Deno.readTextFile(BUILD_DEFINITION)),
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
        factories: [{ name: "team", path: "factories/team.yaml" }],
      });
    } finally {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([stdout.done, stderr.done]);
    }
  });
});

Deno.test("studio: a definition path through a symlink out of the repo is never watched", async () => {
  await withRepo(async (repo) => {
    // link/ leads out of the repo, where sub/ exists; x.yaml does not yet.
    const outside = await Deno.makeTempDir({ prefix: "gatorwalk-outside-" });
    await Deno.mkdir(join(outside, "sub"));
    await Deno.symlink(outside, join(repo.dir, "link"));
    await repo.swamp([
      "model",
      "create",
      FACTORY_TYPE,
      "escape",
      "--global-arg",
      "definition=link/sub/x.yaml",
      "--global-arg",
      "tracker=board",
      "--json",
    ]);
    await repo.factory(
      "team",
      parseYaml(await Deno.readTextFile(BUILD_DEFINITION)),
    );
    const { child, stdout, stderr } = await serve(repo);
    try {
      const [, base] = await within(
        120_000,
        "the logged studio URL",
        stdout.match(/studio: (http:\/\/127\.0\.0\.1:\d+)\//),
      );
      const events = await fetch(`${base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        await reader.read();
        // A write outside the repo, through the link, says nothing ...
        await Deno.writeTextFile(join(outside, "sub/x.yaml"), "x: 1\n");
        // ... and a write inside it does, so the stream is known to work.
        const path = join(repo.dir, "factories/team.yaml");
        await Deno.writeTextFile(
          path,
          `${await Deno.readTextFile(path)}\n# edited\n`,
        );
        let seen = "";
        while (!seen.includes('"factory":"team"')) {
          const { value, done } = await within(
            10_000,
            "the change event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
        assert(!seen.includes('"factory":"escape"'), seen);
      } finally {
        await reader.cancel();
      }
      // And the file itself is refused.
      const read = await fetch(`${base}/api/factories/escape`);
      assertEquals(read.status, 422);
      assertMatch((await read.json()).error, /outside the repo/);
    } finally {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([stdout.done, stderr.done]);
      await Deno.remove(outside, { recursive: true });
    }
  });
});
