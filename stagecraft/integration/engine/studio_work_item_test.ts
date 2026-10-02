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
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import type { WorkItemResponse } from "../../extensions/models/_lib/engine/studio_item_types.ts";
import { loadDefinition } from "../../studio/src/model.ts";
import {
  itemOverlay,
  loadItem,
  replay,
  runAsScenario,
  waiting,
} from "../../studio/src/work_item.ts";
import { type SwampRepo, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// The work-item route through the installed swamp CLI: one work item read
// with swamp's own data query, its pinned definition read and checked, its
// product payloads read by version, and its status built by the code the
// status method prints from. A work item loops through review and waits on
// a person; another is pinned to the definition before an edit, and the
// page's digest of the file says so. Moving the item tells the page.
// ---------------------------------------------------------------------------

const DEFINITION = {
  schemaVersion: 1,
  stages: [
    {
      id: "write",
      initial: true,
      work: { mode: "interactive", systemPrompt: "Write it." },
      artifacts: [{
        name: "draft",
        schema: {
          type: "object",
          required: ["text"],
          properties: { text: { type: "string", minLength: 1 } },
        },
      }],
      transitions: [{
        name: "submit",
        to: "review",
        gates: [{ type: "artifact-exists", config: { artifact: "draft" } }],
      }],
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

Deno.test("studio work item: a looped item shows its visits, path, payloads and the person it waits on; an older pin is told by digest; a move tells the page", async () => {
  await withRepo(async (repo) => {
    await repo.factory("team", DEFINITION);
    const record = async (key: string, text: string) =>
      repo.workItem(key, "record_artifact", {
        name: "draft",
        payload: JSON.stringify({ text }),
        ...await repo.expected(key),
      });
    const go = async (key: string, transition: string) =>
      repo.workItem(key, "advance", {
        transition,
        ...await repo.expected(key),
      });
    // Written, reviewed, sent back, written again, and waiting on the ship
    // approval.
    await repo.workItem("team-loop", "start", {
      factory: "team",
      title: "Add a work-item view",
    });
    await record("team-loop", "first draft");
    await go("team-loop", "submit");
    await go("team-loop", "again");
    await record("team-loop", "second draft");
    await go("team-loop", "submit");
    // Pinned to the definition as it is now; then the file is edited.
    await repo.workItem("team-old", "start", { factory: "team" });
    await repo.editFactory("team", {
      ...DEFINITION,
      description: "Edited after team-old started.",
    });

    const studio = await serve(repo);
    try {
      const read = async (key: string) => {
        const res = await fetch(`${studio.base}/api/work-items/${key}`);
        assertEquals(res.status, 200, await res.clone().text());
        return await res.json() as WorkItemResponse;
      };
      const data = await read("team-loop?payloads=1");
      assertEquals(data.run.title, "Add a work-item view");
      assertEquals(data.pinned.version, 1);
      assertEquals(data.status.stage, "review");
      assertEquals(
        data.status.exits.find((e) => e.name === "ship")?.humanGates,
        ["ship-approval"],
      );
      // Both draft versions, read by version and checked by digest.
      assertEquals(
        (data.payloads ?? []).map((p) => [p.name, p.version, p.payload?.text]),
        [["draft", 1, "first draft"], ["draft", 2, "second draft"]],
      );

      const item = loadItem(data);
      const o = itemOverlay(item);
      assertEquals(o.entries, { write: 2, review: 2 });
      assertEquals(o.taken.get("write:submit"), 2);
      assertEquals(o.taken.get("review:again"), 1);
      assertEquals(
        waiting(item).person.map((p) => [p.exit, p.gates]),
        [["ship", ["ship-approval"]]],
      );
      const copy = runAsScenario(item, data.payloads ?? []);
      assertEquals(copy.notes, []);
      assertEquals(await replay(item, copy.entry), {
        passed: true,
        problem: null,
      });

      // The page's digest of the factory's file as it is now: team-loop
      // was pinned before the edit too, so both differ from it; and before
      // the edit, the digest the page computes is the one the run pinned.
      const file = await fetch(`${studio.base}/api/factories/team`);
      const { text, path } = await file.json() as {
        text: string;
        path: string;
      };
      const now = await loadDefinition(path, text);
      assert(now.ok);
      const old = await read("team-old");
      assertEquals(old.pinned.digest, data.pinned.digest);
      assert(now.view.digest !== old.pinned.digest);
      const before = await loadDefinition(
        path,
        text.replace(
          /\n\s*description: Edited after team-old started\.\n/,
          "\n",
        ),
      );
      assert(before.ok);
      assertEquals(before.view.digest, old.pinned.digest);

      // Unknown and unsafe keys.
      for (const bad of ["nope", "a..b"]) {
        const res = await fetch(`${studio.base}/api/work-items/${bad}`);
        assertEquals(res.status, 404, bad);
        await res.body?.cancel();
      }

      // The page has the item open: a move arrives as an event.
      const events = await fetch(`${studio.base}/api/events`);
      const reader = events.body!.pipeThrough(new TextDecoderStream())
        .getReader();
      try {
        assertEquals((await reader.read()).value, ": connected\n\n");
        await read("team-old");
        await record("team-old", "a draft");
        let seen = "";
        while (!seen.includes('"kind":"work-item"')) {
          const { value, done } = await within(
            20_000,
            "the work-item event",
            reader.read(),
          );
          if (done) throw new Error(`the event stream ended; saw:\n${seen}`);
          seen += value;
        }
        assertMatch(seen, /data: \{"kind":"work-item","key":"team-old"\}/);
      } finally {
        await reader.cancel();
      }

      // The page is served on the work item's own address.
      const page = await fetch(`${studio.base}/w/team-loop`);
      assertEquals(page.status, 200);
      assertMatch(await page.text(), /src="\/assets\/app\.js"/);
    } finally {
      await studio.stop();
    }
  });
});
