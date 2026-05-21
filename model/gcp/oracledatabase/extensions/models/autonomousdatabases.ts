// Auto-generated extension model for @swamp/gcp/oracledatabase/autonomousdatabases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud AutonomousDatabases.
 *
 * Details of the Autonomous Database resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/AutonomousDatabase/
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
  return `${parent}/autonomousDatabases/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.autonomousDatabases.get",
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
  "id": "oracledatabase.projects.locations.autonomousDatabases.create",
  "path": "v1/{+parent}/autonomousDatabases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "autonomousDatabaseId": {
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
  "id": "oracledatabase.projects.locations.autonomousDatabases.patch",
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
  "id": "oracledatabase.projects.locations.autonomousDatabases.delete",
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

const LIST_CONFIG = {
  "id": "oracledatabase.projects.locations.autonomousDatabases.list",
  "path": "v1/{+parent}/autonomousDatabases",
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
  adminPassword: z.string().describe(
    "Optional. Immutable. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
  ).optional(),
  adminPasswordSecretVersion: z.string().describe(
    "Optional. Immutable. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
  ).optional(),
  cidr: z.string().describe(
    "Optional. Immutable. The subnet CIDR range for the Autonomous Database.",
  ).optional(),
  database: z.string().describe(
    "Optional. Immutable. The name of the Autonomous Database. The database name must be unique in the project. The name must begin with a letter and can contain a maximum of 30 alphanumeric characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Immutable. The display name for the Autonomous Database. The name does not have to be unique within your project.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the Autonomous Database.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the Autonomous Database resource in the following format: projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database}",
  ).optional(),
  network: z.string().describe(
    "Optional. Immutable. The name of the VPC network used by the Autonomous Database in the following format: projects/{project}/global/networks/{network}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. Immutable. The name of the OdbNetwork associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. Immutable. The name of the OdbSubnet associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    actualUsedDataStorageSizeTb: z.number().describe(
      "Output only. The amount of storage currently being used for user and system data, in terabytes.",
    ).optional(),
    allocatedStorageSizeTb: z.number().describe(
      "Output only. The amount of storage currently allocated for the database tables and billed for, rounded up in terabytes.",
    ).optional(),
    allowlistedIps: z.array(z.string()).describe(
      "Optional. Immutable. The list of allowlisted IP addresses for the Autonomous Database.",
    ).optional(),
    apexDetails: z.object({
      apexVersion: z.string().describe(
        "Output only. The Oracle APEX Application Development version.",
      ).optional(),
      ordsVersion: z.string().describe(
        "Output only. The Oracle REST Data Services (ORDS) version.",
      ).optional(),
    }).describe(
      "Oracle APEX Application Development. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseApex",
    ).optional(),
    arePrimaryAllowlistedIpsUsed: z.boolean().describe(
      "Output only. This field indicates the status of Data Guard and Access control for the Autonomous Database. The field's value is null if Data Guard is disabled or Access Control is disabled. The field's value is TRUE if both Data Guard and Access Control are enabled, and the Autonomous Database is using primary IP access control list (ACL) for standby. The field's value is FALSE if both Data Guard and Access Control are enabled, and the Autonomous Database is using a different IP access control list (ACL) for standby compared to primary.",
    ).optional(),
    autonomousContainerDatabaseId: z.string().describe(
      "Output only. The Autonomous Container Database OCID.",
    ).optional(),
    availableUpgradeVersions: z.array(z.string()).describe(
      "Output only. The list of available Oracle Database upgrade versions for an Autonomous Database.",
    ).optional(),
    backupRetentionPeriodDays: z.number().int().describe(
      "Optional. Immutable. The retention period for the Autonomous Database. This field is specified in days, can range from 1 day to 60 days, and has a default value of 60 days.",
    ).optional(),
    characterSet: z.string().describe(
      "Optional. Immutable. The character set for the Autonomous Database. The default is AL32UTF8.",
    ).optional(),
    computeCount: z.number().describe(
      "Optional. Immutable. The number of compute servers for the Autonomous Database.",
    ).optional(),
    connectionStrings: z.object({
      allConnectionStrings: z.object({
        high: z.string().describe(
          "Output only. The database service provides the highest level of resources to each SQL statement.",
        ).optional(),
        low: z.string().describe(
          "Output only. The database service provides the least level of resources to each SQL statement.",
        ).optional(),
        medium: z.string().describe(
          "Output only. The database service provides a lower level of resources to each SQL statement.",
        ).optional(),
      }).describe(
        "A list of all connection strings that can be used to connect to the Autonomous Database.",
      ).optional(),
      dedicated: z.string().describe(
        "Output only. The database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements.",
      ).optional(),
      high: z.string().describe(
        "Output only. The database service provides the highest level of resources to each SQL statement.",
      ).optional(),
      low: z.string().describe(
        "Output only. The database service provides the least level of resources to each SQL statement.",
      ).optional(),
      medium: z.string().describe(
        "Output only. The database service provides a lower level of resources to each SQL statement.",
      ).optional(),
      profiles: z.array(z.object({
        consumerGroup: z.enum([
          "CONSUMER_GROUP_UNSPECIFIED",
          "HIGH",
          "MEDIUM",
          "LOW",
          "TP",
          "TPURGENT",
        ]).describe(
          "Output only. The current consumer group being used by the connection.",
        ).optional(),
        displayName: z.string().describe(
          "Output only. The display name for the database connection.",
        ).optional(),
        hostFormat: z.enum(["HOST_FORMAT_UNSPECIFIED", "FQDN", "IP"]).describe(
          "Output only. The host name format being currently used in connection string.",
        ).optional(),
        isRegional: z.boolean().describe(
          "Output only. This field indicates if the connection string is regional and is only applicable for cross-region Data Guard.",
        ).optional(),
        protocol: z.enum(["PROTOCOL_UNSPECIFIED", "TCP", "TCPS"]).describe(
          "Output only. The protocol being used by the connection.",
        ).optional(),
        sessionMode: z.enum(["SESSION_MODE_UNSPECIFIED", "DIRECT", "INDIRECT"])
          .describe("Output only. The current session mode of the connection.")
          .optional(),
        syntaxFormat: z.enum([
          "SYNTAX_FORMAT_UNSPECIFIED",
          "LONG",
          "EZCONNECT",
          "EZCONNECTPLUS",
        ]).describe("Output only. The syntax of the connection string.")
          .optional(),
        tlsAuthentication: z.enum([
          "TLS_AUTHENTICATION_UNSPECIFIED",
          "SERVER",
          "MUTUAL",
        ]).describe(
          "Output only. This field indicates the TLS authentication type of the connection.",
        ).optional(),
        value: z.string().describe(
          "Output only. The value of the connection string.",
        ).optional(),
      })).describe(
        "Output only. A list of connection string profiles to allow clients to group, filter, and select values based on the structured metadata.",
      ).optional(),
    }).describe(
      "The connection string used to connect to the Autonomous Database. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionStrings",
    ).optional(),
    connectionUrls: z.object({
      apexUri: z.string().describe(
        "Output only. Oracle Application Express (APEX) URL.",
      ).optional(),
      databaseTransformsUri: z.string().describe(
        "Output only. The URL of the Database Transforms for the Autonomous Database.",
      ).optional(),
      graphStudioUri: z.string().describe(
        "Output only. The URL of the Graph Studio for the Autonomous Database.",
      ).optional(),
      machineLearningNotebookUri: z.string().describe(
        "Output only. The URL of the Oracle Machine Learning (OML) Notebook for the Autonomous Database.",
      ).optional(),
      machineLearningUserManagementUri: z.string().describe(
        "Output only. The URL of Machine Learning user management the Autonomous Database.",
      ).optional(),
      mongoDbUri: z.string().describe(
        "Output only. The URL of the MongoDB API for the Autonomous Database.",
      ).optional(),
      ordsUri: z.string().describe(
        "Output only. The Oracle REST Data Services (ORDS) URL of the Web Access for the Autonomous Database.",
      ).optional(),
      sqlDevWebUri: z.string().describe(
        "Output only. The URL of the Oracle SQL Developer Web for the Autonomous Database.",
      ).optional(),
    }).describe(
      "The URLs for accessing Oracle Application Express (APEX) and SQL Developer Web with a browser from a Compute instance. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionUrls",
    ).optional(),
    cpuCoreCount: z.number().int().describe(
      "Optional. Immutable. The number of CPU cores to be made available to the database.",
    ).optional(),
    customerContacts: z.array(z.object({
      email: z.string().describe(
        "Required. The email address used by Oracle to send notifications regarding databases and infrastructure.",
      ).optional(),
    })).describe("Optional. Immutable. The list of customer contacts.")
      .optional(),
    dataGuardRoleChangedTime: z.string().describe(
      "Output only. The date and time the Autonomous Data Guard role was changed for the standby Autonomous Database.",
    ).optional(),
    dataSafeState: z.enum([
      "DATA_SAFE_STATE_UNSPECIFIED",
      "REGISTERING",
      "REGISTERED",
      "DEREGISTERING",
      "NOT_REGISTERED",
      "FAILED",
    ]).describe(
      "Output only. The current state of the Data Safe registration for the Autonomous Database.",
    ).optional(),
    dataStorageSizeGb: z.number().int().describe(
      "Optional. Immutable. The size of the data stored in the database, in gigabytes.",
    ).optional(),
    dataStorageSizeTb: z.number().int().describe(
      "Optional. Immutable. The size of the data stored in the database, in terabytes.",
    ).optional(),
    databaseManagementState: z.enum([
      "DATABASE_MANAGEMENT_STATE_UNSPECIFIED",
      "ENABLING",
      "ENABLED",
      "DISABLING",
      "NOT_ENABLED",
      "FAILED_ENABLING",
      "FAILED_DISABLING",
    ]).describe(
      "Output only. The current state of database management for the Autonomous Database.",
    ).optional(),
    dbEdition: z.enum([
      "DATABASE_EDITION_UNSPECIFIED",
      "STANDARD_EDITION",
      "ENTERPRISE_EDITION",
    ]).describe("Optional. Immutable. The edition of the Autonomous Databases.")
      .optional(),
    dbVersion: z.string().describe(
      "Optional. Immutable. The Oracle Database version for the Autonomous Database.",
    ).optional(),
    dbWorkload: z.enum(["DB_WORKLOAD_UNSPECIFIED", "OLTP", "DW", "AJD", "APEX"])
      .describe(
        "Required. Immutable. The workload type of the Autonomous Database.",
      ).optional(),
    disasterRecoveryRoleChangedTime: z.string().describe(
      "Output only. The date and time the Disaster Recovery role was changed for the standby Autonomous Database.",
    ).optional(),
    encryptionKey: z.object({
      kmsKey: z.string().describe(
        "Optional. The KMS key used to encrypt the Autonomous Database. This field is required if the provider is GOOGLE_MANAGED. The name of the KMS key resource in the following format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
      provider: z.enum([
        "PROVIDER_UNSPECIFIED",
        "GOOGLE_MANAGED",
        "ORACLE_MANAGED",
      ]).describe("Optional. The provider of the encryption key.").optional(),
    }).describe("The encryption key used to encrypt the Autonomous Database.")
      .optional(),
    encryptionKeyHistoryEntries: z.array(z.object({
      activationTime: z.string().describe(
        "Output only. The date and time when the encryption key was activated on the Autonomous Database..",
      ).optional(),
      encryptionKey: z.object({
        kmsKey: z.string().describe(
          "Optional. The KMS key used to encrypt the Autonomous Database. This field is required if the provider is GOOGLE_MANAGED. The name of the KMS key resource in the following format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
        provider: z.enum([
          "PROVIDER_UNSPECIFIED",
          "GOOGLE_MANAGED",
          "ORACLE_MANAGED",
        ]).describe("Optional. The provider of the encryption key.").optional(),
      }).describe("The encryption key used to encrypt the Autonomous Database.")
        .optional(),
    })).describe(
      "Output only. The history of the encryption keys used to encrypt the Autonomous Database.",
    ).optional(),
    failedDataRecoveryDuration: z.string().describe(
      "Output only. This field indicates the number of seconds of data loss during a Data Guard failover.",
    ).optional(),
    isAutoScalingEnabled: z.boolean().describe(
      "Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database CPU core count.",
    ).optional(),
    isLocalDataGuardEnabled: z.boolean().describe(
      "Output only. Deprecated: Please use `local_data_guard_enabled` instead. This field indicates whether the Autonomous Database has local (in-region) Data Guard enabled.",
    ).optional(),
    isStorageAutoScalingEnabled: z.boolean().describe(
      "Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database storage.",
    ).optional(),
    licenseType: z.enum([
      "LICENSE_TYPE_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe(
      "Required. Immutable. The license type used for the Autonomous Database.",
    ).optional(),
    lifecycleDetails: z.string().describe(
      "Output only. The details of the current lifestyle state of the Autonomous Database.",
    ).optional(),
    localAdgAutoFailoverMaxDataLossLimit: z.number().int().describe(
      "Output only. Deprecated: Please use `local_adg_auto_failover_max_data_loss_limit_duration` instead. This field indicates the maximum data loss limit for an Autonomous Database, in seconds.",
    ).optional(),
    localAdgAutoFailoverMaxDataLossLimitDuration: z.number().int().describe(
      "Optional. This field indicates the maximum data loss limit for an Autonomous Database, in seconds.",
    ).optional(),
    localDataGuardEnabled: z.boolean().describe(
      "Optional. Indicates whether the Autonomous Database has a local (in-region) standby database. Not applicable to cross-region Data Guard or dedicated Exadata infrastructure.",
    ).optional(),
    localDisasterRecoveryType: z.enum([
      "LOCAL_DISASTER_RECOVERY_TYPE_UNSPECIFIED",
      "ADG",
      "BACKUP_BASED",
      "NOT_AVAILABLE",
    ]).describe(
      "Output only. This field indicates the local disaster recovery (DR) type of an Autonomous Database.",
    ).optional(),
    localStandbyDb: z.object({
      dataGuardRoleChangedTime: z.string().describe(
        "Output only. The date and time the Autonomous Data Guard role was switched for the standby Autonomous Database.",
      ).optional(),
      disasterRecoveryRoleChangedTime: z.string().describe(
        "Output only. The date and time the Disaster Recovery role was switched for the standby Autonomous Database.",
      ).optional(),
      lagTimeDuration: z.string().describe(
        "Output only. The amount of time, in seconds, that the data of the standby database lags in comparison to the data of the primary database.",
      ).optional(),
      lifecycleDetails: z.string().describe(
        "Output only. The additional details about the current lifecycle state of the Autonomous Database.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROVISIONING",
        "AVAILABLE",
        "STOPPING",
        "STOPPED",
        "STARTING",
        "TERMINATING",
        "TERMINATED",
        "UNAVAILABLE",
        "RESTORE_IN_PROGRESS",
        "RESTORE_FAILED",
        "BACKUP_IN_PROGRESS",
        "SCALE_IN_PROGRESS",
        "AVAILABLE_NEEDS_ATTENTION",
        "UPDATING",
        "MAINTENANCE_IN_PROGRESS",
        "RESTARTING",
        "RECREATING",
        "ROLE_CHANGE_IN_PROGRESS",
        "UPGRADING",
        "INACCESSIBLE",
        "STANDBY",
      ]).describe(
        "Output only. The current lifecycle state of the Autonomous Database.",
      ).optional(),
    }).describe(
      "Autonomous Data Guard standby database details. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseStandbySummary",
    ).optional(),
    maintenanceBeginTime: z.string().describe(
      "Output only. The date and time when maintenance will begin.",
    ).optional(),
    maintenanceEndTime: z.string().describe(
      "Output only. The date and time when maintenance will end.",
    ).optional(),
    maintenanceScheduleType: z.enum([
      "MAINTENANCE_SCHEDULE_TYPE_UNSPECIFIED",
      "EARLY",
      "REGULAR",
    ]).describe(
      "Optional. Immutable. The maintenance schedule of the Autonomous Database.",
    ).optional(),
    memoryPerOracleComputeUnitGbs: z.number().int().describe(
      "Output only. The amount of memory enabled per ECPU, in gigabytes.",
    ).optional(),
    memoryTableGbs: z.number().int().describe(
      "Output only. The memory assigned to in-memory tables in an Autonomous Database.",
    ).optional(),
    mtlsConnectionRequired: z.boolean().describe(
      "Optional. Immutable. This field specifies if the Autonomous Database requires mTLS connections.",
    ).optional(),
    nCharacterSet: z.string().describe(
      "Optional. Immutable. The national character set for the Autonomous Database. The default is AL16UTF16.",
    ).optional(),
    nextLongTermBackupTime: z.string().describe(
      "Output only. The long term backup schedule of the Autonomous Database.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. The Oracle Cloud Infrastructure link for the Autonomous Database.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. OCID of the Autonomous Database. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle",
    ).optional(),
    openMode: z.enum(["OPEN_MODE_UNSPECIFIED", "READ_ONLY", "READ_WRITE"])
      .describe(
        "Output only. This field indicates the current mode of the Autonomous Database.",
      ).optional(),
    operationsInsightsState: z.enum([
      "OPERATIONS_INSIGHTS_STATE_UNSPECIFIED",
      "ENABLING",
      "ENABLED",
      "DISABLING",
      "NOT_ENABLED",
      "FAILED_ENABLING",
      "FAILED_DISABLING",
    ]).describe(
      "Output only. This field indicates the state of Operations Insights for the Autonomous Database.",
    ).optional(),
    peerDbIds: z.array(z.string()).describe(
      "Output only. The list of OCIDs of standby databases located in Autonomous Data Guard remote regions that are associated with the source database.",
    ).optional(),
    permissionLevel: z.enum([
      "PERMISSION_LEVEL_UNSPECIFIED",
      "RESTRICTED",
      "UNRESTRICTED",
    ]).describe("Output only. The permission level of the Autonomous Database.")
      .optional(),
    privateEndpoint: z.string().describe(
      "Output only. The private endpoint for the Autonomous Database.",
    ).optional(),
    privateEndpointIp: z.string().describe(
      "Optional. Immutable. The private endpoint IP address for the Autonomous Database.",
    ).optional(),
    privateEndpointLabel: z.string().describe(
      "Optional. Immutable. The private endpoint label for the Autonomous Database.",
    ).optional(),
    refreshableMode: z.enum([
      "REFRESHABLE_MODE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "Output only. The refresh mode of the cloned Autonomous Database.",
    ).optional(),
    refreshableState: z.enum([
      "REFRESHABLE_STATE_UNSPECIFIED",
      "REFRESHING",
      "NOT_REFRESHING",
    ]).describe("Output only. The refresh State of the clone.").optional(),
    role: z.enum([
      "ROLE_UNSPECIFIED",
      "PRIMARY",
      "STANDBY",
      "DISABLED_STANDBY",
      "BACKUP_COPY",
      "SNAPSHOT_STANDBY",
    ]).describe("Output only. The Data Guard role of the Autonomous Database.")
      .optional(),
    scheduledOperationDetails: z.array(z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Output only. Day of week.").optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      stopTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Output only. The list and details of the scheduled operations of the Autonomous Database.",
    ).optional(),
    secretId: z.string().describe(
      "Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault secret.",
    ).optional(),
    serviceAgentEmail: z.string().describe(
      "Output only. An Oracle-managed Google Cloud service account on which customers can grant roles to access resources in the customer project.",
    ).optional(),
    sqlWebDeveloperUrl: z.string().describe(
      "Output only. The SQL Web Developer URL for the Autonomous Database.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "STOPPING",
      "STOPPED",
      "STARTING",
      "TERMINATING",
      "TERMINATED",
      "UNAVAILABLE",
      "RESTORE_IN_PROGRESS",
      "RESTORE_FAILED",
      "BACKUP_IN_PROGRESS",
      "SCALE_IN_PROGRESS",
      "AVAILABLE_NEEDS_ATTENTION",
      "UPDATING",
      "MAINTENANCE_IN_PROGRESS",
      "RESTARTING",
      "RECREATING",
      "ROLE_CHANGE_IN_PROGRESS",
      "UPGRADING",
      "INACCESSIBLE",
      "STANDBY",
    ]).describe(
      "Output only. The current lifecycle state of the Autonomous Database.",
    ).optional(),
    supportedCloneRegions: z.array(z.string()).describe(
      "Output only. The list of available regions that can be used to create a clone for the Autonomous Database.",
    ).optional(),
    totalAutoBackupStorageSizeGbs: z.number().describe(
      "Output only. The storage space used by automatic backups of Autonomous Database, in gigabytes.",
    ).optional(),
    usedDataStorageSizeTbs: z.number().int().describe(
      "Output only. The storage space used by Autonomous Database, in gigabytes.",
    ).optional(),
    vaultId: z.string().describe(
      "Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault.",
    ).optional(),
  }).describe("The properties of an Autonomous Database.").optional(),
  sourceConfig: z.object({
    automaticBackupsReplicationEnabled: z.boolean().describe(
      "Optional. This field specifies if the replication of automatic backups is enabled when creating a Data Guard.",
    ).optional(),
    autonomousDatabase: z.string().describe(
      "Optional. The name of the primary Autonomous Database that is used to create a Peer Autonomous Database from a source.",
    ).optional(),
  }).describe("The source configuration for the standby Autonomous Database.")
    .optional(),
  autonomousDatabaseId: z.string().describe(
    "Required. The ID of the Autonomous Database to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminPassword: z.string().optional(),
  adminPasswordSecretVersion: z.string().optional(),
  cidr: z.string().optional(),
  createTime: z.string().optional(),
  database: z.string().optional(),
  disasterRecoverySupportedLocations: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  odbNetwork: z.string().optional(),
  odbSubnet: z.string().optional(),
  peerAutonomousDatabases: z.array(z.string()).optional(),
  properties: z.object({
    actualUsedDataStorageSizeTb: z.number(),
    allocatedStorageSizeTb: z.number(),
    allowlistedIps: z.array(z.string()),
    apexDetails: z.object({
      apexVersion: z.string(),
      ordsVersion: z.string(),
    }),
    arePrimaryAllowlistedIpsUsed: z.boolean(),
    autonomousContainerDatabaseId: z.string(),
    availableUpgradeVersions: z.array(z.string()),
    backupRetentionPeriodDays: z.number(),
    characterSet: z.string(),
    computeCount: z.number(),
    connectionStrings: z.object({
      allConnectionStrings: z.object({
        high: z.string(),
        low: z.string(),
        medium: z.string(),
      }),
      dedicated: z.string(),
      high: z.string(),
      low: z.string(),
      medium: z.string(),
      profiles: z.array(z.object({
        consumerGroup: z.string(),
        displayName: z.string(),
        hostFormat: z.string(),
        isRegional: z.boolean(),
        protocol: z.string(),
        sessionMode: z.string(),
        syntaxFormat: z.string(),
        tlsAuthentication: z.string(),
        value: z.string(),
      })),
    }),
    connectionUrls: z.object({
      apexUri: z.string(),
      databaseTransformsUri: z.string(),
      graphStudioUri: z.string(),
      machineLearningNotebookUri: z.string(),
      machineLearningUserManagementUri: z.string(),
      mongoDbUri: z.string(),
      ordsUri: z.string(),
      sqlDevWebUri: z.string(),
    }),
    cpuCoreCount: z.number(),
    customerContacts: z.array(z.object({
      email: z.string(),
    })),
    dataGuardRoleChangedTime: z.string(),
    dataSafeState: z.string(),
    dataStorageSizeGb: z.number(),
    dataStorageSizeTb: z.number(),
    databaseManagementState: z.string(),
    dbEdition: z.string(),
    dbVersion: z.string(),
    dbWorkload: z.string(),
    disasterRecoveryRoleChangedTime: z.string(),
    encryptionKey: z.object({
      kmsKey: z.string(),
      provider: z.string(),
    }),
    encryptionKeyHistoryEntries: z.array(z.object({
      activationTime: z.string(),
      encryptionKey: z.object({
        kmsKey: z.string(),
        provider: z.string(),
      }),
    })),
    failedDataRecoveryDuration: z.string(),
    isAutoScalingEnabled: z.boolean(),
    isLocalDataGuardEnabled: z.boolean(),
    isStorageAutoScalingEnabled: z.boolean(),
    licenseType: z.string(),
    lifecycleDetails: z.string(),
    localAdgAutoFailoverMaxDataLossLimit: z.number(),
    localAdgAutoFailoverMaxDataLossLimitDuration: z.number(),
    localDataGuardEnabled: z.boolean(),
    localDisasterRecoveryType: z.string(),
    localStandbyDb: z.object({
      dataGuardRoleChangedTime: z.string(),
      disasterRecoveryRoleChangedTime: z.string(),
      lagTimeDuration: z.string(),
      lifecycleDetails: z.string(),
      state: z.string(),
    }),
    maintenanceBeginTime: z.string(),
    maintenanceEndTime: z.string(),
    maintenanceScheduleType: z.string(),
    memoryPerOracleComputeUnitGbs: z.number(),
    memoryTableGbs: z.number(),
    mtlsConnectionRequired: z.boolean(),
    nCharacterSet: z.string(),
    nextLongTermBackupTime: z.string(),
    ociUrl: z.string(),
    ocid: z.string(),
    openMode: z.string(),
    operationsInsightsState: z.string(),
    peerDbIds: z.array(z.string()),
    permissionLevel: z.string(),
    privateEndpoint: z.string(),
    privateEndpointIp: z.string(),
    privateEndpointLabel: z.string(),
    refreshableMode: z.string(),
    refreshableState: z.string(),
    role: z.string(),
    scheduledOperationDetails: z.array(z.object({
      dayOfWeek: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
      stopTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
    secretId: z.string(),
    serviceAgentEmail: z.string(),
    sqlWebDeveloperUrl: z.string(),
    state: z.string(),
    supportedCloneRegions: z.array(z.string()),
    totalAutoBackupStorageSizeGbs: z.number(),
    usedDataStorageSizeTbs: z.number(),
    vaultId: z.string(),
  }).optional(),
  sourceConfig: z.object({
    automaticBackupsReplicationEnabled: z.boolean(),
    autonomousDatabase: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adminPassword: z.string().describe(
    "Optional. Immutable. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
  ).optional(),
  adminPasswordSecretVersion: z.string().describe(
    "Optional. Immutable. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated.",
  ).optional(),
  cidr: z.string().describe(
    "Optional. Immutable. The subnet CIDR range for the Autonomous Database.",
  ).optional(),
  database: z.string().describe(
    "Optional. Immutable. The name of the Autonomous Database. The database name must be unique in the project. The name must begin with a letter and can contain a maximum of 30 alphanumeric characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Immutable. The display name for the Autonomous Database. The name does not have to be unique within your project.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the Autonomous Database.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the Autonomous Database resource in the following format: projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database}",
  ).optional(),
  network: z.string().describe(
    "Optional. Immutable. The name of the VPC network used by the Autonomous Database in the following format: projects/{project}/global/networks/{network}",
  ).optional(),
  odbNetwork: z.string().describe(
    "Optional. Immutable. The name of the OdbNetwork associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet.",
  ).optional(),
  odbSubnet: z.string().describe(
    "Optional. Immutable. The name of the OdbSubnet associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}",
  ).optional(),
  properties: z.object({
    actualUsedDataStorageSizeTb: z.number().describe(
      "Output only. The amount of storage currently being used for user and system data, in terabytes.",
    ).optional(),
    allocatedStorageSizeTb: z.number().describe(
      "Output only. The amount of storage currently allocated for the database tables and billed for, rounded up in terabytes.",
    ).optional(),
    allowlistedIps: z.array(z.string()).describe(
      "Optional. Immutable. The list of allowlisted IP addresses for the Autonomous Database.",
    ).optional(),
    apexDetails: z.object({
      apexVersion: z.string().describe(
        "Output only. The Oracle APEX Application Development version.",
      ).optional(),
      ordsVersion: z.string().describe(
        "Output only. The Oracle REST Data Services (ORDS) version.",
      ).optional(),
    }).describe(
      "Oracle APEX Application Development. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseApex",
    ).optional(),
    arePrimaryAllowlistedIpsUsed: z.boolean().describe(
      "Output only. This field indicates the status of Data Guard and Access control for the Autonomous Database. The field's value is null if Data Guard is disabled or Access Control is disabled. The field's value is TRUE if both Data Guard and Access Control are enabled, and the Autonomous Database is using primary IP access control list (ACL) for standby. The field's value is FALSE if both Data Guard and Access Control are enabled, and the Autonomous Database is using a different IP access control list (ACL) for standby compared to primary.",
    ).optional(),
    autonomousContainerDatabaseId: z.string().describe(
      "Output only. The Autonomous Container Database OCID.",
    ).optional(),
    availableUpgradeVersions: z.array(z.string()).describe(
      "Output only. The list of available Oracle Database upgrade versions for an Autonomous Database.",
    ).optional(),
    backupRetentionPeriodDays: z.number().int().describe(
      "Optional. Immutable. The retention period for the Autonomous Database. This field is specified in days, can range from 1 day to 60 days, and has a default value of 60 days.",
    ).optional(),
    characterSet: z.string().describe(
      "Optional. Immutable. The character set for the Autonomous Database. The default is AL32UTF8.",
    ).optional(),
    computeCount: z.number().describe(
      "Optional. Immutable. The number of compute servers for the Autonomous Database.",
    ).optional(),
    connectionStrings: z.object({
      allConnectionStrings: z.object({
        high: z.string().describe(
          "Output only. The database service provides the highest level of resources to each SQL statement.",
        ).optional(),
        low: z.string().describe(
          "Output only. The database service provides the least level of resources to each SQL statement.",
        ).optional(),
        medium: z.string().describe(
          "Output only. The database service provides a lower level of resources to each SQL statement.",
        ).optional(),
      }).describe(
        "A list of all connection strings that can be used to connect to the Autonomous Database.",
      ).optional(),
      dedicated: z.string().describe(
        "Output only. The database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements.",
      ).optional(),
      high: z.string().describe(
        "Output only. The database service provides the highest level of resources to each SQL statement.",
      ).optional(),
      low: z.string().describe(
        "Output only. The database service provides the least level of resources to each SQL statement.",
      ).optional(),
      medium: z.string().describe(
        "Output only. The database service provides a lower level of resources to each SQL statement.",
      ).optional(),
      profiles: z.array(z.object({
        consumerGroup: z.enum([
          "CONSUMER_GROUP_UNSPECIFIED",
          "HIGH",
          "MEDIUM",
          "LOW",
          "TP",
          "TPURGENT",
        ]).describe(
          "Output only. The current consumer group being used by the connection.",
        ).optional(),
        displayName: z.string().describe(
          "Output only. The display name for the database connection.",
        ).optional(),
        hostFormat: z.enum(["HOST_FORMAT_UNSPECIFIED", "FQDN", "IP"]).describe(
          "Output only. The host name format being currently used in connection string.",
        ).optional(),
        isRegional: z.boolean().describe(
          "Output only. This field indicates if the connection string is regional and is only applicable for cross-region Data Guard.",
        ).optional(),
        protocol: z.enum(["PROTOCOL_UNSPECIFIED", "TCP", "TCPS"]).describe(
          "Output only. The protocol being used by the connection.",
        ).optional(),
        sessionMode: z.enum(["SESSION_MODE_UNSPECIFIED", "DIRECT", "INDIRECT"])
          .describe("Output only. The current session mode of the connection.")
          .optional(),
        syntaxFormat: z.enum([
          "SYNTAX_FORMAT_UNSPECIFIED",
          "LONG",
          "EZCONNECT",
          "EZCONNECTPLUS",
        ]).describe("Output only. The syntax of the connection string.")
          .optional(),
        tlsAuthentication: z.enum([
          "TLS_AUTHENTICATION_UNSPECIFIED",
          "SERVER",
          "MUTUAL",
        ]).describe(
          "Output only. This field indicates the TLS authentication type of the connection.",
        ).optional(),
        value: z.string().describe(
          "Output only. The value of the connection string.",
        ).optional(),
      })).describe(
        "Output only. A list of connection string profiles to allow clients to group, filter, and select values based on the structured metadata.",
      ).optional(),
    }).describe(
      "The connection string used to connect to the Autonomous Database. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionStrings",
    ).optional(),
    connectionUrls: z.object({
      apexUri: z.string().describe(
        "Output only. Oracle Application Express (APEX) URL.",
      ).optional(),
      databaseTransformsUri: z.string().describe(
        "Output only. The URL of the Database Transforms for the Autonomous Database.",
      ).optional(),
      graphStudioUri: z.string().describe(
        "Output only. The URL of the Graph Studio for the Autonomous Database.",
      ).optional(),
      machineLearningNotebookUri: z.string().describe(
        "Output only. The URL of the Oracle Machine Learning (OML) Notebook for the Autonomous Database.",
      ).optional(),
      machineLearningUserManagementUri: z.string().describe(
        "Output only. The URL of Machine Learning user management the Autonomous Database.",
      ).optional(),
      mongoDbUri: z.string().describe(
        "Output only. The URL of the MongoDB API for the Autonomous Database.",
      ).optional(),
      ordsUri: z.string().describe(
        "Output only. The Oracle REST Data Services (ORDS) URL of the Web Access for the Autonomous Database.",
      ).optional(),
      sqlDevWebUri: z.string().describe(
        "Output only. The URL of the Oracle SQL Developer Web for the Autonomous Database.",
      ).optional(),
    }).describe(
      "The URLs for accessing Oracle Application Express (APEX) and SQL Developer Web with a browser from a Compute instance. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionUrls",
    ).optional(),
    cpuCoreCount: z.number().int().describe(
      "Optional. Immutable. The number of CPU cores to be made available to the database.",
    ).optional(),
    customerContacts: z.array(z.object({
      email: z.string().describe(
        "Required. The email address used by Oracle to send notifications regarding databases and infrastructure.",
      ).optional(),
    })).describe("Optional. Immutable. The list of customer contacts.")
      .optional(),
    dataGuardRoleChangedTime: z.string().describe(
      "Output only. The date and time the Autonomous Data Guard role was changed for the standby Autonomous Database.",
    ).optional(),
    dataSafeState: z.enum([
      "DATA_SAFE_STATE_UNSPECIFIED",
      "REGISTERING",
      "REGISTERED",
      "DEREGISTERING",
      "NOT_REGISTERED",
      "FAILED",
    ]).describe(
      "Output only. The current state of the Data Safe registration for the Autonomous Database.",
    ).optional(),
    dataStorageSizeGb: z.number().int().describe(
      "Optional. Immutable. The size of the data stored in the database, in gigabytes.",
    ).optional(),
    dataStorageSizeTb: z.number().int().describe(
      "Optional. Immutable. The size of the data stored in the database, in terabytes.",
    ).optional(),
    databaseManagementState: z.enum([
      "DATABASE_MANAGEMENT_STATE_UNSPECIFIED",
      "ENABLING",
      "ENABLED",
      "DISABLING",
      "NOT_ENABLED",
      "FAILED_ENABLING",
      "FAILED_DISABLING",
    ]).describe(
      "Output only. The current state of database management for the Autonomous Database.",
    ).optional(),
    dbEdition: z.enum([
      "DATABASE_EDITION_UNSPECIFIED",
      "STANDARD_EDITION",
      "ENTERPRISE_EDITION",
    ]).describe("Optional. Immutable. The edition of the Autonomous Databases.")
      .optional(),
    dbVersion: z.string().describe(
      "Optional. Immutable. The Oracle Database version for the Autonomous Database.",
    ).optional(),
    dbWorkload: z.enum(["DB_WORKLOAD_UNSPECIFIED", "OLTP", "DW", "AJD", "APEX"])
      .describe(
        "Required. Immutable. The workload type of the Autonomous Database.",
      ).optional(),
    disasterRecoveryRoleChangedTime: z.string().describe(
      "Output only. The date and time the Disaster Recovery role was changed for the standby Autonomous Database.",
    ).optional(),
    encryptionKey: z.object({
      kmsKey: z.string().describe(
        "Optional. The KMS key used to encrypt the Autonomous Database. This field is required if the provider is GOOGLE_MANAGED. The name of the KMS key resource in the following format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
      provider: z.enum([
        "PROVIDER_UNSPECIFIED",
        "GOOGLE_MANAGED",
        "ORACLE_MANAGED",
      ]).describe("Optional. The provider of the encryption key.").optional(),
    }).describe("The encryption key used to encrypt the Autonomous Database.")
      .optional(),
    encryptionKeyHistoryEntries: z.array(z.object({
      activationTime: z.string().describe(
        "Output only. The date and time when the encryption key was activated on the Autonomous Database..",
      ).optional(),
      encryptionKey: z.object({
        kmsKey: z.string().describe(
          "Optional. The KMS key used to encrypt the Autonomous Database. This field is required if the provider is GOOGLE_MANAGED. The name of the KMS key resource in the following format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
        provider: z.enum([
          "PROVIDER_UNSPECIFIED",
          "GOOGLE_MANAGED",
          "ORACLE_MANAGED",
        ]).describe("Optional. The provider of the encryption key.").optional(),
      }).describe("The encryption key used to encrypt the Autonomous Database.")
        .optional(),
    })).describe(
      "Output only. The history of the encryption keys used to encrypt the Autonomous Database.",
    ).optional(),
    failedDataRecoveryDuration: z.string().describe(
      "Output only. This field indicates the number of seconds of data loss during a Data Guard failover.",
    ).optional(),
    isAutoScalingEnabled: z.boolean().describe(
      "Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database CPU core count.",
    ).optional(),
    isLocalDataGuardEnabled: z.boolean().describe(
      "Output only. Deprecated: Please use `local_data_guard_enabled` instead. This field indicates whether the Autonomous Database has local (in-region) Data Guard enabled.",
    ).optional(),
    isStorageAutoScalingEnabled: z.boolean().describe(
      "Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database storage.",
    ).optional(),
    licenseType: z.enum([
      "LICENSE_TYPE_UNSPECIFIED",
      "LICENSE_INCLUDED",
      "BRING_YOUR_OWN_LICENSE",
    ]).describe(
      "Required. Immutable. The license type used for the Autonomous Database.",
    ).optional(),
    lifecycleDetails: z.string().describe(
      "Output only. The details of the current lifestyle state of the Autonomous Database.",
    ).optional(),
    localAdgAutoFailoverMaxDataLossLimit: z.number().int().describe(
      "Output only. Deprecated: Please use `local_adg_auto_failover_max_data_loss_limit_duration` instead. This field indicates the maximum data loss limit for an Autonomous Database, in seconds.",
    ).optional(),
    localAdgAutoFailoverMaxDataLossLimitDuration: z.number().int().describe(
      "Optional. This field indicates the maximum data loss limit for an Autonomous Database, in seconds.",
    ).optional(),
    localDataGuardEnabled: z.boolean().describe(
      "Optional. Indicates whether the Autonomous Database has a local (in-region) standby database. Not applicable to cross-region Data Guard or dedicated Exadata infrastructure.",
    ).optional(),
    localDisasterRecoveryType: z.enum([
      "LOCAL_DISASTER_RECOVERY_TYPE_UNSPECIFIED",
      "ADG",
      "BACKUP_BASED",
      "NOT_AVAILABLE",
    ]).describe(
      "Output only. This field indicates the local disaster recovery (DR) type of an Autonomous Database.",
    ).optional(),
    localStandbyDb: z.object({
      dataGuardRoleChangedTime: z.string().describe(
        "Output only. The date and time the Autonomous Data Guard role was switched for the standby Autonomous Database.",
      ).optional(),
      disasterRecoveryRoleChangedTime: z.string().describe(
        "Output only. The date and time the Disaster Recovery role was switched for the standby Autonomous Database.",
      ).optional(),
      lagTimeDuration: z.string().describe(
        "Output only. The amount of time, in seconds, that the data of the standby database lags in comparison to the data of the primary database.",
      ).optional(),
      lifecycleDetails: z.string().describe(
        "Output only. The additional details about the current lifecycle state of the Autonomous Database.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROVISIONING",
        "AVAILABLE",
        "STOPPING",
        "STOPPED",
        "STARTING",
        "TERMINATING",
        "TERMINATED",
        "UNAVAILABLE",
        "RESTORE_IN_PROGRESS",
        "RESTORE_FAILED",
        "BACKUP_IN_PROGRESS",
        "SCALE_IN_PROGRESS",
        "AVAILABLE_NEEDS_ATTENTION",
        "UPDATING",
        "MAINTENANCE_IN_PROGRESS",
        "RESTARTING",
        "RECREATING",
        "ROLE_CHANGE_IN_PROGRESS",
        "UPGRADING",
        "INACCESSIBLE",
        "STANDBY",
      ]).describe(
        "Output only. The current lifecycle state of the Autonomous Database.",
      ).optional(),
    }).describe(
      "Autonomous Data Guard standby database details. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseStandbySummary",
    ).optional(),
    maintenanceBeginTime: z.string().describe(
      "Output only. The date and time when maintenance will begin.",
    ).optional(),
    maintenanceEndTime: z.string().describe(
      "Output only. The date and time when maintenance will end.",
    ).optional(),
    maintenanceScheduleType: z.enum([
      "MAINTENANCE_SCHEDULE_TYPE_UNSPECIFIED",
      "EARLY",
      "REGULAR",
    ]).describe(
      "Optional. Immutable. The maintenance schedule of the Autonomous Database.",
    ).optional(),
    memoryPerOracleComputeUnitGbs: z.number().int().describe(
      "Output only. The amount of memory enabled per ECPU, in gigabytes.",
    ).optional(),
    memoryTableGbs: z.number().int().describe(
      "Output only. The memory assigned to in-memory tables in an Autonomous Database.",
    ).optional(),
    mtlsConnectionRequired: z.boolean().describe(
      "Optional. Immutable. This field specifies if the Autonomous Database requires mTLS connections.",
    ).optional(),
    nCharacterSet: z.string().describe(
      "Optional. Immutable. The national character set for the Autonomous Database. The default is AL16UTF16.",
    ).optional(),
    nextLongTermBackupTime: z.string().describe(
      "Output only. The long term backup schedule of the Autonomous Database.",
    ).optional(),
    ociUrl: z.string().describe(
      "Output only. The Oracle Cloud Infrastructure link for the Autonomous Database.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. OCID of the Autonomous Database. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle",
    ).optional(),
    openMode: z.enum(["OPEN_MODE_UNSPECIFIED", "READ_ONLY", "READ_WRITE"])
      .describe(
        "Output only. This field indicates the current mode of the Autonomous Database.",
      ).optional(),
    operationsInsightsState: z.enum([
      "OPERATIONS_INSIGHTS_STATE_UNSPECIFIED",
      "ENABLING",
      "ENABLED",
      "DISABLING",
      "NOT_ENABLED",
      "FAILED_ENABLING",
      "FAILED_DISABLING",
    ]).describe(
      "Output only. This field indicates the state of Operations Insights for the Autonomous Database.",
    ).optional(),
    peerDbIds: z.array(z.string()).describe(
      "Output only. The list of OCIDs of standby databases located in Autonomous Data Guard remote regions that are associated with the source database.",
    ).optional(),
    permissionLevel: z.enum([
      "PERMISSION_LEVEL_UNSPECIFIED",
      "RESTRICTED",
      "UNRESTRICTED",
    ]).describe("Output only. The permission level of the Autonomous Database.")
      .optional(),
    privateEndpoint: z.string().describe(
      "Output only. The private endpoint for the Autonomous Database.",
    ).optional(),
    privateEndpointIp: z.string().describe(
      "Optional. Immutable. The private endpoint IP address for the Autonomous Database.",
    ).optional(),
    privateEndpointLabel: z.string().describe(
      "Optional. Immutable. The private endpoint label for the Autonomous Database.",
    ).optional(),
    refreshableMode: z.enum([
      "REFRESHABLE_MODE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "Output only. The refresh mode of the cloned Autonomous Database.",
    ).optional(),
    refreshableState: z.enum([
      "REFRESHABLE_STATE_UNSPECIFIED",
      "REFRESHING",
      "NOT_REFRESHING",
    ]).describe("Output only. The refresh State of the clone.").optional(),
    role: z.enum([
      "ROLE_UNSPECIFIED",
      "PRIMARY",
      "STANDBY",
      "DISABLED_STANDBY",
      "BACKUP_COPY",
      "SNAPSHOT_STANDBY",
    ]).describe("Output only. The Data Guard role of the Autonomous Database.")
      .optional(),
    scheduledOperationDetails: z.array(z.object({
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe("Output only. Day of week.").optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      stopTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Output only. The list and details of the scheduled operations of the Autonomous Database.",
    ).optional(),
    secretId: z.string().describe(
      "Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault secret.",
    ).optional(),
    serviceAgentEmail: z.string().describe(
      "Output only. An Oracle-managed Google Cloud service account on which customers can grant roles to access resources in the customer project.",
    ).optional(),
    sqlWebDeveloperUrl: z.string().describe(
      "Output only. The SQL Web Developer URL for the Autonomous Database.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "STOPPING",
      "STOPPED",
      "STARTING",
      "TERMINATING",
      "TERMINATED",
      "UNAVAILABLE",
      "RESTORE_IN_PROGRESS",
      "RESTORE_FAILED",
      "BACKUP_IN_PROGRESS",
      "SCALE_IN_PROGRESS",
      "AVAILABLE_NEEDS_ATTENTION",
      "UPDATING",
      "MAINTENANCE_IN_PROGRESS",
      "RESTARTING",
      "RECREATING",
      "ROLE_CHANGE_IN_PROGRESS",
      "UPGRADING",
      "INACCESSIBLE",
      "STANDBY",
    ]).describe(
      "Output only. The current lifecycle state of the Autonomous Database.",
    ).optional(),
    supportedCloneRegions: z.array(z.string()).describe(
      "Output only. The list of available regions that can be used to create a clone for the Autonomous Database.",
    ).optional(),
    totalAutoBackupStorageSizeGbs: z.number().describe(
      "Output only. The storage space used by automatic backups of Autonomous Database, in gigabytes.",
    ).optional(),
    usedDataStorageSizeTbs: z.number().int().describe(
      "Output only. The storage space used by Autonomous Database, in gigabytes.",
    ).optional(),
    vaultId: z.string().describe(
      "Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault.",
    ).optional(),
  }).describe("The properties of an Autonomous Database.").optional(),
  sourceConfig: z.object({
    automaticBackupsReplicationEnabled: z.boolean().describe(
      "Optional. This field specifies if the replication of automatic backups is enabled when creating a Data Guard.",
    ).optional(),
    autonomousDatabase: z.string().describe(
      "Optional. The name of the primary Autonomous Database that is used to create a Peer Autonomous Database from a source.",
    ).optional(),
  }).describe("The source configuration for the standby Autonomous Database.")
    .optional(),
  autonomousDatabaseId: z.string().describe(
    "Required. The ID of the Autonomous Database to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud AutonomousDatabases. Registered at `@swamp/gcp/oracledatabase/autonomousdatabases`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/autonomousdatabases",
  version: "2026.05.21.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      description: "Added: adminPasswordSecretVersion",
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
      description: "Removed: adminPasswordSecretVersion",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          adminPasswordSecretVersion: _adminPasswordSecretVersion,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: adminPasswordSecretVersion",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: adminPasswordSecretVersion",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          adminPasswordSecretVersion: _adminPasswordSecretVersion,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: adminPasswordSecretVersion",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Details of the Autonomous Database resource. https://docs.oracle.com/en-us/ia...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a autonomousDatabases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["adminPassword"] !== undefined) {
          body["adminPassword"] = g["adminPassword"];
        }
        if (g["adminPasswordSecretVersion"] !== undefined) {
          body["adminPasswordSecretVersion"] = g["adminPasswordSecretVersion"];
        }
        if (g["cidr"] !== undefined) body["cidr"] = g["cidr"];
        if (g["database"] !== undefined) body["database"] = g["database"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["odbNetwork"] !== undefined) body["odbNetwork"] = g["odbNetwork"];
        if (g["odbSubnet"] !== undefined) body["odbSubnet"] = g["odbSubnet"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
        }
        if (g["autonomousDatabaseId"] !== undefined) {
          body["autonomousDatabaseId"] = g["autonomousDatabaseId"];
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
      description: "Get a autonomousDatabases",
      arguments: z.object({
        identifier: z.string().describe("The name of the autonomousDatabases"),
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
      description: "Update autonomousDatabases attributes",
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
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
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
      description: "Delete the autonomousDatabases",
      arguments: z.object({
        identifier: z.string().describe("The name of the autonomousDatabases"),
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
      description: "Sync autonomousDatabases state from GCP",
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
    failover: {
      description: "failover",
      arguments: z.object({
        peerAutonomousDatabase: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["peerAutonomousDatabase"] !== undefined) {
          body["peerAutonomousDatabase"] = args["peerAutonomousDatabase"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.autonomousDatabases.failover",
            "path": "v1/{+name}:failover",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_wallet: {
      description: "generate wallet",
      arguments: z.object({
        isRegional: z.any().optional(),
        password: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["isRegional"] !== undefined) {
          body["isRegional"] = args["isRegional"];
        }
        if (args["password"] !== undefined) body["password"] = args["password"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.autonomousDatabases.generateWallet",
            "path": "v1/{+name}:generateWallet",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restart: {
      description: "restart",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "oracledatabase.projects.locations.autonomousDatabases.restart",
            "path": "v1/{+name}:restart",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        restoreTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["restoreTime"] !== undefined) {
          body["restoreTime"] = args["restoreTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.autonomousDatabases.restore",
            "path": "v1/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start: {
      description: "start",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "oracledatabase.projects.locations.autonomousDatabases.start",
            "path": "v1/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "oracledatabase.projects.locations.autonomousDatabases.stop",
            "path": "v1/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    switchover: {
      description: "switchover",
      arguments: z.object({
        peerAutonomousDatabase: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["peerAutonomousDatabase"] !== undefined) {
          body["peerAutonomousDatabase"] = args["peerAutonomousDatabase"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "oracledatabase.projects.locations.autonomousDatabases.switchover",
            "path": "v1/{+name}:switchover",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
