// Auto-generated extension model for @swamp/cloudflare/magic/onramps
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Onramps.
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
  attached_hubs: z.array(z.string()).optional(),
  attached_vpcs: z.array(z.string()).optional(),
  description: z.string().optional(),
  install_routes_in_cloud: z.boolean(),
  install_routes_in_magic_wan: z.boolean(),
  manage_hub_to_hub_attachments: z.boolean().optional(),
  manage_vpc_to_hub_attachments: z.boolean().optional(),
  name: z.string(),
  vpc: z.string().optional(),
  adopted_hub_id: z.string().optional(),
  cloud_asn: z.number().int().describe(
    "Sets the cloud-side ASN. If unset or zero, the cloud's default ASN takes effect.",
  ).optional(),
  cloud_type: z.enum(["AWS", "AZURE", "GOOGLE"]),
  dynamic_routing: z.boolean().describe(
    "Enables BGP routing. When enabling this feature, set both install_routes_in_cloud and install_routes_in_magic_wan to false.",
  ),
  hub_provider_id: z.string().optional(),
  region: z.string().optional(),
  type: z.enum(["OnrampTypeSingle", "OnrampTypeHub"]),
});

const ResourceSchema = z.object({
  attached_hubs: z.array(z.string()).optional(),
  attached_vpcs: z.array(z.string()).optional(),
  cloud_asn: z.number().optional(),
  cloud_type: z.string().optional(),
  description: z.string().optional(),
  dynamic_routing: z.boolean().optional(),
  hub: z.string().optional(),
  id: z.string(),
  install_routes_in_cloud: z.boolean().optional(),
  install_routes_in_magic_wan: z.boolean().optional(),
  last_applied_at: z.string().optional(),
  last_exported_at: z.string().optional(),
  last_planned_at: z.string().optional(),
  manage_hub_to_hub_attachments: z.boolean().optional(),
  manage_vpc_to_hub_attachments: z.boolean().optional(),
  name: z.string().optional(),
  planned_monthly_cost_estimate: z.object({
    currency: z.string().optional(),
    current_monthly_cost: z.number().optional(),
    diff: z.number().optional(),
    proposed_monthly_cost: z.number().optional(),
  }).optional(),
  planned_resources: z.array(z.object({
    diff: z.object({
      diff: z.string().optional(),
      left_description: z.string().optional(),
      left_yaml: z.string().optional(),
      right_description: z.string().optional(),
      right_yaml: z.string().optional(),
    }).optional(),
    keys_require_replace: z.array(z.string()).optional(),
    monthly_cost_estimate_diff: z.object({
      currency: z.string().optional(),
      current_monthly_cost: z.number().optional(),
      diff: z.number().optional(),
      proposed_monthly_cost: z.number().optional(),
    }).optional(),
    planned_action: z.string().optional(),
    resource: z.object({
      cloud_type: z.string().optional(),
      detail: z.string().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
      resource_type: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
  })).optional(),
  planned_resources_unavailable: z.boolean().optional(),
  post_apply_monthly_cost_estimate: z.object({
    currency: z.string().optional(),
    monthly_cost: z.number().optional(),
  }).optional(),
  post_apply_resources: z.record(z.string(), z.unknown()).optional(),
  post_apply_resources_unavailable: z.boolean().optional(),
  region: z.string().optional(),
  status: z.object({
    apply_progress: z.object({
      done: z.number().optional(),
      total: z.number().optional(),
    }).optional(),
    lifecycle_errors: z.record(z.string(), z.unknown()).optional(),
    lifecycle_state: z.string().optional(),
    plan_progress: z.object({
      done: z.number().optional(),
      total: z.number().optional(),
    }).optional(),
    routes: z.array(z.string()).optional(),
    tunnels: z.array(z.string()).optional(),
  }).optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
  vpc: z.string().optional(),
  vpcs_by_id: z.record(z.string(), z.unknown()).optional(),
  vpcs_by_id_unavailable: z.array(z.string()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  attached_hubs: z.array(z.string()).optional(),
  attached_vpcs: z.array(z.string()).optional(),
  description: z.string().optional(),
  install_routes_in_cloud: z.boolean().optional(),
  install_routes_in_magic_wan: z.boolean().optional(),
  manage_hub_to_hub_attachments: z.boolean().optional(),
  manage_vpc_to_hub_attachments: z.boolean().optional(),
  name: z.string().optional(),
  vpc: z.string().optional(),
  adopted_hub_id: z.string().optional(),
  cloud_asn: z.number().int().optional(),
  cloud_type: z.enum(["AWS", "AZURE", "GOOGLE"]).optional(),
  dynamic_routing: z.boolean().optional(),
  hub_provider_id: z.string().optional(),
  region: z.string().optional(),
  type: z.enum(["OnrampTypeSingle", "OnrampTypeHub"]).optional(),
});

/** Swamp extension model for Cloudflare Onramps. Registered at `@swamp/cloudflare/magic/onramps`. */
export const model = {
  type: "@swamp/cloudflare/magic/onramps",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Onramps resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Onramps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/onramps";
        const body: Record<string, unknown> = {};
        if (g.adopted_hub_id !== undefined) {
          body.adopted_hub_id = g.adopted_hub_id;
        }
        if (g.attached_hubs !== undefined) body.attached_hubs = g.attached_hubs;
        if (g.attached_vpcs !== undefined) body.attached_vpcs = g.attached_vpcs;
        if (g.cloud_asn !== undefined) body.cloud_asn = g.cloud_asn;
        if (g.cloud_type !== undefined) body.cloud_type = g.cloud_type;
        if (g.description !== undefined) body.description = g.description;
        if (g.dynamic_routing !== undefined) {
          body.dynamic_routing = g.dynamic_routing;
        }
        if (g.hub_provider_id !== undefined) {
          body.hub_provider_id = g.hub_provider_id;
        }
        if (g.install_routes_in_cloud !== undefined) {
          body.install_routes_in_cloud = g.install_routes_in_cloud;
        }
        if (g.install_routes_in_magic_wan !== undefined) {
          body.install_routes_in_magic_wan = g.install_routes_in_magic_wan;
        }
        if (g.manage_hub_to_hub_attachments !== undefined) {
          body.manage_hub_to_hub_attachments = g.manage_hub_to_hub_attachments;
        }
        if (g.manage_vpc_to_hub_attachments !== undefined) {
          body.manage_vpc_to_hub_attachments = g.manage_vpc_to_hub_attachments;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.region !== undefined) body.region = g.region;
        if (g.type !== undefined) body.type = g.type;
        if (g.vpc !== undefined) body.vpc = g.vpc;
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
      description: "Get a Onramps",
      arguments: z.object({ id: z.string().describe("The ID of the Onramps") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/onramps";
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
      description: "Update Onramps attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/onramps";
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
        if (g.attached_hubs !== undefined) body.attached_hubs = g.attached_hubs;
        if (g.attached_vpcs !== undefined) body.attached_vpcs = g.attached_vpcs;
        if (g.description !== undefined) body.description = g.description;
        if (g.install_routes_in_cloud !== undefined) {
          body.install_routes_in_cloud = g.install_routes_in_cloud;
        }
        if (g.install_routes_in_magic_wan !== undefined) {
          body.install_routes_in_magic_wan = g.install_routes_in_magic_wan;
        }
        if (g.manage_hub_to_hub_attachments !== undefined) {
          body.manage_hub_to_hub_attachments = g.manage_hub_to_hub_attachments;
        }
        if (g.manage_vpc_to_hub_attachments !== undefined) {
          body.manage_vpc_to_hub_attachments = g.manage_vpc_to_hub_attachments;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.vpc !== undefined) body.vpc = g.vpc;
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
      description: "Delete the Onramps",
      arguments: z.object({ id: z.string().describe("The ID of the Onramps") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/onramps";
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
      description: "Sync Onramps state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/onramps";
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
