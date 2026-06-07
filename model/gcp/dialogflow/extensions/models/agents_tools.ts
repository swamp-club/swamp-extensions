// Auto-generated extension model for @swamp/gcp/dialogflow/agents-tools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Tools.
 *
 * GCP dialogflow Agents.Tools resource
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
  return `${parent}/tools/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.tools.get",
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
  "id": "dialogflow.projects.locations.agents.tools.create",
  "path": "v3/{+parent}/tools",
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
  "id": "dialogflow.projects.locations.agents.tools.patch",
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
  "id": "dialogflow.projects.locations.agents.tools.delete",
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
  "id": "dialogflow.projects.locations.agents.tools.list",
  "path": "v3/{+parent}/tools",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  dataStoreSpec: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    fallbackPrompt: z.object({}).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  functionSpec: z.object({
    inputSchema: z.record(z.string(), z.string()).optional(),
    outputSchema: z.record(z.string(), z.string()).optional(),
  }).optional(),
  name: z.string().optional(),
  openApiSpec: z.object({
    authentication: z.object({
      apiKeyConfig: z.object({
        apiKey: z.string().optional(),
        keyName: z.string().optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).optional(),
        secretVersionForApiKey: z.string().optional(),
      }).optional(),
      bearerTokenConfig: z.object({
        secretVersionForToken: z.string().optional(),
        token: z.string().optional(),
      }).optional(),
      oauthConfig: z.object({
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).optional(),
        scopes: z.array(z.string()).optional(),
        secretVersionForClientSecret: z.string().optional(),
        tokenEndpoint: z.string().optional(),
      }).optional(),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string().optional(),
      }).optional(),
      serviceAgentAuthConfig: z.object({
        serviceAgentAuth: z.enum([
          "SERVICE_AGENT_AUTH_UNSPECIFIED",
          "ID_TOKEN",
          "ACCESS_TOKEN",
        ]).optional(),
      }).optional(),
    }).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().optional(),
    }).optional(),
    textSchema: z.string().optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().optional(),
        displayName: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  toolType: z.enum(["TOOL_TYPE_UNSPECIFIED", "CUSTOMIZED_TOOL", "BUILTIN_TOOL"])
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  dataStoreSpec: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string(),
      dataStoreType: z.string(),
      documentProcessingMode: z.string(),
    })),
    fallbackPrompt: z.object({}),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  functionSpec: z.object({
    inputSchema: z.record(z.string(), z.unknown()),
    outputSchema: z.record(z.string(), z.unknown()),
  }).optional(),
  name: z.string(),
  openApiSpec: z.object({
    authentication: z.object({
      apiKeyConfig: z.object({
        apiKey: z.string(),
        keyName: z.string(),
        requestLocation: z.string(),
        secretVersionForApiKey: z.string(),
      }),
      bearerTokenConfig: z.object({
        secretVersionForToken: z.string(),
        token: z.string(),
      }),
      oauthConfig: z.object({
        clientId: z.string(),
        clientSecret: z.string(),
        oauthGrantType: z.string(),
        scopes: z.array(z.string()),
        secretVersionForClientSecret: z.string(),
        tokenEndpoint: z.string(),
      }),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string(),
      }),
      serviceAgentAuthConfig: z.object({
        serviceAgentAuth: z.string(),
      }),
    }),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    textSchema: z.string(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string(),
        displayName: z.string(),
      })),
    }),
  }).optional(),
  toolType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  dataStoreSpec: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    fallbackPrompt: z.object({}).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  functionSpec: z.object({
    inputSchema: z.record(z.string(), z.string()).optional(),
    outputSchema: z.record(z.string(), z.string()).optional(),
  }).optional(),
  name: z.string().optional(),
  openApiSpec: z.object({
    authentication: z.object({
      apiKeyConfig: z.object({
        apiKey: z.string().optional(),
        keyName: z.string().optional(),
        requestLocation: z.enum([
          "REQUEST_LOCATION_UNSPECIFIED",
          "HEADER",
          "QUERY_STRING",
        ]).optional(),
        secretVersionForApiKey: z.string().optional(),
      }).optional(),
      bearerTokenConfig: z.object({
        secretVersionForToken: z.string().optional(),
        token: z.string().optional(),
      }).optional(),
      oauthConfig: z.object({
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
        oauthGrantType: z.enum([
          "OAUTH_GRANT_TYPE_UNSPECIFIED",
          "CLIENT_CREDENTIAL",
        ]).optional(),
        scopes: z.array(z.string()).optional(),
        secretVersionForClientSecret: z.string().optional(),
        tokenEndpoint: z.string().optional(),
      }).optional(),
      serviceAccountAuthConfig: z.object({
        serviceAccount: z.string().optional(),
      }).optional(),
      serviceAgentAuthConfig: z.object({
        serviceAgentAuth: z.enum([
          "SERVICE_AGENT_AUTH_UNSPECIFIED",
          "ID_TOKEN",
          "ACCESS_TOKEN",
        ]).optional(),
      }).optional(),
    }).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().optional(),
    }).optional(),
    textSchema: z.string().optional(),
    tlsConfig: z.object({
      caCerts: z.array(z.object({
        cert: z.string().optional(),
        displayName: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  toolType: z.enum(["TOOL_TYPE_UNSPECIFIED", "CUSTOMIZED_TOOL", "BUILTIN_TOOL"])
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Dialogflow Agents.Tools. Registered at `@swamp/gcp/dialogflow/agents-tools`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-tools",
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
      description: "GCP dialogflow Agents.Tools resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tools",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataStoreSpec"] !== undefined) {
          body["dataStoreSpec"] = g["dataStoreSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["functionSpec"] !== undefined) {
          body["functionSpec"] = g["functionSpec"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["openApiSpec"] !== undefined) {
          body["openApiSpec"] = g["openApiSpec"];
        }
        if (g["toolType"] !== undefined) body["toolType"] = g["toolType"];
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
      description: "Get a tools",
      arguments: z.object({
        identifier: z.string().describe("The name of the tools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update tools attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["dataStoreSpec"] !== undefined) {
          body["dataStoreSpec"] = g["dataStoreSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["functionSpec"] !== undefined) {
          body["functionSpec"] = g["functionSpec"];
        }
        if (g["openApiSpec"] !== undefined) {
          body["openApiSpec"] = g["openApiSpec"];
        }
        if (g["toolType"] !== undefined) body["toolType"] = g["toolType"];
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
      description: "Delete the tools",
      arguments: z.object({
        identifier: z.string().describe("The name of the tools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync tools state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List tools resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "tools",
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
  },
};
