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

// Auto-generated extension model for @swamp/cloudflare/challenges/widgets
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Widgets.
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
  bot_fight_mode: z.boolean().describe(
    "If bot_fight_mode is set to `true`, Cloudflare issues computationally\nexpensive challenges in response to malicious bots (ENT only).\n",
  ).optional(),
  clearance_level: z.enum([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]).describe(
    "If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,\nthis setting can determine the clearance level to be set\n",
  ).optional(),
  domains: z.array(z.string()).optional(),
  ephemeral_id: z.boolean().describe(
    "Return the Ephemeral ID in /siteverify (ENT only).\n",
  ).optional(),
  mode: z.enum(["non-interactive", "invisible", "managed"]).describe(
    "Widget Mode",
  ).optional(),
  name: z.string().min(1).max(254).describe(
    "Human readable widget name. Not unique. Cloudflare suggests that you\nset this to a meaningful string to make it easier to identify your\nwidget, and where it is used.\n",
  ).optional(),
  offlabel: z.boolean().describe(
    "Do not show any Cloudflare branding on the widget (ENT only).\n",
  ).optional(),
  region: z.enum(["world", "china"]).describe(
    "Region where this widget can be used. This cannot be changed after creation.\n",
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
  bot_fight_mode: z.boolean().optional(),
  clearance_level: z.string().optional(),
  created_on: z.string().optional(),
  deployed_via: z.string().optional(),
  domains: z.array(z.string()).optional(),
  ephemeral_id: z.boolean().optional(),
  last_modified_via: z.string().optional(),
  mode: z.string().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  offlabel: z.boolean().optional(),
  region: z.string().optional(),
  secret: z.string().optional(),
  sitekey: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  bot_fight_mode: z.boolean().optional(),
  clearance_level: z.enum([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]).optional(),
  domains: z.array(z.string()).optional(),
  ephemeral_id: z.boolean().optional(),
  mode: z.enum(["non-interactive", "invisible", "managed"]).optional(),
  name: z.string().min(1).max(254).optional(),
  offlabel: z.boolean().optional(),
  region: z.enum(["world", "china"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Widgets. Registered at `@swamp/cloudflare/challenges/widgets`. */
export const model = {
  type: "@swamp/cloudflare/challenges/widgets",
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
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.09.1",
      description: "No schema changes",
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
      description: "Widgets resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Widgets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["domains", "mode", "name"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
        const body: Record<string, unknown> = {};
        if (g.bot_fight_mode !== undefined) {
          body.bot_fight_mode = g.bot_fight_mode;
        }
        if (g.clearance_level !== undefined) {
          body.clearance_level = g.clearance_level;
        }
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.ephemeral_id !== undefined) body.ephemeral_id = g.ephemeral_id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.name !== undefined) body.name = g.name;
        if (g.offlabel !== undefined) body.offlabel = g.offlabel;
        if (g.region !== undefined) body.region = g.region;
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
      description: "Get a Widgets",
      arguments: z.object({ id: z.string().describe("The ID of the Widgets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
        "Look up an existing Widgets by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
        const filters: [string, string][] = [];
        if (g.bot_fight_mode !== undefined) {
          filters.push(["bot_fight_mode", String(g.bot_fight_mode)]);
        }
        if (g.clearance_level !== undefined) {
          filters.push(["clearance_level", String(g.clearance_level)]);
        }
        if (g.ephemeral_id !== undefined) {
          filters.push(["ephemeral_id", String(g.ephemeral_id)]);
        }
        if (g.mode !== undefined) filters.push(["mode", String(g.mode)]);
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.offlabel !== undefined) {
          filters.push(["offlabel", String(g.offlabel)]);
        }
        if (g.region !== undefined) filters.push(["region", String(g.region)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", undefined, {
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
          throw new Error(`No widgets found matching filters: ${filterDesc}`);
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
      description: "Import an existing Widgets by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Widgets to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
      description: "Update Widgets attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Widgets by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
        if (g.bot_fight_mode !== undefined) {
          body.bot_fight_mode = g.bot_fight_mode;
        }
        if (g.clearance_level !== undefined) {
          body.clearance_level = g.clearance_level;
        }
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.ephemeral_id !== undefined) body.ephemeral_id = g.ephemeral_id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.name !== undefined) body.name = g.name;
        if (g.offlabel !== undefined) body.offlabel = g.offlabel;
        if (g.region !== undefined) body.region = g.region;
        const unset = ["domains", "mode", "name"].filter((k) =>
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
        const missingForUpdate = ["domains", "mode", "name"].filter((k) =>
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
      description: "Delete the Widgets",
      arguments: z.object({ id: z.string().describe("The ID of the Widgets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
      description: "Sync Widgets state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Widgets by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
