// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { cidrContains } from "./cidr.ts";

// ---------------------------------------------------------------------------
// IPv4
// ---------------------------------------------------------------------------

Deno.test("cidrContains: IPv4 /24 contains in-range address", () => {
  assertEquals(cidrContains("10.0.5.0/24", "10.0.5.42"), true);
});

Deno.test("cidrContains: IPv4 /24 excludes out-of-range address", () => {
  assertEquals(cidrContains("10.0.5.0/24", "10.0.6.1"), false);
});

Deno.test("cidrContains: IPv4 /16 spans the third octet", () => {
  assertEquals(cidrContains("10.0.0.0/16", "10.0.42.42"), true);
  assertEquals(cidrContains("10.0.0.0/16", "10.1.42.42"), false);
});

Deno.test("cidrContains: IPv4 /32 is single host", () => {
  assertEquals(cidrContains("192.168.1.1/32", "192.168.1.1"), true);
  assertEquals(cidrContains("192.168.1.1/32", "192.168.1.2"), false);
});

Deno.test("cidrContains: IPv4 /0 matches everything", () => {
  assertEquals(cidrContains("0.0.0.0/0", "10.0.5.42"), true);
  assertEquals(cidrContains("0.0.0.0/0", "255.255.255.255"), true);
});

Deno.test("cidrContains: IPv4 /23 boundary cases", () => {
  // 10.0.4.0/23 spans 10.0.4.0 .. 10.0.5.255
  assertEquals(cidrContains("10.0.4.0/23", "10.0.4.0"), true);
  assertEquals(cidrContains("10.0.4.0/23", "10.0.5.255"), true);
  assertEquals(cidrContains("10.0.4.0/23", "10.0.6.0"), false);
  assertEquals(cidrContains("10.0.4.0/23", "10.0.3.255"), false);
});

Deno.test("cidrContains: IPv4 rejects out-of-range octet", () => {
  assertEquals(cidrContains("10.0.0.0/24", "10.0.0.256"), false);
});

Deno.test("cidrContains: IPv4 rejects bad CIDR strings", () => {
  assertEquals(cidrContains("not-a-cidr", "10.0.0.1"), false);
  assertEquals(cidrContains("10.0.0.0/33", "10.0.0.1"), false);
  assertEquals(cidrContains("10.0.0.0/-1", "10.0.0.1"), false);
});

// ---------------------------------------------------------------------------
// IPv6
// ---------------------------------------------------------------------------

Deno.test("cidrContains: IPv6 /64 contains in-range address", () => {
  assertEquals(
    cidrContains("fd00:1234:abcd::/64", "fd00:1234:abcd:0:1::1"),
    true,
  );
});

Deno.test("cidrContains: IPv6 /64 excludes out-of-range address", () => {
  assertEquals(
    cidrContains("fd00:1234:abcd::/64", "fd00:1234:abcf::1"),
    false,
  );
});

Deno.test("cidrContains: IPv6 /8 spans first octet", () => {
  assertEquals(cidrContains("fd00::/8", "fdff:abcd::1"), true);
  assertEquals(cidrContains("fd00::/8", "fcff:abcd::1"), false);
});

Deno.test("cidrContains: IPv6 /0 matches everything", () => {
  assertEquals(cidrContains("::/0", "fd00::1"), true);
});

Deno.test("cidrContains: IPv6 /128 single host", () => {
  assertEquals(cidrContains("fd00::1/128", "fd00::1"), true);
  assertEquals(cidrContains("fd00::1/128", "fd00::2"), false);
});

Deno.test("cidrContains: IPv6 :: expansion (all-zeros)", () => {
  assertEquals(cidrContains("::/128", "::"), true);
});

Deno.test("cidrContains: IPv6 rejects malformed addresses", () => {
  assertEquals(cidrContains("fd00::/64", "fd00:zzzz::1"), false);
  assertEquals(cidrContains("fd00::/64", "fd00:::1"), false); // ::: invalid
  assertEquals(cidrContains("fd00::/129", "fd00::1"), false);
});

// ---------------------------------------------------------------------------
// Cross-family
// ---------------------------------------------------------------------------

Deno.test("cidrContains: IPv4 CIDR vs IPv6 address → false", () => {
  assertEquals(cidrContains("10.0.0.0/24", "fd00::1"), false);
});

Deno.test("cidrContains: IPv6 CIDR vs IPv4 address → false", () => {
  assertEquals(cidrContains("fd00::/64", "10.0.0.1"), false);
});

// ---------------------------------------------------------------------------
// Non-string input
// ---------------------------------------------------------------------------

Deno.test("cidrContains: non-string args → false (CEL-friendly)", () => {
  // deno-lint-ignore no-explicit-any
  assertEquals(cidrContains(null as any, "10.0.0.1"), false);
  // deno-lint-ignore no-explicit-any
  assertEquals(cidrContains("10.0.0.0/24", undefined as any), false);
});
