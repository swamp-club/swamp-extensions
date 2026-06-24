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

import { z } from "npm:zod@4.3.6";
import type {
  FactoryArguments,
  StageSpec,
  TransitionSpec,
  WorkSpec,
} from "./_lib/definition_schema.ts";
import {
  allApprovalGateIds,
  celName,
  CYCLE_OVERRIDE_PREFIX,
  FactoryArgumentsSchema,
  findArtifactSpec,
  findStage,
  initialStage,
  isGlobalTransition,
  maxCyclesFor,
  maxDispatchesFor,
  PlatformArgumentsSchema,
  transitionsFrom,
} from "./_lib/definition_schema.ts";
import {
  formatIssues,
  validateArtifactPayload,
  validateDeclaredPayload,
  validateOutcomePayload,
} from "./_lib/artifact_schema.ts";
import { validateGraph } from "./_lib/graph.ts";
import type {
  ApprovalRecord,
  ArtifactEnvelope,
  DataRepositoryLike,
  RunState,
  RunView,
  ValidationEnvelope,
} from "./_lib/run_data.ts";
import {
  approvalInstance,
  ApprovalRecordSchema,
  ArtifactEnvelopeSchema,
  artifactInstance,
  currentCycle,
  dispatchAttempts,
  entriesInto,
  EvidenceEnvelopeSchema,
  evidenceInstance,
  JournalEntrySchema,
  journalInstance,
  liveValidation,
  loadAllRunStates,
  loadRunView,
  OVERVIEW_SLUG,
  RunStateSchema,
  stateInstance,
  StatusEnvelopeSchema,
  statusInstance,
  ValidationEnvelopeSchema,
  validationInstance,
  workItemSlug,
} from "./_lib/run_data.ts";
import type { CelEnvironmentLike, GateContext } from "./_lib/gates.ts";
import { evaluateTransitionGates } from "./_lib/gates.ts";
import type { BindingEnvironmentLike } from "./_lib/bindings.ts";
import { prepareBindingEnvironment, resolveBindings } from "./_lib/bindings.ts";
import { renderMermaid, renderTables } from "./_lib/mermaid.ts";
import {
  buildWorkItemSummary,
  queryRunDataReader,
  repositoryRunDataReader,
  reviewsFromStages,
} from "./_lib/summary.ts";

// ---------------------------------------------------------------------------
// Execution context (structural slice of swamp's MethodContext)
// ---------------------------------------------------------------------------

interface Logger {
  info(message: string, props: Record<string, unknown>): void;
  warning(message: string, props: Record<string, unknown>): void;
}

interface DefinitionRepositoryLike {
  findById(
    modelType: unknown,
    id: string,
  ): Promise<
    | {
      name: string;
      version?: number;
      globalArguments: Record<string, unknown>;
    }
    | null
  >;
}

interface Ctx {
  globalArgs: Record<string, unknown>;
  modelType: unknown;
  modelId: string;
  logger: Logger;
  definition?: {
    id: string;
    name: string;
    version: number;
    tags: Record<string, string>;
  };
  definitionRepository?: DefinitionRepositoryLike;
  dataRepository: DataRepositoryLike;
  writeResource: (
    specName: string,
    instanceName: string,
    data: Record<string, unknown>,
  ) => Promise<{ name: string; version?: number }>;
  createCelEnvironment?: () => CelEnvironmentLike & BindingEnvironmentLike;
  queryData?: (predicate: string, select?: string) => Promise<unknown[]>;
  /**
   * Production check contexts carry the query service rather than the
   * executor-derived queryData binding; the engine accepts either.
   */
  dataQueryService?: {
    query(
      predicate: string,
      options?: { select?: string },
    ): Promise<unknown[]>;
  };
}

function queryDataFrom(context: Ctx): Ctx["queryData"] {
  if (context.queryData !== undefined) return context.queryData;
  const service = context.dataQueryService;
  if (service === undefined) return undefined;
  return (predicate, select) => service.query(predicate, { select });
}

type CheckCtx = Ctx & {
  methodName: string;
  unresolvedMethodArgs?: Record<string, unknown>;
};

interface CheckResult {
  pass: boolean;
  errors?: string[];
}

// ---------------------------------------------------------------------------
// Engine helpers
// ---------------------------------------------------------------------------

/**
 * Load the factory definition from the raw definition file (via the
 * definition repository) rather than context.globalArgs: the platform's
 * globalArgs proxy throws on access to fields containing unresolved
 * `${{ }}` expressions, and stage config legitimately embeds them as
 * run-data bindings. Falls back to context.globalArgs when no repository
 * is available (tests, simple harnesses).
 */
async function loadFactoryArgs(
  context: Pick<
    Ctx,
    "globalArgs" | "modelType" | "modelId" | "definitionRepository"
  >,
): Promise<{ args: FactoryArguments; definitionName: string }> {
  let raw: Record<string, unknown> | undefined;
  let definitionName = "";
  if (context.definitionRepository !== undefined) {
    const definition = await context.definitionRepository.findById(
      context.modelType,
      context.modelId,
    );
    if (definition !== null) {
      raw = definition.globalArguments;
      definitionName = definition.name;
    }
  }
  if (raw === undefined) {
    raw = context.globalArgs;
  }
  const parsed = FactoryArgumentsSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      "Invalid factory definition globalArguments:\n  " +
        formatIssues(parsed.error).join("\n  "),
    );
  }
  return { args: parsed.data, definitionName };
}

/** Load one work item's run view on this instance. */
async function viewFor(
  context: Ctx,
  slug: string,
): Promise<RunView> {
  return await loadRunView(
    context.dataRepository,
    context.modelType,
    context.modelId,
    slug,
  );
}

function requireState(view: RunView, workItem: string): RunState {
  if (view.state === null) {
    throw new Error(
      `No run for work item '${workItem}'. Run 'start' with workItem=${workItem} first.`,
    );
  }
  return view.state;
}

function requireActive(state: RunState): void {
  if (state.status === "terminal") {
    throw new Error(
      `Run for work item '${state.workItem}' is terminal (stage '${state.stageId}'). ` +
        "Use 'reset' to start it over.",
    );
  }
}

function requireCurrentStage(
  args: FactoryArguments,
  state: RunState,
): StageSpec {
  const stage = findStage(args, state.stageId);
  if (stage === undefined) {
    throw new Error(
      `Current stage '${state.stageId}' no longer exists in the definition. ` +
        "The definition changed incompatibly mid-run — restore the stage or 'reset'.",
    );
  }
  return stage;
}

function resolveTransition(
  args: FactoryArguments,
  stage: StageSpec,
  name: string,
): TransitionSpec {
  const available = transitionsFrom(args, stage);
  const transition = available.find((t) => t.name === name);
  if (transition === undefined) {
    const names = available.map((t) => t.name).join(", ") || "(none)";
    throw new Error(
      `Transition '${name}' is not available from stage '${stage.id}'. Available: ${names}`,
    );
  }
  return transition;
}

function approvedOverrides(view: RunView, stageId: string): number {
  const records = view.approvals.get(`${CYCLE_OVERRIDE_PREFIX}${stageId}`) ??
    [];
  return records.filter((r) => r.decision === "approved").length;
}

interface CycleLimit {
  entries: number;
  limit: number;
  overrides: number;
  allowed: boolean;
}

function cycleLimitFor(
  args: FactoryArguments,
  view: RunView,
  state: RunState,
  targetStageId: string,
): CycleLimit {
  const target = findStage(args, targetStageId);
  const limit = target !== undefined ? maxCyclesFor(target) : 0;
  const entries = entriesInto(state, targetStageId);
  const overrides = approvedOverrides(view, targetStageId);
  return {
    entries,
    limit,
    overrides,
    allowed: entries < limit + overrides,
  };
}

function cycleLimitError(targetStageId: string, limit: CycleLimit): string {
  return `Stage '${targetStageId}' has been entered ${limit.entries} time(s) ` +
    `(limit ${limit.limit}${
      limit.overrides > 0 ? ` + ${limit.overrides} override(s)` : ""
    }). A human must grant one more entry with: ` +
    `approve gateId=${CYCLE_OVERRIDE_PREFIX}${targetStageId} — or take an escalation/abort transition.`;
}

function stageNotExecutedError(stageId: string, workItem: string): string {
  return `Stage '${stageId}' has no recorded execution this cycle. Call ` +
    `record_dispatch (workItem=${workItem}) before advancing — the stage's ` +
    `work must run through the factory so it cannot be skipped.`;
}

/** Whether advancing this transition requires a dispatch record first: a
 * work-bearing stage leaving by one of its own (non-global) transitions. */
function requiresDispatch(
  args: FactoryArguments,
  stage: StageSpec,
  transitionName: string,
): boolean {
  return stage.work !== undefined &&
    !isGlobalTransition(args, transitionName) &&
    (stage.transitions ?? []).some((t) => t.name === transitionName);
}

function gateContextFrom(
  context: Ctx,
  args: FactoryArguments,
  state: RunState,
  view: RunView,
  workItem: string,
  slug: string,
): GateContext {
  return {
    args,
    state,
    view,
    workItem,
    workItemSlug: slug,
    now: new Date(),
    selfName: context.definition?.name,
    createCelEnvironment: context.createCelEnvironment,
    queryData: queryDataFrom(context),
    dataRepository: context.dataRepository,
  };
}

function formatGateFailures(
  results: { gate: { type: string }; pass: boolean; reasons: string[] }[],
): string {
  const failing = results.filter((r) => !r.pass);
  return failing
    .map((r) => `[${r.gate.type}] ${r.reasons.join("; ")}`)
    .join("\n  ");
}

async function writeJournal(
  context: Ctx,
  workItem: string,
  slug: string,
  entry: {
    event: string;
    stageId?: string;
    summary: string;
    payload?: Record<string, unknown>;
  },
): Promise<{ name: string }> {
  return await context.writeResource("journal", journalInstance(slug), {
    ...entry,
    workItem,
    at: new Date().toISOString(),
  });
}

/**
 * Persist a payload-validation failure so a retry can bind it back as feedback
 * (`data.latest(self.name, "validation-<target>")`). Written just before the
 * record method re-throws; the platform keeps writes that precede a throw
 * (method_execution_service collects persisted handles on the error path), so
 * the bad payload is still rejected while its diagnosis survives.
 */
async function recordValidationFailure(
  context: Ctx,
  slug: string,
  envelope: ValidationEnvelope,
): Promise<void> {
  await context.writeResource(
    "validation",
    validationInstance(slug, envelope.target),
    envelope as unknown as Record<string, unknown>,
  );
}

/**
 * Clear an open validation record once its target records cleanly, so a later
 * read (or a fresh stage entry) never binds a stale failure. No-op when none
 * is open.
 */
async function clearValidationIfOpen(
  context: Ctx,
  view: RunView,
  slug: string,
  target: string,
  state: RunState,
): Promise<{ name: string; version?: number } | undefined> {
  const open = liveValidation(view, target);
  if (open === undefined) return undefined;
  const cleared: ValidationEnvelope = {
    target: open.latest.target,
    targetKind: open.latest.targetKind,
    workItem: open.latest.workItem,
    stageId: state.stageId,
    cycle: currentCycle(state),
    attempt: dispatchAttempts(state, state.stageId, currentCycle(state)),
    cleared: true,
    errors: [],
    recordedAt: new Date().toISOString(),
  };
  return await context.writeResource(
    "validation",
    validationInstance(slug, target),
    cleared as unknown as Record<string, unknown>,
  );
}

function normalizePayload(payload: unknown): Record<string, unknown> {
  let value = payload;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      throw new Error(
        "payload must be a JSON object (or a string containing one)",
      );
    }
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("payload must be a JSON object");
  }
  return value as Record<string, unknown>;
}

/** Evidence names a stage declares (explicit + implicit resultEvidence). */
function stageEvidenceNames(stage: StageSpec): string[] {
  const names = (stage.evidence ?? []).map((e) => e.name);
  if (stage.work?.resultEvidence !== undefined) {
    names.push(stage.work.resultEvidence);
  }
  return names;
}

/**
 * What's keeping a stage's current entry from advancing: declared products
 * not yet recorded this cycle, plus the gate reasons still failing. Powers the
 * loud feedback on repeat dispatch and the runaway-loop diagnostics.
 */
async function stageExecutionDiagnostics(
  context: Ctx,
  args: FactoryArguments,
  state: RunState,
  view: RunView,
  workItem: string,
  slug: string,
  stage: StageSpec,
): Promise<{ missing: string[]; gateReasons: string[] }> {
  const cycle = currentCycle(state);
  const recordedThisCycle = (
    rec: { latest: { stageId: string; cycle: number } } | undefined,
  ) =>
    rec !== undefined && rec.latest.stageId === stage.id &&
    rec.latest.cycle === cycle;

  const missing: string[] = [];
  for (const spec of stage.artifacts ?? []) {
    if (!recordedThisCycle(view.artifacts.get(spec.name))) {
      missing.push(`artifact '${spec.name}'`);
    }
  }
  for (const name of stageEvidenceNames(stage)) {
    if (!recordedThisCycle(view.evidence.get(name))) {
      missing.push(`evidence '${name}'`);
    }
  }

  const gateCtx = gateContextFrom(context, args, state, view, workItem, slug);
  const gateReasons: string[] = [];
  for (const t of transitionsFrom(args, stage)) {
    if (isGlobalTransition(args, t.name)) continue;
    const evaluated = await evaluateTransitionGates(t, gateCtx);
    for (const r of evaluated.results) {
      if (!r.pass) {
        gateReasons.push(`[${t.name}/${r.gate.type}] ${r.reasons.join("; ")}`);
      }
    }
  }
  return { missing, gateReasons };
}

/** Loud, actionable feedback for a repeat dispatch (warning) or a tripped cap
 * (fatal). `fatal` is the runaway-loop-suspected hard stop. */
function formatDispatchFeedback(
  stage: StageSpec,
  cycle: number,
  attempt: number,
  limit: number,
  diag: { missing: string[]; gateReasons: string[] },
  fatal: boolean,
): string {
  const lines: string[] = [];
  lines.push(
    fatal
      ? `runaway-loop-suspected: stage '${stage.id}' dispatched ${attempt} time(s) this entry ` +
        `(cycle ${cycle}, limit ${limit}) — refusing to dispatch again.`
      : `repeat-dispatch warning: stage '${stage.id}' dispatched ${attempt}/${limit} time(s) ` +
        `this entry (cycle ${cycle}). One dispatch left before the loop guard hard-fails.`,
  );
  lines.push(
    diag.missing.length > 0
      ? `Products not yet recorded for this entry: ${diag.missing.join(", ")}.`
      : `All declared products are recorded for this entry.`,
  );
  if (diag.gateReasons.length > 0) {
    lines.push("Gate(s) still failing:\n  " + diag.gateReasons.join("\n  "));
  }
  lines.push(
    diag.missing.length > 0
      ? `Do NOT re-dispatch. The stage ran but did not record ${
        diag.missing.join(", ")
      } — verify the work actually wrote it (swamp data query …); if it didn't, ` +
        `the work spec or the recording step is the defect, not the gate.`
      : `Do NOT re-dispatch. The products exist but a gate is failing for another ` +
        `reason — address the gate reasons above, not the dispatch.`,
  );
  lines.push("Attempt history is in the journal ('dispatched' events).");
  return lines.join("\n");
}

const WorkItemArg = z.string().min(1).describe(
  "Work item this call is scoped to (issue id, ticket URL, anything)",
);

// ---------------------------------------------------------------------------
// Status rendering
// ---------------------------------------------------------------------------

interface ContextManifestEntry {
  name: string;
  type: "artifact" | "evidence";
  role: "subject" | "own" | "lineage" | "evidence";
  declaredIn: string;
  recorded: boolean;
  version?: number;
  stageId?: string;
  cycle?: number;
}

async function buildStatus(
  context: Ctx,
  args: FactoryArguments,
  state: RunState,
  view: RunView,
  workItem: string,
  slug: string,
): Promise<Record<string, unknown>> {
  const stage = requireCurrentStage(args, state);
  const cycle = currentCycle(state);

  // Per-transition gate evaluation.
  const gateCtx = gateContextFrom(context, args, state, view, workItem, slug);
  const transitions: Record<string, unknown>[] = [];
  for (const t of transitionsFrom(args, stage)) {
    const evaluated = await evaluateTransitionGates(t, gateCtx);
    const limit = cycleLimitFor(args, view, state, t.to);
    transitions.push({
      name: t.name,
      to: t.to,
      manual: t.manual === true,
      satisfied: evaluated.pass && limit.allowed,
      cycleLimitBlocked: !limit.allowed,
      gates: evaluated.results.map((r) => ({
        type: r.gate.type,
        pass: r.pass,
        reasons: r.reasons,
      })),
    });
  }

  // Context manifest: everything recorded or declared, with roles.
  const subjects = new Set(
    (stage.artifacts ?? [])
      .map((a) => a.reviews)
      .filter((s): s is string => s !== undefined),
  );
  const ownNames = new Set((stage.artifacts ?? []).map((a) => a.name));
  const manifest: ContextManifestEntry[] = [];
  for (const s of args.stages) {
    for (const spec of s.artifacts ?? []) {
      const recorded = view.artifacts.get(spec.name);
      manifest.push({
        name: spec.name,
        type: "artifact",
        role: subjects.has(spec.name)
          ? "subject"
          : ownNames.has(spec.name)
          ? "own"
          : "lineage",
        declaredIn: s.id,
        recorded: recorded !== undefined,
        version: recorded?.version,
        stageId: recorded?.latest.stageId,
        cycle: recorded?.latest.cycle,
      });
    }
    for (const name of stageEvidenceNames(s)) {
      const recorded = view.evidence.get(name);
      manifest.push({
        name,
        type: "evidence",
        role: "evidence",
        declaredIn: s.id,
        recorded: recorded !== undefined,
        version: recorded?.version,
        stageId: recorded?.latest.stageId,
        cycle: recorded?.latest.cycle,
      });
    }
  }

  // Resolve run-data bindings in the work spec, when an evaluator exists.
  let work: WorkSpec | undefined = stage.work;
  let unresolvedBindings: { expression: string; error: string }[] = [];
  if (stage.work !== undefined && context.createCelEnvironment !== undefined) {
    const env = context.createCelEnvironment();
    const celContext = prepareBindingEnvironment(
      env,
      context.definition?.name ?? "",
      { workItem },
      view,
    );
    const resolved = resolveBindings(
      stage.work,
      (expression) => env.evaluate(expression, celContext),
    );
    work = resolved.value;
    unresolvedBindings = resolved.unresolved;
  }

  // Validate the resolved method/workflow inputs against the stage's declared
  // inputsSchema. This catches an upstream value that drifted shape (a list
  // recorded as a string, a number as text) at the boundary the factory owns,
  // before the driver dispatches it into a strict downstream method. Skipped
  // while bindings are still unresolved — the inputs aren't complete yet.
  const invalidInputs: { path: string; message: string }[] = [];
  if (
    stage.work?.inputsSchema !== undefined &&
    work !== undefined &&
    unresolvedBindings.length === 0
  ) {
    const resolvedInputs = work.method?.inputs ?? work.workflow?.inputs;
    if (resolvedInputs !== undefined) {
      const issues = validateDeclaredPayload(
        stage.work.inputsSchema,
        resolvedInputs,
      );
      for (const issue of issues ?? []) {
        const sep = issue.indexOf(": ");
        invalidInputs.push(
          sep >= 0
            ? { path: issue.slice(0, sep), message: issue.slice(sep + 2) }
            : { path: "(root)", message: issue },
        );
      }
    }
  }

  const cycles: Record<string, { entries: number; limit: number }> = {};
  for (const s of args.stages) {
    cycles[s.id] = {
      entries: entriesInto(state, s.id),
      limit: maxCyclesFor(s),
    };
  }

  const pendingApprovals = transitions.flatMap((t) =>
    (t.gates as { type: string; pass: boolean }[])
      .filter((g) => g.type === "human-approval" && !g.pass)
      .map(() => t.name as string)
  );

  return {
    started: true,
    workItem,
    definitionVersion: state.definitionVersion,
    stage: {
      id: stage.id,
      description: stage.description,
      terminal: stage.terminal === true,
      cycle,
      maxCycles: maxCyclesFor(stage),
    },
    status: state.status,
    dispatch: {
      cycle,
      attempts: dispatchAttempts(state, stage.id, cycle),
      limit: maxDispatchesFor(stage),
      // A work-bearing stage must be dispatched (record_dispatch) before it
      // can advance, so its execution is provable and can't be skipped.
      required: stage.work !== undefined,
      executed: dispatchAttempts(state, stage.id, cycle) >= 1,
    },
    // Open (uncleared) payload-validation failures, bindable as retry feedback
    // via data.latest(self.name, "validation-<target>").
    validations: [...view.validations.values()]
      .filter((v) => !v.latest.cleared)
      .map((v) => ({
        target: v.latest.target,
        targetKind: v.latest.targetKind,
        stageId: v.latest.stageId,
        cycle: v.latest.cycle,
        attempt: v.latest.attempt,
        errors: v.latest.errors,
      })),
    work,
    unresolvedBindings,
    invalidInputs,
    transitions,
    contextManifest: manifest,
    cycles,
    pendingApprovals,
  };
}

// ---------------------------------------------------------------------------
// Model definition
// ---------------------------------------------------------------------------

const MUTATING_METHODS = [
  "record_dispatch",
  "record_artifact",
  "record_evidence",
  "resolve_findings",
  "approve",
  "reject",
  "advance",
];

/** Extract the workItem a check should scope to; null when unavailable. */
function checkWorkItem(context: CheckCtx): string | null {
  const workItem = context.unresolvedMethodArgs?.workItem;
  return typeof workItem === "string" && workItem.length > 0 ? workItem : null;
}

async function checkState(
  context: CheckCtx,
  workItem: string,
): Promise<RunState | null> {
  const view = await viewFor(context, workItemSlug(workItem));
  return view.state;
}

export const model = {
  type: "@swamp/software-factory",
  version: "2026.06.24.1",
  globalArguments: PlatformArgumentsSchema,
  reports: ["@swamp/software-factory/work-item-summary"],

  resources: {
    "state": {
      description:
        "Per-work-item stage, cycle counts, and run status (instances: state-<workItem>)",
      // Typed envelope: the resource layer validates structure on every write
      // (payloads are validated separately against their declared schema).
      schema: RunStateSchema,
      lifetime: "infinite" as const,
      garbageCollection: 25,
    },
    "artifact": {
      description:
        "Versioned, schema-validated data products (instances: artifact-<workItem>-<name>)",
      schema: ArtifactEnvelopeSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    "evidence": {
      description:
        "Schema-validated external facts recorded by the driver (instances: evidence-<workItem>-<name>)",
      schema: EvidenceEnvelopeSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    "approval": {
      description:
        "Human gate decisions, cycle-scoped (instances: approval-<workItem>-<gateId>)",
      schema: ApprovalRecordSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    "validation": {
      description:
        "Recorded payload-validation failures, bindable as retry feedback (instances: validation-<workItem>-<target>)",
      schema: ValidationEnvelopeSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    "journal": {
      description:
        "Append-only audit trail per work item (instances: journal-<workItem>)",
      schema: JournalEntrySchema,
      lifetime: "infinite" as const,
      garbageCollection: 200,
    },
    "status": {
      description:
        "Materialized 'what is required next' view, refreshed on every status " +
        "call and queryable with `swamp data query` (instances: " +
        "status-<workItem>, status-_factory for the fleet overview)",
      // Permissive envelope: the view is large and partly dynamic; the driver
      // projects exact fields via --select rather than reading the whole blob.
      schema: StatusEnvelopeSchema,
      lifetime: "infinite" as const,
      // A read-time cache, not history — keep only the last few refreshes.
      garbageCollection: 3,
    },
  },

  checks: {
    "run-started": {
      description:
        "Every mutating method requires a started run for its work item",
      labels: ["policy"],
      appliesTo: MUTATING_METHODS,
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const workItem = checkWorkItem(context);
        if (workItem === null) return { pass: true }; // method validates
        const state = await checkState(context, workItem);
        if (state === null) {
          return {
            pass: false,
            errors: [
              `No run for work item '${workItem}'. Run 'start' with workItem=${workItem} first.`,
            ],
          };
        }
        return { pass: true };
      },
    },

    "not-terminal": {
      description: "Terminal runs reject all mutating methods",
      labels: ["policy"],
      appliesTo: MUTATING_METHODS,
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const workItem = checkWorkItem(context);
        if (workItem === null) return { pass: true };
        const state = await checkState(context, workItem);
        if (state === null) return { pass: true }; // run-started reports it
        if (state.status === "terminal") {
          return {
            pass: false,
            errors: [
              `Run for work item '${workItem}' is terminal (stage '${state.stageId}'). Use 'reset' to start it over.`,
            ],
          };
        }
        return { pass: true };
      },
    },

    "graph-valid": {
      description:
        "The definition parses, the graph is valid, and the run's current stage exists",
      labels: ["policy"],
      appliesTo: ["start", "reset", ...MUTATING_METHODS],
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        let args: FactoryArguments;
        try {
          ({ args } = await loadFactoryArgs(context));
        } catch (error) {
          return {
            pass: false,
            errors: [error instanceof Error ? error.message : String(error)],
          };
        }
        const { errors } = validateGraph(args);
        if (errors.length > 0) {
          return {
            pass: false,
            errors: errors.map((e) => `definition: ${e}`),
          };
        }
        const workItem = checkWorkItem(context);
        if (workItem !== null) {
          const state = await checkState(context, workItem);
          if (state !== null && findStage(args, state.stageId) === undefined) {
            return {
              pass: false,
              errors: [
                `Current stage '${state.stageId}' no longer exists in the definition.`,
              ],
            };
          }
        }
        return { pass: true };
      },
    },

    "valid-transition": {
      description:
        "advance's transition must exist from the current stage (or be global)",
      labels: ["policy"],
      appliesTo: ["advance"],
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const name = context.unresolvedMethodArgs?.transition;
        const workItem = checkWorkItem(context);
        if (typeof name !== "string" || workItem === null) {
          return { pass: true }; // method validates
        }
        let args: FactoryArguments;
        try {
          ({ args } = await loadFactoryArgs(context));
        } catch {
          return { pass: true }; // graph-valid reports it
        }
        const state = await checkState(context, workItem);
        if (state === null) return { pass: true }; // run-started reports it
        const stage = findStage(args, state.stageId);
        if (stage === undefined) return { pass: true }; // graph-valid reports it
        const available = transitionsFrom(args, stage);
        if (!available.some((t) => t.name === name)) {
          const names = available.map((t) => t.name).join(", ") || "(none)";
          return {
            pass: false,
            errors: [
              `Transition '${name}' is not available from stage '${stage.id}'. Available: ${names}`,
            ],
          };
        }
        return { pass: true };
      },
    },

    "gates-satisfied": {
      description: "All gates on the chosen transition must pass",
      labels: ["policy"],
      appliesTo: ["advance"],
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const name = context.unresolvedMethodArgs?.transition;
        const workItem = checkWorkItem(context);
        if (typeof name !== "string" || workItem === null) {
          return { pass: true };
        }
        let args: FactoryArguments;
        try {
          ({ args } = await loadFactoryArgs(context));
        } catch {
          return { pass: true };
        }
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        if (view.state === null) return { pass: true };
        const stage = findStage(args, view.state.stageId);
        if (stage === undefined) return { pass: true };
        const transition = transitionsFrom(args, stage).find(
          (t) => t.name === name,
        );
        if (transition === undefined) return { pass: true }; // valid-transition reports it
        const evaluated = await evaluateTransitionGates(
          transition,
          gateContextFrom(context, args, view.state, view, workItem, slug),
        );
        if (!evaluated.pass) {
          return {
            pass: false,
            errors: evaluated.results
              .filter((r) => !r.pass)
              .map((r) => `[${r.gate.type}] ${r.reasons.join("; ")}`),
          };
        }
        return { pass: true };
      },
    },

    "cycle-limits": {
      description:
        "Entering a stage past its maxCycles requires a human cycle-override approval",
      labels: ["policy"],
      appliesTo: ["advance"],
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const name = context.unresolvedMethodArgs?.transition;
        const workItem = checkWorkItem(context);
        if (typeof name !== "string" || workItem === null) {
          return { pass: true };
        }
        let args: FactoryArguments;
        try {
          ({ args } = await loadFactoryArgs(context));
        } catch {
          return { pass: true };
        }
        const view = await viewFor(context, workItemSlug(workItem));
        if (view.state === null) return { pass: true };
        const stage = findStage(args, view.state.stageId);
        if (stage === undefined) return { pass: true };
        const transition = transitionsFrom(args, stage).find(
          (t) => t.name === name,
        );
        if (transition === undefined) return { pass: true };
        const limit = cycleLimitFor(args, view, view.state, transition.to);
        if (!limit.allowed) {
          return {
            pass: false,
            errors: [cycleLimitError(transition.to, limit)],
          };
        }
        return { pass: true };
      },
    },

    "stage-executed": {
      description:
        "Advancing out of a work-bearing stage requires a recorded dispatch for the current entry — the stage's work must run through the factory",
      labels: ["policy"],
      appliesTo: ["advance"],
      execute: async (context: CheckCtx): Promise<CheckResult> => {
        const name = context.unresolvedMethodArgs?.transition;
        const workItem = checkWorkItem(context);
        if (typeof name !== "string" || workItem === null) {
          return { pass: true };
        }
        let args: FactoryArguments;
        try {
          ({ args } = await loadFactoryArgs(context));
        } catch {
          return { pass: true };
        }
        // Escape-hatch (global) transitions stay available unconditionally.
        if (isGlobalTransition(args, name)) return { pass: true };
        const state = await checkState(context, workItem);
        if (state === null) return { pass: true };
        const stage = findStage(args, state.stageId);
        if (stage === undefined || stage.work === undefined) {
          return { pass: true };
        }
        if (!(stage.transitions ?? []).some((t) => t.name === name)) {
          return { pass: true }; // valid-transition reports unknown names
        }
        if (dispatchAttempts(state, stage.id, currentCycle(state)) < 1) {
          return {
            pass: false,
            errors: [stageNotExecutedError(stage.id, workItem)],
          };
        }
        return { pass: true };
      },
    },
  },

  methods: {
    start: {
      description:
        "Validate the definition and start a run for a work item at the initial stage. Fails if that work item already has a run (resume with 'status').",
      arguments: z.object({ workItem: WorkItemArg }),
      execute: async (
        methodArgs: { workItem: string },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const { errors, warnings } = validateGraph(args);
        if (errors.length > 0) {
          throw new Error(
            "Definition is invalid:\n  " + errors.join("\n  "),
          );
        }
        for (const warning of warnings) {
          context.logger.warning("definition: {warning}", { warning });
        }

        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        if (view.state !== null) {
          throw new Error(
            `Work item '${workItem}' already has a run (stage '${view.state.stageId}'). ` +
              "Resume with 'status'; use 'reset' to start it over.",
          );
        }

        const initial = initialStage(args);
        if (initial === undefined) {
          throw new Error("Definition has no initial stage."); // unreachable after validateGraph
        }

        const now = new Date().toISOString();
        const handles = [];
        handles.push(
          await context.writeResource("state", stateInstance(slug), {
            workItem,
            stageId: initial.id,
            cycles: { [initial.id]: 1 },
            enteredAt: now,
            status: "active",
            definitionVersion: context.definition?.version ?? 1,
            startedAt: now,
          }),
        );
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "started",
            stageId: initial.id,
            summary: `Run started for '${workItem}' at stage '${initial.id}'`,
            payload: { workItem, stage: initial.id },
          }),
        );
        context.logger.info(
          "Run started for '{workItem}' at stage '{stage}'",
          { workItem, stage: initial.id },
        );
        return { dataHandles: handles };
      },
    },

    reset: {
      description:
        "Destroy a work item's run progress and re-enter the initial stage. Requires confirm=reset.",
      arguments: z.object({
        workItem: WorkItemArg,
        confirm: z.string().describe("Must be the literal string 'reset'"),
      }),
      execute: async (
        methodArgs: { workItem: string; confirm: string },
        context: Ctx,
      ) => {
        if (methodArgs.confirm !== "reset") {
          throw new Error(
            "Refusing to reset: pass confirm=reset to destroy run progress.",
          );
        }
        const { args } = await loadFactoryArgs(context);
        const { errors } = validateGraph(args);
        if (errors.length > 0) {
          throw new Error(
            "Definition is invalid:\n  " + errors.join("\n  "),
          );
        }
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const previous = view.state;

        const initial = initialStage(args);
        if (initial === undefined) {
          throw new Error("Definition has no initial stage.");
        }
        const now = new Date().toISOString();
        const handles = [];
        handles.push(
          await context.writeResource("state", stateInstance(slug), {
            workItem,
            stageId: initial.id,
            cycles: { [initial.id]: 1 },
            enteredAt: now,
            status: "active",
            definitionVersion: context.definition?.version ?? 1,
            startedAt: now,
          }),
        );
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "reset",
            stageId: initial.id,
            summary: previous !== null
              ? `Run reset from stage '${previous.stageId}' back to '${initial.id}'`
              : `Run reset (no prior state) to '${initial.id}'`,
            payload: { previousStage: previous?.stageId },
          }),
        );
        context.logger.info("Run for '{workItem}' reset to stage '{stage}'", {
          workItem,
          stage: initial.id,
        });
        return { dataHandles: handles };
      },
    },

    record_dispatch: {
      description:
        "Record that the current stage's work is being executed — call this BEFORE dispatching subagents / running a workflow or method. It proves the stage ran (so it can't be skipped) and drives the runaway-loop guard: re-dispatching the same stage entry warns loudly, and the third attempt is rejected.",
      arguments: z.object({
        workItem: WorkItemArg,
        stageId: z.string().optional().describe(
          "The stage being executed; defaults to the current stage",
        ),
        mode: z.string().optional().describe(
          "Work mode being executed (interactive|dispatch|workflow|method)",
        ),
        runId: z.string().optional().describe(
          "Workflow/method run id, for the audit trail",
        ),
        note: z.string().optional(),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          stageId?: string;
          mode?: string;
          runId?: string;
          note?: string;
        },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const state = requireState(view, workItem);
        requireActive(state);
        const stage = requireCurrentStage(args, state);

        if (
          methodArgs.stageId !== undefined && methodArgs.stageId !== stage.id
        ) {
          throw new Error(
            `Cannot dispatch stage '${methodArgs.stageId}': the run for '${workItem}' is at stage '${stage.id}'.`,
          );
        }
        if (stage.work === undefined) {
          throw new Error(
            `Stage '${stage.id}' has no work to dispatch.`,
          );
        }

        const cycle = currentCycle(state);
        const limit = maxDispatchesFor(stage);
        const attempt = dispatchAttempts(state, stage.id, cycle) + 1;

        // Hard stop: the runaway-loop guard. Don't write — the previous
        // attempts are already journaled; surface the diagnostics and refuse.
        if (attempt > limit) {
          const diag = await stageExecutionDiagnostics(
            context,
            args,
            state,
            view,
            workItem,
            slug,
            stage,
          );
          throw new Error(
            formatDispatchFeedback(stage, cycle, attempt, limit, diag, true),
          );
        }

        const newState: RunState = {
          ...state,
          dispatches: {
            ...(state.dispatches ?? {}),
            [stage.id]: { cycle, count: attempt },
          },
        };
        const handles = [];
        handles.push(
          await context.writeResource(
            "state",
            stateInstance(slug),
            newState as unknown as Record<string, unknown>,
          ),
        );
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "dispatched",
            stageId: stage.id,
            summary:
              `Dispatched stage '${stage.id}' (attempt ${attempt}/${limit}` +
              (methodArgs.mode !== undefined
                ? `, mode ${methodArgs.mode}`
                : "") +
              ")",
            payload: {
              stageId: stage.id,
              cycle,
              attempt,
              mode: methodArgs.mode,
              runId: methodArgs.runId,
            },
          }),
        );

        // Repeat dispatch within the cap: record it, but feed back loudly.
        if (attempt > 1) {
          const diag = await stageExecutionDiagnostics(
            context,
            args,
            state,
            view,
            workItem,
            slug,
            stage,
          );
          context.logger.warning("{feedback}", {
            feedback: formatDispatchFeedback(
              stage,
              cycle,
              attempt,
              limit,
              diag,
              false,
            ),
          });
        }
        context.logger.info(
          "Dispatched stage '{stage}' for '{workItem}' (attempt {attempt}/{limit})",
          { stage: stage.id, workItem, attempt, limit },
        );
        return { dataHandles: handles };
      },
    },

    record_artifact: {
      description:
        "Record (or re-record) an artifact declared on the work item's current stage. Payload is validated against the declared schema.",
      arguments: z.object({
        workItem: WorkItemArg,
        name: z.string().describe(
          "Artifact name declared on the current stage",
        ),
        payload: z.union([
          z.record(z.string(), z.unknown()),
          z.string(),
        ]).describe("JSON object payload (or a JSON string)"),
        note: z.string().optional(),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          name: string;
          payload: Record<string, unknown> | string;
          note?: string;
        },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const state = requireState(view, workItem);
        requireActive(state);
        const stage = requireCurrentStage(args, state);

        const spec = (stage.artifacts ?? []).find(
          (a) => a.name === methodArgs.name,
        );
        if (spec === undefined) {
          const names = (stage.artifacts ?? []).map((a) => a.name).join(", ") ||
            "(none)";
          throw new Error(
            `Artifact '${methodArgs.name}' is not declared on stage '${stage.id}'. Declared: ${names}`,
          );
        }

        const payload = normalizePayload(methodArgs.payload);
        const issues = validateArtifactPayload(spec, payload);
        if (issues !== null) {
          await recordValidationFailure(context, slug, {
            target: spec.name,
            targetKind: "artifact",
            workItem,
            stageId: state.stageId,
            cycle: currentCycle(state),
            attempt: dispatchAttempts(
              state,
              state.stageId,
              currentCycle(state),
            ),
            cleared: false,
            rejected: payload,
            errors: issues,
            recordedAt: new Date().toISOString(),
          });
          throw new Error(
            `Artifact '${spec.name}' payload is invalid:\n  ` +
              issues.join("\n  "),
          );
        }

        let subjectVersion: number | undefined;
        if (spec.reviews !== undefined) {
          const subject = view.artifacts.get(spec.reviews);
          if (subject === undefined) {
            throw new Error(
              `Artifact '${spec.name}' reviews '${spec.reviews}', which has not been recorded yet.`,
            );
          }
          subjectVersion = subject.version;
        }

        const envelope: ArtifactEnvelope = {
          name: spec.name,
          workItem,
          stageId: state.stageId,
          cycle: currentCycle(state),
          payload,
          subjectVersion,
          recordedAt: new Date().toISOString(),
          note: methodArgs.note,
        };
        const handles = [];
        const written = await context.writeResource(
          "artifact",
          artifactInstance(slug, spec.name),
          envelope as unknown as Record<string, unknown>,
        );
        handles.push(written);
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "artifact_recorded",
            stageId: state.stageId,
            summary: `Recorded artifact '${spec.name}'` +
              (subjectVersion !== undefined
                ? ` (reviews ${spec.reviews} v${subjectVersion})`
                : ""),
            // version pins the journal event to the exact record written,
            // so the summary report never has to correlate by ordinal.
            payload: {
              name: spec.name,
              subjectVersion,
              version: written.version,
            },
          }),
        );
        const clearedArtifact = await clearValidationIfOpen(
          context,
          view,
          slug,
          spec.name,
          state,
        );
        if (clearedArtifact !== undefined) handles.push(clearedArtifact);
        context.logger.info("Recorded artifact '{name}' for '{workItem}'", {
          name: spec.name,
          workItem,
        });
        return { dataHandles: handles };
      },
    },

    record_evidence: {
      description:
        "Record opaque external evidence declared on the work item's current stage (PR URL, CI outcome, release link).",
      arguments: z.object({
        workItem: WorkItemArg,
        name: z.string().describe(
          "Evidence name declared on the current stage",
        ),
        payload: z.union([
          z.record(z.string(), z.unknown()),
          z.string(),
        ]).describe("JSON object payload (or a JSON string)"),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          name: string;
          payload: Record<string, unknown> | string;
        },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const state = requireState(view, workItem);
        requireActive(state);
        const stage = requireCurrentStage(args, state);

        const declared = stageEvidenceNames(stage);
        if (!declared.includes(methodArgs.name)) {
          throw new Error(
            `Evidence '${methodArgs.name}' is not declared on stage '${stage.id}'. Declared: ${
              declared.join(", ") || "(none)"
            }`,
          );
        }

        const payload = normalizePayload(methodArgs.payload);

        // Validate against the evidence's contract: an explicit declared
        // schema if the stage declares one, otherwise the built-in outcome
        // schema for the stage's resultEvidence. This is what turns "workflow
        // succeeded but recorded nothing" from a silent re-dispatch loop into
        // a loud, diagnosable failure at the write.
        const explicitSpec = (stage.evidence ?? []).find(
          (e) => e.name === methodArgs.name,
        );
        const issues = explicitSpec?.schema !== undefined
          ? validateDeclaredPayload(explicitSpec.schema, payload)
          : stage.work?.resultEvidence === methodArgs.name
          ? validateOutcomePayload(payload)
          : null;
        if (issues !== null) {
          await recordValidationFailure(context, slug, {
            target: methodArgs.name,
            targetKind: "evidence",
            workItem,
            stageId: state.stageId,
            cycle: currentCycle(state),
            attempt: dispatchAttempts(
              state,
              state.stageId,
              currentCycle(state),
            ),
            cleared: false,
            rejected: payload,
            errors: issues,
            recordedAt: new Date().toISOString(),
          });
          throw new Error(
            `Evidence '${methodArgs.name}' payload is invalid:\n  ` +
              issues.join("\n  "),
          );
        }

        const handles = [];
        const written = await context.writeResource(
          "evidence",
          evidenceInstance(slug, methodArgs.name),
          {
            name: methodArgs.name,
            workItem,
            stageId: state.stageId,
            cycle: currentCycle(state),
            payload,
            recordedAt: new Date().toISOString(),
          },
        );
        handles.push(written);
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "evidence_recorded",
            stageId: state.stageId,
            summary: `Recorded evidence '${methodArgs.name}'`,
            payload: { name: methodArgs.name, version: written.version },
          }),
        );
        const clearedEvidence = await clearValidationIfOpen(
          context,
          view,
          slug,
          methodArgs.name,
          state,
        );
        if (clearedEvidence !== undefined) handles.push(clearedEvidence);
        context.logger.info("Recorded evidence '{name}' for '{workItem}'", {
          name: methodArgs.name,
          workItem,
        });
        return { dataHandles: handles };
      },
    },

    resolve_findings: {
      description:
        "Mark findings on a kind: findings artifact as resolved, with notes.",
      arguments: z.object({
        workItem: WorkItemArg,
        artifact: z.string(),
        resolutions: z.array(
          z.object({
            findingId: z.string(),
            note: z.string().describe("How the finding was addressed"),
          }),
        ).min(1),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          artifact: string;
          resolutions: { findingId: string; note: string }[];
        },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const state = requireState(view, workItem);
        requireActive(state);

        const found = findArtifactSpec(args, methodArgs.artifact);
        if (found === undefined || found.spec.kind !== "findings") {
          throw new Error(
            `'${methodArgs.artifact}' is not a declared kind: findings artifact.`,
          );
        }
        const recorded = view.artifacts.get(methodArgs.artifact);
        if (recorded === undefined) {
          throw new Error(
            `Findings artifact '${methodArgs.artifact}' has not been recorded.`,
          );
        }

        const payload = recorded.latest.payload as {
          findings?: {
            id: string;
            resolved?: boolean;
            resolutionNote?: string;
          }[];
        };
        const findings = payload.findings ?? [];
        const byId = new Map(findings.map((f) => [f.id, f]));
        for (const resolution of methodArgs.resolutions) {
          if (!byId.has(resolution.findingId)) {
            const ids = findings.map((f) => f.id).join(", ") || "(none)";
            throw new Error(
              `Finding '${resolution.findingId}' does not exist in '${methodArgs.artifact}'. Known: ${ids}`,
            );
          }
        }
        const resolutionMap = new Map(
          methodArgs.resolutions.map((r) => [r.findingId, r.note]),
        );
        const updated = findings.map((f) => {
          const note = resolutionMap.get(f.id);
          return note !== undefined
            ? { ...f, resolved: true, resolutionNote: note }
            : f;
        });

        // Keep the original recording provenance: resolutions update content
        // without counting as a fresh recording (recordedThisCycle gates).
        const envelope = {
          ...recorded.latest,
          payload: { ...payload, findings: updated },
          resolvedAt: new Date().toISOString(),
        };
        const handles = [];
        const written = await context.writeResource(
          "artifact",
          artifactInstance(slug, methodArgs.artifact),
          envelope as unknown as Record<string, unknown>,
        );
        handles.push(written);
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: "findings_resolved",
            stageId: state.stageId,
            summary:
              `Resolved ${methodArgs.resolutions.length} finding(s) in '${methodArgs.artifact}'`,
            payload: {
              artifact: methodArgs.artifact,
              resolutions: methodArgs.resolutions,
              version: written.version,
            },
          }),
        );
        context.logger.info(
          "Resolved {count} finding(s) in '{artifact}' for '{workItem}'",
          {
            count: methodArgs.resolutions.length,
            artifact: methodArgs.artifact,
            workItem,
          },
        );
        return { dataHandles: handles };
      },
    },

    approve: {
      description:
        "Record a human approval for a human-approval gate or a cycle-override. Only call on explicit human instruction.",
      arguments: z.object({
        workItem: WorkItemArg,
        gateId: z.string(),
        actor: z.string().describe("Who approved (a human identity)"),
        note: z.string().optional(),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          gateId: string;
          actor: string;
          note?: string;
        },
        context: Ctx,
      ) => {
        return await recordDecision(context, {
          ...methodArgs,
          decision: "approved",
        });
      },
    },

    reject: {
      description:
        "Record a human rejection for a human-approval gate, with a reason.",
      arguments: z.object({
        workItem: WorkItemArg,
        gateId: z.string(),
        actor: z.string(),
        note: z.string().describe("Why this was rejected"),
      }),
      execute: async (
        methodArgs: {
          workItem: string;
          gateId: string;
          actor: string;
          note: string;
        },
        context: Ctx,
      ) => {
        return await recordDecision(context, {
          ...methodArgs,
          decision: "rejected",
        });
      },
    },

    advance: {
      description:
        "Move a work item along a named transition. Gates are evaluated in pre-flight checks and re-validated here.",
      arguments: z.object({
        workItem: WorkItemArg,
        transition: z.string(),
      }),
      execute: async (
        methodArgs: { workItem: string; transition: string },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        const state = requireState(view, workItem);
        requireActive(state);
        const stage = requireCurrentStage(args, state);
        const transition = resolveTransition(
          args,
          stage,
          methodArgs.transition,
        );

        // Defense in depth: re-validate gates even though the
        // gates-satisfied check already ran (checks are skippable;
        // this is not).
        const evaluated = await evaluateTransitionGates(
          transition,
          gateContextFrom(context, args, state, view, workItem, slug),
        );
        if (!evaluated.pass) {
          throw new Error(
            `Transition '${transition.name}' is blocked:\n  ` +
              formatGateFailures(evaluated.results),
          );
        }

        // Defense in depth: the stage's work must have run through the factory
        // (checks are skippable; this is not).
        if (
          requiresDispatch(args, stage, transition.name) &&
          dispatchAttempts(state, stage.id, currentCycle(state)) < 1
        ) {
          throw new Error(stageNotExecutedError(stage.id, workItem));
        }

        const limit = cycleLimitFor(args, view, state, transition.to);
        if (!limit.allowed) {
          throw new Error(cycleLimitError(transition.to, limit));
        }

        const target = findStage(args, transition.to);
        if (target === undefined) {
          throw new Error(`Target stage '${transition.to}' does not exist.`);
        }
        const now = new Date().toISOString();
        const newState: RunState = {
          workItem,
          stageId: target.id,
          cycles: {
            ...state.cycles,
            [target.id]: entriesInto(state, target.id) + 1,
          },
          // Dispatch counters are cycle-scoped, so the target stage's stale
          // counter (from an earlier entry) is ignored on the new entry; carry
          // the map forward for audit rather than wiping other stages' counts.
          dispatches: state.dispatches,
          enteredAt: now,
          status: target.terminal === true ? "terminal" : "active",
          definitionVersion: state.definitionVersion,
          startedAt: state.startedAt,
        };
        const handles = [];
        handles.push(
          await context.writeResource(
            "state",
            stateInstance(slug),
            newState as unknown as Record<string, unknown>,
          ),
        );
        handles.push(
          await writeJournal(context, workItem, slug, {
            event: target.terminal === true ? "run_terminal" : "advanced",
            stageId: target.id,
            summary:
              `Advanced '${transition.name}': ${stage.id} → ${target.id}` +
              (target.terminal === true ? " (terminal)" : ""),
            payload: {
              transition: transition.name,
              from: stage.id,
              to: target.id,
              cycle: newState.cycles[target.id],
            },
          }),
        );
        context.logger.info(
          "Advanced '{transition}' for '{workItem}': {from} -> {to}{terminal}",
          {
            transition: transition.name,
            workItem,
            from: stage.id,
            to: target.id,
            terminal: target.terminal === true ? " (terminal)" : "",
          },
        );
        return { dataHandles: handles };
      },
    },

    status: {
      description:
        "What is required right now for a work item — or, without workItem, an overview of every run on this factory.",
      kind: "read" as const,
      arguments: z.object({
        workItem: WorkItemArg.optional(),
      }),
      execute: async (
        methodArgs: { workItem?: string },
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);

        // The status view is persisted as a queryable record rather than
        // dumped to a log line: the driver reads exactly the fields it needs
        // with `swamp data query --select 'attributes.<field>'`, instead of
        // scraping and re-parsing a maximal JSON blob out of log output. Each
        // call refreshes the record (it is a read-time materialized view, not
        // history — see the `status` resource's garbageCollection).
        if (methodArgs.workItem === undefined) {
          const states = await loadAllRunStates(
            context.dataRepository,
            context.modelType,
            context.modelId,
          );
          const runs = states.map((s) => ({
            workItem: s.workItem,
            stageId: s.stageId,
            status: s.status,
            cycle: s.cycles[s.stageId] ?? 1,
            startedAt: s.startedAt,
          }));
          context.logger.info(
            "{count} run(s) on this factory — query 'status-_factory' for the overview",
            { count: runs.length },
          );
          const handle = await context.writeResource(
            "status",
            statusInstance(OVERVIEW_SLUG),
            { factory: true, runs },
          );
          return { dataHandles: [handle] };
        }

        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        if (view.state === null) {
          context.logger.info(
            "No run for '{workItem}'. Run 'start' first.",
            { workItem },
          );
          const handle = await context.writeResource(
            "status",
            statusInstance(slug),
            { started: false, workItem },
          );
          return { dataHandles: [handle] };
        }
        const status = await buildStatus(
          context,
          args,
          view.state,
          view,
          workItem,
          slug,
        );
        const stage = status.stage as { id: string; cycle: number };
        const transitions = status.transitions as {
          name: string;
          satisfied: boolean;
        }[];
        const satisfied = transitions.filter((t) => t.satisfied).map((t) =>
          t.name
        );
        context.logger.info(
          "'{workItem}' at stage '{stage}' (cycle {cycle}, {runStatus}) — satisfied transitions: {satisfied}. Query 'status-{slug}' for the full view.",
          {
            workItem,
            stage: stage.id,
            cycle: stage.cycle,
            runStatus: view.state.status,
            satisfied: satisfied.join(", ") || "(none)",
            slug,
          },
        );
        const handle = await context.writeResource(
          "status",
          statusInstance(slug),
          status,
        );
        return { dataHandles: [handle] };
      },
    },

    summary: {
      description:
        "Render the full implementation history of a work item — every stage visit, artifact version, finding, approval, and transition — as a markdown report built statically from the recorded run data.",
      kind: "read" as const,
      arguments: z.object({ workItem: WorkItemArg }),
      execute: async (
        methodArgs: { workItem: string },
        context: Ctx,
      ) => {
        const workItem = methodArgs.workItem;
        const slug = workItemSlug(workItem);
        const view = await viewFor(context, slug);
        requireState(view, workItem);

        // The definition only supplies cosmetic context (the reviews map);
        // a broken or missing definition must not block an audit render.
        let reviews = new Map<string, string>();
        try {
          const { args } = await loadFactoryArgs(context);
          reviews = reviewsFromStages(args.stages);
        } catch {
          // render without subject names
        }

        // History needs every record version. Prefer the data query
        // catalog (referencing `version` opts into history; scoped by
        // modelName since the predicate language has no modelId); fall
        // back to listVersions where no query binding exists.
        const queryData = queryDataFrom(context);
        const selfName = context.definition?.name;
        const reader = queryData !== undefined && selfName !== undefined
          ? queryRunDataReader({
            queryData: (predicate) => queryData(predicate),
            dataRepository: context.dataRepository,
            modelType: context.modelType,
            modelId: context.modelId,
            modelName: selfName,
          })
          : repositoryRunDataReader({
            dataRepository: context.dataRepository,
            modelType: context.modelType,
            modelId: context.modelId,
          });
        const { timeline, markdown } = await buildWorkItemSummary(
          reader,
          workItem,
          slug,
          { factoryName: context.definition?.name, reviews },
        );
        context.logger.info("{markdown}", { markdown });
        context.logger.info("SUMMARY_JSON {summary}", {
          summary: JSON.stringify(timeline),
        });
        return { dataHandles: [] };
      },
    },

    validate: {
      description:
        "Lint the definition: meta-schema + graph rules. Fails when errors exist.",
      kind: "read" as const,
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        const { errors, warnings } = validateGraph(args);
        for (const warning of warnings) {
          context.logger.warning("warning: {warning}", { warning });
        }
        if (errors.length > 0) {
          throw new Error(
            "Definition is invalid:\n  " + errors.join("\n  "),
          );
        }
        context.logger.info(
          "Definition is valid ({stages} stages{warnings})",
          {
            stages: args.stages.length,
            warnings: warnings.length > 0
              ? `, ${warnings.length} warning(s)`
              : "",
          },
        );
        return { dataHandles: [] };
      },
    },

    describe: {
      description:
        "Render the state machine (Mermaid) plus stage/transition tables.",
      kind: "read" as const,
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: Ctx,
      ) => {
        const { args } = await loadFactoryArgs(context);
        context.logger.info("{mermaid}", { mermaid: renderMermaid(args) });
        context.logger.info("{tables}", { tables: renderTables(args) });
        return { dataHandles: [] };
      },
    },
  },
};

async function recordDecision(
  context: Ctx,
  decision: {
    workItem: string;
    gateId: string;
    actor: string;
    note?: string;
    decision: "approved" | "rejected";
  },
): Promise<{ dataHandles: { name: string }[] }> {
  const { args } = await loadFactoryArgs(context);
  const workItem = decision.workItem;
  const slug = workItemSlug(workItem);
  const view = await viewFor(context, slug);
  const state = requireState(view, workItem);
  requireActive(state);

  const knownIds = allApprovalGateIds(args);
  const isOverride = decision.gateId.startsWith(CYCLE_OVERRIDE_PREFIX);
  if (isOverride) {
    const stageId = decision.gateId.slice(CYCLE_OVERRIDE_PREFIX.length);
    if (findStage(args, stageId) === undefined) {
      throw new Error(
        `Cycle override targets unknown stage '${stageId}'.`,
      );
    }
  } else if (!knownIds.has(decision.gateId)) {
    const ids = [...knownIds].join(", ") || "(none)";
    throw new Error(
      `'${decision.gateId}' is not a human-approval gate in this definition. Known: ${ids}`,
    );
  }

  const record: ApprovalRecord = {
    gateId: decision.gateId,
    workItem,
    decision: decision.decision,
    actor: decision.actor,
    note: decision.note,
    stageId: state.stageId,
    cycle: currentCycle(state),
    decidedAt: new Date().toISOString(),
  };
  const handles = [];
  handles.push(
    await context.writeResource(
      "approval",
      approvalInstance(slug, decision.gateId),
      record as unknown as Record<string, unknown>,
    ),
  );
  handles.push(
    await writeJournal(context, workItem, slug, {
      event: decision.decision,
      stageId: state.stageId,
      summary: `${decision.actor} ${decision.decision} '${decision.gateId}'` +
        (decision.note !== undefined ? `: ${decision.note}` : ""),
      payload: {
        gateId: decision.gateId,
        actor: decision.actor,
        note: decision.note,
      },
    }),
  );
  context.logger.info("{actor} {decision} '{gateId}' for '{workItem}'", {
    actor: decision.actor,
    decision: decision.decision,
    gateId: decision.gateId,
    workItem,
  });
  return { dataHandles: handles };
}

export { celName, workItemSlug };
