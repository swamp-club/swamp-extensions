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
  acceptProduct,
  advance,
  checkProduct,
  type Env,
  expectedOf,
  recordApproval,
  recordDispatch,
  recordUsage,
  rejectProduct,
  reset,
  start,
} from "./run_ops.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";
import {
  ALICE,
  FAIL,
  NOBODY,
  PASS,
  smallLifecycle,
  testEnv,
} from "./test_support.ts";

const LIFECYCLE = smallLifecycle();

function fresh(env: Env = testEnv()): RunRecord {
  return start(
    LIFECYCLE,
    { key: "wi-1", lifecycleDigest: "sha256:l" },
    ALICE,
    env,
  );
}

async function toReview(run: RunRecord, env: Env): Promise<RunRecord> {
  const moved = await advance(
    run,
    LIFECYCLE,
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
  assertEquals(run.lifecycle, { name: "small", digest: "sha256:l" });
  assertEquals(run.journal.map((e) => e.type), ["started"]);
  assertEquals(run.journal[0].actor, ALICE);
});

// --- products ------------------------------------------------------------------

Deno.test("checkProduct: only products the current stage declares", () => {
  const run = fresh();
  assertEquals(
    checkProduct(run, LIFECYCLE, "artifact", "summary", { text: "t" }),
    { declared: true, errors: null },
  );
  const elsewhere = checkProduct(run, LIFECYCLE, "evidence", "test-run", {});
  assert(!elsewhere.declared);
  assert(elsewhere.reason.includes("does not declare evidence 'test-run'"));
});

Deno.test("checkProduct: a stage's resultEvidence uses the outcome contract", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  assertEquals(
    checkProduct(run, LIFECYCLE, "evidence", "test-run", {
      status: "succeeded",
      runId: "r1",
    }),
    { declared: true, errors: null },
  );
  const bad = checkProduct(run, LIFECYCLE, "evidence", "test-run", {
    status: "ok",
  });
  assert(bad.declared && bad.errors !== null);
});

Deno.test("products: a rejection is kept as feedback until a valid record clears it", () => {
  const env = testEnv();
  let run = fresh(env);
  const check = checkProduct(run, LIFECYCLE, "artifact", "summary", {
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
    expectedOf(first.run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(second.ok);
  assertEquals(second.value, 2);
});

Deno.test("recordUsage: attaches to a named dispatch after the run moved on, once", async () => {
  const env = testEnv();
  const run = fresh(env);
  const dispatched = recordDispatch(
    run,
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
    LIFECYCLE,
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
    LIFECYCLE,
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
    LIFECYCLE,
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
    LIFECYCLE,
    { ...expectedOf(run), stage: "write" },
    { gateId: "ship-approval", decision: "approve" },
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
});

// --- advance -------------------------------------------------------------------

Deno.test("advance: moves, counts entries, and journals", async () => {
  const env = testEnv();
  const run = await toReview(fresh(env), env);
  assertEquals(run.stage, "review");
  assertEquals(run.entries, { write: 1, review: 1 });
  const back = await advance(
    run,
    LIFECYCLE,
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
    LIFECYCLE,
    { ...expectedOf(run), cycle: 2 },
    { transition: "submit" },
    PASS,
    ALICE,
    env,
  );
  assert(!stale.ok && stale.reason.startsWith("stale:"));
  const otherEra = await advance(
    run,
    LIFECYCLE,
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
    LIFECYCLE,
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
    LIFECYCLE,
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
    LIFECYCLE,
    expectedOf(run),
    { transition: "force" },
    PASS,
    ALICE,
    env,
  );
  assert(!unconfirmed.ok && unconfirmed.reason.includes("manual"));
  const confirmed = await advance(
    run,
    LIFECYCLE,
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
    LIFECYCLE,
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
    LIFECYCLE,
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
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(dispatched.ok);
  run = await toReview(dispatched.run, env);
  const result = reset(run, LIFECYCLE, expectedOf(run), ALICE, env);
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
  assert(
    !reset(run, LIFECYCLE, { ...expectedOf(run), stage: "write" }, ALICE, env)
      .ok,
  );
});

Deno.test("recordDispatch: a stale view is refused", () => {
  const env = testEnv();
  const run = fresh(env);
  const stale = recordDispatch(
    run,
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
    LIFECYCLE,
    expectedOf(run),
    { transition: "force", manualConfirmed: true },
    PASS,
    ALICE,
    env,
  );
  assert(done.ok);
  const late = recordApproval(
    done.run,
    LIFECYCLE,
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
    LIFECYCLE,
    expectedOf(run),
    { transition: "abort" },
    PASS,
    ALICE,
    env,
  );
  assert(aborted.ok);
  const again = reset(
    aborted.run,
    LIFECYCLE,
    expectedOf(aborted.run),
    ALICE,
    env,
  );
  assert(again.ok);
  assertEquals(again.run.status, "active");
  assertEquals(again.run.stage, "write");
});
