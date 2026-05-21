// Auto-generated extension model for @swamp/gcp/dfareporting/dynamictargetingkeys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 DynamicTargetingKeys.
 *
 * Contains properties of a dynamic targeting key. Dynamic targeting keys are unique, user-friendly labels, created at the advertiser level in DCM, that can be assigned to ads, creatives, and placements and used for targeting with Studio dynamic creatives. Use these labels instead of numeric Campaign Manager IDs (such as placement IDs) to save time and avoid errors in your dynamic feeds.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const INSERT_CONFIG = {
  "id": "dfareporting.dynamicTargetingKeys.insert",
  "path": "userprofiles/{+profileId}/dynamicTargetingKeys",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dfareporting.dynamicTargetingKeys.delete",
  "path": "userprofiles/{+profileId}/dynamicTargetingKeys/{+objectId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "profileId",
    "objectId",
    "name",
    "objectType",
  ],
  "parameters": {
    "name": {
      "location": "query",
      "required": true,
    },
    "objectId": {
      "location": "path",
      "required": true,
    },
    "objectType": {
      "location": "query",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.dynamicTargetingKeys.list",
  "path": "userprofiles/{+profileId}/dynamicTargetingKeys",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "names": {
      "location": "query",
    },
    "objectId": {
      "location": "query",
    },
    "objectType": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Name of this dynamic targeting key. This is a required field. Must be less than 256 characters long and cannot contain commas. All characters are converted to lowercase.",
  ).optional(),
  objectId: z.string().describe(
    "ID of the object of this dynamic targeting key. This is a required field.",
  ).optional(),
  objectType: z.enum([
    "OBJECT_ADVERTISER",
    "OBJECT_AD",
    "OBJECT_CREATIVE",
    "OBJECT_PLACEMENT",
  ]).describe(
    "Type of the object of this dynamic targeting key. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  kind: z.string().optional(),
  name: z.string(),
  objectId: z.string().optional(),
  objectType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().describe(
    "Name of this dynamic targeting key. This is a required field. Must be less than 256 characters long and cannot contain commas. All characters are converted to lowercase.",
  ).optional(),
  objectId: z.string().describe(
    "ID of the object of this dynamic targeting key. This is a required field.",
  ).optional(),
  objectType: z.enum([
    "OBJECT_ADVERTISER",
    "OBJECT_AD",
    "OBJECT_CREATIVE",
    "OBJECT_PLACEMENT",
  ]).describe(
    "Type of the object of this dynamic targeting key. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 DynamicTargetingKeys. Registered at `@swamp/gcp/dfareporting/dynamictargetingkeys`. */
export const model = {
  type: "@swamp/gcp/dfareporting/dynamictargetingkeys",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Contains properties of a dynamic targeting key. Dynamic targeting keys are un...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dynamicTargetingKeys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectId"] !== undefined) body["objectId"] = g["objectId"];
        if (g["objectType"] !== undefined) body["objectType"] = g["objectType"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "profileId": String(g["profileId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a dynamicTargetingKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the dynamicTargetingKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    delete: {
      description: "Delete the dynamicTargetingKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the dynamicTargetingKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (g["objectId"] !== undefined) {
          params["objectId"] = String(g["objectId"]);
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        params["objectType"] = args.identifier;
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
      description: "Sync dynamicTargetingKeys state from GCP",
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
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
  },
};
