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

// Auto-generated extension model for @swamp/gcp/compute/reservationslots
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ReservationSlots.
 *
 * Retrieves information about the specified reservation slot.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.reservationSlots.get",
  "path":
    "projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "parentName",
    "reservationSlot",
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
    "reservationSlot": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.reservationSlots.update",
  "path":
    "projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
    "parentName",
    "reservationSlot",
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
    "reservationSlot": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.reservationSlots.list",
  "path": "projects/{project}/zones/{zone}/{+parentName}/reservationSlots",
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
    "returnPartialSuccess": {
      "location": "query",
    },
    "zone": {
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
  creationTimestamp: z.string().describe(
    "Output only. [Output Only] The creation timestamp, formatted asRFC3339 text.",
  ).optional(),
  id: z.string().describe(
    "Output only. [Output Only] The unique identifier for this resource. This identifier is defined by the server.",
  ).optional(),
  kind: z.string().describe(
    "Output only. [Output Only] The type of resource. Alwayscompute#reservationSlot for reservation slots.",
  ).optional(),
  name: z.string().describe(
    "Output only. [Output Only] The name of the reservation slot.",
  ).optional(),
  physicalTopology: z.object({
    block: z.string().describe(
      "The unique identifier of the capacity block within the cluster.",
    ).optional(),
    cluster: z.string().describe(
      "The cluster name of the reservation sub-block.",
    ).optional(),
    host: z.string().describe(
      "The unique identifier of the capacity host within the capacity sub-block.",
    ).optional(),
    subBlock: z.string().describe(
      "The unique identifier of the capacity sub-block within the capacity block.",
    ).optional(),
  }).optional(),
  selfLink: z.string().describe(
    "Output only. [Output Only] A server-defined fully-qualified URL for this resource.",
  ).optional(),
  selfLinkWithId: z.string().describe(
    "Output only. [Output Only] A server-defined URL for this resource with the resource ID.",
  ).optional(),
  shareSettings: z.object({
    projectMap: z.record(
      z.string(),
      z.object({
        projectId: z.string().describe(
          "The project ID, should be same as the key of this project config in the parent map.",
        ).optional(),
      }),
    ).describe(
      "A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS.",
    ).optional(),
    shareType: z.enum([
      "LOCAL",
      "ORGANIZATION",
      "SHARE_TYPE_UNSPECIFIED",
      "SPECIFIC_PROJECTS",
    ]).describe("Type of sharing for this shared-reservation").optional(),
  }).describe(
    "The share setting for reservations and sole tenancy node groups.",
  ).optional(),
  state: z.enum([
    "ACTIVE",
    "CREATING",
    "DELETING",
    "STATE_UNSPECIFIED",
    "UNAVAILABLE",
  ]).describe("Output only. [Output Only] The state of the reservation slot.")
    .optional(),
  status: z.object({
    physicalTopology: z.object({
      block: z.string().describe(
        "The unique identifier of the capacity block within the cluster.",
      ).optional(),
      cluster: z.string().describe(
        "The cluster name of the reservation sub-block.",
      ).optional(),
      host: z.string().describe(
        "The unique identifier of the capacity host within the capacity sub-block.",
      ).optional(),
      subBlock: z.string().describe(
        "The unique identifier of the capacity sub-block within the capacity block.",
      ).optional(),
    }).optional(),
    rdmaIpAddresses: z.array(z.string()).describe(
      "Output only. The RDMA IP address of the physical host.",
    ).optional(),
    runningInstances: z.array(z.string()).describe(
      "Output only. The URIs of the instances currently running on this slot.",
    ).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The zone in which the reservation slot resides.",
  ).optional(),
});

const StateSchema = z.object({
  resource: z.object({
    creationTimestamp: z.string(),
    id: z.string(),
    kind: z.string(),
    name: z.string(),
    physicalTopology: z.object({
      block: z.string(),
      cluster: z.string(),
      host: z.string(),
      subBlock: z.string(),
    }),
    selfLink: z.string(),
    selfLinkWithId: z.string(),
    shareSettings: z.object({
      projectMap: z.record(z.string(), z.unknown()),
      shareType: z.string(),
    }),
    state: z.string(),
    status: z.object({
      physicalTopology: z.object({
        block: z.string(),
        cluster: z.string(),
        host: z.string(),
        subBlock: z.string(),
      }),
      rdmaIpAddresses: z.array(z.string()),
      runningInstances: z.array(z.string()),
    }),
    zone: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  creationTimestamp: z.string().describe(
    "Output only. [Output Only] The creation timestamp, formatted asRFC3339 text.",
  ).optional(),
  id: z.string().describe(
    "Output only. [Output Only] The unique identifier for this resource. This identifier is defined by the server.",
  ).optional(),
  kind: z.string().describe(
    "Output only. [Output Only] The type of resource. Alwayscompute#reservationSlot for reservation slots.",
  ).optional(),
  name: z.string().describe(
    "Output only. [Output Only] The name of the reservation slot.",
  ).optional(),
  physicalTopology: z.object({
    block: z.string().describe(
      "The unique identifier of the capacity block within the cluster.",
    ).optional(),
    cluster: z.string().describe(
      "The cluster name of the reservation sub-block.",
    ).optional(),
    host: z.string().describe(
      "The unique identifier of the capacity host within the capacity sub-block.",
    ).optional(),
    subBlock: z.string().describe(
      "The unique identifier of the capacity sub-block within the capacity block.",
    ).optional(),
  }).optional(),
  selfLink: z.string().describe(
    "Output only. [Output Only] A server-defined fully-qualified URL for this resource.",
  ).optional(),
  selfLinkWithId: z.string().describe(
    "Output only. [Output Only] A server-defined URL for this resource with the resource ID.",
  ).optional(),
  shareSettings: z.object({
    projectMap: z.record(
      z.string(),
      z.object({
        projectId: z.string().describe(
          "The project ID, should be same as the key of this project config in the parent map.",
        ).optional(),
      }),
    ).describe(
      "A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS.",
    ).optional(),
    shareType: z.enum([
      "LOCAL",
      "ORGANIZATION",
      "SHARE_TYPE_UNSPECIFIED",
      "SPECIFIC_PROJECTS",
    ]).describe("Type of sharing for this shared-reservation").optional(),
  }).describe(
    "The share setting for reservations and sole tenancy node groups.",
  ).optional(),
  state: z.enum([
    "ACTIVE",
    "CREATING",
    "DELETING",
    "STATE_UNSPECIFIED",
    "UNAVAILABLE",
  ]).describe("Output only. [Output Only] The state of the reservation slot.")
    .optional(),
  status: z.object({
    physicalTopology: z.object({
      block: z.string().describe(
        "The unique identifier of the capacity block within the cluster.",
      ).optional(),
      cluster: z.string().describe(
        "The cluster name of the reservation sub-block.",
      ).optional(),
      host: z.string().describe(
        "The unique identifier of the capacity host within the capacity sub-block.",
      ).optional(),
      subBlock: z.string().describe(
        "The unique identifier of the capacity sub-block within the capacity block.",
      ).optional(),
    }).optional(),
    rdmaIpAddresses: z.array(z.string()).describe(
      "Output only. The RDMA IP address of the physical host.",
    ).optional(),
    runningInstances: z.array(z.string()).describe(
      "Output only. The URIs of the instances currently running on this slot.",
    ).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The zone in which the reservation slot resides.",
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

/** Swamp extension model for Google Cloud Compute Engine ReservationSlots. Registered at `@swamp/gcp/compute/reservationslots`. */
export const model = {
  type: "@swamp/gcp/compute/reservationslots",
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
      description:
        "Retrieves information about the specified reservation slot.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reservationSlots",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservationSlots"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        params["reservationSlot"] = args.identifier;
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
      description: "Update reservationSlots attributes",
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        else if (existing["zone"]) params["zone"] = String(existing["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        } else if (existing["parentName"]) {
          params["parentName"] = String(existing["parentName"]);
        }
        params["reservationSlot"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["creationTimestamp"] !== undefined) {
          body["creationTimestamp"] = g["creationTimestamp"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["physicalTopology"] !== undefined) {
          body["physicalTopology"] = g["physicalTopology"];
        }
        if (g["selfLink"] !== undefined) body["selfLink"] = g["selfLink"];
        if (g["selfLinkWithId"] !== undefined) {
          body["selfLinkWithId"] = g["selfLinkWithId"];
        }
        if (g["shareSettings"] !== undefined) {
          body["shareSettings"] = g["shareSettings"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
          UPDATE_CONFIG,
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
    sync: {
      description: "Sync reservationSlots state from GCP",
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
          params["reservationSlot"] = identifier;
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
      description: "List reservationSlots resources",
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
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
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
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
    get_version: {
      description: "get version",
      arguments: z.object({
        sbomSelections: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["parentName"] = existing["parentName"]?.toString() ??
          g["parentName"]?.toString() ?? "";
        params["reservationSlot"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sbomSelections"] !== undefined) {
          body["sbomSelections"] = args["sbomSelections"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSlots.getVersion",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}/getVersion",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSlot",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSlot": { "location": "path", "required": true },
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
