// Auto-generated extension model for @swamp/cloudflare/magic/gre-tunnels
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Gre Tunnels.
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
  automatic_return_routing: z.boolean().describe(
    "True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.",
  ).optional(),
  cloudflare_gre_endpoint: z.string().describe(
    "The IP address assigned to the Cloudflare side of the GRE tunnel.",
  ),
  customer_gre_endpoint: z.string().describe(
    "The IP address assigned to the customer side of the GRE tunnel.",
  ),
  description: z.string().describe("An optional description of the GRE tunnel.")
    .optional(),
  health_check: z.object({
    enabled: z.boolean().optional(),
    rate: z.enum(["low", "mid", "high"]).optional(),
    target: z.object({
      effective: z.string().optional(),
      saved: z.string().optional(),
    }).optional(),
    type: z.enum(["reply", "request"]).optional(),
    direction: z.enum(["unidirectional", "bidirectional"]).optional(),
  }).optional(),
  interface_address: z.string().describe(
    "A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.",
  ),
  interface_address6: z.string().describe(
    "A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127",
  ).optional(),
  mtu: z.number().int().describe(
    "Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.",
  ).optional(),
  name: z.string().describe(
    "The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.",
  ),
  ttl: z.number().int().describe(
    "Time To Live (TTL) in number of hops of the GRE tunnel.",
  ).optional(),
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()).optional(),
    md5_key: z.string().optional(),
  }).optional(),
});

const ResourceSchema = z.object({
  gre_tunnel: z.object({
    automatic_return_routing: z.boolean().optional(),
    bgp: z.object({
      customer_asn: z.number().optional(),
      extra_prefixes: z.array(z.string()).optional(),
      md5_key: z.string().optional(),
    }).optional(),
    bgp_status: z.object({
      bgp_state: z.string().optional(),
      cf_speaker_ip: z.string().optional(),
      cf_speaker_port: z.number().optional(),
      customer_speaker_ip: z.string().optional(),
      customer_speaker_port: z.number().optional(),
      state: z.string().optional(),
      tcp_established: z.boolean().optional(),
      updated_at: z.string().optional(),
    }).optional(),
    cloudflare_gre_endpoint: z.string().optional(),
    created_on: z.string().optional(),
    customer_gre_endpoint: z.string().optional(),
    description: z.string().optional(),
    health_check: z.object({
      enabled: z.boolean().optional(),
      rate: z.string().optional(),
      target: z.object({
        effective: z.string().optional(),
        saved: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
      direction: z.string().optional(),
    }).optional(),
    id: z.string().optional(),
    interface_address: z.string().optional(),
    interface_address6: z.string().optional(),
    modified_on: z.string().optional(),
    mtu: z.number().optional(),
    name: z.string().optional(),
    ttl: z.number().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  automatic_return_routing: z.boolean().optional(),
  cloudflare_gre_endpoint: z.string().optional(),
  customer_gre_endpoint: z.string().optional(),
  description: z.string().optional(),
  health_check: z.object({
    enabled: z.boolean().optional(),
    rate: z.enum(["low", "mid", "high"]).optional(),
    target: z.object({
      effective: z.string().optional(),
      saved: z.string().optional(),
    }).optional(),
    type: z.enum(["reply", "request"]).optional(),
    direction: z.enum(["unidirectional", "bidirectional"]).optional(),
  }).optional(),
  interface_address: z.string().optional(),
  interface_address6: z.string().optional(),
  mtu: z.number().int().optional(),
  name: z.string().optional(),
  ttl: z.number().int().optional(),
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()).optional(),
    md5_key: z.string().optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Gre Tunnels. Registered at `@swamp/cloudflare/magic/gre-tunnels`. */
export const model = {
  type: "@swamp/cloudflare/magic/gre-tunnels",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gre Tunnels resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Gre Tunnels",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/gre_tunnels";
        const body: Record<string, unknown> = {};
        if (g.automatic_return_routing !== undefined) {
          body.automatic_return_routing = g.automatic_return_routing;
        }
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.cloudflare_gre_endpoint !== undefined) {
          body.cloudflare_gre_endpoint = g.cloudflare_gre_endpoint;
        }
        if (g.customer_gre_endpoint !== undefined) {
          body.customer_gre_endpoint = g.customer_gre_endpoint;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.interface_address !== undefined) {
          body.interface_address = g.interface_address;
        }
        if (g.interface_address6 !== undefined) {
          body.interface_address6 = g.interface_address6;
        }
        if (g.mtu !== undefined) body.mtu = g.mtu;
        if (g.name !== undefined) body.name = g.name;
        if (g.ttl !== undefined) body.ttl = g.ttl;
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
      description: "Get a Gre Tunnels",
      arguments: z.object({
        id: z.string().describe("The ID of the Gre Tunnels"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/gre_tunnels";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id).replace(
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
      description: "Update Gre Tunnels attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/gre_tunnels";
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
        if (g.automatic_return_routing !== undefined) {
          body.automatic_return_routing = g.automatic_return_routing;
        }
        if (g.cloudflare_gre_endpoint !== undefined) {
          body.cloudflare_gre_endpoint = g.cloudflare_gre_endpoint;
        }
        if (g.customer_gre_endpoint !== undefined) {
          body.customer_gre_endpoint = g.customer_gre_endpoint;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.interface_address !== undefined) {
          body.interface_address = g.interface_address;
        }
        if (g.interface_address6 !== undefined) {
          body.interface_address6 = g.interface_address6;
        }
        if (g.mtu !== undefined) body.mtu = g.mtu;
        if (g.name !== undefined) body.name = g.name;
        if (g.ttl !== undefined) body.ttl = g.ttl;
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
      description: "Delete the Gre Tunnels",
      arguments: z.object({
        id: z.string().describe("The ID of the Gre Tunnels"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/gre_tunnels";
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
      description: "Sync Gre Tunnels state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/gre_tunnels";
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
