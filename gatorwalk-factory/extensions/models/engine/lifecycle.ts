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
  DESIGN_PAGE_SPEC,
  designPageMethod,
  KEY_SPEC,
  type MethodContextLike,
  newKey,
  validateHolder,
} from "../_lib/engine/work_item_ops.ts";

// ---------------------------------------------------------------------------
// The lifecycle holder: a model instance whose globalArguments are a team's
// lifecycle. Work items read it when they start and pin a copy.
//
// The globalArguments schema here is deliberately plain. swamp validates
// globalArguments on every run with schema.partial(), and zod refuses
// .partial() on a schema with refinements, which the full lifecycle schema is
// made of. So this schema only names the top-level fields; the full check is
// the validate method (schema, then graph analysis), and its schema check runs
// again whenever a work item starts.
//
// design_page renders the lifecycle, with its graph findings, as a static
// HTML page stored as the holder's design-page file.
// ---------------------------------------------------------------------------

export const HolderArgumentsSchema = z.object({
  schemaVersion: z.number().describe("The lifecycle format version (1)"),
  name: z.string().describe("The lifecycle's name"),
  description: z.string().optional(),
  stages: z.array(z.unknown()).describe(
    "The stages; checked in full by the validate method",
  ),
  globalTransitions: z.array(z.unknown()).optional().describe(
    "Escape hatches available from any non-terminal stage",
  ),
});

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. lifecycle_test checks it equals HOLDER_TYPE.
  type: "@swamp/gatorwalk-factory/lifecycle",
  version: "2026.09.28.1",
  globalArguments: HolderArgumentsSchema,
  resources: {
    [KEY_SPEC]: {
      description:
        "The latest key new_key generated. A key is only needed until a " +
        "work item starts under it, so few versions are kept.",
      schema: z.object({ key: z.string() }),
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  files: {
    [DESIGN_PAGE_SPEC]: {
      description:
        "The lifecycle as a static HTML page: the stage graph, gates, human " +
        "stops, handoffs and graph findings",
      contentType: "text/html",
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    validate: {
      description:
        "Check the lifecycle in full, analyse it as a graph, and report every problem with its path",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        validateHolder(context),
    },
    design_page: {
      description:
        "Render the lifecycle, with its graph findings, as a static HTML page stored as the design-page file",
      // Not a read method: it stores the page.
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        designPageMethod(context),
    },
    new_key: {
      description:
        "Generate an unused work-item key for this lifecycle, to start a work item under",
      // Not a read method: it records the key, under the holder's lock.
      arguments: z.object({
        title: z.string().min(1).describe(
          "The work's title, slugged into the key",
        ),
      }),
      execute: (args: { title: string }, context: MethodContextLike) =>
        newKey(context, args.title),
    },
  },
};
