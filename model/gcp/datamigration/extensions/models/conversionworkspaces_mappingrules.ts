// Auto-generated extension model for @swamp/gcp/datamigration/conversionworkspaces-mappingrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Database Migration ConversionWorkspaces.MappingRules.
 *
 * Definition of a transformation that is to be applied to a group of entities in the source schema. Several such transformations can be applied to an entity sequentially to define the corresponding entity in the target schema.
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
  return `${parent}/mappingRules/${shortName}`;
}

const BASE_URL = "https://datamigration.googleapis.com/";

const GET_CONFIG = {
  "id":
    "datamigration.projects.locations.conversionWorkspaces.mappingRules.get",
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
  "id":
    "datamigration.projects.locations.conversionWorkspaces.mappingRules.create",
  "path": "v1/{+parent}/mappingRules",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "mappingRuleId": {
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
  "id":
    "datamigration.projects.locations.conversionWorkspaces.mappingRules.delete",
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
  "id":
    "datamigration.projects.locations.conversionWorkspaces.mappingRules.list",
  "path": "v1/{+parent}/mappingRules",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  conditionalColumnSetValue: z.object({
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    sourceNumericFilter: z.object({
      numericFilterOption: z.enum([
        "NUMERIC_FILTER_OPTION_UNSPECIFIED",
        "NUMERIC_FILTER_OPTION_ALL",
        "NUMERIC_FILTER_OPTION_LIMIT",
        "NUMERIC_FILTER_OPTION_LIMITLESS",
      ]).describe(
        "Required. Enum to set the option defining the datatypes numeric filter has to be applied to",
      ).optional(),
      sourceMaxPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision smaller than or equal to this number.",
      ).optional(),
      sourceMaxScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale smaller than or equal to this number.",
      ).optional(),
      sourceMinPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision greater than or equal to this number.",
      ).optional(),
      sourceMinScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Filter for fixed point number data types such as NUMERIC/NUMBER",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Filter for text-based data types like varchar.").optional(),
    valueTransformation: z.object({
      applyHash: z.object({
        uuidFromBytes: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
      }).describe("Apply a hash function on the value.").optional(),
      assignMaxValue: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignMinValue: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignNull: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignSpecificValue: z.object({
        value: z.string().describe("Required. Specific value to be assigned")
          .optional(),
      }).describe(
        "Set to a specific value (value is converted to fit the target data type)",
      ).optional(),
      doubleComparison: z.object({
        value: z.number().describe("Required. Double compare value to be used")
          .optional(),
        valueComparison: z.enum([
          "VALUE_COMPARISON_UNSPECIFIED",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN",
        ]).describe("Required. Relation between source value and compare value")
          .optional(),
      }).describe(
        "Filter based on relation between source value and compare value of type double in ConditionalColumnSetValue",
      ).optional(),
      intComparison: z.object({
        value: z.string().describe("Required. Integer compare value to be used")
          .optional(),
        valueComparison: z.enum([
          "VALUE_COMPARISON_UNSPECIFIED",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN",
        ]).describe("Required. Relation between source value and compare value")
          .optional(),
      }).describe(
        "Filter based on relation between source value and compare value of type integer in ConditionalColumnSetValue",
      ).optional(),
      isNull: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      roundScale: z.object({
        scale: z.number().int().describe("Required. Scale value to be used")
          .optional(),
      }).describe(
        "This allows the data to change scale, for example if the source is 2 digits after the decimal point, specify round to scale value = 2. If for example the value needs to be converted to an integer, use round to scale value = 0.",
      ).optional(),
      valueList: z.object({
        ignoreCase: z.boolean().describe(
          "Required. Whether to ignore case when filtering by values. Defaults to false",
        ).optional(),
        valuePresentList: z.enum([
          "VALUE_PRESENT_IN_LIST_UNSPECIFIED",
          "VALUE_PRESENT_IN_LIST_IF_VALUE_LIST",
          "VALUE_PRESENT_IN_LIST_IF_VALUE_NOT_LIST",
        ]).describe(
          "Required. Indicates whether the filter matches rows with values that are present in the list or those with values not present in it.",
        ).optional(),
        values: z.array(z.string()).describe(
          "Required. The list to be used to filter by",
        ).optional(),
      }).describe("A list of values to filter by in ConditionalColumnSetValue")
        .optional(),
    }).describe(
      "Description of data transformation during migration as part of the ConditionalColumnSetValue.",
    ).optional(),
  }).describe(
    "Options to configure rule type ConditionalColumnSetValue. The rule is used to transform the data which is being replicated/migrated. The rule filter field can refer to one or more entities. The rule scope can be one of: Column.",
  ).optional(),
  convertRowidColumn: z.object({
    onlyIfNoPrimaryKey: z.boolean().describe(
      "Required. Only work on tables without primary key defined",
    ).optional(),
  }).describe(
    "Options to configure rule type ConvertROWIDToColumn. The rule is used to add column rowid to destination tables based on an Oracle rowid function/property. The rule filter field can refer to one or more entities. The rule scope can be one of: Table. This rule requires additional filter to be specified beyond the basic rule filter field, which is whether or not to work on tables which already have a primary key defined.",
  ).optional(),
  displayName: z.string().describe("Optional. A human readable name")
    .optional(),
  entityMove: z.object({
    newSchema: z.string().describe("Required. The new schema").optional(),
  }).describe(
    "Options to configure rule type EntityMove. The rule is used to move an entity to a new schema. The rule filter field can refer to one or more entities. The rule scope can be one of: Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT",
  ).optional(),
  filter: z.object({
    entities: z.array(z.string()).describe(
      "Optional. The rule should be applied to specific entities defined by their fully qualified names.",
    ).optional(),
    entityNameContains: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name contains the given string.",
    ).optional(),
    entityNamePrefix: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name starts with the given prefix.",
    ).optional(),
    entityNameSuffix: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name ends with the given suffix.",
    ).optional(),
    parentEntity: z.string().describe(
      "Optional. The rule should be applied to entities whose parent entity (fully qualified name) matches the given value. For example, if the rule applies to a table entity, the expected value should be a schema (schema). If the rule applies to a column or index entity, the expected value can be either a schema (schema) or a table (schema.table)",
    ).optional(),
  }).describe(
    "A filter defining the entities that a mapping rule should be applied to. When more than one field is specified, the rule is applied only to entities which match all the fields.",
  ).optional(),
  filterTableColumns: z.object({
    excludeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be excluded for a particular table.",
    ).optional(),
    includeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be included for a particular table.",
    ).optional(),
  }).describe(
    "Options to configure rule type FilterTableColumns. The rule is used to filter the list of columns to include or exclude from a table. The rule filter field can refer to one entity. The rule scope can be: Table Only one of the two lists can be specified for the rule.",
  ).optional(),
  multiColumnDataTypeChange: z.object({
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    newDataType: z.string().describe("Required. New data type.").optional(),
    overrideFractionalSecondsPrecision: z.number().int().describe(
      "Optional. Column fractional seconds precision - used only for timestamp based datatypes - if not specified and relevant uses the source column fractional seconds precision.",
    ).optional(),
    overrideLength: z.string().describe(
      "Optional. Column length - e.g. varchar (50) - if not specified and relevant uses the source column length.",
    ).optional(),
    overridePrecision: z.number().int().describe(
      "Optional. Column precision - when relevant - if not specified and relevant uses the source column precision.",
    ).optional(),
    overrideScale: z.number().int().describe(
      "Optional. Column scale - when relevant - if not specified and relevant uses the source column scale.",
    ).optional(),
    sourceDataTypeFilter: z.string().describe(
      "Required. Filter on source data type.",
    ).optional(),
    sourceNumericFilter: z.object({
      numericFilterOption: z.enum([
        "NUMERIC_FILTER_OPTION_UNSPECIFIED",
        "NUMERIC_FILTER_OPTION_ALL",
        "NUMERIC_FILTER_OPTION_LIMIT",
        "NUMERIC_FILTER_OPTION_LIMITLESS",
      ]).describe(
        "Required. Enum to set the option defining the datatypes numeric filter has to be applied to",
      ).optional(),
      sourceMaxPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision smaller than or equal to this number.",
      ).optional(),
      sourceMaxScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale smaller than or equal to this number.",
      ).optional(),
      sourceMinPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision greater than or equal to this number.",
      ).optional(),
      sourceMinScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Filter for fixed point number data types such as NUMERIC/NUMBER",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Filter for text-based data types like varchar.").optional(),
  }).describe(
    "Options to configure rule type MultiColumnDatatypeChange. The rule is used to change the data type and associated properties of multiple columns at once. The rule filter field can refer to one or more entities. The rule scope can be one of:Column. This rule requires additional filters to be specified beyond the basic rule filter field, which is the source data type, but the rule supports additional filtering capabilities such as the minimum and maximum field length. All additional filters which are specified are required to be met in order for the rule to be applied (logical AND between the fields).",
  ).optional(),
  multiEntityRename: z.object({
    newNamePattern: z.string().describe(
      "Optional. The pattern used to generate the new entity's name. This pattern must include the characters '{name}', which will be replaced with the name of the original entity. For example, the pattern 't_{name}' for an entity name jobs would be converted to 't_jobs'. If unspecified, the default value for this field is '{name}'",
    ).optional(),
    sourceNameTransformation: z.enum([
      "ENTITY_NAME_TRANSFORMATION_UNSPECIFIED",
      "ENTITY_NAME_TRANSFORMATION_NO_TRANSFORMATION",
      "ENTITY_NAME_TRANSFORMATION_LOWER_CASE",
      "ENTITY_NAME_TRANSFORMATION_UPPER_CASE",
      "ENTITY_NAME_TRANSFORMATION_CAPITALIZED_CASE",
    ]).describe(
      "Optional. Additional transformation that can be done on the source entity name before it is being used by the new_name_pattern, for example lower case. If no transformation is desired, use NO_TRANSFORMATION",
    ).optional(),
  }).describe(
    "Options to configure rule type MultiEntityRename. The rule is used to rename multiple entities. The rule filter field can refer to one or more entities. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT",
  ).optional(),
  name: z.string().describe(
    "Full name of the mapping rule resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{set}/mappingRule/{rule}.",
  ).optional(),
  ruleOrder: z.string().describe(
    "Required. The order in which the rule is applied. Lower order rules are applied before higher value rules so they may end up being overridden.",
  ).optional(),
  ruleScope: z.enum([
    "DATABASE_ENTITY_TYPE_UNSPECIFIED",
    "DATABASE_ENTITY_TYPE_SCHEMA",
    "DATABASE_ENTITY_TYPE_TABLE",
    "DATABASE_ENTITY_TYPE_COLUMN",
    "DATABASE_ENTITY_TYPE_CONSTRAINT",
    "DATABASE_ENTITY_TYPE_INDEX",
    "DATABASE_ENTITY_TYPE_TRIGGER",
    "DATABASE_ENTITY_TYPE_VIEW",
    "DATABASE_ENTITY_TYPE_SEQUENCE",
    "DATABASE_ENTITY_TYPE_STORED_PROCEDURE",
    "DATABASE_ENTITY_TYPE_FUNCTION",
    "DATABASE_ENTITY_TYPE_SYNONYM",
    "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE",
    "DATABASE_ENTITY_TYPE_UDT",
    "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW",
    "DATABASE_ENTITY_TYPE_DATABASE",
  ]).describe("Required. The rule scope").optional(),
  setTablePrimaryKey: z.object({
    primaryKey: z.string().describe("Optional. Name for the primary key")
      .optional(),
    primaryKeyColumns: z.array(z.string()).describe(
      "Required. List of column names for the primary key",
    ).optional(),
  }).describe(
    "Options to configure rule type SetTablePrimaryKey. The rule is used to specify the columns and name to configure/alter the primary key of a table. The rule filter field can refer to one entity. The rule scope can be one of: Table.",
  ).optional(),
  singleColumnChange: z.object({
    array: z.boolean().describe("Optional. Is the column of array type.")
      .optional(),
    arrayLength: z.number().int().describe(
      "Optional. The length of the array, only relevant if the column type is an array.",
    ).optional(),
    autoGenerated: z.boolean().describe(
      "Optional. Is the column auto-generated/identity.",
    ).optional(),
    charset: z.string().describe(
      "Optional. Charset override - instead of table level charset.",
    ).optional(),
    collation: z.string().describe(
      "Optional. Collation override - instead of table level collation.",
    ).optional(),
    comment: z.string().describe(
      "Optional. Comment associated with the column.",
    ).optional(),
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    dataType: z.string().describe("Optional. Column data type name.")
      .optional(),
    fractionalSecondsPrecision: z.number().int().describe(
      "Optional. Column fractional seconds precision - e.g. 2 as in timestamp (2) - when relevant.",
    ).optional(),
    length: z.string().describe(
      "Optional. Column length - e.g. 50 as in varchar (50) - when relevant.",
    ).optional(),
    nullable: z.boolean().describe("Optional. Is the column nullable.")
      .optional(),
    precision: z.number().int().describe(
      "Optional. Column precision - e.g. 8 as in double (8,2) - when relevant.",
    ).optional(),
    scale: z.number().int().describe(
      "Optional. Column scale - e.g. 2 as in double (8,2) - when relevant.",
    ).optional(),
    setValues: z.array(z.string()).describe(
      "Optional. Specifies the list of values allowed in the column.",
    ).optional(),
    udt: z.boolean().describe(
      "Optional. Is the column a UDT (User-defined Type).",
    ).optional(),
  }).describe(
    "Options to configure rule type SingleColumnChange. The rule is used to change the properties of a column. The rule filter field can refer to one entity. The rule scope can be one of: Column. When using this rule, if a field is not specified than the destination column's configuration will be the same as the one in the source column..",
  ).optional(),
  singleEntityRename: z.object({
    newName: z.string().describe(
      "Required. The new name of the destination entity",
    ).optional(),
  }).describe(
    "Options to configure rule type SingleEntityRename. The rule is used to rename an entity. The rule filter field can refer to only one entity. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT, Synonym",
  ).optional(),
  singlePackageChange: z.object({
    packageBody: z.string().describe("Optional. Sql code for package body")
      .optional(),
    packageDescription: z.string().describe(
      "Optional. Sql code for package description",
    ).optional(),
  }).describe(
    "Options to configure rule type SinglePackageChange. The rule is used to alter the sql code for a package entities. The rule filter field can refer to one entity. The rule scope can be: Package",
  ).optional(),
  sourceSqlChange: z.object({
    sqlCode: z.string().describe(
      "Required. Sql code for source (stored procedure, function, trigger or view)",
    ).optional(),
  }).describe(
    "Options to configure rule type SourceSqlChange. The rule is used to alter the sql code for database entities. The rule filter field can refer to one entity. The rule scope can be: StoredProcedure, Function, Trigger, View",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe("Optional. The mapping rule state").optional(),
  mappingRuleId: z.string().describe("Required. The ID of the rule to create.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  conditionalColumnSetValue: z.object({
    customFeatures: z.record(z.string(), z.unknown()),
    sourceNumericFilter: z.object({
      numericFilterOption: z.string(),
      sourceMaxPrecisionFilter: z.number(),
      sourceMaxScaleFilter: z.number(),
      sourceMinPrecisionFilter: z.number(),
      sourceMinScaleFilter: z.number(),
    }),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string(),
      sourceMinLengthFilter: z.string(),
    }),
    valueTransformation: z.object({
      applyHash: z.object({
        uuidFromBytes: z.object({}),
      }),
      assignMaxValue: z.object({}),
      assignMinValue: z.object({}),
      assignNull: z.object({}),
      assignSpecificValue: z.object({
        value: z.string(),
      }),
      doubleComparison: z.object({
        value: z.number(),
        valueComparison: z.string(),
      }),
      intComparison: z.object({
        value: z.string(),
        valueComparison: z.string(),
      }),
      isNull: z.object({}),
      roundScale: z.object({
        scale: z.number(),
      }),
      valueList: z.object({
        ignoreCase: z.boolean(),
        valuePresentList: z.string(),
        values: z.array(z.string()),
      }),
    }),
  }).optional(),
  convertRowidColumn: z.object({
    onlyIfNoPrimaryKey: z.boolean(),
  }).optional(),
  displayName: z.string().optional(),
  entityMove: z.object({
    newSchema: z.string(),
  }).optional(),
  filter: z.object({
    entities: z.array(z.string()),
    entityNameContains: z.string(),
    entityNamePrefix: z.string(),
    entityNameSuffix: z.string(),
    parentEntity: z.string(),
  }).optional(),
  filterTableColumns: z.object({
    excludeColumns: z.array(z.string()),
    includeColumns: z.array(z.string()),
  }).optional(),
  multiColumnDataTypeChange: z.object({
    customFeatures: z.record(z.string(), z.unknown()),
    newDataType: z.string(),
    overrideFractionalSecondsPrecision: z.number(),
    overrideLength: z.string(),
    overridePrecision: z.number(),
    overrideScale: z.number(),
    sourceDataTypeFilter: z.string(),
    sourceNumericFilter: z.object({
      numericFilterOption: z.string(),
      sourceMaxPrecisionFilter: z.number(),
      sourceMaxScaleFilter: z.number(),
      sourceMinPrecisionFilter: z.number(),
      sourceMinScaleFilter: z.number(),
    }),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string(),
      sourceMinLengthFilter: z.string(),
    }),
  }).optional(),
  multiEntityRename: z.object({
    newNamePattern: z.string(),
    sourceNameTransformation: z.string(),
  }).optional(),
  name: z.string(),
  revisionCreateTime: z.string().optional(),
  revisionId: z.string().optional(),
  ruleOrder: z.string().optional(),
  ruleScope: z.string().optional(),
  setTablePrimaryKey: z.object({
    primaryKey: z.string(),
    primaryKeyColumns: z.array(z.string()),
  }).optional(),
  singleColumnChange: z.object({
    array: z.boolean(),
    arrayLength: z.number(),
    autoGenerated: z.boolean(),
    charset: z.string(),
    collation: z.string(),
    comment: z.string(),
    customFeatures: z.record(z.string(), z.unknown()),
    dataType: z.string(),
    fractionalSecondsPrecision: z.number(),
    length: z.string(),
    nullable: z.boolean(),
    precision: z.number(),
    scale: z.number(),
    setValues: z.array(z.string()),
    udt: z.boolean(),
  }).optional(),
  singleEntityRename: z.object({
    newName: z.string(),
  }).optional(),
  singlePackageChange: z.object({
    packageBody: z.string(),
    packageDescription: z.string(),
  }).optional(),
  sourceSqlChange: z.object({
    sqlCode: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  conditionalColumnSetValue: z.object({
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    sourceNumericFilter: z.object({
      numericFilterOption: z.enum([
        "NUMERIC_FILTER_OPTION_UNSPECIFIED",
        "NUMERIC_FILTER_OPTION_ALL",
        "NUMERIC_FILTER_OPTION_LIMIT",
        "NUMERIC_FILTER_OPTION_LIMITLESS",
      ]).describe(
        "Required. Enum to set the option defining the datatypes numeric filter has to be applied to",
      ).optional(),
      sourceMaxPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision smaller than or equal to this number.",
      ).optional(),
      sourceMaxScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale smaller than or equal to this number.",
      ).optional(),
      sourceMinPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision greater than or equal to this number.",
      ).optional(),
      sourceMinScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Filter for fixed point number data types such as NUMERIC/NUMBER",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Filter for text-based data types like varchar.").optional(),
    valueTransformation: z.object({
      applyHash: z.object({
        uuidFromBytes: z.object({}).describe(
          "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
        ).optional(),
      }).describe("Apply a hash function on the value.").optional(),
      assignMaxValue: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignMinValue: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignNull: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      assignSpecificValue: z.object({
        value: z.string().describe("Required. Specific value to be assigned")
          .optional(),
      }).describe(
        "Set to a specific value (value is converted to fit the target data type)",
      ).optional(),
      doubleComparison: z.object({
        value: z.number().describe("Required. Double compare value to be used")
          .optional(),
        valueComparison: z.enum([
          "VALUE_COMPARISON_UNSPECIFIED",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN",
        ]).describe("Required. Relation between source value and compare value")
          .optional(),
      }).describe(
        "Filter based on relation between source value and compare value of type double in ConditionalColumnSetValue",
      ).optional(),
      intComparison: z.object({
        value: z.string().describe("Required. Integer compare value to be used")
          .optional(),
        valueComparison: z.enum([
          "VALUE_COMPARISON_UNSPECIFIED",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_THAN",
          "VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_THAN",
          "VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN",
        ]).describe("Required. Relation between source value and compare value")
          .optional(),
      }).describe(
        "Filter based on relation between source value and compare value of type integer in ConditionalColumnSetValue",
      ).optional(),
      isNull: z.object({}).describe(
        "A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }",
      ).optional(),
      roundScale: z.object({
        scale: z.number().int().describe("Required. Scale value to be used")
          .optional(),
      }).describe(
        "This allows the data to change scale, for example if the source is 2 digits after the decimal point, specify round to scale value = 2. If for example the value needs to be converted to an integer, use round to scale value = 0.",
      ).optional(),
      valueList: z.object({
        ignoreCase: z.boolean().describe(
          "Required. Whether to ignore case when filtering by values. Defaults to false",
        ).optional(),
        valuePresentList: z.enum([
          "VALUE_PRESENT_IN_LIST_UNSPECIFIED",
          "VALUE_PRESENT_IN_LIST_IF_VALUE_LIST",
          "VALUE_PRESENT_IN_LIST_IF_VALUE_NOT_LIST",
        ]).describe(
          "Required. Indicates whether the filter matches rows with values that are present in the list or those with values not present in it.",
        ).optional(),
        values: z.array(z.string()).describe(
          "Required. The list to be used to filter by",
        ).optional(),
      }).describe("A list of values to filter by in ConditionalColumnSetValue")
        .optional(),
    }).describe(
      "Description of data transformation during migration as part of the ConditionalColumnSetValue.",
    ).optional(),
  }).describe(
    "Options to configure rule type ConditionalColumnSetValue. The rule is used to transform the data which is being replicated/migrated. The rule filter field can refer to one or more entities. The rule scope can be one of: Column.",
  ).optional(),
  convertRowidColumn: z.object({
    onlyIfNoPrimaryKey: z.boolean().describe(
      "Required. Only work on tables without primary key defined",
    ).optional(),
  }).describe(
    "Options to configure rule type ConvertROWIDToColumn. The rule is used to add column rowid to destination tables based on an Oracle rowid function/property. The rule filter field can refer to one or more entities. The rule scope can be one of: Table. This rule requires additional filter to be specified beyond the basic rule filter field, which is whether or not to work on tables which already have a primary key defined.",
  ).optional(),
  displayName: z.string().describe("Optional. A human readable name")
    .optional(),
  entityMove: z.object({
    newSchema: z.string().describe("Required. The new schema").optional(),
  }).describe(
    "Options to configure rule type EntityMove. The rule is used to move an entity to a new schema. The rule filter field can refer to one or more entities. The rule scope can be one of: Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT",
  ).optional(),
  filter: z.object({
    entities: z.array(z.string()).describe(
      "Optional. The rule should be applied to specific entities defined by their fully qualified names.",
    ).optional(),
    entityNameContains: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name contains the given string.",
    ).optional(),
    entityNamePrefix: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name starts with the given prefix.",
    ).optional(),
    entityNameSuffix: z.string().describe(
      "Optional. The rule should be applied to entities whose non-qualified name ends with the given suffix.",
    ).optional(),
    parentEntity: z.string().describe(
      "Optional. The rule should be applied to entities whose parent entity (fully qualified name) matches the given value. For example, if the rule applies to a table entity, the expected value should be a schema (schema). If the rule applies to a column or index entity, the expected value can be either a schema (schema) or a table (schema.table)",
    ).optional(),
  }).describe(
    "A filter defining the entities that a mapping rule should be applied to. When more than one field is specified, the rule is applied only to entities which match all the fields.",
  ).optional(),
  filterTableColumns: z.object({
    excludeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be excluded for a particular table.",
    ).optional(),
    includeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be included for a particular table.",
    ).optional(),
  }).describe(
    "Options to configure rule type FilterTableColumns. The rule is used to filter the list of columns to include or exclude from a table. The rule filter field can refer to one entity. The rule scope can be: Table Only one of the two lists can be specified for the rule.",
  ).optional(),
  multiColumnDataTypeChange: z.object({
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    newDataType: z.string().describe("Required. New data type.").optional(),
    overrideFractionalSecondsPrecision: z.number().int().describe(
      "Optional. Column fractional seconds precision - used only for timestamp based datatypes - if not specified and relevant uses the source column fractional seconds precision.",
    ).optional(),
    overrideLength: z.string().describe(
      "Optional. Column length - e.g. varchar (50) - if not specified and relevant uses the source column length.",
    ).optional(),
    overridePrecision: z.number().int().describe(
      "Optional. Column precision - when relevant - if not specified and relevant uses the source column precision.",
    ).optional(),
    overrideScale: z.number().int().describe(
      "Optional. Column scale - when relevant - if not specified and relevant uses the source column scale.",
    ).optional(),
    sourceDataTypeFilter: z.string().describe(
      "Required. Filter on source data type.",
    ).optional(),
    sourceNumericFilter: z.object({
      numericFilterOption: z.enum([
        "NUMERIC_FILTER_OPTION_UNSPECIFIED",
        "NUMERIC_FILTER_OPTION_ALL",
        "NUMERIC_FILTER_OPTION_LIMIT",
        "NUMERIC_FILTER_OPTION_LIMITLESS",
      ]).describe(
        "Required. Enum to set the option defining the datatypes numeric filter has to be applied to",
      ).optional(),
      sourceMaxPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision smaller than or equal to this number.",
      ).optional(),
      sourceMaxScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale smaller than or equal to this number.",
      ).optional(),
      sourceMinPrecisionFilter: z.number().int().describe(
        "Optional. The filter will match columns with precision greater than or equal to this number.",
      ).optional(),
      sourceMinScaleFilter: z.number().int().describe(
        "Optional. The filter will match columns with scale greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Filter for fixed point number data types such as NUMERIC/NUMBER",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Filter for text-based data types like varchar.").optional(),
  }).describe(
    "Options to configure rule type MultiColumnDatatypeChange. The rule is used to change the data type and associated properties of multiple columns at once. The rule filter field can refer to one or more entities. The rule scope can be one of:Column. This rule requires additional filters to be specified beyond the basic rule filter field, which is the source data type, but the rule supports additional filtering capabilities such as the minimum and maximum field length. All additional filters which are specified are required to be met in order for the rule to be applied (logical AND between the fields).",
  ).optional(),
  multiEntityRename: z.object({
    newNamePattern: z.string().describe(
      "Optional. The pattern used to generate the new entity's name. This pattern must include the characters '{name}', which will be replaced with the name of the original entity. For example, the pattern 't_{name}' for an entity name jobs would be converted to 't_jobs'. If unspecified, the default value for this field is '{name}'",
    ).optional(),
    sourceNameTransformation: z.enum([
      "ENTITY_NAME_TRANSFORMATION_UNSPECIFIED",
      "ENTITY_NAME_TRANSFORMATION_NO_TRANSFORMATION",
      "ENTITY_NAME_TRANSFORMATION_LOWER_CASE",
      "ENTITY_NAME_TRANSFORMATION_UPPER_CASE",
      "ENTITY_NAME_TRANSFORMATION_CAPITALIZED_CASE",
    ]).describe(
      "Optional. Additional transformation that can be done on the source entity name before it is being used by the new_name_pattern, for example lower case. If no transformation is desired, use NO_TRANSFORMATION",
    ).optional(),
  }).describe(
    "Options to configure rule type MultiEntityRename. The rule is used to rename multiple entities. The rule filter field can refer to one or more entities. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT",
  ).optional(),
  name: z.string().describe(
    "Full name of the mapping rule resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{set}/mappingRule/{rule}.",
  ).optional(),
  ruleOrder: z.string().describe(
    "Required. The order in which the rule is applied. Lower order rules are applied before higher value rules so they may end up being overridden.",
  ).optional(),
  ruleScope: z.enum([
    "DATABASE_ENTITY_TYPE_UNSPECIFIED",
    "DATABASE_ENTITY_TYPE_SCHEMA",
    "DATABASE_ENTITY_TYPE_TABLE",
    "DATABASE_ENTITY_TYPE_COLUMN",
    "DATABASE_ENTITY_TYPE_CONSTRAINT",
    "DATABASE_ENTITY_TYPE_INDEX",
    "DATABASE_ENTITY_TYPE_TRIGGER",
    "DATABASE_ENTITY_TYPE_VIEW",
    "DATABASE_ENTITY_TYPE_SEQUENCE",
    "DATABASE_ENTITY_TYPE_STORED_PROCEDURE",
    "DATABASE_ENTITY_TYPE_FUNCTION",
    "DATABASE_ENTITY_TYPE_SYNONYM",
    "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE",
    "DATABASE_ENTITY_TYPE_UDT",
    "DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW",
    "DATABASE_ENTITY_TYPE_DATABASE",
  ]).describe("Required. The rule scope").optional(),
  setTablePrimaryKey: z.object({
    primaryKey: z.string().describe("Optional. Name for the primary key")
      .optional(),
    primaryKeyColumns: z.array(z.string()).describe(
      "Required. List of column names for the primary key",
    ).optional(),
  }).describe(
    "Options to configure rule type SetTablePrimaryKey. The rule is used to specify the columns and name to configure/alter the primary key of a table. The rule filter field can refer to one entity. The rule scope can be one of: Table.",
  ).optional(),
  singleColumnChange: z.object({
    array: z.boolean().describe("Optional. Is the column of array type.")
      .optional(),
    arrayLength: z.number().int().describe(
      "Optional. The length of the array, only relevant if the column type is an array.",
    ).optional(),
    autoGenerated: z.boolean().describe(
      "Optional. Is the column auto-generated/identity.",
    ).optional(),
    charset: z.string().describe(
      "Optional. Charset override - instead of table level charset.",
    ).optional(),
    collation: z.string().describe(
      "Optional. Collation override - instead of table level collation.",
    ).optional(),
    comment: z.string().describe(
      "Optional. Comment associated with the column.",
    ).optional(),
    customFeatures: z.record(z.string(), z.string()).describe(
      "Optional. Custom engine specific features.",
    ).optional(),
    dataType: z.string().describe("Optional. Column data type name.")
      .optional(),
    fractionalSecondsPrecision: z.number().int().describe(
      "Optional. Column fractional seconds precision - e.g. 2 as in timestamp (2) - when relevant.",
    ).optional(),
    length: z.string().describe(
      "Optional. Column length - e.g. 50 as in varchar (50) - when relevant.",
    ).optional(),
    nullable: z.boolean().describe("Optional. Is the column nullable.")
      .optional(),
    precision: z.number().int().describe(
      "Optional. Column precision - e.g. 8 as in double (8,2) - when relevant.",
    ).optional(),
    scale: z.number().int().describe(
      "Optional. Column scale - e.g. 2 as in double (8,2) - when relevant.",
    ).optional(),
    setValues: z.array(z.string()).describe(
      "Optional. Specifies the list of values allowed in the column.",
    ).optional(),
    udt: z.boolean().describe(
      "Optional. Is the column a UDT (User-defined Type).",
    ).optional(),
  }).describe(
    "Options to configure rule type SingleColumnChange. The rule is used to change the properties of a column. The rule filter field can refer to one entity. The rule scope can be one of: Column. When using this rule, if a field is not specified than the destination column's configuration will be the same as the one in the source column..",
  ).optional(),
  singleEntityRename: z.object({
    newName: z.string().describe(
      "Required. The new name of the destination entity",
    ).optional(),
  }).describe(
    "Options to configure rule type SingleEntityRename. The rule is used to rename an entity. The rule filter field can refer to only one entity. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT, Synonym",
  ).optional(),
  singlePackageChange: z.object({
    packageBody: z.string().describe("Optional. Sql code for package body")
      .optional(),
    packageDescription: z.string().describe(
      "Optional. Sql code for package description",
    ).optional(),
  }).describe(
    "Options to configure rule type SinglePackageChange. The rule is used to alter the sql code for a package entities. The rule filter field can refer to one entity. The rule scope can be: Package",
  ).optional(),
  sourceSqlChange: z.object({
    sqlCode: z.string().describe(
      "Required. Sql code for source (stored procedure, function, trigger or view)",
    ).optional(),
  }).describe(
    "Options to configure rule type SourceSqlChange. The rule is used to alter the sql code for database entities. The rule filter field can refer to one entity. The rule scope can be: StoredProcedure, Function, Trigger, View",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe("Optional. The mapping rule state").optional(),
  mappingRuleId: z.string().describe("Required. The ID of the rule to create.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Database Migration ConversionWorkspaces.MappingRules. Registered at `@swamp/gcp/datamigration/conversionworkspaces-mappingrules`. */
export const model = {
  type: "@swamp/gcp/datamigration/conversionworkspaces-mappingrules",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Definition of a transformation that is to be applied to a group of entities i...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a mappingRules",
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
        if (g["conditionalColumnSetValue"] !== undefined) {
          body["conditionalColumnSetValue"] = g["conditionalColumnSetValue"];
        }
        if (g["convertRowidColumn"] !== undefined) {
          body["convertRowidColumn"] = g["convertRowidColumn"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityMove"] !== undefined) body["entityMove"] = g["entityMove"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["filterTableColumns"] !== undefined) {
          body["filterTableColumns"] = g["filterTableColumns"];
        }
        if (g["multiColumnDataTypeChange"] !== undefined) {
          body["multiColumnDataTypeChange"] = g["multiColumnDataTypeChange"];
        }
        if (g["multiEntityRename"] !== undefined) {
          body["multiEntityRename"] = g["multiEntityRename"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ruleOrder"] !== undefined) body["ruleOrder"] = g["ruleOrder"];
        if (g["ruleScope"] !== undefined) body["ruleScope"] = g["ruleScope"];
        if (g["setTablePrimaryKey"] !== undefined) {
          body["setTablePrimaryKey"] = g["setTablePrimaryKey"];
        }
        if (g["singleColumnChange"] !== undefined) {
          body["singleColumnChange"] = g["singleColumnChange"];
        }
        if (g["singleEntityRename"] !== undefined) {
          body["singleEntityRename"] = g["singleEntityRename"];
        }
        if (g["singlePackageChange"] !== undefined) {
          body["singlePackageChange"] = g["singlePackageChange"];
        }
        if (g["sourceSqlChange"] !== undefined) {
          body["sourceSqlChange"] = g["sourceSqlChange"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["mappingRuleId"] !== undefined) {
          body["mappingRuleId"] = g["mappingRuleId"];
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
              "readyValues": ["ENABLED"],
              "failedValues": [],
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
      description: "Get a mappingRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the mappingRules"),
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
      description: "Delete the mappingRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the mappingRules"),
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
      description: "Sync mappingRules state from GCP",
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
        autoCommit: z.any().optional(),
        rulesFiles: z.any().optional(),
        rulesFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["autoCommit"] !== undefined) {
          body["autoCommit"] = args["autoCommit"];
        }
        if (args["rulesFiles"] !== undefined) {
          body["rulesFiles"] = args["rulesFiles"];
        }
        if (args["rulesFormat"] !== undefined) {
          body["rulesFormat"] = args["rulesFormat"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "datamigration.projects.locations.conversionWorkspaces.mappingRules.import",
            "path": "v1/{+parent}/mappingRules:import",
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
  },
};
