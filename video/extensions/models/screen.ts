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
 * `@swamp/video/screen`: watch a take's screen. Idle stretches let the edit
 * list race through waits, the text timeline helps describe and chat edits,
 * the storyboard gives a glance at the whole take, and credentials found on
 * screen are pixelated by render (on by default).
 *
 * @module
 */

import { z } from "zod";
import { resolvePath, type VideoContext } from "./_lib/context.ts";
import { run, runText } from "./_lib/exec.ts";
import { ensureWorkDir, probe, takeOf } from "./_lib/media.ts";
import {
  findRedactions,
  type Frame,
  frameBoxes,
  parseDetect,
  parseTesseractTsv,
  type Rect,
  sampleTimes,
  storyboardArgs,
  storyboardFrames,
  timeline,
} from "./_lib/screen.ts";

const GlobalArgs = z.object({
  ffmpeg: z.string().default("ffmpeg"),
  ffprobe: z.string().default("ffprobe"),
  tesseract: z.string().default("tesseract"),
  concurrency: z.number().int().positive().default(6).describe(
    "Frames read at once",
  ),
});

const RectSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

const AnalyzeArgs = z.object({
  recordingPath: z.string(),
  crop: RectSchema.optional().describe(
    "The screen area of the recording, when it also holds a camera or frame",
  ),
  stillness: z.number().positive().default(0.001).describe(
    "freezedetect noise tolerance: how still counts as idle",
  ),
  minStill: z.number().positive().default(1.5).describe(
    "Seconds of stillness before a stretch counts as idle",
  ),
  activeEvery: z.number().positive().default(5).describe(
    "Read the screen every this many seconds while it is busy",
  ),
  ocr: z.boolean().default(true),
  redact: z.boolean().default(true).describe(
    "Find credentials on screen so render pixelates them",
  ),
  allow: z.array(z.string()).default([]).describe(
    "Text that looks secret but is fine to show",
  ),
});

export const ScreenSchema = z.object({
  recording: z.string(),
  take: z.string(),
  rect: RectSchema,
  idle: z.array(z.object({ start: z.number(), end: z.number() })),
  timeline: z.array(z.object({ at: z.number(), text: z.string() })),
  redactions: z.array(RectSchema.extend({
    start: z.number(),
    end: z.number(),
    kind: z.string(),
  })),
  storyboard: z.string().optional(),
  analyzedAt: z.string(),
});

async function inBatches<T, R>(
  items: T[],
  size: number,
  fn: (item: T, i: number) => Promise<R>,
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(
      ...await Promise.all(
        items.slice(i, i + size).map((item, k) => fn(item, i + k)),
      ),
    );
  }
  return out;
}

export const model = {
  type: "@swamp/video/screen",
  version: "2026.10.29.1",
  globalArguments: GlobalArgs,
  resources: {
    screen: {
      description:
        "Idle stretches, on-screen text timeline, credential boxes and storyboard of a take",
      schema: ScreenSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    analyze: {
      description:
        "Find idle stretches, read on-screen text, flag credentials, draw a storyboard",
      arguments: AnalyzeArgs,
      execute: async (
        args: z.infer<typeof AnalyzeArgs>,
        ctx: VideoContext,
      ) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        if (args.redact && !args.ocr) {
          throw new Error(
            "redact needs ocr: credentials are found by reading the screen (pass redact=false to skip both)",
          );
        }
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const info = await probe(g.ffprobe, take.recording, ctx.signal);
        await ensureWorkDir(take);
        const area: Rect = args.crop ??
          { x: 0, y: 0, width: info.width, height: info.height };
        const areaCrop = args.crop
          ? `crop=${area.width}:${area.height}:${area.x}:${area.y},`
          : "";
        ctx.logger.info(`watching the screen of ${take.name}`);
        const detect = await run({
          bin: g.ffmpeg,
          args: [
            "-hide_banner",
            "-nostats",
            "-i",
            take.recording,
            "-an",
            "-vf",
            `${areaCrop}cropdetect=limit=24:round=2:reset=0,` +
            `scale=w=min(iw\\,1280):h=-2,` +
            `freezedetect=n=${args.stillness}:d=${args.minStill}`,
            "-f",
            "null",
            "-",
          ],
          signal: ctx.signal,
        });
        const { rect, idle } = parseDetect(detect.stderr, area, info.duration);
        const crop = `crop=${rect.width}:${rect.height}:${rect.x}:${rect.y}`;
        // OCR wants roughly native-size text; upscale small recordings.
        const ocrScale = rect.width < 2000 ? 2 : 1;
        const framesDir = `${take.workDir}/frames`;
        await Deno.mkdir(framesDir, { recursive: true });
        const moments = sampleTimes(idle, info.duration, args.activeEvery);
        const frames: Frame[] = await inBatches(
          moments,
          g.concurrency,
          async (at, i) => {
            const path = `${framesDir}/frame-${String(i).padStart(4, "0")}.png`;
            await run({
              bin: g.ffmpeg,
              args: [
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                `${at}`,
                "-i",
                take.recording,
                "-frames:v",
                "1",
                "-vf",
                `${crop}${
                  ocrScale > 1 ? `,scale=iw*${ocrScale}:-2:flags=lanczos` : ""
                }`,
                path,
              ],
              signal: ctx.signal,
            });
            if (!args.ocr) return { at, path, text: "", words: [] };
            const tsv = await runText({
              bin: g.tesseract,
              args: [path, "-", "--psm", "3", "tsv"],
              signal: ctx.signal,
            });
            return { at, path, ...parseTesseractTsv(tsv) };
          },
        );
        const redactions = args.redact
          ? findRedactions(frames, rect, ocrScale, info.duration, args.allow, {
            width: info.width,
            height: info.height,
          })
          : [];
        let storyboard: string | undefined;
        const picked = storyboardFrames(frames);
        if (picked.length) {
          storyboard = `${take.workDir}/storyboard.png`;
          await run({
            bin: g.ffmpeg,
            args: storyboardArgs(
              picked,
              storyboard,
              (f) => frameBoxes(f.at, redactions, rect, ocrScale),
            ),
            signal: ctx.signal,
          });
        }
        const handle = await ctx.writeResource("screen", take.name, {
          recording: take.recording,
          take: take.name,
          rect,
          idle,
          timeline: timeline(frames, args.allow),
          redactions,
          storyboard,
          analyzedAt: new Date().toISOString(),
        });
        ctx.logger.info(
          `${take.name}: ${idle.length} idle stretches, ${frames.length} frames read, ` +
            `${redactions.length} credential boxes`,
        );
        for (const r of redactions) {
          ctx.logger.warn(
            `pixelating a ${r.kind} at ${r.start.toFixed(1)}-${
              r.end.toFixed(1)
            }s`,
          );
        }
        return { dataHandles: [handle] };
      },
    },
  },
};
