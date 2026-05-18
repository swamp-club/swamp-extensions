// Auto-generated extension model for @swamp/gcp/compute/globalvmextensionpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine GlobalVmExtensionPolicies.
 *
 * Message describing GlobalVmExtensionPolicy object.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.globalVmExtensionPolicies.get",
  "path":
    "projects/{project}/global/vmExtensionPolicies/{globalVmExtensionPolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "globalVmExtensionPolicy",
  ],
  "parameters": {
    "globalVmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.globalVmExtensionPolicies.insert",
  "path": "projects/{project}/global/vmExtensionPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.globalVmExtensionPolicies.update",
  "path":
    "projects/{project}/global/vmExtensionPolicies/{globalVmExtensionPolicy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "globalVmExtensionPolicy",
  ],
  "parameters": {
    "globalVmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.globalVmExtensionPolicies.delete",
  "path":
    "projects/{project}/global/vmExtensionPolicies/{globalVmExtensionPolicy}/delete",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "globalVmExtensionPolicy",
  ],
  "parameters": {
    "globalVmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  extensionPolicies: z.record(
    z.string(),
    z.object({
      pinnedVersion: z.string().describe(
        "Optional. The version pinning for the extension. If empty, the extension will be installed with the latest version released by the extension producer.",
      ).optional(),
      stringConfig: z.string().describe(
        "Optional. String configuration. Any string payload that the extension understands.",
      ).optional(),
    }),
  ).describe(
    'Required. Map from extension (eg: "cloudops") to its policy configuration. The key is the name of the extension.',
  ).optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.string()).describe(
        "Optional. Labels as key value pairs. A VM should contain all the pairs specified in this map to be selected; Labels within the LabelSelector are OR'ed.",
      ).optional(),
    }).describe(
      "A LabelSelector is applicable for a VM only if it matches all labels in the LabelSelector.",
    ).optional(),
  })).describe(
    'Optional. Selector to target VMs for a policy. There is a logical "AND" between instance_selectors.',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  priority: z.number().int().describe(
    "Optional. Used to resolve conflicts when multiple policies are active for the same extension. Defaults to 0. Larger the number, higher the priority. When the priority is the same, the policy with the newer create time has higher priority.",
  ).optional(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      conflictBehavior: z.string().describe(
        'Optional. Specifies the behavior of the rollout if a conflict is detected in a project during a rollout. This only applies to `insert` and `update` methods. A conflict occurs in the following cases: * `insert` method: If the zonal policy already exists when the insert happens. * `update` method: If the zonal policy was modified by a zonal API call outside of this rollout. Possible values are the following: * `""` (empty string): If a conflict occurs, the local value is not overwritten. This is the default behavior. * `"overwrite"`: If a conflict occurs, the local value is overwritten with the rollout value.',
      ).optional(),
      name: z.string().describe(
        "Optional. The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
      ).optional(),
      predefinedRolloutPlan: z.enum([
        "FAST_ROLLOUT",
        "ROLLOUT_PLAN_UNSPECIFIED",
        "SLOW_ROLLOUT",
      ]).describe(
        "Optional. Specifies the predefined rollout plan for the policy. Valid values are `SLOW_ROLLOUT` and `FAST_ROLLOUT`. The recommended value is `SLOW_ROLLOUT` for progressive rollout. For more information, see Rollout plans for global policies.",
      ).optional(),
      retryUuid: z.string().describe(
        "Optional. The UUID that identifies a policy rollout retry attempt for update and delete operations. Set this field only when retrying a rollout for an existing extension policy. * `update` method: Lets you retry policy rollout without changes. An error occurs if you set retry_uuid but the policy is modified. * `delete` method: Lets you retry policy deletion rollout if the previous deletion rollout is not finished and the policy is in the DELETING state. If you set this field when the policy is not in the DELETING state, an error occurs.",
      ).optional(),
    }).optional(),
    rolloutStatus: z.object({
      currentRollouts: z.array(z.object({
        locationRolloutStatus: z.record(z.string(), z.unknown()).describe(
          "Output only. [Output Only] The rollout status for each location. The list of the locations is the same as the list of locations in the rollout plan.",
        ).optional(),
        rollout: z.string().describe(
          "Output only. [Output Only] The name of the rollout. Ex. projects//locations/global/rollouts/.",
        ).optional(),
        rolloutPlan: z.string().describe(
          "Output only. [Output Only] The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
        ).optional(),
        state: z.enum([
          "STATE_CANCELLED",
          "STATE_COMPLETED",
          "STATE_FAILED",
          "STATE_PAUSED",
          "STATE_PROCESSING",
          "STATE_UNKNOWN",
          "STATE_UNSPECIFIED",
        ]).describe(
          "Output only. [Output Only] The overall state of the rollout.",
        ).optional(),
      })).describe(
        "Output only. [Output Only] The current rollouts for the latest version of the resource. There should be only one current rollout, but for scalability, we make it repeated.",
      ).optional(),
      previousRollout: z.object({
        locationRolloutStatus: z.record(
          z.string(),
          z.object({
            state: z.unknown().describe(
              "Output only. [Output Only] The state of the location rollout.",
            ).optional(),
          }),
        ).describe(
          "Output only. [Output Only] The rollout status for each location. The list of the locations is the same as the list of locations in the rollout plan.",
        ).optional(),
        rollout: z.string().describe(
          "Output only. [Output Only] The name of the rollout. Ex. projects//locations/global/rollouts/.",
        ).optional(),
        rolloutPlan: z.string().describe(
          "Output only. [Output Only] The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
        ).optional(),
        state: z.enum([
          "STATE_CANCELLED",
          "STATE_COMPLETED",
          "STATE_FAILED",
          "STATE_PAUSED",
          "STATE_PROCESSING",
          "STATE_UNKNOWN",
          "STATE_UNSPECIFIED",
        ]).describe(
          "Output only. [Output Only] The overall state of the rollout.",
        ).optional(),
      }).optional(),
    }).optional(),
  }).describe("Represents the rollout operation").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  extensionPolicies: z.record(z.string(), z.unknown()).optional(),
  id: z.string().optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
  kind: z.string().optional(),
  name: z.string(),
  priority: z.number().optional(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      conflictBehavior: z.string(),
      name: z.string(),
      predefinedRolloutPlan: z.string(),
      retryUuid: z.string(),
    }),
    rolloutStatus: z.object({
      currentRollouts: z.array(z.object({
        locationRolloutStatus: z.record(z.string(), z.unknown()),
        rollout: z.string(),
        rolloutPlan: z.string(),
        state: z.string(),
      })),
      previousRollout: z.object({
        locationRolloutStatus: z.record(z.string(), z.unknown()),
        rollout: z.string(),
        rolloutPlan: z.string(),
        state: z.string(),
      }),
    }),
  }).optional(),
  scopedResourceStatus: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  updateTimestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  extensionPolicies: z.record(
    z.string(),
    z.object({
      pinnedVersion: z.string().describe(
        "Optional. The version pinning for the extension. If empty, the extension will be installed with the latest version released by the extension producer.",
      ).optional(),
      stringConfig: z.string().describe(
        "Optional. String configuration. Any string payload that the extension understands.",
      ).optional(),
    }),
  ).describe(
    'Required. Map from extension (eg: "cloudops") to its policy configuration. The key is the name of the extension.',
  ).optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.string()).describe(
        "Optional. Labels as key value pairs. A VM should contain all the pairs specified in this map to be selected; Labels within the LabelSelector are OR'ed.",
      ).optional(),
    }).describe(
      "A LabelSelector is applicable for a VM only if it matches all labels in the LabelSelector.",
    ).optional(),
  })).describe(
    'Optional. Selector to target VMs for a policy. There is a logical "AND" between instance_selectors.',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  priority: z.number().int().describe(
    "Optional. Used to resolve conflicts when multiple policies are active for the same extension. Defaults to 0. Larger the number, higher the priority. When the priority is the same, the policy with the newer create time has higher priority.",
  ).optional(),
  rolloutOperation: z.object({
    rolloutInput: z.object({
      conflictBehavior: z.string().describe(
        'Optional. Specifies the behavior of the rollout if a conflict is detected in a project during a rollout. This only applies to `insert` and `update` methods. A conflict occurs in the following cases: * `insert` method: If the zonal policy already exists when the insert happens. * `update` method: If the zonal policy was modified by a zonal API call outside of this rollout. Possible values are the following: * `""` (empty string): If a conflict occurs, the local value is not overwritten. This is the default behavior. * `"overwrite"`: If a conflict occurs, the local value is overwritten with the rollout value.',
      ).optional(),
      name: z.string().describe(
        "Optional. The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
      ).optional(),
      predefinedRolloutPlan: z.enum([
        "FAST_ROLLOUT",
        "ROLLOUT_PLAN_UNSPECIFIED",
        "SLOW_ROLLOUT",
      ]).describe(
        "Optional. Specifies the predefined rollout plan for the policy. Valid values are `SLOW_ROLLOUT` and `FAST_ROLLOUT`. The recommended value is `SLOW_ROLLOUT` for progressive rollout. For more information, see Rollout plans for global policies.",
      ).optional(),
      retryUuid: z.string().describe(
        "Optional. The UUID that identifies a policy rollout retry attempt for update and delete operations. Set this field only when retrying a rollout for an existing extension policy. * `update` method: Lets you retry policy rollout without changes. An error occurs if you set retry_uuid but the policy is modified. * `delete` method: Lets you retry policy deletion rollout if the previous deletion rollout is not finished and the policy is in the DELETING state. If you set this field when the policy is not in the DELETING state, an error occurs.",
      ).optional(),
    }).optional(),
    rolloutStatus: z.object({
      currentRollouts: z.array(z.object({
        locationRolloutStatus: z.record(z.string(), z.unknown()).describe(
          "Output only. [Output Only] The rollout status for each location. The list of the locations is the same as the list of locations in the rollout plan.",
        ).optional(),
        rollout: z.string().describe(
          "Output only. [Output Only] The name of the rollout. Ex. projects//locations/global/rollouts/.",
        ).optional(),
        rolloutPlan: z.string().describe(
          "Output only. [Output Only] The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
        ).optional(),
        state: z.enum([
          "STATE_CANCELLED",
          "STATE_COMPLETED",
          "STATE_FAILED",
          "STATE_PAUSED",
          "STATE_PROCESSING",
          "STATE_UNKNOWN",
          "STATE_UNSPECIFIED",
        ]).describe(
          "Output only. [Output Only] The overall state of the rollout.",
        ).optional(),
      })).describe(
        "Output only. [Output Only] The current rollouts for the latest version of the resource. There should be only one current rollout, but for scalability, we make it repeated.",
      ).optional(),
      previousRollout: z.object({
        locationRolloutStatus: z.record(
          z.string(),
          z.object({
            state: z.unknown().describe(
              "Output only. [Output Only] The state of the location rollout.",
            ).optional(),
          }),
        ).describe(
          "Output only. [Output Only] The rollout status for each location. The list of the locations is the same as the list of locations in the rollout plan.",
        ).optional(),
        rollout: z.string().describe(
          "Output only. [Output Only] The name of the rollout. Ex. projects//locations/global/rollouts/.",
        ).optional(),
        rolloutPlan: z.string().describe(
          "Output only. [Output Only] The name of the rollout plan. Ex. projects//locations/global/rolloutPlans/.",
        ).optional(),
        state: z.enum([
          "STATE_CANCELLED",
          "STATE_COMPLETED",
          "STATE_FAILED",
          "STATE_PAUSED",
          "STATE_PROCESSING",
          "STATE_UNKNOWN",
          "STATE_UNSPECIFIED",
        ]).describe(
          "Output only. [Output Only] The overall state of the rollout.",
        ).optional(),
      }).optional(),
    }).optional(),
  }).describe("Represents the rollout operation").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine GlobalVmExtensionPolicies. Registered at `@swamp/gcp/compute/globalvmextensionpolicies`. */
export const model = {
  type: "@swamp/gcp/compute/globalvmextensionpolicies",
  version: "2026.05.18.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing GlobalVmExtensionPolicy object.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a globalVmExtensionPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["extensionPolicies"] !== undefined) {
          body["extensionPolicies"] = g["extensionPolicies"];
        }
        if (g["instanceSelectors"] !== undefined) {
          body["instanceSelectors"] = g["instanceSelectors"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["rolloutOperation"] !== undefined) {
          body["rolloutOperation"] = g["rolloutOperation"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["globalVmExtensionPolicy"] = String(g["name"]);
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
      description: "Get a globalVmExtensionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalVmExtensionPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["globalVmExtensionPolicy"] = args.identifier;
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
      description: "Update globalVmExtensionPolicies attributes",
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
        params["globalVmExtensionPolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["extensionPolicies"] !== undefined) {
          body["extensionPolicies"] = g["extensionPolicies"];
        }
        if (g["instanceSelectors"] !== undefined) {
          body["instanceSelectors"] = g["instanceSelectors"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["rolloutOperation"] !== undefined) {
          body["rolloutOperation"] = g["rolloutOperation"];
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
          UPDATE_CONFIG,
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
      description: "Delete the globalVmExtensionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalVmExtensionPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["globalVmExtensionPolicy"] = args.identifier;
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
      description: "Sync globalVmExtensionPolicies state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["globalVmExtensionPolicy"] = identifier;
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
