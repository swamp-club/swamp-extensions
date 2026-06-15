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

// Auto-generated extension model for @swamp/aws/imagebuilder/image
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ImageBuilder Image (AWS::ImageBuilder::Image).
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

const EcrConfigurationSchema = z.object({
  ContainerTags: z.array(z.string()).describe(
    "Tags for Image Builder to apply the output container image that is scanned. Tags can help you identify and manage your scanned images.",
  ).optional(),
  RepositoryName: z.string().describe(
    "The name of the container repository that Amazon Inspector scans to identify findings for your container images. The name includes the path for the repository location. If you don’t provide this information, Image Builder creates a repository in your account named image-builder-image-scanning-repository to use for vulnerability scans for your output container images.",
  ).optional(),
});

const WorkflowParameterSchema = z.object({
  Value: z.array(z.string()).optional(),
  Name: z.string().optional(),
});

const WorkflowConfigurationSchema = z.object({
  ParallelGroup: z.string().describe("The parallel group name").optional(),
  Parameters: z.array(WorkflowParameterSchema).describe(
    "The parameters associated with the workflow",
  ).optional(),
  WorkflowArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the workflow",
  ).optional(),
  OnFailure: z.enum(["CONTINUE", "ABORT"]).describe(
    "Define execution decision in case of workflow failure",
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
  ImageScanningConfiguration: z.object({
    EcrConfiguration: EcrConfigurationSchema.describe(
      "Contains ECR settings for vulnerability scans.",
    ).optional(),
    ImageScanningEnabled: z.boolean().describe(
      "This sets whether Image Builder keeps a snapshot of the vulnerability scans that Amazon Inspector runs against the build instance when you create a new image.",
    ).optional(),
  }).describe("Contains settings for vulnerability scans.").optional(),
  ContainerRecipeArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the container recipe that defines how images are configured and tested.",
  ).optional(),
  Workflows: z.array(WorkflowConfigurationSchema).describe(
    "Workflows to define the image build process",
  ).optional(),
  ImagePipelineExecutionSettings: z.object({
    DeploymentId: z.string().describe(
      "The deployment ID of the pipeline, used to trigger new image pipeline executions.",
    ).optional(),
    OnUpdate: z.boolean().describe(
      "Whether to trigger the image pipeline when the pipeline is updated. False by default.",
    ).optional(),
  }).describe("The image pipeline execution settings of the image.").optional(),
  DeletionSettings: z.object({
    ExecutionRole: z.string().describe(
      "The execution role to use for deleting the image, as well as underlying resources.",
    ),
  }).describe(
    "The deletion settings of the image, indicating whether to delete the underlying resources in addition to the image.",
  ).optional(),
  InfrastructureConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the infrastructure configuration.",
  ).optional(),
  ImageRecipeArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the image recipe that defines how images are configured, tested, and assessed.",
  ).optional(),
  DistributionConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the distribution configuration.",
  ).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().describe(
      "The name of the log group for image build logs.",
    ).optional(),
  }).describe("The logging configuration settings for the image.").optional(),
  ImageTestsConfiguration: z.object({
    TimeoutMinutes: z.number().int().min(60).max(1440).describe(
      "TimeoutMinutes",
    ).optional(),
    ImageTestsEnabled: z.boolean().describe("ImageTestsEnabled").optional(),
  }).describe("The image tests configuration used when creating this image.")
    .optional(),
  EnhancedImageMetadataEnabled: z.boolean().describe(
    "Collects additional information about the image being created, including the operating system (OS) version and package list.",
  ).optional(),
  ExecutionRole: z.string().describe(
    "The execution role name/ARN for the image build, if provided",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the image.",
  ).optional(),
});

const StateSchema = z.object({
  ImageScanningConfiguration: z.object({
    EcrConfiguration: EcrConfigurationSchema,
    ImageScanningEnabled: z.boolean(),
  }).optional(),
  ContainerRecipeArn: z.string().optional(),
  Workflows: z.array(WorkflowConfigurationSchema).optional(),
  ImagePipelineExecutionSettings: z.object({
    DeploymentId: z.string(),
    OnUpdate: z.boolean(),
  }).optional(),
  DeletionSettings: z.object({
    ExecutionRole: z.string(),
  }).optional(),
  ImageUri: z.string().optional(),
  Name: z.string().optional(),
  InfrastructureConfigurationArn: z.string().optional(),
  ImageRecipeArn: z.string().optional(),
  DistributionConfigurationArn: z.string().optional(),
  LatestVersion: z.object({
    Major: z.string(),
    Minor: z.string(),
    Arn: z.string(),
    Patch: z.string(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string(),
  }).optional(),
  ImageId: z.string().optional(),
  ImageTestsConfiguration: z.object({
    TimeoutMinutes: z.number(),
    ImageTestsEnabled: z.boolean(),
  }).optional(),
  Arn: z.string(),
  EnhancedImageMetadataEnabled: z.boolean().optional(),
  ExecutionRole: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ImageScanningConfiguration: z.object({
    EcrConfiguration: EcrConfigurationSchema.describe(
      "Contains ECR settings for vulnerability scans.",
    ).optional(),
    ImageScanningEnabled: z.boolean().describe(
      "This sets whether Image Builder keeps a snapshot of the vulnerability scans that Amazon Inspector runs against the build instance when you create a new image.",
    ).optional(),
  }).describe("Contains settings for vulnerability scans.").optional(),
  ContainerRecipeArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the container recipe that defines how images are configured and tested.",
  ).optional(),
  Workflows: z.array(WorkflowConfigurationSchema).describe(
    "Workflows to define the image build process",
  ).optional(),
  ImagePipelineExecutionSettings: z.object({
    DeploymentId: z.string().describe(
      "The deployment ID of the pipeline, used to trigger new image pipeline executions.",
    ).optional(),
    OnUpdate: z.boolean().describe(
      "Whether to trigger the image pipeline when the pipeline is updated. False by default.",
    ).optional(),
  }).describe("The image pipeline execution settings of the image.").optional(),
  DeletionSettings: z.object({
    ExecutionRole: z.string().describe(
      "The execution role to use for deleting the image, as well as underlying resources.",
    ).optional(),
  }).describe(
    "The deletion settings of the image, indicating whether to delete the underlying resources in addition to the image.",
  ).optional(),
  InfrastructureConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the infrastructure configuration.",
  ).optional(),
  ImageRecipeArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the image recipe that defines how images are configured, tested, and assessed.",
  ).optional(),
  DistributionConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the distribution configuration.",
  ).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().describe(
      "The name of the log group for image build logs.",
    ).optional(),
  }).describe("The logging configuration settings for the image.").optional(),
  ImageTestsConfiguration: z.object({
    TimeoutMinutes: z.number().int().min(60).max(1440).describe(
      "TimeoutMinutes",
    ).optional(),
    ImageTestsEnabled: z.boolean().describe("ImageTestsEnabled").optional(),
  }).describe("The image tests configuration used when creating this image.")
    .optional(),
  EnhancedImageMetadataEnabled: z.boolean().describe(
    "Collects additional information about the image being created, including the operating system (OS) version and package list.",
  ).optional(),
  ExecutionRole: z.string().describe(
    "The execution role name/ARN for the image build, if provided",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the image.",
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

/** Swamp extension model for ImageBuilder Image. Registered at `@swamp/aws/imagebuilder/image`. */
export const model = {
  type: "@swamp/aws/imagebuilder/image",
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
      description: "ImageBuilder Image resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ImageBuilder Image",
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
          "AWS::ImageBuilder::Image",
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
      description: "Get a ImageBuilder Image",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder Image",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ImageBuilder::Image",
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
      description: "Update a ImageBuilder Image",
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
          "AWS::ImageBuilder::Image",
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
          "AWS::ImageBuilder::Image",
          identifier,
          currentState,
          desiredState,
          [
            "ImageRecipeArn",
            "ContainerRecipeArn",
            "InfrastructureConfigurationArn",
            "Workflows",
            "DistributionConfigurationArn",
            "ImageTestsConfiguration",
            "ImageScanningConfiguration",
            "EnhancedImageMetadataEnabled",
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
      description: "Delete a ImageBuilder Image",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder Image",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ImageBuilder::Image",
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
      description: "Sync ImageBuilder Image state from AWS",
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
            "AWS::ImageBuilder::Image",
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
