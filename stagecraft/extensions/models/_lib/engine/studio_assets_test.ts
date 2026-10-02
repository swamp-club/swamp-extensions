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
import {
  ASSET_MODULES,
  ENGINE_INPUTS,
  engineImports,
  importSpecifiers,
  studioSourceDigest,
} from "../../../../studio/build.ts";

// The embedded page matches its source. Compared by a digest of the build's
// inputs rather than by rebuilding, since the bundle's bytes depend on the
// Deno version that bundles.
Deno.test("studio assets: the embedded page is built from the current source", async () => {
  assertEquals(
    STUDIO_SOURCE_DIGEST,
    await studioSourceDigest(),
    "studio_assets.ts is stale: run deno task build:studio in stagecraft/",
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

// The registry refuses an extension file over 976.6 KB, so the page is split
// by asset: the script, the fonts, and the rest each have a module.
Deno.test("studio assets: every generated module stays well under the registry's file limit", async () => {
  for (const url of ASSET_MODULES) {
    const { size } = await Deno.stat(url);
    assert(
      size < 800_000,
      `${url.pathname} is ${size} bytes, over the 800,000-byte budget below ` +
        "the registry's 976.6 KB file limit: split it across more asset " +
        "modules in studio/build.ts",
    );
  }
});

// The digest covers the engine modules the page bundles. A new engine import
// the list lacks would leave part of the bundle outside the digest, so a
// change there would not be caught as a stale page.
Deno.test("studio assets: the digest covers every engine module the page imports", async () => {
  assertEquals(
    await engineImports(),
    [...ENGINE_INPUTS].sort(),
    "update ENGINE_INPUTS in studio/build.ts, then run deno task build:studio",
  );
});

Deno.test("studio assets: the import walk reads statements, not comments or strings", () => {
  const text = [
    `// import the page's state`,
    `import { x } from "./state.ts";`,
    `import "./jitless.ts";`,
    `import type { Y } from "../engine/graph.ts";`,
    `export { z } from './model.ts';`,
    `export const NOTE = "comes from somewhere";`,
    `import {`,
    `  a,`,
    `  b,`,
    `} from "./multi.ts";`,
  ].join("\n");
  assertEquals(importSpecifiers(text), [
    "./state.ts",
    "./jitless.ts",
    "../engine/graph.ts",
    "./model.ts",
    "./multi.ts",
  ]);
});
