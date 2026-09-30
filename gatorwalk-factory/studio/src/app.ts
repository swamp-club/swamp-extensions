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

// The studio page: a factory picker, the factory definition's text and its
// scenario files, read-only, reloaded when the server says an agent changed
// them. Design and Simulate modes grow from here. Text is only ever set with
// textContent: nothing from a file becomes markup.

interface FactoryEntry {
  name: string;
  path: string | null;
  error?: string;
}

interface FileText {
  path: string;
  text: string;
  digest: string;
}

interface ScenarioList {
  dir: string;
  scenarios: { name: string; path: string }[];
}

type StudioEvent =
  | { kind: "factories" }
  | { kind: "definition"; factory: string }
  | { kind: "scenarios"; factory: string; name?: string };

const PICK_KEY = "gatorwalk-studio.factory";

const state = {
  factories: [] as FactoryEntry[],
  factory: null as string | null,
  scenario: null as string | null,
};

function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (el === null) throw new Error(`the page has no #${id}`);
  return el;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { accept: "application/json" } });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body?.error ?? `${res.status} ${res.statusText}`);
  }
  return body as T;
}

const api = (...parts: string[]) =>
  `/api/factories/${parts.map(encodeURIComponent).join("/")}`;

function remembered(): string | null {
  try {
    return localStorage.getItem(PICK_KEY);
  } catch {
    return null;
  }
}

function remember(name: string) {
  try {
    localStorage.setItem(PICK_KEY, name);
  } catch {
    // Private windows and blocked storage: the picker just starts at the top.
  }
}

function showProblem(id: string, message: string | null) {
  const el = $(id);
  el.hidden = message === null;
  el.textContent = message ?? "";
}

function markFresh(el: HTMLElement) {
  el.classList.remove("fresh");
  void el.offsetWidth;
  el.classList.add("fresh");
}

let flashTimer: ReturnType<typeof setTimeout> | undefined;
function flash(text: string) {
  const el = $("flash");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (el.hidden = true), 2500);
}

function setLive(on: boolean) {
  const el = $("live");
  el.className = on ? "health good" : "health bad";
  el.replaceChildren();
  const dot = document.createElement("span");
  dot.className = "dot";
  const label = document.createElement("b");
  label.textContent = on ? "LIVE" : "DISCONNECTED";
  const note = document.createElement("span");
  note.textContent = on
    ? "reloads when a file changes"
    : "is swamp model method run studio serve still running?";
  el.append(dot, label, note);
}

// --- the factory list ----------------------------------------------------------

async function loadFactories() {
  const { factories } = await getJson<{ factories: FactoryEntry[] }>(
    "/api/factories",
  );
  state.factories = factories;
  const pick = $("factory-pick") as HTMLSelectElement;
  pick.replaceChildren(...factories.map((f) => {
    const option = document.createElement("option");
    option.value = f.name;
    option.textContent = f.name;
    return option;
  }));
  const wanted = state.factory ?? remembered();
  state.factory = factories.find((f) => f.name === wanted)?.name ??
    factories[0]?.name ?? null;
  if (state.factory !== null) pick.value = state.factory;
  pick.disabled = factories.length === 0;
  if (factories.length === 0) {
    $("factory-path").textContent = "";
    $("source-text").textContent = "";
    showProblem(
      "source-error",
      "No factories in this repo yet. Create one with swamp model create " +
        "@swamp/gatorwalk-factory/factory <name> --global-arg " +
        "definition=factories/<name>.yaml, then run its init method.",
    );
  }
}

// --- the definition ----------------------------------------------------------------

async function loadDefinition(fresh = false) {
  const name = state.factory;
  if (name === null) return;
  const entry = state.factories.find((f) => f.name === name);
  $("factory-path").textContent = entry?.path ?? "";
  const text = $("source-text");
  try {
    const file = await getJson<FileText>(api(name));
    if (state.factory !== name) return;
    text.textContent = file.text;
    $("source-digest").textContent = file.digest.slice(0, 19);
    showProblem("source-error", null);
    if (fresh) markFresh(text);
  } catch (e) {
    if (state.factory !== name) return;
    text.textContent = "";
    $("source-digest").textContent = "";
    showProblem("source-error", e instanceof Error ? e.message : String(e));
  }
}

// --- scenarios ------------------------------------------------------------------------

async function loadScenarios(fresh = false) {
  const name = state.factory;
  const list = $("scenarios");
  if (name === null) return list.replaceChildren();
  let found: ScenarioList;
  try {
    found = await getJson<ScenarioList>(api(name, "scenarios"));
  } catch (e) {
    if (state.factory !== name) return;
    list.replaceChildren();
    $("scenarios-empty").hidden = true;
    showProblem("scenario-error", e instanceof Error ? e.message : String(e));
    return;
  }
  if (state.factory !== name) return;
  showProblem("scenario-error", null);
  $("scenarios-dir").textContent = found.dir;
  const empty = $("scenarios-empty");
  empty.hidden = found.scenarios.length > 0;
  empty.textContent =
    `No scenarios yet. The agent saves them in ${found.dir}/.`;
  if (!found.scenarios.some((s) => s.name === state.scenario)) {
    state.scenario = null;
  }
  list.replaceChildren(...found.scenarios.map((s) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = s.name;
    button.title = s.path;
    button.setAttribute("aria-pressed", String(s.name === state.scenario));
    button.addEventListener("click", () => {
      state.scenario = state.scenario === s.name ? null : s.name;
      void loadScenarios();
    });
    item.append(button);
    return item;
  }));
  await loadScenario(fresh);
}

async function loadScenario(fresh = false) {
  const text = $("scenario-text");
  const name = state.factory;
  const scenario = state.scenario;
  if (name === null || scenario === null) {
    text.hidden = true;
    return;
  }
  try {
    const file = await getJson<FileText>(api(name, "scenarios", scenario));
    if (state.factory !== name || state.scenario !== scenario) return;
    text.textContent = file.text;
    text.hidden = false;
    showProblem("scenario-error", null);
    if (fresh) markFresh(text);
  } catch (e) {
    if (state.factory !== name || state.scenario !== scenario) return;
    text.hidden = true;
    showProblem("scenario-error", e instanceof Error ? e.message : String(e));
  }
}

// --- live reload ---------------------------------------------------------------------

function listen() {
  const events = new EventSource("/api/events");
  events.addEventListener("open", () => setLive(true));
  events.addEventListener("error", () => setLive(false));
  events.addEventListener("message", (message) => {
    const event = JSON.parse(message.data) as StudioEvent;
    if (event.kind === "factories") {
      flash("factories reloaded");
      void reloadFactories();
      return;
    }
    if (event.factory !== state.factory) return;
    if (event.kind === "definition") {
      flash("definition reloaded");
      void loadDefinition(true);
      return;
    }
    // The list too, since the scenario may have been added or deleted.
    const selected = event.name !== undefined && event.name === state.scenario;
    if (event.name === undefined || selected) flash("scenarios reloaded");
    void loadScenarios(selected);
  });
}

/** The list again; the selection is kept, or reloaded if it changed. */
async function reloadFactories() {
  const before = state.factory;
  const path = state.factories.find((f) => f.name === before)?.path;
  try {
    await loadFactories();
  } catch (e) {
    showProblem("source-error", e instanceof Error ? e.message : String(e));
    return;
  }
  const now = state.factories.find((f) => f.name === state.factory);
  if (
    state.factory !== null && (state.factory !== before || now?.path !== path)
  ) {
    await selectFactory(state.factory);
  }
}

async function selectFactory(name: string) {
  state.factory = name;
  state.scenario = null;
  remember(name);
  await Promise.all([loadDefinition(), loadScenarios()]);
}

async function main() {
  setLive(false);
  $("factory-pick").addEventListener("change", (e) => {
    void selectFactory((e.target as HTMLSelectElement).value);
  });
  try {
    await loadFactories();
    if (state.factory !== null) await selectFactory(state.factory);
  } catch (e) {
    showProblem("source-error", e instanceof Error ? e.message : String(e));
  }
  listen();
}

void main();
