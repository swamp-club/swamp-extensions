// Auto-generated extension model for @swamp/cloudflare/images/variants
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Variants.
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
  neverRequireSignedURLs: z.boolean().describe(
    "Indicates whether the variant can access an image without a signature, regardless of image access control.",
  ).optional(),
  options: z.object({
    fit: z.enum(["scale-down", "contain", "cover", "crop", "pad"]),
    height: z.number().min(1),
    metadata: z.enum(["keep", "copyright", "none"]),
    width: z.number().min(1),
  }).describe(
    "Allows you to define image resizing sizes for different use cases.",
  ),
  id: z.string().max(99).regex(new RegExp("^[a-zA-Z0-9]$")),
});

const ResourceSchema = z.object({
  variant: z.object({
    id: z.string().optional(),
    neverRequireSignedURLs: z.boolean().optional(),
    options: z.object({
      fit: z.string().optional(),
      height: z.number().optional(),
      metadata: z.string().optional(),
      width: z.number().optional(),
    }).optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  neverRequireSignedURLs: z.boolean().optional(),
  options: z.object({
    fit: z.enum(["scale-down", "contain", "cover", "crop", "pad"]),
    height: z.number().min(1),
    metadata: z.enum(["keep", "copyright", "none"]),
    width: z.number().min(1),
  }).optional(),
  id: z.string().max(99).regex(new RegExp("^[a-zA-Z0-9]$")).optional(),
});

/** Swamp extension model for Cloudflare Variants. Registered at `@swamp/cloudflare/images/variants`. */
export const model = {
  type: "@swamp/cloudflare/images/variants",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Variants resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Variants",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/images/v1/variants";
        const body: Record<string, unknown> = {};
        if (g.id !== undefined) body.id = g.id;
        if (g.neverRequireSignedURLs !== undefined) {
          body.neverRequireSignedURLs = g.neverRequireSignedURLs;
        }
        if (g.options !== undefined) body.options = g.options;
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
      description: "Get a Variants",
      arguments: z.object({
        id: z.string().describe("The ID of the Variants"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/images/v1/variants";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Variants attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/images/v1/variants";
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
        if (g.neverRequireSignedURLs !== undefined) {
          body.neverRequireSignedURLs = g.neverRequireSignedURLs;
        }
        if (g.options !== undefined) body.options = g.options;
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
      description: "Delete the Variants",
      arguments: z.object({
        id: z.string().describe("The ID of the Variants"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/images/v1/variants";
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
      description: "Sync Variants state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/images/v1/variants";
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
