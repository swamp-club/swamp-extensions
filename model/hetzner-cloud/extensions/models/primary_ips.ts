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

// Auto-generated extension model for @swamp/hetzner-cloud/primary-ips
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud primary ip.
 *
 * Wraps the `/primary_ips` API as a swamp model so create, get, update, delete, sync, list
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
  name: z.string().describe(
    "Name of the Resource. Must be unique per Project.",
  ),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  auto_delete: z.boolean().describe(
    "Auto deletion state.\n\nIf enabled the [Primary IP](#tag/primary-ips) will be deleted once the assigned resource gets deleted.\n",
  ).optional(),
  type: z.enum(["ipv4", "ipv6"]).describe(
    "[Primary IP](#tag/primary-ips) type.",
  ),
  datacenter: z.string().describe(
    "**Deprecated**: This property is deprecated and will be removed after 1 July 2026.\nUse the `location` key instead.\n\n[Data Center](#tag/data-centers) ID or name.\n\nThe [Primary IP](#tag/primary-ips) will be bound to this [Data Center](#tag/data-centers).\nOmit if `assignee_id`/`assignee_type` or `location` are provided.\n",
  ).optional(),
  location: z.string().describe(
    "[Location](#tag/locations) ID or name the [Primary IP](#tag/primary-ips) will be bound to.\n\nOmit if `assignee_id`/`assignee_type` or `datacenter` are provided.\n",
  ).optional(),
  assignee_type: z.enum(["server"]).describe(
    "Type of resource the [Primary IP](#tag/primary-ips) can get assigned to.\n\nCurrently [Primary IPs](#tag/primary-ips) can only be assigned to [Servers](#tag/servers),\ntherefore this field must be set to `server`.\n",
  ),
  assignee_id: z.number().int().describe(
    "ID of resource to assign the [Primary IP](#tag/primary-ips) to.\n\nOmitted if the [Primary IP](#tag/primary-ips) should not get assigned.\n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
  blocked: z.boolean().optional(),
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
  ip: z.string().optional(),
  dns_ptr: z.array(z.object({
    ip: z.string().optional(),
    dns_ptr: z.string().optional(),
  })).optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  type: z.string().optional(),
  auto_delete: z.boolean().optional(),
  assignee_type: z.string().optional(),
  assignee_id: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  auto_delete: z.boolean().optional(),
  type: z.enum(["ipv4", "ipv6"]).optional(),
  datacenter: z.string().optional(),
  location: z.string().optional(),
  assignee_type: z.enum(["server"]).optional(),
  assignee_id: z.number().int().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud primary ip. Registered at `@swamp/hetzner-cloud/primary-ips`. */
export const model = {
  type: "@swamp/hetzner-cloud/primary-ips",
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
      description: "Primary ip resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a primary ip",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.type !== undefined) body.type = g.type;
        if (g.datacenter !== undefined) body.datacenter = g.datacenter;
        if (g.location !== undefined) body.location = g.location;
        if (g.assignee_type !== undefined) body.assignee_type = g.assignee_type;
        if (g.assignee_id !== undefined) body.assignee_id = g.assignee_id;
        if (g.auto_delete !== undefined) body.auto_delete = g.auto_delete;
        const result = await create(
          "/primary_ips",
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
      description: "Get a primary ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the primary ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/primary_ips",
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
      description: "Update primary ip attributes",
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
        if (g.auto_delete !== undefined) body.auto_delete = g.auto_delete;
        const result = await update(
          "/primary_ips",
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
      description: "Delete the primary ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the primary ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/primary_ips",
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
      description: "Sync primary ip state from Hetzner",
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
        const result = await tryRead("/primary_ips", existing.id, g.token) as
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
        "List primary ips, optionally filtered by a Hetzner label selector",
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
          "/primary_ips",
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
