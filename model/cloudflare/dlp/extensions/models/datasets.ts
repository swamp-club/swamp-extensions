// Auto-generated extension model for @swamp/cloudflare/dlp/datasets
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Datasets.
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
  case_sensitive: z.boolean().describe(
    "Only applies to custom word lists.\nDetermines if the words should be matched in a case-sensitive manner\nCannot be set to false if `secret` is true or undefined",
  ).optional(),
  description: z.string().describe("The description of the dataset.")
    .optional(),
  name: z.string(),
  encoding_version: z.number().int().min(0).describe(
    "Dataset encoding version\n\nNon-secret custom word lists with no header are always version 1.\nSecret EDM lists with no header are version 1.\nMulticolumn CSV with headers are version 2.\nOmitting this field provides the default value 0, which is interpreted\nthe same as 1.",
  ).optional(),
  secret: z.boolean().describe(
    "Generate a secret dataset.\n\nIf true, the response will include a secret to use with the EDM encoder.\nIf false, the response has no secret and the dataset is uploaded in plaintext.",
  ).optional(),
});

const ResourceSchema = z.object({
  case_sensitive: z.boolean().optional(),
  columns: z.array(z.object({
    entry_id: z.string().optional(),
    header_name: z.string().optional(),
    num_cells: z.number().optional(),
    upload_status: z.string().optional(),
  })).optional(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  encoding_version: z.number().optional(),
  id: z.string(),
  name: z.string().optional(),
  num_cells: z.number().optional(),
  secret: z.boolean().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
  uploads: z.array(z.object({
    num_cells: z.number().optional(),
    status: z.string().optional(),
    version: z.number().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  case_sensitive: z.boolean().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  encoding_version: z.number().int().min(0).optional(),
  secret: z.boolean().optional(),
});

/** Swamp extension model for Cloudflare Datasets. Registered at `@swamp/cloudflare/dlp/datasets`. */
export const model = {
  type: "@swamp/cloudflare/dlp/datasets",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Datasets resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Datasets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dlp/datasets";
        const body: Record<string, unknown> = {};
        if (g.case_sensitive !== undefined) {
          body.case_sensitive = g.case_sensitive;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.encoding_version !== undefined) {
          body.encoding_version = g.encoding_version;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.secret !== undefined) body.secret = g.secret;
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
      description: "Get a Datasets",
      arguments: z.object({
        id: z.string().describe("The ID of the Datasets"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dlp/datasets";
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
      description: "Update Datasets attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dlp/datasets";
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
        if (g.case_sensitive !== undefined) {
          body.case_sensitive = g.case_sensitive;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
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
      description: "Delete the Datasets",
      arguments: z.object({
        id: z.string().describe("The ID of the Datasets"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dlp/datasets";
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
      description: "Sync Datasets state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dlp/datasets";
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
