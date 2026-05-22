// Auto-generated extension model for @swamp/cloudflare/dex/dex-tests
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Dex Tests.
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
  data: z.object({
    host: z.string(),
    kind: z.enum(["http", "traceroute"]),
    method: z.enum(["GET"]).optional(),
  }).describe(
    "The configuration object which contains the details for the WARP client to conduct the test.",
  ),
  description: z.string().describe("Additional details about the test.")
    .optional(),
  enabled: z.boolean().describe(
    "Determines whether or not the test is active.",
  ),
  interval: z.string().describe("How often the test will run."),
  name: z.string().describe("The name of the DEX test. Must be unique."),
  target_policies: z.array(z.object({
    default: z.boolean().optional(),
    id: z.string().max(36),
    name: z.string().optional(),
  })).describe("DEX rules targeted by this test").optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().max(32).describe("The unique identifier for the test.")
    .optional(),
});

const ResourceSchema = z.object({
  data: z.object({
    host: z.string().optional(),
    kind: z.string().optional(),
    method: z.string().optional(),
  }).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  interval: z.string().optional(),
  name: z.string().optional(),
  target_policies: z.array(z.object({
    default: z.boolean().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  data: z.object({
    host: z.string(),
    kind: z.enum(["http", "traceroute"]),
    method: z.enum(["GET"]).optional(),
  }).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  interval: z.string().optional(),
  name: z.string().optional(),
  target_policies: z.array(z.object({
    default: z.boolean().optional(),
    id: z.string().max(36),
    name: z.string().optional(),
  })).optional(),
  targeted: z.boolean().optional(),
  test_id: z.string().max(32).optional(),
});

/** Swamp extension model for Cloudflare Dex Tests. Registered at `@swamp/cloudflare/dex/dex-tests`. */
export const model = {
  type: "@swamp/cloudflare/dex/dex-tests",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Dex Tests resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Dex Tests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
        const body: Record<string, unknown> = {};
        if (g.data !== undefined) body.data = g.data;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.target_policies !== undefined) {
          body.target_policies = g.target_policies;
        }
        if (g.targeted !== undefined) body.targeted = g.targeted;
        if (g.test_id !== undefined) body.test_id = g.test_id;
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
      description: "Get a Dex Tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Dex Tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
      description: "Update Dex Tests attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
        if (g.data !== undefined) body.data = g.data;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.target_policies !== undefined) {
          body.target_policies = g.target_policies;
        }
        if (g.targeted !== undefined) body.targeted = g.targeted;
        if (g.test_id !== undefined) body.test_id = g.test_id;
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
      description: "Delete the Dex Tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Dex Tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
      description: "Sync Dex Tests state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/dex/devices/dex_tests";
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
