import type { GcpEnrichment } from "./types.ts";

export const enrichment: GcpEnrichment = {
  resourceId: "cloudasset.assets",
  npmImports: {},
  sourceFile: new URL(
    "./cloudasset-assets.enrich.ts",
    import.meta.url,
  ).pathname,
  methodsExport: "assetInventoryMethods",
};
