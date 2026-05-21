// Auto-generated extension model for @swamp/gcp/servicemanagement/services-rollouts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Service Management Services.Rollouts.
 *
 * A rollout resource that defines how service configuration versions are pushed to control plane systems. Typically, you create a new version of the service config, and then create a Rollout to push the service config.
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

const BASE_URL = "https://servicemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "servicemanagement.services.rollouts.get",
  "path": "v1/services/{serviceName}/rollouts/{rolloutId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "serviceName",
    "rolloutId",
  ],
  "parameters": {
    "rolloutId": {
      "location": "path",
      "required": true,
    },
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "servicemanagement.services.rollouts.create",
  "path": "v1/services/{serviceName}/rollouts",
  "httpMethod": "POST",
  "parameterOrder": [
    "serviceName",
  ],
  "parameters": {
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "servicemanagement.services.rollouts.list",
  "path": "v1/services/{serviceName}/rollouts",
  "httpMethod": "GET",
  "parameterOrder": [
    "serviceName",
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
    "serviceName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  createTime: z.string().describe("Creation time of the rollout. Readonly.")
    .optional(),
  createdBy: z.string().describe("The user who created the Rollout. Readonly.")
    .optional(),
  deleteServiceStrategy: z.object({}).describe(
    "Strategy used to delete a service. This strategy is a placeholder only used by the system generated rollout to delete a service.",
  ).optional(),
  rolloutId: z.string().describe(
    "Optional. Unique identifier of this Rollout. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If not specified by client, the server will generate one. The generated id will have the form of, where \"date\" is the create date in ISO 8601 format. \"revision number\" is a monotonically increasing positive number that is reset every day for each service. An example of the generated rollout_id is '2016-02-16r1'",
  ).optional(),
  serviceName: z.string().describe(
    "The name of the service associated with this Rollout.",
  ).optional(),
  status: z.enum([
    "ROLLOUT_STATUS_UNSPECIFIED",
    "IN_PROGRESS",
    "SUCCESS",
    "CANCELLED",
    "FAILED",
    "PENDING",
    "FAILED_ROLLED_BACK",
  ]).describe(
    "The status of this rollout. Readonly. In case of a failed rollout, the system will automatically rollback to the current Rollout version. Readonly.",
  ).optional(),
  trafficPercentStrategy: z.object({
    percentages: z.record(z.string(), z.number()).describe(
      "Maps service configuration IDs to their corresponding traffic percentage. Key is the service configuration ID, Value is the traffic percentage which must be greater than 0.0 and the sum must equal to 100.0.",
    ).optional(),
  }).describe(
    'Strategy that specifies how clients of Google Service Controller want to send traffic to use different config versions. This is generally used by API proxy to split traffic based on your configured percentage for each config version. One example of how to gradually rollout a new service configuration using this strategy: Day 1 Rollout { id: "example.googleapis.com/rollout_20160206" traffic_percent_strategy { percentages: { "example.googleapis.com/20160201": 70.00 "example.googleapis.com/20160206": 30.00 } } } Day 2 Rollout { id: "example.googleapis.com/rollout_20160207" traffic_percent_strategy: { percentages: { "example.googleapis.com/20160206": 100.00 } } }',
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  createdBy: z.string().optional(),
  deleteServiceStrategy: z.object({}).optional(),
  rolloutId: z.string().optional(),
  serviceName: z.string().optional(),
  status: z.string().optional(),
  trafficPercentStrategy: z.object({
    percentages: z.record(z.string(), z.unknown()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  createTime: z.string().describe("Creation time of the rollout. Readonly.")
    .optional(),
  createdBy: z.string().describe("The user who created the Rollout. Readonly.")
    .optional(),
  deleteServiceStrategy: z.object({}).describe(
    "Strategy used to delete a service. This strategy is a placeholder only used by the system generated rollout to delete a service.",
  ).optional(),
  rolloutId: z.string().describe(
    "Optional. Unique identifier of this Rollout. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If not specified by client, the server will generate one. The generated id will have the form of, where \"date\" is the create date in ISO 8601 format. \"revision number\" is a monotonically increasing positive number that is reset every day for each service. An example of the generated rollout_id is '2016-02-16r1'",
  ).optional(),
  serviceName: z.string().describe(
    "The name of the service associated with this Rollout.",
  ).optional(),
  status: z.enum([
    "ROLLOUT_STATUS_UNSPECIFIED",
    "IN_PROGRESS",
    "SUCCESS",
    "CANCELLED",
    "FAILED",
    "PENDING",
    "FAILED_ROLLED_BACK",
  ]).describe(
    "The status of this rollout. Readonly. In case of a failed rollout, the system will automatically rollback to the current Rollout version. Readonly.",
  ).optional(),
  trafficPercentStrategy: z.object({
    percentages: z.record(z.string(), z.number()).describe(
      "Maps service configuration IDs to their corresponding traffic percentage. Key is the service configuration ID, Value is the traffic percentage which must be greater than 0.0 and the sum must equal to 100.0.",
    ).optional(),
  }).describe(
    'Strategy that specifies how clients of Google Service Controller want to send traffic to use different config versions. This is generally used by API proxy to split traffic based on your configured percentage for each config version. One example of how to gradually rollout a new service configuration using this strategy: Day 1 Rollout { id: "example.googleapis.com/rollout_20160206" traffic_percent_strategy { percentages: { "example.googleapis.com/20160201": 70.00 "example.googleapis.com/20160206": 30.00 } } } Day 2 Rollout { id: "example.googleapis.com/rollout_20160207" traffic_percent_strategy: { percentages: { "example.googleapis.com/20160206": 100.00 } } }',
  ).optional(),
});

/** Swamp extension model for Google Cloud Service Management Services.Rollouts. Registered at `@swamp/gcp/servicemanagement/services-rollouts`. */
export const model = {
  type: "@swamp/gcp/servicemanagement/services-rollouts",
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
      description:
        "A rollout resource that defines how service configuration versions are pushed...",
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
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["createdBy"] !== undefined) body["createdBy"] = g["createdBy"];
        if (g["deleteServiceStrategy"] !== undefined) {
          body["deleteServiceStrategy"] = g["deleteServiceStrategy"];
        }
        if (g["rolloutId"] !== undefined) body["rolloutId"] = g["rolloutId"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["trafficPercentStrategy"] !== undefined) {
          body["trafficPercentStrategy"] = g["trafficPercentStrategy"];
        }
        if (g["name"] !== undefined) params["rolloutId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "serviceName": String(g["serviceName"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a rollouts",
      arguments: z.object({
        identifier: z.string().describe("The name of the rollouts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["serviceName"] !== undefined) {
          params["serviceName"] = String(g["serviceName"]);
        }
        params["rolloutId"] = args.identifier;
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
          if (g["serviceName"] !== undefined) {
            params["serviceName"] = String(g["serviceName"]);
          } else if (existing["serviceName"]) {
            params["serviceName"] = String(existing["serviceName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["rolloutId"] = identifier;
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
