// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assertEquals, assertNotEquals } from "@std/assert";
import { WORK_MODES } from "../../extensions/models/_lib/engine/definition_schema.ts";
import { modeMeta } from "./ui.tsx";

Deno.test("modeMeta: every work mode has its own entry, not the no-work fallback", () => {
  for (const mode of WORK_MODES) {
    assertNotEquals(modeMeta(mode), modeMeta(undefined), mode);
  }
  assertEquals(modeMeta("behavior").label, "Behavior");
});
