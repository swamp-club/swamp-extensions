// Auto-generated extension model for @swamp/gcp/networkconnectivity/multiclouddatatransferconfigs-destinations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity MulticloudDataTransferConfigs.Destinations.
 *
 * The `Destination` resource. It specifies the IP prefix and the associated autonomous system numbers (ASN) that you want to include in a `MulticloudDataTransferConfig` resource.
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
  return `${parent}/destinations/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id":
    "networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.get",
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
  "id":
    "networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.create",
  "path": "v1/{+parent}/destinations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "destinationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
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
  "id":
    "networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.list",
  "path": "v1/{+parent}/destinations",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe("Optional. A description of this resource.")
    .optional(),
  endpoints: z.array(z.object({
    asn: z.string().describe("Required. The ASN of the remote IP prefix.")
      .optional(),
    csp: z.string().describe("Required. The CSP of the remote IP prefix.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "VALID", "INVALID"]).describe(
      "Output only. The state of the `DestinationEndpoint` resource.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Time when the `DestinationEndpoint` resource was updated.",
    ).optional(),
  })).describe(
    "Required. Unordered list. The list of `DestinationEndpoint` resources configured for the IP prefix.",
  ).optional(),
  ipPrefix: z.string().describe(
    "Required. Immutable. The IP prefix that represents your workload on another CSP.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`.",
  ).optional(),
  stateTimeline: z.object({
    states: z.array(z.object({
      effectiveTime: z.string().describe(
        "Output only. Accompanies only the transient states, which include `ADDING`, `DELETING`, and `SUSPENDING`, to denote the time until which the transient state of the resource will be effective. For instance, if the state is `ADDING`, this field shows the time when the resource state transitions to `ACTIVE`.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ADDING",
        "ACTIVE",
        "DELETING",
        "SUSPENDING",
        "SUSPENDED",
      ]).describe("Output only. The state of the resource.").optional(),
    })).describe(
      "Output only. The state and activation time details of the resource state.",
    ).optional(),
  }).describe("The timeline of the pending states for a resource.").optional(),
  destinationId: z.string().describe(
    "Required. The ID to use for the `Destination` resource, which becomes the final component of the `Destination` resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `Destination` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  endpoints: z.array(z.object({
    asn: z.string(),
    csp: z.string(),
    state: z.string(),
    updateTime: z.string(),
  })).optional(),
  etag: z.string().optional(),
  ipPrefix: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  stateTimeline: z.object({
    states: z.array(z.object({
      effectiveTime: z.string(),
      state: z.string(),
    })),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("Optional. A description of this resource.")
    .optional(),
  endpoints: z.array(z.object({
    asn: z.string().describe("Required. The ASN of the remote IP prefix.")
      .optional(),
    csp: z.string().describe("Required. The CSP of the remote IP prefix.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "VALID", "INVALID"]).describe(
      "Output only. The state of the `DestinationEndpoint` resource.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Time when the `DestinationEndpoint` resource was updated.",
    ).optional(),
  })).describe(
    "Required. Unordered list. The list of `DestinationEndpoint` resources configured for the IP prefix.",
  ).optional(),
  ipPrefix: z.string().describe(
    "Required. Immutable. The IP prefix that represents your workload on another CSP.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`.",
  ).optional(),
  stateTimeline: z.object({
    states: z.array(z.object({
      effectiveTime: z.string().describe(
        "Output only. Accompanies only the transient states, which include `ADDING`, `DELETING`, and `SUSPENDING`, to denote the time until which the transient state of the resource will be effective. For instance, if the state is `ADDING`, this field shows the time when the resource state transitions to `ACTIVE`.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ADDING",
        "ACTIVE",
        "DELETING",
        "SUSPENDING",
        "SUSPENDED",
      ]).describe("Output only. The state of the resource.").optional(),
    })).describe(
      "Output only. The state and activation time details of the resource state.",
    ).optional(),
  }).describe("The timeline of the pending states for a resource.").optional(),
  destinationId: z.string().describe(
    "Required. The ID to use for the `Destination` resource, which becomes the final component of the `Destination` resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `Destination` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity MulticloudDataTransferConfigs.Destinations. Registered at `@swamp/gcp/networkconnectivity/multiclouddatatransferconfigs-destinations`. */
export const model = {
  type:
    "@swamp/gcp/networkconnectivity/multiclouddatatransferconfigs-destinations",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The `Destination` resource. It specifies the IP prefix and the associated aut...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a destinations",
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
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["ipPrefix"] !== undefined) body["ipPrefix"] = g["ipPrefix"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["stateTimeline"] !== undefined) {
          body["stateTimeline"] = g["stateTimeline"];
        }
        if (g["destinationId"] !== undefined) {
          body["destinationId"] = g["destinationId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a destinations",
      arguments: z.object({
        identifier: z.string().describe("The name of the destinations"),
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
      description: "Update destinations attributes",
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
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["stateTimeline"] !== undefined) {
          body["stateTimeline"] = g["stateTimeline"];
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
      description: "Delete the destinations",
      arguments: z.object({
        identifier: z.string().describe("The name of the destinations"),
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
      description: "Sync destinations state from GCP",
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
  },
};
