// Auto-generated extension model for @swamp/cloudflare/cloudforce-one/rules
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
  account_id: z.string().describe("Cloudflare account ID"),
  content: z.string().min(1),
  description: z.string().max(1000).describe(
    "Human-readable description of the rule. Auto-extracted from YARA meta if present.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether this rule is active for dice consumers.",
  ).optional(),
  is_public: z.boolean().describe(
    "Whether this rule is visible to other internal accounts.",
  ).optional(),
  name: z.string().min(1).max(255),
  namespaces: z.array(z.string().min(1).max(255)),
  actions: z.array(z.object({
    action_config: z.record(z.string(), z.unknown()),
    action_type: z.enum([
      "alert_gchat",
      "webhook",
      "logging",
      "email",
      "pipeline",
      "remediation",
      "throttle",
      "delete",
    ]),
    enabled: z.boolean().optional(),
  })).optional(),
});

const ResourceSchema = z.object({
  content: z.string().optional(),
  created_at: z.number().optional(),
  created_by: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  is_public: z.boolean().optional(),
  name: z.string().optional(),
  namespaces: z.array(z.string()).optional(),
  updated_at: z.number().optional(),
  updated_by: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  content: z.string().min(1).optional(),
  description: z.string().max(1000).optional(),
  enabled: z.boolean().optional(),
  is_public: z.boolean().optional(),
  name: z.string().min(1).max(255).optional(),
  namespaces: z.array(z.string().min(1).max(255)).optional(),
  actions: z.array(z.object({
    action_config: z.record(z.string(), z.unknown()),
    action_type: z.enum([
      "alert_gchat",
      "webhook",
      "logging",
      "email",
      "pipeline",
      "remediation",
      "throttle",
      "delete",
    ]),
    enabled: z.boolean().optional(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/cloudforce-one/rules`. */
export const model = {
  type: "@swamp/cloudflare/cloudforce-one/rules",
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
        const endpoint = "/accounts/" + g.account_id + "/cloudforce-one/rules";
        const body: Record<string, unknown> = {};
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.content !== undefined) body.content = g.content;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.is_public !== undefined) body.is_public = g.is_public;
        if (g.name !== undefined) body.name = g.name;
        if (g.namespaces !== undefined) body.namespaces = g.namespaces;
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
        const endpoint = "/accounts/" + g.account_id + "/cloudforce-one/rules";
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
        const endpoint = "/accounts/" + g.account_id + "/cloudforce-one/rules";
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
        if (g.content !== undefined) body.content = g.content;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.is_public !== undefined) body.is_public = g.is_public;
        if (g.name !== undefined) body.name = g.name;
        if (g.namespaces !== undefined) body.namespaces = g.namespaces;
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
        const endpoint = "/accounts/" + g.account_id + "/cloudforce-one/rules";
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
        const endpoint = "/accounts/" + g.account_id + "/cloudforce-one/rules";
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
