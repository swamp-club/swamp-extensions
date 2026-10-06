// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/firebaseapphosting/backends-traffic
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Hosting Backends.Traffic.
 *
 * Controls traffic configuration for the backend.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://firebaseapphosting.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.traffic.get",
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

const PATCH_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.traffic.patch",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Time at which the backend was created.",
  ).optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "Output only. Current state of traffic allocation for the backend. When setting `target`, this field may differ for some time until the desired state is reached.",
  ).optional(),
  etag: z.string().describe(
    "Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`.",
  ).optional(),
  reconciling: z.boolean().describe(
    "Output only. A field that, if true, indicates that the system is working to make the backend's `current` match the requested `target` list.",
  ).optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string().describe(
      "If set, specifies a branch that triggers a new build to be started with this policy. Otherwise, no automatic rollouts will happen.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. A flag that, if true, prevents automatic rollouts from being created via this RolloutPolicy.",
    ).optional(),
    disabledTime: z.string().describe(
      "Output only. If `disabled` is set, the time at which the automatic rollouts were disabled.",
    ).optional(),
    ignoredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns to exclude from triggering a rollout. Patterns in this list take precedence over required_paths. **Note**: All paths must be in the ignored_paths in order for the rollout to be skipped. Limited to 100 paths. Example: ` ignored_paths: { pattern: "foo/bar/excluded/*", type: "GLOB" } `',
    ).optional(),
    requiredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns that trigger a build and rollout if at least one of the changed files in the commit are present in this list. This field is optional; the rollout policy will default to triggering on all paths if both ignored_paths and required_paths are not populated. Limited to 100 paths. Example: ` required_paths: { pattern: "foo/bar/*", type: "GLOB" } `',
    ).optional(),
  }).describe(
    "A rollout policy specifies how new builds and automatic deployments are created.",
  ).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "Set to manually control the desired traffic for the backend. This will cause `current` to eventually match this value. The percentages must add up to 100%.",
  ).optional(),
  uid: z.string().describe("Output only. System-assigned, unique identifier.")
    .optional(),
  updateTime: z.string().describe(
    "Output only. Time at which the backend was last updated.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string(),
      percent: z.number(),
    })),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string(),
    disabled: z.boolean(),
    disabledTime: z.string(),
    ignoredPaths: z.array(z.object({
      pattern: z.string(),
      type: z.string(),
    })),
    requiredPaths: z.array(z.object({
      pattern: z.string(),
      type: z.string(),
    })),
  }).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string(),
      percent: z.number(),
    })),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Time at which the backend was created.",
  ).optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "Output only. Current state of traffic allocation for the backend. When setting `target`, this field may differ for some time until the desired state is reached.",
  ).optional(),
  etag: z.string().describe(
    "Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`.",
  ).optional(),
  reconciling: z.boolean().describe(
    "Output only. A field that, if true, indicates that the system is working to make the backend's `current` match the requested `target` list.",
  ).optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string().describe(
      "If set, specifies a branch that triggers a new build to be started with this policy. Otherwise, no automatic rollouts will happen.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. A flag that, if true, prevents automatic rollouts from being created via this RolloutPolicy.",
    ).optional(),
    disabledTime: z.string().describe(
      "Output only. If `disabled` is set, the time at which the automatic rollouts were disabled.",
    ).optional(),
    ignoredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns to exclude from triggering a rollout. Patterns in this list take precedence over required_paths. **Note**: All paths must be in the ignored_paths in order for the rollout to be skipped. Limited to 100 paths. Example: ` ignored_paths: { pattern: "foo/bar/excluded/*", type: "GLOB" } `',
    ).optional(),
    requiredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns that trigger a build and rollout if at least one of the changed files in the commit are present in this list. This field is optional; the rollout policy will default to triggering on all paths if both ignored_paths and required_paths are not populated. Limited to 100 paths. Example: ` required_paths: { pattern: "foo/bar/*", type: "GLOB" } `',
    ).optional(),
  }).describe(
    "A rollout policy specifies how new builds and automatic deployments are created.",
  ).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "Set to manually control the desired traffic for the backend. This will cause `current` to eventually match this value. The percentages must add up to 100%.",
  ).optional(),
  uid: z.string().describe("Output only. System-assigned, unique identifier.")
    .optional(),
  updateTime: z.string().describe(
    "Output only. Time at which the backend was last updated.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Firebase App Hosting Backends.Traffic. Registered at `@swamp/gcp/firebaseapphosting/backends-traffic`. */
export const model = {
  type: "@swamp/gcp/firebaseapphosting/backends-traffic",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Controls traffic configuration for the backend.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a traffic",
      arguments: z.object({
        identifier: z.string().describe("The name of the traffic"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Update traffic attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific traffic by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["name"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["current"] !== undefined) body["current"] = g["current"];
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["reconciling"] !== undefined) {
          body["reconciling"] = g["reconciling"];
        }
        if (g["rolloutPolicy"] !== undefined) {
          body["rolloutPolicy"] = g["rolloutPolicy"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        } else if (existing["requestId"] !== undefined) {
          params["requestId"] = String(existing["requestId"]);
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
    sync: {
      description: "Sync traffic state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific traffic by name (e.g. one discovered by list)",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
  },
};
