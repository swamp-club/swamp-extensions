// Auto-generated extension model for @swamp/aws/elasticache/cache-cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElastiCache CacheCluster (AWS::ElastiCache::CacheCluster).
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

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const CloudWatchLogsDestinationDetailsSchema = z.object({
  LogGroup: z.string().describe("The name of the CloudWatch Logs log group."),
});

const KinesisFirehoseDestinationDetailsSchema = z.object({
  DeliveryStream: z.string().describe(
    "The name of the Kinesis Data Firehose delivery stream",
  ),
});

const DestinationDetailsSchema = z.object({
  CloudWatchLogsDetails: CloudWatchLogsDestinationDetailsSchema.describe(
    "The configuration details of the CloudWatch Logs destination",
  ).optional(),
  KinesisFirehoseDetails: KinesisFirehoseDestinationDetailsSchema.describe(
    "The configuration details of the Kinesis Data Firehose destination.",
  ).optional(),
});

const LogDeliveryConfigurationRequestSchema = z.object({
  LogType: z.string().describe(
    "Valid value is either slow-log, which refers to slow-log or engine-log",
  ),
  LogFormat: z.string().describe("Valid values are either json or text"),
  DestinationType: z.string().describe(
    "Specify either CloudWatch Logs or Kinesis Data Firehose as the destination type.",
  ),
  DestinationDetails: DestinationDetailsSchema.describe(
    "Configuration details of either a CloudWatch Logs destination or Kinesis Data Firehose destination.",
  ),
});

const GlobalArgsSchema = z.object({
  AutoMinorVersionUpgrade: z.boolean().describe(
    "If you are running Redis engine version 6.0 or later, set this parameter to yes if you want to opt-in to the next minor version upgrade campaign.",
  ).optional(),
  AZMode: z.string().describe(
    "Specifies whether the nodes in this Memcached cluster are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region.",
  ).optional(),
  CacheNodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the node group (shard).",
  ),
  CacheParameterGroupName: z.string().describe(
    "The name of the parameter group to associate with this cluster.",
  ).optional(),
  CacheSecurityGroupNames: z.array(z.string()).describe(
    "A list of security group names to associate with this cluster.",
  ).optional(),
  CacheSubnetGroupName: z.string().describe(
    "The name of the subnet group to be used for the cluster.",
  ).optional(),
  NotificationTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent.",
  ).optional(),
  SnapshotArns: z.array(z.string()).describe(
    "A single-element string list containing an Amazon Resource Name (ARN) that uniquely identifies a Redis RDB snapshot file stored in Amazon S3.",
  ).optional(),
  NumCacheNodes: z.number().int().describe(
    "The number of cache nodes that the cache cluster should have.",
  ),
  SnapshotName: z.string().describe(
    "The name of a Redis snapshot from which to restore data into the new node group (shard).",
  ).optional(),
  PreferredAvailabilityZones: z.array(z.string()).describe(
    "A list of the Availability Zones in which cache nodes are created. The order of the zones in the list is not important.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "One or more VPC security groups associated with the cluster.",
  ).optional(),
  ClusterName: z.string().describe("A name for the cache cluster.").optional(),
  Engine: z.string().describe(
    "The name of the cache engine to be used for this cluster.",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of tags to be added to this resource.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the cache engine to be used for this cluster",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which maintenance on the cluster is performed.",
  ).optional(),
  PreferredAvailabilityZone: z.string().describe(
    "The EC2 Availability Zone in which the cluster is created.",
  ).optional(),
  SnapshotWindow: z.string().describe(
    "The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard).",
  ).optional(),
  NetworkType: z.string().describe(
    "The network type parameter for cachecluster.",
  ).optional(),
  IpDiscovery: z.string().describe(
    "The Ip Discovery parameter for cachecluster.",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The number of days for which ElastiCache retains automatic snapshots before deleting them.",
  ).optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .describe("Specifies the destination, format and type of the logs")
    .optional(),
  TransitEncryptionEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true. You cannot modify the value of TransitEncryptionEnabled after the cluster is created",
  ).optional(),
});

const StateSchema = z.object({
  AutoMinorVersionUpgrade: z.boolean().optional(),
  AZMode: z.string().optional(),
  CacheNodeType: z.string().optional(),
  CacheParameterGroupName: z.string().optional(),
  CacheSecurityGroupNames: z.array(z.string()).optional(),
  CacheSubnetGroupName: z.string().optional(),
  NotificationTopicArn: z.string().optional(),
  SnapshotArns: z.array(z.string()).optional(),
  Port: z.number().optional(),
  NumCacheNodes: z.number().optional(),
  SnapshotName: z.string().optional(),
  PreferredAvailabilityZones: z.array(z.string()).optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  ClusterName: z.string(),
  Engine: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  EngineVersion: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  PreferredAvailabilityZone: z.string().optional(),
  SnapshotWindow: z.string().optional(),
  NetworkType: z.string().optional(),
  IpDiscovery: z.string().optional(),
  SnapshotRetentionLimit: z.number().optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .optional(),
  TransitEncryptionEnabled: z.boolean().optional(),
  ConfigurationEndpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  RedisEndpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AutoMinorVersionUpgrade: z.boolean().describe(
    "If you are running Redis engine version 6.0 or later, set this parameter to yes if you want to opt-in to the next minor version upgrade campaign.",
  ).optional(),
  AZMode: z.string().describe(
    "Specifies whether the nodes in this Memcached cluster are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region.",
  ).optional(),
  CacheNodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the node group (shard).",
  ).optional(),
  CacheParameterGroupName: z.string().describe(
    "The name of the parameter group to associate with this cluster.",
  ).optional(),
  CacheSecurityGroupNames: z.array(z.string()).describe(
    "A list of security group names to associate with this cluster.",
  ).optional(),
  CacheSubnetGroupName: z.string().describe(
    "The name of the subnet group to be used for the cluster.",
  ).optional(),
  NotificationTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent.",
  ).optional(),
  SnapshotArns: z.array(z.string()).describe(
    "A single-element string list containing an Amazon Resource Name (ARN) that uniquely identifies a Redis RDB snapshot file stored in Amazon S3.",
  ).optional(),
  NumCacheNodes: z.number().int().describe(
    "The number of cache nodes that the cache cluster should have.",
  ).optional(),
  SnapshotName: z.string().describe(
    "The name of a Redis snapshot from which to restore data into the new node group (shard).",
  ).optional(),
  PreferredAvailabilityZones: z.array(z.string()).describe(
    "A list of the Availability Zones in which cache nodes are created. The order of the zones in the list is not important.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "One or more VPC security groups associated with the cluster.",
  ).optional(),
  ClusterName: z.string().describe("A name for the cache cluster.").optional(),
  Engine: z.string().describe(
    "The name of the cache engine to be used for this cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to be added to this resource.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the cache engine to be used for this cluster",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which maintenance on the cluster is performed.",
  ).optional(),
  PreferredAvailabilityZone: z.string().describe(
    "The EC2 Availability Zone in which the cluster is created.",
  ).optional(),
  SnapshotWindow: z.string().describe(
    "The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard).",
  ).optional(),
  NetworkType: z.string().describe(
    "The network type parameter for cachecluster.",
  ).optional(),
  IpDiscovery: z.string().describe(
    "The Ip Discovery parameter for cachecluster.",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The number of days for which ElastiCache retains automatic snapshots before deleting them.",
  ).optional(),
  LogDeliveryConfigurations: z.array(LogDeliveryConfigurationRequestSchema)
    .describe("Specifies the destination, format and type of the logs")
    .optional(),
  TransitEncryptionEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true. You cannot modify the value of TransitEncryptionEnabled after the cluster is created",
  ).optional(),
});

/** Swamp extension model for ElastiCache CacheCluster. Registered at `@swamp/aws/elasticache/cache-cluster`. */
export const model = {
  type: "@swamp/aws/elasticache/cache-cluster",
  version: "2026.05.06.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElastiCache CacheCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElastiCache CacheCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElastiCache::CacheCluster",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ClusterName ?? g.ClusterName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ElastiCache CacheCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache CacheCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ElastiCache::CacheCluster",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.ClusterName ?? context.globalArgs.ClusterName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElastiCache CacheCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ClusterName?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ClusterName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElastiCache::CacheCluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElastiCache::CacheCluster",
          identifier,
          currentState,
          desiredState,
          [
            "Port",
            "SnapshotArns",
            "SnapshotName",
            "CacheSubnetGroupName",
            "ClusterName",
            "Engine",
            "NetworkType",
          ],
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
      description: "Delete a ElastiCache CacheCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache CacheCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ElastiCache::CacheCluster",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ClusterName?.toString() ?? args.identifier)
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
      description: "Sync ElastiCache CacheCluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ClusterName?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ClusterName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElastiCache::CacheCluster",
            identifier,
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
