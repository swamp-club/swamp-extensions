// Auto-generated extension model for @swamp/digitalocean/partner-network-connect-attachment
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean partner network connect attachment.
 *
 * Wraps the `/v2/partner_network_connect/attachments` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().regex(new RegExp("^[a-zA-Z0-9\\-\\.]+$")).describe(
    "The name of the partner attachment. Must be unique and may only contain alphanumeric characters, dashes, and periods.",
  ),
  vpc_ids: z.array(z.string()).describe("An array of VPCs IDs."),
  bgp: z.object({
    local_router_ip: z.string(),
    peer_router_ip: z.string(),
    peer_router_asn: z.number().int(),
    auth_key: z.string(),
  }).describe("Optional BGP configurations").optional(),
  connection_bandwidth_in_mbps: z.union([
    z.literal(1000),
    z.literal(2000),
    z.literal(5000),
    z.literal(10000),
  ]).describe("Bandwidth (in Mbps) of the connection."),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).describe("The region to create the partner attachment."),
  naas_provider: z.string(),
  parent_uuid: z.string().describe(
    "Optional associated partner attachment UUID",
  ).optional(),
  redundancy_zone: z.enum(["MEGAPORT_BLUE", "MEGAPORT_RED"]).describe(
    "Optional redundancy zone for the partner attachment.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  state: z.string().optional(),
  connection_bandwidth_in_mbps: z.number().optional(),
  region: z.string().optional(),
  naas_provider: z.string().optional(),
  vpc_ids: z.array(z.string()).optional(),
  bgp: z.object({
    local_asn: z.number().optional(),
    peer_asn: z.number().optional(),
    local_router_ip: z.string().optional(),
    peer_router_ip: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  parent_uuid: z.string().optional(),
  children: z.array(z.string()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().regex(new RegExp("^[a-zA-Z0-9\\-\\.]+$")).optional(),
  vpc_ids: z.array(z.string()).optional(),
  bgp: z.object({
    local_router_ip: z.string(),
    peer_router_ip: z.string(),
    peer_router_asn: z.number().int(),
    auth_key: z.string(),
  }).optional(),
  connection_bandwidth_in_mbps: z.union([
    z.literal(1000),
    z.literal(2000),
    z.literal(5000),
    z.literal(10000),
  ]).optional(),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).optional(),
  naas_provider: z.string().optional(),
  parent_uuid: z.string().optional(),
  redundancy_zone: z.enum(["MEGAPORT_BLUE", "MEGAPORT_RED"]).optional(),
});

/** Swamp extension model for DigitalOcean partner network connect attachment. Registered at `@swamp/digitalocean/partner-network-connect-attachment`. */
export const model = {
  type: "@swamp/digitalocean/partner-network-connect-attachment",
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Partner Network Connect Attachment resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a partner network connect attachment",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/partner_network_connect/attachments",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.connection_bandwidth_in_mbps !== undefined) {
          body.connection_bandwidth_in_mbps = g.connection_bandwidth_in_mbps;
        }
        if (g.region !== undefined) body.region = g.region;
        if (g.naas_provider !== undefined) body.naas_provider = g.naas_provider;
        if (g.vpc_ids !== undefined) body.vpc_ids = g.vpc_ids;
        if (g.parent_uuid !== undefined) body.parent_uuid = g.parent_uuid;
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.redundancy_zone !== undefined) {
          body.redundancy_zone = g.redundancy_zone;
        }
        const result = await create(
          "/v2/partner_network_connect/attachments",
          body,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a partner network connect attachment",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the partner network connect attachment",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/partner_network_connect/attachments",
          args.id,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
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
      description: "Update partner network connect attachment attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        if (g.name !== undefined) body.name = g.name;
        if (g.vpc_ids !== undefined) body.vpc_ids = g.vpc_ids;
        if (g.bgp !== undefined) body.bgp = g.bgp;
        const result = await update(
          "/v2/partner_network_connect/attachments",
          existing.paid ?? existing.id,
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
      description: "Delete the partner network connect attachment",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the partner network connect attachment",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/partner_network_connect/attachments",
          args.id,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description:
        "Sync partner network connect attachment state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const result = await tryRead(
          "/v2/partner_network_connect/attachments",
          existing.paid ?? existing.id,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          paid: existing.paid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
