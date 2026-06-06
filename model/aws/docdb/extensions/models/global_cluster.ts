// Auto-generated extension model for @swamp/aws/docdb/global-cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DocDB GlobalCluster (AWS::DocDB::GlobalCluster).
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  GlobalClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe("The cluster identifier of the global cluster."),
  SourceDBClusterIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) to use as the primary cluster of the global cluster. You may also choose to instead specify the DBClusterIdentifier. If you provide a value for this parameter, don't specify values for the following settings because Amazon DocumentDB uses the values from the specified source DB cluster: Engine, EngineVersion, StorageEncrypted",
  ).optional(),
  Engine: z.enum(["docdb"]).describe(
    "The database engine to use for this global cluster.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The engine version to use for this global cluster.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Indicates whether the global cluster has deletion protection enabled. The global cluster can't be deleted when deletion protection is enabled.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the global cluster has storage encryption enabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be assigned to the Amazon DocumentDB resource.",
  ).optional(),
});

const StateSchema = z.object({
  GlobalClusterIdentifier: z.string(),
  SourceDBClusterIdentifier: z.string().optional(),
  Engine: z.string().optional(),
  EngineVersion: z.string().optional(),
  DeletionProtection: z.boolean().optional(),
  StorageEncrypted: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  GlobalClusterResourceId: z.string().optional(),
  GlobalClusterArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  GlobalClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe("The cluster identifier of the global cluster.").optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) to use as the primary cluster of the global cluster. You may also choose to instead specify the DBClusterIdentifier. If you provide a value for this parameter, don't specify values for the following settings because Amazon DocumentDB uses the values from the specified source DB cluster: Engine, EngineVersion, StorageEncrypted",
  ).optional(),
  Engine: z.enum(["docdb"]).describe(
    "The database engine to use for this global cluster.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The engine version to use for this global cluster.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Indicates whether the global cluster has deletion protection enabled. The global cluster can't be deleted when deletion protection is enabled.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the global cluster has storage encryption enabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be assigned to the Amazon DocumentDB resource.",
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

/** Swamp extension model for DocDB GlobalCluster. Registered at `@swamp/aws/docdb/global-cluster`. */
export const model = {
  type: "@swamp/aws/docdb/global-cluster",
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
      description: "DocDB GlobalCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DocDB GlobalCluster",
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
          "AWS::DocDB::GlobalCluster",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.GlobalClusterIdentifier ?? g.GlobalClusterIdentifier)
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
      description: "Get a DocDB GlobalCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DocDB GlobalCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DocDB::GlobalCluster",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.GlobalClusterIdentifier ??
          context.globalArgs.GlobalClusterIdentifier)?.toString() ??
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
    update: {
      description: "Update a DocDB GlobalCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName =
          (g.GlobalClusterIdentifier?.toString() ?? "current").replace(
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
        const identifier = existing.GlobalClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DocDB::GlobalCluster",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DocDB::GlobalCluster",
          identifier,
          currentState,
          desiredState,
          [
            "Engine",
            "EngineVersion",
            "GlobalClusterIdentifier",
            "SourceDBClusterIdentifier",
            "StorageEncrypted",
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
      description: "Delete a DocDB GlobalCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DocDB GlobalCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DocDB::GlobalCluster",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.GlobalClusterIdentifier?.toString() ??
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
      description: "Sync DocDB GlobalCluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName =
          (g.GlobalClusterIdentifier?.toString() ?? "current").replace(
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
        const identifier = existing.GlobalClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DocDB::GlobalCluster",
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
