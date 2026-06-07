// Auto-generated extension model for @swamp/gcp/oracledatabase/cloudvmclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud CloudVmClusters.
 *
 * Details of the Cloud VM Cluster resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/CloudVmCluster/
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
  return `${parent}/cloudVmClusters/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.cloudVmClusters.get",
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
  "id": "oracledatabase.projects.locations.cloudVmClusters.create",
  "path": "v1/{+parent}/cloudVmClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cloudVmClusterId": {
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

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.cloudVmClusters.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  "id": "oracledatabase.projects.locations.cloudVmClusters.list",
  "path": "v1/{+parent}/cloudVmClusters",
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
  backupOdbSubnet: z.string().describe(
    "Optional. The name of the backup OdbSubnet associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  backupSubnetCidr: z.string().describe(
    "Optional. CIDR range of the backup subnet.",
  ).optional(),
  cidr: z.string().describe(
    "Optional. Network settings. CIDR to use for cluster IP allocation.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User friendly name for this resource.",
  ).optional(),
  exadataInfrastructure: z.string().describe(
    "Required. The name of the Exadata Infrastructure resource on which VM cluster resource is created, in the following format: projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure}",
  ).optional(),
  identityConnector: z.object({
    connectionState: z.enum([
      "CONNECTION_STATE_UNSPECIFIED",
      "CONNECTED",
      "PARTIALLY_CONNECTED",
      "DISCONNECTED",
      "UNKNOWN",
    ]).describe("Output only. The connection state of the identity connector.")
      .optional(),
    serviceAgentEmail: z.string().describe(
      "Output only. A google managed service account on which customers can grant roles to access resources in the customer project. Example: `p176944527254-55-75119d87fd8f@gcp-sa-oci.iam.gserviceaccount.com`",
    ).optional(),
  }).describe(
    "The identity connector details which will allow OCI to securely access the resources in the customer project.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels or tags associated with the VM Cluster.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the VM Cluster resource with the format: projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster}",
  ).optional(),
  network: z.string().describe(
    "Optional. The name of the VPC network. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the odb_subnet and backup_odb_subnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. The name of the OdbSubnet associated with the VM Cluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    clusterName: z.string().describe("Optional. OCI Cluster name.").optional(),
    compartmentId: z.string().describe(
      "Output only. Compartment ID of cluster.",
    ).optional(),
    computeModel: z.enum([
      "COMPUTE_MODEL_UNSPECIFIED",
      "COMPUTE_MODEL_ECPU",
      "COMPUTE_MODEL_OCPU",
    ]).describe("Output only. The compute model of the VM Cluster.").optional(),
    cpuCoreCount: z.number().int().describe(
      "Required. Number of enabled CPU cores.",
    ).optional(),
    dataStorageSizeTb: z.number().describe(
      "Optional. The data disk group size to be allocated in TBs.",
    ).optional(),
    dbNodeStorageSizeGb: z.number().int().describe(
      "Optional. Local storage per VM.",
    ).optional(),
    dbServerOcids: z.array(z.string()).describe(
      "Optional. OCID of database servers.",
    ).optional(),
    diagnosticsDataCollectionOptions: z.object({
      diagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether diagnostic collection is enabled for the VM cluster",
      ).optional(),
      healthMonitoringEnabled: z.boolean().describe(
        "Optional. Indicates whether health monitoring is enabled for the VM cluster",
      ).optional(),
      incidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether incident logs and trace collection are enabled for the VM cluster",
      ).optional(),
    }).describe("Data collection options for diagnostics.").optional(),
    diskRedundancy: z.enum(["DISK_REDUNDANCY_UNSPECIFIED", "HIGH", "NORMAL"])
      .describe("Optional. The type of redundancy.").optional(),
    dnsListenerIp: z.string().describe("Output only. DNS listener IP.")
      .optional(),
    domain: z.string().describe(
      "Output only. Parent DNS domain where SCAN DNS and hosts names are qualified. ex: ocispdelegated.ocisp10jvnet.oraclevcn.com",
    ).optional(),
    giVersion: z.string().describe("Optional. Grid Infrastructure Version.")
      .optional(),
    hostname: z.string().describe(
      'Output only. host name without domain. format: "-" with some suffix. ex: sp2-yi0xq where "sp2" is the hostname_prefix.',
    ).optional(),
    hostnamePrefix: z.string().describe(
      "Optional. Prefix for VM cluster host names.",
    ).optional(),
    licenseType: z.enum([
      "LICENSE_TYPE_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Required. License type of VM Cluster.").optional(),
    localBackupEnabled: z.boolean().describe("Optional. Use local backup.")
      .optional(),
    memorySizeGb: z.number().int().describe(
      "Optional. Memory allocated in GBs.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "Optional. Number of database servers.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. Oracle Cloud Infrastructure ID of VM Cluster.",
    ).optional(),
    ocpuCount: z.number().describe(
      "Optional. OCPU count per VM. Minimum is 0.1.",
    ).optional(),
    scanDns: z.string().describe(
      "Output only. SCAN DNS name. ex: sp2-yi0xq-scan.ocispdelegated.ocisp10jvnet.oraclevcn.com",
    ).optional(),
    scanDnsRecordId: z.string().describe(
      "Output only. OCID of scan DNS record.",
    ).optional(),
    scanIpIds: z.array(z.string()).describe("Output only. OCIDs of scan IPs.")
      .optional(),
    scanListenerPortTcp: z.number().int().describe(
      "Optional. SCAN listener port - TCP",
    ).optional(),
    scanListenerPortTcpSsl: z.number().int().describe(
      "Optional. SCAN listener port - TLS",
    ).optional(),
    shape: z.string().describe("Output only. Shape of VM Cluster.").optional(),
    sparseDiskgroupEnabled: z.boolean().describe(
      "Optional. Use exadata sparse snapshots.",
    ).optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Optional. SSH public keys to be stored with cluster.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe("Output only. State of the cluster.").optional(),
    storageSizeGb: z.number().int().describe(
      "Output only. The storage allocation for the disk group, in gigabytes (GB).",
    ).optional(),
    systemVersion: z.string().describe(
      "Optional. Operating system version of the image.",
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
  }).describe(
    "Various properties and settings associated with Exadata VM cluster.",
  ).optional(),
  cloudVmClusterId: z.string().describe(
    "Required. The ID of the VM Cluster to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupOdbSubnet: z.string().optional(),
  backupSubnetCidr: z.string().optional(),
  cidr: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  exadataInfrastructure: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  identityConnector: z.object({
    connectionState: z.string(),
    serviceAgentEmail: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  properties: z.object({
    clusterName: z.string(),
    compartmentId: z.string(),
    computeModel: z.string(),
    cpuCoreCount: z.number(),
    dataStorageSizeTb: z.number(),
    dbNodeStorageSizeGb: z.number(),
    dbServerOcids: z.array(z.string()),
    diagnosticsDataCollectionOptions: z.object({
      diagnosticsEventsEnabled: z.boolean(),
      healthMonitoringEnabled: z.boolean(),
      incidentLogsEnabled: z.boolean(),
    }),
    diskRedundancy: z.string(),
    dnsListenerIp: z.string(),
    domain: z.string(),
    giVersion: z.string(),
    hostname: z.string(),
    hostnamePrefix: z.string(),
    licenseType: z.string(),
    localBackupEnabled: z.boolean(),
    memorySizeGb: z.number(),
    nodeCount: z.number(),
    ociUrl: z.string(),
    ocid: z.string(),
    ocpuCount: z.number(),
    scanDns: z.string(),
    scanDnsRecordId: z.string(),
    scanIpIds: z.array(z.string()),
    scanListenerPortTcp: z.number(),
    scanListenerPortTcpSsl: z.number(),
    shape: z.string(),
    sparseDiskgroupEnabled: z.boolean(),
    sshPublicKeys: z.array(z.string()),
    state: z.string(),
    storageSizeGb: z.number(),
    systemVersion: z.string(),
    timeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  backupOdbSubnet: z.string().describe(
    "Optional. The name of the backup OdbSubnet associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  backupSubnetCidr: z.string().describe(
    "Optional. CIDR range of the backup subnet.",
  ).optional(),
  cidr: z.string().describe(
    "Optional. Network settings. CIDR to use for cluster IP allocation.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User friendly name for this resource.",
  ).optional(),
  exadataInfrastructure: z.string().describe(
    "Required. The name of the Exadata Infrastructure resource on which VM cluster resource is created, in the following format: projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure}",
  ).optional(),
  identityConnector: z.object({
    connectionState: z.enum([
      "CONNECTION_STATE_UNSPECIFIED",
      "CONNECTED",
      "PARTIALLY_CONNECTED",
      "DISCONNECTED",
      "UNKNOWN",
    ]).describe("Output only. The connection state of the identity connector.")
      .optional(),
    serviceAgentEmail: z.string().describe(
      "Output only. A google managed service account on which customers can grant roles to access resources in the customer project. Example: `p176944527254-55-75119d87fd8f@gcp-sa-oci.iam.gserviceaccount.com`",
    ).optional(),
  }).describe(
    "The identity connector details which will allow OCI to securely access the resources in the customer project.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels or tags associated with the VM Cluster.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the VM Cluster resource with the format: projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster}",
  ).optional(),
  network: z.string().describe(
    "Optional. The name of the VPC network. Format: projects/{project}/global/networks/{network}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the odb_subnet and backup_odb_subnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. The name of the OdbSubnet associated with the VM Cluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    clusterName: z.string().describe("Optional. OCI Cluster name.").optional(),
    compartmentId: z.string().describe(
      "Output only. Compartment ID of cluster.",
    ).optional(),
    computeModel: z.enum([
      "COMPUTE_MODEL_UNSPECIFIED",
      "COMPUTE_MODEL_ECPU",
      "COMPUTE_MODEL_OCPU",
    ]).describe("Output only. The compute model of the VM Cluster.").optional(),
    cpuCoreCount: z.number().int().describe(
      "Required. Number of enabled CPU cores.",
    ).optional(),
    dataStorageSizeTb: z.number().describe(
      "Optional. The data disk group size to be allocated in TBs.",
    ).optional(),
    dbNodeStorageSizeGb: z.number().int().describe(
      "Optional. Local storage per VM.",
    ).optional(),
    dbServerOcids: z.array(z.string()).describe(
      "Optional. OCID of database servers.",
    ).optional(),
    diagnosticsDataCollectionOptions: z.object({
      diagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether diagnostic collection is enabled for the VM cluster",
      ).optional(),
      healthMonitoringEnabled: z.boolean().describe(
        "Optional. Indicates whether health monitoring is enabled for the VM cluster",
      ).optional(),
      incidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether incident logs and trace collection are enabled for the VM cluster",
      ).optional(),
    }).describe("Data collection options for diagnostics.").optional(),
    diskRedundancy: z.enum(["DISK_REDUNDANCY_UNSPECIFIED", "HIGH", "NORMAL"])
      .describe("Optional. The type of redundancy.").optional(),
    dnsListenerIp: z.string().describe("Output only. DNS listener IP.")
      .optional(),
    domain: z.string().describe(
      "Output only. Parent DNS domain where SCAN DNS and hosts names are qualified. ex: ocispdelegated.ocisp10jvnet.oraclevcn.com",
    ).optional(),
    giVersion: z.string().describe("Optional. Grid Infrastructure Version.")
      .optional(),
    hostname: z.string().describe(
      'Output only. host name without domain. format: "-" with some suffix. ex: sp2-yi0xq where "sp2" is the hostname_prefix.',
    ).optional(),
    hostnamePrefix: z.string().describe(
      "Optional. Prefix for VM cluster host names.",
    ).optional(),
    licenseType: z.enum([
      "LICENSE_TYPE_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Required. License type of VM Cluster.").optional(),
    localBackupEnabled: z.boolean().describe("Optional. Use local backup.")
      .optional(),
    memorySizeGb: z.number().int().describe(
      "Optional. Memory allocated in GBs.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "Optional. Number of database servers.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. Oracle Cloud Infrastructure ID of VM Cluster.",
    ).optional(),
    ocpuCount: z.number().describe(
      "Optional. OCPU count per VM. Minimum is 0.1.",
    ).optional(),
    scanDns: z.string().describe(
      "Output only. SCAN DNS name. ex: sp2-yi0xq-scan.ocispdelegated.ocisp10jvnet.oraclevcn.com",
    ).optional(),
    scanDnsRecordId: z.string().describe(
      "Output only. OCID of scan DNS record.",
    ).optional(),
    scanIpIds: z.array(z.string()).describe("Output only. OCIDs of scan IPs.")
      .optional(),
    scanListenerPortTcp: z.number().int().describe(
      "Optional. SCAN listener port - TCP",
    ).optional(),
    scanListenerPortTcpSsl: z.number().int().describe(
      "Optional. SCAN listener port - TLS",
    ).optional(),
    shape: z.string().describe("Output only. Shape of VM Cluster.").optional(),
    sparseDiskgroupEnabled: z.boolean().describe(
      "Optional. Use exadata sparse snapshots.",
    ).optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Optional. SSH public keys to be stored with cluster.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MAINTENANCE_IN_PROGRESS",
    ]).describe("Output only. State of the cluster.").optional(),
    storageSizeGb: z.number().int().describe(
      "Output only. The storage allocation for the disk group, in gigabytes (GB).",
    ).optional(),
    systemVersion: z.string().describe(
      "Optional. Operating system version of the image.",
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
  }).describe(
    "Various properties and settings associated with Exadata VM cluster.",
  ).optional(),
  cloudVmClusterId: z.string().describe(
    "Required. The ID of the VM Cluster to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud CloudVmClusters. Registered at `@swamp/gcp/oracledatabase/cloudvmclusters`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/cloudvmclusters",
  version: "2026.06.07.1",
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
      toVersion: "2026.05.27.1",
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
        "Details of the Cloud VM Cluster resource. https://docs.oracle.com/en-us/iaas/...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a cloudVmClusters",
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
        if (g["backupOdbSubnet"] !== undefined) {
          body["backupOdbSubnet"] = g["backupOdbSubnet"];
        }
        if (g["backupSubnetCidr"] !== undefined) {
          body["backupSubnetCidr"] = g["backupSubnetCidr"];
        }
        if (g["cidr"] !== undefined) body["cidr"] = g["cidr"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exadataInfrastructure"] !== undefined) {
          body["exadataInfrastructure"] = g["exadataInfrastructure"];
        }
        if (g["identityConnector"] !== undefined) {
          body["identityConnector"] = g["identityConnector"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["cloudVmClusterId"] !== undefined) {
          body["cloudVmClusterId"] = g["cloudVmClusterId"];
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
      description: "Get a cloudVmClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the cloudVmClusters"),
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
    delete: {
      description: "Delete the cloudVmClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the cloudVmClusters"),
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
      description: "Sync cloudVmClusters state from GCP",
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
      description: "List cloudVmClusters resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. An expression for filtering the results of the request.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The number of VM clusters to return. If unspecified, at most 50 VM clusters will be returned. The maximum value is 1,000.",
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
          "cloudVmClusters",
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
