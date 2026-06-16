import { assertEquals } from "@std/assert";
import { assertStringIncludes } from "@std/assert";
import { parseEnrichmentSource, parseListMethodSource } from "./parser.ts";

const enrichFilePath = new URL(
  "./rds-dbcluster/enrich.ts",
  import.meta.url,
).pathname;
const listEnrichFilePath = new URL(
  "./rds-dbcluster/list.enrich.ts",
  import.meta.url,
).pathname;

Deno.test("parseEnrichmentSource - extracts SDK imports", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.imports.length, 1);
  assertStringIncludes(result.imports[0], "DescribeDBClustersCommand");
  assertStringIncludes(result.imports[0], "DescribeDBInstancesCommand");
  assertStringIncludes(result.imports[0], "RDSClient");
  assertStringIncludes(result.imports[0], "@aws-sdk/client-rds");
});

Deno.test("parseEnrichmentSource - strips zod import", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  for (const imp of result.imports) {
    assertEquals(imp.includes("zod"), false);
  }
});

Deno.test("parseEnrichmentSource - strips export keywords from body", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.body.includes("export const"), false);
  assertEquals(result.body.includes("export async function"), false);
  assertStringIncludes(result.body, "const DBClusterMemberSchema");
  assertStringIncludes(result.body, "async function enrichState");
});

Deno.test("parseEnrichmentSource - strips lint directive", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.body.includes("deno-lint-ignore-file"), false);
  for (const imp of result.imports) {
    assertEquals(imp.includes("deno-lint-ignore-file"), false);
  }
});

Deno.test("parseEnrichmentSource - body contains enrichState implementation", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertStringIncludes(result.body, "DescribeDBClustersCommand");
  assertStringIncludes(result.body, "DBClusterMembers");
  assertStringIncludes(result.body, "instanceMap");
});

Deno.test("parseListMethodSource - extracts SDK imports", async () => {
  const result = await parseListMethodSource(listEnrichFilePath);
  assertEquals(result.imports.length, 1);
  assertStringIncludes(result.imports[0], "DescribeDBClustersCommand");
  assertStringIncludes(result.imports[0], "RDSClient");
  assertStringIncludes(result.imports[0], "@aws-sdk/client-rds");
});

Deno.test("parseListMethodSource - strips zod import", async () => {
  const result = await parseListMethodSource(listEnrichFilePath);
  for (const imp of result.imports) {
    assertEquals(imp.includes("zod"), false);
  }
});

Deno.test("parseListMethodSource - strips export keywords from body", async () => {
  const result = await parseListMethodSource(listEnrichFilePath);
  assertEquals(result.body.includes("export async function"), false);
  assertStringIncludes(result.body, "async function listClusters");
});

Deno.test("parseListMethodSource - body contains pagination logic", async () => {
  const result = await parseListMethodSource(listEnrichFilePath);
  assertStringIncludes(result.body, "DescribeDBClustersCommand");
  assertStringIncludes(result.body, "marker");
  assertStringIncludes(result.body, "maxPages");
});

Deno.test("parseListMethodSource - body maps SDK fields to CF property names", async () => {
  const result = await parseListMethodSource(listEnrichFilePath);
  assertStringIncludes(result.body, "DBClusterIdentifier");
  assertStringIncludes(result.body, "Engine");
  assertStringIncludes(result.body, "EngineVersion");
  assertStringIncludes(result.body, "Status");
});
