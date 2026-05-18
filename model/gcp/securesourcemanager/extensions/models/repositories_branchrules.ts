// Auto-generated extension model for @swamp/gcp/securesourcemanager/repositories-branchrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Secure Source Manager Repositories.BranchRules.
 *
 * Metadata of a BranchRule. BranchRule is the protection rule to enforce pre-defined rules on designated branches within a repository.
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
  return `${parent}/branchRules/${shortName}`;
}

const BASE_URL = "https://securesourcemanager.googleapis.com/";

const GET_CONFIG = {
  "id": "securesourcemanager.projects.locations.repositories.branchRules.get",
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
  "id":
    "securesourcemanager.projects.locations.repositories.branchRules.create",
  "path": "v1/{+parent}/branchRules",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "branchRuleId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "securesourcemanager.projects.locations.repositories.branchRules.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "securesourcemanager.projects.locations.repositories.branchRules.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  allowStaleReviews: z.boolean().describe(
    "Optional. Determines if allow stale reviews or approvals before merging to the branch.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Determines if the branch rule is disabled or not.",
  ).optional(),
  includePattern: z.string().describe(
    "Optional. The pattern of the branch that can match to this BranchRule. Specified as regex..* for all branches. Examples: main, (main|release.*). Current MVP phase only support `.*` for wildcard.",
  ).optional(),
  minimumApprovalsCount: z.number().int().describe(
    "Optional. The minimum number of approvals required for the branch rule to be matched.",
  ).optional(),
  minimumReviewsCount: z.number().int().describe(
    "Optional. The minimum number of reviews required for the branch rule to be matched.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}`",
  ).optional(),
  requireCodeOwnerApproval: z.boolean().describe(
    "Optional. Determines if code owners must approve before merging to the branch.",
  ).optional(),
  requireCommentsResolved: z.boolean().describe(
    "Optional. Determines if require comments resolved before merging to the branch.",
  ).optional(),
  requireLinearHistory: z.boolean().describe(
    "Optional. Determines if require linear history before merging to the branch.",
  ).optional(),
  requirePullRequest: z.boolean().describe(
    "Optional. Determines if the branch rule requires a pull request or not.",
  ).optional(),
  requiredStatusChecks: z.array(z.object({
    context: z.string().describe("Required. The context of the check.")
      .optional(),
  })).describe(
    "Optional. List of required status checks before merging to the branch.",
  ).optional(),
  branchRuleId: z.string().describe("The branchRuleId for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowStaleReviews: z.boolean().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  disabled: z.boolean().optional(),
  etag: z.string().optional(),
  includePattern: z.string().optional(),
  minimumApprovalsCount: z.number().optional(),
  minimumReviewsCount: z.number().optional(),
  name: z.string(),
  requireCodeOwnerApproval: z.boolean().optional(),
  requireCommentsResolved: z.boolean().optional(),
  requireLinearHistory: z.boolean().optional(),
  requirePullRequest: z.boolean().optional(),
  requiredStatusChecks: z.array(z.object({
    context: z.string(),
  })).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowStaleReviews: z.boolean().describe(
    "Optional. Determines if allow stale reviews or approvals before merging to the branch.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Determines if the branch rule is disabled or not.",
  ).optional(),
  includePattern: z.string().describe(
    "Optional. The pattern of the branch that can match to this BranchRule. Specified as regex..* for all branches. Examples: main, (main|release.*). Current MVP phase only support `.*` for wildcard.",
  ).optional(),
  minimumApprovalsCount: z.number().int().describe(
    "Optional. The minimum number of approvals required for the branch rule to be matched.",
  ).optional(),
  minimumReviewsCount: z.number().int().describe(
    "Optional. The minimum number of reviews required for the branch rule to be matched.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}`",
  ).optional(),
  requireCodeOwnerApproval: z.boolean().describe(
    "Optional. Determines if code owners must approve before merging to the branch.",
  ).optional(),
  requireCommentsResolved: z.boolean().describe(
    "Optional. Determines if require comments resolved before merging to the branch.",
  ).optional(),
  requireLinearHistory: z.boolean().describe(
    "Optional. Determines if require linear history before merging to the branch.",
  ).optional(),
  requirePullRequest: z.boolean().describe(
    "Optional. Determines if the branch rule requires a pull request or not.",
  ).optional(),
  requiredStatusChecks: z.array(z.object({
    context: z.string().describe("Required. The context of the check.")
      .optional(),
  })).describe(
    "Optional. List of required status checks before merging to the branch.",
  ).optional(),
  branchRuleId: z.string().describe("The branchRuleId for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Secure Source Manager Repositories.BranchRules. Registered at `@swamp/gcp/securesourcemanager/repositories-branchrules`. */
export const model = {
  type: "@swamp/gcp/securesourcemanager/repositories-branchrules",
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
        "Metadata of a BranchRule. BranchRule is the protection rule to enforce pre-de...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a branchRules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allowStaleReviews"] !== undefined) {
          body["allowStaleReviews"] = g["allowStaleReviews"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["includePattern"] !== undefined) {
          body["includePattern"] = g["includePattern"];
        }
        if (g["minimumApprovalsCount"] !== undefined) {
          body["minimumApprovalsCount"] = g["minimumApprovalsCount"];
        }
        if (g["minimumReviewsCount"] !== undefined) {
          body["minimumReviewsCount"] = g["minimumReviewsCount"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requireCodeOwnerApproval"] !== undefined) {
          body["requireCodeOwnerApproval"] = g["requireCodeOwnerApproval"];
        }
        if (g["requireCommentsResolved"] !== undefined) {
          body["requireCommentsResolved"] = g["requireCommentsResolved"];
        }
        if (g["requireLinearHistory"] !== undefined) {
          body["requireLinearHistory"] = g["requireLinearHistory"];
        }
        if (g["requirePullRequest"] !== undefined) {
          body["requirePullRequest"] = g["requirePullRequest"];
        }
        if (g["requiredStatusChecks"] !== undefined) {
          body["requiredStatusChecks"] = g["requiredStatusChecks"];
        }
        if (g["branchRuleId"] !== undefined) {
          body["branchRuleId"] = g["branchRuleId"];
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
      description: "Get a branchRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the branchRules"),
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
      description: "Update branchRules attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["allowStaleReviews"] !== undefined) {
          body["allowStaleReviews"] = g["allowStaleReviews"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["includePattern"] !== undefined) {
          body["includePattern"] = g["includePattern"];
        }
        if (g["minimumApprovalsCount"] !== undefined) {
          body["minimumApprovalsCount"] = g["minimumApprovalsCount"];
        }
        if (g["minimumReviewsCount"] !== undefined) {
          body["minimumReviewsCount"] = g["minimumReviewsCount"];
        }
        if (g["requireCodeOwnerApproval"] !== undefined) {
          body["requireCodeOwnerApproval"] = g["requireCodeOwnerApproval"];
        }
        if (g["requireCommentsResolved"] !== undefined) {
          body["requireCommentsResolved"] = g["requireCommentsResolved"];
        }
        if (g["requireLinearHistory"] !== undefined) {
          body["requireLinearHistory"] = g["requireLinearHistory"];
        }
        if (g["requirePullRequest"] !== undefined) {
          body["requirePullRequest"] = g["requirePullRequest"];
        }
        if (g["requiredStatusChecks"] !== undefined) {
          body["requiredStatusChecks"] = g["requiredStatusChecks"];
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
      description: "Delete the branchRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the branchRules"),
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
      description: "Sync branchRules state from GCP",
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
