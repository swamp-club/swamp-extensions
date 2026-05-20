// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
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

/**
 * IPv4 / IPv6 CIDR containment, exposed to selectors as
 * `cidrContains(cidr, addr)`.
 *
 * Pure functions, no I/O. Invalid inputs return `false` rather than
 * throwing — the call site is a CEL predicate, which treats `false` as
 * "host doesn't match" and proceeds.
 *
 * @module
 */

// ---------------------------------------------------------------------------
// IPv4
// ---------------------------------------------------------------------------

const IPV4_OCTET = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

function parseIPv4(addr: string): number | null {
  const parts = addr.split(".");
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    if (!IPV4_OCTET.test(part)) return null;
    result = (result * 256) + Number(part);
  }
  // Keep as unsigned 32-bit; >>> 0 makes it explicit.
  return result >>> 0;
}

function ipv4Contains(cidr: string, addr: string): boolean {
  const [base, prefixStr] = cidr.split("/");
  if (base === undefined || prefixStr === undefined) return false;
  const prefix = Number(prefixStr);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return false;

  const baseN = parseIPv4(base);
  const addrN = parseIPv4(addr);
  if (baseN === null || addrN === null) return false;

  if (prefix === 0) return true;
  const mask = (~0 << (32 - prefix)) >>> 0;
  return ((baseN & mask) >>> 0) === ((addrN & mask) >>> 0);
}

// ---------------------------------------------------------------------------
// IPv6
// ---------------------------------------------------------------------------

/**
 * Parse an IPv6 address (canonical or compressed `::`) into a 16-byte
 * Uint8Array. Returns null for malformed input. Does NOT accept embedded
 * IPv4 (`::ffff:1.2.3.4`) — those addresses are best matched against IPv4
 * CIDRs by stripping the prefix; for the selector use case this isn't a
 * common need.
 */
function parseIPv6(addr: string): Uint8Array | null {
  if (!/^[0-9a-fA-F:]+$/.test(addr)) return null;
  if (addr.indexOf(":::") !== -1) return null;
  // Special-case the all-zero address "::" (split has trailing empties).
  if (addr === "::") return new Uint8Array(16);

  const hasDoubleColon = addr.includes("::");
  let left: string[] = [];
  let right: string[] = [];

  if (hasDoubleColon) {
    const [l, r, extra] = addr.split("::");
    if (extra !== undefined) return null; // more than one ::
    left = l === "" ? [] : l.split(":");
    right = r === "" ? [] : r.split(":");
  } else {
    left = addr.split(":");
  }

  // Reject empty groups that aren't from "::".
  for (const g of [...left, ...right]) {
    if (g.length === 0) return null;
    if (g.length > 4) return null;
  }

  const groupCount = left.length + right.length;
  if (groupCount > 8) return null;
  if (!hasDoubleColon && groupCount !== 8) return null;

  const groups: string[] = [
    ...left,
    ...new Array(8 - groupCount).fill("0"),
    ...right,
  ];

  const out = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const v = parseInt(groups[i], 16);
    if (Number.isNaN(v)) return null;
    out[i * 2] = (v >> 8) & 0xff;
    out[i * 2 + 1] = v & 0xff;
  }
  return out;
}

function ipv6Contains(cidr: string, addr: string): boolean {
  const [base, prefixStr] = cidr.split("/");
  if (base === undefined || prefixStr === undefined) return false;
  const prefix = Number(prefixStr);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 128) return false;

  const baseBytes = parseIPv6(base);
  const addrBytes = parseIPv6(addr);
  if (baseBytes === null || addrBytes === null) return false;

  let bitsLeft = prefix;
  for (let i = 0; i < 16 && bitsLeft > 0; i++) {
    if (bitsLeft >= 8) {
      if (baseBytes[i] !== addrBytes[i]) return false;
      bitsLeft -= 8;
    } else {
      const mask = (0xff << (8 - bitsLeft)) & 0xff;
      if ((baseBytes[i] & mask) !== (addrBytes[i] & mask)) return false;
      bitsLeft = 0;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// Public entry
// ---------------------------------------------------------------------------

/**
 * `true` when `addr` falls inside `cidr`. The family is inferred from the
 * presence of a colon in the CIDR's network address: colons → IPv6,
 * otherwise IPv4. Mixed-family pairs (IPv4 CIDR vs IPv6 address or vice
 * versa) return `false`.
 *
 * Invalid syntax in either argument returns `false` rather than throwing,
 * so a malformed CEL expression doesn't abort selector evaluation.
 */
export function cidrContains(cidr: string, addr: string): boolean {
  if (typeof cidr !== "string" || typeof addr !== "string") return false;

  const cidrIsV6 = cidr.includes(":");
  const addrIsV6 = addr.includes(":");
  if (cidrIsV6 !== addrIsV6) return false;

  return cidrIsV6 ? ipv6Contains(cidr, addr) : ipv4Contains(cidr, addr);
}
