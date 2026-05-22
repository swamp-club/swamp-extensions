// Auto-generated extension model for @swamp/cloudflare/gateway/lists
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Lists.
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
  append: z.array(z.object({
    description: z.string().optional(),
    value: z.string().optional(),
  })).describe("Add items to the list.").optional(),
  remove: z.array(z.string()).describe(
    "Lists of item values you want to remove.",
  ).optional(),
  description: z.string().describe("Provide the list description.").optional(),
  items: z.array(z.object({
    description: z.string().optional(),
    value: z.string().optional(),
  })).describe("Add items to the list.").optional(),
  name: z.string().describe("Specify the list name."),
  type: z.enum([
    "SERIAL",
    "URL",
    "DOMAIN",
    "EMAIL",
    "IP",
    "CATEGORY",
    "LOCATION",
    "DEVICE",
    "AAGUID",
  ]).describe("Specify the list type."),
});

const ResourceSchema = z.object({
  count: z.number().optional(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  items: z.array(z.object({
    created_at: z.string().optional(),
    description: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  append: z.array(z.object({
    description: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  remove: z.array(z.string()).optional(),
  description: z.string().optional(),
  items: z.array(z.object({
    description: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  type: z.enum([
    "SERIAL",
    "URL",
    "DOMAIN",
    "EMAIL",
    "IP",
    "CATEGORY",
    "LOCATION",
    "DEVICE",
    "AAGUID",
  ]).optional(),
});

/** Swamp extension model for Cloudflare Lists. Registered at `@swamp/cloudflare/gateway/lists`. */
export const model = {
  type: "@swamp/cloudflare/gateway/lists",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lists resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lists",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/lists";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.items !== undefined) body.items = g.items;
        if (g.name !== undefined) body.name = g.name;
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
      description: "Get a Lists",
      arguments: z.object({ id: z.string().describe("The ID of the Lists") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/lists";
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
      description: "Update Lists attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/lists";
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
        if (g.append !== undefined) body.append = g.append;
        if (g.remove !== undefined) body.remove = g.remove;
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
      description: "Delete the Lists",
      arguments: z.object({ id: z.string().describe("The ID of the Lists") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/lists";
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
      description: "Sync Lists state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/lists";
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
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
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
