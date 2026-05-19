// Auto-generated extension model for @swamp/gcp/alertcenter/alerts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Workspace Alert Center Alerts.
 *
 * An alert affecting a customer.
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

const BASE_URL = "https://alertcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "alertcenter.alerts.get",
  "path": "v1beta1/alerts/{alertId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "alertId",
  ],
  "parameters": {
    "alertId": {
      "location": "path",
      "required": true,
    },
    "customerId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "alertcenter.alerts.delete",
  "path": "v1beta1/alerts/{alertId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "alertId",
  ],
  "parameters": {
    "alertId": {
      "location": "path",
      "required": true,
    },
    "customerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  alertId: z.string().optional(),
  createTime: z.string().optional(),
  customerId: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  deleted: z.boolean().optional(),
  endTime: z.string().optional(),
  etag: z.string().optional(),
  metadata: z.object({
    alertId: z.string(),
    assignee: z.string(),
    customerId: z.string(),
    etag: z.string(),
    severity: z.string(),
    status: z.string(),
    updateTime: z.string(),
  }).optional(),
  securityInvestigationToolLink: z.string().optional(),
  source: z.string().optional(),
  startTime: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Workspace Alert Center Alerts. Registered at `@swamp/gcp/alertcenter/alerts`. */
export const model = {
  type: "@swamp/gcp/alertcenter/alerts",
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
      description: "An alert affecting a customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a alerts",
      arguments: z.object({
        identifier: z.string().describe("The name of the alerts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["alertId"] = args.identifier;
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
      description: "Delete the alerts",
      arguments: z.object({
        identifier: z.string().describe("The name of the alerts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["alertId"] = args.identifier;
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
      description: "Sync alerts state from GCP",
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
          params["alertId"] = identifier;
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        alertId: z.any().optional(),
        customerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["alertId"] !== undefined) body["alertId"] = args["alertId"];
        if (args["customerId"] !== undefined) {
          body["customerId"] = args["customerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alertcenter.alerts.batchDelete",
            "path": "v1beta1/alerts:batchDelete",
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
    batch_undelete: {
      description: "batch undelete",
      arguments: z.object({
        alertId: z.any().optional(),
        customerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["alertId"] !== undefined) body["alertId"] = args["alertId"];
        if (args["customerId"] !== undefined) {
          body["customerId"] = args["customerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alertcenter.alerts.batchUndelete",
            "path": "v1beta1/alerts:batchUndelete",
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
    get_metadata: {
      description: "get metadata",
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
        params["alertId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "alertcenter.alerts.getMetadata",
            "path": "v1beta1/alerts/{alertId}/metadata",
            "httpMethod": "GET",
            "parameterOrder": ["alertId"],
            "parameters": {
              "alertId": { "location": "path", "required": true },
              "customerId": { "location": "query" },
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
      arguments: z.object({
        customerId: z.any().optional(),
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
        params["alertId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["customerId"] !== undefined) {
          body["customerId"] = args["customerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alertcenter.alerts.undelete",
            "path": "v1beta1/alerts/{alertId}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["alertId"],
            "parameters": {
              "alertId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
