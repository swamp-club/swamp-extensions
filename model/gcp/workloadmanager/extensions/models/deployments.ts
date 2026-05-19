// Auto-generated extension model for @swamp/gcp/workloadmanager/deployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workload Manager Deployments.
 *
 * The Deployment object represents user intent for deploying a specific type of workload.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/deployments/${shortName}`;
}

const BASE_URL = "https://workloadmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "workloadmanager.projects.locations.deployments.get",
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
  "id": "workloadmanager.projects.locations.deployments.create",
  "path": "v1/{+parent}/deployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "deploymentId": {
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
  "id": "workloadmanager.projects.locations.deployments.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe("Description of the Deployment").optional(),
  name: z.string().describe(
    "The name of deployment resource. The format will be 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'",
  ).optional(),
  sapSystemS4Config: z.object({
    allowStoppingForUpdate: z.boolean().optional(),
    ansibleRunnerServiceAccount: z.string().describe(
      "Ansible runner service account - let custoemrs bring their own SA for Ansible runner",
    ).optional(),
    app: z.object({
      appInstanceId: z.string().describe("Optional. instance id for app")
        .optional(),
      appServiceAccount: z.string().describe(
        "Application service account - let custoemrs bring their own SA for application",
      ).optional(),
      appVmNames: z.array(z.string()).describe("Optional. Customized vm names")
        .optional(),
      ascsImage: z.string().describe("Required. image for ascs server")
        .optional(),
      ascsInstanceId: z.string().describe("Optional. instance id for ascs")
        .optional(),
      ascsMachineType: z.string().describe("Required. ascs_machine_type")
        .optional(),
      ascsServiceAccount: z.string().describe(
        "ASCS service account - let custoemrs bring their own SA for ASCS",
      ).optional(),
      ascsVm: z.string().describe("Optional. ASCS vm name").optional(),
      ersInstanceId: z.string().describe("Optional. instance id for ers")
        .optional(),
      ersVm: z.string().describe("Optional. ERS vm name").optional(),
      image: z.string().describe(
        "Required. image for app server and ascs server",
      ).optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      sharedStorage: z.string().describe("Optional. Storage location")
        .optional(),
      sid: z.string().describe(
        "Required. The SAP SID is a three-digit server-specific unique identification code.",
      ).optional(),
      vmsMultiplier: z.number().int().describe("Required. vms_multiplier")
        .optional(),
    }).describe("Message for sap instant details").optional(),
    database: z.object({
      databaseServiceAccount: z.string().describe(
        "Database service account - let custoemrs bring their own SA for database",
      ).optional(),
      diskType: z.string().describe("Required. disk_type").optional(),
      image: z.string().describe("Required. image for database server")
        .optional(),
      instanceId: z.string().describe("Optional. instance id").optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      primaryDbVm: z.string().describe("Optional. primary db vm name")
        .optional(),
      secondaryDbVm: z.string().describe("Optional. secondary db vm name")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      sid: z.string().describe(
        "Required. The SID is a three-digit server-specific unique identification code.",
      ).optional(),
    }).describe("Message for sap instant details").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "DISTRIBUTED",
      "DISTRIBUTED_HA",
    ]).describe("Required. two model non-HA and HA supported").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. deployment environment").optional(),
    gcpProjectId: z.string().describe(
      "the project that infrastructure deployed, current only support the same project where the deployment resource exist.",
    ).optional(),
    location: z.object({
      createCommsFirewall: z.boolean().describe(
        "Optional. create firewall, if true, create firewall for the deployment. This field provides an option to not always create firewall for the deployment.",
      ).optional(),
      customTags: z.array(z.string()).describe("Optional. network tags")
        .optional(),
      deploymentDnsEnabled: z.boolean().describe(
        "Optional. when user skip DNS configuration from UI, deployment_dns_enabled=false otherwise deployment_dns_enabled=true",
      ).optional(),
      dnsZone: z.string().describe("Optional. dns zone name").optional(),
      dnsZoneNameSuffix: z.string().describe("Optional. dns_zone_name_suffix")
        .optional(),
      internetAccess: z.enum([
        "INTERNETACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).optional(),
      networkProject: z.string().describe("Optional. network project")
        .optional(),
      regionName: z.string().describe("Required. region_name").optional(),
      subnetName: z.string().describe("Required. subnet_name").optional(),
      vpcName: z.string().describe("Required. vpc_name").optional(),
      zone1Name: z.string().describe("Required. zone1_name").optional(),
      zone2Name: z.string().describe("Optional. zone2_name").optional(),
    }).describe("Message for sap instant details").optional(),
    mediaBucketName: z.string().describe("Required. media_bucket_name")
      .optional(),
    sapBootDiskImage: z.string().describe("Optional. sap_boot_disk_image")
      .optional(),
    scalingMethod: z.enum(["SCALE_METHOD_UNSPECIFIED", "SCALE_UP", "SCALE_OUT"])
      .describe("Required. support scale up and scale out").optional(),
    version: z.enum([
      "VERSION_UNSPECIFIED",
      "S4_HANA_2021",
      "S4_HANA_2022",
      "S4_HANA_2023",
    ]).describe("Required. sap hana version").optional(),
    vmPrefix: z.string().describe("vm_prefix").optional(),
  }).describe("Message for sap system workload").optional(),
  serviceAccount: z.string().describe(
    "User-specified Service Account (SA) credentials to be used for cloud build Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation",
  ).optional(),
  sqlServerWorkload: z.object({
    activeDirectory: z.object({
      dnsAddress: z.string().describe("Optional. DNS IP address").optional(),
      domain: z.string().describe(
        "Optional. human readable form of a domain such as “google.com”.",
      ).optional(),
      domainUsername: z.string().describe("Optional. domain username")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      type: z.enum([
        "ACTIVE_DIRECTORY_TYPE_UNSPECIFIED",
        "GCP_MANAGED",
        "SELF_MANAGED",
      ]).describe("Required. active directory type").optional(),
    }).describe("Active directory details").optional(),
    computeEngineServiceAccount: z.string().describe(
      "Compute engine service account - let customers bring their own SA for Compute engine",
    ).optional(),
    database: z.object({
      diskType: z.string().describe("Required. disk_type").optional(),
      floatingIpAddress: z.string().describe(
        "Optional. only useful for Linux High Availability setup",
      ).optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      secondarySoleTenantNode: z.string().describe(
        "Optional. the name of a secondary-sole-tenant node/node group",
      ).optional(),
      secondarySoleTenantNodeType: z.string().describe(
        "Optional. the type of a secondary-sole-tenant node/node group e.g. compute.googleapis.com/node-name",
      ).optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      smt: z.boolean().describe(
        "Required. whether simultaneous multithreading is enabled or not",
      ).optional(),
      soleTenantNode: z.string().describe(
        "Optional. the name of a primary sole-tenant node/node group",
      ).optional(),
      soleTenantNodeType: z.string().describe(
        "Optional. the type of a primary sole-tenant node/node group e.g. compute.googleapis.com/node-name",
      ).optional(),
      tempdbOnSsd: z.boolean().describe(
        "Required. whether to have TempDB on local SSD",
      ).optional(),
      tenancyModel: z.enum([
        "TENANCY_MODEL_UNSPECIFIED",
        "SHARED",
        "SOLE_TENANT",
      ]).describe("Required. SHARED or SOLE_TENANT").optional(),
    }).describe("Database details").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "HIGH_AVAILABILITY",
      "SINGLE_INSTANCE",
    ]).describe("Required. HIGH_AVAILABILITY or SINGLE_INSTANCE").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. deployment environment").optional(),
    fciType: z.enum(["FCI_TYPE_UNSPECIFIED", "SHARED_DISK", "S2D"]).describe(
      "Optional. SHARED_DISK or S2D",
    ).optional(),
    haType: z.enum(["HA_TYPE_UNSPECIFIED", "AOAG", "FCI"]).describe(
      "Optional. AOAG or FCI, it is only needed for High Availability deployment mode",
    ).optional(),
    isSqlPayg: z.boolean().describe("Required. SQL licensing type").optional(),
    location: z.object({
      dnsZone: z.string().describe(
        "Optional. create a new DNS Zone when the field is empty, Only show for `Using an existing DNS` List of existing DNS Zones tf variable name: existing_dns_zone_name",
      ).optional(),
      gcpProjectId: z.string().describe(
        "Required. the project that infrastructure deployed, currently only supports the same project where the deployment resource exists.",
      ).optional(),
      internetAccess: z.enum([
        "INTERNET_ACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).describe("Required. Internet Access").optional(),
      network: z.string().describe("Required. network name").optional(),
      primaryZone: z.string().describe("Required. primary zone").optional(),
      region: z.string().describe("Required. region name").optional(),
      secondaryZone: z.string().describe(
        "Optional. secondary zone can't be same as primary_zone and is only for High Availability deployment mode",
      ).optional(),
      subnetwork: z.string().describe("Required. subnetwork name").optional(),
      tertiaryZone: z.string().describe(
        "Optional. teriary zone can't be same as primary_zone and secondary zone, and it is only for High Availability deployment mode",
      ).optional(),
    }).describe(
      "Location and networking details for configuring SQL server workload",
    ).optional(),
    mediaBucket: z.string().describe(
      "Required. name of the media storing SQL server installation files",
    ).optional(),
    operatingSystemType: z.enum([
      "OPERATING_SYSTEM_TYPE_UNSPECIFIED",
      "WINDOWS",
      "UBUNTU",
      "RED_HAT_ENTERPRISE_LINUX",
      "SUSE",
    ]).describe(
      "Required. type of the operating system the SQL server is going to run on top of",
    ).optional(),
    osImage: z.string().describe("Required. the image of the operating system")
      .optional(),
    osImageType: z.enum([
      "OS_IMAGE_TYPE_UNSPECIFIED",
      "PUBLIC_IMAGE",
      "CUSTOM_IMAGE",
    ]).describe(
      "Optional. OS image type, it's used to create boot disks for VM instances When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and default to custom image",
    ).optional(),
    pacemaker: z.object({
      bucketNameNodeCertificates: z.string().describe(
        "Required. bucket location for node certificates",
      ).optional(),
      pacemakerCluster: z.string().describe("Required. pacemaker cluster name")
        .optional(),
      pacemakerClusterSecret: z.string().describe(
        "Required. pacemaker cluster secret name",
      ).optional(),
      pacemakerClusterUsername: z.string().describe(
        "Required. pacemaker cluster username",
      ).optional(),
      sqlPacemakerSecret: z.string().describe(
        "Required. sql pacemaker secret name",
      ).optional(),
      sqlPacemakerUsername: z.string().describe(
        "Required. sql pacemaker username",
      ).optional(),
    }).describe("pacemaker configuration").optional(),
    sqlServerEdition: z.enum([
      "SQL_SERVER_EDITION_TYPE_UNSPECIFIED",
      "SQL_SERVER_EDITION_TYPE_DEVELOPER",
      "SQL_SERVER_EDITION_TYPE_ENTERPRISE",
      "SQL_SERVER_EDITION_TYPE_STANDARD",
      "SQL_SERVER_EDITION_TYPE_WEB",
    ]).describe(
      "Optional. SQL Server Edition type, only applicable when Operating System is Linux",
    ).optional(),
    sqlServerVersion: z.enum([
      "SQL_SERVER_VERSION_TYPE_UNSPECIFIED",
      "SQL_SERVER_VERSION_TYPE_2017",
      "SQL_SERVER_VERSION_TYPE_2019",
      "SQL_SERVER_VERSION_TYPE_2022",
    ]).describe("Optional. 2017 or 2019 or 2022").optional(),
    vmPrefix: z.string().describe("Required. should be unique in the project")
      .optional(),
  }).describe("Message for MS SQL workload").optional(),
  terraformVariables: z.record(
    z.string(),
    z.object({
      inputValue: z.string().describe("Optional. Input variable value.")
        .optional(),
    }),
  ).describe(
    'Optional. terraform_variables represents all the Terraform variables for the deployment workload. The key is the name of the Terraform variable, and the value is the TerraformVariable. For example: { "project_id": { "input_value": { "string_value": "my-project-id" } }, "zone": { "input_value": { "string_value": "us-central1-a" } } }',
  ).optional(),
  workerPool: z.string().describe(
    "Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used.",
  ).optional(),
  workloadType: z.enum([
    "WORKLOAD_TYPE_UNSPECIFIED",
    "SAP_S4",
    "SQL_SERVER",
    "ORACLE",
  ]).describe("Optional. Workload type of the deployment").optional(),
  deploymentId: z.string().describe("Required. Id of the deployment")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  name: z.string(),
  sapSystemS4Config: z.object({
    allowStoppingForUpdate: z.boolean(),
    ansibleRunnerServiceAccount: z.string(),
    app: z.object({
      appInstanceId: z.string(),
      appServiceAccount: z.string(),
      appVmNames: z.array(z.string()),
      ascsImage: z.string(),
      ascsInstanceId: z.string(),
      ascsMachineType: z.string(),
      ascsServiceAccount: z.string(),
      ascsVm: z.string(),
      ersInstanceId: z.string(),
      ersVm: z.string(),
      image: z.string(),
      machineType: z.string(),
      secretManagerSecret: z.string(),
      sharedStorage: z.string(),
      sid: z.string(),
      vmsMultiplier: z.number(),
    }),
    database: z.object({
      databaseServiceAccount: z.string(),
      diskType: z.string(),
      image: z.string(),
      instanceId: z.string(),
      machineType: z.string(),
      primaryDbVm: z.string(),
      secondaryDbVm: z.string(),
      secretManagerSecret: z.string(),
      sid: z.string(),
    }),
    deploymentModel: z.string(),
    environmentType: z.string(),
    gcpProjectId: z.string(),
    location: z.object({
      createCommsFirewall: z.boolean(),
      customTags: z.array(z.string()),
      deploymentDnsEnabled: z.boolean(),
      dnsZone: z.string(),
      dnsZoneNameSuffix: z.string(),
      internetAccess: z.string(),
      networkProject: z.string(),
      regionName: z.string(),
      subnetName: z.string(),
      vpcName: z.string(),
      zone1Name: z.string(),
      zone2Name: z.string(),
    }),
    mediaBucketName: z.string(),
    sapBootDiskImage: z.string(),
    scalingMethod: z.string(),
    version: z.string(),
    vmPrefix: z.string(),
  }).optional(),
  serviceAccount: z.string().optional(),
  sqlServerWorkload: z.object({
    activeDirectory: z.object({
      dnsAddress: z.string(),
      domain: z.string(),
      domainUsername: z.string(),
      secretManagerSecret: z.string(),
      type: z.string(),
    }),
    computeEngineServiceAccount: z.string(),
    database: z.object({
      diskType: z.string(),
      floatingIpAddress: z.string(),
      machineType: z.string(),
      secondarySoleTenantNode: z.string(),
      secondarySoleTenantNodeType: z.string(),
      secretManagerSecret: z.string(),
      smt: z.boolean(),
      soleTenantNode: z.string(),
      soleTenantNodeType: z.string(),
      tempdbOnSsd: z.boolean(),
      tenancyModel: z.string(),
    }),
    deploymentModel: z.string(),
    environmentType: z.string(),
    fciType: z.string(),
    haType: z.string(),
    isSqlPayg: z.boolean(),
    location: z.object({
      dnsZone: z.string(),
      gcpProjectId: z.string(),
      internetAccess: z.string(),
      network: z.string(),
      primaryZone: z.string(),
      region: z.string(),
      secondaryZone: z.string(),
      subnetwork: z.string(),
      tertiaryZone: z.string(),
    }),
    mediaBucket: z.string(),
    operatingSystemType: z.string(),
    osImage: z.string(),
    osImageType: z.string(),
    pacemaker: z.object({
      bucketNameNodeCertificates: z.string(),
      pacemakerCluster: z.string(),
      pacemakerClusterSecret: z.string(),
      pacemakerClusterUsername: z.string(),
      sqlPacemakerSecret: z.string(),
      sqlPacemakerUsername: z.string(),
    }),
    sqlServerEdition: z.string(),
    sqlServerVersion: z.string(),
    vmPrefix: z.string(),
  }).optional(),
  state: z.string().optional(),
  terraformVariables: z.record(z.string(), z.unknown()).optional(),
  updateTime: z.string().optional(),
  workerPool: z.string().optional(),
  workloadType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("Description of the Deployment").optional(),
  name: z.string().describe(
    "The name of deployment resource. The format will be 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'",
  ).optional(),
  sapSystemS4Config: z.object({
    allowStoppingForUpdate: z.boolean().optional(),
    ansibleRunnerServiceAccount: z.string().describe(
      "Ansible runner service account - let custoemrs bring their own SA for Ansible runner",
    ).optional(),
    app: z.object({
      appInstanceId: z.string().describe("Optional. instance id for app")
        .optional(),
      appServiceAccount: z.string().describe(
        "Application service account - let custoemrs bring their own SA for application",
      ).optional(),
      appVmNames: z.array(z.string()).describe("Optional. Customized vm names")
        .optional(),
      ascsImage: z.string().describe("Required. image for ascs server")
        .optional(),
      ascsInstanceId: z.string().describe("Optional. instance id for ascs")
        .optional(),
      ascsMachineType: z.string().describe("Required. ascs_machine_type")
        .optional(),
      ascsServiceAccount: z.string().describe(
        "ASCS service account - let custoemrs bring their own SA for ASCS",
      ).optional(),
      ascsVm: z.string().describe("Optional. ASCS vm name").optional(),
      ersInstanceId: z.string().describe("Optional. instance id for ers")
        .optional(),
      ersVm: z.string().describe("Optional. ERS vm name").optional(),
      image: z.string().describe(
        "Required. image for app server and ascs server",
      ).optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      sharedStorage: z.string().describe("Optional. Storage location")
        .optional(),
      sid: z.string().describe(
        "Required. The SAP SID is a three-digit server-specific unique identification code.",
      ).optional(),
      vmsMultiplier: z.number().int().describe("Required. vms_multiplier")
        .optional(),
    }).describe("Message for sap instant details").optional(),
    database: z.object({
      databaseServiceAccount: z.string().describe(
        "Database service account - let custoemrs bring their own SA for database",
      ).optional(),
      diskType: z.string().describe("Required. disk_type").optional(),
      image: z.string().describe("Required. image for database server")
        .optional(),
      instanceId: z.string().describe("Optional. instance id").optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      primaryDbVm: z.string().describe("Optional. primary db vm name")
        .optional(),
      secondaryDbVm: z.string().describe("Optional. secondary db vm name")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      sid: z.string().describe(
        "Required. The SID is a three-digit server-specific unique identification code.",
      ).optional(),
    }).describe("Message for sap instant details").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "DISTRIBUTED",
      "DISTRIBUTED_HA",
    ]).describe("Required. two model non-HA and HA supported").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. deployment environment").optional(),
    gcpProjectId: z.string().describe(
      "the project that infrastructure deployed, current only support the same project where the deployment resource exist.",
    ).optional(),
    location: z.object({
      createCommsFirewall: z.boolean().describe(
        "Optional. create firewall, if true, create firewall for the deployment. This field provides an option to not always create firewall for the deployment.",
      ).optional(),
      customTags: z.array(z.string()).describe("Optional. network tags")
        .optional(),
      deploymentDnsEnabled: z.boolean().describe(
        "Optional. when user skip DNS configuration from UI, deployment_dns_enabled=false otherwise deployment_dns_enabled=true",
      ).optional(),
      dnsZone: z.string().describe("Optional. dns zone name").optional(),
      dnsZoneNameSuffix: z.string().describe("Optional. dns_zone_name_suffix")
        .optional(),
      internetAccess: z.enum([
        "INTERNETACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).optional(),
      networkProject: z.string().describe("Optional. network project")
        .optional(),
      regionName: z.string().describe("Required. region_name").optional(),
      subnetName: z.string().describe("Required. subnet_name").optional(),
      vpcName: z.string().describe("Required. vpc_name").optional(),
      zone1Name: z.string().describe("Required. zone1_name").optional(),
      zone2Name: z.string().describe("Optional. zone2_name").optional(),
    }).describe("Message for sap instant details").optional(),
    mediaBucketName: z.string().describe("Required. media_bucket_name")
      .optional(),
    sapBootDiskImage: z.string().describe("Optional. sap_boot_disk_image")
      .optional(),
    scalingMethod: z.enum(["SCALE_METHOD_UNSPECIFIED", "SCALE_UP", "SCALE_OUT"])
      .describe("Required. support scale up and scale out").optional(),
    version: z.enum([
      "VERSION_UNSPECIFIED",
      "S4_HANA_2021",
      "S4_HANA_2022",
      "S4_HANA_2023",
    ]).describe("Required. sap hana version").optional(),
    vmPrefix: z.string().describe("vm_prefix").optional(),
  }).describe("Message for sap system workload").optional(),
  serviceAccount: z.string().describe(
    "User-specified Service Account (SA) credentials to be used for cloud build Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation",
  ).optional(),
  sqlServerWorkload: z.object({
    activeDirectory: z.object({
      dnsAddress: z.string().describe("Optional. DNS IP address").optional(),
      domain: z.string().describe(
        "Optional. human readable form of a domain such as “google.com”.",
      ).optional(),
      domainUsername: z.string().describe("Optional. domain username")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      type: z.enum([
        "ACTIVE_DIRECTORY_TYPE_UNSPECIFIED",
        "GCP_MANAGED",
        "SELF_MANAGED",
      ]).describe("Required. active directory type").optional(),
    }).describe("Active directory details").optional(),
    computeEngineServiceAccount: z.string().describe(
      "Compute engine service account - let customers bring their own SA for Compute engine",
    ).optional(),
    database: z.object({
      diskType: z.string().describe("Required. disk_type").optional(),
      floatingIpAddress: z.string().describe(
        "Optional. only useful for Linux High Availability setup",
      ).optional(),
      machineType: z.string().describe("Required. machine type").optional(),
      secondarySoleTenantNode: z.string().describe(
        "Optional. the name of a secondary-sole-tenant node/node group",
      ).optional(),
      secondarySoleTenantNodeType: z.string().describe(
        "Optional. the type of a secondary-sole-tenant node/node group e.g. compute.googleapis.com/node-name",
      ).optional(),
      secretManagerSecret: z.string().describe(
        "Required. secret_manager_secret",
      ).optional(),
      smt: z.boolean().describe(
        "Required. whether simultaneous multithreading is enabled or not",
      ).optional(),
      soleTenantNode: z.string().describe(
        "Optional. the name of a primary sole-tenant node/node group",
      ).optional(),
      soleTenantNodeType: z.string().describe(
        "Optional. the type of a primary sole-tenant node/node group e.g. compute.googleapis.com/node-name",
      ).optional(),
      tempdbOnSsd: z.boolean().describe(
        "Required. whether to have TempDB on local SSD",
      ).optional(),
      tenancyModel: z.enum([
        "TENANCY_MODEL_UNSPECIFIED",
        "SHARED",
        "SOLE_TENANT",
      ]).describe("Required. SHARED or SOLE_TENANT").optional(),
    }).describe("Database details").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "HIGH_AVAILABILITY",
      "SINGLE_INSTANCE",
    ]).describe("Required. HIGH_AVAILABILITY or SINGLE_INSTANCE").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. deployment environment").optional(),
    fciType: z.enum(["FCI_TYPE_UNSPECIFIED", "SHARED_DISK", "S2D"]).describe(
      "Optional. SHARED_DISK or S2D",
    ).optional(),
    haType: z.enum(["HA_TYPE_UNSPECIFIED", "AOAG", "FCI"]).describe(
      "Optional. AOAG or FCI, it is only needed for High Availability deployment mode",
    ).optional(),
    isSqlPayg: z.boolean().describe("Required. SQL licensing type").optional(),
    location: z.object({
      dnsZone: z.string().describe(
        "Optional. create a new DNS Zone when the field is empty, Only show for `Using an existing DNS` List of existing DNS Zones tf variable name: existing_dns_zone_name",
      ).optional(),
      gcpProjectId: z.string().describe(
        "Required. the project that infrastructure deployed, currently only supports the same project where the deployment resource exists.",
      ).optional(),
      internetAccess: z.enum([
        "INTERNET_ACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).describe("Required. Internet Access").optional(),
      network: z.string().describe("Required. network name").optional(),
      primaryZone: z.string().describe("Required. primary zone").optional(),
      region: z.string().describe("Required. region name").optional(),
      secondaryZone: z.string().describe(
        "Optional. secondary zone can't be same as primary_zone and is only for High Availability deployment mode",
      ).optional(),
      subnetwork: z.string().describe("Required. subnetwork name").optional(),
      tertiaryZone: z.string().describe(
        "Optional. teriary zone can't be same as primary_zone and secondary zone, and it is only for High Availability deployment mode",
      ).optional(),
    }).describe(
      "Location and networking details for configuring SQL server workload",
    ).optional(),
    mediaBucket: z.string().describe(
      "Required. name of the media storing SQL server installation files",
    ).optional(),
    operatingSystemType: z.enum([
      "OPERATING_SYSTEM_TYPE_UNSPECIFIED",
      "WINDOWS",
      "UBUNTU",
      "RED_HAT_ENTERPRISE_LINUX",
      "SUSE",
    ]).describe(
      "Required. type of the operating system the SQL server is going to run on top of",
    ).optional(),
    osImage: z.string().describe("Required. the image of the operating system")
      .optional(),
    osImageType: z.enum([
      "OS_IMAGE_TYPE_UNSPECIFIED",
      "PUBLIC_IMAGE",
      "CUSTOM_IMAGE",
    ]).describe(
      "Optional. OS image type, it's used to create boot disks for VM instances When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and default to custom image",
    ).optional(),
    pacemaker: z.object({
      bucketNameNodeCertificates: z.string().describe(
        "Required. bucket location for node certificates",
      ).optional(),
      pacemakerCluster: z.string().describe("Required. pacemaker cluster name")
        .optional(),
      pacemakerClusterSecret: z.string().describe(
        "Required. pacemaker cluster secret name",
      ).optional(),
      pacemakerClusterUsername: z.string().describe(
        "Required. pacemaker cluster username",
      ).optional(),
      sqlPacemakerSecret: z.string().describe(
        "Required. sql pacemaker secret name",
      ).optional(),
      sqlPacemakerUsername: z.string().describe(
        "Required. sql pacemaker username",
      ).optional(),
    }).describe("pacemaker configuration").optional(),
    sqlServerEdition: z.enum([
      "SQL_SERVER_EDITION_TYPE_UNSPECIFIED",
      "SQL_SERVER_EDITION_TYPE_DEVELOPER",
      "SQL_SERVER_EDITION_TYPE_ENTERPRISE",
      "SQL_SERVER_EDITION_TYPE_STANDARD",
      "SQL_SERVER_EDITION_TYPE_WEB",
    ]).describe(
      "Optional. SQL Server Edition type, only applicable when Operating System is Linux",
    ).optional(),
    sqlServerVersion: z.enum([
      "SQL_SERVER_VERSION_TYPE_UNSPECIFIED",
      "SQL_SERVER_VERSION_TYPE_2017",
      "SQL_SERVER_VERSION_TYPE_2019",
      "SQL_SERVER_VERSION_TYPE_2022",
    ]).describe("Optional. 2017 or 2019 or 2022").optional(),
    vmPrefix: z.string().describe("Required. should be unique in the project")
      .optional(),
  }).describe("Message for MS SQL workload").optional(),
  terraformVariables: z.record(
    z.string(),
    z.object({
      inputValue: z.string().describe("Optional. Input variable value.")
        .optional(),
    }),
  ).describe(
    'Optional. terraform_variables represents all the Terraform variables for the deployment workload. The key is the name of the Terraform variable, and the value is the TerraformVariable. For example: { "project_id": { "input_value": { "string_value": "my-project-id" } }, "zone": { "input_value": { "string_value": "us-central1-a" } } }',
  ).optional(),
  workerPool: z.string().describe(
    "Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used.",
  ).optional(),
  workloadType: z.enum([
    "WORKLOAD_TYPE_UNSPECIFIED",
    "SAP_S4",
    "SQL_SERVER",
    "ORACLE",
  ]).describe("Optional. Workload type of the deployment").optional(),
  deploymentId: z.string().describe("Required. Id of the deployment")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workload Manager Deployments. Registered at `@swamp/gcp/workloadmanager/deployments`. */
export const model = {
  type: "@swamp/gcp/workloadmanager/deployments",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The Deployment object represents user intent for deploying a specific type of...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deployments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sapSystemS4Config"] !== undefined) {
          body["sapSystemS4Config"] = g["sapSystemS4Config"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sqlServerWorkload"] !== undefined) {
          body["sqlServerWorkload"] = g["sqlServerWorkload"];
        }
        if (g["terraformVariables"] !== undefined) {
          body["terraformVariables"] = g["terraformVariables"];
        }
        if (g["workerPool"] !== undefined) body["workerPool"] = g["workerPool"];
        if (g["workloadType"] !== undefined) {
          body["workloadType"] = g["workloadType"];
        }
        if (g["deploymentId"] !== undefined) {
          body["deploymentId"] = g["deploymentId"];
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
    delete: {
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Sync deployments state from GCP",
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
