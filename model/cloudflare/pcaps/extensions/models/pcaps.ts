// Auto-generated extension model for @swamp/cloudflare/pcaps/pcaps
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Pcaps.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  filter_v1: z.object({
    destination_address: z.string().optional(),
    destination_port: z.number().optional(),
    protocol: z.number().optional(),
    source_address: z.string().optional(),
    source_port: z.number().optional(),
  }).describe(
    "The packet capture filter. When this field is empty, all packets are captured.",
  ).optional(),
  offset_time: z.string().describe(
    "The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.",
  ).optional(),
  packet_limit: z.number().min(1).max(10000).describe(
    "The limit of packets contained in a packet capture.",
  ).optional(),
  system: z.enum(["magic-transit"]).describe(
    "The system used to collect packet captures.",
  ),
  time_limit: z.number().min(1).max(300).describe(
    "The packet capture duration in seconds.",
  ),
  type: z.enum(["simple", "full"]).describe(
    "The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.",
  ),
  byte_limit: z.number().min(1).max(1000000000).describe(
    "The maximum number of bytes to capture. This field only applies to `full` packet captures.",
  ).optional(),
  colo_name: z.string().describe(
    "The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.",
  ).optional(),
  destination_conf: z.string().describe(
    "The full URI for the bucket. This field only applies to `full` packet captures.",
  ).optional(),
});

const ResourceSchema = z.object({
  errors: z.array(z.object({
    code: z.number().optional(),
    message: z.string().optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    message: z.string().optional(),
  })).optional(),
  result: z.object({
    filter_v1: z.object({
      destination_address: z.string().optional(),
      destination_port: z.number().optional(),
      protocol: z.number().optional(),
      source_address: z.string().optional(),
      source_port: z.number().optional(),
    }).optional(),
    id: z.string().optional(),
    offset_time: z.string().optional(),
    status: z.string().optional(),
    submitted: z.string().optional(),
    system: z.string().optional(),
    time_limit: z.number().optional(),
    type: z.string().optional(),
  }).optional(),
  success: z.boolean().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  filter_v1: z.object({
    destination_address: z.string().optional(),
    destination_port: z.number().optional(),
    protocol: z.number().optional(),
    source_address: z.string().optional(),
    source_port: z.number().optional(),
  }).optional(),
  offset_time: z.string().optional(),
  packet_limit: z.number().min(1).max(10000).optional(),
  system: z.enum(["magic-transit"]).optional(),
  time_limit: z.number().min(1).max(300).optional(),
  type: z.enum(["simple", "full"]).optional(),
  byte_limit: z.number().min(1).max(1000000000).optional(),
  colo_name: z.string().optional(),
  destination_conf: z.string().optional(),
});

/** Swamp extension model for Cloudflare Pcaps. Registered at `@swamp/cloudflare/pcaps/pcaps`. */
export const model = {
  type: "@swamp/cloudflare/pcaps/pcaps",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Pcaps resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pcaps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pcaps";
        const body: Record<string, unknown> = {};
        if (g.filter_v1 !== undefined) body.filter_v1 = g.filter_v1;
        if (g.offset_time !== undefined) body.offset_time = g.offset_time;
        if (g.packet_limit !== undefined) body.packet_limit = g.packet_limit;
        if (g.system !== undefined) body.system = g.system;
        if (g.time_limit !== undefined) body.time_limit = g.time_limit;
        if (g.type !== undefined) body.type = g.type;
        if (g.byte_limit !== undefined) body.byte_limit = g.byte_limit;
        if (g.colo_name !== undefined) body.colo_name = g.colo_name;
        if (g.destination_conf !== undefined) {
          body.destination_conf = g.destination_conf;
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
      description: "Get a Pcaps",
      arguments: z.object({ id: z.string().describe("The ID of the Pcaps") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pcaps";
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
    sync: {
      description: "Sync Pcaps state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pcaps";
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
