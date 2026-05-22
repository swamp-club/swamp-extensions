// Auto-generated extension model for @swamp/cloudflare/firewall/overrides
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Overrides.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  id: z.string().max(32).describe("Defines an identifier.").optional(),
  rewrite_action: z.object({
    block: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    challenge: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    default: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    disable: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    simulate: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
  }).describe(
    "Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.",
  ).optional(),
  rules: z.record(z.string(), z.unknown()).describe(
    "An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.",
  ).optional(),
  urls: z.array(z.string()).describe(
    "The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.",
  ),
});

const ResourceSchema = z.object({
  description: z.string().optional(),
  groups: z.record(z.string(), z.unknown()).optional(),
  id: z.string(),
  paused: z.boolean().optional(),
  priority: z.number().optional(),
  rewrite_action: z.object({
    block: z.string().optional(),
    challenge: z.string().optional(),
    default: z.string().optional(),
    disable: z.string().optional(),
    simulate: z.string().optional(),
  }).optional(),
  rules: z.record(z.string(), z.unknown()).optional(),
  urls: z.array(z.string()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  id: z.string().max(32).optional(),
  rewrite_action: z.object({
    block: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    challenge: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    default: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    disable: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
    simulate: z.enum(["challenge", "block", "simulate", "disable", "default"])
      .optional(),
  }).optional(),
  rules: z.record(z.string(), z.unknown()).optional(),
  urls: z.array(z.string()).optional(),
});

/** Swamp extension model for Cloudflare Overrides. Registered at `@swamp/cloudflare/firewall/overrides`. */
export const model = {
  type: "@swamp/cloudflare/firewall/overrides",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Overrides resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Overrides",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/waf/overrides";
        const body: Record<string, unknown> = {};
        if (g.urls !== undefined) body.urls = g.urls;
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
      description: "Get a Overrides",
      arguments: z.object({
        id: z.string().describe("The ID of the Overrides"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/waf/overrides";
        const result = await read(endpoint, args.id) as ResourceData;
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
    update: {
      description: "Update Overrides attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/waf/overrides";
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
        if (g.id !== undefined) body.id = g.id;
        if (g.rewrite_action !== undefined) {
          body.rewrite_action = g.rewrite_action;
        }
        if (g.rules !== undefined) body.rules = g.rules;
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
      description: "Delete the Overrides",
      arguments: z.object({
        id: z.string().describe("The ID of the Overrides"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/waf/overrides";
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
      description: "Sync Overrides state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/waf/overrides";
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
