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
 * Scene to file: capture a scene's frames as numbered PNGs, then encode
 * them with ffmpeg in the format each use needs.
 *
 * - `card` (intro, outro): H.264 MP4, opaque.
 * - `overlay` (lower third, fast-forward badge): QuickTime RLE with alpha.
 *   Lossless and small for frames that are mostly transparent, and
 *   @swamp/video's render decodes its alpha as is.
 * - `ring` (webcam ring): VP9 WebM with alpha, cropped to the ring; what
 *   OBS media sources loop transparently.
 *
 * @module
 */

import type { Logger } from "./context.ts";
import { run } from "./exec.ts";
import { openScene } from "./scene.ts";

export type ClipKind = "card" | "overlay" | "ring";

export interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const FRAME_PATTERN = "f%05d.png";

function framePath(dir: string, i: number): string {
  return `${dir}/f${String(i).padStart(5, "0")}.png`;
}

/** ffmpeg's arguments to encode a directory of frames into `out`. */
export function encodeArgs(
  kind: ClipKind,
  framesDir: string,
  fps: number,
  out: string,
  crop?: Crop,
): string[] {
  const input = [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-framerate",
    String(fps),
    "-i",
    `${framesDir}/${FRAME_PATTERN}`,
  ];
  switch (kind) {
    case "card":
      return [
        ...input,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "14",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        out,
      ];
    case "overlay":
      return [...input, "-c:v", "qtrle", "-pix_fmt", "argb", out];
    case "ring": {
      if (!crop) throw new Error("a ring clip needs its crop");
      return [
        ...input,
        "-vf",
        `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`,
        "-c:v",
        "libvpx-vp9",
        "-pix_fmt",
        "yuva420p",
        "-b:v",
        "0",
        "-crf",
        "24",
        "-auto-alt-ref",
        "0",
        "-row-mt",
        "1",
        out,
      ];
    }
  }
}

export interface ClipOptions {
  chromium: string;
  ffmpeg: string;
  page: string;
  seconds: number;
  fps: number;
  width: number;
  height: number;
  kind: ClipKind;
  out: string;
  /** Scratch directory for the frames; removed once encoded. */
  framesDir: string;
  crop?: Crop;
  logger: Logger;
  signal?: AbortSignal;
}

/** Render a scene's first `seconds` into a clip. */
export async function renderClip(o: ClipOptions): Promise<void> {
  const frames = Math.round(o.seconds * o.fps);
  await Deno.remove(o.framesDir, { recursive: true }).catch(() => {});
  await Deno.mkdir(o.framesDir, { recursive: true });
  try {
    const scene = await openScene({
      chromium: o.chromium,
      page: o.page,
      width: o.width,
      height: o.height,
      transparent: o.kind !== "card",
    });
    try {
      for (let i = 0; i < frames; i++) {
        o.signal?.throwIfAborted();
        await Deno.writeFile(
          framePath(o.framesDir, i),
          await scene.frame(i / o.fps),
        );
      }
    } finally {
      await scene.close();
    }
    o.logger.debug(`${o.out}: ${frames} frames, encoding`);
    await run({
      bin: o.ffmpeg,
      args: encodeArgs(o.kind, o.framesDir, o.fps, o.out, o.crop),
      signal: o.signal,
    });
  } finally {
    await Deno.remove(o.framesDir, { recursive: true }).catch(() => {});
  }
}

export interface StillOptions {
  chromium: string;
  page: string;
  at: number;
  width: number;
  height: number;
  transparent: boolean;
  out: string;
}

/** One frame of a scene as a PNG. */
export async function renderStill(o: StillOptions): Promise<void> {
  const scene = await openScene({
    chromium: o.chromium,
    page: o.page,
    width: o.width,
    height: o.height,
    transparent: o.transparent,
  });
  try {
    await Deno.writeFile(o.out, await scene.frame(o.at));
  } finally {
    await scene.close();
  }
}

/** An anti-aliased white disc; OBS's image mask filter uses its alpha. */
export function maskArgs(out: string): string[] {
  return [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-f",
    "lavfi",
    "-i",
    "color=white:s=1024x1024,format=rgba",
    "-vf",
    "geq=r=255:g=255:b=255:a='255*clip(W/2-1-hypot(X+0.5-W/2,Y+0.5-H/2),0,1)'",
    "-frames:v",
    "1",
    out,
  ];
}
