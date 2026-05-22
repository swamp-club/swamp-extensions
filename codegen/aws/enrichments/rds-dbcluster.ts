import type { AwsEnrichment } from "./types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::RDS::DBCluster",
  npmImports: {
    "@aws-sdk/client-rds": "npm:@aws-sdk/client-rds@3.1021.0",
  },
  sourceFile: new URL("./rds-dbcluster.enrich.ts", import.meta.url).pathname,
  functionExport: "enrichState",
  stateFields: "  DBClusterMembers: z.array(DBClusterMemberSchema).optional(),",
};
