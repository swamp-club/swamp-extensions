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
import { findStage, parseDefinition } from "./definition_schema.ts";
import { FINDINGS_SCHEMA, OUTCOME_SCHEMA } from "./payload_schema.ts";
import { advance, expectedOf } from "./run_ops.ts";
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
  testEnv,
} from "./test_support.ts";

const DEFINITION = smallDefinition();

async function atReview(text: string) {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    { key: "wi-9", definitionDigest: "sha256:l" },
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

Deno.test("dispatch: an interactive stage gets its prompt rendered from bindings", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    { key: "wi-9", definitionDigest: "sha256:l" },
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

Deno.test("dispatch: a workflow stage merges literal inputs with bindings and checks inputsSchema", async () => {
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

Deno.test("dispatch: a failing binding and its unfilled placeholder are reported, not thrown", async () => {
  const definition = parseDefinition({
    schemaVersion: 1,
    name: "reviewing",
    stages: [
      {
        id: "review",
        initial: true,
        work: {
          mode: "dispatch",
          systemPrompt: "Review {{plan}}.",
          bindings: { plan: 'artifacts["plan"].payload.summary' },
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
    { key: "wi-1", definitionDigest: "sha256:r" },
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
    packet.problems.some((p) => p.startsWith("binding 'plan'")),
    packet.problems.join(),
  );
  assert(packet.problems.some((p) => p.includes("{{plan}} has no value")));
  // A dispatch stage with no skills runs one reviewer.
  assertEquals(packet.subagents, 1);
});

Deno.test("dispatch: a binding whose value has no JSON form is reported as a problem", async () => {
  const definition = parseDefinition({
    schemaVersion: 1,
    name: "bytes",
    stages: [
      {
        id: "work",
        initial: true,
        work: { mode: "interactive", bindings: { raw: "b'ab'" } },
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
    { key: "wi-1", definitionDigest: "sha256:b" },
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
      p.includes("binding 'raw'") && p.includes("no JSON form")
    ),
    packet.problems.join(),
  );
});

Deno.test("dispatch: no description reaches whoever does the work, in any mode", async () => {
  // Descriptions are for the factory definition's authors (the design page, the
  // studio). Each carries a marker; none may appear in a packet, which is
  // what the agent reads and what recordDispatch stores.
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
      schemaVersion: 1,
      name: "described",
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
            bindings: { what: "item.key" },
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
      { key: "wi-1", definitionDigest: "sha256:d" },
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
    schemaVersion: 1,
    name: "reviewing",
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
          bindings: { plan: 'artifacts["plan"].payload.summary' },
          context: { inject: ["plan"] },
        },
        artifacts: [{ name: "plan-review", kind: "findings", reviews: "plan" }],
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
    { key: "wi-3", definitionDigest: "sha256:r" },
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
    { key: "wi-1", definitionDigest: "sha256:l" },
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
      prompt.includes("- plan: swamp data get wi-3 artifact-plan --json"),
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
