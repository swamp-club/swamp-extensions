// Auto-generated extension model for @swamp/cloudflare/cloudforce-one/collections
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Collections.
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
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_]+$")),
  columns: z.array(z.object({
    default: z.record(z.string(), z.unknown()).optional(),
    name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_]+$")),
    required: z.boolean().optional(),
    type: z.enum(["text", "number", "boolean", "date"]),
  })).optional(),
  description: z.string().max(500).optional(),
  project_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rows: z.array(z.record(z.string(), z.unknown())).optional(),
});

const ResourceSchema = z.object({
  columns: z.array(z.object({
    default: z.record(z.string(), z.unknown()).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    position: z.number().optional(),
    required: z.boolean().optional(),
    type: z.string().optional(),
  })).optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  id: z.string(),
  item_count: z.number().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_]+$"))
    .optional(),
  columns: z.array(z.object({
    default: z.record(z.string(), z.unknown()).optional(),
    name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_]+$")),
    required: z.boolean().optional(),
    type: z.enum(["text", "number", "boolean", "date"]),
  })).optional(),
  description: z.string().max(500).optional(),
  project_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rows: z.array(z.record(z.string(), z.unknown())).optional(),
});

/** Swamp extension model for Cloudflare Collections. Registered at `@swamp/cloudflare/cloudforce-one/collections`. */
export const model = {
  type: "@swamp/cloudflare/cloudforce-one/collections",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Collections resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Collections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/collections";
        const body: Record<string, unknown> = {};
        if (g.columns !== undefined) body.columns = g.columns;
        if (g.description !== undefined) body.description = g.description;
        if (g.metadata !== undefined) body.metadata = g.metadata;
        if (g.name !== undefined) body.name = g.name;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.rows !== undefined) body.rows = g.rows;
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
      description: "Get a Collections",
      arguments: z.object({
        id: z.string().describe("The ID of the Collections"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/collections";
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
      description: "Update Collections attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/collections";
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
        if (g.metadata !== undefined) body.metadata = g.metadata;
        if (g.name !== undefined) body.name = g.name;
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
      description: "Delete the Collections",
      arguments: z.object({
        id: z.string().describe("The ID of the Collections"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/collections";
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
      description: "Sync Collections state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/collections";
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
