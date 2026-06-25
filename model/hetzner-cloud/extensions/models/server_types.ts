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

// Auto-generated extension model for @swamp/hetzner-cloud/server-types
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud server type.
 *
 * Wraps the `/server_types` API as a swamp model so get, list
 * can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { listAll, read } from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
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
  deprecation: z.unknown().optional(),
  locations: z.array(z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    deprecation: z.unknown().optional(),
    recommended: z.boolean().optional(),
    available: z.boolean().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud server type. Registered at `@swamp/hetzner-cloud/server-types`. */
export const model = {
  type: "@swamp/hetzner-cloud/server-types",
  version: "2026.06.25.1",
  upgrades: [
    {
      toVersion: "2026.06.10.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Server type resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a server type",
      arguments: z.object({
        id: z.number().int().describe("The ID of the server type"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/server_types",
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
    list: {
      description:
        "List server types, optionally filtered by a Hetzner label selector",
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
          "/server_types",
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
