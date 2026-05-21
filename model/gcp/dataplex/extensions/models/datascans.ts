// Auto-generated extension model for @swamp/gcp/dataplex/datascans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex DataScans.
 *
 * Represents a user-visible job which provides the insights for the related data source.For example: Data quality: generates queries based on the rules and runs against the data to get data quality check results. For more information, see Auto data quality overview (https://cloud.google.com/dataplex/docs/auto-data-quality-overview). Data profile: analyzes the data in tables and generates insights about the structure, content and relationships (such as null percent, cardinality, min/max/mean, etc). For more information, see About data profiling (https://cloud.google.com/dataplex/docs/data-profiling-overview). Data discovery: scans data in Cloud Storage buckets to extract and then catalog metadata. For more information, see Discover and catalog Cloud Storage data (https://cloud.google.com/bigquery/docs/automatic-discovery). Data documentation: analyzes the table or dataset metadata and generates insights. For tables, insights include descriptions and sample SQL queries. For datasets, insights include descriptions, schema relationships and sample SQL queries. For more information, see Generate data insights in BigQuery (https://cloud.google.com/bigquery/docs/data-insights).
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
  return `${parent}/dataScans/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.create",
  "path": "v1/{+parent}/dataScans",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dataScanId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.list",
  "path": "v1/{+parent}/dataScans",
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
  data: z.object({
    entity: z.string().describe(
      "Immutable. The Dataplex Universal Catalog entity that represents the data source (e.g. BigQuery table) for DataScan, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.",
    ).optional(),
    resource: z.string().describe(
      'Immutable. The service-qualified full resource name of the cloud resource for a DataScan job to scan against. The field could either be: Cloud Storage bucket for DataDiscoveryScan Format: //storage.googleapis.com/projects/PROJECT_ID/buckets/BUCKET_ID or BigQuery table of type "TABLE" for DataProfileScan/DataQualityScan/DataDocumentationScan Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or BigQuery dataset for DataDocumentationScan only Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID',
    ).optional(),
  }).describe("The data source for DataScan.").optional(),
  dataDiscoveryResult: z.object({
    bigqueryPublishing: z.object({
      dataset: z.string().describe(
        "Output only. The BigQuery dataset the discovered tables are published to.",
      ).optional(),
      location: z.string().describe(
        "Output only. The location of the BigQuery publishing dataset.",
      ).optional(),
    }).describe("Describes BigQuery publishing configurations.").optional(),
    scanStatistics: z.object({
      dataProcessedBytes: z.string().describe("The data processed in bytes.")
        .optional(),
      filesExcluded: z.number().int().describe("The number of files excluded.")
        .optional(),
      filesetsCreated: z.number().int().describe(
        "The number of filesets created.",
      ).optional(),
      filesetsDeleted: z.number().int().describe(
        "The number of filesets deleted.",
      ).optional(),
      filesetsUpdated: z.number().int().describe(
        "The number of filesets updated.",
      ).optional(),
      scannedFileCount: z.number().int().describe(
        "The number of files scanned.",
      ).optional(),
      tablesCreated: z.number().int().describe("The number of tables created.")
        .optional(),
      tablesDeleted: z.number().int().describe("The number of tables deleted.")
        .optional(),
      tablesUpdated: z.number().int().describe("The number of tables updated.")
        .optional(),
    }).describe("Describes result statistics of a data scan discovery job.")
      .optional(),
  }).describe("The output of a data discovery scan.").optional(),
  dataDiscoverySpec: z.object({
    bigqueryPublishingConfig: z.object({
      connection: z.string().describe(
        "Optional. The BigQuery connection used to create BigLake tables. Must be in the form projects/{project_id}/locations/{location_id}/connections/{connection_id}",
      ).optional(),
      location: z.string().describe(
        "Optional. The location of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. 1. If the Cloud Storage bucket is located in a multi-region bucket, then BigQuery dataset can be in the same multi-region bucket or any single region that is included in the same multi-region bucket. The datascan can be created in any single region that is included in the same multi-region bucket 2. If the Cloud Storage bucket is located in a dual-region bucket, then BigQuery dataset can be located in regions that are included in the dual-region bucket, or in a multi-region that includes the dual-region. The datascan can be created in any single region that is included in the same dual-region bucket. 3. If the Cloud Storage bucket is located in a single region, then BigQuery dataset can be in the same single region or any multi-region bucket that includes the same single region. The datascan will be created in the same single region as the bucket. 4. If the BigQuery dataset is in single region, it must be in the same single region as the datascan.For supported values, refer to https://cloud.google.com/bigquery/docs/locations#supported_locations.",
      ).optional(),
      project: z.string().describe(
        'Optional. The project of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. If not specified, the project of the Cloud Storage bucket will be used. The format is "projects/{project_id_or_number}".',
      ).optional(),
      tableType: z.enum(["TABLE_TYPE_UNSPECIFIED", "EXTERNAL", "BIGLAKE"])
        .describe(
          "Optional. Determines whether to publish discovered tables as BigLake external tables or non-BigLake external tables.",
        ).optional(),
    }).describe("Describes BigQuery publishing configurations.").optional(),
    storageConfig: z.object({
      csvOptions: z.object({
        delimiter: z.string().describe(
          "Optional. The delimiter that is used to separate values. The default is, (comma).",
        ).optional(),
        encoding: z.string().describe(
          "Optional. The character encoding of the data. The default is UTF-8.",
        ).optional(),
        headerRows: z.number().int().describe(
          "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows.",
        ).optional(),
        quote: z.string().describe(
          'Optional. The character used to quote column values. Accepts " (double quotation mark) or \' (single quotation mark). If unspecified, defaults to " (double quotation mark).',
        ).optional(),
        typeInferenceDisabled: z.boolean().describe(
          "Optional. Whether to disable the inference of data types for CSV data. If true, all columns are registered as strings.",
        ).optional(),
      }).describe("Describes CSV and similar semi-structured data formats.")
        .optional(),
      excludePatterns: z.array(z.string()).describe(
        "Optional. Defines the data to exclude during discovery. Provide a list of patterns that identify the data to exclude. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names.",
      ).optional(),
      includePatterns: z.array(z.string()).describe(
        "Optional. Defines the data to include during discovery when only a subset of the data should be considered. Provide a list of patterns that identify the data to include. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names.",
      ).optional(),
      jsonOptions: z.object({
        encoding: z.string().describe(
          "Optional. The character encoding of the data. The default is UTF-8.",
        ).optional(),
        typeInferenceDisabled: z.boolean().describe(
          "Optional. Whether to disable the inference of data types for JSON data. If true, all columns are registered as their primitive types (strings, number, or boolean).",
        ).optional(),
      }).describe("Describes JSON data format.").optional(),
      unstructuredDataOptions: z.object({
        entityInferenceEnabled: z.boolean().describe(
          "Optional. Deprecated: Use semantic_inference_enabled instead. Specifies whether deeper entity inference over the objects' contents using GenAI is enabled.",
        ).optional(),
        semanticInferenceEnabled: z.boolean().describe(
          "Optional. Specifies whether deeper semantic inference over the objects' contents using GenAI is enabled.",
        ).optional(),
      }).describe("Describes options for unstructured data discovery.")
        .optional(),
    }).describe("Configurations related to Cloud Storage as the data source.")
      .optional(),
  }).describe("Spec for a data discovery scan.").optional(),
  dataDocumentationResult: z.object({
    datasetResult: z.object({
      overview: z.string().describe(
        "Output only. Generated Dataset description.",
      ).optional(),
      queries: z.array(z.object({
        description: z.string().describe(
          "Output only. The description for the query.",
        ).optional(),
        sql: z.string().describe(
          "Output only. The SQL query string which can be executed.",
        ).optional(),
      })).describe("Output only. Sample SQL queries for the dataset.")
        .optional(),
      schemaRelationships: z.array(z.object({
        leftSchemaPaths: z.object({
          paths: z.unknown().describe(
            "Output only. An ordered set of Paths to fields within the schema of the table. For fields nested within a top level field of type record, use '.' to separate field names. Examples: Top level field - top_level Nested field - top_level.child.sub_field",
          ).optional(),
          tableFqn: z.unknown().describe(
            "Output only. The service-qualified full resource name of the table Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
          ).optional(),
        }).describe(
          "Represents an ordered set of paths within a table's schema.",
        ).optional(),
        rightSchemaPaths: z.object({
          paths: z.unknown().describe(
            "Output only. An ordered set of Paths to fields within the schema of the table. For fields nested within a top level field of type record, use '.' to separate field names. Examples: Top level field - top_level Nested field - top_level.child.sub_field",
          ).optional(),
          tableFqn: z.unknown().describe(
            "Output only. The service-qualified full resource name of the table Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
          ).optional(),
        }).describe(
          "Represents an ordered set of paths within a table's schema.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Output only. Sources which generated the schema relation edge.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "SCHEMA_JOIN"]).describe(
          "Output only. The type of relationship between the schema paths.",
        ).optional(),
      })).describe(
        "Output only. Relationships suggesting how tables in the dataset are related to each other, based on their schema.",
      ).optional(),
    }).describe("Insights for a dataset resource.").optional(),
    tableResult: z.object({
      name: z.string().describe(
        "Output only. The service-qualified full resource name of the cloud resource. Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
      ).optional(),
      overview: z.string().describe(
        "Output only. Generated description of the table.",
      ).optional(),
      queries: z.array(z.object({
        description: z.string().describe(
          "Output only. The description for the query.",
        ).optional(),
        sql: z.string().describe(
          "Output only. The SQL query string which can be executed.",
        ).optional(),
      })).describe("Output only. Sample SQL queries for the table.").optional(),
      schema: z.object({
        fields: z.array(z.object({
          description: z.unknown().describe(
            "Output only. Generated description for columns and fields.",
          ).optional(),
          fields: z.unknown().describe("Output only. Nested fields.")
            .optional(),
          name: z.unknown().describe("Output only. The name of the column.")
            .optional(),
        })).describe("Output only. The list of columns.").optional(),
      }).describe("Schema of the table with generated metadata of columns.")
        .optional(),
    }).describe("Insights for a table resource.").optional(),
  }).describe("The output of a DataDocumentation scan.").optional(),
  dataDocumentationSpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. Whether to publish result to Dataplex Catalog.",
    ).optional(),
    generationScopes: z.array(
      z.enum([
        "GENERATION_SCOPE_UNSPECIFIED",
        "ALL",
        "TABLE_AND_COLUMN_DESCRIPTIONS",
        "SQL_QUERIES",
      ]),
    ).describe(
      "Optional. Specifies which components of the data documentation to generate. Any component that is required to generate the specified components will also be generated. If no generation scope is specified, all available documentation components will be generated.",
    ).optional(),
  }).describe("DataDocumentation scan related spec.").optional(),
  dataProfileResult: z.object({
    catalogPublishingStatus: z.object({
      state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
        .describe("Output only. Execution state for publishing.").optional(),
    }).describe(
      "The status of publishing the data scan result as Dataplex Universal Catalog metadata. Multiple DataScan log events may exist, each with different publishing information depending on the type of publishing triggered.",
    ).optional(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string().describe(
          "Output only. Additional information about the BigQuery exporting.",
        ).optional(),
        state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
          .describe("Output only. Execution state for the BigQuery exporting.")
          .optional(),
      }).describe("The result of BigQuery export post scan action.").optional(),
    }).describe("The result of post scan actions of DataProfileScan job.")
      .optional(),
    profile: z.object({
      fields: z.array(z.object({
        mode: z.string().describe(
          "Output only. The mode of the field. Possible values include: REQUIRED, if it is a required field. NULLABLE, if it is an optional field. REPEATED, if it is a repeated field.",
        ).optional(),
        name: z.string().describe("Output only. The name of the field.")
          .optional(),
        profile: z.object({
          distinctRatio: z.unknown().describe(
            "Output only. Ratio of rows with distinct values against total scanned rows. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode.",
          ).optional(),
          doubleProfile: z.unknown().describe(
            "The profile information for a double type field.",
          ).optional(),
          integerProfile: z.unknown().describe(
            "The profile information for an integer type field.",
          ).optional(),
          nullRatio: z.unknown().describe(
            "Output only. Ratio of rows with null value against total scanned rows.",
          ).optional(),
          stringProfile: z.unknown().describe(
            "The profile information for a string type field.",
          ).optional(),
          topNValues: z.unknown().describe(
            "Output only. The list of top N non-null values, frequency and ratio with which they occur in the scanned data. N is 10 or equal to the number of distinct values in the field, whichever is smaller. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode.",
          ).optional(),
        }).describe("The profile information for each field type.").optional(),
        type: z.string().describe(
          "Output only. The data type retrieved from the schema of the data source. For instance, for a BigQuery native table, it is the BigQuery Table Schema (https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tablefieldschema). For a Dataplex Universal Catalog Entity, it is the Entity Schema (https://cloud.google.com/dataplex/docs/reference/rpc/google.cloud.dataplex.v1#type_3).",
        ).optional(),
      })).describe(
        "Output only. List of fields with structural and profile information for each field.",
      ).optional(),
    }).describe(
      "Contains name, type, mode and field type specific profile information.",
    ).optional(),
    rowCount: z.string().describe("Output only. The count of rows scanned.")
      .optional(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string().describe(
          "Output only. Value that marks the end of the range.",
        ).optional(),
        field: z.string().describe(
          "Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column).",
        ).optional(),
        start: z.string().describe(
          "Output only. Value that marks the start of the range.",
        ).optional(),
      }).describe(
        "A data range denoted by a pair of start/end values of a field.",
      ).optional(),
    }).describe(
      "The data scanned during processing (e.g. in incremental DataScan)",
    ).optional(),
  }).describe(
    "DataProfileResult defines the output of DataProfileScan. Each field of the table will have field type specific profile result.",
  ).optional(),
  dataProfileSpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata.",
    ).optional(),
    excludeFields: z.object({
      fieldNames: z.array(z.string()).describe(
        "Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'.",
      ).optional(),
    }).describe(
      "The specification for fields to include or exclude in data profile scan.",
    ).optional(),
    includeFields: z.object({
      fieldNames: z.array(z.string()).describe(
        "Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'.",
      ).optional(),
    }).describe(
      "The specification for fields to include or exclude in data profile scan.",
    ).optional(),
    mode: z.enum(["MODE_UNSPECIFIED", "STANDARD", "LIGHTWEIGHT"]).describe(
      "Optional. The execution mode for the profile scan.",
    ).optional(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string().describe(
          "Optional. The BigQuery table to export DataProfileScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
        ).optional(),
      }).describe("The configuration of BigQuery export post scan action.")
        .optional(),
    }).describe(
      "The configuration of post scan actions of DataProfileScan job.",
    ).optional(),
    rowFilter: z.string().describe(
      "Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in BigQuery standard SQL syntax. Example: col1 >= 0 AND col2 < 10",
    ).optional(),
    samplingPercent: z.number().describe(
      "Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100.",
    ).optional(),
  }).describe("DataProfileScan related setting.").optional(),
  dataQualityResult: z.object({
    anomalyDetectionGeneratedAssets: z.object({
      dataIntermediateTable: z.string().describe(
        "Output only. The intermediate table for data anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
      freshnessIntermediateTable: z.string().describe(
        "Output only. The intermediate table for freshness anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
      resultTable: z.string().describe(
        "Output only. The result table for anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID If the result table is set at AnomalyDetectionAssets, the result table here would be the same as the one set in the AnomalyDetectionAssets.result_table.",
      ).optional(),
      volumeIntermediateTable: z.string().describe(
        "Output only. The intermediate table for volume anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
    }).describe("The assets generated by Anomaly Detection Data Scan.")
      .optional(),
    catalogPublishingStatus: z.object({
      state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
        .describe("Output only. Execution state for publishing.").optional(),
    }).describe(
      "The status of publishing the data scan result as Dataplex Universal Catalog metadata. Multiple DataScan log events may exist, each with different publishing information depending on the type of publishing triggered.",
    ).optional(),
    columns: z.array(z.object({
      column: z.string().describe(
        "Output only. The column specified in the DataQualityRule.",
      ).optional(),
      dimensions: z.array(z.object({
        dimension: z.unknown().describe(
          "A dimension captures data quality intent about a defined subset of the rules specified.",
        ).optional(),
        passed: z.unknown().describe(
          "Output only. Whether the dimension passed or failed.",
        ).optional(),
        score: z.unknown().describe(
          "Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points).",
        ).optional(),
      })).describe("Output only. The dimension-level results for this column.")
        .optional(),
      passed: z.boolean().describe(
        "Output only. Whether the column passed or failed.",
      ).optional(),
      score: z.number().describe(
        "Output only. The column-level data quality score for this data scan job if and only if the 'column' field is set.The score ranges between between 0, 100 (up to two decimal points).",
      ).optional(),
    })).describe(
      "Output only. A list of results at the column level.A column will have a corresponding DataQualityColumnResult if and only if there is at least one rule with the 'column' field set to it.",
    ).optional(),
    dimensions: z.array(z.object({
      dimension: z.object({
        name: z.string().describe(
          "Output only. The dimension name a rule belongs to. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
        ).optional(),
      }).describe(
        "A dimension captures data quality intent about a defined subset of the rules specified.",
      ).optional(),
      passed: z.boolean().describe(
        "Output only. Whether the dimension passed or failed.",
      ).optional(),
      score: z.number().describe(
        "Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points).",
      ).optional(),
    })).describe(
      "Output only. A list of results at the dimension level.A dimension will have a corresponding DataQualityDimensionResult if and only if there is at least one rule with the 'dimension' field set to it.",
    ).optional(),
    passed: z.boolean().describe(
      "Output only. Overall data quality result -- true if all rules passed.",
    ).optional(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string().describe(
          "Output only. Additional information about the BigQuery exporting.",
        ).optional(),
        state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
          .describe("Output only. Execution state for the BigQuery exporting.")
          .optional(),
      }).describe("The result of BigQuery export post scan action.").optional(),
    }).describe("The result of post scan actions of DataQualityScan job.")
      .optional(),
    rowCount: z.string().describe("Output only. The count of rows processed.")
      .optional(),
    rules: z.array(z.object({
      assertionRowCount: z.string().describe(
        "Output only. The number of rows returned by the SQL statement in a SQL assertion rule.This field is only valid for SQL assertion rules.",
      ).optional(),
      debugQueriesResultSets: z.array(z.object({
        results: z.unknown().describe(
          "Output only. Contains all results. Up to 10 results can be returned.",
        ).optional(),
      })).describe(
        "Output only. Contains the results of all debug queries for this rule. The number of result sets will correspond to the number of debug_queries.",
      ).optional(),
      evaluatedCount: z.string().describe(
        "Output only. The number of rows a rule was evaluated against.This field is only valid for row-level type rules.Evaluated count can be configured to either include all rows (default) - with null rows automatically failing rule evaluation, or exclude null rows from the evaluated_count, by setting ignore_nulls = true.This field is not set for rule SqlAssertion.",
      ).optional(),
      failingRowsQuery: z.string().describe(
        "Output only. The query to find rows that did not pass this rule.This field is only valid for row-level type rules.",
      ).optional(),
      nullCount: z.string().describe(
        "Output only. The number of rows with null values in the specified column.",
      ).optional(),
      passRatio: z.number().describe(
        "Output only. The ratio of passed_count / evaluated_count.This field is only valid for row-level type rules.",
      ).optional(),
      passed: z.boolean().describe(
        "Output only. Whether the rule passed or failed.",
      ).optional(),
      passedCount: z.string().describe(
        "Output only. The number of rows which passed a rule evaluation.This field is only valid for row-level type rules.This field is not set for rule SqlAssertion.",
      ).optional(),
      rule: z.object({
        attributes: z.record(z.string(), z.unknown()).describe(
          "Optional. Map of attribute name and value linked to the rule. The rules to evaluate can be filtered based on attributes provided here and a filter expression provided in the DataQualitySpec.filter field.",
        ).optional(),
        column: z.string().describe(
          "Optional. The unnested column which this rule is evaluated against.",
        ).optional(),
        debugQueries: z.array(z.unknown()).describe(
          "Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future.",
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the rule. The maximum length is 1,024 characters.",
        ).optional(),
        dimension: z.string().describe(
          "Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
        ).optional(),
        ignoreNull: z.boolean().describe(
          "Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation",
        ).optional(),
        name: z.string().describe(
          "Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter.",
        ).optional(),
        nonNullExpectation: z.object({}).describe(
          "Evaluates whether each column value is null.",
        ).optional(),
        rangeExpectation: z.object({
          maxValue: z.unknown().describe(
            "Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
          ).optional(),
          minValue: z.unknown().describe(
            "Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
          ).optional(),
          strictMaxEnabled: z.unknown().describe(
            "Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
          ).optional(),
          strictMinEnabled: z.unknown().describe(
            "Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value lies between a specified range.",
        ).optional(),
        regexExpectation: z.object({
          regex: z.unknown().describe(
            "Optional. A regular expression the column value is expected to match.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value matches a specified regex.",
        ).optional(),
        rowConditionExpectation: z.object({
          sqlExpression: z.unknown().describe("Optional. The SQL expression.")
            .optional(),
        }).describe(
          "Evaluates whether each row passes the specified condition.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a boolean value per row as the result.Example: col1 >= 0 AND col2 < 10",
        ).optional(),
        ruleSource: z.object({
          rulePathElements: z.unknown().describe(
            "Output only. Rule path elements represent information about the individual items in the relationship path between the scan resource and rule origin in that order.",
          ).optional(),
        }).describe("Represents the rule source information from Catalog.")
          .optional(),
        setExpectation: z.object({
          values: z.unknown().describe(
            "Optional. Expected values for the column value.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value is contained by a specified set.",
        ).optional(),
        sqlAssertion: z.object({
          sqlStatement: z.unknown().describe("Optional. The SQL statement.")
            .optional(),
        }).describe(
          "A SQL statement that is evaluated to return rows that match an invalid state. If any rows are are returned, this rule fails.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).Example: SELECT * FROM ${data()} WHERE price < 0",
        ).optional(),
        statisticRangeExpectation: z.object({
          maxValue: z.unknown().describe(
            "Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
          ).optional(),
          minValue: z.unknown().describe(
            "Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
          ).optional(),
          statistic: z.unknown().describe(
            "Optional. The aggregate metric to evaluate.",
          ).optional(),
          strictMaxEnabled: z.unknown().describe(
            "Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
          ).optional(),
          strictMinEnabled: z.unknown().describe(
            "Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
          ).optional(),
        }).describe(
          "Evaluates whether the column aggregate statistic lies between a specified range.",
        ).optional(),
        suspended: z.boolean().describe(
          "Optional. Whether the Rule is active or suspended. Default is false.",
        ).optional(),
        tableConditionExpectation: z.object({
          sqlExpression: z.unknown().describe("Optional. The SQL expression.")
            .optional(),
        }).describe(
          "Evaluates whether the provided expression is true.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a scalar boolean result.Example: MIN(col1) >= 0",
        ).optional(),
        templateReference: z.object({
          name: z.unknown().describe(
            "Required. The template entry name. Entry must be of EntryType projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template and contains top-level aspect of AspectType projects/dataplex-types/locations/global/aspectTypes/data-quality-rule-template. The format is: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
          ).optional(),
          resolvedSql: z.unknown().describe(
            "Output only. The resolved SQL statement generated from the template with parameters substituted. It is only populated in the result.",
          ).optional(),
          ruleTemplate: z.unknown().describe(
            "DataQualityRuleTemplate represents a template which can be reused across multiple data quality rules.",
          ).optional(),
          values: z.unknown().describe(
            "Optional. Provides the map of parameter name and value. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
        }).describe(
          "A rule that constructs a SQL statement to evaluate using a rule template and parameter values. If the constructed statement returns any rows, this rule fails",
        ).optional(),
        threshold: z.number().describe(
          "Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules.",
        ).optional(),
        uniquenessExpectation: z.object({}).describe(
          "Evaluates whether the column has duplicates.",
        ).optional(),
      }).describe("A rule captures data quality intent about a data source.")
        .optional(),
    })).describe(
      "Output only. A list of all the rules in a job, and their results.",
    ).optional(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string().describe(
          "Output only. Value that marks the end of the range.",
        ).optional(),
        field: z.string().describe(
          "Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column).",
        ).optional(),
        start: z.string().describe(
          "Output only. Value that marks the start of the range.",
        ).optional(),
      }).describe(
        "A data range denoted by a pair of start/end values of a field.",
      ).optional(),
    }).describe(
      "The data scanned during processing (e.g. in incremental DataScan)",
    ).optional(),
    score: z.number().describe(
      "Output only. The overall data quality score.The score ranges between 0, 100 (up to two decimal points).",
    ).optional(),
  }).describe("The output of a DataQualityScan.").optional(),
  dataQualitySpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata.",
    ).optional(),
    enableCatalogBasedRules: z.boolean().describe(
      "Optional. If enabled, the data scan will retrieve rules defined in the dataplex-types.global.data-rules aspect on all paths of the catalog entry corresponding to the BigQuery table resource and all attached glossary terms. The path that data-rules aspect is attached on the table entry defines the column that the rule will be evaluated against. For glossary terms, the path that the terms are attached on the table entry defines the column that the rule will be evaluated against. At the start of scan execution, the rules reflect the latest state retrieved from the catalog entry and any updates on the rules thereafter are ignored for that execution. The updates will be reflected from the next execution. Rules defined in the datascan must be empty if this field is enabled.",
    ).optional(),
    filter: z.string().describe(
      "Optional. Filter for selectively running a subset of rules. You can filter the request by the name or attribute key-value pairs defined on the rule. If not specified, all rules are run. The filter is applicable to both, the rules retrieved from catalog and explicitly defined rules in the scan. Please see filter syntax (https://docs.cloud.google.com/dataplex/docs/auto-data-quality-overview#rule-filtering) for more details.",
    ).optional(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string().describe(
          "Optional. The BigQuery table to export DataQualityScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
        ).optional(),
      }).describe("The configuration of BigQuery export post scan action.")
        .optional(),
      notificationReport: z.object({
        jobEndTrigger: z.object({}).describe(
          "This trigger is triggered whenever a scan job run ends, regardless of the result.",
        ).optional(),
        jobFailureTrigger: z.object({}).describe(
          "This trigger is triggered when the scan job itself fails, regardless of the result.",
        ).optional(),
        recipients: z.object({
          emails: z.array(z.unknown()).describe(
            "Optional. The email recipients who will receive the DataQualityScan results report.",
          ).optional(),
        }).describe(
          "The individuals or groups who are designated to receive notifications upon triggers.",
        ).optional(),
        scoreThresholdTrigger: z.object({
          scoreThreshold: z.number().describe(
            "Optional. The score range is in 0,100.",
          ).optional(),
        }).describe(
          "This trigger is triggered when the DQ score in the job result is less than a specified input score.",
        ).optional(),
      }).describe("The configuration of notification report post scan action.")
        .optional(),
    }).describe("The configuration of post scan actions of DataQualityScan.")
      .optional(),
    rowFilter: z.string().describe(
      "Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#where_clause).Example: col1 >= 0 AND col2 < 10",
    ).optional(),
    rules: z.array(z.object({
      attributes: z.record(z.string(), z.string()).describe(
        "Optional. Map of attribute name and value linked to the rule. The rules to evaluate can be filtered based on attributes provided here and a filter expression provided in the DataQualitySpec.filter field.",
      ).optional(),
      column: z.string().describe(
        "Optional. The unnested column which this rule is evaluated against.",
      ).optional(),
      debugQueries: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Specifies the description of the debug query. The maximum length is 1,024 characters.",
        ).optional(),
        sqlStatement: z.unknown().describe(
          "Required. Specifies the SQL statement to be executed.",
        ).optional(),
      })).describe(
        "Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the rule. The maximum length is 1,024 characters.",
      ).optional(),
      dimension: z.string().describe(
        "Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
      ).optional(),
      ignoreNull: z.boolean().describe(
        "Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation",
      ).optional(),
      name: z.string().describe(
        "Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter.",
      ).optional(),
      nonNullExpectation: z.object({}).describe(
        "Evaluates whether each column value is null.",
      ).optional(),
      rangeExpectation: z.object({
        maxValue: z.string().describe(
          "Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
        ).optional(),
        minValue: z.string().describe(
          "Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
        ).optional(),
        strictMaxEnabled: z.boolean().describe(
          "Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
        ).optional(),
        strictMinEnabled: z.boolean().describe(
          "Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value lies between a specified range.",
      ).optional(),
      regexExpectation: z.object({
        regex: z.string().describe(
          "Optional. A regular expression the column value is expected to match.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value matches a specified regex.",
      ).optional(),
      rowConditionExpectation: z.object({
        sqlExpression: z.string().describe("Optional. The SQL expression.")
          .optional(),
      }).describe(
        "Evaluates whether each row passes the specified condition.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a boolean value per row as the result.Example: col1 >= 0 AND col2 < 10",
      ).optional(),
      ruleSource: z.object({
        rulePathElements: z.array(z.unknown()).describe(
          "Output only. Rule path elements represent information about the individual items in the relationship path between the scan resource and rule origin in that order.",
        ).optional(),
      }).describe("Represents the rule source information from Catalog.")
        .optional(),
      setExpectation: z.object({
        values: z.array(z.unknown()).describe(
          "Optional. Expected values for the column value.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value is contained by a specified set.",
      ).optional(),
      sqlAssertion: z.object({
        sqlStatement: z.string().describe("Optional. The SQL statement.")
          .optional(),
      }).describe(
        "A SQL statement that is evaluated to return rows that match an invalid state. If any rows are are returned, this rule fails.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).Example: SELECT * FROM ${data()} WHERE price < 0",
      ).optional(),
      statisticRangeExpectation: z.object({
        maxValue: z.string().describe(
          "Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
        ).optional(),
        minValue: z.string().describe(
          "Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
        ).optional(),
        statistic: z.enum(["STATISTIC_UNDEFINED", "MEAN", "MIN", "MAX"])
          .describe("Optional. The aggregate metric to evaluate.").optional(),
        strictMaxEnabled: z.boolean().describe(
          "Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
        ).optional(),
        strictMinEnabled: z.boolean().describe(
          "Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
        ).optional(),
      }).describe(
        "Evaluates whether the column aggregate statistic lies between a specified range.",
      ).optional(),
      suspended: z.boolean().describe(
        "Optional. Whether the Rule is active or suspended. Default is false.",
      ).optional(),
      tableConditionExpectation: z.object({
        sqlExpression: z.string().describe("Optional. The SQL expression.")
          .optional(),
      }).describe(
        "Evaluates whether the provided expression is true.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a scalar boolean result.Example: MIN(col1) >= 0",
      ).optional(),
      templateReference: z.object({
        name: z.string().describe(
          "Required. The template entry name. Entry must be of EntryType projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template and contains top-level aspect of AspectType projects/dataplex-types/locations/global/aspectTypes/data-quality-rule-template. The format is: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
        ).optional(),
        resolvedSql: z.string().describe(
          "Output only. The resolved SQL statement generated from the template with parameters substituted. It is only populated in the result.",
        ).optional(),
        ruleTemplate: z.object({
          capabilities: z.unknown().describe(
            "Output only. A list of features or properties supported by this rule template.",
          ).optional(),
          dimension: z.unknown().describe(
            "Output only. The dimension a rule template belongs to. Rule level results are also aggregated at the dimension level.",
          ).optional(),
          inputParameters: z.unknown().describe(
            "Output only. Description for input parameters",
          ).optional(),
          name: z.unknown().describe(
            "Output only. The name of the rule template in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
          ).optional(),
          sqlCollection: z.unknown().describe(
            "Output only. Collection of SQLs for data quality rules. Currently only one SQL is supported.",
          ).optional(),
        }).describe(
          "DataQualityRuleTemplate represents a template which can be reused across multiple data quality rules.",
        ).optional(),
        values: z.record(z.string(), z.unknown()).describe(
          "Optional. Provides the map of parameter name and value. The maximum size of the field is 120KB (encoded as UTF-8).",
        ).optional(),
      }).describe(
        "A rule that constructs a SQL statement to evaluate using a rule template and parameter values. If the constructed statement returns any rows, this rule fails",
      ).optional(),
      threshold: z.number().describe(
        "Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules.",
      ).optional(),
      uniquenessExpectation: z.object({}).describe(
        "Evaluates whether the column has duplicates.",
      ).optional(),
    })).describe(
      "Required. The list of rules to evaluate against a data source. At least one rule is required.",
    ).optional(),
    samplingPercent: z.number().describe(
      "Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100.",
    ).optional(),
  }).describe("DataQualityScan related setting.").optional(),
  description: z.string().describe(
    "Optional. Description of the scan. Must be between 1-1024 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User friendly display name. Must be between 1-256 characters.",
  ).optional(),
  executionIdentity: z.object({
    dataplexServiceAgent: z.object({}).describe(
      "The Dataplex service agent associated with the user's project.",
    ).optional(),
    serviceAccount: z.object({
      email: z.string().describe(
        "Required. Service account email. The datascan will execute with this service account's credentials. The user calling this API must have permissions to act as this service account. Dataplex service agent must be granted iam.serviceAccounts.getAccessToken permission on this service account, for example, through the iam.serviceAccountTokenCreator role.",
      ).optional(),
    }).describe("The service account").optional(),
    userCredential: z.object({}).describe("The credential of the calling user.")
      .optional(),
  }).describe("The identity to run the datascan.").optional(),
  executionSpec: z.object({
    field: z.string().describe(
      "Immutable. The unnested field (of type Date or Timestamp) that contains values which monotonically increase over time.If not specified, a data scan will run for all data in the table.",
    ).optional(),
    trigger: z.object({
      onDemand: z.object({}).describe("The scan runs once via RunDataScan API.")
        .optional(),
      oneTime: z.object({
        ttlAfterScanCompletion: z.string().describe(
          "Optional. Time to live for OneTime scans. default value is 24 hours, minimum value is 0 seconds, and maximum value is 365 days. The time is calculated from the data scan job completion time. If value is set as 0 seconds, the scan will be immediately deleted upon job completion, regardless of whether the job succeeded or failed.",
        ).optional(),
      }).describe("The scan runs once using create API.").optional(),
      schedule: z.object({
        cron: z.string().describe(
          'Required. Cron (https://en.wikipedia.org/wiki/Cron) schedule for running scans periodically.To explicitly set a timezone in the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database (wikipedia (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)). For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *.This field is required for Schedule scans.',
        ).optional(),
      }).describe("The scan is scheduled to run periodically.").optional(),
    }).describe("DataScan scheduling and trigger settings.").optional(),
  }).describe("DataScan execution settings.").optional(),
  executionStatus: z.object({
    latestJobCreateTime: z.string().describe(
      "Optional. The time when the DataScanJob execution was created.",
    ).optional(),
    latestJobEndTime: z.string().describe(
      "Optional. The time when the latest DataScanJob ended.",
    ).optional(),
    latestJobStartTime: z.string().describe(
      "Optional. The time when the latest DataScanJob started.",
    ).optional(),
  }).describe("Status of the data scan execution.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the scan.",
  ).optional(),
  dataScanId: z.string().describe(
    'Optional. DataScan identifier. If not provided, a unique ID will be generated with the prefix "data-scan-". Must contain only lowercase letters, numbers and hyphens. Must start with a letter. Must end with a number or a letter. Must be between 1-63 characters. Must be unique within the customer project / location.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  data: z.object({
    entity: z.string(),
    resource: z.string(),
  }).optional(),
  dataDiscoveryResult: z.object({
    bigqueryPublishing: z.object({
      dataset: z.string(),
      location: z.string(),
    }),
    scanStatistics: z.object({
      dataProcessedBytes: z.string(),
      filesExcluded: z.number(),
      filesetsCreated: z.number(),
      filesetsDeleted: z.number(),
      filesetsUpdated: z.number(),
      scannedFileCount: z.number(),
      tablesCreated: z.number(),
      tablesDeleted: z.number(),
      tablesUpdated: z.number(),
    }),
  }).optional(),
  dataDiscoverySpec: z.object({
    bigqueryPublishingConfig: z.object({
      connection: z.string(),
      location: z.string(),
      project: z.string(),
      tableType: z.string(),
    }),
    storageConfig: z.object({
      csvOptions: z.object({
        delimiter: z.string(),
        encoding: z.string(),
        headerRows: z.number(),
        quote: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
      excludePatterns: z.array(z.string()),
      includePatterns: z.array(z.string()),
      jsonOptions: z.object({
        encoding: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
      unstructuredDataOptions: z.object({
        entityInferenceEnabled: z.boolean(),
        semanticInferenceEnabled: z.boolean(),
      }),
    }),
  }).optional(),
  dataDocumentationResult: z.object({
    datasetResult: z.object({
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schemaRelationships: z.array(z.object({
        leftSchemaPaths: z.object({
          paths: z.unknown(),
          tableFqn: z.unknown(),
        }),
        rightSchemaPaths: z.object({
          paths: z.unknown(),
          tableFqn: z.unknown(),
        }),
        sources: z.array(z.unknown()),
        type: z.string(),
      })),
    }),
    tableResult: z.object({
      name: z.string(),
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schema: z.object({
        fields: z.array(z.object({
          description: z.unknown(),
          fields: z.unknown(),
          name: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  dataDocumentationSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    generationScopes: z.array(z.string()),
  }).optional(),
  dataProfileResult: z.object({
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    profile: z.object({
      fields: z.array(z.object({
        mode: z.string(),
        name: z.string(),
        profile: z.object({
          distinctRatio: z.unknown(),
          doubleProfile: z.unknown(),
          integerProfile: z.unknown(),
          nullRatio: z.unknown(),
          stringProfile: z.unknown(),
          topNValues: z.unknown(),
        }),
        type: z.string(),
      })),
    }),
    rowCount: z.string(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
  }).optional(),
  dataProfileSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    excludeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    includeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    mode: z.string(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
    }),
    rowFilter: z.string(),
    samplingPercent: z.number(),
  }).optional(),
  dataQualityResult: z.object({
    anomalyDetectionGeneratedAssets: z.object({
      dataIntermediateTable: z.string(),
      freshnessIntermediateTable: z.string(),
      resultTable: z.string(),
      volumeIntermediateTable: z.string(),
    }),
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    columns: z.array(z.object({
      column: z.string(),
      dimensions: z.array(z.object({
        dimension: z.unknown(),
        passed: z.unknown(),
        score: z.unknown(),
      })),
      passed: z.boolean(),
      score: z.number(),
    })),
    dimensions: z.array(z.object({
      dimension: z.object({
        name: z.string(),
      }),
      passed: z.boolean(),
      score: z.number(),
    })),
    passed: z.boolean(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    rowCount: z.string(),
    rules: z.array(z.object({
      assertionRowCount: z.string(),
      debugQueriesResultSets: z.array(z.object({
        results: z.unknown(),
      })),
      evaluatedCount: z.string(),
      failingRowsQuery: z.string(),
      nullCount: z.string(),
      passRatio: z.number(),
      passed: z.boolean(),
      passedCount: z.string(),
      rule: z.object({
        attributes: z.record(z.string(), z.unknown()),
        column: z.string(),
        debugQueries: z.array(z.unknown()),
        description: z.string(),
        dimension: z.string(),
        ignoreNull: z.boolean(),
        name: z.string(),
        nonNullExpectation: z.object({}),
        rangeExpectation: z.object({
          maxValue: z.unknown(),
          minValue: z.unknown(),
          strictMaxEnabled: z.unknown(),
          strictMinEnabled: z.unknown(),
        }),
        regexExpectation: z.object({
          regex: z.unknown(),
        }),
        rowConditionExpectation: z.object({
          sqlExpression: z.unknown(),
        }),
        ruleSource: z.object({
          rulePathElements: z.unknown(),
        }),
        setExpectation: z.object({
          values: z.unknown(),
        }),
        sqlAssertion: z.object({
          sqlStatement: z.unknown(),
        }),
        statisticRangeExpectation: z.object({
          maxValue: z.unknown(),
          minValue: z.unknown(),
          statistic: z.unknown(),
          strictMaxEnabled: z.unknown(),
          strictMinEnabled: z.unknown(),
        }),
        suspended: z.boolean(),
        tableConditionExpectation: z.object({
          sqlExpression: z.unknown(),
        }),
        templateReference: z.object({
          name: z.unknown(),
          resolvedSql: z.unknown(),
          ruleTemplate: z.unknown(),
          values: z.unknown(),
        }),
        threshold: z.number(),
        uniquenessExpectation: z.object({}),
      }),
    })),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
    score: z.number(),
  }).optional(),
  dataQualitySpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    enableCatalogBasedRules: z.boolean(),
    filter: z.string(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
      notificationReport: z.object({
        jobEndTrigger: z.object({}),
        jobFailureTrigger: z.object({}),
        recipients: z.object({
          emails: z.array(z.unknown()),
        }),
        scoreThresholdTrigger: z.object({
          scoreThreshold: z.number(),
        }),
      }),
    }),
    rowFilter: z.string(),
    rules: z.array(z.object({
      attributes: z.record(z.string(), z.unknown()),
      column: z.string(),
      debugQueries: z.array(z.object({
        description: z.unknown(),
        sqlStatement: z.unknown(),
      })),
      description: z.string(),
      dimension: z.string(),
      ignoreNull: z.boolean(),
      name: z.string(),
      nonNullExpectation: z.object({}),
      rangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      regexExpectation: z.object({
        regex: z.string(),
      }),
      rowConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      ruleSource: z.object({
        rulePathElements: z.array(z.unknown()),
      }),
      setExpectation: z.object({
        values: z.array(z.unknown()),
      }),
      sqlAssertion: z.object({
        sqlStatement: z.string(),
      }),
      statisticRangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        statistic: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      suspended: z.boolean(),
      tableConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      templateReference: z.object({
        name: z.string(),
        resolvedSql: z.string(),
        ruleTemplate: z.object({
          capabilities: z.unknown(),
          dimension: z.unknown(),
          inputParameters: z.unknown(),
          name: z.unknown(),
          sqlCollection: z.unknown(),
        }),
        values: z.record(z.string(), z.unknown()),
      }),
      threshold: z.number(),
      uniquenessExpectation: z.object({}),
    })),
    samplingPercent: z.number(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  executionIdentity: z.object({
    dataplexServiceAgent: z.object({}),
    serviceAccount: z.object({
      email: z.string(),
    }),
    userCredential: z.object({}),
  }).optional(),
  executionSpec: z.object({
    field: z.string(),
    trigger: z.object({
      onDemand: z.object({}),
      oneTime: z.object({
        ttlAfterScanCompletion: z.string(),
      }),
      schedule: z.object({
        cron: z.string(),
      }),
    }),
  }).optional(),
  executionStatus: z.object({
    latestJobCreateTime: z.string(),
    latestJobEndTime: z.string(),
    latestJobStartTime: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  state: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  data: z.object({
    entity: z.string().describe(
      "Immutable. The Dataplex Universal Catalog entity that represents the data source (e.g. BigQuery table) for DataScan, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.",
    ).optional(),
    resource: z.string().describe(
      'Immutable. The service-qualified full resource name of the cloud resource for a DataScan job to scan against. The field could either be: Cloud Storage bucket for DataDiscoveryScan Format: //storage.googleapis.com/projects/PROJECT_ID/buckets/BUCKET_ID or BigQuery table of type "TABLE" for DataProfileScan/DataQualityScan/DataDocumentationScan Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or BigQuery dataset for DataDocumentationScan only Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID',
    ).optional(),
  }).describe("The data source for DataScan.").optional(),
  dataDiscoveryResult: z.object({
    bigqueryPublishing: z.object({
      dataset: z.string().describe(
        "Output only. The BigQuery dataset the discovered tables are published to.",
      ).optional(),
      location: z.string().describe(
        "Output only. The location of the BigQuery publishing dataset.",
      ).optional(),
    }).describe("Describes BigQuery publishing configurations.").optional(),
    scanStatistics: z.object({
      dataProcessedBytes: z.string().describe("The data processed in bytes.")
        .optional(),
      filesExcluded: z.number().int().describe("The number of files excluded.")
        .optional(),
      filesetsCreated: z.number().int().describe(
        "The number of filesets created.",
      ).optional(),
      filesetsDeleted: z.number().int().describe(
        "The number of filesets deleted.",
      ).optional(),
      filesetsUpdated: z.number().int().describe(
        "The number of filesets updated.",
      ).optional(),
      scannedFileCount: z.number().int().describe(
        "The number of files scanned.",
      ).optional(),
      tablesCreated: z.number().int().describe("The number of tables created.")
        .optional(),
      tablesDeleted: z.number().int().describe("The number of tables deleted.")
        .optional(),
      tablesUpdated: z.number().int().describe("The number of tables updated.")
        .optional(),
    }).describe("Describes result statistics of a data scan discovery job.")
      .optional(),
  }).describe("The output of a data discovery scan.").optional(),
  dataDiscoverySpec: z.object({
    bigqueryPublishingConfig: z.object({
      connection: z.string().describe(
        "Optional. The BigQuery connection used to create BigLake tables. Must be in the form projects/{project_id}/locations/{location_id}/connections/{connection_id}",
      ).optional(),
      location: z.string().describe(
        "Optional. The location of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. 1. If the Cloud Storage bucket is located in a multi-region bucket, then BigQuery dataset can be in the same multi-region bucket or any single region that is included in the same multi-region bucket. The datascan can be created in any single region that is included in the same multi-region bucket 2. If the Cloud Storage bucket is located in a dual-region bucket, then BigQuery dataset can be located in regions that are included in the dual-region bucket, or in a multi-region that includes the dual-region. The datascan can be created in any single region that is included in the same dual-region bucket. 3. If the Cloud Storage bucket is located in a single region, then BigQuery dataset can be in the same single region or any multi-region bucket that includes the same single region. The datascan will be created in the same single region as the bucket. 4. If the BigQuery dataset is in single region, it must be in the same single region as the datascan.For supported values, refer to https://cloud.google.com/bigquery/docs/locations#supported_locations.",
      ).optional(),
      project: z.string().describe(
        'Optional. The project of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. If not specified, the project of the Cloud Storage bucket will be used. The format is "projects/{project_id_or_number}".',
      ).optional(),
      tableType: z.enum(["TABLE_TYPE_UNSPECIFIED", "EXTERNAL", "BIGLAKE"])
        .describe(
          "Optional. Determines whether to publish discovered tables as BigLake external tables or non-BigLake external tables.",
        ).optional(),
    }).describe("Describes BigQuery publishing configurations.").optional(),
    storageConfig: z.object({
      csvOptions: z.object({
        delimiter: z.string().describe(
          "Optional. The delimiter that is used to separate values. The default is, (comma).",
        ).optional(),
        encoding: z.string().describe(
          "Optional. The character encoding of the data. The default is UTF-8.",
        ).optional(),
        headerRows: z.number().int().describe(
          "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows.",
        ).optional(),
        quote: z.string().describe(
          'Optional. The character used to quote column values. Accepts " (double quotation mark) or \' (single quotation mark). If unspecified, defaults to " (double quotation mark).',
        ).optional(),
        typeInferenceDisabled: z.boolean().describe(
          "Optional. Whether to disable the inference of data types for CSV data. If true, all columns are registered as strings.",
        ).optional(),
      }).describe("Describes CSV and similar semi-structured data formats.")
        .optional(),
      excludePatterns: z.array(z.string()).describe(
        "Optional. Defines the data to exclude during discovery. Provide a list of patterns that identify the data to exclude. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names.",
      ).optional(),
      includePatterns: z.array(z.string()).describe(
        "Optional. Defines the data to include during discovery when only a subset of the data should be considered. Provide a list of patterns that identify the data to include. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names.",
      ).optional(),
      jsonOptions: z.object({
        encoding: z.string().describe(
          "Optional. The character encoding of the data. The default is UTF-8.",
        ).optional(),
        typeInferenceDisabled: z.boolean().describe(
          "Optional. Whether to disable the inference of data types for JSON data. If true, all columns are registered as their primitive types (strings, number, or boolean).",
        ).optional(),
      }).describe("Describes JSON data format.").optional(),
      unstructuredDataOptions: z.object({
        entityInferenceEnabled: z.boolean().describe(
          "Optional. Deprecated: Use semantic_inference_enabled instead. Specifies whether deeper entity inference over the objects' contents using GenAI is enabled.",
        ).optional(),
        semanticInferenceEnabled: z.boolean().describe(
          "Optional. Specifies whether deeper semantic inference over the objects' contents using GenAI is enabled.",
        ).optional(),
      }).describe("Describes options for unstructured data discovery.")
        .optional(),
    }).describe("Configurations related to Cloud Storage as the data source.")
      .optional(),
  }).describe("Spec for a data discovery scan.").optional(),
  dataDocumentationResult: z.object({
    datasetResult: z.object({
      overview: z.string().describe(
        "Output only. Generated Dataset description.",
      ).optional(),
      queries: z.array(z.object({
        description: z.string().describe(
          "Output only. The description for the query.",
        ).optional(),
        sql: z.string().describe(
          "Output only. The SQL query string which can be executed.",
        ).optional(),
      })).describe("Output only. Sample SQL queries for the dataset.")
        .optional(),
      schemaRelationships: z.array(z.object({
        leftSchemaPaths: z.object({
          paths: z.unknown().describe(
            "Output only. An ordered set of Paths to fields within the schema of the table. For fields nested within a top level field of type record, use '.' to separate field names. Examples: Top level field - top_level Nested field - top_level.child.sub_field",
          ).optional(),
          tableFqn: z.unknown().describe(
            "Output only. The service-qualified full resource name of the table Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
          ).optional(),
        }).describe(
          "Represents an ordered set of paths within a table's schema.",
        ).optional(),
        rightSchemaPaths: z.object({
          paths: z.unknown().describe(
            "Output only. An ordered set of Paths to fields within the schema of the table. For fields nested within a top level field of type record, use '.' to separate field names. Examples: Top level field - top_level Nested field - top_level.child.sub_field",
          ).optional(),
          tableFqn: z.unknown().describe(
            "Output only. The service-qualified full resource name of the table Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
          ).optional(),
        }).describe(
          "Represents an ordered set of paths within a table's schema.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Output only. Sources which generated the schema relation edge.",
        ).optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "SCHEMA_JOIN"]).describe(
          "Output only. The type of relationship between the schema paths.",
        ).optional(),
      })).describe(
        "Output only. Relationships suggesting how tables in the dataset are related to each other, based on their schema.",
      ).optional(),
    }).describe("Insights for a dataset resource.").optional(),
    tableResult: z.object({
      name: z.string().describe(
        "Output only. The service-qualified full resource name of the cloud resource. Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
      ).optional(),
      overview: z.string().describe(
        "Output only. Generated description of the table.",
      ).optional(),
      queries: z.array(z.object({
        description: z.string().describe(
          "Output only. The description for the query.",
        ).optional(),
        sql: z.string().describe(
          "Output only. The SQL query string which can be executed.",
        ).optional(),
      })).describe("Output only. Sample SQL queries for the table.").optional(),
      schema: z.object({
        fields: z.array(z.object({
          description: z.unknown().describe(
            "Output only. Generated description for columns and fields.",
          ).optional(),
          fields: z.unknown().describe("Output only. Nested fields.")
            .optional(),
          name: z.unknown().describe("Output only. The name of the column.")
            .optional(),
        })).describe("Output only. The list of columns.").optional(),
      }).describe("Schema of the table with generated metadata of columns.")
        .optional(),
    }).describe("Insights for a table resource.").optional(),
  }).describe("The output of a DataDocumentation scan.").optional(),
  dataDocumentationSpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. Whether to publish result to Dataplex Catalog.",
    ).optional(),
    generationScopes: z.array(
      z.enum([
        "GENERATION_SCOPE_UNSPECIFIED",
        "ALL",
        "TABLE_AND_COLUMN_DESCRIPTIONS",
        "SQL_QUERIES",
      ]),
    ).describe(
      "Optional. Specifies which components of the data documentation to generate. Any component that is required to generate the specified components will also be generated. If no generation scope is specified, all available documentation components will be generated.",
    ).optional(),
  }).describe("DataDocumentation scan related spec.").optional(),
  dataProfileResult: z.object({
    catalogPublishingStatus: z.object({
      state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
        .describe("Output only. Execution state for publishing.").optional(),
    }).describe(
      "The status of publishing the data scan result as Dataplex Universal Catalog metadata. Multiple DataScan log events may exist, each with different publishing information depending on the type of publishing triggered.",
    ).optional(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string().describe(
          "Output only. Additional information about the BigQuery exporting.",
        ).optional(),
        state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
          .describe("Output only. Execution state for the BigQuery exporting.")
          .optional(),
      }).describe("The result of BigQuery export post scan action.").optional(),
    }).describe("The result of post scan actions of DataProfileScan job.")
      .optional(),
    profile: z.object({
      fields: z.array(z.object({
        mode: z.string().describe(
          "Output only. The mode of the field. Possible values include: REQUIRED, if it is a required field. NULLABLE, if it is an optional field. REPEATED, if it is a repeated field.",
        ).optional(),
        name: z.string().describe("Output only. The name of the field.")
          .optional(),
        profile: z.object({
          distinctRatio: z.unknown().describe(
            "Output only. Ratio of rows with distinct values against total scanned rows. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode.",
          ).optional(),
          doubleProfile: z.unknown().describe(
            "The profile information for a double type field.",
          ).optional(),
          integerProfile: z.unknown().describe(
            "The profile information for an integer type field.",
          ).optional(),
          nullRatio: z.unknown().describe(
            "Output only. Ratio of rows with null value against total scanned rows.",
          ).optional(),
          stringProfile: z.unknown().describe(
            "The profile information for a string type field.",
          ).optional(),
          topNValues: z.unknown().describe(
            "Output only. The list of top N non-null values, frequency and ratio with which they occur in the scanned data. N is 10 or equal to the number of distinct values in the field, whichever is smaller. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode.",
          ).optional(),
        }).describe("The profile information for each field type.").optional(),
        type: z.string().describe(
          "Output only. The data type retrieved from the schema of the data source. For instance, for a BigQuery native table, it is the BigQuery Table Schema (https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tablefieldschema). For a Dataplex Universal Catalog Entity, it is the Entity Schema (https://cloud.google.com/dataplex/docs/reference/rpc/google.cloud.dataplex.v1#type_3).",
        ).optional(),
      })).describe(
        "Output only. List of fields with structural and profile information for each field.",
      ).optional(),
    }).describe(
      "Contains name, type, mode and field type specific profile information.",
    ).optional(),
    rowCount: z.string().describe("Output only. The count of rows scanned.")
      .optional(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string().describe(
          "Output only. Value that marks the end of the range.",
        ).optional(),
        field: z.string().describe(
          "Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column).",
        ).optional(),
        start: z.string().describe(
          "Output only. Value that marks the start of the range.",
        ).optional(),
      }).describe(
        "A data range denoted by a pair of start/end values of a field.",
      ).optional(),
    }).describe(
      "The data scanned during processing (e.g. in incremental DataScan)",
    ).optional(),
  }).describe(
    "DataProfileResult defines the output of DataProfileScan. Each field of the table will have field type specific profile result.",
  ).optional(),
  dataProfileSpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata.",
    ).optional(),
    excludeFields: z.object({
      fieldNames: z.array(z.string()).describe(
        "Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'.",
      ).optional(),
    }).describe(
      "The specification for fields to include or exclude in data profile scan.",
    ).optional(),
    includeFields: z.object({
      fieldNames: z.array(z.string()).describe(
        "Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'.",
      ).optional(),
    }).describe(
      "The specification for fields to include or exclude in data profile scan.",
    ).optional(),
    mode: z.enum(["MODE_UNSPECIFIED", "STANDARD", "LIGHTWEIGHT"]).describe(
      "Optional. The execution mode for the profile scan.",
    ).optional(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string().describe(
          "Optional. The BigQuery table to export DataProfileScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
        ).optional(),
      }).describe("The configuration of BigQuery export post scan action.")
        .optional(),
    }).describe(
      "The configuration of post scan actions of DataProfileScan job.",
    ).optional(),
    rowFilter: z.string().describe(
      "Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in BigQuery standard SQL syntax. Example: col1 >= 0 AND col2 < 10",
    ).optional(),
    samplingPercent: z.number().describe(
      "Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100.",
    ).optional(),
  }).describe("DataProfileScan related setting.").optional(),
  dataQualityResult: z.object({
    anomalyDetectionGeneratedAssets: z.object({
      dataIntermediateTable: z.string().describe(
        "Output only. The intermediate table for data anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
      freshnessIntermediateTable: z.string().describe(
        "Output only. The intermediate table for freshness anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
      resultTable: z.string().describe(
        "Output only. The result table for anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID If the result table is set at AnomalyDetectionAssets, the result table here would be the same as the one set in the AnomalyDetectionAssets.result_table.",
      ).optional(),
      volumeIntermediateTable: z.string().describe(
        "Output only. The intermediate table for volume anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID",
      ).optional(),
    }).describe("The assets generated by Anomaly Detection Data Scan.")
      .optional(),
    catalogPublishingStatus: z.object({
      state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
        .describe("Output only. Execution state for publishing.").optional(),
    }).describe(
      "The status of publishing the data scan result as Dataplex Universal Catalog metadata. Multiple DataScan log events may exist, each with different publishing information depending on the type of publishing triggered.",
    ).optional(),
    columns: z.array(z.object({
      column: z.string().describe(
        "Output only. The column specified in the DataQualityRule.",
      ).optional(),
      dimensions: z.array(z.object({
        dimension: z.unknown().describe(
          "A dimension captures data quality intent about a defined subset of the rules specified.",
        ).optional(),
        passed: z.unknown().describe(
          "Output only. Whether the dimension passed or failed.",
        ).optional(),
        score: z.unknown().describe(
          "Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points).",
        ).optional(),
      })).describe("Output only. The dimension-level results for this column.")
        .optional(),
      passed: z.boolean().describe(
        "Output only. Whether the column passed or failed.",
      ).optional(),
      score: z.number().describe(
        "Output only. The column-level data quality score for this data scan job if and only if the 'column' field is set.The score ranges between between 0, 100 (up to two decimal points).",
      ).optional(),
    })).describe(
      "Output only. A list of results at the column level.A column will have a corresponding DataQualityColumnResult if and only if there is at least one rule with the 'column' field set to it.",
    ).optional(),
    dimensions: z.array(z.object({
      dimension: z.object({
        name: z.string().describe(
          "Output only. The dimension name a rule belongs to. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
        ).optional(),
      }).describe(
        "A dimension captures data quality intent about a defined subset of the rules specified.",
      ).optional(),
      passed: z.boolean().describe(
        "Output only. Whether the dimension passed or failed.",
      ).optional(),
      score: z.number().describe(
        "Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points).",
      ).optional(),
    })).describe(
      "Output only. A list of results at the dimension level.A dimension will have a corresponding DataQualityDimensionResult if and only if there is at least one rule with the 'dimension' field set to it.",
    ).optional(),
    passed: z.boolean().describe(
      "Output only. Overall data quality result -- true if all rules passed.",
    ).optional(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string().describe(
          "Output only. Additional information about the BigQuery exporting.",
        ).optional(),
        state: z.enum(["STATE_UNSPECIFIED", "SUCCEEDED", "FAILED", "SKIPPED"])
          .describe("Output only. Execution state for the BigQuery exporting.")
          .optional(),
      }).describe("The result of BigQuery export post scan action.").optional(),
    }).describe("The result of post scan actions of DataQualityScan job.")
      .optional(),
    rowCount: z.string().describe("Output only. The count of rows processed.")
      .optional(),
    rules: z.array(z.object({
      assertionRowCount: z.string().describe(
        "Output only. The number of rows returned by the SQL statement in a SQL assertion rule.This field is only valid for SQL assertion rules.",
      ).optional(),
      debugQueriesResultSets: z.array(z.object({
        results: z.unknown().describe(
          "Output only. Contains all results. Up to 10 results can be returned.",
        ).optional(),
      })).describe(
        "Output only. Contains the results of all debug queries for this rule. The number of result sets will correspond to the number of debug_queries.",
      ).optional(),
      evaluatedCount: z.string().describe(
        "Output only. The number of rows a rule was evaluated against.This field is only valid for row-level type rules.Evaluated count can be configured to either include all rows (default) - with null rows automatically failing rule evaluation, or exclude null rows from the evaluated_count, by setting ignore_nulls = true.This field is not set for rule SqlAssertion.",
      ).optional(),
      failingRowsQuery: z.string().describe(
        "Output only. The query to find rows that did not pass this rule.This field is only valid for row-level type rules.",
      ).optional(),
      nullCount: z.string().describe(
        "Output only. The number of rows with null values in the specified column.",
      ).optional(),
      passRatio: z.number().describe(
        "Output only. The ratio of passed_count / evaluated_count.This field is only valid for row-level type rules.",
      ).optional(),
      passed: z.boolean().describe(
        "Output only. Whether the rule passed or failed.",
      ).optional(),
      passedCount: z.string().describe(
        "Output only. The number of rows which passed a rule evaluation.This field is only valid for row-level type rules.This field is not set for rule SqlAssertion.",
      ).optional(),
      rule: z.object({
        attributes: z.record(z.string(), z.unknown()).describe(
          "Optional. Map of attribute name and value linked to the rule. The rules to evaluate can be filtered based on attributes provided here and a filter expression provided in the DataQualitySpec.filter field.",
        ).optional(),
        column: z.string().describe(
          "Optional. The unnested column which this rule is evaluated against.",
        ).optional(),
        debugQueries: z.array(z.unknown()).describe(
          "Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future.",
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the rule. The maximum length is 1,024 characters.",
        ).optional(),
        dimension: z.string().describe(
          "Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
        ).optional(),
        ignoreNull: z.boolean().describe(
          "Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation",
        ).optional(),
        name: z.string().describe(
          "Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter.",
        ).optional(),
        nonNullExpectation: z.object({}).describe(
          "Evaluates whether each column value is null.",
        ).optional(),
        rangeExpectation: z.object({
          maxValue: z.unknown().describe(
            "Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
          ).optional(),
          minValue: z.unknown().describe(
            "Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
          ).optional(),
          strictMaxEnabled: z.unknown().describe(
            "Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
          ).optional(),
          strictMinEnabled: z.unknown().describe(
            "Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value lies between a specified range.",
        ).optional(),
        regexExpectation: z.object({
          regex: z.unknown().describe(
            "Optional. A regular expression the column value is expected to match.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value matches a specified regex.",
        ).optional(),
        rowConditionExpectation: z.object({
          sqlExpression: z.unknown().describe("Optional. The SQL expression.")
            .optional(),
        }).describe(
          "Evaluates whether each row passes the specified condition.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a boolean value per row as the result.Example: col1 >= 0 AND col2 < 10",
        ).optional(),
        ruleSource: z.object({
          rulePathElements: z.unknown().describe(
            "Output only. Rule path elements represent information about the individual items in the relationship path between the scan resource and rule origin in that order.",
          ).optional(),
        }).describe("Represents the rule source information from Catalog.")
          .optional(),
        setExpectation: z.object({
          values: z.unknown().describe(
            "Optional. Expected values for the column value.",
          ).optional(),
        }).describe(
          "Evaluates whether each column value is contained by a specified set.",
        ).optional(),
        sqlAssertion: z.object({
          sqlStatement: z.unknown().describe("Optional. The SQL statement.")
            .optional(),
        }).describe(
          "A SQL statement that is evaluated to return rows that match an invalid state. If any rows are are returned, this rule fails.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).Example: SELECT * FROM ${data()} WHERE price < 0",
        ).optional(),
        statisticRangeExpectation: z.object({
          maxValue: z.unknown().describe(
            "Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
          ).optional(),
          minValue: z.unknown().describe(
            "Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
          ).optional(),
          statistic: z.unknown().describe(
            "Optional. The aggregate metric to evaluate.",
          ).optional(),
          strictMaxEnabled: z.unknown().describe(
            "Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
          ).optional(),
          strictMinEnabled: z.unknown().describe(
            "Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
          ).optional(),
        }).describe(
          "Evaluates whether the column aggregate statistic lies between a specified range.",
        ).optional(),
        suspended: z.boolean().describe(
          "Optional. Whether the Rule is active or suspended. Default is false.",
        ).optional(),
        tableConditionExpectation: z.object({
          sqlExpression: z.unknown().describe("Optional. The SQL expression.")
            .optional(),
        }).describe(
          "Evaluates whether the provided expression is true.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a scalar boolean result.Example: MIN(col1) >= 0",
        ).optional(),
        templateReference: z.object({
          name: z.unknown().describe(
            "Required. The template entry name. Entry must be of EntryType projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template and contains top-level aspect of AspectType projects/dataplex-types/locations/global/aspectTypes/data-quality-rule-template. The format is: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
          ).optional(),
          resolvedSql: z.unknown().describe(
            "Output only. The resolved SQL statement generated from the template with parameters substituted. It is only populated in the result.",
          ).optional(),
          ruleTemplate: z.unknown().describe(
            "DataQualityRuleTemplate represents a template which can be reused across multiple data quality rules.",
          ).optional(),
          values: z.unknown().describe(
            "Optional. Provides the map of parameter name and value. The maximum size of the field is 120KB (encoded as UTF-8).",
          ).optional(),
        }).describe(
          "A rule that constructs a SQL statement to evaluate using a rule template and parameter values. If the constructed statement returns any rows, this rule fails",
        ).optional(),
        threshold: z.number().describe(
          "Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules.",
        ).optional(),
        uniquenessExpectation: z.object({}).describe(
          "Evaluates whether the column has duplicates.",
        ).optional(),
      }).describe("A rule captures data quality intent about a data source.")
        .optional(),
    })).describe(
      "Output only. A list of all the rules in a job, and their results.",
    ).optional(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string().describe(
          "Output only. Value that marks the end of the range.",
        ).optional(),
        field: z.string().describe(
          "Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column).",
        ).optional(),
        start: z.string().describe(
          "Output only. Value that marks the start of the range.",
        ).optional(),
      }).describe(
        "A data range denoted by a pair of start/end values of a field.",
      ).optional(),
    }).describe(
      "The data scanned during processing (e.g. in incremental DataScan)",
    ).optional(),
    score: z.number().describe(
      "Output only. The overall data quality score.The score ranges between 0, 100 (up to two decimal points).",
    ).optional(),
  }).describe("The output of a DataQualityScan.").optional(),
  dataQualitySpec: z.object({
    catalogPublishingEnabled: z.boolean().describe(
      "Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata.",
    ).optional(),
    enableCatalogBasedRules: z.boolean().describe(
      "Optional. If enabled, the data scan will retrieve rules defined in the dataplex-types.global.data-rules aspect on all paths of the catalog entry corresponding to the BigQuery table resource and all attached glossary terms. The path that data-rules aspect is attached on the table entry defines the column that the rule will be evaluated against. For glossary terms, the path that the terms are attached on the table entry defines the column that the rule will be evaluated against. At the start of scan execution, the rules reflect the latest state retrieved from the catalog entry and any updates on the rules thereafter are ignored for that execution. The updates will be reflected from the next execution. Rules defined in the datascan must be empty if this field is enabled.",
    ).optional(),
    filter: z.string().describe(
      "Optional. Filter for selectively running a subset of rules. You can filter the request by the name or attribute key-value pairs defined on the rule. If not specified, all rules are run. The filter is applicable to both, the rules retrieved from catalog and explicitly defined rules in the scan. Please see filter syntax (https://docs.cloud.google.com/dataplex/docs/auto-data-quality-overview#rule-filtering) for more details.",
    ).optional(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string().describe(
          "Optional. The BigQuery table to export DataQualityScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID",
        ).optional(),
      }).describe("The configuration of BigQuery export post scan action.")
        .optional(),
      notificationReport: z.object({
        jobEndTrigger: z.object({}).describe(
          "This trigger is triggered whenever a scan job run ends, regardless of the result.",
        ).optional(),
        jobFailureTrigger: z.object({}).describe(
          "This trigger is triggered when the scan job itself fails, regardless of the result.",
        ).optional(),
        recipients: z.object({
          emails: z.array(z.unknown()).describe(
            "Optional. The email recipients who will receive the DataQualityScan results report.",
          ).optional(),
        }).describe(
          "The individuals or groups who are designated to receive notifications upon triggers.",
        ).optional(),
        scoreThresholdTrigger: z.object({
          scoreThreshold: z.number().describe(
            "Optional. The score range is in 0,100.",
          ).optional(),
        }).describe(
          "This trigger is triggered when the DQ score in the job result is less than a specified input score.",
        ).optional(),
      }).describe("The configuration of notification report post scan action.")
        .optional(),
    }).describe("The configuration of post scan actions of DataQualityScan.")
      .optional(),
    rowFilter: z.string().describe(
      "Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#where_clause).Example: col1 >= 0 AND col2 < 10",
    ).optional(),
    rules: z.array(z.object({
      attributes: z.record(z.string(), z.string()).describe(
        "Optional. Map of attribute name and value linked to the rule. The rules to evaluate can be filtered based on attributes provided here and a filter expression provided in the DataQualitySpec.filter field.",
      ).optional(),
      column: z.string().describe(
        "Optional. The unnested column which this rule is evaluated against.",
      ).optional(),
      debugQueries: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Specifies the description of the debug query. The maximum length is 1,024 characters.",
        ).optional(),
        sqlStatement: z.unknown().describe(
          "Required. Specifies the SQL statement to be executed.",
        ).optional(),
      })).describe(
        "Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the rule. The maximum length is 1,024 characters.",
      ).optional(),
      dimension: z.string().describe(
        "Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters.",
      ).optional(),
      ignoreNull: z.boolean().describe(
        "Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation",
      ).optional(),
      name: z.string().describe(
        "Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter.",
      ).optional(),
      nonNullExpectation: z.object({}).describe(
        "Evaluates whether each column value is null.",
      ).optional(),
      rangeExpectation: z.object({
        maxValue: z.string().describe(
          "Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
        ).optional(),
        minValue: z.string().describe(
          "Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided.",
        ).optional(),
        strictMaxEnabled: z.boolean().describe(
          "Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
        ).optional(),
        strictMinEnabled: z.boolean().describe(
          "Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value lies between a specified range.",
      ).optional(),
      regexExpectation: z.object({
        regex: z.string().describe(
          "Optional. A regular expression the column value is expected to match.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value matches a specified regex.",
      ).optional(),
      rowConditionExpectation: z.object({
        sqlExpression: z.string().describe("Optional. The SQL expression.")
          .optional(),
      }).describe(
        "Evaluates whether each row passes the specified condition.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a boolean value per row as the result.Example: col1 >= 0 AND col2 < 10",
      ).optional(),
      ruleSource: z.object({
        rulePathElements: z.array(z.unknown()).describe(
          "Output only. Rule path elements represent information about the individual items in the relationship path between the scan resource and rule origin in that order.",
        ).optional(),
      }).describe("Represents the rule source information from Catalog.")
        .optional(),
      setExpectation: z.object({
        values: z.array(z.unknown()).describe(
          "Optional. Expected values for the column value.",
        ).optional(),
      }).describe(
        "Evaluates whether each column value is contained by a specified set.",
      ).optional(),
      sqlAssertion: z.object({
        sqlStatement: z.string().describe("Optional. The SQL statement.")
          .optional(),
      }).describe(
        "A SQL statement that is evaluated to return rows that match an invalid state. If any rows are are returned, this rule fails.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).Example: SELECT * FROM ${data()} WHERE price < 0",
      ).optional(),
      statisticRangeExpectation: z.object({
        maxValue: z.string().describe(
          "Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
        ).optional(),
        minValue: z.string().describe(
          "Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided.",
        ).optional(),
        statistic: z.enum(["STATISTIC_UNDEFINED", "MEAN", "MIN", "MAX"])
          .describe("Optional. The aggregate metric to evaluate.").optional(),
        strictMaxEnabled: z.boolean().describe(
          "Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false.",
        ).optional(),
        strictMinEnabled: z.boolean().describe(
          "Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false.",
        ).optional(),
      }).describe(
        "Evaluates whether the column aggregate statistic lies between a specified range.",
      ).optional(),
      suspended: z.boolean().describe(
        "Optional. Whether the Rule is active or suspended. Default is false.",
      ).optional(),
      tableConditionExpectation: z.object({
        sqlExpression: z.string().describe("Optional. The SQL expression.")
          .optional(),
      }).describe(
        "Evaluates whether the provided expression is true.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a scalar boolean result.Example: MIN(col1) >= 0",
      ).optional(),
      templateReference: z.object({
        name: z.string().describe(
          "Required. The template entry name. Entry must be of EntryType projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template and contains top-level aspect of AspectType projects/dataplex-types/locations/global/aspectTypes/data-quality-rule-template. The format is: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
        ).optional(),
        resolvedSql: z.string().describe(
          "Output only. The resolved SQL statement generated from the template with parameters substituted. It is only populated in the result.",
        ).optional(),
        ruleTemplate: z.object({
          capabilities: z.unknown().describe(
            "Output only. A list of features or properties supported by this rule template.",
          ).optional(),
          dimension: z.unknown().describe(
            "Output only. The dimension a rule template belongs to. Rule level results are also aggregated at the dimension level.",
          ).optional(),
          inputParameters: z.unknown().describe(
            "Output only. Description for input parameters",
          ).optional(),
          name: z.unknown().describe(
            "Output only. The name of the rule template in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}",
          ).optional(),
          sqlCollection: z.unknown().describe(
            "Output only. Collection of SQLs for data quality rules. Currently only one SQL is supported.",
          ).optional(),
        }).describe(
          "DataQualityRuleTemplate represents a template which can be reused across multiple data quality rules.",
        ).optional(),
        values: z.record(z.string(), z.unknown()).describe(
          "Optional. Provides the map of parameter name and value. The maximum size of the field is 120KB (encoded as UTF-8).",
        ).optional(),
      }).describe(
        "A rule that constructs a SQL statement to evaluate using a rule template and parameter values. If the constructed statement returns any rows, this rule fails",
      ).optional(),
      threshold: z.number().describe(
        "Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules.",
      ).optional(),
      uniquenessExpectation: z.object({}).describe(
        "Evaluates whether the column has duplicates.",
      ).optional(),
    })).describe(
      "Required. The list of rules to evaluate against a data source. At least one rule is required.",
    ).optional(),
    samplingPercent: z.number().describe(
      "Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100.",
    ).optional(),
  }).describe("DataQualityScan related setting.").optional(),
  description: z.string().describe(
    "Optional. Description of the scan. Must be between 1-1024 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. User friendly display name. Must be between 1-256 characters.",
  ).optional(),
  executionIdentity: z.object({
    dataplexServiceAgent: z.object({}).describe(
      "The Dataplex service agent associated with the user's project.",
    ).optional(),
    serviceAccount: z.object({
      email: z.string().describe(
        "Required. Service account email. The datascan will execute with this service account's credentials. The user calling this API must have permissions to act as this service account. Dataplex service agent must be granted iam.serviceAccounts.getAccessToken permission on this service account, for example, through the iam.serviceAccountTokenCreator role.",
      ).optional(),
    }).describe("The service account").optional(),
    userCredential: z.object({}).describe("The credential of the calling user.")
      .optional(),
  }).describe("The identity to run the datascan.").optional(),
  executionSpec: z.object({
    field: z.string().describe(
      "Immutable. The unnested field (of type Date or Timestamp) that contains values which monotonically increase over time.If not specified, a data scan will run for all data in the table.",
    ).optional(),
    trigger: z.object({
      onDemand: z.object({}).describe("The scan runs once via RunDataScan API.")
        .optional(),
      oneTime: z.object({
        ttlAfterScanCompletion: z.string().describe(
          "Optional. Time to live for OneTime scans. default value is 24 hours, minimum value is 0 seconds, and maximum value is 365 days. The time is calculated from the data scan job completion time. If value is set as 0 seconds, the scan will be immediately deleted upon job completion, regardless of whether the job succeeded or failed.",
        ).optional(),
      }).describe("The scan runs once using create API.").optional(),
      schedule: z.object({
        cron: z.string().describe(
          'Required. Cron (https://en.wikipedia.org/wiki/Cron) schedule for running scans periodically.To explicitly set a timezone in the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database (wikipedia (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)). For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *.This field is required for Schedule scans.',
        ).optional(),
      }).describe("The scan is scheduled to run periodically.").optional(),
    }).describe("DataScan scheduling and trigger settings.").optional(),
  }).describe("DataScan execution settings.").optional(),
  executionStatus: z.object({
    latestJobCreateTime: z.string().describe(
      "Optional. The time when the DataScanJob execution was created.",
    ).optional(),
    latestJobEndTime: z.string().describe(
      "Optional. The time when the latest DataScanJob ended.",
    ).optional(),
    latestJobStartTime: z.string().describe(
      "Optional. The time when the latest DataScanJob started.",
    ).optional(),
  }).describe("Status of the data scan execution.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the scan.",
  ).optional(),
  dataScanId: z.string().describe(
    'Optional. DataScan identifier. If not provided, a unique ID will be generated with the prefix "data-scan-". Must contain only lowercase letters, numbers and hyphens. Must start with a letter. Must end with a number or a letter. Must be between 1-63 characters. Must be unique within the customer project / location.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex DataScans. Registered at `@swamp/gcp/dataplex/datascans`. */
export const model = {
  type: "@swamp/gcp/dataplex/datascans",
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
      toVersion: "2026.04.04.2",
      description: "Added: executionIdentity",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: executionIdentity",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { executionIdentity: _executionIdentity, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: executionIdentity",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: executionIdentity",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { executionIdentity: _executionIdentity, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: executionIdentity",
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
        "Represents a user-visible job which provides the insights for the related dat...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataScans",
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
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["dataDiscoveryResult"] !== undefined) {
          body["dataDiscoveryResult"] = g["dataDiscoveryResult"];
        }
        if (g["dataDiscoverySpec"] !== undefined) {
          body["dataDiscoverySpec"] = g["dataDiscoverySpec"];
        }
        if (g["dataDocumentationResult"] !== undefined) {
          body["dataDocumentationResult"] = g["dataDocumentationResult"];
        }
        if (g["dataDocumentationSpec"] !== undefined) {
          body["dataDocumentationSpec"] = g["dataDocumentationSpec"];
        }
        if (g["dataProfileResult"] !== undefined) {
          body["dataProfileResult"] = g["dataProfileResult"];
        }
        if (g["dataProfileSpec"] !== undefined) {
          body["dataProfileSpec"] = g["dataProfileSpec"];
        }
        if (g["dataQualityResult"] !== undefined) {
          body["dataQualityResult"] = g["dataQualityResult"];
        }
        if (g["dataQualitySpec"] !== undefined) {
          body["dataQualitySpec"] = g["dataQualitySpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionIdentity"] !== undefined) {
          body["executionIdentity"] = g["executionIdentity"];
        }
        if (g["executionSpec"] !== undefined) {
          body["executionSpec"] = g["executionSpec"];
        }
        if (g["executionStatus"] !== undefined) {
          body["executionStatus"] = g["executionStatus"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["dataScanId"] !== undefined) body["dataScanId"] = g["dataScanId"];
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
              "readyValues": ["ACTIVE"],
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
      description: "Get a dataScans",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataScans"),
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
      description: "Update dataScans attributes",
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
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["dataDiscoveryResult"] !== undefined) {
          body["dataDiscoveryResult"] = g["dataDiscoveryResult"];
        }
        if (g["dataDiscoverySpec"] !== undefined) {
          body["dataDiscoverySpec"] = g["dataDiscoverySpec"];
        }
        if (g["dataDocumentationResult"] !== undefined) {
          body["dataDocumentationResult"] = g["dataDocumentationResult"];
        }
        if (g["dataDocumentationSpec"] !== undefined) {
          body["dataDocumentationSpec"] = g["dataDocumentationSpec"];
        }
        if (g["dataProfileResult"] !== undefined) {
          body["dataProfileResult"] = g["dataProfileResult"];
        }
        if (g["dataProfileSpec"] !== undefined) {
          body["dataProfileSpec"] = g["dataProfileSpec"];
        }
        if (g["dataQualityResult"] !== undefined) {
          body["dataQualityResult"] = g["dataQualityResult"];
        }
        if (g["dataQualitySpec"] !== undefined) {
          body["dataQualitySpec"] = g["dataQualitySpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionIdentity"] !== undefined) {
          body["executionIdentity"] = g["executionIdentity"];
        }
        if (g["executionSpec"] !== undefined) {
          body["executionSpec"] = g["executionSpec"];
        }
        if (g["executionStatus"] !== undefined) {
          body["executionStatus"] = g["executionStatus"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Delete the dataScans",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataScans"),
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
      description: "Sync dataScans state from GCP",
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
    generate_data_quality_rules: {
      description: "generate data quality rules",
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
              "dataplex.projects.locations.dataScans.generateDataQualityRules",
            "path": "v1/{+name}:generateDataQualityRules",
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
            "id": "dataplex.projects.locations.dataScans.getIamPolicy",
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
    run: {
      description: "run",
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
            "id": "dataplex.projects.locations.dataScans.run",
            "path": "v1/{+name}:run",
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
            "id": "dataplex.projects.locations.dataScans.setIamPolicy",
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
            "id": "dataplex.projects.locations.dataScans.testIamPermissions",
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
  },
};
