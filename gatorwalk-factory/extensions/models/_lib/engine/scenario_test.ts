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
import * as posix from "@std/path/posix";
import { loadRun } from "./run_store.ts";
import {
  parseScenario,
  runScenario,
  SCENARIO_AGENT,
  SCENARIO_EPOCH,
  SCENARIO_PERSON,
  type ScenarioResult,
} from "./scenario.ts";
import {
  stopsParsedDefinition,
  stopsWithFeedbackDefinition,
} from "./test_support.ts";

// ---------------------------------------------------------------------------
// The scenario runner on the stops definition (test_support.ts): draft ->
// review -> ship -> done, with an approval, a manual way back, a cooldown and
// a global abandon behind an approval.
// ---------------------------------------------------------------------------

async function run(steps: unknown[]): Promise<ScenarioResult> {
  const parsed = parseScenario({ scenario: "s", factory: "team", steps });
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  return await runScenario(stopsParsedDefinition(), parsed.value);
}

const TO_REVIEW = [
  { record: { artifact: "plan" }, payload: { text: "Plan" } },
  { move: "submit" },
];

const TO_SHIP = [
  ...TO_REVIEW,
  { approve: "go" },
  { move: "approve" },
];

function errorsOf(raw: unknown): string[] {
  const parsed = parseScenario(raw);
  return parsed.ok ? [] : parsed.errors;
}

Deno.test("scenario: each verb goes through the real engine, one frame per step", async () => {
  const result = await run([
    ...TO_SHIP,
    { record: { evidence: "pr" }, payload: { status: "ok" } },
    { wait: 60 },
    { approve: "release-ok" },
    { move: "release" },
    { expect: { stage: "done" } },
  ]);
  assertEquals(result.failures, []);
  assert(result.passed);
  assertEquals(
    result.frames.map((f) => [f.index, f.kind, f.label, f.run.stage]),
    [
      [0, "start", "start", "draft"],
      [1, "record", "record artifact plan", "draft"],
      [2, "move", "move submit", "review"],
      [3, "approve", "approve go", "review"],
      [4, "move", "move approve", "ship"],
      [5, "record", "record evidence pr", "ship"],
      [6, "wait", "wait 60s", "ship"],
      [7, "approve", "approve release-ok", "ship"],
      [8, "move", "move release", "done"],
      [9, "expect", "expect stage done", "done"],
    ],
  );
  assertEquals(result.frames[2].moved, {
    from: "draft",
    transition: "submit",
    to: "review",
  });
  assertEquals(result.frames[1].message, "recorded artifact 'plan' v1");
  // Each frame carries readiness and metrics of the committed run.
  assertEquals(
    result.frames[2].readiness.map((r) => [r.name, r.ready]),
    [["approve", false], ["revise", true], ["abandon", false]],
  );
  assertEquals(result.frames[3].readiness[0].ready, true);
  assertEquals(result.frames[8].metrics.eras[0].endedBy, "terminal");
  // The run the store holds is the last frame's.
  assertEquals(await loadRun(result.store), result.frames[8].run);
});

Deno.test("scenario: records and automatic moves are an agent's; approvals, overrides and manual moves a person's", async () => {
  const result = await run([
    ...TO_REVIEW,
    { move: "revise", manual: true },
    { move: "submit" },
    { decline: "go" },
    { move: "revise", manual: true },
    { move: "submit" },
    { move: "revise", manual: true },
    { move: "submit" },
    { move: "revise", manual: true },
    { move: "submit" },
    {
      move: "revise",
      manual: true,
      expect: { refused: "cycle override for 'draft'" },
    },
    { override: { stage: "draft", note: "one more" } },
    { move: "revise", manual: true },
  ]);
  assertEquals(result.failures, []);
  const journal = result.frames.at(-1)?.run.journal ?? [];
  // awaiting events are the committing store's, not a step's.
  const actors = journal.filter((e) => e.type !== "awaiting").map((e) => [
    e.type === "advanced" ? `advanced ${e.transition}` : e.type,
    e.actor.principal,
  ]);
  assertEquals(actors.slice(0, 5), [
    ["started", SCENARIO_AGENT.principal],
    ["recorded", SCENARIO_AGENT.principal],
    ["advanced submit", SCENARIO_AGENT.principal],
    ["advanced revise", SCENARIO_PERSON.principal],
    ["advanced submit", SCENARIO_AGENT.principal],
  ]);
  assert(
    actors.some(([type, who]) =>
      type === "approval" && who === SCENARIO_PERSON.principal
    ),
  );
  assert(
    actors.some(([type, who]) =>
      type === "override" && who === SCENARIO_PERSON.principal
    ),
  );
  assertEquals(
    result.frames.at(-1)?.run.approvals.map((a) => a.decision),
    ["decline"],
  );
});

Deno.test("scenario: evidence a person records is the person's, and opens the manual way back it gates", async () => {
  const parsed = parseScenario({
    scenario: "s",
    factory: "team",
    steps: [
      ...TO_REVIEW,
      { decline: "go" },
      {
        move: "revise",
        manual: true,
        expect: { refused: "evidence 'feedback' has not been recorded" },
      },
      { record: { evidence: "feedback" }, payload: { text: "Split step 2" } },
      { move: "revise", manual: true },
      { expect: { stage: "draft" } },
    ],
  });
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  const result = await runScenario(
    stopsWithFeedbackDefinition(),
    parsed.value,
  );
  assertEquals(result.failures, []);
  const recorded = (result.frames.at(-1)?.run.journal ?? []).flatMap((e) =>
    e.type === "recorded" ? [[e.name, e.actor.principal]] : []
  );
  assertEquals(recorded, [
    ["plan", SCENARIO_AGENT.principal],
    ["feedback", SCENARIO_PERSON.principal],
  ]);
});

Deno.test("scenario: a manual transition without manual: true is refused", async () => {
  const result = await run([
    ...TO_REVIEW,
    { move: "revise", expect: { refused: "a person must confirm it" } },
  ]);
  assertEquals(result.failures, []);
});

Deno.test("scenario: expect refused passes when the reason contains the text, and fails otherwise", async () => {
  const matched = await run([
    ...TO_REVIEW,
    { move: "approve", expect: { refused: "awaiting approval 'go'" } },
  ]);
  assertEquals(matched.failures, []);
  assertEquals(matched.frames[3].refused, true);
  assert(matched.frames[3].message.includes("awaiting approval 'go'"));

  const any = await run([
    ...TO_REVIEW,
    { move: "approve", expect: { refused: "" } },
  ]);
  assertEquals(any.failures, []);

  const other = await run([
    ...TO_REVIEW,
    { move: "approve", expect: { refused: "something else" } },
  ]);
  assertEquals(other.passed, false);
  assertEquals(other.failures.length, 1);
  assertEquals(other.failures[0].step, 3);
  assertEquals(other.failures[0].label, "move approve");
  assert(
    other.failures[0].message.startsWith(
      'expected a refusal mentioning "something else", but it was refused ' +
        "for another reason: transition 'approve' is not ready",
    ),
    other.failures[0].message,
  );

  const through = await run([
    ...TO_REVIEW,
    { approve: "go" },
    { move: "approve", expect: { refused: "" } },
  ]);
  assertEquals(through.failures, [{
    step: 4,
    label: "move approve",
    message: "expected a refusal, but it went through: review -> ship by " +
      "'approve'",
  }]);
});

Deno.test("scenario: an unexpected refusal fails its step, and the walk goes on", async () => {
  const result = await run([
    { move: "submit" },
    { record: { artifact: "plan" }, payload: { text: "Plan" } },
    { move: "submit" },
  ]);
  assertEquals(result.failures.map((f) => f.step), [1]);
  assert(result.failures[0].message.includes("artifact-exists"));
  assertEquals(result.frames[1].moved, {
    from: "draft",
    transition: "submit",
  });
  assertEquals(result.frames.at(-1)?.run.stage, "review");
});

Deno.test("scenario: a payload that fails its schema is a refusal that expect can match", async () => {
  const result = await run([
    {
      record: { artifact: "plan" },
      payload: { text: "" },
      expect: { refused: "does not match its schema" },
    },
    { record: { artifact: "plan" }, payload: {} },
  ]);
  assertEquals(result.failures.map((f) => f.step), [2]);
  assert(
    result.failures[0].message.startsWith(
      "the artifact 'plan' payload does not match its schema: ",
    ),
    result.failures[0].message,
  );
  // The rejection is kept on the run as retry feedback.
  assert(result.frames[1].run.validations.artifacts["plan"] !== undefined);
});

Deno.test("scenario: a bare expect stage passes and fails", async () => {
  const result = await run([
    { expect: { stage: "draft" } },
    { expect: { stage: "review" } },
  ]);
  assertEquals(result.failures, [{
    step: 2,
    label: "expect stage review",
    message: "at 'draft', expected 'review'",
  }]);
});

Deno.test("scenario: the clock moves a second per engine reading, and wait opens a cooldown", async () => {
  const early = await run([
    ...TO_SHIP,
    { record: { evidence: "pr" }, payload: { status: "ok" } },
    { approve: "release-ok" },
    { move: "release", expect: { refused: "cooldown" } },
    { wait: 60 },
    { move: "release" },
  ]);
  assertEquals(early.failures, []);
  assert(Date.parse(early.frames[0].at) > Date.parse(SCENARIO_EPOCH));
  const [before, after] = [early.frames[7].at, early.frames[8].at];
  assertEquals(Date.parse(after) - Date.parse(before), 60_000);
});

Deno.test("scenario: externalRefs reach the run", async () => {
  const parsed = parseScenario({
    scenario: "s",
    factory: "team",
    externalRefs: { "swamp-club": "2805" },
    steps: [{ expect: { stage: "draft" } }],
  });
  assert(parsed.ok);
  const result = await runScenario(stopsParsedDefinition(), parsed.value);
  assertEquals(result.frames[0].run.externalRefs, { "swamp-club": "2805" });
  assertEquals(result.frames[0].run.key, "scenario-s");
});

Deno.test("scenario: malformed files are refused with a reason", () => {
  const base = { scenario: "s", factory: "team" };
  const cases: [unknown, string][] = [
    [{ ...base }, "steps: "],
    [{ ...base, steps: [] }, "steps: "],
    [{ ...base, steps: [{ note: "hi" }] }, "a step needs a verb"],
    [
      { ...base, steps: [{ move: "a", approve: "b" }] },
      "a step has one verb, not approve and move",
    ],
    [{ ...base, steps: [{ approve: "a", manual: true }] }, "manual belongs"],
    [{ ...base, steps: [{ move: "a", payload: {} }] }, "payload belongs"],
    [{ ...base, steps: [{ record: {} }] }, "exactly one of artifact"],
    [
      { ...base, steps: [{ record: { artifact: "a", evidence: "b" } }] },
      "exactly one of artifact",
    ],
    [{ ...base, steps: [{ wait: -1 }] }, "steps.0.wait"],
    [{ ...base, steps: [{ wait: 5, expect: { refused: "" } }] }, "a wait"],
    [
      { ...base, steps: [{ move: "a", expect: { stage: "b" } }] },
      "a step of its own",
    ],
    [{ ...base, steps: [{ expect: { refused: "x" } }] }, "a step needs a verb"],
    [{ ...base, steps: [{ go: "a" }] }, "steps.0"],
    [{ ...base, unknown: "x", steps: [{ move: "a" }] }, "(root)"],
    [{ scenario: "s", steps: [{ move: "a" }] }, "factory"],
  ];
  for (const [raw, want] of cases) {
    const errors = errorsOf(raw);
    assert(
      errors.some((e) => e.includes(want)),
      `${JSON.stringify(raw)}: ${JSON.stringify(errors)}`,
    );
  }
  assertEquals(errorsOf({ ...base, steps: [{ move: "a" }] }), []);
});

Deno.test("scenario: the runner and everything it imports use no Deno API, so the studio can run it in a browser", async () => {
  const seen = new Set<string>();
  const visit = async (url: URL) => {
    if (seen.has(url.href)) return;
    seen.add(url.href);
    const text = await Deno.readTextFile(url);
    assert(!/\bDeno\./.test(text), `${posix.basename(url.pathname)} uses Deno`);
    for (const match of text.matchAll(/from "(\.{1,2}\/[^"]+)"/g)) {
      await visit(new URL(match[1], url));
    }
  };
  await visit(new URL("./scenario.ts", import.meta.url));
  const names = [...seen].map((href) => posix.basename(new URL(href).pathname));
  assert(names.includes("run_store.ts") && names.includes("gates.ts"));
  assert(!names.includes("definition_file.ts"));
});
