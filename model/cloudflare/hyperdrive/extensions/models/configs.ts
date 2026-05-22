// Auto-generated extension model for @swamp/cloudflare/hyperdrive/configs
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Configs.
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
  caching: z.object({
    disabled: z.boolean().optional(),
  }).optional(),
  mtls: z.object({
    ca_certificate_id: z.string().optional(),
    mtls_certificate_id: z.string().optional(),
    sslmode: z.string().optional(),
  }).describe(
    "mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.",
  ).optional(),
  name: z.string().describe(
    "The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.",
  ),
  origin: z.object({
    database: z.string().optional(),
    password: z.string().optional(),
    scheme: z.enum(["postgres", "postgresql", "mysql"]).optional(),
    user: z.string().optional(),
    host: z.string(),
    port: z.number().int(),
  }),
  origin_connection_limit: z.number().int().min(5).describe(
    "The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.\n\nMaximum allowed: 20 for free tier accounts, 100 for paid tier accounts.\nIf not specified, defaults to 20 for free tier and 60 for paid tier.\nContact Cloudflare if you need a higher limit.\n",
  ).optional(),
  created_on: z.string().describe(
    "Defines the creation time of the Hyperdrive configuration.",
  ).optional(),
  id: z.string().max(32).describe(
    "Define configurations using a unique string identifier.",
  ),
  modified_on: z.string().describe(
    "Defines the last modified time of the Hyperdrive configuration.",
  ).optional(),
});

const ResourceSchema = z.object({
  caching: z.object({
    disabled: z.boolean().optional(),
  }).optional(),
  created_on: z.string().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
  mtls: z.object({
    ca_certificate_id: z.string().optional(),
    mtls_certificate_id: z.string().optional(),
    sslmode: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  origin: z.object({
    database: z.string().optional(),
    password: z.string().optional(),
    scheme: z.string().optional(),
    user: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  origin_connection_limit: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  caching: z.object({
    disabled: z.boolean().optional(),
  }).optional(),
  mtls: z.object({
    ca_certificate_id: z.string().optional(),
    mtls_certificate_id: z.string().optional(),
    sslmode: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  origin: z.object({
    database: z.string().optional(),
    password: z.string().optional(),
    scheme: z.enum(["postgres", "postgresql", "mysql"]).optional(),
    user: z.string().optional(),
    host: z.string(),
    port: z.number().int(),
  }).optional(),
  origin_connection_limit: z.number().int().min(5).optional(),
  created_on: z.string().optional(),
  id: z.string().max(32).optional(),
  modified_on: z.string().optional(),
});

/** Swamp extension model for Cloudflare Configs. Registered at `@swamp/cloudflare/hyperdrive/configs`. */
export const model = {
  type: "@swamp/cloudflare/hyperdrive/configs",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Configs resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Configs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/hyperdrive/configs";
        const body: Record<string, unknown> = {};
        if (g.caching !== undefined) body.caching = g.caching;
        if (g.created_on !== undefined) body.created_on = g.created_on;
        if (g.id !== undefined) body.id = g.id;
        if (g.modified_on !== undefined) body.modified_on = g.modified_on;
        if (g.mtls !== undefined) body.mtls = g.mtls;
        if (g.name !== undefined) body.name = g.name;
        if (g.origin !== undefined) body.origin = g.origin;
        if (g.origin_connection_limit !== undefined) {
          body.origin_connection_limit = g.origin_connection_limit;
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
      description: "Get a Configs",
      arguments: z.object({ id: z.string().describe("The ID of the Configs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/hyperdrive/configs";
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
      description: "Update Configs attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/hyperdrive/configs";
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
        if (g.caching !== undefined) body.caching = g.caching;
        if (g.mtls !== undefined) body.mtls = g.mtls;
        if (g.name !== undefined) body.name = g.name;
        if (g.origin !== undefined) body.origin = g.origin;
        if (g.origin_connection_limit !== undefined) {
          body.origin_connection_limit = g.origin_connection_limit;
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
      description: "Delete the Configs",
      arguments: z.object({ id: z.string().describe("The ID of the Configs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/hyperdrive/configs";
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
      description: "Sync Configs state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/hyperdrive/configs";
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
