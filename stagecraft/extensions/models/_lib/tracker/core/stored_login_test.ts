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

import { assertEquals, assertRejects } from "@std/assert";
import { TrackerError } from "./adapter.ts";
import { readSwampAuthFile } from "./stored_login.ts";

const AUTH_FIXTURES = new URL("../../../../../testdata/auth/", import.meta.url)
  .pathname;

Deno.test("stored login: an auth error names the tracker that read it", async () => {
  for (const tracker of ["builtin", "swamp-club"]) {
    const error = await assertRejects(
      () =>
        readSwampAuthFile(
          (name) =>
            name === "XDG_CONFIG_HOME"
              ? `${AUTH_FIXTURES}key-not-string`
              : undefined,
          tracker,
        ),
      TrackerError,
    );
    assertEquals(error.tracker, tracker);
    assertEquals(error.kind, "auth");
  }
});
