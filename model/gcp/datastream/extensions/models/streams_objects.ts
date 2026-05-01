// Auto-generated extension model for @swamp/gcp/datastream/streams-objects
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Datastream Streams.Objects.
 *
 * A specific stream object (e.g a specific DB table).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/objects/${shortName}`;
}

const BASE_URL = "https://datastream.googleapis.com/";

const GET_CONFIG = {
  "id": "datastream.projects.locations.streams.objects.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backfillJob: z.object({
    errors: z.array(z.object({
      details: z.record(z.string(), z.unknown()),
      errorTime: z.string(),
      errorUuid: z.string(),
      message: z.string(),
      reason: z.string(),
    })),
    eventFilter: z.object({
      sqlWhereClause: z.string(),
    }),
    lastEndTime: z.string(),
    lastStartTime: z.string(),
    state: z.string(),
    trigger: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  customizationRules: z.array(z.object({
    bigqueryClustering: z.object({
      columns: z.array(z.string()),
    }),
    bigqueryPartitioning: z.object({
      ingestionTimePartition: z.object({
        partitioningTimeGranularity: z.string(),
      }),
      integerRangePartition: z.object({
        column: z.string(),
        end: z.string(),
        interval: z.string(),
        start: z.string(),
      }),
      requirePartitionFilter: z.boolean(),
      timeUnitPartition: z.object({
        column: z.string(),
        partitioningTimeGranularity: z.string(),
      }),
    }),
  })).optional(),
  displayName: z.string().optional(),
  errors: z.array(z.object({
    details: z.record(z.string(), z.unknown()),
    errorTime: z.string(),
    errorUuid: z.string(),
    message: z.string(),
    reason: z.string(),
  })).optional(),
  name: z.string(),
  sourceObject: z.object({
    mongodbIdentifier: z.object({
      collection: z.string(),
      database: z.string(),
    }),
    mysqlIdentifier: z.object({
      database: z.string(),
      table: z.string(),
    }),
    oracleIdentifier: z.object({
      schema: z.string(),
      table: z.string(),
    }),
    postgresqlIdentifier: z.object({
      schema: z.string(),
      table: z.string(),
    }),
    salesforceIdentifier: z.object({
      objectName: z.string(),
    }),
    spannerIdentifier: z.object({
      schema: z.string(),
      table: z.string(),
    }),
    sqlServerIdentifier: z.object({
      schema: z.string(),
      table: z.string(),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Datastream Streams.Objects. Registered at `@swamp/gcp/datastream/streams-objects`. */
export const model = {
  type: "@swamp/gcp/datastream/streams-objects",
  version: "2026.05.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A specific stream object (e.g a specific DB table).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a objects",
      arguments: z.object({
        identifier: z.string().describe("The name of the objects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
    sync: {
      description: "Sync objects state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({
        sourceObjectIdentifier: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["sourceObjectIdentifier"] !== undefined) {
          body["sourceObjectIdentifier"] = args["sourceObjectIdentifier"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datastream.projects.locations.streams.objects.lookup",
            "path": "v1/{+parent}/objects:lookup",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start_backfill_job: {
      description: "start backfill job",
      arguments: z.object({
        eventFilter: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["object"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["eventFilter"] !== undefined) {
          body["eventFilter"] = args["eventFilter"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datastream.projects.locations.streams.objects.startBackfillJob",
            "path": "v1/{+object}:startBackfillJob",
            "httpMethod": "POST",
            "parameterOrder": ["object"],
            "parameters": {
              "object": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stop_backfill_job: {
      description: "stop backfill job",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["object"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datastream.projects.locations.streams.objects.stopBackfillJob",
            "path": "v1/{+object}:stopBackfillJob",
            "httpMethod": "POST",
            "parameterOrder": ["object"],
            "parameters": {
              "object": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
