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

// Auto-generated extension model for @swamp/gcp/tpu/nodes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud TPU Nodes.
 *
 * A TPU instance.
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
  return `${parent}/nodes/${shortName}`;
}

const BASE_URL = "https://tpu.googleapis.com/";

const GET_CONFIG = {
  "id": "tpu.projects.locations.nodes.get",
  "path": "v2/{+name}",
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
  "id": "tpu.projects.locations.nodes.create",
  "path": "v2/{+parent}/nodes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "nodeId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "tpu.projects.locations.nodes.patch",
  "path": "v2/{+name}",
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
  "id": "tpu.projects.locations.nodes.delete",
  "path": "v2/{+name}",
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
  "id": "tpu.projects.locations.nodes.list",
  "path": "v2/{+parent}/nodes",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  acceleratorConfig: z.object({
    topology: z.string().describe("Required. Topology of TPU in chips.")
      .optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "V2",
      "V3",
      "V4",
      "V5LITE_POD",
      "V5P",
      "V6E",
    ]).describe("Required. Type of TPU.").optional(),
  }).describe("The AccleratorConfig for the TPU Node.").optional(),
  acceleratorType: z.string().describe(
    "Optional. The type of hardware accelerators associated with this node.",
  ).optional(),
  bootDiskConfig: z.object({
    customerEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY/cryptoKeyVersions/1',
      ).optional(),
    }).describe("Optional. Customer encryption key for boot disk.").optional(),
  }).describe("Optional. Boot disk configuration.").optional(),
  cidrBlock: z.string().describe(
    "The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block.",
  ).optional(),
  dataDisks: z.array(z.object({
    mode: z.enum(["DISK_MODE_UNSPECIFIED", "READ_WRITE", "READ_ONLY"]).describe(
      "The mode in which to attach this disk. If not specified, the default is READ_WRITE mode. Only applicable to data_disks.",
    ).optional(),
    sourceDisk: z.string().describe(
      'Specifies the full path to an existing disk. For example: "projects/my-project/zones/us-central1-c/disks/my-disk".',
    ).optional(),
  })).describe("The additional data disks for the Node.").optional(),
  description: z.string().describe(
    "The user-supplied description of the TPU. Maximum of 512 characters.",
  ).optional(),
  health: z.enum([
    "HEALTH_UNSPECIFIED",
    "HEALTHY",
    "TIMEOUT",
    "UNHEALTHY_TENSORFLOW",
    "UNHEALTHY_MAINTENANCE",
  ]).describe("The health status of the TPU node.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script",
  ).optional(),
  networkConfig: z.object({
    canIpForward: z.boolean().describe(
      "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
    ).optional(),
    enableExternalIps: z.boolean().describe(
      "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
    ).optional(),
    network: z.string().describe(
      'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
    ).optional(),
    queueCount: z.number().int().describe(
      "Optional. Specifies networking queue count for TPU VM instance's network interface.",
    ).optional(),
    subnetwork: z.string().describe(
      'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
    ).optional(),
  }).describe(
    "Network configurations for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
  ).optional(),
  networkConfigs: z.array(z.object({
    canIpForward: z.boolean().describe(
      "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
    ).optional(),
    enableExternalIps: z.boolean().describe(
      "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
    ).optional(),
    network: z.string().describe(
      'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
    ).optional(),
    queueCount: z.number().int().describe(
      "Optional. Specifies networking queue count for TPU VM instance's network interface.",
    ).optional(),
    subnetwork: z.string().describe(
      'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
    ).optional(),
  })).describe(
    "Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
  ).optional(),
  runtimeVersion: z.string().describe(
    "Required. The runtime version running in the Node.",
  ).optional(),
  schedulingConfig: z.object({
    preemptible: z.boolean().describe(
      "Defines whether the node is preemptible.",
    ).optional(),
    reserved: z.boolean().describe(
      "Whether the node is created under a reservation.",
    ).optional(),
    spot: z.boolean().describe("Optional. Defines whether the node is Spot VM.")
      .optional(),
  }).describe("The scheduling options for this node.").optional(),
  serviceAccount: z.object({
    email: z.string().describe(
      "Email address of the service account. If empty, default Compute service account will be used.",
    ).optional(),
    scope: z.array(z.string()).describe(
      "The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed.",
    ).optional(),
  }).describe(
    "The Google Cloud Platform Service Account to be used by the TPU node VMs. If None is specified, the default compute service account will be used.",
  ).optional(),
  shieldedInstanceConfig: z.object({
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled.",
    ).optional(),
  }).describe("Shielded Instance options.").optional(),
  tags: z.array(z.string()).describe(
    "Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls.",
  ).optional(),
  nodeId: z.string().describe("The unqualified resource name.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  acceleratorConfig: z.object({
    topology: z.string(),
    type: z.string(),
  }).optional(),
  acceleratorType: z.string().optional(),
  apiVersion: z.string().optional(),
  bootDiskConfig: z.object({
    customerEncryptionKey: z.object({
      kmsKeyName: z.string(),
    }),
  }).optional(),
  cidrBlock: z.string().optional(),
  createTime: z.string().optional(),
  dataDisks: z.array(z.object({
    mode: z.string(),
    sourceDisk: z.string(),
  })).optional(),
  description: z.string().optional(),
  health: z.string().optional(),
  healthDescription: z.string().optional(),
  id: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  multisliceNode: z.boolean().optional(),
  name: z.string(),
  networkConfig: z.object({
    canIpForward: z.boolean(),
    enableExternalIps: z.boolean(),
    network: z.string(),
    queueCount: z.number(),
    subnetwork: z.string(),
  }).optional(),
  networkConfigs: z.array(z.object({
    canIpForward: z.boolean(),
    enableExternalIps: z.boolean(),
    network: z.string(),
    queueCount: z.number(),
    subnetwork: z.string(),
  })).optional(),
  networkEndpoints: z.array(z.object({
    accessConfig: z.object({
      externalIp: z.string(),
    }),
    ipAddress: z.string(),
    port: z.number(),
  })).optional(),
  protectionTier: z.string().optional(),
  queuedResource: z.string().optional(),
  runtimeVersion: z.string().optional(),
  schedulingConfig: z.object({
    preemptible: z.boolean(),
    reserved: z.boolean(),
    spot: z.boolean(),
  }).optional(),
  serviceAccount: z.object({
    email: z.string(),
    scope: z.array(z.string()),
  }).optional(),
  shieldedInstanceConfig: z.object({
    enableSecureBoot: z.boolean(),
  }).optional(),
  state: z.string().optional(),
  symptoms: z.array(z.object({
    createTime: z.string(),
    details: z.string(),
    symptomType: z.string(),
    workerId: z.string(),
  })).optional(),
  tags: z.array(z.string()).optional(),
  upcomingMaintenance: z.object({
    canReschedule: z.boolean(),
    latestWindowStartTime: z.string(),
    maintenanceStatus: z.string(),
    type: z.string(),
    windowEndTime: z.string(),
    windowStartTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  acceleratorConfig: z.object({
    topology: z.string().describe("Required. Topology of TPU in chips.")
      .optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "V2",
      "V3",
      "V4",
      "V5LITE_POD",
      "V5P",
      "V6E",
    ]).describe("Required. Type of TPU.").optional(),
  }).describe("The AccleratorConfig for the TPU Node.").optional(),
  acceleratorType: z.string().describe(
    "Optional. The type of hardware accelerators associated with this node.",
  ).optional(),
  bootDiskConfig: z.object({
    customerEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_REGION/cryptoKeys/KEY/cryptoKeyVersions/1',
      ).optional(),
    }).describe("Optional. Customer encryption key for boot disk.").optional(),
  }).describe("Optional. Boot disk configuration.").optional(),
  cidrBlock: z.string().describe(
    "The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block.",
  ).optional(),
  dataDisks: z.array(z.object({
    mode: z.enum(["DISK_MODE_UNSPECIFIED", "READ_WRITE", "READ_ONLY"]).describe(
      "The mode in which to attach this disk. If not specified, the default is READ_WRITE mode. Only applicable to data_disks.",
    ).optional(),
    sourceDisk: z.string().describe(
      'Specifies the full path to an existing disk. For example: "projects/my-project/zones/us-central1-c/disks/my-disk".',
    ).optional(),
  })).describe("The additional data disks for the Node.").optional(),
  description: z.string().describe(
    "The user-supplied description of the TPU. Maximum of 512 characters.",
  ).optional(),
  health: z.enum([
    "HEALTH_UNSPECIFIED",
    "HEALTHY",
    "TIMEOUT",
    "UNHEALTHY_TENSORFLOW",
    "UNHEALTHY_MAINTENANCE",
  ]).describe("The health status of the TPU node.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script",
  ).optional(),
  networkConfig: z.object({
    canIpForward: z.boolean().describe(
      "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
    ).optional(),
    enableExternalIps: z.boolean().describe(
      "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
    ).optional(),
    network: z.string().describe(
      'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
    ).optional(),
    queueCount: z.number().int().describe(
      "Optional. Specifies networking queue count for TPU VM instance's network interface.",
    ).optional(),
    subnetwork: z.string().describe(
      'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
    ).optional(),
  }).describe(
    "Network configurations for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
  ).optional(),
  networkConfigs: z.array(z.object({
    canIpForward: z.boolean().describe(
      "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
    ).optional(),
    enableExternalIps: z.boolean().describe(
      "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
    ).optional(),
    network: z.string().describe(
      'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
    ).optional(),
    queueCount: z.number().int().describe(
      "Optional. Specifies networking queue count for TPU VM instance's network interface.",
    ).optional(),
    subnetwork: z.string().describe(
      'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
    ).optional(),
  })).describe(
    "Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
  ).optional(),
  runtimeVersion: z.string().describe(
    "Required. The runtime version running in the Node.",
  ).optional(),
  schedulingConfig: z.object({
    preemptible: z.boolean().describe(
      "Defines whether the node is preemptible.",
    ).optional(),
    reserved: z.boolean().describe(
      "Whether the node is created under a reservation.",
    ).optional(),
    spot: z.boolean().describe("Optional. Defines whether the node is Spot VM.")
      .optional(),
  }).describe("The scheduling options for this node.").optional(),
  serviceAccount: z.object({
    email: z.string().describe(
      "Email address of the service account. If empty, default Compute service account will be used.",
    ).optional(),
    scope: z.array(z.string()).describe(
      "The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed.",
    ).optional(),
  }).describe(
    "The Google Cloud Platform Service Account to be used by the TPU node VMs. If None is specified, the default compute service account will be used.",
  ).optional(),
  shieldedInstanceConfig: z.object({
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled.",
    ).optional(),
  }).describe("Shielded Instance options.").optional(),
  tags: z.array(z.string()).describe(
    "Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls.",
  ).optional(),
  nodeId: z.string().describe("The unqualified resource name.").optional(),
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

/** Swamp extension model for Google Cloud TPU Nodes. Registered at `@swamp/gcp/tpu/nodes`. */
export const model = {
  type: "@swamp/gcp/tpu/nodes",
  version: "2026.10.04.1",
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
      toVersion: "2026.07.21.1",
      description: "Removed: upcomingMaintenance",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { upcomingMaintenance: _upcomingMaintenance, ...rest } = old;
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
      toVersion: "2026.10.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A TPU instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a nodes",
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
        if (g["acceleratorConfig"] !== undefined) {
          body["acceleratorConfig"] = g["acceleratorConfig"];
        }
        if (g["acceleratorType"] !== undefined) {
          body["acceleratorType"] = g["acceleratorType"];
        }
        if (g["bootDiskConfig"] !== undefined) {
          body["bootDiskConfig"] = g["bootDiskConfig"];
        }
        if (g["cidrBlock"] !== undefined) body["cidrBlock"] = g["cidrBlock"];
        if (g["dataDisks"] !== undefined) body["dataDisks"] = g["dataDisks"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["health"] !== undefined) body["health"] = g["health"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["networkConfigs"] !== undefined) {
          body["networkConfigs"] = g["networkConfigs"];
        }
        if (g["runtimeVersion"] !== undefined) {
          body["runtimeVersion"] = g["runtimeVersion"];
        }
        if (g["schedulingConfig"] !== undefined) {
          body["schedulingConfig"] = g["schedulingConfig"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["shieldedInstanceConfig"] !== undefined) {
          body["shieldedInstanceConfig"] = g["shieldedInstanceConfig"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["nodeId"] !== undefined) params["nodeId"] = String(g["nodeId"]);
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
              "readyValues": ["READY"],
              "failedValues": ["STOPPED", "TERMINATED"],
            }
            : undefined,
          undefined,
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
      description: "Get a nodes",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodes"),
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
      description: "Update nodes attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific nodes by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
        if (g["acceleratorConfig"] !== undefined) {
          body["acceleratorConfig"] = g["acceleratorConfig"];
        }
        if (g["acceleratorType"] !== undefined) {
          body["acceleratorType"] = g["acceleratorType"];
        }
        if (g["bootDiskConfig"] !== undefined) {
          body["bootDiskConfig"] = g["bootDiskConfig"];
        }
        if (g["cidrBlock"] !== undefined) body["cidrBlock"] = g["cidrBlock"];
        if (g["dataDisks"] !== undefined) body["dataDisks"] = g["dataDisks"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["health"] !== undefined) body["health"] = g["health"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["networkConfigs"] !== undefined) {
          body["networkConfigs"] = g["networkConfigs"];
        }
        if (g["runtimeVersion"] !== undefined) {
          body["runtimeVersion"] = g["runtimeVersion"];
        }
        if (g["schedulingConfig"] !== undefined) {
          body["schedulingConfig"] = g["schedulingConfig"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["shieldedInstanceConfig"] !== undefined) {
          body["shieldedInstanceConfig"] = g["shieldedInstanceConfig"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["STOPPED", "TERMINATED"],
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
      description: "Delete the nodes",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodes"),
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
      description: "Sync nodes state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific nodes by name (e.g. one discovered by list)",
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
      description: "List nodes resources",
      arguments: z.object({
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "nodes",
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
    get_guest_attributes: {
      description: "get guest attributes",
      arguments: z.object({
        queryPath: z.any().optional(),
        workerIds: z.any().optional(),
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
        if (args["queryPath"] !== undefined) {
          body["queryPath"] = args["queryPath"];
        }
        if (args["workerIds"] !== undefined) {
          body["workerIds"] = args["workerIds"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "tpu.projects.locations.nodes.getGuestAttributes",
            "path": "v2/{+name}:getGuestAttributes",
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
    start: {
      description: "start",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          baseUrl,
          {
            "id": "tpu.projects.locations.nodes.start",
            "path": "v2/{+name}:start",
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
        const result = await createResource(
          baseUrl,
          {
            "id": "tpu.projects.locations.nodes.stop",
            "path": "v2/{+name}:stop",
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
