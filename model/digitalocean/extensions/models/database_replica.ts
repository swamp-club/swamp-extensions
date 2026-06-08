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

// Auto-generated extension model for @swamp/digitalocean/database-replica
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database replica.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/replicas` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  name: z.string().describe("The name to give the read-only replicating"),
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
    "A slug identifier for the region where the read-only replica will be located. If excluded, the replica will be placed in the same region as the cluster.",
  ).optional(),
  size: z.string().describe(
    "A slug identifier representing the size of the node for the read-only replica. The size of the replica must be at least as large as the node size for the database cluster from which it is replicating.",
  ),
  tags: z.array(z.string()).describe(
    "A flat array of tag names as strings to apply to the read-only replica after it is created. Tag names can either be existing or new tags. <br><br>Requires `tag:create` scope.",
  ).optional(),
  private_network_uuid: z.string().describe(
    "A string specifying the UUID of the VPC to which the read-only replica will be assigned. If excluded, the replica will be assigned to your account's default VPC for the region. <br><br>Requires `vpc:read` scope.",
  ).optional(),
  connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  storage_size_mib: z.number().int().describe(
    "Additional storage added to the cluster, in MiB. If null, no additional storage is added to the cluster, beyond what is provided as a base amount from the 'size' and any previously added additional storage.",
  ).optional(),
  do_settings: z.object({
    service_cnames: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$",
        ),
      ),
    ).optional(),
  }).describe("DigitalOcean-specific settings for the database cluster.")
    .optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string().optional(),
  size: z.string().optional(),
  status: z.string().optional(),
  tags: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  private_network_uuid: z.string().optional(),
  connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  storage_size_mib: z.number().optional(),
  do_settings: z.object({
    service_cnames: z.array(z.string()).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  name: z.string().optional(),
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
  size: z.string().optional(),
  tags: z.array(z.string()).optional(),
  private_network_uuid: z.string().optional(),
  connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  storage_size_mib: z.number().int().optional(),
  do_settings: z.object({
    service_cnames: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$",
        ),
      ),
    ).optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean database replica. Registered at `@swamp/digitalocean/database-replica`. */
export const model = {
  type: "@swamp/digitalocean/database-replica",
  version: "2026.06.08.1",
  upgrades: [
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
      description: "Database Replica resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database replica",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/replicas`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryRead(endpoint, g.name, undefined, g.token);
          if (existing) {
            throw new Error(`Resource already exists: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.region !== undefined) body.region = g.region;
        if (g.size !== undefined) body.size = g.size;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.private_network_uuid !== undefined) {
          body.private_network_uuid = g.private_network_uuid;
        }
        if (g.connection !== undefined) body.connection = g.connection;
        if (g.private_connection !== undefined) {
          body.private_connection = g.private_connection;
        }
        if (g.storage_size_mib !== undefined) {
          body.storage_size_mib = g.storage_size_mib;
        }
        if (g.do_settings !== undefined) body.do_settings = g.do_settings;
        const result = await create(
          endpoint,
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
      description: "Get a database replica",
      arguments: z.object({
        name: z.string().describe("The name of the database replica"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/replicas`;
        const result = await read(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.name.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the database replica",
      arguments: z.object({
        name: z.string().describe("The name of the database replica"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/replicas`;
        const { existed } = await remove(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.name.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          name: args.name,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync database replica state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/replicas`;
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
          endpoint,
          existing.name ?? existing.id,
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
          name: existing.name ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
