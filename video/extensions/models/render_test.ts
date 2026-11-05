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
  assertMatch,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { model as render } from "./render.ts";
import { model as media } from "./media.ts";
import {
  analyzed,
  built,
  DURATION,
  type Env,
  measureScripts,
  renderArgs,
  setup,
  SPEECH,
  teardown,
} from "./_lib/scenario.ts";
import { argAfter, pcm } from "./_lib/testing.ts";

Deno.test("render: simple card, pixelation, clock, two-pass loudness, captions", async () => {
  const env = await setup();
  try {
    await built(env);
    await analyzed(env);
    await render.methods.render.execute(
      renderArgs(env, { screen: "screen" }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(graph, "overlay=88:114:enable='between(t,0,60)'");
    assertStringIncludes(graph, "▶▶ 8×");
    assertStringIncludes(graph, "measured_I=-23.10");
    assertStringIncludes(graph, "loudnorm=I=-14");
    assertStringIncludes(
      graph,
      "xfade=transition=fade:duration=0.7:offset=3.8",
    );
    assertStringIncludes(graph, "subtitles='captions.srt'");
    // the measuring pass reads its filter from a file, not argv, and the
    // file is gone afterwards
    const measure = env.calls.find((c) => c.args.includes("-/af"))!;
    const script = argAfter(measure, "-/af")!;
    assert(script.startsWith(`${env.dir}/take.video/measure-`));
    assert(!measure.args.some((a) => a.includes("aselect")));
    assertStringIncludes(measureScripts.get(script)!, "print_format=json");
    await assertRejects(() => Deno.stat(script), Deno.errors.NotFound);
    const main = env.calls.find((c) => c.args.includes("-/filter_complex"))!;
    assertEquals(main.cwd, `${env.dir}/take.video`);
    assert(main.args.includes(`${env.dir}/take.polished.mp4`));
    assert(main.args.includes(`${env.dir}/take.captioned.mp4`));
    assertEquals(argAfter(main, "-c:s"), "mov_text");
    const chromium = env.calls.find((c) => c.bin === "chromium")!;
    assert(chromium.args.includes("--window-size=1920,1080"));
    const srt = await Deno.readTextFile(`${env.dir}/take.polished.srt`);
    assertMatch(srt, /^1\n00:00:0[45],\d{3} --> /); // shifted past the intro
    const v = env.swamp.latest("render", "take")!;
    assertEquals(v.introSeconds, 3.8);
    assertEquals(v.redactions, 1);
    assertEquals(v.cardsMode, "simple");
  } finally {
    await teardown(env);
  }
});

Deno.test("render: none mode and media settings (vaapi, size, no burn)", async () => {
  const env = await setup();
  try {
    await built(env);
    await media.methods.show.execute(
      {},
      env.swamp.context("media", {
        encoder: "vaapi",
        width: 1280,
        height: 720,
        quality: 22,
      }),
    );
    await render.methods.render.execute(
      renderArgs(env, {
        media: "media",
        cards: { mode: "none" },
        burn: false,
        twoPassLoudness: false,
      }),
      env.swamp.context("render", {}),
    );
    const main = env.calls.find((c) => c.args.includes("-/filter_complex"))!;
    assertEquals(argAfter(main, "-vaapi_device"), "/dev/dri/renderD128");
    assertEquals(argAfter(main, "-c:v"), "h264_vaapi");
    assertEquals(argAfter(main, "-qp"), "22");
    assert(!main.args.includes(`${env.dir}/take.captioned.mp4`));
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(graph, "format=nv12,hwupload[vup1]");
    assertStringIncludes(graph, "scale=1280:720");
    assert(!graph.includes("xfade"));
    assert(!env.calls.some((c) => c.bin === "chromium"));
    assertEquals(env.swamp.latest("render", "take")!.introSeconds, 0);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: the bed's fade and minimum come from media", async () => {
  const env = await setup();
  try {
    await built(env);
    const graphWith = async (settings: Record<string, unknown>) => {
      await media.methods.show.execute(
        {},
        env.swamp.context("media", { bed: "bed.mp3", ...settings }),
      );
      await render.methods.render.execute(
        renderArgs(env, {
          media: "media",
          cards: { mode: "none" },
          burn: false,
          twoPassLoudness: false,
        }),
        env.swamp.context("render", {}),
      );
      return await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    };
    assertStringIncludes(await graphWith({ bedFadeSeconds: 1 }), "/1,0,1)");
    assert(!(await graphWith({ bedMinSeconds: 100 })).includes("[bed]"));
  } finally {
    await teardown(env);
  }
});

Deno.test("render: brand without the brand extension fails clearly; custom reads a cards resource", async () => {
  const env = await setup();
  try {
    await built(env);
    await assertRejects(
      () =>
        render.methods.render.execute(
          renderArgs(env, { cards: { mode: "brand" } }),
          env.swamp.context("render", {}),
        ),
      Error,
      "@swamp/video/brand",
    );
    const cards = env.swamp.context("my-cards", {});
    await cards.writeResource("cards", "take", {
      intro: { path: `${env.dir}/intro.mp4`, seconds: 5 },
      outro: { path: `${env.dir}/outro.png`, seconds: 6 },
      lowerThird: { path: `${env.dir}/lt.png`, seconds: 4, at: 2 },
      fastForwardBadge: { path: `${env.dir}/badge.png` },
    });
    await render.methods.render.execute(
      renderArgs(env, { cards: { mode: "custom", from: "my-cards" } }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(
      graph,
      "xfade=transition=fade:duration=0.7:offset=4.3",
    );
    assertStringIncludes(
      graph,
      "[lt]overlay=0:0:shortest=1:enable='between(t,2,6)'",
    );
    assertStringIncludes(graph, "[badge]overlay");
    assertStringIncludes(graph, "apad=pad_dur=5.300");
    const main = env.calls.find((c) => c.args.includes("-/filter_complex"))!;
    // the video intro is cut to its length; still cards loop
    assertEquals(
      main.args.slice(
        main.args.indexOf(`${env.dir}/intro.mp4`) - 3,
        main.args.indexOf(`${env.dir}/intro.mp4`) + 1,
      ),
      ["-t", "5", "-i", `${env.dir}/intro.mp4`],
    );
    assertEquals(env.swamp.latest("render", "take")!.introSeconds, 4.3);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: brand cards with animated overlays from a brand instance", async () => {
  const env = await setup();
  try {
    await built(env);
    const brand = env.swamp.context("my-brand", {});
    await brand.writeResource("cards", "take", {
      intro: { path: `${env.dir}/intro.mp4`, seconds: 5 },
      outro: { path: `${env.dir}/outro.mp4`, seconds: 8 },
      lowerThird: { path: `${env.dir}/lt.mov`, seconds: 6, at: 1.5 },
      fastForwardBadge: { path: `${env.dir}/badge.webm` },
    });
    await render.methods.render.execute(
      renderArgs(env, { cards: { mode: "brand", from: "my-brand" } }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(
      graph,
      "setpts=PTS-STARTPTS+1.5/TB[lt]",
    );
    assertStringIncludes(
      graph,
      "[lt]overlay=0:0:eof_action=pass:enable='between(t,1.5,7.5)'",
    );
    const main = env.calls.find((c) => c.args.includes("-/filter_complex"))!;
    const badge = main.args.indexOf(`${env.dir}/badge.webm`);
    assertEquals(main.args.slice(badge - 5, badge + 1), [
      "-stream_loop",
      "-1",
      "-c:v",
      "libvpx-vp9",
      "-i",
      `${env.dir}/badge.webm`,
    ]);
    assertEquals(main.args[main.args.indexOf(`${env.dir}/lt.mov`) - 1], "-i");
  } finally {
    await teardown(env);
  }
});

Deno.test("render: pixelation without screen analysis is refused, not skipped", async () => {
  const env = await setup();
  try {
    await built(env);
    await assertRejects(
      () =>
        render.methods.render.execute(
          renderArgs(env, { screen: "screen" }),
          env.swamp.context("render", {}),
        ),
      Error,
      "pixelate=false",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a cold open plays the hook, then the card, with captions to match", async () => {
  const env = await setup();
  try {
    await built(env, { coldOpenUntil: "this is a demo" });
    await render.methods.render.execute(
      renderArgs(env),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    // The hook keeps PAD of air after "demo", which runs into the wait: 73
    // frames (2.43s) in.
    assertStringIncludes(graph, "[v1h]trim=end_frame=73,setpts=PTS-STARTPTS");
    assertStringIncludes(graph, "[v1hook][v1cb]concat=n=2:v=1:a=0[v1i]");
    assertStringIncludes(graph, "[v2hook][v2cb]concat=n=2:v=1:a=0[v2i]");
    const v = env.swamp.latest("render", "take")!;
    assertEquals(v.hookSeconds, 73 / 30);
    assertEquals(v.introSeconds, 3.8);
    // The hook's caption plays at once and ends by the cut; the body's
    // comes after the card.
    const srt = await Deno.readTextFile(`${env.dir}/take.polished.srt`);
    assertMatch(
      srt,
      /^1\n00:00:00,\d{3} --> 00:00:02,433\nHello, this is a demo\.\n\n2\n00:00:10,267 /,
    );
    // Burned captions go on the take before the split: broken there, not shifted.
    const burned = await Deno.readTextFile(
      `${env.dir}/take.video/captions.srt`,
    );
    assertMatch(
      burned,
      /--> 00:00:02,433\nHello, this is a demo\.\n\n2\n00:00:06,467 /,
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a cold open crossfades into the card when media says fade", async () => {
  const env = await setup();
  try {
    await built(env, { coldOpenUntil: "this is a demo" });
    await media.methods.show.execute(
      {},
      env.swamp.context("media", { coldOpenTransition: "fade" }),
    );
    await render.methods.render.execute(
      renderArgs(env, { media: "media" }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(
      graph,
      "[v1hook][v1cb]xfade=transition=fade:duration=0.7:offset=1.7333[v1i]",
    );
    assertEquals(
      (env.swamp.latest("render", "take")!.introSeconds as number).toFixed(6),
      "3.100000",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: no cold open without an intro card; none designated writes no hook", async () => {
  const env = await setup();
  try {
    await built(env, { coldOpenUntil: "this is a demo" });
    const opts = { cards: { mode: "none" as const }, twoPassLoudness: false };
    await render.methods.render.execute(
      renderArgs(env, opts),
      env.swamp.context("render", {}),
    );
    const hooked = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assert(!hooked.includes("trim=end_frame"));
    assertEquals(env.swamp.latest("render", "take")!.hookSeconds, undefined);
    await built(env);
    await render.methods.render.execute(
      renderArgs(env, opts),
      env.swamp.context("render", {}),
    );
    assertEquals(
      await Deno.readTextFile(`${env.dir}/take.video/graph.txt`),
      hooked,
    );
    await render.methods.render.execute(
      renderArgs(env),
      env.swamp.context("render", {}),
    );
    assertEquals(env.swamp.latest("render", "take")!.hookSeconds, undefined);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: an intro or outro no longer than the crossfade is refused by the arguments", () => {
  const args = (cards: Record<string, unknown>) =>
    render.methods.render.arguments.safeParse({
      recordingPath: "/v/take.mkv",
      edit: "edit",
      cards: { mode: "custom", ...cards },
    });
  const short = args({ intro: { path: "/c/intro.png", seconds: 0.5 } });
  assert(!short.success);
  assertEquals(short.error.issues[0].path.join("."), "cards.intro.seconds");
  assertStringIncludes(
    short.error.issues[0].message,
    "must be longer than the 0.7s crossfade",
  );
  assert(!args({ outro: { path: "/c/outro.png", seconds: 0.7 } }).success);
  assert(
    args({
      intro: { path: "/c/intro.png", seconds: 4.5 },
      outro: { path: "/c/outro.png", seconds: 0.8 },
      lowerThird: { path: "/c/lt.png", seconds: 0.5, at: 1 },
    }).success,
  );
});

Deno.test("render: a fading cold open with a short intro is refused before ffmpeg runs", async () => {
  const env = await setup();
  try {
    await built(env, { coldOpenUntil: "this is a demo" });
    await media.methods.show.execute(
      {},
      env.swamp.context("media", { coldOpenTransition: "fade" }),
    );
    const intro = `${env.dir}/intro.png`;
    await Deno.writeTextFile(intro, "png");
    const before = env.calls.length;
    await assertRejects(
      () =>
        render.methods.render.execute(
          renderArgs(env, {
            media: "media",
            pixelate: false,
            cards: { mode: "custom", intro: { path: intro, seconds: 1 } },
          }),
          env.swamp.context("render", {}),
        ),
      Error,
      "the intro card is 1s",
    );
    assert(
      !env.calls.slice(before).some((c) =>
        c.bin === "ffmpeg" && (c.args.includes("-/af") ||
          c.args.includes("-/filter_complex"))
      ),
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: malformed redactions in the screen analysis are refused, not put in the graph", async () => {
  const env = await setup();
  try {
    await built(env);
    const s = await analyzed(env);
    await env.swamp.context("screen", {}).writeResource("screen", "take", {
      ...s,
      redactions: [{ ...s.redactions[0], x: "0:0[x];movie=/etc/passwd" }],
    });
    await assertRejects(
      () =>
        render.methods.render.execute(
          renderArgs(env, { screen: "screen" }),
          env.swamp.context("render", {}),
        ),
      Error,
      "malformed redactions: 0.x",
    );
  } finally {
    await teardown(env);
  }
});

/** A second recording, built on the same instances as the first. */
async function secondTake(env: Env, name = "second"): Promise<Env> {
  const other = { ...env, rec: `${env.dir}/${name}.mkv` };
  await Deno.writeTextFile(other.rec, "not really a video");
  await built(other);
  return other;
}

const joinArgs = (env: Env, other: Env, extra: Record<string, unknown> = {}) =>
  renderArgs(env, {
    recordingPath: "",
    takes: [env.rec, other.rec],
    cards: { mode: "none" as const },
    pixelate: false,
    ...extra,
  });

Deno.test("render: takes join into one video under its own name, leaving each take's files alone", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    await render.methods.render.execute(
      renderArgs(env, { cards: { mode: "none" }, pixelate: false }),
      env.swamp.context("render", {}),
    );
    const own = await Deno.readTextFile(`${env.dir}/take.polished.srt`);
    await render.methods.render.execute(
      joinArgs(env, other),
      env.swamp.context("render", {}),
    );
    // Files, work dir and data all carry the joined name.
    const main = env.calls.findLast((c) =>
      c.args.includes("-/filter_complex")
    )!;
    assertEquals(main.cwd, `${env.dir}/take.joined.video`);
    assert(main.args.includes(`${env.dir}/take.joined.polished.mp4`));
    assert(main.args.includes(`${env.dir}/take.joined.captioned.mp4`));
    assert(main.args.includes(env.rec) && main.args.includes(other.rec));
    const srtInput = main.args.lastIndexOf("-i");
    assertEquals(
      main.args[srtInput + 1],
      `${env.dir}/take.joined.polished.srt`,
    );
    // The subtitle stream is the input after both recordings.
    assertEquals(
      argAfter(main, "-c:s"),
      "mov_text",
    );
    assert(main.args.includes("2:s"));
    const graph = await Deno.readTextFile(
      `${env.dir}/take.joined.video/graph.txt`,
    );
    assertStringIncludes(graph, "concat=n=2:v=1:a=1[vjoin][ajoin]");
    // The first take's own render is untouched.
    assertEquals(await Deno.readTextFile(`${env.dir}/take.polished.srt`), own);
    const v = env.swamp.latest("render", "take-joined")!;
    assertEquals(v.recording, `${env.dir}/take.joined.mp4`);
    const takes = v.takes as {
      take: string;
      startSeconds: number;
      seconds: number;
    }[];
    assertEquals(takes.map((t) => t.take), ["take", "second"]);
    assertEquals(takes[0].startSeconds, 0);
    assertEquals(takes[1].startSeconds, takes[0].seconds);
    assertEquals(v.durationSeconds, takes[0].seconds + takes[1].seconds);
    assertEquals(env.swamp.latest("render", "take")!.takes, undefined);
    // Captions run straight through, the second take's after the first's.
    const srt = await Deno.readTextFile(`${env.dir}/take.joined.polished.srt`);
    const cues = [...srt.matchAll(/^(\d+)\n(\d\d):(\d\d):(\d\d),(\d+) -->/gm)];
    assertEquals(cues.map((c) => Number(c[1])), cues.map((_, i) => i + 1));
    assertEquals(cues.length, 2 * own.trim().split("\n\n").length);
    const secs = (c: RegExpMatchArray) =>
      Number(c[2]) * 3600 + Number(c[3]) * 60 + Number(c[4]) +
      Number(c[5]) / 1000;
    assert(secs(cues[cues.length / 2]) >= takes[1].startSeconds);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: each take gets its own loudness measuring pass", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    await render.methods.render.execute(
      joinArgs(env, other),
      env.swamp.context("render", {}),
    );
    const passes = env.calls.filter((c) => c.args.includes("-/af"));
    assertEquals(
      passes.map((c) => argAfter(c, "-i")),
      [env.rec, other.rec],
    );
    const graph = await Deno.readTextFile(
      `${env.dir}/take.joined.video/graph.txt`,
    );
    assertEquals(graph.match(/measured_I=-23\.10/g)?.length, 2);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a take that measures as silent renders without a measurement", async () => {
  const env = await setup({
    ffmpeg: (req) => {
      const out = req.args[req.args.length - 1];
      if (req.args.includes("-/af")) {
        return {
          stderr:
            `{"input_i" : "-inf", "input_tp" : "-inf", "input_lra" : "0.00", ` +
            `"input_thresh" : "-70.00", "target_offset" : "inf"}`,
        };
      }
      return out.endsWith(".jpg") ? {} : { stdout: pcm(DURATION, SPEECH) };
    },
  });
  try {
    await built(env);
    await render.methods.render.execute(
      renderArgs(env, { cards: { mode: "none" }, pixelate: false }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    assertStringIncludes(graph, "loudnorm=I=-14:TP=-1.5:LRA=11,");
    assert(!graph.includes("measured_I"));
    assert(
      env.swamp.logs.some((l) =>
        l.level === "warn" && l.msg.includes("measures as silent")
      ),
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a joined output's dots stay in its name, on no take's paths", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    await render.methods.render.execute(
      joinArgs(env, other, { output: `${env.dir}/final.v2` }),
      env.swamp.context("render", {}),
    );
    assert(env.swamp.latest("render", "final-v2"));
    await Deno.stat(`${env.dir}/final.v2.polished.srt`);
    await Deno.stat(`${env.dir}/final.v2.video/graph.txt`);
    await assertRejects(
      () => Deno.stat(`${env.dir}/final.polished.srt`),
      Deno.errors.NotFound,
    );
    // An .mp4 on the end isn't doubled.
    await render.methods.render.execute(
      joinArgs(env, other, { output: `${env.dir}/final.mp4` }),
      env.swamp.context("render", {}),
    );
    await Deno.stat(`${env.dir}/final.polished.srt`);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: an output that would overwrite a take's own render is refused", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    for (const output of [`${env.dir}/take`, `${env.dir}/elsewhere/second`]) {
      await assertRejects(
        () =>
          render.methods.render.execute(
            joinArgs(env, other, { output }),
            env.swamp.context("render", {}),
          ),
        Error,
        "would overwrite",
      );
    }
  } finally {
    await teardown(env);
  }
});

Deno.test("render: which recordings to render is checked up front", async () => {
  const env = await setup();
  try {
    const attempt = (extra: Record<string, unknown>, message: string) =>
      assertRejects(
        () =>
          render.methods.render.execute(
            renderArgs(env, extra),
            env.swamp.context("render", {}),
          ),
        Error,
        message,
      );
    await attempt({ recordingPath: "" }, "pass recordingPath or takes");
    await attempt({ takes: [env.rec, env.rec] }, "not both");
    await attempt({ recordingPath: "", takes: [env.rec] }, "two or more");
    await attempt({ output: `${env.dir}/x` }, "it needs takes");
    assertEquals(env.calls.length, 0);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a take with no screen analysis stops a join, not just its own render", async () => {
  const env = await setup();
  try {
    await built(env);
    await analyzed(env);
    const other = await secondTake(env);
    const before = env.calls.length;
    await assertRejects(
      () =>
        render.methods.render.execute(
          joinArgs(env, other, { screen: "screen", pixelate: true }),
          env.swamp.context("render", {}),
        ),
      Error,
      "no screen analysis for second",
    );
    assert(
      !env.calls.slice(before).some((c) => c.args.includes("-/filter_complex")),
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: every analyzed take's credentials are pixelated in a join", async () => {
  const env = await setup();
  try {
    await built(env);
    await analyzed(env);
    const other = await secondTake(env);
    await analyzed(other);
    await render.methods.render.execute(
      joinArgs(env, other, { screen: "screen", pixelate: true }),
      env.swamp.context("render", {}),
    );
    const graph = await Deno.readTextFile(
      `${env.dir}/take.joined.video/graph.txt`,
    );
    assertStringIncludes(graph, "[take0rd0a][take0rd0p]overlay=88:114");
    assertStringIncludes(graph, "[take1rd0a][take1rd0p]overlay=88:114");
    assertEquals(env.swamp.latest("render", "take-joined")!.redactions, 2);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: differences between takes are warned about; a later cold open is ignored", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = { ...env, rec: `${env.dir}/second.mkv` };
    await Deno.writeTextFile(other.rec, "not really a video");
    await built(other, { coldOpenUntil: "this is a demo" });
    await render.methods.render.execute(
      joinArgs(env, other, {
        cards: {
          mode: "custom",
          intro: { path: `${env.dir}/i.png`, seconds: 4.5 },
        },
      }),
      env.swamp.context("render", {}),
    );
    assert(
      env.swamp.logs.some((l) =>
        l.level === "warn" && l.msg.includes("only the first take can")
      ),
    );
    const v = env.swamp.latest("render", "take-joined")!;
    assertEquals(v.hookSeconds, undefined);
    const graph = await Deno.readTextFile(
      `${env.dir}/take.joined.video/graph.txt`,
    );
    assert(!graph.includes("trim=end_frame"));
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a fade between takes too short for it is refused before ffmpeg runs", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    await env.swamp.context("edit", {}).writeResource("editList", "second", {
      ...env.swamp.latest("edit", "second")!,
      spans: [[1, 2, 1]],
    });
    await media.methods.show.execute(
      {},
      env.swamp.context("media", { takeTransition: "fade" }),
    );
    const before = env.calls.length;
    await assertRejects(
      () =>
        render.methods.render.execute(
          joinArgs(env, other, { media: "media" }),
          env.swamp.context("render", {}),
        ),
      Error,
      "too short to fade",
    );
    assert(
      !env.calls.slice(before).some((c) =>
        c.args.includes("-/af") || c.args.includes("-/filter_complex")
      ),
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a full bed comes from media, the workflow can ask for it, and it needs a file", async () => {
  const env = await setup();
  try {
    await built(env);
    const opts = { cards: { mode: "none" as const }, pixelate: false };
    const graph = async (extra: Record<string, unknown>) => {
      await render.methods.render.execute(
        renderArgs(env, { ...opts, ...extra }),
        env.swamp.context("render", {}),
      );
      return await Deno.readTextFile(`${env.dir}/take.video/graph.txt`);
    };
    const before = env.calls.length;
    await assertRejects(
      () => graph({ bedMode: "full" }),
      Error,
      "none is set",
    );
    assertEquals(env.calls.length, before);

    await media.methods.show.execute(
      {},
      env.swamp.context("media", {
        bed: "bed.mp3",
        bedMode: "full",
        bedLevel: -18,
        bedDuck: true,
      }),
    );
    const g = await graph({ media: "media" });
    assertStringIncludes(g, "volume='0.1259*clip((t-0.000)/1.5,0,1)");
    assertStringIncludes(g, "sidechaincompress");

    // The workflow's setting wins, and an empty one defers to media.
    const waits = await graph({ media: "media", bedMode: "waits" });
    assert(!waits.includes("sidechaincompress"));
    assert(
      env.swamp.logs.some((l) =>
        l.level === "warn" && l.msg.includes("bedDuck only applies")
      ),
    );
    await media.methods.show.execute(
      {},
      env.swamp.context("media", { bed: "bed.mp3" }),
    );
    assertStringIncludes(
      await graph({ media: "media", bedMode: "full" }),
      "volume='0.2512*clip(",
    );
    // An earlier record's explicit fade is honoured.
    await media.methods.show.execute(
      {},
      env.swamp.context("media", { bed: "bed.mp3", bedFadeSeconds: 0.4 }),
    );
    assertStringIncludes(
      await graph({ media: "media", bedMode: "full" }),
      "clip((t-0.000)/0.4,0,1)",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("render: each take's recorded start includes the intro, unless a hook plays first", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    const intro = { path: `${env.dir}/i.png`, seconds: 4.5 };
    const cards = { mode: "custom" as const, intro };
    const starts = async () => {
      await render.methods.render.execute(
        joinArgs(env, other, { cards }),
        env.swamp.context("render", {}),
      );
      const v = env.swamp.latest("render", "take-joined")!;
      return (v.takes as { startSeconds: number; seconds: number }[]);
    };
    const plain = await starts();
    assertEquals(plain[0].startSeconds, 3.8);
    assertEquals(plain[1].startSeconds, 3.8 + plain[0].seconds);

    await built(env, { coldOpenUntil: "this is a demo" });
    const hooked = await starts();
    assertEquals(hooked[0].startSeconds, 0);
    assertEquals(hooked[1].startSeconds, 3.8 + hooked[0].seconds);
  } finally {
    await teardown(env);
  }
});

Deno.test("render: a joined video uses its own cards, then the first take's, and warns before any others", async () => {
  const env = await setup();
  try {
    await built(env);
    const other = await secondTake(env);
    const write = (name: string, intro: string) =>
      env.swamp.context("my-brand", {}).writeResource("cards", name, {
        intro: { path: `${env.dir}/${intro}.png`, seconds: 5 },
      });
    const joinedIntro = async () => {
      await render.methods.render.execute(
        joinArgs(env, other, { cards: { mode: "brand", from: "my-brand" } }),
        env.swamp.context("render", {}),
      );
      const main = env.calls.findLast((c) =>
        c.args.includes("-/filter_complex")
      )!;
      return main.args.find((a) => a.endsWith(".png"));
    };
    const warned = () =>
      env.swamp.logs.some((l) =>
        l.level === "warn" && l.msg.includes("which may be another video's")
      );
    // Only some other video's cards: used, but said so.
    await write("elsewhere", "elsewhere");
    assertEquals(await joinedIntro(), `${env.dir}/elsewhere.png`);
    assert(warned());
    // The first take's beat cards written later for another take.
    env.swamp.logs.length = 0;
    await write("take", "first");
    await write("second", "second");
    assertEquals(await joinedIntro(), `${env.dir}/first.png`);
    assert(!warned());
    // The joined video's own beat them all.
    await write("take-joined", "own");
    assertEquals(await joinedIntro(), `${env.dir}/own.png`);
  } finally {
    await teardown(env);
  }
});
