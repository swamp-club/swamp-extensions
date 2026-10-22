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
} from "jsr:@std/assert@1.0.19";
import { report } from "./emudhra_scan_report.ts";

function host(overrides: Record<string, unknown> = {}) {
  return {
    target: "10.0.0.5",
    hostname: "web-1",
    dataAsOf: "2026-10-21",
    os: {
      prettyName: "Debian GNU/Linux 12 (bookworm)",
      id: "debian",
      versionId: "12",
    },
    exposed: true,
    riskLevel: "critical",
    summary: "web-1 is critical-risk",
    osStore: {
      verdict: "trusted",
      trustedPaths: ["emsign", "aaa"],
      verdictMethod: "openssl-verify",
      caCertificates: {
        installed: "20230311+deb12u1",
        fixedIn: "20250419~deb12u2",
        patched: "exposed",
      },
    },
    components: [{
      kind: "runtime",
      name: "deno",
      path: "/usr/local/bin/deno",
      version: "2.9.7",
      status: "no-fix-released",
      note: "",
    }],
    liveCheck: [{
      verifier: "curl",
      path: "emsign",
      host: "dv-g3b-emudhra",
      result: "accepted",
    }],
    unreadable: [],
    recommendations: [
      "Upgrade ca-certificates to 20250419~deb12u2 or later (run mitigate).",
    ],
    ...overrides,
  };
}

function context(
  methodName: string,
  results: unknown[],
  modelType = "@swamp/cve/emudhra",
  name?: string,
) {
  return {
    modelType,
    definition: name ? { name } : undefined,
    modelId: "m1",
    methodName,
    dataHandles: results.map((_, i) => ({
      specName: "status",
      name: `h${i}`,
      version: "1",
    })),
    dataRepository: {
      getContent: (_t: string, _m: string, name: string) =>
        Promise.resolve(
          new TextEncoder().encode(
            JSON.stringify(results[parseInt(name.slice(1), 10)]),
          ),
        ),
    },
  };
}

const mitigation = {
  dryRun: false,
  action: "needs-privilege",
  applied: false,
  succeeded: false,
  privilege: "none",
  missingPrivilege: ["/usr/bin/install", "/usr/sbin/update-ca-certificates"],
  steps: [{
    why: "refresh package lists",
    command: "sudo -n -- '/usr/bin/apt-get' 'update' '-q'",
  }],
  before: { verdict: "trusted", riskLevel: "critical" },
  manual: [],
  restart: [],
  notes: [],
  summary: "Needs privilege",
};

Deno.test("ignores other model types", async () => {
  const out = await report.execute(context("scan", [host()], "@swamp/other"));
  assertEquals(out.markdown, "");
});

Deno.test("scan report: table, recommendations and next step", async () => {
  const clean = host({
    target: "10.0.0.6",
    hostname: "web-2",
    exposed: false,
    riskLevel: "none",
    osStore: { ...host().osStore, verdict: "not-trusted", trustedPaths: [] },
    components: [],
    liveCheck: [],
    recommendations: [],
  });
  const out = await report.execute(context("scanFleet", [host(), clean]));
  assertStringIncludes(
    out.markdown,
    "**2** target(s) scanned: **1** exposed, **1** clean",
  );
  assertStringIncludes(out.markdown, "TRUSTS (emsign, aaa path)");
  assertStringIncludes(out.markdown, "deno 2.9.7");
  // One version at two paths (a shim and its install) is listed once.
  const shim = await report.execute(context("scan", [
    host({
      components: [
        ...host().components,
        {
          ...host().components[0],
          path: "/home/u/.local/share/mise/shims/deno",
        },
      ],
    }),
  ]));
  assertStringIncludes(shim.markdown, "| deno 2.9.7 |");
  assertStringIncludes(out.markdown, "curl emsign: accepted");
  assertStringIncludes(out.markdown, "mitigate --input hosts=10.0.0.5\n");
  const unjudged = await report.execute(
    context("scanFleet", [
      clean,
      { ...clean, target: "10.0.0.7", riskLevel: "low" },
    ]),
  );
  assertStringIncludes(
    unjudged.markdown,
    "**0** exposed, **1** clean, **1** not fully checked",
  );
  const image = await report.execute(
    context("scan", [{ ...host(), target: "image-alpine-3.22" }]),
  );
  assert(!image.markdown.includes("--input hosts=image-"));
  assertEquals((out.json as { exposed: boolean }[]).map((r) => r.exposed), [
    true,
    false,
  ]);
});

Deno.test("mitigate report: needs-privilege names the binaries and the script", async () => {
  const out = await report.execute(context("mitigate", [host({ mitigation })]));
  assertStringIncludes(out.markdown, "# eMudhra Mitigation: NOTHING APPLIED");
  assertStringIncludes(
    out.markdown,
    "NEEDS PRIVILEGE (/usr/bin/install, /usr/sbin/update-ca-certificates)",
  );
  assertStringIncludes(out.markdown, "`mitigationScript`");
  assertStringIncludes(out.markdown, "sudo -n -- '/usr/bin/apt-get'");
});

Deno.test("mitigate report: dry run and applied titles and follow-up command", async () => {
  const dry = await report.execute(context("mitigate", [
    host({
      mitigation: {
        ...mitigation,
        dryRun: true,
        action: "apply",
        missingPrivilege: [],
      },
    }),
  ]));
  assertStringIncludes(dry.markdown, "# eMudhra Mitigation: DRY RUN");
  assertStringIncludes(dry.markdown, "--input dryRun=false");
  // A manual-only dry run has nothing to apply, so it points at a rescan.
  const manual = await report.execute(context("mitigate", [
    host({
      mitigation: {
        ...mitigation,
        dryRun: true,
        action: "manual",
        missingPrivilege: [],
      },
    }),
  ]));
  assert(!manual.markdown.includes("dryRun=false"));
  assertStringIncludes(manual.markdown, "Verify with:");

  const applied = await report.execute(context("mitigate", [
    host({
      osStore: { ...host().osStore, verdict: "not-trusted" },
      mitigation: {
        ...mitigation,
        action: "apply",
        applied: true,
        succeeded: true,
        privilege: "sudo",
      },
    }),
  ]));
  assertStringIncludes(applied.markdown, "# eMudhra Mitigation: APPLIED");
  assertStringIncludes(applied.markdown, "| FIXED |");
  assert(applied.markdown.includes("scanFleet --input hosts=10.0.0.5"));
});

Deno.test("suggested commands use the model's own name", async () => {
  const out = await report.execute(
    context("scan", [host()], "@swamp/cve/emudhra", "image-scan"),
  );
  assertStringIncludes(
    out.markdown,
    "swamp model method run image-scan mitigate",
  );
  assert(!out.markdown.includes("emudhra-scanner"));
});
