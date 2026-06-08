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

// Auto-generated extension model for @swamp/digitalocean/monitoring-alert-policy
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean monitoring alert policy.
 *
 * Wraps the `/v2/monitoring/alerts` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  alerts: z.object({
    email: z.array(z.string()),
    slack: z.array(z.object({
      channel: z.string(),
      url: z.string(),
    })),
  }),
  compare: z.enum(["GreaterThan", "LessThan"]),
  description: z.string(),
  enabled: z.boolean(),
  entities: z.array(z.string()),
  tags: z.array(z.string()),
  type: z.enum([
    "v1/insights/droplet/load_1",
    "v1/insights/droplet/load_5",
    "v1/insights/droplet/load_15",
    "v1/insights/droplet/memory_utilization_percent",
    "v1/insights/droplet/disk_utilization_percent",
    "v1/insights/droplet/cpu",
    "v1/insights/droplet/disk_read",
    "v1/insights/droplet/disk_write",
    "v1/insights/droplet/public_outbound_bandwidth",
    "v1/insights/droplet/public_inbound_bandwidth",
    "v1/insights/droplet/private_outbound_bandwidth",
    "v1/insights/droplet/private_inbound_bandwidth",
    "v1/insights/lbaas/avg_cpu_utilization_percent",
    "v1/insights/lbaas/connection_utilization_percent",
    "v1/insights/lbaas/droplet_health",
    "v1/insights/lbaas/tls_connections_per_second_utilization_percent",
    "v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx",
    "v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx",
    "v1/insights/lbaas/increase_in_http_error_rate_count_5xx",
    "v1/insights/lbaas/increase_in_http_error_rate_count_4xx",
    "v1/insights/lbaas/high_http_request_response_time",
    "v1/insights/lbaas/high_http_request_response_time_50p",
    "v1/insights/lbaas/high_http_request_response_time_95p",
    "v1/insights/lbaas/high_http_request_response_time_99p",
    "v1/dbaas/alerts/load_15_alerts",
    "v1/dbaas/alerts/memory_utilization_alerts",
    "v1/dbaas/alerts/disk_utilization_alerts",
    "v1/dbaas/alerts/cpu_alerts",
    "v1/droplet/autoscale_alerts/current_instances",
    "v1/droplet/autoscale_alerts/target_instances",
    "v1/droplet/autoscale_alerts/current_cpu_utilization",
    "v1/droplet/autoscale_alerts/target_cpu_utilization",
    "v1/droplet/autoscale_alerts/current_memory_utilization",
    "v1/droplet/autoscale_alerts/target_memory_utilization",
    "v1/droplet/autoscale_alerts/scale_up",
    "v1/droplet/autoscale_alerts/scale_down",
  ]),
  value: z.number(),
  window: z.enum(["5m", "10m", "30m", "1h"]),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  alerts: z.object({
    email: z.array(z.string()).optional(),
    slack: z.array(z.object({
      channel: z.string().optional(),
      url: z.string().optional(),
    })).optional(),
  }).optional(),
  compare: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  entities: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  type: z.string().optional(),
  uuid: z.string(),
  value: z.number().optional(),
  window: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  alerts: z.object({
    email: z.array(z.string()),
    slack: z.array(z.object({
      channel: z.string(),
      url: z.string(),
    })),
  }).optional(),
  compare: z.enum(["GreaterThan", "LessThan"]).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  entities: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum([
    "v1/insights/droplet/load_1",
    "v1/insights/droplet/load_5",
    "v1/insights/droplet/load_15",
    "v1/insights/droplet/memory_utilization_percent",
    "v1/insights/droplet/disk_utilization_percent",
    "v1/insights/droplet/cpu",
    "v1/insights/droplet/disk_read",
    "v1/insights/droplet/disk_write",
    "v1/insights/droplet/public_outbound_bandwidth",
    "v1/insights/droplet/public_inbound_bandwidth",
    "v1/insights/droplet/private_outbound_bandwidth",
    "v1/insights/droplet/private_inbound_bandwidth",
    "v1/insights/lbaas/avg_cpu_utilization_percent",
    "v1/insights/lbaas/connection_utilization_percent",
    "v1/insights/lbaas/droplet_health",
    "v1/insights/lbaas/tls_connections_per_second_utilization_percent",
    "v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx",
    "v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx",
    "v1/insights/lbaas/increase_in_http_error_rate_count_5xx",
    "v1/insights/lbaas/increase_in_http_error_rate_count_4xx",
    "v1/insights/lbaas/high_http_request_response_time",
    "v1/insights/lbaas/high_http_request_response_time_50p",
    "v1/insights/lbaas/high_http_request_response_time_95p",
    "v1/insights/lbaas/high_http_request_response_time_99p",
    "v1/dbaas/alerts/load_15_alerts",
    "v1/dbaas/alerts/memory_utilization_alerts",
    "v1/dbaas/alerts/disk_utilization_alerts",
    "v1/dbaas/alerts/cpu_alerts",
    "v1/droplet/autoscale_alerts/current_instances",
    "v1/droplet/autoscale_alerts/target_instances",
    "v1/droplet/autoscale_alerts/current_cpu_utilization",
    "v1/droplet/autoscale_alerts/target_cpu_utilization",
    "v1/droplet/autoscale_alerts/current_memory_utilization",
    "v1/droplet/autoscale_alerts/target_memory_utilization",
    "v1/droplet/autoscale_alerts/scale_up",
    "v1/droplet/autoscale_alerts/scale_down",
  ]).optional(),
  value: z.number().optional(),
  window: z.enum(["5m", "10m", "30m", "1h"]).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean monitoring alert policy. Registered at `@swamp/digitalocean/monitoring-alert-policy`. */
export const model = {
  type: "@swamp/digitalocean/monitoring-alert-policy",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
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
      description: "Monitoring Alert Policy resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a monitoring alert policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.alerts !== undefined) body.alerts = g.alerts;
        if (g.compare !== undefined) body.compare = g.compare;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.entities !== undefined) body.entities = g.entities;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.type !== undefined) body.type = g.type;
        if (g.value !== undefined) body.value = g.value;
        if (g.window !== undefined) body.window = g.window;
        const result = await create(
          "/v2/monitoring/alerts",
          body,
          undefined,
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
    get: {
      description: "Get a monitoring alert policy",
      arguments: z.object({
        uuid: z.string().describe("The UUID of the monitoring alert policy"),
      }),
      execute: async (args: { uuid: string }, context: any) => {
        const result = await read(
          "/v2/monitoring/alerts",
          args.uuid,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.uuid.toString()).replace(
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
      description: "Update monitoring alert policy attributes",
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
        if (g.alerts !== undefined) body.alerts = g.alerts;
        if (g.compare !== undefined) body.compare = g.compare;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.entities !== undefined) body.entities = g.entities;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.type !== undefined) body.type = g.type;
        if (g.value !== undefined) body.value = g.value;
        if (g.window !== undefined) body.window = g.window;
        const result = await update(
          "/v2/monitoring/alerts",
          existing.uuid ?? existing.id,
          body,
          "PUT",
          undefined,
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
      description: "Delete the monitoring alert policy",
      arguments: z.object({
        uuid: z.string().describe("The UUID of the monitoring alert policy"),
      }),
      execute: async (args: { uuid: string }, context: any) => {
        const { existed } = await remove(
          "/v2/monitoring/alerts",
          args.uuid,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.uuid.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          uuid: args.uuid,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync monitoring alert policy state from DigitalOcean",
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
          "/v2/monitoring/alerts",
          existing.uuid ?? existing.id,
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
          uuid: existing.uuid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
