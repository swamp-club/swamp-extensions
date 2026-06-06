// Auto-generated extension model for @swamp/aws/workspacesinstances/volume
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkspacesInstances Volume (AWS::WorkspacesInstances::Volume).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag"),
  Value: z.string().max(256).describe("The value for the tag"),
});

const TagSpecificationSchema = z.object({
  ResourceType: z.enum([
    "instance",
    "volume",
    "spot-instances-request",
    "network-interface",
  ]).optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the resource")
    .optional(),
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
  AvailabilityZone: z.string().regex(
    new RegExp("^[a-z]{2}-[a-z]+-\\d[a-z](-[a-z0-9]+)?$"),
  ).describe("The Availability Zone in which to create the volume"),
  Encrypted: z.boolean().describe(
    "Indicates whether the volume should be encrypted",
  ).optional(),
  Iops: z.number().int().min(0).describe(
    "The number of I/O operations per second (IOPS)",
  ).optional(),
  KmsKeyId: z.string().max(128).describe(
    "The identifier of the AWS Key Management Service (AWS KMS) customer master key (CMK) to use for Amazon EBS encryption",
  ).optional(),
  SizeInGB: z.number().int().min(0).describe("The size of the volume, in GiBs")
    .optional(),
  SnapshotId: z.string().regex(new RegExp("^snap-[0-9a-zA-Z]{1,63}$")).describe(
    "The snapshot from which to create the volume",
  ).optional(),
  Throughput: z.number().int().min(0).describe(
    "The throughput to provision for a volume, with a maximum of 1,000 MiB/s",
  ).optional(),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .describe("The volume type").optional(),
  TagSpecifications: z.array(TagSpecificationSchema).describe(
    "The tags passed to EBS volume",
  ).optional(),
});

const StateSchema = z.object({
  VolumeId: z.string(),
  AvailabilityZone: z.string().optional(),
  Encrypted: z.boolean().optional(),
  Iops: z.number().optional(),
  KmsKeyId: z.string().optional(),
  SizeInGB: z.number().optional(),
  SnapshotId: z.string().optional(),
  Throughput: z.number().optional(),
  VolumeType: z.string().optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AvailabilityZone: z.string().regex(
    new RegExp("^[a-z]{2}-[a-z]+-\\d[a-z](-[a-z0-9]+)?$"),
  ).describe("The Availability Zone in which to create the volume").optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the volume should be encrypted",
  ).optional(),
  Iops: z.number().int().min(0).describe(
    "The number of I/O operations per second (IOPS)",
  ).optional(),
  KmsKeyId: z.string().max(128).describe(
    "The identifier of the AWS Key Management Service (AWS KMS) customer master key (CMK) to use for Amazon EBS encryption",
  ).optional(),
  SizeInGB: z.number().int().min(0).describe("The size of the volume, in GiBs")
    .optional(),
  SnapshotId: z.string().regex(new RegExp("^snap-[0-9a-zA-Z]{1,63}$")).describe(
    "The snapshot from which to create the volume",
  ).optional(),
  Throughput: z.number().int().min(0).describe(
    "The throughput to provision for a volume, with a maximum of 1,000 MiB/s",
  ).optional(),
  VolumeType: z.enum(["standard", "io1", "io2", "gp2", "sc1", "st1", "gp3"])
    .describe("The volume type").optional(),
  TagSpecifications: z.array(TagSpecificationSchema).describe(
    "The tags passed to EBS volume",
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

/** Swamp extension model for WorkspacesInstances Volume. Registered at `@swamp/aws/workspacesinstances/volume`. */
export const model = {
  type: "@swamp/aws/workspacesinstances/volume",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WorkspacesInstances Volume resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkspacesInstances Volume",
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
          "AWS::WorkspacesInstances::Volume",
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
      description: "Get a WorkspacesInstances Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkspacesInstances Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkspacesInstances::Volume",
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
    delete: {
      description: "Delete a WorkspacesInstances Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkspacesInstances Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkspacesInstances::Volume",
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
      description: "Sync WorkspacesInstances Volume state from AWS",
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
        const identifier = existing.VolumeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkspacesInstances::Volume",
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
