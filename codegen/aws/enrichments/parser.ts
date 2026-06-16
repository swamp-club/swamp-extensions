import type { ParsedEnrichmentSource } from "./types.ts";
import { parseSourceFile } from "../../shared/sourceParser.ts";

/**
 * Reads an enrichment source file and splits it into imports and body.
 * Strips the lint directive line, the zod import (already in the model),
 * and `export` keywords from declarations.
 */
export function parseEnrichmentSource(
  sourceFile: string,
): Promise<ParsedEnrichmentSource> {
  return parseSourceFile(sourceFile);
}

/**
 * Reads a list method enrichment source file and splits it into imports and body.
 * Same parsing logic as state enrichment — strips lint directives, zod imports,
 * and export keywords.
 */
export function parseListMethodSource(
  sourceFile: string,
): Promise<ParsedEnrichmentSource> {
  return parseSourceFile(sourceFile);
}
