import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./dirtyfrag_scan_report.ts";

Deno.test("report export has expected shape", () => {
  assertEquals(report.name, "@swamp/cve/dirtyfrag-report");
  assertEquals(report.scope, "method");
  assertEquals(typeof report.execute, "function");
  assert(report.labels.includes("security"));
});

function makeScanResult(overrides: Record<string, unknown> = {}) {
  return {
    scanTimestamp: "2026-05-08T12:00:00.000Z",
    hostname: "web-01",
    kernelVersion: "6.8.0-40-generic",
    vulnerable: true,
    riskLevel: "critical",
    summary: "web-01 is critical-risk",
    cve202643284: {
      name: "CVE-2026-43284",
      description: "xfrm-ESP page-cache write",
      affected: true,
      patched: false,
      modulesLoaded: ["esp4"],
      modulesAvailable: ["esp4", "esp6"],
      userNamespacesEnabled: true,
    },
    cve202643500: {
      name: "CVE-2026-43500",
      description: "RxRPC RXKAD page-cache write",
      affected: false,
      patched: false,
      modulesLoaded: [],
      modulesAvailable: [],
    },
    mitigations: {
      espModulesBlacklisted: false,
      rxrpcModuleBlacklisted: false,
      userNamespacesRestricted: false,
      modprobeBlacklist: [],
    },
    indicators: {
      suPageCacheCorrupted: false,
      passwdPageCacheCorrupted: false,
      suspiciousXfrmSAs: false,
      rxrpcKeysFound: false,
      details: [],
    },
    recommendations: ["Apply kernel patch"],
    ...overrides,
  };
}

function makeContext(
  methodName: string,
  results: unknown[],
): {
  modelType: string;
  modelId: string;
  methodName: string;
  dataHandles: { specName: string; name: string; version: string }[];
  dataRepository: {
    getContent: (
      type: string,
      modelId: string,
      dataName: string,
      version: string,
    ) => Promise<Uint8Array | null>;
  };
} {
  const encoded = results.map((r) =>
    new TextEncoder().encode(JSON.stringify(r))
  );
  return {
    modelType: "@swamp/cve/dirtyfrag",
    modelId: "dirtyfrag-scanner",
    methodName,
    dataHandles: results.map((_, i) => ({
      specName: "status",
      name: `result-${i}`,
      version: "1",
    })),
    dataRepository: {
      getContent: (
        _type: string,
        _modelId: string,
        dataName: string,
        _version: string,
      ) => {
        const idx = parseInt(dataName.split("-")[1]);
        return Promise.resolve(encoded[idx] ?? null);
      },
    },
  };
}

Deno.test("report returns empty for non-matching model type", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  ctx.modelType = "@swamp/other-model";
  const result = await report.execute(ctx);
  assertEquals(result.markdown, "");
});

Deno.test("report returns empty when no status handles", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  ctx.dataHandles = [];
  const result = await report.execute(ctx);
  assertEquals(result.markdown, "");
});

// --- Scan report tests ---

Deno.test("scan report: shows vulnerable host count", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({ hostname: "web-01", vulnerable: true }),
    makeScanResult({
      hostname: "web-02",
      vulnerable: false,
      riskLevel: "none",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "**2** hosts scanned");
  assertStringIncludes(result.markdown, "**1** vulnerable");
  assertStringIncludes(result.markdown, "**1** clean");
});

Deno.test("scan report: shows compromised count when IOCs present", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({
      hostname: "pwned-host",
      indicators: {
        suPageCacheCorrupted: true,
        passwdPageCacheCorrupted: false,
        suspiciousXfrmSAs: false,
        rxrpcKeysFound: false,
        details: [],
      },
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "**1** compromised");
});

Deno.test("scan report: next step includes --input hosts for remote hosts", async () => {
  const ctx = makeContext("scanFleet", [
    makeScanResult({ hostname: "10.0.0.1", vulnerable: true }),
    makeScanResult({ hostname: "10.0.0.2", vulnerable: true }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(
    result.markdown,
    "mitigate --input hosts=10.0.0.1,10.0.0.2",
  );
});

Deno.test("scan report: next step omits --input hosts for localhost", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({ hostname: "localhost", vulnerable: true }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "## Next Step");
  assertStringIncludes(
    result.markdown,
    "swamp model method run dirtyfrag-scanner mitigate\n",
  );
  assert(
    !result.markdown.includes("--input hosts=localhost"),
    "should not include --input hosts=localhost",
  );
});

Deno.test("scan report: next step omits --input hosts for 127.0.0.1", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({ hostname: "127.0.0.1", vulnerable: true }),
  ]);
  const result = await report.execute(ctx);
  assert(
    !result.markdown.includes("--input hosts=127.0.0.1"),
    "should not include --input hosts=127.0.0.1",
  );
});

Deno.test("scan report: no next step when all hosts clean", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({
      hostname: "clean-host",
      vulnerable: false,
      riskLevel: "none",
    }),
  ]);
  const result = await report.execute(ctx);
  assert(
    !result.markdown.includes("## Next Step"),
    "should not show Next Step for clean hosts",
  );
});

Deno.test("scan report: deduplicates recommendations", async () => {
  const rec = "Apply kernel patch";
  const ctx = makeContext("scanFleet", [
    makeScanResult({ hostname: "h1", recommendations: [rec] }),
    makeScanResult({ hostname: "h2", recommendations: [rec] }),
  ]);
  const result = await report.execute(ctx);
  const count = result.markdown.split(rec).length - 1;
  assertEquals(count, 1, "recommendation should appear exactly once");
});

Deno.test("scan report: json includes all hosts", async () => {
  const ctx = makeContext("scanFleet", [
    makeScanResult({ hostname: "h1", vulnerable: true, riskLevel: "high" }),
    makeScanResult({
      hostname: "h2",
      vulnerable: false,
      riskLevel: "none",
    }),
  ]);
  const result = await report.execute(ctx);
  const json = result.json as Record<string, unknown>[];
  assertEquals(json.length, 2);
  assertEquals(json[0].hostname, "h1");
  assertEquals(json[0].vulnerable, true);
  assertEquals(json[1].hostname, "h2");
  assertEquals(json[1].vulnerable, false);
});

// --- Mitigate report tests ---

Deno.test("mitigate dry run report: includes DRY RUN header", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "10.0.0.1",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "# Dirty Frag Mitigation: DRY RUN");
});

Deno.test("mitigate applied report: includes APPLIED header", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "10.0.0.1",
      summary: "Mitigations applied: modules blacklisted",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "# Dirty Frag Mitigation: APPLIED");
});

Deno.test("mitigate dry run: includes --input hosts for remote hosts", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "10.0.0.1",
      summary: "Dry run complete. Review commands",
    }),
    makeScanResult({
      hostname: "10.0.0.2",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(
    result.markdown,
    "mitigate --input hosts=10.0.0.1,10.0.0.2 --input dryRun=false",
  );
});

Deno.test("mitigate dry run: omits --input hosts for localhost", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "localhost",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "To apply:");
  assertStringIncludes(
    result.markdown,
    "swamp model method run dirtyfrag-scanner mitigate --input dryRun=false\n",
  );
  assert(
    !result.markdown.includes("--input hosts=localhost"),
    "should not include --input hosts=localhost in dry run apply command",
  );
});

Deno.test("mitigate dry run: omits --input hosts for 127.0.0.1", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "127.0.0.1",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assert(
    !result.markdown.includes("--input hosts=127.0.0.1"),
    "should not include --input hosts=127.0.0.1 in dry run apply command",
  );
});

Deno.test("mitigate applied: verify command uses scan for localhost", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "localhost",
      summary: "Mitigations applied: modules blacklisted",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Verify with:");
  assertStringIncludes(
    result.markdown,
    "swamp model method run dirtyfrag-scanner scan\n",
  );
  assert(
    !result.markdown.includes("scanFleet"),
    "should use scan not scanFleet for localhost verify",
  );
});

Deno.test("mitigate applied: verify command uses scanFleet for remote hosts", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "10.0.0.1",
      summary: "Mitigations applied: modules blacklisted",
    }),
    makeScanResult({
      hostname: "10.0.0.2",
      summary: "Mitigations applied: modules blacklisted",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(
    result.markdown,
    "scanFleet --input hosts=10.0.0.1,10.0.0.2",
  );
});

Deno.test("mitigate report: shows host table", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "web-01",
      kernelVersion: "6.8.0-40-generic",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "| web-01 | 6.8.0-40-generic |");
});

Deno.test("mitigate report: skipped host shows SKIPPED status", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "clean-host",
      vulnerable: false,
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "SKIPPED (not vulnerable)");
});

Deno.test("mitigate report: failed host shows FAILED status", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "bad-host",
      summary: "Mitigation failed on bad-host",
    }),
  ]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "FAILED");
});

Deno.test("mitigate report: json tracks dryRun and applied state", async () => {
  const ctx = makeContext("mitigate", [
    makeScanResult({
      hostname: "h1",
      summary: "Dry run complete. Review commands",
    }),
  ]);
  const result = await report.execute(ctx);
  const json = result.json as Record<string, unknown>[];
  assertEquals(json[0].dryRun, true);
  assertEquals(json[0].applied, false);
});
