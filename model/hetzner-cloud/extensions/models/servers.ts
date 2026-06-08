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

// Auto-generated extension model for @swamp/hetzner-cloud/servers
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud server.
 *
 * Wraps the `/servers` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Name of the Server to create (must be unique per Project and a valid hostname as per RFC 1123).",
  ),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  location: z.string().describe(
    "ID or name of the Location to create the Server in (must not be used together with `datacenter`).",
  ).optional(),
  datacenter: z.string().describe(
    "**Deprecated**: This property is deprecated and will be removed after the 1 July 2026.\nUse the `location` property instead.\n\nID or name of the Data Center to create Server in (must not be used together with `location`).\n",
  ).optional(),
  server_type: z.string().describe(
    "ID or name of the Server type this Server should be created with.",
  ),
  start_after_create: z.boolean().describe(
    "This automatically triggers a [Power on a Server-Server Action](#tag/server-actions/poweron_server) after the creation is finished and is returned in the `next_actions` response object.",
  ).optional(),
  image: z.string().describe(
    "ID or name of the Image the Server is created from.",
  ),
  placement_group: z.number().int().describe(
    "ID of the Placement Group the Server should be in.",
  ).optional(),
  ssh_keys: z.array(z.string()).describe(
    "SSH key IDs (`integer`) or names (`string`) which should be injected into the Server at creation time.",
  ).optional(),
  volumes: z.array(z.number().int()).describe(
    "Volume IDs which should be attached to the Server at the creation time. Volumes must be in the same Location.",
  ).optional(),
  networks: z.array(z.number().int()).describe(
    "Network IDs which should be attached to the Server private network interface at the creation time.",
  ).optional(),
  firewalls: z.array(z.object({
    firewall: z.number().int(),
  })).describe(
    "Firewalls which should be applied on the Server's public network interface at creation time.",
  ).optional(),
  user_data: z.string().describe(
    "Cloud-Init user data to use during Server creation. This field is limited to 32KiB.",
  ).optional(),
  automount: z.boolean().describe("Auto-mount Volumes after attach.")
    .optional(),
  public_net: z.object({
    enable_ipv4: z.boolean().optional(),
    enable_ipv6: z.boolean().optional(),
    ipv4: z.number().int().optional(),
    ipv6: z.number().int().optional(),
  }).describe("Public Network options.").optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  status: z.string().optional(),
  created: z.string().optional(),
  public_net: z.object({
    ipv4: z.object({
      id: z.number().optional(),
      ip: z.string().optional(),
      blocked: z.boolean().optional(),
      dns_ptr: z.string().optional(),
    }).optional(),
    ipv6: z.object({
      id: z.number().optional(),
      ip: z.string().optional(),
      blocked: z.boolean().optional(),
      dns_ptr: z.array(z.object({
        ip: z.string().optional(),
        dns_ptr: z.string().optional(),
      })).optional(),
    }).optional(),
    floating_ips: z.array(z.number()).optional(),
    firewalls: z.array(z.object({
      id: z.number().optional(),
      status: z.string().optional(),
    })).optional(),
  }).optional(),
  private_net: z.array(z.object({
    network: z.number().optional(),
    ip: z.string().optional(),
    alias_ips: z.array(z.string()).optional(),
    mac_address: z.string().optional(),
  })).optional(),
  server_type: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    cores: z.number().optional(),
    memory: z.number().optional(),
    disk: z.number().optional(),
    deprecated: z.boolean().optional(),
    prices: z.array(z.object({
      location: z.string().optional(),
      price_hourly: z.object({
        net: z.string().optional(),
        gross: z.string().optional(),
      }).optional(),
      price_monthly: z.object({
        net: z.string().optional(),
        gross: z.string().optional(),
      }).optional(),
      included_traffic: z.number().optional(),
      price_per_tb_traffic: z.object({
        net: z.string().optional(),
        gross: z.string().optional(),
      }).optional(),
    })).optional(),
    storage_type: z.string().optional(),
    cpu_type: z.string().optional(),
    category: z.string().optional(),
    architecture: z.string().optional(),
    deprecation: z.object({
      unavailable_after: z.string().optional(),
      announced: z.string().optional(),
    }).optional(),
    locations: z.array(z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      deprecation: z.object({
        unavailable_after: z.string().optional(),
        announced: z.string().optional(),
      }).optional(),
      recommended: z.boolean().optional(),
      available: z.boolean().optional(),
    })).optional(),
  }).optional(),
  datacenter: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      network_zone: z.string().optional(),
    }).optional(),
    server_types: z.object({
      supported: z.array(z.number()).optional(),
      available: z.array(z.number()).optional(),
      available_for_migration: z.array(z.number()).optional(),
    }).optional(),
  }).optional(),
  location: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    network_zone: z.string().optional(),
  }).optional(),
  image: z.object({
    id: z.number().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    image_size: z.number().optional(),
    disk_size: z.number().optional(),
    created: z.string().optional(),
    created_from: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
    }).optional(),
    bound_to: z.number().optional(),
    os_flavor: z.string().optional(),
    os_version: z.string().optional(),
    rapid_deploy: z.boolean().optional(),
    protection: z.object({
      delete: z.boolean().optional(),
    }).optional(),
    deprecated: z.string().optional(),
    deleted: z.string().optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
    architecture: z.string().optional(),
  }).optional(),
  iso: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    deprecation: z.object({
      unavailable_after: z.string().optional(),
      announced: z.string().optional(),
    }).optional(),
    architecture: z.string().optional(),
  }).optional(),
  rescue_enabled: z.boolean().optional(),
  locked: z.boolean().optional(),
  backup_window: z.string().optional(),
  outgoing_traffic: z.number().optional(),
  ingoing_traffic: z.number().optional(),
  included_traffic: z.number().optional(),
  protection: z.object({
    delete: z.boolean().optional(),
    rebuild: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  volumes: z.array(z.number()).optional(),
  load_balancers: z.array(z.number()).optional(),
  primary_disk_size: z.number().optional(),
  placement_group: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
    type: z.string().optional(),
    created: z.string().optional(),
    servers: z.array(z.number()).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  location: z.string().optional(),
  datacenter: z.string().optional(),
  server_type: z.string().optional(),
  start_after_create: z.boolean().optional(),
  image: z.string().optional(),
  placement_group: z.number().int().optional(),
  ssh_keys: z.array(z.string()).optional(),
  volumes: z.array(z.number().int()).optional(),
  networks: z.array(z.number().int()).optional(),
  firewalls: z.array(z.object({
    firewall: z.number().int(),
  })).optional(),
  user_data: z.string().optional(),
  automount: z.boolean().optional(),
  public_net: z.object({
    enable_ipv4: z.boolean().optional(),
    enable_ipv6: z.boolean().optional(),
    ipv4: z.number().int().optional(),
    ipv6: z.number().int().optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud server. Registered at `@swamp/hetzner-cloud/servers`. */
export const model = {
  type: "@swamp/hetzner-cloud/servers",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.02.1",
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
      description: "No schema changes (version bump for manifest republish)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.28.1",
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
      description: "Server resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a server",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.location !== undefined) body.location = g.location;
        if (g.datacenter !== undefined) body.datacenter = g.datacenter;
        if (g.server_type !== undefined) body.server_type = g.server_type;
        if (g.start_after_create !== undefined) {
          body.start_after_create = g.start_after_create;
        }
        if (g.image !== undefined) body.image = g.image;
        if (g.placement_group !== undefined) {
          body.placement_group = g.placement_group;
        }
        if (g.ssh_keys !== undefined) body.ssh_keys = g.ssh_keys;
        if (g.volumes !== undefined) body.volumes = g.volumes;
        if (g.networks !== undefined) body.networks = g.networks;
        if (g.firewalls !== undefined) body.firewalls = g.firewalls;
        if (g.user_data !== undefined) body.user_data = g.user_data;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.automount !== undefined) body.automount = g.automount;
        if (g.public_net !== undefined) body.public_net = g.public_net;
        const result = await create("/servers", body, g.token) as ResourceData;
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
      description: "Get a server",
      arguments: z.object({
        id: z.number().int().describe("The ID of the server"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/servers",
          args.id,
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
      description: "Update server attributes",
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
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/servers",
          existing.id,
          body,
          g.token,
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
      description: "Delete the server",
      arguments: z.object({
        id: z.number().int().describe("The ID of the server"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/servers",
          args.id,
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
      description: "Sync server state from Hetzner",
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
        const result = await tryRead("/servers", existing.id, g.token) as
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
    list: {
      description:
        "List servers, optionally filtered by a Hetzner label selector",
      arguments: z.object({
        label_selector: z.string().describe(
          "Hetzner label selector to filter results, e.g. env=production,role!=db",
        ).optional(),
      }),
      execute: async (args: { label_selector?: string }, context: any) => {
        const g = context.globalArgs;
        const queryParams: Record<string, string> = {};
        if (args.label_selector !== undefined) {
          queryParams.label_selector = args.label_selector;
        }
        const items = await listAll(
          "/servers",
          queryParams,
          g.token,
        ) as ResourceData[];
        const dataHandles: any[] = [];
        for (const item of items) {
          const instanceName =
            (item.name?.toString() ?? item.id?.toString() ?? "unknown").replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length } };
      },
    },
  },
};
