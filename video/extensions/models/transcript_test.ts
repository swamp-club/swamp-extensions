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
  assertEquals,
  assertMatch,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { model as transcript } from "./transcript.ts";
import {
  DURATION,
  setup,
  teardown,
  transcribed,
  WORDS,
} from "./_lib/scenario.ts";
import { argAfter, probeJson } from "./_lib/testing.ts";
import type { Word } from "./_lib/edit_list.ts";

Deno.test("transcript: faster-whisper through uv, verbatim prompt, take-named record", async () => {
  const env = await setup();
  try {
    await transcribed(env);
    const uv = env.calls.find((c) => c.bin === "uv")!;
    assertEquals(uv.args.slice(0, 3), ["run", "--quiet", "--script"]);
    assertMatch(uv.args[3], /take\.video\/video_transcribe\.py$/);
    assertStringIncludes(uv.args[8], "Umm, so, uh");
    const t = env.swamp.latest("transcript", "take")!;
    assertEquals(t.backend, "faster-whisper");
    assertEquals(t.speechTrack, 0);
    assertEquals((t.segments as Word[][]).flat().length, 12);
    // the extracted WAV is removed afterwards
    await assertRejects(() => Deno.stat(`${env.dir}/take.video/speech.wav`));
  } finally {
    await teardown(env);
  }
});

Deno.test("transcript: the mic-only second track is the voice", async () => {
  const env = await setup({
    ffprobe: () => ({ stdout: probeJson(DURATION, 2) }),
  });
  try {
    await transcribed(env);
    const extract = env.calls.find((c) =>
      c.bin === "ffmpeg" && c.args.includes("pcm_s16le")
    )!;
    assertEquals(argAfter(extract, "-map"), "0:a:1");
    assertEquals(env.swamp.latest("transcript", "take")!.speechTrack, 1);
  } finally {
    await teardown(env);
  }
});

Deno.test("transcript: whisper-cpp backend needs its model and reads -ojf output", async () => {
  const env = await setup({
    "whisper-cli": async (req) => {
      await Deno.writeTextFile(
        `${argAfter(req, "-of")}.json`,
        JSON.stringify({
          transcription: [{
            tokens: [
              { text: "[_BEG_]", offsets: { from: 0, to: 0 } },
              { text: " Hel", offsets: { from: 1000, to: 1200 } },
              { text: "lo", offsets: { from: 1200, to: 1400 } },
              { text: ",", offsets: { from: 1400, to: 1450 } },
              { text: " um", offsets: { from: 1500, to: 1800 } },
            ],
          }],
        }),
      );
      return {};
    },
  });
  try {
    const ctx = () =>
      env.swamp.context("transcript", {
        backend: "whisper-cpp",
        modelDir: env.dir,
      });
    await assertRejects(
      () =>
        transcript.methods.transcribe.execute(
          { recordingPath: env.rec },
          ctx(),
        ),
      Error,
      "ggml-large-v3-turbo.bin",
    );
    await Deno.writeTextFile(`${env.dir}/ggml-large-v3-turbo.bin`, "");
    await transcript.methods.transcribe.execute(
      { recordingPath: env.rec },
      ctx(),
    );
    assertEquals(env.swamp.latest("transcript", "take")!.segments, [[
      { w: " Hello,", s: 1, e: 1.45 },
      { w: " um", s: 1.5, e: 1.8 },
    ]]);
  } finally {
    await teardown(env);
  }
});

Deno.test("transcript: import takes a demo-polish transcript.json", async () => {
  const env = await setup();
  try {
    await Deno.writeTextFile(
      `${env.dir}/transcript.json`,
      JSON.stringify(WORDS),
    );
    await transcript.methods.import.execute(
      { recordingPath: env.rec, transcriptPath: `${env.dir}/transcript.json` },
      env.swamp.context("transcript", {}),
    );
    assertEquals(env.swamp.latest("transcript", "take")!.backend, "imported");
    assertEquals(env.calls.filter((c) => c.bin === "uv").length, 0);
  } finally {
    await teardown(env);
  }
});
