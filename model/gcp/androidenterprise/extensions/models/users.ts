// Auto-generated extension model for @swamp/gcp/androidenterprise/users
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Users.
 *
 * A Users resource represents an account associated with an enterprise. The account may be specific to a device or to an individual user (who can then use the account across multiple devices). The account may provide access to managed Google Play only, or to other Google services, depending on the identity model: - The Google managed domain identity model requires synchronization to Google account sources (via primaryEmail). - The managed Google Play Accounts identity model provides a dynamic means for enterprises to create user or device accounts as needed. These accounts provide access to managed Google Play.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.users.get",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "userId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidenterprise.users.insert",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/users",
  "httpMethod": "POST",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidenterprise.users.update",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "userId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.users.delete",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "userId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidenterprise.users.list",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/users",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "email",
  ],
  "parameters": {
    "email": {
      "location": "query",
      "required": true,
    },
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountIdentifier: z.string().describe(
    'A unique identifier you create for this user, such as "user342" or "asset#44418". Do not use personally identifiable information (PII) for this property. Must always be set for EMM-managed users. Not set for Google-managed users.',
  ),
  accountType: z.enum(["deviceAccount", "userAccount"]).describe(
    "The type of account that this user represents. A userAccount can be installed on multiple devices, but a deviceAccount is specific to a single device. An EMM-managed user (emmManaged) can be either type (userAccount, deviceAccount), but a Google-managed user (googleManaged) is always a userAccount.",
  ),
  displayName: z.string().describe(
    'The name that will appear in user interfaces. Setting this property is optional when creating EMM-managed users. If you do set this property, use something generic about the organization (such as "Example, Inc.") or your name (as EMM). Not used for Google-managed user accounts. @mutable androidenterprise.users.update',
  ).optional(),
  id: z.string().describe("The unique ID for the user.").optional(),
  managementType: z.enum(["googleManaged", "emmManaged"]).describe(
    "The entity that manages the user. With googleManaged users, the source of truth is Google so EMMs have to make sure a Google Account exists for the user. With emmManaged users, the EMM is in charge.",
  ).optional(),
  primaryEmail: z.string().describe(
    'The user\'s primary email address, for example, "jsmith@example.com". Will always be set for Google managed users and not set for EMM managed users.',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise."),
});

const StateSchema = z.object({
  accountIdentifier: z.string().optional(),
  accountType: z.string().optional(),
  displayName: z.string().optional(),
  id: z.string().optional(),
  managementType: z.string().optional(),
  primaryEmail: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountIdentifier: z.string().describe(
    'A unique identifier you create for this user, such as "user342" or "asset#44418". Do not use personally identifiable information (PII) for this property. Must always be set for EMM-managed users. Not set for Google-managed users.',
  ).optional(),
  accountType: z.enum(["deviceAccount", "userAccount"]).describe(
    "The type of account that this user represents. A userAccount can be installed on multiple devices, but a deviceAccount is specific to a single device. An EMM-managed user (emmManaged) can be either type (userAccount, deviceAccount), but a Google-managed user (googleManaged) is always a userAccount.",
  ).optional(),
  displayName: z.string().describe(
    'The name that will appear in user interfaces. Setting this property is optional when creating EMM-managed users. If you do set this property, use something generic about the organization (such as "Example, Inc.") or your name (as EMM). Not used for Google-managed user accounts. @mutable androidenterprise.users.update',
  ).optional(),
  id: z.string().describe("The unique ID for the user.").optional(),
  managementType: z.enum(["googleManaged", "emmManaged"]).describe(
    "The entity that manages the user. With googleManaged users, the source of truth is Google so EMMs have to make sure a Google Account exists for the user. With emmManaged users, the EMM is in charge.",
  ).optional(),
  primaryEmail: z.string().describe(
    'The user\'s primary email address, for example, "jsmith@example.com". Will always be set for Google managed users and not set for EMM managed users.',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise.").optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Users. Registered at `@swamp/gcp/androidenterprise/users`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/users",
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
        "A Users resource represents an account associated with an enterprise. The acc...",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountIdentifier"] !== undefined) {
          body["accountIdentifier"] = g["accountIdentifier"];
        }
        if (g["accountType"] !== undefined) {
          body["accountType"] = g["accountType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["managementType"] !== undefined) {
          body["managementType"] = g["managementType"];
        }
        if (g["primaryEmail"] !== undefined) {
          body["primaryEmail"] = g["primaryEmail"];
        }
        if (g["name"] !== undefined) params["userId"] = String(g["name"]);
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
              "enterpriseId": String(g["enterpriseId"] ?? ""),
              "email": String(g["email"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["userId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        } else if (existing["enterpriseId"]) {
          params["enterpriseId"] = String(existing["enterpriseId"]);
        }
        params["userId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountIdentifier"] !== undefined) {
          body["accountIdentifier"] = g["accountIdentifier"];
        }
        if (g["accountType"] !== undefined) {
          body["accountType"] = g["accountType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["managementType"] !== undefined) {
          body["managementType"] = g["managementType"];
        }
        if (g["primaryEmail"] !== undefined) {
          body["primaryEmail"] = g["primaryEmail"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["userId"] = args.identifier;
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["userId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
    generate_authentication_token: {
      description: "generate authentication token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
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
        params["userId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.users.generateAuthenticationToken",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/authenticationToken",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId", "userId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_available_product_set: {
      description: "get available product set",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
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
        params["userId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.users.getAvailableProductSet",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/availableProductSet",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId", "userId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    revoke_device_access: {
      description: "revoke device access",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
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
        params["userId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.users.revokeDeviceAccess",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/deviceAccess",
            "httpMethod": "DELETE",
            "parameterOrder": ["enterpriseId", "userId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_available_product_set: {
      description: "set available product set",
      arguments: z.object({
        productId: z.any().optional(),
        productSetBehavior: z.any().optional(),
        productVisibility: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
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
        params["userId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        if (args["productSetBehavior"] !== undefined) {
          body["productSetBehavior"] = args["productSetBehavior"];
        }
        if (args["productVisibility"] !== undefined) {
          body["productVisibility"] = args["productVisibility"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.users.setAvailableProductSet",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/availableProductSet",
            "httpMethod": "PUT",
            "parameterOrder": ["enterpriseId", "userId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
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
