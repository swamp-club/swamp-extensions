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

// Auto-generated extension model for @swamp/gcp/backupdr/backupvaults-datasources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service BackupVaults.DataSources.
 *
 * Message describing a DataSource object. Datasource object used to represent Datasource details for both admin and basic view.
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
  return `${parent}/dataSources/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.backupVaults.dataSources.get",
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

const PATCH_CONFIG = {
  "id": "backupdr.projects.locations.backupVaults.dataSources.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "backupdr.projects.locations.backupVaults.dataSources.remove",
  "path": "v1/{+name}:remove",
  "httpMethod": "POST",
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
  "id": "backupdr.projects.locations.backupVaults.dataSources.list",
  "path": "v1/{+parent}/dataSources",
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
  backupBlockedByVaultAccessRestriction: z.boolean().describe(
    "Output only. This field is set to true if the backup is blocked by vault access restriction.",
  ).optional(),
  backupConfigInfo: z.object({
    backupApplianceBackupConfig: z.object({
      applicationName: z.string().describe("The name of the application.")
        .optional(),
      backupApplianceId: z.string().describe("The ID of the backup appliance.")
        .optional(),
      backupApplianceName: z.string().describe(
        "The name of the backup appliance.",
      ).optional(),
      hostName: z.string().describe(
        "The name of the host where the application is running.",
      ).optional(),
      slaId: z.string().describe("The ID of the SLA of this application.")
        .optional(),
      slpName: z.string().describe(
        "The name of the SLP associated with the application.",
      ).optional(),
      sltName: z.string().describe(
        "The name of the SLT associated with the application.",
      ).optional(),
    }).describe(
      "Configuration for an application backed up by a Backup Appliance.",
    ).optional(),
    gcpBackupConfig: z.object({
      backupPlan: z.string().describe("The name of the backup plan.")
        .optional(),
      backupPlanAssociation: z.string().describe(
        "The name of the backup plan association.",
      ).optional(),
      backupPlanDescription: z.string().describe(
        "The description of the backup plan.",
      ).optional(),
      backupPlanRevisionId: z.string().describe(
        "The user friendly id of the backup plan revision. E.g. v0, v1 etc.",
      ).optional(),
      backupPlanRevisionName: z.string().describe(
        "The name of the backup plan revision.",
      ).optional(),
      backupPlanRules: z.array(z.string()).describe(
        "The names of the backup plan rules which point to this backupvault",
      ).optional(),
    }).describe("Configuration for a Google Cloud resource.").optional(),
    lastBackupError: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "Output only. If the last backup failed, this field has the error message.",
    ).optional(),
    lastBackupState: z.enum([
      "LAST_BACKUP_STATE_UNSPECIFIED",
      "FIRST_BACKUP_PENDING",
      "SUCCEEDED",
      "FAILED",
      "PERMISSION_DENIED",
    ]).describe(
      "Output only. The status of the last backup to this BackupVault",
    ).optional(),
    lastSuccessfulBackupConsistencyTime: z.string().describe(
      "Output only. If the last backup were successful, this field has the consistency date.",
    ).optional(),
  }).describe(
    "Output only. Details of how the resource is configured for backup.",
  ).optional(),
  backupCount: z.string().describe("Number of backups in the data source.")
    .optional(),
  configState: z.enum([
    "BACKUP_CONFIG_STATE_UNSPECIFIED",
    "ACTIVE",
    "PASSIVE",
    "PAUSED",
  ]).describe("Output only. The backup configuration state.").optional(),
  createTime: z.string().describe(
    "Output only. The time when the instance was created.",
  ).optional(),
  dataSourceBackupApplianceApplication: z.object({
    applianceId: z.string().describe("Appliance Id of the Backup Appliance.")
      .optional(),
    applicationId: z.string().describe(
      "The appid field of the application within the Backup Appliance.",
    ).optional(),
    applicationName: z.string().describe(
      "The name of the Application as known to the Backup Appliance.",
    ).optional(),
    backupAppliance: z.string().describe("Appliance name.").optional(),
    hostId: z.string().describe("Hostid of the application host.").optional(),
    hostname: z.string().describe(
      "Hostname of the host where the application is running.",
    ).optional(),
    type: z.string().describe("The type of the application. e.g. VMBackup")
      .optional(),
  }).describe("The backed up resource is a backup appliance application.")
    .optional(),
  dataSourceGcpResource: z.object({
    alloyDbClusterDatasourceProperties: z.object({
      clusterUid: z.string().describe(
        "Output only. The cluster UID of the AlloyDB cluster backed up by the datasource.",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the AlloyDB cluster backed up by the datasource.",
      ).optional(),
      pitrWindows: z.array(z.object({
        endTime: z.string().describe(
          "Output only. The end time of the PITR window. It is not set if the corresponding Backup Plan Association is active.",
        ).optional(),
        logRetentionDays: z.string().describe(
          "Output only. Log retention days for the PITR window.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The start time of the PITR window.",
        ).optional(),
      })).describe(
        "Output only. Point in time recovery windows. The order is guaranteed to be ascending by start time.",
      ).optional(),
    }).describe(
      "Output only. AlloyDBClusterDataSourceProperties has a subset of AlloyDB cluster properties that are useful at the Datasource level. Currently none of its child properties are auditable. If new auditable properties are added, the AUDIT annotation should be added.",
    ).optional(),
    cloudSqlInstanceDatasourceProperties: z.object({
      databaseInstalledVersion: z.string().describe(
        "Output only. The installed database version of the Cloud SQL instance.",
      ).optional(),
      instanceCreateTime: z.string().describe(
        "Output only. The instance creation timestamp.",
      ).optional(),
      instanceTier: z.string().describe(
        "Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840`",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance}",
      ).optional(),
    }).describe(
      "Output only. CloudSqlInstanceDataSourceProperties has a subset of Cloud SQL Instance properties that are useful at the Datasource level.",
    ).optional(),
    computeInstanceDatasourceProperties: z.object({
      description: z.string().describe(
        "The description of the Compute Engine instance.",
      ).optional(),
      machineType: z.string().describe("The machine type of the instance.")
        .optional(),
      name: z.string().describe(
        "Name of the compute instance backed up by the datasource.",
      ).optional(),
      totalDiskCount: z.string().describe(
        "The total number of disks attached to the Instance.",
      ).optional(),
      totalDiskSizeGb: z.string().describe("The sum of all the disk sizes.")
        .optional(),
    }).describe(
      "ComputeInstanceDataSourceProperties has a subset of Compute Instance properties that are useful at the Datasource level.",
    ).optional(),
    diskDatasourceProperties: z.object({
      description: z.string().describe("The description of the disk.")
        .optional(),
      name: z.string().describe("Name of the disk backed up by the datasource.")
        .optional(),
      sizeGb: z.string().describe("The size of the disk in GB.").optional(),
      type: z.string().describe("The type of the disk.").optional(),
    }).describe(
      "DiskDataSourceProperties has a subset of Disk properties that are useful at the Datasource level.",
    ).optional(),
    filestoreInstanceDatasourceProperties: z.object({
      instanceCreateTime: z.string().describe(
        "Output only. The instance creation timestamp.",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the Filestore instance backed up by the datasource.",
      ).optional(),
    }).describe(
      "Output only. FilestoreInstanceDataSourceProperties has a subset of FileStore instance properties that are useful at the Datasource level.",
    ).optional(),
    gcpResourcename: z.string().describe(
      "Output only. Full resource pathname URL of the source Google Cloud resource.",
    ).optional(),
    location: z.string().describe(
      'Location of the resource: //"global"/"unspecified".',
    ).optional(),
    type: z.string().describe(
      "The type of the Google Cloud resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance.",
    ).optional(),
  }).describe(
    "The backed up resource is a Google Cloud resource. The word 'DataSource' was included in the names to indicate that this is the representation of the Google Cloud resource used within the DataSource object.",
  ).optional(),
  etag: z.string().describe(
    "Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata. No labels currently defined:",
  ).optional(),
  name: z.string().describe(
    'Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault.',
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ERROR",
  ]).describe("Output only. The DataSource resource instance state.")
    .optional(),
  totalStoredBytes: z.string().describe(
    "The number of bytes (metadata and data) stored in this datasource.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the instance was updated.",
  ).optional(),
  allowMissing: z.string().describe("Optional. Enable upsert.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupBlockedByVaultAccessRestriction: z.boolean().optional(),
  backupConfigInfo: z.object({
    backupApplianceBackupConfig: z.object({
      applicationName: z.string(),
      backupApplianceId: z.string(),
      backupApplianceName: z.string(),
      hostName: z.string(),
      slaId: z.string(),
      slpName: z.string(),
      sltName: z.string(),
    }),
    gcpBackupConfig: z.object({
      backupPlan: z.string(),
      backupPlanAssociation: z.string(),
      backupPlanDescription: z.string(),
      backupPlanRevisionId: z.string(),
      backupPlanRevisionName: z.string(),
      backupPlanRules: z.array(z.string()),
    }),
    lastBackupError: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    lastBackupState: z.string(),
    lastSuccessfulBackupConsistencyTime: z.string(),
  }).optional(),
  backupCount: z.string().optional(),
  configState: z.string().optional(),
  createTime: z.string().optional(),
  dataSourceBackupApplianceApplication: z.object({
    applianceId: z.string(),
    applicationId: z.string(),
    applicationName: z.string(),
    backupAppliance: z.string(),
    hostId: z.string(),
    hostname: z.string(),
    type: z.string(),
  }).optional(),
  dataSourceGcpResource: z.object({
    alloyDbClusterDatasourceProperties: z.object({
      clusterUid: z.string(),
      name: z.string(),
      pitrWindows: z.array(z.object({
        endTime: z.string(),
        logRetentionDays: z.string(),
        startTime: z.string(),
      })),
    }),
    cloudSqlInstanceDatasourceProperties: z.object({
      databaseInstalledVersion: z.string(),
      instanceCreateTime: z.string(),
      instanceTier: z.string(),
      name: z.string(),
    }),
    computeInstanceDatasourceProperties: z.object({
      description: z.string(),
      machineType: z.string(),
      name: z.string(),
      totalDiskCount: z.string(),
      totalDiskSizeGb: z.string(),
    }),
    diskDatasourceProperties: z.object({
      description: z.string(),
      name: z.string(),
      sizeGb: z.string(),
      type: z.string(),
    }),
    filestoreInstanceDatasourceProperties: z.object({
      instanceCreateTime: z.string(),
      name: z.string(),
    }),
    gcpResourcename: z.string(),
    location: z.string(),
    type: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  state: z.string().optional(),
  totalStoredBytes: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  backupBlockedByVaultAccessRestriction: z.boolean().describe(
    "Output only. This field is set to true if the backup is blocked by vault access restriction.",
  ).optional(),
  backupConfigInfo: z.object({
    backupApplianceBackupConfig: z.object({
      applicationName: z.string().describe("The name of the application.")
        .optional(),
      backupApplianceId: z.string().describe("The ID of the backup appliance.")
        .optional(),
      backupApplianceName: z.string().describe(
        "The name of the backup appliance.",
      ).optional(),
      hostName: z.string().describe(
        "The name of the host where the application is running.",
      ).optional(),
      slaId: z.string().describe("The ID of the SLA of this application.")
        .optional(),
      slpName: z.string().describe(
        "The name of the SLP associated with the application.",
      ).optional(),
      sltName: z.string().describe(
        "The name of the SLT associated with the application.",
      ).optional(),
    }).describe(
      "Configuration for an application backed up by a Backup Appliance.",
    ).optional(),
    gcpBackupConfig: z.object({
      backupPlan: z.string().describe("The name of the backup plan.")
        .optional(),
      backupPlanAssociation: z.string().describe(
        "The name of the backup plan association.",
      ).optional(),
      backupPlanDescription: z.string().describe(
        "The description of the backup plan.",
      ).optional(),
      backupPlanRevisionId: z.string().describe(
        "The user friendly id of the backup plan revision. E.g. v0, v1 etc.",
      ).optional(),
      backupPlanRevisionName: z.string().describe(
        "The name of the backup plan revision.",
      ).optional(),
      backupPlanRules: z.array(z.string()).describe(
        "The names of the backup plan rules which point to this backupvault",
      ).optional(),
    }).describe("Configuration for a Google Cloud resource.").optional(),
    lastBackupError: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "Output only. If the last backup failed, this field has the error message.",
    ).optional(),
    lastBackupState: z.enum([
      "LAST_BACKUP_STATE_UNSPECIFIED",
      "FIRST_BACKUP_PENDING",
      "SUCCEEDED",
      "FAILED",
      "PERMISSION_DENIED",
    ]).describe(
      "Output only. The status of the last backup to this BackupVault",
    ).optional(),
    lastSuccessfulBackupConsistencyTime: z.string().describe(
      "Output only. If the last backup were successful, this field has the consistency date.",
    ).optional(),
  }).describe(
    "Output only. Details of how the resource is configured for backup.",
  ).optional(),
  backupCount: z.string().describe("Number of backups in the data source.")
    .optional(),
  configState: z.enum([
    "BACKUP_CONFIG_STATE_UNSPECIFIED",
    "ACTIVE",
    "PASSIVE",
    "PAUSED",
  ]).describe("Output only. The backup configuration state.").optional(),
  createTime: z.string().describe(
    "Output only. The time when the instance was created.",
  ).optional(),
  dataSourceBackupApplianceApplication: z.object({
    applianceId: z.string().describe("Appliance Id of the Backup Appliance.")
      .optional(),
    applicationId: z.string().describe(
      "The appid field of the application within the Backup Appliance.",
    ).optional(),
    applicationName: z.string().describe(
      "The name of the Application as known to the Backup Appliance.",
    ).optional(),
    backupAppliance: z.string().describe("Appliance name.").optional(),
    hostId: z.string().describe("Hostid of the application host.").optional(),
    hostname: z.string().describe(
      "Hostname of the host where the application is running.",
    ).optional(),
    type: z.string().describe("The type of the application. e.g. VMBackup")
      .optional(),
  }).describe("The backed up resource is a backup appliance application.")
    .optional(),
  dataSourceGcpResource: z.object({
    alloyDbClusterDatasourceProperties: z.object({
      clusterUid: z.string().describe(
        "Output only. The cluster UID of the AlloyDB cluster backed up by the datasource.",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the AlloyDB cluster backed up by the datasource.",
      ).optional(),
      pitrWindows: z.array(z.object({
        endTime: z.string().describe(
          "Output only. The end time of the PITR window. It is not set if the corresponding Backup Plan Association is active.",
        ).optional(),
        logRetentionDays: z.string().describe(
          "Output only. Log retention days for the PITR window.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The start time of the PITR window.",
        ).optional(),
      })).describe(
        "Output only. Point in time recovery windows. The order is guaranteed to be ascending by start time.",
      ).optional(),
    }).describe(
      "Output only. AlloyDBClusterDataSourceProperties has a subset of AlloyDB cluster properties that are useful at the Datasource level. Currently none of its child properties are auditable. If new auditable properties are added, the AUDIT annotation should be added.",
    ).optional(),
    cloudSqlInstanceDatasourceProperties: z.object({
      databaseInstalledVersion: z.string().describe(
        "Output only. The installed database version of the Cloud SQL instance.",
      ).optional(),
      instanceCreateTime: z.string().describe(
        "Output only. The instance creation timestamp.",
      ).optional(),
      instanceTier: z.string().describe(
        "Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840`",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the Cloud SQL instance backed up by the datasource. Format: projects/{project}/instances/{instance}",
      ).optional(),
    }).describe(
      "Output only. CloudSqlInstanceDataSourceProperties has a subset of Cloud SQL Instance properties that are useful at the Datasource level.",
    ).optional(),
    computeInstanceDatasourceProperties: z.object({
      description: z.string().describe(
        "The description of the Compute Engine instance.",
      ).optional(),
      machineType: z.string().describe("The machine type of the instance.")
        .optional(),
      name: z.string().describe(
        "Name of the compute instance backed up by the datasource.",
      ).optional(),
      totalDiskCount: z.string().describe(
        "The total number of disks attached to the Instance.",
      ).optional(),
      totalDiskSizeGb: z.string().describe("The sum of all the disk sizes.")
        .optional(),
    }).describe(
      "ComputeInstanceDataSourceProperties has a subset of Compute Instance properties that are useful at the Datasource level.",
    ).optional(),
    diskDatasourceProperties: z.object({
      description: z.string().describe("The description of the disk.")
        .optional(),
      name: z.string().describe("Name of the disk backed up by the datasource.")
        .optional(),
      sizeGb: z.string().describe("The size of the disk in GB.").optional(),
      type: z.string().describe("The type of the disk.").optional(),
    }).describe(
      "DiskDataSourceProperties has a subset of Disk properties that are useful at the Datasource level.",
    ).optional(),
    filestoreInstanceDatasourceProperties: z.object({
      instanceCreateTime: z.string().describe(
        "Output only. The instance creation timestamp.",
      ).optional(),
      name: z.string().describe(
        "Output only. Name of the Filestore instance backed up by the datasource.",
      ).optional(),
    }).describe(
      "Output only. FilestoreInstanceDataSourceProperties has a subset of FileStore instance properties that are useful at the Datasource level.",
    ).optional(),
    gcpResourcename: z.string().describe(
      "Output only. Full resource pathname URL of the source Google Cloud resource.",
    ).optional(),
    location: z.string().describe(
      'Location of the resource: //"global"/"unspecified".',
    ).optional(),
    type: z.string().describe(
      "The type of the Google Cloud resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance.",
    ).optional(),
  }).describe(
    "The backed up resource is a Google Cloud resource. The word 'DataSource' was included in the names to indicate that this is the representation of the Google Cloud resource used within the DataSource object.",
  ).optional(),
  etag: z.string().describe(
    "Server specified ETag for the ManagementServer resource to prevent simultaneous updates from overwiting each other.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata. No labels currently defined:",
  ).optional(),
  name: z.string().describe(
    'Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault.',
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ERROR",
  ]).describe("Output only. The DataSource resource instance state.")
    .optional(),
  totalStoredBytes: z.string().describe(
    "The number of bytes (metadata and data) stored in this datasource.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the instance was updated.",
  ).optional(),
  allowMissing: z.string().describe("Optional. Enable upsert.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Backup and DR Service BackupVaults.DataSources. Registered at `@swamp/gcp/backupdr/backupvaults-datasources`. */
export const model = {
  type: "@swamp/gcp/backupdr/backupvaults-datasources",
  version: "2026.10.08.1",
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
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
      toVersion: "2026.09.07.1",
      description: "Added: allowMissing, requestId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Message describing a DataSource object. Datasource object used to represent D...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
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
    update: {
      description: "Update dataSources attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific dataSources by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["backupBlockedByVaultAccessRestriction"] !== undefined) {
          body["backupBlockedByVaultAccessRestriction"] =
            g["backupBlockedByVaultAccessRestriction"];
        }
        if (g["backupConfigInfo"] !== undefined) {
          body["backupConfigInfo"] = g["backupConfigInfo"];
        }
        if (g["backupCount"] !== undefined) {
          body["backupCount"] = g["backupCount"];
        }
        if (g["configState"] !== undefined) {
          body["configState"] = g["configState"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["dataSourceBackupApplianceApplication"] !== undefined) {
          body["dataSourceBackupApplianceApplication"] =
            g["dataSourceBackupApplianceApplication"];
        }
        if (g["dataSourceGcpResource"] !== undefined) {
          body["dataSourceGcpResource"] = g["dataSourceGcpResource"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["totalStoredBytes"] !== undefined) {
          body["totalStoredBytes"] = g["totalStoredBytes"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        } else if (existing["requestId"] !== undefined) {
          params["requestId"] = String(existing["requestId"]);
        }
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR"],
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
      description: "Delete the dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
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
      description: "Sync dataSources state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific dataSources by name (e.g. one discovered by list)",
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
      description: "List dataSources resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results.").optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
          "dataSources",
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
    abandon_backup: {
      description: "abandon backup",
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
        params["dataSource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.abandonBackup",
            "path": "v1/{+dataSource}:abandonBackup",
            "httpMethod": "POST",
            "parameterOrder": ["dataSource"],
            "parameters": {
              "dataSource": { "location": "path", "required": true },
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
    fetch_access_token: {
      description: "fetch access token",
      arguments: z.object({
        generationId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["generationId"] !== undefined) {
          body["generationId"] = args["generationId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.fetchAccessToken",
            "path": "v1/{+name}:fetchAccessToken",
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
    finalize_backup: {
      description: "finalize backup",
      arguments: z.object({
        backupId: z.any().optional(),
        consistencyTime: z.any().optional(),
        description: z.any().optional(),
        recoveryRangeEndTime: z.any().optional(),
        recoveryRangeStartTime: z.any().optional(),
        requestId: z.any().optional(),
        retentionDuration: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["dataSource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["backupId"] !== undefined) body["backupId"] = args["backupId"];
        if (args["consistencyTime"] !== undefined) {
          body["consistencyTime"] = args["consistencyTime"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["recoveryRangeEndTime"] !== undefined) {
          body["recoveryRangeEndTime"] = args["recoveryRangeEndTime"];
        }
        if (args["recoveryRangeStartTime"] !== undefined) {
          body["recoveryRangeStartTime"] = args["recoveryRangeStartTime"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["retentionDuration"] !== undefined) {
          body["retentionDuration"] = args["retentionDuration"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.finalizeBackup",
            "path": "v1/{+dataSource}:finalizeBackup",
            "httpMethod": "POST",
            "parameterOrder": ["dataSource"],
            "parameters": {
              "dataSource": { "location": "path", "required": true },
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
    initiate_backup: {
      description: "initiate backup",
      arguments: z.object({
        backupId: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["dataSource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["backupId"] !== undefined) body["backupId"] = args["backupId"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.initiateBackup",
            "path": "v1/{+dataSource}:initiateBackup",
            "httpMethod": "POST",
            "parameterOrder": ["dataSource"],
            "parameters": {
              "dataSource": { "location": "path", "required": true },
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
    set_internal_status: {
      description: "set internal status",
      arguments: z.object({
        backupConfigState: z.any().optional(),
        requestId: z.any().optional(),
        value: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["dataSource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["backupConfigState"] !== undefined) {
          body["backupConfigState"] = args["backupConfigState"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["value"] !== undefined) body["value"] = args["value"];
        const result = await createResource(
          baseUrl,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.setInternalStatus",
            "path": "v1/{+dataSource}:setInternalStatus",
            "httpMethod": "POST",
            "parameterOrder": ["dataSource"],
            "parameters": {
              "dataSource": { "location": "path", "required": true },
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
