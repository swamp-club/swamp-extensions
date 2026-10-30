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
  bedStretches,
  buildGraph,
  type BuiltGraph,
  chunkRate,
  encoderArgs,
  measureArgs,
  opening,
  parseLoudness,
  type RenderPlan,
  safeFilterText,
  selectExpr,
  sumExpr,
} from "./graph.ts";
import { fastEdgeAir } from "./edit_list.ts";

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

Deno.test("the voice mute starts after the air beside a kept word, not on the word's end", () => {
  const g = buildGraph({ ...plan, spans: fastEdgeAir(plan.spans, plan.fps) });
  assertStringIncludes(g.graph, "volume=0:enable='between(t,5.2667,44.7333)'");
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

Deno.test("still overlays hold for their window, as they always have", () => {
  const g = buildGraph({
    ...plan,
    cards: {
      fastForwardBadge: { path: "/c/badge.png" },
      lowerThird: { path: "/c/lt.png", seconds: 6, at: 1.5 },
    },
  });
  assertEquals(g.inputs.slice(2), [
    "-loop",
    "1",
    "-i",
    "/c/badge.png",
    "-loop",
    "1",
    "-i",
    "/c/lt.png",
  ]);
  assertStringIncludes(
    g.graph,
    "[1:v]scale=1920:1080,format=rgba[badge];\n" +
      "[vsel][badge]overlay=0:0:shortest=1:enable='between(t,5.0000,9.0000)'[vbadge]",
  );
  assertStringIncludes(
    g.graph,
    "[2:v]scale=1920:1080,format=rgba[lt];\n" +
      "[vbadge][lt]overlay=0:0:shortest=1:enable='between(t,1.5,7.5)'[vlt]",
  );
});

Deno.test("an animated lower third plays once from at; an animated badge loops", () => {
  const g = buildGraph({
    ...plan,
    cards: {
      intro: { path: "/c/intro.mp4", seconds: 5 },
      fastForwardBadge: { path: "/c/badge.webm" },
      lowerThird: { path: "/c/lt.mov", seconds: 6, at: 1.5 },
    },
  });
  // WebM keeps its alpha only through libvpx; ProRes needs no decoder flag.
  assertEquals(g.inputs.slice(2, 9), [
    "-stream_loop",
    "-1",
    "-c:v",
    "libvpx-vp9",
    "-i",
    "/c/badge.webm",
    "-i",
  ]);
  assertEquals(g.inputs[9], "/c/lt.mov");
  assertStringIncludes(
    g.graph,
    "[1:v]fps=30,scale=1920:1080,format=rgba[badge];\n" +
      "[vsel][badge]overlay=0:0:shortest=1:enable='between(t,5.0000,9.0000)'[vbadge]",
  );
  // `at` is take time: overlays go on before the intro is joined, so the
  // intro's length doesn't move it.
  assertStringIncludes(
    g.graph,
    "[2:v]fps=30,scale=1920:1080,format=rgba,setpts=PTS-STARTPTS+1.5/TB[lt];\n" +
      "[vbadge][lt]overlay=0:0:eof_action=pass:enable='between(t,1.5,7.5)'[vlt]",
  );
});

const bedOf = (graph: string) => graph.match(/volume='0\.3\*\(([^']*)\)'/)?.[1];

Deno.test("the bed is unchanged by default: every fast-forward, 0.4s fades", () => {
  // Captured from the renderer before the bed settings existed.
  assertEquals(
    bedOf(buildGraph({ ...plan, bed: "/m/bed.mp3" }).graph),
    "clip((t-5.000)/0.4,0,1)*clip((9.000-t)/0.4,0,1)",
  );
  assertEquals(
    bedOf(
      buildGraph({
        ...plan,
        bed: "/m/bed.mp3",
        cards: { intro: { path: "/c/intro.png", seconds: 4.5 } },
      }).graph,
    ),
    "clip((t-8.800)/0.4,0,1)*clip((12.800-t)/0.4,0,1)",
  );
});

// A 1s idle fast-forward (5-6 out) and a 4s one (11-15 out).
const twoWaits: RenderPlan = {
  ...plan,
  bed: "/m/bed.mp3",
  spans: [[0, 5, 1], [5, 25, 20], [25, 30, 1], [30, 70, 10], [70, 75, 1]],
  cards: {
    intro: { path: "/c/intro.png", seconds: 4.5 },
    fastForwardBadge: { path: "/c/badge.png" },
  },
};

Deno.test("fast-forwards under bedMin stay sped up but get no bed", () => {
  const all = buildGraph(twoWaits);
  const g = buildGraph({ ...twoWaits, bedMin: 2, bedFade: 1 });
  // Only the 4s wait, shifted past the intro (3.8s), with the 1s fade.
  assertEquals(
    bedOf(g.graph),
    "clip((t-14.800)/1,0,1)*clip((18.800-t)/1,0,1)",
  );
  // The cut, clock, badge and voice mute still cover both.
  assertStringIncludes(
    g.graph,
    "volume=0:enable='(between(t,5.0000,25.0000))+(between(t,30.0000,70.0000))'",
  );
  assertStringIncludes(g.graph, "between(t,5.0000,6.0000)");
  assertEquals(g.duration, all.duration);
  assertEquals(
    g.graph.replace(/volume='0\.3[^']*'/, ""),
    all.graph.replace(/volume='0\.3[^']*'/, ""),
  );
});

Deno.test("when no fast-forward reaches bedMin the bed is left out", () => {
  const all = buildGraph(twoWaits);
  const g = buildGraph({ ...twoWaits, bedMin: 10 });
  assert(!g.graph.includes("[bed]"));
  assert(!g.inputs.includes("/m/bed.mp3"));
  assertEquals(g.duration, all.duration);
});

// Two 1s fast-forwards half a second apart (5-6 and 6.5-7.5 out).
const closeWaits: RenderPlan = {
  ...plan,
  bed: "/m/bed.mp3",
  spans: [[0, 5, 1], [5, 15, 10], [15, 15.5, 1], [15.5, 25.5, 10], [
    25.5,
    30,
    1,
  ]],
};

Deno.test("close fast-forwards share one bed, and count together for bedMin", () => {
  assertEquals(
    bedOf(buildGraph(closeWaits).graph),
    "(clip((t-5.000)/0.4,0,1)*clip((6.000-t)/0.4,0,1))+" +
      "(clip((t-6.500)/0.4,0,1)*clip((7.500-t)/0.4,0,1))",
  );
  assertEquals(
    bedOf(buildGraph({ ...closeWaits, bedMerge: 1 }).graph),
    "clip((t-5.000)/0.4,0,1)*clip((7.500-t)/0.4,0,1)",
  );
  assert(!buildGraph({ ...closeWaits, bedMin: 2 }).graph.includes("[bed]"));
  assertEquals(
    bedOf(buildGraph({ ...closeWaits, bedMin: 2, bedMerge: 1 }).graph),
    "clip((t-5.000)/0.4,0,1)*clip((7.500-t)/0.4,0,1)",
  );
});

Deno.test("bedStretches: a gap equal to merge stays apart; a window equal to min plays", () => {
  const fast = [
    { span: [0, 4, 2] as [number, number, number], i: 0 },
    { span: [10, 14, 2] as [number, number, number], i: 2 },
  ];
  // Out: 0-2, then 3-5 (a 1s gap).
  assertEquals(bedStretches(fast, [0, 2, 3], 0, 1, 2), [[0, 2], [3, 5]]);
  assertEquals(bedStretches(fast, [0, 2, 3], 0, 1.01, 0), [[0, 5]]);
  assertEquals(bedStretches(fast, [0, 2, 3], 0, 0, 2.01), []);
});

// The renderer's output for these plans was captured before cold opens
// existed (testdata/golden/graph_no_hook.json): without a hook it must not
// change by a byte.
const goldenBase: RenderPlan = {
  ...plan,
  spans: [[0, 5, 1], [5, 45, 10], [45, 50, 1], [52, 60, 1], [60, 100, 8], [
    100,
    104,
    1,
  ]],
  redactions: [
    { x: 10, y: 20, width: 120, height: 24, start: 3, end: 9, kind: "aws" },
  ],
  voiceCleanup: false,
  burn: true,
};
const GOLDEN_PLANS: Record<string, RenderPlan> = {
  bare: { ...goldenBase, burn: false },
  stills: {
    ...goldenBase,
    cards: {
      intro: { path: "/c/intro.png", seconds: 4.5 },
      outro: { path: "/c/outro.png", seconds: 5 },
      lowerThird: { path: "/c/lt.png", seconds: 6, at: 1.5 },
      fastForwardBadge: { path: "/c/badge.png" },
    },
    music: "/m/sting.wav",
    bed: "/m/bed.mp3",
  },
  animated: {
    ...goldenBase,
    voiceCleanup: true,
    cards: {
      intro: { path: "/c/intro.mp4", seconds: 5.5 },
      outro: { path: "/c/outro.mp4", seconds: 8 },
      lowerThird: { path: "/c/lt.mov", seconds: 6, at: 1.5 },
      fastForwardBadge: { path: "/c/badge.webm" },
    },
    music: "/m/sting.wav",
    bed: "/m/bed.mp3",
    bedMin: 2,
    bedFade: 0.6,
    bedMerge: 3,
    measured: {
      input_i: "-20",
      input_tp: "-3",
      input_lra: "5",
      input_thresh: "-30",
      target_offset: "0.2",
    },
  },
};
// As stored: JSON drops the fields a graph leaves undefined.
const asStored = (g: BuiltGraph): BuiltGraph => JSON.parse(JSON.stringify(g));
const GOLDEN: Record<string, BuiltGraph> = JSON.parse(
  Deno.readTextFileSync(
    new URL("../../../testdata/golden/graph_no_hook.json", import.meta.url),
  ),
);

Deno.test("no cold open: the graph is byte for byte what it was", () => {
  for (const [name, p] of Object.entries(GOLDEN_PLANS)) {
    assertEquals(asStored(buildGraph(p)), GOLDEN[name], name);
    assertEquals(asStored(buildGraph({ ...p, hook: 0 })), GOLDEN[name], name);
  }
});

Deno.test("a cold open without an intro card renders as if there were none", () => {
  assertEquals(
    asStored(buildGraph({ ...GOLDEN_PLANS.bare, hook: 3 })),
    GOLDEN.bare,
  );
});

// stills: 4.5s card (3.8s shift), a 3s hook; take out: 0-5, 5-9 (ff),
// 9-14, 14-22, 22-27 (ff), 27-31.
const hooked: RenderPlan = { ...GOLDEN_PLANS.stills, hook: 3 };

Deno.test("cold open: the hook plays first, then the card, then the body", () => {
  const g = buildGraph(hooked);
  // Overlays are on the take before it is split, so `at` stays take time
  // and the lower third shows during the hook.
  assertStringIncludes(
    g.graph,
    "[vbadge][lt]overlay=0:0:shortest=1:enable='between(t,1.5,7.5)'[vlt]",
  );
  for (const v of ["v1", "v2"]) {
    assertStringIncludes(
      g.graph,
      `[${v}]split=2[${v}h][${v}b];\n` +
        `[${v}h]trim=end_frame=90,setpts=PTS-STARTPTS[${v}hook];\n` +
        `[${v}b]trim=start_frame=90,setpts=PTS-STARTPTS[${v}body];\n` +
        `[t${
          v[1]
        }][${v}body]xfade=transition=fade:duration=0.7:offset=3.8[${v}cb];\n` +
        `[${v}hook][${v}cb]concat=n=2:v=1:a=0[${v}i]`,
    );
  }
  // The voice stops under the card and picks up with the body.
  assertStringIncludes(
    g.graph,
    "[a]asplit=2[ah][ab];\n" +
      "[ah]atrim=end=3.0000,asetpts=PTS-STARTPTS[ahook];\n" +
      "[ab]atrim=start=3.0000,asetpts=PTS-STARTPTS,adelay=3800:all=1[abody];\n" +
      "[ahook][abody]concat=n=2:v=0:a=1[ad]",
  );
  // The music comes in with the card, not at the start.
  assertStringIncludes(
    g.graph,
    "afade=t=out:st=4.800:d=2,adelay=3000:all=1[m]",
  );
  assertEquals(g.duration, GOLDEN.stills.duration);
});

Deno.test("cold open: the bed stays out of the hook and follows the body", () => {
  const h = buildGraph(hooked);
  // Both fast-forwards are after the hook: placed 3.8s later, as today.
  assertEquals(
    bedOf(h.graph),
    bedOf(GOLDEN.stills.graph),
  );
  // A fast-forward inside the hook keeps its clock but gets no bed.
  const g = buildGraph({ ...hooked, hook: 12 });
  assertEquals(
    bedOf(g.graph),
    "clip((t-25.800)/0.4,0,1)*clip((30.800-t)/0.4,0,1)",
  );
  assertStringIncludes(g.graph, "between(t,5.0000,9.0000)");
});

Deno.test("cold open: a crossfade into the card when asked", () => {
  const g = buildGraph({ ...hooked, hookTransition: "fade" });
  assertStringIncludes(
    g.graph,
    "[t1][v1body]xfade=transition=fade:duration=0.7:offset=3.8[v1cb];\n" +
      "[v1hook][v1cb]xfade=transition=fade:duration=0.7:offset=2.3000[v1i]",
  );
  // A second crossfade: the body comes 3.1s later, the music at 2.3s.
  assertStringIncludes(g.graph, "adelay=3100:all=1[abody]");
  assertStringIncludes(g.graph, "adelay=2300:all=1[m]");
  assertEquals(
    g.duration.toFixed(6),
    (GOLDEN.stills.duration - 0.7).toFixed(6),
  );
  assertEquals(opening(hooked.cards, 3, "fade"), {
    hook: 3,
    cardAt: 2.3,
    shift: 3.0999999999999996,
  });
});

Deno.test("cold open: refused inside a fast-forward or with nothing after it", () => {
  assertThrows(
    () => buildGraph({ ...hooked, hook: 7 }),
    Error,
    "inside the fast-forwarded wait at 5.0s-45.0s",
  );
  assertThrows(
    () => buildGraph({ ...hooked, hook: 31 }),
    Error,
    "leaves nothing of the take after it",
  );
});
