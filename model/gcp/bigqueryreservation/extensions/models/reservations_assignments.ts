// Auto-generated extension model for @swamp/gcp/bigqueryreservation/reservations-assignments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Reservation Reservations.Assignments.
 *
 * An assignment allows a project to submit jobs of a certain type using slots from the specified reservation.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://bigqueryreservation.googleapis.com/";

const INSERT_CONFIG = {
  "id":
    "bigqueryreservation.projects.locations.reservations.assignments.create",
  "path": "v1/{+parent}/assignments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assignmentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigqueryreservation.projects.locations.reservations.assignments.patch",
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
  "id":
    "bigqueryreservation.projects.locations.reservations.assignments.delete",
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
  "id": "bigqueryreservation.projects.locations.reservations.assignments.list",
  "path": "v1/{+parent}/assignments",
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
  assignee: z.string().describe(
    "Optional. The resource which will use the reservation. E.g. `projects/myproject`, `folders/123`, or `organizations/456`.",
  ).optional(),
  jobType: z.enum([
    "JOB_TYPE_UNSPECIFIED",
    "PIPELINE",
    "QUERY",
    "ML_EXTERNAL",
    "BACKGROUND",
    "CONTINUOUS",
    "BACKGROUND_CHANGE_DATA_CAPTURE",
    "BACKGROUND_COLUMN_METADATA_INDEX",
    "BACKGROUND_SEARCH_INDEX_REFRESH",
  ]).describe("Optional. Which type of jobs will use the reservation.")
    .optional(),
  principal: z.string().describe(
    "Optional. Represents the principal for this assignment. If not empty, jobs run by this principal will utilize the associated reservation. Otherwise, jobs will fall back to using the reservation assigned to the project, folder, or organization (in that order). If no reservation is assigned at any of these levels, on-demand capacity will be used. The supported formats are: * `principal://goog/subject/USER_EMAIL_ADDRESS` for users, * `principal://iam.googleapis.com/projects/-/serviceAccounts/SA_EMAIL_ADDRESS` for service accounts, * `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID` for workload identity pool identities. * The special value `unknown_or_deleted_user` represents principals which cannot be read from the user info service, for example deleted users.",
  ).optional(),
  schedulingPolicy: z.object({
    concurrency: z.string().describe(
      "Optional. If present and > 0, the reservation will attempt to limit the concurrency of jobs running for any particular project within it to the given value. This feature is not yet generally available.",
    ).optional(),
    maxSlots: z.string().describe(
      "Optional. If present and > 0, the reservation will attempt to limit the slot consumption of queries running for any particular project within it to the given value. This feature is not yet generally available.",
    ).optional(),
  }).describe(
    "The scheduling policy controls how a reservation's resources are distributed.",
  ).optional(),
  assignmentId: z.string().describe(
    "The optional assignment ID. Assignment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. Max length is 64 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  assignee: z.string().optional(),
  enableGeminiInBigquery: z.boolean().optional(),
  jobType: z.string().optional(),
  name: z.string(),
  principal: z.string().optional(),
  schedulingPolicy: z.object({
    concurrency: z.string(),
    maxSlots: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  assignee: z.string().describe(
    "Optional. The resource which will use the reservation. E.g. `projects/myproject`, `folders/123`, or `organizations/456`.",
  ).optional(),
  jobType: z.enum([
    "JOB_TYPE_UNSPECIFIED",
    "PIPELINE",
    "QUERY",
    "ML_EXTERNAL",
    "BACKGROUND",
    "CONTINUOUS",
    "BACKGROUND_CHANGE_DATA_CAPTURE",
    "BACKGROUND_COLUMN_METADATA_INDEX",
    "BACKGROUND_SEARCH_INDEX_REFRESH",
  ]).describe("Optional. Which type of jobs will use the reservation.")
    .optional(),
  principal: z.string().describe(
    "Optional. Represents the principal for this assignment. If not empty, jobs run by this principal will utilize the associated reservation. Otherwise, jobs will fall back to using the reservation assigned to the project, folder, or organization (in that order). If no reservation is assigned at any of these levels, on-demand capacity will be used. The supported formats are: * `principal://goog/subject/USER_EMAIL_ADDRESS` for users, * `principal://iam.googleapis.com/projects/-/serviceAccounts/SA_EMAIL_ADDRESS` for service accounts, * `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID` for workload identity pool identities. * The special value `unknown_or_deleted_user` represents principals which cannot be read from the user info service, for example deleted users.",
  ).optional(),
  schedulingPolicy: z.object({
    concurrency: z.string().describe(
      "Optional. If present and > 0, the reservation will attempt to limit the concurrency of jobs running for any particular project within it to the given value. This feature is not yet generally available.",
    ).optional(),
    maxSlots: z.string().describe(
      "Optional. If present and > 0, the reservation will attempt to limit the slot consumption of queries running for any particular project within it to the given value. This feature is not yet generally available.",
    ).optional(),
  }).describe(
    "The scheduling policy controls how a reservation's resources are distributed.",
  ).optional(),
  assignmentId: z.string().describe(
    "The optional assignment ID. Assignment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. Max length is 64 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BigQuery Reservation Reservations.Assignments. Registered at `@swamp/gcp/bigqueryreservation/reservations-assignments`. */
export const model = {
  type: "@swamp/gcp/bigqueryreservation/reservations-assignments",
  version: "2026.05.18.2",
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
      toVersion: "2026.04.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.19.1",
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
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An assignment allows a project to submit jobs of a certain type using slots f...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assignments",
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
        if (g["assignee"] !== undefined) body["assignee"] = g["assignee"];
        if (g["jobType"] !== undefined) body["jobType"] = g["jobType"];
        if (g["principal"] !== undefined) body["principal"] = g["principal"];
        if (g["schedulingPolicy"] !== undefined) {
          body["schedulingPolicy"] = g["schedulingPolicy"];
        }
        if (g["assignmentId"] !== undefined) {
          body["assignmentId"] = g["assignmentId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Get a assignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the assignments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    update: {
      description: "Update assignments attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["assignee"] !== undefined) body["assignee"] = g["assignee"];
        if (g["jobType"] !== undefined) body["jobType"] = g["jobType"];
        if (g["principal"] !== undefined) body["principal"] = g["principal"];
        if (g["schedulingPolicy"] !== undefined) {
          body["schedulingPolicy"] = g["schedulingPolicy"];
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
          undefined,
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
      description: "Delete the assignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the assignments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync assignments state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    move: {
      description: "move",
      arguments: z.object({
        assignmentId: z.any().optional(),
        destinationId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["assignmentId"] !== undefined) {
          body["assignmentId"] = args["assignmentId"];
        }
        if (args["destinationId"] !== undefined) {
          body["destinationId"] = args["destinationId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigqueryreservation.projects.locations.reservations.assignments.move",
            "path": "v1/{+name}:move",
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
