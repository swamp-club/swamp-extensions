// Auto-generated extension model for @swamp/gcp/workflowexecutions/workflows-executions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workflow Executions Workflows.Executions.
 *
 * A running instance of a [Workflow](/workflows/docs/reference/rest/v1/projects.locations.workflows).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/executions/${shortName}`;
}

const BASE_URL = "https://workflowexecutions.googleapis.com/";

const GET_CONFIG = {
  "id": "workflowexecutions.projects.locations.workflows.executions.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "workflowexecutions.projects.locations.workflows.executions.create",
  "path": "v1/{+parent}/executions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "workflowexecutions.projects.locations.workflows.executions.deleteExecutionHistory",
  "path": "v1/{+name}:deleteExecutionHistory",
  "httpMethod": "POST",
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
  argument: z.string().describe(
    'Input parameters of the execution represented as a JSON string. The size limit is 32KB. *Note*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `\'{"argument":"{\\"firstName\\":\\"FIRST\\",\\"lastName\\":\\"LAST\\"}"}\'`',
  ).optional(),
  callLogLevel: z.enum([
    "CALL_LOG_LEVEL_UNSPECIFIED",
    "LOG_ALL_CALLS",
    "LOG_ERRORS_ONLY",
    "LOG_NONE",
  ]).describe("The call logging level associated to this execution.")
    .optional(),
  disableConcurrencyQuotaOverflowBuffering: z.boolean().describe(
    "Optional. If set to true, the execution will not be backlogged when the concurrency quota is exhausted. The backlog execution starts when the concurrency quota becomes available.",
  ).optional(),
  error: z.object({
    context: z.string().describe("Human-readable stack trace string.")
      .optional(),
    payload: z.string().describe(
      "Error message and data returned represented as a JSON string.",
    ).optional(),
    stackTrace: z.object({
      elements: z.array(z.object({
        position: z.object({
          column: z.unknown().describe(
            "The source code column position (of the line) the current instruction was generated from.",
          ).optional(),
          length: z.unknown().describe(
            "The number of bytes of source code making up this stack trace element.",
          ).optional(),
          line: z.unknown().describe(
            "The source code line number the current instruction was generated from.",
          ).optional(),
        }).describe(
          "Position contains source position information about the stack trace element such as line number, column number and length of the code block in bytes.",
        ).optional(),
        routine: z.string().describe("The routine where the error occurred.")
          .optional(),
        step: z.string().describe("The step the error occurred at.").optional(),
      })).describe("An array of stack elements.").optional(),
    }).describe(
      "A collection of stack elements (frames) where an error occurred.",
    ).optional(),
  }).describe("Error describes why the execution was abnormally terminated.")
    .optional(),
  executionHistoryLevel: z.enum([
    "EXECUTION_HISTORY_LEVEL_UNSPECIFIED",
    "EXECUTION_HISTORY_BASIC",
    "EXECUTION_HISTORY_DETAILED",
  ]).describe(
    "Optional. Describes the execution history level to apply to this execution. If not specified, the execution history level is determined by its workflow's execution history level. If the levels are different, the executionHistoryLevel overrides the workflow's execution history level for this execution.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this execution. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. By default, labels are inherited from the workflow but are overridden by any labels associated with the execution.",
  ).optional(),
  stateError: z.object({
    details: z.string().describe("Provides specifics about the error.")
      .optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "KMS_ERROR"]).describe(
      "The type of this state error.",
    ).optional(),
  }).describe(
    "Describes an error related to the current state of the Execution resource.",
  ).optional(),
  status: z.object({
    currentSteps: z.array(z.object({
      routine: z.string().describe("Name of a routine within the workflow.")
        .optional(),
      step: z.string().describe("Name of a step within the routine.")
        .optional(),
    })).describe(
      "A list of currently executing or last executed step names for the workflow execution currently running. If the workflow has succeeded or failed, this is the last attempted or executed step. Presently, if the current step is inside a subworkflow, the list only includes that step. In the future, the list will contain items for each step in the call stack, starting with the outermost step in the `main` subworkflow, and ending with the most deeply nested step.",
    ).optional(),
  }).describe("Represents the current status of this execution.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  argument: z.string().optional(),
  callLogLevel: z.string().optional(),
  createTime: z.string().optional(),
  disableConcurrencyQuotaOverflowBuffering: z.boolean().optional(),
  duration: z.string().optional(),
  endTime: z.string().optional(),
  error: z.object({
    context: z.string(),
    payload: z.string(),
    stackTrace: z.object({
      elements: z.array(z.object({
        position: z.object({
          column: z.unknown(),
          length: z.unknown(),
          line: z.unknown(),
        }),
        routine: z.string(),
        step: z.string(),
      })),
    }),
  }).optional(),
  executionHistoryLevel: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  result: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  stateError: z.object({
    details: z.string(),
    type: z.string(),
  }).optional(),
  status: z.object({
    currentSteps: z.array(z.object({
      routine: z.string(),
      step: z.string(),
    })),
  }).optional(),
  workflowRevisionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  argument: z.string().describe(
    'Input parameters of the execution represented as a JSON string. The size limit is 32KB. *Note*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `\'{"argument":"{\\"firstName\\":\\"FIRST\\",\\"lastName\\":\\"LAST\\"}"}\'`',
  ).optional(),
  callLogLevel: z.enum([
    "CALL_LOG_LEVEL_UNSPECIFIED",
    "LOG_ALL_CALLS",
    "LOG_ERRORS_ONLY",
    "LOG_NONE",
  ]).describe("The call logging level associated to this execution.")
    .optional(),
  disableConcurrencyQuotaOverflowBuffering: z.boolean().describe(
    "Optional. If set to true, the execution will not be backlogged when the concurrency quota is exhausted. The backlog execution starts when the concurrency quota becomes available.",
  ).optional(),
  error: z.object({
    context: z.string().describe("Human-readable stack trace string.")
      .optional(),
    payload: z.string().describe(
      "Error message and data returned represented as a JSON string.",
    ).optional(),
    stackTrace: z.object({
      elements: z.array(z.object({
        position: z.object({
          column: z.unknown().describe(
            "The source code column position (of the line) the current instruction was generated from.",
          ).optional(),
          length: z.unknown().describe(
            "The number of bytes of source code making up this stack trace element.",
          ).optional(),
          line: z.unknown().describe(
            "The source code line number the current instruction was generated from.",
          ).optional(),
        }).describe(
          "Position contains source position information about the stack trace element such as line number, column number and length of the code block in bytes.",
        ).optional(),
        routine: z.string().describe("The routine where the error occurred.")
          .optional(),
        step: z.string().describe("The step the error occurred at.").optional(),
      })).describe("An array of stack elements.").optional(),
    }).describe(
      "A collection of stack elements (frames) where an error occurred.",
    ).optional(),
  }).describe("Error describes why the execution was abnormally terminated.")
    .optional(),
  executionHistoryLevel: z.enum([
    "EXECUTION_HISTORY_LEVEL_UNSPECIFIED",
    "EXECUTION_HISTORY_BASIC",
    "EXECUTION_HISTORY_DETAILED",
  ]).describe(
    "Optional. Describes the execution history level to apply to this execution. If not specified, the execution history level is determined by its workflow's execution history level. If the levels are different, the executionHistoryLevel overrides the workflow's execution history level for this execution.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this execution. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. By default, labels are inherited from the workflow but are overridden by any labels associated with the execution.",
  ).optional(),
  stateError: z.object({
    details: z.string().describe("Provides specifics about the error.")
      .optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "KMS_ERROR"]).describe(
      "The type of this state error.",
    ).optional(),
  }).describe(
    "Describes an error related to the current state of the Execution resource.",
  ).optional(),
  status: z.object({
    currentSteps: z.array(z.object({
      routine: z.string().describe("Name of a routine within the workflow.")
        .optional(),
      step: z.string().describe("Name of a step within the routine.")
        .optional(),
    })).describe(
      "A list of currently executing or last executed step names for the workflow execution currently running. If the workflow has succeeded or failed, this is the last attempted or executed step. Presently, if the current step is inside a subworkflow, the list only includes that step. In the future, the list will contain items for each step in the call stack, starting with the outermost step in the `main` subworkflow, and ending with the most deeply nested step.",
    ).optional(),
  }).describe("Represents the current status of this execution.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workflow Executions Workflows.Executions. Registered at `@swamp/gcp/workflowexecutions/workflows-executions`. */
export const model = {
  type: "@swamp/gcp/workflowexecutions/workflows-executions",
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
      toVersion: "2026.05.18.1",
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
      description:
        "A running instance of a [Workflow](/workflows/docs/reference/rest/v1/projects...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a executions",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["argument"] !== undefined) body["argument"] = g["argument"];
        if (g["callLogLevel"] !== undefined) {
          body["callLogLevel"] = g["callLogLevel"];
        }
        if (g["disableConcurrencyQuotaOverflowBuffering"] !== undefined) {
          body["disableConcurrencyQuotaOverflowBuffering"] =
            g["disableConcurrencyQuotaOverflowBuffering"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["executionHistoryLevel"] !== undefined) {
          body["executionHistoryLevel"] = g["executionHistoryLevel"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["stateError"] !== undefined) body["stateError"] = g["stateError"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
    delete: {
      description: "Delete the executions",
      arguments: z.object({
        identifier: z.string().describe("The name of the executions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
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
              "workflowexecutions.projects.locations.workflows.executions.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    export_data: {
      description: "export data",
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
              "workflowexecutions.projects.locations.workflows.executions.exportData",
            "path": "v1/{+name}:exportData",
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
  },
};
