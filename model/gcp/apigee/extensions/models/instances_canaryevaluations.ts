// Auto-generated extension model for @swamp/gcp/apigee/instances-canaryevaluations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Instances.Canaryevaluations.
 *
 * CanaryEvaluation represents the canary analysis between two versions of the runtime that is serving requests.
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
  return `${parent}/canaryevaluations/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.instances.canaryevaluations.get",
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
  "id": "apigee.organizations.instances.canaryevaluations.create",
  "path": "v1/{+parent}/canaryevaluations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  control: z.string().describe(
    "Required. The stable version that is serving requests.",
  ).optional(),
  endTime: z.string().describe(
    "Required. End time for the evaluation's analysis.",
  ).optional(),
  metricLabels: z.object({
    env: z.string().describe("The environment ID associated with the metrics.")
      .optional(),
    instance_id: z.string().describe(
      "Required. The instance ID associated with the metrics. In Apigee Hybrid, the value is configured during installation.",
    ).optional(),
    location: z.string().describe(
      "Required. The location associated with the metrics.",
    ).optional(),
  }).describe("Labels that can be used to filter Apigee metrics.").optional(),
  startTime: z.string().describe(
    "Required. Start time for the canary evaluation's analysis.",
  ).optional(),
  treatment: z.string().describe(
    "Required. The newer version that is serving requests.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  control: z.string().optional(),
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  metricLabels: z.object({
    env: z.string(),
    instance_id: z.string(),
    location: z.string(),
  }).optional(),
  name: z.string(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  treatment: z.string().optional(),
  verdict: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  control: z.string().describe(
    "Required. The stable version that is serving requests.",
  ).optional(),
  endTime: z.string().describe(
    "Required. End time for the evaluation's analysis.",
  ).optional(),
  metricLabels: z.object({
    env: z.string().describe("The environment ID associated with the metrics.")
      .optional(),
    instance_id: z.string().describe(
      "Required. The instance ID associated with the metrics. In Apigee Hybrid, the value is configured during installation.",
    ).optional(),
    location: z.string().describe(
      "Required. The location associated with the metrics.",
    ).optional(),
  }).describe("Labels that can be used to filter Apigee metrics.").optional(),
  startTime: z.string().describe(
    "Required. Start time for the canary evaluation's analysis.",
  ).optional(),
  treatment: z.string().describe(
    "Required. The newer version that is serving requests.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Instances.Canaryevaluations. Registered at `@swamp/gcp/apigee/instances-canaryevaluations`. */
export const model = {
  type: "@swamp/gcp/apigee/instances-canaryevaluations",
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
        "CanaryEvaluation represents the canary analysis between two versions of the r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a canaryevaluations",
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
        if (g["control"] !== undefined) body["control"] = g["control"];
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["metricLabels"] !== undefined) {
          body["metricLabels"] = g["metricLabels"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["treatment"] !== undefined) body["treatment"] = g["treatment"];
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a canaryevaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the canaryevaluations"),
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
    sync: {
      description: "Sync canaryevaluations state from GCP",
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
