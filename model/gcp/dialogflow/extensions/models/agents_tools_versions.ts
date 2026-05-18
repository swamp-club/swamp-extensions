// Auto-generated extension model for @swamp/gcp/dialogflow/agents-tools-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Tools.Versions.
 *
 * GCP dialogflow Agents.Tools.Versions resource
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
  return `${parent}/versions/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.tools.versions.get",
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
  "id": "dialogflow.projects.locations.agents.tools.versions.create",
  "path": "v3/{+parent}/versions",
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
  "id": "dialogflow.projects.locations.agents.tools.versions.delete",
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

const GlobalArgsSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  tool: z.object({
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
          scopes: z.array(z.unknown()).optional(),
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
          cert: z.unknown().optional(),
          displayName: z.unknown().optional(),
        })).optional(),
      }).optional(),
    }).optional(),
    toolType: z.enum([
      "TOOL_TYPE_UNSPECIFIED",
      "CUSTOMIZED_TOOL",
      "BUILTIN_TOOL",
    ]).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  tool: z.object({
    dataStoreSpec: z.object({
      dataStoreConnections: z.array(z.object({
        dataStore: z.string(),
        dataStoreType: z.string(),
        documentProcessingMode: z.string(),
      })),
      fallbackPrompt: z.object({}),
    }),
    description: z.string(),
    displayName: z.string(),
    functionSpec: z.object({
      inputSchema: z.record(z.string(), z.unknown()),
      outputSchema: z.record(z.string(), z.unknown()),
    }),
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
          scopes: z.array(z.unknown()),
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
          cert: z.unknown(),
          displayName: z.unknown(),
        })),
      }),
    }),
    toolType: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  tool: z.object({
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
          scopes: z.array(z.unknown()).optional(),
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
          cert: z.unknown().optional(),
          displayName: z.unknown().optional(),
        })).optional(),
      }).optional(),
    }).optional(),
    toolType: z.enum([
      "TOOL_TYPE_UNSPECIFIED",
      "CUSTOMIZED_TOOL",
      "BUILTIN_TOOL",
    ]).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.Tools.Versions. Registered at `@swamp/gcp/dialogflow/agents-tools-versions`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-tools-versions",
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
      toVersion: "2026.04.04.1",
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
      description: "GCP dialogflow Agents.Tools.Versions resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a versions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tool"] !== undefined) body["tool"] = g["tool"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
    delete: {
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Sync versions state from GCP",
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
    restore: {
      description: "restore",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.tools.versions.restore",
            "path": "v3/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
