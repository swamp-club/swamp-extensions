// Auto-generated extension model for @swamp/cloudflare/queues/queues
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Queues.
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
  consumers: z.array(z.object({
    consumer_id: z.string().max(32).optional(),
    created_on: z.string().optional(),
    dead_letter_queue: z.string().optional(),
    queue_name: z.string().optional(),
    script_name: z.string().optional(),
    settings: z.object({
      batch_size: z.number().optional(),
      max_concurrency: z.number().optional(),
      max_retries: z.number().optional(),
      max_wait_time_ms: z.number().optional(),
      retry_delay: z.number().optional(),
    }).optional(),
    type: z.enum(["worker"]).optional(),
  })).optional(),
  consumers_total_count: z.number().optional(),
  created_on: z.string().optional(),
  modified_on: z.string().optional(),
  producers: z.array(z.object({
    script: z.string().optional(),
    type: z.enum(["worker"]).optional(),
  })).optional(),
  producers_total_count: z.number().optional(),
  queue_id: z.string().optional(),
  queue_name: z.string(),
  settings: z.object({
    delivery_delay: z.number().optional(),
    delivery_paused: z.boolean().optional(),
    message_retention_period: z.number().optional(),
  }).optional(),
});

const ResourceSchema = z.object({
  consumers: z.array(z.object({
    consumer_id: z.string().optional(),
    created_on: z.string().optional(),
    dead_letter_queue: z.string().optional(),
    queue_name: z.string().optional(),
    script_name: z.string().optional(),
    settings: z.object({
      batch_size: z.number().optional(),
      max_concurrency: z.number().optional(),
      max_retries: z.number().optional(),
      max_wait_time_ms: z.number().optional(),
      retry_delay: z.number().optional(),
    }).optional(),
    type: z.string().optional(),
  })).optional(),
  consumers_total_count: z.number().optional(),
  created_on: z.string().optional(),
  modified_on: z.string().optional(),
  producers: z.array(z.object({
    script: z.string().optional(),
    type: z.string().optional(),
  })).optional(),
  producers_total_count: z.number().optional(),
  queue_id: z.string().optional(),
  queue_name: z.string().optional(),
  settings: z.object({
    delivery_delay: z.number().optional(),
    delivery_paused: z.boolean().optional(),
    message_retention_period: z.number().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  consumers: z.array(z.object({
    consumer_id: z.string().max(32).optional(),
    created_on: z.string().optional(),
    dead_letter_queue: z.string().optional(),
    queue_name: z.string().optional(),
    script_name: z.string().optional(),
    settings: z.object({
      batch_size: z.number().optional(),
      max_concurrency: z.number().optional(),
      max_retries: z.number().optional(),
      max_wait_time_ms: z.number().optional(),
      retry_delay: z.number().optional(),
    }).optional(),
    type: z.enum(["worker"]).optional(),
  })).optional(),
  consumers_total_count: z.number().optional(),
  created_on: z.string().optional(),
  modified_on: z.string().optional(),
  producers: z.array(z.object({
    script: z.string().optional(),
    type: z.enum(["worker"]).optional(),
  })).optional(),
  producers_total_count: z.number().optional(),
  queue_id: z.string().optional(),
  queue_name: z.string().optional(),
  settings: z.object({
    delivery_delay: z.number().optional(),
    delivery_paused: z.boolean().optional(),
    message_retention_period: z.number().optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Queues. Registered at `@swamp/cloudflare/queues/queues`. */
export const model = {
  type: "@swamp/cloudflare/queues/queues",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Queues resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Queues",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/queues";
        const body: Record<string, unknown> = {};
        if (g.queue_name !== undefined) body.queue_name = g.queue_name;
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
      description: "Get a Queues",
      arguments: z.object({ id: z.string().describe("The ID of the Queues") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/queues";
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
      description: "Update Queues attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/queues";
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
        if (g.consumers !== undefined) body.consumers = g.consumers;
        if (g.consumers_total_count !== undefined) {
          body.consumers_total_count = g.consumers_total_count;
        }
        if (g.created_on !== undefined) body.created_on = g.created_on;
        if (g.modified_on !== undefined) body.modified_on = g.modified_on;
        if (g.producers !== undefined) body.producers = g.producers;
        if (g.producers_total_count !== undefined) {
          body.producers_total_count = g.producers_total_count;
        }
        if (g.queue_id !== undefined) body.queue_id = g.queue_id;
        if (g.queue_name !== undefined) body.queue_name = g.queue_name;
        if (g.settings !== undefined) body.settings = g.settings;
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
      description: "Delete the Queues",
      arguments: z.object({ id: z.string().describe("The ID of the Queues") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/queues";
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
      description: "Sync Queues state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/queues";
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
