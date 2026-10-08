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
import {
  upgradeFactoryArguments,
  upgradeOrPass,
} from "../_lib/engine/definition_upgrade.ts";
import { SavedScenariosSchema } from "../_lib/engine/scenario.ts";
import {
  type MethodContextLike,
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
// A method never reads context.globalArgs.definition: that is the upgraded
// form swamp checked, not what was written.
//
// A definition at an older schemaVersion is upgraded by the same steps
// everywhere (definition_upgrade.ts). swamp writes the upgrade back to the
// factory's file through `upgrades` when one of its methods runs. swamp model
// validate checks globalArguments without running `upgrades` (swamp-club
// #3196), so the schema upgrades a definition before checking it, and accepts
// every version this runtime reads.
// ---------------------------------------------------------------------------

/** A factory's global arguments: its definition and its saved scenarios. */
export const FactoryArgumentsSchema = z.object({
  definition: z.preprocess(upgradeOrPass, DefinitionSchema).optional().meta({
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
  version: "2026.10.08.1",
  globalArguments: FactoryArgumentsSchema,
  // Every entry runs the same function: it goes by the definition's own
  // schemaVersion, so it is right whichever typeVersion an instance is at,
  // and does nothing to a definition already current. A format change adds
  // an entry for its release (definition_upgrade.ts).
  upgrades: [
    {
      toVersion: "2026.10.08.1",
      description: "Upgrade the definition to the current schemaVersion",
      upgradeAttributes: (old: Record<string, unknown>) =>
        upgradeFactoryArguments(old),
    },
  ],
  resources: {},
  methods: {
    validate: {
      description:
        "Check the definition in full, analyse it as a graph, and report every problem with its path",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        validateFactory(context),
    },
  },
};
