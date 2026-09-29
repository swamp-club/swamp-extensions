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

// Auto-generated extension model for @swamp/hetzner-cloud/load-balancer-types
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud load balancer type.
 *
 * Wraps the `/load_balancer_types` API as a swamp model so get, list, adopt
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
  max_connections: z.number().optional(),
  max_services: z.number().optional(),
  max_targets: z.number().optional(),
  max_assigned_certificates: z.number().optional(),
  deprecated: z.unknown().optional(),
  deprecation: z.unknown().optional(),
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
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud load balancer type. Registered at `@swamp/hetzner-cloud/load-balancer-types`. */
export const model = {
  type: "@swamp/hetzner-cloud/load-balancer-types",
  version: "2026.09.29.1",
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
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Load balancer type resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a load balancer type",
      arguments: z.object({
        id: z.number().int().describe("The ID of the load balancer type"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/load_balancer_types",
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
        "List load balancer types, optionally filtered by a Hetzner label selector or name",
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
          "/load_balancer_types",
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
    adopt: {
      description:
        "Adopt an existing load balancer type by ID into managed state",
      arguments: z.object({
        id: z.number().int().describe(
          "The ID of the load balancer type to adopt",
        ),
        expected_name: z.string().describe(
          "Expected name for identity validation",
        ).optional(),
      }),
      execute: async (
        args: { id: number; expected_name?: string },
        context: any,
      ) => {
        const result = await read(
          "/load_balancer_types",
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
  },
};
