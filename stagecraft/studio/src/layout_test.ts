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

import { assert, assertEquals } from "@std/assert";
import {
  ACROSS_FROM,
  ANY_ID,
  chooseOrientation,
  DOWN_BELOW,
  type EdgeGeom,
  fitOf,
  layout,
  type Orientation,
  type Point,
  ranks,
  stageLanes,
} from "./layout.ts";
import { loadDefinition } from "./model.ts";
import { EXAMPLES, loadOk, modelFile, modelPath } from "./test_support.ts";
import { DEFINITION_SCHEMA_VERSION } from "../../extensions/models/_lib/engine/definition_schema.ts";

type Segment = { a: Point; b: Point; edge: string };

function segments(edges: EdgeGeom[]): Segment[] {
  return edges.flatMap((e) =>
    e.points.slice(1).map((b, i) => ({ a: e.points[i], b, edge: e.id }))
  );
}

const EPS = 0.5;

/** Two axis-aligned segments run along each other for more than a point. */
function overlap(s: Segment, t: Segment): boolean {
  const sv = Math.abs(s.a.x - s.b.x) < EPS;
  const tv = Math.abs(t.a.x - t.b.x) < EPS;
  if (sv !== tv) return false;
  const [p, q] = sv ? ["x", "y"] as const : ["y", "x"] as const;
  if (Math.abs(s.a[p] - t.a[p]) >= EPS) return false;
  const lo = Math.max(Math.min(s.a[q], s.b[q]), Math.min(t.a[q], t.b[q]));
  const hi = Math.min(Math.max(s.a[q], s.b[q]), Math.max(t.a[q], t.b[q]));
  return hi - lo > EPS;
}

/** A segment passes through a rectangle's inside. */
function crosses(
  s: Segment,
  r: { x: number; y: number; w: number; h: number },
): boolean {
  const x0 = Math.min(s.a.x, s.b.x), x1 = Math.max(s.a.x, s.b.x);
  const y0 = Math.min(s.a.y, s.b.y), y1 = Math.max(s.a.y, s.b.y);
  return x1 > r.x + EPS && x0 < r.x + r.w - EPS && y1 > r.y + EPS &&
    y0 < r.y + r.h - EPS;
}

const key = (p: Point) => `${Math.round(p.x * 10)},${Math.round(p.y * 10)}`;

const ORIENTATIONS: Orientation[] = ["across", "down"];

for (
  const [name, o] of EXAMPLES.flatMap((n) =>
    ORIENTATIONS.map((o) => [n, o] as const)
  )
) {
  const label = o === "across" ? name : `${name} (down)`;
  Deno.test(`layout ${label}: no two edges overlap`, async () => {
    const { definition, view } = await loadOk(name);
    const all = segments(layout(definition, view, o).edges);
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        if (all[i].edge === all[j].edge) continue;
        assert(
          !overlap(all[i], all[j]),
          `${all[i].edge} and ${all[j].edge} overlap: ${
            JSON.stringify([all[i].a, all[i].b, all[j].a, all[j].b])
          }`,
        );
      }
    }
  });

  Deno.test(`layout ${label}: no edge passes through a tile`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view, o);
    for (const s of segments(l.edges)) {
      for (const t of l.tiles.values()) {
        assert(!crosses(s, t), `${s.edge} passes through ${t.id}`);
      }
    }
  });

  Deno.test(`layout ${label}: every edge has a port and an entry of its own`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view, o);
    const starts = new Set(l.edges.map((e) => key(e.points[0])));
    const ends = new Set(l.edges.map((e) => key(e.points.at(-1)!)));
    assertEquals(starts.size, l.edges.length);
    assertEquals(ends.size, l.edges.length);
    for (const e of l.edges) {
      const to = l.tiles.get(e.to)!;
      const end = e.points.at(-1)!;
      // Across, every edge enters on the left; down, on either side.
      assert(
        end.x === to.x || (o === "down" && end.x === to.x + to.w),
        `${e.id} ends on its target's side`,
      );
      assert(end.y > to.y && end.y < to.y + to.h, `${e.id} enters ${e.to}`);
      const from = l.tiles.get(e.from)!;
      assertEquals(e.points[0].x, from.x + from.w);
    }
  });

  Deno.test(`layout ${label}: one edge per transition, one exit per transition`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view, o);
    const transitions = [
      ...view.stages.flatMap((s) =>
        s.transitions.map((t) => `${s.id}:${t.path}`)
      ),
      ...view.globalTransitions.map((t) => `${ANY_ID}:${t.path}`),
    ];
    assertEquals(l.edges.map((e) => e.id).sort(), transitions.sort());
    for (const t of l.tiles.values()) {
      const expected = t.kind === "any"
        ? view.globalTransitions.length
        : t.stage!.transitions.length;
      assertEquals(t.exits.length, expected);
    }
  });

  Deno.test(`layout ${label}: the same definition gives the same layout`, async () => {
    const a = await loadOk(name);
    const b = await loadOk(name);
    const first = layout(a.definition, a.view, o);
    const second = layout(b.definition, b.view, o);
    assertEquals(first.edges, second.edges);
    assertEquals(first.lanes, second.lanes);
    assertEquals(
      [...first.tiles.values()].map((t) => [t.id, t.x, t.y, t.h]),
      [...second.tiles.values()].map((t) => [t.id, t.x, t.y, t.h]),
    );
  });
}

const tiny = (stages: string) =>
  `schemaVersion: ${DEFINITION_SCHEMA_VERSION}
stages:
${stages}`;

/** A tiny definition as a factory's model definition file holds it. */
const tinyFile = (stages: string) => modelFile(tiny(stages));

Deno.test("layout: a stage's own status, its enter entry's, or its predecessor's names its lane", async () => {
  const loaded = await loadDefinition(
    modelPath("tiny"),
    tinyFile(`  - id: a
    initial: true
    tracker: { status: open }
    transitions: [{ name: go, to: b }]
  - id: b
    tracker:
      entries:
        - { on: enter, step: started, emoji: "🚧", summary: started, status: in_progress }
    transitions: [{ name: go, to: c }]
  - id: c
    transitions: [{ name: go, to: d }]
  - id: d
    terminal: true
    tracker: { status: closed }
`),
  );
  assert(loaded.ok, JSON.stringify(!loaded.ok && loaded.problems));
  const lanes = stageLanes(loaded.definition, loaded.view, ranks(loaded.view));
  assertEquals(Object.fromEntries(lanes), {
    a: "open",
    b: "in_progress",
    c: "in_progress",
    d: "closed",
  });
  const l = layout(loaded.definition, loaded.view);
  assertEquals(l.lanes.map((lane) => lane.label), [
    "OPEN",
    "IN PROGRESS",
    "CLOSED",
  ]);
  assertEquals(l.tiles.get("c")!.col, 1);
});

Deno.test("layout: a transition entry's status labels the entry, not its stage's lane", async () => {
  const loaded = await loadDefinition(
    modelPath("tiny"),
    tinyFile(`  - id: a
    initial: true
    tracker:
      status: open
    transitions: [{ name: go, to: b }]
  - id: b
    tracker:
      entries:
        - { on: { transition: go }, step: went, emoji: "🚧", summary: went, status: shipped }
    transitions: [{ name: go, to: c }]
  - id: c
    terminal: true
`),
  );
  assert(loaded.ok, JSON.stringify(!loaded.ok && loaded.problems));
  const lanes = stageLanes(loaded.definition, loaded.view, ranks(loaded.view));
  assertEquals(Object.fromEntries(lanes), { a: "open", b: "open", c: "open" });
});

Deno.test("layout: without statuses every stage is in one lane with no status", async () => {
  const loaded = await loadDefinition(
    modelPath("tiny"),
    tinyFile(`  - id: a
    initial: true
    transitions: [{ name: go, to: b }]
  - id: b
    terminal: true
`),
  );
  assert(loaded.ok);
  const l = layout(loaded.definition, loaded.view);
  assertEquals(l.lanes.map((lane) => [lane.key, lane.label]), [[
    "",
    "NO STATUS",
  ]]);
});

Deno.test("layout: ranks are the longest forward path, and loops are drawn", async () => {
  const loaded = await loadDefinition(
    modelPath("tiny"),
    tinyFile(`  - id: a
    initial: true
    transitions: [{ name: long, to: b }, { name: short, to: c }]
  - id: b
    transitions: [{ name: go, to: c }]
  - id: c
    transitions: [{ name: again, to: a }, { name: done, to: d }]
  - id: d
    terminal: true
`),
  );
  assert(loaded.ok);
  assertEquals(Object.fromEntries(ranks(loaded.view)), {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  });
  const l = layout(loaded.definition, loaded.view);
  const again = l.edges.find((e) => e.id === "c:stages.2.transitions.0")!;
  assertEquals(again.kind, "loop");
  assertEquals(again.to, "a");
});

Deno.test("layout: global transitions leave one ANY STAGE tile", async () => {
  const loaded = await loadDefinition(
    modelPath("tiny"),
    tinyFile(`  - id: a
    initial: true
    transitions: [{ name: go, to: b }]
  - id: b
    terminal: true
globalTransitions:
  - { name: abandon, to: b }
`),
  );
  assert(loaded.ok);
  const l = layout(loaded.definition, loaded.view);
  const any = l.tiles.get(ANY_ID)!;
  assertEquals(any.kind, "any");
  assertEquals(any.exits.map((e) => e.t.name), ["abandon"]);
  assertEquals(l.edges.filter((e) => e.kind === "global").map((e) => e.to), [
    "b",
  ]);
});

Deno.test("layout ten-stage (down): lanes side by side, flow down each lane, same grid as across", async () => {
  const { definition, view } = await loadOk("ten-stage");
  const across = layout(definition, view);
  const down = layout(definition, view, "down");
  assertEquals(down.orientation, "down");
  assertEquals(
    down.lanes.map((l) => l.key),
    ["open", "in_progress", "shipped"],
  );
  // Lanes are columns, left to right, each the graph's full height.
  for (let i = 1; i < down.lanes.length; i++) {
    assert(down.lanes[i].x >= down.lanes[i - 1].x + down.lanes[i - 1].w);
    assertEquals(down.lanes[i].y, down.lanes[0].y);
    assertEquals(down.lanes[i].h, down.lanes[0].h);
  }
  // A lane's stages stack down in flow order, all at one x.
  for (const t of down.tiles.values()) {
    const a = across.tiles.get(t.id)!;
    assertEquals([t.lane, t.col], [a.lane, a.col]);
    const next = [...down.tiles.values()].find((n) =>
      n.lane === t.lane && n.col === t.col + 1
    );
    if (next === undefined) continue;
    assertEquals(next.x, t.x);
    assert(next.y >= t.y + t.h, `${next.id} is below ${t.id}`);
  }
  // Narrower than across: three lanes, not seven stages, wide.
  assert(down.width < across.width, `${down.width} < ${across.width}`);
});

Deno.test("layout (down): a step to the next stage in the lane runs down the channel beside it", async () => {
  for (const name of EXAMPLES) {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view, "down");
    for (const e of l.edges) {
      const from = l.tiles.get(e.from)!, to = l.tiles.get(e.to)!;
      if (from.lane !== to.lane || to.col !== from.col + 1) continue;
      // Out of the port, down the channel, into the right side: no S.
      assert(e.points.length <= 4, `${name} ${e.id}: ${e.points.length}`);
      assertEquals(e.points.at(-1)!.x, to.x + to.w, `${name} ${e.id}`);
      // It never crosses its lane's column.
      assert(
        e.points.every((p) => p.x >= from.x + from.w),
        `${name} ${e.id} crosses its lane`,
      );
    }
  }
});

Deno.test("layout: down fits by width, across both ways, from 40% to 100%", () => {
  const pane = { width: 1008, height: 708 };
  assertEquals(
    fitOf({ orientation: "across", width: 2000, height: 500 }, pane),
    0.5,
  );
  assertEquals(
    fitOf({ orientation: "across", width: 500, height: 1400 }, pane),
    0.5,
  );
  assertEquals(
    fitOf({ orientation: "down", width: 500, height: 4000 }, pane),
    1,
  );
  assertEquals(
    fitOf({ orientation: "across", width: 9000, height: 500 }, pane),
    0.4,
  );
});

Deno.test("layout: a pane draws down below 75% across and back across only from 85%", () => {
  const pane = (width: number) => ({ width: width + 8, height: 2000 });
  const across = { width: 1000, height: 300 };
  const down = { width: 600, height: 1500 };
  assertEquals(DOWN_BELOW, 0.75);
  assertEquals(ACROSS_FROM, 0.85);
  // Across fits at 80%: it stays across.
  assertEquals(chooseOrientation(across, down, pane(800), "across"), "across");
  // At 70% it goes down, where it fits at 100%.
  assertEquals(chooseOrientation(across, down, pane(700), "across"), "down");
  // Widened back to 80%, it stays down; at 85% it goes back across.
  assertEquals(chooseOrientation(across, down, pane(800), "down"), "down");
  assertEquals(chooseOrientation(across, down, pane(850), "down"), "across");
  // Down no better than across: it stays across, however narrow.
  const wide = { width: 1000, height: 1500 };
  assertEquals(chooseOrientation(across, wide, pane(500), "across"), "across");
});

Deno.test("layout ten-stage: at 1440px beside the inspector it reads down at 75% or more", async () => {
  const { definition, view } = await loadOk("ten-stage");
  const across = layout(definition, view);
  const down = layout(definition, view, "down");
  // The canvas beside the 440px inspector on a 1440x900 window.
  const pane = { width: 1000, height: 700 };
  assertEquals(chooseOrientation(across, down, pane, "across"), "down");
  assert(fitOf(down, pane) >= DOWN_BELOW, `fit ${fitOf(down, pane)}`);
});
