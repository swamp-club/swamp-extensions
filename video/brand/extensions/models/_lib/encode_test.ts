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
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { encodeArgs, maskArgs, renderClip } from "./encode.ts";
import { fakeExec, fakeScenes, resetFakes } from "./testing.ts";

const logger = { debug() {}, info() {}, warn() {}, error() {} };

Deno.test("each clip kind gets its codec: H.264 cards, alpha overlays, VP9 ring", () => {
  const card = encodeArgs("card", "/f", 30, "/o/intro.mp4");
  assertEquals(card.slice(card.indexOf("-framerate"), card.indexOf("-i") + 2), [
    "-framerate",
    "30",
    "-i",
    "/f/f%05d.png",
  ]);
  assert(card.includes("libx264") && card.includes("yuv420p"));
  assertEquals(card.at(-1), "/o/intro.mp4");
  const overlay = encodeArgs("overlay", "/f", 30, "/o/lt.mov");
  assertEquals(overlay.slice(-5), [
    "-c:v",
    "qtrle",
    "-pix_fmt",
    "argb",
    "/o/lt.mov",
  ]);
  const ring = encodeArgs("ring", "/f", 30, "/o/ring.webm", {
    x: 1476,
    y: 636,
    width: 420,
    height: 420,
  });
  assert(ring.includes("crop=420:420:1476:636"));
  assert(ring.includes("libvpx-vp9") && ring.includes("yuva420p"));
  assertThrows(
    () => encodeArgs("ring", "/f", 30, "/o/ring.webm"),
    Error,
    "crop",
  );
  assert(maskArgs("/o/mask.png").includes("/o/mask.png"));
});

Deno.test("renderClip: one frame per output frame, then ffmpeg, then the frames go", async () => {
  const dir = await Deno.makeTempDir();
  const calls = fakeExec();
  const scenes = fakeScenes();
  try {
    await Deno.writeTextFile(`${dir}/lt.html`, "<p>scene</p>");
    await renderClip({
      chromium: "chromium",
      ffmpeg: "ffmpeg",
      page: `${dir}/lt.html`,
      seconds: 2,
      fps: 30,
      width: 1920,
      height: 1080,
      kind: "overlay",
      out: `${dir}/lt.mov`,
      framesDir: `${dir}/lt.frames`,
      logger,
    });
    assertEquals(scenes.length, 1);
    assertEquals(scenes[0].opts.transparent, true);
    assertEquals(scenes[0].frames.length, 60);
    assertEquals(scenes[0].frames[30], 1);
    assert(scenes[0].closed);
    assertEquals(calls.length, 1);
    assertEquals(calls[0].bin, "ffmpeg");
    assert(calls[0].args.includes(`${dir}/lt.frames/f%05d.png`));
    await assertRejects(() => Deno.stat(`${dir}/lt.frames`));
  } finally {
    resetFakes();
    await Deno.remove(dir, { recursive: true });
  }
});
