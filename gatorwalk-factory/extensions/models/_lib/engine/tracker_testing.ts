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
// The engine as tracker tests see it: everything in tracker.ts, plus the
// fakes, fixtures and work-item operations the tests drive. Only test code
// imports this module; boundary_test.ts enforces that.
// ---------------------------------------------------------------------------

export * from "./tracker.ts";
export { type FakeSwamp, fakeSwamp } from "./fake_swamp.ts";
export {
  ALICE,
  expectNow,
  NOBODY,
  smallDefinition,
  testEnv,
} from "./test_support.ts";
export {
  findStage,
  parseDefinition,
  type StageSpec,
} from "./definition_schema.ts";
export { RUN_SCHEMA_VERSION } from "./run_record.ts";
export { TRACKER_KINDS, TRACKER_TYPES } from "./tracker_binding.ts";
export { systemEnv } from "./run_ops.ts";
export { contextStore } from "./run_store.ts";
export {
  advanceMethod,
  decide,
  describeStatus,
  FACTORY_TYPE,
  type MethodContextLike,
  recordProductMethod,
  retargetMethod,
  startWorkItem,
} from "./work_item_ops.ts";
// claim_test drives the real work_item model, so the model entrypoint is
// re-exported here: the one place _lib depends on extensions/models.
export { model as workItemModel } from "../../engine/work_item.ts";
