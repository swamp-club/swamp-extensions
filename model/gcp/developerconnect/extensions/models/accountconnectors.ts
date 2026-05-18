// Auto-generated extension model for @swamp/gcp/developerconnect/accountconnectors
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Developer Connect AccountConnectors.
 *
 * AccountConnector encapsulates what a platform administrator needs to configure for users to connect to the service providers, which includes, among other fields, the OAuth client ID, client secret, and authorization and token endpoints.
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
  return `${parent}/accountConnectors/${shortName}`;
}

const BASE_URL = "https://developerconnect.googleapis.com/";

const GET_CONFIG = {
  "id": "developerconnect.projects.locations.accountConnectors.get",
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
  "id": "developerconnect.projects.locations.accountConnectors.create",
  "path": "v1/{+parent}/accountConnectors",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "accountConnectorId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "developerconnect.projects.locations.accountConnectors.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "developerconnect.projects.locations.accountConnectors.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows users to store small amounts of arbitrary data.",
  ).optional(),
  customOauthConfig: z.object({
    authUri: z.string().describe(
      "Required. Immutable. The OAuth2 authorization server URL.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The client ID of the OAuth application.",
    ).optional(),
    clientSecret: z.string().describe(
      "Required. Input only. The client secret of the OAuth application. It will be provided as plain text, but encrypted and stored in developer connect. As INPUT_ONLY field, it will not be included in the output.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The host URI of the OAuth application.",
    ).optional(),
    pkceDisabled: z.boolean().describe(
      "Optional. Disable PKCE for this OAuth config. PKCE is enabled by default.",
    ).optional(),
    scmProvider: z.enum([
      "SCM_PROVIDER_UNKNOWN",
      "GITHUB_ENTERPRISE",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
    ]).describe("Required. The type of the SCM provider.").optional(),
    scopes: z.array(z.string()).describe(
      "Required. The scopes to be requested during OAuth.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. SCM server version installed at the host URI.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate to use for requests to a private service.",
    ).optional(),
    tokenUri: z.string().describe(
      "Required. Immutable. The OAuth2 token request URL.",
    ).optional(),
  }).describe("Message for a customized OAuth config.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`.",
  ).optional(),
  providerOauthConfig: z.object({
    scopes: z.array(z.string()).describe(
      "Required. User selected scopes to apply to the Oauth config In the event of changing scopes, user records under AccountConnector will be deleted and users will re-auth again.",
    ).optional(),
    systemProviderId: z.enum([
      "SYSTEM_PROVIDER_UNSPECIFIED",
      "GITHUB",
      "GITLAB",
      "GOOGLE",
      "SENTRY",
      "ROVO",
      "NEW_RELIC",
      "DATASTAX",
      "DYNATRACE",
    ]).describe("Optional. Immutable. Developer Connect provided OAuth.")
      .optional(),
  }).describe("ProviderOAuthConfig is the OAuth config for a provider.")
    .optional(),
  proxyConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Setting this to true allows the git and http proxies to perform actions on behalf of the user configured under the account connector.",
    ).optional(),
  }).describe("The proxy configuration.").optional(),
  accountConnectorId: z.string().describe(
    "Required. The ID to use for the AccountConnector, which will become the final component of the AccountConnector's resource name. Its format should adhere to https://google.aip.dev/122#resource-id-segments Names must be unique per-project per-location.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  customOauthConfig: z.object({
    authUri: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    hostUri: z.string(),
    pkceDisabled: z.boolean(),
    scmProvider: z.string(),
    scopes: z.array(z.string()),
    serverVersion: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCaCertificate: z.string(),
    tokenUri: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  oauthStartUri: z.string().optional(),
  providerOauthConfig: z.object({
    scopes: z.array(z.string()),
    systemProviderId: z.string(),
  }).optional(),
  proxyConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Allows users to store small amounts of arbitrary data.",
  ).optional(),
  customOauthConfig: z.object({
    authUri: z.string().describe(
      "Required. Immutable. The OAuth2 authorization server URL.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The client ID of the OAuth application.",
    ).optional(),
    clientSecret: z.string().describe(
      "Required. Input only. The client secret of the OAuth application. It will be provided as plain text, but encrypted and stored in developer connect. As INPUT_ONLY field, it will not be included in the output.",
    ).optional(),
    hostUri: z.string().describe(
      "Required. The host URI of the OAuth application.",
    ).optional(),
    pkceDisabled: z.boolean().describe(
      "Optional. Disable PKCE for this OAuth config. PKCE is enabled by default.",
    ).optional(),
    scmProvider: z.enum([
      "SCM_PROVIDER_UNKNOWN",
      "GITHUB_ENTERPRISE",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
    ]).describe("Required. The type of the SCM provider.").optional(),
    scopes: z.array(z.string()).describe(
      "Required. The scopes to be requested during OAuth.",
    ).optional(),
    serverVersion: z.string().describe(
      "Output only. SCM server version installed at the host URI.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a connection.",
    ).optional(),
    sslCaCertificate: z.string().describe(
      "Optional. SSL certificate to use for requests to a private service.",
    ).optional(),
    tokenUri: z.string().describe(
      "Required. Immutable. The OAuth2 token request URL.",
    ).optional(),
  }).describe("Message for a customized OAuth config.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`.",
  ).optional(),
  providerOauthConfig: z.object({
    scopes: z.array(z.string()).describe(
      "Required. User selected scopes to apply to the Oauth config In the event of changing scopes, user records under AccountConnector will be deleted and users will re-auth again.",
    ).optional(),
    systemProviderId: z.enum([
      "SYSTEM_PROVIDER_UNSPECIFIED",
      "GITHUB",
      "GITLAB",
      "GOOGLE",
      "SENTRY",
      "ROVO",
      "NEW_RELIC",
      "DATASTAX",
      "DYNATRACE",
    ]).describe("Optional. Immutable. Developer Connect provided OAuth.")
      .optional(),
  }).describe("ProviderOAuthConfig is the OAuth config for a provider.")
    .optional(),
  proxyConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Setting this to true allows the git and http proxies to perform actions on behalf of the user configured under the account connector.",
    ).optional(),
  }).describe("The proxy configuration.").optional(),
  accountConnectorId: z.string().describe(
    "Required. The ID to use for the AccountConnector, which will become the final component of the AccountConnector's resource name. Its format should adhere to https://google.aip.dev/122#resource-id-segments Names must be unique per-project per-location.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Developer Connect AccountConnectors. Registered at `@swamp/gcp/developerconnect/accountconnectors`. */
export const model = {
  type: "@swamp/gcp/developerconnect/accountconnectors",
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
      toVersion: "2026.04.09.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "AccountConnector encapsulates what a platform administrator needs to configur...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accountConnectors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["customOauthConfig"] !== undefined) {
          body["customOauthConfig"] = g["customOauthConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["providerOauthConfig"] !== undefined) {
          body["providerOauthConfig"] = g["providerOauthConfig"];
        }
        if (g["proxyConfig"] !== undefined) {
          body["proxyConfig"] = g["proxyConfig"];
        }
        if (g["accountConnectorId"] !== undefined) {
          body["accountConnectorId"] = g["accountConnectorId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a accountConnectors",
      arguments: z.object({
        identifier: z.string().describe("The name of the accountConnectors"),
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
      description: "Update accountConnectors attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["customOauthConfig"] !== undefined) {
          body["customOauthConfig"] = g["customOauthConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["providerOauthConfig"] !== undefined) {
          body["providerOauthConfig"] = g["providerOauthConfig"];
        }
        if (g["proxyConfig"] !== undefined) {
          body["proxyConfig"] = g["proxyConfig"];
        }
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
      description: "Delete the accountConnectors",
      arguments: z.object({
        identifier: z.string().describe("The name of the accountConnectors"),
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
      description: "Sync accountConnectors state from GCP",
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
    fetch_user_repositories: {
      description: "fetch user repositories",
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
        params["accountConnector"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "developerconnect.projects.locations.accountConnectors.fetchUserRepositories",
            "path": "v1/{+accountConnector}:fetchUserRepositories",
            "httpMethod": "GET",
            "parameterOrder": ["accountConnector"],
            "parameters": {
              "accountConnector": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "repository": { "location": "query" },
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
