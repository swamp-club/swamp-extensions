// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/backupdr/restoretemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service RestoreTemplates.
 *
 * A `RestoreTemplate` encapsulates DR readiness configurations for validating backups.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/restoreTemplates/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.restoreTemplates.get",
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
  "id": "backupdr.projects.locations.restoreTemplates.create",
  "path": "v1/{+parent}/restoreTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "restoreTemplateId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "backupdr.projects.locations.restoreTemplates.patch",
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
  "id": "backupdr.projects.locations.restoreTemplates.delete",
  "path": "v1/{+name}",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "backupdr.projects.locations.restoreTemplates.list",
  "path": "v1/{+parent}/restoreTemplates",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  backupSelectionConfig: z.object({
    dataSource: z.string().describe(
      "Required. Immutable. The fully qualified URI of the backupdr data source.",
    ).optional(),
  }).describe("Required. Backup selection configuration.").optional(),
  description: z.string().describe(
    "Optional. User-provided description of the restore template.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the RestoreTemplate.",
  ).optional(),
  postRestoreConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Post-restore configuration.").optional(),
  preRestoreConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Pre-restore configuration.").optional(),
  resourceType: z.string().describe(
    'Required. Immutable. The specific type of the workload being restored. The format is "{service_name}/{resource_kind}", for example, "compute.googleapis.com/Instance".',
  ).optional(),
  restoreProperties: z.record(z.string(), z.string()).describe(
    'Required. Defines target environments where the resource will be restored. The target resource name in `restore_properties` supports the `{EXECUTION_ID}` token to dynamically generate unique resource names for each execution. During restore execution, every occurrence of `{EXECUTION_ID}` in the target resource name is replaced with the 8-character `RestoreTemplateExecution` ID (for example, `"restored-resource-{EXECUTION_ID}"` or `"restored-{EXECUTION_ID}-resource"` resolves to `"restored-resource-5d437b06"` or `"restored-5d437b06-resource"`).',
  ).optional(),
  verificationConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Verification configuration.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  restoreTemplateId: z.string().describe(
    "Required. The ID of the restore template to create. The ID must be unique for the specified project and location.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupSelectionConfig: z.object({
    dataSource: z.string(),
  }).partial().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  executionSummary: z.object({
    lastExecution: z.string(),
    lastExecutionState: z.string(),
  }).partial().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  postRestoreConfig: z.object({
    cloudRunJob: z.string(),
    timeout: z.string(),
  }).partial().optional(),
  preRestoreConfig: z.object({
    cloudRunJob: z.string(),
    timeout: z.string(),
  }).partial().optional(),
  resourceType: z.string().optional(),
  restoreProperties: z.record(z.string(), z.unknown()).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  verificationConfig: z.object({
    cloudRunJob: z.string(),
    timeout: z.string(),
  }).partial().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  backupSelectionConfig: z.object({
    dataSource: z.string().describe(
      "Required. Immutable. The fully qualified URI of the backupdr data source.",
    ).optional(),
  }).describe("Required. Backup selection configuration.").optional(),
  description: z.string().describe(
    "Optional. User-provided description of the restore template.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the RestoreTemplate.",
  ).optional(),
  postRestoreConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Post-restore configuration.").optional(),
  preRestoreConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Pre-restore configuration.").optional(),
  resourceType: z.string().describe(
    'Required. Immutable. The specific type of the workload being restored. The format is "{service_name}/{resource_kind}", for example, "compute.googleapis.com/Instance".',
  ).optional(),
  restoreProperties: z.record(z.string(), z.string()).describe(
    'Required. Defines target environments where the resource will be restored. The target resource name in `restore_properties` supports the `{EXECUTION_ID}` token to dynamically generate unique resource names for each execution. During restore execution, every occurrence of `{EXECUTION_ID}` in the target resource name is replaced with the 8-character `RestoreTemplateExecution` ID (for example, `"restored-resource-{EXECUTION_ID}"` or `"restored-{EXECUTION_ID}-resource"` resolves to `"restored-resource-5d437b06"` or `"restored-5d437b06-resource"`).',
  ).optional(),
  verificationConfig: z.object({
    cloudRunJob: z.string().describe(
      "Cloud Run job action to execute. Format: `projects/{project}/locations/{location}/jobs/{job}`",
    ).optional(),
    timeout: z.string().describe(
      "Optional. The `timeout` for this phase. If set, the `timeout` must be positive and less than or equal to 24 hours (86400s).",
    ).optional(),
  }).describe("Optional. Verification configuration.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  restoreTemplateId: z.string().describe(
    "Required. The ID of the restore template to create. The ID must be unique for the specified project and location.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Backup and DR Service RestoreTemplates. Registered at `@swamp/gcp/backupdr/restoretemplates`. */
export const model = {
  type: "@swamp/gcp/backupdr/restoretemplates",
  version: "2026.11.08.1",
  upgrades: [
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `RestoreTemplate` encapsulates DR readiness configurations for validating b...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a restoreTemplates",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["backupSelectionConfig"] !== undefined) {
          body["backupSelectionConfig"] = g["backupSelectionConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["postRestoreConfig"] !== undefined) {
          body["postRestoreConfig"] = g["postRestoreConfig"];
        }
        if (g["preRestoreConfig"] !== undefined) {
          body["preRestoreConfig"] = g["preRestoreConfig"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["restoreProperties"] !== undefined) {
          body["restoreProperties"] = g["restoreProperties"];
        }
        if (g["verificationConfig"] !== undefined) {
          body["verificationConfig"] = g["verificationConfig"];
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["restoreTemplateId"] !== undefined) {
          params["restoreTemplateId"] = String(g["restoreTemplateId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a restoreTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the restoreTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update restoreTemplates attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific restoreTemplates by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["backupSelectionConfig"] !== undefined) {
          body["backupSelectionConfig"] = g["backupSelectionConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["postRestoreConfig"] !== undefined) {
          body["postRestoreConfig"] = g["postRestoreConfig"];
        }
        if (g["preRestoreConfig"] !== undefined) {
          body["preRestoreConfig"] = g["preRestoreConfig"];
        }
        if (g["restoreProperties"] !== undefined) {
          body["restoreProperties"] = g["restoreProperties"];
        }
        if (g["verificationConfig"] !== undefined) {
          body["verificationConfig"] = g["verificationConfig"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the restoreTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the restoreTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync restoreTemplates state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific restoreTemplates by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List restoreTemplates resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Field match expression used to filter the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field by which to sort the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of items to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "restoreTemplates",
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
    run: {
      description: "run",
      arguments: z.object({
        backup: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "backupdr.projects.locations.restoreTemplates.run",
            "path": "v1/{+name}:run",
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
  },
};
