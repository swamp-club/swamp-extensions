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

import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import {
  AAA_ROOT,
  COMPROMISED_CERTS,
  DISTRUST_ANCHOR,
  EMSIGN_CS_ROOT,
  EMSIGN_TLS_G3_CROSS,
  EMSIGN_TLS_ROOT,
} from "./emudhra_certs.ts";
import {
  certSpki,
  matchStore,
  parseBlockedCerts,
  pemCertificates,
  sha256Hex,
} from "./x509.ts";

const der = (pem: string) => pemCertificates(pem)[0];

/**
 * SPKI SHA-256 values from the disclosure page's roots.json (fetched
 * 2026-10-22), typed out here so the embedded data is checked against them.
 */
const PAGE_ROOT_SPKI: Record<string, string> = {
  "emSign Root TLS CA - G3":
    "C619E4780ED8E0ABEDA24AD732567DE4383A7EA941338F6D1A7D1B49AC792FE9",
  "emSign Root CS CA - G3":
    "0A6C2B2CA5B364207954171987AC9D2178561569D8205457E77CA90C32EDE282",
  "AAA Certificate Services":
    "BD153ED7B0434F6886B17BCE8BBE84ED340C7132D702A8F4FA318F756ECBD6F3",
  "emSign ECC Root CA - G3":
    "8D417DB2DD8BF5E3084D1E3F196D583849D81BDD4C00C70B9D39369E96B8C782",
};

Deno.test("every embedded certificate matches its SHA-256 and SPKI SHA-256", async () => {
  const all = [
    ...COMPROMISED_CERTS,
    EMSIGN_TLS_ROOT,
    EMSIGN_CS_ROOT,
    DISTRUST_ANCHOR,
    AAA_ROOT,
    EMSIGN_TLS_G3_CROSS,
  ];
  for (const c of all) {
    const d = der(c.pem);
    assertEquals(await sha256Hex(d), c.sha256);
    assertEquals(await sha256Hex(certSpki(d)), c.spkiSha256);
  }
  for (
    const r of [EMSIGN_TLS_ROOT, EMSIGN_CS_ROOT, DISTRUST_ANCHOR, AAA_ROOT]
  ) {
    assertEquals(r.spkiSha256, PAGE_ROOT_SPKI[r.name], r.name);
  }
  assertEquals(EMSIGN_TLS_G3_CROSS.spkiSha256, EMSIGN_TLS_ROOT.spkiSha256);
});

Deno.test("pemCertificates reads CERTIFICATE and TRUSTED CERTIFICATE blocks and skips junk", () => {
  const trusted = AAA_ROOT.pem.replace(
    /CERTIFICATE-----/g,
    "TRUSTED CERTIFICATE-----",
  );
  const text =
    `# bundle\n${DISTRUST_ANCHOR.pem}\njunk\n${trusted}\n-----BEGIN CERTIFICATE-----\n!!!\n-----END CERTIFICATE-----\n`;
  assertEquals(pemCertificates(text).length, 2);
});

Deno.test("certSpki throws on truncated DER", () => {
  const d = der(AAA_ROOT.pem);
  assertThrows(() => certSpki(d.slice(0, 40)));
  assertThrows(() =>
    certSpki(new Uint8Array([0x30, 0x84, 0xff, 0xff, 0xff, 0xff]))
  );
});

Deno.test("matchStore: a bundle with AAA is exposed for both usages", async () => {
  const m = await matchStore([der(AAA_ROOT.pem)]);
  assertEquals(m.roots, ["AAA Certificate Services"]);
  assertEquals(m.exposed, ["tls", "code-signing"]);
});

Deno.test("matchStore: emSign ECC Root CA - G3 exposes TLS only; emSign Root CS CA - G3 code signing only", async () => {
  assertEquals((await matchStore([der(DISTRUST_ANCHOR.pem)])).exposed, ["tls"]);
  assertEquals((await matchStore([der(EMSIGN_CS_ROOT.pem)])).exposed, [
    "code-signing",
  ]);
  // The cross-signed TLS root has the same key as the self-signed one.
  assertEquals((await matchStore([der(EMSIGN_TLS_G3_CROSS.pem)])).roots, [
    "emSign Root TLS CA - G3",
  ]);
});

Deno.test("matchStore: a clean bundle and unparseable entries expose nothing", async () => {
  const m = await matchStore([new Uint8Array([1, 2, 3])]);
  assertEquals(m, { roots: [], intermediates: [], blocked: [], exposed: [] });
});

Deno.test("matchStore: an intermediate held as an anchor exposes its usage", async () => {
  const cs = COMPROMISED_CERTS.find((c) => c.usage === "code-signing")!;
  const m = await matchStore([der(cs.pem)]);
  assertEquals(m.intermediates, [cs.name]);
  assertEquals(m.exposed, ["code-signing"]);
});

Deno.test("matchStore: blocking every copy of the reachable intermediates removes the usage", async () => {
  // A store with only emSign Root CS CA - G3 reaches the emSign-path copies of
  // the two code-signing intermediates; blocking those (by certificate or by
  // key) clears code signing.
  const cs = COMPROMISED_CERTS.filter((c) =>
    c.usage === "code-signing" && c.path === "emsign"
  );
  const byCert = new Set(cs.map((c) => c.sha256));
  const m = await matchStore([der(EMSIGN_CS_ROOT.pem)], byCert);
  assertEquals(m.exposed, []);
  assertEquals(m.blocked.sort(), [...new Set(cs.map((c) => c.name))].sort());
  const byKey = new Set(cs.map((c) => c.spkiSha256));
  assertEquals(
    (await matchStore([der(EMSIGN_CS_ROOT.pem)], byKey)).exposed,
    [],
  );
  // With AAA too, the AAA copies stay reachable and unblocked.
  assertEquals(
    (await matchStore([der(EMSIGN_CS_ROOT.pem), der(AAA_ROOT.pem)], byCert))
      .exposed,
    ["tls", "code-signing"],
  );
});

Deno.test("parseBlockedCerts reads SHA-256 lists and ignores other algorithms", () => {
  const fp = COMPROMISED_CERTS[0].sha256;
  const colons = fp.match(/.{2}/g)!.join(":").toLowerCase();
  assertEquals(
    [...parseBlockedCerts(`Algorithm=SHA-256\n${fp}\n${colons}\n\n`)],
    [fp],
  );
  assertEquals(parseBlockedCerts(`Algorithm=SHA-1\n${fp}\n`).size, 0);
  assertEquals(parseBlockedCerts(`${fp}\r\n`).size, 1);
});
