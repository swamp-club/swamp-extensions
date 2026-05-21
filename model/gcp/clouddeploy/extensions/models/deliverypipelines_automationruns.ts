// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-automationruns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.AutomationRuns.
 *
 * An `AutomationRun` resource in the Cloud Deploy API. An `AutomationRun` represents an execution instance of an automation rule.
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
  return `${parent}/automationRuns/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.automationRuns.get",
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
  advanceRolloutOperation: z.object({
    destinationPhase: z.string(),
    rollout: z.string(),
    sourcePhase: z.string(),
    wait: z.string(),
  }).optional(),
  automationId: z.string().optional(),
  automationSnapshot: z.object({
    annotations: z.record(z.string(), z.unknown()),
    createTime: z.string(),
    description: z.string(),
    etag: z.string(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    rules: z.array(z.object({
      advanceRolloutRule: z.object({
        condition: z.object({
          targetsPresentCondition: z.unknown(),
          timedPromoteReleaseCondition: z.unknown(),
        }),
        id: z.string(),
        sourcePhases: z.array(z.unknown()),
        wait: z.string(),
      }),
      promoteReleaseRule: z.object({
        condition: z.object({
          targetsPresentCondition: z.unknown(),
          timedPromoteReleaseCondition: z.unknown(),
        }),
        destinationPhase: z.string(),
        destinationTargetId: z.string(),
        id: z.string(),
        wait: z.string(),
      }),
      repairRolloutRule: z.object({
        condition: z.object({
          targetsPresentCondition: z.unknown(),
          timedPromoteReleaseCondition: z.unknown(),
        }),
        id: z.string(),
        jobs: z.array(z.unknown()),
        phases: z.array(z.unknown()),
        repairPhases: z.array(z.unknown()),
      }),
      timedPromoteReleaseRule: z.object({
        condition: z.object({
          targetsPresentCondition: z.unknown(),
          timedPromoteReleaseCondition: z.unknown(),
        }),
        destinationPhase: z.string(),
        destinationTargetId: z.string(),
        id: z.string(),
        schedule: z.string(),
        timeZone: z.string(),
      }),
    })),
    selector: z.object({
      targets: z.array(z.object({
        id: z.string(),
        labels: z.record(z.string(), z.unknown()),
      })),
    }),
    serviceAccount: z.string(),
    suspended: z.boolean(),
    uid: z.string(),
    updateTime: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  etag: z.string().optional(),
  expireTime: z.string().optional(),
  name: z.string(),
  policyViolation: z.object({
    policyViolationDetails: z.array(z.object({
      failureMessage: z.string(),
      policy: z.string(),
      ruleId: z.string(),
    })),
  }).optional(),
  promoteReleaseOperation: z.object({
    phase: z.string(),
    rollout: z.string(),
    targetId: z.string(),
    wait: z.string(),
  }).optional(),
  repairRolloutOperation: z.object({
    currentRepairPhaseIndex: z.string(),
    jobId: z.string(),
    phaseId: z.string(),
    repairPhases: z.array(z.object({
      retry: z.object({
        attempts: z.array(z.unknown()),
        backoffMode: z.string(),
        totalAttempts: z.string(),
      }),
      rollback: z.object({
        destinationPhase: z.string(),
        disableRollbackIfRolloutPending: z.boolean(),
        rolloutId: z.string(),
        state: z.string(),
        stateDesc: z.string(),
      }),
    })),
    rollout: z.string(),
  }).optional(),
  ruleId: z.string().optional(),
  serviceAccount: z.string().optional(),
  state: z.string().optional(),
  stateDescription: z.string().optional(),
  targetId: z.string().optional(),
  timedPromoteReleaseOperation: z.object({
    phase: z.string(),
    release: z.string(),
    targetId: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  waitUntilTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines.AutomationRuns. Registered at `@swamp/gcp/clouddeploy/deliverypipelines-automationruns`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-automationruns",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An `AutomationRun` resource in the Cloud Deploy API. An `AutomationRun` repre...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a automationRuns",
      arguments: z.object({
        identifier: z.string().describe("The name of the automationRuns"),
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
      description: "Sync automationRuns state from GCP",
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.automationRuns.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
