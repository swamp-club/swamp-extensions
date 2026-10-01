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

import { assertEquals } from "@std/assert";
import {
  TRACKER_KINDS,
  TRACKER_TYPES,
} from "../_lib/engine/tracker_testing.ts";
import { BUILTIN } from "../_lib/tracker/backends/builtin.ts";
import { LINEAR } from "../_lib/tracker/backends/linear.ts";
import { SWAMP_CLUB } from "../_lib/tracker/backends/swamp_club.ts";
import { model as builtin } from "./builtin.ts";
import { model as linear } from "./linear.ts";
import { model as swampClub } from "./swamp_club.ts";

// The engine checks a factory's tracker instance against a model type per
// kind (tracker_binding.ts). Each adapter's type is a string literal swamp
// reads from the source, so this keeps the engine's map and the adapters in
// step, and each kind the tracker name its externalRefs key uses.

Deno.test("tracker kinds: each kind is an adapter's tracker name, and its type the adapter model's", () => {
  const adapters: Record<string, string> = {
    [BUILTIN]: builtin.type,
    [LINEAR]: linear.type,
    [SWAMP_CLUB]: swampClub.type,
  };
  assertEquals([...TRACKER_KINDS].sort(), Object.keys(adapters).sort());
  for (const kind of TRACKER_KINDS) {
    assertEquals(TRACKER_TYPES[kind], adapters[kind], kind);
  }
});
