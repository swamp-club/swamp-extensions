// Auto-generated extension model for @swamp/gcp/oracledatabase/dbsystems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud DbSystems.
 *
 * Details of the DbSystem (BaseDB) resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/DbSystem/
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
  return `${parent}/dbSystems/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.dbSystems.get",
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
  "id": "oracledatabase.projects.locations.dbSystems.create",
  "path": "v1/{+parent}/dbSystems",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dbSystemId": {
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
  "id": "oracledatabase.projects.locations.dbSystems.delete",
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
  displayName: z.string().describe(
    "Required. The display name for the System db. The name does not have to be unique within your project.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle DbSystem is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the DbSystem.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the DbSystem resource in the following format: projects/{project}/locations/{region}/dbSystems/{db_system}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the DbSystem. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. The name of the OdbSubnet associated with the DbSystem for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    computeCount: z.number().int().describe(
      "Required. The number of CPU cores to enable for the DbSystem.",
    ).optional(),
    computeModel: z.enum(["COMPUTE_MODEL_UNSPECIFIED", "ECPU", "OCPU"])
      .describe("Optional. The compute model of the DbSystem.").optional(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable data collection for diagnostics.",
      ).optional(),
      isIncidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable incident logs and trace collection.",
      ).optional(),
    }).describe("Data collection options for DbSystem.").optional(),
    dataStorageSizeGb: z.number().int().describe(
      "Optional. The data storage size in GB that is currently available to DbSystems.",
    ).optional(),
    databaseEdition: z.enum([
      "DB_SYSTEM_DATABASE_EDITION_UNSPECIFIED",
      "STANDARD_EDITION",
      "ENTERPRISE_EDITION",
      "ENTERPRISE_EDITION_HIGH_PERFORMANCE",
    ]).describe("Required. The database edition of the DbSystem.").optional(),
    dbHome: z.object({
      database: z.object({
        adminPassword: z.string().describe(
          "Optional. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
        ).optional(),
        adminPasswordSecretVersion: z.string().describe(
          "Optional. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
        ).optional(),
        characterSet: z.string().describe(
          "Optional. The character set for the database. The default is AL32UTF8.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The date and time that the Database was created.",
        ).optional(),
        databaseId: z.string().describe(
          "Optional. The database ID of the Database.",
        ).optional(),
        dbHomeName: z.string().describe(
          "Optional. The name of the DbHome resource associated with the Database.",
        ).optional(),
        dbName: z.string().describe(
          "Optional. The database name. The name must begin with an alphabetic character and can contain a maximum of eight alphanumeric characters. Special characters are not permitted.",
        ).optional(),
        dbUniqueName: z.string().describe(
          "Optional. The DB_UNIQUE_NAME of the Oracle Database being backed up.",
        ).optional(),
        gcpOracleZone: z.string().describe(
          "Output only. The GCP Oracle zone where the Database is created.",
        ).optional(),
        name: z.string().describe(
          "Identifier. The name of the Database resource in the following format: projects/{project}/locations/{region}/databases/{database}",
        ).optional(),
        ncharacterSet: z.string().describe(
          "Optional. The national character set for the database. The default is AL16UTF16.",
        ).optional(),
        ociUrl: z.string().describe(
          "Output only. HTTPS link to OCI resources exposed to Customer via UI Interface.",
        ).optional(),
        opsInsightsStatus: z.enum([
          "OPERATIONS_INSIGHTS_STATUS_UNSPECIFIED",
          "ENABLING",
          "ENABLED",
          "DISABLING",
          "NOT_ENABLED",
          "FAILED_ENABLING",
          "FAILED_DISABLING",
        ]).describe(
          "Output only. The Status of Operations Insights for this Database.",
        ).optional(),
        pluggableDatabaseId: z.string().describe(
          "Optional. The ID of the pluggable database associated with the Database. The ID must be unique within the project and location.",
        ).optional(),
        pluggableDatabaseName: z.string().describe(
          "Optional. The pluggable database associated with the Database. The name must begin with an alphabetic character and can contain a maximum of thirty alphanumeric characters.",
        ).optional(),
        properties: z.object({
          databaseManagementConfig: z.object({
            managementState: z.unknown().describe(
              "Output only. The status of the Database Management service.",
            ).optional(),
            managementType: z.unknown().describe(
              "Output only. The Database Management type.",
            ).optional(),
          }).describe("The configuration of the Database Management service.")
            .optional(),
          dbBackupConfig: z.object({
            autoBackupEnabled: z.unknown().describe(
              "Optional. If set to true, enables automatic backups on the database.",
            ).optional(),
            autoFullBackupDay: z.unknown().describe(
              "Optional. The day of the week on which the full backup should be performed on the database. If no value is provided, it will default to Sunday.",
            ).optional(),
            autoFullBackupWindow: z.unknown().describe(
              "Optional. The window in which the full backup should be performed on the database. If no value is provided, the default is anytime.",
            ).optional(),
            autoIncrementalBackupWindow: z.unknown().describe(
              "Optional. The window in which the incremental backup should be performed on the database. If no value is provided, the default is anytime except the auto full backup day.",
            ).optional(),
            backupDeletionPolicy: z.unknown().describe(
              "Optional. This defines when the backups will be deleted after Database termination.",
            ).optional(),
            backupDestinationDetails: z.unknown().describe(
              "Optional. Details of the database backup destinations.",
            ).optional(),
            retentionPeriodDays: z.unknown().describe(
              "Optional. The number of days an automatic backup is retained before being automatically deleted. This value determines the earliest point in time to which a database can be restored. Min: 1, Max: 60.",
            ).optional(),
          }).describe("Backup Options for the Database.").optional(),
          dbVersion: z.string().describe(
            "Required. The Oracle Database version.",
          ).optional(),
          state: z.enum([
            "DATABASE_LIFECYCLE_STATE_UNSPECIFIED",
            "PROVISIONING",
            "AVAILABLE",
            "UPDATING",
            "BACKUP_IN_PROGRESS",
            "UPGRADING",
            "CONVERTING",
            "TERMINATING",
            "TERMINATED",
            "RESTORE_FAILED",
            "FAILED",
          ]).describe("Output only. State of the Database.").optional(),
        }).describe("The properties of a Database.").optional(),
        tdeWalletPassword: z.string().describe(
          "Optional. The TDE wallet password for the database. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated.",
        ).optional(),
        tdeWalletPasswordSecretVersion: z.string().describe(
          "Optional. The resource name of a secret version in Secret Manager which contains the TDE wallet password for the database. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated.",
        ).optional(),
      }).describe(
        "Details of the Database resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/Database/",
      ).optional(),
      dbVersion: z.string().describe(
        "Required. A valid Oracle Database version. For a list of supported versions, use the ListDbVersions operation.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. The display name for the Database Home. The name does not have to be unique within your project.",
      ).optional(),
      isUnifiedAuditingEnabled: z.boolean().describe(
        "Optional. Whether unified auditing is enabled for the Database Home.",
      ).optional(),
    }).describe("Details of the Database Home resource.").optional(),
    dbSystemOptions: z.object({
      storageManagement: z.enum([
        "STORAGE_MANAGEMENT_UNSPECIFIED",
        "ASM",
        "LVM",
      ]).describe("Optional. The storage option used in DB system.").optional(),
    }).describe("Details of the DbSystem Options.").optional(),
    domain: z.string().describe(
      "Optional. The host domain name of the DbSystem.",
    ).optional(),
    hostname: z.string().describe("Output only. The hostname of the DbSystem.")
      .optional(),
    hostnamePrefix: z.string().describe(
      "Optional. Prefix for DB System host names.",
    ).optional(),
    initialDataStorageSizeGb: z.number().int().describe(
      "Required. The initial data storage size in GB.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Required. The license model of the DbSystem.").optional(),
    lifecycleState: z.enum([
      "DB_SYSTEM_LIFECYCLE_STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MIGRATED",
      "MAINTENANCE_IN_PROGRESS",
      "NEEDS_ATTENTION",
      "UPGRADING",
    ]).describe("Output only. State of the DbSystem.").optional(),
    memorySizeGb: z.number().int().describe("Optional. The memory size in GB.")
      .optional(),
    nodeCount: z.number().int().describe(
      "Optional. The number of nodes in the DbSystem.",
    ).optional(),
    ocid: z.string().describe("Output only. OCID of the DbSystem.").optional(),
    privateIp: z.string().describe(
      "Optional. The private IP address of the DbSystem.",
    ).optional(),
    recoStorageSizeGb: z.number().int().describe(
      "Optional. The reco/redo storage size in GB.",
    ).optional(),
    shape: z.string().describe("Required. Shape of DB System.").optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Required. SSH public keys to be stored with the DbSystem.",
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
  }).describe("The properties of a DbSystem.").optional(),
  dbSystemId: z.string().describe(
    "Required. The ID of the DbSystem to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  ociUrl: z.string().optional(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  properties: z.object({
    computeCount: z.number(),
    computeModel: z.string(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean(),
      isIncidentLogsEnabled: z.boolean(),
    }),
    dataStorageSizeGb: z.number(),
    databaseEdition: z.string(),
    dbHome: z.object({
      database: z.object({
        adminPassword: z.string(),
        adminPasswordSecretVersion: z.string(),
        characterSet: z.string(),
        createTime: z.string(),
        databaseId: z.string(),
        dbHomeName: z.string(),
        dbName: z.string(),
        dbUniqueName: z.string(),
        gcpOracleZone: z.string(),
        name: z.string(),
        ncharacterSet: z.string(),
        ociUrl: z.string(),
        opsInsightsStatus: z.string(),
        pluggableDatabaseId: z.string(),
        pluggableDatabaseName: z.string(),
        properties: z.object({
          databaseManagementConfig: z.object({
            managementState: z.unknown(),
            managementType: z.unknown(),
          }),
          dbBackupConfig: z.object({
            autoBackupEnabled: z.unknown(),
            autoFullBackupDay: z.unknown(),
            autoFullBackupWindow: z.unknown(),
            autoIncrementalBackupWindow: z.unknown(),
            backupDeletionPolicy: z.unknown(),
            backupDestinationDetails: z.unknown(),
            retentionPeriodDays: z.unknown(),
          }),
          dbVersion: z.string(),
          state: z.string(),
        }),
        tdeWalletPassword: z.string(),
        tdeWalletPasswordSecretVersion: z.string(),
      }),
      dbVersion: z.string(),
      displayName: z.string(),
      isUnifiedAuditingEnabled: z.boolean(),
    }),
    dbSystemOptions: z.object({
      storageManagement: z.string(),
    }),
    domain: z.string(),
    hostname: z.string(),
    hostnamePrefix: z.string(),
    initialDataStorageSizeGb: z.number(),
    licenseModel: z.string(),
    lifecycleState: z.string(),
    memorySizeGb: z.number(),
    nodeCount: z.number(),
    ocid: z.string(),
    privateIp: z.string(),
    recoStorageSizeGb: z.number(),
    shape: z.string(),
    sshPublicKeys: z.array(z.string()),
    timeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Required. The display name for the System db. The name does not have to be unique within your project.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle DbSystem is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the DbSystem.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the DbSystem resource in the following format: projects/{project}/locations/{region}/dbSystems/{db_system}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. The name of the OdbNetwork associated with the DbSystem. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Required. The name of the OdbSubnet associated with the DbSystem for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    computeCount: z.number().int().describe(
      "Required. The number of CPU cores to enable for the DbSystem.",
    ).optional(),
    computeModel: z.enum(["COMPUTE_MODEL_UNSPECIFIED", "ECPU", "OCPU"])
      .describe("Optional. The compute model of the DbSystem.").optional(),
    dataCollectionOptions: z.object({
      isDiagnosticsEventsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable data collection for diagnostics.",
      ).optional(),
      isIncidentLogsEnabled: z.boolean().describe(
        "Optional. Indicates whether to enable incident logs and trace collection.",
      ).optional(),
    }).describe("Data collection options for DbSystem.").optional(),
    dataStorageSizeGb: z.number().int().describe(
      "Optional. The data storage size in GB that is currently available to DbSystems.",
    ).optional(),
    databaseEdition: z.enum([
      "DB_SYSTEM_DATABASE_EDITION_UNSPECIFIED",
      "STANDARD_EDITION",
      "ENTERPRISE_EDITION",
      "ENTERPRISE_EDITION_HIGH_PERFORMANCE",
    ]).describe("Required. The database edition of the DbSystem.").optional(),
    dbHome: z.object({
      database: z.object({
        adminPassword: z.string().describe(
          "Optional. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
        ).optional(),
        adminPasswordSecretVersion: z.string().describe(
          "Optional. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
        ).optional(),
        characterSet: z.string().describe(
          "Optional. The character set for the database. The default is AL32UTF8.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The date and time that the Database was created.",
        ).optional(),
        databaseId: z.string().describe(
          "Optional. The database ID of the Database.",
        ).optional(),
        dbHomeName: z.string().describe(
          "Optional. The name of the DbHome resource associated with the Database.",
        ).optional(),
        dbName: z.string().describe(
          "Optional. The database name. The name must begin with an alphabetic character and can contain a maximum of eight alphanumeric characters. Special characters are not permitted.",
        ).optional(),
        dbUniqueName: z.string().describe(
          "Optional. The DB_UNIQUE_NAME of the Oracle Database being backed up.",
        ).optional(),
        gcpOracleZone: z.string().describe(
          "Output only. The GCP Oracle zone where the Database is created.",
        ).optional(),
        name: z.string().describe(
          "Identifier. The name of the Database resource in the following format: projects/{project}/locations/{region}/databases/{database}",
        ).optional(),
        ncharacterSet: z.string().describe(
          "Optional. The national character set for the database. The default is AL16UTF16.",
        ).optional(),
        ociUrl: z.string().describe(
          "Output only. HTTPS link to OCI resources exposed to Customer via UI Interface.",
        ).optional(),
        opsInsightsStatus: z.enum([
          "OPERATIONS_INSIGHTS_STATUS_UNSPECIFIED",
          "ENABLING",
          "ENABLED",
          "DISABLING",
          "NOT_ENABLED",
          "FAILED_ENABLING",
          "FAILED_DISABLING",
        ]).describe(
          "Output only. The Status of Operations Insights for this Database.",
        ).optional(),
        pluggableDatabaseId: z.string().describe(
          "Optional. The ID of the pluggable database associated with the Database. The ID must be unique within the project and location.",
        ).optional(),
        pluggableDatabaseName: z.string().describe(
          "Optional. The pluggable database associated with the Database. The name must begin with an alphabetic character and can contain a maximum of thirty alphanumeric characters.",
        ).optional(),
        properties: z.object({
          databaseManagementConfig: z.object({
            managementState: z.unknown().describe(
              "Output only. The status of the Database Management service.",
            ).optional(),
            managementType: z.unknown().describe(
              "Output only. The Database Management type.",
            ).optional(),
          }).describe("The configuration of the Database Management service.")
            .optional(),
          dbBackupConfig: z.object({
            autoBackupEnabled: z.unknown().describe(
              "Optional. If set to true, enables automatic backups on the database.",
            ).optional(),
            autoFullBackupDay: z.unknown().describe(
              "Optional. The day of the week on which the full backup should be performed on the database. If no value is provided, it will default to Sunday.",
            ).optional(),
            autoFullBackupWindow: z.unknown().describe(
              "Optional. The window in which the full backup should be performed on the database. If no value is provided, the default is anytime.",
            ).optional(),
            autoIncrementalBackupWindow: z.unknown().describe(
              "Optional. The window in which the incremental backup should be performed on the database. If no value is provided, the default is anytime except the auto full backup day.",
            ).optional(),
            backupDeletionPolicy: z.unknown().describe(
              "Optional. This defines when the backups will be deleted after Database termination.",
            ).optional(),
            backupDestinationDetails: z.unknown().describe(
              "Optional. Details of the database backup destinations.",
            ).optional(),
            retentionPeriodDays: z.unknown().describe(
              "Optional. The number of days an automatic backup is retained before being automatically deleted. This value determines the earliest point in time to which a database can be restored. Min: 1, Max: 60.",
            ).optional(),
          }).describe("Backup Options for the Database.").optional(),
          dbVersion: z.string().describe(
            "Required. The Oracle Database version.",
          ).optional(),
          state: z.enum([
            "DATABASE_LIFECYCLE_STATE_UNSPECIFIED",
            "PROVISIONING",
            "AVAILABLE",
            "UPDATING",
            "BACKUP_IN_PROGRESS",
            "UPGRADING",
            "CONVERTING",
            "TERMINATING",
            "TERMINATED",
            "RESTORE_FAILED",
            "FAILED",
          ]).describe("Output only. State of the Database.").optional(),
        }).describe("The properties of a Database.").optional(),
        tdeWalletPassword: z.string().describe(
          "Optional. The TDE wallet password for the database. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated.",
        ).optional(),
        tdeWalletPasswordSecretVersion: z.string().describe(
          "Optional. The resource name of a secret version in Secret Manager which contains the TDE wallet password for the database. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated.",
        ).optional(),
      }).describe(
        "Details of the Database resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/Database/",
      ).optional(),
      dbVersion: z.string().describe(
        "Required. A valid Oracle Database version. For a list of supported versions, use the ListDbVersions operation.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. The display name for the Database Home. The name does not have to be unique within your project.",
      ).optional(),
      isUnifiedAuditingEnabled: z.boolean().describe(
        "Optional. Whether unified auditing is enabled for the Database Home.",
      ).optional(),
    }).describe("Details of the Database Home resource.").optional(),
    dbSystemOptions: z.object({
      storageManagement: z.enum([
        "STORAGE_MANAGEMENT_UNSPECIFIED",
        "ASM",
        "LVM",
      ]).describe("Optional. The storage option used in DB system.").optional(),
    }).describe("Details of the DbSystem Options.").optional(),
    domain: z.string().describe(
      "Optional. The host domain name of the DbSystem.",
    ).optional(),
    hostname: z.string().describe("Output only. The hostname of the DbSystem.")
      .optional(),
    hostnamePrefix: z.string().describe(
      "Optional. Prefix for DB System host names.",
    ).optional(),
    initialDataStorageSizeGb: z.number().int().describe(
      "Required. The initial data storage size in GB.",
    ).optional(),
    licenseModel: z.enum([
      "LICENSE_MODEL_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe("Required. The license model of the DbSystem.").optional(),
    lifecycleState: z.enum([
      "DB_SYSTEM_LIFECYCLE_STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
      "MIGRATED",
      "MAINTENANCE_IN_PROGRESS",
      "NEEDS_ATTENTION",
      "UPGRADING",
    ]).describe("Output only. State of the DbSystem.").optional(),
    memorySizeGb: z.number().int().describe("Optional. The memory size in GB.")
      .optional(),
    nodeCount: z.number().int().describe(
      "Optional. The number of nodes in the DbSystem.",
    ).optional(),
    ocid: z.string().describe("Output only. OCID of the DbSystem.").optional(),
    privateIp: z.string().describe(
      "Optional. The private IP address of the DbSystem.",
    ).optional(),
    recoStorageSizeGb: z.number().int().describe(
      "Optional. The reco/redo storage size in GB.",
    ).optional(),
    shape: z.string().describe("Required. Shape of DB System.").optional(),
    sshPublicKeys: z.array(z.string()).describe(
      "Required. SSH public keys to be stored with the DbSystem.",
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
  }).describe("The properties of a DbSystem.").optional(),
  dbSystemId: z.string().describe(
    "Required. The ID of the DbSystem to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud DbSystems. Registered at `@swamp/gcp/oracledatabase/dbsystems`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/dbsystems",
  version: "2026.05.20.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Details of the DbSystem (BaseDB) resource. https://docs.oracle.com/en-us/iaas...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dbSystems",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gcpOracleZone"] !== undefined) {
          body["gcpOracleZone"] = g["gcpOracleZone"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["dbSystemId"] !== undefined) body["dbSystemId"] = g["dbSystemId"];
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
      description: "Get a dbSystems",
      arguments: z.object({
        identifier: z.string().describe("The name of the dbSystems"),
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
      description: "Delete the dbSystems",
      arguments: z.object({
        identifier: z.string().describe("The name of the dbSystems"),
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
      description: "Sync dbSystems state from GCP",
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
