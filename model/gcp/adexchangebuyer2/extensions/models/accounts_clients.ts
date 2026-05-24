// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-clients
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients.
 *
 * A client resource represents a client buyer—an agency, a brand, or an advertiser customer of the sponsor buyer. Users associated with the client buyer have restricted access to the Marketplace and certain other sections of the Authorized Buyers UI based on the role granted to the client buyer. All fields are required unless otherwise specified.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.get",
  "path": "v2beta1/accounts/{accountId}/clients/{clientAccountId}",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.create",
  "path": "v2beta1/accounts/{accountId}/clients",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.update",
  "path": "v2beta1/accounts/{accountId}/clients/{clientAccountId}",
  "httpMethod": "PUT",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.list",
  "path": "v2beta1/accounts/{accountId}/clients",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "partnerClientId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  clientAccountId: z.string().describe(
    "The globally-unique numerical ID of the client. The value of this field is ignored in create and update operations.",
  ).optional(),
  clientName: z.string().describe(
    "Name used to represent this client to publishers. You may have multiple clients that map to the same entity, but for each client the combination of `clientName` and entity must be unique. You can specify this field as empty. Maximum length of 255 characters is allowed.",
  ).optional(),
  entityId: z.string().describe(
    "Numerical identifier of the client entity. The entity can be an advertiser, a brand, or an agency. This identifier is unique among all the entities with the same type. The value of this field is ignored if the entity type is not provided. A list of all known advertisers with their identifiers is available in the [advertisers.txt](https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt) file. A list of all known brands with their identifiers is available in the [brands.txt](https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt) file. A list of all known agencies with their identifiers is available in the [agencies.txt](https://storage.googleapis.com/adx-rtb-dictionaries/agencies.txt) file.",
  ).optional(),
  entityName: z.string().describe(
    "The name of the entity. This field is automatically fetched based on the type and ID. The value of this field is ignored in create and update operations.",
  ).optional(),
  entityType: z.enum([
    "ENTITY_TYPE_UNSPECIFIED",
    "ADVERTISER",
    "BRAND",
    "AGENCY",
    "ENTITY_TYPE_UNCLASSIFIED",
  ]).describe(
    "An optional field for specifying the type of the client entity: `ADVERTISER`, `BRAND`, or `AGENCY`.",
  ).optional(),
  partnerClientId: z.string().describe(
    "Optional arbitrary unique identifier of this client buyer from the standpoint of its Ad Exchange sponsor buyer. This field can be used to associate a client buyer with the identifier in the namespace of its sponsor buyer, lookup client buyers by that identifier and verify whether an Ad Exchange counterpart of a given client buyer already exists. If present, must be unique among all the client buyers for its Ad Exchange sponsor buyer.",
  ).optional(),
  role: z.enum([
    "CLIENT_ROLE_UNSPECIFIED",
    "CLIENT_DEAL_VIEWER",
    "CLIENT_DEAL_NEGOTIATOR",
    "CLIENT_DEAL_APPROVER",
  ]).describe(
    "The role which is assigned to the client buyer. Each role implies a set of permissions granted to the client. Must be one of `CLIENT_DEAL_VIEWER`, `CLIENT_DEAL_NEGOTIATOR` or `CLIENT_DEAL_APPROVER`.",
  ).optional(),
  status: z.enum(["CLIENT_STATUS_UNSPECIFIED", "DISABLED", "ACTIVE"]).describe(
    "The status of the client buyer.",
  ).optional(),
  visibleToSeller: z.boolean().describe(
    "Whether the client buyer will be visible to sellers.",
  ).optional(),
  accountId: z.string().describe(
    "Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to create a client for. (required)",
  ),
});

const StateSchema = z.object({
  clientAccountId: z.string().optional(),
  clientName: z.string().optional(),
  entityId: z.string().optional(),
  entityName: z.string().optional(),
  entityType: z.string().optional(),
  partnerClientId: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  visibleToSeller: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  clientAccountId: z.string().describe(
    "The globally-unique numerical ID of the client. The value of this field is ignored in create and update operations.",
  ).optional(),
  clientName: z.string().describe(
    "Name used to represent this client to publishers. You may have multiple clients that map to the same entity, but for each client the combination of `clientName` and entity must be unique. You can specify this field as empty. Maximum length of 255 characters is allowed.",
  ).optional(),
  entityId: z.string().describe(
    "Numerical identifier of the client entity. The entity can be an advertiser, a brand, or an agency. This identifier is unique among all the entities with the same type. The value of this field is ignored if the entity type is not provided. A list of all known advertisers with their identifiers is available in the [advertisers.txt](https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt) file. A list of all known brands with their identifiers is available in the [brands.txt](https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt) file. A list of all known agencies with their identifiers is available in the [agencies.txt](https://storage.googleapis.com/adx-rtb-dictionaries/agencies.txt) file.",
  ).optional(),
  entityName: z.string().describe(
    "The name of the entity. This field is automatically fetched based on the type and ID. The value of this field is ignored in create and update operations.",
  ).optional(),
  entityType: z.enum([
    "ENTITY_TYPE_UNSPECIFIED",
    "ADVERTISER",
    "BRAND",
    "AGENCY",
    "ENTITY_TYPE_UNCLASSIFIED",
  ]).describe(
    "An optional field for specifying the type of the client entity: `ADVERTISER`, `BRAND`, or `AGENCY`.",
  ).optional(),
  partnerClientId: z.string().describe(
    "Optional arbitrary unique identifier of this client buyer from the standpoint of its Ad Exchange sponsor buyer. This field can be used to associate a client buyer with the identifier in the namespace of its sponsor buyer, lookup client buyers by that identifier and verify whether an Ad Exchange counterpart of a given client buyer already exists. If present, must be unique among all the client buyers for its Ad Exchange sponsor buyer.",
  ).optional(),
  role: z.enum([
    "CLIENT_ROLE_UNSPECIFIED",
    "CLIENT_DEAL_VIEWER",
    "CLIENT_DEAL_NEGOTIATOR",
    "CLIENT_DEAL_APPROVER",
  ]).describe(
    "The role which is assigned to the client buyer. Each role implies a set of permissions granted to the client. Must be one of `CLIENT_DEAL_VIEWER`, `CLIENT_DEAL_NEGOTIATOR` or `CLIENT_DEAL_APPROVER`.",
  ).optional(),
  status: z.enum(["CLIENT_STATUS_UNSPECIFIED", "DISABLED", "ACTIVE"]).describe(
    "The status of the client buyer.",
  ).optional(),
  visibleToSeller: z.boolean().describe(
    "Whether the client buyer will be visible to sellers.",
  ).optional(),
  accountId: z.string().describe(
    "Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to create a client for. (required)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients. Registered at `@swamp/gcp/adexchangebuyer2/accounts-clients`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-clients",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A client resource represents a client buyer—an agency, a brand, or an adverti...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a clients",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["clientAccountId"] !== undefined) {
          body["clientAccountId"] = g["clientAccountId"];
        }
        if (g["clientName"] !== undefined) body["clientName"] = g["clientName"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["entityName"] !== undefined) body["entityName"] = g["entityName"];
        if (g["entityType"] !== undefined) body["entityType"] = g["entityType"];
        if (g["partnerClientId"] !== undefined) {
          body["partnerClientId"] = g["partnerClientId"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["visibleToSeller"] !== undefined) {
          body["visibleToSeller"] = g["visibleToSeller"];
        }
        if (g["name"] !== undefined) {
          params["clientAccountId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
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
          {
            listConfig: LIST_CONFIG,
            listParams: { "accountId": String(g["accountId"] ?? "") },
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
      description: "Get a clients",
      arguments: z.object({
        identifier: z.string().describe("The name of the clients"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["clientAccountId"] = args.identifier;
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
      description: "Update clients attributes",
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
        params["clientAccountId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["clientName"] !== undefined) body["clientName"] = g["clientName"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["entityName"] !== undefined) body["entityName"] = g["entityName"];
        if (g["entityType"] !== undefined) body["entityType"] = g["entityType"];
        if (g["partnerClientId"] !== undefined) {
          body["partnerClientId"] = g["partnerClientId"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["visibleToSeller"] !== undefined) {
          body["visibleToSeller"] = g["visibleToSeller"];
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
      description: "Sync clients state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["clientAccountId"] = identifier;
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
  },
};
