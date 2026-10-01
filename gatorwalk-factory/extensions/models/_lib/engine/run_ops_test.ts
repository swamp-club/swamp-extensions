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
import { parseDefinition } from "./definition_schema.ts";
import {
  acceptProduct,
  advance,
  checkProduct,
  cycleLimit,
  dispatchCap,
  type Env,
  expectedOf,
  grantOverride,
  recordApproval,
  recordDispatch,
  recordUsage,
  rejectProduct,
  reset,
  retarget,
  start,
} from "./run_ops.ts";
import { currentCycle, parseRun, type RunRecord } from "./run_record.ts";
import {
  ALICE,
  FAIL,
  NOBODY,
  PASS,
  smallDefinition,
  TEST_TRACKER,
  testEnv,
} from "./test_support.ts";

const DEFINITION = smallDefinition();

function fresh(env: Env = testEnv()): RunRecord {
  return start(
    DEFINITION,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
}

async function toReview(run: RunRecord, env: Env): Promise<RunRecord> {
  const moved = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "submit" },
    PASS,
    ALICE,
    env,
  );
  assert(moved.ok, moved.ok ? "" : moved.reason);
  return moved.run;
}

// --- start ---------------------------------------------------------------------

Deno.test("start: at the initial stage, cycle 1, in a new era, journaled", () => {
  const run = fresh();
  assertEquals(run.stage, "write");
  assertEquals(run.entries, { write: 1 });
  assertEquals(run.era, "era-1");
  assertEquals(run.status, "active");
  assertEquals(run.factory, "team");
  assertEquals(run.definition, { digest: "sha256:l" });
  assertEquals(run.journal.map((e) => e.type), ["started"]);
  const started = run.journal[0];
  assert(started.type === "started");
  assertEquals(started.factory, "team");
  assertEquals(started.definition, { digest: "sha256:l" });
  assertEquals(run.journal[0].actor, ALICE);
});

// --- products ------------------------------------------------------------------

Deno.test("checkProduct: only products the current stage declares", () => {
  const run = fresh();
  assertEquals(
    checkProduct(run, DEFINITION, "artifact", "summary", { text: "t" }),
    { declared: true, errors: null },
  );
  const elsewhere = checkProduct(run, DEFINITION, "evidence", "test-run", {});
  assert(!elsewhere.declared);
  assert(elsewhere.reason.includes("does not declare evidence 'test-run'"));
});

Deno.test("checkProduct: a stage's resultEvidence uses the outcome contract", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  assertEquals(
    checkProduct(run, DEFINITION, "evidence", "test-run", {
      status: "succeeded",
      runId: "r1",
    }),
    { declared: true, errors: null },
  );
  const bad = checkProduct(run, DEFINITION, "evidence", "test-run", {
    status: "ok",
  });
  assert(bad.declared && bad.errors !== null);
});

Deno.test("products: a rejection is kept as feedback until a valid record clears it", () => {
  const env = testEnv();
  let run = fresh(env);
  const check = checkProduct(run, DEFINITION, "artifact", "summary", {
    text: "",
  });
  assert(check.declared && check.errors !== null);
  run = rejectProduct(
    run,
    "artifact",
    "summary",
    { text: "" },
    check.errors,
    ALICE,
    env,
  );
  assertEquals(run.validations.artifacts.summary.rejected, { text: "" });
  assertEquals(run.products.artifacts, {});
  run = acceptProduct(
    run,
    "artifact",
    "summary",
    { version: 1, digest: "sha256:d" },
    ALICE,
    env,
  );
  assertEquals(run.validations.artifacts, {});
  assertEquals(run.products.artifacts.summary.version, 1);
  assertEquals(run.products.artifacts.summary.stage, "write");
  assertEquals(run.journal.map((e) => e.type), [
    "started",
    "rejected",
    "recorded",
  ]);
});

// --- dispatch and usage --------------------------------------------------------

Deno.test("recordDispatch: ids never repeat, inputs are stored as plain JSON", () => {
  const env = testEnv();
  const run = fresh(env);
  const first = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: { n: 3n }, prompt: "p" },
    ALICE,
    env,
  );
  assert(first.ok);
  assertEquals(first.value, 1);
  assertEquals(first.run.dispatches[0].inputs, { n: 3 });
  const second = recordDispatch(
    first.run,
    DEFINITION,
    expectedOf(first.run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(second.ok);
  assertEquals(second.value, 2);
});

Deno.test("recordDispatch: subagent prompts are stored as sent and survive a round trip", () => {
  const env = testEnv();
  const run = fresh(env);
  const subagentPrompts = [{
    skill: "review",
    resultPaths: { review: "/r/wi-d1-1-review.json" },
    prompt: "p\n\n---\n\nWrite it to /r/wi-d1-1-review.json\n",
  }];
  const recorded = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: {}, prompt: "p\n", subagentPrompts },
    ALICE,
    env,
  );
  assert(recorded.ok);
  assertEquals(recorded.run.dispatches[0].subagentPrompts, subagentPrompts);
  const parsed = parseRun(JSON.parse(JSON.stringify(recorded.run)));
  assert(parsed.ok);
  assertEquals(parsed.value.dispatches[0].subagentPrompts, subagentPrompts);
  // A dispatch recorded without them, as before this field existed, loads.
  const plain = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(plain.ok);
  assert(!("subagentPrompts" in plain.run.dispatches[0]));
  assert(parseRun(JSON.parse(JSON.stringify(plain.run))).ok);
});

Deno.test("recordUsage: attaches to a named dispatch after the run moved on, once", async () => {
  const env = testEnv();
  const run = fresh(env);
  const dispatched = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(dispatched.ok);
  const moved = await toReview(dispatched.run, env);
  const usage = recordUsage(
    moved,
    1,
    { inputTokens: 10, outputTokens: 5 },
    ALICE,
    env,
  );
  assert(usage.ok);
  assertEquals(usage.run.dispatches[0].usage, {
    inputTokens: 10,
    outputTokens: 5,
    attested: true,
  });
  assertEquals(usage.run.dispatches[0].stage, "write");
  const again = recordUsage(
    usage.run,
    1,
    { inputTokens: 1, outputTokens: 1 },
    ALICE,
    env,
  );
  assert(!again.ok && again.reason.includes("already has usage"));
  assert(
    !recordUsage(moved, 9, { inputTokens: 1, outputTokens: 1 }, ALICE, env).ok,
  );
});

Deno.test("recordUsage: takes a harness total alone, and refuses usage without tokens", () => {
  const env = testEnv();
  const run = fresh(env);
  const dispatched = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(dispatched.ok);
  assertEquals(dispatched.run.dispatches[0].mode, "interactive");
  const half = recordUsage(
    dispatched.run,
    1,
    { inputTokens: 10 },
    ALICE,
    env,
  );
  assert(!half.ok && half.reason.includes("totalTokens"), String(half));
  const total = recordUsage(
    dispatched.run,
    1,
    { totalTokens: 65155, toolUses: 4, durationMs: 90_000 },
    ALICE,
    env,
  );
  assert(total.ok);
  assertEquals(total.run.dispatches[0].usage, {
    totalTokens: 65155,
    toolUses: 4,
    durationMs: 90_000,
    attested: true,
  });
  assert(parseRun(JSON.parse(JSON.stringify(total.run))).ok);
});

// --- approvals -----------------------------------------------------------------

Deno.test("recordApproval: bound to every product in the era, including earlier stages", async () => {
  const env = testEnv();
  let run = acceptProduct(
    fresh(env),
    "artifact",
    "summary",
    { version: 2, digest: "sha256:s" },
    ALICE,
    env,
  );
  run = await toReview(run, env);
  const approved = recordApproval(
    run,
    DEFINITION,
    expectedOf(run),
    { gateId: "ship-approval", decision: "approve", note: "ok" },
    ALICE,
    env,
  );
  assert(approved.ok, approved.ok ? "" : approved.reason);
  assertEquals(approved.run.approvals[0].products, {
    artifacts: { summary: { version: 2, digest: "sha256:s" } },
    evidence: {},
  });
  assertEquals(approved.run.approvals[0].stage, "review");
  const declined = recordApproval(
    approved.run,
    DEFINITION,
    expectedOf(approved.run),
    { gateId: "ship-approval", decision: "decline" },
    NOBODY,
    env,
  );
  assert(declined.ok);
  assertEquals(declined.run.approvals.map((a) => [a.id, a.decision]), [
    [1, "approve"],
    [2, "decline"],
  ]);
});

Deno.test("recordApproval: an unknown gate or a stale view is refused", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  const unknown = recordApproval(
    run,
    DEFINITION,
    expectedOf(run),
    { gateId: "plan-approval", decision: "approve" },
    ALICE,
    env,
  );
  assert(
    !unknown.ok && unknown.reason.includes("ship-approval"),
    unknown.ok ? "" : unknown.reason,
  );
  const stale = recordApproval(
    run,
    DEFINITION,
    { ...expectedOf(run), stage: "write" },
    { gateId: "ship-approval", decision: "approve" },
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
});

Deno.test("recordApproval: a conditional gate takes decisions while its when is false", () => {
  const parsed = parseDefinition({
    schemaVersion: 1,
    stages: [
      {
        id: "review",
        initial: true,
        transitions: [{
          name: "ship",
          to: "done",
          gates: [{
            type: "human-approval",
            config: { id: "look", when: "false" },
          }],
        }],
      },
      { id: "done", terminal: true },
    ],
  });
  assert(parsed.ok, parsed.ok ? "" : parsed.errors.join("\n"));
  const env = testEnv();
  let run = start(
    parsed.value,
    {
      key: "wi-c",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:c",
    },
    ALICE,
    env,
  );
  for (const decision of ["approve", "decline"] as const) {
    const result = recordApproval(
      run,
      parsed.value,
      expectedOf(run),
      { gateId: "look", decision },
      ALICE,
      env,
    );
    assert(result.ok, result.ok ? "" : result.reason);
    run = result.run;
  }
  assertEquals(run.approvals.map((a) => a.decision), ["approve", "decline"]);
});

// --- advance -------------------------------------------------------------------

Deno.test("advance: moves, counts entries, and journals", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  assertEquals(run.stage, "review");
  assertEquals(run.entries, { write: 1, review: 1 });
  const back = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "again" },
    PASS,
    ALICE,
    env,
  );
  assert(back.ok);
  assertEquals(back.run.entries, { write: 2, review: 1 });
  assertEquals(currentCycle(back.run), 2);
  const last = back.run.journal[back.run.journal.length - 1];
  assert(last.type === "advanced" && last.to === "write" && last.toCycle === 2);
  assertEquals(last.stage, "review");
});

Deno.test("advance: a stale view is refused and changes nothing", async () => {
  const env = testEnv();
  const run = fresh(env);
  const stale = await advance(
    run,
    DEFINITION,
    { ...expectedOf(run), cycle: 2 },
    { transition: "submit" },
    PASS,
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
  const otherEra = await advance(
    run,
    DEFINITION,
    { ...expectedOf(run), era: "era-0" },
    { transition: "submit" },
    PASS,
    ALICE,
    env,
  );
  assert(!otherEra.ok);
});

Deno.test("advance: unknown transitions and failing gates are refused with reasons", async () => {
  const env = testEnv();
  const run = fresh(env);
  const unknown = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "ship" },
    PASS,
    ALICE,
    env,
  );
  assert(
    !unknown.ok && unknown.reason.includes("submit"),
    unknown.ok ? "" : unknown.reason,
  );
  const blocked = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "submit" },
    FAIL,
    ALICE,
    env,
  );
  assert(!blocked.ok && blocked.reason.includes("not yet"));
});

Deno.test("advance: a manual transition needs a person's confirmation", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  const unconfirmed = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "force" },
    PASS,
    ALICE,
    env,
  );
  assert(!unconfirmed.ok && unconfirmed.reason.includes("manual"));
  const confirmed = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "force", manualConfirmed: true },
    PASS,
    ALICE,
    env,
  );
  assert(confirmed.ok);
  assertEquals(confirmed.run.status, "terminal");
});

Deno.test("advance: global transitions are available; a finished run refuses everything", async () => {
  const env = testEnv();
  const run = fresh(env);
  const aborted = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "abort" },
    PASS,
    ALICE,
    env,
  );
  assert(aborted.ok);
  assertEquals(aborted.run.stage, "aborted");
  assertEquals(aborted.run.status, "terminal");
  const after = await advance(
    aborted.run,
    DEFINITION,
    expectedOf(aborted.run),
    { transition: "abort" },
    PASS,
    ALICE,
    env,
  );
  assert(!after.ok && after.reason.includes("finished"));
  assert(
    !recordDispatch(
      aborted.run,
      DEFINITION,
      expectedOf(aborted.run),
      { inputs: {} },
      ALICE,
      env,
    ).ok,
  );
});

// --- reset -----------------------------------------------------------------------

Deno.test("reset: a new era at the initial stage; old records kept but out of era", async () => {
  const env = testEnv();
  let run = acceptProduct(
    fresh(env),
    "artifact",
    "summary",
    { version: 1, digest: "sha256:s" },
    ALICE,
    env,
  );
  const dispatched = recordDispatch(
    run,
    DEFINITION,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(dispatched.ok);
  run = await toReview(dispatched.run, env);
  const result = reset(run, DEFINITION, expectedOf(run), ALICE, env);
  assert(result.ok);
  assertEquals(result.value, "era-2");
  assertEquals(result.run.stage, "write");
  assertEquals(result.run.entries, { write: 1 });
  assertEquals(result.run.products, { artifacts: {}, evidence: {} });
  assertEquals(result.run.dispatches.map((d) => d.era), ["era-1"]);
  const last = result.run.journal[result.run.journal.length - 1];
  assert(
    last.type === "reset" && last.previousEra === "era-1" &&
      last.era === "era-2",
  );
  // The journal only grows: its length is the delivery key trackers use
  // (DESIGN.md, "Trackers"), so a reset must carry every event forward.
  assertEquals(result.run.journal.slice(0, run.journal.length), run.journal);
  assertEquals(result.run.journal.length, run.journal.length + 1);
  assert(
    !reset(run, DEFINITION, { ...expectedOf(run), stage: "write" }, ALICE, env)
      .ok,
  );
});

Deno.test("recordDispatch: a stale view is refused", () => {
  const env = testEnv();
  const run = fresh(env);
  const stale = recordDispatch(
    run,
    DEFINITION,
    { ...expectedOf(run), cycle: 2 },
    { inputs: {} },
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
});

Deno.test("recordApproval: a finished run takes no decisions", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  const done = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "force", manualConfirmed: true },
    PASS,
    ALICE,
    env,
  );
  assert(done.ok);
  const late = recordApproval(
    done.run,
    DEFINITION,
    expectedOf(done.run),
    { gateId: "ship-approval", decision: "approve" },
    ALICE,
    env,
  );
  assert(!late.ok && late.reason.includes("finished"));
});

Deno.test("reset: a finished run can be started over", async () => {
  const env = testEnv();
  const run = fresh(env);
  const aborted = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "abort" },
    PASS,
    ALICE,
    env,
  );
  assert(aborted.ok);
  const again = reset(
    aborted.run,
    DEFINITION,
    expectedOf(aborted.run),
    ALICE,
    env,
  );
  assert(again.ok);
  assertEquals(again.run.status, "active");
  assertEquals(again.run.stage, "write");
});

// --- circuit breakers ----------------------------------------------------------

/** loop <-> back, loop entered at most twice, one dispatch per cycle. */
function limited() {
  const result = parseDefinition({
    schemaVersion: 1,
    stages: [
      {
        id: "loop",
        initial: true,
        maxCycles: 2,
        maxDispatchesPerCycle: 1,
        transitions: [{ name: "out", to: "back" }],
      },
      {
        id: "back",
        transitions: [{ name: "in", to: "loop" }, { name: "stop", to: "end" }],
      },
      { id: "end", terminal: true },
    ],
  });
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

async function take(
  definition: ReturnType<typeof limited>,
  run: RunRecord,
  transition: string,
  env: Env,
) {
  return await advance(
    run,
    definition,
    expectedOf(run),
    { transition },
    PASS,
    ALICE,
    env,
  );
}

Deno.test("cycle limit: entering a stage past maxCycles is refused, and says who can unblock it", async () => {
  const definition = limited();
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  for (const t of ["out", "in", "out"]) {
    const moved = await take(definition, run, t, env);
    assert(moved.ok, moved.ok ? "" : moved.reason);
    run = moved.run;
  }
  assertEquals(cycleLimit(run, definition, "loop"), {
    count: 2,
    limit: 2,
    granted: 0,
    allowed: false,
  });
  const refused = await take(definition, run, "in", env);
  assert(!refused.ok);
  assert(
    refused.reason.includes(
      "'loop' has been entered 2 time(s) in this era, its limit is 2",
    ),
    refused.reason,
  );
  assert(
    refused.reason.includes("a person must grant a cycle override for 'loop'"),
  );
});

Deno.test("cycle overrides accumulate: each grant allows one more entry, none resets the count", async () => {
  const definition = limited();
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const go = async (t: string) => {
    const moved = await take(definition, run, t, env);
    assert(moved.ok, moved.ok ? "" : moved.reason);
    run = moved.run;
  };
  const grant = () => {
    const granted = grantOverride(
      run,
      definition,
      expectedOf(run),
      { kind: "cycle", stage: "loop", note: "one more" },
      ALICE,
      env,
    );
    assert(granted.ok);
    run = granted.run;
  };
  await go("out");
  await go("in");
  await go("out");
  grant();
  grant();
  await go("in"); // third entry: first grant
  await go("out");
  await go("in"); // fourth entry: second grant
  await go("out");
  assertEquals(cycleLimit(run, definition, "loop"), {
    count: 4,
    limit: 2,
    granted: 2,
    allowed: false,
  });
  assert(!(await take(definition, run, "in", env)).ok);
  assertEquals(run.overrides.map((o) => [o.id, o.kind, o.stage]), [[
    1,
    "cycle",
    "loop",
  ], [2, "cycle", "loop"]]);
  assertEquals(run.journal.filter((e) => e.type === "override").length, 2);
});

Deno.test("overrides belong to their era: a reset starts the counts afresh", () => {
  const definition = limited();
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const granted = grantOverride(
    run,
    definition,
    expectedOf(run),
    { kind: "cycle", stage: "loop" },
    ALICE,
    env,
  );
  assert(granted.ok);
  const fresh = reset(
    granted.run,
    definition,
    expectedOf(granted.run),
    ALICE,
    env,
  );
  assert(fresh.ok);
  run = fresh.run;
  assertEquals(cycleLimit(run, definition, "loop"), {
    count: 1,
    limit: 2,
    granted: 0,
    allowed: true,
  });
});

Deno.test("dispatch cap: past maxDispatchesPerCycle is a suspected runaway loop until a person grants more", () => {
  const definition = limited();
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const first = recordDispatch(
    run,
    definition,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(first.ok);
  run = first.run;
  const second = recordDispatch(
    run,
    definition,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(!second.ok);
  assert(
    second.reason.startsWith(
      "runaway loop suspected: stage 'loop' cycle 1 has had 1 dispatch(es), its limit is 1",
    ),
    second.reason,
  );
  const granted = grantOverride(
    run,
    definition,
    expectedOf(run),
    { kind: "dispatch" },
    ALICE,
    env,
  );
  assert(granted.ok);
  assertEquals(granted.run.overrides[0].cycle, 1);
  run = granted.run;
  assert(
    recordDispatch(run, definition, expectedOf(run), { inputs: {} }, ALICE, env)
      .ok,
  );
  assertEquals(dispatchCap(run, definition).granted, 1);
});

Deno.test("grantOverride: a stale view or an unknown stage is refused", () => {
  const definition = limited();
  const env = testEnv();
  const run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const stale = grantOverride(
    run,
    definition,
    { ...expectedOf(run), cycle: 9 },
    { kind: "dispatch" },
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
  const unknown = grantOverride(
    run,
    definition,
    expectedOf(run),
    { kind: "cycle", stage: "nowhere" },
    ALICE,
    env,
  );
  assert(!unknown.ok && unknown.reason.includes("no stage 'nowhere'"));
});

Deno.test("cycle limit: a global escape transition is never closed by it", async () => {
  const result = parseDefinition({
    schemaVersion: 1,
    stages: [
      { id: "work", initial: true, transitions: [{ name: "done", to: "end" }] },
      {
        id: "hold",
        maxCycles: 1,
        transitions: [{ name: "resume", to: "work" }],
      },
      { id: "end", terminal: true },
    ],
    globalTransitions: [{ name: "escalate", to: "hold" }],
  });
  assert(result.ok);
  const definition = result.value;
  const env = testEnv();
  let run = start(
    definition,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:e",
    },
    ALICE,
    env,
  );
  for (const t of ["escalate", "resume", "escalate"]) {
    const moved = await take(definition, run, t, env);
    assert(moved.ok, moved.ok ? "" : moved.reason);
    run = moved.run;
  }
  assertEquals(
    run.entries.hold,
    2,
    "hold was entered past its maxCycles of 1 through the escape hatch",
  );
});

Deno.test("retarget: replaces externalRefs whole and journals the move; nothing else changes", async () => {
  const env = testEnv();
  let run = start(
    DEFINITION,
    {
      key: "wi-1",
      externalRefs: { "swamp-club": "12", "swamp-club.display": "#12" },
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  run = acceptProduct(
    run,
    "artifact",
    "summary",
    { version: 1, digest: "sha256:s" },
    ALICE,
    env,
  );
  run = await toReview(run, env);
  const result = retarget(
    run,
    expectedOf(run),
    {
      externalRefs: { "swamp-club": "7", "swamp-club.display": "#7" },
      reason: "12 duplicates 7",
    },
    NOBODY,
    env,
  );
  assert(result.ok, result.ok ? "" : result.reason);
  assertEquals(result.run.externalRefs, {
    "swamp-club": "7",
    "swamp-club.display": "#7",
  });
  const { externalRefs: _after, journal: after, ...restAfter } = result.run;
  const { externalRefs: _before, journal: before, ...restBefore } = run;
  assertEquals(restAfter, restBefore);
  assertEquals(after.slice(0, before.length), before);
  assertEquals(after.length, before.length + 1);
  const last = after[after.length - 1];
  assert(last.type === "retargeted");
  assertEquals(last.from, { "swamp-club": "12", "swamp-club.display": "#12" });
  assertEquals(last.to, { "swamp-club": "7", "swamp-club.display": "#7" });
  assertEquals(last.reason, "12 duplicates 7");
  assertEquals(last.actor, NOBODY);
  assertEquals([last.stage, last.cycle, last.era], ["review", 1, "era-1"]);
});

Deno.test("retarget: refused when finished, stale, naming no ticket, unchanged or without a reason", async () => {
  const env = testEnv();
  const run = start(
    DEFINITION,
    {
      key: "wi-1",
      externalRefs: { linear: "a" },
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const refused = (
    r: RunRecord,
    input: { externalRefs: Record<string, string>; reason: string },
    expected = expectedOf(r),
  ): string => {
    const result = retarget(r, expected, input, ALICE, env);
    assert(!result.ok);
    return result.reason;
  };
  const ok = { externalRefs: { linear: "b" }, reason: "moved" };
  assert(
    refused(run, ok, { ...expectedOf(run), cycle: 2 }).startsWith("stale:"),
  );
  for (
    const externalRefs of [
      {} as Record<string, string>,
      { "linear.display": "A-2" },
      { linear: "" },
      { linear: "", "linear.display": "A-2" },
    ]
  ) {
    assert(
      refused(run, { ...ok, externalRefs }).includes("at least one ticket"),
      JSON.stringify(externalRefs),
    );
  }
  assert(
    refused(run, { ...ok, externalRefs: { linear: "a" } }).includes(
      "already has",
    ),
  );
  assert(refused(run, { ...ok, reason: "  " }).includes("reason"));
  const aborted = await advance(
    run,
    DEFINITION,
    expectedOf(run),
    { transition: "abort" },
    PASS,
    ALICE,
    env,
  );
  assert(aborted.ok);
  assert(refused(aborted.run, ok).includes("finished"));
  // A different map, even one that only adds a key, is a retarget.
  assert(
    retarget(
      run,
      expectedOf(run),
      { externalRefs: { linear: "a", "linear.display": "A-1" }, reason: "r" },
      ALICE,
      env,
    ).ok,
  );
});
