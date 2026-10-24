// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/msk/channel
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MSK Channel (AWS::MSK::Channel).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const RecordConverterSchema = z.object({
  ValueConverter: z.enum(["BYTE_ARRAY", "JSON", "JSON_SCHEMA_GSR", "STRING"])
    .describe("Value converter for topic data"),
});

const RecordSchemaSchema = z.object({
  GsrArn: z.string().describe(
    "ARN of Glue Schema Registry resource used for table schema",
  ),
});

const TopicConfigurationSchema = z.object({
  TopicArn: z.string().regex(
    new RegExp("^arn:[\\w-]+:kafka:[\\w-]+:\\d+:topic.*$"),
  ).describe(
    "The Amazon Resource Name (ARN) that uniquely identifies the topic",
  ),
  RecordConverter: RecordConverterSchema.describe(
    "Record converter configuration for a topic",
  ),
  RecordSchema: RecordSchemaSchema.describe(
    "Record schema configuration for a topic",
  ).optional(),
});

const CatalogSchema = z.object({
  CatalogArn: z.string().regex(
    new RegExp("^arn:[\\w-]+:glue:[\\w-]+:\\d+:catalog.*$"),
  ).describe("The ARN of the catalog").optional(),
  WarehouseLocation: z.string().describe("The warehouse location").optional(),
});

const DeadLetterQueueS3Schema = z.object({
  BucketArn: z.string().regex(new RegExp("^arn:[\\w-]+:s3:::.*$")).describe(
    "The ARN of the S3 bucket",
  ),
  ErrorOutputPrefix: z.string().describe("The error output prefix"),
  ExpectedBucketOwner: z.string().describe(
    "Optional 12-digit AWS account ID expected to own the dead-letter S3 bucket",
  ).optional(),
});

const SchemaEvolutionSchema = z.object({
  EnableSchemaEvolution: z.boolean().describe(
    "Whether schema evolution is enabled",
  ),
});

const TableCreationSchema = z.object({
  EnableTableCreation: z.boolean().describe(
    "Whether table creation is enabled",
  ),
});

const PartitionSourceSchema = z.object({
  SourceName: z.string().describe("Source name").optional(),
});

const PartitionSpecSchema = z.object({
  PartitionStrategy: z.enum(["TIME_HOUR"]).describe(
    "Partition strategy for MSK channel",
  ),
  SourceList: z.array(PartitionSourceSchema).describe("Source list").optional(),
});

const DestinationTableSchema = z.object({
  DestinationDatabaseName: z.string().describe("The destination database name"),
  DestinationTableName: z.string().describe("The destination table name"),
  PartitionSpec: PartitionSpecSchema.describe("Partition specification")
    .optional(),
});

const S3StorageSchema = z.object({
  BucketArn: z.string().regex(new RegExp("^arn:[\\w-]+:s3:::.*$")).describe(
    "ARN of the S3 bucket",
  ),
  OutputPrefix: z.string().describe("Optional prefix for output objects")
    .optional(),
  OutputKeyTemplate: z.string().describe(
    "Template for S3 key for output objects, used for partitioning",
  ).optional(),
  StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING", "GLACIER_IR"])
    .describe("S3 storage class"),
  CompressionType: z.enum(["NONE", "GZIP", "ZSTD"]).describe(
    "S3 compression type",
  ),
  ExpectedBucketOwner: z.string().describe(
    "Optional 12-digit AWS account ID expected to own the S3 bucket",
  ).optional(),
});

const S3LogDestinationSchema = z.object({
  Enabled: z.boolean().describe("Whether S3 logging is enabled"),
  Bucket: z.string().describe("The name of the S3 bucket for log delivery")
    .optional(),
  Prefix: z.string().describe("The S3 prefix for log delivery").optional(),
});

const CloudWatchLogsLogDestinationSchema = z.object({
  Enabled: z.boolean().describe("Whether CloudWatch Logs logging is enabled"),
  LogGroup: z.string().describe("The CloudWatch log group for log delivery")
    .optional(),
});

const FirehoseLogDestinationSchema = z.object({
  Enabled: z.boolean().describe("Whether Firehose logging is enabled"),
  DeliveryStream: z.string().describe(
    "The Firehose delivery stream for log delivery",
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
  ChannelName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9._-]+$"))
    .describe("Name of the channel"),
  ClusterArn: z.string().regex(
    new RegExp("^arn:[\\w-]+:kafka:[\\w-]+:\\d+:cluster.*$"),
  ).describe("The Amazon Resource Name (ARN) of the cluster").optional(),
  TopicConfigurationList: z.array(TopicConfigurationSchema).describe(
    "Topic configuration",
  ),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:kms:[\\w-]+:\\d+:key.*$"),
    ).describe("The ARN of the KMS key for encryption"),
  }).describe("Encryption configuration").optional(),
  IcebergDestinationConfiguration: z.object({
    ServiceExecutionRoleArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:iam::[\\w-]+:role.*$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an IAM role used by MSK to access the table",
    ),
    DataFreshnessInSeconds: z.number().int().min(60).max(900).describe(
      "Data freshness in seconds",
    ).optional(),
    Catalog: CatalogSchema.describe("Catalog configuration of the destination")
      .optional(),
    DeadLetterQueueS3: DeadLetterQueueS3Schema.describe(
      "Dead letter queue S3 configuration of the destination",
    ),
    AppendOnly: z.boolean().describe("Append only mode"),
    SchemaEvolution: SchemaEvolutionSchema.describe(
      "Schema evolution configuration of the destination",
    ),
    TableCreation: TableCreationSchema.describe(
      "Table creation configuration of the destination",
    ),
    DestinationTableList: z.array(DestinationTableSchema).describe(
      "List of destination tables",
    ),
    CompressionType: z.enum(["ZSTD", "SNAPPY"]).describe(
      "Compression codec for Iceberg table data files. Defaults to ZSTD.",
    ).optional(),
  }).describe("Iceberg destination configuration").optional(),
  S3DestinationConfiguration: z.object({
    DataFreshnessInSeconds: z.number().int().min(60).max(900).describe(
      "Data freshness in seconds",
    ).optional(),
    DeadLetterQueueS3: DeadLetterQueueS3Schema.describe(
      "Dead letter queue S3 configuration of the destination",
    ),
    ServiceExecutionRoleArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:iam::[\\w-]+:role.*$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an IAM role used by MSK to access S3",
    ),
    Storage: S3StorageSchema.describe("S3 storage configuration"),
  }).describe("S3 destination configuration").optional(),
  LoggingInfo: z.object({
    S3: S3LogDestinationSchema.describe("S3 log destination details")
      .optional(),
    CloudWatchLogs: CloudWatchLogsLogDestinationSchema.describe(
      "CloudWatch Logs log destination details",
    ).optional(),
    Firehose: FirehoseLogDestinationSchema.describe(
      "Firehose log destination details",
    ).optional(),
  }).describe("Log configuration details for Channel").optional(),
  StateInfo: z.object({
    Code: z.string().describe("Code for channel state").optional(),
    Message: z.string().describe("Message for channel state").optional(),
  }).describe("Includes information about the channel state").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "Tags attached to the channel",
  ).optional(),
});

const StateSchema = z.object({
  ChannelArn: z.string(),
  ChannelName: z.string().optional(),
  Status: z.string().optional(),
  ClusterArn: z.string().optional(),
  TopicConfigurationList: z.array(TopicConfigurationSchema).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string(),
  }).optional(),
  IcebergDestinationConfiguration: z.object({
    ServiceExecutionRoleArn: z.string(),
    DataFreshnessInSeconds: z.number(),
    Catalog: CatalogSchema,
    DeadLetterQueueS3: DeadLetterQueueS3Schema,
    AppendOnly: z.boolean(),
    SchemaEvolution: SchemaEvolutionSchema,
    TableCreation: TableCreationSchema,
    DestinationTableList: z.array(DestinationTableSchema),
    CompressionType: z.string(),
  }).optional(),
  S3DestinationConfiguration: z.object({
    DataFreshnessInSeconds: z.number(),
    DeadLetterQueueS3: DeadLetterQueueS3Schema,
    ServiceExecutionRoleArn: z.string(),
    Storage: S3StorageSchema,
  }).optional(),
  LoggingInfo: z.object({
    S3: S3LogDestinationSchema,
    CloudWatchLogs: CloudWatchLogsLogDestinationSchema,
    Firehose: FirehoseLogDestinationSchema,
  }).optional(),
  StateInfo: z.object({
    Code: z.string(),
    Message: z.string(),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ChannelName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9._-]+$"))
    .describe("Name of the channel").optional(),
  ClusterArn: z.string().regex(
    new RegExp("^arn:[\\w-]+:kafka:[\\w-]+:\\d+:cluster.*$"),
  ).describe("The Amazon Resource Name (ARN) of the cluster").optional(),
  TopicConfigurationList: z.array(TopicConfigurationSchema).describe(
    "Topic configuration",
  ).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:kms:[\\w-]+:\\d+:key.*$"),
    ).describe("The ARN of the KMS key for encryption").optional(),
  }).describe("Encryption configuration").optional(),
  IcebergDestinationConfiguration: z.object({
    ServiceExecutionRoleArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:iam::[\\w-]+:role.*$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an IAM role used by MSK to access the table",
    ).optional(),
    DataFreshnessInSeconds: z.number().int().min(60).max(900).describe(
      "Data freshness in seconds",
    ).optional(),
    Catalog: CatalogSchema.describe("Catalog configuration of the destination")
      .optional(),
    DeadLetterQueueS3: DeadLetterQueueS3Schema.describe(
      "Dead letter queue S3 configuration of the destination",
    ).optional(),
    AppendOnly: z.boolean().describe("Append only mode").optional(),
    SchemaEvolution: SchemaEvolutionSchema.describe(
      "Schema evolution configuration of the destination",
    ).optional(),
    TableCreation: TableCreationSchema.describe(
      "Table creation configuration of the destination",
    ).optional(),
    DestinationTableList: z.array(DestinationTableSchema).describe(
      "List of destination tables",
    ).optional(),
    CompressionType: z.enum(["ZSTD", "SNAPPY"]).describe(
      "Compression codec for Iceberg table data files. Defaults to ZSTD.",
    ).optional(),
  }).describe("Iceberg destination configuration").optional(),
  S3DestinationConfiguration: z.object({
    DataFreshnessInSeconds: z.number().int().min(60).max(900).describe(
      "Data freshness in seconds",
    ).optional(),
    DeadLetterQueueS3: DeadLetterQueueS3Schema.describe(
      "Dead letter queue S3 configuration of the destination",
    ).optional(),
    ServiceExecutionRoleArn: z.string().regex(
      new RegExp("^arn:[\\w-]+:iam::[\\w-]+:role.*$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an IAM role used by MSK to access S3",
    ).optional(),
    Storage: S3StorageSchema.describe("S3 storage configuration").optional(),
  }).describe("S3 destination configuration").optional(),
  LoggingInfo: z.object({
    S3: S3LogDestinationSchema.describe("S3 log destination details")
      .optional(),
    CloudWatchLogs: CloudWatchLogsLogDestinationSchema.describe(
      "CloudWatch Logs log destination details",
    ).optional(),
    Firehose: FirehoseLogDestinationSchema.describe(
      "Firehose log destination details",
    ).optional(),
  }).describe("Log configuration details for Channel").optional(),
  StateInfo: z.object({
    Code: z.string().describe("Code for channel state").optional(),
    Message: z.string().describe("Message for channel state").optional(),
  }).describe("Includes information about the channel state").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "Tags attached to the channel",
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

/** Swamp extension model for MSK Channel. Registered at `@swamp/aws/msk/channel`. */
export const model = {
  type: "@swamp/aws/msk/channel",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MSK Channel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MSK Channel",
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
          "AWS::MSK::Channel",
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
      description: "Get a MSK Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MSK::Channel",
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
      description: "Update a MSK Channel",
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
        const identifier = existing.ChannelArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MSK::Channel",
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
          "AWS::MSK::Channel",
          identifier,
          currentState,
          desiredState,
          [
            "ChannelName",
            "ClusterArn",
            "TopicConfigurationList",
            "EncryptionConfiguration",
            "LoggingInfo",
            "ServiceExecutionRoleArn",
            "Catalog",
            "CatalogArn",
            "WarehouseLocation",
            "DeadLetterQueueS3",
            "BucketArn",
            "ErrorOutputPrefix",
            "ExpectedBucketOwner",
            "AppendOnly",
            "SchemaEvolution",
            "EnableSchemaEvolution",
            "TableCreation",
            "EnableTableCreation",
            "DestinationTableList",
            "DestinationDatabaseName",
            "DestinationTableName",
            "PartitionSpec",
            "PartitionStrategy",
            "SourceList",
            "SourceName",
            "CompressionType",
            "ServiceExecutionRoleArn",
            "DeadLetterQueueS3",
            "BucketArn",
            "ErrorOutputPrefix",
            "ExpectedBucketOwner",
            "Storage",
            "BucketArn",
            "OutputPrefix",
            "OutputKeyTemplate",
            "StorageClass",
            "CompressionType",
            "ExpectedBucketOwner",
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
      description: "Delete a MSK Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MSK::Channel",
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
      description: "Sync MSK Channel state from AWS",
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
        const identifier = existing.ChannelArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MSK::Channel",
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
    list: {
      description: "List MSK Channel resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources("AWS::MSK::Channel", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.ChannelArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
