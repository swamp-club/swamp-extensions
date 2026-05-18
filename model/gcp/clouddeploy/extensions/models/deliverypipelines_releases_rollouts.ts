// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases.Rollouts.
 *
 * A `Rollout` resource in the Cloud Deploy API. A `Rollout` contains information around a specific deployment to a `Target`.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/rollouts/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id":
    "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.get",
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
    "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.create",
  "path": "v1/{+parent}/rollouts",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "overrideDeployPolicy": {
      "location": "query",
    },
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
    "startingPhaseId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Rollout` for user purposes. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  metadata: z.object({
    automation: z.object({
      advanceAutomationRuns: z.array(z.string()).describe(
        "Output only. The names of the AutomationRuns initiated by an advance rollout rule.",
      ).optional(),
      promoteAutomationRun: z.string().describe(
        "Output only. The name of the AutomationRun initiated by a promote release rule.",
      ).optional(),
      repairAutomationRuns: z.array(z.string()).describe(
        "Output only. The names of the AutomationRuns initiated by a repair rollout rule.",
      ).optional(),
    }).describe(
      "AutomationRolloutMetadata contains Automation-related actions that were performed on a rollout.",
    ).optional(),
    cloudRun: z.object({
      job: z.string().describe(
        "Output only. The name of the Cloud Run job that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/jobs/{job_name}`.",
      ).optional(),
      previousRevision: z.string().describe(
        "Output only. The previous Cloud Run Revision name associated with a `Rollout`. Only set when a canary deployment strategy is configured. Format for service is projects/{project}/locations/{location}/services/{service}/revisions/{revision}. Format for worker pool is projects/{project}/locations/{location}/workerPools/{workerpool}/revisions/{revision}.",
      ).optional(),
      revision: z.string().describe(
        "Output only. The Cloud Run Revision id associated with a `Rollout`.",
      ).optional(),
      service: z.string().describe(
        "Output only. The name of the Cloud Run Service that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/services/{service}`.",
      ).optional(),
      serviceUrls: z.array(z.string()).describe(
        "Output only. The Cloud Run Service urls that are associated with a `Rollout`.",
      ).optional(),
      workerPool: z.string().describe(
        "Output only. The Cloud Run worker pool associated with a `Rollout`. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`.",
      ).optional(),
    }).describe(
      "CloudRunMetadata contains information from a Cloud Run deployment.",
    ).optional(),
    custom: z.object({
      values: z.record(z.string(), z.string()).describe(
        "Output only. Key-value pairs provided by the user-defined operation.",
      ).optional(),
    }).describe(
      "CustomMetadata contains information from a user-defined operation.",
    ).optional(),
  }).describe("Metadata includes information associated with a `Rollout`.")
    .optional(),
  name: z.string().describe(
    "Identifier. Name of the `Rollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. The `rollout` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  targetId: z.string().describe(
    "Required. The ID of Target to which this `Rollout` is deploying.",
  ).optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  rolloutId: z.string().describe("Required. ID of the `Rollout`.").optional(),
  startingPhaseId: z.string().describe(
    "Optional. The starting phase ID for the `Rollout`. If empty the `Rollout` will start at the first phase.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  activeRepairAutomationRun: z.string().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  approvalState: z.string().optional(),
  approveTime: z.string().optional(),
  controllerRollout: z.string().optional(),
  createTime: z.string().optional(),
  deployEndTime: z.string().optional(),
  deployFailureCause: z.string().optional(),
  deployStartTime: z.string().optional(),
  deployingBuild: z.string().optional(),
  description: z.string().optional(),
  enqueueTime: z.string().optional(),
  etag: z.string().optional(),
  failureReason: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.object({
    automation: z.object({
      advanceAutomationRuns: z.array(z.string()),
      promoteAutomationRun: z.string(),
      repairAutomationRuns: z.array(z.string()),
    }),
    cloudRun: z.object({
      job: z.string(),
      previousRevision: z.string(),
      revision: z.string(),
      service: z.string(),
      serviceUrls: z.array(z.string()),
      workerPool: z.string(),
    }),
    custom: z.object({
      values: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  name: z.string(),
  phases: z.array(z.object({
    childRolloutJobs: z.object({
      advanceRolloutJobs: z.array(z.object({
        advanceChildRolloutJob: z.unknown(),
        analysisJob: z.unknown(),
        createChildRolloutJob: z.unknown(),
        deployJob: z.unknown(),
        id: z.unknown(),
        jobRun: z.unknown(),
        postdeployJob: z.unknown(),
        predeployJob: z.unknown(),
        skipMessage: z.unknown(),
        state: z.unknown(),
        verifyJob: z.unknown(),
      })),
      createRolloutJobs: z.array(z.object({
        advanceChildRolloutJob: z.unknown(),
        analysisJob: z.unknown(),
        createChildRolloutJob: z.unknown(),
        deployJob: z.unknown(),
        id: z.unknown(),
        jobRun: z.unknown(),
        postdeployJob: z.unknown(),
        predeployJob: z.unknown(),
        skipMessage: z.unknown(),
        state: z.unknown(),
        verifyJob: z.unknown(),
      })),
    }),
    deploymentJobs: z.object({
      analysisJob: z.object({
        advanceChildRolloutJob: z.object({}),
        analysisJob: z.object({
          customChecks: z.unknown(),
          duration: z.unknown(),
          googleCloud: z.unknown(),
        }),
        createChildRolloutJob: z.object({}),
        deployJob: z.object({}),
        id: z.string(),
        jobRun: z.string(),
        postdeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        predeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        skipMessage: z.string(),
        state: z.string(),
        verifyJob: z.object({
          tasks: z.unknown(),
        }),
      }),
      deployJob: z.object({
        advanceChildRolloutJob: z.object({}),
        analysisJob: z.object({
          customChecks: z.unknown(),
          duration: z.unknown(),
          googleCloud: z.unknown(),
        }),
        createChildRolloutJob: z.object({}),
        deployJob: z.object({}),
        id: z.string(),
        jobRun: z.string(),
        postdeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        predeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        skipMessage: z.string(),
        state: z.string(),
        verifyJob: z.object({
          tasks: z.unknown(),
        }),
      }),
      postdeployJob: z.object({
        advanceChildRolloutJob: z.object({}),
        analysisJob: z.object({
          customChecks: z.unknown(),
          duration: z.unknown(),
          googleCloud: z.unknown(),
        }),
        createChildRolloutJob: z.object({}),
        deployJob: z.object({}),
        id: z.string(),
        jobRun: z.string(),
        postdeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        predeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        skipMessage: z.string(),
        state: z.string(),
        verifyJob: z.object({
          tasks: z.unknown(),
        }),
      }),
      predeployJob: z.object({
        advanceChildRolloutJob: z.object({}),
        analysisJob: z.object({
          customChecks: z.unknown(),
          duration: z.unknown(),
          googleCloud: z.unknown(),
        }),
        createChildRolloutJob: z.object({}),
        deployJob: z.object({}),
        id: z.string(),
        jobRun: z.string(),
        postdeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        predeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        skipMessage: z.string(),
        state: z.string(),
        verifyJob: z.object({
          tasks: z.unknown(),
        }),
      }),
      verifyJob: z.object({
        advanceChildRolloutJob: z.object({}),
        analysisJob: z.object({
          customChecks: z.unknown(),
          duration: z.unknown(),
          googleCloud: z.unknown(),
        }),
        createChildRolloutJob: z.object({}),
        deployJob: z.object({}),
        id: z.string(),
        jobRun: z.string(),
        postdeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        predeployJob: z.object({
          actions: z.unknown(),
          tasks: z.unknown(),
        }),
        skipMessage: z.string(),
        state: z.string(),
        verifyJob: z.object({
          tasks: z.unknown(),
        }),
      }),
    }),
    id: z.string(),
    skipMessage: z.string(),
    state: z.string(),
  })).optional(),
  rollbackOfRollout: z.string().optional(),
  rolledBackByRollouts: z.array(z.string()).optional(),
  state: z.string().optional(),
  targetId: z.string().optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Rollout` for user purposes. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  metadata: z.object({
    automation: z.object({
      advanceAutomationRuns: z.array(z.string()).describe(
        "Output only. The names of the AutomationRuns initiated by an advance rollout rule.",
      ).optional(),
      promoteAutomationRun: z.string().describe(
        "Output only. The name of the AutomationRun initiated by a promote release rule.",
      ).optional(),
      repairAutomationRuns: z.array(z.string()).describe(
        "Output only. The names of the AutomationRuns initiated by a repair rollout rule.",
      ).optional(),
    }).describe(
      "AutomationRolloutMetadata contains Automation-related actions that were performed on a rollout.",
    ).optional(),
    cloudRun: z.object({
      job: z.string().describe(
        "Output only. The name of the Cloud Run job that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/jobs/{job_name}`.",
      ).optional(),
      previousRevision: z.string().describe(
        "Output only. The previous Cloud Run Revision name associated with a `Rollout`. Only set when a canary deployment strategy is configured. Format for service is projects/{project}/locations/{location}/services/{service}/revisions/{revision}. Format for worker pool is projects/{project}/locations/{location}/workerPools/{workerpool}/revisions/{revision}.",
      ).optional(),
      revision: z.string().describe(
        "Output only. The Cloud Run Revision id associated with a `Rollout`.",
      ).optional(),
      service: z.string().describe(
        "Output only. The name of the Cloud Run Service that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/services/{service}`.",
      ).optional(),
      serviceUrls: z.array(z.string()).describe(
        "Output only. The Cloud Run Service urls that are associated with a `Rollout`.",
      ).optional(),
      workerPool: z.string().describe(
        "Output only. The Cloud Run worker pool associated with a `Rollout`. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`.",
      ).optional(),
    }).describe(
      "CloudRunMetadata contains information from a Cloud Run deployment.",
    ).optional(),
    custom: z.object({
      values: z.record(z.string(), z.string()).describe(
        "Output only. Key-value pairs provided by the user-defined operation.",
      ).optional(),
    }).describe(
      "CustomMetadata contains information from a user-defined operation.",
    ).optional(),
  }).describe("Metadata includes information associated with a `Rollout`.")
    .optional(),
  name: z.string().describe(
    "Identifier. Name of the `Rollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. The `rollout` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  targetId: z.string().describe(
    "Required. The ID of Target to which this `Rollout` is deploying.",
  ).optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  rolloutId: z.string().describe("Required. ID of the `Rollout`.").optional(),
  startingPhaseId: z.string().describe(
    "Optional. The starting phase ID for the `Rollout`. If empty the `Rollout` will start at the first phase.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases.Rollouts. Registered at `@swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `Rollout` resource in the Cloud Deploy API. A `Rollout` contains informatio...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rollouts",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["targetId"] !== undefined) body["targetId"] = g["targetId"];
        if (g["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = g["overrideDeployPolicy"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["rolloutId"] !== undefined) body["rolloutId"] = g["rolloutId"];
        if (g["startingPhaseId"] !== undefined) {
          body["startingPhaseId"] = g["startingPhaseId"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
    advance: {
      description: "advance",
      arguments: z.object({
        overrideDeployPolicy: z.any().optional(),
        phaseId: z.any().optional(),
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
        if (args["phaseId"] !== undefined) body["phaseId"] = args["phaseId"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.advance",
            "path": "v1/{+name}:advance",
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
    approve: {
      description: "approve",
      arguments: z.object({
        approved: z.any().optional(),
        overrideDeployPolicy: z.any().optional(),
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
        if (args["approved"] !== undefined) body["approved"] = args["approved"];
        if (args["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = args["overrideDeployPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.approve",
            "path": "v1/{+name}:approve",
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        overrideDeployPolicy: z.any().optional(),
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.cancel",
            "path": "v1/{+name}:cancel",
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
    ignore_job: {
      description: "ignore job",
      arguments: z.object({
        jobId: z.any().optional(),
        overrideDeployPolicy: z.any().optional(),
        phaseId: z.any().optional(),
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
        params["rollout"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["jobId"] !== undefined) body["jobId"] = args["jobId"];
        if (args["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = args["overrideDeployPolicy"];
        }
        if (args["phaseId"] !== undefined) body["phaseId"] = args["phaseId"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.ignoreJob",
            "path": "v1/{+rollout}:ignoreJob",
            "httpMethod": "POST",
            "parameterOrder": ["rollout"],
            "parameters": {
              "rollout": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    retry_job: {
      description: "retry job",
      arguments: z.object({
        jobId: z.any().optional(),
        overrideDeployPolicy: z.any().optional(),
        phaseId: z.any().optional(),
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
        params["rollout"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["jobId"] !== undefined) body["jobId"] = args["jobId"];
        if (args["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = args["overrideDeployPolicy"];
        }
        if (args["phaseId"] !== undefined) body["phaseId"] = args["phaseId"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.retryJob",
            "path": "v1/{+rollout}:retryJob",
            "httpMethod": "POST",
            "parameterOrder": ["rollout"],
            "parameters": {
              "rollout": { "location": "path", "required": true },
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
