// Copyright (C) 2026 Elder Swamp Club, Inc.
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

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { resolvePath, takeOf } from "./context.ts";
import { takeOf as coreTakeOf } from "../../../../extensions/models/_lib/media.ts";
import { resolvePath as coreResolvePath } from "../../../../extensions/models/_lib/context.ts";

// Render finds brand's cards under the take's name and checks the stored
// recording path: both must match @swamp/video's naming exactly.
Deno.test("take naming matches @swamp/video for relative, absolute and ~ paths", () => {
  const home = Deno.env.get("HOME");
  Deno.env.set("HOME", "/home/someone");
  try {
    const ctx = { repoDir: "/repo" };
    for (
      const path of [
        "take.mkv",
        "videos/My Demo (2).mkv",
        "/v/../x.mkv",
        "~/Videos/2026-10-29 12-00-00.mkv",
        "/abs/no-extension",
        "/abs/.hidden",
      ]
    ) {
      const mine = takeOf(resolvePath(ctx, path));
      const core = coreTakeOf(coreResolvePath(ctx, path));
      assertEquals(mine, core, path);
    }
    assertEquals(
      takeOf(resolvePath(ctx, "~/Videos/a.mkv")).recording,
      "/home/someone/Videos/a.mkv",
    );
  } finally {
    if (home === undefined) Deno.env.delete("HOME");
    else Deno.env.set("HOME", home);
  }
});
