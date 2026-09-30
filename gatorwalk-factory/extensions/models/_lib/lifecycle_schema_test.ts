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
  type Lifecycle,
  parseLifecycle,
  transitionsFrom,
} from "./lifecycle_schema.ts";

const TESTDATA = new URL("../../../testdata/", import.meta.url);

async function fixture(path: string): Promise<unknown> {
  return parseYaml(await Deno.readTextFile(new URL(path, TESTDATA)));
}

type Raw = Record<string, unknown>;

/** A valid two-stage lifecycle to mutate in each test. */
function base(): Raw {
  return {
    schemaVersion: 1,
    name: "t",
    stages: [
      {
        id: "work",
        initial: true,
        work: { mode: "interactive" },
        artifacts: [{
          name: "summary",
          schema: { type: "object", properties: { text: { type: "string" } } },
        }],
        transitions: [{
          name: "finish",
          to: "done",
          gates: [{ type: "artifact-exists", config: { artifact: "summary" } }],
        }],
      },
      { id: "done", terminal: true },
    ],
  };
}

/** The container at a dotted path; numeric segments index arrays. */
function containerAt(doc: unknown, segments: string[]): Raw | unknown[] {
  let node = doc;
  for (const segment of segments) {
    if (Array.isArray(node)) node = node[Number(segment)];
    else if (node !== null && typeof node === "object") {
      node = (node as Raw)[segment];
    } else throw new Error(`no container at '${segment}'`);
  }
  if (node === null || typeof node !== "object") {
    throw new Error(`no container at '${segments.join(".")}'`);
  }
  return node as Raw | unknown[];
}

function set(doc: unknown, path: string, value: unknown): void {
  const segments = path.split(".");
  const key = segments.pop() as string;
  const parent = containerAt(doc, segments);
  if (Array.isArray(parent)) parent[Number(key)] = value;
  else parent[key] = value;
}

function del(doc: unknown, path: string): void {
  const segments = path.split(".");
  const key = segments.pop() as string;
  const parent = containerAt(doc, segments);
  if (Array.isArray(parent)) parent.splice(Number(key), 1);
  else delete parent[key];
}

function push(doc: unknown, path: string, value: unknown): void {
  const target = containerAt(doc, path.split("."));
  if (!Array.isArray(target)) throw new Error(`'${path}' is not an array`);
  target.push(value);
}

function errorsOf(raw: unknown): string[] {
  const result = parseLifecycle(raw);
  return result.ok ? [] : result.errors;
}

function assertValid(raw: unknown) {
  assertEquals(errorsOf(raw), []);
}

function assertRejects(raw: unknown, ...needles: string[]) {
  const errors = errorsOf(raw);
  assert(errors.length > 0, "expected the lifecycle to be rejected");
  for (const needle of needles) {
    assert(
      errors.some((e) => e.includes(needle)),
      `expected an error mentioning ${JSON.stringify(needle)}; got:\n${
        errors.join("\n")
      }`,
    );
  }
}

// --- the ported examples ---------------------------------------------------

for (
  const name of [
    "retry-feedback",
    "feature-factory",
    "sdlc-classic",
  ]
) {
  Deno.test(`fixture: software-factory's ${name} example ports cleanly`, async () => {
    assertValid(await fixture(`lifecycles/${name}.yaml`));
  });
}

Deno.test("base lifecycle is valid", () => assertValid(base()));

// --- document ----------------------------------------------------------------

Deno.test("document: schemaVersion and name are required", () => {
  const doc = base();
  del(doc, "schemaVersion");
  del(doc, "name");
  assertRejects(doc, "schemaVersion:", "name:");
});

Deno.test("document: several problems are reported together, with paths", () => {
  const doc = base();
  set(doc, "stages.0.transitions.0.to", "nowhere");
  set(doc, "stages.0.artifacts.0.schema.requried", ["text"]);
  set(doc, "stages.0.work.systemPrompt", "Summarise ${{ item.key }}");
  assertRejects(
    doc,
    "stages.0.transitions.0.to: targets unknown stage 'nowhere'",
    "stages.0.artifacts.0.schema.requried: unknown JSON Schema keyword",
    "stages.0.work.systemPrompt: contains ${{ }}",
  );
});

// --- CEL -------------------------------------------------------------------

Deno.test("cel: bindings and gate expressions are bare, valid CEL", () => {
  const doc = base();
  set(doc, "stages.0.work.bindings", { ticket: "${{ item.key }}" });
  push(doc, "stages.0.transitions.0.gates", {
    type: "cel",
    config: { expr: "size(artifacts[" },
  });
  const errors = errorsOf(doc);
  assert(
    errors.some((e) =>
      e.startsWith("stages.0.work.bindings.ticket: write bare CEL")
    ),
  );
  assert(
    errors.some((e) =>
      e.startsWith("stages.0.transitions.0.gates.1.config.expr: not valid CEL")
    ),
  );
  // The ${{ }} scan does not double-report CEL fields.
  assertEquals(errors.filter((e) => e.includes("contains ${{")).length, 0);
});

Deno.test("cel: a human-approval gate's when is bare, valid CEL", () => {
  const valid = base();
  push(valid, "stages.0.transitions.0.gates", {
    type: "human-approval",
    config: { id: "review", when: 'item.key == "a"' },
  });
  assertEquals(errorsOf(valid), []);

  const doc = base();
  push(doc, "stages.0.transitions.0.gates", {
    type: "human-approval",
    config: { id: "review", when: "size(artifacts[" },
  });
  set(doc, "globalTransitions", [{
    name: "abandon",
    to: "done",
    gates: [{
      type: "human-approval",
      config: { id: "sure", when: "${{ item.key }}" },
    }],
  }]);
  const errors = errorsOf(doc);
  assert(
    errors.some((e) =>
      e.startsWith("stages.0.transitions.0.gates.1.config.when: not valid CEL")
    ),
    errors.join("\n"),
  );
  assert(
    errors.some((e) =>
      e.startsWith("globalTransitions.0.gates.0.config.when: write bare CEL")
    ),
    errors.join("\n"),
  );
  // when is a CEL position, so the ${{ }} scan does not report it again.
  assertEquals(errors.filter((e) => e.includes("contains ${{")).length, 0);
});

Deno.test("cel: ${{ in a literal input is caught, even under a key named bindings", () => {
  const doc = base();
  set(doc, "stages.0.work", {
    mode: "method",
    method: {
      modelIdOrName: "m",
      methodName: "run",
      inputs: { bindings: { ref: "${{ item.key }}" } },
    },
  });
  assertRejects(
    doc,
    "stages.0.work.method.inputs.bindings.ref: contains ${{ }}",
  );
});

Deno.test("cel: ${{ in user data shaped like a CEL position is caught", () => {
  const doc = base();
  set(doc, "stages.0.work", {
    mode: "method",
    method: {
      modelIdOrName: "m",
      methodName: "run",
      inputs: {
        work: { bindings: { x: "${{ a }}" } },
        config: { expr: "${{ b }}" },
      },
    },
  });
  set(doc, "stages.0.artifacts.0.schema.default", {
    config: { expr: "${{ c }}" },
  });
  set(doc, "stages.0.transitions.0.gates.0", {
    type: "evidence-recorded",
    config: { name: "out", requireField: { expr: "${{ d }}" } },
  });
  set(doc, "stages.0.evidence", [{ name: "out", schema: { type: "object" } }]);
  assertRejects(
    doc,
    "stages.0.work.method.inputs.work.bindings.x: contains ${{ }}",
    "stages.0.work.method.inputs.config.expr: contains ${{ }}",
    "stages.0.artifacts.0.schema.default.config.expr: contains ${{ }}",
    "stages.0.transitions.0.gates.0.config.requireField.expr: contains ${{ }}",
  );
});

Deno.test("cel: a malformed $ref is reported, not thrown", () => {
  const doc = base();
  set(doc, "stages.0.artifacts.0.schema.properties.text", { $ref: "#/%E0" });
  assertRejects(doc, "'#/%E0' does not resolve");
});

Deno.test("cel: a binding may not shadow a literal input", () => {
  const doc = base();
  set(doc, "stages.0.work", {
    mode: "method",
    method: { modelIdOrName: "m", methodName: "run", inputs: { ref: "main" } },
    bindings: { ref: "item.key" },
  });
  assertRejects(
    doc,
    "stages.0.work.bindings.ref: 'ref' is both a literal input and a binding",
  );
});

Deno.test("cel: binding names are identifiers", () => {
  const doc = base();
  set(doc, "stages.0.work.bindings", { "change-url": "item.key" });
  assertRejects(
    doc,
    "stages.0.work.bindings.change-url: a binding name is an identifier",
  );
});

Deno.test("cel: a macro or cel.bind variable may not reuse a context name", () => {
  const doc = base();
  set(doc, "stages.0.work.bindings", {
    a: "[1].exists(artifacts, artifacts > 0)",
    b: "cel.bind(stage, 1, stage + 1)",
    c: "evidence.all(k, v, v != null)",
    d: "[1].map(item, item * 2)",
  });
  push(doc, "stages.0.transitions.0.gates", {
    type: "cel",
    config: { expr: "[[1]].all(validations, validations.size() > 0)" },
  });
  assertRejects(
    doc,
    "stages.0.work.bindings.a: 'artifacts' is a name the CEL context defines (item, stage, artifacts, evidence, validations)",
    "stages.0.work.bindings.b: 'stage' is a name",
    "stages.0.work.bindings.d: 'item' is a name",
    "stages.0.transitions.0.gates.1.config.expr: 'validations' is a name",
  );
  assert(
    !errorsOf(doc).some((e) => e.includes("bindings.c")),
    "the map's own variables k and v are fine",
  );
});

Deno.test("cel: macro variables with other names, and reading the context in a macro, are fine", () => {
  const doc = base();
  set(doc, "stages.0.work.bindings", {
    a: "artifacts.all(k, artifacts[k].version > 0) && [1].exists(x, x > 0)",
    b: "cel.bind(n, artifacts.summary.version, n + 1.0)",
    c: 'stage.id.startsWith("w")',
  });
  assertValid(doc);
});

// --- templates ---------------------------------------------------------------

Deno.test("templates: placeholders must name declared bindings", () => {
  const doc = base();
  set(doc, "stages.0.work.bindings", { changeUrl: "item.key" });
  set(doc, "stages.0.work.systemPrompt", "Review {{changeUrl}}.");
  set(doc, "stages.0.work.command", "/review {{changeURL}}");
  assertRejects(
    doc,
    "stages.0.work.command: {{changeURL}} is not a declared binding",
  );
  set(doc, "stages.0.work.command", "/review {{ changeUrl }}");
  assertValid(doc);
});

Deno.test("templates: literal braces and escapes are allowed", () => {
  const doc = base();
  set(
    doc,
    "stages.0.work.systemPrompt",
    "Helm uses {{ .Values.image }}; write \\{{name}} literally.",
  );
  assertValid(doc);
});

// --- work --------------------------------------------------------------------

Deno.test("work: the mode and its call block agree", () => {
  const doc = base();
  set(doc, "stages.0.work", { mode: "workflow" });
  assertRejects(doc, "mode 'workflow' requires a workflow block");
  set(doc, "stages.0.work", {
    mode: "interactive",
    method: { modelIdOrName: "m", methodName: "run" },
  });
  assertRejects(doc, "a method block needs mode 'method'");
  set(doc, "stages.0.work", {
    mode: "dispatch",
    inputsSchema: { type: "object" },
  });
  assertRejects(doc, "inputsSchema only applies");
});

Deno.test("work: injected context must be declared", () => {
  const doc = base();
  set(doc, "stages.0.work.context", { inject: ["summary", "plan"] });
  assertRejects(
    doc,
    "stages.0.work.context.inject.1: injects 'plan', which is not a declared artifact or evidence",
  );
});

// --- products ------------------------------------------------------------

Deno.test("products: every artifact and evidence has an object schema", () => {
  const doc = base();
  del(doc, "stages.0.artifacts.0.schema");
  set(doc, "stages.0.evidence", [{ name: "pr" }]);
  assertRejects(
    doc,
    "stages.0.artifacts.0.schema: every artifact declares a payload schema",
    "stages.0.evidence.0.schema: every evidence declares a payload schema",
  );
  const arrays = base();
  set(arrays, "stages.0.artifacts.0.schema", { type: "array" });
  assertRejects(arrays, "must declare type: object");
});

Deno.test("products: findings artifacts need no schema, but a closed one must allow findings", () => {
  const doc = base();
  push(doc, "stages.0.artifacts", { name: "review", kind: "findings" });
  assertValid(doc);
  set(doc, "stages.0.artifacts.1.schema", {
    type: "object",
    additionalProperties: false,
    properties: { reviewer: { type: "string" } },
  });
  assertRejects(doc, "rejects its own findings");
});

Deno.test("products: resultEvidence and its own evidence entry are one declaration (#897)", () => {
  const doc = base();
  set(doc, "stages.0.work", {
    mode: "workflow",
    workflow: { name: "@acme/tests" },
    resultEvidence: "test-run",
  });
  assertValid(doc);
  set(doc, "stages.0.evidence", [{ name: "test-run" }]);
  assertValid(doc);
  set(doc, "stages.0.evidence", [{
    name: "test-run",
    schema: { type: "object", required: ["status"] },
  }]);
  assertValid(doc);
});

Deno.test("products: resultEvidence may not reuse another stage's evidence", () => {
  const doc = base();
  set(doc, "stages.0.evidence", [{
    name: "test-run",
    schema: { type: "object" },
  }]);
  set(doc, "stages.1.terminal", false);
  set(doc, "stages.1.work", {
    mode: "workflow",
    workflow: { name: "@acme/tests" },
    resultEvidence: "test-run",
  });
  set(doc, "stages.1.transitions", [{ name: "next", to: "end" }]);
  push(doc, "stages", { id: "end", terminal: true });
  assertRejects(
    doc,
    "stages.1.work.resultEvidence: evidence 'test-run' is declared more than once",
  );
});

Deno.test("products: names are unique per kind", () => {
  const doc = base();
  push(doc, "stages.0.artifacts", {
    name: "summary",
    schema: { type: "object" },
  });
  assertRejects(
    doc,
    "stages.0.artifacts.1.name: artifact 'summary' is declared more than once",
  );
});

Deno.test("products: reviews links resolve and do not loop", () => {
  const doc = base();
  push(doc, "stages.0.artifacts", {
    name: "review",
    kind: "findings",
    reviews: "plan",
  });
  assertRejects(doc, "reviews undeclared artifact 'plan'");
  const loop = base();
  set(loop, "stages.0.artifacts", [
    { name: "a", kind: "findings", reviews: "b" },
    { name: "b", kind: "findings", reviews: "a" },
  ]);
  set(loop, "stages.0.transitions.0.gates", []);
  assertRejects(loop, "reviews chain from 'a' loops through 'a'");
});

Deno.test("products: a name is one kind, across artifacts and evidence", () => {
  const doc = base();
  set(doc, "stages.0.evidence", [{
    name: "summary",
    schema: { type: "object" },
  }]);
  assertRejects(
    doc,
    "stages.0.evidence.0.name: 'summary' names both an artifact and evidence",
  );
  const result = base();
  set(result, "stages.0.work", {
    mode: "workflow",
    workflow: { name: "w" },
    resultEvidence: "summary",
  });
  assertRejects(
    result,
    "stages.0.work.resultEvidence: 'summary' names both an artifact and evidence",
  );
});

// --- stages and transitions ----------------------------------------------

Deno.test("stages: exactly one initial and at least one terminal", () => {
  const doc = base();
  set(doc, "stages.0.initial", false);
  set(doc, "stages.1.terminal", false);
  assertRejects(
    doc,
    "exactly one stage must declare initial: true (found 0)",
    "at least one stage must declare terminal: true",
  );
});

Deno.test("stages: ids are unique; terminal stages have no transitions", () => {
  const doc = base();
  set(doc, "stages.1.transitions", [{ name: "again", to: "work" }]);
  push(doc, "stages", { id: "done", terminal: true });
  assertRejects(
    doc,
    "stages.2.id: duplicate stage id 'done'",
    "terminal stage 'done' cannot have transitions",
  );
});

Deno.test("stages: a non-terminal stage needs a way out", () => {
  const doc = base();
  del(doc, "stages.0.transitions");
  assertRejects(doc, "non-terminal stage 'work' has no way out");
  set(doc, "globalTransitions", [{ name: "abort", to: "done" }]);
  assertValid(doc);
});

Deno.test("transitions: unique per stage, and distinct from global names", () => {
  const doc = base();
  push(doc, "stages.0.transitions", { name: "finish", to: "done" });
  set(doc, "globalTransitions", [{ name: "finish", to: "done" }]);
  assertRejects(
    doc,
    "stages.0.transitions.1.name: duplicate transition 'finish'",
    "stages.0.transitions.0.name: transition 'finish' has the same name as a global transition",
  );
});

Deno.test("transitions: every transition names its target stage in to", () => {
  const doc = base();
  del(doc, "stages.0.transitions.0.to");
  assertRejects(doc, "stages.0.transitions.0.to:");
});

// --- gates -------------------------------------------------------------------

Deno.test("gates: references resolve to declared things of the right kind", () => {
  const doc = base();
  set(doc, "stages.0.transitions.0.gates", [
    { type: "artifact-exists", config: { artifact: "plan" } },
    { type: "artifact-fresh", config: { artifact: "summary" } },
    {
      type: "findings-clear",
      config: { artifact: "summary", blocking: ["high"] },
    },
    { type: "evidence-recorded", config: { name: "pr" } },
    { type: "cooldown", config: { afterEvidence: "pr", seconds: 5 } },
    { type: "max-cycles", config: { stage: "review", limit: 2 } },
    {
      type: "findings-open",
      config: { artifact: "summary", blocking: ["high"] },
    },
  ]);
  assertRejects(
    doc,
    "gates.0.config.artifact: artifact-exists references undeclared artifact 'plan'",
    "gates.1.config.artifact: artifact-fresh on 'summary' requires that artifact to declare reviews",
    "gates.2.config.artifact: findings-clear on 'summary' requires that artifact to be kind: findings",
    "gates.3.config.name: evidence-recorded references undeclared evidence 'pr'",
    "gates.4.config.afterEvidence: cooldown references undeclared evidence 'pr'",
    "gates.5.config.stage: max-cycles references unknown stage 'review'",
    "gates.6.config.artifact: findings-open on 'summary' requires that artifact to be kind: findings",
  );
});

Deno.test("gates: workflow-succeeded is not in the launch library", () => {
  const doc = base();
  set(doc, "stages.0.transitions.0.gates", [{
    type: "workflow-succeeded",
    config: { workflow: "@acme/tests" },
  }]);
  assertRejects(doc, "stages.0.transitions.0.gates.0.type:");
});

// --- lookup ----------------------------------------------------------------

Deno.test("transitionsFrom: stage transitions plus globals; none from terminals", async () => {
  const result = parseLifecycle(
    await fixture("lifecycles/feature-factory.yaml"),
  );
  assert(result.ok);
  const lifecycle: Lifecycle = result.value;
  const review = lifecycle.stages.find((s) => s.id === "plan-review");
  const done = lifecycle.stages.find((s) => s.id === "done");
  assert(review !== undefined && done !== undefined);
  assertEquals(
    transitionsFrom(lifecycle, review).map((t) => t.name),
    ["approve", "rework", "abort"],
  );
  assertEquals(transitionsFrom(lifecycle, done), []);
});

// --- projection hints ----------------------------------------------------------

Deno.test("projection: a stage may name a status key", () => {
  const doc = base();
  set(doc, "stages.0.projection", { status: "in_progress" });
  set(doc, "stages.1.projection", {});
  assertValid(doc);
});

Deno.test("projection: the status key is a name, and nothing else is accepted", () => {
  const doc = base();
  set(doc, "stages.0.projection", { status: "In Progress", comment: false });
  assertRejects(doc, "stages.0.projection.status:", "comment");
});

Deno.test("projection: a stage without one parses without the key, so its digest does not move", () => {
  const result = parseLifecycle(base());
  assert(result.ok);
  assert(result.value.stages.every((s) => !("projection" in s)));
});

/** base() with an approval gate on finish and the given projection entries. */
function withEntries(entries: unknown[]): Raw {
  const doc = base();
  set(doc, "stages.0.transitions.0.gates.1", {
    type: "human-approval",
    config: { id: "sign-off" },
  });
  set(doc, "stages.0.projection", { status: "in_progress", entries });
  return doc;
}

const entry = (extra: Raw): Raw => ({
  step: "noted",
  emoji: "x",
  summary: "Noted",
  ...extra,
});

Deno.test("projection entries: enter, record and approve triggers, with a payload summary and a status label", () => {
  assertValid(withEntries([
    entry({ on: "enter", step: "work_started" }),
    entry({
      on: { record: "summary" },
      summary: "Summary: {{text}}",
      status: "triaged",
      verbose: true,
    }),
    entry({ on: { approve: "sign-off" }, step: "signed_off" }),
  ]));
});

Deno.test("projection entries: a trigger names what its stage has", () => {
  assertRejects(
    withEntries([entry({ on: { record: "elsewhere" } })]),
    "'elsewhere' is not a product stage 'work' declares",
  );
  assertRejects(
    withEntries([entry({ on: { approve: "nobody" } })]),
    "'nobody' is not a human-approval gate on stage 'work'",
  );
});

Deno.test("projection entries: payload fields are the recorded product's own", () => {
  assertRejects(
    withEntries([entry({ on: { record: "summary" }, summary: "{{missing}}" })]),
    "'missing' is not a field of 'summary'",
  );
  assertRejects(
    withEntries([entry({ on: { record: "summary" }, match: { kind: "x" } })]),
    "'kind' is not a field of 'summary'",
  );
  assertRejects(
    withEntries([entry({ on: { record: "summary" }, setsType: "type" })]),
    "'type' is not a field of 'summary'",
  );
});

Deno.test("projection entries: a summary needs fixed text, since an absent field fills as empty", () => {
  assertRejects(
    withEntries([entry({ on: { record: "summary" }, summary: " {{text}} " })]),
    "a summary needs some text besides its {{field}} placeholders",
  );
});

Deno.test("projection entries: a summary placeholder names a scalar field, not an object or a list", () => {
  const doc = withEntries([
    entry({ on: { record: "summary" }, summary: "{{tags}} and {{meta}}" }),
  ]);
  set(doc, "stages.0.artifacts.0.schema.properties.tags", { type: "array" });
  set(doc, "stages.0.artifacts.0.schema.properties.meta", { type: "object" });
  assertRejects(
    doc,
    "{{tags}} is an array field of 'summary'",
    "{{meta}} is an object field of 'summary'",
  );
});

Deno.test("projection entries: enter and approve have no payload to match, fill or read a type from", () => {
  assertRejects(
    withEntries([entry({ on: "enter", summary: "At {{text}}" })]),
    "{{field}} placeholders",
  );
  assertRejects(
    withEntries([entry({ on: "enter", match: { text: "a" } })]),
    "only an entry on a recorded product",
  );
  assertRejects(
    withEntries([entry({ on: { approve: "sign-off" }, setsType: "text" })]),
    "setsType",
  );
});

Deno.test("projection entries: two entries on one trigger must be told apart by cycle or match", () => {
  assertRejects(
    withEntries([
      entry({ on: { record: "summary" }, step: "one" }),
      entry({ on: { record: "summary" }, step: "two" }),
    ]),
    "entries 'one' and 'two' can both answer the same event",
  );
  assertValid(withEntries([
    entry({ on: { record: "summary" }, step: "generated", cycle: "first" }),
    entry({ on: { record: "summary" }, step: "revised", cycle: "later" }),
  ]));
  assertValid(withEntries([
    entry({ on: { record: "summary" }, step: "yes", match: { text: "y" } }),
    entry({ on: { record: "summary" }, step: "no", match: { text: "n" } }),
  ]));
  // Matching different fields does not make them exclusive.
  assertRejects(
    withEntries([
      entry({ on: { record: "summary" }, step: "yes", match: { text: "y" } }),
      entry({ on: { record: "summary" }, step: "other", cycle: "later" }),
    ]),
    "can both answer",
  );
});

Deno.test("projection entries: a step is a lowercase name, and a status label a status key", () => {
  assertRejects(
    withEntries([entry({ on: "enter", step: "Started" })]),
    "step",
  );
  assertRejects(
    withEntries([entry({ on: "enter", status: "In Progress" })]),
    "status",
  );
});

// --- evidence-recorded: match and message -------------------------------------

/** base() with evidence 'out' and one evidence-recorded gate on it. */
function evidenceGate(config: Raw): Raw {
  const doc = base();
  set(doc, "stages.0.evidence", [{ name: "out", schema: { type: "object" } }]);
  set(doc, "stages.0.transitions.0.gates.0", {
    type: "evidence-recorded",
    config: { name: "out", ...config },
  });
  return doc;
}

Deno.test("evidence-recorded: match and message are accepted beside requireField", () => {
  const doc = evidenceGate({
    requireField: { type: "bug" },
    match: { confidence: { enum: ["high", "medium"] }, "a.b": false },
    message: "waits for answers",
  });
  const result = parseLifecycle(doc);
  assert(result.ok, result.ok ? "" : result.errors.join("\n"));
  const gate = result.value.stages[0].transitions![0].gates![0];
  // Compiling a fragment to lint it must not leave marks on the parsed one.
  assertEquals(gate.config, {
    name: "out",
    requireField: { type: "bug" },
    match: { confidence: { enum: ["high", "medium"] }, "a.b": false },
    message: "waits for answers",
  });
  // assertEquals ignores non-enumerable keys, which compiling adds.
  const match = gate.type === "evidence-recorded" ? gate.config.match : {};
  assertEquals(Reflect.ownKeys(match?.confidence as object), ["enum"]);
});

Deno.test("payload schemas: a parsed lifecycle parses again (#2704)", () => {
  const doc = base();
  set(doc, "stages.0.evidence", [{
    name: "out",
    schema: {
      type: "object",
      properties: {
        run: { type: "object", properties: { ok: { type: "boolean" } } },
      },
    },
  }]);
  const first = parseLifecycle(doc);
  assert(first.ok, first.ok ? "" : first.errors.join("\n"));
  // assertEquals ignores non-enumerable keys, which compiling adds.
  const schema = first.value.stages[0].evidence![0].schema!;
  assertEquals(Reflect.ownKeys(schema), ["type", "properties"]);
  const run = (schema.properties as Raw).run as object;
  assertEquals(Reflect.ownKeys(run), ["type", "properties"]);
  const second = parseLifecycle(first.value);
  assert(second.ok, second.ok ? "" : second.errors.join("\n"));
});

Deno.test("evidence-recorded: a bad match fragment is refused at its path", () => {
  assertRejects(
    evidenceGate({ match: { status: { enmu: ["x"] } } }),
    "stages.0.transitions.0.gates.0.config.match.status.enmu: unknown JSON Schema keyword 'enmu'",
  );
  assertRejects(
    evidenceGate({ match: { status: { not: { $ref: "#" } } } }),
    "stages.0.transitions.0.gates.0.config.match.status.not.$ref: $ref is not supported in a field schema",
  );
  assertRejects(
    evidenceGate({ match: { status: "x" } }),
    "config.match.status",
  );
  // A computed key: a literal "__proto__" key sets the prototype.
  assertRejects(
    evidenceGate({ match: { ["__proto__"]: { const: 1 } } }),
    "match cannot name '__proto__'",
  );
});
