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

// Auto-generated extension model for @swamp/aws/athena/work-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Athena WorkGroup (AWS::Athena::WorkGroup).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const EncryptionConfigurationSchema = z.object({
  EncryptionOption: z.enum(["SSE_S3", "SSE_KMS", "CSE_KMS"]).describe(
    "Indicates whether Amazon S3 server-side encryption with Amazon S3-managed keys (SSE-S3), server-side encryption with KMS-managed keys (SSE-KMS), or client-side encryption with KMS-managed keys (CSE-KMS) is used.",
  ),
  KmsKey: z.string().describe(
    "For SSE-KMS and CSE-KMS, this is the KMS key ARN or ID.",
  ).optional(),
});

const AclConfigurationSchema = z.object({
  S3AclOption: z.enum(["BUCKET_OWNER_FULL_CONTROL"]).describe(
    "The Amazon S3 canned ACL that Athena should specify when storing query results. Currently the only supported canned ACL is BUCKET_OWNER_FULL_CONTROL",
  ),
});

const ResultConfigurationSchema = z.object({
  EncryptionConfiguration: EncryptionConfigurationSchema.describe(
    "If query results are encrypted in Amazon S3, indicates the encryption option used (for example, SSE-KMS or CSE-KMS) and key information.",
  ).optional(),
  OutputLocation: z.string().describe(
    "The location in Amazon S3 where your query results are stored, such as s3://path/to/query/bucket/. To run the query, you must specify the query results location using one of the ways: either for individual queries using either this setting (client-side), or in the workgroup, using WorkGroupConfiguration",
  ).optional(),
  ExpectedBucketOwner: z.string().describe(
    "The AWS account ID of the owner of S3 bucket where query results are stored",
  ).optional(),
  AclConfiguration: AclConfigurationSchema.describe(
    "Indicates that an Amazon S3 canned ACL should be set to control ownership of stored query results",
  ).optional(),
});

const EngineVersionSchema = z.object({
  SelectedEngineVersion: z.string().describe(
    "The engine version requested by the user. Possible values are determined by the output of ListEngineVersions, including Auto. The default is Auto.",
  ).optional(),
});

const CustomerContentEncryptionConfigurationSchema = z.object({
  KmsKey: z.string().describe(
    "For SSE-KMS and CSE-KMS, this is the KMS key ARN or ID.",
  ),
});

const ManagedStorageEncryptionConfigurationSchema = z.object({
  KmsKey: z.string().describe(
    "For SSE-KMS and CSE-KMS, this is the KMS key ARN or ID.",
  ).optional(),
});

const ManagedQueryResultsConfigurationSchema = z.object({
  EncryptionConfiguration: ManagedStorageEncryptionConfigurationSchema.describe(
    "Indicates the encryption configuration for Athena Managed Storage. If not setting this field, Managed Storage will encrypt the query results with Athena's encryption key",
  ).optional(),
  Enabled: z.boolean().optional(),
});

const ClassificationSchema = z.object({
  Name: z.string().describe("The name of the configuration classification.")
    .optional(),
  Properties: z.record(z.string(), z.string()).describe(
    "A set of properties specified within a configuration classification.",
  ).optional(),
});

const EngineConfigurationSchema = z.object({
  CoordinatorDpuSize: z.number().int().describe(
    "The number of DPUs to use for the coordinator. A coordinator is a special executor that orchestrates processing work and manages other executors in a notebook session. The default is 1.",
  ).optional(),
  MaxConcurrentDpus: z.number().int().describe(
    "The maximum number of DPUs that can run concurrently.",
  ).optional(),
  DefaultExecutorDpuSize: z.number().int().describe(
    "The default number of DPUs to use for executors. An executor is the smallest unit of compute that a notebook session can request from Athena. The default is 1.",
  ).optional(),
  AdditionalConfigs: z.record(z.string(), z.string()).describe(
    "Contains additional notebook engine MAP parameter mappings in the form of key-value pairs. To specify an Athena notebook that the Jupyter server will download and serve, specify a value for the StartSessionRequest$NotebookVersion field, and then add a key named NotebookId to AdditionalConfigs that has the value of the Athena notebook ID.",
  ).optional(),
  SparkProperties: z.record(z.string(), z.string()).describe(
    "Specifies custom jar files and Spark properties for use cases like cluster encryption, table formats, and general Spark tuning.",
  ).optional(),
  Classifications: z.array(ClassificationSchema).describe(
    "The configuration classifications that can be specified for the engine.",
  ).optional(),
});

const CloudWatchLoggingConfigurationSchema = z.object({
  Enabled: z.boolean().describe("Enables CloudWatch logging.").optional(),
  LogGroup: z.string().describe(
    "The name of the log group in Amazon CloudWatch Logs where you want to publish your logs.",
  ).optional(),
  LogStreamNamePrefix: z.string().describe(
    "Prefix for the CloudWatch log stream name.",
  ).optional(),
  LogTypes: z.record(z.string(), z.array(z.string())).describe(
    "The types of logs that you want to publish to CloudWatch.",
  ).optional(),
});

const ManagedLoggingConfigurationSchema = z.object({
  Enabled: z.boolean().describe("Enables managed log persistence.").optional(),
  KmsKey: z.string().describe(
    "The KMS key ARN to encrypt the logs stored in managed log persistence.",
  ).optional(),
});

const S3LoggingConfigurationSchema = z.object({
  Enabled: z.boolean().describe("Enables S3 log delivery.").optional(),
  LogLocation: z.string().describe(
    "The Amazon S3 destination URI for log publishing.",
  ).optional(),
  KmsKey: z.string().describe(
    "The KMS key ARN to encrypt the logs published to the given Amazon S3 destination.",
  ).optional(),
});

const MonitoringConfigurationSchema = z.object({
  CloudWatchLoggingConfiguration: CloudWatchLoggingConfigurationSchema.describe(
    "Configuration settings for delivering logs to Amazon CloudWatch log groups.",
  ).optional(),
  ManagedLoggingConfiguration: ManagedLoggingConfigurationSchema.describe(
    "Configuration settings for managed log persistence.",
  ).optional(),
  S3LoggingConfiguration: S3LoggingConfigurationSchema.describe(
    "Configuration settings for delivering logs to Amazon S3 buckets.",
  ).optional(),
});

const ResultConfigurationUpdatesSchema = z.object({
  EncryptionConfiguration: EncryptionConfigurationSchema.describe(
    "If query results are encrypted in Amazon S3, indicates the encryption option used (for example, SSE-KMS or CSE-KMS) and key information.",
  ).optional(),
  OutputLocation: z.string().describe(
    "The location in Amazon S3 where your query results are stored, such as s3://path/to/query/bucket/. To run the query, you must specify the query results location using one of the ways: either for individual queries using either this setting (client-side), or in the workgroup, using WorkGroupConfiguration",
  ).optional(),
  ExpectedBucketOwner: z.string().describe(
    "The AWS account ID of the owner of S3 bucket where query results are stored",
  ).optional(),
  AclConfiguration: AclConfigurationSchema.describe(
    "Indicates that an Amazon S3 canned ACL should be set to control ownership of stored query results",
  ).optional(),
  RemoveEncryptionConfiguration: z.boolean().optional(),
  RemoveOutputLocation: z.boolean().optional(),
  RemoveExpectedBucketOwner: z.boolean().optional(),
  RemoveAclConfiguration: z.boolean().optional(),
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
  Name: z.string().regex(new RegExp("[a-zA-Z0-9._-]{1,128}")).describe(
    "The workGroup name.",
  ),
  Description: z.string().min(0).max(1024).describe(
    "The workgroup description.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags, separated by commas, that you want to attach to the workgroup as you create it",
  ).optional(),
  WorkGroupConfiguration: z.object({
    BytesScannedCutoffPerQuery: z.number().int().min(10000000).describe(
      "The upper data usage limit (cutoff) for the amount of bytes a single query in a workgroup is allowed to scan.",
    ).optional(),
    EnforceWorkGroupConfiguration: z.boolean().describe(
      'If set to "true", the settings for the workgroup override client-side settings. If set to "false", client-side settings are used',
    ).optional(),
    PublishCloudWatchMetricsEnabled: z.boolean().describe(
      "Indicates that the Amazon CloudWatch metrics are enabled for the workgroup.",
    ).optional(),
    RequesterPaysEnabled: z.boolean().describe(
      "If set to true, allows members assigned to a workgroup to reference Amazon S3 Requester Pays buckets in queries. If set to false, workgroup members cannot query data from Requester Pays buckets, and queries that retrieve data from Requester Pays buckets cause an error.",
    ).optional(),
    ResultConfiguration: ResultConfigurationSchema.describe(
      'The location in Amazon S3 where query results are stored and the encryption option, if any, used for query results. These are known as "client-side settings". If workgroup settings override client-side settings, then the query uses the workgroup settings.',
    ).optional(),
    EngineVersion: EngineVersionSchema.describe(
      "The Athena engine version for running queries.",
    ).optional(),
    AdditionalConfiguration: z.string().describe(
      "Additional Configuration that are passed to Athena Spark Calculations running in this workgroup",
    ).optional(),
    ExecutionRole: z.string().describe(
      "The ARN of the execution role used to access user resources for Spark sessions and Identity Center enabled workgroups. This property applies only to Spark enabled workgroups and Identity Center enabled workgroups.",
    ).optional(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema.describe(
        "Indicates the KMS key for encrypting notebook content.",
      ).optional(),
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema
      .describe(
        "The configuration for the managed query results and encryption option. ResultConfiguration and ManagedQueryResultsConfiguration cannot be set at the same time",
      ).optional(),
    EngineConfiguration: EngineConfigurationSchema.describe(
      "The engine configuration for running queries.",
    ).optional(),
    MonitoringConfiguration: MonitoringConfigurationSchema.describe(
      "Contains the configuration settings for managed log persistence, delivering logs to Amazon S3 buckets, Amazon CloudWatch log groups etc.",
    ).optional(),
  }).describe("The workgroup configuration").optional(),
  WorkGroupConfigurationUpdates: z.object({
    BytesScannedCutoffPerQuery: z.number().int().min(10000000).describe(
      "The upper data usage limit (cutoff) for the amount of bytes a single query in a workgroup is allowed to scan.",
    ).optional(),
    EnforceWorkGroupConfiguration: z.boolean().describe(
      'If set to "true", the settings for the workgroup override client-side settings. If set to "false", client-side settings are used',
    ).optional(),
    PublishCloudWatchMetricsEnabled: z.boolean().describe(
      "Indicates that the Amazon CloudWatch metrics are enabled for the workgroup.",
    ).optional(),
    RequesterPaysEnabled: z.boolean().describe(
      "If set to true, allows members assigned to a workgroup to reference Amazon S3 Requester Pays buckets in queries. If set to false, workgroup members cannot query data from Requester Pays buckets, and queries that retrieve data from Requester Pays buckets cause an error.",
    ).optional(),
    ResultConfigurationUpdates: ResultConfigurationUpdatesSchema.describe(
      "The result configuration information about the queries in this workgroup that will be updated. Includes the updated results location and an updated option for encrypting query results.",
    ).optional(),
    RemoveBytesScannedCutoffPerQuery: z.boolean().describe(
      "Indicates that the data usage control limit per query is removed.",
    ).optional(),
    EngineVersion: EngineVersionSchema.describe(
      "The Athena engine version for running queries.",
    ).optional(),
    AdditionalConfiguration: z.string().describe(
      "Additional Configuration that are passed to Athena Spark Calculations running in this workgroup",
    ).optional(),
    ExecutionRole: z.string().describe(
      "The ARN of the execution role used to access user resources for Spark sessions and Identity Center enabled workgroups. This property applies only to Spark enabled workgroups and Identity Center enabled workgroups.",
    ).optional(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema.describe(
        "Indicates the KMS key for encrypting notebook content.",
      ).optional(),
    RemoveCustomerContentEncryptionConfiguration: z.boolean().optional(),
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema
      .describe(
        "The configuration for the managed query results and encryption option. ResultConfiguration and ManagedQueryResultsConfiguration cannot be set at the same time",
      ).optional(),
    EngineConfiguration: EngineConfigurationSchema.describe(
      "The engine configuration for running queries.",
    ).optional(),
    MonitoringConfiguration: MonitoringConfigurationSchema.describe(
      "Contains the configuration settings for managed log persistence, delivering logs to Amazon S3 buckets, Amazon CloudWatch log groups etc.",
    ).optional(),
  }).describe("The workgroup configuration update object").optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the workgroup: ENABLED or DISABLED.",
  ).optional(),
  RecursiveDeleteOption: z.boolean().describe(
    "The option to delete the workgroup and its contents even if the workgroup contains any named queries.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  WorkGroupConfiguration: z.object({
    BytesScannedCutoffPerQuery: z.number(),
    EnforceWorkGroupConfiguration: z.boolean(),
    PublishCloudWatchMetricsEnabled: z.boolean(),
    RequesterPaysEnabled: z.boolean(),
    ResultConfiguration: ResultConfigurationSchema,
    EngineVersion: EngineVersionSchema,
    AdditionalConfiguration: z.string(),
    ExecutionRole: z.string(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema,
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema,
    EngineConfiguration: EngineConfigurationSchema,
    MonitoringConfiguration: MonitoringConfigurationSchema,
  }).optional(),
  WorkGroupConfigurationUpdates: z.object({
    BytesScannedCutoffPerQuery: z.number(),
    EnforceWorkGroupConfiguration: z.boolean(),
    PublishCloudWatchMetricsEnabled: z.boolean(),
    RequesterPaysEnabled: z.boolean(),
    ResultConfigurationUpdates: ResultConfigurationUpdatesSchema,
    RemoveBytesScannedCutoffPerQuery: z.boolean(),
    EngineVersion: EngineVersionSchema,
    AdditionalConfiguration: z.string(),
    ExecutionRole: z.string(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema,
    RemoveCustomerContentEncryptionConfiguration: z.boolean(),
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema,
    EngineConfiguration: EngineConfigurationSchema,
    MonitoringConfiguration: MonitoringConfigurationSchema,
  }).optional(),
  CreationTime: z.string().optional(),
  State: z.string().optional(),
  RecursiveDeleteOption: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("[a-zA-Z0-9._-]{1,128}")).describe(
    "The workGroup name.",
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "The workgroup description.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags, separated by commas, that you want to attach to the workgroup as you create it",
  ).optional(),
  WorkGroupConfiguration: z.object({
    BytesScannedCutoffPerQuery: z.number().int().min(10000000).describe(
      "The upper data usage limit (cutoff) for the amount of bytes a single query in a workgroup is allowed to scan.",
    ).optional(),
    EnforceWorkGroupConfiguration: z.boolean().describe(
      'If set to "true", the settings for the workgroup override client-side settings. If set to "false", client-side settings are used',
    ).optional(),
    PublishCloudWatchMetricsEnabled: z.boolean().describe(
      "Indicates that the Amazon CloudWatch metrics are enabled for the workgroup.",
    ).optional(),
    RequesterPaysEnabled: z.boolean().describe(
      "If set to true, allows members assigned to a workgroup to reference Amazon S3 Requester Pays buckets in queries. If set to false, workgroup members cannot query data from Requester Pays buckets, and queries that retrieve data from Requester Pays buckets cause an error.",
    ).optional(),
    ResultConfiguration: ResultConfigurationSchema.describe(
      'The location in Amazon S3 where query results are stored and the encryption option, if any, used for query results. These are known as "client-side settings". If workgroup settings override client-side settings, then the query uses the workgroup settings.',
    ).optional(),
    EngineVersion: EngineVersionSchema.describe(
      "The Athena engine version for running queries.",
    ).optional(),
    AdditionalConfiguration: z.string().describe(
      "Additional Configuration that are passed to Athena Spark Calculations running in this workgroup",
    ).optional(),
    ExecutionRole: z.string().describe(
      "The ARN of the execution role used to access user resources for Spark sessions and Identity Center enabled workgroups. This property applies only to Spark enabled workgroups and Identity Center enabled workgroups.",
    ).optional(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema.describe(
        "Indicates the KMS key for encrypting notebook content.",
      ).optional(),
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema
      .describe(
        "The configuration for the managed query results and encryption option. ResultConfiguration and ManagedQueryResultsConfiguration cannot be set at the same time",
      ).optional(),
    EngineConfiguration: EngineConfigurationSchema.describe(
      "The engine configuration for running queries.",
    ).optional(),
    MonitoringConfiguration: MonitoringConfigurationSchema.describe(
      "Contains the configuration settings for managed log persistence, delivering logs to Amazon S3 buckets, Amazon CloudWatch log groups etc.",
    ).optional(),
  }).describe("The workgroup configuration").optional(),
  WorkGroupConfigurationUpdates: z.object({
    BytesScannedCutoffPerQuery: z.number().int().min(10000000).describe(
      "The upper data usage limit (cutoff) for the amount of bytes a single query in a workgroup is allowed to scan.",
    ).optional(),
    EnforceWorkGroupConfiguration: z.boolean().describe(
      'If set to "true", the settings for the workgroup override client-side settings. If set to "false", client-side settings are used',
    ).optional(),
    PublishCloudWatchMetricsEnabled: z.boolean().describe(
      "Indicates that the Amazon CloudWatch metrics are enabled for the workgroup.",
    ).optional(),
    RequesterPaysEnabled: z.boolean().describe(
      "If set to true, allows members assigned to a workgroup to reference Amazon S3 Requester Pays buckets in queries. If set to false, workgroup members cannot query data from Requester Pays buckets, and queries that retrieve data from Requester Pays buckets cause an error.",
    ).optional(),
    ResultConfigurationUpdates: ResultConfigurationUpdatesSchema.describe(
      "The result configuration information about the queries in this workgroup that will be updated. Includes the updated results location and an updated option for encrypting query results.",
    ).optional(),
    RemoveBytesScannedCutoffPerQuery: z.boolean().describe(
      "Indicates that the data usage control limit per query is removed.",
    ).optional(),
    EngineVersion: EngineVersionSchema.describe(
      "The Athena engine version for running queries.",
    ).optional(),
    AdditionalConfiguration: z.string().describe(
      "Additional Configuration that are passed to Athena Spark Calculations running in this workgroup",
    ).optional(),
    ExecutionRole: z.string().describe(
      "The ARN of the execution role used to access user resources for Spark sessions and Identity Center enabled workgroups. This property applies only to Spark enabled workgroups and Identity Center enabled workgroups.",
    ).optional(),
    CustomerContentEncryptionConfiguration:
      CustomerContentEncryptionConfigurationSchema.describe(
        "Indicates the KMS key for encrypting notebook content.",
      ).optional(),
    RemoveCustomerContentEncryptionConfiguration: z.boolean().optional(),
    ManagedQueryResultsConfiguration: ManagedQueryResultsConfigurationSchema
      .describe(
        "The configuration for the managed query results and encryption option. ResultConfiguration and ManagedQueryResultsConfiguration cannot be set at the same time",
      ).optional(),
    EngineConfiguration: EngineConfigurationSchema.describe(
      "The engine configuration for running queries.",
    ).optional(),
    MonitoringConfiguration: MonitoringConfigurationSchema.describe(
      "Contains the configuration settings for managed log persistence, delivering logs to Amazon S3 buckets, Amazon CloudWatch log groups etc.",
    ).optional(),
  }).describe("The workgroup configuration update object").optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the workgroup: ENABLED or DISABLED.",
  ).optional(),
  RecursiveDeleteOption: z.boolean().describe(
    "The option to delete the workgroup and its contents even if the workgroup contains any named queries.",
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

/** Swamp extension model for Athena WorkGroup. Registered at `@swamp/aws/athena/work-group`. */
export const model = {
  type: "@swamp/aws/athena/work-group",
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
      description: "Athena WorkGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Athena WorkGroup",
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
          "AWS::Athena::WorkGroup",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a Athena WorkGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena WorkGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Athena::WorkGroup",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Athena WorkGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Athena::WorkGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Athena::WorkGroup",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Athena WorkGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena WorkGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Athena::WorkGroup",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Athena WorkGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Athena::WorkGroup",
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
