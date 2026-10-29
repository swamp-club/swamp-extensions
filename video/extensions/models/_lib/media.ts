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
 * What every behavior needs to know about a take: where its files live,
 * its frame rate, size and audio tracks, and the voice track's loudness
 * envelope.
 *
 * Large files (renders, PNGs, the envelope, the edit.txt) live in a work
 * directory next to the recording, `<stem>.video/`; swamp data holds only
 * metadata and paths.
 *
 * @module
 */

import { run, runText } from "./exec.ts";

export interface Take {
  recording: string;
  /** The recording's path without its extension. */
  stem: string;
  /** A data-safe name for the take (no `/`, `\`, `..`). */
  name: string;
  workDir: string;
}

export function takeOf(recordingPath: string): Take {
  const slash = recordingPath.lastIndexOf("/");
  const dot = recordingPath.lastIndexOf(".");
  const stem = dot > slash + 1 ? recordingPath.slice(0, dot) : recordingPath;
  const base = stem.slice(slash + 1);
  const name = base.toLowerCase().replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "take";
  return {
    recording: recordingPath,
    stem,
    name,
    workDir: `${stem}.video`,
  };
}

export async function ensureWorkDir(take: Take): Promise<void> {
  await Deno.mkdir(take.workDir, { recursive: true });
}

export interface MediaInfo {
  fps: number;
  duration: number;
  width: number;
  height: number;
  audioTracks: number;
}

interface ProbeStream {
  codec_type?: string;
  r_frame_rate?: string;
  width?: number;
  height?: number;
}

export function parseProbe(json: string): MediaInfo {
  const info = JSON.parse(json) as {
    streams?: ProbeStream[];
    format?: { duration?: string };
  };
  const streams = info.streams ?? [];
  const video = streams.find((s) => s.codec_type === "video");
  if (!video) throw new Error("no video track in recording");
  const audio = streams.filter((s) => s.codec_type === "audio");
  if (!audio.length) throw new Error("no audio track in recording");
  const [num, den] = (video.r_frame_rate ?? "30/1").split("/").map(Number);
  let fps = den ? num / den : 30;
  // variable-frame-rate captures report nonsense here
  if (!(fps >= 10 && fps <= 60)) fps = 30;
  return {
    fps,
    duration: Number(info.format?.duration ?? 0),
    width: video.width ?? 1920,
    height: video.height ?? 1080,
    audioTracks: audio.length,
  };
}

export async function probe(
  ffprobe: string,
  path: string,
  signal?: AbortSignal,
): Promise<MediaInfo> {
  return parseProbe(
    await runText({
      bin: ffprobe,
      args: [
        "-v",
        "error",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        path,
      ],
      signal,
    }),
  );
}

/**
 * The voice track: a mic-only second track when the recorder wrote one
 * (OBS with the mic on its own track), else the first.
 */
export function speechTrack(info: MediaInfo, preferred?: number): number {
  if (preferred !== undefined) return preferred;
  return info.audioTracks > 1 ? 1 : 0;
}

/** Loudness in dB per 10 ms of mono 16 kHz signed 16-bit PCM. */
export function envelope(pcm: Uint8Array): number[] {
  const view = new DataView(pcm.buffer, pcm.byteOffset, pcm.byteLength);
  const samples = Math.floor(pcm.byteLength / 2);
  const frames = Math.floor(samples / 160);
  const out: number[] = new Array(frames);
  for (let f = 0; f < frames; f++) {
    let sum = 0;
    for (let k = 0; k < 160; k++) {
      const v = view.getInt16((f * 160 + k) * 2, true) / 32768;
      sum += v * v;
    }
    const db = 20 * Math.log10(Math.sqrt(sum / 160) + 1e-6);
    out[f] = Math.round(db * 10) / 10;
  }
  return out;
}

/**
 * The voice track's envelope, cached as energy.json in the work dir. The
 * cache records the track and the recording's size and modification time, so
 * a different track or a re-recorded file is measured again.
 */
export async function energy(
  ffmpeg: string,
  take: Take,
  track: number,
  signal?: AbortSignal,
): Promise<number[]> {
  const cache = `${take.workDir}/energy.json`;
  const stat = await Deno.stat(take.recording);
  const key = {
    track,
    size: stat.size,
    mtime: stat.mtime?.getTime() ?? 0,
  };
  try {
    const cached = JSON.parse(await Deno.readTextFile(cache));
    if (
      cached.track === key.track && cached.size === key.size &&
      cached.mtime === key.mtime && Array.isArray(cached.db)
    ) return cached.db;
  } catch (err) {
    if (
      !(err instanceof Deno.errors.NotFound) && !(err instanceof SyntaxError)
    ) {
      throw err;
    }
  }
  const result = await run({
    bin: ffmpeg,
    args: [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      take.recording,
      "-map",
      `0:a:${track}`,
      "-ac",
      "1",
      "-ar",
      "16000",
      "-f",
      "s16le",
      "-",
    ],
    signal,
  });
  const db = envelope(result.stdout);
  await ensureWorkDir(take);
  await Deno.writeTextFile(cache, JSON.stringify({ ...key, db }));
  return db;
}
