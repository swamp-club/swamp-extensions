// Auto-generated extension model for @swamp/aws/synthetics/canary
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Synthetics Canary (AWS::Synthetics::Canary).
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

const DependencySchema = z.object({
  Type: z.enum(["LambdaLayer"]).describe("Type of dependency").optional(),
  Reference: z.string().min(1).max(140).regex(
    new RegExp(
      "arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+",
    ),
  ).describe("ARN of the Lambda layer"),
});

const S3EncryptionSchema = z.object({
  EncryptionMode: z.string().describe(
    "Encryption mode for encrypting artifacts when uploading to S3. Valid values: SSE_S3 and SSE_KMS.",
  ).optional(),
  KmsKeyArn: z.string().describe(
    "KMS key Arn for encrypting artifacts when uploading to S3. You must specify KMS key Arn for SSE_KMS encryption mode only.",
  ).optional(),
});

const RetryConfigSchema = z.object({
  MaxRetries: z.number().int().describe(
    "maximum times the canary will be retried upon the scheduled run failure",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const BaseScreenshotSchema = z.object({
  ScreenshotName: z.string().describe(
    "Name of the screenshot to be used as base reference for visual testing",
  ),
  IgnoreCoordinates: z.array(z.string()).describe(
    "List of coordinates of rectangles to be ignored during visual testing",
  ).optional(),
});

const BrowserConfigSchema = z.object({
  BrowserType: z.enum(["CHROME", "FIREFOX"]),
});

const VisualReferenceSchema = z.object({
  BaseCanaryRunId: z.string().describe(
    "Canary run id to be used as base reference for visual testing",
  ),
  BaseScreenshots: z.array(BaseScreenshotSchema).describe(
    "List of screenshots used as base reference for visual testing",
  ).optional(),
  BrowserType: z.enum(["CHROME", "FIREFOX"]).optional(),
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
  Name: z.string().regex(new RegExp("^[0-9a-z_\\-]{1,255}$")).describe(
    "Name of the canary.",
  ),
  Code: z.object({
    S3Bucket: z.string().optional(),
    S3Key: z.string().optional(),
    S3ObjectVersion: z.string().optional(),
    Script: z.string().optional(),
    Handler: z.string().optional(),
    Dependencies: z.array(DependencySchema).describe(
      "List of Lambda layers to attach to the canary",
    ).optional(),
    BlueprintTypes: z.array(z.string()).optional(),
  }).describe("Provide the canary script source"),
  ArtifactS3Location: z.string().regex(new RegExp("^(s3|S3)://")).describe(
    "Provide the s3 bucket output location for test results",
  ),
  ArtifactConfig: z.object({
    S3Encryption: S3EncryptionSchema.describe(
      "Encryption configuration for uploading artifacts to S3",
    ).optional(),
  }).describe("Provide artifact configuration").optional(),
  Schedule: z.object({
    Expression: z.string(),
    DurationInSeconds: z.string().optional(),
    RetryConfig: RetryConfigSchema.describe(
      "Provide canary auto retry configuration",
    ).optional(),
  }).describe("Frequency to run your canaries"),
  ExecutionRoleArn: z.string().describe(
    "Lambda Execution role used to run your canaries",
  ),
  RuntimeVersion: z.string().describe("Runtime version of Synthetics Library"),
  SuccessRetentionPeriod: z.number().int().describe(
    "Retention period of successful canary runs represented in number of days",
  ).optional(),
  FailureRetentionPeriod: z.number().int().describe(
    "Retention period of failed canary runs represented in number of days",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConfig: z.object({
    VpcId: z.string().optional(),
    SubnetIds: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
    Ipv6AllowedForDualStack: z.boolean().describe(
      "Allow outbound IPv6 traffic on VPC canaries that are connected to dual-stack subnets if set to true",
    ).optional(),
  }).describe("Provide VPC Configuration if enabled.").optional(),
  RunConfig: z.object({
    TimeoutInSeconds: z.number().int().describe(
      "Provide maximum canary timeout per run in seconds",
    ).optional(),
    MemoryInMB: z.number().int().describe(
      "Provide maximum memory available for canary in MB",
    ).optional(),
    EphemeralStorage: z.number().int().describe(
      "Provide ephemeralStorage available for canary in MB",
    ).optional(),
    ActiveTracing: z.boolean().describe("Enable active tracing if set to true")
      .optional(),
    EnvironmentVariables: z.record(z.string(), z.string()).describe(
      "Environment variable key-value pairs.",
    ).optional(),
  }).describe("Provide canary run configuration").optional(),
  StartCanaryAfterCreation: z.boolean().describe(
    "Runs canary if set to True. Default is False",
  ).optional(),
  VisualReference: z.object({
    BaseCanaryRunId: z.string().describe(
      "Canary run id to be used as base reference for visual testing",
    ),
    BaseScreenshots: z.array(BaseScreenshotSchema).describe(
      "List of screenshots used as base reference for visual testing",
    ).optional(),
    BrowserType: z.enum(["CHROME", "FIREFOX"]).optional(),
  }).describe("Visual reference configuration for visual testing").optional(),
  DeleteLambdaResourcesOnCanaryDeletion: z.boolean().describe(
    "Deletes associated lambda resources created by Synthetics if set to True. Default is False",
  ).optional(),
  ResourcesToReplicateTags: z.array(z.enum(["lambda-function"])).describe(
    "List of resources which canary tags should be replicated to.",
  ).optional(),
  ProvisionedResourceCleanup: z.enum(["AUTOMATIC", "OFF"]).describe(
    "Setting to control if provisioned resources created by Synthetics are deleted alongside the canary. Default is AUTOMATIC.",
  ).optional(),
  DryRunAndUpdate: z.boolean().describe(
    "Setting to control if UpdateCanary will perform a DryRun and validate it is PASSING before performing the Update. Default is FALSE.",
  ).optional(),
  BrowserConfigs: z.array(BrowserConfigSchema).describe(
    "List of browser configurations for the canary",
  ).optional(),
  VisualReferences: z.array(VisualReferenceSchema).describe(
    "List of visual references for the canary",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Id: z.string().optional(),
  State: z.string().optional(),
  Code: z.object({
    S3Bucket: z.string(),
    S3Key: z.string(),
    S3ObjectVersion: z.string(),
    Script: z.string(),
    Handler: z.string(),
    SourceLocationArn: z.string(),
    Dependencies: z.array(DependencySchema),
    BlueprintTypes: z.array(z.string()),
  }).optional(),
  ArtifactS3Location: z.string().optional(),
  ArtifactConfig: z.object({
    S3Encryption: S3EncryptionSchema,
  }).optional(),
  Schedule: z.object({
    Expression: z.string(),
    DurationInSeconds: z.string(),
    RetryConfig: RetryConfigSchema,
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  RuntimeVersion: z.string().optional(),
  SuccessRetentionPeriod: z.number().optional(),
  FailureRetentionPeriod: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConfig: z.object({
    VpcId: z.string(),
    SubnetIds: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
    Ipv6AllowedForDualStack: z.boolean(),
  }).optional(),
  RunConfig: z.object({
    TimeoutInSeconds: z.number(),
    MemoryInMB: z.number(),
    EphemeralStorage: z.number(),
    ActiveTracing: z.boolean(),
    EnvironmentVariables: z.record(z.string(), z.unknown()),
  }).optional(),
  StartCanaryAfterCreation: z.boolean().optional(),
  VisualReference: VisualReferenceSchema.optional(),
  DeleteLambdaResourcesOnCanaryDeletion: z.boolean().optional(),
  ResourcesToReplicateTags: z.array(z.string()).optional(),
  ProvisionedResourceCleanup: z.string().optional(),
  DryRunAndUpdate: z.boolean().optional(),
  BrowserConfigs: z.array(BrowserConfigSchema).optional(),
  VisualReferences: z.array(VisualReferenceSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("^[0-9a-z_\\-]{1,255}$")).describe(
    "Name of the canary.",
  ).optional(),
  Code: z.object({
    S3Bucket: z.string().optional(),
    S3Key: z.string().optional(),
    S3ObjectVersion: z.string().optional(),
    Script: z.string().optional(),
    Handler: z.string().optional(),
    Dependencies: z.array(DependencySchema).describe(
      "List of Lambda layers to attach to the canary",
    ).optional(),
    BlueprintTypes: z.array(z.string()).optional(),
  }).describe("Provide the canary script source").optional(),
  ArtifactS3Location: z.string().regex(new RegExp("^(s3|S3)://")).describe(
    "Provide the s3 bucket output location for test results",
  ).optional(),
  ArtifactConfig: z.object({
    S3Encryption: S3EncryptionSchema.describe(
      "Encryption configuration for uploading artifacts to S3",
    ).optional(),
  }).describe("Provide artifact configuration").optional(),
  Schedule: z.object({
    Expression: z.string().optional(),
    DurationInSeconds: z.string().optional(),
    RetryConfig: RetryConfigSchema.describe(
      "Provide canary auto retry configuration",
    ).optional(),
  }).describe("Frequency to run your canaries").optional(),
  ExecutionRoleArn: z.string().describe(
    "Lambda Execution role used to run your canaries",
  ).optional(),
  RuntimeVersion: z.string().describe("Runtime version of Synthetics Library")
    .optional(),
  SuccessRetentionPeriod: z.number().int().describe(
    "Retention period of successful canary runs represented in number of days",
  ).optional(),
  FailureRetentionPeriod: z.number().int().describe(
    "Retention period of failed canary runs represented in number of days",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConfig: z.object({
    VpcId: z.string().optional(),
    SubnetIds: z.array(z.string()).optional(),
    SecurityGroupIds: z.array(z.string()).optional(),
    Ipv6AllowedForDualStack: z.boolean().describe(
      "Allow outbound IPv6 traffic on VPC canaries that are connected to dual-stack subnets if set to true",
    ).optional(),
  }).describe("Provide VPC Configuration if enabled.").optional(),
  RunConfig: z.object({
    TimeoutInSeconds: z.number().int().describe(
      "Provide maximum canary timeout per run in seconds",
    ).optional(),
    MemoryInMB: z.number().int().describe(
      "Provide maximum memory available for canary in MB",
    ).optional(),
    EphemeralStorage: z.number().int().describe(
      "Provide ephemeralStorage available for canary in MB",
    ).optional(),
    ActiveTracing: z.boolean().describe("Enable active tracing if set to true")
      .optional(),
    EnvironmentVariables: z.record(z.string(), z.string()).describe(
      "Environment variable key-value pairs.",
    ).optional(),
  }).describe("Provide canary run configuration").optional(),
  StartCanaryAfterCreation: z.boolean().describe(
    "Runs canary if set to True. Default is False",
  ).optional(),
  VisualReference: z.object({
    BaseCanaryRunId: z.string().describe(
      "Canary run id to be used as base reference for visual testing",
    ).optional(),
    BaseScreenshots: z.array(BaseScreenshotSchema).describe(
      "List of screenshots used as base reference for visual testing",
    ).optional(),
    BrowserType: z.enum(["CHROME", "FIREFOX"]).optional(),
  }).describe("Visual reference configuration for visual testing").optional(),
  DeleteLambdaResourcesOnCanaryDeletion: z.boolean().describe(
    "Deletes associated lambda resources created by Synthetics if set to True. Default is False",
  ).optional(),
  ResourcesToReplicateTags: z.array(z.enum(["lambda-function"])).describe(
    "List of resources which canary tags should be replicated to.",
  ).optional(),
  ProvisionedResourceCleanup: z.enum(["AUTOMATIC", "OFF"]).describe(
    "Setting to control if provisioned resources created by Synthetics are deleted alongside the canary. Default is AUTOMATIC.",
  ).optional(),
  DryRunAndUpdate: z.boolean().describe(
    "Setting to control if UpdateCanary will perform a DryRun and validate it is PASSING before performing the Update. Default is FALSE.",
  ).optional(),
  BrowserConfigs: z.array(BrowserConfigSchema).describe(
    "List of browser configurations for the canary",
  ).optional(),
  VisualReferences: z.array(VisualReferenceSchema).describe(
    "List of visual references for the canary",
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

/** Swamp extension model for Synthetics Canary. Registered at `@swamp/aws/synthetics/canary`. */
export const model = {
  type: "@swamp/aws/synthetics/canary",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Synthetics Canary resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Synthetics Canary",
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
          "AWS::Synthetics::Canary",
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
      description: "Get a Synthetics Canary",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Synthetics Canary",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Synthetics::Canary",
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
      description: "Update a Synthetics Canary",
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
          "AWS::Synthetics::Canary",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Synthetics::Canary",
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
      description: "Delete a Synthetics Canary",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Synthetics Canary",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Synthetics::Canary",
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
      description: "Sync Synthetics Canary state from AWS",
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
            "AWS::Synthetics::Canary",
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
