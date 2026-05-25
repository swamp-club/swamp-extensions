// Auto-generated extension model for @swamp/gcp/dialogflow/agents-webhooks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Webhooks.
 *
 * GCP dialogflow Agents.Webhooks resource
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/webhooks/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.webhooks.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.webhooks.create",
  "path": "v3/{+parent}/webhooks",
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

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.webhooks.patch",
  "path": "v3/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dialogflow.projects.locations.agents.webhooks.delete",
  "path": "v3/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dialogflow.projects.locations.agents.webhooks.list",
  "path": "v3/{+parent}/webhooks",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  genericWebService: z.object({
    allowedCaCerts: z.array(z.string()).optional(),
    httpMethod: z.enum([
      "HTTP_METHOD_UNSPECIFIED",
      "POST",
      "GET",
      "HEAD",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ]).optional(),
    oauthConfig: z.object({
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
      scopes: z.array(z.string()).optional(),
      secretVersionForClientSecret: z.string().optional(),
      tokenEndpoint: z.string().optional(),
    }).optional(),
    parameterMapping: z.record(z.string(), z.string()).optional(),
    password: z.string().optional(),
    requestBody: z.string().optional(),
    requestHeaders: z.record(z.string(), z.string()).optional(),
    secretVersionForUsernamePassword: z.string().optional(),
    secretVersionsForRequestHeaders: z.record(
      z.string(),
      z.object({
        secretVersion: z.string().optional(),
      }),
    ).optional(),
    serviceAccountAuthConfig: z.object({
      serviceAccount: z.string().optional(),
    }).optional(),
    serviceAgentAuth: z.enum([
      "SERVICE_AGENT_AUTH_UNSPECIFIED",
      "NONE",
      "ID_TOKEN",
      "ACCESS_TOKEN",
    ]).optional(),
    uri: z.string().optional(),
    username: z.string().optional(),
    webhookType: z.enum(["WEBHOOK_TYPE_UNSPECIFIED", "STANDARD", "FLEXIBLE"])
      .optional(),
  }).optional(),
  name: z.string().optional(),
  serviceDirectory: z.object({
    genericWebService: z.object({
      allowedCaCerts: z.array(z.string()).optional(),
      httpMethod: z.enum([
        "HTTP_METHOD_UNSPECIFIED",
        "POST",
        "GET",
        "HEAD",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS",
      ]).optional(),
      oauthConfig: z.object({
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
        scopes: z.array(z.string()).optional(),
        secretVersionForClientSecret: z.string().optional(),
        tokenEndpoint: z.string().optional(),
      }).optional(),
      parameterMapping: z.record(z.string(), z.string()).optional(),
      password: z.string().optional(),
      requestBody: z.string().optional(),
      requestHeaders: z.record(z.string(), z.string()).optional(),
      secretVersionForUsernamePassword: z.string().optional(),
      secretVersionsForRequestHeaders: z.record(
        z.string(),
        z.object({
          secretVersion: z.string().optional(),
        }),
      ).optional(),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string().optional(),
      }).optional(),
      serviceAgentAuth: z.enum([
        "SERVICE_AGENT_AUTH_UNSPECIFIED",
        "NONE",
        "ID_TOKEN",
        "ACCESS_TOKEN",
      ]).optional(),
      uri: z.string().optional(),
      username: z.string().optional(),
      webhookType: z.enum(["WEBHOOK_TYPE_UNSPECIFIED", "STANDARD", "FLEXIBLE"])
        .optional(),
    }).optional(),
    service: z.string().optional(),
  }).optional(),
  timeout: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  genericWebService: z.object({
    allowedCaCerts: z.array(z.string()),
    httpMethod: z.string(),
    oauthConfig: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      scopes: z.array(z.string()),
      secretVersionForClientSecret: z.string(),
      tokenEndpoint: z.string(),
    }),
    parameterMapping: z.record(z.string(), z.unknown()),
    password: z.string(),
    requestBody: z.string(),
    requestHeaders: z.record(z.string(), z.unknown()),
    secretVersionForUsernamePassword: z.string(),
    secretVersionsForRequestHeaders: z.record(z.string(), z.unknown()),
    serviceAccountAuthConfig: z.object({
      serviceAccount: z.string(),
    }),
    serviceAgentAuth: z.string(),
    uri: z.string(),
    username: z.string(),
    webhookType: z.string(),
  }).optional(),
  name: z.string(),
  serviceDirectory: z.object({
    genericWebService: z.object({
      allowedCaCerts: z.array(z.string()),
      httpMethod: z.string(),
      oauthConfig: z.object({
        clientId: z.string(),
        clientSecret: z.string(),
        scopes: z.array(z.string()),
        secretVersionForClientSecret: z.string(),
        tokenEndpoint: z.string(),
      }),
      parameterMapping: z.record(z.string(), z.unknown()),
      password: z.string(),
      requestBody: z.string(),
      requestHeaders: z.record(z.string(), z.unknown()),
      secretVersionForUsernamePassword: z.string(),
      secretVersionsForRequestHeaders: z.record(z.string(), z.unknown()),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string(),
      }),
      serviceAgentAuth: z.string(),
      uri: z.string(),
      username: z.string(),
      webhookType: z.string(),
    }),
    service: z.string(),
  }).optional(),
  timeout: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  genericWebService: z.object({
    allowedCaCerts: z.array(z.string()).optional(),
    httpMethod: z.enum([
      "HTTP_METHOD_UNSPECIFIED",
      "POST",
      "GET",
      "HEAD",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ]).optional(),
    oauthConfig: z.object({
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
      scopes: z.array(z.string()).optional(),
      secretVersionForClientSecret: z.string().optional(),
      tokenEndpoint: z.string().optional(),
    }).optional(),
    parameterMapping: z.record(z.string(), z.string()).optional(),
    password: z.string().optional(),
    requestBody: z.string().optional(),
    requestHeaders: z.record(z.string(), z.string()).optional(),
    secretVersionForUsernamePassword: z.string().optional(),
    secretVersionsForRequestHeaders: z.record(
      z.string(),
      z.object({
        secretVersion: z.string().optional(),
      }),
    ).optional(),
    serviceAccountAuthConfig: z.object({
      serviceAccount: z.string().optional(),
    }).optional(),
    serviceAgentAuth: z.enum([
      "SERVICE_AGENT_AUTH_UNSPECIFIED",
      "NONE",
      "ID_TOKEN",
      "ACCESS_TOKEN",
    ]).optional(),
    uri: z.string().optional(),
    username: z.string().optional(),
    webhookType: z.enum(["WEBHOOK_TYPE_UNSPECIFIED", "STANDARD", "FLEXIBLE"])
      .optional(),
  }).optional(),
  name: z.string().optional(),
  serviceDirectory: z.object({
    genericWebService: z.object({
      allowedCaCerts: z.array(z.string()).optional(),
      httpMethod: z.enum([
        "HTTP_METHOD_UNSPECIFIED",
        "POST",
        "GET",
        "HEAD",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS",
      ]).optional(),
      oauthConfig: z.object({
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
        scopes: z.array(z.string()).optional(),
        secretVersionForClientSecret: z.string().optional(),
        tokenEndpoint: z.string().optional(),
      }).optional(),
      parameterMapping: z.record(z.string(), z.string()).optional(),
      password: z.string().optional(),
      requestBody: z.string().optional(),
      requestHeaders: z.record(z.string(), z.string()).optional(),
      secretVersionForUsernamePassword: z.string().optional(),
      secretVersionsForRequestHeaders: z.record(
        z.string(),
        z.object({
          secretVersion: z.string().optional(),
        }),
      ).optional(),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string().optional(),
      }).optional(),
      serviceAgentAuth: z.enum([
        "SERVICE_AGENT_AUTH_UNSPECIFIED",
        "NONE",
        "ID_TOKEN",
        "ACCESS_TOKEN",
      ]).optional(),
      uri: z.string().optional(),
      username: z.string().optional(),
      webhookType: z.enum(["WEBHOOK_TYPE_UNSPECIFIED", "STANDARD", "FLEXIBLE"])
        .optional(),
    }).optional(),
    service: z.string().optional(),
  }).optional(),
  timeout: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.Webhooks. Registered at `@swamp/gcp/dialogflow/agents-webhooks`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-webhooks",
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
      toVersion: "2026.05.18.1",
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
      description: "GCP dialogflow Agents.Webhooks resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webhooks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["genericWebService"] !== undefined) {
          body["genericWebService"] = g["genericWebService"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceDirectory"] !== undefined) {
          body["serviceDirectory"] = g["serviceDirectory"];
        }
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a webhooks",
      arguments: z.object({
        identifier: z.string().describe("The name of the webhooks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update webhooks attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["genericWebService"] !== undefined) {
          body["genericWebService"] = g["genericWebService"];
        }
        if (g["serviceDirectory"] !== undefined) {
          body["serviceDirectory"] = g["serviceDirectory"];
        }
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
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
          PATCH_CONFIG,
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
      description: "Delete the webhooks",
      arguments: z.object({
        identifier: z.string().describe("The name of the webhooks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync webhooks state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    list: {
      description: "List webhooks resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "webhooks",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
