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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
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
    }).describe(
      "Optional. Specifies the scope of automation for the creation of rollouts. Represents the types of rollouts (version upgrades) the sequence should initiate automatically. If this field is `unset`, it defaults to all types. If this field is `set` but the internal `upgrade_types` list is `empty`, most automatic rollouts are disabled for this sequence. Exceptions are rollouts enforcing our security policies (e.g. such as end-of-support and outdated control plane patch enforcements). These policy enforcements cannot be disabled.",
    ).optional(),
  }).describe(
    "Optional. Configuration for automatic upgrades. If this message is `unset`, the system applies default behavior.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human readable display name of the Rollout Sequence.",
  ).optional(),
  ignoredClustersSelector: z.object({
    labelSelector: z.string().describe(
      "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
    ).optional(),
  }).describe(
    "Optional. Selector for clusters to exclude from the Rollout Sequence.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this Rollout Sequence.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME}",
  ).optional(),
  stages: z.array(z.object({
    clusterSelector: z.object({
      labelSelector: z.string().describe(
        "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
      ).optional(),
    }).describe(
      "Optional. Filter members of fleets (above) to a subset of clusters. If not specified, all clusters in the fleets are selected.",
    ).optional(),
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
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
    }).describe(
      "Optional. Specifies the scope of automation for the creation of rollouts. Represents the types of rollouts (version upgrades) the sequence should initiate automatically. If this field is `unset`, it defaults to all types. If this field is `set` but the internal `upgrade_types` list is `empty`, most automatic rollouts are disabled for this sequence. Exceptions are rollouts enforcing our security policies (e.g. such as end-of-support and outdated control plane patch enforcements). These policy enforcements cannot be disabled.",
    ).optional(),
  }).describe(
    "Optional. Configuration for automatic upgrades. If this message is `unset`, the system applies default behavior.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human readable display name of the Rollout Sequence.",
  ).optional(),
  ignoredClustersSelector: z.object({
    labelSelector: z.string().describe(
      "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
    ).optional(),
  }).describe(
    "Optional. Selector for clusters to exclude from the Rollout Sequence.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this Rollout Sequence.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME}",
  ).optional(),
  stages: z.array(z.object({
    clusterSelector: z.object({
      labelSelector: z.string().describe(
        "Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`.",
      ).optional(),
    }).describe(
      "Optional. Filter members of fleets (above) to a subset of clusters. If not specified, all clusters in the fleets are selected.",
    ).optional(),
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

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud GKE Hub RolloutSequences. Registered at `@swamp/gcp/gkehub/rolloutsequences`. */
export const model = {
  type: "@swamp/gcp/gkehub/rolloutsequences",
  version: "2026.10.02.1",
  upgrades: [
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (g["ignoredClustersSelector"] !== undefined) {
          body["ignoredClustersSelector"] = g["ignoredClustersSelector"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["stages"] !== undefined) body["stages"] = g["stages"];
        if (g["rolloutSequenceId"] !== undefined) {
          params["rolloutSequenceId"] = String(g["rolloutSequenceId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific rolloutSequences by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["autoUpgradeConfig"] !== undefined) {
          body["autoUpgradeConfig"] = g["autoUpgradeConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["ignoredClustersSelector"] !== undefined) {
          body["ignoredClustersSelector"] = g["ignoredClustersSelector"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["stages"] !== undefined) body["stages"] = g["stages"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific rolloutSequences by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
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
        ignoreClusterDisruptionBudgets: z.any().optional(),
        ignoreMaintenancePolicies: z.any().optional(),
        patchOnly: z.any().optional(),
        prioritized: z.any().optional(),
        soakDurationOverrideAllStages: z.any().optional(),
        soakDurationOverridePerStage: z.any().optional(),
        upgradeType: z.any().optional(),
        version: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["ignoreClusterDisruptionBudgets"] !== undefined) {
          body["ignoreClusterDisruptionBudgets"] =
            args["ignoreClusterDisruptionBudgets"];
        }
        if (args["ignoreMaintenancePolicies"] !== undefined) {
          body["ignoreMaintenancePolicies"] = args["ignoreMaintenancePolicies"];
        }
        if (args["patchOnly"] !== undefined) {
          body["patchOnly"] = args["patchOnly"];
        }
        if (args["prioritized"] !== undefined) {
          body["prioritized"] = args["prioritized"];
        }
        if (args["soakDurationOverrideAllStages"] !== undefined) {
          body["soakDurationOverrideAllStages"] =
            args["soakDurationOverrideAllStages"];
        }
        if (args["soakDurationOverridePerStage"] !== undefined) {
          body["soakDurationOverridePerStage"] =
            args["soakDurationOverridePerStage"];
        }
        if (args["upgradeType"] !== undefined) {
          body["upgradeType"] = args["upgradeType"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          baseUrl,
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
