// Auto-generated extension model for @swamp/cloudflare/devices/integration
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Integration.
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
  config: z.object({
    api_url: z.string(),
    auth_url: z.string(),
    client_id: z.string(),
    client_secret: z.string(),
  }),
  interval: z.string().describe(
    "The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).",
  ),
  name: z.string().describe("The name of the device posture integration."),
  type: z.enum([
    "workspace_one",
    "crowdstrike_s2s",
    "uptycs",
    "intune",
    "kolide",
    "tanium_s2s",
    "sentinelone_s2s",
    "custom_s2s",
  ]).describe("The type of device posture integration."),
});

const ResourceSchema = z.object({
  config: z.object({
    api_url: z.string().optional(),
    auth_url: z.string().optional(),
    client_id: z.string().optional(),
  }).optional(),
  id: z.string(),
  interval: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  config: z.object({
    api_url: z.string(),
    auth_url: z.string(),
    client_id: z.string(),
    client_secret: z.string(),
  }).optional(),
  interval: z.string().optional(),
  name: z.string().optional(),
  type: z.enum([
    "workspace_one",
    "crowdstrike_s2s",
    "uptycs",
    "intune",
    "kolide",
    "tanium_s2s",
    "sentinelone_s2s",
    "custom_s2s",
  ]).optional(),
});

/** Swamp extension model for Cloudflare Integration. Registered at `@swamp/cloudflare/devices/integration`. */
export const model = {
  type: "@swamp/cloudflare/devices/integration",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Integration resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Integration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/devices/posture/integration";
        const body: Record<string, unknown> = {};
        if (g.config !== undefined) body.config = g.config;
        if (g.interval !== undefined) body.interval = g.interval;
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
      description: "Get a Integration",
      arguments: z.object({
        id: z.string().describe("The ID of the Integration"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/devices/posture/integration";
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
      description: "Update Integration attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/devices/posture/integration";
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
        if (g.config !== undefined) body.config = g.config;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Delete the Integration",
      arguments: z.object({
        id: z.string().describe("The ID of the Integration"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/devices/posture/integration";
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
      description: "Sync Integration state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/devices/posture/integration";
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
