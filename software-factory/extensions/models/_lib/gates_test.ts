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

import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { Environment } from "cel-js";
import type { FactoryArguments, GateSpec } from "./definition_schema.ts";
import { FactoryArgumentsSchema } from "./definition_schema.ts";
import type {
  ApprovalRecord,
  ArtifactEnvelope,
  EvidenceEnvelope,
  RunState,
  RunView,
} from "./run_data.ts";
import type { GateContext } from "./gates.ts";
import {
  buildCelContext,
  evaluateGate,
  evaluateTransitionGates,
} from "./gates.ts";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const ARGS: FactoryArguments = FactoryArgumentsSchema.parse({
  workItem: "TEST-1",
  stages: [
    {
      id: "planning",
      initial: true,
      artifacts: [{ name: "plan" }],
      transitions: [{ name: "submit", to: "review" }],
    },
    {
      id: "review",
      artifacts: [{ name: "plan-review", kind: "findings", reviews: "plan" }],
      evidence: [{ name: "test-run" }],
      transitions: [{ name: "approve", to: "done" }],
    },
    { id: "done", terminal: true },
  ],
});

const NOW = new Date("2026-06-11T12:00:00.000Z");

function state(partial?: Partial<RunState>): RunState {
  return {
    workItem: "TEST-1",
    stageId: "review",
    cycles: { planning: 1, review: 1 },
    enteredAt: "2026-06-11T11:00:00.000Z",
    status: "active",
    definitionVersion: 1,
    startedAt: "2026-06-11T10:00:00.000Z",
    ...partial,
  };
}

function artifactView(
  envelope: Partial<ArtifactEnvelope> & { name: string },
  version = 1,
): { latest: ArtifactEnvelope; version: number } {
  return {
    latest: {
      workItem: "TEST-1",
      stageId: "review",
      cycle: 1,
      payload: {},
      recordedAt: "2026-06-11T11:30:00.000Z",
      ...envelope,
    },
    version,
  };
}

function evidenceView(
  envelope: Partial<EvidenceEnvelope> & { name: string },
  version = 1,
): { latest: EvidenceEnvelope; version: number } {
  return {
    latest: {
      workItem: "TEST-1",
      stageId: "review",
      cycle: 1,
      payload: {},
      recordedAt: "2026-06-11T11:30:00.000Z",
      ...envelope,
    },
    version,
  };
}

function makeContext(opts?: {
  args?: FactoryArguments;
  state?: Partial<RunState>;
  artifacts?: [string, { latest: ArtifactEnvelope; version: number }][];
  evidence?: [string, { latest: EvidenceEnvelope; version: number }][];
  approvals?: [string, ApprovalRecord[]][];
  queryData?: GateContext["queryData"];
  dataRepository?: GateContext["dataRepository"];
  selfName?: string;
}): GateContext {
  const view: RunView = {
    state: null,
    artifacts: new Map(opts?.artifacts ?? []),
    evidence: new Map(opts?.evidence ?? []),
    validations: new Map(),
    approvals: new Map(opts?.approvals ?? []),
  };
  return {
    args: opts?.args ?? ARGS,
    state: state(opts?.state),
    view,
    workItem: "TEST-1",
    workItemSlug: "TEST-1",
    now: NOW,
    selfName: opts?.selfName,
    createCelEnvironment: () =>
      new Environment({ unlistedVariablesAreDyn: true }),
    queryData: opts?.queryData,
    dataRepository: opts?.dataRepository,
  };
}

async function run(gate: GateSpec, ctx: GateContext) {
  return await evaluateGate(gate, ctx);
}

// ---------------------------------------------------------------------------
// artifact-exists / artifact-fresh
// ---------------------------------------------------------------------------

Deno.test("artifact-exists: fails when missing, passes when recorded", async () => {
  const gate: GateSpec = {
    type: "artifact-exists",
    config: { artifact: "plan" },
  };
  const missing = await run(gate, makeContext());
  assert(!missing.pass);
  assertStringIncludes(missing.reasons[0], "record_artifact");

  const present = await run(
    gate,
    makeContext({ artifacts: [["plan", artifactView({ name: "plan" })]] }),
  );
  assert(present.pass);
});

Deno.test("artifact-fresh: subject version must match", async () => {
  const gate: GateSpec = {
    type: "artifact-fresh",
    config: { artifact: "plan-review" },
  };
  const stale = await run(
    gate,
    makeContext({
      artifacts: [
        ["plan", artifactView({ name: "plan" }, 2)],
        [
          "plan-review",
          artifactView({ name: "plan-review", subjectVersion: 1 }),
        ],
      ],
    }),
  );
  assert(!stale.pass);
  assertStringIncludes(stale.reasons[0], "v1");
  assertStringIncludes(stale.reasons[0], "v2");

  const fresh = await run(
    gate,
    makeContext({
      artifacts: [
        ["plan", artifactView({ name: "plan" }, 2)],
        [
          "plan-review",
          artifactView({ name: "plan-review", subjectVersion: 2 }),
        ],
      ],
    }),
  );
  assert(fresh.pass);
});

Deno.test("artifact-fresh: recordedThisCycle forces re-recording on re-entry", async () => {
  const gate: GateSpec = {
    type: "artifact-fresh",
    config: { artifact: "plan-review", recordedThisCycle: true },
  };
  // Review re-entered (cycle 2); review artifact recorded during cycle 1.
  const result = await run(
    gate,
    makeContext({
      state: { cycles: { planning: 2, review: 2 } },
      artifacts: [
        ["plan", artifactView({ name: "plan" }, 1)],
        [
          "plan-review",
          artifactView({
            name: "plan-review",
            subjectVersion: 1,
            cycle: 1,
          }),
        ],
      ],
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "re-record it this cycle");
});

Deno.test("artifact-fresh: missing artifact or subject fails", async () => {
  const gate: GateSpec = {
    type: "artifact-fresh",
    config: { artifact: "plan-review" },
  };
  const noArtifact = await run(gate, makeContext());
  assert(!noArtifact.pass);

  const noSubject = await run(
    gate,
    makeContext({
      artifacts: [
        ["plan-review", artifactView({ name: "plan-review" })],
      ],
    }),
  );
  assert(!noSubject.pass);
  assertStringIncludes(noSubject.reasons[0], "subject artifact 'plan'");
});

// ---------------------------------------------------------------------------
// findings-clear
// ---------------------------------------------------------------------------

Deno.test("findings-clear: blocks on unresolved blocking severities only", async () => {
  const gate: GateSpec = {
    type: "findings-clear",
    config: { artifact: "plan-review", blocking: ["critical", "high"] },
  };
  const blocked = await run(
    gate,
    makeContext({
      artifacts: [[
        "plan-review",
        artifactView({
          name: "plan-review",
          payload: {
            findings: [
              { id: "F-1", severity: "high", description: "x" },
              { id: "F-2", severity: "low", description: "y" },
              {
                id: "F-3",
                severity: "critical",
                description: "z",
                resolved: true,
              },
            ],
          },
        }),
      ]],
    }),
  );
  assert(!blocked.pass);
  assertStringIncludes(blocked.reasons[0], "F-1 (high)");
  assert(!blocked.reasons[0].includes("F-2"));
  assert(!blocked.reasons[0].includes("F-3"));

  const clear = await run(
    gate,
    makeContext({
      artifacts: [[
        "plan-review",
        artifactView({
          name: "plan-review",
          payload: {
            findings: [{ id: "F-2", severity: "low", description: "y" }],
          },
        }),
      ]],
    }),
  );
  assert(clear.pass);
});

// ---------------------------------------------------------------------------
// human-approval
// ---------------------------------------------------------------------------

function approval(
  partial: Partial<ApprovalRecord> & { decision: "approved" | "rejected" },
): ApprovalRecord {
  return {
    gateId: "ship-approval",
    workItem: "TEST-1",
    actor: "adam",
    stageId: "review",
    cycle: 1,
    decidedAt: "2026-06-11T11:45:00.000Z",
    ...partial,
  };
}

Deno.test("human-approval: requires approvals scoped to the current cycle", async () => {
  const gate: GateSpec = {
    type: "human-approval",
    config: { id: "ship-approval" },
  };
  const none = await run(gate, makeContext());
  assert(!none.pass);
  assertStringIncludes(none.reasons[0], "awaiting human approval");

  const approved = await run(
    gate,
    makeContext({
      approvals: [["ship-approval", [approval({ decision: "approved" })]]],
    }),
  );
  assert(approved.pass);

  // Approval from a previous cycle does not carry over.
  const staleCycle = await run(
    gate,
    makeContext({
      state: { cycles: { review: 2 } },
      approvals: [["ship-approval", [approval({ decision: "approved" })]]],
    }),
  );
  assert(!staleCycle.pass);
});

Deno.test("human-approval: a rejection blocks with the note", async () => {
  const gate: GateSpec = {
    type: "human-approval",
    config: { id: "ship-approval" },
  };
  const rejected = await run(
    gate,
    makeContext({
      approvals: [[
        "ship-approval",
        [
          approval({ decision: "approved" }),
          approval({ decision: "rejected", note: "needs more tests" }),
        ],
      ]],
    }),
  );
  assert(!rejected.pass);
  assertStringIncludes(rejected.reasons[0], "needs more tests");
});

Deno.test("human-approval: minApprovals counts distinct records", async () => {
  const gate: GateSpec = {
    type: "human-approval",
    config: { id: "ship-approval", minApprovals: 2 },
  };
  const one = await run(
    gate,
    makeContext({
      approvals: [["ship-approval", [approval({ decision: "approved" })]]],
    }),
  );
  assert(!one.pass);
  assertStringIncludes(one.reasons[0], "(1/2)");

  const two = await run(
    gate,
    makeContext({
      approvals: [[
        "ship-approval",
        [
          approval({ decision: "approved" }),
          approval({ decision: "approved", actor: "sam" }),
        ],
      ]],
    }),
  );
  assert(two.pass);
});

// ---------------------------------------------------------------------------
// evidence-recorded
// ---------------------------------------------------------------------------

Deno.test("evidence-recorded: cycle-scoped with field matching", async () => {
  const gate: GateSpec = {
    type: "evidence-recorded",
    config: { name: "test-run", requireField: { status: "succeeded" } },
  };
  const missing = await run(gate, makeContext());
  assert(!missing.pass);

  const wrongCycle = await run(
    gate,
    makeContext({
      state: { cycles: { review: 2 } },
      evidence: [[
        "test-run",
        evidenceView({
          name: "test-run",
          cycle: 1,
          payload: { status: "succeeded" },
        }),
      ]],
    }),
  );
  assert(!wrongCycle.pass);
  assertStringIncludes(wrongCycle.reasons[0], "record fresh evidence");

  const wrongField = await run(
    gate,
    makeContext({
      evidence: [[
        "test-run",
        evidenceView({ name: "test-run", payload: { status: "failed" } }),
      ]],
    }),
  );
  assert(!wrongField.pass);
  assertStringIncludes(wrongField.reasons[0], '"failed"');

  const good = await run(
    gate,
    makeContext({
      evidence: [[
        "test-run",
        evidenceView({ name: "test-run", payload: { status: "succeeded" } }),
      ]],
    }),
  );
  assert(good.pass);
});

Deno.test("evidence-recorded: requireField supports dot paths", async () => {
  const gate: GateSpec = {
    type: "evidence-recorded",
    config: { name: "test-run", requireField: { "result.code": 0 } },
  };
  const good = await run(
    gate,
    makeContext({
      evidence: [[
        "test-run",
        evidenceView({ name: "test-run", payload: { result: { code: 0 } } }),
      ]],
    }),
  );
  assert(good.pass);
});

// ---------------------------------------------------------------------------
// cooldown / max-cycles
// ---------------------------------------------------------------------------

Deno.test("cooldown: enforces elapsed time since the referenced record", async () => {
  const gate: GateSpec = {
    type: "cooldown",
    config: { afterEvidence: "test-run", seconds: 3600 },
  };
  const tooSoon = await run(
    gate,
    makeContext({
      evidence: [[
        "test-run",
        evidenceView({
          name: "test-run",
          recordedAt: "2026-06-11T11:30:00.000Z", // 30 min before NOW
        }),
      ]],
    }),
  );
  assert(!tooSoon.pass);
  assertStringIncludes(tooSoon.reasons[0], "wait");

  const cooled = await run(
    { type: "cooldown", config: { afterEvidence: "test-run", seconds: 600 } },
    makeContext({
      evidence: [[
        "test-run",
        evidenceView({
          name: "test-run",
          recordedAt: "2026-06-11T11:30:00.000Z",
        }),
      ]],
    }),
  );
  assert(cooled.pass);

  const nothing = await run(gate, makeContext());
  assert(!nothing.pass);
});

Deno.test("max-cycles: routing in both directions", async () => {
  const under: GateSpec = {
    type: "max-cycles",
    config: { stage: "review", limit: 3 },
  };
  assert((await run(under, makeContext())).pass);
  const atLimit = makeContext({ state: { cycles: { review: 3 } } });
  assert(!(await run(under, atLimit)).pass);

  const escalate: GateSpec = {
    type: "max-cycles",
    config: { stage: "review", limit: 3, invert: true },
  };
  assert(!(await run(escalate, makeContext())).pass);
  assert((await run(escalate, atLimit)).pass);
});

// ---------------------------------------------------------------------------
// cel
// ---------------------------------------------------------------------------

Deno.test("cel: full CEL with macros over materialized run data", async () => {
  const ctx = makeContext({
    artifacts: [[
      "plan-review",
      artifactView({
        name: "plan-review",
        payload: {
          findings: [
            { id: "F-1", severity: "high", resolved: true },
            { id: "F-2", severity: "low", resolved: false },
          ],
        },
      }),
    ]],
    evidence: [[
      "test-run",
      evidenceView({ name: "test-run", payload: { status: "succeeded" } }),
    ]],
  });

  const clear = await run({
    type: "cel",
    config: {
      expr:
        'size(artifacts.plan_review.findings.filter(f, !f.resolved && f.severity in ["critical","high"])) == 0',
    },
  }, ctx);
  assert(clear.pass, clear.reasons.join("; "));

  const combined = await run({
    type: "cel",
    config: {
      expr:
        'evidence.test_run.status == "succeeded" && workItem == "TEST-1" && state.stageId == "review"',
    },
  }, ctx);
  assert(combined.pass, combined.reasons.join("; "));

  const failing = await run({
    type: "cel",
    config: {
      expr: "size(artifacts.plan_review.findings.filter(f, !f.resolved)) == 0",
      message: "unresolved findings remain",
    },
  }, ctx);
  assert(!failing.pass);
  assertEquals(failing.reasons, ["unresolved findings remain"]);
});

Deno.test("cel: non-boolean results and evaluation errors fail safely", async () => {
  const notBool = await run(
    { type: "cel", config: { expr: '"a string"' } },
    makeContext(),
  );
  assert(!notBool.pass);
  assertStringIncludes(notBool.reasons[0], "evaluated to");

  const broken = await run(
    { type: "cel", config: { expr: "this is not CEL ((" } },
    makeContext(),
  );
  assert(!broken.pass);
  assertStringIncludes(broken.reasons[0], "evaluation failed");
});

Deno.test("cel: fails gracefully without an evaluator", async () => {
  const ctx = makeContext();
  ctx.createCelEnvironment = undefined;
  const result = await run(
    { type: "cel", config: { expr: "true" } },
    ctx,
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "unavailable");
});

Deno.test("buildCelContext: snake-cases names and exposes state", () => {
  const ctx = makeContext({
    artifacts: [["plan-review", artifactView({ name: "plan-review" })]],
  });
  const cel = buildCelContext(ctx);
  assert("plan_review" in (cel.artifacts as Record<string, unknown>));
  assertEquals((cel.state as { stageId: string }).stageId, "review");
  assertEquals(cel.workItem, "TEST-1");
});

// ---------------------------------------------------------------------------
// workflow-succeeded
// ---------------------------------------------------------------------------

const SUMMARY = {
  status: "succeeded",
  workflowName: "@acme/run-tests",
  workflowRunId: "run-123",
  failed: 0,
};

function workflowMocks(opts?: {
  summary?: Record<string, unknown>;
  createdAt?: string;
  stepOutputs?: { name: string; modelName: string }[];
}) {
  const summary = opts?.summary ?? SUMMARY;
  const record = {
    ownerRef: "wf-id-1",
    name: "report-swamp-workflow-summary-json",
    createdAt: opts?.createdAt ?? "2026-06-11T11:50:00.000Z", // after enteredAt
    content: "",
  };
  const queryData = (predicate: string) => {
    if (predicate.includes("report-swamp-workflow-summary-json")) {
      return Promise.resolve([record]);
    }
    if (predicate.includes("workflowRunId")) {
      const requiredModel = predicate.match(/modelName == "([^"]+)"/)?.[1];
      const matches = (opts?.stepOutputs ?? []).filter(
        (output) =>
          predicate.includes(`"${output.name}"`) &&
          (requiredModel === undefined || output.modelName === requiredModel),
      );
      return Promise.resolve(matches);
    }
    return Promise.resolve([]);
  };
  const dataRepository = {
    findAllForModel: () => Promise.resolve([]),
    listVersions: () => Promise.resolve([]),
    getContent: (_t: unknown, _id: string, dataName: string) =>
      Promise.resolve(
        dataName === "report-swamp-workflow-summary-json"
          ? new TextEncoder().encode(JSON.stringify(summary))
          : null,
      ),
  };
  return { queryData, dataRepository };
}

Deno.test("workflow-succeeded: verifies the platform run record", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: { workflow: "@acme/run-tests" },
  };
  const ok = await run(gate, makeContext(workflowMocks()));
  assert(ok.pass, ok.reasons.join("; "));
});

Deno.test("workflow-succeeded: failed runs are reported with counts", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: { workflow: "@acme/run-tests" },
  };
  const failed = await run(
    gate,
    makeContext(workflowMocks({
      summary: { ...SUMMARY, status: "failed", failed: 2 },
    })),
  );
  assert(!failed.pass);
  assertStringIncludes(failed.reasons[0], "'failed'");
  assertStringIncludes(failed.reasons[0], "2 failed step(s)");
});

Deno.test("workflow-succeeded: stale runs (before stage entry) are rejected", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: { workflow: "@acme/run-tests" },
  };
  const stale = await run(
    gate,
    makeContext(workflowMocks({ createdAt: "2026-06-11T09:00:00.000Z" })),
  );
  assert(!stale.pass);
  assertStringIncludes(stale.reasons[0], "predates");
});

Deno.test("workflow-succeeded: missing run record fails with instruction", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: { workflow: "@acme/other-workflow" },
  };
  const missing = await run(gate, makeContext(workflowMocks()));
  assert(!missing.pass);
  assertStringIncludes(missing.reasons[0], "trigger the workflow first");
});

Deno.test("workflow-succeeded: requireStepOutputs verifies run provenance", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: {
      workflow: "@acme/run-tests",
      requireStepOutputs: ["evidence-test-run"],
    },
  };
  const present = await run(
    gate,
    makeContext(workflowMocks({
      stepOutputs: [{ name: "evidence-TEST-1-test-run", modelName: "issue-1" }],
    })),
  );
  assert(present.pass, present.reasons.join("; "));

  const absent = await run(gate, makeContext(workflowMocks()));
  assert(!absent.pass);
  assertStringIncludes(absent.reasons[0], "evidence-test-run");
});

Deno.test("workflow-succeeded: step outputs are self-scoped for parallel runs", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: {
      workflow: "@acme/run-tests",
      requireStepOutputs: ["evidence-test-run"],
    },
  };
  // issue-2's run wrote the output; issue-1's gate must not accept it.
  const sibling = await run(
    gate,
    makeContext({
      ...workflowMocks({
        stepOutputs: [{
          name: "evidence-TEST-1-test-run",
          modelName: "issue-2",
        }],
      }),
      selfName: "issue-1",
    }),
  );
  assert(!sibling.pass);
  assertStringIncludes(sibling.reasons[0], "into run 'issue-1'");

  const own = await run(
    gate,
    makeContext({
      ...workflowMocks({
        stepOutputs: [{
          name: "evidence-TEST-1-test-run",
          modelName: "issue-1",
        }],
      }),
      selfName: "issue-1",
    }),
  );
  assert(own.pass, own.reasons.join("; "));
});

Deno.test("workflow-succeeded: inline catalog content is used when present", async () => {
  const mocks = workflowMocks();
  const inlineQuery = (predicate: string) => {
    if (predicate.includes("report-swamp-workflow-summary-json")) {
      return Promise.resolve([{
        ownerRef: "wf-id-1",
        name: "report-swamp-workflow-summary-json",
        createdAt: "2026-06-11T11:50:00.000Z",
        content: JSON.stringify(SUMMARY),
      }]);
    }
    return Promise.resolve([]);
  };
  const noContentRepo = {
    findAllForModel: () => Promise.resolve([]),
    listVersions: () => Promise.resolve([]),
    getContent: () => Promise.resolve(null),
  };
  const ok = await run(
    {
      type: "workflow-succeeded",
      config: { workflow: "@acme/run-tests" },
    },
    makeContext({
      ...mocks,
      queryData: inlineQuery,
      dataRepository: noContentRepo,
    }),
  );
  assert(ok.pass, ok.reasons.join("; "));
});

Deno.test("workflow-succeeded: unavailable query machinery fails gracefully", async () => {
  const result = await run(
    {
      type: "workflow-succeeded",
      config: { workflow: "@acme/run-tests" },
    },
    makeContext(),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "unavailable");
});

// ---------------------------------------------------------------------------
// workflow-succeeded: binding to the work item's own run (swamp-club #2342)
// ---------------------------------------------------------------------------

/** A workflow-mode stage that runs the gated workflow itself. */
function workflowStageArgs(resultEvidence?: string): FactoryArguments {
  return FactoryArgumentsSchema.parse({
    stages: [
      {
        id: "review",
        initial: true,
        work: {
          mode: "workflow",
          workflow: { name: "@acme/run-tests" },
          ...(resultEvidence !== undefined ? { resultEvidence } : {}),
        },
        transitions: [{ name: "pass", to: "done" }],
      },
      { id: "done", terminal: true },
    ],
  });
}

interface RunFixture {
  runId: string;
  version: number;
  createdAt: string;
  status?: string;
  workflowName?: string;
  /** Drop the catalog row's version, as a malformed record would. */
  omitVersion?: boolean;
}

/**
 * Several stored versions of the workflow's run summary, one per run. Like
 * swamp's query service, a predicate that doesn't mention version/isLatest
 * sees only the latest version.
 */
function runHistory(
  runs: RunFixture[],
  stepOutputs: { name: string; modelName: string; workflowRunId: string }[] =
    [],
) {
  const summaries = new Map(runs.map((r) => [r.version, {
    ...SUMMARY,
    workflowName: r.workflowName ?? SUMMARY.workflowName,
    workflowRunId: r.runId,
    status: r.status ?? "succeeded",
  }]));
  const records = runs.map((r) => ({
    ownerRef: "wf-id-1",
    name: "report-swamp-workflow-summary-json",
    ...(r.omitVersion === true ? {} : { version: r.version }),
    createdAt: r.createdAt,
    content: "",
  }));
  const latestVersion = Math.max(...runs.map((r) => r.version));
  const latest = records[runs.findIndex((r) => r.version === latestVersion)];
  let reads = 0;
  const queryData = (predicate: string) => {
    if (predicate.includes("report-swamp-workflow-summary-json")) {
      return Promise.resolve(
        predicate.includes("version >") ? records : [latest],
      );
    }
    if (predicate.includes("workflowRunId")) {
      const requiredModel = predicate.match(/modelName == "([^"]+)"/)?.[1];
      return Promise.resolve(
        stepOutputs.filter((output) =>
          predicate.includes(`workflowRunId == "${output.workflowRunId}"`) &&
          predicate.includes(`"${output.name}"`) &&
          (requiredModel === undefined || output.modelName === requiredModel)
        ),
      );
    }
    return Promise.resolve([]);
  };
  const dataRepository = {
    findAllForModel: () => Promise.resolve([]),
    getContent: (
      _t: unknown,
      _id: string,
      _name: string,
      version?: number,
    ) => {
      reads++;
      const summary = summaries.get(version ?? latestVersion);
      return Promise.resolve(
        summary === undefined
          ? null
          : new TextEncoder().encode(JSON.stringify(summary)),
      );
    },
  };
  return { queryData, dataRepository, reads: () => reads };
}

// PROBE-A's run (run-A) finished first; a sibling's run-B is the latest.
const RUN_A = {
  runId: "run-A",
  version: 1,
  createdAt: "2026-06-11T11:40:00.000Z",
};
const RUN_B = {
  runId: "run-B",
  version: 2,
  createdAt: "2026-06-11T11:50:00.000Z",
};

const RUN_TESTS_GATE: GateSpec = {
  type: "workflow-succeeded",
  config: { workflow: "@acme/run-tests" },
};

function outcome(runId: string, cycle = 1) {
  return evidenceView({
    name: "test-run",
    cycle,
    payload: { status: "succeeded", runId },
  });
}

Deno.test("workflow-succeeded: a sibling's newer run does not satisfy an unbound work item", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      ...runHistory([RUN_B]),
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "no run of workflow");
  assertStringIncludes(result.reasons[0], "record_evidence name=test-run");
});

Deno.test("workflow-succeeded: resultEvidence binds the work item's own run", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-A")]],
      ...runHistory([RUN_A, { ...RUN_B, status: "failed" }]),
    }),
  );
  assert(result.pass, result.reasons.join("; "));
});

Deno.test("workflow-succeeded: a bound failed run fails despite a newer successful sibling", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-A")]],
      ...runHistory([{ ...RUN_A, status: "failed" }, RUN_B]),
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "run run-A of workflow");
  assertStringIncludes(result.reasons[0], "'failed'");
});

Deno.test("workflow-succeeded: a bound run with no summary fails naming the run", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-cancelled")]],
      ...runHistory([RUN_A, RUN_B]),
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "run-cancelled");
  assertStringIncludes(result.reasons[0], "resultEvidence 'test-run'");
  assertStringIncludes(result.reasons[0], "cancelled");
});

Deno.test("workflow-succeeded: a bound run of another workflow is rejected", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-A")]],
      ...runHistory([{ ...RUN_A, workflowName: "@acme/lint" }]),
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "'@acme/lint'");
});

Deno.test("workflow-succeeded: resultEvidence from an earlier entry does not bind", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      state: { cycles: { review: 2 } },
      evidence: [["test-run", outcome("run-A", 1)]],
      ...runHistory([RUN_A, RUN_B]),
    }),
  );
  assert(!result.pass);
  assertStringIncludes(result.reasons[0], "no run of workflow");
});

Deno.test("workflow-succeeded: record_dispatch runId binds when no outcome is recorded", async () => {
  const bound = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs(),
      state: { dispatches: { review: { cycle: 1, count: 1, runId: "run-A" } } },
      ...runHistory([RUN_A, { ...RUN_B, status: "failed" }]),
    }),
  );
  assert(bound.pass, bound.reasons.join("; "));

  // A runId from an earlier entry is ignored; with no resultEvidence the
  // gate falls back to the latest run.
  const stale = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs(),
      state: {
        cycles: { review: 2 },
        dispatches: { review: { cycle: 1, count: 1, runId: "run-A" } },
      },
      ...runHistory([RUN_A, { ...RUN_B, status: "failed" }]),
    }),
  );
  assert(!stale.pass);
  assertStringIncludes(stale.reasons[0], "latest run");
});

Deno.test("workflow-succeeded: resultEvidence's runId wins over record_dispatch's", async () => {
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      state: { dispatches: { review: { cycle: 1, count: 1, runId: "run-B" } } },
      evidence: [["test-run", outcome("run-A")]],
      ...runHistory([RUN_A, { ...RUN_B, status: "failed" }]),
    }),
  );
  assert(result.pass, result.reasons.join("; "));
});

Deno.test("workflow-succeeded: requireStepOutputs checks the bound run, not the latest", async () => {
  const gate: GateSpec = {
    type: "workflow-succeeded",
    config: {
      workflow: "@acme/run-tests",
      requireStepOutputs: ["evidence-test-run"],
    },
  };
  const result = await run(
    gate,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-A")]],
      selfName: "issue-1",
      ...runHistory([RUN_A, RUN_B], [{
        name: "evidence-TEST-1-test-run",
        modelName: "issue-1",
        workflowRunId: "run-A",
      }]),
    }),
  );
  assert(result.pass, result.reasons.join("; "));
});

Deno.test("workflow-succeeded: the bound-run scan stops at the first match", async () => {
  const history = runHistory([RUN_A, RUN_B]);
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-A")]],
      ...history,
    }),
  );
  assert(result.pass, result.reasons.join("; "));
  assertEquals(history.reads(), 1);
});

Deno.test("workflow-succeeded: the bound-run scan skips records without a version", async () => {
  // The first row belongs to a stale run but carries no version; an
  // unversioned read would return the latest summary (run-B) and pair it
  // with this row's stale timestamp.
  const result = await run(
    RUN_TESTS_GATE,
    makeContext({
      args: workflowStageArgs("test-run"),
      evidence: [["test-run", outcome("run-B")]],
      ...runHistory([
        {
          runId: "run-old",
          version: 1,
          createdAt: "2026-06-11T09:00:00.000Z",
          omitVersion: true,
        },
        RUN_B,
      ]),
    }),
  );
  assert(result.pass, result.reasons.join("; "));
});

Deno.test("workflow-succeeded: a workflow the stage doesn't run uses the latest run", async () => {
  const result = await run(
    { type: "workflow-succeeded", config: { workflow: "@acme/ci" } },
    makeContext({
      args: workflowStageArgs("test-run"),
      ...runHistory([{ ...RUN_B, workflowName: "@acme/ci" }]),
    }),
  );
  assert(result.pass, result.reasons.join("; "));
});

// ---------------------------------------------------------------------------
// evaluateTransitionGates
// ---------------------------------------------------------------------------

Deno.test("evaluateTransitionGates: aggregates results, gateless passes", async () => {
  const gateless = await evaluateTransitionGates(
    { name: "rework", to: "planning" },
    makeContext(),
  );
  assert(gateless.pass);
  assertEquals(gateless.results, []);

  const mixed = await evaluateTransitionGates(
    {
      name: "approve",
      to: "done",
      gates: [
        { type: "artifact-exists", config: { artifact: "plan" } },
        { type: "human-approval", config: { id: "ship-approval" } },
      ],
    },
    makeContext({ artifacts: [["plan", artifactView({ name: "plan" })]] }),
  );
  assert(!mixed.pass);
  assertEquals(mixed.results.length, 2);
  assert(mixed.results[0].pass);
  assert(!mixed.results[1].pass);
});
