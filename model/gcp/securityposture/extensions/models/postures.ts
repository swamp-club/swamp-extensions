// Auto-generated extension model for @swamp/gcp/securityposture/postures
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Posture Postures.
 *
 * The details of a posture.
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
  return `${parent}/postures/${shortName}`;
}

const BASE_URL = "https://securityposture.googleapis.com/";

const GET_CONFIG = {
  "id": "securityposture.organizations.locations.postures.get",
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
  "id": "securityposture.organizations.locations.postures.create",
  "path": "v1/{+parent}/postures",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "postureId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "securityposture.organizations.locations.postures.patch",
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
    "revisionId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "securityposture.organizations.locations.postures.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "securityposture.organizations.locations.postures.list",
  "path": "v1/{+parent}/postures",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations).",
  ).optional(),
  description: z.string().describe("Optional. A description of the posture.")
    .optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`.",
  ).optional(),
  policySets: z.array(z.object({
    description: z.string().describe(
      "Optional. A description of the policy set.",
    ).optional(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.unknown()).describe(
        "Optional. The compliance standards that the policy helps enforce.",
      ).optional(),
      constraint: z.object({
        orgPolicyConstraint: z.unknown().describe(
          "A predefined organization policy constraint.",
        ).optional(),
        orgPolicyConstraintCustom: z.unknown().describe(
          "A custom organization policy constraint.",
        ).optional(),
        securityHealthAnalyticsCustomModule: z.unknown().describe(
          "A custom module for Security Health Analytics.",
        ).optional(),
        securityHealthAnalyticsModule: z.unknown().describe(
          "A built-in detector for Security Health Analytics.",
        ).optional(),
      }).describe("Metadata for a constraint in a Policy.").optional(),
      description: z.string().describe("Optional. A description of the policy.")
        .optional(),
      policyId: z.string().describe(
        "Required. A user-specified identifier for the policy. In a PolicySet, each policy must have a unique identifier.",
      ).optional(),
    })).describe(
      "Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set.",
    ).optional(),
    policySetId: z.string().describe(
      "Required. An identifier for the policy set.",
    ).optional(),
  })).describe("Required. The PolicySet resources that the posture includes.")
    .optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DEPRECATED", "DRAFT", "ACTIVE"])
    .describe(
      "Required. The state of the posture at the specified `revision_id`.",
    ).optional(),
  postureId: z.string().describe("Required. An identifier for the posture.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  categories: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  policySets: z.array(z.object({
    description: z.string(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.unknown()),
      constraint: z.object({
        orgPolicyConstraint: z.unknown(),
        orgPolicyConstraintCustom: z.unknown(),
        securityHealthAnalyticsCustomModule: z.unknown(),
        securityHealthAnalyticsModule: z.unknown(),
      }),
      description: z.string(),
      policyId: z.string(),
    })),
    policySetId: z.string(),
  })).optional(),
  reconciling: z.boolean().optional(),
  revisionId: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations).",
  ).optional(),
  description: z.string().describe("Optional. A description of the posture.")
    .optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`.",
  ).optional(),
  policySets: z.array(z.object({
    description: z.string().describe(
      "Optional. A description of the policy set.",
    ).optional(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.unknown()).describe(
        "Optional. The compliance standards that the policy helps enforce.",
      ).optional(),
      constraint: z.object({
        orgPolicyConstraint: z.unknown().describe(
          "A predefined organization policy constraint.",
        ).optional(),
        orgPolicyConstraintCustom: z.unknown().describe(
          "A custom organization policy constraint.",
        ).optional(),
        securityHealthAnalyticsCustomModule: z.unknown().describe(
          "A custom module for Security Health Analytics.",
        ).optional(),
        securityHealthAnalyticsModule: z.unknown().describe(
          "A built-in detector for Security Health Analytics.",
        ).optional(),
      }).describe("Metadata for a constraint in a Policy.").optional(),
      description: z.string().describe("Optional. A description of the policy.")
        .optional(),
      policyId: z.string().describe(
        "Required. A user-specified identifier for the policy. In a PolicySet, each policy must have a unique identifier.",
      ).optional(),
    })).describe(
      "Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set.",
    ).optional(),
    policySetId: z.string().describe(
      "Required. An identifier for the policy set.",
    ).optional(),
  })).describe("Required. The PolicySet resources that the posture includes.")
    .optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DEPRECATED", "DRAFT", "ACTIVE"])
    .describe(
      "Required. The state of the posture at the specified `revision_id`.",
    ).optional(),
  postureId: z.string().describe("Required. An identifier for the posture.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Security Posture Postures. Registered at `@swamp/gcp/securityposture/postures`. */
export const model = {
  type: "@swamp/gcp/securityposture/postures",
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
      description: "The details of a posture.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a postures",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policySets"] !== undefined) body["policySets"] = g["policySets"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["postureId"] !== undefined) body["postureId"] = g["postureId"];
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a postures",
      arguments: z.object({
        identifier: z.string().describe("The name of the postures"),
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
      description: "Update postures attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["policySets"] !== undefined) body["policySets"] = g["policySets"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
      description: "Delete the postures",
      arguments: z.object({
        identifier: z.string().describe("The name of the postures"),
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
      description: "Sync postures state from GCP",
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
    extract: {
      description: "extract",
      arguments: z.object({
        postureId: z.any().optional(),
        workload: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["postureId"] !== undefined) {
          body["postureId"] = args["postureId"];
        }
        if (args["workload"] !== undefined) body["workload"] = args["workload"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securityposture.organizations.locations.postures.extract",
            "path": "v1/{+parent}/postures:extract",
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
    list_revisions: {
      description: "list revisions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securityposture.organizations.locations.postures.listRevisions",
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
