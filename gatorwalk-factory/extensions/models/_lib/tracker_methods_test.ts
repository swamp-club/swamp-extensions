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
import { type FakeSwamp, fakeSwamp } from "./fake_swamp.ts";
import { type TrackerAdapter, TrackerError } from "./tracker.ts";
import {
  deliveryName,
  type TrackerContext,
  trackerMethods,
} from "./tracker_methods.ts";
import { PROJECTED_ITEM, projectedItem } from "./test_support.ts";

// The shared methods over a scripted in-memory adapter: what they do with the
// ledger, snapshots and status keys, independent of any tracker.

const INSTANCE = "tracker";
const NOW = new Date("2026-09-29T00:00:00Z");

function scripted() {
  const calls: string[] = [];
  let status = { id: "s1", name: "Todo" };
  const adapter: TrackerAdapter = {
    tracker: "test",
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
  const state = {
    status: "Todo",
    failComment: 0,
    statusError: null as Error | null,
  };
  let commentCalls = 0;
  const adapter: TrackerAdapter = {
    tracker: "test",
    fetchIssue: () => Promise.reject(new Error("not used")),
    comment: (_issueId, body) => {
      commentCalls++;
      if (commentCalls === state.failComment) {
        return Promise.reject(new TrackerError("upstream", "test", "boom"));
      }
      posted.push(body);
      return Promise.resolve({ id: `c${posted.length}`, url: "u" });
    },
    setStatus: (_issueId, name) => {
      if (state.statusError !== null) return Promise.reject(state.statusError);
      moves.push(name);
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
  return { posted, moves, state, methods };
}

async function publish(
  swamp: FakeSwamp,
  methods: Methods,
  ctx: TrackerContext = swamp.context(INSTANCE),
) {
  const method = methods.publish;
  return await method.execute(
    method.arguments.parse({ workItem: PROJECTED_ITEM }),
    ctx,
  );
}

function cursorOf(swamp: FakeSwamp) {
  return swamp.resources.get(INSTANCE)?.get(`cursor-${PROJECTED_ITEM}`)?.at(
    -1,
  );
}

Deno.test("publish: comments on each event a person needs, sets the status, and a re-run writes nothing", async () => {
  const swamp = fakeSwamp();
  const { posted, moves, methods } = ticket();
  const item = await projectedItem(swamp, { test: "T1" });
  await item.advance("submit");

  await publish(swamp, methods);
  assertEquals(posted.length, 3, posted.join("\n"));
  assert(posted[0].includes("started on lifecycle `projected`"));
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
  const item = await projectedItem(swamp, { test: "T1" });
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
  const item = await projectedItem(swamp, { test: "T1" });
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
  await projectedItem(swamp, { test: "T1" });

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
  await projectedItem(swamp, { test: "T1" });

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
      { workItem: PROJECTED_ITEM, journalVersion: 1 },
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
  await projectedItem(swamp, { test: "T1" });
  state.statusError = new TrackerError("invalid", "test", "no such status");
  await assertRejects(() => publish(swamp, methods), TrackerError, "no such");
  assertEquals(cursorOf(swamp), undefined);

  const unmapped = fakeSwamp();
  await projectedItem(unmapped, { test: "T1" });
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
    fetchIssue: () => Promise.reject(new Error("not used")),
    comment: () => Promise.resolve({ id: "c", url: "u" }),
    setStatus: () => Promise.reject(new Error("no status write expected")),
  };
}

Deno.test("publish: a delivered event worded differently by a later version counts as delivered", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await projectedItem(swamp, { test: "T1" });
  const name = deliveryName(
    "comment",
    { workItem: PROJECTED_ITEM, journalVersion: 1 },
    "publish",
  );
  assertEquals(name, `delivery-publish-comment-${PROJECTED_ITEM}-1`);
  await swamp.context(INSTANCE).writeResource?.("delivery", name, {
    action: "comment",
    issue: "T1",
    workItem: PROJECTED_ITEM,
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

Deno.test("publish: refuses a work item with no ticket, another ticket than before, or no run", async () => {
  const noRef = fakeSwamp();
  await projectedItem(noRef, { other: "X1" });
  await assertRejects(
    () => publish(noRef, ticket().methods),
    Error,
    "has no externalRefs.test",
  );

  const moved = fakeSwamp();
  await projectedItem(moved, { test: "T1" });
  await moved.context(INSTANCE).writeResource?.(
    "cursor",
    `cursor-${PROJECTED_ITEM}`,
    {
      workItem: PROJECTED_ITEM,
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
    `no work item '${PROJECTED_ITEM}'`,
  );
});

Deno.test("publish: needs readModelData", async () => {
  const swamp = fakeSwamp();
  const { methods } = ticket();
  await projectedItem(swamp, { test: "T1" });
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
  await projectedItem(swamp, { test: "T1" });
  // A repinning reset cut short: a newer copy the run does not name.
  const versions = swamp.resources.get(PROJECTED_ITEM)?.get("lifecycle");
  assert(versions !== undefined);
  const pinned = structuredClone(versions[0]);
  versions.push({
    ...pinned,
    digest: "sha256:unused",
    lifecycle: {
      ...(pinned.lifecycle as Record<string, unknown>),
      name: "unused",
    },
  });

  await assertRejects(
    () => publish(swamp, methods),
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
        { name: "lifecycle", version: 1, content: versions[1] },
        { name: "lifecycle", version: 1, content: "not json" },
        { name: "lifecycle", version: 1 },
        { name: "lifecycle", version: 1, content: JSON.stringify(pinned) },
      ]);
    },
  };
  await publish(swamp, methods, ctx);
  assertEquals(queries, [
    `modelName == "${PROJECTED_ITEM}" && specName == "lifecycle" && ` +
    'name == "lifecycle" && version == 1',
  ]);
  assertEquals(posted.length, 1);
});

Deno.test("publish: keeps its own ledger records, so a hand-keyed comment neither stands in for nor blocks it", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await projectedItem(swamp, { test: "T1" });
  // Someone used publish's key by hand, on another ticket.
  await methods.comment.execute(
    methods.comment.arguments.parse({
      issue: "T9",
      body: "by hand",
      workItem: PROJECTED_ITEM,
      journalVersion: "1",
    }),
    swamp.context(INSTANCE),
  );
  await publish(swamp, methods);
  assertEquals(posted.length, 2, posted.join("\n"));
  assert(posted[1].includes("started on lifecycle"), posted[1]);
});

Deno.test("publish: a failing version query falls back to the latest copy of the pinned lifecycle", async () => {
  const swamp = fakeSwamp();
  const { posted, methods } = ticket();
  await projectedItem(swamp, { test: "T1" });
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
