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
 * The edit list: every word and pause of a take, each kept or cut, and the
 * keep spans a render plays. Ported from demo-polish so a take edited there
 * cuts the same here; the parity tests in edit_list_test.ts hold it to
 * golden output from the Python original. Python rounds half to even, so the
 * port does too wherever the original calls round().
 *
 * @module
 */

export interface Word {
  w: string;
  s: number;
  e: number;
}

export interface Item {
  kind: "word" | "pause";
  /** How it appears in edit.txt. */
  token: string;
  s: number;
  e: number;
  keep: boolean;
  /** One edit.txt line per sentence. */
  line: number;
  /** Caption text (words only). */
  text: string;
  /** Above 1 for a fast-forwarded pause. */
  speed: number;
  /** The screen sat idle through this pause, so it may race faster. */
  idle?: boolean;
}

/** [start, end, speed] in raw recording seconds. */
export type Span = [number, number, number];

export interface EditSettings {
  /** Pauses longer than this are trimmed. */
  maxPause: number;
  /** Pauses at least this long play fast-forward instead of being cut. */
  fastMin: number;
  /** A fast-forwarded wait plays for about this long. */
  fastTarget: number;
  maxSpeed: number;
  /** An idle-screen wait plays for about this long. */
  idleTarget: number;
  maxIdleSpeed: number;
  keepFillers: boolean;
}

export const DEFAULT_SETTINGS: EditSettings = {
  maxPause: 1.5,
  fastMin: 4.0,
  fastTarget: 4.0,
  maxSpeed: 32,
  idleTarget: 1.0,
  maxIdleSpeed: 64,
  keepFillers: false,
};

export const FILLERS = new Set([
  "um",
  "umm",
  "uh",
  "uhh",
  "uhm",
  "erm",
  "er",
  "ah",
  "ahh",
  "hmm",
  "hm",
  "mm",
  "mhm",
]);
/** Seconds of air kept on each side of a cut. */
export const PAD = 0.25;
/** A cut edge may move this far (before a word, after it) into silence. */
const GROW: [number, number] = [0.3, 0.45];
/** Audio below this counts as silence. */
export const QUIET_DB = -45;

/** Python's round(): half to even. */
export function pyRound(x: number): number {
  const r = Math.round(x);
  return Math.abs(x % 1) === 0.5 ? 2 * Math.round(x / 2) : r;
}

/** Python's f"{x:.{digits}f}" for the values a take produces. */
export function pyFixed(x: number, digits: number): string {
  // toFixed rounds the exact binary value correctly but breaks true ties
  // upward; Python breaks them to even. Only an exact tie differs.
  const exact = Math.abs(x).toFixed(Math.min(100, digits + 60));
  const rest = exact.slice(exact.indexOf(".") + 1 + digits);
  if (/^50*$/.test(rest)) {
    return (pyRound(x * 10 ** digits) / 10 ** digits).toFixed(digits);
  }
  return x.toFixed(digits);
}

export function norm(word: string): string {
  return word.toLowerCase().replace(/[^\p{L}\p{N}_']/gu, "");
}

export function speedFor(duration: number, s: EditSettings): number {
  return Math.max(2, Math.min(s.maxSpeed, Math.ceil(duration / s.fastTarget)));
}

export function pauseSpeed(item: Item, s: EditSettings): number {
  const d = item.e - item.s;
  if (item.idle) {
    return Math.max(
      2,
      Math.min(s.maxIdleSpeed, Math.ceil(d / s.idleTarget)),
    );
  }
  return speedFor(d, s);
}

function pauseItem(
  s: number,
  e: number,
  line: number,
  fast: boolean,
  settings: EditSettings,
  idle: boolean,
): Item {
  const item: Item = {
    kind: "pause",
    token: `~${pyFixed(e - s, 1)}s`,
    s,
    e,
    keep: false,
    line,
    text: "",
    speed: 1,
  };
  if (idle) item.idle = true;
  if (fast) {
    item.token = `>>${pyFixed(e - s, 1)}s`;
    item.keep = true;
    item.speed = pauseSpeed(item, settings);
  }
  return item;
}

/** Ranges are [start, end] seconds; true when they cover 90% of s..e. */
function mostlyIdle(s: number, e: number, idle: [number, number][]): boolean {
  if (e <= s) return false;
  let covered = 0;
  for (const [a, b] of idle) {
    covered += Math.max(0, Math.min(b, e) - Math.max(a, s));
  }
  return covered >= 0.9 * (e - s);
}

/**
 * Words and pauses from a transcript. Waits mid-take fast-forward, dead air
 * at the start is cut, fillers and the first of an immediate repeat are cut.
 */
export function buildItems(
  segments: Word[][],
  duration: number,
  settings: EditSettings = DEFAULT_SETTINGS,
  idleRanges: [number, number][] = [],
): Item[] {
  const words = segments.flat().slice().sort((a, b) => a.s - b.s);
  const items: Item[] = [];
  let prevEnd = 0.0, line = 0;
  const pause = (s: number, e: number, fast: boolean) =>
    pauseItem(s, e, line, fast, settings, mostlyIdle(s, e, idleRanges));
  words.forEach((w, k) => {
    const gap = w.s - prevEnd;
    if (gap > settings.maxPause || (k === 0 && gap > 0.05)) {
      items.push(pause(prevEnd, w.s, k > 0 && gap >= settings.fastMin));
    }
    const text = w.w.trim();
    items.push({
      kind: "word",
      token: text,
      s: w.s,
      e: Math.max(w.e, w.s),
      keep: settings.keepFillers || !FILLERS.has(norm(text)),
      line,
      text,
      speed: 1,
    });
    prevEnd = Math.max(prevEnd, w.e);
    if (/[.?!]$/.test(text)) line += 1;
  });
  if (words.length && duration - prevEnd > 0.05) {
    line = items[items.length - 1].line;
    items.push(pause(prevEnd, duration, false));
  }
  if (!settings.keepFillers) {
    // "the the" -> "the": cut the first of an immediate repeat, skipping
    // Whisper's 20 ms ghost words.
    for (let i = 0; i + 1 < items.length; i++) {
      const a = items[i], b = items[i + 1];
      if (
        a.kind === "word" && b.kind === "word" && a.keep && norm(a.token) &&
        norm(a.token) === norm(b.token) && b.s - a.e < 0.5 &&
        Math.min(a.e - a.s, b.e - b.s) > 0.08
      ) {
        a.keep = false;
      }
    }
  }
  return items;
}

/** Spoken "retake" markers, as the end time of each marker word. */
export function spokenRetakes(items: Item[]): number[] {
  return items.filter((it) => it.kind === "word" && norm(it.token) === "retake")
    .map((it) => it.e);
}

/**
 * A retake marker at time t cuts the sentence the speaker abandoned: from
 * the start of the line holding the last kept word before t, through t
 * (including a spoken marker word).
 */
export function applyRetakes(items: Item[], markers: number[]): void {
  for (const t of markers) {
    let last = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].s >= t) break;
      if (
        items[i].kind === "word" && items[i].keep &&
        norm(items[i].token) !== "retake"
      ) last = i;
    }
    // From the line's first word: a wait before the sentence stays.
    const first = last >= 0
      ? items.find((it) => it.kind === "word" && it.line === items[last].line)!
      : undefined;
    for (const it of items) {
      const inLine = first !== undefined && it.line === first.line &&
        it.s >= first.s && it.s < t;
      const marker = it.kind === "word" && norm(it.token) === "retake" &&
        Math.abs(it.e - t) < 1e-6;
      if (inLine || marker) it.keep = false;
    }
  }
}

export function linesOf(items: Item[]): Map<number, Item[]> {
  const lines = new Map<number, Item[]>();
  for (const it of items) {
    const line = lines.get(it.line);
    if (line) line.push(it);
    else lines.set(it.line, [it]);
  }
  return lines;
}

/**
 * Push each cut edge outward into real silence, so word heads and tails
 * Whisper timed too tightly aren't clipped. Where there's no silence nearby,
 * use the quietest point. `db` is loudness per 10 ms of the voice track.
 */
export function settle(spans: Span[], db: number[]): Span[] {
  const at = (j: number) => db[j < 0 ? db.length + j : j];
  const edge = (t: number, direction: 1 | -1, limit: number): number => {
    const i = pyRound(t * 100);
    const reach = pyRound(
      Math.min(GROW[direction > 0 ? 1 : 0], Math.abs(limit - t)) * 100,
    );
    const window: number[] = [];
    for (let k = 0; k <= reach; k++) {
      const j = i + direction * k;
      if (j >= 0 && j < db.length) window.push(j);
    }
    if (!window.length) return t;
    for (let k = 0; k < window.length; k++) {
      const j = window[k];
      let quiet = true;
      for (let m = 0; m < 3; m++) {
        if (!(at(Math.min(j + direction * m, db.length - 1)) < QUIET_DB)) {
          quiet = false;
          break;
        }
      }
      if (quiet) {
        // a breath into the silence
        return (j + direction * Math.min(3, window.length - 1 - k)) / 100;
      }
    }
    let best = window[0];
    for (const j of window) if (db[j] < db[best]) best = j;
    return best / 100;
  };

  spans.forEach((span, k) => {
    if (k + 1 < spans.length && spans[k + 1][0] - span[1] > 0.02) {
      span[1] = Math.max(span[1], edge(span[1], 1, spans[k + 1][0]));
    }
    if (k && span[0] - spans[k - 1][1] > 0.02) {
      span[0] = Math.min(span[0], edge(span[0], -1, spans[k - 1][1]));
    }
  });
  return spans;
}

/** The raw-time spans a render plays, snapped to frame boundaries. */
export function keepSpans(items: Item[], fps: number, db?: number[]): Span[] {
  let spans: Span[] = [];
  const add = (s: number, e: number, speed = 1) => {
    if (spans.length) {
      const last = spans[spans.length - 1];
      if (s <= last[1] + 1e-3 && last[2] === speed) {
        last[1] = Math.max(last[1], e);
        return;
      }
      s = Math.max(s, last[1]);
    }
    if (e - s > 1e-3) spans.push([s, e, speed]);
  };

  items.forEach((it, i) => {
    const prev = i ? items[i - 1] : undefined;
    const nxt = i + 1 < items.length ? items[i + 1] : undefined;
    if (it.keep) {
      add(it.s, it.e, it.speed);
    } else if (it.kind === "pause") {
      const air = Math.min(PAD, (it.e - it.s) / 2);
      if (prev?.keep) add(it.s, it.s + air);
      if (nxt?.keep) add(it.e - air, it.e);
    }
    if (nxt && it.kind === "word" && nxt.kind === "word" && nxt.s > it.e) {
      if (it.keep && nxt.keep) add(it.e, nxt.s);
      else if (it.keep) add(it.e, it.e + Math.min(PAD, nxt.s - it.e));
      else if (nxt.keep) add(nxt.s - Math.min(PAD, nxt.s - it.e), nxt.s);
    }
  });
  if (db && db.length) spans = settle(spans, db);
  // Snap to frame boundaries so audio and video drop exactly the same time.
  const snapped: Span[] = [];
  for (const [s0, e0, speed] of spans) {
    let s = pyRound(s0 * fps) / fps;
    const e = pyRound(e0 * fps) / fps;
    const last = snapped[snapped.length - 1];
    if (last) s = Math.max(s, last[1]);
    if (e <= s) continue;
    if (last && s <= last[1] && last[2] === speed) last[1] = e;
    else snapped.push([s, e, speed]);
  }
  return snapped;
}

/** Where each span begins in the rendered video, plus the total length. */
export function outputStarts(
  spans: Span[],
  fps: number,
): { starts: number[]; total: number } {
  const starts: number[] = [];
  let acc = 0.0;
  for (const [s, e, speed] of spans) {
    starts.push(acc);
    // a sped span keeps every speed-th frame
    acc += Math.ceil(pyRound((e - s) * fps) / speed) / fps;
  }
  return { starts, total: acc };
}

/** Raw recording time to output time through the spans. */
export function remapper(spans: Span[], fps: number): (t: number) => number {
  const { starts: offsets } = outputStarts(spans, fps);
  return (t: number) => {
    // bisect_right on span starts
    let lo = 0, hi = spans.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (t < spans[mid][0]) hi = mid;
      else lo = mid + 1;
    }
    const k = lo - 1;
    if (k < 0) return 0.0;
    const [s, e, speed] = spans[k];
    return offsets[k] + Math.min(Math.max(t - s, 0.0), e - s) / speed;
  };
}

/**
 * Where a cold open's hook ends in the edited take, in seconds on a frame:
 * a little air after its last word (raw `until`), never into the next kept
 * word or a fast-forward.
 */
export function coldOpenAt(
  items: Item[],
  spans: Span[],
  fps: number,
  until: number,
): number {
  const next = items.find((it) =>
    it.kind === "word" && it.keep && it.s >= until
  );
  let t = Math.min(until + PAD, next ? next.s : Infinity);
  const fast = spans.find(([s, e, speed]) => speed > 1 && s < t && t < e);
  if (fast) t = fast[0];
  return Math.round(remapper(spans, fps)(t) * fps) / fps;
}

export function clock(t: number): string {
  const sec = Math.floor(t % 60);
  return `${Math.floor(t / 60)}:${String(sec).padStart(2, "0")}`;
}

/**
 * Find a quoted phrase among the words: [first item index, last]. Words are
 * matched as captioned, so a multi-word caption fix ("Cooper Netties" ->
 * "New York") matches its new words.
 */
export function findQuote(
  items: Item[],
  quote: string,
  occurrence = 1,
): [number, number] | undefined {
  const want = quote.split(/\s+/).map(norm).filter(Boolean);
  if (!want.length) return undefined;
  const words: { i: number; w: string }[] = [];
  items.forEach((it, i) => {
    if (it.kind !== "word") return;
    // A word folded into the previous one's caption fix has no text.
    for (const part of it.text.split(/\s+/)) {
      const w = norm(part);
      if (w) words.push({ i, w });
    }
  });
  let seen = 0;
  for (let k = 0; k + want.length <= words.length; k++) {
    if (want.every((w, m) => words[k + m].w === w)) {
      seen += 1;
      if (seen === occurrence) {
        return [words[k].i, words[k + want.length - 1].i];
      }
    }
  }
  return undefined;
}

/** Items whose middle falls inside [start, end]. */
export function itemsInRange(
  items: Item[],
  start: number,
  end: number,
): Item[] {
  return items.filter((it) => {
    const mid = (it.s + it.e) / 2;
    return mid >= start && mid <= end;
  });
}
