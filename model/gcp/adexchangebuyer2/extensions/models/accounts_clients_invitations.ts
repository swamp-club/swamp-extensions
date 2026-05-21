// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-clients-invitations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients.Invitations.
 *
 * An invitation for a new client user to get access to the Authorized Buyers UI. All fields are required unless otherwise specified.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.invitations.get",
  "path":
    "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations/{invitationId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "clientAccountId",
    "invitationId",
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
    "invitationId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "adexchangebuyer2.accounts.clients.invitations.create",
  "path": "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations",
  "httpMethod": "POST",
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
  "id": "adexchangebuyer2.accounts.clients.invitations.list",
  "path": "v2beta1/accounts/{accountId}/clients/{clientAccountId}/invitations",
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
    "Numerical account ID of the client buyer that the invited user is associated with. The value of this field is ignored in create operations.",
  ).optional(),
  email: z.string().describe(
    "The email address to which the invitation is sent. Email addresses should be unique among all client users under each sponsor buyer.",
  ).optional(),
  invitationId: z.string().describe(
    "The unique numerical ID of the invitation that is sent to the user. The value of this field is ignored in create operations.",
  ).optional(),
  accountId: z.string().describe(
    "Numerical account ID of the client's sponsor buyer. (required)",
  ),
});

const StateSchema = z.object({
  clientAccountId: z.string().optional(),
  email: z.string().optional(),
  invitationId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  clientAccountId: z.string().describe(
    "Numerical account ID of the client buyer that the invited user is associated with. The value of this field is ignored in create operations.",
  ).optional(),
  email: z.string().describe(
    "The email address to which the invitation is sent. Email addresses should be unique among all client users under each sponsor buyer.",
  ).optional(),
  invitationId: z.string().describe(
    "The unique numerical ID of the invitation that is sent to the user. The value of this field is ignored in create operations.",
  ).optional(),
  accountId: z.string().describe(
    "Numerical account ID of the client's sponsor buyer. (required)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Clients.Invitations. Registered at `@swamp/gcp/adexchangebuyer2/accounts-clients-invitations`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-clients-invitations",
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
        "An invitation for a new client user to get access to the Authorized Buyers UI...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a invitations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["clientAccountId"] !== undefined) {
          params["clientAccountId"] = String(g["clientAccountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["invitationId"] !== undefined) {
          body["invitationId"] = g["invitationId"];
        }
        if (g["name"] !== undefined) params["invitationId"] = String(g["name"]);
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
              "accountId": String(g["accountId"] ?? ""),
              "clientAccountId": String(g["clientAccountId"] ?? ""),
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
      description: "Get a invitations",
      arguments: z.object({
        identifier: z.string().describe("The name of the invitations"),
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
        params["invitationId"] = args.identifier;
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
    sync: {
      description: "Sync invitations state from GCP",
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
          params["invitationId"] = identifier;
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
