// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

import { z } from "npm:zod@4.6.7";
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
  initialSplits: z.array(z.object({
    key: z.string().describe("Row key to use as an initial tablet boundary.")
      .optional(),
  })).describe(
    'The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2,)`. Example: * Row keys:= `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` * initial_split_keys:= `["apple", "customer_1", "customer_2", "other"]` * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other,) => {"other", "zz"}.`',
  ).optional(),
  table: z.object({
    automatedBackupPolicy: z.object({
      disabled: z.boolean().describe(
        "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
      ).optional(),
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      keepHotDuration: z.string().describe(
        "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe(
      "If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled.",
    ).optional(),
    changeStreamConfig: z.object({
      retentionPeriod: z.string().describe(
        "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
      ).optional(),
    }).describe(
      "If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained.",
    ).optional(),
    clusterStates: z.record(
      z.string(),
      z.object({
        encryptionInfo: z.array(z.object({
          encryptionStatus: z.unknown().describe(
            "Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest.",
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
            "Delete cells that would be deleted by every nested rule.",
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
          }).describe("Delete cells that would be deleted by any nested rule.")
            .optional(),
        }).describe(
          "Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family.",
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
          logicalDataHddBytes: z.string().describe(
            "Output only. The logical data bytes of the column family stored on HDD.",
          ).optional(),
          logicalDataSsdBytes: z.string().describe(
            "Output only. The logical data bytes of the column family stored on SSD.",
          ).optional(),
        }).describe(
          "Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above.",
        ).optional(),
        valueType: z.object({
          aggregateType: z.object({
            hllppUniqueCount: z.unknown().describe(
              "HyperLogLogPlusPlusUniqueCount aggregator.",
            ).optional(),
            inputType: z.unknown().describe("Circular reference to Type")
              .optional(),
            max: z.unknown().describe("Max aggregator.").optional(),
            min: z.unknown().describe("Min aggregator.").optional(),
            stateType: z.unknown().describe("Circular reference to Type")
              .optional(),
            sum: z.unknown().describe("Sum aggregator.").optional(),
          }).describe("Aggregate").optional(),
          arrayType: z.object({
            elementType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe("Array").optional(),
          boolType: z.object({
            encoding: z.unknown().describe(
              "Specifies the encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Bool").optional(),
          bytesType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Bytes").optional(),
          dateType: z.object({}).describe("Date").optional(),
          enumType: z.object({
            enumName: z.unknown().describe(
              'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this enum is defined in.",
            ).optional(),
          }).describe("Enum").optional(),
          float32Type: z.object({}).describe("Float32").optional(),
          float64Type: z.object({}).describe("Float64").optional(),
          geographyType: z.object({}).describe("Geography").optional(),
          int32Type: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Int32").optional(),
          int64Type: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Int64").optional(),
          mapType: z.object({
            keyType: z.unknown().describe("Circular reference to Type")
              .optional(),
            valueType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe("Map").optional(),
          protoType: z.object({
            messageName: z.unknown().describe(
              'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this proto is defined in.",
            ).optional(),
          }).describe("Proto").optional(),
          stringType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("String").optional(),
          structType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
            fields: z.unknown().describe(
              "The names and types of the fields in this struct.",
            ).optional(),
          }).describe("Struct").optional(),
          timestampType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Timestamp").optional(),
        }).describe(
          "The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: * `value_type.input_type` for `AddInput` mutations",
        ).optional(),
      }),
    ).describe(
      "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    deletionProtection: z.boolean().describe(
      "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
    ).optional(),
    effectiveAutomatedBackupPolicy: z.object({
      disabled: z.boolean().describe(
        "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
      ).optional(),
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      keepHotDuration: z.string().describe(
        "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe(
      "Output only. The effective automated backup policy applied to the table. This represents the policy actually in effect, which may be a system-default policy if the user has not explicitly configured one. Views: `SCHEMA_VIEW`, `FULL`.",
    ).optional(),
    granularity: z.enum([
      "TIMESTAMP_GRANULARITY_UNSPECIFIED",
      "MILLIS",
      "MICROS",
    ]).describe(
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
      }).describe(
        "Information about the backup used to restore the table. The backup may no longer exist.",
      ).optional(),
      sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"])
        .describe("The type of the restore source.").optional(),
    }).describe(
      "Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore.",
    ).optional(),
    rowKeySchema: z.object({
      encoding: z.object({
        delimitedBytes: z.object({
          delimiter: z.string().describe(
            "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
          ).optional(),
        }).describe("Use `DelimitedBytes` encoding.").optional(),
        orderedCodeBytes: z.object({}).describe(
          "User `OrderedCodeBytes` encoding.",
        ).optional(),
        singleton: z.object({}).describe("Use `Singleton` encoding.")
          .optional(),
      }).describe(
        "The encoding to use when converting to or from lower level types.",
      ).optional(),
      fields: z.array(z.object({
        fieldName: z.string().describe(
          "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
        ).optional(),
        type: z.object({
          aggregateType: z.unknown().describe("Aggregate").optional(),
          arrayType: z.unknown().describe("Array").optional(),
          boolType: z.unknown().describe("Bool").optional(),
          bytesType: z.unknown().describe("Bytes").optional(),
          dateType: z.unknown().describe("Date").optional(),
          enumType: z.unknown().describe("Enum").optional(),
          float32Type: z.unknown().describe("Float32").optional(),
          float64Type: z.unknown().describe("Float64").optional(),
          geographyType: z.unknown().describe("Geography").optional(),
          int32Type: z.unknown().describe("Int32").optional(),
          int64Type: z.unknown().describe("Int64").optional(),
          mapType: z.unknown().describe("Map").optional(),
          protoType: z.unknown().describe("Proto").optional(),
          stringType: z.unknown().describe("String").optional(),
          structType: z.unknown().describe(
            "Circular reference to GoogleBigtableAdminV2TypeStruct",
          ).optional(),
          timestampType: z.unknown().describe("Timestamp").optional(),
        }).describe("The type of values in this field.").optional(),
      })).describe("The names and types of the fields in this struct.")
        .optional(),
    }).describe(
      'The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the _key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from _key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if _key = "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT _key, product_code FROM table" will return two columns: /------------------------------------------------------\\ | _key | product_code | | --------------------------------------|--------------| | "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" | 1245427 | \\------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "_key" and "_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported.',
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
      "Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above.",
    ).optional(),
    tieredStorageConfig: z.object({
      infrequentAccess: z.object({
        includeIfOlderThan: z.string().describe(
          "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
        ).optional(),
      }).describe(
        "Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance.",
      ).optional(),
    }).describe(
      "Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage.",
    ).optional(),
  }).describe("Required. The Table to create.").optional(),
  tableId: z.string().describe(
    "Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters.",
  ).optional(),
  automatedBackupPolicy: z.object({
    disabled: z.boolean().describe(
      "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
    ).optional(),
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    keepHotDuration: z.string().describe(
      "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe(
    "If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled.",
  ).optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string().describe(
      "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
    ).optional(),
  }).describe(
    "If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained.",
  ).optional(),
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
          "Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest.",
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
        }).describe("Delete cells that would be deleted by every nested rule.")
          .optional(),
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
        }).describe("Delete cells that would be deleted by any nested rule.")
          .optional(),
      }).describe(
        "Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family.",
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
        logicalDataHddBytes: z.string().describe(
          "Output only. The logical data bytes of the column family stored on HDD.",
        ).optional(),
        logicalDataSsdBytes: z.string().describe(
          "Output only. The logical data bytes of the column family stored on SSD.",
        ).optional(),
      }).describe(
        "Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above.",
      ).optional(),
      valueType: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.object({}).describe(
            "HyperLogLogPlusPlusUniqueCount aggregator.",
          ).optional(),
          inputType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          max: z.object({}).describe("Max aggregator.").optional(),
          min: z.object({}).describe("Min aggregator.").optional(),
          stateType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          sum: z.object({}).describe("Sum aggregator.").optional(),
        }).describe("Aggregate").optional(),
        arrayType: z.object({
          elementType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
        }).describe("Array").optional(),
        boolType: z.object({
          encoding: z.object({}).describe(
            "Specifies the encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bool").optional(),
        bytesType: z.object({
          encoding: z.object({
            raw: z.unknown().describe("Use `Raw` encoding.").optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bytes").optional(),
        dateType: z.object({}).describe("Date").optional(),
        enumType: z.object({
          enumName: z.string().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe("Enum").optional(),
        float32Type: z.object({}).describe("Float32").optional(),
        float64Type: z.object({}).describe("Float64").optional(),
        geographyType: z.object({}).describe("Geography").optional(),
        int32Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Use `BigEndianBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Use `OrderedCodeBytes` encoding.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int32").optional(),
        int64Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Use `BigEndianBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Use `OrderedCodeBytes` encoding.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int64").optional(),
        mapType: z.object({
          keyType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          valueType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
        }).describe("Map").optional(),
        protoType: z.object({
          messageName: z.string().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe("Proto").optional(),
        stringType: z.object({
          encoding: z.object({
            utf8Bytes: z.unknown().describe("Use `Utf8Bytes` encoding.")
              .optional(),
            utf8Raw: z.unknown().describe(
              "Deprecated: if set, converts to an empty `utf8_bytes`.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("String").optional(),
        structType: z.object({
          encoding: z.object({
            delimitedBytes: z.unknown().describe(
              "Use `DelimitedBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "User `OrderedCodeBytes` encoding.",
            ).optional(),
            singleton: z.unknown().describe("Use `Singleton` encoding.")
              .optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
          fields: z.array(z.unknown()).describe(
            "The names and types of the fields in this struct.",
          ).optional(),
        }).describe("Struct").optional(),
        timestampType: z.object({
          encoding: z.object({
            unixMicrosInt64: z.unknown().describe(
              "Encodes the number of microseconds since the Unix epoch using the given `Int64` encoding. Values must be microsecond-aligned. Compatible with: - Java `Instant.truncatedTo()` with `ChronoUnit.MICROS`",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Timestamp").optional(),
      }).describe(
        "The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: * `value_type.input_type` for `AddInput` mutations",
      ).optional(),
    }),
  ).describe(
    "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  deletionProtection: z.boolean().describe(
    "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
  ).optional(),
  effectiveAutomatedBackupPolicy: z.object({
    disabled: z.boolean().describe(
      "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
    ).optional(),
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    keepHotDuration: z.string().describe(
      "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe(
    "Output only. The effective automated backup policy applied to the table. This represents the policy actually in effect, which may be a system-default policy if the user has not explicitly configured one. Views: `SCHEMA_VIEW`, `FULL`.",
  ).optional(),
  granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS", "MICROS"])
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
    }).describe(
      "Information about the backup used to restore the table. The backup may no longer exist.",
    ).optional(),
    sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe(
    "Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore.",
  ).optional(),
  rowKeySchema: z.object({
    encoding: z.object({
      delimitedBytes: z.object({
        delimiter: z.string().describe(
          "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
        ).optional(),
      }).describe("Use `DelimitedBytes` encoding.").optional(),
      orderedCodeBytes: z.object({}).describe(
        "User `OrderedCodeBytes` encoding.",
      ).optional(),
      singleton: z.object({}).describe("Use `Singleton` encoding.").optional(),
    }).describe(
      "The encoding to use when converting to or from lower level types.",
    ).optional(),
    fields: z.array(z.object({
      fieldName: z.string().describe(
        "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
      ).optional(),
      type: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.unknown().describe(
            "HyperLogLogPlusPlusUniqueCount aggregator.",
          ).optional(),
          inputType: z.unknown().describe("Circular reference to Type")
            .optional(),
          max: z.unknown().describe("Max aggregator.").optional(),
          min: z.unknown().describe("Min aggregator.").optional(),
          stateType: z.unknown().describe("Circular reference to Type")
            .optional(),
          sum: z.unknown().describe("Sum aggregator.").optional(),
        }).describe("Aggregate").optional(),
        arrayType: z.object({
          elementType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe("Array").optional(),
        boolType: z.object({
          encoding: z.unknown().describe(
            "Specifies the encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bool").optional(),
        bytesType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bytes").optional(),
        dateType: z.object({}).describe("Date").optional(),
        enumType: z.object({
          enumName: z.unknown().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe("Enum").optional(),
        float32Type: z.object({}).describe("Float32").optional(),
        float64Type: z.object({}).describe("Float64").optional(),
        geographyType: z.object({}).describe("Geography").optional(),
        int32Type: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int32").optional(),
        int64Type: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int64").optional(),
        mapType: z.object({
          keyType: z.unknown().describe("Circular reference to Type")
            .optional(),
          valueType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe("Map").optional(),
        protoType: z.object({
          messageName: z.unknown().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe("Proto").optional(),
        stringType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("String").optional(),
        structType: z.record(z.string(), z.unknown()).describe(
          "Circular reference to GoogleBigtableAdminV2TypeStruct",
        ).optional(),
        timestampType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Timestamp").optional(),
      }).describe("The type of values in this field.").optional(),
    })).describe("The names and types of the fields in this struct.")
      .optional(),
  }).describe(
    'The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the _key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from _key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if _key = "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT _key, product_code FROM table" will return two columns: /------------------------------------------------------\\ | _key | product_code | | --------------------------------------|--------------| | "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" | 1245427 | \\------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "_key" and "_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported.',
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
    "Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above.",
  ).optional(),
  tieredStorageConfig: z.object({
    infrequentAccess: z.object({
      includeIfOlderThan: z.string().describe(
        "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
      ).optional(),
    }).describe(
      "Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance.",
    ).optional(),
  }).describe(
    "Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage.",
  ).optional(),
  ignoreWarnings: z.string().describe(
    "Optional. If true, ignore safety checks when updating the table.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  automatedBackupPolicy: z.object({
    disabled: z.boolean(),
    frequency: z.string(),
    keepHotDuration: z.string(),
    locations: z.array(z.string()),
    retentionPeriod: z.string(),
  }).optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string(),
  }).optional(),
  clusterStates: z.record(z.string(), z.unknown()).optional(),
  columnFamilies: z.record(z.string(), z.unknown()).optional(),
  deletionProtection: z.boolean().optional(),
  effectiveAutomatedBackupPolicy: z.object({
    disabled: z.boolean(),
    frequency: z.string(),
    keepHotDuration: z.string(),
    locations: z.array(z.string()),
    retentionPeriod: z.string(),
  }).optional(),
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
        structType: z.record(z.string(), z.unknown()),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  initialSplits: z.array(z.object({
    key: z.string().describe("Row key to use as an initial tablet boundary.")
      .optional(),
  })).describe(
    'The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2,)`. Example: * Row keys:= `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` * initial_split_keys:= `["apple", "customer_1", "customer_2", "other"]` * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other,) => {"other", "zz"}.`',
  ).optional(),
  table: z.object({
    automatedBackupPolicy: z.object({
      disabled: z.boolean().describe(
        "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
      ).optional(),
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      keepHotDuration: z.string().describe(
        "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe(
      "If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled.",
    ).optional(),
    changeStreamConfig: z.object({
      retentionPeriod: z.string().describe(
        "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
      ).optional(),
    }).describe(
      "If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained.",
    ).optional(),
    clusterStates: z.record(
      z.string(),
      z.object({
        encryptionInfo: z.array(z.object({
          encryptionStatus: z.unknown().describe(
            "Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest.",
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
            "Delete cells that would be deleted by every nested rule.",
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
          }).describe("Delete cells that would be deleted by any nested rule.")
            .optional(),
        }).describe(
          "Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family.",
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
          logicalDataHddBytes: z.string().describe(
            "Output only. The logical data bytes of the column family stored on HDD.",
          ).optional(),
          logicalDataSsdBytes: z.string().describe(
            "Output only. The logical data bytes of the column family stored on SSD.",
          ).optional(),
        }).describe(
          "Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above.",
        ).optional(),
        valueType: z.object({
          aggregateType: z.object({
            hllppUniqueCount: z.unknown().describe(
              "HyperLogLogPlusPlusUniqueCount aggregator.",
            ).optional(),
            inputType: z.unknown().describe("Circular reference to Type")
              .optional(),
            max: z.unknown().describe("Max aggregator.").optional(),
            min: z.unknown().describe("Min aggregator.").optional(),
            stateType: z.unknown().describe("Circular reference to Type")
              .optional(),
            sum: z.unknown().describe("Sum aggregator.").optional(),
          }).describe("Aggregate").optional(),
          arrayType: z.object({
            elementType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe("Array").optional(),
          boolType: z.object({
            encoding: z.unknown().describe(
              "Specifies the encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Bool").optional(),
          bytesType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Bytes").optional(),
          dateType: z.object({}).describe("Date").optional(),
          enumType: z.object({
            enumName: z.unknown().describe(
              'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this enum is defined in.",
            ).optional(),
          }).describe("Enum").optional(),
          float32Type: z.object({}).describe("Float32").optional(),
          float64Type: z.object({}).describe("Float64").optional(),
          geographyType: z.object({}).describe("Geography").optional(),
          int32Type: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Int32").optional(),
          int64Type: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Int64").optional(),
          mapType: z.object({
            keyType: z.unknown().describe("Circular reference to Type")
              .optional(),
            valueType: z.unknown().describe("Circular reference to Type")
              .optional(),
          }).describe("Map").optional(),
          protoType: z.object({
            messageName: z.unknown().describe(
              'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
            ).optional(),
            schemaBundleId: z.unknown().describe(
              "The ID of the schema bundle that this proto is defined in.",
            ).optional(),
          }).describe("Proto").optional(),
          stringType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("String").optional(),
          structType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
            fields: z.unknown().describe(
              "The names and types of the fields in this struct.",
            ).optional(),
          }).describe("Struct").optional(),
          timestampType: z.object({
            encoding: z.unknown().describe(
              "The encoding to use when converting to or from lower level types.",
            ).optional(),
          }).describe("Timestamp").optional(),
        }).describe(
          "The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: * `value_type.input_type` for `AddInput` mutations",
        ).optional(),
      }),
    ).describe(
      "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
    ).optional(),
    deletionProtection: z.boolean().describe(
      "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
    ).optional(),
    effectiveAutomatedBackupPolicy: z.object({
      disabled: z.boolean().describe(
        "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
      ).optional(),
      frequency: z.string().describe(
        "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
      ).optional(),
      keepHotDuration: z.string().describe(
        "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
      ).optional(),
      locations: z.array(z.string()).describe(
        "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
      ).optional(),
      retentionPeriod: z.string().describe(
        "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
      ).optional(),
    }).describe(
      "Output only. The effective automated backup policy applied to the table. This represents the policy actually in effect, which may be a system-default policy if the user has not explicitly configured one. Views: `SCHEMA_VIEW`, `FULL`.",
    ).optional(),
    granularity: z.enum([
      "TIMESTAMP_GRANULARITY_UNSPECIFIED",
      "MILLIS",
      "MICROS",
    ]).describe(
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
      }).describe(
        "Information about the backup used to restore the table. The backup may no longer exist.",
      ).optional(),
      sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"])
        .describe("The type of the restore source.").optional(),
    }).describe(
      "Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore.",
    ).optional(),
    rowKeySchema: z.object({
      encoding: z.object({
        delimitedBytes: z.object({
          delimiter: z.string().describe(
            "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
          ).optional(),
        }).describe("Use `DelimitedBytes` encoding.").optional(),
        orderedCodeBytes: z.object({}).describe(
          "User `OrderedCodeBytes` encoding.",
        ).optional(),
        singleton: z.object({}).describe("Use `Singleton` encoding.")
          .optional(),
      }).describe(
        "The encoding to use when converting to or from lower level types.",
      ).optional(),
      fields: z.array(z.object({
        fieldName: z.string().describe(
          "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
        ).optional(),
        type: z.object({
          aggregateType: z.unknown().describe("Aggregate").optional(),
          arrayType: z.unknown().describe("Array").optional(),
          boolType: z.unknown().describe("Bool").optional(),
          bytesType: z.unknown().describe("Bytes").optional(),
          dateType: z.unknown().describe("Date").optional(),
          enumType: z.unknown().describe("Enum").optional(),
          float32Type: z.unknown().describe("Float32").optional(),
          float64Type: z.unknown().describe("Float64").optional(),
          geographyType: z.unknown().describe("Geography").optional(),
          int32Type: z.unknown().describe("Int32").optional(),
          int64Type: z.unknown().describe("Int64").optional(),
          mapType: z.unknown().describe("Map").optional(),
          protoType: z.unknown().describe("Proto").optional(),
          stringType: z.unknown().describe("String").optional(),
          structType: z.unknown().describe(
            "Circular reference to GoogleBigtableAdminV2TypeStruct",
          ).optional(),
          timestampType: z.unknown().describe("Timestamp").optional(),
        }).describe("The type of values in this field.").optional(),
      })).describe("The names and types of the fields in this struct.")
        .optional(),
    }).describe(
      'The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the _key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from _key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if _key = "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT _key, product_code FROM table" will return two columns: /------------------------------------------------------\\ | _key | product_code | | --------------------------------------|--------------| | "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" | 1245427 | \\------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "_key" and "_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported.',
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
      "Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above.",
    ).optional(),
    tieredStorageConfig: z.object({
      infrequentAccess: z.object({
        includeIfOlderThan: z.string().describe(
          "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
        ).optional(),
      }).describe(
        "Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance.",
      ).optional(),
    }).describe(
      "Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage.",
    ).optional(),
  }).describe("Required. The Table to create.").optional(),
  tableId: z.string().describe(
    "Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters.",
  ).optional(),
  automatedBackupPolicy: z.object({
    disabled: z.boolean().describe(
      "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
    ).optional(),
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    keepHotDuration: z.string().describe(
      "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe(
    "If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled.",
  ).optional(),
  changeStreamConfig: z.object({
    retentionPeriod: z.string().describe(
      "How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity.",
    ).optional(),
  }).describe(
    "If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained.",
  ).optional(),
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
          "Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest.",
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
        }).describe("Delete cells that would be deleted by every nested rule.")
          .optional(),
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
        }).describe("Delete cells that would be deleted by any nested rule.")
          .optional(),
      }).describe(
        "Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family.",
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
        logicalDataHddBytes: z.string().describe(
          "Output only. The logical data bytes of the column family stored on HDD.",
        ).optional(),
        logicalDataSsdBytes: z.string().describe(
          "Output only. The logical data bytes of the column family stored on SSD.",
        ).optional(),
      }).describe(
        "Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above.",
      ).optional(),
      valueType: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.object({}).describe(
            "HyperLogLogPlusPlusUniqueCount aggregator.",
          ).optional(),
          inputType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          max: z.object({}).describe("Max aggregator.").optional(),
          min: z.object({}).describe("Min aggregator.").optional(),
          stateType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          sum: z.object({}).describe("Sum aggregator.").optional(),
        }).describe("Aggregate").optional(),
        arrayType: z.object({
          elementType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
        }).describe("Array").optional(),
        boolType: z.object({
          encoding: z.object({}).describe(
            "Specifies the encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bool").optional(),
        bytesType: z.object({
          encoding: z.object({
            raw: z.unknown().describe("Use `Raw` encoding.").optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bytes").optional(),
        dateType: z.object({}).describe("Date").optional(),
        enumType: z.object({
          enumName: z.string().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe("Enum").optional(),
        float32Type: z.object({}).describe("Float32").optional(),
        float64Type: z.object({}).describe("Float64").optional(),
        geographyType: z.object({}).describe("Geography").optional(),
        int32Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Use `BigEndianBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Use `OrderedCodeBytes` encoding.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int32").optional(),
        int64Type: z.object({
          encoding: z.object({
            bigEndianBytes: z.unknown().describe(
              "Use `BigEndianBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "Use `OrderedCodeBytes` encoding.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int64").optional(),
        mapType: z.object({
          keyType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
          valueType: z.record(z.string(), z.unknown()).describe(
            "Circular reference to Type",
          ).optional(),
        }).describe("Map").optional(),
        protoType: z.object({
          messageName: z.string().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.string().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe("Proto").optional(),
        stringType: z.object({
          encoding: z.object({
            utf8Bytes: z.unknown().describe("Use `Utf8Bytes` encoding.")
              .optional(),
            utf8Raw: z.unknown().describe(
              "Deprecated: if set, converts to an empty `utf8_bytes`.",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("String").optional(),
        structType: z.object({
          encoding: z.object({
            delimitedBytes: z.unknown().describe(
              "Use `DelimitedBytes` encoding.",
            ).optional(),
            orderedCodeBytes: z.unknown().describe(
              "User `OrderedCodeBytes` encoding.",
            ).optional(),
            singleton: z.unknown().describe("Use `Singleton` encoding.")
              .optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
          fields: z.array(z.unknown()).describe(
            "The names and types of the fields in this struct.",
          ).optional(),
        }).describe("Struct").optional(),
        timestampType: z.object({
          encoding: z.object({
            unixMicrosInt64: z.unknown().describe(
              "Encodes the number of microseconds since the Unix epoch using the given `Int64` encoding. Values must be microsecond-aligned. Compatible with: - Java `Instant.truncatedTo()` with `ChronoUnit.MICROS`",
            ).optional(),
          }).describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Timestamp").optional(),
      }).describe(
        "The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: * `value_type.input_type` for `AddInput` mutations",
      ).optional(),
    }),
  ).describe(
    "The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`",
  ).optional(),
  deletionProtection: z.boolean().describe(
    "Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs.",
  ).optional(),
  effectiveAutomatedBackupPolicy: z.object({
    disabled: z.boolean().describe(
      "Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement.",
    ).optional(),
    frequency: z.string().describe(
      "How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours.",
    ).optional(),
    keepHotDuration: z.string().describe(
      "Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances.",
    ).optional(),
    retentionPeriod: z.string().describe(
      "Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days.",
    ).optional(),
  }).describe(
    "Output only. The effective automated backup policy applied to the table. This represents the policy actually in effect, which may be a system-default policy if the user has not explicitly configured one. Views: `SCHEMA_VIEW`, `FULL`.",
  ).optional(),
  granularity: z.enum(["TIMESTAMP_GRANULARITY_UNSPECIFIED", "MILLIS", "MICROS"])
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
    }).describe(
      "Information about the backup used to restore the table. The backup may no longer exist.",
    ).optional(),
    sourceType: z.enum(["RESTORE_SOURCE_TYPE_UNSPECIFIED", "BACKUP"]).describe(
      "The type of the restore source.",
    ).optional(),
  }).describe(
    "Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore.",
  ).optional(),
  rowKeySchema: z.object({
    encoding: z.object({
      delimitedBytes: z.object({
        delimiter: z.string().describe(
          "Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters.",
        ).optional(),
      }).describe("Use `DelimitedBytes` encoding.").optional(),
      orderedCodeBytes: z.object({}).describe(
        "User `OrderedCodeBytes` encoding.",
      ).optional(),
      singleton: z.object({}).describe("Use `Singleton` encoding.").optional(),
    }).describe(
      "The encoding to use when converting to or from lower level types.",
    ).optional(),
    fields: z.array(z.object({
      fieldName: z.string().describe(
        "The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name.",
      ).optional(),
      type: z.object({
        aggregateType: z.object({
          hllppUniqueCount: z.unknown().describe(
            "HyperLogLogPlusPlusUniqueCount aggregator.",
          ).optional(),
          inputType: z.unknown().describe("Circular reference to Type")
            .optional(),
          max: z.unknown().describe("Max aggregator.").optional(),
          min: z.unknown().describe("Min aggregator.").optional(),
          stateType: z.unknown().describe("Circular reference to Type")
            .optional(),
          sum: z.unknown().describe("Sum aggregator.").optional(),
        }).describe("Aggregate").optional(),
        arrayType: z.object({
          elementType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe("Array").optional(),
        boolType: z.object({
          encoding: z.unknown().describe(
            "Specifies the encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bool").optional(),
        bytesType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Bytes").optional(),
        dateType: z.object({}).describe("Date").optional(),
        enumType: z.object({
          enumName: z.unknown().describe(
            'The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this enum is defined in.",
          ).optional(),
        }).describe("Enum").optional(),
        float32Type: z.object({}).describe("Float32").optional(),
        float64Type: z.object({}).describe("Float64").optional(),
        geographyType: z.object({}).describe("Geography").optional(),
        int32Type: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int32").optional(),
        int64Type: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Int64").optional(),
        mapType: z.object({
          keyType: z.unknown().describe("Circular reference to Type")
            .optional(),
          valueType: z.unknown().describe("Circular reference to Type")
            .optional(),
        }).describe("Map").optional(),
        protoType: z.object({
          messageName: z.unknown().describe(
            'The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message".',
          ).optional(),
          schemaBundleId: z.unknown().describe(
            "The ID of the schema bundle that this proto is defined in.",
          ).optional(),
        }).describe("Proto").optional(),
        stringType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("String").optional(),
        structType: z.record(z.string(), z.unknown()).describe(
          "Circular reference to GoogleBigtableAdminV2TypeStruct",
        ).optional(),
        timestampType: z.object({
          encoding: z.unknown().describe(
            "The encoding to use when converting to or from lower level types.",
          ).optional(),
        }).describe("Timestamp").optional(),
      }).describe("The type of values in this field.").optional(),
    })).describe("The names and types of the fields in this struct.")
      .optional(),
  }).describe(
    'The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the _key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from _key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if _key = "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT _key, product_code FROM table" will return two columns: /------------------------------------------------------\\ | _key | product_code | | --------------------------------------|--------------| | "some_id#2024-04-30#\\x00\\x13\\x00\\xf3" | 1245427 | \\------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "_key" and "_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported.',
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
    "Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above.",
  ).optional(),
  tieredStorageConfig: z.object({
    infrequentAccess: z.object({
      includeIfOlderThan: z.string().describe(
        "Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days.",
      ).optional(),
    }).describe(
      "Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance.",
    ).optional(),
  }).describe(
    "Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage.",
  ).optional(),
  ignoreWarnings: z.string().describe(
    "Optional. If true, ignore safety checks when updating the table.",
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

/** Swamp extension model for Google Cloud Bigtable Admin Instances.Tables. Registered at `@swamp/gcp/bigtableadmin/instances-tables`. */
export const model = {
  type: "@swamp/gcp/bigtableadmin/instances-tables",
  version: "2026.10.23.2",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
      toVersion: "2026.07.17.3",
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
      toVersion: "2026.07.20.2",
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
      toVersion: "2026.08.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: ignoreWarnings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.14.1",
      description: "Added: effectiveAutomatedBackupPolicy",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.2",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["initialSplits"] !== undefined) {
          body["initialSplits"] = g["initialSplits"];
        }
        if (g["table"] !== undefined) body["table"] = g["table"];
        if (g["tableId"] !== undefined) body["tableId"] = g["tableId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? "") ||
              buildResourceName(
                String(g["parent"] ?? ""),
                String(g["tableId"] ?? ""),
              ),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Update tables attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific tables by name (e.g. one discovered by list)",
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
        if (g["effectiveAutomatedBackupPolicy"] !== undefined) {
          body["effectiveAutomatedBackupPolicy"] =
            g["effectiveAutomatedBackupPolicy"];
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
        if (g["ignoreWarnings"] !== undefined) {
          params["ignoreWarnings"] = String(g["ignoreWarnings"]);
        } else if (existing["ignoreWarnings"] !== undefined) {
          params["ignoreWarnings"] = String(existing["ignoreWarnings"]);
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
          undefined,
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
      description: "Delete the tables",
      arguments: z.object({
        identifier: z.string().describe("The name of the tables"),
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
      description: "Sync tables state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific tables by name (e.g. one discovered by list)",
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
      description: "List tables resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request.",
        ).optional(),
        view: z.string().describe(
          "The view to be applied to the returned tables' fields. Only NAME_ONLY view (default), REPLICATION_VIEW and ENCRYPTION_VIEW are supported.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "tables",
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
    check_consistency: {
      description: "check consistency",
      arguments: z.object({
        consistencyToken: z.any().optional(),
        dataBoostReadLocalWrites: z.any().optional(),
        standardReadRemoteWrites: z.any().optional(),
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
          baseUrl,
          {
            "id": "bigtableadmin.projects.instances.tables.checkConsistency",
            "path": "v2/{+name}:checkConsistency",
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
    drop_row_range: {
      description: "drop row range",
      arguments: z.object({
        deleteAllDataFromTable: z.any().optional(),
        rowKeyPrefix: z.any().optional(),
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
        if (args["deleteAllDataFromTable"] !== undefined) {
          body["deleteAllDataFromTable"] = args["deleteAllDataFromTable"];
        }
        if (args["rowKeyPrefix"] !== undefined) {
          body["rowKeyPrefix"] = args["rowKeyPrefix"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "bigtableadmin.projects.instances.tables.dropRowRange",
            "path": "v2/{+name}:dropRowRange",
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
    generate_consistency_token: {
      description: "generate consistency token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        if (args["ignoreWarnings"] !== undefined) {
          body["ignoreWarnings"] = args["ignoreWarnings"];
        }
        if (args["modifications"] !== undefined) {
          body["modifications"] = args["modifications"];
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["tableId"] !== undefined) body["tableId"] = args["tableId"];
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          baseUrl,
          {
            "id": "bigtableadmin.projects.instances.tables.undelete",
            "path": "v2/{+name}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
