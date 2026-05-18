// Auto-generated extension model for @swamp/gcp/oracledatabase/exadbvmclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud ExadbVmClusters.
 *
 * ExadbVmCluster represents a cluster of VMs that are used to run Exadata workloads. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/ExadbVmCluster/
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
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/exadbVmClusters/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.exadbVmClusters.get",
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
  "id": "oracledatabase.projects.locations.exadbVmClusters.create",
  "path": "v1/{+parent}/exadbVmClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "exadbVmClusterId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "oracledatabase.projects.locations.exadbVmClusters.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.exadbVmClusters.delete",
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

const GlobalArgsSchema = z.object({
  backupOdbSubnet: z.string().describe(
    "Required. Immutable. The name of the backup OdbSubnet associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  displayName: z.string().describe(
    "Required. Immutable. The display name for the ExadbVmCluster. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the ExadbVmCluster.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the ExadbVmCluster resource in the following format: projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. Immutable. The name of the OdbNetwork associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. Immutable. The name of the OdbSubnet associated with the ExadbVmCluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    additionalEcpuCountPerNode: z.number().int().describe(
      "Optional. Immutable. The number of additional ECPUs per node for an Exadata VM cluster on exascale infrastructure.",
    ).optional(),
    clusterName: z.string().describe(
      "Optional. Immutable. The cluster name for Exascale vm cluster. The cluster name must begin with an alphabetic character and may contain hyphens(-) but can not contain underscores(_). It should be not more than 11 characters and is not case sensitive. OCI Cluster name.",
    ).optional(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable data collection for diagnostics.",
      ).optional(),
      isHealthMonitoringEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable health monitoring.",
      ).optional(),
      isIncidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable incident logs and trace collection.",
      ).optional(),
    }).describe(
      "Data collection options for diagnostics. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/DataCollectionOptions",
    ).optional(),
    enabledEcpuCountPerNode: z.number().int().describe(
      "Required. Immutable. The number of ECPUs enabled per node for an exadata vm cluster on exascale infrastructure.",
    ).optional(),
    exascaleDbStorageVault: z.string().describe(
      "Required. Immutable. The name of ExascaleDbStorageVault associated with the ExadbVmCluster. It can refer to an existing ExascaleDbStorageVault. Or a new one can be created during the ExadbVmCluster creation (requires storage_vault_properties to be set). Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}",
    ).optional(),
    giVersion: z.string().describe(
      "Output only. The Oracle Grid Infrastructure (GI) software version.",
    ).optional(),
    gridImageId: z.string().describe(
      "Required. Immutable. Grid Infrastructure Version.",
    ).optional(),
    hostname: z.string().describe(
      "Output only. The hostname of the ExadbVmCluster.",
    ).optional(),
    hostnamePrefix: z.string().describe(
      "Required. Immutable. Prefix for VM cluster host names.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Optional. Immutable. The license type of the ExadbVmCluster.")
      .optional(),
    lifecycleState: z.enum([
      "EXADB_VM_CLUSTER_LIFECYCLE_STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe("Output only. State of the cluster.").optional(),
    memorySizeGb: z.number().int().describe(
      "Output only. Memory per VM (GB) (Read-only): Shows the amount of memory allocated to each VM. Memory is calculated based on 2.75 GB per Total ECPUs.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "Required. The number of nodes/VMs in the ExadbVmCluster.",
    ).optional(),
    ociUri: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    scanListenerPortTcp: z.number().int().describe(
      "Optional. Immutable. SCAN listener port - TCP",
    ).optional(),
    shapeAttribute: z.enum([
      "SHAPE_ATTRIBUTE_UNSPECIFIED",
      "SMART_STORAGE",
      "BLOCK_STORAGE",
    ]).describe(
      "Required. Immutable. The shape attribute of the VM cluster. The type of Exascale storage used for Exadata VM cluster. The default is SMART_STORAGE which supports Oracle Database 23ai and later",
    ).optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Required. Immutable. The SSH public keys for the ExadbVmCluster.",
    ).optional(),
    timeZone: z.object({
      id: z.string().describe(
        'IANA Time Zone Database time zone. For example "America/New_York".',
      ).optional(),
      version: z.string().describe(
        'Optional. IANA Time Zone Database version number. For example "2019a".',
      ).optional(),
    }).describe(
      "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
    ).optional(),
    vmFileSystemStorage: z.object({
      sizeInGbsPerNode: z.number().int().describe(
        "Required. The storage allocation for the exadbvmcluster per node, in gigabytes (GB). This field is used to calculate the total storage allocation for the exadbvmcluster.",
      ).optional(),
    }).describe(
      "The storage allocation for the exadbvmcluster, in gigabytes (GB).",
    ).optional(),
  }).describe("The properties of an ExadbVmCluster.").optional(),
  exadbVmClusterId: z.string().describe(
    "Required. The ID of the ExadbVmCluster to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupOdbSubnet: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  properties: z.object({
    additionalEcpuCountPerNode: z.number(),
    clusterName: z.string(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean(),
      isHealthMonitoringEnabled: z.boolean(),
      isIncidentLogsEnabled: z.boolean(),
    }),
    enabledEcpuCountPerNode: z.number(),
    exascaleDbStorageVault: z.string(),
    giVersion: z.string(),
    gridImageId: z.string(),
    hostname: z.string(),
    hostnamePrefix: z.string(),
    licenseModel: z.string(),
    lifecycleState: z.string(),
    memorySizeGb: z.number(),
    nodeCount: z.number(),
    ociUri: z.string(),
    scanListenerPortTcp: z.number(),
    shapeAttribute: z.string(),
    sshPublicKeys: z.array(z.string()),
    timeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
    vmFileSystemStorage: z.object({
      sizeInGbsPerNode: z.number(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backupOdbSubnet: z.string().describe(
    "Required. Immutable. The name of the backup OdbSubnet associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  displayName: z.string().describe(
    "Required. Immutable. The display name for the ExadbVmCluster. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the ExadbVmCluster.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the ExadbVmCluster resource in the following format: projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. Immutable. The name of the OdbNetwork associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. Immutable. The name of the OdbSubnet associated with the ExadbVmCluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    additionalEcpuCountPerNode: z.number().int().describe(
      "Optional. Immutable. The number of additional ECPUs per node for an Exadata VM cluster on exascale infrastructure.",
    ).optional(),
    clusterName: z.string().describe(
      "Optional. Immutable. The cluster name for Exascale vm cluster. The cluster name must begin with an alphabetic character and may contain hyphens(-) but can not contain underscores(_). It should be not more than 11 characters and is not case sensitive. OCI Cluster name.",
    ).optional(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable data collection for diagnostics.",
      ).optional(),
      isHealthMonitoringEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable health monitoring.",
      ).optional(),
      isIncidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable incident logs and trace collection.",
      ).optional(),
    }).describe(
      "Data collection options for diagnostics. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/DataCollectionOptions",
    ).optional(),
    enabledEcpuCountPerNode: z.number().int().describe(
      "Required. Immutable. The number of ECPUs enabled per node for an exadata vm cluster on exascale infrastructure.",
    ).optional(),
    exascaleDbStorageVault: z.string().describe(
      "Required. Immutable. The name of ExascaleDbStorageVault associated with the ExadbVmCluster. It can refer to an existing ExascaleDbStorageVault. Or a new one can be created during the ExadbVmCluster creation (requires storage_vault_properties to be set). Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}",
    ).optional(),
    giVersion: z.string().describe(
      "Output only. The Oracle Grid Infrastructure (GI) software version.",
    ).optional(),
    gridImageId: z.string().describe(
      "Required. Immutable. Grid Infrastructure Version.",
    ).optional(),
    hostname: z.string().describe(
      "Output only. The hostname of the ExadbVmCluster.",
    ).optional(),
    hostnamePrefix: z.string().describe(
      "Required. Immutable. Prefix for VM cluster host names.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Optional. Immutable. The license type of the ExadbVmCluster.")
      .optional(),
    lifecycleState: z.enum([
      "EXADB_VM_CLUSTER_LIFECYCLE_STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe("Output only. State of the cluster.").optional(),
    memorySizeGb: z.number().int().describe(
      "Output only. Memory per VM (GB) (Read-only): Shows the amount of memory allocated to each VM. Memory is calculated based on 2.75 GB per Total ECPUs.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "Required. The number of nodes/VMs in the ExadbVmCluster.",
    ).optional(),
    ociUri: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    scanListenerPortTcp: z.number().int().describe(
      "Optional. Immutable. SCAN listener port - TCP",
    ).optional(),
    shapeAttribute: z.enum([
      "SHAPE_ATTRIBUTE_UNSPECIFIED",
      "SMART_STORAGE",
      "BLOCK_STORAGE",
    ]).describe(
      "Required. Immutable. The shape attribute of the VM cluster. The type of Exascale storage used for Exadata VM cluster. The default is SMART_STORAGE which supports Oracle Database 23ai and later",
    ).optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Required. Immutable. The SSH public keys for the ExadbVmCluster.",
    ).optional(),
    timeZone: z.object({
      id: z.string().describe(
        'IANA Time Zone Database time zone. For example "America/New_York".',
      ).optional(),
      version: z.string().describe(
        'Optional. IANA Time Zone Database version number. For example "2019a".',
      ).optional(),
    }).describe(
      "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
    ).optional(),
    vmFileSystemStorage: z.object({
      sizeInGbsPerNode: z.number().int().describe(
        "Required. The storage allocation for the exadbvmcluster per node, in gigabytes (GB). This field is used to calculate the total storage allocation for the exadbvmcluster.",
      ).optional(),
    }).describe(
      "The storage allocation for the exadbvmcluster, in gigabytes (GB).",
    ).optional(),
  }).describe("The properties of an ExadbVmCluster.").optional(),
  exadbVmClusterId: z.string().describe(
    "Required. The ID of the ExadbVmCluster to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud ExadbVmClusters. Registered at `@swamp/gcp/oracledatabase/exadbvmclusters`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/exadbvmclusters",
  version: "2026.05.18.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "ExadbVmCluster represents a cluster of VMs that are used to run Exadata workl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a exadbVmClusters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["backupOdbSubnet"] !== undefined) {
          body["backupOdbSubnet"] = g["backupOdbSubnet"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["exadbVmClusterId"] !== undefined) {
          body["exadbVmClusterId"] = g["exadbVmClusterId"];
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
      description: "Get a exadbVmClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the exadbVmClusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update exadbVmClusters attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
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
      description: "Delete the exadbVmClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the exadbVmClusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync exadbVmClusters state from GCP",
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
