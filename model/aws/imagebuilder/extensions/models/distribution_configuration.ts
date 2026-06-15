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

// Auto-generated extension model for @swamp/aws/imagebuilder/distribution-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ImageBuilder DistributionConfiguration (AWS::ImageBuilder::DistributionConfiguration).
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

const LaunchPermissionConfigurationSchema = z.object({
  UserIds: z.array(z.string()).describe("The AWS account ID.").optional(),
  UserGroups: z.array(z.string()).describe("The name of the group.").optional(),
  OrganizationArns: z.array(z.string()).describe(
    "The ARN for an Amazon Web Services Organization that you want to share your AMI with.",
  ).optional(),
  OrganizationalUnitArns: z.array(z.string()).describe(
    "The ARN for an Organizations organizational unit (OU) that you want to share your AMI with.",
  ).optional(),
});

const AmiDistributionConfigurationSchema = z.object({
  Name: z.string().describe("The name of the AMI distribution configuration.")
    .optional(),
  KmsKeyId: z.string().describe(
    "The KMS key identifier used to encrypt the distributed image.",
  ).optional(),
  Description: z.string().describe(
    "The description of the AMI distribution configuration.",
  ).optional(),
  AmiTags: z.record(z.string(), z.string()).describe(
    "The tags to apply to AMIs distributed to this Region.",
  ).optional(),
  TargetAccountIds: z.array(z.string()).describe(
    "The ID of accounts to which you want to distribute an image.",
  ).optional(),
  LaunchPermissionConfiguration: LaunchPermissionConfigurationSchema.describe(
    "Launch permissions can be used to configure which AWS accounts can use the AMI to launch instances.",
  ).optional(),
});

const TargetContainerRepositorySchema = z.object({
  Service: z.enum(["ECR"]).describe(
    "The service of target container repository.",
  ).optional(),
  RepositoryName: z.string().describe(
    "The repository name of target container repository.",
  ).optional(),
});

const ContainerDistributionConfigurationSchema = z.object({
  Description: z.string().describe(
    "The description of the container distribution configuration.",
  ).optional(),
  ContainerTags: z.array(z.string()).describe(
    "Tags that are attached to the container distribution configuration.",
  ).optional(),
  TargetRepository: TargetContainerRepositorySchema.describe(
    "The destination repository for the container distribution configuration.",
  ).optional(),
});

const LaunchTemplateConfigurationSchema = z.object({
  LaunchTemplateId: z.string().describe(
    "Identifies the EC2 launch template to use.",
  ).optional(),
  AccountId: z.string().describe(
    "The account ID that this configuration applies to.",
  ).optional(),
  SetDefaultVersion: z.boolean().describe(
    "Set the specified EC2 launch template as the default launch template for the specified account.",
  ).optional(),
});

const FastLaunchLaunchTemplateSpecificationSchema = z.object({
  LaunchTemplateId: z.string().describe(
    "The ID of the launch template to use for faster launching for a Windows AMI.",
  ).optional(),
  LaunchTemplateName: z.string().describe(
    "The name of the launch template to use for faster launching for a Windows AMI.",
  ).optional(),
  LaunchTemplateVersion: z.string().describe(
    "The version of the launch template to use for faster launching for a Windows AMI.",
  ).optional(),
});

const FastLaunchSnapshotConfigurationSchema = z.object({
  TargetResourceCount: z.number().int().describe(
    "The number of pre-provisioned snapshots to keep on hand for a fast-launch enabled Windows AMI.",
  ).optional(),
});

const FastLaunchConfigurationSchema = z.object({
  AccountId: z.string().describe(
    "The owner account ID for the fast-launch enabled Windows AMI.",
  ).optional(),
  Enabled: z.boolean().describe(
    "A Boolean that represents the current state of faster launching for the Windows AMI. Set to true to start using Windows faster launching, or false to stop using it.",
  ).optional(),
  LaunchTemplate: FastLaunchLaunchTemplateSpecificationSchema.describe(
    "The launch template that the fast-launch enabled Windows AMI uses when it launches Windows instances to create pre-provisioned snapshots.",
  ).optional(),
  MaxParallelLaunches: z.number().int().describe(
    "The maximum number of parallel instances that are launched for creating resources.",
  ).optional(),
  SnapshotConfiguration: FastLaunchSnapshotConfigurationSchema.describe(
    "Configuration settings for managing the number of snapshots that are created from pre-provisioned instances for the Windows AMI when faster launching is enabled.",
  ).optional(),
});

const SsmParameterConfigurationSchema = z.object({
  AmiAccountId: z.string().describe(
    "The account ID for the AMI to update the parameter with.",
  ).optional(),
  ParameterName: z.string().describe("The name of the SSM parameter."),
  DataType: z.enum(["text", "aws:ec2:image"]).describe(
    "The data type of the SSM parameter.",
  ).optional(),
});

const DistributionSchema = z.object({
  Region: z.string().describe("region"),
  AmiDistributionConfiguration: AmiDistributionConfigurationSchema.describe(
    "The specific AMI settings (for example, launch permissions, AMI tags).",
  ).optional(),
  ContainerDistributionConfiguration: ContainerDistributionConfigurationSchema
    .describe(
      "Container distribution settings for encryption, licensing, and sharing in a specific Region.",
    ).optional(),
  LicenseConfigurationArns: z.array(z.string()).describe(
    "The License Manager Configuration to associate with the AMI in the specified Region.",
  ).optional(),
  LaunchTemplateConfigurations: z.array(LaunchTemplateConfigurationSchema)
    .describe(
      "A group of launchTemplateConfiguration settings that apply to image distribution.",
    ).optional(),
  FastLaunchConfigurations: z.array(FastLaunchConfigurationSchema).describe(
    "The Windows faster-launching configurations to use for AMI distribution.",
  ).optional(),
  SsmParameterConfigurations: z.array(SsmParameterConfigurationSchema).describe(
    "The SSM parameter configurations to use for AMI distribution.",
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
  Name: z.string().describe("The name of the distribution configuration."),
  Description: z.string().describe(
    "The description of the distribution configuration.",
  ).optional(),
  Distributions: z.array(DistributionSchema).describe(
    "The distributions of the distribution configuration.",
  ),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the component.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Distributions: z.array(DistributionSchema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name of the distribution configuration.")
    .optional(),
  Description: z.string().describe(
    "The description of the distribution configuration.",
  ).optional(),
  Distributions: z.array(DistributionSchema).describe(
    "The distributions of the distribution configuration.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags associated with the component.",
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

/** Swamp extension model for ImageBuilder DistributionConfiguration. Registered at `@swamp/aws/imagebuilder/distribution-configuration`. */
export const model = {
  type: "@swamp/aws/imagebuilder/distribution-configuration",
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
      description: "ImageBuilder DistributionConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ImageBuilder DistributionConfiguration",
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
          "AWS::ImageBuilder::DistributionConfiguration",
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
      description: "Get a ImageBuilder DistributionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder DistributionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ImageBuilder::DistributionConfiguration",
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
      description: "Update a ImageBuilder DistributionConfiguration",
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
          "AWS::ImageBuilder::DistributionConfiguration",
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
          "AWS::ImageBuilder::DistributionConfiguration",
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
      description: "Delete a ImageBuilder DistributionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ImageBuilder DistributionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ImageBuilder::DistributionConfiguration",
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
      description: "Sync ImageBuilder DistributionConfiguration state from AWS",
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
            "AWS::ImageBuilder::DistributionConfiguration",
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
