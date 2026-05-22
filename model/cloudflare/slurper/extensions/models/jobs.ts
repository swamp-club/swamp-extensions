// Auto-generated extension model for @swamp/cloudflare/slurper/jobs
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Jobs.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  overwrite: z.boolean().optional(),
  source: z.object({
    bucket: z.string(),
    endpoint: z.string().optional(),
    keys: z.array(z.string()).optional(),
    pathPrefix: z.string().optional(),
    region: z.string().optional(),
    secret: z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
    }),
    vendor: z.enum(["s3"]),
  }).optional(),
  target: z.object({
    bucket: z.string(),
    jurisdiction: z.enum(["default", "eu", "fedramp"]).optional(),
    secret: z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
    }),
    vendor: z.enum(["r2"]),
  }).optional(),
});

const ResourceSchema = z.object({
  createdAt: z.string().optional(),
  finishedAt: z.string().optional(),
  id: z.string(),
  overwrite: z.boolean().optional(),
  source: z.object({
    bucket: z.string().optional(),
    endpoint: z.string().optional(),
    keys: z.array(z.string()).optional(),
    pathPrefix: z.string().optional(),
    vendor: z.string().optional(),
  }).optional(),
  status: z.string().optional(),
  target: z.object({
    bucket: z.string().optional(),
    jurisdiction: z.string().optional(),
    vendor: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  overwrite: z.boolean().optional(),
  source: z.object({
    bucket: z.string(),
    endpoint: z.string().optional(),
    keys: z.array(z.string()).optional(),
    pathPrefix: z.string().optional(),
    region: z.string().optional(),
    secret: z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
    }),
    vendor: z.enum(["s3"]),
  }).optional(),
  target: z.object({
    bucket: z.string(),
    jurisdiction: z.enum(["default", "eu", "fedramp"]).optional(),
    secret: z.object({
      accessKeyId: z.string(),
      secretAccessKey: z.string(),
    }),
    vendor: z.enum(["r2"]),
  }).optional(),
});

/** Swamp extension model for Cloudflare Jobs. Registered at `@swamp/cloudflare/slurper/jobs`. */
export const model = {
  type: "@swamp/cloudflare/slurper/jobs",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Jobs resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/slurper/jobs";
        const body: Record<string, unknown> = {};
        if (g.overwrite !== undefined) body.overwrite = g.overwrite;
        if (g.source !== undefined) body.source = g.source;
        if (g.target !== undefined) body.target = g.target;
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
      description: "Get a Jobs",
      arguments: z.object({ id: z.string().describe("The ID of the Jobs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/slurper/jobs";
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
    delete: {
      description: "Delete the Jobs",
      arguments: z.object({ id: z.string().describe("The ID of the Jobs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/slurper/jobs";
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
      description: "Sync Jobs state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/slurper/jobs";
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
