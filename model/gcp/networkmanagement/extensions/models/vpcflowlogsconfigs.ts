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

// Auto-generated extension model for @swamp/gcp/networkmanagement/vpcflowlogsconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Management VpcFlowLogsConfigs.
 *
 * A configuration to generate VPC Flow Logs.
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
  return `${parent}/vpcFlowLogsConfigs/${shortName}`;
}

const BASE_URL = "https://networkmanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "networkmanagement.organizations.locations.vpcFlowLogsConfigs.get",
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
  "id": "networkmanagement.organizations.locations.vpcFlowLogsConfigs.create",
  "path": "v1/{+parent}/vpcFlowLogsConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "vpcFlowLogsConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkmanagement.organizations.locations.vpcFlowLogsConfigs.patch",
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
  "id": "networkmanagement.organizations.locations.vpcFlowLogsConfigs.delete",
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
  "id": "networkmanagement.organizations.locations.vpcFlowLogsConfigs.list",
  "path": "v1/{+parent}/vpcFlowLogsConfigs",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  aggregationInterval: z.enum([
    "AGGREGATION_INTERVAL_UNSPECIFIED",
    "INTERVAL_5_SEC",
    "INTERVAL_30_SEC",
    "INTERVAL_1_MIN",
    "INTERVAL_5_MIN",
    "INTERVAL_10_MIN",
    "INTERVAL_15_MIN",
  ]).describe(
    "Optional. The aggregation interval for the logs. Default value is INTERVAL_5_SEC.",
  ).optional(),
  crossProjectMetadata: z.enum([
    "CROSS_PROJECT_METADATA_UNSPECIFIED",
    "CROSS_PROJECT_METADATA_ENABLED",
    "CROSS_PROJECT_METADATA_DISABLED",
  ]).describe(
    "Optional. Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED.",
  ).optional(),
  description: z.string().describe(
    "Optional. The user-supplied description of the VPC Flow Logs configuration. Maximum of 512 characters.",
  ).optional(),
  filterExpr: z.string().describe(
    "Optional. Export filter used to define which VPC Flow Logs should be logged.",
  ).optional(),
  flowSampling: z.number().describe(
    "Optional. The value of the field must be in (0, 1]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0.",
  ).optional(),
  interconnectAttachment: z.string().describe(
    "Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name}",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata.",
  ).optional(),
  metadata: z.enum([
    "METADATA_UNSPECIFIED",
    "INCLUDE_ALL_METADATA",
    "EXCLUDE_ALL_METADATA",
    "CUSTOM_METADATA",
  ]).describe(
    "Optional. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA.",
  ).optional(),
  metadataFields: z.array(z.string()).describe(
    'Optional. Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}`",
  ).optional(),
  network: z.string().describe(
    "Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name}",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
    "Optional. The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config.",
  ).optional(),
  subnet: z.string().describe(
    "Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name}",
  ).optional(),
  vpnTunnel: z.string().describe(
    "Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name}",
  ).optional(),
  vpcFlowLogsConfigId: z.string().describe(
    "Required. ID of the `VpcFlowLogsConfig`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  aggregationInterval: z.string().optional(),
  createTime: z.string().optional(),
  crossProjectMetadata: z.string().optional(),
  description: z.string().optional(),
  filterExpr: z.string().optional(),
  flowSampling: z.number().optional(),
  interconnectAttachment: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.string().optional(),
  metadataFields: z.array(z.string()).optional(),
  name: z.string(),
  network: z.string().optional(),
  state: z.string().optional(),
  subnet: z.string().optional(),
  targetResourceState: z.string().optional(),
  updateTime: z.string().optional(),
  vpnTunnel: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  aggregationInterval: z.enum([
    "AGGREGATION_INTERVAL_UNSPECIFIED",
    "INTERVAL_5_SEC",
    "INTERVAL_30_SEC",
    "INTERVAL_1_MIN",
    "INTERVAL_5_MIN",
    "INTERVAL_10_MIN",
    "INTERVAL_15_MIN",
  ]).describe(
    "Optional. The aggregation interval for the logs. Default value is INTERVAL_5_SEC.",
  ).optional(),
  crossProjectMetadata: z.enum([
    "CROSS_PROJECT_METADATA_UNSPECIFIED",
    "CROSS_PROJECT_METADATA_ENABLED",
    "CROSS_PROJECT_METADATA_DISABLED",
  ]).describe(
    "Optional. Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED.",
  ).optional(),
  description: z.string().describe(
    "Optional. The user-supplied description of the VPC Flow Logs configuration. Maximum of 512 characters.",
  ).optional(),
  filterExpr: z.string().describe(
    "Optional. Export filter used to define which VPC Flow Logs should be logged.",
  ).optional(),
  flowSampling: z.number().describe(
    "Optional. The value of the field must be in (0, 1]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0.",
  ).optional(),
  interconnectAttachment: z.string().describe(
    "Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name}",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user-provided metadata.",
  ).optional(),
  metadata: z.enum([
    "METADATA_UNSPECIFIED",
    "INCLUDE_ALL_METADATA",
    "EXCLUDE_ALL_METADATA",
    "CUSTOM_METADATA",
  ]).describe(
    "Optional. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA.",
  ).optional(),
  metadataFields: z.array(z.string()).describe(
    'Optional. Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}`",
  ).optional(),
  network: z.string().describe(
    "Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name}",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
    "Optional. The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config.",
  ).optional(),
  subnet: z.string().describe(
    "Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name}",
  ).optional(),
  vpnTunnel: z.string().describe(
    "Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name}",
  ).optional(),
  vpcFlowLogsConfigId: z.string().describe(
    "Required. ID of the `VpcFlowLogsConfig`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Network Management VpcFlowLogsConfigs. Registered at `@swamp/gcp/networkmanagement/vpcflowlogsconfigs`. */
export const model = {
  type: "@swamp/gcp/networkmanagement/vpcflowlogsconfigs",
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
      description: "A configuration to generate VPC Flow Logs.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vpcFlowLogsConfigs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["aggregationInterval"] !== undefined) {
          body["aggregationInterval"] = g["aggregationInterval"];
        }
        if (g["crossProjectMetadata"] !== undefined) {
          body["crossProjectMetadata"] = g["crossProjectMetadata"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["filterExpr"] !== undefined) body["filterExpr"] = g["filterExpr"];
        if (g["flowSampling"] !== undefined) {
          body["flowSampling"] = g["flowSampling"];
        }
        if (g["interconnectAttachment"] !== undefined) {
          body["interconnectAttachment"] = g["interconnectAttachment"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["metadataFields"] !== undefined) {
          body["metadataFields"] = g["metadataFields"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["subnet"] !== undefined) body["subnet"] = g["subnet"];
        if (g["vpnTunnel"] !== undefined) body["vpnTunnel"] = g["vpnTunnel"];
        if (g["vpcFlowLogsConfigId"] !== undefined) {
          body["vpcFlowLogsConfigId"] = g["vpcFlowLogsConfigId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a vpcFlowLogsConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the vpcFlowLogsConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update vpcFlowLogsConfigs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["aggregationInterval"] !== undefined) {
          body["aggregationInterval"] = g["aggregationInterval"];
        }
        if (g["crossProjectMetadata"] !== undefined) {
          body["crossProjectMetadata"] = g["crossProjectMetadata"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["filterExpr"] !== undefined) body["filterExpr"] = g["filterExpr"];
        if (g["flowSampling"] !== undefined) {
          body["flowSampling"] = g["flowSampling"];
        }
        if (g["interconnectAttachment"] !== undefined) {
          body["interconnectAttachment"] = g["interconnectAttachment"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["metadataFields"] !== undefined) {
          body["metadataFields"] = g["metadataFields"];
        }
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["subnet"] !== undefined) body["subnet"] = g["subnet"];
        if (g["vpnTunnel"] !== undefined) body["vpnTunnel"] = g["vpnTunnel"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the vpcFlowLogsConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the vpcFlowLogsConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync vpcFlowLogsConfigs state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List vpcFlowLogsConfigs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported [CEL logic operators] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators).",
        ).optional(),
        orderBy: z.string().describe("Optional. Field to use to sort the list.")
          .optional(),
        pageSize: z.number().describe(
          "Optional. Number of `VpcFlowLogsConfigs` to return.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          BASE_URL,
          LIST_CONFIG,
          params,
          "vpcFlowLogsConfigs",
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
