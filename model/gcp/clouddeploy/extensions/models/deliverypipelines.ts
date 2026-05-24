// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.
 *
 * A `DeliveryPipeline` resource in the Cloud Deploy API. A `DeliveryPipeline` defines a pipeline through which a Skaffold configuration can progress.
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
  return `${parent}/deliveryPipelines/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.get",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.create",
  "path": "v1/{+parent}/deliveryPipelines",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "deliveryPipelineId": {
      "location": "query",
    },
    "parent": {
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

const PATCH_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "force": {
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

const LIST_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.list",
  "path": "v1/{+parent}/deliveryPipelines",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy.",
  ).optional(),
  condition: z.object({
    pipelineReadyCondition: z.object({
      status: z.boolean().describe(
        "True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline.",
      ).optional(),
      updateTime: z.string().describe("Last time the condition was updated.")
        .optional(),
    }).describe(
      "PipelineReadyCondition contains information around the status of the Pipeline.",
    ).optional(),
    targetsPresentCondition: z.object({
      missingTargets: z.array(z.string()).describe(
        "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
      ).optional(),
      status: z.boolean().describe("True if there aren't any missing Targets.")
        .optional(),
      updateTime: z.string().describe("Last time the condition was updated.")
        .optional(),
    }).describe(
      "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
    ).optional(),
    targetsTypeCondition: z.object({
      errorDetails: z.string().describe("Human readable error message.")
        .optional(),
      status: z.boolean().describe(
        "True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters.",
      ).optional(),
    }).describe(
      "TargetsTypeCondition contains information on whether the Targets defined in the Delivery Pipeline are of the same type.",
    ).optional(),
  }).describe(
    "PipelineCondition contains all conditions relevant to a Delivery Pipeline.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `DeliveryPipeline`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  serialPipeline: z.object({
    stages: z.array(z.object({
      deployParameters: z.array(z.object({
        matchTargetLabels: z.unknown().describe(
          "Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target).",
        ).optional(),
        values: z.unknown().describe(
          "Required. Values are deploy parameters in key-value pairs.",
        ).optional(),
      })).describe(
        "Optional. The deploy parameters to use for the target in this stage.",
      ).optional(),
      profiles: z.array(z.string()).describe(
        "Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`.",
      ).optional(),
      strategy: z.object({
        canary: z.object({
          canaryDeployment: z.unknown().describe(
            "CanaryDeployment represents the canary deployment configuration",
          ).optional(),
          customCanaryDeployment: z.unknown().describe(
            "CustomCanaryDeployment represents the custom canary deployment configuration.",
          ).optional(),
          runtimeConfig: z.unknown().describe(
            "RuntimeConfig contains the runtime specific configurations for a deployment strategy.",
          ).optional(),
        }).describe("Canary represents the canary deployment strategy.")
          .optional(),
        standard: z.object({
          analysis: z.unknown().describe(
            "Analysis contains the configuration for the set of analyses to be performed on the target.",
          ).optional(),
          postdeploy: z.unknown().describe(
            "Postdeploy contains the postdeploy job configuration information.",
          ).optional(),
          predeploy: z.unknown().describe(
            "Predeploy contains the predeploy job configuration information.",
          ).optional(),
          verify: z.unknown().describe(
            "Optional. Whether to verify a deployment via `skaffold verify`.",
          ).optional(),
          verifyConfig: z.unknown().describe(
            "Verify contains the verify job configuration information.",
          ).optional(),
        }).describe("Standard represents the standard deployment strategy.")
          .optional(),
      }).describe("Strategy contains deployment strategy information.")
        .optional(),
      targetId: z.string().describe(
        "Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`.",
      ).optional(),
    })).describe(
      "Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow.",
    ).optional(),
  }).describe(
    "SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.",
  ).optional(),
  suspended: z.boolean().describe(
    "Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete.",
  ).optional(),
  deliveryPipelineId: z.string().describe(
    "Required. ID of the `DeliveryPipeline`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  condition: z.object({
    pipelineReadyCondition: z.object({
      status: z.boolean(),
      updateTime: z.string(),
    }),
    targetsPresentCondition: z.object({
      missingTargets: z.array(z.string()),
      status: z.boolean(),
      updateTime: z.string(),
    }),
    targetsTypeCondition: z.object({
      errorDetails: z.string(),
      status: z.boolean(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  serialPipeline: z.object({
    stages: z.array(z.object({
      deployParameters: z.array(z.object({
        matchTargetLabels: z.unknown(),
        values: z.unknown(),
      })),
      profiles: z.array(z.string()),
      strategy: z.object({
        canary: z.object({
          canaryDeployment: z.unknown(),
          customCanaryDeployment: z.unknown(),
          runtimeConfig: z.unknown(),
        }),
        standard: z.object({
          analysis: z.unknown(),
          postdeploy: z.unknown(),
          predeploy: z.unknown(),
          verify: z.unknown(),
          verifyConfig: z.unknown(),
        }),
      }),
      targetId: z.string(),
    })),
  }).optional(),
  suspended: z.boolean().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy.",
  ).optional(),
  condition: z.object({
    pipelineReadyCondition: z.object({
      status: z.boolean().describe(
        "True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline.",
      ).optional(),
      updateTime: z.string().describe("Last time the condition was updated.")
        .optional(),
    }).describe(
      "PipelineReadyCondition contains information around the status of the Pipeline.",
    ).optional(),
    targetsPresentCondition: z.object({
      missingTargets: z.array(z.string()).describe(
        "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
      ).optional(),
      status: z.boolean().describe("True if there aren't any missing Targets.")
        .optional(),
      updateTime: z.string().describe("Last time the condition was updated.")
        .optional(),
    }).describe(
      "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
    ).optional(),
    targetsTypeCondition: z.object({
      errorDetails: z.string().describe("Human readable error message.")
        .optional(),
      status: z.boolean().describe(
        "True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters.",
      ).optional(),
    }).describe(
      "TargetsTypeCondition contains information on whether the Targets defined in the Delivery Pipeline are of the same type.",
    ).optional(),
  }).describe(
    "PipelineCondition contains all conditions relevant to a Delivery Pipeline.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `DeliveryPipeline`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  serialPipeline: z.object({
    stages: z.array(z.object({
      deployParameters: z.array(z.object({
        matchTargetLabels: z.unknown().describe(
          "Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target).",
        ).optional(),
        values: z.unknown().describe(
          "Required. Values are deploy parameters in key-value pairs.",
        ).optional(),
      })).describe(
        "Optional. The deploy parameters to use for the target in this stage.",
      ).optional(),
      profiles: z.array(z.string()).describe(
        "Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`.",
      ).optional(),
      strategy: z.object({
        canary: z.object({
          canaryDeployment: z.unknown().describe(
            "CanaryDeployment represents the canary deployment configuration",
          ).optional(),
          customCanaryDeployment: z.unknown().describe(
            "CustomCanaryDeployment represents the custom canary deployment configuration.",
          ).optional(),
          runtimeConfig: z.unknown().describe(
            "RuntimeConfig contains the runtime specific configurations for a deployment strategy.",
          ).optional(),
        }).describe("Canary represents the canary deployment strategy.")
          .optional(),
        standard: z.object({
          analysis: z.unknown().describe(
            "Analysis contains the configuration for the set of analyses to be performed on the target.",
          ).optional(),
          postdeploy: z.unknown().describe(
            "Postdeploy contains the postdeploy job configuration information.",
          ).optional(),
          predeploy: z.unknown().describe(
            "Predeploy contains the predeploy job configuration information.",
          ).optional(),
          verify: z.unknown().describe(
            "Optional. Whether to verify a deployment via `skaffold verify`.",
          ).optional(),
          verifyConfig: z.unknown().describe(
            "Verify contains the verify job configuration information.",
          ).optional(),
        }).describe("Standard represents the standard deployment strategy.")
          .optional(),
      }).describe("Strategy contains deployment strategy information.")
        .optional(),
      targetId: z.string().describe(
        "Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`.",
      ).optional(),
    })).describe(
      "Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow.",
    ).optional(),
  }).describe(
    "SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.",
  ).optional(),
  suspended: z.boolean().describe(
    "Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete.",
  ).optional(),
  deliveryPipelineId: z.string().describe(
    "Required. ID of the `DeliveryPipeline`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines. Registered at `@swamp/gcp/clouddeploy/deliverypipelines`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines",
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
      description:
        "A `DeliveryPipeline` resource in the Cloud Deploy API. A `DeliveryPipeline` d...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deliveryPipelines",
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
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serialPipeline"] !== undefined) {
          body["serialPipeline"] = g["serialPipeline"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
        if (g["deliveryPipelineId"] !== undefined) {
          body["deliveryPipelineId"] = g["deliveryPipelineId"];
        }
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
          undefined,
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
      description: "Get a deliveryPipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the deliveryPipelines"),
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
      description: "Update deliveryPipelines attributes",
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
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["serialPipeline"] !== undefined) {
          body["serialPipeline"] = g["serialPipeline"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
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
      description: "Delete the deliveryPipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the deliveryPipelines"),
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
      description: "Sync deliveryPipelines state from GCP",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rollback_target: {
      description: "rollback target",
      arguments: z.object({
        overrideDeployPolicy: z.any().optional(),
        releaseId: z.any().optional(),
        rollbackConfig: z.any().optional(),
        rolloutId: z.any().optional(),
        rolloutToRollBack: z.any().optional(),
        targetId: z.any().optional(),
        validateOnly: z.any().optional(),
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
        if (args["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = args["overrideDeployPolicy"];
        }
        if (args["releaseId"] !== undefined) {
          body["releaseId"] = args["releaseId"];
        }
        if (args["rollbackConfig"] !== undefined) {
          body["rollbackConfig"] = args["rollbackConfig"];
        }
        if (args["rolloutId"] !== undefined) {
          body["rolloutId"] = args["rolloutId"];
        }
        if (args["rolloutToRollBack"] !== undefined) {
          body["rolloutToRollBack"] = args["rolloutToRollBack"];
        }
        if (args["targetId"] !== undefined) body["targetId"] = args["targetId"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.rollbackTarget",
            "path": "v1/{+name}:rollbackTarget",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
