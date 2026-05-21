// Auto-generated extension model for @swamp/gcp/toolresults/histories-executions-environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tool Results Histories.Executions.Environments.
 *
 * An Environment represents the set of test runs (Steps) from the parent Execution that are configured with the same set of dimensions (Model, Version, Locale, and Orientation). Multiple such runs occur particularly because of features like sharding (splitting up a test suite to run in parallel across devices) and reruns (running a test multiple times to check for different outcomes).
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

const BASE_URL = "https://toolresults.googleapis.com/";

const GET_CONFIG = {
  "id": "toolresults.projects.histories.executions.environments.get",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/environments/{environmentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "environmentId",
  ],
  "parameters": {
    "environmentId": {
      "location": "path",
      "required": true,
    },
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  completionTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  creationTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  dimensionValue: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  environmentId: z.string().optional(),
  environmentResult: z.object({
    outcome: z.object({
      failureDetail: z.object({
        crashed: z.boolean(),
        deviceOutOfMemory: z.boolean(),
        failedRoboscript: z.boolean(),
        notInstalled: z.boolean(),
        otherNativeCrash: z.boolean(),
        timedOut: z.boolean(),
        unableToCrawl: z.boolean(),
      }),
      inconclusiveDetail: z.object({
        abortedByUser: z.boolean(),
        hasErrorLogs: z.boolean(),
        infrastructureFailure: z.boolean(),
      }),
      skippedDetail: z.object({
        incompatibleAppVersion: z.boolean(),
        incompatibleArchitecture: z.boolean(),
        incompatibleDevice: z.boolean(),
        pendingTimeout: z.boolean(),
      }),
      successDetail: z.object({
        otherNativeCrash: z.boolean(),
      }),
      summary: z.string(),
    }),
    state: z.string(),
    testSuiteOverviews: z.array(z.object({
      elapsedTime: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      errorCount: z.number(),
      failureCount: z.number(),
      flakyCount: z.number(),
      name: z.string(),
      skippedCount: z.number(),
      totalCount: z.number(),
      xmlSource: z.object({
        fileUri: z.string(),
      }),
    })),
  }).optional(),
  executionId: z.string().optional(),
  historyId: z.string().optional(),
  projectId: z.string().optional(),
  resultsStorage: z.object({
    resultsStoragePath: z.object({
      fileUri: z.string(),
    }),
    xunitXmlFile: z.object({
      fileUri: z.string(),
    }),
  }).optional(),
  shardSummaries: z.array(z.object({
    runs: z.array(z.object({})),
    shardResult: z.object({
      outcome: z.object({
        failureDetail: z.object({
          crashed: z.unknown(),
          deviceOutOfMemory: z.unknown(),
          failedRoboscript: z.unknown(),
          notInstalled: z.unknown(),
          otherNativeCrash: z.unknown(),
          timedOut: z.unknown(),
          unableToCrawl: z.unknown(),
        }),
        inconclusiveDetail: z.object({
          abortedByUser: z.unknown(),
          hasErrorLogs: z.unknown(),
          infrastructureFailure: z.unknown(),
        }),
        skippedDetail: z.object({
          incompatibleAppVersion: z.unknown(),
          incompatibleArchitecture: z.unknown(),
          incompatibleDevice: z.unknown(),
          pendingTimeout: z.unknown(),
        }),
        successDetail: z.object({
          otherNativeCrash: z.unknown(),
        }),
        summary: z.string(),
      }),
      state: z.string(),
      testSuiteOverviews: z.array(z.object({
        elapsedTime: z.unknown(),
        errorCount: z.unknown(),
        failureCount: z.unknown(),
        flakyCount: z.unknown(),
        name: z.unknown(),
        skippedCount: z.unknown(),
        totalCount: z.unknown(),
        xmlSource: z.unknown(),
      })),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Tool Results Histories.Executions.Environments. Registered at `@swamp/gcp/toolresults/histories-executions-environments`. */
export const model = {
  type: "@swamp/gcp/toolresults/histories-executions-environments",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Environment represents the set of test runs (Steps) from the parent Execut...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
        params["environmentId"] = args.identifier;
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
      description: "Sync environments state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["environmentId"] = identifier;
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
