// Auto-generated extension model for @swamp/gcp/logging/savedqueries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Logging SavedQueries.
 *
 * Describes a query that has been saved by a user.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/savedQueries/${shortName}`;
}

const BASE_URL = "https://logging.googleapis.com/";

const GET_CONFIG = {
  "id": "logging.billingAccounts.locations.savedQueries.get",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "logging.billingAccounts.locations.savedQueries.create",
  "path": "v2/{+parent}/savedQueries",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "savedQueryId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "logging.billingAccounts.locations.savedQueries.patch",
  "path": "v2/{+name}",
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
  "id": "logging.billingAccounts.locations.savedQueries.delete",
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
  "id": "logging.billingAccounts.locations.savedQueries.list",
  "path": "v2/{+parent}/savedQueries",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  description: z.string().describe(
    "Optional. A human readable description of the saved query.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user specified title for the SavedQuery.",
  ).optional(),
  loggingQuery: z.object({
    filter: z.string().describe(
      "Required. An advanced query using the Logging Query Language (https://docs.cloud.google.com/logging/docs/view/logging-query-language). The maximum length of the filter is 20000 characters.",
    ).optional(),
    summaryFieldEnd: z.number().int().describe(
      "Characters will be counted from the end of the string.",
    ).optional(),
    summaryFieldStart: z.number().int().describe(
      "Characters will be counted from the start of the string.",
    ).optional(),
    summaryFields: z.array(z.object({
      field: z.string().describe(
        "Optional. The field from the LogEntry to include in the summary line, for example resource.type or jsonPayload.name.",
      ).optional(),
    })).describe(
      "Optional. The set of summary fields to display for this saved query.",
    ).optional(),
  }).describe(
    "Describes a Cloud Logging query that can be run in Logs Explorer UI or via the logging API.In addition to the query itself, additional information may be stored to capture the display configuration and other UI state used in association with analysis of query results.",
  ).optional(),
  opsAnalyticsQuery: z.object({
    queryBuilder: z.object({
      fieldSources: z.array(z.object({
        aliasRef: z.string().describe(
          "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
        ).optional(),
        columnType: z.string().describe(
          "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
        ).optional(),
        field: z.string().describe(
          "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
        ).optional(),
        isJson: z.boolean().describe(
          "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
        ).optional(),
        parentPath: z.string().describe(
          "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
        ).optional(),
        projectedField: z.object({
          alias: z.unknown().describe(
            'The alias name for the field. Valid alias examples are: - single word alias: TestAlias - numbers in an alias: Alias123 - multi word alias should be enclosed in quotes: "Test Alias" Invalid alias examples are: - alias containing keywords: WHERE, SELECT, FROM, etc. - alias starting with a number: 1stAlias',
          ).optional(),
          cast: z.unknown().describe(
            "The cast for the field. This can any SQL cast type. Examples: - STRING - CHAR - DATE - TIMESTAMP - DATETIME - INT - FLOAT",
          ).optional(),
          field: z.unknown().describe(
            "Optional. The field name. This will be the field that is selected using the dot notation to display the drill down value.",
          ).optional(),
          operation: z.unknown().describe(
            "Specifies the role of this field (direct selection, grouping, or aggregation).",
          ).optional(),
          regexExtraction: z.unknown().describe(
            'The re2 extraction for the field. This will be used to extract the value from the field using REGEXP_EXTRACT. More information on re2 can be found here: https://github.com/google/re2/wiki/Syntax. Meta characters like +?()| will need to be escaped. Examples: - ".(autoscaler.*)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(.*(autoscaler.*)$)")in SQL. - "\\(test_value\\)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(\\(test_value\\)$)") in SQL.',
          ).optional(),
          sqlAggregationFunction: z.unknown().describe(
            "Defines the aggregation function to apply to this field. This message is used only when operation is set to AGGREGATE.",
          ).optional(),
          truncationGranularity: z.unknown().describe(
            "The truncation granularity when grouping by a time/date field. This will be used to truncate the field to the granularity specified. This can be either a date or a time granularity found at https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date and https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time respectively.",
          ).optional(),
          virtualField: z.unknown().describe(
            "A virtual field is a field that is not physically present in the underlying data schema, but is created through specific operations within the query builder model based on other fields in the schema.",
          ).optional(),
        }).describe(
          "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
        ).optional(),
      })).describe(
        "Defines the items to include in the query result, analogous to a SQL SELECT clause.",
      ).optional(),
      filter: z.object({
        childPredicates: z.array(z.record(z.string(), z.unknown())).describe(
          "The children of the filter predicate. This equates to the branches of the filter predicate that could contain further nested leaves.",
        ).optional(),
        leafPredicate: z.object({
          comparator: z.enum([
            "COMPARATOR_UNSPECIFIED",
            "EQUALS",
            "MATCHES_REGEXP",
            "GREATER_THAN",
            "LESS_THAN",
            "GREATER_THAN_EQUALS",
            "LESS_THAN_EQUALS",
            "IS_NULL",
            "IN",
            "LIKE",
          ]).describe("The comparison type to use for the filter.").optional(),
          fieldSource: z.object({
            aliasRef: z.unknown().describe(
              "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
            ).optional(),
            columnType: z.unknown().describe(
              "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
            ).optional(),
            field: z.unknown().describe(
              "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
            ).optional(),
            isJson: z.unknown().describe(
              "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
            ).optional(),
            parentPath: z.unknown().describe(
              "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
            ).optional(),
            projectedField: z.unknown().describe(
              "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
            ).optional(),
          }).describe(
            'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
          ).optional(),
          fieldSourceValue: z.object({
            aliasRef: z.unknown().describe(
              "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
            ).optional(),
            columnType: z.unknown().describe(
              "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
            ).optional(),
            field: z.unknown().describe(
              "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
            ).optional(),
            isJson: z.unknown().describe(
              "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
            ).optional(),
            parentPath: z.unknown().describe(
              "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
            ).optional(),
            projectedField: z.unknown().describe(
              "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
            ).optional(),
          }).describe(
            'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
          ).optional(),
          isNegation: z.boolean().describe(
            "Determines if the NOT flag should be added to the comparator.",
          ).optional(),
          literalValue: z.string().describe(
            "The Value will be used to hold user defined constants set as the Right Hand Side of the filter.",
          ).optional(),
        }).describe(
          "This is a leaf of the FilterPredicate. Ex: { field: json_payload.message.error_code, filter_value: {numeric_value: 400}, comparator: EQUAL_TO} The field will be schema field that is selected using the. annotation to display the drill down value. The value will be the user inputted text that the filter is comparing against.",
        ).optional(),
        operatorType: z.enum(["OPERATOR_TYPE_UNSPECIFIED", "AND", "OR", "LEAF"])
          .describe(
            "The operator type for the filter. Currently there is no support for multiple levels of nesting, so this will be a single value with no joining of different operator types",
          ).optional(),
      }).describe(
        "A filter for a query. This equates to the WHERE clause in SQL.",
      ).optional(),
      limit: z.string().describe(
        "The limit to use for the query. This equates to the LIMIT clause in SQL. A limit of 0 will be treated as not enabled.",
      ).optional(),
      orderBys: z.array(z.object({
        fieldSource: z.object({
          aliasRef: z.unknown().describe(
            "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
          ).optional(),
          columnType: z.unknown().describe(
            "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
          ).optional(),
          field: z.unknown().describe(
            "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
          ).optional(),
          isJson: z.unknown().describe(
            "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
          ).optional(),
          parentPath: z.unknown().describe(
            "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
          ).optional(),
          projectedField: z.unknown().describe(
            "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
          ).optional(),
        }).describe(
          'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
        ).optional(),
        sortOrderDirection: z.enum([
          "SORT_ORDER_UNSPECIFIED",
          "SORT_ORDER_NONE",
          "SORT_ORDER_ASCENDING",
          "SORT_ORDER_DESCENDING",
        ]).describe("The sort order to use for the query.").optional(),
      })).describe(
        "The sort orders to use for the query. This equates to the ORDER BY clause in SQL.",
      ).optional(),
      resourceNames: z.array(z.string()).describe(
        'Required. The view/resource to query. For now only a single view/resource will be sent, but there are plans to allow multiple views in the future. Marking as repeated for that purpose. Example: - "projects/123/locations/global/buckets/456/views/_Default" - "projects/123/locations/global/metricBuckets/456/views/_Default"',
      ).optional(),
      searchTerm: z.string().describe(
        "The plain text search to use for the query. There is no support for multiple search terms. This uses the SEARCH functionality in BigQuery. For example, a search_term = 'ERROR' would result in the following SQL:SELECT * FROM resource WHERE SEARCH(resource, 'ERROR') LIMIT 100",
      ).optional(),
    }).describe(
      "Defines a structured query configuration that can be used instead of writing raw SQL. This configuration represents the components of a SQL query (FROM, SELECT, WHERE, ORDER BY, LIMIT) and is typically converted into an executable query (e.g., BigQuery SQL) by the backend service to retrieve data for analysis or visualization.",
    ).optional(),
    sqlQueryText: z.string().describe(
      "Optional. A Log Analytics SQL query in text format.If both sql_query_text and query_builder fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set.",
    ).optional(),
  }).describe("Describes a query that can be run in Log Analytics.").optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED"]).describe(
    "Required. The visibility status of this query, which determines its ownership.",
  ).optional(),
  savedQueryId: z.string().describe(
    "Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  loggingQuery: z.object({
    filter: z.string(),
    summaryFieldEnd: z.number(),
    summaryFieldStart: z.number(),
    summaryFields: z.array(z.object({
      field: z.string(),
    })),
  }).optional(),
  name: z.string(),
  opsAnalyticsQuery: z.object({
    queryBuilder: z.object({
      fieldSources: z.array(z.object({
        aliasRef: z.string(),
        columnType: z.string(),
        field: z.string(),
        isJson: z.boolean(),
        parentPath: z.string(),
        projectedField: z.object({
          alias: z.unknown(),
          cast: z.unknown(),
          field: z.unknown(),
          operation: z.unknown(),
          regexExtraction: z.unknown(),
          sqlAggregationFunction: z.unknown(),
          truncationGranularity: z.unknown(),
          virtualField: z.unknown(),
        }),
      })),
      filter: z.object({
        childPredicates: z.array(z.record(z.string(), z.unknown())),
        leafPredicate: z.object({
          comparator: z.string(),
          fieldSource: z.object({
            aliasRef: z.unknown(),
            columnType: z.unknown(),
            field: z.unknown(),
            isJson: z.unknown(),
            parentPath: z.unknown(),
            projectedField: z.unknown(),
          }),
          fieldSourceValue: z.object({
            aliasRef: z.unknown(),
            columnType: z.unknown(),
            field: z.unknown(),
            isJson: z.unknown(),
            parentPath: z.unknown(),
            projectedField: z.unknown(),
          }),
          isNegation: z.boolean(),
          literalValue: z.string(),
        }),
        operatorType: z.string(),
      }),
      limit: z.string(),
      orderBys: z.array(z.object({
        fieldSource: z.object({
          aliasRef: z.unknown(),
          columnType: z.unknown(),
          field: z.unknown(),
          isJson: z.unknown(),
          parentPath: z.unknown(),
          projectedField: z.unknown(),
        }),
        sortOrderDirection: z.string(),
      })),
      resourceNames: z.array(z.string()),
      searchTerm: z.string(),
    }),
    sqlQueryText: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe(
    "Optional. A human readable description of the saved query.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user specified title for the SavedQuery.",
  ).optional(),
  loggingQuery: z.object({
    filter: z.string().describe(
      "Required. An advanced query using the Logging Query Language (https://docs.cloud.google.com/logging/docs/view/logging-query-language). The maximum length of the filter is 20000 characters.",
    ).optional(),
    summaryFieldEnd: z.number().int().describe(
      "Characters will be counted from the end of the string.",
    ).optional(),
    summaryFieldStart: z.number().int().describe(
      "Characters will be counted from the start of the string.",
    ).optional(),
    summaryFields: z.array(z.object({
      field: z.string().describe(
        "Optional. The field from the LogEntry to include in the summary line, for example resource.type or jsonPayload.name.",
      ).optional(),
    })).describe(
      "Optional. The set of summary fields to display for this saved query.",
    ).optional(),
  }).describe(
    "Describes a Cloud Logging query that can be run in Logs Explorer UI or via the logging API.In addition to the query itself, additional information may be stored to capture the display configuration and other UI state used in association with analysis of query results.",
  ).optional(),
  opsAnalyticsQuery: z.object({
    queryBuilder: z.object({
      fieldSources: z.array(z.object({
        aliasRef: z.string().describe(
          "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
        ).optional(),
        columnType: z.string().describe(
          "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
        ).optional(),
        field: z.string().describe(
          "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
        ).optional(),
        isJson: z.boolean().describe(
          "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
        ).optional(),
        parentPath: z.string().describe(
          "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
        ).optional(),
        projectedField: z.object({
          alias: z.unknown().describe(
            'The alias name for the field. Valid alias examples are: - single word alias: TestAlias - numbers in an alias: Alias123 - multi word alias should be enclosed in quotes: "Test Alias" Invalid alias examples are: - alias containing keywords: WHERE, SELECT, FROM, etc. - alias starting with a number: 1stAlias',
          ).optional(),
          cast: z.unknown().describe(
            "The cast for the field. This can any SQL cast type. Examples: - STRING - CHAR - DATE - TIMESTAMP - DATETIME - INT - FLOAT",
          ).optional(),
          field: z.unknown().describe(
            "Optional. The field name. This will be the field that is selected using the dot notation to display the drill down value.",
          ).optional(),
          operation: z.unknown().describe(
            "Specifies the role of this field (direct selection, grouping, or aggregation).",
          ).optional(),
          regexExtraction: z.unknown().describe(
            'The re2 extraction for the field. This will be used to extract the value from the field using REGEXP_EXTRACT. More information on re2 can be found here: https://github.com/google/re2/wiki/Syntax. Meta characters like +?()| will need to be escaped. Examples: - ".(autoscaler.*)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(.*(autoscaler.*)$)")in SQL. - "\\(test_value\\)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(\\(test_value\\)$)") in SQL.',
          ).optional(),
          sqlAggregationFunction: z.unknown().describe(
            "Defines the aggregation function to apply to this field. This message is used only when operation is set to AGGREGATE.",
          ).optional(),
          truncationGranularity: z.unknown().describe(
            "The truncation granularity when grouping by a time/date field. This will be used to truncate the field to the granularity specified. This can be either a date or a time granularity found at https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date and https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time respectively.",
          ).optional(),
          virtualField: z.unknown().describe(
            "A virtual field is a field that is not physically present in the underlying data schema, but is created through specific operations within the query builder model based on other fields in the schema.",
          ).optional(),
        }).describe(
          "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
        ).optional(),
      })).describe(
        "Defines the items to include in the query result, analogous to a SQL SELECT clause.",
      ).optional(),
      filter: z.object({
        childPredicates: z.array(z.record(z.string(), z.unknown())).describe(
          "The children of the filter predicate. This equates to the branches of the filter predicate that could contain further nested leaves.",
        ).optional(),
        leafPredicate: z.object({
          comparator: z.enum([
            "COMPARATOR_UNSPECIFIED",
            "EQUALS",
            "MATCHES_REGEXP",
            "GREATER_THAN",
            "LESS_THAN",
            "GREATER_THAN_EQUALS",
            "LESS_THAN_EQUALS",
            "IS_NULL",
            "IN",
            "LIKE",
          ]).describe("The comparison type to use for the filter.").optional(),
          fieldSource: z.object({
            aliasRef: z.unknown().describe(
              "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
            ).optional(),
            columnType: z.unknown().describe(
              "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
            ).optional(),
            field: z.unknown().describe(
              "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
            ).optional(),
            isJson: z.unknown().describe(
              "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
            ).optional(),
            parentPath: z.unknown().describe(
              "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
            ).optional(),
            projectedField: z.unknown().describe(
              "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
            ).optional(),
          }).describe(
            'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
          ).optional(),
          fieldSourceValue: z.object({
            aliasRef: z.unknown().describe(
              "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
            ).optional(),
            columnType: z.unknown().describe(
              "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
            ).optional(),
            field: z.unknown().describe(
              "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
            ).optional(),
            isJson: z.unknown().describe(
              "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
            ).optional(),
            parentPath: z.unknown().describe(
              "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
            ).optional(),
            projectedField: z.unknown().describe(
              "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
            ).optional(),
          }).describe(
            'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
          ).optional(),
          isNegation: z.boolean().describe(
            "Determines if the NOT flag should be added to the comparator.",
          ).optional(),
          literalValue: z.string().describe(
            "The Value will be used to hold user defined constants set as the Right Hand Side of the filter.",
          ).optional(),
        }).describe(
          "This is a leaf of the FilterPredicate. Ex: { field: json_payload.message.error_code, filter_value: {numeric_value: 400}, comparator: EQUAL_TO} The field will be schema field that is selected using the. annotation to display the drill down value. The value will be the user inputted text that the filter is comparing against.",
        ).optional(),
        operatorType: z.enum(["OPERATOR_TYPE_UNSPECIFIED", "AND", "OR", "LEAF"])
          .describe(
            "The operator type for the filter. Currently there is no support for multiple levels of nesting, so this will be a single value with no joining of different operator types",
          ).optional(),
      }).describe(
        "A filter for a query. This equates to the WHERE clause in SQL.",
      ).optional(),
      limit: z.string().describe(
        "The limit to use for the query. This equates to the LIMIT clause in SQL. A limit of 0 will be treated as not enabled.",
      ).optional(),
      orderBys: z.array(z.object({
        fieldSource: z.object({
          aliasRef: z.unknown().describe(
            "The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid.",
          ).optional(),
          columnType: z.unknown().describe(
            "The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON",
          ).optional(),
          field: z.unknown().describe(
            "The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\\my-custom-field`.value *jsonPayload.`my key with spaces`.data`",
          ).optional(),
          isJson: z.unknown().describe(
            "Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING.",
          ).optional(),
          parentPath: z.unknown().describe(
            "The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level.",
          ).optional(),
          projectedField: z.unknown().describe(
            "Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).",
          ).optional(),
        }).describe(
          'A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.',
        ).optional(),
        sortOrderDirection: z.enum([
          "SORT_ORDER_UNSPECIFIED",
          "SORT_ORDER_NONE",
          "SORT_ORDER_ASCENDING",
          "SORT_ORDER_DESCENDING",
        ]).describe("The sort order to use for the query.").optional(),
      })).describe(
        "The sort orders to use for the query. This equates to the ORDER BY clause in SQL.",
      ).optional(),
      resourceNames: z.array(z.string()).describe(
        'Required. The view/resource to query. For now only a single view/resource will be sent, but there are plans to allow multiple views in the future. Marking as repeated for that purpose. Example: - "projects/123/locations/global/buckets/456/views/_Default" - "projects/123/locations/global/metricBuckets/456/views/_Default"',
      ).optional(),
      searchTerm: z.string().describe(
        "The plain text search to use for the query. There is no support for multiple search terms. This uses the SEARCH functionality in BigQuery. For example, a search_term = 'ERROR' would result in the following SQL:SELECT * FROM resource WHERE SEARCH(resource, 'ERROR') LIMIT 100",
      ).optional(),
    }).describe(
      "Defines a structured query configuration that can be used instead of writing raw SQL. This configuration represents the components of a SQL query (FROM, SELECT, WHERE, ORDER BY, LIMIT) and is typically converted into an executable query (e.g., BigQuery SQL) by the backend service to retrieve data for analysis or visualization.",
    ).optional(),
    sqlQueryText: z.string().describe(
      "Optional. A Log Analytics SQL query in text format.If both sql_query_text and query_builder fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set.",
    ).optional(),
  }).describe("Describes a query that can be run in Log Analytics.").optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED"]).describe(
    "Required. The visibility status of this query, which determines its ownership.",
  ).optional(),
  savedQueryId: z.string().describe(
    "Optional. The ID to use for the saved query, which will become the final component of the saved query's resource name.If the saved_query_id is not provided, the system will generate an alphanumeric ID.The saved_query_id is limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Logging SavedQueries. Registered at `@swamp/gcp/logging/savedqueries`. */
export const model = {
  type: "@swamp/gcp/logging/savedqueries",
  version: "2026.05.29.1",
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
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Describes a query that has been saved by a user.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a savedQueries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["loggingQuery"] !== undefined) {
          body["loggingQuery"] = g["loggingQuery"];
        }
        if (g["opsAnalyticsQuery"] !== undefined) {
          body["opsAnalyticsQuery"] = g["opsAnalyticsQuery"];
        }
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["savedQueryId"] !== undefined) {
          body["savedQueryId"] = g["savedQueryId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a savedQueries",
      arguments: z.object({
        identifier: z.string().describe("The name of the savedQueries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update savedQueries attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["loggingQuery"] !== undefined) {
          body["loggingQuery"] = g["loggingQuery"];
        }
        if (g["opsAnalyticsQuery"] !== undefined) {
          body["opsAnalyticsQuery"] = g["opsAnalyticsQuery"];
        }
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Delete the savedQueries",
      arguments: z.object({
        identifier: z.string().describe("The name of the savedQueries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync savedQueries state from GCP",
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
            String(g["parent"] ?? ""),
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
    list: {
      description: "List savedQueries resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.The two supported type function calls are: type("Logging") type("OpsAnalytics")The two supported visibility tokens are: visibility = PRIVATE visibility = SHAREDFor example:type("Logging") AND visibility = PRIVATE visibility=SHARED type("OpsAnalytics") type("OpsAnalytics)" visibility = PRIVATE visibility = SHARED',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return from this request.Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "savedQueries",
          (args.maxPages as number | undefined) ?? 10,
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
  },
};
