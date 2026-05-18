// Auto-generated extension model for @swamp/gcp/integrations/integrations-executions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Application Integration Integrations.Executions.
 *
 * The Execution resource contains detailed information of an individual integration execution.
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
  return `${parent}/executions/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.integrations.executions.get",
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
  cloudKmsKey: z.string().optional(),
  cloudLoggingDetails: z.object({
    cloudLoggingSeverity: z.string(),
    enableCloudLogging: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  directSubExecutions: z.array(z.object({
    cloudKmsKey: z.string(),
    cloudLoggingDetails: z.object({
      cloudLoggingSeverity: z.string(),
      enableCloudLogging: z.boolean(),
    }),
    createTime: z.string(),
    directSubExecutions: z.array(z.string()),
    eventExecutionDetails: z.object({
      cancelReason: z.string(),
      eventAttemptStats: z.array(z.object({
        endTime: z.unknown(),
        startTime: z.unknown(),
      })),
      eventExecutionSnapshot: z.array(z.object({
        checkpointTaskNumber: z.unknown(),
        clientId: z.unknown(),
        conditionResults: z.unknown(),
        diffParams: z.unknown(),
        eventExecutionInfoId: z.unknown(),
        eventExecutionSnapshotId: z.unknown(),
        eventExecutionSnapshotMetadata: z.unknown(),
        eventParams: z.unknown(),
        exceedMaxSize: z.unknown(),
        snapshotTime: z.unknown(),
        taskExecutionDetails: z.unknown(),
        taskName: z.unknown(),
        workflowName: z.unknown(),
      })),
      eventExecutionSnapshotsSize: z.string(),
      eventExecutionState: z.string(),
      eventRetriesFromBeginningCount: z.number(),
      logFilePath: z.string(),
      networkAddress: z.string(),
      nextExecutionTime: z.string(),
      ryeLockUnheldCount: z.number(),
    }),
    executionDetails: z.object({
      attemptStats: z.array(z.object({
        endTime: z.unknown(),
        startTime: z.unknown(),
      })),
      eventExecutionSnapshotsSize: z.string(),
      executionSnapshots: z.array(z.object({
        checkpointTaskNumber: z.unknown(),
        executionSnapshotMetadata: z.unknown(),
        params: z.unknown(),
        taskExecutionDetails: z.unknown(),
      })),
      state: z.string(),
    }),
    executionMethod: z.string(),
    integrationVersionState: z.string(),
    name: z.string(),
    replayInfo: z.object({
      originalExecutionInfoId: z.string(),
      replayMode: z.string(),
      replayReason: z.string(),
      replayedExecutionInfoIds: z.array(z.string()),
    }),
    requestParameters: z.record(z.string(), z.unknown()),
    requestParams: z.array(z.object({
      dataType: z.string(),
      key: z.string(),
      masked: z.boolean(),
      value: z.object({
        booleanArray: z.unknown(),
        booleanValue: z.unknown(),
        doubleArray: z.unknown(),
        doubleValue: z.unknown(),
        intArray: z.unknown(),
        intValue: z.unknown(),
        jsonValue: z.unknown(),
        protoArray: z.unknown(),
        protoValue: z.unknown(),
        serializedObjectValue: z.unknown(),
        stringArray: z.unknown(),
        stringValue: z.unknown(),
      }),
    })),
    responseParameters: z.record(z.string(), z.unknown()),
    responseParams: z.array(z.object({
      dataType: z.string(),
      key: z.string(),
      masked: z.boolean(),
      value: z.object({
        booleanArray: z.unknown(),
        booleanValue: z.unknown(),
        doubleArray: z.unknown(),
        doubleValue: z.unknown(),
        intArray: z.unknown(),
        intValue: z.unknown(),
        jsonValue: z.unknown(),
        protoArray: z.unknown(),
        protoValue: z.unknown(),
        serializedObjectValue: z.unknown(),
        stringArray: z.unknown(),
        stringValue: z.unknown(),
      }),
    })),
    snapshotNumber: z.string(),
    triggerId: z.string(),
    updateTime: z.string(),
  })).optional(),
  eventExecutionDetails: z.object({
    cancelReason: z.string(),
    eventAttemptStats: z.array(z.object({
      endTime: z.string(),
      startTime: z.string(),
    })),
    eventExecutionSnapshot: z.array(z.object({
      checkpointTaskNumber: z.string(),
      clientId: z.string(),
      conditionResults: z.array(z.object({
        currentTaskNumber: z.unknown(),
        nextTaskNumber: z.unknown(),
        result: z.unknown(),
      })),
      diffParams: z.object({
        parameters: z.array(z.unknown()),
      }),
      eventExecutionInfoId: z.string(),
      eventExecutionSnapshotId: z.string(),
      eventExecutionSnapshotMetadata: z.object({
        ancestorIterationNumbers: z.array(z.unknown()),
        ancestorTaskNumbers: z.array(z.unknown()),
        eventAttemptNum: z.number(),
        integrationName: z.string(),
        taskAttemptNum: z.number(),
        taskLabel: z.string(),
        taskName: z.string(),
        taskNumber: z.string(),
      }),
      eventParams: z.object({
        parameters: z.array(z.unknown()),
      }),
      exceedMaxSize: z.boolean(),
      snapshotTime: z.string(),
      taskExecutionDetails: z.array(z.object({
        skippedOnFailure: z.unknown(),
        taskAttemptStats: z.unknown(),
        taskExecutionState: z.unknown(),
        taskNumber: z.unknown(),
      })),
      taskName: z.string(),
      workflowName: z.string(),
    })),
    eventExecutionSnapshotsSize: z.string(),
    eventExecutionState: z.string(),
    eventRetriesFromBeginningCount: z.number(),
    logFilePath: z.string(),
    networkAddress: z.string(),
    nextExecutionTime: z.string(),
    ryeLockUnheldCount: z.number(),
  }).optional(),
  executionDetails: z.object({
    attemptStats: z.array(z.object({
      endTime: z.string(),
      startTime: z.string(),
    })),
    eventExecutionSnapshotsSize: z.string(),
    executionSnapshots: z.array(z.object({
      checkpointTaskNumber: z.string(),
      executionSnapshotMetadata: z.object({
        ancestorIterationNumbers: z.array(z.unknown()),
        ancestorTaskNumbers: z.array(z.unknown()),
        executionAttempt: z.number(),
        integrationName: z.string(),
        task: z.string(),
        taskAttempt: z.number(),
        taskLabel: z.string(),
        taskNumber: z.string(),
      }),
      params: z.record(z.string(), z.unknown()),
      taskExecutionDetails: z.array(z.object({
        taskAttemptStats: z.unknown(),
        taskExecutionState: z.unknown(),
        taskNumber: z.unknown(),
      })),
    })),
    state: z.string(),
  }).optional(),
  executionMethod: z.string().optional(),
  integrationVersionState: z.string().optional(),
  name: z.string(),
  replayInfo: z.object({
    originalExecutionInfoId: z.string(),
    replayMode: z.string(),
    replayReason: z.string(),
    replayedExecutionInfoIds: z.array(z.string()),
  }).optional(),
  requestParameters: z.record(z.string(), z.unknown()).optional(),
  requestParams: z.array(z.object({
    dataType: z.string(),
    key: z.string(),
    masked: z.boolean(),
    value: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()),
      }),
      booleanValue: z.boolean(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()),
      }),
      doubleValue: z.number(),
      intArray: z.object({
        intValues: z.array(z.unknown()),
      }),
      intValue: z.string(),
      jsonValue: z.string(),
      protoArray: z.object({
        protoValues: z.array(z.unknown()),
      }),
      protoValue: z.record(z.string(), z.unknown()),
      serializedObjectValue: z.object({
        objectValue: z.string(),
      }),
      stringArray: z.object({
        stringValues: z.array(z.unknown()),
      }),
      stringValue: z.string(),
    }),
  })).optional(),
  responseParameters: z.record(z.string(), z.unknown()).optional(),
  responseParams: z.array(z.object({
    dataType: z.string(),
    key: z.string(),
    masked: z.boolean(),
    value: z.object({
      booleanArray: z.object({
        booleanValues: z.array(z.unknown()),
      }),
      booleanValue: z.boolean(),
      doubleArray: z.object({
        doubleValues: z.array(z.unknown()),
      }),
      doubleValue: z.number(),
      intArray: z.object({
        intValues: z.array(z.unknown()),
      }),
      intValue: z.string(),
      jsonValue: z.string(),
      protoArray: z.object({
        protoValues: z.array(z.unknown()),
      }),
      protoValue: z.record(z.string(), z.unknown()),
      serializedObjectValue: z.object({
        objectValue: z.string(),
      }),
      stringArray: z.object({
        stringValues: z.array(z.unknown()),
      }),
      stringValue: z.string(),
    }),
  })).optional(),
  snapshotNumber: z.string().optional(),
  triggerId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Application Integration Integrations.Executions. Registered at `@swamp/gcp/integrations/integrations-executions`. */
export const model = {
  type: "@swamp/gcp/integrations/integrations-executions",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The Execution resource contains detailed information of an individual integra...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a executions",
      arguments: z.object({
        identifier: z.string().describe("The name of the executions"),
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
      description: "Sync executions state from GCP",
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        cancelReason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["cancelReason"] !== undefined) {
          body["cancelReason"] = args["cancelReason"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.integrations.executions.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    download: {
      description: "download",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.integrations.executions.download",
            "path": "v1/{+name}:download",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    replay: {
      description: "replay",
      arguments: z.object({
        modifiedParameters: z.any().optional(),
        replayMode: z.any().optional(),
        replayReason: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["modifiedParameters"] !== undefined) {
          body["modifiedParameters"] = args["modifiedParameters"];
        }
        if (args["replayMode"] !== undefined) {
          body["replayMode"] = args["replayMode"];
        }
        if (args["replayReason"] !== undefined) {
          body["replayReason"] = args["replayReason"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "integrations.projects.locations.integrations.executions.replay",
            "path": "v1/{+name}:replay",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
