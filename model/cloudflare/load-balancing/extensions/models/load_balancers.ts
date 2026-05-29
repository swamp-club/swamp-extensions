// Auto-generated extension model for @swamp/cloudflare/load-balancing/load-balancers
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Load Balancers.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  zone_id: z.string().describe("Cloudflare zone ID"),
  adaptive_routing: z.object({
    failover_across_pools: z.boolean().optional(),
  }).describe(
    "Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.",
  ).optional(),
  country_pools: z.record(z.string(), z.unknown()).describe(
    "A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.",
  ).optional(),
  default_pools: z.array(z.string()).describe(
    "A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.",
  ),
  description: z.string().describe("Object description.").optional(),
  enabled: z.boolean().describe(
    "Whether to enable (the default) this load balancer.",
  ).optional(),
  fallback_pool: z.string().describe(
    "The pool ID to use when all other pools are detected as unhealthy.",
  ),
  location_strategy: z.object({
    mode: z.enum(["pop", "resolver_ip"]).optional(),
    prefer_ecs: z.enum(["always", "never", "proximity", "geo"]).optional(),
  }).describe(
    "Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.",
  ).optional(),
  name: z.string().describe(
    "The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.",
  ),
  pop_pools: z.record(z.string(), z.unknown()).describe(
    "Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.",
  ).optional(),
  proxied: z.boolean().describe(
    "Whether the hostname should be gray clouded (false) or orange clouded (true).",
  ).optional(),
  random_steering: z.object({
    default_weight: z.number().min(0).max(1).optional(),
    pool_weights: z.record(z.string(), z.unknown()).optional(),
  }).describe(
    'Configures pool weights.\n- `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.\n- `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool\'s outstanding requests.\n- `steering_policy="least_connections"`: Use pool weights to scale each pool\'s open connections.',
  ).optional(),
  region_pools: z.record(z.string(), z.unknown()).describe(
    "A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.",
  ).optional(),
  rules: z.array(z.object({
    condition: z.string().optional(),
    disabled: z.boolean().optional(),
    fixed_response: z.object({
      content_type: z.string().max(32).optional(),
      location: z.string().max(2048).optional(),
      message_body: z.string().max(1024).optional(),
      status_code: z.number().int().optional(),
    }).optional(),
    name: z.string().max(200).optional(),
    overrides: z.object({
      adaptive_routing: z.object({
        failover_across_pools: z.boolean().optional(),
      }).optional(),
      country_pools: z.record(z.string(), z.unknown()).optional(),
      default_pools: z.array(z.string()).optional(),
      fallback_pool: z.string().optional(),
      location_strategy: z.object({
        mode: z.enum(["pop", "resolver_ip"]).optional(),
        prefer_ecs: z.enum(["always", "never", "proximity", "geo"]).optional(),
      }).optional(),
      pop_pools: z.record(z.string(), z.unknown()).optional(),
      random_steering: z.object({
        default_weight: z.number().min(0).max(1).optional(),
        pool_weights: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      region_pools: z.record(z.string(), z.unknown()).optional(),
      session_affinity: z.enum(["none", "cookie", "ip_cookie", "header"])
        .optional(),
      session_affinity_attributes: z.object({
        drain_duration: z.number().optional(),
        headers: z.array(
          z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
        ).optional(),
        require_all_headers: z.boolean().optional(),
        samesite: z.enum(["Auto", "Lax", "None", "Strict"]).optional(),
        secure: z.enum(["Auto", "Always", "Never"]).optional(),
        zero_downtime_failover: z.enum(["none", "temporary", "sticky"])
          .optional(),
      }).optional(),
      session_affinity_ttl: z.number().optional(),
      steering_policy: z.enum([
        "off",
        "geo",
        "random",
        "dynamic_latency",
        "proximity",
        "least_outstanding_requests",
        "least_connections",
        "",
      ]).optional(),
      ttl: z.number().optional(),
    }).optional(),
    priority: z.number().int().min(0).optional(),
    terminates: z.boolean().optional(),
  })).describe(
    "BETA Field Not General Access: A list of rules for this load balancer to execute.",
  ).optional(),
  session_affinity: z.enum(["none", "cookie", "ip_cookie", "header"]).describe(
    'Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client\'s ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.',
  ).optional(),
  session_affinity_attributes: z.object({
    drain_duration: z.number().optional(),
    headers: z.array(
      z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
    ).optional(),
    require_all_headers: z.boolean().optional(),
    samesite: z.enum(["Auto", "Lax", "None", "Strict"]).optional(),
    secure: z.enum(["Auto", "Always", "Never"]).optional(),
    zero_downtime_failover: z.enum(["none", "temporary", "sticky"]).optional(),
  }).describe("Configures attributes for session affinity.").optional(),
  session_affinity_ttl: z.number().describe(
    'Time, in seconds, until a client\'s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven\'t been used for the number of seconds specified.',
  ).optional(),
  steering_policy: z.enum([
    "off",
    "geo",
    "random",
    "dynamic_latency",
    "proximity",
    "least_outstanding_requests",
    "least_connections",
    "",
  ]).describe(
    'Steering Policy for this load balancer.\n- `"off"`: Use `default_pools`.\n- `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.\n- `"random"`: Select a pool randomly.\n- `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).\n- `"proximity"`: Use the pools\' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.\n- `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool\'s number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.\n- `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool\'s number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.\n- `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.',
  ).optional(),
  ttl: z.number().describe(
    "Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.",
  ).optional(),
  networks: z.array(z.string()).describe(
    "List of networks where Load Balancer or Pool is enabled.",
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  adaptive_routing: z.object({
    failover_across_pools: z.boolean().optional(),
  }).optional(),
  country_pools: z.record(z.string(), z.unknown()).optional(),
  created_on: z.string().optional(),
  default_pools: z.array(z.string()).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  fallback_pool: z.string().optional(),
  id: z.string(),
  location_strategy: z.object({
    mode: z.string().optional(),
    prefer_ecs: z.string().optional(),
  }).optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  networks: z.array(z.string()).optional(),
  pop_pools: z.record(z.string(), z.unknown()).optional(),
  proxied: z.boolean().optional(),
  random_steering: z.object({
    default_weight: z.number().optional(),
    pool_weights: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
  region_pools: z.record(z.string(), z.unknown()).optional(),
  rules: z.array(z.object({
    condition: z.string().optional(),
    disabled: z.boolean().optional(),
    fixed_response: z.object({
      content_type: z.string().optional(),
      location: z.string().optional(),
      message_body: z.string().optional(),
      status_code: z.number().optional(),
    }).optional(),
    name: z.string().optional(),
    overrides: z.object({
      adaptive_routing: z.object({
        failover_across_pools: z.boolean().optional(),
      }).optional(),
      country_pools: z.record(z.string(), z.unknown()).optional(),
      default_pools: z.array(z.string()).optional(),
      fallback_pool: z.string().optional(),
      location_strategy: z.object({
        mode: z.string().optional(),
        prefer_ecs: z.string().optional(),
      }).optional(),
      pop_pools: z.record(z.string(), z.unknown()).optional(),
      random_steering: z.object({
        default_weight: z.number().optional(),
        pool_weights: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      region_pools: z.record(z.string(), z.unknown()).optional(),
      session_affinity: z.string().optional(),
      session_affinity_attributes: z.object({
        drain_duration: z.number().optional(),
        headers: z.array(z.string()).optional(),
        require_all_headers: z.boolean().optional(),
        samesite: z.string().optional(),
        secure: z.string().optional(),
        zero_downtime_failover: z.string().optional(),
      }).optional(),
      session_affinity_ttl: z.number().optional(),
      steering_policy: z.string().optional(),
      ttl: z.number().optional(),
    }).optional(),
    priority: z.number().optional(),
    terminates: z.boolean().optional(),
  })).optional(),
  session_affinity: z.string().optional(),
  session_affinity_attributes: z.object({
    drain_duration: z.number().optional(),
    headers: z.array(z.string()).optional(),
    require_all_headers: z.boolean().optional(),
    samesite: z.string().optional(),
    secure: z.string().optional(),
    zero_downtime_failover: z.string().optional(),
  }).optional(),
  session_affinity_ttl: z.number().optional(),
  steering_policy: z.string().optional(),
  ttl: z.number().optional(),
  zone_name: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  adaptive_routing: z.object({
    failover_across_pools: z.boolean().optional(),
  }).optional(),
  country_pools: z.record(z.string(), z.unknown()).optional(),
  default_pools: z.array(z.string()).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  fallback_pool: z.string().optional(),
  location_strategy: z.object({
    mode: z.enum(["pop", "resolver_ip"]).optional(),
    prefer_ecs: z.enum(["always", "never", "proximity", "geo"]).optional(),
  }).optional(),
  name: z.string().optional(),
  pop_pools: z.record(z.string(), z.unknown()).optional(),
  proxied: z.boolean().optional(),
  random_steering: z.object({
    default_weight: z.number().min(0).max(1).optional(),
    pool_weights: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
  region_pools: z.record(z.string(), z.unknown()).optional(),
  rules: z.array(z.object({
    condition: z.string().optional(),
    disabled: z.boolean().optional(),
    fixed_response: z.object({
      content_type: z.string().max(32).optional(),
      location: z.string().max(2048).optional(),
      message_body: z.string().max(1024).optional(),
      status_code: z.number().int().optional(),
    }).optional(),
    name: z.string().max(200).optional(),
    overrides: z.object({
      adaptive_routing: z.object({
        failover_across_pools: z.boolean().optional(),
      }).optional(),
      country_pools: z.record(z.string(), z.unknown()).optional(),
      default_pools: z.array(z.string()).optional(),
      fallback_pool: z.string().optional(),
      location_strategy: z.object({
        mode: z.enum(["pop", "resolver_ip"]).optional(),
        prefer_ecs: z.enum(["always", "never", "proximity", "geo"]).optional(),
      }).optional(),
      pop_pools: z.record(z.string(), z.unknown()).optional(),
      random_steering: z.object({
        default_weight: z.number().min(0).max(1).optional(),
        pool_weights: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      region_pools: z.record(z.string(), z.unknown()).optional(),
      session_affinity: z.enum(["none", "cookie", "ip_cookie", "header"])
        .optional(),
      session_affinity_attributes: z.object({
        drain_duration: z.number().optional(),
        headers: z.array(
          z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
        ).optional(),
        require_all_headers: z.boolean().optional(),
        samesite: z.enum(["Auto", "Lax", "None", "Strict"]).optional(),
        secure: z.enum(["Auto", "Always", "Never"]).optional(),
        zero_downtime_failover: z.enum(["none", "temporary", "sticky"])
          .optional(),
      }).optional(),
      session_affinity_ttl: z.number().optional(),
      steering_policy: z.enum([
        "off",
        "geo",
        "random",
        "dynamic_latency",
        "proximity",
        "least_outstanding_requests",
        "least_connections",
        "",
      ]).optional(),
      ttl: z.number().optional(),
    }).optional(),
    priority: z.number().int().min(0).optional(),
    terminates: z.boolean().optional(),
  })).optional(),
  session_affinity: z.enum(["none", "cookie", "ip_cookie", "header"])
    .optional(),
  session_affinity_attributes: z.object({
    drain_duration: z.number().optional(),
    headers: z.array(
      z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
    ).optional(),
    require_all_headers: z.boolean().optional(),
    samesite: z.enum(["Auto", "Lax", "None", "Strict"]).optional(),
    secure: z.enum(["Auto", "Always", "Never"]).optional(),
    zero_downtime_failover: z.enum(["none", "temporary", "sticky"]).optional(),
  }).optional(),
  session_affinity_ttl: z.number().optional(),
  steering_policy: z.enum([
    "off",
    "geo",
    "random",
    "dynamic_latency",
    "proximity",
    "least_outstanding_requests",
    "least_connections",
    "",
  ]).optional(),
  ttl: z.number().optional(),
  networks: z.array(z.string()).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Load Balancers. Registered at `@swamp/cloudflare/load-balancing/load-balancers`. */
export const model = {
  type: "@swamp/cloudflare/load-balancing/load-balancers",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Load Balancers resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Load Balancers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/load_balancers";
        const body: Record<string, unknown> = {};
        if (g.adaptive_routing !== undefined) {
          body.adaptive_routing = g.adaptive_routing;
        }
        if (g.country_pools !== undefined) body.country_pools = g.country_pools;
        if (g.default_pools !== undefined) body.default_pools = g.default_pools;
        if (g.description !== undefined) body.description = g.description;
        if (g.fallback_pool !== undefined) body.fallback_pool = g.fallback_pool;
        if (g.location_strategy !== undefined) {
          body.location_strategy = g.location_strategy;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.networks !== undefined) body.networks = g.networks;
        if (g.pop_pools !== undefined) body.pop_pools = g.pop_pools;
        if (g.proxied !== undefined) body.proxied = g.proxied;
        if (g.random_steering !== undefined) {
          body.random_steering = g.random_steering;
        }
        if (g.region_pools !== undefined) body.region_pools = g.region_pools;
        if (g.rules !== undefined) body.rules = g.rules;
        if (g.session_affinity !== undefined) {
          body.session_affinity = g.session_affinity;
        }
        if (g.session_affinity_attributes !== undefined) {
          body.session_affinity_attributes = g.session_affinity_attributes;
        }
        if (g.session_affinity_ttl !== undefined) {
          body.session_affinity_ttl = g.session_affinity_ttl;
        }
        if (g.steering_policy !== undefined) {
          body.steering_policy = g.steering_policy;
        }
        if (g.ttl !== undefined) body.ttl = g.ttl;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Load Balancers",
      arguments: z.object({
        id: z.string().describe("The ID of the Load Balancers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/load_balancers";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Update Load Balancers attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/load_balancers";
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
        if (g.adaptive_routing !== undefined) {
          body.adaptive_routing = g.adaptive_routing;
        }
        if (g.country_pools !== undefined) body.country_pools = g.country_pools;
        if (g.default_pools !== undefined) body.default_pools = g.default_pools;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.fallback_pool !== undefined) body.fallback_pool = g.fallback_pool;
        if (g.location_strategy !== undefined) {
          body.location_strategy = g.location_strategy;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.pop_pools !== undefined) body.pop_pools = g.pop_pools;
        if (g.proxied !== undefined) body.proxied = g.proxied;
        if (g.random_steering !== undefined) {
          body.random_steering = g.random_steering;
        }
        if (g.region_pools !== undefined) body.region_pools = g.region_pools;
        if (g.rules !== undefined) body.rules = g.rules;
        if (g.session_affinity !== undefined) {
          body.session_affinity = g.session_affinity;
        }
        if (g.session_affinity_attributes !== undefined) {
          body.session_affinity_attributes = g.session_affinity_attributes;
        }
        if (g.session_affinity_ttl !== undefined) {
          body.session_affinity_ttl = g.session_affinity_ttl;
        }
        if (g.steering_policy !== undefined) {
          body.steering_policy = g.steering_policy;
        }
        if (g.ttl !== undefined) body.ttl = g.ttl;
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Load Balancers",
      arguments: z.object({
        id: z.string().describe("The ID of the Load Balancers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/load_balancers";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Load Balancers state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/load_balancers";
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
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
