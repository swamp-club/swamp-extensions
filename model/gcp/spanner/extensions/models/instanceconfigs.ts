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

// Auto-generated extension model for @swamp/gcp/spanner/instanceconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner InstanceConfigs.
 *
 * A possible configuration for a Cloud Spanner instance. Configurations define the geographic placement of nodes and their replication.
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
  return `${parent}/instanceConfigs/${shortName}`;
}

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instanceConfigs.get",
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
  "id": "spanner.projects.instanceConfigs.create",
  "path": "v1/{+parent}/instanceConfigs",
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
  "id": "spanner.projects.instanceConfigs.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "spanner.projects.instanceConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "spanner.projects.instanceConfigs.list",
  "path": "v1/{+parent}/instanceConfigs",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  instanceConfig: z.object({
    baseConfig: z.string().describe(
      "Base configuration name, e.g. projects//instanceConfigs/nam3, based on which this configuration is created. Only set for user-managed configurations. `base_config` must refer to a configuration of type `GOOGLE_MANAGED` in the same project as this configuration.",
    ).optional(),
    configType: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "USER_MANAGED"])
      .describe(
        "Output only. Whether this instance configuration is a Google-managed or user-managed configuration.",
      ).optional(),
    displayName: z.string().describe(
      "The name of this instance configuration as it appears in UIs.",
    ).optional(),
    etag: z.string().describe(
      "etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance configuration from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance configuration updates in order to avoid race conditions: An etag is returned in the response which contains instance configurations, and systems are expected to put that etag in the request to update instance configuration to ensure that their change is applied to the same version of the instance configuration. If no etag is provided in the call to update the instance configuration, then the existing instance configuration is overwritten blindly.",
    ).optional(),
    freeInstanceAvailability: z.enum([
      "FREE_INSTANCE_AVAILABILITY_UNSPECIFIED",
      "AVAILABLE",
      "UNSUPPORTED",
      "DISABLED",
      "QUOTA_EXCEEDED",
    ]).describe(
      "Output only. Describes whether free instances are available to be created in this instance configuration.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer\'s organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. Therefore, you are advised to use an internal label representation, such as JSON, which doesn\'t rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release.',
    ).optional(),
    leaderOptions: z.array(z.string()).describe(
      'Allowed values of the "default_leader" schema option for databases in instances that use this instance configuration.',
    ).optional(),
    name: z.string().describe(
      "A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`. User instance configuration must start with `custom-`.",
    ).optional(),
    optionalReplicas: z.array(z.object({
      defaultLeaderLocation: z.boolean().describe(
        "If true, this location is designated as the default leader location where leader replicas are placed. See the [region types documentation](https://cloud.google.com/spanner/docs/instances#region_types) for more details.",
      ).optional(),
      location: z.string().describe(
        'The location of the serving resources, e.g., "us-central1".',
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "READ_WRITE", "READ_ONLY", "WITNESS"])
        .describe("The type of replica.").optional(),
    })).describe(
      "Output only. The available optional replicas to choose from for user-managed configurations. Populated for Google-managed configurations.",
    ).optional(),
    quorumType: z.enum([
      "QUORUM_TYPE_UNSPECIFIED",
      "REGION",
      "DUAL_REGION",
      "MULTI_REGION",
    ]).describe("Output only. The `QuorumType` of the instance configuration.")
      .optional(),
    reconciling: z.boolean().describe(
      "Output only. If true, the instance configuration is being created or updated. If false, there are no ongoing operations for the instance configuration.",
    ).optional(),
    replicas: z.array(z.object({
      defaultLeaderLocation: z.boolean().describe(
        "If true, this location is designated as the default leader location where leader replicas are placed. See the [region types documentation](https://cloud.google.com/spanner/docs/instances#region_types) for more details.",
      ).optional(),
      location: z.string().describe(
        'The location of the serving resources, e.g., "us-central1".',
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "READ_WRITE", "READ_ONLY", "WITNESS"])
        .describe("The type of replica.").optional(),
    })).describe(
      "The geographic placement of nodes in this instance configuration and their replication properties. To create user-managed configurations, input `replicas` must include all replicas in `replicas` of the `base_config` and include one or more replicas in the `optional_replicas` of the `base_config`.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance configuration state. Applicable only for `USER_MANAGED` configurations.",
    ).optional(),
    storageLimitPerProcessingUnit: z.string().describe(
      "Output only. The storage limit in bytes per processing unit.",
    ).optional(),
  }).describe(
    "A possible configuration for a Cloud Spanner instance. Configurations define the geographic placement of nodes and their replication.",
  ).optional(),
  instanceConfigId: z.string().describe(
    "Required. The ID of the instance configuration to create. Valid identifiers are of the form `custom-[-a-z0-9]*[a-z0-9]` and must be between 2 and 64 characters in length. The `custom-` prefix is required to avoid name conflicts with Google-managed configurations.",
  ).optional(),
  validateOnly: z.boolean().describe(
    "An option to validate, but not actually execute, a request, and provide the same response.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. A mask specifying which fields in InstanceConfig should be updated. The field mask must always be specified; this prevents any future fields in InstanceConfig from being erased accidentally by clients that do not know about them. Only display_name and labels can be updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  baseConfig: z.string().optional(),
  configType: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  freeInstanceAvailability: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  leaderOptions: z.array(z.string()).optional(),
  name: z.string(),
  optionalReplicas: z.array(z.object({
    defaultLeaderLocation: z.boolean(),
    location: z.string(),
    type: z.string(),
  })).optional(),
  quorumType: z.string().optional(),
  reconciling: z.boolean().optional(),
  replicas: z.array(z.object({
    defaultLeaderLocation: z.boolean(),
    location: z.string(),
    type: z.string(),
  })).optional(),
  state: z.string().optional(),
  storageLimitPerProcessingUnit: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  instanceConfig: z.object({
    baseConfig: z.string().describe(
      "Base configuration name, e.g. projects//instanceConfigs/nam3, based on which this configuration is created. Only set for user-managed configurations. `base_config` must refer to a configuration of type `GOOGLE_MANAGED` in the same project as this configuration.",
    ).optional(),
    configType: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "USER_MANAGED"])
      .describe(
        "Output only. Whether this instance configuration is a Google-managed or user-managed configuration.",
      ).optional(),
    displayName: z.string().describe(
      "The name of this instance configuration as it appears in UIs.",
    ).optional(),
    etag: z.string().describe(
      "etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance configuration from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance configuration updates in order to avoid race conditions: An etag is returned in the response which contains instance configurations, and systems are expected to put that etag in the request to update instance configuration to ensure that their change is applied to the same version of the instance configuration. If no etag is provided in the call to update the instance configuration, then the existing instance configuration is overwritten blindly.",
    ).optional(),
    freeInstanceAvailability: z.enum([
      "FREE_INSTANCE_AVAILABILITY_UNSPECIFIED",
      "AVAILABLE",
      "UNSUPPORTED",
      "DISABLED",
      "QUOTA_EXCEEDED",
    ]).describe(
      "Output only. Describes whether free instances are available to be created in this instance configuration.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer\'s organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. Therefore, you are advised to use an internal label representation, such as JSON, which doesn\'t rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release.',
    ).optional(),
    leaderOptions: z.array(z.string()).describe(
      'Allowed values of the "default_leader" schema option for databases in instances that use this instance configuration.',
    ).optional(),
    name: z.string().describe(
      "A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`. User instance configuration must start with `custom-`.",
    ).optional(),
    optionalReplicas: z.array(z.object({
      defaultLeaderLocation: z.boolean().describe(
        "If true, this location is designated as the default leader location where leader replicas are placed. See the [region types documentation](https://cloud.google.com/spanner/docs/instances#region_types) for more details.",
      ).optional(),
      location: z.string().describe(
        'The location of the serving resources, e.g., "us-central1".',
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "READ_WRITE", "READ_ONLY", "WITNESS"])
        .describe("The type of replica.").optional(),
    })).describe(
      "Output only. The available optional replicas to choose from for user-managed configurations. Populated for Google-managed configurations.",
    ).optional(),
    quorumType: z.enum([
      "QUORUM_TYPE_UNSPECIFIED",
      "REGION",
      "DUAL_REGION",
      "MULTI_REGION",
    ]).describe("Output only. The `QuorumType` of the instance configuration.")
      .optional(),
    reconciling: z.boolean().describe(
      "Output only. If true, the instance configuration is being created or updated. If false, there are no ongoing operations for the instance configuration.",
    ).optional(),
    replicas: z.array(z.object({
      defaultLeaderLocation: z.boolean().describe(
        "If true, this location is designated as the default leader location where leader replicas are placed. See the [region types documentation](https://cloud.google.com/spanner/docs/instances#region_types) for more details.",
      ).optional(),
      location: z.string().describe(
        'The location of the serving resources, e.g., "us-central1".',
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "READ_WRITE", "READ_ONLY", "WITNESS"])
        .describe("The type of replica.").optional(),
    })).describe(
      "The geographic placement of nodes in this instance configuration and their replication properties. To create user-managed configurations, input `replicas` must include all replicas in `replicas` of the `base_config` and include one or more replicas in the `optional_replicas` of the `base_config`.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance configuration state. Applicable only for `USER_MANAGED` configurations.",
    ).optional(),
    storageLimitPerProcessingUnit: z.string().describe(
      "Output only. The storage limit in bytes per processing unit.",
    ).optional(),
  }).describe(
    "A possible configuration for a Cloud Spanner instance. Configurations define the geographic placement of nodes and their replication.",
  ).optional(),
  instanceConfigId: z.string().describe(
    "Required. The ID of the instance configuration to create. Valid identifiers are of the form `custom-[-a-z0-9]*[a-z0-9]` and must be between 2 and 64 characters in length. The `custom-` prefix is required to avoid name conflicts with Google-managed configurations.",
  ).optional(),
  validateOnly: z.boolean().describe(
    "An option to validate, but not actually execute, a request, and provide the same response.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. A mask specifying which fields in InstanceConfig should be updated. The field mask must always be specified; this prevents any future fields in InstanceConfig from being erased accidentally by clients that do not know about them. Only display_name and labels can be updated.",
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

/** Swamp extension model for Google Cloud Spanner InstanceConfigs. Registered at `@swamp/gcp/spanner/instanceconfigs`. */
export const model = {
  type: "@swamp/gcp/spanner/instanceconfigs",
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
      description:
        "A possible configuration for a Cloud Spanner instance. Configurations define ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instanceConfigs",
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
        if (g["instanceConfig"] !== undefined) {
          body["instanceConfig"] = g["instanceConfig"];
        }
        if (g["instanceConfigId"] !== undefined) {
          body["instanceConfigId"] = g["instanceConfigId"];
        }
        if (g["validateOnly"] !== undefined) {
          body["validateOnly"] = g["validateOnly"];
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
              "readyValues": ["READY"],
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a instanceConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the instanceConfigs"),
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
    update: {
      description: "Update instanceConfigs attributes",
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
        if (g["instanceConfig"] !== undefined) {
          body["instanceConfig"] = g["instanceConfig"];
        }
        if (g["validateOnly"] !== undefined) {
          body["validateOnly"] = g["validateOnly"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
              "readyValues": ["READY"],
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
      description: "Delete the instanceConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the instanceConfigs"),
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
      description: "Sync instanceConfigs state from GCP",
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
      description: "List instanceConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Number of instance configurations to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "instanceConfigs",
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
  },
};
