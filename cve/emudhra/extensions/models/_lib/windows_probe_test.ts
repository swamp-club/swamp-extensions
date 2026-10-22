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
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { COMPROMISED_CERTS } from "./emudhra_certs.ts";
import {
  analyzeStores,
  assessHost,
  disallowScript,
  parseProbe,
  planMitigation,
  renderStep,
  renderWindowsMitigationScript,
  windowsState,
} from "./emudhra_logic.ts";
import {
  assertSafeWindowsPaths,
  buildWindowsProbe,
  encodePowerShell,
  launcherInput,
  POWERSHELL_ARGV,
  POWERSHELL_END,
  psQuote,
} from "./windows_probe.ts";

const NOW = new Date("2026-10-22T12:00:00Z");

/** Probe output in the shape the Windows probe prints, with CRLF endings. */
function winProbe(opts: {
  verify: (c: (typeof COMPROMISED_CERTS)[number]) => string;
  policy?: string[];
  disallowed?: string[];
  admin?: boolean;
  runtimes?: string[];
}): string {
  return [
    "@@ id",
    "host=WINTEST",
    `admin=${opts.admin ? 1 : 0}`,
    "@@ os-release",
    "ID=windows",
    "VERSION_ID=26200.6584",
    'PRETTY_NAME="Windows 11 Enterprise 25H2 (build 26200.6584)"',
    "@@ tools",
    "certutil C:\\WINDOWS\\system32\\certutil.exe",
    "@@ windows-policy",
    ...(opts.policy ?? []),
    "policy-read=1",
    "@@ windows-disallowed",
    ...(opts.disallowed ?? []),
    "@@ verify",
    ...COMPROMISED_CERTS.map((c) =>
      `${c.sha256.slice(0, 16)} ${opts.verify(c)}`
    ),
    "@@ stores",
    "@@ runtimes",
    ...(opts.runtimes ?? []),
    "@@ agents",
    "@@ electron",
    "@@ processes",
    "@@ live",
    "@@ end",
    "",
  ].join("\r\n");
}

Deno.test("psQuote doubles single quotes, typographic ones too", () => {
  assertEquals(psQuote("C:\\it's"), "'C:\\it''s'");
  assertEquals(psQuote("a\u2019b"), "'a\u2019\u2019b'");
  assertEquals(psQuote("$(Remove-Item x)"), "'$(Remove-Item x)'");
});

Deno.test("assertSafeWindowsPaths accepts drive and UNC paths only", () => {
  assertSafeWindowsPaths(["C:\\srv", "d:/apps", "\\\\fs01\\share\\py"]);
  for (const bad of ["srv", "/srv", "C:", "\\\\fs01", "C:\\a\nb", "-Recurse"]) {
    assertThrows(() => assertSafeWindowsPaths([bad]), Error, "searchPaths");
  }
});

Deno.test("Windows probe: placeholders filled, hostile search path stays a literal", () => {
  const script = buildWindowsProbe({
    searchPaths: ["C:\\it's $(evil)"],
    liveCheck: true,
  });
  for (
    const p of [
      "MAX_BYTES",
      "CERT_LIST",
      "CROSS_B64",
      "NO_TRUST",
      "SEARCH_PATHS",
      "LIVE_CHECK",
    ]
  ) {
    assert(!script.includes(p), p);
  }
  assertStringIncludes(script, "'C:\\it''s $(evil)'");
  assertEquals((script.match(/@\('[0-9A-F]{16}', '/g) ?? []).length, 16);
  assertStringIncludes(script, "RevocationMode = 'NoCheck'");
  assertStringIncludes(script, "--noproxy '*'");
  // Read-only: nothing writes a file, a store or the registry.
  assert(
    !/Set-Item|New-Item|Remove-Item|Out-File|Set-Content|Add-Content|\.Add\(\$cert\)|ReadWrite|Import-Certificate|certutil[^\n]*-addstore/
      .test(script),
  );
  assert(
    !buildWindowsProbe({ searchPaths: [], liveCheck: false }).includes(
      "curl.exe' -CommandType Application | Select-Object -First 1; if ($c) { $o",
    ),
  );
});

Deno.test("launcher: encoded command decodes, and a script holding the end marker is refused", () => {
  const encoded = POWERSHELL_ARGV[POWERSHELL_ARGV.length - 1];
  const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  const text = new TextDecoder("utf-16le").decode(bytes);
  assertStringIncludes(text, POWERSHELL_END);
  assertStringIncludes(text, "Invoke-Expression");
  assertEquals(encodePowerShell("A"), btoa("A\0"));
  assert(launcherInput("Say 1").endsWith(`\n${POWERSHELL_END}\n`));
  assertThrows(() => launcherInput(`x\n  ${POWERSHELL_END}\ny`));
  // The real probe never contains it.
  launcherInput(buildWindowsProbe({ searchPaths: [], liveCheck: true }));
});

Deno.test("Windows: Microsoft's block reads as not-trusted via CryptoAPI", async () => {
  const probe = parseProbe(winProbe({ verify: () => "rejected distrusted" }));
  const s = assessHost(probe, "vm", NOW, await analyzeStores(probe));
  assertEquals(s.os.storeFamily, "windows");
  assertEquals(s.osStore.verdict, "not-trusted");
  assertEquals(s.osStore.verdictMethod, "cryptoapi");
  assertEquals(s.osStore.codeSigningTrusted, "not-trusted");
  assertEquals(s.osStore.windows, {
    disallowed: [],
    rootAutoUpdate: "enabled",
    disallowedAutoUpdate: "enabled",
  });
  assertEquals(s.unreadable, []);
  assertEquals(s.riskLevel, "none");
});

Deno.test("Windows: chains that build are trusted, with the root in the detail", () => {
  const probe = parseProbe(
    winProbe({
      verify: (c) =>
        c.path === "aaa"
          ? "OK AAA Certificate Services"
          : "rejected UntrustedRoot,PartialChain",
      policy: ["DisableRootAutoUpdate=1", "EnableDisallowedCertAutoUpdate=0"],
      disallowed: [`LocalMachine|${COMPROMISED_CERTS[0].sha256}`],
    }),
  );
  const s = assessHost(probe, "old", NOW);
  assertEquals(s.osStore.verdict, "trusted");
  assertEquals(s.osStore.trustedPaths, ["aaa"]);
  assertEquals(s.riskLevel, "critical");
  assertEquals(s.osStore.windows, {
    disallowed: ["EM DV TLS CA - G3B"],
    rootAutoUpdate: "disabled",
    disallowedAutoUpdate: "disabled",
  });
  assert(s.recommendations.some((r) => r.includes("Microsoft blocked")));
  assertEquals(
    s.osStore.certificates.find((c) => c.path === "aaa")?.detail,
    "OK AAA Certificate Services",
  );
});

Deno.test("Windows: a chain error is not a rejection", () => {
  const s = assessHost(
    parseProbe(
      winProbe({ verify: () => "error Cannot find the requested object." }),
    ),
    "w",
    NOW,
  );
  assertEquals(s.osStore.verdict, "unknown");
});

Deno.test("windowsState: unreadable policy is unknown", () => {
  const probe = parseProbe(
    winProbe({ verify: () => "OK" }).replace("policy-read=1\r\n", ""),
  );
  assertEquals(windowsState(probe).rootAutoUpdate, "unknown");
  assertEquals(probe.admin, false);
  assertEquals(
    parseProbe(winProbe({ verify: () => "OK", admin: true })).admin,
    true,
  );
});

Deno.test("Windows mitigation: one elevated step adds only the trusted copies to Disallowed", () => {
  const probe = parseProbe(
    winProbe({
      verify: (c) =>
        c.path === "aaa"
          ? "OK AAA Certificate Services"
          : "rejected distrusted",
      policy: ["DisableRootAutoUpdate=1"],
    }),
  );
  const status = assessHost(probe, "old", NOW);
  const plan = planMitigation(status, probe, { transport: "ssh" });
  assertEquals(plan.action, "apply");
  assertEquals(plan.upgrade, []);
  assertEquals(plan.distrust.length, 1);
  const step = plan.distrust[0];
  assert(step.kind === "ps");
  assertEquals((step.script.match(/\$s\.Add\(/g) ?? []).length, 8);
  assertStringIncludes(step.script, "X509Store('Disallowed', 'LocalMachine')");
  assert(!step.script.includes("'Root'"), "never touches a root store");
  assertEquals(plan.privilegedCommands, []);
  assert(
    plan.manual.some((m) =>
      m.includes("Turn off Automatic Root Certificates Update")
    ),
  );
  const ps1 = renderWindowsMitigationScript("old", plan);
  assert(ps1.startsWith("#Requires -RunAsAdministrator"));
  assertStringIncludes(ps1, step.script.split("\n")[1]);
  assertEquals(
    renderStep(step, { sudo: true, installPath: "install", brief: true }),
    "PowerShell: add 8 certificate(s) to LocalMachine\\Disallowed",
  );
});

Deno.test("Windows mitigation: a blocked host plans nothing", () => {
  const probe = parseProbe(winProbe({ verify: () => "rejected distrusted" }));
  const plan = planMitigation(assessHost(probe, "w", NOW), probe, {
    transport: "local",
  });
  assertEquals(plan.action, "none");
});

Deno.test("disallowScript is idempotent PowerShell with inline certificates", () => {
  const s = disallowScript([COMPROMISED_CERTS[0]]);
  assertStringIncludes(s, "$s.Open('ReadWrite')");
  assertStringIncludes(s, "finally { $s.Close() }");
  assert(!/Remove|Import-Certificate|\.cer|\.pem/.test(s));
});

Deno.test("Windows probe: a search path naming a placeholder stays a literal", () => {
  const script = buildWindowsProbe({
    searchPaths: ["C:\\@@LIVE_CHECK@@", "C:\\LIVE_CHECK"],
    liveCheck: true,
  });
  assertStringIncludes(script, "@('C:\\@@LIVE_CHECK@@', 'C:\\LIVE_CHECK')");
  // The live check itself is filled once, where it belongs.
  assertEquals((script.match(/--noproxy '\*'/g) ?? []).length, 2);
});

Deno.test("launcherInput refuses the end marker in any case", () => {
  assertThrows(() => launcherInput("x\n# EMUDHRA-PROBE-END\ny"));
});

Deno.test("Windows probe: searchPaths lockfiles are reported as not checked", () => {
  const script = buildWindowsProbe({
    searchPaths: ["C:\\srv"],
    liveCheck: false,
  });
  assertStringIncludes(script, "Section 'notices'");
  const probe = parseProbe(
    winProbe({ verify: () => "rejected distrusted" }).replace(
      "@@ end",
      "@@ notices\r\nCargo.lock, mix.lock and rebar.lock under searchPaths are not checked on Windows targets\r\n@@ end",
    ),
  );
  assert(
    assessHost(probe, "w", NOW).unreadable.some((u) =>
      u.includes("Cargo.lock")
    ),
  );
});

Deno.test("Windows probe: a chain with no root found is an error, not a rejection", () => {
  const script = buildWindowsProbe({ searchPaths: [], liveCheck: false });
  assertStringIncludes(script, "@('UntrustedRoot', 'PartialChain', 'Cyclic')");
  assertStringIncludes(script, "' error root not available ('");
  const s = assessHost(
    parseProbe(
      winProbe({ verify: () => "error root not available (PartialChain)" }),
    ),
    "offline",
    NOW,
  );
  assertEquals(s.osStore.verdict, "unknown");
});
