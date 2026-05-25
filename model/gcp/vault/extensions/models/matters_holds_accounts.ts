// Auto-generated extension model for @swamp/gcp/vault/matters-holds-accounts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Vault Matters.Holds.Accounts.
 *
 * An account covered by a hold. This structure is immutable. It can be an individual account or a Google Group, depending on the service. To work with Vault resources, the account must have the [required Vault privileges] (https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://vault.googleapis.com/";

const INSERT_CONFIG = {
  "id": "vault.matters.holds.accounts.create",
  "path": "v1/matters/{matterId}/holds/{holdId}/accounts",
  "httpMethod": "POST",
  "parameterOrder": [
    "matterId",
    "holdId",
  ],
  "parameters": {
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vault.matters.holds.accounts.delete",
  "path": "v1/matters/{matterId}/holds/{holdId}/accounts/{accountId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "matterId",
    "holdId",
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "vault.matters.holds.accounts.list",
  "path": "v1/matters/{matterId}/holds/{holdId}/accounts",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
    "holdId",
  ],
  "parameters": {
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountId: z.string().describe(
    "The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
  ).optional(),
  email: z.string().describe(
    "The primary email address of the account. If used as an input, this takes precedence over **accountId**.",
  ).optional(),
  matterId: z.string().describe("The matter ID."),
  holdId: z.string().describe("The hold ID."),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  holdTime: z.string().optional(),
  lastName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
  ).optional(),
  email: z.string().describe(
    "The primary email address of the account. If used as an input, this takes precedence over **accountId**.",
  ).optional(),
  matterId: z.string().describe("The matter ID.").optional(),
  holdId: z.string().describe("The hold ID.").optional(),
});

/** Swamp extension model for Google Cloud Google Vault Matters.Holds.Accounts. Registered at `@swamp/gcp/vault/matters-holds-accounts`. */
export const model = {
  type: "@swamp/gcp/vault/matters-holds-accounts",
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
        "An account covered by a hold. This structure is immutable. It can be an indiv...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accounts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (g["holdId"] !== undefined) params["holdId"] = String(g["holdId"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["email"] !== undefined) body["email"] = g["email"];
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
              "matterId": String(g["matterId"] ?? ""),
              "holdId": String(g["holdId"] ?? ""),
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
      description: "Get a accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (g["holdId"] !== undefined) params["holdId"] = String(g["holdId"]);
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
      description: "Delete the accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (g["holdId"] !== undefined) params["holdId"] = String(g["holdId"]);
        params["accountId"] = args.identifier;
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
      description: "Sync accounts state from GCP",
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
          if (g["matterId"] !== undefined) {
            params["matterId"] = String(g["matterId"]);
          } else if (existing["matterId"]) {
            params["matterId"] = String(existing["matterId"]);
          }
          if (g["holdId"] !== undefined) params["holdId"] = String(g["holdId"]);
          else if (existing["holdId"]) {
            params["holdId"] = String(existing["holdId"]);
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
