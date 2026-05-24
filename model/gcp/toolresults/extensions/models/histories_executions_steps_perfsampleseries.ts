// Auto-generated extension model for @swamp/gcp/toolresults/histories-executions-steps-perfsampleseries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tool Results Histories.Executions.Steps.PerfSampleSeries.
 *
 * Resource representing a collection of performance samples (or data points)
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

const BASE_URL = "https://toolresults.googleapis.com/";

const GET_CONFIG = {
  "id": "toolresults.projects.histories.executions.steps.perfSampleSeries.get",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries/{sampleSeriesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "stepId",
    "sampleSeriesId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "sampleSeriesId": {
      "location": "path",
      "required": true,
    },
    "stepId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "toolresults.projects.histories.executions.steps.perfSampleSeries.create",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "stepId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "stepId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "toolresults.projects.histories.executions.steps.perfSampleSeries.list",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "stepId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "stepId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  basicPerfSampleSeries: z.object({
    perfMetricType: z.enum([
      "perfMetricTypeUnspecified",
      "memory",
      "cpu",
      "network",
      "graphics",
    ]).optional(),
    perfUnit: z.enum([
      "perfUnitUnspecified",
      "kibibyte",
      "percent",
      "bytesPerSecond",
      "framesPerSecond",
      "byte",
    ]).optional(),
    sampleSeriesLabel: z.enum([
      "sampleSeriesTypeUnspecified",
      "memoryRssPrivate",
      "memoryRssShared",
      "memoryRssTotal",
      "memoryTotal",
      "cpuUser",
      "cpuKernel",
      "cpuTotal",
      "ntBytesTransferred",
      "ntBytesReceived",
      "networkSent",
      "networkReceived",
      "graphicsFrameRate",
    ]).optional(),
  }).describe(
    "Encapsulates the metadata for basic sample series represented by a line chart",
  ).optional(),
  executionId: z.string().describe("A tool results execution ID. @OutputOnly")
    .optional(),
  historyId: z.string().describe("A tool results history ID. @OutputOnly")
    .optional(),
  projectId: z.string().describe("The cloud project @OutputOnly").optional(),
  sampleSeriesId: z.string().describe("A sample series id @OutputOnly")
    .optional(),
  stepId: z.string().describe("A tool results step ID. @OutputOnly").optional(),
});

const StateSchema = z.object({
  basicPerfSampleSeries: z.object({
    perfMetricType: z.string(),
    perfUnit: z.string(),
    sampleSeriesLabel: z.string(),
  }).optional(),
  executionId: z.string().optional(),
  historyId: z.string().optional(),
  projectId: z.string().optional(),
  sampleSeriesId: z.string().optional(),
  stepId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  basicPerfSampleSeries: z.object({
    perfMetricType: z.enum([
      "perfMetricTypeUnspecified",
      "memory",
      "cpu",
      "network",
      "graphics",
    ]).optional(),
    perfUnit: z.enum([
      "perfUnitUnspecified",
      "kibibyte",
      "percent",
      "bytesPerSecond",
      "framesPerSecond",
      "byte",
    ]).optional(),
    sampleSeriesLabel: z.enum([
      "sampleSeriesTypeUnspecified",
      "memoryRssPrivate",
      "memoryRssShared",
      "memoryRssTotal",
      "memoryTotal",
      "cpuUser",
      "cpuKernel",
      "cpuTotal",
      "ntBytesTransferred",
      "ntBytesReceived",
      "networkSent",
      "networkReceived",
      "graphicsFrameRate",
    ]).optional(),
  }).describe(
    "Encapsulates the metadata for basic sample series represented by a line chart",
  ).optional(),
  executionId: z.string().describe("A tool results execution ID. @OutputOnly")
    .optional(),
  historyId: z.string().describe("A tool results history ID. @OutputOnly")
    .optional(),
  projectId: z.string().describe("The cloud project @OutputOnly").optional(),
  sampleSeriesId: z.string().describe("A sample series id @OutputOnly")
    .optional(),
  stepId: z.string().describe("A tool results step ID. @OutputOnly").optional(),
});

/** Swamp extension model for Google Cloud Tool Results Histories.Executions.Steps.PerfSampleSeries. Registered at `@swamp/gcp/toolresults/histories-executions-steps-perfsampleseries`. */
export const model = {
  type: "@swamp/gcp/toolresults/histories-executions-steps-perfsampleseries",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Resource representing a collection of performance samples (or data points)",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a perfSampleSeries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        if (g["stepId"] !== undefined) params["stepId"] = String(g["stepId"]);
        const body: Record<string, unknown> = {};
        if (g["basicPerfSampleSeries"] !== undefined) {
          body["basicPerfSampleSeries"] = g["basicPerfSampleSeries"];
        }
        if (g["sampleSeriesId"] !== undefined) {
          body["sampleSeriesId"] = g["sampleSeriesId"];
        }
        if (g["name"] !== undefined) {
          params["sampleSeriesId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "projectId": projectId,
              "historyId": String(g["historyId"] ?? ""),
              "executionId": String(g["executionId"] ?? ""),
              "stepId": String(g["stepId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a perfSampleSeries",
      arguments: z.object({
        identifier: z.string().describe("The name of the perfSampleSeries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        if (g["stepId"] !== undefined) params["stepId"] = String(g["stepId"]);
        params["sampleSeriesId"] = args.identifier;
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
      description: "Sync perfSampleSeries state from GCP",
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
          if (g["historyId"] !== undefined) {
            params["historyId"] = String(g["historyId"]);
          } else if (existing["historyId"]) {
            params["historyId"] = String(existing["historyId"]);
          }
          if (g["executionId"] !== undefined) {
            params["executionId"] = String(g["executionId"]);
          } else if (existing["executionId"]) {
            params["executionId"] = String(existing["executionId"]);
          }
          if (g["stepId"] !== undefined) params["stepId"] = String(g["stepId"]);
          else if (existing["stepId"]) {
            params["stepId"] = String(existing["stepId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sampleSeriesId"] = identifier;
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
