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
 * `@swamp/video/render`: apply a take's edit list and produce the finished
 * video: `<recording>.polished.mp4` (soft captions, plus `.polished.srt`),
 * `<recording>.captioned.mp4` (burned captions) and a 1280x720 thumbnail,
 * next to the recording.
 *
 * @module
 */

import { z } from "zod";
import {
  readLatest,
  readTakeData,
  requireTakeData,
  resolvePath,
  type VideoContext,
} from "./_lib/context.ts";
import { drawTitleCard, resolveCards } from "./_lib/cards.ts";
import type { Item, Span } from "./_lib/edit_list.ts";
import { run } from "./_lib/exec.ts";
import {
  buildGraph,
  type Encoder,
  encoderArgs,
  encoderGlobals,
  introShift,
  measureArgs,
  parseLoudness,
  type RenderPlan,
} from "./_lib/graph.ts";
import { ensureWorkDir, probe, takeOf } from "./_lib/media.ts";
import type { Redaction } from "./_lib/screen.ts";
import { buildSrt } from "./_lib/srt.ts";
import { MediaSettingsSchema } from "./media.ts";

const GlobalArgs = z.object({
  ffmpeg: z.string().default("ffmpeg"),
  ffprobe: z.string().default("ffprobe"),
  chromium: z.string().default("chromium").describe(
    "Headless browser that draws simple title cards",
  ),
});

const CardSchema = z.object({
  path: z.string(),
  seconds: z.number().positive(),
});

const CardsArgs = z.object({
  mode: z.enum(["simple", "none", "custom", "brand"]).default("simple")
    .describe(
      "simple (built-in title card), none, custom (your files or a behavior's cards), brand (@swamp/video/brand)",
    ),
  title: z.string().optional().describe("simple: the headline"),
  subtitle: z.string().optional(),
  kicker: z.string().optional().describe("simple: small label above the title"),
  from: z.string().optional().describe(
    "custom/brand: the instance whose cards resource to use",
  ),
  intro: CardSchema.optional(),
  outro: CardSchema.optional(),
  lowerThird: CardSchema.extend({ at: z.number().min(0) }).optional(),
  fastForwardBadge: z.object({ path: z.string() }).optional(),
});

const RenderArgs = z.object({
  recordingPath: z.string(),
  edit: z.string().default("edit").describe(
    "The @swamp/video/edit instance holding this take's edit list",
  ),
  screen: z.string().optional().describe(
    "A @swamp/video/screen instance; its credential boxes are pixelated",
  ),
  pixelate: z.boolean().default(true),
  media: z.string().optional().describe(
    "A @swamp/video/media instance with render settings",
  ),
  cards: CardsArgs.default({ mode: "simple" }),
  music: z.string().optional().describe("Intro music (overrides media)"),
  bed: z.string().optional().describe("Fast-forward bed (overrides media)"),
  burn: z.boolean().default(true).describe("Also write a burned-caption video"),
  voiceCleanup: z.boolean().default(false).describe(
    "Highpass, denoise and compress the voice before normalizing",
  ),
  twoPassLoudness: z.boolean().default(true),
});

function optionalPath(ctx: VideoContext, path?: string): string | undefined {
  return path ? resolvePath(ctx, path) : undefined;
}

export const VideoSchema = z.object({
  recording: z.string(),
  take: z.string(),
  polished: z.string(),
  captioned: z.string().optional(),
  srt: z.string(),
  thumbnail: z.string(),
  durationSeconds: z.number(),
  introSeconds: z.number(),
  cardsMode: z.string(),
  encoder: z.string(),
  redactions: z.number(),
  renderedAt: z.string(),
});

export const model = {
  type: "@swamp/video/render",
  version: "2026.10.29.1",
  globalArguments: GlobalArgs,
  resources: {
    video: {
      description: "The finished video's files and length",
      schema: VideoSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    render: {
      description:
        "Render the edit list: cards, music, captions, pixelation, loudness, thumbnail",
      arguments: RenderArgs,
      execute: async (args: z.infer<typeof RenderArgs>, ctx: VideoContext) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        await ensureWorkDir(take);
        const list = await requireTakeData(
          ctx,
          args.edit,
          "editList",
          take,
          "run the edit instance's build (or import) method first",
        ) as {
          items: Item[];
          spans: Span[];
          fps: number;
          speechTrack: number;
        };
        const media = MediaSettingsSchema.parse(
          args.media ? await readLatest(ctx, args.media, "settings") ?? {} : {},
        );
        const info = await probe(g.ffprobe, take.recording, ctx.signal);
        const width = media.width ?? info.width;
        const height = media.height ?? info.height;

        let redactions: Redaction[] = [];
        if (!args.screen && args.pixelate) {
          ctx.logger.warn(
            "no screen instance given: nothing is pixelated (pass screen, or pixelate=false to silence this)",
          );
        }
        if (args.screen && args.pixelate) {
          const screen = await readTakeData(
            ctx,
            args.screen,
            "screen",
            take,
          );
          if (!screen) {
            throw new Error(
              `no screen analysis for ${take.name} on ${args.screen}: run its analyze ` +
                `method, or pass pixelate=false to render without hiding credentials`,
            );
          }
          redactions = screen.redactions as Redaction[];
        }

        const cardsInput = {
          ...args.cards,
          intro: args.cards.intro &&
            {
              ...args.cards.intro,
              path: resolvePath(ctx, args.cards.intro.path),
            },
          outro: args.cards.outro &&
            {
              ...args.cards.outro,
              path: resolvePath(ctx, args.cards.outro.path),
            },
          lowerThird: args.cards.lowerThird &&
            {
              ...args.cards.lowerThird,
              path: resolvePath(ctx, args.cards.lowerThird.path),
            },
          fastForwardBadge: args.cards.fastForwardBadge &&
            { path: resolvePath(ctx, args.cards.fastForwardBadge.path) },
        };
        const cards = await resolveCards(
          ctx,
          cardsInput,
          take,
          () =>
            drawTitleCard(
              g.chromium,
              take,
              args.cards,
              width,
              height,
              ctx.signal,
            ),
        );
        const shift = introShift(cards);

        // Burned captions go on the take before the intro; the soft ones
        // are shifted past it.
        await Deno.writeTextFile(
          `${take.workDir}/captions.srt`,
          buildSrt(structuredClone(list.items), list.spans, list.fps),
        );
        const srt = `${take.stem}.polished.srt`;
        await Deno.writeTextFile(
          srt,
          buildSrt(structuredClone(list.items), list.spans, list.fps, shift),
        );

        const plan: RenderPlan = {
          recording: take.recording,
          speechTrack: list.speechTrack,
          fps: list.fps,
          width,
          height,
          spans: list.spans,
          redactions,
          cards,
          music: optionalPath(ctx, args.music ?? media.music),
          bed: optionalPath(ctx, args.bed ?? media.bed),
          bedMin: media.bedMinSeconds,
          bedFade: media.bedFadeSeconds,
          bedMerge: media.bedMergeSeconds,
          voiceCleanup: args.voiceCleanup,
          loudnessTarget: media.loudness,
          burn: args.burn,
          captions: "captions.srt",
          font: media.font,
        };
        if (args.twoPassLoudness) {
          ctx.logger.info("measuring loudness");
          const measured = await run({
            bin: g.ffmpeg,
            args: measureArgs(plan),
            signal: ctx.signal,
          });
          plan.measured = parseLoudness(measured.stderr);
        }

        const built = buildGraph(plan);
        const encoder = media.encoder as Encoder;
        const enc = encoderArgs(encoder, media.quality);
        let graph = built.graph;
        let video = built.video, videoBurned = built.videoBurned;
        if (enc.upload) {
          graph += `;\n[${video}]${enc.upload}[vup1]`;
          video = "vup1";
          if (videoBurned) {
            graph += `;\n[${videoBurned}]${enc.upload}[vup2]`;
            videoBurned = "vup2";
          }
        }
        await Deno.writeTextFile(`${take.workDir}/graph.txt`, graph);
        const srtInput = built.inputs.filter((a) => a === "-i").length;
        const polished = `${take.stem}.polished.mp4`;
        const captioned = `${take.stem}.captioned.mp4`;
        const cmd = [
          "-hide_banner",
          "-loglevel",
          "error",
          "-stats",
          "-y",
          ...encoderGlobals(encoder, media.vaapiDevice),
          ...built.inputs,
          "-i",
          srt,
          "-/filter_complex",
          "graph.txt",
          "-map",
          `[${video}]`,
          "-map",
          `[${built.audio}]`,
          "-map",
          `${srtInput}:s`,
          "-c:s",
          "mov_text",
          "-metadata:s:s:0",
          "language=eng",
          ...enc.args,
          polished,
        ];
        if (videoBurned && built.audioBurned) {
          cmd.push(
            "-map",
            `[${videoBurned}]`,
            "-map",
            `[${built.audioBurned}]`,
            ...enc.args,
            captioned,
          );
        }
        ctx.logger.info(
          `rendering ${take.name} (${encoder}, ${
            cards.intro ? "intro" : "no intro"
          }, ` +
            `${redactions.length} pixelated)`,
        );
        await run({
          bin: g.ffmpeg,
          args: cmd,
          cwd: take.workDir,
          signal: ctx.signal,
        });

        // 1280x720: YouTube's custom-thumbnail size, also fine elsewhere.
        const thumbnail = `${take.stem}.thumbnail.jpg`;
        const still = cards.intro &&
          /\.(png|jpe?g|webp)$/i.test(cards.intro.path);
        await run({
          bin: g.ffmpeg,
          args: [
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            ...(still ? [] : ["-ss", (built.duration * 0.1).toFixed(2)]),
            "-i",
            still ? cards.intro!.path : polished,
            "-frames:v",
            "1",
            "-vf",
            "scale=1280:720:force_original_aspect_ratio=decrease:flags=lanczos," +
            "pad=1280:720:(ow-iw)/2:(oh-ih)/2",
            "-q:v",
            "2",
            thumbnail,
          ],
          signal: ctx.signal,
        });

        const handle = await ctx.writeResource("video", take.name, {
          recording: take.recording,
          take: take.name,
          polished,
          captioned: args.burn ? captioned : undefined,
          srt,
          thumbnail,
          durationSeconds: built.duration,
          introSeconds: shift,
          cardsMode: args.cards.mode,
          encoder,
          redactions: redactions.length,
          renderedAt: new Date().toISOString(),
        });
        ctx.logger.info(`wrote ${polished}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
