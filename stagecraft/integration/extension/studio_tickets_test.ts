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
import type {
  BoardCard,
  TicketsResponse,
} from "../../extensions/models/_lib/engine/studio_cards.ts";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { entriesDefinition } from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { readExample, type SwampRepo, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// The Board's ticket columns end to end (swamp-club #3828), through the
// installed swamp CLI: tickets filed on a built-in tracker through the
// shipped create workflow show under Not started on every factory bound to
// it, move to Claimed when claim reserves a key, and leave both once the
// work item starts, when it is on the Board in the initial stage. The studio
// reads the tracker's records; it never calls the tracker. Engine and
// tracker both, so it lives with the extension's tests.
// ---------------------------------------------------------------------------

const STARTER = new URL(
  "../../.claude/skills/stagecraft/references/examples/starter.yaml",
  import.meta.url,
);

const decoder = new TextDecoder();

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

/** Serve the studio, and read a factory's Board from it. */
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
  let text = "";
  const done = (async () => {
    for await (const chunk of child.stdout) {
      text += decoder.decode(chunk, { stream: true });
    }
  })();
  const errDone = (async () => {
    for await (const chunk of child.stderr) {
      text += decoder.decode(chunk, { stream: true });
    }
  })();
  const base = await within(
    120_000,
    "the logged studio URL",
    (async () => {
      for (;;) {
        const m = text.match(/studio: (http:\/\/127\.0\.0\.1:\d+)\//);
        if (m !== null) return m[1];
        const ended = await Promise.race([
          child.status.then(() => true),
          new Promise<false>((r) => setTimeout(() => r(false), 200)),
        ]);
        if (ended) throw new Error(`serve exited before listening:\n${text}`);
      }
    })(),
  );
  const read = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${base}${path}`);
    assertEquals(res.status, 200, await res.clone().text());
    return await res.json() as T;
  };
  return {
    async tickets(factory: string) {
      const answer = await read<TicketsResponse>(
        `/api/tickets?factory=${factory}`,
      );
      if (!answer.supported) throw new Error(answer.reason);
      return {
        notStarted: answer.notStarted.map((t) => t.display),
        claimed: answer.claimed.map((t) => [t.display, t.key]),
        problems: answer.problems,
        cards: answer.notStarted,
      };
    },
    async items(factory: string) {
      return (await read<{ items: BoardCard[] }>(
        `/api/work-items?factory=${factory}`,
      )).items.map((c) => [c.key, c.stage]);
    },
    async stop() {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([done, errDone]);
    },
  };
}

/** Run a shipped tracker workflow; a failed run throws with its output. */
async function workflow(
  repo: SwampRepo,
  name: string,
  inputs: Record<string, string>,
) {
  return await repo.swamp([
    "workflow",
    "run",
    `@swamp/stagecraft/${name}`,
    ...Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]),
    "--json",
  ]);
}

Deno.test("studio tickets: filed tickets wait under Not started, claimed ones under Claimed, and a started one is on the Board in the initial stage", async () => {
  await withRepo(async (repo) => {
    await repo.swamp([
      "model",
      "create",
      BUILTIN_TYPE,
      "ts",
      "--global-arg",
      "prefix=ts",
      "--json",
    ]);
    // starter.yaml's initial stage is plan; a second factory shares the
    // tracker, and so its queue.
    const starter = await readExample(STARTER);
    await repo.factory("team", starter.definition, { tracker: "ts" });
    await repo.factory("entries", entriesDefinition(), { tracker: "ts" });
    for (
      const [title, type] of [["First", "feature"], ["Second", "bug"], [
        "Third",
        "feature",
      ]]
    ) {
      await workflow(repo, "create", { tracker: "ts", title, body: "", type });
    }

    const studio = await serve(repo);
    try {
      let team = await studio.tickets("team");
      assertEquals(team.notStarted, ["ts-1", "ts-2", "ts-3"]);
      assertEquals(team.claimed, []);
      assertEquals(team.problems, []);
      assertEquals(
        team.cards.map((t) => [t.title, t.type]),
        [["First", "feature"], ["Second", "bug"], ["Third", "feature"]],
      );
      assert(team.cards.every((t) => t.createdAt !== null));
      assertEquals((await studio.tickets("entries")).notStarted, [
        "ts-1",
        "ts-2",
        "ts-3",
      ]);
      assertEquals(await studio.items("team"), []);

      // Moved off the first status by hand, with no work item: not open.
      await repo.swamp([
        "model",
        "method",
        "run",
        "ts",
        "set_status",
        "--input",
        "issue=ts-3",
        "--input",
        "status=closed",
      ]);
      team = await studio.tickets("team");
      assertEquals(team.notStarted, ["ts-1", "ts-2"]);

      await workflow(repo, "claim", {
        tracker: "ts",
        issue: "ts-1",
        factory: "team",
      });
      team = await studio.tickets("team");
      assertEquals(team.notStarted, ["ts-2"]);
      assertEquals(team.claimed, [["ts-1", "ts-1"]]);

      await repo.workItem("ts-1", "start", {
        factory: "team",
        externalRefs: JSON.stringify({
          builtin: "ts-1",
          "builtin.display": "ts-1",
        }),
      });
      team = await studio.tickets("team");
      assertEquals(team.notStarted, ["ts-2"]);
      assertEquals(team.claimed, []);
      assertEquals(await studio.items("team"), [["ts-1", "plan"]]);
      // The factory sharing the tracker no longer lists it either.
      assertEquals((await studio.tickets("entries")).notStarted, ["ts-2"]);
    } finally {
      await studio.stop();
    }
  });
});
