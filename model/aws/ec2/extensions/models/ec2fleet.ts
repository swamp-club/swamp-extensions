// Auto-generated extension model for @swamp/aws/ec2/ec2fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 EC2Fleet (AWS::EC2::EC2Fleet).
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

const CapacityReservationOptionsRequestSchema = z.object({
  UsageStrategy: z.enum(["use-capacity-reservations-first"]).optional(),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const TagSpecificationSchema = z.object({
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

const CapacityRebalanceSchema = z.object({
  TerminationDelay: z.number().int().optional(),
  ReplacementStrategy: z.enum(["launch", "launch-before-terminate"]).optional(),
});

const MaintenanceStrategiesSchema = z.object({
  CapacityRebalance: CapacityRebalanceSchema.optional(),
});

const FleetLaunchTemplateSpecificationRequestSchema = z.object({
  LaunchTemplateName: z.string().min(3).max(128).regex(
    new RegExp("[a-zA-Z0-9\\(\\)\\.\\-/_]+"),
  ).optional(),
  Version: z.string(),
  LaunchTemplateId: z.string().optional(),
  LaunchTemplateSpecificationUserData: z.string().optional(),
});

const InstanceMetadataOptionsRequestSchema = z.object({
  HttpPutResponseHopLimit: z.number().int().optional(),
  HttpTokens: z.enum(["optional", "required"]).optional(),
  HttpEndpoint: z.enum(["disabled", "enabled"]).optional(),
});

const EbsBlockDeviceSchema = z.object({
  SnapshotId: z.string().optional(),
  VolumeType: z.enum(["gp2", "gp3", "io1", "io2", "sc1", "st1", "standard"])
    .optional(),
  KmsKeyId: z.string().optional(),
  Encrypted: z.boolean().optional(),
  Iops: z.number().int().optional(),
  VolumeSize: z.number().int().optional(),
  DeleteOnTermination: z.boolean().optional(),
});

const BlockDeviceMappingSchema = z.object({
  Ebs: EbsBlockDeviceSchema.optional(),
  NoDevice: z.string().optional(),
  VirtualName: z.string().optional(),
  DeviceName: z.string().optional(),
});

const IamInstanceProfileSpecificationSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string().optional(),
});

const PlacementSchema = z.object({
  GroupName: z.string().optional(),
  Tenancy: z.string().optional(),
  SpreadDomain: z.string().optional(),
  PartitionNumber: z.number().int().optional(),
  AvailabilityZone: z.string().optional(),
  Affinity: z.string().optional(),
  HostId: z.string().optional(),
  HostResourceGroupArn: z.string().optional(),
});

const PrivateIpAddressSpecificationRequestSchema = z.object({
  PrivateIpAddress: z.string().optional(),
  Primary: z.boolean().optional(),
});

const Ipv6AddressRequestSchema = z.object({
  Ipv6Address: z.string().optional(),
});

const NetworkInterfaceSpecificationRequestSchema = z.object({
  Description: z.string().optional(),
  PrivateIpAddress: z.string().optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationRequestSchema)
    .optional(),
  SecondaryPrivateIpAddressCount: z.number().int().optional(),
  DeviceIndex: z.number().int().optional(),
  Ipv6Addresses: z.array(Ipv6AddressRequestSchema).optional(),
  SubnetId: z.string().optional(),
  AssociatePublicIpAddress: z.boolean().optional(),
  NetworkCardIndex: z.number().int().optional(),
  NetworkInterfaceId: z.string().optional(),
  InterfaceType: z.string().optional(),
  Groups: z.array(z.string()).optional(),
  Ipv6AddressCount: z.number().int().optional(),
  DeleteOnTermination: z.boolean().optional(),
});

const MemoryGiBPerVCpuRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const VCpuCountRangeRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const MemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const NetworkInterfaceCountRequestSchema = z.object({
  Min: z.number().int().optional(),
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

const PerformanceFactorReferenceRequestSchema = z.object({
  InstanceFamily: z.string().optional(),
});

const CpuPerformanceFactorRequestSchema = z.object({
  References: z.array(PerformanceFactorReferenceRequestSchema).optional(),
});

const BaselinePerformanceFactorsRequestSchema = z.object({
  Cpu: CpuPerformanceFactorRequestSchema.optional(),
});

const BaselineEbsBandwidthMbpsRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const AcceleratorTotalMemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

const TotalLocalStorageGBRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const InstanceRequirementsRequestSchema = z.object({
  InstanceGenerations: z.array(z.enum(["current", "previous"])).optional(),
  RequireEncryptionInTransit: z.boolean().optional(),
  MemoryGiBPerVCpu: MemoryGiBPerVCpuRequestSchema.optional(),
  AcceleratorTypes: z.array(z.enum(["gpu", "fpga", "inference", "media"]))
    .optional(),
  VCpuCount: VCpuCountRangeRequestSchema.optional(),
  AcceleratorManufacturers: z.array(
    z.enum(["amazon-web-services", "amd", "habana", "nvidia", "xilinx"]),
  ).optional(),
  LocalStorage: z.enum(["included", "required", "excluded"]).optional(),
  CpuManufacturers: z.array(
    z.enum(["intel", "amd", "amazon-web-services", "apple"]),
  ).optional(),
  BareMetal: z.enum(["included", "required", "excluded"]).optional(),
  RequireHibernateSupport: z.boolean().optional(),
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: z.number().int().optional(),
  OnDemandMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  MemoryMiB: MemoryMiBRequestSchema.optional(),
  LocalStorageTypes: z.array(z.enum(["hdd", "ssd"])).optional(),
  NetworkInterfaceCount: NetworkInterfaceCountRequestSchema.optional(),
  ExcludedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  AllowedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  NetworkBandwidthGbps: NetworkBandwidthGbpsRequestSchema.optional(),
  AcceleratorCount: AcceleratorCountRequestSchema.optional(),
  BaselinePerformanceFactors: BaselinePerformanceFactorsRequestSchema
    .optional(),
  SpotMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  BaselineEbsBandwidthMbps: BaselineEbsBandwidthMbpsRequestSchema.optional(),
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
  BurstablePerformance: z.enum(["included", "required", "excluded"]).optional(),
  TotalLocalStorageGB: TotalLocalStorageGBRequestSchema.optional(),
});

const FleetLaunchTemplateOverridesRequestSchema = z.object({
  MetadataOptions: InstanceMetadataOptionsRequestSchema.optional(),
  Priority: z.number().optional(),
  AvailabilityZoneId: z.string().optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
  AvailabilityZone: z.string().optional(),
  IamInstanceProfile: IamInstanceProfileSpecificationSchema.optional(),
  SubnetId: z.string().optional(),
  KeyName: z.string().optional(),
  WeightedCapacity: z.number().optional(),
  Placement: PlacementSchema.optional(),
  NetworkInterfaces: z.array(NetworkInterfaceSpecificationRequestSchema)
    .optional(),
  InstanceRequirements: InstanceRequirementsRequestSchema.optional(),
  InstanceType: z.string().optional(),
  MaxPrice: z.string().optional(),
});

const FleetLaunchTemplateConfigRequestSchema = z.object({
  LaunchTemplateSpecification: FleetLaunchTemplateSpecificationRequestSchema
    .optional(),
  Overrides: z.array(FleetLaunchTemplateOverridesRequestSchema).optional(),
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
  Context: z.string().optional(),
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.enum([
      "on-demand",
      "spot",
      "capacity-block",
      "reserved-capacity",
    ]).optional(),
    TotalTargetCapacity: z.number().int(),
    OnDemandTargetCapacity: z.number().int().optional(),
    SpotTargetCapacity: z.number().int().optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
  }),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.string().optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema
      .optional(),
  }).optional(),
  ExcessCapacityTerminationPolicy: z.enum(["termination", "no-termination"])
    .optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.enum([
      "lowest-price",
      "lowestPrice",
      "diversified",
      "capacityOptimized",
      "capacity-optimized",
      "capacityOptimizedPrioritized",
      "capacity-optimized-prioritized",
      "priceCapacityOptimized",
      "price-capacity-optimized",
    ]).optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    MaintenanceStrategies: MaintenanceStrategiesSchema.optional(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
  }).optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Type: z.enum(["maintain", "request", "instant"]).optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.enum(["interruptible-capacity-reservation"]))
      .optional(),
  }).optional(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
});

const StateSchema = z.object({
  Context: z.string().optional(),
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.string(),
    TotalTargetCapacity: z.number(),
    OnDemandTargetCapacity: z.number(),
    SpotTargetCapacity: z.number(),
    TargetCapacityUnitType: z.string(),
  }).optional(),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean(),
    AllocationStrategy: z.string(),
    SingleInstanceType: z.boolean(),
    MinTargetCapacity: z.number(),
    MaxTotalPrice: z.string(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema,
  }).optional(),
  ExcessCapacityTerminationPolicy: z.string().optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    SingleAvailabilityZone: z.boolean(),
    AllocationStrategy: z.string(),
    SingleInstanceType: z.boolean(),
    MinTargetCapacity: z.number(),
    MaxTotalPrice: z.string(),
    MaintenanceStrategies: MaintenanceStrategiesSchema,
    InstanceInterruptionBehavior: z.string(),
    InstancePoolsToUseCount: z.number(),
  }).optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema)
    .optional(),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Type: z.string().optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.string()),
  }).optional(),
  FleetId: z.string(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Context: z.string().optional(),
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.enum([
      "on-demand",
      "spot",
      "capacity-block",
      "reserved-capacity",
    ]).optional(),
    TotalTargetCapacity: z.number().int().optional(),
    OnDemandTargetCapacity: z.number().int().optional(),
    SpotTargetCapacity: z.number().int().optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
  }).optional(),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.string().optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema
      .optional(),
  }).optional(),
  ExcessCapacityTerminationPolicy: z.enum(["termination", "no-termination"])
    .optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.enum([
      "lowest-price",
      "lowestPrice",
      "diversified",
      "capacityOptimized",
      "capacity-optimized",
      "capacityOptimizedPrioritized",
      "capacity-optimized-prioritized",
      "priceCapacityOptimized",
      "price-capacity-optimized",
    ]).optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    MaintenanceStrategies: MaintenanceStrategiesSchema.optional(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
  }).optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema)
    .optional(),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Type: z.enum(["maintain", "request", "instant"]).optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.enum(["interruptible-capacity-reservation"]))
      .optional(),
  }).optional(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
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

/** Swamp extension model for EC2 EC2Fleet. Registered at `@swamp/aws/ec2/ec2fleet`. */
export const model = {
  type: "@swamp/aws/ec2/ec2fleet",
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
      toVersion: "2026.04.19.1",
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
      toVersion: "2026.04.24.1",
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
      description: "EC2 EC2Fleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 EC2Fleet",
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
          "AWS::EC2::EC2Fleet",
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
      description: "Get a EC2 EC2Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 EC2Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::EC2Fleet",
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
      description: "Update a EC2 EC2Fleet",
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
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::EC2Fleet",
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
          "AWS::EC2::EC2Fleet",
          identifier,
          currentState,
          desiredState,
          [
            "LaunchTemplateConfigs",
            "OnDemandOptions",
            "ReservedCapacityOptions",
            "ReplaceUnhealthyInstances",
            "SpotOptions",
            "TagSpecifications",
            "TerminateInstancesWithExpiration",
            "Type",
            "ValidFrom",
            "ValidUntil",
            "TargetCapacityUnitType",
            "DefaultTargetCapacityType",
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
      description: "Delete a EC2 EC2Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 EC2Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::EC2Fleet",
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
      description: "Sync EC2 EC2Fleet state from AWS",
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
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::EC2Fleet",
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
