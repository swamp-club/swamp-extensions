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

import { buildCelContext } from "./cel_context.ts";
import { evaluateGates, type GateCheck } from "./gates.ts";
import type {
  AwaitingExit,
  DispatchOverrideHold,
  JournalEvent,
} from "./journal.ts";
import {
  type FactoryDefinition,
  findStage,
  type GateSpec,
  type StageSpec,
  transitionsFrom,
  type TransitionSpec,
} from "./definition_schema.ts";
import {
  currentPark,
  cycleLimitFor,
  dispatchCap,
  type Env,
  lastAwaitingEvent,
} from "./run_ops.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";
import type { RunStore } from "./run_store.ts";

// ---------------------------------------------------------------------------
// Human stops. The journal records when an exit becomes held only by a
// person, so the time a person kept work waiting is exact rather than
// replayed later against gate code and payloads that may have changed.
//
// An exit is held by a person when it is not a global escape transition, its
// cycle limit allows entry, every gate that is not a human approval passes
// (a cooldown counts from when it lifts), and either
//   - one of its human-approval gates is pending, or
//   - it is manual and has gates, all passing, and the agent has no way out
//     of its own: a decision the run's state has opened, such as what to do
//     after a failed pull request.
// The agent has a way out while a non-manual exit is ready without a pending
// approval, waits on a product this stage records and the agent has not yet
// recorded in this stage entry, or waits only on a cooldown with a known end.
// A gate that fails on a product already recorded (a field that does not
// match, findings, a cel expression) leaves a decision, not the agent's work.
// A manual exit with no gates is a way back a person may always take, and a
// global transition is an escape hatch; neither is a stop. A gate declined in
// this stage entry waits on rework, not on a person, until a product is
// recorded after the decline; evidence a person records (their feedback, say)
// is not rework and does not count. A conditional approval whose `when` is
// false passes, so it is no stop; one whose `when` cannot be evaluated waits
// on a fix to the run data or the factory definition, not on a person, even
// though status lists it as required so the driver stops and asks.
// ---------------------------------------------------------------------------

/** The exits of the current stage entry that only a person can open. */
export async function personHeldExits(
  run: RunRecord,
  definition: FactoryDefinition,
  store: RunStore,
  env: Env,
  at: string,
): Promise<AwaitingExit[]> {
  if (run.status !== "active") return [];
  const stage = findStage(definition, run.stage);
  if (stage === undefined) return [];
  const globals = definition.globalTransitions ?? [];
  const exits: Array<{ transition: TransitionSpec; checks: GateCheck[] }> = [];
  for (const transition of transitionsFrom(definition, stage)) {
    if (globals.includes(transition)) continue;
    const limit = cycleLimitFor(run, definition, transition);
    if (limit !== null && !limit.allowed) continue;
    const checks = await evaluateGates(run, definition, transition, store, env);
    exits.push({ transition, checks });
  }
  const agentWayOut = exits.some(({ transition, checks }) =>
    transition.manual !== true && isAgentsWay(run, stage, transition, checks)
  );
  const held: AwaitingExit[] = [];
  for (const { transition, checks } of exits) {
    const exit = heldBy(run, definition, transition, checks, agentWayOut, at);
    if (exit !== null) held.push(exit);
  }
  return held;
}

function heldBy(
  run: RunRecord,
  definition: FactoryDefinition,
  transition: TransitionSpec,
  checks: GateCheck[],
  agentWayOut: boolean,
  at: string,
): AwaitingExit | null {
  const gates = transition.gates ?? [];
  const pending: string[] = [];
  let readyAt: number | null = null;
  for (const [i, gate] of gates.entries()) {
    if (checks[i].pass) continue;
    if (gate.type === "human-approval") {
      if (checks[i].conditionError === true) return null;
      if (declinedAwaitingRework(run, definition, gate.config.id)) {
        return null;
      }
      pending.push(gate.config.id);
      continue;
    }
    const lifts = gate.type === "cooldown" ? cooldownEnd(gate, run) : null;
    if (lifts === null) return null;
    readyAt = Math.max(readyAt ?? lifts, lifts);
  }
  const manual = transition.manual === true;
  const decision = manual && gates.length > 0 && !agentWayOut;
  if (pending.length === 0 && !decision) return null;
  return {
    transition: transition.name,
    to: transition.to,
    manual,
    gateIds: pending,
    ...(readyAt !== null && readyAt > Date.parse(at)
      ? { readyAt: new Date(readyAt).toISOString() }
      : {}),
  };
}

/**
 * Whether a non-manual exit is still the agent's way out: ready without a
 * pending approval, waiting on a product this stage records that the agent
 * has not recorded in this stage entry, or waiting only on cooldowns that
 * will lift. A product of another stage cannot be recorded here, and
 * evidence a person records is not the agent's.
 */
function isAgentsWay(
  run: RunRecord,
  stage: StageSpec,
  transition: TransitionSpec,
  checks: GateCheck[],
): boolean {
  const failing = (transition.gates ?? []).filter((_, i) => !checks[i].pass);
  if (failing.length === 0) return true;
  if (failing.some((gate) => awaitsAgentProduct(run, stage, gate))) {
    return true;
  }
  return failing.every((gate) =>
    gate.type === "cooldown" && cooldownEnd(gate, run) !== null
  );
}

/** Whether a failing gate waits on a product the agent records in this
 * stage and has not recorded in this stage entry. */
function awaitsAgentProduct(
  run: RunRecord,
  stage: StageSpec,
  gate: GateSpec,
): boolean {
  const thisEntry = (ref: { stage: string; cycle: number } | undefined) =>
    ref !== undefined && ref.stage === run.stage &&
    ref.cycle === currentCycle(run);
  const artifact = (name: string) =>
    (stage.artifacts ?? []).some((a) => a.name === name);
  const evidence = (name: string) =>
    (stage.evidence ?? []).some((e) =>
      e.name === name && e.recordedBy !== "person"
    );
  switch (gate.type) {
    case "artifact-exists":
    case "artifact-fresh":
      return artifact(gate.config.artifact);
    case "evidence-recorded":
      return evidence(gate.config.name) &&
        !thisEntry(run.products.evidence[gate.config.name]);
    case "cooldown": {
      const { afterEvidence, afterArtifact } = gate.config;
      return afterEvidence !== undefined
        ? evidence(afterEvidence) &&
          !thisEntry(run.products.evidence[afterEvidence])
        : afterArtifact !== undefined && artifact(afterArtifact) &&
          run.products.artifacts[afterArtifact] === undefined;
    }
    default:
      return false;
  }
}

/**
 * Whether a human-approval gate is blocked by a decline in this stage entry
 * with no product recorded since: the work goes back to whoever does the
 * rework, and a person is not yet being asked again. Evidence a person
 * records is not rework, so it does not count.
 */
function declinedAwaitingRework(
  run: RunRecord,
  definition: FactoryDefinition,
  gateId: string,
): boolean {
  const cycle = currentCycle(run);
  const latest = new Map<string, { id: number; decline: boolean }>();
  for (const a of run.approvals) {
    if (
      a.gateId !== gateId || a.era !== run.era || a.stage !== run.stage ||
      a.cycle !== cycle
    ) continue;
    latest.set(a.actor.principal ?? "", {
      id: a.id,
      decline: a.decision === "decline",
    });
  }
  const declines = [...latest.values()].filter((d) => d.decline);
  if (declines.length === 0) return false;
  const lastDecline = Math.max(...declines.map((d) => d.id));
  const index = run.journal.findIndex((e) =>
    e.type === "approval" && e.approvalId === lastDecline
  );
  const byPerson = new Set(
    (findStage(definition, run.stage)?.evidence ?? []).flatMap((spec) =>
      spec.recordedBy === "person" ? [spec.name] : []
    ),
  );
  return !run.journal.slice(index + 1).some((e) =>
    e.type === "recorded" && e.era === run.era && e.stage === run.stage &&
    e.cycle === cycle && !(e.kind === "evidence" && byPerson.has(e.name))
  );
}

/** When a cooldown gate lifts, or null when it has nothing to count from. */
function cooldownEnd(
  gate: Extract<GateSpec, { type: "cooldown" }>,
  run: RunRecord,
): number | null {
  const { afterEvidence, afterArtifact, seconds } = gate.config;
  const ref = afterEvidence !== undefined
    ? run.products.evidence[afterEvidence]
    : afterArtifact !== undefined
    ? run.products.artifacts[afterArtifact]
    : undefined;
  if (ref === undefined) return null;
  const recordedAt = Date.parse(ref.at);
  return Number.isNaN(recordedAt) ? null : recordedAt + seconds * 1000;
}

/**
 * What makes two sets of held exits the same. A readyAt counts while it is
 * still ahead of `at`, so a cooldown restarted by a new recording is a change,
 * but one that has simply lifted since is not.
 */
function keyOf(
  exits: AwaitingExit[],
  hold: DispatchOverrideHold | undefined,
  at: string,
): string {
  const now = Date.parse(at);
  return JSON.stringify([
    hold !== undefined,
    exits.map((e) => [
      e.transition,
      e.manual,
      [...e.gateIds].sort(),
      e.readyAt !== undefined && Date.parse(e.readyAt) > now ? e.readyAt : null,
    ]).sort((a, b) => String(a[0]).localeCompare(String(b[0]))),
  ]);
}

/**
 * The dispatch override hold the stage entry still carries: the one its last
 * `awaiting` event recorded (written when a dispatch was refused at the cap,
 * see parkAtDispatchCap), while the cap still refuses one more dispatch and no
 * dispatch override has been granted since. A grant ends it even when its
 * commit could not note that, so a hold the journal left behind never outlives
 * the grant; a new stage entry or era never had it.
 */
export function heldDispatchOverride(
  run: RunRecord,
  definition: FactoryDefinition,
): DispatchOverrideHold | undefined {
  if (run.status !== "active") return undefined;
  return currentPark(run, dispatchCap(run, definition));
}

/**
 * The run with an `awaiting` event appended when the set of person-held exits,
 * or whether the entry is still parked at its dispatch cap, differs from what
 * the journal last recorded for this stage entry; otherwise the run
 * unchanged. Reads payloads through the store for the
 * gates, and makes no network call. When the run data cannot be read, the
 * gates that need it would fail for a reason that says nothing about a
 * person, and the journal cannot take a wrong event back, so nothing is
 * noted; the next commit that can read it notes any change.
 */
export async function noteAwaiting(
  run: RunRecord,
  definition: FactoryDefinition,
  store: RunStore,
  env: Env,
): Promise<RunRecord> {
  const readable = await buildCelContext(run, store).then(
    () => true,
    () => false,
  );
  if (!readable) return run;
  const at = env.now();
  const exits = await personHeldExits(run, definition, store, env, at);
  const hold = heldDispatchOverride(run, definition);
  const last = lastAwaitingEvent(run);
  if (
    keyOf(exits, hold, at) ===
      keyOf(last?.exits ?? [], last?.dispatchOverride, at)
  ) {
    return run;
  }
  const cause = run.journal[run.journal.length - 1];
  const event: JournalEvent = {
    type: "awaiting",
    exits,
    ...(hold !== undefined ? { dispatchOverride: hold } : {}),
    at,
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    actor: cause?.actor ?? { principal: null, source: "none" },
  };
  return { ...run, journal: [...run.journal, event] };
}
