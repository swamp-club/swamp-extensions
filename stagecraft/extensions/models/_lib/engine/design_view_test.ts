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

import { assert, assertEquals, assertFalse } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { describeGate, type DesignView, designView } from "./design_view.ts";
import { parseExample } from "./fake_swamp.ts";
import { analyzeDefinition } from "./graph.ts";
import {
  type FactoryDefinition,
  parseDefinition,
} from "./definition_schema.ts";

function view(definition: FactoryDefinition): DesignView {
  return designView("team", definition, analyzeDefinition(definition), "d");
}

function fromRaw(raw: unknown): FactoryDefinition {
  const result = parseDefinition(raw);
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

function definition(yaml: string): FactoryDefinition {
  return fromRaw(parseYaml(yaml));
}

/** A skill example's definition block. */
function example(text: string): FactoryDefinition {
  return fromRaw(parseExample(text).definition);
}

/** The stages reachable from `from` along the stage transitions `take` keeps. */
function reachable(
  v: DesignView,
  from: string,
  take: (t: DesignView["stages"][number]["transitions"][number]) => boolean,
): Set<string> {
  const seen = new Set([from]);
  const queue = [from];
  while (queue.length > 0) {
    const stage = v.stages.find((s) => s.id === queue.shift());
    for (const t of stage?.transitions ?? []) {
      if (take(t) && !seen.has(t.to)) {
        seen.add(t.to);
        queue.push(t.to);
      }
    }
  }
  return seen;
}

const SHIPPED = [
  new URL(
    "../../../../.claude/skills/stagecraft/references/examples/",
    import.meta.url,
  ),
  new URL("../../../../testdata/factories/", import.meta.url),
];

async function shippedDefinitions(): Promise<[string, FactoryDefinition][]> {
  const found: [string, FactoryDefinition][] = [];
  for (const dir of SHIPPED) {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.name.endsWith(".yaml")) continue;
      const text = await Deno.readTextFile(new URL(entry.name, dir));
      found.push([
        entry.name,
        dir === SHIPPED[0] ? example(text) : definition(text),
      ]);
    }
  }
  return found.sort(([a], [b]) => a.localeCompare(b));
}

Deno.test("design view: every shipped definition shows its stages, transitions and human stops", async () => {
  const definitions = await shippedDefinitions();
  assert(definitions.length >= 6, `found ${definitions.length}`);
  for (const [file, lc] of definitions) {
    const v = view(lc);
    assertEquals(v.stages.map((s) => s.id), lc.stages.map((s) => s.id), file);
    for (const stage of v.stages) {
      for (const t of stage.transitions) {
        assert(
          v.stages.some((s) => s.id === t.to),
          `${file}: ${t.path} targets a stage`,
        );
      }
    }
    // Every manual transition and human-approval gate is a human stop.
    lc.stages.forEach((s, i) =>
      (s.transitions ?? []).forEach((t, k) => {
        const shown = v.stages[i].transitions[k];
        assertEquals(shown.path, `stages.${i}.transitions.${k}`, file);
        const humans = (t.gates ?? []).filter((g) =>
          g.type === "human-approval"
        );
        if (t.manual === true) {
          assert(shown.humanStop, `${file}: ${shown.path} manual`);
        }
        for (const g of humans) {
          assert(
            g.config.when === undefined
              ? shown.humanStop
              : shown.conditionalHumanStop,
            `${file}: ${shown.path} human-approval`,
          );
        }
        if (t.manual !== true && humans.length === 0) {
          assertFalse(shown.humanStop || shown.conditionalHumanStop, file);
        }
      })
    );
  }
});

Deno.test("design view: leaving out loops back never strands a stage", async () => {
  for (const [file, lc] of await shippedDefinitions()) {
    const v = view(lc);
    const initial = v.stages.find((s) => s.initial)?.id;
    assert(initial !== undefined, file);
    const all = reachable(v, initial, () => true);
    const forward = reachable(v, initial, (t) => !t.loop);
    assertEquals([...forward].sort(), [...all].sort(), file);
    for (const t of v.globalTransitions) assertFalse(t.loop, file);
  }
});

Deno.test("design view: findings-clear and findings-open read as opposites", () => {
  const config = {
    artifact: "plan-review",
    blocking: ["critical", "high"] as ("critical" | "high")[],
  };
  assertEquals(
    describeGate({ type: "findings-clear", config }).text,
    "artifact 'plan-review' has no critical/high findings",
  );
  assertEquals(
    describeGate({ type: "findings-open", config }).text,
    "artifact 'plan-review' has an open critical/high finding",
  );
});

Deno.test("design view: the build-swamp-extension definition shows its handoffs", async () => {
  const text = await Deno.readTextFile(
    new URL("build-swamp-extension.yaml", SHIPPED[0]),
  );
  const lc = example(text);
  const v = view(lc);
  const worked = lc.stages.filter((s) => s.work !== undefined);
  assert(worked.length > 0);
  for (const s of worked) {
    const shown = v.stages.find((x) => x.id === s.id)?.work;
    assertEquals(shown?.mode, s.work?.mode);
    assertEquals(shown?.inject, s.work?.context?.inject ?? []);
    assertEquals(shown?.bindings, Object.keys(s.work?.bindings ?? {}));
  }
});

Deno.test("design view: gate and work descriptions are carried", () => {
  const v = view(definition(`
schemaVersion: 1
stages:
  - id: plan
    initial: true
    work:
      mode: interactive
      description: The plan names every file it touches.
    transitions:
      - name: approved
        to: done
        gates:
          - type: human-approval
            description: A person reads the plan before any code is written.
            config: { id: plan-approval }
          - type: cel
            config: { expr: "true" }
  - id: done
    terminal: true
`));
  assertEquals(
    v.stages[0].work?.description,
    "The plan names every file it touches.",
  );
  const [approval, cel] = v.stages[0].transitions[0].gates;
  assertEquals(
    approval.description,
    "A person reads the plan before any code is written.",
  );
  assertFalse("description" in cel);
});

const FLAWED = `
schemaVersion: 1
description: A definition with design errors.
stages:
  - id: plan
    initial: true
    transitions:
      - name: go
        to: build
      - name: skip
        to: stuck
  - id: build
    transitions:
      - name: ship
        to: done
        manual: true
      - name: ask
        to: done
        gates:
          - type: human-approval
            config: { id: risky, when: "item.risk == 'high'" }
  - id: stuck
    transitions:
      - name: retry
        to: stuck
        description: goes back
  - id: orphan
    transitions:
      - name: finish
        to: done
  - id: done
    terminal: true
`;

Deno.test("design view: a definition with graph findings carries each one with its trace", () => {
  const v = view(definition(FLAWED));
  assertEquals(
    v.findings.map((f) => `${f.severity} ${f.code} ${f.path}`),
    [
      "error dead-end stages.2",
      "error unreachable-stage stages.3",
      "warning ambiguous-exit stages.0.transitions.0",
      "warning default-cycle-bound stages.2",
    ],
  );
  assertEquals(v.findings[0].trace, ["plan", "stuck"]);
  // stuck's retry closes a cycle.
  assert(v.stages[2].transitions[0].loop);
  // A manual transition is a human stop; a human approval under `when` is a
  // conditional one, with its condition.
  const [ship, ask] = v.stages[1].transitions;
  assert(ship.humanStop && !ship.conditionalHumanStop);
  assert(!ask.humanStop && ask.conditionalHumanStop);
  assertEquals(ask.gates[0].when, "item.risk == 'high'");
});

Deno.test("design view: build-swamp-extension's loops back", async () => {
  const lc = example(
    await Deno.readTextFile(
      new URL("build-swamp-extension.yaml", SHIPPED[0]),
    ),
  );
  const v = view(lc);
  const loopNames = v.stages.flatMap((s) =>
    s.transitions.filter((t) => t.loop).map((t) => `${s.id}.${t.name}`)
  );
  assertEquals(loopNames, [
    "plan-review.rework",
    "plan-review.revise",
    "check.failed",
    "check.quality-failed",
    "code-review.rework",
    "code-review.revise",
    "release.rework",
  ]);
  // recheck checks the same commit again; it goes forward, not back.
  const implement = v.stages.find((s) => s.id === "implement");
  assertFalse(implement?.transitions.find((t) => t.name === "recheck")?.loop);
});

Deno.test("design view: the same definition gives the same view", () => {
  const lc = definition(FLAWED);
  assertEquals(view(lc), view(structuredClone(lc)));
});
