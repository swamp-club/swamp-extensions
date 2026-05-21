// Auto-generated extension model for @swamp/gcp/bigtableadmin/instances-tables
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bigtable Admin Instances.Tables.
 *
 * A collection of user data indexed by row, column, and timestamp. Each table is served using the resources of its parent cluster.
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
  return `${parent}/tables/${shortName}`;
}

const BASE_URL = "https://bigtableadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "bigtableadmin.projects.instances.tables.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigtableadmin.projects.instances.tables.create",
  "path": "v2/{+parent}/tables",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigtableadmin.projects.instances.tables.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "ignoreWarnings": {
      "location": "query",
    },
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
  "id": "bigtableadmin.projects.instances.tables.delete",
  "path": "v2/{+name}",
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

const LIST_CONFIG = {
  "id": "bigtableadmin.projects.instances.tables.list",
  "path": "v2/{+parent}/tables",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  initialSplits: z.array(z.object({
    key: z.string().describe("Row key to use as an initial tablet boundary.")
      .optional(),
  })).describe(
    'The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2,)`. Example: * Row keys:= `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` * initial_split_keys:= `["apple", "customer_1", "customer_2", "other"]` * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other,) => {"other", "zz"}.`',
  ).optional(),
  table: z.object({
    automatedBackupPolicy: z.object({
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe("Defines an automated backup policy for a table").optional(),
    changeStreamConfig: z.object({
      retentionPeriod: z.string().describe(
        "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
      ).optional(),
    }).describe("Change stream configuration.").optional(),
    clusterStates: z.record(
      z.string(),
      z.object({
        encryptionInfo: z.array(z.object({
          encryptionStatus: z.unknown().describe(
            "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
          ).optional(),
          encryptionType: z.unknown().describe(
            "Output only. The type of encryption used to protect this resource.",
          ).optional(),
          kmsKeyVersion: z.unknown().describe(
            "Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table.",
          ).optional(),
        })).describe(
          "Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS.",
        ).optional(),
        replicationState: z.enum([
          "STATE_NOT_KNOWN",
          "INITIALIZING",
          "PLANNED_MAINTENANCE",
          "UNPLANNED_MAINTENANCE",
          "READY",
          "READY_OPTIMIZING",
        ]).describe(
          "Output only. The state of replication for the table in this cluster.",
        ).optional(),
      }),
    ).describe(
      "Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL`",
    ).optional(),
    columnFamilies: z.record(
      z.string(),
      z.object({
        gcRule: z.object({
          intersection: z.object({
            rules: z.unknown().describe(
              "Only delete cells which would be deleted by every element of `rules`.",
            ).optional(),
          }).describe(
            "A GcRule which deletes cells matching all of the given rules.",
          ).optional(),
          maxAge: z.string().describe(
            "Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity.",
          ).optional(),
          maxNumVersions: z.number().int().describe(
            "Delete all cells in a column except the most recent N.",
          ).optional(),
          union: z.object({
            rules: z.unknown().describe(
              "Delete cells which would be deleted by any element of `rules`.",
            ).optional(),
          }).describe(
            "A GcRule which deletes cells matching any of the given rules.",
          ).optional(),
        }).describe(
          "Rule for determining which cells to delete during garbage collection.",
        ).optional(),
        stats: z.object({
          averageCellsPerColumn: z.number().describe(
            'How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field.',
          ).optional(),
          averageColumnsPerRow: z.number().describe(
            'How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: * A row with cells in "family:col" and "other:col" (1 column in "family") * A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") * A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field.',
          ).optional(),
          logicalDataBytes: z.string().describe(
            "How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out).",
          ).optional(),
        }).describe(
          "Approximate statistics related to a single column family within a table. This information may change rapidly, interpreting these values at a point in time may already preset out-of-date information. Everything below is approximate, unless otherwise specified.",
        ).optional(),
        valueType: z.object({
          aggregateType: z.object({
            hllppUniqueCount: z.unknown().describe(
              "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
            ).optional(),
            inputType: z.unknown().describe("Circular reference to Type")
              .optional(),
            max: z.unknown().describe(
              "Computes the max of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
            min: z.unknown().describe(
              "Computes the min of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
            stateType: z.unknown().describe("Circular reference to Type")
              .optional(),
            sum: z.unknown().describe(
              "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
          }).describe(
            "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
          ).optional(),
          arrayType: z.object({
            elementType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe(
            "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
          ).optional(),
          boolType: z.object({
            encoding: z.unknown().describe(
              "Defines rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "bool Values of type `Bool` are stored in `Value.bool_value`.",
          ).optional(),
          bytesType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
          ).optional(),
          dateType: z.object({}).describe(
            "Date Values of type `Date` are stored in `Value.date_value`.",
          ).optional(),
          enumType: z.object({
            enumName: z.unknown().describe(
              'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this enum is defined in.",
            ).optional(),
          }).describe(
            "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
          ).optional(),
          float32Type: z.object({}).describe(
            "Float32 Values of type `Float32` are stored in `Value.float_value`.",
          ).optional(),
          float64Type: z.object({}).describe(
            "Float64 Values of type `Float64` are stored in `Value.float_value`.",
          ).optional(),
          geographyType: z.object({}).describe(
            "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
          ).optional(),
          int32Type: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Int32 Values of type `Int32` are stored in `Value.int_value`.",
          ).optional(),
          int64Type: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Int64 Values of type `Int64` are stored in `Value.int_value`.",
          ).optional(),
          mapType: z.object({
            keyType: z.unknown().describe("Circular reference to Type")
              .optional(),
            valueType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe(
            "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
          ).optional(),
          protoType: z.object({
            messageName: z.unknown().describe(
              'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this proto is defined in.",
            ).optional(),
          }).describe(
            "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
          ).optional(),
          stringType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "String Values of type `String` are stored in `Value.string_value`.",
          ).optional(),
          structType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
            fields: z.unknown().describe(
              "The names and types of the fields in this struct.",
            ).optional(),
          }).describe(
            "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
          ).optional(),
          timestampType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
          ).optional(),
        }).describe(
          '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
        ).optional(),
      }),
    ).describe(
      "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    deletionProtection: z.boolean().describe(
      "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
    ).optional(),
    granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS"])
      .describe(
        "Immutable. The granularity at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`.",
      ).optional(),
    name: z.string().describe(
      "The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    restoreInfo: z.object({
      backupInfo: z.object({
        backup: z.string().describe("Output only. Name of the backup.")
          .optional(),
        endTime: z.string().describe(
          "Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp.",
        ).optional(),
        sourceBackup: z.string().describe(
          "Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/",
        ).optional(),
        sourceTable: z.string().describe(
          "Output only. Name of the table the backup was created from.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp.",
        ).optional(),
      }).describe("Information about a backup.").optional(),
      sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"])
        .describe("The type of the restore source.").optional(),
    }).describe("Information about a table restore.").optional(),
    rowKeySchema: z.object({
      encoding: z.object({
        delimitedBytes: z.object({
          delimiter: z.string().describe(
            "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
          ).optional(),
        }).describe(
          "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
        ).optional(),
        orderedCodeBytes: z.object({}).describe(
          'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
        ).optional(),
        singleton: z.object({}).describe(
          "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
        ).optional(),
      }).describe("Rules used to convert to or from lower level types.")
        .optional(),
      fields: z.array(z.object({
        fieldName: z.string().describe(
          "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
        ).optional(),
        type: z.object({
          aggregateType: z.unknown().describe(
            "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
          ).optional(),
          arrayType: z.unknown().describe(
            "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
          ).optional(),
          boolType: z.unknown().describe(
            "bool Values of type `Bool` are stored in `Value.bool_value`.",
          ).optional(),
          bytesType: z.unknown().describe(
            "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
          ).optional(),
          dateType: z.unknown().describe(
            "Date Values of type `Date` are stored in `Value.date_value`.",
          ).optional(),
          enumType: z.unknown().describe(
            "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
          ).optional(),
          float32Type: z.unknown().describe(
            "Float32 Values of type `Float32` are stored in `Value.float_value`.",
          ).optional(),
          float64Type: z.unknown().describe(
            "Float64 Values of type `Float64` are stored in `Value.float_value`.",
          ).optional(),
          geographyType: z.unknown().describe(
            "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
          ).optional(),
          int32Type: z.unknown().describe(
            "Int32 Values of type `Int32` are stored in `Value.int_value`.",
          ).optional(),
          int64Type: z.unknown().describe(
            "Int64 Values of type `Int64` are stored in `Value.int_value`.",
          ).optional(),
          mapType: z.unknown().describe(
            "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
          ).optional(),
          protoType: z.unknown().describe(
            "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
          ).optional(),
          stringType: z.unknown().describe(
            "String Values of type `String` are stored in `Value.string_value`.",
          ).optional(),
          structType: z.unknown().describe(
            "Circular reference to GoogleBigtableAdminV2TypeStruct",
          ).optional(),
          timestampType: z.unknown().describe(
            "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
          ).optional(),
        }).describe(
          '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
        ).optional(),
      })).describe("The names and types of the fields in this struct.")
        .optional(),
    }).describe(
      "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
    ).optional(),
    stats: z.object({
      averageCellsPerColumn: z.number().describe(
        'How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field.',
      ).optional(),
      averageColumnsPerRow: z.number().describe(
        'How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: * A row with cells in "family:col" and "other:col" (2 distinct columns) * A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field.',
      ).optional(),
      logicalDataBytes: z.string().describe(
        "This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out).",
      ).optional(),
      rowCount: z.string().describe("How many rows are in the table.")
        .optional(),
    }).describe(
      "Approximate statistics related to a table. These statistics are calculated infrequently, while simultaneously, data in the table can change rapidly. Thus the values reported here (e.g. row count) are very likely out-of date, even the instant they are received in this API. Thus, only treat these values as approximate. IMPORTANT: Everything below is approximate, unless otherwise specified.",
    ).optional(),
    tieredStorageConfig: z.object({
      infrequentAccess: z.object({
        includeIfOlderThan: z.string().describe(
          "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
        ).optional(),
      }).describe("Rule to specify what data is stored in a storage tier.")
        .optional(),
    }).describe(
      "Config for tiered storage. A valid config must have a valid TieredStorageRule. Otherwise the whole TieredStorageConfig must be unset. By default all data is stored in the SSD tier (only SSD instances can configure tiered storage).",
    ).optional(),
  }).describe(
    "A collection of user data indexed by row, column, and timestamp. Each table is served using the resources of its parent cluster.",
  ).optional(),
  tableId: z.string().describe(
    "Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters.",
  ).optional(),
  automatedBackupPolicy: z.object({
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe("Defines an automated backup policy for a table").optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string().describe(
      "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
    ).optional(),
  }).describe("Change stream configuration.").optional(),
  clusterStates: z.record(
    z.string(),
    z.object({
      encryptionInfo: z.array(z.object({
        encryptionStatus: z.object({
          code: z.unknown().describe(
            "The status code, which should be an enum value of google.rpc.Code.",
          ).optional(),
          details: z.unknown().describe(
            "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
          ).optional(),
          message: z.unknown().describe(
            "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
          ).optional(),
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        encryptionType: z.enum([
          "ENCRYPTION_TYPE_UNSPECIFIED",
          "GOOGLE_DEFAULT_ENCRYPTION",
          "CUSTOMER_MANAGED_ENCRYPTION",
        ]).describe(
          "Output only. The type of encryption used to protect this resource.",
        ).optional(),
        kmsKeyVersion: z.string().describe(
          "Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table.",
        ).optional(),
      })).describe(
        "Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS.",
      ).optional(),
      replicationState: z.enum([
        "STATE_NOT_KNOWN",
        "INITIALIZING",
        "PLANNED_MAINTENANCE",
        "UNPLANNED_MAINTENANCE",
        "READY",
        "READY_OPTIMIZING",
      ]).describe(
        "Output only. The state of replication for the table in this cluster.",
      ).optional(),
    }),
  ).describe(
    "Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL`",
  ).optional(),
  columnFamilies: z.record(
    z.string(),
    z.object({
      gcRule: z.object({
        intersection: z.object({
          rules: z.array(z.unknown()).describe(
            "Only delete cells which would be deleted by every element of `rules`.",
          ).optional(),
        }).describe(
          "A GcRule which deletes cells matching all of the given rules.",
        ).optional(),
        maxAge: z.string().describe(
          "Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity.",
        ).optional(),
        maxNumVersions: z.number().int().describe(
          "Delete all cells in a column except the most recent N.",
        ).optional(),
        union: z.object({
          rules: z.array(z.unknown()).describe(
            "Delete cells which would be deleted by any element of `rules`.",
          ).optional(),
        }).describe(
          "A GcRule which deletes cells matching any of the given rules.",
        ).optional(),
      }).describe(
        "Rule for determining which cells to delete during garbage collection.",
      ).optional(),
      stats: z.object({
        averageCellsPerColumn: z.number().describe(
          'How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field.',
        ).optional(),
        averageColumnsPerRow: z.number().describe(
          'How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: * A row with cells in "family:col" and "other:col" (1 column in "family") * A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") * A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field.',
        ).optional(),
        logicalDataBytes: z.string().describe(
          "How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out).",
        ).optional(),
      }).describe(
        "Approximate statistics related to a single column family within a table. This information may change rapidly, interpreting these values at a point in time may already preset out-of-date information. Everything below is approximate, unless otherwise specified.",
      ).optional(),
      valueType: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.object({}).describe(
            "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
          ).optional(),
          inputType: z.string().describe("Circular reference to Type")
            .optional(),
          max: z.object({}).describe(
            "Computes the max of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          min: z.object({}).describe(
            "Computes the min of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          stateType: z.string().describe("Circular reference to Type")
            .optional(),
          sum: z.object({}).describe(
            "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
        }).describe(
          "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
        ).optional(),
        arrayType: z.object({
          elementType: z.string().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
        ).optional(),
        boolType: z.object({
          encoding: z.object({}).describe(
            "Defines rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "bool Values of type `Bool` are stored in `Value.bool_value`.",
        ).optional(),
        bytesType: z.object({
          encoding: z.object({
            raw: z.unknown().describe(
              "Leaves the value as-is. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
        ).optional(),
        dateType: z.object({}).describe(
          "Date Values of type `Date` are stored in `Value.date_value`.",
        ).optional(),
        enumType: z.object({
          enumName: z.string().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe(
          "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
        ).optional(),
        float32Type: z.object({}).describe(
          "Float32 Values of type `Float32` are stored in `Value.float_value`.",
        ).optional(),
        float64Type: z.object({}).describe(
          "Float64 Values of type `Float64` are stored in `Value.float_value`.",
        ).optional(),
        geographyType: z.object({}).describe(
          "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
        ).optional(),
        int32Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Encodes the value as a 4-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putInt()` with `ByteOrder.BIG_ENDIAN`",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Encodes the value in a variable length binary format of up to 5 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Int32 Values of type `Int32` are stored in `Value.int_value`.",
        ).optional(),
        int64Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Encodes the value as an 8-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putLong()` with `ByteOrder.BIG_ENDIAN`",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Encodes the value in a variable length binary format of up to 10 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Int64 Values of type `Int64` are stored in `Value.int_value`.",
        ).optional(),
        mapType: z.object({
          keyType: z.string().describe("Circular reference to Type").optional(),
          valueType: z.string().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
        ).optional(),
        protoType: z.object({
          messageName: z.string().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe(
          "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
        ).optional(),
        stringType: z.object({
          encoding: z.object({
            utf8Bytes: z.unknown().describe(
              "UTF-8 encoding. Sorted mode: - All values are supported. - Code point order is preserved. Distinct mode: all values are supported. Compatible with: - BigQuery `TEXT` encoding - HBase `Bytes.toBytes` - Java `String#getBytes(StandardCharsets.UTF_8)`",
            ).optional(),
            utf8Raw: z.unknown().describe(
              "Deprecated: prefer the equivalent `Utf8Bytes`.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "String Values of type `String` are stored in `Value.string_value`.",
        ).optional(),
        structType: z.object({
          encoding: z.object({
            delimitedBytes: z.unknown().describe(
              "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
            ).optional(),
            singleton: z.unknown().describe(
              "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
          fields: z.array(z.unknown()).describe(
            "The names and types of the fields in this struct.",
          ).optional(),
        }).describe(
          "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
        ).optional(),
        timestampType: z.object({
          encoding: z.object({
            unixMicrosInt64: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
        ).optional(),
      }).describe(
        '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
      ).optional(),
    }),
  ).describe(
    "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  deletionProtection: z.boolean().describe(
    "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
  ).optional(),
  granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS"]).describe(
    "Immutable. The granularity at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string().describe("Output only. Name of the backup.")
        .optional(),
      endTime: z.string().describe(
        "Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp.",
      ).optional(),
      sourceBackup: z.string().describe(
        "Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/",
      ).optional(),
      sourceTable: z.string().describe(
        "Output only. Name of the table the backup was created from.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp.",
      ).optional(),
    }).describe("Information about a backup.").optional(),
    sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe("Information about a table restore.").optional(),
  rowKeySchema: z.object({
    encoding: z.object({
      delimitedBytes: z.object({
        delimiter: z.string().describe(
          "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
        ).optional(),
      }).describe(
        "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
      ).optional(),
      orderedCodeBytes: z.object({}).describe(
        'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
      ).optional(),
      singleton: z.object({}).describe(
        "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
      ).optional(),
    }).describe("Rules used to convert to or from lower level types.")
      .optional(),
    fields: z.array(z.object({
      fieldName: z.string().describe(
        "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
      ).optional(),
      type: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.unknown().describe(
            "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
          ).optional(),
          inputType: z.unknown().describe("Circular reference to Type")
            .optional(),
          max: z.unknown().describe(
            "Computes the max of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          min: z.unknown().describe(
            "Computes the min of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          stateType: z.unknown().describe("Circular reference to Type")
            .optional(),
          sum: z.unknown().describe(
            "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
        }).describe(
          "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
        ).optional(),
        arrayType: z.object({
          elementType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
        ).optional(),
        boolType: z.object({
          encoding: z.unknown().describe(
            "Defines rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "bool Values of type `Bool` are stored in `Value.bool_value`.",
        ).optional(),
        bytesType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
        ).optional(),
        dateType: z.object({}).describe(
          "Date Values of type `Date` are stored in `Value.date_value`.",
        ).optional(),
        enumType: z.object({
          enumName: z.unknown().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe(
          "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
        ).optional(),
        float32Type: z.object({}).describe(
          "Float32 Values of type `Float32` are stored in `Value.float_value`.",
        ).optional(),
        float64Type: z.object({}).describe(
          "Float64 Values of type `Float64` are stored in `Value.float_value`.",
        ).optional(),
        geographyType: z.object({}).describe(
          "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
        ).optional(),
        int32Type: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Int32 Values of type `Int32` are stored in `Value.int_value`.",
        ).optional(),
        int64Type: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Int64 Values of type `Int64` are stored in `Value.int_value`.",
        ).optional(),
        mapType: z.object({
          keyType: z.unknown().describe("Circular reference to Type")
            .optional(),
          valueType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
        ).optional(),
        protoType: z.object({
          messageName: z.unknown().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe(
          "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
        ).optional(),
        stringType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "String Values of type `String` are stored in `Value.string_value`.",
        ).optional(),
        structType: z.string().describe(
          "Circular reference to GoogleBigtableAdminV2TypeStruct",
        ).optional(),
        timestampType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
        ).optional(),
      }).describe(
        '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
      ).optional(),
    })).describe("The names and types of the fields in this struct.")
      .optional(),
  }).describe(
    "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
  ).optional(),
  stats: z.object({
    averageCellsPerColumn: z.number().describe(
      'How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field.',
    ).optional(),
    averageColumnsPerRow: z.number().describe(
      'How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: * A row with cells in "family:col" and "other:col" (2 distinct columns) * A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field.',
    ).optional(),
    logicalDataBytes: z.string().describe(
      "This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out).",
    ).optional(),
    rowCount: z.string().describe("How many rows are in the table.").optional(),
  }).describe(
    "Approximate statistics related to a table. These statistics are calculated infrequently, while simultaneously, data in the table can change rapidly. Thus the values reported here (e.g. row count) are very likely out-of date, even the instant they are received in this API. Thus, only treat these values as approximate. IMPORTANT: Everything below is approximate, unless otherwise specified.",
  ).optional(),
  tieredStorageConfig: z.object({
    infrequentAccess: z.object({
      includeIfOlderThan: z.string().describe(
        "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
      ).optional(),
    }).describe("Rule to specify what data is stored in a storage tier.")
      .optional(),
  }).describe(
    "Config for tiered storage. A valid config must have a valid TieredStorageRule. Otherwise the whole TieredStorageConfig must be unset. By default all data is stored in the SSD tier (only SSD instances can configure tiered storage).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  automatedBackupPolicy: z.object({
    frequency: z.string(),
    locations: z.array(z.string()),
    retentionPeriod: z.string(),
  }).optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string(),
  }).optional(),
  clusterStates: z.record(z.string(), z.unknown()).optional(),
  columnFamilies: z.record(z.string(), z.unknown()).optional(),
  deletionProtection: z.boolean().optional(),
  granularity: z.string().optional(),
  name: z.string(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string(),
      endTime: z.string(),
      sourceBackup: z.string(),
      sourceTable: z.string(),
      startTime: z.string(),
    }),
    sourceType: z.string(),
  }).optional(),
  rowKeySchema: z.object({
    encoding: z.object({
      delimitedBytes: z.object({
        delimiter: z.string(),
      }),
      orderedCodeBytes: z.object({}),
      singleton: z.object({}),
    }),
    fields: z.array(z.object({
      fieldName: z.string(),
      type: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.unknown(),
          inputType: z.unknown(),
          max: z.unknown(),
          min: z.unknown(),
          stateType: z.unknown(),
          sum: z.unknown(),
        }),
        arrayType: z.object({
          elementType: z.unknown(),
        }),
        boolType: z.object({
          encoding: z.unknown(),
        }),
        bytesType: z.object({
          encoding: z.unknown(),
        }),
        dateType: z.object({}),
        enumType: z.object({
          enumName: z.unknown(),
          schemaBundleId: z.unknown(),
        }),
        float32Type: z.object({}),
        float64Type: z.object({}),
        geographyType: z.object({}),
        int32Type: z.object({
          encoding: z.unknown(),
        }),
        int64Type: z.object({
          encoding: z.unknown(),
        }),
        mapType: z.object({
          keyType: z.unknown(),
          valueType: z.unknown(),
        }),
        protoType: z.object({
          messageName: z.unknown(),
          schemaBundleId: z.unknown(),
        }),
        stringType: z.object({
          encoding: z.unknown(),
        }),
        structType: z.string(),
        timestampType: z.object({
          encoding: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  stats: z.object({
    averageCellsPerColumn: z.number(),
    averageColumnsPerRow: z.number(),
    logicalDataBytes: z.string(),
    rowCount: z.string(),
  }).optional(),
  tieredStorageConfig: z.object({
    infrequentAccess: z.object({
      includeIfOlderThan: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  initialSplits: z.array(z.object({
    key: z.string().describe("Row key to use as an initial tablet boundary.")
      .optional(),
  })).describe(
    'The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2,)`. Example: * Row keys:= `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` * initial_split_keys:= `["apple", "customer_1", "customer_2", "other"]` * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other,) => {"other", "zz"}.`',
  ).optional(),
  table: z.object({
    automatedBackupPolicy: z.object({
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe("Defines an automated backup policy for a table").optional(),
    changeStreamConfig: z.object({
      retentionPeriod: z.string().describe(
        "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
      ).optional(),
    }).describe("Change stream configuration.").optional(),
    clusterStates: z.record(
      z.string(),
      z.object({
        encryptionInfo: z.array(z.object({
          encryptionStatus: z.unknown().describe(
            "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
          ).optional(),
          encryptionType: z.unknown().describe(
            "Output only. The type of encryption used to protect this resource.",
          ).optional(),
          kmsKeyVersion: z.unknown().describe(
            "Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table.",
          ).optional(),
        })).describe(
          "Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS.",
        ).optional(),
        replicationState: z.enum([
          "STATE_NOT_KNOWN",
          "INITIALIZING",
          "PLANNED_MAINTENANCE",
          "UNPLANNED_MAINTENANCE",
          "READY",
          "READY_OPTIMIZING",
        ]).describe(
          "Output only. The state of replication for the table in this cluster.",
        ).optional(),
      }),
    ).describe(
      "Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL`",
    ).optional(),
    columnFamilies: z.record(
      z.string(),
      z.object({
        gcRule: z.object({
          intersection: z.object({
            rules: z.unknown().describe(
              "Only delete cells which would be deleted by every element of `rules`.",
            ).optional(),
          }).describe(
            "A GcRule which deletes cells matching all of the given rules.",
          ).optional(),
          maxAge: z.string().describe(
            "Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity.",
          ).optional(),
          maxNumVersions: z.number().int().describe(
            "Delete all cells in a column except the most recent N.",
          ).optional(),
          union: z.object({
            rules: z.unknown().describe(
              "Delete cells which would be deleted by any element of `rules`.",
            ).optional(),
          }).describe(
            "A GcRule which deletes cells matching any of the given rules.",
          ).optional(),
        }).describe(
          "Rule for determining which cells to delete during garbage collection.",
        ).optional(),
        stats: z.object({
          averageCellsPerColumn: z.number().describe(
            'How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field.',
          ).optional(),
          averageColumnsPerRow: z.number().describe(
            'How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: * A row with cells in "family:col" and "other:col" (1 column in "family") * A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") * A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field.',
          ).optional(),
          logicalDataBytes: z.string().describe(
            "How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out).",
          ).optional(),
        }).describe(
          "Approximate statistics related to a single column family within a table. This information may change rapidly, interpreting these values at a point in time may already preset out-of-date information. Everything below is approximate, unless otherwise specified.",
        ).optional(),
        valueType: z.object({
          aggregateType: z.object({
            hllppUniqueCount: z.unknown().describe(
              "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
            ).optional(),
            inputType: z.unknown().describe("Circular reference to Type")
              .optional(),
            max: z.unknown().describe(
              "Computes the max of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
            min: z.unknown().describe(
              "Computes the min of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
            stateType: z.unknown().describe("Circular reference to Type")
              .optional(),
            sum: z.unknown().describe(
              "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
            ).optional(),
          }).describe(
            "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
          ).optional(),
          arrayType: z.object({
            elementType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe(
            "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
          ).optional(),
          boolType: z.object({
            encoding: z.unknown().describe(
              "Defines rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "bool Values of type `Bool` are stored in `Value.bool_value`.",
          ).optional(),
          bytesType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
          ).optional(),
          dateType: z.object({}).describe(
            "Date Values of type `Date` are stored in `Value.date_value`.",
          ).optional(),
          enumType: z.object({
            enumName: z.unknown().describe(
              'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this enum is defined in.",
            ).optional(),
          }).describe(
            "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
          ).optional(),
          float32Type: z.object({}).describe(
            "Float32 Values of type `Float32` are stored in `Value.float_value`.",
          ).optional(),
          float64Type: z.object({}).describe(
            "Float64 Values of type `Float64` are stored in `Value.float_value`.",
          ).optional(),
          geographyType: z.object({}).describe(
            "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
          ).optional(),
          int32Type: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Int32 Values of type `Int32` are stored in `Value.int_value`.",
          ).optional(),
          int64Type: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Int64 Values of type `Int64` are stored in `Value.int_value`.",
          ).optional(),
          mapType: z.object({
            keyType: z.unknown().describe("Circular reference to Type")
              .optional(),
            valueType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe(
            "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
          ).optional(),
          protoType: z.object({
            messageName: z.unknown().describe(
              'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this proto is defined in.",
            ).optional(),
          }).describe(
            "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
          ).optional(),
          stringType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "String Values of type `String` are stored in `Value.string_value`.",
          ).optional(),
          structType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
            fields: z.unknown().describe(
              "The names and types of the fields in this struct.",
            ).optional(),
          }).describe(
            "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
          ).optional(),
          timestampType: z.object({
            encoding: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe(
            "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
          ).optional(),
        }).describe(
          '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
        ).optional(),
      }),
    ).describe(
      "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    deletionProtection: z.boolean().describe(
      "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
    ).optional(),
    granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS"])
      .describe(
        "Immutable. The granularity at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`.",
      ).optional(),
    name: z.string().describe(
      "The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    restoreInfo: z.object({
      backupInfo: z.object({
        backup: z.string().describe("Output only. Name of the backup.")
          .optional(),
        endTime: z.string().describe(
          "Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp.",
        ).optional(),
        sourceBackup: z.string().describe(
          "Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/",
        ).optional(),
        sourceTable: z.string().describe(
          "Output only. Name of the table the backup was created from.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp.",
        ).optional(),
      }).describe("Information about a backup.").optional(),
      sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"])
        .describe("The type of the restore source.").optional(),
    }).describe("Information about a table restore.").optional(),
    rowKeySchema: z.object({
      encoding: z.object({
        delimitedBytes: z.object({
          delimiter: z.string().describe(
            "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
          ).optional(),
        }).describe(
          "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
        ).optional(),
        orderedCodeBytes: z.object({}).describe(
          'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
        ).optional(),
        singleton: z.object({}).describe(
          "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
        ).optional(),
      }).describe("Rules used to convert to or from lower level types.")
        .optional(),
      fields: z.array(z.object({
        fieldName: z.string().describe(
          "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
        ).optional(),
        type: z.object({
          aggregateType: z.unknown().describe(
            "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
          ).optional(),
          arrayType: z.unknown().describe(
            "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
          ).optional(),
          boolType: z.unknown().describe(
            "bool Values of type `Bool` are stored in `Value.bool_value`.",
          ).optional(),
          bytesType: z.unknown().describe(
            "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
          ).optional(),
          dateType: z.unknown().describe(
            "Date Values of type `Date` are stored in `Value.date_value`.",
          ).optional(),
          enumType: z.unknown().describe(
            "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
          ).optional(),
          float32Type: z.unknown().describe(
            "Float32 Values of type `Float32` are stored in `Value.float_value`.",
          ).optional(),
          float64Type: z.unknown().describe(
            "Float64 Values of type `Float64` are stored in `Value.float_value`.",
          ).optional(),
          geographyType: z.unknown().describe(
            "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
          ).optional(),
          int32Type: z.unknown().describe(
            "Int32 Values of type `Int32` are stored in `Value.int_value`.",
          ).optional(),
          int64Type: z.unknown().describe(
            "Int64 Values of type `Int64` are stored in `Value.int_value`.",
          ).optional(),
          mapType: z.unknown().describe(
            "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
          ).optional(),
          protoType: z.unknown().describe(
            "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
          ).optional(),
          stringType: z.unknown().describe(
            "String Values of type `String` are stored in `Value.string_value`.",
          ).optional(),
          structType: z.unknown().describe(
            "Circular reference to GoogleBigtableAdminV2TypeStruct",
          ).optional(),
          timestampType: z.unknown().describe(
            "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
          ).optional(),
        }).describe(
          '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
        ).optional(),
      })).describe("The names and types of the fields in this struct.")
        .optional(),
    }).describe(
      "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
    ).optional(),
    stats: z.object({
      averageCellsPerColumn: z.number().describe(
        'How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field.',
      ).optional(),
      averageColumnsPerRow: z.number().describe(
        'How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: * A row with cells in "family:col" and "other:col" (2 distinct columns) * A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field.',
      ).optional(),
      logicalDataBytes: z.string().describe(
        "This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out).",
      ).optional(),
      rowCount: z.string().describe("How many rows are in the table.")
        .optional(),
    }).describe(
      "Approximate statistics related to a table. These statistics are calculated infrequently, while simultaneously, data in the table can change rapidly. Thus the values reported here (e.g. row count) are very likely out-of date, even the instant they are received in this API. Thus, only treat these values as approximate. IMPORTANT: Everything below is approximate, unless otherwise specified.",
    ).optional(),
    tieredStorageConfig: z.object({
      infrequentAccess: z.object({
        includeIfOlderThan: z.string().describe(
          "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
        ).optional(),
      }).describe("Rule to specify what data is stored in a storage tier.")
        .optional(),
    }).describe(
      "Config for tiered storage. A valid config must have a valid TieredStorageRule. Otherwise the whole TieredStorageConfig must be unset. By default all data is stored in the SSD tier (only SSD instances can configure tiered storage).",
    ).optional(),
  }).describe(
    "A collection of user data indexed by row, column, and timestamp. Each table is served using the resources of its parent cluster.",
  ).optional(),
  tableId: z.string().describe(
    "Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters.",
  ).optional(),
  automatedBackupPolicy: z.object({
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe("Defines an automated backup policy for a table").optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string().describe(
      "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
    ).optional(),
  }).describe("Change stream configuration.").optional(),
  clusterStates: z.record(
    z.string(),
    z.object({
      encryptionInfo: z.array(z.object({
        encryptionStatus: z.object({
          code: z.unknown().describe(
            "The status code, which should be an enum value of google.rpc.Code.",
          ).optional(),
          details: z.unknown().describe(
            "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
          ).optional(),
          message: z.unknown().describe(
            "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
          ).optional(),
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        encryptionType: z.enum([
          "ENCRYPTION_TYPE_UNSPECIFIED",
          "GOOGLE_DEFAULT_ENCRYPTION",
          "CUSTOMER_MANAGED_ENCRYPTION",
        ]).describe(
          "Output only. The type of encryption used to protect this resource.",
        ).optional(),
        kmsKeyVersion: z.string().describe(
          "Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table.",
        ).optional(),
      })).describe(
        "Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS.",
      ).optional(),
      replicationState: z.enum([
        "STATE_NOT_KNOWN",
        "INITIALIZING",
        "PLANNED_MAINTENANCE",
        "UNPLANNED_MAINTENANCE",
        "READY",
        "READY_OPTIMIZING",
      ]).describe(
        "Output only. The state of replication for the table in this cluster.",
      ).optional(),
    }),
  ).describe(
    "Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL`",
  ).optional(),
  columnFamilies: z.record(
    z.string(),
    z.object({
      gcRule: z.object({
        intersection: z.object({
          rules: z.array(z.unknown()).describe(
            "Only delete cells which would be deleted by every element of `rules`.",
          ).optional(),
        }).describe(
          "A GcRule which deletes cells matching all of the given rules.",
        ).optional(),
        maxAge: z.string().describe(
          "Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity.",
        ).optional(),
        maxNumVersions: z.number().int().describe(
          "Delete all cells in a column except the most recent N.",
        ).optional(),
        union: z.object({
          rules: z.array(z.unknown()).describe(
            "Delete cells which would be deleted by any element of `rules`.",
          ).optional(),
        }).describe(
          "A GcRule which deletes cells matching any of the given rules.",
        ).optional(),
      }).describe(
        "Rule for determining which cells to delete during garbage collection.",
      ).optional(),
      stats: z.object({
        averageCellsPerColumn: z.number().describe(
          'How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field.',
        ).optional(),
        averageColumnsPerRow: z.number().describe(
          'How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: * A row with cells in "family:col" and "other:col" (1 column in "family") * A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") * A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field.',
        ).optional(),
        logicalDataBytes: z.string().describe(
          "How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out).",
        ).optional(),
      }).describe(
        "Approximate statistics related to a single column family within a table. This information may change rapidly, interpreting these values at a point in time may already preset out-of-date information. Everything below is approximate, unless otherwise specified.",
      ).optional(),
      valueType: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.object({}).describe(
            "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
          ).optional(),
          inputType: z.string().describe("Circular reference to Type")
            .optional(),
          max: z.object({}).describe(
            "Computes the max of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          min: z.object({}).describe(
            "Computes the min of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          stateType: z.string().describe("Circular reference to Type")
            .optional(),
          sum: z.object({}).describe(
            "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
        }).describe(
          "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
        ).optional(),
        arrayType: z.object({
          elementType: z.string().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
        ).optional(),
        boolType: z.object({
          encoding: z.object({}).describe(
            "Defines rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "bool Values of type `Bool` are stored in `Value.bool_value`.",
        ).optional(),
        bytesType: z.object({
          encoding: z.object({
            raw: z.unknown().describe(
              "Leaves the value as-is. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
        ).optional(),
        dateType: z.object({}).describe(
          "Date Values of type `Date` are stored in `Value.date_value`.",
        ).optional(),
        enumType: z.object({
          enumName: z.string().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe(
          "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
        ).optional(),
        float32Type: z.object({}).describe(
          "Float32 Values of type `Float32` are stored in `Value.float_value`.",
        ).optional(),
        float64Type: z.object({}).describe(
          "Float64 Values of type `Float64` are stored in `Value.float_value`.",
        ).optional(),
        geographyType: z.object({}).describe(
          "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
        ).optional(),
        int32Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Encodes the value as a 4-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putInt()` with `ByteOrder.BIG_ENDIAN`",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Encodes the value in a variable length binary format of up to 5 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Int32 Values of type `Int32` are stored in `Value.int_value`.",
        ).optional(),
        int64Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Encodes the value as an 8-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putLong()` with `ByteOrder.BIG_ENDIAN`",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Encodes the value in a variable length binary format of up to 10 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Int64 Values of type `Int64` are stored in `Value.int_value`.",
        ).optional(),
        mapType: z.object({
          keyType: z.string().describe("Circular reference to Type").optional(),
          valueType: z.string().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
        ).optional(),
        protoType: z.object({
          messageName: z.string().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe(
          "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
        ).optional(),
        stringType: z.object({
          encoding: z.object({
            utf8Bytes: z.unknown().describe(
              "UTF-8 encoding. Sorted mode: - All values are supported. - Code point order is preserved. Distinct mode: all values are supported. Compatible with: - BigQuery `TEXT` encoding - HBase `Bytes.toBytes` - Java `String#getBytes(StandardCharsets.UTF_8)`",
            ).optional(),
            utf8Raw: z.unknown().describe(
              "Deprecated: prefer the equivalent `Utf8Bytes`.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "String Values of type `String` are stored in `Value.string_value`.",
        ).optional(),
        structType: z.object({
          encoding: z.object({
            delimitedBytes: z.unknown().describe(
              "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
            ).optional(),
            singleton: z.unknown().describe(
              "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
          fields: z.array(z.unknown()).describe(
            "The names and types of the fields in this struct.",
          ).optional(),
        }).describe(
          "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
        ).optional(),
        timestampType: z.object({
          encoding: z.object({
            unixMicrosInt64: z.unknown().describe(
              "Rules used to convert to or from lower level types.",
            ).optional(),
          }).describe("Rules used to convert to or from lower level types.")
            .optional(),
        }).describe(
          "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
        ).optional(),
      }).describe(
        '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
      ).optional(),
    }),
  ).describe(
    "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  deletionProtection: z.boolean().describe(
    "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
  ).optional(),
  granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS"]).describe(
    "Immutable. The granularity at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  restoreInfo: z.object({
    backupInfo: z.object({
      backup: z.string().describe("Output only. Name of the backup.")
        .optional(),
      endTime: z.string().describe(
        "Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp.",
      ).optional(),
      sourceBackup: z.string().describe(
        "Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/",
      ).optional(),
      sourceTable: z.string().describe(
        "Output only. Name of the table the backup was created from.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp.",
      ).optional(),
    }).describe("Information about a backup.").optional(),
    sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe("Information about a table restore.").optional(),
  rowKeySchema: z.object({
    encoding: z.object({
      delimitedBytes: z.object({
        delimiter: z.string().describe(
          "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
        ).optional(),
      }).describe(
        "Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.",
      ).optional(),
      orderedCodeBytes: z.object({}).describe(
        'Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: ` - STRUCT() -> "\\00\\00" - STRUCT("") -> "\\00\\00" - STRUCT("", "") -> "\\00\\00" - STRUCT("", "B") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\\00\\00" + "\\00\\01" + "B" - STRUCT("A", "", "C") -> "A" + "\\00\\01" + "\\00\\00" + "\\00\\01" + "C" ` Examples for struct with `DESC` fields: ` - STRUCT("" DESC) -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "", "") -> "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("" DESC, "A") -> "\\xFF\\xFF" + "\\xFF\\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\\00\\01" + "\\xFF\\xFF" + "\\xFF\\xFE" - STRUCT("", "A" DESC) -> "\\x00\\x00" + "\\x00\\x01" + "\\xBE" + "\\xFF\\xFE" ` Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.',
      ).optional(),
      singleton: z.object({}).describe(
        "Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.",
      ).optional(),
    }).describe("Rules used to convert to or from lower level types.")
      .optional(),
    fields: z.array(z.object({
      fieldName: z.string().describe(
        "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
      ).optional(),
      type: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.unknown().describe(
            "Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)",
          ).optional(),
          inputType: z.unknown().describe("Circular reference to Type")
            .optional(),
          max: z.unknown().describe(
            "Computes the max of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          min: z.unknown().describe(
            "Computes the min of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
          stateType: z.unknown().describe("Circular reference to Type")
            .optional(),
          sum: z.unknown().describe(
            "Computes the sum of the input values. Allowed input: `Int64` State: same as input",
          ).optional(),
        }).describe(
          "A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type`.",
        ).optional(),
        arrayType: z.object({
          elementType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.",
        ).optional(),
        boolType: z.object({
          encoding: z.unknown().describe(
            "Defines rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "bool Values of type `Bool` are stored in `Value.bool_value`.",
        ).optional(),
        bytesType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Bytes Values of type `Bytes` are stored in `Value.bytes_value`.",
        ).optional(),
        dateType: z.object({}).describe(
          "Date Values of type `Date` are stored in `Value.date_value`.",
        ).optional(),
        enumType: z.object({
          enumName: z.unknown().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe(
          "A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.",
        ).optional(),
        float32Type: z.object({}).describe(
          "Float32 Values of type `Float32` are stored in `Value.float_value`.",
        ).optional(),
        float64Type: z.object({}).describe(
          "Float64 Values of type `Float64` are stored in `Value.float_value`.",
        ).optional(),
        geographyType: z.object({}).describe(
          "A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.",
        ).optional(),
        int32Type: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Int32 Values of type `Int32` are stored in `Value.int_value`.",
        ).optional(),
        int64Type: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Int64 Values of type `Int64` are stored in `Value.int_value`.",
        ).optional(),
        mapType: z.object({
          keyType: z.unknown().describe("Circular reference to Type")
            .optional(),
          valueType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe(
          "A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the _last_ value takes precedence.",
        ).optional(),
        protoType: z.object({
          messageName: z.unknown().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe(
          "A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.",
        ).optional(),
        stringType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "String Values of type `String` are stored in `Value.string_value`.",
        ).optional(),
        structType: z.string().describe(
          "Circular reference to GoogleBigtableAdminV2TypeStruct",
        ).optional(),
        timestampType: z.object({
          encoding: z.unknown().describe(
            "Rules used to convert to or from lower level types.",
          ).optional(),
        }).describe(
          "Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.",
        ).optional(),
      }).describe(
        '`Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable\'s existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X)  INT64(-1)`, but `STRING("-00001") > STRING("00001")`.',
      ).optional(),
    })).describe("The names and types of the fields in this struct.")
      .optional(),
  }).describe(
    "A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.",
  ).optional(),
  stats: z.object({
    averageCellsPerColumn: z.number().describe(
      'How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field.',
    ).optional(),
    averageColumnsPerRow: z.number().describe(
      'How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: * A row with cells in "family:col" and "other:col" (2 distinct columns) * A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field.',
    ).optional(),
    logicalDataBytes: z.string().describe(
      "This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out).",
    ).optional(),
    rowCount: z.string().describe("How many rows are in the table.").optional(),
  }).describe(
    "Approximate statistics related to a table. These statistics are calculated infrequently, while simultaneously, data in the table can change rapidly. Thus the values reported here (e.g. row count) are very likely out-of date, even the instant they are received in this API. Thus, only treat these values as approximate. IMPORTANT: Everything below is approximate, unless otherwise specified.",
  ).optional(),
  tieredStorageConfig: z.object({
    infrequentAccess: z.object({
      includeIfOlderThan: z.string().describe(
        "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
      ).optional(),
    }).describe("Rule to specify what data is stored in a storage tier.")
      .optional(),
  }).describe(
    "Config for tiered storage. A valid config must have a valid TieredStorageRule. Otherwise the whole TieredStorageConfig must be unset. By default all data is stored in the SSD tier (only SSD instances can configure tiered storage).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Bigtable Admin Instances.Tables. Registered at `@swamp/gcp/bigtableadmin/instances-tables`. */
export const model = {
  type: "@swamp/gcp/bigtableadmin/instances-tables",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A collection of user data indexed by row, column, and timestamp. Each table i...",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["initialSplits"] !== undefined) {
          body["initialSplits"] = g["initialSplits"];
        }
        if (g["table"] !== undefined) body["table"] = g["table"];
        if (g["tableId"] !== undefined) body["tableId"] = g["tableId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a tables",
      arguments: z.object({
        identifier: z.string().describe("The name of the tables"),
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["automatedBackupPolicy"] !== undefined) {
          body["automatedBackupPolicy"] = g["automatedBackupPolicy"];
        }
        if (g["changeStreamConfig"] !== undefined) {
          body["changeStreamConfig"] = g["changeStreamConfig"];
        }
        if (g["clusterStates"] !== undefined) {
          body["clusterStates"] = g["clusterStates"];
        }
        if (g["columnFamilies"] !== undefined) {
          body["columnFamilies"] = g["columnFamilies"];
        }
        if (g["deletionProtection"] !== undefined) {
          body["deletionProtection"] = g["deletionProtection"];
        }
        if (g["granularity"] !== undefined) {
          body["granularity"] = g["granularity"];
        }
        if (g["restoreInfo"] !== undefined) {
          body["restoreInfo"] = g["restoreInfo"];
        }
        if (g["rowKeySchema"] !== undefined) {
          body["rowKeySchema"] = g["rowKeySchema"];
        }
        if (g["stats"] !== undefined) body["stats"] = g["stats"];
        if (g["tieredStorageConfig"] !== undefined) {
          body["tieredStorageConfig"] = g["tieredStorageConfig"];
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
      description: "Delete the tables",
      arguments: z.object({
        identifier: z.string().describe("The name of the tables"),
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
    check_consistency: {
      description: "check consistency",
      arguments: z.object({
        consistencyToken: z.any().optional(),
        dataBoostReadLocalWrites: z.any().optional(),
        standardReadRemoteWrites: z.any().optional(),
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
        if (args["consistencyToken"] !== undefined) {
          body["consistencyToken"] = args["consistencyToken"];
        }
        if (args["dataBoostReadLocalWrites"] !== undefined) {
          body["dataBoostReadLocalWrites"] = args["dataBoostReadLocalWrites"];
        }
        if (args["standardReadRemoteWrites"] !== undefined) {
          body["standardReadRemoteWrites"] = args["standardReadRemoteWrites"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigtableadmin.projects.instances.tables.checkConsistency",
            "path": "v2/{+name}:checkConsistency",
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
    drop_row_range: {
      description: "drop row range",
      arguments: z.object({
        deleteAllDataFromTable: z.any().optional(),
        rowKeyPrefix: z.any().optional(),
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
        if (args["deleteAllDataFromTable"] !== undefined) {
          body["deleteAllDataFromTable"] = args["deleteAllDataFromTable"];
        }
        if (args["rowKeyPrefix"] !== undefined) {
          body["rowKeyPrefix"] = args["rowKeyPrefix"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigtableadmin.projects.instances.tables.dropRowRange",
            "path": "v2/{+name}:dropRowRange",
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
    generate_consistency_token: {
      description: "generate consistency token",
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
              "bigtableadmin.projects.instances.tables.generateConsistencyToken",
            "path": "v2/{+name}:generateConsistencyToken",
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
            "id": "bigtableadmin.projects.instances.tables.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
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
    modify_column_families: {
      description: "modify column families",
      arguments: z.object({
        ignoreWarnings: z.any().optional(),
        modifications: z.any().optional(),
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
        if (args["ignoreWarnings"] !== undefined) {
          body["ignoreWarnings"] = args["ignoreWarnings"];
        }
        if (args["modifications"] !== undefined) {
          body["modifications"] = args["modifications"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigtableadmin.projects.instances.tables.modifyColumnFamilies",
            "path": "v2/{+name}:modifyColumnFamilies",
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
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
        tableId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["tableId"] !== undefined) body["tableId"] = args["tableId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigtableadmin.projects.instances.tables.restore",
            "path": "v2/{+parent}/tables:restore",
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
            "id": "bigtableadmin.projects.instances.tables.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
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
            "id": "bigtableadmin.projects.instances.tables.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
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
    undelete: {
      description: "undelete",
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
            "id": "bigtableadmin.projects.instances.tables.undelete",
            "path": "v2/{+name}:undelete",
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
