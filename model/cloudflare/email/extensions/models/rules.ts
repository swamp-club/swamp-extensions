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

// Auto-generated extension model for @swamp/cloudflare/email/rules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Rules.
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
  zone_id: z.string().describe("Cloudflare zone ID"),
  actions: z.array(z.object({
    type: z.enum(["drop", "forward", "worker"]),
    value: z.array(z.string().max(90)).optional(),
  })).describe("List actions patterns.").optional(),
  enabled: z.boolean().describe("Routing rule status.").optional(),
  matchers: z.array(z.object({
    field: z.enum(["to"]).optional(),
    type: z.enum(["all", "literal"]),
    value: z.string().max(90).optional(),
  })).describe("Matching patterns to forward to your actions.").optional(),
  name: z.string().max(256).describe("Routing rule name.").optional(),
  owner_worker_tag: z.string().max(32).describe(
    "Public tag (script_tag) of the Worker that owns this rule. Required when\n`source` is `wrangler`.\n",
  ).optional(),
  priority: z.number().min(0).describe("Priority of the routing rule.")
    .optional(),
  source: z.enum(["api", "wrangler"]).describe(
    "Who manages the rule. `api` covers dashboard, generic API, and Terraform;\n`wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults\nto `api` when omitted on write.\n",
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
  actions: z.array(z.object({
    type: z.string().optional(),
    value: z.array(z.string()).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  matchers: z.array(z.object({
    field: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  priority: z.number().optional(),
  source: z.string().optional(),
  tag: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  actions: z.array(z.object({
    type: z.enum(["drop", "forward", "worker"]),
    value: z.array(z.string().max(90)).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  matchers: z.array(z.object({
    field: z.enum(["to"]).optional(),
    type: z.enum(["all", "literal"]),
    value: z.string().max(90).optional(),
  })).optional(),
  name: z.string().max(256).optional(),
  owner_worker_tag: z.string().max(32).optional(),
  priority: z.number().min(0).optional(),
  source: z.enum(["api", "wrangler"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/email/rules`. */
export const model = {
  type: "@swamp/cloudflare/email/rules",
  version: "2026.09.29.1",
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
      toVersion: "2026.07.14.1",
      description: "Added: owner_worker_tag, source",
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
      toVersion: "2026.08.25.2",
      description: "Added: owner_worker_tag, source",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Rules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["actions", "matchers"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
        const body: Record<string, unknown> = {};
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.matchers !== undefined) body.matchers = g.matchers;
        if (g.name !== undefined) body.name = g.name;
        if (g.owner_worker_tag !== undefined) {
          body.owner_worker_tag = g.owner_worker_tag;
        }
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.source !== undefined) body.source = g.source;
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
      description: "Get a Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
        "Look up an existing Rules by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
        const filters: [string, string][] = [];
        if (g.enabled !== undefined) {
          filters.push(["enabled", String(g.enabled)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.owner_worker_tag !== undefined) {
          filters.push(["owner_worker_tag", String(g.owner_worker_tag)]);
        }
        if (g.priority !== undefined) {
          filters.push(["priority", String(g.priority)]);
        }
        if (g.source !== undefined) filters.push(["source", String(g.source)]);
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
          throw new Error(`No rules found matching filters: ${filterDesc}`);
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
      description: "Import an existing Rules by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Rules to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
      description: "Update Rules attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Rules by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.matchers !== undefined) body.matchers = g.matchers;
        if (g.name !== undefined) body.name = g.name;
        if (g.owner_worker_tag !== undefined) {
          body.owner_worker_tag = g.owner_worker_tag;
        }
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.source !== undefined) body.source = g.source;
        const unset = ["actions", "matchers"].filter((k) =>
          body[k] === undefined
        );
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["actions", "matchers"].filter((k) =>
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
      description: "Delete the Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
      description: "Sync Rules state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Rules by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
