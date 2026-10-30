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
  renderArgs,
  setup,
  teardown,
} from "./_lib/scenario.ts";
import { argAfter } from "./_lib/testing.ts";

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
