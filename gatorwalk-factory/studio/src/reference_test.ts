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
import { loadDefinition } from "./model.ts";
import { referenceLine } from "./reference.ts";
import { findingTarget } from "./selection.ts";
import { modelFile } from "./test_support.ts";

const TEXT = `schemaVersion: 1
stages:
  - id: plan
    initial: true
    transitions:
      - name: submit
        to: review
        gates:
          - { type: human-approval, config: { id: plan-ok } }
          - { type: cel, config: { expr: "true" } }
  - id: review
    transitions: [{ name: accept, to: done }]
  - id: lost
    terminal: true
  - id: done
    terminal: true
globalTransitions:
  - { name: abandon, to: done }
`;

const FILE = "models/@swamp/gatorwalk-factory/factory/team.yaml";

Deno.test("reference: one plain line naming the model file, the path in it and a readable name", async () => {
  const loaded = await loadDefinition(FILE, modelFile(TEXT, "team"));
  assert(loaded.ok);
  const d = loaded.definition;
  const line = (t: Parameters<typeof referenceLine>[2]) =>
    referenceLine(FILE, d, t);
  assertEquals(
    line({ kind: "stage", stage: "review" }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.1 (stage review)",
  );
  assertEquals(
    line({ kind: "exit", stage: "plan", exit: "submit" }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.0.transitions.0 (exit submit: plan → review)",
  );
  assertEquals(
    line({
      kind: "gate",
      stage: "plan",
      exit: "submit",
      gate: { type: "human-approval", key: "plan-ok", nth: 0 },
    }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.0.transitions.0.gates.0 (human-approval gate 'plan-ok' on exit submit: plan → review)",
  );
  assertEquals(
    line({
      kind: "gate",
      stage: "plan",
      exit: "submit",
      gate: { type: "cel", key: "true", nth: 0 },
    }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.0.transitions.0.gates.1 (cel gate on exit submit: plan → review)",
  );
  assertEquals(
    line({ kind: "exit", stage: null, exit: "abandon" }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.globalTransitions.0 (global exit abandon: any stage → done)",
  );
  assertEquals(
    line({ kind: "any" }),
    "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.globalTransitions (global exits, from any stage)",
  );
});

Deno.test("reference: a finding's line adds its code and message", async () => {
  const loaded = await loadDefinition(FILE, modelFile(TEXT, "team"));
  assert(loaded.ok);
  const f = loaded.view.findings.find((x) => x.code === "unreachable-stage")!;
  const line = referenceLine(
    FILE,
    loaded.definition,
    findingTarget(f),
  );
  assert(
    line.startsWith(
      "models/@swamp/gatorwalk-factory/factory/team.yaml globalArguments.definition.stages.2 (stage lost) unreachable-stage: ",
    ),
    line,
  );
  assert(!line.includes("\n"));
});
