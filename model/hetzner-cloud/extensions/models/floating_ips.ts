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

// Auto-generated extension model for @swamp/hetzner-cloud/floating-ips
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud floating ip.
 *
 * Wraps the `/floating_ips` API as a swamp model so create, get, update, delete, sync, list, lookup, adopt, change_protection
 * can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  postAction,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  description: z.unknown().describe("Description of the Resource.").optional(),
  name: z.string().min(1).max(255).describe(
    "Name of the Resource. Must be unique per Project.\n\nA name will be generated if none is given.\n",
  ).optional(),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  type: z.enum(["ipv4", "ipv6"]).describe("The Floating IP type.").optional(),
  server: z.unknown().describe(
    "[Server](#tag/servers) the [Floating IP](#tag/floating-ips) is assigned to.\n\n`null` if not assigned.\n",
  ).optional(),
  home_location: z.string().describe(
    "Home [Location](#tag/locations) for the [Floating IP](#tag/floating-ips).\n\nEither the ID or the name of the [Location](#tag/locations).\n\nOnly optional if no [Server](#tag/servers) is provided. Routing is optimized for this [Locations](#tag/locations).\n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.unknown().optional(),
  ip: z.string().optional(),
  type: z.string().optional(),
  server: z.unknown().optional(),
  dns_ptr: z.array(z.object({
    ip: z.string().optional(),
    dns_ptr: z.string().optional(),
  })).optional(),
  home_location: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    network_zone: z.string().optional(),
  }).optional(),
  blocked: z.boolean().optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  description: z.unknown().optional(),
  name: z.string().min(1).max(255).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  type: z.enum(["ipv4", "ipv6"]).optional(),
  server: z.unknown().optional(),
  home_location: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud floating ip. Registered at `@swamp/hetzner-cloud/floating-ips`. */
export const model = {
  type: "@swamp/hetzner-cloud/floating-ips",
  version: "2026.09.29.2",
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
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Floating ip resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a floating ip",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["type"].filter((k) =>
          g[k] === undefined || g[k] === null || g[k] === ""
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const body: Record<string, unknown> = {};
        if (g.type !== undefined) body.type = g.type;
        if (g.server !== undefined) body.server = g.server;
        if (g.home_location !== undefined) body.home_location = g.home_location;
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await create(
          "/floating_ips",
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
      description: "Get a floating ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the floating ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/floating_ips",
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
      description: "Update floating ip attributes",
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
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/floating_ips",
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
      description: "Delete the floating ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the floating ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/floating_ips",
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
      description: "Sync floating ip state from Hetzner",
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
        const result = await tryRead("/floating_ips", existing.id, g.token) as
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
        "List floating ips, optionally filtered by a Hetzner label selector or name",
      arguments: z.object({
        label_selector: z.string().describe(
          "Hetzner label selector to filter results, e.g. env=production,role!=db",
        ).optional(),
        name: z.string().describe("Filter resources by their name.").optional(),
      }),
      execute: async (
        args: { label_selector?: string; name?: string },
        context: any,
      ) => {
        const g = context.globalArgs;
        const queryParams: Record<string, string> = {};
        if (args.label_selector !== undefined) {
          queryParams.label_selector = args.label_selector;
        }
        if (args.name !== undefined) queryParams.name = args.name;
        const items = await listAll(
          "/floating_ips",
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
    lookup: {
      description:
        "Find an existing floating ip by name and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const expectedName = g.name;
        if (!expectedName) {
          throw new Error("globalArgs.name is required for lookup");
        }
        const items = await listAll(
          "/floating_ips",
          {},
          g.token,
        ) as ResourceData[];
        const matches = items.filter((item) => item.name === expectedName);
        if (matches.length === 0) {
          throw new Error(`No floating ip found matching name=${expectedName}`);
        }
        if (matches.length > 1) {
          throw new Error(
            `Multiple floating ips found matching name=${expectedName} (found ${matches.length}). Use adopt with a specific ID instead.`,
          );
        }
        const result = matches[0];
        const instanceName = (result.name?.toString() ?? "current").replace(
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
    adopt: {
      description: "Adopt an existing floating ip by ID into managed state",
      arguments: z.object({
        id: z.number().int().describe("The ID of the floating ip to adopt"),
        expected_name: z.string().describe(
          "Expected name for identity validation",
        ).optional(),
      }),
      execute: async (
        args: { id: number; expected_name?: string },
        context: any,
      ) => {
        const result = await read(
          "/floating_ips",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        if (
          args.expected_name !== undefined && result.name !== args.expected_name
        ) {
          throw new Error(
            `Identity mismatch: expected name=${args.expected_name} but got ${result.name}`,
          );
        }
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
    change_protection: {
      description: "Change delete/rebuild protection for the floating ip",
      arguments: z.object({
        delete: z.boolean().describe(
          "Prevent the floating ip from being deleted",
        ),
      }),
      execute: async (args: { delete: boolean }, context: any) => {
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
          throw new Error("No data found - run create, lookup, or adopt first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (args.delete !== undefined) body.delete = args.delete;
        await postAction(
          "/floating_ips",
          existing.id,
          "change_protection",
          body,
          g.token,
        );
        const result = await read(
          "/floating_ips",
          existing.id,
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
  },
};
