// Auto-generated extension model for @swamp/cloudflare/firewall/lockdowns
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Lockdowns.
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
  configurations: z.array(z.object({
    target: z.enum(["ip"]).optional(),
    value: z.string().optional(),
  })).describe(
    "A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.",
  ),
  urls: z.array(z.string()).describe(
    "The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.",
  ),
  description: z.string().max(1024).describe(
    "An informative summary of the rule. This value is sanitized and any tags will be removed.",
  ).optional(),
  paused: z.boolean().describe(
    "When true, indicates that the rule is currently paused.",
  ).optional(),
  priority: z.number().describe(
    "The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules without a priority.",
  ).optional(),
});

const ResourceSchema = z.object({
  configurations: z.array(z.object({
    target: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  created_on: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
  paused: z.boolean().optional(),
  urls: z.array(z.string()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  configurations: z.array(z.object({
    target: z.enum(["ip"]).optional(),
    value: z.string().optional(),
  })).optional(),
  urls: z.array(z.string()).optional(),
  description: z.string().max(1024).optional(),
  paused: z.boolean().optional(),
  priority: z.number().optional(),
});

/** Swamp extension model for Cloudflare Lockdowns. Registered at `@swamp/cloudflare/firewall/lockdowns`. */
export const model = {
  type: "@swamp/cloudflare/firewall/lockdowns",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lockdowns resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lockdowns",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/lockdowns";
        const body: Record<string, unknown> = {};
        if (g.configurations !== undefined) {
          body.configurations = g.configurations;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.paused !== undefined) body.paused = g.paused;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.urls !== undefined) body.urls = g.urls;
        const result = await create(endpoint, body) as ResourceData;
        const instanceName = (g.description?.toString() ?? "current").replace(
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
      description: "Get a Lockdowns",
      arguments: z.object({
        id: z.string().describe("The ID of the Lockdowns"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/lockdowns";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.description?.toString() ?? args.id).replace(
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
      description: "Update Lockdowns attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/lockdowns";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
        if (g.configurations !== undefined) {
          body.configurations = g.configurations;
        }
        if (g.urls !== undefined) body.urls = g.urls;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
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
      description: "Delete the Lockdowns",
      arguments: z.object({
        id: z.string().describe("The ID of the Lockdowns"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/lockdowns";
        const { existed } = await remove(endpoint, args.id);
        const instanceName =
          (context.globalArgs.description?.toString() ?? args.id).replace(
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
      description: "Sync Lockdowns state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/lockdowns";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
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
