// Auto-generated extension model for @swamp/digitalocean/database-logsink
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database logsink.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/logsink` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  config: z.object({
    server: z.string().optional(),
    port: z.number().int().max(65535).optional(),
    tls: z.boolean().optional(),
    format: z.enum(["rfc5424", "rfc3164", "custom"]).optional(),
    logline: z.string().optional(),
    sd: z.string().optional(),
    ca: z.string().optional(),
    key: z.string().optional(),
    cert: z.string().optional(),
    url: z.string().optional(),
    index_prefix: z.string().optional(),
    index_days_max: z.number().int().min(1).max(10000).optional(),
    timeout: z.number().min(10).max(120).optional(),
    site: z.string().optional(),
    datadog_api_key: z.string().optional(),
  }).describe(
    "Configuration for Datadog integration **applicable only to MongoDB clusters**.\n",
  ),
  sink_name: z.string().describe("The name of the Logsink"),
  sink_type: z.enum(["rsyslog", "elasticsearch", "opensearch", "datadog"])
    .describe(
      "Type of logsink integration.\n\n- Use `datadog` for Datadog integration **only with MongoDB clusters**.\n- For non-MongoDB clusters, use `rsyslog` for general syslog forwarding.\n- Other supported types include `elasticsearch` and `opensearch`.\n\nMore details about the configuration can be found in the `config` property.\n",
    ),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  sink_id: z.string(),
  sink_name: z.string().optional(),
  sink_type: z.string().optional(),
  config: z.object({
    server: z.string().optional(),
    port: z.number().optional(),
    tls: z.boolean().optional(),
    format: z.string().optional(),
    logline: z.string().optional(),
    sd: z.string().optional(),
    ca: z.string().optional(),
    key: z.string().optional(),
    cert: z.string().optional(),
    url: z.string().optional(),
    index_prefix: z.string().optional(),
    index_days_max: z.number().optional(),
    timeout: z.number().optional(),
    site: z.string().optional(),
    datadog_api_key: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  name: z.string().optional(),
  config: z.object({
    server: z.string().optional(),
    port: z.number().int().max(65535).optional(),
    tls: z.boolean().optional(),
    format: z.enum(["rfc5424", "rfc3164", "custom"]).optional(),
    logline: z.string().optional(),
    sd: z.string().optional(),
    ca: z.string().optional(),
    key: z.string().optional(),
    cert: z.string().optional(),
    url: z.string().optional(),
    index_prefix: z.string().optional(),
    index_days_max: z.number().int().min(1).max(10000).optional(),
    timeout: z.number().min(10).max(120).optional(),
    site: z.string().optional(),
    datadog_api_key: z.string().optional(),
  }).optional(),
  sink_name: z.string().optional(),
  sink_type: z.enum(["rsyslog", "elasticsearch", "opensearch", "datadog"])
    .optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean database logsink. Registered at `@swamp/digitalocean/database-logsink`. */
export const model = {
  type: "@swamp/digitalocean/database-logsink",
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
      description: "Database Logsink resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database logsink",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/logsink`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.sink_name !== undefined) body.sink_name = g.sink_name;
        if (g.sink_type !== undefined) body.sink_type = g.sink_type;
        if (g.config !== undefined) body.config = g.config;
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
      description: "Get a database logsink",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the database logsink",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/logsink`;
        const result = await read(
          endpoint,
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
    update: {
      description: "Update database logsink attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/logsink`;
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
        if (g.config !== undefined) body.config = g.config;
        const result = await update(
          endpoint,
          existing.sink_id ?? existing.id,
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
      description: "Delete the database logsink",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the database logsink",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/logsink`;
        const { existed } = await remove(
          endpoint,
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
      description: "Sync database logsink state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/databases/${g.database_cluster_uuid}/logsink`;
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
          existing.sink_id ?? existing.id,
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
          sink_id: existing.sink_id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
