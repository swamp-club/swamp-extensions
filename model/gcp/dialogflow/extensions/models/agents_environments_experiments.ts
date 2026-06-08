// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/dialogflow/agents-environments-experiments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.Environments.Experiments.
 *
 * GCP dialogflow Agents.Environments.Experiments resource
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/experiments/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.environments.experiments.create",
  "path": "v3/{+parent}/experiments",
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

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.patch",
  "path": "v3/{+name}",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.delete",
  "path": "v3/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.list",
  "path": "v3/{+parent}/experiments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string().optional(),
  result: z.object({
    lastUpdateTime: z.string().optional(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.unknown().optional(),
        count: z.unknown().optional(),
        countType: z.unknown().optional(),
        ratio: z.unknown().optional(),
        type: z.unknown().optional(),
      })).optional(),
      sessionCount: z.number().int().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string().optional(),
    rolloutCondition: z.string().optional(),
    rolloutSteps: z.array(z.object({
      displayName: z.string().optional(),
      minDuration: z.string().optional(),
      trafficPercent: z.number().int().optional(),
    })).optional(),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string().optional(),
    step: z.string().optional(),
    stepIndex: z.number().int().optional(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "RUNNING",
    "DONE",
    "ROLLOUT_FAILED",
  ]).optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.unknown().optional(),
        trafficAllocation: z.unknown().optional(),
        version: z.unknown().optional(),
      })).optional(),
    }).optional(),
  })).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean(),
        trafficAllocation: z.number(),
        version: z.string(),
      })),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string(),
  result: z.object({
    lastUpdateTime: z.string(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.unknown(),
        count: z.unknown(),
        countType: z.unknown(),
        ratio: z.unknown(),
        type: z.unknown(),
      })),
      sessionCount: z.number(),
      version: z.string(),
    })),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string(),
    rolloutCondition: z.string(),
    rolloutSteps: z.array(z.object({
      displayName: z.string(),
      minDuration: z.string(),
      trafficPercent: z.number(),
    })),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string(),
    step: z.string(),
    stepIndex: z.number(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.unknown(),
        trafficAllocation: z.unknown(),
        version: z.unknown(),
      })),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string().optional(),
  result: z.object({
    lastUpdateTime: z.string().optional(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.unknown().optional(),
        count: z.unknown().optional(),
        countType: z.unknown().optional(),
        ratio: z.unknown().optional(),
        type: z.unknown().optional(),
      })).optional(),
      sessionCount: z.number().int().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string().optional(),
    rolloutCondition: z.string().optional(),
    rolloutSteps: z.array(z.object({
      displayName: z.string().optional(),
      minDuration: z.string().optional(),
      trafficPercent: z.number().int().optional(),
    })).optional(),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string().optional(),
    step: z.string().optional(),
    stepIndex: z.number().int().optional(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "RUNNING",
    "DONE",
    "ROLLOUT_FAILED",
  ]).optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.unknown().optional(),
        trafficAllocation: z.unknown().optional(),
        version: z.unknown().optional(),
      })).optional(),
    }).optional(),
  })).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Dialogflow Agents.Environments.Experiments. Registered at `@swamp/gcp/dialogflow/agents-environments-experiments`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-environments-experiments",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents.Environments.Experiments resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a experiments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["definition"] !== undefined) body["definition"] = g["definition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["experimentLength"] !== undefined) {
          body["experimentLength"] = g["experimentLength"];
        }
        if (g["lastUpdateTime"] !== undefined) {
          body["lastUpdateTime"] = g["lastUpdateTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["result"] !== undefined) body["result"] = g["result"];
        if (g["rolloutConfig"] !== undefined) {
          body["rolloutConfig"] = g["rolloutConfig"];
        }
        if (g["rolloutFailureReason"] !== undefined) {
          body["rolloutFailureReason"] = g["rolloutFailureReason"];
        }
        if (g["rolloutState"] !== undefined) {
          body["rolloutState"] = g["rolloutState"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["variantsHistory"] !== undefined) {
          body["variantsHistory"] = g["variantsHistory"];
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
              "readyValues": ["RUNNING", "DONE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update experiments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["definition"] !== undefined) body["definition"] = g["definition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["experimentLength"] !== undefined) {
          body["experimentLength"] = g["experimentLength"];
        }
        if (g["lastUpdateTime"] !== undefined) {
          body["lastUpdateTime"] = g["lastUpdateTime"];
        }
        if (g["result"] !== undefined) body["result"] = g["result"];
        if (g["rolloutConfig"] !== undefined) {
          body["rolloutConfig"] = g["rolloutConfig"];
        }
        if (g["rolloutFailureReason"] !== undefined) {
          body["rolloutFailureReason"] = g["rolloutFailureReason"];
        }
        if (g["rolloutState"] !== undefined) {
          body["rolloutState"] = g["rolloutState"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["variantsHistory"] !== undefined) {
          body["variantsHistory"] = g["variantsHistory"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "DONE"],
              "failedValues": [],
            }
            : undefined,
          credentials,
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
      description: "Delete the experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync experiments state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
    list: {
      description: "List experiments resources",
      arguments: z.object({
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "experiments",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    start: {
      description: "start",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "dialogflow.projects.locations.agents.environments.experiments.start",
            "path": "v3/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "dialogflow.projects.locations.agents.environments.experiments.stop",
            "path": "v3/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
