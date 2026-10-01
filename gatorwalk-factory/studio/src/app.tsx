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
// The studio page: a factory picker, Design mode (the graph, the inspector,
// the findings and the source of the factory definition, re-checked in the
// browser whenever the file changes) and Simulate mode (the factory's saved
// scenarios played on the engine, re-run whenever the file changes, and
// walks a person takes from any frame). It is read-only: the agent edits the
// files and the page reloads them. Text
// from a file is only ever rendered as text, never as markup.

import "./jitless.ts";
import { render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Findings } from "./findings.tsx";
import { fitZoom, Graph } from "./graph.tsx";
import { Inspector } from "./inspector.tsx";
import { targetKey } from "./selection.ts";
import { Dock, SimPanel } from "./simulate_view.tsx";
import { Source } from "./source.tsx";
import { reveal, Tabs } from "./ui.tsx";
import {
  changed,
  factories,
  factory,
  flashText,
  graph,
  listen,
  live,
  loaded,
  loadFactories,
  markStagesSeen,
  type Mode,
  mode,
  type PanelTab,
  panelTab,
  selectFactory,
  selection,
  setPlaying,
  sourceError,
  stale,
  zoom,
} from "./state.ts";

function Bar() {
  const list = factories.value;
  const entry = list.find((f) => f.name === factory.value);
  return (
    <header class="bar">
      <div class="brand" aria-label="Gatorwalk Studio">
        <span class="a">GATORWALK</span>
        <span class="b">STUDIO</span>
        <small>READ-ONLY</small>
      </div>
      <div class="file">
        <label for="factory-pick" class="sr-only">Factory</label>
        <select
          id="factory-pick"
          disabled={list.length === 0}
          value={factory.value ?? ""}
          onChange={(e) => void selectFactory(e.currentTarget.value)}
        >
          {list.map((f) => <option key={f.name} value={f.name}>{f.name}
          </option>)}
        </select>
        <span class="path">{entry?.path ?? ""}</span>
      </div>
      <div
        class={`health ${live.value ? "good" : "bad"}`}
        role="status"
        aria-live="polite"
      >
        <span class="dot" />
        <b>{live.value ? "LIVE" : "DISCONNECTED"}</b>
        <span>
          {live.value
            ? "reloads when a file changes"
            : "is swamp model method run studio serve still running?"}
        </span>
      </div>
      <div class="spacer" />
      <Tabs<Mode>
        label="Mode"
        class="modes"
        tabs={[["design", "Design"], ["simulate", "Simulate"]]}
        value={mode.value}
        onChange={(m) => {
          // Playback runs only where it can be seen.
          if (m !== "simulate") setPlaying(false);
          mode.value = m;
        }}
        controls="mode-panel"
      />
      <span class="flash" role="status" aria-live="polite">
        {flashText.value ?? ""}
      </span>
    </header>
  );
}

function Toolbar({ box }: { box: { current: HTMLElement | null } }) {
  const n = changed.value.size;
  const step = (k: number) => {
    zoom.value = Math.max(
      0.3,
      Math.min(2, Math.round((zoom.value + k) * 20) / 20),
    );
  };
  return (
    <div class="tools">
      <div class="grp" role="group" aria-label="Zoom">
        <button type="button" aria-label="Zoom out" onClick={() => step(-0.1)}>
          −
        </button>
        <span class="zoom-level">{Math.round(zoom.value * 100)}%</span>
        <button type="button" aria-label="Zoom in" onClick={() => step(0.1)}>
          +
        </button>
        <button
          type="button"
          class="wide"
          onClick={() =>
            fitZoom(box.current?.querySelector(".canvas") ?? null, graph.value)}
        >
          fit
        </button>
      </div>
      <span class="sep" />
      <span class={`changed-count${n > 0 ? " some" : ""}`}>
        {n === 0
          ? "no changes since you last looked"
          : `${n} changed since you last looked`}
      </span>
      {n > 0 && (
        <button
          type="button"
          class="wide"
          onClick={() => markStagesSeen("all")}
        >
          Mark all seen
        </button>
      )}
      {stale.value && (
        <span class="stale-note" role="status">
          STALE: showing the last version that passed; the file as it is has a
          problem
        </span>
      )}
    </div>
  );
}

function Legend() {
  return (
    <div class="legend">
      <span class="m-int">
        <i class="sw" />◈ interactive
      </span>
      <span class="m-dis">
        <i class="sw" />⇉ dispatch
      </span>
      <span class="m-wf">
        <i class="sw" />⚙ workflow
      </span>
      <span class="m-me">
        <i class="sw" />ƒ method
      </span>
      <span>
        <i class="ln fwd" />forward
      </span>
      <span>
        <i class="ln loop" />loop back
      </span>
      <span>
        <i class="ln glob" />global exit
      </span>
      <span class="gold">◆ person approves</span>
      <span>✋ manual</span>
    </div>
  );
}

function PanelBody() {
  switch (panelTab.value) {
    case "inspect":
      return <Inspector />;
    case "findings":
      return <Findings />;
    case "source":
      return <Source />;
  }
}

function DesignMode() {
  const wrap = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const l = loaded.value;
  const count = l === null ? 0 : l.ok ? l.findings.length : l.problems.length;
  const sel = targetKey(selection.value);
  // Bring what is selected into view in the inspector too.
  useEffect(() => {
    reveal(
      body.current,
      body.current?.querySelector(
        ".exit-card.sel, .gates .sel, .findings .sel",
      ),
    );
  }, [sel, panelTab.value]);
  return (
    <div
      class="main"
      id="mode-panel"
      role="tabpanel"
      aria-labelledby="tab-design"
    >
      <section class="canvas-wrap" aria-label="Graph" ref={wrap}>
        <Toolbar box={wrap} />
        {sourceError.value !== null && (
          <div class="problem">{sourceError.value}</div>
        )}
        <Graph />
        <Legend />
        <p class="keys">
          <b>Graph keys:</b>{" "}
          arrows move between stages · Enter steps into a stage's exits · on an
          exit, Enter follows it to the next stage and → steps into its gates ·
          Esc steps back out · <kbd>c</kbd>{" "}
          copies a reference to paste to the agent
        </p>
      </section>
      <aside class="panel" aria-label="Details">
        <Tabs<PanelTab>
          label="Details"
          tabs={[
            ["inspect", "Inspect"],
            ["findings", `Findings ${count}`],
            ["source", "Source"],
          ]}
          value={panelTab.value}
          onChange={(t) => (panelTab.value = t)}
          controls="panel-body"
        />
        <div
          class="panel-body"
          id="panel-body"
          role="tabpanel"
          aria-labelledby={`tab-${panelTab.value}`}
          ref={body}
        >
          <PanelBody />
        </div>
      </aside>
    </div>
  );
}

function SimulateMode() {
  const wrap = useRef<HTMLElement>(null);
  return (
    <div
      class="main"
      id="mode-panel"
      role="tabpanel"
      aria-labelledby="tab-simulate"
    >
      <section class="canvas-wrap" aria-label="Graph" ref={wrap}>
        <Toolbar box={wrap} />
        {sourceError.value !== null && (
          <div class="problem">{sourceError.value}</div>
        )}
        <Graph />
        <Dock />
      </section>
      <SimPanel />
    </div>
  );
}

function App() {
  return (
    <div class="app">
      <Bar />
      {mode.value === "design" ? <DesignMode /> : <SimulateMode />}
    </div>
  );
}

async function main() {
  render(<App />, document.getElementById("root")!);
  // Listen first, so a file saved while the first load is in flight is
  // reloaded rather than missed.
  listen();
  try {
    const pick = await loadFactories();
    if (pick !== null) await selectFactory(pick);
  } catch (e) {
    sourceError.value = e instanceof Error ? e.message : String(e);
  }
}

void main();
