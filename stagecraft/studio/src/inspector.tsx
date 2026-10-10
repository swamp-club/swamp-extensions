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
// The inspector: select a stage, an exit or a gate to understand it. It
// shows the stage's handoff (mode, call, skills, injects, let values,
// prompts), its products, its exits with their gates and conditions, what
// the ticket shows, and every description the file gives. With nothing
// selected it shows the factory definition as a whole.

import type {
  StageView,
  TransitionView,
} from "../../extensions/models/_lib/engine/design_view.ts";
import { ANY_ID } from "./layout.ts";
import { gateIdentity, type Target, targetAt, targetKey } from "./selection.ts";
import { changed, good, graph, select, selection } from "./state.ts";
import { CopyButton, modeMeta, MODES, onCopyKey, TARGET_ATTR } from "./ui.tsx";

/** The stage (or ANY_ID) whose details to show for a selection. */
function focusStage(sel: Target | null): string | null {
  if (sel === null) return null;
  if (sel.kind === "stage") return sel.stage;
  if (sel.kind === "any") return ANY_ID;
  if (sel.kind === "finding") {
    const g = good.value;
    const at = g === null ? null : targetAt(g.definition, sel.path);
    return at === null ? null : focusStage(at);
  }
  return sel.stage ?? ANY_ID;
}

export function Inspector() {
  const g = good.value;
  if (g === null) {
    return (
      <p class="empty">No factory definition that passes the schema yet.</p>
    );
  }
  const stage = focusStage(selection.value);
  return (
    <div class="insp" onKeyDown={(e) => onCopyKey(e)}>
      {stage === null
        ? <Overview />
        : stage === ANY_ID
        ? <AnyStage />
        : <StageDetails id={stage} />}
    </div>
  );
}

function Overview() {
  const g = good.value!;
  const v = g.view;
  const modes = new Map<string, number>();
  for (const s of v.stages) {
    const m = s.work?.mode ?? "none";
    modes.set(m, (modes.get(m) ?? 0) + 1);
  }
  const all = [
    ...v.stages.flatMap((s) => s.transitions),
    ...v.globalTransitions,
  ];
  const stops = all.filter((t) => t.humanStop).length;
  const cond = all.filter((t) => t.conditionalHumanStop).length;
  const loops = all.filter((t) => t.loop).length;
  return (
    <>
      <p class="eyebrow">Factory definition</p>
      <h2 class="insp-title">{v.name}</h2>
      <p class="path-line">{g.file}</p>
      {v.description
        ? <p class="desc">{v.description}</p>
        : <p class="desc muted">No description.</p>}
      <dl class="stats">
        <div>
          <dt>Stages</dt>
          <dd>{v.stages.length}</dd>
        </div>
        <div>
          <dt>Exits</dt>
          <dd>{all.length}</dd>
        </div>
        <div>
          <dt>Human stops</dt>
          <dd class="gold">
            {stops}
            {cond > 0 && <small>+{cond} conditional</small>}
          </dd>
        </div>
        <div>
          <dt>Loops back</dt>
          <dd class="pink">{loops}</dd>
        </div>
      </dl>
      <h3>Work modes</h3>
      <ul class="modes-list">
        {[...modes].map(([m, n]) => {
          const meta = MODES[m] ?? MODES.none;
          return (
            <li class={meta.cls} key={m}>
              <span class="mchip">{meta.glyph} {meta.label}</span>
              <span class="n">{n}</span>
              <span class="blurb">{meta.blurb}</span>
            </li>
          );
        })}
      </ul>
      <h3>Reading the graph</h3>
      <ul class="key">
        <li>
          <span class="k-lane">OPEN</span>{" "}
          A row is the tracker status a ticket shows while the work is in that
          stage.
        </li>
        <li>
          <span class="k-fwd" aria-hidden="true" /> Forward.{" "}
          <span class="k-loop" aria-hidden="true" />{" "}
          A loop back (rework, dashed).{" "}
          <span class="k-glob" aria-hidden="true" />{" "}
          A global exit, from any stage (dotted).
        </li>
        <li>
          <span class="k-human">◆</span> A person approves.{" "}
          <span class="k-cond">◇</span> Only when a condition holds. <b>✋</b>
          {" "}
          A manual exit a person takes.{" "}
          <span class="k-pip" aria-hidden="true" /> Any other gate.
        </li>
        <li>
          <span class="c-changed-key">CHANGED</span>{" "}
          The stage differs from what you last looked at. Selecting it marks it
          seen.
        </li>
        <li>
          Select a stage, an exit or a gate to inspect it. Copy reference gives
          a line to paste to the agent, which makes the change; the page reloads
          when the file does.
        </li>
      </ul>
    </>
  );
}

function AnyStage() {
  const g = good.value!;
  const target: Target = { kind: "any" };
  return (
    <>
      <p class="eyebrow">Global exits</p>
      <h2 class="insp-title">Any stage</h2>
      <div class="insp-actions">
        <CopyButton target={target} label="the global exits" />
      </div>
      <p class="desc">
        Open from every stage but a terminal one. They never close a cycle.
      </p>
      <h3>Exits</h3>
      {g.view.globalTransitions.map((t) => (
        <ExitCard key={t.path} t={t} stage={null} />
      ))}
    </>
  );
}

function StageDetails({ id }: { id: string }) {
  const g = good.value!;
  const s = g.view.stages.find((x) => x.id === id);
  if (s === undefined) return <Overview />;
  const spec = g.definition.stages.find((x) => x.id === id)!;
  const meta = modeMeta(s.work?.mode);
  const tile = graph.value?.tiles.get(id);
  const lane = tile === undefined ? undefined : graph.value!.lanes[tile.lane];
  const target: Target = { kind: "stage", stage: id };
  const entries = spec.tracker?.entries ?? [];
  return (
    <>
      <p class="eyebrow">
        Stage{s.initial ? " · entry" : ""}
        {s.terminal ? " · terminal" : ""}
        {changed.value.has(id) ? " · changed" : ""}
      </p>
      <h2 class="insp-title">{s.id}</h2>
      <div class="chips">
        <span class={`mchip ${meta.cls}`}>{meta.glyph} {meta.label}</span>
        {lane !== undefined && <span class="lchip">{lane.label}</span>}
        {!s.terminal && (
          <>
            <span class="lchip">⟳ {s.maxCycles} cycles</span>
            <span class="lchip">⇉ {s.maxDispatchesPerCycle} dispatches</span>
            <span class="lchip">
              ↯ {s.maxInterruptionsPerCycle} interruptions
            </span>
          </>
        )}
      </div>
      <div class="insp-actions">
        <CopyButton target={target} label={`stage ${id}`} />
      </div>
      {s.description
        ? <p class="desc">{s.description}</p>
        : <p class="desc muted">No description.</p>}
      <Handoff s={s} />
      {s.products.length > 0 && (
        <>
          <h3>Produces</h3>
          <ul class="products">
            {s.products.map((p) => (
              <li key={`${p.kind}:${p.name}`}>
                <span class={`pk ${p.kind}`}>
                  {p.kind === "artifact" ? "ARTIFACT" : "EVIDENCE"}
                </span>
                <code>{p.name}</code>
                {p.findings && <span class="lchip">findings</span>}
                {p.reviews && <span class="lchip">reviews {p.reviews}</span>}
                {p.description && <p>{p.description}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
      {s.transitions.length > 0 && (
        <>
          <h3>Exits</h3>
          {s.transitions.map((t) => <ExitCard key={t.path} t={t} stage={id} />)}
        </>
      )}
      {(s.trackerStatus !== undefined || entries.length > 0) && (
        <>
          <h3>On the ticket</h3>
          <ul class="entries">
            {s.trackerStatus !== undefined && (
              <li>
                <span class="em" aria-hidden="true">▣</span>
                <span>status → {s.trackerStatus}</span>
              </li>
            )}
            {entries.map((e, i) => (
              <li key={i}>
                <span class="em" aria-hidden="true">{e.emoji}</span>
                <span>{e.summary}</span>
                <small>
                  on {typeof e.on === "string"
                    ? e.on
                    : Object.entries(e.on).map(([k, v]) => `${k} ${v}`).join(
                      "",
                    )}
                  {e.cycle ? ` · ${e.cycle} cycle` : ""}
                  {e.status ? ` · status ${e.status}` : ""}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function Handoff({ s }: { s: StageView }) {
  const w = s.work;
  if (w === undefined) return null;
  const meta = modeMeta(w.mode);
  return (
    <>
      <h3>Handoff</h3>
      {w.description && <p class="desc">{w.description}</p>}
      <dl class="kv">
        <dt>Mode</dt>
        <dd>{meta.label}: {meta.blurb}</dd>
        {w.call && (
          <>
            <dt>Calls</dt>
            <dd>
              <code>{w.call}</code>
            </dd>
          </>
        )}
        {w.skills.length > 0 && (
          <>
            <dt>Skills</dt>
            <dd>{w.skills.map((k) => <code key={k}>{k}</code>)}</dd>
          </>
        )}
        {w.inject.length > 0 && (
          <>
            <dt>Injects</dt>
            <dd>{w.inject.map((k) => <code key={k}>{k}</code>)}</dd>
          </>
        )}
        {w.let.length > 0 && (
          <>
            <dt>Let</dt>
            <dd>{w.let.map((k) => <code key={k}>{`{{${k}}}`}</code>)}</dd>
          </>
        )}
        {w.passAsInputs.length > 0 && (
          <>
            <dt>Passed as inputs</dt>
            <dd>{w.passAsInputs.map((k) => <code key={k}>{k}</code>)}</dd>
          </>
        )}
        {w.resultEvidence && (
          <>
            <dt>Result</dt>
            <dd>
              <code>{w.resultEvidence}</code>
            </dd>
          </>
        )}
      </dl>
      {w.systemPrompt && <Prompt title="System prompt" text={w.systemPrompt} />}
      {w.command && <Prompt title="Command" text={w.command} />}
      {w.constraints && <Prompt title="Constraints" text={w.constraints} />}
    </>
  );
}

function Prompt({ title, text }: { title: string; text: string }) {
  return (
    <details class="prompt">
      <summary>{title}</summary>
      <pre>{text}</pre>
    </details>
  );
}

function ExitCard({ t, stage }: { t: TransitionView; stage: string | null }) {
  const g = good.value!;
  const sel = selection.value;
  const target: Target = { kind: "exit", stage, exit: t.name };
  const selected = targetKey(sel) === targetKey(target);
  const spec =
    (stage === null
      ? g.definition.globalTransitions ?? []
      : g.definition.stages.find((s) => s.id === stage)?.transitions ?? [])
      .find((x) => x.name === t.name);
  const gates = spec?.gates ?? [];
  const from = stage ?? "any stage";
  return (
    <article
      class={`exit-card${selected ? " sel" : ""}${t.humanStop ? " human" : ""}`}
    >
      <header>
        <button
          type="button"
          class="exit-pick"
          aria-pressed={selected}
          {...{ [TARGET_ATTR]: JSON.stringify(target) }}
          onClick={() => select(target)}
        >
          <b>{t.name}</b>
          <span class="to">→ {t.to}</span>
        </button>
        {t.loop && <span class="lchip pink">↺ loop back</span>}
        {t.humanStop
          ? <span class="lchip gold">◆ person decides</span>
          : t.conditionalHumanStop
          ? <span class="lchip gold">◇ person, if…</span>
          : null}
        {t.manual && <span class="lchip">✋ manual</span>}
      </header>
      {t.description && <p class="desc">{t.description}</p>}
      {t.gates.length > 0
        ? (
          <ul class="gates">
            {t.gates.map((gv, k) => {
              const gateTarget: Target = {
                kind: "gate",
                stage,
                exit: t.name,
                gate: gateIdentity(gates, k),
              };
              const gateSel = targetKey(sel) === targetKey(gateTarget);
              return (
                <li
                  key={k}
                  class={`${gv.human ? (gv.when ? "g-cond" : "g-human") : ""}${
                    gateSel ? " sel" : ""
                  }`}
                >
                  <button
                    type="button"
                    class="gate-pick"
                    aria-pressed={gateSel}
                    {...{ [TARGET_ATTR]: JSON.stringify(gateTarget) }}
                    onClick={() => select(gateTarget)}
                  >
                    <span class="gt">{gv.type}</span>
                    <span>{gv.text}</span>
                  </button>
                  {gv.when && <code class="when">when {gv.when}</code>}
                  {gv.description && <p class="gdesc">{gv.description}</p>}
                  {gateSel && (
                    <CopyButton
                      target={gateTarget}
                      label={`the ${gv.type} gate on exit ${t.name}`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )
        : (
          <p class="muted small">
            No gates: the exit is open as soon as it is tried.
          </p>
        )}
      <div class="exit-actions">
        <CopyButton target={target} label={`exit ${t.name} from ${from}`} />
      </div>
    </article>
  );
}
