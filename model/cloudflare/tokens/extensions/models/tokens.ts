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

// Auto-generated extension model for @swamp/cloudflare/tokens/tokens
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Tokens.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  condition: z.object({
    request_ip: z.object({
      in: z.array(z.string()).optional(),
      not_in: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  creator_email_at_creation: z.string().max(90).describe(
    "The email address of the user who created the token at the time of\ncreation. Only present for Account Owned API Tokens when a creator email\nwas available.",
  ).optional(),
  expires_on: z.string().describe(
    "The expiration time on or after which the JWT MUST NOT be accepted for processing.",
  ).optional(),
  id: z.string().max(32).describe("Token identifier tag.").optional(),
  issued_on: z.string().describe("The time on which the token was created.")
    .optional(),
  last_used_on: z.string().describe("Last time the token was used.").optional(),
  modified_on: z.string().describe("Last time the token was modified.")
    .optional(),
  name: z.string().max(120).describe("Token name.").optional(),
  not_before: z.string().describe(
    "The time before which the token MUST NOT be accepted for processing.",
  ).optional(),
  policies: z.array(z.object({
    effect: z.enum(["allow", "deny"]),
    id: z.string(),
    permission_groups: z.array(z.object({
      id: z.string(),
      meta: z.object({
        category: z.string().optional(),
        deprecated: z.string().optional(),
        description: z.string().optional(),
        editable: z.string().optional(),
        eol_at: z.string().optional(),
        label: z.string().optional(),
        scopes: z.string().optional(),
        visibility: z.string().optional(),
      }).optional(),
      name: z.string().optional(),
    })),
    resources: z.string(),
  })).describe("List of access policies assigned to the token.").optional(),
  provisioner_id: z.string().describe(
    "The identifier of the service that provisioned the token. For an\nOAuth-provisioned token, this is the OAuth client identifier. Present\nwhen `provisioner_type` is present and null when the identifier is\nunavailable.",
  ).optional(),
  provisioner_type: z.string().describe(
    "The type of service that provisioned the token. Only present for\nprovisioned Account Owned API Tokens.",
  ).optional(),
  status: z.enum(["active", "disabled", "expired"]).describe(
    "Status of the token.",
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  condition: z.object({
    request_ip: z.object({
      in: z.array(z.string()).optional(),
      not_in: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  creator_email_at_creation: z.string().optional(),
  expires_on: z.string().optional(),
  id: z.string(),
  issued_on: z.string().optional(),
  last_used_on: z.string().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  not_before: z.string().optional(),
  policies: z.array(z.object({
    effect: z.string().optional(),
    id: z.string().optional(),
    permission_groups: z.array(z.object({
      id: z.string().optional(),
      meta: z.object({
        category: z.string().optional(),
        deprecated: z.string().optional(),
        description: z.string().optional(),
        editable: z.string().optional(),
        eol_at: z.string().optional(),
        label: z.string().optional(),
        scopes: z.string().optional(),
        visibility: z.string().optional(),
      }).optional(),
      name: z.string().optional(),
    })).optional(),
    resources: z.string().optional(),
  })).optional(),
  provisioner_id: z.string().optional(),
  provisioner_type: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  condition: z.object({
    request_ip: z.object({
      in: z.array(z.string()).optional(),
      not_in: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  creator_email_at_creation: z.string().max(90).optional(),
  expires_on: z.string().optional(),
  id: z.string().max(32).optional(),
  issued_on: z.string().optional(),
  last_used_on: z.string().optional(),
  modified_on: z.string().optional(),
  name: z.string().max(120).optional(),
  not_before: z.string().optional(),
  policies: z.array(z.object({
    effect: z.enum(["allow", "deny"]),
    id: z.string(),
    permission_groups: z.array(z.object({
      id: z.string(),
      meta: z.object({
        category: z.string().optional(),
        deprecated: z.string().optional(),
        description: z.string().optional(),
        editable: z.string().optional(),
        eol_at: z.string().optional(),
        label: z.string().optional(),
        scopes: z.string().optional(),
        visibility: z.string().optional(),
      }).optional(),
      name: z.string().optional(),
    })),
    resources: z.string(),
  })).optional(),
  provisioner_id: z.string().optional(),
  provisioner_type: z.string().optional(),
  status: z.enum(["active", "disabled", "expired"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Tokens. Registered at `@swamp/cloudflare/tokens/tokens`. */
export const model = {
  type: "@swamp/cloudflare/tokens/tokens",
  version: "2026.10.01.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description:
        "Added: creator_email_at_creation, provisioner_id, provisioner_type",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Tokens resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Tokens",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "policies"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const body: Record<string, unknown> = {};
        if (g.condition !== undefined) body.condition = g.condition;
        if (g.expires_on !== undefined) body.expires_on = g.expires_on;
        if (g.name !== undefined) body.name = g.name;
        if (g.not_before !== undefined) body.not_before = g.not_before;
        if (g.policies !== undefined) body.policies = g.policies;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Tokens",
      arguments: z.object({ id: z.string().describe("The ID of the Tokens") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
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
    lookup: {
      description:
        "Look up an existing Tokens by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const filters: [string, string][] = [];
        if (g.creator_email_at_creation !== undefined) {
          filters.push([
            "creator_email_at_creation",
            String(g.creator_email_at_creation),
          ]);
        }
        if (g.expires_on !== undefined) {
          filters.push(["expires_on", String(g.expires_on)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.issued_on !== undefined) {
          filters.push(["issued_on", String(g.issued_on)]);
        }
        if (g.last_used_on !== undefined) {
          filters.push(["last_used_on", String(g.last_used_on)]);
        }
        if (g.modified_on !== undefined) {
          filters.push(["modified_on", String(g.modified_on)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.not_before !== undefined) {
          filters.push(["not_before", String(g.not_before)]);
        }
        if (g.provisioner_id !== undefined) {
          filters.push(["provisioner_id", String(g.provisioner_id)]);
        }
        if (g.provisioner_type !== undefined) {
          filters.push(["provisioner_type", String(g.provisioner_type)]);
        }
        if (g.status !== undefined) filters.push(["status", String(g.status)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(`No tokens found matching filters: ${filterDesc}`);
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
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
    adopt: {
      description: "Import an existing Tokens by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Tokens to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      description: "Update Tokens attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Tokens by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.condition !== undefined) body.condition = g.condition;
        if (g.creator_email_at_creation !== undefined) {
          body.creator_email_at_creation = g.creator_email_at_creation;
        }
        if (g.expires_on !== undefined) body.expires_on = g.expires_on;
        if (g.id !== undefined) body.id = g.id;
        if (g.issued_on !== undefined) body.issued_on = g.issued_on;
        if (g.last_used_on !== undefined) body.last_used_on = g.last_used_on;
        if (g.modified_on !== undefined) body.modified_on = g.modified_on;
        if (g.name !== undefined) body.name = g.name;
        if (g.not_before !== undefined) body.not_before = g.not_before;
        if (g.policies !== undefined) body.policies = g.policies;
        if (g.provisioner_id !== undefined) {
          body.provisioner_id = g.provisioner_id;
        }
        if (g.provisioner_type !== undefined) {
          body.provisioner_type = g.provisioner_type;
        }
        if (g.status !== undefined) body.status = g.status;
        const unset = [
          "condition",
          "creator_email_at_creation",
          "expires_on",
          "id",
          "issued_on",
          "last_used_on",
          "modified_on",
          "name",
          "not_before",
          "policies",
          "provisioner_id",
          "provisioner_type",
          "status",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["name", "policies"].filter((k) =>
          body[k] === undefined
        );
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Tokens",
      arguments: z.object({ id: z.string().describe("The ID of the Tokens") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Tokens state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Tokens by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/tokens";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
