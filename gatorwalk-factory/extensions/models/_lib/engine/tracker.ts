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

// ---------------------------------------------------------------------------
// The engine as tracker code sees it (DESIGN.md, "The seam"). Tracker code
// imports the engine only through this module, and this module exports only
// what tracker code imports. boundary_test.ts enforces both.
// ---------------------------------------------------------------------------

export { digestOf } from "./canonical.ts";
export type { AwaitingExit, JournalEvent, ProductKind } from "./journal.ts";
export {
  type FactoryDefinition,
  type ProjectionEntry,
  triggerKey,
} from "./definition_schema.ts";
export { parseRun, type RunRecord, RunRecordSchema } from "./run_record.ts";
export { payloadName, RUN_NAME, RUN_SPEC } from "./run_store.ts";
export { parseTemplate, renderTemplate } from "./template.ts";
export {
  checkPinned,
  type DataReadingContext,
  DEFINITION_NAME,
  DEFINITION_SPEC,
  freshKey,
  loadFactoryDefinition,
  type MethodOutput,
  type ModelDataRecord,
  stringMapFrom,
  typeNameOf,
  WORK_ITEM_TYPE,
} from "./work_item_ops.ts";
