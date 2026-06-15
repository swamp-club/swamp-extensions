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

// Auto-generated extension model for @swamp/aws/ec2/spot-fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 SpotFleet (AWS::EC2::SpotFleet).
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

const EbsBlockDeviceSchema = z.object({
  DeleteOnTermination: z.boolean().optional(),
  Encrypted: z.boolean().optional(),
  Iops: z.number().int().optional(),
  SnapshotId: z.string().optional(),
  VolumeSize: z.number().int().optional(),
  VolumeType: z.enum(["gp2", "gp3", "io1", "io2", "sc1", "st1", "standard"])
    .optional(),
});

const BlockDeviceMappingSchema = z.object({
  DeviceName: z.string(),
  Ebs: EbsBlockDeviceSchema.optional(),
  NoDevice: z.string().optional(),
  VirtualName: z.string().optional(),
});

const IamInstanceProfileSpecificationSchema = z.object({
  Arn: z.string().optional(),
});

const SpotFleetMonitoringSchema = z.object({
  Enabled: z.boolean().optional(),
});

const InstanceIpv6AddressSchema = z.object({
  Ipv6Address: z.string(),
});

const PrivateIpAddressSpecificationSchema = z.object({
  Primary: z.boolean().optional(),
  PrivateIpAddress: z.string(),
});

const InstanceNetworkInterfaceSpecificationSchema = z.object({
  AssociatePublicIpAddress: z.boolean().optional(),
  DeleteOnTermination: z.boolean().optional(),
  Description: z.string().optional(),
  DeviceIndex: z.number().int().optional(),
  Groups: z.array(z.string()).optional(),
  Ipv6AddressCount: z.number().int().optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).optional(),
  NetworkInterfaceId: z.string().optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationSchema).optional(),
  SecondaryPrivateIpAddressCount: z.number().int().optional(),
  SubnetId: z.string().optional(),
});

const SpotPlacementSchema = z.object({
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  GroupName: z.string().optional(),
  Tenancy: z.enum(["dedicated", "default", "host"]).optional(),
});

const GroupIdentifierSchema = z.object({
  GroupId: z.string(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const SpotFleetTagSpecificationSchema = z.object({
  ResourceType: z.enum([
    "client-vpn-endpoint",
    "customer-gateway",
    "dedicated-host",
    "dhcp-options",
    "egress-only-internet-gateway",
    "elastic-gpu",
    "elastic-ip",
    "export-image-task",
    "export-instance-task",
    "fleet",
    "fpga-image",
    "host-reservation",
    "image",
    "import-image-task",
    "import-snapshot-task",
    "instance",
    "internet-gateway",
    "key-pair",
    "launch-template",
    "local-gateway-route-table-vpc-association",
    "natgateway",
    "network-acl",
    "network-insights-analysis",
    "network-insights-path",
    "network-interface",
    "placement-group",
    "reserved-instances",
    "route-table",
    "security-group",
    "snapshot",
    "spot-fleet-request",
    "spot-instances-request",
    "subnet",
    "traffic-mirror-filter",
    "traffic-mirror-session",
    "traffic-mirror-target",
    "transit-gateway",
    "transit-gateway-attachment",
    "transit-gateway-connect-peer",
    "transit-gateway-multicast-domain",
    "transit-gateway-route-table",
    "volume",
    "vpc",
    "vpc-flow-log",
    "vpc-peering-connection",
    "vpn-connection",
    "vpn-gateway",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
});

const VCpuCountRangeRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const MemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const MemoryGiBPerVCpuRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const NetworkBandwidthGbpsRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const NetworkInterfaceCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const TotalLocalStorageGBRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const BaselineEbsBandwidthMbpsRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const AcceleratorCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const AcceleratorTotalMemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const PerformanceFactorReferenceRequestSchema = z.object({
  InstanceFamily: z.string().optional(),
});

const CpuPerformanceFactorRequestSchema = z.object({
  References: z.array(PerformanceFactorReferenceRequestSchema).optional(),
});

const BaselinePerformanceFactorsRequestSchema = z.object({
  Cpu: CpuPerformanceFactorRequestSchema.optional(),
});

const InstanceRequirementsRequestSchema = z.object({
  VCpuCount: VCpuCountRangeRequestSchema.optional(),
  MemoryMiB: MemoryMiBRequestSchema.optional(),
  CpuManufacturers: z.array(
    z.enum(["intel", "amd", "amazon-web-services", "apple"]),
  ).optional(),
  MemoryGiBPerVCpu: MemoryGiBPerVCpuRequestSchema.optional(),
  AllowedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  ExcludedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  InstanceGenerations: z.array(z.enum(["current", "previous"])).optional(),
  SpotMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  OnDemandMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: z.number().int().optional(),
  BareMetal: z.enum(["included", "required", "excluded"]).optional(),
  BurstablePerformance: z.enum(["included", "required", "excluded"]).optional(),
  RequireHibernateSupport: z.boolean().optional(),
  NetworkBandwidthGbps: NetworkBandwidthGbpsRequestSchema.optional(),
  NetworkInterfaceCount: NetworkInterfaceCountRequestSchema.optional(),
  LocalStorage: z.enum(["included", "required", "excluded"]).optional(),
  LocalStorageTypes: z.array(z.enum(["hdd", "ssd"])).optional(),
  TotalLocalStorageGB: TotalLocalStorageGBRequestSchema.optional(),
  BaselineEbsBandwidthMbps: BaselineEbsBandwidthMbpsRequestSchema.optional(),
  AcceleratorTypes: z.array(z.enum(["gpu", "fpga", "inference", "media"]))
    .optional(),
  AcceleratorCount: AcceleratorCountRequestSchema.optional(),
  AcceleratorManufacturers: z.array(
    z.enum(["amazon-web-services", "amd", "habana", "nvidia", "xilinx"]),
  ).optional(),
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
      "l4",
      "gaudi-hl-205",
      "inferentia2",
      "trainium",
      "trainium2",
      "u30",
    ]),
  ).optional(),
  AcceleratorTotalMemoryMiB: AcceleratorTotalMemoryMiBRequestSchema.optional(),
  BaselinePerformanceFactors: BaselinePerformanceFactorsRequestSchema
    .optional(),
  RequireEncryptionInTransit: z.boolean().optional(),
});

const SpotFleetLaunchSpecificationSchema = z.object({
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
  EbsOptimized: z.boolean().optional(),
  IamInstanceProfile: IamInstanceProfileSpecificationSchema.optional(),
  ImageId: z.string(),
  InstanceType: z.string().optional(),
  KernelId: z.string().optional(),
  KeyName: z.string().optional(),
  Monitoring: SpotFleetMonitoringSchema.optional(),
  NetworkInterfaces: z.array(InstanceNetworkInterfaceSpecificationSchema)
    .optional(),
  Placement: SpotPlacementSchema.optional(),
  RamdiskId: z.string().optional(),
  SecurityGroups: z.array(GroupIdentifierSchema).optional(),
  SpotPrice: z.string().optional(),
  SubnetId: z.string().optional(),
  TagSpecifications: z.array(SpotFleetTagSpecificationSchema).optional(),
  UserData: z.string().optional(),
  WeightedCapacity: z.number().optional(),
  InstanceRequirements: InstanceRequirementsRequestSchema.optional(),
});

const FleetLaunchTemplateSpecificationSchema = z.object({
  LaunchTemplateId: z.string().optional(),
  LaunchTemplateName: z.string().min(3).max(128).regex(
    new RegExp("[a-zA-Z0-9\\(\\)\\.\\-/_]+"),
  ).optional(),
  Version: z.string(),
});

const LaunchTemplateOverridesSchema = z.object({
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  InstanceType: z.string().optional(),
  SpotPrice: z.string().optional(),
  SubnetId: z.string().optional(),
  WeightedCapacity: z.number().optional(),
  InstanceRequirements: InstanceRequirementsRequestSchema.optional(),
  Priority: z.number().optional(),
});

const LaunchTemplateConfigSchema = z.object({
  LaunchTemplateSpecification: FleetLaunchTemplateSpecificationSchema
    .optional(),
  Overrides: z.array(LaunchTemplateOverridesSchema).optional(),
});

const ClassicLoadBalancerSchema = z.object({
  Name: z.string(),
});

const ClassicLoadBalancersConfigSchema = z.object({
  ClassicLoadBalancers: z.array(ClassicLoadBalancerSchema),
});

const TargetGroupSchema = z.object({
  Arn: z.string(),
});

const TargetGroupsConfigSchema = z.object({
  TargetGroups: z.array(TargetGroupSchema),
});

const LoadBalancersConfigSchema = z.object({
  ClassicLoadBalancersConfig: ClassicLoadBalancersConfigSchema.optional(),
  TargetGroupsConfig: TargetGroupsConfigSchema.optional(),
});

const SpotCapacityRebalanceSchema = z.object({
  ReplacementStrategy: z.enum(["launch", "launch-before-terminate"]).optional(),
  TerminationDelay: z.number().int().optional(),
});

const SpotMaintenanceStrategiesSchema = z.object({
  CapacityRebalance: SpotCapacityRebalanceSchema.optional(),
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
  SpotFleetRequestConfigData: z.object({
    AllocationStrategy: z.enum([
      "capacityOptimized",
      "capacityOptimizedPrioritized",
      "diversified",
      "lowestPrice",
      "priceCapacityOptimized",
    ]).optional(),
    Context: z.string().optional(),
    ExcessCapacityTerminationPolicy: z.enum([
      "Default",
      "NoTermination",
      "default",
      "noTermination",
    ]).optional(),
    IamFleetRole: z.string(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
    LaunchSpecifications: z.array(SpotFleetLaunchSpecificationSchema)
      .optional(),
    LaunchTemplateConfigs: z.array(LaunchTemplateConfigSchema).optional(),
    LoadBalancersConfig: LoadBalancersConfigSchema.optional(),
    OnDemandAllocationStrategy: z.string().optional(),
    OnDemandMaxTotalPrice: z.string().optional(),
    OnDemandTargetCapacity: z.number().int().optional(),
    ReplaceUnhealthyInstances: z.boolean().optional(),
    SpotMaintenanceStrategies: SpotMaintenanceStrategiesSchema.optional(),
    SpotMaxTotalPrice: z.string().optional(),
    SpotPrice: z.string().optional(),
    TargetCapacity: z.number().int(),
    TerminateInstancesWithExpiration: z.boolean().optional(),
    Type: z.enum(["maintain", "request"]).optional(),
    ValidFrom: z.string().optional(),
    ValidUntil: z.string().optional(),
    TagSpecifications: z.array(SpotFleetTagSpecificationSchema).optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
  }),
  Tags: z.array(TagSchema).describe(
    "The tags to specify in SpotFleetRequestConfigData",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  SpotFleetRequestConfigData: z.object({
    AllocationStrategy: z.string(),
    Context: z.string(),
    ExcessCapacityTerminationPolicy: z.string(),
    IamFleetRole: z.string(),
    InstanceInterruptionBehavior: z.string(),
    InstancePoolsToUseCount: z.number(),
    LaunchSpecifications: z.array(SpotFleetLaunchSpecificationSchema),
    LaunchTemplateConfigs: z.array(LaunchTemplateConfigSchema),
    LoadBalancersConfig: LoadBalancersConfigSchema,
    OnDemandAllocationStrategy: z.string(),
    OnDemandMaxTotalPrice: z.string(),
    OnDemandTargetCapacity: z.number(),
    ReplaceUnhealthyInstances: z.boolean(),
    SpotMaintenanceStrategies: SpotMaintenanceStrategiesSchema,
    SpotMaxTotalPrice: z.string(),
    SpotPrice: z.string(),
    TargetCapacity: z.number(),
    TerminateInstancesWithExpiration: z.boolean(),
    Type: z.string(),
    ValidFrom: z.string(),
    ValidUntil: z.string(),
    TagSpecifications: z.array(SpotFleetTagSpecificationSchema),
    TargetCapacityUnitType: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  SpotFleetRequestConfigData: z.object({
    AllocationStrategy: z.enum([
      "capacityOptimized",
      "capacityOptimizedPrioritized",
      "diversified",
      "lowestPrice",
      "priceCapacityOptimized",
    ]).optional(),
    Context: z.string().optional(),
    ExcessCapacityTerminationPolicy: z.enum([
      "Default",
      "NoTermination",
      "default",
      "noTermination",
    ]).optional(),
    IamFleetRole: z.string().optional(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
    LaunchSpecifications: z.array(SpotFleetLaunchSpecificationSchema)
      .optional(),
    LaunchTemplateConfigs: z.array(LaunchTemplateConfigSchema).optional(),
    LoadBalancersConfig: LoadBalancersConfigSchema.optional(),
    OnDemandAllocationStrategy: z.string().optional(),
    OnDemandMaxTotalPrice: z.string().optional(),
    OnDemandTargetCapacity: z.number().int().optional(),
    ReplaceUnhealthyInstances: z.boolean().optional(),
    SpotMaintenanceStrategies: SpotMaintenanceStrategiesSchema.optional(),
    SpotMaxTotalPrice: z.string().optional(),
    SpotPrice: z.string().optional(),
    TargetCapacity: z.number().int().optional(),
    TerminateInstancesWithExpiration: z.boolean().optional(),
    Type: z.enum(["maintain", "request"]).optional(),
    ValidFrom: z.string().optional(),
    ValidUntil: z.string().optional(),
    TagSpecifications: z.array(SpotFleetTagSpecificationSchema).optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to specify in SpotFleetRequestConfigData",
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

/** Swamp extension model for EC2 SpotFleet. Registered at `@swamp/aws/ec2/spot-fleet`. */
export const model = {
  type: "@swamp/aws/ec2/spot-fleet",
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
      description: "EC2 SpotFleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 SpotFleet",
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
          "AWS::EC2::SpotFleet",
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
      description: "Get a EC2 SpotFleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 SpotFleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::SpotFleet",
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
      description: "Update a EC2 SpotFleet",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::SpotFleet",
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
          "AWS::EC2::SpotFleet",
          identifier,
          currentState,
          desiredState,
          [
            "AllocationStrategy",
            "IamFleetRole",
            "InstanceInterruptionBehavior",
            "InstancePoolsToUseCount",
            "LaunchSpecifications",
            "LaunchTemplateConfigs",
            "LoadBalancersConfig",
            "OnDemandAllocationStrategy",
            "OnDemandMaxTotalPrice",
            "OnDemandTargetCapacity",
            "ReplaceUnhealthyInstances",
            "SpotMaintenanceStrategies",
            "SpotMaxTotalPrice",
            "SpotPrice",
            "TagSpecifications",
            "TerminateInstancesWithExpiration",
            "Type",
            "ValidFrom",
            "ValidUntil",
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
      description: "Delete a EC2 SpotFleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 SpotFleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::SpotFleet",
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
      description: "Sync EC2 SpotFleet state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::SpotFleet",
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
