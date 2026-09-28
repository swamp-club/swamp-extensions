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

// Auto-generated extension model for @swamp/cloudflare/dex/dex-tests
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Dex Tests.
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
  created: z.string().describe("Date the test was created, in RFC 3339 format.")
    .optional(),
  data: z.object({
    host: z.string(),
    kind: z.enum(["http", "traceroute"]),
    method: z.enum(["GET"]).optional(),
  }).describe(
    "The configuration object which contains the details for the WARP client to conduct the test.",
  ).optional(),
  description: z.string().describe("Additional details about the test.")
    .optional(),
  enabled: z.boolean().describe("Determines whether or not the test is active.")
    .optional(),
  interval: z.string().describe("How often the test will run.").optional(),
  name: z.string().describe("The name of the DEX test. Must be unique.")
    .optional(),
  target_policies: z.array(z.unknown()).describe(
    "DEX rules targeted by this test",
  ).optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().max(32).describe("The unique identifier for the test.")
    .optional(),
  updated: z.string().describe(
    "Date the test was last updated, in RFC 3339 format.",
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
  created: z.string().optional(),
  data: z.object({
    host: z.string().optional(),
    kind: z.string().optional(),
    method: z.string().optional(),
  }).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  interval: z.string().optional(),
  name: z.string().optional(),
  target_policies: z.array(z.unknown()).optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().optional(),
  updated: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  created: z.string().optional(),
  data: z.object({
    host: z.string(),
    kind: z.enum(["http", "traceroute"]),
    method: z.enum(["GET"]).optional(),
  }).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  interval: z.string().optional(),
  name: z.string().optional(),
  target_policies: z.array(z.unknown()).optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().max(32).optional(),
  updated: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Dex Tests. Registered at `@swamp/cloudflare/dex/dex-tests`. */
export const model = {
  type: "@swamp/cloudflare/dex/dex-tests",
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
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.14.1",
      description: "Added: created, updated",
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
      description: "Added: created, updated",
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
      description: "Dex Tests resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Dex Tests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["data", "enabled", "interval", "name"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
        const body: Record<string, unknown> = {};
        if (g.created !== undefined) body.created = g.created;
        if (g.data !== undefined) body.data = g.data;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.target_policies !== undefined) {
          body.target_policies = g.target_policies;
        }
        if (g.targeted !== undefined) body.targeted = g.targeted;
        if (g.test_id !== undefined) body.test_id = g.test_id;
        if (g.updated !== undefined) body.updated = g.updated;
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
      description: "Get a Dex Tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Dex Tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
        "Look up an existing Dex Tests by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
        const filters: [string, string][] = [];
        if (g.created !== undefined) {
          filters.push(["created", String(g.created)]);
        }
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.enabled !== undefined) {
          filters.push(["enabled", String(g.enabled)]);
        }
        if (g.interval !== undefined) {
          filters.push(["interval", String(g.interval)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.targeted !== undefined) {
          filters.push(["targeted", String(g.targeted)]);
        }
        if (g.test_id !== undefined) {
          filters.push(["test_id", String(g.test_id)]);
        }
        if (g.updated !== undefined) {
          filters.push(["updated", String(g.updated)]);
        }
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
          throw new Error(`No dex tests found matching filters: ${filterDesc}`);
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
      description:
        "Import an existing Dex Tests by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Dex Tests to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
      description: "Update Dex Tests attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dex Tests by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
        if (g.created !== undefined) body.created = g.created;
        if (g.data !== undefined) body.data = g.data;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.target_policies !== undefined) {
          body.target_policies = g.target_policies;
        }
        if (g.targeted !== undefined) body.targeted = g.targeted;
        if (g.test_id !== undefined) body.test_id = g.test_id;
        if (g.updated !== undefined) body.updated = g.updated;
        const unset = ["data", "enabled", "interval", "name"].filter((k) =>
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
        const missingForUpdate = ["data", "enabled", "interval", "name"].filter(
          (k) => body[k] === undefined,
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
      description: "Delete the Dex Tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Dex Tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
      description: "Sync Dex Tests state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dex Tests by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
