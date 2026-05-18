// Auto-generated extension model for @swamp/gcp/compute/rollouts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Rollouts.
 *
 * Rollout resource. A Rollout is a specific instance of a RolloutPlan. It represents a single execution of a strategy to roll out a specific resource. It also provides APIs to interact with the rollout.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.rollouts.get",
  "path": "projects/{project}/global/rollouts/{rollout}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "rollout",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "rollout": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.rollouts.delete",
  "path": "projects/{project}/global/rollouts/{rollout}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "rollout",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "rollout": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  cancellationTime: z.string().optional(),
  completionTime: z.string().optional(),
  creationTimestamp: z.string().optional(),
  currentWaveNumber: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  rolloutEntity: z.object({
    orchestratedEntity: z.object({
      conflictBehavior: z.string(),
      orchestrationAction: z.string(),
      orchestrationSource: z.string(),
    }),
  }).optional(),
  rolloutPlan: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  state: z.string().optional(),
  waveDetails: z.array(z.object({
    orchestratedWaveDetails: z.object({
      completedResourcesCount: z.string(),
      estimatedCompletionTime: z.string(),
      estimatedTotalResourcesCount: z.string(),
      failedLocations: z.array(z.string()),
      failedResourcesCount: z.string(),
      locationStatus: z.record(z.string(), z.unknown()),
    }),
    waveDisplayName: z.string(),
    waveNumber: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Rollouts. Registered at `@swamp/gcp/compute/rollouts`. */
export const model = {
  type: "@swamp/gcp/compute/rollouts",
  version: "2026.05.18.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Rollout resource. A Rollout is a specific instance of a RolloutPlan. It repre...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a rollouts",
      arguments: z.object({
        identifier: z.string().describe("The name of the rollouts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["rollout"] = args.identifier;
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
    delete: {
      description: "Delete the rollouts",
      arguments: z.object({
        identifier: z.string().describe("The name of the rollouts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["rollout"] = args.identifier;
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["rollout"] = identifier;
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.rollouts.cancel",
            "path": "projects/{project}/global/rollouts/{rollout}",
            "httpMethod": "PATCH",
            "parameterOrder": ["project", "rollout"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "rollback": { "location": "query" },
              "rollout": { "location": "path", "required": true },
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
