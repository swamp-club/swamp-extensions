// Auto-generated extension model for @swamp/gcp/gmail/users-threads
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Threads.
 *
 * A collection of messages representing a conversation.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.threads.get",
  "path": "gmail/v1/users/{userId}/threads/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "id",
  ],
  "parameters": {
    "format": {
      "location": "query",
    },
    "id": {
      "location": "path",
      "required": true,
    },
    "metadataHeaders": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gmail.users.threads.delete",
  "path": "gmail/v1/users/{userId}/threads/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  historyId: z.string().optional(),
  id: z.string(),
  messages: z.array(z.object({
    classificationLabelValues: z.array(z.object({
      fields: z.array(z.unknown()),
      labelId: z.string(),
    })),
    historyId: z.string(),
    id: z.string(),
    internalDate: z.string(),
    labelIds: z.array(z.string()),
    payload: z.object({
      body: z.object({
        attachmentId: z.string(),
        data: z.string(),
        size: z.number(),
      }),
      filename: z.string(),
      headers: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      mimeType: z.string(),
      partId: z.string(),
      parts: z.array(z.string()),
    }),
    raw: z.string(),
    sizeEstimate: z.number(),
    snippet: z.string(),
    threadId: z.string(),
  })).optional(),
  snippet: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Threads. Registered at `@swamp/gcp/gmail/users-threads`. */
export const model = {
  type: "@swamp/gcp/gmail/users-threads",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A collection of messages representing a conversation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a threads",
      arguments: z.object({
        identifier: z.string().describe("The id of the threads"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Delete the threads",
      arguments: z.object({
        identifier: z.string().describe("The id of the threads"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync threads state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    modify: {
      description: "modify",
      arguments: z.object({
        addLabelIds: z.any().optional(),
        removeLabelIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["id"] = existing["id"]?.toString() ?? g["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addLabelIds"] !== undefined) {
          body["addLabelIds"] = args["addLabelIds"];
        }
        if (args["removeLabelIds"] !== undefined) {
          body["removeLabelIds"] = args["removeLabelIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.threads.modify",
            "path": "gmail/v1/users/{userId}/threads/{id}/modify",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    trash: {
      description: "trash",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["id"] = existing["id"]?.toString() ?? g["id"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.threads.trash",
            "path": "gmail/v1/users/{userId}/threads/{id}/trash",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    untrash: {
      description: "untrash",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["id"] = existing["id"]?.toString() ?? g["id"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.threads.untrash",
            "path": "gmail/v1/users/{userId}/threads/{id}/untrash",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
