// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts-jobruns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases.Rollouts.JobRuns.
 *
 * A `JobRun` resource in the Cloud Deploy API. A `JobRun` contains information of a single `Rollout` job evaluation.
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
  return `${parent}/jobRuns/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id":
    "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.jobRuns.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  advanceChildRolloutJobRun: z.object({
    rollout: z.string(),
    rolloutPhaseId: z.string(),
  }).optional(),
  analysisJobRun: z.object({
    alertPolicyAnalyses: z.array(z.object({
      alertPolicies: z.array(z.string()),
      failedAlertPolicies: z.array(z.object({
        alertPolicy: z.unknown(),
        alerts: z.unknown(),
      })),
      failureMessage: z.string(),
      id: z.string(),
      labels: z.record(z.string(), z.unknown()),
    })),
    customCheckAnalyses: z.array(z.object({
      failureCause: z.string(),
      failureMessage: z.string(),
      frequency: z.string(),
      id: z.string(),
      latestBuild: z.string(),
      metadata: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
      task: z.object({
        container: z.object({
          args: z.unknown(),
          command: z.unknown(),
          env: z.unknown(),
          image: z.unknown(),
          script: z.unknown(),
        }),
      }),
    })),
    failedCheckId: z.string(),
  }).optional(),
  createChildRolloutJobRun: z.object({
    rollout: z.string(),
    rolloutPhaseId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  deployJobRun: z.object({
    artifact: z.object({
      artifactUri: z.string(),
      manifestPaths: z.array(z.string()),
    }),
    build: z.string(),
    failureCause: z.string(),
    failureMessage: z.string(),
    metadata: z.object({
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
      customTarget: z.object({
        skipMessage: z.string(),
      }),
    }),
  }).optional(),
  endTime: z.string().optional(),
  etag: z.string().optional(),
  jobId: z.string().optional(),
  name: z.string(),
  phaseId: z.string().optional(),
  postdeployJobRun: z.object({
    build: z.string(),
    failureCause: z.string(),
    failureMessage: z.string(),
    metadata: z.object({
      custom: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
    }),
  }).optional(),
  predeployJobRun: z.object({
    build: z.string(),
    failureCause: z.string(),
    failureMessage: z.string(),
    metadata: z.object({
      custom: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
    }),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  verifyJobRun: z.object({
    artifactUri: z.string(),
    build: z.string(),
    eventLogPath: z.string(),
    failureCause: z.string(),
    failureMessage: z.string(),
    metadata: z.object({
      custom: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases.Rollouts.JobRuns. Registered at `@swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts-jobruns`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-releases-rollouts-jobruns",
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
      toVersion: "2026.05.09.1",
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
        "A `JobRun` resource in the Cloud Deploy API. A `JobRun` contains information ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a jobRuns",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobRuns"),
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
    sync: {
      description: "Sync jobRuns state from GCP",
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
    terminate: {
      description: "terminate",
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
              "clouddeploy.projects.locations.deliveryPipelines.releases.rollouts.jobRuns.terminate",
            "path": "v1/{+name}:terminate",
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
