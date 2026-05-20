// Auto-generated extension model for @swamp/gcp/saasservicemgmt/rollouts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Lifecycle Manager Rollouts.
 *
 * Represents a single rollout execution and its results
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
  return `${parent}/rollouts/${shortName}`;
}

const BASE_URL = "https://saasservicemgmt.googleapis.com/";

const GET_CONFIG = {
  "id": "saasservicemgmt.projects.locations.rollouts.get",
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
  "id": "saasservicemgmt.projects.locations.rollouts.create",
  "path": "v1/{+parent}/rollouts",
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
    "rolloutId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "saasservicemgmt.projects.locations.rollouts.patch",
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
    "requestId": {
      "location": "query",
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
  "id": "saasservicemgmt.projects.locations.rollouts.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  control: z.object({
    action: z.enum([
      "ROLLOUT_ACTION_UNSPECIFIED",
      "ROLLOUT_ACTION_RUN",
      "ROLLOUT_ACTION_PAUSE",
      "ROLLOUT_ACTION_CANCEL",
    ]).describe(
      "Required. Action to be performed on the Rollout. The default behavior is to run the rollout until it naturally reaches a terminal state.",
    ).optional(),
    runParams: z.object({
      retryFailedOperations: z.boolean().describe(
        "Required. If true, the rollout will retry failed operations when resumed. This is applicable only the current state of the Rollout is PAUSED and the requested action is RUN.",
      ).optional(),
    }).describe(
      "Parameters for the RUN action controlling the behavior of the rollout when it is resumed from a PAUSED state.",
    ).optional(),
  }).describe(
    "RolloutControl provides a way to request a change to the execution of a Rollout by pausing or canceling it.",
  ).optional(),
  flagRelease: z.string().describe(
    'Optional. Immutable. Name of the FlagRelease to be rolled out to the target Units. Release and FlagRelease are mutually exclusive. Note: `release` comment needs to be adjusted to mention that "Release and FlagRelease are mutually exclusive" when visibility restriction will be lifted.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}"',
  ).optional(),
  release: z.string().describe(
    "Optional. Immutable. Name of the Release that gets rolled out to target Units. Required if no other type of release is specified.",
  ).optional(),
  rolloutKind: z.string().describe(
    "Required. Immutable. Name of the RolloutKind this rollout is stemming from and adhering to.",
  ).optional(),
  rolloutOrchestrationStrategy: z.string().describe(
    'Optional. The strategy used for executing this Rollout. This strategy will override whatever strategy is specified in the RolloutKind. If not specified on creation, the strategy from RolloutKind will be used. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the targeted UnitKind\'s Saas Locations.',
  ).optional(),
  stats: z.object({
    estimatedTotalUnitCount: z.string().describe(
      "Optional. Output only. Estimated number of units based. The estimation is computed upon creation of the rollout.",
    ).optional(),
    operationsByState: z.array(z.object({
      count: z.number().int().describe(
        "Required. Number of records in the group.",
      ).optional(),
      group: z.string().describe("Required. Group by which to aggregate.")
        .optional(),
    })).describe(
      'Optional. Output only. Unordered list. A breakdown of the progress of operations triggered by the rollout. Provides a count of Operations by their state. This can be used to determine the number of units which have been updated, or are scheduled to be updated. There will be at most one entry per group. Possible values for operation groups are: - "SCHEDULED" - "PENDING" - "RUNNING" - "SUCCEEDED" - "FAILED" - "CANCELLED"',
    ).optional(),
  }).describe(
    "RolloutStats contains information about the progress of a rollout.",
  ).optional(),
  unitFilter: z.string().describe(
    "Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. If not provided, the unit_filter from the RolloutKind will be used.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  rolloutId: z.string().describe("Required. The ID value for the new rollout.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  control: z.object({
    action: z.string(),
    runParams: z.object({
      retryFailedOperations: z.boolean(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  effectiveUnitFilter: z.string().optional(),
  endTime: z.string().optional(),
  etag: z.string().optional(),
  flagRelease: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  parentRollout: z.string().optional(),
  release: z.string().optional(),
  rolloutKind: z.string().optional(),
  rolloutOrchestrationStrategy: z.string().optional(),
  rootRollout: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  stateMessage: z.string().optional(),
  stateTransitionTime: z.string().optional(),
  stats: z.object({
    estimatedTotalUnitCount: z.string(),
    operationsByState: z.array(z.object({
      count: z.number(),
      group: z.string(),
    })),
  }).optional(),
  uid: z.string().optional(),
  unitFilter: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  control: z.object({
    action: z.enum([
      "ROLLOUT_ACTION_UNSPECIFIED",
      "ROLLOUT_ACTION_RUN",
      "ROLLOUT_ACTION_PAUSE",
      "ROLLOUT_ACTION_CANCEL",
    ]).describe(
      "Required. Action to be performed on the Rollout. The default behavior is to run the rollout until it naturally reaches a terminal state.",
    ).optional(),
    runParams: z.object({
      retryFailedOperations: z.boolean().describe(
        "Required. If true, the rollout will retry failed operations when resumed. This is applicable only the current state of the Rollout is PAUSED and the requested action is RUN.",
      ).optional(),
    }).describe(
      "Parameters for the RUN action controlling the behavior of the rollout when it is resumed from a PAUSED state.",
    ).optional(),
  }).describe(
    "RolloutControl provides a way to request a change to the execution of a Rollout by pausing or canceling it.",
  ).optional(),
  flagRelease: z.string().describe(
    'Optional. Immutable. Name of the FlagRelease to be rolled out to the target Units. Release and FlagRelease are mutually exclusive. Note: `release` comment needs to be adjusted to mention that "Release and FlagRelease are mutually exclusive" when visibility restriction will be lifted.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}"',
  ).optional(),
  release: z.string().describe(
    "Optional. Immutable. Name of the Release that gets rolled out to target Units. Required if no other type of release is specified.",
  ).optional(),
  rolloutKind: z.string().describe(
    "Required. Immutable. Name of the RolloutKind this rollout is stemming from and adhering to.",
  ).optional(),
  rolloutOrchestrationStrategy: z.string().describe(
    'Optional. The strategy used for executing this Rollout. This strategy will override whatever strategy is specified in the RolloutKind. If not specified on creation, the strategy from RolloutKind will be used. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the targeted UnitKind\'s Saas Locations.',
  ).optional(),
  stats: z.object({
    estimatedTotalUnitCount: z.string().describe(
      "Optional. Output only. Estimated number of units based. The estimation is computed upon creation of the rollout.",
    ).optional(),
    operationsByState: z.array(z.object({
      count: z.number().int().describe(
        "Required. Number of records in the group.",
      ).optional(),
      group: z.string().describe("Required. Group by which to aggregate.")
        .optional(),
    })).describe(
      'Optional. Output only. Unordered list. A breakdown of the progress of operations triggered by the rollout. Provides a count of Operations by their state. This can be used to determine the number of units which have been updated, or are scheduled to be updated. There will be at most one entry per group. Possible values for operation groups are: - "SCHEDULED" - "PENDING" - "RUNNING" - "SUCCEEDED" - "FAILED" - "CANCELLED"',
    ).optional(),
  }).describe(
    "RolloutStats contains information about the progress of a rollout.",
  ).optional(),
  unitFilter: z.string().describe(
    "Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. If not provided, the unit_filter from the RolloutKind will be used.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  rolloutId: z.string().describe("Required. The ID value for the new rollout.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Lifecycle Manager Rollouts. Registered at `@swamp/gcp/saasservicemgmt/rollouts`. */
export const model = {
  type: "@swamp/gcp/saasservicemgmt/rollouts",
  version: "2026.05.20.1",
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
      toVersion: "2026.04.11.1",
      description: "Added: flagRelease",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: flagRelease",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { flagRelease: _flagRelease, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: flagRelease",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: flagRelease",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { flagRelease: _flagRelease, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: flagRelease",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a single rollout execution and its results",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rollouts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["control"] !== undefined) body["control"] = g["control"];
        if (g["flagRelease"] !== undefined) {
          body["flagRelease"] = g["flagRelease"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["release"] !== undefined) body["release"] = g["release"];
        if (g["rolloutKind"] !== undefined) {
          body["rolloutKind"] = g["rolloutKind"];
        }
        if (g["rolloutOrchestrationStrategy"] !== undefined) {
          body["rolloutOrchestrationStrategy"] =
            g["rolloutOrchestrationStrategy"];
        }
        if (g["stats"] !== undefined) body["stats"] = g["stats"];
        if (g["unitFilter"] !== undefined) body["unitFilter"] = g["unitFilter"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["rolloutId"] !== undefined) body["rolloutId"] = g["rolloutId"];
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
      description: "Get a rollouts",
      arguments: z.object({
        identifier: z.string().describe("The name of the rollouts"),
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
      description: "Update rollouts attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["control"] !== undefined) body["control"] = g["control"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["stats"] !== undefined) body["stats"] = g["stats"];
        if (g["unitFilter"] !== undefined) body["unitFilter"] = g["unitFilter"];
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
      description: "Delete the rollouts",
      arguments: z.object({
        identifier: z.string().describe("The name of the rollouts"),
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
      description: "Sync rollouts state from GCP",
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
