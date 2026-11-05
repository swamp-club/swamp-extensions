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
 * The ffmpeg command that renders a take from its edit list, built as data
 * so tests can check it without running ffmpeg. demo-polish's approach:
 * one select expression picks the kept frames from video and audio alike
 * (audio chunked one video frame per audio frame), sped spans keep every
 * speed-th frame, and the voice is muted under fast-forwards where a racing
 * clock shows wall time. Around that: Adam's pixelation of credentials (on
 * raw time, before the remap) and voice cleanup, the cards contract (intro,
 * outro, lower third, fast-forward badge), intro music and a quiet bed, and
 * an optional cold open: the take's first seconds play before the intro.
 * Several takes each run their own chain up to a join; everything after it
 * (overlays, cards, music, bed) runs once over the joined video.
 *
 * @module
 */

import { outputStarts, type Span } from "./edit_list.ts";
import type { Redaction } from "./screen.ts";

/** Seconds the intro card holds, including the crossfade. */
export const TITLE_LEN = 4.5;
export const XFADE = 0.7;
/** Music level under the voice before it fades out. */
const DUCK = 0.2;
/** Music level under fast-forwards (relative to the -16 LUFS intro). */
const BED = 0.3;
/** Default level of a full-length bed: dB on the bed normalized to -16 LUFS. */
const FULL_BED_LEVEL = -12;
/** Seconds a full-length bed fades in and out by default. */
const FULL_BED_FADE = 1.5;
/** Pushes a ducked bed down while the voice is talking. */
const BED_DUCK = "threshold=0.03:ratio=6:attack=20:release=400";
export const VOICE_CLEANUP =
  "highpass=f=80,afftdn=nf=-25,acompressor=threshold=-21dB:ratio=3:attack=5:release=120:makeup=2";
const CAPTION_STYLE =
  "FontName=Noto Sans,FontSize=12,Bold=1,PrimaryColour=&H00FFFFFF," +
  "BorderStyle=3,OutlineColour=&H60000000,Outline=1.2,Shadow=0,MarginV=22";

export type Encoder = "libx264" | "vaapi" | "qsv" | "nvenc";

export interface Card {
  path: string;
  /** Seconds on screen, including the crossfade. */
  seconds: number;
}

/**
 * The cards contract: what any card source (simple, brand, custom) hands
 * render. Overlays are full-frame transparent PNGs, scaled to the video.
 */
export interface Cards {
  intro?: Card;
  outro?: Card;
  lowerThird?: Card & {
    /** Output seconds into the take (after the intro) it appears. */
    at: number;
  };
  fastForwardBadge?: { path: string };
}

export interface Loudness {
  input_i: string;
  input_tp: string;
  input_lra: string;
  input_thresh: string;
  target_offset: string;
}

/** One recording's part in a render: what its own chain needs. */
export interface TakeSource {
  recording: string;
  speechTrack: number;
  fps: number;
  spans: Span[];
  redactions: Redaction[];
  /** Measured by a first pass; absent renders single-pass. */
  measured?: Loudness;
}

/** A render: its first take, inline, then what applies to the whole video. */
export interface RenderPlan extends TakeSource {
  /** Takes joined after the first, in order. */
  moreTakes?: TakeSource[];
  /** How takes meet: a hard cut (default), or a crossfade. */
  takeTransition?: "cut" | "fade";
  width: number;
  height: number;
  cards: Cards;
  /** Intro music, under the intro card. */
  music?: string;
  /** Quiet music under fast-forwards, or the whole video in full mode. */
  bed?: string;
  /** Where the bed plays (default waits: under fast-forwards). */
  bedMode?: "waits" | "full";
  /** Full mode: dB on the bed normalized to -16 LUFS (default -12). */
  bedLevel?: number;
  /** Full mode: push the bed down while the voice is talking. */
  bedDuck?: boolean;
  /** Output seconds a bed stretch needs before the bed plays (default 0). */
  bedMin?: number;
  /** Seconds the bed fades in and out (default 0.4, or 1.5 in full mode). */
  bedFade?: number;
  /** Fast-forwards closer than this share one bed (default 0: never). */
  bedMerge?: number;
  /**
   * Cold open: seconds into the edited take where the hook ends. The hook
   * plays first, then the intro card and its music, then the rest.
   */
  hook?: number;
  /** How the hook gives way to the intro card (default cut). */
  hookTransition?: "cut" | "fade";
  voiceCleanup: boolean;
  /** Integrated loudness target, LUFS. */
  loudnessTarget: number;
  burn: boolean;
  /** Captions file, relative to the work dir (ffmpeg runs there). */
  captions: string;
  font: string;
}

const isStill = (path: string) => /\.(png|jpe?g|webp)$/i.test(path);

/**
 * Input flags that keep an overlay video's alpha: ffmpeg's native VP9
 * decoder drops it, so WebM overlays go through libvpx. ProRes 4444 (.mov)
 * keeps alpha as it is.
 */
const alphaDecoder = (path: string) =>
  /\.webm$/i.test(path) ? ["-c:v", "libvpx-vp9"] : [];

/**
 * A value placed inside single quotes in the filter graph. Inside quotes
 * ffmpeg takes everything literally until the next quote, so escaping can't
 * make a quote, colon or backslash safe there: refuse them instead.
 */
export function safeFilterText(s: string, what: string): string {
  if (/['\\:;,\[\]]/.test(s)) {
    throw new Error(
      `${what} "${s}" contains a character the ffmpeg filter graph can't take (' \\ : ; , [ ])`,
    );
  }
  return s;
}

/**
 * The working audio rate: one whose samples per video frame is a whole
 * number, so audio chunks line up with frames (48000 at 25/30/60 fps, 60000
 * at 29.97 and 59.94). A rounded chunk size would drift across many cuts.
 */
export function chunkRate(fps: number): number {
  for (let rate = 48000; rate <= 240000; rate += 6000) {
    const n = rate / fps;
    if (Math.abs(n - Math.round(n)) < 1e-6) return rate;
  }
  return 48000;
}

/** a+b+c… as a balanced tree: ffmpeg rejects long flat chains. */
export function sumExpr(terms: string[]): string {
  if (!terms.length) throw new Error("sumExpr needs at least one term");
  if (terms.length === 1) return terms[0];
  const mid = terms.length >> 1;
  return `(${sumExpr(terms.slice(0, mid))})+(${sumExpr(terms.slice(mid))})`;
}

export function selectExpr(spans: Span[], fps: number): string {
  return sumExpr(
    spans.map(([a, b, speed]) =>
      `gte(t,${(a - 1e-4).toFixed(4)})*lt(t,${(b - 1e-4).toFixed(4)})` +
      (speed > 1 ? `*not(mod(round((t-${a.toFixed(4)})*${fps}),${speed}))` : "")
    ),
  );
}

/**
 * Where the bed plays, in output seconds: one window per fast-forward
 * (shifted past the intro), joined with the next when the gap is under
 * `merge`, then dropped when shorter than `min`, gap included.
 */
export function bedStretches(
  fast: { span: Span; i: number }[],
  starts: number[],
  shift: number,
  merge: number,
  min: number,
): [number, number][] {
  const windows: [number, number][] = [];
  for (const { span: [s, e, speed], i } of fast) {
    const start = starts[i] + shift;
    const end = start + (e - s) / speed;
    const last = windows.at(-1);
    if (last && start - last[1] < merge) last[1] = end;
    else windows.push([start, end]);
  }
  return windows.filter(([a, b]) => b - a >= min);
}

/** Seconds the intro shifts the take by. */
export function introShift(cards: Cards): number {
  return cards.intro ? cards.intro.seconds - XFADE : 0;
}

/**
 * Where the opening sits: the take before `hook` plays first, the intro card
 * comes in at `cardAt`, and the take from `hook` on is `shift` seconds
 * later than it would be alone. A cold open needs an intro card; without
 * one (or a hook) this is today's opening: card at 0, hook 0.
 */
export function opening(
  cards: Cards,
  hook = 0,
  transition: "cut" | "fade" = "cut",
): { hook: number; cardAt: number; shift: number } {
  const shift = introShift(cards);
  if (!cards.intro || hook <= 0) return { hook: 0, cardAt: 0, shift };
  return transition === "fade"
    ? { hook, cardAt: hook - XFADE, shift: shift - XFADE }
    : { hook, cardAt: hook, shift };
}

/**
 * Refuse an opening whose crossfades would need negative offsets, naming
 * what is too short, before any ffmpeg pass runs. A fade cold open fades
 * the hook into the intro and the intro into the take, so the hook must
 * outlast one crossfade and the intro two.
 */
export function checkOpening(
  cards: Cards,
  hook = 0,
  transition: "cut" | "fade" = "cut",
): void {
  if (!cards.intro || hook <= 0 || transition !== "fade") return;
  if (hook <= XFADE) {
    throw new Error(
      `the cold open's hook is ${hook.toFixed(2)}s, too short to fade into ` +
        `the intro card (the crossfade is ${XFADE}s): end the cold open later, ` +
        `or set the media coldOpenTransition to cut`,
    );
  }
  if (cards.intro.seconds <= 2 * XFADE) {
    throw new Error(
      `the intro card is ${cards.intro.seconds}s; after a fading cold open ` +
        `it fades in and out, so it must be longer than ${2 * XFADE}s: use a ` +
        `longer intro, or set the media coldOpenTransition to cut`,
    );
  }
}

function loudnorm(
  plan: RenderPlan,
  m: Loudness | undefined,
  measure: boolean,
): string {
  const base = `loudnorm=I=${plan.loudnessTarget}:TP=-1.5:LRA=11`;
  if (measure) return `${base}:print_format=json`;
  if (!m) return base;
  return `${base}:measured_I=${m.input_i}:measured_TP=${m.input_tp}` +
    `:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}` +
    `:offset=${m.target_offset}:linear=true`;
}

/** The voice chain from a take's recording to its normalized edited voice. */
function voiceChain(
  plan: RenderPlan,
  take: TakeSource,
  input: number,
  measure: boolean,
): string {
  const fast = take.spans.filter(([, , speed]) => speed > 1);
  const rate = chunkRate(take.fps);
  const n = Math.round(rate / take.fps);
  const mute = fast.length
    ? "volume=0:enable='" +
      sumExpr(
        fast.map(([a, b]) => `between(t,${a.toFixed(4)},${b.toFixed(4)})`),
      ) +
      "',"
    : "";
  return `[${input}:a:${take.speechTrack}]aresample=${rate}:async=1:first_pts=0,${mute}` +
    (plan.voiceCleanup ? `${VOICE_CLEANUP},` : "") +
    `asetnsamples=n=${n}:p=0,aselect='${selectExpr(take.spans, take.fps)}',` +
    `asetpts=N/SR/TB,${loudnorm(plan, take.measured, measure)},aresample=48000`;
}

/**
 * The filter that only measures the edited voice's loudness (first pass).
 * It holds the whole select expression, so it goes in a script file, not
 * argv: a long take's expression can pass the per-argument size limit.
 */
export function measureFilter(
  plan: RenderPlan,
  take: TakeSource = plan,
): string {
  // A measuring pass reads only this take's file: its input 0.
  return voiceChain(plan, take, 0, true).replace(/^\[0:a:\d+\]/, "");
}

/** The measuring pass, reading `measureFilter`'s output from `script`. */
export function measureArgs(
  take: TakeSource,
  script: string,
): string[] {
  return [
    "-hide_banner",
    "-nostats",
    "-i",
    take.recording,
    "-vn",
    "-/af",
    script,
    "-map",
    `0:a:${take.speechTrack}`,
    "-f",
    "null",
    "-",
  ];
}

/** The loudnorm JSON block a measuring pass prints on stderr. */
export function parseLoudness(stderr: string): Loudness {
  const blocks = stderr.match(/\{[^{}]*"input_i"[^{}]*\}/g);
  if (!blocks) throw new Error("loudness measurement printed no summary");
  return JSON.parse(blocks[blocks.length - 1]);
}

/**
 * Whether a measurement can drive a second pass. Silence measures -inf, which
 * loudnorm refuses as an input, so such a take has to run single-pass.
 */
export function usableLoudness(m: Loudness): boolean {
  return [m.input_i, m.input_tp, m.input_lra, m.input_thresh, m.target_offset]
    .every((value) => Number.isFinite(Number(value)));
}

export interface BuiltGraph {
  inputs: string[];
  graph: string;
  video: string;
  audio: string;
  /** The burned-caption output, when burning. */
  videoBurned?: string;
  audioBurned?: string;
  /** Output length in seconds, cards included. */
  duration: number;
}

/** Every take in a plan, in order. */
export function takesOf(plan: RenderPlan): TakeSource[] {
  return [plan, ...(plan.moreTakes ?? [])];
}

/**
 * Where each take sits in the joined video, before any intro: its start, its
 * length, and the total. A crossfade overlaps neighbours by XFADE.
 */
export function takeTimeline(
  plan: RenderPlan,
): { starts: number[]; seconds: number[]; total: number } {
  const overlap = plan.takeTransition === "fade" ? XFADE : 0;
  const starts: number[] = [];
  const seconds: number[] = [];
  let at = 0;
  for (const take of takesOf(plan)) {
    const { total } = outputStarts(take.spans, take.fps);
    starts.push(at);
    seconds.push(total);
    at += total - overlap;
  }
  return {
    starts,
    seconds,
    total: starts[starts.length - 1] + seconds[seconds.length - 1],
  };
}

/**
 * Refuse a join that can't be built, naming the take, before any ffmpeg pass
 * runs: a take that keeps nothing, one too short to fade in and out, or a
 * cold open that would end in a crossfade between takes.
 */
export function checkJoin(plan: RenderPlan): void {
  const takes = takesOf(plan);
  if (takes.length < 2) return;
  const { seconds, starts } = takeTimeline(plan);
  takes.forEach((take, k) => {
    if (!take.spans.length) {
      throw new Error(
        `the edit list of ${take.recording} keeps nothing: keep some of it ` +
          `(edit.txt or the keep method), or leave that take out of takes`,
      );
    }
    if (plan.takeTransition === "fade" && seconds[k] <= 2 * XFADE) {
      throw new Error(
        `${take.recording} is ${seconds[k].toFixed(2)}s after editing, too ` +
          `short to fade in and out (the crossfade is ${XFADE}s): keep more of ` +
          `it, or set the media takeTransition to cut`,
      );
    }
  });
  const hook = plan.cards.intro ? plan.hook ?? 0 : 0;
  if (plan.takeTransition === "fade" && hook > starts[1]) {
    throw new Error(
      `the cold open ends ${hook.toFixed(2)}s in, inside the crossfade into ` +
        `the second take: end it before ${starts[1].toFixed(2)}s, or set the ` +
        `media takeTransition to cut`,
    );
  }
}

function fit(w: number, h: number, fps: number): string {
  return `fps=${fps},scale=${w}:${h}:force_original_aspect_ratio=decrease,` +
    `pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2,format=yuv420p,setsar=1,settb=AVTB`;
}

export function buildGraph(plan: RenderPlan): BuiltGraph {
  const { fps, width: w, height: h, cards } = plan;
  const takes = takesOf(plan);
  if (takes.length === 1 && !plan.spans.length) {
    throw new Error(
      "the edit list keeps nothing: keep some of the take (edit.txt or the keep method) before rendering",
    );
  }
  checkJoin(plan);
  const timeline = takeTimeline(plan);
  const total = timeline.total;
  // The whole video's spans and where they start in it. A take's own chain
  // works in its own time; overlays, the bed and the opening use these.
  const spans = takes.flatMap((t) => t.spans);
  const starts = takes.flatMap((t, k) =>
    outputStarts(t.spans, t.fps).starts.map((at) => at + timeline.starts[k])
  );
  const fast = spans.map((span, i) => ({ span, i })).filter(({ span }) =>
    span[2] > 1
  );
  const inputs = takes.flatMap((t) => ["-i", t.recording]);
  let nextInput = takes.length;
  const addInput = (...args: string[]) => {
    inputs.push(...args);
    return nextInput++;
  };
  const graph: string[] = [];

  /** A take's frames, from its recording to its edited picture. */
  const takeVideo = (take: TakeSource, input: number, prefix: string) => {
    // Pixelate credentials on raw time and pixels, before frames are dropped.
    let v = `${prefix}vraw`;
    graph.push(`[${input}:v:0]fps=${take.fps},format=yuv420p[${v}]`);
    take.redactions.forEach((r, k) => {
      const rd = `${prefix}rd${k}`;
      const sw = Math.max(1, Math.round(r.width / 12));
      const sh = Math.max(1, Math.round(r.height / 12));
      graph.push(
        `[${v}]split[${rd}a][${rd}b]`,
        `[${rd}b]crop=${r.width}:${r.height}:${r.x}:${r.y},scale=${sw}:${sh},` +
          `scale=${r.width}:${r.height}:flags=neighbor[${rd}p]`,
        `[${rd}a][${rd}p]overlay=${r.x}:${r.y}:enable='between(t,${r.start},${r.end})'[${rd}]`,
      );
      v = rd;
    });

    // Keep the edit list's frames; a racing clock over each fast-forward.
    const own = outputStarts(take.spans, take.fps).starts;
    let labels = "";
    take.spans.forEach(([a, b, speed], i) => {
      if (speed <= 1) return;
      const o = own[i];
      const real = `max(0,t-${o.toFixed(4)})*${speed}`; // wall-clock time into the wait
      labels +=
        `,drawtext=font='${
          safeFilterText(plan.font, "font")
        }':fontsize=h*0.035:fontcolor=white` +
        `:text='▶▶ ${speed}×   %{eif\\:floor(${real}/60)\\:d}\\:%{eif\\:mod(floor(${real}),60)\\:d\\:2}'` +
        `:box=1:boxcolor=black@0.55:boxborderw=18:x=w-tw-48:y=48` +
        `:enable='between(t,${o.toFixed(4)},${
          (o + (b - a) / speed).toFixed(4)
        })'`;
    });
    const out = `${prefix}vsel`;
    graph.push(
      `[${v}]select='${
        selectExpr(take.spans, take.fps)
      }',setpts=N/FRAME_RATE/TB${labels},` +
        `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2[${out}]`,
    );
    return out;
  };

  let v: string;
  let a = "a";
  if (takes.length === 1) {
    v = takeVideo(plan, 0, "");
  } else {
    takes.forEach((take, k) => {
      const p = `take${k}`;
      const edited = takeVideo(take, k, p);
      graph.push(
        `[${edited}]${take.fps === fps ? "" : `fps=${fps},`}` +
          `format=yuv420p,setsar=1,settb=AVTB[${p}v]`,
      );
      // Exactly as long as the take's picture, so what follows stays in sync.
      const end = timeline.seconds[k].toFixed(4);
      graph.push(
        `${voiceChain(plan, take, k, false)},aformat=channel_layouts=stereo,` +
          `apad=whole_dur=${end},atrim=end=${end},asetpts=PTS-STARTPTS[${p}a]`,
      );
    });
    if (plan.takeTransition === "fade") {
      v = "take0v";
      a = "take0a";
      for (let k = 1; k < takes.length; k++) {
        graph.push(
          `[${v}][take${k}v]xfade=transition=fade:duration=${XFADE}:offset=${
            timeline.starts[k].toFixed(4)
          }[vjoin${k}]`,
          `[${a}][take${k}a]acrossfade=d=${XFADE}[ajoin${k}]`,
        );
        v = `vjoin${k}`;
        a = `ajoin${k}`;
      }
    } else {
      graph.push(
        takes.map((_, k) => `[take${k}v][take${k}a]`).join("") +
          `concat=n=${takes.length}:v=1:a=1[vjoin][ajoin]`,
      );
      v = "vjoin";
      a = "ajoin";
    }
  }
  if (cards.fastForwardBadge && fast.length) {
    const badge = cards.fastForwardBadge.path;
    // A still holds; an animated badge loops for as long as the take runs.
    const k = isStill(badge)
      ? addInput("-loop", "1", "-i", badge)
      : addInput("-stream_loop", "-1", ...alphaDecoder(badge), "-i", badge);
    const when = sumExpr(
      fast.map(({ span: [a, b, speed], i }) =>
        `between(t,${starts[i].toFixed(4)},${
          (starts[i] + (b - a) / speed).toFixed(4)
        })`
      ),
    );
    graph.push(
      `[${k}:v]${isStill(badge) ? "" : `fps=${fps},`}scale=${w}:${h},` +
        `format=rgba[badge]`,
      `[${v}][badge]overlay=0:0:shortest=1:enable='${when}'[vbadge]`,
    );
    v = "vbadge";
  }
  if (cards.lowerThird) {
    const lt = cards.lowerThird;
    if (isStill(lt.path)) {
      const k = addInput("-loop", "1", "-i", lt.path);
      graph.push(
        `[${k}:v]scale=${w}:${h},format=rgba[lt]`,
        `[${v}][lt]overlay=0:0:shortest=1:enable='between(t,${lt.at},${
          lt.at + lt.seconds
        })'[vlt]`,
      );
    } else {
      // An animated lower third plays once from `at`, so its own
      // entrance and exit show; the take carries on when it ends.
      const k = addInput(...alphaDecoder(lt.path), "-i", lt.path);
      graph.push(
        `[${k}:v]fps=${fps},scale=${w}:${h},format=rgba,` +
          `setpts=PTS-STARTPTS+${lt.at}/TB[lt]`,
        `[${v}][lt]overlay=0:0:eof_action=pass:enable='between(t,${lt.at},${
          lt.at + lt.seconds
        })'[vlt]`,
      );
    }
    v = "vlt";
  }
  graph.push(
    `[${v}]format=yuv420p,setsar=1,settb=AVTB` +
      (plan.burn ? ",split=2[v1][vs]" : "[v1]"),
  );
  if (plan.burn) {
    graph.push(
      `[vs]subtitles='${
        safeFilterText(plan.captions, "captions file")
      }':force_style='${CAPTION_STYLE}'[v2]`,
    );
  }
  if (takes.length === 1) graph.push(`${voiceChain(plan, plan, 0, false)}[a]`);

  // A ducked bed follows the voice alone, split off before any music joins it.
  const fullBed = plan.bedMode === "full" ? plan.bed : undefined;
  const duck = fullBed !== undefined && plan.bedDuck === true;
  let voiceKey = false;
  const splitVoiceKey = () => {
    if (!duck || voiceKey) return;
    voiceKey = true;
    graph.push(`[${a}]asplit=2[avoice][akey]`);
    a = "avoice";
  };

  let v1 = "v1", v2 = "v2";
  const shift = introShift(cards);
  const open = opening(cards, plan.hook, plan.hookTransition);
  if (open.hook) {
    if (open.hook >= total) {
      throw new Error(
        `the cold open (${
          open.hook.toFixed(2)
        }s) leaves nothing of the take after it: ` +
          `end it earlier, or keep more of the take`,
      );
    }
    for (const { span: [a, b, speed], i } of fast) {
      if (starts[i] < open.hook && open.hook < starts[i] + (b - a) / speed) {
        throw new Error(
          `the cold open ends inside the fast-forwarded wait at ${
            a.toFixed(1)
          }s-${b.toFixed(1)}s: end it before or after the wait`,
        );
      }
    }
  }
  if (cards.intro) {
    // The card is the very first frame (link previews use it), then fades
    // into the take; music swells under the card and ducks for the voice.
    // With a cold open the hook plays first and the card follows it.
    const card = cards.intro;
    const k = isStill(card.path)
      ? addInput(
        "-loop",
        "1",
        "-framerate",
        String(fps),
        "-t",
        String(card.seconds),
        "-i",
        card.path,
      )
      : addInput("-t", String(card.seconds), "-i", card.path);
    graph.push(`[${k}:v]${fit(w, h, fps)},split=2[t1][t2]`);
    if (open.hook) {
      const n = Math.round(open.hook * fps);
      const coldOpen = (take: string, title: string) => {
        graph.push(
          `[${take}]split=2[${take}h][${take}b]`,
          `[${take}h]trim=end_frame=${n},setpts=PTS-STARTPTS[${take}hook]`,
          `[${take}b]trim=start_frame=${n},setpts=PTS-STARTPTS[${take}body]`,
          `[${title}][${take}body]xfade=transition=fade:duration=${XFADE}:offset=${shift}[${take}cb]`,
          plan.hookTransition === "fade"
            ? `[${take}hook][${take}cb]xfade=transition=fade:duration=${XFADE}:offset=${
              open.cardAt.toFixed(4)
            }[${take}i]`
            : `[${take}hook][${take}cb]concat=n=2:v=1:a=0[${take}i]`,
        );
      };
      coldOpen(v1, "t1");
      v1 = "v1i";
      if (plan.burn) {
        coldOpen(v2, "t2");
        v2 = "v2i";
      } else {
        graph.push("[t2]nullsink");
      }
      // The voice stops under the card and picks up with the body.
      const hook = open.hook.toFixed(4);
      graph.push(
        `[${a}]asplit=2[ah][ab]`,
        `[ah]atrim=end=${hook},asetpts=PTS-STARTPTS[ahook]`,
        `[ab]atrim=start=${hook},asetpts=PTS-STARTPTS,` +
          `adelay=${Math.round(open.shift * 1000)}:all=1[abody]`,
        `[ahook][abody]concat=n=2:v=0:a=1[ad]`,
      );
    } else {
      graph.push(
        `[t1][${v1}]xfade=transition=fade:duration=${XFADE}:offset=${shift}[v1i]`,
      );
      v1 = "v1i";
      if (plan.burn) {
        graph.push(
          `[t2][${v2}]xfade=transition=fade:duration=${XFADE}:offset=${shift}[v2i]`,
        );
        v2 = "v2i";
      } else {
        graph.push("[t2]nullsink");
      }
      graph.push(`[${a}]adelay=${Math.round(shift * 1000)}:all=1[ad]`);
    }
    a = "ad";
    splitVoiceKey();
    if (plan.music) {
      const end = shift + 3.0;
      const duck =
        `if(lt(t,${shift}),1,max(${DUCK},1-(t-${shift})/0.8*(1-${DUCK})))`;
      const m = addInput("-i", plan.music);
      graph.push(
        `[${m}:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-2,` +
          `aresample=48000,atrim=0:${
            end.toFixed(3)
          },volume='${duck}':eval=frame,` +
          `afade=t=out:st=${(end - 2).toFixed(3)}:d=2` +
          (open.cardAt
            ? `,adelay=${Math.round(open.cardAt * 1000)}:all=1`
            : "") +
          "[m]",
        `[${a}][m]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.89:level=false[amx]`,
      );
      a = "amx";
    }
  }
  splitVoiceKey();
  // No bed under a cold open's hook: it comes in only after the card.
  const stretches = bedStretches(
    open.hook ? fast.filter(({ i }) => starts[i] >= open.hook) : fast,
    starts,
    open.shift,
    plan.bedMerge ?? 0,
    plan.bedMin ?? 0,
  );
  if (!fullBed && plan.bed && stretches.length) {
    // Music fades up under each fast-forward (the voice is muted) and out;
    // short ones stay silent, close ones share one stretch.
    const fade = plan.bedFade ?? 0.4;
    const env = sumExpr(
      stretches.map(([a, b]) =>
        `clip((t-${a.toFixed(3)})/${fade},0,1)` +
        `*clip((${b.toFixed(3)}-t)/${fade},0,1)`
      ),
    );
    const k = addInput("-stream_loop", "-1", "-i", plan.bed);
    graph.push(
      `[${k}:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-2,` +
        `aresample=48000,atrim=0:${
          (total + open.shift).toFixed(3)
        },volume='${BED}*(${env})':eval=frame[bed]`,
      `[${a}][bed]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.89:level=false[abed]`,
    );
    a = "abed";
  }
  let duration = total + open.shift;
  if (cards.outro) {
    const card = cards.outro;
    const off = duration - XFADE;
    const k = isStill(card.path)
      ? addInput(
        "-loop",
        "1",
        "-framerate",
        String(fps),
        "-t",
        String(card.seconds),
        "-i",
        card.path,
      )
      : addInput("-t", String(card.seconds), "-i", card.path);
    graph.push(`[${k}:v]${fit(w, h, fps)},split=2[o1][o2]`);
    graph.push(
      `[${v1}][o1]xfade=transition=fade:duration=${XFADE}:offset=${
        off.toFixed(4)
      }[v1o]`,
    );
    v1 = "v1o";
    if (plan.burn) {
      graph.push(
        `[${v2}][o2]xfade=transition=fade:duration=${XFADE}:offset=${
          off.toFixed(4)
        }[v2o]`,
      );
      v2 = "v2o";
    } else {
      graph.push("[o2]nullsink");
    }
    graph.push(`[${a}]apad=pad_dur=${(card.seconds - XFADE).toFixed(3)}[apad]`);
    a = "apad";
    duration = off + card.seconds;
  }
  if (fullBed) {
    // Under everything, so it goes on after the outro's padding. With intro
    // music playing it comes in as that music starts to fade.
    const fade = plan.bedFade ?? FULL_BED_FADE;
    const from = cards.intro && plan.music ? open.cardAt + shift + 1 : 0;
    const end = duration.toFixed(3);
    const level = (10 ** ((plan.bedLevel ?? FULL_BED_LEVEL) / 20)).toFixed(4);
    const k = addInput("-stream_loop", "-1", "-i", fullBed);
    graph.push(
      `[${k}:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-2,` +
        `aresample=48000,atrim=0:${end},volume='${level}*` +
        `clip((t-${
          from.toFixed(3)
        })/${fade},0,1)*clip((${end}-t)/${fade},0,1)'` +
        `:eval=frame[${duck ? "bedq" : "bed"}]`,
    );
    if (duck) {
      // The compressor stops when its key does, so the key runs to the end.
      graph.push(
        `[akey]apad=whole_dur=${end}[akeyfull]`,
        `[bedq][akeyfull]sidechaincompress=${BED_DUCK}[bed]`,
      );
    }
    graph.push(
      `[${a}][bed]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.89:level=false[abed]`,
    );
    a = "abed";
  }
  graph.push(plan.burn ? `[${a}]asplit=2[a1][a2]` : `[${a}]anull[a1]`);
  return {
    inputs,
    graph: graph.join(";\n"),
    video: v1,
    audio: "a1",
    videoBurned: plan.burn ? v2 : undefined,
    audioBurned: plan.burn ? "a2" : undefined,
    duration,
  };
}

/** Global args an encoder needs before the inputs. */
export function encoderGlobals(encoder: Encoder, device: string): string[] {
  return encoder === "vaapi" ? ["-vaapi_device", device] : [];
}

/** Per-output video filter suffix (hardware upload) and codec args. */
export function encoderArgs(
  encoder: Encoder,
  quality: number,
): { upload: string; args: string[] } {
  const audio = ["-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart"];
  switch (encoder) {
    case "vaapi":
      return {
        upload: "format=nv12,hwupload",
        args: ["-c:v", "h264_vaapi", "-qp", String(quality), ...audio],
      };
    case "qsv":
      return {
        upload: "format=nv12",
        args: [
          "-c:v",
          "h264_qsv",
          "-global_quality",
          String(quality),
          ...audio,
        ],
      };
    case "nvenc":
      return {
        upload: "",
        args: [
          "-c:v",
          "h264_nvenc",
          "-preset",
          "p5",
          "-rc",
          "vbr",
          "-cq",
          String(quality),
          "-pix_fmt",
          "yuv420p",
          ...audio,
        ],
      };
    default:
      return {
        upload: "",
        args: [
          "-c:v",
          "libx264",
          "-preset",
          "faster",
          "-crf",
          String(quality),
          "-pix_fmt",
          "yuv420p",
          ...audio,
        ],
      };
  }
}
