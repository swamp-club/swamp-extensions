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
 * `@swamp/video/presenter`: who is on the video, kept in the person's own
 * repo as an instance. describe reads it for the call to action and links;
 * card sources (brand) read it for lower thirds and outros. No identity
 * lives in code: every personal field comes from the instance.
 *
 * @module
 */

import { z } from "zod";
import type { VideoContext } from "./_lib/context.ts";

export const PresenterSchema = z.object({
  name: z.string().describe("Name as it should appear on screen"),
  title: z.string().default("").describe("Role, e.g. Principal Engineer"),
  handle: z.string().default("").describe("Handle, e.g. @someone"),
  email: z.string().default(""),
  campaignUrl: z.string().default("").describe(
    "Where viewers go to follow up (booking page, campaign page)",
  ),
  cta: z.string().default("").describe(
    "Call to action shown in descriptions and outros",
  ),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([])
    .describe("Extra links for video descriptions"),
});

export const model = {
  type: "@swamp/video/presenter",
  version: "2026.10.29.1",
  globalArguments: PresenterSchema,
  resources: {
    presenter: {
      description: "The presenter's details, as the video behaviors read them",
      schema: PresenterSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    show: {
      description:
        "Record the presenter's details as data for describe and card sources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, ctx: VideoContext) => {
        const data = PresenterSchema.parse(ctx.globalArgs);
        const handle = await ctx.writeResource("presenter", "presenter", data);
        ctx.logger.info(`presenter: ${data.name}`);
        return { dataHandles: [handle] };
      },
    },
  },
};
