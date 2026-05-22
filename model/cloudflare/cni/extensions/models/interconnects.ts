// Auto-generated extension model for @swamp/cloudflare/cni/interconnects
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Interconnects.
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
  account: z.string(),
  type: z.string(),
  slot_id: z.string().optional(),
  speed: z.string().optional(),
  bandwidth: z.enum([
    "50M",
    "100M",
    "200M",
    "300M",
    "400M",
    "500M",
    "1G",
    "2G",
    "5G",
    "10G",
    "20G",
    "50G",
  ]).describe("Bandwidth structure as visible through the customer-facing API.")
    .optional(),
  pairing_key: z.string().describe("Pairing key provided by GCP").optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  account: z.string().optional(),
  type: z.string().optional(),
  slot_id: z.string().optional(),
  speed: z.string().optional(),
  bandwidth: z.enum([
    "50M",
    "100M",
    "200M",
    "300M",
    "400M",
    "500M",
    "1G",
    "2G",
    "5G",
    "10G",
    "20G",
    "50G",
  ]).optional(),
  pairing_key: z.string().optional(),
});

/** Swamp extension model for Cloudflare Interconnects. Registered at `@swamp/cloudflare/cni/interconnects`. */
export const model = {
  type: "@swamp/cloudflare/cni/interconnects",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Interconnects resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Interconnects",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/interconnects";
        const body: Record<string, unknown> = {};
        if (g.account !== undefined) body.account = g.account;
        if (g.type !== undefined) body.type = g.type;
        if (g.slot_id !== undefined) body.slot_id = g.slot_id;
        if (g.speed !== undefined) body.speed = g.speed;
        if (g.bandwidth !== undefined) body.bandwidth = g.bandwidth;
        if (g.pairing_key !== undefined) body.pairing_key = g.pairing_key;
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
      description: "Get a Interconnects",
      arguments: z.object({
        id: z.string().describe("The ID of the Interconnects"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/interconnects";
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
    delete: {
      description: "Delete the Interconnects",
      arguments: z.object({
        id: z.string().describe("The ID of the Interconnects"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/interconnects";
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
      description: "Sync Interconnects state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cni/interconnects";
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
