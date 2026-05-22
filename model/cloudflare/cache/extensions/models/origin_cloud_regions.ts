// Auto-generated extension model for @swamp/cloudflare/cache/origin-cloud-regions
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Origin Cloud Regions.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  zone_id: z.string().describe("Cloudflare zone ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ip: z.string().describe(
    "Origin IP address (IPv4 or IPv6). Normalized to canonical form before storage (RFC 5952 for IPv6).",
  ),
  region: z.string().describe(
    "Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.",
  ),
  vendor: z.enum(["aws", "azure", "gcp", "oci"]).describe(
    "Cloud vendor hosting the origin. Must be one of the supported vendors.",
  ),
});

const ResourceSchema = z.object({
  editable: z.boolean().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
  value: z.object({
    modified_on: z.string().optional(),
    "origin-ip": z.string().optional(),
    region: z.string().optional(),
    vendor: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  ip: z.string().optional(),
  region: z.string().optional(),
  vendor: z.enum(["aws", "azure", "gcp", "oci"]).optional(),
});

/** Swamp extension model for Cloudflare Origin Cloud Regions. Registered at `@swamp/cloudflare/cache/origin-cloud-regions`. */
export const model = {
  type: "@swamp/cloudflare/cache/origin-cloud-regions",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Origin Cloud Regions resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Origin Cloud Regions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/cache/origin_cloud_regions";
        const body: Record<string, unknown> = {};
        if (g.ip !== undefined) body.ip = g.ip;
        if (g.region !== undefined) body.region = g.region;
        if (g.vendor !== undefined) body.vendor = g.vendor;
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
      description: "Get a Origin Cloud Regions",
      arguments: z.object({
        id: z.string().describe("The ID of the Origin Cloud Regions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/cache/origin_cloud_regions";
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
      description: "Delete the Origin Cloud Regions",
      arguments: z.object({
        id: z.string().describe("The ID of the Origin Cloud Regions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/cache/origin_cloud_regions";
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
      description: "Sync Origin Cloud Regions state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/cache/origin_cloud_regions";
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
