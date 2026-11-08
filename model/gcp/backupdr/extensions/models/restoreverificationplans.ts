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

// Auto-generated extension model for @swamp/gcp/backupdr/restoreverificationplans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service RestoreVerificationPlans.
 *
 * A `RestoreVerificationPlan` specifies the scheduling and clean-up template for automated restore verification. It contains a `RestoreVerificationSchedule` to dictate when the verifications should run, and a `CleanupConfig` for post-verification resource deletion.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/restoreVerificationPlans/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.restoreVerificationPlans.get",
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
  "id": "backupdr.projects.locations.restoreVerificationPlans.create",
  "path": "v1/{+parent}/restoreVerificationPlans",
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
    "restoreVerificationPlanId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "backupdr.projects.locations.restoreVerificationPlans.delete",
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
  "id": "backupdr.projects.locations.restoreVerificationPlans.list",
  "path": "v1/{+parent}/restoreVerificationPlans",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  description: z.string().describe(
    'Optional. The description of the `RestoreVerificationPlan` resource. The description allows for additional details about `RestoreVerificationPlan` and its use cases to be provided. An example description is the following: "This is a restore verification plan that performs a daily verification and cleans up the resources immediately after." The description must be at most 2048 characters.',
  ).optional(),
  failureCleanupRule: z.object({
    cleanupDelay: z.string().describe(
      "Optional. Duration after restore finishes when cleanup triggers. Delay must be non-negative and at most 30 days (2592000 seconds).",
    ).optional(),
    skipCleanup: z.boolean().describe(
      "Optional. If set to true, the restored resource will not be cleaned up.",
    ).optional(),
  }).describe(
    "Optional. The cleanup rule to apply if the restore verification fails.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  schedule: z.string().describe(
    "Required. Describes the schedule on which the restore verification will be executed. The schedule is specified as a [Crontab](https://en.wikipedia.org/wiki/Cron#Overview) string.",
  ).optional(),
  successCleanupRule: z.object({
    cleanupDelay: z.string().describe(
      "Optional. Duration after restore finishes when cleanup triggers. Delay must be non-negative and at most 30 days (2592000 seconds).",
    ).optional(),
    skipCleanup: z.boolean().describe(
      "Optional. If set to true, the restored resource will not be cleaned up.",
    ).optional(),
  }).describe(
    "Optional. The cleanup rule to apply if the restore verification succeeds.",
  ).optional(),
  timeZone: z.string().describe(
    'Optional. Specifies the time zone to be used in interpreting schedule. The value of this field must be a time zone name from the [tz database](https://en.wikipedia.org/wiki/Tz_database), like "America/New_York" or "UTC". Defaults to `UTC` if not specified.',
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  restoreVerificationPlanId: z.string().describe(
    "Required. The name of the `RestoreVerificationPlan` to create. The name must be unique for the specified project and location. The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, `^[a-z]([-a-z0-9]*[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  failureCleanupRule: z.object({
    cleanupDelay: z.string(),
    skipCleanup: z.boolean(),
  }).partial().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  schedule: z.string().optional(),
  state: z.string().optional(),
  successCleanupRule: z.object({
    cleanupDelay: z.string(),
    skipCleanup: z.boolean(),
  }).partial().optional(),
  timeZone: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe(
    'Optional. The description of the `RestoreVerificationPlan` resource. The description allows for additional details about `RestoreVerificationPlan` and its use cases to be provided. An example description is the following: "This is a restore verification plan that performs a daily verification and cleans up the resources immediately after." The description must be at most 2048 characters.',
  ).optional(),
  failureCleanupRule: z.object({
    cleanupDelay: z.string().describe(
      "Optional. Duration after restore finishes when cleanup triggers. Delay must be non-negative and at most 30 days (2592000 seconds).",
    ).optional(),
    skipCleanup: z.boolean().describe(
      "Optional. If set to true, the restored resource will not be cleaned up.",
    ).optional(),
  }).describe(
    "Optional. The cleanup rule to apply if the restore verification fails.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  schedule: z.string().describe(
    "Required. Describes the schedule on which the restore verification will be executed. The schedule is specified as a [Crontab](https://en.wikipedia.org/wiki/Cron#Overview) string.",
  ).optional(),
  successCleanupRule: z.object({
    cleanupDelay: z.string().describe(
      "Optional. Duration after restore finishes when cleanup triggers. Delay must be non-negative and at most 30 days (2592000 seconds).",
    ).optional(),
    skipCleanup: z.boolean().describe(
      "Optional. If set to true, the restored resource will not be cleaned up.",
    ).optional(),
  }).describe(
    "Optional. The cleanup rule to apply if the restore verification succeeds.",
  ).optional(),
  timeZone: z.string().describe(
    'Optional. Specifies the time zone to be used in interpreting schedule. The value of this field must be a time zone name from the [tz database](https://en.wikipedia.org/wiki/Tz_database), like "America/New_York" or "UTC". Defaults to `UTC` if not specified.',
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  restoreVerificationPlanId: z.string().describe(
    "Required. The name of the `RestoreVerificationPlan` to create. The name must be unique for the specified project and location. The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, `^[a-z]([-a-z0-9]*[a-z0-9])?$`.",
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

/** Swamp extension model for Google Cloud Backup and DR Service RestoreVerificationPlans. Registered at `@swamp/gcp/backupdr/restoreverificationplans`. */
export const model = {
  type: "@swamp/gcp/backupdr/restoreverificationplans",
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
        "A `RestoreVerificationPlan` specifies the scheduling and clean-up template fo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a restoreVerificationPlans",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failureCleanupRule"] !== undefined) {
          body["failureCleanupRule"] = g["failureCleanupRule"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["successCleanupRule"] !== undefined) {
          body["successCleanupRule"] = g["successCleanupRule"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["restoreVerificationPlanId"] !== undefined) {
          params["restoreVerificationPlanId"] = String(
            g["restoreVerificationPlanId"],
          );
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
              "failedValues": ["ERROR"],
            }
            : undefined,
          undefined,
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
      description: "Get a restoreVerificationPlans",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the restoreVerificationPlans",
        ),
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
    delete: {
      description: "Delete the restoreVerificationPlans",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the restoreVerificationPlans",
        ),
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
      description: "Sync restoreVerificationPlans state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific restoreVerificationPlans by name (e.g. one discovered by list)",
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
      description: "List restoreVerificationPlans resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Field match expression used to filter the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field by which to sort the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of `RestoreVerificationPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried.",
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
          "restoreVerificationPlans",
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
