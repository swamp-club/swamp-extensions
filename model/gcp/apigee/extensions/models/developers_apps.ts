// Auto-generated extension model for @swamp/gcp/apigee/developers-apps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Developers.Apps.
 *
 * Returns the details for a developer app.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/apps/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.developers.apps.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "entity": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "query": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "apigee.organizations.developers.apps.create",
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
  "id": "apigee.organizations.developers.apps.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.developers.apps.delete",
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

const LIST_CONFIG = {
  "id": "apigee.organizations.developers.apps.list",
  "path": "v1/{+parent}/apps",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "count": {
      "location": "query",
    },
    "expand": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "shallowExpand": {
      "location": "query",
    },
    "startKey": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  apiProducts: z.array(z.string()).describe(
    "List of API products associated with the developer app.",
  ).optional(),
  appFamily: z.string().describe("Developer app family.").optional(),
  appId: z.string().describe(
    "ID of the developer app. This ID is not user specified but is automatically generated on app creation. appId is a UUID.",
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes for the developer app.").optional(),
  callbackUrl: z.string().describe(
    "Callback URL used by OAuth 2.0 authorization servers to communicate authorization codes back to developer apps.",
  ).optional(),
  developerId: z.string().describe("ID of the developer.").optional(),
  keyExpiresIn: z.string().describe(
    "Expiration time, in milliseconds, for the consumer key that is generated for the developer app. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  name: z.string().describe("Name of the developer app.").optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the developer app. The specified scopes must already exist for the API product that you associate with the developer app.",
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
  appFamily: z.string().optional(),
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
  developerId: z.string().optional(),
  keyExpiresIn: z.string().optional(),
  lastModifiedAt: z.string().optional(),
  name: z.string(),
  scopes: z.array(z.string()).optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiProducts: z.array(z.string()).describe(
    "List of API products associated with the developer app.",
  ).optional(),
  appFamily: z.string().describe("Developer app family.").optional(),
  appId: z.string().describe(
    "ID of the developer app. This ID is not user specified but is automatically generated on app creation. appId is a UUID.",
  ).optional(),
  attributes: z.array(z.object({
    name: z.string().describe("API key of the attribute.").optional(),
    value: z.string().describe("Value of the attribute.").optional(),
  })).describe("List of attributes for the developer app.").optional(),
  callbackUrl: z.string().describe(
    "Callback URL used by OAuth 2.0 authorization servers to communicate authorization codes back to developer apps.",
  ).optional(),
  developerId: z.string().describe("ID of the developer.").optional(),
  keyExpiresIn: z.string().describe(
    "Expiration time, in milliseconds, for the consumer key that is generated for the developer app. If not set or left to the default value of `-1`, the API key never expires. The expiration time can't be updated after it is set.",
  ).optional(),
  name: z.string().describe("Name of the developer app.").optional(),
  scopes: z.array(z.string()).describe(
    "Scopes to apply to the developer app. The specified scopes must already exist for the API product that you associate with the developer app.",
  ).optional(),
  status: z.string().describe(
    "Status of the credential. Valid values include `approved` or `revoked`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Apigee Developers.Apps. Registered at `@swamp/gcp/apigee/developers-apps`. */
export const model = {
  type: "@swamp/gcp/apigee/developers-apps",
  version: "2026.06.07.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns the details for a developer app.",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiProducts"] !== undefined) {
          body["apiProducts"] = g["apiProducts"];
        }
        if (g["appFamily"] !== undefined) body["appFamily"] = g["appFamily"];
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["callbackUrl"] !== undefined) {
          body["callbackUrl"] = g["callbackUrl"];
        }
        if (g["developerId"] !== undefined) {
          body["developerId"] = g["developerId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["appFamily"] !== undefined) body["appFamily"] = g["appFamily"];
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["callbackUrl"] !== undefined) {
          body["callbackUrl"] = g["callbackUrl"];
        }
        if (g["developerId"] !== undefined) {
          body["developerId"] = g["developerId"];
        }
        if (g["keyExpiresIn"] !== undefined) {
          body["keyExpiresIn"] = g["keyExpiresIn"];
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
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List apps resources",
      arguments: z.object({
        count: z.string().describe(
          "Number of developer apps to return in the API call. Use with the `startKey` parameter to provide more targeted filtering. The limit is 1000.",
        ).optional(),
        expand: z.boolean().describe(
          "Optional. Specifies whether to expand the results. Set to `true` to expand the results. This query parameter is not valid if you use the `count` or `startKey` query parameters. **Note**: If set to `true`, the `apigee.developerapps.get` permission is required.",
        ).optional(),
        shallowExpand: z.boolean().describe(
          "Optional. Specifies whether to expand the results in shallow mode. Set to `true` to expand the results in shallow mode. **Note**: If set to `true`, the `apigee.developerapps.get` permission is required.",
        ).optional(),
        startKey: z.string().describe(
          "**Note**: Must be used in conjunction with the `count` parameter. Name of the developer app from which to start displaying the list of developer apps. For example, if you're returning 50 developer apps at a time (using the `count` query parameter), you can view developer apps 50-99 by entering the name of the 50th developer app. The developer app name is case sensitive.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["count"] !== undefined) {
          params["count"] = String(args["count"]);
        }
        if (args["expand"] !== undefined) {
          params["expand"] = String(args["expand"]);
        }
        if (args["shallowExpand"] !== undefined) {
          params["shallowExpand"] = String(args["shallowExpand"]);
        }
        if (args["startKey"] !== undefined) {
          params["startKey"] = String(args["startKey"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "app",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    attributes: {
      description: "attributes",
      arguments: z.object({
        attribute: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["attribute"] !== undefined) {
          body["attribute"] = args["attribute"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.developers.apps.attributes",
            "path": "v1/{+name}/attributes",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    generate_key_pair_or_update_developer_app_status: {
      description: "generate key pair or update developer app status",
      arguments: z.object({
        apiProducts: z.any().optional(),
        appFamily: z.any().optional(),
        appId: z.any().optional(),
        attributes: z.any().optional(),
        callbackUrl: z.any().optional(),
        createdAt: z.any().optional(),
        credentials: z.any().optional(),
        developerId: z.any().optional(),
        keyExpiresIn: z.any().optional(),
        lastModifiedAt: z.any().optional(),
        name: z.any().optional(),
        scopes: z.any().optional(),
        status: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["appFamily"] !== undefined) {
          body["appFamily"] = args["appFamily"];
        }
        if (args["appId"] !== undefined) body["appId"] = args["appId"];
        if (args["attributes"] !== undefined) {
          body["attributes"] = args["attributes"];
        }
        if (args["callbackUrl"] !== undefined) {
          body["callbackUrl"] = args["callbackUrl"];
        }
        if (args["createdAt"] !== undefined) {
          body["createdAt"] = args["createdAt"];
        }
        if (args["credentials"] !== undefined) {
          body["credentials"] = args["credentials"];
        }
        if (args["developerId"] !== undefined) {
          body["developerId"] = args["developerId"];
        }
        if (args["keyExpiresIn"] !== undefined) {
          body["keyExpiresIn"] = args["keyExpiresIn"];
        }
        if (args["lastModifiedAt"] !== undefined) {
          body["lastModifiedAt"] = args["lastModifiedAt"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["scopes"] !== undefined) body["scopes"] = args["scopes"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.developers.apps.generateKeyPairOrUpdateDeveloperAppStatus",
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
