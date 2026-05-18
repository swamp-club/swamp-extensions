// Auto-generated extension model for @swamp/gcp/connectors/connections-tools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.Tools.
 *
 * Message representing a single tool.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://connectors.googleapis.com/";

const LIST_CONFIG = {
  "id": "connectors.projects.locations.connections.tools.list",
  "path": "v2/{+parent}/tools",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "executionConfig.headers": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  _meta: z.record(z.string(), z.unknown()).optional(),
  annotations: z.object({
    destructiveHint: z.boolean(),
    idempotentHint: z.boolean(),
    openWorldHint: z.boolean(),
    readOnlyHint: z.boolean(),
    title: z.string(),
  }).optional(),
  dependsOn: z.array(z.string()).optional(),
  description: z.string().optional(),
  inputSchema: z.object({
    additionalDetails: z.record(z.string(), z.unknown()),
    default: z.string(),
    description: z.string(),
    enum: z.array(z.string()),
    exclusiveMaximum: z.boolean(),
    exclusiveMinimum: z.boolean(),
    format: z.string(),
    items: z.string(),
    jdbcType: z.string(),
    maxItems: z.number(),
    maxLength: z.number(),
    maximum: z.string(),
    minItems: z.number(),
    minLength: z.number(),
    minimum: z.string(),
    pattern: z.string(),
    properties: z.record(z.string(), z.unknown()),
    required: z.array(z.string()),
    type: z.array(z.string()),
    uniqueItems: z.boolean(),
  }).optional(),
  name: z.string(),
  outputSchema: z.object({
    additionalDetails: z.record(z.string(), z.unknown()),
    default: z.string(),
    description: z.string(),
    enum: z.array(z.string()),
    exclusiveMaximum: z.boolean(),
    exclusiveMinimum: z.boolean(),
    format: z.string(),
    items: z.string(),
    jdbcType: z.string(),
    maxItems: z.number(),
    maxLength: z.number(),
    maximum: z.string(),
    minItems: z.number(),
    minLength: z.number(),
    minimum: z.string(),
    pattern: z.string(),
    properties: z.record(z.string(), z.unknown()),
    required: z.array(z.string()),
    type: z.array(z.string()),
    uniqueItems: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Connectors Connections.Tools. Registered at `@swamp/gcp/connectors/connections-tools`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-tools",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message representing a single tool.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a tools",
      arguments: z.object({
        identifier: z.string().describe("The name of the tools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync tools state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    execute: {
      description: "execute",
      arguments: z.object({
        executionConfig: z.any().optional(),
        parameters: z.any().optional(),
        toolDefinition: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["executionConfig"] !== undefined) {
          body["executionConfig"] = args["executionConfig"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["toolDefinition"] !== undefined) {
          body["toolDefinition"] = args["toolDefinition"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "connectors.projects.locations.connections.tools.execute",
            "path": "v2/{+name}:execute",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
