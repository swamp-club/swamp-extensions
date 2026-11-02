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
import { assert, assertEquals } from "@std/assert";
import { layout } from "./layout.ts";
import { allTargets, navigate, navModel } from "./nav.ts";
import { type Target, targetKey } from "./selection.ts";
import { EXAMPLES, loadOk } from "./test_support.ts";

const KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "Enter",
  "Escape",
];

for (
  const [name, o] of EXAMPLES.flatMap((n) =>
    (["across", "down"] as const).map((o) => [n, o] as const)
  )
) {
  const label = o === "across" ? name : `${name} (down)`;
  Deno.test(`nav ${label}: every stage, exit and gate is reachable by keyboard`, async () => {
    const { definition, view } = await loadOk(name);
    const model = navModel(definition, layout(definition, view, o));
    const start = navigate(model, null, "ArrowDown");
    assert(start !== null);
    const seen = new Map<string, Target>([[targetKey(start), start]]);
    const queue = [start];
    while (queue.length > 0) {
      const at = queue.shift()!;
      for (const key of KEYS) {
        const next = navigate(model, at, key);
        if (next !== null && !seen.has(targetKey(next))) {
          seen.set(targetKey(next), next);
          queue.push(next);
        }
      }
    }
    const all = allTargets(model).map(targetKey).sort();
    assertEquals([...seen.keys()].sort(), all);
    const exits = view.stages.reduce((n, s) => n + s.transitions.length, 0) +
      view.globalTransitions.length;
    assertEquals(all.filter((k) => k.includes('"kind":"exit"')).length, exits);
  });
}

Deno.test("nav: into an exit and its gates, back out, and along the exit", async () => {
  const { definition, view } = await loadOk("build-swamp-extension");
  const model = navModel(definition, layout(definition, view));
  const plan: Target = { kind: "stage", stage: "plan" };
  const exit = navigate(model, plan, "Enter")!;
  assertEquals(exit, { kind: "exit", stage: "plan", exit: "submit" });
  const gate = navigate(model, exit, "ArrowRight")!;
  assertEquals(gate.kind, "gate");
  assertEquals(navigate(model, gate, "Escape"), exit);
  assertEquals(navigate(model, exit, "Escape"), plan);
  // Enter follows the exit, from the exit or from one of its gates.
  const next: Target = { kind: "stage", stage: "plan-review" };
  assertEquals(navigate(model, exit, "Enter"), next);
  assertEquals(navigate(model, gate, "Enter"), next);
  assertEquals(navigate(model, plan, "Escape"), null);
  assertEquals(navigate(model, plan, "c"), null);
});

Deno.test("nav (down): Down moves along a lane, Right to the next lane", async () => {
  const { definition, view } = await loadOk("ten-stage");
  const across = navModel(definition, layout(definition, view));
  const down = navModel(definition, layout(definition, view, "down"));
  const stage = (s: string): Target => ({ kind: "stage", stage: s });
  // Across: classify → triage along the open lane; down to triaged's row.
  assertEquals(
    navigate(across, stage("classify"), "ArrowRight"),
    stage("triage"),
  );
  assertEquals(
    navigate(across, stage("classify"), "ArrowDown"),
    stage("codebase-context"),
  );
  // Down the same moves turn with the lanes.
  assertEquals(navigate(down, stage("classify"), "ArrowDown"), stage("triage"));
  assertEquals(navigate(down, stage("triage"), "ArrowUp"), stage("classify"));
  assertEquals(
    navigate(down, stage("classify"), "ArrowRight"),
    stage("codebase-context"),
  );
  assertEquals(navigate(down, stage("classify"), "ArrowLeft"), null);
  // An exit's own keys do not turn: Up and Down between exits, Right to gates.
  const exit = navigate(down, stage("triage"), "Enter")!;
  assertEquals(exit, { kind: "exit", stage: "triage", exit: "accept" });
  assertEquals(navigate(down, exit, "ArrowDown"), {
    kind: "exit",
    stage: "triage",
    exit: "reclassify",
  });
  // Reading order is the same either way: lane by lane.
  assertEquals(
    down.tiles.map((t) => t.target),
    across.tiles.map((t) => t.target),
  );
});
