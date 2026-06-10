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

// Auto-generated extension model for @swamp/aws/deadline/fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Deadline Fleet (AWS::Deadline::Fleet).
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

const FleetAmountCapabilitySchema = z.object({
  Name: z.string().min(1).max(100).regex(
    new RegExp(
      "^([a-zA-Z][a-zA-Z0-9]{0,63}:)?amount(\\.[a-zA-Z][a-zA-Z0-9]{0,63})+$",
    ),
  ),
  Min: z.number(),
  Max: z.number().optional(),
});

const FleetAttributeCapabilitySchema = z.object({
  Name: z.string().min(1).max(100).regex(
    new RegExp(
      "^([a-zA-Z][a-zA-Z0-9]{0,63}:)?attr(\\.[a-zA-Z][a-zA-Z0-9]{0,63})+$",
    ),
  ),
  Values: z.array(
    z.string().min(1).max(100).regex(
      new RegExp("^[a-zA-Z_]([a-zA-Z0-9_\\-]{0,99})$"),
    ),
  ),
});

const CustomerManagedAutoScalingConfigurationSchema = z.object({
  StandbyWorkerCount: z.number().int().min(0).max(2147483647).optional(),
  WorkerIdleDurationSeconds: z.number().int().min(0).max(2147483647).optional(),
  ScaleOutWorkersPerMinute: z.number().int().min(1).max(2147483647).optional(),
});

const VCpuCountRangeSchema = z.object({
  Min: z.number().int().min(1).max(10000),
  Max: z.number().int().min(1).max(10000).optional(),
});

const MemoryMiBRangeSchema = z.object({
  Min: z.number().int().min(512).max(2147483647),
  Max: z.number().int().min(512).max(2147483647).optional(),
});

const AcceleratorCountRangeSchema = z.object({
  Min: z.number().int().min(0).max(2147483647),
  Max: z.number().int().min(0).max(2147483647).optional(),
});

const AcceleratorTotalMemoryMiBRangeSchema = z.object({
  Min: z.number().int().min(0).max(2147483647),
  Max: z.number().int().min(0).max(2147483647).optional(),
});

const CustomerManagedWorkerCapabilitiesSchema = z.object({
  VCpuCount: VCpuCountRangeSchema,
  MemoryMiB: MemoryMiBRangeSchema,
  AcceleratorTypes: z.array(z.enum(["gpu"])).optional(),
  AcceleratorCount: AcceleratorCountRangeSchema.optional(),
  AcceleratorTotalMemoryMiB: AcceleratorTotalMemoryMiBRangeSchema.optional(),
  OsFamily: z.enum(["WINDOWS", "LINUX", "MACOS"]),
  CpuArchitectureType: z.enum(["x86_64", "arm64"]),
  CustomAmounts: z.array(FleetAmountCapabilitySchema).optional(),
  CustomAttributes: z.array(FleetAttributeCapabilitySchema).optional(),
});

const CustomerManagedFleetConfigurationSchema = z.object({
  Mode: z.enum(["NO_SCALING", "EVENT_BASED_AUTO_SCALING"]),
  AutoScalingConfiguration: CustomerManagedAutoScalingConfigurationSchema
    .optional(),
  WorkerCapabilities: CustomerManagedWorkerCapabilitiesSchema,
  StorageProfileId: z.string().regex(new RegExp("^sp-[0-9a-f]{32}$"))
    .optional(),
  TagPropagationMode: z.enum([
    "NO_PROPAGATION",
    "PROPAGATE_TAGS_TO_WORKERS_AT_LAUNCH",
  ]).optional(),
});

const Ec2EbsVolumeSchema = z.object({
  SizeGiB: z.number().int().optional(),
  Iops: z.number().int().min(3000).max(16000).optional(),
  ThroughputMiB: z.number().int().min(125).max(1000).optional(),
});

const AcceleratorSelectionSchema = z.object({
  Name: z.enum(["t4", "a10g", "l4", "l40s", "rtx-pro-server-6000"]),
  Runtime: z.string().min(1).max(100).optional(),
});

const AcceleratorCapabilitiesSchema = z.object({
  Selections: z.array(AcceleratorSelectionSchema),
  Count: AcceleratorCountRangeSchema.optional(),
});

const ServiceManagedEc2InstanceCapabilitiesSchema = z.object({
  VCpuCount: VCpuCountRangeSchema,
  MemoryMiB: MemoryMiBRangeSchema,
  OsFamily: z.enum(["LINUX", "WINDOWS"]),
  CpuArchitectureType: z.enum(["x86_64", "arm64"]),
  RootEbsVolume: Ec2EbsVolumeSchema.optional(),
  AcceleratorCapabilities: AcceleratorCapabilitiesSchema.optional(),
  AllowedInstanceTypes: z.array(z.string().min(1).max(100)).optional(),
  ExcludedInstanceTypes: z.array(z.string().min(1).max(100)).optional(),
  CustomAmounts: z.array(FleetAmountCapabilitySchema).optional(),
  CustomAttributes: z.array(FleetAttributeCapabilitySchema).optional(),
});

const ServiceManagedEc2InstanceMarketOptionsSchema = z.object({
  Type: z.enum(["on-demand", "spot", "wait-and-save"]),
});

const VpcConfigurationSchema = z.object({
  ResourceConfigurationArns: z.array(z.string().min(1).max(2048)).optional(),
});

const PersistentVolumeConfigurationSchema = z.object({
  SizeGiB: z.number().int().min(1).max(65536).optional(),
  Iops: z.number().int().min(100).max(80000).optional(),
  ThroughputMiB: z.number().int().min(125).max(2000).optional(),
  MountPath: z.string().min(1).max(255),
  LastUsedTtlHours: z.number().int().min(1).max(8760).optional(),
});

const ServiceManagedEc2AutoScalingConfigurationSchema = z.object({
  StandbyWorkerCount: z.number().int().min(0).max(2147483647).optional(),
  WorkerIdleDurationSeconds: z.number().int().min(0).max(86400).optional(),
  ScaleOutWorkersPerMinute: z.number().int().min(1).max(2147483647).optional(),
});

const ServiceManagedEc2FleetConfigurationSchema = z.object({
  InstanceCapabilities: ServiceManagedEc2InstanceCapabilitiesSchema,
  InstanceMarketOptions: ServiceManagedEc2InstanceMarketOptionsSchema,
  VpcConfiguration: VpcConfigurationSchema.optional(),
  StorageProfileId: z.string().regex(new RegExp("^sp-[0-9a-f]{32}$"))
    .optional(),
  PersistentVolumeConfiguration: PersistentVolumeConfigurationSchema.optional(),
  AutoScalingConfiguration: ServiceManagedEc2AutoScalingConfigurationSchema
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(1).max(255).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  Capabilities: z.object({
    Amounts: z.array(FleetAmountCapabilitySchema).optional(),
    Attributes: z.array(FleetAttributeCapabilitySchema).optional(),
  }).optional(),
  Configuration: z.object({
    CustomerManaged: CustomerManagedFleetConfigurationSchema.optional(),
    ServiceManagedEc2: ServiceManagedEc2FleetConfigurationSchema.optional(),
  }),
  Description: z.string().min(0).max(100).optional(),
  DisplayName: z.string().min(1).max(100),
  FarmId: z.string().regex(new RegExp("^farm-[0-9a-f]{32}$")),
  HostConfiguration: z.object({
    ScriptBody: z.string().min(0).max(15000),
    ScriptTimeoutSeconds: z.number().int().min(300).max(3600).optional(),
  }).optional(),
  MaxWorkerCount: z.number().int().min(0).max(2147483647),
  MinWorkerCount: z.number().int().min(0).max(2147483647).optional(),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):iam::\\d{12}:role(/[!-.0-~]+)*/[\\w+=,.@-]+$",
    ),
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Capabilities: z.object({
    Amounts: z.array(FleetAmountCapabilitySchema),
    Attributes: z.array(FleetAttributeCapabilitySchema),
  }).optional(),
  Configuration: z.object({
    CustomerManaged: CustomerManagedFleetConfigurationSchema,
    ServiceManagedEc2: ServiceManagedEc2FleetConfigurationSchema,
  }).optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  FarmId: z.string().optional(),
  FleetId: z.string().optional(),
  HostConfiguration: z.object({
    ScriptBody: z.string(),
    ScriptTimeoutSeconds: z.number(),
  }).optional(),
  MaxWorkerCount: z.number().optional(),
  MinWorkerCount: z.number().optional(),
  RoleArn: z.string().optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  WorkerCount: z.number().optional(),
  Arn: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Capabilities: z.object({
    Amounts: z.array(FleetAmountCapabilitySchema).optional(),
    Attributes: z.array(FleetAttributeCapabilitySchema).optional(),
  }).optional(),
  Configuration: z.object({
    CustomerManaged: CustomerManagedFleetConfigurationSchema.optional(),
    ServiceManagedEc2: ServiceManagedEc2FleetConfigurationSchema.optional(),
  }).optional(),
  Description: z.string().min(0).max(100).optional(),
  DisplayName: z.string().min(1).max(100).optional(),
  FarmId: z.string().regex(new RegExp("^farm-[0-9a-f]{32}$")).optional(),
  HostConfiguration: z.object({
    ScriptBody: z.string().min(0).max(15000).optional(),
    ScriptTimeoutSeconds: z.number().int().min(300).max(3600).optional(),
  }).optional(),
  MaxWorkerCount: z.number().int().min(0).max(2147483647).optional(),
  MinWorkerCount: z.number().int().min(0).max(2147483647).optional(),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):iam::\\d{12}:role(/[!-.0-~]+)*/[\\w+=,.@-]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Deadline Fleet. Registered at `@swamp/aws/deadline/fleet`. */
export const model = {
  type: "@swamp/aws/deadline/fleet",
  version: "2026.06.10.1",
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
      toVersion: "2026.05.05.1",
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
      toVersion: "2026.06.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Deadline Fleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Deadline Fleet",
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
          "AWS::Deadline::Fleet",
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
      description: "Get a Deadline Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Deadline Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Deadline::Fleet",
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
      description: "Update a Deadline Fleet",
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
          "AWS::Deadline::Fleet",
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
          "AWS::Deadline::Fleet",
          identifier,
          currentState,
          desiredState,
          ["FarmId"],
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
      description: "Delete a Deadline Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Deadline Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Deadline::Fleet",
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
      description: "Sync Deadline Fleet state from AWS",
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
            "AWS::Deadline::Fleet",
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
