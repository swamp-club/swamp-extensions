// Auto-generated extension model for @swamp/gcp/vmwareengine/privateclouds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VMware Engine PrivateClouds.
 *
 * Represents a private cloud resource. Private clouds of type `STANDARD` and `TIME_LIMITED` are zonal resources, `STRETCHED` private clouds are regional.
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
  return `${parent}/privateClouds/${shortName}`;
}

const BASE_URL = "https://vmwareengine.googleapis.com/";

const GET_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.get",
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
  "id": "vmwareengine.projects.locations.privateClouds.create",
  "path": "v1/{+parent}/privateClouds",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "privateCloudId": {
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

const PATCH_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "delayHours": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
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
  "id": "vmwareengine.projects.locations.privateClouds.list",
  "path": "v1/{+parent}/privateClouds",
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
  description: z.string().describe(
    "User-provided description for this private cloud.",
  ).optional(),
  hcx: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING", "ACTIVATING"])
      .describe("Output only. The state of the appliance.").optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a HCX Cloud Manager appliance.").optional(),
  managementCluster: z.object({
    clusterId: z.string().describe(
      "Required. The user-provided identifier of the new `Cluster`. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
    ).optional(),
    nodeTypeConfigs: z.record(
      z.string(),
      z.object({
        customCoreCount: z.number().int().describe(
          "Optional. Customized number of cores available to each node of the type. This number must always be one of `nodeType.availableCustomCoreCounts`. If zero is provided max value from `nodeType.availableCustomCoreCounts` will be used.",
        ).optional(),
        nodeCount: z.number().int().describe(
          "Required. The number of nodes of this type in the cluster",
        ).optional(),
      }),
    ).describe(
      "Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`).",
    ).optional(),
    stretchedClusterConfig: z.object({
      preferredLocation: z.string().describe(
        "Required. Zone that will remain operational when connection between the two zones is lost. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-a` where `{project}` can either be a project number or a project ID.",
      ).optional(),
      secondaryLocation: z.string().describe(
        "Required. Additional zone for a higher level of availability and load balancing. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-b` where `{project}` can either be a project number or a project ID.",
      ).optional(),
    }).describe("Configuration of a stretched cluster.").optional(),
  }).describe("Management cluster configuration.").optional(),
  networkConfig: z.object({
    dnsServerIp: z.string().describe(
      "Output only. DNS Server IP of the Private Cloud. All DNS queries can be forwarded to this address for name resolution of Private Cloud's management entities like vCenter, NSX-T Manager and ESXi hosts.",
    ).optional(),
    managementCidr: z.string().describe(
      "Required. Management CIDR used by VMware management appliances.",
    ).optional(),
    managementIpAddressLayoutVersion: z.number().int().describe(
      "Output only. The IP address layout version of the management IP address range. Possible versions include: * `managementIpAddressLayoutVersion=1`: Indicates the legacy IP address layout used by some existing private clouds. This is no longer supported for new private clouds as it does not support all features. * `managementIpAddressLayoutVersion=2`: Indicates the latest IP address layout used by all newly created private clouds. This version supports all current features.",
    ).optional(),
    vmwareEngineNetwork: z.string().describe(
      "Optional. The relative resource name of the VMware Engine network attached to the private cloud. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID.",
    ).optional(),
    vmwareEngineNetworkCanonical: z.string().describe(
      "Output only. The canonical name of the VMware Engine network in the form: `projects/{project_number}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}`",
    ).optional(),
  }).describe(
    "Network configuration in the consumer project with which the peering has to be done.",
  ).optional(),
  nsx: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING"]).describe(
      "Output only. The state of the appliance.",
    ).optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a NSX Manager appliance.").optional(),
  type: z.enum(["STANDARD", "TIME_LIMITED", "STRETCHED"]).describe(
    "Optional. Type of the private cloud. Defaults to STANDARD.",
  ).optional(),
  vcenter: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING"]).describe(
      "Output only. The state of the appliance.",
    ).optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a vCenter Server management appliance.")
    .optional(),
  privateCloudId: z.string().describe(
    "Required. The user-provided identifier of the private cloud to be created. This identifier must be unique among each `PrivateCloud` within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  expireTime: z.string().optional(),
  hcx: z.object({
    fqdn: z.string(),
    internalIp: z.string(),
    state: z.string(),
    version: z.string(),
  }).optional(),
  managementCluster: z.object({
    clusterId: z.string(),
    nodeTypeConfigs: z.record(z.string(), z.unknown()),
    stretchedClusterConfig: z.object({
      preferredLocation: z.string(),
      secondaryLocation: z.string(),
    }),
  }).optional(),
  name: z.string(),
  networkConfig: z.object({
    dnsServerIp: z.string(),
    managementCidr: z.string(),
    managementIpAddressLayoutVersion: z.number(),
    vmwareEngineNetwork: z.string(),
    vmwareEngineNetworkCanonical: z.string(),
  }).optional(),
  nsx: z.object({
    fqdn: z.string(),
    internalIp: z.string(),
    state: z.string(),
    version: z.string(),
  }).optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  vcenter: z.object({
    fqdn: z.string(),
    internalIp: z.string(),
    state: z.string(),
    version: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "User-provided description for this private cloud.",
  ).optional(),
  hcx: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING", "ACTIVATING"])
      .describe("Output only. The state of the appliance.").optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a HCX Cloud Manager appliance.").optional(),
  managementCluster: z.object({
    clusterId: z.string().describe(
      "Required. The user-provided identifier of the new `Cluster`. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
    ).optional(),
    nodeTypeConfigs: z.record(
      z.string(),
      z.object({
        customCoreCount: z.number().int().describe(
          "Optional. Customized number of cores available to each node of the type. This number must always be one of `nodeType.availableCustomCoreCounts`. If zero is provided max value from `nodeType.availableCustomCoreCounts` will be used.",
        ).optional(),
        nodeCount: z.number().int().describe(
          "Required. The number of nodes of this type in the cluster",
        ).optional(),
      }),
    ).describe(
      "Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`).",
    ).optional(),
    stretchedClusterConfig: z.object({
      preferredLocation: z.string().describe(
        "Required. Zone that will remain operational when connection between the two zones is lost. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-a` where `{project}` can either be a project number or a project ID.",
      ).optional(),
      secondaryLocation: z.string().describe(
        "Required. Additional zone for a higher level of availability and load balancing. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-b` where `{project}` can either be a project number or a project ID.",
      ).optional(),
    }).describe("Configuration of a stretched cluster.").optional(),
  }).describe("Management cluster configuration.").optional(),
  networkConfig: z.object({
    dnsServerIp: z.string().describe(
      "Output only. DNS Server IP of the Private Cloud. All DNS queries can be forwarded to this address for name resolution of Private Cloud's management entities like vCenter, NSX-T Manager and ESXi hosts.",
    ).optional(),
    managementCidr: z.string().describe(
      "Required. Management CIDR used by VMware management appliances.",
    ).optional(),
    managementIpAddressLayoutVersion: z.number().int().describe(
      "Output only. The IP address layout version of the management IP address range. Possible versions include: * `managementIpAddressLayoutVersion=1`: Indicates the legacy IP address layout used by some existing private clouds. This is no longer supported for new private clouds as it does not support all features. * `managementIpAddressLayoutVersion=2`: Indicates the latest IP address layout used by all newly created private clouds. This version supports all current features.",
    ).optional(),
    vmwareEngineNetwork: z.string().describe(
      "Optional. The relative resource name of the VMware Engine network attached to the private cloud. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID.",
    ).optional(),
    vmwareEngineNetworkCanonical: z.string().describe(
      "Output only. The canonical name of the VMware Engine network in the form: `projects/{project_number}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}`",
    ).optional(),
  }).describe(
    "Network configuration in the consumer project with which the peering has to be done.",
  ).optional(),
  nsx: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING"]).describe(
      "Output only. The state of the appliance.",
    ).optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a NSX Manager appliance.").optional(),
  type: z.enum(["STANDARD", "TIME_LIMITED", "STRETCHED"]).describe(
    "Optional. Type of the private cloud. Defaults to STANDARD.",
  ).optional(),
  vcenter: z.object({
    fqdn: z.string().describe("Fully qualified domain name of the appliance.")
      .optional(),
    internalIp: z.string().describe("Internal IP address of the appliance.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "CREATING"]).describe(
      "Output only. The state of the appliance.",
    ).optional(),
    version: z.string().describe("Version of the appliance.").optional(),
  }).describe("Details about a vCenter Server management appliance.")
    .optional(),
  privateCloudId: z.string().describe(
    "Required. The user-provided identifier of the private cloud to be created. This identifier must be unique among each `PrivateCloud` within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud VMware Engine PrivateClouds. Registered at `@swamp/gcp/vmwareengine/privateclouds`. */
export const model = {
  type: "@swamp/gcp/vmwareengine/privateclouds",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a private cloud resource. Private clouds of type `STANDARD` and `T...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a privateClouds",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["hcx"] !== undefined) body["hcx"] = g["hcx"];
        if (g["managementCluster"] !== undefined) {
          body["managementCluster"] = g["managementCluster"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["nsx"] !== undefined) body["nsx"] = g["nsx"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
        if (g["privateCloudId"] !== undefined) {
          body["privateCloudId"] = g["privateCloudId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
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
      description: "Get a privateClouds",
      arguments: z.object({
        identifier: z.string().describe("The name of the privateClouds"),
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
      description: "Update privateClouds attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["hcx"] !== undefined) body["hcx"] = g["hcx"];
        if (g["managementCluster"] !== undefined) {
          body["managementCluster"] = g["managementCluster"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["nsx"] !== undefined) body["nsx"] = g["nsx"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
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
      description: "Delete the privateClouds",
      arguments: z.object({
        identifier: z.string().describe("The name of the privateClouds"),
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
      description: "Sync privateClouds state from GCP",
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
      description: "List privateClouds resources",
      arguments: z.object({
        filter: z.string().describe(
          'A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of private clouds, you can exclude the ones named `example-pc` by specifying `name != "example-pc"`. You can also filter nested fields. For example, you could specify `networkConfig.managementCidr = "192.168.0.0/24"` to include private clouds only if they have a matching address in their network configuration. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-pc") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "private-cloud-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "private-cloud-2") ```',
        ).optional(),
        orderBy: z.string().describe(
          'Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported.',
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of private clouds to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "privateClouds",
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
    get_dns_forwarding: {
      description: "get dns forwarding",
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
              "vmwareengine.projects.locations.privateClouds.getDnsForwarding",
            "path": "v1/{+name}",
            "httpMethod": "GET",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "vmwareengine.projects.locations.privateClouds.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
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
    migrate_management_vms: {
      description: "migrate management vms",
      arguments: z.object({
        clusterId: z.any().optional(),
        etag: z.any().optional(),
        requestId: z.any().optional(),
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
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.migrateManagementVms",
            "path": "v1/{+name}:migrateManagementVms",
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
    private_cloud_deletion_now: {
      description: "private cloud deletion now",
      arguments: z.object({
        etag: z.any().optional(),
        requestId: z.any().optional(),
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.privateCloudDeletionNow",
            "path": "v1/{+name}:privateCloudDeletionNow",
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
    reset_nsx_credentials: {
      description: "reset nsx credentials",
      arguments: z.object({
        requestId: z.any().optional(),
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
        params["privateCloud"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.resetNsxCredentials",
            "path": "v1/{+privateCloud}:resetNsxCredentials",
            "httpMethod": "POST",
            "parameterOrder": ["privateCloud"],
            "parameters": {
              "privateCloud": { "location": "path", "required": true },
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
    reset_vcenter_credentials: {
      description: "reset vcenter credentials",
      arguments: z.object({
        requestId: z.any().optional(),
        username: z.any().optional(),
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
        params["privateCloud"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["username"] !== undefined) body["username"] = args["username"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.resetVcenterCredentials",
            "path": "v1/{+privateCloud}:resetVcenterCredentials",
            "httpMethod": "POST",
            "parameterOrder": ["privateCloud"],
            "parameters": {
              "privateCloud": { "location": "path", "required": true },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "vmwareengine.projects.locations.privateClouds.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    show_nsx_credentials: {
      description: "show nsx credentials",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["privateCloud"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.showNsxCredentials",
            "path": "v1/{+privateCloud}:showNsxCredentials",
            "httpMethod": "GET",
            "parameterOrder": ["privateCloud"],
            "parameters": {
              "privateCloud": { "location": "path", "required": true },
            },
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
    show_vcenter_credentials: {
      description: "show vcenter credentials",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["privateCloud"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.showVcenterCredentials",
            "path": "v1/{+privateCloud}:showVcenterCredentials",
            "httpMethod": "GET",
            "parameterOrder": ["privateCloud"],
            "parameters": {
              "privateCloud": { "location": "path", "required": true },
              "username": { "location": "query" },
            },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    undelete: {
      description: "undelete",
      arguments: z.object({
        requestId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "vmwareengine.projects.locations.privateClouds.undelete",
            "path": "v1/{+name}:undelete",
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
    update_dns_forwarding: {
      description: "update dns forwarding",
      arguments: z.object({
        createTime: z.any().optional(),
        forwardingRules: z.any().optional(),
        name: z.any().optional(),
        updateTime: z.any().optional(),
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
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["forwardingRules"] !== undefined) {
          body["forwardingRules"] = args["forwardingRules"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.updateDnsForwarding",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "updateMask": { "location": "query" },
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
