// Auto-generated extension model for @swamp/gcp/appengine/apps-services-versions-instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Apps.Services.Versions.Instances.
 *
 * An Instance resource is the computing unit that App Engine uses to automatically scale an application.
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

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.apps.services.versions.instances.get",
  "path":
    "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
    "servicesId",
    "versionsId",
    "instancesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "instancesId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "versionsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "appengine.apps.services.versions.instances.delete",
  "path":
    "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "appsId",
    "servicesId",
    "versionsId",
    "instancesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "instancesId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "versionsId": {
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
  appEngineRelease: z.string().optional(),
  availability: z.string().optional(),
  averageLatency: z.number().optional(),
  errors: z.number().optional(),
  id: z.string().optional(),
  memoryUsage: z.string().optional(),
  name: z.string(),
  qps: z.number().optional(),
  requests: z.number().optional(),
  startTime: z.string().optional(),
  vmDebugEnabled: z.boolean().optional(),
  vmId: z.string().optional(),
  vmIp: z.string().optional(),
  vmLiveness: z.string().optional(),
  vmName: z.string().optional(),
  vmStatus: z.string().optional(),
  vmZoneName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Apps.Services.Versions.Instances. Registered at `@swamp/gcp/appengine/apps-services-versions-instances`. */
export const model = {
  type: "@swamp/gcp/appengine/apps-services-versions-instances",
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
      description:
        "An Instance resource is the computing unit that App Engine uses to automatica...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        if (g["versionsId"] !== undefined) {
          params["versionsId"] = String(g["versionsId"]);
        }
        params["instancesId"] = args.identifier;
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        if (g["versionsId"] !== undefined) {
          params["versionsId"] = String(g["versionsId"]);
        }
        params["instancesId"] = args.identifier;
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
      description: "Sync instances state from GCP",
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
          if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
          else if (existing["appsId"]) {
            params["appsId"] = String(existing["appsId"]);
          }
          if (g["servicesId"] !== undefined) {
            params["servicesId"] = String(g["servicesId"]);
          } else if (existing["servicesId"]) {
            params["servicesId"] = String(existing["servicesId"]);
          }
          if (g["versionsId"] !== undefined) {
            params["versionsId"] = String(g["versionsId"]);
          } else if (existing["versionsId"]) {
            params["versionsId"] = String(existing["versionsId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["instancesId"] = identifier;
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
    debug: {
      description: "debug",
      arguments: z.object({
        sshKey: z.any().optional(),
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
        params["appsId"] = existing["appsId"]?.toString() ??
          g["appsId"]?.toString() ?? "";
        params["servicesId"] = existing["servicesId"]?.toString() ??
          g["servicesId"]?.toString() ?? "";
        params["versionsId"] = existing["versionsId"]?.toString() ??
          g["versionsId"]?.toString() ?? "";
        params["instancesId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sshKey"] !== undefined) body["sshKey"] = args["sshKey"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "appengine.apps.services.versions.instances.debug",
            "path":
              "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}:debug",
            "httpMethod": "POST",
            "parameterOrder": [
              "appsId",
              "servicesId",
              "versionsId",
              "instancesId",
            ],
            "parameters": {
              "appsId": { "location": "path", "required": true },
              "instancesId": { "location": "path", "required": true },
              "servicesId": { "location": "path", "required": true },
              "versionsId": { "location": "path", "required": true },
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
