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

// Auto-generated extension model for @swamp/gcp/gkehub/rolloutsequences
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE Hub RolloutSequences.
 *
 * RolloutSequence defines the desired order of upgrades. Next ID: 20
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
  return `${parent}/rolloutSequences/${shortName}`;
}

const BASE_URL = "https://gkehub.googleapis.com/";

const GET_CONFIG = {
  "id": "gkehub.projects.locations.rolloutSequences.get",
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
  "id": "gkehub.projects.locations.rolloutSequences.create",
  "path": "v1/{+parent}/rolloutSequences",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "rolloutSequenceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkehub.projects.locations.rolloutSequences.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gkehub.projects.locations.rolloutSequences.delete",
  "path": "v1/{+name}",
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
  "id": "gkehub.projects.locations.rolloutSequences.list",
  "path": "v1/{+parent}/rolloutSequences",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
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
  autoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.string()).describe(
      'Output only. Mandatory Safety Policies (Always active) which cannot be disabled. The key is the policy ID (e.g., "ENFORCED_CONTROL_PLANE_PATCH") and the value is a human-readable description.',
    ).optional(),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(
        z.enum([
          "UPGRADE_TYPE_UNSPECIFIED",
          "CONTROL_PLANE_MINOR",
          "CONTROL_PLANE_PATCH",
          "NODE_MINOR",
          "NODE_PATCH",
        ]),
      ).describe("Optional. The list of enabled upgrade types.").optional(),
    }).describe("The scope for automatic rollout creation.").optional(),
  }).describe("Configuration for automatic upgrades.").optional(),
  displayName: z.string().describe(
    "Optional. Human readable display name of the Rollout Sequence.",
  ).optional(),
  effectiveAutoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.string()).describe(
      'Output only. Mandatory Safety Policies (Always active) which cannot be disabled. The key is the policy ID (e.g., "ENFORCED_CONTROL_PLANE_PATCH") and the value is a human-readable description.',
    ).optional(),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(
        z.enum([
          "UPGRADE_TYPE_UNSPECIFIED",
          "CONTROL_PLANE_MINOR",
          "CONTROL_PLANE_PATCH",
          "NODE_MINOR",
          "NODE_PATCH",
        ]),
      ).describe("Optional. The list of enabled upgrade types.").optional(),
    }).describe("The scope for automatic rollout creation.").optional(),
  }).describe("Configuration for automatic upgrades.").optional(),
  ignoredClustersSelector: z.object({
    labelSelector: z.string().describe(
      "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
    ).optional(),
  }).describe("Selector for clusters.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this Rollout Sequence.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME}",
  ).optional(),
  operationalState: z.object({
    reasons: z.array(
      z.enum([
        "REASON_UNSPECIFIED",
        "FLEET_FEATURE_DELETED_ERROR",
        "FLEET_DELETED_ERROR",
        "EMPTY_STAGE_WARNING",
        "MIXED_RELEASE_CHANNELS_WARNING",
        "INTERNAL_ERROR",
        "NO_CLUSTERS_IN_SEQUENCE",
      ]),
    ).describe("Output only. Reasons for the Rollout Sequence state.")
      .optional(),
    state: z.enum([
      "STATE_CODE_UNSPECIFIED",
      "ACTIVE",
      "WARNING",
      "ERROR",
      "INITIALIZING",
    ]).describe("Output only. State of the Rollout Sequence.").optional(),
    stateChangeTime: z.string().describe(
      "Output only. The timestamp at which the operational state was last changed. Used to track how long it has been in the current state.",
    ).optional(),
  }).describe("Operational state of the Rollout Sequence.").optional(),
  stages: z.array(z.object({
    clusterSelector: z.object({
      labelSelector: z.string().describe(
        "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
      ).optional(),
    }).describe("Selector for clusters.").optional(),
    fleetProjects: z.array(z.string()).describe(
      "Required. List of Fleet projects to select the clusters from. Expected format: projects/{project}",
    ).optional(),
    soakDuration: z.string().describe(
      "Optional. Soak time after upgrading all the clusters in the stage.",
    ).optional(),
  })).describe(
    "Required. Ordered list of stages that constitutes this Rollout.",
  ).optional(),
  rolloutSequenceId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.unknown()),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(z.string()),
    }),
  }).optional(),
  computedReleaseChannel: z.string().optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  effectiveAutoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.unknown()),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(z.string()),
    }),
  }).optional(),
  etag: z.string().optional(),
  ignoredClustersSelector: z.object({
    labelSelector: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastQualifiedControlPlaneVersion: z.string().optional(),
  lastQualifiedNodeVersion: z.string().optional(),
  name: z.string(),
  operationalState: z.object({
    reasons: z.array(z.string()),
    state: z.string(),
    stateChangeTime: z.string(),
  }).optional(),
  stages: z.array(z.object({
    clusterSelector: z.object({
      labelSelector: z.string(),
    }),
    fleetProjects: z.array(z.string()),
    soakDuration: z.string(),
  })).optional(),
  targetControlPlaneVersion: z.string().optional(),
  targetNodeVersion: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  autoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.string()).describe(
      'Output only. Mandatory Safety Policies (Always active) which cannot be disabled. The key is the policy ID (e.g., "ENFORCED_CONTROL_PLANE_PATCH") and the value is a human-readable description.',
    ).optional(),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(
        z.enum([
          "UPGRADE_TYPE_UNSPECIFIED",
          "CONTROL_PLANE_MINOR",
          "CONTROL_PLANE_PATCH",
          "NODE_MINOR",
          "NODE_PATCH",
        ]),
      ).describe("Optional. The list of enabled upgrade types.").optional(),
    }).describe("The scope for automatic rollout creation.").optional(),
  }).describe("Configuration for automatic upgrades.").optional(),
  displayName: z.string().describe(
    "Optional. Human readable display name of the Rollout Sequence.",
  ).optional(),
  effectiveAutoUpgradeConfig: z.object({
    enforcedRollouts: z.record(z.string(), z.string()).describe(
      'Output only. Mandatory Safety Policies (Always active) which cannot be disabled. The key is the policy ID (e.g., "ENFORCED_CONTROL_PLANE_PATCH") and the value is a human-readable description.',
    ).optional(),
    rolloutCreationScope: z.object({
      upgradeTypes: z.array(
        z.enum([
          "UPGRADE_TYPE_UNSPECIFIED",
          "CONTROL_PLANE_MINOR",
          "CONTROL_PLANE_PATCH",
          "NODE_MINOR",
          "NODE_PATCH",
        ]),
      ).describe("Optional. The list of enabled upgrade types.").optional(),
    }).describe("The scope for automatic rollout creation.").optional(),
  }).describe("Configuration for automatic upgrades.").optional(),
  ignoredClustersSelector: z.object({
    labelSelector: z.string().describe(
      "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
    ).optional(),
  }).describe("Selector for clusters.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this Rollout Sequence.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME}",
  ).optional(),
  operationalState: z.object({
    reasons: z.array(
      z.enum([
        "REASON_UNSPECIFIED",
        "FLEET_FEATURE_DELETED_ERROR",
        "FLEET_DELETED_ERROR",
        "EMPTY_STAGE_WARNING",
        "MIXED_RELEASE_CHANNELS_WARNING",
        "INTERNAL_ERROR",
        "NO_CLUSTERS_IN_SEQUENCE",
      ]),
    ).describe("Output only. Reasons for the Rollout Sequence state.")
      .optional(),
    state: z.enum([
      "STATE_CODE_UNSPECIFIED",
      "ACTIVE",
      "WARNING",
      "ERROR",
      "INITIALIZING",
    ]).describe("Output only. State of the Rollout Sequence.").optional(),
    stateChangeTime: z.string().describe(
      "Output only. The timestamp at which the operational state was last changed. Used to track how long it has been in the current state.",
    ).optional(),
  }).describe("Operational state of the Rollout Sequence.").optional(),
  stages: z.array(z.object({
    clusterSelector: z.object({
      labelSelector: z.string().describe(
        "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
      ).optional(),
    }).describe("Selector for clusters.").optional(),
    fleetProjects: z.array(z.string()).describe(
      "Required. List of Fleet projects to select the clusters from. Expected format: projects/{project}",
    ).optional(),
    soakDuration: z.string().describe(
      "Optional. Soak time after upgrading all the clusters in the stage.",
    ).optional(),
  })).describe(
    "Required. Ordered list of stages that constitutes this Rollout.",
  ).optional(),
  rolloutSequenceId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
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

/** Swamp extension model for Google Cloud GKE Hub RolloutSequences. Registered at `@swamp/gcp/gkehub/rolloutsequences`. */
export const model = {
  type: "@swamp/gcp/gkehub/rolloutsequences",
  version: "2026.06.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "RolloutSequence defines the desired order of upgrades. Next ID: 20",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rolloutSequences",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["autoUpgradeConfig"] !== undefined) {
          body["autoUpgradeConfig"] = g["autoUpgradeConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["effectiveAutoUpgradeConfig"] !== undefined) {
          body["effectiveAutoUpgradeConfig"] = g["effectiveAutoUpgradeConfig"];
        }
        if (g["ignoredClustersSelector"] !== undefined) {
          body["ignoredClustersSelector"] = g["ignoredClustersSelector"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["operationalState"] !== undefined) {
          body["operationalState"] = g["operationalState"];
        }
        if (g["stages"] !== undefined) body["stages"] = g["stages"];
        if (g["rolloutSequenceId"] !== undefined) {
          body["rolloutSequenceId"] = g["rolloutSequenceId"];
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
          undefined,
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
      description: "Get a rolloutSequences",
      arguments: z.object({
        identifier: z.string().describe("The name of the rolloutSequences"),
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
      description: "Update rolloutSequences attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["autoUpgradeConfig"] !== undefined) {
          body["autoUpgradeConfig"] = g["autoUpgradeConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["effectiveAutoUpgradeConfig"] !== undefined) {
          body["effectiveAutoUpgradeConfig"] = g["effectiveAutoUpgradeConfig"];
        }
        if (g["ignoredClustersSelector"] !== undefined) {
          body["ignoredClustersSelector"] = g["ignoredClustersSelector"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["operationalState"] !== undefined) {
          body["operationalState"] = g["operationalState"];
        }
        if (g["stages"] !== undefined) body["stages"] = g["stages"];
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
          undefined,
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
      description: "Delete the rolloutSequences",
      arguments: z.object({
        identifier: z.string().describe("The name of the rolloutSequences"),
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
      description: "Sync rolloutSequences state from GCP",
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
      description: "List rolloutSequences resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Lists Rollout Sequences that match the filter expression, following the syntax outlined in https://google.aip.dev/160.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of rollout sequences to return. The service may return fewer than this value. If unspecified, at most 50 rollout sequences will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "rolloutSequences",
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
    upgrade: {
      description: "upgrade",
      arguments: z.object({
        force: z.any().optional(),
        upgradeType: z.any().optional(),
        version: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["upgradeType"] !== undefined) {
          body["upgradeType"] = args["upgradeType"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkehub.projects.locations.rolloutSequences.upgrade",
            "path": "v1/{+name}:upgrade",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
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
