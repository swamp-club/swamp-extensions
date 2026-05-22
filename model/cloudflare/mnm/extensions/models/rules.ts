// Auto-generated extension model for @swamp/cloudflare/mnm/rules
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
  automatic_advertisement: z.boolean().describe(
    "Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.",
  ),
  bandwidth_threshold: z.number().min(1).describe(
    "The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.",
  ).optional(),
  duration: z.enum(["1m", "5m", "10m", "15m", "20m", "30m", "45m", "60m"])
    .describe(
      'The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].',
    ).optional(),
  name: z.string().describe(
    "The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.",
  ),
  packet_threshold: z.number().min(1).describe(
    "The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.",
  ).optional(),
  prefix_match: z.enum(["exact", "subnet", "supernet"]).describe(
    "Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.",
  ).optional(),
  prefixes: z.array(z.string()),
  type: z.enum(["threshold", "zscore", "advanced_ddos"]).describe(
    "MNM rule type.",
  ),
  zscore_sensitivity: z.enum(["low", "medium", "high"]).describe(
    "Level of sensitivity set for zscore rules.",
  ).optional(),
  zscore_target: z.enum(["bits", "packets"]).describe(
    "Target of the zscore rule analysis.",
  ).optional(),
});

const ResourceSchema = z.object({
  automatic_advertisement: z.boolean().optional(),
  bandwidth_threshold: z.number().optional(),
  duration: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  packet_threshold: z.number().optional(),
  prefix_match: z.string().optional(),
  prefixes: z.array(z.string()).optional(),
  type: z.string().optional(),
  zscore_sensitivity: z.string().optional(),
  zscore_target: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  automatic_advertisement: z.boolean().optional(),
  bandwidth_threshold: z.number().min(1).optional(),
  duration: z.enum(["1m", "5m", "10m", "15m", "20m", "30m", "45m", "60m"])
    .optional(),
  name: z.string().optional(),
  packet_threshold: z.number().min(1).optional(),
  prefix_match: z.enum(["exact", "subnet", "supernet"]).optional(),
  prefixes: z.array(z.string()).optional(),
  type: z.enum(["threshold", "zscore", "advanced_ddos"]).optional(),
  zscore_sensitivity: z.enum(["low", "medium", "high"]).optional(),
  zscore_target: z.enum(["bits", "packets"]).optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/mnm/rules`. */
export const model = {
  type: "@swamp/cloudflare/mnm/rules",
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
        const endpoint = "/accounts/" + g.account_id + "/mnm/rules";
        const body: Record<string, unknown> = {};
        if (g.automatic_advertisement !== undefined) {
          body.automatic_advertisement = g.automatic_advertisement;
        }
        if (g.bandwidth_threshold !== undefined) {
          body.bandwidth_threshold = g.bandwidth_threshold;
        }
        if (g.duration !== undefined) body.duration = g.duration;
        if (g.name !== undefined) body.name = g.name;
        if (g.packet_threshold !== undefined) {
          body.packet_threshold = g.packet_threshold;
        }
        if (g.prefix_match !== undefined) body.prefix_match = g.prefix_match;
        if (g.prefixes !== undefined) body.prefixes = g.prefixes;
        if (g.type !== undefined) body.type = g.type;
        if (g.zscore_sensitivity !== undefined) {
          body.zscore_sensitivity = g.zscore_sensitivity;
        }
        if (g.zscore_target !== undefined) body.zscore_target = g.zscore_target;
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
        const endpoint = "/accounts/" + g.account_id + "/mnm/rules";
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
        const endpoint = "/accounts/" + g.account_id + "/mnm/rules";
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
        if (g.automatic_advertisement !== undefined) {
          body.automatic_advertisement = g.automatic_advertisement;
        }
        if (g.bandwidth_threshold !== undefined) {
          body.bandwidth_threshold = g.bandwidth_threshold;
        }
        if (g.duration !== undefined) body.duration = g.duration;
        if (g.name !== undefined) body.name = g.name;
        if (g.packet_threshold !== undefined) {
          body.packet_threshold = g.packet_threshold;
        }
        if (g.prefix_match !== undefined) body.prefix_match = g.prefix_match;
        if (g.prefixes !== undefined) body.prefixes = g.prefixes;
        if (g.type !== undefined) body.type = g.type;
        if (g.zscore_sensitivity !== undefined) {
          body.zscore_sensitivity = g.zscore_sensitivity;
        }
        if (g.zscore_target !== undefined) body.zscore_target = g.zscore_target;
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
        const endpoint = "/accounts/" + g.account_id + "/mnm/rules";
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
        const endpoint = "/accounts/" + g.account_id + "/mnm/rules";
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
