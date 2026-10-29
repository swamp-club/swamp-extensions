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
 * `@swamp/video/transcript`: a verbatim, word-timed transcript of a take's
 * voice track, in raw recording time. Its own behavior so a workflow can run
 * it alongside screen analysis.
 *
 * @module
 */

import { z } from "zod";
import { expandHome, resolvePath, type VideoContext } from "./_lib/context.ts";
import type { Word } from "./_lib/edit_list.ts";
import { probe, speechTrack, takeOf } from "./_lib/media.ts";
import {
  type Backend,
  transcribe,
  VERBATIM_PROMPT,
} from "./_lib/transcribe.ts";

const GlobalArgs = z.object({
  backend: z.enum(["faster-whisper", "whisper-cpp"]).default("faster-whisper")
    .describe(
      "faster-whisper (default, run through uv) or whisper-cpp (whisper-cli)",
    ),
  model: z.string().default("large-v3-turbo").describe("Whisper model name"),
  language: z.string().default("en"),
  prompt: z.string().default(VERBATIM_PROMPT).describe(
    "Initial prompt; the default shows fillers transcribed verbatim so Whisper keeps them",
  ),
  vocabulary: z.array(z.string()).default([]).describe(
    "Names and terms appended to the prompt so Whisper spells them right",
  ),
  threads: z.number().int().positive().default(8),
  ffmpeg: z.string().default("ffmpeg"),
  ffprobe: z.string().default("ffprobe"),
  uv: z.string().default("uv"),
  whisperCli: z.string().default("whisper-cli"),
  modelDir: z.string().default("~/.cache/whisper.cpp").describe(
    "Where whisper-cpp looks for ggml-<model>.bin",
  ),
});

const WordSchema = z.object({ w: z.string(), s: z.number(), e: z.number() });

export const TranscriptSchema = z.object({
  recording: z.string(),
  take: z.string(),
  segments: z.array(z.array(WordSchema)),
  backend: z.string(),
  model: z.string(),
  language: z.string(),
  duration: z.number(),
  fps: z.number(),
  speechTrack: z.number(),
  createdAt: z.string(),
});

export type Transcript = z.infer<typeof TranscriptSchema>;

const TranscribeArgs = z.object({
  recordingPath: z.string().describe("The recording to transcribe"),
  speechTrack: z.number().int().min(0).optional().describe(
    "Audio track with the voice (default: a second, mic-only track when present, else the first)",
  ),
});

const ImportArgs = z.object({
  recordingPath: z.string(),
  transcriptPath: z.string().describe(
    "A demo-polish transcript.json (segments of {w, s, e})",
  ),
  speechTrack: z.number().int().min(0).optional(),
});

async function save(
  ctx: VideoContext,
  recordingPath: string,
  segments: Word[][],
  backend: string,
  track: number | undefined,
) {
  const g = GlobalArgs.parse(ctx.globalArgs);
  const take = takeOf(resolvePath(ctx, recordingPath));
  const info = await probe(g.ffprobe, take.recording, ctx.signal);
  const data: Transcript = {
    recording: take.recording,
    take: take.name,
    segments,
    backend,
    model: g.model,
    language: g.language,
    duration: info.duration,
    fps: info.fps,
    speechTrack: speechTrack(info, track),
    createdAt: new Date().toISOString(),
  };
  const handle = await ctx.writeResource("transcript", take.name, data);
  const words = segments.reduce((n, s) => n + s.length, 0);
  ctx.logger.info(`transcript for ${take.name}: ${words} words`);
  return { dataHandles: [handle] };
}

export const model = {
  type: "@swamp/video/transcript",
  version: "2026.10.29.1",
  globalArguments: GlobalArgs,
  resources: {
    transcript: {
      description:
        "Word-timed verbatim transcript of a take, named after the take",
      schema: TranscriptSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    transcribe: {
      description:
        "Transcribe a recording's voice track with word timings, keeping fillers",
      arguments: TranscribeArgs,
      execute: async (
        args: z.infer<typeof TranscribeArgs>,
        ctx: VideoContext,
      ) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const info = await probe(g.ffprobe, take.recording, ctx.signal);
        const track = speechTrack(info, args.speechTrack);
        ctx.logger.info(
          `transcribing ${take.name} (track ${track}) with ${g.backend} ${g.model}`,
        );
        const segments = await transcribe(take, track, {
          backend: g.backend as Backend,
          model: g.model,
          language: g.language,
          prompt: g.prompt,
          vocabulary: g.vocabulary,
          threads: g.threads,
          ffmpeg: g.ffmpeg,
          uv: g.uv,
          whisperCli: g.whisperCli,
          modelDir: expandHome(g.modelDir),
          signal: ctx.signal,
        });
        return await save(ctx, args.recordingPath, segments, g.backend, track);
      },
    },
    import: {
      description:
        "Use an existing demo-polish transcript.json instead of transcribing",
      arguments: ImportArgs,
      execute: async (args: z.infer<typeof ImportArgs>, ctx: VideoContext) => {
        const raw = JSON.parse(
          await Deno.readTextFile(resolvePath(ctx, args.transcriptPath)),
        );
        const segments = z.array(z.array(WordSchema)).parse(raw);
        return await save(
          ctx,
          args.recordingPath,
          segments,
          "imported",
          args.speechTrack,
        );
      },
    },
  },
};
