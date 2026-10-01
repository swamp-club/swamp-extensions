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
import { referenceLine } from "./reference.ts";
import { follow, type Target, targetKey } from "./selection.ts";

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
  | { kind: "definition"; factory: string };

type OkLoaded = Extract<Loaded, { ok: true }>;

export type Mode = "design" | "scenarios";
export type PanelTab = "inspect" | "findings" | "source";

const PICK_KEY = "gatorwalk-studio.factory";
const SEEN_KEY = "gatorwalk-studio.seen.";

// --- signals -------------------------------------------------------------------

export const factories = signal<FactoryEntry[]>([]);
export const factory = signal<string | null>(null);
/** Why the factory list or the definition could not be shown. */
export const sourceError = signal<string | null>(null);
export const live = signal(false);
export const flashText = signal<string | null>(null);
export const mode = signal<Mode>("design");
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

export const scenario = signal<string | null>(null);

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

export async function loadFactories() {
  const found = await getJson<{ factories: FactoryEntry[] }>("/api/factories");
  factories.value = found.factories;
  const wanted = factory.value ?? rememberedFactory();
  const pick = found.factories.find((f) => f.name === wanted)?.name ??
    found.factories[0]?.name ?? null;
  if (pick === null) {
    factory.value = null;
    loaded.value = null;
    good.value = null;
    sourceError.value =
      "No factories in this repo yet. Create one with swamp model create " +
      "@swamp/gatorwalk-factory/factory <name> --global-arg " +
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
      await readDefinition();
    } while (again);
  })().finally(() => (loading = null));
  return loading;
}

async function readDefinition() {
  const name = factory.value;
  if (name === null) return;
  let file: FileText;
  try {
    file = await getJson<FileText>(api(name));
  } catch (e) {
    if (factory.value !== name) return;
    batch(() => {
      sourceError.value = message(e);
      loaded.value = null;
    });
    return;
  }
  let result: Loaded;
  try {
    result = await loadDefinition(file.path, file.text);
  } catch (e) {
    // The schema passed but the analysis threw: say so, and keep the last
    // good graph, marked stale.
    if (factory.value !== name) return;
    batch(() => {
      sourceError.value = `${file.path} could not be checked: ${message(e)}`;
      loaded.value = null;
    });
    return;
  }
  if (factory.value !== name) return;
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
}

export async function selectFactory(name: string) {
  batch(() => {
    factory.value = name;
    loaded.value = null;
    good.value = null;
    selection.value = null;
    trace.value = null;
    seen.value = null;
    scenario.value = null;
    zoom.value = 1;
  });
  write(PICK_KEY, name);
  await loadDefinitionFile();
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
  const now = factories.value.find((f) => f.name === pick);
  if (pick !== null && (pick !== before || now?.path !== path)) {
    await selectFactory(pick);
  }
}

export function listen() {
  const events = new EventSource("/api/events");
  events.addEventListener("open", () => (live.value = true));
  events.addEventListener("error", () => (live.value = false));
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
    flash("definition reloaded");
    void loadDefinitionFile();
  });
}
