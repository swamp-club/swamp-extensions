// Auto-generated extension model for @swamp/aws/redshiftserverless/workgroup
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RedshiftServerless Workgroup (AWS::RedshiftServerless::Workgroup).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const NetworkInterfaceSchema = z.object({
  NetworkInterfaceId: z.string().optional(),
  SubnetId: z.string().optional(),
  PrivateIpAddress: z.string().optional(),
  AvailabilityZone: z.string().optional(),
});

const VpcEndpointSchema = z.object({
  VpcEndpointId: z.string().optional(),
  VpcId: z.string().optional(),
  NetworkInterfaces: z.array(NetworkInterfaceSchema).optional(),
});

const EndpointSchema = z.object({
  VpcEndpoints: z.array(VpcEndpointSchema).optional(),
});

const PerformanceTargetSchema = z.object({
  Level: z.number().int().min(1).max(100).optional(),
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
  PricePerformanceTarget: z.object({
    Level: z.number().int().min(1).max(100).optional(),
  }).describe(
    "A property that represents the price performance target settings for the workgroup.",
  ).optional(),
  SnapshotArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the snapshot to restore from.",
  ).optional(),
  SnapshotName: z.string().describe("The snapshot name to restore from.")
    .optional(),
  SnapshotOwnerAccount: z.string().describe(
    "The Amazon Web Services account that owns the snapshot.",
  ).optional(),
  RecoveryPointId: z.string().describe("The recovery point id to restore from.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "The map of the key-value pairs used to tag the workgroup.",
  ).optional(),
  Workgroup: z.object({
    Endpoint: EndpointSchema.optional(),
    PricePerformanceTarget: PerformanceTargetSchema.optional(),
  }).describe("Definition for workgroup resource").optional(),
});

const StateSchema = z.object({
  WorkgroupName: z.string(),
  NamespaceName: z.string().optional(),
  BaseCapacity: z.number().optional(),
  MaxCapacity: z.number().optional(),
  EnhancedVpcRouting: z.boolean().optional(),
  ConfigParameters: z.array(z.object({
    ParameterKey: z.string(),
    ParameterValue: z.string(),
  })).optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  PubliclyAccessible: z.boolean().optional(),
  Port: z.number().optional(),
  PricePerformanceTarget: PerformanceTargetSchema.optional(),
  SnapshotArn: z.string().optional(),
  SnapshotName: z.string().optional(),
  SnapshotOwnerAccount: z.string().optional(),
  RecoveryPointId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TrackName: z.string().optional(),
  Workgroup: z.object({
    WorkgroupId: z.string(),
    WorkgroupArn: z.string(),
    WorkgroupName: z.string(),
    NamespaceName: z.string(),
    BaseCapacity: z.number(),
    MaxCapacity: z.number(),
    EnhancedVpcRouting: z.boolean(),
    ConfigParameters: z.array(z.object({
      ParameterKey: z.string(),
      ParameterValue: z.string(),
    })),
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
    Status: z.string(),
    Endpoint: EndpointSchema,
    PubliclyAccessible: z.boolean(),
    CreationDate: z.string(),
    PricePerformanceTarget: PerformanceTargetSchema,
    TrackName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  PricePerformanceTarget: z.object({
    Level: z.number().int().min(1).max(100).optional(),
  }).describe(
    "A property that represents the price performance target settings for the workgroup.",
  ).optional(),
  SnapshotArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the snapshot to restore from.",
  ).optional(),
  SnapshotName: z.string().describe("The snapshot name to restore from.")
    .optional(),
  SnapshotOwnerAccount: z.string().describe(
    "The Amazon Web Services account that owns the snapshot.",
  ).optional(),
  RecoveryPointId: z.string().describe("The recovery point id to restore from.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "The map of the key-value pairs used to tag the workgroup.",
  ).optional(),
  Workgroup: z.object({
    Endpoint: EndpointSchema.optional(),
    PricePerformanceTarget: PerformanceTargetSchema.optional(),
  }).describe("Definition for workgroup resource").optional(),
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

/** Swamp extension model for RedshiftServerless Workgroup. Registered at `@swamp/aws/redshiftserverless/workgroup`. */
export const model = {
  type: "@swamp/aws/redshiftserverless/workgroup",
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
      description: "RedshiftServerless Workgroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RedshiftServerless Workgroup",
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
          "AWS::RedshiftServerless::Workgroup",
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
      description: "Get a RedshiftServerless Workgroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RedshiftServerless Workgroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RedshiftServerless::Workgroup",
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
      description: "Update a RedshiftServerless Workgroup",
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
        const identifier = existing.WorkgroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RedshiftServerless::Workgroup",
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
          "AWS::RedshiftServerless::Workgroup",
          identifier,
          currentState,
          desiredState,
          ["WorkgroupName", "NamespaceName"],
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
      description: "Delete a RedshiftServerless Workgroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RedshiftServerless Workgroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RedshiftServerless::Workgroup",
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
      description: "Sync RedshiftServerless Workgroup state from AWS",
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
        const identifier = existing.WorkgroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RedshiftServerless::Workgroup",
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
