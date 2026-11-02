// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// The lane layout of a factory definition, from the prototype. One row per
// tracker status (what a ticket shows while a work item is in the stage),
// stages left to right in flow order inside a row, exits as ports on the
// right of each tile, and orthogonal edges routed through the channels
// between columns and rows, one track per edge, so no two edges overlap.
// Each edge enters its target at its own point on the tile's left side.
// Pure and deterministic: the same definition always gives the same layout.
//
// Down (swamp-club #3380), for panes too narrow to read the factory across:
// the same lanes, flow and tiles, transposed. Each lane is a column, side by
// side, its stages stacked top to bottom in flow order. Tiles are drawn as
// across, ports on the right. An edge from a stage in the same lane or a
// lane to its right enters its target on the right side, so a step down a
// lane runs straight down the channel beside it; one from a lane to the
// left enters on the left.

import type { FactoryDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type {
  DesignView,
  StageView,
  TransitionView,
} from "../../extensions/models/_lib/engine/design_view.ts";

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
/** Down: room above the first row for the lanes' labels. */
const LANE_HEAD = 46;
/** Down: room above each row's tiles. */
const ROW_GAP = 12;
/** Down: how far a lane's band reaches past its tiles. */
const BAND_PAD = 8;

/** Which way the flow runs: left to right, or top to bottom. */
export type Orientation = "across" | "down";
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
  /** Where the stage is in the flow: the longest forward path to it from
   * the initial stage; a stage no forward path reaches follows them all, in
   * file order. -1 for ANY STAGE. */
  flow: number;
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
  /** The lane's band: a row across, a column down. */
  x: number;
  y: number;
  w: number;
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
  orientation: Orientation;
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
  /** The side of the target the edge enters. */
  side: "left" | "right";
}

export function layout(
  definition: FactoryDefinition,
  view: DesignView,
  orientation: Orientation = "across",
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
    fields: Pick<Tile, "id" | "kind" | "stage" | "index" | "lane" | "flow">,
  ): Tile => ({ ...fields, col: 0, x: 0, y: 0, w: TILE_W, h: 0, exits: [] });

  view.stages.forEach((s, i) => {
    const t = tile({
      id: s.id,
      kind: "stage",
      stage: s,
      index: i,
      flow: orderKey(s, i),
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
      flow: -1,
      lane: target?.lane ?? laneKeys.length - 1,
    });
    tiles.set(ANY_ID, any);
    laneTiles[any.lane].unshift(any);
  }
  laneTiles.forEach((row) => row.forEach((t, c) => (t.col = c)));
  const maxCols = Math.max(1, ...laneTiles.map((r) => r.length));

  // The grid the router works on. Across, a lane is a row and its stages
  // columns; down, a lane is a column and its stages rows.
  const down = orientation === "down";
  const gc = (t: Tile) => down ? t.lane : t.col;
  const gr = (t: Tile) => down ? t.col : t.lane;
  const nCols = down ? laneKeys.length : maxCols;
  const nRows = down ? maxCols : laneKeys.length;

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
      const rs = gr(from), cs = gc(from), rt = gr(to), ct = gc(to);
      const channels: Req["channels"] = { v1: cs };
      // Down, from the same column or one to the right, in on the right.
      const side = down && ct <= cs ? "right" : "left";
      const h = rt === rs ? (ct > cs ? rs : rs + 1) : rt > rs ? rt : rt + 1;
      if (side === "right") {
        // Straight down or up the channel beside the column when the source
        // is in it; otherwise along a horizontal channel to that channel.
        if (ct !== cs) {
          channels.h = h;
          channels.v2 = ct;
        }
      } else if (ct !== cs + 1) {
        // Straight across when the target is in the next column; otherwise
        // along a horizontal channel to the channel left of the target.
        channels.h = h;
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
        side,
      });
    });
  }

  // Tracks: forward edges nearest the tiles, loops and escapes outside them.
  // Down, edges entering a right side come first, so in each channel they
  // hug the column on its left and their entries never run along an entry
  // into the column on its right at the same height.
  const order = (r: Req) =>
    (r.side === "right" ? 0 : 2) + (r.kind === "forward" ? 0 : 1);
  const byKind = [...reqs].sort((a, b) => order(a) - order(b));
  for (const r of byKind) {
    r.tracks.v1 = take(vUse, r.channels.v1);
    if (r.channels.h !== undefined) r.tracks.h = take(hUse, r.channels.h);
    if (r.channels.v2 !== undefined) {
      r.tracks.v2 = r.channels.v2 === r.channels.v1
        ? r.tracks.v1
        : take(vUse, r.channels.v2);
    }
  }

  // Entries: each edge its own point on its side of the target, top to
  // bottom in the order of their sources. Ports sit halfway down an exit
  // row and entries on the row lines, so an exit leaving one tile never
  // runs along an entry into the next, nor along one into its right side.
  const incoming = new Map<string, Req[]>();
  for (const r of reqs) {
    const k = `${r.side}:${r.to.id}`;
    incoming.set(k, [...(incoming.get(k) ?? []), r]);
  }
  for (const list of incoming.values()) {
    list.sort((a, b) =>
      gr(a.from) - gr(b.from) || gc(a.from) - gc(b.from) ||
      a.exitIndex - b.exitIndex
    );
    list.forEach((r, i) => (r.entry = (i + 1) * ENTRY_STEP));
  }
  for (const t of tiles.values()) {
    const exits = HEADER_H + t.exits.length * EXIT_H + TILE_PAD_B;
    const most = Math.max(
      incoming.get(`left:${t.id}`)?.length ?? 0,
      incoming.get(`right:${t.id}`)?.length ?? 0,
    );
    t.h = Math.max(exits, (most + 1) * ENTRY_STEP);
  }

  // Geometry.
  const vW = (c: number) => VBASE + (vUse.get(c) ?? 0) * TRACK;
  const hH = (r: number) => HBASE + (hUse.get(r) ?? 0) * TRACK;
  const vLeft = new Map<number, number>();
  let x = MARGIN;
  vLeft.set(-1, x);
  x += vW(-1);
  const colX: number[] = [];
  for (let c = 0; c < nCols; c++) {
    colX.push(x);
    x += TILE_W;
    vLeft.set(c, x);
    x += vW(c);
  }
  const width = x + MARGIN;
  const trackX = (c: number, i: number) =>
    vLeft.get(c)! + VBASE / 2 + i * TRACK;

  const rowTiles: Tile[][] = Array.from({ length: nRows }, () => []);
  for (const t of tiles.values()) rowTiles[gr(t)].push(t);
  const lanes: Lane[] = [];
  const hTop = new Map<number, number>();
  const rowTop = down ? ROW_GAP : ROW_TOP;
  let y = TOP + (down ? LANE_HEAD : 0);
  rowTiles.forEach((row, r) => {
    hTop.set(r, y);
    y += hH(r);
    const rowH = Math.max(...row.map((t) => t.h)) + rowTop + ROW_BOTTOM;
    if (!down) {
      const key = laneKeys[r];
      lanes.push({ key, label: laneLabel(key), x: 0, y, w: width, h: rowH });
    }
    for (const t of row) {
      t.x = colX[gc(t)];
      t.y = y + rowTop;
    }
    y += rowH;
  });
  hTop.set(nRows, y);
  y += hH(nRows);
  const height = y + TOP;
  if (down) {
    laneKeys.forEach((key, c) =>
      lanes.push({
        key,
        label: laneLabel(key),
        x: colX[c] - BAND_PAD,
        y: TOP,
        w: TILE_W + 2 * BAND_PAD,
        h: height - 2 * TOP,
      })
    );
  }
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
    points.push({
      x: r.side === "left" ? r.to.x : r.to.x + r.to.w,
      y: entryY,
    });
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

  return { orientation, tiles, lanes, edges, width, height };
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

/** Below this fit across, a pane draws the factory down (swamp-club #3380). */
export const DOWN_BELOW = 0.75;
/** Drawn down, it goes back across only once across fits this well, so a
 * resize near the line does not flip it back and forth. */
export const ACROSS_FROM = 0.85;
const MIN_ZOOM = 0.4;

/**
 * The zoom that fits a layout to a pane, in steps of 5%, from 40% to 100%.
 * Across fits both ways; down fits the width and scrolls down.
 */
export function fitOf(
  l: { orientation: Orientation; width: number; height: number },
  pane: { width: number; height: number },
): number {
  const w = (pane.width - 8) / l.width;
  const z = l.orientation === "down"
    ? w
    : Math.min(w, (pane.height - 8) / l.height);
  return Math.max(MIN_ZOOM, Math.min(1, Math.round(z * 20) / 20));
}

/**
 * Which way to draw a factory in a pane: across while it fits at 75% or
 * more, else down when down fits better; back across from 85%.
 */
export function chooseOrientation(
  across: { width: number; height: number },
  down: { width: number; height: number },
  pane: { width: number; height: number },
  current: Orientation,
): Orientation {
  const a = fitOf({ ...across, orientation: "across" }, pane);
  const d = fitOf({ ...down, orientation: "down" }, pane);
  if (current === "across") return a < DOWN_BELOW && d > a ? "down" : "across";
  return a >= ACROSS_FROM || d <= a ? "across" : "down";
}
