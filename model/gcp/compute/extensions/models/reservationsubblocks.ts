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

// Auto-generated extension model for @swamp/gcp/compute/reservationsubblocks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ReservationSubBlocks.
 *
 * Retrieves information about the specified reservation subBlock.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.reservationSubBlocks.get",
  "path":
    "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "parentName",
    "reservationSubBlock",
  ],
  "parameters": {
    "parentName": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "reservationSubBlock": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.reservationSubBlocks.list",
  "path": "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "parentName",
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
    "parentName": {
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
  zone: z.string().describe(
    "Name of the zone for this request. Zone name should conform to RFC1035.",
  ),
  parentName: z.string().describe(
    "The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name}",
  ),
});

const StateSchema = z.object({
  resource: z.object({
    acceleratorTopologiesInfo: z.object({
      acceleratorTopologyInfos: z.array(z.object({
        acceleratorTopology: z.string(),
        infoPerTopologyStates: z.array(z.unknown()),
      })),
    }),
    count: z.number(),
    creationTimestamp: z.string(),
    healthInfo: z.object({
      degradedHostCount: z.number(),
      degradedInfraCount: z.number(),
      healthStatus: z.string(),
      healthyHostCount: z.number(),
      healthyInfraCount: z.number(),
    }),
    id: z.string(),
    inUseCount: z.number(),
    inUseHostCount: z.number(),
    kind: z.string(),
    name: z.string(),
    physicalTopology: z.object({
      block: z.string(),
      cluster: z.string(),
      subBlock: z.string(),
    }),
    reservationSubBlockMaintenance: z.object({
      instanceMaintenanceOngoingCount: z.number(),
      instanceMaintenancePendingCount: z.number(),
      maintenanceOngoingCount: z.number(),
      maintenancePendingCount: z.number(),
      schedulingType: z.string(),
      subblockInfraMaintenanceOngoingCount: z.number(),
      subblockInfraMaintenancePendingCount: z.number(),
      upcomingGroupMaintenance: z.object({
        canReschedule: z.boolean(),
        latestWindowStartTime: z.string(),
        maintenanceOnShutdown: z.boolean(),
        maintenanceReasons: z.array(z.string()),
        maintenanceStatus: z.string(),
        type: z.string(),
        windowEndTime: z.string(),
        windowStartTime: z.string(),
      }),
    }),
    selfLink: z.string(),
    selfLinkWithId: z.string(),
    status: z.string(),
    zone: z.string(),
  }).optional(),
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
  zone: z.string().describe(
    "Name of the zone for this request. Zone name should conform to RFC1035.",
  ).optional(),
  parentName: z.string().describe(
    "The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name}",
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

/** Swamp extension model for Google Cloud Compute Engine ReservationSubBlocks. Registered at `@swamp/gcp/compute/reservationsubblocks`. */
export const model = {
  type: "@swamp/gcp/compute/reservationsubblocks",
  version: "2026.09.23.1",
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
      toVersion: "2026.04.04.1",
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
    {
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.28.1",
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
      toVersion: "2026.07.19.2",
      description: "Added: zone, parentName",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Retrieves information about the specified reservation subBlock.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reservationSubBlocks",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservationSubBlocks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        params["reservationSubBlock"] = args.identifier;
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
    sync: {
      description: "Sync reservationSubBlocks state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reservationSubBlocks by name (e.g. one discovered by list)",
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
          if (g["parentName"] !== undefined) {
            params["parentName"] = String(g["parentName"]);
          } else if (existing["parentName"]) {
            params["parentName"] = String(existing["parentName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reservationSubBlock"] = identifier;
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
      description: "List reservationSubBlocks resources",
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
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        optionsRequestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["optionsRequestedPolicyVersion"] !== undefined) {
          params["optionsRequestedPolicyVersion"] = String(
            args["optionsRequestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.getIamPolicy",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_version: {
      description: "get version",
      arguments: z.object({
        sbomSelections: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["requestId"] !== undefined) {
          params["requestId"] = String(args["requestId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["sbomSelections"] !== undefined) {
          body["sbomSelections"] = args["sbomSelections"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.getVersion",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/getVersion",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
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
    perform_maintenance: {
      description: "perform maintenance",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["requestId"] !== undefined) {
          params["requestId"] = String(args["requestId"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.performMaintenance",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/performMaintenance",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    report_faulty: {
      description: "report faulty",
      arguments: z.object({
        disruptionSchedule: z.any().optional(),
        failureComponent: z.any().optional(),
        faultReasons: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["requestId"] !== undefined) {
          params["requestId"] = String(args["requestId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["disruptionSchedule"] !== undefined) {
          body["disruptionSchedule"] = args["disruptionSchedule"];
        }
        if (args["failureComponent"] !== undefined) {
          body["failureComponent"] = args["failureComponent"];
        }
        if (args["faultReasons"] !== undefined) {
          body["faultReasons"] = args["faultReasons"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.reportFaulty",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/reportFaulty",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.setIamPolicy",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.reservationSubBlocks.testIamPermissions",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
