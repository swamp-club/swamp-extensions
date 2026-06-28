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

// Auto-generated extension model for @swamp/gcp/aiplatform/agents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Agents.
 *
 * A Vertex agent contains instructions and configurations for the LLM to execute a certain task.
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
  return `${parent}/agents/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.agents.get",
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
  "id": "aiplatform.projects.locations.agents.create",
  "path": "v1/{+parent}/agents",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.agents.patch",
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
  "id": "aiplatform.projects.locations.agents.delete",
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
  "id": "aiplatform.projects.locations.agents.list",
  "path": "v1/{+parent}/agents",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  base_agent: z.string().describe(
    "Required. The base agent for the agent. Supported values: * `antigravity-preview-05-2026`",
  ).optional(),
  base_environment: z.string().describe(
    "Optional. The base environment configuration for the agent. Valid types: * A string value for the environment ID, or `remote` for the default. * A struct value for the `environment_config`.",
  ).optional(),
  description: z.string().describe("Optional. The description of the agent.")
    .optional(),
  id: z.string().describe(
    "Immutable. The user-specified ID for the agent. This ID becomes the final component of the agent resource name. If not provided, Vertex AI will generate a value for this ID. The ID can be up to 63 characters and must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata for the agent.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the agent. Format: `projects/{project}/locations/{location}/agents/{agent}`.",
  ).optional(),
  system_instruction: z.string().describe(
    "Optional. The instructions for the agent to follow. These instructions are passed to the LLM as a system instruction.",
  ).optional(),
  tools: z.array(z.object({
    headers: z.record(z.string(), z.string()).describe(
      "Optional. The headers for the MCP server, such as for authentication. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the MCP server. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    type: z.string().describe(
      "Required. The type of the tool. Supported types: * `code_execution` * `filesystem` * `google_search` * `mcp_server` * `url_context`",
    ).optional(),
    url: z.string().describe(
      "Optional. The URL for the MCP server endpoint. Only applicable when `type` is `mcp_server`.",
    ).optional(),
  })).describe("Optional. The tools available to the agent.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  base_agent: z.string().optional(),
  base_environment: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  object: z.string().optional(),
  system_instruction: z.string().optional(),
  tools: z.array(z.object({
    headers: z.record(z.string(), z.unknown()),
    name: z.string(),
    type: z.string(),
    url: z.string(),
  })).optional(),
  updated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  base_agent: z.string().describe(
    "Required. The base agent for the agent. Supported values: * `antigravity-preview-05-2026`",
  ).optional(),
  base_environment: z.string().describe(
    "Optional. The base environment configuration for the agent. Valid types: * A string value for the environment ID, or `remote` for the default. * A struct value for the `environment_config`.",
  ).optional(),
  description: z.string().describe("Optional. The description of the agent.")
    .optional(),
  id: z.string().describe(
    "Immutable. The user-specified ID for the agent. This ID becomes the final component of the agent resource name. If not provided, Vertex AI will generate a value for this ID. The ID can be up to 63 characters and must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata for the agent.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the agent. Format: `projects/{project}/locations/{location}/agents/{agent}`.",
  ).optional(),
  system_instruction: z.string().describe(
    "Optional. The instructions for the agent to follow. These instructions are passed to the LLM as a system instruction.",
  ).optional(),
  tools: z.array(z.object({
    headers: z.record(z.string(), z.string()).describe(
      "Optional. The headers for the MCP server, such as for authentication. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the MCP server. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    type: z.string().describe(
      "Required. The type of the tool. Supported types: * `code_execution` * `filesystem` * `google_search` * `mcp_server` * `url_context`",
    ).optional(),
    url: z.string().describe(
      "Optional. The URL for the MCP server endpoint. Only applicable when `type` is `mcp_server`.",
    ).optional(),
  })).describe("Optional. The tools available to the agent.").optional(),
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

/** Swamp extension model for Google Cloud Agent Platform Agents. Registered at `@swamp/gcp/aiplatform/agents`. */
export const model = {
  type: "@swamp/gcp/aiplatform/agents",
  version: "2026.06.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Vertex agent contains instructions and configurations for the LLM to execut...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agents",
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
        if (g["base_agent"] !== undefined) body["base_agent"] = g["base_agent"];
        if (g["base_environment"] !== undefined) {
          body["base_environment"] = g["base_environment"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["system_instruction"] !== undefined) {
          body["system_instruction"] = g["system_instruction"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
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
      description: "Get a agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Update agents attributes",
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
        if (g["base_agent"] !== undefined) body["base_agent"] = g["base_agent"];
        if (g["base_environment"] !== undefined) {
          body["base_environment"] = g["base_environment"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["system_instruction"] !== undefined) {
          body["system_instruction"] = g["system_instruction"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
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
      description: "Delete the agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Sync agents state from GCP",
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
      description: "List agents resources",
      arguments: z.object({
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by. Supported fields: * `created` * `updated` Use `desc` after a field name for descending order. Example: `created desc`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of agents to return. The service may return fewer than this value. The maximum page size is 100; values above 100 will be coerced to 100. If unspecified, the default page size is 10.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "agents",
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
