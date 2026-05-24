// Auto-generated extension model for @swamp/gcp/dialogflow/agents-environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Environments.
 *
 * GCP dialogflow Agents.Environments resource
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
  return `${parent}/environments/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.get",
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
  "id": "dialogflow.projects.locations.agents.environments.create",
  "path": "v3/{+parent}/environments",
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
  "id": "dialogflow.projects.locations.agents.environments.patch",
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
  "id": "dialogflow.projects.locations.agents.environments.delete",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.environments.list",
  "path": "v3/{+parent}/environments",
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
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  testCasesConfig: z.object({
    enableContinuousRun: z.boolean().optional(),
    enablePredeploymentRun: z.boolean().optional(),
    testCases: z.array(z.string()).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  versionConfigs: z.array(z.object({
    version: z.string().optional(),
  })).optional(),
  webhookConfig: z.object({
    webhookOverrides: z.array(z.object({
      disabled: z.boolean().optional(),
      displayName: z.string().optional(),
      genericWebService: z.object({
        allowedCaCerts: z.array(z.unknown()).optional(),
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
          clientId: z.unknown().optional(),
          clientSecret: z.unknown().optional(),
          scopes: z.unknown().optional(),
          secretVersionForClientSecret: z.unknown().optional(),
          tokenEndpoint: z.unknown().optional(),
        }).optional(),
        parameterMapping: z.record(z.string(), z.unknown()).optional(),
        password: z.string().optional(),
        requestBody: z.string().optional(),
        requestHeaders: z.record(z.string(), z.unknown()).optional(),
        secretVersionForUsernamePassword: z.string().optional(),
        secretVersionsForRequestHeaders: z.record(z.string(), z.unknown())
          .optional(),
        serviceAccountAuthConfig: z.object({
          serviceAccount: z.unknown().optional(),
        }).optional(),
        serviceAgentAuth: z.enum([
          "SERVICE_AGENT_AUTH_UNSPECIFIED",
          "NONE",
          "ID_TOKEN",
          "ACCESS_TOKEN",
        ]).optional(),
        uri: z.string().optional(),
        username: z.string().optional(),
        webhookType: z.enum([
          "WEBHOOK_TYPE_UNSPECIFIED",
          "STANDARD",
          "FLEXIBLE",
        ]).optional(),
      }).optional(),
      name: z.string().optional(),
      serviceDirectory: z.object({
        genericWebService: z.object({
          allowedCaCerts: z.unknown().optional(),
          httpMethod: z.unknown().optional(),
          oauthConfig: z.unknown().optional(),
          parameterMapping: z.unknown().optional(),
          password: z.unknown().optional(),
          requestBody: z.unknown().optional(),
          requestHeaders: z.unknown().optional(),
          secretVersionForUsernamePassword: z.unknown().optional(),
          secretVersionsForRequestHeaders: z.unknown().optional(),
          serviceAccountAuthConfig: z.unknown().optional(),
          serviceAgentAuth: z.unknown().optional(),
          uri: z.unknown().optional(),
          username: z.unknown().optional(),
          webhookType: z.unknown().optional(),
        }).optional(),
        service: z.string().optional(),
      }).optional(),
      timeout: z.string().optional(),
    })).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  testCasesConfig: z.object({
    enableContinuousRun: z.boolean(),
    enablePredeploymentRun: z.boolean(),
    testCases: z.array(z.string()),
  }).optional(),
  updateTime: z.string().optional(),
  versionConfigs: z.array(z.object({
    version: z.string(),
  })).optional(),
  webhookConfig: z.object({
    webhookOverrides: z.array(z.object({
      disabled: z.boolean(),
      displayName: z.string(),
      genericWebService: z.object({
        allowedCaCerts: z.array(z.unknown()),
        httpMethod: z.string(),
        oauthConfig: z.object({
          clientId: z.unknown(),
          clientSecret: z.unknown(),
          scopes: z.unknown(),
          secretVersionForClientSecret: z.unknown(),
          tokenEndpoint: z.unknown(),
        }),
        parameterMapping: z.record(z.string(), z.unknown()),
        password: z.string(),
        requestBody: z.string(),
        requestHeaders: z.record(z.string(), z.unknown()),
        secretVersionForUsernamePassword: z.string(),
        secretVersionsForRequestHeaders: z.record(z.string(), z.unknown()),
        serviceAccountAuthConfig: z.object({
          serviceAccount: z.unknown(),
        }),
        serviceAgentAuth: z.string(),
        uri: z.string(),
        username: z.string(),
        webhookType: z.string(),
      }),
      name: z.string(),
      serviceDirectory: z.object({
        genericWebService: z.object({
          allowedCaCerts: z.unknown(),
          httpMethod: z.unknown(),
          oauthConfig: z.unknown(),
          parameterMapping: z.unknown(),
          password: z.unknown(),
          requestBody: z.unknown(),
          requestHeaders: z.unknown(),
          secretVersionForUsernamePassword: z.unknown(),
          secretVersionsForRequestHeaders: z.unknown(),
          serviceAccountAuthConfig: z.unknown(),
          serviceAgentAuth: z.unknown(),
          uri: z.unknown(),
          username: z.unknown(),
          webhookType: z.unknown(),
        }),
        service: z.string(),
      }),
      timeout: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  testCasesConfig: z.object({
    enableContinuousRun: z.boolean().optional(),
    enablePredeploymentRun: z.boolean().optional(),
    testCases: z.array(z.string()).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  versionConfigs: z.array(z.object({
    version: z.string().optional(),
  })).optional(),
  webhookConfig: z.object({
    webhookOverrides: z.array(z.object({
      disabled: z.boolean().optional(),
      displayName: z.string().optional(),
      genericWebService: z.object({
        allowedCaCerts: z.array(z.unknown()).optional(),
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
          clientId: z.unknown().optional(),
          clientSecret: z.unknown().optional(),
          scopes: z.unknown().optional(),
          secretVersionForClientSecret: z.unknown().optional(),
          tokenEndpoint: z.unknown().optional(),
        }).optional(),
        parameterMapping: z.record(z.string(), z.unknown()).optional(),
        password: z.string().optional(),
        requestBody: z.string().optional(),
        requestHeaders: z.record(z.string(), z.unknown()).optional(),
        secretVersionForUsernamePassword: z.string().optional(),
        secretVersionsForRequestHeaders: z.record(z.string(), z.unknown())
          .optional(),
        serviceAccountAuthConfig: z.object({
          serviceAccount: z.unknown().optional(),
        }).optional(),
        serviceAgentAuth: z.enum([
          "SERVICE_AGENT_AUTH_UNSPECIFIED",
          "NONE",
          "ID_TOKEN",
          "ACCESS_TOKEN",
        ]).optional(),
        uri: z.string().optional(),
        username: z.string().optional(),
        webhookType: z.enum([
          "WEBHOOK_TYPE_UNSPECIFIED",
          "STANDARD",
          "FLEXIBLE",
        ]).optional(),
      }).optional(),
      name: z.string().optional(),
      serviceDirectory: z.object({
        genericWebService: z.object({
          allowedCaCerts: z.unknown().optional(),
          httpMethod: z.unknown().optional(),
          oauthConfig: z.unknown().optional(),
          parameterMapping: z.unknown().optional(),
          password: z.unknown().optional(),
          requestBody: z.unknown().optional(),
          requestHeaders: z.unknown().optional(),
          secretVersionForUsernamePassword: z.unknown().optional(),
          secretVersionsForRequestHeaders: z.unknown().optional(),
          serviceAccountAuthConfig: z.unknown().optional(),
          serviceAgentAuth: z.unknown().optional(),
          uri: z.unknown().optional(),
          username: z.unknown().optional(),
          webhookType: z.unknown().optional(),
        }).optional(),
        service: z.string().optional(),
      }).optional(),
      timeout: z.string().optional(),
    })).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.Environments. Registered at `@swamp/gcp/dialogflow/agents-environments`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-environments",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents.Environments resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a environments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["testCasesConfig"] !== undefined) {
          body["testCasesConfig"] = g["testCasesConfig"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["versionConfigs"] !== undefined) {
          body["versionConfigs"] = g["versionConfigs"];
        }
        if (g["webhookConfig"] !== undefined) {
          body["webhookConfig"] = g["webhookConfig"];
        }
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Update environments attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["testCasesConfig"] !== undefined) {
          body["testCasesConfig"] = g["testCasesConfig"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["versionConfigs"] !== undefined) {
          body["versionConfigs"] = g["versionConfigs"];
        }
        if (g["webhookConfig"] !== undefined) {
          body["webhookConfig"] = g["webhookConfig"];
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
      description: "Delete the environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Sync environments state from GCP",
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
    deploy_flow: {
      description: "deploy flow",
      arguments: z.object({
        flowVersion: z.any().optional(),
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["flowVersion"] !== undefined) {
          body["flowVersion"] = args["flowVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.environments.deployFlow",
            "path": "v3/{+environment}:deployFlow",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    lookup_environment_history: {
      description: "lookup environment history",
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
            "id":
              "dialogflow.projects.locations.agents.environments.lookupEnvironmentHistory",
            "path": "v3/{+name}:lookupEnvironmentHistory",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    run_continuous_test: {
      description: "run continuous test",
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.environments.runContinuousTest",
            "path": "v3/{+environment}:runContinuousTest",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
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
