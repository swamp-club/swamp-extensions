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

// Auto-generated extension model for @swamp/aws/emr/instance-fleet-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMR InstanceFleetConfig (AWS::EMR::InstanceFleetConfig).
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

const SpotProvisioningSpecificationSchema = z.object({
  AllocationStrategy: z.string().describe(
    "Specifies one of the following strategies to launch Spot Instance fleets: price-capacity-optimized, capacity-optimized, lowest-price, or diversified",
  ).optional(),
  TimeoutDurationMinutes: z.number().int().describe(
    "The Spot provisioning timeout period in minutes. If Spot Instances are not provisioned within this time period, the TimeOutAction is taken. Minimum value is 5 and maximum value is 1440. The timeout applies only during initial provisioning, when the cluster is first created.",
  ),
  TimeoutAction: z.string().describe(
    "The action to take when TargetSpotCapacity has not been fulfilled when the TimeoutDurationMinutes has expired; that is, when all Spot Instances could not be provisioned within the Spot provisioning timeout. Valid values are TERMINATE_CLUSTER and SWITCH_TO_ON_DEMAND. SWITCH_TO_ON_DEMAND specifies that if no Spot Instances are available, On-Demand Instances should be provisioned to fulfill any remaining Spot capacity.",
  ),
  BlockDurationMinutes: z.number().int().describe(
    "The defined duration for Spot Instances (also known as Spot blocks) in minutes. When specified, the Spot Instance does not terminate before the defined duration expires, and defined duration pricing for Spot Instances applies. Valid values are 60, 120, 180, 240, 300, or 360.",
  ).optional(),
});

const OnDemandCapacityReservationOptionsSchema = z.object({
  UsageStrategy: z.string().describe(
    "Indicates whether to use unused Capacity Reservations for fulfilling On-Demand capacity.",
  ).optional(),
  CapacityReservationResourceGroupArn: z.string().describe(
    "The ARN of the Capacity Reservation resource group in which to run the instance.",
  ).optional(),
  CapacityReservationPreference: z.string().describe(
    "Indicates the instance's Capacity Reservation preferences.",
  ).optional(),
});

const OnDemandProvisioningSpecificationSchema = z.object({
  CapacityReservationOptions: OnDemandCapacityReservationOptionsSchema
    .optional(),
  AllocationStrategy: z.string().describe(
    "Specifies the strategy to use in launching On-Demand instance fleets. Currently, the only option is lowest-price (the default), which launches the lowest price first.",
  ),
});

const OnDemandResizingSpecificationSchema = z.object({
  CapacityReservationOptions: OnDemandCapacityReservationOptionsSchema.describe(
    "Describes the strategy for using unused Capacity Reservations for fulfilling On-Demand capacity.",
  ).optional(),
  AllocationStrategy: z.string().describe(
    "Specifies the allocation strategy to use to launch On-Demand instances during a resize. The default is lowest-price.",
  ).optional(),
  TimeoutDurationMinutes: z.number().int().describe(
    "On-Demand resize timeout in minutes.",
  ).optional(),
});

const SpotResizingSpecificationSchema = z.object({
  AllocationStrategy: z.string().describe(
    "Specifies the allocation strategy to use to launch Spot instances during a resize.",
  ).optional(),
  TimeoutDurationMinutes: z.number().int().describe(
    "Spot resize timeout in minutes.",
  ).optional(),
});

const VolumeSpecificationSchema = z.object({
  SizeInGB: z.number().int().describe(
    "The volume size, in gibibytes (GiB). This can be a number from 1 - 1024. If the volume type is EBS-optimized, the minimum value is 10.",
  ),
  VolumeType: z.string().describe(
    "The volume type. Volume types supported are gp3, gp2, io1, st1, sc1, and standard.",
  ),
  Throughput: z.number().int().describe(
    "The throughput, in mebibyte per second (MiB/s). This optional parameter can be a number from 125 - 1000 and is valid only for gp3 volumes.",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS) that the volume supports.",
  ).optional(),
});

const EbsBlockDeviceConfigSchema = z.object({
  VolumeSpecification: VolumeSpecificationSchema.describe(
    "EBS volume specifications such as volume type, IOPS, size (GiB) and throughput (MiB/s) that are requested for the EBS volume attached to an Amazon EC2 instance in the cluster.",
  ),
  VolumesPerInstance: z.number().int().describe(
    "Use of this property can confuse CloudFormation drift detection. The EbsBlockDeviceConfigs read from the system may return a list with one entry per volume, replacing any entry specified in the template with a VolumesPerInstance greater than one by that many entries containing only the VolumeSpecification. Thus to avoid false drift detection, it is recommended to supply repeated entries in EbsBlockDeviceConfigs for any VolumeSpecification which is intended to be repeated and not to use this property.",
  ).optional(),
});

const EbsConfigurationSchema = z.object({
  EbsBlockDeviceConfigs: z.array(EbsBlockDeviceConfigSchema).describe(
    "An array of Amazon EBS volume specifications attached to a cluster instance.",
  ).optional(),
  EbsOptimized: z.boolean().describe(
    "Indicates whether an Amazon EBS volume is EBS-optimized.",
  ).optional(),
});

const ApplicationConfigurationSchema = z.object({
  ConfigurationProperties: z.record(z.string(), z.string()).describe(
    "Within a configuration classification, a set of properties that represent the settings that you want to change in the configuration file.",
  ).optional(),
  Configurations: z.array(z.record(z.string(), z.unknown())).describe(
    "A list of additional configurations to apply within a configuration object.",
  ).optional(),
  Classification: z.string().describe(
    "The classification within a configuration.",
  ).optional(),
});

const InstanceTypeConfigSchema = z.object({
  BidPrice: z.string().describe(
    "The bid price for each Amazon EC2 Spot Instance type as defined by InstanceType. Expressed in USD. If neither BidPrice nor BidPriceAsPercentageOfOnDemandPrice is provided, BidPriceAsPercentageOfOnDemandPrice defaults to 100%.",
  ).optional(),
  WeightedCapacity: z.number().int().describe(
    "The number of units that a provisioned instance of this type provides toward fulfilling the target capacities defined in InstanceFleetConfig. This value is 1 for a master instance fleet, and must be 1 or greater for core and task instance fleets. Defaults to 1 if not specified.",
  ).optional(),
  EbsConfiguration: EbsConfigurationSchema.describe(
    "The configuration of Amazon Elastic Block Store (Amazon EBS) attached to each instance as defined by InstanceType.",
  ).optional(),
  BidPriceAsPercentageOfOnDemandPrice: z.number().describe(
    "The bid price, as a percentage of On-Demand price, for each Amazon EC2 Spot Instance as defined by InstanceType. Expressed as a number (for example, 20 specifies 20%). If neither BidPrice nor BidPriceAsPercentageOfOnDemandPrice is provided, BidPriceAsPercentageOfOnDemandPrice defaults to 100%.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "The custom AMI ID to use for the instance type.",
  ).optional(),
  Configurations: z.array(ApplicationConfigurationSchema).describe(
    "An optional configuration specification to be used when provisioning cluster instances, which can include configurations for applications and software bundled with Amazon EMR.",
  ).optional(),
  InstanceType: z.string().describe(
    "An Amazon EC2 instance type, such as m3.xlarge.",
  ),
  Priority: z.number().describe(
    "The priority at which Amazon EMR launches the Amazon EC2 instances with this instance type.",
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
  InstanceFleetType: z.string().describe(
    "The node type that the instance fleet hosts.",
  ),
  TargetOnDemandCapacity: z.number().int().describe(
    "The target capacity of On-Demand units for the instance fleet, which determines how many On-Demand instances to provision.",
  ).optional(),
  ClusterId: z.string().describe("The unique identifier of the EMR cluster."),
  TargetSpotCapacity: z.number().int().describe(
    "The target capacity of Spot units for the instance fleet, which determines how many Spot instances to provision.",
  ).optional(),
  LaunchSpecifications: z.object({
    SpotSpecification: SpotProvisioningSpecificationSchema.describe(
      "The launch specification for Spot instances in the fleet, which determines the defined duration, provisioning timeout behavior, and allocation strategy.",
    ).optional(),
    OnDemandSpecification: OnDemandProvisioningSpecificationSchema.describe(
      "The launch specification for On-Demand Instances in the instance fleet, which determines the allocation strategy.",
    ).optional(),
  }).describe("The launch specification for the instance fleet.").optional(),
  ResizeSpecifications: z.object({
    OnDemandResizeSpecification: OnDemandResizingSpecificationSchema.describe(
      "The resize specification for On-Demand Instances in the instance fleet, which contains the allocation strategy, capacity reservation options, and the resize timeout period.",
    ).optional(),
    SpotResizeSpecification: SpotResizingSpecificationSchema.describe(
      "The resize specification for Spot Instances in the instance fleet, which contains the allocation strategy and the resize timeout period.",
    ).optional(),
  }).describe("The resize specification for the instance fleet.").optional(),
  InstanceTypeConfigs: z.array(InstanceTypeConfigSchema).describe(
    "InstanceTypeConfigs determine the EC2 instances that Amazon EMR attempts to provision to fulfill On-Demand and Spot target capacities.",
  ).optional(),
  Name: z.string().describe("The friendly name of the instance fleet.")
    .optional(),
});

const StateSchema = z.object({
  InstanceFleetType: z.string().optional(),
  TargetOnDemandCapacity: z.number().optional(),
  ClusterId: z.string(),
  TargetSpotCapacity: z.number().optional(),
  LaunchSpecifications: z.object({
    SpotSpecification: SpotProvisioningSpecificationSchema,
    OnDemandSpecification: OnDemandProvisioningSpecificationSchema,
  }).optional(),
  ResizeSpecifications: z.object({
    OnDemandResizeSpecification: OnDemandResizingSpecificationSchema,
    SpotResizeSpecification: SpotResizingSpecificationSchema,
  }).optional(),
  InstanceFleetId: z.string(),
  InstanceTypeConfigs: z.array(InstanceTypeConfigSchema).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstanceFleetType: z.string().describe(
    "The node type that the instance fleet hosts.",
  ).optional(),
  TargetOnDemandCapacity: z.number().int().describe(
    "The target capacity of On-Demand units for the instance fleet, which determines how many On-Demand instances to provision.",
  ).optional(),
  ClusterId: z.string().describe("The unique identifier of the EMR cluster.")
    .optional(),
  TargetSpotCapacity: z.number().int().describe(
    "The target capacity of Spot units for the instance fleet, which determines how many Spot instances to provision.",
  ).optional(),
  LaunchSpecifications: z.object({
    SpotSpecification: SpotProvisioningSpecificationSchema.describe(
      "The launch specification for Spot instances in the fleet, which determines the defined duration, provisioning timeout behavior, and allocation strategy.",
    ).optional(),
    OnDemandSpecification: OnDemandProvisioningSpecificationSchema.describe(
      "The launch specification for On-Demand Instances in the instance fleet, which determines the allocation strategy.",
    ).optional(),
  }).describe("The launch specification for the instance fleet.").optional(),
  ResizeSpecifications: z.object({
    OnDemandResizeSpecification: OnDemandResizingSpecificationSchema.describe(
      "The resize specification for On-Demand Instances in the instance fleet, which contains the allocation strategy, capacity reservation options, and the resize timeout period.",
    ).optional(),
    SpotResizeSpecification: SpotResizingSpecificationSchema.describe(
      "The resize specification for Spot Instances in the instance fleet, which contains the allocation strategy and the resize timeout period.",
    ).optional(),
  }).describe("The resize specification for the instance fleet.").optional(),
  InstanceTypeConfigs: z.array(InstanceTypeConfigSchema).describe(
    "InstanceTypeConfigs determine the EC2 instances that Amazon EMR attempts to provision to fulfill On-Demand and Spot target capacities.",
  ).optional(),
  Name: z.string().describe("The friendly name of the instance fleet.")
    .optional(),
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

/** Swamp extension model for EMR InstanceFleetConfig. Registered at `@swamp/aws/emr/instance-fleet-config`. */
export const model = {
  type: "@swamp/aws/emr/instance-fleet-config",
  version: "2026.10.25.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EMR InstanceFleetConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR InstanceFleetConfig",
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
          "AWS::EMR::InstanceFleetConfig",
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
      description: "Get a EMR InstanceFleetConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR InstanceFleetConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMR::InstanceFleetConfig",
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
      description: "Update a EMR InstanceFleetConfig",
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
        const idParts = [
          existing.ClusterId?.toString(),
          existing.InstanceFleetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::EMR::InstanceFleetConfig",
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
          "AWS::EMR::InstanceFleetConfig",
          identifier,
          currentState,
          desiredState,
          ["Name", "LaunchSpecifications", "ClusterId", "InstanceFleetType"],
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
      description: "Delete a EMR InstanceFleetConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR InstanceFleetConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMR::InstanceFleetConfig",
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
      description: "Sync EMR InstanceFleetConfig state from AWS",
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
        const idParts = [
          existing.ClusterId?.toString(),
          existing.InstanceFleetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EMR::InstanceFleetConfig",
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
      description: "List EMR InstanceFleetConfig resources",
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
          "AWS::EMR::InstanceFleetConfig",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
