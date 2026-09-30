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
import { LINEAR_TYPE } from "../../extensions/models/_lib/tracker/backends/linear.ts";
import { SWAMP_CLUB_TYPE } from "../../extensions/models/_lib/tracker/backends/swamp_club.ts";
import { FACTORY_TYPE, withRepo, WORK_ITEM_TYPE } from "../harness.ts";

// ---------------------------------------------------------------------------
// The whole extension through the installed swamp CLI: every model type,
// engine and tracker, loads from the extension source. Needs swamp on PATH;
// see harness.ts.
// ---------------------------------------------------------------------------

Deno.test("cli: every model type registers from the extension source", async () => {
  await withRepo(async (repo) => {
    const { stdout } = await repo.swamp([
      "model",
      "type",
      "search",
      "gatorwalk",
      "--json",
    ]);
    const types = (JSON.parse(stdout) as { results: { raw: string }[] })
      .results.map((r) => r.raw).sort();
    assertEquals(
      types,
      [
        FACTORY_TYPE,
        LINEAR_TYPE,
        SWAMP_CLUB_TYPE,
        WORK_ITEM_TYPE,
      ]
        .sort(),
    );
  });
});
