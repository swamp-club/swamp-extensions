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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "workloadmanager.projects.locations.deployments.list",
  "path": "v1/{+parent}/deployments",
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
  description: z.string().describe("Description of the deployment.").optional(),
  name: z.string().describe(
    "The name of the deployment resource. The format is 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'.",
  ).optional(),
  sapSystemS4Config: z.object({
    allowStoppingForUpdate: z.boolean().optional(),
    ansibleRunnerServiceAccount: z.string().describe(
      "Ansible runner service account. Let customers bring their own service account for the Ansible runner.",
    ).optional(),
    app: z.object({
      appInstanceId: z.string().describe("Optional. Instance ID for app.")
        .optional(),
      appServiceAccount: z.string().describe(
        "Application service account. Let customers bring their own service account for the application.",
      ).optional(),
      appVmNames: z.array(z.string()).describe("Optional. Customized VM names.")
        .optional(),
      ascsImage: z.string().describe("Required. Image for the ASCS server.")
        .optional(),
      ascsInstanceId: z.string().describe("Optional. Instance ID for ASCS.")
        .optional(),
      ascsMachineType: z.string().describe("Required. ASCS machine type.")
        .optional(),
      ascsServiceAccount: z.string().describe(
        "ASCS service account. Let customers bring their own service account for ASCS.",
      ).optional(),
      ascsVm: z.string().describe("Optional. ASCS VM name.").optional(),
      ersInstanceId: z.string().describe("Optional. Instance ID for ERS.")
        .optional(),
      ersVm: z.string().describe("Optional. ERS VM name.").optional(),
      image: z.string().describe(
        "Required. Image for the app server and ASCS server.",
      ).optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      sharedStorage: z.string().describe("Optional. Storage location.")
        .optional(),
      sid: z.string().describe(
        "Required. The SAP SID is a three-digit server-specific unique identification code.",
      ).optional(),
      vmsMultiplier: z.number().int().describe("Required. VMs multiplier.")
        .optional(),
    }).describe("Message for SAP instance details.").optional(),
    database: z.object({
      databaseServiceAccount: z.string().describe(
        "Database service account. Let customers bring their own SA for the database.",
      ).optional(),
      diskType: z.string().describe("Required. Disk type.").optional(),
      image: z.string().describe("Required. Image for the database server.")
        .optional(),
      instanceId: z.string().describe("Optional. Instance ID.").optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      primaryDbVm: z.string().describe("Optional. Primary DB VM name.")
        .optional(),
      secondaryDbVm: z.string().describe("Optional. Secondary DB VM name.")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      sid: z.string().describe(
        "Required. The SID is a three-digit server-specific unique identification code.",
      ).optional(),
    }).describe("Message for SAP instance details.").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "DISTRIBUTED",
      "DISTRIBUTED_HA",
    ]).describe("Required. Supports non-HA and HA models.").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. Deployment environment.").optional(),
    gcpProjectId: z.string().describe(
      "The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists.",
    ).optional(),
    location: z.object({
      createCommsFirewall: z.boolean().describe(
        "Optional. Create firewall. If true, creates a firewall for the deployment. This field provides an option to not always create a firewall for the deployment.",
      ).optional(),
      customTags: z.array(z.string()).describe("Optional. Network tags.")
        .optional(),
      deploymentDnsEnabled: z.boolean().describe(
        "Optional. When the user skips DNS configuration in the UI, `deployment_dns_enabled` is false; otherwise `deployment_dns_enabled` is true.",
      ).optional(),
      dnsZone: z.string().describe("Optional. DNS zone name.").optional(),
      dnsZoneNameSuffix: z.string().describe("Optional. DNS zone name suffix.")
        .optional(),
      internetAccess: z.enum([
        "INTERNETACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).optional(),
      networkProject: z.string().describe("Optional. Network project.")
        .optional(),
      regionName: z.string().describe("Required. Region name.").optional(),
      subnetName: z.string().describe("Required. Subnet name.").optional(),
      vpcName: z.string().describe("Required. VPC name.").optional(),
      zone1Name: z.string().describe("Required. Zone 1 name.").optional(),
      zone2Name: z.string().describe("Optional. Zone 2 name.").optional(),
    }).describe("Message for SAP instance details.").optional(),
    mediaBucketName: z.string().describe("Required. Media bucket name.")
      .optional(),
    sapBootDiskImage: z.string().describe("Optional. SAP boot disk image.")
      .optional(),
    scalingMethod: z.enum(["SCALE_METHOD_UNSPECIFIED", "SCALE_UP", "SCALE_OUT"])
      .describe("Required. Supports scale up and scale out.").optional(),
    version: z.enum([
      "VERSION_UNSPECIFIED",
      "S4_HANA_2021",
      "S4_HANA_2022",
      "S4_HANA_2023",
    ]).describe("Required. SAP HANA version.").optional(),
    vmPrefix: z.string().describe("VM prefix.").optional(),
  }).describe("Message for SAP system workload.").optional(),
  serviceAccount: z.string().describe(
    "User-specified Service Account (SA) credentials to be used for Cloud Build. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation.",
  ).optional(),
  sqlServerWorkload: z.object({
    activeDirectory: z.object({
      dnsAddress: z.string().describe("Optional. DNS IP address.").optional(),
      domain: z.string().describe(
        "Optional. Human readable form of a domain such as “google.com”.",
      ).optional(),
      domainUsername: z.string().describe("Optional. Domain username.")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      type: z.enum([
        "ACTIVE_DIRECTORY_TYPE_UNSPECIFIED",
        "GCP_MANAGED",
        "SELF_MANAGED",
      ]).describe("Required. Active Directory type.").optional(),
    }).describe("Active Directory details.").optional(),
    computeEngineServiceAccount: z.string().describe(
      "Compute Engine service account. Let customers bring their own service account for Compute Engine.",
    ).optional(),
    database: z.object({
      diskType: z.string().describe("Required. Disk type.").optional(),
      floatingIpAddress: z.string().describe(
        "Optional. Only useful for Linux High Availability setup.",
      ).optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      secondarySoleTenantNode: z.string().describe(
        "Optional. The name of a secondary-sole-tenant node/node group.",
      ).optional(),
      secondarySoleTenantNodeType: z.string().describe(
        "Optional. The type of a secondary-sole-tenant node/node group. E.g., compute.googleapis.com/node-name.",
      ).optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      smt: z.boolean().describe(
        "Required. Whether simultaneous multithreading is enabled or not.",
      ).optional(),
      soleTenantNode: z.string().describe(
        "Optional. The name of a primary sole-tenant node/node group.",
      ).optional(),
      soleTenantNodeType: z.string().describe(
        "Optional. The type of a primary sole-tenant node/node group. E.g., compute.googleapis.com/node-name.",
      ).optional(),
      tempdbOnSsd: z.boolean().describe(
        "Required. Whether to have TempDB on local SSD.",
      ).optional(),
      tenancyModel: z.enum([
        "TENANCY_MODEL_UNSPECIFIED",
        "SHARED",
        "SOLE_TENANT",
      ]).describe("Required. SHARED or SOLE_TENANT.").optional(),
    }).describe("Database details.").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "HIGH_AVAILABILITY",
      "SINGLE_INSTANCE",
    ]).describe("Required. HIGH_AVAILABILITY or SINGLE_INSTANCE.").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. Deployment environment.").optional(),
    fciType: z.enum(["FCI_TYPE_UNSPECIFIED", "SHARED_DISK", "S2D"]).describe(
      "Optional. SHARED_DISK or S2D.",
    ).optional(),
    haType: z.enum(["HA_TYPE_UNSPECIFIED", "AOAG", "FCI"]).describe(
      "Optional. AOAG or FCI. It is only needed for the High Availability deployment mode.",
    ).optional(),
    isSqlPayg: z.boolean().describe("Required. SQL licensing type.").optional(),
    location: z.object({
      dnsZone: z.string().describe(
        "Optional. Create a new DNS zone when the field is empty. Only shown for `Using an existing DNS`. List of existing DNS zones. Terraform variable name: existing_dns_zone_name.",
      ).optional(),
      gcpProjectId: z.string().describe(
        "Required. The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists.",
      ).optional(),
      internetAccess: z.enum([
        "INTERNET_ACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).describe("Required. Internet Access.").optional(),
      network: z.string().describe("Required. Network name.").optional(),
      primaryZone: z.string().describe("Required. Primary zone.").optional(),
      region: z.string().describe("Required. Region name.").optional(),
      secondaryZone: z.string().describe(
        "Optional. Secondary zone cannot be the same as primary_zone and is only for High Availability deployment mode.",
      ).optional(),
      subnetwork: z.string().describe("Required. Subnetwork name.").optional(),
      tertiaryZone: z.string().describe(
        "Optional. Tertiary zone cannot be the same as primary_zone and secondary_zone, and it is only for High Availability deployment mode.",
      ).optional(),
    }).describe(
      "Location and networking details for configuring SQL server workload.",
    ).optional(),
    mediaBucket: z.string().describe(
      "Required. Name of the media storing SQL server installation files.",
    ).optional(),
    operatingSystemType: z.enum([
      "OPERATING_SYSTEM_TYPE_UNSPECIFIED",
      "WINDOWS",
      "UBUNTU",
      "RED_HAT_ENTERPRISE_LINUX",
      "SUSE",
    ]).describe(
      "Required. The type of the operating system the SQL server is going to run on top of.",
    ).optional(),
    osImage: z.string().describe("Required. The image of the operating system.")
      .optional(),
    osImageType: z.enum([
      "OS_IMAGE_TYPE_UNSPECIFIED",
      "PUBLIC_IMAGE",
      "CUSTOM_IMAGE",
    ]).describe(
      "Optional. OS image type. It's used to create boot disks for VM instances. When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and defaults to a custom image.",
    ).optional(),
    pacemaker: z.object({
      bucketNameNodeCertificates: z.string().describe(
        "Required. Bucket location for node certificates.",
      ).optional(),
      pacemakerCluster: z.string().describe("Required. Pacemaker cluster name.")
        .optional(),
      pacemakerClusterSecret: z.string().describe(
        "Required. Pacemaker cluster secret name.",
      ).optional(),
      pacemakerClusterUsername: z.string().describe(
        "Required. Pacemaker cluster username.",
      ).optional(),
      sqlPacemakerSecret: z.string().describe(
        "Required. SQL Pacemaker secret name.",
      ).optional(),
      sqlPacemakerUsername: z.string().describe(
        "Required. SQL Pacemaker username.",
      ).optional(),
    }).describe("Pacemaker configuration.").optional(),
    sqlServerEdition: z.enum([
      "SQL_SERVER_EDITION_TYPE_UNSPECIFIED",
      "SQL_SERVER_EDITION_TYPE_DEVELOPER",
      "SQL_SERVER_EDITION_TYPE_ENTERPRISE",
      "SQL_SERVER_EDITION_TYPE_STANDARD",
      "SQL_SERVER_EDITION_TYPE_WEB",
    ]).describe(
      "Optional. SQL Server Edition type, only applicable when the operating system is Linux.",
    ).optional(),
    sqlServerVersion: z.enum([
      "SQL_SERVER_VERSION_TYPE_UNSPECIFIED",
      "SQL_SERVER_VERSION_TYPE_2017",
      "SQL_SERVER_VERSION_TYPE_2019",
      "SQL_SERVER_VERSION_TYPE_2022",
    ]).describe("Optional. 2017, 2019, or 2022.").optional(),
    vmPrefix: z.string().describe("Required. Should be unique in the project.")
      .optional(),
  }).describe("Message for MS SQL workload.").optional(),
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
  ]).describe("Optional. Workload type of the deployment.").optional(),
  deploymentId: z.string().describe("Required. ID of the deployment.")
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe("Description of the deployment.").optional(),
  name: z.string().describe(
    "The name of the deployment resource. The format is 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'.",
  ).optional(),
  sapSystemS4Config: z.object({
    allowStoppingForUpdate: z.boolean().optional(),
    ansibleRunnerServiceAccount: z.string().describe(
      "Ansible runner service account. Let customers bring their own service account for the Ansible runner.",
    ).optional(),
    app: z.object({
      appInstanceId: z.string().describe("Optional. Instance ID for app.")
        .optional(),
      appServiceAccount: z.string().describe(
        "Application service account. Let customers bring their own service account for the application.",
      ).optional(),
      appVmNames: z.array(z.string()).describe("Optional. Customized VM names.")
        .optional(),
      ascsImage: z.string().describe("Required. Image for the ASCS server.")
        .optional(),
      ascsInstanceId: z.string().describe("Optional. Instance ID for ASCS.")
        .optional(),
      ascsMachineType: z.string().describe("Required. ASCS machine type.")
        .optional(),
      ascsServiceAccount: z.string().describe(
        "ASCS service account. Let customers bring their own service account for ASCS.",
      ).optional(),
      ascsVm: z.string().describe("Optional. ASCS VM name.").optional(),
      ersInstanceId: z.string().describe("Optional. Instance ID for ERS.")
        .optional(),
      ersVm: z.string().describe("Optional. ERS VM name.").optional(),
      image: z.string().describe(
        "Required. Image for the app server and ASCS server.",
      ).optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      sharedStorage: z.string().describe("Optional. Storage location.")
        .optional(),
      sid: z.string().describe(
        "Required. The SAP SID is a three-digit server-specific unique identification code.",
      ).optional(),
      vmsMultiplier: z.number().int().describe("Required. VMs multiplier.")
        .optional(),
    }).describe("Message for SAP instance details.").optional(),
    database: z.object({
      databaseServiceAccount: z.string().describe(
        "Database service account. Let customers bring their own SA for the database.",
      ).optional(),
      diskType: z.string().describe("Required. Disk type.").optional(),
      image: z.string().describe("Required. Image for the database server.")
        .optional(),
      instanceId: z.string().describe("Optional. Instance ID.").optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      primaryDbVm: z.string().describe("Optional. Primary DB VM name.")
        .optional(),
      secondaryDbVm: z.string().describe("Optional. Secondary DB VM name.")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      sid: z.string().describe(
        "Required. The SID is a three-digit server-specific unique identification code.",
      ).optional(),
    }).describe("Message for SAP instance details.").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "DISTRIBUTED",
      "DISTRIBUTED_HA",
    ]).describe("Required. Supports non-HA and HA models.").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. Deployment environment.").optional(),
    gcpProjectId: z.string().describe(
      "The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists.",
    ).optional(),
    location: z.object({
      createCommsFirewall: z.boolean().describe(
        "Optional. Create firewall. If true, creates a firewall for the deployment. This field provides an option to not always create a firewall for the deployment.",
      ).optional(),
      customTags: z.array(z.string()).describe("Optional. Network tags.")
        .optional(),
      deploymentDnsEnabled: z.boolean().describe(
        "Optional. When the user skips DNS configuration in the UI, `deployment_dns_enabled` is false; otherwise `deployment_dns_enabled` is true.",
      ).optional(),
      dnsZone: z.string().describe("Optional. DNS zone name.").optional(),
      dnsZoneNameSuffix: z.string().describe("Optional. DNS zone name suffix.")
        .optional(),
      internetAccess: z.enum([
        "INTERNETACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).optional(),
      networkProject: z.string().describe("Optional. Network project.")
        .optional(),
      regionName: z.string().describe("Required. Region name.").optional(),
      subnetName: z.string().describe("Required. Subnet name.").optional(),
      vpcName: z.string().describe("Required. VPC name.").optional(),
      zone1Name: z.string().describe("Required. Zone 1 name.").optional(),
      zone2Name: z.string().describe("Optional. Zone 2 name.").optional(),
    }).describe("Message for SAP instance details.").optional(),
    mediaBucketName: z.string().describe("Required. Media bucket name.")
      .optional(),
    sapBootDiskImage: z.string().describe("Optional. SAP boot disk image.")
      .optional(),
    scalingMethod: z.enum(["SCALE_METHOD_UNSPECIFIED", "SCALE_UP", "SCALE_OUT"])
      .describe("Required. Supports scale up and scale out.").optional(),
    version: z.enum([
      "VERSION_UNSPECIFIED",
      "S4_HANA_2021",
      "S4_HANA_2022",
      "S4_HANA_2023",
    ]).describe("Required. SAP HANA version.").optional(),
    vmPrefix: z.string().describe("VM prefix.").optional(),
  }).describe("Message for SAP system workload.").optional(),
  serviceAccount: z.string().describe(
    "User-specified Service Account (SA) credentials to be used for Cloud Build. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation.",
  ).optional(),
  sqlServerWorkload: z.object({
    activeDirectory: z.object({
      dnsAddress: z.string().describe("Optional. DNS IP address.").optional(),
      domain: z.string().describe(
        "Optional. Human readable form of a domain such as “google.com”.",
      ).optional(),
      domainUsername: z.string().describe("Optional. Domain username.")
        .optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      type: z.enum([
        "ACTIVE_DIRECTORY_TYPE_UNSPECIFIED",
        "GCP_MANAGED",
        "SELF_MANAGED",
      ]).describe("Required. Active Directory type.").optional(),
    }).describe("Active Directory details.").optional(),
    computeEngineServiceAccount: z.string().describe(
      "Compute Engine service account. Let customers bring their own service account for Compute Engine.",
    ).optional(),
    database: z.object({
      diskType: z.string().describe("Required. Disk type.").optional(),
      floatingIpAddress: z.string().describe(
        "Optional. Only useful for Linux High Availability setup.",
      ).optional(),
      machineType: z.string().describe("Required. Machine type.").optional(),
      secondarySoleTenantNode: z.string().describe(
        "Optional. The name of a secondary-sole-tenant node/node group.",
      ).optional(),
      secondarySoleTenantNodeType: z.string().describe(
        "Optional. The type of a secondary-sole-tenant node/node group. E.g., compute.googleapis.com/node-name.",
      ).optional(),
      secretManagerSecret: z.string().describe(
        "Required. Secret Manager secret.",
      ).optional(),
      smt: z.boolean().describe(
        "Required. Whether simultaneous multithreading is enabled or not.",
      ).optional(),
      soleTenantNode: z.string().describe(
        "Optional. The name of a primary sole-tenant node/node group.",
      ).optional(),
      soleTenantNodeType: z.string().describe(
        "Optional. The type of a primary sole-tenant node/node group. E.g., compute.googleapis.com/node-name.",
      ).optional(),
      tempdbOnSsd: z.boolean().describe(
        "Required. Whether to have TempDB on local SSD.",
      ).optional(),
      tenancyModel: z.enum([
        "TENANCY_MODEL_UNSPECIFIED",
        "SHARED",
        "SOLE_TENANT",
      ]).describe("Required. SHARED or SOLE_TENANT.").optional(),
    }).describe("Database details.").optional(),
    deploymentModel: z.enum([
      "DEPLOYMENT_MODEL_UNSPECIFIED",
      "HIGH_AVAILABILITY",
      "SINGLE_INSTANCE",
    ]).describe("Required. HIGH_AVAILABILITY or SINGLE_INSTANCE.").optional(),
    environmentType: z.enum([
      "ENVIRONMENT_TYPE_UNSPECIFIED",
      "NON_PRODUCTION",
      "PRODUCTION",
    ]).describe("Required. Deployment environment.").optional(),
    fciType: z.enum(["FCI_TYPE_UNSPECIFIED", "SHARED_DISK", "S2D"]).describe(
      "Optional. SHARED_DISK or S2D.",
    ).optional(),
    haType: z.enum(["HA_TYPE_UNSPECIFIED", "AOAG", "FCI"]).describe(
      "Optional. AOAG or FCI. It is only needed for the High Availability deployment mode.",
    ).optional(),
    isSqlPayg: z.boolean().describe("Required. SQL licensing type.").optional(),
    location: z.object({
      dnsZone: z.string().describe(
        "Optional. Create a new DNS zone when the field is empty. Only shown for `Using an existing DNS`. List of existing DNS zones. Terraform variable name: existing_dns_zone_name.",
      ).optional(),
      gcpProjectId: z.string().describe(
        "Required. The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists.",
      ).optional(),
      internetAccess: z.enum([
        "INTERNET_ACCESS_UNSPECIFIED",
        "ALLOW_EXTERNAL_IP",
        "CONFIGURE_NAT",
      ]).describe("Required. Internet Access.").optional(),
      network: z.string().describe("Required. Network name.").optional(),
      primaryZone: z.string().describe("Required. Primary zone.").optional(),
      region: z.string().describe("Required. Region name.").optional(),
      secondaryZone: z.string().describe(
        "Optional. Secondary zone cannot be the same as primary_zone and is only for High Availability deployment mode.",
      ).optional(),
      subnetwork: z.string().describe("Required. Subnetwork name.").optional(),
      tertiaryZone: z.string().describe(
        "Optional. Tertiary zone cannot be the same as primary_zone and secondary_zone, and it is only for High Availability deployment mode.",
      ).optional(),
    }).describe(
      "Location and networking details for configuring SQL server workload.",
    ).optional(),
    mediaBucket: z.string().describe(
      "Required. Name of the media storing SQL server installation files.",
    ).optional(),
    operatingSystemType: z.enum([
      "OPERATING_SYSTEM_TYPE_UNSPECIFIED",
      "WINDOWS",
      "UBUNTU",
      "RED_HAT_ENTERPRISE_LINUX",
      "SUSE",
    ]).describe(
      "Required. The type of the operating system the SQL server is going to run on top of.",
    ).optional(),
    osImage: z.string().describe("Required. The image of the operating system.")
      .optional(),
    osImageType: z.enum([
      "OS_IMAGE_TYPE_UNSPECIFIED",
      "PUBLIC_IMAGE",
      "CUSTOM_IMAGE",
    ]).describe(
      "Optional. OS image type. It's used to create boot disks for VM instances. When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and defaults to a custom image.",
    ).optional(),
    pacemaker: z.object({
      bucketNameNodeCertificates: z.string().describe(
        "Required. Bucket location for node certificates.",
      ).optional(),
      pacemakerCluster: z.string().describe("Required. Pacemaker cluster name.")
        .optional(),
      pacemakerClusterSecret: z.string().describe(
        "Required. Pacemaker cluster secret name.",
      ).optional(),
      pacemakerClusterUsername: z.string().describe(
        "Required. Pacemaker cluster username.",
      ).optional(),
      sqlPacemakerSecret: z.string().describe(
        "Required. SQL Pacemaker secret name.",
      ).optional(),
      sqlPacemakerUsername: z.string().describe(
        "Required. SQL Pacemaker username.",
      ).optional(),
    }).describe("Pacemaker configuration.").optional(),
    sqlServerEdition: z.enum([
      "SQL_SERVER_EDITION_TYPE_UNSPECIFIED",
      "SQL_SERVER_EDITION_TYPE_DEVELOPER",
      "SQL_SERVER_EDITION_TYPE_ENTERPRISE",
      "SQL_SERVER_EDITION_TYPE_STANDARD",
      "SQL_SERVER_EDITION_TYPE_WEB",
    ]).describe(
      "Optional. SQL Server Edition type, only applicable when the operating system is Linux.",
    ).optional(),
    sqlServerVersion: z.enum([
      "SQL_SERVER_VERSION_TYPE_UNSPECIFIED",
      "SQL_SERVER_VERSION_TYPE_2017",
      "SQL_SERVER_VERSION_TYPE_2019",
      "SQL_SERVER_VERSION_TYPE_2022",
    ]).describe("Optional. 2017, 2019, or 2022.").optional(),
    vmPrefix: z.string().describe("Required. Should be unique in the project.")
      .optional(),
  }).describe("Message for MS SQL workload.").optional(),
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
  ]).describe("Optional. Workload type of the deployment.").optional(),
  deploymentId: z.string().describe("Required. ID of the deployment.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Workload Manager Deployments. Registered at `@swamp/gcp/workloadmanager/deployments`. */
export const model = {
  type: "@swamp/gcp/workloadmanager/deployments",
  version: "2026.06.12.1",
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
      toVersion: "2026.06.12.1",
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Sync deployments state from GCP",
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
      description: "List deployments resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter resource following https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
          "deployments",
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
