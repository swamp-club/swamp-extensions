// Auto-generated extension model for @swamp/gcp/cloudbuild/githubenterpriseconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Build GithubEnterpriseConfigs.
 *
 * GitHubEnterpriseConfig represents a configuration for a GitHub Enterprise server.
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
  return `${parent}/githubEnterpriseConfigs/${shortName}`;
}

const BASE_URL = "https://cloudbuild.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudbuild.projects.githubEnterpriseConfigs.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "configId": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudbuild.projects.githubEnterpriseConfigs.create",
  "path": "v1/{+parent}/githubEnterpriseConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "gheConfigId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudbuild.projects.githubEnterpriseConfigs.patch",
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
  "id": "cloudbuild.projects.githubEnterpriseConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "configId": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudbuild.projects.githubEnterpriseConfigs.list",
  "path": "v1/{+parent}/githubEnterpriseConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  appId: z.string().describe(
    "Required. The GitHub app id of the Cloud Build app on the GitHub Enterprise server.",
  ).optional(),
  displayName: z.string().describe("Optional. Name to display for this config.")
    .optional(),
  hostUrl: z.string().describe(
    "The URL of the github enterprise host the configuration is for.",
  ).optional(),
  name: z.string().describe(
    'The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"',
  ).optional(),
  peeredNetwork: z.string().describe(
    "Optional. The network to be used when reaching out to the GitHub Enterprise server. The VPC network must be enabled for private service connection. This should be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the GitHub Enterprise server will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project.",
  ).optional(),
  secrets: z.object({
    oauthClientIdName: z.string().describe(
      "The resource name for the OAuth client ID secret in Secret Manager.",
    ).optional(),
    oauthClientIdVersionName: z.string().describe(
      "The resource name for the OAuth client ID secret version in Secret Manager.",
    ).optional(),
    oauthSecretName: z.string().describe(
      "The resource name for the OAuth secret in Secret Manager.",
    ).optional(),
    oauthSecretVersionName: z.string().describe(
      "The resource name for the OAuth secret secret version in Secret Manager.",
    ).optional(),
    privateKeyName: z.string().describe(
      "The resource name for the private key secret.",
    ).optional(),
    privateKeyVersionName: z.string().describe(
      "The resource name for the private key secret version.",
    ).optional(),
    webhookSecretName: z.string().describe(
      "The resource name for the webhook secret in Secret Manager.",
    ).optional(),
    webhookSecretVersionName: z.string().describe(
      "The resource name for the webhook secret secret version in Secret Manager.",
    ).optional(),
  }).describe(
    "GitHubEnterpriseSecrets represents the names of all necessary secrets in Secret Manager for a GitHub Enterprise server. Format is: projects//secrets/.",
  ).optional(),
  sslCa: z.string().describe(
    "Optional. SSL certificate to use for requests to GitHub Enterprise.",
  ).optional(),
  webhookKey: z.string().describe(
    "The key that should be attached to webhook calls to the ReceiveWebhook endpoint.",
  ).optional(),
  gheConfigId: z.string().describe(
    "Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appId: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  hostUrl: z.string().optional(),
  name: z.string(),
  peeredNetwork: z.string().optional(),
  secrets: z.object({
    oauthClientIdName: z.string(),
    oauthClientIdVersionName: z.string(),
    oauthSecretName: z.string(),
    oauthSecretVersionName: z.string(),
    privateKeyName: z.string(),
    privateKeyVersionName: z.string(),
    webhookSecretName: z.string(),
    webhookSecretVersionName: z.string(),
  }).optional(),
  sslCa: z.string().optional(),
  webhookKey: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appId: z.string().describe(
    "Required. The GitHub app id of the Cloud Build app on the GitHub Enterprise server.",
  ).optional(),
  displayName: z.string().describe("Optional. Name to display for this config.")
    .optional(),
  hostUrl: z.string().describe(
    "The URL of the github enterprise host the configuration is for.",
  ).optional(),
  name: z.string().describe(
    'The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"',
  ).optional(),
  peeredNetwork: z.string().describe(
    "Optional. The network to be used when reaching out to the GitHub Enterprise server. The VPC network must be enabled for private service connection. This should be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the GitHub Enterprise server will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project.",
  ).optional(),
  secrets: z.object({
    oauthClientIdName: z.string().describe(
      "The resource name for the OAuth client ID secret in Secret Manager.",
    ).optional(),
    oauthClientIdVersionName: z.string().describe(
      "The resource name for the OAuth client ID secret version in Secret Manager.",
    ).optional(),
    oauthSecretName: z.string().describe(
      "The resource name for the OAuth secret in Secret Manager.",
    ).optional(),
    oauthSecretVersionName: z.string().describe(
      "The resource name for the OAuth secret secret version in Secret Manager.",
    ).optional(),
    privateKeyName: z.string().describe(
      "The resource name for the private key secret.",
    ).optional(),
    privateKeyVersionName: z.string().describe(
      "The resource name for the private key secret version.",
    ).optional(),
    webhookSecretName: z.string().describe(
      "The resource name for the webhook secret in Secret Manager.",
    ).optional(),
    webhookSecretVersionName: z.string().describe(
      "The resource name for the webhook secret secret version in Secret Manager.",
    ).optional(),
  }).describe(
    "GitHubEnterpriseSecrets represents the names of all necessary secrets in Secret Manager for a GitHub Enterprise server. Format is: projects//secrets/.",
  ).optional(),
  sslCa: z.string().describe(
    "Optional. SSL certificate to use for requests to GitHub Enterprise.",
  ).optional(),
  webhookKey: z.string().describe(
    "The key that should be attached to webhook calls to the ReceiveWebhook endpoint.",
  ).optional(),
  gheConfigId: z.string().describe(
    "Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Build GithubEnterpriseConfigs. Registered at `@swamp/gcp/cloudbuild/githubenterpriseconfigs`. */
export const model = {
  type: "@swamp/gcp/cloudbuild/githubenterpriseconfigs",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "GitHubEnterpriseConfig represents a configuration for a GitHub Enterprise ser...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a githubEnterpriseConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["hostUrl"] !== undefined) body["hostUrl"] = g["hostUrl"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["peeredNetwork"] !== undefined) {
          body["peeredNetwork"] = g["peeredNetwork"];
        }
        if (g["secrets"] !== undefined) body["secrets"] = g["secrets"];
        if (g["sslCa"] !== undefined) body["sslCa"] = g["sslCa"];
        if (g["webhookKey"] !== undefined) body["webhookKey"] = g["webhookKey"];
        if (g["gheConfigId"] !== undefined) {
          body["gheConfigId"] = g["gheConfigId"];
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
      description: "Get a githubEnterpriseConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the githubEnterpriseConfigs",
        ),
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
      description: "Update githubEnterpriseConfigs attributes",
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
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["hostUrl"] !== undefined) body["hostUrl"] = g["hostUrl"];
        if (g["peeredNetwork"] !== undefined) {
          body["peeredNetwork"] = g["peeredNetwork"];
        }
        if (g["secrets"] !== undefined) body["secrets"] = g["secrets"];
        if (g["sslCa"] !== undefined) body["sslCa"] = g["sslCa"];
        if (g["webhookKey"] !== undefined) body["webhookKey"] = g["webhookKey"];
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
      description: "Delete the githubEnterpriseConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the githubEnterpriseConfigs",
        ),
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
      description: "Sync githubEnterpriseConfigs state from GCP",
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
      description: "List githubEnterpriseConfigs resources",
      arguments: z.object({
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "configs",
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
