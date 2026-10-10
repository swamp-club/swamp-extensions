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
import { computeMetrics, type Metrics } from "./metrics.ts";
import {
  DEFINITION_SCHEMA_VERSION,
  parseDefinition,
} from "./definition_schema.ts";
import { expectedOf, recordDispatch, recordOutcome, start } from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import { contextStore, loadRun } from "./run_store.ts";
import {
  advanceMethod,
  decide,
  describeStatus,
  dispatch,
  grantOverrideMethod,
  type MethodContextLike,
  rebuildMetrics,
  recordProductMethod,
  recordUsageMethod,
  resetMethod,
  startWorkItem,
} from "./work_item_ops.ts";
import {
  ALICE,
  handoffDefinition,
  handoffParsedDefinition,
  settableEnv,
  stopsDefinition,
  stopsParsedDefinition,
  TEST_TRACKER,
  testEnv,
} from "./test_support.ts";

const ITEM = "stops-abcdefgh";
const MINUTE = 60_000;

/** A work item on the stops factory definition, driven through the work-item
 * operations on a clock the test sets. */
async function driven(definition = stopsDefinition()) {
  const swamp = fakeSwamp();
  swamp.factory("team", definition);
  const env = settableEnv("2026-09-29T10:00:00.000Z");
  const failing = { metrics: false };
  const ctx = (): MethodContextLike => {
    const context = swamp.context(ITEM);
    const write = context.writeResource!;
    return {
      ...context,
      writeResource: (spec, name, data) =>
        failing.metrics && spec === "metrics"
          ? Promise.reject(new Error("disk full"))
          : write(spec, name, data),
    };
  };
  const expected = async () => {
    const view = await describeStatus(ctx(), env);
    return {
      expectedStage: view.expected.expectedStage,
      expectedCycle: view.expected.expectedCycle,
      expectedEra: view.expected.expectedEra,
    };
  };
  await startWorkItem(ctx(), { factory: "team" }, env);
  return {
    swamp,
    failing,
    rebuild: () => rebuildMetrics(ctx(), env),
    at: (hhmm: string) => env.at(`2026-09-29T${hhmm}:00.000Z`),
    record: async (
      kind: "artifact" | "evidence",
      name: string,
      payload: Record<string, unknown>,
    ) =>
      recordProductMethod(
        ctx(),
        kind,
        { name, payload, ...await expected() },
        env,
      ),
    dispatch: async () => dispatch(ctx(), await expected(), env),
    usage: (dispatchId: number, inputTokens: number, outputTokens: number) =>
      recordUsageMethod(
        ctx(),
        { dispatchId, inputTokens, outputTokens, model: "m1" },
        env,
      ),
    usageTotal: (dispatchId: number, totalTokens: number) =>
      recordUsageMethod(
        ctx(),
        { dispatchId, totalTokens, toolUses: 4, durationMs: 90_000 },
        env,
      ),
    decide: async (
      gateId: string,
      decision: "approve" | "decline",
      note?: string,
    ) =>
      decide(
        ctx(),
        decision,
        {
          gateId,
          ...(note !== undefined ? { note } : {}),
          ...await expected(),
        },
        env,
      ),
    move: async (transition: string) =>
      advanceMethod(ctx(), { transition, ...await expected() }, env),
    grantDispatch: async () =>
      grantOverrideMethod(
        ctx(),
        { kind: "dispatch", ...await expected() },
        env,
      ),
    reset: async () =>
      resetMethod(ctx(), { confirm: "reset", ...await expected() }, env),
  };
}

async function runOf(swamp: FakeSwamp): Promise<RunRecord> {
  const run = await loadRun(contextStore(swamp.context(ITEM)));
  assert(run !== null);
  return run;
}

function storedMetrics(swamp: FakeSwamp): Metrics {
  const versions = swamp.resources.get(ITEM)?.get("metrics") ?? [];
  return versions.at(-1) as unknown as Metrics;
}

/** The item from start to done, every metric exercised once. */
async function toDone() {
  const wi = await driven();
  wi.at("10:05");
  await wi.dispatch();
  wi.at("10:06");
  await wi.usage(1, 100, 50);
  wi.at("10:07");
  await wi.dispatch(); // a retry, reporting no usage
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit"); // review: waiting on `go` from 10:10
  wi.at("10:20");
  await wi.decide("go", "decline", "needs tests");
  wi.at("10:25");
  await wi.record("artifact", "review", { text: "tests added" });
  wi.at("10:30");
  await assertRejects(() => wi.record("artifact", "review", { text: "" }));
  wi.at("10:40");
  await wi.decide("go", "approve");
  wi.at("10:45");
  await wi.move("approve");
  wi.at("10:50");
  await wi.record("evidence", "pr", { status: "ok" }); // cooldown to 10:51
  wi.at("11:00");
  await wi.grantDispatch();
  wi.at("11:30");
  await wi.decide("release-ok", "approve");
  wi.at("11:31");
  await wi.move("release");
  return wi;
}

Deno.test("metrics: stage times, waits, rework, dispatches, overrides and usage of a finished item", async () => {
  const { swamp } = await toDone();
  const run = await runOf(swamp);
  const m = computeMetrics(run, stopsParsedDefinition());
  assertEquals(m.status, "terminal");
  assertEquals(m.factory, run.factory);
  assertEquals(m.startedAt, "2026-09-29T10:00:00.000Z");
  assertEquals(m.endedAt, "2026-09-29T11:31:00.000Z");
  assertEquals(m.durationMs, 91 * MINUTE);
  assertEquals(m.eras.length, 1);

  const era = m.eras[0];
  assertEquals(era.endedBy, "terminal");
  assertEquals(
    era.visits.map((v) => [v.stage, v.durationMs, v.leftBy]),
    [
      ["draft", 10 * MINUTE, "submit"],
      ["review", 35 * MINUTE, "approve"],
      ["ship", 46 * MINUTE, "release"],
      ["done", null, null],
    ],
  );
  assertEquals(
    era.waits.map((w) => [w.transition, w.from, w.durationMs, w.endedBy]),
    [
      ["approve", "2026-09-29T10:10:00.000Z", 10 * MINUTE, "declined"],
      ["approve", "2026-09-29T10:25:00.000Z", 15 * MINUTE, "approved"],
      // From when the cooldown lifted, not when the evidence landed.
      ["release", "2026-09-29T10:51:00.000Z", 39 * MINUTE, "approved"],
    ],
  );
  assertEquals(era.dispatches, [{
    stage: "draft",
    cycle: 1,
    dispatches: 2,
    retries: 1,
    outcomes: { succeeded: 0, failed: 0, interrupted: 0, open: 0, none: 2 },
  }]);

  const s = m.summary;
  assertEquals(s.stages.review, {
    visits: 1,
    reentries: 0,
    timeMs: 35 * MINUTE,
    open: false,
  });
  assertEquals(s.waits, { count: 3, open: 0, timeMs: 64 * MINUTE });
  assertEquals(s.rework, {
    reentries: 0,
    reviewRounds: { review: { reviews: "plan", rounds: 1 } },
    declines: 1,
    rejections: 1,
  });
  assertEquals(s.dispatches, { count: 2, retries: 1 });
  assertEquals(s.overrides, { cycle: 0, dispatch: 1 });
  assertEquals(s.usage, {
    totalTokens: 150,
    inputTokens: 100,
    outputTokens: 50,
    dispatchesWithSplit: 1,
    toolUses: 0,
    durationMs: 0,
    byModel: {
      m1: {
        totalTokens: 150,
        inputTokens: 100,
        outputTokens: 50,
        dispatches: 1,
      },
    },
    dispatchesWithUsage: 1,
    dispatchesWithoutUsage: 1,
    withoutUsageByMode: { interactive: 1 },
    attested: true,
  });
});

Deno.test("metrics: a harness total counts as reported; the split only where given", async () => {
  const wi = await driven();
  await wi.dispatch();
  await wi.usage(1, 100, 50);
  await wi.dispatch();
  // The total a harness reports for a subagent, with no split: counted as
  // is, and not checked against any split.
  await wi.usageTotal(2, 65_155);
  const u = storedMetrics(wi.swamp).summary.usage;
  assertEquals(u.totalTokens, 150 + 65_155);
  assertEquals([u.inputTokens, u.outputTokens, u.dispatchesWithSplit], [
    100,
    50,
    1,
  ]);
  assertEquals([u.toolUses, u.durationMs], [4, 90_000]);
  assertEquals(u.byModel, {
    m1: { totalTokens: 150, inputTokens: 100, outputTokens: 50, dispatches: 1 },
    unknown: {
      totalTokens: 65_155,
      inputTokens: 0,
      outputTokens: 0,
      dispatches: 1,
    },
  });
  assertEquals([u.dispatchesWithUsage, u.dispatchesWithoutUsage], [2, 0]);
});

Deno.test("metrics: dispatches without usage count by mode, from the pinned definition when not recorded", async () => {
  const { swamp } = await toDone();
  const run = await runOf(swamp);
  assertEquals(run.dispatches.map((d) => d.mode), [
    "interactive",
    "interactive",
  ]);
  // A dispatch recorded before its mode was kept, on a stage the pinned
  // definition now runs by dispatch: counted by the definition's mode.
  const { mode: _, ...old } = run.dispatches[1];
  const older: RunRecord = {
    ...run,
    dispatches: [...run.dispatches, { ...old, id: 3, stage: "review" }],
  };
  const pinned = stopsParsedDefinition();
  const definition = {
    ...pinned,
    stages: pinned.stages.map((stage) =>
      stage.id === "review" && stage.work !== undefined
        ? { ...stage, work: { ...stage.work, mode: "dispatch" as const } }
        : stage
    ),
  };
  const u = computeMetrics(older, definition).summary.usage;
  assertEquals(u.withoutUsageByMode, { interactive: 1, dispatch: 1 });
  assertEquals(u.dispatchesWithoutUsage, 2);
});

Deno.test("metrics: the stored record is written after every commit and matches the run it names", async () => {
  const { swamp } = await toDone();
  const run = await runOf(swamp);
  const records = swamp.resources.get(ITEM)!;
  // One metrics version per committed run version, the rejection included.
  assertEquals(records.get("metrics")?.length, records.get("run")?.length);
  const stored = storedMetrics(swamp);
  assertEquals(stored.journalVersion, run.journal.length);
  assertEquals(stored, computeMetrics(run, stopsParsedDefinition()));
});

Deno.test("metrics: an active item has open stages and waits, measured against nothing", async () => {
  const wi = await driven();
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit");
  const m = storedMetrics(wi.swamp);
  assertEquals(m.status, "active");
  assertEquals(m.endedAt, null);
  assertEquals(m.durationMs, null);
  assertEquals(m.eras[0].visits.at(-1)?.leftAt, null);
  assertEquals(m.summary.stages.review.open, true);
  assertEquals(m.eras[0].waits, [{
    kind: "exit",
    stage: "review",
    cycle: 1,
    transition: "approve",
    manual: false,
    gateIds: ["go"],
    from: "2026-09-29T10:10:00.000Z",
    until: null,
    durationMs: null,
    endedBy: null,
  }]);
  assertEquals(m.summary.waits, { count: 1, open: 1, timeMs: 0 });
});

Deno.test("metrics: a reset closes the era and its waits; totals cover every era", async () => {
  const wi = await driven();
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "one" });
  await wi.move("submit");
  wi.at("10:30");
  await wi.reset();
  wi.at("10:40");
  await wi.record("artifact", "plan", { text: "two" });
  await wi.move("submit");
  const m = storedMetrics(wi.swamp);
  assertEquals(m.eras.map((e) => [e.era, e.endedBy]), [
    ["era-1", "reset"],
    ["era-2", null],
  ]);
  assertEquals(m.eras[0].durationMs, 30 * MINUTE);
  assertEquals(m.eras[0].visits.at(-1)?.leftBy, "reset");
  assertEquals(
    m.eras[0].waits.map((w) => [w.durationMs, w.endedBy]),
    [[20 * MINUTE, "reset"]],
  );
  assertEquals(m.summary.stages.draft.visits, 2);
  // Re-entries count within an era: each era entered draft once.
  assertEquals(m.summary.stages.draft.reentries, 0);
  assertEquals(m.summary.waits, { count: 2, open: 1, timeMs: 20 * MINUTE });
});

Deno.test("metrics: a run from before awaiting was journaled has no waits, not guessed ones", async () => {
  const { swamp } = await toDone();
  const run = await runOf(swamp);
  const old = {
    ...run,
    journal: run.journal.filter((e) => e.type !== "awaiting"),
  };
  const m = computeMetrics(old, stopsParsedDefinition());
  assertEquals(m.summary.waits, { count: 0, open: 0, timeMs: 0 });
  assertEquals(m.durationMs, 91 * MINUTE);
});

Deno.test("metrics: an approval given before a cooldown lifts is no wait at human stops", async () => {
  const wi = await driven();
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit");
  wi.at("10:20");
  await wi.decide("go", "approve");
  await wi.move("approve");
  wi.at("10:30");
  await wi.record("evidence", "pr", { status: "ok" }); // lifts at 10:31
  await wi.decide("release-ok", "approve");
  const m = storedMetrics(wi.swamp);
  assertEquals(
    m.eras[0].waits.map((w) => w.transition),
    ["approve"],
  );
});

Deno.test("metrics: a restarted cooldown ends the wait and starts a new one when it lifts again", async () => {
  const wi = await driven();
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit");
  await wi.decide("go", "approve");
  await wi.move("approve");
  wi.at("10:50");
  await wi.record("evidence", "pr", { status: "ok" }); // lifts at 10:51
  wi.at("11:00");
  await wi.record("evidence", "pr", { status: "ok" }); // lifts at 11:01
  wi.at("11:30");
  await wi.decide("release-ok", "approve");
  const m = storedMetrics(wi.swamp);
  assertEquals(
    m.eras[0].waits.filter((w) => w.transition === "release").map((w) => [
      w.from,
      w.durationMs,
      w.endedBy,
    ]),
    [
      ["2026-09-29T10:51:00.000Z", 9 * MINUTE, "cleared"],
      ["2026-09-29T11:01:00.000Z", 29 * MINUTE, "approved"],
    ],
  );
});

Deno.test("metrics: a failed metrics write is logged, not thrown; rebuild_metrics brings the record level", async () => {
  const wi = await driven();
  wi.at("10:10");
  await wi.record("artifact", "plan", { text: "the plan" });
  wi.failing.metrics = true;
  await wi.move("submit"); // committed, though its metrics were not written
  const run = await runOf(wi.swamp);
  assertEquals(run.stage, "review");
  assert(
    String(
      wi.swamp.logs.find((l) => l.props?.warning !== undefined)?.props
        ?.warning,
    ).includes("Run rebuild_metrics"),
  );
  assert(storedMetrics(wi.swamp).journalVersion < run.journal.length);

  wi.failing.metrics = false;
  await wi.rebuild();
  assertEquals(
    storedMetrics(wi.swamp),
    computeMetrics(run, stopsParsedDefinition()),
  );
  const versions = wi.swamp.resources.get(ITEM)!.get("metrics")!.length;
  await wi.rebuild(); // level: writes nothing
  assertEquals(wi.swamp.resources.get(ITEM)!.get("metrics")!.length, versions);
  assert(
    String(wi.swamp.logs.at(-1)?.props?.summary).includes("up to date"),
  );
});

Deno.test("metrics: rebuild_metrics writes the record for an item that has none", async () => {
  const wi = await driven();
  wi.swamp.resources.get(ITEM)!.delete("metrics");
  await wi.rebuild();
  assertEquals(
    storedMetrics(wi.swamp),
    computeMetrics(await runOf(wi.swamp), stopsParsedDefinition()),
  );
});

/** The handoff item into attest, its change built at 10:05. */
async function attesting() {
  const wi = await driven(handoffDefinition());
  wi.at("10:05");
  await wi.record("artifact", "change", { text: "the change" });
  await wi.move("built");
  return wi;
}

Deno.test("metrics: a manual exit is no wait while the agent works; waits held at once count once", async () => {
  const wi = await attesting();
  wi.at("10:10");
  await wi.record("evidence", "attestation", { text: "att-1" });
  wi.at("10:20");
  await wi.decide("open-pr", "approve");
  wi.at("10:21");
  await wi.move("attested");
  wi.at("10:30");
  await wi.record("evidence", "merge", { status: "merged" });
  wi.at("10:35");
  await wi.move("merged");
  const m = computeMetrics(await runOf(wi.swamp), handoffParsedDefinition());
  assertEquals(m.status, "terminal");
  // complete waited only while the person was asked about open-pr; never
  // while the agent built the attestation or waited for the merge.
  assertEquals(
    m.eras[0].waits.map((w) => [w.stage, w.transition, w.from, w.endedBy]),
    [
      ["attest", "attested", "2026-09-29T10:10:00.000Z", "approved"],
      ["attest", "complete", "2026-09-29T10:10:00.000Z", "cleared"],
    ],
  );
  assertEquals(m.summary.waits, { count: 2, open: 0, timeMs: 10 * MINUTE });
});

Deno.test("metrics: a wait still open stays out of the time, beside a finished one it overlaps", async () => {
  const wi = await attesting();
  wi.at("10:10");
  await wi.record("evidence", "attestation", { text: "att-1" });
  wi.at("10:15");
  await wi.decide("open-pr", "decline");
  const m = computeMetrics(await runOf(wi.swamp), handoffParsedDefinition());
  assertEquals(
    m.eras[0].waits.map((w) => [w.transition, w.durationMs, w.endedBy]),
    [["attested", 5 * MINUTE, "declined"], ["complete", null, null]],
  );
  assertEquals(m.summary.waits, { count: 2, open: 1, timeMs: 5 * MINUTE });
});

Deno.test("metrics: a dispatch refused at the cap waits on a dispatch override until one is granted or the item moves on", async () => {
  const wi = await driven();
  wi.at("10:01");
  await wi.dispatch();
  wi.at("10:02");
  await wi.dispatch();
  wi.at("10:05");
  await assertRejects(
    () => wi.dispatch(),
    Error,
    "runaway loop suspected: stage 'draft' cycle 1 has had 2 dispatch(es)",
  );
  // The park's own commit writes the metrics record.
  assertEquals(storedMetrics(wi.swamp).eras[0].waits, [{
    kind: "dispatch-override",
    stage: "draft",
    cycle: 1,
    transition: null,
    manual: false,
    gateIds: [],
    from: "2026-09-29T10:05:00.000Z",
    until: null,
    durationMs: null,
    endedBy: null,
  }]);
  wi.at("10:07");
  await assertRejects(() => wi.dispatch());
  wi.at("10:15");
  await wi.grantDispatch();
  wi.at("10:16");
  await wi.dispatch();
  wi.at("10:20");
  await assertRejects(() => wi.dispatch());
  wi.at("10:30");
  await wi.record("artifact", "plan", { text: "the plan" });
  await wi.move("submit");
  const m = storedMetrics(wi.swamp);
  assertEquals(
    m.eras[0].waits.map((w) => [w.kind, w.from, w.until, w.endedBy]),
    [
      [
        "dispatch-override",
        "2026-09-29T10:05:00.000Z",
        "2026-09-29T10:15:00.000Z",
        "overridden",
      ],
      [
        "dispatch-override",
        "2026-09-29T10:20:00.000Z",
        "2026-09-29T10:30:00.000Z",
        "advanced",
      ],
      ["exit", "2026-09-29T10:30:00.000Z", null, null],
    ],
  );
  assertEquals(m.summary.waits, { count: 3, open: 1, timeMs: 20 * MINUTE });
  assertEquals(m.summary.overrides, { cycle: 0, dispatch: 1 });
});

Deno.test("metrics: an interrupted dispatch is not a retry, and dispatches without an outcome are open only in the current entry", () => {
  const parsed = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "work",
        initial: true,
        transitions: [{ name: "done", to: "end" }],
      },
      { id: "end", terminal: true },
    ],
  });
  assert(parsed.ok);
  const definition = parsed.value;
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:x",
    },
    ALICE,
    env,
  );
  const next = (supersedes?: number) => {
    const result = recordDispatch(
      run,
      definition,
      expectedOf(run),
      { inputs: {}, ...(supersedes !== undefined ? { supersedes } : {}) },
      ALICE,
      env,
    );
    assert(result.ok);
    run = result.run;
  };
  next();
  next(1);
  const failed = recordOutcome(run, 2, "failed", undefined, ALICE, env);
  assert(failed.ok);
  run = failed.run;
  next();
  const m = computeMetrics(run, definition);
  assertEquals(m.eras[0].dispatches, [{
    stage: "work",
    cycle: 1,
    dispatches: 3,
    retries: 1,
    outcomes: { succeeded: 0, failed: 1, interrupted: 1, open: 1, none: 0 },
  }]);
  assertEquals(m.summary.dispatches, { count: 3, retries: 1 });
  assertEquals(m.summary.dispatchOutcomes.interrupted, 1);
});
