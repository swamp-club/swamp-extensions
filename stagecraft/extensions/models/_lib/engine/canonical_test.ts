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

import {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "@std/assert";
import { canonicalJson, digestOf, jsonSafe } from "./canonical.ts";

Deno.test("jsonSafe: BigInt becomes a number when exact, a string otherwise", () => {
  assertEquals(jsonSafe({ n: 3n, big: 2n ** 64n, list: [1n] }), {
    n: 3,
    big: "18446744073709551616",
    list: [1],
  });
});

Deno.test("jsonSafe: undefined members are dropped, nested values kept", () => {
  assertEquals(jsonSafe({ a: undefined, b: { c: null, d: "x" } }), {
    b: { c: null, d: "x" },
  });
});

Deno.test("canonicalJson: key order does not matter, at any depth", () => {
  assertEquals(
    canonicalJson({ b: 1, a: { d: [2, { z: 1, y: 2 }], c: 3 } }),
    canonicalJson({ a: { c: 3, d: [2, { y: 2, z: 1 }] }, b: 1 }),
  );
  assertEquals(canonicalJson({ b: 1, a: 2 }), '{"a":2,"b":1}');
});

Deno.test("digestOf: stable across key order, different for different content", async () => {
  const one = await digestOf({ summary: "s", steps: [1, 2] });
  assertEquals(one, await digestOf({ steps: [1, 2], summary: "s" }));
  assertNotEquals(one, await digestOf({ summary: "s", steps: [2, 1] }));
  assert(/^sha256:[0-9a-f]{64}$/.test(one));
});

Deno.test("jsonSafe: CEL timestamps become ISO strings; string-keyed maps become objects", () => {
  assertEquals(
    jsonSafe(new Date(Date.UTC(2026, 0, 1))),
    "2026-01-01T00:00:00.000Z",
  );
  assertEquals(jsonSafe(new Map([["a", 1n]])), { a: 1 });
});

Deno.test("jsonSafe: values with no faithful JSON form are refused, not flattened", () => {
  for (
    const value of [
      Number.NaN,
      Infinity,
      new Uint8Array([1]),
      new Set([1]),
      new Map([[1, 2]]),
      new (class Duration {})(),
    ]
  ) {
    assertThrows(() => jsonSafe({ value }), TypeError);
  }
});

Deno.test("jsonSafe: a __proto__ key is kept as data and changes the digest", async () => {
  const payload = JSON.parse('{"__proto__": {"x": 1}, "a": 2}');
  const safe = jsonSafe(payload) as Record<string, unknown>;
  assertEquals(Object.keys(safe), ["__proto__", "a"]);
  assertEquals(canonicalJson(payload), '{"__proto__":{"x":1},"a":2}');
  assertNotEquals(await digestOf(payload), await digestOf({ a: 2 }));
});

Deno.test("jsonSafe: a cyclic value is refused with a TypeError", () => {
  const cyclic: Record<string, unknown> = {};
  cyclic.self = cyclic;
  assertThrows(() => jsonSafe(cyclic), TypeError, "cyclic");
  // The same object twice, without a cycle, is fine.
  const shared = { n: 1 };
  assertEquals(jsonSafe({ a: shared, b: [shared] }), {
    a: { n: 1 },
    b: [{ n: 1 }],
  });
});
