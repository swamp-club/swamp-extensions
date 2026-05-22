// Auto-generated extension model for @swamp/cloudflare/pipelines/sinks
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Sinks.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  config: z.object({
    account_id: z.string(),
    bucket: z.string(),
    credentials: z.object({
      access_key_id: z.string(),
      secret_access_key: z.string(),
    }),
    file_naming: z.object({
      prefix: z.string().optional(),
      strategy: z.enum(["serial", "uuid", "uuid_v7", "ulid"]).optional(),
      suffix: z.string().optional(),
    }).optional(),
    jurisdiction: z.string().optional(),
    partitioning: z.object({
      time_pattern: z.string().optional(),
    }).optional(),
    path: z.string().optional(),
    rolling_policy: z.object({
      file_size_bytes: z.number().int().min(0).optional(),
      inactivity_seconds: z.number().int().min(1).optional(),
      interval_seconds: z.number().int().min(1).optional(),
    }).optional(),
  }).optional(),
  format: z.object({
    decimal_encoding: z.enum(["number", "string", "bytes"]).optional(),
    timestamp_format: z.enum(["rfc3339", "unix_millis"]).optional(),
    unstructured: z.boolean().optional(),
    type: z.enum(["json"]),
  }).optional(),
  name: z.string().min(1).max(128).describe("Defines the name of the Sink."),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
  type: z.enum(["r2", "r2_data_catalog"]).describe(
    "Specifies the type of sink.",
  ),
});

const ResourceSchema = z.object({
  config: z.object({
    account_id: z.string().optional(),
    bucket: z.string().optional(),
    file_naming: z.object({
      prefix: z.string().optional(),
      strategy: z.string().optional(),
      suffix: z.string().optional(),
    }).optional(),
    jurisdiction: z.string().optional(),
    partitioning: z.object({
      time_pattern: z.string().optional(),
    }).optional(),
    path: z.string().optional(),
    rolling_policy: z.object({
      file_size_bytes: z.number().optional(),
      inactivity_seconds: z.number().optional(),
      interval_seconds: z.number().optional(),
    }).optional(),
  }).optional(),
  created_at: z.string().optional(),
  format: z.object({
    decimal_encoding: z.string().optional(),
    timestamp_format: z.string().optional(),
    unstructured: z.boolean().optional(),
    type: z.string().optional(),
  }).optional(),
  id: z.string(),
  modified_at: z.string().optional(),
  name: z.string().optional(),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string().optional(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  config: z.object({
    account_id: z.string(),
    bucket: z.string(),
    credentials: z.object({
      access_key_id: z.string(),
      secret_access_key: z.string(),
    }),
    file_naming: z.object({
      prefix: z.string().optional(),
      strategy: z.enum(["serial", "uuid", "uuid_v7", "ulid"]).optional(),
      suffix: z.string().optional(),
    }).optional(),
    jurisdiction: z.string().optional(),
    partitioning: z.object({
      time_pattern: z.string().optional(),
    }).optional(),
    path: z.string().optional(),
    rolling_policy: z.object({
      file_size_bytes: z.number().int().min(0).optional(),
      inactivity_seconds: z.number().int().min(1).optional(),
      interval_seconds: z.number().int().min(1).optional(),
    }).optional(),
  }).optional(),
  format: z.object({
    decimal_encoding: z.enum(["number", "string", "bytes"]).optional(),
    timestamp_format: z.enum(["rfc3339", "unix_millis"]).optional(),
    unstructured: z.boolean().optional(),
    type: z.enum(["json"]),
  }).optional(),
  name: z.string().min(1).max(128).optional(),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
  type: z.enum(["r2", "r2_data_catalog"]).optional(),
});

/** Swamp extension model for Cloudflare Sinks. Registered at `@swamp/cloudflare/pipelines/sinks`. */
export const model = {
  type: "@swamp/cloudflare/pipelines/sinks",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Sinks resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Sinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/sinks";
        const body: Record<string, unknown> = {};
        if (g.config !== undefined) body.config = g.config;
        if (g.format !== undefined) body.format = g.format;
        if (g.name !== undefined) body.name = g.name;
        if (g.schema !== undefined) body.schema = g.schema;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Get a Sinks",
      arguments: z.object({ id: z.string().describe("The ID of the Sinks") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/sinks";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id).replace(
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
    delete: {
      description: "Delete the Sinks",
      arguments: z.object({ id: z.string().describe("The ID of the Sinks") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/sinks";
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
      description: "Sync Sinks state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/sinks";
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
