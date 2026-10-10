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

import type { AwaitingExit, JournalEvent } from "./journal.ts";
import { type FactoryDefinition, findStage } from "./definition_schema.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";

// ---------------------------------------------------------------------------
// Per-work-item metrics, computed from the run record and its journal alone.
// Nothing here reads the clock: a stage or wait still running has its start
// and a null end, so the same run record always gives the same metrics. The
// model types store the result as the derived `metrics` record after every
// commit; it can always be rebuilt from the run.
// ---------------------------------------------------------------------------

export const METRICS_SCHEMA_VERSION = 1;

/** One entry into a stage. */
export interface StageVisit {
  stage: string;
  cycle: number;
  enteredAt: string;
  /** Null while the stage is current, and for a terminal stage. */
  leftAt: string | null;
  durationMs: number | null;
  /** The transition taken out, or "reset". */
  leftBy: string | null;
  terminal: boolean;
}

/**
 * A period in which work was held only by a person: an exit of the stage
 * (kind `exit`), or the stage's next dispatch, parked at its dispatch cap
 * until a person grants a dispatch override (kind `dispatch-override`, with
 * no transition, not manual and no gates).
 */
export interface Wait {
  kind: "exit" | "dispatch-override";
  stage: string;
  cycle: number;
  transition: string | null;
  manual: boolean;
  gateIds: string[];
  from: string;
  /** Null while still waiting. */
  until: string | null;
  durationMs: number | null;
  /**
   * approved / declined: a decision on one of its gates released it;
   * overridden: a dispatch override released a parked dispatch;
   * advanced: the work item moved on; reset: a reset ended it; cleared: the
   * exit stopped needing a person for another reason (a gate it passed on
   * now fails, or its cooldown restarted); null: still waiting.
   */
  endedBy:
    | "approved"
    | "declined"
    | "overridden"
    | "advanced"
    | "reset"
    | "cleared"
    | null;
}

export interface StageTotals {
  visits: number;
  reentries: number;
  /** Time in finished visits. */
  timeMs: number;
  /** Whether a visit is still running (never for a terminal stage). */
  open: boolean;
}

export interface ModelUsage {
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  dispatches: number;
}

export interface Usage {
  /** Each dispatch's totalTokens when reported, else its input plus output. */
  totalTokens: number;
  /** Over the dispatches that reported the input/output split. */
  inputTokens: number;
  outputTokens: number;
  dispatchesWithSplit: number;
  /** Over the dispatches that reported them. */
  toolUses: number;
  durationMs: number;
  byModel: Record<string, ModelUsage>;
  dispatchesWithUsage: number;
  dispatchesWithoutUsage: number;
  /** Dispatches without usage by their stage's work mode. An interactive
   * dispatch normally has none: nothing reports the driver's own tokens. */
  withoutUsageByMode: Record<string, number>;
  /** Usage is reported by whoever did the work, not measured. */
  attested: true;
}

/**
 * How dispatches ended. open: no outcome yet in the stage entry the work item
 * is in now; none: no outcome in an entry it has left, which never will.
 */
export interface DispatchOutcomes {
  succeeded: number;
  failed: number;
  interrupted: number;
  open: number;
  none: number;
}

function emptyOutcomes(): DispatchOutcomes {
  return { succeeded: 0, failed: 0, interrupted: 0, open: 0, none: 0 };
}

/** Counts and times over an era, or over the whole work item. */
export interface Summary {
  stages: Record<string, StageTotals>;
  rework: {
    /** Entries into a stage after its first, in the era. */
    reentries: number;
    /** Versions recorded of each artifact that reviews another. */
    reviewRounds: Record<string, { reviews: string; rounds: number }>;
    declines: number;
    rejections: number;
  };
  /** count and open are per exit; timeMs is the time covered by finished
   * waits, so a person kept waiting on two exits at once counts once. */
  waits: { count: number; open: number; timeMs: number };
  dispatches: { count: number; retries: number };
  /** How the dispatches ended. */
  dispatchOutcomes: DispatchOutcomes;
  overrides: { cycle: number; dispatch: number };
  usage: Usage;
}

export interface EraMetrics {
  era: string;
  startedAt: string;
  endedAt: string | null;
  endedBy: "terminal" | "reset" | null;
  durationMs: number | null;
  visits: StageVisit[];
  waits: Wait[];
  /** Dispatches per stage entry; retries are those after the first, not
   * counting interrupted ones: an interruption is not the work failing. */
  dispatches: {
    stage: string;
    cycle: number;
    dispatches: number;
    retries: number;
    outcomes: DispatchOutcomes;
  }[];
  overrides: { kind: "cycle" | "dispatch"; stage: string; at: string }[];
  summary: Summary;
}

export interface Metrics {
  schemaVersion: typeof METRICS_SCHEMA_VERSION;
  key: string;
  externalRefs: Record<string, string>;
  factory: RunRecord["factory"];
  definition: RunRecord["definition"];
  status: RunRecord["status"];
  stage: string;
  /** The length of the journal these metrics were computed from. */
  journalVersion: number;
  startedAt: string;
  /** When the work item reached a terminal stage; null while active. */
  endedAt: string | null;
  durationMs: number | null;
  eras: EraMetrics[];
  /** Every era together. */
  summary: Summary;
}

function between(from: string, until: string): number {
  return Date.parse(until) - Date.parse(from);
}

function emptyModelUsage(): ModelUsage {
  return { totalTokens: 0, inputTokens: 0, outputTokens: 0, dispatches: 0 };
}

function emptySummary(): Summary {
  return {
    stages: {},
    rework: { reentries: 0, reviewRounds: {}, declines: 0, rejections: 0 },
    waits: { count: 0, open: 0, timeMs: 0 },
    dispatches: { count: 0, retries: 0 },
    dispatchOutcomes: emptyOutcomes(),
    overrides: { cycle: 0, dispatch: 0 },
    usage: {
      totalTokens: 0,
      inputTokens: 0,
      outputTokens: 0,
      dispatchesWithSplit: 0,
      toolUses: 0,
      durationMs: 0,
      byModel: {},
      dispatchesWithUsage: 0,
      dispatchesWithoutUsage: 0,
      withoutUsageByMode: {},
      attested: true,
    },
  };
}

interface EraState {
  metrics: EraMetrics;
  visit: StageVisit;
  open: Map<string, Wait>;
  /** The open dispatch-override wait, apart from the exits so no
   * transition name can collide with it. */
  parked: Wait | null;
  reviewRounds: Map<string, { reviews: string; rounds: number }>;
  declines: number;
  rejections: number;
}

/** The artifacts the factory definition declares as reviewing another, by name.
 */
function reviewLinks(definition: FactoryDefinition): Map<string, string> {
  const links = new Map<string, string>();
  for (const stage of definition.stages) {
    for (const artifact of stage.artifacts ?? []) {
      if (artifact.reviews !== undefined) {
        links.set(artifact.name, artifact.reviews);
      }
    }
  }
  return links;
}

/**
 * The metrics of a work item. Review rounds use the factory definition's
 * `reviews` links; pass the factory definition the run is pinned to. An era
 * from before a repinning reset is read with the current pin's links.
 */
export function computeMetrics(
  run: RunRecord,
  definition: FactoryDefinition,
): Metrics {
  const links = reviewLinks(definition);
  const isTerminal = (stage: string) =>
    findStage(definition, stage)?.terminal === true;
  const eras: EraState[] = [];
  let current: EraState | undefined;

  const closeVisit = (state: EraState, at: string, by: string) => {
    if (state.visit.terminal || state.visit.leftAt !== null) return;
    state.visit.leftAt = at;
    state.visit.durationMs = between(state.visit.enteredAt, at);
    state.visit.leftBy = by;
  };
  const closeWait = (
    state: EraState,
    transition: string,
    at: string,
    endedBy: NonNullable<Wait["endedBy"]>,
  ) => {
    const wait = state.open.get(transition);
    if (wait === undefined) return;
    state.open.delete(transition);
    finishWait(state, wait, at, endedBy);
  };
  const closeParked = (
    state: EraState,
    at: string,
    endedBy: NonNullable<Wait["endedBy"]>,
  ) => {
    const wait = state.parked;
    if (wait === null) return;
    state.parked = null;
    finishWait(state, wait, at, endedBy);
  };
  const finishWait = (
    state: EraState,
    wait: Wait,
    at: string,
    endedBy: NonNullable<Wait["endedBy"]>,
  ) => {
    // A wait whose cooldown had not lifted when it ended never happened.
    if (Date.parse(at) < Date.parse(wait.from)) return;
    wait.until = at;
    wait.durationMs = between(wait.from, at);
    wait.endedBy = endedBy;
    state.metrics.waits.push(wait);
  };
  const beginEra = (event: JournalEvent) => {
    const visit: StageVisit = {
      stage: event.stage,
      cycle: event.cycle,
      enteredAt: event.at,
      leftAt: null,
      durationMs: null,
      leftBy: null,
      terminal: isTerminal(event.stage),
    };
    current = {
      metrics: {
        era: event.era,
        startedAt: event.at,
        endedAt: null,
        endedBy: null,
        durationMs: null,
        visits: [visit],
        waits: [],
        dispatches: [],
        overrides: [],
        summary: emptySummary(),
      },
      visit,
      open: new Map(),
      parked: null,
      reviewRounds: new Map(),
      declines: 0,
      rejections: 0,
    };
    eras.push(current);
  };
  const endEra = (
    state: EraState,
    at: string,
    by: "terminal" | "reset",
  ) => {
    if (state.metrics.endedAt !== null) return;
    state.metrics.endedAt = at;
    state.metrics.endedBy = by;
    state.metrics.durationMs = between(state.metrics.startedAt, at);
  };

  run.journal.forEach((event, index) => {
    if (event.type === "started") {
      beginEra(event);
      return;
    }
    if (event.type === "reset") {
      if (current !== undefined) {
        closeVisit(current, event.at, "reset");
        for (const transition of [...current.open.keys()]) {
          closeWait(current, transition, event.at, "reset");
        }
        closeParked(current, event.at, "reset");
        endEra(current, event.at, "reset");
      }
      beginEra(event);
      return;
    }
    const state = current;
    if (state === undefined) return;
    switch (event.type) {
      case "advanced": {
        closeVisit(state, event.at, event.transition);
        for (const transition of [...state.open.keys()]) {
          closeWait(state, transition, event.at, "advanced");
        }
        closeParked(state, event.at, "advanced");
        const terminal = isTerminal(event.to);
        state.visit = {
          stage: event.to,
          cycle: event.toCycle,
          enteredAt: event.at,
          leftAt: null,
          durationMs: null,
          leftBy: null,
          terminal,
        };
        state.metrics.visits.push(state.visit);
        if (terminal) endEra(state, event.at, "terminal");
        return;
      }
      case "awaiting": {
        const cause = run.journal[index - 1];
        const held = new Map<string, AwaitingExit>(
          event.exits.map((e) => [e.transition, e]),
        );
        for (const [transition, wait] of [...state.open]) {
          if (held.has(transition)) continue;
          const decided = cause?.type === "approval" &&
              wait.gateIds.includes(cause.gateId)
            ? (cause.decision === "approve" ? "approved" : "declined")
            : "cleared";
          closeWait(state, transition, event.at, decided);
        }
        for (const exit of event.exits) {
          const open = state.open.get(exit.transition);
          // A restarted cooldown: the exit stopped being ready when the
          // product it counts from was recorded again. The old wait ends
          // there (or never happened), and a new one starts when it lifts.
          if (
            open !== undefined && exit.readyAt !== undefined &&
            exit.readyAt !== open.from
          ) {
            closeWait(state, exit.transition, event.at, "cleared");
          }
          if (state.open.has(exit.transition)) continue;
          state.open.set(exit.transition, {
            kind: "exit",
            stage: event.stage,
            cycle: event.cycle,
            transition: exit.transition,
            manual: exit.manual,
            gateIds: exit.gateIds,
            from: exit.readyAt ?? event.at,
            until: null,
            durationMs: null,
            endedBy: null,
          });
        }
        if (event.dispatchOverride === undefined) {
          closeParked(
            state,
            event.at,
            cause?.type === "override" && cause.kind === "dispatch"
              ? "overridden"
              : "cleared",
          );
        } else if (state.parked === null) {
          state.parked = {
            kind: "dispatch-override",
            stage: event.stage,
            cycle: event.cycle,
            transition: null,
            manual: false,
            gateIds: [],
            from: event.at,
            until: null,
            durationMs: null,
            endedBy: null,
          };
        }
        return;
      }
      case "approval":
        if (event.decision === "decline") state.declines++;
        return;
      case "rejected":
        state.rejections++;
        return;
      case "recorded": {
        const reviews = event.kind === "artifact"
          ? links.get(event.name)
          : undefined;
        if (reviews === undefined) return;
        const round = state.reviewRounds.get(event.name) ??
          { reviews, rounds: 0 };
        round.rounds++;
        state.reviewRounds.set(event.name, round);
        return;
      }
      case "override":
        state.metrics.overrides.push({
          kind: event.kind,
          stage: event.for,
          at: event.at,
        });
        return;
      default:
        return;
    }
  });

  for (const state of eras) {
    // Waits still open go last, in the order they began.
    state.metrics.waits.push(
      ...[
        ...state.open.values(),
        ...(state.parked !== null ? [state.parked] : []),
      ].sort((a, b) => Date.parse(a.from) - Date.parse(b.from)),
    );
    summarize(state, run, definition);
  }
  const summary = emptySummary();
  for (const state of eras) addSummary(summary, state.metrics.summary);

  const first = eras[0]?.metrics;
  const last = eras[eras.length - 1]?.metrics;
  const endedAt = run.status === "terminal" ? last?.endedAt ?? null : null;
  const startedAt = first?.startedAt ?? "";
  return {
    schemaVersion: METRICS_SCHEMA_VERSION,
    key: run.key,
    externalRefs: run.externalRefs,
    factory: run.factory,
    definition: run.definition,
    status: run.status,
    stage: run.stage,
    journalVersion: run.journal.length,
    startedAt,
    endedAt,
    durationMs: endedAt === null ? null : between(startedAt, endedAt),
    eras: eras.map((s) => s.metrics),
    summary,
  };
}

/** The time covered by finished waits, overlapping ones merged. */
function coveredMs(waits: Wait[]): number {
  const spans = waits.flatMap((w) =>
    w.until === null ? [] : [[Date.parse(w.from), Date.parse(w.until)]]
  ).sort((a, b) => a[0] - b[0]);
  let total = 0;
  let end = -Infinity;
  for (const [from, until] of spans) {
    if (until <= end) continue;
    total += until - Math.max(from, end);
    end = until;
  }
  return total;
}

function summarize(
  state: EraState,
  run: RunRecord,
  definition: FactoryDefinition,
): void {
  const m = state.metrics;
  const s = m.summary;
  for (const visit of m.visits) {
    const totals = s.stages[visit.stage] ??
      { visits: 0, reentries: 0, timeMs: 0, open: false };
    totals.visits++;
    totals.reentries = totals.visits - 1;
    if (visit.durationMs !== null) totals.timeMs += visit.durationMs;
    if (!visit.terminal && visit.leftAt === null) totals.open = true;
    s.stages[visit.stage] = totals;
  }
  s.rework.reentries = Object.values(s.stages).reduce(
    (n, t) => n + t.reentries,
    0,
  );
  s.rework.reviewRounds = Object.fromEntries(state.reviewRounds);
  s.rework.declines = state.declines;
  s.rework.rejections = state.rejections;
  for (const wait of m.waits) {
    s.waits.count++;
    if (wait.durationMs === null) s.waits.open++;
  }
  s.waits.timeMs = coveredMs(m.waits);
  for (const dispatch of run.dispatches) {
    if (dispatch.era !== m.era) continue;
    let entry = m.dispatches.find((d) =>
      d.stage === dispatch.stage && d.cycle === dispatch.cycle
    );
    if (entry === undefined) {
      entry = {
        stage: dispatch.stage,
        cycle: dispatch.cycle,
        dispatches: 0,
        retries: 0,
        outcomes: emptyOutcomes(),
      };
      m.dispatches.push(entry);
    }
    entry.dispatches++;
    const ended = dispatch.outcome?.value ??
      (run.status === "active" && dispatch.era === run.era &&
          dispatch.stage === run.stage &&
          dispatch.cycle === currentCycle(run)
        ? "open"
        : "none");
    entry.outcomes[ended]++;
    s.dispatchOutcomes[ended]++;
    entry.retries = Math.max(
      0,
      entry.dispatches - entry.outcomes.interrupted - 1,
    );
    s.dispatches.count++;
    const usage = dispatch.usage;
    if (usage === undefined) {
      s.usage.dispatchesWithoutUsage++;
      // A dispatch recorded before its mode was kept falls back to the
      // stage's mode in the pinned definition.
      const mode = dispatch.mode ??
        findStage(definition, dispatch.stage)?.work?.mode ?? "interactive";
      s.usage.withoutUsageByMode[mode] =
        (s.usage.withoutUsageByMode[mode] ?? 0) + 1;
      continue;
    }
    s.usage.dispatchesWithUsage++;
    const model = usage.model ?? "unknown";
    const byModel = s.usage.byModel[model] ?? emptyModelUsage();
    const total = usage.totalTokens ??
      (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0);
    s.usage.totalTokens += total;
    byModel.totalTokens += total;
    if (usage.inputTokens !== undefined && usage.outputTokens !== undefined) {
      s.usage.dispatchesWithSplit++;
      s.usage.inputTokens += usage.inputTokens;
      s.usage.outputTokens += usage.outputTokens;
      byModel.inputTokens += usage.inputTokens;
      byModel.outputTokens += usage.outputTokens;
    }
    s.usage.toolUses += usage.toolUses ?? 0;
    s.usage.durationMs += usage.durationMs ?? 0;
    byModel.dispatches++;
    s.usage.byModel[model] = byModel;
  }
  s.dispatches.retries = m.dispatches.reduce((n, d) => n + d.retries, 0);
  for (const override of m.overrides) s.overrides[override.kind]++;
}

function addSummary(into: Summary, from: Summary): void {
  for (const [stage, t] of Object.entries(from.stages)) {
    const totals = into.stages[stage] ??
      { visits: 0, reentries: 0, timeMs: 0, open: false };
    totals.visits += t.visits;
    totals.reentries += t.reentries;
    totals.timeMs += t.timeMs;
    totals.open = totals.open || t.open;
    into.stages[stage] = totals;
  }
  into.rework.reentries += from.rework.reentries;
  for (const [name, r] of Object.entries(from.rework.reviewRounds)) {
    const round = into.rework.reviewRounds[name] ??
      { reviews: r.reviews, rounds: 0 };
    round.rounds += r.rounds;
    into.rework.reviewRounds[name] = round;
  }
  into.rework.declines += from.rework.declines;
  into.rework.rejections += from.rework.rejections;
  into.waits.count += from.waits.count;
  into.waits.open += from.waits.open;
  into.waits.timeMs += from.waits.timeMs;
  into.dispatches.count += from.dispatches.count;
  into.dispatches.retries += from.dispatches.retries;
  for (
    const key of Object.keys(
      into.dispatchOutcomes,
    ) as (keyof DispatchOutcomes)[]
  ) {
    into.dispatchOutcomes[key] += from.dispatchOutcomes[key];
  }
  into.overrides.cycle += from.overrides.cycle;
  into.overrides.dispatch += from.overrides.dispatch;
  const u = into.usage;
  u.totalTokens += from.usage.totalTokens;
  u.inputTokens += from.usage.inputTokens;
  u.outputTokens += from.usage.outputTokens;
  u.dispatchesWithSplit += from.usage.dispatchesWithSplit;
  u.toolUses += from.usage.toolUses;
  u.durationMs += from.usage.durationMs;
  u.dispatchesWithUsage += from.usage.dispatchesWithUsage;
  u.dispatchesWithoutUsage += from.usage.dispatchesWithoutUsage;
  for (const [mode, n] of Object.entries(from.usage.withoutUsageByMode)) {
    u.withoutUsageByMode[mode] = (u.withoutUsageByMode[mode] ?? 0) + n;
  }
  for (const [model, m] of Object.entries(from.usage.byModel)) {
    const byModel = u.byModel[model] ?? emptyModelUsage();
    byModel.totalTokens += m.totalTokens;
    byModel.inputTokens += m.inputTokens;
    byModel.outputTokens += m.outputTokens;
    byModel.dispatches += m.dispatches;
    u.byModel[model] = byModel;
  }
}
