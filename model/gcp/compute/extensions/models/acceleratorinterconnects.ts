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

// Auto-generated extension model for @swamp/gcp/compute/acceleratorinterconnects
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine AcceleratorInterconnects.
 *
 * Represents an Accelerator Interconnect resource.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.acceleratorInterconnects.get",
  "path":
    "projects/{project}/zones/{zone}/acceleratorInterconnects/{acceleratorInterconnect}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "acceleratorInterconnect",
  ],
  "parameters": {
    "acceleratorInterconnect": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.acceleratorInterconnects.insert",
  "path": "projects/{project}/zones/{zone}/acceleratorInterconnects",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.acceleratorInterconnects.delete",
  "path":
    "projects/{project}/zones/{zone}/acceleratorInterconnects/{acceleratorInterconnect}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "acceleratorInterconnect",
  ],
  "parameters": {
    "acceleratorInterconnect": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.acceleratorInterconnects.list",
  "path": "projects/{project}/zones/{zone}/acceleratorInterconnects",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "zone": {
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
  resource: z.object({
    acceleratorTopology: z.string().describe(
      'The target topology shape (e.g. "4x4x8").',
    ).optional(),
    annotations: z.record(z.string(), z.string()).describe(
      "The annotations for the accelerator interconnect.",
    ).optional(),
    creationTimestamp: z.string().describe(
      "Output only. [Output Only] The creation time of this resource inRFC3339 text format.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource.",
    ).optional(),
    id: z.string().describe(
      "Output only. [Output Only] A unique identifier for this resource type.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels for the accelerator interconnect.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "The name of the resource. The name must be 1-63 characters long, and comply withRFC1035.",
      ).optional(),
    params: z.object({
      capacityPool: z.object({
        partitionIds: z.array(z.string()).describe(
          "The list of physical topology block identifiers.",
        ).optional(),
        resources: z.array(z.string()).describe(
          "A list of fully qualified resource names that form the logical bounds. Both full and relative URIs are supported.",
        ).optional(),
      }).describe("The capacity pool to use for the accelerator interconnect.")
        .optional(),
    }).describe(
      "Input only. [Input Only] Additional params passed with the creation request, but not persisted as part of resource payload.",
    ).optional(),
    reactivationMode: z.enum(["MANUAL", "REACTIVATION_MODE_UNSPECIFIED"])
      .describe("The reactivation mode for the accelerator interconnect.")
      .optional(),
    selfLink: z.string().describe(
      "Output only. [Output Only] The fully-qualified URL of this resource.",
    ).optional(),
    selfLinkWithId: z.string().describe(
      "Output only. [Output Only] The fully-qualified URL of this resource containing its unique identifier.",
    ).optional(),
    status: z.object({
      acceleratorType: z.string().describe(
        'Output only. [Output Only] The accelerator type (e.g., "TPU7X").',
      ).optional(),
      state: z.enum([
        "ACTIVATING",
        "ACTIVE",
        "ACTIVE_DEGRADED",
        "DEACTIVATING",
        "FAILED",
        "STATE_UNSPECIFIED",
      ]).describe(
        "Output only. [Output Only] The current state of the interconnect.",
      ).optional(),
      stateDetails: z.object({
        error: z.object({
          errors: z.array(z.unknown()).describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe("Output only. Encountered errors.").optional(),
        timestamp: z.string().describe(
          "Output only. Timestamp is shown only if there is an error.",
        ).optional(),
      }).describe(
        "Output only. [Output Only] The result of the latest accelerator topology state check.",
      ).optional(),
    }).describe("Output only. [Output Only] The status of the interconnect.")
      .optional(),
    zone: z.string().describe(
      "Output only. [Output Only] The URL of azone where the interconnect resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
    ).optional(),
  }).describe("Required. The accelerator interconnect resource to insert.")
    .optional(),
  zone: z.string().describe(
    "The name of the zone where you want to create the accelerator interconnect. Zone name should conform to RFC1035.",
  ),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  acceleratorTopology: z.string().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  params: z.object({
    capacityPool: z.object({
      partitionIds: z.array(z.string()),
      resources: z.array(z.string()),
    }),
  }).optional(),
  reactivationMode: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  status: z.object({
    acceleratorType: z.string(),
    state: z.string(),
    stateDetails: z.object({
      error: z.object({
        errors: z.array(z.object({
          code: z.unknown(),
          errorDetails: z.unknown(),
          location: z.unknown(),
          message: z.unknown(),
        })),
      }),
      timestamp: z.string(),
    }),
  }).optional(),
  zone: z.string().optional(),
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
  resource: z.object({
    acceleratorTopology: z.string().describe(
      'The target topology shape (e.g. "4x4x8").',
    ).optional(),
    annotations: z.record(z.string(), z.string()).describe(
      "The annotations for the accelerator interconnect.",
    ).optional(),
    creationTimestamp: z.string().describe(
      "Output only. [Output Only] The creation time of this resource inRFC3339 text format.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource.",
    ).optional(),
    id: z.string().describe(
      "Output only. [Output Only] A unique identifier for this resource type.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels for the accelerator interconnect.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "The name of the resource. The name must be 1-63 characters long, and comply withRFC1035.",
      ).optional(),
    params: z.object({
      capacityPool: z.object({
        partitionIds: z.array(z.string()).describe(
          "The list of physical topology block identifiers.",
        ).optional(),
        resources: z.array(z.string()).describe(
          "A list of fully qualified resource names that form the logical bounds. Both full and relative URIs are supported.",
        ).optional(),
      }).describe("The capacity pool to use for the accelerator interconnect.")
        .optional(),
    }).describe(
      "Input only. [Input Only] Additional params passed with the creation request, but not persisted as part of resource payload.",
    ).optional(),
    reactivationMode: z.enum(["MANUAL", "REACTIVATION_MODE_UNSPECIFIED"])
      .describe("The reactivation mode for the accelerator interconnect.")
      .optional(),
    selfLink: z.string().describe(
      "Output only. [Output Only] The fully-qualified URL of this resource.",
    ).optional(),
    selfLinkWithId: z.string().describe(
      "Output only. [Output Only] The fully-qualified URL of this resource containing its unique identifier.",
    ).optional(),
    status: z.object({
      acceleratorType: z.string().describe(
        'Output only. [Output Only] The accelerator type (e.g., "TPU7X").',
      ).optional(),
      state: z.enum([
        "ACTIVATING",
        "ACTIVE",
        "ACTIVE_DEGRADED",
        "DEACTIVATING",
        "FAILED",
        "STATE_UNSPECIFIED",
      ]).describe(
        "Output only. [Output Only] The current state of the interconnect.",
      ).optional(),
      stateDetails: z.object({
        error: z.object({
          errors: z.array(z.unknown()).describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe("Output only. Encountered errors.").optional(),
        timestamp: z.string().describe(
          "Output only. Timestamp is shown only if there is an error.",
        ).optional(),
      }).describe(
        "Output only. [Output Only] The result of the latest accelerator topology state check.",
      ).optional(),
    }).describe("Output only. [Output Only] The status of the interconnect.")
      .optional(),
    zone: z.string().describe(
      "Output only. [Output Only] The URL of azone where the interconnect resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
    ).optional(),
  }).describe("Required. The accelerator interconnect resource to insert.")
    .optional(),
  zone: z.string().describe(
    "The name of the zone where you want to create the accelerator interconnect. Zone name should conform to RFC1035.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine AcceleratorInterconnects. Registered at `@swamp/gcp/compute/acceleratorinterconnects`. */
export const model = {
  type: "@swamp/gcp/compute/acceleratorinterconnects",
  version: "2026.09.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents an Accelerator Interconnect resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a acceleratorInterconnects",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["resource"] !== undefined) body["resource"] = g["resource"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) {
          params["acceleratorInterconnect"] = String(g["name"]);
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
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
      description: "Get a acceleratorInterconnects",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the acceleratorInterconnects",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["acceleratorInterconnect"] = args.identifier;
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
      description: "Delete the acceleratorInterconnects",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the acceleratorInterconnects",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["acceleratorInterconnect"] = args.identifier;
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
      description: "Sync acceleratorInterconnects state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific acceleratorInterconnects by name (e.g. one discovered by list)",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["acceleratorInterconnect"] = identifier;
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
      description: "List acceleratorInterconnects resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    query_formability: {
      description: "query formability",
      arguments: z.object({
        subblocks: z.any().optional(),
        filter: z.any().optional(),
        maxResults: z.any().optional(),
        orderBy: z.any().optional(),
        pageToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        const body: Record<string, unknown> = {};
        if (args["subblocks"] !== undefined) {
          body["subblocks"] = args["subblocks"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.acceleratorInterconnects.queryFormability",
            "path":
              "projects/{project}/zones/{zone}/acceleratorInterconnects:queryFormability",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
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
