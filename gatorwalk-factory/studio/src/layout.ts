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

// The lane layout of a factory definition, from the prototype. One row per
// tracker status (what a ticket shows while a work item is in the stage),
// stages left to right in flow order inside a row, exits as ports on the
// right of each tile, and orthogonal edges routed through the channels
// between columns and rows, one track per edge, so no two edges overlap.
// Each edge enters its target at its own point on the tile's left side.
// Pure and deterministic: the same definition always gives the same layout.

import type { FactoryDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type {
  DesignView,
  StageView,
  TransitionView,
} from "../../extensions/models/_lib/engine/design_page.ts";

export const TILE_W = 184;
export const HEADER_H = 48;
export const EXIT_H = 24;
/** Entries sit on multiples of this below a tile's top, ports never do. */
const ENTRY_STEP = 24;
const TILE_PAD_B = 6;
const MARGIN = 20;
const VBASE = 26;
const HBASE = 16;
const TRACK = 5.5;
const ROW_TOP = 34;
const ROW_BOTTOM = 14;
const TOP = 8;

/** The ANY STAGE tile's id, which no stage can have (ids are names). */
export const ANY_ID = "*any";

export interface Point {
  x: number;
  y: number;
}

export interface ExitSlot {
  t: TransitionView;
  /** The port's centre. */
  x: number;
  y: number;
  global: boolean;
}

export interface Tile {
  id: string;
  kind: "stage" | "any";
  stage?: StageView;
  /** The stage's index in the definition; -1 for ANY STAGE. */
  index: number;
  lane: number;
  col: number;
  x: number;
  y: number;
  w: number;
  h: number;
  exits: ExitSlot[];
}

export interface Lane {
  /** The tracker status, or "" for none. */
  key: string;
  label: string;
  y: number;
  h: number;
}

export interface EdgeGeom {
  /** `<from tile>:<transition path>`. */
  id: string;
  from: string;
  to: string;
  /** The transition's document path. */
  path: string;
  kind: "forward" | "loop" | "global";
  humanStop: boolean;
  conditional: boolean;
  manual: boolean;
  /** The polyline, port first, entry last. */
  points: Point[];
  /** SVG path data, with rounded corners. */
  d: string;
}

export interface Layout {
  tiles: Map<string, Tile>;
  lanes: Lane[];
  edges: EdgeGeom[];
  width: number;
  height: number;
}

const LANE_LABELS: Record<string, string> = {
  open: "OPEN",
  triaged: "TRIAGED",
  in_progress: "IN PROGRESS",
  shipped: "SHIPPED",
  closed: "CLOSED",
};

export function laneLabel(key: string): string {
  if (key === "") return "NO STATUS";
  return LANE_LABELS[key] ?? key.replace(/[_-]+/g, " ").toUpperCase();
}

/** Longest path from the initial stage over forward (non-loop) transitions. */
export function ranks(view: DesignView): Map<string, number> {
  const ids = new Set(view.stages.map((s) => s.id));
  const out = new Map<string, string[]>();
  for (const s of view.stages) {
    out.set(
      s.id,
      s.transitions.filter((t) => !t.loop && ids.has(t.to)).map((t) => t.to),
    );
  }
  const rank = new Map<string, number>();
  const initial = view.stages.find((s) => s.initial) ?? view.stages[0];
  if (initial === undefined) return rank;
  // Topological order from the initial stage, then longest-path relaxation.
  // Loops are left out, so the forward graph is acyclic.
  const seen = new Set<string>();
  const topo: string[] = [];
  const visit = (id: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    for (const n of out.get(id) ?? []) visit(n);
    topo.push(id);
  };
  visit(initial.id);
  topo.reverse();
  rank.set(initial.id, 0);
  for (const id of topo) {
    const r = rank.get(id);
    if (r === undefined) continue;
    for (const n of out.get(id) ?? []) {
      if ((rank.get(n) ?? -1) < r + 1) rank.set(n, r + 1);
    }
  }
  return rank;
}

/**
 * The status a ticket shows while a work item is in each stage: the stage's
 * tracker status, else the status its enter entry sets, else the one it
 * inherits from its latest predecessor in flow order, else the stage's before
 * it in the file, else none ("").
 */
export function stageLanes(
  definition: FactoryDefinition,
  view: DesignView,
  rank: Map<string, number>,
): Map<string, string> {
  const own = new Map<string, string | undefined>();
  for (const s of definition.stages) {
    const onEnter = s.tracker?.entries?.find((e) =>
      e.on === "enter" && e.status !== undefined
    )?.status;
    own.set(s.id, s.tracker?.status ?? onEnter);
  }
  const preds = new Map<string, string[]>();
  for (const s of view.stages) {
    for (const t of s.transitions) {
      if (t.loop || !own.has(t.to)) continue;
      preds.set(t.to, [...(preds.get(t.to) ?? []), s.id]);
    }
  }
  const order = view.stages.map((s, i) => ({ s, i })).sort((a, b) =>
    (rank.get(a.s.id) ?? 1e6 + a.i) - (rank.get(b.s.id) ?? 1e6 + b.i)
  );
  const lane = new Map<string, string>();
  for (const { s, i } of order) {
    const mine = own.get(s.id);
    if (mine !== undefined) {
      lane.set(s.id, mine);
      continue;
    }
    const from = (preds.get(s.id) ?? [])
      .filter((p) => lane.has(p))
      .sort((a, b) =>
        (rank.get(b) ?? 0) - (rank.get(a) ?? 0) || a.localeCompare(b)
      )[0];
    if (from !== undefined) {
      lane.set(s.id, lane.get(from)!);
      continue;
    }
    const prev = i > 0 ? lane.get(view.stages[i - 1].id) : undefined;
    lane.set(s.id, prev ?? "");
  }
  return lane;
}

interface Req {
  id: string;
  from: Tile;
  exitIndex: number;
  slot: ExitSlot;
  to: Tile;
  kind: EdgeGeom["kind"];
  channels: { v1: number; h?: number; v2?: number };
  tracks: { v1: number; h?: number; v2?: number };
  /** Offset of the entry point below the target's top. */
  entry: number;
}

export function layout(
  definition: FactoryDefinition,
  view: DesignView,
): Layout {
  const rank = ranks(view);
  const laneOf = stageLanes(definition, view, rank);

  // Lane order: by the earliest stage in flow order; stages only a global
  // transition enters come last.
  const orderKey = (s: StageView, i: number) => rank.get(s.id) ?? 1e6 + i;
  const laneMin = new Map<string, number>();
  view.stages.forEach((s, i) => {
    const k = laneOf.get(s.id)!;
    laneMin.set(k, Math.min(laneMin.get(k) ?? Infinity, orderKey(s, i)));
  });
  const laneKeys = [...laneMin.keys()].sort((a, b) =>
    laneMin.get(a)! - laneMin.get(b)!
  );

  const tiles = new Map<string, Tile>();
  const laneTiles: Tile[][] = laneKeys.map(() => []);
  const tile = (
    fields: Pick<Tile, "id" | "kind" | "stage" | "index" | "lane">,
  ): Tile => ({ ...fields, col: 0, x: 0, y: 0, w: TILE_W, h: 0, exits: [] });

  view.stages.forEach((s, i) => {
    const t = tile({
      id: s.id,
      kind: "stage",
      stage: s,
      index: i,
      lane: laneKeys.indexOf(laneOf.get(s.id)!),
    });
    tiles.set(s.id, t);
    laneTiles[t.lane].push(t);
  });
  for (const row of laneTiles) {
    row.sort((a, b) =>
      orderKey(a.stage!, a.index) - orderKey(b.stage!, b.index)
    );
  }
  if (view.globalTransitions.length > 0) {
    const target = tiles.get(view.globalTransitions[0].to);
    const any = tile({
      id: ANY_ID,
      kind: "any",
      index: -1,
      lane: target?.lane ?? laneKeys.length - 1,
    });
    tiles.set(ANY_ID, any);
    laneTiles[any.lane].unshift(any);
  }
  laneTiles.forEach((row) => row.forEach((t, c) => (t.col = c)));
  const maxCols = Math.max(1, ...laneTiles.map((r) => r.length));

  // Route requests, before geometry: which channels each edge uses. Vertical
  // channel c is right of column c (-1 is the left margin); horizontal
  // channel r is above row r.
  const vUse = new Map<number, number>();
  const hUse = new Map<number, number>();
  const take = (use: Map<number, number>, c: number) => {
    const n = use.get(c) ?? 0;
    use.set(c, n + 1);
    return n;
  };
  const reqs: Req[] = [];
  for (const from of tiles.values()) {
    const transitions = from.kind === "any"
      ? view.globalTransitions
      : from.stage!.transitions;
    transitions.forEach((t, exitIndex) => {
      const slot: ExitSlot = { t, x: 0, y: 0, global: from.kind === "any" };
      from.exits.push(slot);
      const to = tiles.get(t.to);
      if (to === undefined) return;
      const kind: EdgeGeom["kind"] = from.kind === "any"
        ? "global"
        : t.loop
        ? "loop"
        : "forward";
      const rs = from.lane, cs = from.col, rt = to.lane, ct = to.col;
      const channels: Req["channels"] = { v1: cs };
      // Straight across when the target is in the next column; otherwise
      // along a horizontal channel to the channel left of the target.
      if (ct !== cs + 1) {
        if (rt === rs) channels.h = ct > cs ? rs : rs + 1;
        else channels.h = rt > rs ? rt : rt + 1;
        channels.v2 = ct - 1;
      }
      reqs.push({
        id: `${from.id}:${t.path}`,
        from,
        exitIndex,
        slot,
        to,
        kind,
        channels,
        tracks: { v1: 0 },
        entry: 0,
      });
    });
  }

  // Tracks: forward edges nearest the tiles, loops and escapes outside them.
  const byKind = [...reqs].sort((a, b) =>
    (a.kind === "forward" ? 0 : 1) - (b.kind === "forward" ? 0 : 1)
  );
  for (const r of byKind) {
    r.tracks.v1 = take(vUse, r.channels.v1);
    if (r.channels.h !== undefined) r.tracks.h = take(hUse, r.channels.h);
    if (r.channels.v2 !== undefined) {
      r.tracks.v2 = r.channels.v2 === r.channels.v1
        ? r.tracks.v1
        : take(vUse, r.channels.v2);
    }
  }

  // Entries: each edge its own point on the target's left side, top to
  // bottom in the order of their sources. Ports sit halfway down an exit
  // row and entries on the row lines, so an exit leaving one tile never
  // runs along an entry into the next.
  const incoming = new Map<string, Req[]>();
  for (const r of reqs) {
    incoming.set(r.to.id, [...(incoming.get(r.to.id) ?? []), r]);
  }
  for (const list of incoming.values()) {
    list.sort((a, b) =>
      a.from.lane - b.from.lane || a.from.col - b.from.col ||
      a.exitIndex - b.exitIndex
    );
    list.forEach((r, i) => (r.entry = (i + 1) * ENTRY_STEP));
  }
  for (const t of tiles.values()) {
    const exits = HEADER_H + t.exits.length * EXIT_H + TILE_PAD_B;
    const entries = ((incoming.get(t.id)?.length ?? 0) + 1) * ENTRY_STEP;
    t.h = Math.max(exits, entries);
  }

  // Geometry.
  const vW = (c: number) => VBASE + (vUse.get(c) ?? 0) * TRACK;
  const hH = (r: number) => HBASE + (hUse.get(r) ?? 0) * TRACK;
  const vLeft = new Map<number, number>();
  let x = MARGIN;
  vLeft.set(-1, x);
  x += vW(-1);
  const colX: number[] = [];
  for (let c = 0; c < maxCols; c++) {
    colX.push(x);
    x += TILE_W;
    vLeft.set(c, x);
    x += vW(c);
  }
  const width = x + MARGIN;
  const trackX = (c: number, i: number) =>
    vLeft.get(c)! + VBASE / 2 + i * TRACK;

  const lanes: Lane[] = [];
  const hTop = new Map<number, number>();
  let y = TOP;
  laneKeys.forEach((key, r) => {
    hTop.set(r, y);
    y += hH(r);
    const rowH = Math.max(...laneTiles[r].map((t) => t.h)) + ROW_TOP +
      ROW_BOTTOM;
    lanes.push({ key, label: laneLabel(key), y, h: rowH });
    for (const t of laneTiles[r]) {
      t.x = colX[t.col];
      t.y = y + ROW_TOP;
    }
    y += rowH;
  });
  hTop.set(laneKeys.length, y);
  y += hH(laneKeys.length);
  const height = y + TOP;
  const trackY = (r: number, i: number) => hTop.get(r)! + HBASE / 2 + i * TRACK;

  for (const t of tiles.values()) {
    t.exits.forEach((slot, i) => {
      slot.x = t.x + t.w;
      slot.y = t.y + HEADER_H + i * EXIT_H + EXIT_H / 2;
    });
  }

  const edges: EdgeGeom[] = reqs.map((r) => {
    const start = { x: r.slot.x, y: r.slot.y };
    const entryY = r.to.y + r.entry;
    const vx1 = trackX(r.channels.v1, r.tracks.v1);
    const points = [start, { x: vx1, y: start.y }];
    if (r.channels.h === undefined) {
      points.push({ x: vx1, y: entryY });
    } else {
      const hy = trackY(r.channels.h, r.tracks.h!);
      const vx2 = trackX(r.channels.v2!, r.tracks.v2!);
      points.push({ x: vx1, y: hy }, { x: vx2, y: hy }, { x: vx2, y: entryY });
    }
    points.push({ x: r.to.x, y: entryY });
    const t = r.slot.t;
    const clean = simplify(points);
    return {
      id: r.id,
      from: r.from.id,
      to: r.to.id,
      path: t.path,
      kind: r.kind,
      humanStop: t.humanStop,
      conditional: t.conditionalHumanStop,
      manual: t.manual,
      points: clean,
      d: rounded(clean, 7),
    };
  });

  return { tiles, lanes, edges, width, height };
}

/** The polyline without zero-length or straight-through points. */
function simplify(points: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (last !== undefined && last.x === p.x && last.y === p.y) continue;
    const prev = out[out.length - 2];
    if (
      prev !== undefined && last !== undefined &&
      ((prev.x === last.x && last.x === p.x) ||
        (prev.y === last.y && last.y === p.y))
    ) {
      out[out.length - 1] = p;
      continue;
    }
    out.push(p);
  }
  return out;
}

const num = (n: number) => String(Math.round(n * 10) / 10);

/** An orthogonal polyline with rounded corners. */
function rounded(points: Point[], radius: number): string {
  let d = `M${num(points[0].x)},${num(points[0].y)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1], b = points[i], c = points[i + 1];
    const l1 = Math.hypot(b.x - a.x, b.y - a.y);
    const l2 = Math.hypot(c.x - b.x, c.y - b.y);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const p1 = {
      x: b.x - ((b.x - a.x) / l1) * r,
      y: b.y - ((b.y - a.y) / l1) * r,
    };
    const p2 = {
      x: b.x + ((c.x - b.x) / l2) * r,
      y: b.y + ((c.y - b.y) / l2) * r,
    };
    d += ` L${num(p1.x)},${num(p1.y)} Q${num(b.x)},${num(b.y)} ${num(p2.x)},${
      num(p2.y)
    }`;
  }
  const last = points[points.length - 1];
  d += ` L${num(last.x)},${num(last.y)}`;
  return d;
}
