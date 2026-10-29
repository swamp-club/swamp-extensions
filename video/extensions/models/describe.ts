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
 * `@swamp/video/describe`: a YouTube title, description and chapters for a
 * finished take. Chapter starts are given in raw recording time (where they
 * happen in the transcript) and mapped through the edit list; the agent
 * drafts title, summary and chapters from the transcript and screen text.
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
import { outputStarts, remapper, type Span } from "./_lib/edit_list.ts";
import { ensureWorkDir, takeOf } from "./_lib/media.ts";
import { parseTime } from "./edit.ts";
import { PresenterSchema } from "./presenter.ts";

const ChapterSchema = z.object({
  start: z.union([z.number(), z.string()]).describe(
    "Raw recording time the chapter starts: seconds or m:ss",
  ),
  title: z.string(),
});

const DescribeArgs = z.object({
  recordingPath: z.string(),
  edit: z.string().default("edit"),
  render: z.string().optional().describe(
    "The @swamp/video/render instance (for the intro length and final duration)",
  ),
  presenter: z.string().optional().describe(
    "A @swamp/video/presenter instance for the call to action and links",
  ),
  title: z.string(),
  summary: z.string(),
  chapters: z.array(ChapterSchema).default([]),
  tags: z.array(z.string()).default([]),
});

export const YoutubeSchema = z.object({
  recording: z.string(),
  take: z.string(),
  title: z.string(),
  description: z.string(),
  chapters: z.array(
    z.object({ start: z.number(), at: z.number(), title: z.string() }),
  ),
  chaptersIncluded: z.boolean(),
  path: z.string(),
  writtenAt: z.string(),
});

export function chapterTime(t: number): string {
  const s = Math.floor(t);
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60;
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/**
 * Chapters at output times under YouTube's rules: the first at 0:00, each
 * at least 10s long, at least three — otherwise none.
 */
export function fitChapters(
  chapters: { start: number; title: string }[],
  toFinal: (t: number) => number,
  duration: number,
): {
  chapters: { start: number; at: number; title: string }[];
  included: boolean;
} {
  const mapped = [...chapters].sort((a, b) => a.start - b.start)
    .map((c) => ({ ...c, at: Math.round(toFinal(c.start) * 100) / 100 }));
  const out: typeof mapped = [];
  for (const c of mapped) {
    const at = out.length === 0 ? 0 : c.at;
    const last = out[out.length - 1];
    if (last && at - last.at < 10) continue;
    out.push({ ...c, at });
  }
  while (out.length > 1 && duration - out[out.length - 1].at < 10) out.pop();
  return { chapters: out, included: out.length >= 3 };
}

export function descriptionText(
  summary: string,
  chapters: { at: number; title: string }[],
  presenter: z.infer<typeof PresenterSchema> | undefined,
  tags: string[],
): string {
  const sections = [summary.trim()];
  if (chapters.length) {
    sections.push(
      chapters.map((c) => `${chapterTime(c.at)} ${c.title}`).join("\n"),
    );
  }
  if (presenter) {
    const contact = [];
    if (presenter.cta && presenter.campaignUrl) {
      contact.push(`${presenter.cta}: ${presenter.campaignUrl}`);
    } else if (presenter.campaignUrl) contact.push(presenter.campaignUrl);
    if (presenter.email) contact.push(`Email: ${presenter.email}`);
    for (const l of presenter.links) contact.push(`${l.label}: ${l.url}`);
    if (contact.length) sections.push(contact.join("\n"));
  }
  if (tags.length) {
    sections.push(tags.map((t) => `#${t.replace(/^#/, "")}`).join(" "));
  }
  return sections.join("\n\n");
}

export const model = {
  type: "@swamp/video/describe",
  version: "2026.10.29.1",
  globalArguments: z.object({}),
  resources: {
    youtube: {
      description: "Title, description and chapters for a finished take",
      schema: YoutubeSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    describe: {
      description:
        "Write the YouTube title, description and chapters (mapped through the edit list)",
      arguments: DescribeArgs,
      execute: async (
        args: z.infer<typeof DescribeArgs>,
        ctx: VideoContext,
      ) => {
        const take = takeOf(resolvePath(ctx, args.recordingPath));
        const list = await requireTakeData(
          ctx,
          args.edit,
          "editList",
          take,
          "run the edit instance's build method first",
        ) as { spans: Span[]; fps: number };
        const video = args.render
          ? await readTakeData(ctx, args.render, "video", take)
          : undefined;
        const shift = (video?.introSeconds as number | undefined) ?? 0;
        const duration = (video?.durationSeconds as number | undefined) ??
          outputStarts(list.spans, list.fps).total;
        const remap = remapper(list.spans, list.fps);
        const { chapters, included } = fitChapters(
          args.chapters.map((c) => ({
            start: parseTime(c.start),
            title: c.title,
          })),
          (t) => remap(t) + shift,
          duration,
        );
        if (!included && args.chapters.length) {
          ctx.logger.info(
            `only ${chapters.length} chapters fit YouTube's rules (3+, 10s+ each); leaving them out`,
          );
        }
        const presenter = args.presenter
          ? PresenterSchema.parse(
            await readLatest(ctx, args.presenter, "presenter") ?? {},
          )
          : undefined;
        const description = descriptionText(
          args.summary,
          included ? chapters : [],
          presenter,
          args.tags,
        );
        await ensureWorkDir(take);
        const path = `${take.workDir}/youtube.txt`;
        await Deno.writeTextFile(path, `${args.title}\n\n${description}\n`);
        const handle = await ctx.writeResource("youtube", take.name, {
          recording: take.recording,
          take: take.name,
          title: args.title,
          description,
          chapters,
          chaptersIncluded: included,
          path,
          writtenAt: new Date().toISOString(),
        });
        ctx.logger.info(`wrote ${path}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
