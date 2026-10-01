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
  trackerMethods,
  trackerResources,
} from "../_lib/tracker/core/tracker_methods.ts";
import { stringMapFrom } from "../_lib/engine/tracker.ts";

// ---------------------------------------------------------------------------
// The Linear adapter: one instance per Linear workspace, holding the API
// token (from a vault), the map from status keys to Linear status names, and
// for create the team new issues are filed in and the map from issue types
// to labels.
// It is the only gatorwalk code that talks to Linear; see DESIGN.md,
// "Trackers".
// ---------------------------------------------------------------------------

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

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. linear_test checks it equals LINEAR_TYPE.
  type: "@swamp/gatorwalk-factory/linear",
  version: "2026.09.30.2",
  globalArguments: LinearArgumentsSchema,
  resources: trackerResources,
  methods: trackerMethods({
    tracker: LINEAR,
    adapter: (ctx) => {
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
    },
    statuses: (globalArgs) =>
      stringMapFrom("statuses", argumentsOf(globalArgs).statuses),
  }),
};
