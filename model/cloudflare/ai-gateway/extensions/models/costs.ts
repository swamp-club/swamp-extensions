// Auto-generated extension model for @swamp/cloudflare/ai-gateway/costs
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Costs.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cost_in: z.number().optional(),
  cost_out: z.number().optional(),
  cost_type: z.string().optional(),
  enable: z.boolean().optional(),
  model: z.string(),
  model_rule: z.enum(["equals", "starts-with", "contains"]).optional(),
  token_pricing: z.object({
    input_audio_tokens: z.number().optional(),
    input_cache_creation_tokens: z.number().optional(),
    input_cached_tokens: z.number().optional(),
    input_image_count: z.number().optional(),
    input_image_tokens: z.number().optional(),
    input_text_tokens: z.number().optional(),
    input_tokens: z.number().optional(),
    input_video_tokens: z.number().optional(),
    output_image_count: z.number().optional(),
    output_reasoning_tokens: z.number().optional(),
    output_tokens: z.number().optional(),
    total_tokens: z.number().optional(),
  }).optional(),
  account_provider_id: z.string(),
});

const ResourceSchema = z.object({
  account_provider_id: z.string().optional(),
  changed_by: z.string().optional(),
  cost_in: z.number().optional(),
  cost_out: z.number().optional(),
  cost_type: z.string().optional(),
  created_at: z.string().optional(),
  enable: z.boolean().optional(),
  id: z.string(),
  model: z.string().optional(),
  model_rule: z.string().optional(),
  modified_at: z.string().optional(),
  token_pricing: z.string().optional(),
  weight: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  cost_in: z.number().optional(),
  cost_out: z.number().optional(),
  cost_type: z.string().optional(),
  enable: z.boolean().optional(),
  model: z.string().optional(),
  model_rule: z.enum(["equals", "starts-with", "contains"]).optional(),
  token_pricing: z.object({
    input_audio_tokens: z.number().optional(),
    input_cache_creation_tokens: z.number().optional(),
    input_cached_tokens: z.number().optional(),
    input_image_count: z.number().optional(),
    input_image_tokens: z.number().optional(),
    input_text_tokens: z.number().optional(),
    input_tokens: z.number().optional(),
    input_video_tokens: z.number().optional(),
    output_image_count: z.number().optional(),
    output_reasoning_tokens: z.number().optional(),
    output_tokens: z.number().optional(),
    total_tokens: z.number().optional(),
  }).optional(),
  account_provider_id: z.string().optional(),
});

/** Swamp extension model for Cloudflare Costs. Registered at `@swamp/cloudflare/ai-gateway/costs`. */
export const model = {
  type: "@swamp/cloudflare/ai-gateway/costs",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Costs resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Costs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers/costs";
        const body: Record<string, unknown> = {};
        if (g.account_provider_id !== undefined) {
          body.account_provider_id = g.account_provider_id;
        }
        if (g.cost_in !== undefined) body.cost_in = g.cost_in;
        if (g.cost_out !== undefined) body.cost_out = g.cost_out;
        if (g.cost_type !== undefined) body.cost_type = g.cost_type;
        if (g.enable !== undefined) body.enable = g.enable;
        if (g.model !== undefined) body.model = g.model;
        if (g.model_rule !== undefined) body.model_rule = g.model_rule;
        if (g.token_pricing !== undefined) body.token_pricing = g.token_pricing;
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
      description: "Get a Costs",
      arguments: z.object({ id: z.string().describe("The ID of the Costs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers/costs";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
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
      description: "Update Costs attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers/costs";
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
        if (g.cost_in !== undefined) body.cost_in = g.cost_in;
        if (g.cost_out !== undefined) body.cost_out = g.cost_out;
        if (g.cost_type !== undefined) body.cost_type = g.cost_type;
        if (g.enable !== undefined) body.enable = g.enable;
        if (g.model !== undefined) body.model = g.model;
        if (g.model_rule !== undefined) body.model_rule = g.model_rule;
        if (g.token_pricing !== undefined) body.token_pricing = g.token_pricing;
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
      description: "Delete the Costs",
      arguments: z.object({ id: z.string().describe("The ID of the Costs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers/costs";
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
      description: "Sync Costs state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers/costs";
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
