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

import { assert, assertEquals } from "@std/assert";
import { STUDIO_ASSETS, STUDIO_SOURCE_DIGEST } from "./studio_assets.ts";
import { ASSETS_MODULE, studioSourceDigest } from "../../../../studio/build.ts";

// The embedded page matches its source. Compared by a digest of the build's
// inputs rather than by rebuilding, since the bundle's bytes depend on the
// Deno version that bundles.
Deno.test("studio assets: the embedded page is built from the current source", async () => {
  assertEquals(
    STUDIO_SOURCE_DIGEST,
    await studioSourceDigest(),
    "studio_assets.ts is stale: run deno task build:studio in gatorwalk-factory/",
  );
});

Deno.test("studio assets: the page, its script, its styles and its fonts are all served", () => {
  for (const name of ["index.html", "app.js", "studio.css"]) {
    assert(Object.hasOwn(STUDIO_ASSETS, name), name);
  }
  assert(
    Object.keys(STUDIO_ASSETS).some((n) => n.startsWith("fonts/")),
    "no fonts",
  );
});

// The registry refuses an extension file over 976.6 KB. Design mode adds the
// engine bundle to this module; split it by asset before it gets close.
Deno.test("studio assets: the generated module stays well under the registry's file limit", async () => {
  const { size } = await Deno.stat(ASSETS_MODULE);
  assert(size < 800_000, `studio_assets.ts is ${size} bytes`);
});
