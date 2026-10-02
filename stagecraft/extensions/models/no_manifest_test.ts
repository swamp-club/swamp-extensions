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

// ---------------------------------------------------------------------------
// Go-live guard. CI publishes any directory whose manifest.yaml changes on
// main, so stagecraft stays unpublishable until go-live by having no
// manifest at any depth. This test turns an accidental one into a failure.
// Delete it in the go-live change that adds the manifest.
// ---------------------------------------------------------------------------

const EXTENSION_ROOT = new URL("../../", import.meta.url);

async function findManifests(dir: URL, rel = ""): Promise<string[]> {
  const found: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    const path = rel === "" ? entry.name : `${rel}/${entry.name}`;
    // Dot-directories (.swamp/ and the like) are runtime state git ignores.
    if (entry.isDirectory && entry.name.startsWith(".")) continue;
    if (entry.isDirectory) {
      found.push(...await findManifests(new URL(`${entry.name}/`, dir), path));
    } else if (
      entry.name === "manifest.yaml" || entry.name === "manifest.yml"
    ) {
      found.push(path);
    }
  }
  return found;
}

Deno.test("stagecraft has no manifest before go-live", async () => {
  assertEquals(await findManifests(EXTENSION_ROOT), []);
});
