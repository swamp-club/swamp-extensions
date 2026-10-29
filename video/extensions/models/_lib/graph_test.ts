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
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  buildGraph,
  chunkRate,
  encoderArgs,
  measureArgs,
  parseLoudness,
  type RenderPlan,
  safeFilterText,
  selectExpr,
  sumExpr,
} from "./graph.ts";

function depth(expr: string): number {
  let d = 0, max = 0;
  for (const c of expr) {
    if (c === "(") max = Math.max(max, ++d);
    if (c === ")") d--;
  }
  return max;
}

Deno.test("sumExpr nests as a balanced tree, not a long flat chain", () => {
  const terms = Array.from({ length: 1024 }, (_, i) => `t${i}`);
  assertEquals(depth(sumExpr(terms)), 10);
  assertEquals(sumExpr(["a"]), "a");
});

Deno.test("selectExpr keeps every speed-th frame of a fast span", () => {
  assertEquals(
    selectExpr([[1, 2, 1], [2, 10, 4]], 30),
    "(gte(t,0.9999)*lt(t,1.9999))+(gte(t,1.9999)*lt(t,9.9999)*not(mod(round((t-2.0000)*30),4)))",
  );
});

const plan: RenderPlan = {
  recording: "/r/take.mkv",
  speechTrack: 1,
  fps: 30,
  width: 1920,
  height: 1080,
  spans: [[0, 5, 1], [5, 45, 10], [45, 50, 1]],
  redactions: [],
  cards: {},
  voiceCleanup: true,
  loudnessTarget: -14,
  burn: false,
  captions: "captions.srt",
  font: "Noto Sans",
};

Deno.test("the voice track is muted under fast-forwards and cleaned when asked", () => {
  const g = buildGraph({ ...plan, bed: "/m/bed.mp3" });
  assertStringIncludes(g.graph, "[0:a:1]aresample");
  assertStringIncludes(g.graph, "volume=0:enable='between(t,5.0000,45.0000)'");
  assertStringIncludes(g.graph, "highpass=f=80,afftdn");
  assertStringIncludes(g.graph, "[bed]");
  assert(g.inputs.includes("-stream_loop"));
  assertEquals(g.duration, 14);
  assertEquals(g.videoBurned, undefined);
});

Deno.test("two-pass loudness: measure, parse, apply", () => {
  const args = measureArgs(plan);
  assertStringIncludes(args.join(" "), "print_format=json");
  assert(args.includes("-vn"));
  const m = parseLoudness(
    'noise {"input_i" : "-20.0", "input_tp" : "-3.0", "input_lra" : "5.0", "input_thresh" : "-30.0", "target_offset" : "0.2"} tail',
  );
  assertEquals(m.input_i, "-20.0");
  assertStringIncludes(
    buildGraph({ ...plan, measured: m }).graph,
    "measured_I=-20.0",
  );
});

Deno.test("each encoder gets its codec and quality flag", () => {
  assertEquals(encoderArgs("libx264", 18).args.slice(0, 6), [
    "-c:v",
    "libx264",
    "-preset",
    "faster",
    "-crf",
    "18",
  ]);
  assertEquals(encoderArgs("qsv", 20).args.slice(0, 4), [
    "-c:v",
    "h264_qsv",
    "-global_quality",
    "20",
  ]);
  assertEquals(encoderArgs("nvenc", 21).args.slice(0, 2), [
    "-c:v",
    "h264_nvenc",
  ]);
  assertEquals(encoderArgs("vaapi", 22).upload, "format=nv12,hwupload");
});

Deno.test("an edit list that keeps nothing fails clearly", () => {
  assertThrows(
    () => buildGraph({ ...plan, spans: [] }),
    Error,
    "keeps nothing",
  );
});

Deno.test("audio chunks match frames exactly at 29.97 fps", () => {
  assertEquals(chunkRate(30000 / 1001), 60000);
  assertEquals(chunkRate(30), 48000);
  const g = buildGraph({ ...plan, fps: 30000 / 1001 });
  assertStringIncludes(g.graph, "aresample=60000:async=1");
  assertStringIncludes(g.graph, "asetnsamples=n=2002:p=0");
});

Deno.test("text that would break out of a quoted filter option is refused", () => {
  assertThrows(
    () => buildGraph({ ...plan, font: "Bob's Font" }),
    Error,
    "font",
  );
  assertEquals(safeFilterText("Noto Sans", "font"), "Noto Sans");
});
