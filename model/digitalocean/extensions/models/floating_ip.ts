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

// Auto-generated extension model for @swamp/digitalocean/floating-ip
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean floating ip.
 *
 * Wraps the `/v2/floating_ips` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  createAndPollAction,
  read,
  remove,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  droplet_id: z.number().int().describe(
    "The ID of the Droplet that the floating IP will be assigned to.",
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
    "The slug identifier for the region the floating IP will be reserved to.",
  ).optional(),
  project_id: z.string().describe(
    "The UUID of the project to which the floating IP will be assigned.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  ip: z.string(),
  region: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    features: z.array(z.string()).optional(),
    available: z.boolean().optional(),
    sizes: z.array(z.string()).optional(),
  }).optional(),
  droplet: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    memory: z.number().optional(),
    vcpus: z.number().optional(),
    disk: z.number().optional(),
    disk_info: z.array(z.object({
      type: z.string().optional(),
      size: z.object({
        amount: z.number().optional(),
        unit: z.string().optional(),
      }).optional(),
    })).optional(),
    locked: z.boolean().optional(),
    status: z.string().optional(),
    kernel: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      version: z.string().optional(),
    }).optional(),
    created_at: z.string().optional(),
    features: z.array(z.string()).optional(),
    backup_ids: z.array(z.number()).optional(),
    next_backup_window: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
    snapshot_ids: z.array(z.number()).optional(),
    image: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
      distribution: z.string().optional(),
      slug: z.string().optional(),
      public: z.boolean().optional(),
      regions: z.array(z.string()).optional(),
      created_at: z.string().optional(),
      min_disk_size: z.number().optional(),
      size_gigabytes: z.number().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      status: z.string().optional(),
      error_message: z.string().optional(),
    }).optional(),
    volume_ids: z.array(z.string()).optional(),
    size: z.object({
      slug: z.string().optional(),
      memory: z.number().optional(),
      vcpus: z.number().optional(),
      disk: z.number().optional(),
      transfer: z.number().optional(),
      price_monthly: z.number().optional(),
      price_hourly: z.number().optional(),
      regions: z.array(z.string()).optional(),
      available: z.boolean().optional(),
      description: z.string().optional(),
      disk_info: z.array(z.object({
        type: z.string().optional(),
        size: z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
        }).optional(),
      })).optional(),
      gpu_info: z.object({
        count: z.number().optional(),
        model: z.string().optional(),
        vram: z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
        }).optional(),
      }).optional(),
    }).optional(),
    size_slug: z.string().optional(),
    networks: z.object({
      v4: z.array(z.object({
        ip_address: z.string().optional(),
        netmask: z.string().optional(),
        gateway: z.string().optional(),
        type: z.string().optional(),
      })).optional(),
      v6: z.array(z.object({
        ip_address: z.string().optional(),
        netmask: z.number().optional(),
        gateway: z.string().optional(),
        type: z.string().optional(),
      })).optional(),
    }).optional(),
    region: z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      features: z.array(z.string()).optional(),
      available: z.boolean().optional(),
      sizes: z.array(z.string()).optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    vpc_uuid: z.string().optional(),
    gpu_info: z.object({
      count: z.number().optional(),
      model: z.string().optional(),
      vram: z.object({
        amount: z.number().optional(),
        unit: z.string().optional(),
      }).optional(),
    }).optional(),
  }).nullable().optional(),
  locked: z.boolean().optional(),
  project_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  droplet_id: z.number().int().optional(),
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
  project_id: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean floating ip. Registered at `@swamp/digitalocean/floating-ip`. */
export const model = {
  type: "@swamp/digitalocean/floating-ip",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
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
      description: "Floating IP resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    floating_ip_action: {
      description: "Floating IP action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a floating ip",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.droplet_id !== undefined) body.droplet_id = g.droplet_id;
        if (g.region !== undefined) body.region = g.region;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        const result = await create(
          "/v2/floating_ips",
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
      description: "Get a floating ip",
      arguments: z.object({
        ip: z.string().describe("The IP address of the floating ip"),
      }),
      execute: async (args: { ip: string }, context: any) => {
        const result = await read(
          "/v2/floating_ips",
          args.ip,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.ip.toString()).replace(
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
    delete: {
      description: "Delete the floating ip",
      arguments: z.object({
        ip: z.string().describe("The IP address of the floating ip"),
      }),
      execute: async (args: { ip: string }, context: any) => {
        const { existed } = await remove(
          "/v2/floating_ips",
          args.ip,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.ip.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          ip: args.ip,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync floating ip state from DigitalOcean",
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
          "/v2/floating_ips",
          existing.ip ?? existing.id,
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
          ip: existing.ip ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    assign: {
      description: "assign the floating ip",
      arguments: z.object({
        ip: z.string().describe("The IP address of the floating ip"),
        droplet_id: z.number().int().describe(
          "The ID of the Droplet that the floating IP will be assigned to.",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { ip: string; droplet_id: number; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "assign" };
        if (args.droplet_id !== undefined) body.droplet_id = args.droplet_id;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/floating_ips",
            args.ip,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.ip}-assign`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "floating_ip_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName = context.globalArgs.name?.toString() ??
            args.ip.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    unassign: {
      description: "unassign the floating ip",
      arguments: z.object({
        ip: z.string().describe("The IP address of the floating ip"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { ip: string; waitForCompletion?: boolean },
        context: any,
      ) => {
        const body: Record<string, unknown> = { type: "unassign" };
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/floating_ips",
            args.ip,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.ip}-unassign`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "floating_ip_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName = context.globalArgs.name?.toString() ??
            args.ip.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
  },
};
