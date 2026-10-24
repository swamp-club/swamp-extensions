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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/capacity-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore CapacityProvider (AWS::BedrockAgentCore::CapacityProvider).
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

const InstanceRequirementsSchema = z.object({
  AllowedInstanceTypes: z.array(z.string().min(1).max(255)).describe(
    "List of allowed instance types.",
  ),
});

const EphemeralEBSVolumeConfigurationSchema = z.object({
  Encrypted: z.boolean().describe(
    "Indicates whether the EBS volume is encrypted.",
  ).optional(),
  Iops: z.number().int().min(100).max(256000).describe(
    "The number of I/O operations per second (IOPS).",
  ).optional(),
  KmsKeyId: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-z0-9-]+:[0-9]{12}:key/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe(
    "Identifier of the customer managed KMS key to use for EBS encryption.",
  ).optional(),
  SnapshotId: z.string().min(13).max(64).regex(
    new RegExp("^snap-[a-f0-9]{8,17}$"),
  ).describe("The ID of the snapshot.").optional(),
  VolumeSize: z.number().int().min(1).max(65536).describe(
    "The size of the volume, in GiBs.",
  ).optional(),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .describe("The volume type. Defaults to gp3 if not specified.").optional(),
  Throughput: z.number().int().min(125).max(2000).describe(
    "The throughput to provision for a gp3 volume, in MiB/s.",
  ).optional(),
  VolumeInitializationRate: z.number().int().min(100).max(300).describe(
    "The rate at which the volume is initialized after creation, in MiB/s. Supported only for volumes created from snapshots. If the snapshot is enabled for fast snapshot restore and a volume initialization rate is also specified, the volume is initialized at the specified rate instead of by fast snapshot restore. Valid range: 100-300 MiB/s.",
  ).optional(),
  EbsCardIndex: z.number().int().min(0).describe(
    "The index of the EBS card. Applies to instances with multiple EBS cards.",
  ).optional(),
});

const EphemeralBlockDeviceMappingSchema = z.object({
  DeviceName: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9/._-]+$"))
    .describe("The device name (for example, /dev/sdh or xvdh).").optional(),
  VirtualName: z.string().min(1).max(255).regex(new RegExp("^ephemeral[0-9]+$"))
    .describe("The virtual device name (ephemeralN).").optional(),
  Ebs: EphemeralEBSVolumeConfigurationSchema.describe(
    "Parameters used to automatically set up EBS volumes when the instance is launched.",
  ).optional(),
});

const LicenseSpecificationSchema = z.object({
  LicenseConfigurationArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:license-manager:[a-z0-9-]+:[0-9]{12}:license-configuration:[a-zA-Z0-9_-]+$",
    ),
  ).describe("The ARN of the license configuration."),
});

const CapacityReservationTargetSchema = z.object({
  CapacityReservationId: z.string().min(1).max(255).regex(
    new RegExp("^cr-[0-9a-z]+$"),
  ).describe("The ID of the Capacity Reservation in which to run the instance.")
    .optional(),
  CapacityReservationResourceGroupArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:resource-groups:[a-z0-9-]+:[0-9]{12}:group/[a-zA-Z0-9_-]+$",
    ),
  ).describe(
    "The ARN of the Capacity Reservation resource group in which to run the instance.",
  ).optional(),
});

const CapacityReservationSpecificationSchema = z.object({
  CapacityReservationPreference: z.enum([
    "capacity-reservations-only",
    "open",
    "none",
  ]).describe("Indicates the instance's Capacity Reservation preferences.")
    .optional(),
  CapacityReservationTarget: CapacityReservationTargetSchema.describe(
    "Information about the target Capacity Reservation or Capacity Reservation group.",
  ).optional(),
});

const LaunchParametersSchema = z.object({
  OperatingSystem: z.enum(["LINUX_X86_64", "LINUX_ARM64"]).describe(
    "The operating system and CPU architecture for the instances.",
  ),
  InstanceRequirements: InstanceRequirementsSchema.describe(
    "Requirements for EC2 instance types.",
  ),
  EphemeralVolumes: z.array(EphemeralBlockDeviceMappingSchema).describe(
    "The block device mapping for ephemeral (instance store) volumes.",
  ).optional(),
  Monitoring: z.enum(["BASIC", "DETAILED"]).describe(
    "The monitoring level for the instance.",
  ).optional(),
  LicenseSpecifications: z.array(LicenseSpecificationSchema).describe(
    "The license configurations.",
  ).optional(),
  CapacityReservationSpecification: CapacityReservationSpecificationSchema
    .describe("The Capacity Reservation targeting option.").optional(),
  SshKeyName: z.string().min(1).max(255).regex(
    new RegExp("^[!-~][ -~]*[!-~]$|^[!-~]$"),
  ).describe(
    "The name of the SSH key pair to configure on instances for SSH connectivity.",
  ).optional(),
  InstanceProfileArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:iam::[0-9]{12}:instance-profile/([!-~]{1,510}/)?([\\w+=,.@-]{1,128})$",
    ),
  ).describe(
    "The ARN of the IAM instance profile to associate with launched instances.",
  ).optional(),
  PropagatedTags: z.record(z.string(), z.string()).describe(
    "Tags to apply to all EC2 resources (instances, volumes, and network interfaces) created by this capacity provider.",
  ).optional(),
});

const LaunchTemplateSourceSchema = z.object({
  LaunchParameters: LaunchParametersSchema.describe(
    "Parameters for launching EC2 instances.",
  ),
});

const VpcConfigurationSchema = z.object({
  Subnets: z.array(z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")))
    .describe("The IDs of the subnets in which to launch instances."),
  SecurityGroups: z.array(
    z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{8,17}$")),
  ).describe("The IDs of the security groups to associate with the instances."),
});

const EbsVolumeConfigurationSchema = z.object({
  Name: z.string().min(1).max(48).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_-]{0,47}$"),
  ).describe(
    "The logical name of the volume, used to reference it when mounting.",
  ),
  SizeGiB: z.number().int().min(1).max(65536).describe(
    "The size of the volume in GiB.",
  ),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .describe("The EBS volume type. Defaults to gp3 if not specified.")
    .optional(),
  Iops: z.number().int().min(100).max(256000).describe(
    "The number of IOPS to provision. Only valid for gp3, io1, and io2 volumes.",
  ).optional(),
  Throughput: z.number().int().min(125).max(2000).describe(
    "The throughput in MiB/s. Only valid for gp3 volumes.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Whether to encrypt the volume. Defaults to true.",
  ).optional(),
  KmsKeyId: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-z0-9-]+:[0-9]{12}:key/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe("Identifier of the KMS key to use for encryption.").optional(),
  SnapshotId: z.string().min(13).max(64).regex(
    new RegExp("^snap-[a-f0-9]{8,17}$"),
  ).describe("Optional EBS snapshot ID to initialize the volume from.")
    .optional(),
});

const VolumeConfigurationSchema = z.object({
  EbsConfiguration: EbsVolumeConfigurationSchema.describe(
    "Configuration for an EBS-backed persistent volume.",
  ),
});

const RootVolumeConfigurationSchema = z.object({
  FreeSpaceGiB: z.number().int().min(2).max(65000).describe(
    "The free space guaranteed on the root volume, in GiB. The service adds the operating system overhead on top of this value. Defaults to 8 GiB. The maximum is below the 65,536 GiB gp3 ceiling because the service adds the AMI size bucket on top of this value, and the resulting total must still be a provisionable gp3 volume.",
  ).optional(),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .describe("The EBS volume type. Defaults to gp3 if not specified.")
    .optional(),
  Iops: z.number().int().min(100).max(256000).describe(
    "The number of IOPS to provision. Only valid for gp3, io1, and io2 volumes.",
  ).optional(),
  Throughput: z.number().int().min(125).max(2000).describe(
    "The throughput to provision for a gp3 volume, in MiB/s. Valid range: 125-2000 MiB/s.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the EBS volume is encrypted. Encrypted volumes can only be attached to instances that support Amazon EBS encryption. If you are creating a volume from a snapshot, you can't specify an encryption value.",
  ).optional(),
  KmsKeyId: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-z0-9-]+:[0-9]{12}:key/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe(
    "Identifier of the customer managed KMS key to use for EBS encryption.",
  ).optional(),
});

const InstanceLifecycleConfigurationSchema = z.object({
  IdleInstanceTimeout: z.number().int().min(60).max(1209600).describe(
    "The number of seconds an instance can remain idle before it is stopped.",
  ).optional(),
  MaxLifetime: z.number().int().min(60).max(1209600).describe(
    "Maximum lifetime for the instance in seconds. Once reached, instances will be automatically terminated regardless of activity. Default: 28800 seconds (8 hours). Maximum: 1209600 seconds (14 days).",
  ).optional(),
});

const Ec2ConfigurationSchema = z.object({
  LaunchTemplateSource: LaunchTemplateSourceSchema.describe(
    "How the launch template is specified.",
  ),
  VpcConfiguration: VpcConfigurationSchema.describe(
    "VPC configuration for launching EC2 instances.",
  ),
  Volumes: z.array(VolumeConfigurationSchema).describe(
    "Named persistent EBS volumes for this capacity provider.",
  ).optional(),
  RootVolume: RootVolumeConfigurationSchema.describe(
    "Customer-facing configuration for the (service-managed) root volume. The service provisions the root volume at its own AMI size estimate plus FreeSpaceGiB, and pins the visible free space to FreeSpaceGiB with a filler file, so the space you are guaranteed does not change as the underlying AMI grows. The device name and the delete-on-termination behavior are service-owned and are not configurable.",
  ).optional(),
  LifecycleConfiguration: InstanceLifecycleConfigurationSchema.describe(
    "Configuration for managing the lifecycle of instances in a capacity provider.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
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
  Name: z.string().min(1).max(48).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe("The name of the capacity provider."),
  Description: z.string().min(1).max(4096).describe(
    "An optional description of the capacity provider.",
  ).optional(),
  PermissionsConfiguration: z.object({
    CapacityProviderOperatorRoleArn: z.string().min(1).max(2048).regex(
      new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+$"),
    ).describe(
      "The ARN of the IAM role that operators use to manage the capacity provider.",
    ),
  }).describe(
    "Configuration for permissions associated with a capacity provider.",
  ),
  ComputeConfiguration: z.object({
    Ec2Configuration: Ec2ConfigurationSchema.describe(
      "Configuration for EC2-based capacity.",
    ),
  }).describe(
    "The capacity configuration for the capacity provider. Defines the compute resources for this capacity provider.",
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the capacity provider.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  PermissionsConfiguration: z.object({
    CapacityProviderOperatorRoleArn: z.string(),
  }).optional(),
  ComputeConfiguration: z.object({
    Ec2Configuration: Ec2ConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CapacityProviderId: z.string().optional(),
  Arn: z.string(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(48).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe("The name of the capacity provider.").optional(),
  Description: z.string().min(1).max(4096).describe(
    "An optional description of the capacity provider.",
  ).optional(),
  PermissionsConfiguration: z.object({
    CapacityProviderOperatorRoleArn: z.string().min(1).max(2048).regex(
      new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+$"),
    ).describe(
      "The ARN of the IAM role that operators use to manage the capacity provider.",
    ).optional(),
  }).describe(
    "Configuration for permissions associated with a capacity provider.",
  ).optional(),
  ComputeConfiguration: z.object({
    Ec2Configuration: Ec2ConfigurationSchema.describe(
      "Configuration for EC2-based capacity.",
    ).optional(),
  }).describe(
    "The capacity configuration for the capacity provider. Defines the compute resources for this capacity provider.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the capacity provider.",
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

/** Swamp extension model for BedrockAgentCore CapacityProvider. Registered at `@swamp/aws/bedrockagentcore/capacity-provider`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/capacity-provider",
  version: "2026.10.23.1",
  upgrades: [
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
      toVersion: "2026.08.26.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore CapacityProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore CapacityProvider",
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
          "AWS::BedrockAgentCore::CapacityProvider",
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
      description: "Get a BedrockAgentCore CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::CapacityProvider",
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
      description: "Update a BedrockAgentCore CapacityProvider",
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
          "AWS::BedrockAgentCore::CapacityProvider",
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
          "AWS::BedrockAgentCore::CapacityProvider",
          identifier,
          currentState,
          desiredState,
          ["Name", "PermissionsConfiguration", "ComputeConfiguration"],
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
      description: "Delete a BedrockAgentCore CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::CapacityProvider",
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
      description: "Sync BedrockAgentCore CapacityProvider state from AWS",
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
            "AWS::BedrockAgentCore::CapacityProvider",
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
      description: "List BedrockAgentCore CapacityProvider resources",
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
          "AWS::BedrockAgentCore::CapacityProvider",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
