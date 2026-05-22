// Auto-generated extension model for @swamp/digitalocean/database-schema-registry
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean database schema registry.
 *
 * Wraps the `/v2/databases/{database_cluster_uuid}/schema-registry` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  database_cluster_uuid: z.string().describe("Parent resource identifier"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  subject_name: z.string().describe("The name of the schema subject."),
  schema_type: z.enum(["AVRO", "JSON", "PROTOBUF"]).describe(
    "The type of the schema.",
  ),
  schema: z.string().describe("The schema definition in the specified format."),
});

const ResourceSchema = z.object({
  schema_id: z.number().optional(),
  version: z.string().optional(),
  subject_name: z.string(),
  schema_type: z.string().optional(),
  schema: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  database_cluster_uuid: z.string().optional(),
  name: z.string().optional(),
  subject_name: z.string().optional(),
  schema_type: z.enum(["AVRO", "JSON", "PROTOBUF"]).optional(),
  schema: z.string().optional(),
});

/** Swamp extension model for DigitalOcean database schema registry. Registered at `@swamp/digitalocean/database-schema-registry`. */
export const model = {
  type: "@swamp/digitalocean/database-schema-registry",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Database Schema Registry resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a database schema registry",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint =
          `/v2/databases/${g.database_cluster_uuid}/schema-registry`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.subject_name !== undefined) body.subject_name = g.subject_name;
        if (g.schema_type !== undefined) body.schema_type = g.schema_type;
        if (g.schema !== undefined) body.schema = g.schema;
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
      description: "Get a database schema registry",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the database schema registry",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint =
          `/v2/databases/${g.database_cluster_uuid}/schema-registry`;
        const result = await read(endpoint, args.id) as ResourceData;
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
    delete: {
      description: "Delete the database schema registry",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the database schema registry",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint =
          `/v2/databases/${g.database_cluster_uuid}/schema-registry`;
        const { existed } = await remove(endpoint, args.id);
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
      description: "Sync database schema registry state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint =
          `/v2/databases/${g.database_cluster_uuid}/schema-registry`;
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
          existing.subject_name ?? existing.id,
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
          subject_name: existing.subject_name ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
