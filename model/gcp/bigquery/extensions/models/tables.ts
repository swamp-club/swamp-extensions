// Auto-generated extension model for @swamp/gcp/bigquery/tables
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Tables.
 *
 * Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table.
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

const BASE_URL = "https://bigquery.googleapis.com/bigquery/v2/";

const GET_CONFIG = {
  "id": "bigquery.tables.get",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "selectedFields": {
      "location": "query",
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigquery.tables.insert",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "datasetId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "bigquery.tables.update",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "autodetect_schema": {
      "location": "query",
    },
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigquery.tables.delete",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "bigquery.tables.list",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  biglakeConfiguration: z.object({
    connectionId: z.string().describe(
      'Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection_id can have the form `{project}.{location}.{connection_id}` or `projects/{project}/locations/{location}/connections/{connection_id}".',
    ).optional(),
    fileFormat: z.enum(["FILE_FORMAT_UNSPECIFIED", "PARQUET"]).describe(
      "Optional. The file format the table data is stored in.",
    ).optional(),
    storageUri: z.string().describe(
      "Optional. The fully qualified location prefix of the external folder where table data is stored. The '*' wildcard character is not allowed. The URI should be in the format `gs://bucket/path_to_table/`",
    ).optional(),
    tableFormat: z.enum(["TABLE_FORMAT_UNSPECIFIED", "ICEBERG"]).describe(
      "Optional. The table format the metadata only snapshots are stored in.",
    ).optional(),
  }).describe(
    "Configuration for BigQuery tables for Apache Iceberg (formerly BigLake managed tables.)",
  ).optional(),
  cloneDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
    cloneTime: z.string().describe(
      "Required. The time at which the base table was cloned. This value is reported in the JSON response using RFC3339 format.",
    ).optional(),
  }).describe("Information about base table and clone time of a table clone.")
    .optional(),
  clustering: z.object({
    fields: z.array(z.string()).describe(
      "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
    ).optional(),
  }).describe("Configures table clustering.").optional(),
  defaultCollation: z.string().describe(
    "Optional. Defines the default collation specification of new STRING fields in the table. During table creation or update, if a STRING field is added to this table without explicit collation specified, then the table inherits the table default collation. A change to this field affects only fields added afterwards, and does not alter the existing fields. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
  ).optional(),
  defaultRoundingMode: z.enum([
    "ROUNDING_MODE_UNSPECIFIED",
    "ROUND_HALF_AWAY_FROM_ZERO",
    "ROUND_HALF_EVEN",
  ]).describe(
    "Optional. Defines the default rounding mode specification of new decimal fields (NUMERIC OR BIGNUMERIC) in the table. During table creation or update, if a decimal field is added to this table without an explicit rounding mode specified, then the field inherits the table default rounding mode. Changing this field doesn't affect existing fields.",
  ).optional(),
  description: z.string().describe(
    "Optional. A user-friendly description of this table.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
    ).optional(),
  }).describe("Configuration for Cloud KMS encryption settings.").optional(),
  expirationTime: z.string().describe(
    "Optional. The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created tables.",
  ).optional(),
  externalCatalogTableOptions: z.object({
    connectionId: z.string().describe(
      "Optional. A connection ID that specifies the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or Amazon S3. This connection is needed to read the open source table from BigQuery. The connection_id format must be either `..` or `projects//locations//connections/`.",
    ).optional(),
    parameters: z.record(z.string(), z.string()).describe(
      "Optional. A map of the key-value pairs defining the parameters and properties of the open source table. Corresponds with Hive metastore table parameters. Maximum size of 4MiB.",
    ).optional(),
    storageDescriptor: z.object({
      inputFormat: z.string().describe(
        'Optional. Specifies the fully qualified class name of the InputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcInputFormat"). The maximum length is 128 characters.',
      ).optional(),
      locationUri: z.string().describe(
        "Optional. The physical location of the table (e.g. `gs://spark-dataproc-data/pangea-data/case_sensitive/` or `gs://spark-dataproc-data/pangea-data/*`). The maximum length is 2056 bytes.",
      ).optional(),
      outputFormat: z.string().describe(
        'Optional. Specifies the fully qualified class name of the OutputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcOutputFormat"). The maximum length is 128 characters.',
      ).optional(),
      serdeInfo: z.object({
        name: z.string().describe(
          "Optional. Name of the SerDe. The maximum length is 256 characters.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          "Optional. Key-value pairs that define the initialization parameters for the serialization library. Maximum size 10 Kib.",
        ).optional(),
        serializationLibrary: z.string().describe(
          "Required. Specifies a fully-qualified class name of the serialization library that is responsible for the translation of data between table representation and the underlying low-level input and output format structures. The maximum length is 256 characters.",
        ).optional(),
      }).describe("Serializer and deserializer information.").optional(),
    }).describe(
      "Contains information about how a table's data is stored and accessed by open source query engines.",
    ).optional(),
  }).describe(
    "Metadata about open source compatible table. The fields contained in these options correspond to Hive metastore's table-level properties.",
  ).optional(),
  externalDataConfiguration: z.object({
    autodetect: z.boolean().describe(
      "Try to detect schema and format options automatically. Any option specified explicitly will be honored.",
    ).optional(),
    avroOptions: z.object({
      useAvroLogicalTypes: z.boolean().describe(
        'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
      ).optional(),
    }).describe("Options for external data sources.").optional(),
    bigtableOptions: z.object({
      columnFamilies: z.array(z.object({
        columns: z.array(z.unknown()).describe(
          "Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `.`. Other columns can be accessed as a list through the `.Column` field.",
        ).optional(),
        encoding: z.string().describe(
          "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it.",
        ).optional(),
        familyId: z.string().describe("Identifier of the column family.")
          .optional(),
        onlyReadLatest: z.boolean().describe(
          "Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column.",
        ).optional(),
        protoConfig: z.object({
          protoMessageName: z.unknown().describe(
            'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
          ).optional(),
        }).describe("Information related to a Bigtable protobuf column.")
          .optional(),
        type: z.string().describe(
          "Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it.",
        ).optional(),
      })).describe(
        "Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable.",
      ).optional(),
      ignoreUnspecifiedColumnFamilies: z.boolean().describe(
        "Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false.",
      ).optional(),
      outputColumnFamiliesAsJson: z.boolean().describe(
        "Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false.",
      ).optional(),
      readRowkeyAsString: z.boolean().describe(
        "Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false.",
      ).optional(),
    }).describe("Options specific to Google Cloud Bigtable data sources.")
      .optional(),
    compression: z.string().describe(
      "Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value.",
    ).optional(),
    connectionId: z.string().describe(
      "Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`.",
    ).optional(),
    csvOptions: z.object({
      allowJaggedRows: z.boolean().describe(
        "Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false.",
      ).optional(),
      allowQuotedNewlines: z.boolean().describe(
        "Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
      ).optional(),
      nullMarker: z.string().describe(
        'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
      ).optional(),
      nullMarkers: z.array(z.string()).describe(
        "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
      ).optional(),
      preserveAsciiControlCharacters: z.boolean().describe(
        "Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
      ).optional(),
      quote: z.string().regex(new RegExp(".?")).describe(
        "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote (\"). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '.",
      ).optional(),
      skipLeadingRows: z.string().describe(
        "Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
      sourceColumnMatch: z.string().describe(
        "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema.",
      ).optional(),
    }).describe("Information related to a CSV data source.").optional(),
    dateFormat: z.string().describe(
      "Optional. Format used to parse DATE values. Supports C-style and SQL-style values.",
    ).optional(),
    datetimeFormat: z.string().describe(
      "Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values.",
    ).optional(),
    decimalTargetTypes: z.array(
      z.enum([
        "DECIMAL_TARGET_TYPE_UNSPECIFIED",
        "NUMERIC",
        "BIGNUMERIC",
        "STRING",
      ]),
    ).describe(
      'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
    ).optional(),
    fileSetSpecType: z.enum([
      "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
      "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
    ]).describe(
      "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems.",
    ).optional(),
    googleSheetsOptions: z.object({
      range: z.string().describe(
        "Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20",
      ).optional(),
      skipLeadingRows: z.string().describe(
        "Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
    }).describe("Options specific to Google Sheets data sources.").optional(),
    hivePartitioningOptions: z.object({
      fields: z.array(z.string()).describe(
        "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
      ).optional(),
      mode: z.string().describe(
        "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
      ).optional(),
      requirePartitionFilter: z.boolean().describe(
        "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
      ).optional(),
      sourceUriPrefix: z.string().describe(
        "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
      ).optional(),
    }).describe("Options for configuring hive partitioning detect.").optional(),
    ignoreUnknownValues: z.boolean().describe(
      "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored.",
    ).optional(),
    jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"]).describe(
      "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
    ).optional(),
    jsonOptions: z.object({
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8.",
      ).optional(),
    }).describe("Json Options for load and make external tables.").optional(),
    maxBadRecords: z.number().int().describe(
      "Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats.",
    ).optional(),
    metadataCacheMode: z.enum([
      "METADATA_CACHE_MODE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source.",
    ).optional(),
    objectMetadata: z.enum([
      "OBJECT_METADATA_UNSPECIFIED",
      "DIRECTORY",
      "SIMPLE",
    ]).describe(
      "Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type.",
    ).optional(),
    parquetOptions: z.object({
      enableListInference: z.boolean().describe(
        "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
      ).optional(),
      enumAsString: z.boolean().describe(
        "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
      ).optional(),
      mapTargetType: z.enum(["MAP_TARGET_TYPE_UNSPECIFIED", "ARRAY_OF_STRUCT"])
        .describe(
          "Optional. Indicates how to represent a Parquet map if present.",
        ).optional(),
    }).describe("Parquet Options for load and make external tables.")
      .optional(),
    referenceFileSchemaUri: z.string().describe(
      "Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC.",
    ).optional(),
    schema: z.object({
      fields: z.array(z.object({
        categories: z.object({
          names: z.unknown().describe("Deprecated.").optional(),
        }).describe("Deprecated.").optional(),
        collation: z.string().describe(
          "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
        ).optional(),
        dataGovernanceTagsInfo: z.object({
          dataGovernanceTags: z.unknown().describe(
            'Optional. The data governance tags added to this field are used for field-level access control. Only one data governance tag is currently supported on a field. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/pii" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "sensitive". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. For example: "123456789012/pii": "sensitive", "myProject/cost_center": "sales"',
          ).optional(),
        }).describe(
          "Optional. Specifies the data governance tags on this field. This field works with other column-level security fields as follows: - Precedence: If a data governance tag is attached to a column, it takes precedence over the policy tag attached to the column. However, if a data policy is attached to a column, it takes precedence over the data governance tag. - Patching behavior (how this field behaves during a `Table.patch` schema update): - Unset: If the `data_governance_tags_info` field is omitted from the update request, the existing tags on the column are preserved. - Empty Field: To clear data governance tags from a column, send the `data_governance_tags_info` field as an empty object. This will remove all tags from the column. - Updating tags: To replace existing tag, send the field with the new tag.",
        ).optional(),
        dataPolicies: z.array(z.unknown()).describe(
          "Optional. Data policies attached to this field, used for field-level access control.",
        ).optional(),
        dataPolicyList: z.object({
          dataPolicies: z.unknown().describe(
            "Contains a list of data policy options. At most 9 data policies are allowed per field.",
          ).optional(),
        }).describe(
          "A list of data policy options. For more information, see [Mask data by applying data policies to a column](https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).",
        ).optional(),
        defaultValueExpression: z.string().describe(
          "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
        ).optional(),
        description: z.string().describe(
          "Optional. The field description. The maximum length is 1,024 characters.",
        ).optional(),
        fields: z.array(z.unknown()).describe(
          "Optional. Describes the nested schema fields if the type property is set to RECORD.",
        ).optional(),
        foreignTypeDefinition: z.string().describe(
          "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
        ).optional(),
        generatedColumn: z.object({
          generatedExpressionInfo: z.unknown().describe(
            "Definition of the expression used to generate the field.",
          ).optional(),
          generatedMode: z.unknown().describe(
            "Optional. Dictates when system generated values are used to populate the field.",
          ).optional(),
        }).describe(
          "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
        ).optional(),
        maxLength: z.string().describe(
          'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
        ).optional(),
        mode: z.string().describe(
          "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
        ).optional(),
        name: z.string().describe(
          "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
        ).optional(),
        policyTags: z.object({
          names: z.unknown().describe(
            'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
          ).optional(),
        }).describe(
          "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
        ).optional(),
        precision: z.string().describe(
          'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
        ).optional(),
        rangeElementType: z.object({
          type: z.unknown().describe(
            "Required. The type of a field element. For more information, see TableFieldSchema.type.",
          ).optional(),
        }).describe("Represents the type of a field element.").optional(),
        roundingMode: z.enum([
          "ROUNDING_MODE_UNSPECIFIED",
          "ROUND_HALF_AWAY_FROM_ZERO",
          "ROUND_HALF_EVEN",
        ]).describe(
          "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
        ).optional(),
        scale: z.string().describe("Optional. See documentation for precision.")
          .optional(),
        timestampPrecision: z.string().describe(
          "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
        ).optional(),
        type: z.string().describe(
          "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
        ).optional(),
      })).describe("Describes the fields in a table.").optional(),
      foreignTypeInfo: z.object({
        typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
          "Required. Specifies the system which defines the foreign data type.",
        ).optional(),
      }).describe(
        "Metadata about the foreign data type definition such as the system in which the type is defined.",
      ).optional(),
    }).describe("Schema of a table").optional(),
    sourceFormat: z.string().describe(
      '[Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". [Beta] For Google Cloud Bigtable, specify "BIGTABLE".',
    ).optional(),
    sourceUris: z.array(z.string()).describe(
      "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
    ).optional(),
    timeFormat: z.string().describe(
      "Optional. Format used to parse TIME values. Supports C-style and SQL-style values.",
    ).optional(),
    timeZone: z.string().describe(
      "Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles).",
    ).optional(),
    timestampFormat: z.string().describe(
      "Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values.",
    ).optional(),
    timestampTargetPrecision: z.array(z.number().int()).describe(
      "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
    ).optional(),
  }).optional(),
  friendlyName: z.string().describe(
    "Optional. A descriptive name for this table.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this table. You can use these to organize and group your tables. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key.",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe(
    "Optional. If set, overrides the default managed table type configured in the dataset.",
  ).optional(),
  materializedView: z.object({
    allowNonIncrementalDefinition: z.boolean().describe(
      "Optional. This option declares the intention to construct a materialized view that isn't refreshed incrementally. Non-incremental materialized views support an expanded range of SQL queries. The `allow_non_incremental_definition` option can't be changed after the materialized view is created.",
    ).optional(),
    enableRefresh: z.boolean().describe(
      'Optional. Enable automatic refresh of the materialized view when the base table is updated. The default value is "true".',
    ).optional(),
    lastRefreshTime: z.string().describe(
      "Output only. The time when this materialized view was last refreshed, in milliseconds since the epoch.",
    ).optional(),
    maxStaleness: z.string().describe(
      "[Optional] Max staleness of data that could be returned when materizlized view is queried (formatted as Google SQL Interval type).",
    ).optional(),
    query: z.string().describe("Required. A query whose results are persisted.")
      .optional(),
    refreshIntervalMs: z.string().describe(
      'Optional. The maximum frequency at which this materialized view will be refreshed. The default value is "1800000" (30 minutes).',
    ).optional(),
  }).describe("Definition and configuration of a materialized view.")
    .optional(),
  materializedViewStatus: z.object({
    lastRefreshStatus: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    refreshWatermark: z.string().describe(
      "Output only. Refresh watermark of materialized view. The base tables' data were collected into the materialized view cache until this time.",
    ).optional(),
  }).describe(
    "Status of a materialized view. The last refresh timestamp status is omitted here, but is present in the MaterializedViewDefinition message.",
  ).optional(),
  maxStaleness: z.string().describe(
    "Optional. The maximum staleness of data that could be returned when the table (or stale MV) is queried. Staleness encoded as a string encoding of sql IntervalValue type.",
  ).optional(),
  model: z.object({
    modelOptions: z.object({
      labels: z.array(z.string()).optional(),
      lossType: z.string().optional(),
      modelType: z.string().optional(),
    }).describe("Deprecated.").optional(),
    trainingRuns: z.array(z.object({
      iterationResults: z.array(z.object({
        durationMs: z.unknown().describe("Deprecated.").optional(),
        evalLoss: z.unknown().describe("Deprecated.").optional(),
        index: z.unknown().describe("Deprecated.").optional(),
        learnRate: z.unknown().describe("Deprecated.").optional(),
        trainingLoss: z.unknown().describe("Deprecated.").optional(),
      })).describe("Deprecated.").optional(),
      startTime: z.string().describe("Deprecated.").optional(),
      state: z.string().describe("Deprecated.").optional(),
      trainingOptions: z.object({
        earlyStop: z.boolean().optional(),
        l1Reg: z.number().optional(),
        l2Reg: z.number().optional(),
        learnRate: z.number().optional(),
        learnRateStrategy: z.string().optional(),
        lineSearchInitLearnRate: z.number().optional(),
        maxIteration: z.string().optional(),
        minRelProgress: z.number().optional(),
        warmStart: z.boolean().optional(),
      }).describe("Deprecated.").optional(),
    })).describe("Deprecated.").optional(),
  }).optional(),
  partitionDefinition: z.object({
    partitionedColumn: z.array(z.object({
      field: z.string().describe("Required. The name of the partition column.")
        .optional(),
    })).describe(
      "Optional. Details about each partitioning column. This field is output only for all partitioning types other than metastore partitioned tables. BigQuery native tables only support 1 partitioning column. Other table types may support 0, 1 or more partitioning columns. For metastore partitioned tables, the order must match the definition order in the Hive Metastore, where it must match the physical layout of the table. For example, CREATE TABLE a_table(id BIGINT, name STRING) PARTITIONED BY (city STRING, state STRING). In this case the values must be ['city', 'state'] in that order.",
    ).optional(),
  }).describe(
    "The partitioning information, which includes managed table, external table and metastore partitioned table partition information.",
  ).optional(),
  rangePartitioning: z.object({
    field: z.string().describe(
      "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
    ).optional(),
    range: z.object({
      end: z.string().describe(
        "[Experimental] The end of range partitioning, exclusive.",
      ).optional(),
      interval: z.string().describe(
        "[Experimental] The width of each interval.",
      ).optional(),
      start: z.string().describe(
        "[Experimental] The start of range partitioning, inclusive.",
      ).optional(),
    }).describe("[Experimental] Defines the ranges for range partitioning.")
      .optional(),
  }).optional(),
  requirePartitionFilter: z.boolean().describe(
    "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified.",
  ).optional(),
  resourceTags: z.record(z.string(), z.string()).describe(
    '[Optional] The tags associated with this table. Tag keys are globally unique. See additional information on [tags](https://cloud.google.com/iam/docs/tags-access-control#definitions). An object containing a list of "key": value pairs. The key is the namespaced friendly name of the tag key, e.g. "12345/environment" where 12345 is parent id. The value is the friendly short name of the tag value, e.g. "production".',
  ).optional(),
  restrictions: z.object({
    type: z.enum(["RESTRICTION_TYPE_UNSPECIFIED", "RESTRICTED_DATA_EGRESS"])
      .describe("Output only. Specifies the type of dataset/table restriction.")
      .optional(),
  }).optional(),
  schema: z.object({
    fields: z.array(z.object({
      categories: z.object({
        names: z.array(z.unknown()).describe("Deprecated.").optional(),
      }).describe("Deprecated.").optional(),
      collation: z.string().describe(
        "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
      ).optional(),
      dataGovernanceTagsInfo: z.object({
        dataGovernanceTags: z.record(z.string(), z.unknown()).describe(
          'Optional. The data governance tags added to this field are used for field-level access control. Only one data governance tag is currently supported on a field. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/pii" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "sensitive". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. For example: "123456789012/pii": "sensitive", "myProject/cost_center": "sales"',
        ).optional(),
      }).describe(
        "Optional. Specifies the data governance tags on this field. This field works with other column-level security fields as follows: - Precedence: If a data governance tag is attached to a column, it takes precedence over the policy tag attached to the column. However, if a data policy is attached to a column, it takes precedence over the data governance tag. - Patching behavior (how this field behaves during a `Table.patch` schema update): - Unset: If the `data_governance_tags_info` field is omitted from the update request, the existing tags on the column are preserved. - Empty Field: To clear data governance tags from a column, send the `data_governance_tags_info` field as an empty object. This will remove all tags from the column. - Updating tags: To replace existing tag, send the field with the new tag.",
      ).optional(),
      dataPolicies: z.array(z.object({
        name: z.unknown().describe(
          "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
        ).optional(),
      })).describe(
        "Optional. Data policies attached to this field, used for field-level access control.",
      ).optional(),
      dataPolicyList: z.object({
        dataPolicies: z.array(z.unknown()).describe(
          "Contains a list of data policy options. At most 9 data policies are allowed per field.",
        ).optional(),
      }).describe(
        "A list of data policy options. For more information, see [Mask data by applying data policies to a column](https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).",
      ).optional(),
      defaultValueExpression: z.string().describe(
        "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
      ).optional(),
      description: z.string().describe(
        "Optional. The field description. The maximum length is 1,024 characters.",
      ).optional(),
      fields: z.array(z.string()).describe(
        "Optional. Describes the nested schema fields if the type property is set to RECORD.",
      ).optional(),
      foreignTypeDefinition: z.string().describe(
        "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
      ).optional(),
      generatedColumn: z.object({
        generatedExpressionInfo: z.object({
          asynchronous: z.unknown().describe(
            "Optional. Whether the column generation is done asynchronously.",
          ).optional(),
          generationExpression: z.unknown().describe(
            "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
          ).optional(),
          stored: z.unknown().describe(
            "Optional. Whether the generated column is stored in the table.",
          ).optional(),
        }).describe("Definition of the expression used to generate the field.")
          .optional(),
        generatedMode: z.enum([
          "GENERATED_MODE_UNSPECIFIED",
          "GENERATED_ALWAYS",
          "GENERATED_BY_DEFAULT",
        ]).describe(
          "Optional. Dictates when system generated values are used to populate the field.",
        ).optional(),
      }).describe(
        "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
      ).optional(),
      maxLength: z.string().describe(
        'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
      ).optional(),
      mode: z.string().describe(
        "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
      ).optional(),
      name: z.string().describe(
        "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
      ).optional(),
      policyTags: z.object({
        names: z.array(z.unknown()).describe(
          'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
        ).optional(),
      }).describe(
        "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
      ).optional(),
      precision: z.string().describe(
        'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
      ).optional(),
      rangeElementType: z.object({
        type: z.string().describe(
          "Required. The type of a field element. For more information, see TableFieldSchema.type.",
        ).optional(),
      }).describe("Represents the type of a field element.").optional(),
      roundingMode: z.enum([
        "ROUNDING_MODE_UNSPECIFIED",
        "ROUND_HALF_AWAY_FROM_ZERO",
        "ROUND_HALF_EVEN",
      ]).describe(
        "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
      ).optional(),
      scale: z.string().describe("Optional. See documentation for precision.")
        .optional(),
      timestampPrecision: z.string().describe(
        "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
      ).optional(),
      type: z.string().describe(
        "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
      ).optional(),
    })).describe("Describes the fields in a table.").optional(),
    foreignTypeInfo: z.object({
      typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
        "Required. Specifies the system which defines the foreign data type.",
      ).optional(),
    }).describe(
      "Metadata about the foreign data type definition such as the system in which the type is defined.",
    ).optional(),
  }).describe("Schema of a table").optional(),
  snapshotDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
    snapshotTime: z.string().describe(
      "Required. The time at which the base table was snapshot. This value is reported in the JSON response using RFC3339 format.",
    ).optional(),
  }).describe("Information about base table and snapshot time of the snapshot.")
    .optional(),
  streamingBuffer: z.object({
    estimatedBytes: z.string().describe(
      "Output only. A lower-bound estimate of the number of bytes currently in the streaming buffer.",
    ).optional(),
    estimatedRows: z.string().describe(
      "Output only. A lower-bound estimate of the number of rows currently in the streaming buffer.",
    ).optional(),
    oldestEntryTime: z.string().describe(
      "Output only. Contains the timestamp of the oldest entry in the streaming buffer, in milliseconds since the epoch, if the streaming buffer is available.",
    ).optional(),
  }).optional(),
  tableConstraints: z.object({
    foreignKeys: z.array(z.object({
      columnReferences: z.array(z.object({
        referencedColumn: z.unknown().describe(
          "Required. The column in the primary key that are referenced by the referencing_column.",
        ).optional(),
        referencingColumn: z.unknown().describe(
          "Required. The column that composes the foreign key.",
        ).optional(),
      })).describe("Required. The columns that compose the foreign key.")
        .optional(),
      name: z.string().describe(
        "Optional. Set only if the foreign key constraint is named.",
      ).optional(),
      referencedTable: z.object({
        datasetId: z.string().optional(),
        projectId: z.string().optional(),
        tableId: z.string().optional(),
      }).optional(),
    })).describe(
      "Optional. Present only if the table has a foreign key. The foreign key is not enforced.",
    ).optional(),
    primaryKey: z.object({
      columns: z.array(z.string()).describe(
        "Required. The columns that are composed of the primary key constraint.",
      ).optional(),
    }).describe("Represents the primary key constraint on a table's columns.")
      .optional(),
  }).describe("The TableConstraints defines the primary key and foreign key.")
    .optional(),
  tableReference: z.object({
    datasetId: z.string().describe(
      "Required. The ID of the dataset containing this table.",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this table.",
    ).optional(),
    tableId: z.string().describe(
      "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
    ).optional(),
  }).optional(),
  tableReplicationInfo: z.object({
    replicatedSourceLastRefreshTime: z.string().describe(
      "Optional. Output only. If source is a materialized view, this field signifies the last refresh time of the source.",
    ).optional(),
    replicationError: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    replicationIntervalMs: z.string().describe(
      "Optional. Specifies the interval at which the source table is polled for updates. It's Optional. If not specified, default replication interval would be applied.",
    ).optional(),
    replicationStatus: z.enum([
      "REPLICATION_STATUS_UNSPECIFIED",
      "ACTIVE",
      "SOURCE_DELETED",
      "PERMISSION_DENIED",
      "UNSUPPORTED_CONFIGURATION",
    ]).describe(
      "Optional. Output only. Replication status of configured replication.",
    ).optional(),
    sourceTable: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
  }).describe(
    "Replication info of a table created using `AS REPLICA` DDL like: `CREATE MATERIALIZED VIEW mv1 AS REPLICA OF src_mv`",
  ).optional(),
  timePartitioning: z.object({
    expirationMs: z.string().describe(
      "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
    ).optional(),
    field: z.string().describe(
      "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
    ).optional(),
    requirePartitionFilter: z.boolean().describe(
      "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
    ).optional(),
    type: z.string().describe(
      "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
    ).optional(),
  }).optional(),
  view: z.object({
    foreignDefinitions: z.array(z.object({
      dialect: z.string().describe(
        "Optional. Represents the dialect of the query.",
      ).optional(),
      query: z.string().describe("Required. The query that defines the view.")
        .optional(),
    })).describe("Optional. Foreign view representations.").optional(),
    privacyPolicy: z.object({
      aggregationThresholdPolicy: z.object({
        privacyUnitColumns: z.array(z.string()).describe(
          'Optional. The privacy unit column(s) associated with this policy. For now, only one column per data source object (table, view) is allowed as a privacy unit column. Representing as a repeated field in metadata for extensibility to multiple columns in future. Duplicates and Repeated struct fields are not allowed. For nested fields, use dot notation ("outer.inner")',
        ).optional(),
        threshold: z.string().describe(
          'Optional. The threshold for the "aggregation threshold" policy.',
        ).optional(),
      }).describe(
        'Represents privacy policy associated with "aggregation threshold" method.',
      ).optional(),
      differentialPrivacyPolicy: z.object({
        deltaBudget: z.number().describe(
          "Optional. The total delta budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of delta that is pre-defined by the contributor through the privacy policy delta_per_query field. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget.",
        ).optional(),
        deltaBudgetRemaining: z.number().describe(
          "Output only. The delta budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase.",
        ).optional(),
        deltaPerQuery: z.number().describe(
          "Optional. The delta value that is used per query. Delta represents the probability that any row will fail to be epsilon differentially private. Indicates the risk associated with exposing aggregate rows in the result of a query.",
        ).optional(),
        epsilonBudget: z.number().describe(
          "Optional. The total epsilon budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of epsilon they request in their query. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget.",
        ).optional(),
        epsilonBudgetRemaining: z.number().describe(
          "Output only. The epsilon budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase.",
        ).optional(),
        maxEpsilonPerQuery: z.number().describe(
          "Optional. The maximum epsilon value that a query can consume. If the subscriber specifies epsilon as a parameter in a SELECT query, it must be less than or equal to this value. The epsilon parameter controls the amount of noise that is added to the groups — a higher epsilon means less noise.",
        ).optional(),
        maxGroupsContributed: z.string().describe(
          "Optional. The maximum groups contributed value that is used per query. Represents the maximum number of groups to which each protected entity can contribute. Changing this value does not improve or worsen privacy. The best value for accuracy and utility depends on the query and data.",
        ).optional(),
        privacyUnitColumn: z.string().describe(
          "Optional. The privacy unit column associated with this policy. Differential privacy policies can only have one privacy unit column per data source object (table, view).",
        ).optional(),
      }).describe(
        'Represents privacy policy associated with "differential privacy" method.',
      ).optional(),
      joinRestrictionPolicy: z.object({
        joinAllowedColumns: z.array(z.string()).describe(
          "Optional. The only columns that joins are allowed on. This field is must be specified for join_conditions JOIN_ANY and JOIN_ALL and it cannot be set for JOIN_BLOCKED.",
        ).optional(),
        joinCondition: z.enum([
          "JOIN_CONDITION_UNSPECIFIED",
          "JOIN_ANY",
          "JOIN_ALL",
          "JOIN_NOT_REQUIRED",
          "JOIN_BLOCKED",
        ]).describe(
          "Optional. Specifies if a join is required or not on queries for the view. Default is JOIN_CONDITION_UNSPECIFIED.",
        ).optional(),
      }).describe(
        "Represents privacy policy associated with \"join restrictions\". Join restriction gives data providers the ability to enforce joins on the 'join_allowed_columns' when data is queried from a privacy protected view.",
      ).optional(),
    }).describe(
      "Represents privacy policy that contains the privacy requirements specified by the data owner. Currently, this is only supported on views.",
    ).optional(),
    query: z.string().describe(
      "Required. A query that BigQuery executes when the view is referenced.",
    ).optional(),
    useExplicitColumnNames: z.boolean().describe(
      "True if the column names are explicitly specified. For example by using the 'CREATE VIEW v(c1, c2) AS...' syntax. Can only be set for GoogleSQL views.",
    ).optional(),
    useLegacySql: z.boolean().describe(
      "Specifies whether to use BigQuery's legacy SQL for this view. The default value is true. If set to false, the view uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). Queries and views that reference this view must use the same flag value. A wrapper is used here because the default value is True.",
    ).optional(),
    userDefinedFunctionResources: z.array(z.object({
      inlineCode: z.string().describe(
        "[Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code.",
      ).optional(),
      resourceUri: z.string().describe(
        "[Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path).",
      ).optional(),
    })).describe("Describes user-defined function resources used in the query.")
      .optional(),
  }).describe("Describes the definition of a logical view.").optional(),
  datasetId: z.string().describe("Required. Dataset ID of the new table"),
});

const StateSchema = z.object({
  biglakeConfiguration: z.object({
    connectionId: z.string(),
    fileFormat: z.string(),
    storageUri: z.string(),
    tableFormat: z.string(),
  }).optional(),
  cloneDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
    cloneTime: z.string(),
  }).optional(),
  clustering: z.object({
    fields: z.array(z.string()),
  }).optional(),
  creationTime: z.string().optional(),
  defaultCollation: z.string().optional(),
  defaultRoundingMode: z.string().optional(),
  description: z.string().optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  expirationTime: z.string().optional(),
  externalCatalogTableOptions: z.object({
    connectionId: z.string(),
    parameters: z.record(z.string(), z.unknown()),
    storageDescriptor: z.object({
      inputFormat: z.string(),
      locationUri: z.string(),
      outputFormat: z.string(),
      serdeInfo: z.object({
        name: z.string(),
        parameters: z.record(z.string(), z.unknown()),
        serializationLibrary: z.string(),
      }),
    }),
  }).optional(),
  externalDataConfiguration: z.object({
    autodetect: z.boolean(),
    avroOptions: z.object({
      useAvroLogicalTypes: z.boolean(),
    }),
    bigtableOptions: z.object({
      columnFamilies: z.array(z.object({
        columns: z.array(z.unknown()),
        encoding: z.string(),
        familyId: z.string(),
        onlyReadLatest: z.boolean(),
        protoConfig: z.object({
          protoMessageName: z.unknown(),
          schemaBundleId: z.unknown(),
        }),
        type: z.string(),
      })),
      ignoreUnspecifiedColumnFamilies: z.boolean(),
      outputColumnFamiliesAsJson: z.boolean(),
      readRowkeyAsString: z.boolean(),
    }),
    compression: z.string(),
    connectionId: z.string(),
    csvOptions: z.object({
      allowJaggedRows: z.boolean(),
      allowQuotedNewlines: z.boolean(),
      encoding: z.string(),
      fieldDelimiter: z.string(),
      nullMarker: z.string(),
      nullMarkers: z.array(z.string()),
      preserveAsciiControlCharacters: z.boolean(),
      quote: z.string(),
      skipLeadingRows: z.string(),
      sourceColumnMatch: z.string(),
    }),
    dateFormat: z.string(),
    datetimeFormat: z.string(),
    decimalTargetTypes: z.array(z.string()),
    fileSetSpecType: z.string(),
    googleSheetsOptions: z.object({
      range: z.string(),
      skipLeadingRows: z.string(),
    }),
    hivePartitioningOptions: z.object({
      fields: z.array(z.string()),
      mode: z.string(),
      requirePartitionFilter: z.boolean(),
      sourceUriPrefix: z.string(),
    }),
    ignoreUnknownValues: z.boolean(),
    jsonExtension: z.string(),
    jsonOptions: z.object({
      encoding: z.string(),
    }),
    maxBadRecords: z.number(),
    metadataCacheMode: z.string(),
    objectMetadata: z.string(),
    parquetOptions: z.object({
      enableListInference: z.boolean(),
      enumAsString: z.boolean(),
      mapTargetType: z.string(),
    }),
    referenceFileSchemaUri: z.string(),
    schema: z.object({
      fields: z.array(z.object({
        categories: z.object({
          names: z.unknown(),
        }),
        collation: z.string(),
        dataGovernanceTagsInfo: z.object({
          dataGovernanceTags: z.unknown(),
        }),
        dataPolicies: z.array(z.unknown()),
        dataPolicyList: z.object({
          dataPolicies: z.unknown(),
        }),
        defaultValueExpression: z.string(),
        description: z.string(),
        fields: z.array(z.unknown()),
        foreignTypeDefinition: z.string(),
        generatedColumn: z.object({
          generatedExpressionInfo: z.unknown(),
          generatedMode: z.unknown(),
        }),
        maxLength: z.string(),
        mode: z.string(),
        name: z.string(),
        policyTags: z.object({
          names: z.unknown(),
        }),
        precision: z.string(),
        rangeElementType: z.object({
          type: z.unknown(),
        }),
        roundingMode: z.string(),
        scale: z.string(),
        timestampPrecision: z.string(),
        type: z.string(),
      })),
      foreignTypeInfo: z.object({
        typeSystem: z.string(),
      }),
    }),
    sourceFormat: z.string(),
    sourceUris: z.array(z.string()),
    timeFormat: z.string(),
    timeZone: z.string(),
    timestampFormat: z.string(),
    timestampTargetPrecision: z.array(z.number()),
  }).optional(),
  friendlyName: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastModifiedTime: z.string().optional(),
  location: z.string().optional(),
  managedTableType: z.string().optional(),
  materializedView: z.object({
    allowNonIncrementalDefinition: z.boolean(),
    enableRefresh: z.boolean(),
    lastRefreshTime: z.string(),
    maxStaleness: z.string(),
    query: z.string(),
    refreshIntervalMs: z.string(),
  }).optional(),
  materializedViewStatus: z.object({
    lastRefreshStatus: z.object({
      debugInfo: z.string(),
      location: z.string(),
      message: z.string(),
      reason: z.string(),
    }),
    refreshWatermark: z.string(),
  }).optional(),
  maxStaleness: z.string().optional(),
  model: z.object({
    modelOptions: z.object({
      labels: z.array(z.string()),
      lossType: z.string(),
      modelType: z.string(),
    }),
    trainingRuns: z.array(z.object({
      iterationResults: z.array(z.object({
        durationMs: z.unknown(),
        evalLoss: z.unknown(),
        index: z.unknown(),
        learnRate: z.unknown(),
        trainingLoss: z.unknown(),
      })),
      startTime: z.string(),
      state: z.string(),
      trainingOptions: z.object({
        earlyStop: z.boolean(),
        l1Reg: z.number(),
        l2Reg: z.number(),
        learnRate: z.number(),
        learnRateStrategy: z.string(),
        lineSearchInitLearnRate: z.number(),
        maxIteration: z.string(),
        minRelProgress: z.number(),
        warmStart: z.boolean(),
      }),
    })),
  }).optional(),
  numActiveLogicalBytes: z.string().optional(),
  numActivePhysicalBytes: z.string().optional(),
  numBytes: z.string().optional(),
  numCurrentPhysicalBytes: z.string().optional(),
  numLongTermBytes: z.string().optional(),
  numLongTermLogicalBytes: z.string().optional(),
  numLongTermPhysicalBytes: z.string().optional(),
  numPartitions: z.string().optional(),
  numPhysicalBytes: z.string().optional(),
  numRows: z.string().optional(),
  numTimeTravelPhysicalBytes: z.string().optional(),
  numTotalLogicalBytes: z.string().optional(),
  numTotalPhysicalBytes: z.string().optional(),
  partitionDefinition: z.object({
    partitionedColumn: z.array(z.object({
      field: z.string(),
    })),
  }).optional(),
  rangePartitioning: z.object({
    field: z.string(),
    range: z.object({
      end: z.string(),
      interval: z.string(),
      start: z.string(),
    }),
  }).optional(),
  replicas: z.array(z.object({
    datasetId: z.string(),
    projectId: z.string(),
    tableId: z.string(),
  })).optional(),
  requirePartitionFilter: z.boolean().optional(),
  resourceTags: z.record(z.string(), z.unknown()).optional(),
  restrictions: z.object({
    type: z.string(),
  }).optional(),
  schema: z.object({
    fields: z.array(z.object({
      categories: z.object({
        names: z.array(z.unknown()),
      }),
      collation: z.string(),
      dataGovernanceTagsInfo: z.object({
        dataGovernanceTags: z.record(z.string(), z.unknown()),
      }),
      dataPolicies: z.array(z.object({
        name: z.unknown(),
      })),
      dataPolicyList: z.object({
        dataPolicies: z.array(z.unknown()),
      }),
      defaultValueExpression: z.string(),
      description: z.string(),
      fields: z.array(z.string()),
      foreignTypeDefinition: z.string(),
      generatedColumn: z.object({
        generatedExpressionInfo: z.object({
          asynchronous: z.unknown(),
          generationExpression: z.unknown(),
          stored: z.unknown(),
        }),
        generatedMode: z.string(),
      }),
      maxLength: z.string(),
      mode: z.string(),
      name: z.string(),
      policyTags: z.object({
        names: z.array(z.unknown()),
      }),
      precision: z.string(),
      rangeElementType: z.object({
        type: z.string(),
      }),
      roundingMode: z.string(),
      scale: z.string(),
      timestampPrecision: z.string(),
      type: z.string(),
    })),
    foreignTypeInfo: z.object({
      typeSystem: z.string(),
    }),
  }).optional(),
  selfLink: z.string().optional(),
  snapshotDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
    snapshotTime: z.string(),
  }).optional(),
  streamingBuffer: z.object({
    estimatedBytes: z.string(),
    estimatedRows: z.string(),
    oldestEntryTime: z.string(),
  }).optional(),
  tableConstraints: z.object({
    foreignKeys: z.array(z.object({
      columnReferences: z.array(z.object({
        referencedColumn: z.unknown(),
        referencingColumn: z.unknown(),
      })),
      name: z.string(),
      referencedTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
    })),
    primaryKey: z.object({
      columns: z.array(z.string()),
    }),
  }).optional(),
  tableReference: z.object({
    datasetId: z.string(),
    projectId: z.string(),
    tableId: z.string(),
  }).optional(),
  tableReplicationInfo: z.object({
    replicatedSourceLastRefreshTime: z.string(),
    replicationError: z.object({
      debugInfo: z.string(),
      location: z.string(),
      message: z.string(),
      reason: z.string(),
    }),
    replicationIntervalMs: z.string(),
    replicationStatus: z.string(),
    sourceTable: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
  }).optional(),
  timePartitioning: z.object({
    expirationMs: z.string(),
    field: z.string(),
    requirePartitionFilter: z.boolean(),
    type: z.string(),
  }).optional(),
  type: z.string().optional(),
  view: z.object({
    foreignDefinitions: z.array(z.object({
      dialect: z.string(),
      query: z.string(),
    })),
    privacyPolicy: z.object({
      aggregationThresholdPolicy: z.object({
        privacyUnitColumns: z.array(z.string()),
        threshold: z.string(),
      }),
      differentialPrivacyPolicy: z.object({
        deltaBudget: z.number(),
        deltaBudgetRemaining: z.number(),
        deltaPerQuery: z.number(),
        epsilonBudget: z.number(),
        epsilonBudgetRemaining: z.number(),
        maxEpsilonPerQuery: z.number(),
        maxGroupsContributed: z.string(),
        privacyUnitColumn: z.string(),
      }),
      joinRestrictionPolicy: z.object({
        joinAllowedColumns: z.array(z.string()),
        joinCondition: z.string(),
      }),
    }),
    query: z.string(),
    useExplicitColumnNames: z.boolean(),
    useLegacySql: z.boolean(),
    userDefinedFunctionResources: z.array(z.object({
      inlineCode: z.string(),
      resourceUri: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  biglakeConfiguration: z.object({
    connectionId: z.string().describe(
      'Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection_id can have the form `{project}.{location}.{connection_id}` or `projects/{project}/locations/{location}/connections/{connection_id}".',
    ).optional(),
    fileFormat: z.enum(["FILE_FORMAT_UNSPECIFIED", "PARQUET"]).describe(
      "Optional. The file format the table data is stored in.",
    ).optional(),
    storageUri: z.string().describe(
      "Optional. The fully qualified location prefix of the external folder where table data is stored. The '*' wildcard character is not allowed. The URI should be in the format `gs://bucket/path_to_table/`",
    ).optional(),
    tableFormat: z.enum(["TABLE_FORMAT_UNSPECIFIED", "ICEBERG"]).describe(
      "Optional. The table format the metadata only snapshots are stored in.",
    ).optional(),
  }).describe(
    "Configuration for BigQuery tables for Apache Iceberg (formerly BigLake managed tables.)",
  ).optional(),
  cloneDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
    cloneTime: z.string().describe(
      "Required. The time at which the base table was cloned. This value is reported in the JSON response using RFC3339 format.",
    ).optional(),
  }).describe("Information about base table and clone time of a table clone.")
    .optional(),
  clustering: z.object({
    fields: z.array(z.string()).describe(
      "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
    ).optional(),
  }).describe("Configures table clustering.").optional(),
  defaultCollation: z.string().describe(
    "Optional. Defines the default collation specification of new STRING fields in the table. During table creation or update, if a STRING field is added to this table without explicit collation specified, then the table inherits the table default collation. A change to this field affects only fields added afterwards, and does not alter the existing fields. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
  ).optional(),
  defaultRoundingMode: z.enum([
    "ROUNDING_MODE_UNSPECIFIED",
    "ROUND_HALF_AWAY_FROM_ZERO",
    "ROUND_HALF_EVEN",
  ]).describe(
    "Optional. Defines the default rounding mode specification of new decimal fields (NUMERIC OR BIGNUMERIC) in the table. During table creation or update, if a decimal field is added to this table without an explicit rounding mode specified, then the field inherits the table default rounding mode. Changing this field doesn't affect existing fields.",
  ).optional(),
  description: z.string().describe(
    "Optional. A user-friendly description of this table.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
    ).optional(),
  }).describe("Configuration for Cloud KMS encryption settings.").optional(),
  expirationTime: z.string().describe(
    "Optional. The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created tables.",
  ).optional(),
  externalCatalogTableOptions: z.object({
    connectionId: z.string().describe(
      "Optional. A connection ID that specifies the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or Amazon S3. This connection is needed to read the open source table from BigQuery. The connection_id format must be either `..` or `projects//locations//connections/`.",
    ).optional(),
    parameters: z.record(z.string(), z.string()).describe(
      "Optional. A map of the key-value pairs defining the parameters and properties of the open source table. Corresponds with Hive metastore table parameters. Maximum size of 4MiB.",
    ).optional(),
    storageDescriptor: z.object({
      inputFormat: z.string().describe(
        'Optional. Specifies the fully qualified class name of the InputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcInputFormat"). The maximum length is 128 characters.',
      ).optional(),
      locationUri: z.string().describe(
        "Optional. The physical location of the table (e.g. `gs://spark-dataproc-data/pangea-data/case_sensitive/` or `gs://spark-dataproc-data/pangea-data/*`). The maximum length is 2056 bytes.",
      ).optional(),
      outputFormat: z.string().describe(
        'Optional. Specifies the fully qualified class name of the OutputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcOutputFormat"). The maximum length is 128 characters.',
      ).optional(),
      serdeInfo: z.object({
        name: z.string().describe(
          "Optional. Name of the SerDe. The maximum length is 256 characters.",
        ).optional(),
        parameters: z.record(z.string(), z.string()).describe(
          "Optional. Key-value pairs that define the initialization parameters for the serialization library. Maximum size 10 Kib.",
        ).optional(),
        serializationLibrary: z.string().describe(
          "Required. Specifies a fully-qualified class name of the serialization library that is responsible for the translation of data between table representation and the underlying low-level input and output format structures. The maximum length is 256 characters.",
        ).optional(),
      }).describe("Serializer and deserializer information.").optional(),
    }).describe(
      "Contains information about how a table's data is stored and accessed by open source query engines.",
    ).optional(),
  }).describe(
    "Metadata about open source compatible table. The fields contained in these options correspond to Hive metastore's table-level properties.",
  ).optional(),
  externalDataConfiguration: z.object({
    autodetect: z.boolean().describe(
      "Try to detect schema and format options automatically. Any option specified explicitly will be honored.",
    ).optional(),
    avroOptions: z.object({
      useAvroLogicalTypes: z.boolean().describe(
        'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
      ).optional(),
    }).describe("Options for external data sources.").optional(),
    bigtableOptions: z.object({
      columnFamilies: z.array(z.object({
        columns: z.array(z.unknown()).describe(
          "Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `.`. Other columns can be accessed as a list through the `.Column` field.",
        ).optional(),
        encoding: z.string().describe(
          "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it.",
        ).optional(),
        familyId: z.string().describe("Identifier of the column family.")
          .optional(),
        onlyReadLatest: z.boolean().describe(
          "Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column.",
        ).optional(),
        protoConfig: z.object({
          protoMessageName: z.unknown().describe(
            'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
          ).optional(),
        }).describe("Information related to a Bigtable protobuf column.")
          .optional(),
        type: z.string().describe(
          "Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it.",
        ).optional(),
      })).describe(
        "Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable.",
      ).optional(),
      ignoreUnspecifiedColumnFamilies: z.boolean().describe(
        "Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false.",
      ).optional(),
      outputColumnFamiliesAsJson: z.boolean().describe(
        "Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false.",
      ).optional(),
      readRowkeyAsString: z.boolean().describe(
        "Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false.",
      ).optional(),
    }).describe("Options specific to Google Cloud Bigtable data sources.")
      .optional(),
    compression: z.string().describe(
      "Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value.",
    ).optional(),
    connectionId: z.string().describe(
      "Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`.",
    ).optional(),
    csvOptions: z.object({
      allowJaggedRows: z.boolean().describe(
        "Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false.",
      ).optional(),
      allowQuotedNewlines: z.boolean().describe(
        "Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
      ).optional(),
      nullMarker: z.string().describe(
        'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
      ).optional(),
      nullMarkers: z.array(z.string()).describe(
        "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
      ).optional(),
      preserveAsciiControlCharacters: z.boolean().describe(
        "Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
      ).optional(),
      quote: z.string().regex(new RegExp(".?")).describe(
        "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote (\"). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '.",
      ).optional(),
      skipLeadingRows: z.string().describe(
        "Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
      sourceColumnMatch: z.string().describe(
        "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema.",
      ).optional(),
    }).describe("Information related to a CSV data source.").optional(),
    dateFormat: z.string().describe(
      "Optional. Format used to parse DATE values. Supports C-style and SQL-style values.",
    ).optional(),
    datetimeFormat: z.string().describe(
      "Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values.",
    ).optional(),
    decimalTargetTypes: z.array(
      z.enum([
        "DECIMAL_TARGET_TYPE_UNSPECIFIED",
        "NUMERIC",
        "BIGNUMERIC",
        "STRING",
      ]),
    ).describe(
      'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
    ).optional(),
    fileSetSpecType: z.enum([
      "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
      "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
    ]).describe(
      "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems.",
    ).optional(),
    googleSheetsOptions: z.object({
      range: z.string().describe(
        "Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20",
      ).optional(),
      skipLeadingRows: z.string().describe(
        "Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
    }).describe("Options specific to Google Sheets data sources.").optional(),
    hivePartitioningOptions: z.object({
      fields: z.array(z.string()).describe(
        "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
      ).optional(),
      mode: z.string().describe(
        "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
      ).optional(),
      requirePartitionFilter: z.boolean().describe(
        "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
      ).optional(),
      sourceUriPrefix: z.string().describe(
        "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
      ).optional(),
    }).describe("Options for configuring hive partitioning detect.").optional(),
    ignoreUnknownValues: z.boolean().describe(
      "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored.",
    ).optional(),
    jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"]).describe(
      "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
    ).optional(),
    jsonOptions: z.object({
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8.",
      ).optional(),
    }).describe("Json Options for load and make external tables.").optional(),
    maxBadRecords: z.number().int().describe(
      "Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats.",
    ).optional(),
    metadataCacheMode: z.enum([
      "METADATA_CACHE_MODE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source.",
    ).optional(),
    objectMetadata: z.enum([
      "OBJECT_METADATA_UNSPECIFIED",
      "DIRECTORY",
      "SIMPLE",
    ]).describe(
      "Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type.",
    ).optional(),
    parquetOptions: z.object({
      enableListInference: z.boolean().describe(
        "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
      ).optional(),
      enumAsString: z.boolean().describe(
        "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
      ).optional(),
      mapTargetType: z.enum(["MAP_TARGET_TYPE_UNSPECIFIED", "ARRAY_OF_STRUCT"])
        .describe(
          "Optional. Indicates how to represent a Parquet map if present.",
        ).optional(),
    }).describe("Parquet Options for load and make external tables.")
      .optional(),
    referenceFileSchemaUri: z.string().describe(
      "Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC.",
    ).optional(),
    schema: z.object({
      fields: z.array(z.object({
        categories: z.object({
          names: z.unknown().describe("Deprecated.").optional(),
        }).describe("Deprecated.").optional(),
        collation: z.string().describe(
          "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
        ).optional(),
        dataGovernanceTagsInfo: z.object({
          dataGovernanceTags: z.unknown().describe(
            'Optional. The data governance tags added to this field are used for field-level access control. Only one data governance tag is currently supported on a field. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/pii" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "sensitive". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. For example: "123456789012/pii": "sensitive", "myProject/cost_center": "sales"',
          ).optional(),
        }).describe(
          "Optional. Specifies the data governance tags on this field. This field works with other column-level security fields as follows: - Precedence: If a data governance tag is attached to a column, it takes precedence over the policy tag attached to the column. However, if a data policy is attached to a column, it takes precedence over the data governance tag. - Patching behavior (how this field behaves during a `Table.patch` schema update): - Unset: If the `data_governance_tags_info` field is omitted from the update request, the existing tags on the column are preserved. - Empty Field: To clear data governance tags from a column, send the `data_governance_tags_info` field as an empty object. This will remove all tags from the column. - Updating tags: To replace existing tag, send the field with the new tag.",
        ).optional(),
        dataPolicies: z.array(z.unknown()).describe(
          "Optional. Data policies attached to this field, used for field-level access control.",
        ).optional(),
        dataPolicyList: z.object({
          dataPolicies: z.unknown().describe(
            "Contains a list of data policy options. At most 9 data policies are allowed per field.",
          ).optional(),
        }).describe(
          "A list of data policy options. For more information, see [Mask data by applying data policies to a column](https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).",
        ).optional(),
        defaultValueExpression: z.string().describe(
          "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
        ).optional(),
        description: z.string().describe(
          "Optional. The field description. The maximum length is 1,024 characters.",
        ).optional(),
        fields: z.array(z.unknown()).describe(
          "Optional. Describes the nested schema fields if the type property is set to RECORD.",
        ).optional(),
        foreignTypeDefinition: z.string().describe(
          "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
        ).optional(),
        generatedColumn: z.object({
          generatedExpressionInfo: z.unknown().describe(
            "Definition of the expression used to generate the field.",
          ).optional(),
          generatedMode: z.unknown().describe(
            "Optional. Dictates when system generated values are used to populate the field.",
          ).optional(),
        }).describe(
          "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
        ).optional(),
        maxLength: z.string().describe(
          'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
        ).optional(),
        mode: z.string().describe(
          "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
        ).optional(),
        name: z.string().describe(
          "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
        ).optional(),
        policyTags: z.object({
          names: z.unknown().describe(
            'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
          ).optional(),
        }).describe(
          "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
        ).optional(),
        precision: z.string().describe(
          'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
        ).optional(),
        rangeElementType: z.object({
          type: z.unknown().describe(
            "Required. The type of a field element. For more information, see TableFieldSchema.type.",
          ).optional(),
        }).describe("Represents the type of a field element.").optional(),
        roundingMode: z.enum([
          "ROUNDING_MODE_UNSPECIFIED",
          "ROUND_HALF_AWAY_FROM_ZERO",
          "ROUND_HALF_EVEN",
        ]).describe(
          "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
        ).optional(),
        scale: z.string().describe("Optional. See documentation for precision.")
          .optional(),
        timestampPrecision: z.string().describe(
          "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
        ).optional(),
        type: z.string().describe(
          "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
        ).optional(),
      })).describe("Describes the fields in a table.").optional(),
      foreignTypeInfo: z.object({
        typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
          "Required. Specifies the system which defines the foreign data type.",
        ).optional(),
      }).describe(
        "Metadata about the foreign data type definition such as the system in which the type is defined.",
      ).optional(),
    }).describe("Schema of a table").optional(),
    sourceFormat: z.string().describe(
      '[Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". [Beta] For Google Cloud Bigtable, specify "BIGTABLE".',
    ).optional(),
    sourceUris: z.array(z.string()).describe(
      "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
    ).optional(),
    timeFormat: z.string().describe(
      "Optional. Format used to parse TIME values. Supports C-style and SQL-style values.",
    ).optional(),
    timeZone: z.string().describe(
      "Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles).",
    ).optional(),
    timestampFormat: z.string().describe(
      "Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values.",
    ).optional(),
    timestampTargetPrecision: z.array(z.number().int()).describe(
      "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
    ).optional(),
  }).optional(),
  friendlyName: z.string().describe(
    "Optional. A descriptive name for this table.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this table. You can use these to organize and group your tables. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key.",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe(
    "Optional. If set, overrides the default managed table type configured in the dataset.",
  ).optional(),
  materializedView: z.object({
    allowNonIncrementalDefinition: z.boolean().describe(
      "Optional. This option declares the intention to construct a materialized view that isn't refreshed incrementally. Non-incremental materialized views support an expanded range of SQL queries. The `allow_non_incremental_definition` option can't be changed after the materialized view is created.",
    ).optional(),
    enableRefresh: z.boolean().describe(
      'Optional. Enable automatic refresh of the materialized view when the base table is updated. The default value is "true".',
    ).optional(),
    lastRefreshTime: z.string().describe(
      "Output only. The time when this materialized view was last refreshed, in milliseconds since the epoch.",
    ).optional(),
    maxStaleness: z.string().describe(
      "[Optional] Max staleness of data that could be returned when materizlized view is queried (formatted as Google SQL Interval type).",
    ).optional(),
    query: z.string().describe("Required. A query whose results are persisted.")
      .optional(),
    refreshIntervalMs: z.string().describe(
      'Optional. The maximum frequency at which this materialized view will be refreshed. The default value is "1800000" (30 minutes).',
    ).optional(),
  }).describe("Definition and configuration of a materialized view.")
    .optional(),
  materializedViewStatus: z.object({
    lastRefreshStatus: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    refreshWatermark: z.string().describe(
      "Output only. Refresh watermark of materialized view. The base tables' data were collected into the materialized view cache until this time.",
    ).optional(),
  }).describe(
    "Status of a materialized view. The last refresh timestamp status is omitted here, but is present in the MaterializedViewDefinition message.",
  ).optional(),
  maxStaleness: z.string().describe(
    "Optional. The maximum staleness of data that could be returned when the table (or stale MV) is queried. Staleness encoded as a string encoding of sql IntervalValue type.",
  ).optional(),
  model: z.object({
    modelOptions: z.object({
      labels: z.array(z.string()).optional(),
      lossType: z.string().optional(),
      modelType: z.string().optional(),
    }).describe("Deprecated.").optional(),
    trainingRuns: z.array(z.object({
      iterationResults: z.array(z.object({
        durationMs: z.unknown().describe("Deprecated.").optional(),
        evalLoss: z.unknown().describe("Deprecated.").optional(),
        index: z.unknown().describe("Deprecated.").optional(),
        learnRate: z.unknown().describe("Deprecated.").optional(),
        trainingLoss: z.unknown().describe("Deprecated.").optional(),
      })).describe("Deprecated.").optional(),
      startTime: z.string().describe("Deprecated.").optional(),
      state: z.string().describe("Deprecated.").optional(),
      trainingOptions: z.object({
        earlyStop: z.boolean().optional(),
        l1Reg: z.number().optional(),
        l2Reg: z.number().optional(),
        learnRate: z.number().optional(),
        learnRateStrategy: z.string().optional(),
        lineSearchInitLearnRate: z.number().optional(),
        maxIteration: z.string().optional(),
        minRelProgress: z.number().optional(),
        warmStart: z.boolean().optional(),
      }).describe("Deprecated.").optional(),
    })).describe("Deprecated.").optional(),
  }).optional(),
  partitionDefinition: z.object({
    partitionedColumn: z.array(z.object({
      field: z.string().describe("Required. The name of the partition column.")
        .optional(),
    })).describe(
      "Optional. Details about each partitioning column. This field is output only for all partitioning types other than metastore partitioned tables. BigQuery native tables only support 1 partitioning column. Other table types may support 0, 1 or more partitioning columns. For metastore partitioned tables, the order must match the definition order in the Hive Metastore, where it must match the physical layout of the table. For example, CREATE TABLE a_table(id BIGINT, name STRING) PARTITIONED BY (city STRING, state STRING). In this case the values must be ['city', 'state'] in that order.",
    ).optional(),
  }).describe(
    "The partitioning information, which includes managed table, external table and metastore partitioned table partition information.",
  ).optional(),
  rangePartitioning: z.object({
    field: z.string().describe(
      "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
    ).optional(),
    range: z.object({
      end: z.string().describe(
        "[Experimental] The end of range partitioning, exclusive.",
      ).optional(),
      interval: z.string().describe(
        "[Experimental] The width of each interval.",
      ).optional(),
      start: z.string().describe(
        "[Experimental] The start of range partitioning, inclusive.",
      ).optional(),
    }).describe("[Experimental] Defines the ranges for range partitioning.")
      .optional(),
  }).optional(),
  requirePartitionFilter: z.boolean().describe(
    "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified.",
  ).optional(),
  resourceTags: z.record(z.string(), z.string()).describe(
    '[Optional] The tags associated with this table. Tag keys are globally unique. See additional information on [tags](https://cloud.google.com/iam/docs/tags-access-control#definitions). An object containing a list of "key": value pairs. The key is the namespaced friendly name of the tag key, e.g. "12345/environment" where 12345 is parent id. The value is the friendly short name of the tag value, e.g. "production".',
  ).optional(),
  restrictions: z.object({
    type: z.enum(["RESTRICTION_TYPE_UNSPECIFIED", "RESTRICTED_DATA_EGRESS"])
      .describe("Output only. Specifies the type of dataset/table restriction.")
      .optional(),
  }).optional(),
  schema: z.object({
    fields: z.array(z.object({
      categories: z.object({
        names: z.array(z.unknown()).describe("Deprecated.").optional(),
      }).describe("Deprecated.").optional(),
      collation: z.string().describe(
        "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
      ).optional(),
      dataGovernanceTagsInfo: z.object({
        dataGovernanceTags: z.record(z.string(), z.unknown()).describe(
          'Optional. The data governance tags added to this field are used for field-level access control. Only one data governance tag is currently supported on a field. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/pii" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "sensitive". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. For example: "123456789012/pii": "sensitive", "myProject/cost_center": "sales"',
        ).optional(),
      }).describe(
        "Optional. Specifies the data governance tags on this field. This field works with other column-level security fields as follows: - Precedence: If a data governance tag is attached to a column, it takes precedence over the policy tag attached to the column. However, if a data policy is attached to a column, it takes precedence over the data governance tag. - Patching behavior (how this field behaves during a `Table.patch` schema update): - Unset: If the `data_governance_tags_info` field is omitted from the update request, the existing tags on the column are preserved. - Empty Field: To clear data governance tags from a column, send the `data_governance_tags_info` field as an empty object. This will remove all tags from the column. - Updating tags: To replace existing tag, send the field with the new tag.",
      ).optional(),
      dataPolicies: z.array(z.object({
        name: z.unknown().describe(
          "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
        ).optional(),
      })).describe(
        "Optional. Data policies attached to this field, used for field-level access control.",
      ).optional(),
      dataPolicyList: z.object({
        dataPolicies: z.array(z.unknown()).describe(
          "Contains a list of data policy options. At most 9 data policies are allowed per field.",
        ).optional(),
      }).describe(
        "A list of data policy options. For more information, see [Mask data by applying data policies to a column](https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).",
      ).optional(),
      defaultValueExpression: z.string().describe(
        "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
      ).optional(),
      description: z.string().describe(
        "Optional. The field description. The maximum length is 1,024 characters.",
      ).optional(),
      fields: z.array(z.string()).describe(
        "Optional. Describes the nested schema fields if the type property is set to RECORD.",
      ).optional(),
      foreignTypeDefinition: z.string().describe(
        "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
      ).optional(),
      generatedColumn: z.object({
        generatedExpressionInfo: z.object({
          asynchronous: z.unknown().describe(
            "Optional. Whether the column generation is done asynchronously.",
          ).optional(),
          generationExpression: z.unknown().describe(
            "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
          ).optional(),
          stored: z.unknown().describe(
            "Optional. Whether the generated column is stored in the table.",
          ).optional(),
        }).describe("Definition of the expression used to generate the field.")
          .optional(),
        generatedMode: z.enum([
          "GENERATED_MODE_UNSPECIFIED",
          "GENERATED_ALWAYS",
          "GENERATED_BY_DEFAULT",
        ]).describe(
          "Optional. Dictates when system generated values are used to populate the field.",
        ).optional(),
      }).describe(
        "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
      ).optional(),
      maxLength: z.string().describe(
        'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
      ).optional(),
      mode: z.string().describe(
        "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
      ).optional(),
      name: z.string().describe(
        "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
      ).optional(),
      policyTags: z.object({
        names: z.array(z.unknown()).describe(
          'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
        ).optional(),
      }).describe(
        "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
      ).optional(),
      precision: z.string().describe(
        'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
      ).optional(),
      rangeElementType: z.object({
        type: z.string().describe(
          "Required. The type of a field element. For more information, see TableFieldSchema.type.",
        ).optional(),
      }).describe("Represents the type of a field element.").optional(),
      roundingMode: z.enum([
        "ROUNDING_MODE_UNSPECIFIED",
        "ROUND_HALF_AWAY_FROM_ZERO",
        "ROUND_HALF_EVEN",
      ]).describe(
        "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
      ).optional(),
      scale: z.string().describe("Optional. See documentation for precision.")
        .optional(),
      timestampPrecision: z.string().describe(
        "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
      ).optional(),
      type: z.string().describe(
        "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
      ).optional(),
    })).describe("Describes the fields in a table.").optional(),
    foreignTypeInfo: z.object({
      typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
        "Required. Specifies the system which defines the foreign data type.",
      ).optional(),
    }).describe(
      "Metadata about the foreign data type definition such as the system in which the type is defined.",
    ).optional(),
  }).describe("Schema of a table").optional(),
  snapshotDefinition: z.object({
    baseTableReference: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
    snapshotTime: z.string().describe(
      "Required. The time at which the base table was snapshot. This value is reported in the JSON response using RFC3339 format.",
    ).optional(),
  }).describe("Information about base table and snapshot time of the snapshot.")
    .optional(),
  streamingBuffer: z.object({
    estimatedBytes: z.string().describe(
      "Output only. A lower-bound estimate of the number of bytes currently in the streaming buffer.",
    ).optional(),
    estimatedRows: z.string().describe(
      "Output only. A lower-bound estimate of the number of rows currently in the streaming buffer.",
    ).optional(),
    oldestEntryTime: z.string().describe(
      "Output only. Contains the timestamp of the oldest entry in the streaming buffer, in milliseconds since the epoch, if the streaming buffer is available.",
    ).optional(),
  }).optional(),
  tableConstraints: z.object({
    foreignKeys: z.array(z.object({
      columnReferences: z.array(z.object({
        referencedColumn: z.unknown().describe(
          "Required. The column in the primary key that are referenced by the referencing_column.",
        ).optional(),
        referencingColumn: z.unknown().describe(
          "Required. The column that composes the foreign key.",
        ).optional(),
      })).describe("Required. The columns that compose the foreign key.")
        .optional(),
      name: z.string().describe(
        "Optional. Set only if the foreign key constraint is named.",
      ).optional(),
      referencedTable: z.object({
        datasetId: z.string().optional(),
        projectId: z.string().optional(),
        tableId: z.string().optional(),
      }).optional(),
    })).describe(
      "Optional. Present only if the table has a foreign key. The foreign key is not enforced.",
    ).optional(),
    primaryKey: z.object({
      columns: z.array(z.string()).describe(
        "Required. The columns that are composed of the primary key constraint.",
      ).optional(),
    }).describe("Represents the primary key constraint on a table's columns.")
      .optional(),
  }).describe("The TableConstraints defines the primary key and foreign key.")
    .optional(),
  tableReference: z.object({
    datasetId: z.string().describe(
      "Required. The ID of the dataset containing this table.",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this table.",
    ).optional(),
    tableId: z.string().describe(
      "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
    ).optional(),
  }).optional(),
  tableReplicationInfo: z.object({
    replicatedSourceLastRefreshTime: z.string().describe(
      "Optional. Output only. If source is a materialized view, this field signifies the last refresh time of the source.",
    ).optional(),
    replicationError: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    replicationIntervalMs: z.string().describe(
      "Optional. Specifies the interval at which the source table is polled for updates. It's Optional. If not specified, default replication interval would be applied.",
    ).optional(),
    replicationStatus: z.enum([
      "REPLICATION_STATUS_UNSPECIFIED",
      "ACTIVE",
      "SOURCE_DELETED",
      "PERMISSION_DENIED",
      "UNSUPPORTED_CONFIGURATION",
    ]).describe(
      "Optional. Output only. Replication status of configured replication.",
    ).optional(),
    sourceTable: z.object({
      datasetId: z.string().describe(
        "Required. The ID of the dataset containing this table.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The ID of the project containing this table.",
      ).optional(),
      tableId: z.string().describe(
        "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
      ).optional(),
    }).optional(),
  }).describe(
    "Replication info of a table created using `AS REPLICA` DDL like: `CREATE MATERIALIZED VIEW mv1 AS REPLICA OF src_mv`",
  ).optional(),
  timePartitioning: z.object({
    expirationMs: z.string().describe(
      "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
    ).optional(),
    field: z.string().describe(
      "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
    ).optional(),
    requirePartitionFilter: z.boolean().describe(
      "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
    ).optional(),
    type: z.string().describe(
      "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
    ).optional(),
  }).optional(),
  view: z.object({
    foreignDefinitions: z.array(z.object({
      dialect: z.string().describe(
        "Optional. Represents the dialect of the query.",
      ).optional(),
      query: z.string().describe("Required. The query that defines the view.")
        .optional(),
    })).describe("Optional. Foreign view representations.").optional(),
    privacyPolicy: z.object({
      aggregationThresholdPolicy: z.object({
        privacyUnitColumns: z.array(z.string()).describe(
          'Optional. The privacy unit column(s) associated with this policy. For now, only one column per data source object (table, view) is allowed as a privacy unit column. Representing as a repeated field in metadata for extensibility to multiple columns in future. Duplicates and Repeated struct fields are not allowed. For nested fields, use dot notation ("outer.inner")',
        ).optional(),
        threshold: z.string().describe(
          'Optional. The threshold for the "aggregation threshold" policy.',
        ).optional(),
      }).describe(
        'Represents privacy policy associated with "aggregation threshold" method.',
      ).optional(),
      differentialPrivacyPolicy: z.object({
        deltaBudget: z.number().describe(
          "Optional. The total delta budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of delta that is pre-defined by the contributor through the privacy policy delta_per_query field. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget.",
        ).optional(),
        deltaBudgetRemaining: z.number().describe(
          "Output only. The delta budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase.",
        ).optional(),
        deltaPerQuery: z.number().describe(
          "Optional. The delta value that is used per query. Delta represents the probability that any row will fail to be epsilon differentially private. Indicates the risk associated with exposing aggregate rows in the result of a query.",
        ).optional(),
        epsilonBudget: z.number().describe(
          "Optional. The total epsilon budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of epsilon they request in their query. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget.",
        ).optional(),
        epsilonBudgetRemaining: z.number().describe(
          "Output only. The epsilon budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase.",
        ).optional(),
        maxEpsilonPerQuery: z.number().describe(
          "Optional. The maximum epsilon value that a query can consume. If the subscriber specifies epsilon as a parameter in a SELECT query, it must be less than or equal to this value. The epsilon parameter controls the amount of noise that is added to the groups — a higher epsilon means less noise.",
        ).optional(),
        maxGroupsContributed: z.string().describe(
          "Optional. The maximum groups contributed value that is used per query. Represents the maximum number of groups to which each protected entity can contribute. Changing this value does not improve or worsen privacy. The best value for accuracy and utility depends on the query and data.",
        ).optional(),
        privacyUnitColumn: z.string().describe(
          "Optional. The privacy unit column associated with this policy. Differential privacy policies can only have one privacy unit column per data source object (table, view).",
        ).optional(),
      }).describe(
        'Represents privacy policy associated with "differential privacy" method.',
      ).optional(),
      joinRestrictionPolicy: z.object({
        joinAllowedColumns: z.array(z.string()).describe(
          "Optional. The only columns that joins are allowed on. This field is must be specified for join_conditions JOIN_ANY and JOIN_ALL and it cannot be set for JOIN_BLOCKED.",
        ).optional(),
        joinCondition: z.enum([
          "JOIN_CONDITION_UNSPECIFIED",
          "JOIN_ANY",
          "JOIN_ALL",
          "JOIN_NOT_REQUIRED",
          "JOIN_BLOCKED",
        ]).describe(
          "Optional. Specifies if a join is required or not on queries for the view. Default is JOIN_CONDITION_UNSPECIFIED.",
        ).optional(),
      }).describe(
        "Represents privacy policy associated with \"join restrictions\". Join restriction gives data providers the ability to enforce joins on the 'join_allowed_columns' when data is queried from a privacy protected view.",
      ).optional(),
    }).describe(
      "Represents privacy policy that contains the privacy requirements specified by the data owner. Currently, this is only supported on views.",
    ).optional(),
    query: z.string().describe(
      "Required. A query that BigQuery executes when the view is referenced.",
    ).optional(),
    useExplicitColumnNames: z.boolean().describe(
      "True if the column names are explicitly specified. For example by using the 'CREATE VIEW v(c1, c2) AS...' syntax. Can only be set for GoogleSQL views.",
    ).optional(),
    useLegacySql: z.boolean().describe(
      "Specifies whether to use BigQuery's legacy SQL for this view. The default value is true. If set to false, the view uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). Queries and views that reference this view must use the same flag value. A wrapper is used here because the default value is True.",
    ).optional(),
    userDefinedFunctionResources: z.array(z.object({
      inlineCode: z.string().describe(
        "[Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code.",
      ).optional(),
      resourceUri: z.string().describe(
        "[Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path).",
      ).optional(),
    })).describe("Describes user-defined function resources used in the query.")
      .optional(),
  }).describe("Describes the definition of a logical view.").optional(),
  datasetId: z.string().describe("Required. Dataset ID of the new table")
    .optional(),
});

/** Swamp extension model for Google Cloud BigQuery Tables. Registered at `@swamp/gcp/bigquery/tables`. */
export const model = {
  type: "@swamp/gcp/bigquery/tables",
  version: "2026.05.22.1",
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
      toVersion: "2026.05.19.3",
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
      toVersion: "2026.05.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Gets the specified table resource by table ID. This method does not return th...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tables",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["biglakeConfiguration"] !== undefined) {
          body["biglakeConfiguration"] = g["biglakeConfiguration"];
        }
        if (g["cloneDefinition"] !== undefined) {
          body["cloneDefinition"] = g["cloneDefinition"];
        }
        if (g["clustering"] !== undefined) body["clustering"] = g["clustering"];
        if (g["defaultCollation"] !== undefined) {
          body["defaultCollation"] = g["defaultCollation"];
        }
        if (g["defaultRoundingMode"] !== undefined) {
          body["defaultRoundingMode"] = g["defaultRoundingMode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionConfiguration"] !== undefined) {
          body["encryptionConfiguration"] = g["encryptionConfiguration"];
        }
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["externalCatalogTableOptions"] !== undefined) {
          body["externalCatalogTableOptions"] =
            g["externalCatalogTableOptions"];
        }
        if (g["externalDataConfiguration"] !== undefined) {
          body["externalDataConfiguration"] = g["externalDataConfiguration"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["materializedView"] !== undefined) {
          body["materializedView"] = g["materializedView"];
        }
        if (g["materializedViewStatus"] !== undefined) {
          body["materializedViewStatus"] = g["materializedViewStatus"];
        }
        if (g["maxStaleness"] !== undefined) {
          body["maxStaleness"] = g["maxStaleness"];
        }
        if (g["model"] !== undefined) body["model"] = g["model"];
        if (g["partitionDefinition"] !== undefined) {
          body["partitionDefinition"] = g["partitionDefinition"];
        }
        if (g["rangePartitioning"] !== undefined) {
          body["rangePartitioning"] = g["rangePartitioning"];
        }
        if (g["requirePartitionFilter"] !== undefined) {
          body["requirePartitionFilter"] = g["requirePartitionFilter"];
        }
        if (g["resourceTags"] !== undefined) {
          body["resourceTags"] = g["resourceTags"];
        }
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
        }
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["snapshotDefinition"] !== undefined) {
          body["snapshotDefinition"] = g["snapshotDefinition"];
        }
        if (g["streamingBuffer"] !== undefined) {
          body["streamingBuffer"] = g["streamingBuffer"];
        }
        if (g["tableConstraints"] !== undefined) {
          body["tableConstraints"] = g["tableConstraints"];
        }
        if (g["tableReference"] !== undefined) {
          body["tableReference"] = g["tableReference"];
        }
        if (g["tableReplicationInfo"] !== undefined) {
          body["tableReplicationInfo"] = g["tableReplicationInfo"];
        }
        if (g["timePartitioning"] !== undefined) {
          body["timePartitioning"] = g["timePartitioning"];
        }
        if (g["view"] !== undefined) body["view"] = g["view"];
        if (g["name"] !== undefined) params["tableId"] = String(g["name"]);
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
              "projectId": projectId,
              "datasetId": String(g["datasetId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a tables",
      arguments: z.object({
        identifier: z.string().describe("The name of the tables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        params["tableId"] = args.identifier;
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
      description: "Update tables attributes",
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
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        } else if (existing["datasetId"]) {
          params["datasetId"] = String(existing["datasetId"]);
        }
        params["tableId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["biglakeConfiguration"] !== undefined) {
          body["biglakeConfiguration"] = g["biglakeConfiguration"];
        }
        if (g["cloneDefinition"] !== undefined) {
          body["cloneDefinition"] = g["cloneDefinition"];
        }
        if (g["clustering"] !== undefined) body["clustering"] = g["clustering"];
        if (g["defaultCollation"] !== undefined) {
          body["defaultCollation"] = g["defaultCollation"];
        }
        if (g["defaultRoundingMode"] !== undefined) {
          body["defaultRoundingMode"] = g["defaultRoundingMode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionConfiguration"] !== undefined) {
          body["encryptionConfiguration"] = g["encryptionConfiguration"];
        }
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["externalCatalogTableOptions"] !== undefined) {
          body["externalCatalogTableOptions"] =
            g["externalCatalogTableOptions"];
        }
        if (g["externalDataConfiguration"] !== undefined) {
          body["externalDataConfiguration"] = g["externalDataConfiguration"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["materializedView"] !== undefined) {
          body["materializedView"] = g["materializedView"];
        }
        if (g["materializedViewStatus"] !== undefined) {
          body["materializedViewStatus"] = g["materializedViewStatus"];
        }
        if (g["maxStaleness"] !== undefined) {
          body["maxStaleness"] = g["maxStaleness"];
        }
        if (g["model"] !== undefined) body["model"] = g["model"];
        if (g["partitionDefinition"] !== undefined) {
          body["partitionDefinition"] = g["partitionDefinition"];
        }
        if (g["rangePartitioning"] !== undefined) {
          body["rangePartitioning"] = g["rangePartitioning"];
        }
        if (g["requirePartitionFilter"] !== undefined) {
          body["requirePartitionFilter"] = g["requirePartitionFilter"];
        }
        if (g["resourceTags"] !== undefined) {
          body["resourceTags"] = g["resourceTags"];
        }
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
        }
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["snapshotDefinition"] !== undefined) {
          body["snapshotDefinition"] = g["snapshotDefinition"];
        }
        if (g["streamingBuffer"] !== undefined) {
          body["streamingBuffer"] = g["streamingBuffer"];
        }
        if (g["tableConstraints"] !== undefined) {
          body["tableConstraints"] = g["tableConstraints"];
        }
        if (g["tableReference"] !== undefined) {
          body["tableReference"] = g["tableReference"];
        }
        if (g["tableReplicationInfo"] !== undefined) {
          body["tableReplicationInfo"] = g["tableReplicationInfo"];
        }
        if (g["timePartitioning"] !== undefined) {
          body["timePartitioning"] = g["timePartitioning"];
        }
        if (g["view"] !== undefined) body["view"] = g["view"];
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
          UPDATE_CONFIG,
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
      description: "Delete the tables",
      arguments: z.object({
        identifier: z.string().describe("The name of the tables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        params["tableId"] = args.identifier;
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
      description: "Sync tables state from GCP",
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
          if (g["datasetId"] !== undefined) {
            params["datasetId"] = String(g["datasetId"]);
          } else if (existing["datasetId"]) {
            params["datasetId"] = String(existing["datasetId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["tableId"] = identifier;
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
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
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.tables.getIamPolicy",
            "path": "{+resource}:getIamPolicy",
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
            "id": "bigquery.tables.setIamPolicy",
            "path": "{+resource}:setIamPolicy",
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
            "id": "bigquery.tables.testIamPermissions",
            "path": "{+resource}:testIamPermissions",
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
  },
};
