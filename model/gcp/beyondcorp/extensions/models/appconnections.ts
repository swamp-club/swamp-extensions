// Auto-generated extension model for @swamp/gcp/beyondcorp/appconnections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BeyondCorp AppConnections.
 *
 * A BeyondCorp AppConnection resource represents a BeyondCorp protected AppConnection to a remote application. It creates all the necessary GCP components needed for creating a BeyondCorp protected AppConnection. Multiple connectors can be authorized for a single AppConnection.
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
  return `${parent}/appConnections/${shortName}`;
}

const BASE_URL = "https://beyondcorp.googleapis.com/";

const GET_CONFIG = {
  "id": "beyondcorp.projects.locations.appConnections.get",
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
  "id": "beyondcorp.projects.locations.appConnections.create",
  "path": "v1/{+parent}/appConnections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "appConnectionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "beyondcorp.projects.locations.appConnections.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "beyondcorp.projects.locations.appConnections.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  applicationEndpoint: z.object({
    host: z.string().describe(
      "Required. Hostname or IP address of the remote application endpoint.",
    ).optional(),
    port: z.number().int().describe(
      "Required. Port of the remote application endpoint.",
    ).optional(),
  }).describe("ApplicationEndpoint represents a remote application endpoint.")
    .optional(),
  connectors: z.array(z.string()).describe(
    "Optional. List of [google.cloud.beyondcorp.v1main.Connector.name] that are authorized to be associated with this AppConnection.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the AppConnection. Cannot exceed 64 characters.",
  ).optional(),
  gateway: z.object({
    appGateway: z.string().describe(
      "Required. AppGateway name in following format: `projects/{project_id}/locations/{location_id}/appgateways/{gateway_id}`",
    ).optional(),
    ingressPort: z.number().int().describe(
      "Output only. Ingress port reserved on the gateways for this AppConnection, if not specified or zero, the default port is 19443.",
    ).optional(),
    l7psc: z.string().describe(
      "Output only. L7 private service connection for this resource.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "GCP_REGIONAL_MIG"]).describe(
      "Required. The type of hosting used by the gateway.",
    ).optional(),
    uri: z.string().describe(
      "Output only. Server-defined URI for this resource.",
    ).optional(),
  }).describe(
    "Gateway represents a user facing component that serves as an entrance to enable connectivity.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Required. Unique resource name of the AppConnection. The name is ignored when creating a AppConnection.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TCP_PROXY"]).describe(
    "Required. The type of network connectivity used by the AppConnection.",
  ).optional(),
  appConnectionId: z.string().describe(
    "Optional. User-settable AppConnection resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or a letter.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  applicationEndpoint: z.object({
    host: z.string(),
    port: z.number(),
  }).optional(),
  connectors: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  gateway: z.object({
    appGateway: z.string(),
    ingressPort: z.number(),
    l7psc: z.string(),
    type: z.string(),
    uri: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  applicationEndpoint: z.object({
    host: z.string().describe(
      "Required. Hostname or IP address of the remote application endpoint.",
    ).optional(),
    port: z.number().int().describe(
      "Required. Port of the remote application endpoint.",
    ).optional(),
  }).describe("ApplicationEndpoint represents a remote application endpoint.")
    .optional(),
  connectors: z.array(z.string()).describe(
    "Optional. List of [google.cloud.beyondcorp.v1main.Connector.name] that are authorized to be associated with this AppConnection.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. An arbitrary user-provided name for the AppConnection. Cannot exceed 64 characters.",
  ).optional(),
  gateway: z.object({
    appGateway: z.string().describe(
      "Required. AppGateway name in following format: `projects/{project_id}/locations/{location_id}/appgateways/{gateway_id}`",
    ).optional(),
    ingressPort: z.number().int().describe(
      "Output only. Ingress port reserved on the gateways for this AppConnection, if not specified or zero, the default port is 19443.",
    ).optional(),
    l7psc: z.string().describe(
      "Output only. L7 private service connection for this resource.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "GCP_REGIONAL_MIG"]).describe(
      "Required. The type of hosting used by the gateway.",
    ).optional(),
    uri: z.string().describe(
      "Output only. Server-defined URI for this resource.",
    ).optional(),
  }).describe(
    "Gateway represents a user facing component that serves as an entrance to enable connectivity.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Required. Unique resource name of the AppConnection. The name is ignored when creating a AppConnection.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TCP_PROXY"]).describe(
    "Required. The type of network connectivity used by the AppConnection.",
  ).optional(),
  appConnectionId: z.string().describe(
    "Optional. User-settable AppConnection resource ID. * Must start with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end with a number or a letter.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BeyondCorp AppConnections. Registered at `@swamp/gcp/beyondcorp/appconnections`. */
export const model = {
  type: "@swamp/gcp/beyondcorp/appconnections",
  version: "2026.05.20.1",
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
      toVersion: "2026.04.13.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A BeyondCorp AppConnection resource represents a BeyondCorp protected AppConn...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a appConnections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["applicationEndpoint"] !== undefined) {
          body["applicationEndpoint"] = g["applicationEndpoint"];
        }
        if (g["connectors"] !== undefined) body["connectors"] = g["connectors"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gateway"] !== undefined) body["gateway"] = g["gateway"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["appConnectionId"] !== undefined) {
          body["appConnectionId"] = g["appConnectionId"];
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
      description: "Get a appConnections",
      arguments: z.object({
        identifier: z.string().describe("The name of the appConnections"),
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
      description: "Update appConnections attributes",
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
        if (g["applicationEndpoint"] !== undefined) {
          body["applicationEndpoint"] = g["applicationEndpoint"];
        }
        if (g["connectors"] !== undefined) body["connectors"] = g["connectors"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gateway"] !== undefined) body["gateway"] = g["gateway"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the appConnections",
      arguments: z.object({
        identifier: z.string().describe("The name of the appConnections"),
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
      description: "Sync appConnections state from GCP",
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
    resolve: {
      description: "resolve",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id": "beyondcorp.projects.locations.appConnections.resolve",
            "path": "v1/{+parent}/appConnections:resolve",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "appConnectorId": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
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
