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
  entriesDefinition,
  TRACKED_ITEM,
  trackedDefinition,
  trackedItem,
} from "./test_support.ts";
import { type TrackerAdapter, TrackerError } from "./adapter.ts";
import {
  deliveryName,
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
  };
  let commentCalls = 0;
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: () => Promise.reject(new Error("not used")),
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
  assert(posted[0].includes("started on definition `tracked`"));
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

Deno.test("publish: a failed status write is retried alone", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, state, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });

  state.statusError = new TrackerError("rate_limited", "test", "slow down");
  await assertRejects(() => publish(swamp, methods), TrackerError, "slow");
  assertEquals(posted.length, 1);
  assertEquals(cursorOf(swamp), undefined);

  state.statusError = null;
  await publish(swamp, methods);
  assertEquals(posted.length, 1, "no comment again");
  assertEquals(moves, ["In Progress"]);
  assertEquals(cursorOf(swamp)?.journalVersion, 1);
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

Deno.test("publish: any other invalid status write fails, and an unmapped key names the mapped ones", async () => {
  const swamp = fakeSwamp();
  const { state, methods } = ticket();
  await trackedItem(swamp, { test: "T1" });
  state.statusError = new TrackerError("invalid", "test", "no such status");
  await assertRejects(() => publish(swamp, methods), TrackerError, "no such");
  assertEquals(cursorOf(swamp), undefined);

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
    "status key 'in_progress' is not in the statuses global argument " +
      "(mapped: shipped)",
  );
  assertEquals(cursorOf(unmapped), undefined);
});

/** An adapter that accepts comments and must never be asked for a status. */
function adapterless(): TrackerAdapter {
  return {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: () => Promise.reject(new Error("not used")),
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
      name: "unused",
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
  assert(posted[1].includes("started on definition"), posted[1]);
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
function historyTicket() {
  const writes: string[] = [];
  const state = {
    status: "Todo",
    type: "feature",
    failEntry: "",
    failKind: "upstream" as "upstream" | "invalid",
  };
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: () => {
      writes.push("fetch");
      return Promise.resolve({
        id: "T1",
        display: "T-1",
        title: "A ticket",
        url: "u",
        status: { id: state.status, name: state.status },
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
    },
  };
  const statuses = {
    open: "Todo",
    triaged: "Triaged",
    in_progress: "In Progress",
    in_review: "In Review",
    shipped: "Done",
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
    // The status, once, for the stage the work item is in now.
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
  assertEquals(writes.slice(before), []);
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

Deno.test("publish, entries: an entry whose status key is not mapped is refused", async () => {
  const swamp = fakeSwamp();
  const { methods } = historyTicket();
  const doc = entriesDefinition() as { stages: Record<string, unknown>[] };
  (doc.stages[0].tracker as { entries: Record<string, unknown>[] })
    .entries[0].status = "nowhere";
  await trackedItem(swamp, { test: "T1" }, doc);
  await assertRejects(
    () => publish(swamp, methods),
    TrackerError,
    "status key 'nowhere' labels an entry",
  );
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
  assert(lab.writes[0].startsWith("comment "), lab.writes.join("\n"));

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
      });
    },
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
