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

// Auto-generated extension model for @swamp/aws/iot/topic-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT TopicRule (AWS::IoT::TopicRule).
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

const CloudwatchAlarmActionSchema = z.object({
  StateValue: z.string(),
  AlarmName: z.string(),
  StateReason: z.string(),
  RoleArn: z.string(),
});

const CloudwatchLogsActionSchema = z.object({
  LogGroupName: z.string(),
  RoleArn: z.string(),
  BatchMode: z.boolean().optional(),
});

const CloudwatchMetricActionSchema = z.object({
  MetricName: z.string(),
  MetricValue: z.string(),
  MetricNamespace: z.string(),
  MetricUnit: z.string(),
  RoleArn: z.string(),
  MetricTimestamp: z.string().optional(),
});

const DynamoDBActionSchema = z.object({
  TableName: z.string(),
  PayloadField: z.string().optional(),
  RangeKeyField: z.string().optional(),
  HashKeyField: z.string(),
  RangeKeyValue: z.string().optional(),
  RangeKeyType: z.string().optional(),
  HashKeyType: z.string().optional(),
  HashKeyValue: z.string(),
  RoleArn: z.string(),
});

const PutItemInputSchema = z.object({
  TableName: z.string(),
});

const DynamoDBv2ActionSchema = z.object({
  PutItem: PutItemInputSchema.optional(),
  RoleArn: z.string().optional(),
});

const ElasticsearchActionSchema = z.object({
  Type: z.string(),
  Index: z.string(),
  Id: z.string(),
  Endpoint: z.string(),
  RoleArn: z.string(),
});

const FirehoseActionSchema = z.object({
  DeliveryStreamName: z.string(),
  RoleArn: z.string(),
  Separator: z.string().optional(),
  BatchMode: z.boolean().optional(),
});

const HttpActionHeaderSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const SigV4AuthorizationSchema = z.object({
  ServiceName: z.string(),
  SigningRegion: z.string(),
  RoleArn: z.string(),
});

const HttpAuthorizationSchema = z.object({
  Sigv4: SigV4AuthorizationSchema.optional(),
});

const BatchConfigSchema = z.object({
  MaxBatchOpenMs: z.number().int().optional(),
  MaxBatchSize: z.number().int().optional(),
  MaxBatchSizeBytes: z.number().int().optional(),
  BatchAcrossTopics: z.boolean().optional(),
});

const HttpActionSchema = z.object({
  ConfirmationUrl: z.string().optional(),
  Headers: z.array(HttpActionHeaderSchema).optional(),
  Url: z.string(),
  Auth: HttpAuthorizationSchema.optional(),
  EnableBatching: z.boolean().optional(),
  BatchConfig: BatchConfigSchema.optional(),
});

const InfluxDBBatchConfigSchema = z.object({
  MaxBatchSize: z.number().int().optional(),
  MaxBatchOpenMs: z.number().int().optional(),
  MaxBatchSizeBytes: z.number().int().optional(),
  BatchAcrossTopics: z.boolean().optional(),
});

const InfluxDBActionSchema = z.object({
  DestinationArn: z.string(),
  RoleArn: z.string(),
  DatabaseName: z.string(),
  TableName: z.string(),
  Organization: z.string().optional(),
  TimestampUnit: z.string().optional(),
  Tags: z.record(z.string(), z.string()).optional(),
  BatchConfig: InfluxDBBatchConfigSchema.optional(),
});

const IotAnalyticsActionSchema = z.object({
  RoleArn: z.string(),
  ChannelName: z.string(),
  BatchMode: z.boolean().optional(),
});

const IotEventsActionSchema = z.object({
  InputName: z.string(),
  RoleArn: z.string(),
  MessageId: z.string().optional(),
  BatchMode: z.boolean().optional(),
});

const AssetPropertyVariantSchema = z.object({
  StringValue: z.string().optional(),
  DoubleValue: z.string().optional(),
  BooleanValue: z.string().optional(),
  IntegerValue: z.string().optional(),
});

const AssetPropertyTimestampSchema = z.object({
  TimeInSeconds: z.string(),
  OffsetInNanos: z.string().optional(),
});

const AssetPropertyValueSchema = z.object({
  Value: AssetPropertyVariantSchema,
  Timestamp: AssetPropertyTimestampSchema,
  Quality: z.string().optional(),
});

const PutAssetPropertyValueEntrySchema = z.object({
  PropertyAlias: z.string().optional(),
  PropertyValues: z.array(AssetPropertyValueSchema),
  AssetId: z.string().optional(),
  EntryId: z.string().optional(),
  PropertyId: z.string().optional(),
});

const IotSiteWiseActionSchema = z.object({
  RoleArn: z.string(),
  PutAssetPropertyValueEntries: z.array(PutAssetPropertyValueEntrySchema),
});

const KafkaActionHeaderSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const KafkaActionSchema = z.object({
  DestinationArn: z.string(),
  Topic: z.string(),
  Key: z.string().optional(),
  Partition: z.string().optional(),
  ClientProperties: z.record(z.string(), z.string()),
  Headers: z.array(KafkaActionHeaderSchema).optional(),
});

const KinesisActionSchema = z.object({
  PartitionKey: z.string().optional(),
  StreamName: z.string(),
  RoleArn: z.string(),
});

const LambdaActionSchema = z.object({
  FunctionArn: z.string().optional(),
});

const TimestampSchema = z.object({
  Value: z.string(),
  Unit: z.string().optional(),
});

const LocationActionSchema = z.object({
  RoleArn: z.string(),
  TrackerName: z.string(),
  DeviceId: z.string(),
  Latitude: z.string(),
  Longitude: z.string(),
  Timestamp: TimestampSchema.optional(),
});

const OpenSearchActionSchema = z.object({
  Type: z.string(),
  Index: z.string(),
  Id: z.string(),
  Endpoint: z.string(),
  RoleArn: z.string(),
});

const UserPropertySchema = z.object({
  Key: z.string().min(0).max(1024),
  Value: z.string().min(0).max(1024),
});

const RepublishActionHeadersSchema = z.object({
  PayloadFormatIndicator: z.string().min(0).max(1024).optional(),
  ContentType: z.string().min(0).max(1024).optional(),
  ResponseTopic: z.string().min(0).max(1024).optional(),
  CorrelationData: z.string().min(0).max(1024).optional(),
  MessageExpiry: z.string().min(0).max(1024).optional(),
  UserProperties: z.array(UserPropertySchema).optional(),
});

const RepublishActionSchema = z.object({
  Qos: z.number().int().optional(),
  Topic: z.string(),
  RoleArn: z.string(),
  Headers: RepublishActionHeadersSchema.optional(),
});

const S3ActionSchema = z.object({
  BucketName: z.string(),
  Key: z.string(),
  RoleArn: z.string(),
  CannedAcl: z.enum([
    "private",
    "public-read",
    "public-read-write",
    "aws-exec-read",
    "authenticated-read",
    "bucket-owner-read",
    "bucket-owner-full-control",
    "log-delivery-write",
  ]).optional(),
});

const SnsActionSchema = z.object({
  TargetArn: z.string(),
  MessageFormat: z.string().optional(),
  RoleArn: z.string(),
});

const SqsActionSchema = z.object({
  RoleArn: z.string(),
  UseBase64: z.boolean().optional(),
  QueueUrl: z.string(),
});

const StepFunctionsActionSchema = z.object({
  ExecutionNamePrefix: z.string().optional(),
  StateMachineName: z.string(),
  RoleArn: z.string(),
});

const TimestreamDimensionSchema = z.object({
  Name: z.string(),
  Value: z.string(),
});

const TimestreamTimestampSchema = z.object({
  Value: z.string(),
  Unit: z.string(),
});

const TimestreamActionSchema = z.object({
  RoleArn: z.string(),
  DatabaseName: z.string(),
  TableName: z.string(),
  Dimensions: z.array(TimestreamDimensionSchema),
  Timestamp: TimestreamTimestampSchema.optional(),
});

const ActionSchema = z.object({
  CloudwatchAlarm: CloudwatchAlarmActionSchema.optional(),
  CloudwatchLogs: CloudwatchLogsActionSchema.optional(),
  CloudwatchMetric: CloudwatchMetricActionSchema.optional(),
  DynamoDB: DynamoDBActionSchema.optional(),
  DynamoDBv2: DynamoDBv2ActionSchema.optional(),
  Elasticsearch: ElasticsearchActionSchema.optional(),
  Firehose: FirehoseActionSchema.optional(),
  Http: HttpActionSchema.optional(),
  InfluxDB: InfluxDBActionSchema.optional(),
  IotAnalytics: IotAnalyticsActionSchema.optional(),
  IotEvents: IotEventsActionSchema.optional(),
  IotSiteWise: IotSiteWiseActionSchema.optional(),
  Kafka: KafkaActionSchema.optional(),
  Kinesis: KinesisActionSchema.optional(),
  Lambda: LambdaActionSchema.optional(),
  Location: LocationActionSchema.optional(),
  OpenSearch: OpenSearchActionSchema.optional(),
  Republish: RepublishActionSchema.optional(),
  S3: S3ActionSchema.optional(),
  Sns: SnsActionSchema.optional(),
  Sqs: SqsActionSchema.optional(),
  StepFunctions: StepFunctionsActionSchema.optional(),
  Timestream: TimestreamActionSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const CloudwatchAlarmActionStateSchema = z.object({
  StateValue: z.string(),
  AlarmName: z.string(),
  StateReason: z.string(),
  RoleArn: z.string(),
}).partial();

const CloudwatchLogsActionStateSchema = z.object({
  LogGroupName: z.string(),
  RoleArn: z.string(),
  BatchMode: z.boolean(),
}).partial();

const CloudwatchMetricActionStateSchema = z.object({
  MetricName: z.string(),
  MetricValue: z.string(),
  MetricNamespace: z.string(),
  MetricUnit: z.string(),
  RoleArn: z.string(),
  MetricTimestamp: z.string(),
}).partial();

const DynamoDBActionStateSchema = z.object({
  TableName: z.string(),
  PayloadField: z.string(),
  RangeKeyField: z.string(),
  HashKeyField: z.string(),
  RangeKeyValue: z.string(),
  RangeKeyType: z.string(),
  HashKeyType: z.string(),
  HashKeyValue: z.string(),
  RoleArn: z.string(),
}).partial();

const PutItemInputStateSchema = z.object({
  TableName: z.string(),
}).partial();

const DynamoDBv2ActionStateSchema = z.object({
  PutItem: PutItemInputStateSchema,
  RoleArn: z.string(),
}).partial();

const ElasticsearchActionStateSchema = z.object({
  Type: z.string(),
  Index: z.string(),
  Id: z.string(),
  Endpoint: z.string(),
  RoleArn: z.string(),
}).partial();

const FirehoseActionStateSchema = z.object({
  DeliveryStreamName: z.string(),
  RoleArn: z.string(),
  Separator: z.string(),
  BatchMode: z.boolean(),
}).partial();

const HttpActionHeaderStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
}).partial();

const SigV4AuthorizationStateSchema = z.object({
  ServiceName: z.string(),
  SigningRegion: z.string(),
  RoleArn: z.string(),
}).partial();

const HttpAuthorizationStateSchema = z.object({
  Sigv4: SigV4AuthorizationStateSchema,
}).partial();

const BatchConfigStateSchema = z.object({
  MaxBatchOpenMs: z.number(),
  MaxBatchSize: z.number(),
  MaxBatchSizeBytes: z.number(),
  BatchAcrossTopics: z.boolean(),
}).partial();

const HttpActionStateSchema = z.object({
  ConfirmationUrl: z.string(),
  Headers: z.array(HttpActionHeaderStateSchema),
  Url: z.string(),
  Auth: HttpAuthorizationStateSchema,
  EnableBatching: z.boolean(),
  BatchConfig: BatchConfigStateSchema,
}).partial();

const InfluxDBBatchConfigStateSchema = z.object({
  MaxBatchSize: z.number(),
  MaxBatchOpenMs: z.number(),
  MaxBatchSizeBytes: z.number(),
  BatchAcrossTopics: z.boolean(),
}).partial();

const InfluxDBActionStateSchema = z.object({
  DestinationArn: z.string(),
  RoleArn: z.string(),
  DatabaseName: z.string(),
  TableName: z.string(),
  Organization: z.string(),
  TimestampUnit: z.string(),
  Tags: z.record(z.string(), z.unknown()),
  BatchConfig: InfluxDBBatchConfigStateSchema,
}).partial();

const IotAnalyticsActionStateSchema = z.object({
  RoleArn: z.string(),
  ChannelName: z.string(),
  BatchMode: z.boolean(),
}).partial();

const IotEventsActionStateSchema = z.object({
  InputName: z.string(),
  RoleArn: z.string(),
  MessageId: z.string(),
  BatchMode: z.boolean(),
}).partial();

const AssetPropertyVariantStateSchema = z.object({
  StringValue: z.string(),
  DoubleValue: z.string(),
  BooleanValue: z.string(),
  IntegerValue: z.string(),
}).partial();

const AssetPropertyTimestampStateSchema = z.object({
  TimeInSeconds: z.string(),
  OffsetInNanos: z.string(),
}).partial();

const AssetPropertyValueStateSchema = z.object({
  Value: AssetPropertyVariantStateSchema,
  Timestamp: AssetPropertyTimestampStateSchema,
  Quality: z.string(),
}).partial();

const PutAssetPropertyValueEntryStateSchema = z.object({
  PropertyAlias: z.string(),
  PropertyValues: z.array(AssetPropertyValueStateSchema),
  AssetId: z.string(),
  EntryId: z.string(),
  PropertyId: z.string(),
}).partial();

const IotSiteWiseActionStateSchema = z.object({
  RoleArn: z.string(),
  PutAssetPropertyValueEntries: z.array(PutAssetPropertyValueEntryStateSchema),
}).partial();

const KafkaActionHeaderStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
}).partial();

const KafkaActionStateSchema = z.object({
  DestinationArn: z.string(),
  Topic: z.string(),
  Key: z.string(),
  Partition: z.string(),
  ClientProperties: z.record(z.string(), z.unknown()),
  Headers: z.array(KafkaActionHeaderStateSchema),
}).partial();

const KinesisActionStateSchema = z.object({
  PartitionKey: z.string(),
  StreamName: z.string(),
  RoleArn: z.string(),
}).partial();

const LambdaActionStateSchema = z.object({
  FunctionArn: z.string(),
}).partial();

const TimestampStateSchema = z.object({
  Value: z.string(),
  Unit: z.string(),
}).partial();

const LocationActionStateSchema = z.object({
  RoleArn: z.string(),
  TrackerName: z.string(),
  DeviceId: z.string(),
  Latitude: z.string(),
  Longitude: z.string(),
  Timestamp: TimestampStateSchema,
}).partial();

const OpenSearchActionStateSchema = z.object({
  Type: z.string(),
  Index: z.string(),
  Id: z.string(),
  Endpoint: z.string(),
  RoleArn: z.string(),
}).partial();

const UserPropertyStateSchema = z.object({
  Key: z.string(),
  Value: z.string(),
}).partial();

const RepublishActionHeadersStateSchema = z.object({
  PayloadFormatIndicator: z.string(),
  ContentType: z.string(),
  ResponseTopic: z.string(),
  CorrelationData: z.string(),
  MessageExpiry: z.string(),
  UserProperties: z.array(UserPropertyStateSchema),
}).partial();

const RepublishActionStateSchema = z.object({
  Qos: z.number(),
  Topic: z.string(),
  RoleArn: z.string(),
  Headers: RepublishActionHeadersStateSchema,
}).partial();

const S3ActionStateSchema = z.object({
  BucketName: z.string(),
  Key: z.string(),
  RoleArn: z.string(),
  CannedAcl: z.string(),
}).partial();

const SnsActionStateSchema = z.object({
  TargetArn: z.string(),
  MessageFormat: z.string(),
  RoleArn: z.string(),
}).partial();

const SqsActionStateSchema = z.object({
  RoleArn: z.string(),
  UseBase64: z.boolean(),
  QueueUrl: z.string(),
}).partial();

const StepFunctionsActionStateSchema = z.object({
  ExecutionNamePrefix: z.string(),
  StateMachineName: z.string(),
  RoleArn: z.string(),
}).partial();

const TimestreamDimensionStateSchema = z.object({
  Name: z.string(),
  Value: z.string(),
}).partial();

const TimestreamTimestampStateSchema = z.object({
  Value: z.string(),
  Unit: z.string(),
}).partial();

const TimestreamActionStateSchema = z.object({
  RoleArn: z.string(),
  DatabaseName: z.string(),
  TableName: z.string(),
  Dimensions: z.array(TimestreamDimensionStateSchema),
  Timestamp: TimestreamTimestampStateSchema,
}).partial();

const ActionStateSchema = z.object({
  CloudwatchAlarm: CloudwatchAlarmActionStateSchema,
  CloudwatchLogs: CloudwatchLogsActionStateSchema,
  CloudwatchMetric: CloudwatchMetricActionStateSchema,
  DynamoDB: DynamoDBActionStateSchema,
  DynamoDBv2: DynamoDBv2ActionStateSchema,
  Elasticsearch: ElasticsearchActionStateSchema,
  Firehose: FirehoseActionStateSchema,
  Http: HttpActionStateSchema,
  InfluxDB: InfluxDBActionStateSchema,
  IotAnalytics: IotAnalyticsActionStateSchema,
  IotEvents: IotEventsActionStateSchema,
  IotSiteWise: IotSiteWiseActionStateSchema,
  Kafka: KafkaActionStateSchema,
  Kinesis: KinesisActionStateSchema,
  Lambda: LambdaActionStateSchema,
  Location: LocationActionStateSchema,
  OpenSearch: OpenSearchActionStateSchema,
  Republish: RepublishActionStateSchema,
  S3: S3ActionStateSchema,
  Sns: SnsActionStateSchema,
  Sqs: SqsActionStateSchema,
  StepFunctions: StepFunctionsActionStateSchema,
  Timestream: TimestreamActionStateSchema,
}).partial();

const TagStateSchema = z.object({
  Key: z.string(),
  Value: z.string(),
}).partial();

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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  RuleName: z.string().optional(),
  TopicRulePayload: z.object({
    RuleDisabled: z.boolean().optional(),
    ErrorAction: ActionSchema.optional(),
    Description: z.string().optional(),
    AwsIotSqlVersion: z.string().optional(),
    Actions: z.array(ActionSchema),
    Sql: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  RuleName: z.string(),
  TopicRulePayload: z.object({
    RuleDisabled: z.boolean(),
    ErrorAction: ActionStateSchema,
    Description: z.string(),
    AwsIotSqlVersion: z.string(),
    Actions: z.array(ActionStateSchema),
    Sql: z.string(),
  }).partial().optional(),
  Tags: z.array(TagStateSchema).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RuleName: z.string().optional(),
  TopicRulePayload: z.object({
    RuleDisabled: z.boolean().optional(),
    ErrorAction: ActionSchema.optional(),
    Description: z.string().optional(),
    AwsIotSqlVersion: z.string().optional(),
    Actions: z.array(ActionSchema).optional(),
    Sql: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for IoT TopicRule. Registered at `@swamp/aws/iot/topic-rule`. */
export const model = {
  type: "@swamp/aws/iot/topic-rule",
  version: "2026.11.08.2",
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
      toVersion: "2026.05.09.1",
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
      toVersion: "2026.09.04.1",
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
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoT TopicRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT TopicRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["TopicRulePayload"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::TopicRule",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.RuleName ?? g.RuleName)?.toString() ?? "current").replace(
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
      description: "Get a IoT TopicRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT TopicRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::TopicRule",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.RuleName ?? context.globalArgs.RuleName)?.toString() ??
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
      description: "Update a IoT TopicRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RuleName?.toString() ?? "current").replace(
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
        const identifier = existing.RuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::TopicRule",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::TopicRule",
          identifier,
          currentState,
          desiredState,
          ["RuleName"],
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
      description: "Delete a IoT TopicRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT TopicRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::TopicRule",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.RuleName?.toString() ?? args.identifier).replace(
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
      description: "Sync IoT TopicRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RuleName?.toString() ?? "current").replace(
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
        const identifier = existing.RuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::TopicRule",
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
      description: "List IoT TopicRule resources",
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
        const { items, nextToken } = await listResources(
          "AWS::IoT::TopicRule",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.RuleName?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
