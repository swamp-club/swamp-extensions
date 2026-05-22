// Auto-generated extension model for @swamp/cloudflare/email/rules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Rules.
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
  actions: z.array(z.object({
    type: z.enum(["drop", "forward", "worker"]),
    value: z.array(z.string().max(90)).optional(),
  })).describe("List actions patterns."),
  enabled: z.boolean().describe("Routing rule status.").optional(),
  matchers: z.array(z.object({
    field: z.enum(["to"]).optional(),
    type: z.enum(["all", "literal"]),
    value: z.string().max(90).optional(),
  })).describe("Matching patterns to forward to your actions."),
  name: z.string().max(256).describe("Routing rule name.").optional(),
  priority: z.number().min(0).describe("Priority of the routing rule.")
    .optional(),
});

const ResourceSchema = z.object({
  actions: z.array(z.object({
    type: z.string().optional(),
    value: z.array(z.string()).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  matchers: z.array(z.object({
    field: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  priority: z.number().optional(),
  tag: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  actions: z.array(z.object({
    type: z.enum(["drop", "forward", "worker"]),
    value: z.array(z.string().max(90)).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  matchers: z.array(z.object({
    field: z.enum(["to"]).optional(),
    type: z.enum(["all", "literal"]),
    value: z.string().max(90).optional(),
  })).optional(),
  name: z.string().max(256).optional(),
  priority: z.number().min(0).optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/email/rules`. */
export const model = {
  type: "@swamp/cloudflare/email/rules",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Rules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
        const body: Record<string, unknown> = {};
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.matchers !== undefined) body.matchers = g.matchers;
        if (g.name !== undefined) body.name = g.name;
        if (g.priority !== undefined) body.priority = g.priority;
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
      description: "Get a Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
      description: "Update Rules attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.matchers !== undefined) body.matchers = g.matchers;
        if (g.name !== undefined) body.name = g.name;
        if (g.priority !== undefined) body.priority = g.priority;
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
      description: "Delete the Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
      description: "Sync Rules state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/email/routing/rules";
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
