// Auto-generated extension model for @swamp/aws/imagebuilder/infrastructure-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ImageBuilder InfrastructureConfiguration (AWS::ImageBuilder::InfrastructureConfiguration).
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

const S3LogsSchema = z.object({
  S3BucketName: z.string().describe("S3BucketName").optional(),
  S3KeyPrefix: z.string().describe("S3KeyPrefix").optional(),
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
  Name: z.string().describe("The name of the infrastructure configuration."),
  Description: z.string().describe(
    "The description of the infrastructure configuration.",
  ).optional(),
  InstanceTypes: z.array(z.string()).describe(
    "The instance types of the infrastructure configuration.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The security group IDs of the infrastructure configuration.",
  ).optional(),
  Logging: z.object({
    S3Logs: S3LogsSchema.describe("The S3 path in which to store the logs.")
      .optional(),
  }).describe("The logging configuration of the infrastructure configuration.")
    .optional(),
  SubnetId: z.string().describe(
    "The subnet ID of the infrastructure configuration.",
  ).optional(),
  KeyPair: z.string().describe(
    "The EC2 key pair of the infrastructure configuration..",
  ).optional(),
  TerminateInstanceOnFailure: z.boolean().describe(
    "The terminate instance on failure configuration of the infrastructure configuration.",
  ).optional(),
  InstanceProfileName: z.string().describe(
    "The instance profile of the infrastructure configuration.",
  ),
  InstanceMetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().describe(
      "Limit the number of hops that an instance metadata request can traverse to reach its destination.",
    ).optional(),
    HttpTokens: z.enum(["required", "optional"]).describe(
      "Indicates whether a signed token header is required for instance metadata retrieval requests. The values affect the response as follows:",
    ).optional(),
  }).describe(
    "The instance metadata option settings for the infrastructure configuration.",
  ).optional(),
  SnsTopicArn: z.string().describe(
    "The SNS Topic Amazon Resource Name (ARN) of the infrastructure configuration.",
  ).optional(),
  ResourceTags: z.record(z.string(), z.string()).describe(
    "The tags attached to the resource created by Image Builder.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the component.",
  ).optional(),
  Placement: z.object({
    AvailabilityZone: z.string().describe("AvailabilityZone").optional(),
    Tenancy: z.enum(["default", "dedicated", "host"]).describe("Tenancy")
      .optional(),
    HostId: z.string().describe("HostId").optional(),
    HostResourceGroupArn: z.string().describe("HostResourceGroupArn")
      .optional(),
  }).describe(
    "The placement option settings for the infrastructure configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  InstanceTypes: z.array(z.string()).optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  Logging: z.object({
    S3Logs: S3LogsSchema,
  }).optional(),
  SubnetId: z.string().optional(),
  KeyPair: z.string().optional(),
  TerminateInstanceOnFailure: z.boolean().optional(),
  InstanceProfileName: z.string().optional(),
  InstanceMetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number(),
    HttpTokens: z.string(),
  }).optional(),
  SnsTopicArn: z.string().optional(),
  ResourceTags: z.record(z.string(), z.unknown()).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Placement: z.object({
    AvailabilityZone: z.string(),
    Tenancy: z.string(),
    HostId: z.string(),
    HostResourceGroupArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name of the infrastructure configuration.")
    .optional(),
  Description: z.string().describe(
    "The description of the infrastructure configuration.",
  ).optional(),
  InstanceTypes: z.array(z.string()).describe(
    "The instance types of the infrastructure configuration.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The security group IDs of the infrastructure configuration.",
  ).optional(),
  Logging: z.object({
    S3Logs: S3LogsSchema.describe("The S3 path in which to store the logs.")
      .optional(),
  }).describe("The logging configuration of the infrastructure configuration.")
    .optional(),
  SubnetId: z.string().describe(
    "The subnet ID of the infrastructure configuration.",
  ).optional(),
  KeyPair: z.string().describe(
    "The EC2 key pair of the infrastructure configuration..",
  ).optional(),
  TerminateInstanceOnFailure: z.boolean().describe(
    "The terminate instance on failure configuration of the infrastructure configuration.",
  ).optional(),
  InstanceProfileName: z.string().describe(
    "The instance profile of the infrastructure configuration.",
  ).optional(),
  InstanceMetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().describe(
      "Limit the number of hops that an instance metadata request can traverse to reach its destination.",
    ).optional(),
    HttpTokens: z.enum(["required", "optional"]).describe(
      "Indicates whether a signed token header is required for instance metadata retrieval requests. The values affect the response as follows:",
    ).optional(),
  }).describe(
    "The instance metadata option settings for the infrastructure configuration.",
  ).optional(),
  SnsTopicArn: z.string().describe(
    "The SNS Topic Amazon Resource Name (ARN) of the infrastructure configuration.",
  ).optional(),
  ResourceTags: z.record(z.string(), z.string()).describe(
    "The tags attached to the resource created by Image Builder.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the component.",
  ).optional(),
  Placement: z.object({
    AvailabilityZone: z.string().describe("AvailabilityZone").optional(),
    Tenancy: z.enum(["default", "dedicated", "host"]).describe("Tenancy")
      .optional(),
    HostId: z.string().describe("HostId").optional(),
    HostResourceGroupArn: z.string().describe("HostResourceGroupArn")
      .optional(),
  }).describe(
    "The placement option settings for the infrastructure configuration.",
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

/** Swamp extension model for ImageBuilder InfrastructureConfiguration. Registered at `@swamp/aws/imagebuilder/infrastructure-configuration`. */
export const model = {
  type: "@swamp/aws/imagebuilder/infrastructure-configuration",
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
      description: "ImageBuilder InfrastructureConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ImageBuilder InfrastructureConfiguration",
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
          "AWS::ImageBuilder::InfrastructureConfiguration",
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
      description: "Get a ImageBuilder InfrastructureConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder InfrastructureConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ImageBuilder::InfrastructureConfiguration",
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
      description: "Update a ImageBuilder InfrastructureConfiguration",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ImageBuilder::InfrastructureConfiguration",
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
          "AWS::ImageBuilder::InfrastructureConfiguration",
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
      description: "Delete a ImageBuilder InfrastructureConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder InfrastructureConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ImageBuilder::InfrastructureConfiguration",
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
      description:
        "Sync ImageBuilder InfrastructureConfiguration state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ImageBuilder::InfrastructureConfiguration",
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
