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

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { type SwampRepo, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// A built-in ticket related to one in another repository's tracker, on the real
// engine: two temp repos, read by path and through a real swamp serve with a
// token minted there and held in a vault of the reading repo. Nothing but the
// two temp repos and a serve on this machine is touched.
// ---------------------------------------------------------------------------

interface RelationEntry {
  issue: string;
  display: string;
  type: string;
  direction: string;
  external: boolean;
  state: string;
  status?: string;
  reason?: string;
}

async function tracker(
  repo: SwampRepo,
  name: string,
  prefix: string,
  peers?: unknown,
) {
  const { stdout } = await repo.swamp([
    "behavior",
    "create",
    BUILTIN_TYPE,
    name,
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = {
    prefix,
    ...(peers === undefined ? {} : { peers }),
  };
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

const run = (
  repo: SwampRepo,
  name: string,
  method: string,
  inputs: Record<string, string>,
) =>
  repo.swamp([
    "behavior",
    "run",
    name,
    method,
    ...Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]),
  ]);

/** A ticket, and what fetch_issue now records of its relations. */
async function fetched(
  repo: SwampRepo,
  name: string,
  issue: string,
): Promise<RelationEntry[]> {
  await run(repo, name, "fetch_issue", { issue });
  const record = await repo.data(name, `relations-${issue}`);
  return record.relations as RelationEntry[];
}

const file = (repo: SwampRepo, name: string, prefix: string) =>
  run(repo, name, "create", {
    title: `${prefix} ticket`,
    body: "b",
    type: "bug",
  });

Deno.test("external relations: across two repositories by path, recorded, read as the ticket moves, and removed", async () => {
  await withRepo(async (other) => {
    await tracker(other, "devswamp", "devswamp");
    await file(other, "devswamp", "devswamp");
    await withRepo(async (repo) => {
      await tracker(repo, "ops-tracker", "ops", {
        devswamp: { repo: other.dir },
        gone: { repo: `${other.dir}/nowhere` },
      });
      await file(repo, "ops-tracker", "ops");

      // The issue's command, with the reference qualified.
      await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "blocked_by",
        to: "devswamp:devswamp-1",
      });
      const ticket = await repo.data("ops-tracker", "issue-ops-1");
      assertEquals(ticket.relations, [{
        type: "blocked_by",
        direction: "outgoing",
        issue: "devswamp:devswamp-1",
        display: "devswamp:devswamp-1",
      }]);
      // The other ticket is not written to.
      const theirs = await other.data("devswamp", "issue-devswamp-1");
      assertEquals(theirs.relations, []);

      let [entry] = await fetched(repo, "ops-tracker", "ops-1");
      assertEquals(
        [entry.external, entry.state, entry.status],
        [true, "resolved", "open"],
      );

      // The other ticket moves, and the next read shows it.
      await run(other, "devswamp", "set_status", {
        issue: "devswamp-1",
        status: "shipped",
      });
      [entry] = await fetched(repo, "ops-tracker", "ops-1");
      assertEquals(entry.status, "shipped");

      // Unreachable, or no such ticket: recorded anyway, and says why.
      const { output } = await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "related_to",
        to: "gone:x-1",
      });
      assert(output.includes("unrelate"), output);
      await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "related_to",
        to: "devswamp:devswamp-99",
      });
      await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "related_to",
        to: "nobody:x-1",
      });
      const all = await fetched(repo, "ops-tracker", "ops-1");
      assertEquals(
        all.map((r) => [r.issue, r.state, r.reason]),
        [
          ["devswamp:devswamp-1", "resolved", undefined],
          ["gone:x-1", "unresolved", "unreachable"],
          ["devswamp:devswamp-99", "unresolved", "not_found"],
          ["nobody:x-1", "unresolved", "no_peer"],
        ],
      );

      // The shipped workflow records it too.
      await repo.swamp([
        "workflow",
        "run",
        "@swamp/stagecraft/fetch-issue",
        "--input",
        "tracker=ops-tracker",
        "--input",
        "issue=ops-1",
      ]);
      const viaWorkflow = await repo.data("ops-tracker", "relations-ops-1");
      assertEquals((viaWorkflow.relations as unknown[]).length, 4);

      await run(repo, "ops-tracker", "unrelate", {
        issue: "ops-1",
        type: "blocked_by",
        to: "devswamp:devswamp-1",
      });
      const after = await fetched(repo, "ops-tracker", "ops-1");
      assertEquals(after.some((r) => r.issue === "devswamp:devswamp-1"), false);

      // A local relation stays on both tickets, and is in the record too.
      await file(repo, "ops-tracker", "ops");
      await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "blocked_by",
        to: "ops-2",
      });
      const second = await repo.data("ops-tracker", "issue-ops-2");
      assertEquals(
        (second.relations as { direction: string }[])[0].direction,
        "incoming",
      );
      const local = (await fetched(repo, "ops-tracker", "ops-1")).find((r) =>
        r.issue === "ops-2"
      );
      assertEquals([local?.external, local?.status], [false, "open"]);

      // A local ticket that does not exist is still refused, as it always was.
      const refused = await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "related_to",
        to: "devswamp-1",
      }).catch((error: Error) => error.message);
      assert(
        String(refused).includes("no ticket 'devswamp-1'"),
        String(refused),
      );
    });
  });
});

Deno.test("external relations: two repositories that both call their tracker board stay apart", async () => {
  await withRepo(async (other) => {
    await tracker(other, "board", "board");
    await file(other, "board", "board");
    await run(other, "board", "set_status", {
      issue: "board-1",
      status: "shipped",
    });
    await withRepo(async (repo) => {
      await tracker(repo, "board", "board", { board: { repo: other.dir } });
      await tracker(repo, "ops", "ops", {
        theirs: { repo: other.dir, instance: "board" },
      });
      await file(repo, "board", "board");
      await file(repo, "board", "board");
      await run(repo, "board", "relate", {
        issue: "board-2",
        type: "blocked_by",
        to: "board:board-1",
      });
      // Its own board-1, still open, is not what it is blocked by.
      assertEquals((await repo.data("board", "issue-board-1")).relations, []);
      const [entry] = await fetched(repo, "board", "board-2");
      assertEquals([entry.external, entry.status], [true, "shipped"]);

      // Under another name, too.
      await file(repo, "ops", "ops");
      await run(repo, "ops", "relate", {
        issue: "ops-1",
        type: "blocked_by",
        to: "theirs:board-1",
      });
      const [named] = await fetched(repo, "ops", "ops-1");
      assertEquals([named.external, named.status], [true, "shipped"]);
    });
  });
});

Deno.test("external relations: another instance in the same repository needs no configuration", async () => {
  await withRepo(async (repo) => {
    await tracker(repo, "one", "one");
    await tracker(repo, "two", "two");
    await file(repo, "one", "one");
    await file(repo, "two", "two");
    await run(repo, "one", "relate", {
      issue: "one-1",
      type: "blocked_by",
      to: "two:two-1",
    });
    const [entry] = await fetched(repo, "one", "one-1");
    assertEquals([entry.state, entry.status], ["resolved", "open"]);
    // And the other instance's ticket shows nothing of it.
    assertEquals((await repo.data("two", "issue-two-1")).relations, []);
  });
});

Deno.test("external relations: a peer that accepts and never answers times out, and the reason says so", async () => {
  // Takes connections and says nothing, as a hung serve does.
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  const held: Deno.Conn[] = [];
  const accepting = (async () => {
    try {
      for await (const conn of listener) held.push(conn);
    } catch {
      // Closed below.
    }
  })();
  const { port } = listener.addr as Deno.NetAddr;
  try {
    await withRepo(async (repo) => {
      await tracker(repo, "ops-tracker", "ops", {
        hung: { server: `http://127.0.0.1:${port}` },
      });
      await file(repo, "ops-tracker", "ops");
      await run(repo, "ops-tracker", "relate", {
        issue: "ops-1",
        type: "blocked_by",
        to: "hung:x-1",
      });
      const [entry] = await fetched(repo, "ops-tracker", "ops-1");
      assertEquals([entry.state, entry.reason], ["unresolved", "timeout"]);
    });
  } finally {
    listener.close();
    for (const conn of held) conn.close();
    await accepting;
  }
});

/** A port nothing is listening on, to give to swamp serve. */
function freePort(): number {
  const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
  const { port } = listener.addr as Deno.NetAddr;
  listener.close();
  return port;
}

async function waitReady(url: string): Promise<void> {
  for (let n = 0; n < 240; n++) {
    try {
      const res = await fetch(`${url}/ready`);
      await res.body?.cancel();
      if (res.ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`serve at ${url} never became ready`);
}

Deno.test("external relations: through a real serve, with a token from a vault that never shows", async () => {
  await withRepo(async (other) => {
    await tracker(other, "devswamp", "devswamp");
    await file(other, "devswamp", "devswamp");
    await other.swamp([
      "access",
      "token",
      "mint",
      "reader",
      "--principal",
      "user:reader",
    ]);
    await other.swamp([
      "access",
      "grant",
      "create",
      "--subject",
      "user:reader",
      "--allow",
      "read",
      "--on",
      "data:*",
    ]);
    const { stdout: revealed } = await other.swamp([
      "access",
      "token",
      "reveal",
      "reader",
      "--json",
    ]);
    const token = (JSON.parse(revealed) as { token: string }).token;
    const port = freePort();
    const url = `http://127.0.0.1:${port}`;
    const serve = other.spawn([
      "serve",
      "--auth-mode",
      "token",
      "--admins",
      "user:nobody",
      "--port",
      String(port),
      "--no-schedule",
    ]);
    const drained = Promise.all([
      serve.stdout.pipeTo(new WritableStream()),
      serve.stderr.pipeTo(new WritableStream()),
    ]);
    let stopped = false;
    const stop = async () => {
      if (stopped) return;
      stopped = true;
      serve.kill("SIGINT");
      await serve.status;
      await drained;
    };
    try {
      await waitReady(url);
      await withRepo(async (repo) => {
        await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
        await repo.swamp(["vault", "put", "secrets", "good", token]);
        await repo.swamp(["vault", "put", "secrets", "bad", "reader.wrong"]);
        await tracker(repo, "ops-tracker", "ops", {
          devswamp: {
            server: url,
            token: "${{ vault.get(secrets, good) }}",
          },
          badtoken: {
            server: url,
            token: "${{ vault.get(secrets, bad) }}",
          },
          // No token and no stored login for this address.
          nologin: { server: url },
        });
        await file(repo, "ops-tracker", "ops");
        const related = await run(repo, "ops-tracker", "relate", {
          issue: "ops-1",
          type: "blocked_by",
          to: "devswamp:devswamp-1",
        });
        assertEquals(related.output.includes(token), false);
        const [entry] = await fetched(repo, "ops-tracker", "ops-1");
        assertEquals([entry.state, entry.status], ["resolved", "open"]);

        for (const name of ["badtoken", "nologin"]) {
          await run(repo, "ops-tracker", "relate", {
            issue: "ops-1",
            type: "related_to",
            to: `${name}:x-1`,
          });
        }
        const all = await fetched(repo, "ops-tracker", "ops-1");
        assertEquals(
          all.slice(1).map((r) => [r.issue, r.state, r.reason]),
          [
            ["badtoken:x-1", "unresolved", "auth"],
            ["nologin:x-1", "unresolved", "auth"],
          ],
        );

        // A serve that has gone: recorded as unresolved, and nothing fails.
        await stop();
        const [down] = await fetched(repo, "ops-tracker", "ops-1");
        assertEquals([down.state, down.reason], ["unresolved", "unreachable"]);

        // The token is in no record the reading repository keeps.
        const found: string[] = [];
        const walk = async (dir: string) => {
          for await (const entry of Deno.readDir(dir)) {
            const path = `${dir}/${entry.name}`;
            if (entry.isDirectory) await walk(path);
            else if (
              entry.isFile && (await Deno.readTextFile(path)).includes(token)
            ) found.push(path);
          }
        };
        await walk(repo.dir);
        assertEquals(found, []);
      });
    } finally {
      await stop();
    }
  });
});
