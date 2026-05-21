// Auto-generated extension model for @swamp/gcp/displayvideo/inventorysourcegroups-assignedinventorysources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 InventorySourceGroups.AssignedInventorySources.
 *
 * An assignment between a targetable inventory source and an inventory source group.
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
  "id": "displayvideo.inventorySourceGroups.assignedInventorySources.create",
  "path":
    "v4/inventorySourceGroups/{+inventorySourceGroupId}/assignedInventorySources",
  "httpMethod": "POST",
  "parameterOrder": [
    "inventorySourceGroupId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "inventorySourceGroupId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.inventorySourceGroups.assignedInventorySources.delete",
  "path":
    "v4/inventorySourceGroups/{+inventorySourceGroupId}/assignedInventorySources/{+assignedInventorySourceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "inventorySourceGroupId",
    "assignedInventorySourceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "assignedInventorySourceId": {
      "location": "path",
      "required": true,
    },
    "inventorySourceGroupId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.inventorySourceGroups.assignedInventorySources.list",
  "path":
    "v4/inventorySourceGroups/{+inventorySourceGroupId}/assignedInventorySources",
  "httpMethod": "GET",
  "parameterOrder": [
    "inventorySourceGroupId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "filter": {
      "location": "query",
    },
    "inventorySourceGroupId": {
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
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  inventorySourceId: z.string().describe(
    "Required. The ID of the inventory source entity being targeted.",
  ).optional(),
  inventorySourceGroupId: z.string().describe(
    "Required. The ID of the inventory source group to which the assignment will be assigned.",
  ),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent inventory source group. The parent partner will not have access to this assigned inventory source.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent inventory source group. Only this partner will have write access to this assigned inventory source.",
  ).optional(),
});

const StateSchema = z.object({
  assignedInventorySourceId: z.string().optional(),
  inventorySourceId: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  inventorySourceId: z.string().describe(
    "Required. The ID of the inventory source entity being targeted.",
  ).optional(),
  inventorySourceGroupId: z.string().describe(
    "Required. The ID of the inventory source group to which the assignment will be assigned.",
  ).optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent inventory source group. The parent partner will not have access to this assigned inventory source.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent inventory source group. Only this partner will have write access to this assigned inventory source.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 InventorySourceGroups.AssignedInventorySources. Registered at `@swamp/gcp/displayvideo/inventorysourcegroups-assignedinventorysources`. */
export const model = {
  type:
    "@swamp/gcp/displayvideo/inventorysourcegroups-assignedinventorysources",
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
        "An assignment between a targetable inventory source and an inventory source g...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assignedInventorySources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["inventorySourceGroupId"] !== undefined) {
          params["inventorySourceGroupId"] = String(
            g["inventorySourceGroupId"],
          );
        }
        const body: Record<string, unknown> = {};
        if (g["inventorySourceId"] !== undefined) {
          body["inventorySourceId"] = g["inventorySourceId"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
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
              "inventorySourceGroupId": String(
                g["inventorySourceGroupId"] ?? "",
              ),
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
      description: "Get a assignedInventorySources",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the assignedInventorySources",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["inventorySourceGroupId"] !== undefined) {
          params["inventorySourceGroupId"] = String(
            g["inventorySourceGroupId"],
          );
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
      description: "Delete the assignedInventorySources",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the assignedInventorySources",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["inventorySourceGroupId"] !== undefined) {
          params["inventorySourceGroupId"] = String(
            g["inventorySourceGroupId"],
          );
        }
        params["assignedInventorySourceId"] = args.identifier;
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
      description: "Sync assignedInventorySources state from GCP",
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
          if (g["inventorySourceGroupId"] !== undefined) {
            params["inventorySourceGroupId"] = String(
              g["inventorySourceGroupId"],
            );
          } else if (existing["inventorySourceGroupId"]) {
            params["inventorySourceGroupId"] = String(
              existing["inventorySourceGroupId"],
            );
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
        advertiserId: z.any().optional(),
        createdAssignedInventorySources: z.any().optional(),
        deletedAssignedInventorySources: z.any().optional(),
        partnerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["inventorySourceGroupId"] !== undefined) {
          params["inventorySourceGroupId"] = String(
            g["inventorySourceGroupId"],
          );
        }
        const body: Record<string, unknown> = {};
        if (args["advertiserId"] !== undefined) {
          body["advertiserId"] = args["advertiserId"];
        }
        if (args["createdAssignedInventorySources"] !== undefined) {
          body["createdAssignedInventorySources"] =
            args["createdAssignedInventorySources"];
        }
        if (args["deletedAssignedInventorySources"] !== undefined) {
          body["deletedAssignedInventorySources"] =
            args["deletedAssignedInventorySources"];
        }
        if (args["partnerId"] !== undefined) {
          body["partnerId"] = args["partnerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.inventorySourceGroups.assignedInventorySources.bulkEdit",
            "path":
              "v4/inventorySourceGroups/{+inventorySourceGroupId}/assignedInventorySources:bulkEdit",
            "httpMethod": "POST",
            "parameterOrder": ["inventorySourceGroupId"],
            "parameters": {
              "inventorySourceGroupId": {
                "location": "path",
                "required": true,
              },
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
