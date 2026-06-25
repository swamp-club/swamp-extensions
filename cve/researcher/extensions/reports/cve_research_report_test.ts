import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./cve_research_report.ts";

Deno.test("report export has expected shape", () => {
  assertEquals(report.name, "@swamp/cve/researcher-report");
  assertEquals(report.scope, "method");
  assertEquals(typeof report.execute, "function");
  assert(report.labels.includes("security"));
  assert(report.labels.includes("cve"));
});

function makeContext(
  cves: Record<string, unknown>[],
  overrides: Record<string, unknown> = {},
) {
  const data = {
    cves,
    newCount: cves.filter((c: Record<string, unknown>) => c.isNew).length,
    totalScanned: 100,
    lookbackDays: 1,
    timestamp: "2026-06-25T12:00:00Z",
    sources: {
      nvd: { queried: true, count: 40 },
      github: { queried: true, count: 50 },
      cisaKev: { queried: true, count: 10 },
    },
    ...overrides,
  };

  const encoded = new TextEncoder().encode(JSON.stringify(data));

  return {
    modelType: "@swamp/cve/researcher",
    modelId: "test-id",
    methodName: "research",
    dataHandles: [{ specName: "results", name: "scan", version: "1" }],
    dataRepository: {
      getContent: () => Promise.resolve(encoded),
    },
  };
}

function makeCve(overrides = {}) {
  return {
    id: "CVE-2026-12345",
    description: "Test vulnerability in a test product",
    severity: "CRITICAL",
    severityScore: 9.8,
    source: "NVD",
    published: "2026-06-25T00:00:00Z",
    categories: ["other"],
    references: ["https://example.com"],
    knownExploited: false,
    isNew: true,
    ...overrides,
  };
}

Deno.test("report returns empty for wrong model type", async () => {
  const ctx = makeContext([]);
  ctx.modelType = "@wrong/type";
  const result = await report.execute(ctx);
  assertEquals(result.markdown, "");
});

Deno.test("report returns empty for no data handles", async () => {
  const ctx = makeContext([]);
  ctx.dataHandles = [];
  const result = await report.execute(ctx);
  assertEquals(result.markdown, "");
});

Deno.test("report handles zero CVEs", async () => {
  const ctx = makeContext([]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "No HIGH or CRITICAL CVEs");
  assertEquals(result.json.status, "CLEAN");
});

Deno.test("report renders extension candidates", async () => {
  const cve = makeCve({
    description: "Supply chain compromise in npm package",
    categories: ["supply-chain"],
    knownExploited: true,
    vendorProject: "npm",
    product: "evil-package",
  });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Extension Candidates");
  assertStringIncludes(result.markdown, "evil-package");
  assertEquals(result.json.status, "EXTENSIONS_NEEDED");
  const json = result.json as Record<string, unknown>;
  assert(
    Array.isArray(json.extensionCandidates) &&
      json.extensionCandidates.length > 0,
  );
});

Deno.test("report renders monitor items", async () => {
  const cve = makeCve({
    description:
      "Authentication bypass via spoofable headers allows credential theft and token forgery",
    categories: ["auth-bypass"],
    vendorProject: "npm",
    product: "bad-auth",
  });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Monitor");
  assertEquals(result.json.status, "REVIEW");
});

Deno.test("report renders vendor products as summary only", async () => {
  const cve = makeCve({
    description: "Bug in JetBrains Hub before 2026.1",
    categories: ["other"],
    vendorProject: undefined,
    product: undefined,
  });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Other");
  assertStringIncludes(result.markdown, "Vendor Products");
});

Deno.test("report classifies infrastructure CVEs correctly", async () => {
  const cve = makeCve({
    description: "Linux kernel privilege escalation via cgroups",
    categories: ["kernel", "privilege-escalation"],
    knownExploited: true,
  });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Infrastructure & Platform");
});

Deno.test("report classifies open-source library CVEs correctly", async () => {
  const cve = makeCve({
    description: "RCE in crawl4ai via argument injection",
    categories: ["rce"],
    vendorProject: "pip",
    product: "crawl4ai",
  });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Open-Source Libraries");
});

Deno.test("report marks new CVEs", async () => {
  const cve = makeCve({ isNew: true, vendorProject: "pip", product: "test" });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "(NEW)");
});

Deno.test("report shows scoring methodology", async () => {
  const cve = makeCve({ vendorProject: "npm", product: "test" });
  const ctx = makeContext([cve]);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "Scoring Methodology");
  assertStringIncludes(result.markdown, "Impact");
  assertStringIncludes(result.markdown, "Scannable");
  assertStringIncludes(result.markdown, "Remediation");
});

Deno.test("report shows source summary", async () => {
  const ctx = makeContext([], {
    sources: {
      nvd: { queried: true, count: 40, error: "HTTP 503" },
      github: { queried: true, count: 50 },
      cisaKev: { queried: true, count: 10 },
    },
  });
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "NVD: 40 (error)");
  assertStringIncludes(result.markdown, "GitHub: 50");
});

Deno.test("report json has correct structure", async () => {
  const cves = [
    makeCve({
      id: "CVE-2026-1",
      categories: ["supply-chain"],
      knownExploited: true,
      vendorProject: "npm",
      product: "bad",
    }),
    makeCve({
      id: "CVE-2026-2",
      categories: ["auth-bypass"],
      vendorProject: "pip",
      product: "weak",
    }),
    makeCve({
      id: "CVE-2026-3",
      description: "Bug in JetBrains",
    }),
  ];
  const ctx = makeContext(cves);
  const result = await report.execute(ctx);
  assert("extensionCandidates" in result.json);
  assert("monitor" in result.json);
  assert("otherCount" in result.json);
  assert("byClassification" in result.json);
});
