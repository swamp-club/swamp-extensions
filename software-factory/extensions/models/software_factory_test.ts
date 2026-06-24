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

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import { Environment } from "cel-js";
import { model } from "./software_factory.ts";

// ---------------------------------------------------------------------------
// Harness: in-memory versioned store + definition repository + real CEL.
// One factory instance, many work items.
// ---------------------------------------------------------------------------

const WI = "TEST-1";

interface LogLine {
  msg: string;
  props: Record<string, unknown>;
}

function fixtureDefinition(): Record<string, unknown> {
  return {
    stages: [
      {
        id: "planning",
        initial: true,
        work: { mode: "interactive", skills: ["planning"] },
        artifacts: [
          {
            name: "plan",
            schema: {
              type: "object",
              required: ["summary"],
              properties: { summary: { type: "string" } },
            },
          },
        ],
        transitions: [
          {
            name: "submit",
            to: "review",
            gates: [
              { type: "artifact-exists", config: { artifact: "plan" } },
            ],
          },
        ],
      },
      {
        id: "review",
        maxCycles: 2,
        work: {
          mode: "dispatch",
          skills: ["architecture", "accessibility"],
          systemPrompt:
            'Review: ${{ data.latest(self.name, "artifact-plan").payload.summary }}',
        },
        artifacts: [
          { name: "plan-review", kind: "findings", reviews: "plan" },
        ],
        transitions: [
          {
            name: "approve",
            to: "implementing",
            gates: [
              {
                type: "artifact-fresh",
                config: { artifact: "plan-review", recordedThisCycle: true },
              },
              {
                type: "findings-clear",
                config: {
                  artifact: "plan-review",
                  blocking: ["critical", "high"],
                },
              },
              { type: "human-approval", config: { id: "plan-approval" } },
            ],
          },
          { name: "rework", to: "planning" },
        ],
      },
      {
        id: "implementing",
        work: { mode: "interactive" },
        evidence: [
          {
            name: "change-request",
            schema: {
              type: "object",
              required: ["url"],
              properties: {
                url: { type: "string" },
                status: { type: "string" },
              },
            },
          },
        ],
        transitions: [
          {
            name: "submit",
            to: "done",
            gates: [
              {
                type: "evidence-recorded",
                config: { name: "change-request" },
              },
            ],
          },
        ],
      },
      { id: "done", terminal: true },
      { id: "aborted", terminal: true },
    ],
    globalTransitions: [
      {
        name: "abort",
        to: "aborted",
        gates: [
          { type: "human-approval", config: { id: "abort-confirmation" } },
        ],
      },
    ],
  };
}

function buildHarness(definition?: Record<string, unknown>) {
  const def = definition ?? fixtureDefinition();
  const store = new Map<string, Record<string, unknown>[]>();
  const writeOrder: string[] = [];
  const logs: LogLine[] = [];
  const modelId = "11111111-2222-3333-4444-555555555555";

  const context = {
    globalArgs: def,
    modelType: "@swamp/software-factory",
    modelId,
    logger: {
      info: (msg: string, props: Record<string, unknown>) =>
        logs.push({ msg, props }),
      warning: (msg: string, props: Record<string, unknown>) =>
        logs.push({ msg: `WARN ${msg}`, props }),
    },
    definition: {
      id: modelId,
      name: "test-factory",
      version: 3,
      tags: {},
    },
    definitionRepository: {
      findById: (_type: unknown, id: string) =>
        Promise.resolve(
          id === modelId
            ? { name: "test-factory", version: 3, globalArguments: def }
            : null,
        ),
    },
    dataRepository: {
      findAllForModel: (_type: unknown, _modelId: string) => {
        const out: { name: string; version: number }[] = [];
        for (const [name, versions] of store) {
          for (let i = 0; i < versions.length; i++) {
            out.push({ name, version: i + 1 });
          }
        }
        return Promise.resolve(out);
      },
      getContent: (
        _type: unknown,
        _modelId: string,
        dataName: string,
        version?: number,
      ) => {
        const versions = store.get(dataName);
        if (versions === undefined || versions.length === 0) {
          return Promise.resolve(null);
        }
        const v = version ?? versions.length;
        const data = versions[v - 1];
        return Promise.resolve(
          data === undefined
            ? null
            : new TextEncoder().encode(JSON.stringify(data)),
        );
      },
      listVersions: (_type: unknown, _modelId: string, dataName: string) =>
        Promise.resolve((store.get(dataName) ?? []).map((_, i) => i + 1)),
    },
    writeResource: (
      _specName: string,
      instanceName: string,
      data: Record<string, unknown>,
    ) => {
      const versions = store.get(instanceName) ?? [];
      versions.push(structuredClone(data));
      store.set(instanceName, versions);
      writeOrder.push(instanceName);
      return Promise.resolve({ name: instanceName, version: versions.length });
    },
    createCelEnvironment: () =>
      new Environment({ unlistedVariablesAreDyn: true }),
  };

  return { context, store, writeOrder, logs, def };
}

type Harness = ReturnType<typeof buildHarness>;

function latest(
  harness: Harness,
  instance: string,
): Record<string, unknown> {
  const versions = harness.store.get(instance);
  assert(versions !== undefined && versions.length > 0, `missing ${instance}`);
  return versions[versions.length - 1];
}

// The status view is now a queryable record (`status-<slug>` /
// `status-_factory`), not a log line: read the most-recently-written status
// record, exactly as a `swamp data query` on the latest version would.
function statusJson(harness: Harness): Record<string, unknown> {
  const instance = [...harness.writeOrder].reverse().find(
    (name) => name.startsWith("status-"),
  );
  assert(instance !== undefined, "no status record written");
  const versions = harness.store.get(instance);
  assert(versions !== undefined && versions.length > 0, `empty ${instance}`);
  return versions[versions.length - 1] as Record<string, unknown>;
}

// Faithful stand-in for `swamp data query --select <expr>`: the platform's
// DataQueryService builds this exact cel-js Environment, parses the select
// expression, and evaluates it against each record with the parsed JSON
// content bound as `attributes` (see swamp/src/domain/data/data_query_service.ts).
// We JSON round-trip the record so the projection sees exactly what the query
// reads back from disk (undefined fields dropped, etc.).
const QUERY_ENV = new Environment({
  unlistedVariablesAreDyn: true,
  homogeneousAggregateLiterals: false,
});

function dataQuerySelect(
  harness: Harness,
  instance: string,
  select: string,
): unknown {
  const versions = harness.store.get(instance);
  assert(
    versions !== undefined && versions.length > 0,
    `no ${instance} record`,
  );
  const attributes = JSON.parse(
    JSON.stringify(versions[versions.length - 1]),
  ) as Record<string, unknown>;
  const project = QUERY_ENV.parse(select) as unknown as (
    ctx: Record<string, unknown>,
  ) => unknown;
  return project({ attributes, name: instance, version: versions.length });
}

async function runCheck(
  harness: Harness,
  checkName: keyof typeof model.checks,
  methodName: string,
  unresolvedMethodArgs?: Record<string, unknown>,
) {
  return await model.checks[checkName].execute({
    ...harness.context,
    methodName,
    unresolvedMethodArgs,
  });
}

/** Drive the happy path up to a given point. */
async function startRun(harness: Harness, workItem = WI) {
  await model.methods.start.execute({ workItem }, harness.context);
}

async function recordPlan(
  harness: Harness,
  summary = "build the thing",
  workItem = WI,
) {
  await model.methods.record_artifact.execute(
    { workItem, name: "plan", payload: { summary } },
    harness.context,
  );
}

/** Record that the current stage's work ran (mirrors the real driver loop). */
async function dispatch(harness: Harness, workItem = WI) {
  await model.methods.record_dispatch.execute({ workItem }, harness.context);
}

async function advance(harness: Harness, transition: string, workItem = WI) {
  // The real driver dispatches a stage's work before advancing out of it; do
  // the same here so the stage-executed precondition is satisfied. Cases where
  // dispatch doesn't apply (no work / terminal) are harmless — `advance`
  // re-enforces the requirement where it actually matters.
  try {
    await model.methods.record_dispatch.execute({ workItem }, harness.context);
  } catch {
    // not dispatchable from here; advance will enforce if it's required
  }
  await model.methods.advance.execute(
    { workItem, transition },
    harness.context,
  );
}

// ---------------------------------------------------------------------------
// start / reset
// ---------------------------------------------------------------------------

Deno.test("start: per-work-item state, definition version, journal", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const state = latest(harness, "state-TEST-1");
  assertEquals(state.workItem, "TEST-1");
  assertEquals(state.stageId, "planning");
  assertEquals(state.cycles, { planning: 1 });
  assertEquals(state.status, "active");
  assertEquals(state.definitionVersion, 3);
  const journal = latest(harness, "journal-TEST-1");
  assertEquals(journal.event, "started");
  assertEquals(journal.workItem, "TEST-1");
});

Deno.test("start: refuses to start the same work item twice, allows others", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () => model.methods.start.execute({ workItem: WI }, harness.context),
    Error,
  );
  assertStringIncludes(error.message, "already has a run");
  // A different work item starts fine on the same instance.
  await model.methods.start.execute(
    { workItem: "TEST-2" },
    harness.context,
  );
  assertEquals(latest(harness, "state-TEST-2").stageId, "planning");
});

Deno.test("start: rejects invalid definitions with graph errors", async () => {
  const def = fixtureDefinition();
  (def.stages as { initial?: boolean }[])[1].initial = true; // two initials
  const harness = buildHarness(def);
  const error = await assertRejects(
    () => model.methods.start.execute({ workItem: WI }, harness.context),
    Error,
  );
  assertStringIncludes(error.message, "exactly one stage");
});

Deno.test("start: rejects missing stages with a clear schema error", async () => {
  const harness = buildHarness({});
  const error = await assertRejects(
    () => model.methods.start.execute({ workItem: WI }, harness.context),
    Error,
  );
  assertStringIncludes(error.message, "stages");
});

Deno.test("reset: requires confirm=reset, hides the previous era's records", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await advance(harness, "submit");

  const refused = await assertRejects(
    () =>
      model.methods.reset.execute(
        { workItem: WI, confirm: "yes" },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(refused.message, "confirm=reset");

  await new Promise((resolve) => setTimeout(resolve, 5)); // distinct startedAt
  await model.methods.reset.execute(
    { workItem: WI, confirm: "reset" },
    harness.context,
  );
  const state = latest(harness, "state-TEST-1");
  assertEquals(state.stageId, "planning");
  assertEquals(state.cycles, { planning: 1 });
  assertEquals(latest(harness, "journal-TEST-1").event, "reset");

  // The pre-reset plan is hidden from gates: submit blocks again.
  const blocked = await assertRejects(
    () => advance(harness, "submit"),
    Error,
  );
  assertStringIncludes(blocked.message, "artifact-exists");
});

// ---------------------------------------------------------------------------
// parallel work items on one instance
// ---------------------------------------------------------------------------

Deno.test("parallel work items: fully independent state, artifacts, and gates", async () => {
  const harness = buildHarness();
  await startRun(harness, "ISSUE-1");
  await startRun(harness, "ISSUE-2");

  // ISSUE-1 advances; ISSUE-2 stays put.
  await recordPlan(harness, "plan for one", "ISSUE-1");
  await advance(harness, "submit", "ISSUE-1");
  assertEquals(latest(harness, "state-ISSUE-1").stageId, "review");
  assertEquals(latest(harness, "state-ISSUE-2").stageId, "planning");

  // ISSUE-2's submit is NOT satisfied by ISSUE-1's plan.
  const blocked = await assertRejects(
    () => advance(harness, "submit", "ISSUE-2"),
    Error,
  );
  assertStringIncludes(blocked.message, "artifact-exists");

  // Artifacts live in separate instances, not versions of one another.
  await recordPlan(harness, "plan for two", "ISSUE-2");
  assertEquals(harness.store.get("artifact-ISSUE-1-plan")?.length, 1);
  assertEquals(harness.store.get("artifact-ISSUE-2-plan")?.length, 1);
  assertEquals(
    (latest(harness, "artifact-ISSUE-2-plan").payload as {
      summary: string;
    }).summary,
    "plan for two",
  );

  // Approvals are per work item too: ISSUE-1's approval does not leak.
  await model.methods.record_artifact.execute(
    { workItem: "ISSUE-1", name: "plan-review", payload: { findings: [] } },
    harness.context,
  );
  await model.methods.approve.execute(
    { workItem: "ISSUE-1", gateId: "plan-approval", actor: "adam" },
    harness.context,
  );
  await advance(harness, "approve", "ISSUE-1");
  assertEquals(latest(harness, "state-ISSUE-1").stageId, "implementing");

  await advance(harness, "submit", "ISSUE-2");
  const two = await assertRejects(
    () => advance(harness, "approve", "ISSUE-2"),
    Error,
  );
  assertStringIncludes(two.message, "plan-review");
});

Deno.test("work items with unsafe names get slugged instances, original kept in envelopes", async () => {
  const harness = buildHarness();
  const url = "https://tracker.example/issues/42?view=full";
  await startRun(harness, url);
  const stateInstances = [...harness.store.keys()].filter((k) =>
    k.startsWith("state-")
  );
  assertEquals(stateInstances.length, 1);
  assert(
    /^state-https-tracker.example-issues-42-view-full-[0-9a-f]{8}$/.test(
      stateInstances[0],
    ),
    stateInstances[0],
  );
  assertEquals(latest(harness, stateInstances[0]).workItem, url);
});

// ---------------------------------------------------------------------------
// record_artifact / record_evidence
// ---------------------------------------------------------------------------

Deno.test("record_artifact: only artifacts declared on the current stage", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () =>
      model.methods.record_artifact.execute(
        { workItem: WI, name: "plan-review", payload: { findings: [] } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(error.message, "not declared on stage 'planning'");
  assertStringIncludes(error.message, "plan");
});

Deno.test("record_artifact: payload validated against the compiled schema", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () =>
      model.methods.record_artifact.execute(
        { workItem: WI, name: "plan", payload: { wrong: true } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(error.message, "summary");
});

Deno.test("record_artifact: accepts JSON-string payloads, stamps provenance", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await model.methods.record_artifact.execute(
    { workItem: WI, name: "plan", payload: '{"summary":"from string"}' },
    harness.context,
  );
  const envelope = latest(harness, "artifact-TEST-1-plan");
  assertEquals(envelope.workItem, "TEST-1");
  assertEquals(envelope.stageId, "planning");
  assertEquals(envelope.cycle, 1);
  assertEquals(
    (envelope.payload as { summary: string }).summary,
    "from string",
  );
});

Deno.test("record_artifact: review artifacts auto-pin the subject version", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await recordPlan(harness, "v2"); // plan now at version 2
  await advance(harness, "submit");
  await model.methods.record_artifact.execute(
    { workItem: WI, name: "plan-review", payload: { findings: [] } },
    harness.context,
  );
  assertEquals(
    latest(harness, "artifact-TEST-1-plan-review").subjectVersion,
    2,
  );
});

Deno.test("record_artifact: reviewing an unrecorded subject fails", async () => {
  const def = fixtureDefinition();
  const stages = def.stages as Record<string, unknown>[];
  (stages[0].artifacts as unknown[]).push(
    { name: "premature-review", kind: "findings", reviews: "plan" },
  );
  const harness = buildHarness(def);
  await startRun(harness);
  const error = await assertRejects(
    () =>
      model.methods.record_artifact.execute(
        { workItem: WI, name: "premature-review", payload: { findings: [] } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(error.message, "has not been recorded yet");
});

Deno.test("record_evidence: only evidence declared on the current stage", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "change-request", payload: { url: "x" } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(error.message, "not declared on stage 'planning'");
});

Deno.test("record_evidence: validates payload against the declared schema", async () => {
  const def = {
    stages: [
      {
        id: "impl",
        initial: true,
        work: { mode: "interactive" },
        evidence: [
          {
            name: "cr",
            schema: {
              type: "object",
              required: ["url"],
              properties: { url: { type: "string" } },
            },
          },
        ],
        transitions: [
          {
            name: "go",
            to: "done",
            gates: [{ type: "evidence-recorded", config: { name: "cr" } }],
          },
        ],
      },
      { id: "done", terminal: true },
    ],
  };
  const harness = buildHarness(def);
  await startRun(harness);

  // Missing the required field is rejected with a path-bearing reason.
  const missing = await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "cr", payload: { note: "no url" } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(missing.message, "Evidence 'cr' payload is invalid");
  assertStringIncludes(missing.message, "url");

  // Undeclared keys are rejected too (strict by default).
  await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "cr", payload: { url: "x", extra: 1 } },
        harness.context,
      ),
    Error,
    "invalid",
  );

  // A conforming payload records cleanly.
  await model.methods.record_evidence.execute(
    { workItem: WI, name: "cr", payload: { url: "https://pr/1" } },
    harness.context,
  );
  assertEquals(
    (latest(harness, "evidence-TEST-1-cr").payload as { url: string }).url,
    "https://pr/1",
  );
});

Deno.test("record_evidence: resultEvidence is validated against the built-in outcome schema", async () => {
  const def = {
    stages: [
      {
        id: "test",
        initial: true,
        work: {
          mode: "workflow",
          workflow: { name: "@acme/tests" },
          resultEvidence: "test-run",
        },
        transitions: [{ name: "pass", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  };
  const harness = buildHarness(def);
  await startRun(harness);

  // "Succeeded but recorded nothing" — the #757 hole — now fails loudly.
  const empty = await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "test-run", payload: {} },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(empty.message, "test-run' payload is invalid");

  // An out-of-enum status is rejected.
  await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        {
          workItem: WI,
          name: "test-run",
          payload: { status: "ok", runId: "r" },
        },
        harness.context,
      ),
    Error,
    "invalid",
  );

  // A well-formed outcome records.
  await model.methods.record_evidence.execute(
    {
      workItem: WI,
      name: "test-run",
      payload: { status: "succeeded", runId: "run-42" },
    },
    harness.context,
  );
  assertEquals(
    (latest(harness, "evidence-TEST-1-test-run").payload as { status: string })
      .status,
    "succeeded",
  );
});

Deno.test("status: invalidInputs flags inputs that drift from inputsSchema", async () => {
  const def = {
    stages: [
      {
        id: "planning",
        initial: true,
        work: { mode: "interactive" },
        artifacts: [
          {
            name: "plan",
            schema: {
              type: "object",
              required: ["summary"],
              properties: { summary: { type: "string" } },
            },
          },
        ],
        transitions: [
          {
            name: "submit",
            to: "calling",
            gates: [{ type: "artifact-exists", config: { artifact: "plan" } }],
          },
        ],
      },
      {
        id: "calling",
        work: {
          mode: "method",
          method: {
            modelIdOrName: "@acme/planner",
            methodName: "generate",
            inputs: {
              count:
                '${{ data.latest(self.name, "artifact-plan").payload.summary }}',
            },
          },
          inputsSchema: {
            type: "object",
            required: ["count"],
            properties: { count: { type: "number" } },
          },
          resultEvidence: "out",
        },
        transitions: [{ name: "pass", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  };
  const harness = buildHarness(def);
  await startRun(harness);
  await recordPlan(harness, "not-a-number");
  await advance(harness, "submit");
  await model.methods.status.execute({ workItem: WI }, harness.context);

  const status = statusJson(harness);
  const invalid = status.invalidInputs as { path: string; message: string }[];
  assert(invalid.length > 0, "expected an invalidInputs entry");
  assert(invalid.some((i) => i.path === "count"));
});

// ---------------------------------------------------------------------------
// record_dispatch / stage-executed: deterministic loop guard
// ---------------------------------------------------------------------------

Deno.test("record_dispatch: counts per entry and resets on re-entry", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await dispatch(harness);
  let state = latest(harness, "state-TEST-1");
  assertEquals(state.dispatches, { planning: { cycle: 1, count: 1 } });

  // Drive to review without the auto-dispatching helper, so the counter is
  // exactly what record_dispatch wrote.
  await recordPlan(harness);
  await model.methods.advance.execute(
    { workItem: WI, transition: "submit" },
    harness.context,
  );
  state = latest(harness, "state-TEST-1");
  // planning's counter persists for audit; review has not been dispatched yet.
  assertEquals(
    (state.dispatches as Record<string, unknown>).review,
    undefined,
  );

  await dispatch(harness); // dispatch review (a fresh entry → counts from 1)
  state = latest(harness, "state-TEST-1");
  assertEquals(
    (state.dispatches as Record<string, { cycle: number; count: number }>)
      .review,
    { cycle: 1, count: 1 },
  );
});

Deno.test("record_dispatch: third dispatch trips the runaway-loop guard", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await dispatch(harness); // attempt 1
  await dispatch(harness); // attempt 2 — records, warns

  const warned = harness.logs.some((l) =>
    l.msg.startsWith("WARN") &&
    String(l.props.feedback ?? "").includes("repeat-dispatch")
  );
  assert(warned, "expected a repeat-dispatch warning on attempt 2");

  const err = await assertRejects(
    () =>
      model.methods.record_dispatch.execute({ workItem: WI }, harness.context),
    Error,
  );
  assertStringIncludes(err.message, "runaway-loop-suspected");
  // Diagnostics name the product the stage kept failing to record.
  assertStringIncludes(err.message, "artifact 'plan'");
});

Deno.test("stage-executed: advancing a work stage requires a dispatch", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness); // the gate (artifact-exists) is otherwise satisfied

  const err = await assertRejects(
    () =>
      model.methods.advance.execute(
        { workItem: WI, transition: "submit" },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(err.message, "no recorded execution");
  assertStringIncludes(err.message, "record_dispatch");

  const check = await runCheck(harness, "stage-executed", "advance", {
    workItem: WI,
    transition: "submit",
  });
  assertEquals(check.pass, false);

  await dispatch(harness);
  await model.methods.advance.execute(
    { workItem: WI, transition: "submit" },
    harness.context,
  );
  assertEquals(latest(harness, "state-TEST-1").stageId, "review");
});

Deno.test("stage-executed: global escape-hatch transitions are exempt", async () => {
  const harness = buildHarness();
  await startRun(harness);
  // `abort` is a global transition — available without dispatching the stage.
  const check = await runCheck(harness, "stage-executed", "advance", {
    workItem: WI,
    transition: "abort",
  });
  assertEquals(check.pass, true);
});

Deno.test("status: surfaces the dispatch counter for the current stage", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await model.methods.status.execute({ workItem: WI }, harness.context);
  assertEquals(statusJson(harness).dispatch, {
    cycle: 1,
    attempts: 0,
    limit: 2,
    required: true,
    executed: false,
  });

  await dispatch(harness);
  await model.methods.status.execute({ workItem: WI }, harness.context);
  const d = statusJson(harness).dispatch as {
    attempts: number;
    executed: boolean;
  };
  assertEquals(d.attempts, 1);
  assertEquals(d.executed, true);
});

// ---------------------------------------------------------------------------
// record_validation feedback: failures are recorded, bindable, and cleared
// ---------------------------------------------------------------------------

Deno.test("record_artifact: a rejected payload is recorded as validation feedback, then cleared on success", async () => {
  const harness = buildHarness();
  await startRun(harness);

  // Invalid payload (missing summary, stray key) is rejected loudly…
  const err = await assertRejects(
    () =>
      model.methods.record_artifact.execute(
        { workItem: WI, name: "plan", payload: { wrong: true } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(err.message, "payload is invalid");

  // …and the failure is persisted for a retry to read back.
  const failure = latest(harness, "validation-TEST-1-plan");
  assertEquals(failure.target, "plan");
  assertEquals(failure.targetKind, "artifact");
  assertEquals(failure.cleared, false);
  assertEquals(failure.rejected, { wrong: true });
  assert((failure.errors as string[]).length > 0);

  // A clean record clears it (so a later read never binds a stale failure).
  await recordPlan(harness, "now valid");
  assertEquals(latest(harness, "validation-TEST-1-plan").cleared, true);
});

Deno.test("validation feedback binds via data.latest — null when absent, the record when open", async () => {
  const def = {
    stages: [
      {
        id: "gen",
        initial: true,
        work: {
          mode: "method",
          method: {
            modelIdOrName: "@my/planner",
            methodName: "generate",
            inputs: {
              feedback: '${{ data.latest(self.name, "validation-out") }}',
            },
          },
          resultEvidence: "out",
        },
        transitions: [
          {
            name: "pass",
            to: "done",
            gates: [
              {
                type: "evidence-recorded",
                config: { name: "out", requireField: { status: "succeeded" } },
              },
            ],
          },
        ],
      },
      { id: "done", terminal: true },
    ],
  };
  const harness = buildHarness(def);
  await startRun(harness);

  // First attempt: no failure recorded yet → the binding resolves to null
  // (not an error), so it plugs in cleanly on the happy path.
  await model.methods.status.execute({ workItem: WI }, harness.context);
  const work1 = statusJson(harness).work as {
    method: { inputs: { feedback: unknown } };
  };
  assertEquals(work1.method.inputs.feedback, null);

  // The method "returns" a malformed outcome → rejected and recorded.
  await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "out", payload: { status: "weird" } },
        harness.context,
      ),
    Error,
  );

  // Now the binding resolves to the validation record — the retry's prompt
  // can read .errors and .rejected straight out of it.
  await model.methods.status.execute({ workItem: WI }, harness.context);
  const status2 = statusJson(harness);
  const feedback = (status2.work as {
    method: { inputs: { feedback: Record<string, unknown> | null } };
  }).method.inputs.feedback;
  assert(feedback !== null);
  assertEquals(feedback.target, "out");
  assert(Array.isArray(feedback.errors));

  // It also shows up in the status `validations` block for any driver.
  const open = status2.validations as { target: string }[];
  assert(open.some((v) => v.target === "out"));
});

// ---------------------------------------------------------------------------
// advance: gates, loops, freshness, approvals
// ---------------------------------------------------------------------------

Deno.test("advance: blocked until gates pass, with actionable reasons", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () => advance(harness, "submit"),
    Error,
  );
  assertStringIncludes(error.message, "artifact-exists");
  assertStringIncludes(error.message, "record_artifact");

  await recordPlan(harness);
  await advance(harness, "submit");
  const state = latest(harness, "state-TEST-1");
  assertEquals(state.stageId, "review");
  assertEquals(state.cycles, { planning: 1, review: 1 });
});

Deno.test("advance: unknown transitions list what is available", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () => advance(harness, "ship-it"),
    Error,
  );
  assertStringIncludes(error.message, "not available from stage 'planning'");
  assertStringIncludes(error.message, "submit");
  assertStringIncludes(error.message, "abort"); // global transitions included
});

Deno.test("the full adversarial loop: findings, rework, freshness, human gate", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await advance(harness, "submit");

  // Round 1: reviewer finds a high-severity issue.
  await model.methods.record_artifact.execute(
    {
      workItem: WI,
      name: "plan-review",
      payload: {
        findings: [
          { id: "ARCH-1", severity: "high", description: "tight coupling" },
        ],
      },
    },
    harness.context,
  );

  const blocked = await assertRejects(
    () => advance(harness, "approve"),
    Error,
  );
  assertStringIncludes(blocked.message, "ARCH-1 (high)");

  // Rework: back to planning (ungated), revise plan, resubmit.
  await advance(harness, "rework");
  assertEquals(latest(harness, "state-TEST-1").cycles, {
    planning: 2,
    review: 1,
  });
  await recordPlan(harness, "v2 with central focus manager");
  await advance(harness, "submit"); // review cycle 2

  // The old review is doubly stale: wrong subject version AND wrong cycle.
  const stale = await assertRejects(
    () => advance(harness, "approve"),
    Error,
  );
  assertStringIncludes(stale.message, "re-record");

  // resolve_findings alone must NOT satisfy recordedThisCycle.
  await model.methods.resolve_findings.execute(
    {
      workItem: WI,
      artifact: "plan-review",
      resolutions: [{ findingId: "ARCH-1", note: "introduced focus manager" }],
    },
    harness.context,
  );
  const stillStale = await assertRejects(
    () => advance(harness, "approve"),
    Error,
  );
  assertStringIncludes(stillStale.message, "re-record it this cycle");

  // Fresh review, clean findings.
  await model.methods.record_artifact.execute(
    { workItem: WI, name: "plan-review", payload: { findings: [] } },
    harness.context,
  );

  // Now only the human gate blocks.
  const humanBlocked = await assertRejects(
    () => advance(harness, "approve"),
    Error,
  );
  assertStringIncludes(humanBlocked.message, "awaiting human approval");
  assert(!humanBlocked.message.includes("re-record"));

  // A rejection blocks with the note.
  await model.methods.reject.execute(
    {
      workItem: WI,
      gateId: "plan-approval",
      actor: "adam",
      note: "tighten step 3",
    },
    harness.context,
  );
  const rejected = await assertRejects(
    () => advance(harness, "approve"),
    Error,
  );
  assertStringIncludes(rejected.message, "tighten step 3");

  // Approval unblocks.
  await model.methods.approve.execute(
    { workItem: WI, gateId: "plan-approval", actor: "adam" },
    harness.context,
  );
  await advance(harness, "approve");
  assertEquals(latest(harness, "state-TEST-1").stageId, "implementing");
});

Deno.test("resolve_findings: validates artifact kind and finding ids, keeps provenance", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);

  const notFindings = await assertRejects(
    () =>
      model.methods.resolve_findings.execute(
        {
          workItem: WI,
          artifact: "plan",
          resolutions: [{ findingId: "X", note: "n" }],
        },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(notFindings.message, "kind: findings");

  await advance(harness, "submit");
  await model.methods.record_artifact.execute(
    {
      workItem: WI,
      name: "plan-review",
      payload: {
        findings: [{ id: "A11Y-1", severity: "high", description: "focus" }],
      },
    },
    harness.context,
  );
  const before = latest(harness, "artifact-TEST-1-plan-review");

  const unknown = await assertRejects(
    () =>
      model.methods.resolve_findings.execute(
        {
          workItem: WI,
          artifact: "plan-review",
          resolutions: [{ findingId: "NOPE-1", note: "n" }],
        },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(unknown.message, "A11Y-1");

  await model.methods.resolve_findings.execute(
    {
      workItem: WI,
      artifact: "plan-review",
      resolutions: [{ findingId: "A11Y-1", note: "fixed focus order" }],
    },
    harness.context,
  );
  const after = latest(harness, "artifact-TEST-1-plan-review");
  const findings = (after.payload as {
    findings: { resolved: boolean; resolutionNote: string }[];
  }).findings;
  assertEquals(findings[0].resolved, true);
  assertEquals(findings[0].resolutionNote, "fixed focus order");
  // Provenance preserved: resolving is not a fresh recording.
  assertEquals(after.stageId, before.stageId);
  assertEquals(after.cycle, before.cycle);
  assertEquals(after.recordedAt, before.recordedAt);
  assert(typeof after.resolvedAt === "string");
});

Deno.test("evidence flow reaches terminal; terminal rejects further mutation", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await advance(harness, "submit");
  await model.methods.record_artifact.execute(
    { workItem: WI, name: "plan-review", payload: { findings: [] } },
    harness.context,
  );
  await model.methods.approve.execute(
    { workItem: WI, gateId: "plan-approval", actor: "adam" },
    harness.context,
  );
  await advance(harness, "approve");

  // Evidence gate blocks, then passes.
  const blocked = await assertRejects(
    () => advance(harness, "submit"),
    Error,
  );
  assertStringIncludes(blocked.message, "change-request");
  await model.methods.record_evidence.execute(
    {
      workItem: WI,
      name: "change-request",
      payload: { url: "https://git/pr/7" },
    },
    harness.context,
  );
  await advance(harness, "submit");

  const state = latest(harness, "state-TEST-1");
  assertEquals(state.stageId, "done");
  assertEquals(state.status, "terminal");
  assertEquals(latest(harness, "journal-TEST-1").event, "run_terminal");

  const afterTerminal = await assertRejects(
    () =>
      model.methods.record_evidence.execute(
        { workItem: WI, name: "change-request", payload: { url: "x" } },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(afterTerminal.message, "terminal");

  // The not-terminal check agrees (and is per work item).
  const check = await runCheck(harness, "not-terminal", "record_evidence", {
    workItem: WI,
  });
  assert(!check.pass);
});

// ---------------------------------------------------------------------------
// cycle limits
// ---------------------------------------------------------------------------

Deno.test("cycle limits: entry past maxCycles parks for human override", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await advance(harness, "submit"); // review cycle 1
  await advance(harness, "rework");
  await advance(harness, "submit"); // review cycle 2 (maxCycles: 2)
  await advance(harness, "rework");

  // Third entry into review is over the limit.
  const parked = await assertRejects(
    () => advance(harness, "submit"),
    Error,
  );
  assertStringIncludes(parked.message, "cycle-override:review");
  assertStringIncludes(parked.message, "limit 2");

  // The cycle-limits check fails the same way.
  const check = await runCheck(harness, "cycle-limits", "advance", {
    workItem: WI,
    transition: "submit",
  });
  assert(!check.pass);
  assertStringIncludes(check.errors![0], "cycle-override:review");

  // One human override grants exactly one more entry.
  await model.methods.approve.execute(
    {
      workItem: WI,
      gateId: "cycle-override:review",
      actor: "adam",
      note: "one more round",
    },
    harness.context,
  );
  await advance(harness, "submit");
  assertEquals(latest(harness, "state-TEST-1").cycles, {
    planning: 3,
    review: 3,
  });

  // A fourth entry needs a fresh grant.
  await advance(harness, "rework");
  await assertRejects(() => advance(harness, "submit"), Error);
});

// ---------------------------------------------------------------------------
// approve / reject identity rules
// ---------------------------------------------------------------------------

Deno.test("approve: unknown gate ids are rejected with the known list", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const error = await assertRejects(
    () =>
      model.methods.approve.execute(
        { workItem: WI, gateId: "made-up", actor: "adam" },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(error.message, "plan-approval");
  assertStringIncludes(error.message, "abort-confirmation");

  const badOverride = await assertRejects(
    () =>
      model.methods.approve.execute(
        { workItem: WI, gateId: "cycle-override:nowhere", actor: "adam" },
        harness.context,
      ),
    Error,
  );
  assertStringIncludes(badOverride.message, "unknown stage");
});

Deno.test("approval records are work-item- and cycle-scoped envelopes", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await model.methods.approve.execute(
    {
      workItem: WI,
      gateId: "abort-confirmation",
      actor: "adam",
      note: "kill it",
    },
    harness.context,
  );
  const record = latest(harness, "approval-TEST-1-abort-confirmation");
  assertEquals(record.workItem, "TEST-1");
  assertEquals(record.stageId, "planning");
  assertEquals(record.cycle, 1);
  assertEquals(record.decision, "approved");
  assertEquals(record.actor, "adam");

  // Global abort transition is now satisfied.
  await advance(harness, "abort");
  assertEquals(latest(harness, "state-TEST-1").stageId, "aborted");
  assertEquals(latest(harness, "state-TEST-1").status, "terminal");
});

// ---------------------------------------------------------------------------
// checks
// ---------------------------------------------------------------------------

Deno.test("checks: run-started fails before start, passes after, per work item", async () => {
  const harness = buildHarness();
  const before = await runCheck(harness, "run-started", "advance", {
    workItem: WI,
  });
  assert(!before.pass);
  assertStringIncludes(before.errors![0], "start");
  await startRun(harness);
  assert(
    (await runCheck(harness, "run-started", "advance", { workItem: WI })).pass,
  );
  // A different work item still has no run.
  const other = await runCheck(harness, "run-started", "advance", {
    workItem: "TEST-2",
  });
  assert(!other.pass);
});

Deno.test("checks: graph-valid catches broken definitions and missing stages", async () => {
  const def = fixtureDefinition();
  const harness = buildHarness(def);
  await startRun(harness);

  // Edit the definition mid-run into a valid graph that lacks the run's
  // current stage ('planning'): the graph passes, the current-stage rule fires.
  def.stages = [
    {
      id: "work",
      initial: true,
      transitions: [{ name: "finish", to: "done" }],
    },
    { id: "done", terminal: true },
  ];
  delete def.globalTransitions;
  const result = await runCheck(harness, "graph-valid", "advance", {
    workItem: WI,
  });
  assert(!result.pass);
  assertStringIncludes(result.errors!.join("\n"), "no longer exists");

  // An outright broken definition is also caught.
  def.stages = [{ id: "work", transitions: [] }];
  const broken = await runCheck(harness, "graph-valid", "advance", {
    workItem: WI,
  });
  assert(!broken.pass);
  assertStringIncludes(broken.errors!.join("\n"), "definition:");
});

Deno.test("checks: valid-transition reads unresolvedMethodArgs", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const bad = await runCheck(harness, "valid-transition", "advance", {
    workItem: WI,
    transition: "warp",
  });
  assert(!bad.pass);
  assertStringIncludes(bad.errors![0], "submit");

  const good = await runCheck(harness, "valid-transition", "advance", {
    workItem: WI,
    transition: "submit",
  });
  assert(good.pass);

  // Non-string args (unresolved expressions) defer to the method body.
  const deferred = await runCheck(harness, "valid-transition", "advance", {
    workItem: WI,
    transition: 42 as unknown as string,
  });
  assert(deferred.pass);
  const noWorkItem = await runCheck(harness, "valid-transition", "advance", {
    transition: "warp",
  });
  assert(noWorkItem.pass);
});

Deno.test("checks: gates-satisfied aggregates per-gate reasons", async () => {
  const harness = buildHarness();
  await startRun(harness);
  const result = await runCheck(harness, "gates-satisfied", "advance", {
    workItem: WI,
    transition: "submit",
  });
  assert(!result.pass);
  assertStringIncludes(result.errors![0], "[artifact-exists]");

  await recordPlan(harness);
  const after = await runCheck(harness, "gates-satisfied", "advance", {
    workItem: WI,
    transition: "submit",
  });
  assert(after.pass);
});

// ---------------------------------------------------------------------------
// status / validate / describe
// ---------------------------------------------------------------------------

Deno.test("status: reports not-started for an unknown work item", async () => {
  const harness = buildHarness();
  await model.methods.status.execute({ workItem: WI }, harness.context);
  const status = statusJson(harness);
  assertEquals(status.started, false);
  assertEquals(status.workItem, "TEST-1");
});

Deno.test("status: persists a queryable record, not just a log line", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness, "central focus manager");

  // The status method writes status-<slug> and returns it as a data handle —
  // the driver queries the record instead of scraping a STATUS_JSON log line.
  const result = await model.methods.status.execute(
    { workItem: WI },
    harness.context,
  );
  assertEquals(result.dataHandles.map((h) => h.name), ["status-TEST-1"]);

  // No STATUS_JSON log line is emitted anymore.
  assert(
    !harness.logs.some((l) => l.msg.includes("STATUS_JSON")),
    "STATUS_JSON log line should be gone — the view is queryable data now",
  );

  // The persisted record is exactly what `swamp data query` reads back as the
  // latest version's `attributes`; the driver projects fields off it.
  const record = harness.store.get("status-TEST-1")!.at(-1)!;
  assertEquals((record.stage as { id: string }).id, "planning");
  const satisfied =
    (record.transitions as { name: string; satisfied: boolean }[])
      .filter((t) => t.satisfied).map((t) => t.name);
  assertEquals(satisfied, ["submit"]);

  // Re-running refreshes the same instance (a read-time view, not history).
  await model.methods.status.execute({ workItem: WI }, harness.context);
  assertEquals(harness.store.get("status-TEST-1")!.length, 2);
});

// Every `swamp data query --select` projection shown in the skill docs
// (references/driving.md, README.md) is exercised here against a real status
// record so the docs can't drift from what actually evaluates. The expressions
// below are copied verbatim from those files (modulo the instance name).
Deno.test("status: documented data-query projections evaluate", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness, "central focus manager");
  await advance(harness, "submit"); // now at the gated `review` stage
  await model.methods.status.execute({ workItem: WI }, harness.context);
  const inst = "status-TEST-1";

  // driving.md — the propulsion decision: which transitions are satisfied?
  assertEquals(
    dataQuerySelect(
      harness,
      inst,
      "attributes.transitions.filter(t, t.satisfied).map(t, t.name)",
    ),
    ["rework"],
  );

  // driving.md — why is the gated transition blocked? (gate reasons)
  // `approve` is gated; the global `abort` transition is also gated here.
  const blocked = dataQuerySelect(
    harness,
    inst,
    'attributes.transitions.filter(t, !t.satisfied).map(t, {"transition": t.name, "blockedBy": t.gates.filter(g, !g.pass).map(g, g.reasons)})',
  ) as { transition: string; blockedBy: string[][] }[];
  assertEquals(blocked.map((b) => b.transition).sort(), ["abort", "approve"]);
  const approve = blocked.find((b) => b.transition === "approve")!;
  assert(approve.blockedBy.length > 0, "approve should list failing gates");
  assert(
    approve.blockedBy.flat().some((r) => r.includes("plan-approval")),
    "the human-approval gate's reason should surface",
  );

  // driving.md — the resolved work spec for the current stage
  const work = dataQuerySelect(harness, inst, "attributes.work") as {
    mode: string;
    systemPrompt: string;
  };
  assertEquals(work.mode, "dispatch");
  assertEquals(work.systemPrompt, "Review: central focus manager");

  // driving.md — what's parked for a human? (approve's and abort's gates)
  assertEquals(
    (dataQuerySelect(harness, inst, "attributes.pendingApprovals") as string[])
      .sort(),
    ["abort", "approve"],
  );

  // README.md — the whole transitions array
  const transitions = dataQuerySelect(
    harness,
    inst,
    "attributes.transitions",
  ) as { name: string }[];
  assertEquals(
    transitions.map((t) => t.name).sort(),
    ["abort", "approve", "rework"],
  );
});

Deno.test("status: without workItem gives a factory-wide overview", async () => {
  const harness = buildHarness();
  await startRun(harness, "ISSUE-1");
  await startRun(harness, "ISSUE-2");
  await recordPlan(harness, "p", "ISSUE-1");
  await advance(harness, "submit", "ISSUE-1");

  await model.methods.status.execute({}, harness.context);
  const overview = statusJson(harness);
  assertEquals(overview.factory, true);
  const runs = overview.runs as {
    workItem: string;
    stageId: string;
    status: string;
  }[];
  assertEquals(runs.length, 2);
  assertEquals(runs[0].workItem, "ISSUE-1");
  assertEquals(runs[0].stageId, "review");
  assertEquals(runs[0].status, "active");
  assertEquals(runs[1].workItem, "ISSUE-2");
  assertEquals(runs[1].stageId, "planning");

  // The overview lands in its own queryable record (SKILL.md / README.md
  // reference `status-_factory`); a projection reads it back like any other.
  assertEquals(harness.writeOrder.at(-1), "status-_factory");
  assertEquals(
    dataQuerySelect(
      harness,
      "status-_factory",
      "attributes.runs.map(r, r.workItem)",
    ),
    ["ISSUE-1", "ISSUE-2"],
  );
});

Deno.test("status: self-describing packet with gates, manifest, and bindings", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness, "central focus manager");
  await model.methods.status.execute({ workItem: WI }, harness.context);
  let status = statusJson(harness);
  assertEquals((status.stage as { id: string }).id, "planning");
  const transitions = status.transitions as {
    name: string;
    satisfied: boolean;
  }[];
  const submit = transitions.find((t) => t.name === "submit");
  assertEquals(submit?.satisfied, true);

  const manifest = status.contextManifest as {
    name: string;
    role: string;
    recorded: boolean;
  }[];
  const plan = manifest.find((m) => m.name === "plan");
  assertEquals(plan?.role, "own");
  assertEquals(plan?.recorded, true);

  // In review, the work spec's binding resolves against recorded run data
  // and the plan becomes the review subject.
  await advance(harness, "submit");
  await model.methods.status.execute({ workItem: WI }, harness.context);
  status = statusJson(harness);
  const work = status.work as { systemPrompt: string };
  assertEquals(work.systemPrompt, "Review: central focus manager");
  assertEquals(status.unresolvedBindings, []);
  const manifest2 = status.contextManifest as { name: string; role: string }[];
  assertEquals(manifest2.find((m) => m.name === "plan")?.role, "subject");

  // Cycle bookkeeping is visible.
  const cycles = status.cycles as Record<
    string,
    { entries: number; limit: number }
  >;
  assertEquals(cycles.review, { entries: 1, limit: 2 });
  assertEquals(cycles.planning, { entries: 1, limit: 5 });
});

Deno.test("validate: passes good definitions, throws on errors", async () => {
  const harness = buildHarness();
  await model.methods.validate.execute({}, harness.context);

  const def = fixtureDefinition();
  (def.stages as { terminal?: boolean }[])[3].terminal = false;
  (def.stages as { terminal?: boolean }[])[4].terminal = false;
  const bad = buildHarness(def);
  const error = await assertRejects(
    () => model.methods.validate.execute({}, bad.context),
    Error,
  );
  assertStringIncludes(error.message, "invalid");
});

Deno.test("describe: renders Mermaid and tables", async () => {
  const harness = buildHarness();
  await model.methods.describe.execute({}, harness.context);
  const text = harness.logs.map((l) => JSON.stringify(l.props)).join("\n");
  assertStringIncludes(text, "flowchart TD");
  assertStringIncludes(text, "planning");
  assertStringIncludes(text, "| Transition | From | To | Gates |");
});

// ---------------------------------------------------------------------------
// summary
// ---------------------------------------------------------------------------

/** Drive the fixture machine from start to the terminal stage. */
async function driveToDone(harness: Harness) {
  await startRun(harness);
  await recordPlan(harness, "build the thing");
  await advance(harness, "submit");
  await model.methods.record_artifact.execute(
    {
      workItem: WI,
      name: "plan-review",
      payload: {
        findings: [{
          id: "F-1",
          severity: "medium",
          description: "unquoted expansion",
          resolved: false,
        }],
      },
    },
    harness.context,
  );
  await model.methods.resolve_findings.execute(
    {
      workItem: WI,
      artifact: "plan-review",
      resolutions: [{ findingId: "F-1", note: "quoted now" }],
    },
    harness.context,
  );
  await model.methods.approve.execute(
    { workItem: WI, gateId: "plan-approval", actor: "adam", note: "ship it" },
    harness.context,
  );
  await advance(harness, "approve");
  await model.methods.record_evidence.execute(
    {
      workItem: WI,
      name: "change-request",
      payload: { status: "open", url: "https://example.com/pr/7" },
    },
    harness.context,
  );
  await advance(harness, "submit");
}

Deno.test("journal events pin the exact record version they wrote", async () => {
  const harness = buildHarness();
  await driveToDone(harness);
  const journal = harness.store.get("journal-TEST-1") ?? [];
  const byEvent = (event: string) =>
    journal.filter((e) => e.event === event).map(
      (e) => (e.payload as Record<string, unknown>).version,
    );
  assertEquals(byEvent("artifact_recorded"), [1, 1]); // plan v1, plan-review v1
  assertEquals(byEvent("findings_resolved"), [2]); // re-write of plan-review
  assertEquals(byEvent("evidence_recorded"), [1]);
});

Deno.test("summary: renders the full linear history as markdown", async () => {
  const harness = buildHarness();
  await driveToDone(harness);
  await model.methods.summary.execute({ workItem: WI }, harness.context);

  const markdown = [...harness.logs].reverse().find(
    (l) => typeof l.props.markdown === "string",
  )?.props.markdown as string;
  assert(markdown !== undefined, "no markdown log line");

  assertStringIncludes(markdown, "# Work Item: TEST-1");
  assertStringIncludes(markdown, "**Factory:** test-factory");
  assertStringIncludes(markdown, "**Outcome:** 🏁 terminal at `done`");
  assertStringIncludes(
    markdown,
    "**Path:** planning → review → implementing → done",
  );
  assertStringIncludes(markdown, "## 1. planning (cycle 1)");
  assertStringIncludes(markdown, "### 📄 Artifact: plan (v1)");
  assertStringIncludes(markdown, "build the thing");
  // The reviews map from the definition names the subject.
  assertStringIncludes(
    markdown,
    "### 🔍 Review: plan-review (v1, reviews plan v1)",
  );
  assertStringIncludes(markdown, "### 🛠 Findings resolved in plan-review");
  assertStringIncludes(markdown, "- F-1 — quoted now");
  assertStringIncludes(
    markdown,
    "### ✅ Approval: plan-approval — **approved** by adam",
  );
  assertStringIncludes(markdown, "### 🧪 Evidence: change-request");
  assertStringIncludes(markdown, "**→ submit** to *done* (terminal)");

  const summaryLine = [...harness.logs].reverse().find(
    (l) => l.msg.includes("SUMMARY_JSON"),
  );
  assert(summaryLine !== undefined, "no SUMMARY_JSON log line");
  const timeline = JSON.parse(summaryLine.props.summary as string) as {
    runStatus: string;
    path: string[];
    totals: { artifactsRecorded: number; approvals: number };
  };
  assertEquals(timeline.runStatus, "terminal");
  assertEquals(timeline.path, ["planning", "review", "implementing", "done"]);
  assertEquals(timeline.totals.artifactsRecorded, 2);
  assertEquals(timeline.totals.approvals, 1);
});

Deno.test("summary: in-flight runs render their current position", async () => {
  const harness = buildHarness();
  await startRun(harness);
  await recordPlan(harness);
  await model.methods.summary.execute({ workItem: WI }, harness.context);
  const markdown = [...harness.logs].reverse().find(
    (l) => typeof l.props.markdown === "string",
  )?.props.markdown as string;
  assertStringIncludes(
    markdown,
    "**Currently:** active at `planning` (cycle 1)",
  );
});

Deno.test("summary: unknown work items fail with the start hint", async () => {
  const harness = buildHarness();
  const error = await assertRejects(
    () => model.methods.summary.execute({ workItem: "NOPE" }, harness.context),
    Error,
  );
  assertStringIncludes(error.message, "No run for work item 'NOPE'");
});
