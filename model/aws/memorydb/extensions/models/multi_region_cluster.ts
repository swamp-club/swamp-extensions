// Auto-generated extension model for @swamp/aws/memorydb/multi-region-cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MemoryDB MultiRegionCluster (AWS::MemoryDB::MultiRegionCluster).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)(?!memorydb:)[a-zA-Z0-9 _\\.\\/=+:\\-@]{1,128}$"),
  ).describe("The key for the tag. May not be null."),
  Value: z.string().min(1).max(256).regex(
    new RegExp("^(?!aws:)(?!memorydb:)[a-zA-Z0-9 _\\.\\/=+:\\-@]{1,256}$"),
  ).describe("The tag's value. May be null."),
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
  MultiRegionClusterNameSuffix: z.string().regex(
    new RegExp("[a-z][a-z0-9\\-]*"),
  ).describe(
    "The name of the Multi Region cluster. This value must be unique as it also serves as the multi region cluster identifier.",
  ).optional(),
  Description: z.string().describe("Description of the multi region cluster.")
    .optional(),
  NodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the multi region cluster.",
  ),
  NumShards: z.number().int().describe(
    "The number of shards the multi region cluster will contain.",
  ).optional(),
  MultiRegionParameterGroupName: z.string().describe(
    "The name of the parameter group associated with the multi region cluster.",
  ).optional(),
  TLSEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true. You cannot modify the value of TransitEncryptionEnabled after the cluster is created. To enable in-transit encryption on a cluster you must set TransitEncryptionEnabled to true when you create a cluster.",
  ).optional(),
  Engine: z.string().describe(
    "The engine type used by the multi region cluster.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The Redis engine version used by the multi region cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this multi region cluster.",
  ).optional(),
  UpdateStrategy: z.enum(["COORDINATED", "UNCOORDINATED"]).describe(
    "An enum string value that determines the update strategy for scaling. Possible values are 'COORDINATED' and 'UNCOORDINATED'. Default is 'COORDINATED'.",
  ).optional(),
});

const StateSchema = z.object({
  MultiRegionClusterNameSuffix: z.string().optional(),
  Description: z.string().optional(),
  MultiRegionClusterName: z.string(),
  Status: z.string().optional(),
  NodeType: z.string().optional(),
  NumShards: z.number().optional(),
  MultiRegionParameterGroupName: z.string().optional(),
  TLSEnabled: z.boolean().optional(),
  ARN: z.string().optional(),
  Engine: z.string().optional(),
  EngineVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UpdateStrategy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MultiRegionClusterNameSuffix: z.string().regex(
    new RegExp("[a-z][a-z0-9\\-]*"),
  ).describe(
    "The name of the Multi Region cluster. This value must be unique as it also serves as the multi region cluster identifier.",
  ).optional(),
  Description: z.string().describe("Description of the multi region cluster.")
    .optional(),
  NodeType: z.string().describe(
    "The compute and memory capacity of the nodes in the multi region cluster.",
  ).optional(),
  NumShards: z.number().int().describe(
    "The number of shards the multi region cluster will contain.",
  ).optional(),
  MultiRegionParameterGroupName: z.string().describe(
    "The name of the parameter group associated with the multi region cluster.",
  ).optional(),
  TLSEnabled: z.boolean().describe(
    "A flag that enables in-transit encryption when set to true. You cannot modify the value of TransitEncryptionEnabled after the cluster is created. To enable in-transit encryption on a cluster you must set TransitEncryptionEnabled to true when you create a cluster.",
  ).optional(),
  Engine: z.string().describe(
    "The engine type used by the multi region cluster.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The Redis engine version used by the multi region cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this multi region cluster.",
  ).optional(),
  UpdateStrategy: z.enum(["COORDINATED", "UNCOORDINATED"]).describe(
    "An enum string value that determines the update strategy for scaling. Possible values are 'COORDINATED' and 'UNCOORDINATED'. Default is 'COORDINATED'.",
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

/** Swamp extension model for MemoryDB MultiRegionCluster. Registered at `@swamp/aws/memorydb/multi-region-cluster`. */
export const model = {
  type: "@swamp/aws/memorydb/multi-region-cluster",
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
      description: "MemoryDB MultiRegionCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MemoryDB MultiRegionCluster",
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
          "AWS::MemoryDB::MultiRegionCluster",
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
      description: "Get a MemoryDB MultiRegionCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MemoryDB MultiRegionCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MemoryDB::MultiRegionCluster",
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
      description: "Update a MemoryDB MultiRegionCluster",
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
        const identifier = existing.MultiRegionClusterName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MemoryDB::MultiRegionCluster",
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
          "AWS::MemoryDB::MultiRegionCluster",
          identifier,
          currentState,
          desiredState,
          [
            "MultiRegionClusterNameSuffix",
            "EngineVersion",
            "MultiRegionParameterGroupName",
            "TLSEnabled",
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
      description: "Delete a MemoryDB MultiRegionCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MemoryDB MultiRegionCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MemoryDB::MultiRegionCluster",
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
      description: "Sync MemoryDB MultiRegionCluster state from AWS",
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
        const identifier = existing.MultiRegionClusterName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MemoryDB::MultiRegionCluster",
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
