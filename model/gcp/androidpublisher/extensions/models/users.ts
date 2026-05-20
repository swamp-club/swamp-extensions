// Auto-generated extension model for @swamp/gcp/androidpublisher/users
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Users.
 *
 * A user resource.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const INSERT_CONFIG = {
  "id": "androidpublisher.users.create",
  "path": "androidpublisher/v3/{+parent}/users",
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
  "id": "androidpublisher.users.patch",
  "path": "androidpublisher/v3/{+name}",
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
  "id": "androidpublisher.users.delete",
  "path": "androidpublisher/v3/{+name}",
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
  "id": "androidpublisher.users.list",
  "path": "androidpublisher/v3/{+parent}/users",
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
  developerAccountPermissions: z.array(
    z.enum([
      "DEVELOPER_LEVEL_PERMISSION_UNSPECIFIED",
      "CAN_SEE_ALL_APPS",
      "CAN_VIEW_FINANCIAL_DATA_GLOBAL",
      "CAN_MANAGE_PERMISSIONS_GLOBAL",
      "CAN_EDIT_GAMES_GLOBAL",
      "CAN_PUBLISH_GAMES_GLOBAL",
      "CAN_REPLY_TO_REVIEWS_GLOBAL",
      "CAN_MANAGE_PUBLIC_APKS_GLOBAL",
      "CAN_MANAGE_TRACK_APKS_GLOBAL",
      "CAN_MANAGE_TRACK_USERS_GLOBAL",
      "CAN_MANAGE_PUBLIC_LISTING_GLOBAL",
      "CAN_MANAGE_DRAFT_APPS_GLOBAL",
      "CAN_CREATE_MANAGED_PLAY_APPS_GLOBAL",
      "CAN_CHANGE_MANAGED_PLAY_SETTING_GLOBAL",
      "CAN_MANAGE_ORDERS_GLOBAL",
      "CAN_MANAGE_APP_CONTENT_GLOBAL",
      "CAN_VIEW_NON_FINANCIAL_DATA_GLOBAL",
      "CAN_VIEW_APP_QUALITY_GLOBAL",
      "CAN_MANAGE_DEEPLINKS_GLOBAL",
      "CAN_VIEW_CONNECTED_APPS_GLOBAL",
      "CAN_EDIT_CONNECTED_APPS_GLOBAL",
    ]),
  ).describe(
    "Permissions for the user which apply across the developer account.",
  ).optional(),
  email: z.string().describe("Immutable. The user's email address.").optional(),
  expirationTime: z.string().describe(
    "The time at which the user's access expires, if set. When setting this value, it must always be in the future.",
  ).optional(),
  name: z.string().describe(
    'Required. Resource name for this user, following the pattern "developers/{developer}/users/{email}".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessState: z.string().optional(),
  developerAccountPermissions: z.array(z.string()).optional(),
  email: z.string().optional(),
  expirationTime: z.string().optional(),
  grants: z.array(z.object({
    appLevelPermissions: z.array(z.string()),
    name: z.string(),
    packageName: z.string(),
  })).optional(),
  name: z.string(),
  partial: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  developerAccountPermissions: z.array(
    z.enum([
      "DEVELOPER_LEVEL_PERMISSION_UNSPECIFIED",
      "CAN_SEE_ALL_APPS",
      "CAN_VIEW_FINANCIAL_DATA_GLOBAL",
      "CAN_MANAGE_PERMISSIONS_GLOBAL",
      "CAN_EDIT_GAMES_GLOBAL",
      "CAN_PUBLISH_GAMES_GLOBAL",
      "CAN_REPLY_TO_REVIEWS_GLOBAL",
      "CAN_MANAGE_PUBLIC_APKS_GLOBAL",
      "CAN_MANAGE_TRACK_APKS_GLOBAL",
      "CAN_MANAGE_TRACK_USERS_GLOBAL",
      "CAN_MANAGE_PUBLIC_LISTING_GLOBAL",
      "CAN_MANAGE_DRAFT_APPS_GLOBAL",
      "CAN_CREATE_MANAGED_PLAY_APPS_GLOBAL",
      "CAN_CHANGE_MANAGED_PLAY_SETTING_GLOBAL",
      "CAN_MANAGE_ORDERS_GLOBAL",
      "CAN_MANAGE_APP_CONTENT_GLOBAL",
      "CAN_VIEW_NON_FINANCIAL_DATA_GLOBAL",
      "CAN_VIEW_APP_QUALITY_GLOBAL",
      "CAN_MANAGE_DEEPLINKS_GLOBAL",
      "CAN_VIEW_CONNECTED_APPS_GLOBAL",
      "CAN_EDIT_CONNECTED_APPS_GLOBAL",
    ]),
  ).describe(
    "Permissions for the user which apply across the developer account.",
  ).optional(),
  email: z.string().describe("Immutable. The user's email address.").optional(),
  expirationTime: z.string().describe(
    "The time at which the user's access expires, if set. When setting this value, it must always be in the future.",
  ).optional(),
  name: z.string().describe(
    'Required. Resource name for this user, following the pattern "developers/{developer}/users/{email}".',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Users. Registered at `@swamp/gcp/androidpublisher/users`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/users",
  version: "2026.05.20.1",
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
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A user resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a users",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["developerAccountPermissions"] !== undefined) {
          body["developerAccountPermissions"] =
            g["developerAccountPermissions"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
    update: {
      description: "Update users attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["developerAccountPermissions"] !== undefined) {
          body["developerAccountPermissions"] =
            g["developerAccountPermissions"];
        }
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
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
      description: "Delete the users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync users state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
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
