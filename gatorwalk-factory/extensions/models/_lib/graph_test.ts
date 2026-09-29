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
import {
  analyzeLifecycle,
  formatFinding,
  type GraphFinding,
  type GraphReport,
  productsMissingOnEntry,
} from "./graph.ts";
import {
  type Lifecycle,
  parseLifecycle,
  parsePlugin,
  type Plugin,
} from "./lifecycle_schema.ts";
import { instantiatePlugin } from "./plugin_instance.ts";

function lifecycle(yaml: string): Lifecycle {
  const result = parseLifecycle(
    parseYaml(`schemaVersion: 1\nname: test\n${yaml}`),
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

function plugin(yaml: string): Plugin {
  const result = parsePlugin(
    parseYaml(`schemaVersion: 1\nname: test\n${yaml}`),
  );
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

/** Findings as `code path [stage]` lines, for compact assertions. */
function codes(findings: GraphFinding[]): string[] {
  return findings.map((f) =>
    `${f.code} ${f.path}${f.stage !== undefined ? ` [${f.stage}]` : ""}`
  );
}

function only(report: GraphReport, code: string): GraphFinding {
  const found = [...report.errors, ...report.warnings].filter((f) =>
    f.code === code
  );
  assertEquals(found.length, 1, JSON.stringify(found, null, 2));
  return found[0];
}

const OBJECT = "{ type: object }";

// --- reachability and dead ends ---------------------------------------------

Deno.test("graph: a stage behind a gate that can never pass is unreachable", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    transitions:
      - name: finish
        to: done
      - name: detour
        to: orphan
        gates:
          - type: evidence-recorded
            config: { name: proof }
  - id: orphan
    evidence: [{ name: proof, schema: ${OBJECT} }]
    transitions: [{ name: back, to: done }]
  - id: done
    terminal: true
`));
  assertEquals(codes(report.errors), [
    "gate-never-passes stages.0.transitions.1 [a]",
    "unreachable-stage stages.1 [orphan]",
  ]);
  const gate = report.errors[0];
  assert(
    gate.message.includes("which stage 'a' does not record"),
    gate.message,
  );
  assertEquals(gate.trace, ["a"]);
  assertEquals(report.warnings, []);
});

Deno.test("graph: evidence recorded by the stage itself passes", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    evidence: [{ name: proof, schema: ${OBJECT} }]
    transitions:
      - name: finish
        to: done
        gates:
          - type: evidence-recorded
            config: { name: proof }
  - id: done
    terminal: true
`));
  assertEquals(report.errors, []);
  assertEquals(report.warnings, []);
});

Deno.test("graph: a loop with no way to a terminal stage is a dead end", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    maxCycles: 3
    transitions:
      - name: finish
        to: done
        gates:
          - type: artifact-exists
            config: { artifact: never }
      - name: spin
        to: b
  - id: b
    artifacts: [{ name: never, schema: ${OBJECT} }]
    transitions: [{ name: back, to: b }]
  - id: done
    terminal: true
`));
  // done is unreachable too: finish was its only way in.
  assertEquals(codes(report.errors), [
    "dead-end stages.0 [a]",
    "gate-never-passes stages.0.transitions.0 [a]",
    "dead-end stages.1 [b]",
    "unreachable-stage stages.2 [done]",
  ]);
  assertEquals(report.errors[2].trace, ["a", "b"]);
});

Deno.test("graph: a global transition to a stage that cannot finish is no way out", () => {
  // escalate leads to triage, which only loops on itself, so it rescues
  // nothing: a and b are still dead ends.
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    maxCycles: 3
    transitions: [{ name: next, to: b }]
  - id: b
    maxCycles: 3
    transitions: [{ name: back, to: a }]
  - id: triage
    maxCycles: 3
    transitions: [{ name: again, to: triage, manual: true }]
  - id: done
    terminal: true
globalTransitions:
  - name: escalate
    to: triage
    gates: [{ type: human-approval, config: { id: escalation } }]
`));
  assertEquals(codes(report.errors), [
    "dead-end stages.0 [a]",
    "dead-end stages.1 [b]",
    "dead-end stages.2 [triage]",
    "unreachable-stage stages.3 [done]",
  ]);
});

Deno.test("graph: a loop left only through a global transition is escape-only", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    maxCycles: 3
    transitions: [{ name: next, to: b }]
  - id: b
    transitions: [{ name: back, to: a }]
  - id: abandoned
    terminal: true
globalTransitions:
  - name: abandon
    to: abandoned
    gates: [{ type: human-approval, config: { id: abandon } }]
`));
  assertEquals(report.errors, []);
  assertEquals(codes(report.warnings), ["escape-only stages.0 [a]"]);
  assert(report.warnings[0].message.includes("'a', 'b'"));
});

// --- gates --------------------------------------------------------------------

Deno.test("graph: artifact-fresh recordedThisCycle needs the stage to declare the artifact", () => {
  const doc = (declaredBy: "a" | "b") =>
    lifecycle(`
stages:
  - id: a
    initial: true
    artifacts:
      - { name: subject, schema: ${OBJECT} }
${
      declaredBy === "a"
        ? "      - { name: review, kind: findings, reviews: subject }"
        : ""
    }
    transitions:
      - name: next
        to: b
      - name: finish
        to: done
        gates:
          - type: artifact-fresh
            config: { artifact: review, recordedThisCycle: true }
  - id: b
    maxCycles: 2
${
      declaredBy === "b"
        ? "    artifacts:\n      - { name: review, kind: findings, reviews: subject }"
        : ""
    }
    transitions: [{ name: back, to: a }]
  - id: done
    terminal: true
`);
  // finish is the only way to done, so the never-passing gate cascades.
  assertEquals(codes(analyzeLifecycle(doc("b")).errors), [
    "dead-end stages.0 [a]",
    "gate-never-passes stages.0.transitions.1 [a]",
    "dead-end stages.1 [b]",
    "unreachable-stage stages.2 [done]",
  ]);
  assertEquals(analyzeLifecycle(doc("a")).errors, []);
});

Deno.test("graph: a gate on an artifact one path skips warns with that path", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: start
    initial: true
    transitions:
      - { name: long, to: design }
      - { name: short, to: build, manual: true }
  - id: design
    artifacts: [{ name: spec, schema: ${OBJECT} }]
    transitions: [{ name: next, to: build }]
  - id: build
    work:
      mode: interactive
      context: { inject: [spec] }
    transitions:
      - name: finish
        to: done
        gates:
          - type: artifact-exists
            config: { artifact: spec }
  - id: done
    terminal: true
`));
  assertEquals(report.errors, []);
  assertEquals(codes(report.warnings), [
    "product-missing-on-path stages.2.transitions.0.gates.0 [build]",
    "product-missing-on-path stages.2.work.context.inject.0 [build]",
  ]);
  assertEquals(report.warnings[0].trace, ["start", "build"]);
});

Deno.test("graph: an inject no path produces is a warning", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    work:
      mode: interactive
      context: { inject: [later] }
    transitions: [{ name: next, to: b }]
  - id: b
    artifacts: [{ name: later, schema: ${OBJECT} }]
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
`));
  const finding = only(report, "product-missing-on-path");
  assert(finding.message.includes("no path to it produces"), finding.message);
});

// --- cycle limits -------------------------------------------------------------

Deno.test("graph: retry and escalate split by max-cycles are exclusive and bounded", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: work
    initial: true
    transitions:
      - name: finish
        to: done
        manual: true
      - name: retry
        to: work
        gates: [{ type: max-cycles, config: { stage: work, limit: 3 } }]
      - name: escalate
        to: human
        gates:
          - type: max-cycles
            config: { stage: work, limit: 3, invert: true }
  - id: human
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
`));
  assertEquals(report.errors, []);
  assertEquals(report.warnings, []);
});

Deno.test("graph: a transition only a cycle override opens is a warning, and its target stays reachable", () => {
  // escalate needs 9 entries into work, but work's limit is 5: only a cycle
  // override gets there. That is a design choice a person can make, not an
  // error, and escalated is not unreachable.
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: work
    initial: true
    transitions:
      - name: finish
        to: done
        manual: true
      - name: retry
        to: work
        manual: true
      - name: escalate
        to: escalated
        gates:
          - type: max-cycles
            config: { stage: work, limit: 9, invert: true }
  - id: escalated
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
`));
  assertEquals(report.errors, []);
  assertEquals(codes(report.warnings), [
    "default-cycle-bound stages.0 [work]",
    "needs-cycle-override stages.0.transitions.2 [work]",
  ]);
  assert(
    report.warnings[1].message.includes(
      "max-cycles on 'work' (limit 9, inverted)",
    ),
    report.warnings[1].message,
  );
});

Deno.test("graph: a loop with maxCycles on a stage is not default-bound", () => {
  const doc = (limit: string) =>
    lifecycle(`
stages:
  - id: a
    initial: true
${limit}
    transitions:
      - { name: again, to: a, manual: true }
      - { name: finish, to: done }
  - id: done
    terminal: true
`);
  assertEquals(
    codes(analyzeLifecycle(doc("")).warnings),
    ["default-cycle-bound stages.0 [a]"],
  );
  assertEquals(analyzeLifecycle(doc("    maxCycles: 5")).warnings, []);
});

// --- ambiguous exits ----------------------------------------------------------

Deno.test("graph: sibling transitions told apart only by cel are ambiguous", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    transitions:
      - name: ship
        to: done
        gates: [{ type: cel, config: { expr: "item.key != ''" } }]
      - name: drop
        to: dropped
        gates: [{ type: cel, config: { expr: "item.key == ''" } }]
      - name: also-ship
        to: done
      - name: ask
        to: dropped
        manual: true
  - id: done
    terminal: true
  - id: dropped
    terminal: true
`));
  // ship/also-ship share a target; ask is manual.
  assertEquals(codes(report.warnings), [
    "ambiguous-exit stages.0.transitions.0 [a]",
    "ambiguous-exit stages.0.transitions.1 [a]",
  ]);
  assert(
    report.warnings[0].message.includes("cel gates could not be compared"),
  );
});

Deno.test("graph: a conditional approval is not a person choosing; an unconditional one is", () => {
  const siblings = (when: string) =>
    analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    transitions:
      - name: ship
        to: done
        gates: [{ type: human-approval, config: { id: go${when} } }]
      - name: drop
        to: dropped
  - id: done
    terminal: true
  - id: dropped
    terminal: true
`));
  const conditional = siblings(", when: \"item.key == 'x'\"");
  assertEquals(codes(conditional.warnings), [
    "ambiguous-exit stages.0.transitions.0 [a]",
  ]);
  assert(
    conditional.warnings[0].message.includes(
      "a human-approval gate without when",
    ),
  );
  assertEquals(codes(siblings("").warnings), []);
});

Deno.test("graph: requireField values that differ make siblings exclusive", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: check
    initial: true
    maxCycles: 3
    evidence:
      - name: checks
        schema: ${OBJECT}
    transitions:
      - name: passed
        to: done
        gates:
          - type: evidence-recorded
            config: { name: checks, requireField: { status: passed } }
      - name: failed
        to: fix
        gates:
          - type: evidence-recorded
            config: { name: checks, requireField: { status: failed } }
  - id: fix
    maxCycles: 3
    transitions: [{ name: recheck, to: check }]
  - id: done
    terminal: true
`));
  assertEquals(report.errors, []);
  assertEquals(report.warnings, []);
});

/** Two sibling exits gated on the same evidence, one requireField each. */
function siblings(left: string, right: string): GraphReport {
  return analyzeLifecycle(lifecycle(`
stages:
  - id: check
    initial: true
    maxCycles: 3
    evidence: [{ name: checks, schema: ${OBJECT} }]
    transitions:
      - name: passed
        to: done
        gates:
          - type: evidence-recorded
            config: { name: checks, requireField: ${left} }
      - name: failed
        to: fix
        gates:
          - type: evidence-recorded
            config: { name: checks, requireField: ${right} }
  - id: fix
    maxCycles: 3
    transitions: [{ name: recheck, to: check }]
  - id: done
    terminal: true
`));
}

Deno.test("graph: requireField keys are compared as field paths, not literally", () => {
  const exclusive: [string, string][] = [
    // A dotted key and a nested object naming the same field.
    ["{ a.b: 1 }", "{ a: { b: 2 } }"],
    ["{ a: { b: 2 } }", "{ a.b: 1 }"],
    // The nested value lacks the field the dotted key requires.
    ["{ a: { c: 1 } }", "{ a.b: 1 }"],
    // A scalar has no fields.
    ["{ a: 5 }", "{ a.b: 1 }"],
    // Neither does an array: a path never steps into one.
    ["{ a: [{ b: 1 }] }", "{ a.0.b: 1 }"],
    ["{ a.b: { c: 1 } }", "{ a.b.c: 2 }"],
  ];
  for (const [left, right] of exclusive) {
    const report = siblings(left, right);
    assertEquals(report.errors, [], `${left} / ${right}`);
    assertEquals(report.warnings, [], `${left} / ${right}`);
  }
});

Deno.test("graph: requireField paths that can both hold stay ambiguous", () => {
  const ambiguous: [string, string][] = [
    ["{ a.b: 1 }", "{ a: { b: 1 } }"],
    // 'ab' is not above 'a.b': only whole segments nest.
    ["{ ab: { b: 1 } }", "{ a.b: 2 }"],
  ];
  for (const [left, right] of ambiguous) {
    assertEquals(codes(siblings(left, right).warnings), [
      "ambiguous-exit stages.0.transitions.0 [check]",
    ], `${left} / ${right}`);
  }
});

/** A stage that can always finish, plus one transition gated by `gates`. */
function guarded(gates: string): GraphReport {
  return analyzeLifecycle(lifecycle(`
stages:
  - id: check
    initial: true
    evidence: [{ name: checks, schema: ${OBJECT} }, { name: other, schema: ${OBJECT} }]
    transitions:
      - name: guarded
        to: done
        gates: ${gates}
      - name: finish
        to: done
  - id: done
    terminal: true
`));
}

Deno.test("graph: requireField entries no payload can satisfy never pass", () => {
  const cases: [string, string][] = [
    [
      "[{ type: evidence-recorded, config: { name: checks, requireField: { a: { b: 1 }, a.b: 2 } } }]",
      `'a' to be {"b":1} and 'a.b' to be 2`,
    ],
    [
      "[{ type: evidence-recorded, config: { name: checks, requireField: { a: 5, a.b: 1 } } }]",
      "'a' to be 5 and 'a.b' to be 1",
    ],
    // Every gate of a transition reads the same payload.
    [
      "[{ type: evidence-recorded, config: { name: checks, requireField: { status: passed } } }, " +
      "{ type: evidence-recorded, config: { name: checks, requireField: { status: failed } } }]",
      `'status' to be "passed" and 'status' to be "failed"`,
    ],
  ];
  for (const [gates, conflict] of cases) {
    const report = guarded(gates);
    assertEquals(codes(report.errors), [
      "gate-never-passes stages.0.transitions.0 [check]",
    ], gates);
    assert(
      report.errors[0].message.includes(
        `evidence-recorded on 'checks' requires ${conflict}, which no payload can hold`,
      ),
      report.errors[0].message,
    );
  }
});

Deno.test("graph: requireField entries that can all hold do not block", () => {
  for (
    const gates of [
      "[{ type: evidence-recorded, config: { name: checks, requireField: { a: { b: 1 }, a.b: 1 } } }]",
      // Different evidence, different payloads.
      "[{ type: evidence-recorded, config: { name: checks, requireField: { status: passed } } }, " +
      "{ type: evidence-recorded, config: { name: other, requireField: { status: failed } } }]",
    ]
  ) {
    assertEquals(guarded(gates).errors, [], gates);
  }
});

Deno.test("graph: a global transition that contradicts itself gives a finding per stage", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    evidence: [{ name: blocked, schema: ${OBJECT} }]
    transitions: [{ name: next, to: b }]
  - id: b
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
  - id: parked
    terminal: true
globalTransitions:
  - name: park
    to: parked
    gates:
      - type: evidence-recorded
        config: { name: blocked, requireField: { reason: { code: 1 }, reason.code: 2 } }
`));
  assertEquals(codes(report.errors), [
    "gate-never-passes globalTransitions.0 [a]",
    "gate-never-passes globalTransitions.0 [b]",
    "unreachable-stage stages.3 [parked]",
  ]);
  // The contradiction holds from every stage, alongside any other reason.
  for (const finding of report.errors.slice(0, 2)) {
    assert(
      finding.message.includes(
        `'reason' to be {"code":1} and 'reason.code' to be 2`,
      ),
      finding.message,
    );
  }
  assert(report.errors[1].message.includes("which stage 'b' does not record"));
});

// --- global transitions ------------------------------------------------------

Deno.test("graph: a global transition that fails from two stages gives a finding per stage", () => {
  const report = analyzeLifecycle(lifecycle(`
stages:
  - id: a
    initial: true
    transitions: [{ name: next, to: b }]
  - id: b
    transitions: [{ name: next, to: c }]
  - id: c
    evidence: [{ name: blocked, schema: ${OBJECT} }]
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
  - id: parked
    terminal: true
globalTransitions:
  - name: park
    to: parked
    gates:
      - type: evidence-recorded
        config: { name: blocked }
      - type: human-approval
        config: { id: park }
`));
  assertEquals(codes(report.errors), [
    "gate-never-passes globalTransitions.0 [a]",
    "gate-never-passes globalTransitions.0 [b]",
  ]);
  assertEquals(
    formatFinding(report.errors[1]).split(":")[0],
    "globalTransitions.0 (from stage 'b')",
  );
});

// --- plugins --------------------------------------------------------------------

Deno.test("graph: a plugin exit no passable transition takes is an error", () => {
  const report = analyzeLifecycle(plugin(`
contract:
  inputs: [{ kind: artifact, name: plan }]
  exits: [{ name: approved }, { name: rework }]
stages:
  - id: review
    initial: true
    work:
      mode: interactive
      context: { inject: [plan] }
    transitions:
      - name: approve
        exit: approved
        gates:
          - type: artifact-exists
            config: { artifact: plan }
      - name: rework
        exit: rework
        gates:
          - type: evidence-recorded
            config: { name: elsewhere }
  - id: other
    evidence: [{ name: elsewhere, schema: ${OBJECT} }]
    transitions: [{ name: out, exit: approved }]
`));
  assertEquals(codes(report.errors), [
    "exit-unreachable contract.exits.1",
    "gate-never-passes stages.0.transitions.1 [review]",
    "unreachable-stage stages.1 [other]",
  ]);
});

// --- products on entry -------------------------------------------------------------

Deno.test("productsMissingOnEntry: the shortest path into a stage without each product", () => {
  const doc = lifecycle(`
stages:
  - id: start
    initial: true
    transitions:
      - { name: long, to: write, manual: true }
      - { name: short, to: use, manual: true }
  - id: write
    artifacts: [{ name: draft, schema: ${OBJECT} }]
    evidence: [{ name: ci, schema: ${OBJECT} }]
    transitions: [{ name: next, to: use }]
  - id: use
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
`);
  assertEquals(
    productsMissingOnEntry(doc, "use", [
      { kind: "artifact", name: "draft" },
      { kind: "evidence", name: "ci" },
    ]),
    {
      missing: [
        { kind: "artifact", name: "draft", trace: ["start", "use"] },
        { kind: "evidence", name: "ci", trace: ["start", "use"] },
      ],
      truncated: false,
    },
  );
  assertEquals(
    productsMissingOnEntry(doc, "done", [{ kind: "artifact", name: "draft" }])
      .missing.map((m) => m.trace),
    [["start", "use", "done"]],
  );
  assertEquals(
    productsMissingOnEntry(doc, "write", [{ kind: "artifact", name: "draft" }])
      .missing,
    [],
  );
});

// --- truncation -----------------------------------------------------------------

Deno.test("graph: a truncated exploration demotes its errors to warnings", () => {
  const doc = lifecycle(`
stages:
  - id: a
    initial: true
    transitions: [{ name: next, to: b }]
  - id: b
    transitions: [{ name: finish, to: done }]
  - id: done
    terminal: true
`);
  assertEquals(analyzeLifecycle(doc).errors, []);
  const report = analyzeLifecycle(doc, { maxStates: 1 });
  assert(report.truncated);
  assertEquals(report.errors, []);
  assertEquals(codes(report.warnings), [
    "exploration-truncated (root)",
    "exploration-truncated (root)",
    "dead-end stages.0 [a]",
    "unreachable-stage stages.1 [b]",
    "unreachable-stage stages.2 [done]",
  ]);
  assert(
    report.warnings.every((w) =>
      w.code === "exploration-truncated" ||
      w.message.includes("exploration was incomplete")
    ),
  );
});

// --- the fixtures --------------------------------------------------------------

const TESTDATA = new URL("../../../testdata/", import.meta.url);

async function fixtures(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(new URL(dir, TESTDATA))) {
    if (entry.isFile && entry.name.endsWith(".yaml")) files.push(entry.name);
  }
  return files.sort();
}

Deno.test("graph: every testdata fixture has no errors and only the explained warnings", async () => {
  // The ported software-factory examples loop plan <-> review and
  // implement <-> test without maxCycles, as the originals did: they rely on
  // the default cycle limit, which is the warning, not a defect.
  const expected: Record<string, string[]> = {
    // The placeholder's two ungated transitions only sketch where the
    // plugin's exits go; eject replaces them with the plugin's own.
    "lifecycles/eject-target.yaml": [
      "ambiguous-exit stages.1.transitions.0 [review]",
    ],
    "lifecycles/feature-factory.yaml": [
      "default-cycle-bound stages.0 [planning]",
      "default-cycle-bound stages.2 [implementing]",
    ],
    "lifecycles/minimal.yaml": [],
    "lifecycles/retry-feedback.yaml": [],
    "lifecycles/sdlc-classic.yaml": [
      "default-cycle-bound stages.0 [planning]",
      "default-cycle-bound stages.2 [implementing]",
    ],
    "plugins/review-plan.yaml": [],
  };
  const seen: string[] = [];
  for (const dir of ["lifecycles/", "plugins/"]) {
    for (const file of await fixtures(dir)) {
      const name = `${dir}${file}`;
      seen.push(name);
      const raw = parseYaml(await Deno.readTextFile(new URL(name, TESTDATA)));
      // A plugin is analysed with its parameters' defaults filled in.
      const parsed = dir === "plugins/"
        ? instantiatePlugin(raw)
        : parseLifecycle(raw);
      if (!parsed.ok) throw new Error(`${name}: ${parsed.errors.join("\n")}`);
      const report = analyzeLifecycle(
        "plugin" in parsed ? parsed.plugin : parsed.value,
      );
      assertEquals(codes(report.errors), [], name);
      assertEquals(codes(report.warnings), expected[name], name);
    }
  }
  assertEquals(seen, Object.keys(expected));
});
