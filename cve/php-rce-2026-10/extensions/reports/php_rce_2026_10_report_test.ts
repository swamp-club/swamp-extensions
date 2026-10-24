import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./php_rce_2026_10_report.ts";
import { analyze, parseProbe, type Status } from "../models/php_rce_2026_10.ts";

// Statuses come from the model's own analyze() so the report and the
// resource schema cannot drift apart.

function status(target: string, lines: string[], inContainer = false): Status {
  return analyze(parseProbe([...lines, "END|1"].join("\n")), target, {
    inContainer,
    timestamp: "2026-10-21T16:00:00.000Z",
  });
}

const BOOKWORM = [
  "HOSTNAME|web-01",
  "UID|0",
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "BIN|/usr/sbin/php-fpm8.2|php8.2-fpm|PHP 8.2.34 (fpm-fcgi)",
  "PKG|dpkg|php8.2-fpm|8.2.34-1~deb12u1|install ok installed",
  "LISTEN|LISTEN 0 511 0.0.0.0:80 0.0.0.0:*",
  "PROC|nginx",
  "HANDOFF|/etc/nginx/sites-enabled/default",
];

const UPGRADABLE = [
  ...BOOKWORM,
  "PENDING|apt|php8.2-fpm/bookworm-security 8.2.35-1~deb12u1 amd64 [upgradable from: 8.2.34-1~deb12u1]",
];

// A distro build with no tracker entry: the vendor's to confirm.
const RHEL = [
  "HOSTNAME|app-02",
  "UID|0",
  "OS|ID=rhel",
  "OS|VERSION_ID=9.6",
  "BIN|/usr/sbin/php-fpm|php-fpm|PHP 8.2.30 (fpm-fcgi)",
  "PKG|rpm|php-fpm|8.2.30-1.el9|installed",
  "LISTEN|LISTEN 0 511 0.0.0.0:80 0.0.0.0:*",
  "PROC|nginx",
  "HANDOFF|/etc/nginx/conf.d/default.conf",
];

const PATCHED = [
  "HOSTNAME|web-02",
  "UID|0",
  "BIN|/usr/local/bin/php||PHP 8.4.27 (cli)",
];

const NO_PHP = ["HOSTNAME|db-01", "UID|0"];

function makeContext(
  methodName: string,
  results: unknown[],
  modelType = "@swamp/cve/php-rce-2026-10",
  definitionName?: string,
) {
  const encoded = results.map((r) =>
    new TextEncoder().encode(JSON.stringify(r))
  );
  return {
    modelType,
    modelId: "php-rce-scanner",
    methodName,
    definition: definitionName ? { name: definitionName } : undefined,
    dataHandles: results.map((_, i) => ({
      specName: "status",
      name: `result-${i}`,
      version: "1",
    })),
    dataRepository: {
      getContent: (_t: string, _m: string, dataName: string, _v: string) =>
        Promise.resolve(encoded[parseInt(dataName.split("-")[1])] ?? null),
    },
  };
}

Deno.test("report export has expected shape", () => {
  assertEquals(report.name, "@swamp/cve/php-rce-2026-10-report");
  assertEquals(report.scope, "method");
  assert(report.labels.includes("security"));
});

Deno.test("report returns empty for another model type", async () => {
  const r = await report.execute(
    makeContext("scan", [status("web-01", BOOKWORM)], "@swamp/cve/dirtyfrag"),
  );
  assertEquals(r.markdown, "");
});

Deno.test("report returns empty without status handles", async () => {
  const ctx = makeContext("scan", []);
  const r = await report.execute(ctx);
  assertEquals(r.markdown, "");
});

Deno.test("scan report: counts and fleet table", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("10.0.1.50", UPGRADABLE),
    status("10.0.1.51", RHEL),
    status("10.0.1.52", PATCHED),
    status("10.0.1.53", NO_PHP),
  ]));
  assertStringIncludes(
    r.markdown,
    "**4** host(s) scanned: **1** affected, **1** to check with the vendor, **2** patched or without PHP",
  );
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.50 | 8.2.34 | fpm | update-available | yes | CRITICAL | upgrade |",
  );
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.51 | 8.2.30 | fpm | check-vendor | yes | HIGH | check-vendor |",
  );
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.52 | 8.4.27 | cli | patched | no | NONE | none |",
  );
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.53 | — | — | no PHP | no | NONE | none |",
  );
  assertStringIncludes(
    r.markdown,
    "No indicators of compromise have been published",
  );
});

Deno.test("scan report: lists installs needing attention, not patched ones", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("10.0.1.50", UPGRADABLE),
    status("10.0.1.52", PATCHED),
  ]));
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.50 | /usr/sbin/php-fpm8.2 | fpm | 8.2.34 | php8.2-fpm 8.2.34-1~deb12u1 | update-available | upgrade |",
  );
  assert(!r.markdown.includes("| 10.0.1.52 | /usr/local/bin/php"));
});

Deno.test("scan report: next step targets remote hosts that need action", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("10.0.1.50", UPGRADABLE),
    status("10.0.1.51", BOOKWORM),
    status("10.0.1.52", PATCHED),
  ]));
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner mitigate --input hosts=10.0.1.50,10.0.1.51\n",
  );
});

Deno.test("scan report: next step omits hosts for localhost", async () => {
  const r = await report.execute(
    makeContext("scan", [status("localhost", UPGRADABLE)]),
  );
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner mitigate\n",
  );
});

Deno.test("scan report: no next step for containers or clean hosts", async () => {
  const container = status("php:8.2.34-apache", [
    "HOSTNAME|c",
    "UID|0",
    "INCONTAINER|1",
    "BIN|/usr/local/bin/php||PHP 8.2.34 (cli)",
  ], true);
  const r = await report.execute(
    makeContext("scan", [container, status("10.0.1.52", PATCHED)]),
  );
  assert(!r.markdown.includes("## Next Step"));
  assertStringIncludes(r.markdown, "rebuild-image");
});

Deno.test("scan report: deduplicates recommendations", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("10.0.1.52", NO_PHP),
    status("10.0.1.53", NO_PHP),
  ]));
  assertEquals(
    r.markdown.split("No PHP installation found — no action required.").length,
    2,
  );
});

Deno.test("scan report: unreachable hosts show as ERROR", async () => {
  const err = {
    ...status("10.0.1.99", NO_PHP),
    error: "Cannot execute commands on 10.0.1.99: timed out",
    riskLevel: "unknown",
    action: "unreachable",
  };
  const r = await report.execute(makeContext("scanFleet", [err]));
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.99 | — | — | ERROR | no | UNKNOWN | unreachable |",
  );
  assertStringIncludes(r.markdown, "**1** unreachable");
});

function withMitigation(
  s: Status,
  m: Partial<NonNullable<Status["mitigation"]>>,
): Status {
  return {
    ...s,
    mitigation: {
      dryRun: true,
      applyConfigMitigations: false,
      postMaxSize: "32M",
      privilege: "sudo",
      missingPrivileges: [],
      outcome: "dry-run",
      steps: [],
      notes: [],
      ...m,
    },
  };
}

Deno.test("mitigate dry run report: header, commands and apply command", async () => {
  const s = withMitigation(status("10.0.1.50", UPGRADABLE), {
    steps: [{
      phase: "upgrade",
      command: "sudo -n -- /usr/bin/apt-get update",
      privileged: true,
      purpose: "Refresh package lists",
      status: "planned",
      exitCode: null,
      output: "",
    }],
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(r.markdown, "# PHP RCE Mitigation: DRY RUN");
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.50 | dry-run | sudo | CRITICAL | upgrade |",
  );
  assertStringIncludes(r.markdown, "sudo -n -- /usr/bin/apt-get update\n");
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner mitigate --input hosts=10.0.1.50 --input dryRun=false",
  );
});

Deno.test("mitigate report: needs-privilege points at the sudoers example", async () => {
  const s = withMitigation(status("10.0.1.51", BOOKWORM), {
    outcome: "needs-privilege",
    privilege: "unavailable",
    missingPrivileges: ["sudo -n -- /usr/bin/apt-get update"],
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(
    r.markdown,
    "| 10.0.1.51 | needs-privilege | unavailable |",
  );
  assertStringIncludes(r.markdown, "sudoers example");
});

Deno.test("mitigate applied report: step status and verify command", async () => {
  const s = withMitigation(status("10.0.1.52", PATCHED), {
    dryRun: false,
    outcome: "applied",
    privilege: "root",
    steps: [{
      phase: "restart",
      command: "/usr/bin/systemctl restart php8.2-fpm.service",
      privileged: true,
      purpose: "Restart",
      status: "ok",
      exitCode: 0,
      output: "",
    }],
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(r.markdown, "# PHP RCE Mitigation: APPLIED");
  assertStringIncludes(
    r.markdown,
    "[ok] /usr/bin/systemctl restart php8.2-fpm.service",
  );
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner scanFleet --input hosts=10.0.1.52",
  );
});

Deno.test("mitigate applied report: localhost verifies with scan", async () => {
  const s = withMitigation(status("localhost", PATCHED), {
    dryRun: false,
    outcome: "applied",
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner scan\n",
  );
});

const WINDOWS = [
  "HOSTNAME|WINTEST",
  "UID|1",
  "OS|ID=windows",
  "OS|VERSION_ID=10.0.26200",
  "BIN|C:\\xampp\\php\\php-cgi.exe||PHP 8.2.34 (cgi-fcgi)",
];

Deno.test("scan report: Windows hosts get no mitigate next step", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("win-01", WINDOWS),
  ]));
  assertStringIncludes(r.markdown, "| win-01 | 8.2.34 | cgi | vulnerable |");
  assert(!r.markdown.includes("## Next Step"));
});

Deno.test("mitigate dry run report: no apply command when nothing is planned", async () => {
  const s = withMitigation(status("win-01", WINDOWS), {
    outcome: "no-automatic-fix",
    privilege: "not-needed",
    notes: ["Windows hosts are scanned only"],
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(r.markdown, "| win-01 | no-automatic-fix |");
  assert(!r.markdown.includes("To apply"));
});

Deno.test("mitigate dry run report: apply command keeps the hardening options", async () => {
  const s = withMitigation(status("10.0.1.50", UPGRADABLE), {
    applyConfigMitigations: true,
    postMaxSize: "16M",
    steps: [{
      phase: "harden",
      command: "sudo -n -- /usr/bin/tee /etc/php/8.2/fpm/conf.d/x.ini",
      privileged: true,
      purpose: "Write",
      status: "planned",
      exitCode: null,
      output: "",
    }],
  });
  const r = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(
    r.markdown,
    "mitigate --input hosts=10.0.1.50 --input dryRun=false --input applyConfigMitigations=true --input postMaxSize=16M\n",
  );
});

Deno.test("report commands keep localhost in a mixed host list", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    status("localhost", UPGRADABLE),
    status("10.0.1.50", UPGRADABLE),
  ]));
  assertStringIncludes(
    r.markdown,
    "mitigate --input hosts=localhost,10.0.1.50\n",
  );
});

Deno.test("mitigate report on a container verifies with scan, not scanFleet", async () => {
  const container = status("php:8.2.34-apache", [
    "HOSTNAME|c",
    "UID|0",
    "INCONTAINER|1",
    "BIN|/usr/local/bin/php||PHP 8.2.34 (cli)",
  ], true);
  const r = await report.execute(makeContext("mitigate", [
    withMitigation(container, { dryRun: false, outcome: "no-automatic-fix" }),
  ]));
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner scan\n",
  );
  assert(!r.markdown.includes("scanFleet"));
});

Deno.test("mitigate report: a failed dry run says DRY RUN, not APPLIED", async () => {
  // A dockerContainer target that was removed: unreachable, still a dry run.
  const gone = withMitigation({
    ...status("php-web", NO_PHP),
    inContainer: true,
    error: "Cannot execute commands on php-web: no such container",
    riskLevel: "unknown",
    action: "unreachable",
  }, { outcome: "error", privilege: "unavailable" });
  const r = await report.execute(makeContext("mitigate", [gone]));
  assertStringIncludes(r.markdown, "# PHP RCE Mitigation: DRY RUN");
  assertStringIncludes(
    r.markdown,
    "| php-web | ERROR | — | UNKNOWN | unreachable |",
  );
  assertStringIncludes(
    r.markdown,
    "## php-web\n\n- Cannot execute commands on php-web: no such container\n",
  );
  assert(!r.markdown.includes("Verify with"));
  assert(!r.markdown.includes("To apply"));
  assert(!r.markdown.includes("scanFleet"));
  const json = r.json as { dryRun: boolean; outcome: string }[];
  assertEquals(json[0].dryRun, true);
  assertEquals(json[0].outcome, "error");
});

Deno.test("mitigate report: an applied run verifies only the hosts it reached", async () => {
  const done = withMitigation(status("10.0.1.52", PATCHED), {
    dryRun: false,
    outcome: "applied",
  });
  const gone = withMitigation({
    ...status("10.0.1.99", NO_PHP),
    error: "Cannot execute commands on 10.0.1.99: timed out",
    riskLevel: "unknown",
    action: "unreachable",
  }, { dryRun: false, outcome: "error" });
  const r = await report.execute(makeContext("mitigate", [done, gone]));
  assertStringIncludes(r.markdown, "# PHP RCE Mitigation: APPLIED");
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner scanFleet --input hosts=10.0.1.52\n",
  );
});

Deno.test("report commands use the running behavior's name", async () => {
  const r = await report.execute(
    makeContext(
      "scanFleet",
      [status("10.0.1.50", UPGRADABLE)],
      "@swamp/cve/php-rce-2026-10",
      "shop-web-scan",
    ),
  );
  assertStringIncludes(
    r.markdown,
    "swamp behavior run shop-web-scan mitigate --input hosts=10.0.1.50",
  );
  assert(!r.markdown.includes("php-rce-scanner"));
});

Deno.test("scan report: hosts scanned as user@host are suggested as user@host", async () => {
  const r = await report.execute(makeContext("scanFleet", [
    { ...status("10.0.1.50", UPGRADABLE), sshUser: "admin" },
    status("10.0.1.51", BOOKWORM),
  ]));
  assertStringIncludes(
    r.markdown,
    "swamp behavior run php-rce-scanner mitigate --input hosts=admin@10.0.1.50,10.0.1.51\n",
  );
  // Tables show the bare host.
  assert(!r.markdown.includes("| admin@10.0.1.50 |"));
});
