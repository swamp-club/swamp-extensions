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

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  ASSET_FILES,
  brandDirAssets,
  dataUri,
  embeddedAssets,
} from "./assets.ts";

const sources = new URL("../../../assets/brand/", import.meta.url).pathname;

Deno.test("the embedded assets are assets/brand/ (run deno task embed-assets)", async () => {
  const embedded = embeddedAssets();
  assertEquals(Object.keys(embedded).sort(), [...ASSET_FILES].sort());
  for (const file of ASSET_FILES) {
    assertEquals(
      embedded[file],
      dataUri(file, await Deno.readFile(`${sources}${file}`)),
      file,
    );
  }
});

Deno.test("brandDir: a directory laid out like assets/brand/ replaces the set", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.mkdir(`${dir}/fonts`);
    for (const file of ASSET_FILES) {
      await Deno.writeTextFile(`${dir}/${file}`, `mine:${file}`);
    }
    const assets = await brandDirAssets(dir);
    assertEquals(
      assets["sc-mark.svg"],
      `data:image/svg+xml;base64,${btoa("mine:sc-mark.svg")}`,
    );
    assertStringIncludes(assets["fonts/Inter-var-latin.woff2"], "font/woff2");
    await Deno.remove(`${dir}/palm-silhouette.svg`);
    const err = await assertRejects(() => brandDirAssets(dir));
    assertStringIncludes(String(err), "has no palm-silhouette.svg");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});
