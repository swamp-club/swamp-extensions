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

// Auto-generated extension model for @swamp/aws/workspacesinstances/workspace-instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkspacesInstances WorkspaceInstance (AWS::WorkspacesInstances::WorkspaceInstance).
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
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .optional(),
  Encrypted: z.boolean().optional(),
  KmsKeyId: z.string().max(128).optional(),
  Iops: z.number().int().min(0).optional(),
  Throughput: z.number().int().min(0).optional(),
  VolumeSize: z.number().int().min(0).optional(),
});

const BlockDeviceMappingSchema = z.object({
  DeviceName: z.string().max(32).optional(),
  Ebs: EbsBlockDeviceSchema.optional(),
  NoDevice: z.string().max(32).optional(),
  VirtualName: z.string().regex(new RegExp("^ephemeral(0|[1-9][0-9]{0,2})$"))
    .optional(),
});

const CapacityReservationTargetSchema = z.object({
  CapacityReservationId: z.string().max(128).optional(),
  CapacityReservationResourceGroupArn: z.string().regex(new RegExp("^arn:.*"))
    .optional(),
});

const CapacityReservationSpecificationSchema = z.object({
  CapacityReservationPreference: z.enum([
    "capacity-reservations-only",
    "open",
    "none",
  ]).optional(),
  CapacityReservationTarget: CapacityReservationTargetSchema.optional(),
});

const CpuOptionsRequestSchema = z.object({
  CoreCount: z.number().int().min(0).optional(),
  ThreadsPerCore: z.number().int().min(0).optional(),
});

const CreditSpecificationRequestSchema = z.object({
  CpuCredits: z.enum(["standard", "unlimited"]).optional(),
});

const EnclaveOptionsRequestSchema = z.object({
  Enabled: z.boolean().optional(),
});

const HibernationOptionsRequestSchema = z.object({
  Configured: z.boolean().optional(),
});

const IamInstanceProfileSpecificationSchema = z.object({
  Arn: z.string().max(2048).regex(new RegExp("^arn:.*")).optional(),
  Name: z.string().max(64).optional(),
});

const LicenseConfigurationRequestSchema = z.object({
  LicenseConfigurationArn: z.string().regex(new RegExp("^arn:.*")).optional(),
});

const InstanceMaintenanceOptionsRequestSchema = z.object({
  AutoRecovery: z.enum(["disabled", "default"]).optional(),
});

const InstanceMetadataOptionsRequestSchema = z.object({
  HttpEndpoint: z.enum(["enabled", "disabled"]).optional(),
  HttpProtocolIpv6: z.enum(["enabled", "disabled"]).optional(),
  HttpPutResponseHopLimit: z.number().int().min(1).max(64).optional(),
  HttpTokens: z.enum(["optional", "required"]).optional(),
  InstanceMetadataTags: z.enum(["enabled", "disabled"]).optional(),
});

const RunInstancesMonitoringEnabledSchema = z.object({
  Enabled: z.boolean().optional(),
});

const InstanceNetworkInterfaceSpecificationSchema = z.object({
  Description: z.string().max(1000).regex(new RegExp("^[\\S\\s]*$")).optional(),
  DeviceIndex: z.number().int().min(0).optional(),
  Groups: z.array(z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{1,63}$")))
    .optional(),
  SubnetId: z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{1,63}$"))
    .optional(),
});

const InstanceNetworkPerformanceOptionsRequestSchema = z.object({
  BandwidthWeighting: z.enum(["default", "vpc-1", "ebs-1"]).optional(),
});

const PlacementSchema = z.object({
  AvailabilityZone: z.string().regex(
    new RegExp("^[a-z]{2}-[a-z]+-\\d[a-z](-[a-z0-9]+)?$"),
  ).optional(),
  GroupId: z.string().regex(new RegExp("^pg-[0-9a-zA-Z]{1,63}$")).optional(),
  GroupName: z.string().max(255).optional(),
  PartitionNumber: z.number().int().optional(),
  Tenancy: z.enum(["default", "dedicated", "host"]).optional(),
});

const PrivateDnsNameOptionsRequestSchema = z.object({
  HostnameType: z.enum(["ip-name", "resource-name"]).optional(),
  EnableResourceNameDnsARecord: z.boolean().optional(),
  EnableResourceNameDnsAAAARecord: z.boolean().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256).optional(),
});

const TagSpecificationSchema = z.object({
  ResourceType: z.enum([
    "instance",
    "volume",
    "spot-instances-request",
    "network-interface",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
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
  ManagedInstance: z.object({
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema
      .optional(),
    CpuOptions: CpuOptionsRequestSchema.optional(),
    CreditSpecification: CreditSpecificationRequestSchema.optional(),
    DisableApiStop: z.boolean().optional(),
    EbsOptimized: z.boolean().optional(),
    EnablePrimaryIpv6: z.boolean().optional(),
    EnclaveOptions: EnclaveOptionsRequestSchema.optional(),
    HibernationOptions: HibernationOptionsRequestSchema.optional(),
    IamInstanceProfile: IamInstanceProfileSpecificationSchema.optional(),
    ImageId: z.string().regex(new RegExp("^ami-[0-9a-zA-Z]{1,63}$")),
    InstanceType: z.string().regex(new RegExp("^([a-z0-9-]+)\\.([a-z0-9]+)$")),
    Ipv6AddressCount: z.number().int().min(0).optional(),
    KeyName: z.string().max(64).optional(),
    LicenseSpecifications: z.array(LicenseConfigurationRequestSchema)
      .optional(),
    MaintenanceOptions: InstanceMaintenanceOptionsRequestSchema.optional(),
    MetadataOptions: InstanceMetadataOptionsRequestSchema.optional(),
    Monitoring: RunInstancesMonitoringEnabledSchema.optional(),
    NetworkInterfaces: z.array(InstanceNetworkInterfaceSpecificationSchema)
      .optional(),
    NetworkPerformanceOptions: InstanceNetworkPerformanceOptionsRequestSchema
      .optional(),
    Placement: PlacementSchema.optional(),
    PrivateDnsNameOptions: PrivateDnsNameOptionsRequestSchema.optional(),
    SubnetId: z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{1,63}$"))
      .optional(),
    TagSpecifications: z.array(TagSpecificationSchema).optional(),
    UserData: z.string().max(16000).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ManagedInstance: z.object({
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema,
    CpuOptions: CpuOptionsRequestSchema,
    CreditSpecification: CreditSpecificationRequestSchema,
    DisableApiStop: z.boolean(),
    EbsOptimized: z.boolean(),
    EnablePrimaryIpv6: z.boolean(),
    EnclaveOptions: EnclaveOptionsRequestSchema,
    HibernationOptions: HibernationOptionsRequestSchema,
    IamInstanceProfile: IamInstanceProfileSpecificationSchema,
    ImageId: z.string(),
    InstanceType: z.string(),
    Ipv6AddressCount: z.number(),
    KeyName: z.string(),
    LicenseSpecifications: z.array(LicenseConfigurationRequestSchema),
    MaintenanceOptions: InstanceMaintenanceOptionsRequestSchema,
    MetadataOptions: InstanceMetadataOptionsRequestSchema,
    Monitoring: RunInstancesMonitoringEnabledSchema,
    NetworkInterfaces: z.array(InstanceNetworkInterfaceSpecificationSchema),
    NetworkPerformanceOptions: InstanceNetworkPerformanceOptionsRequestSchema,
    Placement: PlacementSchema,
    PrivateDnsNameOptions: PrivateDnsNameOptionsRequestSchema,
    SubnetId: z.string(),
    TagSpecifications: z.array(TagSpecificationSchema),
    UserData: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  WorkspaceInstanceId: z.string(),
  ProvisionState: z.string().optional(),
  EC2ManagedInstance: z.object({
    InstanceId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ManagedInstance: z.object({
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema
      .optional(),
    CpuOptions: CpuOptionsRequestSchema.optional(),
    CreditSpecification: CreditSpecificationRequestSchema.optional(),
    DisableApiStop: z.boolean().optional(),
    EbsOptimized: z.boolean().optional(),
    EnablePrimaryIpv6: z.boolean().optional(),
    EnclaveOptions: EnclaveOptionsRequestSchema.optional(),
    HibernationOptions: HibernationOptionsRequestSchema.optional(),
    IamInstanceProfile: IamInstanceProfileSpecificationSchema.optional(),
    ImageId: z.string().regex(new RegExp("^ami-[0-9a-zA-Z]{1,63}$")).optional(),
    InstanceType: z.string().regex(new RegExp("^([a-z0-9-]+)\\.([a-z0-9]+)$"))
      .optional(),
    Ipv6AddressCount: z.number().int().min(0).optional(),
    KeyName: z.string().max(64).optional(),
    LicenseSpecifications: z.array(LicenseConfigurationRequestSchema)
      .optional(),
    MaintenanceOptions: InstanceMaintenanceOptionsRequestSchema.optional(),
    MetadataOptions: InstanceMetadataOptionsRequestSchema.optional(),
    Monitoring: RunInstancesMonitoringEnabledSchema.optional(),
    NetworkInterfaces: z.array(InstanceNetworkInterfaceSpecificationSchema)
      .optional(),
    NetworkPerformanceOptions: InstanceNetworkPerformanceOptionsRequestSchema
      .optional(),
    Placement: PlacementSchema.optional(),
    PrivateDnsNameOptions: PrivateDnsNameOptionsRequestSchema.optional(),
    SubnetId: z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{1,63}$"))
      .optional(),
    TagSpecifications: z.array(TagSpecificationSchema).optional(),
    UserData: z.string().max(16000).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for WorkspacesInstances WorkspaceInstance. Registered at `@swamp/aws/workspacesinstances/workspace-instance`. */
export const model = {
  type: "@swamp/aws/workspacesinstances/workspace-instance",
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
      description: "WorkspacesInstances WorkspaceInstance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkspacesInstances WorkspaceInstance",
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
          "AWS::WorkspacesInstances::WorkspaceInstance",
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
      description: "Get a WorkspacesInstances WorkspaceInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkspacesInstances WorkspaceInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkspacesInstances::WorkspaceInstance",
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
      description: "Update a WorkspacesInstances WorkspaceInstance",
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
        const identifier = existing.WorkspaceInstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkspacesInstances::WorkspaceInstance",
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
          "AWS::WorkspacesInstances::WorkspaceInstance",
          identifier,
          currentState,
          desiredState,
          ["ManagedInstance"],
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
      description: "Delete a WorkspacesInstances WorkspaceInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkspacesInstances WorkspaceInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkspacesInstances::WorkspaceInstance",
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
      description: "Sync WorkspacesInstances WorkspaceInstance state from AWS",
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
        const identifier = existing.WorkspaceInstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkspacesInstances::WorkspaceInstance",
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
