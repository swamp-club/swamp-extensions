// Auto-generated extension model for @swamp/cloudflare/d1/database
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Database.
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
  read_replication: z.object({
    mode: z.enum(["auto", "disabled"]),
  }).describe("Configuration for D1 read replication.").optional(),
  jurisdiction: z.enum(["eu", "fedramp"]).describe(
    "Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.",
  ).optional(),
  name: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$")).describe(
    "D1 database name.",
  ),
  primary_location_hint: z.enum(["wnam", "enam", "weur", "eeur", "apac", "oc"])
    .describe(
      "Specify the region to create the D1 primary, if available. If this option is omitted, the D1 will be created as close as possible to the current user.",
    ).optional(),
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  file_size: z.number().optional(),
  jurisdiction: z.string().optional(),
  name: z.string().optional(),
  num_tables: z.number().optional(),
  read_replication: z.object({
    mode: z.string().optional(),
  }).optional(),
  uuid: z.string().optional(),
  version: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  read_replication: z.object({
    mode: z.enum(["auto", "disabled"]),
  }).optional(),
  jurisdiction: z.enum(["eu", "fedramp"]).optional(),
  name: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$")).optional(),
  primary_location_hint: z.enum(["wnam", "enam", "weur", "eeur", "apac", "oc"])
    .optional(),
});

/** Swamp extension model for Cloudflare Database. Registered at `@swamp/cloudflare/d1/database`. */
export const model = {
  type: "@swamp/cloudflare/d1/database",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Database",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/d1/database";
        const body: Record<string, unknown> = {};
        if (g.jurisdiction !== undefined) body.jurisdiction = g.jurisdiction;
        if (g.name !== undefined) body.name = g.name;
        if (g.primary_location_hint !== undefined) {
          body.primary_location_hint = g.primary_location_hint;
        }
        if (g.read_replication !== undefined) {
          body.read_replication = g.read_replication;
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
      description: "Get a Database",
      arguments: z.object({
        id: z.string().describe("The ID of the Database"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/d1/database";
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
    update: {
      description: "Update Database attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/d1/database";
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
        if (g.read_replication !== undefined) {
          body.read_replication = g.read_replication;
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
      description: "Delete the Database",
      arguments: z.object({
        id: z.string().describe("The ID of the Database"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/d1/database";
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
      description: "Sync Database state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/d1/database";
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
