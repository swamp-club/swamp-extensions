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

// Auto-generated extension model for @swamp/aws/kafkaconnect/connector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for KafkaConnect Connector (AWS::KafkaConnect::Connector).
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

const ScaleInPolicySchema = z.object({
  CpuUtilizationPercentage: z.number().int().min(1).max(100).describe(
    "Specifies the CPU utilization percentage threshold at which connector scale in should trigger.",
  ),
});

const ScaleOutPolicySchema = z.object({
  CpuUtilizationPercentage: z.number().int().min(1).max(100).describe(
    "Specifies the CPU utilization percentage threshold at which connector scale out should trigger.",
  ),
});

const AutoScalingSchema = z.object({
  MaxWorkerCount: z.number().int().describe(
    "The maximum number of workers for a connector.",
  ),
  MinWorkerCount: z.number().int().describe(
    "The minimum number of workers for a connector.",
  ),
  ScaleInPolicy: ScaleInPolicySchema.describe(
    "Information about the scale in policy of the connector.",
  ),
  ScaleOutPolicy: ScaleOutPolicySchema.describe(
    "Information about the scale out policy of the connector.",
  ),
  McuCount: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8)])
    .describe(
      "Specifies how many MSK Connect Units (MCU) as the minimum scaling unit.",
    ),
  MaxAutoscalingTaskCount: z.number().int().describe(
    "The maximum number of tasks allocated to the connector during autoscaling operations.",
  ).optional(),
});

const ProvisionedCapacitySchema = z.object({
  McuCount: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8)])
    .describe(
      "Specifies how many MSK Connect Units (MCU) are allocated to the connector.",
    ),
  WorkerCount: z.number().int().describe("Number of workers for a connector."),
});

const VpcSchema = z.object({
  SecurityGroups: z.array(z.string()).describe(
    "The AWS security groups to associate with the elastic network interfaces in order to specify what the connector has access to.",
  ),
  Subnets: z.array(z.string()).describe(
    "The list of subnets to connect to in the virtual private cloud (VPC). AWS creates elastic network interfaces inside these subnets.",
  ),
});

const ApacheKafkaClusterSchema = z.object({
  BootstrapServers: z.string().describe(
    "The bootstrap servers string of the Apache Kafka cluster.",
  ),
  Vpc: VpcSchema.describe("Information about a VPC used with the connector."),
});

const CloudWatchLogsLogDeliverySchema = z.object({
  Enabled: z.boolean().describe(
    "Specifies whether the logs get sent to the specified CloudWatch Logs destination.",
  ),
  LogGroup: z.string().describe(
    "The CloudWatch log group that is the destination for log delivery.",
  ).optional(),
});

const FirehoseLogDeliverySchema = z.object({
  DeliveryStream: z.string().describe(
    "The Kinesis Data Firehose delivery stream that is the destination for log delivery.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specifies whether the logs get sent to the specified Kinesis Data Firehose delivery stream.",
  ),
});

const S3LogDeliverySchema = z.object({
  Bucket: z.string().describe(
    "The name of the S3 bucket that is the destination for log delivery.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specifies whether the logs get sent to the specified Amazon S3 destination.",
  ),
  Prefix: z.string().describe(
    "The S3 prefix that is the destination for log delivery.",
  ).optional(),
});

const WorkerLogDeliverySchema = z.object({
  CloudWatchLogs: CloudWatchLogsLogDeliverySchema.describe(
    "Details about delivering logs to Amazon CloudWatch Logs.",
  ).optional(),
  Firehose: FirehoseLogDeliverySchema.describe(
    "Details about delivering logs to Amazon Kinesis Data Firehose.",
  ).optional(),
  S3: S3LogDeliverySchema.describe(
    "Details about delivering logs to Amazon S3.",
  ).optional(),
});

const CustomPluginSchema = z.object({
  CustomPluginArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafkaconnect:.*"),
  ).describe("The Amazon Resource Name (ARN) of the custom plugin to use."),
  Revision: z.number().int().min(1).describe(
    "The revision of the custom plugin to use.",
  ),
});

const PluginSchema = z.object({
  CustomPlugin: CustomPluginSchema.describe("Details about a custom plugin."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Capacity: z.object({
    AutoScaling: AutoScalingSchema.describe(
      "Details about auto scaling of a connector.",
    ).optional(),
    ProvisionedCapacity: ProvisionedCapacitySchema.describe(
      "Details about a fixed capacity allocated to a connector.",
    ).optional(),
  }).describe("Information about the capacity allocated to the connector."),
  ConnectorConfiguration: z.record(z.string(), z.string()).describe(
    "The configuration for the connector.",
  ),
  ConnectorDescription: z.string().max(1024).describe(
    "A summary description of the connector.",
  ).optional(),
  ConnectorName: z.string().min(1).max(128).describe(
    "The name of the connector.",
  ),
  KafkaCluster: z.object({
    ApacheKafkaCluster: ApacheKafkaClusterSchema.describe(
      "Details of how to connect to an Apache Kafka cluster.",
    ),
  }).describe("Details of how to connect to the Kafka cluster."),
  KafkaClusterClientAuthentication: z.object({
    AuthenticationType: z.enum(["NONE", "IAM"]).describe(
      "The type of client authentication used to connect to the Kafka cluster. Value NONE means that no client authentication is used.",
    ),
  }).describe(
    "Details of the client authentication used by the Kafka cluster.",
  ),
  KafkaClusterEncryptionInTransit: z.object({
    EncryptionType: z.enum(["PLAINTEXT", "TLS"]).describe(
      "The type of encryption in transit to the Kafka cluster.",
    ),
  }).describe("Details of encryption in transit to the Kafka cluster."),
  KafkaConnectVersion: z.string().describe(
    "The version of Kafka Connect. It has to be compatible with both the Kafka cluster's version and the plugins.",
  ),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "The network type of the Connector.",
  ).optional(),
  LogDelivery: z.object({
    WorkerLogDelivery: WorkerLogDeliverySchema.describe(
      "Specifies where worker logs are delivered.",
    ),
  }).describe(
    "Details of what logs are delivered and where they are delivered.",
  ).optional(),
  Plugins: z.array(PluginSchema).describe(
    "List of plugins to use with the connector.",
  ),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the connector to access Amazon S3 objects and other external resources.",
  ),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  WorkerConfiguration: z.object({
    Revision: z.number().int().min(1).describe(
      "The revision of the worker configuration to use.",
    ),
    WorkerConfigurationArn: z.string().regex(
      new RegExp("arn:(aws|aws-us-gov|aws-cn):kafkaconnect:.*"),
    ).describe(
      "The Amazon Resource Name (ARN) of the worker configuration to use.",
    ),
  }).describe("Specifies the worker configuration to use with the connector.")
    .optional(),
});

const StateSchema = z.object({
  Capacity: z.object({
    AutoScaling: AutoScalingSchema,
    ProvisionedCapacity: ProvisionedCapacitySchema,
  }).optional(),
  ConnectorArn: z.string(),
  ConnectorConfiguration: z.record(z.string(), z.unknown()).optional(),
  ConnectorDescription: z.string().optional(),
  ConnectorName: z.string().optional(),
  KafkaCluster: z.object({
    ApacheKafkaCluster: ApacheKafkaClusterSchema,
  }).optional(),
  KafkaClusterClientAuthentication: z.object({
    AuthenticationType: z.string(),
  }).optional(),
  KafkaClusterEncryptionInTransit: z.object({
    EncryptionType: z.string(),
  }).optional(),
  KafkaConnectVersion: z.string().optional(),
  NetworkType: z.string().optional(),
  LogDelivery: z.object({
    WorkerLogDelivery: WorkerLogDeliverySchema,
  }).optional(),
  Plugins: z.array(PluginSchema).optional(),
  ServiceExecutionRoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  WorkerConfiguration: z.object({
    Revision: z.number(),
    WorkerConfigurationArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Capacity: z.object({
    AutoScaling: AutoScalingSchema.describe(
      "Details about auto scaling of a connector.",
    ).optional(),
    ProvisionedCapacity: ProvisionedCapacitySchema.describe(
      "Details about a fixed capacity allocated to a connector.",
    ).optional(),
  }).describe("Information about the capacity allocated to the connector.")
    .optional(),
  ConnectorConfiguration: z.record(z.string(), z.string()).describe(
    "The configuration for the connector.",
  ).optional(),
  ConnectorDescription: z.string().max(1024).describe(
    "A summary description of the connector.",
  ).optional(),
  ConnectorName: z.string().min(1).max(128).describe(
    "The name of the connector.",
  ).optional(),
  KafkaCluster: z.object({
    ApacheKafkaCluster: ApacheKafkaClusterSchema.describe(
      "Details of how to connect to an Apache Kafka cluster.",
    ).optional(),
  }).describe("Details of how to connect to the Kafka cluster.").optional(),
  KafkaClusterClientAuthentication: z.object({
    AuthenticationType: z.enum(["NONE", "IAM"]).describe(
      "The type of client authentication used to connect to the Kafka cluster. Value NONE means that no client authentication is used.",
    ).optional(),
  }).describe("Details of the client authentication used by the Kafka cluster.")
    .optional(),
  KafkaClusterEncryptionInTransit: z.object({
    EncryptionType: z.enum(["PLAINTEXT", "TLS"]).describe(
      "The type of encryption in transit to the Kafka cluster.",
    ).optional(),
  }).describe("Details of encryption in transit to the Kafka cluster.")
    .optional(),
  KafkaConnectVersion: z.string().describe(
    "The version of Kafka Connect. It has to be compatible with both the Kafka cluster's version and the plugins.",
  ).optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "The network type of the Connector.",
  ).optional(),
  LogDelivery: z.object({
    WorkerLogDelivery: WorkerLogDeliverySchema.describe(
      "Specifies where worker logs are delivered.",
    ).optional(),
  }).describe(
    "Details of what logs are delivered and where they are delivered.",
  ).optional(),
  Plugins: z.array(PluginSchema).describe(
    "List of plugins to use with the connector.",
  ).optional(),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the connector to access Amazon S3 objects and other external resources.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  WorkerConfiguration: z.object({
    Revision: z.number().int().min(1).describe(
      "The revision of the worker configuration to use.",
    ).optional(),
    WorkerConfigurationArn: z.string().regex(
      new RegExp("arn:(aws|aws-us-gov|aws-cn):kafkaconnect:.*"),
    ).describe(
      "The Amazon Resource Name (ARN) of the worker configuration to use.",
    ).optional(),
  }).describe("Specifies the worker configuration to use with the connector.")
    .optional(),
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

/** Swamp extension model for KafkaConnect Connector. Registered at `@swamp/aws/kafkaconnect/connector`. */
export const model = {
  type: "@swamp/aws/kafkaconnect/connector",
  version: "2026.06.08.1",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "KafkaConnect Connector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a KafkaConnect Connector",
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
          "AWS::KafkaConnect::Connector",
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
      description: "Get a KafkaConnect Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KafkaConnect Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::KafkaConnect::Connector",
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
      description: "Update a KafkaConnect Connector",
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
        const identifier = existing.ConnectorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::KafkaConnect::Connector",
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
          "AWS::KafkaConnect::Connector",
          identifier,
          currentState,
          desiredState,
          [
            "ConnectorDescription",
            "ConnectorName",
            "KafkaCluster",
            "KafkaClusterClientAuthentication",
            "KafkaClusterEncryptionInTransit",
            "KafkaConnectVersion",
            "LogDelivery",
            "Plugins",
            "ServiceExecutionRoleArn",
            "WorkerConfiguration",
            "NetworkType",
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
      description: "Delete a KafkaConnect Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KafkaConnect Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::KafkaConnect::Connector",
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
      description: "Sync KafkaConnect Connector state from AWS",
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
        const identifier = existing.ConnectorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::KafkaConnect::Connector",
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
