// Auto-generated extension model for @swamp/gcp/datastream/streams
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Datastream Streams.
 *
 * A resource representing streaming data from a source to a destination.
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
  return `${parent}/streams/${shortName}`;
}

const BASE_URL = "https://datastream.googleapis.com/";

const GET_CONFIG = {
  "id": "datastream.projects.locations.streams.get",
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
  "id": "datastream.projects.locations.streams.create",
  "path": "v1/{+parent}/streams",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "streamId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datastream.projects.locations.streams.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
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
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datastream.projects.locations.streams.delete",
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
  "id": "datastream.projects.locations.streams.list",
  "path": "v1/{+parent}/streams",
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
  backfillAll: z.object({
    mongodbExcludedObjects: z.object({
      databases: z.array(z.object({
        collections: z.array(z.unknown()).describe(
          "Collections in the database.",
        ).optional(),
        database: z.string().describe("The database name.").optional(),
      })).describe("MongoDB databases in the cluster.").optional(),
    }).describe("MongoDB Cluster structure.").optional(),
    mysqlExcludedObjects: z.object({
      mysqlDatabases: z.array(z.object({
        database: z.string().describe("The database name.").optional(),
        mysqlTables: z.array(z.unknown()).describe("Tables in the database.")
          .optional(),
      })).describe("Mysql databases on the server").optional(),
    }).describe("MySQL database structure").optional(),
    oracleExcludedObjects: z.object({
      oracleSchemas: z.array(z.object({
        oracleTables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
        schema: z.string().describe("The schema name.").optional(),
      })).describe("Oracle schemas/databases in the database server.")
        .optional(),
    }).describe("Oracle database structure.").optional(),
    postgresqlExcludedObjects: z.object({
      postgresqlSchemas: z.array(z.object({
        postgresqlTables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
        schema: z.string().describe("The schema name.").optional(),
      })).describe("PostgreSQL schemas in the database server.").optional(),
    }).describe("PostgreSQL database structure.").optional(),
    salesforceExcludedObjects: z.object({
      objects: z.array(z.object({
        fields: z.array(z.unknown()).describe(
          "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
        ).optional(),
        objectName: z.string().describe("The object name.").optional(),
      })).describe("Salesforce objects in the database server.").optional(),
    }).describe("Salesforce organization structure.").optional(),
    spannerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string().describe("Required. The schema name.").optional(),
        tables: z.array(z.unknown()).describe(
          "Optional. Spanner tables in the schema.",
        ).optional(),
      })).describe("Optional. Spanner schemas in the database.").optional(),
    }).describe("Spanner database structure.").optional(),
    sqlServerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string().describe("The schema name.").optional(),
        tables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
      })).describe("SQLServer schemas in the database server.").optional(),
    }).describe("SQLServer database structure.").optional(),
  }).describe(
    "Backfill strategy to automatically backfill the Stream's objects. Specific objects can be excluded.",
  ).optional(),
  backfillNone: z.object({}).describe(
    "Backfill strategy to disable automatic backfill for the Stream's objects.",
  ).optional(),
  customerManagedEncryptionKey: z.string().describe(
    "Immutable. A reference to a KMS encryption key. If provided, it will be used to encrypt the data. If left blank, data will be encrypted using an internal Stream-specific encryption key provisioned through KMS.",
  ).optional(),
  destinationConfig: z.object({
    bigqueryDestinationConfig: z.object({
      appendOnly: z.object({}).describe(
        "AppendOnly mode defines that all changes to a table will be written to the destination table.",
      ).optional(),
      blmtConfig: z.object({
        bucket: z.string().describe("Required. The Cloud Storage bucket name.")
          .optional(),
        connectionName: z.string().describe(
          "Required. The bigquery connection. Format: `{project}.{location}.{name}`",
        ).optional(),
        fileFormat: z.enum(["FILE_FORMAT_UNSPECIFIED", "PARQUET"]).describe(
          "Required. The file format.",
        ).optional(),
        rootPath: z.string().describe(
          "The root path inside the Cloud Storage bucket.",
        ).optional(),
        tableFormat: z.enum(["TABLE_FORMAT_UNSPECIFIED", "ICEBERG"]).describe(
          "Required. The table format.",
        ).optional(),
      }).describe("The configuration for BLMT.").optional(),
      dataFreshness: z.string().describe(
        "The guaranteed data freshness (in seconds) when querying tables created by the stream. Editing this field will only affect new tables created in the future, but existing tables will not be impacted. Lower values mean that queries will return fresher data, but may result in higher cost.",
      ).optional(),
      merge: z.object({}).describe(
        "Merge mode defines that all changes to a table will be merged at the destination table.",
      ).optional(),
      singleTargetDataset: z.object({
        datasetId: z.string().describe(
          "The dataset ID of the target dataset. DatasetIds allowed characters: https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets#datasetreference.",
        ).optional(),
      }).describe("A single target dataset to which all data will be streamed.")
        .optional(),
      sourceHierarchyDatasets: z.object({
        datasetTemplate: z.object({
          datasetIdPrefix: z.string().describe(
            "If supplied, every created dataset will have its name prefixed by the provided value. The prefix and name will be separated by an underscore. i.e. _.",
          ).optional(),
          kmsKeyName: z.string().describe(
            "Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key. i.e. projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{cryptoKey}. See https://cloud.google.com/bigquery/docs/customer-managed-encryption for more information.",
          ).optional(),
          location: z.string().describe(
            "Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations.",
          ).optional(),
        }).describe("Dataset template used for dynamic dataset creation.")
          .optional(),
        projectId: z.string().describe(
          "Optional. The project id of the BigQuery dataset. If not specified, the project will be inferred from the stream resource.",
        ).optional(),
      }).describe(
        "Destination datasets are created so that hierarchy of the destination data objects matches the source hierarchy.",
      ).optional(),
    }).describe("BigQuery destination configuration").optional(),
    destinationConnectionProfile: z.string().describe(
      "Required. Destination connection profile resource. Format: `projects/{project}/locations/{location}/connectionProfiles/{name}`",
    ).optional(),
    gcsDestinationConfig: z.object({
      avroFileFormat: z.object({}).describe("AVRO file format configuration.")
        .optional(),
      fileRotationInterval: z.string().describe(
        "The maximum duration for which new events are added before a file is closed and a new file is created. Values within the range of 15-60 seconds are allowed.",
      ).optional(),
      fileRotationMb: z.number().int().describe(
        "The maximum file size to be saved in the bucket.",
      ).optional(),
      jsonFileFormat: z.object({
        compression: z.enum([
          "JSON_COMPRESSION_UNSPECIFIED",
          "NO_COMPRESSION",
          "GZIP",
        ]).describe("Compression of the loaded JSON file.").optional(),
        schemaFileFormat: z.enum([
          "SCHEMA_FILE_FORMAT_UNSPECIFIED",
          "NO_SCHEMA_FILE",
          "AVRO_SCHEMA_FILE",
        ]).describe("The schema file format along JSON data files.").optional(),
      }).describe("JSON file format configuration.").optional(),
      path: z.string().describe(
        "Path inside the Cloud Storage bucket to write data to.",
      ).optional(),
    }).describe("Google Cloud Storage destination configuration").optional(),
  }).describe("The configuration of the stream destination.").optional(),
  displayName: z.string().describe("Required. Display name.").optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  ruleSets: z.array(z.object({
    customizationRules: z.array(z.object({
      bigqueryClustering: z.object({
        columns: z.unknown().describe(
          "Required. Column names to set as clustering columns.",
        ).optional(),
      }).describe("BigQuery clustering configuration.").optional(),
      bigqueryPartitioning: z.object({
        ingestionTimePartition: z.unknown().describe(
          "Ingestion time partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time",
        ).optional(),
        integerRangePartition: z.unknown().describe(
          "Integer range partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#integer_range",
        ).optional(),
        requirePartitionFilter: z.unknown().describe(
          "Optional. If true, queries over the table require a partition filter.",
        ).optional(),
        timeUnitPartition: z.unknown().describe(
          "Time unit column partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#date_timestamp_partitioned_tables",
        ).optional(),
      }).describe("BigQuery partitioning configuration.").optional(),
    })).describe("Required. List of customization rules to apply.").optional(),
    objectFilter: z.object({
      sourceObjectIdentifier: z.object({
        mongodbIdentifier: z.object({
          collection: z.unknown().describe("Required. The collection name.")
            .optional(),
          database: z.unknown().describe("Required. The database name.")
            .optional(),
        }).describe("MongoDB data source object identifier.").optional(),
        mysqlIdentifier: z.object({
          database: z.unknown().describe("Required. The database name.")
            .optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Mysql data source object identifier.").optional(),
        oracleIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Oracle data source object identifier.").optional(),
        postgresqlIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("PostgreSQL data source object identifier.").optional(),
        salesforceIdentifier: z.object({
          objectName: z.unknown().describe("Required. The object name.")
            .optional(),
        }).describe("Salesforce data source object identifier.").optional(),
        spannerIdentifier: z.object({
          schema: z.unknown().describe("Optional. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Spanner data source object identifier.").optional(),
        sqlServerIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("SQLServer data source object identifier.").optional(),
      }).describe("Represents an identifier of an object in the data source.")
        .optional(),
    }).describe("Object filter to apply the rules to.").optional(),
  })).describe("Optional. Rule sets to apply to the stream.").optional(),
  sourceConfig: z.object({
    mongodbSourceConfig: z.object({
      excludeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown().describe("Collections in the database.")
            .optional(),
          database: z.unknown().describe("The database name.").optional(),
        })).describe("MongoDB databases in the cluster.").optional(),
      }).describe("MongoDB Cluster structure.").optional(),
      includeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown().describe("Collections in the database.")
            .optional(),
          database: z.unknown().describe("The database name.").optional(),
        })).describe("MongoDB databases in the cluster.").optional(),
      }).describe("MongoDB Cluster structure.").optional(),
      jsonMode: z.enum(["MONGODB_JSON_MODE_UNSPECIFIED", "STRICT", "CANONICAL"])
        .describe("Optional. MongoDB JSON mode to use for the stream.")
        .optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent backfill tasks. The number should be non-negative and less than or equal to 50. If not set (or set to 0), the system's default value is used",
      ).optional(),
    }).describe("Configuration for syncing data from a MongoDB source.")
      .optional(),
    mysqlSourceConfig: z.object({
      binaryLogPosition: z.object({}).describe(
        "Use Binary log position based replication.",
      ).optional(),
      excludeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown().describe("The database name.").optional(),
          mysqlTables: z.unknown().describe("Tables in the database.")
            .optional(),
        })).describe("Mysql databases on the server").optional(),
      }).describe("MySQL database structure").optional(),
      gtid: z.object({}).describe("Use GTID based replication.").optional(),
      includeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown().describe("The database name.").optional(),
          mysqlTables: z.unknown().describe("Tables in the database.")
            .optional(),
        })).describe("Mysql databases on the server").optional(),
      }).describe("MySQL database structure").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Maximum number of concurrent CDC tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
    }).describe("Configuration for syncing data from a MySQL source.")
      .optional(),
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
      dropLargeObjects: z.object({}).describe(
        "Configuration to drop large object values.",
      ).optional(),
      excludeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("Oracle schemas/databases in the database server.")
          .optional(),
      }).describe("Oracle database structure.").optional(),
      includeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("Oracle schemas/databases in the database server.")
          .optional(),
      }).describe("Oracle database structure.").optional(),
      logMiner: z.object({}).describe(
        "Configuration to use LogMiner CDC method.",
      ).optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non-negative. If not set (or set to 0), the system's default value is used.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Maximum number of concurrent CDC tasks. The number should be non-negative. If not set (or set to 0), the system's default value is used.",
      ).optional(),
      streamLargeObjects: z.object({}).describe(
        "Configuration to stream large object values.",
      ).optional(),
    }).describe("Configuration for syncing data from an Oracle source.")
      .optional(),
    postgresqlSourceConfig: z.object({
      excludeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("PostgreSQL schemas in the database server.").optional(),
      }).describe("PostgreSQL database structure.").optional(),
      includeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("PostgreSQL schemas in the database server.").optional(),
      }).describe("PostgreSQL database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
      publication: z.string().describe(
        "Required. The name of the publication that includes the set of all tables that are defined in the stream's include_objects.",
      ).optional(),
      replicationSlot: z.string().describe(
        "Required. Immutable. The name of the logical replication slot that's configured with the pgoutput plugin.",
      ).optional(),
    }).describe("Configuration for syncing data from a PostgreSQL source.")
      .optional(),
    salesforceSourceConfig: z.object({
      excludeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown().describe(
            "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
          ).optional(),
          objectName: z.unknown().describe("The object name.").optional(),
        })).describe("Salesforce objects in the database server.").optional(),
      }).describe("Salesforce organization structure.").optional(),
      includeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown().describe(
            "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
          ).optional(),
          objectName: z.unknown().describe("The object name.").optional(),
        })).describe("Salesforce objects in the database server.").optional(),
      }).describe("Salesforce organization structure.").optional(),
      pollingInterval: z.string().describe(
        "Required. Salesforce objects polling interval. The interval at which new changes will be polled for each object. The duration must be from `5 minutes` to `24 hours`, inclusive.",
      ).optional(),
    }).describe("Configuration for syncing data from a Salesforce source.")
      .optional(),
    sourceConnectionProfile: z.string().describe(
      "Required. Source connection profile resource. Format: `projects/{project}/locations/{location}/connectionProfiles/{name}`",
    ).optional(),
    spannerSourceConfig: z.object({
      backfillDataBoostEnabled: z.boolean().describe(
        "Optional. Whether to use Data Boost for Spanner backfills. Defaults to false if not set.",
      ).optional(),
      changeStreamName: z.string().describe(
        "Required. Immutable. The change stream name to use for the stream.",
      ).optional(),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          tables: z.unknown().describe(
            "Optional. Spanner tables in the schema.",
          ).optional(),
        })).describe("Optional. Spanner schemas in the database.").optional(),
      }).describe("Spanner database structure.").optional(),
      fgacRole: z.string().describe(
        "Optional. The FGAC role to use for the stream.",
      ).optional(),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          tables: z.unknown().describe(
            "Optional. Spanner tables in the schema.",
          ).optional(),
        })).describe("Optional. Spanner schemas in the database.").optional(),
      }).describe("Spanner database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent backfill tasks.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent CDC tasks.",
      ).optional(),
      spannerRpcPriority: z.enum([
        "SPANNER_RPC_PRIORITY_UNSPECIFIED",
        "LOW",
        "MEDIUM",
        "HIGH",
      ]).describe("Optional. The RPC priority to use for the stream.")
        .optional(),
    }).describe("Configuration for syncing data from a Spanner source.")
      .optional(),
    sqlServerSourceConfig: z.object({
      changeTables: z.object({}).describe(
        "Configuration to use Change Tables CDC read method.",
      ).optional(),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("The schema name.").optional(),
          tables: z.unknown().describe("Tables in the schema.").optional(),
        })).describe("SQLServer schemas in the database server.").optional(),
      }).describe("SQLServer database structure.").optional(),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("The schema name.").optional(),
          tables: z.unknown().describe("Tables in the schema.").optional(),
        })).describe("SQLServer schemas in the database server.").optional(),
      }).describe("SQLServer database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Max concurrent backfill tasks.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Max concurrent CDC tasks.",
      ).optional(),
      transactionLogs: z.object({}).describe(
        "Configuration to use Transaction Logs CDC read method.",
      ).optional(),
    }).describe("Configuration for syncing data from a SQLServer source.")
      .optional(),
  }).describe("The configuration of the stream source.").optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "NOT_STARTED",
    "RUNNING",
    "PAUSED",
    "MAINTENANCE",
    "FAILED",
    "FAILED_PERMANENTLY",
    "STARTING",
    "DRAINING",
  ]).describe("The state of the stream.").optional(),
  force: z.string().describe(
    "Optional. Create the stream without validating it.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  streamId: z.string().describe("Required. The stream identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backfillAll: z.object({
    mongodbExcludedObjects: z.object({
      databases: z.array(z.object({
        collections: z.array(z.unknown()),
        database: z.string(),
      })),
    }),
    mysqlExcludedObjects: z.object({
      mysqlDatabases: z.array(z.object({
        database: z.string(),
        mysqlTables: z.array(z.unknown()),
      })),
    }),
    oracleExcludedObjects: z.object({
      oracleSchemas: z.array(z.object({
        oracleTables: z.array(z.unknown()),
        schema: z.string(),
      })),
    }),
    postgresqlExcludedObjects: z.object({
      postgresqlSchemas: z.array(z.object({
        postgresqlTables: z.array(z.unknown()),
        schema: z.string(),
      })),
    }),
    salesforceExcludedObjects: z.object({
      objects: z.array(z.object({
        fields: z.array(z.unknown()),
        objectName: z.string(),
      })),
    }),
    spannerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string(),
        tables: z.array(z.unknown()),
      })),
    }),
    sqlServerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string(),
        tables: z.array(z.unknown()),
      })),
    }),
  }).optional(),
  backfillNone: z.object({}).optional(),
  createTime: z.string().optional(),
  customerManagedEncryptionKey: z.string().optional(),
  destinationConfig: z.object({
    bigqueryDestinationConfig: z.object({
      appendOnly: z.object({}),
      blmtConfig: z.object({
        bucket: z.string(),
        connectionName: z.string(),
        fileFormat: z.string(),
        rootPath: z.string(),
        tableFormat: z.string(),
      }),
      dataFreshness: z.string(),
      merge: z.object({}),
      singleTargetDataset: z.object({
        datasetId: z.string(),
      }),
      sourceHierarchyDatasets: z.object({
        datasetTemplate: z.object({
          datasetIdPrefix: z.string(),
          kmsKeyName: z.string(),
          location: z.string(),
        }),
        projectId: z.string(),
      }),
    }),
    destinationConnectionProfile: z.string(),
    gcsDestinationConfig: z.object({
      avroFileFormat: z.object({}),
      fileRotationInterval: z.string(),
      fileRotationMb: z.number(),
      jsonFileFormat: z.object({
        compression: z.string(),
        schemaFileFormat: z.string(),
      }),
      path: z.string(),
    }),
  }).optional(),
  displayName: z.string().optional(),
  errors: z.array(z.object({
    details: z.record(z.string(), z.unknown()),
    errorTime: z.string(),
    errorUuid: z.string(),
    message: z.string(),
    reason: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastRecoveryTime: z.string().optional(),
  name: z.string(),
  ruleSets: z.array(z.object({
    customizationRules: z.array(z.object({
      bigqueryClustering: z.object({
        columns: z.unknown(),
      }),
      bigqueryPartitioning: z.object({
        ingestionTimePartition: z.unknown(),
        integerRangePartition: z.unknown(),
        requirePartitionFilter: z.unknown(),
        timeUnitPartition: z.unknown(),
      }),
    })),
    objectFilter: z.object({
      sourceObjectIdentifier: z.object({
        mongodbIdentifier: z.object({
          collection: z.unknown(),
          database: z.unknown(),
        }),
        mysqlIdentifier: z.object({
          database: z.unknown(),
          table: z.unknown(),
        }),
        oracleIdentifier: z.object({
          schema: z.unknown(),
          table: z.unknown(),
        }),
        postgresqlIdentifier: z.object({
          schema: z.unknown(),
          table: z.unknown(),
        }),
        salesforceIdentifier: z.object({
          objectName: z.unknown(),
        }),
        spannerIdentifier: z.object({
          schema: z.unknown(),
          table: z.unknown(),
        }),
        sqlServerIdentifier: z.object({
          schema: z.unknown(),
          table: z.unknown(),
        }),
      }),
    }),
  })).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  sourceConfig: z.object({
    mongodbSourceConfig: z.object({
      excludeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown(),
          database: z.unknown(),
        })),
      }),
      includeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown(),
          database: z.unknown(),
        })),
      }),
      jsonMode: z.string(),
      maxConcurrentBackfillTasks: z.number(),
    }),
    mysqlSourceConfig: z.object({
      binaryLogPosition: z.object({}),
      excludeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown(),
          mysqlTables: z.unknown(),
        })),
      }),
      gtid: z.object({}),
      includeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown(),
          mysqlTables: z.unknown(),
        })),
      }),
      maxConcurrentBackfillTasks: z.number(),
      maxConcurrentCdcTasks: z.number(),
    }),
    oracleSourceConfig: z.object({
      binaryLogParser: z.object({
        logFileDirectories: z.object({
          archivedLogDirectory: z.string(),
          onlineLogDirectory: z.string(),
        }),
        oracleAsmLogFileAccess: z.object({}),
      }),
      dropLargeObjects: z.object({}),
      excludeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown(),
          schema: z.unknown(),
        })),
      }),
      includeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown(),
          schema: z.unknown(),
        })),
      }),
      logMiner: z.object({}),
      maxConcurrentBackfillTasks: z.number(),
      maxConcurrentCdcTasks: z.number(),
      streamLargeObjects: z.object({}),
    }),
    postgresqlSourceConfig: z.object({
      excludeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown(),
          schema: z.unknown(),
        })),
      }),
      includeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown(),
          schema: z.unknown(),
        })),
      }),
      maxConcurrentBackfillTasks: z.number(),
      publication: z.string(),
      replicationSlot: z.string(),
    }),
    salesforceSourceConfig: z.object({
      excludeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown(),
          objectName: z.unknown(),
        })),
      }),
      includeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown(),
          objectName: z.unknown(),
        })),
      }),
      pollingInterval: z.string(),
    }),
    sourceConnectionProfile: z.string(),
    spannerSourceConfig: z.object({
      backfillDataBoostEnabled: z.boolean(),
      changeStreamName: z.string(),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown(),
          tables: z.unknown(),
        })),
      }),
      fgacRole: z.string(),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown(),
          tables: z.unknown(),
        })),
      }),
      maxConcurrentBackfillTasks: z.number(),
      maxConcurrentCdcTasks: z.number(),
      spannerRpcPriority: z.string(),
    }),
    sqlServerSourceConfig: z.object({
      changeTables: z.object({}),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown(),
          tables: z.unknown(),
        })),
      }),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown(),
          tables: z.unknown(),
        })),
      }),
      maxConcurrentBackfillTasks: z.number(),
      maxConcurrentCdcTasks: z.number(),
      transactionLogs: z.object({}),
    }),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  backfillAll: z.object({
    mongodbExcludedObjects: z.object({
      databases: z.array(z.object({
        collections: z.array(z.unknown()).describe(
          "Collections in the database.",
        ).optional(),
        database: z.string().describe("The database name.").optional(),
      })).describe("MongoDB databases in the cluster.").optional(),
    }).describe("MongoDB Cluster structure.").optional(),
    mysqlExcludedObjects: z.object({
      mysqlDatabases: z.array(z.object({
        database: z.string().describe("The database name.").optional(),
        mysqlTables: z.array(z.unknown()).describe("Tables in the database.")
          .optional(),
      })).describe("Mysql databases on the server").optional(),
    }).describe("MySQL database structure").optional(),
    oracleExcludedObjects: z.object({
      oracleSchemas: z.array(z.object({
        oracleTables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
        schema: z.string().describe("The schema name.").optional(),
      })).describe("Oracle schemas/databases in the database server.")
        .optional(),
    }).describe("Oracle database structure.").optional(),
    postgresqlExcludedObjects: z.object({
      postgresqlSchemas: z.array(z.object({
        postgresqlTables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
        schema: z.string().describe("The schema name.").optional(),
      })).describe("PostgreSQL schemas in the database server.").optional(),
    }).describe("PostgreSQL database structure.").optional(),
    salesforceExcludedObjects: z.object({
      objects: z.array(z.object({
        fields: z.array(z.unknown()).describe(
          "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
        ).optional(),
        objectName: z.string().describe("The object name.").optional(),
      })).describe("Salesforce objects in the database server.").optional(),
    }).describe("Salesforce organization structure.").optional(),
    spannerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string().describe("Required. The schema name.").optional(),
        tables: z.array(z.unknown()).describe(
          "Optional. Spanner tables in the schema.",
        ).optional(),
      })).describe("Optional. Spanner schemas in the database.").optional(),
    }).describe("Spanner database structure.").optional(),
    sqlServerExcludedObjects: z.object({
      schemas: z.array(z.object({
        schema: z.string().describe("The schema name.").optional(),
        tables: z.array(z.unknown()).describe("Tables in the schema.")
          .optional(),
      })).describe("SQLServer schemas in the database server.").optional(),
    }).describe("SQLServer database structure.").optional(),
  }).describe(
    "Backfill strategy to automatically backfill the Stream's objects. Specific objects can be excluded.",
  ).optional(),
  backfillNone: z.object({}).describe(
    "Backfill strategy to disable automatic backfill for the Stream's objects.",
  ).optional(),
  customerManagedEncryptionKey: z.string().describe(
    "Immutable. A reference to a KMS encryption key. If provided, it will be used to encrypt the data. If left blank, data will be encrypted using an internal Stream-specific encryption key provisioned through KMS.",
  ).optional(),
  destinationConfig: z.object({
    bigqueryDestinationConfig: z.object({
      appendOnly: z.object({}).describe(
        "AppendOnly mode defines that all changes to a table will be written to the destination table.",
      ).optional(),
      blmtConfig: z.object({
        bucket: z.string().describe("Required. The Cloud Storage bucket name.")
          .optional(),
        connectionName: z.string().describe(
          "Required. The bigquery connection. Format: `{project}.{location}.{name}`",
        ).optional(),
        fileFormat: z.enum(["FILE_FORMAT_UNSPECIFIED", "PARQUET"]).describe(
          "Required. The file format.",
        ).optional(),
        rootPath: z.string().describe(
          "The root path inside the Cloud Storage bucket.",
        ).optional(),
        tableFormat: z.enum(["TABLE_FORMAT_UNSPECIFIED", "ICEBERG"]).describe(
          "Required. The table format.",
        ).optional(),
      }).describe("The configuration for BLMT.").optional(),
      dataFreshness: z.string().describe(
        "The guaranteed data freshness (in seconds) when querying tables created by the stream. Editing this field will only affect new tables created in the future, but existing tables will not be impacted. Lower values mean that queries will return fresher data, but may result in higher cost.",
      ).optional(),
      merge: z.object({}).describe(
        "Merge mode defines that all changes to a table will be merged at the destination table.",
      ).optional(),
      singleTargetDataset: z.object({
        datasetId: z.string().describe(
          "The dataset ID of the target dataset. DatasetIds allowed characters: https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets#datasetreference.",
        ).optional(),
      }).describe("A single target dataset to which all data will be streamed.")
        .optional(),
      sourceHierarchyDatasets: z.object({
        datasetTemplate: z.object({
          datasetIdPrefix: z.string().describe(
            "If supplied, every created dataset will have its name prefixed by the provided value. The prefix and name will be separated by an underscore. i.e. _.",
          ).optional(),
          kmsKeyName: z.string().describe(
            "Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key. i.e. projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{cryptoKey}. See https://cloud.google.com/bigquery/docs/customer-managed-encryption for more information.",
          ).optional(),
          location: z.string().describe(
            "Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations.",
          ).optional(),
        }).describe("Dataset template used for dynamic dataset creation.")
          .optional(),
        projectId: z.string().describe(
          "Optional. The project id of the BigQuery dataset. If not specified, the project will be inferred from the stream resource.",
        ).optional(),
      }).describe(
        "Destination datasets are created so that hierarchy of the destination data objects matches the source hierarchy.",
      ).optional(),
    }).describe("BigQuery destination configuration").optional(),
    destinationConnectionProfile: z.string().describe(
      "Required. Destination connection profile resource. Format: `projects/{project}/locations/{location}/connectionProfiles/{name}`",
    ).optional(),
    gcsDestinationConfig: z.object({
      avroFileFormat: z.object({}).describe("AVRO file format configuration.")
        .optional(),
      fileRotationInterval: z.string().describe(
        "The maximum duration for which new events are added before a file is closed and a new file is created. Values within the range of 15-60 seconds are allowed.",
      ).optional(),
      fileRotationMb: z.number().int().describe(
        "The maximum file size to be saved in the bucket.",
      ).optional(),
      jsonFileFormat: z.object({
        compression: z.enum([
          "JSON_COMPRESSION_UNSPECIFIED",
          "NO_COMPRESSION",
          "GZIP",
        ]).describe("Compression of the loaded JSON file.").optional(),
        schemaFileFormat: z.enum([
          "SCHEMA_FILE_FORMAT_UNSPECIFIED",
          "NO_SCHEMA_FILE",
          "AVRO_SCHEMA_FILE",
        ]).describe("The schema file format along JSON data files.").optional(),
      }).describe("JSON file format configuration.").optional(),
      path: z.string().describe(
        "Path inside the Cloud Storage bucket to write data to.",
      ).optional(),
    }).describe("Google Cloud Storage destination configuration").optional(),
  }).describe("The configuration of the stream destination.").optional(),
  displayName: z.string().describe("Required. Display name.").optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  ruleSets: z.array(z.object({
    customizationRules: z.array(z.object({
      bigqueryClustering: z.object({
        columns: z.unknown().describe(
          "Required. Column names to set as clustering columns.",
        ).optional(),
      }).describe("BigQuery clustering configuration.").optional(),
      bigqueryPartitioning: z.object({
        ingestionTimePartition: z.unknown().describe(
          "Ingestion time partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time",
        ).optional(),
        integerRangePartition: z.unknown().describe(
          "Integer range partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#integer_range",
        ).optional(),
        requirePartitionFilter: z.unknown().describe(
          "Optional. If true, queries over the table require a partition filter.",
        ).optional(),
        timeUnitPartition: z.unknown().describe(
          "Time unit column partitioning. see https://cloud.google.com/bigquery/docs/partitioned-tables#date_timestamp_partitioned_tables",
        ).optional(),
      }).describe("BigQuery partitioning configuration.").optional(),
    })).describe("Required. List of customization rules to apply.").optional(),
    objectFilter: z.object({
      sourceObjectIdentifier: z.object({
        mongodbIdentifier: z.object({
          collection: z.unknown().describe("Required. The collection name.")
            .optional(),
          database: z.unknown().describe("Required. The database name.")
            .optional(),
        }).describe("MongoDB data source object identifier.").optional(),
        mysqlIdentifier: z.object({
          database: z.unknown().describe("Required. The database name.")
            .optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Mysql data source object identifier.").optional(),
        oracleIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Oracle data source object identifier.").optional(),
        postgresqlIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("PostgreSQL data source object identifier.").optional(),
        salesforceIdentifier: z.object({
          objectName: z.unknown().describe("Required. The object name.")
            .optional(),
        }).describe("Salesforce data source object identifier.").optional(),
        spannerIdentifier: z.object({
          schema: z.unknown().describe("Optional. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("Spanner data source object identifier.").optional(),
        sqlServerIdentifier: z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          table: z.unknown().describe("Required. The table name.").optional(),
        }).describe("SQLServer data source object identifier.").optional(),
      }).describe("Represents an identifier of an object in the data source.")
        .optional(),
    }).describe("Object filter to apply the rules to.").optional(),
  })).describe("Optional. Rule sets to apply to the stream.").optional(),
  sourceConfig: z.object({
    mongodbSourceConfig: z.object({
      excludeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown().describe("Collections in the database.")
            .optional(),
          database: z.unknown().describe("The database name.").optional(),
        })).describe("MongoDB databases in the cluster.").optional(),
      }).describe("MongoDB Cluster structure.").optional(),
      includeObjects: z.object({
        databases: z.array(z.object({
          collections: z.unknown().describe("Collections in the database.")
            .optional(),
          database: z.unknown().describe("The database name.").optional(),
        })).describe("MongoDB databases in the cluster.").optional(),
      }).describe("MongoDB Cluster structure.").optional(),
      jsonMode: z.enum(["MONGODB_JSON_MODE_UNSPECIFIED", "STRICT", "CANONICAL"])
        .describe("Optional. MongoDB JSON mode to use for the stream.")
        .optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent backfill tasks. The number should be non-negative and less than or equal to 50. If not set (or set to 0), the system's default value is used",
      ).optional(),
    }).describe("Configuration for syncing data from a MongoDB source.")
      .optional(),
    mysqlSourceConfig: z.object({
      binaryLogPosition: z.object({}).describe(
        "Use Binary log position based replication.",
      ).optional(),
      excludeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown().describe("The database name.").optional(),
          mysqlTables: z.unknown().describe("Tables in the database.")
            .optional(),
        })).describe("Mysql databases on the server").optional(),
      }).describe("MySQL database structure").optional(),
      gtid: z.object({}).describe("Use GTID based replication.").optional(),
      includeObjects: z.object({
        mysqlDatabases: z.array(z.object({
          database: z.unknown().describe("The database name.").optional(),
          mysqlTables: z.unknown().describe("Tables in the database.")
            .optional(),
        })).describe("Mysql databases on the server").optional(),
      }).describe("MySQL database structure").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Maximum number of concurrent CDC tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
    }).describe("Configuration for syncing data from a MySQL source.")
      .optional(),
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
      dropLargeObjects: z.object({}).describe(
        "Configuration to drop large object values.",
      ).optional(),
      excludeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("Oracle schemas/databases in the database server.")
          .optional(),
      }).describe("Oracle database structure.").optional(),
      includeObjects: z.object({
        oracleSchemas: z.array(z.object({
          oracleTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("Oracle schemas/databases in the database server.")
          .optional(),
      }).describe("Oracle database structure.").optional(),
      logMiner: z.object({}).describe(
        "Configuration to use LogMiner CDC method.",
      ).optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non-negative. If not set (or set to 0), the system's default value is used.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Maximum number of concurrent CDC tasks. The number should be non-negative. If not set (or set to 0), the system's default value is used.",
      ).optional(),
      streamLargeObjects: z.object({}).describe(
        "Configuration to stream large object values.",
      ).optional(),
    }).describe("Configuration for syncing data from an Oracle source.")
      .optional(),
    postgresqlSourceConfig: z.object({
      excludeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("PostgreSQL schemas in the database server.").optional(),
      }).describe("PostgreSQL database structure.").optional(),
      includeObjects: z.object({
        postgresqlSchemas: z.array(z.object({
          postgresqlTables: z.unknown().describe("Tables in the schema.")
            .optional(),
          schema: z.unknown().describe("The schema name.").optional(),
        })).describe("PostgreSQL schemas in the database server.").optional(),
      }).describe("PostgreSQL database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Maximum number of concurrent backfill tasks. The number should be non negative. If not set (or set to 0), the system's default value will be used.",
      ).optional(),
      publication: z.string().describe(
        "Required. The name of the publication that includes the set of all tables that are defined in the stream's include_objects.",
      ).optional(),
      replicationSlot: z.string().describe(
        "Required. Immutable. The name of the logical replication slot that's configured with the pgoutput plugin.",
      ).optional(),
    }).describe("Configuration for syncing data from a PostgreSQL source.")
      .optional(),
    salesforceSourceConfig: z.object({
      excludeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown().describe(
            "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
          ).optional(),
          objectName: z.unknown().describe("The object name.").optional(),
        })).describe("Salesforce objects in the database server.").optional(),
      }).describe("Salesforce organization structure.").optional(),
      includeObjects: z.object({
        objects: z.array(z.object({
          fields: z.unknown().describe(
            "Salesforce fields. When unspecified as part of include objects, includes everything, when unspecified as part of exclude objects, excludes nothing.",
          ).optional(),
          objectName: z.unknown().describe("The object name.").optional(),
        })).describe("Salesforce objects in the database server.").optional(),
      }).describe("Salesforce organization structure.").optional(),
      pollingInterval: z.string().describe(
        "Required. Salesforce objects polling interval. The interval at which new changes will be polled for each object. The duration must be from `5 minutes` to `24 hours`, inclusive.",
      ).optional(),
    }).describe("Configuration for syncing data from a Salesforce source.")
      .optional(),
    sourceConnectionProfile: z.string().describe(
      "Required. Source connection profile resource. Format: `projects/{project}/locations/{location}/connectionProfiles/{name}`",
    ).optional(),
    spannerSourceConfig: z.object({
      backfillDataBoostEnabled: z.boolean().describe(
        "Optional. Whether to use Data Boost for Spanner backfills. Defaults to false if not set.",
      ).optional(),
      changeStreamName: z.string().describe(
        "Required. Immutable. The change stream name to use for the stream.",
      ).optional(),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          tables: z.unknown().describe(
            "Optional. Spanner tables in the schema.",
          ).optional(),
        })).describe("Optional. Spanner schemas in the database.").optional(),
      }).describe("Spanner database structure.").optional(),
      fgacRole: z.string().describe(
        "Optional. The FGAC role to use for the stream.",
      ).optional(),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("Required. The schema name.").optional(),
          tables: z.unknown().describe(
            "Optional. Spanner tables in the schema.",
          ).optional(),
        })).describe("Optional. Spanner schemas in the database.").optional(),
      }).describe("Spanner database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent backfill tasks.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Optional. Maximum number of concurrent CDC tasks.",
      ).optional(),
      spannerRpcPriority: z.enum([
        "SPANNER_RPC_PRIORITY_UNSPECIFIED",
        "LOW",
        "MEDIUM",
        "HIGH",
      ]).describe("Optional. The RPC priority to use for the stream.")
        .optional(),
    }).describe("Configuration for syncing data from a Spanner source.")
      .optional(),
    sqlServerSourceConfig: z.object({
      changeTables: z.object({}).describe(
        "Configuration to use Change Tables CDC read method.",
      ).optional(),
      excludeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("The schema name.").optional(),
          tables: z.unknown().describe("Tables in the schema.").optional(),
        })).describe("SQLServer schemas in the database server.").optional(),
      }).describe("SQLServer database structure.").optional(),
      includeObjects: z.object({
        schemas: z.array(z.object({
          schema: z.unknown().describe("The schema name.").optional(),
          tables: z.unknown().describe("Tables in the schema.").optional(),
        })).describe("SQLServer schemas in the database server.").optional(),
      }).describe("SQLServer database structure.").optional(),
      maxConcurrentBackfillTasks: z.number().int().describe(
        "Max concurrent backfill tasks.",
      ).optional(),
      maxConcurrentCdcTasks: z.number().int().describe(
        "Max concurrent CDC tasks.",
      ).optional(),
      transactionLogs: z.object({}).describe(
        "Configuration to use Transaction Logs CDC read method.",
      ).optional(),
    }).describe("Configuration for syncing data from a SQLServer source.")
      .optional(),
  }).describe("The configuration of the stream source.").optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "NOT_STARTED",
    "RUNNING",
    "PAUSED",
    "MAINTENANCE",
    "FAILED",
    "FAILED_PERMANENTLY",
    "STARTING",
    "DRAINING",
  ]).describe("The state of the stream.").optional(),
  force: z.string().describe(
    "Optional. Create the stream without validating it.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  streamId: z.string().describe("Required. The stream identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Datastream Streams. Registered at `@swamp/gcp/datastream/streams`. */
export const model = {
  type: "@swamp/gcp/datastream/streams",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A resource representing streaming data from a source to a destination.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a streams",
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
        if (g["backfillAll"] !== undefined) {
          body["backfillAll"] = g["backfillAll"];
        }
        if (g["backfillNone"] !== undefined) {
          body["backfillNone"] = g["backfillNone"];
        }
        if (g["customerManagedEncryptionKey"] !== undefined) {
          body["customerManagedEncryptionKey"] =
            g["customerManagedEncryptionKey"];
        }
        if (g["destinationConfig"] !== undefined) {
          body["destinationConfig"] = g["destinationConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ruleSets"] !== undefined) body["ruleSets"] = g["ruleSets"];
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["force"] !== undefined) body["force"] = g["force"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["streamId"] !== undefined) body["streamId"] = g["streamId"];
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
              "readyValues": ["RUNNING"],
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a streams",
      arguments: z.object({
        identifier: z.string().describe("The name of the streams"),
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
      description: "Update streams attributes",
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
        if (g["backfillAll"] !== undefined) {
          body["backfillAll"] = g["backfillAll"];
        }
        if (g["backfillNone"] !== undefined) {
          body["backfillNone"] = g["backfillNone"];
        }
        if (g["destinationConfig"] !== undefined) {
          body["destinationConfig"] = g["destinationConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["ruleSets"] !== undefined) body["ruleSets"] = g["ruleSets"];
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["FAILED"],
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
      description: "Delete the streams",
      arguments: z.object({
        identifier: z.string().describe("The name of the streams"),
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
      description: "Sync streams state from GCP",
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
    run: {
      description: "run",
      arguments: z.object({
        cdcStrategy: z.any().optional(),
        force: z.any().optional(),
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
        if (args["cdcStrategy"] !== undefined) {
          body["cdcStrategy"] = args["cdcStrategy"];
        }
        if (args["force"] !== undefined) body["force"] = args["force"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "datastream.projects.locations.streams.run",
            "path": "v1/{+name}:run",
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
