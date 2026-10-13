// Copyright (C) 2026 System Initiative, Inc.
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

import { z } from "npm:zod@4.3.6";
import type { MethodOutput } from "../../engine/tracker.ts";
import { describedOf } from "./publish_rounds.ts";
import { roundArguments, roundResource, runRound } from "./round_method.ts";
import { describeAdapter } from "./operations.ts";
import {
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
  trackerResources,
} from "./tracker_methods.ts";

// ---------------------------------------------------------------------------
// What a tracker model stagecraft ships has: the shared methods
// (trackerMethods), and the round method a shipped workflow drives publish
// and mark_duplicate through (round_method.ts), here for the tracker itself:
// it plans, and its own operate makes the steps.
// ---------------------------------------------------------------------------

/** Every resource spec a tracker model declares. */
export const trackerModelResources = {
  ...trackerResources,
  ...roundResource,
};

/** Every method a tracker model has, over its adapter. */
export function trackerModelMethods(options: TrackerModelOptions) {
  return {
    ...trackerMethods(options),
    round: {
      description:
        "One round of a run (publish, mark_duplicate, claim, create, fetch_issue), as the shipped workflows drive it: record the answers the tracker's operate wrote for the last round and plan the next",
      arguments: roundArguments,
      execute: async (
        args: z.infer<typeof roundArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const instance = ctx.definition?.name;
        if (instance === undefined) {
          throw new Error("this method context has no definition name");
        }
        return await runRound(args, ctx, () => ({
          options,
          described: describedOf(options, ctx),
          tracker: { instance, name: options.tracker },
          conformance: describeAdapter(options.adapter(ctx)),
        }));
      },
    },
  };
}
