// Auto-generated extension model for @swamp/cloudflare/magic/rules-syn_protection
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
  burst_sensitivity: z.string().describe(
    "The burst sensitivity. Must be one of 'low', 'medium', 'high'.",
  ),
  mitigation_type: z.string().describe(
    "The type of mitigation. Must be one of 'challenge' or 'retransmit'. Optional. Defaults to 'challenge'.",
  ).optional(),
  mode: z.string().describe(
    "The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.",
  ),
  rate_sensitivity: z.string().describe(
    "The rate sensitivity. Must be one of 'low', 'medium', 'high'.",
  ),
  name: z.string().describe(
    "The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.",
  ),
  scope: z.string().describe(
    "The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.",
  ),
});

const ResourceSchema = z.object({
  burst_sensitivity: z.string().optional(),
  created_on: z.string().optional(),
  id: z.string(),
  mitigation_type: z.string().optional(),
  mode: z.string().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  rate_sensitivity: z.string().optional(),
  scope: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  burst_sensitivity: z.string().optional(),
  mitigation_type: z.string().optional(),
  mode: z.string().optional(),
  rate_sensitivity: z.string().optional(),
  name: z.string().optional(),
  scope: z.string().optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/magic/rules-syn_protection`. */
export const model = {
  type: "@swamp/cloudflare/magic/rules-syn_protection",
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
        const endpoint = "/accounts/" + g.account_id +
          "/magic/advanced_tcp_protection/configs/syn_protection/rules";
        const body: Record<string, unknown> = {};
        if (g.burst_sensitivity !== undefined) {
          body.burst_sensitivity = g.burst_sensitivity;
        }
        if (g.mitigation_type !== undefined) {
          body.mitigation_type = g.mitigation_type;
        }
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.name !== undefined) body.name = g.name;
        if (g.rate_sensitivity !== undefined) {
          body.rate_sensitivity = g.rate_sensitivity;
        }
        if (g.scope !== undefined) body.scope = g.scope;
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
        const endpoint = "/accounts/" + g.account_id +
          "/magic/advanced_tcp_protection/configs/syn_protection/rules";
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
        const endpoint = "/accounts/" + g.account_id +
          "/magic/advanced_tcp_protection/configs/syn_protection/rules";
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
        if (g.burst_sensitivity !== undefined) {
          body.burst_sensitivity = g.burst_sensitivity;
        }
        if (g.mitigation_type !== undefined) {
          body.mitigation_type = g.mitigation_type;
        }
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.rate_sensitivity !== undefined) {
          body.rate_sensitivity = g.rate_sensitivity;
        }
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
      description: "Delete the Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/magic/advanced_tcp_protection/configs/syn_protection/rules";
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
        const endpoint = "/accounts/" + g.account_id +
          "/magic/advanced_tcp_protection/configs/syn_protection/rules";
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
