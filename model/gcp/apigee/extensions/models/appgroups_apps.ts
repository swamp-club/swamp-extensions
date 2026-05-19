// Auto-generated extension model for @swamp/gcp/apigee/appgroups-apps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Appgroups.Apps.
 *
 * Response for [GetAppGroupApp].[AppGroupApps.GetAppGroupApp], [CreateAppGroupAppRequest].[AppGroupApp.CreateAppGroupAppRequest] and [DeleteAppGroupApp].[AppGroupApp.DeleteAppGroupApp]
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/apps/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.appgroups.apps.get",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "apigee.organizations.appgroups.apps.create",
  "path": "v1/{+parent}/apps",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "apigee.organizations.appgroups.apps.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "action": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "apigee.organizations.appgroups.apps.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  apiProducts: z.array(z.string()).describe(
    "List of API products associated with the AppGroup app.",
  ).optional(),
  appGroup: z.string().describe(
    "Immutable. Name of the parent AppGroup whose resource name format is of syntax (organizations/*/appgroups/*).",
  ).optional(),
  appId: z.string().describe("Immutable. ID of the AppGroup app.").optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes for the AppGroup app.").optional(),
  callbackUrl: z.string().describe(
    "Callback URL used by OAuth 2.0 authorization servers to communicate authorization codes back to AppGroup apps.",
  ).optional(),
  keyExpiresIn: z.string().describe(
    "Immutable. Expiration time, in seconds, for the consumer key that is generated for the AppGroup app. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Name of the AppGroup app whose resource name format is of syntax (organizations/*/appgroups/*/apps/*).",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the AppGroup app. The specified scopes must already exist for the API product that you associate with the AppGroup app.",
  ).optional(),
  status: z.string().describe(
    "Status of the App. Valid values include `approved` or `revoked`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiProducts: z.array(z.string()).optional(),
  appGroup: z.string().optional(),
  appId: z.string().optional(),
  attributes: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
  callbackUrl: z.string().optional(),
  createdAt: z.string().optional(),
  credentials: z.array(z.object({
    apiProducts: z.array(z.object({
      apiproduct: z.string(),
      status: z.string(),
    })),
    attributes: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    consumerKey: z.string(),
    consumerSecret: z.string(),
    expiresAt: z.string(),
    issuedAt: z.string(),
    scopes: z.array(z.string()),
    status: z.string(),
  })).optional(),
  keyExpiresIn: z.string().optional(),
  lastModifiedAt: z.string().optional(),
  name: z.string(),
  scopes: z.array(z.string()).optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  apiProducts: z.array(z.string()).describe(
    "List of API products associated with the AppGroup app.",
  ).optional(),
  appGroup: z.string().describe(
    "Immutable. Name of the parent AppGroup whose resource name format is of syntax (organizations/*/appgroups/*).",
  ).optional(),
  appId: z.string().describe("Immutable. ID of the AppGroup app.").optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes for the AppGroup app.").optional(),
  callbackUrl: z.string().describe(
    "Callback URL used by OAuth 2.0 authorization servers to communicate authorization codes back to AppGroup apps.",
  ).optional(),
  keyExpiresIn: z.string().describe(
    "Immutable. Expiration time, in seconds, for the consumer key that is generated for the AppGroup app. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Name of the AppGroup app whose resource name format is of syntax (organizations/*/appgroups/*/apps/*).",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the AppGroup app. The specified scopes must already exist for the API product that you associate with the AppGroup app.",
  ).optional(),
  status: z.string().describe(
    "Status of the App. Valid values include `approved` or `revoked`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Appgroups.Apps. Registered at `@swamp/gcp/apigee/appgroups-apps`. */
export const model = {
  type: "@swamp/gcp/apigee/appgroups-apps",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Response for [GetAppGroupApp].[AppGroupApps.GetAppGroupApp], [CreateAppGroupA...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiProducts"] !== undefined) {
          body["apiProducts"] = g["apiProducts"];
        }
        if (g["appGroup"] !== undefined) body["appGroup"] = g["appGroup"];
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["callbackUrl"] !== undefined) {
          body["callbackUrl"] = g["callbackUrl"];
        }
        if (g["keyExpiresIn"] !== undefined) {
          body["keyExpiresIn"] = g["keyExpiresIn"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["scopes"] !== undefined) body["scopes"] = g["scopes"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
      description: "Get a apps",
      arguments: z.object({
        identifier: z.string().describe("The name of the apps"),
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
    update: {
      description: "Update apps attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["apiProducts"] !== undefined) {
          body["apiProducts"] = g["apiProducts"];
        }
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["callbackUrl"] !== undefined) {
          body["callbackUrl"] = g["callbackUrl"];
        }
        if (g["scopes"] !== undefined) body["scopes"] = g["scopes"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the apps",
      arguments: z.object({
        identifier: z.string().describe("The name of the apps"),
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
      description: "Sync apps state from GCP",
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
