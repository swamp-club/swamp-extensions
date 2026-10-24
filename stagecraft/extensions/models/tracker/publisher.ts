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

import { z } from "npm:zod@4.6.7";
import { type MethodOutput, stringMapFrom } from "../_lib/engine/tracker.ts";
import {
  externalTarget,
  roundArguments,
  roundResource,
  runRound,
} from "../_lib/tracker/core/round_method.ts";
import {
  prefixArgument,
  type TrackerContext,
  trackerResources,
} from "../_lib/tracker/core/tracker_methods.ts";

// ---------------------------------------------------------------------------
// The publisher (swamp-club #3274): publishes work items to a tracker
// written as a separate extension. Such a tracker shares no code with
// stagecraft; it has two methods, describe and operate. The publisher
// keeps what stagecraft keeps of a tracker (the delivery ledger, the publish
// cursor, the ticket index and ticket snapshots), plans each round of a run,
// and the shipped workflows call the tracker's operate for each step. A
// factory binds to the publisher instance, as it binds to a tracker
// stagecraft ships. See DESIGN.md, "Trackers as separate extensions".
// ---------------------------------------------------------------------------

export const PublisherArgumentsSchema = z.object({
  tracker: z.string().min(1).describe(
    "The tracker instance to publish to: a model with describe and " +
      "operate methods (run describe on it once first)",
  ),
  statuses: z.union([z.record(z.string(), z.string()), z.string()])
    .optional().describe(
      "Status keys to the tracker's status names, e.g. " +
        '{"in_progress": "In Progress"}: an object, or a JSON object as a ' +
        "string",
    ),
  prefix: prefixArgument(
    "Leads the keys of work items claimed from the tracker's tickets when " +
      "a ticket's display id is only a number. Defaults to the publisher " +
      "instance's name, cut to 12",
  ),
});

function argumentsOf(globalArgs: Record<string, unknown>) {
  // swamp validates globalArguments with .partial(), so check here too.
  return PublisherArgumentsSchema.partial().parse(globalArgs);
}

function trackerOf(ctx: TrackerContext): string {
  const { tracker } = argumentsOf(ctx.globalArgs ?? {});
  if (tracker === undefined) {
    throw new Error(
      "no tracker: set the publisher's tracker global argument to the " +
        "tracker instance it publishes to",
    );
  }
  return tracker;
}

const statuses = (globalArgs: Record<string, unknown>) =>
  stringMapFrom("statuses", argumentsOf(globalArgs).statuses ?? {});

/**
 * The `@swamp/stagecraft/publisher` model: publishes work items to a
 * tracker written as a separate extension, through the shipped workflows.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it.
  type: "@swamp/stagecraft/publisher",
  version: "2026.10.12.1",
  globalArguments: PublisherArgumentsSchema,
  resources: {
    issue: trackerResources.issue,
    delivery: trackerResources.delivery,
    cursor: trackerResources.cursor,
    ticket: trackerResources.ticket,
    ...roundResource,
  },
  methods: {
    round: {
      description:
        "One round of a run (publish, mark_duplicate, claim, create, fetch_issue), as the shipped workflows drive it: record the answers the tracker's operate wrote for the last round and plan the next",
      arguments: roundArguments,
      execute: async (
        args: z.infer<typeof roundArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> =>
        await runRound(
          args,
          ctx,
          () => externalTarget(ctx, trackerOf(ctx), statuses),
        ),
    },
  },
};
