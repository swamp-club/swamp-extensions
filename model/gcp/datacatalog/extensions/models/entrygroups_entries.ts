// Auto-generated extension model for @swamp/gcp/datacatalog/entrygroups-entries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Data Catalog EntryGroups.Entries.
 *
 * Entry metadata. A Data Catalog entry represents another resource in Google Cloud Platform (such as a BigQuery dataset or a Pub/Sub topic) or outside of it. You can use the `linked_resource` field in the entry resource to refer to the original resource ID of the source system. An entry resource contains resource details, for example, its schema. Additionally, you can attach flexible metadata to an entry in the form of a Tag.
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
  return `${parent}/entries/${shortName}`;
}

const BASE_URL = "https://datacatalog.googleapis.com/";

const GET_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.get",
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
  "id": "datacatalog.projects.locations.entryGroups.entries.create",
  "path": "v1/{+parent}/entries",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "entryId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datacatalog.projects.locations.entryGroups.entries.delete",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  bigqueryDateShardedSpec: z.object({
    dataset: z.string().describe(
      "Output only. The Data Catalog resource name of the dataset entry the current table belongs to. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`.",
    ).optional(),
    latestShardResource: z.string().describe(
      "Output only. BigQuery resource name of the latest shard.",
    ).optional(),
    shardCount: z.string().describe("Output only. Total number of shards.")
      .optional(),
    tablePrefix: z.string().describe(
      "Output only. The table name prefix of the shards. The name of any given shard is `[table_prefix]YYYYMMDD`. For example, for the `MyTable20180101` shard, the `table_prefix` is `MyTable`.",
    ).optional(),
  }).describe(
    "Specification for a group of BigQuery tables with the `[prefix]YYYYMMDD` name pattern. For more information, see [Introduction to partitioned tables] (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding).",
  ).optional(),
  bigqueryTableSpec: z.object({
    tableSourceType: z.enum([
      "TABLE_SOURCE_TYPE_UNSPECIFIED",
      "BIGQUERY_VIEW",
      "BIGQUERY_TABLE",
      "BIGQUERY_MATERIALIZED_VIEW",
    ]).describe("Output only. The table source type.").optional(),
    tableSpec: z.object({
      groupedEntry: z.string().describe(
        "Output only. If the table is date-sharded, that is, it matches the `[prefix]YYYYMMDD` name pattern, this field is the Data Catalog resource name of the date-sharded grouped entry. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`. Otherwise, `grouped_entry` is empty.",
      ).optional(),
    }).describe("Normal BigQuery table specification.").optional(),
    viewSpec: z.object({
      viewQuery: z.string().describe(
        "Output only. The query that defines the table view.",
      ).optional(),
    }).describe("Table view specification.").optional(),
  }).describe("Describes a BigQuery table.").optional(),
  businessContext: z.object({
    contacts: z.object({
      people: z.array(z.object({
        designation: z.string().describe(
          "Designation of the person, for example, Data Steward.",
        ).optional(),
        email: z.string().describe(
          "Email of the person in the format of `john.doe@xyz`, ``, or `John Doe`.",
        ).optional(),
      })).describe("The list of contact people for the entry.").optional(),
    }).describe("Contact people for the entry.").optional(),
    entryOverview: z.object({
      overview: z.string().describe(
        "Entry overview with support for rich text. The overview must only contain Unicode characters, and should be formatted using HTML. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB.",
      ).optional(),
    }).describe("Entry overview fields for rich text descriptions of entries.")
      .optional(),
  }).describe("Business Context of the entry.").optional(),
  cloudBigtableSystemSpec: z.object({
    instanceDisplayName: z.string().describe(
      "Display name of the Instance. This is user specified and different from the resource name.",
    ).optional(),
  }).describe(
    "Specification that applies to all entries that are part of `CLOUD_BIGTABLE` system (user_specified_type)",
  ).optional(),
  dataSource: z.object({
    resource: z.string().describe(
      "Full name of a resource as defined by the service. For example: `//bigquery.googleapis.com/projects/{PROJECT_ID}/locations/{LOCATION}/datasets/{DATASET_ID}/tables/{TABLE_ID}`",
    ).optional(),
    service: z.enum(["SERVICE_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
      .describe("Service that physically stores the data.").optional(),
    sourceEntry: z.string().describe(
      "Output only. Data Catalog entry name, if applicable.",
    ).optional(),
    storageProperties: z.object({
      filePattern: z.array(z.string()).describe(
        "Patterns to identify a set of files for this fileset. Examples of a valid `file_pattern`: * `gs://bucket_name/dir/*`: matches all files in the `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files in the `bucket_name/dir` and all subdirectories recursively * `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` * `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`,... or `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt`",
      ).optional(),
      fileType: z.string().describe(
        "File type in MIME format, for example, `text/plain`.",
      ).optional(),
    }).describe("Details the properties of the underlying storage.").optional(),
  }).describe("Physical location of an entry.").optional(),
  dataSourceConnectionSpec: z.object({
    bigqueryConnectionSpec: z.object({
      cloudSql: z.object({
        database: z.string().describe("Database name.").optional(),
        instanceId: z.string().describe(
          "Cloud SQL instance ID in the format of `project:location:instance`.",
        ).optional(),
        type: z.enum(["DATABASE_TYPE_UNSPECIFIED", "POSTGRES", "MYSQL"])
          .describe("Type of the Cloud SQL database.").optional(),
      }).describe(
        "Specification for the BigQuery connection to a Cloud SQL instance.",
      ).optional(),
      connectionType: z.enum(["CONNECTION_TYPE_UNSPECIFIED", "CLOUD_SQL"])
        .describe("The type of the BigQuery connection.").optional(),
      hasCredential: z.boolean().describe(
        "True if there are credentials attached to the BigQuery connection; false otherwise.",
      ).optional(),
    }).describe("Specification for the BigQuery connection.").optional(),
  }).describe(
    "Specification that applies to a data source connection. Valid only for entries with the `DATA_SOURCE_CONNECTION` type. Only one of internal specs can be set at the time, and cannot be changed later.",
  ).optional(),
  databaseTableSpec: z.object({
    databaseViewSpec: z.object({
      baseTable: z.string().describe(
        "Name of a singular table this view reflects one to one.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate this view.")
        .optional(),
      viewType: z.enum([
        "VIEW_TYPE_UNSPECIFIED",
        "STANDARD_VIEW",
        "MATERIALIZED_VIEW",
      ]).describe("Type of this view.").optional(),
    }).describe("Specification that applies to database view.").optional(),
    dataplexTable: z.object({
      dataplexSpec: z.object({
        asset: z.string().describe(
          "Fully qualified resource name of an asset in Dataplex Universal Catalog, to which the underlying data source (Cloud Storage bucket or BigQuery dataset) of the entity is attached.",
        ).optional(),
        compressionFormat: z.string().describe(
          "Compression format of the data, e.g., zip, gzip etc.",
        ).optional(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown().describe("JSON source of the Avro schema.")
              .optional(),
          }).describe("Schema in Avro JSON format.").optional(),
          csv: z.object({}).describe("Marks a CSV-encoded data source.")
            .optional(),
          orc: z.object({}).describe("Marks an ORC-encoded data source.")
            .optional(),
          parquet: z.object({}).describe("Marks a Parquet-encoded data source.")
            .optional(),
          protobuf: z.object({
            text: z.unknown().describe("Protocol buffer source of the schema.")
              .optional(),
          }).describe("Schema in protocol buffer format.").optional(),
          thrift: z.object({
            text: z.unknown().describe("Thrift IDL source of the schema.")
              .optional(),
          }).describe("Schema in Thrift format.").optional(),
        }).describe(
          "Native schema used by a resource represented as an entry. Used by query engines for deserializing and parsing source data.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID of the underlying Cloud Storage or BigQuery data. Note that this may not be the same project as the corresponding Dataplex Universal Catalog lake / zone / asset.",
        ).optional(),
      }).describe("Common Dataplex Universal Catalog fields.").optional(),
      externalTables: z.array(z.object({
        dataCatalogEntry: z.string().describe(
          "Name of the Data Catalog entry representing the external table.",
        ).optional(),
        fullyQualifiedName: z.string().describe(
          "Fully qualified name (FQN) of the external table.",
        ).optional(),
        googleCloudResource: z.string().describe(
          "Google Cloud resource name of the external table.",
        ).optional(),
        system: z.enum([
          "INTEGRATED_SYSTEM_UNSPECIFIED",
          "BIGQUERY",
          "CLOUD_PUBSUB",
          "DATAPROC_METASTORE",
          "DATAPLEX",
          "CLOUD_SPANNER",
          "CLOUD_BIGTABLE",
          "CLOUD_SQL",
          "LOOKER",
          "VERTEX_AI",
        ]).describe("Service in which the external table is registered.")
          .optional(),
      })).describe(
        "List of external tables registered by Dataplex Universal Catalog in other systems based on the same underlying data. External tables allow to query this data in those systems.",
      ).optional(),
      userManaged: z.boolean().describe(
        "Indicates if the table schema is managed by the user or not.",
      ).optional(),
    }).describe("Entry specification for a Dataplex Universal Catalog table.")
      .optional(),
    type: z.enum(["TABLE_TYPE_UNSPECIFIED", "NATIVE", "EXTERNAL"]).describe(
      "Type of this table.",
    ).optional(),
  }).describe(
    "Specification that applies to a table resource. Valid only for entries with the `TABLE` type.",
  ).optional(),
  datasetSpec: z.object({
    vertexDatasetSpec: z.object({
      dataItemCount: z.string().describe(
        "The number of DataItems in this Dataset. Only apply for non-structured Dataset.",
      ).optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "TABLE",
        "IMAGE",
        "TEXT",
        "VIDEO",
        "CONVERSATION",
        "TIME_SERIES",
        "DOCUMENT",
        "TEXT_TO_SPEECH",
        "TRANSLATION",
        "STORE_VISION",
        "ENTERPRISE_KNOWLEDGE_GRAPH",
        "TEXT_PROMPT",
      ]).describe("Type of the dataset.").optional(),
    }).describe("Specification for vertex dataset resources.").optional(),
  }).describe(
    "Specification that applies to a dataset. Valid only for entries with the `DATASET` type.",
  ).optional(),
  description: z.string().describe(
    "Entry description that can consist of several sentences or paragraphs that describe entry contents. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). The maximum size is 2000 bytes when encoded in UTF-8. Default value is an empty string.",
  ).optional(),
  displayName: z.string().describe(
    "Display name of an entry. The maximum size is 500 bytes when encoded in UTF-8. Default value is an empty string.",
  ).optional(),
  featureOnlineStoreSpec: z.object({
    storageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "BIGTABLE", "OPTIMIZED"])
      .describe(
        "Output only. Type of underlying storage for the FeatureOnlineStore.",
      ).optional(),
  }).describe(
    "Detail description of the source information of a Vertex Feature Online Store.",
  ).optional(),
  filesetSpec: z.object({
    dataplexFileset: z.object({
      dataplexSpec: z.object({
        asset: z.string().describe(
          "Fully qualified resource name of an asset in Dataplex Universal Catalog, to which the underlying data source (Cloud Storage bucket or BigQuery dataset) of the entity is attached.",
        ).optional(),
        compressionFormat: z.string().describe(
          "Compression format of the data, e.g., zip, gzip etc.",
        ).optional(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown().describe("JSON source of the Avro schema.")
              .optional(),
          }).describe("Schema in Avro JSON format.").optional(),
          csv: z.object({}).describe("Marks a CSV-encoded data source.")
            .optional(),
          orc: z.object({}).describe("Marks an ORC-encoded data source.")
            .optional(),
          parquet: z.object({}).describe("Marks a Parquet-encoded data source.")
            .optional(),
          protobuf: z.object({
            text: z.unknown().describe("Protocol buffer source of the schema.")
              .optional(),
          }).describe("Schema in protocol buffer format.").optional(),
          thrift: z.object({
            text: z.unknown().describe("Thrift IDL source of the schema.")
              .optional(),
          }).describe("Schema in Thrift format.").optional(),
        }).describe(
          "Native schema used by a resource represented as an entry. Used by query engines for deserializing and parsing source data.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID of the underlying Cloud Storage or BigQuery data. Note that this may not be the same project as the corresponding Dataplex Universal Catalog lake / zone / asset.",
        ).optional(),
      }).describe("Common Dataplex Universal Catalog fields.").optional(),
    }).describe("Entry specification for a Dataplex Universal Catalog fileset.")
      .optional(),
  }).describe(
    "Specification that applies to a fileset. Valid only for entries with the 'FILESET' type.",
  ).optional(),
  fullyQualifiedName: z.string().describe(
    "[Fully Qualified Name (FQN)](https://cloud.google.com//data-catalog/docs/fully-qualified-names) of the resource. Set automatically for entries representing resources from synced systems. Settable only during creation, and read-only later. Can be used for search and lookup of the entries.",
  ).optional(),
  gcsFilesetSpec: z.object({
    filePatterns: z.array(z.string()).describe(
      "Required. Patterns to identify a set of files in Google Cloud Storage. For more information, see [Wildcard Names] (https://cloud.google.com/storage/docs/wildcards). Note: Currently, bucket wildcards are not supported. Examples of valid `file_patterns`: * `gs://bucket_name/dir/*`: matches all files in `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files in `bucket_name/dir` and all subdirectories * `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` * `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`,... or `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt` You can combine wildcards to match complex sets of files, for example: `gs://bucket_name/[a-m]??.j*g`",
    ).optional(),
    sampleGcsFileSpecs: z.array(z.object({
      filePath: z.string().describe(
        "Required. Full file path. Example: `gs://bucket_name/a/b.txt`.",
      ).optional(),
      gcsTimestamps: z.object({
        createTime: z.string().describe(
          "Creation timestamp of the resource within the given system.",
        ).optional(),
        expireTime: z.string().describe(
          "Output only. Expiration timestamp of the resource within the given system. Currently only applicable to BigQuery resources.",
        ).optional(),
        updateTime: z.string().describe(
          "Timestamp of the last modification of the resource or its metadata within a given system. Note: Depending on the source system, not every modification updates this timestamp. For example, BigQuery timestamps every metadata modification but not data or permission changes.",
        ).optional(),
      }).describe(
        "Timestamps associated with this resource in a particular system.",
      ).optional(),
      sizeBytes: z.string().describe("Output only. File size in bytes.")
        .optional(),
    })).describe(
      "Output only. Sample files contained in this fileset, not all files contained in this fileset are represented here.",
    ).optional(),
  }).describe("Describes a Cloud Storage fileset entry.").optional(),
  graphSpec: z.object({
    edgeTables: z.array(z.object({
      alias: z.string().describe(
        "Required. The alias name of the graph element.",
      ).optional(),
      dataSource: z.string().describe(
        "Required. The name of the data source. This is either a table name or a view name that is used for graph element input source. E.g. `Person` table or `PersonView` view.",
      ).optional(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
      dynamicLabelColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic label in schemaless data model.",
      ).optional(),
      dynamicPropertiesColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic properties in schemaless data model.",
      ).optional(),
      elementKeys: z.array(z.string()).describe(
        "Required. The name of the keys of the elements in the table.",
      ).optional(),
      inputSource: z.enum(["INPUT_SOURCE_UNSPECIFIED", "TABLE", "VIEW"])
        .describe("Required. The input source of the graph element.")
        .optional(),
      kind: z.enum(["KIND_UNSPECIFIED", "NODE", "EDGE"]).describe(
        "Required. The kind of the graph element.",
      ).optional(),
      labelAndProperties: z.array(z.object({
        label: z.unknown().describe("Required. The name of the label.")
          .optional(),
        properties: z.unknown().describe(
          "Optional. The properties associated with the label.",
        ).optional(),
      })).describe(
        "Required. The labels and their properties for the graph element.",
      ).optional(),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
    })).describe("Optional. Edge tables of the graph.").optional(),
    name: z.string().describe(
      "Output only. Fully qualified graph name. e.g. `named_catalog.MyGraph`",
    ).optional(),
    nodeTables: z.array(z.object({
      alias: z.string().describe(
        "Required. The alias name of the graph element.",
      ).optional(),
      dataSource: z.string().describe(
        "Required. The name of the data source. This is either a table name or a view name that is used for graph element input source. E.g. `Person` table or `PersonView` view.",
      ).optional(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
      dynamicLabelColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic label in schemaless data model.",
      ).optional(),
      dynamicPropertiesColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic properties in schemaless data model.",
      ).optional(),
      elementKeys: z.array(z.string()).describe(
        "Required. The name of the keys of the elements in the table.",
      ).optional(),
      inputSource: z.enum(["INPUT_SOURCE_UNSPECIFIED", "TABLE", "VIEW"])
        .describe("Required. The input source of the graph element.")
        .optional(),
      kind: z.enum(["KIND_UNSPECIFIED", "NODE", "EDGE"]).describe(
        "Required. The kind of the graph element.",
      ).optional(),
      labelAndProperties: z.array(z.object({
        label: z.unknown().describe("Required. The name of the label.")
          .optional(),
        properties: z.unknown().describe(
          "Optional. The properties associated with the label.",
        ).optional(),
      })).describe(
        "Required. The labels and their properties for the graph element.",
      ).optional(),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
    })).describe("Required. Node tables of the graph.").optional(),
  }).describe("Specification that applies to a graph.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Cloud labels attached to the entry. In Data Catalog, you can create and modify labels attached only to custom entries. Synced entries have unmodifiable labels that come from the source system.",
  ).optional(),
  lookerSystemSpec: z.object({
    parentInstanceDisplayName: z.string().describe(
      "Name of the parent Looker Instance. Empty if it does not exist.",
    ).optional(),
    parentInstanceId: z.string().describe(
      "ID of the parent Looker Instance. Empty if it does not exist. Example value: `someinstance.looker.com`",
    ).optional(),
    parentModelDisplayName: z.string().describe(
      "Name of the parent Model. Empty if it does not exist.",
    ).optional(),
    parentModelId: z.string().describe(
      "ID of the parent Model. Empty if it does not exist.",
    ).optional(),
    parentViewDisplayName: z.string().describe(
      "Name of the parent View. Empty if it does not exist.",
    ).optional(),
    parentViewId: z.string().describe(
      "ID of the parent View. Empty if it does not exist.",
    ).optional(),
  }).describe(
    "Specification that applies to entries that are part `LOOKER` system (user_specified_type)",
  ).optional(),
  modelSpec: z.object({
    vertexModelSpec: z.object({
      containerImageUri: z.string().describe(
        "URI of the Docker image to be used as the custom container for serving predictions.",
      ).optional(),
      versionAliases: z.array(z.string()).describe(
        "User provided version aliases so that a model version can be referenced via alias",
      ).optional(),
      versionDescription: z.string().describe(
        "The description of this version.",
      ).optional(),
      versionId: z.string().describe("The version ID of the model.").optional(),
      vertexModelSourceInfo: z.object({
        copy: z.boolean().describe(
          "If this Model is copy of another Model. If true then source_type pertains to the original.",
        ).optional(),
        sourceType: z.enum([
          "MODEL_SOURCE_TYPE_UNSPECIFIED",
          "AUTOML",
          "CUSTOM",
          "BQML",
          "MODEL_GARDEN",
          "GENIE",
          "CUSTOM_TEXT_EMBEDDING",
          "MARKETPLACE",
        ]).describe("Type of the model source.").optional(),
      }).describe(
        "Detail description of the source information of a Vertex model.",
      ).optional(),
    }).describe("Specification for vertex model resources.").optional(),
  }).describe(
    "Specification that applies to a model. Valid only for entries with the `MODEL` type.",
  ).optional(),
  personalDetails: z.object({
    starTime: z.string().describe(
      "Set if the entry is starred; unset otherwise.",
    ).optional(),
    starred: z.boolean().describe(
      "True if the entry is starred by the user; false otherwise.",
    ).optional(),
  }).describe("Entry metadata relevant only to the user and private to them.")
    .optional(),
  routineSpec: z.object({
    bigqueryRoutineSpec: z.object({
      importedLibraries: z.array(z.string()).describe(
        "Paths of the imported libraries.",
      ).optional(),
    }).describe("Fields specific for BigQuery routines.").optional(),
    definitionBody: z.string().describe("The body of the routine.").optional(),
    language: z.string().describe(
      "The language the routine is written in. The exact value depends on the source system. For BigQuery routines, possible values are: * `SQL` * `JAVASCRIPT`",
    ).optional(),
    returnType: z.string().describe(
      "Return type of the argument. The exact value depends on the source system and the language.",
    ).optional(),
    routineArguments: z.array(z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "IN", "OUT", "INOUT"]).describe(
        "Specifies whether the argument is input or output.",
      ).optional(),
      name: z.string().describe(
        "The name of the argument. A return argument of a function might not have a name.",
      ).optional(),
      type: z.string().describe(
        "Type of the argument. The exact value depends on the source system and the language.",
      ).optional(),
    })).describe("Arguments of the routine.").optional(),
    routineType: z.enum([
      "ROUTINE_TYPE_UNSPECIFIED",
      "SCALAR_FUNCTION",
      "PROCEDURE",
    ]).describe("The type of the routine.").optional(),
  }).describe(
    "Specification that applies to a routine. Valid only for entries with the `ROUTINE` type.",
  ).optional(),
  schema: z.object({
    columns: z.array(z.object({
      column: z.string().describe(
        "Required. Name of the column. Must be a UTF-8 string without dots (.). The maximum size is 64 bytes.",
      ).optional(),
      defaultValue: z.string().describe(
        "Optional. Default value for the column.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the column. Default value is an empty string. The description must be a UTF-8 string with the maximum size of 2000 bytes.",
      ).optional(),
      gcRule: z.string().describe(
        "Optional. Garbage collection policy for the column or column family. Applies to systems like Cloud Bigtable.",
      ).optional(),
      highestIndexingType: z.enum([
        "INDEXING_TYPE_UNSPECIFIED",
        "INDEXING_TYPE_NONE",
        "INDEXING_TYPE_NON_UNIQUE",
        "INDEXING_TYPE_UNIQUE",
        "INDEXING_TYPE_PRIMARY_KEY",
      ]).describe("Optional. Most important inclusion of this column.")
        .optional(),
      lookerColumnSpec: z.object({
        type: z.enum([
          "LOOKER_COLUMN_TYPE_UNSPECIFIED",
          "DIMENSION",
          "DIMENSION_GROUP",
          "FILTER",
          "MEASURE",
          "PARAMETER",
        ]).describe("Looker specific column type of this column.").optional(),
      }).describe("Column info specific to Looker System.").optional(),
      mode: z.string().describe(
        "Optional. A column's mode indicates whether values in this column are required, nullable, or repeated. Only `NULLABLE`, `REQUIRED`, and `REPEATED` values are supported. Default mode is `NULLABLE`.",
      ).optional(),
      ordinalPosition: z.number().int().describe("Optional. Ordinal position")
        .optional(),
      rangeElementType: z.object({
        type: z.string().describe(
          "Required. The type of a field element. See ColumnSchema.type.",
        ).optional(),
      }).describe("Represents the type of a field element.").optional(),
      subcolumns: z.array(z.string()).describe(
        "Optional. Schema of sub-columns. A column can have zero or more sub-columns.",
      ).optional(),
      type: z.string().describe(
        "Required. Type of the column. Must be a UTF-8 string with the maximum size of 128 bytes.",
      ).optional(),
    })).describe(
      "The unified GoogleSQL-like schema of columns. The overall maximum number of columns and nested columns is 10,000. The maximum nested depth is 15 levels.",
    ).optional(),
  }).describe(
    "Represents a schema, for example, a BigQuery, GoogleSQL, or Avro schema.",
  ).optional(),
  serviceSpec: z.object({
    cloudBigtableInstanceSpec: z.object({
      cloudBigtableClusterSpecs: z.array(z.object({
        displayName: z.string().describe("Name of the cluster.").optional(),
        linkedResource: z.string().describe(
          "A link back to the parent resource, in this case Instance.",
        ).optional(),
        location: z.string().describe(
          "Location of the cluster, typically a Cloud zone.",
        ).optional(),
        type: z.string().describe(
          'Type of the resource. For a cluster this would be "CLUSTER".',
        ).optional(),
      })).describe("The list of clusters for the Instance.").optional(),
    }).describe(
      "Specification that applies to Instance entries that are part of `CLOUD_BIGTABLE` system. (user_specified_type)",
    ).optional(),
  }).describe(
    "Specification that applies to a Service resource. Valid only for entries with the `SERVICE` type.",
  ).optional(),
  sourceSystemTimestamps: z.object({
    createTime: z.string().describe(
      "Creation timestamp of the resource within the given system.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. Expiration timestamp of the resource within the given system. Currently only applicable to BigQuery resources.",
    ).optional(),
    updateTime: z.string().describe(
      "Timestamp of the last modification of the resource or its metadata within a given system. Note: Depending on the source system, not every modification updates this timestamp. For example, BigQuery timestamps every metadata modification but not data or permission changes.",
    ).optional(),
  }).describe(
    "Timestamps associated with this resource in a particular system.",
  ).optional(),
  spannerTableSpec: z.object({
    foreignKeys: z.array(z.object({
      columnMappings: z.array(z.object({
        column: z.unknown().describe(
          "Output only. The column in the current table that is part of the foreign key.",
        ).optional(),
        referenceColumn: z.unknown().describe(
          "Output only. The column in the referenced table that is part of the foreign key.",
        ).optional(),
      })).describe(
        "Output only. The ordered list of column mappings for this foreign key.",
      ).optional(),
      entry: z.string().describe(
        "Output only. The table name this foreign key referenced to. Format: `projects/{PROJECT_ID}/locations/{LOCATION}/entryGroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`",
      ).optional(),
      name: z.string().describe(
        "Output only. The constraint_name of the foreign key, for example, FK_CustomerOrder.",
      ).optional(),
    })).describe("Output only. The foreign keys of the table.").optional(),
    primaryKey: z.object({
      columns: z.array(z.string()).describe(
        "Output only. Column names of the primary key.",
      ).optional(),
    }).describe("Specification of a Spanner primary key.").optional(),
  }).describe("Specification of a Spanner table.").optional(),
  sqlDatabaseSystemSpec: z.object({
    databaseVersion: z.string().describe("Version of the database engine.")
      .optional(),
    instanceHost: z.string().describe(
      "Host of the SQL database enum InstanceHost { UNDEFINED = 0; SELF_HOSTED = 1; CLOUD_SQL = 2; AMAZON_RDS = 3; AZURE_SQL = 4; } Host of the enclousing database instance.",
    ).optional(),
    sqlEngine: z.string().describe(
      "SQL Database Engine. enum SqlEngine { UNDEFINED = 0; MY_SQL = 1; POSTGRE_SQL = 2; SQL_SERVER = 3; } Engine of the enclosing database instance.",
    ).optional(),
  }).describe(
    "Specification that applies to entries that are part `SQL_DATABASE` system (user_specified_type)",
  ).optional(),
  type: z.enum([
    "ENTRY_TYPE_UNSPECIFIED",
    "TABLE",
    "MODEL",
    "DATA_STREAM",
    "FILESET",
    "CLUSTER",
    "DATABASE",
    "DATA_SOURCE_CONNECTION",
    "ROUTINE",
    "LAKE",
    "ZONE",
    "SERVICE",
    "DATABASE_SCHEMA",
    "DASHBOARD",
    "EXPLORE",
    "LOOK",
    "FEATURE_ONLINE_STORE",
    "FEATURE_VIEW",
    "FEATURE_GROUP",
    "GRAPH",
  ]).describe(
    "The type of the entry. For details, see [`EntryType`](#entrytype).",
  ).optional(),
  usageSignal: z.object({
    commonUsageWithinTimeRange: z.record(
      z.string(),
      z.object({
        viewCount: z.string().describe("View count in source system.")
          .optional(),
      }),
    ).describe(
      'Common usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D", "Lifetime"}`.',
    ).optional(),
    favoriteCount: z.string().describe("Favorite count in the source system.")
      .optional(),
    updateTime: z.string().describe(
      "The end timestamp of the duration of usage statistics.",
    ).optional(),
    usageWithinTimeRange: z.record(
      z.string(),
      z.object({
        totalCancellations: z.number().describe(
          "The number of cancelled attempts to use the underlying entry.",
        ).optional(),
        totalCompletions: z.number().describe(
          "The number of successful uses of the underlying entry.",
        ).optional(),
        totalExecutionTimeForCompletionsMillis: z.number().describe(
          "Total time spent only on successful uses, in milliseconds.",
        ).optional(),
        totalFailures: z.number().describe(
          "The number of failed attempts to use the underlying entry.",
        ).optional(),
      }),
    ).describe(
      'Output only. BigQuery usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D"}`.',
    ).optional(),
  }).describe(
    "The set of all usage signals that Data Catalog stores. Note: Usually, these signals are updated daily. In rare cases, an update may fail but will be performed again on the next day.",
  ).optional(),
  userSpecifiedSystem: z.string().describe(
    "Indicates the entry's source system that Data Catalog doesn't automatically integrate with. The `user_specified_system` string has the following limitations: * Is case insensitive. * Must begin with a letter or underscore. * Can only contain letters, numbers, and underscores. * Must be at least 1 character and at most 64 characters long.",
  ).optional(),
  userSpecifiedType: z.string().describe(
    "Custom entry type that doesn't match any of the values allowed for input and listed in the `EntryType` enum. When creating an entry, first check the type values in the enum. If there are no appropriate types for the new entry, provide a custom value, for example, `my_special_type`. The `user_specified_type` string has the following limitations: * Is case insensitive. * Must begin with a letter or underscore. * Can only contain letters, numbers, and underscores. * Must be at least 1 character and at most 64 characters long.",
  ).optional(),
  entryId: z.string().describe(
    "Required. The ID of the entry to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores (_). The maximum size is 64 bytes when encoded in UTF-8.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bigqueryDateShardedSpec: z.object({
    dataset: z.string(),
    latestShardResource: z.string(),
    shardCount: z.string(),
    tablePrefix: z.string(),
  }).optional(),
  bigqueryTableSpec: z.object({
    tableSourceType: z.string(),
    tableSpec: z.object({
      groupedEntry: z.string(),
    }),
    viewSpec: z.object({
      viewQuery: z.string(),
    }),
  }).optional(),
  businessContext: z.object({
    contacts: z.object({
      people: z.array(z.object({
        designation: z.string(),
        email: z.string(),
      })),
    }),
    entryOverview: z.object({
      overview: z.string(),
    }),
  }).optional(),
  cloudBigtableSystemSpec: z.object({
    instanceDisplayName: z.string(),
  }).optional(),
  dataSource: z.object({
    resource: z.string(),
    service: z.string(),
    sourceEntry: z.string(),
    storageProperties: z.object({
      filePattern: z.array(z.string()),
      fileType: z.string(),
    }),
  }).optional(),
  dataSourceConnectionSpec: z.object({
    bigqueryConnectionSpec: z.object({
      cloudSql: z.object({
        database: z.string(),
        instanceId: z.string(),
        type: z.string(),
      }),
      connectionType: z.string(),
      hasCredential: z.boolean(),
    }),
  }).optional(),
  databaseTableSpec: z.object({
    databaseViewSpec: z.object({
      baseTable: z.string(),
      sqlQuery: z.string(),
      viewType: z.string(),
    }),
    dataplexTable: z.object({
      dataplexSpec: z.object({
        asset: z.string(),
        compressionFormat: z.string(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown(),
          }),
          csv: z.object({}),
          orc: z.object({}),
          parquet: z.object({}),
          protobuf: z.object({
            text: z.unknown(),
          }),
          thrift: z.object({
            text: z.unknown(),
          }),
        }),
        projectId: z.string(),
      }),
      externalTables: z.array(z.object({
        dataCatalogEntry: z.string(),
        fullyQualifiedName: z.string(),
        googleCloudResource: z.string(),
        system: z.string(),
      })),
      userManaged: z.boolean(),
    }),
    type: z.string(),
  }).optional(),
  datasetSpec: z.object({
    vertexDatasetSpec: z.object({
      dataItemCount: z.string(),
      dataType: z.string(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  featureOnlineStoreSpec: z.object({
    storageType: z.string(),
  }).optional(),
  filesetSpec: z.object({
    dataplexFileset: z.object({
      dataplexSpec: z.object({
        asset: z.string(),
        compressionFormat: z.string(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown(),
          }),
          csv: z.object({}),
          orc: z.object({}),
          parquet: z.object({}),
          protobuf: z.object({
            text: z.unknown(),
          }),
          thrift: z.object({
            text: z.unknown(),
          }),
        }),
        projectId: z.string(),
      }),
    }),
  }).optional(),
  fullyQualifiedName: z.string().optional(),
  gcsFilesetSpec: z.object({
    filePatterns: z.array(z.string()),
    sampleGcsFileSpecs: z.array(z.object({
      filePath: z.string(),
      gcsTimestamps: z.object({
        createTime: z.string(),
        expireTime: z.string(),
        updateTime: z.string(),
      }),
      sizeBytes: z.string(),
    })),
  }).optional(),
  graphSpec: z.object({
    edgeTables: z.array(z.object({
      alias: z.string(),
      dataSource: z.string(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()),
        nodeAlias: z.string(),
        nodeTableColumns: z.array(z.unknown()),
      }),
      dynamicLabelColumn: z.string(),
      dynamicPropertiesColumn: z.string(),
      elementKeys: z.array(z.string()),
      inputSource: z.string(),
      kind: z.string(),
      labelAndProperties: z.array(z.object({
        label: z.unknown(),
        properties: z.unknown(),
      })),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()),
        nodeAlias: z.string(),
        nodeTableColumns: z.array(z.unknown()),
      }),
    })),
    name: z.string(),
    nodeTables: z.array(z.object({
      alias: z.string(),
      dataSource: z.string(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()),
        nodeAlias: z.string(),
        nodeTableColumns: z.array(z.unknown()),
      }),
      dynamicLabelColumn: z.string(),
      dynamicPropertiesColumn: z.string(),
      elementKeys: z.array(z.string()),
      inputSource: z.string(),
      kind: z.string(),
      labelAndProperties: z.array(z.object({
        label: z.unknown(),
        properties: z.unknown(),
      })),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()),
        nodeAlias: z.string(),
        nodeTableColumns: z.array(z.unknown()),
      }),
    })),
  }).optional(),
  integratedSystem: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  linkedResource: z.string().optional(),
  lookerSystemSpec: z.object({
    parentInstanceDisplayName: z.string(),
    parentInstanceId: z.string(),
    parentModelDisplayName: z.string(),
    parentModelId: z.string(),
    parentViewDisplayName: z.string(),
    parentViewId: z.string(),
  }).optional(),
  modelSpec: z.object({
    vertexModelSpec: z.object({
      containerImageUri: z.string(),
      versionAliases: z.array(z.string()),
      versionDescription: z.string(),
      versionId: z.string(),
      vertexModelSourceInfo: z.object({
        copy: z.boolean(),
        sourceType: z.string(),
      }),
    }),
  }).optional(),
  name: z.string(),
  personalDetails: z.object({
    starTime: z.string(),
    starred: z.boolean(),
  }).optional(),
  routineSpec: z.object({
    bigqueryRoutineSpec: z.object({
      importedLibraries: z.array(z.string()),
    }),
    definitionBody: z.string(),
    language: z.string(),
    returnType: z.string(),
    routineArguments: z.array(z.object({
      mode: z.string(),
      name: z.string(),
      type: z.string(),
    })),
    routineType: z.string(),
  }).optional(),
  schema: z.object({
    columns: z.array(z.object({
      column: z.string(),
      defaultValue: z.string(),
      description: z.string(),
      gcRule: z.string(),
      highestIndexingType: z.string(),
      lookerColumnSpec: z.object({
        type: z.string(),
      }),
      mode: z.string(),
      ordinalPosition: z.number(),
      rangeElementType: z.object({
        type: z.string(),
      }),
      subcolumns: z.array(z.string()),
      type: z.string(),
    })),
  }).optional(),
  serviceSpec: z.object({
    cloudBigtableInstanceSpec: z.object({
      cloudBigtableClusterSpecs: z.array(z.object({
        displayName: z.string(),
        linkedResource: z.string(),
        location: z.string(),
        type: z.string(),
      })),
    }),
  }).optional(),
  sourceSystemTimestamps: z.object({
    createTime: z.string(),
    expireTime: z.string(),
    updateTime: z.string(),
  }).optional(),
  spannerTableSpec: z.object({
    foreignKeys: z.array(z.object({
      columnMappings: z.array(z.object({
        column: z.unknown(),
        referenceColumn: z.unknown(),
      })),
      entry: z.string(),
      name: z.string(),
    })),
    primaryKey: z.object({
      columns: z.array(z.string()),
    }),
  }).optional(),
  sqlDatabaseSystemSpec: z.object({
    databaseVersion: z.string(),
    instanceHost: z.string(),
    sqlEngine: z.string(),
  }).optional(),
  type: z.string().optional(),
  usageSignal: z.object({
    commonUsageWithinTimeRange: z.record(z.string(), z.unknown()),
    favoriteCount: z.string(),
    updateTime: z.string(),
    usageWithinTimeRange: z.record(z.string(), z.unknown()),
  }).optional(),
  userSpecifiedSystem: z.string().optional(),
  userSpecifiedType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  bigqueryDateShardedSpec: z.object({
    dataset: z.string().describe(
      "Output only. The Data Catalog resource name of the dataset entry the current table belongs to. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`.",
    ).optional(),
    latestShardResource: z.string().describe(
      "Output only. BigQuery resource name of the latest shard.",
    ).optional(),
    shardCount: z.string().describe("Output only. Total number of shards.")
      .optional(),
    tablePrefix: z.string().describe(
      "Output only. The table name prefix of the shards. The name of any given shard is `[table_prefix]YYYYMMDD`. For example, for the `MyTable20180101` shard, the `table_prefix` is `MyTable`.",
    ).optional(),
  }).describe(
    "Specification for a group of BigQuery tables with the `[prefix]YYYYMMDD` name pattern. For more information, see [Introduction to partitioned tables] (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding).",
  ).optional(),
  bigqueryTableSpec: z.object({
    tableSourceType: z.enum([
      "TABLE_SOURCE_TYPE_UNSPECIFIED",
      "BIGQUERY_VIEW",
      "BIGQUERY_TABLE",
      "BIGQUERY_MATERIALIZED_VIEW",
    ]).describe("Output only. The table source type.").optional(),
    tableSpec: z.object({
      groupedEntry: z.string().describe(
        "Output only. If the table is date-sharded, that is, it matches the `[prefix]YYYYMMDD` name pattern, this field is the Data Catalog resource name of the date-sharded grouped entry. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`. Otherwise, `grouped_entry` is empty.",
      ).optional(),
    }).describe("Normal BigQuery table specification.").optional(),
    viewSpec: z.object({
      viewQuery: z.string().describe(
        "Output only. The query that defines the table view.",
      ).optional(),
    }).describe("Table view specification.").optional(),
  }).describe("Describes a BigQuery table.").optional(),
  businessContext: z.object({
    contacts: z.object({
      people: z.array(z.object({
        designation: z.string().describe(
          "Designation of the person, for example, Data Steward.",
        ).optional(),
        email: z.string().describe(
          "Email of the person in the format of `john.doe@xyz`, ``, or `John Doe`.",
        ).optional(),
      })).describe("The list of contact people for the entry.").optional(),
    }).describe("Contact people for the entry.").optional(),
    entryOverview: z.object({
      overview: z.string().describe(
        "Entry overview with support for rich text. The overview must only contain Unicode characters, and should be formatted using HTML. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB.",
      ).optional(),
    }).describe("Entry overview fields for rich text descriptions of entries.")
      .optional(),
  }).describe("Business Context of the entry.").optional(),
  cloudBigtableSystemSpec: z.object({
    instanceDisplayName: z.string().describe(
      "Display name of the Instance. This is user specified and different from the resource name.",
    ).optional(),
  }).describe(
    "Specification that applies to all entries that are part of `CLOUD_BIGTABLE` system (user_specified_type)",
  ).optional(),
  dataSource: z.object({
    resource: z.string().describe(
      "Full name of a resource as defined by the service. For example: `//bigquery.googleapis.com/projects/{PROJECT_ID}/locations/{LOCATION}/datasets/{DATASET_ID}/tables/{TABLE_ID}`",
    ).optional(),
    service: z.enum(["SERVICE_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
      .describe("Service that physically stores the data.").optional(),
    sourceEntry: z.string().describe(
      "Output only. Data Catalog entry name, if applicable.",
    ).optional(),
    storageProperties: z.object({
      filePattern: z.array(z.string()).describe(
        "Patterns to identify a set of files for this fileset. Examples of a valid `file_pattern`: * `gs://bucket_name/dir/*`: matches all files in the `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files in the `bucket_name/dir` and all subdirectories recursively * `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` * `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`,... or `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt`",
      ).optional(),
      fileType: z.string().describe(
        "File type in MIME format, for example, `text/plain`.",
      ).optional(),
    }).describe("Details the properties of the underlying storage.").optional(),
  }).describe("Physical location of an entry.").optional(),
  dataSourceConnectionSpec: z.object({
    bigqueryConnectionSpec: z.object({
      cloudSql: z.object({
        database: z.string().describe("Database name.").optional(),
        instanceId: z.string().describe(
          "Cloud SQL instance ID in the format of `project:location:instance`.",
        ).optional(),
        type: z.enum(["DATABASE_TYPE_UNSPECIFIED", "POSTGRES", "MYSQL"])
          .describe("Type of the Cloud SQL database.").optional(),
      }).describe(
        "Specification for the BigQuery connection to a Cloud SQL instance.",
      ).optional(),
      connectionType: z.enum(["CONNECTION_TYPE_UNSPECIFIED", "CLOUD_SQL"])
        .describe("The type of the BigQuery connection.").optional(),
      hasCredential: z.boolean().describe(
        "True if there are credentials attached to the BigQuery connection; false otherwise.",
      ).optional(),
    }).describe("Specification for the BigQuery connection.").optional(),
  }).describe(
    "Specification that applies to a data source connection. Valid only for entries with the `DATA_SOURCE_CONNECTION` type. Only one of internal specs can be set at the time, and cannot be changed later.",
  ).optional(),
  databaseTableSpec: z.object({
    databaseViewSpec: z.object({
      baseTable: z.string().describe(
        "Name of a singular table this view reflects one to one.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate this view.")
        .optional(),
      viewType: z.enum([
        "VIEW_TYPE_UNSPECIFIED",
        "STANDARD_VIEW",
        "MATERIALIZED_VIEW",
      ]).describe("Type of this view.").optional(),
    }).describe("Specification that applies to database view.").optional(),
    dataplexTable: z.object({
      dataplexSpec: z.object({
        asset: z.string().describe(
          "Fully qualified resource name of an asset in Dataplex Universal Catalog, to which the underlying data source (Cloud Storage bucket or BigQuery dataset) of the entity is attached.",
        ).optional(),
        compressionFormat: z.string().describe(
          "Compression format of the data, e.g., zip, gzip etc.",
        ).optional(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown().describe("JSON source of the Avro schema.")
              .optional(),
          }).describe("Schema in Avro JSON format.").optional(),
          csv: z.object({}).describe("Marks a CSV-encoded data source.")
            .optional(),
          orc: z.object({}).describe("Marks an ORC-encoded data source.")
            .optional(),
          parquet: z.object({}).describe("Marks a Parquet-encoded data source.")
            .optional(),
          protobuf: z.object({
            text: z.unknown().describe("Protocol buffer source of the schema.")
              .optional(),
          }).describe("Schema in protocol buffer format.").optional(),
          thrift: z.object({
            text: z.unknown().describe("Thrift IDL source of the schema.")
              .optional(),
          }).describe("Schema in Thrift format.").optional(),
        }).describe(
          "Native schema used by a resource represented as an entry. Used by query engines for deserializing and parsing source data.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID of the underlying Cloud Storage or BigQuery data. Note that this may not be the same project as the corresponding Dataplex Universal Catalog lake / zone / asset.",
        ).optional(),
      }).describe("Common Dataplex Universal Catalog fields.").optional(),
      externalTables: z.array(z.object({
        dataCatalogEntry: z.string().describe(
          "Name of the Data Catalog entry representing the external table.",
        ).optional(),
        fullyQualifiedName: z.string().describe(
          "Fully qualified name (FQN) of the external table.",
        ).optional(),
        googleCloudResource: z.string().describe(
          "Google Cloud resource name of the external table.",
        ).optional(),
        system: z.enum([
          "INTEGRATED_SYSTEM_UNSPECIFIED",
          "BIGQUERY",
          "CLOUD_PUBSUB",
          "DATAPROC_METASTORE",
          "DATAPLEX",
          "CLOUD_SPANNER",
          "CLOUD_BIGTABLE",
          "CLOUD_SQL",
          "LOOKER",
          "VERTEX_AI",
        ]).describe("Service in which the external table is registered.")
          .optional(),
      })).describe(
        "List of external tables registered by Dataplex Universal Catalog in other systems based on the same underlying data. External tables allow to query this data in those systems.",
      ).optional(),
      userManaged: z.boolean().describe(
        "Indicates if the table schema is managed by the user or not.",
      ).optional(),
    }).describe("Entry specification for a Dataplex Universal Catalog table.")
      .optional(),
    type: z.enum(["TABLE_TYPE_UNSPECIFIED", "NATIVE", "EXTERNAL"]).describe(
      "Type of this table.",
    ).optional(),
  }).describe(
    "Specification that applies to a table resource. Valid only for entries with the `TABLE` type.",
  ).optional(),
  datasetSpec: z.object({
    vertexDatasetSpec: z.object({
      dataItemCount: z.string().describe(
        "The number of DataItems in this Dataset. Only apply for non-structured Dataset.",
      ).optional(),
      dataType: z.enum([
        "DATA_TYPE_UNSPECIFIED",
        "TABLE",
        "IMAGE",
        "TEXT",
        "VIDEO",
        "CONVERSATION",
        "TIME_SERIES",
        "DOCUMENT",
        "TEXT_TO_SPEECH",
        "TRANSLATION",
        "STORE_VISION",
        "ENTERPRISE_KNOWLEDGE_GRAPH",
        "TEXT_PROMPT",
      ]).describe("Type of the dataset.").optional(),
    }).describe("Specification for vertex dataset resources.").optional(),
  }).describe(
    "Specification that applies to a dataset. Valid only for entries with the `DATASET` type.",
  ).optional(),
  description: z.string().describe(
    "Entry description that can consist of several sentences or paragraphs that describe entry contents. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). The maximum size is 2000 bytes when encoded in UTF-8. Default value is an empty string.",
  ).optional(),
  displayName: z.string().describe(
    "Display name of an entry. The maximum size is 500 bytes when encoded in UTF-8. Default value is an empty string.",
  ).optional(),
  featureOnlineStoreSpec: z.object({
    storageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "BIGTABLE", "OPTIMIZED"])
      .describe(
        "Output only. Type of underlying storage for the FeatureOnlineStore.",
      ).optional(),
  }).describe(
    "Detail description of the source information of a Vertex Feature Online Store.",
  ).optional(),
  filesetSpec: z.object({
    dataplexFileset: z.object({
      dataplexSpec: z.object({
        asset: z.string().describe(
          "Fully qualified resource name of an asset in Dataplex Universal Catalog, to which the underlying data source (Cloud Storage bucket or BigQuery dataset) of the entity is attached.",
        ).optional(),
        compressionFormat: z.string().describe(
          "Compression format of the data, e.g., zip, gzip etc.",
        ).optional(),
        dataFormat: z.object({
          avro: z.object({
            text: z.unknown().describe("JSON source of the Avro schema.")
              .optional(),
          }).describe("Schema in Avro JSON format.").optional(),
          csv: z.object({}).describe("Marks a CSV-encoded data source.")
            .optional(),
          orc: z.object({}).describe("Marks an ORC-encoded data source.")
            .optional(),
          parquet: z.object({}).describe("Marks a Parquet-encoded data source.")
            .optional(),
          protobuf: z.object({
            text: z.unknown().describe("Protocol buffer source of the schema.")
              .optional(),
          }).describe("Schema in protocol buffer format.").optional(),
          thrift: z.object({
            text: z.unknown().describe("Thrift IDL source of the schema.")
              .optional(),
          }).describe("Schema in Thrift format.").optional(),
        }).describe(
          "Native schema used by a resource represented as an entry. Used by query engines for deserializing and parsing source data.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID of the underlying Cloud Storage or BigQuery data. Note that this may not be the same project as the corresponding Dataplex Universal Catalog lake / zone / asset.",
        ).optional(),
      }).describe("Common Dataplex Universal Catalog fields.").optional(),
    }).describe("Entry specification for a Dataplex Universal Catalog fileset.")
      .optional(),
  }).describe(
    "Specification that applies to a fileset. Valid only for entries with the 'FILESET' type.",
  ).optional(),
  fullyQualifiedName: z.string().describe(
    "[Fully Qualified Name (FQN)](https://cloud.google.com//data-catalog/docs/fully-qualified-names) of the resource. Set automatically for entries representing resources from synced systems. Settable only during creation, and read-only later. Can be used for search and lookup of the entries.",
  ).optional(),
  gcsFilesetSpec: z.object({
    filePatterns: z.array(z.string()).describe(
      "Required. Patterns to identify a set of files in Google Cloud Storage. For more information, see [Wildcard Names] (https://cloud.google.com/storage/docs/wildcards). Note: Currently, bucket wildcards are not supported. Examples of valid `file_patterns`: * `gs://bucket_name/dir/*`: matches all files in `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files in `bucket_name/dir` and all subdirectories * `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` * `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`,... or `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt` You can combine wildcards to match complex sets of files, for example: `gs://bucket_name/[a-m]??.j*g`",
    ).optional(),
    sampleGcsFileSpecs: z.array(z.object({
      filePath: z.string().describe(
        "Required. Full file path. Example: `gs://bucket_name/a/b.txt`.",
      ).optional(),
      gcsTimestamps: z.object({
        createTime: z.string().describe(
          "Creation timestamp of the resource within the given system.",
        ).optional(),
        expireTime: z.string().describe(
          "Output only. Expiration timestamp of the resource within the given system. Currently only applicable to BigQuery resources.",
        ).optional(),
        updateTime: z.string().describe(
          "Timestamp of the last modification of the resource or its metadata within a given system. Note: Depending on the source system, not every modification updates this timestamp. For example, BigQuery timestamps every metadata modification but not data or permission changes.",
        ).optional(),
      }).describe(
        "Timestamps associated with this resource in a particular system.",
      ).optional(),
      sizeBytes: z.string().describe("Output only. File size in bytes.")
        .optional(),
    })).describe(
      "Output only. Sample files contained in this fileset, not all files contained in this fileset are represented here.",
    ).optional(),
  }).describe("Describes a Cloud Storage fileset entry.").optional(),
  graphSpec: z.object({
    edgeTables: z.array(z.object({
      alias: z.string().describe(
        "Required. The alias name of the graph element.",
      ).optional(),
      dataSource: z.string().describe(
        "Required. The name of the data source. This is either a table name or a view name that is used for graph element input source. E.g. `Person` table or `PersonView` view.",
      ).optional(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
      dynamicLabelColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic label in schemaless data model.",
      ).optional(),
      dynamicPropertiesColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic properties in schemaless data model.",
      ).optional(),
      elementKeys: z.array(z.string()).describe(
        "Required. The name of the keys of the elements in the table.",
      ).optional(),
      inputSource: z.enum(["INPUT_SOURCE_UNSPECIFIED", "TABLE", "VIEW"])
        .describe("Required. The input source of the graph element.")
        .optional(),
      kind: z.enum(["KIND_UNSPECIFIED", "NODE", "EDGE"]).describe(
        "Required. The kind of the graph element.",
      ).optional(),
      labelAndProperties: z.array(z.object({
        label: z.unknown().describe("Required. The name of the label.")
          .optional(),
        properties: z.unknown().describe(
          "Optional. The properties associated with the label.",
        ).optional(),
      })).describe(
        "Required. The labels and their properties for the graph element.",
      ).optional(),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
    })).describe("Optional. Edge tables of the graph.").optional(),
    name: z.string().describe(
      "Output only. Fully qualified graph name. e.g. `named_catalog.MyGraph`",
    ).optional(),
    nodeTables: z.array(z.object({
      alias: z.string().describe(
        "Required. The alias name of the graph element.",
      ).optional(),
      dataSource: z.string().describe(
        "Required. The name of the data source. This is either a table name or a view name that is used for graph element input source. E.g. `Person` table or `PersonView` view.",
      ).optional(),
      destinationNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
      dynamicLabelColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic label in schemaless data model.",
      ).optional(),
      dynamicPropertiesColumn: z.string().describe(
        "Optional. If set, this is the input column for dynamic properties in schemaless data model.",
      ).optional(),
      elementKeys: z.array(z.string()).describe(
        "Required. The name of the keys of the elements in the table.",
      ).optional(),
      inputSource: z.enum(["INPUT_SOURCE_UNSPECIFIED", "TABLE", "VIEW"])
        .describe("Required. The input source of the graph element.")
        .optional(),
      kind: z.enum(["KIND_UNSPECIFIED", "NODE", "EDGE"]).describe(
        "Required. The kind of the graph element.",
      ).optional(),
      labelAndProperties: z.array(z.object({
        label: z.unknown().describe("Required. The name of the label.")
          .optional(),
        properties: z.unknown().describe(
          "Optional. The properties associated with the label.",
        ).optional(),
      })).describe(
        "Required. The labels and their properties for the graph element.",
      ).optional(),
      sourceNodeReference: z.object({
        edgeTableColumns: z.array(z.unknown()).describe(
          "Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`.",
        ).optional(),
        nodeAlias: z.string().describe(
          "Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`.",
        ).optional(),
        nodeTableColumns: z.array(z.unknown()).describe(
          "Required. The referenced columns of the source node table.",
        ).optional(),
      }).describe(
        "A reference to a source or destination node in a graph edge.",
      ).optional(),
    })).describe("Required. Node tables of the graph.").optional(),
  }).describe("Specification that applies to a graph.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Cloud labels attached to the entry. In Data Catalog, you can create and modify labels attached only to custom entries. Synced entries have unmodifiable labels that come from the source system.",
  ).optional(),
  lookerSystemSpec: z.object({
    parentInstanceDisplayName: z.string().describe(
      "Name of the parent Looker Instance. Empty if it does not exist.",
    ).optional(),
    parentInstanceId: z.string().describe(
      "ID of the parent Looker Instance. Empty if it does not exist. Example value: `someinstance.looker.com`",
    ).optional(),
    parentModelDisplayName: z.string().describe(
      "Name of the parent Model. Empty if it does not exist.",
    ).optional(),
    parentModelId: z.string().describe(
      "ID of the parent Model. Empty if it does not exist.",
    ).optional(),
    parentViewDisplayName: z.string().describe(
      "Name of the parent View. Empty if it does not exist.",
    ).optional(),
    parentViewId: z.string().describe(
      "ID of the parent View. Empty if it does not exist.",
    ).optional(),
  }).describe(
    "Specification that applies to entries that are part `LOOKER` system (user_specified_type)",
  ).optional(),
  modelSpec: z.object({
    vertexModelSpec: z.object({
      containerImageUri: z.string().describe(
        "URI of the Docker image to be used as the custom container for serving predictions.",
      ).optional(),
      versionAliases: z.array(z.string()).describe(
        "User provided version aliases so that a model version can be referenced via alias",
      ).optional(),
      versionDescription: z.string().describe(
        "The description of this version.",
      ).optional(),
      versionId: z.string().describe("The version ID of the model.").optional(),
      vertexModelSourceInfo: z.object({
        copy: z.boolean().describe(
          "If this Model is copy of another Model. If true then source_type pertains to the original.",
        ).optional(),
        sourceType: z.enum([
          "MODEL_SOURCE_TYPE_UNSPECIFIED",
          "AUTOML",
          "CUSTOM",
          "BQML",
          "MODEL_GARDEN",
          "GENIE",
          "CUSTOM_TEXT_EMBEDDING",
          "MARKETPLACE",
        ]).describe("Type of the model source.").optional(),
      }).describe(
        "Detail description of the source information of a Vertex model.",
      ).optional(),
    }).describe("Specification for vertex model resources.").optional(),
  }).describe(
    "Specification that applies to a model. Valid only for entries with the `MODEL` type.",
  ).optional(),
  personalDetails: z.object({
    starTime: z.string().describe(
      "Set if the entry is starred; unset otherwise.",
    ).optional(),
    starred: z.boolean().describe(
      "True if the entry is starred by the user; false otherwise.",
    ).optional(),
  }).describe("Entry metadata relevant only to the user and private to them.")
    .optional(),
  routineSpec: z.object({
    bigqueryRoutineSpec: z.object({
      importedLibraries: z.array(z.string()).describe(
        "Paths of the imported libraries.",
      ).optional(),
    }).describe("Fields specific for BigQuery routines.").optional(),
    definitionBody: z.string().describe("The body of the routine.").optional(),
    language: z.string().describe(
      "The language the routine is written in. The exact value depends on the source system. For BigQuery routines, possible values are: * `SQL` * `JAVASCRIPT`",
    ).optional(),
    returnType: z.string().describe(
      "Return type of the argument. The exact value depends on the source system and the language.",
    ).optional(),
    routineArguments: z.array(z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "IN", "OUT", "INOUT"]).describe(
        "Specifies whether the argument is input or output.",
      ).optional(),
      name: z.string().describe(
        "The name of the argument. A return argument of a function might not have a name.",
      ).optional(),
      type: z.string().describe(
        "Type of the argument. The exact value depends on the source system and the language.",
      ).optional(),
    })).describe("Arguments of the routine.").optional(),
    routineType: z.enum([
      "ROUTINE_TYPE_UNSPECIFIED",
      "SCALAR_FUNCTION",
      "PROCEDURE",
    ]).describe("The type of the routine.").optional(),
  }).describe(
    "Specification that applies to a routine. Valid only for entries with the `ROUTINE` type.",
  ).optional(),
  schema: z.object({
    columns: z.array(z.object({
      column: z.string().describe(
        "Required. Name of the column. Must be a UTF-8 string without dots (.). The maximum size is 64 bytes.",
      ).optional(),
      defaultValue: z.string().describe(
        "Optional. Default value for the column.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the column. Default value is an empty string. The description must be a UTF-8 string with the maximum size of 2000 bytes.",
      ).optional(),
      gcRule: z.string().describe(
        "Optional. Garbage collection policy for the column or column family. Applies to systems like Cloud Bigtable.",
      ).optional(),
      highestIndexingType: z.enum([
        "INDEXING_TYPE_UNSPECIFIED",
        "INDEXING_TYPE_NONE",
        "INDEXING_TYPE_NON_UNIQUE",
        "INDEXING_TYPE_UNIQUE",
        "INDEXING_TYPE_PRIMARY_KEY",
      ]).describe("Optional. Most important inclusion of this column.")
        .optional(),
      lookerColumnSpec: z.object({
        type: z.enum([
          "LOOKER_COLUMN_TYPE_UNSPECIFIED",
          "DIMENSION",
          "DIMENSION_GROUP",
          "FILTER",
          "MEASURE",
          "PARAMETER",
        ]).describe("Looker specific column type of this column.").optional(),
      }).describe("Column info specific to Looker System.").optional(),
      mode: z.string().describe(
        "Optional. A column's mode indicates whether values in this column are required, nullable, or repeated. Only `NULLABLE`, `REQUIRED`, and `REPEATED` values are supported. Default mode is `NULLABLE`.",
      ).optional(),
      ordinalPosition: z.number().int().describe("Optional. Ordinal position")
        .optional(),
      rangeElementType: z.object({
        type: z.string().describe(
          "Required. The type of a field element. See ColumnSchema.type.",
        ).optional(),
      }).describe("Represents the type of a field element.").optional(),
      subcolumns: z.array(z.string()).describe(
        "Optional. Schema of sub-columns. A column can have zero or more sub-columns.",
      ).optional(),
      type: z.string().describe(
        "Required. Type of the column. Must be a UTF-8 string with the maximum size of 128 bytes.",
      ).optional(),
    })).describe(
      "The unified GoogleSQL-like schema of columns. The overall maximum number of columns and nested columns is 10,000. The maximum nested depth is 15 levels.",
    ).optional(),
  }).describe(
    "Represents a schema, for example, a BigQuery, GoogleSQL, or Avro schema.",
  ).optional(),
  serviceSpec: z.object({
    cloudBigtableInstanceSpec: z.object({
      cloudBigtableClusterSpecs: z.array(z.object({
        displayName: z.string().describe("Name of the cluster.").optional(),
        linkedResource: z.string().describe(
          "A link back to the parent resource, in this case Instance.",
        ).optional(),
        location: z.string().describe(
          "Location of the cluster, typically a Cloud zone.",
        ).optional(),
        type: z.string().describe(
          'Type of the resource. For a cluster this would be "CLUSTER".',
        ).optional(),
      })).describe("The list of clusters for the Instance.").optional(),
    }).describe(
      "Specification that applies to Instance entries that are part of `CLOUD_BIGTABLE` system. (user_specified_type)",
    ).optional(),
  }).describe(
    "Specification that applies to a Service resource. Valid only for entries with the `SERVICE` type.",
  ).optional(),
  sourceSystemTimestamps: z.object({
    createTime: z.string().describe(
      "Creation timestamp of the resource within the given system.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. Expiration timestamp of the resource within the given system. Currently only applicable to BigQuery resources.",
    ).optional(),
    updateTime: z.string().describe(
      "Timestamp of the last modification of the resource or its metadata within a given system. Note: Depending on the source system, not every modification updates this timestamp. For example, BigQuery timestamps every metadata modification but not data or permission changes.",
    ).optional(),
  }).describe(
    "Timestamps associated with this resource in a particular system.",
  ).optional(),
  spannerTableSpec: z.object({
    foreignKeys: z.array(z.object({
      columnMappings: z.array(z.object({
        column: z.unknown().describe(
          "Output only. The column in the current table that is part of the foreign key.",
        ).optional(),
        referenceColumn: z.unknown().describe(
          "Output only. The column in the referenced table that is part of the foreign key.",
        ).optional(),
      })).describe(
        "Output only. The ordered list of column mappings for this foreign key.",
      ).optional(),
      entry: z.string().describe(
        "Output only. The table name this foreign key referenced to. Format: `projects/{PROJECT_ID}/locations/{LOCATION}/entryGroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`",
      ).optional(),
      name: z.string().describe(
        "Output only. The constraint_name of the foreign key, for example, FK_CustomerOrder.",
      ).optional(),
    })).describe("Output only. The foreign keys of the table.").optional(),
    primaryKey: z.object({
      columns: z.array(z.string()).describe(
        "Output only. Column names of the primary key.",
      ).optional(),
    }).describe("Specification of a Spanner primary key.").optional(),
  }).describe("Specification of a Spanner table.").optional(),
  sqlDatabaseSystemSpec: z.object({
    databaseVersion: z.string().describe("Version of the database engine.")
      .optional(),
    instanceHost: z.string().describe(
      "Host of the SQL database enum InstanceHost { UNDEFINED = 0; SELF_HOSTED = 1; CLOUD_SQL = 2; AMAZON_RDS = 3; AZURE_SQL = 4; } Host of the enclousing database instance.",
    ).optional(),
    sqlEngine: z.string().describe(
      "SQL Database Engine. enum SqlEngine { UNDEFINED = 0; MY_SQL = 1; POSTGRE_SQL = 2; SQL_SERVER = 3; } Engine of the enclosing database instance.",
    ).optional(),
  }).describe(
    "Specification that applies to entries that are part `SQL_DATABASE` system (user_specified_type)",
  ).optional(),
  type: z.enum([
    "ENTRY_TYPE_UNSPECIFIED",
    "TABLE",
    "MODEL",
    "DATA_STREAM",
    "FILESET",
    "CLUSTER",
    "DATABASE",
    "DATA_SOURCE_CONNECTION",
    "ROUTINE",
    "LAKE",
    "ZONE",
    "SERVICE",
    "DATABASE_SCHEMA",
    "DASHBOARD",
    "EXPLORE",
    "LOOK",
    "FEATURE_ONLINE_STORE",
    "FEATURE_VIEW",
    "FEATURE_GROUP",
    "GRAPH",
  ]).describe(
    "The type of the entry. For details, see [`EntryType`](#entrytype).",
  ).optional(),
  usageSignal: z.object({
    commonUsageWithinTimeRange: z.record(
      z.string(),
      z.object({
        viewCount: z.string().describe("View count in source system.")
          .optional(),
      }),
    ).describe(
      'Common usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D", "Lifetime"}`.',
    ).optional(),
    favoriteCount: z.string().describe("Favorite count in the source system.")
      .optional(),
    updateTime: z.string().describe(
      "The end timestamp of the duration of usage statistics.",
    ).optional(),
    usageWithinTimeRange: z.record(
      z.string(),
      z.object({
        totalCancellations: z.number().describe(
          "The number of cancelled attempts to use the underlying entry.",
        ).optional(),
        totalCompletions: z.number().describe(
          "The number of successful uses of the underlying entry.",
        ).optional(),
        totalExecutionTimeForCompletionsMillis: z.number().describe(
          "Total time spent only on successful uses, in milliseconds.",
        ).optional(),
        totalFailures: z.number().describe(
          "The number of failed attempts to use the underlying entry.",
        ).optional(),
      }),
    ).describe(
      'Output only. BigQuery usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D"}`.',
    ).optional(),
  }).describe(
    "The set of all usage signals that Data Catalog stores. Note: Usually, these signals are updated daily. In rare cases, an update may fail but will be performed again on the next day.",
  ).optional(),
  userSpecifiedSystem: z.string().describe(
    "Indicates the entry's source system that Data Catalog doesn't automatically integrate with. The `user_specified_system` string has the following limitations: * Is case insensitive. * Must begin with a letter or underscore. * Can only contain letters, numbers, and underscores. * Must be at least 1 character and at most 64 characters long.",
  ).optional(),
  userSpecifiedType: z.string().describe(
    "Custom entry type that doesn't match any of the values allowed for input and listed in the `EntryType` enum. When creating an entry, first check the type values in the enum. If there are no appropriate types for the new entry, provide a custom value, for example, `my_special_type`. The `user_specified_type` string has the following limitations: * Is case insensitive. * Must begin with a letter or underscore. * Can only contain letters, numbers, and underscores. * Must be at least 1 character and at most 64 characters long.",
  ).optional(),
  entryId: z.string().describe(
    "Required. The ID of the entry to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores (_). The maximum size is 64 bytes when encoded in UTF-8.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Data Catalog EntryGroups.Entries. Registered at `@swamp/gcp/datacatalog/entrygroups-entries`. */
export const model = {
  type: "@swamp/gcp/datacatalog/entrygroups-entries",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Entry metadata. A Data Catalog entry represents another resource in Google Cl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a entries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bigqueryDateShardedSpec"] !== undefined) {
          body["bigqueryDateShardedSpec"] = g["bigqueryDateShardedSpec"];
        }
        if (g["bigqueryTableSpec"] !== undefined) {
          body["bigqueryTableSpec"] = g["bigqueryTableSpec"];
        }
        if (g["businessContext"] !== undefined) {
          body["businessContext"] = g["businessContext"];
        }
        if (g["cloudBigtableSystemSpec"] !== undefined) {
          body["cloudBigtableSystemSpec"] = g["cloudBigtableSystemSpec"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["dataSourceConnectionSpec"] !== undefined) {
          body["dataSourceConnectionSpec"] = g["dataSourceConnectionSpec"];
        }
        if (g["databaseTableSpec"] !== undefined) {
          body["databaseTableSpec"] = g["databaseTableSpec"];
        }
        if (g["datasetSpec"] !== undefined) {
          body["datasetSpec"] = g["datasetSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["featureOnlineStoreSpec"] !== undefined) {
          body["featureOnlineStoreSpec"] = g["featureOnlineStoreSpec"];
        }
        if (g["filesetSpec"] !== undefined) {
          body["filesetSpec"] = g["filesetSpec"];
        }
        if (g["fullyQualifiedName"] !== undefined) {
          body["fullyQualifiedName"] = g["fullyQualifiedName"];
        }
        if (g["gcsFilesetSpec"] !== undefined) {
          body["gcsFilesetSpec"] = g["gcsFilesetSpec"];
        }
        if (g["graphSpec"] !== undefined) body["graphSpec"] = g["graphSpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lookerSystemSpec"] !== undefined) {
          body["lookerSystemSpec"] = g["lookerSystemSpec"];
        }
        if (g["modelSpec"] !== undefined) body["modelSpec"] = g["modelSpec"];
        if (g["personalDetails"] !== undefined) {
          body["personalDetails"] = g["personalDetails"];
        }
        if (g["routineSpec"] !== undefined) {
          body["routineSpec"] = g["routineSpec"];
        }
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["serviceSpec"] !== undefined) {
          body["serviceSpec"] = g["serviceSpec"];
        }
        if (g["sourceSystemTimestamps"] !== undefined) {
          body["sourceSystemTimestamps"] = g["sourceSystemTimestamps"];
        }
        if (g["spannerTableSpec"] !== undefined) {
          body["spannerTableSpec"] = g["spannerTableSpec"];
        }
        if (g["sqlDatabaseSystemSpec"] !== undefined) {
          body["sqlDatabaseSystemSpec"] = g["sqlDatabaseSystemSpec"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["usageSignal"] !== undefined) {
          body["usageSignal"] = g["usageSignal"];
        }
        if (g["userSpecifiedSystem"] !== undefined) {
          body["userSpecifiedSystem"] = g["userSpecifiedSystem"];
        }
        if (g["userSpecifiedType"] !== undefined) {
          body["userSpecifiedType"] = g["userSpecifiedType"];
        }
        if (g["entryId"] !== undefined) body["entryId"] = g["entryId"];
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
      description: "Get a entries",
      arguments: z.object({
        identifier: z.string().describe("The name of the entries"),
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
      description: "Update entries attributes",
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
        if (g["bigqueryDateShardedSpec"] !== undefined) {
          body["bigqueryDateShardedSpec"] = g["bigqueryDateShardedSpec"];
        }
        if (g["bigqueryTableSpec"] !== undefined) {
          body["bigqueryTableSpec"] = g["bigqueryTableSpec"];
        }
        if (g["businessContext"] !== undefined) {
          body["businessContext"] = g["businessContext"];
        }
        if (g["cloudBigtableSystemSpec"] !== undefined) {
          body["cloudBigtableSystemSpec"] = g["cloudBigtableSystemSpec"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["databaseTableSpec"] !== undefined) {
          body["databaseTableSpec"] = g["databaseTableSpec"];
        }
        if (g["datasetSpec"] !== undefined) {
          body["datasetSpec"] = g["datasetSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["featureOnlineStoreSpec"] !== undefined) {
          body["featureOnlineStoreSpec"] = g["featureOnlineStoreSpec"];
        }
        if (g["filesetSpec"] !== undefined) {
          body["filesetSpec"] = g["filesetSpec"];
        }
        if (g["fullyQualifiedName"] !== undefined) {
          body["fullyQualifiedName"] = g["fullyQualifiedName"];
        }
        if (g["gcsFilesetSpec"] !== undefined) {
          body["gcsFilesetSpec"] = g["gcsFilesetSpec"];
        }
        if (g["graphSpec"] !== undefined) body["graphSpec"] = g["graphSpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lookerSystemSpec"] !== undefined) {
          body["lookerSystemSpec"] = g["lookerSystemSpec"];
        }
        if (g["modelSpec"] !== undefined) body["modelSpec"] = g["modelSpec"];
        if (g["personalDetails"] !== undefined) {
          body["personalDetails"] = g["personalDetails"];
        }
        if (g["routineSpec"] !== undefined) {
          body["routineSpec"] = g["routineSpec"];
        }
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["serviceSpec"] !== undefined) {
          body["serviceSpec"] = g["serviceSpec"];
        }
        if (g["sourceSystemTimestamps"] !== undefined) {
          body["sourceSystemTimestamps"] = g["sourceSystemTimestamps"];
        }
        if (g["spannerTableSpec"] !== undefined) {
          body["spannerTableSpec"] = g["spannerTableSpec"];
        }
        if (g["sqlDatabaseSystemSpec"] !== undefined) {
          body["sqlDatabaseSystemSpec"] = g["sqlDatabaseSystemSpec"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["usageSignal"] !== undefined) {
          body["usageSignal"] = g["usageSignal"];
        }
        if (g["userSpecifiedSystem"] !== undefined) {
          body["userSpecifiedSystem"] = g["userSpecifiedSystem"];
        }
        if (g["userSpecifiedType"] !== undefined) {
          body["userSpecifiedType"] = g["userSpecifiedType"];
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
      description: "Delete the entries",
      arguments: z.object({
        identifier: z.string().describe("The name of the entries"),
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
      description: "Sync entries state from GCP",
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
    import: {
      description: "import",
      arguments: z.object({
        gcsBucketPath: z.any().optional(),
        jobId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["gcsBucketPath"] !== undefined) {
          body["gcsBucketPath"] = args["gcsBucketPath"];
        }
        if (args["jobId"] !== undefined) body["jobId"] = args["jobId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "datacatalog.projects.locations.entryGroups.entries.import",
            "path": "v1/{+parent}/entries:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    modify_entry_contacts: {
      description: "modify entry contacts",
      arguments: z.object({
        contacts: z.any().optional(),
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
        if (args["contacts"] !== undefined) body["contacts"] = args["contacts"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datacatalog.projects.locations.entryGroups.entries.modifyEntryContacts",
            "path": "v1/{+name}:modifyEntryContacts",
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
    modify_entry_overview: {
      description: "modify entry overview",
      arguments: z.object({
        entryOverview: z.any().optional(),
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
        if (args["entryOverview"] !== undefined) {
          body["entryOverview"] = args["entryOverview"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datacatalog.projects.locations.entryGroups.entries.modifyEntryOverview",
            "path": "v1/{+name}:modifyEntryOverview",
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
    star: {
      description: "star",
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
            "id": "datacatalog.projects.locations.entryGroups.entries.star",
            "path": "v1/{+name}:star",
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
    unstar: {
      description: "unstar",
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
            "id": "datacatalog.projects.locations.entryGroups.entries.unstar",
            "path": "v1/{+name}:unstar",
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
  },
};
