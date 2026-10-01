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
import { parse as parseYaml } from "@std/yaml";
import type { TransitionReadiness } from "../../extensions/models/_lib/engine/gates.ts";
import { parseScenario } from "../../extensions/models/_lib/engine/scenario.ts";
import {
  actionsAt,
  branch,
  entryYaml,
  exitState,
  formatSeconds,
  overlay,
  payloadCatalogue,
  play,
  runAll,
  type ScenarioRun,
  timeline,
  toScenarioEntry,
  unrecordable,
  walkScenario,
} from "./simulate.ts";
import { loadOk } from "./test_support.ts";

async function churn() {
  const loaded = await loadOk("build-swamp-extension");
  const runs = await runAll(loaded.definition, loaded.scenarios);
  const run = runs.find((r) => r.name === "plan-churn");
  assert(run?.ok);
  return { loaded, runs, run };
}

const ok = (run: ScenarioRun | undefined) => {
  assert(run?.ok, JSON.stringify(run));
  return run;
};

Deno.test("simulate: a saved entry that does not parse is reported on its own, and the rest still run", async () => {
  const loaded = await loadOk("starter");
  const runs = await runAll(loaded.definition, [
    ...loaded.scenarios,
    {
      name: "broken",
      path: "globalArguments.scenarios.4",
      text: "",
      value: {},
    },
  ]);
  assertEquals(runs.map((r) => [r.name, r.ok]), [
    ["plan-feedback", true],
    ["plan-to-done", true],
    ["duplicate-exit", true],
    ["duplicate-after-retarget", true],
    ["broken", false],
  ]);
  const broken = runs[4];
  assert(!broken.ok);
  assert(broken.error.includes("scenario"), broken.error);
});

Deno.test("simulate: a run keeps a frame per step, as the engine runs it", async () => {
  const { run } = await churn();
  const p = ok(run).played;
  assert(p.passed, JSON.stringify(p.failures));
  assertEquals(p.frames.length, ok(run).scenario.steps.length + 1);
  // The fifth revise is refused, as the scenario expects.
  const refused = p.frames[16];
  assertEquals([refused.kind, refused.refused, refused.asExpected], [
    "move",
    true,
    true,
  ]);
});

const readiness = (
  over: Partial<TransitionReadiness>,
): TransitionReadiness => ({
  name: "go",
  to: "next",
  manual: false,
  gates: [],
  cycleLimit: { count: 1, limit: 5, granted: 0, allowed: true },
  ready: true,
  failures: [],
  ...over,
});

Deno.test("simulate: an exit reads READY, PERSON or BLOCKED from its gates and cycle limit", () => {
  assertEquals(exitState(readiness({})), "ready");
  assertEquals(exitState(readiness({ manual: true })), "person");
  const approval = {
    type: "human-approval" as const,
    pass: false,
    gateId: "ok",
    required: true,
    reason: "awaiting approval 'ok'",
  };
  assertEquals(
    exitState(readiness({ ready: false, gates: [approval], failures: ["x"] })),
    "person",
  );
  // Another gate failing too: no person can open it yet.
  assertEquals(
    exitState(readiness({
      ready: false,
      gates: [approval, {
        type: "artifact-fresh",
        pass: false,
        reason: "missing",
      }],
      failures: ["x", "y"],
    })),
    "blocked",
  );
  // A human approval whose condition cannot be evaluated is a fix to make.
  assertEquals(
    exitState(readiness({
      ready: false,
      gates: [{ ...approval, conditionError: true }],
      failures: ["x"],
    })),
    "blocked",
  );
  // A closed cycle limit is blocked, whatever the gates say.
  assertEquals(
    exitState(readiness({
      ready: false,
      gates: [approval],
      cycleLimit: { count: 5, limit: 5, granted: 0, allowed: false },
      failures: ["x", "cycle limit"],
    })),
    "blocked",
  );
});

Deno.test("simulate: the steps a person can take at the cycle limit", async () => {
  const { loaded, runs, run } = await churn();
  // Frame 15: the fifth feedback is recorded at plan-review.
  const frame = ok(run).played.frames[15];
  assertEquals(frame.run.stage, "plan-review");
  const catalogue = payloadCatalogue(runs);
  const actions = actionsAt(loaded.definition, frame, catalogue);
  const keys = actions.map((a) => a.key);
  for (
    const key of [
      "move:approve",
      "move:rework",
      "move:revise",
      "approve:plan-approval",
      "decline:plan-approval",
      "override:plan",
      "record:evidence:plan-feedback:0",
      "wait:3600",
    ]
  ) assert(keys.includes(key), `${key} in ${keys.join(", ")}`);
  const revise = actions.find((a) => a.key === "move:revise")!;
  assertEquals(revise.step, { move: "revise", manual: true });
  assert(revise.label.includes("BLOCKED"), revise.label);
  assert(revise.hint?.includes("cycle limit"), revise.hint);
  // A product no saved scenario records has nothing to offer, and is listed
  // as unrecordable instead.
  const missing = unrecordable(loaded.definition, frame, catalogue);
  for (const key of missing) {
    assert(!keys.some((k) => k.startsWith(`record:${key.replace(" ", ":")}`)));
  }
});

Deno.test("simulate: the payload catalogue keeps each saved payload once", async () => {
  const { runs } = await churn();
  const catalogue = payloadCatalogue(runs);
  assertEquals(catalogue.get("evidence:plan-feedback")?.[0], { feedback: "f" });
  const plans = catalogue.get("artifact:plan") ?? [];
  assertEquals(
    new Set(plans.map((p) => JSON.stringify(p))).size,
    plans.length,
  );
});

Deno.test("simulate: a walk replays the base's steps, then the person's, and copies as an entry that passes", async () => {
  const { loaded, run } = await churn();
  const walk = branch(ok(run).scenario, 16);
  walk.steps.push(
    { move: "approve" },
    { wait: 3600 },
    { override: { stage: "plan", note: "one more pass" } },
    { move: "revise", manual: true },
  );
  const played = await play(loaded.definition, walkScenario(walk));
  assertEquals(played.frames.length, 16 + 4 + 1);
  // approve is refused (no approval yet); the walk goes on from there.
  assertEquals(played.frames[17].refused, true);
  assertEquals(played.frames[20].run.stage, "plan");

  const entry = toScenarioEntry(walk, played.frames);
  assertEquals(entry.scenario, "plan-churn-walk");
  const approve = entry.steps[16];
  assert(
    approve.expect !== undefined && "refused" in approve.expect &&
      approve.expect.refused === played.frames[17].message,
  );
  assertEquals(entry.steps[entry.steps.length - 1], {
    expect: { stage: "plan" },
  });

  // The YAML is one list item, indented for globalArguments.scenarios, and
  // reads back as the same entry, which the schema accepts and which passes.
  const text = entryYaml(entry);
  assert(text.startsWith("    - scenario: plan-churn-walk\n"), text);
  const back = (parseYaml(
    text.split("\n").map((l) => l.slice(4)).join("\n"),
  ) as unknown[])[0];
  assertEquals(back, entry);
  const parsed = parseScenario(back);
  assert(parsed.ok, JSON.stringify(!parsed.ok && parsed.errors));
  const again = await play(loaded.definition, parsed.value);
  assert(again.passed, JSON.stringify(again.failures));
});

Deno.test("simulate: a walk keeps its own copy of the base's steps", async () => {
  const { run } = await churn();
  const scenario = structuredClone(ok(run).scenario);
  const walk = branch(scenario, 2);
  scenario.steps.length = 0;
  assertEquals(walk.baseSteps.length, 2);
  assertEquals(walkScenario(walk).steps.length, 2);
});

Deno.test("simulate: the overlay counts entries and exits taken, and marks a refusal", async () => {
  const { run } = await churn();
  const frames = ok(run).played.frames;
  const at15 = overlay(frames, 15)!;
  assertEquals(at15.current, "plan-review");
  assertEquals(at15.entries.plan, 5);
  assertEquals(at15.taken.get("plan:submit"), 5);
  assertEquals(at15.taken.get("plan-review:revise"), 4);
  assertEquals(at15.exits.get("revise")?.state, "blocked");
  assertEquals(at15.refused, null);
  const at16 = overlay(frames, 16)!;
  assertEquals(at16.refused, { from: "plan-review", transition: "revise" });
  assertEquals(at16.moved, null);
  const at2 = overlay(frames, 2)!;
  assertEquals(at2.moved, {
    from: "plan",
    transition: "submit",
    to: "plan-review",
  });
  assertEquals(overlay(frames, frames.length), null);
});

Deno.test("simulate: the timeline has a tick per frame and a ribbon of stages", async () => {
  const { run } = await churn();
  const frames = ok(run).played.frames;
  const { ticks, ribbon } = timeline(frames, 16);
  assertEquals(ticks.length, frames.length);
  assertEquals(ticks[0].kind, "start");
  assertEquals(ticks.filter((t) => t.walked).map((t) => t.index), [
    17,
    18,
    19,
    20,
    21,
  ]);
  assertEquals(ribbon[0], { stage: "plan", from: 0, to: 1 });
  assertEquals(ribbon[1].stage, "plan-review");
  assertEquals(ribbon[ribbon.length - 1].to, frames.length - 1);
});

Deno.test("simulate: seconds read as the clock does", () => {
  assertEquals(
    [30, 60, 3600, 5400, 86400, 90000, 3599, 86399, 3 * 86400 - 1].map(
      formatSeconds,
    ),
    ["30s", "1m", "1h", "1h 30m", "1d", "1d 1h", "1h", "24h", "3d"],
  );
});
