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

import type { Actor, JournalEvent, ProductKind } from "./journal.ts";
import {
  type FactoryDefinition,
  findStage,
  maxCyclesFor,
  maxDispatchesFor,
  type StageSpec,
  transitionsFrom,
  type TransitionSpec,
} from "./definition_schema.ts";
import {
  OUTCOME_SCHEMA,
  validateArtifactPayload,
  validatePayload,
} from "./payload_schema.ts";
import {
  currentCycle,
  RUN_SCHEMA_VERSION,
  type RunRecord,
  type Usage,
  UsageSchema,
} from "./run_record.ts";
import { jsonSafe } from "./canonical.ts";
import type { SubagentPrompt } from "./dispatch.ts";

// ---------------------------------------------------------------------------
// Pure operations on a run record. Each takes the current record and returns
// the next one (or a refusal); none does I/O, so the store layer decides when
// to commit and the rules are testable on their own.
//
// Every write the caller makes on the strength of what it last read takes
// the caller's expectation of the current stage, cycle and era, and refuses
// a mismatch as stale: products, dispatches, approvals, advance, reset and
// retarget.
// Only recordUsage does not, because usage arrives after the run moves on.
// The per-instance lock serialises writers; the expectation stops a writer
// acting on a view that was already out of date.
// ---------------------------------------------------------------------------

/** Clock and id source, injected so operations stay deterministic. */
export interface Env {
  now(): string;
  newEra(): string;
}

export const systemEnv: Env = {
  now: () => new Date().toISOString(),
  newEra: () => crypto.randomUUID(),
};

/** Where the caller believes the run is. */
export interface Expected {
  stage: string;
  cycle: number;
  era: string;
}

export type OpResult<T = RunRecord> =
  | { ok: true; run: RunRecord; value: T }
  | { ok: false; reason: string };

function refuse(reason: string): { ok: false; reason: string } {
  return { ok: false, reason };
}

function journal(
  run: RunRecord,
  actor: Actor,
  env: Env,
  event: DistributiveOmit<
    JournalEvent,
    "at" | "era" | "stage" | "cycle" | "actor"
  >,
): JournalEvent {
  return {
    ...event,
    at: env.now(),
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    actor,
  } as JournalEvent;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K>
  : never;

function requireActive(run: RunRecord): string | null {
  return run.status === "active"
    ? null
    : `the work item finished at stage '${run.stage}'`;
}

/** Where a run is now: what a caller passes back as its expectation. */
export function expectedOf(run: RunRecord): Expected {
  return { stage: run.stage, cycle: currentCycle(run), era: run.era };
}

/** Refuse when the caller's view of the run is out of date. */
export function checkExpected(
  run: RunRecord,
  expected: Expected,
): string | null {
  const cycle = currentCycle(run);
  if (
    expected.stage === run.stage && expected.cycle === cycle &&
    expected.era === run.era
  ) {
    return null;
  }
  return `stale: the work item is at stage '${run.stage}' cycle ${cycle} ` +
    `(era ${run.era}), not stage '${expected.stage}' cycle ${expected.cycle} ` +
    `(era ${expected.era}); read its status and try again`;
}

function stageOf(definition: FactoryDefinition, run: RunRecord): StageSpec {
  const stage = findStage(definition, run.stage);
  if (stage === undefined) {
    throw new Error(
      `run is at stage '${run.stage}', which its definition does not declare`,
    );
  }
  return stage;
}

// --- start and reset ---------------------------------------------------------

export interface StartInput {
  key: string;
  externalRefs?: Record<string, string>;
  definitionDigest: string;
  /** The version of the pinned factory definition copy the run uses. */
  definitionVersion?: number;
}

/** A new run at the factory definition's initial stage. */
export function start(
  definition: FactoryDefinition,
  input: StartInput,
  actor: Actor,
  env: Env,
): RunRecord {
  const initial = definition.stages.find((s) => s.initial === true);
  if (initial === undefined) throw new Error("definition has no initial stage");
  const run: RunRecord = {
    schemaVersion: RUN_SCHEMA_VERSION,
    key: input.key,
    externalRefs: input.externalRefs ?? {},
    definition: {
      name: definition.name,
      digest: input.definitionDigest,
      ...(input.definitionVersion !== undefined
        ? { version: input.definitionVersion }
        : {}),
    },
    era: env.newEra(),
    status: "active",
    stage: initial.id,
    entries: { [initial.id]: 1 },
    products: { artifacts: {}, evidence: {} },
    validations: { artifacts: {}, evidence: {} },
    dispatches: [],
    approvals: [],
    overrides: [],
    journal: [],
  };
  run.journal.push(journal(run, actor, env, {
    type: "started",
    definition: { ...run.definition },
  }));
  return run;
}

/**
 * Start over at the initial stage in a new era. Earlier products, approvals
 * and dispatches stay recorded but belong to the old era, so no gate or
 * binding sees them. A finished run can be reset too: starting over is
 * how finished (or abandoned) work is taken up again.
 */
export function reset(
  run: RunRecord,
  definition: FactoryDefinition,
  expected: Expected,
  actor: Actor,
  env: Env,
  /** The pinned copy of `factory definition` when the reset adopts a new one;
   * omitted, the run keeps the factory definition it was pinned to. */
  repinned?: { digest: string; version?: number },
): OpResult<string> {
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const initial = definition.stages.find((s) => s.initial === true);
  if (initial === undefined) throw new Error("definition has no initial stage");
  const previousEra = run.era;
  const next: RunRecord = {
    ...run,
    ...(repinned !== undefined
      ? { definition: { name: definition.name, ...repinned } }
      : {}),
    era: env.newEra(),
    status: "active",
    stage: initial.id,
    entries: { [initial.id]: 1 },
    products: { artifacts: {}, evidence: {} },
    validations: { artifacts: {}, evidence: {} },
    journal: [...run.journal],
  };
  next.journal.push(journal(next, actor, env, {
    type: "reset",
    previousEra,
    ...(repinned !== undefined ? { repinned } : {}),
  }));
  return { ok: true, run: next, value: next.era };
}

export interface RetargetInput {
  externalRefs: Record<string, string>;
  reason: string;
}

function sameRefs(
  a: Record<string, string>,
  b: Record<string, string>,
): boolean {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length &&
    keys.every((k) => Object.hasOwn(b, k) && a[k] === b[k]);
}

/**
 * Point the work item at other tracker tickets: replace externalRefs whole
 * and journal the move. No gate and no stage change; gates, products and
 * cycles are untouched. It knows nothing of trackers: which ticket each
 * event belongs to is the projection's to work out from the journal.
 */
export function retarget(
  run: RunRecord,
  expected: Expected,
  input: RetargetInput,
  actor: Actor,
  env: Env,
): OpResult<Record<string, string>> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  // A ticket is a non-empty stable id: a `<tracker>.display` key alone
  // names none, and would detach the work item from every tracker.
  const names = Object.entries(input.externalRefs).some(([key, value]) =>
    !key.endsWith(".display") && value !== ""
  );
  if (!names) {
    return refuse(
      "retarget needs externalRefs naming at least one ticket: a non-empty " +
        "stable id under a tracker's name, not only <tracker>.display",
    );
  }
  if (sameRefs(run.externalRefs, input.externalRefs)) {
    return refuse("the work item already has these externalRefs");
  }
  if (input.reason.trim() === "") {
    return refuse("retarget needs a reason");
  }
  const to = { ...input.externalRefs };
  return {
    ok: true,
    value: to,
    run: {
      ...run,
      externalRefs: to,
      journal: [
        ...run.journal,
        journal(run, actor, env, {
          type: "retargeted",
          from: { ...run.externalRefs },
          to: { ...to },
          reason: input.reason,
        }),
      ],
    },
  };
}

// --- products ----------------------------------------------------------------

const PLURAL = { artifact: "artifacts", evidence: "evidence" } as const;

/**
 * Check a product payload before anything is written: the current stage must
 * declare it (gates only use products recorded on their own stage), and the
 * payload must match its schema. Returns the errors, or null.
 */
export function checkProduct(
  run: RunRecord,
  definition: FactoryDefinition,
  kind: ProductKind,
  name: string,
  payload: unknown,
): { declared: false; reason: string } | {
  declared: true;
  errors: string[] | null;
} {
  const inactive = requireActive(run);
  if (inactive !== null) return { declared: false, reason: inactive };
  const stage = stageOf(definition, run);
  if (kind === "artifact") {
    const spec = (stage.artifacts ?? []).find((a) => a.name === name);
    if (spec === undefined) {
      return {
        declared: false,
        reason: `stage '${stage.id}' does not declare artifact '${name}'`,
      };
    }
    return { declared: true, errors: validateArtifactPayload(spec, payload) };
  }
  const spec = (stage.evidence ?? []).find((e) => e.name === name);
  if (spec?.schema !== undefined) {
    return { declared: true, errors: validatePayload(spec.schema, payload) };
  }
  if (stage.work?.resultEvidence === name) {
    return { declared: true, errors: validatePayload(OUTCOME_SCHEMA, payload) };
  }
  if (spec !== undefined) {
    // Unreachable for a factory definition that passed its schema, which
    // requires a payload schema on every evidence except the stage's
    // resultEvidence.
    return {
      declared: false,
      reason: `evidence '${name}' on stage '${stage.id}' has no payload schema`,
    };
  }
  return {
    declared: false,
    reason: `stage '${stage.id}' does not declare evidence '${name}'`,
  };
}

/** Keep a rejected payload as retry feedback. Nothing else changes. */
export function rejectProduct(
  run: RunRecord,
  kind: ProductKind,
  name: string,
  payload: unknown,
  errors: string[],
  actor: Actor,
  env: Env,
): RunRecord {
  const plural = PLURAL[kind];
  return {
    ...run,
    validations: {
      ...run.validations,
      [plural]: {
        ...run.validations[plural],
        [name]: {
          errors,
          rejected: jsonSafe(payload),
          stage: run.stage,
          cycle: currentCycle(run),
          at: env.now(),
        },
      },
    },
    journal: [
      ...run.journal,
      journal(run, actor, env, { type: "rejected", kind, name, errors }),
    ],
  };
}

/** Index a written payload version as the product's latest, and clear any
 * rejection it had. A review also records the subject version it reviewed. */
export function acceptProduct(
  run: RunRecord,
  kind: ProductKind,
  name: string,
  written: {
    version: number;
    digest: string;
    subject?: { name: string; version: number; digest: string };
  },
  actor: Actor,
  env: Env,
): RunRecord {
  const plural = PLURAL[kind];
  const validations = { ...run.validations[plural] };
  delete validations[name];
  return {
    ...run,
    products: {
      ...run.products,
      [plural]: {
        ...run.products[plural],
        [name]: {
          version: written.version,
          digest: written.digest,
          stage: run.stage,
          cycle: currentCycle(run),
          at: env.now(),
          ...(written.subject !== undefined
            ? { subject: written.subject }
            : {}),
        },
      },
    },
    validations: { ...run.validations, [plural]: validations },
    journal: [
      ...run.journal,
      journal(run, actor, env, {
        type: "recorded",
        kind,
        name,
        version: written.version,
        digest: written.digest,
      }),
    ],
  };
}

// --- dispatch and usage ------------------------------------------------------

export interface DispatchInput {
  inputs: Record<string, unknown>;
  prompt?: string;
  command?: string;
  subagentPrompts?: SubagentPrompt[];
}

/**
 * Record that the current stage's work is being done; returns its id.
 * Refused past the stage's dispatch cap as a suspected runaway loop, unless a
 * person has granted dispatch overrides for this stage and cycle.
 */
export function recordDispatch(
  run: RunRecord,
  definition: FactoryDefinition,
  expected: Expected,
  input: DispatchInput,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const cap = dispatchCap(run, definition);
  if (!cap.allowed) {
    return refuse(
      `runaway loop suspected: stage '${run.stage}' cycle ${
        currentCycle(run)
      } has had ${cap.count} dispatch(es), its limit is ${cap.limit}` +
        (cap.granted > 0 ? ` plus ${cap.granted} granted` : "") +
        "; a person must grant a dispatch override to dispatch again",
    );
  }
  const id = run.dispatches.length + 1;
  const dispatch = {
    id,
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    at: env.now(),
    actor,
    mode: findStage(definition, run.stage)?.work?.mode ?? "interactive",
    inputs: jsonSafe(input.inputs) as Record<string, unknown>,
    ...(input.prompt !== undefined ? { prompt: input.prompt } : {}),
    ...(input.command !== undefined ? { command: input.command } : {}),
    ...(input.subagentPrompts !== undefined
      ? { subagentPrompts: input.subagentPrompts }
      : {}),
  };
  return {
    ok: true,
    value: id,
    run: {
      ...run,
      dispatches: [...run.dispatches, dispatch],
      journal: [
        ...run.journal,
        journal(run, actor, env, { type: "dispatched", dispatchId: id }),
      ],
    },
  };
}

/**
 * Attach reported token usage to a dispatch. Usage is known only after the
 * work, often after the run has moved on, so the dispatch is named by id.
 * A dispatch takes usage once.
 */
export function recordUsage(
  run: RunRecord,
  dispatchId: number,
  usage: Omit<Usage, "attested">,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const index = run.dispatches.findIndex((d) => d.id === dispatchId);
  if (index === -1) return refuse(`no dispatch ${dispatchId}`);
  if (run.dispatches[index].usage !== undefined) {
    return refuse(`dispatch ${dispatchId} already has usage recorded`);
  }
  const parsed = UsageSchema.safeParse({ ...usage, attested: true });
  if (!parsed.success) {
    return refuse(parsed.error.issues.map((i) => i.message).join("; "));
  }
  const dispatches = [...run.dispatches];
  dispatches[index] = { ...dispatches[index], usage: parsed.data };
  return {
    ok: true,
    value: dispatchId,
    run: {
      ...run,
      dispatches,
      journal: [
        ...run.journal,
        journal(run, actor, env, { type: "usage", dispatchId }),
      ],
    },
  };
}

// --- approvals ---------------------------------------------------------------

/** Human-approval gate ids a decision may name from the current stage. */
function approvalGatesFrom(
  definition: FactoryDefinition,
  stage: StageSpec,
): Set<string> {
  const ids = new Set<string>();
  for (const t of transitionsFrom(definition, stage)) {
    for (const gate of t.gates ?? []) {
      if (gate.type === "human-approval") ids.add(gate.config.id);
    }
  }
  return ids;
}

export interface ApprovalInput {
  gateId: string;
  decision: "approve" | "decline";
  note?: string;
}

/**
 * Record one approval decision, bound to the version and digest of every
 * product in the era: what a person approves is usually declared on an
 * earlier stage (plan-approval is decided on plan-review about the plan).
 */
export function recordApproval(
  run: RunRecord,
  definition: FactoryDefinition,
  expected: Expected,
  input: ApprovalInput,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const gates = approvalGatesFrom(definition, stageOf(definition, run));
  if (!gates.has(input.gateId)) {
    return refuse(
      `no human-approval gate '${input.gateId}' on the ways out of stage '${run.stage}'` +
        (gates.size > 0 ? ` (there is: ${[...gates].join(", ")})` : ""),
    );
  }
  const snapshot = (
    index: Record<string, { version: number; digest: string }>,
  ) =>
    Object.fromEntries(
      Object.entries(index).map((
        [name, ref],
      ) => [name, { version: ref.version, digest: ref.digest }]),
    );
  const id = run.approvals.length + 1;
  const approval = {
    id,
    gateId: input.gateId,
    decision: input.decision,
    ...(input.note !== undefined ? { note: input.note } : {}),
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    at: env.now(),
    actor,
    products: {
      artifacts: snapshot(run.products.artifacts),
      evidence: snapshot(run.products.evidence),
    },
  };
  return {
    ok: true,
    value: id,
    run: {
      ...run,
      approvals: [...run.approvals, approval],
      journal: [
        ...run.journal,
        journal(run, actor, env, {
          type: "approval",
          approvalId: id,
          gateId: input.gateId,
          decision: input.decision,
        }),
      ],
    },
  };
}

// --- circuit breakers ----------------------------------------------------------

export interface Limit {
  /** Entries into the stage so far (cycle limit), or dispatches in this
   * stage and cycle (dispatch cap). */
  count: number;
  /** The factory definition's limit. */
  limit: number;
  /** Overrides granted in this era; each adds one. */
  granted: number;
  /** Whether one more is allowed. */
  allowed: boolean;
}

/**
 * Whether the run may enter a stage once more: its maxCycles plus every cycle
 * override granted for it in this era. Grants accumulate; none resets the
 * count.
 */
export function cycleLimit(
  run: RunRecord,
  definition: FactoryDefinition,
  stageId: string,
): Limit {
  const stage = findStage(definition, stageId);
  if (stage === undefined) throw new Error(`no stage '${stageId}'`);
  const count = run.entries[stageId] ?? 0;
  const limit = maxCyclesFor(stage);
  const granted =
    run.overrides.filter((o) =>
      o.era === run.era && o.kind === "cycle" && o.stage === stageId
    ).length;
  return { count, limit, granted, allowed: count + 1 <= limit + granted };
}

/**
 * The cycle limit a transition is subject to, or null for a global
 * transition. Global transitions are escape hatches (abort, escalate); a
 * limit on the stage they lead to must never close the way out. Recognised by
 * identity against the factory definition's own list, not by name.
 */
export function cycleLimitFor(
  run: RunRecord,
  definition: FactoryDefinition,
  transition: TransitionSpec,
): Limit | null {
  if ((definition.globalTransitions ?? []).includes(transition)) return null;
  return cycleLimit(run, definition, transition.to);
}

/** Why entering a stage is refused, for the refusal and the status view. */
export function cycleLimitMessage(stage: string, limit: Limit): string {
  return `stage '${stage}' has been entered ${limit.count} time(s) in this ` +
    `era, its limit is ${limit.limit}` +
    (limit.granted > 0 ? ` plus ${limit.granted} granted` : "") +
    `; a person must grant a cycle override for '${stage}' to enter it again`;
}

/** Whether the current stage and cycle may take one more dispatch. */
export function dispatchCap(
  run: RunRecord,
  definition: FactoryDefinition,
): Limit {
  const cycle = currentCycle(run);
  const count =
    run.dispatches.filter((d) =>
      d.era === run.era && d.stage === run.stage && d.cycle === cycle
    ).length;
  const limit = maxDispatchesFor(stageOf(definition, run));
  const granted =
    run.overrides.filter((o) =>
      o.era === run.era && o.kind === "dispatch" && o.stage === run.stage &&
      o.cycle === cycle
    ).length;
  return { count, limit, granted, allowed: count + 1 <= limit + granted };
}

export type OverrideInput =
  | { kind: "cycle"; stage: string; note?: string }
  | { kind: "dispatch"; note?: string };

/**
 * Record a person's override: one more entry into a stage, or one more
 * dispatch in the current stage and cycle. Overrides are records of their
 * own, never an approval id with a reserved prefix, so no id ends up in a
 * path or a shell word (#2290).
 */
export function grantOverride(
  run: RunRecord,
  definition: FactoryDefinition,
  expected: Expected,
  input: OverrideInput,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const stage = input.kind === "cycle" ? input.stage : run.stage;
  if (findStage(definition, stage) === undefined) {
    return refuse(`no stage '${stage}' to grant a ${input.kind} override for`);
  }
  const id = run.overrides.length + 1;
  const override = {
    id,
    kind: input.kind,
    stage,
    ...(input.kind === "dispatch" ? { cycle: currentCycle(run) } : {}),
    ...(input.note !== undefined ? { note: input.note } : {}),
    era: run.era,
    at: env.now(),
    actor,
  };
  return {
    ok: true,
    value: id,
    run: {
      ...run,
      overrides: [...run.overrides, override],
      journal: [
        ...run.journal,
        journal(run, actor, env, {
          type: "override",
          overrideId: id,
          kind: input.kind,
          for: stage,
        }),
      ],
    },
  };
}

// --- advance -----------------------------------------------------------------

/** Decides whether a transition's gates pass. GW-5 supplies the real one. */
export type GateEvaluator = (
  run: RunRecord,
  transition: TransitionSpec,
) => Promise<{ pass: boolean; failures: string[] }>;

export interface AdvanceInput {
  transition: string;
  /** A manual transition moves only on an explicit human go. */
  manualConfirmed?: boolean;
}

/** Move along a transition from the current stage. */
export async function advance(
  run: RunRecord,
  definition: FactoryDefinition,
  expected: Expected,
  input: AdvanceInput,
  gates: GateEvaluator,
  actor: Actor,
  env: Env,
): Promise<OpResult<string>> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const available = transitionsFrom(definition, stageOf(definition, run));
  const transition = available.find((t) => t.name === input.transition);
  if (transition === undefined) {
    return refuse(
      `stage '${run.stage}' has no transition '${input.transition}' ` +
        `(there is: ${available.map((t) => t.name).join(", ") || "none"})`,
    );
  }
  if (transition.manual === true && input.manualConfirmed !== true) {
    return refuse(
      `transition '${transition.name}' is manual: a person must confirm it`,
    );
  }
  const limit = cycleLimitFor(run, definition, transition);
  if (limit !== null && !limit.allowed) {
    return refuse(cycleLimitMessage(transition.to, limit));
  }
  const verdict = await gates(run, transition);
  if (!verdict.pass) {
    return refuse(
      `transition '${transition.name}' is not ready: ${
        verdict.failures.join("; ")
      }`,
    );
  }
  const to = transition.to;
  const target = findStage(definition, to);
  if (target === undefined) throw new Error(`no stage '${to}'`);
  const toCycle = (run.entries[to] ?? 0) + 1;
  const event = journal(run, actor, env, {
    type: "advanced",
    transition: transition.name,
    to,
    toCycle,
  });
  return {
    ok: true,
    value: to,
    run: {
      ...run,
      stage: to,
      status: target.terminal === true ? "terminal" : "active",
      entries: { ...run.entries, [to]: toCycle },
      journal: [...run.journal, event],
    },
  };
}
