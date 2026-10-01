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
import {
  evaluateGates,
  evaluateTransitions,
  makeGateEvaluator,
} from "./gates.ts";
import type { Actor } from "./journal.ts";
import {
  type FactoryDefinition,
  parseDefinition,
} from "./definition_schema.ts";
import {
  advance,
  type Env,
  expectedOf,
  grantOverride,
  recordApproval,
} from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  type RunStore,
  startRun,
  update,
} from "./run_store.ts";
import {
  ALICE,
  expectNow,
  NOBODY,
  PASS,
  TEST_TRACKER,
  testEnv,
} from "./test_support.ts";

const BOB: Actor = { principal: "user:bob", source: "platform" };

/** One transition per gate type, all from `draft`. */
function gateDefinition(): FactoryDefinition {
  const result = parseDefinition({
    schemaVersion: 1,
    name: "gates",
    stages: [
      {
        id: "draft",
        initial: true,
        maxCycles: 3,
        artifacts: [
          {
            name: "plan",
            schema: {
              type: "object",
              required: ["text"],
              properties: { text: { type: "string" } },
            },
          },
          { name: "plan-review", kind: "findings", reviews: "plan" },
        ],
        evidence: [{
          name: "ci",
          schema: {
            type: "object",
            required: ["status"],
            properties: { status: { type: "string" }, run: { type: "object" } },
          },
        }],
        transitions: [
          {
            name: "exists",
            to: "done",
            gates: [{ type: "artifact-exists", config: { artifact: "plan" } }],
          },
          {
            name: "fresh",
            to: "done",
            gates: [{
              type: "artifact-fresh",
              config: { artifact: "plan-review", recordedThisCycle: true },
            }],
          },
          {
            name: "clear",
            to: "done",
            gates: [{
              type: "findings-clear",
              config: {
                artifact: "plan-review",
                blocking: ["critical", "high"],
              },
            }],
          },
          {
            name: "open",
            to: "done",
            gates: [{
              type: "findings-open",
              config: {
                artifact: "plan-review",
                blocking: ["critical", "high"],
              },
            }],
          },
          {
            name: "approved",
            to: "done",
            gates: [{ type: "human-approval", config: { id: "ship" } }],
          },
          {
            name: "approved-twice",
            to: "done",
            gates: [{
              type: "human-approval",
              config: { id: "ship", minApprovals: 2 },
            }],
          },
          {
            name: "approved-if-go",
            to: "done",
            gates: [{
              type: "human-approval",
              config: {
                id: "ship",
                when: '"plan" in artifacts && ' +
                  'artifacts["plan"].payload.text == "go"',
              },
            }],
          },
          {
            name: "approved-if-go-unguarded",
            to: "done",
            gates: [{
              type: "human-approval",
              config: {
                id: "ship",
                when: 'artifacts["plan"].payload.text == "go"',
              },
            }],
          },
          {
            name: "approved-if-text",
            to: "done",
            gates: [{
              type: "human-approval",
              config: { id: "ship", when: 'artifacts["plan"].payload.text' },
            }],
          },
          {
            name: "green",
            to: "done",
            gates: [{
              type: "evidence-recorded",
              config: {
                name: "ci",
                requireField: {
                  status: "green",
                  "run.ok": true,
                  run: { ok: true },
                },
              },
            }],
          },
          {
            name: "qualified",
            to: "done",
            gates: [{
              type: "evidence-recorded",
              config: {
                name: "ci",
                requireField: { "run.ok": true },
                match: {
                  status: { enum: ["green", "amber"] },
                  run: { type: "object", required: ["ok"] },
                },
              },
            }],
          },
          {
            name: "not-red",
            to: "done",
            gates: [{
              type: "evidence-recorded",
              config: {
                name: "ci",
                match: { "run.status": { not: { const: "red" } } },
                message: "a red run waits for a fix",
              },
            }],
          },
          {
            name: "cooled",
            to: "done",
            gates: [{
              type: "cooldown",
              config: { afterEvidence: "ci", seconds: 60 },
            }],
          },
          {
            name: "said-go",
            to: "done",
            gates: [{
              type: "cel",
              config: {
                expr: 'artifacts["plan"].payload.text == "go"',
                message: "the plan must say go",
              },
            }],
          },
          {
            name: "not-boolean",
            to: "done",
            gates: [{
              type: "cel",
              config: { expr: 'artifacts["plan"].payload.text' },
            }],
          },
          {
            name: "early",
            to: "done",
            gates: [{
              type: "max-cycles",
              config: { stage: "draft", limit: 2 },
            }],
          },
          { name: "again", to: "draft" },
        ],
      },
      { id: "done", terminal: true },
    ],
  });
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

const DEFINITION = gateDefinition();

async function setup(env: Env = testEnv()) {
  const store = memoryStore();
  await startRun(
    store,
    DEFINITION,
    { key: "wi-1", tracker: TEST_TRACKER, definitionDigest: "sha256:g" },
    ALICE,
    env,
  );
  return { store, env };
}

async function current(store: RunStore): Promise<RunRecord> {
  const run = await loadRun(store);
  if (run === null) throw new Error("not started");
  return run;
}

async function record(
  store: RunStore,
  env: Env,
  kind: "artifact" | "evidence",
  name: string,
  payload: Record<string, unknown>,
) {
  const result = await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    kind,
    name,
    payload,
    ALICE,
    env,
  );
  assert(result.ok, JSON.stringify(result));
}

async function approve(
  store: RunStore,
  env: Env,
  actor: Actor,
  decision: "approve" | "decline" = "approve",
  note?: string,
) {
  const result = await update(
    store,
    (run) =>
      recordApproval(
        run,
        DEFINITION,
        expectedOf(run),
        { gateId: "ship", decision, ...(note ? { note } : {}) },
        actor,
        env,
      ),
  );
  assert(result.ok, result.ok ? "" : result.reason);
}

/** The gate result of a named transition. */
async function gate(store: RunStore, env: Env, name: string) {
  const run = await current(store);
  const transition = DEFINITION.stages[0].transitions?.find((t) =>
    t.name === name
  );
  assert(transition !== undefined);
  const [check] = await evaluateGates(run, DEFINITION, transition, store, env);
  return check;
}

// --- artifact-exists, artifact-fresh, findings-clear ---------------------------

Deno.test("artifact-exists", async () => {
  const { store, env } = await setup();
  assertEquals(await gate(store, env, "exists"), {
    type: "artifact-exists",
    pass: false,
    reason: "artifact 'plan' has not been recorded",
  });
  await record(store, env, "artifact", "plan", { text: "x" });
  assert((await gate(store, env, "exists")).pass);
});

Deno.test("artifact-fresh: a review of the current plan version, recorded this cycle", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "v1" });
  await record(store, env, "artifact", "plan-review", { findings: [] });
  assert((await gate(store, env, "fresh")).pass);
  assertEquals(
    (await current(store)).products.artifacts["plan-review"].subject?.version,
    1,
  );

  await record(store, env, "artifact", "plan", { text: "v2" });
  const stale = await gate(store, env, "fresh");
  assert(!stale.pass);
  assert(
    stale.reason?.includes(
      "reviews 'plan' version 1, but the current version is 2",
    ),
    stale.reason,
  );
});

Deno.test("artifact-fresh: a review recorded in an earlier cycle is not fresh", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "v1" });
  await record(store, env, "artifact", "plan-review", { findings: [] });
  await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "again" },
        PASS,
        ALICE,
        env,
      ),
  );
  const check = await gate(store, env, "fresh");
  assert(
    !check.pass &&
      check.reason?.includes("not in this entry into 'draft' (cycle 2)"),
    check.reason,
  );
});

Deno.test("findings-clear: unresolved blocking findings are listed; resolved or minor ones are not", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "x" });
  await record(store, env, "artifact", "plan-review", {
    findings: [
      { id: "F1", severity: "high", description: "d" },
      { id: "F2", severity: "low", description: "d" },
      { id: "F3", severity: "critical", description: "d", resolved: true },
    ],
  });
  const blocked = await gate(store, env, "clear");
  assert(
    !blocked.pass &&
      blocked.reason?.startsWith(
        "1 unresolved blocking finding(s) in 'plan-review': F1 (high)",
      ),
    blocked.reason,
  );
  await record(store, env, "artifact", "plan-review", {
    findings: [{
      id: "F1",
      severity: "high",
      description: "d",
      resolved: true,
      resolutionNote: "fixed",
    }],
  });
  assert((await gate(store, env, "clear")).pass);
});

Deno.test("findings-open: passes only while a blocking finding is unresolved, the mirror of findings-clear", async () => {
  const { store, env } = await setup();
  const none = await gate(store, env, "open");
  assert(
    !none.pass &&
      none.reason === "findings artifact 'plan-review' has not been recorded",
    none.reason,
  );
  await record(store, env, "artifact", "plan", { text: "x" });
  await record(store, env, "artifact", "plan-review", {
    findings: [
      { id: "F1", severity: "high", description: "d" },
      { id: "F2", severity: "low", description: "d" },
    ],
  });
  assert((await gate(store, env, "open")).pass);
  assert(!(await gate(store, env, "clear")).pass);
  await record(store, env, "artifact", "plan-review", {
    findings: [
      { id: "F1", severity: "high", description: "d", resolved: true },
      { id: "F2", severity: "low", description: "d" },
    ],
  });
  const clear = await gate(store, env, "open");
  assert(
    !clear.pass &&
      clear.reason ===
        "'plan-review' has no unresolved finding at a blocking severity (critical, high)",
    clear.reason,
  );
  assert((await gate(store, env, "clear")).pass);
});

// --- human-approval ------------------------------------------------------------

Deno.test("human-approval: awaiting, then approved", async () => {
  const { store, env } = await setup();
  const waiting = await gate(store, env, "approved");
  assert(
    !waiting.pass &&
      waiting.reason?.startsWith("awaiting approval 'ship' (0/1)"),
    waiting.reason,
  );
  await approve(store, env, ALICE);
  assert((await gate(store, env, "approved")).pass);
});

Deno.test("human-approval: an approver's latest decline blocks, with its note", async () => {
  const { store, env } = await setup();
  await approve(store, env, ALICE);
  await approve(store, env, BOB, "decline", "not yet");
  const check = await gate(store, env, "approved");
  assert(
    !check.pass && check.reason?.includes("declined by user:bob: not yet"),
    check.reason,
  );
  await approve(store, env, BOB);
  assert((await gate(store, env, "approved")).pass);
});

Deno.test("human-approval: a changed product voids an approval; a later product does not", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "v1" });
  await approve(store, env, ALICE);
  await record(store, env, "evidence", "ci", { status: "green" });
  assert(
    (await gate(store, env, "approved")).pass,
    "a product recorded after the approval does not void it",
  );
  await record(store, env, "artifact", "plan", { text: "v2" });
  const check = await gate(store, env, "approved");
  assert(!check.pass);
  assert(
    check.reason?.includes(
      "1 earlier approval(s) no longer count because plan changed since",
    ),
    check.reason,
  );
});

Deno.test("human-approval: minApprovals needs distinct platform principals; asserted names do not count", async () => {
  const { store, env } = await setup();
  await approve(store, env, { ...NOBODY, asserted: "linear:jane" });
  await approve(store, env, { ...NOBODY, asserted: "linear:joe" });
  const unverified = await gate(store, env, "approved-twice");
  assert(
    !unverified.pass && unverified.reason?.includes("(1/2)"),
    unverified.reason,
  );
  await approve(store, env, ALICE);
  assert((await gate(store, env, "approved-twice")).pass);
});

Deno.test("human-approval: an unconditional gate is always required", async () => {
  const { store, env } = await setup();
  const check = await gate(store, env, "approved");
  assertEquals([check.gateId, check.required], ["ship", true]);
  assertEquals(check.conditionError, undefined);
});

Deno.test("human-approval: while when is false the gate passes and is not required, even over a decline", async () => {
  const { store, env } = await setup();
  assertEquals(await gate(store, env, "approved-if-go"), {
    type: "human-approval",
    pass: true,
    gateId: "ship",
    required: false,
  });
  await record(store, env, "artifact", "plan", { text: "wait" });
  await approve(store, env, ALICE, "decline", "no");
  const declined = await gate(store, env, "approved-if-go");
  assert(declined.pass && declined.required === false);
});

Deno.test("human-approval: while when is true, approvals count as without it", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "go" });
  const waiting = await gate(store, env, "approved-if-go");
  assert(
    !waiting.pass && waiting.required === true &&
      waiting.reason?.startsWith("awaiting approval 'ship' (0/1)"),
    waiting.reason,
  );
  await approve(store, env, ALICE);
  const approved = await gate(store, env, "approved-if-go");
  assert(approved.pass && approved.required === true);
});

Deno.test("human-approval: a decline recorded while when is false blocks once it is true", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "wait" });
  await approve(store, env, ALICE, "decline", "not this");
  assert((await gate(store, env, "approved-if-go")).pass);
  await record(store, env, "artifact", "plan", { text: "go" });
  const check = await gate(store, env, "approved-if-go");
  assert(
    !check.pass && check.reason?.includes("declined by user:alice: not this"),
    check.reason,
  );
});

Deno.test("human-approval: a when that errors or is not boolean fails the gate, required", async () => {
  const { store, env } = await setup();
  const missing = await gate(store, env, "approved-if-go-unguarded");
  assert(
    !missing.pass && missing.reason?.startsWith("when: could not evaluate"),
    missing.reason,
  );
  assertEquals([missing.required, missing.conditionError], [true, true]);
  await record(store, env, "artifact", "plan", { text: "wait" });
  const text = await gate(store, env, "approved-if-text");
  assert(
    !text.pass &&
      text.reason?.includes('must be true or false, but was "wait"'),
    text.reason,
  );
  assertEquals([text.required, text.conditionError], [true, true]);
});

// --- evidence-recorded, cooldown, max-cycles, cel ------------------------------

Deno.test("evidence-recorded: this stage and cycle, with required fields", async () => {
  const { store, env } = await setup();
  assert(
    (await gate(store, env, "green")).reason ===
      "evidence 'ci' has not been recorded",
  );
  await record(store, env, "evidence", "ci", {
    status: "red",
    run: { ok: true },
  });
  const red = await gate(store, env, "green");
  assert(
    !red.pass &&
      red.reason === `evidence 'ci': field 'status' is "red", expected "green"`,
    red.reason,
  );
  await record(store, env, "evidence", "ci", {
    status: "green",
    run: { ok: true },
  });
  assert((await gate(store, env, "green")).pass);
  await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "again" },
        PASS,
        ALICE,
        env,
      ),
  );
  const earlier = await gate(store, env, "green");
  assert(
    !earlier.pass && earlier.reason?.includes("record it again"),
    earlier.reason,
  );
});

Deno.test("cooldown: waits from when the evidence was recorded", async () => {
  let now = Date.UTC(2026, 8, 28, 12, 0, 0);
  const env: Env = {
    now: () => new Date(now).toISOString(),
    newEra: () => "era-1",
  };
  const { store } = await setup(env);
  await record(store, env, "evidence", "ci", { status: "green" });
  now += 20_000;
  const early = await gate(store, env, "cooled");
  assert(
    !early.pass && early.reason?.includes("recorded 20s ago; wait 40s more"),
    early.reason,
  );
  now += 40_000;
  assert((await gate(store, env, "cooled")).pass);
});

Deno.test("max-cycles: a routing gate on entries into a stage", async () => {
  const { store, env } = await setup();
  assert((await gate(store, env, "early")).pass);
  await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "again" },
        PASS,
        ALICE,
        env,
      ),
  );
  const late = await gate(store, env, "early");
  assert(
    !late.pass &&
      late.reason?.includes("entered 2 time(s); this route needs fewer than 2"),
    late.reason,
  );
});

Deno.test("cel: true passes, false shows its message, a non-boolean or an error fails", async () => {
  const { store, env } = await setup();
  const missing = await gate(store, env, "said-go");
  assert(
    !missing.pass && missing.reason?.startsWith("could not evaluate"),
    missing.reason,
  );
  await record(store, env, "artifact", "plan", { text: "wait" });
  assertEquals(
    (await gate(store, env, "said-go")).reason,
    "the plan must say go",
  );
  const text = await gate(store, env, "not-boolean");
  assert(
    !text.pass &&
      text.reason?.includes('must be true or false, but was "wait"'),
    text.reason,
  );
  await record(store, env, "artifact", "plan", { text: "go" });
  assert((await gate(store, env, "said-go")).pass);
});

Deno.test("gates: run data that fails its digest check becomes a failure, not an exception", async () => {
  const { store, env } = await setup();
  await record(store, env, "artifact", "plan", { text: "go" });
  const tampered: RunStore = {
    ...store,
    readPayload: () => Promise.resolve({ text: "edited" }),
  };
  const run = await current(store);
  const transition = DEFINITION.stages[0].transitions?.find((t) =>
    t.name === "said-go"
  );
  assert(transition !== undefined);
  const [check] = await evaluateGates(
    run,
    DEFINITION,
    transition,
    tampered,
    env,
  );
  assert(
    !check.pass && check.reason?.startsWith("run data could not be read"),
    check.reason,
  );
  const conditional = DEFINITION.stages[0].transitions?.find((t) =>
    t.name === "approved-if-go"
  );
  assert(conditional !== undefined);
  const [approval] = await evaluateGates(
    run,
    DEFINITION,
    conditional,
    tampered,
    env,
  );
  assert(
    !approval.pass &&
      approval.reason?.startsWith("when: run data could not be read") &&
      approval.conditionError === true,
    approval.reason,
  );
});

// --- the evaluator and the status view -----------------------------------------

Deno.test("makeGateEvaluator: advance moves only when every gate passes, and says why not", async () => {
  const { store, env } = await setup();
  const gates = makeGateEvaluator(DEFINITION, store, env);
  const refused = await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "exists" },
        gates,
        ALICE,
        env,
      ),
  );
  assert(
    !refused.ok &&
      refused.reason.includes(
        "artifact-exists: artifact 'plan' has not been recorded",
      ),
  );
  await record(store, env, "artifact", "plan", { text: "x" });
  const moved = await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "exists" },
        gates,
        ALICE,
        env,
      ),
  );
  assert(moved.ok);
  assertEquals((await current(store)).stage, "done");
});

Deno.test("evaluateTransitions: reports each exit's gates and the cycle limit of where it goes", async () => {
  const { store, env } = await setup();
  for (let i = 0; i < 2; i++) {
    await update(
      store,
      (run) =>
        advance(
          run,
          DEFINITION,
          expectedOf(run),
          { transition: "again" },
          PASS,
          ALICE,
          env,
        ),
    );
  }
  const run = await current(store);
  assertEquals(run.entries.draft, 3);
  const exits = await evaluateTransitions(run, DEFINITION, store, env);
  const again = exits.find((t) => t.name === "again");
  assert(again !== undefined && !again.ready);
  assert(
    again.failures[0].startsWith(
      "cycle limit: stage 'draft' has been entered 3 time(s) in this era, its limit is 3",
    ),
    again.failures[0],
  );
  assertEquals(again.cycleLimit, {
    count: 3,
    limit: 3,
    granted: 0,
    allowed: false,
  });

  await update(
    store,
    (r) =>
      grantOverride(
        r,
        DEFINITION,
        expectedOf(r),
        { kind: "cycle", stage: "draft" },
        ALICE,
        env,
      ),
  );
  const after =
    (await evaluateTransitions(await current(store), DEFINITION, store, env))
      .find((t) => t.name === "again");
  assert(after?.ready, after?.failures.join());
});

Deno.test("evidence-recorded: requireField compares objects and arrays by content", async () => {
  const { store, env } = await setup();
  await record(store, env, "evidence", "ci", {
    status: "green",
    run: { ok: false },
  });
  const off = await gate(store, env, "green");
  assert(
    !off.pass && off.reason?.includes(`field 'run.ok' is false, expected true`),
    off.reason,
  );
  await record(store, env, "evidence", "ci", {
    status: "green",
    run: { ok: true },
  });
  assert(
    (await gate(store, env, "green")).pass,
    "{ ok: true } matches a separately parsed { ok: true }",
  );
});

Deno.test("evidence-recorded: match checks each field against its schema, with requireField", async () => {
  const { store, env } = await setup();
  await record(store, env, "evidence", "ci", {
    status: "red",
    run: { ok: true },
  });
  const off = await gate(store, env, "qualified");
  assertEquals(
    off.reason,
    `evidence 'ci': field 'status' is "red", expected to match ` +
      `{"enum":["green","amber"]} (status: Instance does not match any of ` +
      `["green","amber"].)`,
  );
  await record(store, env, "evidence", "ci", {
    status: "amber",
    run: { ok: false },
  });
  const both = await gate(store, env, "qualified");
  assert(
    !both.pass && both.reason?.includes(`field 'run.ok' is false`),
    both.reason,
  );
  await record(store, env, "evidence", "ci", {
    status: "amber",
    run: { ok: true },
  });
  assert((await gate(store, env, "qualified")).pass);
});

Deno.test("evidence-recorded: a match failure below the field is named from the field", async () => {
  const { store, env } = await setup();
  await record(store, env, "evidence", "ci", { status: "green", run: {} });
  const off = await gate(store, env, "qualified");
  assert(
    !off.pass && off.reason?.includes(`(run: Instance does not have required`),
    off.reason,
  );
  assert(!off.reason?.includes("(root)"), off.reason);
});

Deno.test("evidence-recorded: a missing field fails a match, even under not", async () => {
  const { store, env } = await setup();
  await record(store, env, "evidence", "ci", { status: "green" });
  const off = await gate(store, env, "not-red");
  assertEquals(
    off.reason,
    `a red run waits for a fix (evidence 'ci': field 'run.status' is ` +
      `missing, expected to match {"not":{"const":"red"}})`,
  );
  await record(store, env, "evidence", "ci", {
    status: "green",
    run: { status: "red" },
  });
  const red = await gate(store, env, "not-red");
  assert(
    !red.pass && red.reason?.startsWith("a red run waits for a fix ("),
    red.reason,
  );
  await record(store, env, "evidence", "ci", {
    status: "green",
    run: { status: "blue" },
  });
  assert((await gate(store, env, "not-red")).pass);
});

Deno.test("evidence-recorded: the message is only for values, not for when evidence was recorded", async () => {
  const { store, env } = await setup();
  assertEquals(
    (await gate(store, env, "not-red")).reason,
    "evidence 'ci' has not been recorded",
  );
});

Deno.test("cooldown: an unreadable record time fails with a clear message", async () => {
  const { store, env } = await setup();
  await record(store, env, "evidence", "ci", { status: "green" });
  const run = structuredClone(await current(store));
  run.products.evidence.ci.at = "not a time";
  const transition = DEFINITION.stages[0].transitions?.find((t) =>
    t.name === "cooled"
  );
  assert(transition !== undefined);
  const [check] = await evaluateGates(run, DEFINITION, transition, store, env);
  assert(
    !check.pass &&
      check.reason ===
        "evidence 'ci' has an unreadable record time 'not a time'",
    check.reason,
  );
});

Deno.test("evidence-recorded: a requireField path reads own fields only, never the prototype", async () => {
  const withField = (requireField: Record<string, unknown>) =>
    parseDefinition({
      schemaVersion: 1,
      name: "proto",
      stages: [
        {
          id: "s",
          initial: true,
          evidence: [{ name: "e", schema: { type: "object" } }],
          transitions: [{
            name: "go",
            to: "done",
            gates: [{
              type: "evidence-recorded",
              config: { name: "e", requireField },
            }],
          }],
        },
        { id: "done", terminal: true },
      ],
    });
  // zod would drop a __proto__ key and leave no requirement, so the schema
  // refuses it. (A computed key: a literal "__proto__" key sets the prototype.)
  const proto = withField({ ["__proto__"]: {} });
  assert(
    !proto.ok &&
      proto.errors.some((e) =>
        e.includes("requireField cannot name '__proto__'")
      ),
  );

  // constructor survives parsing; it must not resolve to Object.prototype's
  // constructor function (which would make the gate throw).
  const ctor = withField({ constructor: "x" });
  assert(ctor.ok);
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    ctor.value,
    { key: "wi-1", tracker: TEST_TRACKER, definitionDigest: "sha256:p" },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    ctor.value,
    await expectNow(store),
    "evidence",
    "e",
    { any: 1 },
    ALICE,
    env,
  );
  const run = await current(store);
  const [check] = await evaluateGates(
    run,
    ctor.value,
    ctor.value.stages[0].transitions![0],
    store,
    env,
  );
  assert(
    !check.pass && check.reason?.includes("field 'constructor' is missing"),
    check.reason,
  );
});
