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
import { buildCelContext } from "./cel_context.ts";
import { buildDispatch, buildSubagentPrompts } from "./dispatch.ts";
import {
  DEFINITION_SCHEMA_VERSION,
  findStage,
  parseDefinition,
} from "./definition_schema.ts";
import { FINDINGS_SCHEMA, OUTCOME_SCHEMA } from "./payload_schema.ts";
import {
  advance,
  expectedOf,
  recordCheckpoint,
  recordDispatch,
  start,
} from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  startRun,
  update,
} from "./run_store.ts";
import {
  ALICE,
  expectNow,
  PASS,
  smallDefinition,
  TEST_TRACKER,
  testEnv,
} from "./test_support.ts";

const DEFINITION = smallDefinition();

async function atReview(text: string) {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    {
      key: "wi-9",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text },
    ALICE,
    env,
  );
  await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "submit" },
        PASS,
        ALICE,
        env,
      ),
  );
  const run = await loadRun(store);
  if (run === null) throw new Error("not started");
  return { run, context: await buildCelContext(run, store) };
}

Deno.test("dispatch: an interactive stage gets its prompt rendered from let values", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    {
      key: "wi-9",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const run = await loadRun(store);
  assert(run !== null);
  const packet = buildDispatch(
    DEFINITION,
    run,
    await buildCelContext(run, store),
  );
  assertEquals(packet.prompt, "Write about wi-9.");
  assertEquals(packet.values, { topic: "wi-9" });
  assertEquals(packet.subagents, 0);
  assertEquals(packet.inputs, undefined);
  assert(packet.ready);
});

Deno.test("dispatch: a workflow stage merges literal inputs with passed let values and checks inputsSchema", async () => {
  const { run, context } = await atReview("long enough");
  const packet = buildDispatch(DEFINITION, run, context);
  assertEquals(packet.workflow, "@acme/tests");
  assertEquals(packet.inputs, { suite: "all", text: "long enough" });
  assertEquals(packet.problems, []);
  assert(packet.ready);

  const short = await atReview("no");
  const invalid = buildDispatch(DEFINITION, short.run, short.context);
  assert(!invalid.ready);
  assert(
    invalid.problems.some((p) => p.startsWith("inputs: text:")),
    invalid.problems.join(),
  );
});

Deno.test("dispatch: a failing let value and its unfilled placeholder are reported, not thrown", async () => {
  const definition = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "review",
        initial: true,
        // Declared, so the definition is valid, but never recorded: the
        // let value fails when the stage is dispatched.
        artifacts: [{ name: "plan", schema: { type: "object" } }],
        work: {
          mode: "dispatch",
          systemPrompt: "Review {{plan}}.",
          let: { plan: 'artifacts["plan"].payload.summary' },
        },
        transitions: [{ name: "done", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  });
  assert(definition.ok);
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    definition.value,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:r",
    },
    ALICE,
    env,
  );
  const run = await loadRun(store);
  assert(run !== null);
  const packet = buildDispatch(
    definition.value,
    run,
    await buildCelContext(run, store),
  );
  assert(!packet.ready);
  assertEquals(packet.prompt, undefined);
  assert(
    packet.problems.some((p) => p.startsWith("let 'plan'")),
    packet.problems.join(),
  );
  assert(packet.problems.some((p) => p.includes("{{plan}} has no value")));
  // A dispatch stage with no skills runs one reviewer.
  assertEquals(packet.subagents, 1);
});

Deno.test("dispatch: a let value whose value has no JSON form is reported as a problem", async () => {
  const definition = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "work",
        initial: true,
        work: { mode: "interactive", let: { raw: "b'ab'" } },
        transitions: [{ name: "done", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  });
  assert(definition.ok);
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    definition.value,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:b",
    },
    ALICE,
    env,
  );
  const run = await loadRun(store);
  assert(run !== null);
  const packet = buildDispatch(
    definition.value,
    run,
    await buildCelContext(run, store),
  );
  assert(!packet.ready);
  assert(
    packet.problems.some((p) =>
      p.includes("let 'raw'") && p.includes("no JSON form")
    ),
    packet.problems.join(),
  );
});

Deno.test("dispatch: no description reaches whoever does the work, in any mode", async () => {
  // Descriptions are for the factory definition's authors (the studio). Each
  // carries a marker; none may appear in a packet, which is what the agent
  // reads and what recordDispatch stores.
  const marker = (where: string) => `DESCRIPTION-MARKER-${where}`;
  const calls = {
    interactive: {},
    dispatch: { skills: ["review"] },
    workflow: { workflow: { name: "@acme/tests", inputs: { suite: "all" } } },
    method: {
      method: { modelIdOrName: "m", methodName: "run", inputs: { n: 1 } },
    },
  } as const;
  for (const [mode, call] of Object.entries(calls)) {
    const definition = parseDefinition({
      schemaVersion: DEFINITION_SCHEMA_VERSION,
      description: marker("definition"),
      stages: [
        {
          id: "work",
          initial: true,
          description: marker("stage"),
          work: {
            mode,
            description: marker("work"),
            systemPrompt: "Do {{what}}.",
            command: "run {{what}}",
            constraints: "Stay small.",
            let: { what: "item.key" },
            ...call,
          },
          artifacts: [{
            name: "summary",
            description: marker("artifact"),
            schema: {
              type: "object",
              description: marker("schema"),
              $comment: marker("schema-comment"),
              properties: {
                text: { type: "string", description: marker("property") },
              },
            },
          }],
          evidence: [{
            name: "pr",
            description: marker("evidence"),
            schema: { type: "object" },
          }],
          transitions: [{
            name: "finish",
            to: "done",
            description: marker("transition"),
            gates: [{
              type: "artifact-exists",
              description: marker("gate"),
              config: { artifact: "summary" },
            }],
          }],
        },
        { id: "done", terminal: true, description: marker("terminal") },
      ],
      globalTransitions: [{
        name: "abort",
        to: "done",
        description: marker("global"),
      }],
    });
    if (!definition.ok) throw new Error(definition.errors.join("\n"));
    const store = memoryStore();
    await startRun(
      store,
      definition.value,
      {
        key: "wi-1",
        tracker: TEST_TRACKER,
        factory: "team",
        definitionDigest: "sha256:d",
      },
      ALICE,
      testEnv(),
    );
    const run = await loadRun(store);
    assert(run !== null);
    const packet = buildDispatch(
      definition.value,
      run,
      await buildCelContext(run, store),
    );
    assertEquals(packet.mode, mode);
    assert(packet.ready, packet.problems.join());
    assertEquals(packet.prompt, "Do wi-1.");
    assert(
      !JSON.stringify(packet).includes("DESCRIPTION-MARKER"),
      `${mode}: ${JSON.stringify(packet)}`,
    );
  }
});

const REVIEWING = (() => {
  const parsed = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "draft",
        initial: true,
        artifacts: [{
          name: "plan",
          schema: {
            type: "object",
            required: ["summary"],
            properties: { summary: { type: "string" } },
          },
        }],
        transitions: [{ name: "submit", to: "review" }],
      },
      {
        id: "review",
        work: {
          mode: "dispatch",
          skills: ["code-review", "security-review"],
          systemPrompt: "Review {{plan}}.\n",
          let: { plan: 'artifacts["plan"].payload.summary' },
          context: { inject: ["plan"] },
        },
        artifacts: [{ name: "plan-review", kind: "findings", reviews: "plan" }],
        evidence: [{
          name: "plan-feedback",
          recordedBy: "person",
          schema: {
            type: "object",
            required: ["feedback"],
            properties: { feedback: { type: "string" } },
          },
        }],
        transitions: [{ name: "done", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  });
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  return parsed.value;
})();

async function reviewingPacket() {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    REVIEWING,
    {
      key: "wi-3",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:r",
    },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    REVIEWING,
    await expectNow(store),
    "artifact",
    "plan",
    { summary: "Add a list method" },
    ALICE,
    env,
  );
  await update(
    store,
    (run) =>
      advance(
        run,
        REVIEWING,
        expectedOf(run),
        { transition: "submit" },
        PASS,
        ALICE,
        env,
      ),
  );
  const run = await loadRun(store);
  if (run === null) throw new Error("not started");
  return buildDispatch(REVIEWING, run, await buildCelContext(run, store));
}

Deno.test("dispatch: the packet names a declared artifact and evidence with their schemas", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  const run = await loadRun(store);
  assert(run !== null);
  const packet = buildDispatch(
    DEFINITION,
    run,
    await buildCelContext(run, store),
  );
  const write = findStage(DEFINITION, "write");
  assertEquals(packet.products, [
    {
      kind: "artifact",
      name: "summary",
      schema: write?.artifacts?.[0].schema!,
    },
    { kind: "evidence", name: "pr", schema: write?.evidence?.[0].schema! },
  ]);
});

Deno.test("dispatch: a findings artifact shows the findings contract and what it reviews", async () => {
  const packet = await reviewingPacket();
  assertEquals(packet.products, [
    {
      kind: "artifact",
      name: "plan-review",
      reviews: "plan",
      schema: FINDINGS_SCHEMA,
    },
  ]);
});

Deno.test("dispatch: a workflow stage shows the outcome contract for its result evidence", async () => {
  const { run, context } = await atReview("long enough");
  const packet = buildDispatch(DEFINITION, run, context);
  assertEquals(packet.products, [
    { kind: "evidence", name: "test-run", schema: OUTCOME_SCHEMA },
  ]);
});

Deno.test("dispatch: each subagent's prompt starts with the rendered prompt and carries its whole contract", async () => {
  const packet = await reviewingPacket();
  assert(packet.ready, packet.problems.join());
  const prompts = buildSubagentPrompts(REVIEWING, packet, {
    key: "wi-3",
    dispatchId: 4,
    resultDir: "/scratch/",
  });
  assertEquals(prompts.map((p) => [p.skill, p.resultPaths]), [
    ["code-review", { "plan-review": "/scratch/wi-3-d4-1-plan-review.json" }],
    [
      "security-review",
      { "plan-review": "/scratch/wi-3-d4-2-plan-review.json" },
    ],
  ]);
  for (const [i, { prompt, skill }] of prompts.entries()) {
    assert(prompt.startsWith(packet.prompt ?? "-"), prompt);
    assert(prompt.includes(`Follow the ${skill} skill.`), prompt);
    assert(
      prompt.includes(
        `- plan: swamp data query 'modelName == "wi-3" && ` +
          `name == "artifact-plan"' --select content --single --json`,
      ),
      prompt,
    );
    assert(
      prompt.includes(
        "Each command prints\nthe product's payload as one JSON object. " +
          "If it exits non-zero\nwith an error (the record is missing or " +
          "not alone), stop and\nreport that; never guess the product.",
      ),
      prompt,
    );
    assert(
      prompt.includes(
        `- artifact plan-review: write it to /scratch/wi-3-d4-${
          i + 1
        }-plan-review.json`,
      ),
      prompt,
    );
    assert(prompt.includes('"severity"'), "the findings schema is inline");
  }
  // Two reviewers join into one findings record, so their ids are kept apart.
  assert(prompts[0].prompt.includes("Start every finding id with S1-"));
  assert(prompts[1].prompt.includes("Start every finding id with S2-"));
});

Deno.test("dispatch: evidence a person records is not the work's: no product, no result file", async () => {
  const packet = await reviewingPacket();
  assertEquals(packet.products.map((p) => p.name), ["plan-review"]);
  const prompts = buildSubagentPrompts(REVIEWING, packet, {
    key: "wi-3",
    dispatchId: 4,
    resultDir: "/scratch",
  });
  for (const { prompt, resultPaths } of prompts) {
    assertEquals(Object.keys(resultPaths), ["plan-review"]);
    assert(!prompt.includes("plan-feedback"), prompt);
  }
});

Deno.test("dispatch: only a dispatch stage gets subagent prompts", async () => {
  const { run, context } = await atReview("long enough");
  const packet = buildDispatch(DEFINITION, run, context);
  assertEquals(
    buildSubagentPrompts(DEFINITION, packet, {
      key: "wi-9",
      dispatchId: 1,
      resultDir: "/tmp",
    }),
    [],
  );
});

// --- the _stagecraft input and resuming (swamp-club #3144) ----------------------

/** The minimal inputsSchema authoring.md shows: it declares only
 * _stagecraft, so every other input stays unchecked. */
const STAGECRAFT_INPUTS_SCHEMA = {
  type: "object",
  properties: {
    _stagecraft: {
      type: "object",
      required: ["workItem", "dispatchId", "resume"],
      properties: {
        workItem: { type: "string" },
        dispatchId: { type: "integer" },
        resume: { type: ["object", "null"] },
      },
    },
  },
};

function methodStage(work: Record<string, unknown> = {}, mode = "method") {
  const result = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "work",
        initial: true,
        work: mode === "method"
          ? {
            mode,
            method: {
              modelIdOrName: "agent",
              methodName: "run",
              inputs: { task: "build" },
            },
            ...work,
          }
          : { mode, systemPrompt: "Do the work.", ...work },
        transitions: [{ name: "done", to: "end" }],
      },
      { id: "end", terminal: true },
    ],
  });
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

async function packetFor(
  definition: ReturnType<typeof methodStage>,
  prepare: (run: RunRecord) => RunRecord = (run) => run,
) {
  const env = testEnv();
  const run = prepare(
    start(
      definition,
      {
        key: "wi-7",
        tracker: TEST_TRACKER,
        factory: "team",
        definitionDigest: "sha256:m",
      },
      ALICE,
      env,
    ),
  );
  return buildDispatch(
    definition,
    run,
    await buildCelContext(run, memoryStore()),
  );
}

Deno.test("dispatch: the packet names the work item, the next dispatch id and the checkpoint to resume from", async () => {
  const packet = await packetFor(methodStage());
  assertEquals(packet.workItem, "wi-7");
  assertEquals(packet.dispatchId, 1);
  assertEquals(packet.resume, null);
  // Without a declaration, no input is added.
  assertEquals(packet.inputs, { task: "build" });
  assert(packet.ready);
});

Deno.test("dispatch: a stage whose inputsSchema declares _stagecraft gets it filled", async () => {
  const packet = await packetFor(
    methodStage({ inputsSchema: STAGECRAFT_INPUTS_SCHEMA }),
  );
  assertEquals(packet.inputs, {
    task: "build",
    _stagecraft: { workItem: "wi-7", dispatchId: 1, resume: null },
  });
  assertEquals(packet.problems, []);
  assert(packet.ready);
});

Deno.test("dispatch: a strict inputsSchema that does not declare _stagecraft is left as it was", async () => {
  const packet = await packetFor(methodStage({
    inputsSchema: {
      type: "object",
      additionalProperties: false,
      properties: { task: { type: "string" } },
    },
  }));
  assertEquals(packet.inputs, { task: "build" });
  assert(packet.ready, packet.problems.join());
});

Deno.test("dispatch: a _stagecraft the definition supplies itself is not replaced", async () => {
  const packet = await packetFor(methodStage({
    inputsSchema: STAGECRAFT_INPUTS_SCHEMA,
    method: {
      modelIdOrName: "agent",
      methodName: "run",
      inputs: { _stagecraft: "mine" },
    },
  }));
  assertEquals(packet.inputs?._stagecraft, "mine");
  assert(!packet.ready);
});

Deno.test("dispatch: a declared _stagecraft shape the engine's value does not meet is a packet problem", async () => {
  const packet = await packetFor(methodStage({
    inputsSchema: {
      type: "object",
      properties: { _stagecraft: { type: "string" } },
    },
  }));
  assert(!packet.ready);
  assert(
    packet.problems.some((p) => p.startsWith("inputs: _stagecraft")),
    packet.problems.join(),
  );
});

Deno.test("dispatch: the next dispatch resumes from the latest checkpoint, pinned to its version", async () => {
  const definition = methodStage({ inputsSchema: STAGECRAFT_INPUTS_SCHEMA });
  const env = testEnv();
  const packet = await packetFor(definition, (run) => {
    const first = recordDispatch(
      run,
      definition,
      expectedOf(run),
      { inputs: {} },
      ALICE,
      env,
    );
    assert(first.ok);
    const saved = recordCheckpoint(
      first.run,
      1,
      { version: 3, digest: "sha256:cp" },
      ALICE,
      env,
    );
    assert(saved.ok);
    return saved.run;
  });
  const resume = {
    fromDispatch: 1,
    version: 3,
    digest: "sha256:cp",
    read: `swamp data query 'modelName == "wi-7" && ` +
      `name == "checkpoint-d1" && version == 3' --select content ` +
      "--single --json",
  };
  assertEquals(packet.dispatchId, 2);
  assertEquals(packet.resume, resume);
  assertEquals(packet.inputs?._stagecraft, {
    workItem: "wi-7",
    dispatchId: 2,
    resume,
  });
});

Deno.test("dispatch: a subagent prompt carries the checkpoint read only when there is one", async () => {
  const definition = methodStage({}, "dispatch");
  const env = testEnv();
  const fresh = await packetFor(definition);
  const [plain] = buildSubagentPrompts(definition, fresh, {
    key: "wi-7",
    dispatchId: 1,
    resultDir: "/tmp/r",
  });
  assert(!plain.prompt.includes("checkpoint"));
  const resumed = await packetFor(definition, (run) => {
    const first = recordDispatch(
      run,
      definition,
      expectedOf(run),
      { inputs: {} },
      ALICE,
      env,
    );
    assert(first.ok);
    const saved = recordCheckpoint(
      first.run,
      1,
      { version: 1, digest: "sha256:cp" },
      ALICE,
      env,
    );
    assert(saved.ok);
    return saved.run;
  });
  const [prompt] = buildSubagentPrompts(definition, resumed, {
    key: "wi-7",
    dispatchId: 2,
    resultDir: "/tmp/r",
  });
  assert(prompt.prompt.includes(resumed.resume!.read), prompt.prompt);
  assert(prompt.prompt.startsWith("Do the work.\n\n---\n\n"));
});

// --- a call's target and its inputs (#3190) --------------------------------

/** The packet for a one-stage definition whose work is `work`, dispatched
 * on work item `key`. */
async function packetForWork(work: Record<string, unknown>, key = "wi-7") {
  const definition = parseDefinition({
    schemaVersion: DEFINITION_SCHEMA_VERSION,
    stages: [
      {
        id: "work",
        initial: true,
        work,
        transitions: [{ name: "done", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  });
  if (!definition.ok) throw new Error(definition.errors.join("\n"));
  const store = memoryStore();
  await startRun(
    store,
    definition.value,
    {
      key,
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:t",
    },
    ALICE,
    testEnv(),
  );
  const run = await loadRun(store);
  if (run === null) throw new Error("not started");
  return buildDispatch(
    definition.value,
    run,
    await buildCelContext(run, store),
  );
}

Deno.test("dispatch: a method stage's model is filled from let values", async () => {
  const packet = await packetForWork({
    mode: "method",
    method: { modelIdOrName: "agent-{{workItem}}", methodName: "generate" },
    let: { workItem: "item.key" },
  });
  assertEquals(packet.problems, []);
  assertEquals(packet.method, {
    modelIdOrName: "agent-wi-7",
    methodName: "generate",
  });
  // Not passed, so not sent: swamp refuses an input a method does not declare.
  assertEquals(packet.inputs, {});
  assertEquals(packet.values, { workItem: "wi-7" });
});

Deno.test("dispatch: a workflow stage's name is filled from let values", async () => {
  const packet = await packetForWork({
    mode: "workflow",
    workflow: { name: "@acme/{{suite}}" },
    let: { suite: "'smoke'" },
  });
  assertEquals(packet.problems, []);
  assertEquals(packet.workflow, "@acme/smoke");
});

Deno.test("dispatch: a target value that is not a non-empty string fails the dispatch", async () => {
  for (
    const [expr, words] of [
      ["null", "null"],
      ["''", "an empty string"],
      ["7", "number 7"],
      ["{'a': 1}", "an object"],
      ["[1]", "a list"],
    ]
  ) {
    const packet = await packetForWork({
      mode: "method",
      method: { modelIdOrName: "agent-{{who}}", methodName: "run" },
      let: { who: expr },
    });
    assert(!packet.ready, expr);
    assertEquals(packet.method, undefined, expr);
    assertEquals(
      packet.problems,
      [
        `method.modelIdOrName placeholder {{who}} needs a non-empty string, not ${words}`,
      ],
      expr,
    );
  }
});

Deno.test("dispatch: a let value that fails is reported once, not again for the target", async () => {
  const packet = await packetForWork({
    mode: "method",
    method: { modelIdOrName: "agent-{{who}}", methodName: "run" },
    let: { who: "item.nothing.deeper" },
  });
  assert(!packet.ready);
  assertEquals(packet.problems.length, 1, packet.problems.join("\n"));
  assert(packet.problems[0].startsWith("let 'who'"), packet.problems[0]);
});

Deno.test("dispatch: a filled target must be a name swamp would create", async () => {
  for (
    const [value, rule] of [
      ["two words", "lowercase alphanumeric"],
      ["line\nbreak", "lowercase alphanumeric"],
      ["Upper", "lowercase alphanumeric"],
      ["-flag", "lowercase alphanumeric"],
      ["a/b", "path traversal"],
    ]
  ) {
    const method = await packetForWork({
      mode: "method",
      method: { modelIdOrName: "{{who}}", methodName: "run" },
      let: { who: JSON.stringify(value) },
    });
    assert(!method.ready, value);
    assertEquals(method.method, undefined, value);
    assertEquals(method.problems.length, 1, value);
    assert(
      method.problems[0].startsWith(
        `method.modelIdOrName '{{who}}' gave ${JSON.stringify(value)}`,
      ) && method.problems[0].includes(rule),
      method.problems[0],
    );
  }
  // A workflow name may not hold '_', which a model name may.
  const workflow = await packetForWork({
    mode: "workflow",
    workflow: { name: "{{suite}}" },
    let: { suite: "'snake_case'" },
  });
  assert(!workflow.ready);
  assert(
    workflow.problems[0].includes("Workflow name must be lowercase"),
    workflow.problems[0],
  );
  const model = await packetForWork({
    mode: "method",
    method: { modelIdOrName: "{{who}}", methodName: "run" },
    let: { who: "'snake_case'" },
  });
  assertEquals(model.problems, []);
});

Deno.test("dispatch: a literal target is left as written", async () => {
  // It may name a model made before swamp's naming rule; validate warns.
  const packet = await packetForWork({
    mode: "method",
    method: { modelIdOrName: "My Legacy Server", methodName: "run" },
  });
  assertEquals(packet.problems, []);
  assertEquals(packet.method?.modelIdOrName, "My Legacy Server");
});

Deno.test("dispatch: passAsInputs sends let values with their types kept", async () => {
  const packet = await packetForWork({
    mode: "method",
    method: {
      modelIdOrName: "m",
      methodName: "run",
      inputs: { mode: "strict" },
      passAsInputs: ["record", "none", "count"],
    },
    let: {
      record: "{'a': [1, 2]}",
      none: "null",
      count: "3",
      unsent: "'kept back'",
    },
  });
  assertEquals(packet.problems, []);
  assertEquals(packet.inputs, {
    mode: "strict",
    record: { a: [1, 2] },
    none: null,
    count: 3,
  });
  assertEquals(packet.values.unsent, "kept back");
});

Deno.test("dispatch: a literal target's escapes resolve, as an upgraded v1 target needs", async () => {
  const packet = await packetForWork({
    mode: "workflow",
    workflow: { name: "\\{{deploy}}" },
  });
  assertEquals(packet.problems, []);
  assertEquals(packet.workflow, "{{deploy}}");
});
