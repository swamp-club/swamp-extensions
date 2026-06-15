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

// Auto-generated extension model for @swamp/aws/emrserverless/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMRServerless Application (AWS::EMRServerless::Application).
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

const WorkerConfigurationSchema = z.object({
  Cpu: z.string().min(1).max(15).regex(
    new RegExp("^[1-9][0-9]*(\\s)?(vCPU|vcpu|VCPU)?$"),
  ).describe(
    "Per worker CPU resource. vCPU is the only supported unit and specifying vCPU is optional.",
  ),
  Memory: z.string().min(1).max(15).regex(
    new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)?$"),
  ).describe(
    "Per worker memory resource. GB is the only supported unit and specifying GB is optional.",
  ),
  Disk: z.string().min(1).max(15).regex(
    new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)$"),
  ).describe(
    "Per worker Disk resource. GB is the only supported unit and specifying GB is optional",
  ).optional(),
  DiskType: z.string().regex(
    new RegExp(
      "^(SHUFFLE_OPTIMIZED|[Ss]huffle_[Oo]ptimized|STANDARD|[Ss]tandard)$",
    ),
  ).describe(
    "Per worker DiskType resource. Shuffle optimized and Standard are only supported types and specifying diskType is optional",
  ).optional(),
});

const InitialCapacityConfigSchema = z.object({
  WorkerCount: z.number().int().min(1).max(1000000).describe(
    "Initial count of workers to be initialized when an Application is started. This count will be continued to be maintained until the Application is stopped",
  ),
  WorkerConfiguration: WorkerConfigurationSchema,
});

const InitialCapacityConfigKeyValuePairSchema = z.object({
  Key: z.string().min(1).max(50).regex(new RegExp("^[a-zA-Z]+[-_]*[a-zA-Z]+$"))
    .describe("Worker type for an analytics framework."),
  Value: InitialCapacityConfigSchema,
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[A-Za-z0-9 /_.:=+@-]+$"))
    .describe(
      "The value for the tag. You can specify a value that is 1 to 128 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[A-Za-z0-9 /_.:=+@-]*$"))
    .describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
});

const S3MonitoringConfigurationSchema = z.object({
  LogUri: z.string().min(1).max(10280).regex(
    new RegExp(
      "[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\r\\n\\t]*",
    ),
  ).optional(),
  EncryptionKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):kms:[a-zA-Z0-9\\-]*:(\\d{12})?:key\\/[a-zA-Z0-9-]+$",
    ),
  ).describe("KMS key ARN to encrypt the logs stored in given s3").optional(),
});

const ManagedPersistenceMonitoringConfigurationSchema = z.object({
  Enabled: z.boolean().describe(
    "If set to false, managed logging will be turned off. Defaults to true.",
  ).optional(),
  EncryptionKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):kms:[a-zA-Z0-9\\-]*:(\\d{12})?:key\\/[a-zA-Z0-9-]+$",
    ),
  ).describe("KMS key ARN to encrypt the logs stored in managed persistence")
    .optional(),
});

const LogTypeMapKeyValuePairSchema = z.object({
  Key: z.string().min(1).max(50).regex(new RegExp("^[a-zA-Z]+[-_]*[a-zA-Z]+$")),
  Value: z.array(
    z.string().min(1).max(50).regex(new RegExp("^[a-zA-Z]+[-_]*[a-zA-Z]+$")),
  ).describe(
    "List of Applicable values: [STDOUT, STDERR, HIVE_LOG, TEZ_AM, SYSTEM_LOGS]",
  ),
});

const CloudWatchLoggingConfigurationSchema = z.object({
  Enabled: z.boolean().describe(
    "If set to false, CloudWatch logging will be turned off. Defaults to false.",
  ).optional(),
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
  ).describe(
    "Log-group name to produce log-streams on CloudWatch. If undefined, logs will be produced in a default log-group /aws/emr-serverless",
  ).optional(),
  LogStreamNamePrefix: z.string().min(1).max(512).regex(new RegExp("^[^:*]*$"))
    .describe(
      "Log-stream name prefix by which log-stream names will start in the CloudWatch Log-group.",
    ).optional(),
  EncryptionKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):kms:[a-zA-Z0-9\\-]*:(\\d{12})?:key\\/[a-zA-Z0-9-]+$",
    ),
  ).describe(
    "KMS key ARN to encrypt the logs stored in given CloudWatch log-group.",
  ).optional(),
  LogTypeMap: z.array(LogTypeMapKeyValuePairSchema).describe(
    "The specific log-streams which need to be uploaded to CloudWatch.",
  ).optional(),
});

const PrometheusMonitoringConfigurationSchema = z.object({
  RemoteWriteUrl: z.string().min(1).max(10280).regex(
    new RegExp(
      "^https://aps-workspaces.([a-z]{2}-[a-z-]{1,20}-[1-9]).amazonaws(.[0-9A-Za-z]{2,4})+/workspaces/[-_.0-9A-Za-z]{1,100}/api/v1/remote_write$",
    ),
  ).describe(
    "The remote write URL in the Amazon Managed Service for Prometheus workspace to send metrics to.",
  ).optional(),
});

const ImageConfigurationInputSchema = z.object({
  ImageUri: z.string().min(1).max(1024).regex(
    new RegExp(
      "^([a-z0-9]+[a-z0-9-.]*)\\/((?:[a-z0-9]+(?:[._-][a-z0-9]+)*\\/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)(?:\\:([a-zA-Z0-9_][a-zA-Z0-9-._]{0,299})|@(sha256:[0-9a-f]{64}))$",
    ),
  ).describe(
    "The URI of an image in the Amazon ECR registry. This field is required when you create a new application. If you leave this field blank in an update, Amazon EMR will remove the image configuration.",
  ).optional(),
});

const WorkerTypeSpecificationInputSchema = z.object({
  ImageConfiguration: ImageConfigurationInputSchema.describe(
    "The image configuration.",
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
  Architecture: z.enum(["ARM64", "X86_64"]).describe(
    "The cpu architecture of an application.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9._\\/#-]+$"))
    .describe("User friendly Application name.").optional(),
  ReleaseLabel: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9._/-]+$"),
  ).describe("EMR release label."),
  Type: z.string().describe("The type of the application"),
  InitialCapacity: z.array(InitialCapacityConfigKeyValuePairSchema).describe(
    "Initial capacity initialized when an Application is started.",
  ).optional(),
  MaximumCapacity: z.object({
    Cpu: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(vCPU|vcpu|VCPU)?$"),
    ).describe(
      "Per worker CPU resource. vCPU is the only supported unit and specifying vCPU is optional.",
    ),
    Memory: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)?$"),
    ).describe(
      "Per worker memory resource. GB is the only supported unit and specifying GB is optional.",
    ),
    Disk: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)$"),
    ).describe(
      "Per worker Disk resource. GB is the only supported unit and specifying GB is optional",
    ).optional(),
  }).describe(
    "Maximum allowed cumulative resources for an Application. No new resources will be created once the limit is hit.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tag map with key and value").optional(),
  AutoStartConfiguration: z.object({
    Enabled: z.boolean().describe(
      "If set to true, the Application will automatically start. Defaults to true.",
    ).optional(),
  }).describe("Configuration for Auto Start of Application.").optional(),
  AutoStopConfiguration: z.object({
    Enabled: z.boolean().describe(
      "If set to true, the Application will automatically stop after being idle. Defaults to true.",
    ).optional(),
    IdleTimeoutMinutes: z.number().int().describe(
      "The amount of time [in minutes] to wait before auto stopping the Application when idle. Defaults to 15 minutes.",
    ).optional(),
  }).describe("Configuration for Auto Stop of Application.").optional(),
  ImageConfiguration: z.object({
    ImageUri: z.string().min(1).max(1024).regex(
      new RegExp(
        "^([a-z0-9]+[a-z0-9-.]*)\\/((?:[a-z0-9]+(?:[._-][a-z0-9]+)*\\/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)(?:\\:([a-zA-Z0-9_][a-zA-Z0-9-._]{0,299})|@(sha256:[0-9a-f]{64}))$",
      ),
    ).describe(
      "The URI of an image in the Amazon ECR registry. This field is required when you create a new application. If you leave this field blank in an update, Amazon EMR will remove the image configuration.",
    ).optional(),
  }).describe("The image configuration.").optional(),
  MonitoringConfiguration: z.object({
    S3MonitoringConfiguration: S3MonitoringConfigurationSchema.describe(
      "S3 monitoring configurations for a JobRun.",
    ).optional(),
    ManagedPersistenceMonitoringConfiguration:
      ManagedPersistenceMonitoringConfigurationSchema.describe(
        "Managed log persistence configurations for a JobRun.",
      ).optional(),
    CloudWatchLoggingConfiguration: CloudWatchLoggingConfigurationSchema
      .describe("CloudWatch logging configurations for a JobRun.").optional(),
    PrometheusMonitoringConfiguration: PrometheusMonitoringConfigurationSchema
      .describe("Prometheus monitoring configurations for a JobRun.")
      .optional(),
  }).describe("Monitoring configuration for batch and interactive JobRun.")
    .optional(),
  InteractiveConfiguration: z.object({
    LivyEndpointEnabled: z.boolean().describe(
      "Enables an Apache Livy endpoint that you can connect to and run interactive jobs",
    ).optional(),
    StudioEnabled: z.boolean().describe(
      "Enabled you to connect an Application to Amazon EMR Studio to run interactive workloads in a notebook",
    ).optional(),
    SessionEnabled: z.boolean().describe(
      "Enables interactive sessions on the application",
    ).optional(),
  }).optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+")),
    ).describe(
      "The ID of the subnets in the VPC to which you want to connect your job or application.",
    ).optional(),
    SecurityGroupIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+")),
    ).describe(
      "The ID of the security groups in the VPC to which you want to connect your job or application.",
    ).optional(),
  }).describe("Network Configuration for customer VPC connectivity.")
    .optional(),
  WorkerTypeSpecifications: z.record(
    z.string(),
    WorkerTypeSpecificationInputSchema,
  ).describe(
    "The key-value pairs that specify worker type to WorkerTypeSpecificationInput. This parameter must contain all valid worker types for a Spark or Hive application. Valid worker types include Driver and Executor for Spark applications and HiveDriver and TezTask for Hive applications. You can either set image details in this parameter for each worker type, or in imageConfiguration for all worker types.",
  ).optional(),
  SchedulerConfiguration: z.object({
    QueueTimeoutMinutes: z.number().int().describe(
      "The maximum duration in minutes for the job in QUEUED state. If scheduler configuration is enabled on your application, the default value is 360 minutes (6 hours). The valid range is from 15 to 720.",
    ).optional(),
    MaxConcurrentRuns: z.number().int().describe(
      "The maximum concurrent job runs on this application. If scheduler configuration is enabled on your application, the default value is 15. The valid range is 1 to 1000.",
    ).optional(),
  }).describe(
    "The scheduler configuration for batch and streaming jobs running on this application. Supported with release labels emr-7.0.0 and above.",
  ).optional(),
  IdentityCenterConfiguration: z.object({
    IdentityCenterInstanceArn: z.string().min(1).max(1024).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z0-9-]*):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
      ),
    ).describe("The IAM IdentityCenter instance arn").optional(),
  }).describe(
    "The IAM IdentityCenter configuration for trusted-identity-propagation on this application. Supported with release labels emr-7.8.0 and above.",
  ).optional(),
});

const StateSchema = z.object({
  Architecture: z.string().optional(),
  Name: z.string().optional(),
  ReleaseLabel: z.string().optional(),
  Type: z.string().optional(),
  InitialCapacity: z.array(InitialCapacityConfigKeyValuePairSchema).optional(),
  MaximumCapacity: z.object({
    Cpu: z.string(),
    Memory: z.string(),
    Disk: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  AutoStartConfiguration: z.object({
    Enabled: z.boolean(),
  }).optional(),
  AutoStopConfiguration: z.object({
    Enabled: z.boolean(),
    IdleTimeoutMinutes: z.number(),
  }).optional(),
  ImageConfiguration: ImageConfigurationInputSchema.optional(),
  MonitoringConfiguration: z.object({
    S3MonitoringConfiguration: S3MonitoringConfigurationSchema,
    ManagedPersistenceMonitoringConfiguration:
      ManagedPersistenceMonitoringConfigurationSchema,
    CloudWatchLoggingConfiguration: CloudWatchLoggingConfigurationSchema,
    PrometheusMonitoringConfiguration: PrometheusMonitoringConfigurationSchema,
  }).optional(),
  InteractiveConfiguration: z.object({
    LivyEndpointEnabled: z.boolean(),
    StudioEnabled: z.boolean(),
    SessionEnabled: z.boolean(),
  }).optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
  }).optional(),
  Arn: z.string().optional(),
  ApplicationId: z.string(),
  WorkerTypeSpecifications: z.record(z.string(), z.unknown()).optional(),
  SchedulerConfiguration: z.object({
    QueueTimeoutMinutes: z.number(),
    MaxConcurrentRuns: z.number(),
  }).optional(),
  IdentityCenterConfiguration: z.object({
    IdentityCenterInstanceArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Architecture: z.enum(["ARM64", "X86_64"]).describe(
    "The cpu architecture of an application.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9._\\/#-]+$"))
    .describe("User friendly Application name.").optional(),
  ReleaseLabel: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9._/-]+$"),
  ).describe("EMR release label.").optional(),
  Type: z.string().describe("The type of the application").optional(),
  InitialCapacity: z.array(InitialCapacityConfigKeyValuePairSchema).describe(
    "Initial capacity initialized when an Application is started.",
  ).optional(),
  MaximumCapacity: z.object({
    Cpu: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(vCPU|vcpu|VCPU)?$"),
    ).describe(
      "Per worker CPU resource. vCPU is the only supported unit and specifying vCPU is optional.",
    ).optional(),
    Memory: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)?$"),
    ).describe(
      "Per worker memory resource. GB is the only supported unit and specifying GB is optional.",
    ).optional(),
    Disk: z.string().min(1).max(15).regex(
      new RegExp("^[1-9][0-9]*(\\s)?(GB|gb|gB|Gb)$"),
    ).describe(
      "Per worker Disk resource. GB is the only supported unit and specifying GB is optional",
    ).optional(),
  }).describe(
    "Maximum allowed cumulative resources for an Application. No new resources will be created once the limit is hit.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tag map with key and value").optional(),
  AutoStartConfiguration: z.object({
    Enabled: z.boolean().describe(
      "If set to true, the Application will automatically start. Defaults to true.",
    ).optional(),
  }).describe("Configuration for Auto Start of Application.").optional(),
  AutoStopConfiguration: z.object({
    Enabled: z.boolean().describe(
      "If set to true, the Application will automatically stop after being idle. Defaults to true.",
    ).optional(),
    IdleTimeoutMinutes: z.number().int().describe(
      "The amount of time [in minutes] to wait before auto stopping the Application when idle. Defaults to 15 minutes.",
    ).optional(),
  }).describe("Configuration for Auto Stop of Application.").optional(),
  ImageConfiguration: z.object({
    ImageUri: z.string().min(1).max(1024).regex(
      new RegExp(
        "^([a-z0-9]+[a-z0-9-.]*)\\/((?:[a-z0-9]+(?:[._-][a-z0-9]+)*\\/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)(?:\\:([a-zA-Z0-9_][a-zA-Z0-9-._]{0,299})|@(sha256:[0-9a-f]{64}))$",
      ),
    ).describe(
      "The URI of an image in the Amazon ECR registry. This field is required when you create a new application. If you leave this field blank in an update, Amazon EMR will remove the image configuration.",
    ).optional(),
  }).describe("The image configuration.").optional(),
  MonitoringConfiguration: z.object({
    S3MonitoringConfiguration: S3MonitoringConfigurationSchema.describe(
      "S3 monitoring configurations for a JobRun.",
    ).optional(),
    ManagedPersistenceMonitoringConfiguration:
      ManagedPersistenceMonitoringConfigurationSchema.describe(
        "Managed log persistence configurations for a JobRun.",
      ).optional(),
    CloudWatchLoggingConfiguration: CloudWatchLoggingConfigurationSchema
      .describe("CloudWatch logging configurations for a JobRun.").optional(),
    PrometheusMonitoringConfiguration: PrometheusMonitoringConfigurationSchema
      .describe("Prometheus monitoring configurations for a JobRun.")
      .optional(),
  }).describe("Monitoring configuration for batch and interactive JobRun.")
    .optional(),
  InteractiveConfiguration: z.object({
    LivyEndpointEnabled: z.boolean().describe(
      "Enables an Apache Livy endpoint that you can connect to and run interactive jobs",
    ).optional(),
    StudioEnabled: z.boolean().describe(
      "Enabled you to connect an Application to Amazon EMR Studio to run interactive workloads in a notebook",
    ).optional(),
    SessionEnabled: z.boolean().describe(
      "Enables interactive sessions on the application",
    ).optional(),
  }).optional(),
  NetworkConfiguration: z.object({
    SubnetIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+")),
    ).describe(
      "The ID of the subnets in the VPC to which you want to connect your job or application.",
    ).optional(),
    SecurityGroupIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+")),
    ).describe(
      "The ID of the security groups in the VPC to which you want to connect your job or application.",
    ).optional(),
  }).describe("Network Configuration for customer VPC connectivity.")
    .optional(),
  WorkerTypeSpecifications: z.record(
    z.string(),
    WorkerTypeSpecificationInputSchema,
  ).describe(
    "The key-value pairs that specify worker type to WorkerTypeSpecificationInput. This parameter must contain all valid worker types for a Spark or Hive application. Valid worker types include Driver and Executor for Spark applications and HiveDriver and TezTask for Hive applications. You can either set image details in this parameter for each worker type, or in imageConfiguration for all worker types.",
  ).optional(),
  SchedulerConfiguration: z.object({
    QueueTimeoutMinutes: z.number().int().describe(
      "The maximum duration in minutes for the job in QUEUED state. If scheduler configuration is enabled on your application, the default value is 360 minutes (6 hours). The valid range is from 15 to 720.",
    ).optional(),
    MaxConcurrentRuns: z.number().int().describe(
      "The maximum concurrent job runs on this application. If scheduler configuration is enabled on your application, the default value is 15. The valid range is 1 to 1000.",
    ).optional(),
  }).describe(
    "The scheduler configuration for batch and streaming jobs running on this application. Supported with release labels emr-7.0.0 and above.",
  ).optional(),
  IdentityCenterConfiguration: z.object({
    IdentityCenterInstanceArn: z.string().min(1).max(1024).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z0-9-]*):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
      ),
    ).describe("The IAM IdentityCenter instance arn").optional(),
  }).describe(
    "The IAM IdentityCenter configuration for trusted-identity-propagation on this application. Supported with release labels emr-7.8.0 and above.",
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

/** Swamp extension model for EMRServerless Application. Registered at `@swamp/aws/emrserverless/application`. */
export const model = {
  type: "@swamp/aws/emrserverless/application",
  version: "2026.06.15.1",
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
      toVersion: "2026.05.01.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EMRServerless Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMRServerless Application",
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
          "AWS::EMRServerless::Application",
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
      description: "Get a EMRServerless Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRServerless Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMRServerless::Application",
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
      description: "Update a EMRServerless Application",
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
        const identifier = existing.ApplicationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EMRServerless::Application",
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
          "AWS::EMRServerless::Application",
          identifier,
          currentState,
          desiredState,
          ["Name", "Type"],
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
      description: "Delete a EMRServerless Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRServerless Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMRServerless::Application",
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
      description: "Sync EMRServerless Application state from AWS",
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
        const identifier = existing.ApplicationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMRServerless::Application",
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
