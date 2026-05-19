// Auto-generated extension model for @swamp/gcp/workspaceevents/tasks-pushnotificationconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Workspace Events Tasks.PushNotificationConfigs.
 *
 * Get a push notification config for a task.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/pushNotificationConfigs/${shortName}`;
}

const BASE_URL = "https://workspaceevents.googleapis.com/";

const GET_CONFIG = {
  "id": "workspaceevents.tasks.pushNotificationConfigs.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "workspaceevents.tasks.pushNotificationConfigs.create",
  "path": "v1/{+parent}",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "configId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "workspaceevents.tasks.pushNotificationConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id}",
  ).optional(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string().describe("Optional credentials").optional(),
      schemes: z.array(z.string()).describe(
        "Supported authentication schemes - e.g. Basic, Bearer, etc",
      ).optional(),
    }).describe("Defines authentication details, used for push notifications.")
      .optional(),
    id: z.string().describe(
      "A unique identifier (e.g. UUID) for this push notification.",
    ).optional(),
    token: z.string().describe("Token unique for this task/session").optional(),
    url: z.string().describe("Url to send the notification too").optional(),
  }).describe(
    "Configuration for setting up push notifications for task updates.",
  ).optional(),
  configId: z.string().describe("Required. The ID for the new config.")
    .optional(),
  tenant: z.string().describe(
    "Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string(),
      schemes: z.array(z.string()),
    }),
    id: z.string(),
    token: z.string(),
    url: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().describe(
    "The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id}",
  ).optional(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string().describe("Optional credentials").optional(),
      schemes: z.array(z.string()).describe(
        "Supported authentication schemes - e.g. Basic, Bearer, etc",
      ).optional(),
    }).describe("Defines authentication details, used for push notifications.")
      .optional(),
    id: z.string().describe(
      "A unique identifier (e.g. UUID) for this push notification.",
    ).optional(),
    token: z.string().describe("Token unique for this task/session").optional(),
    url: z.string().describe("Url to send the notification too").optional(),
  }).describe(
    "Configuration for setting up push notifications for task updates.",
  ).optional(),
  configId: z.string().describe("Required. The ID for the new config.")
    .optional(),
  tenant: z.string().describe(
    "Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Workspace Events Tasks.PushNotificationConfigs. Registered at `@swamp/gcp/workspaceevents/tasks-pushnotificationconfigs`. */
export const model = {
  type: "@swamp/gcp/workspaceevents/tasks-pushnotificationconfigs",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "Get a push notification config for a task.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pushNotificationConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pushNotificationConfig"] !== undefined) {
          body["pushNotificationConfig"] = g["pushNotificationConfig"];
        }
        if (g["configId"] !== undefined) body["configId"] = g["configId"];
        if (g["tenant"] !== undefined) body["tenant"] = g["tenant"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a pushNotificationConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the pushNotificationConfigs",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Delete the pushNotificationConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the pushNotificationConfigs",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync pushNotificationConfigs state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
