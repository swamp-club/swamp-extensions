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

// Auto-generated extension model for @swamp/cloudflare/devices/policy
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policy.
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
  allow_mode_switch: z.boolean().describe(
    "Whether to allow the user to switch WARP between modes.",
  ).optional(),
  allow_updates: z.boolean().describe(
    "Whether to receive update notifications when a new version of the client is available.",
  ).optional(),
  allowed_to_leave: z.boolean().describe(
    "Whether to allow devices to leave the organization.",
  ).optional(),
  auto_connect: z.number().describe(
    "The amount of time in seconds to reconnect after having been disabled.",
  ).optional(),
  captive_portal: z.number().describe(
    "Turn on the captive portal after the specified amount of time.",
  ).optional(),
  description: z.string().describe("A description of the policy.").optional(),
  disable_auto_fallback: z.boolean().describe(
    "If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.",
  ).optional(),
  dns_search_suffixes: z.array(z.object({
    description: z.string().optional(),
    suffix: z.string(),
  })).describe(
    "List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether the policy will be applied to matching devices.",
  ).optional(),
  exclude: z.array(z.object({
    address: z.string(),
    description: z.string().max(100).optional(),
  })).describe(
    "List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.",
  ).optional(),
  exclude_office_ips: z.boolean().describe(
    "Whether to add Microsoft IPs to Split Tunnel exclusions.",
  ).optional(),
  global_acceleration: z.object({
    api_endpoints: z.array(z.string()),
    enabled: z.boolean(),
    masque_endpoints: z.array(z.string()),
    wireguard_endpoints: z.array(z.string()),
  }).describe(
    "Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.",
  ).optional(),
  include: z.array(z.object({
    address: z.string(),
    description: z.string().max(100).optional(),
  })).describe(
    "List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.",
  ).optional(),
  lan_allow_minutes: z.number().describe(
    "The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.",
  ).optional(),
  lan_allow_subnet_size: z.number().describe(
    "The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.",
  ).optional(),
  match: z.string().max(500).describe(
    'The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".',
  ),
  name: z.string().max(100).describe(
    "The name of the device settings profile.",
  ),
  precedence: z.number().describe(
    "The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.",
  ),
  register_interface_ip_with_dns: z.boolean().describe(
    "Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.",
  ).optional(),
  sccm_vpn_boundary_support: z.boolean().describe(
    "Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).",
  ).optional(),
  service_mode_v2: z.object({
    mode: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  support_url: z.string().describe(
    "The URL to launch when the Send Feedback button is clicked.",
  ).optional(),
  switch_locked: z.boolean().describe(
    "Whether to allow the user to turn off the WARP switch and disconnect the client.",
  ).optional(),
  tunnel_protocol: z.string().describe(
    "Determines which tunnel protocol to use.",
  ).optional(),
  virtual_networks: z.object({
    allowed: z.array(z.string()),
    default: z.string(),
  }).describe("Virtual network access settings for the device.").optional(),
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
  allow_mode_switch: z.boolean().optional(),
  allow_updates: z.boolean().optional(),
  allowed_to_leave: z.boolean().optional(),
  auto_connect: z.number().optional(),
  captive_portal: z.number().optional(),
  default: z.boolean().optional(),
  description: z.string().optional(),
  disable_auto_fallback: z.boolean().optional(),
  dns_search_suffixes: z.array(z.object({
    description: z.string().optional(),
    suffix: z.string().optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  exclude: z.array(z.object({
    address: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  exclude_office_ips: z.boolean().optional(),
  fallback_domains: z.array(z.object({
    description: z.string().optional(),
    dns_server: z.array(z.string()).optional(),
    suffix: z.string().optional(),
  })).optional(),
  gateway_unique_id: z.string().optional(),
  global_acceleration: z.object({
    api_endpoints: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
    masque_endpoints: z.array(z.string()).optional(),
    wireguard_endpoints: z.array(z.string()).optional(),
  }).optional(),
  include: z.array(z.object({
    address: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  lan_allow_minutes: z.number().optional(),
  lan_allow_subnet_size: z.number().optional(),
  match: z.string().optional(),
  name: z.string().optional(),
  policy_id: z.string().optional(),
  precedence: z.number().optional(),
  register_interface_ip_with_dns: z.boolean().optional(),
  sccm_vpn_boundary_support: z.boolean().optional(),
  service_mode_v2: z.object({
    mode: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  support_url: z.string().optional(),
  switch_locked: z.boolean().optional(),
  target_tests: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
  tunnel_protocol: z.string().optional(),
  virtual_networks: z.object({
    allowed: z.array(z.string()).optional(),
    default: z.string().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  allow_mode_switch: z.boolean().optional(),
  allow_updates: z.boolean().optional(),
  allowed_to_leave: z.boolean().optional(),
  auto_connect: z.number().optional(),
  captive_portal: z.number().optional(),
  description: z.string().optional(),
  disable_auto_fallback: z.boolean().optional(),
  dns_search_suffixes: z.array(z.object({
    description: z.string().optional(),
    suffix: z.string(),
  })).optional(),
  enabled: z.boolean().optional(),
  exclude: z.array(z.object({
    address: z.string(),
    description: z.string().max(100).optional(),
  })).optional(),
  exclude_office_ips: z.boolean().optional(),
  global_acceleration: z.object({
    api_endpoints: z.array(z.string()),
    enabled: z.boolean(),
    masque_endpoints: z.array(z.string()),
    wireguard_endpoints: z.array(z.string()),
  }).optional(),
  include: z.array(z.object({
    address: z.string(),
    description: z.string().max(100).optional(),
  })).optional(),
  lan_allow_minutes: z.number().optional(),
  lan_allow_subnet_size: z.number().optional(),
  match: z.string().max(500).optional(),
  name: z.string().max(100).optional(),
  precedence: z.number().optional(),
  register_interface_ip_with_dns: z.boolean().optional(),
  sccm_vpn_boundary_support: z.boolean().optional(),
  service_mode_v2: z.object({
    mode: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  support_url: z.string().optional(),
  switch_locked: z.boolean().optional(),
  tunnel_protocol: z.string().optional(),
  virtual_networks: z.object({
    allowed: z.array(z.string()),
    default: z.string(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Policy. Registered at `@swamp/cloudflare/devices/policy`. */
export const model = {
  type: "@swamp/cloudflare/devices/policy",
  version: "2026.06.24.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: dns_search_suffixes, apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
      description: "Added: global_acceleration",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policy resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/policy";
        const body: Record<string, unknown> = {};
        if (g.allow_mode_switch !== undefined) {
          body.allow_mode_switch = g.allow_mode_switch;
        }
        if (g.allow_updates !== undefined) body.allow_updates = g.allow_updates;
        if (g.allowed_to_leave !== undefined) {
          body.allowed_to_leave = g.allowed_to_leave;
        }
        if (g.auto_connect !== undefined) body.auto_connect = g.auto_connect;
        if (g.captive_portal !== undefined) {
          body.captive_portal = g.captive_portal;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.disable_auto_fallback !== undefined) {
          body.disable_auto_fallback = g.disable_auto_fallback;
        }
        if (g.dns_search_suffixes !== undefined) {
          body.dns_search_suffixes = g.dns_search_suffixes;
        }
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.exclude_office_ips !== undefined) {
          body.exclude_office_ips = g.exclude_office_ips;
        }
        if (g.global_acceleration !== undefined) {
          body.global_acceleration = g.global_acceleration;
        }
        if (g.include !== undefined) body.include = g.include;
        if (g.lan_allow_minutes !== undefined) {
          body.lan_allow_minutes = g.lan_allow_minutes;
        }
        if (g.lan_allow_subnet_size !== undefined) {
          body.lan_allow_subnet_size = g.lan_allow_subnet_size;
        }
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        if (g.register_interface_ip_with_dns !== undefined) {
          body.register_interface_ip_with_dns =
            g.register_interface_ip_with_dns;
        }
        if (g.sccm_vpn_boundary_support !== undefined) {
          body.sccm_vpn_boundary_support = g.sccm_vpn_boundary_support;
        }
        if (g.service_mode_v2 !== undefined) {
          body.service_mode_v2 = g.service_mode_v2;
        }
        if (g.support_url !== undefined) body.support_url = g.support_url;
        if (g.switch_locked !== undefined) body.switch_locked = g.switch_locked;
        if (g.tunnel_protocol !== undefined) {
          body.tunnel_protocol = g.tunnel_protocol;
        }
        if (g.virtual_networks !== undefined) {
          body.virtual_networks = g.virtual_networks;
        }
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
      description: "Get a Policy",
      arguments: z.object({ id: z.string().describe("The ID of the Policy") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/policy";
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
      description: "Update Policy attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/policy";
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
        if (g.allow_mode_switch !== undefined) {
          body.allow_mode_switch = g.allow_mode_switch;
        }
        if (g.allow_updates !== undefined) body.allow_updates = g.allow_updates;
        if (g.allowed_to_leave !== undefined) {
          body.allowed_to_leave = g.allowed_to_leave;
        }
        if (g.auto_connect !== undefined) body.auto_connect = g.auto_connect;
        if (g.captive_portal !== undefined) {
          body.captive_portal = g.captive_portal;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.disable_auto_fallback !== undefined) {
          body.disable_auto_fallback = g.disable_auto_fallback;
        }
        if (g.dns_search_suffixes !== undefined) {
          body.dns_search_suffixes = g.dns_search_suffixes;
        }
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.exclude_office_ips !== undefined) {
          body.exclude_office_ips = g.exclude_office_ips;
        }
        if (g.global_acceleration !== undefined) {
          body.global_acceleration = g.global_acceleration;
        }
        if (g.include !== undefined) body.include = g.include;
        if (g.lan_allow_minutes !== undefined) {
          body.lan_allow_minutes = g.lan_allow_minutes;
        }
        if (g.lan_allow_subnet_size !== undefined) {
          body.lan_allow_subnet_size = g.lan_allow_subnet_size;
        }
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        if (g.register_interface_ip_with_dns !== undefined) {
          body.register_interface_ip_with_dns =
            g.register_interface_ip_with_dns;
        }
        if (g.sccm_vpn_boundary_support !== undefined) {
          body.sccm_vpn_boundary_support = g.sccm_vpn_boundary_support;
        }
        if (g.service_mode_v2 !== undefined) {
          body.service_mode_v2 = g.service_mode_v2;
        }
        if (g.support_url !== undefined) body.support_url = g.support_url;
        if (g.switch_locked !== undefined) body.switch_locked = g.switch_locked;
        if (g.tunnel_protocol !== undefined) {
          body.tunnel_protocol = g.tunnel_protocol;
        }
        if (g.virtual_networks !== undefined) {
          body.virtual_networks = g.virtual_networks;
        }
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
      description: "Delete the Policy",
      arguments: z.object({ id: z.string().describe("The ID of the Policy") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/policy";
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
      description: "Sync Policy state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/policy";
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
