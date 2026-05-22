// Auto-generated extension model for @swamp/cloudflare/gateway/locations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Locations.
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
  client_default: z.boolean().describe(
    "Indicate whether this location is the default location.",
  ).optional(),
  dns_destination_ips_id: z.string().describe(
    "Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.",
  ).optional(),
  ecs_support: z.boolean().describe(
    "Indicate whether the location must resolve EDNS queries.",
  ).optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
      require_token: z.boolean().optional(),
    }),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
  }).describe("Configure the destination endpoints for this location.")
    .optional(),
  name: z.string().describe("Specify the location name."),
  networks: z.array(z.object({
    network: z.string(),
  })).describe(
    "Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.",
  ).optional(),
});

const ResourceSchema = z.object({
  client_default: z.boolean().optional(),
  created_at: z.string().optional(),
  dns_destination_ips_id: z.string().optional(),
  dns_destination_ipv6_block_id: z.string().optional(),
  doh_subdomain: z.string().optional(),
  ecs_support: z.boolean().optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
      require_token: z.boolean().optional(),
    }).optional(),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
    }).optional(),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  id: z.string(),
  ip: z.string().optional(),
  ipv4_destination: z.string().optional(),
  ipv4_destination_backup: z.string().optional(),
  name: z.string().optional(),
  networks: z.array(z.object({
    network: z.string().optional(),
  })).optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  client_default: z.boolean().optional(),
  dns_destination_ips_id: z.string().optional(),
  ecs_support: z.boolean().optional(),
  endpoints: z.object({
    doh: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
      require_token: z.boolean().optional(),
    }),
    dot: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
    ipv4: z.object({
      enabled: z.boolean().optional(),
    }),
    ipv6: z.object({
      enabled: z.boolean().optional(),
      networks: z.array(z.object({
        network: z.string(),
      })).optional(),
    }),
  }).optional(),
  name: z.string().optional(),
  networks: z.array(z.object({
    network: z.string(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Locations. Registered at `@swamp/cloudflare/gateway/locations`. */
export const model = {
  type: "@swamp/cloudflare/gateway/locations",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Locations resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Locations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
        const body: Record<string, unknown> = {};
        if (g.client_default !== undefined) {
          body.client_default = g.client_default;
        }
        if (g.dns_destination_ips_id !== undefined) {
          body.dns_destination_ips_id = g.dns_destination_ips_id;
        }
        if (g.ecs_support !== undefined) body.ecs_support = g.ecs_support;
        if (g.endpoints !== undefined) body.endpoints = g.endpoints;
        if (g.name !== undefined) body.name = g.name;
        if (g.networks !== undefined) body.networks = g.networks;
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
      description: "Get a Locations",
      arguments: z.object({
        id: z.string().describe("The ID of the Locations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
      description: "Update Locations attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
        if (g.client_default !== undefined) {
          body.client_default = g.client_default;
        }
        if (g.dns_destination_ips_id !== undefined) {
          body.dns_destination_ips_id = g.dns_destination_ips_id;
        }
        if (g.ecs_support !== undefined) body.ecs_support = g.ecs_support;
        if (g.endpoints !== undefined) body.endpoints = g.endpoints;
        if (g.name !== undefined) body.name = g.name;
        if (g.networks !== undefined) body.networks = g.networks;
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
      description: "Delete the Locations",
      arguments: z.object({
        id: z.string().describe("The ID of the Locations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
      description: "Sync Locations state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/locations";
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
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
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
