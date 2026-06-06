// Auto-generated extension model for @swamp/aws/elasticache/replication-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElastiCache ReplicationGroup (AWS::ElastiCache::ReplicationGroup).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const NodeGroupConfigurationSchema = z.object({
  Slots: z.string().describe(
    "A string of comma-separated values where the first set of values are the slot numbers (zero based), and the second set of values are the keyspaces for each slot. The following example specifies three slots (numbered 0, 1, and 2): 0,1,2,0-4999,5000-9999,10000-16,383.",
  ).optional(),
  PrimaryAvailabilityZone: z.string().describe(
    "The Availability Zone where the primary node of this node group (shard) is launched.",
  ).optional(),
  ReplicaAvailabilityZones: z.array(z.string()).describe(
    "A list of Availability Zones to be used for the read replicas. The number of Availability Zones in this list must match the value of ReplicaCount or ReplicasPerNodeGroup if not specified.",
  ).optional(),
  NodeGroupId: z.string().describe(
    "Either the ElastiCache for Redis supplied 4-digit id or a user supplied id for the node group these configuration values apply to.",
  ).optional(),
  ReplicaCount: z.number().int().describe(
    "The number of read replica nodes in this node group (shard).",
  ).optional(),
});

const CloudWatchLogsDestinationDetailsSchema = z.object({
  LogGroup: z.string().describe("The name of the CloudWatch Logs log group."),
});

const KinesisFirehoseDestinationDetailsSchema = z.object({
  DeliveryStream: z.string().describe(
    "The name of the Kinesis Data Firehose delivery stream.",
  ),
});

const DestinationDetailsSchema = z.object({
  CloudWatchLogsDetails: CloudWatchLogsDestinationDetailsSchema.describe(
    "The configuration details of the CloudWatch Logs destination. Note that this field is marked as required but only if CloudWatch Logs was chosen as the destination.",
  ).optional(),
  KinesisFirehoseDetails: KinesisFirehoseDestinationDetailsSchema.describe(
    "The configuration details of the Kinesis Data Firehose destination. Note that this field is marked as required but only if Kinesis Data Firehose was chosen as the destination.",
  ).optional(),
});

const LogDeliveryConfigurationRequestSchema = z.object({
  DestinationDetails: DestinationDetailsSchema.describe(
    "Configuration details of either a CloudWatch Logs destination or Kinesis Data Firehose destination.",
  ),
  DestinationType: z.string().describe(
    "Specify either CloudWatch Logs or Kinesis Data Firehose as the destination type. Valid values are either cloudwatch-logs or kinesis-firehose.",
  ),
  LogFormat: z.string().describe("Valid values are either json or text."),
  LogType: z.string().describe(
    "Valid value is either slow-log, which refers to slow-log or engine-log.",
  ),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ReplicationGroupId: z.string().describe(
    "The replication group identifier. This parameter is stored as a lowercase string.",
  ).optional(),
  PreferredCacheClusterAZs: z.array(z.string()).describe(
    "A list of EC2 Availability Zones in which the replication group's clusters are created. The order of the Availability Zones in the list is the order in which clusters are allocated. The primary cluster is created in the first AZ in the list. This parameter is not used if there is more than one node group (shard). You should use NodeGroupConfiguration instead.",
  ).optional(),
  CacheSecurityGroupNames: z.array(z.string()).describe(
    "A list of cache security group names to associate with this replication group.",
  ).optional(),
  NodeGroupConfiguration: z.array(NodeGroupConfigurationSchema).describe(
    "NodeGroupConfiguration is a property of the AWS::ElastiCache::ReplicationGroup resource that configures an Amazon ElastiCache (ElastiCache) Redis cluster node group.",
  ).optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .describe("Specifies the destination, format and type of the logs.")
    .optional(),
  SnapshotArns: z.array(z.string()).describe(
    "A list of Amazon Resource Names (ARN) that uniquely identify the Redis RDB snapshot files stored in Amazon S3.",
  ).optional(),
  UserGroupIds: z.array(z.string()).describe(
    "The ID of user group to associate with the replication group.",
  ).optional(),
  NumNodeGroups: z.number().int().describe(
    "An optional parameter that specifies the number of node groups (shards) for this Redis (cluster mode enabled) replication group. For Redis (cluster mode disabled) either omit this parameter or set it to 1.",
  ).optional(),
  NotificationTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent.",
  ).optional(),
  SnapshotName: z.string().describe(
    "The name of a snapshot from which to restore data into the new replication group. The snapshot status changes to restoring while the new replication group is being created.",
  ).optional(),
  AutomaticFailoverEnabled: z.boolean().describe(
    "Specifies whether a read-only replica is automatically promoted to read/write primary if the existing primary fails. AutomaticFailoverEnabled must be enabled for Redis (cluster mode enabled) replication groups.",
  ).optional(),
  ReplicasPerNodeGroup: z.number().int().describe(
    "An optional parameter that specifies the number of replica nodes in each node group (shard). Valid values are 0 to 5. **Note:** Using ReplicasPerNodeGroup with NodeGroupConfiguration results in resource replacement. For online scaling, use ReplicasPerNodeGroup alone.",
  ).optional(),
  ReplicationGroupDescription: z.string().describe(
    "A user-created description for the replication group.",
  ),
  MultiAZEnabled: z.boolean().describe(
    "A flag indicating if you have Multi-AZ enabled to enhance fault tolerance. For more information, see Minimizing Downtime: Multi-AZ.",
  ).optional(),
  TransitEncryptionEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true.",
  ).optional(),
  Engine: z.string().describe(
    "The name of the cache engine to be used for the clusters in this replication group.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of cost allocation tags to be added to this resource. Tags are comma-separated key,value pairs (e.g. Key=myKey, Value=myKeyValue. You can include multiple tags as shown following: Key=myKey, Value=myKeyValue Key=mySecondKey, Value=mySecondKeyValue.",
  ).optional(),
  NumCacheClusters: z.number().int().describe(
    "The number of clusters this replication group initially has.This parameter is not used if there is more than one node group (shard). You should use ReplicasPerNodeGroup instead.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the cache engine to be used for the clusters in this replication group. To view the supported cache engine versions, use the DescribeCacheEngineVersions operation.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The ID of the KMS key used to encrypt the disk on the cluster.",
  ).optional(),
  CacheSubnetGroupName: z.string().describe(
    "The name of the cache subnet group to be used for the replication group.",
  ).optional(),
  CacheParameterGroupName: z.string().describe(
    "The name of the parameter group to associate with this replication group. If this argument is omitted, the default cache parameter group for the specified engine is used.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.",
  ).optional(),
  PrimaryClusterId: z.string().describe(
    "The identifier of the cluster that serves as the primary for this replication group. This cluster must already exist and have a status of available.",
  ).optional(),
  AtRestEncryptionEnabled: z.boolean().describe(
    "A flag that enables encryption at rest when set to true.AtRestEncryptionEnabled after the replication group is created. To enable encryption at rest on a replication group you must set AtRestEncryptionEnabled to true when you create the replication group.",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "This parameter is currently disabled.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "One or more Amazon VPC security groups associated with this replication group.",
  ).optional(),
  SnapshotWindow: z.string().describe(
    "The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard).",
  ).optional(),
  CacheNodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the node group (shard).",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The number of days for which ElastiCache retains automatic snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot that was taken today is retained for 5 days before being deleted.",
  ).optional(),
  SnapshottingClusterId: z.string().describe(
    "The cluster ID that is used as the daily snapshot source for the replication group. This parameter cannot be set for Redis (cluster mode enabled) replication groups.",
  ).optional(),
  AuthToken: z.string().describe(
    "Reserved parameter. The password used to access a password protected server.AuthToken can be specified only on replication groups where TransitEncryptionEnabled is true. For more information.",
  ).optional(),
  IpDiscovery: z.string().describe(
    "The network type you choose when creating a replication group, either ipv4 | ipv6. IPv6 is supported for workloads using Redis OSS engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the Nitro system.",
  ).optional(),
  NetworkType: z.string().describe(
    "Must be either ipv4 | ipv6 | dual_stack. IPv6 is supported for workloads using Redis OSS engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the Nitro system",
  ).optional(),
  GlobalReplicationGroupId: z.string().describe(
    "The name of the Global datastore",
  ).optional(),
  DataTieringEnabled: z.boolean().describe(
    "Enables data tiering. Data tiering is only supported for replication groups using the r6gd node type. This parameter must be set to true when using r6gd nodes.",
  ).optional(),
  TransitEncryptionMode: z.string().describe(
    "A setting that allows you to migrate your clients to use in-transit encryption, with no downtime. When setting TransitEncryptionEnabled to true, you can set your TransitEncryptionMode to preferred in the same request, to allow both encrypted and unencrypted connections at the same time. Once you migrate all your Redis OSS clients to use encrypted connections you can modify the value to required to allow encrypted connections only. Setting TransitEncryptionMode to required is a two-step process that requires you to first set the TransitEncryptionMode to preferred, after that you can set TransitEncryptionMode to required. This process will not trigger the replacement of the replication group.",
  ).optional(),
  ClusterMode: z.string().describe(
    "Enabled or Disabled. To modify cluster mode from Disabled to Enabled, you must first set the cluster mode to Compatible. Compatible mode allows your Redis OSS clients to connect using both cluster mode enabled and cluster mode disabled. After you migrate all Redis OSS clients to use cluster mode enabled, you can then complete cluster mode configuration and set the cluster mode to Enabled. For more information, see Modify cluster mode.",
  ).optional(),
  Durability: z.enum(["default", "async", "sync", "disabled"]).describe(
    "The durability setting for the replication group. Valid values: default, async, sync, disabled. Enabling durability on an existing non-durable cluster or disabling durability on an existing durable cluster is not currently supported and will result in an error; specify the desired durability at create time. The resolved state is returned in EffectiveDurability.",
  ).optional(),
});

const StateSchema = z.object({
  ReplicationGroupId: z.string(),
  PreferredCacheClusterAZs: z.array(z.string()).optional(),
  PrimaryEndPoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  CacheSecurityGroupNames: z.array(z.string()).optional(),
  NodeGroupConfiguration: z.array(NodeGroupConfigurationSchema).optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .optional(),
  SnapshotArns: z.array(z.string()).optional(),
  UserGroupIds: z.array(z.string()).optional(),
  ConfigurationEndPoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  ReadEndPoint: z.object({
    Addresses: z.string(),
    AddressesList: z.array(z.string()),
    Ports: z.string(),
    PortsList: z.array(z.string()),
  }).optional(),
  ReaderEndPoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  Port: z.number().optional(),
  NumNodeGroups: z.number().optional(),
  NotificationTopicArn: z.string().optional(),
  SnapshotName: z.string().optional(),
  AutomaticFailoverEnabled: z.boolean().optional(),
  ReplicasPerNodeGroup: z.number().optional(),
  ReplicationGroupDescription: z.string().optional(),
  MultiAZEnabled: z.boolean().optional(),
  TransitEncryptionEnabled: z.boolean().optional(),
  Engine: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  NumCacheClusters: z.number().optional(),
  EngineVersion: z.string().optional(),
  KmsKeyId: z.string().optional(),
  CacheSubnetGroupName: z.string().optional(),
  CacheParameterGroupName: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  PrimaryClusterId: z.string().optional(),
  AtRestEncryptionEnabled: z.boolean().optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  SnapshotWindow: z.string().optional(),
  CacheNodeType: z.string().optional(),
  SnapshotRetentionLimit: z.number().optional(),
  SnapshottingClusterId: z.string().optional(),
  AuthToken: z.string().optional(),
  IpDiscovery: z.string().optional(),
  NetworkType: z.string().optional(),
  GlobalReplicationGroupId: z.string().optional(),
  DataTieringEnabled: z.boolean().optional(),
  TransitEncryptionMode: z.string().optional(),
  ClusterMode: z.string().optional(),
  Durability: z.string().optional(),
  EffectiveDurability: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ReplicationGroupId: z.string().describe(
    "The replication group identifier. This parameter is stored as a lowercase string.",
  ).optional(),
  PreferredCacheClusterAZs: z.array(z.string()).describe(
    "A list of EC2 Availability Zones in which the replication group's clusters are created. The order of the Availability Zones in the list is the order in which clusters are allocated. The primary cluster is created in the first AZ in the list. This parameter is not used if there is more than one node group (shard). You should use NodeGroupConfiguration instead.",
  ).optional(),
  CacheSecurityGroupNames: z.array(z.string()).describe(
    "A list of cache security group names to associate with this replication group.",
  ).optional(),
  NodeGroupConfiguration: z.array(NodeGroupConfigurationSchema).describe(
    "NodeGroupConfiguration is a property of the AWS::ElastiCache::ReplicationGroup resource that configures an Amazon ElastiCache (ElastiCache) Redis cluster node group.",
  ).optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .describe("Specifies the destination, format and type of the logs.")
    .optional(),
  SnapshotArns: z.array(z.string()).describe(
    "A list of Amazon Resource Names (ARN) that uniquely identify the Redis RDB snapshot files stored in Amazon S3.",
  ).optional(),
  UserGroupIds: z.array(z.string()).describe(
    "The ID of user group to associate with the replication group.",
  ).optional(),
  NumNodeGroups: z.number().int().describe(
    "An optional parameter that specifies the number of node groups (shards) for this Redis (cluster mode enabled) replication group. For Redis (cluster mode disabled) either omit this parameter or set it to 1.",
  ).optional(),
  NotificationTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent.",
  ).optional(),
  SnapshotName: z.string().describe(
    "The name of a snapshot from which to restore data into the new replication group. The snapshot status changes to restoring while the new replication group is being created.",
  ).optional(),
  AutomaticFailoverEnabled: z.boolean().describe(
    "Specifies whether a read-only replica is automatically promoted to read/write primary if the existing primary fails. AutomaticFailoverEnabled must be enabled for Redis (cluster mode enabled) replication groups.",
  ).optional(),
  ReplicasPerNodeGroup: z.number().int().describe(
    "An optional parameter that specifies the number of replica nodes in each node group (shard). Valid values are 0 to 5. **Note:** Using ReplicasPerNodeGroup with NodeGroupConfiguration results in resource replacement. For online scaling, use ReplicasPerNodeGroup alone.",
  ).optional(),
  ReplicationGroupDescription: z.string().describe(
    "A user-created description for the replication group.",
  ).optional(),
  MultiAZEnabled: z.boolean().describe(
    "A flag indicating if you have Multi-AZ enabled to enhance fault tolerance. For more information, see Minimizing Downtime: Multi-AZ.",
  ).optional(),
  TransitEncryptionEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true.",
  ).optional(),
  Engine: z.string().describe(
    "The name of the cache engine to be used for the clusters in this replication group.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of cost allocation tags to be added to this resource. Tags are comma-separated key,value pairs (e.g. Key=myKey, Value=myKeyValue. You can include multiple tags as shown following: Key=myKey, Value=myKeyValue Key=mySecondKey, Value=mySecondKeyValue.",
  ).optional(),
  NumCacheClusters: z.number().int().describe(
    "The number of clusters this replication group initially has.This parameter is not used if there is more than one node group (shard). You should use ReplicasPerNodeGroup instead.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the cache engine to be used for the clusters in this replication group. To view the supported cache engine versions, use the DescribeCacheEngineVersions operation.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The ID of the KMS key used to encrypt the disk on the cluster.",
  ).optional(),
  CacheSubnetGroupName: z.string().describe(
    "The name of the cache subnet group to be used for the replication group.",
  ).optional(),
  CacheParameterGroupName: z.string().describe(
    "The name of the parameter group to associate with this replication group. If this argument is omitted, the default cache parameter group for the specified engine is used.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.",
  ).optional(),
  PrimaryClusterId: z.string().describe(
    "The identifier of the cluster that serves as the primary for this replication group. This cluster must already exist and have a status of available.",
  ).optional(),
  AtRestEncryptionEnabled: z.boolean().describe(
    "A flag that enables encryption at rest when set to true.AtRestEncryptionEnabled after the replication group is created. To enable encryption at rest on a replication group you must set AtRestEncryptionEnabled to true when you create the replication group.",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "This parameter is currently disabled.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "One or more Amazon VPC security groups associated with this replication group.",
  ).optional(),
  SnapshotWindow: z.string().describe(
    "The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard).",
  ).optional(),
  CacheNodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the node group (shard).",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The number of days for which ElastiCache retains automatic snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot that was taken today is retained for 5 days before being deleted.",
  ).optional(),
  SnapshottingClusterId: z.string().describe(
    "The cluster ID that is used as the daily snapshot source for the replication group. This parameter cannot be set for Redis (cluster mode enabled) replication groups.",
  ).optional(),
  AuthToken: z.string().describe(
    "Reserved parameter. The password used to access a password protected server.AuthToken can be specified only on replication groups where TransitEncryptionEnabled is true. For more information.",
  ).optional(),
  IpDiscovery: z.string().describe(
    "The network type you choose when creating a replication group, either ipv4 | ipv6. IPv6 is supported for workloads using Redis OSS engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the Nitro system.",
  ).optional(),
  NetworkType: z.string().describe(
    "Must be either ipv4 | ipv6 | dual_stack. IPv6 is supported for workloads using Redis OSS engine version 6.2 onward or Memcached engine version 1.6.6 on all instances built on the Nitro system",
  ).optional(),
  GlobalReplicationGroupId: z.string().describe(
    "The name of the Global datastore",
  ).optional(),
  DataTieringEnabled: z.boolean().describe(
    "Enables data tiering. Data tiering is only supported for replication groups using the r6gd node type. This parameter must be set to true when using r6gd nodes.",
  ).optional(),
  TransitEncryptionMode: z.string().describe(
    "A setting that allows you to migrate your clients to use in-transit encryption, with no downtime. When setting TransitEncryptionEnabled to true, you can set your TransitEncryptionMode to preferred in the same request, to allow both encrypted and unencrypted connections at the same time. Once you migrate all your Redis OSS clients to use encrypted connections you can modify the value to required to allow encrypted connections only. Setting TransitEncryptionMode to required is a two-step process that requires you to first set the TransitEncryptionMode to preferred, after that you can set TransitEncryptionMode to required. This process will not trigger the replacement of the replication group.",
  ).optional(),
  ClusterMode: z.string().describe(
    "Enabled or Disabled. To modify cluster mode from Disabled to Enabled, you must first set the cluster mode to Compatible. Compatible mode allows your Redis OSS clients to connect using both cluster mode enabled and cluster mode disabled. After you migrate all Redis OSS clients to use cluster mode enabled, you can then complete cluster mode configuration and set the cluster mode to Enabled. For more information, see Modify cluster mode.",
  ).optional(),
  Durability: z.enum(["default", "async", "sync", "disabled"]).describe(
    "The durability setting for the replication group. Valid values: default, async, sync, disabled. Enabling durability on an existing non-durable cluster or disabling durability on an existing durable cluster is not currently supported and will result in an error; specify the desired durability at create time. The resolved state is returned in EffectiveDurability.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for ElastiCache ReplicationGroup. Registered at `@swamp/aws/elasticache/replication-group`. */
export const model = {
  type: "@swamp/aws/elasticache/replication-group",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.03.1",
      description: "Added: Durability",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElastiCache ReplicationGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElastiCache ReplicationGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElastiCache::ReplicationGroup",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ReplicationGroupId ?? g.ReplicationGroupId)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ElastiCache ReplicationGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache ReplicationGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElastiCache::ReplicationGroup",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ReplicationGroupId ?? context.globalArgs.ReplicationGroupId)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElastiCache ReplicationGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ReplicationGroupId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ReplicationGroupId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElastiCache::ReplicationGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElastiCache::ReplicationGroup",
          identifier,
          currentState,
          desiredState,
          [
            "AtRestEncryptionEnabled",
            "CacheSubnetGroupName",
            "DataTieringEnabled",
            "GlobalReplicationGroupId",
            "KmsKeyId",
            "NetworkType",
            "Port",
            "PreferredCacheClusterAZs",
            "ReplicationGroupId",
            "SnapshotArns",
            "SnapshotName",
          ],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a ElastiCache ReplicationGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache ReplicationGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElastiCache::ReplicationGroup",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ReplicationGroupId?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync ElastiCache ReplicationGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ReplicationGroupId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ReplicationGroupId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElastiCache::ReplicationGroup",
            identifier,
            credentials,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              identifier,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
