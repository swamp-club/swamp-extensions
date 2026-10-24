// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.6.7";
import {
  DescribeDBClustersCommand,
  DescribeDBInstancesCommand,
  RDSClient,
} from "npm:@aws-sdk/client-rds@3.1156.0";
import type { AwsCredentials } from "../../../../model/aws/rds/extensions/models/_lib/aws.ts";

export const DBClusterMemberSchema = z.object({
  DBInstanceIdentifier: z.string().optional(),
  IsClusterWriter: z.boolean().optional(),
  DBClusterParameterGroupStatus: z.string().optional(),
  PromotionTier: z.number().optional(),
  DBInstanceClass: z.string().optional(),
  AvailabilityZone: z.string().optional(),
});

export async function enrichState(
  state:
    & { DBClusterIdentifier?: string; DBClusterArn?: string }
    & Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const id = state.DBClusterIdentifier;
  if (!id) return state;
  try {
    // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
    if (
      !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
      !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
      !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
    ) {
      Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
    }
    // The cluster lives in the region its ARN names, which is where the
    // CloudControl read found it, whatever the profile or env would resolve.
    const config: Record<string, unknown> = {
      region: state.DBClusterArn?.split(":")[3] ||
        credentials.region ||
        Deno.env.get("AWS_REGION") ||
        Deno.env.get("AWS_DEFAULT_REGION") ||
        "us-east-1",
    };
    if (credentials.accessKeyId && credentials.secretAccessKey) {
      config.credentials = {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        ...(credentials.sessionToken
          ? { sessionToken: credentials.sessionToken }
          : {}),
      };
    }
    const rdsClient = new RDSClient(config);
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
