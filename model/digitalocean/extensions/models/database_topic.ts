// Auto-generated extension model for @swamp/digitalocean/database-topic
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database topic.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/topics` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  replication_factor: z.number().int().describe(
    "The number of nodes to replicate data across the cluster.",
  ).optional(),
  partition_count: z.number().int().describe(
    "The number of partitions available for the topic. On update, this value can only be increased.",
  ).optional(),
  config: z.object({
    cleanup_policy: z.enum(["delete", "compact", "compact_delete"]).optional(),
    compression_type: z.enum([
      "producer",
      "gzip",
      "snappy",
      "Iz4",
      "zstd",
      "uncompressed",
    ]).optional(),
    delete_retention_ms: z.number().int().optional(),
    file_delete_delay_ms: z.number().int().optional(),
    flush_messages: z.number().int().optional(),
    flush_ms: z.number().int().optional(),
    index_interval_bytes: z.number().int().optional(),
    max_compaction_lag_ms: z.number().int().optional(),
    max_message_bytes: z.number().int().optional(),
    message_down_conversion_enable: z.boolean().optional(),
    message_format_version: z.enum([
      "0.8.0",
      "0.8.1",
      "0.8.2",
      "0.9.0",
      "0.10.0-IV0",
      "0.10.0-IV1",
      "0.10.1-IV0",
      "0.10.1-IV1",
      "0.10.1-IV2",
      "0.10.2-IV0",
      "0.11.0-IV0",
      "0.11.0-IV1",
      "0.11.0-IV2",
      "1.0-IV0",
      "1.1-IV0",
      "2.0-IV0",
      "2.0-IV1",
      "2.1-IV0",
      "2.1-IV1",
      "2.1-IV2",
      "2.2-IV0",
      "2.2-IV1",
      "2.3-IV0",
      "2.3-IV1",
      "2.4-IV0",
      "2.4-IV1",
      "2.5-IV0",
      "2.6-IV0",
      "2.7-IV0",
      "2.7-IV1",
      "2.7-IV2",
      "2.8-IV0",
      "2.8-IV1",
      "3.0-IV0",
      "3.0-IV1",
      "3.1-IV0",
      "3.2-IV0",
      "3.3-IV0",
      "3.3-IV1",
      "3.3-IV2",
      "3.3-IV3",
    ]).optional(),
    message_timestamp_type: z.enum(["create_time", "log_append_time"])
      .optional(),
    min_cleanable_dirty_ratio: z.number().min(0).max(1).optional(),
    min_compaction_lag_ms: z.number().int().optional(),
    min_insync_replicas: z.number().int().min(1).optional(),
    preallocate: z.boolean().optional(),
    retention_bytes: z.number().int().optional(),
    retention_ms: z.number().int().optional(),
    segment_bytes: z.number().int().min(14).optional(),
    segment_jitter_ms: z.number().int().optional(),
    segment_ms: z.number().int().min(1).optional(),
  }).optional(),
  name: z.string().describe("The name of the Kafka topic."),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  name: z.string(),
  state: z.string().optional(),
  replication_factor: z.number().optional(),
  partitions: z.array(z.object({
    size: z.number().optional(),
    id: z.number().optional(),
    in_sync_replicas: z.number().optional(),
    earliest_offset: z.number().optional(),
    consumer_groups: z.array(z.object({
      group_name: z.string().optional(),
      offset: z.number().optional(),
    })).optional(),
  })).optional(),
  config: z.object({
    cleanup_policy: z.string().optional(),
    compression_type: z.string().optional(),
    delete_retention_ms: z.number().optional(),
    file_delete_delay_ms: z.number().optional(),
    flush_messages: z.number().optional(),
    flush_ms: z.number().optional(),
    index_interval_bytes: z.number().optional(),
    max_compaction_lag_ms: z.number().optional(),
    max_message_bytes: z.number().optional(),
    message_down_conversion_enable: z.boolean().optional(),
    message_format_version: z.string().optional(),
    message_timestamp_type: z.string().optional(),
    min_cleanable_dirty_ratio: z.number().optional(),
    min_compaction_lag_ms: z.number().optional(),
    min_insync_replicas: z.number().optional(),
    preallocate: z.boolean().optional(),
    retention_bytes: z.number().optional(),
    retention_ms: z.number().optional(),
    segment_bytes: z.number().optional(),
    segment_jitter_ms: z.number().optional(),
    segment_ms: z.number().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  replication_factor: z.number().int().optional(),
  partition_count: z.number().int().optional(),
  config: z.object({
    cleanup_policy: z.enum(["delete", "compact", "compact_delete"]).optional(),
    compression_type: z.enum([
      "producer",
      "gzip",
      "snappy",
      "Iz4",
      "zstd",
      "uncompressed",
    ]).optional(),
    delete_retention_ms: z.number().int().optional(),
    file_delete_delay_ms: z.number().int().optional(),
    flush_messages: z.number().int().optional(),
    flush_ms: z.number().int().optional(),
    index_interval_bytes: z.number().int().optional(),
    max_compaction_lag_ms: z.number().int().optional(),
    max_message_bytes: z.number().int().optional(),
    message_down_conversion_enable: z.boolean().optional(),
    message_format_version: z.enum([
      "0.8.0",
      "0.8.1",
      "0.8.2",
      "0.9.0",
      "0.10.0-IV0",
      "0.10.0-IV1",
      "0.10.1-IV0",
      "0.10.1-IV1",
      "0.10.1-IV2",
      "0.10.2-IV0",
      "0.11.0-IV0",
      "0.11.0-IV1",
      "0.11.0-IV2",
      "1.0-IV0",
      "1.1-IV0",
      "2.0-IV0",
      "2.0-IV1",
      "2.1-IV0",
      "2.1-IV1",
      "2.1-IV2",
      "2.2-IV0",
      "2.2-IV1",
      "2.3-IV0",
      "2.3-IV1",
      "2.4-IV0",
      "2.4-IV1",
      "2.5-IV0",
      "2.6-IV0",
      "2.7-IV0",
      "2.7-IV1",
      "2.7-IV2",
      "2.8-IV0",
      "2.8-IV1",
      "3.0-IV0",
      "3.0-IV1",
      "3.1-IV0",
      "3.2-IV0",
      "3.3-IV0",
      "3.3-IV1",
      "3.3-IV2",
      "3.3-IV3",
    ]).optional(),
    message_timestamp_type: z.enum(["create_time", "log_append_time"])
      .optional(),
    min_cleanable_dirty_ratio: z.number().min(0).max(1).optional(),
    min_compaction_lag_ms: z.number().int().optional(),
    min_insync_replicas: z.number().int().min(1).optional(),
    preallocate: z.boolean().optional(),
    retention_bytes: z.number().int().optional(),
    retention_ms: z.number().int().optional(),
    segment_bytes: z.number().int().min(14).optional(),
    segment_jitter_ms: z.number().int().optional(),
    segment_ms: z.number().int().min(1).optional(),
  }).optional(),
  name: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean database topic. Registered at `@swamp/digitalocean/database-topic`. */
export const model = {
  type: "@swamp/digitalocean/database-topic",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database Topic resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database topic",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/topics`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryRead(endpoint, g.name, undefined, g.token);
          if (existing) {
            throw new Error(`Resource already exists: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.replication_factor !== undefined) {
          body.replication_factor = g.replication_factor;
        }
        if (g.partition_count !== undefined) {
          body.partition_count = g.partition_count;
        }
        if (g.config !== undefined) body.config = g.config;
        const result = await create(
          endpoint,
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a database topic",
      arguments: z.object({
        name: z.string().describe("The name of the database topic"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/topics`;
        const result = await read(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.name.toString())
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
      description: "Update database topic attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/topics`;
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
        if (g.replication_factor !== undefined) {
          body.replication_factor = g.replication_factor;
        }
        if (g.partition_count !== undefined) {
          body.partition_count = g.partition_count;
        }
        if (g.config !== undefined) body.config = g.config;
        const result = await update(
          endpoint,
          existing.name ?? existing.id,
          body,
          "PUT",
          undefined,
          g.token,
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
      description: "Delete the database topic",
      arguments: z.object({
        name: z.string().describe("The name of the database topic"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/topics`;
        const { existed } = await remove(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.name.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          name: args.name,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync database topic state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/topics`;
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
        const result = await tryRead(
          endpoint,
          existing.name ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          name: existing.name ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
