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

for (const name of EXAMPLES) {
  Deno.test(`nav ${name}: every stage, exit and gate is reachable by keyboard`, async () => {
    const { definition, view } = await loadOk(name);
    const model = navModel(definition, layout(definition, view));
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
  const { definition, view } = await loadOk("swamp-club-swamp-extensions");
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
