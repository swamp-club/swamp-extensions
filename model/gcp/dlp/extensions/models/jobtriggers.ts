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

// Auto-generated extension model for @swamp/gcp/dlp/jobtriggers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) JobTriggers.
 *
 * Contains a configuration to make API calls on a repeating basis. See https://docs.cloud.google.com/sensitive-data-protection/docs/concepts-job-triggers to learn more.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobTriggers/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.jobTriggers.get",
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
  "id": "dlp.organizations.locations.jobTriggers.create",
  "path": "v2/{+parent}/jobTriggers",
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
  "id": "dlp.organizations.locations.jobTriggers.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "dlp.organizations.locations.jobTriggers.delete",
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
  "id": "dlp.organizations.locations.jobTriggers.list",
  "path": "v2/{+parent}/jobTriggers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "locationId": {
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
    "type": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  jobTrigger: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a triggeredJob.",
    ).optional(),
    description: z.string().describe(
      "User provided description (max 256 chars)",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Detailed error codes and messages.").optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the trigger was activated. Repeated errors may result in the JobTrigger automatically being paused. Will return the last 100 errors. Whenever the JobTrigger is modified this list will be cleared.",
    ).optional(),
    inspectJob: z.object({
      actions: z.array(z.object({
        deidentify: z.object({
          cloudStorageOutput: z.unknown().describe(
            "Required. User settable Cloud Storage bucket and folders to store de-identified files. This field must be set for Cloud Storage deidentification. The output Cloud Storage bucket must be different from the input bucket. De-identified files will overwrite files in the output path. Form of: gs://bucket/folder/ or gs://bucket",
          ).optional(),
          fileTypesToTransform: z.unknown().describe(
            "List of user-specified file type groups to transform. If specified, only the files with these file types are transformed. If empty, all supported files are transformed. Supported types may be automatically added over time. Any unsupported file types that are set in this field are excluded from de-identification. An error is recorded for each unsupported file in the TransformationDetails output table. Currently the only file types supported are: IMAGES, TEXT_FILES, CSV, TSV.",
          ).optional(),
          transformationConfig: z.unknown().describe(
            "User specified deidentify templates and configs for structured, unstructured, and image files.",
          ).optional(),
          transformationDetailsStorageConfig: z.unknown().describe(
            "Config for storing transformation details. This field specifies the configuration for storing detailed metadata about each transformation performed during a de-identification process. The metadata is stored separately from the de-identified content itself and provides a granular record of both successful transformations and any failures that occurred. Enabling this configuration is essential for users who need to access comprehensive information about the status, outcome, and specifics of each transformation. The details are captured in the TransformationDetails message for each operation. Key use cases: * **Auditing and compliance** * Provides a verifiable audit trail of de-identification activities, which is crucial for meeting regulatory requirements and internal data governance policies. * Logs what data was transformed, what transformations were applied, when they occurred, and their success status. This helps demonstrate accountability and due diligence in protecting sensitive data. * **Troubleshooting and debugging** * Offers detailed error messages and context if a transformation fails. This information is useful for diagnosing and resolving issues in the de-identification pipeline. * Helps pinpoint the exact location and nature of failures, speeding up the debugging process. * **Process verification and quality assurance** * Allows users to confirm that de-identification rules and transformations were applied correctly and consistently across the dataset as intended. * Helps in verifying the effectiveness of the chosen de-identification strategies. * **Data lineage and impact analysis** * Creates a record of how data elements were modified, contributing to data lineage. This is useful for understanding the provenance of de-identified data. * Aids in assessing the potential impact of de-identification choices on downstream analytical processes or data usability. * **Reporting and operational insights** * You can analyze the metadata stored in a queryable BigQuery table to generate reports on transformation success rates, common error types, processing volumes (e.g., transformedBytes), and the types of transformations applied. * These insights can inform optimization of de-identification configurations and resource planning. To take advantage of these benefits, set this configuration. The stored details include a description of the transformation, success or error codes, error messages, the number of bytes transformed, the location of the transformed content, and identifiers for the job and source data.",
          ).optional(),
        }).describe("Create a de-identified copy of the input data.")
          .optional(),
        jobNotificationEmails: z.object({}).describe(
          "Sends an email when the job completes. The email goes to IAM project owners and technical [Essential Contacts](https://docs.cloud.google.com/resource-manager/docs/managing-notification-contacts).",
        ).optional(),
        pubSub: z.object({
          topic: z.unknown().describe(
            "Cloud Pub/Sub topic to send notifications to. The topic must have given publishing access rights to the DLP API service account executing the long running DlpJob sending the notifications. Format is projects/{project}/topics/{topic}.",
          ).optional(),
        }).describe("Publish a notification to a Pub/Sub topic.").optional(),
        publishFindingsToCloudDataCatalog: z.object({}).describe(
          "Deprecated because Data Catalog is being turned down. Use publish_findings_to_dataplex_catalog to publish findings to Dataplex Universal Catalog.",
        ).optional(),
        publishFindingsToDataplexCatalog: z.object({}).describe(
          "Publish findings as an aspect to Dataplex Universal Catalog.",
        ).optional(),
        publishSummaryToCscc: z.object({}).describe(
          "Publish summary to Cloud Security Command Center (Alpha).",
        ).optional(),
        publishToStackdriver: z.object({}).describe(
          "Enable Stackdriver metric dlp.googleapis.com/finding_count.",
        ).optional(),
        saveFindings: z.object({
          outputConfig: z.unknown().describe(
            "Location to store findings outside of DLP.",
          ).optional(),
        }).describe("Save resulting findings in a provided location.")
          .optional(),
      })).describe("Actions to execute at the completion of the job.")
        .optional(),
      inspectConfig: z.object({
        contentOptions: z.array(
          z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
        ).describe("Deprecated and unused.").optional(),
        customInfoTypes: z.array(z.object({
          detectionRules: z.unknown().describe(
            "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          dictionary: z.unknown().describe(
            "A list of phrases to detect as a CustomInfoType.",
          ).optional(),
          exclusionType: z.unknown().describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          fileLabelInfoType: z.unknown().describe("File label to detect.")
            .optional(),
          infoType: z.unknown().describe(
            "CustomInfoType can either be a new infoType, or an extension of built-in infoType, when the name matches one of existing infoTypes and that infoType is specified in `InspectContent.info_types` field. Specifying the latter adds findings to the one detected by the system. If built-in info type is not specified in `InspectContent.info_types` list then the name is treated as a custom info type.",
          ).optional(),
          likelihood: z.unknown().describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.unknown().describe(
            "Key-value pair to detect in the metadata.",
          ).optional(),
          regex: z.unknown().describe(
            "Regular expression based CustomInfoType.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Sensitivity for this CustomInfoType. If this CustomInfoType extends an existing InfoType, the sensitivity here will take precedence over that of the original InfoType. If unset for a CustomInfoType, it will default to HIGH. This only applies to data profiling.",
          ).optional(),
          storedType: z.unknown().describe(
            "Loads an existing `StoredInfoType` resource.",
          ).optional(),
          surrogateType: z.unknown().describe(
            "Message for detecting output from deidentification transformations that support reversing.",
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://docs.cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Optional custom sensitivity for this InfoType. This only applies to data profiling.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
        ).optional(),
        limits: z.object({
          maxFindingsPerInfoType: z.array(z.unknown()).describe(
            "Configuration of findings limit given for specified infoTypes.",
          ).optional(),
          maxFindingsPerItem: z.number().int().describe(
            "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
          ).optional(),
          maxFindingsPerRequest: z.number().int().describe(
            "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
          ).optional(),
        }).describe(
          "Configuration to control the number of findings returned. This is not used for data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error. When set within an InspectJobConfig, the specified maximum values aren't hard limits. If an inspection job reaches these limits, the job ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than these maximum values.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://docs.cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information the likelihood threshold applies to. Only one likelihood per info_type should be provided. If InfoTypeLikelihood does not have an info_type, the configuration fails.",
          ).optional(),
          minLikelihood: z.unknown().describe(
            "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
          ).optional(),
        })).describe(
          "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
        ).optional(),
        ruleSet: z.array(z.object({
          infoTypes: z.unknown().describe(
            "List of infoTypes this rule set is applied to.",
          ).optional(),
          rules: z.unknown().describe(
            "Set of rules to be applied to infoTypes. The rules are applied in order.",
          ).optional(),
        })).describe(
          "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
        ).optional(),
      }).describe("How and what to scan for.").optional(),
      inspectTemplateName: z.string().describe(
        "If provided, will be used as the default for all values in InspectConfig. `inspect_config` will be merged into the values persisted as part of the template.",
      ).optional(),
      storageConfig: z.object({
        bigQueryOptions: z.object({
          excludedFields: z.array(z.unknown()).describe(
            "References to fields excluded from scanning. This allows you to skip inspection of entire columns which you know have no findings. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          identifyingFields: z.array(z.unknown()).describe(
            "Table fields that may uniquely identify a row within the table. When `actions.saveFindings.outputConfig.table` is specified, the values of columns specified here are available in the output table under `location.content_locations.record_location.record_key.id_values`. Nested fields such as `person.birthdate.year` are allowed.",
          ).optional(),
          includedFields: z.array(z.unknown()).describe(
            "Limit scanning only to these fields. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          rowsLimit: z.string().describe(
            "Max number of rows to scan. If the table has more rows than this value, the rest of the rows are omitted. If not set, or if set to 0, all rows will be scanned. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig.",
          ).optional(),
          rowsLimitPercent: z.number().int().describe(
            "Max percentage of rows to scan. The rest are omitted. The number of rows scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. Caution: A [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#bq-sampling) is causing the `rowsLimitPercent` field to behave unexpectedly. We recommend using `rowsLimit` instead.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
          tableReference: z.object({
            datasetId: z.unknown().describe("Dataset ID of the table.")
              .optional(),
            projectId: z.unknown().describe(
              "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
            ).optional(),
            tableId: z.unknown().describe("Name of the table.").optional(),
          }).describe("Complete BigQuery table reference.").optional(),
        }).describe("BigQuery options.").optional(),
        cloudStorageOptions: z.object({
          bytesLimitPerFile: z.string().describe(
            "Max number of bytes to scan from a file. If a scanned file's size is bigger than this value then the rest of the bytes are omitted. Only one of `bytes_limit_per_file` and `bytes_limit_per_file_percent` can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://docs.cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          bytesLimitPerFilePercent: z.number().int().describe(
            "Max percentage of bytes to scan from a file. The rest are omitted. The number of bytes scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of bytes_limit_per_file and bytes_limit_per_file_percent can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://docs.cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          fileSet: z.object({
            regexFileSet: z.unknown().describe(
              "The regex-filtered set of files to scan. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
            url: z.unknown().describe(
              "The Cloud Storage url of the file(s) to scan, in the format `gs:///`. Trailing wildcard in the path is allowed. If the url ends in a trailing slash, the bucket or directory represented by the url will be scanned non-recursively (content in sub-directories will not be scanned). This means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
          }).describe("The set of one or more files to scan.").optional(),
          fileTypes: z.array(z.unknown()).describe(
            "List of file type groups to include in the scan. If empty, all files are scanned and available data format processors are applied. In addition, the binary content of the selected files is always scanned as well. Images are scanned only as binary if the specified region does not support image inspection and no file_types were specified. Image inspection is restricted to 'global', 'us', 'asia', and 'europe'.",
          ).optional(),
          filesLimitPercent: z.number().int().describe(
            "Limits the number of files to scan to this percentage of the input FileSet. Number of files scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
        }).describe("Cloud Storage options.").optional(),
        datastoreOptions: z.object({
          kind: z.object({
            name: z.unknown().describe("The name of the kind.").optional(),
          }).describe("The kind to process.").optional(),
          partitionId: z.object({
            namespaceId: z.unknown().describe(
              "If not empty, the ID of the namespace to which the entities belong.",
            ).optional(),
            projectId: z.unknown().describe(
              "The ID of the project to which the entities belong.",
            ).optional(),
          }).describe(
            "A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty.",
          ).optional(),
        }).describe("Google Cloud Datastore options.").optional(),
        hybridOptions: z.object({
          description: z.string().describe(
            "A short description of where the data is coming from. Will be stored once in the job. 256 max length.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'To organize findings, these labels will be added to each finding. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment": "production"` * `"pipeline": "etl"`',
          ).optional(),
          requiredFindingLabelKeys: z.array(z.unknown()).describe(
            "These are labels that each inspection request must include within their 'finding_labels' map. Request may contain others, but any missing one of these will be rejected. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required.",
          ).optional(),
          tableOptions: z.object({
            identifyingFields: z.unknown().describe(
              "The columns that are the primary keys for table objects included in ContentItem. A copy of this cell's value will stored alongside alongside each finding so that the finding can be traced to the specific row it came from. No more than 3 may be provided.",
            ).optional(),
          }).describe(
            "If the container is a table, additional information to make findings meaningful such as the columns that are primary keys.",
          ).optional(),
        }).describe("Hybrid inspection options.").optional(),
        timespanConfig: z.object({
          enableAutoPopulationOfTimespanConfig: z.boolean().describe(
            "When the job is started by a JobTrigger we will automatically figure out a valid start_time to avoid scanning files that have not been modified since the last time the JobTrigger executed. This will be based on the time of the execution of the last run of the JobTrigger or the timespan end_time used in the last run of the JobTrigger. **For BigQuery** Inspect jobs triggered by automatic population will scan data that is at least three hours old when the job starts. This is because streaming buffer rows are not read during inspection and reading up to the current timestamp will result in skipped rows. See the [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#recently-streamed-data) related to this operation.",
          ).optional(),
          endTime: z.string().describe(
            "Exclude files, tables, or rows newer than this value. If not set, no upper time limit is applied.",
          ).optional(),
          startTime: z.string().describe(
            "Exclude files, tables, or rows older than this value. If not set, no lower time limit is applied.",
          ).optional(),
          timestampField: z.object({
            name: z.unknown().describe("Name describing the field.").optional(),
          }).describe(
            "Specification of the field containing the timestamp of scanned items. Used for data sources like Datastore and BigQuery. **For BigQuery** If this value is not specified and the table was modified between the given start and end times, the entire table will be scanned. If this value is specified, then rows are filtered based on the given start and end times. Rows with a `NULL` value in the provided BigQuery column are skipped. Valid data types of the provided BigQuery column are: `INTEGER`, `DATE`, `TIMESTAMP`, and `DATETIME`. If your BigQuery table is [partitioned at ingestion time](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time), you can use any of the following pseudo-columns as your timestamp field. When used with Cloud DLP, these pseudo-column names are case sensitive. - `_PARTITIONTIME` - `_PARTITIONDATE` - `_PARTITION_LOAD_TIME` **For Datastore** If this value is specified, then entities are filtered based on the given start and end times. If an entity does not contain the provided timestamp property or contains empty or invalid values, then it is included. Valid data types of the provided timestamp property are: `TIMESTAMP`. See the [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#bq-timespan) related to this operation.",
          ).optional(),
        }).describe(
          "Configuration of the timespan of the items to include in scanning.",
        ).optional(),
      }).describe("The data to scan.").optional(),
    }).describe("For inspect jobs, a snapshot of the configuration.")
      .optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this trigger executed.",
    ).optional(),
    name: z.string().describe(
      "Output only. Unique resource name for the triggeredJob, assigned by the service when the triggeredJob is created, for example `projects/dlp-test-project/jobTriggers/53234423`.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "HEALTHY", "PAUSED", "CANCELLED"])
      .describe("Required. A status for this trigger.").optional(),
    triggers: z.array(z.object({
      manual: z.object({}).describe(
        "For use with hybrid jobs. Jobs must be manually created and finished.",
      ).optional(),
      schedule: z.object({
        recurrencePeriodDuration: z.string().describe(
          "With this option a job is started on a regular periodic basis. For example: every day (86400 seconds). A scheduled start time will be skipped if the previous execution has not ended when its scheduled time occurs. This value must be set to a time duration greater than or equal to 1 day and can be no longer than 60 days.",
        ).optional(),
      }).describe(
        "Create a job on a repeating basis based on the elapse of time.",
      ).optional(),
    })).describe(
      "A list of triggers which will be OR'ed together. Only one in the list needs to trigger for a job to be started. The list may contain only a single Schedule trigger and must have at least one object.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a triggeredJob.",
    ).optional(),
  }).describe("New JobTrigger value.").optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  triggerId: z.string().describe(
    "The trigger id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  errors: z.array(z.object({
    details: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    extraInfo: z.string(),
    timestamps: z.array(z.string()),
  })).optional(),
  inspectJob: z.object({
    actions: z.array(z.object({
      deidentify: z.object({
        cloudStorageOutput: z.string(),
        fileTypesToTransform: z.array(z.unknown()),
        transformationConfig: z.object({
          deidentifyTemplate: z.unknown(),
          imageRedactTemplate: z.unknown(),
          structuredDeidentifyTemplate: z.unknown(),
        }),
        transformationDetailsStorageConfig: z.object({
          table: z.unknown(),
        }),
      }),
      jobNotificationEmails: z.object({}),
      pubSub: z.object({
        topic: z.string(),
      }),
      publishFindingsToCloudDataCatalog: z.object({}),
      publishFindingsToDataplexCatalog: z.object({}),
      publishSummaryToCscc: z.object({}),
      publishToStackdriver: z.object({}),
      saveFindings: z.object({
        outputConfig: z.object({
          outputSchema: z.unknown(),
          storagePath: z.unknown(),
          table: z.unknown(),
        }),
      }),
    })),
    inspectConfig: z.object({
      contentOptions: z.array(z.string()),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.unknown()),
        dictionary: z.object({
          cloudStoragePath: z.unknown(),
          wordList: z.unknown(),
        }),
        exclusionType: z.string(),
        fileLabelInfoType: z.object({
          googleDriveLabel: z.unknown(),
          sensitivityLabel: z.unknown(),
        }),
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
        likelihood: z.string(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.unknown(),
          valueRegex: z.unknown(),
        }),
        regex: z.object({
          groupIndexes: z.unknown(),
          pattern: z.unknown(),
        }),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        storedType: z.object({
          createTime: z.unknown(),
          name: z.unknown(),
        }),
        surrogateType: z.object({}),
      })),
      excludeInfoTypes: z.boolean(),
      includeQuote: z.boolean(),
      infoTypes: z.array(z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        version: z.string(),
      })),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.unknown(),
          maxFindings: z.unknown(),
        })),
        maxFindingsPerItem: z.number(),
        maxFindingsPerRequest: z.number(),
      }),
      minLikelihood: z.string(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
        minLikelihood: z.string(),
      })),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.unknown()),
        rules: z.array(z.unknown()),
      })),
    }),
    inspectTemplateName: z.string(),
    storageConfig: z.object({
      bigQueryOptions: z.object({
        excludedFields: z.array(z.object({
          name: z.unknown(),
        })),
        identifyingFields: z.array(z.object({
          name: z.unknown(),
        })),
        includedFields: z.array(z.object({
          name: z.unknown(),
        })),
        rowsLimit: z.string(),
        rowsLimitPercent: z.number(),
        sampleMethod: z.string(),
        tableReference: z.object({
          datasetId: z.string(),
          projectId: z.string(),
          tableId: z.string(),
        }),
      }),
      cloudStorageOptions: z.object({
        bytesLimitPerFile: z.string(),
        bytesLimitPerFilePercent: z.number(),
        fileSet: z.object({
          regexFileSet: z.object({
            bucketName: z.unknown(),
            excludeRegex: z.unknown(),
            includeRegex: z.unknown(),
          }),
          url: z.string(),
        }),
        fileTypes: z.array(z.string()),
        filesLimitPercent: z.number(),
        sampleMethod: z.string(),
      }),
      datastoreOptions: z.object({
        kind: z.object({
          name: z.string(),
        }),
        partitionId: z.object({
          namespaceId: z.string(),
          projectId: z.string(),
        }),
      }),
      hybridOptions: z.object({
        description: z.string(),
        labels: z.record(z.string(), z.unknown()),
        requiredFindingLabelKeys: z.array(z.string()),
        tableOptions: z.object({
          identifyingFields: z.array(z.unknown()),
        }),
      }),
      timespanConfig: z.object({
        enableAutoPopulationOfTimespanConfig: z.boolean(),
        endTime: z.string(),
        startTime: z.string(),
        timestampField: z.object({
          name: z.string(),
        }),
      }),
    }),
  }).optional(),
  lastRunTime: z.string().optional(),
  name: z.string(),
  status: z.string().optional(),
  triggers: z.array(z.object({
    manual: z.object({}),
    schedule: z.object({
      recurrencePeriodDuration: z.string(),
    }),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  jobTrigger: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a triggeredJob.",
    ).optional(),
    description: z.string().describe(
      "User provided description (max 256 chars)",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Detailed error codes and messages.").optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the trigger was activated. Repeated errors may result in the JobTrigger automatically being paused. Will return the last 100 errors. Whenever the JobTrigger is modified this list will be cleared.",
    ).optional(),
    inspectJob: z.object({
      actions: z.array(z.object({
        deidentify: z.object({
          cloudStorageOutput: z.unknown().describe(
            "Required. User settable Cloud Storage bucket and folders to store de-identified files. This field must be set for Cloud Storage deidentification. The output Cloud Storage bucket must be different from the input bucket. De-identified files will overwrite files in the output path. Form of: gs://bucket/folder/ or gs://bucket",
          ).optional(),
          fileTypesToTransform: z.unknown().describe(
            "List of user-specified file type groups to transform. If specified, only the files with these file types are transformed. If empty, all supported files are transformed. Supported types may be automatically added over time. Any unsupported file types that are set in this field are excluded from de-identification. An error is recorded for each unsupported file in the TransformationDetails output table. Currently the only file types supported are: IMAGES, TEXT_FILES, CSV, TSV.",
          ).optional(),
          transformationConfig: z.unknown().describe(
            "User specified deidentify templates and configs for structured, unstructured, and image files.",
          ).optional(),
          transformationDetailsStorageConfig: z.unknown().describe(
            "Config for storing transformation details. This field specifies the configuration for storing detailed metadata about each transformation performed during a de-identification process. The metadata is stored separately from the de-identified content itself and provides a granular record of both successful transformations and any failures that occurred. Enabling this configuration is essential for users who need to access comprehensive information about the status, outcome, and specifics of each transformation. The details are captured in the TransformationDetails message for each operation. Key use cases: * **Auditing and compliance** * Provides a verifiable audit trail of de-identification activities, which is crucial for meeting regulatory requirements and internal data governance policies. * Logs what data was transformed, what transformations were applied, when they occurred, and their success status. This helps demonstrate accountability and due diligence in protecting sensitive data. * **Troubleshooting and debugging** * Offers detailed error messages and context if a transformation fails. This information is useful for diagnosing and resolving issues in the de-identification pipeline. * Helps pinpoint the exact location and nature of failures, speeding up the debugging process. * **Process verification and quality assurance** * Allows users to confirm that de-identification rules and transformations were applied correctly and consistently across the dataset as intended. * Helps in verifying the effectiveness of the chosen de-identification strategies. * **Data lineage and impact analysis** * Creates a record of how data elements were modified, contributing to data lineage. This is useful for understanding the provenance of de-identified data. * Aids in assessing the potential impact of de-identification choices on downstream analytical processes or data usability. * **Reporting and operational insights** * You can analyze the metadata stored in a queryable BigQuery table to generate reports on transformation success rates, common error types, processing volumes (e.g., transformedBytes), and the types of transformations applied. * These insights can inform optimization of de-identification configurations and resource planning. To take advantage of these benefits, set this configuration. The stored details include a description of the transformation, success or error codes, error messages, the number of bytes transformed, the location of the transformed content, and identifiers for the job and source data.",
          ).optional(),
        }).describe("Create a de-identified copy of the input data.")
          .optional(),
        jobNotificationEmails: z.object({}).describe(
          "Sends an email when the job completes. The email goes to IAM project owners and technical [Essential Contacts](https://docs.cloud.google.com/resource-manager/docs/managing-notification-contacts).",
        ).optional(),
        pubSub: z.object({
          topic: z.unknown().describe(
            "Cloud Pub/Sub topic to send notifications to. The topic must have given publishing access rights to the DLP API service account executing the long running DlpJob sending the notifications. Format is projects/{project}/topics/{topic}.",
          ).optional(),
        }).describe("Publish a notification to a Pub/Sub topic.").optional(),
        publishFindingsToCloudDataCatalog: z.object({}).describe(
          "Deprecated because Data Catalog is being turned down. Use publish_findings_to_dataplex_catalog to publish findings to Dataplex Universal Catalog.",
        ).optional(),
        publishFindingsToDataplexCatalog: z.object({}).describe(
          "Publish findings as an aspect to Dataplex Universal Catalog.",
        ).optional(),
        publishSummaryToCscc: z.object({}).describe(
          "Publish summary to Cloud Security Command Center (Alpha).",
        ).optional(),
        publishToStackdriver: z.object({}).describe(
          "Enable Stackdriver metric dlp.googleapis.com/finding_count.",
        ).optional(),
        saveFindings: z.object({
          outputConfig: z.unknown().describe(
            "Location to store findings outside of DLP.",
          ).optional(),
        }).describe("Save resulting findings in a provided location.")
          .optional(),
      })).describe("Actions to execute at the completion of the job.")
        .optional(),
      inspectConfig: z.object({
        contentOptions: z.array(
          z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
        ).describe("Deprecated and unused.").optional(),
        customInfoTypes: z.array(z.object({
          detectionRules: z.unknown().describe(
            "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          dictionary: z.unknown().describe(
            "A list of phrases to detect as a CustomInfoType.",
          ).optional(),
          exclusionType: z.unknown().describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          fileLabelInfoType: z.unknown().describe("File label to detect.")
            .optional(),
          infoType: z.unknown().describe(
            "CustomInfoType can either be a new infoType, or an extension of built-in infoType, when the name matches one of existing infoTypes and that infoType is specified in `InspectContent.info_types` field. Specifying the latter adds findings to the one detected by the system. If built-in info type is not specified in `InspectContent.info_types` list then the name is treated as a custom info type.",
          ).optional(),
          likelihood: z.unknown().describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.unknown().describe(
            "Key-value pair to detect in the metadata.",
          ).optional(),
          regex: z.unknown().describe(
            "Regular expression based CustomInfoType.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Sensitivity for this CustomInfoType. If this CustomInfoType extends an existing InfoType, the sensitivity here will take precedence over that of the original InfoType. If unset for a CustomInfoType, it will default to HIGH. This only applies to data profiling.",
          ).optional(),
          storedType: z.unknown().describe(
            "Loads an existing `StoredInfoType` resource.",
          ).optional(),
          surrogateType: z.unknown().describe(
            "Message for detecting output from deidentification transformations that support reversing.",
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://docs.cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Optional custom sensitivity for this InfoType. This only applies to data profiling.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
        ).optional(),
        limits: z.object({
          maxFindingsPerInfoType: z.array(z.unknown()).describe(
            "Configuration of findings limit given for specified infoTypes.",
          ).optional(),
          maxFindingsPerItem: z.number().int().describe(
            "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
          ).optional(),
          maxFindingsPerRequest: z.number().int().describe(
            "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
          ).optional(),
        }).describe(
          "Configuration to control the number of findings returned. This is not used for data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error. When set within an InspectJobConfig, the specified maximum values aren't hard limits. If an inspection job reaches these limits, the job ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than these maximum values.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://docs.cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information the likelihood threshold applies to. Only one likelihood per info_type should be provided. If InfoTypeLikelihood does not have an info_type, the configuration fails.",
          ).optional(),
          minLikelihood: z.unknown().describe(
            "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
          ).optional(),
        })).describe(
          "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
        ).optional(),
        ruleSet: z.array(z.object({
          infoTypes: z.unknown().describe(
            "List of infoTypes this rule set is applied to.",
          ).optional(),
          rules: z.unknown().describe(
            "Set of rules to be applied to infoTypes. The rules are applied in order.",
          ).optional(),
        })).describe(
          "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
        ).optional(),
      }).describe("How and what to scan for.").optional(),
      inspectTemplateName: z.string().describe(
        "If provided, will be used as the default for all values in InspectConfig. `inspect_config` will be merged into the values persisted as part of the template.",
      ).optional(),
      storageConfig: z.object({
        bigQueryOptions: z.object({
          excludedFields: z.array(z.unknown()).describe(
            "References to fields excluded from scanning. This allows you to skip inspection of entire columns which you know have no findings. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          identifyingFields: z.array(z.unknown()).describe(
            "Table fields that may uniquely identify a row within the table. When `actions.saveFindings.outputConfig.table` is specified, the values of columns specified here are available in the output table under `location.content_locations.record_location.record_key.id_values`. Nested fields such as `person.birthdate.year` are allowed.",
          ).optional(),
          includedFields: z.array(z.unknown()).describe(
            "Limit scanning only to these fields. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          rowsLimit: z.string().describe(
            "Max number of rows to scan. If the table has more rows than this value, the rest of the rows are omitted. If not set, or if set to 0, all rows will be scanned. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig.",
          ).optional(),
          rowsLimitPercent: z.number().int().describe(
            "Max percentage of rows to scan. The rest are omitted. The number of rows scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. Caution: A [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#bq-sampling) is causing the `rowsLimitPercent` field to behave unexpectedly. We recommend using `rowsLimit` instead.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
          tableReference: z.object({
            datasetId: z.unknown().describe("Dataset ID of the table.")
              .optional(),
            projectId: z.unknown().describe(
              "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
            ).optional(),
            tableId: z.unknown().describe("Name of the table.").optional(),
          }).describe("Complete BigQuery table reference.").optional(),
        }).describe("BigQuery options.").optional(),
        cloudStorageOptions: z.object({
          bytesLimitPerFile: z.string().describe(
            "Max number of bytes to scan from a file. If a scanned file's size is bigger than this value then the rest of the bytes are omitted. Only one of `bytes_limit_per_file` and `bytes_limit_per_file_percent` can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://docs.cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          bytesLimitPerFilePercent: z.number().int().describe(
            "Max percentage of bytes to scan from a file. The rest are omitted. The number of bytes scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of bytes_limit_per_file and bytes_limit_per_file_percent can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://docs.cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          fileSet: z.object({
            regexFileSet: z.unknown().describe(
              "The regex-filtered set of files to scan. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
            url: z.unknown().describe(
              "The Cloud Storage url of the file(s) to scan, in the format `gs:///`. Trailing wildcard in the path is allowed. If the url ends in a trailing slash, the bucket or directory represented by the url will be scanned non-recursively (content in sub-directories will not be scanned). This means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
          }).describe("The set of one or more files to scan.").optional(),
          fileTypes: z.array(z.unknown()).describe(
            "List of file type groups to include in the scan. If empty, all files are scanned and available data format processors are applied. In addition, the binary content of the selected files is always scanned as well. Images are scanned only as binary if the specified region does not support image inspection and no file_types were specified. Image inspection is restricted to 'global', 'us', 'asia', and 'europe'.",
          ).optional(),
          filesLimitPercent: z.number().int().describe(
            "Limits the number of files to scan to this percentage of the input FileSet. Number of files scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
        }).describe("Cloud Storage options.").optional(),
        datastoreOptions: z.object({
          kind: z.object({
            name: z.unknown().describe("The name of the kind.").optional(),
          }).describe("The kind to process.").optional(),
          partitionId: z.object({
            namespaceId: z.unknown().describe(
              "If not empty, the ID of the namespace to which the entities belong.",
            ).optional(),
            projectId: z.unknown().describe(
              "The ID of the project to which the entities belong.",
            ).optional(),
          }).describe(
            "A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty.",
          ).optional(),
        }).describe("Google Cloud Datastore options.").optional(),
        hybridOptions: z.object({
          description: z.string().describe(
            "A short description of where the data is coming from. Will be stored once in the job. 256 max length.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'To organize findings, these labels will be added to each finding. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment": "production"` * `"pipeline": "etl"`',
          ).optional(),
          requiredFindingLabelKeys: z.array(z.unknown()).describe(
            "These are labels that each inspection request must include within their 'finding_labels' map. Request may contain others, but any missing one of these will be rejected. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required.",
          ).optional(),
          tableOptions: z.object({
            identifyingFields: z.unknown().describe(
              "The columns that are the primary keys for table objects included in ContentItem. A copy of this cell's value will stored alongside alongside each finding so that the finding can be traced to the specific row it came from. No more than 3 may be provided.",
            ).optional(),
          }).describe(
            "If the container is a table, additional information to make findings meaningful such as the columns that are primary keys.",
          ).optional(),
        }).describe("Hybrid inspection options.").optional(),
        timespanConfig: z.object({
          enableAutoPopulationOfTimespanConfig: z.boolean().describe(
            "When the job is started by a JobTrigger we will automatically figure out a valid start_time to avoid scanning files that have not been modified since the last time the JobTrigger executed. This will be based on the time of the execution of the last run of the JobTrigger or the timespan end_time used in the last run of the JobTrigger. **For BigQuery** Inspect jobs triggered by automatic population will scan data that is at least three hours old when the job starts. This is because streaming buffer rows are not read during inspection and reading up to the current timestamp will result in skipped rows. See the [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#recently-streamed-data) related to this operation.",
          ).optional(),
          endTime: z.string().describe(
            "Exclude files, tables, or rows newer than this value. If not set, no upper time limit is applied.",
          ).optional(),
          startTime: z.string().describe(
            "Exclude files, tables, or rows older than this value. If not set, no lower time limit is applied.",
          ).optional(),
          timestampField: z.object({
            name: z.unknown().describe("Name describing the field.").optional(),
          }).describe(
            "Specification of the field containing the timestamp of scanned items. Used for data sources like Datastore and BigQuery. **For BigQuery** If this value is not specified and the table was modified between the given start and end times, the entire table will be scanned. If this value is specified, then rows are filtered based on the given start and end times. Rows with a `NULL` value in the provided BigQuery column are skipped. Valid data types of the provided BigQuery column are: `INTEGER`, `DATE`, `TIMESTAMP`, and `DATETIME`. If your BigQuery table is [partitioned at ingestion time](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time), you can use any of the following pseudo-columns as your timestamp field. When used with Cloud DLP, these pseudo-column names are case sensitive. - `_PARTITIONTIME` - `_PARTITIONDATE` - `_PARTITION_LOAD_TIME` **For Datastore** If this value is specified, then entities are filtered based on the given start and end times. If an entity does not contain the provided timestamp property or contains empty or invalid values, then it is included. Valid data types of the provided timestamp property are: `TIMESTAMP`. See the [known issue](https://docs.cloud.google.com/sensitive-data-protection/docs/known-issues#bq-timespan) related to this operation.",
          ).optional(),
        }).describe(
          "Configuration of the timespan of the items to include in scanning.",
        ).optional(),
      }).describe("The data to scan.").optional(),
    }).describe("For inspect jobs, a snapshot of the configuration.")
      .optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this trigger executed.",
    ).optional(),
    name: z.string().describe(
      "Output only. Unique resource name for the triggeredJob, assigned by the service when the triggeredJob is created, for example `projects/dlp-test-project/jobTriggers/53234423`.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "HEALTHY", "PAUSED", "CANCELLED"])
      .describe("Required. A status for this trigger.").optional(),
    triggers: z.array(z.object({
      manual: z.object({}).describe(
        "For use with hybrid jobs. Jobs must be manually created and finished.",
      ).optional(),
      schedule: z.object({
        recurrencePeriodDuration: z.string().describe(
          "With this option a job is started on a regular periodic basis. For example: every day (86400 seconds). A scheduled start time will be skipped if the previous execution has not ended when its scheduled time occurs. This value must be set to a time duration greater than or equal to 1 day and can be no longer than 60 days.",
        ).optional(),
      }).describe(
        "Create a job on a repeating basis based on the elapse of time.",
      ).optional(),
    })).describe(
      "A list of triggers which will be OR'ed together. Only one in the list needs to trigger for a job to be started. The list may contain only a single Schedule trigger and must have at least one object.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a triggeredJob.",
    ).optional(),
  }).describe("New JobTrigger value.").optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  triggerId: z.string().describe(
    "The trigger id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) JobTriggers. Registered at `@swamp/gcp/dlp/jobtriggers`. */
export const model = {
  type: "@swamp/gcp/dlp/jobtriggers",
  version: "2026.10.13.1",
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
      toVersion: "2026.06.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
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
      toVersion: "2026.07.21.4",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Contains a configuration to make API calls on a repeating basis. See https://...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobTriggers",
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
        if (g["jobTrigger"] !== undefined) body["jobTrigger"] = g["jobTrigger"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
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
          undefined,
          credentials,
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
      description: "Get a jobTriggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTriggers"),
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
      description: "Update jobTriggers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific jobTriggers by name (e.g. one discovered by list)",
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
        if (g["jobTrigger"] !== undefined) body["jobTrigger"] = g["jobTrigger"];
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
      description: "Delete the jobTriggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTriggers"),
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
      description: "Sync jobTriggers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific jobTriggers by name (e.g. one discovered by list)",
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
      description: "List jobTriggers resources",
      arguments: z.object({
        filter: z.string().describe(
          "Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED - `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` - RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds are ignored. - 'error_count' - Number of errors that have occurred while running. * The operator must be `=` or `!=` for status and inspected_storage. The syntax is based on https://google.aip.dev/160. Examples: * inspected_storage = cloud_storage AND status = HEALTHY * inspected_storage = cloud_storage OR inspected_storage = bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state = HEALTHY) * last_run_time > \\\"2017-12-12T00:00:00+00:00\\\" The length of this field should be no more than 500 characters.",
        ).optional(),
        locationId: z.string().describe("Deprecated. This field has no effect.")
          .optional(),
        orderBy: z.string().describe(
          "Comma-separated list of triggeredJob fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `create_time`: corresponds to the time the JobTrigger was created. - `update_time`: corresponds to the time the JobTrigger was last updated. - `last_run_time`: corresponds to the last time the JobTrigger ran. - `name`: corresponds to the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's display name. - `status`: corresponds to JobTrigger's status.",
        ).optional(),
        pageSize: z.number().describe(
          "Size of the page. This value can be limited by a server.",
        ).optional(),
        type: z.string().describe(
          "The type of jobs. Will use `DlpJobType.INSPECT` if not set.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["locationId"] !== undefined) {
          params["locationId"] = String(args["locationId"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "jobTriggers",
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
  },
};
