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
 * `@swamp/video/edit`: the edit list, the single source of truth for what a
 * render plays. Built from a transcript (fillers, stutters, long pauses and
 * retakes cut; waits fast-forwarded, faster where the screen sat idle), then
 * changed from chat (time ranges or quoted words) or through edit.txt.
 * It can also mark a cold open: the opening words render ahead of the title.
 *
 * @module
 */

import { z } from "zod";
import {
  checkSameRecording,
  readTakeData,
  requireTakeData,
  resolvePath,
  type VideoContext,
} from "./_lib/context.ts";
import {
  applyRetakes,
  buildItems,
  clock,
  DEFAULT_SETTINGS,
  type EditSettings,
  fastEdgeAir,
  findQuote,
  type Item,
  keepSpans,
  outputStarts,
  pauseSpeed,
  pyFixed,
  type Span,
  spokenRetakes,
  type Word,
} from "./_lib/edit_list.ts";
import { applyEditFile, writeEditFile } from "./_lib/edit_file.ts";
import { energy, ensureWorkDir, type Take, takeOf } from "./_lib/media.ts";

const GlobalArgs = z.object({
  maxPause: z.number().positive().default(DEFAULT_SETTINGS.maxPause).describe(
    "Pauses longer than this (seconds) are trimmed",
  ),
  fastMin: z.number().positive().default(DEFAULT_SETTINGS.fastMin).describe(
    "Pauses at least this long play fast-forward instead of being cut",
  ),
  fastTarget: z.number().positive().default(DEFAULT_SETTINGS.fastTarget)
    .describe("A fast-forwarded wait plays for about this many seconds"),
  maxSpeed: z.number().int().min(2).default(DEFAULT_SETTINGS.maxSpeed),
  idleTarget: z.number().positive().default(DEFAULT_SETTINGS.idleTarget)
    .describe("A wait with an idle screen plays for about this many seconds"),
  maxIdleSpeed: z.number().int().min(2).default(DEFAULT_SETTINGS.maxIdleSpeed),
  keepFillers: z.boolean().default(false).describe(
    "Keep um/uh and stutters instead of cutting them",
  ),
  ffmpeg: z.string().default("ffmpeg"),
});

const ItemSchema = z.object({
  kind: z.enum(["word", "pause"]),
  // A word or pause as edit.txt shows it, not a credential.
  // swamp-quality-ignore credentials-sensitive-field
  token: z.string(),
  s: z.number(),
  e: z.number(),
  keep: z.boolean(),
  line: z.number(),
  text: z.string(),
  speed: z.number(),
  idle: z.boolean().optional(),
});

export const EditListSchema = z.object({
  recording: z.string(),
  take: z.string(),
  fps: z.number(),
  rawDuration: z.number(),
  outputDuration: z.number(),
  speechTrack: z.number(),
  settings: z.object({
    maxPause: z.number(),
    fastMin: z.number(),
    fastTarget: z.number(),
    maxSpeed: z.number(),
    idleTarget: z.number(),
    maxIdleSpeed: z.number(),
    keepFillers: z.boolean(),
  }),
  transcriptFrom: z.string(),
  screenFrom: z.string().optional(),
  retakeMarkers: z.array(z.number()),
  /** Raw end of a cold open's hook; absent means no cold open. */
  coldOpenUntil: z.number().optional(),
  items: z.array(ItemSchema),
  spans: z.array(z.tuple([z.number(), z.number(), z.number()])),
  editFile: z.string(),
  /** SHA-256 of edit.txt as last written or imported. */
  editFileHash: z.string().optional(),
  source: z.enum(["build", "import", "chat"]),
  summary: z.object({
    cutWords: z.number(),
    cutPauses: z.number(),
    fastForwards: z.number(),
  }),
  updatedAt: z.string(),
});

export type EditList = z.infer<typeof EditListSchema>;

const Time = z.union([z.number(), z.string()]).describe(
  "Raw recording time: seconds, or m:ss / h:mm:ss",
);

/** Seconds from 754.2, "12:34" or "1:02:03.5". */
export function parseTime(t: number | string): number {
  if (typeof t === "number") return t;
  const raw = t.trim().split(":");
  const parts = raw.map(Number);
  if (
    raw.some((p) => p.trim() === "") ||
    parts.some((p) => Number.isNaN(p) || p < 0)
  ) {
    throw new Error(`not a time: "${t}"`);
  }
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

const BuildArgs = z.object({
  recordingPath: z.string(),
  transcript: z.string().default("transcript").describe(
    "The @swamp/video/transcript instance that transcribed this take",
  ),
  screen: z.string().optional().describe(
    "A @swamp/video/screen instance whose idle ranges speed up waits",
  ),
  retakeMarkers: z.array(Time).default([]).describe(
    "Times a retake was marked (e.g. by a hotkey); each cuts the abandoned sentence",
  ),
  spokenRetakes: z.boolean().default(true).describe(
    'Also treat the spoken word "retake" as a marker (best effort: Whisper may drop it)',
  ),
  coldOpenUntil: z.union([z.number(), z.string()]).optional().describe(
    "Open cold: the words ending the hook (or a raw time) that plays before the title; empty for none",
  ),
});

const ColdOpenArgs = z.object({
  recordingPath: z.string(),
  quote: z.string().optional().describe(
    "Words as spoken; the hook ends after them",
  ),
  occurrence: z.number().int().positive().default(1).describe(
    "Which occurrence of the quote, counting from the start",
  ),
  end: Time.optional().describe(
    "Raw time the hook ends by: it ends after the last word starting before it",
  ),
  clear: z.boolean().default(false).describe("Remove the cold open"),
});

const FileArgs = z.object({
  recordingPath: z.string(),
  path: z.string().optional().describe(
    "edit.txt location (default: the file the take was last edited through, else <recording>.video/edit.txt)",
  ),
});

const RangeArgs = z.object({
  recordingPath: z.string(),
  start: Time.optional(),
  end: Time.optional(),
  quote: z.string().optional().describe(
    "Words as spoken; the range starts at them (and ends at them without untilQuote)",
  ),
  untilQuote: z.string().optional().describe("Words that end the range"),
  occurrence: z.number().int().positive().default(1).describe(
    "Which occurrence of the quote, counting from the start",
  ),
});

const SpeedArgs = RangeArgs.extend({
  speed: z.union([z.number(), z.string()]).default(1).describe(
    "1 plays waits at normal speed; a number forces that speed; auto restores the default",
  ),
});

type Settings = z.infer<typeof GlobalArgs>;

function editSettings(g: Settings): EditSettings {
  return {
    maxPause: g.maxPause,
    fastMin: g.fastMin,
    fastTarget: g.fastTarget,
    maxSpeed: g.maxSpeed,
    idleTarget: g.idleTarget,
    maxIdleSpeed: g.maxIdleSpeed,
    keepFillers: g.keepFillers,
  };
}

function editFilePath(ctx: VideoContext, take: Take, path?: string): string {
  return path ? resolvePath(ctx, path) : `${take.workDir}/edit.txt`;
}

async function idleRanges(
  ctx: VideoContext,
  screen: string | undefined,
  take: Take,
): Promise<[number, number][]> {
  if (!screen) return [];
  const data = await readTakeData(ctx, screen, "screen", take);
  if (!data) {
    ctx.logger.warn(
      `no screen analysis for ${take.name} on ${screen}; waits use the normal speed`,
    );
    return [];
  }
  const idle = Array.isArray(data.idle) ? data.idle : [];
  return idle.filter((r): r is { start: number; end: number } =>
    typeof r?.start === "number" && typeof r?.end === "number"
  ).map((r) => [r.start, r.end]);
}

async function readTranscript(
  ctx: VideoContext,
  instance: string,
  take: Take,
) {
  const t = await requireTakeData(
    ctx,
    instance,
    "transcript",
    take,
    "run its transcribe (or import) method first",
  );
  return t as {
    segments: Word[][];
    duration: number;
    fps: number;
    speechTrack: number;
  };
}

async function finish(
  ctx: VideoContext,
  g: Settings,
  take: Take,
  base: Omit<EditList, "spans" | "outputDuration" | "summary" | "updatedAt">,
  writeFile: boolean,
) {
  const db = await energy(g.ffmpeg, take, base.speechTrack, ctx.signal);
  const items = base.items as Item[];
  const spans: Span[] = fastEdgeAir(
    keepSpans(items, base.fps, db),
    base.fps,
    db,
  );
  const { total } = outputStarts(spans, base.fps);
  const list: EditList = {
    ...base,
    spans,
    outputDuration: total,
    summary: {
      cutWords: items.filter((it) => it.kind === "word" && !it.keep).length,
      cutPauses: items.filter((it) => it.kind === "pause" && !it.keep).length,
      fastForwards:
        items.filter((it) => it.kind === "pause" && it.keep && it.speed > 1)
          .length,
    },
    updatedAt: new Date().toISOString(),
  };
  if (writeFile) {
    await ensureWorkDir(take);
    const content = writeEditFile(
      take.recording.split("/").pop()!,
      items,
      list.settings.maxPause,
      list.coldOpenUntil,
    );
    await Deno.writeTextFile(list.editFile, content);
    list.editFileHash = await sha256(content);
  }
  const handle = await ctx.writeResource("editList", take.name, list);
  ctx.logger.info(
    `${take.name}: ${fmt(list.rawDuration)} -> ${
      fmt(total)
    }; cut ${list.summary.cutWords} words, ` +
      `trimmed ${list.summary.cutPauses} pauses, fast-forwarded ${list.summary.fastForwards} waits`,
  );
  return { dataHandles: [handle] };
}

function fmt(t: number): string {
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
}

async function current(ctx: VideoContext, take: Take): Promise<EditList> {
  const data = await ctx.readResource(take.name);
  if (!data) {
    throw new Error(
      `no edit list for ${take.name}: run this instance's build method first`,
    );
  }
  const list = EditListSchema.parse(data);
  checkSameRecording(list, take, "this edit instance");
  return list;
}

/**
 * Chat edits rewrite edit.txt; refuse when it holds hand edits that were
 * never imported, rather than silently dropping them.
 */
export async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(
    new Uint8Array(digest),
    (b) => b.toString(16).padStart(2, "0"),
  )
    .join("");
}

/**
 * Before build replaces edit.txt, save a copy when it holds hand edits that
 * were never imported.
 */
async function keepUnimported(ctx: VideoContext, take: Take): Promise<void> {
  const prev = await ctx.readResource(take.name);
  const file = prev
    ? EditListSchema.parse(prev).editFile
    : editFilePath(ctx, take);
  let onDisk: string;
  try {
    onDisk = await Deno.readTextFile(file);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return;
    throw err;
  }
  if (prev) {
    const list = EditListSchema.parse(prev);
    const synced = list.editFileHash ??
      await sha256(writeEditFile(
        take.recording.split("/").pop()!,
        list.items as Item[],
        list.settings.maxPause,
        list.coldOpenUntil,
      ));
    if (await sha256(onDisk) === synced) return;
  }
  await Deno.writeTextFile(`${file}.bak`, onDisk);
  ctx.logger.warn(
    `${file} had changes that were never imported; saved them to ${file}.bak`,
  );
}

async function guardUnimported(list: EditList, take: Take): Promise<void> {
  let onDisk: string;
  try {
    onDisk = await Deno.readTextFile(list.editFile);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return;
    throw err;
  }
  const synced = list.editFileHash ??
    await sha256(writeEditFile(
      take.recording.split("/").pop()!,
      list.items as Item[],
      list.settings.maxPause,
      list.coldOpenUntil,
    ));
  if (await sha256(onDisk) !== synced) {
    throw new Error(
      `${list.editFile} has changes that are not in the edit list yet: run this ` +
        `instance's import method (or the video-recut workflow) first, or its ` +
        `export method to discard them`,
    );
  }
}

/** A speed argument: "auto", or a whole number of at least 1. */
export function parseSpeed(speed: number | string): number | "auto" {
  if (speed === "auto") return "auto";
  const n = Number(speed);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(
      `speed must be auto or a number of at least 1, not ${speed}`,
    );
  }
  return Math.round(n);
}

/**
 * Item indexes a range argument covers. With `whole`, a wait the range only
 * partly covers is an error: cut and keep act on whole waits, and cutting
 * ten minutes for a thirty-second range is never what was meant.
 */
export function selectRange(
  items: Item[],
  args: z.infer<typeof RangeArgs>,
  whole = false,
): number[] {
  let start: number, end: number;
  if (args.quote !== undefined) {
    const from = findQuote(items, args.quote, args.occurrence);
    if (!from) {
      throw new Error(`could not find "${args.quote}" in the transcript`);
    }
    start = items[from[0]].s;
    end = items[from[1]].e;
    if (args.untilQuote !== undefined) {
      // Search after the quote, so the end can't land inside it.
      const after = items.slice(from[1] + 1);
      const to = findQuote(after, args.untilQuote);
      if (!to) {
        throw new Error(
          `could not find "${args.untilQuote}" after "${args.quote}"`,
        );
      }
      end = after[to[1]].e;
    }
  } else if (args.start !== undefined && args.end !== undefined) {
    start = parseTime(args.start);
    end = parseTime(args.end);
  } else {
    throw new Error("give start and end times, or a quote");
  }
  if (end < start) throw new Error("the range ends before it starts");
  const out: number[] = [];
  items.forEach((it, i) => {
    const inside = it.kind === "pause"
      ? it.e > start && it.s < end // a wait overlapping the range
      : (it.s + it.e) / 2 >= start && (it.s + it.e) / 2 <= end;
    if (!inside) return;
    if (
      whole && it.kind === "pause" && (it.s < start - 0.05 || it.e > end + 0.05)
    ) {
      throw new Error(
        `the range ${clock(start)}-${clock(end)} covers only part of the ` +
          `${pyFixed(it.e - it.s, 1)}s wait at ${clock(it.s)}-${
            clock(it.e)
          }; ` +
          `cut and keep act on whole waits: widen the range to cover it, ` +
          `or use speed to change how fast it plays`,
      );
    }
    out.push(i);
  });
  return out;
}

/**
 * The raw end of a cold open: after the quote's last word, or after the
 * last word that starts before `end`. Refused when it would leave no words
 * on either side.
 */
export function coldOpenEnd(
  items: Item[],
  where: { quote?: string; occurrence?: number; end?: number | string },
): number {
  let until: number;
  if (where.quote !== undefined) {
    const found = findQuote(items, where.quote, where.occurrence ?? 1);
    if (!found) {
      throw new Error(`could not find "${where.quote}" in the transcript`);
    }
    until = items[found[1]].e;
  } else if (where.end !== undefined) {
    const end = parseTime(where.end);
    const last = items.findLast((it) => it.kind === "word" && it.s < end);
    if (!last) throw new Error(`no words before ${clock(end)} to open with`);
    until = last.e;
  } else {
    throw new Error("give the quote or the time the cold open ends at");
  }
  return checkColdOpen(items, until);
}

/** A cold open must keep words on both sides of it. */
function checkColdOpen(items: Item[], until: number): number {
  const kept = items.filter((it) => it.kind === "word" && it.keep);
  if (!kept.some((it) => it.e <= until + 1e-6)) {
    throw new Error(
      `the cold open ending at ${
        clock(until)
      } keeps no words: end it after something that is said`,
    );
  }
  if (!kept.some((it) => it.s >= until)) {
    throw new Error(
      `the cold open ending at ${
        clock(until)
      } leaves nothing of the take after it`,
    );
  }
  return until;
}

/** build's coldOpenUntil: a time when it reads as one, else a quote. */
function coldOpenFrom(
  items: Item[],
  value: number | string | undefined,
): number | undefined {
  if (value === undefined || value === "") return undefined;
  let end: number | undefined;
  try {
    end = parseTime(value);
  } catch {
    return coldOpenEnd(items, { quote: String(value) });
  }
  return coldOpenEnd(items, { end });
}

async function chatEdit(
  ctx: VideoContext,
  args: z.infer<typeof RangeArgs>,
  change: (items: Item[], picked: number[], settings: EditSettings) => void,
  whole = false,
) {
  const g = GlobalArgs.parse(ctx.globalArgs);
  const take = takeOf(resolvePath(ctx, args.recordingPath));
  const list = await current(ctx, take);
  await guardUnimported(list, take);
  const items = list.items as Item[];
  const picked = selectRange(items, args, whole);
  if (!picked.length) {
    throw new Error("nothing in the transcript falls in that range");
  }
  change(items, picked, list.settings);
  ctx.logger.info(`changed ${picked.length} items`);
  return await finish(ctx, g, take, { ...list, items, source: "chat" }, true);
}

export const model = {
  type: "@swamp/video/edit",
  version: "2026.10.30.1",
  globalArguments: GlobalArgs,
  upgrades: [
    {
      toVersion: "2026.10.30.1",
      description:
        "Add cold opens: build's coldOpenUntil, the cold-open method and the [cold-open] edit.txt marker (no change without one)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    editList: {
      description:
        "Every word and pause of a take, kept or cut, and the spans a render plays",
      schema: EditListSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
  },
  methods: {
    build: {
      description:
        "Build the edit list from a transcript (and screen analysis), and write edit.txt",
      arguments: BuildArgs,
      execute: async (args: z.infer<typeof BuildArgs>, ctx: VideoContext) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const t = await readTranscript(ctx, args.transcript, take);
        const idle = await idleRanges(ctx, args.screen, take);
        const settings = editSettings(g);
        const items = buildItems(t.segments, t.duration, settings, idle);
        await keepUnimported(ctx, take);
        const markers = args.retakeMarkers.map(parseTime);
        if (args.spokenRetakes) markers.push(...spokenRetakes(items));
        applyRetakes(items, markers);
        const coldOpenUntil = coldOpenFrom(items, args.coldOpenUntil);
        return await finish(ctx, g, take, {
          recording: take.recording,
          take: take.name,
          fps: t.fps,
          rawDuration: t.duration,
          speechTrack: t.speechTrack,
          settings,
          transcriptFrom: args.transcript,
          screenFrom: args.screen,
          retakeMarkers: markers,
          coldOpenUntil,
          items,
          editFile: editFilePath(ctx, take),
          source: "build",
        }, true);
      },
    },
    export: {
      description: "Write the edit list out as edit.txt for hand editing",
      arguments: FileArgs,
      execute: async (args: z.infer<typeof FileArgs>, ctx: VideoContext) => {
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const list = await current(ctx, take);
        const path = args.path
          ? editFilePath(ctx, take, args.path)
          : list.editFile;
        // The take is edited through this file from now on.
        return await finish(
          ctx,
          GlobalArgs.parse(ctx.globalArgs),
          take,
          { ...list, editFile: path },
          true,
        );
      },
    },
    import: {
      description:
        "Read a hand-edited edit.txt (this extension's or demo-polish's) back into the edit list",
      arguments: FileArgs,
      execute: async (args: z.infer<typeof FileArgs>, ctx: VideoContext) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const prev = await ctx.readResource(take.name);
        if (prev) checkSameRecording(prev, take, "this edit instance");
        // Default to the file this take was last edited through.
        const path = args.path
          ? editFilePath(ctx, take, args.path)
          : prev
          ? EditListSchema.parse(prev).editFile
          : editFilePath(ctx, take);
        const text = await Deno.readTextFile(path);
        const transcriptFrom = prev
          ? EditListSchema.parse(prev).transcriptFrom
          : "transcript";
        const screenFrom = prev
          ? EditListSchema.parse(prev).screenFrom
          : undefined;
        const t = await readTranscript(ctx, transcriptFrom, take);
        const header = text.match(/^# max-pause: ([\d.]+)/m);
        const settings = {
          ...editSettings(g),
          ...(header ? { maxPause: Number(header[1]) } : {}),
        };
        // Like demo-polish: rebuild from the transcript, then apply the file.
        const items = buildItems(
          t.segments,
          t.duration,
          settings,
          await idleRanges(ctx, screenFrom, take),
        );
        const { warnings, coldOpenUntil } = applyEditFile(
          text,
          items,
          settings,
        );
        for (const w of warnings) ctx.logger.warn(w);
        // edit.txt can't say how fast a wait plays: keep a speed set from
        // chat when the wait is still fast-forwarded.
        if (prev) {
          const before = EditListSchema.parse(prev).items;
          for (const it of items) {
            if (it.kind !== "pause" || !it.keep || it.speed <= 1) continue;
            const old = before.find((b) =>
              b.kind === "pause" && b.s === it.s && b.e === it.e && b.speed > 1
            );
            if (old) it.speed = old.speed;
          }
        }
        // Show each wait as it now plays, so the next rewrite of edit.txt
        // keeps a ~ / >> change instead of reverting it.
        for (const it of items) {
          if (it.kind === "pause" && it.keep) {
            it.token = `${it.speed > 1 ? ">>" : "~"}${
              pyFixed(it.e - it.s, 1)
            }s`;
          }
        }
        return await finish(ctx, g, take, {
          recording: take.recording,
          take: take.name,
          fps: t.fps,
          rawDuration: t.duration,
          speechTrack: t.speechTrack,
          settings,
          transcriptFrom,
          screenFrom,
          retakeMarkers: [],
          coldOpenUntil: coldOpenUntil === undefined
            ? undefined
            : checkColdOpen(items, coldOpenUntil),
          items,
          editFile: path,
          editFileHash: await sha256(text),
          source: "import",
        }, false);
      },
    },
    cut: {
      description:
        'Cut a range, by raw times or by quoting the words ("cut where I said ...")',
      arguments: RangeArgs,
      execute: (args: z.infer<typeof RangeArgs>, ctx: VideoContext) =>
        chatEdit(ctx, args, (items, picked) => {
          for (const i of picked) items[i].keep = false;
        }, true),
    },
    keep: {
      description: "Keep a range that was cut, by raw times or quoted words",
      arguments: RangeArgs,
      execute: (args: z.infer<typeof RangeArgs>, ctx: VideoContext) =>
        chatEdit(ctx, args, (items, picked) => {
          for (const i of picked) items[i].keep = true;
        }, true),
    },
    speed: {
      description:
        'Set how fast the waits in a range play ("don\'t speed up the part where ...")',
      arguments: SpeedArgs,
      execute: (args: z.infer<typeof SpeedArgs>, ctx: VideoContext) =>
        chatEdit(ctx, args, (items, picked, settings) => {
          const speed = parseSpeed(args.speed);
          for (const i of picked) {
            const it = items[i];
            if (it.kind !== "pause") continue;
            // Only waits that play: a cut pause stays cut (keep brings one back).
            if (!it.keep) continue;
            if (speed === "auto") {
              const d = it.e - it.s;
              it.speed = d >= settings.fastMin ? pauseSpeed(it, settings) : 1;
            } else {
              it.speed = speed;
            }
            it.token = `${it.speed > 1 ? ">>" : "~"}${
              pyFixed(it.e - it.s, 1)
            }s`;
          }
        }),
    },
    "cold-open": {
      description:
        "Open cold: the hook up to a quote (or time) plays before the title card; clear removes it",
      arguments: ColdOpenArgs,
      execute: async (
        args: z.infer<typeof ColdOpenArgs>,
        ctx: VideoContext,
      ) => {
        const g = GlobalArgs.parse(ctx.globalArgs);
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const list = await current(ctx, take);
        await guardUnimported(list, take);
        const items = list.items as Item[];
        const coldOpenUntil = args.clear ? undefined : coldOpenEnd(items, args);
        ctx.logger.info(
          coldOpenUntil === undefined
            ? "no cold open"
            : `cold open: the hook ends at ${clock(coldOpenUntil)}`,
        );
        return await finish(ctx, g, take, {
          ...list,
          coldOpenUntil,
          source: "chat",
        }, true);
      },
    },
  },
};
