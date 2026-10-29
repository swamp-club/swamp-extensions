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
 * `@swamp/video/media`: a person's render settings, kept in their repo as an
 * instance: output size, encoder and quality, intro music and the quiet bed
 * under fast-forwards. render reads the latest `settings` record.
 *
 * @module
 */

import { z } from "zod";
import type { VideoContext } from "./_lib/context.ts";

export const MediaSettingsSchema = z.object({
  width: z.number().int().positive().optional().describe(
    "Output width (default: the recording's)",
  ),
  height: z.number().int().positive().optional().describe(
    "Output height (default: the recording's)",
  ),
  encoder: z.enum(["libx264", "vaapi", "qsv", "nvenc"]).default("libx264"),
  quality: z.number().int().min(0).max(51).default(18).describe(
    "crf for libx264, qp/global_quality/cq for the hardware encoders",
  ),
  vaapiDevice: z.string().default("/dev/dri/renderD128"),
  music: z.string().optional().describe("Intro music under the title card"),
  bed: z.string().optional().describe("Quiet music under fast-forwarded waits"),
  loudness: z.number().default(-14).describe(
    "Integrated loudness target, LUFS",
  ),
  font: z.string().regex(
    /^[^'\\:;,[\]]+$/,
    "font names can't contain ' \\ : ; , [ ]",
  ).default("Adwaita Sans").describe(
    "Font for the fast-forward clock",
  ),
});

export type MediaSettings = z.infer<typeof MediaSettingsSchema>;

export const model = {
  type: "@swamp/video/media",
  version: "2026.10.29.1",
  globalArguments: MediaSettingsSchema,
  resources: {
    settings: {
      description: "Render settings, as render reads them",
      schema: MediaSettingsSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    show: {
      description: "Record these render settings as data for render",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, ctx: VideoContext) => {
        const data = MediaSettingsSchema.parse(ctx.globalArgs);
        const handle = await ctx.writeResource("settings", "settings", data);
        ctx.logger.info(`media: ${data.encoder} q${data.quality}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
