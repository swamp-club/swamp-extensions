export interface GcpEnrichment {
  /** Discovery API resource identifier, e.g., "storage.buckets" */
  resourceId: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Absolute path to the enrichment source file (real TypeScript, type-checkable) */
  sourceFile: string;
  /** Name of the exported object containing additional method definitions */
  methodsExport: string;
}

export interface ParsedEnrichmentSource {
  /** Import lines to add to the generated model (SDK imports from the source) */
  imports: string[];
  /** The body code (schemas + methods object) with export keywords stripped */
  body: string;
}
