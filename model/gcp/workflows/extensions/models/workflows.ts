// Auto-generated extension model for @swamp/gcp/workflows/workflows
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workflows Workflows.
 *
 * Workflow program to be executed by Workflows.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/workflows/${shortName}`;
}

const BASE_URL = "https://workflows.googleapis.com/";

const GET_CONFIG = {
  "id": "workflows.projects.locations.workflows.get",
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
    "revisionId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "workflows.projects.locations.workflows.create",
  "path": "v1/{+parent}/workflows",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workflowId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "workflows.projects.locations.workflows.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "workflows.projects.locations.workflows.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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
  "id": "workflows.projects.locations.workflows.list",
  "path": "v1/{+parent}/workflows",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  callLogLevel: z.enum([
    "CALL_LOG_LEVEL_UNSPECIFIED",
    "LOG_ALL_CALLS",
    "LOG_ERRORS_ONLY",
    "LOG_NONE",
  ]).describe(
    "Optional. Describes the level of platform logging to apply to calls and call responses during executions of this workflow. If both the workflow and the execution specify a logging level, the execution level takes precedence.",
  ).optional(),
  cryptoKeyName: z.string().describe(
    "Optional. The resource name of a KMS crypto key used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. If not provided, data associated with the workflow will not be CMEK-encrypted.",
  ).optional(),
  description: z.string().describe(
    "Description of the workflow provided by the user. Must be at most 1000 Unicode characters long. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  executionHistoryLevel: z.enum([
    "EXECUTION_HISTORY_LEVEL_UNSPECIFIED",
    "EXECUTION_HISTORY_BASIC",
    "EXECUTION_HISTORY_DETAILED",
  ]).describe(
    "Optional. Describes the execution history level to apply to this workflow.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this workflow. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account} or {account} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. The `{account}` value can be the `email` address or the `unique_id` of the service account. If not provided, workflow will use the project's default service account. Modifying this field for an existing workflow results in a new workflow revision.",
  ).optional(),
  sourceContents: z.string().describe(
    "Workflow code to be executed. The size limit is 128KB.",
  ).optional(),
  stateError: z.object({
    details: z.string().describe("Provides specifics about the error.")
      .optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "KMS_ERROR"]).describe(
      "The type of this state error.",
    ).optional(),
  }).describe(
    "Describes an error related to the current state of the workflow.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    "Optional. Input only. Immutable. Tags associated with this workflow.",
  ).optional(),
  userEnvVars: z.record(z.string(), z.string()).describe(
    'Optional. User-defined environment variables associated with this workflow revision. This map has a maximum length of 20. Each string can take up to 4KiB. Keys cannot be empty strings and cannot start with "GOOGLE" or "WORKFLOWS".',
  ).optional(),
  workflowId: z.string().describe(
    "Required. The ID of the workflow to be created. It has to fulfill the following requirements: * Must contain only letters, numbers, underscores and hyphens. * Must start with a letter. * Must be between 1-64 characters. * Must end with a number or a letter. * Must be unique within the customer project and location.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allKmsKeys: z.array(z.string()).optional(),
  allKmsKeysVersions: z.array(z.string()).optional(),
  callLogLevel: z.string().optional(),
  createTime: z.string().optional(),
  cryptoKeyName: z.string().optional(),
  cryptoKeyVersion: z.string().optional(),
  description: z.string().optional(),
  executionHistoryLevel: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  revisionCreateTime: z.string().optional(),
  revisionId: z.string().optional(),
  serviceAccount: z.string().optional(),
  sourceContents: z.string().optional(),
  state: z.string().optional(),
  stateError: z.object({
    details: z.string(),
    type: z.string(),
  }).optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  updateTime: z.string().optional(),
  userEnvVars: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  callLogLevel: z.enum([
    "CALL_LOG_LEVEL_UNSPECIFIED",
    "LOG_ALL_CALLS",
    "LOG_ERRORS_ONLY",
    "LOG_NONE",
  ]).describe(
    "Optional. Describes the level of platform logging to apply to calls and call responses during executions of this workflow. If both the workflow and the execution specify a logging level, the execution level takes precedence.",
  ).optional(),
  cryptoKeyName: z.string().describe(
    "Optional. The resource name of a KMS crypto key used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. If not provided, data associated with the workflow will not be CMEK-encrypted.",
  ).optional(),
  description: z.string().describe(
    "Description of the workflow provided by the user. Must be at most 1000 Unicode characters long. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  executionHistoryLevel: z.enum([
    "EXECUTION_HISTORY_LEVEL_UNSPECIFIED",
    "EXECUTION_HISTORY_BASIC",
    "EXECUTION_HISTORY_DETAILED",
  ]).describe(
    "Optional. Describes the execution history level to apply to this workflow.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this workflow. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account} or {account} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. The `{account}` value can be the `email` address or the `unique_id` of the service account. If not provided, workflow will use the project's default service account. Modifying this field for an existing workflow results in a new workflow revision.",
  ).optional(),
  sourceContents: z.string().describe(
    "Workflow code to be executed. The size limit is 128KB.",
  ).optional(),
  stateError: z.object({
    details: z.string().describe("Provides specifics about the error.")
      .optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "KMS_ERROR"]).describe(
      "The type of this state error.",
    ).optional(),
  }).describe(
    "Describes an error related to the current state of the workflow.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    "Optional. Input only. Immutable. Tags associated with this workflow.",
  ).optional(),
  userEnvVars: z.record(z.string(), z.string()).describe(
    'Optional. User-defined environment variables associated with this workflow revision. This map has a maximum length of 20. Each string can take up to 4KiB. Keys cannot be empty strings and cannot start with "GOOGLE" or "WORKFLOWS".',
  ).optional(),
  workflowId: z.string().describe(
    "Required. The ID of the workflow to be created. It has to fulfill the following requirements: * Must contain only letters, numbers, underscores and hyphens. * Must start with a letter. * Must be between 1-64 characters. * Must end with a number or a letter. * Must be unique within the customer project and location.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workflows Workflows. Registered at `@swamp/gcp/workflows/workflows`. */
export const model = {
  type: "@swamp/gcp/workflows/workflows",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Workflow program to be executed by Workflows.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workflows",
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
        if (g["callLogLevel"] !== undefined) {
          body["callLogLevel"] = g["callLogLevel"];
        }
        if (g["cryptoKeyName"] !== undefined) {
          body["cryptoKeyName"] = g["cryptoKeyName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["executionHistoryLevel"] !== undefined) {
          body["executionHistoryLevel"] = g["executionHistoryLevel"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sourceContents"] !== undefined) {
          body["sourceContents"] = g["sourceContents"];
        }
        if (g["stateError"] !== undefined) body["stateError"] = g["stateError"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["userEnvVars"] !== undefined) {
          body["userEnvVars"] = g["userEnvVars"];
        }
        if (g["workflowId"] !== undefined) body["workflowId"] = g["workflowId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a workflows",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflows"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
    update: {
      description: "Update workflows attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["callLogLevel"] !== undefined) {
          body["callLogLevel"] = g["callLogLevel"];
        }
        if (g["cryptoKeyName"] !== undefined) {
          body["cryptoKeyName"] = g["cryptoKeyName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["executionHistoryLevel"] !== undefined) {
          body["executionHistoryLevel"] = g["executionHistoryLevel"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sourceContents"] !== undefined) {
          body["sourceContents"] = g["sourceContents"];
        }
        if (g["stateError"] !== undefined) body["stateError"] = g["stateError"];
        if (g["userEnvVars"] !== undefined) {
          body["userEnvVars"] = g["userEnvVars"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the workflows",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflows"),
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
      description: "Sync workflows state from GCP",
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
    list_revisions: {
      description: "list revisions",
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
            "id": "workflows.projects.locations.workflows.listRevisions",
            "path": "v1/{+name}:listRevisions",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
