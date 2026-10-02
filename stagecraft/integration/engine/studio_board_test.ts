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
import type { BoardCard } from "../../extensions/models/_lib/engine/studio_cards.ts";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import { type SwampRepo, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// The Board's route through the installed swamp CLI: the studio's serve reads
// work items with swamp's own data query (the predicate, latest versions
// only, the list projection the poll uses), so this is where those are
// proven. Work items wait on a person, park at a dispatch cap and at a cycle
// limit, and one is pinned to an older definition; each shows on its card,
// and advancing one tells the page.
// ---------------------------------------------------------------------------

const DEFINITION = {
  schemaVersion: 1,
  stages: [
    {
      id: "write",
      initial: true,
      maxCycles: 2,
      maxDispatchesPerCycle: 1,
      work: { mode: "interactive", systemPrompt: "Write it." },
      transitions: [{ name: "submit", to: "review" }],
    },
    {
      id: "review",
      work: { mode: "interactive", systemPrompt: "Review it." },
      transitions: [
        {
          name: "ship",
          to: "done",
          gates: [{ type: "human-approval", config: { id: "ship-approval" } }],
        },
        { name: "again", to: "write" },
      ],
    },
    { id: "done", terminal: true },
  ],
};

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
  return {
    base,
    async stop() {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([done, errDone]);
    },
  };
}

function step(repo: SwampRepo, key: string) {
  return {
    go: async (transition: string) =>
      repo.workItem(key, "advance", {
        transition,
        ...await repo.expected(key),
      }),
    dispatch: async (allowFailure = false) =>
      repo.workItem(key, "dispatch", await repo.expected(key), {
        allowFailure,
      }),
  };
}

Deno.test("studio board: each work item's card says where it is, who it waits on, what parks it and whether its pin is stale; an advance tells the page", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", DEFINITION);
    // Pinned to the definition as it was first.
    await repo.workItem("team-old", "start", { factory: "team" });
    await repo.editFactory("team", {
      ...DEFINITION,
      description: "Edited after team-old started.",
    });
    // Waiting on the ship approval, with a title.
    await repo.workItem("team-wait", "start", {
      factory: "team",
      title: "Add a board view",
    });
    await step(repo, "team-wait").go("submit");
    // Back to write once, then to review: write has had its two entries, so
    // the again exit is closed by its cycle limit, and nothing else holds it.
    await repo.workItem("team-loop", "start", { factory: "team" });
    const loop = step(repo, "team-loop");
    await loop.go("submit");
    await loop.go("again");
    await loop.go("submit");
    // One dispatch is the cap; the second is refused and parks the entry.
    await repo.workItem("team-cap", "start", { factory: "team" });
    const cap = step(repo, "team-cap");
    await cap.dispatch();
    const refused = await cap.dispatch(true);
    assert(refused.code !== 0, refused.output);

    const studio = await serve(repo);
    try {
      const read = async () => {
        const res = await fetch(
          `${studio.base}/api/work-items?factory=team`,
        );
        assertEquals(res.status, 200);
        return await res.json() as {
          items: BoardCard[];
          problems: unknown[];
        };
      };
      const board = await read();
      assertEquals(board.problems, []);
      const card = (key: string) => {
        const found = board.items.find((c) => c.key === key);
        assert(found, `${key} in ${JSON.stringify(board.items)}`);
        return found;
      };
      assertEquals(
        board.items.map((c) => [c.key, c.stage]).sort(),
        [
          ["team-cap", "write"],
          ["team-loop", "review"],
          ["team-old", "write"],
          ["team-wait", "review"],
        ],
      );

      const wait = card("team-wait");
      assertEquals(wait.title, "Add a board view");
      assertEquals(wait.trackerRef, null);
      assertEquals(wait.waiting?.exits.map((x) => x.gateIds), [[
        "ship-approval",
      ]]);
      assertEquals(wait.parked, []);
      assertEquals(card("team-old").title, null);

      assertEquals(card("team-loop").cycle, 2);
      assertEquals(card("team-loop").parked, [{
        kind: "cycle-limit",
        transition: "again",
        to: "write",
        count: 2,
        limit: 2,
        granted: 0,
      }]);
      assertEquals(card("team-cap").parked, [{
        kind: "dispatch-cap",
        count: 1,
        limit: 1,
        granted: 0,
      }]);

      // Every item started after the edit shares one pin; team-old's is the
      // definition before it, and both were read and checked.
      const pins = new Set(board.items.map((c) => c.pinnedDigest));
      assertEquals(pins.size, 2);
      assert(card("team-old").pinnedDigest !== wait.pinnedDigest);
      assertEquals(wait.pinnedDigest, card("team-cap").pinnedDigest);

      // The page has the board open: an advance arrives as an event.
      const events = await fetch(`${studio.base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        assertEquals((await reader.read()).value, ": connected\n\n");
        await step(repo, "team-old").go("submit");
        let seen = "";
        while (!seen.includes('"kind":"work-items"')) {
          const { value, done } = await within(
            20_000,
            "the work-items event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
        assertMatch(seen, /data: \{"kind":"work-items","factory":"team"\}/);
      } finally {
        await reader.cancel();
      }
      assertEquals(
        (await read()).items.find((c) => c.key === "team-old")?.stage,
        "review",
      );

      // The page is served on the board's own address.
      const page = await fetch(`${studio.base}/f/team/board`);
      assertEquals(page.status, 200);
      assertMatch(await page.text(), /src="\/assets\/app\.js"/);
    } finally {
      await studio.stop();
    }
  });
});
