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

import { assert, assertEquals } from "@std/assert";
import {
  ANY_ID,
  type EdgeGeom,
  layout,
  type Point,
  ranks,
  stageLanes,
} from "./layout.ts";
import { loadDefinition } from "./model.ts";
import { EXAMPLES, loadOk } from "./test_support.ts";

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

for (const name of EXAMPLES) {
  Deno.test(`layout ${name}: no two edges overlap`, async () => {
    const { definition, view } = await loadOk(name);
    const all = segments(layout(definition, view).edges);
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

  Deno.test(`layout ${name}: no edge passes through a tile`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view);
    for (const s of segments(l.edges)) {
      for (const t of l.tiles.values()) {
        assert(!crosses(s, t), `${s.edge} passes through ${t.id}`);
      }
    }
  });

  Deno.test(`layout ${name}: every edge has a port and an entry of its own`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view);
    const starts = new Set(l.edges.map((e) => key(e.points[0])));
    const ends = new Set(l.edges.map((e) => key(e.points.at(-1)!)));
    assertEquals(starts.size, l.edges.length);
    assertEquals(ends.size, l.edges.length);
    for (const e of l.edges) {
      const to = l.tiles.get(e.to)!;
      const end = e.points.at(-1)!;
      assertEquals(end.x, to.x, `${e.id} ends on its target's left side`);
      assert(end.y > to.y && end.y < to.y + to.h, `${e.id} enters ${e.to}`);
      const from = l.tiles.get(e.from)!;
      assertEquals(e.points[0].x, from.x + from.w);
    }
  });

  Deno.test(`layout ${name}: one edge per transition, one exit per transition`, async () => {
    const { definition, view } = await loadOk(name);
    const l = layout(definition, view);
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

  Deno.test(`layout ${name}: the same definition gives the same layout`, async () => {
    const a = await loadOk(name);
    const b = await loadOk(name);
    const first = layout(a.definition, a.view);
    const second = layout(b.definition, b.view);
    assertEquals(first.edges, second.edges);
    assertEquals(first.lanes, second.lanes);
    assertEquals(
      [...first.tiles.values()].map((t) => [t.id, t.x, t.y, t.h]),
      [...second.tiles.values()].map((t) => [t.id, t.x, t.y, t.h]),
    );
  });
}

const tiny = (stages: string) =>
  `schemaVersion: 1
name: tiny
stages:
${stages}`;

Deno.test("layout: a stage's own status, its enter entry's, or its predecessor's names its lane", async () => {
  const loaded = await loadDefinition(
    "factories/tiny.yaml",
    tiny(`  - id: a
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

Deno.test("layout: without statuses every stage is in one lane with no status", async () => {
  const loaded = await loadDefinition(
    "factories/tiny.yaml",
    tiny(`  - id: a
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
    "factories/tiny.yaml",
    tiny(`  - id: a
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
    "factories/tiny.yaml",
    tiny(`  - id: a
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
