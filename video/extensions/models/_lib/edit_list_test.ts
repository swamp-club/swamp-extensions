// Copyright (C) 2026 Elder Swamp Club, Inc.
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

import {
  assert,
  assertAlmostEquals,
  assertEquals,
} from "jsr:@std/assert@1.0.19";
import {
  applyRetakes,
  buildItems,
  DEFAULT_SETTINGS,
  findQuote,
  type Item,
  keepSpans,
  outputStarts,
  pyFixed,
  pyRound,
  type Span,
  spokenRetakes,
  type Word,
} from "./edit_list.ts";
import { applyEditFile, writeEditFile } from "./edit_file.ts";
import { buildSrt } from "./srt.ts";
import { opcodes } from "./sequence_match.ts";

// Golden output from demo-polish, written by scripts/gen_parity_fixtures.py.
interface Fixture {
  segments: Word[][];
  duration: number;
  fps: number;
  maxPause: number;
  fastMin: number;
  db: number[] | null;
  built: Item[];
  editTxt: string;
  editedTxt: string;
  applied: Item[];
  spans: Span[];
  starts: number[];
  total: number;
  srt: string;
  shift: number;
}

const PARITY_DIR = new URL("../../../testdata/parity/", import.meta.url);

function fixtures(): [string, Fixture][] {
  const out: [string, Fixture][] = [];
  for (const entry of Deno.readDirSync(PARITY_DIR)) {
    if (!entry.name.endsWith(".json")) continue;
    out.push([
      entry.name,
      JSON.parse(Deno.readTextFileSync(new URL(entry.name, PARITY_DIR))),
    ]);
  }
  return out.sort(([a], [b]) => a.localeCompare(b));
}

const plain = (items: Item[]) =>
  items.map(({ kind, token, s, e, keep, line, text, speed }) => ({
    kind,
    token,
    s,
    e,
    keep,
    line,
    text,
    speed,
  }));

for (const [name, fx] of fixtures()) {
  Deno.test(`parity with demo-polish: ${name}`, () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      maxPause: fx.maxPause,
      fastMin: fx.fastMin,
    };
    const items = buildItems(fx.segments, fx.duration, settings);
    assertEquals(plain(items), fx.built, "build_items");
    assertEquals(writeEditFile("take.mkv", items, fx.maxPause), fx.editTxt);
    applyEditFile(fx.editedTxt, items, settings);
    assertEquals(plain(items), fx.applied, "apply_edit_file");
    const spans = keepSpans(items, fx.fps, fx.db ?? undefined);
    assertEquals(spans, fx.spans, "keep_spans");
    const { starts, total } = outputStarts(spans, fx.fps);
    assertEquals(starts.length, fx.starts.length);
    starts.forEach((s, i) => assertAlmostEquals(s, fx.starts[i], 1e-9));
    assertAlmostEquals(total, fx.total, 1e-9);
    assertEquals(buildSrt(items, spans, fx.fps, fx.shift), fx.srt, "srt");
  });
}

Deno.test("pyRound rounds half to even like Python", () => {
  assertEquals([0.5, 1.5, 2.5, -0.5, 2.4, 2.6].map(pyRound), [
    0,
    2,
    2,
    -0,
    2,
    3,
  ]);
  assertEquals(pyFixed(2.25, 1), "2.2");
  assertEquals(pyFixed(2.35, 1), "2.4"); // 2.35 is just above .35 in binary
});

Deno.test("opcodes match difflib on a spelling fix and a deletion", () => {
  assertEquals(
    opcodes(["a", "Cooper", "Netties", "b"], ["a", "Kubernetes", "b"]),
    [
      ["equal", 0, 1, 0, 1],
      ["replace", 1, 3, 1, 2],
      ["equal", 3, 4, 2, 3],
    ],
  );
  assertEquals(opcodes(["x", "y", "z"], ["x", "z"]), [
    ["equal", 0, 1, 0, 1],
    ["delete", 1, 2, 1, 1],
    ["equal", 2, 3, 1, 2],
  ]);
});

function take(words: [string, number, number][]): Word[][] {
  return [words.map(([w, s, e]) => ({ w: " " + w, s, e }))];
}

Deno.test("idle-screen waits race faster than ordinary waits", () => {
  const segs = take([["one.", 0.1, 0.5], ["two.", 60.5, 61.0], [
    "three.",
    121.0,
    121.5,
  ]]);
  const items = buildItems(segs, 122, DEFAULT_SETTINGS, [[0.5, 60.5]]);
  const waits = items.filter((it) => it.kind === "pause" && it.keep);
  assertEquals(waits.map((w) => w.speed), [60, 15]);
  assert(waits[0].idle);
});

Deno.test("a retake marker cuts the abandoned sentence and the marker", () => {
  const segs = take([
    ["Good", 0.0, 0.3],
    ["start.", 0.35, 0.7],
    ["This", 1.0, 1.2],
    ["went", 1.25, 1.5],
    ["wrong", 1.55, 1.8],
    ["retake", 2.5, 2.9],
    ["This", 3.2, 3.4],
    ["works.", 3.45, 3.8],
  ]);
  const items = buildItems(segs, 4, DEFAULT_SETTINGS);
  applyRetakes(items, spokenRetakes(items));
  const kept = items.filter((it) => it.kind === "word" && it.keep).map((it) =>
    it.token
  );
  assertEquals(kept, ["Good", "start.", "This", "works."]);
});

Deno.test("findQuote matches normalised words and occurrences", () => {
  const items = buildItems(
    take([["Hello,", 0, 0.2], ["world.", 0.3, 0.5], ["hello", 0.6, 0.8], [
      "world!",
      0.9,
      1.1,
    ]]),
    1.2,
  );
  assertEquals(findQuote(items, "hello world"), [0, 1]);
  assertEquals(findQuote(items, "Hello, world", 2), [2, 3]);
  assertEquals(findQuote(items, "nope"), undefined);
});

Deno.test("findQuote matches the words of a multi-word caption fix", () => {
  const items = buildItems(
    take([["Cooper", 0, 0.2], ["Netties", 0.3, 0.5], ["rocks.", 0.6, 0.8]]),
    1,
  );
  items[0].text = "New York";
  items[1].text = "";
  assertEquals(findQuote(items, "new york rocks"), [0, 2]);
});

Deno.test("edit.txt: switching a wait between ~ and >> never misaligns the words", () => {
  const items = buildItems(
    take([["Wait", 0, 0.3], ["here.", 0.35, 0.6], ["Now", 30.0, 30.2], [
      "go.",
      30.25,
      30.5,
    ]]),
    31,
  );
  const file = writeEditFile("t.mkv", items, 1.5)
    // slow the wait down and delete "here." on the same line
    .replace(">>29.4s", "~29.4s").replace(" here.", "");
  applyEditFile(file, items, DEFAULT_SETTINGS);
  const wait = items.find((i) => i.kind === "pause" && i.e > 29)!;
  assertEquals([wait.keep, wait.speed], [true, 1]);
  assertEquals(items.find((i) => i.token === "here.")!.keep, false);
  assert(
    !items.some((i) => i.text.includes("~")),
    "no wait token in a caption",
  );
});

Deno.test("edit.txt: deleting a wait next to a retyped word cuts the wait", () => {
  const items = buildItems(
    take([["Okay.", 0, 0.3], ["Now", 30.0, 30.2], ["it", 30.25, 30.4], [
      "works.",
      30.45,
      30.7,
    ]]),
    31,
  );
  const file = writeEditFile("t.mkv", items, 1.5);
  assert(file.includes(">>29.7s Now it works."), file);
  applyEditFile(
    file.replace(">>29.7s Now it works.", "So it works."),
    items,
    DEFAULT_SETTINGS,
  );
  const wait = items.find((i) => i.kind === "pause" && i.e > 29)!;
  assertEquals(wait.keep, false);
  assertEquals(items.find((i) => i.token === "Now")!.text, "So");
});
