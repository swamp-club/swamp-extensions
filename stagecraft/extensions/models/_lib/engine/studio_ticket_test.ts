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

import { assertEquals, assertRejects } from "@std/assert";
import type { RunRecord } from "./run_record.ts";
import { readTicket } from "./studio_ticket.ts";
import { type RecordStore, scenarioItem } from "./studio_work_items_testing.ts";

// The Ticket tab's read, over records a tracker instance left: a snapshot
// an external tracker's fetch_issue stored, or a built-in ticket with its
// comment and entry records, and the delivery ledger that marks what
// stagecraft posted.

const KEY = "team-plan-churn-abcd";
const BUILD = "build-swamp-extension.yaml";
const TRACKER_TYPE = "@swamp/stagecraft/tracker";

async function item() {
  const found = await scenarioItem(BUILD, "plan-churn", KEY);
  const { instance, kind } = found.run.tracker;
  return { ...found, instance, kind };
}

function bound(run: RunRecord, id: string): RunRecord {
  return { ...run, externalRefs: { [run.tracker.kind]: id } };
}

function putTracker(
  store: RecordStore,
  instance: string,
  spec: string,
  name: string,
  data: Record<string, unknown>,
) {
  store.put(instance, name, data, TRACKER_TYPE, spec);
}

Deno.test("ticket: none when the run names no ticket, missing when the tracker has no record", async () => {
  const it = await item();
  assertEquals(await readTicket(it.query, { ...it.run, externalRefs: {} }), {
    state: "none",
  });
  assertEquals(await readTicket(it.query, bound(it.run, "T-1")), {
    state: "missing",
    tracker: it.instance,
    kind: it.kind,
    id: "T-1",
  });
});

Deno.test("ticket: an id that is not path-safe is never put in a query", async () => {
  const it = await item();
  it.asked.length = 0;
  assertEquals(await readTicket(it.query, bound(it.run, 'x" || true')), {
    state: "none",
  });
  assertEquals(it.asked, []);
});

Deno.test("ticket: a snapshot gives its content, and marks what stagecraft posted", async () => {
  const it = await item();
  putTracker(it, it.instance, "issue", "issue-T-1", {
    origin: "snapshot",
    tracker: it.kind,
    id: "T-1",
    display: "ENG-1",
    title: "Add the thing",
    url: "https://tracker.example/ENG-1",
    status: { id: "s1", name: "In Progress" },
    relations: [],
    description: "Do **this**.",
    labels: ["Bug"],
    assignees: ["sam"],
    createdAt: "2026-09-28T00:00:00.000Z",
    updatedAt: "2026-09-30T00:00:00.000Z",
    activity: [
      {
        kind: "comment",
        id: "c-1",
        author: "sam",
        body: "Hi",
        at: "2026-09-29T00:00:00Z",
      },
      {
        kind: "comment",
        id: "c-2",
        author: "bot",
        body: "**blog-12**",
        at: "2026-09-29T00:01:00Z",
      },
    ],
    fetchedAt: "2026-10-01T00:00:00.000Z",
  });
  putTracker(it, it.instance, "delivery", "delivery-publish-comment-x", {
    action: "comment",
    issue: "T-1",
    workItem: KEY,
    journalVersion: 3,
    request: "digest",
    result: { id: "c-2", url: "https://tracker.example/ENG-1#c-2" },
    at: "2026-09-29T00:01:00Z",
  });
  // Another ticket's delivery does not mark this one's comment.
  putTracker(it, it.instance, "delivery", "delivery-publish-comment-y", {
    action: "comment",
    issue: "T-9",
    workItem: KEY,
    journalVersion: 4,
    request: "digest",
    result: { id: "c-1" },
    at: "2026-09-29T00:01:00Z",
  });
  const found = await readTicket(it.query, bound(it.run, "T-1"));
  if (found.state !== "ok") throw new Error(`state ${found.state}`);
  const { ticket } = found;
  assertEquals(ticket.origin, "snapshot");
  assertEquals(ticket.description, "Do **this**.");
  assertEquals(ticket.labels, ["Bug"]);
  assertEquals(ticket.assignees, ["sam"]);
  assertEquals(ticket.url, "https://tracker.example/ENG-1");
  assertEquals(ticket.fetchedAt, "2026-10-01T00:00:00.000Z");
  assertEquals(
    ticket.activity?.map((a) => [a.id, a.byStagecraft]),
    [["c-1", false], ["c-2", true]],
  );
});

Deno.test("ticket: a snapshot from before trackers read content says so, not that it is empty", async () => {
  const it = await item();
  putTracker(it, it.instance, "issue", "issue-T-1", {
    origin: "snapshot",
    tracker: it.kind,
    id: "T-1",
    display: "ENG-1",
    title: "Old",
    status: { id: "s1", name: "Todo" },
    fetchedAt: "2026-09-01T00:00:00.000Z",
  });
  const found = await readTicket(it.query, bound(it.run, "T-1"));
  if (found.state !== "ok") throw new Error(`state ${found.state}`);
  assertEquals(found.ticket.description, null);
  assertEquals(found.ticket.activity, null);
  assertEquals(found.ticket.relations, []);
});

Deno.test("ticket: a built-in ticket gives its body and its own comments and entries, oldest first", async () => {
  const it = await item();
  putTracker(it, it.instance, "issue", "issue-blog-12", {
    origin: "builtin",
    tracker: "builtin",
    id: "blog-12",
    display: "blog-12",
    title: "Write the post",
    body: "The *draft*.",
    type: "feature",
    status: { id: "open", name: "open" },
    relations: [],
    assignees: ["seth"],
    createdAt: "2026-09-28T00:00:00.000Z",
    updatedAt: "2026-09-29T00:00:00.000Z",
  });
  putTracker(it, it.instance, "comment", "comment-blog-12-b", {
    issue: "blog-12",
    id: "b",
    body: "Second",
    at: "2026-09-29T00:02:00.000Z",
  });
  putTracker(it, it.instance, "comment", "comment-blog-12-a", {
    issue: "blog-12",
    id: "a",
    body: "First",
    at: "2026-09-29T00:00:00.000Z",
  });
  putTracker(it, it.instance, "entry", "entry-blog-12-e", {
    issue: "blog-12",
    id: "e",
    step: "plan_generated",
    targetStatus: "open",
    summary: "Plan generated",
    emoji: "x",
    payload: {},
    isVerbose: false,
    at: "2026-09-29T00:01:00.000Z",
  });
  // A name that begins like this ticket's but is another's.
  putTracker(it, it.instance, "comment", "comment-blog-12-2-c", {
    issue: "blog-12-2",
    id: "c",
    body: "Elsewhere",
    at: "2026-09-29T00:03:00.000Z",
  });
  putTracker(it, it.instance, "delivery", "delivery-publish-entry", {
    action: "lifecycle_entry",
    issue: "blog-12",
    workItem: KEY,
    journalVersion: 2,
    request: "digest",
    result: { id: "e" },
    at: "2026-09-29T00:01:00.000Z",
  });
  const found = await readTicket(it.query, bound(it.run, "blog-12"));
  if (found.state !== "ok") throw new Error(`state ${found.state}`);
  const { ticket } = found;
  assertEquals(ticket.origin, "builtin");
  assertEquals(ticket.description, "The *draft*.");
  assertEquals(ticket.labels, ["feature"]);
  assertEquals(ticket.fetchedAt, undefined);
  assertEquals(ticket.activity, [
    {
      kind: "comment",
      id: "a",
      body: "First",
      at: "2026-09-29T00:00:00.000Z",
      byStagecraft: false,
    },
    {
      kind: "entry",
      id: "e",
      body: "Plan generated",
      step: "plan_generated",
      at: "2026-09-29T00:01:00.000Z",
      byStagecraft: true,
    },
    {
      kind: "comment",
      id: "b",
      body: "Second",
      at: "2026-09-29T00:02:00.000Z",
      byStagecraft: false,
    },
  ]);
});

Deno.test("ticket: a relation links the newest work item on that ticket, in any factory", async () => {
  const it = await item();
  const relation = (issue: string) => ({
    type: "blocked_by",
    direction: "outgoing",
    issue,
    display: `ENG-${issue}`,
  });
  putTracker(it, it.instance, "issue", "issue-T-1", {
    origin: "snapshot",
    tracker: it.kind,
    id: "T-1",
    display: "ENG-1",
    title: "Add the thing",
    status: { id: "s1", name: "Todo" },
    relations: [relation("T-2"), relation("T-3"), relation("T-4")],
    fetchedAt: "2026-10-01T00:00:00.000Z",
  });
  const started = (run: RunRecord, at: string): RunRecord => ({
    ...run,
    journal: run.journal.map((e, i) => i === 0 ? { ...e, at } : e),
  });
  // T-2 is worked in another factory.
  it.put("ops-7", "run", {
    ...bound(it.run, "T-2"),
    key: "ops-7",
    factory: "ops",
  });
  // T-3 has two work items; the one started later is shown.
  it.put("team-3", "run", {
    ...started(bound(it.run, "T-3"), "2026-09-01T00:00:00.000Z"),
    key: "team-3",
  });
  it.put("team-3-2", "run", {
    ...started(bound(it.run, "T-3"), "2026-09-20T00:00:00.000Z"),
    key: "team-3-2",
  });
  // A work item on T-4 bound to another tracker instance is not T-4's.
  it.put("other-4", "run", {
    ...bound(it.run, "T-4"),
    key: "other-4",
    tracker: { ...it.run.tracker, instance: "elsewhere" },
  });
  const found = await readTicket(it.query, bound(it.run, "T-1"));
  if (found.state !== "ok") throw new Error(`state ${found.state}`);
  assertEquals(
    found.ticket.relations.map((r) => [r.issue, r.workItem]),
    [["T-2", "ops-7"], ["T-3", "team-3-2"], ["T-4", null]],
  );
});

Deno.test("ticket: a record that is there but does not parse is an error", async () => {
  const it = await item();
  putTracker(it, it.instance, "issue", "issue-T-1", {
    origin: "snapshot",
    tracker: it.kind,
    id: "T-1",
  });
  await assertRejects(
    () => readTicket(it.query, bound(it.run, "T-1")),
    Error,
    "does not parse",
  );
});

Deno.test("ticket: a record of the same name on another kind of tracker is not the ticket", async () => {
  const it = await item();
  putTracker(it, it.instance, "issue", "issue-T-1", {
    origin: "snapshot",
    tracker: it.kind === "linear" ? "swamp-club" : "linear",
    id: "T-1",
    display: "ENG-1",
    title: "Someone else's",
    status: { id: "s1", name: "Todo" },
  });
  assertEquals(await readTicket(it.query, bound(it.run, "T-1")), {
    state: "missing",
    tracker: it.instance,
    kind: it.kind,
    id: "T-1",
  });
});
