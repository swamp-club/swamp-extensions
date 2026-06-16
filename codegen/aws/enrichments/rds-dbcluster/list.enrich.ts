// deno-lint-ignore-file no-import-prefix

import {
  DescribeDBClustersCommand,
  RDSClient,
} from "npm:@aws-sdk/client-rds@3.1021.0";

export async function listClusters(
  filters?: Array<{ Name: string; Values: string[] }>,
  maxPages = 10,
): Promise<Record<string, unknown>[]> {
  const rdsClient = new RDSClient({
    region: Deno.env.get("AWS_REGION") || "us-east-1",
  });

  const clusters: Record<string, unknown>[] = [];
  let marker: string | undefined;
  let pages = 0;

  do {
    const command = new DescribeDBClustersCommand({
      Filters: filters as { Name: string; Values: string[] }[] | undefined,
      Marker: marker,
      MaxRecords: 100,
    });
    const response = await rdsClient.send(command);

    for (const cluster of response.DBClusters ?? []) {
      clusters.push({
        DBClusterIdentifier: cluster.DBClusterIdentifier,
        DBClusterArn: cluster.DBClusterArn,
        Engine: cluster.Engine,
        EngineVersion: cluster.EngineVersion,
        Status: cluster.Status,
        DatabaseName: cluster.DatabaseName,
        MasterUsername: cluster.MasterUsername,
        Port: cluster.Port,
        Endpoint: cluster.Endpoint,
        ReaderEndpoint: cluster.ReaderEndpoint,
        MultiAZ: cluster.MultiAZ,
        AvailabilityZones: cluster.AvailabilityZones,
        StorageEncrypted: cluster.StorageEncrypted,
        KmsKeyId: cluster.KmsKeyId,
        DbClusterResourceId: cluster.DbClusterResourceId,
        DeletionProtection: cluster.DeletionProtection,
        EngineMode: cluster.EngineMode,
        DBSubnetGroup: cluster.DBSubnetGroup,
        AllocatedStorage: cluster.AllocatedStorage,
        StorageType: cluster.StorageType,
        DBClusterParameterGroup: cluster.DBClusterParameterGroup,
        VpcSecurityGroups: cluster.VpcSecurityGroups?.map((sg) => ({
          VpcSecurityGroupId: sg.VpcSecurityGroupId,
          Status: sg.Status,
        })),
        DBClusterMembers: cluster.DBClusterMembers?.map((m) => ({
          DBInstanceIdentifier: m.DBInstanceIdentifier,
          IsClusterWriter: m.IsClusterWriter,
          DBClusterParameterGroupStatus: m.DBClusterParameterGroupStatus,
          PromotionTier: m.PromotionTier,
        })),
        TagList: cluster.TagList?.map((t) => ({
          Key: t.Key,
          Value: t.Value,
        })),
      });
    }

    marker = response.Marker;
    pages++;
  } while (marker && pages < maxPages);

  return clusters;
}
