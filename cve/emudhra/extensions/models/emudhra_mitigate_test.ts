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
 * The mitigate method end to end, with every script answered by a fake
 * target through testHooks: what runs, in what order, and what is recorded.
 */

import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  type CommandResult,
  model,
  type Script,
  testHooks,
  type Transport,
} from "./emudhra_detect.ts";
import { COMPROMISED_CERTS, DISTRUST_ANCHOR } from "./_lib/emudhra_certs.ts";

type Verdicts = (c: (typeof COMPROMISED_CERTS)[number]) => string;

/** sh probe output for a Debian 12 host. */
function linuxProbe(verdict: Verdicts, uid = 1000): string {
  return [
    "@@ id",
    `uid=${uid}`,
    "host=deb-1",
    "@@ os-release",
    'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"',
    "ID=debian",
    'VERSION_ID="12"',
    "@@ tools",
    "apt-get /usr/bin/apt-get",
    "install /usr/bin/install",
    "update-ca-certificates /usr/sbin/update-ca-certificates",
    "sudo /usr/bin/sudo",
    "openssl /usr/bin/openssl",
    "@@ packages",
    "ca-certificates 20230311+deb12u1",
    "@@ bundle",
    "/etc/ssl/certs/ca-certificates.crt",
    "@@ anchor",
    "@@ ca-certificates-conf",
    DISTRUST_ANCHOR.debianConfEntry,
    "@@ verify",
    ...COMPROMISED_CERTS.filter((c) =>
      !(c.path === "emsign" && c.usage === "code-signing")
    ).map((c) => `${c.sha256.slice(0, 16)} ${verdict(c)}`),
    "@@ stores",
    "@@ runtimes",
    "@@ agents",
    "@@ electron",
    "@@ processes",
    "@@ live",
    "@@ end",
    "",
  ].join("\n");
}

/** PowerShell probe output for a Windows host. */
function windowsProbe(verdict: Verdicts, admin: boolean): string {
  return [
    "@@ id",
    "host=WIN-1",
    `admin=${admin ? 1 : 0}`,
    "@@ os-release",
    "ID=windows",
    "VERSION_ID=19045.1",
    'PRETTY_NAME="Windows 10 Pro 22H2"',
    "@@ windows-policy",
    "policy-read=1",
    "@@ windows-disallowed",
    "@@ verify",
    ...COMPROMISED_CERTS.map((c) => `${c.sha256.slice(0, 16)} ${verdict(c)}`),
    "@@ stores",
    "@@ end",
    "",
  ].join("\r\n");
}

/** macOS output: the sh probe's shape with security verify-cert lines. */
function macProbe(verdict: Verdicts): string {
  return [
    "@@ id",
    "uid=501",
    "host=mac-1",
    "@@ os-release",
    "ID=macos",
    "VERSION_ID=15.7",
    "@@ tools",
    "sudo /usr/bin/sudo",
    "@@ macos-trust",
    "@@ verify",
    ...COMPROMISED_CERTS.map((c) => `${c.sha256.slice(0, 16)} ${verdict(c)}`),
    "@@ stores",
    "@@ end",
    "",
  ].join("\n");
}

const OK: CommandResult = { stdout: "", stderr: "", exitCode: 0 };

/**
 * Run mitigate against a fake target. `probes` answers each probe in turn
 * (the last one repeats); `answer` handles every other script.
 */
async function mitigate(opts: {
  globals: Record<string, unknown>;
  dryRun: boolean;
  probes: string[];
  answer?: (s: Script) => CommandResult | undefined;
  hosts?: string;
  method?: "mitigate" | "scanFleet";
}) {
  const ran: Script[] = [];
  const transports: Transport[] = [];
  const files: Record<string, string> = {};
  const resources: Record<string, Record<string, unknown>> = {};
  let probe = 0;
  testHooks.runScript = (t, s) => {
    ran.push(s);
    transports.push(t);
    if (/@@ os-release|Section 'os-release'/.test(s.text)) {
      const out = opts.probes[Math.min(probe++, opts.probes.length - 1)];
      return Promise.resolve({ stdout: out, stderr: "", exitCode: 0 });
    }
    return Promise.resolve(opts.answer?.(s) ?? OK);
  };
  try {
    const context = {
      globalArgs: model.globalArguments.parse(opts.globals),
      logger: { info: () => {}, debug: () => {} },
      createFileWriter: (_spec: string, label: string) => {
        files[label] = "";
        return {
          writeLine: (l: string) => {
            files[label] += l;
            return Promise.resolve();
          },
          writeText: (t: string) => {
            files[label] += t;
            return Promise.resolve({ file: label });
          },
          finalize: () => Promise.resolve({ file: label }),
        };
      },
      writeResource: (_spec: string, name: string, data: unknown) => {
        resources[name] = data as Record<string, unknown>;
        return Promise.resolve({ resource: name });
      },
    };
    if (opts.method === "scanFleet") {
      await model.methods.scanFleet.execute({ hosts: opts.hosts! }, context);
    } else {
      await model.methods.mitigate.execute(
        {
          dryRun: opts.dryRun,
          ...(opts.hosts !== undefined ? { hosts: opts.hosts } : {}),
        },
        context,
      );
    }
  } finally {
    testHooks.runScript = undefined;
  }
  const [status] = Object.values(resources);
  return {
    ran,
    files,
    mitigation: status?.mitigation as Record<string, unknown>,
    status,
    resources,
    transports,
  };
}

/** Answers for a Debian host whose user has passwordless sudo for everything. */
function sudoAllowed(s: Script): CommandResult | undefined {
  if (s.text.includes("@@ conf")) {
    return {
      stdout: `@@ conf\n${DISTRUST_ANCHOR.debianConfEntry}\n@@ ok\n`,
      stderr: "",
      exitCode: 0,
    };
  }
  if (s.text.includes("sudo -n -l ")) {
    const n = (s.text.match(/sudo -n -l /g) ?? []).length;
    return {
      stdout: [
        ...Array.from({ length: n }, (_, i) => `${i}|0`),
        "@@ sudo-ll",
        "Sudoers entry: /etc/sudoers.d/emudhra",
        "    RunAsUsers: root",
        "    Options: !authenticate",
        "    Commands:",
        "\tALL",
      ].join("\n"),
      stderr: "",
      exitCode: 0,
    };
  }
  return undefined;
}

const emsignTrusted: Verdicts = (c) => c.path === "emsign" ? "OK" : "error 20";
const allRejected: Verdicts = () => "error 20";

Deno.test({
  name: "mitigate, Linux with sudo: upgrade, re-plan, distrust, rescan clean",
  fn: async () => {
    const r = await mitigate({
      globals: { targetHost: "deb-1", sshUser: "ops", targetOs: "linux" },
      dryRun: false,
      // Before; still trusted after the upgrade; clean after the distrust.
      probes: [
        linuxProbe(emsignTrusted),
        linuxProbe(emsignTrusted),
        linuxProbe(allRejected),
      ],
      answer: sudoAllowed,
    });
    const steps = r.ran.filter((s) =>
      !/@@ os-release|@@ conf|sudo -n -l /.test(s.text)
    ).map((s) => s.text.split("\n").find((l) => l.includes("sudo -n --")));
    assertEquals(steps.length, 4);
    assertStringIncludes(steps[0]!, "apt-get' 'update'");
    assertStringIncludes(steps[1]!, "'--only-upgrade'");
    assertStringIncludes(steps[2]!, "'/usr/bin/install' -m 0644");
    assertStringIncludes(steps[3]!, "update-ca-certificates");
    assertEquals(r.mitigation.privilege, "sudo");
    assertEquals(r.mitigation.applied, true);
    assertEquals(r.mitigation.succeeded, true);
    assertStringIncludes(r.mitigation.summary as string, "Mitigated deb-1");
    assertEquals(
      (r.status.osStore as Record<string, unknown>).verdict,
      "not-trusted",
    );
    assert("deb-1-mitigation-script" in r.files);
    assert("mitigate-summary" in r.files);
  },
});

Deno.test("mitigate, Linux without sudo: needs-privilege, nothing runs, script saved", async () => {
  const r = await mitigate({
    globals: { targetHost: "deb-1", sshUser: "ops", targetOs: "linux" },
    dryRun: false,
    probes: [linuxProbe(emsignTrusted)],
    answer: (s) =>
      s.text.includes("sudo -n -l ")
        ? {
          stdout: [
            ...Array.from(
              { length: (s.text.match(/sudo -n -l /g) ?? []).length },
              (_, i) => `${i}|1`,
            ),
            "@@ sudo-ll",
          ].join("\n"),
          stderr: "",
          exitCode: 0,
        }
        : sudoAllowed(s),
  });
  assertEquals(r.mitigation.action, "needs-privilege");
  assertEquals(r.mitigation.applied, false);
  assert(!r.ran.some((s) => s.text.includes("sudo -n -- ")));
  assertStringIncludes(r.files["deb-1-mitigation-script"], "#!/bin/sh");
});

Deno.test("mitigate, Windows administrator: one PowerShell step, then a clean rescan", async () => {
  const r = await mitigate({
    globals: { targetHost: "win-1", sshUser: "admin", targetOs: "windows" },
    dryRun: false,
    probes: [
      windowsProbe(
        (c) =>
          c.path === "aaa"
            ? "OK AAA Certificate Services"
            : "rejected distrusted",
        true,
      ),
      windowsProbe(() => "rejected distrusted", true),
    ],
  });
  const steps = r.ran.filter((s) => !s.text.includes("Section 'os-release'"));
  assertEquals(steps.length, 1);
  assertEquals(steps[0].shell, "powershell");
  assertStringIncludes(
    steps[0].text,
    "X509Store('Disallowed', 'LocalMachine')",
  );
  assertEquals(r.mitigation.privilege, "admin");
  assertEquals(r.mitigation.succeeded, true);
  assertStringIncludes(
    r.files["win-1-mitigation-script"],
    "#Requires -RunAsAdministrator",
  );
});

Deno.test("mitigate, Windows standard user: needs-privilege with a .ps1, nothing runs", async () => {
  const r = await mitigate({
    globals: { targetHost: "win-1", sshUser: "user", targetOs: "windows" },
    dryRun: false,
    probes: [windowsProbe(() => "OK AAA Certificate Services", false)],
  });
  assertEquals(r.mitigation.action, "needs-privilege");
  assertEquals(r.ran.length, 1, "only the probe ran");
  assertStringIncludes(r.mitigation.summary as string, "elevated PowerShell");
  assertStringIncludes(r.files["win-1-mitigation-script"], "LocalMachine");
});

Deno.test("mitigate, macOS: manual, with a deny-trust script and nothing run remotely", async () => {
  const r = await mitigate({
    globals: { targetHost: "mac-1", sshUser: "me", targetOs: "macos" },
    dryRun: false,
    probes: [
      macProbe((c) =>
        c.usage === "code-signing" && c.path === "aaa"
          ? "OK"
          : "rejected revoked"
      ),
    ],
  });
  // The TLS verdict is clean, but the code-signing cross-signs still verify
  // (as on macOS 27), so the deny script covers those two copies.
  assertEquals(r.mitigation.action, "manual");
  assertEquals(
    (r.files["mac-1-mitigation-script"].match(/add-trusted-cert/g) ?? [])
      .length,
    2,
  );
  const r2 = await mitigate({
    globals: { targetHost: "mac-1", sshUser: "me", targetOs: "macos" },
    dryRun: false,
    probes: [macProbe(() => "OK")],
  });
  assertEquals(r2.mitigation.action, "manual");
  assertEquals(r2.ran.length, 1, "only the probe ran");
  assertStringIncludes(
    r2.files["mac-1-mitigation-script"],
    "security add-trusted-cert -d -r deny",
  );
});

Deno.test("mitigate, Windows administrator: trusted code-signing copies alone are distrusted", async () => {
  const r = await mitigate({
    globals: { targetHost: "win-1", sshUser: "admin", targetOs: "windows" },
    dryRun: false,
    probes: [
      windowsProbe(
        (c) =>
          c.usage === "code-signing" && c.path === "aaa"
            ? "OK AAA Certificate Services"
            : "rejected distrusted",
        true,
      ),
      windowsProbe(() => "rejected distrusted", true),
    ],
  });
  const steps = r.ran.filter((s) => !s.text.includes("Section 'os-release'"));
  assertEquals(steps.length, 1);
  assertEquals((steps[0].text.match(/\$s\.Add\(/g) ?? []).length, 2);
  assertEquals(r.mitigation.succeeded, true);
  assertStringIncludes(
    r.mitigation.summary as string,
    "code signing trusted -> not-trusted",
  );
});

// --- hosts entries: plain hosts behave as they always have ---

/** The distinct ssh argv each target was reached with. */
const sshArgs = (transports: Transport[]) => [
  ...new Set(
    transports.map((t) => t.kind === "ssh" ? t.args.join(" ") : t.kind),
  ),
];

for (const method of ["scanFleet", "mitigate"] as const) {
  Deno.test(`${method}: plain hosts connect as sshUser and write data named by the host`, async () => {
    const r = await mitigate({
      globals: { sshUser: "ops", sshKey: "/keys/id", targetOs: "linux" },
      dryRun: true,
      probes: [linuxProbe(allRejected)],
      answer: sudoAllowed,
      hosts: "10.0.0.5, fe80::1",
      method,
    });
    const strict = method === "mitigate" ? "yes" : "accept-new";
    const opts =
      `-o BatchMode=yes -o StrictHostKeyChecking=${strict} -o ConnectTimeout=10 -o ServerAliveInterval=15 -o ServerAliveCountMax=4 -i /keys/id --`;
    assertEquals(sshArgs(r.transports).sort(), [
      `${opts} ops@10.0.0.5`,
      `${opts} ops@fe80::1`,
    ]);
    assertEquals(Object.keys(r.resources).sort(), ["10.0.0.5", "fe80-1"]);
    assertEquals(r.resources["10.0.0.5"].target, "10.0.0.5");
    assertEquals("sshUser" in r.resources["10.0.0.5"], false);
  });
}

// --- hosts entries: user@host logs in to that host as user ---

for (const method of ["scanFleet", "mitigate"] as const) {
  Deno.test(`${method}: a user@host entry logs in as its user, and its status says so`, async () => {
    const r = await mitigate({
      globals: { sshUser: "ops", targetOs: "linux" },
      dryRun: true,
      probes: [linuxProbe(allRejected)],
      answer: sudoAllowed,
      hosts: "admin@10.0.0.5,10.0.0.6",
      method,
    });
    const targets = sshArgs(r.transports).map((a) => a.split(" ").pop());
    assertEquals(targets.sort(), ["admin@10.0.0.5", "ops@10.0.0.6"]);
    assertEquals(Object.keys(r.resources).sort(), ["10.0.0.5", "10.0.0.6"]);
    assertEquals(r.resources["10.0.0.5"].target, "10.0.0.5");
    assertEquals(r.resources["10.0.0.5"].sshUser, "admin");
    assertEquals("sshUser" in r.resources["10.0.0.6"], false);
    assert(
      model.resources.status.schema.safeParse(r.resources["10.0.0.5"]).success,
    );
  });
}
