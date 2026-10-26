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
import type { RunRecord } from "./run_record.ts";
import type { TicketsResponse } from "./studio_cards.ts";
import {
  firstStatus,
  type ModelArguments,
  readTickets,
  type TicketSource,
  ticketSource,
} from "./studio_tickets.ts";
import {
  type RecordStore,
  recordStore,
  scenarioItem,
} from "./studio_work_items_testing.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// The Board's ticket columns, over the records a built-in tracker instance
// keeps: its tickets, its claim index, and the work items bound to it.

const TRACKER = "ts";
const TRACKER_TYPE = "@swamp/stagecraft/tracker";
const SOURCE: TicketSource = {
  supported: true,
  instance: TRACKER,
  kind: "builtin",
  firstStatus: "open",
};

function ticket(
  store: RecordStore,
  n: number,
  extra: Record<string, unknown> = {},
) {
  const id = `ts-${n}`;
  store.put(
    TRACKER,
    `issue-${id}`,
    {
      origin: "builtin",
      tracker: "builtin",
      id,
      display: id,
      title: `Ticket ${n}`,
      body: "",
      type: "feature",
      status: { id: "open", name: "open" },
      relations: [],
      createdAt: `2026-10-0${n}T00:00:00.000Z`,
      updatedAt: `2026-10-0${n}T00:00:00.000Z`,
      ...extra,
    },
    TRACKER_TYPE,
    "issue",
  );
}

function claim(store: RecordStore, id: string, key: string) {
  store.put(
    TRACKER,
    `ticket-${id}`,
    {
      tracker: "builtin",
      issue: id,
      display: id,
      key,
      factory: "team",
      claimedAt: "2026-10-10T00:00:00.000Z",
      previous: [],
    },
    TRACKER_TYPE,
    "ticket",
  );
}

/** A work item bound to ticket `id` on the tracker, active or finished. */
async function workItem(
  store: RecordStore,
  key: string,
  id: string,
  status: RunRecord["status"] = "active",
) {
  const item = await scenarioItem(
    "build-swamp-extension.yaml",
    "plan-churn",
    key,
    recordStore(),
  );
  const run: RunRecord = {
    ...item.run,
    status,
    stage: status === "terminal" ? "abandoned" : item.run.stage,
    tracker: { instance: TRACKER, kind: "builtin" },
    externalRefs: { builtin: id, "builtin.display": id },
  };
  store.put(key, "run", JSON.parse(JSON.stringify(run)));
}

function ok(r: TicketsResponse) {
  assert(r.supported);
  return r;
}

Deno.test("tickets: open tickets with no work item are not started, oldest first", async () => {
  const store = recordStore();
  ticket(store, 3);
  ticket(store, 1);
  ticket(store, 2);
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => t.display), ["ts-1", "ts-2", "ts-3"]);
  assertEquals(r.notStarted[0], {
    id: "ts-1",
    display: "ts-1",
    title: "Ticket 1",
    type: "feature",
    createdAt: "2026-10-01T00:00:00.000Z",
    relations: [],
    previous: null,
  });
  assertEquals(r.claimed, []);
  assertEquals(r.problems, []);
});

Deno.test("tickets: a claimed ticket moves to claimed, and leaves both once started", async () => {
  const store = recordStore();
  ticket(store, 1);
  ticket(store, 2);
  claim(store, "ts-1", "ts-1");
  let r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => t.id), ["ts-2"]);
  assertEquals(r.claimed.map((t) => [t.id, t.key, t.factory]), [
    ["ts-1", "ts-1", "team"],
  ]);
  await workItem(store, "ts-1", "ts-1");
  r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => t.id), ["ts-2"]);
  assertEquals(r.claimed, []);
});

Deno.test("tickets: a work item started without claim takes its ticket off the columns", async () => {
  const store = recordStore();
  ticket(store, 1);
  await workItem(store, "by-hand", "ts-1");
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted, []);
});

Deno.test("tickets: an open ticket whose work item finished is not started again, naming it", async () => {
  const store = recordStore();
  ticket(store, 1);
  claim(store, "ts-1", "ts-1");
  await workItem(store, "ts-1", "ts-1", "terminal");
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.claimed, []);
  assertEquals(r.notStarted.map((t) => t.previous), [
    { key: "ts-1", stage: "abandoned" },
  ]);
});

Deno.test("tickets: only tickets in the first status are open", async () => {
  const store = recordStore();
  ticket(store, 1);
  ticket(store, 2, { status: { id: "in_progress", name: "in_progress" } });
  ticket(store, 3, { status: { id: "closed", name: "closed" } });
  let r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => t.id), ["ts-1"]);
  r = ok(await readTickets(store.query, { ...SOURCE, firstStatus: "closed" }));
  assertEquals(r.notStarted.map((t) => t.id), ["ts-3"]);
});

Deno.test("tickets: relations carry the work item on the other ticket", async () => {
  const store = recordStore();
  ticket(store, 1, {
    relations: [
      {
        type: "blocked_by",
        direction: "outgoing",
        issue: "ts-2",
        display: "ts-2",
      },
      {
        type: "parent_of",
        direction: "outgoing",
        issue: "ts-3",
        display: "ts-3",
      },
    ],
  });
  await workItem(store, "ts-2", "ts-2");
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted[0].relations, [
    {
      type: "blocked_by",
      direction: "outgoing",
      issue: "ts-2",
      display: "ts-2",
      workItem: "ts-2",
    },
    {
      type: "parent_of",
      direction: "outgoing",
      issue: "ts-3",
      display: "ts-3",
      workItem: null,
    },
  ]);
});

Deno.test("tickets: another tracker's records are not read, and a bad record is a problem", async () => {
  const store = recordStore();
  ticket(store, 1);
  ticket(store, 2, { tracker: "linear" });
  store.put(
    TRACKER,
    "issue-ts-9",
    {
      origin: "builtin",
      tracker: "builtin",
      id: "ts-9",
    },
    TRACKER_TYPE,
    "issue",
  );
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => t.id), ["ts-1"]);
  assertEquals(r.problems, [
    { key: "issue-ts-9", error: "its ticket record does not parse" },
  ]);
});

Deno.test("tickets: a statuses argument that cannot be read shows no ticket open, and says why", async () => {
  const store = recordStore();
  ticket(store, 1);
  const r = ok(
    await readTickets(store.query, {
      ...SOURCE,
      firstStatus: null,
      problem: "tracker 'ts': bad",
    }),
  );
  assertEquals(r.notStarted, []);
  assertEquals(r.problems, [{ key: TRACKER, error: "tracker 'ts': bad" }]);
});

Deno.test("tickets: an unsupported source is answered as it is", async () => {
  const store = recordStore();
  assertEquals(
    await readTickets(store.query, { supported: false, reason: "no" }),
    { supported: false, reason: "no" },
  );
  assertEquals(store.asked, []);
});

Deno.test("tickets: first status: the default, a list, a JSON list; anything else throws", () => {
  assertEquals(firstStatus(undefined), "open");
  assertEquals(firstStatus(["todo", "doing"]), "todo");
  assertEquals(firstStatus('["todo"]'), "todo");
  for (const bad of ["${{ vault.get(v, s) }}", "[]", [], [1], {}]) {
    let threw = false;
    try {
      firstStatus(bad);
    } catch {
      threw = true;
    }
    assert(threw, JSON.stringify(bad));
  }
});

Deno.test("tickets: the source is the factory's built-in tracker instance", async () => {
  const models: Record<string, ModelArguments> = {
    team: { type: FACTORY_TYPE, globalArguments: { tracker: "ts" } },
    loose: { type: FACTORY_TYPE, globalArguments: {} },
    lin: { type: FACTORY_TYPE, globalArguments: { tracker: "linear-1" } },
    gone: { type: FACTORY_TYPE, globalArguments: { tracker: "nobody" } },
    custom: { type: FACTORY_TYPE, globalArguments: { tracker: "ts2" } },
    ts: { type: TRACKER_TYPE, globalArguments: {} },
    ts2: { type: TRACKER_TYPE, globalArguments: { statuses: ["new", "done"] } },
    "linear-1": { type: "@swamp/stagecraft/linear", globalArguments: {} },
  };
  const lookup = (name: string) => Promise.resolve(models[name] ?? null);
  assertEquals(await ticketSource(lookup, "team"), SOURCE);
  assertEquals(await ticketSource(lookup, "custom"), {
    ...SOURCE,
    instance: "ts2",
    firstStatus: "new",
  });
  for (
    const [factory, reason] of [
      ["loose", "factory 'loose' names no tracker"],
      [
        "gone",
        "factory 'gone' names tracker 'nobody', but no model has that name",
      ],
      ["ts", "no factory named 'ts'"],
      ["missing", "no factory named 'missing'"],
    ]
  ) {
    assertEquals(await ticketSource(lookup, factory), {
      supported: false,
      reason,
    });
  }
  const lin = await ticketSource(lookup, "lin");
  assert(!lin.supported && lin.reason.includes("only for the built-in"));
});

Deno.test("tickets: a claim whose work item a retarget moved to another ticket no longer hides its ticket", async () => {
  const store = recordStore();
  ticket(store, 1);
  ticket(store, 2);
  claim(store, "ts-1", "ts-1");
  // ts-1's work item was retargeted to ts-2, and ts-2's claim follows it.
  await workItem(store, "ts-1", "ts-2");
  claim(store, "ts-2", "ts-1");
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals(r.notStarted.map((t) => [t.id, t.previous]), [["ts-1", null]]);
  assertEquals(r.claimed, []);
});

Deno.test("tickets: a claimed ticket closed by hand before it started waits in neither column", async () => {
  const store = recordStore();
  ticket(store, 1, { status: { id: "closed", name: "closed" } });
  claim(store, "ts-1", "ts-1");
  const r = ok(await readTickets(store.query, SOURCE));
  assertEquals([r.notStarted, r.claimed], [[], []]);
});
