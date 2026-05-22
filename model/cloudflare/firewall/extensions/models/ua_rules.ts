// Auto-generated extension model for @swamp/cloudflare/firewall/ua-rules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Ua Rules.
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
  configuration: z.object({
    target: z.enum(["ua"]).optional(),
    value: z.string().optional(),
  }),
  description: z.string().max(1024).describe(
    "An informative summary of the rule. This value is sanitized and any tags will be removed.",
  ).optional(),
  id: z.string().max(32).describe("The unique identifier of the resource.")
    .optional(),
  mode: z.enum([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]).describe("The action to apply to a matched request."),
  paused: z.boolean().describe(
    "When true, indicates that the rule is currently paused.",
  ).optional(),
});

const ResourceSchema = z.object({
  result: z.record(z.string(), z.unknown()).optional(),
  errors: z.array(z.object({
    code: z.number().optional(),
    message: z.string().optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    message: z.string().optional(),
  })).optional(),
  success: z.boolean().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  configuration: z.object({
    target: z.enum(["ua"]).optional(),
    value: z.string().optional(),
  }).optional(),
  description: z.string().max(1024).optional(),
  id: z.string().max(32).optional(),
  mode: z.enum([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]).optional(),
  paused: z.boolean().optional(),
});

/** Swamp extension model for Cloudflare Ua Rules. Registered at `@swamp/cloudflare/firewall/ua-rules`. */
export const model = {
  type: "@swamp/cloudflare/firewall/ua-rules",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Ua Rules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Ua Rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/ua_rules";
        const body: Record<string, unknown> = {};
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.description !== undefined) body.description = g.description;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.paused !== undefined) body.paused = g.paused;
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
      description: "Get a Ua Rules",
      arguments: z.object({
        id: z.string().describe("The ID of the Ua Rules"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/ua_rules";
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
      description: "Update Ua Rules attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/ua_rules";
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
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.description !== undefined) body.description = g.description;
        if (g.id !== undefined) body.id = g.id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.paused !== undefined) body.paused = g.paused;
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
      description: "Delete the Ua Rules",
      arguments: z.object({
        id: z.string().describe("The ID of the Ua Rules"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/ua_rules";
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
      description: "Sync Ua Rules state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/firewall/ua_rules";
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
