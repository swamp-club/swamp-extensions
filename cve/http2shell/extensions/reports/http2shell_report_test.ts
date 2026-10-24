import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./http2shell_report.ts";
import { analyze, parseProbe } from "../models/_lib/analysis.ts";
import type { Status } from "../models/_lib/schemas.ts";
import { errorStatus, failedMitigation } from "../models/http2shell.ts";

// Statuses come from the model's own analyze() so the report and the
// resource schema cannot drift apart.

function status(target: string, lines: string[], inContainer = false): Status {
  return analyze(
    parseProbe(["HOSTNAME|" + target, "UID|0", ...lines, "END|1"].join("\n")),
    target,
    { inContainer, probe: "sh" },
  );
}

const DEBIAN = [
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "TOOL|apt-get|/usr/bin/apt-get",
];

const VULNERABLE = [
  ...DEBIAN,
  "PKG|dpkg|libbrotli1|1.0.9-2",
  "NODE|/usr/local/bin/node||v24.22.0 1.2.0|",
  'LISTEN|LISTEN 0 511 0.0.0.0:3000 0.0.0.0:* users:(("node",pid=7,fd=20))',
  "MAPS|7|node|api.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
];
const PATCHED = [...DEBIAN, "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1"];
const VENDOR = [
  "OS|ID=alpine",
  "OS|VERSION_ID=3.22.7",
  "APKPKG|brotli-libs-1.1.0-r2",
];

function makeContext(
  methodName: string,
  results: unknown[],
  modelType = "@swamp/cve/http2shell",
  definitionName?: string,
) {
  const encoded = results.map((r) =>
    new TextEncoder().encode(JSON.stringify(r))
  );
  return {
    modelType,
    modelId: "brotli-scanner",
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
  assertEquals(report.name, "@swamp/cve/http2shell-report");
  assertEquals(report.scope, "method");
  assert(report.labels.includes("security"));
});

Deno.test("report returns empty for another model type or no handles", async () => {
  const other = await report.execute(
    makeContext("scan", [status("a", PATCHED)], "@swamp/cve/dirtyfrag"),
  );
  assertEquals(other.markdown, "");
  const none = await report.execute(makeContext("scan", []));
  assertEquals(none.markdown, "");
});

Deno.test("scan report: table, affected decoders, exposure, stopgaps, next step", async () => {
  const r = await report.execute(
    makeContext(
      "scan",
      [
        status("web-01", VULNERABLE),
        status("web-02", PATCHED),
        status("edge-01", VENDOR),
        errorStatus("db-01", new Error("connection refused")),
      ],
      undefined,
      "brotli",
    ),
  );
  const md = r.markdown;
  assertStringIncludes(
    md,
    "**4** target(s) scanned: **1** with affected decoders, **1** with only decoders to check with the vendor, **1** patched or without Brotli, **1** unreachable",
  );
  assertStringIncludes(
    md,
    "| web-01 | node | /usr/local/bin/node | 24.22.0 | vulnerable | 24.22.1 | upgrade |",
  );
  assertStringIncludes(md, "## Check with the vendor");
  assertStringIncludes(md, "node listens publicly on 0.0.0.0:3000");
  assertStringIncludes(md, "## Restart required");
  assertStringIncludes(md, "## Stopgaps until everything is patched");
  assertStringIncludes(
    md,
    "swamp behavior run brotli mitigate --input hosts=web-01",
  );
  const json = r.json as { target: string; riskLevel: string }[];
  assertEquals(json.find((j) => j.target === "web-01")?.riskLevel, "critical");
  assertEquals(json.find((j) => j.target === "db-01")?.riskLevel, "unknown");
});

Deno.test("scan report: hosts scanned as user@host are suggested as user@host", async () => {
  const r = await report.execute(makeContext(
    "scanFleet",
    [
      { ...status("10.0.1.50", VULNERABLE), sshUser: "admin" },
      status("10.0.1.51", VULNERABLE),
    ],
    undefined,
    "brotli",
  ));
  assertStringIncludes(
    r.markdown,
    "swamp behavior run brotli mitigate --input hosts=admin@10.0.1.50,10.0.1.51\n",
  );
  // Tables show the bare host.
  assert(!r.markdown.includes("| admin@10.0.1.50 |"));
});

Deno.test("scan report escapes values from the target", async () => {
  const r = await report.execute(makeContext("scan", [
    status("h", [...DEBIAN, "ELECTRON|/opt/a|b/resources/app.asar"]),
  ]));
  assertStringIncludes(r.markdown, "/opt/a\\|b/resources/app.asar");
  assert(!r.markdown.includes("/opt/a|b"));
});

Deno.test("scan report suggests no mitigate for containers or macOS", async () => {
  const r = await report.execute(makeContext("scan", [
    status(
      "img",
      [...DEBIAN, "NODE|/usr/local/bin/node||v24.22.0 1.2.0|"],
      true,
    ),
    status("mac", ["OS|ID=macos", "PKG|brew|brotli|1.2.0"]),
  ]));
  assert(!r.markdown.includes("## Next Step"));
  assertStringIncludes(r.markdown, "Rebuild this image");
});

Deno.test("mitigate report: dry run repeats the options in the apply command", async () => {
  const s = status("web-01", VULNERABLE);
  const dry: Status = {
    ...s,
    mitigation: {
      dryRun: true,
      restartServices: false,
      upgradePython: true,
      removePythonBrotli: false,
      privilege: "root",
      missingPrivileges: [],
      outcome: "dry-run",
      steps: [{
        phase: "upgrade",
        command: "/usr/bin/apt-get update",
        privileged: true,
        purpose: "Refresh package lists",
        status: "planned",
        exitCode: null,
        output: "",
      }],
      script: null,
      notes: ["a note"],
    },
  };
  const r = await report.execute(
    makeContext("mitigate", [dry], undefined, "brotli"),
  );
  assertStringIncludes(r.markdown, "Mitigation: DRY RUN");
  assertStringIncludes(r.markdown, "/usr/bin/apt-get update");
  assertStringIncludes(
    r.markdown,
    "swamp behavior run brotli mitigate --input hosts=web-01 --input dryRun=false --input restartServices=false --input upgradePython=true",
  );
});

Deno.test("mitigate report shows saved scripts, errors and the verify command", async () => {
  const mac = status("mac", ["OS|ID=macos", "PKG|brew|brotli|1.2.0"]);
  const withScript: Status = {
    ...mac,
    mitigation: {
      dryRun: false,
      restartServices: true,
      upgradePython: false,
      removePythonBrotli: false,
      privilege: "not-needed",
      missingPrivileges: [],
      outcome: "no-automatic-fix",
      steps: [],
      script: { shell: "sh", text: "brew upgrade brotli\n" },
      notes: ["macOS hosts are scanned only"],
    },
  };
  const failed = failedMitigation(errorStatus("web-09", new Error("timeout")), {
    dryRun: false,
    restartServices: true,
    upgradePython: false,
    removePythonBrotli: false,
  });
  const r = await report.execute(
    makeContext("mitigate", [withScript, failed], undefined, "brotli"),
  );
  assertStringIncludes(r.markdown, "Mitigation: APPLIED");
  assertStringIncludes(r.markdown, "brew upgrade brotli");
  assertStringIncludes(r.markdown, "| web-09 | ERROR |");
  assertStringIncludes(
    r.markdown,
    "swamp behavior run brotli scanFleet --input hosts=mac",
  );
});
