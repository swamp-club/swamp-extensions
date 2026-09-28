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

// Auto-generated extension model for @swamp/cloudflare/gateway/locations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Locations.
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
  client_default: z.boolean().describe(
    "Indicate whether this location is the default location.",
  ).optional(),
  dns_destination_ips_id: z.string().describe(
    "Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.",
  ).optional(),
  ecs_support: z.boolean().describe(
    "Indicate whether the location must resolve EDNS queries.",
  ).optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
      require_token: z.boolean().optional(),
    }),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
  }).describe("Configure the destination endpoints for this location.")
    .optional(),
  max_ttl: z.object({
    mode: z.enum(["inherit", "override", "disabled"]),
    ttl_secs: z.number().int().min(60).max(36000).optional(),
  }).describe(
    "Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.",
  ).optional(),
  name: z.string().describe("Specify the location name.").optional(),
  networks: z.array(z.object({
    network: z.string(),
  })).describe(
    "Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.",
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
  client_default: z.boolean().optional(),
  created_at: z.string().optional(),
  dns_destination_ips_id: z.string().optional(),
  dns_destination_ipv6_block_id: z.string().optional(),
  doh_subdomain: z.string().optional(),
  ecs_support: z.boolean().optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
      require_token: z.boolean().optional(),
    }).optional(),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
    }).optional(),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  id: z.string(),
  ip: z.string().optional(),
  ipv4_destination: z.string().optional(),
  ipv4_destination_backup: z.string().optional(),
  max_ttl: z.object({
    mode: z.string().optional(),
    ttl_secs: z.number().optional(),
  }).optional(),
  name: z.string().optional(),
  networks: z.array(z.object({
    network: z.string().optional(),
  })).optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  client_default: z.boolean().optional(),
  dns_destination_ips_id: z.string().optional(),
  ecs_support: z.boolean().optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
      require_token: z.boolean().optional(),
    }),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
  }).optional(),
  max_ttl: z.object({
    mode: z.enum(["inherit", "override", "disabled"]),
    ttl_secs: z.number().int().min(60).max(36000).optional(),
  }).optional(),
  name: z.string().optional(),
  networks: z.array(z.object({
    network: z.string(),
  })).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Locations. Registered at `@swamp/cloudflare/gateway/locations`. */
export const model = {
  type: "@swamp/cloudflare/gateway/locations",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: max_ttl_secs, apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.14.1",
      description: "Added: max_ttl",
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
      description: "Added: max_ttl_secs",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: max_ttl. Removed: max_ttl_secs",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { max_ttl_secs: _max_ttl_secs, ...rest } = old;
        return rest;
      },
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
      description: "Locations resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Locations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
        const body: Record<string, unknown> = {};
        if (g.client_default !== undefined) {
          body.client_default = g.client_default;
        }
        if (g.dns_destination_ips_id !== undefined) {
          body.dns_destination_ips_id = g.dns_destination_ips_id;
        }
        if (g.ecs_support !== undefined) body.ecs_support = g.ecs_support;
        if (g.endpoints !== undefined) body.endpoints = g.endpoints;
        if (g.max_ttl !== undefined) body.max_ttl = g.max_ttl;
        if (g.name !== undefined) body.name = g.name;
        if (g.networks !== undefined) body.networks = g.networks;
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
      description: "Get a Locations",
      arguments: z.object({
        id: z.string().describe("The ID of the Locations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
        "Look up an existing Locations by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
        const filters: [string, string][] = [];
        if (g.client_default !== undefined) {
          filters.push(["client_default", String(g.client_default)]);
        }
        if (g.dns_destination_ips_id !== undefined) {
          filters.push([
            "dns_destination_ips_id",
            String(g.dns_destination_ips_id),
          ]);
        }
        if (g.ecs_support !== undefined) {
          filters.push(["ecs_support", String(g.ecs_support)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
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
          throw new Error(`No locations found matching filters: ${filterDesc}`);
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
        "Import an existing Locations by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Locations to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
      description: "Update Locations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Locations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
        if (g.client_default !== undefined) {
          body.client_default = g.client_default;
        }
        if (g.dns_destination_ips_id !== undefined) {
          body.dns_destination_ips_id = g.dns_destination_ips_id;
        }
        if (g.ecs_support !== undefined) body.ecs_support = g.ecs_support;
        if (g.endpoints !== undefined) body.endpoints = g.endpoints;
        if (g.max_ttl !== undefined) body.max_ttl = g.max_ttl;
        if (g.name !== undefined) body.name = g.name;
        if (g.networks !== undefined) body.networks = g.networks;
        const unset = ["name"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["name"].filter((k) => body[k] === undefined);
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
      description: "Delete the Locations",
      arguments: z.object({
        id: z.string().describe("The ID of the Locations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
      description: "Sync Locations state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Locations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
