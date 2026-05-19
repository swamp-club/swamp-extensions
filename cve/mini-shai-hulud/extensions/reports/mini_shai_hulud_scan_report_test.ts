import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./mini_shai_hulud_scan_report.ts";

Deno.test("report export has expected shape", () => {
  assertEquals(report.name, "@swamp/cve/mini-shai-hulud-report");
  assertEquals(report.scope, "method");
  assertEquals(typeof report.execute, "function");
  assert(report.labels.includes("security"));
});

function makeScanResult(overrides: Record<string, unknown> = {}) {
  return {
    scanTimestamp: "2026-05-19T12:00:00.000Z",
    lockfilePath: "/project/deno.lock",
    lockfileFormat: "deno.lock",
    totalPackages: 3,
    compromisedCount: 1,
    cleanCount: 2,
    packages: [
      { name: "lodash", version: "4.17.21", status: "clean" },
      { name: "size-sensor", version: "1.0.4", status: "COMPROMISED" },
      { name: "zod", version: "4.3.6", status: "clean" },
    ],
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
    modelType: "@swamp/cve/mini-shai-hulud",
    modelId: "shai-hulud-scanner",
    methodName,
    dataHandles: results.map((_, i) => ({
      specName: "scanResult",
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

Deno.test("report renders compromised packages table", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  const { markdown, json } = await report.execute(ctx);

  assertStringIncludes(markdown, "Mini Shai-Hulud");
  assertStringIncludes(markdown, "| size-sensor | 1.0.4 | COMPROMISED |");
  assertStringIncludes(markdown, "| lodash | 4.17.21 | clean |");
  assertStringIncludes(markdown, "## VULNERABLE");

  const j = json as {
    lockfilePath: string;
    compromisedCount: number;
    status: string;
  }[];
  assertEquals(j.length, 1);
  assertEquals(j[0].compromisedCount, 1);
  assertEquals(j[0].status, "VULNERABLE");
});

Deno.test("report renders clean scan with CLEAN verdict", async () => {
  const ctx = makeContext("scan", [
    makeScanResult({
      compromisedCount: 0,
      cleanCount: 3,
      packages: [
        { name: "lodash", version: "4.17.21", status: "clean" },
        { name: "zod", version: "4.3.6", status: "clean" },
        { name: "react", version: "18.2.0", status: "clean" },
      ],
    }),
  ]);
  const { markdown, json } = await report.execute(ctx);

  assertStringIncludes(markdown, "## CLEAN");
  assertStringIncludes(markdown, "No compromised packages found");
  assert(!markdown.includes("VULNERABLE"));

  const j = json as { status: string }[];
  assertEquals(j[0].status, "CLEAN");
});

Deno.test("report returns empty for wrong model type", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  ctx.modelType = "@swamp/cve/other";
  const { markdown } = await report.execute(ctx);
  assertEquals(markdown, "");
});

Deno.test("report returns empty for no matching handles", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  ctx.dataHandles = [{ specName: "other", name: "x", version: "1" }];
  const { markdown } = await report.execute(ctx);
  assertEquals(markdown, "");
});

Deno.test("report handles multiple lockfiles", async () => {
  const result1 = makeScanResult();
  const result2 = makeScanResult({
    lockfilePath: "/other/package-lock.json",
    lockfileFormat: "package-lock.json",
    compromisedCount: 0,
    cleanCount: 3,
    packages: [
      { name: "lodash", version: "4.17.21", status: "clean" },
      { name: "zod", version: "4.3.6", status: "clean" },
      { name: "react", version: "18.2.0", status: "clean" },
    ],
  });
  const ctx = makeContext("scan", [result1, result2]);
  const { markdown, json } = await report.execute(ctx);

  assertStringIncludes(markdown, "/project/deno.lock");
  assertStringIncludes(markdown, "/other/package-lock.json");

  const j = json as { lockfilePath: string }[];
  assertEquals(j.length, 2);
});

Deno.test("report table contains all packages", async () => {
  const ctx = makeContext("scan", [makeScanResult()]);
  const { markdown } = await report.execute(ctx);

  assertStringIncludes(markdown, "| lodash | 4.17.21 | clean |");
  assertStringIncludes(markdown, "| size-sensor | 1.0.4 | COMPROMISED |");
  assertStringIncludes(markdown, "| zod | 4.3.6 | clean |");
});

Deno.test("report skips corrupted data handles", async () => {
  const validResult = makeScanResult();
  const validEncoded = new TextEncoder().encode(JSON.stringify(validResult));
  const corruptedEncoded = new TextEncoder().encode("{invalid json");

  const ctx = {
    modelType: "@swamp/cve/mini-shai-hulud",
    modelId: "scanner",
    methodName: "scan",
    dataHandles: [
      { specName: "scanResult", name: "corrupted", version: "1" },
      { specName: "scanResult", name: "valid", version: "1" },
    ],
    dataRepository: {
      getContent: (
        _type: string,
        _modelId: string,
        dataName: string,
        _version: string,
      ) => {
        if (dataName === "corrupted") return Promise.resolve(corruptedEncoded);
        return Promise.resolve(validEncoded);
      },
    },
  };

  const { markdown } = await report.execute(ctx);
  assertStringIncludes(markdown, "size-sensor");
  assertStringIncludes(markdown, "VULNERABLE");
});
