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

// Auto-generated extension model for @swamp/gcp/aiplatform/semanticgovernancepolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform SemanticGovernancePolicies.
 *
 * Represents a governance policy applied to a specific Agent and optionally a specific Tool within that Agent.
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
  return `${parent}/semanticGovernancePolicies/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.semanticGovernancePolicies.get",
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
  "id": "aiplatform.projects.locations.semanticGovernancePolicies.create",
  "path": "v1/{+parent}/semanticGovernancePolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "semanticGovernancePolicyId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.semanticGovernancePolicies.patch",
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
  "id": "aiplatform.projects.locations.semanticGovernancePolicies.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.semanticGovernancePolicies.list",
  "path": "v1/{+parent}/semanticGovernancePolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  agent: z.string().describe(
    "Required. The name of the agent in Agent Registry that is affected by this policy.",
  ).optional(),
  agentResponseCustomization: z.object({
    denialMessage: z.string().describe(
      "Optional. Custom message shown to the end user when the policy check results in a denial. Use this to explain the rationale to the user. Max 1000 characters.",
    ).optional(),
  }).describe(
    "Optional. Settings for customizing the agent's response to end users when this policy is evaluated, such as messages displayed when the policy denies a request.",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the SemanticGovernancePolicy.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The user-defined name of the SemanticGovernancePolicy.",
  ).optional(),
  mcpTools: z.array(z.object({
    mcpServer: z.string().describe(
      "Required. The resource name of the McpServer in Agent Registry that is affected by this policy. Format: `projects/{project}/locations/{location}/mcpServers/{mcp_server}`",
    ).optional(),
    tools: z.array(z.string()).describe(
      "Optional. The resource names of the McpTools used by the Agent that is affected by this policy. If not specified, the policy applies to all McpTools in the McpServer.",
    ).optional(),
  })).describe("Optional. The McpTools that are affected by this policy.")
    .optional(),
  name: z.string().describe(
    "Identifier. Resource name of the SemanticGovernancePolicy.",
  ).optional(),
  naturalLanguageConstraint: z.string().describe(
    "Required. The natural language constraint of the SemanticGovernancePolicy.",
  ).optional(),
  semanticGovernancePolicyId: z.string().describe(
    "Required. The ID to use for the SemanticGovernancePolicy, which will become the final component of the SemanticGovernancePolicy's resource name. This value may be up to 63 characters, and valid characters are `[a-z0-9-]`. The first character cannot be a number or hyphen. The last character must be a letter or a number.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agent: z.string().optional(),
  agentIdentity: z.string().optional(),
  agentResponseCustomization: z.object({
    denialMessage: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  mcpTools: z.array(z.object({
    mcpServer: z.string(),
    tools: z.array(z.string()),
  })).optional(),
  name: z.string(),
  naturalLanguageConstraint: z.string().optional(),
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
  agent: z.string().describe(
    "Required. The name of the agent in Agent Registry that is affected by this policy.",
  ).optional(),
  agentResponseCustomization: z.object({
    denialMessage: z.string().describe(
      "Optional. Custom message shown to the end user when the policy check results in a denial. Use this to explain the rationale to the user. Max 1000 characters.",
    ).optional(),
  }).describe(
    "Optional. Settings for customizing the agent's response to end users when this policy is evaluated, such as messages displayed when the policy denies a request.",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the SemanticGovernancePolicy.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The user-defined name of the SemanticGovernancePolicy.",
  ).optional(),
  mcpTools: z.array(z.object({
    mcpServer: z.string().describe(
      "Required. The resource name of the McpServer in Agent Registry that is affected by this policy. Format: `projects/{project}/locations/{location}/mcpServers/{mcp_server}`",
    ).optional(),
    tools: z.array(z.string()).describe(
      "Optional. The resource names of the McpTools used by the Agent that is affected by this policy. If not specified, the policy applies to all McpTools in the McpServer.",
    ).optional(),
  })).describe("Optional. The McpTools that are affected by this policy.")
    .optional(),
  name: z.string().describe(
    "Identifier. Resource name of the SemanticGovernancePolicy.",
  ).optional(),
  naturalLanguageConstraint: z.string().describe(
    "Required. The natural language constraint of the SemanticGovernancePolicy.",
  ).optional(),
  semanticGovernancePolicyId: z.string().describe(
    "Required. The ID to use for the SemanticGovernancePolicy, which will become the final component of the SemanticGovernancePolicy's resource name. This value may be up to 63 characters, and valid characters are `[a-z0-9-]`. The first character cannot be a number or hyphen. The last character must be a letter or a number.",
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

/** Swamp extension model for Google Cloud Agent Platform SemanticGovernancePolicies. Registered at `@swamp/gcp/aiplatform/semanticgovernancepolicies`. */
export const model = {
  type: "@swamp/gcp/aiplatform/semanticgovernancepolicies",
  version: "2026.09.04.1",
  upgrades: [
    {
      toVersion: "2026.07.21.2",
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
      toVersion: "2026.09.04.1",
      description: "Added: agentResponseCustomization",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a governance policy applied to a specific Agent and optionally a s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a semanticGovernancePolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
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
        if (g["agent"] !== undefined) body["agent"] = g["agent"];
        if (g["agentResponseCustomization"] !== undefined) {
          body["agentResponseCustomization"] = g["agentResponseCustomization"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["mcpTools"] !== undefined) body["mcpTools"] = g["mcpTools"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["naturalLanguageConstraint"] !== undefined) {
          body["naturalLanguageConstraint"] = g["naturalLanguageConstraint"];
        }
        if (g["semanticGovernancePolicyId"] !== undefined) {
          params["semanticGovernancePolicyId"] = String(
            g["semanticGovernancePolicyId"],
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
      description: "Get a semanticGovernancePolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the semanticGovernancePolicies",
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
      description: "Update semanticGovernancePolicies attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific semanticGovernancePolicies by name (e.g. one discovered by list)",
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
        if (g["agent"] !== undefined) body["agent"] = g["agent"];
        if (g["agentResponseCustomization"] !== undefined) {
          body["agentResponseCustomization"] = g["agentResponseCustomization"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["mcpTools"] !== undefined) body["mcpTools"] = g["mcpTools"];
        if (g["naturalLanguageConstraint"] !== undefined) {
          body["naturalLanguageConstraint"] = g["naturalLanguageConstraint"];
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
    delete: {
      description: "Delete the semanticGovernancePolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the semanticGovernancePolicies",
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
      description: "Sync semanticGovernancePolicies state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific semanticGovernancePolicies by name (e.g. one discovered by list)",
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
      description: "List semanticGovernancePolicies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The list page size. If zero, a default page size of 10 is used.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "semanticGovernancePolicies",
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
