// Auto-generated extension model for @swamp/cloudflare/infrastructure/targets
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Targets.
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
  hostname: z.string().describe(
    "A non-unique field that refers to a target. Case insensitive, maximum\nlength of 255 characters, supports the use of special characters dash\nand period, does not support spaces, and must start and end with an\nalphanumeric character.",
  ),
  ip: z.object({
    ipv4: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
    ipv6: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
  }).describe("The IPv4/IPv6 address that identifies where to reach a target"),
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  hostname: z.string().optional(),
  id: z.string(),
  ip: z.object({
    ipv4: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
    ipv6: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
  }).optional(),
  modified_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  hostname: z.string().optional(),
  ip: z.object({
    ipv4: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
    ipv6: z.object({
      ip_addr: z.string().optional(),
      virtual_network_id: z.string().optional(),
    }).optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Targets. Registered at `@swamp/cloudflare/infrastructure/targets`. */
export const model = {
  type: "@swamp/cloudflare/infrastructure/targets",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Targets resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Targets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/infrastructure/targets";
        const body: Record<string, unknown> = {};
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.ip !== undefined) body.ip = g.ip;
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
      description: "Get a Targets",
      arguments: z.object({ id: z.string().describe("The ID of the Targets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/infrastructure/targets";
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
      description: "Update Targets attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/infrastructure/targets";
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
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.ip !== undefined) body.ip = g.ip;
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
      description: "Delete the Targets",
      arguments: z.object({ id: z.string().describe("The ID of the Targets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/infrastructure/targets";
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
      description: "Sync Targets state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/infrastructure/targets";
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
