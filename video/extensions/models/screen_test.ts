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
import { model as screen } from "./screen.ts";
import { analyzed, DURATION, setup, teardown } from "./_lib/scenario.ts";
import { argAfter } from "./_lib/testing.ts";

/** The per-run frame folders left in the take's work folder. */
async function framesDirs(dir: string): Promise<string[]> {
  const out: string[] = [];
  for await (const e of Deno.readDir(`${dir}/take.video`)) {
    if (e.name.startsWith("frames")) out.push(e.name);
  }
  return out;
}

Deno.test("screen: idle stretches, text timeline, credential boxes, storyboard", async () => {
  const env = await setup();
  try {
    const s = await analyzed(env);
    assertEquals(s.rect, { x: 0, y: 20, width: 1920, height: 1040 });
    assertEquals(s.idle, [{ start: 3.2, end: 23.5 }]);
    assertEquals(s.timeline.length, 1);
    // the stored timeline never holds the key it found
    assertStringIncludes(s.timeline[0].text, "[aws-key redacted]");
    assert(!s.timeline[0].text.includes("AKIA"));
    assertEquals(s.redactions.length, 1);
    assertEquals(s.redactions[0].kind, "aws-key");
    // OCR ran on a 2x upscale: boxes come back in recording pixels
    // 0 + 190 / 2 - 6 = 89, rounded outward to even
    assertEquals(s.redactions[0].x, 88);
    assertEquals(s.redactions[0].width, 216);
    assertEquals([s.redactions[0].start, s.redactions[0].end], [0, DURATION]);
    assertMatch(s.storyboard!, /take\.video\/storyboard\.png$/);
    // the raw frames OCR read are gone; the pixelated storyboard stays
    assertEquals(await framesDirs(env.dir), []);
    const frame = env.calls.find((c) =>
      c.args.includes("-frames:v") && c.args.includes("-ss")
    )!;
    assertStringIncludes(
      argAfter(frame, "-vf")!,
      "crop=1920:1040:0:20,scale=iw*2",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: the allow list keeps known-safe text visible", async () => {
  const env = await setup();
  try {
    await screen.methods.analyze.execute(
      {
        recordingPath: env.rec,
        stillness: 0.001,
        minStill: 1.5,
        activeEvery: 5,
        ocr: true,
        redact: true,
        allow: ["AKIAABCDEFGHIJKLMNOP"],
      },
      env.swamp.context("screen", {}),
    );
    assertEquals(
      (env.swamp.latest("screen", "take")!.redactions as unknown[]).length,
      0,
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: redact without ocr is refused rather than finding nothing", async () => {
  const env = await setup();
  try {
    await assertRejects(
      () =>
        screen.methods.analyze.execute(
          {
            recordingPath: env.rec,
            stillness: 0.001,
            minStill: 1.5,
            activeEvery: 5,
            ocr: false,
            redact: true,
            allow: [],
          },
          env.swamp.context("screen", {}),
        ),
      Error,
      "redact needs ocr",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: the raw frames are deleted even when analysis fails", async () => {
  const env = await setup({
    tesseract: () => {
      throw new Error("tesseract crashed");
    },
  });
  try {
    await assertRejects(() => analyzed(env), Error, "tesseract crashed");
    assertEquals(await framesDirs(env.dir), []);
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: a failed frame lets the rest of its batch finish before cleanup", async () => {
  let running = 0;
  let finishedAfterFailure = 0;
  let failed = false;
  const env = await setup({
    tesseract: async (req) => {
      running++;
      try {
        if (req.args[0].endsWith("frame-0000.png")) {
          throw new Error("tesseract crashed");
        }
        await new Promise((r) => setTimeout(r, 20));
        if (failed) finishedAfterFailure++;
        return { stdout: new TextEncoder().encode("") };
      } finally {
        running--;
        if (req.args[0].endsWith("frame-0000.png")) failed = true;
      }
    },
  });
  try {
    await assertRejects(() => analyzed(env), Error, "tesseract crashed");
    // nothing of the failed batch was still running when the frames went
    assertEquals(running, 0);
    assert(finishedAfterFailure > 0);
    assertEquals(await framesDirs(env.dir), []);
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: frames are sampled into a folder of the run's own", async () => {
  const env = await setup();
  try {
    await analyzed(env);
    const frame = env.calls.find((c) =>
      c.args.includes("-frames:v") && c.args.includes("-ss")
    )!;
    assertMatch(
      frame.args[frame.args.length - 1],
      /take\.video\/frames-[^/]+\/frame-0000\.png$/,
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("screen: raw frames an earlier version left behind are deleted", async () => {
  const env = await setup();
  try {
    await Deno.mkdir(`${env.dir}/take.video/frames`, { recursive: true });
    await Deno.writeTextFile(
      `${env.dir}/take.video/frames/frame-0000.png`,
      "raw",
    );
    await analyzed(env);
    assertEquals(await framesDirs(env.dir), []);
  } finally {
    await teardown(env);
  }
});
