// Auto-generated extension model for @swamp/aws/mwaa/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MWAA Environment (AWS::MWAA::Environment).
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

const ModuleLoggingConfigurationSchema = z.object({
  Enabled: z.boolean().optional(),
  LogLevel: z.enum(["CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"])
    .optional(),
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
  Name: z.string().min(1).max(80).regex(
    new RegExp("^[a-zA-Z][0-9a-zA-Z\\-_]*$"),
  ).describe(
    "Customer-defined identifier for the environment, unique per customer region.",
  ),
  ExecutionRoleArn: z.string().max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe("IAM role to be used by tasks.").optional(),
  KmsKey: z.string().max(1224).regex(
    new RegExp(
      "^(((arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:kms:[a-z]{2}-[a-z]+-\\d:\\d+:)?key\\/)?[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|(arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):kms:[a-z]{2}-[a-z]+-\\d:\\d+:)?alias/.+)$",
    ),
  ).describe(
    "The identifier of the AWS Key Management Service (AWS KMS) customer master key (CMK) to use for MWAA data encryption. You can specify the CMK using any of the following: Key ID. For example, key/1234abcd-12ab-34cd-56ef-1234567890ab. Key alias. For example, alias/ExampleAlias. Key ARN. For example, arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. Alias ARN. For example, arn:aws:kms:us-east-1:012345678910:alias/ExampleAlias. AWS authenticates the CMK asynchronously. Therefore, if you specify an ID, alias, or ARN that is not valid, the action can appear to complete, but eventually fails.",
  ).optional(),
  AirflowVersion: z.string().max(32).regex(new RegExp("^[0-9a-z.]+$")).describe(
    "Version of airflow to deploy to the environment.",
  ).optional(),
  SourceBucketArn: z.string().min(1).max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:s3:::[a-z0-9.\\-]+$",
    ),
  ).describe(
    "ARN for the AWS S3 bucket to use as the source of DAGs and plugins for the environment.",
  ).optional(),
  DagS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  PluginsS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  PluginsS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  RequirementsS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  RequirementsS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  StartupScriptS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  StartupScriptS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  AirflowConfigurationOptions: z.record(z.string(), z.unknown()).describe(
    'Key/value pairs representing Airflow configuration variables. Keys are prefixed by their section: [core] dags_folder={AIRFLOW_HOME}/dags Would be represented as "core.dags_folder": "{AIRFLOW_HOME}/dags"',
  ).optional(),
  EnvironmentClass: z.string().min(1).max(1024).describe(
    "Templated configuration for airflow processes and backing infrastructure.",
  ).optional(),
  MaxWorkers: z.number().int().min(1).describe("Maximum worker compute units.")
    .optional(),
  MinWorkers: z.number().int().min(1).describe("Minimum worker compute units.")
    .optional(),
  MaxWebservers: z.number().int().min(1).describe(
    "Maximum webserver compute units.",
  ).optional(),
  MinWebservers: z.number().int().min(1).describe(
    "Minimum webserver compute units.",
  ).optional(),
  Schedulers: z.number().int().min(1).describe("Scheduler compute units.")
    .optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(
      z.string().max(1024).regex(new RegExp("^subnet-[a-zA-Z0-9\\-._]+$")),
    ).describe(
      "A list of subnets to use for the environment. These must be private subnets, in the same VPC, in two different availability zones.",
    ).optional(),
    SecurityGroupIds: z.array(
      z.string().min(1).max(1024).regex(new RegExp("^sg-[a-zA-Z0-9\\-._]+$")),
    ).describe("A list of security groups to use for the environment.")
      .optional(),
  }).describe("Configures the network resources of the environment.")
    .optional(),
  LoggingConfiguration: z.object({
    DagProcessingLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    SchedulerLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    WebserverLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    WorkerLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    TaskLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
  }).describe("Logging configuration for the environment.").optional(),
  WeeklyMaintenanceWindowStart: z.string().max(9).regex(
    new RegExp("(MON|TUE|WED|THU|FRI|SAT|SUN):([01]\\d|2[0-3]):(00|30)"),
  ).describe("Start time for the weekly maintenance window.").optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "A map of tags for the environment.",
  ).optional(),
  WebserverAccessMode: z.enum([
    "PRIVATE_ONLY",
    "PUBLIC_ONLY",
    "PUBLIC_AND_PRIVATE",
  ]).describe(
    "Choice for mode of webserver access including over public internet or via private VPC endpoint.",
  ).optional(),
  EndpointManagement: z.enum(["CUSTOMER", "SERVICE"]).describe(
    "Defines whether the VPC endpoints configured for the environment are created, and managed, by the customer or by Amazon MWAA.",
  ).optional(),
  WorkerReplacementStrategy: z.enum(["FORCED", "GRACEFUL"]).describe(
    "The worker replacement strategy to use when updating the environment. Valid values: `FORCED`, `GRACEFUL`. FORCED means Apache Airflow workers will be stopped and replaced without waiting for tasks to complete before an update. GRACEFUL means Apache Airflow workers will be able to complete running tasks for up to 12 hours during an update before being stopped and replaced.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Arn: z.string().optional(),
  WebserverUrl: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  KmsKey: z.string().optional(),
  AirflowVersion: z.string().optional(),
  SourceBucketArn: z.string().optional(),
  DagS3Path: z.string().optional(),
  PluginsS3Path: z.string().optional(),
  PluginsS3ObjectVersion: z.string().optional(),
  RequirementsS3Path: z.string().optional(),
  RequirementsS3ObjectVersion: z.string().optional(),
  StartupScriptS3Path: z.string().optional(),
  StartupScriptS3ObjectVersion: z.string().optional(),
  AirflowConfigurationOptions: z.record(z.string(), z.unknown()).optional(),
  EnvironmentClass: z.string().optional(),
  MaxWorkers: z.number().optional(),
  MinWorkers: z.number().optional(),
  MaxWebservers: z.number().optional(),
  MinWebservers: z.number().optional(),
  Schedulers: z.number().optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
  }).optional(),
  LoggingConfiguration: z.object({
    DagProcessingLogs: ModuleLoggingConfigurationSchema,
    SchedulerLogs: ModuleLoggingConfigurationSchema,
    WebserverLogs: ModuleLoggingConfigurationSchema,
    WorkerLogs: ModuleLoggingConfigurationSchema,
    TaskLogs: ModuleLoggingConfigurationSchema,
  }).optional(),
  WeeklyMaintenanceWindowStart: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  WebserverAccessMode: z.string().optional(),
  EndpointManagement: z.string().optional(),
  CeleryExecutorQueue: z.string().optional(),
  DatabaseVpcEndpointService: z.string().optional(),
  WebserverVpcEndpointService: z.string().optional(),
  WorkerReplacementStrategy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(80).regex(
    new RegExp("^[a-zA-Z][0-9a-zA-Z\\-_]*$"),
  ).describe(
    "Customer-defined identifier for the environment, unique per customer region.",
  ).optional(),
  ExecutionRoleArn: z.string().max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe("IAM role to be used by tasks.").optional(),
  KmsKey: z.string().max(1224).regex(
    new RegExp(
      "^(((arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:kms:[a-z]{2}-[a-z]+-\\d:\\d+:)?key\\/)?[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|(arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):kms:[a-z]{2}-[a-z]+-\\d:\\d+:)?alias/.+)$",
    ),
  ).describe(
    "The identifier of the AWS Key Management Service (AWS KMS) customer master key (CMK) to use for MWAA data encryption. You can specify the CMK using any of the following: Key ID. For example, key/1234abcd-12ab-34cd-56ef-1234567890ab. Key alias. For example, alias/ExampleAlias. Key ARN. For example, arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. Alias ARN. For example, arn:aws:kms:us-east-1:012345678910:alias/ExampleAlias. AWS authenticates the CMK asynchronously. Therefore, if you specify an ID, alias, or ARN that is not valid, the action can appear to complete, but eventually fails.",
  ).optional(),
  AirflowVersion: z.string().max(32).regex(new RegExp("^[0-9a-z.]+$")).describe(
    "Version of airflow to deploy to the environment.",
  ).optional(),
  SourceBucketArn: z.string().min(1).max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b)(-[a-z]+)?:s3:::[a-z0-9.\\-]+$",
    ),
  ).describe(
    "ARN for the AWS S3 bucket to use as the source of DAGs and plugins for the environment.",
  ).optional(),
  DagS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  PluginsS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  PluginsS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  RequirementsS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  RequirementsS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  StartupScriptS3Path: z.string().max(1024).regex(new RegExp(".*")).describe(
    "Represents an S3 prefix relative to the root of an S3 bucket.",
  ).optional(),
  StartupScriptS3ObjectVersion: z.string().max(1024).describe(
    "Represents an version ID for an S3 object.",
  ).optional(),
  AirflowConfigurationOptions: z.record(z.string(), z.unknown()).describe(
    'Key/value pairs representing Airflow configuration variables. Keys are prefixed by their section: [core] dags_folder={AIRFLOW_HOME}/dags Would be represented as "core.dags_folder": "{AIRFLOW_HOME}/dags"',
  ).optional(),
  EnvironmentClass: z.string().min(1).max(1024).describe(
    "Templated configuration for airflow processes and backing infrastructure.",
  ).optional(),
  MaxWorkers: z.number().int().min(1).describe("Maximum worker compute units.")
    .optional(),
  MinWorkers: z.number().int().min(1).describe("Minimum worker compute units.")
    .optional(),
  MaxWebservers: z.number().int().min(1).describe(
    "Maximum webserver compute units.",
  ).optional(),
  MinWebservers: z.number().int().min(1).describe(
    "Minimum webserver compute units.",
  ).optional(),
  Schedulers: z.number().int().min(1).describe("Scheduler compute units.")
    .optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(
      z.string().max(1024).regex(new RegExp("^subnet-[a-zA-Z0-9\\-._]+$")),
    ).describe(
      "A list of subnets to use for the environment. These must be private subnets, in the same VPC, in two different availability zones.",
    ).optional(),
    SecurityGroupIds: z.array(
      z.string().min(1).max(1024).regex(new RegExp("^sg-[a-zA-Z0-9\\-._]+$")),
    ).describe("A list of security groups to use for the environment.")
      .optional(),
  }).describe("Configures the network resources of the environment.")
    .optional(),
  LoggingConfiguration: z.object({
    DagProcessingLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    SchedulerLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    WebserverLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    WorkerLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
    TaskLogs: ModuleLoggingConfigurationSchema.describe(
      "Logging configuration for a specific airflow component.",
    ).optional(),
  }).describe("Logging configuration for the environment.").optional(),
  WeeklyMaintenanceWindowStart: z.string().max(9).regex(
    new RegExp("(MON|TUE|WED|THU|FRI|SAT|SUN):([01]\\d|2[0-3]):(00|30)"),
  ).describe("Start time for the weekly maintenance window.").optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "A map of tags for the environment.",
  ).optional(),
  WebserverAccessMode: z.enum([
    "PRIVATE_ONLY",
    "PUBLIC_ONLY",
    "PUBLIC_AND_PRIVATE",
  ]).describe(
    "Choice for mode of webserver access including over public internet or via private VPC endpoint.",
  ).optional(),
  EndpointManagement: z.enum(["CUSTOMER", "SERVICE"]).describe(
    "Defines whether the VPC endpoints configured for the environment are created, and managed, by the customer or by Amazon MWAA.",
  ).optional(),
  WorkerReplacementStrategy: z.enum(["FORCED", "GRACEFUL"]).describe(
    "The worker replacement strategy to use when updating the environment. Valid values: `FORCED`, `GRACEFUL`. FORCED means Apache Airflow workers will be stopped and replaced without waiting for tasks to complete before an update. GRACEFUL means Apache Airflow workers will be able to complete running tasks for up to 12 hours during an update before being stopped and replaced.",
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

/** Swamp extension model for MWAA Environment. Registered at `@swamp/aws/mwaa/environment`. */
export const model = {
  type: "@swamp/aws/mwaa/environment",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "No schema changes",
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
      description: "MWAA Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MWAA Environment",
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
          "AWS::MWAA::Environment",
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
      description: "Get a MWAA Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAA Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MWAA::Environment",
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
      description: "Update a MWAA Environment",
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
          "AWS::MWAA::Environment",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MWAA::Environment",
          identifier,
          currentState,
          desiredState,
          ["Name", "KmsKey", "SubnetIds", "EndpointManagement"],
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
      description: "Delete a MWAA Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAA Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MWAA::Environment",
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
      description: "Sync MWAA Environment state from AWS",
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
            "AWS::MWAA::Environment",
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
