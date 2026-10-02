// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.3.6";
import {
  apiUrlProblem,
  LINEAR,
  linearAdapter,
} from "../_lib/tracker/backends/linear.ts";
import {
  prefixArgument,
  type TrackerContext,
  trackerMethods,
  trackerResources,
} from "../_lib/tracker/core/tracker_methods.ts";
import { type MethodOutput, stringMapFrom } from "../_lib/engine/tracker.ts";

// ---------------------------------------------------------------------------
// The Linear adapter: one instance per Linear workspace, holding the API
// token (from a vault), the map from status keys to Linear status names, and
// for create the team new issues are filed in and the map from issue types
// to labels. Whom publish assigns at a work item's start is the API key's
// owner: every write already acts as that user, and no swamp login maps to
// a Linear user.
// It is the only stagecraft code that talks to Linear; see DESIGN.md,
// "Trackers".
// ---------------------------------------------------------------------------

/**
 * The Linear tracker's global arguments: its API key and URL, team, and the
 * mapping of the factory's statuses and types to Linear's.
 */
export const LinearArgumentsSchema = z.object({
  apiToken: z.string().min(1).meta({ sensitive: true }).describe(
    "A Linear personal API key. Wire it from a vault: " +
      "${{ vault.get(<vault>, <key>) }}. It is never read from definition " +
      "data, method inputs or the environment.",
  ),
  apiUrl: z.string().url().superRefine((url, ctx) => {
    const problem = apiUrlProblem(url);
    if (problem !== undefined) {
      ctx.addIssue({ code: "custom", message: problem });
    }
  }).optional().describe(
    "Linear's GraphQL endpoint; defaults to https://api.linear.app/graphql. " +
      "Must be https; plain http is allowed only for 127.0.0.1 and [::1]",
  ),
  statuses: z.union([z.record(z.string(), z.string()), z.string()]).optional()
    .describe(
      "Status keys to Linear status names (per team, matched exactly), e.g. " +
        '{"started": "In Progress"}: an object, or a JSON object as a string',
    ),
  prefix: prefixArgument(
    "The team's short name, lowercase, e.g. abc for ABC-12: at most 12 " +
      "lowercase letters, digits and '-'. A work item's key is its issue's " +
      "id as-is (ABC-12 gives abc-12), so the prefix does not rename keys. " +
      "Defaults to the tracker instance's name, cut to 12",
  ),
  teamId: z.string().min(1).optional().describe(
    "The id of the Linear team create files new issues in; create is " +
      "refused without it",
  ),
  types: z.union([z.record(z.string(), z.string()), z.string()]).optional()
    .describe(
      "Issue types to Linear label names (the team's or the workspace's, " +
        'matched exactly), e.g. {"bug": "Bug"}: an object, or a JSON object ' +
        "as a string. Linear has no issue type, so create labels the issue",
    ),
});

function argumentsOf(globalArgs: Record<string, unknown>) {
  // swamp validates globalArguments with .partial(), so check here too.
  return LinearArgumentsSchema.partial().parse(globalArgs);
}

function adapterOf(ctx: TrackerContext) {
  const args = argumentsOf(ctx.globalArgs ?? {});
  if (args.apiToken === undefined || args.apiToken === "") {
    throw new Error(
      "no apiToken: set the apiToken global argument to a " +
        "${{ vault.get(<vault>, <key>) }} expression",
    );
  }
  return linearAdapter({
    apiToken: args.apiToken,
    apiUrl: args.apiUrl,
    teamId: args.teamId,
    types: args.types === undefined
      ? undefined
      : stringMapFrom("types", args.types),
  });
}

const assignArguments = z.object({
  issue: z.string().min(1).describe("The issue's UUID (fetch_issue finds it)"),
  user: z.string().min(1).optional().describe(
    "The Linear user id to assign; defaults to the API key's owner",
  ),
});

/**
 * The `@swamp/stagecraft/linear` model: publishes work items as Linear issues
 * and moves them through the team's workflow states.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. linear_test checks it equals LINEAR_TYPE.
  type: "@swamp/stagecraft/linear",
  version: "2026.10.02.3",
  globalArguments: LinearArgumentsSchema,
  resources: trackerResources,
  methods: {
    ...trackerMethods({
      tracker: LINEAR,
      adapter: adapterOf,
      statuses: (globalArgs) =>
        stringMapFrom("statuses", argumentsOf(globalArgs).statuses),
      assignee: async (ctx) => (await adapterOf(ctx).viewer()).id,
    }),
    assign: {
      description:
        "Assign a Linear issue, by UUID, to a user (the API key's owner by default), replacing the one assignee Linear allows; already assigned writes nothing",
      arguments: assignArguments,
      execute: async (
        args: z.infer<typeof assignArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = adapterOf(ctx);
        const user = args.user ?? (await adapter.viewer()).id;
        const result = await adapter.capabilities.assign.assign(
          args.issue,
          user,
        );
        const who = result.display ?? user;
        const done = result.changed
          ? `assigned ${args.issue} to ${who}`
          : `${args.issue} is already assigned to ${who}; wrote nothing`;
        ctx.logger.info("{summary}", {
          summary: result.dropped.length === 0
            ? done
            : `${done}; replaced ${result.dropped.join(", ")}`,
        });
        return { dataHandles: [] };
      },
    },
  },
};
