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

// Auto-generated extension model for @swamp/hetzner-cloud/zones
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud zone.
 *
 * Wraps the `/zones` API as a swamp model so create, get, update, delete, sync, list
 * can be driven through `swamp model`.
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
} from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  name: z.string().max(255).describe(
    "Name of the [Zone](#tag/zones).\n\nAll names with [well-known public suffixes](https://publicsuffix.org/) (e.g. `.de`,\n`.com`, `.co.uk`) are supported. Subdomains are not supported.\n\nThe name must be in lower case and must not end with a dot.\n[Internationalized domain\nnames](https://en.wikipedia.org/wiki/Internationalized_domain_name) must be\ntranscribed to [Punycode](https://wikipedia.org/wiki/Punycode) representation with\nACE prefix, e.g. `xn--mnchen-3ya.de` (`münchen.de`).\n",
  ),
  mode: z.enum(["primary", "secondary"]).describe(
    "Mode of the [Zone](#tag/zones).\n\nFor more information, see [Zone Modes](#tag/zones/zone-modes).\n",
  ),
  ttl: z.number().int().min(60).max(2147483647).describe(
    "Default Time To Live (TTL) of the [Zone](#tag/zones).\n\nMust be in between 60s and 2147483647s.\n\nThis TTL is used for [RRSets](#tag/zone-rrsets) that do not explicitly define a TTL.\n",
  ).optional(),
  primary_nameservers: z.array(z.object({
    address: z.string(),
    port: z.number().int().optional(),
    tsig_key: z.string().optional(),
    tsig_algorithm: z.enum(["hmac-md5", "hmac-sha1", "hmac-sha256"]).optional(),
  })).describe(
    "Primary nameservers of the [Zone](#tag/zones).\n\nOnly applicable for [Zones](#tag/zones) in secondary mode.\nIgnored for [Zones](#tag/zones) in primary mode.\n",
  ).optional(),
  rrsets: z.array(z.object({
    name: z.string(),
    type: z.enum([
      "A",
      "AAAA",
      "CAA",
      "CNAME",
      "DS",
      "HINFO",
      "HTTPS",
      "MX",
      "NS",
      "PTR",
      "RP",
      "SOA",
      "SRV",
      "SVCB",
      "TLSA",
      "TXT",
    ]),
    ttl: z.number().int().min(60).max(2147483647).optional(),
    records: z.array(z.object({
      value: z.string(),
      comment: z.string().optional(),
    })),
    labels: z.record(z.string(), z.unknown()).optional(),
  })).describe(
    "[RRSets](#tag/zone-rrsets) to be added to the [Zone](#tag/zones).\n\nOnly applicable for [Zones](#tag/zones) in primary mode.\nIgnored for [Zones](#tag/zones) in secondary mode.\n",
  ).optional(),
  zonefile: z.string().describe(
    "Zone file to import.\n\nOnly applicable for [Zones](#tag/zones) in primary mode.\nIgnored for [Zones](#tag/zones) in secondary mode.\n\nIf provided, `rrsets` must be empty.\n\nSee [Zone file import](#tag/zones/zone-file-import) for more details.\n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  zone: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    created: z.string().optional(),
    primary_nameservers: z.array(z.object({
      address: z.string().optional(),
      port: z.number().optional(),
      tsig_key: z.string().optional(),
      tsig_algorithm: z.string().optional(),
    })).optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
    protection: z.object({
      delete: z.boolean().optional(),
    }).optional(),
    ttl: z.number().optional(),
    status: z.string().optional(),
    record_count: z.number().optional(),
    authoritative_nameservers: z.object({
      assigned: z.array(z.string()).optional(),
      delegated: z.array(z.string()).optional(),
      delegation_last_check: z.string().optional(),
      delegation_status: z.string().optional(),
    }).optional(),
    registrar: z.string().optional(),
    mode: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string().max(255).optional(),
  mode: z.enum(["primary", "secondary"]).optional(),
  ttl: z.number().int().min(60).max(2147483647).optional(),
  primary_nameservers: z.array(z.object({
    address: z.string(),
    port: z.number().int().optional(),
    tsig_key: z.string().optional(),
    tsig_algorithm: z.enum(["hmac-md5", "hmac-sha1", "hmac-sha256"]).optional(),
  })).optional(),
  rrsets: z.array(z.object({
    name: z.string(),
    type: z.enum([
      "A",
      "AAAA",
      "CAA",
      "CNAME",
      "DS",
      "HINFO",
      "HTTPS",
      "MX",
      "NS",
      "PTR",
      "RP",
      "SOA",
      "SRV",
      "SVCB",
      "TLSA",
      "TXT",
    ]),
    ttl: z.number().int().min(60).max(2147483647).optional(),
    records: z.array(z.object({
      value: z.string(),
      comment: z.string().optional(),
    })),
    labels: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  zonefile: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud zone. Registered at `@swamp/hetzner-cloud/zones`. */
export const model = {
  type: "@swamp/hetzner-cloud/zones",
  version: "2026.06.10.1",
  upgrades: [
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
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes (version bump for manifest republish)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.28.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Zone resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a zone",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.ttl !== undefined) body.ttl = g.ttl;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.primary_nameservers !== undefined) {
          body.primary_nameservers = g.primary_nameservers;
        }
        if (g.rrsets !== undefined) body.rrsets = g.rrsets;
        if (g.zonefile !== undefined) body.zonefile = g.zonefile;
        const result = await create("/zones", body, g.token) as ResourceData;
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
      description: "Get a zone",
      arguments: z.object({
        id: z.number().int().describe("The ID of the zone"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/zones",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update zone attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/zones",
          existing.id,
          body,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the zone",
      arguments: z.object({
        id: z.number().int().describe("The ID of the zone"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/zones",
          args.id,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync zone state from Hetzner",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead("/zones", existing.id, g.token) as
          | ResourceData
          | null;
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
    list: {
      description:
        "List zones, optionally filtered by a Hetzner label selector",
      arguments: z.object({
        label_selector: z.string().describe(
          "Hetzner label selector to filter results, e.g. env=production,role!=db",
        ).optional(),
      }),
      execute: async (args: { label_selector?: string }, context: any) => {
        const g = context.globalArgs;
        const queryParams: Record<string, string> = {};
        if (args.label_selector !== undefined) {
          queryParams.label_selector = args.label_selector;
        }
        const items = await listAll(
          "/zones",
          queryParams,
          g.token,
        ) as ResourceData[];
        const dataHandles: any[] = [];
        for (const item of items) {
          const instanceName =
            (item.name?.toString() ?? item.id?.toString() ?? "unknown").replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length } };
      },
    },
  },
};
