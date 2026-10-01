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
// The graph: lanes, tiles, exits with their gate pips, and edges, drawn from
// the layout. It is one tab stop (role tree) with a roving focus that is the
// selection: arrows move it (nav.ts), 'c' copies its reference, and the
// mouse selects the same targets. In Simulate mode it also draws the frame
// shown: the stage the work item is at, how often each stage was entered and
// each exit taken, what the current stage's exits need, a refused move, and a
// token along each transition taken; and it follows the current stage.

import { useEffect, useRef } from "preact/hooks";
import type { JSX } from "preact";
import type { GateView } from "../../extensions/models/_lib/engine/design_view.ts";
import { ANY_ID, EXIT_H, HEADER_H, type Layout, type Tile } from "./layout.ts";
import { allTargets, navigate } from "./nav.ts";
import { pathSegments } from "./model.ts";
import { gateIdentity, type Target, targetKey } from "./selection.ts";
import { EXIT_LABELS, exitKey, type Overlay } from "./simulate.ts";
import {
  changed,
  frameIndex,
  good,
  graph,
  nav,
  select,
  selection,
  simOverlay,
  speed,
  stale,
  trace,
  zoom,
} from "./state.ts";
import { modeMeta, onCopyKey, reveal } from "./ui.tsx";

const MAX_NAME = 17;
/** About how wide a character of the 12px mono exit names is. */
const CHAR_W = 7.3;
const short = (s: string, max = MAX_NAME) =>
  s.length > max ? `${s.slice(0, Math.max(1, max - 1))}…` : s;

/** Element ids for the targets, for aria-activedescendant. */
function nodeIds(): Map<string, string> {
  const model = nav.value;
  const ids = new Map<string, string>();
  if (model === null) return ids;
  allTargets(model).forEach((t, i) => ids.set(targetKey(t), `gt-${i}`));
  return ids;
}

function stageOfFinding(path: string, stage: string | undefined) {
  if (stage !== undefined) return stage;
  const [head, i] = pathSegments(path);
  if (head === "globalTransitions") return ANY_ID;
  if (head === "stages" && typeof i === "number") {
    return good.value?.view.stages[i]?.id;
  }
  return undefined;
}

const reducedMotion = () =>
  globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** Bring the current stage into view, if it is not, centred. */
function follow(box: HTMLElement | null, el: Element | null) {
  if (box === null || el === null) return;
  const p = box.getBoundingClientRect(), r = el.getBoundingClientRect();
  const inView = r.left >= p.left && r.right <= p.right && r.top >= p.top &&
    r.bottom <= p.bottom;
  if (inView) return;
  box.scrollBy({
    left: r.left + r.width / 2 - (p.left + p.width / 2),
    top: r.top + r.height / 2 - (p.top + p.height / 2),
    behavior: reducedMotion() ? "instant" : "smooth",
  });
}

const SVG_NS = "http://www.w3.org/2000/svg";

/** Run a token along an edge, leaving a trail that fades. */
function runToken(edge: SVGPathElement, layer: SVGGElement, rate: number) {
  const dot = document.createElementNS(SVG_NS, "circle");
  dot.setAttribute("r", "6");
  dot.setAttribute("class", "token");
  const trail = document.createElementNS(SVG_NS, "path");
  trail.setAttribute("d", edge.getAttribute("d") ?? "");
  trail.setAttribute("class", "token-trail");
  layer.append(trail, dot);
  const len = edge.getTotalLength();
  trail.style.strokeDasharray = `${len}`;
  const start = performance.now();
  const duration = Math.min(900, 380 + len * 0.6) / rate;
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - k, 3);
    const p = edge.getPointAtLength(eased * len);
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
    trail.style.strokeDashoffset = `${len * (1 - eased)}`;
    if (k < 1) {
      requestAnimationFrame(tick);
      return;
    }
    dot.remove();
    trail.classList.add("fade");
    setTimeout(() => trail.remove(), 700);
  };
  requestAnimationFrame(tick);
}

/**
 * Times an exit was taken: a global exit's from every stage. Matching a global
 * exit by name alone is exact, since the schema refuses a stage transition
 * with a global transition's name.
 */
function takenCount(
  sim: Overlay,
  stage: string,
  exit: string,
  global: boolean,
): number {
  if (!global) return sim.taken.get(exitKey(stage, exit)) ?? 0;
  let n = 0;
  for (const [key, count] of sim.taken) {
    if (key.endsWith(`:${exit}`)) n += count;
  }
  return n;
}

export function fitZoom(box: HTMLElement | null, l: Layout | null) {
  if (box === null || l === null) return;
  const r = box.getBoundingClientRect();
  const z = Math.min((r.width - 8) / l.width, (r.height - 8) / l.height);
  zoom.value = Math.max(0.4, Math.min(1, Math.round(z * 20) / 20));
}

export function Graph() {
  const l = graph.value;
  const g = good.value;
  const box = useRef<HTMLDivElement>(null);
  const fitted = useRef<string | null>(null);
  const fx = useRef<SVGGElement>(null);
  const shown = useRef<number | null>(null);
  const ids = nodeIds();
  const sel = selection.value;
  const selKey = targetKey(sel);
  const activeId = ids.get(selKey);
  const sim = simOverlay.value;
  const index = frameIndex.value;

  // Fit a factory's graph to the pane the first time it is drawn.
  useEffect(() => {
    if (l === null || g === null || fitted.current === g.file) return;
    fitted.current = g.file;
    fitZoom(box.current, l);
  }, [l, g?.file]);

  // Keep the selection in view, however it moved.
  useEffect(() => {
    if (activeId === undefined) return;
    reveal(box.current, document.getElementById(activeId));
  }, [activeId]);

  // Simulate: follow the work item, and run a token along the move just
  // made when the frame shown is the next one, never under reduced motion.
  useEffect(() => {
    if (sim === null) {
      shown.current = null;
      return;
    }
    const tile = box.current?.querySelector(
      `[data-stage="${CSS.escape(sim.current)}"]`,
    );
    follow(box.current, tile ?? null);
    const stepped = shown.current !== null && index === shown.current + 1;
    shown.current = index;
    if (!stepped || sim.moved === null || reducedMotion()) return;
    const { from, transition } = sim.moved;
    const edge = box.current?.querySelector<SVGPathElement>(
      `path.edge[data-exit="${CSS.escape(exitKey(from, transition))}"]`,
    ) ?? box.current?.querySelector<SVGPathElement>(
      `path.edge[data-exit="${CSS.escape(exitKey(ANY_ID, transition))}"]`,
    );
    if (edge && fx.current) runToken(edge, fx.current, speed.value);
  }, [sim, index]);

  if (l === null || g === null) return <div class="canvas empty-graph" />;

  const findingsBy = new Map<string, { e: number; w: number }>();
  for (const f of g.findings) {
    const id = stageOfFinding(f.path, f.stage);
    if (id === undefined) continue;
    const c = findingsBy.get(id) ?? { e: 0, w: 0 };
    if (f.severity === "error") c.e++;
    else c.w++;
    findingsBy.set(id, c);
  }
  const t = trace.value;
  const traced = new Map<string, number>();
  const traceEdges = new Set<string>();
  if (t !== null) {
    t.stages.slice(0, t.step + 1).forEach((s, i) => {
      if (!traced.has(s)) traced.set(s, i + 1);
      if (i > 0) traceEdges.add(`${t.stages[i - 1]}>${s}`);
    });
  }
  const selExit = sel?.kind === "exit" || sel?.kind === "gate"
    ? `${sel.stage ?? ANY_ID}:${sel.exit}`
    : null;

  const onKey = (e: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
    const current = sel?.kind === "finding" ? null : sel;
    if (onCopyKey(e, current)) return;
    const model = nav.value;
    if (model === null) return;
    const next = navigate(model, current, e.key);
    if (next === null) return;
    e.preventDefault();
    select(next);
  };

  const pick = (target: Target) => (e: Event) => {
    e.stopPropagation();
    select(target);
    box.current?.focus({ preventScroll: true });
  };

  return (
    <div
      class={`canvas${stale.value ? " stale" : ""}`}
      ref={box}
      tabIndex={0}
      role="tree"
      aria-label="Stages by tracker status, with their exits and gates"
      aria-activedescendant={activeId}
      onKeyDown={onKey}
      onClick={() => select(null)}
    >
      <svg
        class="graph"
        viewBox={`0 0 ${l.width} ${l.height}`}
        width={Math.round(l.width * zoom.value)}
        height={Math.round(l.height * zoom.value)}
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          {["forward", "loop", "global", "hot"].map((k) => (
            <marker
              key={k}
              id={`arrow-${k}`}
              class={`arrow-${k}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,1 L9,5 L0,9 z" />
            </marker>
          ))}
        </defs>
        <g role="presentation">
          {l.lanes.map((lane) => (
            <g class="lane" key={lane.key}>
              <rect
                class="lane-band"
                x="0"
                y={lane.y}
                width={l.width}
                height={lane.h}
              />
              <rect
                class="lane-tick"
                x="0"
                y={lane.y}
                width="3"
                height={lane.h}
              />
            </g>
          ))}
        </g>
        <g role="presentation">
          {l.edges.map((e) => {
            const hot = traceEdges.has(`${e.from}>${e.to}`);
            const name = e.kind === "global"
              ? g.view.globalTransitions.find((x) => x.path === e.path)?.name
              : g.view.stages.find((s) => s.id === e.from)?.transitions
                .find((x) => x.path === e.path)?.name;
            const key = `${e.from}:${name}`;
            const taken = sim !== null && name !== undefined &&
              takenCount(sim, e.from, name, e.kind === "global") > 0;
            const cls = [
              "edge",
              `k-${e.kind}`,
              e.humanStop ? "human" : "",
              hot ? "trace" : "",
              key === selExit ? "sel" : "",
              taken ? "taken" : "",
            ].filter(Boolean).join(" ");
            return (
              <path
                key={e.id}
                class={cls}
                d={e.d}
                data-exit={key}
                marker-end={`url(#arrow-${hot ? "hot" : e.kind})`}
              />
            );
          })}
        </g>
        <g role="presentation">
          {l.lanes.map((lane) => {
            const key = lane.key ? `status: ${lane.key}` : "no tracker status";
            const w = lane.label.length * 10.2 + key.length * 6.1 + 34;
            return (
              <g class="lane" key={lane.key}>
                <rect
                  class="lane-label-bg"
                  x="6"
                  y={lane.y + 6}
                  width={w}
                  height="20"
                />
                <text class="lane-label" x="14" y={lane.y + 20}>
                  {lane.label}
                  <tspan class="lane-key" dx="12">{key}</tspan>
                </text>
              </g>
            );
          })}
        </g>
        <g role="group">
          {[...l.tiles.values()].map((tile) => (
            <TileView
              key={tile.id}
              tile={tile}
              ids={ids}
              selKey={selKey}
              selExit={selExit}
              findings={findingsBy.get(tile.id)}
              traced={traced.get(tile.id)}
              isChanged={changed.value.has(tile.id)}
              sim={sim}
              pick={pick}
            />
          ))}
        </g>
        <g class="fx" ref={fx} role="presentation" />
      </svg>
    </div>
  );
}

function TileView(props: {
  tile: Tile;
  ids: Map<string, string>;
  selKey: string;
  selExit: string | null;
  findings?: { e: number; w: number };
  traced?: number;
  isChanged: boolean;
  sim: Overlay | null;
  pick: (target: Target) => (e: Event) => void;
}) {
  const { tile, ids, selKey, pick, sim } = props;
  const g = good.value!;
  const isAny = tile.kind === "any";
  const s = tile.stage;
  const meta = isAny ? modeMeta(undefined) : modeMeta(s!.work?.mode);
  const target: Target = isAny
    ? { kind: "any" }
    : { kind: "stage", stage: tile.id };
  const sel = targetKey(target) === selKey;
  const inside = props.selExit?.startsWith(`${tile.id}:`) ?? false;
  const { x, y, w, h } = tile;
  const current = sim !== null && sim.current === tile.id;
  const entered = sim === null || isAny ? 0 : sim.entries[tile.id] ?? 0;
  const cls = [
    "tile",
    meta.cls,
    isAny ? "any" : "",
    s?.terminal ? "terminal" : "",
    sel ? "sel" : "",
    inside ? "inside" : "",
    props.isChanged ? "changed" : "",
    props.traced !== undefined ? "traced" : "",
    current ? "sim-current" : "",
    sim !== null && !isAny && entered === 0 ? "sim-unvisited" : "",
  ].filter(Boolean).join(" ");
  const title = isAny ? "ANY STAGE" : tile.id;
  const label = isAny
    ? "Any stage: global exits, open from every stage but the last"
    : `Stage ${tile.id}, ${meta.label}${s!.initial ? ", entry" : ""}${
      s!.terminal ? ", terminal" : ""
    }, ${s!.transitions.length} exits${
      props.isChanged ? ", changed since you last looked" : ""
    }${
      props.findings
        ? `, ${props.findings.e} errors, ${props.findings.w} warnings`
        : ""
    }${current ? ", the work item is here" : ""}${
      entered > 0 ? `, entered ${entered} time${entered === 1 ? "" : "s"}` : ""
    }`;

  const chips: { text: string; cls: string }[] = [];
  if (s?.initial) chips.push({ text: "ENTRY", cls: "c-entry" });
  if (s?.terminal) chips.push({ text: "END", cls: "c-end" });
  if (props.findings?.e) {
    chips.push({ text: `${props.findings.e} ERR`, cls: "c-err" });
  }
  if (props.findings?.w) {
    chips.push({ text: `${props.findings.w} WARN`, cls: "c-warn" });
  }
  if (props.isChanged) chips.push({ text: "CHANGED", cls: "c-changed" });
  let cx = x + w - 8;
  const placed = chips.map((c) => {
    const cw = c.text.length * 6.4 + 10;
    cx -= cw;
    const at = cx;
    cx -= 4;
    return { ...c, x: at, w: cw };
  });

  const exits = isAny
    ? g.definition.globalTransitions ?? []
    : g.definition.stages.find((st) => st.id === tile.id)?.transitions ?? [];

  return (
    <g
      class={cls}
      id={ids.get(targetKey(target))}
      data-stage={isAny ? undefined : tile.id}
      role="treeitem"
      aria-level={1}
      aria-selected={sel}
      aria-label={label}
      onClick={pick(target)}
    >
      <title>{isAny ? "Any stage" : tile.id}</title>
      <rect class="frame" x={x} y={y} width={w} height={h} />
      <rect class="stripe" x={x} y={y} width="3" height={h} />
      <text class="t-name" x={x + 14} y={y + 21}>{short(title)}</text>
      <text class="t-mode" x={x + 14} y={y + 38}>
        {isAny
          ? "✱ GLOBAL EXITS"
          : `${meta.glyph} ${meta.label.toUpperCase()}${
            s!.terminal ? "" : ` · ⟳${s!.maxCycles}`
          }`}
      </text>
      {placed.map((c) => (
        <g class={`chip ${c.cls}`} key={c.text}>
          <rect x={c.x} y={y + 8} width={c.w} height="15" rx="2" />
          <text x={c.x + c.w / 2} y={y + 19}>{c.text}</text>
        </g>
      ))}
      {entered > 0 && (
        <g class="entry-badge">
          <circle cx={x - 2} cy={y - 2} r="10" />
          <text x={x - 2} y={y + 2}>{`×${entered}`}</text>
        </g>
      )}
      {props.traced !== undefined && (
        <g class="trace-badge">
          <circle cx={x - 2} cy={y - 2} r="10" />
          <text x={x - 2} y={y + 2}>{props.traced}</text>
        </g>
      )}
      {sel && <Brackets x={x} y={y} w={w} h={h} />}
      <line
        class="sep"
        x1={x + 10}
        x2={x + w - 10}
        y1={y + HEADER_H - 3}
        y2={y + HEADER_H - 3}
      />
      {tile.exits.map((slot, i) => {
        const tr = slot.t;
        const exitTarget: Target = {
          kind: "exit",
          stage: isAny ? null : tile.id,
          exit: tr.name,
        };
        const ry = y + HEADER_H + i * EXIT_H;
        const exitSel = targetKey(exitTarget) === selKey;
        // The exits the work item has now: its own stage's, and the global
        // ones, which are open from every stage but a terminal one.
        const live = sim !== null && (current || (isAny && slot.global))
          ? sim.exits.get(tr.name)
          : undefined;
        const taken = sim === null
          ? 0
          : takenCount(sim, tile.id, tr.name, slot.global);
        const refused = sim?.refused !== null && sim?.refused !== undefined &&
          sim.refused.transition === tr.name &&
          (slot.global || sim.refused.from === tile.id);
        const ecls = [
          "exit",
          tr.humanStop ? "human" : "",
          tr.conditionalHumanStop ? "cond" : "",
          tr.loop ? "loop" : "",
          slot.global ? "global" : "",
          exitSel ? "sel" : "",
          live !== undefined ? `st-${live.state}` : "",
          refused ? "refused" : "",
        ].filter(Boolean).join(" ");
        const aria = `Exit ${tr.name} to ${tr.to}${
          tr.humanStop ? ", a person decides" : ""
        }${
          tr.conditionalHumanStop
            ? ", a person decides when a condition holds"
            : ""
        }${tr.manual ? ", manual" : ""}${
          tr.loop ? ", loops back" : ""
        }, ${tr.gates.length} gate${tr.gates.length === 1 ? "" : "s"}${
          live !== undefined ? `, ${EXIT_LABELS[live.state]}` : ""
        }${taken > 0 ? `, taken ${taken} time${taken === 1 ? "" : "s"}` : ""}${
          refused ? ", refused just now" : ""
        }`;
        const lead = tr.manual ? "✋" : tr.loop ? "↺" : slot.global ? "⚠" : "→";
        const specGates = exits.find((e) => e.name === tr.name)?.gates ?? [];
        // Every gate is drawn, since each is a target; many share the room.
        const step = Math.min(8, 80 / Math.max(1, tr.gates.length));
        // The name gets the room left of the first pip.
        const pipsLeft = x + w - 16 - step * tr.gates.length;
        const nameRoom = Math.floor((pipsLeft - 4 - (x + 28)) / CHAR_W);
        const pips = tr.gates.map((gate, k) => ({
          gate,
          k,
          at: x + w - 16 - step * (tr.gates.length - k),
        }));
        return (
          <g
            key={tr.path}
            class={ecls}
            id={ids.get(targetKey(exitTarget))}
            role="treeitem"
            aria-level={2}
            aria-selected={exitSel}
            aria-label={aria}
            onClick={pick(exitTarget)}
          >
            <title>
              {`${tr.name} → ${tr.to}${
                live !== undefined
                  ? `\n${EXIT_LABELS[live.state]}${
                    live.failures.map((f) => `\n· ${f}`).join("")
                  }`
                  : ""
              }`}
            </title>
            <rect
              class="row"
              x={x + 4}
              y={ry + 1}
              width={w - 8}
              height={EXIT_H - 2}
            />
            <text class="e-lead" x={x + 14} y={ry + 16}>{lead}</text>
            <text class="e-name" x={x + 28} y={ry + 16}>
              {short(tr.name, nameRoom)}
            </text>
            {taken > 0 && (
              <text class="e-taken" x={x + w + 8} y={ry + 16}>
                {`×${taken}`}
              </text>
            )}
            {pips.map(({ gate, k, at }) => {
              const gateTarget: Target = {
                kind: "gate",
                stage: exitTarget.stage,
                exit: tr.name,
                gate: gateIdentity(specGates, k),
              };
              return (
                <Pip
                  key={k}
                  gate={gate}
                  x={at}
                  y={ry}
                  id={ids.get(targetKey(gateTarget))}
                  selected={targetKey(gateTarget) === selKey}
                  onClick={pick(gateTarget)}
                />
              );
            })}
            <circle class="port" cx={slot.x} cy={slot.y} r="4.5" />
          </g>
        );
      })}
    </g>
  );
}

function Pip(props: {
  gate: GateView;
  x: number;
  y: number;
  id?: string;
  selected: boolean;
  onClick: (e: Event) => void;
}) {
  const { gate, x, y } = props;
  const human = gate.type === "human-approval";
  const cond = human && gate.when !== undefined;
  return (
    <g
      class={`gate${props.selected ? " sel" : ""}`}
      id={props.id}
      role="treeitem"
      aria-level={3}
      aria-selected={props.selected}
      aria-label={`Gate: ${gate.text}${cond ? `, when ${gate.when}` : ""}`}
      onClick={props.onClick}
    >
      <title>{gate.text}</title>
      <rect class="pip-hit" x={x - 1} y={y + 2} width="8" height={EXIT_H - 4} />
      {human
        ? (
          <path
            class={`pip ${cond ? "pip-cond" : "pip-human"}`}
            d={`M${x + 3},${y + 8} l3.5,3.5 l-3.5,3.5 l-3.5,-3.5z`}
          />
        )
        : <rect class="pip" x={x} y={y + 9} width="6" height="6" />}
    </g>
  );
}

function Brackets(
  { x, y, w, h }: { x: number; y: number; w: number; h: number },
) {
  const b = 9, o = 5;
  return (
    <g class="brackets">
      <path d={`M${x - o},${y - o + b} V${y - o} H${x - o + b}`} />
      <path d={`M${x + w + o - b},${y - o} H${x + w + o} V${y - o + b}`} />
      <path d={`M${x - o},${y + h + o - b} V${y + h + o} H${x - o + b}`} />
      <path
        d={`M${x + w + o - b},${y + h + o} H${x + w + o} V${y + h + o - b}`}
      />
    </g>
  );
}
