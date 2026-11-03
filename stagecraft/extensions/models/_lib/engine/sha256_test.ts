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

import { assertEquals } from "@std/assert";
import { sha256 } from "./sha256.ts";

const hex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

const utf8 = (text: string) => new TextEncoder().encode(text);

async function subtleHex(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}

// The NIST known answers (FIPS 180-4 examples), so the JavaScript hash is
// pinned to the standard and not only to whatever crypto.subtle returns.
Deno.test("sha256: NIST known answers", () => {
  assertEquals(
    hex(sha256(new Uint8Array())),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
  assertEquals(
    hex(sha256(utf8("abc"))),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
  assertEquals(
    hex(
      sha256(
        utf8("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"),
      ),
    ),
    "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1",
  );
  assertEquals(
    hex(sha256(new Uint8Array(1_000_000).fill(0x61))),
    "cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0",
  );
});

// Every length where the padding changes shape: the 0x80 byte and the 8-byte
// length fit in the last block (up to 55), or spill into another (56 on).
Deno.test("sha256: equals crypto.subtle at every padding boundary", async () => {
  const lengths = [0, 1, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 129];
  for (const length of lengths) {
    const bytes = Uint8Array.from({ length }, (_, i) => (i * 31 + 7) & 0xff);
    assertEquals(
      hex(sha256(bytes)),
      await subtleHex(bytes),
      `length ${length}`,
    );
  }
});

Deno.test("sha256: equals crypto.subtle on a large input", async () => {
  const bytes = Uint8Array.from(
    { length: 1_048_583 },
    (_, i) => (i * 2654435761) >>> 24,
  );
  assertEquals(hex(sha256(bytes)), await subtleHex(bytes));
});

Deno.test("sha256: equals crypto.subtle on Unicode text", async () => {
  const texts = [
    "café naïve résumé",
    "日本語のテキスト、中文文本",
    "emoji 🏭🐊👩🏽‍🔧 and a lone \u{1F600}",
    "combining é and å",
    '\u0000 nul, tab\t, newline\n, quote " and backslash \\',
  ];
  for (const text of texts) {
    const bytes = utf8(text);
    assertEquals(hex(sha256(bytes)), await subtleHex(bytes), text);
  }
});
