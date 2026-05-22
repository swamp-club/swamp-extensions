// Auto-generated extension model for @swamp/cloudflare/magic/sites
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Sites.
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
  connector_id: z.string().describe("Magic Connector identifier tag.")
    .optional(),
  description: z.string().optional(),
  location: z.object({
    lat: z.string().optional(),
    lon: z.string().optional(),
  }).describe("Location of site in latitude and longitude.").optional(),
  name: z.string().describe("The name of the site."),
  secondary_connector_id: z.string().describe(
    "Magic Connector identifier tag. Used when high availability mode is on.",
  ).optional(),
  ha_mode: z.boolean().describe(
    "Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.",
  ).optional(),
});

const ResourceSchema = z.object({
  connector_id: z.string().optional(),
  description: z.string().optional(),
  ha_mode: z.boolean().optional(),
  id: z.string(),
  location: z.object({
    lat: z.string().optional(),
    lon: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  secondary_connector_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  connector_id: z.string().optional(),
  description: z.string().optional(),
  location: z.object({
    lat: z.string().optional(),
    lon: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  secondary_connector_id: z.string().optional(),
  ha_mode: z.boolean().optional(),
});

/** Swamp extension model for Cloudflare Sites. Registered at `@swamp/cloudflare/magic/sites`. */
export const model = {
  type: "@swamp/cloudflare/magic/sites",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Sites resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Sites",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/sites";
        const body: Record<string, unknown> = {};
        if (g.connector_id !== undefined) body.connector_id = g.connector_id;
        if (g.description !== undefined) body.description = g.description;
        if (g.ha_mode !== undefined) body.ha_mode = g.ha_mode;
        if (g.location !== undefined) body.location = g.location;
        if (g.name !== undefined) body.name = g.name;
        if (g.secondary_connector_id !== undefined) {
          body.secondary_connector_id = g.secondary_connector_id;
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
      description: "Get a Sites",
      arguments: z.object({ id: z.string().describe("The ID of the Sites") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/sites";
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
      description: "Update Sites attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/sites";
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
        if (g.connector_id !== undefined) body.connector_id = g.connector_id;
        if (g.description !== undefined) body.description = g.description;
        if (g.location !== undefined) body.location = g.location;
        if (g.name !== undefined) body.name = g.name;
        if (g.secondary_connector_id !== undefined) {
          body.secondary_connector_id = g.secondary_connector_id;
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
      description: "Delete the Sites",
      arguments: z.object({ id: z.string().describe("The ID of the Sites") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/sites";
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
      description: "Sync Sites state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/sites";
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
