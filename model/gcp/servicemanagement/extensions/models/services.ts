// Auto-generated extension model for @swamp/gcp/servicemanagement/services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Service Management Services.
 *
 * The full representation of a Service that is managed by Google Service Management.
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

const BASE_URL = "https://servicemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "servicemanagement.services.get",
  "path": "v1/services/{serviceName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "serviceName",
  ],
  "parameters": {
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "servicemanagement.services.create",
  "path": "v1/services",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const DELETE_CONFIG = {
  "id": "servicemanagement.services.delete",
  "path": "v1/services/{serviceName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "serviceName",
  ],
  "parameters": {
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  producerProjectId: z.string().describe(
    "ID of the project that produces and owns this service.",
  ).optional(),
  serviceName: z.string().describe(
    "The name of the service. See the [overview](https://cloud.google.com/service-infrastructure/docs/overview) for naming requirements.",
  ).optional(),
});

const StateSchema = z.object({
  producerProjectId: z.string().optional(),
  serviceName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  producerProjectId: z.string().describe(
    "ID of the project that produces and owns this service.",
  ).optional(),
  serviceName: z.string().describe(
    "The name of the service. See the [overview](https://cloud.google.com/service-infrastructure/docs/overview) for naming requirements.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Service Management Services. Registered at `@swamp/gcp/servicemanagement/services`. */
export const model = {
  type: "@swamp/gcp/servicemanagement/services",
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
        "The full representation of a Service that is managed by Google Service Manage...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["producerProjectId"] !== undefined) {
          body["producerProjectId"] = g["producerProjectId"];
        }
        if (g["serviceName"] !== undefined) {
          body["serviceName"] = g["serviceName"];
        }
        if (g["name"] !== undefined) params["serviceName"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["serviceName"] = args.identifier;
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["serviceName"] = args.identifier;
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
      description: "Sync services state from GCP",
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
          params["serviceName"] = identifier;
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
    generate_config_report: {
      description: "generate config report",
      arguments: z.object({
        newConfig: z.any().optional(),
        oldConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["newConfig"] !== undefined) {
          body["newConfig"] = args["newConfig"];
        }
        if (args["oldConfig"] !== undefined) {
          body["oldConfig"] = args["oldConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "servicemanagement.services.generateConfigReport",
            "path": "v1/services:generateConfigReport",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_config: {
      description: "get config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "servicemanagement.services.getConfig",
            "path": "v1/services/{serviceName}/config",
            "httpMethod": "GET",
            "parameterOrder": ["serviceName"],
            "parameters": {
              "configId": { "location": "query" },
              "serviceName": { "location": "path", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "servicemanagement.services.undelete",
            "path": "v1/services/{serviceName}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["serviceName"],
            "parameters": {
              "serviceName": { "location": "path", "required": true },
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
