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

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { STUDIO_TYPE } from "../../extensions/models/_lib/engine/studio_server.ts";
import type {
  TicketResponse,
  TicketView,
} from "../../extensions/models/_lib/engine/studio_item_types.ts";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { LINEAR_TYPE } from "../../extensions/models/_lib/tracker/backends/linear.ts";
import {
  FAKE_TOKEN,
  ISSUE_UUID,
  linearFake,
  OTHER_USER_ID,
} from "../../extensions/models/_lib/tracker/backends/linear_fake.ts";
import { SWAMP_CLUB_TYPE } from "../../extensions/models/_lib/tracker/backends/swamp_club.ts";
import {
  ADMIN_KEY,
  LAB_ISSUE,
  swampClubFake,
} from "../../extensions/models/_lib/tracker/backends/swamp_club_fake.ts";
import {
  entriesDefinition,
  trackedDefinition,
} from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { splitWords, type SwampRepo, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// The studio's Ticket tab end to end, through the installed swamp CLI: a
// tracker posts to a ticket, its fetch_issue (or, for the built-in tracker,
// the ticket itself) records what the ticket holds, and the studio's ticket
// route reads it back with swamp's data query, marking what stagecraft
// posted by the tracker's delivery ledger. The studio never calls the
// tracker. Engine and tracker both, so it lives with the extension's tests.
// ---------------------------------------------------------------------------

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

/** Serve the studio, and read work items' tickets from it. */
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
    async ticket(key: string): Promise<TicketResponse> {
      const res = await fetch(`${base}/api/work-items/${key}/ticket`);
      assertEquals(res.status, 200, await res.clone().text());
      return await res.json() as TicketResponse;
    },
    async stop() {
      child.kill("SIGINT");
      await within(30_000, "serve to exit", child.status);
      await Promise.all([done, errDone]);
    },
  };
}

function ok(found: TicketResponse): TicketView {
  if (found.state !== "ok") throw new Error(`the ticket is ${found.state}`);
  return found.ticket;
}

/** A tracker instance's method, by name, with string inputs. */
const methodOf = (repo: SwampRepo, instance: string) =>
(
  name: string,
  inputs: Record<string, string>,
) =>
  repo.swamp([
    "model",
    "method",
    "run",
    instance,
    name,
    ...Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]),
  ]);

/** Point a just-created tracker instance's global arguments at a fake. */
async function setArgs(
  repo: SwampRepo,
  type: string,
  instance: string,
  globalArguments: Record<string, unknown>,
) {
  const { stdout } = await repo.swamp([
    "model",
    "create",
    type,
    instance,
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = globalArguments;
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

Deno.test("studio ticket: a built-in ticket shows its description and its comments in order, stagecraft's marked; an item with no ticket says so", async () => {
  await withRepo(async (repo) => {
    await setArgs(repo, BUILTIN_TYPE, "board", {
      prefix: "cue",
      statuses: ["open", "triaged", "in_progress", "in_review", "shipped"],
      types: ["bug", "feature"],
    });
    await repo.factory("entries", entriesDefinition(), { tracker: "board" });
    const board = methodOf(repo, "board");
    await board("create", {
      title: "Board shortcuts",
      body: "Keys for the **board**.",
      type: "bug",
    });
    const id = "cue-1";
    const claimed = await board("claim", { issue: id, factory: "entries" });
    const command = claimed.output.match(/Start it: (swamp .*)$/m);
    assert(command !== null, claimed.output);
    await repo.swamp(splitWords(command[1]).slice(1));
    // A person's comment, then one delivered for the work item.
    await board("comment", { issue: id, body: "First, from a person." });
    await board("comment", {
      issue: id,
      body: "Second, from stagecraft.",
      workItem: id,
      journalVersion: "1",
    });
    // A work item that names no ticket.
    await repo.workItem("plain", "start", { factory: "entries" });

    const studio = await serve(repo);
    try {
      const ticket = ok(await studio.ticket(id));
      assertEquals(ticket.origin, "builtin");
      assertEquals(ticket.title, "Board shortcuts");
      assertEquals(ticket.description, "Keys for the **board**.");
      assertEquals(
        (ticket.activity ?? []).filter((a) => a.kind === "comment").map((
          a,
        ) => [a.body, a.byStagecraft]),
        [["First, from a person.", false], ["Second, from stagecraft.", true]],
      );
      assertEquals(await studio.ticket("plain"), { state: "none" });
    } finally {
      await studio.stop();
    }
  });
});

Deno.test("studio ticket: a Linear ticket shows what fetch_issue recorded, with publish's comments marked as stagecraft's", async () => {
  const fake = linearFake();
  try {
    await withRepo(async (repo) => {
      fake.issues[0].description = "The adapter, in *markdown*.";
      await setArgs(repo, LINEAR_TYPE, "linear", {
        apiToken: FAKE_TOKEN,
        apiUrl: fake.url,
        statuses: {
          in_progress: "In Progress",
          in_review: "In Review",
          shipped: "Done",
        },
      });
      await repo.factory(
        "tracked",
        { ...trackedDefinition(), tracker: { kind: "linear" } },
        { tracker: "linear" },
      );
      const key = await repo.newKey("tracked");
      await repo.workItem(key, "start", {
        factory: "tracked",
        externalRefs: JSON.stringify({ linear: ISSUE_UUID }),
      });
      const linear = methodOf(repo, "linear");
      await linear("publish", { workItem: key });
      // A person comments in Linear after publish.
      fake.comments.push({
        id: "comment-person",
        issueId: ISSUE_UUID,
        body: "Looks right.",
        userId: OTHER_USER_ID,
        createdAt: "2026-09-30T00:00:00.000Z",
      });

      const studio = await serve(repo);
      try {
        // Nothing recorded yet: the studio does not go to Linear for it.
        const requests = fake.requests.length;
        assertEquals((await studio.ticket(key)).state, "missing");
        await linear("fetch_issue", { issue: ISSUE_UUID });
        const ticket = ok(await studio.ticket(key));
        assertEquals(fake.requests.length, requests + 1, "only fetch_issue");
        assertEquals(ticket.description, "The adapter, in *markdown*.");
        assertEquals(ticket.url, "https://linear.app/fake/issue/GW-16");
        assert(ticket.fetchedAt !== undefined);
        const activity = ticket.activity ?? [];
        assertEquals(activity.length, fake.comments.length);
        assertEquals(
          activity.map((a) => a.byStagecraft),
          fake.comments.map((c) => c.id !== "comment-person"),
        );
        assertEquals(activity.at(-1)?.author, "sam");
      } finally {
        await studio.stop();
      }
    });
  } finally {
    await fake.close();
  }
});

Deno.test("studio ticket: a Lab ticket shows its ripples and lifecycle entries, stagecraft's marked", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  try {
    await withRepo(async (repo) => {
      await setArgs(repo, SWAMP_CLUB_TYPE, "swamp-club", {
        apiKey: ADMIN_KEY,
        url: fake.url,
      });
      await repo.factory(
        "tracked",
        { ...trackedDefinition(), tracker: { kind: "swamp-club" } },
        { tracker: "swamp-club" },
      );
      const key = await repo.newKey("tracked");
      await repo.workItem(key, "start", {
        factory: "tracked",
        externalRefs: JSON.stringify({ "swamp-club": issue }),
      });
      const lab = methodOf(repo, "swamp-club");
      await lab("comment", {
        issue,
        body: "Delivered.",
        workItem: key,
        journalVersion: "1",
      });
      await lab("comment", { issue, body: "Not keyed." });
      await lab("fetch_issue", { issue: `#${issue}` });

      const studio = await serve(repo);
      try {
        const ticket = ok(await studio.ticket(key));
        assertEquals(ticket.url, `${fake.url}/lab/${issue}`);
        assertEquals(ticket.description, "Adapt the Lab.");
        assertEquals(
          (ticket.activity ?? []).map((a) => [a.kind, a.body, a.byStagecraft]),
          [
            ["comment", "Delivered.", true],
            ["comment", "Not keyed.", false],
          ],
        );
      } finally {
        await studio.stop();
      }
    });
  } finally {
    await fake.close();
  }
});
