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
import { evaluateGates } from "./gates.ts";
import type { AwaitingExit, JournalEvent } from "./journal.ts";
import {
  findStage,
  type GateSpec,
  type Lifecycle,
  transitionsFrom,
  type TransitionSpec,
} from "./lifecycle_schema.ts";
import { cycleLimitFor, type Env } from "./run_ops.ts";
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
//   - it is manual and has gates, all passing: a decision the run's state has
//     opened, such as what to do after a failed pull request.
// A manual exit with no gates is a way back a person may always take, and a
// global transition is an escape hatch; neither is a stop. A gate declined in
// this stage entry waits on rework, not on a person, until a product is
// recorded after the decline. A conditional approval whose `when` is false
// passes, so it is no stop; one whose `when` cannot be evaluated waits on a
// fix to the run data or the lifecycle, not on a person, even though status
// lists it as required so the driver stops and asks.
// ---------------------------------------------------------------------------

/** The exits of the current stage entry that only a person can open. */
export async function personHeldExits(
  run: RunRecord,
  lifecycle: Lifecycle,
  store: RunStore,
  env: Env,
  at: string,
): Promise<AwaitingExit[]> {
  if (run.status !== "active") return [];
  const stage = findStage(lifecycle, run.stage);
  if (stage === undefined) return [];
  const globals = lifecycle.globalTransitions ?? [];
  const held: AwaitingExit[] = [];
  for (const transition of transitionsFrom(lifecycle, stage)) {
    if (globals.includes(transition)) continue;
    const exit = await heldBy(run, lifecycle, transition, store, env, at);
    if (exit !== null) held.push(exit);
  }
  return held;
}

async function heldBy(
  run: RunRecord,
  lifecycle: Lifecycle,
  transition: TransitionSpec,
  store: RunStore,
  env: Env,
  at: string,
): Promise<AwaitingExit | null> {
  const limit = cycleLimitFor(run, lifecycle, transition);
  if (limit !== null && !limit.allowed) return null;
  const gates = transition.gates ?? [];
  const checks = await evaluateGates(run, lifecycle, transition, store, env);
  const pending: string[] = [];
  let readyAt: number | null = null;
  for (const [i, gate] of gates.entries()) {
    if (checks[i].pass) continue;
    if (gate.type === "human-approval") {
      if (checks[i].conditionError === true) return null;
      if (declinedAwaitingRework(run, gate.config.id)) return null;
      pending.push(gate.config.id);
      continue;
    }
    const lifts = gate.type === "cooldown" ? cooldownEnd(gate, run) : null;
    if (lifts === null) return null;
    readyAt = Math.max(readyAt ?? lifts, lifts);
  }
  const manual = transition.manual === true;
  if (pending.length === 0 && !(manual && gates.length > 0)) return null;
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
 * Whether a human-approval gate is blocked by a decline in this stage entry
 * with no product recorded since: the work goes back to whoever does the
 * rework, and a person is not yet being asked again.
 */
function declinedAwaitingRework(run: RunRecord, gateId: string): boolean {
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
  return !run.journal.slice(index + 1).some((e) =>
    e.type === "recorded" && e.era === run.era && e.stage === run.stage &&
    e.cycle === cycle
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
function keyOf(exits: AwaitingExit[], at: string): string {
  const now = Date.parse(at);
  return JSON.stringify(
    exits.map((e) => [
      e.transition,
      e.manual,
      [...e.gateIds].sort(),
      e.readyAt !== undefined && Date.parse(e.readyAt) > now ? e.readyAt : null,
    ]).sort((a, b) => String(a[0]).localeCompare(String(b[0]))),
  );
}

/** The exits the journal last recorded as held in the current stage entry. */
export function lastAwaiting(run: RunRecord): AwaitingExit[] {
  const cycle = currentCycle(run);
  for (let i = run.journal.length - 1; i >= 0; i--) {
    const e = run.journal[i];
    if (e.era !== run.era || e.stage !== run.stage || e.cycle !== cycle) {
      continue;
    }
    if (e.type === "awaiting") return e.exits;
  }
  return [];
}

/**
 * The run with an `awaiting` event appended when the set of person-held exits
 * differs from the one the journal last recorded for this stage entry;
 * otherwise the run unchanged. Reads payloads through the store for the
 * gates, and makes no network call. When the run data cannot be read, the
 * gates that need it would fail for a reason that says nothing about a
 * person, and the journal cannot take a wrong event back, so nothing is
 * noted; the next commit that can read it notes any change.
 */
export async function noteAwaiting(
  run: RunRecord,
  lifecycle: Lifecycle,
  store: RunStore,
  env: Env,
): Promise<RunRecord> {
  const readable = await buildCelContext(run, store).then(
    () => true,
    () => false,
  );
  if (!readable) return run;
  const at = env.now();
  const exits = await personHeldExits(run, lifecycle, store, env, at);
  if (keyOf(exits, at) === keyOf(lastAwaiting(run), at)) return run;
  const cause = run.journal[run.journal.length - 1];
  const event: JournalEvent = {
    type: "awaiting",
    exits,
    at,
    era: run.era,
    stage: run.stage,
    cycle: currentCycle(run),
    actor: cause?.actor ?? { principal: null, source: "none" },
  };
  return { ...run, journal: [...run.journal, event] };
}
