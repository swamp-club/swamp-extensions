// Auto-generated extension model for @swamp/gcp/datastore/indexes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Datastore Indexes.
 *
 * Datastore composite index definition.
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

const BASE_URL = "https://datastore.googleapis.com/";

const GET_CONFIG = {
  "id": "datastore.projects.indexes.get",
  "path": "v1/projects/{projectId}/indexes/{indexId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "indexId",
  ],
  "parameters": {
    "indexId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "datastore.projects.indexes.create",
  "path": "v1/projects/{projectId}/indexes",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datastore.projects.indexes.delete",
  "path": "v1/projects/{projectId}/indexes/{indexId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "indexId",
  ],
  "parameters": {
    "indexId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ancestor: z.enum(["ANCESTOR_MODE_UNSPECIFIED", "NONE", "ALL_ANCESTORS"])
    .describe(
      "Required. The index's ancestor mode. Must not be ANCESTOR_MODE_UNSPECIFIED.",
    ).optional(),
  projectId: z.string().describe("Output only. Project ID.").optional(),
  properties: z.array(z.object({
    direction: z.enum(["DIRECTION_UNSPECIFIED", "ASCENDING", "DESCENDING"])
      .describe(
        "Required. The indexed property's direction. Must not be DIRECTION_UNSPECIFIED.",
      ).optional(),
    name: z.string().describe("Required. The property name to index.")
      .optional(),
  })).describe(
    "Required. An ordered sequence of property names and their index attributes. Requires: * A maximum of 100 properties.",
  ).optional(),
});

const StateSchema = z.object({
  ancestor: z.string().optional(),
  indexId: z.string().optional(),
  kind: z.string().optional(),
  projectId: z.string().optional(),
  properties: z.array(z.object({
    direction: z.string(),
    name: z.string(),
  })).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ancestor: z.enum(["ANCESTOR_MODE_UNSPECIFIED", "NONE", "ALL_ANCESTORS"])
    .describe(
      "Required. The index's ancestor mode. Must not be ANCESTOR_MODE_UNSPECIFIED.",
    ).optional(),
  projectId: z.string().describe("Output only. Project ID.").optional(),
  properties: z.array(z.object({
    direction: z.enum(["DIRECTION_UNSPECIFIED", "ASCENDING", "DESCENDING"])
      .describe(
        "Required. The indexed property's direction. Must not be DIRECTION_UNSPECIFIED.",
      ).optional(),
    name: z.string().describe("Required. The property name to index.")
      .optional(),
  })).describe(
    "Required. An ordered sequence of property names and their index attributes. Requires: * A maximum of 100 properties.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Datastore Indexes. Registered at `@swamp/gcp/datastore/indexes`. */
export const model = {
  type: "@swamp/gcp/datastore/indexes",
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
      description: "Datastore composite index definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a indexes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["ancestor"] !== undefined) body["ancestor"] = g["ancestor"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["name"] !== undefined) params["indexId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Get a indexes",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["indexId"] = args.identifier;
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
      description: "Delete the indexes",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["indexId"] = args.identifier;
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
      description: "Sync indexes state from GCP",
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
          params["indexId"] = identifier;
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
  },
};
