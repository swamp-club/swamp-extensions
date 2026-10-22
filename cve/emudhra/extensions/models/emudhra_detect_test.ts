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

import {
  assert,
  assertEquals,
  assertMatch,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { failureLog, model, withTargetLog } from "./emudhra_detect.ts";
import {
  AAA_ROOT,
  COMPROMISED_CERTS,
  DISTRUST_ANCHOR,
  EMSIGN_TLS_G3_CROSS,
} from "./_lib/emudhra_certs.ts";
import {
  anchorMarker,
  assertSafeDockerRef,
  assertSafeSearchPaths,
  assertSafeSshTarget,
  assessHost,
  buildProbeScript,
  compareDebVersions,
  compareDottedVersions,
  distrustConfContent,
  fixedCaCertificates,
  isFixedOnBranches,
  p11kitBlocklistFile,
  parseProbe,
  parseSudoList,
  planMitigation,
  privilegedArgv,
  refusedCommands,
  renderMitigationScript,
  renderStep,
  rootsToDistrust,
  runsWithoutPassword,
  runtimeStatus,
  settledPool,
  shQuote,
  splitList,
  STAGE_TEMPLATE,
  storeFamily,
  sudoCheckCommand,
  tlsVerdict,
  tool,
  verifyResults,
  wrapScript,
} from "./_lib/emudhra_logic.ts";

// --- helpers ---------------------------------------------------------------

function pemToDer(pem: string): Uint8Array<ArrayBuffer> {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function sha256Hex(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0"))
    .join("").toUpperCase();
}

/** Read one DER TLV at `off`; returns the tag, the header length and the body length. */
function tlv(der: Uint8Array<ArrayBuffer>, off: number) {
  const tag = der[off];
  let len = der[off + 1];
  let hdr = 2;
  if (len & 0x80) {
    const n = len & 0x7f;
    len = 0;
    for (let i = 0; i < n; i++) len = (len << 8) | der[off + 2 + i];
    hdr += n;
  }
  return { tag, hdr, len };
}

/** subjectPublicKeyInfo of an X.509 certificate, as DER. */
function spki(der: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  const cert = tlv(der, 0);
  let off = cert.hdr;
  const tbs = tlv(der, off);
  off += tbs.hdr;
  // version [0] is optional; then serial, signature, issuer, validity, subject.
  if (der[off] === 0xa0) off += tlv(der, off).hdr + tlv(der, off).len;
  for (let i = 0; i < 5; i++) {
    const f = tlv(der, off);
    off += f.hdr + f.len;
  }
  const k = tlv(der, off);
  return der.slice(off, off + k.hdr + k.len);
}

type ProbeFixture = {
  uid?: string;
  os?: string[];
  tools?: string[];
  packages?: string[];
  bundle?: string;
  anchor?: string[];
  conf?: string[];
  blocklist?: string[];
  verify?: Record<"emsign-tls" | "aaa-tls" | "aaa-cs", string>;
  java?: string[];
  certifi?: string[];
  cargo?: string[];
  runtimes?: string[];
  agents?: string[];
  processes?: string[];
  live?: string[];
  truncated?: boolean;
};

const DEBIAN_12 = [
  'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"',
  "ID=debian",
  'VERSION_ID="12"',
  "VERSION_CODENAME=bookworm",
];
const FEDORA_43 = [
  'PRETTY_NAME="Fedora Linux 43 (Container Image)"',
  "ID=fedora",
  "VERSION_ID=43",
];
const ROOT_TOOLS = [
  "apt-get /usr/bin/apt-get",
  "dnf /usr/bin/dnf",
  "install /usr/bin/install",
  "update-ca-certificates /usr/sbin/update-ca-certificates",
  "update-ca-trust /usr/bin/update-ca-trust",
  "systemctl /usr/bin/systemctl",
  "sudo /usr/bin/sudo",
  "openssl /usr/bin/openssl",
];

/** Canned probe output, in the shape buildProbeScript prints. */
function probeText(f: ProbeFixture): string {
  const out: string[] = [];
  const sec = (name: string, lines: string[]) =>
    out.push(`@@ ${name}`, ...lines);
  sec("id", [`uid=${f.uid ?? "0"}`, "host=host-1"]);
  sec("os-release", f.os ?? DEBIAN_12);
  sec("tools", f.tools ?? ROOT_TOOLS);
  sec("packages", f.packages ?? ["ca-certificates 20230311+deb12u1"]);
  sec("bundle", [f.bundle ?? "/etc/ssl/certs/ca-certificates.crt"]);
  sec("anchor", f.anchor ?? ["/etc/ssl/certs/ca-certificates.crt"]);
  sec(
    "ca-certificates-conf",
    f.conf ?? [
      DISTRUST_ANCHOR.debianConfEntry,
      AAA_ROOT.debianConfEntry,
    ],
  );
  sec("p11-kit-blocklist", f.blocklist ?? []);
  const v = f.verify ?? { "emsign-tls": "OK", "aaa-tls": "OK", "aaa-cs": "OK" };
  const verify: string[] = [];
  for (const c of COMPROMISED_CERTS) {
    const key = c.path === "emsign"
      ? c.usage === "tls" ? "emsign-tls" : undefined
      : c.usage === "tls"
      ? "aaa-tls"
      : "aaa-cs";
    if (key) verify.push(`${c.sha256.slice(0, 16)} ${v[key]}`);
  }
  sec("verify", verify);
  sec("java", f.java ?? []);
  sec("certifi", f.certifi ?? []);
  sec("cargo", f.cargo ?? []);
  sec("runtimes", f.runtimes ?? []);
  sec("agents", f.agents ?? []);
  sec("processes", f.processes ?? []);
  sec("live", f.live ?? []);
  if (!f.truncated) out.push("@@ end");
  return out.join("\n") + "\n";
}

const NOW = new Date("2026-10-21T12:00:00Z");

// --- model shape -----------------------------------------------------------

Deno.test("globalArguments accepts defaults-only config", () => {
  const g = model.globalArguments.parse({});
  assertEquals(g.targetHost, "localhost");
  assertEquals(g.sshUser, "root");
  assertEquals(g.searchPaths, "");
  assertEquals(g.liveCheck, false);
  assertEquals(g.dockerContainer, undefined);
});

Deno.test("mitigate defaults to dryRun=true", () => {
  const args = model.methods.mitigate.arguments.parse({});
  assertEquals(args.dryRun, true);
});

Deno.test("model exposes scan, scanFleet and mitigate", () => {
  assertEquals(Object.keys(model.methods).sort(), [
    "mitigate",
    "scan",
    "scanFleet",
  ]);
});

// --- embedded data ---------------------------------------------------------

Deno.test("compromised certificates: 16 certs, 8 keys, 12 TLS and 4 code-signing", () => {
  assertEquals(COMPROMISED_CERTS.length, 16);
  assertEquals(new Set(COMPROMISED_CERTS.map((c) => c.spkiSha256)).size, 8);
  assertEquals(new Set(COMPROMISED_CERTS.map((c) => c.name)).size, 8);
  assertEquals(COMPROMISED_CERTS.filter((c) => c.usage === "tls").length, 12);
  for (const name of new Set(COMPROMISED_CERTS.map((c) => c.name))) {
    const paths = COMPROMISED_CERTS.filter((c) => c.name === name).map((c) =>
      c.path
    ).sort();
    assertEquals(paths, ["aaa", "emsign"], name);
  }
});

Deno.test("embedded PEMs match their SHA-256 and SPKI SHA-256", async () => {
  for (const c of COMPROMISED_CERTS) {
    const der = pemToDer(c.pem);
    assertEquals(await sha256Hex(der), c.sha256, `${c.name} via ${c.path}`);
    assertEquals(await sha256Hex(spki(der)), c.spkiSha256, `${c.name} SPKI`);
  }
  assertEquals(
    await sha256Hex(pemToDer(DISTRUST_ANCHOR.pem)),
    DISTRUST_ANCHOR.sha256,
  );
  assertEquals(
    DISTRUST_ANCHOR.sha256,
    "86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B",
  );
  assertEquals(await sha256Hex(pemToDer(AAA_ROOT.pem)), AAA_ROOT.sha256);
  assertEquals(
    await sha256Hex(pemToDer(EMSIGN_TLS_G3_CROSS.pem)),
    EMSIGN_TLS_G3_CROSS.sha256,
  );
});

// --- quoting and lists -----------------------------------------------------

Deno.test("shQuote keeps hostile input a single literal word", () => {
  assertEquals(shQuote("plain"), "'plain'");
  assertEquals(shQuote("it's"), `'it'\\''s'`);
  assertEquals(shQuote("$(rm -rf /)"), "'$(rm -rf /)'");
  assertEquals(shQuote("a\nb; `id`"), "'a\nb; `id`'");
});

Deno.test("splitList trims and drops empty entries", () => {
  assertEquals(splitList(" a, b ,,c "), ["a", "b", "c"]);
  assertEquals(splitList(""), []);
  assertEquals(splitList(undefined), []);
});

// --- version comparison ----------------------------------------------------

Deno.test("compareDebVersions orders Debian versions like dpkg", () => {
  assert(compareDebVersions("20230311+deb12u1", "20250419~deb12u2") < 0);
  assert(compareDebVersions("20250419~deb12u2", "20250419") < 0);
  assert(compareDebVersions("20250419+deb13u1", "20250419~deb12u2") > 0);
  assert(
    compareDebVersions("20260816ubuntu0.24.04.1", "20240203~22.04.1") > 0,
  );
  assert(compareDebVersions("1:1.0", "2.0") > 0);
  assertEquals(compareDebVersions("1.0-1", "1.0-1"), 0);
});

Deno.test("compareDottedVersions handles CalVer, rpm and apk forms", () => {
  assert(
    compareDottedVersions("2025.2.80_v9.0.304-1.2.fc43", "2026.2.92_v9.0.319") <
      0,
  );
  assert(compareDottedVersions("20261020-r0", "20261020-r0") === 0);
  assert(compareDottedVersions("2026.10.2", "2026.10.1") > 0);
  assert(compareDottedVersions("v22.23.4", "22.23.4") === 0);
});

Deno.test("isFixedOnBranches checks the matching branch", () => {
  const node = ["22.23.4", "24.22.1", "26.12.1"];
  assertEquals(isFixedOnBranches("22.23.3", node, 1), false);
  assertEquals(isFixedOnBranches("22.23.4", node, 1), true);
  assertEquals(isFixedOnBranches("20.19.0", node, 1), false);
  assertEquals(isFixedOnBranches("27.0.0", node, 1), true);
  assertEquals(isFixedOnBranches("1.26.9", ["1.26.10", "1.27.3"], 2), false);
  assertEquals(isFixedOnBranches("1.27.3", ["1.26.10", "1.27.3"], 2), true);
});

Deno.test("runtimeStatus: deno fixed in 2.9.8, swamp from its Deno 2.9.8 build, bun has no fixed release", () => {
  assertEquals(runtimeStatus("deno", "2.9.7").status, "exposed");
  assertEquals(runtimeStatus("deno", "2.9.8").status, "fixed");
  assertEquals(runtimeStatus("deno", "2.10.0").status, "fixed");
  assertEquals(
    runtimeStatus("swamp", "20261021.015131.0-sha.bfde0792").status,
    "exposed",
  );
  assertEquals(runtimeStatus("swamp", "20261021.223953.0").status, "fixed");
  assertEquals(
    runtimeStatus("swamp", "20261021.235412.0-sha.2f9b061b").status,
    "fixed",
  );
  assertEquals(
    runtimeStatus("swamp", "20261105.090000.0-sha.0badc0de").status,
    "fixed",
  );
  assertEquals(runtimeStatus("bun", "1.3.0").status, "no-fix-released");
  assertEquals(runtimeStatus("node", "24.22.0").status, "exposed");
  assertEquals(runtimeStatus("node", "").status, "unknown");
});

// --- probe script ----------------------------------------------------------

Deno.test("probe script is read-only and quotes search paths", () => {
  const script = buildProbeScript({
    searchPaths: ["/srv/it's here"],
    liveCheck: true,
  });
  assertStringIncludes(script, `'/srv/it'\\''s here'`);
  // No redirection writes to anything but /dev/null or a file descriptor.
  // rebar.lock's `<<"name">>` terms in the hex grep pattern are not redirects.
  const withoutErlangTerms = script.replace(/'[^']*<<[^']*'/g, "''");
  for (const m of withoutErlangTerms.matchAll(/[^0-9&<]>\s*([^\s&|;)]+)/g)) {
    assert(m[1] === "/dev/null" || m[1].startsWith("&"), `writes to ${m[1]}`);
  }
  assert(!/\bmktemp\b|\btee\b|\bcp\b|\binstall\b -m/.test(script));
  assert(!script.includes("sudo -n"), "scan never uses sudo");
});

Deno.test("probe script verifies 14 certificates and skips the emSign code-signing pair", () => {
  const script = buildProbeScript({ searchPaths: [], liveCheck: false });
  assertEquals((script.match(/openssl verify/g) ?? []).length, 14);
  assert(
    !script.includes("@@ cargo\nfor d"),
    "no Cargo search without searchPaths",
  );
  assert(!script.includes("s_client"), "no live check unless asked");
});

// --- parsing and assessment ------------------------------------------------

Deno.test("unpatched Debian: trusted via both paths, critical, package exposed", () => {
  const probe = parseProbe(probeText({}));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.osStore.verdict, "trusted");
  assertEquals(s.osStore.trustedPaths.sort(), ["aaa", "emsign"]);
  assertEquals(s.osStore.verdictMethod, "openssl-verify");
  assertEquals(s.osStore.codeSigningTrusted, "trusted");
  assertEquals(s.osStore.caCertificates, {
    installed: "20230311+deb12u1",
    fixedIn: "20250419~deb12u2",
    patched: "exposed",
  });
  assertEquals(s.riskLevel, "critical");
  assert(s.exposed);
  assert(s.recommendations.some((r) => r.includes("20250419~deb12u2")));
  assert(s.recommendations.some((r) => r.includes(AAA_ROOT.name)));
});

Deno.test("patched Debian: every chain rejected, no risk", () => {
  const probe = parseProbe(probeText({
    packages: ["ca-certificates 20250419~deb12u2"],
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
  }));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.osStore.verdict, "not-trusted");
  assertEquals(s.osStore.caCertificates.patched, "fixed");
  assertEquals(s.riskLevel, "none");
  assertEquals(s.exposed, false);
});

Deno.test("no openssl: the anchor in the bundle still means trusted", () => {
  const probe = parseProbe(probeText({
    tools: [],
    verify: { "emsign-tls": "", "aaa-tls": "", "aaa-cs": "" },
  }));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.osStore.verdict, "trusted");
  assertEquals(s.osStore.verdictMethod, "anchor-presence");
  assert(s.unreadable.some((u) => u.includes("openssl")));
});

Deno.test("no openssl and no anchor: unknown, low risk, not called clean", () => {
  const probe = parseProbe(probeText({
    tools: [],
    anchor: [],
    verify: { "emsign-tls": "", "aaa-tls": "", "aaa-cs": "" },
  }));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.osStore.verdict, "unknown");
  assertEquals(s.riskLevel, "low");
  assert(!s.summary.includes("does not trust"));
});

Deno.test("distrustConfContent deselects entries with trailing space or CR", () => {
  const out = distrustConfContent(
    "mozilla/A.crt\n  mozilla/emSign_ECC_Root_CA_-_G3.crt \r\nmozilla/B.crt\n",
    [DISTRUST_ANCHOR],
  );
  assertEquals(
    out,
    "mozilla/A.crt\n!mozilla/emSign_ECC_Root_CA_-_G3.crt\nmozilla/B.crt\n",
  );
});

Deno.test("garbled verify output is not a rejection; a truncated probe is unknown", () => {
  const fixture: ProbeFixture = {
    anchor: [],
    verify: {
      "emsign-tls": "???",
      "aaa-tls": "error 2",
      "aaa-cs": "error 2",
    },
  };
  // Output that is neither OK nor a no-trust-path error proves nothing, so
  // the host is not called clean.
  const whole = assessHost(parseProbe(probeText(fixture)), "web-1", NOW);
  assertEquals(whole.osStore.verdict, "unknown");
  const cut = assessHost(
    parseProbe(probeText({ ...fixture, truncated: true })),
    "web-1",
    NOW,
  );
  assertEquals(cut.osStore.verdict, "unknown");
  assert(cut.unreadable.includes("probe output was truncated"));
  assert(!cut.summary.includes("does not trust"));
});

Deno.test("verifyResults: only no-trust-path errors reject; time errors are trusted; others are unknown", () => {
  const verdictFor = (raw: string, anchorPresent = false) =>
    tlsVerdict(
      verifyResults(parseProbe(probeText({
        verify: { "emsign-tls": raw, "aaa-tls": raw, "aaa-cs": raw },
      }))),
      anchorPresent,
    ).verdict;
  for (const raw of ["error 2", "error 19", "error 20", "error 21"]) {
    assertEquals(verdictFor(raw), "not-trusted", raw);
  }
  // A clock before the certificates' start, or after their end, still
  // means a chain was built to a trusted root.
  assertEquals(verdictFor("error 9"), "trusted");
  assertEquals(verdictFor("error 10"), "trusted");
  // An OpenSSL that cannot check the signature says nothing about trust, so
  // the verdict falls back to whether the anchor is in the bundle.
  assertEquals(verdictFor("error 7"), "unknown");
  assertEquals(verdictFor("error 7", true), "trusted");
});

Deno.test("tlsVerdict: rejections with unchecked TLS certificates are unknown", () => {
  const results = verifyResults(parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
  })));
  assertEquals(tlsVerdict(results, false).verdict, "not-trusted");
  const tls = results.filter((r) => r.usage === "tls");
  const partial = results.map((r) =>
    r === tls[tls.length - 1] ? { ...r, result: "not-checked" as const } : r
  );
  assertEquals(tlsVerdict(partial, false).verdict, "unknown");
  assertEquals(tlsVerdict(results, false, false).verdict, "unknown");
});

Deno.test("settledPool keeps order, isolates failures and caps concurrency", async () => {
  let running = 0;
  let peak = 0;
  const out = await settledPool([1, 2, 3, 4, 5, 6, 7], 3, async (n) => {
    running++;
    peak = Math.max(peak, running);
    await new Promise((r) => setTimeout(r, 5));
    running--;
    if (n === 4) throw new Error("four");
    return n * 10;
  });
  assertEquals(peak, 3);
  assertEquals(
    out.map((o) => o.status === "fulfilled" ? o.value : "x"),
    [10, 20, 30, "x", 50, 60, 70],
  );
});

Deno.test("components: runtimes, agents, java, certifi and cargo", () => {
  const probe = parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    runtimes: [
      "deno|/usr/local/bin/deno|2.9.7",
      "swamp|/usr/local/bin/swamp|20261021.015131.0-sha.bfde0792",
      "node|/usr/bin/node|v24.22.1",
      "go|/usr/local/go/bin/go|1.26.9",
    ],
    agents: ["cloudflared|/usr/bin/cloudflared|2026.10.1"],
    java: [
      "file /etc/ssl/certs/java/cacerts",
      `  SHA256: ${AAA_ROOT.sha256.match(/.{2}/g)!.join(":")}`,
      "file /opt/jdk/lib/security/cacerts",
      "  keytool error: java.io.IOException: Keystore was tampered with, or password was incorrect",
    ],
    certifi: [
      "/srv/app/venv/lib/python3.12/site-packages/certifi/cacert.pem|2026.7.22|anchor",
    ],
    cargo: [
      "/srv/rs/Cargo.lock|rustls-webpki|0.103.15",
      "/srv/rs/Cargo.lock|webpki-roots|1.0.10",
      "/srv/rs/Cargo.lock|webpki-roots|0.26.11",
    ],
  }));
  const s = assessHost(probe, "app-1", NOW);
  const by = (name: string) => s.components.filter((c) => c.name === name);
  assertEquals(by("deno")[0].status, "exposed");
  assertEquals(by("swamp")[0].status, "exposed");
  assert(
    s.recommendations.some((r) =>
      r.includes("deno") && r.includes("2.9.8") && r.includes("deno upgrade")
    ),
  );
  assertEquals(by("node")[0].status, "fixed");
  assertEquals(by("go")[0].status, "exposed");
  assertEquals(by("cloudflared")[0].status, "exposed");
  assertEquals(by("java-cacerts").map((c) => c.status), ["exposed", "unknown"]);
  assertEquals(by("certifi")[0].status, "exposed");
  assertEquals(by("rustls-webpki")[0].status, "exposed");
  assertEquals(by("webpki-roots").map((c) => c.status), ["fixed", "fixed"]);
  assertEquals(s.riskLevel, "high");
  assert(
    s.recommendations.some((r) =>
      r.startsWith("Upgrade swamp") && r.includes("swamp update") &&
      r.includes("20261021.223953.0")
    ),
  );
  assert(!s.recommendations.some((r) => r.includes("DENO_TLS_CA_STORE")));
  assert(s.unreadable.some((u) => u.includes("/opt/jdk")));
});

Deno.test("live check: curl 60 is rejected, 0 accepted, 6 unreachable", () => {
  const probe = parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    live: ["curl|emsign|60", "openssl|emsign|0", "curl|aaa|6"],
  }));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.liveCheck.map((l) => l.result), [
    "rejected",
    "accepted",
    "unreachable",
  ]);
  assertEquals(s.riskLevel, "critical");
});

Deno.test("storeFamily from os-release ID and ID_LIKE", () => {
  assertEquals(storeFamily({ ID: "ubuntu" }), "debian-conf");
  assertEquals(
    storeFamily({ ID: "linuxmint", ID_LIKE: "ubuntu debian" }),
    "debian-conf",
  );
  assertEquals(storeFamily({ ID: "amzn", ID_LIKE: "fedora" }), "p11-kit");
  assertEquals(
    storeFamily({ ID: "rocky", ID_LIKE: "rhel centos fedora" }),
    "p11-kit",
  );
  assertEquals(storeFamily({ ID: "alpine" }), "alpine");
  assertEquals(storeFamily({ ID: "nixos" }), "other");
});

// --- mitigation planning ---------------------------------------------------

const DEBIAN_CONF = [
  "# comment",
  "mozilla/Amazon_Root_CA_1.crt",
  DISTRUST_ANCHOR.debianConfEntry,
  AAA_ROOT.debianConfEntry,
  "",
].join("\n");

Deno.test("distrustConfContent deselects entries and is idempotent", () => {
  const once = distrustConfContent(DEBIAN_CONF, [DISTRUST_ANCHOR, AAA_ROOT]);
  assertStringIncludes(once, `!${DISTRUST_ANCHOR.debianConfEntry}\n`);
  assertStringIncludes(once, `!${AAA_ROOT.debianConfEntry}\n`);
  assertStringIncludes(once, "\nmozilla/Amazon_Root_CA_1.crt\n");
  assertEquals(distrustConfContent(once, [DISTRUST_ANCHOR, AAA_ROOT]), once);
  const appended = distrustConfContent("mozilla/Amazon_Root_CA_1.crt\n", [
    DISTRUST_ANCHOR,
  ]);
  assertEquals(
    appended,
    `mozilla/Amazon_Root_CA_1.crt\n!${DISTRUST_ANCHOR.debianConfEntry}\n`,
  );
});

Deno.test("plan: unpatched Debian upgrades, then deselects both roots", () => {
  const probe = parseProbe(probeText({}));
  const status = assessHost(probe, "web-1", NOW);
  const plan = planMitigation(status, probe, {
    transport: "ssh",
    conf: DEBIAN_CONF,
  });
  assertEquals(plan.action, "apply");
  assertEquals(
    plan.upgrade.map((s) => s.kind === "run" ? s.argv.slice(0, 2) : []),
    [
      ["/usr/bin/apt-get", "update"],
      ["/usr/bin/apt-get", "install"],
    ],
  );
  const file = plan.distrust[0];
  assert(file.kind === "install-file");
  assertEquals(file.dest, "/etc/ca-certificates.conf");
  assertStringIncludes(file.content, `!${AAA_ROOT.debianConfEntry}`);
  // A fixed package exists, so the upgrade may be enough: only its commands
  // are required up front, and the distrust commands are listed apart.
  assertEquals(plan.privilegedCommands, [
    ["/usr/bin/apt-get", "update", "-q"],
    [
      "/usr/bin/apt-get",
      "install",
      "-y",
      "-q",
      "--only-upgrade",
      "-o",
      "Dpkg::Options::=--force-confold",
      "ca-certificates",
    ],
  ]);
  assertEquals(plan.distrustCommands, [
    ["/usr/bin/install"],
    ["/usr/sbin/update-ca-certificates"],
  ]);
});

Deno.test("plan: with no fixed package, the distrust commands are required up front", () => {
  const probe = parseProbe(probeText({
    os: ["ID=amzn", "VERSION_ID=2023", 'ID_LIKE="fedora"'],
    tools: [
      "dnf /usr/bin/dnf",
      "update-ca-trust /usr/bin/update-ca-trust",
      "install /usr/bin/install",
      "openssl /usr/bin/openssl",
    ],
    packages: ["ca-certificates 2025.2.80-1.0.amzn2023.0.1"],
    conf: [],
    verify: { "emsign-tls": "OK", "aaa-tls": "error 20", "aaa-cs": "error 20" },
  }));
  const status = assessHost(probe, "al2023", NOW);
  assertEquals(status.os.storeFamily, "p11-kit");
  assert(status.osStore.caCertificates.patched !== "exposed");
  const plan = planMitigation(status, probe, { transport: "ssh" });
  assert(plan.distrustCommands.length > 0);
  for (const c of plan.distrustCommands) {
    assert(plan.privilegedCommands.some((p) => p.join(" ") === c.join(" ")));
  }
});

Deno.test("plan: emSign-only Debian path deselects only the emSign anchor", () => {
  const probe = parseProbe(probeText({
    verify: { "emsign-tls": "OK", "aaa-tls": "error 20", "aaa-cs": "error 20" },
  }));
  const status = assessHost(probe, "web-1", NOW);
  const plan = planMitigation(status, probe, {
    transport: "local",
    conf: DEBIAN_CONF,
  });
  const file = plan.distrust[0];
  assert(file.kind === "install-file");
  assertStringIncludes(file.content, `!${DISTRUST_ANCHOR.debianConfEntry}`);
  assert(!file.content.includes(`!${AAA_ROOT.debianConfEntry}`));
});

Deno.test("plan: older p11-kit layouts get the blacklist directory", () => {
  const text = probeText({
    os: FEDORA_43,
    packages: ["ca-certificates 2025.2.80_v9.0.304-1.2.fc43"],
    conf: [],
    verify: { "emsign-tls": "OK", "aaa-tls": "error 20", "aaa-cs": "error 20" },
  }).replace(
    "@@ verify",
    "@@ p11-kit-dir\n/etc/pki/ca-trust/source/blacklist\n@@ verify",
  );
  const probe = parseProbe(text);
  const plan = planMitigation(assessHost(probe, "al2", NOW), probe, {
    transport: "ssh",
  });
  const file = plan.distrust[0];
  assert(file.kind === "install-file");
  assert(file.dest.startsWith("/etc/pki/ca-trust/source/blacklist/"));
});

Deno.test("Docker plan for bundle-only Alpine names ca-certificates-bundle", () => {
  const probe = parseProbe(probeText({
    os: ["ID=alpine", "VERSION_ID=3.22.6"],
    tools: ["apk /sbin/apk"],
    packages: ["ca-certificates-bundle 20250911-r0"],
    conf: [],
  }));
  const plan = planMitigation(assessHost(probe, "image-alpine", NOW), probe, {
    transport: "docker",
  });
  assert(
    plan.notes.some((n) =>
      n.includes("apk upgrade --no-cache ca-certificates-bundle") &&
      !n.includes("update-ca-certificates")
    ),
  );
});

Deno.test("plan: p11-kit blocklists the anchor and rebuilds with update-ca-trust", () => {
  const probe = parseProbe(probeText({
    os: FEDORA_43,
    packages: ["ca-certificates 2025.2.80_v9.0.304-1.2.fc43"],
    conf: [],
    verify: { "emsign-tls": "OK", "aaa-tls": "error 20", "aaa-cs": "error 20" },
  }));
  const status = assessHost(probe, "db-1", NOW);
  assertEquals(status.osStore.caCertificates.patched, "exposed");
  const plan = planMitigation(status, probe, { transport: "ssh" });
  assertEquals(plan.upgrade.length, 1);
  const [file, extract] = plan.distrust;
  assert(file.kind === "install-file");
  assertEquals(
    file.dest,
    `/etc/pki/ca-trust/source/blocklist/${
      p11kitBlocklistFile(DISTRUST_ANCHOR)
    }`,
  );
  assertEquals(file.content.trim(), DISTRUST_ANCHOR.pem.trim());
  assert(extract.kind === "run");
  assertEquals(extract.argv, ["/usr/bin/update-ca-trust", "extract"]);
});

Deno.test("plan: Docker targets get rebuild-image and no steps", () => {
  const probe = parseProbe(probeText({}));
  const status = assessHost(probe, "docker-abc", NOW);
  const plan = planMitigation(status, probe, { transport: "docker" });
  assertEquals(plan.action, "rebuild-image");
  assertEquals(
    plan.upgrade.length + plan.distrust.length + plan.after.length,
    0,
  );
  assertStringIncludes(plan.notes[0], "update-ca-certificates");
});

Deno.test("plan: clean host is none; unknown distros are manual", () => {
  const clean = parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
  }));
  assertEquals(
    planMitigation(assessHost(clean, "a", NOW), clean, { transport: "ssh" })
      .action,
    "none",
  );
  const other = parseProbe(probeText({ os: ["ID=nixos"], conf: [] }));
  assertEquals(
    planMitigation(assessHost(other, "b", NOW), other, { transport: "ssh" })
      .action,
    "manual",
  );
});

Deno.test("plan: Arch blocks the root through p11-kit and leaves pacman -Syu to the operator", () => {
  const arch = parseProbe(probeText({
    os: ["ID=omarchy", "ID_LIKE=arch"],
    packages: ["ca-certificates 3.131-1"],
    conf: [],
  }));
  const status = assessHost(arch, "b", NOW);
  assertEquals(status.osStore.caCertificates.fixedIn, "3.131.1-1");
  assertEquals(status.osStore.caCertificates.patched, "exposed");
  assert(status.recommendations.some((r) => r.includes("pacman -Syu")));
  const plan = planMitigation(status, arch, { transport: "ssh" });
  assertEquals(plan.action, "apply");
  assertEquals(plan.upgrade.length, 0);
  // The fixture trusts both paths, so both roots are blocked.
  assertEquals(plan.distrust.length, 3);
  const [file, , extract] = plan.distrust;
  assert(file.kind === "install-file");
  assertEquals(
    file.dest,
    `/etc/ca-certificates/trust-source/blocklist/${
      p11kitBlocklistFile(DISTRUST_ANCHOR)
    }`,
  );
  assert(extract.kind === "run");
  assertEquals(extract.argv, ["/usr/bin/update-ca-trust", "extract"]);
  // No upgrade can fix the store first, so sudo is asked about the
  // distrust commands up front.
  assert(
    plan.privilegedCommands.some((c) => c[0] === "/usr/bin/update-ca-trust"),
  );
  assert(plan.manual.some((m) => m.includes("pacman -Syu")));
  const docker = planMitigation(status, arch, { transport: "docker" });
  assert(docker.notes.some((n) => n.includes("trust-source/blocklist")));
});

Deno.test("fixedCaCertificates: Arch, Debian and Ubuntu derivatives use the parent; RHEL clones do not", () => {
  assertEquals(
    fixedCaCertificates({ ID: "manjaro", ID_LIKE: "arch" }),
    "3.131.1-1",
  );
  assertEquals(
    fixedCaCertificates({
      ID: "raspbian",
      ID_LIKE: "debian",
      VERSION_ID: "12",
    }),
    "20250419~deb12u2",
  );
  assertEquals(
    fixedCaCertificates({
      ID: "pop",
      ID_LIKE: "ubuntu debian",
      VERSION_ID: "24.04",
    }),
    "20260816ubuntu0.24.04.1",
  );
  assertEquals(
    fixedCaCertificates({
      ID: "linuxmint",
      ID_LIKE: "ubuntu debian",
      VERSION_ID: "22.1",
    }),
    undefined,
  );
  assertEquals(
    fixedCaCertificates({
      ID: "rocky",
      ID_LIKE: "rhel centos fedora",
      VERSION_ID: "9.6",
    }),
    undefined,
  );
});

Deno.test("plan: bundled-store runtimes get no restart line", () => {
  const probe = parseProbe(probeText({
    processes: ["deno|2", "swamp|1", "python3|4"],
  }));
  const plan = planMitigation(assessHost(probe, "a", NOW), probe, {
    transport: "ssh",
  });
  assertEquals(plan.restart, [
    "python3 (4 running): restart so it reloads the CA store",
  ]);
});

Deno.test("plan: agent from a package is upgraded and restarted", () => {
  const probe = parseProbe(probeText({
    anchor: [],
    packages: ["ca-certificates 20250419~deb12u2", "cloudflared 2026.10.1"],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    agents: ["cloudflared|/usr/bin/cloudflared|2026.10.1"],
  }));
  const plan = planMitigation(assessHost(probe, "edge", NOW), probe, {
    transport: "ssh",
  });
  assertEquals(plan.action, "apply");
  assertEquals(
    plan.after.map((s) => s.kind === "run" ? s.argv.join(" ") : ""),
    [
      "/usr/bin/apt-get update -q",
      "/usr/bin/apt-get install -y -q --only-upgrade -o Dpkg::Options::=--force-confold cloudflared",
      "/usr/bin/systemctl try-restart cloudflared",
    ],
  );
  // The restart is best effort, so sudo is not required to allow it.
  assert(!plan.privilegedCommands.some((c) => c[0] === "/usr/bin/systemctl"));
});

// --- privilege -------------------------------------------------------------

Deno.test("privileged commands are sudo -n -- <binary> with no sh -c", () => {
  assertEquals(privilegedArgv(["/usr/bin/apt-get", "update"], true), [
    "/usr/bin/apt-get",
    "update",
  ]);
  assertEquals(privilegedArgv(["/usr/bin/apt-get", "update"], false), [
    "sudo",
    "-n",
    "--",
    "/usr/bin/apt-get",
    "update",
  ]);
  const probe = parseProbe(probeText({}));
  const plan = planMitigation(assessHost(probe, "w", NOW), probe, {
    transport: "ssh",
    conf: DEBIAN_CONF,
  });
  for (const step of [...plan.upgrade, ...plan.distrust]) {
    const text = renderStep(step, {
      sudo: true,
      installPath: "/usr/bin/install",
      brief: true,
    });
    assert(!text.includes("sh -c"), text);
    assertMatch(
      text,
      /^(sudo -n -- '\/|tmp=)|sudo -n -- '\/usr\/bin\/install'/,
    );
  }
});

Deno.test("sudo check asks about full commands, so pinned rules match", () => {
  const commands = [
    ["/usr/bin/apt-get", "update", "-q"],
    [
      "/usr/bin/install",
      "-m",
      "0644",
      STAGE_TEMPLATE,
      "/etc/ca-certificates.conf",
    ],
  ];
  const cmd = sudoCheckCommand(commands);
  assertStringIncludes(cmd, "sudo -n -l '/usr/bin/apt-get' 'update' '-q'");
  assertStringIncludes(cmd, `'${STAGE_TEMPLATE}' '/etc/ca-certificates.conf'`);
  const nopasswdAll = [
    "@@ sudo-ll",
    "Sudoers entry: /etc/sudoers.d/90-cloud-init-users",
    "    RunAsUsers: ALL",
    "    Options: !authenticate",
    "    Commands:",
    "\tALL",
  ];
  assertEquals(
    refusedCommands(commands, ["0|0", "1|1", "junk", ...nopasswdAll]),
    [commands[1]],
  );
  assertEquals(refusedCommands(commands, []), commands);
  assertStringIncludes(cmd, "echo '@@ sudo-ll'; sudo -n -ll 2>/dev/null");
});

// `sudo -n -ll` from an Omarchy workstation: a password rule for ALL, plus
// NOPASSWD rules that let sudo list without a password.
const OMARCHY_SUDO_LL = [
  "Matching Defaults entries for seth on cypress:",
  "    secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/bin, passwd_tries=10",
  "",
  "User seth may run the following commands on cypress:",
  "",
  "Sudoers entry: /etc/sudoers.d/04_seth",
  "    RunAsUsers: ALL",
  "    Commands:",
  "\tALL",
  "",
  "Sudoers entry: /etc/sudoers.d/omarchy-dns",
  "    RunAsUsers: root",
  "    Options: !authenticate",
  "    Commands:",
  "\t/usr/bin/omarchy-dns Cloudflare",
  "\t/usr/bin/omarchy-dns Google",
];

Deno.test("sudo pre-check refuses a command whose rule would ask for a password", () => {
  const commands = [["/usr/sbin/install"], [
    "/usr/sbin/update-ca-trust",
    "extract",
  ]];
  // sudo -n -l passes both: the ALL rule permits them, password or not.
  const lines = ["0|0", "1|0", "@@ sudo-ll", ...OMARCHY_SUDO_LL];
  assertEquals(refusedCommands(commands, lines), commands);

  // NOPASSWD: ALL, as on most cloud images.
  const cloud = [
    "User ubuntu may run the following commands on host:",
    "",
    "Sudoers entry: /etc/sudoers.d/90-cloud-init-users",
    "    RunAsUsers: ALL",
    "    Options: !authenticate",
    "    Commands:",
    "\tALL",
  ];
  assertEquals(
    refusedCommands(commands, ["0|0", "1|0", "@@ sudo-ll", ...cloud]),
    [],
  );

  // A drop-in after the password rule for exactly these binaries wins,
  // because sudoers uses the last matching entry.
  const dropIn = [
    ...OMARCHY_SUDO_LL,
    "",
    "Sudoers entry: /etc/sudoers.d/emudhra",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\t/usr/sbin/install",
  ];
  assertEquals(
    refusedCommands(commands, ["0|0", "1|0", "@@ sudo-ll", ...dropIn]),
    [
      commands[1],
    ],
  );

  // A NOPASSWD rule pinned to other arguments does not decide: sudo falls
  // back to the password rule before it.
  const apt = [
    "/usr/bin/apt-get",
    "install",
    "-y",
    "-q",
    "--only-upgrade",
    "-o",
    "Dpkg::Options::=--force-confold",
  ];
  const pinned = [
    ...OMARCHY_SUDO_LL,
    "",
    "Sudoers entry: /etc/sudoers.d/emudhra",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\t/usr/bin/apt-get install -y -q --only-upgrade -o Dpkg\\:\\:Options\\:\\:=--force-confold ca-certificates",
    "\t/usr/bin/apt-get update -q",
  ];
  const pinnedList = parseSudoList(pinned);
  assert(runsWithoutPassword([...apt, "ca-certificates"], pinnedList));
  assert(
    !runsWithoutPassword(
      [...apt, "ca-certificates", "ca-certificates-java"],
      pinnedList,
    ),
  );
  assert(runsWithoutPassword(["/usr/bin/apt-get", "update", "-q"], pinnedList));
  // "" allows no arguments; a wildcard spans spaces; ^...$ is a regex.
  const forms = parseSudoList([
    "Sudoers entry: /etc/sudoers.d/x",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    '\t/usr/sbin/update-ca-certificates ""',
    "\t/usr/bin/dnf -y upgrade *",
    "\t/usr/bin/apk ^(update|upgrade ca-certificates(-bundle)?)$",
  ]);
  assert(runsWithoutPassword(["/usr/sbin/update-ca-certificates"], forms));
  assert(
    !runsWithoutPassword(["/usr/sbin/update-ca-certificates", "-f"], forms),
  );
  assert(
    runsWithoutPassword(
      ["/usr/bin/dnf", "-y", "upgrade", "ca-certificates"],
      forms,
    ),
  );
  assert(runsWithoutPassword(["/usr/bin/apk", "update"], forms));
  assert(!runsWithoutPassword(["/usr/bin/apk", "add", "curl"], forms));

  // The staged install stands for any arguments, so an install rule that
  // allows none does not cover it.
  assert(
    !runsWithoutPassword(
      ["/usr/sbin/install"],
      parseSudoList([
        "Sudoers entry: /etc/sudoers.d/x",
        "    RunAsUsers: root",
        "    Options: !authenticate",
        "    Commands:",
        '\t/usr/sbin/install ""',
      ]),
    ),
  );

  // ...but `install *` allows any arguments, so it does.
  assert(
    runsWithoutPassword(
      ["/usr/sbin/install"],
      parseSudoList([
        "Sudoers entry: /etc/sudoers.d/x",
        "    RunAsUsers: root",
        "    Options: !authenticate",
        "    Commands:",
        "\t/usr/sbin/install *",
      ]),
    ),
  );
  // A listing this parser cannot read refuses rather than trusting sudo -l.
  assertEquals(
    refusedCommands(commands, ["0|0", "1|0", "@@ sudo-ll"]),
    commands,
  );

  // Defaults !authenticate makes every rule passwordless.
  const list = parseSudoList([
    "Matching Defaults entries for u on h:",
    "    !authenticate",
    "",
    "Sudoers entry: /etc/sudoers",
    "    RunAsUsers: ALL",
    "    Commands:",
    "\tALL",
  ]);
  assert(runsWithoutPassword(["/usr/sbin/install"], list));
  // A rule that only runs as another user does not count.
  assert(
    !runsWithoutPassword(
      ["/usr/sbin/install"],
      parseSudoList([
        "Sudoers entry: /etc/sudoers",
        "    RunAsUsers: backup",
        "    Options: !authenticate",
        "    Commands:",
        "\tALL",
      ]),
    ),
  );
});

Deno.test("mitigation script is self-contained and has no sudo", () => {
  const probe = parseProbe(probeText({
    os: FEDORA_43,
    conf: [],
    verify: { "emsign-tls": "OK", "aaa-tls": "error 20", "aaa-cs": "error 20" },
  }));
  const status = assessHost(probe, "db-1", NOW);
  const plan = planMitigation(status, probe, { transport: "ssh" });
  const script = renderMitigationScript("db-1", plan, "/usr/bin/install");
  assert(script.startsWith("#!/bin/sh\n"));
  assertStringIncludes(script, "set -eu");
  assertStringIncludes(script, DISTRUST_ANCHOR.pem.split("\n")[1]);
  assertStringIncludes(script, anchorMarker());
  assert(
    !script.includes("sudo -n"),
    "the user runs it with sudo; it does not call sudo itself",
  );
  // Here-document terminators must start at column 0 or sh never ends them,
  // and the installed file's content must not be indented.
  const lines = script.split("\n");
  const terminators = lines.filter((l) => l.trim() === "EMUDHRA_FILE");
  assert(terminators.length > 0);
  assert(terminators.every((l) => l === "EMUDHRA_FILE"));
  assert(lines.includes("-----BEGIN CERTIFICATE-----"));
});

// --- review fixes ----------------------------------------------------------

Deno.test("assertSafeSshTarget refuses option-like or odd hosts and users", () => {
  assertSafeSshTarget("ubuntu", "10.0.1.50");
  assertSafeSshTarget("deploy", "web-1.example.com");
  assertSafeSshTarget("root", "fe80::1%eth0");
  assertThrows(() => assertSafeSshTarget("root", "-oProxyCommand=id"));
  assertThrows(() => assertSafeSshTarget("-oProxyCommand=id", "host"));
  assertThrows(() => assertSafeSshTarget("root", "host name"));
  assertThrows(() => assertSafeSshTarget("root", "a@b"));
  assertThrows(() => assertSafeSshTarget("root", ""));
});

Deno.test("Java store that keytool listed without fingerprints is unknown, not fixed", () => {
  const probe = parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    java: [
      "file /usr/lib/jvm/x/lib/security/cacerts",
      "  keytool error: java.io.IOException: Invalid keystore format",
    ],
  }));
  const s = assessHost(probe, "j", NOW);
  assertEquals(s.components[0].status, "unknown");
});

Deno.test("curl exit 35 is unreachable, not rejected", () => {
  const probe = parseProbe(probeText({ live: ["curl|emsign|35"] }));
  assertEquals(assessHost(probe, "w", NOW).liveCheck[0].result, "unreachable");
});

Deno.test("Alpine plan refreshes the package index before upgrading", () => {
  const probe = parseProbe(probeText({
    os: ["ID=alpine", "VERSION_ID=3.22.6"],
    tools: [
      "apk /sbin/apk",
      "update-ca-certificates /usr/sbin/update-ca-certificates",
    ],
    conf: [],
  }));
  const plan = planMitigation(assessHost(probe, "a", NOW), probe, {
    transport: "ssh",
  });
  assertEquals(
    plan.upgrade.map((s) => s.kind === "run" ? s.argv.slice(1).join(" ") : ""),
    ["update", "upgrade ca-certificates", ""],
  );
});

Deno.test("bundle-only Alpine upgrades ca-certificates-bundle and skips the rebuild", () => {
  const probe = parseProbe(probeText({
    os: ["ID=alpine", "VERSION_ID=3.22.6"],
    tools: ["apk /sbin/apk"],
    packages: ["ca-certificates-bundle 20250911-r0"],
    conf: [],
  }));
  const status = assessHost(probe, "a", NOW);
  assertEquals(status.osStore.caCertificates.installed, "20250911-r0");
  const plan = planMitigation(status, probe, { transport: "ssh" });
  assertEquals(
    plan.upgrade.map((s) => s.kind === "run" ? s.argv.slice(1).join(" ") : ""),
    ["update", "upgrade ca-certificates-bundle"],
  );
});

Deno.test("privileged steps use system tool paths, never a user's own", () => {
  const probe = parseProbe(probeText({
    tools: [
      "apt-get /home/deploy/bin/apt-get",
      "update-ca-certificates /usr/sbin/update-ca-certificates",
      "install /usr/bin/install",
      "openssl /usr/bin/openssl",
    ],
  }));
  assertEquals(tool(probe, "apt-get"), "apt-get");
  assertEquals(
    tool(probe, "update-ca-certificates"),
    "/usr/sbin/update-ca-certificates",
  );
  const plan = planMitigation(assessHost(probe, "w", NOW), probe, {
    transport: "ssh",
    conf: DEBIAN_CONF,
  });
  const argvs = [...plan.upgrade, ...plan.distrust].flatMap((st) =>
    st.kind === "run" ? [st.argv[0]] : []
  );
  assert(argvs.length > 0);
  assert(argvs.every((a) => !a.startsWith("/home/")));
});

Deno.test("id section: a missing uid line does not shift the hostname", () => {
  const text = probeText({}).replace("uid=0\n", "");
  const probe = parseProbe(text);
  assertEquals(probe.uid, undefined);
  assertEquals(probe.hostname, "host-1");
});

Deno.test("a missing trailing zero compares equal; swamp's sha suffix still counts as fixed", () => {
  assertEquals(
    compareDottedVersions("20261021.223953", "20261021.223953.0"),
    0,
  );
  assertEquals(runtimeStatus("swamp", "20261021.223953").status, "fixed");
  assertEquals(
    runtimeStatus("swamp", "20261021.223953.0-sha.ea2a36f5").status,
    "fixed",
  );
  assert(compareDottedVersions("1.0.1", "1.0") > 0);
});

Deno.test("script upgrades and agent restarts are best effort under set -e", () => {
  const probe = parseProbe(probeText({
    tools: [
      "apt-get /usr/bin/apt-get",
      "update-ca-certificates /usr/sbin/update-ca-certificates",
      "install /usr/bin/install",
      "openssl /usr/bin/openssl",
      "systemctl /usr/bin/systemctl",
    ],
    packages: [
      "ca-certificates 20230311+deb12u1",
      "cloudflared 2026.10.1",
    ],
    agents: ["cloudflared|/usr/bin/cloudflared|2026.10.1"],
  }));
  const plan = planMitigation(assessHost(probe, "w", NOW), probe, {
    transport: "ssh",
    conf: DEBIAN_CONF,
  });
  const restart = plan.after.find((s) =>
    s.kind === "run" && s.argv.includes("try-restart")
  );
  assert(restart && restart.kind === "run" && restart.bestEffort);
  const script = renderMitigationScript("w", plan, "/usr/bin/install");
  assertStringIncludes(
    script,
    "'/usr/bin/apt-get' 'update' '-q' || echo 'emudhra: refresh package lists failed; continuing' >&2",
  );
  assertStringIncludes(script, "'try-restart' 'cloudflared' || echo");
});

Deno.test("no openssl: AAA in the bundle is trusted through the AAA path and distrusted", () => {
  const probe = parseProbe(probeText({
    tools: [],
    anchor: ["aaa /etc/ssl/certs/ca-certificates.crt"],
    verify: { "emsign-tls": "", "aaa-tls": "", "aaa-cs": "" },
  }));
  assertEquals(probe.anchorInBundles, []);
  assertEquals(probe.aaaInBundles, ["/etc/ssl/certs/ca-certificates.crt"]);
  const s = assessHost(probe, "old-1", NOW);
  assertEquals(s.osStore.verdict, "trusted");
  assertEquals(s.osStore.trustedPaths, ["aaa"]);
  assertEquals(s.riskLevel, "critical");
  assertEquals(rootsToDistrust(s).map((r) => r.name), [
    DISTRUST_ANCHOR.name,
    AAA_ROOT.name,
  ]);
});

Deno.test("probe greps both the emSign and AAA anchors", () => {
  const script = buildProbeScript({ searchPaths: [], liveCheck: false });
  assertStringIncludes(script, shQuote(anchorMarker(AAA_ROOT)));
  assertStringIncludes(script, 'echo "aaa $b"');
});

Deno.test("pre-release tags sort below the release numbers they precede", () => {
  assert(compareDottedVersions("1.27rc1", "1.27.3") < 0);
  assert(compareDottedVersions("1.27.3", "1.27rc1") > 0);
  assertEquals(isFixedOnBranches("1.27rc1", ["1.26.10", "1.27.3"], 2), false);
});

Deno.test("Debian script edits ca-certificates.conf in place, never with a stale copy", () => {
  const probe = parseProbe(probeText({}));
  const status = assessHost(probe, "w", NOW);
  const plan = planMitigation(status, probe, {
    transport: "ssh",
    conf: DEBIAN_CONF,
  });
  const script = renderMitigationScript("w", plan, "/usr/bin/install", [
    DISTRUST_ANCHOR,
    AAA_ROOT,
  ]);
  assertStringIncludes(
    script,
    "sed -i -e 's|^[[:space:]]*mozilla/emSign_ECC_Root_CA_-_G3\\.crt[[:space:]]*$|!mozilla/emSign_ECC_Root_CA_-_G3.crt|' -e 's|^[[:space:]]*mozilla/Comodo_AAA_Services_root\\.crt[[:space:]]*$|!mozilla/Comodo_AAA_Services_root.crt|' /etc/ca-certificates.conf",
  );
  assert(
    !script.includes("mozilla/Amazon_Root_CA_1.crt"),
    "no inlined conf copy",
  );
  assertStringIncludes(
    script,
    `[ -z "$(tail -c1 /etc/ca-certificates.conf)" ] || echo >> /etc/ca-certificates.conf`,
  );
  assertStringIncludes(
    script,
    "grep -qxF '!mozilla/Comodo_AAA_Services_root.crt' /etc/ca-certificates.conf || echo '!mozilla/Comodo_AAA_Services_root.crt' >> /etc/ca-certificates.conf",
  );
});

Deno.test("webpki-roots 0.26.x alone is exposed; unknown components are not clean", () => {
  const probe = parseProbe(probeText({
    packages: ["ca-certificates 20250419~deb12u2"],
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    cargo: ["/srv/rs/Cargo.lock|webpki-roots|0.26.3"],
    agents: ["cloudflared|/usr/bin/cloudflared|"],
  }));
  const s = assessHost(probe, "rs-1", NOW);
  assertEquals(
    s.components.find((c) => c.name === "webpki-roots")?.status,
    "exposed",
  );
  assert(s.unreadable.some((u) => u.startsWith("cloudflared")));
  assert(s.riskLevel !== "none");
});

Deno.test("wrapScript keeps the script's own exit status", () => {
  // The target's own locale would translate the messages mitigate matches.
  assert(wrapScript("true").startsWith("LC_ALL=C; export LC_ALL\n"));
  const wrapped = wrapScript("false");
  assertEquals(
    wrapped,
    "LC_ALL=C; export LC_ALL\nemudhra_main() {\nfalse\n}\nemudhra_main </dev/null\n",
  );
});

Deno.test("staged install passes along install's failure", () => {
  const text = renderStep(
    {
      kind: "install-file",
      dest: "/etc/x",
      content: "a\n",
      mode: "0644",
      why: "w",
    },
    { sudo: true, installPath: "/usr/bin/install" },
  );
  assertStringIncludes(text, `tmp=$(mktemp ${STAGE_TEMPLATE}) || exit "$?"`);
  // A failed write must stop before install copies a partial file into place.
  assertStringIncludes(
    text,
    `cat > "$tmp" <<'EMUDHRA_FILE' || { rc=$?; rm -f "$tmp"; exit "$rc"; }\na\nEMUDHRA_FILE`,
  );
  assertStringIncludes(
    text,
    `"$tmp" '/etc/x' || { rc=$?; rm -f "$tmp"; exit "$rc"; }`,
  );
});

Deno.test("staged heredoc terminator never matches a content line", () => {
  const text = renderStep(
    {
      kind: "install-file",
      dest: "/etc/x",
      content: "a\nEMUDHRA_FILE\nEMUDHRA_FILE_\nb\n",
      mode: "0644",
      why: "w",
    },
    { sudo: false, installPath: "/usr/bin/install" },
  );
  assertStringIncludes(text, `<<'EMUDHRA_FILE__'`);
  assertStringIncludes(text, "\nb\nEMUDHRA_FILE__\n");
});

Deno.test("fixed package but still trusted: says so instead of 'no fix known'", () => {
  const probe = parseProbe(probeText({
    packages: ["ca-certificates 20250419~deb12u2"],
  }));
  const s = assessHost(probe, "web-1", NOW);
  assertEquals(s.osStore.verdict, "trusted");
  assertEquals(s.osStore.caCertificates.patched, "fixed");
  assert(s.recommendations.some((r) => r.includes("at a fixed version")));
  assert(
    !s.recommendations.some((r) => r.includes("no fixed ca-certificates")),
  );
});

Deno.test("splitList drops blanks and duplicate hosts", () => {
  assertEquals(splitList(" a, b,,a ,c,b"), ["a", "b", "c"]);
});

Deno.test("an old Go alone is medium risk on a clean store", () => {
  const probe = parseProbe(probeText({
    packages: ["ca-certificates 20250419~deb12u2"],
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    runtimes: ["go|/usr/local/go/bin/go|1.26.9"],
  }));
  const s = assessHost(probe, "build-1", NOW);
  assertEquals(s.components.find((c) => c.name === "go")?.status, "exposed");
  assertEquals(s.riskLevel, "medium");
});

Deno.test("apk revisions compare numerically", () => {
  assert(compareDottedVersions("20260909-r10", "20260909-r3") > 0);
  assert(compareDottedVersions("20261020-r0", "20260909-r3") > 0);
});

Deno.test("assertSafeDockerRef refuses option-like names", () => {
  assertSafeDockerRef("dockerImage", "alpine:3.22");
  assertSafeDockerRef("dockerImage", "ghcr.io/org/app@sha256:abc");
  assertThrows(() => assertSafeDockerRef("dockerContainer", "--privileged"));
  assertThrows(() => assertSafeDockerRef("dockerImage", "a b"));
});

Deno.test("webpki-roots before 0.26 and certifi with AAA are exposed", () => {
  const probe = parseProbe(probeText({
    anchor: [],
    verify: {
      "emsign-tls": "error 20",
      "aaa-tls": "error 20",
      "aaa-cs": "error 20",
    },
    cargo: ["/srv/rs/Cargo.lock|webpki-roots|0.25.4"],
    certifi: ["/srv/py/certifi/cacert.pem|2024.2.2|aaa"],
  }));
  const s = assessHost(probe, "x", NOW);
  assertEquals(s.components.map((c) => [c.name, c.status]), [
    ["certifi", "exposed"],
    ["webpki-roots", "exposed"],
  ]);
});

Deno.test("hex lockfiles: Erlang certifi has no fix, castore and tls_certificate_check by version", () => {
  const out = [
    "@@ hex",
    "/srv/ex/mix.lock|castore|1.0.21",
    "/srv/ex/mix.lock|certifi|2.17.0",
    "/srv/erl/rebar.lock|tls_certificate_check|1.36.0",
    "/srv/ex2/mix.lock|castore|1.0.22",
    "@@ end",
  ].join("\n");
  const probe = parseProbe(
    probeText({ anchor: [] }).replace("@@ end\n", out + "\n"),
  );
  const s = assessHost(probe, "x", NOW);
  const hex = s.components.filter((c) => c.kind === "hex");
  assertEquals(hex.map((c) => [c.name, c.version, c.status]), [
    ["hex castore", "1.0.21", "exposed"],
    ["hex certifi", "2.17.0", "no-fix-released"],
    ["hex tls_certificate_check", "1.36.0", "fixed"],
    ["hex castore", "1.0.22", "fixed"],
  ]);
});

Deno.test("probe searches mix.lock and rebar.lock only under searchPaths", () => {
  assert(
    !buildProbeScript({ searchPaths: [], liveCheck: false }).includes(
      "mix.lock",
    ),
  );
  const script = buildProbeScript({ searchPaths: ["/srv"], liveCheck: false });
  assertStringIncludes(script, "-name mix.lock -o -name rebar.lock");
});

Deno.test("searchPaths must be absolute so find never reads one as an option", () => {
  assertSafeSearchPaths(["/srv", "/opt/apps"]);
  assertThrows(() => assertSafeSearchPaths(["-delete"]));
  assertThrows(() => assertSafeSearchPaths(["srv"]));
  assertThrows(() =>
    buildProbeScript({ searchPaths: ["-delete"], liveCheck: false })
  );
});

Deno.test("a target that throws still writes and finalizes its log", async () => {
  const lines: string[] = [];
  let finalized = 0;
  const log = {
    writeLine: (l: string) => {
      lines.push(l);
      return Promise.resolve();
    },
    writeText: () => Promise.resolve(),
    finalize: () => {
      finalized++;
      return Promise.resolve({ name: "web-1-log" });
    },
  };
  let caught: unknown;
  try {
    await withTargetLog(log, () => {
      lines.push("Checking SSH connectivity...");
      return Promise.reject(new Error("Permission denied (publickey)"));
    });
  } catch (e) {
    caught = e;
  }
  assert(caught instanceof Error);
  assertEquals(caught.message, "Permission denied (publickey)");
  assertEquals(finalized, 1);
  assert(lines.some((l) => l.includes("ERROR: Permission denied")));
  assertEquals(failureLog(caught), [{ name: "web-1-log" }]);
  assertEquals(failureLog(new Error("no log")), []);
  // On success the caller finalizes, so the wrapper must not.
  assertEquals(await withTargetLog(log, () => Promise.resolve(7)), 7);
  assertEquals(finalized, 1);
});
