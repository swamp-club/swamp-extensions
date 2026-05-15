// Auto-generated extension model for @swamp/digitalocean/database-cluster
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database cluster.
 *
 * Wraps the `/v2/databases` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  discover,
  pollResourceReady,
  read,
  remove,
  subResourceUpdate,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "A unique, human-readable name referring to a database cluster.",
  ),
  engine: z.enum([
    "pg",
    "mysql",
    "redis",
    "valkey",
    "mongodb",
    "kafka",
    "opensearch",
    "advanced_pg",
    "advanced_mysql",
  ]).describe(
    'A slug representing the database engine used for the cluster. The possible values are: "pg" for PostgreSQL, "mysql" for MySQL, "redis" for Caching, "mongodb" for MongoDB, "kafka" for Kafka, "opensearch" for OpenSearch, "valkey" for Valkey, "advanced_pg" for PostgreSQL Advanced Edition, and "advanced_mysql" for MySQL Advanced Edition. Advanced Edition engines are currently in public preview.',
  ),
  version: z.string().describe(
    "A string representing the version of the database engine in use for the cluster.",
  ).optional(),
  num_nodes: z.number().int().describe(
    "The number of nodes in the database cluster.",
  ),
  size: z.string().describe(
    "The slug identifier representing the size of the nodes in the database cluster.",
  ),
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
    "The slug identifier for the region where the database cluster is located.",
  ),
  private_network_uuid: z.string().regex(
    new RegExp(
      "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
    ),
  ).describe(
    "A string specifying the UUID of the VPC to which the database cluster will be assigned. If excluded, the cluster when creating a new database cluster, it will be assigned to your account's default VPC for the region. <br><br>Requires `vpc:read` scope.",
  ).optional(),
  tags: z.array(z.string()).describe(
    "An array of tags (as strings) to apply to the database cluster. <br><br>Requires `tag:create` scope.",
  ).optional(),
  ui_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).describe("The connection details for OpenSearch dashboard. ").optional(),
  schema_registry_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).describe("The connection details for Schema Registry.").optional(),
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
  maintenance_window: z.object({
    day: z.string(),
    hour: z.string(),
    pending: z.boolean().optional(),
    description: z.array(z.string()).optional(),
  }).optional(),
  project_id: z.string().describe(
    "The ID of the project that the database cluster is assigned to. If excluded when creating a new database cluster, it will be assigned to your default project.<br><br>Requires `project:update` scope.",
  ).optional(),
  rules: z.array(z.object({
    uuid: z.string().regex(
      new RegExp(
        "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
      ),
    ).optional(),
    cluster_uuid: z.string().regex(
      new RegExp(
        "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
      ),
    ).optional(),
    type: z.enum(["droplet", "k8s", "ip_addr", "tag", "app"]),
    value: z.string(),
    created_at: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  storage_size_mib: z.number().int().describe(
    "Additional storage added to the cluster, in MiB. If null, no additional storage is added to the cluster, beyond what is provided as a base amount from the 'size' and any previously added additional storage.",
  ).optional(),
  autoscale: z.object({
    storage: z.object({
      enabled: z.boolean(),
      threshold_percent: z.number().int().min(15).max(95).optional(),
      increment_gib: z.number().int().min(10).max(500).optional(),
    }).optional(),
  }).describe(
    "Autoscaling configuration for the database cluster. Currently only supports storage autoscaling. If null, autoscaling is not configured for the cluster.",
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
  backup_restore: z.object({
    database_name: z.string(),
    backup_created_at: z.string().optional(),
  }).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  engine: z.string().optional(),
  version: z.string().optional(),
  semantic_version: z.string().optional(),
  num_nodes: z.number().optional(),
  size: z.string().optional(),
  region: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  private_network_uuid: z.string().optional(),
  tags: z.array(z.string()).nullable().optional(),
  db_names: z.array(z.string()).nullable().optional(),
  ui_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  schema_registry_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
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
  users: z.array(z.object({
    name: z.string().optional(),
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
  })).nullable().optional(),
  maintenance_window: z.object({
    day: z.string().optional(),
    hour: z.string().optional(),
    pending: z.boolean().optional(),
    description: z.array(z.string()).optional(),
  }).nullable().optional(),
  project_id: z.string().optional(),
  rules: z.array(z.object({
    uuid: z.string().optional(),
    cluster_uuid: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
    created_at: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  version_end_of_life: z.string().optional(),
  version_end_of_availability: z.string().optional(),
  storage_size_mib: z.number().optional(),
  metrics_endpoints: z.array(z.object({
    host: z.string().optional(),
    port: z.number().optional(),
  })).optional(),
  do_settings: z.object({
    service_cnames: z.array(z.string()).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  engine: z.enum([
    "pg",
    "mysql",
    "redis",
    "valkey",
    "mongodb",
    "kafka",
    "opensearch",
    "advanced_pg",
    "advanced_mysql",
  ]).optional(),
  version: z.string().optional(),
  num_nodes: z.number().int().optional(),
  size: z.string().optional(),
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
  private_network_uuid: z.string().regex(
    new RegExp(
      "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
    ),
  ).optional(),
  tags: z.array(z.string()).optional(),
  ui_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
  schema_registry_connection: z.object({
    uri: z.string().optional(),
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    password: z.string().optional(),
    ssl: z.boolean().optional(),
  }).optional(),
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
  maintenance_window: z.object({
    day: z.string(),
    hour: z.string(),
    pending: z.boolean().optional(),
    description: z.array(z.string()).optional(),
  }).optional(),
  project_id: z.string().optional(),
  rules: z.array(z.object({
    uuid: z.string().regex(
      new RegExp(
        "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
      ),
    ).optional(),
    cluster_uuid: z.string().regex(
      new RegExp(
        "^$|[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}",
      ),
    ).optional(),
    type: z.enum(["droplet", "k8s", "ip_addr", "tag", "app"]),
    value: z.string(),
    created_at: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  storage_size_mib: z.number().int().optional(),
  autoscale: z.object({
    storage: z.object({
      enabled: z.boolean(),
      threshold_percent: z.number().int().min(15).max(95).optional(),
      increment_gib: z.number().int().min(10).max(500).optional(),
    }).optional(),
  }).optional(),
  do_settings: z.object({
    service_cnames: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$",
        ),
      ),
    ).optional(),
  }).optional(),
  backup_restore: z.object({
    database_name: z.string(),
    backup_created_at: z.string().optional(),
  }).optional(),
});

/** Swamp extension model for DigitalOcean database cluster. Registered at `@swamp/digitalocean/database-cluster`. */
export const model = {
  type: "@swamp/digitalocean/database-cluster",
  version: "2026.05.15.1",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database Cluster resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database cluster",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { checkExists?: boolean; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/databases",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.engine !== undefined) body.engine = g.engine;
        if (g.version !== undefined) body.version = g.version;
        if (g.num_nodes !== undefined) body.num_nodes = g.num_nodes;
        if (g.size !== undefined) body.size = g.size;
        if (g.region !== undefined) body.region = g.region;
        if (g.private_network_uuid !== undefined) {
          body.private_network_uuid = g.private_network_uuid;
        }
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.ui_connection !== undefined) body.ui_connection = g.ui_connection;
        if (g.schema_registry_connection !== undefined) {
          body.schema_registry_connection = g.schema_registry_connection;
        }
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
        if (g.maintenance_window !== undefined) {
          body.maintenance_window = g.maintenance_window;
        }
        if (g.project_id !== undefined) body.project_id = g.project_id;
        if (g.rules !== undefined) body.rules = g.rules;
        if (g.storage_size_mib !== undefined) {
          body.storage_size_mib = g.storage_size_mib;
        }
        if (g.autoscale !== undefined) body.autoscale = g.autoscale;
        if (g.do_settings !== undefined) body.do_settings = g.do_settings;
        if (g.backup_restore !== undefined) {
          body.backup_restore = g.backup_restore;
        }
        let result = await create("/v2/databases", body) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.id ?? result.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/databases",
              resourceId as string | number,
              {
                "statusField": "status",
                "readyValues": ["online"],
                "failedValues": ["error"],
              },
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    delete: {
      description: "Delete the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const { existed } = await remove("/v2/databases", args.id);
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
      description: "Sync database cluster state from DigitalOcean",
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
          "/v2/databases",
          existing.id ?? existing.id,
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
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    autoscale: {
      description: "autoscale the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        storage: z.record(z.string(), z.unknown()).describe(
          "Configuration for database cluster storage autoscaling",
        ).optional(),
      }),
      execute: async (
        args: { id: string; storage?: Record<string, unknown> },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.storage !== undefined) body.storage = args.storage;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "autoscale",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    config: {
      description: "config the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        config: z.record(z.string(), z.unknown()).optional(),
      }),
      execute: async (
        args: { id: string; config?: Record<string, unknown> },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.config !== undefined) body.config = args.config;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "config",
          body,
          "PATCH",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    eviction_policy: {
      description: "eviction policy the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        eviction_policy: z.enum([
          "noeviction",
          "allkeys_lru",
          "allkeys_random",
          "volatile_lru",
          "volatile_random",
          "volatile_ttl",
        ]).describe(
          "A string specifying the desired eviction policy for a Caching or Valkey cluster.\n\n- `noeviction`: Don't evict any data, returns error when memory limit is reached.\n- `allkeys_lru:` Evict any key, least recently used (LRU) first.\n- `allkeys_random`: Evict keys in a random order.\n- `volatile_lru`: Evict keys with expiration only, least recently used (LRU) first.\n- `volatile_random`: Evict keys with expiration only in a random order.\n- `volatile_ttl`: Evict keys with expiration only, shortest time-to-live (TTL) first.",
        ),
      }),
      execute: async (
        args: { id: string; eviction_policy: string },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.eviction_policy !== undefined) {
          body.eviction_policy = args.eviction_policy;
        }
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "eviction_policy",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    firewall: {
      description: "firewall the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        rules: z.array(z.record(z.string(), z.unknown())).optional(),
      }),
      execute: async (
        args: { id: string; rules?: unknown[] },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.rules !== undefined) body.rules = args.rules;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "firewall",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    install_update: {
      description: "install update the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const body: Record<string, unknown> = {};
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "install_update",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    maintenance: {
      description: "maintenance the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        day: z.string().describe(
          "The day of the week on which to apply maintenance updates.",
        ),
        hour: z.string().describe(
          "The hour in UTC at which maintenance updates will be applied in 24 hour format.",
        ),
      }),
      execute: async (
        args: { id: string; day: string; hour: string },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.day !== undefined) body.day = args.day;
        if (args.hour !== undefined) body.hour = args.hour;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "maintenance",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    migrate: {
      description: "migrate the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        region: z.string().describe(
          "A slug identifier for the region to which the database cluster will be migrated.",
        ),
      }),
      execute: async (args: { id: string; region: string }, context: any) => {
        const body: Record<string, unknown> = {};
        if (args.region !== undefined) body.region = args.region;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "migrate",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    resize: {
      description: "resize the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        size: z.string().describe(
          "A slug identifier representing desired the size of the nodes in the database cluster.",
        ),
        num_nodes: z.number().int().describe(
          "The number of nodes in the database cluster. Valid values are are 1-3. In addition to the primary node, up to two standby nodes may be added for highly available configurations.",
        ),
        storage_size_mib: z.number().int().describe(
          "Additional storage added to the cluster, in MiB. If null, no additional storage is added to the cluster, beyond what is provided as a base amount from the 'size' and any previously added additional storage.",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string;
          size: string;
          num_nodes: number;
          storage_size_mib?: number;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.size !== undefined) body.size = args.size;
        if (args.num_nodes !== undefined) body.num_nodes = args.num_nodes;
        if (args.storage_size_mib !== undefined) {
          body.storage_size_mib = args.storage_size_mib;
        }
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "resize",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    sql_mode: {
      description: "sql mode the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        sql_mode: z.string().describe(
          "A string specifying the configured SQL modes for the MySQL cluster.",
        ),
      }),
      execute: async (args: { id: string; sql_mode: string }, context: any) => {
        const body: Record<string, unknown> = {};
        if (args.sql_mode !== undefined) body.sql_mode = args.sql_mode;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "sql_mode",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    upgrade: {
      description: "upgrade the database cluster",
      arguments: z.object({
        id: z.string().describe("The UUID of the database cluster"),
        version: z.string().describe(
          "A string representing the version of the database engine in use for the cluster.",
        ).optional(),
      }),
      execute: async (args: { id: string; version?: string }, context: any) => {
        const body: Record<string, unknown> = {};
        if (args.version !== undefined) body.version = args.version;
        await subResourceUpdate(
          "/v2/databases",
          args.id,
          "upgrade",
          body,
          "PUT",
        );
        const result = await read("/v2/databases", args.id) as ResourceData;
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
    list_options: {
      description:
        "List available options for database cluster (versions, sizes, regions)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const result = await discover("/v2/databases/options");
        const handle = await context.writeResource("state", "options", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
