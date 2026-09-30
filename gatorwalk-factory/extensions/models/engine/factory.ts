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
  initFactory,
  KEY_SPEC,
  type MethodContextLike,
  newKey,
  validateFactory,
} from "../_lib/engine/work_item_ops.ts";
import { STARTERS } from "../_lib/engine/starters.ts";

// ---------------------------------------------------------------------------
// The factory: a model instance whose globalArguments name a team's factory
// definition file, a repo-relative YAML path (factories/<name>.yaml by
// convention). There is one copy of the definition, in the repo. Work items
// read it when they start and pin a copy, so editing the file never changes
// a running work item.
//
// The globalArguments schema is only the path. Its rules (relative, .yaml or
// .yml, inside the repo, existing) are checked when the file is read
// (definition_file.ts), since init runs before the file exists. The full
// check of the definition is the validate method (schema, then graph
// analysis), and its schema check runs again whenever a work item starts.
//
// init copies a bundled starter to the definition path; it never overwrites.
//
// design_page renders the factory definition, with its graph findings, as a
// static HTML page stored as the factory's design-page file.
// ---------------------------------------------------------------------------

export const FactoryArgumentsSchema = z.object({
  definition: z.string().min(1).describe(
    "The factory definition file: a YAML path relative to the repo, " +
      "e.g. factories/team.yaml",
  ),
});

const STARTER_NAMES = Object.keys(STARTERS) as [string, ...string[]];

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. factory_test checks it equals FACTORY_TYPE.
  type: "@swamp/gatorwalk-factory/factory",
  version: "2026.09.28.1",
  globalArguments: FactoryArgumentsSchema,
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
        "The definition as a static HTML page: the stage graph, gates, human " +
        "stops, handoffs and graph findings",
      contentType: "text/html",
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    init: {
      description:
        "Copy a starter factory definition to this factory's definition file; never overwrites",
      // Not a read method: it writes the file.
      arguments: z.object({
        from: z.enum(STARTER_NAMES).describe(
          "The starter to copy: one of the skill's example factory definitions",
        ),
      }),
      execute: (args: { from: string }, context: MethodContextLike) =>
        initFactory(context, args.from),
    },
    validate: {
      description:
        "Check the definition in full, analyse it as a graph, and report every problem with its path",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        validateFactory(context),
    },
    design_page: {
      description:
        "Render the definition, with its graph findings, as a static HTML page stored as the design-page file",
      // Not a read method: it stores the page.
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        designPageMethod(context),
    },
    new_key: {
      description:
        "Generate an unused work-item key for this factory, to start a work item under",
      // Not a read method: it records the key, under the factory's lock.
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
