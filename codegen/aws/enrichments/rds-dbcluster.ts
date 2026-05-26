import type { AwsEnrichment } from "./types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::RDS::DBCluster",
  npmImports: {
    "@aws-sdk/client-rds": "npm:@aws-sdk/client-rds@3.1021.0",
  },
  sourceFile: new URL("./rds-dbcluster.enrich.ts", import.meta.url).pathname,
  functionExport: "enrichState",
  stateFields: "  DBClusterMembers: z.array(DBClusterMemberSchema).optional(),",
  listMethod: {
    sourceFile: new URL("./rds-dbcluster-list.enrich.ts", import.meta.url)
      .pathname,
    functionExport: "listClusters",
    argumentFields: [
      `    filters: z.array(z.object({ Name: z.string(), Values: z.array(z.string()) })).describe("Optional filters to narrow results").optional(),`,
      `    maxPages: z.number().describe("Maximum number of pages to fetch (default: 10)").optional(),`,
    ],
    description: "List RDS DB clusters in the current region",
  },
};
