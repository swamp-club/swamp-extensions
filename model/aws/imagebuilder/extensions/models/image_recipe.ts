// Auto-generated extension model for @swamp/aws/imagebuilder/image-recipe
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ImageBuilder ImageRecipe (AWS::ImageBuilder::ImageRecipe).
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

const ComponentParameterSchema = z.object({
  Name: z.string().describe("The name of the component parameter to set."),
  Value: z.array(z.string()).describe(
    "Sets the value for the named component parameter.",
  ),
});

const ComponentConfigurationSchema = z.object({
  ComponentArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the component.",
  ).optional(),
  Parameters: z.array(ComponentParameterSchema).describe(
    "A group of parameter settings that are used to configure the component for a specific recipe.",
  ).optional(),
});

const EbsInstanceBlockDeviceSpecificationSchema = z.object({
  Encrypted: z.boolean().describe("Use to configure device encryption.")
    .optional(),
  DeleteOnTermination: z.boolean().describe(
    "Use to configure delete on termination of the associated device.",
  ).optional(),
  Iops: z.number().int().describe("Use to configure device IOPS.").optional(),
  KmsKeyId: z.string().describe(
    "Use to configure the KMS key to use when encrypting the device.",
  ).optional(),
  SnapshotId: z.string().describe(
    "The snapshot that defines the device contents.",
  ).optional(),
  Throughput: z.number().int().describe(
    "For GP3 volumes only - The throughput in MiB/s that the volume supports.",
  ).optional(),
  VolumeSize: z.number().int().describe(
    "Use to override the device's volume size.",
  ).optional(),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "gp3", "sc1", "st1"])
    .describe("Use to override the device's volume type.").optional(),
});

const InstanceBlockDeviceMappingSchema = z.object({
  DeviceName: z.string().describe("The device to which these mappings apply.")
    .optional(),
  VirtualName: z.string().describe("Use to manage instance ephemeral devices.")
    .optional(),
  NoDevice: z.string().describe(
    "Use to remove a mapping from the parent image.",
  ).optional(),
  Ebs: EbsInstanceBlockDeviceSpecificationSchema.describe(
    "Use to manage Amazon EBS-specific configuration for this mapping.",
  ).optional(),
});

const SystemsManagerAgentSchema = z.object({
  UninstallAfterBuild: z.boolean().describe(
    "Controls whether the SSM agent is removed from your final build image, prior to creating the new AMI. If this is set to true, then the agent is removed from the final image. If it's set to false, then the agent is left in, so that it is included in the new AMI. The default value is false.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().describe("The name of the image recipe."),
  Description: z.string().describe("The description of the image recipe.")
    .optional(),
  Version: z.string().describe("The version of the image recipe."),
  Components: z.array(ComponentConfigurationSchema).describe(
    "The components of the image recipe.",
  ).optional(),
  BlockDeviceMappings: z.array(InstanceBlockDeviceMappingSchema).describe(
    "The block device mappings to apply when creating images from this recipe.",
  ).optional(),
  ParentImage: z.string().describe("The parent image of the image recipe."),
  WorkingDirectory: z.string().describe(
    "The working directory to be used during build and test workflows.",
  ).optional(),
  AdditionalInstanceConfiguration: z.object({
    SystemsManagerAgent: SystemsManagerAgentSchema.describe(
      "Contains settings for the SSM agent on your build instance.",
    ).optional(),
    UserDataOverride: z.string().describe(
      "Use this property to provide commands or a command script to run when you launch your build instance.",
    ).optional(),
  }).describe(
    "Specify additional settings and launch scripts for your build instances.",
  ).optional(),
  AmiTags: z.record(z.string(), z.string()).describe(
    "The tags to apply to the AMI created by this image recipe.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags of the image recipe.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Version: z.string().optional(),
  Components: z.array(ComponentConfigurationSchema).optional(),
  BlockDeviceMappings: z.array(InstanceBlockDeviceMappingSchema).optional(),
  ParentImage: z.string().optional(),
  WorkingDirectory: z.string().optional(),
  AdditionalInstanceConfiguration: z.object({
    SystemsManagerAgent: SystemsManagerAgentSchema,
    UserDataOverride: z.string(),
  }).optional(),
  AmiTags: z.record(z.string(), z.unknown()).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  LatestVersion: z.object({
    Arn: z.string(),
    Major: z.string(),
    Minor: z.string(),
    Patch: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name of the image recipe.").optional(),
  Description: z.string().describe("The description of the image recipe.")
    .optional(),
  Version: z.string().describe("The version of the image recipe.").optional(),
  Components: z.array(ComponentConfigurationSchema).describe(
    "The components of the image recipe.",
  ).optional(),
  BlockDeviceMappings: z.array(InstanceBlockDeviceMappingSchema).describe(
    "The block device mappings to apply when creating images from this recipe.",
  ).optional(),
  ParentImage: z.string().describe("The parent image of the image recipe.")
    .optional(),
  WorkingDirectory: z.string().describe(
    "The working directory to be used during build and test workflows.",
  ).optional(),
  AdditionalInstanceConfiguration: z.object({
    SystemsManagerAgent: SystemsManagerAgentSchema.describe(
      "Contains settings for the SSM agent on your build instance.",
    ).optional(),
    UserDataOverride: z.string().describe(
      "Use this property to provide commands or a command script to run when you launch your build instance.",
    ).optional(),
  }).describe(
    "Specify additional settings and launch scripts for your build instances.",
  ).optional(),
  AmiTags: z.record(z.string(), z.string()).describe(
    "The tags to apply to the AMI created by this image recipe.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags of the image recipe.",
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

/** Swamp extension model for ImageBuilder ImageRecipe. Registered at `@swamp/aws/imagebuilder/image-recipe`. */
export const model = {
  type: "@swamp/aws/imagebuilder/image-recipe",
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
      description: "ImageBuilder ImageRecipe resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ImageBuilder ImageRecipe",
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
          "AWS::ImageBuilder::ImageRecipe",
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
      description: "Get a ImageBuilder ImageRecipe",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder ImageRecipe",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ImageBuilder::ImageRecipe",
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
      description: "Update a ImageBuilder ImageRecipe",
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
          "AWS::ImageBuilder::ImageRecipe",
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
          "AWS::ImageBuilder::ImageRecipe",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Version",
            "Components",
            "ParentImage",
            "Description",
            "BlockDeviceMappings",
            "WorkingDirectory",
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
      description: "Delete a ImageBuilder ImageRecipe",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder ImageRecipe",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ImageBuilder::ImageRecipe",
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
      description: "Sync ImageBuilder ImageRecipe state from AWS",
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
            "AWS::ImageBuilder::ImageRecipe",
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
