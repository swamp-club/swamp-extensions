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
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  findRedactions,
  type Frame,
  frameBoxes,
  type OcrWord,
  storyboardArgs,
} from "./screen.ts";

const rect = { x: 0, y: 0, width: 1920, height: 1080 };
const frameSize = { width: 1920, height: 1080 };

function word(text: string, left: number, top: number, width = 400): OcrWord {
  return { text, line: text, left, top, width, height: 16 };
}

function frame(at: number, words: OcrWord[]): Frame {
  return { at, path: "", text: words.map((w) => w.text).join("\n"), words };
}

const KEY_A = "ghp_" + "a".repeat(36);
const KEY_B = "ghp_" + "b".repeat(36);

Deno.test("findRedactions: stacked secrets on close lines are both covered", () => {
  // two tokens 18px apart: their padded boxes overlap, so they merge into
  // one box covering both, never one box sized for the first
  const frames = [
    frame(0.5, []),
    frame(5, [word(KEY_A, 100, 100), word(KEY_B, 100, 118)]),
  ];
  const r = findRedactions(frames, rect, 1, 60, [], frameSize);
  assertEquals(r.length, 1);
  assert(r[0].y <= 100 - 6 && r[0].y + r[0].height >= 118 + 16 + 6);
});

Deno.test("findRedactions: a longer secret at the same spot widens the box", () => {
  const frames = [
    frame(0.5, [word(KEY_A, 100, 100, 200)]),
    frame(5, [word(KEY_B, 100, 100, 600)]),
  ];
  const r = findRedactions(frames, rect, 1, 60, [], frameSize);
  assertEquals(r.length, 1);
  assert(r[0].x + r[0].width >= 100 + 600 + 6);
  assertEquals([r[0].start, r[0].end], [0, 60]);
});

Deno.test("findRedactions: separate secrets far apart keep their own boxes", () => {
  const frames = [frame(0.5, [word(KEY_A, 100, 100), word(KEY_B, 100, 600)])];
  assertEquals(findRedactions(frames, rect, 1, 60, [], frameSize).length, 2);
});

Deno.test("findRedactions: boxes at the frame edge are clamped inside it", () => {
  const frames = [frame(0.5, [word(KEY_A, 1700, 1070, 400)])];
  const [r] = findRedactions(frames, rect, 1, 60, [], frameSize);
  assert(r.x + r.width <= 1920 && r.y + r.height <= 1080, JSON.stringify(r));
  assertEquals(r.x, 1694);
  assertEquals(r.width % 2, 0);
});

Deno.test("storyboard tiles pixelate the credentials showing in them", () => {
  const r = [{
    x: 100,
    y: 120,
    width: 200,
    height: 30,
    start: 0,
    end: 10,
    kind: "aws-key",
  }];
  const rect = { x: 0, y: 20, width: 1920, height: 1040 };
  // at 5s the box shows, mapped into the 2x frame; at 20s it is gone
  assertEquals(frameBoxes(5, r, rect, 2), [{
    x: 200,
    y: 200,
    width: 400,
    height: 60,
  }]);
  assertEquals(frameBoxes(20, r, rect, 2), []);
  const args = storyboardArgs(
    [frame(5, []), frame(20, [])],
    "/o/sb.png",
    (f) => frameBoxes(f.at, r, rect, 2),
  );
  const graph = args[args.indexOf("-filter_complex") + 1];
  assertStringIncludes(graph, "[0:v]split[s0p0a][s0p0b]");
  assertStringIncludes(graph, "crop=400:60:200:200");
  assertStringIncludes(graph, "[1:v]null[s1p]");
  assertStringIncludes(graph, "[s0p0]scale=640:360");
});

Deno.test("findRedactions: a secret that scrolls is covered across the band it crossed", () => {
  const frames = [
    frame(5, [word(KEY_A, 100, 500)]),
    frame(10, [word(KEY_A, 100, 300)]),
  ];
  const r = findRedactions(frames, rect, 1, 60, [], frameSize);
  // one box covers both positions and everything between, from 5s to 10s
  const band = r.find((b) => b.y <= 300 - 6 && b.y + b.height >= 500 + 16 + 6)!;
  assert(band, JSON.stringify(r));
  assert(band.start <= 5 && band.end >= 10);
});
