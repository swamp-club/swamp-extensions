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

// Auto-generated extension model for @swamp/gcp/networkservices/agentconnectivitytemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services AgentConnectivityTemplates.
 *
 * AgentConnectivityTemplate represents a reusable network configuration.
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
  return `${parent}/agentConnectivityTemplates/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.agentConnectivityTemplates.get",
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
  "id": "networkservices.projects.locations.agentConnectivityTemplates.create",
  "path": "v1/{+parent}/agentConnectivityTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "agentConnectivityTemplateId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.agentConnectivityTemplates.patch",
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
  "id": "networkservices.projects.locations.agentConnectivityTemplates.delete",
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
  "id": "networkservices.projects.locations.agentConnectivityTemplates.list",
  "path": "v1/{+parent}/agentConnectivityTemplates",
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
    "returnPartialSuccess": {
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
  accessPath: z.enum([
    "ACCESS_PATH_UNSPECIFIED",
    "CLIENT_TO_AGENT",
    "AGENT_TO_ANYWHERE",
  ]).describe(
    "Required. Immutable. The path of the access. Maps roughly to ingress/egress, though we keep CLIENT_TO_AGENT and AGENT_TO_ANYWHERE as carryovers from Agent Gateway's original resource model. The path is immutable once set. Exactly one path can be set.",
  ).optional(),
  accessTypes: z.array(z.enum(["ACCESS_TYPE_UNSPECIFIED", "PUBLIC", "PRIVATE"]))
    .describe(
      "Optional. The types of network access provided to the gateway. Both PUBLIC and PRIVATE can be configured.",
    ).optional(),
  agentCompute: z.enum([
    "AGENT_COMPUTE_UNSPECIFIED",
    "GKE",
    "CLOUD_RUN",
    "BORG",
  ]).describe(
    "Optional. The compute environment where the agent is hosted. Exactly one type of compute must be chosen.",
  ).optional(),
  deploymentModel: z.enum([
    "DEPLOYMENT_MODEL_UNSPECIFIED",
    "CENTRALIZED",
    "AMBIENT",
  ]).describe("Required. The deployment model for the gateway.").optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  egressNetworkConfig: z.object({
    dnsPeeringConfig: z.object({
      domain: z.string().describe(
        "Optional. Deprecated: Use `domains` instead. The domain to peer.",
      ).optional(),
      domains: z.array(z.string()).describe("Optional. The domains to peer.")
        .optional(),
      targetNetwork: z.string().describe(
        "Optional. The target network resource name for DNS peering. Format: projects/{project}/global/networks/{network_id}",
      ).optional(),
    }).describe("Optional. DNS Peering configuration.").optional(),
    networkAttachment: z.string().describe(
      "Optional. The network attachment resource name. Format: projects/{project}/regions/{region}/networkAttachments/{network_attachment_id}",
    ).optional(),
    tlsConfig: z.object({
      additionalRoots: z.enum([
        "ADDITIONAL_ROOTS_UNSPECIFIED",
        "NO_ADDITIONAL_ROOTS",
        "PUBLICLY_TRUSTED_ROOTS",
      ]).describe("Optional. The additional roots to trust.").optional(),
      trustConfig: z.string().describe(
        "Optional. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config}",
      ).optional(),
    }).describe("Optional. The TLS configuration for the egress traffic.")
      .optional(),
    trustConfig: z.string().describe(
      "Optional. Deprecated: Use tls_config instead. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config}",
    ).optional(),
    vpcEgress: z.enum([
      "VPC_EGRESS_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_RANGES_ONLY",
    ]).describe("Optional. The VPC egress setting.").optional(),
  }).describe("Optional. Configuration for egress network traffic.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the AgentConnectivityTemplate resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the AgentConnectivityTemplate resource. It matches pattern `projects/*/locations/*/agentConnectivityTemplates/`.",
  ).optional(),
  agentConnectivityTemplateId: z.string().describe(
    "Required. Short name of the AgentConnectivityTemplate resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accessPath: z.string().optional(),
  accessTypes: z.array(z.string()).optional(),
  agentCompute: z.string().optional(),
  createTime: z.string().optional(),
  deploymentModel: z.string().optional(),
  description: z.string().optional(),
  egressNetworkConfig: z.object({
    dnsPeeringConfig: z.object({
      domain: z.string(),
      domains: z.array(z.string()),
      targetNetwork: z.string(),
    }),
    networkAttachment: z.string(),
    tlsConfig: z.object({
      additionalRoots: z.string(),
      trustConfig: z.string(),
    }),
    trustConfig: z.string(),
    vpcEgress: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
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
  accessPath: z.enum([
    "ACCESS_PATH_UNSPECIFIED",
    "CLIENT_TO_AGENT",
    "AGENT_TO_ANYWHERE",
  ]).describe(
    "Required. Immutable. The path of the access. Maps roughly to ingress/egress, though we keep CLIENT_TO_AGENT and AGENT_TO_ANYWHERE as carryovers from Agent Gateway's original resource model. The path is immutable once set. Exactly one path can be set.",
  ).optional(),
  accessTypes: z.array(z.enum(["ACCESS_TYPE_UNSPECIFIED", "PUBLIC", "PRIVATE"]))
    .describe(
      "Optional. The types of network access provided to the gateway. Both PUBLIC and PRIVATE can be configured.",
    ).optional(),
  agentCompute: z.enum([
    "AGENT_COMPUTE_UNSPECIFIED",
    "GKE",
    "CLOUD_RUN",
    "BORG",
  ]).describe(
    "Optional. The compute environment where the agent is hosted. Exactly one type of compute must be chosen.",
  ).optional(),
  deploymentModel: z.enum([
    "DEPLOYMENT_MODEL_UNSPECIFIED",
    "CENTRALIZED",
    "AMBIENT",
  ]).describe("Required. The deployment model for the gateway.").optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  egressNetworkConfig: z.object({
    dnsPeeringConfig: z.object({
      domain: z.string().describe(
        "Optional. Deprecated: Use `domains` instead. The domain to peer.",
      ).optional(),
      domains: z.array(z.string()).describe("Optional. The domains to peer.")
        .optional(),
      targetNetwork: z.string().describe(
        "Optional. The target network resource name for DNS peering. Format: projects/{project}/global/networks/{network_id}",
      ).optional(),
    }).describe("Optional. DNS Peering configuration.").optional(),
    networkAttachment: z.string().describe(
      "Optional. The network attachment resource name. Format: projects/{project}/regions/{region}/networkAttachments/{network_attachment_id}",
    ).optional(),
    tlsConfig: z.object({
      additionalRoots: z.enum([
        "ADDITIONAL_ROOTS_UNSPECIFIED",
        "NO_ADDITIONAL_ROOTS",
        "PUBLICLY_TRUSTED_ROOTS",
      ]).describe("Optional. The additional roots to trust.").optional(),
      trustConfig: z.string().describe(
        "Optional. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config}",
      ).optional(),
    }).describe("Optional. The TLS configuration for the egress traffic.")
      .optional(),
    trustConfig: z.string().describe(
      "Optional. Deprecated: Use tls_config instead. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config}",
    ).optional(),
    vpcEgress: z.enum([
      "VPC_EGRESS_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_RANGES_ONLY",
    ]).describe("Optional. The VPC egress setting.").optional(),
  }).describe("Optional. Configuration for egress network traffic.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the AgentConnectivityTemplate resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the AgentConnectivityTemplate resource. It matches pattern `projects/*/locations/*/agentConnectivityTemplates/`.",
  ).optional(),
  agentConnectivityTemplateId: z.string().describe(
    "Required. Short name of the AgentConnectivityTemplate resource to be created.",
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

/** Swamp extension model for Google Cloud Network Services AgentConnectivityTemplates. Registered at `@swamp/gcp/networkservices/agentconnectivitytemplates`. */
export const model = {
  type: "@swamp/gcp/networkservices/agentconnectivitytemplates",
  version: "2026.09.26.1",
  upgrades: [
    {
      toVersion: "2026.08.16.1",
      description: "Added: agentCompute, deploymentModel",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "AgentConnectivityTemplate represents a reusable network configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agentConnectivityTemplates",
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
        if (g["accessPath"] !== undefined) body["accessPath"] = g["accessPath"];
        if (g["accessTypes"] !== undefined) {
          body["accessTypes"] = g["accessTypes"];
        }
        if (g["agentCompute"] !== undefined) {
          body["agentCompute"] = g["agentCompute"];
        }
        if (g["deploymentModel"] !== undefined) {
          body["deploymentModel"] = g["deploymentModel"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["egressNetworkConfig"] !== undefined) {
          body["egressNetworkConfig"] = g["egressNetworkConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["agentConnectivityTemplateId"] !== undefined) {
          params["agentConnectivityTemplateId"] = String(
            g["agentConnectivityTemplateId"],
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
      description: "Get a agentConnectivityTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the agentConnectivityTemplates",
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
      description: "Update agentConnectivityTemplates attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific agentConnectivityTemplates by name (e.g. one discovered by list)",
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
        if (g["accessTypes"] !== undefined) {
          body["accessTypes"] = g["accessTypes"];
        }
        if (g["agentCompute"] !== undefined) {
          body["agentCompute"] = g["agentCompute"];
        }
        if (g["deploymentModel"] !== undefined) {
          body["deploymentModel"] = g["deploymentModel"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["egressNetworkConfig"] !== undefined) {
          body["egressNetworkConfig"] = g["egressNetworkConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
      description: "Delete the agentConnectivityTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the agentConnectivityTemplates",
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
      description: "Sync agentConnectivityTemplates state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific agentConnectivityTemplates by name (e.g. one discovered by list)",
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
      description: "List agentConnectivityTemplates resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of AgentConnectivityTemplates to return per call.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail.",
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
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "agentConnectivityTemplates",
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
