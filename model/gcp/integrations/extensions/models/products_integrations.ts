// Auto-generated extension model for @swamp/gcp/integrations/products-integrations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Products.Integrations.
 *
 * The integration definition.
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

const BASE_URL = "https://integrations.googleapis.com/";

const LIST_CONFIG = {
  "id": "integrations.projects.locations.products.integrations.list",
  "path": "v1/{+parent}/integrations",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  active: z.boolean().optional(),
  createTime: z.string().optional(),
  creatorEmail: z.string().optional(),
  description: z.string().optional(),
  lastModifierEmail: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Products.Integrations. Registered at `@swamp/gcp/integrations/products-integrations`. */
export const model = {
  type: "@swamp/gcp/integrations/products-integrations",
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
      description: "The integration definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a integrations",
      arguments: z.object({
        identifier: z.string().describe("The name of the integrations"),
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
      description: "Sync integrations state from GCP",
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
        doNotPropagateError: z.any().optional(),
        executionId: z.any().optional(),
        inputParameters: z.any().optional(),
        parameterEntries: z.any().optional(),
        parameters: z.any().optional(),
        requestId: z.any().optional(),
        triggerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["doNotPropagateError"] !== undefined) {
          body["doNotPropagateError"] = args["doNotPropagateError"];
        }
        if (args["executionId"] !== undefined) {
          body["executionId"] = args["executionId"];
        }
        if (args["inputParameters"] !== undefined) {
          body["inputParameters"] = args["inputParameters"];
        }
        if (args["parameterEntries"] !== undefined) {
          body["parameterEntries"] = args["parameterEntries"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["triggerId"] !== undefined) {
          body["triggerId"] = args["triggerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.products.integrations.execute",
            "path": "v1/{+name}:execute",
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
    schedule: {
      description: "schedule",
      arguments: z.object({
        inputParameters: z.any().optional(),
        parameterEntries: z.any().optional(),
        parameters: z.any().optional(),
        requestId: z.any().optional(),
        scheduleTime: z.any().optional(),
        triggerId: z.any().optional(),
        userGeneratedExecutionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["inputParameters"] !== undefined) {
          body["inputParameters"] = args["inputParameters"];
        }
        if (args["parameterEntries"] !== undefined) {
          body["parameterEntries"] = args["parameterEntries"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["scheduleTime"] !== undefined) {
          body["scheduleTime"] = args["scheduleTime"];
        }
        if (args["triggerId"] !== undefined) {
          body["triggerId"] = args["triggerId"];
        }
        if (args["userGeneratedExecutionId"] !== undefined) {
          body["userGeneratedExecutionId"] = args["userGeneratedExecutionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.products.integrations.schedule",
            "path": "v1/{+name}:schedule",
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
    test: {
      description: "test",
      arguments: z.object({
        clientId: z.any().optional(),
        configParameters: z.any().optional(),
        deadlineSecondsTime: z.any().optional(),
        inputParameters: z.any().optional(),
        integrationVersion: z.any().optional(),
        parameters: z.any().optional(),
        testMode: z.any().optional(),
        triggerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["clientId"] !== undefined) body["clientId"] = args["clientId"];
        if (args["configParameters"] !== undefined) {
          body["configParameters"] = args["configParameters"];
        }
        if (args["deadlineSecondsTime"] !== undefined) {
          body["deadlineSecondsTime"] = args["deadlineSecondsTime"];
        }
        if (args["inputParameters"] !== undefined) {
          body["inputParameters"] = args["inputParameters"];
        }
        if (args["integrationVersion"] !== undefined) {
          body["integrationVersion"] = args["integrationVersion"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["testMode"] !== undefined) body["testMode"] = args["testMode"];
        if (args["triggerId"] !== undefined) {
          body["triggerId"] = args["triggerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.products.integrations.test",
            "path": "v1/{+name}:test",
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
