// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.3.6";
import {
  DescribeDBClustersCommand,
  DescribeDBInstancesCommand,
  RDSClient,
} from "npm:@aws-sdk/client-rds@3.1021.0";

export const DBClusterMemberSchema = z.object({
  DBInstanceIdentifier: z.string().optional(),
  IsClusterWriter: z.boolean().optional(),
  DBClusterParameterGroupStatus: z.string().optional(),
  PromotionTier: z.number().optional(),
  DBInstanceClass: z.string().optional(),
  AvailabilityZone: z.string().optional(),
});

export async function enrichState(
  state: { DBClusterIdentifier?: string } & Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const id = state.DBClusterIdentifier;
  if (!id) return state;
  try {
    const rdsClient = new RDSClient({
      region: Deno.env.get("AWS_REGION") || "us-east-1",
    });
    const descResp = await rdsClient.send(
      new DescribeDBClustersCommand({ DBClusterIdentifier: id }),
    );
    const cluster = descResp.DBClusters?.[0];
    if (!cluster?.DBClusterMembers) return state;
    const instanceMap = new Map<
      string,
      { DBInstanceClass?: string; AvailabilityZone?: string }
    >();
    try {
      let marker: string | undefined;
      do {
        const instResp = await rdsClient.send(
          new DescribeDBInstancesCommand({
            Filters: [{ Name: "db-cluster-id", Values: [id] }],
            Marker: marker,
          }),
        );
        for (const inst of instResp.DBInstances ?? []) {
          if (inst.DBInstanceIdentifier) {
            instanceMap.set(inst.DBInstanceIdentifier, {
              DBInstanceClass: inst.DBInstanceClass,
              AvailabilityZone: inst.AvailabilityZone,
            });
          }
        }
        marker = instResp.Marker;
      } while (marker);
    } catch {
      // Instance details are best-effort enrichment
    }
    return {
      ...state,
      DBClusterMembers: cluster.DBClusterMembers.map((m) => ({
        DBInstanceIdentifier: m.DBInstanceIdentifier,
        IsClusterWriter: m.IsClusterWriter,
        DBClusterParameterGroupStatus: m.DBClusterParameterGroupStatus,
        PromotionTier: m.PromotionTier,
        ...instanceMap.get(m.DBInstanceIdentifier ?? ""),
      })),
    };
  } catch {
    return state;
  }
}
