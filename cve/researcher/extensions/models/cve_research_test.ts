import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { model } from "./cve_research.ts";

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/researcher");
  assertEquals(typeof model.version, "string");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["research"]),
  );
  assertEquals(Object.keys(model.resources), ["results"]);
  assertEquals(model.resources.results.lifetime, "infinite");
  assert(Array.isArray(model.reports));
  assertStringIncludes(model.reports[0], "researcher-report");
});

Deno.test("globalArguments accepts defaults-only config", () => {
  const result = model.globalArguments.parse({});
  assertEquals(result.severityThreshold, "HIGH");
  assertEquals(result.lookbackDays, 1);
  assertEquals(result.maxResultsPerSource, 40);
  assertEquals(result.keywords, undefined);
});

Deno.test("globalArguments accepts full config", () => {
  const result = model.globalArguments.parse({
    severityThreshold: "CRITICAL",
    lookbackDays: 7,
    maxResultsPerSource: 100,
    keywords: ["supply-chain", "kernel"],
  });
  assertEquals(result.severityThreshold, "CRITICAL");
  assertEquals(result.lookbackDays, 7);
  assertEquals(result.maxResultsPerSource, 100);
  assertEquals(result.keywords, ["supply-chain", "kernel"]);
});

Deno.test("globalArguments rejects invalid severity", () => {
  let threw = false;
  try {
    model.globalArguments.parse({ severityThreshold: "LOW" });
  } catch {
    threw = true;
  }
  assert(threw, "should reject invalid severity threshold");
});

Deno.test("globalArguments rejects lookbackDays > 90", () => {
  let threw = false;
  try {
    model.globalArguments.parse({ lookbackDays: 91 });
  } catch {
    threw = true;
  }
  assert(threw, "should reject lookbackDays > 90");
});

Deno.test("globalArguments rejects maxResultsPerSource > 200", () => {
  let threw = false;
  try {
    model.globalArguments.parse({ maxResultsPerSource: 201 });
  } catch {
    threw = true;
  }
  assert(threw, "should reject maxResultsPerSource > 200");
});

Deno.test("research method arguments accept empty object", () => {
  const schema = model.methods.research.arguments;
  const result = schema.parse({});
  assertEquals(result.keywords, undefined);
  assertEquals(result.severityThreshold, undefined);
  assertEquals(result.lookbackDays, undefined);
});

Deno.test("research method arguments accept overrides", () => {
  const schema = model.methods.research.arguments;
  const result = schema.parse({
    keywords: ["rce"],
    severityThreshold: "CRITICAL",
    lookbackDays: 30,
  });
  assertEquals(result.keywords, ["rce"]);
  assertEquals(result.severityThreshold, "CRITICAL");
  assertEquals(result.lookbackDays, 30);
});

Deno.test("results resource schema validates correct data", () => {
  const schema = model.resources.results.schema;
  const data = {
    cves: [{
      id: "CVE-2026-12345",
      description: "Test vulnerability",
      severity: "CRITICAL",
      severityScore: 9.8,
      source: "NVD",
      published: "2026-06-25T00:00:00Z",
      categories: ["rce"],
      references: ["https://example.com"],
      knownExploited: false,
      isNew: true,
    }],
    newCount: 1,
    totalScanned: 100,
    lookbackDays: 1,
    timestamp: "2026-06-25T12:00:00Z",
    discordSummary: "test summary",
    sources: {
      nvd: { queried: true, count: 40 },
      github: { queried: true, count: 50 },
      cisaKev: { queried: true, count: 10 },
    },
  };
  const result = schema.parse(data);
  assertEquals(result.cves.length, 1);
  assertEquals(result.newCount, 1);
  assertEquals(result.lookbackDays, 1);
});

Deno.test("results resource schema validates empty cves", () => {
  const schema = model.resources.results.schema;
  const data = {
    cves: [],
    newCount: 0,
    totalScanned: 0,
    lookbackDays: 1,
    timestamp: "2026-06-25T12:00:00Z",
    discordSummary: "",
    sources: {
      nvd: { queried: true, count: 0 },
      github: { queried: true, count: 0 },
      cisaKev: { queried: true, count: 0 },
    },
  };
  const result = schema.parse(data);
  assertEquals(result.cves.length, 0);
});

Deno.test("results resource schema accepts source errors", () => {
  const schema = model.resources.results.schema;
  const data = {
    cves: [],
    newCount: 0,
    totalScanned: 0,
    lookbackDays: 1,
    timestamp: "2026-06-25T12:00:00Z",
    discordSummary: "",
    sources: {
      nvd: { queried: true, count: 0, error: "HTTP 503" },
      github: { queried: true, count: 0 },
      cisaKev: { queried: true, count: 0, error: "timeout" },
    },
  };
  const result = schema.parse(data);
  assertEquals(result.sources.nvd.error, "HTTP 503");
  assertEquals(result.sources.github.error, undefined);
  assertEquals(result.sources.cisaKev.error, "timeout");
});

Deno.test("results resource schema rejects invalid severity", () => {
  const schema = model.resources.results.schema;
  let threw = false;
  try {
    schema.parse({
      cves: [{
        id: "CVE-2026-99999",
        description: "test",
        severity: "LOW",
        severityScore: 3.0,
        source: "NVD",
        published: "2026-06-25T00:00:00Z",
        categories: [],
        references: [],
        knownExploited: false,
        isNew: true,
      }],
      newCount: 0,
      totalScanned: 0,
      lookbackDays: 1,
      timestamp: "2026-06-25T12:00:00Z",
      discordSummary: "",
      sources: {
        nvd: { queried: true, count: 0 },
        github: { queried: true, count: 0 },
        cisaKev: { queried: true, count: 0 },
      },
    });
  } catch {
    threw = true;
  }
  assert(threw, "should reject severity other than HIGH or CRITICAL");
});

Deno.test("results resource schema rejects invalid source", () => {
  const schema = model.resources.results.schema;
  let threw = false;
  try {
    schema.parse({
      cves: [{
        id: "CVE-2026-99999",
        description: "test",
        severity: "HIGH",
        severityScore: 7.0,
        source: "UNKNOWN",
        published: "2026-06-25T00:00:00Z",
        categories: [],
        references: [],
        knownExploited: false,
        isNew: true,
      }],
      newCount: 0,
      totalScanned: 0,
      lookbackDays: 1,
      timestamp: "2026-06-25T12:00:00Z",
      discordSummary: "",
      sources: {
        nvd: { queried: true, count: 0 },
        github: { queried: true, count: 0 },
        cisaKev: { queried: true, count: 0 },
      },
    });
  } catch {
    threw = true;
  }
  assert(threw, "should reject source other than NVD, GITHUB, or CISA_KEV");
});
