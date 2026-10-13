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

// Auto-generated extension model for @swamp/cloudflare/dns/dns-records
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Dns Records.
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
  comment: z.string().describe(
    "Comments or notes about the DNS record. This field has no effect on DNS responses.",
  ).optional(),
  name: z.string().min(1).max(255).describe(
    "Complete DNS record name, including the zone name, in Punycode.",
  ).optional(),
  proxied: z.boolean().describe(
    "Whether the record is receiving the performance and security benefits of Cloudflare.",
  ).optional(),
  settings: z.object({
    ipv4_only: z.boolean().optional(),
    ipv6_only: z.boolean().optional(),
  }).describe("Settings for the DNS record.").optional(),
  tags: z.array(z.string()).describe(
    "Custom tags for the DNS record. This field has no effect on DNS responses.",
  ).optional(),
  ttl: z.number().min(30).max(86400).optional(),
  content: z.string().describe("A valid IPv4 address.").optional(),
  private_routing: z.boolean().describe(
    "Enables private network routing to the origin.",
  ).optional(),
  type: z.enum([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "OPENPGPKEY",
    "PTR",
    "TXT",
    "CAA",
    "CERT",
    "DNSKEY",
    "DS",
    "HTTPS",
    "LOC",
    "NAPTR",
    "SMIMEA",
    "SRV",
    "SSHFP",
    "SVCB",
    "TLSA",
    "URI",
  ]).describe("Record type.").optional(),
  priority: z.number().min(0).max(65535).describe(
    "Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.",
  ).optional(),
  data: z.object({
    flags: z.number().min(0).max(255).optional(),
    tag: z.string().optional(),
    value: z.string().optional(),
  }).describe("Components of a CAA record.").optional(),
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
  comment_modified_on: z.string().optional(),
  created_on: z.string().optional(),
  id: z.string(),
  meta: z.object({
    dead_glue: z.boolean().optional(),
    is_glue: z.boolean().optional(),
    shadowed_by: z.array(z.string()).optional(),
    shadowed_records_count: z.number().optional(),
  }).optional(),
  modified_on: z.string().optional(),
  proxiable: z.boolean().optional(),
  tags_modified_on: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  comment: z.string().optional(),
  name: z.string().min(1).max(255).optional(),
  proxied: z.boolean().optional(),
  settings: z.object({
    ipv4_only: z.boolean().optional(),
    ipv6_only: z.boolean().optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  ttl: z.number().min(30).max(86400).optional(),
  content: z.string().optional(),
  private_routing: z.boolean().optional(),
  type: z.enum([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "OPENPGPKEY",
    "PTR",
    "TXT",
    "CAA",
    "CERT",
    "DNSKEY",
    "DS",
    "HTTPS",
    "LOC",
    "NAPTR",
    "SMIMEA",
    "SRV",
    "SSHFP",
    "SVCB",
    "TLSA",
    "URI",
  ]).optional(),
  priority: z.number().min(0).max(65535).optional(),
  data: z.object({
    flags: z.number().min(0).max(255).optional(),
    tag: z.string().optional(),
    value: z.string().optional(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Dns Records. Registered at `@swamp/cloudflare/dns/dns-records`. */
export const model = {
  type: "@swamp/cloudflare/dns/dns-records",
  version: "2026.10.13.1",
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
      toVersion: "2026.07.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Dns Records resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Dns Records",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
        const body: Record<string, unknown> = {};
        if (g.comment !== undefined) body.comment = g.comment;
        if (g.name !== undefined) body.name = g.name;
        if (g.proxied !== undefined) body.proxied = g.proxied;
        if (g.settings !== undefined) body.settings = g.settings;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.ttl !== undefined) body.ttl = g.ttl;
        if (g.content !== undefined) body.content = g.content;
        if (g.private_routing !== undefined) {
          body.private_routing = g.private_routing;
        }
        if (g.type !== undefined) body.type = g.type;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.data !== undefined) body.data = g.data;
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
      description: "Get a Dns Records",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Records"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
        "Look up an existing Dns Records by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
        const filters: [string, string][] = [];
        if (g.comment !== undefined) {
          filters.push(["comment", String(g.comment)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.proxied !== undefined) {
          filters.push(["proxied", String(g.proxied)]);
        }
        if (g.ttl !== undefined) filters.push(["ttl", String(g.ttl)]);
        if (g.content !== undefined) {
          filters.push(["content", String(g.content)]);
        }
        if (g.private_routing !== undefined) {
          filters.push(["private_routing", String(g.private_routing)]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
        if (g.priority !== undefined) {
          filters.push(["priority", String(g.priority)]);
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
          throw new Error(
            `No dns records found matching filters: ${filterDesc}`,
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
        return { dataHandles: [handle] };
      },
    },
    adopt: {
      description:
        "Import an existing Dns Records by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Records to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
      description: "Update Dns Records attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dns Records by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
        if (g.comment !== undefined) body.comment = g.comment;
        if (g.name !== undefined) body.name = g.name;
        if (g.proxied !== undefined) body.proxied = g.proxied;
        if (g.settings !== undefined) body.settings = g.settings;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.ttl !== undefined) body.ttl = g.ttl;
        if (g.content !== undefined) body.content = g.content;
        if (g.private_routing !== undefined) {
          body.private_routing = g.private_routing;
        }
        if (g.type !== undefined) body.type = g.type;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.data !== undefined) body.data = g.data;
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
      description: "Delete the Dns Records",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Records"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
      description: "Sync Dns Records state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Dns Records by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
