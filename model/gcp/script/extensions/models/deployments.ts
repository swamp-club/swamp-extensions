// Auto-generated extension model for @swamp/gcp/script/deployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apps Script Deployments.
 *
 * Representation of a single script deployment.
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

const BASE_URL = "https://script.googleapis.com/";

const GET_CONFIG = {
  "id": "script.projects.deployments.get",
  "path": "v1/projects/{scriptId}/deployments/{deploymentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "scriptId",
    "deploymentId",
  ],
  "parameters": {
    "deploymentId": {
      "location": "path",
      "required": true,
    },
    "scriptId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "script.projects.deployments.create",
  "path": "v1/projects/{scriptId}/deployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "scriptId",
  ],
  "parameters": {
    "scriptId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "script.projects.deployments.update",
  "path": "v1/projects/{scriptId}/deployments/{deploymentId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "scriptId",
    "deploymentId",
  ],
  "parameters": {
    "deploymentId": {
      "location": "path",
      "required": true,
    },
    "scriptId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "script.projects.deployments.delete",
  "path": "v1/projects/{scriptId}/deployments/{deploymentId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "scriptId",
    "deploymentId",
  ],
  "parameters": {
    "deploymentId": {
      "location": "path",
      "required": true,
    },
    "scriptId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "script.projects.deployments.list",
  "path": "v1/projects/{scriptId}/deployments",
  "httpMethod": "GET",
  "parameterOrder": [
    "scriptId",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "scriptId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  description: z.string().describe("The description for this deployment.")
    .optional(),
  manifestFileName: z.string().describe(
    "The manifest file name for this deployment.",
  ).optional(),
  scriptId: z.string().describe("The script project's Drive ID.").optional(),
  versionNumber: z.number().int().describe(
    "The version number on which this deployment is based.",
  ).optional(),
  deploymentConfig: z.object({
    description: z.string().describe("The description for this deployment.")
      .optional(),
    manifestFileName: z.string().describe(
      "The manifest file name for this deployment.",
    ).optional(),
    scriptId: z.string().describe("The script project's Drive ID.").optional(),
    versionNumber: z.number().int().describe(
      "The version number on which this deployment is based.",
    ).optional(),
  }).describe("Metadata the defines how a deployment is configured.")
    .optional(),
});

const StateSchema = z.object({
  deploymentConfig: z.object({
    description: z.string(),
    manifestFileName: z.string(),
    scriptId: z.string(),
    versionNumber: z.number(),
  }).optional(),
  deploymentId: z.string().optional(),
  entryPoints: z.array(z.object({
    addOn: z.object({
      addOnType: z.string(),
      description: z.string(),
      helpUrl: z.string(),
      postInstallTipUrl: z.string(),
      reportIssueUrl: z.string(),
      title: z.string(),
    }),
    entryPointType: z.string(),
    executionApi: z.object({
      entryPointConfig: z.object({
        access: z.string(),
      }),
    }),
    webApp: z.object({
      entryPointConfig: z.object({
        access: z.string(),
        executeAs: z.string(),
      }),
      url: z.string(),
    }),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe("The description for this deployment.")
    .optional(),
  manifestFileName: z.string().describe(
    "The manifest file name for this deployment.",
  ).optional(),
  scriptId: z.string().describe("The script project's Drive ID.").optional(),
  versionNumber: z.number().int().describe(
    "The version number on which this deployment is based.",
  ).optional(),
  deploymentConfig: z.object({
    description: z.string().describe("The description for this deployment.")
      .optional(),
    manifestFileName: z.string().describe(
      "The manifest file name for this deployment.",
    ).optional(),
    scriptId: z.string().describe("The script project's Drive ID.").optional(),
    versionNumber: z.number().int().describe(
      "The version number on which this deployment is based.",
    ).optional(),
  }).describe("Metadata the defines how a deployment is configured.")
    .optional(),
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

/** Swamp extension model for Google Cloud Apps Script Deployments. Registered at `@swamp/gcp/script/deployments`. */
export const model = {
  type: "@swamp/gcp/script/deployments",
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
      description: "Representation of a single script deployment.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deployments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["scriptId"] !== undefined) {
          params["scriptId"] = String(g["scriptId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["manifestFileName"] !== undefined) {
          body["manifestFileName"] = g["manifestFileName"];
        }
        if (g["versionNumber"] !== undefined) {
          body["versionNumber"] = g["versionNumber"];
        }
        if (g["name"] !== undefined) params["deploymentId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "scriptId": String(g["scriptId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["scriptId"] !== undefined) {
          params["scriptId"] = String(g["scriptId"]);
        }
        params["deploymentId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    update: {
      description: "Update deployments attributes",
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
        if (g["scriptId"] !== undefined) {
          params["scriptId"] = String(g["scriptId"]);
        } else if (existing["scriptId"]) {
          params["scriptId"] = String(existing["scriptId"]);
        }
        params["deploymentId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["deploymentConfig"] !== undefined) {
          body["deploymentConfig"] = g["deploymentConfig"];
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["scriptId"] !== undefined) {
          params["scriptId"] = String(g["scriptId"]);
        }
        params["deploymentId"] = args.identifier;
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
      description: "Sync deployments state from GCP",
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
          if (g["scriptId"] !== undefined) {
            params["scriptId"] = String(g["scriptId"]);
          } else if (existing["scriptId"]) {
            params["scriptId"] = String(existing["scriptId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["deploymentId"] = identifier;
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
      description: "List deployments resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of deployments on each returned page. Defaults to 50.",
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
        if (g["scriptId"] !== undefined) {
          params["scriptId"] = String(g["scriptId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "deployments",
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
