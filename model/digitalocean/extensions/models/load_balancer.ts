// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/digitalocean/load-balancer
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean load balancer.
 *
 * Wraps the `/v2/load_balancers` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  pollResourceReady,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  droplet_ids: z.array(z.number().int()).describe(
    "An array containing the IDs of the Droplets assigned to the load balancer.",
  ).optional(),
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
  ]).describe(
    "The slug identifier for the region where the resource will initially be  available.",
  ),
  name: z.string().describe(
    "A human-readable name for a load balancer instance.",
  ).optional(),
  project_id: z.string().describe(
    "The ID of the project that the load balancer is associated with. If no ID is provided at creation, the load balancer associates with the user's default project. If an invalid project ID is provided, the load balancer will not be created.",
  ).optional(),
  size_unit: z.number().int().min(1).max(100).describe(
    "How many nodes the load balancer contains. Each additional node increases the load balancer's ability to manage more connections. Load balancers can be scaled up or down, and you can change the number of nodes after creation up to once per hour. This field is currently not available in the AMS2, NYC2, or SFO1 regions. Use the `size` field to scale load balancers that reside in these regions.",
  ).optional(),
  size: z.enum(["lb-small", "lb-medium", "lb-large"]).describe(
    "This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. Each available load balancer size now equates to the load balancer having a set number of nodes.\n* `lb-small` = 1 node\n* `lb-medium` = 3 nodes\n* `lb-large` = 6 nodes\n\nYou can resize load balancers after creation up to once per hour. You cannot resize a load balancer within the first hour of its creation.",
  ).optional(),
  algorithm: z.enum(["round_robin", "least_connections"]).describe(
    "This field has been deprecated. You can no longer specify an algorithm for load balancers.",
  ).optional(),
  forwarding_rules: z.array(z.object({
    entry_protocol: z.enum(["http", "https", "http2", "http3", "tcp", "udp"]),
    entry_port: z.number().int(),
    target_protocol: z.enum(["http", "https", "http2", "tcp", "udp"]),
    target_port: z.number().int(),
    certificate_id: z.string().optional(),
    tls_passthrough: z.boolean().optional(),
  })).describe(
    "An array of objects specifying the forwarding rules for a load balancer.",
  ),
  health_check: z.object({
    protocol: z.enum(["http", "https", "tcp"]).optional(),
    port: z.number().int().optional(),
    path: z.string().optional(),
    check_interval_seconds: z.number().int().optional(),
    response_timeout_seconds: z.number().int().optional(),
    unhealthy_threshold: z.number().int().optional(),
    healthy_threshold: z.number().int().optional(),
  }).describe(
    "An object specifying health check settings for the load balancer.",
  ).optional(),
  sticky_sessions: z.object({
    type: z.enum(["cookies", "none"]).optional(),
    cookie_name: z.string().optional(),
    cookie_ttl_seconds: z.number().int().optional(),
  }).describe(
    "An object specifying sticky sessions settings for the load balancer.",
  ).optional(),
  redirect_http_to_https: z.boolean().describe(
    "A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443.",
  ).optional(),
  enable_proxy_protocol: z.boolean().describe(
    "A boolean value indicating whether PROXY Protocol is in use.",
  ).optional(),
  enable_backend_keepalive: z.boolean().describe(
    "A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets.",
  ).optional(),
  http_idle_timeout_seconds: z.number().int().min(30).max(600).describe(
    "An integer value which configures the idle timeout for HTTP requests to the target droplets.",
  ).optional(),
  vpc_uuid: z.string().describe(
    "A string specifying the UUID of the VPC to which the load balancer is assigned.",
  ).optional(),
  disable_lets_encrypt_dns_records: z.boolean().describe(
    "A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer.",
  ).optional(),
  firewall: z.object({
    deny: z.array(z.string()).optional(),
    allow: z.array(z.string()).optional(),
  }).describe(
    "An object specifying allow and deny rules to control traffic to the load balancer.",
  ).optional(),
  network: z.enum(["EXTERNAL", "INTERNAL"]).describe(
    "A string indicating whether the load balancer should be external or internal. Internal load balancers have no public IPs and are only accessible to resources on the same VPC network. This property cannot be updated after creating the load balancer.",
  ).optional(),
  network_stack: z.enum(["IPV4", "DUALSTACK"]).describe(
    "A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. This property cannot be updated after creating the load balancer.",
  ).optional(),
  type: z.enum(["REGIONAL", "REGIONAL_NETWORK", "GLOBAL"]).describe(
    "A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer.",
  ).optional(),
  domains: z.array(z.object({
    name: z.string().optional(),
    is_managed: z.boolean().optional(),
    certificate_id: z.string().optional(),
  })).describe(
    "An array of objects specifying the domain configurations for a Global load balancer.",
  ).optional(),
  glb_settings: z.object({
    target_protocol: z.enum(["http", "https", "http2"]).optional(),
    target_port: z.number().int().optional(),
    cdn: z.object({
      is_enabled: z.boolean().optional(),
    }).optional(),
    region_priorities: z.record(z.string(), z.unknown()).optional(),
    failover_threshold: z.number().int().optional(),
  }).describe(
    "An object specifying forwarding configurations for a Global load balancer.",
  ).optional(),
  target_load_balancer_ids: z.array(z.string()).describe(
    "An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer.",
  ).optional(),
  tls_cipher_policy: z.enum(["DEFAULT", "STRONG"]).describe(
    "A string indicating the policy for the TLS cipher suites used by the load balancer. The possible values are `DEFAULT` or `STRONG`. The default value is `DEFAULT`.",
  ).optional(),
  tag: z.string().describe(
    "The name of a Droplet tag corresponding to Droplets assigned to the load balancer.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  project_id: z.string().optional(),
  ip: z.string().optional(),
  ipv6: z.string().optional(),
  size_unit: z.number().optional(),
  size: z.string().optional(),
  algorithm: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  forwarding_rules: z.array(z.object({
    entry_protocol: z.string().optional(),
    entry_port: z.number().optional(),
    target_protocol: z.string().optional(),
    target_port: z.number().optional(),
    certificate_id: z.string().optional(),
    tls_passthrough: z.boolean().optional(),
  })).optional(),
  health_check: z.object({
    protocol: z.string().optional(),
    port: z.number().optional(),
    path: z.string().optional(),
    check_interval_seconds: z.number().optional(),
    response_timeout_seconds: z.number().optional(),
    unhealthy_threshold: z.number().optional(),
    healthy_threshold: z.number().optional(),
  }).optional(),
  sticky_sessions: z.object({
    type: z.string().optional(),
    cookie_name: z.string().optional(),
    cookie_ttl_seconds: z.number().optional(),
  }).optional(),
  redirect_http_to_https: z.boolean().optional(),
  enable_proxy_protocol: z.boolean().optional(),
  enable_backend_keepalive: z.boolean().optional(),
  http_idle_timeout_seconds: z.number().optional(),
  vpc_uuid: z.string().optional(),
  disable_lets_encrypt_dns_records: z.boolean().optional(),
  firewall: z.object({
    deny: z.array(z.string()).optional(),
    allow: z.array(z.string()).optional(),
  }).optional(),
  network: z.string().optional(),
  network_stack: z.string().optional(),
  type: z.string().optional(),
  domains: z.array(z.object({
    name: z.string().optional(),
    is_managed: z.boolean().optional(),
    certificate_id: z.string().optional(),
  })).optional(),
  glb_settings: z.object({
    target_protocol: z.string().optional(),
    target_port: z.number().optional(),
    cdn: z.object({
      is_enabled: z.boolean().optional(),
    }).optional(),
    region_priorities: z.record(z.string(), z.unknown()).optional(),
    failover_threshold: z.number().optional(),
  }).optional(),
  target_load_balancer_ids: z.array(z.string()).optional(),
  tls_cipher_policy: z.string().optional(),
  region: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    features: z.array(z.string()).optional(),
    available: z.boolean().optional(),
    sizes: z.array(z.string()).optional(),
  }).optional(),
  droplet_ids: z.array(z.number()).optional(),
  tag: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  droplet_ids: z.array(z.number().int()).optional(),
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
  name: z.string().optional(),
  project_id: z.string().optional(),
  size_unit: z.number().int().min(1).max(100).optional(),
  size: z.enum(["lb-small", "lb-medium", "lb-large"]).optional(),
  algorithm: z.enum(["round_robin", "least_connections"]).optional(),
  forwarding_rules: z.array(z.object({
    entry_protocol: z.enum(["http", "https", "http2", "http3", "tcp", "udp"]),
    entry_port: z.number().int(),
    target_protocol: z.enum(["http", "https", "http2", "tcp", "udp"]),
    target_port: z.number().int(),
    certificate_id: z.string().optional(),
    tls_passthrough: z.boolean().optional(),
  })).optional(),
  health_check: z.object({
    protocol: z.enum(["http", "https", "tcp"]).optional(),
    port: z.number().int().optional(),
    path: z.string().optional(),
    check_interval_seconds: z.number().int().optional(),
    response_timeout_seconds: z.number().int().optional(),
    unhealthy_threshold: z.number().int().optional(),
    healthy_threshold: z.number().int().optional(),
  }).optional(),
  sticky_sessions: z.object({
    type: z.enum(["cookies", "none"]).optional(),
    cookie_name: z.string().optional(),
    cookie_ttl_seconds: z.number().int().optional(),
  }).optional(),
  redirect_http_to_https: z.boolean().optional(),
  enable_proxy_protocol: z.boolean().optional(),
  enable_backend_keepalive: z.boolean().optional(),
  http_idle_timeout_seconds: z.number().int().min(30).max(600).optional(),
  vpc_uuid: z.string().optional(),
  disable_lets_encrypt_dns_records: z.boolean().optional(),
  firewall: z.object({
    deny: z.array(z.string()).optional(),
    allow: z.array(z.string()).optional(),
  }).optional(),
  network: z.enum(["EXTERNAL", "INTERNAL"]).optional(),
  network_stack: z.enum(["IPV4", "DUALSTACK"]).optional(),
  type: z.enum(["REGIONAL", "REGIONAL_NETWORK", "GLOBAL"]).optional(),
  domains: z.array(z.object({
    name: z.string().optional(),
    is_managed: z.boolean().optional(),
    certificate_id: z.string().optional(),
  })).optional(),
  glb_settings: z.object({
    target_protocol: z.enum(["http", "https", "http2"]).optional(),
    target_port: z.number().int().optional(),
    cdn: z.object({
      is_enabled: z.boolean().optional(),
    }).optional(),
    region_priorities: z.record(z.string(), z.unknown()).optional(),
    failover_threshold: z.number().int().optional(),
  }).optional(),
  target_load_balancer_ids: z.array(z.string()).optional(),
  tls_cipher_policy: z.enum(["DEFAULT", "STRONG"]).optional(),
  tag: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean load balancer. Registered at `@swamp/digitalocean/load-balancer`. */
export const model = {
  type: "@swamp/digitalocean/load-balancer",
  version: "2026.06.08.1",
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
      toVersion: "2026.03.30.1",
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
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Load Balancer resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a load balancer",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { checkExists?: boolean; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/load_balancers",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.droplet_ids !== undefined) body.droplet_ids = g.droplet_ids;
        if (g.region !== undefined) body.region = g.region;
        if (g.name !== undefined) body.name = g.name;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        if (g.size_unit !== undefined) body.size_unit = g.size_unit;
        if (g.size !== undefined) body.size = g.size;
        if (g.algorithm !== undefined) body.algorithm = g.algorithm;
        if (g.forwarding_rules !== undefined) {
          body.forwarding_rules = g.forwarding_rules;
        }
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.sticky_sessions !== undefined) {
          body.sticky_sessions = g.sticky_sessions;
        }
        if (g.redirect_http_to_https !== undefined) {
          body.redirect_http_to_https = g.redirect_http_to_https;
        }
        if (g.enable_proxy_protocol !== undefined) {
          body.enable_proxy_protocol = g.enable_proxy_protocol;
        }
        if (g.enable_backend_keepalive !== undefined) {
          body.enable_backend_keepalive = g.enable_backend_keepalive;
        }
        if (g.http_idle_timeout_seconds !== undefined) {
          body.http_idle_timeout_seconds = g.http_idle_timeout_seconds;
        }
        if (g.vpc_uuid !== undefined) body.vpc_uuid = g.vpc_uuid;
        if (g.disable_lets_encrypt_dns_records !== undefined) {
          body.disable_lets_encrypt_dns_records =
            g.disable_lets_encrypt_dns_records;
        }
        if (g.firewall !== undefined) body.firewall = g.firewall;
        if (g.network !== undefined) body.network = g.network;
        if (g.network_stack !== undefined) body.network_stack = g.network_stack;
        if (g.type !== undefined) body.type = g.type;
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.glb_settings !== undefined) body.glb_settings = g.glb_settings;
        if (g.target_load_balancer_ids !== undefined) {
          body.target_load_balancer_ids = g.target_load_balancer_ids;
        }
        if (g.tls_cipher_policy !== undefined) {
          body.tls_cipher_policy = g.tls_cipher_policy;
        }
        if (g.tag !== undefined) body.tag = g.tag;
        let result = await create(
          "/v2/load_balancers",
          body,
          undefined,
          g.token,
        ) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.lbid ?? result.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/load_balancers",
              resourceId as string | number,
              {
                "statusField": "status",
                "readyValues": ["active"],
                "failedValues": ["errored"],
              },
              g.token,
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a load balancer",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the load balancer",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/load_balancers",
          args.id,
          undefined,
          context.globalArgs.token,
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
      description: "Update load balancer attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g.droplet_ids !== undefined) body.droplet_ids = g.droplet_ids;
        if (g.region !== undefined) body.region = g.region;
        if (g.name !== undefined) body.name = g.name;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        if (g.size_unit !== undefined) body.size_unit = g.size_unit;
        if (g.size !== undefined) body.size = g.size;
        if (g.algorithm !== undefined) body.algorithm = g.algorithm;
        if (g.forwarding_rules !== undefined) {
          body.forwarding_rules = g.forwarding_rules;
        }
        if (g.health_check !== undefined) body.health_check = g.health_check;
        if (g.sticky_sessions !== undefined) {
          body.sticky_sessions = g.sticky_sessions;
        }
        if (g.redirect_http_to_https !== undefined) {
          body.redirect_http_to_https = g.redirect_http_to_https;
        }
        if (g.enable_proxy_protocol !== undefined) {
          body.enable_proxy_protocol = g.enable_proxy_protocol;
        }
        if (g.enable_backend_keepalive !== undefined) {
          body.enable_backend_keepalive = g.enable_backend_keepalive;
        }
        if (g.http_idle_timeout_seconds !== undefined) {
          body.http_idle_timeout_seconds = g.http_idle_timeout_seconds;
        }
        if (g.vpc_uuid !== undefined) body.vpc_uuid = g.vpc_uuid;
        if (g.disable_lets_encrypt_dns_records !== undefined) {
          body.disable_lets_encrypt_dns_records =
            g.disable_lets_encrypt_dns_records;
        }
        if (g.firewall !== undefined) body.firewall = g.firewall;
        if (g.network !== undefined) body.network = g.network;
        if (g.network_stack !== undefined) body.network_stack = g.network_stack;
        if (g.type !== undefined) body.type = g.type;
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.glb_settings !== undefined) body.glb_settings = g.glb_settings;
        if (g.target_load_balancer_ids !== undefined) {
          body.target_load_balancer_ids = g.target_load_balancer_ids;
        }
        if (g.tls_cipher_policy !== undefined) {
          body.tls_cipher_policy = g.tls_cipher_policy;
        }
        if (g.tag !== undefined) body.tag = g.tag;
        let result = await update(
          "/v2/load_balancers",
          existing.lbid ?? existing.id,
          body,
          "PUT",
          undefined,
          g.token,
        ) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.lbid ?? result.id ?? existing.lbid ??
            existing.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/load_balancers",
              resourceId as string | number,
              {
                "statusField": "status",
                "readyValues": ["active"],
                "failedValues": ["errored"],
              },
              g.token,
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the load balancer",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the load balancer",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/load_balancers",
          args.id,
          undefined,
          context.globalArgs.token,
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
      description: "Sync load balancer state from DigitalOcean",
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
          "/v2/load_balancers",
          existing.lbid ?? existing.id,
          undefined,
          g.token,
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
          lbid: existing.lbid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
