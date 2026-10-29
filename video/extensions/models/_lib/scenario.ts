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

/**
 * One small take shared by the behavior tests: a transcript with a filler,
 * a 30s agent wait and a spoken retake; a screen with an AWS key on it; and
 * fake ffmpeg, ffprobe, uv, tesseract and chromium answering for them.
 *
 * @module
 */

import { model as transcript } from "../transcript.ts";
import { model as edit } from "../edit.ts";
import { model as screen } from "../screen.ts";
import type { ExecRequest } from "./exec.ts";
import {
  fakeExec,
  FakeSwamp,
  type Handler,
  pcm,
  probeJson,
  resetCommandExecutor,
  text,
} from "./testing.ts";
import type { Word } from "./edit_list.ts";

export const DURATION = 60;

// "Hello, um, this is a demo." then a 30s agent wait (screen idle for the
// first 20s of it), "It works. retake It really works." and a tail.

export const WORDS: Word[][] = [[
  { w: " Hello,", s: 1.0, e: 1.4 },
  { w: " um,", s: 1.5, e: 1.8 },
  { w: " this", s: 1.9, e: 2.1 },
  { w: " is", s: 2.15, e: 2.3 },
  { w: " a", s: 2.35, e: 2.4 },
  { w: " demo.", s: 2.45, e: 2.9 },
], [
  { w: " It", s: 33.0, e: 33.2 },
  { w: " works.", s: 33.25, e: 33.7 },
  { w: " retake", s: 34.5, e: 34.9 },
  { w: " It", s: 35.5, e: 35.7 },
  { w: " really", s: 35.75, e: 36.1 },
  { w: " works.", s: 36.15, e: 36.6 },
]];

export const SPEECH: [number, number][] = WORDS.flat().map((w) => [w.s, w.e]);

export const TSV = [
  "level\tpage_num\tblock_num\tpar_num\tline_num\tword_num\tleft\ttop\twidth\theight\tconf\ttext",
  "5\t1\t1\t1\t1\t1\t100\t200\t80\t20\t95\texport",
  "5\t1\t1\t1\t1\t2\t190\t200\t400\t20\t95\tAWS_KEY=AKIAABCDEFGHIJKLMNOP",
].join("\n");

export const LOUDNORM = `[Parsed_loudnorm_0 @ 0x1]
{
\t"input_i" : "-23.10",
\t"input_tp" : "-4.20",
\t"input_lra" : "6.50",
\t"input_thresh" : "-33.40",
\t"output_i" : "-14.00",
\t"target_offset" : "0.10"
}`;

export interface Env {
  dir: string;
  rec: string;
  swamp: FakeSwamp;
  calls: ExecRequest[];
}

export async function setup(extra: Record<string, Handler> = {}): Promise<Env> {
  const dir = await Deno.makeTempDir({ prefix: "video-test-" });
  const rec = `${dir}/take.mkv`;
  await Deno.writeTextFile(rec, "not really a video");
  const swamp = new FakeSwamp();
  const calls = fakeExec({
    ffprobe: () => ({ stdout: probeJson(DURATION) }),
    ffmpeg: async (req) => {
      const args = req.args.join(" ");
      if (args.includes("-f s16le")) return { stdout: pcm(DURATION, SPEECH) };
      if (args.includes("freezedetect")) {
        return {
          stderr: "[Parsed_cropdetect_0] crop=1920:1040:0:20\n" +
            "[freezedetect] lavfi.freezedetect.freeze_start: 3.2\n" +
            "[freezedetect] lavfi.freezedetect.freeze_end: 23.5\n",
        };
      }
      if (args.includes("print_format=json")) return { stderr: LOUDNORM };
      const out = req.args[req.args.length - 1];
      if (
        out.endsWith(".png") || out.endsWith(".jpg") || out.endsWith(".mp4")
      ) {
        await Deno.writeTextFile(req.cwd ? `${req.cwd}/${out}` : out, "x")
          .catch(() => Deno.writeTextFile(out, "x"));
      }
      return {};
    },
    uv: async (req) => {
      // video_transcribe.py wav out model lang prompt threads
      const out = req.args[5];
      await Deno.writeTextFile(out, JSON.stringify(WORDS));
      return {};
    },
    tesseract: () => ({ stdout: text(TSV) }),
    chromium: async (req) => {
      const shot = req.args.find((a) => a.startsWith("--screenshot="))!;
      await Deno.writeTextFile(shot.slice("--screenshot=".length), "png");
      return {};
    },
    ...extra,
  });
  return { dir, rec, swamp, calls };
}

export async function teardown(env: Env) {
  resetCommandExecutor();
  await Deno.remove(env.dir, { recursive: true });
}

export async function transcribed(env: Env) {
  await transcript.methods.transcribe.execute(
    { recordingPath: env.rec },
    env.swamp.context("transcript", { threads: 4 }),
  );
}

export async function built(env: Env, args: Record<string, unknown> = {}) {
  await transcribed(env);
  await edit.methods.build.execute(
    {
      recordingPath: env.rec,
      transcript: "transcript",
      retakeMarkers: [],
      spokenRetakes: true,
      ...args,
    },
    env.swamp.context("edit", {}),
  );
  return env.swamp.latest("edit", "take") as {
    items: {
      kind: string;
      token: string;
      keep: boolean;
      speed: number;
      text: string;
      s: number;
      e: number;
    }[];
    spans: [number, number, number][];
    outputDuration: number;
    editFile: string;
  };
}

export async function analyzed(env: Env) {
  await screen.methods.analyze.execute(
    {
      recordingPath: env.rec,
      stillness: 0.001,
      minStill: 1.5,
      activeEvery: 5,
      ocr: true,
      redact: true,
      allow: [],
    },
    env.swamp.context("screen", { concurrency: 3 }),
  );
  return env.swamp.latest("screen", "take") as {
    rect: Record<string, number>;
    idle: { start: number; end: number }[];
    timeline: { at: number; text: string }[];
    redactions: {
      x: number;
      width: number;
      kind: string;
      start: number;
      end: number;
    }[];
    storyboard?: string;
  };
}

export function renderArgs(env: Env, extra: Record<string, unknown> = {}) {
  return {
    recordingPath: env.rec,
    edit: "edit",
    pixelate: true,
    cards: { mode: "simple" as const, title: "A demo" },
    burn: true,
    voiceCleanup: false,
    twoPassLoudness: true,
    ...extra,
  };
}
