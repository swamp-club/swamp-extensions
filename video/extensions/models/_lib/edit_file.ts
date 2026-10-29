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
 * edit.txt: the edit list as an editable transcript, in demo-polish's format
 * so its files import unchanged. One line per sentence; {braced} text is
 * cut; ~2.4s is a cut pause; >>12.0s is a fast-forwarded wait; retyping a
 * word changes only its caption.
 *
 * One deliberate difference: demo-polish closed a brace at the first `}`, so
 * `{a {b} c}` silently kept `c`. Here a nested or stray brace is an error
 * naming the line.
 *
 * @module
 */

import {
  clock,
  type EditSettings,
  type Item,
  linesOf,
  pauseSpeed,
} from "./edit_list.ts";
import { opcodes } from "./sequence_match.ts";

export class EditFileError extends Error {}

const PAUSE_TOKEN = /^(~|>>)(\d+\.\d)s$/;

function alignKey(token: string): string {
  const m = token.match(PAUSE_TOKEN);
  return m ? `\u0000pause:${m[2]}` : token;
}

/**
 * A word as the file shows it: its caption text when that was retyped, so a
 * spelling fix survives export and re-import. A word folded into the
 * previous one's fix ("Cooper Netties" -> "Kubernetes") shows nothing.
 */
function display(it: Item): string {
  return it.kind === "word" && it.text !== it.token ? it.text : it.token;
}

export function writeEditFile(
  recordingName: string,
  items: Item[],
  maxPause: number,
): string {
  const out = [
    `# demo-polish edit file for ${recordingName}`,
    `# max-pause: ${
      Number.isInteger(maxPause) ? maxPause.toFixed(1) : maxPause
    }`,
    "# Delete words or lines to cut them. {Braced} text is cut; remove the braces to keep it.",
    "# ~2.4s is a pause. Unbrace one if something is happening on screen during it.",
    "# >>12.0s is a long wait played fast-forward. Change to ~12.0s for normal speed, or brace it to cut.",
    "# Fixing a word's spelling only changes the captions. Save, then re-run demo-polish.",
    "",
  ];
  for (const [n, its] of linesOf(items)) {
    const toks: string[] = [];
    let group: string[] = [];
    for (const it of [...its, undefined]) {
      const shown = it === undefined ? "" : display(it);
      if (it !== undefined && !it.keep) {
        if (shown) group.push(shown);
        continue;
      }
      if (group.length) {
        toks.push("{" + group.join(" ") + "}");
        group = [];
      }
      if (shown) toks.push(shown);
    }
    out.push(`${n} [${clock(its[0].s)}] | ` + toks.join(" "));
  }
  return out.join("\n") + "\n";
}

/** Tokens of one edit line, each with whether it sits inside braces. */
export function parseTokens(
  text: string,
  lineNo = 0,
): [string, boolean][] {
  const toks: [string, boolean][] = [];
  let braced = false;
  for (let raw of text.split(/\s+/).filter(Boolean)) {
    if (raw.startsWith("{")) {
      if (braced) {
        throw new EditFileError(
          `edit.txt line ${lineNo}: nested "{" — close the first brace before opening another`,
        );
      }
      braced = true;
      raw = raw.slice(1);
    }
    if (raw.includes("{")) {
      throw new EditFileError(
        `edit.txt line ${lineNo}: "{" inside a word — braces go around whole words`,
      );
    }
    const closes = raw.endsWith("}");
    raw = raw.replace(/}+$/, "");
    if (raw.includes("}")) {
      throw new EditFileError(
        `edit.txt line ${lineNo}: "}" inside a word — braces go around whole words`,
      );
    }
    if (closes && !braced) {
      throw new EditFileError(
        `edit.txt line ${lineNo}: "}" without a matching "{"`,
      );
    }
    if (raw) toks.push([raw, braced]);
    if (closes) braced = false;
  }
  return toks;
}

export interface ApplyResult {
  maxPause?: number;
  warnings: string[];
}

/** Apply an edited edit.txt to the items in place. */
export function applyEditFile(
  text: string,
  items: Item[],
  settings: EditSettings,
): ApplyResult {
  const warnings: string[] = [];
  const edited = new Map<number, [string, boolean][]>();
  let maxPause: number | undefined;
  for (const ln of text.split("\n")) {
    const header = ln.match(/^# max-pause: ([\d.]+)/);
    if (header) maxPause = Number(header[1]);
    if (!ln.trim() || ln.startsWith("#")) continue;
    const m = ln.match(/^(\d+) \[[^\]]*\] \|(.*)$/);
    if (!m) {
      warnings.push(`ignoring unrecognised edit line: ${ln.slice(0, 60)}`);
      continue;
    }
    edited.set(Number(m[1]), parseTokens(m[2], Number(m[1])));
  }
  for (const [n, its] of linesOf(items)) {
    const toks = edited.get(n) ?? [];
    for (const it of its) it.keep = false;
    // A wait is the same wait whether it shows ~ or >>: align on its
    // length, so switching it never misaligns the words around it.
    const ops = opcodes(
      its.map((it) => alignKey(it.token)),
      toks.map(([t]) => alignKey(t)),
    );
    for (const [op, i1, i2, j1, j2] of ops) {
      if (op !== "equal" && op !== "replace") continue;
      const items = its.slice(i1, i2);
      const span = toks.slice(j1, j2);
      // Pair one for one only when every pair is word-to-word or
      // wait-to-wait: a word must never take a wait's token, or the reverse.
      const pairwise = items.length === span.length &&
        items.every((it, k) =>
          (it.kind === "pause") === PAUSE_TOKEN.test(span[k][0])
        );
      if (pairwise) {
        items.forEach((it, k) => {
          const [tok, braced] = span[k];
          it.keep = !braced;
          if (it.kind === "word") it.text = tok;
          else {
            it.speed = tok.startsWith(">>") ? pauseSpeed(it, settings) : 1;
          }
        });
        continue;
      }
      // e.g. "Cooper Netties" -> "Kubernetes": keep audio, retext caption.
      // Waits and words are matched separately: a wait whose token is gone
      // from the span was deleted, so it is cut.
      const waitToks = span.filter(([t]) => PAUSE_TOKEN.test(t));
      const wordToks = span.filter(([t]) => !PAUSE_TOKEN.test(t));
      for (const it of items.filter((it) => it.kind === "pause")) {
        const k = waitToks.findIndex(([t]) =>
          alignKey(t) === alignKey(it.token)
        );
        if (k < 0) {
          it.keep = false;
          continue;
        }
        const [tok, braced] = waitToks.splice(k, 1)[0];
        it.keep = !braced;
        it.speed = tok.startsWith(">>") ? pauseSpeed(it, settings) : 1;
      }
      const words = items.filter((it) => it.kind === "word");
      const braced = wordToks.every(([, b]) => b);
      const text = wordToks.map(([t]) => t).join(" ");
      words.forEach((it, k) => {
        it.keep = !braced;
        it.speed = 1;
        it.text = k === 0 ? text : "";
      });
    }
  }
  return { maxPause, warnings };
}
