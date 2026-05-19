// Auto-generated extension model for @swamp/gcp/analytics/data-mcf
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Data.Mcf.
 *
 * Multi-Channel Funnels data for a given view (profile).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.data.mcf.get",
  "path": "data/mcf",
  "httpMethod": "GET",
  "parameterOrder": [
    "ids",
    "start-date",
    "end-date",
    "metrics",
  ],
  "parameters": {
    "dimensions": {
      "location": "query",
    },
    "end-date": {
      "location": "query",
      "required": true,
    },
    "filters": {
      "location": "query",
    },
    "ids": {
      "location": "query",
      "required": true,
    },
    "max-results": {
      "location": "query",
    },
    "metrics": {
      "location": "query",
      "required": true,
    },
    "samplingLevel": {
      "location": "query",
    },
    "sort": {
      "location": "query",
    },
    "start-date": {
      "location": "query",
      "required": true,
    },
    "start-index": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  columnHeaders: z.array(z.object({
    columnType: z.string(),
    dataType: z.string(),
    name: z.string(),
  })).optional(),
  containsSampledData: z.boolean().optional(),
  id: z.string().optional(),
  itemsPerPage: z.number().optional(),
  kind: z.string().optional(),
  nextLink: z.string().optional(),
  previousLink: z.string().optional(),
  profileInfo: z.object({
    accountId: z.string(),
    internalWebPropertyId: z.string(),
    profileId: z.string(),
    profileName: z.string(),
    tableId: z.string(),
    webPropertyId: z.string(),
  }).optional(),
  query: z.object({
    dimensions: z.string(),
    end_date: z.string(),
    filters: z.string(),
    ids: z.string(),
    max_results: z.number(),
    metrics: z.array(z.string()),
    samplingLevel: z.string(),
    segment: z.string(),
    sort: z.array(z.string()),
    start_date: z.string(),
    start_index: z.number(),
  }).optional(),
  rows: z.array(z.array(z.object({
    conversionPathValue: z.array(z.object({
      interactionType: z.unknown(),
      nodeValue: z.unknown(),
    })),
    primitiveValue: z.string(),
  }))).optional(),
  sampleSize: z.string().optional(),
  sampleSpace: z.string().optional(),
  selfLink: z.string().optional(),
  totalResults: z.number().optional(),
  totalsForAllResults: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Data.Mcf. Registered at `@swamp/gcp/analytics/data-mcf`. */
export const model = {
  type: "@swamp/gcp/analytics/data-mcf",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Multi-Channel Funnels data for a given view (profile).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a mcf",
      arguments: z.object({
        identifier: z.string().describe("The name of the mcf"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["ids"] !== undefined) params["ids"] = String(g["ids"]);
        if (g["start_date"] !== undefined) {
          params["start-date"] = String(g["start_date"]);
        }
        if (g["end_date"] !== undefined) {
          params["end-date"] = String(g["end_date"]);
        }
        params["metrics"] = args.identifier;
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
      description: "Sync mcf state from GCP",
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
          if (g["ids"] !== undefined) params["ids"] = String(g["ids"]);
          else if (existing["ids"]) params["ids"] = String(existing["ids"]);
          if (g["start_date"] !== undefined) {
            params["start-date"] = String(g["start_date"]);
          } else if (existing["start-date"]) {
            params["start-date"] = String(existing["start-date"]);
          }
          if (g["end_date"] !== undefined) {
            params["end-date"] = String(g["end_date"]);
          } else if (existing["end-date"]) {
            params["end-date"] = String(existing["end-date"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["metrics"] = identifier;
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
  },
};
