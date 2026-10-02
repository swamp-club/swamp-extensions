/// <reference lib="dom" />
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
// The page's state, as signals, and the actions that change it. Components
// read signals and call actions; nothing else writes them.

import { batch, computed, signal } from "@preact/signals";
import {
  changedSince,
  fingerprints,
  markSeen,
  parseSeen,
  type Seen,
} from "./changes.ts";
import { ANY_ID, layout } from "./layout.ts";
import { loadDefinition, type Loaded } from "./model.ts";
import { navModel } from "./nav.ts";
import {
  type FactoryView,
  parseRoute,
  type Route,
  routeHref,
  sameRoute,
} from "./route.ts";
import { referenceLine } from "./reference.ts";
import { follow, type Target, targetKey } from "./selection.ts";
import {
  branch,
  entryYaml,
  overlay,
  payloadCatalogue,
  play,
  type Played,
  runAll,
  type ScenarioRun,
  toScenarioEntry,
  type Walk,
  walkScenario,
} from "./simulate.ts";
import type { ScenarioStep } from "../../extensions/models/_lib/engine/scenario.ts";
import type {
  BoardCard,
  WorkItemProblem,
} from "../../extensions/models/_lib/engine/studio_cards.ts";
import { type BoardFilter, NO_FILTER } from "./board.ts";

export interface FactoryEntry {
  name: string;
  path: string | null;
  error?: string;
}

export interface FileText {
  path: string;
  text: string;
  digest: string;
}

export type StudioEvent =
  | { kind: "factories" }
  | { kind: "definition"; factory: string }
  | { kind: "work-items"; factory: string };

type OkLoaded = Extract<Loaded, { ok: true }>;

/** The view shown: a factory view, or one work item. */
export type Mode = Route["view"];
export type PanelTab = "inspect" | "findings" | "source";
export type SimTab = "run" | "journal" | "metrics" | "scenarios";

const PICK_KEY = "stagecraft-studio.factory";
const SEEN_KEY = "stagecraft-studio.seen.";

// --- signals -------------------------------------------------------------------

export const factories = signal<FactoryEntry[]>([]);
export const factory = signal<string | null>(null);
/** Why the factory list or the definition could not be shown. */
export const sourceError = signal<string | null>(null);
export const live = signal(false);
export const flashText = signal<string | null>(null);
export const mode = signal<Mode>("design");
/** The work item a /w/<key> address names. */
export const workItemKey = signal<string | null>(null);

// The Board.
/** The factory's work items as last read; null before the first read. */
export const board = signal<
  { factory: string; items: BoardCard[]; problems: WorkItemProblem[] } | null
>(null);
export const boardError = signal<string | null>(null);
export const boardFilter = signal<BoardFilter>(NO_FILTER);
export const showFinished = signal(false);
/** How many cards each column shows, where Show more was pressed. */
export const shown = signal<Record<string, number>>({});
/** The time cards measure against; ticks so durations stay current. */
export const clock = signal(Date.now());
export const panelTab = signal<PanelTab>("inspect");
export const sourceScope = signal<"stage" | "file">("stage");

/** The file as last read, checked or not. */
export const loaded = signal<Loaded | null>(null);
/** The last version that passed the schema; the graph draws this one. */
export const good = signal<OkLoaded | null>(null);
export const selection = signal<Target | null>(null);
/** A finding's trace, walked on the graph, and how far the walk has got. */
export const trace = signal<{ stages: string[]; step: number } | null>(null);
export const seen = signal<Seen | null>(null);
export const zoom = signal(1);

// Simulate mode.
/** Every saved scenario of the factory, as last run; null before the first. */
export const runs = signal<ScenarioRun[] | null>(null);
/** The scenario played, or the one the walk branched from. */
export const scenario = signal<string | null>(null);
export const frameIndex = signal(0);
export const playing = signal(false);
export const speed = signal(1);
export const simTab = signal<SimTab>("run");
/** The person's own walk, when they have branched from a frame. */
export const walk = signal<Walk | null>(null);
/** The walk as last played, on the definition as it is now. */
export const walkPlayed = signal<Played | null>(null);
/** The walk as a scenario entry, re-run on its own to say if it passes. */
export const copyEntry = signal<
  { text: string; passed: boolean; failures: string[] } | null
>(null);

// --- derived -------------------------------------------------------------------

/**
 * The saved scenarios in the factory's model definition file, which also
 * holds its definition: read with it, from the last load.
 */
export const scenarios = computed(() => loaded.value?.scenarios ?? null);

/** The picked scenario's text, as the file holds it. */
export const scenarioText = computed(() =>
  scenarios.value?.find((s) => s.name === scenario.value)?.text ?? null
);

/** The picked scenario's run. */
export const currentRun = computed(() =>
  runs.value?.find((r) => r.name === scenario.value) ?? null
);

/** The frames played: the walk's when there is one, else the scenario's. */
export const frames = computed(() => {
  if (walk.value !== null) return walkPlayed.value?.frames ?? [];
  const r = currentRun.value;
  return r?.ok ? r.played.frames : [];
});

export const frame = computed(() => frames.value[frameIndex.value] ?? null);

export const catalogue = computed(() => payloadCatalogue(runs.value ?? []));

/** What the graph draws over the factory in Simulate mode. */
export const simOverlay = computed(() =>
  mode.value === "simulate" ? overlay(frames.value, frameIndex.value) : null
);

export const graph = computed(() => {
  const g = good.value;
  return g === null ? null : layout(g.definition, g.view);
});

export const nav = computed(() => {
  const g = good.value, l = graph.value;
  return g === null || l === null ? null : navModel(g.definition, l);
});

/**
 * The graph shows the last version that passed, not the file as it is: the
 * file fails the schema, or could not be read or checked at all.
 */
export const stale = computed(() =>
  good.value !== null &&
  (loaded.value === null ? sourceError.value !== null : !loaded.value.ok)
);

export const fingerprintsNow = computed(() =>
  good.value === null ? null : fingerprints(good.value.definition)
);

export const changed = computed(() => {
  const now = fingerprintsNow.value;
  return now === null ? new Set<string>() : changedSince(seen.value, now);
});

// --- storage -------------------------------------------------------------------
// Private windows and blocked storage throw; the page works without it.

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Nothing to do: the marks just last as long as the page.
  }
}

export const rememberedFactory = () => read(PICK_KEY);

// --- the server ------------------------------------------------------------------

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { accept: "application/json" } });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error ?? `${res.status} ${res.statusText}`);
  }
  if (body === null) throw new Error(`${path} did not answer with JSON`);
  return body as T;
}

export const api = (...parts: string[]) =>
  `/api/factories/${parts.map(encodeURIComponent).join("/")}`;

const message = (e: unknown) => e instanceof Error ? e.message : String(e);

// --- actions ---------------------------------------------------------------------

let flashTimer: ReturnType<typeof setTimeout> | undefined;
export function flash(text: string) {
  flashText.value = text;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (flashText.value = null), 4000);
}

function saveSeen(value: Seen) {
  seen.value = value;
  const name = factory.value;
  if (name !== null) write(SEEN_KEY + name, JSON.stringify(value));
}

/** Mark stages as seen: the given ones, or all of them. */
export function markStagesSeen(ids: string[] | "all") {
  const now = fingerprintsNow.value;
  if (now === null) return;
  saveSeen(markSeen(seen.value, now, ids));
}

/** The tile a target sits on, for its changed mark. */
function tileOf(target: Target | null): string | null {
  if (target === null || target.kind === "finding") return null;
  if (target.kind === "any" || target.stage === null) return ANY_ID;
  return target.stage;
}

export function select(target: Target | null) {
  batch(() => {
    selection.value = target;
    // A stage, exit or gate picked on the graph is explained by the inspector.
    if (
      target !== null && target.kind !== "finding" &&
      panelTab.value === "findings"
    ) {
      panelTab.value = "inspect";
    }
    if (target?.kind !== "finding") trace.value = null;
    const tile = tileOf(target);
    if (tile !== null && changed.value.has(tile)) markStagesSeen([tile]);
  });
}

export async function copyReference(target: Target) {
  const g = good.value;
  if (g === null) return;
  const line = referenceLine(g.file, g.definition, target, g.view.findings);
  try {
    await navigator.clipboard.writeText(line);
    flash(`Copied: ${line}`);
  } catch {
    flash(`Could not copy. The reference is: ${line}`);
  }
}

export async function loadFactories(asked: string | null = null) {
  const found = await getJson<{ factories: FactoryEntry[] }>("/api/factories");
  factories.value = found.factories;
  if (asked !== null && !found.factories.some((f) => f.name === asked)) {
    flash(`no factory named '${asked}'`);
  }
  const wanted = factory.value ?? asked ?? rememberedFactory();
  const pick = found.factories.find((f) => f.name === wanted)?.name ??
    found.factories[0]?.name ?? null;
  if (pick === null) {
    factory.value = null;
    loaded.value = null;
    good.value = null;
    sourceError.value =
      "No factories in this repo yet. Create one with swamp model create " +
      "@swamp/stagecraft/factory <name> --global-arg " +
      "tracker=<tracker>, then write its definition under " +
      "globalArguments.definition in its model definition file.";
  }
  return pick;
}

// A reload while one is in flight asks for one more after it, never more.
let loading: Promise<void> | null = null;
let again = false;

export function loadDefinitionFile(): Promise<void> {
  if (loading !== null) {
    again = true;
    return loading;
  }
  loading = (async () => {
    do {
      again = false;
      if (await readDefinition()) await runSimulation();
    } while (again);
  })().finally(() => (loading = null));
  return loading;
}

/** Read and check the file; true when it passed and Simulate should re-run. */
async function readDefinition(): Promise<boolean> {
  const name = factory.value;
  if (name === null) return false;
  let file: FileText;
  try {
    file = await getJson<FileText>(api(name));
  } catch (e) {
    if (factory.value !== name) return false;
    batch(() => {
      sourceError.value = message(e);
      loaded.value = null;
    });
    return false;
  }
  let result: Loaded;
  try {
    result = await loadDefinition(file.path, file.text);
  } catch (e) {
    // The schema passed but the analysis threw: say so, and keep the last
    // good graph, marked stale.
    if (factory.value !== name) return false;
    batch(() => {
      sourceError.value = `${file.path} could not be checked: ${message(e)}`;
      loaded.value = null;
    });
    return false;
  }
  if (factory.value !== name) return false;
  batch(() => {
    sourceError.value = null;
    loaded.value = result;
    if (!result.ok) return;
    good.value = result;
    if (seen.value === null) {
      // The first look at this factory in this browser: nothing is changed.
      saveSeen(
        markSeen(
          parseSeen(read(SEEN_KEY + name)),
          fingerprints(result.definition),
          [],
        ),
      );
    }
    const before = selection.value;
    const after = follow(result.definition, result.view.findings, before);
    if (targetKey(after) !== targetKey(before)) selection.value = after;
    if (after === null || after.kind !== "finding") trace.value = null;
  });
  return result.ok;
}

// --- the address -----------------------------------------------------------------

/** The route the page shows now. */
export function currentRoute(): Route {
  const view = mode.value;
  return view === "work-item"
    ? { view, key: workItemKey.value ?? "" }
    : { view, factory: factory.value };
}

/** Put the current route in the address bar: a new entry, or in place. */
function writeAddress(how: "push" | "replace") {
  // Outside a browser (the unit tests) there is no address to write.
  if (typeof location === "undefined" || typeof history === "undefined") {
    return;
  }
  const href = routeHref(currentRoute());
  if (href === location.pathname) return;
  if (how === "push") history.pushState(null, "", href);
  else history.replaceState(null, "", href);
}

/** Show a view: another factory view, or a work item. */
export async function go(next: Route) {
  if (sameRoute(next, currentRoute())) return;
  await showRoute(next);
  writeAddress("push");
}

/** Show what a route names, leaving the address alone. */
async function showRoute(next: Route) {
  // Playback runs only where it can be seen.
  if (next.view !== "simulate") setPlaying(false);
  batch(() => {
    mode.value = next.view;
    workItemKey.value = next.view === "work-item" ? next.key : null;
  });
  if (next.view === "work-item" || next.factory === null) return;
  if (next.factory === factory.value) {
    if (next.view === "board") void loadBoard();
    return;
  }
  if (factories.value.some((f) => f.name === next.factory)) {
    await selectFactory(next.factory);
  } else if (factories.value.length > 0) {
    flash(`no factory named '${next.factory}'`);
  }
}

/**
 * While the Board is shown: durations tick every half minute, and the
 * board is read again every two minutes. The second keeps the server's
 * poll alive (it forgets a board not asked for in five minutes), and
 * catches a change whose event was lost.
 */
export function keepBoardCurrent() {
  setInterval(() => (clock.value = Date.now()), 30 * 1000);
  setInterval(() => {
    if (mode.value === "board" && !document.hidden) void loadBoard();
  }, 2 * 60 * 1000);
  // A tab hidden for a while may have outlived the poll: read on return.
  document.addEventListener("visibilitychange", () => {
    if (mode.value === "board" && !document.hidden) void loadBoard();
  });
}

/** The browser's back and forward: show the route the address names. */
export function followAddress() {
  addEventListener("popstate", () => {
    void showRoute(parseRoute(location.pathname) ?? defaultRoute()).then(() =>
      writeAddress("replace")
    );
  });
}

/** The route the page opens at: the address's, or the design view. */
export function startRoute(): Route {
  const found = parseRoute(location.pathname);
  if (found === null) flash(`no view at ${location.pathname}`);
  const start = found ?? defaultRoute();
  batch(() => {
    mode.value = start.view;
    workItemKey.value = start.view === "work-item" ? start.key : null;
  });
  return start;
}

function defaultRoute(): Route {
  return { view: "design", factory: null };
}

/** A factory view, for the mode tabs. */
export function isFactoryView(view: Mode): view is FactoryView {
  return view !== "work-item";
}

export async function selectFactory(
  name: string,
  how: "push" | "replace" = "replace",
) {
  batch(() => {
    factory.value = name;
    loaded.value = null;
    good.value = null;
    selection.value = null;
    trace.value = null;
    seen.value = null;
    zoom.value = 1;
    runs.value = null;
    scenario.value = null;
    frameIndex.value = 0;
    walk.value = null;
    walkPlayed.value = null;
    copyEntry.value = null;
    board.value = null;
    boardError.value = null;
    shown.value = {};
  });
  setPlaying(false);
  write(PICK_KEY, name);
  // A work item's page keeps its own address; a factory view shows the
  // factory in its path.
  if (mode.value !== "work-item") writeAddress(how);
  if (mode.value === "board") void loadBoard();
  await loadDefinitionFile();
}

// --- the Board ----------------------------------------------------------------------

let boardLoading: Promise<void> | null = null;
let boardAgain = false;

/**
 * Read the factory's work items. Asking also keeps the server's poll of
 * them alive, which tells the page when one changes. A read while one is in
 * flight asks for one more after it, never more.
 */
export function loadBoard(): Promise<void> {
  if (boardLoading !== null) {
    boardAgain = true;
    return boardLoading;
  }
  boardLoading = (async () => {
    do {
      boardAgain = false;
      const name = factory.value;
      if (name === null) return;
      try {
        const read = await getJson<{
          factory: string;
          items: BoardCard[];
          problems: WorkItemProblem[];
        }>(`/api/work-items?factory=${encodeURIComponent(name)}`);
        if (factory.value !== name) continue;
        batch(() => {
          board.value = read;
          boardError.value = null;
          clock.value = Date.now();
        });
      } catch (e) {
        if (factory.value === name) boardError.value = message(e);
      }
    } while (boardAgain);
  })().finally(() => (boardLoading = null));
  return boardLoading;
}

/** The factory list again; the selection is kept, or reloaded if it moved. */
export async function reloadFactories() {
  const before = factory.value;
  const path = factories.value.find((f) => f.name === before)?.path;
  let pick: string | null;
  try {
    pick = await loadFactories();
  } catch (e) {
    sourceError.value = message(e);
    return;
  }
  // The studio keeps a factory whose file does not parse, so one that went
  // is gone for real.
  if (before !== null && pick !== before) {
    flash(`factory '${before}' was removed`);
  }
  const now = factories.value.find((f) => f.name === pick);
  if (pick !== null && (pick !== before || now?.path !== path)) {
    await selectFactory(pick);
  }
}

// --- Simulate ----------------------------------------------------------------------

let reloads = 0;

/** The last walk error said, so a reload does not say it again. */
let toldWalkError: { walk: Walk; text: string } | null = null;

/** Play a walk on a definition; null when it cannot run. */
async function playWalk(
  definition: OkLoaded["definition"],
  w: Walk,
): Promise<Played | null> {
  try {
    return await play(definition, walkScenario(w));
  } catch (e) {
    const text = `The walk could not run: ${message(e)}`;
    if (toldWalkError?.walk !== w || toldWalkError.text !== text) {
      toldWalkError = { walk: w, text };
      flash(text);
    }
    return null;
  }
}

/** Run the walk's entry on its own, as validate will once it is saved. */
async function checkCopy(
  definition: OkLoaded["definition"],
  w: Walk,
  p: Played | null,
): Promise<typeof copyEntry.value> {
  if (p === null || w.steps.length === 0) return null;
  const entry = toScenarioEntry(w, p.frames);
  try {
    const result = await play(definition, entry);
    return {
      text: entryYaml(entry),
      passed: result.passed,
      failures: result.failures.map((f) =>
        `step ${f.step}: ${f.label}: ${f.message}`
      ),
    };
  } catch (e) {
    return { text: entryYaml(entry), passed: false, failures: [message(e)] };
  }
}

function clampFrame() {
  const n = frames.value.length;
  frameIndex.value = Math.max(0, Math.min(frameIndex.value, n - 1));
}

/**
 * Play the walk, and check its Copy entry, on the definition as it is now. A
 * result is kept only if neither the walk nor the definition changed while it
 * ran; otherwise it plays again, so a step taken during a reload, or a reload
 * during a step, ends with the newest walk on the newest definition. A walk
 * discarded meanwhile leaves nothing behind.
 */
async function settleWalk() {
  for (;;) {
    const g = good.value, w = walk.value;
    if (g === null || w === null) {
      batch(() => {
        walkPlayed.value = null;
        copyEntry.value = null;
      });
      return;
    }
    const played = await playWalk(g.definition, w);
    if (good.value !== g || walk.value !== w) continue;
    walkPlayed.value = played;
    clampFrame();
    const copy = await checkCopy(g.definition, w, played);
    if (good.value !== g || walk.value !== w) continue;
    copyEntry.value = copy;
    return;
  }
}

/**
 * Run every saved scenario, and replay the walk, on the definition as last
 * loaded. A load that failed the schema never gets here: the last results
 * stay, under the STALE note, and the scenarios of a broken file never run
 * against the last good definition. Only a newer reload supersedes the
 * results; a walk step taken meanwhile does not.
 */
async function runSimulation() {
  const l = loaded.value, g = good.value, name = factory.value;
  if (l === null || !l.ok || g === null) return;
  const token = ++reloads;
  const results = await runAll(g.definition, l.scenarios);
  if (factory.value !== name || token !== reloads) return;
  batch(() => {
    runs.value = results;
    // A walk keeps its base's name even when the base is gone.
    if (
      walk.value === null &&
      !results.some((r) => r.name === scenario.value)
    ) {
      scenario.value = results[0]?.name ?? null;
    }
    clampFrame();
  });
  await settleWalk();
}

let playTimer: ReturnType<typeof setInterval> | undefined;

export function setPlaying(on: boolean) {
  clearInterval(playTimer);
  playing.value = on;
  if (!on) return;
  if (frameIndex.value >= frames.value.length - 1) frameIndex.value = 0;
  playTimer = setInterval(() => {
    if (frameIndex.value >= frames.value.length - 1) setPlaying(false);
    else frameIndex.value++;
  }, 1100 / speed.value);
}

export function setSpeed(value: number) {
  speed.value = value;
  if (playing.value) setPlaying(true);
}

/** Show a frame; a person stepping or jumping pauses playback. */
export function goFrame(i: number) {
  if (playing.value) setPlaying(false);
  frameIndex.value = Math.max(0, Math.min(i, frames.value.length - 1));
}

/** Play another scenario; a walk with steps of its own goes after a yes. */
export function pickScenario(name: string, ask = confirmDiscard) {
  if (name === scenario.value && walk.value === null) return;
  if (walk.value !== null && walk.value.steps.length > 0 && !ask()) return;
  setPlaying(false);
  batch(() => {
    walk.value = null;
    walkPlayed.value = null;
    copyEntry.value = null;
    scenario.value = name;
    frameIndex.value = 0;
  });
}

const confirmDiscard = () =>
  globalThis.confirm(
    "Discard your walk? Copy it as a scenario first to keep it.",
  );

/**
 * Take a step from the frame shown: the first branches from the scenario
 * there; later ones extend the walk, or cut it back to the frame shown and
 * go on from there.
 */
export async function takeStep(step: ScenarioStep) {
  const at = frameIndex.value;
  const w = walk.value;
  let next: Walk;
  if (w === null) {
    const r = currentRun.value;
    if (r === null || !r.ok) return;
    next = branch(r.scenario, at);
  } else if (at >= w.baseSteps.length) {
    next = { ...w, steps: w.steps.slice(0, at - w.baseSteps.length) };
  } else {
    next = {
      ...w,
      branchAt: at,
      baseSteps: w.baseSteps.slice(0, at),
      steps: [],
    };
  }
  next = { ...next, steps: [...next.steps, step] };
  setPlaying(false);
  batch(() => {
    walk.value = next;
    // The entry for the walk before this step is not this walk's.
    copyEntry.value = null;
  });
  await settleWalk();
  // Show where the step landed, unless another step or a discard came first.
  if (walk.value === next) {
    frameIndex.value = Math.max(0, frames.value.length - 1);
  }
}

/** Leave the walk, back to the scenario at the frame it branched from. */
export function discardWalk() {
  const w = walk.value;
  if (w === null) return;
  setPlaying(false);
  batch(() => {
    walk.value = null;
    walkPlayed.value = null;
    copyEntry.value = null;
    if (!runs.value?.some((r) => r.name === scenario.value)) {
      scenario.value = runs.value?.[0]?.name ?? null;
    }
    frameIndex.value = w.branchAt;
    clampFrame();
  });
}

export async function copyWalk() {
  const c = copyEntry.value;
  if (c === null) return;
  try {
    await navigator.clipboard.writeText(c.text);
    flash("Copied the walk as a scenario: paste it to the agent to save");
  } catch {
    flash("Could not copy; select the text and copy it instead");
  }
}

export function listen() {
  const events = new EventSource("/api/events");
  // A change while the stream was down sent nothing, so a reconnect reads
  // the list and the definition again.
  let dropped = false;
  events.addEventListener("open", () => {
    live.value = true;
    if (!dropped) return;
    dropped = false;
    reloadFactories().then(() => loadDefinitionFile()).catch((e) => {
      sourceError.value = message(e);
    });
    if (mode.value === "board") void loadBoard();
  });
  events.addEventListener("error", () => {
    live.value = false;
    dropped = true;
  });
  events.addEventListener("message", (m) => {
    let event: StudioEvent;
    try {
      event = JSON.parse(m.data) as StudioEvent;
    } catch {
      return; // Not an event the page knows; the next one reloads.
    }
    if (event.kind === "factories") {
      flash("factories reloaded");
      void reloadFactories();
      return;
    }
    if (event.factory !== factory.value) return;
    if (event.kind === "work-items") {
      if (mode.value === "board") void loadBoard();
      return;
    }
    flash("definition reloaded");
    void loadDefinitionFile();
  });
}
