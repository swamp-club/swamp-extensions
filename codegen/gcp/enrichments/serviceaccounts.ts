import type { GcpEnrichment } from "./types.ts";

export const enrichment: GcpEnrichment = {
  resourceId: "iam.serviceAccounts",
  npmImports: {},
  sourceFile: new URL("./serviceaccounts.enrich.ts", import.meta.url).pathname,
  methodsExport: "iamBindingMethods",
};
