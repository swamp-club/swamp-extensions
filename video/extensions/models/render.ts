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
 * next to the recording. A take with a cold open plays its hook before the
 * intro card. Given `takes`, it joins several edited takes into one video with
 * one set of those files, named after `output`.
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
import { CrossfadeSeconds, drawTitleCard, resolveCards } from "./_lib/cards.ts";
import { coldOpenAt, type Item, type Span } from "./_lib/edit_list.ts";
import { run } from "./_lib/exec.ts";
import {
  buildGraph,
  checkJoin,
  checkOpening,
  type Encoder,
  encoderArgs,
  encoderGlobals,
  measureArgs,
  measureFilter,
  opening,
  parseLoudness,
  type RenderPlan,
  takeTimeline,
  usableLoudness,
} from "./_lib/graph.ts";
import {
  ensureWorkDir,
  type MediaInfo,
  probe,
  type Take,
  takeOf,
} from "./_lib/media.ts";
import type { Redaction } from "./_lib/screen.ts";
import { joinSrt } from "./_lib/srt.ts";
import { MediaSettingsSchema } from "./media.ts";
import { ScreenSchema } from "./screen.ts";

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

const FadingCardSchema = CardSchema.extend({ seconds: CrossfadeSeconds });

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
  intro: FadingCardSchema.optional(),
  outro: FadingCardSchema.optional(),
  lowerThird: CardSchema.extend({ at: z.number().min(0) }).optional(),
  fastForwardBadge: z.object({ path: z.string() }).optional(),
});

const RenderArgs = z.object({
  recordingPath: z.string().default("").describe(
    "The recording to render; or pass takes to join several",
  ),
  takes: z.array(z.string()).default([]).describe(
    "Two or more recordings to join into one video, in order",
  ),
  output: z.string().default("").describe(
    "takes: path of the joined files without their suffix (default: the first take's, plus .joined)",
  ),
  edit: z.string().default("edit").describe(
    "The @swamp/video/edit instance holding each take's edit list",
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
  bed: z.string().optional().describe("Bed music (overrides media)"),
  bedMode: z.enum(["", "waits", "full"]).default("").describe(
    "Where the bed plays: waits or full (overrides media; empty uses media)",
  ),
  burn: z.boolean().default(true).describe("Also write a burned-caption video"),
  voiceCleanup: z.boolean().default(false).describe(
    "Highpass, denoise and compress the voice before normalizing",
  ),
  twoPassLoudness: z.boolean().default(true),
});

function optionalPath(ctx: VideoContext, path?: string): string | undefined {
  return path ? resolvePath(ctx, path) : undefined;
}

/** The takes to render, and the take the finished files are named after. */
function renderTargets(
  ctx: VideoContext,
  args: { recordingPath: string; takes: string[]; output: string },
): { takes: Take[]; out: Take } {
  if (args.recordingPath && args.takes.length) {
    throw new Error("pass recordingPath or takes, not both");
  }
  if (!args.takes.length) {
    if (!args.recordingPath) throw new Error("pass recordingPath or takes");
    if (args.output) {
      throw new Error("output names a joined video: it needs takes");
    }
    const take = takeOf(resolvePath(ctx, args.recordingPath));
    return { takes: [take], out: take };
  }
  if (args.takes.length < 2) {
    throw new Error(
      "takes joins two or more recordings: pass one as recordingPath",
    );
  }
  const takes = args.takes.map((path) => takeOf(resolvePath(ctx, path)));
  const stem = args.output
    ? resolvePath(ctx, args.output).replace(/\.mp4$/i, "")
    : `${takes[0].stem}.joined`;
  // takeOf reads the last dot as an extension, and a stem can hold one: this
  // one's is ours, so "demo.joined" stays itself rather than becoming "demo".
  const out = takeOf(`${stem}.mp4`);
  const clash = takes.find((t) => t.stem === out.stem || t.name === out.name);
  if (clash) {
    throw new Error(
      `the joined video would overwrite ${clash.name}'s own render: ` +
        `pass a different output`,
    );
  }
  return { takes, out };
}

interface EditListData {
  items: Item[];
  spans: Span[];
  fps: number;
  speechTrack: number;
  coldOpenUntil?: number;
}

/** A take's credential boxes; a take with no analysis is refused, not skipped. */
async function readRedactions(
  ctx: VideoContext,
  instance: string,
  take: Take,
): Promise<Redaction[]> {
  const screen = await readTakeData(ctx, instance, "screen", take);
  if (!screen) {
    throw new Error(
      `no screen analysis for ${take.name} on ${instance}: run its analyze ` +
        `method, or pass pixelate=false to render without hiding credentials`,
    );
  }
  const parsed = ScreenSchema.shape.redactions.safeParse(screen.redactions);
  if (!parsed.success) {
    throw new Error(
      `the screen analysis for ${take.name} on ${instance} has ` +
        `malformed redactions: ` +
        parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ") +
        `; run its analyze method again`,
    );
  }
  return parsed.data;
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
  /** Seconds of cold open before the intro card, when there is one. */
  hookSeconds: z.number().optional(),
  /** A joined video's takes and where each starts in it, intro included. */
  takes: z.array(z.object({
    recording: z.string(),
    take: z.string(),
    startSeconds: z.number(),
    seconds: z.number(),
  })).optional(),
  cardsMode: z.string(),
  encoder: z.string(),
  redactions: z.number(),
  renderedAt: z.string(),
});

export const model = {
  type: "@swamp/video/render",
  version: "2026.11.05.1",
  globalArguments: GlobalArgs,
  upgrades: [
    {
      toVersion: "2026.10.30.1",
      description:
        "Render a take's cold open ahead of the intro card (no change without one)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.05.1",
      description:
        "Join several takes, and play the bed under the whole video (no change without them)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
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
        const { takes, out } = renderTargets(ctx, args);
        const joined = takes.length > 1;
        await ensureWorkDir(out);
        const media = MediaSettingsSchema.parse(
          args.media ? await readLatest(ctx, args.media, "settings") ?? {} : {},
        );
        const bedMode = args.bedMode || media.bedMode;
        const bed = optionalPath(ctx, args.bed ?? media.bed);
        if (bedMode === "full" && !bed) {
          throw new Error(
            "bedMode full plays a bed under the whole video, and none is set: " +
              "set bed on the media instance and run its show method",
          );
        }
        if (bedMode !== "full" && media.bedDuck) {
          ctx.logger.warn(
            "bedDuck only applies with bedMode full: ignoring it",
          );
        }
        if (!args.screen && args.pixelate) {
          ctx.logger.warn(
            "no screen instance given: nothing is pixelated (pass screen, or pixelate=false to silence this)",
          );
        }

        // Each take's own edit list, size and credentials.
        const lists: EditListData[] = [];
        const infos: MediaInfo[] = [];
        const redactions: Redaction[][] = [];
        for (const take of takes) {
          lists.push(
            await requireTakeData(
              ctx,
              args.edit,
              "editList",
              take,
              "run the edit instance's build (or import) method first",
            ) as unknown as EditListData,
          );
          infos.push(await probe(g.ffprobe, take.recording, ctx.signal));
          redactions.push(
            args.screen && args.pixelate
              ? await readRedactions(ctx, args.screen, take)
              : [],
          );
        }
        const [list] = lists;
        const width = media.width ?? infos[0].width;
        const height = media.height ?? infos[0].height;
        takes.forEach((take, k) => {
          if (k === 0) return;
          if (lists[k].fps !== list.fps) {
            ctx.logger.warn(
              `${take.name} runs at ${
                lists[k].fps
              } fps: converting it to the first take's ${list.fps}`,
            );
          }
          if (
            !media.width && !media.height &&
            (infos[k].width !== infos[0].width ||
              infos[k].height !== infos[0].height)
          ) {
            ctx.logger.warn(
              `${take.name} is ${infos[k].width}x${
                infos[k].height
              }: fitting it into the first take's ${width}x${height}`,
            );
          }
          if (lists[k].coldOpenUntil !== undefined) {
            ctx.logger.warn(
              `${take.name} has a cold open, but only the first take can: ignoring it`,
            );
          }
        });

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
          out,
          () =>
            drawTitleCard(
              g.chromium,
              out,
              args.cards,
              width,
              height,
              ctx.signal,
            ),
          joined ? takes[0] : undefined,
        );
        let hook = 0;
        if (list.coldOpenUntil !== undefined) {
          if (cards.intro) {
            hook = coldOpenAt(
              list.items,
              list.spans,
              list.fps,
              list.coldOpenUntil,
            );
          } else {
            ctx.logger.warn(
              "this take has a cold open but no intro card to follow it: rendering without one",
            );
          }
        }
        checkOpening(cards, hook, media.coldOpenTransition);
        const open = opening(cards, hook, media.coldOpenTransition);

        const sources = takes.map((take, k) => ({
          recording: take.recording,
          speechTrack: lists[k].speechTrack,
          fps: lists[k].fps,
          spans: lists[k].spans,
          redactions: redactions[k],
        }));
        const plan: RenderPlan = {
          ...sources[0],
          moreTakes: joined ? sources.slice(1) : undefined,
          takeTransition: media.takeTransition,
          width,
          height,
          cards,
          music: optionalPath(ctx, args.music ?? media.music),
          bed,
          bedMode,
          bedLevel: media.bedLevel,
          bedDuck: media.bedDuck,
          bedMin: media.bedMinSeconds,
          bedFade: media.bedFadeSeconds,
          bedMerge: media.bedMergeSeconds,
          hook: open.hook,
          hookTransition: media.coldOpenTransition,
          voiceCleanup: args.voiceCleanup,
          loudnessTarget: media.loudness,
          burn: args.burn,
          captions: "captions.srt",
          font: media.font,
        };
        checkJoin(plan);
        const timeline = takeTimeline(plan);

        // Burned captions go on the take before the intro; the soft ones
        // are shifted past it (from the hook's end, with a cold open).
        const captioned = takes.map((_, k) => ({
          items: structuredClone(lists[k].items),
          spans: lists[k].spans,
          fps: lists[k].fps,
          start: timeline.starts[k],
        }));
        await Deno.writeTextFile(
          `${out.workDir}/captions.srt`,
          joinSrt(captioned, 0, open.hook),
        );
        const srt = `${out.stem}.polished.srt`;
        await Deno.writeTextFile(
          srt,
          joinSrt(captioned, open.shift, open.hook),
        );

        if (args.twoPassLoudness) {
          ctx.logger.info("measuring loudness");
          // Each take on its own, so every one lands on the target.
          for (const source of [plan, ...(plan.moreTakes ?? [])]) {
            // Its own file per render, so two renders of one take can't swap
            // scripts; it goes once measured.
            const script = await Deno.makeTempFile({
              dir: out.workDir,
              prefix: "measure-",
              suffix: ".txt",
            });
            try {
              await Deno.writeTextFile(script, measureFilter(plan, source));
              const measured = await run({
                bin: g.ffmpeg,
                args: measureArgs(source, script),
                signal: ctx.signal,
              });
              const loudness = parseLoudness(measured.stderr);
              if (usableLoudness(loudness)) source.measured = loudness;
              else {
                ctx.logger.warn(
                  `${source.recording} measures as silent: normalizing it without a measurement`,
                );
              }
            } finally {
              await Deno.remove(script).catch(() => {});
            }
          }
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
        await Deno.writeTextFile(`${out.workDir}/graph.txt`, graph);
        const srtInput = built.inputs.filter((a) => a === "-i").length;
        const polished = `${out.stem}.polished.mp4`;
        const burned = `${out.stem}.captioned.mp4`;
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
            burned,
          );
        }
        ctx.logger.info(
          `rendering ${out.name} (${
            joined ? `${takes.length} takes, ` : ""
          }${encoder}, ${cards.intro ? "intro" : "no intro"}${
            open.hook ? `, ${open.hook.toFixed(1)}s cold open` : ""
          }, ` +
            `${redactions.flat().length} pixelated)`,
        );
        await run({
          bin: g.ffmpeg,
          args: cmd,
          cwd: out.workDir,
          signal: ctx.signal,
        });

        // 1280x720: YouTube's custom-thumbnail size, also fine elsewhere.
        const thumbnail = `${out.stem}.thumbnail.jpg`;
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

        const handle = await ctx.writeResource("video", out.name, {
          recording: out.recording,
          take: out.name,
          polished,
          captioned: args.burn ? burned : undefined,
          srt,
          thumbnail,
          durationSeconds: built.duration,
          introSeconds: open.shift,
          hookSeconds: open.hook || undefined,
          takes: joined
            ? takes.map((take, k) => ({
              recording: take.recording,
              take: take.name,
              // The intro comes first, unless a cold open's hook plays ahead
              // of it: then the first take starts at 0.
              startSeconds: k === 0 && open.hook
                ? 0
                : timeline.starts[k] + open.shift,
              seconds: timeline.seconds[k],
            }))
            : undefined,
          cardsMode: args.cards.mode,
          encoder,
          redactions: redactions.flat().length,
          renderedAt: new Date().toISOString(),
        });
        ctx.logger.info(`wrote ${polished}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
