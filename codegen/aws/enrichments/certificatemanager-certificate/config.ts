import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::CertificateManager::Certificate",
  npmImports: {
    "@aws-sdk/client-acm": "npm:@aws-sdk/client-acm@3.1156.0",
  },
  sourceFile: new URL("./enrich.ts", import.meta.url).pathname,
  functionExport: "enrichState",
  stateFields: [
    "  NotAfter: z.string().optional(),",
    "  NotBefore: z.string().optional(),",
    "  Type: z.string().optional(),",
    "  Status: z.string().optional(),",
    "  RenewalEligibility: z.string().optional(),",
    "  InUseBy: z.array(z.string()).optional(),",
    "  RenewalSummary: AcmRenewalSummarySchema.optional(),",
  ].join("\n"),
};
