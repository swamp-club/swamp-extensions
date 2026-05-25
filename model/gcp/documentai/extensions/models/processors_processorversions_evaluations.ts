// Auto-generated extension model for @swamp/gcp/documentai/processors-processorversions-evaluations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Processors.ProcessorVersions.Evaluations.
 *
 * An evaluation of a ProcessorVersion's performance.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/evaluations/${shortName}`;
}

const BASE_URL = "https://documentai.googleapis.com/";

const GET_CONFIG = {
  "id":
    "documentai.projects.locations.processors.processorVersions.evaluations.get",
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

const LIST_CONFIG = {
  "id":
    "documentai.projects.locations.processors.processorVersions.evaluations.list",
  "path": "v1/{+parent}/evaluations",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
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
  allEntitiesMetrics: z.object({
    auprc: z.number(),
    auprcExact: z.number(),
    confidenceLevelMetrics: z.array(z.object({
      confidenceLevel: z.number(),
      metrics: z.object({
        f1Score: z.number(),
        falseNegativesCount: z.number(),
        falsePositivesCount: z.number(),
        groundTruthDocumentCount: z.number(),
        groundTruthOccurrencesCount: z.number(),
        precision: z.number(),
        predictedDocumentCount: z.number(),
        predictedOccurrencesCount: z.number(),
        recall: z.number(),
        totalDocumentsCount: z.number(),
        truePositivesCount: z.number(),
      }),
    })),
    confidenceLevelMetricsExact: z.array(z.object({
      confidenceLevel: z.number(),
      metrics: z.object({
        f1Score: z.number(),
        falseNegativesCount: z.number(),
        falsePositivesCount: z.number(),
        groundTruthDocumentCount: z.number(),
        groundTruthOccurrencesCount: z.number(),
        precision: z.number(),
        predictedDocumentCount: z.number(),
        predictedOccurrencesCount: z.number(),
        recall: z.number(),
        totalDocumentsCount: z.number(),
        truePositivesCount: z.number(),
      }),
    })),
    estimatedCalibrationError: z.number(),
    estimatedCalibrationErrorExact: z.number(),
    metricsType: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  documentCounters: z.object({
    evaluatedDocumentsCount: z.number(),
    failedDocumentsCount: z.number(),
    inputDocumentsCount: z.number(),
    invalidDocumentsCount: z.number(),
  }).optional(),
  entityMetrics: z.record(z.string(), z.unknown()).optional(),
  kmsKeyName: z.string().optional(),
  kmsKeyVersionName: z.string().optional(),
  name: z.string(),
  revisions: z.array(z.object({
    allEntitiesMetrics: z.object({
      auprc: z.number(),
      auprcExact: z.number(),
      confidenceLevelMetrics: z.array(z.object({
        confidenceLevel: z.unknown(),
        metrics: z.unknown(),
      })),
      confidenceLevelMetricsExact: z.array(z.object({
        confidenceLevel: z.unknown(),
        metrics: z.unknown(),
      })),
      estimatedCalibrationError: z.number(),
      estimatedCalibrationErrorExact: z.number(),
      metricsType: z.string(),
    }),
    documentCounters: z.object({
      evaluatedDocumentsCount: z.number(),
      failedDocumentsCount: z.number(),
      inputDocumentsCount: z.number(),
      invalidDocumentsCount: z.number(),
    }),
    entityMetrics: z.record(z.string(), z.unknown()),
    revisionId: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Document AI Processors.ProcessorVersions.Evaluations. Registered at `@swamp/gcp/documentai/processors-processorversions-evaluations`. */
export const model = {
  type: "@swamp/gcp/documentai/processors-processorversions-evaluations",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An evaluation of a ProcessorVersion's performance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a evaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync evaluations state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    list: {
      description: "List evaluations resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The standard list page size. If unspecified, at most `5` evaluations are returned. The maximum value is `100`. Values above `100` are coerced to `100`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "evaluations",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
