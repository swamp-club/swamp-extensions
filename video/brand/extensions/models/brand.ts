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
 * `@swamp/video/brand`: the Swamp Club look for @swamp/video.
 *
 * - `cards` renders a take's intro, outro (with a QR code to the
 *   presenter's campaign page), presenter lower third and FAST FORWARD
 *   badge, and writes them as @swamp/video's cards contract under the
 *   take's name, so render with `cards: brand` picks them up.
 * - `stage` renders the OBS studio look: the backdrop behind the screen
 *   share, a looping neon ring and a circular mask for the webcam, and
 *   their layout, for @swamp/video/obs to build its scene from.
 *
 * Who is on screen comes from a @swamp/video/presenter instance; nothing
 * personal lives in the code.
 *
 * @module
 */

import { z } from "zod";
import {
  type BrandAssets,
  brandDirAssets,
  embeddedAssets,
} from "./_lib/assets.ts";
import {
  type BrandContext,
  readLatest,
  resolvePath,
  takeOf,
} from "./_lib/context.ts";
import {
  CardsResourceSchema,
  type Presenter,
  PresenterSchema,
  StageSchema,
} from "./_lib/contract.ts";
import { maskArgs, renderClip, renderStill } from "./_lib/encode.ts";
import { run } from "./_lib/exec.ts";
import { qrSvg } from "./_lib/qr.ts";
import { checkStageSize } from "./_lib/scene.ts";
import {
  backdropHtml,
  CAMERA_RING_LOOP_SECONDS,
  cameraRingHtml,
  FAST_FORWARD_LOOP_SECONDS,
  fastForwardHtml,
  introHtml,
  lowerThirdHtml,
  outroHtml,
  STAGE_WIDTH,
  stageLayout,
} from "./_lib/templates.ts";

const GlobalArgs = z.object({
  brandDir: z.string().optional().describe(
    "Your own brand directory (fonts/, palm-silhouette.svg, sc-mark.svg); the Swamp Club set by default",
  ),
  screenScale: z.number().min(0.5).max(1).default(0.8).describe(
    "Screen share size on the OBS stage, as a fraction of the canvas",
  ),
  cameraSize: z.number().int().min(120).max(600).default(300).describe(
    "Webcam circle diameter in 1920x1080 stage pixels (bottom-right, inside the ring)",
  ),
  width: z.number().int().positive().default(1920),
  height: z.number().int().positive().default(1080),
  fps: z.number().int().positive().default(30),
  chromium: z.string().default("chromium").describe(
    "Headless browser that draws the scenes",
  ),
  ffmpeg: z.string().default("ffmpeg"),
});

type Globals = z.infer<typeof GlobalArgs>;

// Longer than render's 0.7s crossfade, which needs the card on screen.
const Seconds = z.number().min(1);

const CardsArgs = z.object({
  recordingPath: z.string().describe("The recording the cards are for"),
  presenter: z.string().default("presenter").describe(
    "The @swamp/video/presenter instance who is on screen",
  ),
  title: z.string().min(1).describe("Headline on the intro"),
  subtitle: z.string().default(""),
  episode: z.string().default("Demo").describe(
    "Label above the title, e.g. Tutorial or Episode 3",
  ),
  introSeconds: Seconds.default(5.5),
  outroSeconds: Seconds.default(8),
  lowerThirdSeconds: Seconds.default(6),
  lowerThirdAt: z.number().min(0).default(1.5).describe(
    "Seconds into the take the lower third slides in",
  ),
});

const StageArgs = z.object({
  presenter: z.string().default("presenter").describe(
    "The @swamp/video/presenter instance whose handle the backdrop shows",
  ),
  dir: z.string().default("video-stage").describe(
    "Where the studio files go (relative to the repo)",
  ),
});

const CardsDataSchema = CardsResourceSchema.extend({
  recording: z.string(),
  presenter: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  renderedAt: z.string(),
});

async function loadPresenter(
  ctx: BrandContext,
  instance: string,
): Promise<Presenter> {
  const data = await readLatest(ctx, instance, "presenter");
  if (!data) {
    throw new Error(
      `no presenter on ${instance}: create one with ` +
        `swamp model create @swamp/video/presenter ${instance} --global-arg "name=Your Name" ... ` +
        `and run its show method`,
    );
  }
  return PresenterSchema.parse(data);
}

function loadAssets(ctx: BrandContext, g: Globals): Promise<BrandAssets> {
  return g.brandDir
    ? brandDirAssets(resolvePath(ctx, g.brandDir))
    : Promise.resolve(embeddedAssets());
}

export const model = {
  type: "@swamp/video/brand",
  version: "2026.10.29.1",
  globalArguments: GlobalArgs,
  resources: {
    cards: {
      description:
        "A take's Swamp Club cards, in @swamp/video's cards contract",
      schema: CardsDataSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    stage: {
      description:
        "The OBS studio look: backdrop, webcam ring and mask, and their layout",
      schema: StageSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    cards: {
      description:
        "Render a take's intro, outro with QR code, lower third and fast-forward badge for render's brand cards",
      arguments: CardsArgs,
      execute: async (args: z.infer<typeof CardsArgs>, ctx: BrandContext) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        checkStageSize(g.width, g.height);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const presenter = await loadPresenter(ctx, args.presenter);
        const assets = await loadAssets(ctx, g);
        const layout = stageLayout(g.screenScale, g.cameraSize);
        const dir = `${take.workDir}/brand`;
        await Deno.mkdir(dir, { recursive: true });

        const pages = {
          intro: introHtml({
            assets,
            episode: args.episode,
            title: args.title,
            subtitle: args.subtitle,
            presenter,
          }),
          outro: outroHtml({
            assets,
            presenter,
            qrSvg: presenter.campaignUrl ? qrSvg(presenter.campaignUrl) : "",
            seconds: args.outroSeconds,
          }),
          "lower-third": lowerThirdHtml({
            assets,
            presenter,
            layout,
            seconds: args.lowerThirdSeconds,
          }),
          "fast-forward": fastForwardHtml({ assets, layout }),
        };
        for (const [name, html] of Object.entries(pages)) {
          await Deno.writeTextFile(`${dir}/${name}.html`, html);
        }

        const clip = (
          name: keyof typeof pages,
          kind: "card" | "overlay",
          seconds: number,
          out: string,
        ) => {
          ctx.logger.info(`rendering the ${name} (${seconds}s)`);
          return renderClip({
            chromium: g.chromium,
            ffmpeg: g.ffmpeg,
            page: `${dir}/${name}.html`,
            seconds,
            fps: g.fps,
            width: g.width,
            height: g.height,
            kind,
            out,
            framesDir: `${dir}/${name}.frames`,
            logger: ctx.logger,
            signal: ctx.signal,
          });
        };
        const intro = `${dir}/intro.mp4`;
        const outro = `${dir}/outro.mp4`;
        const lowerThird = `${dir}/lower-third.mov`;
        const badge = `${dir}/fast-forward.mov`;
        const thumbnail = `${dir}/thumbnail.png`;
        await clip("intro", "card", args.introSeconds, intro);
        await clip("outro", "card", args.outroSeconds, outro);
        await clip(
          "lower-third",
          "overlay",
          args.lowerThirdSeconds,
          lowerThird,
        );
        await clip("fast-forward", "overlay", FAST_FORWARD_LOOP_SECONDS, badge);
        // The settled intro, for a custom thumbnail.
        await renderStill({
          chromium: g.chromium,
          page: `${dir}/intro.html`,
          at: Math.max(args.introSeconds - 1, 0),
          width: g.width,
          height: g.height,
          transparent: false,
          out: thumbnail,
        });

        const data = CardsDataSchema.parse({
          intro: { path: intro, seconds: args.introSeconds },
          outro: { path: outro, seconds: args.outroSeconds },
          lowerThird: {
            path: lowerThird,
            seconds: args.lowerThirdSeconds,
            at: args.lowerThirdAt,
          },
          fastForwardBadge: { path: badge },
          recording: take.recording,
          presenter: args.presenter,
          title: args.title,
          thumbnail,
          renderedAt: new Date().toISOString(),
        });
        const handle = await ctx.writeResource("cards", take.name, data);
        ctx.logger.info(`brand cards for ${take.name} in ${dir}`);
        return { dataHandles: [handle] };
      },
    },

    stage: {
      description:
        "Render the OBS studio look: backdrop for the centred screen share, a looping neon ring and circular mask for the bottom-right webcam",
      arguments: StageArgs,
      execute: async (args: z.infer<typeof StageArgs>, ctx: BrandContext) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        checkStageSize(g.width, g.height);
        const presenter = await loadPresenter(ctx, args.presenter);
        const assets = await loadAssets(ctx, g);
        const layout = stageLayout(g.screenScale, g.cameraSize);
        const dir = resolvePath(ctx, args.dir);
        await Deno.mkdir(dir, { recursive: true });
        await Deno.writeTextFile(
          `${dir}/backdrop.html`,
          backdropHtml({ assets, presenter, layout }),
        );
        await Deno.writeTextFile(
          `${dir}/camera-ring.html`,
          cameraRingHtml({ assets, layout }),
        );

        const backdropPath = `${dir}/backdrop.png`;
        ctx.logger.info("rendering the studio backdrop");
        await renderStill({
          chromium: g.chromium,
          page: `${dir}/backdrop.html`,
          at: 0,
          width: g.width,
          height: g.height,
          transparent: false,
          out: backdropPath,
        });

        // The ring's box at the output size, even-sized for VP9.
        const scale = g.width / STAGE_WIDTH;
        const px = (n: number) => Math.round(n * scale);
        const size = px(layout.ring.width) - (px(layout.ring.width) % 2);
        const cameraRingPath = `${dir}/camera-ring.webm`;
        ctx.logger.info(
          `rendering the ${CAMERA_RING_LOOP_SECONDS}s webcam ring loop`,
        );
        await renderClip({
          chromium: g.chromium,
          ffmpeg: g.ffmpeg,
          page: `${dir}/camera-ring.html`,
          seconds: CAMERA_RING_LOOP_SECONDS,
          fps: g.fps,
          width: g.width,
          height: g.height,
          kind: "ring",
          out: cameraRingPath,
          framesDir: `${dir}/camera-ring.frames`,
          crop: {
            x: px(layout.ring.x),
            y: px(layout.ring.y),
            width: size,
            height: size,
          },
          logger: ctx.logger,
          signal: ctx.signal,
        });

        const cameraMaskPath = `${dir}/camera-mask.png`;
        await run({
          bin: g.ffmpeg,
          args: maskArgs(cameraMaskPath),
          signal: ctx.signal,
        });

        const data = StageSchema.parse({
          dir,
          backdropPath,
          cameraRingPath,
          cameraMaskPath,
          layout,
        });
        const handle = await ctx.writeResource("stage", "stage", data);
        ctx.logger.info(`studio look in ${dir}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
