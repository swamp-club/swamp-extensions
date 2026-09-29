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
import { deliveryName, trackerMethods } from "./tracker_methods.ts";

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
