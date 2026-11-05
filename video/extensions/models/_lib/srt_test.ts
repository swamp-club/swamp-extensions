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

import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1.0.19";
import type { Item, Span } from "./edit_list.ts";
import { buildSrt, joinSrt } from "./srt.ts";

const word = (text: string, s: number, e: number): Item =>
  ({ kind: "word", keep: true, text, s, e }) as Item;

// Two seconds kept from each: raw 0-2 and raw 10-12.
const one = {
  items: [word("first", 0.5, 1), word("take.", 1, 1.5)],
  spans: [[0, 2, 1]] as Span[],
  fps: 30,
};
const two = {
  items: [word("second", 10.5, 11), word("take.", 11, 11.5)],
  spans: [[10, 12, 1]] as Span[],
  fps: 30,
};
const times = (srt: string) =>
  [...srt.matchAll(/^.* --> .*$/gm)].map((m) => m[0]);

Deno.test("joinSrt: one take is exactly buildSrt", () => {
  assertEquals(
    joinSrt([{ ...one, start: 0 }], 3.8, 1),
    buildSrt(one.items, one.spans, one.fps, 3.8, 1),
  );
});

Deno.test("joinSrt: a later take's cues move to its start, numbered straight through", () => {
  const srt = joinSrt([{ ...one, start: 0 }, { ...two, start: 2 }]);
  assertEquals(times(srt), [
    "00:00:00,500 --> 00:00:01,800",
    "00:00:02,500 --> 00:00:03,800",
  ]);
  assertStringIncludes(srt, "1\n00:00:00,500");
  assertStringIncludes(srt, "2\n00:00:02,500");
  // Each take starts a sentence of its own.
  assertStringIncludes(srt, "First take.");
  assertStringIncludes(srt, "Second take.");
});

Deno.test("joinSrt: an intro shifts every take", () => {
  assertEquals(
    times(joinSrt([{ ...one, start: 0 }, { ...two, start: 2 }], 3.8)),
    [
      "00:00:04,300 --> 00:00:05,600",
      "00:00:06,300 --> 00:00:07,600",
    ],
  );
});

Deno.test("joinSrt: a take's last cue stops where the next take's first starts", () => {
  const talky = {
    ...two,
    items: [word("second", 10, 10.5)],
  };
  // First's last word ends at 1.5s; the next starts at 1.6s.
  assertEquals(
    times(joinSrt([{ ...one, start: 0 }, { ...talky, start: 1.6 }])),
    [
      "00:00:00,500 --> 00:00:01,600",
      "00:00:01,600 --> 00:00:02,400",
    ],
  );
});

Deno.test("joinSrt: a crossfade's overlap keeps the cues in order", () => {
  const talky = { ...two, items: [word("second", 10, 10.5)] };
  // The next take starts at 0.9s, before the first's cue at 1.2s.
  const late = { ...one, items: [word("first", 1.2, 1.5)] };
  assertEquals(
    times(joinSrt([{ ...late, start: 0 }, { ...talky, start: 0.9 }])),
    [
      "00:00:00,900 --> 00:00:01,200",
      "00:00:01,200 --> 00:00:01,800",
    ],
  );
});

Deno.test("joinSrt: only the first take has a hook; later cues shift past the intro", () => {
  // A hook ending at 1s, between the first take's words.
  const srt = joinSrt(
    [{ ...one, start: 0 }, { ...two, start: 2 }],
    3.8,
    1,
  );
  assertEquals(times(srt), [
    "00:00:00,500 --> 00:00:01,000",
    "00:00:04,800 --> 00:00:05,600",
    "00:00:06,300 --> 00:00:07,600",
  ]);
});
