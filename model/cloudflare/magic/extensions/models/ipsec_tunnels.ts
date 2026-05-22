// Auto-generated extension model for @swamp/cloudflare/magic/ipsec-tunnels
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Ipsec Tunnels.
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
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()).optional(),
    md5_key: z.string().optional(),
  }).optional(),
  cloudflare_endpoint: z.string().describe(
    "The IP address assigned to the Cloudflare side of the IPsec tunnel.",
  ),
  custom_remote_identities: z.object({
    fqdn_id: z.string().optional(),
  }).optional(),
  customer_endpoint: z.string().describe(
    "The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.",
  ).optional(),
  description: z.string().describe(
    "An optional description forthe IPsec tunnel.",
  ).optional(),
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
  name: z.string().describe(
    "The name of the IPsec tunnel. The name cannot share a name with other tunnels.",
  ),
  psk: z.string().describe(
    "A randomly generated or provided string for use in the IPsec tunnel.",
  ).optional(),
  replay_protection: z.boolean().describe(
    "If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.",
  ).optional(),
});

const ResourceSchema = z.object({
  ipsec_tunnel: z.object({
    allow_null_cipher: z.boolean().optional(),
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
    cloudflare_endpoint: z.string().optional(),
    created_on: z.string().optional(),
    custom_remote_identities: z.object({
      fqdn_id: z.string().optional(),
    }).optional(),
    customer_endpoint: z.string().optional(),
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
    name: z.string().optional(),
    psk_metadata: z.object({
      last_generated_on: z.string().optional(),
    }).optional(),
    replay_protection: z.boolean().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  automatic_return_routing: z.boolean().optional(),
  bgp: z.object({
    customer_asn: z.number().int().min(0),
    extra_prefixes: z.array(z.string()).optional(),
    md5_key: z.string().optional(),
  }).optional(),
  cloudflare_endpoint: z.string().optional(),
  custom_remote_identities: z.object({
    fqdn_id: z.string().optional(),
  }).optional(),
  customer_endpoint: z.string().optional(),
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
  name: z.string().optional(),
  psk: z.string().optional(),
  replay_protection: z.boolean().optional(),
});

/** Swamp extension model for Cloudflare Ipsec Tunnels. Registered at `@swamp/cloudflare/magic/ipsec-tunnels`. */
export const model = {
  type: "@swamp/cloudflare/magic/ipsec-tunnels",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Ipsec Tunnels resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Ipsec Tunnels",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/ipsec_tunnels";
        const body: Record<string, unknown> = {};
        if (g.automatic_return_routing !== undefined) {
          body.automatic_return_routing = g.automatic_return_routing;
        }
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.cloudflare_endpoint !== undefined) {
          body.cloudflare_endpoint = g.cloudflare_endpoint;
        }
        if (g.custom_remote_identities !== undefined) {
          body.custom_remote_identities = g.custom_remote_identities;
        }
        if (g.customer_endpoint !== undefined) {
          body.customer_endpoint = g.customer_endpoint;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.interface_address !== undefined) {
          body.interface_address = g.interface_address;
        }
        if (g.interface_address6 !== undefined) {
          body.interface_address6 = g.interface_address6;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.psk !== undefined) body.psk = g.psk;
        if (g.replay_protection !== undefined) {
          body.replay_protection = g.replay_protection;
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
      description: "Get a Ipsec Tunnels",
      arguments: z.object({
        id: z.string().describe("The ID of the Ipsec Tunnels"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/ipsec_tunnels";
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
      description: "Update Ipsec Tunnels attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/ipsec_tunnels";
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
        if (g.bgp !== undefined) body.bgp = g.bgp;
        if (g.cloudflare_endpoint !== undefined) {
          body.cloudflare_endpoint = g.cloudflare_endpoint;
        }
        if (g.custom_remote_identities !== undefined) {
          body.custom_remote_identities = g.custom_remote_identities;
        }
        if (g.customer_endpoint !== undefined) {
          body.customer_endpoint = g.customer_endpoint;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.interface_address !== undefined) {
          body.interface_address = g.interface_address;
        }
        if (g.interface_address6 !== undefined) {
          body.interface_address6 = g.interface_address6;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.psk !== undefined) body.psk = g.psk;
        if (g.replay_protection !== undefined) {
          body.replay_protection = g.replay_protection;
        }
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
      description: "Delete the Ipsec Tunnels",
      arguments: z.object({
        id: z.string().describe("The ID of the Ipsec Tunnels"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/ipsec_tunnels";
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
      description: "Sync Ipsec Tunnels state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/ipsec_tunnels";
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
