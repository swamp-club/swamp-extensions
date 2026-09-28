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

// Auto-generated extension model for @swamp/cloudflare/cni/cnis
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Cnis.
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
  account: z.string().describe("Customer account tag").optional(),
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()),
    md5_key: z.string().optional(),
  }).optional(),
  bgp_mode: z.enum(["dynamic_route_exchange", "advertise_only"]).describe(
    "The BGP mode for a CNI.\n\nControls the customer-facing data path:\n* `DynamicRouteExchange` — Full BGP: routes flow through to conduit via CRE / bgp-bridge /\nbgp-bridge-receiver.\n* `AdvertiseOnly` — static advertisement via taserver, no routes exchanged with Conduit",
  ).optional(),
  cust_ip: z.string().describe(
    "Customer end of the point-to-point link\n\nThis should always be inside the same prefix as `p2p_ip`.",
  ).optional(),
  id: z.string().optional(),
  interconnect: z.string().optional(),
  magic: z.object({
    conduit_name: z.string(),
    description: z.string(),
    mtu: z.number().int().min(0),
  }).optional(),
  p2p_ip: z.string().describe("Cloudflare end of the point-to-point link")
    .optional(),
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
  account: z.string().optional(),
  bgp: z.object({
    customer_asn: z.number().optional(),
    extra_prefixes: z.array(z.string()).optional(),
    md5_key: z.string().optional(),
  }).optional(),
  bgp_mode: z.string().optional(),
  cust_ip: z.string().optional(),
  id: z.string(),
  interconnect: z.string().optional(),
  magic: z.object({
    conduit_name: z.string().optional(),
    description: z.string().optional(),
    mtu: z.number().optional(),
  }).optional(),
  p2p_ip: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  account: z.string().optional(),
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()),
    md5_key: z.string().optional(),
  }).optional(),
  bgp_mode: z.enum(["dynamic_route_exchange", "advertise_only"]).optional(),
  cust_ip: z.string().optional(),
  id: z.string().optional(),
  interconnect: z.string().optional(),
  magic: z.object({
    conduit_name: z.string(),
    description: z.string(),
    mtu: z.number().int().min(0),
  }).optional(),
  p2p_ip: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Cnis. Registered at `@swamp/cloudflare/cni/cnis`. */
export const model = {
  type: "@swamp/cloudflare/cni/cnis",
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
      description: "Added: bgp_mode",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: bgp_mode",
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
      description: "Cnis resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cnis",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["account", "interconnect", "magic"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
        const body: Record<string, unknown> = {};
        if (g.account !== undefined) body.account = g.account;
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.interconnect !== undefined) body.interconnect = g.interconnect;
        if (g.magic !== undefined) body.magic = g.magic;
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
      description: "Get a Cnis",
      arguments: z.object({ id: z.string().describe("The ID of the Cnis") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
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
        "Look up an existing Cnis by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
        const filters: [string, string][] = [];
        if (g.account !== undefined) {
          filters.push(["account", String(g.account)]);
        }
        if (g.bgp_mode !== undefined) {
          filters.push(["bgp_mode", String(g.bgp_mode)]);
        }
        if (g.cust_ip !== undefined) {
          filters.push(["cust_ip", String(g.cust_ip)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.interconnect !== undefined) {
          filters.push(["interconnect", String(g.interconnect)]);
        }
        if (g.p2p_ip !== undefined) filters.push(["p2p_ip", String(g.p2p_ip)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "cursor", undefined, {
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
          throw new Error(`No cnis found matching filters: ${filterDesc}`);
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
      description: "Import an existing Cnis by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Cnis to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
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
      description: "Update Cnis attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Cnis by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
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
        if (g.account !== undefined) body.account = g.account;
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.bgp_mode !== undefined) body.bgp_mode = g.bgp_mode;
        if (g.cust_ip !== undefined) body.cust_ip = g.cust_ip;
        if (g.id !== undefined) body.id = g.id;
        if (g.interconnect !== undefined) body.interconnect = g.interconnect;
        if (g.magic !== undefined) body.magic = g.magic;
        if (g.p2p_ip !== undefined) body.p2p_ip = g.p2p_ip;
        const unset = ["account", "interconnect", "magic"].filter((k) =>
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
        const missingForUpdate = ["account", "interconnect", "magic"].filter((
          k,
        ) => body[k] === undefined);
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
      description: "Delete the Cnis",
      arguments: z.object({ id: z.string().describe("The ID of the Cnis") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
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
      description: "Sync Cnis state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Cnis by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/cnis";
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
