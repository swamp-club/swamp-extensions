// Auto-generated extension model for @swamp/aws/opensearchserverless/collection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for OpenSearchServerless Collection (AWS::OpenSearchServerless::Collection).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key in the key-value pair"),
  Value: z.string().min(0).max(256).describe("The value in the key-value pair"),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().max(1000).describe(
    "The description of the collection",
  ).optional(),
  Name: z.string().min(3).max(64).regex(new RegExp("^[a-z][a-z0-9-]{2,63}$"))
    .describe(
      "The name of the collection. The name must meet the following criteria: Unique to your account and AWS Region Starts with a lowercase letter Contains only lowercase letters a-z, the numbers 0-9 and the hyphen (-) Contains between 3 and 64 characters",
    ),
  Tags: z.array(TagSchema).describe("List of tags to be added to the resource")
    .optional(),
  Type: z.enum(["SEARCH", "TIMESERIES", "VECTORSEARCH"]).describe(
    "The possible types for the collection",
  ).optional(),
  StandbyReplicas: z.enum(["ENABLED", "DISABLED"]).describe(
    "The possible standby replicas for the collection",
  ).optional(),
  DeletionProtection: z.enum(["ENABLED", "DISABLED"]).describe(
    "The deletion protection state of the collection",
  ).optional(),
  CollectionGroupName: z.string().describe(
    "The name of the collection group to associate with the collection.",
  ).optional(),
  EncryptionConfig: z.object({
    AWSOwnedKey: z.boolean().describe(
      "Indicates whether to use an AWS owned key for encryption.",
    ).optional(),
  }).describe("Encryption settings for the collection").optional(),
  VectorOptions: z.object({
    ServerlessVectorAcceleration: z.enum(["ENABLED", "DISABLED", "ALLOWED"])
      .describe(
        "Indicates whether GPU acceleration is enabled for vector indexing",
      ).optional(),
  }).describe("Vector search configuration options for the collection")
    .optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Id: z.string(),
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  CollectionEndpoint: z.string().optional(),
  DashboardEndpoint: z.string().optional(),
  Type: z.string().optional(),
  StandbyReplicas: z.string().optional(),
  DeletionProtection: z.string().optional(),
  CollectionGroupName: z.string().optional(),
  EncryptionConfig: z.object({
    AWSOwnedKey: z.boolean(),
    KmsKeyArn: z.string(),
  }).optional(),
  VectorOptions: z.object({
    ServerlessVectorAcceleration: z.string(),
  }).optional(),
  KmsKeyArn: z.string().optional(),
  FipsEndpoints: z.object({
    CollectionEndpoint: z.string(),
    DashboardEndpoint: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().max(1000).describe(
    "The description of the collection",
  ).optional(),
  Name: z.string().min(3).max(64).regex(new RegExp("^[a-z][a-z0-9-]{2,63}$"))
    .describe(
      "The name of the collection. The name must meet the following criteria: Unique to your account and AWS Region Starts with a lowercase letter Contains only lowercase letters a-z, the numbers 0-9 and the hyphen (-) Contains between 3 and 64 characters",
    ).optional(),
  Tags: z.array(TagSchema).describe("List of tags to be added to the resource")
    .optional(),
  Type: z.enum(["SEARCH", "TIMESERIES", "VECTORSEARCH"]).describe(
    "The possible types for the collection",
  ).optional(),
  StandbyReplicas: z.enum(["ENABLED", "DISABLED"]).describe(
    "The possible standby replicas for the collection",
  ).optional(),
  DeletionProtection: z.enum(["ENABLED", "DISABLED"]).describe(
    "The deletion protection state of the collection",
  ).optional(),
  CollectionGroupName: z.string().describe(
    "The name of the collection group to associate with the collection.",
  ).optional(),
  EncryptionConfig: z.object({
    AWSOwnedKey: z.boolean().describe(
      "Indicates whether to use an AWS owned key for encryption.",
    ).optional(),
  }).describe("Encryption settings for the collection").optional(),
  VectorOptions: z.object({
    ServerlessVectorAcceleration: z.enum(["ENABLED", "DISABLED", "ALLOWED"])
      .describe(
        "Indicates whether GPU acceleration is enabled for vector indexing",
      ).optional(),
  }).describe("Vector search configuration options for the collection")
    .optional(),
});

/** Swamp extension model for OpenSearchServerless Collection. Registered at `@swamp/aws/opensearchserverless/collection`. */
export const model = {
  type: "@swamp/aws/opensearchserverless/collection",
  version: "2026.06.04.1",
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
      toVersion: "2026.04.20.1",
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
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Added: DeletionProtection",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "OpenSearchServerless Collection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchServerless Collection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::OpenSearchServerless::Collection",
          desiredState,
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
      description: "Get a OpenSearchServerless Collection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless Collection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::OpenSearchServerless::Collection",
          args.identifier,
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
      description: "Update a OpenSearchServerless Collection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::OpenSearchServerless::Collection",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchServerless::Collection",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Tags",
            "Type",
            "StandbyReplicas",
            "CollectionGroupName",
            "EncryptionConfig",
          ],
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
      description: "Delete a OpenSearchServerless Collection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless Collection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::OpenSearchServerless::Collection",
          args.identifier,
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
      description: "Sync OpenSearchServerless Collection state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::OpenSearchServerless::Collection",
            identifier,
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
