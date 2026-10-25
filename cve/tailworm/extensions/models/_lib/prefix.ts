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
 * IPv4 and IPv6 prefixes as packet filters carry them, and containment
 * between them. No dependencies, so the report shares it with the model.
 *
 * @module
 */

/** An IPv4 or IPv6 prefix; a bare address is a /32 or /128. */
export type Prefix = { v6: boolean; addr: bigint; bits: number };

function parseV4(s: string): bigint | null {
  const parts = s.split(".");
  if (parts.length !== 4) return null;
  let n = 0n;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p) || Number(p) > 255) return null;
    n = (n << 8n) | BigInt(p);
  }
  return n;
}

function parseV6(s: string): bigint | null {
  const halves = s.split("::");
  if (halves.length > 2) return null;
  const groups = (h: string) => h === "" ? [] : h.split(":");
  const head = groups(halves[0]);
  const tail = halves.length === 2 ? groups(halves[1]) : [];
  const fill = 8 - head.length - tail.length;
  if (halves.length === 2 ? fill < 1 : fill !== 0) return null;
  let n = 0n;
  for (const g of [...head, ...Array(fill).fill("0"), ...tail]) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(g)) return null;
    n = (n << 16n) | BigInt(parseInt(g, 16));
  }
  return n;
}

export function parsePrefix(s: string): Prefix | null {
  const [ip, len, extra] = s.trim().split("/");
  if (extra !== undefined) return null;
  const v6 = ip.includes(":");
  const addr = v6 ? parseV6(ip) : parseV4(ip);
  const max = v6 ? 128 : 32;
  if (addr === null) return null;
  if (len === undefined) return { v6, addr, bits: max };
  if (!/^\d{1,3}$/.test(len) || Number(len) > max) return null;
  return { v6, addr, bits: Number(len) };
}

/** outer contains every address of inner. */
export function prefixContains(outer: Prefix, inner: Prefix): boolean {
  if (outer.v6 !== inner.v6 || outer.bits > inner.bits) return false;
  const shift = BigInt((outer.v6 ? 128 : 32) - outer.bits);
  return (outer.addr >> shift) === (inner.addr >> shift);
}

/** A source prefix admits this address. */
export function admits(sources: string[], ip: string): boolean {
  const host = parsePrefix(ip);
  if (!host) return false;
  return sources.some((s) => {
    const p = parsePrefix(s);
    return p !== null && prefixContains(p, host);
  });
}

const TAILNET_V4 = parsePrefix("100.64.0.0/10")!;
const TAILNET_V6 = parsePrefix("fd7a:115c:a1e0::/48")!;

/**
 * The sources cover the tailnet's whole range. Tailscale sends a "*" source
 * as 0.0.0.0/0 and ::/0; headscale splits it into CGNAT prefixes around its
 * reserved ranges, so most of 100.64.0.0/10 (or the whole IPv6 range) counts.
 */
export function coversTailnet(sources: string[]): boolean {
  // Host bits cleared and duplicates dropped, so one block written two ways
  // is counted once.
  const seen = new Map<string, Prefix>();
  for (const s of sources) {
    const p = parsePrefix(s);
    if (!p) continue;
    const shift = BigInt((p.v6 ? 128 : 32) - p.bits);
    const net = { ...p, addr: (p.addr >> shift) << shift };
    seen.set(`${net.v6}/${net.addr}/${net.bits}`, net);
  }
  const prefixes = [...seen.values()];
  if (prefixes.some((p) => prefixContains(p, TAILNET_V6))) return true;
  if (prefixes.some((p) => prefixContains(p, TAILNET_V4))) return true;
  const inside = prefixes.filter((p) =>
    !p.v6 && prefixContains(TAILNET_V4, p) &&
    !prefixes.some((q) => q !== p && q.bits < p.bits && prefixContains(q, p))
  );
  const size = inside.reduce((n, p) => n + (1n << BigInt(32 - p.bits)), 0n);
  return size * 100n >= (1n << 22n) * 99n;
}
