// Auto-generated extension model for @swamp/aws/opensearchserverless/collection-index
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for OpenSearchServerless CollectionIndex (AWS::OpenSearchServerless::CollectionIndex).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Id: z.string().min(3).max(40).regex(new RegExp("^[a-z0-9]{3,40}$")).describe(
    "The identifier of the collection",
  ),
  IndexName: z.string().min(1).max(255).regex(
    new RegExp("^(?![_-])[a-z][a-z0-9_-]*$"),
  ).describe("The name of the collection index"),
  IndexSchema: z.string().min(1).max(2480).regex(
    new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+"),
  ).describe("The Mappings for the collection index").optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  IndexName: z.string(),
  IndexSchema: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Id: z.string().min(3).max(40).regex(new RegExp("^[a-z0-9]{3,40}$")).describe(
    "The identifier of the collection",
  ).optional(),
  IndexName: z.string().min(1).max(255).regex(
    new RegExp("^(?![_-])[a-z][a-z0-9_-]*$"),
  ).describe("The name of the collection index").optional(),
  IndexSchema: z.string().min(1).max(2480).regex(
    new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+"),
  ).describe("The Mappings for the collection index").optional(),
});

/** Swamp extension model for OpenSearchServerless CollectionIndex. Registered at `@swamp/aws/opensearchserverless/collection-index`. */
export const model = {
  type: "@swamp/aws/opensearchserverless/collection-index",
  version: "2026.05.31.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "OpenSearchServerless CollectionIndex resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchServerless CollectionIndex",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::OpenSearchServerless::CollectionIndex",
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
      description: "Get a OpenSearchServerless CollectionIndex",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless CollectionIndex",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::OpenSearchServerless::CollectionIndex",
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
      description: "Update a OpenSearchServerless CollectionIndex",
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
        const idParts = [
          existing.Id?.toString(),
          existing.IndexName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::OpenSearchServerless::CollectionIndex",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchServerless::CollectionIndex",
          identifier,
          currentState,
          desiredState,
          ["Id", "IndexName"],
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
      description: "Delete a OpenSearchServerless CollectionIndex",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless CollectionIndex",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::OpenSearchServerless::CollectionIndex",
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
      description: "Sync OpenSearchServerless CollectionIndex state from AWS",
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
        const idParts = [
          existing.Id?.toString(),
          existing.IndexName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::OpenSearchServerless::CollectionIndex",
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
