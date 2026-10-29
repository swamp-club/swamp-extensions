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
  assert,
  assertEquals,
  assertNotEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { encodeQr, qrSvg } from "./qr.ts";

/** A 7x7 finder pattern's dark ring and centre at (row, col). */
function finder(qr: ReturnType<typeof encodeQr>, row: number, col: number) {
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const ring = r === 0 || r === 6 || c === 0 || c === 6;
      const centre = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      assertEquals(qr.dark(row + r, col + c), ring || centre, `${r},${c}`);
    }
  }
}

Deno.test("a campaign URL encodes as a scannable code", () => {
  const qr = encodeQr("https://swamp-club.com/campaign/someone");
  // 41 bytes in byte mode at level M fits version 3 (29 modules).
  assertEquals(qr.size, 29);
  finder(qr, 0, 0);
  finder(qr, 0, qr.size - 7);
  finder(qr, qr.size - 7, 0);
});

Deno.test("each URL gets its own code; non-ASCII is UTF-8, not truncated", () => {
  const a = qrSvg("https://example.com/a");
  assertEquals(a, qrSvg("https://example.com/a"));
  assertNotEquals(a, qrSvg("https://example.com/b"));
  // Version 1 at level M holds 14 bytes: eight é are 16 bytes in UTF-8
  // (version 2), but would fit version 1 if each were written as one byte.
  assertEquals(encodeQr("é".repeat(7)).size, 21);
  assertEquals(encodeQr("é".repeat(8)).size, 25);
});

Deno.test("the SVG scales, has a quiet zone and crisp modules", () => {
  const svg = qrSvg("https://example.com", "#123456");
  const side = encodeQr("https://example.com").size + 8;
  assertStringIncludes(svg, `viewBox="0 0 ${side} ${side}"`);
  assertStringIncludes(svg, 'shape-rendering="crispEdges"');
  assertStringIncludes(svg, 'fill="#123456"');
  assert(
    svg.includes("M4 4h1v1h-1z"),
    "the first module sits inside the quiet zone",
  );
});
