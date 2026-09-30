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
import { makeGateEvaluator } from "./gates.ts";
import type { Actor, AwaitingExit, JournalEvent } from "./journal.ts";
import {
  advance,
  expectedOf,
  recordApproval,
  recordDispatch,
} from "./run_ops.ts";
import { noteAwaiting, personHeldExits } from "./awaiting.ts";
import { parseDefinition } from "./definition_schema.ts";
import {
  committingStore,
  loadRun,
  memoryStore,
  recordProduct,
  startRun,
  update,
} from "./run_store.ts";
import type { RunRecord } from "./run_record.ts";
import {
  ALICE,
  BOB,
  expectNow,
  settableEnv,
  stopsParsedDefinition,
} from "./test_support.ts";

/** A work item on the stops factory definition, committing through
 * committingStore. */
async function item(minApprovals = 1) {
  const definition = stopsParsedDefinition(minApprovals);
  const env = settableEnv("2026-09-29T10:00:00.000Z");
  const store = committingStore(memoryStore(), definition, env);
  assert(
    (await startRun(
      store,
      definition,
      { key: "wi-1", definitionDigest: "sha256:l" },
      ALICE,
      env,
    )).ok,
  );
  const ok = <T extends { ok: boolean }>(result: T): T => {
    assert(result.ok, JSON.stringify(result));
    return result;
  };
  return {
    env,
    store,
    run: async (): Promise<RunRecord> => (await loadRun(store))!,
    record: async (
      kind: "artifact" | "evidence",
      name: string,
      payload: Record<string, unknown>,
    ) =>
      ok(
        await recordProduct(
          store,
          definition,
          await expectNow(store),
          kind,
          name,
          payload,
          ALICE,
          env,
        ),
      ),
    decide: async (
      gateId: string,
      decision: "approve" | "decline",
      actor: Actor = ALICE,
    ) =>
      ok(
        await update(store, (run) =>
          recordApproval(
            run,
            definition,
            expectedOf(run),
            { gateId, decision },
            actor,
            env,
          )),
      ),
    move: async (transition: string, manualConfirmed = false) =>
      ok(
        await update(store, (run) =>
          advance(
            run,
            definition,
            expectedOf(run),
            { transition, manualConfirmed },
            makeGateEvaluator(definition, store, env),
            ALICE,
            env,
          )),
      ),
    dispatch: async () =>
      ok(
        await update(store, (run) =>
          recordDispatch(
            run,
            definition,
            expectedOf(run),
            { inputs: {} },
            ALICE,
            env,
          )),
      ),
  };
}

function awaitings(run: RunRecord) {
  return run.journal.filter((e): e is Extract<
    JournalEvent,
    { type: "awaiting" }
  > => e.type === "awaiting");
}

function names(exits: AwaitingExit[]): string[] {
  return exits.map((e) => e.transition);
}

/** draft -> review, the plan recorded. */
async function inReview(minApprovals = 1) {
  const wi = await item(minApprovals);
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit");
  return wi;
}

Deno.test("awaiting: entering a stage whose exit needs an approval notes it in the same commit", async () => {
  const wi = await inReview();
  const run = await wi.run();
  const [advanced, awaiting] = run.journal.slice(-2);
  assertEquals(advanced.type, "advanced");
  assert(awaiting.type === "awaiting");
  // The ungated manual `revise` and the global `abandon` are not stops.
  assertEquals(awaiting.exits, [{
    transition: "approve",
    to: "ship",
    manual: false,
    gateIds: ["go"],
  }]);
  assertEquals(awaiting.stage, "review");
  assertEquals(awaiting.actor, ALICE);
});

Deno.test("awaiting: nothing is noted while no exit needs a person, or when the set is unchanged", async () => {
  const wi = await item();
  assertEquals(awaitings(await wi.run()), []);
  await wi.record("artifact", "plan", { text: "the plan" });
  assertEquals(awaitings(await wi.run()), []);
  await wi.move("submit");
  await wi.dispatch();
  assertEquals(awaitings(await wi.run()).length, 1);
});

Deno.test("awaiting: an approval that opens the exit empties the set", async () => {
  const wi = await inReview();
  await wi.decide("go", "approve");
  const events = awaitings(await wi.run());
  assertEquals(events.map((e) => names(e.exits)), [["approve"], []]);
});

Deno.test("awaiting: a decline waits on rework, then on a person again once a product is recorded", async () => {
  const wi = await inReview();
  await wi.decide("go", "decline");
  await wi.record("artifact", "review", { text: "addressed" });
  await wi.decide("go", "approve");
  const events = awaitings(await wi.run());
  assertEquals(events.map((e) => names(e.exits)), [
    ["approve"],
    [],
    ["approve"],
    [],
  ]);
});

Deno.test("awaiting: with minApprovals 2 the first approval leaves the exit waiting", async () => {
  const wi = await inReview(2);
  await wi.decide("go", "approve", ALICE);
  assertEquals(awaitings(await wi.run()).length, 1);
  await wi.decide("go", "approve", BOB);
  const events = awaitings(await wi.run());
  assertEquals(events.map((e) => names(e.exits)), [["approve"], []]);
});

Deno.test("awaiting: an approval voided by a changed product makes the exit wait again", async () => {
  const wi = await inReview();
  await wi.record("artifact", "review", { text: "first" });
  await wi.decide("go", "approve");
  await wi.record("artifact", "review", { text: "changed" });
  const events = awaitings(await wi.run());
  assertEquals(events.map((e) => names(e.exits)), [["approve"], [], [
    "approve",
  ]]);
});

Deno.test("awaiting: a cooldown counts from when it lifts (readyAt)", async () => {
  const wi = await inReview();
  await wi.decide("go", "approve");
  await wi.move("approve");
  wi.env.at("2026-09-29T11:00:00.000Z");
  await wi.record("evidence", "pr", { status: "ok" });
  const last = awaitings(await wi.run()).at(-1);
  assert(last !== undefined);
  assertEquals(last.at, "2026-09-29T11:00:00.000Z");
  assertEquals(last.exits, [{
    transition: "release",
    to: "done",
    manual: false,
    gateIds: ["release-ok"],
    readyAt: "2026-09-29T11:01:00.000Z",
  }]);
});

Deno.test("awaiting: a manual exit with gates is a stop once they pass, and clears when they stop passing", async () => {
  const wi = await inReview();
  await wi.decide("go", "approve");
  await wi.move("approve");
  await wi.record("evidence", "pr", { status: "failed" });
  assertEquals(
    names(awaitings(await wi.run()).at(-1)!.exits).sort(),
    ["new-pr", "release"],
  );
  await wi.record("evidence", "pr", { status: "ok" });
  assertEquals(names(awaitings(await wi.run()).at(-1)!.exits), ["release"]);
});

Deno.test("awaiting: nothing is noted after entering a terminal stage", async () => {
  const wi = await inReview();
  await wi.decide("go", "approve");
  await wi.move("approve");
  await wi.record("evidence", "pr", { status: "ok" });
  wi.env.at("2026-09-29T12:00:00.000Z");
  await wi.decide("release-ok", "approve");
  await wi.move("release");
  const run = await wi.run();
  assertEquals(run.status, "terminal");
  assertEquals(run.journal.at(-1)?.type, "advanced");
});

Deno.test("awaiting: a cooldown restarted by a new recording is noted; one that has just lifted is not", async () => {
  const wi = await inReview();
  await wi.decide("go", "approve");
  await wi.move("approve");
  wi.env.at("2026-09-29T11:00:00.000Z");
  await wi.record("evidence", "pr", { status: "ok" });
  wi.env.at("2026-09-29T11:00:30.000Z");
  await wi.record("evidence", "pr", { status: "ok" });
  let events = awaitings(await wi.run());
  assertEquals(events.slice(-2).map((e) => e.exits[0]?.readyAt), [
    "2026-09-29T11:01:00.000Z",
    "2026-09-29T11:01:30.000Z",
  ]);
  const count = events.length;
  wi.env.at("2026-09-29T11:05:00.000Z");
  await wi.dispatch();
  events = awaitings(await wi.run());
  assertEquals(events.length, count);
});

Deno.test("awaiting: nothing is noted on a commit whose run data cannot be read", async () => {
  const wi = await inReview();
  const definition = stopsParsedDefinition();
  // The run as if its awaiting events were never noted, so a readable commit
  // would note the approval exit.
  const current = await wi.run();
  const run = {
    ...current,
    journal: current.journal.filter((e) => e.type !== "awaiting"),
  };
  const readable = await noteAwaiting(run, definition, wi.store, wi.env);
  assertEquals(awaitings(readable).length, 1);
  // A payload the run references reads back changed, so its digest fails.
  const unreadable = {
    ...memoryStore(),
    readPayload: () => Promise.resolve({ text: "tampered" }),
  };
  assertEquals(await noteAwaiting(run, definition, unreadable, wi.env), run);
});

Deno.test("awaiting: a conditional approval is a stop only while its when is true; one that errors is not a stop", async () => {
  const parsed = parseDefinition({
    schemaVersion: 1,
    name: "conditional",
    stages: [
      {
        id: "review",
        initial: true,
        artifacts: [{ name: "plan", schema: { type: "object" } }],
        transitions: [
          {
            name: "careful",
            to: "done",
            gates: [{
              type: "human-approval",
              config: {
                id: "look",
                when: '"plan" in artifacts && ' +
                  'artifacts["plan"].payload.risky == true',
              },
            }],
          },
          {
            name: "broken",
            to: "done",
            gates: [{
              type: "human-approval",
              config: { id: "fix", when: 'artifacts["plan"].payload.risky' },
            }],
          },
        ],
      },
      { id: "done", terminal: true },
    ],
  });
  assert(parsed.ok, parsed.ok ? "" : parsed.errors.join("\n"));
  const definition = parsed.value;
  const env = settableEnv("2026-09-29T10:00:00.000Z");
  const store = memoryStore();
  await startRun(
    store,
    definition,
    { key: "wi-c", definitionDigest: "sha256:c" },
    ALICE,
    env,
  );
  const held = async () =>
    names(
      await personHeldExits(
        (await loadRun(store))!,
        definition,
        store,
        env,
        env.now(),
      ),
    );
  const record = async (payload: Record<string, unknown>) =>
    assert(
      (await recordProduct(
        store,
        definition,
        await expectNow(store),
        "artifact",
        "plan",
        payload,
        ALICE,
        env,
      )).ok,
    );
  // No plan: careful's when is false; broken's cannot be evaluated.
  assertEquals(await held(), []);
  await record({ risky: true });
  assertEquals(await held(), ["careful", "broken"]);
  await record({ risky: false });
  assertEquals(await held(), []);
});
