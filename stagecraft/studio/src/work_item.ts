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

// One work item in the studio (the work-item view, /w/<key>): the run its
// route returns, drawn on the definition it pinned. Everything here is
// derived from the route's answer: the overlay on the graph, what the item
// waits on in status's words, its journal as a timeline, and the run as a
// scenario to copy. The page never evaluates a gate: the readiness comes
// from the route, built by the code status prints from. Pure and DOM-free.

import "./jitless.ts";
import {
  DefinitionSchema,
  type FactoryDefinition,
  findStage,
} from "../../extensions/models/_lib/engine/definition_schema.ts";
import { analyzeDefinition } from "../../extensions/models/_lib/engine/graph.ts";
import {
  type DesignView,
  designView,
} from "../../extensions/models/_lib/engine/design_view.ts";
import type { JournalEvent } from "../../extensions/models/_lib/engine/journal.ts";
import { computeMetrics } from "../../extensions/models/_lib/engine/metrics.ts";
import {
  currentCycle,
  type RunRecord,
} from "../../extensions/models/_lib/engine/run_record.ts";
import type {
  Frame,
  Scenario,
  ScenarioStep,
} from "../../extensions/models/_lib/engine/scenario.ts";
import type {
  PayloadVersion,
  TicketActivityView,
  TicketResponse,
  TicketView,
  WorkItemResponse,
} from "../../extensions/models/_lib/engine/studio_item_types.ts";
import {
  exitKey,
  exitState,
  journalText,
  type Overlay,
  play,
} from "./simulate.ts";

export type { TicketResponse, TicketView, WorkItemResponse };

/** A work item as the page holds it: the route's answer, made ready to draw. */
export interface Item {
  data: WorkItemResponse;
  definition: FactoryDefinition;
  view: DesignView;
  /** The run as one Simulate frame, so the Run, Journal and Metrics tabs
   * show it as they show a scenario's. */
  frame: Frame;
}

const message = (e: unknown) => e instanceof Error ? e.message : String(e);

/**
 * Make the route's answer ready to draw: the pinned definition checked by
 * the engine's schema in the page and viewed as Design mode views a file.
 */
export function loadItem(data: WorkItemResponse): Item {
  const parsed = DefinitionSchema.safeParse(data.pinned.definition);
  if (!parsed.success) {
    throw new Error(
      `the pinned definition does not pass the schema: ${
        parsed.error.issues[0]?.message ?? "unknown problem"
      }`,
    );
  }
  const definition = parsed.data;
  const view = designView(
    data.pinned.factory,
    definition,
    analyzeDefinition(definition),
    data.pinned.digest,
  );
  const run = data.run;
  const frame: Frame = {
    index: 0,
    kind: "start",
    label: `${titleOf(run)} now`,
    asExpected: true,
    refused: false,
    message: "",
    run,
    readiness: data.readiness,
    metrics: computeMetrics(run, definition),
    at: data.at,
  };
  return { data, definition, view, frame };
}

/**
 * The ticket refs worth showing: every one the run records except those
 * that are its key (the built-in tracker's ticket id and display id are).
 */
export function ticketRefs(run: RunRecord): [string, string][] {
  return Object.entries(run.externalRefs).filter(([, v]) => v !== run.key);
}

/** Whether the run names a ticket on the tracker it was started against. */
export function hasTicket(run: RunRecord): boolean {
  return run.externalRefs[run.tracker.kind] !== undefined;
}

/**
 * What a ticket's comment or lifecycle entry is, in words, and the class
 * that styles it: a person's comment, one stagecraft posted, or an entry.
 * The words say it; the style only repeats them.
 */
export function activityLabel(
  a: TicketActivityView,
): { text: string; kind: "person" | "stagecraft" | "entry" } {
  if (a.kind === "entry") {
    const by = a.byStagecraft
      ? " · posted by stagecraft"
      : a.author !== undefined
      ? ` · by ${a.author}`
      : "";
    return {
      text: `lifecycle entry${a.step !== undefined ? ` ${a.step}` : ""}${by}`,
      kind: "entry",
    };
  }
  if (a.byStagecraft) {
    return { text: "comment posted by stagecraft", kind: "stagecraft" };
  }
  return {
    text: a.author !== undefined ? `comment by ${a.author}` : "comment",
    kind: "person",
  };
}

/** The title to show: the run's own, else its key. */
export function titleOf(run: RunRecord): string {
  return run.title ?? run.key;
}

/**
 * Whether the item is drawn on an older definition than the factory's file
 * holds now: the digest it pinned against the file's (null while unknown).
 */
export function pinnedDiffers(
  item: Item,
  current: string | null,
): boolean {
  return current !== null && current !== item.data.pinned.digest;
}

/** This era's events: what the visit counts and the path are made of. */
function thisEra(run: RunRecord): JournalEvent[] {
  return run.journal.filter((e) => e.era === run.era);
}

/**
 * What the graph draws over the pinned definition: the current stage, the
 * visit counts and the exits taken in this era (so counts and path agree
 * after a reset), and the current exits' states from the route's readiness.
 */
export function itemOverlay(item: Item): Overlay {
  const run = item.data.run;
  const taken = new Map<string, number>();
  let moved: Overlay["moved"] = null;
  for (const e of thisEra(run)) {
    if (e.type !== "advanced") continue;
    const key = exitKey(e.stage, e.transition);
    taken.set(key, (taken.get(key) ?? 0) + 1);
    moved = { from: e.stage, transition: e.transition, to: e.to };
  }
  return {
    current: run.stage,
    entries: { ...run.entries },
    taken,
    moved,
    refused: null,
    exits: new Map(
      item.data.readiness.map((r) => [r.name, {
        state: exitState(r),
        failures: r.failures,
      }]),
    ),
  };
}

/** What the work item waits on, in status's words. */
export interface Waiting {
  terminal: boolean;
  stage: string;
  cycle: number;
  /** Exits only a person can open now, with the gates they decide. */
  person: { exit: string; to: string; gates: string[]; manual: boolean }[];
  /** Evidence of this stage a person records. */
  personRecords: string[];
  /** The stage's work, when it dispatches; null when it does not. */
  dispatch: { mode: string; ready: boolean; problems: string[] } | null;
  /** Parked at the dispatch cap until a person grants an override. */
  parkedAtDispatchCap: boolean;
  /** Exits that cannot be taken yet, with the engine's reasons. */
  blocked: { exit: string; to: string; failures: string[] }[];
  /** Exits ready to take. */
  ready: { exit: string; to: string; manual: boolean }[];
  /** Since when: the latest awaiting event of this stage entry, else the
   * stage entry itself. */
  since: string;
}

export function waiting(item: Item): Waiting {
  const { run, status } = item.data;
  const cycle = currentCycle(run);
  const person: Waiting["person"] = [];
  const blocked: Waiting["blocked"] = [];
  const ready: Waiting["ready"] = [];
  status.exits.forEach((e) => {
    const r = item.data.readiness.find((x) => x.name === e.name);
    const state = r !== undefined
      ? exitState(r)
      : e.ready
      ? "ready"
      : "blocked";
    if (state === "person") {
      person.push({
        exit: e.name,
        to: e.to,
        gates: e.humanGates,
        manual: e.manual,
      });
    } else if (state === "ready") {
      ready.push({ exit: e.name, to: e.to, manual: e.manual });
    } else blocked.push({ exit: e.name, to: e.to, failures: e.failures });
  });
  // The stage entry: the latest event that put the run in this stage and
  // cycle, then any awaiting event of it since.
  const era = thisEra(run);
  let since = era[0]?.at ?? item.data.at;
  for (const e of era) {
    if (
      (e.type === "advanced" && e.to === run.stage && e.toCycle === cycle) ||
      e.type === "started" || e.type === "reset"
    ) since = e.at;
    if (e.type === "awaiting" && e.stage === run.stage && e.cycle === cycle) {
      // As the Board's waitingOf: an exit counts once its hold has begun (a
      // cooldown may lift after the event), and the earliest one is since.
      const held = e.exits.map((x) => x.readyAt ?? e.at)
        .filter((t) => t <= item.data.at).sort();
      if (held.length > 0) since = held[0];
      else if (e.dispatchOverride !== undefined) since = e.at;
    }
  }
  return {
    terminal: run.status === "terminal",
    stage: run.stage,
    cycle,
    person,
    personRecords: status.personRecords,
    dispatch: status.dispatch === null ? null : {
      mode: status.dispatch.mode,
      ready: status.dispatch.ready,
      problems: status.dispatch.ready ? [] : status.dispatch.problems,
    },
    parkedAtDispatchCap: status.awaitingDispatchOverride,
    blocked,
    ready,
    since,
  };
}

/** One entry of the timeline: a journal event, with the stage it belongs to. */
export interface TimelineEntry {
  index: number;
  at: string;
  type: JournalEvent["type"];
  text: string;
  stage: string;
  /** The person or agent who caused it, when known. */
  actor: string | null;
  /** In an era before the current one. */
  earlier: boolean;
}

/**
 * The journal as a timeline, newest last. Derived awaiting events whose set
 * is empty say only that a wait ended; they stay, as the Journal tab shows
 * them.
 */
export function timelineOf(run: RunRecord): TimelineEntry[] {
  return run.journal.map((e, index) => ({
    index,
    at: e.at,
    type: e.type,
    text: journalText(e),
    stage: e.type === "advanced" ? e.to : e.stage,
    actor: e.actor.principal,
    earlier: e.era !== run.era,
  }));
}

/** Whether a tracker's URL is a web page to link to: http(s) only, so a
 * record never becomes a link of another kind, whatever the CSP allows. */
export function webLink(url: string | undefined): url is string {
  if (url === undefined) return false;
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

// --- Copy this run as a scenario -------------------------------------------------

/** The run as a scenario entry, and what could not be carried into it. */
export interface RunScenario {
  entry: Scenario;
  notes: string[];
}

/** Gaps on the real clock shorter than this are not worth a wait step: the
 * scenario's own clock already moves a few seconds a step. */
const MIN_WAIT_SECONDS = 60;

/**
 * This era of the journal as steps of a scenario for the factory's scenarios
 * list, with `payloads` as GET /api/work-items/<key>?payloads=1 gives them.
 * A product is recorded with the payload stored at the version the journal
 * names; a rejection is carried only while the run still holds its
 * payload. Time between events becomes waits, so cooldowns hold. Events with
 * no scenario verb are left out, each kind with a note: the note is part of
 * the copy, never hidden.
 */
export function runAsScenario(
  item: Item,
  payloads: PayloadVersion[],
): RunScenario {
  const { run } = item.data;
  const definition = item.definition;
  const notes: string[] = [];
  const steps: ScenarioStep[] = [];
  const era = thisEra(run);
  if (era.length < run.journal.length) {
    notes.push(
      "only this era is copied: the run was reset, and a scenario starts " +
        "from the initial stage",
    );
  }
  let dispatches = 0;
  let dispatchOverrides = 0;
  let retargets = 0;
  let last: number | null = null;
  const transitionOf = (stage: string, name: string) =>
    [
      ...(findStage(definition, stage)?.transitions ?? []),
      ...(definition.globalTransitions ?? []),
    ].find((t) => t.name === name);
  for (const e of era) {
    const at = Date.parse(e.at);
    const step = (s: ScenarioStep) => {
      if (last !== null) {
        const gap = Math.floor((at - last) / 1000);
        if (gap >= MIN_WAIT_SECONDS) steps.push({ wait: gap });
      }
      last = at;
      steps.push(s);
    };
    switch (e.type) {
      case "recorded": {
        const found = payloads.find((p) =>
          p.kind === e.kind && p.name === e.name && p.version === e.version
        );
        if (found?.payload == null) {
          notes.push(
            `${e.kind} ${e.name} v${e.version} is left out: its stored ` +
              "payload is not the one the journal recorded",
          );
          break;
        }
        step({ record: { [e.kind]: e.name }, payload: found.payload });
        break;
      }
      case "rejected": {
        const held = run.validations[
          e.kind === "artifact" ? "artifacts" : "evidence"
        ][e.name];
        const rejected = held?.rejected;
        if (
          held === undefined || held.at !== e.at || rejected === null ||
          typeof rejected !== "object" || Array.isArray(rejected)
        ) {
          notes.push(
            `the rejected ${e.kind} ${e.name} at ${e.at} is left out: the ` +
              "run keeps only the latest rejected payload",
          );
          break;
        }
        step({
          record: { [e.kind]: e.name },
          payload: rejected as Record<string, unknown>,
          expect: { refused: "" },
        });
        break;
      }
      case "approval":
        step(
          e.decision === "approve"
            ? { approve: e.gateId }
            : { decline: e.gateId },
        );
        break;
      case "advanced": {
        const manual = transitionOf(e.stage, e.transition)?.manual === true;
        step({ move: e.transition, ...(manual ? { manual: true } : {}) });
        break;
      }
      case "override":
        if (e.kind === "cycle") step({ override: { stage: e.for } });
        else dispatchOverrides++;
        break;
      case "dispatched":
        dispatches++;
        break;
      case "retargeted":
        retargets++;
        break;
      default:
        // started, reset, usage and awaiting: the scenario's own start, and
        // records derived from other events.
        break;
    }
  }
  if (dispatches > 0) {
    notes.push(
      `${dispatches} dispatch(es) are left out: a scenario does not ` +
        "dispatch work",
    );
  }
  if (dispatchOverrides > 0) {
    notes.push(
      `${dispatchOverrides} dispatch override(s) are left out: a scenario ` +
        "grants only cycle overrides, so where the run hit its dispatch " +
        "cap the replay may go differently",
    );
  }
  if (retargets > 0) {
    notes.push(
      `${retargets} retarget(s) are left out: a scenario keeps one set of ` +
        "externalRefs",
    );
  }
  steps.push({ expect: { stage: run.stage } });
  const refs = Object.keys(run.externalRefs).length > 0
    ? { externalRefs: { ...run.externalRefs } }
    : {};
  return {
    entry: {
      scenario: `${run.key}-run`,
      description: `Copied from work item ${
        run.title === undefined ? run.key : `'${run.title}' (${run.key})`
      } at stage ${run.stage}.`,
      ...refs,
      steps,
    },
    notes,
  };
}

/** Whether the copy, replayed on the pinned definition, ends where the run
 * is: the scenario's own check, and the first step that went otherwise. */
export async function replay(
  item: Item,
  entry: Scenario,
): Promise<{ passed: boolean; problem: string | null }> {
  try {
    const played = await play(item.definition, entry);
    const failure = played.failures[0];
    return {
      passed: played.passed,
      problem: failure === undefined
        ? null
        : `step ${failure.step} (${failure.label}): ${failure.message}`,
    };
  } catch (e) {
    return { passed: false, problem: message(e) };
  }
}
