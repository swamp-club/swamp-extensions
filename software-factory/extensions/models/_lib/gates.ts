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

import type {
  FactoryArguments,
  GateSpec,
  TransitionSpec,
} from "./definition_schema.ts";
import { celName, findArtifactSpec } from "./definition_schema.ts";
import type { FindingsPayload } from "./artifact_schema.ts";
import type { DataRepositoryLike, RunState, RunView } from "./run_data.ts";
import { currentCycle, entriesInto } from "./run_data.ts";

// ---------------------------------------------------------------------------
// Gate evaluation. Gates are veto: every gate on a transition must pass for
// `advance`. Failure reasons are agent-facing — they are the error message
// that steers the driver, so they say what is missing and how to satisfy it.
// ---------------------------------------------------------------------------

/** Minimal surface of the CEL environment swamp hands to extensions. */
export interface CelEnvironmentLike {
  evaluate(expression: string, context: Record<string, unknown>): unknown;
}

export interface GateContext {
  args: FactoryArguments;
  state: RunState;
  view: RunView;
  /** The work item this evaluation is scoped to. */
  workItem: string;
  /** The work item's instance-name slug (see run_data.workItemSlug). */
  workItemSlug?: string;
  /** Injectable clock for tests. */
  now: Date;
  /**
   * This factory instance's definition name. Used to scope workflow
   * step-output verification to data written into this instance — without
   * it, parallel factories sharing one workflow could satisfy each other's
   * gates.
   */
  selfName?: string;
  createCelEnvironment?: () => CelEnvironmentLike;
  queryData?: (
    predicate: string,
    select?: string,
  ) => Promise<unknown[]>;
  dataRepository?: DataRepositoryLike;
}

export interface GateResult {
  gate: GateSpec;
  pass: boolean;
  reasons: string[];
}

export interface TransitionGateResults {
  pass: boolean;
  results: GateResult[];
}

export async function evaluateTransitionGates(
  transition: TransitionSpec,
  ctx: GateContext,
): Promise<TransitionGateResults> {
  const results: GateResult[] = [];
  for (const gate of transition.gates ?? []) {
    results.push(await evaluateGate(gate, ctx));
  }
  return { pass: results.every((r) => r.pass), results };
}

export function evaluateGate(
  gate: GateSpec,
  ctx: GateContext,
): Promise<GateResult> {
  switch (gate.type) {
    case "artifact-exists":
      return Promise.resolve(artifactExists(gate, ctx));
    case "artifact-fresh":
      return Promise.resolve(artifactFresh(gate, ctx));
    case "findings-clear":
      return Promise.resolve(findingsClear(gate, ctx));
    case "human-approval":
      return Promise.resolve(humanApproval(gate, ctx));
    case "evidence-recorded":
      return Promise.resolve(evidenceRecorded(gate, ctx));
    case "cooldown":
      return Promise.resolve(cooldown(gate, ctx));
    case "max-cycles":
      return Promise.resolve(maxCycles(gate, ctx));
    case "cel":
      return Promise.resolve(celGate(gate, ctx));
    case "workflow-succeeded":
      return workflowSucceeded(gate, ctx);
  }
}

type GateOf<T extends GateSpec["type"]> = Extract<GateSpec, { type: T }>;

function pass(gate: GateSpec): GateResult {
  return { gate, pass: true, reasons: [] };
}

function fail(gate: GateSpec, ...reasons: string[]): GateResult {
  return { gate, pass: false, reasons };
}

function artifactExists(
  gate: GateOf<"artifact-exists">,
  ctx: GateContext,
): GateResult {
  const name = gate.config.artifact;
  if (ctx.view.artifacts.has(name)) return pass(gate);
  return fail(
    gate,
    `artifact '${name}' has not been recorded — record it with record_artifact`,
  );
}

function artifactFresh(
  gate: GateOf<"artifact-fresh">,
  ctx: GateContext,
): GateResult {
  const name = gate.config.artifact;
  const artifact = ctx.view.artifacts.get(name);
  if (artifact === undefined) {
    return fail(
      gate,
      `artifact '${name}' has not been recorded — record it with record_artifact`,
    );
  }
  const spec = findArtifactSpec(ctx.args, name)?.spec;
  const subjectName = spec?.reviews;
  if (subjectName === undefined) {
    return fail(
      gate,
      `artifact '${name}' declares no reviews: subject — artifact-fresh cannot apply (fix the definition)`,
    );
  }
  const subject = ctx.view.artifacts.get(subjectName);
  if (subject === undefined) {
    return fail(
      gate,
      `subject artifact '${subjectName}' has not been recorded`,
    );
  }
  const reasons: string[] = [];
  if (artifact.latest.subjectVersion !== subject.version) {
    reasons.push(
      `'${name}' reviews '${subjectName}' v${
        artifact.latest.subjectVersion ?? "?"
      } but the current version is v${subject.version} — re-record '${name}' against the current subject`,
    );
  }
  if (gate.config.recordedThisCycle === true) {
    const cycle = currentCycle(ctx.state);
    if (
      artifact.latest.stageId !== ctx.state.stageId ||
      artifact.latest.cycle !== cycle
    ) {
      reasons.push(
        `'${name}' was recorded in stage '${artifact.latest.stageId}' cycle ${artifact.latest.cycle}, not during the current entry into '${ctx.state.stageId}' (cycle ${cycle}) — re-record it this cycle`,
      );
    }
  }
  if (reasons.length > 0) return fail(gate, ...reasons);
  return pass(gate);
}

function findingsClear(
  gate: GateOf<"findings-clear">,
  ctx: GateContext,
): GateResult {
  const name = gate.config.artifact;
  const artifact = ctx.view.artifacts.get(name);
  if (artifact === undefined) {
    return fail(
      gate,
      `findings artifact '${name}' has not been recorded`,
    );
  }
  const payload = artifact.latest.payload as Partial<FindingsPayload>;
  const findings = Array.isArray(payload.findings) ? payload.findings : [];
  const blocking = new Set<string>(gate.config.blocking);
  const unresolved = findings.filter(
    (f) => f.resolved !== true && blocking.has(f.severity),
  );
  if (unresolved.length > 0) {
    const ids = unresolved.map((f) => `${f.id} (${f.severity})`).join(", ");
    return fail(
      gate,
      `${unresolved.length} unresolved blocking finding(s) in '${name}': ${ids} — resolve them with resolve_findings or rework`,
    );
  }
  return pass(gate);
}

function humanApproval(
  gate: GateOf<"human-approval">,
  ctx: GateContext,
): GateResult {
  const id = gate.config.id;
  const min = gate.config.minApprovals ?? 1;
  const cycle = currentCycle(ctx.state);
  const records = (ctx.view.approvals.get(id) ?? []).filter(
    (r) => r.stageId === ctx.state.stageId && r.cycle === cycle,
  );
  const latest = records[records.length - 1];
  if (latest !== undefined && latest.decision === "rejected") {
    return fail(
      gate,
      `'${id}' was rejected by ${latest.actor}${
        latest.note !== undefined ? `: ${latest.note}` : ""
      } — address the feedback, then seek approval again`,
    );
  }
  const approved = records.filter((r) => r.decision === "approved").length;
  if (approved < min) {
    return fail(
      gate,
      `awaiting human approval '${id}' (${approved}/${min}) for stage '${ctx.state.stageId}' cycle ${cycle} — a human must run approve with gateId=${id}`,
    );
  }
  return pass(gate);
}

function evidenceRecorded(
  gate: GateOf<"evidence-recorded">,
  ctx: GateContext,
): GateResult {
  const name = gate.config.name;
  const evidence = ctx.view.evidence.get(name);
  if (evidence === undefined) {
    return fail(
      gate,
      `evidence '${name}' has not been recorded — record it with record_evidence`,
    );
  }
  const cycle = currentCycle(ctx.state);
  if (
    evidence.latest.stageId !== ctx.state.stageId ||
    evidence.latest.cycle !== cycle
  ) {
    return fail(
      gate,
      `evidence '${name}' was recorded in stage '${evidence.latest.stageId}' cycle ${evidence.latest.cycle}, not during the current entry into '${ctx.state.stageId}' (cycle ${cycle}) — record fresh evidence`,
    );
  }
  for (
    const [field, expected] of Object.entries(gate.config.requireField ?? {})
  ) {
    const actual = fieldAtPath(evidence.latest.payload, field);
    if (actual !== expected) {
      return fail(
        gate,
        `evidence '${name}' field '${field}' is ${
          JSON.stringify(actual)
        }, expected ${JSON.stringify(expected)}`,
      );
    }
  }
  return pass(gate);
}

function fieldAtPath(payload: unknown, path: string): unknown {
  let current: unknown = payload;
  for (const segment of path.split(".")) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function cooldown(
  gate: GateOf<"cooldown">,
  ctx: GateContext,
): GateResult {
  let recordedAt: string | undefined;
  let what: string;
  if (gate.config.afterEvidence !== undefined) {
    what = `evidence '${gate.config.afterEvidence}'`;
    recordedAt = ctx.view.evidence.get(gate.config.afterEvidence)?.latest
      .recordedAt;
  } else {
    what = `artifact '${gate.config.afterArtifact}'`;
    recordedAt = gate.config.afterArtifact !== undefined
      ? ctx.view.artifacts.get(gate.config.afterArtifact)?.latest.recordedAt
      : undefined;
  }
  if (recordedAt === undefined) {
    return fail(
      gate,
      `${what} has not been recorded — nothing to cool down from`,
    );
  }
  const elapsed = (ctx.now.getTime() - new Date(recordedAt).getTime()) / 1000;
  if (elapsed < gate.config.seconds) {
    const remaining = Math.ceil(gate.config.seconds - elapsed);
    return fail(
      gate,
      `${what} was recorded ${
        Math.floor(elapsed)
      }s ago — wait ${remaining}s more (${gate.config.seconds}s cooldown)`,
    );
  }
  return pass(gate);
}

function maxCycles(
  gate: GateOf<"max-cycles">,
  ctx: GateContext,
): GateResult {
  const entries = entriesInto(ctx.state, gate.config.stage);
  const under = entries < gate.config.limit;
  const wantUnder = gate.config.invert !== true;
  if (under === wantUnder) return pass(gate);
  if (wantUnder) {
    return fail(
      gate,
      `stage '${gate.config.stage}' has been entered ${entries} time(s), at or over the limit of ${gate.config.limit}`,
    );
  }
  return fail(
    gate,
    `stage '${gate.config.stage}' has been entered ${entries} time(s), under the threshold of ${gate.config.limit}`,
  );
}

/**
 * Build the materialized run-data context for CEL gates: latest artifact
 * and evidence payloads under snake-cased names, plus state, approvals,
 * and the work item.
 */
export function buildCelContext(
  ctx: GateContext,
): Record<string, unknown> {
  const artifacts: Record<string, unknown> = {};
  for (const [name, view] of ctx.view.artifacts) {
    artifacts[celName(name)] = view.latest.payload;
  }
  const evidence: Record<string, unknown> = {};
  for (const [name, view] of ctx.view.evidence) {
    evidence[celName(name)] = view.latest.payload;
  }
  const approvals: Record<string, unknown> = {};
  for (const [gateId, records] of ctx.view.approvals) {
    approvals[celName(gateId.replaceAll(":", "_"))] = records;
  }
  return {
    artifacts,
    evidence,
    approvals,
    state: {
      stageId: ctx.state.stageId,
      cycles: ctx.state.cycles,
      status: ctx.state.status,
    },
    workItem: ctx.workItem,
  };
}

function celGate(
  gate: GateOf<"cel">,
  ctx: GateContext,
): GateResult {
  if (ctx.createCelEnvironment === undefined) {
    return fail(gate, "CEL evaluator unavailable in this execution context");
  }
  let result: unknown;
  try {
    const env = ctx.createCelEnvironment();
    result = env.evaluate(gate.config.expr, buildCelContext(ctx));
  } catch (error) {
    return fail(
      gate,
      `CEL gate evaluation failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  if (result === true) return pass(gate);
  const message = gate.config.message ??
    `CEL gate [${gate.config.expr}] evaluated to ${JSON.stringify(result)}`;
  return fail(gate, message);
}

// ---------------------------------------------------------------------------
// workflow-succeeded: verify against the platform's own workflow run
// records (report-swamp-workflow-summary-json), not driver attestation.
// ---------------------------------------------------------------------------

const WORKFLOW_SUMMARY_NAME = "report-swamp-workflow-summary-json";

interface WorkflowSummary {
  status: string;
  workflowName: string;
  workflowRunId: string;
  failed?: number;
  failures?: unknown[];
}

async function workflowSucceeded(
  gate: GateOf<"workflow-succeeded">,
  ctx: GateContext,
): Promise<GateResult> {
  if (ctx.queryData === undefined || ctx.dataRepository === undefined) {
    return fail(
      gate,
      "workflow run records unavailable in this execution context",
    );
  }
  let records: unknown[];
  try {
    records = await ctx.queryData(
      `name == "${WORKFLOW_SUMMARY_NAME}" && isLatest == true && modelType == "workflow"`,
    );
  } catch (error) {
    return fail(
      gate,
      `workflow run query failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  for (const record of records) {
    const rec = record as Record<string, unknown>;
    const ownerRef = rec.ownerRef;
    if (typeof ownerRef !== "string") continue;
    let summary: WorkflowSummary | null = null;
    const inline = rec.content;
    if (typeof inline === "string" && inline.length > 0) {
      try {
        summary = JSON.parse(inline) as WorkflowSummary;
      } catch {
        summary = null;
      }
    }
    if (summary === null) {
      const content = await ctx.dataRepository.getContent(
        "workflow",
        ownerRef,
        WORKFLOW_SUMMARY_NAME,
      );
      if (content === null) continue;
      try {
        summary = JSON.parse(
          new TextDecoder().decode(content),
        ) as WorkflowSummary;
      } catch {
        continue;
      }
    }
    if (summary.workflowName !== gate.config.workflow) continue;

    if (summary.status !== "succeeded") {
      return fail(
        gate,
        `latest run of workflow '${gate.config.workflow}' (${summary.workflowRunId}) has status '${summary.status}'${
          summary.failed !== undefined && summary.failed > 0
            ? ` with ${summary.failed} failed step(s)`
            : ""
        }`,
      );
    }

    const createdAt = rec.createdAt;
    if (typeof createdAt === "string") {
      const ranAt = new Date(createdAt).getTime();
      const enteredAt = new Date(ctx.state.enteredAt).getTime();
      if (ranAt < enteredAt) {
        return fail(
          gate,
          `latest run of workflow '${gate.config.workflow}' predates the current entry into stage '${ctx.state.stageId}' — run it again for this cycle`,
        );
      }
    }

    for (const required of gate.config.requireStepOutputs ?? []) {
      // Scope to this run's own data: in parallel use, sibling runs share
      // the workflow, and an unscoped match would accept their outputs.
      // Required names are logical ("evidence-test-run"); translate to the
      // work item's physical instance name.
      const physical = physicalStepOutput(required, ctx.workItemSlug);
      const selfClause = ctx.selfName !== undefined
        ? ` && modelName == "${ctx.selfName}"`
        : "";
      let outputs: unknown[];
      try {
        outputs = await ctx.queryData(
          `workflowRunId == "${summary.workflowRunId}" && name == "${physical}"${selfClause}`,
        );
      } catch (error) {
        return fail(
          gate,
          `step-output query failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
      if (outputs.length === 0) {
        return fail(
          gate,
          `verified run ${summary.workflowRunId} did not write required output '${required}'${
            ctx.selfName !== undefined ? ` into run '${ctx.selfName}'` : ""
          }`,
        );
      }
    }

    return pass(gate);
  }

  return fail(
    gate,
    `no run record found for workflow '${gate.config.workflow}' — trigger the workflow first`,
  );
}

/**
 * Translate a logical step-output name to the work item's physical data
 * instance name (artifact-/evidence-<slug>-<name>).
 */
export function physicalStepOutput(
  required: string,
  slug: string | undefined,
): string {
  if (slug === undefined) return required;
  if (required.startsWith("artifact-")) {
    return `artifact-${slug}-${required.slice("artifact-".length)}`;
  }
  if (required.startsWith("evidence-")) {
    return `evidence-${slug}-${required.slice("evidence-".length)}`;
  }
  return required;
}
