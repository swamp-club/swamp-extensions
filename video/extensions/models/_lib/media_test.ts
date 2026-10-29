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

import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import { energy, envelope, parseProbe, speechTrack, takeOf } from "./media.ts";
import { fakeExec, pcm, resetCommandExecutor } from "./testing.ts";

Deno.test("takeOf: work dir next to the recording, data-safe name", () => {
  assertEquals(takeOf("/v/My Demo (2).mkv"), {
    recording: "/v/My Demo (2).mkv",
    stem: "/v/My Demo (2)",
    name: "my-demo-2",
    workDir: "/v/My Demo (2).video",
  });
  assertEquals(takeOf("/v/../x.mkv").name, "x");
});

Deno.test("parseProbe: variable frame rates fall back to 30; audio is required", () => {
  const json = (fps: string, audio = true) =>
    JSON.stringify({
      streams: [
        { codec_type: "video", r_frame_rate: fps, width: 2560, height: 1440 },
        ...(audio ? [{ codec_type: "audio" }, { codec_type: "audio" }] : []),
      ],
      format: { duration: "12.5" },
    });
  assertEquals(parseProbe(json("60/1")).fps, 60);
  assertEquals(parseProbe(json("1000/1")).fps, 30);
  assertEquals(parseProbe(json("30000/1001")).audioTracks, 2);
  assertThrows(() => parseProbe(json("30/1", false)), Error, "no audio track");
});

Deno.test("speechTrack: mic-only second track unless told otherwise", () => {
  const info = { fps: 30, duration: 1, width: 1, height: 1, audioTracks: 2 };
  assertEquals(speechTrack(info), 1);
  assertEquals(speechTrack({ ...info, audioTracks: 1 }), 0);
  assertEquals(speechTrack(info, 0), 0);
});

Deno.test("envelope: dB per 10 ms, loud speech and digital silence", () => {
  const db = envelope(pcm(0.05, [[0.02, 0.03]]));
  assertEquals(db.length, 5);
  assertEquals(db[0], -120);
  assertEquals(db[2], -12.2); // 20*log10(8000/32768) = -12.25
});

Deno.test("energy: the cache is keyed by track and recording", async () => {
  const dir = await Deno.makeTempDir({ prefix: "video-energy-" });
  try {
    const take = takeOf(`${dir}/t.mkv`);
    await Deno.writeTextFile(take.recording, "x");
    const calls = fakeExec({ ffmpeg: () => ({ stdout: pcm(0.02, []) }) });
    await energy("ffmpeg", take, 0);
    await energy("ffmpeg", take, 0);
    assertEquals(calls.length, 1);
    await energy("ffmpeg", take, 1);
    assertEquals(calls.length, 2);
    await Deno.writeTextFile(take.recording, "re-recorded");
    await energy("ffmpeg", take, 1);
    assertEquals(calls.length, 3);
  } finally {
    resetCommandExecutor();
    await Deno.remove(dir, { recursive: true });
  }
});
