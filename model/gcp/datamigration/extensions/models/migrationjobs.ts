// Auto-generated extension model for @swamp/gcp/datamigration/migrationjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Database Migration MigrationJobs.
 *
 * Represents a Database Migration Service migration job object.
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
  return `${parent}/migrationJobs/${shortName}`;
}

const BASE_URL = "https://datamigration.googleapis.com/";

const GET_CONFIG = {
  "id": "datamigration.projects.locations.migrationJobs.get",
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
  "id": "datamigration.projects.locations.migrationJobs.create",
  "path": "v1/{+parent}/migrationJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "migrationJobId": {
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
  "id": "datamigration.projects.locations.migrationJobs.patch",
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
  "id": "datamigration.projects.locations.migrationJobs.delete",
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
  "id": "datamigration.projects.locations.migrationJobs.list",
  "path": "v1/{+parent}/migrationJobs",
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
  cmekKeyName: z.string().describe(
    "The CMEK (customer-managed encryption key) fully qualified key name used for the migration job. This field supports all migration jobs types except for: * Mysql to Mysql (use the cmek field in the cloudsql connection profile instead). * PostrgeSQL to PostgreSQL (use the cmek field in the cloudsql connection profile instead). * PostgreSQL to AlloyDB (use the kms_key_name field in the alloydb connection profile instead). Each Cloud CMEK key has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
  ).optional(),
  conversionWorkspace: z.object({
    commitId: z.string().describe("The commit ID of the conversion workspace.")
      .optional(),
    name: z.string().describe(
      "The resource name (URI) of the conversion workspace.",
    ).optional(),
  }).describe("A conversion workspace's version.").optional(),
  destination: z.string().describe(
    "Required. The resource name (URI) of the destination connection profile.",
  ).optional(),
  destinationDatabase: z.object({
    engine: z.enum([
      "DATABASE_ENGINE_UNSPECIFIED",
      "MYSQL",
      "POSTGRESQL",
      "SQLSERVER",
      "ORACLE",
    ]).describe("The database engine.").optional(),
    provider: z.enum([
      "DATABASE_PROVIDER_UNSPECIFIED",
      "CLOUDSQL",
      "RDS",
      "AURORA",
      "ALLOYDB",
      "AZURE_DATABASE",
    ]).describe("The database provider.").optional(),
  }).describe("A message defining the database engine and provider.")
    .optional(),
  displayName: z.string().describe("The migration job display name.")
    .optional(),
  dumpFlags: z.object({
    dumpFlags: z.array(z.object({
      name: z.string().describe("The name of the flag").optional(),
      value: z.string().describe("The value of the flag.").optional(),
    })).describe("The flags for the initial dump.").optional(),
  }).describe("Dump flags definition.").optional(),
  dumpPath: z.string().describe(
    'The path to the dump file in Google Cloud Storage, in the format: (gs://[BUCKET_NAME]/[OBJECT_NAME]). This field and the "dump_flags" field are mutually exclusive.',
  ).optional(),
  dumpType: z.enum(["DUMP_TYPE_UNSPECIFIED", "LOGICAL", "PHYSICAL"]).describe(
    "Optional. The type of the data dump. Supported for MySQL to CloudSQL for MySQL migrations only.",
  ).optional(),
  error: z.object({
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
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  filter: z.string().describe(
    "This field can be used to select the entities to migrate as part of the migration job. It uses AIP-160 notation to select a subset of the entities configured on the associated conversion-workspace. This field should not be set on migration-jobs that are not associated with a conversion workspace.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.',
  ).optional(),
  name: z.string().describe(
    "The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}.",
  ).optional(),
  objectsConfig: z.object({
    sourceObjectsConfig: z.object({
      objectConfigs: z.array(z.object({
        objectIdentifier: z.object({
          database: z.unknown().describe(
            "Optional. The database name. This will be required only if the object uses a database name as part of its unique identifier.",
          ).optional(),
          schema: z.unknown().describe(
            "Optional. The schema name. This will be required only if the object uses a schema name as part of its unique identifier.",
          ).optional(),
          table: z.unknown().describe(
            "Optional. The table name. This will be required only if the object is a level below database or schema.",
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the migration job object.",
          ).optional(),
        }).describe("An identifier for the Migration Job Object.").optional(),
      })).describe("Optional. The list of the objects to be migrated.")
        .optional(),
      objectsSelectionType: z.enum([
        "OBJECTS_SELECTION_TYPE_UNSPECIFIED",
        "ALL_OBJECTS",
        "SPECIFIED_OBJECTS",
      ]).describe("Optional. The objects selection type of the migration job.")
        .optional(),
    }).describe("List of configurations for the source objects to be migrated.")
      .optional(),
  }).describe("Configuration for the objects to be migrated.").optional(),
  oracleToPostgresConfig: z.object({
    oracleSourceConfig: z.object({
      binaryLogParser: z.object({
        logFileDirectories: z.object({
          archivedLogDirectory: z.string().describe(
            "Required. Oracle directory for archived logs.",
          ).optional(),
          onlineLogDirectory: z.string().describe(
            "Required. Oracle directory for online logs.",
          ).optional(),
        }).describe(
          "Configuration to specify the Oracle directories to access the log files.",
        ).optional(),
        oracleAsmLogFileAccess: z.object({}).describe(
          "Configuration to use Oracle ASM to access the log files.",
        ).optional(),
      }).describe("Configuration to use Binary Log Parser CDC technique.")
        .optional(),
      cdcStartPosition: z.string().describe(
        "Optional. The schema change number (SCN) to start CDC data migration from.",
      ).optional(),
      logMiner: z.object({}).describe(
        "Configuration to use LogMiner CDC method.",
      ).optional(),
      maxConcurrentCdcConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase.",
      ).optional(),
      maxConcurrentFullDumpConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase.",
      ).optional(),
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for Oracle as a source in a migration.")
      .optional(),
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for Postgres as a destination in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous **Oracle to Cloud SQL for PostgreSQL** and **Oracle to AlloyDB for PostgreSQL** migrations.",
  ).optional(),
  originalMigrationName: z.string().describe(
    "Optional. A failback replication pointer to the resource name (URI) of the original migration job.",
  ).optional(),
  performanceConfig: z.object({
    dumpParallelLevel: z.enum([
      "DUMP_PARALLEL_LEVEL_UNSPECIFIED",
      "MIN",
      "OPTIMAL",
      "MAX",
    ]).describe("Initial dump parallelism level.").optional(),
  }).describe("Performance configuration definition.").optional(),
  postgresHomogeneousConfig: z.object({
    isNativeLogical: z.boolean().describe(
      "Required. Whether the migration is native logical.",
    ).optional(),
    maxAdditionalSubscriptions: z.number().int().describe(
      "Optional. Maximum number of additional subscriptions to use for the migration job.",
    ).optional(),
  }).describe("Configuration for PostgreSQL to PostgreSQL migrations.")
    .optional(),
  postgresToSqlserverConfig: z.object({
    postgresSourceConfig: z.object({
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for Postgres as a source in a migration.")
      .optional(),
    sqlserverDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for SQL Server as a destination in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous failback migrations from **PostgreSQL to SQL Server**.",
  ).optional(),
  reverseSshConnectivity: z.object({
    vm: z.string().describe(
      "The name of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vmIp: z.string().describe(
      "Required. The IP of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vmPort: z.number().int().describe(
      "Required. The forwarding port of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vpc: z.string().describe(
      "The name of the VPC to peer with the Cloud SQL private network.",
    ).optional(),
  }).describe(
    "The details needed to configure a reverse SSH tunnel between the source and destination databases. These details will be used when calling the generateSshScript method (see https://cloud.google.com/database-migration/docs/reference/rest/v1/projects.locations.migrationJobs/generateSshScript) to produce the script that will help set up the reverse SSH tunnel, and to set up the VPC peering between the Cloud SQL private network and the VPC.",
  ).optional(),
  source: z.string().describe(
    "Required. The resource name (URI) of the source connection profile.",
  ).optional(),
  sourceDatabase: z.object({
    engine: z.enum([
      "DATABASE_ENGINE_UNSPECIFIED",
      "MYSQL",
      "POSTGRESQL",
      "SQLSERVER",
      "ORACLE",
    ]).describe("The database engine.").optional(),
    provider: z.enum([
      "DATABASE_PROVIDER_UNSPECIFIED",
      "CLOUDSQL",
      "RDS",
      "AURORA",
      "ALLOYDB",
      "AZURE_DATABASE",
    ]).describe("The database provider.").optional(),
  }).describe("A message defining the database engine and provider.")
    .optional(),
  sqlserverHomogeneousMigrationJobConfig: z.object({
    backupFilePattern: z.string().describe(
      "Required. Pattern that describes the default backup naming strategy. The specified pattern should ensure lexicographical order of backups. The pattern must define one of the following capture group sets: Capture group set #1 yy/yyyy - year, 2 or 4 digits mm - month number, 1-12 dd - day of month, 1-31 hh - hour of day, 00-23 mi - minutes, 00-59 ss - seconds, 00-59 Example: For backup file TestDB_20230802_155400.trn, use pattern: (?.*)_backup_(?\\d{4})(?\\d{2})(?\\d{2})_(?\\d{2})(?\\d{2})(?\\d{2}).trn Capture group set #2 timestamp - unix timestamp Example: For backup file TestDB.1691448254.trn, use pattern: (?.*)\\.(?\\d*).trn or (?.*)\\.(?\\d*).trn",
    ).optional(),
    dagConfig: z.object({
      linkedServer: z.string().describe(
        "Required. The name of the linked server that points to the source SQL Server instance. Only used by DAG migrations.",
      ).optional(),
      sourceAg: z.string().describe(
        "Required. The name of the source availability group. Only used by DAG migrations.",
      ).optional(),
    }).describe(
      "Configuration for distributed availability group (DAG) for the SQL Server homogeneous migration.",
    ).optional(),
    databaseBackups: z.array(z.object({
      database: z.string().describe(
        "Required. Name of a SQL Server database for which to define backup configuration.",
      ).optional(),
      encryptionOptions: z.object({
        certPath: z.string().describe(
          "Required. Path to the Certificate (.cer) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.",
        ).optional(),
        pvkPassword: z.string().describe(
          "Required. Input only. Password that encrypts the private key.",
        ).optional(),
        pvkPath: z.string().describe(
          "Required. Path to the Certificate Private Key (.pvk) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.",
        ).optional(),
      }).describe("Encryption settings for the SQL Server database.")
        .optional(),
    })).describe("Required. Backup details per database in Cloud Storage.")
      .optional(),
    promoteWhenReady: z.boolean().describe(
      "Optional. Promote databases when ready.",
    ).optional(),
    useDiffBackup: z.boolean().describe(
      "Optional. Enable differential backups.",
    ).optional(),
  }).describe(
    "Configuration for homogeneous migration to Cloud SQL for SQL Server.",
  ).optional(),
  sqlserverToPostgresConfig: z.object({
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for Postgres as a destination in a migration.")
      .optional(),
    sqlserverSourceConfig: z.object({
      cdcStartPosition: z.string().describe(
        "Optional. The log sequence number (LSN) to start CDC data migration from.",
      ).optional(),
      maxConcurrentCdcConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase.",
      ).optional(),
      maxConcurrentFullDumpConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase.",
      ).optional(),
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for SQL Server as a source in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous **SQL Server to Cloud SQL for PostgreSQL** migrations.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "MAINTENANCE",
    "DRAFT",
    "CREATING",
    "NOT_STARTED",
    "RUNNING",
    "FAILED",
    "COMPLETED",
    "DELETING",
    "STOPPING",
    "STOPPED",
    "DELETED",
    "UPDATING",
    "STARTING",
    "RESTARTING",
    "RESUMING",
  ]).describe("The current migration job state.").optional(),
  staticIpConnectivity: z.object({}).describe(
    "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "ONE_TIME", "CONTINUOUS"]).describe(
    "Required. The migration job type.",
  ).optional(),
  vpcPeeringConnectivity: z.object({
    vpc: z.string().describe(
      "The name of the VPC network to peer with the Cloud SQL private network.",
    ).optional(),
  }).describe(
    "The details of the VPC where the source database is located in Google Cloud. We will use this information to set up the VPC peering connection between Cloud SQL and this VPC.",
  ).optional(),
  migrationJobId: z.string().describe(
    "Required. The ID of the instance to create.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cmekKeyName: z.string().optional(),
  conversionWorkspace: z.object({
    commitId: z.string(),
    name: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  destination: z.string().optional(),
  destinationDatabase: z.object({
    engine: z.string(),
    provider: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  dumpFlags: z.object({
    dumpFlags: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }).optional(),
  dumpPath: z.string().optional(),
  dumpType: z.string().optional(),
  duration: z.string().optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  filter: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  objectsConfig: z.object({
    sourceObjectsConfig: z.object({
      objectConfigs: z.array(z.object({
        objectIdentifier: z.object({
          database: z.unknown(),
          schema: z.unknown(),
          table: z.unknown(),
          type: z.unknown(),
        }),
      })),
      objectsSelectionType: z.string(),
    }),
  }).optional(),
  oracleToPostgresConfig: z.object({
    oracleSourceConfig: z.object({
      binaryLogParser: z.object({
        logFileDirectories: z.object({
          archivedLogDirectory: z.string(),
          onlineLogDirectory: z.string(),
        }),
        oracleAsmLogFileAccess: z.object({}),
      }),
      cdcStartPosition: z.string(),
      logMiner: z.object({}),
      maxConcurrentCdcConnections: z.number(),
      maxConcurrentFullDumpConnections: z.number(),
      skipFullDump: z.boolean(),
    }),
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number(),
      transactionTimeout: z.string(),
    }),
  }).optional(),
  originalMigrationName: z.string().optional(),
  performanceConfig: z.object({
    dumpParallelLevel: z.string(),
  }).optional(),
  phase: z.string().optional(),
  postgresHomogeneousConfig: z.object({
    isNativeLogical: z.boolean(),
    maxAdditionalSubscriptions: z.number(),
  }).optional(),
  postgresToSqlserverConfig: z.object({
    postgresSourceConfig: z.object({
      skipFullDump: z.boolean(),
    }),
    sqlserverDestinationConfig: z.object({
      maxConcurrentConnections: z.number(),
      transactionTimeout: z.string(),
    }),
  }).optional(),
  purpose: z.string().optional(),
  reverseSshConnectivity: z.object({
    vm: z.string(),
    vmIp: z.string(),
    vmPort: z.number(),
    vpc: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  source: z.string().optional(),
  sourceDatabase: z.object({
    engine: z.string(),
    provider: z.string(),
  }).optional(),
  sqlserverHomogeneousMigrationJobConfig: z.object({
    backupFilePattern: z.string(),
    dagConfig: z.object({
      linkedServer: z.string(),
      sourceAg: z.string(),
    }),
    databaseBackups: z.array(z.object({
      database: z.string(),
      encryptionOptions: z.object({
        certPath: z.string(),
        pvkPassword: z.string(),
        pvkPath: z.string(),
      }),
    })),
    promoteWhenReady: z.boolean(),
    useDiffBackup: z.boolean(),
  }).optional(),
  sqlserverToPostgresConfig: z.object({
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number(),
      transactionTimeout: z.string(),
    }),
    sqlserverSourceConfig: z.object({
      cdcStartPosition: z.string(),
      maxConcurrentCdcConnections: z.number(),
      maxConcurrentFullDumpConnections: z.number(),
      skipFullDump: z.boolean(),
    }),
  }).optional(),
  state: z.string().optional(),
  staticIpConnectivity: z.object({}).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  vpcPeeringConnectivity: z.object({
    vpc: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cmekKeyName: z.string().describe(
    "The CMEK (customer-managed encryption key) fully qualified key name used for the migration job. This field supports all migration jobs types except for: * Mysql to Mysql (use the cmek field in the cloudsql connection profile instead). * PostrgeSQL to PostgreSQL (use the cmek field in the cloudsql connection profile instead). * PostgreSQL to AlloyDB (use the kms_key_name field in the alloydb connection profile instead). Each Cloud CMEK key has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
  ).optional(),
  conversionWorkspace: z.object({
    commitId: z.string().describe("The commit ID of the conversion workspace.")
      .optional(),
    name: z.string().describe(
      "The resource name (URI) of the conversion workspace.",
    ).optional(),
  }).describe("A conversion workspace's version.").optional(),
  destination: z.string().describe(
    "Required. The resource name (URI) of the destination connection profile.",
  ).optional(),
  destinationDatabase: z.object({
    engine: z.enum([
      "DATABASE_ENGINE_UNSPECIFIED",
      "MYSQL",
      "POSTGRESQL",
      "SQLSERVER",
      "ORACLE",
    ]).describe("The database engine.").optional(),
    provider: z.enum([
      "DATABASE_PROVIDER_UNSPECIFIED",
      "CLOUDSQL",
      "RDS",
      "AURORA",
      "ALLOYDB",
      "AZURE_DATABASE",
    ]).describe("The database provider.").optional(),
  }).describe("A message defining the database engine and provider.")
    .optional(),
  displayName: z.string().describe("The migration job display name.")
    .optional(),
  dumpFlags: z.object({
    dumpFlags: z.array(z.object({
      name: z.string().describe("The name of the flag").optional(),
      value: z.string().describe("The value of the flag.").optional(),
    })).describe("The flags for the initial dump.").optional(),
  }).describe("Dump flags definition.").optional(),
  dumpPath: z.string().describe(
    'The path to the dump file in Google Cloud Storage, in the format: (gs://[BUCKET_NAME]/[OBJECT_NAME]). This field and the "dump_flags" field are mutually exclusive.',
  ).optional(),
  dumpType: z.enum(["DUMP_TYPE_UNSPECIFIED", "LOGICAL", "PHYSICAL"]).describe(
    "Optional. The type of the data dump. Supported for MySQL to CloudSQL for MySQL migrations only.",
  ).optional(),
  error: z.object({
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
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  filter: z.string().describe(
    "This field can be used to select the entities to migrate as part of the migration job. It uses AIP-160 notation to select a subset of the entities configured on the associated conversion-workspace. This field should not be set on migration-jobs that are not associated with a conversion workspace.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.',
  ).optional(),
  name: z.string().describe(
    "The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}.",
  ).optional(),
  objectsConfig: z.object({
    sourceObjectsConfig: z.object({
      objectConfigs: z.array(z.object({
        objectIdentifier: z.object({
          database: z.unknown().describe(
            "Optional. The database name. This will be required only if the object uses a database name as part of its unique identifier.",
          ).optional(),
          schema: z.unknown().describe(
            "Optional. The schema name. This will be required only if the object uses a schema name as part of its unique identifier.",
          ).optional(),
          table: z.unknown().describe(
            "Optional. The table name. This will be required only if the object is a level below database or schema.",
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the migration job object.",
          ).optional(),
        }).describe("An identifier for the Migration Job Object.").optional(),
      })).describe("Optional. The list of the objects to be migrated.")
        .optional(),
      objectsSelectionType: z.enum([
        "OBJECTS_SELECTION_TYPE_UNSPECIFIED",
        "ALL_OBJECTS",
        "SPECIFIED_OBJECTS",
      ]).describe("Optional. The objects selection type of the migration job.")
        .optional(),
    }).describe("List of configurations for the source objects to be migrated.")
      .optional(),
  }).describe("Configuration for the objects to be migrated.").optional(),
  oracleToPostgresConfig: z.object({
    oracleSourceConfig: z.object({
      binaryLogParser: z.object({
        logFileDirectories: z.object({
          archivedLogDirectory: z.string().describe(
            "Required. Oracle directory for archived logs.",
          ).optional(),
          onlineLogDirectory: z.string().describe(
            "Required. Oracle directory for online logs.",
          ).optional(),
        }).describe(
          "Configuration to specify the Oracle directories to access the log files.",
        ).optional(),
        oracleAsmLogFileAccess: z.object({}).describe(
          "Configuration to use Oracle ASM to access the log files.",
        ).optional(),
      }).describe("Configuration to use Binary Log Parser CDC technique.")
        .optional(),
      cdcStartPosition: z.string().describe(
        "Optional. The schema change number (SCN) to start CDC data migration from.",
      ).optional(),
      logMiner: z.object({}).describe(
        "Configuration to use LogMiner CDC method.",
      ).optional(),
      maxConcurrentCdcConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase.",
      ).optional(),
      maxConcurrentFullDumpConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase.",
      ).optional(),
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for Oracle as a source in a migration.")
      .optional(),
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for Postgres as a destination in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous **Oracle to Cloud SQL for PostgreSQL** and **Oracle to AlloyDB for PostgreSQL** migrations.",
  ).optional(),
  originalMigrationName: z.string().describe(
    "Optional. A failback replication pointer to the resource name (URI) of the original migration job.",
  ).optional(),
  performanceConfig: z.object({
    dumpParallelLevel: z.enum([
      "DUMP_PARALLEL_LEVEL_UNSPECIFIED",
      "MIN",
      "OPTIMAL",
      "MAX",
    ]).describe("Initial dump parallelism level.").optional(),
  }).describe("Performance configuration definition.").optional(),
  postgresHomogeneousConfig: z.object({
    isNativeLogical: z.boolean().describe(
      "Required. Whether the migration is native logical.",
    ).optional(),
    maxAdditionalSubscriptions: z.number().int().describe(
      "Optional. Maximum number of additional subscriptions to use for the migration job.",
    ).optional(),
  }).describe("Configuration for PostgreSQL to PostgreSQL migrations.")
    .optional(),
  postgresToSqlserverConfig: z.object({
    postgresSourceConfig: z.object({
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for Postgres as a source in a migration.")
      .optional(),
    sqlserverDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for SQL Server as a destination in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous failback migrations from **PostgreSQL to SQL Server**.",
  ).optional(),
  reverseSshConnectivity: z.object({
    vm: z.string().describe(
      "The name of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vmIp: z.string().describe(
      "Required. The IP of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vmPort: z.number().int().describe(
      "Required. The forwarding port of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel.",
    ).optional(),
    vpc: z.string().describe(
      "The name of the VPC to peer with the Cloud SQL private network.",
    ).optional(),
  }).describe(
    "The details needed to configure a reverse SSH tunnel between the source and destination databases. These details will be used when calling the generateSshScript method (see https://cloud.google.com/database-migration/docs/reference/rest/v1/projects.locations.migrationJobs/generateSshScript) to produce the script that will help set up the reverse SSH tunnel, and to set up the VPC peering between the Cloud SQL private network and the VPC.",
  ).optional(),
  source: z.string().describe(
    "Required. The resource name (URI) of the source connection profile.",
  ).optional(),
  sourceDatabase: z.object({
    engine: z.enum([
      "DATABASE_ENGINE_UNSPECIFIED",
      "MYSQL",
      "POSTGRESQL",
      "SQLSERVER",
      "ORACLE",
    ]).describe("The database engine.").optional(),
    provider: z.enum([
      "DATABASE_PROVIDER_UNSPECIFIED",
      "CLOUDSQL",
      "RDS",
      "AURORA",
      "ALLOYDB",
      "AZURE_DATABASE",
    ]).describe("The database provider.").optional(),
  }).describe("A message defining the database engine and provider.")
    .optional(),
  sqlserverHomogeneousMigrationJobConfig: z.object({
    backupFilePattern: z.string().describe(
      "Required. Pattern that describes the default backup naming strategy. The specified pattern should ensure lexicographical order of backups. The pattern must define one of the following capture group sets: Capture group set #1 yy/yyyy - year, 2 or 4 digits mm - month number, 1-12 dd - day of month, 1-31 hh - hour of day, 00-23 mi - minutes, 00-59 ss - seconds, 00-59 Example: For backup file TestDB_20230802_155400.trn, use pattern: (?.*)_backup_(?\\d{4})(?\\d{2})(?\\d{2})_(?\\d{2})(?\\d{2})(?\\d{2}).trn Capture group set #2 timestamp - unix timestamp Example: For backup file TestDB.1691448254.trn, use pattern: (?.*)\\.(?\\d*).trn or (?.*)\\.(?\\d*).trn",
    ).optional(),
    dagConfig: z.object({
      linkedServer: z.string().describe(
        "Required. The name of the linked server that points to the source SQL Server instance. Only used by DAG migrations.",
      ).optional(),
      sourceAg: z.string().describe(
        "Required. The name of the source availability group. Only used by DAG migrations.",
      ).optional(),
    }).describe(
      "Configuration for distributed availability group (DAG) for the SQL Server homogeneous migration.",
    ).optional(),
    databaseBackups: z.array(z.object({
      database: z.string().describe(
        "Required. Name of a SQL Server database for which to define backup configuration.",
      ).optional(),
      encryptionOptions: z.object({
        certPath: z.string().describe(
          "Required. Path to the Certificate (.cer) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.",
        ).optional(),
        pvkPassword: z.string().describe(
          "Required. Input only. Password that encrypts the private key.",
        ).optional(),
        pvkPath: z.string().describe(
          "Required. Path to the Certificate Private Key (.pvk) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.",
        ).optional(),
      }).describe("Encryption settings for the SQL Server database.")
        .optional(),
    })).describe("Required. Backup details per database in Cloud Storage.")
      .optional(),
    promoteWhenReady: z.boolean().describe(
      "Optional. Promote databases when ready.",
    ).optional(),
    useDiffBackup: z.boolean().describe(
      "Optional. Enable differential backups.",
    ).optional(),
  }).describe(
    "Configuration for homogeneous migration to Cloud SQL for SQL Server.",
  ).optional(),
  sqlserverToPostgresConfig: z.object({
    postgresDestinationConfig: z.object({
      maxConcurrentConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the destination for data migration.",
      ).optional(),
      transactionTimeout: z.string().describe(
        "Optional. Timeout for data migration transactions.",
      ).optional(),
    }).describe("Configuration for Postgres as a destination in a migration.")
      .optional(),
    sqlserverSourceConfig: z.object({
      cdcStartPosition: z.string().describe(
        "Optional. The log sequence number (LSN) to start CDC data migration from.",
      ).optional(),
      maxConcurrentCdcConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase.",
      ).optional(),
      maxConcurrentFullDumpConnections: z.number().int().describe(
        "Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase.",
      ).optional(),
      skipFullDump: z.boolean().describe(
        "Optional. Whether to skip full dump or not.",
      ).optional(),
    }).describe("Configuration for SQL Server as a source in a migration.")
      .optional(),
  }).describe(
    "Configuration for heterogeneous **SQL Server to Cloud SQL for PostgreSQL** migrations.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "MAINTENANCE",
    "DRAFT",
    "CREATING",
    "NOT_STARTED",
    "RUNNING",
    "FAILED",
    "COMPLETED",
    "DELETING",
    "STOPPING",
    "STOPPED",
    "DELETED",
    "UPDATING",
    "STARTING",
    "RESTARTING",
    "RESUMING",
  ]).describe("The current migration job state.").optional(),
  staticIpConnectivity: z.object({}).describe(
    "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "ONE_TIME", "CONTINUOUS"]).describe(
    "Required. The migration job type.",
  ).optional(),
  vpcPeeringConnectivity: z.object({
    vpc: z.string().describe(
      "The name of the VPC network to peer with the Cloud SQL private network.",
    ).optional(),
  }).describe(
    "The details of the VPC where the source database is located in Google Cloud. We will use this information to set up the VPC peering connection between Cloud SQL and this VPC.",
  ).optional(),
  migrationJobId: z.string().describe(
    "Required. The ID of the instance to create.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Database Migration MigrationJobs. Registered at `@swamp/gcp/datamigration/migrationjobs`. */
export const model = {
  type: "@swamp/gcp/datamigration/migrationjobs",
  version: "2026.05.24.1",
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
      toVersion: "2026.05.06.1",
      description: "Added: postgresHomogeneousConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: postgresHomogeneousConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          postgresHomogeneousConfig: _postgresHomogeneousConfig,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: postgresHomogeneousConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: postgresHomogeneousConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          postgresHomogeneousConfig: _postgresHomogeneousConfig,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: postgresHomogeneousConfig",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Database Migration Service migration job object.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a migrationJobs",
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
        if (g["cmekKeyName"] !== undefined) {
          body["cmekKeyName"] = g["cmekKeyName"];
        }
        if (g["conversionWorkspace"] !== undefined) {
          body["conversionWorkspace"] = g["conversionWorkspace"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["destinationDatabase"] !== undefined) {
          body["destinationDatabase"] = g["destinationDatabase"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["dumpFlags"] !== undefined) body["dumpFlags"] = g["dumpFlags"];
        if (g["dumpPath"] !== undefined) body["dumpPath"] = g["dumpPath"];
        if (g["dumpType"] !== undefined) body["dumpType"] = g["dumpType"];
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectsConfig"] !== undefined) {
          body["objectsConfig"] = g["objectsConfig"];
        }
        if (g["oracleToPostgresConfig"] !== undefined) {
          body["oracleToPostgresConfig"] = g["oracleToPostgresConfig"];
        }
        if (g["originalMigrationName"] !== undefined) {
          body["originalMigrationName"] = g["originalMigrationName"];
        }
        if (g["performanceConfig"] !== undefined) {
          body["performanceConfig"] = g["performanceConfig"];
        }
        if (g["postgresHomogeneousConfig"] !== undefined) {
          body["postgresHomogeneousConfig"] = g["postgresHomogeneousConfig"];
        }
        if (g["postgresToSqlserverConfig"] !== undefined) {
          body["postgresToSqlserverConfig"] = g["postgresToSqlserverConfig"];
        }
        if (g["reverseSshConnectivity"] !== undefined) {
          body["reverseSshConnectivity"] = g["reverseSshConnectivity"];
        }
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["sourceDatabase"] !== undefined) {
          body["sourceDatabase"] = g["sourceDatabase"];
        }
        if (g["sqlserverHomogeneousMigrationJobConfig"] !== undefined) {
          body["sqlserverHomogeneousMigrationJobConfig"] =
            g["sqlserverHomogeneousMigrationJobConfig"];
        }
        if (g["sqlserverToPostgresConfig"] !== undefined) {
          body["sqlserverToPostgresConfig"] = g["sqlserverToPostgresConfig"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["staticIpConnectivity"] !== undefined) {
          body["staticIpConnectivity"] = g["staticIpConnectivity"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["vpcPeeringConnectivity"] !== undefined) {
          body["vpcPeeringConnectivity"] = g["vpcPeeringConnectivity"];
        }
        if (g["migrationJobId"] !== undefined) {
          body["migrationJobId"] = g["migrationJobId"];
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
              "readyValues": ["RUNNING", "COMPLETED"],
              "failedValues": ["FAILED", "STOPPED"],
            }
            : undefined,
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
      description: "Get a migrationJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the migrationJobs"),
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
      description: "Update migrationJobs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["cmekKeyName"] !== undefined) {
          body["cmekKeyName"] = g["cmekKeyName"];
        }
        if (g["conversionWorkspace"] !== undefined) {
          body["conversionWorkspace"] = g["conversionWorkspace"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["destinationDatabase"] !== undefined) {
          body["destinationDatabase"] = g["destinationDatabase"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["dumpFlags"] !== undefined) body["dumpFlags"] = g["dumpFlags"];
        if (g["dumpPath"] !== undefined) body["dumpPath"] = g["dumpPath"];
        if (g["dumpType"] !== undefined) body["dumpType"] = g["dumpType"];
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["objectsConfig"] !== undefined) {
          body["objectsConfig"] = g["objectsConfig"];
        }
        if (g["oracleToPostgresConfig"] !== undefined) {
          body["oracleToPostgresConfig"] = g["oracleToPostgresConfig"];
        }
        if (g["originalMigrationName"] !== undefined) {
          body["originalMigrationName"] = g["originalMigrationName"];
        }
        if (g["performanceConfig"] !== undefined) {
          body["performanceConfig"] = g["performanceConfig"];
        }
        if (g["postgresHomogeneousConfig"] !== undefined) {
          body["postgresHomogeneousConfig"] = g["postgresHomogeneousConfig"];
        }
        if (g["postgresToSqlserverConfig"] !== undefined) {
          body["postgresToSqlserverConfig"] = g["postgresToSqlserverConfig"];
        }
        if (g["reverseSshConnectivity"] !== undefined) {
          body["reverseSshConnectivity"] = g["reverseSshConnectivity"];
        }
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["sourceDatabase"] !== undefined) {
          body["sourceDatabase"] = g["sourceDatabase"];
        }
        if (g["sqlserverHomogeneousMigrationJobConfig"] !== undefined) {
          body["sqlserverHomogeneousMigrationJobConfig"] =
            g["sqlserverHomogeneousMigrationJobConfig"];
        }
        if (g["sqlserverToPostgresConfig"] !== undefined) {
          body["sqlserverToPostgresConfig"] = g["sqlserverToPostgresConfig"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["staticIpConnectivity"] !== undefined) {
          body["staticIpConnectivity"] = g["staticIpConnectivity"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["vpcPeeringConnectivity"] !== undefined) {
          body["vpcPeeringConnectivity"] = g["vpcPeeringConnectivity"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "COMPLETED"],
              "failedValues": ["FAILED", "STOPPED"],
            }
            : undefined,
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
      description: "Delete the migrationJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the migrationJobs"),
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
      description: "Sync migrationJobs state from GCP",
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
    demote_destination: {
      description: "demote destination",
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
              "datamigration.projects.locations.migrationJobs.demoteDestination",
            "path": "v1/{+name}:demoteDestination",
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
    fetch_source_objects: {
      description: "fetch source objects",
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
              "datamigration.projects.locations.migrationJobs.fetchSourceObjects",
            "path": "v1/{+name}:fetchSourceObjects",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    generate_ssh_script: {
      description: "generate ssh script",
      arguments: z.object({
        vm: z.any().optional(),
        vmCreationConfig: z.any().optional(),
        vmPort: z.any().optional(),
        vmSelectionConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["migrationJob"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["vm"] !== undefined) body["vm"] = args["vm"];
        if (args["vmCreationConfig"] !== undefined) {
          body["vmCreationConfig"] = args["vmCreationConfig"];
        }
        if (args["vmPort"] !== undefined) body["vmPort"] = args["vmPort"];
        if (args["vmSelectionConfig"] !== undefined) {
          body["vmSelectionConfig"] = args["vmSelectionConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datamigration.projects.locations.migrationJobs.generateSshScript",
            "path": "v1/{+migrationJob}:generateSshScript",
            "httpMethod": "POST",
            "parameterOrder": ["migrationJob"],
            "parameters": {
              "migrationJob": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_tcp_proxy_script: {
      description: "generate tcp proxy script",
      arguments: z.object({
        vmMachineType: z.any().optional(),
        vmName: z.any().optional(),
        vmSubnet: z.any().optional(),
        vmZone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["migrationJob"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["vmMachineType"] !== undefined) {
          body["vmMachineType"] = args["vmMachineType"];
        }
        if (args["vmName"] !== undefined) body["vmName"] = args["vmName"];
        if (args["vmSubnet"] !== undefined) body["vmSubnet"] = args["vmSubnet"];
        if (args["vmZone"] !== undefined) body["vmZone"] = args["vmZone"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datamigration.projects.locations.migrationJobs.generateTcpProxyScript",
            "path": "v1/{+migrationJob}:generateTcpProxyScript",
            "httpMethod": "POST",
            "parameterOrder": ["migrationJob"],
            "parameters": {
              "migrationJob": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "datamigration.projects.locations.migrationJobs.getIamPolicy",
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
        );
        return { result };
      },
    },
    promote: {
      description: "promote",
      arguments: z.object({
        objectsFilter: z.any().optional(),
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
        if (args["objectsFilter"] !== undefined) {
          body["objectsFilter"] = args["objectsFilter"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datamigration.projects.locations.migrationJobs.promote",
            "path": "v1/{+name}:promote",
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
      arguments: z.object({
        objectsFilter: z.any().optional(),
        restartFailedObjects: z.any().optional(),
        skipValidation: z.any().optional(),
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
        if (args["objectsFilter"] !== undefined) {
          body["objectsFilter"] = args["objectsFilter"];
        }
        if (args["restartFailedObjects"] !== undefined) {
          body["restartFailedObjects"] = args["restartFailedObjects"];
        }
        if (args["skipValidation"] !== undefined) {
          body["skipValidation"] = args["skipValidation"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datamigration.projects.locations.migrationJobs.restart",
            "path": "v1/{+name}:restart",
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
    resume: {
      description: "resume",
      arguments: z.object({
        skipValidation: z.any().optional(),
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
        if (args["skipValidation"] !== undefined) {
          body["skipValidation"] = args["skipValidation"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datamigration.projects.locations.migrationJobs.resume",
            "path": "v1/{+name}:resume",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "datamigration.projects.locations.migrationJobs.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start: {
      description: "start",
      arguments: z.object({
        skipValidation: z.any().optional(),
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
        if (args["skipValidation"] !== undefined) {
          body["skipValidation"] = args["skipValidation"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datamigration.projects.locations.migrationJobs.start",
            "path": "v1/{+name}:start",
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
            "id": "datamigration.projects.locations.migrationJobs.stop",
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "datamigration.projects.locations.migrationJobs.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    verify: {
      description: "verify",
      arguments: z.object({
        migrationJob: z.any().optional(),
        updateMask: z.any().optional(),
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
        if (args["migrationJob"] !== undefined) {
          body["migrationJob"] = args["migrationJob"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "datamigration.projects.locations.migrationJobs.verify",
            "path": "v1/{+name}:verify",
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
