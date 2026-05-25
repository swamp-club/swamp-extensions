// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-clients-users
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients.Users.
 *
 * A client user is created under a client buyer and has restricted access to the Marketplace and certain other sections of the Authorized Buyers UI based on the role granted to the associated client buyer. The only way a new client user can be created is through accepting an email invitation (see the accounts.clients.invitations.create method). All fields are required unless otherwise specified.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.users.get",
  "path":
    "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users/{userId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "clientAccountId",
    "userId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "clientAccountId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.users.update",
  "path":
    "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users/{userId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "clientAccountId",
    "userId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "clientAccountId": {
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
  "id": "adexchangebuyer2.accounts.clients.users.list",
  "path": "v2beta1/accounts/{accountId}/clients/{clientAccountId}/users",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "clientAccountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "clientAccountId": {
      "location": "path",
      "required": true,
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
  clientAccountId: z.string().describe(
    "Numerical account ID of the client buyer with which the user is associated; the buyer must be a client of the current sponsor buyer. The value of this field is ignored in an update operation.",
  ).optional(),
  email: z.string().describe(
    "User's email address. The value of this field is ignored in an update operation.",
  ).optional(),
  status: z.enum(["USER_STATUS_UNSPECIFIED", "PENDING", "ACTIVE", "DISABLED"])
    .describe("The status of the client user.").optional(),
  userId: z.string().describe(
    "The unique numerical ID of the client user that has accepted an invitation. The value of this field is ignored in an update operation.",
  ).optional(),
});

const StateSchema = z.object({
  clientAccountId: z.string().optional(),
  email: z.string().optional(),
  status: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  clientAccountId: z.string().describe(
    "Numerical account ID of the client buyer with which the user is associated; the buyer must be a client of the current sponsor buyer. The value of this field is ignored in an update operation.",
  ).optional(),
  email: z.string().describe(
    "User's email address. The value of this field is ignored in an update operation.",
  ).optional(),
  status: z.enum(["USER_STATUS_UNSPECIFIED", "PENDING", "ACTIVE", "DISABLED"])
    .describe("The status of the client user.").optional(),
  userId: z.string().describe(
    "The unique numerical ID of the client user that has accepted an invitation. The value of this field is ignored in an update operation.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients.Users. Registered at `@swamp/gcp/adexchangebuyer2/accounts-clients-users`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-clients-users",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A client user is created under a client buyer and has restricted access to th...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["clientAccountId"] !== undefined) {
          params["clientAccountId"] = String(g["clientAccountId"]);
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
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        if (g["clientAccountId"] !== undefined) {
          params["clientAccountId"] = String(g["clientAccountId"]);
        } else if (existing["clientAccountId"]) {
          params["clientAccountId"] = String(existing["clientAccountId"]);
        }
        params["userId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["email"] !== undefined) body["email"] = g["email"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["clientAccountId"] !== undefined) {
            params["clientAccountId"] = String(g["clientAccountId"]);
          } else if (existing["clientAccountId"]) {
            params["clientAccountId"] = String(existing["clientAccountId"]);
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
    list: {
      description: "List users resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer clients than requested. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["clientAccountId"] !== undefined) {
          params["clientAccountId"] = String(g["clientAccountId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "users",
          (args.maxPages as number | undefined) ?? 10,
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
