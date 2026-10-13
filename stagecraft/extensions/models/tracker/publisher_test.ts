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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { type FakeSwamp, fakeSwamp } from "../_lib/engine/tracker_testing.ts";
import {
  TRACKED_ITEM,
  trackedDefinition,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";
import type { TrackerAdapter } from "../_lib/tracker/core/adapter.ts";
import {
  type TrackerContext,
  trackerMethods,
} from "../_lib/tracker/core/tracker_methods.ts";
import { RoundRecordSchema } from "../_lib/tracker/core/round_method.ts";
import { model as publisher } from "./publisher.ts";

// The publisher against a tracker written as a separate extension: a model
// with only describe and operate, here over an in-memory tracker. The
// workflow's calls are made by hand, as publish_trace_test.ts does.

const PUBLISHER = "tracker";
const EXTERNAL = "acme-tracker";

/** A third party's tracker model: describe and operate, nothing else. */
function external() {
  const writes: string[] = [];
  const statuses = new Map<string, string>();
  const adapter: TrackerAdapter = {
    tracker: "acme",
    origin: "snapshot",
    capabilities: {},
    create: (draft) => {
      writes.push(`create ${draft.type}: ${draft.title}`);
      return Promise.resolve({
        id: "a-9",
        display: "A-9",
        title: draft.title,
        status: { id: "s", name: "Todo" },
        relations: [],
      });
    },
    fetchIssue: (id) =>
      Promise.resolve({
        id,
        display: id.toUpperCase(),
        title: "A ticket",
        status: { id: "s", name: statuses.get(id) ?? "Todo" },
        relations: [],
      }),
    comment: (id, body) => {
      writes.push(`comment ${id}: ${body.split("\n")[0]}`);
      return Promise.resolve({ id: `c${writes.length}` });
    },
    setStatus: (id, name) => {
      writes.push(`status ${id}: ${name}`);
      statuses.set(id, name);
      return Promise.resolve({ changed: true, status: { id: name, name } });
    },
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
  };
  const { describe, operate } = trackerMethods({
    tracker: "acme",
    adapter: () => adapter,
    statuses: () => ({}),
  });
  return { writes, model: { describe, operate } };
}

function setup(swamp: FakeSwamp) {
  swamp.globalArgs.set(PUBLISHER, {
    tracker: EXTERNAL,
    statuses: { in_progress: "Doing", in_review: "Review", shipped: "Done" },
  });
}

type Method = {
  arguments: { parse(v: unknown): unknown };
  execute: (args: never, ctx: TrackerContext) => Promise<unknown>;
};

const call = async (
  method: Method,
  ctx: TrackerContext,
  input: Record<string, unknown>,
) => await method.execute(method.arguments.parse(input) as never, ctx);

/** A shipped workflow's calls, by hand: rounds, each with its operate calls
 * (stopping at the first that failed) and its read, then the check. */
async function byWorkflow(
  swamp: FakeSwamp,
  tracker: ReturnType<typeof external>,
  args: Record<string, unknown>,
  record: string,
) {
  for (let n = 0; n < 20; n++) {
    await call(publisher.methods.round, swamp.context(PUBLISHER), args);
    const state = RoundRecordSchema.parse(
      swamp.resources.get(PUBLISHER)?.get(record)?.at(-1),
    );
    if (state.done) break;
    for (const op of [...state.ops, ...state.reads]) {
      const prev = swamp.resources.get(EXTERNAL)?.get(op.prev)?.at(-1);
      if (op.prev !== "" && prev?.ok !== true) break;
      await call(tracker.model.operate, swamp.context(EXTERNAL), {
        operation: op.operation,
        request: op.request,
        answer: op.answer,
        run: args.run,
      });
    }
  }
  await call(publisher.methods.round, swamp.context(PUBLISHER), {
    ...args,
    check: true,
  });
}

/** The publish workflow's calls, by hand. */
async function publishByWorkflow(
  swamp: FakeSwamp,
  tracker: ReturnType<typeof external>,
  run: string,
) {
  await byWorkflow(
    swamp,
    tracker,
    { kind: "publish", workItem: TRACKED_ITEM, run },
    `round-publish-${run}`,
  );
}

Deno.test("publisher: publishes to a tracker that has only describe and operate, keeping the ledger and cursor itself", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  const item = await trackedItem(swamp, { acme: "a-1" });
  await item.advance("submit");
  await publishByWorkflow(swamp, tracker, "run-1");
  assertEquals(tracker.writes, [
    "comment a-1: **tracked-abcdefgh** started in factory `tracked-factory`, at stage **write**.",
    "comment a-1: **tracked-abcdefgh** entered **review** (cycle 1) by `submit`.",
    "comment a-1: **tracked-abcdefgh** is waiting on a person in **review**:",
    "status a-1: Review",
  ]);
  const own = [...swamp.resources.get(PUBLISHER)?.keys() ?? []];
  assert(own.includes(`cursor-${TRACKED_ITEM}`));
  assert(own.some((name) => name.startsWith("delivery-publish-comment-")));
  const theirs = [...swamp.resources.get(EXTERNAL)?.keys() ?? []];
  assert(theirs.every((n) => n === "description" || n.startsWith("answer-")));

  // A second run finds everything delivered and writes nothing.
  await item.approve("ship-approval");
  await item.advance("ship");
  await publishByWorkflow(swamp, tracker, "run-2");
  assertEquals(tracker.writes.slice(4), [
    "comment a-1: **tracked-abcdefgh**: user:alice approved `ship-approval` in **review**.",
    "comment a-1: **tracked-abcdefgh** finished at **done** by `ship`.",
    "status a-1: Done",
  ]);
  await publishByWorkflow(swamp, tracker, "run-3");
  assertEquals(tracker.writes.length, 7);
});

Deno.test("publisher: refuses a tracker that has not described itself, naming the command", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  await trackedItem(swamp, { acme: "a-1" });
  const error = await assertRejects(() =>
    call(publisher.methods.round, swamp.context(PUBLISHER), {
      kind: "publish",
      workItem: TRACKED_ITEM,
      run: "r",
    })
  );
  assert(
    (error as Error).message.includes(
      `swamp model method run ${EXTERNAL} describe`,
    ),
  );
});

Deno.test("publisher: refuses a tracker that speaks another contract version", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  const description = swamp.resources.get(EXTERNAL)?.get("description");
  description?.push({ ...description.at(-1), contract: 99 });
  await trackedItem(swamp, { acme: "a-1" });
  const error = await assertRejects(() =>
    call(publisher.methods.round, swamp.context(PUBLISHER), {
      kind: "publish",
      workItem: TRACKED_ITEM,
      run: "r",
    })
  );
  assert((error as Error).message.includes("contract 99"));
});

Deno.test("publisher: create files the ticket on the tracker once, and records its snapshot", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  await byWorkflow(swamp, tracker, {
    kind: "create",
    run: "run-c",
    title: "Broken login",
    type: "bug",
  }, "round-create-run-c");
  assertEquals(tracker.writes, ["create bug: Broken login"]);
  const snapshot = swamp.resources.get(PUBLISHER)?.get("issue-a-9")?.at(-1);
  assertEquals([snapshot?.origin, snapshot?.tracker, snapshot?.title], [
    "snapshot",
    "acme",
    "Broken login",
  ]);
});

Deno.test("publisher: claim reads the ticket from the tracker and reserves a key on the publisher", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  swamp.factory("acme-factory", trackedDefinition(), {
    tracker: PUBLISHER,
  });
  await byWorkflow(swamp, tracker, {
    kind: "claim",
    run: "run-k",
    issue: "a-7",
    factory: "acme-factory",
  }, "round-claim-run-k");
  const claim = swamp.resources.get(PUBLISHER)?.get("ticket-a-7")?.at(-1);
  assertEquals(claim?.key, "a-7");
  assert(swamp.resources.get(PUBLISHER)?.has("issue-a-7"));
  assertEquals(tracker.writes, []);
});

Deno.test("publisher: a round that fails stops its run with no calls left to make, and the check says why", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  const item = await trackedItem(swamp, { acme: "a-1" });
  await item.advance("submit");
  const args = { kind: "publish", workItem: TRACKED_ITEM, run: "run-x" };
  const record = () =>
    RoundRecordSchema.parse(
      swamp.resources.get(PUBLISHER)?.get("round-publish-run-x")?.at(-1),
    );
  await call(publisher.methods.round, swamp.context(PUBLISHER), args);
  const first = record();
  assert(
    first.ops.length + first.reads.length > 0,
    "the first round planned calls",
  );
  // The tracker's description is gone before the next round.
  swamp.resources.get(EXTERNAL)?.delete("description");
  await assertRejects(() =>
    call(publisher.methods.round, swamp.context(PUBLISHER), args)
  );
  const stopped = record();
  assertEquals([stopped.ops, stopped.reads], [[], []]);
  assert(stopped.error?.includes("has not described itself"), stopped.error);
  const check = await assertRejects(() =>
    call(publisher.methods.round, swamp.context(PUBLISHER), {
      ...args,
      check: true,
    })
  );
  assert((check as Error).message.includes("has not described itself"));
});

Deno.test("publisher: a tracker's answer that breaks the contract stops the run, naming what is wrong", async () => {
  const swamp = fakeSwamp();
  setup(swamp);
  const tracker = external();
  await tracker.model.describe.execute({}, swamp.context(EXTERNAL));
  const item = await trackedItem(swamp, { acme: "a-1" });
  await item.advance("submit");
  // The tracker answers every write with a result that has no id.
  const operate = tracker.model.operate;
  const broken = {
    ...operate,
    execute: async (
      args: Parameters<typeof operate.execute>[0],
      ctx: TrackerContext,
    ) => {
      const out = await operate.execute(args, ctx);
      const name = args.answer;
      const versions = swamp.resources.get(EXTERNAL)?.get(name);
      const last = versions?.at(-1);
      if (last?.ok === true && last.operation === "comment") {
        versions?.push({ ...last, result: { url: "u" } });
      }
      return out;
    },
  };
  const error = await assertRejects(() =>
    byWorkflow(
      swamp,
      { ...tracker, model: { ...tracker.model, operate: broken } },
      { kind: "publish", workItem: TRACKED_ITEM, run: "run-b" },
      "round-publish-run-b",
    )
  );
  assert(
    (error as Error).message.includes(
      "comment answer does not meet the contract",
    ),
    (error as Error).message,
  );
});
