// Auto-generated extension model for @swamp/gcp/analytics/data-realtime
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Data.Realtime.
 *
 * Real time data for a given view (profile).
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
  "id": "analytics.data.realtime.get",
  "path": "data/realtime",
  "httpMethod": "GET",
  "parameterOrder": [
    "ids",
    "metrics",
  ],
  "parameters": {
    "dimensions": {
      "location": "query",
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
    "sort": {
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
  id: z.string().optional(),
  kind: z.string().optional(),
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
    filters: z.string(),
    ids: z.string(),
    max_results: z.number(),
    metrics: z.array(z.string()),
    sort: z.array(z.string()),
  }).optional(),
  rows: z.array(z.array(z.string())).optional(),
  selfLink: z.string().optional(),
  totalResults: z.number().optional(),
  totalsForAllResults: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Data.Realtime. Registered at `@swamp/gcp/analytics/data-realtime`. */
export const model = {
  type: "@swamp/gcp/analytics/data-realtime",
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
      description: "Real time data for a given view (profile).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a realtime",
      arguments: z.object({
        identifier: z.string().describe("The name of the realtime"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["ids"] !== undefined) params["ids"] = String(g["ids"]);
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
      description: "Sync realtime state from GCP",
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
