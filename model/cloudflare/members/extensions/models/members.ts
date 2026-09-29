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

// Auto-generated extension model for @swamp/cloudflare/members/members
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Members.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  id: z.string().max(32).describe("Membership identifier tag.").optional(),
  roles: z.array(z.string().max(32)).describe(
    "Array of roles associated with this member.",
  ).optional(),
  status: z.enum(["accepted", "pending"]).describe(
    "Status of the member invitation. If not provided during creation, defaults to 'pending'.\nChanging from 'accepted' back to 'pending' will trigger a replacement of the member resource in Terraform.\n",
  ).optional(),
  user: z.object({
    email: z.string().max(90),
    first_name: z.string().max(60).optional(),
    id: z.string().min(32).max(32).optional(),
    last_name: z.string().max(60).optional(),
    two_factor_authentication_enabled: z.boolean().optional(),
  }).describe("Details of the user associated to the membership.").optional(),
  policies: z.array(z.string()).describe(
    "Array of policies associated with this member.",
  ).optional(),
  email: z.string().max(90).describe("The contact email address of the user.")
    .optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  email: z.string().optional(),
  id: z.string(),
  policies: z.array(z.string()).optional(),
  roles: z.array(z.object({
    description: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    permissions: z.object({
      analytics: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      billing: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      cache_purge: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      dns: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      dns_records: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      lb: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      logs: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      organization: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      ssl: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      waf: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      zone_settings: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
      zones: z.object({
        read: z.boolean().optional(),
        write: z.boolean().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  status: z.string().optional(),
  user: z.object({
    email: z.string().optional(),
    first_name: z.string().optional(),
    id: z.string().optional(),
    last_name: z.string().optional(),
    two_factor_authentication_enabled: z.boolean().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  id: z.string().max(32).optional(),
  roles: z.array(z.string().max(32)).optional(),
  status: z.enum(["accepted", "pending"]).optional(),
  user: z.object({
    email: z.string().max(90),
    first_name: z.string().max(60).optional(),
    id: z.string().min(32).max(32).optional(),
    last_name: z.string().max(60).optional(),
    two_factor_authentication_enabled: z.boolean().optional(),
  }).optional(),
  policies: z.array(z.string()).optional(),
  email: z.string().max(90).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Members. Registered at `@swamp/cloudflare/members/members`. */
export const model = {
  type: "@swamp/cloudflare/members/members",
  version: "2026.09.29.2",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken",
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
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Members resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Members",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["email"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/members";
        const body: Record<string, unknown> = {};
        if (g.email !== undefined) body.email = g.email;
        if (g.roles !== undefined) body.roles = g.roles;
        if (g.status !== undefined) body.status = g.status;
        if (g.policies !== undefined) body.policies = g.policies;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
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
      description: "Get a Members",
      arguments: z.object({ id: z.string().describe("The ID of the Members") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
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
        "Look up an existing Members by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
        const filters: [string, string][] = [];
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.status !== undefined) filters.push(["status", String(g.status)]);
        if (g.email !== undefined) filters.push(["email", String(g.email)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
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
          throw new Error(`No members found matching filters: ${filterDesc}`);
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
      description: "Import an existing Members by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Members to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
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
      description: "Update Members attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Members by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
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
        if (g.id !== undefined) body.id = g.id;
        if (g.roles !== undefined) body.roles = g.roles;
        if (g.status !== undefined) body.status = g.status;
        if (g.user !== undefined) body.user = g.user;
        if (g.policies !== undefined) body.policies = g.policies;
        const unset = ["id", "policies", "roles", "status", "user"].filter((
          k,
        ) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
          });
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
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
      description: "Delete the Members",
      arguments: z.object({ id: z.string().describe("The ID of the Members") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
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
      description: "Sync Members state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Members by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/members";
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
