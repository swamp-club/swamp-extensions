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
import { DefinitionSchema } from "../_lib/engine/definition_schema.ts";
import { SavedScenariosSchema } from "../_lib/engine/scenario.ts";
import {
  KEY_SPEC,
  type MethodContextLike,
  newKey,
  validateFactory,
} from "../_lib/engine/work_item_ops.ts";

// ---------------------------------------------------------------------------
// The factory: a model instance whose globalArguments hold a team's factory
// definition, the tracker instance work items publish to, and the saved
// scenarios its validate method runs. There is one copy of the definition,
// in the factory's model definition. Work items read it when they start and
// pin a copy, so editing it never changes a running work item.
//
// swamp checks the globalArguments against this schema with schema.partial()
// before every method, and swamp model validate does too. partial() only
// makes the top-level keys optional, so a definition that is present gets the
// whole definition schema. The top level must stay a plain object with no
// refinement of its own: swamp falls back to checking key by key when it
// cannot call partial(). definition is optional because swamp model create
// checks the full schema whenever a --global-arg is given, and a factory is
// created with only its tracker before its definition is written in. The
// tracker's model type must be the one the definition's tracker kind needs;
// validate and start check it.
//
// definition and scenarios are marked as foreign template text: their
// {{name}} placeholders are stagecraft's, not swamp's, so swamp's template
// scan neither warns about them nor fails one whose name is a swamp
// namespace, such as {{run}}.
//
// The methods read the definition from the factory's raw model definition,
// not swamp's evaluated globalArguments (work_item_ops.ts, loadFactory). The
// full check is the validate method (schema, tracker, graph analysis, saved
// scenarios), and its schema check runs again whenever a work item starts.
// ---------------------------------------------------------------------------

/** A factory's global arguments: its definition and its saved scenarios. */
export const FactoryArgumentsSchema = z.object({
  definition: DefinitionSchema.optional().meta({
    foreignTemplate: true,
    description: "The factory definition: its stages, transitions, gates " +
      "and prompts. Start from one of the skill's examples.",
  }),
  tracker: z.string().min(1).describe(
    "The tracker instance work items publish to, e.g. board: a model of the " +
      "type the definition's tracker kind needs (the built-in tracker, " +
      "@swamp/stagecraft/tracker, unless it names another)",
  ),
  scenarios: SavedScenariosSchema.optional().meta({
    foreignTemplate: true,
    description: "Saved scenarios: work items walked through the " +
      "definition, which validate runs",
  }),
});

/**
 * The `@swamp/stagecraft/factory` model: holds a factory definition, and
 * validates and describes it.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. factory_test checks it equals FACTORY_TYPE.
  type: "@swamp/stagecraft/factory",
  version: "2026.09.30.1",
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
  methods: {
    validate: {
      description:
        "Check the definition in full, analyse it as a graph, and report every problem with its path",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        validateFactory(context),
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
