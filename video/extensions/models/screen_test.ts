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
