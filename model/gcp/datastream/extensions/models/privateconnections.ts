// Auto-generated extension model for @swamp/gcp/datastream/privateconnections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Datastream PrivateConnections.
 *
 * The PrivateConnection resource is used to establish private connectivity between Datastream and a customer's network.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/privateConnections/${shortName}`;
}

const BASE_URL = "https://datastream.googleapis.com/";

const GET_CONFIG = {
  "id": "datastream.projects.locations.privateConnections.get",
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
  "id": "datastream.projects.locations.privateConnections.create",
  "path": "v1/{+parent}/privateConnections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "privateConnectionId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datastream.projects.locations.privateConnections.delete",
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
  "id": "datastream.projects.locations.privateConnections.list",
  "path": "v1/{+parent}/privateConnections",
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
  displayName: z.string().describe("Required. Display name.").optional(),
  error: z.object({
    details: z.record(z.string(), z.string()).describe(
      "Additional information about the error.",
    ).optional(),
    errorTime: z.string().describe("The time when the error occurred.")
      .optional(),
    errorUuid: z.string().describe(
      "A unique identifier for this specific error, allowing it to be traced throughout the system in logs and API responses.",
    ).optional(),
    message: z.string().describe(
      "A message containing more information about the error that occurred.",
    ).optional(),
    reason: z.string().describe(
      "A title that explains the reason for the error.",
    ).optional(),
  }).describe("Represent a user-facing Error.").optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  pscInterfaceConfig: z.object({
    networkAttachment: z.string().describe(
      "Required. Fully qualified name of the Network Attachment that Datastream will connect to. Format: `projects/{project}/regions/{region}/networkAttachments/{name}`",
    ).optional(),
  }).describe(
    "The PSC Interface configuration is used to create PSC Interface between Datastream and the consumer's PSC.",
  ).optional(),
  vpcPeeringConfig: z.object({
    subnet: z.string().describe(
      "Required. A free subnet for peering. (CIDR of /29)",
    ).optional(),
    vpc: z.string().describe(
      "Required. Fully qualified name of the VPC that Datastream will peer to. Format: `projects/{project}/global/{networks}/{name}`",
    ).optional(),
  }).describe(
    "The VPC Peering configuration is used to create VPC peering between Datastream and the consumer's VPC.",
  ).optional(),
  force: z.string().describe("Optional. If set to true, will skip validations.")
    .optional(),
  privateConnectionId: z.string().describe(
    "Required. The private connectivity identifier.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    details: z.record(z.string(), z.unknown()),
    errorTime: z.string(),
    errorUuid: z.string(),
    message: z.string(),
    reason: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  pscInterfaceConfig: z.object({
    networkAttachment: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  vpcPeeringConfig: z.object({
    subnet: z.string(),
    vpc: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().describe("Required. Display name.").optional(),
  error: z.object({
    details: z.record(z.string(), z.string()).describe(
      "Additional information about the error.",
    ).optional(),
    errorTime: z.string().describe("The time when the error occurred.")
      .optional(),
    errorUuid: z.string().describe(
      "A unique identifier for this specific error, allowing it to be traced throughout the system in logs and API responses.",
    ).optional(),
    message: z.string().describe(
      "A message containing more information about the error that occurred.",
    ).optional(),
    reason: z.string().describe(
      "A title that explains the reason for the error.",
    ).optional(),
  }).describe("Represent a user-facing Error.").optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  pscInterfaceConfig: z.object({
    networkAttachment: z.string().describe(
      "Required. Fully qualified name of the Network Attachment that Datastream will connect to. Format: `projects/{project}/regions/{region}/networkAttachments/{name}`",
    ).optional(),
  }).describe(
    "The PSC Interface configuration is used to create PSC Interface between Datastream and the consumer's PSC.",
  ).optional(),
  vpcPeeringConfig: z.object({
    subnet: z.string().describe(
      "Required. A free subnet for peering. (CIDR of /29)",
    ).optional(),
    vpc: z.string().describe(
      "Required. Fully qualified name of the VPC that Datastream will peer to. Format: `projects/{project}/global/{networks}/{name}`",
    ).optional(),
  }).describe(
    "The VPC Peering configuration is used to create VPC peering between Datastream and the consumer's VPC.",
  ).optional(),
  force: z.string().describe("Optional. If set to true, will skip validations.")
    .optional(),
  privateConnectionId: z.string().describe(
    "Required. The private connectivity identifier.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Datastream PrivateConnections. Registered at `@swamp/gcp/datastream/privateconnections`. */
export const model = {
  type: "@swamp/gcp/datastream/privateconnections",
  version: "2026.05.21.2",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The PrivateConnection resource is used to establish private connectivity betw...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a privateConnections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["pscInterfaceConfig"] !== undefined) {
          body["pscInterfaceConfig"] = g["pscInterfaceConfig"];
        }
        if (g["vpcPeeringConfig"] !== undefined) {
          body["vpcPeeringConfig"] = g["vpcPeeringConfig"];
        }
        if (g["force"] !== undefined) body["force"] = g["force"];
        if (g["privateConnectionId"] !== undefined) {
          body["privateConnectionId"] = g["privateConnectionId"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a privateConnections",
      arguments: z.object({
        identifier: z.string().describe("The name of the privateConnections"),
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
      description: "Delete the privateConnections",
      arguments: z.object({
        identifier: z.string().describe("The name of the privateConnections"),
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
      description: "Sync privateConnections state from GCP",
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
