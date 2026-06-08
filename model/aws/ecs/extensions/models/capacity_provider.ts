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

// Auto-generated extension model for @swamp/aws/ecs/capacity-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECS CapacityProvider (AWS::ECS::CapacityProvider).
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

const ManagedScalingSchema = z.object({
  Status: z.enum(["DISABLED", "ENABLED"]).optional(),
  MinimumScalingStepSize: z.number().int().optional(),
  InstanceWarmupPeriod: z.number().int().optional(),
  TargetCapacity: z.number().int().optional(),
  MaximumScalingStepSize: z.number().int().optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).optional(),
  Key: z.string().min(1).optional(),
});

const AutoRepairConfigurationSchema = z.object({
  ActionsStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const ManagedInstancesStorageConfigurationSchema = z.object({
  StorageSizeGiB: z.number().int(),
});

const ManagedInstancesNetworkConfigurationSchema = z.object({
  SecurityGroups: z.array(z.string()),
  Subnets: z.array(z.string()),
});

const NetworkInterfaceCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const MemoryGiBPerVCpuRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const VCpuCountRangeRequestSchema = z.object({
  Min: z.number().int(),
  Max: z.number().int().optional(),
});

const NetworkBandwidthGbpsRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const AcceleratorCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const BaselineEbsBandwidthMbpsRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const AcceleratorTotalMemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const MemoryMiBRequestSchema = z.object({
  Min: z.number().int(),
  Max: z.number().int().optional(),
});

const TotalLocalStorageGBRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const InstanceRequirementsRequestSchema = z.object({
  LocalStorageTypes: z.array(z.enum(["hdd", "ssd"])).optional(),
  InstanceGenerations: z.array(z.enum(["current", "previous"])).optional(),
  NetworkInterfaceCount: NetworkInterfaceCountRequestSchema.optional(),
  MemoryGiBPerVCpu: MemoryGiBPerVCpuRequestSchema.optional(),
  AcceleratorTypes: z.array(z.enum(["gpu", "fpga", "inference"])).optional(),
  VCpuCount: VCpuCountRangeRequestSchema,
  ExcludedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  AcceleratorManufacturers: z.array(
    z.enum(["amazon-web-services", "amd", "habana", "nvidia", "xilinx"]),
  ).optional(),
  AllowedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  LocalStorage: z.enum(["included", "required", "excluded"]).optional(),
  CpuManufacturers: z.array(z.enum(["intel", "amd", "amazon-web-services"]))
    .optional(),
  NetworkBandwidthGbps: NetworkBandwidthGbpsRequestSchema.optional(),
  AcceleratorCount: AcceleratorCountRequestSchema.optional(),
  BareMetal: z.enum(["included", "required", "excluded"]).optional(),
  RequireHibernateSupport: z.boolean().optional(),
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: z.number().int().optional(),
  SpotMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  BaselineEbsBandwidthMbps: BaselineEbsBandwidthMbpsRequestSchema.optional(),
  OnDemandMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  AcceleratorNames: z.array(
    z.enum([
      "a10g",
      "a100",
      "h100",
      "inferentia",
      "k520",
      "k80",
      "m60",
      "radeon-pro-v520",
      "t4",
      "t4g",
      "vu9p",
      "v100",
      "l40s",
    ]),
  ).optional(),
  AcceleratorTotalMemoryMiB: AcceleratorTotalMemoryMiBRequestSchema.optional(),
  BurstablePerformance: z.enum(["included", "required", "excluded"]).optional(),
  MemoryMiB: MemoryMiBRequestSchema,
  TotalLocalStorageGB: TotalLocalStorageGBRequestSchema.optional(),
});

const CapacityReservationRequestSchema = z.object({
  ReservationGroupArn: z.string().optional(),
  ReservationPreference: z.enum([
    "RESERVATIONS_ONLY",
    "RESERVATIONS_FIRST",
    "RESERVATIONS_EXCLUDED",
  ]).optional(),
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
  InstanceRequirements: InstanceRequirementsRequestSchema.optional(),
  CapacityReservations: CapacityReservationRequestSchema.optional(),
  LocalStorageConfiguration: ManagedInstancesLocalStorageConfigurationSchema
    .optional(),
  Monitoring: z.enum(["BASIC", "DETAILED"]).optional(),
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
  AutoScalingGroupProvider: z.object({
    ManagedScaling: ManagedScalingSchema.describe(
      "The managed scaling settings for the Auto Scaling group capacity provider.",
    ).optional(),
    AutoScalingGroupArn: z.string(),
    ManagedTerminationProtection: z.enum(["DISABLED", "ENABLED"]).optional(),
    ManagedDraining: z.enum(["DISABLED", "ENABLED"]).optional(),
  }).optional(),
  ClusterName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
  ManagedInstancesProvider: z.object({
    InfrastructureRoleArn: z.string(),
    AutoRepairConfiguration: AutoRepairConfigurationSchema.optional(),
    PropagateTags: z.enum(["CAPACITY_PROVIDER", "NONE"]).optional(),
    InfrastructureOptimization: z.object({
      ScaleInAfter: z.number().int().min(-1).max(3600).describe(
        "This parameter defines the number of seconds Amazon ECS Managed Instances waits before optimizing EC2 instances that have become idle or underutilized. A longer delay increases the likelihood of placing new tasks on idle instances, reducing startup time. A shorter delay helps reduce infrastructure costs by optimizing idle instances more quickly. Valid values are: Not set (null) - Uses the default optimization behavior, `-1` - Disables automatic infrastructure optimization, `0` to `3600` (inclusive) - Specifies the number of seconds to wait before optimizing instances.",
      ).optional(),
    }).describe(
      "Defines how Amazon ECS Managed Instances optimizes the infrastructure in your capacity provider. Configure it to turn on or off the infrastructure optimization in your capacity provider, and to control the idle EC2 instances optimization delay.",
    ).optional(),
    InstanceLaunchTemplate: InstanceLaunchTemplateSchema,
  }).optional(),
});

const StateSchema = z.object({
  AutoScalingGroupProvider: z.object({
    ManagedScaling: ManagedScalingSchema,
    AutoScalingGroupArn: z.string(),
    ManagedTerminationProtection: z.string(),
    ManagedDraining: z.string(),
  }).optional(),
  ClusterName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string(),
  ManagedInstancesProvider: z.object({
    InfrastructureRoleArn: z.string(),
    AutoRepairConfiguration: AutoRepairConfigurationSchema,
    PropagateTags: z.string(),
    InfrastructureOptimization: z.object({
      ScaleInAfter: z.number(),
    }),
    InstanceLaunchTemplate: InstanceLaunchTemplateSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AutoScalingGroupProvider: z.object({
    ManagedScaling: ManagedScalingSchema.describe(
      "The managed scaling settings for the Auto Scaling group capacity provider.",
    ).optional(),
    AutoScalingGroupArn: z.string().optional(),
    ManagedTerminationProtection: z.enum(["DISABLED", "ENABLED"]).optional(),
    ManagedDraining: z.enum(["DISABLED", "ENABLED"]).optional(),
  }).optional(),
  ClusterName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
  ManagedInstancesProvider: z.object({
    InfrastructureRoleArn: z.string().optional(),
    AutoRepairConfiguration: AutoRepairConfigurationSchema.optional(),
    PropagateTags: z.enum(["CAPACITY_PROVIDER", "NONE"]).optional(),
    InfrastructureOptimization: z.object({
      ScaleInAfter: z.number().int().min(-1).max(3600).describe(
        "This parameter defines the number of seconds Amazon ECS Managed Instances waits before optimizing EC2 instances that have become idle or underutilized. A longer delay increases the likelihood of placing new tasks on idle instances, reducing startup time. A shorter delay helps reduce infrastructure costs by optimizing idle instances more quickly. Valid values are: Not set (null) - Uses the default optimization behavior, `-1` - Disables automatic infrastructure optimization, `0` to `3600` (inclusive) - Specifies the number of seconds to wait before optimizing instances.",
      ).optional(),
    }).describe(
      "Defines how Amazon ECS Managed Instances optimizes the infrastructure in your capacity provider. Configure it to turn on or off the infrastructure optimization in your capacity provider, and to control the idle EC2 instances optimization delay.",
    ).optional(),
    InstanceLaunchTemplate: InstanceLaunchTemplateSchema.optional(),
  }).optional(),
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

/** Swamp extension model for ECS CapacityProvider. Registered at `@swamp/aws/ecs/capacity-provider`. */
export const model = {
  type: "@swamp/aws/ecs/capacity-provider",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.03.3",
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
      description: "ECS CapacityProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECS CapacityProvider",
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
          "AWS::ECS::CapacityProvider",
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
      description: "Get a ECS CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECS::CapacityProvider",
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
      description: "Update a ECS CapacityProvider",
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
          "AWS::ECS::CapacityProvider",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECS::CapacityProvider",
          identifier,
          currentState,
          desiredState,
          ["AutoScalingGroupArn", "FipsEnabled", "Name", "ClusterName"],
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
      description: "Delete a ECS CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECS::CapacityProvider",
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
      description: "Sync ECS CapacityProvider state from AWS",
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
            "AWS::ECS::CapacityProvider",
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
