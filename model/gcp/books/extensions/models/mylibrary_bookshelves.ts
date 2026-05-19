// Auto-generated extension model for @swamp/gcp/books/mylibrary-bookshelves
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Mylibrary.Bookshelves.
 *
 * Retrieves metadata for a specific bookshelf belonging to the authenticated user.
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

const BASE_URL = "https://books.googleapis.com/";

const GET_CONFIG = {
  "id": "books.mylibrary.bookshelves.get",
  "path": "books/v1/mylibrary/bookshelves/{shelf}",
  "httpMethod": "GET",
  "parameterOrder": [
    "shelf",
  ],
  "parameters": {
    "shelf": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "books.mylibrary.bookshelves.removeVolume",
  "path": "books/v1/mylibrary/bookshelves/{shelf}/removeVolume",
  "httpMethod": "POST",
  "parameterOrder": [
    "shelf",
    "volumeId",
  ],
  "parameters": {
    "reason": {
      "location": "query",
    },
    "shelf": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
    },
    "volumeId": {
      "location": "query",
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
  access: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  kind: z.string().optional(),
  selfLink: z.string().optional(),
  title: z.string().optional(),
  updated: z.string().optional(),
  volumeCount: z.number().optional(),
  volumesLastUpdated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Books Mylibrary.Bookshelves. Registered at `@swamp/gcp/books/mylibrary-bookshelves`. */
export const model = {
  type: "@swamp/gcp/books/mylibrary-bookshelves",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Retrieves metadata for a specific bookshelf belonging to the authenticated user.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a bookshelves",
      arguments: z.object({
        identifier: z.string().describe("The name of the bookshelves"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["shelf"] = args.identifier;
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
      description: "Delete the bookshelves",
      arguments: z.object({
        identifier: z.string().describe("The name of the bookshelves"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["shelf"] !== undefined) params["shelf"] = String(g["shelf"]);
        params["volumeId"] = args.identifier;
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
      description: "Sync bookshelves state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["shelf"] = identifier;
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
    add_volume: {
      description: "add volume",
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
        params["shelf"] = existing["shelf"]?.toString() ??
          g["shelf"]?.toString() ?? "";
        params["volumeId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.mylibrary.bookshelves.addVolume",
            "path": "books/v1/mylibrary/bookshelves/{shelf}/addVolume",
            "httpMethod": "POST",
            "parameterOrder": ["shelf", "volumeId"],
            "parameters": {
              "reason": { "location": "query" },
              "shelf": { "location": "path", "required": true },
              "source": { "location": "query" },
              "volumeId": { "location": "query", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    clear_volumes: {
      description: "clear volumes",
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
        params["shelf"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.mylibrary.bookshelves.clearVolumes",
            "path": "books/v1/mylibrary/bookshelves/{shelf}/clearVolumes",
            "httpMethod": "POST",
            "parameterOrder": ["shelf"],
            "parameters": {
              "shelf": { "location": "path", "required": true },
              "source": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    move_volume: {
      description: "move volume",
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
        params["shelf"] = existing["shelf"]?.toString() ??
          g["shelf"]?.toString() ?? "";
        params["volumeId"] = existing["volumeId"]?.toString() ??
          g["volumeId"]?.toString() ?? "";
        params["volumePosition"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.mylibrary.bookshelves.moveVolume",
            "path": "books/v1/mylibrary/bookshelves/{shelf}/moveVolume",
            "httpMethod": "POST",
            "parameterOrder": ["shelf", "volumeId", "volumePosition"],
            "parameters": {
              "shelf": { "location": "path", "required": true },
              "source": { "location": "query" },
              "volumeId": { "location": "query", "required": true },
              "volumePosition": { "location": "query", "required": true },
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
