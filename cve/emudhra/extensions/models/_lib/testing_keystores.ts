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
 * Builders for Java trust stores, for tests only. The formats are written out
 * by hand from the JKS layout and RFC 7292, so the tests need no keytool.
 *
 * @module
 */

export function concat(...parts: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function u32(n: number): Uint8Array {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n);
  return b;
}

export function utf(s: string): Uint8Array {
  const e = new TextEncoder().encode(s);
  return concat(new Uint8Array([e.length >> 8, e.length & 0xff]), e);
}

/** A JKS (version 2) with one trusted-certificate entry per certificate. */
export function jks(
  certs: Uint8Array[],
  magic = 0xfeedfeed,
): Uint8Array<ArrayBuffer> {
  const entries = certs.map((c, i) =>
    concat(
      u32(2),
      utf(`ca${i}`),
      new Uint8Array(8),
      utf("X.509"),
      u32(c.length),
      c,
    )
  );
  return concat(
    u32(magic),
    u32(2),
    u32(certs.length),
    ...entries,
    new Uint8Array(20),
  );
}

export function tlv(tag: number, body: Uint8Array): Uint8Array<ArrayBuffer> {
  const n = body.length;
  const len = n < 0x80
    ? [n]
    : n < 0x100
    ? [0x81, n]
    : n < 0x10000
    ? [0x82, n >> 8, n & 0xff]
    : [0x83, n >> 16, (n >> 8) & 0xff, n & 0xff];
  return concat(new Uint8Array([tag, ...len]), body);
}

export const hexBytes = (h: string) =>
  new Uint8Array(h.match(/../g)!.map((x) => parseInt(x, 16)));
export const oid = (h: string) => tlv(0x06, hexBytes(h));
export const seq = (...p: Uint8Array[]) => tlv(0x30, concat(...p));
export const explicit0 = (b: Uint8Array) => tlv(0xa0, b);
export const octet = (b: Uint8Array) => tlv(0x04, b);

export const DATA = "2a864886f70d010701";
export const ENCRYPTED = "2a864886f70d010706";
export const CERT_BAG = "2a864886f70d010c0a0103";
export const X509 = "2a864886f70d01091601";

export function certBag(cert: Uint8Array, wrap = octet): Uint8Array {
  return seq(oid(CERT_BAG), explicit0(seq(oid(X509), explicit0(wrap(cert)))));
}

export function pfx(safes: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const auth = seq(...safes);
  return seq(
    tlv(0x02, new Uint8Array([3])),
    seq(oid(DATA), explicit0(octet(auth))),
  );
}

export const dataSafe = (...bags: Uint8Array[]) =>
  seq(oid(DATA), explicit0(octet(seq(...bags))));
