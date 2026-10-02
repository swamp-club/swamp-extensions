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
import { parse as parseYaml } from "@std/yaml";
import { fakeSwamp } from "../../extensions/models/_lib/engine/fake_swamp.ts";
import {
  contextStore,
  loadRun,
} from "../../extensions/models/_lib/engine/run_store.ts";
import type { BoardCard } from "../../extensions/models/_lib/engine/studio_cards.ts";
import { model as workItem } from "../../extensions/models/engine/work_item.ts";
import {
  boardColumns,
  type BoardStage,
  cardHead,
  COLUMN_PAGE,
  durationText,
  isStale,
  NO_FILTER,
  refOtherThanKey,
  stageOrder,
} from "./board.ts";
import { layout } from "./layout.ts";
import { exampleText, loadOk } from "./test_support.ts";

function card(key: string, stage: string, extra: Partial<BoardCard> = {}) {
  return {
    key,
    title: null,
    trackerRef: null,
    status: "active",
    stage,
    cycle: 1,
    enteredAt: "2026-10-02T10:00:00.000Z",
    waiting: null,
    parked: [],
    pinnedDigest: "sha256:now",
    ...extra,
  } as BoardCard;
}

const STAGES: BoardStage[] = [
  { id: "plan", terminal: false },
  { id: "build", terminal: false },
  { id: "done", terminal: true },
];

const columns = (
  cards: BoardCard[],
  options: Partial<Parameters<typeof boardColumns>[2]> = {},
) =>
  boardColumns(STAGES, cards, {
    filter: NO_FILTER,
    currentDigest: "sha256:now",
    showFinished: false,
    ...options,
  });

Deno.test("board: the columns follow Design mode's order: by column, then lane", async () => {
  const loaded = await loadOk("build-swamp-extension");
  const drawn = layout(loaded.definition, loaded.view);
  const order = stageOrder(
    drawn,
    (id) =>
      loaded.definition.stages.find((s) => s.id === id)?.terminal === true,
  );
  assertEquals(
    order.map((s) => s.id).sort(),
    loaded.definition.stages.map((s) => s.id).sort(),
    "every stage, and no ANY STAGE tile",
  );
  const tiles = order.map((s) => drawn.tiles.get(s.id)!);
  for (let i = 1; i < tiles.length; i++) {
    const [a, b] = [tiles[i - 1], tiles[i]];
    assert(a.col < b.col || (a.col === b.col && a.lane <= b.lane), b.id);
  }
  const initial = loaded.definition.stages.find((s) => s.initial)!.id;
  assertEquals(order[0].id, initial);
  for (const s of order) {
    assertEquals(
      s.terminal,
      loaded.definition.stages.find((d) => d.id === s.id)?.terminal === true,
    );
  }
});

Deno.test("board: each card is in its stage's column, longest in the stage first", () => {
  const cols = columns([
    card("b", "build", { enteredAt: "2026-10-02T12:00:00.000Z" }),
    card("a", "build", { enteredAt: "2026-10-02T09:00:00.000Z" }),
    card("u", "build", { enteredAt: null }),
    card("p", "plan"),
  ]);
  assertEquals(cols.map((c) => [c.stage, c.cards.map((x) => x.key)]), [
    ["plan", ["p"]],
    ["build", ["a", "b", "u"]],
    ["done", []],
  ]);
});

Deno.test("board: finished work is counted, and shown only when asked", () => {
  const cards = [
    card("d1", "done", { status: "terminal" }),
    card("d2", "done", { status: "terminal" }),
  ];
  const hidden = columns(cards).find((c) => c.stage === "done")!;
  assertEquals([hidden.total, hidden.cards.length], [2, 0]);
  const shown = columns(cards, { showFinished: true })
    .find((c) => c.stage === "done")!;
  assertEquals(shown.cards.map((c) => c.key), ["d1", "d2"]);
});

Deno.test("board: a stage the current definition lacks gets a column at the end", () => {
  const cols = columns([card("x", "old-review"), card("p", "plan")]);
  const last = cols.at(-1)!;
  assertEquals([last.stage, last.known, last.terminal], [
    "old-review",
    false,
    false,
  ]);
  assertEquals(last.cards.map((c) => c.key), ["x"]);
});

Deno.test("board: with no definition loaded, the columns are the cards' stages and none is called unknown", () => {
  const cols = boardColumns([], [card("a", "build"), card("b", "plan")], {
    filter: NO_FILTER,
    currentDigest: null,
    showFinished: false,
  });
  assertEquals(cols.map((c) => [c.stage, c.known]), [
    ["build", true],
    ["plan", true],
  ]);
});

Deno.test("board: the filters keep waiting, parked or stale work items, and text matches key or title", () => {
  const cards = [
    card("team-wait", "plan", {
      waiting: { since: "2026-10-02T10:00:00.000Z", exits: [] },
    }),
    card("team-park", "plan", {
      parked: [{ kind: "dispatch-cap", count: 3, limit: 3, granted: 0 }],
    }),
    card("team-old", "plan", { pinnedDigest: "sha256:before" }),
    card("team-plain", "plan", { title: "Add a Board view" }),
  ];
  const keys = (filter: Partial<typeof NO_FILTER>) =>
    columns(cards, { filter: { ...NO_FILTER, ...filter } })[0].cards.map((c) =>
      c.key
    );
  assertEquals(keys({ waiting: true }), ["team-wait"]);
  assertEquals(keys({ parked: true }), ["team-park"]);
  assertEquals(keys({ stalePin: true }), ["team-old"]);
  assertEquals(keys({ text: "board VIEW" }), ["team-plain"]);
  assertEquals(keys({ text: "PARK" }), ["team-park"]);
  assertEquals(keys({ waiting: true, parked: true }), []);
  assertEquals(keys({}).length, 4);
});

Deno.test("board: a column shows a page of cards, and more when asked, with its full count", () => {
  const many = Array.from(
    { length: COLUMN_PAGE + 7 },
    (_, i) => card(`k${String(i).padStart(3, "0")}`, "plan"),
  );
  const first = columns(many)[0];
  assertEquals([first.total, first.cards.length], [
    COLUMN_PAGE + 7,
    COLUMN_PAGE,
  ]);
  const more = columns(many, { shown: { plan: COLUMN_PAGE * 2 } })[0];
  assertEquals(more.cards.length, COLUMN_PAGE + 7);
});

Deno.test("board: durations read as days and hours, hours and minutes, or minutes", () => {
  const m = 60000;
  assertEquals(durationText(0), "<1m");
  assertEquals(durationText(-5 * m), "<1m");
  assertEquals(durationText(45 * m), "45m");
  assertEquals(durationText(125 * m), "2h 5m");
  assertEquals(durationText(120 * m), "2h");
  assertEquals(durationText((3 * 1440 + 4 * 60 + 9) * m), "3d 4h");
  assertEquals(durationText(2 * 1440 * m), "2d");
});

Deno.test("board: a work item started on the definition the page shows is not stale, and is once the definition changes", async () => {
  const name = "starter";
  const text = await exampleText(name);
  const { definition } = (parseYaml(text) as {
    globalArguments: { definition: unknown };
  }).globalArguments;
  const swamp = fakeSwamp();
  swamp.factory(name, definition);
  const start = workItem.methods.start;
  await start.execute(
    start.arguments.parse({ factory: name }),
    swamp.context("starter-one-abcd"),
  );
  const run = await loadRun(contextStore(swamp.context("starter-one-abcd")));
  assert(run !== null);
  const pinned = card(run.key, run.stage, {
    pinnedDigest: run.definition.digest,
  });
  const page = await loadOk(name, text);
  assert(!isStale(pinned, page.view.digest), "the page digests as the pin");
  const edited = await loadOk(
    name,
    text.replace(
      "        initial: true\n",
      "        initial: true\n        maxCycles: 9\n",
    ),
  );
  assert(edited.view.digest !== page.view.digest, "the edit changes it");
  assert(isStale(pinned, edited.view.digest));
  assert(!isStale(pinned, null), "no definition shown: nothing is stale");
});

// Keys are slugs of the whole title on records written before short keys:
// 50 to 64 characters with no spaces.
const LONG_KEY =
  "board-using-stagecraft-organizing-shipping-blog-posts-every-vwd4";

Deno.test("board: a tracker ref that is the key is not shown again; another is", () => {
  assertEquals(LONG_KEY.length, 64);
  assertEquals(refOtherThanKey(LONG_KEY, LONG_KEY), null);
  assertEquals(refOtherThanKey("blog-12", "blog-12"), null);
  assertEquals(refOtherThanKey("abc-12", "ABC-12"), "ABC-12");
  assertEquals(refOtherThanKey("abc-12", null), null);
  assertEquals(
    cardHead(card(LONG_KEY, "plan", {
      title: "Using stagecraft for organizing and shipping blog posts",
      trackerRef: LONG_KEY,
    })),
    { key: LONG_KEY, ref: null },
  );
});

Deno.test("board: two work items on one Linear issue are told apart by their keys", () => {
  const on = (key: string) =>
    cardHead(card(key, "plan", { title: "Add a list", trackerRef: "ABC-12" }));
  assertEquals(on("abc-12"), { key: "abc-12", ref: "ABC-12" });
  assertEquals(on("abc-12-2"), { key: "abc-12-2", ref: "ABC-12" });
});

Deno.test("board: an untitled card shows its key as the title, not in its head", () => {
  assertEquals(
    cardHead(card("blog-12", "plan", { trackerRef: "blog-12" })),
    { key: "", ref: null },
  );
});
