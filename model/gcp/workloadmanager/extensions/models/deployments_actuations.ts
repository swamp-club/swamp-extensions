// Auto-generated extension model for @swamp/gcp/workloadmanager/deployments-actuations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workload Manager Deployments.Actuations.
 *
 * The Actuation object represents the bootstrap state and output results of deployed infrastructure and software.
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
  return `${parent}/actuations/${shortName}`;
}

const BASE_URL = "https://workloadmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "workloadmanager.projects.locations.deployments.actuations.get",
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

const INSERT_CONFIG = {
  "id": "workloadmanager.projects.locations.deployments.actuations.create",
  "path": "v1/{+parent}/actuations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "workloadmanager.projects.locations.deployments.actuations.delete",
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
  "id": "workloadmanager.projects.locations.deployments.actuations.list",
  "path": "v1/{+parent}/actuations",
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
  actuationOutput: z.object({
    actuateLogs: z.string().describe("A link to gcs file that store build logs")
      .optional(),
    ansibleError: z.string().describe(
      "Output only. error message return from ansible.",
    ).optional(),
    ansibleFailedTask: z.array(z.string()).describe(
      "Output only. failed task name return from ansible.",
    ).optional(),
    blueprintId: z.string().describe(
      "reference to Blueprint Controller deployment and revision resource",
    ).optional(),
    cloudbuildId: z.string().describe(
      "Cloud Build instance UUID associated with this revision, without any suffix or prefix",
    ).optional(),
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "TERRAFORM_FAILED",
      "PERMISSION_DENIED_IN_TERRAFORM",
      "QUOTA_EXCEED_IN_TERRAFORM",
      "ANSIBLE_FAILED",
      "CONSTRAINT_VIOLATION_IN_TERRAFORM",
      "RESOURCE_ALREADY_EXISTS_IN_TERRAFORM",
      "RESOURCE_UNAVAILABLE_IN_TERRAFORM",
      "PERMISSION_DENIED_IN_ANSIBLE",
      "INVALID_SECRET_IN_ANSIBLE",
      "TERRAFORM_DELETION_FAILED",
      "RESOURCE_IN_USE_IN_TERRAFORM_DELETION",
      "ANSIBLE_START_FAILED",
    ]).describe(
      "Output only. Code describing any errors that may have occurred. If not specified, there is no error in actuation.",
    ).optional(),
    errorLogs: z.string().describe("A link to actuation cloud build log.")
      .optional(),
    hasUserFacingErrorMsg: z.boolean().describe(
      "Output only. whether the error message is user facing. If true, the error message will be shown in the UI.",
    ).optional(),
    terraformError: z.string().describe(
      "Output only. error message return from terraform.",
    ).optional(),
    terraformTemplate: z.string().describe(
      "reference to terraform template used",
    ).optional(),
  }).describe("Message for output of Actuation").optional(),
  name: z.string().describe(
    "The name of actuation resource. The format is projects/{project}/locations/{location}/deployments/{deployment}/actuations/{actuation}",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actuationOutput: z.object({
    actuateLogs: z.string(),
    ansibleError: z.string(),
    ansibleFailedTask: z.array(z.string()),
    blueprintId: z.string(),
    cloudbuildId: z.string(),
    errorCode: z.string(),
    errorLogs: z.string(),
    hasUserFacingErrorMsg: z.boolean(),
    terraformError: z.string(),
    terraformTemplate: z.string(),
  }).optional(),
  deploymentOutput: z.array(z.object({
    name: z.string(),
    type: z.string(),
  })).optional(),
  endTime: z.string().optional(),
  name: z.string(),
  startTime: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  actuationOutput: z.object({
    actuateLogs: z.string().describe("A link to gcs file that store build logs")
      .optional(),
    ansibleError: z.string().describe(
      "Output only. error message return from ansible.",
    ).optional(),
    ansibleFailedTask: z.array(z.string()).describe(
      "Output only. failed task name return from ansible.",
    ).optional(),
    blueprintId: z.string().describe(
      "reference to Blueprint Controller deployment and revision resource",
    ).optional(),
    cloudbuildId: z.string().describe(
      "Cloud Build instance UUID associated with this revision, without any suffix or prefix",
    ).optional(),
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "TERRAFORM_FAILED",
      "PERMISSION_DENIED_IN_TERRAFORM",
      "QUOTA_EXCEED_IN_TERRAFORM",
      "ANSIBLE_FAILED",
      "CONSTRAINT_VIOLATION_IN_TERRAFORM",
      "RESOURCE_ALREADY_EXISTS_IN_TERRAFORM",
      "RESOURCE_UNAVAILABLE_IN_TERRAFORM",
      "PERMISSION_DENIED_IN_ANSIBLE",
      "INVALID_SECRET_IN_ANSIBLE",
      "TERRAFORM_DELETION_FAILED",
      "RESOURCE_IN_USE_IN_TERRAFORM_DELETION",
      "ANSIBLE_START_FAILED",
    ]).describe(
      "Output only. Code describing any errors that may have occurred. If not specified, there is no error in actuation.",
    ).optional(),
    errorLogs: z.string().describe("A link to actuation cloud build log.")
      .optional(),
    hasUserFacingErrorMsg: z.boolean().describe(
      "Output only. whether the error message is user facing. If true, the error message will be shown in the UI.",
    ).optional(),
    terraformError: z.string().describe(
      "Output only. error message return from terraform.",
    ).optional(),
    terraformTemplate: z.string().describe(
      "reference to terraform template used",
    ).optional(),
  }).describe("Message for output of Actuation").optional(),
  name: z.string().describe(
    "The name of actuation resource. The format is projects/{project}/locations/{location}/deployments/{deployment}/actuations/{actuation}",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workload Manager Deployments.Actuations. Registered at `@swamp/gcp/workloadmanager/deployments-actuations`. */
export const model = {
  type: "@swamp/gcp/workloadmanager/deployments-actuations",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The Actuation object represents the bootstrap state and output results of dep...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a actuations",
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
        if (g["actuationOutput"] !== undefined) {
          body["actuationOutput"] = g["actuationOutput"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
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
      description: "Get a actuations",
      arguments: z.object({
        identifier: z.string().describe("The name of the actuations"),
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
    delete: {
      description: "Delete the actuations",
      arguments: z.object({
        identifier: z.string().describe("The name of the actuations"),
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
      description: "Sync actuations state from GCP",
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
  },
};
