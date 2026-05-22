// Auto-generated extension model for @swamp/cloudflare/load-balancing/pools
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Pools.
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
  check_regions: z.array(
    z.enum([
      "WNAM",
      "ENAM",
      "WEU",
      "EEU",
      "NSAM",
      "SSAM",
      "OC",
      "ME",
      "NAF",
      "SAF",
      "SAS",
      "SEAS",
      "NEAS",
      "ALL_REGIONS",
    ]),
  ).describe(
    "A list of regions from which to run health checks. Null means every Cloudflare data center.",
  ).optional(),
  description: z.string().describe("A human-readable description of the pool.")
    .optional(),
  disabled_at: z.string().describe(
    "This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover to the next pool (if any).",
  ).optional(),
  latitude: z.number().describe(
    "The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.",
  ).optional(),
  load_shedding: z.object({
    default_percent: z.number().min(0).max(100).optional(),
    default_policy: z.enum(["random", "hash"]).optional(),
    session_percent: z.number().min(0).max(100).optional(),
    session_policy: z.enum(["hash"]).optional(),
  }).describe("Configures load shedding policies and percentages for the pool.")
    .optional(),
  longitude: z.number().describe(
    "The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.",
  ).optional(),
  minimum_origins: z.number().int().describe(
    "The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the next available pool.",
  ).optional(),
  monitor: z.string().describe(
    "The ID of the Monitor to use for checking the health of origins within this pool.",
  ).optional(),
  monitor_group: z.string().describe(
    "The ID of the Monitor Group to use for checking the health of origins within this pool.",
  ).optional(),
  name: z.string().describe(
    "A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.",
  ),
  notification_email: z.string().describe(
    "This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.",
  ).optional(),
  notification_filter: z.object({
    origin: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
    pool: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
  }).describe(
    "Filter pool and origin health notifications by resource type or health status. Use null to reset.",
  ).optional(),
  origin_steering: z.object({
    policy: z.enum([
      "random",
      "hash",
      "least_outstanding_requests",
      "least_connections",
    ]).optional(),
  }).describe(
    "Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.",
  ).optional(),
  origins: z.array(z.object({
    address: z.string().optional(),
    disabled_at: z.string().optional(),
    enabled: z.boolean().optional(),
    flatten_cname: z.boolean().optional(),
    header: z.object({
      Host: z.array(z.string()).optional(),
    }).optional(),
    name: z.string().optional(),
    port: z.number().int().optional(),
    virtual_network_id: z.string().optional(),
    weight: z.number().min(0).max(1).optional(),
  })).describe(
    "The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.",
  ),
});

const ResourceSchema = z.object({
  check_regions: z.array(z.string()).optional(),
  created_on: z.string().optional(),
  description: z.string().optional(),
  disabled_at: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  latitude: z.number().optional(),
  load_shedding: z.object({
    default_percent: z.number().optional(),
    default_policy: z.string().optional(),
    session_percent: z.number().optional(),
    session_policy: z.string().optional(),
  }).optional(),
  longitude: z.number().optional(),
  minimum_origins: z.number().optional(),
  modified_on: z.string().optional(),
  monitor: z.string().optional(),
  monitor_group: z.string().optional(),
  name: z.string().optional(),
  networks: z.array(z.string()).optional(),
  notification_email: z.string().optional(),
  notification_filter: z.object({
    origin: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
    pool: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
  }).optional(),
  origin_steering: z.object({
    policy: z.string().optional(),
  }).optional(),
  origins: z.array(z.object({
    address: z.string().optional(),
    disabled_at: z.string().optional(),
    enabled: z.boolean().optional(),
    flatten_cname: z.boolean().optional(),
    header: z.object({
      Host: z.array(z.string()).optional(),
    }).optional(),
    name: z.string().optional(),
    port: z.number().optional(),
    virtual_network_id: z.string().optional(),
    weight: z.number().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  check_regions: z.array(
    z.enum([
      "WNAM",
      "ENAM",
      "WEU",
      "EEU",
      "NSAM",
      "SSAM",
      "OC",
      "ME",
      "NAF",
      "SAF",
      "SAS",
      "SEAS",
      "NEAS",
      "ALL_REGIONS",
    ]),
  ).optional(),
  description: z.string().optional(),
  disabled_at: z.string().optional(),
  enabled: z.boolean().optional(),
  latitude: z.number().optional(),
  load_shedding: z.object({
    default_percent: z.number().min(0).max(100).optional(),
    default_policy: z.enum(["random", "hash"]).optional(),
    session_percent: z.number().min(0).max(100).optional(),
    session_policy: z.enum(["hash"]).optional(),
  }).optional(),
  longitude: z.number().optional(),
  minimum_origins: z.number().int().optional(),
  monitor: z.string().optional(),
  monitor_group: z.string().optional(),
  name: z.string().optional(),
  notification_email: z.string().optional(),
  notification_filter: z.object({
    origin: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
    pool: z.object({
      disable: z.boolean().optional(),
      healthy: z.boolean().optional(),
    }).optional(),
  }).optional(),
  origin_steering: z.object({
    policy: z.enum([
      "random",
      "hash",
      "least_outstanding_requests",
      "least_connections",
    ]).optional(),
  }).optional(),
  origins: z.array(z.object({
    address: z.string().optional(),
    disabled_at: z.string().optional(),
    enabled: z.boolean().optional(),
    flatten_cname: z.boolean().optional(),
    header: z.object({
      Host: z.array(z.string()).optional(),
    }).optional(),
    name: z.string().optional(),
    port: z.number().int().optional(),
    virtual_network_id: z.string().optional(),
    weight: z.number().min(0).max(1).optional(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Pools. Registered at `@swamp/cloudflare/load-balancing/pools`. */
export const model = {
  type: "@swamp/cloudflare/load-balancing/pools",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Pools resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pools",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/load_balancers/pools";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.latitude !== undefined) body.latitude = g.latitude;
        if (g.load_shedding !== undefined) body.load_shedding = g.load_shedding;
        if (g.longitude !== undefined) body.longitude = g.longitude;
        if (g.minimum_origins !== undefined) {
          body.minimum_origins = g.minimum_origins;
        }
        if (g.monitor !== undefined) body.monitor = g.monitor;
        if (g.monitor_group !== undefined) body.monitor_group = g.monitor_group;
        if (g.name !== undefined) body.name = g.name;
        if (g.notification_email !== undefined) {
          body.notification_email = g.notification_email;
        }
        if (g.notification_filter !== undefined) {
          body.notification_filter = g.notification_filter;
        }
        if (g.origin_steering !== undefined) {
          body.origin_steering = g.origin_steering;
        }
        if (g.origins !== undefined) body.origins = g.origins;
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
      description: "Get a Pools",
      arguments: z.object({ id: z.string().describe("The ID of the Pools") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/load_balancers/pools";
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
      description: "Update Pools attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/load_balancers/pools";
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
        if (g.check_regions !== undefined) body.check_regions = g.check_regions;
        if (g.description !== undefined) body.description = g.description;
        if (g.disabled_at !== undefined) body.disabled_at = g.disabled_at;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.latitude !== undefined) body.latitude = g.latitude;
        if (g.load_shedding !== undefined) body.load_shedding = g.load_shedding;
        if (g.longitude !== undefined) body.longitude = g.longitude;
        if (g.minimum_origins !== undefined) {
          body.minimum_origins = g.minimum_origins;
        }
        if (g.monitor !== undefined) body.monitor = g.monitor;
        if (g.monitor_group !== undefined) body.monitor_group = g.monitor_group;
        if (g.name !== undefined) body.name = g.name;
        if (g.notification_email !== undefined) {
          body.notification_email = g.notification_email;
        }
        if (g.notification_filter !== undefined) {
          body.notification_filter = g.notification_filter;
        }
        if (g.origin_steering !== undefined) {
          body.origin_steering = g.origin_steering;
        }
        if (g.origins !== undefined) body.origins = g.origins;
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
      description: "Delete the Pools",
      arguments: z.object({ id: z.string().describe("The ID of the Pools") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/load_balancers/pools";
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
      description: "Sync Pools state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/load_balancers/pools";
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
