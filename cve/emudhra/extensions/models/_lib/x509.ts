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
 * Public-key matching for CA bundles and trust stores that are not the OS
 * store: which of the compromised intermediates, or the roots they chain to,
 * a set of certificates holds, and which usages that exposes. Certificates
 * are matched by the SHA-256 of their SubjectPublicKeyInfo, so any copy of a
 * root or intermediate counts, whoever signed it.
 *
 * @module
 */

import {
  AAA_ROOT,
  COMPROMISED_CERTS,
  DISTRUST_ANCHOR,
  EMSIGN_CS_ROOT,
  EMSIGN_TLS_ROOT,
} from "./emudhra_certs.ts";

export type Usage = "tls" | "code-signing";

/** Decode base64 (whitespace ignored) to bytes. */
export function base64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(b64.replace(/\s+/g, "")), (c) => c.charCodeAt(0));
}

/**
 * The DER of every certificate in PEM text. OpenSSL's TRUSTED CERTIFICATE
 * blocks carry trust settings after the certificate; certSpki reads only the
 * certificate's own TLV, so they work too.
 */
export function pemCertificates(text: string): Uint8Array<ArrayBuffer>[] {
  const out: Uint8Array<ArrayBuffer>[] = [];
  const re =
    /-----BEGIN (?:TRUSTED )?CERTIFICATE-----([\s\S]*?)-----END (?:TRUSTED )?CERTIFICATE-----/g;
  for (const m of text.matchAll(re)) {
    try {
      out.push(base64ToBytes(m[1]));
    } catch {
      // Not base64: not a certificate this scan can read.
    }
  }
  return out;
}

/** One DER TLV at `off`: tag, header length and body length. */
function tlv(der: Uint8Array, off: number) {
  if (off + 2 > der.length) throw new Error("DER truncated");
  const tag = der[off];
  let len = der[off + 1];
  let hdr = 2;
  if (len & 0x80) {
    const n = len & 0x7f;
    if (n === 0 || n > 4 || off + 2 + n > der.length) {
      throw new Error("DER length unsupported");
    }
    len = 0;
    for (let i = 0; i < n; i++) len = len * 256 + der[off + 2 + i];
    hdr += n;
  }
  if (off + hdr + len > der.length) throw new Error("DER truncated");
  return { tag, hdr, len };
}

/** Read the TLV at `off`, check its tag, and return where its body starts and ends. */
export function derElement(der: Uint8Array, off: number, tag?: number) {
  const t = tlv(der, off);
  if (tag !== undefined && t.tag !== tag) {
    throw new Error(
      `DER tag ${t.tag.toString(16)} where ${tag.toString(16)} expected`,
    );
  }
  return {
    tag: t.tag,
    start: off,
    body: off + t.hdr,
    end: off + t.hdr + t.len,
  };
}

/** The SubjectPublicKeyInfo of an X.509 certificate, as DER. Throws on malformed input. */
export function certSpki(
  der: Uint8Array<ArrayBuffer>,
): Uint8Array<ArrayBuffer> {
  const cert = derElement(der, 0, 0x30);
  const tbs = derElement(der, cert.body, 0x30);
  let off = tbs.body;
  // version [0] is optional; then serial, signature, issuer, validity, subject.
  if (der[off] === 0xa0) off = derElement(der, off).end;
  for (let i = 0; i < 5; i++) off = derElement(der, off).end;
  const k = derElement(der, off, 0x30);
  if (k.end > tbs.end) throw new Error("DER truncated");
  return der.slice(k.start, k.end);
}

/** Upper-case hex SHA-256 of bytes. */
export async function sha256Hex(
  bytes: Uint8Array<ArrayBuffer>,
): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0"))
    .join("").toUpperCase();
}

/** A root the compromised intermediates chain to. */
export type IndicatorRoot = {
  name: string;
  spkiSha256: string;
  usages: Usage[];
};

/**
 * The roots, with the usages their compromised intermediates have. emSign ECC
 * Root CA - G3 reaches the TLS intermediates through the cross-signed emSign
 * Root TLS CA - G3 that servers send.
 */
export const INDICATOR_ROOTS: readonly IndicatorRoot[] = [
  {
    name: AAA_ROOT.name,
    spkiSha256: AAA_ROOT.spkiSha256,
    usages: ["tls", "code-signing"],
  },
  {
    name: DISTRUST_ANCHOR.name,
    spkiSha256: DISTRUST_ANCHOR.spkiSha256,
    usages: ["tls"],
  },
  {
    name: EMSIGN_TLS_ROOT.name,
    spkiSha256: EMSIGN_TLS_ROOT.spkiSha256,
    usages: ["tls"],
  },
  {
    name: EMSIGN_CS_ROOT.name,
    spkiSha256: EMSIGN_CS_ROOT.spkiSha256,
    usages: ["code-signing"],
  },
];

/** Roots (by SPKI) through which a copy of an intermediate is reachable. */
function issuerRoots(c: (typeof COMPROMISED_CERTS)[number]): string[] {
  if (c.path === "aaa") return [AAA_ROOT.spkiSha256];
  return c.usage === "tls"
    ? [EMSIGN_TLS_ROOT.spkiSha256, DISTRUST_ANCHOR.spkiSha256]
    : [EMSIGN_CS_ROOT.spkiSha256];
}

/** What a set of certificates trusts, matched by public key. */
export type StoreMatch = {
  /** Names of the indicator roots present. */
  roots: string[];
  /** Names of compromised intermediates present as trust anchors. */
  intermediates: string[];
  /** Names of intermediates whose every reachable copy the blocklist refuses. */
  blocked: string[];
  /** Usages with some reachable, unblocked copy of an intermediate. */
  exposed: Usage[];
};

/**
 * Match certificates against the indicators. `blocked` holds SHA-256
 * fingerprints (certificate or public key, upper-case hex) a runtime refuses,
 * as in a JDK's lib/security/blocked.certs; a copy listed either way is not
 * reachable. Certificates that cannot be parsed are skipped.
 */
export async function matchStore(
  ders: Uint8Array<ArrayBuffer>[],
  blocked: ReadonlySet<string> = new Set(),
): Promise<StoreMatch> {
  const present = new Set<string>();
  for (const der of ders) {
    try {
      present.add(await sha256Hex(certSpki(der)));
    } catch {
      // Malformed entry: it can't anchor a chain for this check.
    }
  }
  const roots = INDICATOR_ROOTS.filter((r) => present.has(r.spkiSha256)).map((
    r,
  ) => r.name);
  const intermediates = [
    ...new Set(
      COMPROMISED_CERTS.filter((c) => present.has(c.spkiSha256)).map((c) =>
        c.name
      ),
    ),
  ];
  const exposed = new Set<Usage>();
  const reachableByName = new Map<string, boolean>();
  const unblockedByName = new Map<string, boolean>();
  for (const c of COMPROMISED_CERTS) {
    const reachable = present.has(c.spkiSha256) ||
      issuerRoots(c).some((s) => present.has(s));
    const isBlocked = blocked.has(c.sha256) || blocked.has(c.spkiSha256);
    reachableByName.set(
      c.name,
      (reachableByName.get(c.name) ?? false) || reachable,
    );
    if (reachable && !isBlocked) {
      exposed.add(c.usage);
      unblockedByName.set(c.name, true);
    }
  }
  const blockedNames = [...reachableByName].filter(([name, r]) =>
    r && !unblockedByName.get(name)
  ).map(([name]) => name);
  return {
    roots,
    intermediates,
    blocked: blockedNames,
    exposed: (["tls", "code-signing"] as const).filter((u) => exposed.has(u)),
  };
}

/**
 * Parse a JDK lib/security/blocked.certs: an `Algorithm=` header, then one
 * hex fingerprint per line. Only SHA-256 lists are used.
 */
export function parseBlockedCerts(text: string): Set<string> {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l);
  const alg = lines.find((l) => /^Algorithm=/i.test(l));
  if (alg && !/^Algorithm=SHA-?256$/i.test(alg)) return new Set();
  return new Set(
    lines.filter((l) => /^[0-9A-Fa-f:]{64,95}$/.test(l)).map((l) =>
      l.replace(/:/g, "").toUpperCase()
    ).filter((l) => l.length === 64),
  );
}
