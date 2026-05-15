// Auto-generated extension model for @swamp/digitalocean/vpc-nat-gateway
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean vpc nat gateway.
 *
 * Wraps the `/v2/vpc_nat_gateways` API as a swamp model so create, get, update,
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
  name: z.string().describe("The human-readable name of the VPC NAT gateway."),
  size: z.number().int().describe("The size of the VPC NAT gateway."),
  vpcs: z.array(z.object({
    vpc_uuid: z.string(),
    default_gateway: z.boolean().optional(),
  })).describe("An array of VPCs associated with the VPC NAT gateway."),
  udp_timeout_seconds: z.number().int().describe(
    "The UDP timeout in seconds for the VPC NAT gateway.",
  ).optional(),
  icmp_timeout_seconds: z.number().int().describe(
    "The ICMP timeout in seconds for the VPC NAT gateway.",
  ).optional(),
  tcp_timeout_seconds: z.number().int().describe(
    "The TCP timeout in seconds for the VPC NAT gateway.",
  ).optional(),
  type: z.enum(["PUBLIC"]).describe("The type of the VPC NAT gateway."),
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
  ]).describe("The region in which the VPC NAT gateway is created."),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  state: z.string().optional(),
  region: z.string().optional(),
  size: z.number().optional(),
  vpcs: z.array(z.object({
    vpc_uuid: z.string().optional(),
    gateway_ip: z.string().optional(),
  })).optional(),
  egresses: z.object({
    public_gateways: z.array(z.object({
      ipv4: z.string().optional(),
    })).optional(),
  }).optional(),
  udp_timeout_seconds: z.number().optional(),
  icmp_timeout_seconds: z.number().optional(),
  tcp_timeout_seconds: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  size: z.number().int().optional(),
  vpcs: z.array(z.object({
    vpc_uuid: z.string(),
    default_gateway: z.boolean().optional(),
  })).optional(),
  udp_timeout_seconds: z.number().int().optional(),
  icmp_timeout_seconds: z.number().int().optional(),
  tcp_timeout_seconds: z.number().int().optional(),
  type: z.enum(["PUBLIC"]).optional(),
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
});

/** Swamp extension model for DigitalOcean vpc nat gateway. Registered at `@swamp/digitalocean/vpc-nat-gateway`. */
export const model = {
  type: "@swamp/digitalocean/vpc-nat-gateway",
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
      description: "VPC Nat Gateway resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vpc nat gateway",
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
            "/v2/vpc_nat_gateways",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.region !== undefined) body.region = g.region;
        if (g.size !== undefined) body.size = g.size;
        if (g.vpcs !== undefined) body.vpcs = g.vpcs;
        if (g.udp_timeout_seconds !== undefined) {
          body.udp_timeout_seconds = g.udp_timeout_seconds;
        }
        if (g.icmp_timeout_seconds !== undefined) {
          body.icmp_timeout_seconds = g.icmp_timeout_seconds;
        }
        if (g.tcp_timeout_seconds !== undefined) {
          body.tcp_timeout_seconds = g.tcp_timeout_seconds;
        }
        const result = await create(
          "/v2/vpc_nat_gateways",
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
      description: "Get a vpc nat gateway",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the vpc nat gateway",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/vpc_nat_gateways",
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
      description: "Update vpc nat gateway attributes",
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
        if (g.size !== undefined) body.size = g.size;
        if (g.vpcs !== undefined) body.vpcs = g.vpcs;
        if (g.udp_timeout_seconds !== undefined) {
          body.udp_timeout_seconds = g.udp_timeout_seconds;
        }
        if (g.icmp_timeout_seconds !== undefined) {
          body.icmp_timeout_seconds = g.icmp_timeout_seconds;
        }
        if (g.tcp_timeout_seconds !== undefined) {
          body.tcp_timeout_seconds = g.tcp_timeout_seconds;
        }
        const result = await update(
          "/v2/vpc_nat_gateways",
          existing.id ?? existing.id,
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
      description: "Delete the vpc nat gateway",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the vpc nat gateway",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/vpc_nat_gateways", args.id);
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
      description: "Sync vpc nat gateway state from DigitalOcean",
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
          "/v2/vpc_nat_gateways",
          existing.id ?? existing.id,
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
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
