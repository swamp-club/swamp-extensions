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
 * Captions in output time: kept words remapped through the keep spans and
 * grouped into short cues, as demo-polish does.
 *
 * @module
 */

import { type Item, pyRound, remapper, type Span } from "./edit_list.ts";

export function srtTime(t: number): string {
  const ms = pyRound(t * 1000);
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${pad(Math.floor(ms / 3600000))}:${
    pad(Math.floor(ms / 60000) % 60)
  }:${pad(Math.floor(ms / 1000) % 60)},${pad(ms % 1000, 3)}`;
}

/** SRT text for the kept words, shifted by `shift` seconds (an intro card). */
export function buildSrt(
  items: Item[],
  spans: Span[],
  fps: number,
  shift = 0.0,
): string {
  const remap = remapper(spans, fps);
  const cues: [number, number, string][][] = [];
  let cur: [number, number, string][] = [];
  let sentenceStart = true;
  for (const it of items) {
    if (it.kind !== "word" || !it.keep || !it.text) continue;
    let text = it.text;
    if (sentenceStart) text = text[0].toUpperCase() + text.slice(1); // "Um, let me" -> "Let me"
    sentenceStart = /[.?!]$/.test(text);
    const s = remap(it.s), e = remap(it.e);
    if (cur.length) {
      const length = cur.map(([, , w]) => w).join(" ").length + 1 + text.length;
      if (
        length > 42 || s - cur[cur.length - 1][1] > 0.6 ||
        e - cur[0][0] > 3.5 || /[.?!]$/.test(cur[cur.length - 1][2])
      ) {
        cues.push(cur);
        cur = [];
      }
    }
    cur.push([s, e, text]);
  }
  if (cur.length) cues.push(cur);
  const out = cues.map((cue, n) => {
    const start = cue[0][0] + shift;
    let end = cue[cue.length - 1][1] + shift + 0.3;
    if (n + 1 < cues.length) end = Math.min(end, cues[n + 1][0][0] + shift);
    return `${n + 1}\n${srtTime(start)} --> ${
      srtTime(Math.max(end, start + 0.3))
    }\n` +
      cue.map(([, , w]) => w).join(" ") + "\n";
  });
  return out.join("\n");
}
