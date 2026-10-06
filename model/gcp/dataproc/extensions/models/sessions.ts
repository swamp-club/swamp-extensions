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

// Auto-generated extension model for @swamp/gcp/dataproc/sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc Sessions.
 *
 * A representation of a session.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/sessions/${shortName}`;
}

const BASE_URL = "https://dataproc.googleapis.com/";

const GET_CONFIG = {
  "id": "dataproc.projects.locations.sessions.get",
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
  "id": "dataproc.projects.locations.sessions.create",
  "path": "v1/{+parent}/sessions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sessionId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataproc.projects.locations.sessions.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dataproc.projects.locations.sessions.list",
  "path": "v1/{+parent}/sessions",
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
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Optional. Authentication configuration used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Optional. Associates Resource Manager tags with the workload nodes. There is a max limit of 30 tags. Keys and values can be either in numeric format, such as tagKeys/{tag_key_id} and tagValues/{tag_value_id}, or in namespaced format, such as {org_id|project_id}/{tag_key_short_name} and {tag_value_short_name}.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Optional. Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe(
        "Optional. The Spark History Server configuration for the workload.",
      ).optional(),
    }).describe(
      "Optional. Peripherals configuration that workload has access to.",
    ).optional(),
  }).describe("Optional. Environment configuration for the session execution.")
    .optional(),
  jupyterSession: z.object({
    displayName: z.string().describe(
      "Optional. Display name, shown in the Jupyter kernelspec card.",
    ).optional(),
    kernel: z.enum(["KERNEL_UNSPECIFIED", "PYTHON", "SCALA"]).describe(
      "Optional. Kernel",
    ).optional(),
  }).describe("Optional. Jupyter session config.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with the session. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the session.")
    .optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Optional. Autotuning configuration of the workload.")
      .optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Optional. Configuration for PyPi repository.").optional(),
    }).describe("Optional. Dependency repository configuration.").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Optional. Runtime configuration for the session execution.")
    .optional(),
  sessionTemplate: z.string().describe(
    "Optional. The session template used by the session.Resource names and short template IDs are valid. Examples: * projects/[project_id]/locations/[dataproc_region]/sessionTemplates/[template_id] * [template_id]The template must be in the same project and Dataproc region as the session.",
  ).optional(),
  sparkConnectSession: z.object({}).describe(
    "Optional. Spark connect session config.",
  ).optional(),
  user: z.string().describe(
    "Optional. The email address of the user who owns the session.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the service receives two CreateSessionRequests (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateSessionRequest)s with the same ID, the second request is ignored, and the first Session is created and stored in the backend.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  sessionId: z.string().describe(
    "Required. The ID to use for the session, which becomes the final component of the session's resource name.This value must be 4-63 characters. Valid characters are /a-z-/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creator: z.string().optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.string(),
      }),
      idleTtl: z.string(),
      kmsKey: z.string(),
      networkTags: z.array(z.string()),
      networkUri: z.string(),
      resourceManagerTags: z.record(z.string(), z.unknown()),
      serviceAccount: z.string(),
      stagingBucket: z.string(),
      subnetworkUri: z.string(),
      ttl: z.string(),
    }),
    peripheralsConfig: z.object({
      metastoreService: z.string(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string(),
      }),
    }),
  }).optional(),
  jupyterSession: z.object({
    displayName: z.string(),
    kernel: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(z.string()),
    }),
    cohort: z.string(),
    containerImage: z.string(),
    properties: z.record(z.string(), z.unknown()),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string(),
      }),
    }),
    version: z.string(),
  }).optional(),
  runtimeInfo: z.object({
    approximateUsage: z.object({
      acceleratorType: z.string(),
      milliAcceleratorSeconds: z.string(),
      milliAcceleratorSecondsA10040: z.string(),
      milliAcceleratorSecondsA10080: z.string(),
      milliAcceleratorSecondsL4: z.string(),
      milliDcuSeconds: z.string(),
      shuffleStorageGbSeconds: z.string(),
      updateTime: z.string(),
    }),
    cohortInfo: z.object({
      cohort: z.string(),
      cohortSource: z.string(),
    }),
    currentUsage: z.object({
      acceleratorType: z.string(),
      milliAccelerator: z.string(),
      milliAcceleratorA10040: z.string(),
      milliAcceleratorA10080: z.string(),
      milliAcceleratorL4: z.string(),
      milliDcu: z.string(),
      milliDcuPremium: z.string(),
      shuffleStorageGb: z.string(),
      shuffleStorageGbPremium: z.string(),
      snapshotTime: z.string(),
    }),
    diagnosticOutputUri: z.string(),
    endpoints: z.record(z.string(), z.unknown()),
    outputUri: z.string(),
    propertiesInfo: z.object({
      autotuningProperties: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  sessionTemplate: z.string().optional(),
  sparkConnectSession: z.object({}).optional(),
  state: z.string().optional(),
  stateHistory: z.array(z.object({
    state: z.string(),
    stateMessage: z.string(),
    stateStartTime: z.string(),
  })).optional(),
  stateMessage: z.string().optional(),
  stateTime: z.string().optional(),
  user: z.string().optional(),
  uuid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Optional. Authentication configuration used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Optional. Associates Resource Manager tags with the workload nodes. There is a max limit of 30 tags. Keys and values can be either in numeric format, such as tagKeys/{tag_key_id} and tagValues/{tag_value_id}, or in namespaced format, such as {org_id|project_id}/{tag_key_short_name} and {tag_value_short_name}.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Optional. Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe(
        "Optional. The Spark History Server configuration for the workload.",
      ).optional(),
    }).describe(
      "Optional. Peripherals configuration that workload has access to.",
    ).optional(),
  }).describe("Optional. Environment configuration for the session execution.")
    .optional(),
  jupyterSession: z.object({
    displayName: z.string().describe(
      "Optional. Display name, shown in the Jupyter kernelspec card.",
    ).optional(),
    kernel: z.enum(["KERNEL_UNSPECIFIED", "PYTHON", "SCALA"]).describe(
      "Optional. Kernel",
    ).optional(),
  }).describe("Optional. Jupyter session config.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with the session. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the session.")
    .optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Optional. Autotuning configuration of the workload.")
      .optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Optional. Configuration for PyPi repository.").optional(),
    }).describe("Optional. Dependency repository configuration.").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Optional. Runtime configuration for the session execution.")
    .optional(),
  sessionTemplate: z.string().describe(
    "Optional. The session template used by the session.Resource names and short template IDs are valid. Examples: * projects/[project_id]/locations/[dataproc_region]/sessionTemplates/[template_id] * [template_id]The template must be in the same project and Dataproc region as the session.",
  ).optional(),
  sparkConnectSession: z.object({}).describe(
    "Optional. Spark connect session config.",
  ).optional(),
  user: z.string().describe(
    "Optional. The email address of the user who owns the session.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the service receives two CreateSessionRequests (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateSessionRequest)s with the same ID, the second request is ignored, and the first Session is created and stored in the backend.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  sessionId: z.string().describe(
    "Required. The ID to use for the session, which becomes the final component of the session's resource name.This value must be 4-63 characters. Valid characters are /a-z-/.",
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

/** Swamp extension model for Google Cloud Dataproc Sessions. Registered at `@swamp/gcp/dataproc/sessions`. */
export const model = {
  type: "@swamp/gcp/dataproc/sessions",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.01.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.28.1",
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
      description: "No schema changes",
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
      description: "Removed: runtimeInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { runtimeInfo: _runtimeInfo, ...rest } = old;
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
      toVersion: "2026.09.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of a session.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessions",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["environmentConfig"] !== undefined) {
          body["environmentConfig"] = g["environmentConfig"];
        }
        if (g["jupyterSession"] !== undefined) {
          body["jupyterSession"] = g["jupyterSession"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["runtimeConfig"] !== undefined) {
          body["runtimeConfig"] = g["runtimeConfig"];
        }
        if (g["sessionTemplate"] !== undefined) {
          body["sessionTemplate"] = g["sessionTemplate"];
        }
        if (g["sparkConnectSession"] !== undefined) {
          body["sparkConnectSession"] = g["sparkConnectSession"];
        }
        if (g["user"] !== undefined) body["user"] = g["user"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["sessionId"] !== undefined) {
          params["sessionId"] = String(g["sessionId"]);
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["TERMINATED", "FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
    delete: {
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
      description: "Sync sessions state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific sessions by name (e.g. one discovered by list)",
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
      description: "List sessions resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. A filter for the sessions to return in the response.A filter is a logical expression constraining the values of various fields in each session resource. Filters are case sensitive, and may contain multiple clauses combined with logical operators (AND, OR). Supported fields are session_id, session_uuid, state, create_time, and labels.Example: state = ACTIVE and create_time < "2023-01-01T00:00:00Z" is a filter for sessions in an ACTIVE state that were created before 2023-01-01. state = ACTIVE and labels.environment=production is a filter for sessions in an ACTIVE state that have a production environment label.See https://google.aip.dev/assets/misc/ebnf-filtering.txt for a detailed description of the filter syntax and a list of supported comparators.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of sessions to return in each response. The service may return fewer than this value.",
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
          "sessions",
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
    terminate: {
      description: "terminate",
      arguments: z.object({
        requestId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "dataproc.projects.locations.sessions.terminate",
            "path": "v1/{+name}:terminate",
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
