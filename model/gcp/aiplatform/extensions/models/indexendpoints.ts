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

// Auto-generated extension model for @swamp/gcp/aiplatform/indexendpoints
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform IndexEndpoints.
 *
 * Indexes are deployed into it. An IndexEndpoint can have multiple DeployedIndexes.
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
  return `${parent}/indexEndpoints/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.indexEndpoints.get",
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
  "id": "aiplatform.projects.locations.indexEndpoints.create",
  "path": "v1/{+parent}/indexEndpoints",
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
  "id": "aiplatform.projects.locations.indexEndpoints.patch",
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
  "id": "aiplatform.projects.locations.indexEndpoints.delete",
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
  "id": "aiplatform.projects.locations.indexEndpoints.list",
  "path": "v1/{+parent}/indexEndpoints",
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
    "readMask": {
      "location": "query",
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
  description: z.string().describe("The description of the IndexEndpoint.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the IndexEndpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your IndexEndpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  network: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the IndexEndpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. network and private_service_connect_config are mutually exclusive. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in '12345', and {network} is network name.",
  ).optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean().describe(
      "Required. If true, expose the IndexEndpoint via private service connect.",
    ).optional(),
    projectAllowlist: z.array(z.string()).describe(
      "A list of Projects from which the forwarding rule will target the service attachment.",
    ).optional(),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string().describe(
        "Output only. Error message if the PSC service automation failed.",
      ).optional(),
      forwardingRule: z.string().describe(
        "Output only. Forwarding rule created by the PSC service automation.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. IP address rule created by the PSC service automation.",
      ).optional(),
      network: z.string().describe(
        "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. Project id used to create forwarding rule.",
      ).optional(),
      state: z.enum([
        "PSC_AUTOMATION_STATE_UNSPECIFIED",
        "PSC_AUTOMATION_STATE_SUCCESSFUL",
        "PSC_AUTOMATION_STATE_FAILED",
      ]).describe("Output only. The state of the PSC service automation.")
        .optional(),
    })).describe(
      "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
    ).optional(),
  }).describe("Represents configuration for private service connect.")
    .optional(),
  publicEndpointEnabled: z.boolean().describe(
    "Optional. If true, the deployed index will be accessible through public endpoint.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deployedIndexes: z.array(z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number(),
      minReplicaCount: z.number(),
    }),
    createTime: z.string(),
    dedicatedResources: z.object({
      autoscalingMetricSpecs: z.array(z.object({
        metricName: z.unknown(),
        target: z.unknown(),
      })),
      machineSpec: z.object({
        acceleratorCount: z.number(),
        acceleratorType: z.string(),
        gpuPartitionSize: z.string(),
        machineType: z.string(),
        reservationAffinity: z.object({
          key: z.unknown(),
          reservationAffinityType: z.unknown(),
          values: z.unknown(),
        }),
        tpuTopology: z.string(),
      }),
      maxReplicaCount: z.number(),
      minReplicaCount: z.number(),
      requiredReplicaCount: z.number(),
      spot: z.boolean(),
    }),
    deployedIndexAuthConfig: z.object({
      authProvider: z.object({
        allowedIssuers: z.array(z.unknown()),
        audiences: z.array(z.unknown()),
      }),
    }),
    deploymentGroup: z.string(),
    deploymentTier: z.string(),
    displayName: z.string(),
    enableAccessLogging: z.boolean(),
    enableDatapointUpsertLogging: z.boolean(),
    id: z.string(),
    index: z.string(),
    indexSyncTime: z.string(),
    privateEndpoints: z.object({
      matchGrpcAddress: z.string(),
      pscAutomatedEndpoints: z.array(z.object({
        matchAddress: z.unknown(),
        network: z.unknown(),
        projectId: z.unknown(),
      })),
      serviceAttachment: z.string(),
    }),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string(),
      forwardingRule: z.string(),
      ipAddress: z.string(),
      network: z.string(),
      projectId: z.string(),
      state: z.string(),
    })),
    reservedIpRanges: z.array(z.string()),
  })).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enablePrivateServiceConnect: z.boolean().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean(),
    projectAllowlist: z.array(z.string()),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string(),
      forwardingRule: z.string(),
      ipAddress: z.string(),
      network: z.string(),
      projectId: z.string(),
      state: z.string(),
    })),
    serviceAttachment: z.string(),
  }).optional(),
  publicEndpointDomainName: z.string().optional(),
  publicEndpointEnabled: z.boolean().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe("The description of the IndexEndpoint.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the IndexEndpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your IndexEndpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  network: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the IndexEndpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. network and private_service_connect_config are mutually exclusive. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in '12345', and {network} is network name.",
  ).optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean().describe(
      "Required. If true, expose the IndexEndpoint via private service connect.",
    ).optional(),
    projectAllowlist: z.array(z.string()).describe(
      "A list of Projects from which the forwarding rule will target the service attachment.",
    ).optional(),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string().describe(
        "Output only. Error message if the PSC service automation failed.",
      ).optional(),
      forwardingRule: z.string().describe(
        "Output only. Forwarding rule created by the PSC service automation.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. IP address rule created by the PSC service automation.",
      ).optional(),
      network: z.string().describe(
        "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. Project id used to create forwarding rule.",
      ).optional(),
      state: z.enum([
        "PSC_AUTOMATION_STATE_UNSPECIFIED",
        "PSC_AUTOMATION_STATE_SUCCESSFUL",
        "PSC_AUTOMATION_STATE_FAILED",
      ]).describe("Output only. The state of the PSC service automation.")
        .optional(),
    })).describe(
      "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
    ).optional(),
  }).describe("Represents configuration for private service connect.")
    .optional(),
  publicEndpointEnabled: z.boolean().describe(
    "Optional. If true, the deployed index will be accessible through public endpoint.",
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

/** Swamp extension model for Google Cloud Agent Platform IndexEndpoints. Registered at `@swamp/gcp/aiplatform/indexendpoints`. */
export const model = {
  type: "@swamp/gcp/aiplatform/indexendpoints",
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
      toVersion: "2026.05.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Indexes are deployed into it. An IndexEndpoint can have multiple DeployedInde...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a indexEndpoints",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["privateServiceConnectConfig"] !== undefined) {
          body["privateServiceConnectConfig"] =
            g["privateServiceConnectConfig"];
        }
        if (g["publicEndpointEnabled"] !== undefined) {
          body["publicEndpointEnabled"] = g["publicEndpointEnabled"];
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
      description: "Get a indexEndpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexEndpoints"),
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
      description: "Update indexEndpoints attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["privateServiceConnectConfig"] !== undefined) {
          body["privateServiceConnectConfig"] =
            g["privateServiceConnectConfig"];
        }
        if (g["publicEndpointEnabled"] !== undefined) {
          body["publicEndpointEnabled"] = g["publicEndpointEnabled"];
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
      description: "Delete the indexEndpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexEndpoints"),
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
      description: "Sync indexEndpoints state from GCP",
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
      description: "List indexEndpoints resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression for filtering the results of the request. For field names both snake_case and camelCase are supported. * `index_endpoint` supports = and !=. `index_endpoint` represents the IndexEndpoint ID, ie. the last segment of the IndexEndpoint\'s resourcename. * `display_name` supports =, != and regex() (uses [re2](https://github.com/google/re2/wiki/Syntax) syntax) * `labels` supports general map functions that is: `labels.key=value` - key:value equality `labels.key:* or labels:key - key existence A key including a space must be quoted. `labels."a key"`. Some examples: * `index_endpoint="1"` * `display_name="myDisplayName"` * `regex(display_name, "^A") -> The display name starts with an A. * `labels.myKey="myValue"`',
        ).optional(),
        pageSize: z.number().describe("Optional. The standard list page size.")
          .optional(),
        readMask: z.string().describe(
          "Optional. Mask specifying which fields to read.",
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
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "indexEndpoints",
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
    deploy_index: {
      description: "deploy index",
      arguments: z.object({
        deployedIndex: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["indexEndpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployedIndex"] !== undefined) {
          body["deployedIndex"] = args["deployedIndex"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.indexEndpoints.deployIndex",
            "path": "v1/{+indexEndpoint}:deployIndex",
            "httpMethod": "POST",
            "parameterOrder": ["indexEndpoint"],
            "parameters": {
              "indexEndpoint": { "location": "path", "required": true },
            },
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
    find_neighbors: {
      description: "find neighbors",
      arguments: z.object({
        deployedIndexId: z.any().optional(),
        queries: z.any().optional(),
        returnFullDatapoint: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["indexEndpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployedIndexId"] !== undefined) {
          body["deployedIndexId"] = args["deployedIndexId"];
        }
        if (args["queries"] !== undefined) body["queries"] = args["queries"];
        if (args["returnFullDatapoint"] !== undefined) {
          body["returnFullDatapoint"] = args["returnFullDatapoint"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.indexEndpoints.findNeighbors",
            "path": "v1/{+indexEndpoint}:findNeighbors",
            "httpMethod": "POST",
            "parameterOrder": ["indexEndpoint"],
            "parameters": {
              "indexEndpoint": { "location": "path", "required": true },
            },
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
    mutate_deployed_index: {
      description: "mutate deployed index",
      arguments: z.object({
        automaticResources: z.any().optional(),
        createTime: z.any().optional(),
        dedicatedResources: z.any().optional(),
        deployedIndexAuthConfig: z.any().optional(),
        deploymentGroup: z.any().optional(),
        deploymentTier: z.any().optional(),
        displayName: z.any().optional(),
        enableAccessLogging: z.any().optional(),
        enableDatapointUpsertLogging: z.any().optional(),
        id: z.any().optional(),
        index: z.any().optional(),
        indexSyncTime: z.any().optional(),
        privateEndpoints: z.any().optional(),
        pscAutomationConfigs: z.any().optional(),
        reservedIpRanges: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["indexEndpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["automaticResources"] !== undefined) {
          body["automaticResources"] = args["automaticResources"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["dedicatedResources"] !== undefined) {
          body["dedicatedResources"] = args["dedicatedResources"];
        }
        if (args["deployedIndexAuthConfig"] !== undefined) {
          body["deployedIndexAuthConfig"] = args["deployedIndexAuthConfig"];
        }
        if (args["deploymentGroup"] !== undefined) {
          body["deploymentGroup"] = args["deploymentGroup"];
        }
        if (args["deploymentTier"] !== undefined) {
          body["deploymentTier"] = args["deploymentTier"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["enableAccessLogging"] !== undefined) {
          body["enableAccessLogging"] = args["enableAccessLogging"];
        }
        if (args["enableDatapointUpsertLogging"] !== undefined) {
          body["enableDatapointUpsertLogging"] =
            args["enableDatapointUpsertLogging"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["index"] !== undefined) body["index"] = args["index"];
        if (args["indexSyncTime"] !== undefined) {
          body["indexSyncTime"] = args["indexSyncTime"];
        }
        if (args["privateEndpoints"] !== undefined) {
          body["privateEndpoints"] = args["privateEndpoints"];
        }
        if (args["pscAutomationConfigs"] !== undefined) {
          body["pscAutomationConfigs"] = args["pscAutomationConfigs"];
        }
        if (args["reservedIpRanges"] !== undefined) {
          body["reservedIpRanges"] = args["reservedIpRanges"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.indexEndpoints.mutateDeployedIndex",
            "path": "v1/{+indexEndpoint}:mutateDeployedIndex",
            "httpMethod": "POST",
            "parameterOrder": ["indexEndpoint"],
            "parameters": {
              "indexEndpoint": { "location": "path", "required": true },
            },
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
    read_index_datapoints: {
      description: "read index datapoints",
      arguments: z.object({
        deployedIndexId: z.any().optional(),
        ids: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["indexEndpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployedIndexId"] !== undefined) {
          body["deployedIndexId"] = args["deployedIndexId"];
        }
        if (args["ids"] !== undefined) body["ids"] = args["ids"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.indexEndpoints.readIndexDatapoints",
            "path": "v1/{+indexEndpoint}:readIndexDatapoints",
            "httpMethod": "POST",
            "parameterOrder": ["indexEndpoint"],
            "parameters": {
              "indexEndpoint": { "location": "path", "required": true },
            },
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
    undeploy_index: {
      description: "undeploy index",
      arguments: z.object({
        deployedIndexId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["indexEndpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployedIndexId"] !== undefined) {
          body["deployedIndexId"] = args["deployedIndexId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.indexEndpoints.undeployIndex",
            "path": "v1/{+indexEndpoint}:undeployIndex",
            "httpMethod": "POST",
            "parameterOrder": ["indexEndpoint"],
            "parameters": {
              "indexEndpoint": { "location": "path", "required": true },
            },
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
