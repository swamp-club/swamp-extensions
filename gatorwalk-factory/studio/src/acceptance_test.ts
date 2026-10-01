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
// The issues' acceptance, on the page's model. Design mode (swamp-club
// #2807): an agent adds an exit from plan to implement to the file on disk,
// and the open page shows ambiguous-exit and product-missing-on-path, marks
// plan as changed, and a finding's Copy reference names its file, path and
// code. Simulate mode (swamp-club #2808): every example's saved scenarios
// play end to end; a change on disk that lets a refused step through shows
// that step failing; and a walk branched from plan-churn copies an entry
// that, added to the factory's scenarios, passes validate.

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { fakeSwamp } from "../../extensions/models/_lib/engine/fake_swamp.ts";
import { model as factory } from "../../extensions/models/engine/factory.ts";
import { changedSince, fingerprints, markSeen } from "./changes.ts";
import { referenceLine } from "./reference.ts";
import { findingTarget, follow, type Target } from "./selection.ts";
import {
  branch,
  entryYaml,
  play,
  runAll,
  timeline,
  toScenarioEntry,
  walkScenario,
} from "./simulate.ts";
import {
  EXAMPLES,
  exampleText,
  loadOk,
  modelPath,
  raisePlanLimit,
} from "./test_support.ts";

const FILE = modelPath("build-swamp-extension");
// As the model definition file holds them: four spaces in, under
// globalArguments.definition.
const EXIT = "          - name: submit\n            to: plan-review\n";
const SHORTCUT = "          - name: shortcut\n            to: implement\n";

Deno.test("acceptance: adding an exit from plan to implement shows its findings and marks plan", async () => {
  const text = await exampleText("build-swamp-extension");
  assertEquals(
    text.split(EXIT).length,
    2,
    "the plan stage's exit is where the test expects",
  );
  const before = await loadOk("build-swamp-extension", text);
  const codes = (l: typeof before) => new Set(l.findings.map((f) => f.code));
  assert(!codes(before).has("ambiguous-exit"));

  // The page has shown the file once, and a person has selected a stage.
  const seen = markSeen(null, fingerprints(before.definition), "all");
  const selected: Target = { kind: "stage", stage: "implement" };

  const after = await loadOk(
    "build-swamp-extension",
    text.replace(EXIT, EXIT + SHORTCUT),
  );
  assert(codes(after).has("ambiguous-exit"));
  assert(codes(after).has("product-missing-on-path"));
  assertEquals([...changedSince(seen, fingerprints(after.definition))], [
    "plan",
  ]);
  assertEquals(follow(after.definition, after.findings, selected), selected);

  const ambiguous = after.findings.find((f) => f.code === "ambiguous-exit")!;
  const line = referenceLine(FILE, after.definition, findingTarget(ambiguous));
  assert(
    line.startsWith(
      `${FILE} globalArguments.definition.${ambiguous.path} (`,
    ),
    line,
  );
  assert(line.includes(" ambiguous-exit: "), line);
  assert(
    ambiguous.range !== null,
    "the finding underlines its path in the source",
  );
});

Deno.test("acceptance: every example factory's saved scenarios play end to end in the page", async () => {
  let saved = 0, played = 0;
  for (const name of EXAMPLES) {
    const loaded = await loadOk(name);
    saved += loaded.scenarios.length;
    for (const run of await runAll(loaded.definition, loaded.scenarios)) {
      assert(run.ok, `${name}/${run.name}: ${!run.ok && run.error}`);
      assert(
        run.played.passed,
        `${name}/${run.name}: ${JSON.stringify(run.played.failures)}`,
      );
      assertEquals(run.played.frames.length, run.scenario.steps.length + 1);
      played++;
    }
  }
  assert(saved > 0, "the examples ship saved scenarios");
  assertEquals(played, saved);
});

Deno.test("acceptance: a change on disk that lets a refused step through shows it failing in the summary and on the timeline", async () => {
  const name = "build-swamp-extension";
  const text = await exampleText(name);
  // The reload a definition event triggers is this same load and run.
  const after = await loadOk(name, raisePlanLimit(text));
  const runs = await runAll(after.definition, after.scenarios);
  const churn = runs.find((r) => r.name === "plan-churn");
  assert(churn?.ok);
  assert(!churn.played.passed);
  const failed = churn.played.failures.find((f) => f.step === 16);
  assert(failed, JSON.stringify(churn.played.failures));
  assertEquals(failed.label, "move revise");
  assert(failed.message.includes("but it went through"), failed.message);
  const tick = timeline(churn.played.frames).ticks[16];
  assertEquals([tick.asExpected, tick.refused], [false, false]);
  // The other scenario still passes.
  const other = runs.find((r) => r.name === "plan-to-release");
  assert(other?.ok && other.played.passed);
});

Deno.test("acceptance: a walk branched from plan-churn copies an entry that passes validate once added to the factory's scenarios", async () => {
  const name = "build-swamp-extension";
  const text = await exampleText(name);
  const loaded = await loadOk(name, text);
  const runs = await runAll(loaded.definition, loaded.scenarios);
  const churn = runs.find((r) => r.name === "plan-churn");
  assert(churn?.ok);
  // At the cycle limit, instead of revise: try approve, wait, override, then
  // revise.
  const walk = branch(churn.scenario, 15);
  walk.steps.push(
    { move: "approve" },
    { wait: 3600 },
    { override: { stage: "plan", note: "one more pass" } },
    { move: "revise", manual: true },
  );
  const walked = await play(loaded.definition, walkScenario(walk));
  const copied = entryYaml(toScenarioEntry(walk, walked.frames));

  // The agent pastes it at the end of the scenarios list, the last block of
  // the model definition file, and runs validate.
  const saved = parseYaml(text + copied) as {
    globalArguments: { definition: unknown; scenarios: unknown[] };
  };
  const { definition, scenarios } = saved.globalArguments;
  assertEquals(scenarios.length, loaded.scenarios.length + 1);
  const swamp = fakeSwamp();
  swamp.factory(name, definition, { scenarios });
  await factory.methods.validate.execute({}, swamp.context(name));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.includes(`, ${scenarios.length} saved scenario(s) passed; `),
    summary,
  );
});
