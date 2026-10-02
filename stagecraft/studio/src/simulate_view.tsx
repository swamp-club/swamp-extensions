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

// Simulate mode's panel and dock. The panel shows the frame: the step and
// what the engine said, the work item's status as `status` reports it, the
// steps a person can take from here, the journal, the metrics on the
// simulated clock, and the scenarios with Copy as scenario. The dock plays
// the frames: transport, a tick per step, and a ribbon of the stages.
// Positions on the timeline are set as style properties, through the CSSOM,
// which the page's CSP allows; nothing writes a style attribute.

import { useEffect } from "preact/hooks";
import type { JSX } from "preact";
import { currentCycle } from "../../extensions/models/_lib/engine/run_record.ts";
import {
  type Action,
  type ActionGroup,
  actionsAt,
  EXIT_LABELS,
  exitState,
  formatSeconds,
  journalText,
  OVERRIDE_NOTE,
  timeline,
  unrecordable,
} from "./simulate.ts";
import {
  catalogue,
  copyEntry,
  copyWalk,
  currentRun,
  discardWalk,
  drawn,
  frame,
  frameIndex,
  frames,
  goFrame,
  good,
  mode,
  pickScenario,
  playing,
  runs,
  scenario,
  scenarioText,
  setPlaying,
  setSpeed,
  type SimTab,
  simTab,
  speed,
  takeStep,
  walk,
  walkError,
  walkPending,
} from "./state.ts";
import { modeMeta, Tabs } from "./ui.tsx";

const SPEEDS = [0.5, 1, 2, 4];

const seconds = (ms: number) =>
  formatSeconds(Math.max(0, Math.round(ms / 1000)));

function Outcome() {
  const f = frame.value!;
  const [cls, text] = f.refused
    ? f.asExpected ? ["exp", "REFUSED · AS EXPECTED"] : ["bad", "REFUSED"]
    : f.asExpected
    ? ["ok", "OK"]
    : ["bad", "NOT AS EXPECTED"];
  return <span class={`oc ${cls}`}>{text}</span>;
}

function StepCard() {
  const f = frame.value!;
  const bad = !f.asExpected;
  return (
    <div
      class={`step-card ${bad ? "bad" : f.refused ? "exp" : "ok"}`}
      aria-live="polite"
    >
      <div class="sc-top">
        <span class="sc-n">STEP {f.index}</span>
        <Outcome />
      </div>
      <p class="sc-label">{f.label}</p>
      <p class="sc-msg">{f.message}</p>
      {f.note !== undefined && <p class="sc-note">{f.note}</p>}
    </div>
  );
}

function StatusCard() {
  const f = frame.value!;
  const g = drawn.value;
  const stage = g?.definition.stages.find((s) => s.id === f.run.stage);
  const meta = modeMeta(stage?.work?.mode);
  const elapsed = Date.parse(f.at) - Date.parse(f.metrics.startedAt);
  return (
    <div class="status-card">
      <div class="st-row">
        <span class="eyebrow">status</span>
        <span class="clock">
          +{seconds(elapsed)} <small>simulated clock</small>
        </span>
      </div>
      <h2 class="insp-title">{f.run.stage}</h2>
      <div class="chips">
        <span class={`mchip ${meta.cls}`}>{meta.glyph} {meta.label}</span>
        <span class="lchip">cycle {currentCycle(f.run)}</span>
        <span class={`lchip${f.run.status === "terminal" ? " good" : ""}`}>
          {f.run.status}
        </span>
      </div>
      {f.readiness.length > 0 && (
        <>
          <h3>Exits</h3>
          <ul class="readiness">
            {f.readiness.map((r) => {
              const state = exitState(r);
              return (
                <li class={`rd r-${state}`} key={r.name}>
                  <span class="rs">{EXIT_LABELS[state]}</span>
                  <b>{r.manual ? `✋ ${r.name}` : r.name}</b>
                  <span class="to">→ {r.to}</span>
                  {r.failures.length > 0 && (
                    <ul>
                      {r.failures.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

const GROUPS: [ActionGroup, string][] = [
  ["move", "Move"],
  ["decide", "Decide"],
  ["override", "Override"],
  ["record", "Record"],
  ["wait", "Wait"],
];

function WalkFromHere() {
  const f = frame.value!;
  const g = good.value;
  const r = currentRun.value;
  if (g === null) return null;
  if (walk.value === null && (r === null || !r.ok)) return null;
  const actions = actionsAt(g.definition, f, catalogue.value);
  const missing = unrecordable(g.definition, f, catalogue.value);
  const by = (group: ActionGroup) => actions.filter((a) => a.group === group);
  const take = (a: Action) => () => void takeStep(a.step);
  return (
    <section class="walk" aria-labelledby="walk-title">
      <h3 id="walk-title">Walk from here</h3>
      {actions.length === 0
        ? <p class="empty">The work item is done: nothing more to take.</p>
        : (
          <p class="desc muted small">
            Take the next step yourself, on the real engine. The walk goes on
            from where it lands{walk.value === null
              ? `, branched from ${scenario.value} at step ${f.index}`
              : ""}.
          </p>
        )}
      {GROUPS.map(([group, title]) => {
        const list = by(group);
        if (list.length === 0) return null;
        return (
          <div class="act-group" key={group} role="group" aria-label={title}>
            <span class="act-title">{title}</span>
            <div class="acts">
              {list.map((a) => (
                <button
                  type="button"
                  key={a.key}
                  class={`act a-${group}`}
                  title={a.hint ?? a.label}
                  onClick={take(a)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      {missing.length > 0 && (
        <p class="desc muted small">
          No saved scenario records {missing.join(", ")}{" "}
          yet, so there is no payload to offer for{" "}
          {missing.length === 1 ? "it" : "them"}.
        </p>
      )}
    </section>
  );
}

function WalkBanner() {
  const w = walk.value;
  if (w === null) return null;
  const gone = !runs.value?.some((r) => r.name === w.base);
  return (
    <div class="walk-banner" role="status">
      <span>
        <b>Your walk</b>, from {w.base} at step {w.branchAt}
        {gone ? " (base scenario removed)" : ""}: {w.steps.length} step
        {w.steps.length === 1 ? "" : "s"} of your own
        {walkPending.value ? " · playing on the engine…" : ""}
      </span>
      <span class="wb-actions">
        <button
          type="button"
          class="copy"
          onClick={() => (simTab.value = "scenarios")}
        >
          Copy as scenario…
        </button>
        <button type="button" class="copy" onClick={discardWalk}>
          Discard walk
        </button>
      </span>
    </div>
  );
}

function RunTab() {
  // A walk keeps its banner, and so its Discard, even when it cannot run.
  if (frame.value === null) {
    if (walk.value === null) return <NoRun />;
    return (
      <div class="run">
        <WalkBanner />
        <NoRun />
      </div>
    );
  }
  // While a step plays, the frame it replaces shows pending and takes no
  // clicks.
  const pending = walkPending.value;
  return (
    <div class="run">
      <WalkBanner />
      <div
        class={pending ? "run-frame walk-pending" : "run-frame"}
        inert={pending}
        aria-busy={pending}
      >
        <StepCard />
        <StatusCard />
        <WalkFromHere />
      </div>
    </div>
  );
}

function NoRun() {
  const r = currentRun.value;
  if (runs.value === null) {
    return <p class="empty">Running the scenarios…</p>;
  }
  if (runs.value.length === 0) {
    return (
      <p class="empty">
        No saved scenarios yet. The agent saves them under
        globalArguments.scenarios in the factory's model definition, and they
        play here as soon as it does.
      </p>
    );
  }
  if (r !== null && !r.ok) {
    return (
      <div class="problem" role="alert">
        {r.name} could not run: {r.error}
      </div>
    );
  }
  if (walk.value !== null) {
    if (walkPending.value) {
      return <p class="empty">Playing the walk on the engine…</p>;
    }
    return (
      <div class="problem" role="alert">
        The walk could not run{walkError.value === null
          ? "."
          : `: ${walkError.value}`}
      </div>
    );
  }
  return <p class="empty">Pick a scenario.</p>;
}

export function JournalTab() {
  const f = frame.value;
  if (f === null) return <NoRun />;
  const start = Date.parse(f.metrics.startedAt);
  return (
    <ol class="journal">
      {f.run.journal.map((e, i) => (
        <li key={i} class={`j-${e.type}`}>
          <time>+{seconds(Date.parse(e.at) - start)}</time>
          <span class="jt">{e.type}</span>
          <span class="jx">
            {journalText(e)} <small>@{e.stage}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function MetricsTab() {
  const f = frame.value;
  if (f === null) return <NoRun />;
  const m = f.metrics;
  const sum = m.summary;
  const rows = Object.entries(sum.stages);
  const max = Math.max(1, ...rows.map(([, s]) => s.timeMs));
  const waits = m.eras[m.eras.length - 1]?.waits ?? [];
  return (
    <div class="insp">
      <p class="eyebrow">
        {mode.value === "work-item"
          ? "computeMetrics on the run · real clock"
          : "computeMetrics on this frame · simulated clock"}
      </p>
      <dl class="stats">
        <div>
          <dt>Elapsed</dt>
          <dd>{seconds(Date.parse(f.at) - Date.parse(m.startedAt))}</dd>
        </div>
        <div>
          <dt>Re-entries</dt>
          <dd class="pink">{sum.rework.reentries}</dd>
        </div>
        <div>
          <dt>Waits on a person</dt>
          <dd class="gold">
            {sum.waits.count}
            <small>· {seconds(sum.waits.timeMs)}</small>
          </dd>
        </div>
        <div>
          <dt>Overrides</dt>
          <dd>{sum.overrides.cycle + sum.overrides.dispatch}</dd>
        </div>
      </dl>
      <h3>Time in stage</h3>
      <div class="bars" role="list">
        {rows.map(([id, s]) => (
          <div class="bar-row" role="listitem" key={id}>
            <span class="bl">{id}</span>
            <span class="bt">
              <span
                class={`bf${s.open ? " open" : ""}`}
                style={{ width: `${(100 * s.timeMs / max).toFixed(1)}%` }}
              />
            </span>
            <span class="bv">
              {seconds(s.timeMs)}
              {s.visits > 1 && <small>×{s.visits}</small>}
            </span>
          </div>
        ))}
      </div>
      {waits.length > 0 && (
        <>
          <h3>Waits</h3>
          <ul class="waits">
            {waits.map((w, i) => (
              <li key={i}>
                <b>{w.stage}.{w.transition ?? "dispatch override"}</b>
                <span>
                  {w.gateIds.join(", ") || (w.manual ? "manual" : "")}
                </span>
                <span class="wv">
                  {w.durationMs === null ? "open" : seconds(w.durationMs)} ·
                  {" "}
                  {w.endedBy ?? "waiting"}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function CopyAsScenario() {
  const c = copyEntry.value;
  if (walk.value !== null && !walkPending.value && walkError.value !== null) {
    return (
      <p class="warn-line">
        ✗ The walk could not run on the engine, so there is nothing to copy:
        {" "}
        {walkError.value}
      </p>
    );
  }
  if (walk.value !== null && walk.value.steps.length > 0 && c === null) {
    return <p class="desc muted small">Checking the walk on the engine…</p>;
  }
  if (walk.value === null || c === null) {
    return (
      <p class="desc muted small">
        Take a step of your own from any frame (Run, Walk from here), and the
        walk shows here as a scenario to copy and hand to the agent.
      </p>
    );
  }
  return (
    <>
      <p class={c.passed ? "all-clear" : "warn-line"}>
        {c.passed
          ? "✓ Passes as it is, on the engine"
          : "✗ Does not pass as it is"}
      </p>
      {!c.passed && (
        <ul class="failures">
          {c.failures.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      )}
      <p class="desc muted small">
        One entry for globalArguments.scenarios. Paste it to the agent, which
        names it, adjusts it and saves it.
      </p>
      {c.placeholders.length > 0 && (
        <p class="desc muted small">
          {c.placeholders.length === 1
            ? `The override of ${c.placeholders[0]} carries`
            : `The overrides of ${c.placeholders.join(", ")} carry`}{" "}
          the placeholder note "{OVERRIDE_NOTE}": tell the agent why a person
          granted{" "}
          {c.placeholders.length === 1 ? "it" : "them"}, so the saved note gives
          the reason.
        </p>
      )}
      <div class="insp-actions">
        <button type="button" class="copy" onClick={() => void copyWalk()}>
          ⧉ Copy as scenario
        </button>
      </div>
      <pre class="code small" tabIndex={0} aria-label="The walk as a scenario">
        {c.text}
      </pre>
    </>
  );
}

function ScenariosTab() {
  const list = runs.value;
  const r = currentRun.value;
  return (
    <div class="insp">
      {list === null && <p class="empty">Running the scenarios…</p>}
      {list !== null && list.length === 0 && <NoRun />}
      {list !== null && list.length > 0 && (
        <>
          <p class="summary">
            {list.filter((s) => s.ok && s.played.passed).length} of{" "}
            {list.length} pass
          </p>
          <ul class="scenarios">
            {list.map((s) => {
              const passed = s.ok && s.played.passed;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    class={passed ? "pass" : "fail"}
                    title={s.path}
                    aria-pressed={s.name === scenario.value &&
                      walk.value === null}
                    onClick={() => pickScenario(s.name)}
                  >
                    <span class="sv">{passed ? "✓" : "✗"}</span> {s.name}
                    {s.ok && !s.played.passed &&
                      ` · ${s.played.failures.length} unexpected`}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {r !== null && r.ok && r.played.failures.length > 0 && (
        <div class="problem" role="alert">
          <b>{r.name}: steps that did not go as expected</b>
          <ul class="failures">
            {r.played.failures.map((f) => {
              // While a walk is shown, only a step before its branch is the
              // same frame in the walk; the others are the scenario's alone.
              const w = walk.value;
              const shown = w === null || f.step <= w.branchAt;
              return (
                <li key={f.step}>
                  {shown
                    ? (
                      <button
                        type="button"
                        class="link"
                        onClick={() => goFrame(f.step)}
                      >
                        step {f.step}
                      </button>
                    )
                    : <span>step {f.step}</span>} {f.label}: {f.message}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <h3>Copy as scenario</h3>
      <CopyAsScenario />
      {scenarioText.value !== null && (
        <>
          <h3>{scenario.value}, as saved</h3>
          <pre class="code small" tabIndex={0}>{scenarioText.value}</pre>
        </>
      )}
    </div>
  );
}

function PanelBody() {
  switch (simTab.value) {
    case "run":
      return <RunTab />;
    case "journal":
      return <JournalTab />;
    case "metrics":
      return <MetricsTab />;
    case "scenarios":
      return <ScenariosTab />;
  }
}

export function SimPanel() {
  const list = runs.value;
  const failing = list?.filter((s) => !s.ok || !s.played.passed).length ?? 0;
  return (
    <aside class="panel" aria-label="Simulation">
      <Tabs<SimTab>
        label="Simulation"
        tabs={[
          ["run", "Run"],
          ["journal", "Journal"],
          ["metrics", "Metrics"],
          ["scenarios", failing > 0 ? `Scenarios ✗${failing}` : "Scenarios"],
        ]}
        value={simTab.value}
        onChange={(t) => (simTab.value = t)}
        controls="sim-body"
      />
      <div
        class="panel-body"
        id="sim-body"
        role="tabpanel"
        aria-labelledby={`tab-${simTab.value}`}
      >
        <PanelBody />
      </div>
    </aside>
  );
}

/** A key the dock may take: not one a focused control already uses. */
function forDock(e: KeyboardEvent): boolean {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const el = e.target instanceof Element ? e.target : null;
  return el === null ||
    el.closest(
        "button, a, input, select, textarea, summary, [role=tree], " +
          "[role=tablist], [contenteditable]",
      ) === null;
}

export function Dock() {
  const list = frames.value;
  const n = list.length;
  const at = frameIndex.value;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!forDock(e)) return;
      if (e.key === " ") setPlaying(!playing.value);
      else if (e.key === "ArrowRight") goFrame(frameIndex.value + 1);
      else if (e.key === "ArrowLeft") goFrame(frameIndex.value - 1);
      else return;
      e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const w = walk.value;
  const pending = walkPending.value;
  const { ticks, ribbon } = timeline(list, w === null ? Infinity : w.branchAt);
  const g = good.value;
  const names = runs.value ?? [];
  const onPick = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
    const select = e.currentTarget;
    pickScenario(select.value);
    // A cancelled discard keeps the scenario; show it again.
    select.value = scenario.value ?? "";
  };
  return (
    <div class="dock" role="region" aria-label="Playback">
      <div class="transport">
        <label for="scn-pick" class="sr-only">Scenario</label>
        <select
          id="scn-pick"
          disabled={names.length === 0}
          value={scenario.value ?? ""}
          onChange={onPick}
        >
          {names.map((s) => (
            <option key={s.name} value={s.name}>
              {s.ok && s.played.passed ? "✓" : "✗"} {s.name}
            </option>
          ))}
        </select>
        {w !== null && <span class="lchip pink">walk</span>}
        <div
          class={pending ? "grp walk-pending" : "grp"}
          role="group"
          aria-label="Transport"
          inert={pending}
        >
          <button
            type="button"
            aria-label="First step"
            onClick={() => goFrame(0)}
          >
            |◀
          </button>
          <button
            type="button"
            aria-label="Back one step"
            onClick={() => goFrame(at - 1)}
          >
            ◁
          </button>
          <button
            type="button"
            class="play"
            aria-label={playing.value ? "Pause" : "Play"}
            disabled={n < 2}
            onClick={() => setPlaying(!playing.value)}
          >
            {playing.value ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            aria-label="Forward one step"
            onClick={() => goFrame(at + 1)}
          >
            ▷
          </button>
          <button
            type="button"
            aria-label="Last step"
            onClick={() => goFrame(n - 1)}
          >
            ▶|
          </button>
          <button
            type="button"
            class="wide"
            aria-label={`Speed ${speed.value} times; change`}
            onClick={() =>
              setSpeed(
                SPEEDS[(SPEEDS.indexOf(speed.value) + 1) % SPEEDS.length],
              )}
          >
            {speed.value}×
          </button>
        </div>
        <span class="frame-count" aria-live="polite">
          {n === 0 ? "–" : `step ${at} / ${n - 1}`}
        </span>
        <span class="keys-hint">Space plays · ← → step</span>
      </div>
      {n > 0 && (
        <div
          class={pending ? "timeline walk-pending" : "timeline"}
          style={{ "--n": String(n) }}
          inert={pending}
        >
          <div class="ribbon" aria-hidden="true">
            {ribbon.map((s) => {
              const stage = g?.definition.stages.find((x) => x.id === s.stage);
              const meta = modeMeta(stage?.work?.mode);
              const cur = at >= s.from && at <= s.to;
              return (
                <span
                  key={`${s.stage}-${s.from}`}
                  class={`rseg ${meta.cls}${cur ? " cur" : ""}`}
                  style={{ gridColumn: `${s.from + 1} / ${s.to + 2}` }}
                  title={s.stage}
                >
                  <span>{s.stage}</span>
                </span>
              );
            })}
          </div>
          <div class="ticks" role="group" aria-label="Steps">
            {ticks.map((t) => (
              <button
                type="button"
                key={t.index}
                class={[
                  "tick",
                  `k-${t.kind}`,
                  t.refused ? "refused" : "",
                  t.asExpected ? "" : "bad",
                  t.walked ? "walked" : "",
                  t.index === at ? "cur" : "",
                  t.index < at ? "past" : "",
                ].filter(Boolean).join(" ")}
                style={{ gridColumn: String(t.index + 1) }}
                aria-label={`Step ${t.index}: ${t.label}${
                  t.refused ? ", refused" : ""
                }${t.asExpected ? "" : ", not as expected"}${
                  t.walked ? ", your step" : ""
                }`}
                aria-current={t.index === at ? "step" : undefined}
                title={`${t.index} · ${t.label}`}
                onClick={() => goFrame(t.index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
