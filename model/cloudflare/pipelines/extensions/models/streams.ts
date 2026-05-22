// Auto-generated extension model for @swamp/cloudflare/pipelines/streams
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Streams.
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
  http: z.object({
    authentication: z.boolean(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean(),
  }).optional(),
  worker_binding: z.object({
    enabled: z.boolean(),
  }).optional(),
  format: z.object({
    decimal_encoding: z.enum(["number", "string", "bytes"]).optional(),
    timestamp_format: z.enum(["rfc3339", "unix_millis"]).optional(),
    unstructured: z.boolean().optional(),
    type: z.enum(["json"]),
  }).optional(),
  name: z.string().min(1).max(128).describe(
    "Specifies the name of the Stream.",
  ),
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
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  endpoint: z.string().optional(),
  format: z.object({
    decimal_encoding: z.string().optional(),
    timestamp_format: z.string().optional(),
    unstructured: z.boolean().optional(),
    type: z.string().optional(),
  }).optional(),
  http: z.object({
    authentication: z.boolean().optional(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean().optional(),
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
  version: z.number().optional(),
  worker_binding: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  http: z.object({
    authentication: z.boolean(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean(),
  }).optional(),
  worker_binding: z.object({
    enabled: z.boolean(),
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
});

/** Swamp extension model for Cloudflare Streams. Registered at `@swamp/cloudflare/pipelines/streams`. */
export const model = {
  type: "@swamp/cloudflare/pipelines/streams",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Streams resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Streams",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
        const body: Record<string, unknown> = {};
        if (g.format !== undefined) body.format = g.format;
        if (g.http !== undefined) body.http = g.http;
        if (g.name !== undefined) body.name = g.name;
        if (g.schema !== undefined) body.schema = g.schema;
        if (g.worker_binding !== undefined) {
          body.worker_binding = g.worker_binding;
        }
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
      description: "Get a Streams",
      arguments: z.object({ id: z.string().describe("The ID of the Streams") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
      description: "Update Streams attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
        if (g.http !== undefined) body.http = g.http;
        if (g.worker_binding !== undefined) {
          body.worker_binding = g.worker_binding;
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
      description: "Delete the Streams",
      arguments: z.object({ id: z.string().describe("The ID of the Streams") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
      description: "Sync Streams state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
