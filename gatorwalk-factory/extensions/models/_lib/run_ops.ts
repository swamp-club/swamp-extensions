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
  findStage,
  type Lifecycle,
  type StageSpec,
  transitionsFrom,
  type TransitionSpec,
} from "./lifecycle_schema.ts";
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
} from "./run_record.ts";
import { jsonSafe } from "./canonical.ts";

// ---------------------------------------------------------------------------
// Pure operations on a run record. Each takes the current record and returns
// the next one (or a refusal); none does I/O, so the store layer decides when
// to commit and the rules are testable on their own.
//
// Every write the caller makes on the strength of what it last read takes
// the caller's expectation of the current stage, cycle and era, and refuses
// a mismatch as stale: products, dispatches, approvals, advance and reset.
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

function stageOf(lifecycle: Lifecycle, run: RunRecord): StageSpec {
  const stage = findStage(lifecycle, run.stage);
  if (stage === undefined) {
    throw new Error(
      `run is at stage '${run.stage}', which its lifecycle does not declare`,
    );
  }
  return stage;
}

// --- start and reset ---------------------------------------------------------

export interface StartInput {
  key: string;
  externalRefs?: Record<string, string>;
  lifecycleDigest: string;
}

/** A new run at the lifecycle's initial stage. */
export function start(
  lifecycle: Lifecycle,
  input: StartInput,
  actor: Actor,
  env: Env,
): RunRecord {
  const initial = lifecycle.stages.find((s) => s.initial === true);
  if (initial === undefined) throw new Error("lifecycle has no initial stage");
  const run: RunRecord = {
    schemaVersion: RUN_SCHEMA_VERSION,
    key: input.key,
    externalRefs: input.externalRefs ?? {},
    lifecycle: { name: lifecycle.name, digest: input.lifecycleDigest },
    era: env.newEra(),
    status: "active",
    stage: initial.id,
    entries: { [initial.id]: 1 },
    products: { artifacts: {}, evidence: {} },
    validations: { artifacts: {}, evidence: {} },
    dispatches: [],
    approvals: [],
    journal: [],
  };
  run.journal.push(journal(run, actor, env, {
    type: "started",
    lifecycle: { ...run.lifecycle },
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
  lifecycle: Lifecycle,
  expected: Expected,
  actor: Actor,
  env: Env,
): OpResult<string> {
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const initial = lifecycle.stages.find((s) => s.initial === true);
  if (initial === undefined) throw new Error("lifecycle has no initial stage");
  const previousEra = run.era;
  const next: RunRecord = {
    ...run,
    era: env.newEra(),
    status: "active",
    stage: initial.id,
    entries: { [initial.id]: 1 },
    products: { artifacts: {}, evidence: {} },
    validations: { artifacts: {}, evidence: {} },
    journal: [...run.journal],
  };
  next.journal.push(journal(next, actor, env, { type: "reset", previousEra }));
  return { ok: true, run: next, value: next.era };
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
  lifecycle: Lifecycle,
  kind: ProductKind,
  name: string,
  payload: unknown,
): { declared: false; reason: string } | {
  declared: true;
  errors: string[] | null;
} {
  const inactive = requireActive(run);
  if (inactive !== null) return { declared: false, reason: inactive };
  const stage = stageOf(lifecycle, run);
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
    // Unreachable for a lifecycle that passed its schema, which requires a
    // payload schema on every evidence except the stage's resultEvidence.
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
 * rejection it had. */
export function acceptProduct(
  run: RunRecord,
  kind: ProductKind,
  name: string,
  written: { version: number; digest: string },
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
        },
      },
    },
    validations: { ...run.validations, [plural]: validations },
    journal: [
      ...run.journal,
      journal(run, actor, env, { type: "recorded", kind, name, ...written }),
    ],
  };
}

// --- dispatch and usage ------------------------------------------------------

export interface DispatchInput {
  inputs: Record<string, unknown>;
  prompt?: string;
  command?: string;
}

/** Record that the current stage's work is being done; returns its id. */
export function recordDispatch(
  run: RunRecord,
  expected: Expected,
  input: DispatchInput,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const id = run.dispatches.length + 1;
  const dispatch = {
    id,
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    at: env.now(),
    actor,
    inputs: jsonSafe(input.inputs) as Record<string, unknown>,
    ...(input.prompt !== undefined ? { prompt: input.prompt } : {}),
    ...(input.command !== undefined ? { command: input.command } : {}),
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
  const dispatches = [...run.dispatches];
  dispatches[index] = {
    ...dispatches[index],
    usage: { ...usage, attested: true },
  };
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
  lifecycle: Lifecycle,
  stage: StageSpec,
): Set<string> {
  const ids = new Set<string>();
  for (const t of transitionsFrom(lifecycle, stage)) {
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
  lifecycle: Lifecycle,
  expected: Expected,
  input: ApprovalInput,
  actor: Actor,
  env: Env,
): OpResult<number> {
  const inactive = requireActive(run);
  if (inactive !== null) return refuse(inactive);
  const stale = checkExpected(run, expected);
  if (stale !== null) return refuse(stale);
  const gates = approvalGatesFrom(lifecycle, stageOf(lifecycle, run));
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
  lifecycle: Lifecycle,
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
  const available = transitionsFrom(lifecycle, stageOf(lifecycle, run));
  const transition = available.find((t) => t.name === input.transition);
  if (transition === undefined) {
    return refuse(
      `stage '${run.stage}' has no transition '${input.transition}' ` +
        `(there is: ${available.map((t) => t.name).join(", ") || "none"})`,
    );
  }
  if (transition.to === undefined) {
    return refuse(
      `transition '${transition.name}' leaves through a plugin exit, which ` +
        "needs a composed lifecycle",
    );
  }
  if (transition.manual === true && input.manualConfirmed !== true) {
    return refuse(
      `transition '${transition.name}' is manual: a person must confirm it`,
    );
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
  const target = findStage(lifecycle, to);
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
