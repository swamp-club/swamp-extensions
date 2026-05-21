// Auto-generated extension model for @swamp/gcp/apigee/securityfeedback
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee SecurityFeedback.
 *
 * Represents a feedback report from an Advanced API Security customer.
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
  return `${parent}/securityFeedback/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.securityFeedback.get",
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
  "id": "apigee.organizations.securityFeedback.create",
  "path": "v1/{+parent}/securityFeedback",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "securityFeedbackId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "apigee.organizations.securityFeedback.patch",
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
  "id": "apigee.organizations.securityFeedback.delete",
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
  "id": "apigee.organizations.securityFeedback.list",
  "path": "v1/{+parent}/securityFeedback",
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
  comment: z.string().describe(
    "Optional. Optional text the user can provide for additional, unstructured context.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the feedback.",
  ).optional(),
  feedbackContexts: z.array(z.object({
    attribute: z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "ATTRIBUTE_ENVIRONMENTS",
      "ATTRIBUTE_IP_ADDRESS_RANGES",
    ]).describe("Required. The attribute the user is providing feedback about.")
      .optional(),
    values: z.array(z.string()).describe(
      "Required. The values of the attribute the user is providing feedback about.",
    ).optional(),
  })).describe(
    "Required. One or more attribute/value pairs for constraining the feedback.",
  ).optional(),
  feedbackType: z.enum(["FEEDBACK_TYPE_UNSPECIFIED", "EXCLUDED_DETECTION"])
    .describe("Required. The type of feedback being submitted.").optional(),
  reason: z.enum([
    "REASON_UNSPECIFIED",
    "INTERNAL_SYSTEM",
    "NON_RISK_CLIENT",
    "NAT",
    "PENETRATION_TEST",
    "OTHER",
  ]).describe("Optional. The reason for the feedback.").optional(),
  securityFeedbackId: z.string().describe(
    "Optional. The id for this feedback report. If not provided, it will be set to a system-generated UUID.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  comment: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  feedbackContexts: z.array(z.object({
    attribute: z.string(),
    values: z.array(z.string()),
  })).optional(),
  feedbackType: z.string().optional(),
  name: z.string(),
  reason: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  comment: z.string().describe(
    "Optional. Optional text the user can provide for additional, unstructured context.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the feedback.",
  ).optional(),
  feedbackContexts: z.array(z.object({
    attribute: z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "ATTRIBUTE_ENVIRONMENTS",
      "ATTRIBUTE_IP_ADDRESS_RANGES",
    ]).describe("Required. The attribute the user is providing feedback about.")
      .optional(),
    values: z.array(z.string()).describe(
      "Required. The values of the attribute the user is providing feedback about.",
    ).optional(),
  })).describe(
    "Required. One or more attribute/value pairs for constraining the feedback.",
  ).optional(),
  feedbackType: z.enum(["FEEDBACK_TYPE_UNSPECIFIED", "EXCLUDED_DETECTION"])
    .describe("Required. The type of feedback being submitted.").optional(),
  reason: z.enum([
    "REASON_UNSPECIFIED",
    "INTERNAL_SYSTEM",
    "NON_RISK_CLIENT",
    "NAT",
    "PENETRATION_TEST",
    "OTHER",
  ]).describe("Optional. The reason for the feedback.").optional(),
  securityFeedbackId: z.string().describe(
    "Optional. The id for this feedback report. If not provided, it will be set to a system-generated UUID.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee SecurityFeedback. Registered at `@swamp/gcp/apigee/securityfeedback`. */
export const model = {
  type: "@swamp/gcp/apigee/securityfeedback",
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
        "Represents a feedback report from an Advanced API Security customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a securityFeedback",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["feedbackContexts"] !== undefined) {
          body["feedbackContexts"] = g["feedbackContexts"];
        }
        if (g["feedbackType"] !== undefined) {
          body["feedbackType"] = g["feedbackType"];
        }
        if (g["reason"] !== undefined) body["reason"] = g["reason"];
        if (g["securityFeedbackId"] !== undefined) {
          body["securityFeedbackId"] = g["securityFeedbackId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a securityFeedback",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityFeedback"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update securityFeedback attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["feedbackContexts"] !== undefined) {
          body["feedbackContexts"] = g["feedbackContexts"];
        }
        if (g["feedbackType"] !== undefined) {
          body["feedbackType"] = g["feedbackType"];
        }
        if (g["reason"] !== undefined) body["reason"] = g["reason"];
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
      description: "Delete the securityFeedback",
      arguments: z.object({
        identifier: z.string().describe("The name of the securityFeedback"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync securityFeedback state from GCP",
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
            String(g["parent"] ?? ""),
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
