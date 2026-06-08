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

// Auto-generated extension model for @swamp/digitalocean/droplet-autoscale
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean droplet autoscale.
 *
 * Wraps the `/v2/droplets/autoscale` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "The human-readable name of the autoscale pool. This field cannot be updated",
  ),
  config: z.object({
    target_number_instances: z.number().int().min(1).max(1000).optional(),
    min_instances: z.number().int().min(1).max(500).optional(),
    max_instances: z.number().int().min(1).max(1000).optional(),
    target_cpu_utilization: z.number().min(0.05).max(1).optional(),
    target_memory_utilization: z.number().min(0.05).max(1).optional(),
    cooldown_minutes: z.number().int().min(5).max(20).optional(),
  }).describe(
    "The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration).",
  ),
  droplet_template: z.object({
    name: z.string().optional(),
    region: z.enum([
      "nyc1",
      "nyc2",
      "nyc3",
      "ams2",
      "ams3",
      "sfo1",
      "sfo2",
      "sfo3",
      "sgp1",
      "lon1",
      "fra1",
      "tor1",
      "blr1",
      "syd1",
    ]),
    size: z.string(),
    image: z.string(),
    ssh_keys: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    vpc_uuid: z.string().optional(),
    with_droplet_agent: z.boolean().optional(),
    project_id: z.string().optional(),
    ipv6: z.boolean().optional(),
    user_data: z.string().optional(),
    public_networking: z.boolean().optional(),
  }),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  config: z.object({
    target_number_instances: z.number().optional(),
    min_instances: z.number().optional(),
    max_instances: z.number().optional(),
    target_cpu_utilization: z.number().optional(),
    target_memory_utilization: z.number().optional(),
    cooldown_minutes: z.number().optional(),
  }).optional(),
  droplet_template: z.object({
    name: z.string().optional(),
    region: z.string().optional(),
    size: z.string().optional(),
    image: z.string().optional(),
    ssh_keys: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    vpc_uuid: z.string().optional(),
    with_droplet_agent: z.boolean().optional(),
    project_id: z.string().optional(),
    ipv6: z.boolean().optional(),
    user_data: z.string().optional(),
    public_networking: z.boolean().optional(),
  }).optional(),
  current_utilization: z.object({
    memory: z.number().optional(),
    cpu: z.number().optional(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  status: z.string().optional(),
  active_resources_count: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  config: z.object({
    target_number_instances: z.number().int().min(1).max(1000).optional(),
    min_instances: z.number().int().min(1).max(500).optional(),
    max_instances: z.number().int().min(1).max(1000).optional(),
    target_cpu_utilization: z.number().min(0.05).max(1).optional(),
    target_memory_utilization: z.number().min(0.05).max(1).optional(),
    cooldown_minutes: z.number().int().min(5).max(20).optional(),
  }).optional(),
  droplet_template: z.object({
    name: z.string().optional(),
    region: z.enum([
      "nyc1",
      "nyc2",
      "nyc3",
      "ams2",
      "ams3",
      "sfo1",
      "sfo2",
      "sfo3",
      "sgp1",
      "lon1",
      "fra1",
      "tor1",
      "blr1",
      "syd1",
    ]),
    size: z.string(),
    image: z.string(),
    ssh_keys: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    vpc_uuid: z.string().optional(),
    with_droplet_agent: z.boolean().optional(),
    project_id: z.string().optional(),
    ipv6: z.boolean().optional(),
    user_data: z.string().optional(),
    public_networking: z.boolean().optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean droplet autoscale. Registered at `@swamp/digitalocean/droplet-autoscale`. */
export const model = {
  type: "@swamp/digitalocean/droplet-autoscale",
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
      toVersion: "2026.03.31.1",
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
      description: "Droplet Autoscale resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a droplet autoscale",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/droplets/autoscale",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.config !== undefined) body.config = g.config;
        if (g.droplet_template !== undefined) {
          body.droplet_template = g.droplet_template;
        }
        const result = await create(
          "/v2/droplets/autoscale",
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
      description: "Get a droplet autoscale",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the droplet autoscale",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/droplets/autoscale",
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
      description: "Update droplet autoscale attributes",
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
        if (g.config !== undefined) body.config = g.config;
        if (g.droplet_template !== undefined) {
          body.droplet_template = g.droplet_template;
        }
        const result = await update(
          "/v2/droplets/autoscale",
          existing.autoscalepoolid ?? existing.id,
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
      description: "Delete the droplet autoscale",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the droplet autoscale",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/droplets/autoscale",
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
      description: "Sync droplet autoscale state from DigitalOcean",
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
          "/v2/droplets/autoscale",
          existing.autoscalepoolid ?? existing.id,
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
          autoscalepoolid: existing.autoscalepoolid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
