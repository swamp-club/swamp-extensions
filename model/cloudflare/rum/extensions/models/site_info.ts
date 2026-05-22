// Auto-generated extension model for @swamp/cloudflare/rum/site-info
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Site Info.
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
  auto_install: z.boolean().describe(
    "If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.",
  ).optional(),
  enabled: z.boolean().describe(
    "Enables or disables RUM. This option can be used only when auto_install is set to true.",
  ).optional(),
  host: z.string().describe("The hostname to use for gray-clouded sites.")
    .optional(),
  lite: z.boolean().describe(
    "If enabled, the JavaScript snippet will not be injected for visitors from the EU.",
  ).optional(),
  zone_tag: z.string().describe("The zone identifier.").optional(),
});

const ResourceSchema = z.object({
  auto_install: z.boolean().optional(),
  created: z.string().optional(),
  rules: z.array(z.object({
    created: z.string().optional(),
    host: z.string().optional(),
    id: z.string().optional(),
    inclusive: z.boolean().optional(),
    is_paused: z.boolean().optional(),
    paths: z.array(z.string()).optional(),
    priority: z.number().optional(),
  })).optional(),
  ruleset: z.object({
    enabled: z.boolean().optional(),
    id: z.string().optional(),
    zone_name: z.string().optional(),
    zone_tag: z.string().optional(),
  }).optional(),
  site_tag: z.string().optional(),
  site_token: z.string().optional(),
  snippet: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  auto_install: z.boolean().optional(),
  enabled: z.boolean().optional(),
  host: z.string().optional(),
  lite: z.boolean().optional(),
  zone_tag: z.string().optional(),
});

/** Swamp extension model for Cloudflare Site Info. Registered at `@swamp/cloudflare/rum/site-info`. */
export const model = {
  type: "@swamp/cloudflare/rum/site-info",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Site Info resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Site Info",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/rum/site_info";
        const body: Record<string, unknown> = {};
        if (g.auto_install !== undefined) body.auto_install = g.auto_install;
        if (g.host !== undefined) body.host = g.host;
        if (g.zone_tag !== undefined) body.zone_tag = g.zone_tag;
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
      description: "Get a Site Info",
      arguments: z.object({
        id: z.string().describe("The ID of the Site Info"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/rum/site_info";
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
      description: "Update Site Info attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/rum/site_info";
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
        if (g.auto_install !== undefined) body.auto_install = g.auto_install;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.host !== undefined) body.host = g.host;
        if (g.lite !== undefined) body.lite = g.lite;
        if (g.zone_tag !== undefined) body.zone_tag = g.zone_tag;
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
      description: "Delete the Site Info",
      arguments: z.object({
        id: z.string().describe("The ID of the Site Info"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/rum/site_info";
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
      description: "Sync Site Info state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/rum/site_info";
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
