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
  checkJoin,
  checkOpening,
  chunkRate,
  encoderArgs,
  measureArgs,
  measureFilter,
  opening,
  parseLoudness,
  type RenderPlan,
  safeFilterText,
  selectExpr,
  sumExpr,
  type TakeSource,
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
  const args = measureArgs(plan, "/w/measure.txt");
  assertEquals(args[args.indexOf("-/af") + 1], "/w/measure.txt");
  assert(!args.some((a) => a.includes("aselect")));
  assertStringIncludes(measureFilter(plan), "print_format=json");
  assertStringIncludes(measureFilter(plan), "aselect='");
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

Deno.test("checkOpening: a fade cold open needs a hook past the crossfade and an intro past two", () => {
  const intro = (seconds: number) => ({ intro: { path: "/c/i.png", seconds } });
  assertThrows(
    () => checkOpening(intro(4.5), 0.5, "fade"),
    Error,
    "the cold open's hook is 0.50s",
  );
  assertThrows(
    () => checkOpening(intro(1.4), 3, "fade"),
    Error,
    "the intro card is 1.4s",
  );
  // A cut, no hook or no intro: nothing to fade, nothing refused.
  checkOpening(intro(1.4), 0.5, "cut");
  checkOpening(intro(1.4), 0, "fade");
  checkOpening({}, 0.5, "fade");
  checkOpening(intro(1.5), 0.8, "fade");
  // Just past both bounds every offset in the graph stays positive.
  const g = buildGraph({
    ...hooked,
    cards: { ...hooked.cards, intro: { ...hooked.cards.intro!, seconds: 1.5 } },
    hookTransition: "fade",
  });
  assert(!/offset=-|adelay=-|pad_dur=-/.test(g.graph));
});

// Captured from the renderer before takes could be joined
// (testdata/golden/graph_single_take.json): a single take must not change by
// a byte, on the paths graph_no_hook.json leaves out.
const SINGLE: {
  hookCut: BuiltGraph;
  hookFade: BuiltGraph;
  hookNoBurn: BuiltGraph;
  measureFilter: string;
  measureFilterCleaned: string;
  measureArgs: string[];
} = JSON.parse(
  Deno.readTextFileSync(
    new URL("../../../testdata/golden/graph_single_take.json", import.meta.url),
  ),
);

Deno.test("one take: cold opens and measuring passes are byte for byte what they were", () => {
  const stills = GOLDEN_PLANS.stills;
  assertEquals(asStored(buildGraph({ ...stills, hook: 3 })), SINGLE.hookCut);
  assertEquals(
    asStored(buildGraph({ ...stills, hook: 3, hookTransition: "fade" })),
    SINGLE.hookFade,
  );
  assertEquals(
    asStored(buildGraph({ ...stills, hook: 3, burn: false })),
    SINGLE.hookNoBurn,
  );
  assertEquals(measureFilter(goldenBase), SINGLE.measureFilter);
  assertEquals(
    measureFilter({ ...goldenBase, voiceCleanup: true }),
    SINGLE.measureFilterCleaned,
  );
  assertEquals(measureArgs(goldenBase, "/w/measure.txt"), SINGLE.measureArgs);
  // Naming the default mode changes nothing either.
  assertEquals(
    asStored(
      buildGraph({ ...stills, bedMode: "waits", takeTransition: "cut" }),
    ),
    GOLDEN.stills,
  );
});

// First take: 14s out, a wait at 5-9. Second: 10s out, a wait at 2-6.
const second: TakeSource = {
  recording: "/r/two.mkv",
  speechTrack: 0,
  fps: 30,
  spans: [[10, 12, 1], [12, 52, 10], [52, 56, 1]],
  redactions: [
    { x: 1, y: 2, width: 120, height: 24, start: 11, end: 13, kind: "aws" },
  ],
};
const twoTakes: RenderPlan = { ...plan, moreTakes: [second] };

Deno.test("two takes: each runs its own chain, and they join with a hard cut", () => {
  const g = buildGraph(twoTakes);
  assertEquals(g.inputs, ["-i", "/r/take.mkv", "-i", "/r/two.mkv"]);
  assertEquals(g.duration, 24);
  // Credentials are hidden on the second take's own raw time and pixels.
  assertStringIncludes(g.graph, "[1:v:0]fps=30,format=yuv420p[take1vraw]");
  assertStringIncludes(
    g.graph,
    "[take1rd0a][take1rd0p]overlay=1:2:enable='between(t,11,13)'[take1rd0]",
  );
  assertStringIncludes(g.graph, "gte(t,9.9999)*lt(t,11.9999)");
  // Its clock runs on its own time, inside its own chain.
  assertStringIncludes(g.graph, "enable='between(t,2.0000,6.0000)'");
  // Each voice has its own track and its own mute.
  assertStringIncludes(g.graph, "[0:a:1]aresample");
  assertStringIncludes(g.graph, "[1:a:0]aresample");
  assertStringIncludes(g.graph, "volume=0:enable='between(t,12.0000,52.0000)'");
  // Each voice is pinned to its picture's length, so nothing drifts.
  assertStringIncludes(g.graph, "apad=whole_dur=10.0000,atrim=end=10.0000");
  assertStringIncludes(
    g.graph,
    "[take0v][take0a][take1v][take1a]concat=n=2:v=1:a=1[vjoin][ajoin]",
  );
  assertStringIncludes(g.graph, "[vjoin]format=yuv420p,setsar=1,settb=AVTB");
  assertStringIncludes(g.graph, "[ajoin]anull[a1]");
});

Deno.test("two takes: each voice uses its own loudness measurement", () => {
  const m = (input_i: string) => ({
    input_i,
    input_tp: "-3",
    input_lra: "5",
    input_thresh: "-30",
    target_offset: "0.2",
  });
  const g = buildGraph({
    ...twoTakes,
    measured: m("-20"),
    moreTakes: [{ ...second, measured: m("-33") }],
  });
  assertStringIncludes(g.graph, "measured_I=-20");
  assertStringIncludes(g.graph, "measured_I=-33");
  // A measuring pass reads one file: its input 0, with that take's track.
  const args = measureArgs(second, "/w/m.txt");
  assertEquals(args[args.indexOf("-i") + 1], "/r/two.mkv");
  assertEquals(args[args.indexOf("-map") + 1], "0:a:0");
  assertStringIncludes(
    measureFilter(twoTakes, second),
    "volume=0:enable='between(t,12.0000,52.0000)'",
  );
});

Deno.test("two takes: a crossfade overlaps them, and a third follows on", () => {
  const g = buildGraph({
    ...twoTakes,
    takeTransition: "fade",
    moreTakes: [second, { ...second, recording: "/r/three.mkv" }],
  });
  assertStringIncludes(
    g.graph,
    "[take0v][take1v]xfade=transition=fade:duration=0.7:offset=13.3000[vjoin1]",
  );
  assertStringIncludes(g.graph, "[take0a][take1a]acrossfade=d=0.7[ajoin1]");
  assertStringIncludes(
    g.graph,
    "[vjoin1][take2v]xfade=transition=fade:duration=0.7:offset=22.6000[vjoin2]",
  );
  assertEquals(g.duration.toFixed(6), "32.600000");
  assert(!g.graph.includes("concat=n=3"));
});

Deno.test("two takes: a differing frame rate is converted before the join", () => {
  const g = buildGraph({ ...twoTakes, moreTakes: [{ ...second, fps: 60 }] });
  assertStringIncludes(g.graph, "[1:v:0]fps=60,format=yuv420p");
  assertStringIncludes(
    g.graph,
    "[take1vsel]fps=30,format=yuv420p,setsar=1,settb=AVTB[take1v]",
  );
  assertStringIncludes(
    g.graph,
    "[take0vsel]format=yuv420p,setsar=1,settb=AVTB[take0v]",
  );
});

Deno.test("two takes: overlays and the waits bed use the joined timeline", () => {
  const g = buildGraph({
    ...twoTakes,
    bed: "/m/bed.mp3",
    cards: { fastForwardBadge: { path: "/c/badge.png" } },
  });
  // The second take's wait is at 16-20 once it follows the first's 14s.
  assertEquals(
    bedOf(g.graph),
    "(clip((t-5.000)/0.4,0,1)*clip((9.000-t)/0.4,0,1))+" +
      "(clip((t-16.000)/0.4,0,1)*clip((20.000-t)/0.4,0,1))",
  );
  assertStringIncludes(
    g.graph,
    "(between(t,5.0000,9.0000))+(between(t,16.0000,20.0000))",
  );
});

Deno.test("two takes: cards go around the whole video, once", () => {
  const g = buildGraph({
    ...twoTakes,
    music: "/m/sting.wav",
    cards: {
      intro: { path: "/c/intro.png", seconds: 4.5 },
      outro: { path: "/c/outro.png", seconds: 5 },
    },
  });
  assertEquals(g.duration.toFixed(6), "32.100000");
  assertStringIncludes(
    g.graph,
    "[t1][v1]xfade=transition=fade:duration=0.7:offset=3.8[v1i]",
  );
  assertStringIncludes(g.graph, "[ajoin]adelay=3800:all=1[ad]");
  assertStringIncludes(g.graph, "offset=27.1000[v1o]");
});

Deno.test("two takes: a take that keeps nothing or can't fade is refused by name", () => {
  assertThrows(
    () => buildGraph({ ...twoTakes, moreTakes: [{ ...second, spans: [] }] }),
    Error,
    "the edit list of /r/two.mkv keeps nothing",
  );
  const short = { ...second, spans: [[0, 1, 1]] as [number, number, number][] };
  const plan2 = { ...twoTakes, moreTakes: [short] };
  assertThrows(
    () => checkJoin({ ...plan2, takeTransition: "fade" }),
    Error,
    "/r/two.mkv is 1.00s after editing",
  );
  // A cut has nothing to fade.
  checkJoin(plan2);
});

const full: RenderPlan = { ...plan, bed: "/m/bed.mp3", bedMode: "full" };
const fullEnvelope = (graph: string) =>
  graph.match(/volume='([^']*)':eval=frame\[bed/)?.[1];

Deno.test("full bed: under the whole video, at the default level and fades", () => {
  const g = buildGraph(full);
  // -12 dB, over the 14s video, wherever the waits are.
  assertEquals(
    fullEnvelope(g.graph),
    "0.2512*clip((t-0.000)/1.5,0,1)*clip((14.000-t)/1.5,0,1)",
  );
  assertStringIncludes(g.graph, "atrim=0:14.000");
  assertStringIncludes(
    g.graph,
    "[a][bed]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.89:level=false[abed]",
  );
  assertEquals(g.duration, 14);
  // The voice is normalized before the mix, so it stays on the target.
  const at = (s: string) => g.graph.indexOf(s);
  assert(at("loudnorm=I=-14") < at("[a][bed]amix"));
});

Deno.test("full bed: level and fade are settable; waits settings don't apply", () => {
  const g = buildGraph({
    ...full,
    bedLevel: -18,
    bedFade: 2,
    bedMin: 100,
    bedMerge: 5,
  });
  assertEquals(
    fullEnvelope(g.graph),
    "0.1259*clip((t-0.000)/2,0,1)*clip((14.000-t)/2,0,1)",
  );
});

Deno.test("full bed: it covers the outro, and the mix comes after its padding", () => {
  const g = buildGraph({
    ...full,
    cards: { outro: { path: "/c/outro.png", seconds: 5 } },
  });
  assertEquals(g.duration, 18.3);
  assertStringIncludes(g.graph, "clip((18.300-t)/1.5,0,1)");
  assertStringIncludes(g.graph, "[apad][bed]amix=inputs=2");
});

Deno.test("full bed: with intro music it comes in as the music fades", () => {
  const g = buildGraph({
    ...full,
    music: "/m/sting.wav",
    cards: { intro: { path: "/c/intro.png", seconds: 4.5 } },
  });
  // The music starts fading a second after the card's 3.8s.
  assertEquals(
    fullEnvelope(g.graph),
    "0.2512*clip((t-4.800)/1.5,0,1)*clip((17.800-t)/1.5,0,1)",
  );
  // With a cold open the music, and so the bed, comes after the hook.
  const hooked = buildGraph({
    ...full,
    hook: 3,
    music: "/m/sting.wav",
    cards: { intro: { path: "/c/intro.png", seconds: 4.5 } },
  });
  assertStringIncludes(fullEnvelope(hooked.graph)!, "clip((t-7.800)/1.5,0,1)");
});

Deno.test("full bed: with no intro music it plays under a cold open's hook too", () => {
  const g = buildGraph({
    ...full,
    hook: 3,
    cards: { intro: { path: "/c/intro.png", seconds: 4.5 } },
  });
  assertStringIncludes(fullEnvelope(g.graph)!, "clip((t-0.000)/1.5,0,1)");
});

Deno.test("full bed: ducking follows the voice alone, with a key that lasts", () => {
  const g = buildGraph({
    ...full,
    bedDuck: true,
    music: "/m/sting.wav",
    cards: {
      intro: { path: "/c/intro.png", seconds: 4.5 },
      outro: { path: "/c/outro.png", seconds: 5 },
    },
  });
  // Split before the music joins; the music mixes with the voice branch.
  assertStringIncludes(g.graph, "[ad]asplit=2[avoice][akey]");
  assertStringIncludes(g.graph, "[avoice][m]amix=inputs=2");
  // The compressor stops when its key does: this one runs to the end.
  assertStringIncludes(g.graph, "[akey]apad=whole_dur=22.100[akeyfull]");
  assertStringIncludes(
    g.graph,
    "[bedq][akeyfull]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[bed]",
  );
  // Without an intro the voice is split all the same.
  assertStringIncludes(
    buildGraph({ ...full, bedDuck: true }).graph,
    "[a]asplit=2[avoice][akey]",
  );
  // Ducking is for the full bed only.
  assert(
    !buildGraph({ ...plan, bed: "/m/bed.mp3", bedDuck: true }).graph.includes(
      "sidechaincompress",
    ),
  );
});

Deno.test("full bed: it spans a join in one piece", () => {
  const g = buildGraph({ ...twoTakes, bed: "/m/bed.mp3", bedMode: "full" });
  assertEquals(
    fullEnvelope(g.graph),
    "0.2512*clip((t-0.000)/1.5,0,1)*clip((24.000-t)/1.5,0,1)",
  );
  assertEquals(g.graph.match(/amix/g)?.length, 1);
  assertStringIncludes(g.graph, "[ajoin][bed]amix=inputs=2");
});

Deno.test("two takes: a cold open can't end inside the crossfade between them", () => {
  const faded: RenderPlan = {
    ...twoTakes,
    takeTransition: "fade",
    cards: { intro: { path: "/c/intro.png", seconds: 4.5 } },
  };
  // The first take is 14s, so the crossfade starts at 13.3s.
  assertThrows(
    () => checkJoin({ ...faded, hook: 13.5 }),
    Error,
    "end it before 13.30s",
  );
  checkJoin({ ...faded, hook: 13.3 });
  // A cut has no crossfade to end in, and no intro means no cold open.
  checkJoin({ ...faded, hook: 13.5, takeTransition: "cut" });
  checkJoin({ ...faded, hook: 13.5, cards: {} });
});
