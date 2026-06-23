// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/msk/replicator
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MSK Replicator (AWS::MSK::Replicator).
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

const AmazonMskClusterSchema = z.object({
  MskClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("The ARN of an Amazon MSK cluster."),
});

const ApacheKafkaClusterSchema = z.object({
  ApacheKafkaClusterId: z.string().describe(
    "The ID of the Apache Kafka cluster.",
  ),
  BootstrapBrokerString: z.string().describe(
    "The bootstrap broker string of the Apache Kafka cluster.",
  ),
});

const KafkaClusterClientVpcConfigSchema = z.object({
  SecurityGroupIds: z.array(z.string()).describe(
    "The AWS security groups to associate with the elastic network interfaces in order to specify what the replicator has access to. If a security group is not specified, the default security group associated with the VPC is used.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The list of subnets to connect to in the virtual private cloud (VPC). AWS creates elastic network interfaces inside these subnets.",
  ),
});

const KafkaClusterSaslScramAuthenticationSchema = z.object({
  Mechanism: z.enum(["SHA256", "SHA512"]).describe(
    "The SASL/SCRAM authentication mechanism.",
  ),
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Secrets Manager secret.",
  ),
});

const KafkaClusterMtlsAuthenticationSchema = z.object({
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Secrets Manager secret.",
  ),
});

const KafkaClusterClientAuthenticationSchema = z.object({
  SaslScram: KafkaClusterSaslScramAuthenticationSchema.describe(
    "Details for SASL/SCRAM client authentication.",
  ).optional(),
  MTLS: KafkaClusterMtlsAuthenticationSchema.describe(
    "Details for mTLS client authentication.",
  ).optional(),
});

const KafkaClusterEncryptionInTransitSchema = z.object({
  EncryptionType: z.enum(["TLS"]).describe(
    "The type of encryption in transit to the Apache Kafka cluster.",
  ),
  RootCaCertificate: z.string().describe("The root CA certificate.").optional(),
});

const KafkaClusterSchema = z.object({
  AmazonMskCluster: AmazonMskClusterSchema.describe(
    "Details of an Amazon MSK cluster.",
  ).optional(),
  ApacheKafkaCluster: ApacheKafkaClusterSchema.describe(
    "Details of an Apache Kafka cluster.",
  ).optional(),
  VpcConfig: KafkaClusterClientVpcConfigSchema.describe(
    "Details of an Amazon VPC which has network connectivity to the Apache Kafka cluster.",
  ).optional(),
  ClientAuthentication: KafkaClusterClientAuthenticationSchema.describe(
    "Details of the client authentication used by the Apache Kafka cluster.",
  ).optional(),
  EncryptionInTransit: KafkaClusterEncryptionInTransitSchema.describe(
    "Details of encryption in transit to the Apache Kafka cluster.",
  ).optional(),
});

const ReplicationStartingPositionSchema = z.object({
  Type: z.enum(["LATEST", "EARLIEST"]).describe(
    "The type of replication starting position.",
  ).optional(),
});

const ReplicationTopicNameConfigurationSchema = z.object({
  Type: z.enum(["PREFIXED_WITH_SOURCE_CLUSTER_ALIAS", "IDENTICAL"]).describe(
    "The type of replicated topic name.",
  ).optional(),
});

const TopicReplicationSchema = z.object({
  TopicsToReplicate: z.array(z.string().max(249)).describe(
    "List of regular expression patterns indicating the topics to copy.",
  ),
  TopicsToExclude: z.array(z.string().max(249)).describe(
    "List of regular expression patterns indicating the topics that should not be replicated.",
  ).optional(),
  CopyTopicConfigurations: z.boolean().describe(
    "Whether to periodically configure remote topics to match their corresponding upstream topics.",
  ).optional(),
  CopyAccessControlListsForTopics: z.boolean().describe(
    "Whether to periodically configure remote topic ACLs to match their corresponding upstream topics.",
  ).optional(),
  DetectAndCopyNewTopics: z.boolean().describe(
    "Whether to periodically check for new topics and partitions.",
  ).optional(),
  StartingPosition: ReplicationStartingPositionSchema.describe(
    "Configuration for specifying the position in the topics to start replicating from.",
  ).optional(),
  TopicNameConfiguration: ReplicationTopicNameConfigurationSchema.describe(
    "Configuration for specifying replicated topic names should be the same as their corresponding upstream topics or prefixed with source cluster alias.",
  ).optional(),
});

const ConsumerGroupReplicationSchema = z.object({
  ConsumerGroupsToReplicate: z.array(z.string().max(256)).describe(
    "List of regular expression patterns indicating the consumer groups to copy.",
  ),
  ConsumerGroupsToExclude: z.array(z.string().max(256)).describe(
    "List of regular expression patterns indicating the consumer groups that should not be replicated.",
  ).optional(),
  SynchroniseConsumerGroupOffsets: z.boolean().describe(
    "Whether to periodically write the translated offsets to __consumer_offsets topic in target cluster.",
  ).optional(),
  DetectAndCopyNewConsumerGroups: z.boolean().describe(
    "Whether to periodically check for new consumer groups.",
  ).optional(),
  ConsumerGroupOffsetSyncMode: z.enum(["LEGACY", "ENHANCED"]).describe(
    "The consumer group offset synchronization mode.",
  ).optional(),
});

const ReplicationInfoSchema = z.object({
  SourceKafkaClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("Amazon Resource Name of the source Kafka cluster.").optional(),
  SourceKafkaClusterId: z.string().describe(
    "The ID of the source Kafka cluster.",
  ).optional(),
  TargetKafkaClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("Amazon Resource Name of the target Kafka cluster.").optional(),
  TargetKafkaClusterId: z.string().describe(
    "The ID of the target Kafka cluster.",
  ).optional(),
  TargetCompressionType: z.enum(["NONE", "GZIP", "SNAPPY", "LZ4", "ZSTD"])
    .describe(
      "The type of compression to use writing records to target Kafka cluster.",
    ),
  TopicReplication: TopicReplicationSchema.describe(
    "Configuration relating to topic replication.",
  ),
  ConsumerGroupReplication: ConsumerGroupReplicationSchema.describe(
    "Configuration relating to consumer group replication.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256),
});

const CloudWatchLogsSchema = z.object({
  Enabled: z.boolean().describe(
    "Whether log delivery to CloudWatch Logs is enabled.",
  ),
  LogGroup: z.string().describe(
    "The CloudWatch log group that is the destination for log delivery.",
  ).optional(),
});

const FirehoseSchema = z.object({
  Enabled: z.boolean().describe("Whether log delivery to Firehose is enabled."),
  DeliveryStream: z.string().describe(
    "The Firehose delivery stream that is the destination for log delivery.",
  ).optional(),
});

const S3Schema = z.object({
  Enabled: z.boolean().describe("Whether log delivery to S3 is enabled."),
  Bucket: z.string().describe(
    "The S3 bucket that is the destination for log delivery.",
  ).optional(),
  Prefix: z.string().describe(
    "The S3 prefix that is the destination for log delivery.",
  ).optional(),
});

const ReplicatorLogDeliverySchema = z.object({
  CloudWatchLogs: CloudWatchLogsSchema.describe(
    "Details of the CloudWatch Logs destination for replicator logs.",
  ).optional(),
  Firehose: FirehoseSchema.describe(
    "Details of the Kinesis Data Firehose delivery stream that is the destination for replicator logs.",
  ).optional(),
  S3: S3Schema.describe(
    "Details of the Amazon S3 destination for replicator logs.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  ReplicatorName: z.string().min(1).max(128).regex(
    new RegExp("^[0-9A-Za-z][0-9A-Za-z-]{0,}$"),
  ).describe("The name of the replicator."),
  Description: z.string().max(1024).describe(
    "A summary description of the replicator.",
  ).optional(),
  KafkaClusters: z.array(KafkaClusterSchema).describe(
    "Specifies a list of Kafka clusters which are targets of the replicator.",
  ),
  ReplicationInfoList: z.array(ReplicationInfoSchema).describe(
    "A list of replication configurations, where each configuration targets a given source cluster to target cluster replication flow.",
  ),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the replicator to access external resources.",
  ),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  LogDelivery: z.object({
    ReplicatorLogDelivery: ReplicatorLogDeliverySchema.describe(
      "The replicator logs configuration.",
    ).optional(),
  }).describe("Configuration for log delivery for the replicator.").optional(),
});

const StateSchema = z.object({
  ReplicatorArn: z.string(),
  ReplicatorName: z.string().optional(),
  CurrentVersion: z.string().optional(),
  Description: z.string().optional(),
  KafkaClusters: z.array(KafkaClusterSchema).optional(),
  ReplicationInfoList: z.array(ReplicationInfoSchema).optional(),
  ServiceExecutionRoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LogDelivery: z.object({
    ReplicatorLogDelivery: ReplicatorLogDeliverySchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ReplicatorName: z.string().min(1).max(128).regex(
    new RegExp("^[0-9A-Za-z][0-9A-Za-z-]{0,}$"),
  ).describe("The name of the replicator.").optional(),
  Description: z.string().max(1024).describe(
    "A summary description of the replicator.",
  ).optional(),
  KafkaClusters: z.array(KafkaClusterSchema).describe(
    "Specifies a list of Kafka clusters which are targets of the replicator.",
  ).optional(),
  ReplicationInfoList: z.array(ReplicationInfoSchema).describe(
    "A list of replication configurations, where each configuration targets a given source cluster to target cluster replication flow.",
  ).optional(),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the replicator to access external resources.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  LogDelivery: z.object({
    ReplicatorLogDelivery: ReplicatorLogDeliverySchema.describe(
      "The replicator logs configuration.",
    ).optional(),
  }).describe("Configuration for log delivery for the replicator.").optional(),
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

/** Swamp extension model for MSK Replicator. Registered at `@swamp/aws/msk/replicator`. */
export const model = {
  type: "@swamp/aws/msk/replicator",
  version: "2026.06.23.1",
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
      toVersion: "2026.04.21.1",
      description: "Added: LogDelivery",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MSK Replicator resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MSK Replicator",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MSK::Replicator",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a MSK Replicator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Replicator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MSK::Replicator",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a MSK Replicator",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const identifier = existing.ReplicatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MSK::Replicator",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MSK::Replicator",
          identifier,
          currentState,
          desiredState,
          [
            "ReplicatorName",
            "Description",
            "KafkaClusters",
            "ServiceExecutionRoleArn",
            "SourceKafkaClusterArn",
            "SourceKafkaClusterId",
            "TargetKafkaClusterArn",
            "TargetKafkaClusterId",
            "TargetCompressionType",
            "ConsumerGroupOffsetSyncMode",
            "StartingPosition",
            "TopicNameConfiguration",
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
      description: "Delete a MSK Replicator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Replicator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MSK::Replicator",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync MSK Replicator state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const identifier = existing.ReplicatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MSK::Replicator",
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
