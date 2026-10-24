// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/cloudflare/dns/dns-firewall
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Dns Firewall.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  attack_mitigation: z.object({
    enabled: z.boolean().optional(),
    only_when_upstream_unhealthy: z.boolean().optional(),
  }).describe("Attack mitigation settings").optional(),
  deprecate_any_requests: z.boolean().describe(
    "Whether to refuse to answer queries for the ANY type",
  ).optional(),
  ecs_fallback: z.boolean().describe(
    "Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent",
  ).optional(),
  maximum_cache_ttl: z.number().min(30).max(36000).describe(
    "By default, Cloudflare attempts to cache responses for as long as\nindicated by the TTL received from upstream nameservers. This setting\nsets an upper bound on this duration. For caching purposes, higher TTLs\nwill be decreased to the maximum value defined by this setting.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n",
  ).optional(),
  minimum_cache_ttl: z.number().min(30).max(36000).describe(
    "By default, Cloudflare attempts to cache responses for as long as\nindicated by the TTL received from upstream nameservers. This setting\nsets a lower bound on this duration. For caching purposes, lower TTLs\nwill be increased to the minimum value defined by this setting.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n\nNote that, even with this setting, there is no guarantee that a\nresponse will be cached for at least the specified duration. Cached\nresponses may be removed earlier for capacity or other operational\nreasons.\n",
  ).optional(),
  name: z.string().min(1).max(160).describe("DNS Firewall cluster name")
    .optional(),
  negative_cache_ttl: z.number().min(30).max(36000).describe(
    "This setting controls how long DNS Firewall should cache negative\nresponses (e.g., NXDOMAIN) from the upstream servers.\n\nThis setting does not affect the TTL value in the DNS response\nCloudflare returns to clients. Cloudflare will always forward the TTL\nvalue received from upstream nameservers.\n",
  ).optional(),
  ratelimit: z.number().min(100).max(1000000000).describe(
    "Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.",
  ).optional(),
  retries: z.number().min(0).max(2).describe(
    "Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)",
  ).optional(),
  upstream_ips: z.array(z.string()).optional(),
  dns_firewall_ip_count: z.number().int().min(1).max(10).describe(
    "Number of IPv4 addresses to assign to the DNS Firewall cluster. Only used during cluster creation and cannot be changed later.",
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
  attack_mitigation: z.object({
    enabled: z.boolean().optional(),
    only_when_upstream_unhealthy: z.boolean().optional(),
  }).optional(),
  deprecate_any_requests: z.boolean().optional(),
  ecs_fallback: z.boolean().optional(),
  maximum_cache_ttl: z.number().optional(),
  minimum_cache_ttl: z.number().optional(),
  name: z.string().optional(),
  negative_cache_ttl: z.number().optional(),
  ratelimit: z.number().optional(),
  retries: z.number().optional(),
  upstream_ips: z.array(z.string()).optional(),
  dns_firewall_ips: z.array(z.string()).optional(),
  id: z.string(),
  modified_on: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  attack_mitigation: z.object({
    enabled: z.boolean().optional(),
    only_when_upstream_unhealthy: z.boolean().optional(),
  }).optional(),
  deprecate_any_requests: z.boolean().optional(),
  ecs_fallback: z.boolean().optional(),
  maximum_cache_ttl: z.number().min(30).max(36000).optional(),
  minimum_cache_ttl: z.number().min(30).max(36000).optional(),
  name: z.string().min(1).max(160).optional(),
  negative_cache_ttl: z.number().min(30).max(36000).optional(),
  ratelimit: z.number().min(100).max(1000000000).optional(),
  retries: z.number().min(0).max(2).optional(),
  upstream_ips: z.array(z.string()).optional(),
  dns_firewall_ip_count: z.number().int().min(1).max(10).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Dns Firewall. Registered at `@swamp/cloudflare/dns/dns-firewall`. */
export const model = {
  type: "@swamp/cloudflare/dns/dns-firewall",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "Added: dns_firewall_ip_count",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.2",
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
      toVersion: "2026.08.25.2",
      description: "Added: dns_firewall_ip_count",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Dns Firewall resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    lookupResult: {
      description: "Outcome of the most recent lookup",
      schema: z.object({
        found: z.boolean(),
        filters: z.record(z.string(), z.string()),
        id: z.string().optional(),
      }),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Dns Firewall",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
        const body: Record<string, unknown> = {};
        if (g.attack_mitigation !== undefined) {
          body.attack_mitigation = g.attack_mitigation;
        }
        if (g.deprecate_any_requests !== undefined) {
          body.deprecate_any_requests = g.deprecate_any_requests;
        }
        if (g.ecs_fallback !== undefined) body.ecs_fallback = g.ecs_fallback;
        if (g.maximum_cache_ttl !== undefined) {
          body.maximum_cache_ttl = g.maximum_cache_ttl;
        }
        if (g.minimum_cache_ttl !== undefined) {
          body.minimum_cache_ttl = g.minimum_cache_ttl;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.negative_cache_ttl !== undefined) {
          body.negative_cache_ttl = g.negative_cache_ttl;
        }
        if (g.ratelimit !== undefined) body.ratelimit = g.ratelimit;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.upstream_ips !== undefined) body.upstream_ips = g.upstream_ips;
        if (g.dns_firewall_ip_count !== undefined) {
          body.dns_firewall_ip_count = g.dns_firewall_ip_count;
        }
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
      description: "Get a Dns Firewall",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Firewall"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
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
        "Look up an existing Dns Firewall by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
        const filters: [string, string][] = [];
        if (g.deprecate_any_requests !== undefined) {
          filters.push([
            "deprecate_any_requests",
            String(g.deprecate_any_requests),
          ]);
        }
        if (g.ecs_fallback !== undefined) {
          filters.push(["ecs_fallback", String(g.ecs_fallback)]);
        }
        if (g.maximum_cache_ttl !== undefined) {
          filters.push(["maximum_cache_ttl", String(g.maximum_cache_ttl)]);
        }
        if (g.minimum_cache_ttl !== undefined) {
          filters.push(["minimum_cache_ttl", String(g.minimum_cache_ttl)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.negative_cache_ttl !== undefined) {
          filters.push(["negative_cache_ttl", String(g.negative_cache_ttl)]);
        }
        if (g.ratelimit !== undefined) {
          filters.push(["ratelimit", String(g.ratelimit)]);
        }
        if (g.retries !== undefined) {
          filters.push(["retries", String(g.retries)]);
        }
        if (g.dns_firewall_ip_count !== undefined) {
          filters.push([
            "dns_firewall_ip_count",
            String(g.dns_firewall_ip_count),
          ]);
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
        const resultName = `lookup-${
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "")
        }`;
        if (matches.length === 0) {
          if (args.allowMissing) {
            const missHandle = await context.writeResource(
              "lookupResult",
              resultName,
              { found: false, filters: Object.fromEntries(filters) },
            );
            return { dataHandles: [missHandle] };
          }
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No dns firewall found matching filters: ${filterDesc}`,
          );
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
        const resultHandle = await context.writeResource(
          "lookupResult",
          resultName,
          {
            found: true,
            filters: Object.fromEntries(filters),
            id: result.id?.toString(),
          },
        );
        return { dataHandles: [handle, resultHandle] };
      },
    },
    adopt: {
      description:
        "Import an existing Dns Firewall by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Firewall to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
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
      description: "Update Dns Firewall attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dns Firewall by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
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
        if (g.attack_mitigation !== undefined) {
          body.attack_mitigation = g.attack_mitigation;
        }
        if (g.deprecate_any_requests !== undefined) {
          body.deprecate_any_requests = g.deprecate_any_requests;
        }
        if (g.ecs_fallback !== undefined) body.ecs_fallback = g.ecs_fallback;
        if (g.maximum_cache_ttl !== undefined) {
          body.maximum_cache_ttl = g.maximum_cache_ttl;
        }
        if (g.minimum_cache_ttl !== undefined) {
          body.minimum_cache_ttl = g.minimum_cache_ttl;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.negative_cache_ttl !== undefined) {
          body.negative_cache_ttl = g.negative_cache_ttl;
        }
        if (g.ratelimit !== undefined) body.ratelimit = g.ratelimit;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.upstream_ips !== undefined) body.upstream_ips = g.upstream_ips;
        const result = await update(endpoint, existing.id, body, "PATCH", {
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
      description: "Delete the Dns Firewall",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Firewall"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
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
      description: "Sync Dns Firewall state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dns Firewall by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dns_firewall";
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
