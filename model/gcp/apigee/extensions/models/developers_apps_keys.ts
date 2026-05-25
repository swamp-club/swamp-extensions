// Auto-generated extension model for @swamp/gcp/apigee/developers-apps-keys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Developers.Apps.Keys.
 *
 * Gets details for a consumer key for a developer app, including the key and secret value, associated API products, and other information.
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
  return `${parent}/keys/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.developers.apps.keys.get",
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
  "id": "apigee.organizations.developers.apps.keys.create",
  "path": "v1/{+parent}/keys",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.developers.apps.keys.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  apiProducts: z.array(z.string()).describe(
    "List of API products for which the credential can be used. **Note**: Do not specify the list of API products when creating a consumer key and secret for a developer app. Instead, use the UpdateDeveloperAppKey API to make the association after the consumer key and secret are created.",
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes associated with the credential.").optional(),
  consumerKey: z.string().describe("Consumer key.").optional(),
  consumerSecret: z.string().describe("Secret key.").optional(),
  expiresAt: z.string().describe(
    "Time the developer app expires in milliseconds since epoch.",
  ).optional(),
  expiresInSeconds: z.string().describe(
    "Input only. Expiration time, in seconds, for the consumer key. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  issuedAt: z.string().describe(
    "Time the developer app was created in milliseconds since epoch.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the app. The specified scope names must already be defined for the API product that you associate with the app.",
  ).optional(),
  status: z.string().describe(
    "Status of the credential. Valid values include `approved` or `revoked`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiProducts: z.array(z.string()).optional(),
  attributes: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
  consumerKey: z.string().optional(),
  consumerSecret: z.string().optional(),
  expiresAt: z.string().optional(),
  expiresInSeconds: z.string().optional(),
  issuedAt: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  apiProducts: z.array(z.string()).describe(
    "List of API products for which the credential can be used. **Note**: Do not specify the list of API products when creating a consumer key and secret for a developer app. Instead, use the UpdateDeveloperAppKey API to make the association after the consumer key and secret are created.",
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes associated with the credential.").optional(),
  consumerKey: z.string().describe("Consumer key.").optional(),
  consumerSecret: z.string().describe("Secret key.").optional(),
  expiresAt: z.string().describe(
    "Time the developer app expires in milliseconds since epoch.",
  ).optional(),
  expiresInSeconds: z.string().describe(
    "Input only. Expiration time, in seconds, for the consumer key. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  issuedAt: z.string().describe(
    "Time the developer app was created in milliseconds since epoch.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the app. The specified scope names must already be defined for the API product that you associate with the app.",
  ).optional(),
  status: z.string().describe(
    "Status of the credential. Valid values include `approved` or `revoked`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Developers.Apps.Keys. Registered at `@swamp/gcp/apigee/developers-apps-keys`. */
export const model = {
  type: "@swamp/gcp/apigee/developers-apps-keys",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Gets details for a consumer key for a developer app, including the key and se...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a keys",
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
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["consumerKey"] !== undefined) {
          body["consumerKey"] = g["consumerKey"];
        }
        if (g["consumerSecret"] !== undefined) {
          body["consumerSecret"] = g["consumerSecret"];
        }
        if (g["expiresAt"] !== undefined) body["expiresAt"] = g["expiresAt"];
        if (g["expiresInSeconds"] !== undefined) {
          body["expiresInSeconds"] = g["expiresInSeconds"];
        }
        if (g["issuedAt"] !== undefined) body["issuedAt"] = g["issuedAt"];
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
      description: "Get a keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
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
      description: "Delete the keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
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
      description: "Sync keys state from GCP",
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
    replace_developer_app_key: {
      description: "replace developer app key",
      arguments: z.object({
        apiProducts: z.any().optional(),
        attributes: z.any().optional(),
        consumerKey: z.any().optional(),
        consumerSecret: z.any().optional(),
        expiresAt: z.any().optional(),
        expiresInSeconds: z.any().optional(),
        issuedAt: z.any().optional(),
        scopes: z.any().optional(),
        status: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["apiProducts"] !== undefined) {
          body["apiProducts"] = args["apiProducts"];
        }
        if (args["attributes"] !== undefined) {
          body["attributes"] = args["attributes"];
        }
        if (args["consumerKey"] !== undefined) {
          body["consumerKey"] = args["consumerKey"];
        }
        if (args["consumerSecret"] !== undefined) {
          body["consumerSecret"] = args["consumerSecret"];
        }
        if (args["expiresAt"] !== undefined) {
          body["expiresAt"] = args["expiresAt"];
        }
        if (args["expiresInSeconds"] !== undefined) {
          body["expiresInSeconds"] = args["expiresInSeconds"];
        }
        if (args["issuedAt"] !== undefined) body["issuedAt"] = args["issuedAt"];
        if (args["scopes"] !== undefined) body["scopes"] = args["scopes"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.developers.apps.keys.replaceDeveloperAppKey",
            "path": "v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_developer_app_key: {
      description: "update developer app key",
      arguments: z.object({
        apiProducts: z.any().optional(),
        attributes: z.any().optional(),
        consumerKey: z.any().optional(),
        consumerSecret: z.any().optional(),
        expiresAt: z.any().optional(),
        expiresInSeconds: z.any().optional(),
        issuedAt: z.any().optional(),
        scopes: z.any().optional(),
        status: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["apiProducts"] !== undefined) {
          body["apiProducts"] = args["apiProducts"];
        }
        if (args["attributes"] !== undefined) {
          body["attributes"] = args["attributes"];
        }
        if (args["consumerKey"] !== undefined) {
          body["consumerKey"] = args["consumerKey"];
        }
        if (args["consumerSecret"] !== undefined) {
          body["consumerSecret"] = args["consumerSecret"];
        }
        if (args["expiresAt"] !== undefined) {
          body["expiresAt"] = args["expiresAt"];
        }
        if (args["expiresInSeconds"] !== undefined) {
          body["expiresInSeconds"] = args["expiresInSeconds"];
        }
        if (args["issuedAt"] !== undefined) body["issuedAt"] = args["issuedAt"];
        if (args["scopes"] !== undefined) body["scopes"] = args["scopes"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.developers.apps.keys.updateDeveloperAppKey",
            "path": "v1/{+name}",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": {
              "action": { "location": "query" },
              "name": { "location": "path", "required": true },
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
