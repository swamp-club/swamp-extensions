// Auto-generated extension model for @swamp/cloudflare/access/custom-pages
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Custom Pages.
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
  app_count: z.number().int().describe(
    "Number of apps the custom page is assigned to.",
  ).optional(),
  created_at: z.string().optional(),
  custom_html: z.string().describe("Custom page HTML."),
  name: z.string().describe("Custom page name."),
  type: z.enum(["identity_denied", "forbidden"]).describe("Custom page type."),
  uid: z.string().max(36).describe("UUID.").optional(),
  updated_at: z.string().optional(),
});

const ResourceSchema = z.object({
  app_count: z.number().optional(),
  created_at: z.string().optional(),
  custom_html: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updated_at: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  app_count: z.number().int().optional(),
  created_at: z.string().optional(),
  custom_html: z.string().optional(),
  name: z.string().optional(),
  type: z.enum(["identity_denied", "forbidden"]).optional(),
  uid: z.string().max(36).optional(),
  updated_at: z.string().optional(),
});

/** Swamp extension model for Cloudflare Custom Pages. Registered at `@swamp/cloudflare/access/custom-pages`. */
export const model = {
  type: "@swamp/cloudflare/access/custom-pages",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Custom Pages resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Custom Pages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/custom_pages";
        const body: Record<string, unknown> = {};
        if (g.app_count !== undefined) body.app_count = g.app_count;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.custom_html !== undefined) body.custom_html = g.custom_html;
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.uid !== undefined) body.uid = g.uid;
        if (g.updated_at !== undefined) body.updated_at = g.updated_at;
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
      description: "Get a Custom Pages",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Pages"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/custom_pages";
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
      description: "Update Custom Pages attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/custom_pages";
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
        if (g.app_count !== undefined) body.app_count = g.app_count;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.custom_html !== undefined) body.custom_html = g.custom_html;
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.uid !== undefined) body.uid = g.uid;
        if (g.updated_at !== undefined) body.updated_at = g.updated_at;
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
      description: "Delete the Custom Pages",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Pages"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/custom_pages";
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
      description: "Sync Custom Pages state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/custom_pages";
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
