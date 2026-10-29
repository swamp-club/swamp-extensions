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

// Auto-generated extension model for @swamp/aws/batch/compute-environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Batch ComputeEnvironment (AWS::Batch::ComputeEnvironment).
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

const EksAccessEntrySchema = z.object({
  DesiredState: z.enum(["ENABLED", "DISABLED", "INHERIT_FROM_CLUSTER"])
    .describe(
      "The desired state of the EKS access entry managed by AWS Batch. When omitted, AWS Batch applies INHERIT_FROM_CLUSTER.",
    ).optional(),
});

const ComputeScalingPolicySchema = z.object({
  MinScaleDownDelayMinutes: z.number().int().optional(),
});

const Ec2ConfigurationObjectSchema = z.object({
  ImageIdOverride: z.string().optional(),
  ImageKubernetesVersion: z.string().optional(),
  BatchImageStatus: z.string().optional(),
  ImageType: z.string(),
});

const LaunchTemplateSpecificationOverrideSchema = z.object({
  TargetInstanceTypes: z.array(z.string()).optional(),
  UserdataType: z.enum(["EKS_BOOTSTRAP_SH", "EKS_NODEADM"]).optional(),
  LaunchTemplateName: z.string().optional(),
  Version: z.string().optional(),
  LaunchTemplateId: z.string().optional(),
});

const LaunchTemplateSpecificationSchema = z.object({
  UserdataType: z.enum(["EKS_BOOTSTRAP_SH", "EKS_NODEADM"]).optional(),
  LaunchTemplateName: z.string().optional(),
  Version: z.string().optional(),
  Overrides: z.array(LaunchTemplateSpecificationOverrideSchema).optional(),
  LaunchTemplateId: z.string().optional(),
});

const InfrastructureOptimizationSchema = z.object({
  ScaleInAfter: z.number().int().optional(),
});

const ManagedInstancesStorageConfigurationSchema = z.object({
  StorageSizeGiB: z.number().int().optional(),
});

const ManagedInstancesNetworkConfigurationSchema = z.object({
  SecurityGroups: z.array(z.string()),
  Subnets: z.array(z.string()),
});

const InstanceRequirementsSchema = z.object({
  AllowedInstanceTypes: z.array(z.string()).optional(),
});

const CapacityReservationsSchema = z.object({
  ReservationGroupArn: z.string().optional(),
  ReservationPreference: z.string().optional(),
});

const ManagedInstancesLocalStorageConfigurationSchema = z.object({
  UseLocalStorage: z.boolean().optional(),
});

const InstanceLaunchTemplateSchema = z.object({
  Ec2InstanceProfileArn: z.string(),
  CapacityOptionType: z.enum(["ON_DEMAND", "SPOT", "RESERVED"]).optional(),
  FipsEnabled: z.boolean().optional(),
  InstanceMetadataTagsPropagation: z.boolean().optional(),
  StorageConfiguration: ManagedInstancesStorageConfigurationSchema.optional(),
  NetworkConfiguration: ManagedInstancesNetworkConfigurationSchema,
  InstanceRequirements: InstanceRequirementsSchema.optional(),
  CapacityReservations: CapacityReservationsSchema.optional(),
  Monitoring: z.string().optional(),
  LocalStorageConfiguration: ManagedInstancesLocalStorageConfigurationSchema
    .optional(),
});

const ManagedInstancesProviderSchema = z.object({
  InfrastructureRoleArn: z.string(),
  PropagateTags: z.enum(["CAPACITY_PROVIDER", "NONE"]).optional(),
  InfrastructureOptimization: InfrastructureOptimizationSchema.optional(),
  InstanceLaunchTemplate: InstanceLaunchTemplateSchema,
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
  Context: z.string().optional(),
  UpdatePolicy: z.object({
    JobExecutionTimeoutMinutes: z.number().int().optional(),
    TerminateJobsOnUpdate: z.boolean().optional(),
  }).optional(),
  UnmanagedvCpus: z.number().int().optional(),
  Type: z.string(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string(),
    AccessEntry: EksAccessEntrySchema.describe(
      "The EKS access entry configuration for the compute environment. Controls whether AWS Batch manages the EKS access entry for the compute environment's service role, or inherits it from the cluster.",
    ).optional(),
    KubernetesNamespace: z.string(),
  }).optional(),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    ScalingPolicy: ComputeScalingPolicySchema.optional(),
    SpotIamFleetRole: z.string().optional(),
    MaxvCpus: z.number().int(),
    CapacityTags: z.record(z.string(), z.string()).describe(
      "Capacity-level tags for compute environments.",
    ).optional(),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema).optional(),
    BidPercentage: z.number().int().optional(),
    SecurityGroupIds: z.array(z.string()).optional(),
    AllocationStrategy: z.string().optional(),
    Subnets: z.array(z.string()).optional(),
    Type: z.string(),
    MinvCpus: z.number().int().optional(),
    UpdateToLatestImageVersion: z.boolean().optional(),
    LaunchTemplate: LaunchTemplateSpecificationSchema.optional(),
    ImageId: z.string().optional(),
    InstanceRole: z.string().optional(),
    InstanceTypes: z.array(z.string()).optional(),
    Ec2KeyPair: z.string().optional(),
    PlacementGroup: z.string().optional(),
    Tags: z.record(z.string(), z.string()).describe(
      "A key-value pair to associate with a resource.",
    ).optional(),
    DesiredvCpus: z.number().int().optional(),
    ManagedInstancesProvider: ManagedInstancesProviderSchema.optional(),
  }).optional(),
  State: z.string().optional(),
  EcsSettings: z.object({
    ContainerInsights: z.enum(["ENABLED", "ENHANCED", "DISABLED"]).describe(
      "The CloudWatch Container Insights setting applied to the Amazon ECS cluster that backs this compute environment. After you set this property, you can't revert it to the default (unset) state in which the setting is managed outside of AWS Batch. If you remove this property after previously setting it, AWS Batch treats the omission as DISABLED, because the underlying API has no way to unset the value. Because of this, if a stack rollback would return this property to its previous unset state, AWS Batch sets it to DISABLED instead.",
    ).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  Context: z.string().optional(),
  UpdatePolicy: z.object({
    JobExecutionTimeoutMinutes: z.number(),
    TerminateJobsOnUpdate: z.boolean(),
  }).optional(),
  ComputeEnvironmentArn: z.string(),
  UnmanagedvCpus: z.number().optional(),
  Type: z.string().optional(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string(),
    AccessEntry: EksAccessEntrySchema,
    KubernetesNamespace: z.string(),
  }).optional(),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    ScalingPolicy: ComputeScalingPolicySchema,
    SpotIamFleetRole: z.string(),
    MaxvCpus: z.number(),
    CapacityTags: z.record(z.string(), z.unknown()),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema),
    BidPercentage: z.number(),
    SecurityGroupIds: z.array(z.string()),
    AllocationStrategy: z.string(),
    Subnets: z.array(z.string()),
    Type: z.string(),
    MinvCpus: z.number(),
    UpdateToLatestImageVersion: z.boolean(),
    LaunchTemplate: LaunchTemplateSpecificationSchema,
    ImageId: z.string(),
    InstanceRole: z.string(),
    InstanceTypes: z.array(z.string()),
    Ec2KeyPair: z.string(),
    PlacementGroup: z.string(),
    Tags: z.record(z.string(), z.unknown()),
    DesiredvCpus: z.number(),
    ManagedInstancesProvider: ManagedInstancesProviderSchema,
  }).optional(),
  State: z.string().optional(),
  EcsSettings: z.object({
    ContainerInsights: z.string(),
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
  Context: z.string().optional(),
  UpdatePolicy: z.object({
    JobExecutionTimeoutMinutes: z.number().int().optional(),
    TerminateJobsOnUpdate: z.boolean().optional(),
  }).optional(),
  UnmanagedvCpus: z.number().int().optional(),
  Type: z.string().optional(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string().optional(),
    AccessEntry: EksAccessEntrySchema.describe(
      "The EKS access entry configuration for the compute environment. Controls whether AWS Batch manages the EKS access entry for the compute environment's service role, or inherits it from the cluster.",
    ).optional(),
    KubernetesNamespace: z.string().optional(),
  }).optional(),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    ScalingPolicy: ComputeScalingPolicySchema.optional(),
    SpotIamFleetRole: z.string().optional(),
    MaxvCpus: z.number().int().optional(),
    CapacityTags: z.record(z.string(), z.string()).describe(
      "Capacity-level tags for compute environments.",
    ).optional(),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema).optional(),
    BidPercentage: z.number().int().optional(),
    SecurityGroupIds: z.array(z.string()).optional(),
    AllocationStrategy: z.string().optional(),
    Subnets: z.array(z.string()).optional(),
    Type: z.string().optional(),
    MinvCpus: z.number().int().optional(),
    UpdateToLatestImageVersion: z.boolean().optional(),
    LaunchTemplate: LaunchTemplateSpecificationSchema.optional(),
    ImageId: z.string().optional(),
    InstanceRole: z.string().optional(),
    InstanceTypes: z.array(z.string()).optional(),
    Ec2KeyPair: z.string().optional(),
    PlacementGroup: z.string().optional(),
    Tags: z.record(z.string(), z.string()).describe(
      "A key-value pair to associate with a resource.",
    ).optional(),
    DesiredvCpus: z.number().int().optional(),
    ManagedInstancesProvider: ManagedInstancesProviderSchema.optional(),
  }).optional(),
  State: z.string().optional(),
  EcsSettings: z.object({
    ContainerInsights: z.enum(["ENABLED", "ENHANCED", "DISABLED"]).describe(
      "The CloudWatch Container Insights setting applied to the Amazon ECS cluster that backs this compute environment. After you set this property, you can't revert it to the default (unset) state in which the setting is managed outside of AWS Batch. If you remove this property after previously setting it, AWS Batch treats the omission as DISABLED, because the underlying API has no way to unset the value. Because of this, if a stack rollback would return this property to its previous unset state, AWS Batch sets it to DISABLED instead.",
    ).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
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

/** Swamp extension model for Batch ComputeEnvironment. Registered at `@swamp/aws/batch/compute-environment`. */
export const model = {
  type: "@swamp/aws/batch/compute-environment",
  version: "2026.10.29.1",
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
    {
      toVersion: "2026.08.13.1",
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
      toVersion: "2026.08.24.1",
      description: "Added: EcsSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
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
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Batch ComputeEnvironment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch ComputeEnvironment",
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
          "AWS::Batch::ComputeEnvironment",
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
      description: "Get a Batch ComputeEnvironment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch ComputeEnvironment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Batch::ComputeEnvironment",
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
      description: "Update a Batch ComputeEnvironment",
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
        const identifier = existing.ComputeEnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::ComputeEnvironment",
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
          "AWS::Batch::ComputeEnvironment",
          identifier,
          currentState,
          desiredState,
          [
            "ComputeResources/SpotIamFleetRole",
            "ComputeEnvironmentName",
            "Tags",
            "Type",
            "EksConfiguration/EksClusterArn",
            "EksConfiguration/KubernetesNamespace",
            "ComputeResources/ManagedInstancesProvider/InstanceLaunchTemplate/CapacityOptionType",
            "ComputeResources/ManagedInstancesProvider/InstanceLaunchTemplate/FipsEnabled",
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
      description: "Delete a Batch ComputeEnvironment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch ComputeEnvironment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Batch::ComputeEnvironment",
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
      description: "Sync Batch ComputeEnvironment state from AWS",
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
        const identifier = existing.ComputeEnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::ComputeEnvironment",
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
      description: "List Batch ComputeEnvironment resources",
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
          "AWS::Batch::ComputeEnvironment",
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
            (item.properties?.ComputeEnvironmentArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
