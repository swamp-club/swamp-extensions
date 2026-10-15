// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals, assertMatch } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import {
  BUILD_DEFINITION,
  readExample,
  type SwampRepo,
  withRepo,
} from "../harness.ts";

// ---------------------------------------------------------------------------
// The studio reading a remote serve (swamp-club #3363) through the installed
// swamp CLI: one repo holds a factory and a work item behind `swamp serve`;
// the studio runs in a second repo with server set, lists and shows the
// remote factory, reads its board, hears of a definition changed on the
// serve on its slow poll, and ends on Ctrl-C.
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

/** A free port on 127.0.0.1, for swamp serve, which takes no port 0. */
function freePort(): number {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  const { port } = listener.addr as Deno.NetAddr;
  listener.close();
  return port;
}

/** Ends a spawned swamp, by SIGINT, then SIGKILL if it lingers. */
async function stop(
  child: Deno.ChildProcess,
  outputs: { done: Promise<void> }[],
): Promise<void> {
  try {
    child.kill("SIGINT");
    await within(30_000, "swamp to exit", child.status);
  } catch {
    try {
      child.kill("SIGKILL");
    } catch {
      // Already gone.
    }
    await child.status;
  }
  await Promise.all(outputs.map((o) => o.done)).catch(() => {});
}

/** swamp serve in `repo`, without authentication, until stopped. */
async function swampServe(repo: SwampRepo) {
  const port = freePort();
  const child = repo.spawn([
    "serve",
    "--port",
    String(port),
    "--auth-mode",
    "none",
  ]);
  const stdout = watchOutput(child.stdout);
  const stderr = watchOutput(child.stderr);
  const url = `http://127.0.0.1:${port}`;
  const ready = (async () => {
    for (;;) {
      try {
        const res = await fetch(`${url}/ready`);
        await res.body?.cancel();
        if (res.ok) return;
      } catch {
        // Not listening yet.
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  })();
  await within(
    120_000,
    "swamp serve to be ready",
    Promise.race([
      ready,
      child.status.then((s) => {
        throw new Error(
          `swamp serve exited ${s.code}:\n${stdout.text()}\n${stderr.text()}`,
        );
      }),
    ]),
  );
  return { child, url, outputs: [stdout, stderr] };
}

Deno.test("studio: with server set, serve shows a remote serve's factory and board, hears a change, and stops on Ctrl-C", async () => {
  await withRepo(async (served) => {
    const { definition, scenarios } = await readExample(BUILD_DEFINITION);
    await served.factory("team", definition, { scenarios });
    await served.workItem("team-1", "start", { factory: "team" });
    const remote = await swampServe(served);
    try {
      await withRepo(async (local) => {
        await local.swamp(["model", "create", STUDIO_TYPE, "studio", "--json"]);
        const child = local.spawn([
          "model",
          "method",
          "run",
          "studio",
          "serve",
          "--input",
          "port=0",
          "--input",
          `server=${remote.url}`,
        ]);
        const stdout = watchOutput(child.stdout);
        const stderr = watchOutput(child.stderr);
        const output = () => `${stdout.text()}\n${stderr.text()}`;
        let exited = false;
        try {
          const [, base] = await within(
            120_000,
            "the logged studio URL",
            Promise.race([
              stdout.match(/studio: (http:\/\/127\.0\.0\.1:\d+)\//),
              child.status.then((s) => {
                throw new Error(
                  `serve exited ${s.code} before listening:\n${output()}`,
                );
              }),
            ]),
          );
          await within(
            10_000,
            "the logged remote server",
            stdout.match(new RegExp(`reading ${remote.url}`)),
          );

          // The served repo's factory, not this repo's (it has none).
          const list = await (await fetch(`${base}/api/factories`)).json();
          assertEquals(list, {
            factories: [{ name: "team", path: `team on ${remote.url}` }],
          });
          const before = await (await fetch(`${base}/api/factories/team`))
            .json();
          const file = parseYaml(before.text) as {
            name: string;
            globalArguments: { definition: unknown; scenarios: unknown };
          };
          assertEquals(file.name, "team");
          assertEquals(file.globalArguments.scenarios, scenarios);

          // The board reads the served repo's work item.
          const board = await (await fetch(
            `${base}/api/work-items?factory=team`,
          )).json();
          assertEquals(board.problems, []);
          assertEquals(
            (board.items as { key: string }[]).map((c) => c.key),
            ["team-1"],
          );
          const item = await fetch(`${base}/api/work-items/team-1`);
          assertEquals(item.status, 200);
          await item.body?.cancel();

          // A definition changed on the serve arrives on the next poll.
          const events = await fetch(`${base}/api/events`);
          const reader = events.body!.pipeThrough(new TextDecoderStream())
            .getReader();
          try {
            assertEquals((await reader.read()).value, ": connected\n\n");
            await served.editFactory("team", {
              ...definition,
              description: "changed on the serve",
            });
            let seen = "";
            while (!seen.includes('"kind":"definition"')) {
              const { value, done } = await within(
                60_000,
                "the remote change event",
                reader.read(),
              );
              if (done) {
                throw new Error(`the event stream ended; saw:\n${seen}`);
              }
              seen += value;
            }
            assertMatch(seen, /data: \{"kind":"definition","factory":"team"\}/);
            const after = await (await fetch(`${base}/api/factories/team`))
              .json();
            assert(after.digest !== before.digest);
            assertMatch(after.text, /changed on the serve/);
          } finally {
            await reader.cancel();
          }

          // Ctrl-C ends the method cleanly.
          child.kill("SIGINT");
          await within(30_000, "serve to exit", child.status);
          exited = true;
          await Promise.all([stdout.done, stderr.done]);
          assertMatch(output(), /serve on studio succeeded/);
        } finally {
          if (!exited) await stop(child, [stdout, stderr]);
        }
      });
    } finally {
      await stop(remote.child, remote.outputs);
    }
  });
});
