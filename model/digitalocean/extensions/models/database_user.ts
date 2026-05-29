// Auto-generated extension model for @swamp/digitalocean/database-user
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database user.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/users` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  settings: z.object({
    pg_allow_replication: z.boolean().optional(),
    opensearch_acl: z.array(z.object({
      index: z.string().optional(),
      permission: z.enum(["deny", "admin", "read", "readwrite", "write"])
        .optional(),
    })).optional(),
    acl: z.array(z.object({
      id: z.string().optional(),
      topic: z.string(),
      permission: z.enum(["admin", "consume", "produce", "produceconsume"]),
    })).optional(),
    mongo_user_settings: z.object({
      databases: z.array(z.string()).optional(),
      role: z.enum(["readOnly", "readWrite", "dbAdmin"]).optional(),
    }).optional(),
  }).optional(),
  name: z.string().describe("The name of a database user."),
  mysql_settings: z.object({
    auth_plugin: z.enum(["mysql_native_password", "caching_sha2_password"]),
  }).optional(),
  readonly: z.boolean().describe(
    "(To be deprecated: use settings.mongo_user_settings.role instead for access controls to MongoDB databases). \nFor MongoDB clusters, set to `true` to create a read-only user.\nThis option is not currently supported for other database engines.\n           \n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  password: z.string().optional(),
  access_cert: z.string().optional(),
  access_key: z.string().optional(),
  mysql_settings: z.object({
    auth_plugin: z.string().optional(),
  }).optional(),
  settings: z.object({
    pg_allow_replication: z.boolean().optional(),
    opensearch_acl: z.array(z.object({
      index: z.string().optional(),
      permission: z.string().optional(),
    })).optional(),
    acl: z.array(z.object({
      id: z.string().optional(),
      topic: z.string().optional(),
      permission: z.string().optional(),
    })).optional(),
    mongo_user_settings: z.object({
      databases: z.array(z.string()).optional(),
      role: z.string().optional(),
    }).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  settings: z.object({
    pg_allow_replication: z.boolean().optional(),
    opensearch_acl: z.array(z.object({
      index: z.string().optional(),
      permission: z.enum(["deny", "admin", "read", "readwrite", "write"])
        .optional(),
    })).optional(),
    acl: z.array(z.object({
      id: z.string().optional(),
      topic: z.string(),
      permission: z.enum(["admin", "consume", "produce", "produceconsume"]),
    })).optional(),
    mongo_user_settings: z.object({
      databases: z.array(z.string()).optional(),
      role: z.enum(["readOnly", "readWrite", "dbAdmin"]).optional(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  mysql_settings: z.object({
    auth_plugin: z.enum(["mysql_native_password", "caching_sha2_password"]),
  }).optional(),
  readonly: z.boolean().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean database user. Registered at `@swamp/digitalocean/database-user`. */
export const model = {
  type: "@swamp/digitalocean/database-user",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database User resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database user",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/users`;
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
        if (g.mysql_settings !== undefined) {
          body.mysql_settings = g.mysql_settings;
        }
        if (g.settings !== undefined) body.settings = g.settings;
        if (g.readonly !== undefined) body.readonly = g.readonly;
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
      description: "Get a database user",
      arguments: z.object({
        name: z.string().describe("The name of the database user"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/users`;
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
    update: {
      description: "Update database user attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/users`;
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
        if (g.settings !== undefined) body.settings = g.settings;
        const result = await update(
          endpoint,
          existing.name ?? existing.id,
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
      description: "Delete the database user",
      arguments: z.object({
        name: z.string().describe("The name of the database user"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/users`;
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
      description: "Sync database user state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/users`;
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
