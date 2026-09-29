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
  type MethodContextLike,
  ObjectInput,
  validateStageTemplateHolder,
} from "./_lib/work_item_ops.ts";

// ---------------------------------------------------------------------------
// The template holder: a model instance whose globalArguments are a stage
// template, a stage or small group of stages with a contract. A lifecycle
// holder's apply method copies its stages into a lifecycle; nothing refers to
// the stage template after that. Not to be confused with _lib/template.ts,
// the {{name}} placeholders in prompts.
//
// The globalArguments schema is plain for the same reason as the lifecycle
// holder's (swamp's .partial() and zod refinements), and because a stage
// template's $param placeholders only become valid values once its parameters
// are filled in. The full check is the validate method.
// ---------------------------------------------------------------------------

export const StageTemplateArgumentsSchema = z.object({
  schemaVersion: z.number().describe("The lifecycle format version (1)"),
  name: z.string().describe("The stage template's name"),
  description: z.string().optional(),
  contract: z.record(z.string(), z.unknown()).describe(
    "Inputs, outputs, exits and parameters; checked in full by validate",
  ),
  stages: z.array(z.unknown()).describe(
    "The stages; checked in full by the validate method",
  ),
});

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. template_test checks it equals STAGE_TEMPLATE_TYPE.
  type: "@swamp/gatorwalk-factory/template",
  version: "2026.09.28.1",
  globalArguments: StageTemplateArgumentsSchema,
  methods: {
    validate: {
      description:
        "Fill in the stage template's parameters, check it in full, analyse it as a graph, and report every problem with its path",
      kind: "read" as const,
      arguments: z.object({
        params: ObjectInput.optional().describe(
          "Parameter values (JSON object); defaults fill the rest",
        ),
      }),
      execute: (
        args: { params?: Record<string, unknown> | string },
        context: MethodContextLike,
      ) => validateStageTemplateHolder(context, args),
    },
  },
};
