import type { ParsedEnrichmentSource } from "./types.ts";
import { parseSourceFile } from "../../shared/sourceParser.ts";

/**
 * Reads an enrichment source file and splits it into imports and body.
 * Strips the lint directive line, the zod import (already in the model),
 * `_lib/aws` imports (the model emits its own), and `export` keywords from
 * declarations.
 */
export function parseEnrichmentSource(
  sourceFile: string,
): Promise<ParsedEnrichmentSource> {
  return parseSourceFile(sourceFile, { stripAwsLib: true });
}

/**
 * Reads a list method enrichment source file and splits it into imports and body.
 * Same parsing logic as state enrichment — strips lint directives, zod imports,
 * `_lib/aws` imports, and export keywords.
 */
export function parseListMethodSource(
  sourceFile: string,
): Promise<ParsedEnrichmentSource> {
  return parseSourceFile(sourceFile, { stripAwsLib: true });
}
