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

// Auto-generated extension model for @swamp/hetzner-cloud/load-balancers
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud load balancer.
 *
 * Wraps the `/load_balancers` API as a swamp model so create, get, update, delete, sync, list
 * can be driven through `swamp model`.
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
  name: z.string().min(1).max(128).regex(new RegExp("^\\S(.*\\S)?$")).describe(
    "Name of the Load Balancer.",
  ),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  load_balancer_type: z.string().describe(
    "ID or name of the Load Balancer type this Load Balancer should be created with.",
  ),
  algorithm: z.object({
    type: z.enum(["round_robin", "least_connections"]),
  }).describe("Algorithm of the Load Balancer.").optional(),
  services: z.array(z.object({
    protocol: z.enum(["tcp"]),
    listen_port: z.number().int(),
    destination_port: z.number().int(),
    proxyprotocol: z.boolean(),
    health_check: z.object({
      protocol: z.enum(["tcp", "http"]),
      port: z.number().int(),
      interval: z.number().int().min(3).max(60),
      timeout: z.number().int().min(1).max(60),
      retries: z.number().int().min(1).max(5),
      http: z.object({
        domain: z.string().max(128),
        path: z.string().min(1).max(256),
        response: z.string().max(256).optional(),
        status_codes: z.array(z.string()).optional(),
        tls: z.boolean().optional(),
      }).optional(),
    }),
  })).describe("Array of services.").optional(),
  targets: z.array(z.object({
    type: z.enum(["server", "label_selector", "ip"]),
    server: z.object({
      id: z.number().int(),
    }).optional(),
    label_selector: z.object({
      selector: z.string().min(1).max(1000),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    use_private_ip: z.boolean().optional(),
  })).describe("Array of targets.").optional(),
  public_interface: z.boolean().describe(
    "Enable or disable the public interface of the Load Balancer.",
  ).optional(),
  network: z.number().int().describe(
    "ID of the network the Load Balancer should be attached to on creation.",
  ).optional(),
  network_zone: z.string().describe("Name of network zone.").optional(),
  location: z.string().describe(
    "ID or name of Location to create Load Balancer in.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  public_net: z.object({
    enabled: z.boolean().optional(),
    ipv4: z.object({
      ip: z.string().optional(),
      dns_ptr: z.string().optional(),
    }).optional(),
    ipv6: z.object({
      ip: z.string().optional(),
      dns_ptr: z.string().optional(),
    }).optional(),
  }).optional(),
  private_net: z.array(z.object({
    network: z.number().optional(),
    ip: z.string().optional(),
  })).optional(),
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
  load_balancer_type: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    max_connections: z.number().optional(),
    max_services: z.number().optional(),
    max_targets: z.number().optional(),
    max_assigned_certificates: z.number().optional(),
    deprecated: z.string().optional(),
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
  }).optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
  services: z.array(z.object({
    protocol: z.string().optional(),
    listen_port: z.number().optional(),
    destination_port: z.number().optional(),
    proxyprotocol: z.boolean().optional(),
    health_check: z.object({
      protocol: z.string().optional(),
      port: z.number().optional(),
      interval: z.number().optional(),
      timeout: z.number().optional(),
      retries: z.number().optional(),
      http: z.object({
        domain: z.string().optional(),
        path: z.string().optional(),
        response: z.string().optional(),
        status_codes: z.array(z.string()).optional(),
        tls: z.boolean().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  targets: z.array(z.object({
    type: z.string().optional(),
    server: z.object({
      id: z.number().optional(),
    }).optional(),
    health_status: z.array(z.object({
      listen_port: z.number().optional(),
      status: z.string().optional(),
    })).optional(),
    use_private_ip: z.boolean().optional(),
  })).optional(),
  algorithm: z.object({
    type: z.string().optional(),
  }).optional(),
  outgoing_traffic: z.number().optional(),
  ingoing_traffic: z.number().optional(),
  included_traffic: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().min(1).max(128).regex(new RegExp("^\\S(.*\\S)?$"))
    .optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  load_balancer_type: z.string().optional(),
  algorithm: z.object({
    type: z.enum(["round_robin", "least_connections"]),
  }).optional(),
  services: z.array(z.object({
    protocol: z.enum(["tcp"]),
    listen_port: z.number().int(),
    destination_port: z.number().int(),
    proxyprotocol: z.boolean(),
    health_check: z.object({
      protocol: z.enum(["tcp", "http"]),
      port: z.number().int(),
      interval: z.number().int().min(3).max(60),
      timeout: z.number().int().min(1).max(60),
      retries: z.number().int().min(1).max(5),
      http: z.object({
        domain: z.string().max(128),
        path: z.string().min(1).max(256),
        response: z.string().max(256).optional(),
        status_codes: z.array(z.string()).optional(),
        tls: z.boolean().optional(),
      }).optional(),
    }),
  })).optional(),
  targets: z.array(z.object({
    type: z.enum(["server", "label_selector", "ip"]),
    server: z.object({
      id: z.number().int(),
    }).optional(),
    label_selector: z.object({
      selector: z.string().min(1).max(1000),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    use_private_ip: z.boolean().optional(),
  })).optional(),
  public_interface: z.boolean().optional(),
  network: z.number().int().optional(),
  network_zone: z.string().optional(),
  location: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud load balancer. Registered at `@swamp/hetzner-cloud/load-balancers`. */
export const model = {
  type: "@swamp/hetzner-cloud/load-balancers",
  version: "2026.06.10.1",
  upgrades: [
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
      toVersion: "2026.05.01.1",
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
    {
      toVersion: "2026.06.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Load balancer resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a load balancer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.load_balancer_type !== undefined) {
          body.load_balancer_type = g.load_balancer_type;
        }
        if (g.algorithm !== undefined) body.algorithm = g.algorithm;
        if (g.services !== undefined) body.services = g.services;
        if (g.targets !== undefined) body.targets = g.targets;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.public_interface !== undefined) {
          body.public_interface = g.public_interface;
        }
        if (g.network !== undefined) body.network = g.network;
        if (g.network_zone !== undefined) body.network_zone = g.network_zone;
        if (g.location !== undefined) body.location = g.location;
        const result = await create(
          "/load_balancers",
          body,
          g.token,
        ) as ResourceData;
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
      description: "Get a load balancer",
      arguments: z.object({
        id: z.number().int().describe("The ID of the load balancer"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/load_balancers",
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
      description: "Update load balancer attributes",
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
          "/load_balancers",
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
      description: "Delete the load balancer",
      arguments: z.object({
        id: z.number().int().describe("The ID of the load balancer"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/load_balancers",
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
      description: "Sync load balancer state from Hetzner",
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
        const result = await tryRead("/load_balancers", existing.id, g.token) as
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
        "List load balancers, optionally filtered by a Hetzner label selector",
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
          "/load_balancers",
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
