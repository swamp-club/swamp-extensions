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
 * The outro's QR code: the presenter's campaign URL, exactly as given, as
 * an SVG of crisp square modules.
 *
 * @module
 */

import qrcode from "qrcode-generator";

export interface Qr {
  /** Modules per side, quiet zone excluded. */
  size: number;
  dark: (row: number, col: number) => boolean;
}

/** Encode text as UTF-8 bytes in byte mode, error correction M. */
export function encodeQr(text: string): Qr {
  // The library writes each char code as one byte; hand it UTF-8 bytes.
  const bytes = new TextEncoder().encode(text);
  const qr = qrcode(0, "M");
  qr.addData(String.fromCharCode(...bytes), "Byte");
  qr.make();
  return {
    size: qr.getModuleCount(),
    dark: (row, col) => qr.isDark(row, col),
  };
}

/** The code as SVG: one path, a four-module quiet zone, scales to fit. */
export function qrSvg(text: string, color = "#04020b"): string {
  const { size, dark } = encodeQr(text);
  const quiet = 4;
  const side = size + 2 * quiet;
  let d = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (dark(row, col)) d += `M${col + quiet} ${row + quiet}h1v1h-1z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" ` +
    `shape-rendering="crispEdges"><rect width="${side}" height="${side}" ` +
    `fill="#fff"/><path fill="${color}" d="${d}"/></svg>`;
}
