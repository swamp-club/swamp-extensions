// Auto-generated extension model for @swamp/digitalocean/monitoring-sink
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean monitoring sink.
 *
 * Wraps the `/v2/monitoring/sinks` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  destination_uuid: z.string().describe(
    "A unique identifier for an already-existing destination.",
  ).optional(),
  resources: z.array(z.object({
    urn: z.string().regex(new RegExp("^do:kubernetes:.*")),
    name: z.string().optional(),
  })).describe("List of resources identified by their URNs.").optional(),
});

const ResourceSchema = z.object({
  destination: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
    config: z.object({
      id: z.string().optional(),
      credentials: z.object({
        username: z.string().optional(),
        password: z.string().optional(),
      }).optional(),
      endpoint: z.string().optional(),
      cluster_uuid: z.string().optional(),
      cluster_name: z.string().optional(),
      index_name: z.string().optional(),
      retention_days: z.number().optional(),
    }).optional(),
  }).optional(),
  resources: z.array(z.object({
    urn: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  destination_uuid: z.string().optional(),
  resources: z.array(z.object({
    urn: z.string().regex(new RegExp("^do:kubernetes:.*")),
    name: z.string().optional(),
  })).optional(),
});

/** Swamp extension model for DigitalOcean monitoring sink. Registered at `@swamp/digitalocean/monitoring-sink`. */
export const model = {
  type: "@swamp/digitalocean/monitoring-sink",
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
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
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Monitoring Sink resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a monitoring sink",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.destination_uuid !== undefined) {
          body.destination_uuid = g.destination_uuid;
        }
        if (g.resources !== undefined) body.resources = g.resources;
        const result = await create(
          "/v2/monitoring/sinks",
          body,
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
      description: "Get a monitoring sink",
      arguments: z.object({
        id: z.string().describe("The UUID of the monitoring sink"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const result = await read(
          "/v2/monitoring/sinks",
          args.id,
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
    delete: {
      description: "Delete the monitoring sink",
      arguments: z.object({
        id: z.string().describe("The UUID of the monitoring sink"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const { existed } = await remove("/v2/monitoring/sinks", args.id);
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
      description: "Sync monitoring sink state from DigitalOcean",
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
          "/v2/monitoring/sinks",
          existing.sinkuuid ?? existing.id,
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
          sinkuuid: existing.sinkuuid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
