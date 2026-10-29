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
 * Watching the screen, after Adam's swamp-video prototype: where it sits
 * idle (freezedetect), what text it shows (tesseract on sampled frames),
 * where credentials appear (boxes to pixelate, in recording pixels and raw
 * time), and a storyboard contact sheet.
 *
 * @module
 */

import { secretKind } from "./secrets.ts";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Range {
  start: number;
  end: number;
}

export interface Redaction extends Rect {
  start: number;
  end: number;
  kind: string;
}

export interface OcrWord {
  text: string;
  line: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Frame {
  at: number;
  path: string;
  text: string;
  words: OcrWord[];
}

const round = (t: number) => Math.round(t * 100) / 100;

/** The screen rectangle cropdetect settled on, and freezedetect's idle ranges. */
export function parseDetect(
  stderr: string,
  fallback: Rect,
  duration: number,
): { rect: Rect; idle: Range[] } {
  const found = [...stderr.matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)].pop();
  const rect = found && Number(found[1]) > 64 && Number(found[2]) > 64
    ? {
      x: fallback.x + Number(found[3]),
      y: fallback.y + Number(found[4]),
      width: Number(found[1]),
      height: Number(found[2]),
    }
    : fallback;
  const idle: Range[] = [];
  let frozeAt: number | undefined;
  for (const line of stderr.split("\n")) {
    const started = line.match(/freeze_start: ([\d.]+)/);
    const ended = line.match(/freeze_end: ([\d.]+)/);
    if (started) frozeAt = Number(started[1]);
    if (ended && frozeAt !== undefined) {
      idle.push({ start: round(frozeAt), end: round(Number(ended[1])) });
      frozeAt = undefined;
    }
  }
  if (frozeAt !== undefined) {
    idle.push({ start: round(frozeAt), end: round(duration) });
  }
  return { rect, idle };
}

/**
 * When to read the screen: once it settles in each idle stretch, plus every
 * few seconds through bursts of activity, at least a second apart.
 */
export function sampleTimes(
  idle: Range[],
  duration: number,
  activeEvery: number,
): number[] {
  const times = [0.5];
  let cursor = 0;
  for (const r of [...idle, { start: duration, end: 0 }]) {
    for (let t = cursor + activeEvery; t < r.start; t += activeEvery) {
      times.push(t);
    }
    if (r.start < duration) times.push(Math.min(r.start + 0.3, r.end));
    cursor = Math.max(cursor, r.end);
  }
  return times.map(round).sort((a, b) => a - b)
    .filter((t, i, all) => i === 0 || t - all[i - 1] >= 1);
}

/**
 * tesseract TSV: one row per word with its box; rows sharing
 * block/paragraph/line numbers make up a line.
 */
export function parseTesseractTsv(
  tsv: string,
): { text: string; words: OcrWord[] } {
  const rows = tsv.trim().split("\n").slice(1).map((r) => r.split("\t"))
    .filter((r) => r.length >= 12 && r[0] === "5" && r[11].trim());
  const lines = new Map<string, OcrWord[]>();
  for (const r of rows) {
    const key = `${r[2]}.${r[3]}.${r[4]}`;
    const word: OcrWord = {
      text: r[11].trim(),
      line: "",
      left: Number(r[6]),
      top: Number(r[7]),
      width: Number(r[8]),
      height: Number(r[9]),
    };
    const list = lines.get(key);
    if (list) list.push(word);
    else lines.set(key, [word]);
  }
  const words: OcrWord[] = [];
  const text: string[] = [];
  for (const list of lines.values()) {
    const line = list.map((w) => w.text).join(" ");
    text.push(line);
    for (const w of list) words.push({ ...w, line });
  }
  return { text: text.join("\n"), words };
}

/**
 * A frame's text with anything that looks like a credential replaced, so the
 * timeline (stored in swamp data, read by agents drafting descriptions) never
 * holds a secret the extension itself found.
 */
export function redactedText(frame: Frame, allow: string[]): string {
  let text = frame.text;
  for (const word of frame.words) {
    const kind = secretKind(word.text, word.line, allow);
    if (kind) text = text.replaceAll(word.text, `[${kind} redacted]`);
  }
  return text;
}

/** Frames whose text changed: the on-screen text timeline, redacted. */
export function timeline(
  frames: Frame[],
  allow: string[] = [],
  maxChars = 4000,
): { at: number; text: string }[] {
  const out: { at: number; text: string }[] = [];
  let prev = "";
  for (const f of frames) {
    if (f.text && f.text !== prev) {
      out.push({ at: f.at, text: redactedText(f, allow).slice(0, maxChars) });
    }
    prev = f.text;
  }
  return out;
}

const evenDown = (n: number) => Math.floor(n / 2) * 2;
const evenUp = (n: number) => Math.ceil(n / 2) * 2;

/**
 * Boxes to pixelate: from the last frame known without the secret until the
 * first frame without it again, in recording pixels, clamped to the frame.
 * Overlapping boxes of the same kind whose times overlap merge into their
 * union, so a neighbouring or longer secret is never left partly visible.
 * When a secret moves between two samples (output scrolling), the region
 * between its two positions is covered for that interval too: it may have
 * passed anywhere through it.
 */
export function findRedactions(
  frames: Frame[],
  rect: Rect,
  ocrScale: number,
  duration: number,
  allow: string[],
  frame: { width: number; height: number },
): Redaction[] {
  const redactions: Redaction[] = [];
  const maxX = evenDown(frame.width), maxY = evenDown(frame.height);
  const boxOf = (word: OcrWord): Rect | undefined => {
    const pad = 6;
    const x0 = Math.max(0, evenDown(rect.x + word.left / ocrScale - pad));
    const y0 = Math.max(0, evenDown(rect.y + word.top / ocrScale - pad));
    const x1 = Math.min(
      maxX,
      evenUp(rect.x + (word.left + word.width) / ocrScale + pad + 2),
    );
    const y1 = Math.min(
      maxY,
      evenUp(rect.y + (word.top + word.height) / ocrScale + pad + 2),
    );
    return x1 > x0 && y1 > y0
      ? { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }
      : undefined;
  };
  const add = (first: Redaction) => {
    let box = first;
    // Merge with every overlapping box, repeatedly, as unions grow.
    for (let k = redactions.length - 1; k >= 0; k--) {
      const r = redactions[k];
      const overlaps = r.kind === box.kind &&
        r.x < box.x + box.width && box.x < r.x + r.width &&
        r.y < box.y + box.height && box.y < r.y + r.height &&
        box.start <= r.end && r.start <= box.end;
      if (!overlaps) continue;
      box = {
        ...union(r, box),
        start: Math.min(r.start, box.start),
        end: Math.max(r.end, box.end),
        kind: box.kind,
      };
      redactions.splice(k, 1);
      k = redactions.length; // rescan against the grown box
    }
    redactions.push(box);
  };
  frames.forEach((f, i) => {
    for (const word of f.words) {
      const kind = secretKind(word.text, word.line, allow);
      if (!kind) continue;
      const box = boxOf(word);
      if (!box) continue;
      let last = i;
      while (
        last + 1 < frames.length &&
        frames[last + 1].words.some((w) => w.text === word.text)
      ) last++;
      add({
        ...box,
        start: i > 0 ? frames[i - 1].at : 0,
        end: round(frames[last + 1]?.at ?? duration),
        kind,
      });
      // The same secret somewhere else a sample ago: it moved through the
      // band between the two positions.
      if (i > 0) {
        for (const prev of frames[i - 1].words) {
          if (prev.text !== word.text) continue;
          const before = boxOf(prev);
          if (!before || overlap(before, box)) continue;
          add({
            ...union(before, box),
            start: frames[i - 1].at,
            end: f.at,
            kind,
          });
        }
      }
    }
  });
  return redactions;
}

function overlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && b.x < a.x + a.width &&
    a.y < b.y + b.height && b.y < a.y + a.height;
}

function union(a: Rect, b: Rect): Rect {
  const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
}

/** Up to `max` frames spread across the timeline, for the storyboard. */
export function storyboardFrames(frames: Frame[], max = 24): Frame[] {
  const changed = frames.filter((f, i) =>
    i === 0 || f.text !== frames[i - 1].text
  );
  const pool = changed.length >= 4 ? changed : frames;
  if (pool.length <= max) return pool;
  return Array.from(
    { length: max },
    (_, k) => pool[Math.floor(k * pool.length / max)],
  );
}

function clockLabel(t: number): string {
  return `${Math.floor(t / 60)}\\:${
    String(Math.floor(t % 60)).padStart(2, "0")
  }`;
}

/** ffmpeg args that tile frames 4 across into one storyboard PNG. */
/**
 * Credential boxes showing at a sampled frame, in that frame's pixels (the
 * frame is the screen area, upscaled by `ocrScale`).
 */
export function frameBoxes(
  at: number,
  redactions: Redaction[],
  rect: Rect,
  ocrScale: number,
): Rect[] {
  const fw = rect.width * ocrScale, fh = rect.height * ocrScale;
  const out: Rect[] = [];
  for (const r of redactions) {
    if (at < r.start || at > r.end) continue;
    const x0 = Math.max(0, evenDown((r.x - rect.x) * ocrScale));
    const y0 = Math.max(0, evenDown((r.y - rect.y) * ocrScale));
    const x1 = Math.min(
      evenDown(fw),
      evenUp((r.x + r.width - rect.x) * ocrScale),
    );
    const y1 = Math.min(
      evenDown(fh),
      evenUp((r.y + r.height - rect.y) * ocrScale),
    );
    if (x1 > x0 && y1 > y0) {
      out.push({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    }
  }
  return out;
}

/** Pixelate boxes in a filter chain from `input`, ending at label `out`. */
function pixelateChain(input: string, boxes: Rect[], tag: string): string[] {
  const chain: string[] = [];
  let label = input;
  boxes.forEach((b, k) => {
    const sw = Math.max(1, Math.round(b.width / 12));
    const sh = Math.max(1, Math.round(b.height / 12));
    const next = `${tag}p${k}`;
    chain.push(
      `[${label}]split[${next}a][${next}b]`,
      `[${next}b]crop=${b.width}:${b.height}:${b.x}:${b.y},scale=${sw}:${sh},` +
        `scale=${b.width}:${b.height}:flags=neighbor[${next}c]`,
      `[${next}a][${next}c]overlay=${b.x}:${b.y}[${next}]`,
    );
    label = next;
  });
  return chain.length ? chain : [`[${input}]null[${tag}p]`];
}

/**
 * ffmpeg args that tile frames 4 across into one storyboard PNG, with the
 * credentials showing in each frame pixelated.
 */
export function storyboardArgs(
  frames: Frame[],
  out: string,
  boxes: (f: Frame) => Rect[] = () => [],
): string[] {
  const cols = 4;
  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  for (const f of frames) args.push("-i", f.path);
  const pre: string[] = [];
  const tiles = frames.map((f, i) => {
    const chain = pixelateChain(`${i}:v`, boxes(f), `s${i}`);
    pre.push(...chain);
    const last = chain[chain.length - 1].match(/\[([^\]]+)\]$/)![1];
    return `[${last}]scale=640:360:force_original_aspect_ratio=decrease,` +
      `pad=640:360:(ow-iw)/2:(oh-ih)/2:color=0x04020b,` +
      `drawtext=text='${
        clockLabel(f.at)
      }':x=12:y=12:fontsize=24:fontcolor=white:box=1:boxcolor=0x000000@0.7:boxborderw=6[t${i}]`;
  });
  const layout = frames.map((_, i) =>
    `${(i % cols) * 640}_${Math.floor(i / cols) * 360}`
  ).join("|");
  const graph = frames.length === 1
    ? `${[...pre, tiles[0]].join(";")};[t0]null[out]`
    : `${[...pre, ...tiles].join(";")};${
      frames.map((_, i) => `[t${i}]`).join("")
    }` +
      `xstack=inputs=${frames.length}:layout=${layout}:fill=0x04020b[out]`;
  args.push("-filter_complex", graph, "-map", "[out]", "-frames:v", "1", out);
  return args;
}
