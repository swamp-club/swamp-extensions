// Auto-generated extension model for @swamp/digitalocean/database-pool
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database pool.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/pools` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  mode: z.string().describe(
    "The PGBouncer transaction mode for the connection pool. The allowed values are session, transaction, and statement.",
  ),
  size: z.number().int().describe(
    "The desired size of the PGBouncer connection pool. The maximum allowed size is determined by the size of the cluster's primary node. 25 backend server connections are allowed for every 1GB of RAM. Three are reserved for maintenance. For example, a primary node with 1 GB of RAM allows for a maximum of 22 backend server connections while one with 4 GB would allow for 97. Note that these are shared across all connection pools in a cluster.",
  ),
  db: z.string().describe("The database for use with the connection pool."),
  user: z.string().describe(
    "The name of the user for use with the connection pool. When excluded, all sessions connect to the database as the inbound user.",
  ).optional(),
  name: z.string().describe(
    "A unique name for the connection pool. Must be between 3 and 60 characters.",
  ),
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
  standby_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  standby_private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
});

const ResourceSchema = z.object({
  name: z.string(),
  mode: z.string().optional(),
  size: z.number().optional(),
  db: z.string().optional(),
  user: z.string().optional(),
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
  standby_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  standby_private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  mode: z.string().optional(),
  size: z.number().int().optional(),
  db: z.string().optional(),
  user: z.string().optional(),
  name: z.string().optional(),
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
  standby_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  standby_private_connection: z.object({
    uri: z.string().optional(),
    database: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
});

/** Swamp extension model for DigitalOcean database pool. Registered at `@swamp/digitalocean/database-pool`. */
export const model = {
  type: "@swamp/digitalocean/database-pool",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database Pool resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database pool",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/pools`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryRead(endpoint, g.name);
          if (existing) {
            throw new Error(`Resource already exists: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.size !== undefined) body.size = g.size;
        if (g.db !== undefined) body.db = g.db;
        if (g.user !== undefined) body.user = g.user;
        if (g.connection !== undefined) body.connection = g.connection;
        if (g.private_connection !== undefined) {
          body.private_connection = g.private_connection;
        }
        if (g.standby_connection !== undefined) {
          body.standby_connection = g.standby_connection;
        }
        if (g.standby_private_connection !== undefined) {
          body.standby_private_connection = g.standby_private_connection;
        }
        const result = await create(endpoint, body) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a database pool",
      arguments: z.object({
        name: z.string().describe("The name of the database pool"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/pools`;
        const result = await read(endpoint, args.name) as ResourceData;
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
    update: {
      description: "Update database pool attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/pools`;
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
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.size !== undefined) body.size = g.size;
        if (g.db !== undefined) body.db = g.db;
        if (g.user !== undefined) body.user = g.user;
        const result = await update(
          endpoint,
          existing.name ?? existing.id,
          body,
          "PUT",
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
      description: "Delete the database pool",
      arguments: z.object({
        name: z.string().describe("The name of the database pool"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/pools`;
        const { existed } = await remove(endpoint, args.name);
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
      description: "Sync database pool state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/pools`;
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
        const result = await tryRead(endpoint, existing.name ?? existing.id) as
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
          name: existing.name ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
