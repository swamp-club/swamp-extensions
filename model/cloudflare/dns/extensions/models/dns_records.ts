// Auto-generated extension model for @swamp/cloudflare/dns/dns-records
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Dns Records.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

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
  type: z.enum(["A"]).describe("Record type.").optional(),
  priority: z.number().min(0).max(65535).describe(
    "Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.",
  ).optional(),
  data: z.object({
    flags: z.number().min(0).max(255).optional(),
    tag: z.string().optional(),
    value: z.string().optional(),
  }).describe("Components of a CAA record.").optional(),
});

const ResourceSchema = z.object({
  comment_modified_on: z.string().optional(),
  created_on: z.string().optional(),
  id: z.string(),
  meta: z.record(z.string(), z.unknown()).optional(),
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
  type: z.enum(["A"]).optional(),
  priority: z.number().min(0).max(65535).optional(),
  data: z.object({
    flags: z.number().min(0).max(255).optional(),
    tag: z.string().optional(),
    value: z.string().optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Dns Records. Registered at `@swamp/cloudflare/dns/dns-records`. */
export const model = {
  type: "@swamp/cloudflare/dns/dns-records",
  version: "2026.05.22.1",
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
        const result = await create(endpoint, body) as ResourceData;
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
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id).replace(
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
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
      description: "Delete the Dns Records",
      arguments: z.object({
        id: z.string().describe("The ID of the Dns Records"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
        const { existed } = await remove(endpoint, args.id);
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/dns_records";
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
        const result = await tryRead(endpoint, existing.id) as
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
  },
};
