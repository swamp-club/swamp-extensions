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

// Auto-generated extension model for @swamp/aws/autoscaling/launch-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AutoScaling LaunchConfiguration (AWS::AutoScaling::LaunchConfiguration).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const BlockDeviceSchema = z.object({
  SnapshotId: z.string().describe("The snapshot ID of the volume to use.")
    .optional(),
  VolumeType: z.string().describe("The volume type.").optional(),
  Encrypted: z.boolean().describe(
    "Specifies whether the volume should be encrypted.",
  ).optional(),
  Throughput: z.number().int().describe(
    "The throughput (MiBps) to provision for a gp3 volume.",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of input/output (I/O) operations per second (IOPS) to provision for the volume.",
  ).optional(),
  VolumeSize: z.number().int().describe("The volume size, in GiBs.").optional(),
  DeleteOnTermination: z.boolean().describe(
    "Indicates whether the volume is deleted on instance termination.",
  ).optional(),
});

const BlockDeviceMappingSchema = z.object({
  Ebs: BlockDeviceSchema.describe(
    "Parameters used to automatically set up EBS volumes when an instance is launched.",
  ).optional(),
  NoDevice: z.boolean().describe(
    "Setting this value to true suppresses the specified device included in the block device mapping of the AMI.",
  ).optional(),
  VirtualName: z.string().describe("The name of the virtual device.")
    .optional(),
  DeviceName: z.string().describe(
    "The device name exposed to the EC2 instance (for example, /dev/sdh or xvdh).",
  ),
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
  PlacementTenancy: z.string().describe(
    "The tenancy of the instance, either default or dedicated.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "A list that contains the security groups to assign to the instances in the Auto Scaling group.",
  ).optional(),
  LaunchConfigurationName: z.string().min(1).max(255).describe(
    "The name of the launch configuration. This name must be unique per Region per account.",
  ).optional(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().describe(
      "The desired HTTP PUT response hop limit for instance metadata requests.",
    ).optional(),
    HttpTokens: z.string().describe(
      "The state of token usage for your instance metadata requests.",
    ).optional(),
    HttpEndpoint: z.string().describe(
      "This parameter enables or disables the HTTP metadata endpoint on your instances.",
    ).optional(),
  }).describe("The metadata options for the instances.").optional(),
  InstanceId: z.string().describe(
    "The ID of the Amazon EC2 instance you want to use to create the launch configuration.",
  ).optional(),
  UserData: z.string().max(21847).describe(
    "The Base64-encoded user data to make available to the launched EC2 instances.",
  ).optional(),
  ClassicLinkVPCSecurityGroups: z.array(z.string()).describe(
    "The IDs of one or more security groups for the VPC that you specified in the ClassicLinkVPCId property.",
  ).optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
    "Specifies how block devices are exposed to the instance. You can specify virtual devices and EBS volumes.",
  ).optional(),
  IamInstanceProfile: z.string().describe(
    "Provides the name or the Amazon Resource Name (ARN) of the instance profile associated with the IAM role for the instance. The instance profile contains the IAM role.",
  ).optional(),
  KernelId: z.string().describe(
    "Provides the ID of the kernel associated with the EC2 AMI.",
  ).optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "For Auto Scaling groups that are running in a virtual private cloud (VPC), specifies whether to assign a public IP address to the group's instances.",
  ).optional(),
  ClassicLinkVPCId: z.string().describe(
    "The ID of a ClassicLink-enabled VPC to link your EC2-Classic instances to.",
  ).optional(),
  EbsOptimized: z.boolean().describe(
    "Specifies whether the launch configuration is optimized for EBS I/O (true) or not (false).",
  ).optional(),
  KeyName: z.string().describe("Provides the name of the EC2 key pair.")
    .optional(),
  SpotPrice: z.string().describe(
    "The maximum hourly price you are willing to pay for any Spot Instances launched to fulfill the request.",
  ).optional(),
  ImageId: z.string().describe(
    "Provides the unique ID of the Amazon Machine Image (AMI) that was assigned during registration.",
  ),
  InstanceType: z.string().describe(
    "Specifies the instance type of the EC2 instance.",
  ),
  RamDiskId: z.string().describe("The ID of the RAM disk to select.")
    .optional(),
  InstanceMonitoring: z.boolean().describe(
    "Controls whether instances in this group are launched with detailed (true) or basic (false) monitoring.",
  ).optional(),
});

const StateSchema = z.object({
  PlacementTenancy: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  LaunchConfigurationName: z.string(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number(),
    HttpTokens: z.string(),
    HttpEndpoint: z.string(),
  }).optional(),
  InstanceId: z.string().optional(),
  UserData: z.string().optional(),
  ClassicLinkVPCSecurityGroups: z.array(z.string()).optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
  IamInstanceProfile: z.string().optional(),
  KernelId: z.string().optional(),
  AssociatePublicIpAddress: z.boolean().optional(),
  ClassicLinkVPCId: z.string().optional(),
  EbsOptimized: z.boolean().optional(),
  KeyName: z.string().optional(),
  SpotPrice: z.string().optional(),
  ImageId: z.string().optional(),
  InstanceType: z.string().optional(),
  RamDiskId: z.string().optional(),
  InstanceMonitoring: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  PlacementTenancy: z.string().describe(
    "The tenancy of the instance, either default or dedicated.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "A list that contains the security groups to assign to the instances in the Auto Scaling group.",
  ).optional(),
  LaunchConfigurationName: z.string().min(1).max(255).describe(
    "The name of the launch configuration. This name must be unique per Region per account.",
  ).optional(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().describe(
      "The desired HTTP PUT response hop limit for instance metadata requests.",
    ).optional(),
    HttpTokens: z.string().describe(
      "The state of token usage for your instance metadata requests.",
    ).optional(),
    HttpEndpoint: z.string().describe(
      "This parameter enables or disables the HTTP metadata endpoint on your instances.",
    ).optional(),
  }).describe("The metadata options for the instances.").optional(),
  InstanceId: z.string().describe(
    "The ID of the Amazon EC2 instance you want to use to create the launch configuration.",
  ).optional(),
  UserData: z.string().max(21847).describe(
    "The Base64-encoded user data to make available to the launched EC2 instances.",
  ).optional(),
  ClassicLinkVPCSecurityGroups: z.array(z.string()).describe(
    "The IDs of one or more security groups for the VPC that you specified in the ClassicLinkVPCId property.",
  ).optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
    "Specifies how block devices are exposed to the instance. You can specify virtual devices and EBS volumes.",
  ).optional(),
  IamInstanceProfile: z.string().describe(
    "Provides the name or the Amazon Resource Name (ARN) of the instance profile associated with the IAM role for the instance. The instance profile contains the IAM role.",
  ).optional(),
  KernelId: z.string().describe(
    "Provides the ID of the kernel associated with the EC2 AMI.",
  ).optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "For Auto Scaling groups that are running in a virtual private cloud (VPC), specifies whether to assign a public IP address to the group's instances.",
  ).optional(),
  ClassicLinkVPCId: z.string().describe(
    "The ID of a ClassicLink-enabled VPC to link your EC2-Classic instances to.",
  ).optional(),
  EbsOptimized: z.boolean().describe(
    "Specifies whether the launch configuration is optimized for EBS I/O (true) or not (false).",
  ).optional(),
  KeyName: z.string().describe("Provides the name of the EC2 key pair.")
    .optional(),
  SpotPrice: z.string().describe(
    "The maximum hourly price you are willing to pay for any Spot Instances launched to fulfill the request.",
  ).optional(),
  ImageId: z.string().describe(
    "Provides the unique ID of the Amazon Machine Image (AMI) that was assigned during registration.",
  ).optional(),
  InstanceType: z.string().describe(
    "Specifies the instance type of the EC2 instance.",
  ).optional(),
  RamDiskId: z.string().describe("The ID of the RAM disk to select.")
    .optional(),
  InstanceMonitoring: z.boolean().describe(
    "Controls whether instances in this group are launched with detailed (true) or basic (false) monitoring.",
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

/** Swamp extension model for AutoScaling LaunchConfiguration. Registered at `@swamp/aws/autoscaling/launch-configuration`. */
export const model = {
  type: "@swamp/aws/autoscaling/launch-configuration",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AutoScaling LaunchConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AutoScaling LaunchConfiguration",
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
          "AWS::AutoScaling::LaunchConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LaunchConfigurationName ?? g.LaunchConfigurationName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a AutoScaling LaunchConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling LaunchConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AutoScaling::LaunchConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.LaunchConfigurationName ??
          context.globalArgs.LaunchConfigurationName)?.toString() ??
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
    delete: {
      description: "Delete a AutoScaling LaunchConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling LaunchConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AutoScaling::LaunchConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.LaunchConfigurationName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync AutoScaling LaunchConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName =
          (g.LaunchConfigurationName?.toString() ?? "current").replace(
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
        const identifier = existing.LaunchConfigurationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AutoScaling::LaunchConfiguration",
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
