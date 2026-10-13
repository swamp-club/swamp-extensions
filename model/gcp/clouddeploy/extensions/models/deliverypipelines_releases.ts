// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-releases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases.
 *
 * A `Release` resource in the Cloud Deploy API. A `Release` defines a specific Skaffold configuration instance that can be deployed.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/releases/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.releases.get",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.releases.create",
  "path": "v1/{+parent}/releases",
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
    "releaseId": {
      "location": "query",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.releases.list",
  "path": "v1/{+parent}/releases",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string().describe(
      "Optional. Image name in Skaffold configuration.",
    ).optional(),
    tag: z.string().describe(
      'Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123".',
    ).optional(),
  })).describe(
    "Optional. List of artifacts to pass through to Skaffold command.",
  ).optional(),
  deployParameters: z.record(z.string(), z.string()).describe(
    "Optional. The deploy parameters to use for all targets in this release.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Release`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  skaffoldConfigPath: z.string().describe(
    "Optional. Filepath of the Skaffold config inside of the config URI.",
  ).optional(),
  skaffoldConfigUri: z.string().describe(
    "Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration.",
  ).optional(),
  skaffoldVersion: z.string().describe(
    'Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used.',
  ).optional(),
  toolVersions: z.object({
    docker: z.string().describe(
      "Optional. The Docker version to use for Cloud Deploy operations.",
    ).optional(),
    helm: z.string().describe(
      "Optional. The Helm version to use for Cloud Deploy operations.",
    ).optional(),
    kpt: z.string().describe(
      "Optional. The kpt version to use for Cloud Deploy operations.",
    ).optional(),
    kubectl: z.string().describe(
      "Optional. The Kubectl version to use for Cloud Deploy operations.",
    ).optional(),
    kustomize: z.string().describe(
      "Optional. The Kustomize version to use for Cloud Deploy operations.",
    ).optional(),
    skaffold: z.string().describe(
      "Optional. The Skaffold version to use for Cloud Deploy operations.",
    ).optional(),
  }).describe(
    "Optional. The tool versions to use for this release and all subsequent operations involving this release. If unset, tool versions are frozen when the release is created.",
  ).optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  releaseId: z.string().describe("Required. ID of the `Release`.").optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  abandoned: z.boolean().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string(),
    tag: z.string(),
  })).optional(),
  condition: z.object({
    dockerVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    helmVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kptVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kubectlVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kustomizeVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    releaseReadyCondition: z.object({
      status: z.boolean(),
    }),
    skaffoldSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      skaffoldSupportState: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
    }),
    skaffoldVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  customTargetTypeSnapshots: z.array(z.object({
    annotations: z.record(z.string(), z.unknown()),
    createTime: z.string(),
    customActions: z.object({
      deployAction: z.string(),
      includeSkaffoldModules: z.array(z.object({
        configs: z.unknown(),
        git: z.unknown(),
        googleCloudBuildRepo: z.unknown(),
        googleCloudStorage: z.unknown(),
      })),
      renderAction: z.string(),
    }),
    customTargetTypeId: z.string(),
    description: z.string(),
    etag: z.string(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    tasks: z.object({
      deploy: z.object({
        container: z.object({
          args: z.unknown(),
          command: z.unknown(),
          env: z.unknown(),
          image: z.unknown(),
        }),
      }),
      render: z.object({
        container: z.object({
          args: z.unknown(),
          command: z.unknown(),
          env: z.unknown(),
          image: z.unknown(),
        }),
      }),
    }),
    uid: z.string(),
    updateTime: z.string(),
  })).optional(),
  deliveryPipelineSnapshot: z.object({
    annotations: z.record(z.string(), z.unknown()),
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
    }),
    createTime: z.string(),
    description: z.string(),
    etag: z.string(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    serialPipeline: z.object({
      stages: z.array(z.object({
        deployParameters: z.array(z.unknown()),
        profiles: z.array(z.unknown()),
        strategy: z.object({
          canary: z.unknown(),
          standard: z.unknown(),
        }),
        targetId: z.string(),
      })),
    }),
    suspended: z.boolean(),
    uid: z.string(),
    updateTime: z.string(),
  }).optional(),
  deployParameters: z.record(z.string(), z.unknown()).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  renderEndTime: z.string().optional(),
  renderStartTime: z.string().optional(),
  renderState: z.string().optional(),
  skaffoldConfigPath: z.string().optional(),
  skaffoldConfigUri: z.string().optional(),
  skaffoldVersion: z.string().optional(),
  targetArtifacts: z.record(z.string(), z.unknown()).optional(),
  targetRenders: z.record(z.string(), z.unknown()).optional(),
  targetSnapshots: z.array(z.object({
    annotations: z.record(z.string(), z.unknown()),
    anthosCluster: z.object({
      membership: z.string(),
    }),
    associatedEntities: z.record(z.string(), z.unknown()),
    createTime: z.string(),
    customTarget: z.object({
      customTargetType: z.string(),
    }),
    deployParameters: z.record(z.string(), z.unknown()),
    description: z.string(),
    etag: z.string(),
    executionConfigs: z.array(z.object({
      artifactStorage: z.string(),
      defaultPool: z.object({
        artifactStorage: z.unknown(),
        serviceAccount: z.unknown(),
      }),
      executionTimeout: z.string(),
      privatePool: z.object({
        artifactStorage: z.unknown(),
        serviceAccount: z.unknown(),
        workerPool: z.unknown(),
      }),
      serviceAccount: z.string(),
      usages: z.array(z.unknown()),
      verbose: z.boolean(),
      workerPool: z.string(),
    })),
    gke: z.object({
      cluster: z.string(),
      dnsEndpoint: z.boolean(),
      internalIp: z.boolean(),
      proxyUrl: z.string(),
    }),
    labels: z.record(z.string(), z.unknown()),
    multiTarget: z.object({
      targetIds: z.array(z.string()),
    }),
    name: z.string(),
    requireApproval: z.boolean(),
    run: z.object({
      location: z.string(),
    }),
    targetId: z.string(),
    uid: z.string(),
    updateTime: z.string(),
  })).optional(),
  toolVersions: z.object({
    docker: z.string(),
    helm: z.string(),
    kpt: z.string(),
    kubectl: z.string(),
    kustomize: z.string(),
    skaffold: z.string(),
  }).optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string().describe(
      "Optional. Image name in Skaffold configuration.",
    ).optional(),
    tag: z.string().describe(
      'Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123".',
    ).optional(),
  })).describe(
    "Optional. List of artifacts to pass through to Skaffold command.",
  ).optional(),
  deployParameters: z.record(z.string(), z.string()).describe(
    "Optional. The deploy parameters to use for all targets in this release.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Release`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  skaffoldConfigPath: z.string().describe(
    "Optional. Filepath of the Skaffold config inside of the config URI.",
  ).optional(),
  skaffoldConfigUri: z.string().describe(
    "Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration.",
  ).optional(),
  skaffoldVersion: z.string().describe(
    'Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used.',
  ).optional(),
  toolVersions: z.object({
    docker: z.string().describe(
      "Optional. The Docker version to use for Cloud Deploy operations.",
    ).optional(),
    helm: z.string().describe(
      "Optional. The Helm version to use for Cloud Deploy operations.",
    ).optional(),
    kpt: z.string().describe(
      "Optional. The kpt version to use for Cloud Deploy operations.",
    ).optional(),
    kubectl: z.string().describe(
      "Optional. The Kubectl version to use for Cloud Deploy operations.",
    ).optional(),
    kustomize: z.string().describe(
      "Optional. The Kustomize version to use for Cloud Deploy operations.",
    ).optional(),
    skaffold: z.string().describe(
      "Optional. The Skaffold version to use for Cloud Deploy operations.",
    ).optional(),
  }).describe(
    "Optional. The tool versions to use for this release and all subsequent operations involving this release. If unset, tool versions are frozen when the release is created.",
  ).optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  releaseId: z.string().describe("Required. ID of the `Release`.").optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Deploy DeliveryPipelines.Releases. Registered at `@swamp/gcp/clouddeploy/deliverypipelines-releases`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-releases",
  version: "2026.10.13.1",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: condition, deliveryPipelineSnapshot",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          condition: _condition,
          deliveryPipelineSnapshot: _deliveryPipelineSnapshot,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `Release` resource in the Cloud Deploy API. A `Release` defines a specific ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a releases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["buildArtifacts"] !== undefined) {
          body["buildArtifacts"] = g["buildArtifacts"];
        }
        if (g["deployParameters"] !== undefined) {
          body["deployParameters"] = g["deployParameters"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["skaffoldConfigPath"] !== undefined) {
          body["skaffoldConfigPath"] = g["skaffoldConfigPath"];
        }
        if (g["skaffoldConfigUri"] !== undefined) {
          body["skaffoldConfigUri"] = g["skaffoldConfigUri"];
        }
        if (g["skaffoldVersion"] !== undefined) {
          body["skaffoldVersion"] = g["skaffoldVersion"];
        }
        if (g["toolVersions"] !== undefined) {
          body["toolVersions"] = g["toolVersions"];
        }
        if (g["overrideDeployPolicy"] !== undefined) {
          params["overrideDeployPolicy"] = String(g["overrideDeployPolicy"]);
        }
        if (g["releaseId"] !== undefined) {
          params["releaseId"] = String(g["releaseId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a releases",
      arguments: z.object({
        identifier: z.string().describe("The name of the releases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    sync: {
      description: "Sync releases state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific releases by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List releases resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter releases to be returned. See https://google.aip.dev/160 for more details.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of `Release` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Release` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "releases",
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
    abandon: {
      description: "abandon",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "clouddeploy.projects.locations.deliveryPipelines.releases.abandon",
            "path": "v1/{+name}:abandon",
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
