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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { type FakeSwamp, fakeSwamp } from "../../engine/tracker_testing.ts";
import {
  duplicateDefinition,
  entriesDefinition,
  linkingDefinition,
  TRACKED_ITEM,
  trackedDefinition,
  trackedItem,
} from "./test_support.ts";
import {
  type TrackerAdapter,
  TrackerError,
  type TrackerRelation,
} from "./adapter.ts";
import {
  deliveryName,
  lastPerName,
  type TrackerContext,
  trackerMethods,
} from "./tracker_methods.ts";

// The shared methods over a scripted in-memory adapter: what they do with the
// ledger, snapshots and status keys, independent of any tracker.

const INSTANCE = "tracker";
const NOW = new Date("2026-09-29T00:00:00Z");

function scripted() {
  const calls: string[] = [];
  let status = { id: "s1", name: "Todo" };
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: (ref) => {
      calls.push(`fetch ${ref}`);
      return Promise.resolve({
        id: "T1",
        display: "T-1",
        title: "A ticket",
        url: "https://tracker.example/T-1",
        status,
        relations: [],
      });
    },
    comment: (issueId, body) => {
      calls.push(`comment ${issueId} ${body}`);
      return Promise.resolve({ id: `c${calls.length}`, url: "u" });
    },
    setStatus: (issueId, name) => {
      calls.push(`status ${issueId} ${name}`);
      const changed = status.name !== name;
      status = { id: name, name };
      return Promise.resolve({ changed, status });
    },
    relate: (from, type, to) => {
      calls.push(`relate ${from} ${type} ${to}`);
      return Promise.resolve({ changed: true });
    },
    unrelate: (from, type, to) => {
      calls.push(`unrelate ${from} ${type} ${to}`);
      return Promise.resolve({ changed: true });
    },
  };
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: (args) => (args.statuses ?? {}) as Record<string, string>,
    now: () => NOW,
  });
  return { calls, methods };
}

type Methods = ReturnType<typeof scripted>["methods"];

async function run(
  swamp: FakeSwamp,
  methods: Methods,
  name: keyof Methods,
  raw: Record<string, unknown>,
) {
  const method = methods[name];
  const execute = method.execute as (
    args: unknown,
    ctx: ReturnType<FakeSwamp["context"]>,
  ) => Promise<{ dataHandles: unknown[] }>;
  return await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
}

Deno.test("fetch_issue: records a snapshot per ticket and reports externalRefs", async () => {
  const swamp = fakeSwamp();
  const { methods } = scripted();
  await run(swamp, methods, "fetch_issue", { issue: "T-1" });
  const snapshot = swamp.resources.get(INSTANCE)?.get("issue-T1")?.[0];
  assertEquals(snapshot?.display, "T-1");
  assertEquals(snapshot?.fetchedAt, NOW.toISOString());
  assertEquals(
    swamp.logs.at(-1)?.props?.externalRefs,
    JSON.stringify({ test: "T1", "test.display": "T-1" }),
  );
});

Deno.test("comment: a delivery key records the tracker's id; the same key again posts nothing", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = scripted();
  const args = {
    issue: "T1",
    body: "hello",
    workItem: "build-abcdefgh",
    journalVersion: "4",
  };
  await run(swamp, methods, "comment", args);
  const again = await run(swamp, methods, "comment", args);
  assertEquals(calls, ["comment T1 hello"]);
  assertEquals(again.dataHandles, []);
  const name = deliveryName("comment", {
    workItem: "build-abcdefgh",
    journalVersion: 4,
  });
  assertEquals(name, "delivery-comment-build-abcdefgh-4");
  const ledger = swamp.resources.get(INSTANCE)?.get(name);
  assertEquals(ledger?.length, 1);
  assertEquals(ledger?.[0].result, { id: "c1", url: "u" });

  // A later journal version is a new delivery.
  await run(swamp, methods, "comment", { ...args, journalVersion: "5" });
  assertEquals(calls.length, 2);
});

Deno.test("relate: one key may relate several tickets, and each repeat writes nothing", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = scripted();
  const key = { workItem: "wi-abcd", journalVersion: "3" };
  for (const to of ["T2", "T3", "T2"]) {
    await run(swamp, methods, "relate", {
      issue: "T1",
      type: "parent_of",
      to,
      ...key,
    });
  }
  assertEquals(calls, ["relate T1 parent_of T2", "relate T1 parent_of T3"]);
  // Another source to the same target, under the same key, is its own write.
  await run(swamp, methods, "relate", {
    issue: "T4",
    type: "parent_of",
    to: "T2",
    ...key,
  });
  assertEquals(calls.at(-1), "relate T4 parent_of T2");
  const ledger = swamp.resources.get(INSTANCE);
  assertEquals(
    ledger?.get("delivery-relate-wi-abcd-3-T1-parent_of-T2")?.[0]?.result,
    { changed: true },
  );
  // unrelate keeps records of its own, so the same key removes once.
  await run(swamp, methods, "unrelate", {
    issue: "T1",
    type: "parent_of",
    to: "T2",
    ...key,
  });
  assertEquals(calls.at(-1), "unrelate T1 parent_of T2");
  assert(ledger?.has("delivery-unrelate-wi-abcd-3-T1-parent_of-T2"));
});

Deno.test("comment: without a delivery key it posts every time and records nothing", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = scripted();
  await run(swamp, methods, "comment", { issue: "T1", body: "a" });
  await run(swamp, methods, "comment", { issue: "T1", body: "a" });
  assertEquals(calls.length, 2);
  assertEquals(swamp.versionsWritten(INSTANCE), 0);
});

Deno.test("comment: half a delivery key, a key reused for another ticket, or an unsafe work item is refused", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = scripted();
  await assertRejects(
    () =>
      run(swamp, methods, "comment", {
        issue: "T1",
        body: "a",
        workItem: "build-abcdefgh",
      }),
    Error,
    "both workItem and journalVersion",
  );
  const key = { workItem: "build-abcdefgh", journalVersion: "1" };
  await run(swamp, methods, "comment", { issue: "T1", body: "a", ...key });
  await assertRejects(
    () => run(swamp, methods, "comment", { issue: "T2", body: "a", ...key }),
    Error,
    "a delivery key names one ticket",
  );
  await assertRejects(
    () => run(swamp, methods, "comment", { issue: "T1", body: "b", ...key }),
    Error,
    "a delivery key names one write",
  );
  await assertRejects(
    () =>
      run(swamp, methods, "comment", {
        issue: "T1",
        body: "a",
        workItem: "../escape",
        journalVersion: "1",
      }),
    Error,
    "can only use letters",
  );
  assertEquals(calls.length, 1);
});

Deno.test("set_status: maps the key to a status name and keeps a keyed delivery", async () => {
  const swamp = fakeSwamp();
  swamp.globalArgs.set(INSTANCE, { statuses: { started: "In Progress" } });
  const { calls, methods } = scripted();
  const args = {
    issue: "T1",
    status: "started",
    workItem: "build-abcdefgh",
    journalVersion: "2",
  };
  await run(swamp, methods, "set_status", args);
  await run(swamp, methods, "set_status", args);
  assertEquals(calls, ["status T1 In Progress"]);
  const ledger = swamp.resources.get(INSTANCE)?.get(
    "delivery-set_status-build-abcdefgh-2",
  );
  assertEquals(ledger?.[0].result, {
    changed: true,
    status: { id: "In Progress", name: "In Progress" },
  });
});

Deno.test("set_status: an unmapped key names the mapped keys and calls nothing", async () => {
  const swamp = fakeSwamp();
  swamp.globalArgs.set(INSTANCE, { statuses: { started: "In Progress" } });
  const { calls, methods } = scripted();
  const error = await assertRejects(
    () => run(swamp, methods, "set_status", { issue: "T1", status: "done" }),
    TrackerError,
  );
  assertEquals(error.kind, "invalid");
  assert(error.message.includes("mapped: started"), error.message);
  assertEquals(calls, []);
});

Deno.test("set_status: a delivered key stays a no-op after its status key is unmapped, and refuses a different key", async () => {
  const swamp = fakeSwamp();
  swamp.globalArgs.set(INSTANCE, { statuses: { started: "In Progress" } });
  const { calls, methods } = scripted();
  const key = { workItem: "build-abcdefgh", journalVersion: "2" };
  await run(swamp, methods, "set_status", {
    issue: "T1",
    status: "started",
    ...key,
  });
  swamp.globalArgs.set(INSTANCE, { statuses: { review: "In Review" } });
  await run(swamp, methods, "set_status", {
    issue: "T1",
    status: "started",
    ...key,
  });
  await assertRejects(
    () =>
      run(swamp, methods, "set_status", {
        issue: "T1",
        status: "review",
        ...key,
      }),
    Error,
    "a delivery key names one write",
  );
  assertEquals(calls, ["status T1 In Progress"]);
});

// --- publish ------------------------------------------------------------------

/**
 * An adapter for publish: records what reached the ticket, and fails on
 * request (a comment at a given call, or every status write).
 */
function ticket() {
  const posted: string[] = [];
  const moves: string[] = [];
  // Which ticket each comment and status write went to, beside them.
  const postedTo: string[] = [];
  const movedOn: string[] = [];
  const state = {
    status: "Todo",
    failComment: 0,
    statusError: null as Error | null,
    /** The relations every ticket reads back with. */
    relations: [] as TrackerRelation[],
    /** Ids the tracker reports not_found. */
    missing: [] as string[],
  };
  let commentCalls = 0;
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    // publish reads the ticket to check it is no duplicate.
    fetchIssue: (id) =>
      state.missing.includes(id)
        ? Promise.reject(new TrackerError("not_found", "test", id))
        : Promise.resolve({
          id,
          display: id,
          title: "A ticket",
          status: { id: state.status, name: state.status },
          relations: state.relations,
        }),
    comment: (issueId, body) => {
      commentCalls++;
      if (commentCalls === state.failComment) {
        return Promise.reject(new TrackerError("upstream", "test", "boom"));
      }
      posted.push(body);
      postedTo.push(issueId);
      return Promise.resolve({ id: `c${posted.length}`, url: "u" });
    },
    setStatus: (issueId, name) => {
      if (state.statusError !== null) return Promise.reject(state.statusError);
      moves.push(name);
      movedOn.push(issueId);
      const changed = state.status !== name;
      state.status = name;
      return Promise.resolve({ changed, status: { id: name, name } });
    },
  };
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({
      in_progress: "In Progress",
      in_review: "In Review",
      shipped: "Done",
    }),
    now: () => NOW,
  });
  return { posted, moves, postedTo, movedOn, state, methods };
}

async function publish(
  swamp: FakeSwamp,
  methods: Methods,
  ctx: TrackerContext = swamp.context(INSTANCE),
) {
  const method = methods.publish;
  return await method.execute(
    method.arguments.parse({ workItem: TRACKED_ITEM }),
    ctx,
  );
}

function cursorOf(swamp: FakeSwamp) {
  return swamp.resources.get(INSTANCE)?.get(`cursor-${TRACKED_ITEM}`)?.at(
    -1,
  );
}

Deno.test("publish: comments on each event a person needs, sets the status, and a re-run writes nothing", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");

  await publish(swamp, methods);
  assertEquals(posted.length, 3, posted.join("\n"));
  assert(posted[0].includes("started in factory `tracked-factory`"));
  assert(posted[1].includes("entered **review** (cycle 1) by `submit`"));
  assert(posted[2].includes("is waiting on a person in **review**"));
  assertEquals(moves, ["In Review"]);
  assertEquals(cursorOf(swamp)?.status, "in_review");

  const written = swamp.versionsWritten(INSTANCE);
  const again = await publish(swamp, methods);
  assertEquals(again.dataHandles, []);
  assertEquals(posted.length, 3);
  assertEquals(moves.length, 1);
  assertEquals(swamp.versionsWritten(INSTANCE), written);
});

Deno.test("publish: a park at the dispatch cap and its grant are each said once", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  assertEquals(posted.length, 1);
  assert(await item.tryDispatch());
  assert(await item.tryDispatch());
  assertEquals(await item.tryDispatch(), false);
  assertEquals(await item.tryDispatch(), false);
  await publish(swamp, methods);
  assertEquals(posted.length, 2, posted.join("\n"));
  assert(
    posted[1].includes(
      "is waiting on a person in **write**: dispatch limit reached (2 of 2)" +
        "; a person must grant a dispatch override.",
    ),
    posted[1],
  );
  await item.grantDispatch();
  await publish(swamp, methods);
  assertEquals(posted.length, 3, posted.join("\n"));
  assert(
    posted[2].includes("granted a dispatch override in **write**."),
    posted[2],
  );
  const written = swamp.versionsWritten(INSTANCE);
  await publish(swamp, methods);
  assertEquals(posted.length, 3);
  assertEquals(swamp.versionsWritten(INSTANCE), written);
});

Deno.test("publish: a later publish sends only what is new, and the status only when the stage's key changes", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");
  await publish(swamp, methods);

  // An approval in the same stage: a comment, and no status write, so a
  // person's move in the tracker since then stands.
  await item.approve("ship-approval");
  await publish(swamp, methods);
  assert(posted.at(-1)?.includes("approved `ship-approval`"), posted.at(-1));
  assertEquals(moves, ["In Review"]);

  await item.advance("ship");
  await publish(swamp, methods);
  assert(posted.at(-1)?.includes("finished at **done** by `ship`"));
  assertEquals(moves, ["In Review", "Done"]);
});

Deno.test("publish: a failure part-way leaves the cursor, and the re-run delivers only the rest", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, state, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");

  state.failComment = 2;
  await assertRejects(() => publish(swamp, methods), TrackerError, "boom");
  assertEquals(posted.length, 1);
  assertEquals(moves, []);
  assertEquals(cursorOf(swamp), undefined);

  state.failComment = 0;
  await publish(swamp, methods);
  assertEquals(posted.length, 3, "the first comment is not posted again");
  assertEquals(new Set(posted).size, 3);
  assertEquals(moves, ["In Review"]);
});

Deno.test("publish: a failed status write moves the cursor past what was delivered, and only the move is retried", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, state, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });

  state.statusError = new TrackerError("rate_limited", "test", "slow down");
  await assertRejects(
    () => publish(swamp, methods),
    TrackerError,
    "could not move T1 to status key 'in_progress': slow down. The events " +
      "through journal version 1 were delivered; the next publish retries " +
      "only this move",
  );
  assertEquals(posted.length, 1);
  assertEquals(cursorOf(swamp)?.journalVersion, 1);
  assertEquals(cursorOf(swamp)?.status, null, "the key last written");
  assertEquals(cursorOf(swamp)?.statusFailed, {
    status: "in_progress",
    detail: "slow down",
  });

  // Nothing fixed and nothing new: only the move is tried again.
  await assertRejects(() => publish(swamp, methods), TrackerError, "slow");
  assertEquals(posted.length, 1, "no comment again");

  // Nothing fixed, but new events: they are delivered all the same.
  await item.advance("submit");
  await assertRejects(() => publish(swamp, methods), TrackerError, "slow");
  assertEquals(posted.length, 3, posted.join("\n"));
  assertEquals(cursorOf(swamp)?.journalVersion, 3);
  assertEquals(
    (cursorOf(swamp)?.statusFailed as { status?: string } | undefined)?.status,
    "in_review",
  );

  state.statusError = null;
  await publish(swamp, methods);
  assertEquals(posted.length, 3, "no comment again");
  assertEquals(moves, ["In Review"]);
  assertEquals(cursorOf(swamp)?.status, "in_review");
  assertEquals(cursorOf(swamp)?.statusFailed, undefined, "cleared");
});

Deno.test("publish: a status the tracker cannot reach is recorded as skipped, not retried", async () => {
  const swamp = fakeSwamp();
  const { moves, state, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });

  state.statusError = new TrackerError(
    "invalid",
    "test",
    "only moves forward",
    "unreachable",
  );
  await publish(swamp, methods);
  const ledger = swamp.resources.get(INSTANCE)?.get(
    deliveryName(
      "set_status",
      { workItem: TRACKED_ITEM, journalVersion: 1 },
      "publish",
    ),
  );
  assertEquals(ledger?.[0].result, {
    skipped: "unreachable",
    detail: "only moves forward",
  });
  assertEquals(cursorOf(swamp)?.status, "in_progress");

  state.statusError = null;
  await publish(swamp, methods);
  assertEquals(moves, [], "the skipped key is not tried again");
});

/** A context whose cursor writes are lost: everything else lands. */
function losingCursor(swamp: FakeSwamp): TrackerContext {
  const ctx = swamp.context(INSTANCE);
  const write = ctx.writeResource?.bind(ctx);
  return {
    ...ctx,
    writeResource: (spec, name, data) =>
      name === `cursor-${TRACKED_ITEM}`
        ? Promise.reject(new Error("cursor write lost"))
        : write!(spec, name, data),
  };
}

Deno.test("publish: a status written before a lost cursor write is not written again over a person's move", async () => {
  const swamp = fakeSwamp();
  const { moves, state, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  await item.advance("submit");
  await assertRejects(
    () => publish(swamp, methods, losingCursor(swamp)),
    Error,
    "cursor write lost",
  );
  assertEquals(moves, ["In Progress", "In Review"]);
  assertEquals(cursorOf(swamp)?.status, "in_progress", "the cursor is behind");

  // A person moves the ticket; an approval leaves the stage as it was.
  state.status = "In Progress";
  await item.approve("ship-approval");
  await publish(swamp, methods);
  assertEquals(moves, ["In Progress", "In Review"], "the person's move stands");
  assertEquals(state.status, "In Progress");
  assertEquals(cursorOf(swamp)?.status, "in_review");

  // A stage whose key differs still moves the ticket.
  await item.advance("ship");
  await publish(swamp, methods);
  assertEquals(moves, ["In Progress", "In Review", "Done"]);
});

Deno.test("publish: after a lost cursor write, a stage back at the cursor's key moves the ticket", async () => {
  const swamp = fakeSwamp();
  const { moves, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  await item.advance("submit");
  await assertRejects(
    () => publish(swamp, methods, losingCursor(swamp)),
    Error,
    "cursor write lost",
  );
  // Back to write, whose key is the one the stale cursor holds.
  await item.advance("again");
  await publish(swamp, methods);
  assertEquals(moves, ["In Progress", "In Review", "In Progress"]);
  assertEquals(cursorOf(swamp)?.status, "in_progress");
});

Deno.test("publish: a move skipped as unreachable before a lost cursor write is not tried again", async () => {
  const swamp = fakeSwamp();
  const { moves, state, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  await item.advance("submit");
  state.statusError = new TrackerError(
    "invalid",
    "test",
    "only moves forward",
    "unreachable",
  );
  await assertRejects(
    () => publish(swamp, methods, losingCursor(swamp)),
    Error,
    "cursor write lost",
  );
  assertEquals(cursorOf(swamp)?.status, "in_progress", "the cursor is behind");

  state.statusError = null;
  await item.approve("ship-approval");
  await publish(swamp, methods);
  assertEquals(moves, ["In Progress"], "the skipped key counts as written");
  assertEquals(cursorOf(swamp)?.status, "in_review");
});

Deno.test("publish: a ledger status write whose key the definition does not name is written again", async () => {
  const swamp = fakeSwamp();
  const { moves, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");
  await publish(swamp, methods);
  const since = Number(cursorOf(swamp)?.journalVersion);
  assertEquals(moves, ["In Review"]);

  // At the cursor's own version, a write of a key no stage names.
  await swamp.context(INSTANCE).writeResource?.(
    "delivery",
    deliveryName(
      "set_status",
      { workItem: TRACKED_ITEM, journalVersion: since },
      "publish",
    ),
    {
      action: "set_status",
      issue: "T1",
      workItem: TRACKED_ITEM,
      journalVersion: since,
      request: "an-unknown-key",
      result: {},
      at: NOW.toISOString(),
    },
  );
  await item.approve("ship-approval");
  await publish(swamp, methods);
  assertEquals(moves, ["In Review", "In Review"]);
  assertEquals(cursorOf(swamp)?.status, "in_review");
});

Deno.test("publish: a retried move that landed before a lost cursor write is not written again, and the cursor is repaired", async () => {
  // The retry is keyed on the cursor's own version: #2710's failed move
  // moved the cursor past the events before it.
  const failedThenLost = async () => {
    const swamp = fakeSwamp();
    const t = ticket();
    const item = await trackedItem(swamp, { test: "T1" });
    await publish(swamp, t.methods);
    await item.advance("submit");
    t.state.statusError = new TrackerError("rate_limited", "test", "slow");
    await assertRejects(() => publish(swamp, t.methods), TrackerError);
    assertEquals(
      (cursorOf(swamp)?.statusFailed as { status?: string } | undefined)
        ?.status,
      "in_review",
    );
    t.state.statusError = null;
    await assertRejects(
      () => publish(swamp, t.methods, losingCursor(swamp)),
      Error,
      "cursor write lost",
    );
    assertEquals(t.moves, ["In Progress", "In Review"]);
    // A person moves the ticket.
    t.state.status = "In Progress";
    return { swamp, item, ...t };
  };

  // An event that leaves the stage alone writes no status.
  const later = await failedThenLost();
  await later.item.approve("ship-approval");
  await publish(later.swamp, later.methods);
  assertEquals(later.moves, ["In Progress", "In Review"]);
  assertEquals(later.state.status, "In Progress");
  assertEquals(cursorOf(later.swamp)?.status, "in_review");
  assertEquals(cursorOf(later.swamp)?.statusFailed, undefined);

  // Nothing new: no write, and the cursor is brought level with the
  // ledger, its failed move cleared.
  const idle = await failedThenLost();
  const versions = idle.swamp.versionsWritten(INSTANCE);
  await publish(idle.swamp, idle.methods);
  assertEquals(idle.moves, ["In Progress", "In Review"]);
  assertEquals(cursorOf(idle.swamp)?.status, "in_review");
  assertEquals(cursorOf(idle.swamp)?.statusFailed, undefined);
  assertEquals(
    idle.swamp.versionsWritten(INSTANCE),
    versions + 1,
    "the cursor",
  );
});

Deno.test("publish: any other invalid status write fails, and an unmapped key names the mapped ones", async () => {
  const swamp = fakeSwamp();
  const { state, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  state.statusError = new TrackerError("invalid", "test", "no such status");
  await assertRejects(() => publish(swamp, methods), TrackerError, "no such");
  assertEquals(cursorOf(swamp)?.statusFailed, {
    status: "in_progress",
    detail: "no such status",
  });

  const unmapped = fakeSwamp();
  await trackedItem(unmapped, { test: "T1" });
  const narrow = trackerMethods({
    tracker: "test",
    adapter: adapterless,
    statuses: () => ({ shipped: "Done" }),
    now: () => NOW,
  });
  await assertRejects(
    () => publish(unmapped, narrow),
    TrackerError,
    "status key 'in_progress' is not in the statuses global argument of " +
      `tracker '${INSTANCE}' (mapped: shipped); add it there`,
  );
  assertEquals(cursorOf(unmapped)?.journalVersion, 1);
  assertEquals(
    (cursorOf(unmapped)?.statusFailed as { status?: string } | undefined)
      ?.status,
    "in_progress",
  );
});

/** An adapter that accepts comments and must never be asked for a status. */
function adapterless(): TrackerAdapter {
  return {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    // publish reads the ticket to check it is no duplicate.
    fetchIssue: (id) =>
      Promise.resolve({
        id,
        display: id,
        title: "A ticket",
        status: { id: "Todo", name: "Todo" },
        relations: [],
      }),
    comment: () => Promise.resolve({ id: "c", url: "u" }),
    setStatus: () => Promise.reject(new Error("no status write expected")),
  };
}

Deno.test("publish: a delivered event worded differently by a later version counts as delivered", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  const name = deliveryName(
    "comment",
    { workItem: TRACKED_ITEM, journalVersion: 1 },
    "publish",
  );
  assertEquals(name, `delivery-publish-comment-${TRACKED_ITEM}-1`);
  await swamp.context(INSTANCE).writeResource?.("delivery", name, {
    action: "comment",
    issue: "T1",
    workItem: TRACKED_ITEM,
    journalVersion: 1,
    request: "sha256:older-wording",
    result: { id: "c0", url: "u" },
    at: NOW.toISOString(),
  });
  await publish(swamp, methods);
  assertEquals(posted, []);
  assert(
    swamp.logs.some((l) =>
      String(l.props?.summary).includes("counted as delivered")
    ),
  );
});

Deno.test("publish: refuses a work item started against another tracker instance, so the cursor status reads is the one that moves", async () => {
  const swamp = fakeSwamp();
  await trackedItem(swamp, { test: "T1" }, undefined, { tracker: "board" });
  await assertRejects(
    () => publish(swamp, ticket().methods),
    Error,
    `work item '${TRACKED_ITEM}' was started against tracker 'board', not ` +
      `'${INSTANCE}': publish it there`,
  );
  assertEquals(cursorOf(swamp), undefined);
});

Deno.test("publish: refuses a work item with no ticket, another ticket than before, or no run", async () => {
  const noRef = fakeSwamp();
  await trackedItem(noRef, { other: "X1" });
  await assertRejects(
    () => publish(noRef, ticket().methods),
    Error,
    "has no externalRefs.test",
  );

  const moved = fakeSwamp();
  await trackedItem(moved, { test: "T1" });
  await moved.context(INSTANCE).writeResource?.(
    "cursor",
    `cursor-${TRACKED_ITEM}`,
    {
      workItem: TRACKED_ITEM,
      issue: "T9",
      journalVersion: 0,
      status: null,
      at: NOW.toISOString(),
    },
  );
  await assertRejects(
    () => publish(moved, ticket().methods),
    Error,
    "one work item projects to one ticket",
  );

  await assertRejects(
    () => publish(fakeSwamp(), ticket().methods),
    Error,
    `no work item '${TRACKED_ITEM}'`,
  );
});

Deno.test("publish: after a retarget, earlier events stay on the old ticket and later ones go to the new, each with a note", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, postedTo, movedOn, methods } = ticket();
  const item = await trackedItem(swamp, {
    test: "T1",
    "test.display": "T-1",
  });
  await item.advance("submit");
  await publish(swamp, methods);
  assertEquals(postedTo, ["T1", "T1", "T1"]);
  assertEquals(movedOn, ["T1"]);

  // The approval is not yet published when the work moves ticket.
  await item.approve("ship-approval");
  await item.retarget({ test: "T2", "test.display": "T-2" });
  await item.advance("ship");
  await publish(swamp, methods);
  assertEquals(postedTo.slice(3), ["T1", "T1", "T2", "T2"]);
  assert(posted[3].includes("approved `ship-approval`"), posted[3]);
  assertEquals(
    posted[4],
    `**${TRACKED_ITEM}** moved to T-2; its updates continue there.`,
  );
  assertEquals(
    posted[5],
    `**${TRACKED_ITEM}** continued here from T-1, at stage **review**.`,
  );
  assert(posted[6].includes("finished at **done** by `ship`"), posted[6]);
  // The old ticket was already in review at the retarget; the new one gets
  // the current status whatever the old one had.
  assertEquals(moves, ["In Review", "Done"]);
  assertEquals(movedOn, ["T1", "T2"]);
  assertEquals(cursorOf(swamp)?.issue, "T2");
  assertEquals(cursorOf(swamp)?.status, "shipped");

  const written = swamp.versionsWritten(INSTANCE);
  const again = await publish(swamp, methods);
  assertEquals(again.dataHandles, []);
  assertEquals(posted.length, 7);
  assertEquals(swamp.versionsWritten(INSTANCE), written);
});

Deno.test("publish: a cursor behind the retarget flushes the old ticket first, and the new ticket's status is written even when it matches", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, postedTo, movedOn, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");
  // Retarget as the newest event: both status writes share no ledger key.
  await item.retarget({ test: "T2" });
  await publish(swamp, methods);
  assertEquals(postedTo, ["T1", "T1", "T1", "T1", "T2"]);
  assert(posted[3].includes("moved to T2"), posted[3]);
  assert(posted[4].includes("continued here from T1"), posted[4]);
  assertEquals(moves, ["In Review", "In Review"]);
  assertEquals(movedOn, ["T1", "T2"]);
  // Journal: started, advanced, awaiting, retargeted. The old ticket's
  // status is keyed before the retarget, the new one's on the journal.
  const ledger = swamp.resources.get(INSTANCE);
  assert(ledger?.has(`delivery-publish-set_status-${TRACKED_ITEM}-3`));
  assert(ledger?.has(`delivery-publish-set_status-${TRACKED_ITEM}-4`));
  assert(ledger?.has(`delivery-publish-comment-${TRACKED_ITEM}-4`));
  assert(ledger?.has(`delivery-publish-comment-${TRACKED_ITEM}-4-opening`));

  await item.approve("ship-approval");
  await publish(swamp, methods);
  assertEquals(postedTo.at(-1), "T2");
  assertEquals(cursorOf(swamp)?.issue, "T2");
  assert(Number(cursorOf(swamp)?.journalVersion) > 4);
});

Deno.test("publish: two retargets in a row each move the ticket; a retarget of another tracker's ref does not", async () => {
  const swamp = fakeSwamp();
  const { posted, postedTo, movedOn, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.retarget({ test: "T1", other: "X1" });
  await item.retarget({ test: "T2", other: "X1" });
  await item.retarget({ test: "T3", other: "X1" });
  await publish(swamp, methods);
  // T1: started, moved; T2: continued, moved; T3: continued.
  assertEquals(postedTo, ["T1", "T1", "T2", "T2", "T3"]);
  assert(posted[1].includes("moved to T2"));
  assert(posted[2].includes("continued here from T1"));
  assert(posted[3].includes("moved to T3"));
  assert(posted[4].includes("continued here from T2"));
  assertEquals(movedOn, ["T1", "T2", "T3"]);
  assertEquals(cursorOf(swamp)?.issue, "T3");
});

Deno.test("publish: a ref a retarget adds links its ticket; one it removes tells the old ticket", async () => {
  const swamp = fakeSwamp();
  const { posted, postedTo, methods } = ticket();
  const item = await trackedItem(swamp, { other: "X1" });
  await item.retarget({ test: "T1" });
  await publish(swamp, methods);
  // The events before the ref was added name no ticket and are skipped.
  assertEquals(postedTo, ["T1"]);
  assert(
    posted[0].includes("was linked to this ticket at stage **write**"),
    posted[0],
  );

  await item.retarget({ other: "X2" });
  await publish(swamp, methods);
  assertEquals(postedTo, ["T1", "T1"]);
  assert(posted[1].includes("no longer reports to this ticket"), posted[1]);
  // Nothing is left to deliver anywhere: up to date, and nothing written.
  const written = swamp.versionsWritten(INSTANCE);
  const again = await publish(swamp, methods);
  assertEquals(postedTo.length, 2);
  assertEquals(again.dataHandles, []);
  assertEquals(swamp.versionsWritten(INSTANCE), written);
  assertEquals(
    swamp.logs.at(-1)?.props?.summary,
    `${TRACKED_ITEM} is up to date on T1; later events name no test ticket`,
  );
});

Deno.test("publish: a failure on the new ticket keeps the old ticket's delivery, and the re-run finishes", async () => {
  const swamp = fakeSwamp();
  const { postedTo, movedOn, state, methods } = ticket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.retarget({ test: "T2" });
  state.failComment = 3; // started and moved land; the opening note fails
  await assertRejects(() => publish(swamp, methods), TrackerError, "boom");
  assertEquals(postedTo, ["T1", "T1"]);
  assertEquals(cursorOf(swamp)?.issue, "T1");

  state.failComment = 0;
  await publish(swamp, methods);
  assertEquals(postedTo, ["T1", "T1", "T2"]);
  assertEquals(movedOn, ["T1", "T2"]);
  assertEquals(cursorOf(swamp)?.issue, "T2");
});

Deno.test("publish: needs readModelData", async () => {
  const swamp = fakeSwamp();
  const { methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  const { readModelData: _omitted, ...bare } = swamp.context(INSTANCE);
  await assertRejects(
    () => publish(swamp, methods, bare),
    Error,
    "no readModelData",
  );
});

Deno.test("publish: a pinned copy that is not the latest is read by its version through queryData", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  // A repinning reset cut short: a newer copy the run does not name.
  const versions = swamp.resources.get(TRACKED_ITEM)?.get("definition");
  assert(versions !== undefined);
  const pinned = structuredClone(versions[0]);
  versions.push({
    ...pinned,
    digest: "sha256:unused",
    definition: {
      ...(pinned.definition as Record<string, unknown>),
      description: "unused",
    },
  });

  // Without a query, only the latest copy is there to read.
  await assertRejects(
    () =>
      publish(swamp, methods, {
        ...swamp.context(INSTANCE),
        queryData: undefined,
      }),
    Error,
    "does not match the digest the run recorded",
  );

  const queries: string[] = [];
  const ctx: TrackerContext = {
    ...swamp.context(INSTANCE),
    queryData: (predicate: string) => {
      queries.push(predicate);
      return Promise.resolve([
        // Another namespace's copy of the same name comes first; its digest
        // does not match, so it is passed over. Content that is not JSON,
        // and no content, are passed over too. The pinned copy arrives as
        // JSON text, which a query result may carry instead of an object.
        { name: "definition", version: 1, content: versions[1] },
        { name: "definition", version: 1, content: "not json" },
        { name: "definition", version: 1 },
        { name: "definition", version: 1, content: JSON.stringify(pinned) },
      ]);
    },
  };
  await publish(swamp, methods, ctx);
  assertEquals(queries, [
    `modelName == "${TRACKED_ITEM}" && specName == "definition" && ` +
    'name == "definition" && version == 1',
  ]);
  assertEquals(posted.length, 1);

  // When every copy is refused, each one's reason is reported.
  const error = await assertRejects(
    () =>
      publish(swamp, methods, {
        ...swamp.context(INSTANCE),
        queryData: () =>
          Promise.resolve([
            { name: "definition", version: 1, content: versions[1] },
          ]),
      }),
    Error,
    `no copy of the pinned definition of '${TRACKED_ITEM}' is usable`,
  );
  assertEquals(error.message.split("\n").slice(1), [
    "- the copy at version 1 (query result 1): the pinned definition does " +
    "not match the digest the run recorded",
    "- the latest copy: the pinned definition does not match the digest " +
    "the run recorded",
  ]);
});

Deno.test("publish: keeps its own ledger records, so a hand-keyed comment neither stands in for nor blocks it", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  // Someone used publish's key by hand, on another ticket.
  await methods.comment.execute(
    methods.comment.arguments.parse({
      issue: "T9",
      body: "by hand",
      workItem: TRACKED_ITEM,
      journalVersion: "1",
    }),
    swamp.context(INSTANCE),
  );
  await publish(swamp, methods);
  assertEquals(posted.length, 2, posted.join("\n"));
  assert(posted[1].includes("started in factory"), posted[1]);
});

Deno.test("publish: a failing version query falls back to the latest copy of the pinned definition", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  const ctx: TrackerContext = {
    ...swamp.context(INSTANCE),
    queryData: () => Promise.reject(new Error("catalog unavailable")),
  };
  await publish(swamp, methods, ctx);
  assertEquals(posted.length, 1);
  assert(
    swamp.logs.some((l) =>
      String(l.props?.summary).includes("catalog unavailable")
    ),
  );
});

// --- entry mode ------------------------------------------------------------------

/** A tracker with the history capability, recording every write in order. */
function historyTicket(options: { pullRequests?: boolean } = {}) {
  const writes: string[] = [];
  const state = {
    status: "Todo",
    type: "feature",
    pr: "",
    failEntry: "",
    failKind: "upstream" as "upstream" | "invalid",
    relations: [] as TrackerRelation[],
  };
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    create: () => Promise.reject(new Error("not used")),
    relate: (from, type, to) => {
      writes.push(`relate ${from} ${type} ${to}`);
      state.relations.push({
        type,
        direction: "outgoing",
        issue: to,
        display: to,
      });
      return Promise.resolve({ changed: true });
    },
    unrelate: () => Promise.reject(new Error("not used")),
    fetchIssue: (id) => {
      writes.push("fetch");
      return Promise.resolve({
        id,
        display: id === "T1" ? "T-1" : id,
        title: "A ticket",
        url: "u",
        status: { id: state.status, name: state.status },
        relations: id === "T1" ? state.relations : [],
      });
    },
    comment: (_issueId, body) => {
      writes.push(`comment ${body}`);
      return Promise.resolve({ id: "c", url: "u" });
    },
    setStatus: (_issueId, name) => {
      writes.push(`status ${name}`);
      const changed = state.status !== name;
      state.status = name;
      return Promise.resolve({ changed, status: { id: name, name } });
    },
    capabilities: {
      history: {
        postEntry: (_issueId, entry) => {
          if (entry.step === state.failEntry) {
            return Promise.reject(
              new TrackerError(state.failKind, "test", "boom"),
            );
          }
          writes.push(
            `entry ${entry.step} [${entry.targetStatus}] ${entry.summary}` +
              (entry.isVerbose ? " (verbose)" : "") +
              (Object.keys(entry.payload).length === 0
                ? ""
                : ` ${JSON.stringify(entry.payload)}`),
          );
          return Promise.resolve({ id: `e${writes.length}` });
        },
        setType: (_issueId, type) => {
          writes.push(`type ${type}`);
          const changed = state.type !== type;
          state.type = type;
          return Promise.resolve({ changed, type });
        },
      },
      ...(options.pullRequests === true
        ? {
          pullRequests: {
            linkPr: (_issueId: string, url: string) => {
              writes.push(`pr ${url}`);
              const changed = state.pr !== url;
              state.pr = url;
              return Promise.resolve({ changed, url });
            },
          },
        }
        : {}),
    },
  };
  const statuses = {
    open: "Todo",
    triaged: "Triaged",
    in_progress: "In Progress",
    in_review: "In Review",
    shipped: "Done",
    closed: "Closed",
  };
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => statuses,
    now: () => NOW,
  });
  return { writes, state, methods };
}

Deno.test("publish, entries: each answered event becomes one entry in place of comments, and a re-run writes nothing", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "first", type: "bug" });
  await item.advance("submit");
  await item.record("evidence", "result", { status: "failed" });
  await item.record("evidence", "result", { status: "passed" });
  await item.approve("ship-approval");
  await item.advance("ship");
  await publish(swamp, methods);
  assertEquals(writes, [
    "entry work_started [Todo] Work started",
    // The type first, then the entry that says so (issue-lifecycle's order).
    "type bug",
    'entry noted [Triaged] Noted: first (verbose) {"text":"first","type":"bug"}',
    "entry review_started [In Review] Review",
    'entry failed [In Review] Failed {"status":"failed"}',
    'entry passed [In Review] Passed {"status":"passed"}',
    "entry ship_approved [Done] Ship approved",
    "entry finished [Done] Done",
    // The status, once, for the stage the work item is in now, after the
    // read that checks the ticket is no duplicate.
    "fetch",
    "status Done",
  ]);
  const count = writes.length;
  await publish(swamp, methods);
  assertEquals(writes.length, count, "a re-run writes nothing");
  assert(
    swamp.resources.get(INSTANCE)?.has(
      `delivery-publish-lifecycle_entry-${TRACKED_ITEM}-1`,
    ),
  );
});

Deno.test("publish, entries: a later cycle picks its own entry, and a stage without a key carries the last one", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "first" });
  await item.advance("submit");
  await item.advance("again");
  await item.record("artifact", "note", { text: "second" });
  await publish(swamp, methods);
  assertEquals(writes.filter((w) => w.startsWith("entry note")), [
    'entry noted [Triaged] Noted: first (verbose) {"text":"first"}',
    // write has no status key: in_review, the last one entered, labels it.
    'entry note_revised [In Review] Revised: second {"text":"second"}',
  ]);
  // No type field, no type write.
  assert(!writes.some((w) => w.startsWith("type")));
});

const PR_ONE = "https://git.example.com/o/r/pulls/1";
const PR_TWO = "https://git.example.com/o/r/pulls/2";

Deno.test("publish, entries: linkPr links the pull request after the type and before the entry, once, and a later one replaces it", async () => {
  const swamp = fakeSwamp();
  const { writes, state, methods } = historyTicket({ pullRequests: true });
  const item = await trackedItem(swamp, { test: "T1" }, linkingDefinition());
  await item.record("artifact", "note", {
    text: "first",
    type: "bug",
    url: PR_ONE,
  });
  await publish(swamp, methods);
  const typed = writes.indexOf("type bug");
  assertEquals(writes.slice(typed, typed + 3), [
    "type bug",
    `pr ${PR_ONE}`,
    `entry noted [Triaged] Noted: first (verbose) ` +
    `{"text":"first","type":"bug","url":"${PR_ONE}"}`,
  ]);
  assert(
    swamp.resources.get(INSTANCE)?.has(
      `delivery-publish-link_pr-${TRACKED_ITEM}-2`,
    ),
  );
  const count = writes.length;
  await publish(swamp, methods);
  assertEquals(writes.length, count, "a re-run writes nothing");

  await item.advance("submit");
  await item.advance("again");
  await item.record("artifact", "note", { text: "second", url: PR_TWO });
  await publish(swamp, methods);
  assertEquals(writes.filter((w) => w.startsWith("pr ")), [
    `pr ${PR_ONE}`,
    `pr ${PR_TWO}`,
  ]);
  assertEquals(state.pr, PR_TWO);
});

Deno.test("publish, entries: a tracker without pull request links publishes a linkPr entry without one", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, linkingDefinition());
  await item.record("artifact", "note", { text: "first", url: PR_ONE });
  await publish(swamp, methods);
  assert(!writes.some((w) => w.startsWith("pr ")), writes.join("\n"));
  assert(writes.some((w) => w.startsWith("entry noted")), writes.join("\n"));
});

Deno.test("publish, entries: a declined approval and an unanswered event write nothing", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "x" });
  await item.advance("submit");
  await publish(swamp, methods);
  const before = writes.length;
  await item.decline("ship-approval");
  await publish(swamp, methods);
  // Only the read that checks the ticket is no duplicate.
  assertEquals(writes.slice(before), ["fetch"]);
});

Deno.test("publish, entries: a failed entry leaves the cursor, and the re-run posts only what did not land", async () => {
  const swamp = fakeSwamp();
  const { writes, state, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "x" });
  await item.advance("submit");
  state.failEntry = "review_started";
  await assertRejects(() => publish(swamp, methods), TrackerError, "boom");
  assertEquals(cursorOf(swamp), undefined);
  state.failEntry = "";
  await publish(swamp, methods);
  assertEquals(
    writes.filter((w) => w.startsWith("entry")).map((w) => w.split(" ")[1]),
    ["work_started", "noted", "review_started"],
  );
});

Deno.test("publish, entries: the payload is the version the journal recorded, never a later one", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "as recorded" });
  // A later version of the payload, written behind the journal's back.
  swamp.resources.get(TRACKED_ITEM)?.get("artifact-note")?.push({
    text: "rewritten",
  });
  await publish(swamp, methods);
  assert(
    writes.includes(
      'entry noted [Triaged] Noted: as recorded (verbose) {"text":"as recorded"}',
    ),
    writes.join("\n"),
  );
  // Without the query, only the latest copy is there, and its digest does
  // not match: publish stops rather than describe the wrong version.
  const fresh = fakeSwamp();
  const other = historyTicket();
  const again = await trackedItem(fresh, { test: "T1" }, entriesDefinition());
  await again.record("artifact", "note", { text: "as recorded" });
  fresh.resources.get(TRACKED_ITEM)?.get("artifact-note")?.push({
    text: "rewritten",
  });
  await assertRejects(
    () =>
      publish(fresh, other.methods, {
        ...fresh.context(INSTANCE),
        queryData: undefined,
      }),
    Error,
    "as it was recorded",
  );
});

Deno.test("publish, entries: an entry whose status key is not mapped carries the ticket's own status", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const doc = entriesDefinition() as { stages: Record<string, unknown>[] };
  (doc.stages[0].tracker as { entries: Record<string, unknown>[] })
    .entries[0].status = "nowhere";
  await trackedItem(swamp, { test: "T1" }, doc);
  await publish(swamp, methods);
  assertEquals(writes, ["fetch", "entry work_started [Todo] Work started"]);
  assertEquals(cursorOf(swamp)?.journalVersion, 1);
});

Deno.test("publish, entries: without a label anywhere, an entry carries the ticket's own status", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const doc = entriesDefinition() as { stages: Record<string, unknown>[] };
  delete (doc.stages[0].tracker as { entries: Record<string, unknown>[] })
    .entries[0].status;
  await trackedItem(swamp, { test: "T1" }, doc);
  await publish(swamp, methods);
  assertEquals(writes, ["fetch", "entry work_started [Todo] Work started"]);
});

Deno.test("publish, entries: a definition without entries, or a tracker without history, still gets comments", async () => {
  const plain = fakeSwamp();
  const lab = historyTicket();
  await trackedItem(plain, { test: "T1" }, trackedDefinition());
  await publish(plain, lab.methods);
  // After the read that checks the ticket is no duplicate.
  assertEquals(lab.writes[0], "fetch");
  assert(lab.writes[1].startsWith("comment "), lab.writes.join("\n"));

  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await publish(swamp, methods);
  assertEquals(posted.length, 1);
});

Deno.test("publish, entries: an entry the tracker refuses outright is skipped and recorded, so publish moves past it", async () => {
  const swamp = fakeSwamp();
  const { writes, state, methods } = historyTicket();
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "x" });
  await item.advance("submit");
  state.failEntry = "noted";
  state.failKind = "invalid";
  await publish(swamp, methods);
  assertEquals(
    writes.filter((w) => w.startsWith("entry")).map((w) => w.split(" ")[1]),
    ["work_started", "review_started"],
  );
  assertEquals(writes.at(-1), "status In Review", "the status still moves");
  const ledger = swamp.resources.get(INSTANCE)?.get(
    `delivery-publish-lifecycle_entry-${TRACKED_ITEM}-2`,
  )?.[0];
  assertEquals((ledger?.result as { skipped?: string }).skipped, "invalid");
  assert(
    swamp.logs.some((l) => String(l.props?.warning).includes("refused: boom")),
  );
  // Recorded as delivered: a re-run does not try it again.
  state.failEntry = "";
  const count = writes.length;
  await publish(swamp, methods);
  assertEquals(writes.length, count);
});

Deno.test("create: an external tracker's new ticket is recorded as a snapshot, with the externalRefs to start from", async () => {
  const drafts: unknown[] = [];
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: (draft) => {
      drafts.push(draft);
      return Promise.resolve({
        id: "T9",
        display: "T-9",
        title: draft.title,
        url: "https://tracker.example/T-9",
        status: { id: "s1", name: "Todo" },
        relations: [],
      });
    },
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    fetchIssue: () => Promise.reject(new Error("not used")),
    comment: () => Promise.reject(new Error("not used")),
    setStatus: () => Promise.reject(new Error("not used")),
  };
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({}),
    now: () => NOW,
  });
  const swamp = fakeSwamp();
  await methods.create.execute(
    methods.create.arguments.parse({ title: "New", body: "b", type: "bug" }),
    swamp.context(INSTANCE),
  );
  assertEquals(drafts, [{ title: "New", body: "b", type: "bug" }]);
  assertEquals(swamp.resources.get(INSTANCE)?.get("issue-T9"), [{
    origin: "snapshot",
    tracker: "test",
    id: "T9",
    display: "T-9",
    title: "New",
    url: "https://tracker.example/T-9",
    relations: [],
    status: { id: "s1", name: "Todo" },
    fetchedAt: NOW.toISOString(),
  }]);
  assertEquals(
    swamp.logs.at(-1)?.props?.externalRefs,
    JSON.stringify({ test: "T9", "test.display": "T-9" }),
  );
});

Deno.test("create: every input is required", () => {
  const { methods } = scripted();
  for (const missing of ["title", "body", "type"]) {
    const raw: Record<string, string> = { title: "t", body: "b", type: "bug" };
    delete raw[missing];
    assertEquals(methods.create.arguments.safeParse(raw).success, false);
  }
});

// --- assigning when a work item starts --------------------------------------

/**
 * A ticket with the assign capability, history optional, and a login that
 * maps to `assignee` unless that is null. failAssign and failEntry script
 * one failure.
 */
function assignTicket(
  options: { history?: boolean; assignee?: string | null } = {},
) {
  const writes: string[] = [];
  const state = {
    assigned: [] as string[],
    assignCalls: 0,
    failAssign: null as Error | null,
    failEntry: null as string | null,
    dropped: [] as string[],
  };
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: () =>
      Promise.resolve({
        id: "T1",
        display: "T-1",
        title: "t",
        status: { id: "Todo", name: "Todo" },
        relations: [],
      }),
    comment: (_issueId, body) => {
      writes.push(`comment ${body.split(" ").slice(1, 3).join(" ")}`);
      return Promise.resolve({ id: "c" });
    },
    setStatus: (_issueId, name) => {
      writes.push(`status ${name}`);
      return Promise.resolve({ changed: true, status: { id: name, name } });
    },
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    capabilities: {
      assign: {
        assign: (_issueId, user) => {
          state.assignCalls++;
          if (state.failAssign !== null) {
            return Promise.reject(state.failAssign);
          }
          const changed = !state.assigned.includes(user);
          if (changed) state.assigned.push(user);
          writes.push(`assign ${user}`);
          return Promise.resolve({
            changed,
            user,
            status: "Todo",
            dropped: state.dropped,
            details: { userId: `id-${user}` },
          });
        },
      },
      ...(options.history === true
        ? {
          history: {
            postEntry: (
              _issueId: string,
              entry: { step: string; targetStatus: string },
            ) => {
              if (entry.step === state.failEntry) {
                state.failEntry = null;
                return Promise.reject(
                  new TrackerError("upstream", "test", "boom"),
                );
              }
              writes.push(`entry ${entry.step} [${entry.targetStatus}]`);
              return Promise.resolve({ id: `e${writes.length}` });
            },
            setType: (_issueId: string, type: string) =>
              Promise.resolve({ changed: true, type }),
          },
        }
        : {}),
    },
  };
  const assignee = options.assignee === undefined ? "seth" : options.assignee;
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({
      open: "Todo",
      triaged: "Triaged",
      in_progress: "In Progress",
      in_review: "In Review",
      shipped: "Done",
    }),
    assignee: () =>
      assignee === null
        ? Promise.reject(new TrackerError("invalid", "test", "no username"))
        : Promise.resolve(assignee),
    now: () => NOW,
  });
  return { writes, state, methods, adapter };
}

function warnings(swamp: FakeSwamp): string[] {
  return swamp.logs.flatMap((l) =>
    l.props?.warning === undefined ? [] : [String(l.props.warning)]
  );
}

Deno.test("publish, assign: the started event's comment, then the assign, then later events; a re-run writes nothing", async () => {
  const swamp = fakeSwamp();
  const { writes, state, methods } = assignTicket();
  const item = await trackedItem(swamp, { test: "T1" });
  await item.advance("submit");
  await publish(swamp, methods);
  assertEquals(writes, [
    "comment started in",
    "assign seth",
    "comment entered **review**",
    "comment is waiting",
    "status In Review",
  ]);
  const ledger = swamp.resources.get(INSTANCE)?.get(
    `delivery-publish-assign-${TRACKED_ITEM}-1`,
  )?.at(-1) as { action: string; result: Record<string, unknown> };
  assertEquals(ledger.action, "assign");
  assertEquals(ledger.result.changed, true);

  // Comment mode posts no note for the assignment, and a re-run, or a later
  // publish, never assigns again.
  await publish(swamp, methods);
  await item.approve("ship-approval");
  await publish(swamp, methods);
  assertEquals(state.assignCalls, 1);
});

Deno.test("publish, assign: in entry mode the assigned entry follows the started event's, labelled with the ticket's status", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = assignTicket({ history: true });
  const item = await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  await item.record("artifact", "note", { text: "first" });
  await publish(swamp, methods);
  assertEquals(writes, [
    "entry work_started [Todo]",
    "assign seth",
    "entry assigned [Todo]",
    "entry noted [Triaged]",
  ]);
  assert(
    swamp.resources.get(INSTANCE)?.has(
      `delivery-publish-lifecycle_entry-${TRACKED_ITEM}-1-assigned`,
    ),
  );
});

Deno.test("publish, assign: a started event with no entry of its own still assigns, before later entries", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = assignTicket({ history: true });
  const definition = entriesDefinition() as {
    stages: { tracker: { entries: { on: unknown }[] } }[];
  };
  const write = definition.stages[0].tracker;
  write.entries = write.entries.filter((e) => e.on !== "enter");
  const item = await trackedItem(swamp, { test: "T1" }, definition);
  await item.record("artifact", "note", { text: "first" });
  await publish(swamp, methods);
  assertEquals(writes, [
    "assign seth",
    "entry assigned [Todo]",
    "entry noted [Triaged]",
  ]);
});

Deno.test("publish, assign: a failed assign warns, is recorded as skipped and is never retried", async () => {
  for (
    const [label, setup] of [
      [
        "no login",
        () => assignTicket({ assignee: null }),
      ],
      [
        "the tracker refused",
        () => {
          const t = assignTicket();
          t.state.failAssign = new TrackerError("upstream", "test", "down");
          return t;
        },
      ],
    ] as const
  ) {
    const swamp = fakeSwamp();
    const { writes, state, methods } = setup();
    const item = await trackedItem(swamp, { test: "T1" });
    await publish(swamp, methods);
    assertEquals(writes, ["comment started in", "status In Progress"], label);
    const warned = warnings(swamp);
    assertEquals(warned.length, 1, label);
    assert(warned[0].includes("will not try again"), warned[0]);
    const ledger = swamp.resources.get(INSTANCE)?.get(
      `delivery-publish-assign-${TRACKED_ITEM}-1`,
    )?.at(-1) as { result: Record<string, unknown> };
    assertEquals(
      ledger.result.skipped,
      label === "no login" ? "invalid" : "upstream",
    );
    const calls = state.assignCalls;
    state.failAssign = null;
    await item.advance("submit");
    await publish(swamp, methods);
    assertEquals(state.assignCalls, calls, label);
  }
});

Deno.test("publish, assign: an assigned entry that failed is written by the re-run without assigning again", async () => {
  const swamp = fakeSwamp();
  const { writes, state, methods } = assignTicket({ history: true });
  await trackedItem(swamp, { test: "T1" }, entriesDefinition());
  state.failEntry = "assigned";
  await assertRejects(() => publish(swamp, methods), TrackerError, "boom");
  assertEquals(writes, ["entry work_started [Todo]", "assign seth"]);
  await publish(swamp, methods);
  assertEquals(writes, [
    "entry work_started [Todo]",
    "assign seth",
    "entry assigned [Todo]",
  ]);
  assertEquals(state.assignCalls, 1);
});

Deno.test("publish, assign: a work item first published without assigning is never assigned later", async () => {
  const swamp = fakeSwamp();
  const { state, adapter, methods } = assignTicket();
  const item = await trackedItem(swamp, { test: "T1" });
  // The same tracker before it could assign: no login mapping.
  const before = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({ in_progress: "In Progress", in_review: "In Review" }),
    now: () => NOW,
  });
  await publish(swamp, before);
  await item.advance("submit");
  await publish(swamp, methods);
  assertEquals(state.assignCalls, 0);
});

Deno.test("publish, assign: a tracker without the capability never assigns, even with a login mapping", async () => {
  const swamp = fakeSwamp();
  const { adapter } = assignTicket();
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => ({ ...adapter, capabilities: {} }),
    statuses: () => ({ in_progress: "In Progress" }),
    assignee: () => Promise.resolve("seth"),
    now: () => NOW,
  });
  await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  assertEquals(
    swamp.resources.get(INSTANCE)?.has(
      `delivery-publish-assign-${TRACKED_ITEM}-1`,
    ),
    false,
  );
  assertEquals(warnings(swamp), []);
});

Deno.test("publish, assign: the summary names assignees the tracker dropped", async () => {
  const swamp = fakeSwamp();
  const { state, methods } = assignTicket();
  state.dropped = ["gone"];
  await trackedItem(swamp, { test: "T1" });
  await publish(swamp, methods);
  const summaries = swamp.logs.map((l) => String(l.props?.summary ?? ""));
  assert(
    summaries.includes("assigned T1 to seth; the tracker dropped gone"),
    summaries.join("\n"),
  );
});

Deno.test("publish, entries: an approved duplicate mark relates and closes the ticket beside its entries, and nothing reopens it", async () => {
  const swamp = fakeSwamp();
  const { writes, methods } = historyTicket();
  const doc = entriesDefinition() as { stages: Record<string, unknown>[] };
  const write = doc.stages[0] as {
    artifacts: unknown[];
    transitions: unknown[];
    tracker: Record<string, unknown>;
  };
  write.artifacts.push({
    name: "duplicate-of",
    schema: {
      type: "object",
      required: ["primary"],
      properties: { primary: { type: "string" } },
    },
  });
  write.transitions.push({
    name: "duplicate",
    to: "duplicate",
    gates: [{
      type: "human-approval",
      config: { id: "duplicate-confirmation" },
    }],
  });
  write.tracker.duplicate = {
    on: { approve: "duplicate-confirmation" },
    record: "duplicate-of",
    field: "primary",
  };
  doc.stages.push({
    id: "duplicate",
    terminal: true,
    tracker: { status: "closed" },
  });
  const item = await trackedItem(swamp, { test: "T1" }, doc);
  await item.record("artifact", "duplicate-of", { primary: "P1" });
  await item.approve("duplicate-confirmation");
  await item.advance("duplicate");
  await publish(swamp, methods);
  // Reads (fetch) aside: what reached the ticket, in order.
  const written = writes.filter((w) => w !== "fetch");
  const relate = written.indexOf("relate T1 duplicate_of P1");
  assert(relate > 0, written.join("\n"));
  assert(written[0].startsWith("entry work_started"), written.join("\n"));
  assertEquals(
    written.slice(relate + 1).filter((w) => w.startsWith("status")),
    [
      "status Closed",
    ],
  );
  const before = writes.filter((w) => w !== "fetch").length;
  await publish(swamp, methods);
  assertEquals(
    writes.filter((w) => w !== "fetch").length,
    before,
    "a re-run writes nothing",
  );
});

Deno.test("publish: reports one handle per record name, the last written, as swamp requires", () => {
  const cursor1 = { name: "cursor-x", version: 1 };
  const ledger = { name: "delivery-x", version: 1 };
  const cursor2 = { name: "cursor-x", version: 2 };
  assertEquals(lastPerName([cursor1, ledger, cursor2, { version: 3 }]), [
    ledger,
    cursor2,
    { version: 3 },
  ]);
});

Deno.test("publish: a duplicate mark that names no other ticket marks nothing, and the ticket's status still moves", async () => {
  // ticket() refuses any relate, so a mark that tried one would fail here.
  const unrecorded = fakeSwamp();
  const first = ticket();
  const bare = await trackedItem(
    unrecorded,
    { test: "T1" },
    duplicateDefinition(),
  );
  await bare.approve("duplicate-confirmation");
  await bare.advance("submit");
  await publish(unrecorded, first.methods);
  assertEquals(first.moves.at(-1), "In Review");
  assert(
    unrecorded.logs.some((l) =>
      String(l.props?.warning).includes("recorded before it")
    ),
  );

  // Approved after the retarget onto the primary: it names this ticket.
  const itself = fakeSwamp();
  const second = ticket();
  const moved = await trackedItem(
    itself,
    { test: "T1" },
    duplicateDefinition(),
  );
  await moved.record("artifact", "duplicate-of", { primary: "T1" });
  await moved.approve("duplicate-confirmation");
  await moved.advance("submit");
  await publish(itself, second.methods);
  assertEquals(second.moves.at(-1), "In Review");
  assert(
    itself.logs.some((l) =>
      String(l.props?.warning).includes("as its own primary")
    ),
  );
});

Deno.test("publish: a duplicate mark naming a ticket the tracker cannot find marks nothing, and publish carries on", async () => {
  const swamp = fakeSwamp();
  const { moves, state, methods } = ticket();
  state.missing.push("GONE");
  const item = await trackedItem(swamp, { test: "T1" }, duplicateDefinition());
  await item.record("artifact", "duplicate-of", { primary: "GONE" });
  await item.approve("duplicate-confirmation");
  await item.advance("submit");
  await publish(swamp, methods);
  assertEquals(moves.at(-1), "In Review");
  assert(
    swamp.logs.some((l) =>
      String(l.props?.warning).includes("which the tracker cannot find")
    ),
  );
  await item.advance("again");
  await publish(swamp, methods);
  assertEquals(moves.at(-1), "In Progress", "later publishes are not blocked");
});

Deno.test("mark_duplicate: without a closed status to close it with, nothing is written", async () => {
  // ticket() maps no closed key, and refuses any relate.
  const { methods } = ticket();
  const error = await assertRejects(
    () =>
      methods.mark_duplicate.execute(
        methods.mark_duplicate.arguments.parse({ issue: "T2", primary: "T1" }),
        fakeSwamp().context(INSTANCE),
      ),
    TrackerError,
  );
  assert(error.message.includes("status key 'closed'"), error.message);
});
