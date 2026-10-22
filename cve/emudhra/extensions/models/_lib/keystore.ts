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
 * Read the certificates of a Java trust store (JKS, JCEKS or PKCS#12) with no
 * keytool and no password. Java stores trusted certificates unencrypted in
 * JKS, and in PKCS#12 trust stores written without a password (the JDK's own
 * cacerts); a PKCS#12 store whose certificates are encrypted is reported as
 * such, never as clean.
 *
 * @module
 */

import { derElement } from "./x509.ts";

export type KeystoreRead = {
  format: "jks" | "jceks" | "pkcs12" | "unknown";
  certs: Uint8Array<ArrayBuffer>[];
  /** Some certificates could not be read (encrypted bags, or entries this reader does not parse). */
  incomplete: boolean;
  error?: string;
};

const JKS_MAGIC = 0xfeedfeed;
const JCEKS_MAGIC = 0xcececece;

/** Read a Java trust store from its bytes. Never throws. */
export function readKeystore(bytes: Uint8Array<ArrayBuffer>): KeystoreRead {
  if (bytes.length >= 4) {
    const magic = new DataView(bytes.buffer, bytes.byteOffset).getUint32(0);
    if (magic === JKS_MAGIC || magic === JCEKS_MAGIC) {
      return readJks(bytes, magic === JKS_MAGIC ? "jks" : "jceks");
    }
  }
  if (bytes[0] === 0x30) return readPkcs12(bytes);
  return {
    format: "unknown",
    certs: [],
    incomplete: true,
    error: "not a JKS or PKCS#12 keystore",
  };
}

function readJks(
  bytes: Uint8Array<ArrayBuffer>,
  format: "jks" | "jceks",
): KeystoreRead {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const certs: Uint8Array<ArrayBuffer>[] = [];
  let off = 4;
  const need = (n: number) => {
    if (off + n > bytes.length) throw new Error("keystore truncated");
  };
  const u32 = () => {
    need(4);
    const v = view.getUint32(off);
    off += 4;
    return v;
  };
  const utf = () => {
    need(2);
    const n = view.getUint16(off);
    off += 2;
    need(n);
    off += n;
  };
  const cert = (version: number) => {
    if (version === 2) utf(); // certificate type, "X.509"
    const n = u32();
    need(n);
    certs.push(bytes.slice(off, off + n));
    off += n;
  };
  try {
    const version = u32();
    if (version !== 1 && version !== 2) {
      throw new Error(`unsupported keystore version ${version}`);
    }
    const count = u32();
    for (let i = 0; i < count; i++) {
      const tag = u32();
      utf(); // alias
      need(8);
      off += 8; // creation date
      if (tag === 2) {
        cert(version);
      } else if (tag === 1) {
        const keyLen = u32();
        need(keyLen);
        off += keyLen;
        const chain = u32();
        for (let j = 0; j < chain; j++) cert(version);
      } else {
        // JCEKS secret keys are serialized Java objects; stop here.
        return { format, certs, incomplete: true, error: `entry tag ${tag}` };
      }
    }
    return { format, certs, incomplete: false };
  } catch (e) {
    return {
      format,
      certs,
      incomplete: true,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/** DER encodings of the OIDs this reader looks for. */
const OID = {
  data: "2a864886f70d010701",
  encryptedData: "2a864886f70d010706",
  certBag: "2a864886f70d010c0a0103",
  x509Certificate: "2a864886f70d01091601",
};

function hex(b: Uint8Array): string {
  return [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/** The OID at `off`, as hex of its body. */
function oidAt(der: Uint8Array, off: number): { oid: string; end: number } {
  const e = derElement(der, off, 0x06);
  return { oid: hex(der.subarray(e.body, e.end)), end: e.end };
}

/**
 * Children of a SEQUENCE or SET body, as element positions. `end` bounds the
 * walk to the parent.
 */
function children(der: Uint8Array, body: number, end: number) {
  const out: ReturnType<typeof derElement>[] = [];
  let off = body;
  while (off < end) {
    const e = derElement(der, off);
    out.push(e);
    off = e.end;
  }
  return out;
}

/** Bytes of an OCTET STRING, primitive or constructed (BER, as Windows writes). */
function octets(
  der: Uint8Array<ArrayBuffer>,
  e: ReturnType<typeof derElement>,
): Uint8Array<ArrayBuffer> {
  if (e.tag === 0x04) return der.slice(e.body, e.end);
  if (e.tag === 0x24) {
    const parts = children(der, e.body, e.end).map((c) => octets(der, c));
    const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
    let o = 0;
    for (const p of parts) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }
  throw new Error(`OCTET STRING expected, tag ${e.tag.toString(16)}`);
}

function readPkcs12(bytes: Uint8Array<ArrayBuffer>): KeystoreRead {
  const certs: Uint8Array<ArrayBuffer>[] = [];
  let incomplete = false;
  try {
    // PFX ::= SEQUENCE { version, authSafe ContentInfo, macData OPTIONAL }
    const pfx = derElement(bytes, 0, 0x30);
    const [version, authSafe] = children(bytes, pfx.body, pfx.end);
    if (!version || version.tag !== 0x02 || !authSafe) {
      throw new Error("not a PKCS#12 PFX");
    }
    const auth = contentData(bytes, authSafe);
    if (!auth) throw new Error("PKCS#12 authSafe is not data");
    // AuthenticatedSafe ::= SEQUENCE OF ContentInfo
    const seq = derElement(auth, 0, 0x30);
    for (const ci of children(auth, seq.body, seq.end)) {
      const safe = contentData(auth, ci);
      if (!safe) {
        incomplete = true; // encryptedData or enveloped: needs a password
        continue;
      }
      // SafeContents ::= SEQUENCE OF SafeBag
      const bags = derElement(safe, 0, 0x30);
      for (const bag of children(safe, bags.body, bags.end)) {
        const { oid, end } = oidAt(safe, bag.body);
        if (oid !== OID.certBag) continue;
        const value = derElement(safe, end, 0xa0);
        const certBag = derElement(safe, value.body, 0x30);
        const id = oidAt(safe, certBag.body);
        if (id.oid !== OID.x509Certificate) continue;
        const wrapped = derElement(safe, id.end, 0xa0);
        certs.push(octets(safe, derElement(safe, wrapped.body)));
      }
    }
    return { format: "pkcs12", certs, incomplete };
  } catch (e) {
    return {
      format: "pkcs12",
      certs,
      incomplete: true,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * The content of a ContentInfo of type data, or undefined for any other
 * type (encryptedData, which needs the password).
 */
function contentData(
  der: Uint8Array<ArrayBuffer>,
  ci: ReturnType<typeof derElement>,
): Uint8Array<ArrayBuffer> | undefined {
  if (ci.tag !== 0x30) throw new Error("ContentInfo expected");
  const { oid, end } = oidAt(der, ci.body);
  if (oid !== OID.data) {
    if (oid === OID.encryptedData) return undefined;
    throw new Error(`unsupported ContentInfo ${oid}`);
  }
  const explicit = derElement(der, end, 0xa0);
  return octets(der, derElement(der, explicit.body));
}
