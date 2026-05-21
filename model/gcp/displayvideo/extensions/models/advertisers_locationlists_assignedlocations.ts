// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-locationlists-assignedlocations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.LocationLists.AssignedLocations.
 *
 * An assignment between a location list and a relevant targeting option.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.locationLists.assignedLocations.create",
  "path":
    "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
    "locationListId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "locationListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.locationLists.assignedLocations.delete",
  "path":
    "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations/{+assignedLocationId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "locationListId",
    "assignedLocationId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "assignedLocationId": {
      "location": "path",
      "required": true,
    },
    "locationListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.locationLists.assignedLocations.list",
  "path":
    "v4/advertisers/{advertiserId}/locationLists/{locationListId}/assignedLocations",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "locationListId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
    },
    "locationListId": {
      "location": "path",
      "required": true,
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  targetingOptionId: z.string().describe(
    "Required. The ID of the targeting option assigned to the location list.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the DV360 advertiser to which the location list belongs.",
  ),
  locationListId: z.string().describe(
    "Required. The ID of the location list for which the assignment will be created.",
  ),
});

const StateSchema = z.object({
  assignedLocationId: z.string().optional(),
  name: z.string(),
  targetingOptionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  targetingOptionId: z.string().describe(
    "Required. The ID of the targeting option assigned to the location list.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the DV360 advertiser to which the location list belongs.",
  ).optional(),
  locationListId: z.string().describe(
    "Required. The ID of the location list for which the assignment will be created.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.LocationLists.AssignedLocations. Registered at `@swamp/gcp/displayvideo/advertisers-locationlists-assignedlocations`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-locationlists-assignedlocations",
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
        "An assignment between a location list and a relevant targeting option.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assignedLocations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["locationListId"] !== undefined) {
          params["locationListId"] = String(g["locationListId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["targetingOptionId"] !== undefined) {
          body["targetingOptionId"] = g["targetingOptionId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "advertiserId": String(g["advertiserId"] ?? ""),
              "locationListId": String(g["locationListId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a assignedLocations",
      arguments: z.object({
        identifier: z.string().describe("The name of the assignedLocations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["locationListId"] !== undefined) {
          params["locationListId"] = String(g["locationListId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Delete the assignedLocations",
      arguments: z.object({
        identifier: z.string().describe("The name of the assignedLocations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["locationListId"] !== undefined) {
          params["locationListId"] = String(g["locationListId"]);
        }
        params["assignedLocationId"] = args.identifier;
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
      description: "Sync assignedLocations state from GCP",
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
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          if (g["locationListId"] !== undefined) {
            params["locationListId"] = String(g["locationListId"]);
          } else if (existing["locationListId"]) {
            params["locationListId"] = String(existing["locationListId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    bulk_edit: {
      description: "bulk edit",
      arguments: z.object({
        createdAssignedLocations: z.any().optional(),
        deletedAssignedLocations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["locationListId"] !== undefined) {
          params["locationListId"] = String(g["locationListId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["createdAssignedLocations"] !== undefined) {
          body["createdAssignedLocations"] = args["createdAssignedLocations"];
        }
        if (args["deletedAssignedLocations"] !== undefined) {
          body["deletedAssignedLocations"] = args["deletedAssignedLocations"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.locationLists.assignedLocations.bulkEdit",
            "path":
              "v4/advertisers/{advertiserId}/locationLists/{+locationListId}/assignedLocations:bulkEdit",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "locationListId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "locationListId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
