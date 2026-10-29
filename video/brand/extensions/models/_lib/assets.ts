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

/**
 * Brand assets (fonts, palm silhouette, SC mark) as data URIs, so a scene
 * page needs nothing next to it. The Swamp Club set ships inside the code
 * (brand_assets.ts, generated from assets/brand/ by scripts/embed_assets.ts):
 * swamp bundles behaviors and the registry only takes text files beside
 * them. `brandDir` swaps in a directory with the same layout.
 *
 * @module
 */

import { EMBEDDED } from "./brand_assets.ts";

export const ASSET_FILES = [
  "fonts/ChakraPetch-400-latin.woff2",
  "fonts/ChakraPetch-500-latin.woff2",
  "fonts/ChakraPetch-600-latin.woff2",
  "fonts/ChakraPetch-700-latin.woff2",
  "fonts/Orbitron-var-latin.woff2",
  "fonts/Inter-var-latin.woff2",
  "palm-silhouette.svg",
  "sc-mark.svg",
] as const;

export type AssetFile = typeof ASSET_FILES[number];
export type BrandAssets = Record<AssetFile, string>;

function mediaType(file: string): string {
  if (file.endsWith(".woff2")) return "font/woff2";
  if (file.endsWith(".svg")) return "image/svg+xml";
  throw new Error(`no media type for brand asset ${file}`);
}

function base64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(s);
}

export function dataUri(file: string, bytes: Uint8Array): string {
  return `data:${mediaType(file)};base64,${base64(bytes)}`;
}

/** The Swamp Club assets that ship with the extension. */
export function embeddedAssets(): BrandAssets {
  return EMBEDDED as BrandAssets;
}

/** A user's own brand directory, laid out like assets/brand/. */
export async function brandDirAssets(dir: string): Promise<BrandAssets> {
  const out: Partial<BrandAssets> = {};
  for (const file of ASSET_FILES) {
    let bytes: Uint8Array;
    try {
      bytes = await Deno.readFile(`${dir}/${file}`);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        throw new Error(
          `brandDir ${dir} has no ${file}: a brand directory holds ` +
            ASSET_FILES.join(", "),
        );
      }
      throw err;
    }
    out[file] = dataUri(file, bytes);
  }
  return out as BrandAssets;
}
