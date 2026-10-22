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

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { AAA_ROOT, DISTRUST_ANCHOR } from "./emudhra_certs.ts";
import { readKeystore } from "./keystore.ts";
import { matchStore, pemCertificates } from "./x509.ts";
import {
  certBag,
  concat,
  dataSafe,
  ENCRYPTED,
  explicit0,
  jks,
  octet,
  oid,
  pfx,
  seq,
  tlv,
} from "./testing_keystores.ts";

const aaa = pemCertificates(AAA_ROOT.pem)[0];
const ecc = pemCertificates(DISTRUST_ANCHOR.pem)[0];

// --- tests -----------------------------------------------------------------

Deno.test("readKeystore: JKS trusted-certificate entries", async () => {
  const r = readKeystore(jks([aaa, ecc]));
  assertEquals(r.format, "jks");
  assertEquals(r.incomplete, false);
  assertEquals(r.certs.length, 2);
  assertEquals((await matchStore(r.certs)).roots.sort(), [
    "AAA Certificate Services",
    "emSign ECC Root CA - G3",
  ]);
});

Deno.test("readKeystore: JCEKS reads the same layout", () => {
  assertEquals(readKeystore(jks([aaa], 0xcececece)).format, "jceks");
});

Deno.test("readKeystore: a truncated JKS keeps what it read and is incomplete", () => {
  const full = jks([aaa, ecc]);
  const r = readKeystore(full.slice(0, full.length - 20 - ecc.length + 5));
  assertEquals(r.incomplete, true);
  assertEquals(r.certs.length, 1);
});

Deno.test("readKeystore: PKCS#12 with unencrypted certificate bags", async () => {
  const r = readKeystore(pfx([dataSafe(certBag(aaa), certBag(ecc))]));
  assertEquals(r.format, "pkcs12");
  assertEquals(r.incomplete, false);
  assertEquals((await matchStore(r.certs)).exposed, ["tls", "code-signing"]);
});

Deno.test("readKeystore: PKCS#12 with an encrypted safe is incomplete, never clean", () => {
  const encrypted = seq(
    oid(ENCRYPTED),
    explicit0(seq(tlv(0x02, new Uint8Array([0])))),
  );
  const r = readKeystore(pfx([encrypted, dataSafe(certBag(ecc))]));
  assertEquals(r.incomplete, true);
  assertEquals(r.certs.length, 1);
});

Deno.test("readKeystore: PKCS#12 constructed OCTET STRING (BER) is read", () => {
  const ber = (b: Uint8Array) =>
    tlv(0x24, concat(octet(b.slice(0, 100)), octet(b.slice(100))));
  const r = readKeystore(pfx([dataSafe(certBag(aaa, ber))]));
  assertEquals(r.incomplete, false);
  assertEquals(r.certs[0], aaa);
});

Deno.test("readKeystore: junk is unknown", () => {
  const r = readKeystore(new TextEncoder().encode("not a keystore"));
  assertEquals(r.format, "unknown");
  assert(r.incomplete);
  assertEquals(
    readKeystore(new Uint8Array([0x30, 0x03, 0x02])).incomplete,
    true,
  );
});
