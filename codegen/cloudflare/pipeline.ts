// Cloudflare provider pipeline — schema fetching and model generation

import $RefParser from "@apidevtools/json-schema-ref-parser";
import { dirname } from "@std/path";

const CLOUDFLARE_SPEC_URL =
  "https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json";

// --- Schema fetching ---

export async function fetchCloudflareSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/cloudflare.json", import.meta.url).pathname;

  console.log("Fetching Cloudflare OpenAPI spec...");
  console.log(`  Source: ${CLOUDFLARE_SPEC_URL}`);

  const response = await fetch(CLOUDFLARE_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }

  const jsonText = await response.text();

  // Save raw JSON to a temp file for $ref resolution
  const tmpJson = await Deno.makeTempFile({ suffix: ".json" });
  try {
    await Deno.writeTextFile(tmpJson, jsonText);

    console.log("Dereferencing $refs (226 circular refs in spec)...");
    const dereferenced = await $RefParser.dereference(tmpJson);

    const outputDir = dirname(outputPath);
    await Deno.mkdir(outputDir, { recursive: true });

    // The dereferenced spec has shared $ref targets (same JS object referenced
    // from multiple locations) AND true circular references. We must distinguish
    // between the two: shared refs should be serialized fully each time (to
    // preserve property info), while true cycles must be cut.
    //
    // Strategy: track ancestors (objects on the current serialization path).
    // Only mark as [Circular] when re-encountering an ancestor (a true cycle).
    // Shared refs encountered in sibling branches are serialized normally.
    const serialized = serializeWithCycleDetection(dereferenced);
    await Deno.writeTextFile(outputPath, serialized);

    const fileSize = (await Deno.stat(outputPath)).size;
    console.log(`\nSchema fetch complete!`);
    console.log(
      `  Output: ${outputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`,
    );
  } finally {
    try {
      await Deno.remove(tmpJson);
    } catch { /* ignore cleanup errors */ }
  }
}

/**
 * Serialize a dereferenced OpenAPI spec to JSON, correctly handling both
 * shared $ref targets (same JS object from multiple locations) and true
 * circular references. Uses ancestor tracking so shared refs are serialized
 * fully while true cycles are replaced with "[Circular]".
 */
function serializeWithCycleDetection(
  root: unknown,
): string {
  const ancestors = new Set<object>();

  function serialize(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;

    const obj = value as object;

    if (ancestors.has(obj)) return "[Circular]";

    ancestors.add(obj);

    let result: unknown;
    if (Array.isArray(obj)) {
      result = obj.map((item) => serialize(item));
    } else {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = serialize(v);
      }
      result = out;
    }

    ancestors.delete(obj);
    return result;
  }

  return JSON.stringify(serialize(root), null, 2);
}
