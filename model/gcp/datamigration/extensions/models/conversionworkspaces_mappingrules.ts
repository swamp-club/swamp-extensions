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

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
      "Optional. Optional filter on source column precision and scale. Used for fixed point numbers such as NUMERIC/NUMBER data types.",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Optional. Optional filter on source column length. Used for text based data types like varchar.",
    ).optional(),
    valueTransformation: z.object({
      applyHash: z.object({
        uuidFromBytes: z.object({}).describe(
          "Optional. Generate UUID from the data's byte array",
        ).optional(),
      }).describe("Optional. Applies a hash function on the data").optional(),
      assignMaxValue: z.object({}).describe(
        "Optional. Set to max_value - if integer or numeric, will use int.maxvalue, etc",
      ).optional(),
      assignMinValue: z.object({}).describe(
        "Optional. Set to min_value - if integer or numeric, will use int.minvalue, etc",
      ).optional(),
      assignNull: z.object({}).describe("Optional. Set to null").optional(),
      assignSpecificValue: z.object({
        value: z.string().describe("Required. Specific value to be assigned")
          .optional(),
      }).describe(
        "Optional. Set to a specific value (value is converted to fit the target data type)",
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
        "Optional. Filter on relation between source value and compare value of type double.",
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
        "Optional. Filter on relation between source value and compare value of type integer.",
      ).optional(),
      isNull: z.object({}).describe("Optional. Value is null").optional(),
      roundScale: z.object({
        scale: z.number().int().describe("Required. Scale value to be used")
          .optional(),
      }).describe("Optional. Allows the data to change scale").optional(),
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
      }).describe("Optional. Value is found in the specified list.").optional(),
    }).describe(
      "Required. Description of data transformation during migration.",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how the data contained in a column should be transformed (such as trimmed, rounded, etc) provided that the data meets certain criteria.",
  ).optional(),
  convertRowidColumn: z.object({
    onlyIfNoPrimaryKey: z.boolean().describe(
      "Required. Only work on tables without primary key defined",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how multiple tables should be converted with an additional rowid column.",
  ).optional(),
  displayName: z.string().describe("Optional. A human readable name")
    .optional(),
  entityMove: z.object({
    newSchema: z.string().describe("Required. The new schema").optional(),
  }).describe(
    "Optional. Rule to specify how multiple entities should be relocated into a different schema.",
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
  }).describe("Required. The rule filter").optional(),
  filterTableColumns: z.object({
    excludeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be excluded for a particular table.",
    ).optional(),
    includeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be included for a particular table.",
    ).optional(),
  }).describe(
    "Optional. Rule to specify the list of columns to include or exclude from a table.",
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
      "Optional. Filter for fixed point number data types such as NUMERIC/NUMBER.",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Optional. Filter for text-based data types like varchar.")
      .optional(),
  }).describe(
    "Optional. Rule to specify how multiple columns should be converted to a different data type.",
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
    "Optional. Rule to specify how multiple entities should be renamed.",
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
  }).describe("Optional. Rule to specify how a single column is converted.")
    .optional(),
  singleEntityRename: z.object({
    newName: z.string().describe(
      "Required. The new name of the destination entity",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how a single entity should be renamed.",
  ).optional(),
  singlePackageChange: z.object({
    packageBody: z.string().describe("Optional. Sql code for package body")
      .optional(),
    packageDescription: z.string().describe(
      "Optional. Sql code for package description",
    ).optional(),
  }).describe("Optional. Rule to specify how a single package is converted.")
    .optional(),
  sourceSqlChange: z.object({
    sqlCode: z.string().describe(
      "Required. Sql code for source (stored procedure, function, trigger or view)",
    ).optional(),
  }).describe(
    "Optional. Rule to change the sql code for an entity, for example, function, procedure.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe("Optional. The mapping rule state").optional(),
  mappingRuleId: z.string().describe("Required. The ID of the rule to create.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
      "Optional. Optional filter on source column precision and scale. Used for fixed point numbers such as NUMERIC/NUMBER data types.",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe(
      "Optional. Optional filter on source column length. Used for text based data types like varchar.",
    ).optional(),
    valueTransformation: z.object({
      applyHash: z.object({
        uuidFromBytes: z.object({}).describe(
          "Optional. Generate UUID from the data's byte array",
        ).optional(),
      }).describe("Optional. Applies a hash function on the data").optional(),
      assignMaxValue: z.object({}).describe(
        "Optional. Set to max_value - if integer or numeric, will use int.maxvalue, etc",
      ).optional(),
      assignMinValue: z.object({}).describe(
        "Optional. Set to min_value - if integer or numeric, will use int.minvalue, etc",
      ).optional(),
      assignNull: z.object({}).describe("Optional. Set to null").optional(),
      assignSpecificValue: z.object({
        value: z.string().describe("Required. Specific value to be assigned")
          .optional(),
      }).describe(
        "Optional. Set to a specific value (value is converted to fit the target data type)",
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
        "Optional. Filter on relation between source value and compare value of type double.",
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
        "Optional. Filter on relation between source value and compare value of type integer.",
      ).optional(),
      isNull: z.object({}).describe("Optional. Value is null").optional(),
      roundScale: z.object({
        scale: z.number().int().describe("Required. Scale value to be used")
          .optional(),
      }).describe("Optional. Allows the data to change scale").optional(),
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
      }).describe("Optional. Value is found in the specified list.").optional(),
    }).describe(
      "Required. Description of data transformation during migration.",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how the data contained in a column should be transformed (such as trimmed, rounded, etc) provided that the data meets certain criteria.",
  ).optional(),
  convertRowidColumn: z.object({
    onlyIfNoPrimaryKey: z.boolean().describe(
      "Required. Only work on tables without primary key defined",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how multiple tables should be converted with an additional rowid column.",
  ).optional(),
  displayName: z.string().describe("Optional. A human readable name")
    .optional(),
  entityMove: z.object({
    newSchema: z.string().describe("Required. The new schema").optional(),
  }).describe(
    "Optional. Rule to specify how multiple entities should be relocated into a different schema.",
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
  }).describe("Required. The rule filter").optional(),
  filterTableColumns: z.object({
    excludeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be excluded for a particular table.",
    ).optional(),
    includeColumns: z.array(z.string()).describe(
      "Optional. List of columns to be included for a particular table.",
    ).optional(),
  }).describe(
    "Optional. Rule to specify the list of columns to include or exclude from a table.",
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
      "Optional. Filter for fixed point number data types such as NUMERIC/NUMBER.",
    ).optional(),
    sourceTextFilter: z.object({
      sourceMaxLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length smaller than or equal to this number.",
      ).optional(),
      sourceMinLengthFilter: z.string().describe(
        "Optional. The filter will match columns with length greater than or equal to this number.",
      ).optional(),
    }).describe("Optional. Filter for text-based data types like varchar.")
      .optional(),
  }).describe(
    "Optional. Rule to specify how multiple columns should be converted to a different data type.",
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
    "Optional. Rule to specify how multiple entities should be renamed.",
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
  }).describe("Optional. Rule to specify how a single column is converted.")
    .optional(),
  singleEntityRename: z.object({
    newName: z.string().describe(
      "Required. The new name of the destination entity",
    ).optional(),
  }).describe(
    "Optional. Rule to specify how a single entity should be renamed.",
  ).optional(),
  singlePackageChange: z.object({
    packageBody: z.string().describe("Optional. Sql code for package body")
      .optional(),
    packageDescription: z.string().describe(
      "Optional. Sql code for package description",
    ).optional(),
  }).describe("Optional. Rule to specify how a single package is converted.")
    .optional(),
  sourceSqlChange: z.object({
    sqlCode: z.string().describe(
      "Required. Sql code for source (stored procedure, function, trigger or view)",
    ).optional(),
  }).describe(
    "Optional. Rule to change the sql code for an entity, for example, function, procedure.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe("Optional. The mapping rule state").optional(),
  mappingRuleId: z.string().describe("Required. The ID of the rule to create.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
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

/** Swamp extension model for Google Cloud Database Migration ConversionWorkspaces.MappingRules. Registered at `@swamp/gcp/datamigration/conversionworkspaces-mappingrules`. */
export const model = {
  type: "@swamp/gcp/datamigration/conversionworkspaces-mappingrules",
  version: "2026.10.23.1",
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
      toVersion: "2026.07.25.1",
      description: "Removed: setTablePrimaryKey",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { setTablePrimaryKey: _setTablePrimaryKey, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.1",
      description: "Added: setTablePrimaryKey",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.1",
      description: "Removed: setTablePrimaryKey",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { setTablePrimaryKey: _setTablePrimaryKey, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          params["mappingRuleId"] = String(g["mappingRuleId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a mappingRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the mappingRules"),
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
    delete: {
      description: "Delete the mappingRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the mappingRules"),
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
      description: "Sync mappingRules state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific mappingRules by name (e.g. one discovered by list)",
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
      description: "List mappingRules resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of rules to return. The service may return fewer than this value.",
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
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "mappingRules",
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
    import: {
      description: "import",
      arguments: z.object({
        autoCommit: z.any().optional(),
        rulesFiles: z.any().optional(),
        rulesFormat: z.any().optional(),
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
          baseUrl,
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
