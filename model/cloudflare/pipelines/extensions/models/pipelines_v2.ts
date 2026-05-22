// Auto-generated extension model for @swamp/cloudflare/pipelines/pipelines-v2
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Pipelines.
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
  destination: z.object({
    batch: z.object({
      max_bytes: z.number().int().min(1000).max(100000000).optional(),
      max_duration_s: z.number().min(0.25).max(300).optional(),
      max_rows: z.number().int().min(100).max(10000000).optional(),
    }),
    compression: z.object({
      type: z.enum(["none", "gzip", "deflate"]).optional(),
    }),
    credentials: z.object({
      access_key_id: z.string(),
      endpoint: z.string(),
      secret_access_key: z.string(),
    }),
    format: z.enum(["json"]),
    path: z.object({
      bucket: z.string(),
      filename: z.string().optional(),
      filepath: z.string().optional(),
      prefix: z.string().optional(),
    }),
    type: z.enum(["r2"]),
  }),
  name: z.string().min(1).max(128).describe(
    "Defines the name of the pipeline.",
  ),
  source: z.array(z.object({
    authentication: z.boolean().optional(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    format: z.enum(["json"]),
    type: z.string(),
  })),
});

const ResourceSchema = z.object({
  destination: z.object({
    batch: z.object({
      max_bytes: z.number().optional(),
      max_duration_s: z.number().optional(),
      max_rows: z.number().optional(),
    }).optional(),
    compression: z.object({
      type: z.string().optional(),
    }).optional(),
    format: z.string().optional(),
    path: z.object({
      bucket: z.string().optional(),
      filename: z.string().optional(),
      filepath: z.string().optional(),
      prefix: z.string().optional(),
    }).optional(),
    type: z.string().optional(),
  }).optional(),
  endpoint: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  source: z.array(z.object({
    authentication: z.boolean().optional(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    format: z.string().optional(),
    type: z.string().optional(),
  })).optional(),
  version: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  destination: z.object({
    batch: z.object({
      max_bytes: z.number().int().min(1000).max(100000000).optional(),
      max_duration_s: z.number().min(0.25).max(300).optional(),
      max_rows: z.number().int().min(100).max(10000000).optional(),
    }),
    compression: z.object({
      type: z.enum(["none", "gzip", "deflate"]).optional(),
    }),
    credentials: z.object({
      access_key_id: z.string(),
      endpoint: z.string(),
      secret_access_key: z.string(),
    }),
    format: z.enum(["json"]),
    path: z.object({
      bucket: z.string(),
      filename: z.string().optional(),
      filepath: z.string().optional(),
      prefix: z.string().optional(),
    }),
    type: z.enum(["r2"]),
  }).optional(),
  name: z.string().min(1).max(128).optional(),
  source: z.array(z.object({
    authentication: z.boolean().optional(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    format: z.enum(["json"]),
    type: z.string(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Pipelines. Registered at `@swamp/cloudflare/pipelines/pipelines-v2`. */
export const model = {
  type: "@swamp/cloudflare/pipelines/pipelines-v2",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Pipelines resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pipelines",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines";
        const body: Record<string, unknown> = {};
        if (g.destination !== undefined) body.destination = g.destination;
        if (g.name !== undefined) body.name = g.name;
        if (g.source !== undefined) body.source = g.source;
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
      description: "Get a Pipelines",
      arguments: z.object({
        id: z.string().describe("The ID of the Pipelines"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines";
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
      description: "Update Pipelines attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines";
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
        if (g.destination !== undefined) body.destination = g.destination;
        if (g.name !== undefined) body.name = g.name;
        if (g.source !== undefined) body.source = g.source;
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
      description: "Delete the Pipelines",
      arguments: z.object({
        id: z.string().describe("The ID of the Pipelines"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines";
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
      description: "Sync Pipelines state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines";
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
