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

// Simulate mode's model: the factory's saved scenarios run on the engine's own
// scenario runner, walks a person takes from any frame, the steps they can
// take there, and a walk as a scenario entry to hand to the agent. Pure and
// DOM-free, so the tests run it on the real examples.
//
// A walk is the base scenario's steps up to the frame it branched from, then
// the person's own. It is a scenario like any other, so it runs the same way
// and replays on every reload of the definition; it keeps its own copy of the
// base's steps, so it still runs when the base is renamed or removed.

import "./jitless.ts";
import { stringify as stringifyYaml } from "@std/yaml";
import {
  type FactoryDefinition,
  findStage,
} from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { TransitionReadiness } from "../../extensions/models/_lib/engine/gates.ts";
import {
  type Frame,
  type FrameKind,
  parseScenario,
  runScenario,
  type Scenario,
  type ScenarioFailure,
  type ScenarioStep,
} from "../../extensions/models/_lib/engine/scenario.ts";
import type { SavedScenario } from "./model.ts";

/** A scenario's run, without the store the runner kept it in. */
export interface Played {
  frames: Frame[];
  passed: boolean;
  failures: ScenarioFailure[];
}

/** One saved scenario: run, or why it could not be. */
export type ScenarioRun =
  & { name: string; path: string }
  & (
    | { ok: true; scenario: Scenario; played: Played }
    | { ok: false; error: string }
  );

const message = (e: unknown) => e instanceof Error ? e.message : String(e);

/** Run a scenario, keeping what the page shows. */
export async function play(
  definition: FactoryDefinition,
  scenario: Scenario,
): Promise<Played> {
  const { frames, passed, failures } = await runScenario(definition, scenario);
  return { frames, passed, failures };
}

/**
 * Run every saved scenario on `definition`. An entry that does not parse, or
 * whose run throws, is reported on its own; the rest still run.
 */
export async function runAll(
  definition: FactoryDefinition,
  saved: SavedScenario[],
): Promise<ScenarioRun[]> {
  const runs: ScenarioRun[] = [];
  for (const s of saved) {
    const parsed = parseScenario(s.value);
    if (!parsed.ok) {
      runs.push({
        name: s.name,
        path: s.path,
        ok: false,
        error: parsed.errors.join("; "),
      });
      continue;
    }
    try {
      runs.push({
        name: s.name,
        path: s.path,
        ok: true,
        scenario: parsed.value,
        played: await play(definition, parsed.value),
      });
    } catch (e) {
      runs.push({ name: s.name, path: s.path, ok: false, error: message(e) });
    }
  }
  return runs;
}

// --- walks -------------------------------------------------------------------

export interface Walk {
  /** The scenario it branched from. */
  base: string;
  /** The frame it branched from: the base's steps before it are kept. */
  branchAt: number;
  /** The base's steps up to the branch, copied. */
  baseSteps: ScenarioStep[];
  externalRefs?: Record<string, string>;
  /** The steps the person took. */
  steps: ScenarioStep[];
}

/** Branch from frame `at` of `scenario` (frame n is after step n). */
export function branch(scenario: Scenario, at: number): Walk {
  return {
    base: scenario.scenario,
    branchAt: at,
    baseSteps: structuredClone(scenario.steps.slice(0, at)),
    ...(scenario.externalRefs !== undefined
      ? { externalRefs: { ...scenario.externalRefs } }
      : {}),
    steps: [],
  };
}

/** A scenario name for the walk, for the runner and for Copy. */
export function walkName(walk: Walk): string {
  return `${walk.base}-walk`;
}

/** The walk as the scenario the runner plays. */
export function walkScenario(walk: Walk): Scenario {
  return {
    scenario: walkName(walk),
    ...(walk.externalRefs !== undefined
      ? { externalRefs: walk.externalRefs }
      : {}),
    steps: [...walk.baseSteps, ...walk.steps],
  };
}

// --- exits, and the steps a person can take -----------------------------------

export type ExitState = "ready" | "person" | "blocked";

/**
 * What an exit needs, as status reports it, read from its gate checks and
 * cycle limit: READY when it can be taken; PERSON when only a person can open
 * it (a manual exit that is otherwise ready, or one whose every failing gate
 * is a human approval that must be decided now); BLOCKED otherwise, including
 * a closed cycle limit, which a person's override opens.
 */
export function exitState(r: TransitionReadiness): ExitState {
  if (r.ready) return r.manual ? "person" : "ready";
  if (r.cycleLimit !== null && !r.cycleLimit.allowed) return "blocked";
  const failing = r.gates.filter((g) => !g.pass);
  const human = failing.length > 0 &&
    failing.every((g) =>
      g.type === "human-approval" && g.required !== false &&
      g.conditionError !== true
    );
  return human ? "person" : "blocked";
}

export const EXIT_LABELS: Record<ExitState, string> = {
  ready: "READY",
  person: "PERSON",
  blocked: "BLOCKED",
};

/** Payloads the saved scenarios record, by `<kind>:<name>`, each once. */
export type Catalogue = Map<string, Record<string, unknown>[]>;

const productKey = (kind: "artifact" | "evidence", name: string) =>
  `${kind}:${name}`;

/**
 * The payloads that the saved scenarios already record, per product: the
 * only ones `record` offers until generated examples come (swamp-club #2809).
 */
export function payloadCatalogue(runs: ScenarioRun[]): Catalogue {
  const found: Catalogue = new Map();
  const seen = new Set<string>();
  for (const run of runs) {
    if (!run.ok) continue;
    for (const step of run.scenario.steps) {
      if (step.record === undefined) continue;
      const kind = step.record.artifact !== undefined ? "artifact" : "evidence";
      const key = productKey(
        kind,
        (step.record.artifact ?? step.record.evidence) as string,
      );
      const payload = step.payload ?? {};
      const id = `${key} ${JSON.stringify(payload)}`;
      if (seen.has(id)) continue;
      seen.add(id);
      found.set(key, [...(found.get(key) ?? []), payload]);
    }
  }
  return found;
}

export type ActionGroup = "move" | "decide" | "override" | "record" | "wait";

export interface Action {
  /** Unique among the frame's actions. */
  key: string;
  group: ActionGroup;
  label: string;
  /** Why it would be refused now, when the engine says so. */
  hint?: string;
  step: ScenarioStep;
}

/** Waits a person can take, in seconds. */
export const WAITS = [60, 3600, 86400];

export function formatSeconds(s: number): string {
  if (s < 60) return `${s}s`;
  const minutes = Math.round(s / 60);
  if (minutes < 60) return `${minutes}m`;
  if (s < 86400) {
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  }
  const hours = Math.round(s / 3600);
  const d = Math.floor(hours / 24), h = hours % 24;
  return h === 0 ? `${d}d` : `${d}d ${h}h`;
}

/** A payload, short, for a button. */
function preview(payload: Record<string, unknown>): string {
  const text = JSON.stringify(payload);
  return text.length > 48 ? `${text.slice(0, 47)}…` : text;
}

/**
 * The steps a person can take from `frame`: every exit (BLOCKED ones too, to
 * see the refusal), approve or decline on each human approval still pending,
 * an override where a cycle limit closes an exit, a record of the stage's
 * products with a payload the saved scenarios use, and a wait.
 */
export function actionsAt(
  definition: FactoryDefinition,
  frame: Frame,
  catalogue: Catalogue,
): Action[] {
  if (frame.run.status !== "active") return [];
  const actions: Action[] = [];
  for (const r of frame.readiness) {
    const state = exitState(r);
    actions.push({
      key: `move:${r.name}`,
      group: "move",
      label: `${r.manual ? "✋ " : ""}${r.name} → ${r.to} · ${
        EXIT_LABELS[state]
      }`,
      ...(r.failures.length > 0 ? { hint: r.failures.join("; ") } : {}),
      step: r.manual ? { move: r.name, manual: true } : { move: r.name },
    });
  }
  const gates = new Set<string>();
  for (const r of frame.readiness) {
    for (const g of r.gates) {
      if (
        g.type !== "human-approval" || g.pass || g.gateId === undefined ||
        gates.has(g.gateId)
      ) continue;
      gates.add(g.gateId);
      actions.push({
        key: `approve:${g.gateId}`,
        group: "decide",
        label: `approve ${g.gateId}`,
        step: { approve: g.gateId },
      }, {
        key: `decline:${g.gateId}`,
        group: "decide",
        label: `decline ${g.gateId}`,
        step: { decline: g.gateId },
      });
    }
  }
  const limited = new Set<string>();
  for (const r of frame.readiness) {
    if (r.cycleLimit === null || r.cycleLimit.allowed || limited.has(r.to)) {
      continue;
    }
    limited.add(r.to);
    actions.push({
      key: `override:${r.to}`,
      group: "override",
      label: `override the cycle limit of ${r.to}`,
      step: { override: { stage: r.to, note: "one more pass" } },
    });
  }
  const stage = findStage(definition, frame.run.stage);
  const products = [
    ...(stage?.artifacts ?? []).map((a) => ["artifact", a.name] as const),
    ...(stage?.evidence ?? []).map((e) => ["evidence", e.name] as const),
  ];
  for (const [kind, name] of products) {
    (catalogue.get(productKey(kind, name)) ?? []).forEach((payload, i) => {
      actions.push({
        key: `record:${kind}:${name}:${i}`,
        group: "record",
        label: `record ${kind} ${name} ${preview(payload)}`,
        step: {
          record: kind === "artifact" ? { artifact: name } : { evidence: name },
          payload: structuredClone(payload),
        },
      });
    });
  }
  for (const s of WAITS) {
    actions.push({
      key: `wait:${s}`,
      group: "wait",
      label: `wait ${formatSeconds(s)}`,
      step: { wait: s },
    });
  }
  return actions;
}

/** The products of the frame's stage with no payload to offer yet. */
export function unrecordable(
  definition: FactoryDefinition,
  frame: Frame,
  catalogue: Catalogue,
): string[] {
  if (frame.run.status !== "active") return [];
  const stage = findStage(definition, frame.run.stage);
  return [
    ...(stage?.artifacts ?? []).map((a) => productKey("artifact", a.name)),
    ...(stage?.evidence ?? []).map((e) => productKey("evidence", e.name)),
  ].filter((key) => !catalogue.has(key)).map((key) => key.replace(":", " "));
}

// --- Copy as scenario ------------------------------------------------------------

/**
 * The walk as one entry for the factory's scenarios list: the base's steps as
 * they were, then the person's, each refused one expecting its refusal, and
 * the stage it ended at. `frames` is the walk's own run.
 */
export function toScenarioEntry(walk: Walk, frames: Frame[]): Scenario {
  const offset = walk.baseSteps.length;
  const steps: ScenarioStep[] = [
    ...structuredClone(walk.baseSteps),
    ...walk.steps.map((step, j) => {
      const frame = frames[offset + j + 1];
      return frame?.refused === true
        ? { ...structuredClone(step), expect: { refused: frame.message } }
        : structuredClone(step);
    }),
  ];
  const last = frames[frames.length - 1];
  if (last !== undefined) steps.push({ expect: { stage: last.run.stage } });
  return {
    scenario: walkName(walk),
    description: `Branched from ${walk.base} at step ${walk.branchAt}.`,
    ...(walk.externalRefs !== undefined
      ? { externalRefs: walk.externalRefs }
      : {}),
    steps,
  };
}

/**
 * An entry as YAML to paste under globalArguments.scenarios: one list item,
 * indented as the factory's model definition file holds it.
 */
export function entryYaml(entry: Scenario): string {
  return stringifyYaml([entry], { lineWidth: -1 }).replace(/\n$/, "")
    .split("\n").map((line) => line === "" ? "" : `    ${line}`).join("\n") +
    "\n";
}

// --- the graph overlay and the dock -------------------------------------------------

export interface Overlay {
  /** The stage the work item is at. */
  current: string;
  /** Entries into each stage so far, in this era. */
  entries: Record<string, number>;
  /** Times each exit was taken, by `<from stage>:<transition>`. */
  taken: Map<string, number>;
  /** The move this frame made, for the token. */
  moved: { from: string; transition: string; to: string } | null;
  /** The move this frame tried and the engine refused. */
  refused: { from: string; transition: string } | null;
  /** The current stage's exits, by name. */
  exits: Map<string, { state: ExitState; failures: string[] }>;
}

export const exitKey = (from: string, transition: string) =>
  `${from}:${transition}`;

export function overlay(frames: Frame[], index: number): Overlay | null {
  const frame = frames[index];
  if (frame === undefined) return null;
  const taken = new Map<string, number>();
  for (const f of frames.slice(1, index + 1)) {
    if (f.moved?.to === undefined) continue;
    const key = exitKey(f.moved.from, f.moved.transition);
    taken.set(key, (taken.get(key) ?? 0) + 1);
  }
  const m = frame.moved;
  return {
    current: frame.run.stage,
    entries: { ...frame.run.entries },
    taken,
    moved: m?.to !== undefined
      ? { from: m.from, transition: m.transition, to: m.to }
      : null,
    refused: m !== undefined && frame.refused
      ? { from: m.from, transition: m.transition }
      : null,
    exits: new Map(
      frame.readiness.map((r) => [r.name, {
        state: exitState(r),
        failures: r.failures,
      }]),
    ),
  };
}

export interface Tick {
  index: number;
  kind: FrameKind;
  label: string;
  refused: boolean;
  asExpected: boolean;
  /** One of the person's own steps, past the branch. */
  walked: boolean;
}

export interface Segment {
  stage: string;
  from: number;
  to: number;
}

/** A tick per frame, and the runs of frames spent in one stage. */
export function timeline(
  frames: Frame[],
  walkedFrom = Infinity,
): { ticks: Tick[]; ribbon: Segment[] } {
  const ribbon: Segment[] = [];
  const ticks = frames.map((f, i) => {
    const last = ribbon[ribbon.length - 1];
    if (last !== undefined && last.stage === f.run.stage) last.to = i;
    else ribbon.push({ stage: f.run.stage, from: i, to: i });
    return {
      index: i,
      kind: f.kind,
      label: f.label,
      refused: f.refused,
      asExpected: f.asExpected,
      walked: i > walkedFrom,
    };
  });
  return { ticks, ribbon };
}
