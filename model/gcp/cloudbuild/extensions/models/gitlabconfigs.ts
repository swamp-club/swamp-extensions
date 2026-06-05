// Auto-generated extension model for @swamp/gcp/cloudbuild/gitlabconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Build GitLabConfigs.
 *
 * GitLabConfig represents the configuration for a GitLab integration.
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
  return `${parent}/gitLabConfigs/${shortName}`;
}

const BASE_URL = "https://cloudbuild.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudbuild.projects.locations.gitLabConfigs.get",
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
  "id": "cloudbuild.projects.locations.gitLabConfigs.create",
  "path": "v1/{+parent}/gitLabConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "gitlabConfigId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudbuild.projects.locations.gitLabConfigs.patch",
  "path": "v1/{+name}",
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
  "id": "cloudbuild.projects.locations.gitLabConfigs.delete",
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
  "id": "cloudbuild.projects.locations.gitLabConfigs.list",
  "path": "v1/{+parent}/gitLabConfigs",
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
  connectedRepositories: z.array(z.object({
    id: z.string().describe(
      'Required. Identifier for the repository. example: "namespace/project-slug", namespace is usually the username or group ID',
    ).optional(),
    webhookId: z.number().int().describe(
      "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
    ).optional(),
  })).describe(
    "Connected GitLab.com or GitLabEnterprise repositories for this config.",
  ).optional(),
  enterpriseConfig: z.object({
    hostUri: z.string().describe(
      "Immutable. The URI of the GitlabEnterprise host.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a SCM host connection.",
    ).optional(),
    sslCa: z.string().describe(
      "The SSL certificate to use in requests to GitLab Enterprise instances.",
    ).optional(),
  }).describe(
    "GitLabEnterpriseConfig represents the configuration for a GitLabEnterprise integration.",
  ).optional(),
  name: z.string().describe("The resource name for the config.").optional(),
  secrets: z.object({
    apiAccessTokenVersion: z.string().describe(
      "Required. The resource name for the api access token’s secret version",
    ).optional(),
    apiKeyVersion: z.string().describe(
      "Required. Immutable. API Key that will be attached to webhook requests from GitLab to Cloud Build.",
    ).optional(),
    readAccessTokenVersion: z.string().describe(
      "Required. The resource name for the read access token’s secret version",
    ).optional(),
    webhookSecretVersion: z.string().describe(
      "Required. Immutable. The resource name for the webhook secret’s secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another GitLabConfig.",
    ).optional(),
  }).describe(
    "GitLabSecrets represents the secrets in Secret Manager for a GitLab integration.",
  ).optional(),
  username: z.string().describe(
    "Username of the GitLab.com or GitLab Enterprise account Cloud Build will use.",
  ).optional(),
  gitlabConfigId: z.string().describe(
    "Optional. The ID to use for the GitLabConfig, which will become the final component of the GitLabConfig’s resource name. gitlab_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  connectedRepositories: z.array(z.object({
    id: z.string(),
    webhookId: z.number(),
  })).optional(),
  createTime: z.string().optional(),
  enterpriseConfig: z.object({
    hostUri: z.string(),
    serviceDirectoryConfig: z.object({
      service: z.string(),
    }),
    sslCa: z.string(),
  }).optional(),
  name: z.string(),
  secrets: z.object({
    apiAccessTokenVersion: z.string(),
    apiKeyVersion: z.string(),
    readAccessTokenVersion: z.string(),
    webhookSecretVersion: z.string(),
  }).optional(),
  username: z.string().optional(),
  webhookKey: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  connectedRepositories: z.array(z.object({
    id: z.string().describe(
      'Required. Identifier for the repository. example: "namespace/project-slug", namespace is usually the username or group ID',
    ).optional(),
    webhookId: z.number().int().describe(
      "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
    ).optional(),
  })).describe(
    "Connected GitLab.com or GitLabEnterprise repositories for this config.",
  ).optional(),
  enterpriseConfig: z.object({
    hostUri: z.string().describe(
      "Immutable. The URI of the GitlabEnterprise host.",
    ).optional(),
    serviceDirectoryConfig: z.object({
      service: z.string().describe(
        "The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
      ).optional(),
    }).describe(
      "ServiceDirectoryConfig represents Service Directory configuration for a SCM host connection.",
    ).optional(),
    sslCa: z.string().describe(
      "The SSL certificate to use in requests to GitLab Enterprise instances.",
    ).optional(),
  }).describe(
    "GitLabEnterpriseConfig represents the configuration for a GitLabEnterprise integration.",
  ).optional(),
  name: z.string().describe("The resource name for the config.").optional(),
  secrets: z.object({
    apiAccessTokenVersion: z.string().describe(
      "Required. The resource name for the api access token’s secret version",
    ).optional(),
    apiKeyVersion: z.string().describe(
      "Required. Immutable. API Key that will be attached to webhook requests from GitLab to Cloud Build.",
    ).optional(),
    readAccessTokenVersion: z.string().describe(
      "Required. The resource name for the read access token’s secret version",
    ).optional(),
    webhookSecretVersion: z.string().describe(
      "Required. Immutable. The resource name for the webhook secret’s secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another GitLabConfig.",
    ).optional(),
  }).describe(
    "GitLabSecrets represents the secrets in Secret Manager for a GitLab integration.",
  ).optional(),
  username: z.string().describe(
    "Username of the GitLab.com or GitLab Enterprise account Cloud Build will use.",
  ).optional(),
  gitlabConfigId: z.string().describe(
    "Optional. The ID to use for the GitLabConfig, which will become the final component of the GitLabConfig’s resource name. gitlab_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Build GitLabConfigs. Registered at `@swamp/gcp/cloudbuild/gitlabconfigs`. */
export const model = {
  type: "@swamp/gcp/cloudbuild/gitlabconfigs",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "GitLabConfig represents the configuration for a GitLab integration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a gitLabConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["connectedRepositories"] !== undefined) {
          body["connectedRepositories"] = g["connectedRepositories"];
        }
        if (g["enterpriseConfig"] !== undefined) {
          body["enterpriseConfig"] = g["enterpriseConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["secrets"] !== undefined) body["secrets"] = g["secrets"];
        if (g["username"] !== undefined) body["username"] = g["username"];
        if (g["gitlabConfigId"] !== undefined) {
          body["gitlabConfigId"] = g["gitlabConfigId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a gitLabConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the gitLabConfigs"),
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
      description: "Update gitLabConfigs attributes",
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
        if (g["connectedRepositories"] !== undefined) {
          body["connectedRepositories"] = g["connectedRepositories"];
        }
        if (g["enterpriseConfig"] !== undefined) {
          body["enterpriseConfig"] = g["enterpriseConfig"];
        }
        if (g["secrets"] !== undefined) body["secrets"] = g["secrets"];
        if (g["username"] !== undefined) body["username"] = g["username"];
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
      description: "Delete the gitLabConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the gitLabConfigs"),
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
      description: "Sync gitLabConfigs state from GCP",
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
      description: "List gitLabConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 50 configs will be returned. The maximum value is 1000;, values above 1000 will be coerced to 1000.",
        ).optional(),
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
          "gitlabConfigs",
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
