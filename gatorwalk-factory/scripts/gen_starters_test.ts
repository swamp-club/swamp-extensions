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
import { STARTERS } from "../extensions/models/_lib/engine/starters.ts";
import { readExamples } from "./gen_starters.ts";

// The embedded starters are the examples, exactly. Compared by value, since
// the module on disk is the generator's output after deno fmt.
Deno.test("the starters init copies match the skill's examples", async () => {
  assertEquals(
    { ...STARTERS },
    Object.fromEntries(await readExamples()),
    "starters.ts is stale: run deno task gen:starters in gatorwalk-factory/",
  );
});
