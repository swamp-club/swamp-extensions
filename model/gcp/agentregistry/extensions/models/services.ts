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

// Auto-generated extension model for @swamp/gcp/agentregistry/services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Registry Services.
 *
 * Represents a user-defined Service.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://agentregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "agentregistry.projects.locations.services.get",
  "path": "v1alpha/{+name}",
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
  "id": "agentregistry.projects.locations.services.create",
  "path": "v1alpha/{+parent}/services",
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
    "serviceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "agentregistry.projects.locations.services.patch",
  "path": "v1alpha/{+name}",
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
  "id": "agentregistry.projects.locations.services.delete",
  "path": "v1alpha/{+name}",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "agentregistry.projects.locations.services.list",
  "path": "v1alpha/{+parent}/services",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  agentSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the Agent spec in the JSON format. This payload is validated against the schema for the specified type. The content size is limited to `10KB`.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC", "A2A_AGENT_CARD"]).describe(
      "Required. The type of the agent spec content.",
    ).optional(),
  }).describe("The spec of the agent.").optional(),
  description: z.string().describe(
    "Optional. User-defined description of an Service. Can have a maximum length of `2048` characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User-defined display name for the Service. Can have a maximum length of `63` characters.",
  ).optional(),
  endpointSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the endpoint spec. Reserved for future use.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC"]).describe(
      "Required. The type of the endpoint spec content.",
    ).optional(),
  }).describe("The spec of the endpoint.").optional(),
  interfaces: z.array(z.object({
    protocolBinding: z.enum([
      "PROTOCOL_BINDING_UNSPECIFIED",
      "JSONRPC",
      "GRPC",
      "HTTP_JSON",
    ]).describe("Required. The protocol binding of the interface.").optional(),
    url: z.string().describe("Required. The destination URL.").optional(),
  })).describe("Optional. The connection details for the Service.").optional(),
  mcpServerSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the MCP Server spec. This payload is validated against the schema for the specified type. The content size is limited to `10KB`.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC", "TOOL_SPEC"]).describe(
      "Required. The type of the MCP Server spec content.",
    ).optional(),
  }).describe("The spec of the MCP Server.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Service. Format: `projects/{project}/locations/{location}/services/{service}`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The ID to use for the service, which will become the final component of the service's resource name. This value should be 4-63 characters, and valid characters are `/a-z-/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentSpec: z.object({
    content: z.record(z.string(), z.unknown()),
    type: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endpointSpec: z.object({
    content: z.record(z.string(), z.unknown()),
    type: z.string(),
  }).optional(),
  interfaces: z.array(z.object({
    protocolBinding: z.string(),
    url: z.string(),
  })).optional(),
  mcpServerSpec: z.object({
    content: z.record(z.string(), z.unknown()),
    type: z.string(),
  }).optional(),
  name: z.string(),
  registryResource: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  agentSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the Agent spec in the JSON format. This payload is validated against the schema for the specified type. The content size is limited to `10KB`.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC", "A2A_AGENT_CARD"]).describe(
      "Required. The type of the agent spec content.",
    ).optional(),
  }).describe("The spec of the agent.").optional(),
  description: z.string().describe(
    "Optional. User-defined description of an Service. Can have a maximum length of `2048` characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User-defined display name for the Service. Can have a maximum length of `63` characters.",
  ).optional(),
  endpointSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the endpoint spec. Reserved for future use.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC"]).describe(
      "Required. The type of the endpoint spec content.",
    ).optional(),
  }).describe("The spec of the endpoint.").optional(),
  interfaces: z.array(z.object({
    protocolBinding: z.enum([
      "PROTOCOL_BINDING_UNSPECIFIED",
      "JSONRPC",
      "GRPC",
      "HTTP_JSON",
    ]).describe("Required. The protocol binding of the interface.").optional(),
    url: z.string().describe("Required. The destination URL.").optional(),
  })).describe("Optional. The connection details for the Service.").optional(),
  mcpServerSpec: z.object({
    content: z.record(z.string(), z.string()).describe(
      "Optional. The content of the MCP Server spec. This payload is validated against the schema for the specified type. The content size is limited to `10KB`.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "NO_SPEC", "TOOL_SPEC"]).describe(
      "Required. The type of the MCP Server spec content.",
    ).optional(),
  }).describe("The spec of the MCP Server.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Service. Format: `projects/{project}/locations/{location}/services/{service}`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The ID to use for the service, which will become the final component of the service's resource name. This value should be 4-63 characters, and valid characters are `/a-z-/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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

/** Swamp extension model for Google Cloud Agent Registry Services. Registered at `@swamp/gcp/agentregistry/services`. */
export const model = {
  type: "@swamp/gcp/agentregistry/services",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a user-defined Service.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentSpec"] !== undefined) body["agentSpec"] = g["agentSpec"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endpointSpec"] !== undefined) {
          body["endpointSpec"] = g["endpointSpec"];
        }
        if (g["interfaces"] !== undefined) body["interfaces"] = g["interfaces"];
        if (g["mcpServerSpec"] !== undefined) {
          body["mcpServerSpec"] = g["mcpServerSpec"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["serviceId"] !== undefined) body["serviceId"] = g["serviceId"];
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
          credentials,
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update services attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["agentSpec"] !== undefined) body["agentSpec"] = g["agentSpec"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endpointSpec"] !== undefined) {
          body["endpointSpec"] = g["endpointSpec"];
        }
        if (g["interfaces"] !== undefined) body["interfaces"] = g["interfaces"];
        if (g["mcpServerSpec"] !== undefined) {
          body["mcpServerSpec"] = g["mcpServerSpec"];
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync services state from GCP",
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
      description: "List services resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. A query string used to filter the list of services returned. The filter expression must follow AIP-160 syntax. Filtering is supported on the `name`, `display_name`, `description`, and `labels` fields. Some examples: * `name = "projects/p1/locations/l1/services/s1"` * `display_name = "my-service"` * `description : "myservice description"` * `labels.env = "prod"`',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "services",
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
