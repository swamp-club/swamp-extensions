// Auto-generated extension model for @swamp/gcp/bigqueryreservation/capacitycommitments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Reservation CapacityCommitments.
 *
 * Capacity commitment is a way to purchase compute capacity for BigQuery jobs (in the form of slots) with some committed period of usage. Annual commitments renew by default. Commitments can be removed after their commitment end time passes. In order to remove annual commitment, its plan needs to be changed to monthly or flex first. A capacity commitment resource exists as a child resource of the admin project.
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
  return `${parent}/capacityCommitments/${shortName}`;
}

const BASE_URL = "https://bigqueryreservation.googleapis.com/";

const GET_CONFIG = {
  "id": "bigqueryreservation.projects.locations.capacityCommitments.get",
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
  "id": "bigqueryreservation.projects.locations.capacityCommitments.create",
  "path": "v1/{+parent}/capacityCommitments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "capacityCommitmentId": {
      "location": "query",
    },
    "enforceSingleAdminProjectPerOrg": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigqueryreservation.projects.locations.capacityCommitments.patch",
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
  "id": "bigqueryreservation.projects.locations.capacityCommitments.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
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
  edition: z.enum([
    "EDITION_UNSPECIFIED",
    "STANDARD",
    "ENTERPRISE",
    "ENTERPRISE_PLUS",
  ]).describe("Optional. Edition of the capacity commitment.").optional(),
  failureStatus: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  plan: z.enum([
    "COMMITMENT_PLAN_UNSPECIFIED",
    "FLEX",
    "FLEX_FLAT_RATE",
    "TRIAL",
    "MONTHLY",
    "MONTHLY_FLAT_RATE",
    "ANNUAL",
    "ANNUAL_FLAT_RATE",
    "THREE_YEAR",
    "NONE",
  ]).describe("Optional. Capacity commitment commitment plan.").optional(),
  renewalPlan: z.enum([
    "COMMITMENT_PLAN_UNSPECIFIED",
    "FLEX",
    "FLEX_FLAT_RATE",
    "TRIAL",
    "MONTHLY",
    "MONTHLY_FLAT_RATE",
    "ANNUAL",
    "ANNUAL_FLAT_RATE",
    "THREE_YEAR",
    "NONE",
  ]).describe(
    "Optional. The plan this capacity commitment is converted to after commitment_end_time passes. Once the plan is changed, committed period is extended according to commitment plan. Only applicable for ANNUAL and TRIAL commitments.",
  ).optional(),
  slotCount: z.string().describe(
    "Optional. Number of slots in this commitment.",
  ).optional(),
  capacityCommitmentId: z.string().describe(
    "The optional capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. NOTE: this ID won't be kept if the capacity commitment is split or merged.",
  ).optional(),
  enforceSingleAdminProjectPerOrg: z.string().describe(
    "If true, fail the request if another project in the organization has a capacity commitment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  commitmentEndTime: z.string().optional(),
  commitmentStartTime: z.string().optional(),
  edition: z.string().optional(),
  failureStatus: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  isFlatRate: z.boolean().optional(),
  multiRegionAuxiliary: z.boolean().optional(),
  name: z.string(),
  plan: z.string().optional(),
  renewalPlan: z.string().optional(),
  slotCount: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  edition: z.enum([
    "EDITION_UNSPECIFIED",
    "STANDARD",
    "ENTERPRISE",
    "ENTERPRISE_PLUS",
  ]).describe("Optional. Edition of the capacity commitment.").optional(),
  failureStatus: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  plan: z.enum([
    "COMMITMENT_PLAN_UNSPECIFIED",
    "FLEX",
    "FLEX_FLAT_RATE",
    "TRIAL",
    "MONTHLY",
    "MONTHLY_FLAT_RATE",
    "ANNUAL",
    "ANNUAL_FLAT_RATE",
    "THREE_YEAR",
    "NONE",
  ]).describe("Optional. Capacity commitment commitment plan.").optional(),
  renewalPlan: z.enum([
    "COMMITMENT_PLAN_UNSPECIFIED",
    "FLEX",
    "FLEX_FLAT_RATE",
    "TRIAL",
    "MONTHLY",
    "MONTHLY_FLAT_RATE",
    "ANNUAL",
    "ANNUAL_FLAT_RATE",
    "THREE_YEAR",
    "NONE",
  ]).describe(
    "Optional. The plan this capacity commitment is converted to after commitment_end_time passes. Once the plan is changed, committed period is extended according to commitment plan. Only applicable for ANNUAL and TRIAL commitments.",
  ).optional(),
  slotCount: z.string().describe(
    "Optional. Number of slots in this commitment.",
  ).optional(),
  capacityCommitmentId: z.string().describe(
    "The optional capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. NOTE: this ID won't be kept if the capacity commitment is split or merged.",
  ).optional(),
  enforceSingleAdminProjectPerOrg: z.string().describe(
    "If true, fail the request if another project in the organization has a capacity commitment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BigQuery Reservation CapacityCommitments. Registered at `@swamp/gcp/bigqueryreservation/capacitycommitments`. */
export const model = {
  type: "@swamp/gcp/bigqueryreservation/capacitycommitments",
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
        "Capacity commitment is a way to purchase compute capacity for BigQuery jobs (...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a capacityCommitments",
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
        if (g["edition"] !== undefined) body["edition"] = g["edition"];
        if (g["failureStatus"] !== undefined) {
          body["failureStatus"] = g["failureStatus"];
        }
        if (g["plan"] !== undefined) body["plan"] = g["plan"];
        if (g["renewalPlan"] !== undefined) {
          body["renewalPlan"] = g["renewalPlan"];
        }
        if (g["slotCount"] !== undefined) body["slotCount"] = g["slotCount"];
        if (g["capacityCommitmentId"] !== undefined) {
          body["capacityCommitmentId"] = g["capacityCommitmentId"];
        }
        if (g["enforceSingleAdminProjectPerOrg"] !== undefined) {
          body["enforceSingleAdminProjectPerOrg"] =
            g["enforceSingleAdminProjectPerOrg"];
        }
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
      description: "Get a capacityCommitments",
      arguments: z.object({
        identifier: z.string().describe("The name of the capacityCommitments"),
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
    update: {
      description: "Update capacityCommitments attributes",
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
        if (g["edition"] !== undefined) body["edition"] = g["edition"];
        if (g["failureStatus"] !== undefined) {
          body["failureStatus"] = g["failureStatus"];
        }
        if (g["plan"] !== undefined) body["plan"] = g["plan"];
        if (g["renewalPlan"] !== undefined) {
          body["renewalPlan"] = g["renewalPlan"];
        }
        if (g["slotCount"] !== undefined) body["slotCount"] = g["slotCount"];
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
              "failedValues": ["FAILED"],
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
      description: "Delete the capacityCommitments",
      arguments: z.object({
        identifier: z.string().describe("The name of the capacityCommitments"),
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
      description: "Sync capacityCommitments state from GCP",
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
    merge: {
      description: "merge",
      arguments: z.object({
        capacityCommitmentId: z.any().optional(),
        capacityCommitmentIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["capacityCommitmentId"] !== undefined) {
          body["capacityCommitmentId"] = args["capacityCommitmentId"];
        }
        if (args["capacityCommitmentIds"] !== undefined) {
          body["capacityCommitmentIds"] = args["capacityCommitmentIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigqueryreservation.projects.locations.capacityCommitments.merge",
            "path": "v1/{+parent}/capacityCommitments:merge",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    split: {
      description: "split",
      arguments: z.object({
        slotCount: z.any().optional(),
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
        if (args["slotCount"] !== undefined) {
          body["slotCount"] = args["slotCount"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigqueryreservation.projects.locations.capacityCommitments.split",
            "path": "v1/{+name}:split",
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
