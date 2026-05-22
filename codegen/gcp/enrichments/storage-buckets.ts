import type { GcpEnrichment } from "./types.ts";

export const enrichment: GcpEnrichment = {
  resourceId: "storage.buckets",
  npmImports: {},
  sourceFile: new URL("./storage-buckets.enrich.ts", import.meta.url).pathname,
  methodsExport: "iamBindingMethods",
};
