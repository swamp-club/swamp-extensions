import { assertEquals } from "@std/assert";
import { assertStringIncludes } from "@std/assert";
import { parseEnrichmentSource } from "./parser.ts";

const enrichFilePath = new URL("./storage-buckets.enrich.ts", import.meta.url)
  .pathname;

Deno.test("parseEnrichmentSource - strips zod import", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  for (const imp of result.imports) {
    assertEquals(imp.includes("zod"), false);
  }
});

Deno.test("parseEnrichmentSource - no SDK imports for this enrichment", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.imports.length, 0);
});

Deno.test("parseEnrichmentSource - strips export keywords from body", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.body.includes("export const"), false);
  assertStringIncludes(result.body, "const iamBindingMethods");
});

Deno.test("parseEnrichmentSource - strips lint directive", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertEquals(result.body.includes("deno-lint-ignore-file"), false);
  for (const imp of result.imports) {
    assertEquals(imp.includes("deno-lint-ignore-file"), false);
  }
});

Deno.test("parseEnrichmentSource - body contains IAM binding methods", async () => {
  const result = await parseEnrichmentSource(enrichFilePath);
  assertStringIncludes(result.body, "add_iam_binding");
  assertStringIncludes(result.body, "remove_iam_binding");
  assertStringIncludes(result.body, "getProjectId");
  assertStringIncludes(result.body, "BASE_URL");
  assertStringIncludes(result.body, "request(");
});
