// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/dlp/contentpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) ContentPolicies.
 *
 * A policy to apply to content based on its inspection findings.
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
  return `${parent}/contentPolicies/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.projects.locations.contentPolicies.get",
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
  "id": "dlp.projects.locations.contentPolicies.create",
  "path": "v2/{+parent}/contentPolicies",
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
  "id": "dlp.projects.locations.contentPolicies.patch",
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
  "id": "dlp.projects.locations.contentPolicies.delete",
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
  "id": "dlp.projects.locations.contentPolicies.list",
  "path": "v2/{+parent}/contentPolicies",
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
  contentPolicy: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a contentPolicy; output-only field.",
    ).optional(),
    defaultAction: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    displayName: z.string().describe("Optional. Display name (max 63 chars)")
      .optional(),
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the policy was applied. Output only field. Will return the last 100 errors. Whenever the policy is modified this list will be cleared.",
    ).optional(),
    failedToScanSupportedFileType: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    inputTooLarge: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    inspectConfig: z.object({
      contentOptions: z.array(
        z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
      ).describe("Deprecated and unused.").optional(),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.unknown()).describe(
          "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
        ).optional(),
        dictionary: z.object({
          cloudStoragePath: z.unknown().describe(
            "Message representing a single file or path in Cloud Storage.",
          ).optional(),
          wordList: z.unknown().describe(
            "Message defining a list of words or phrases to search for in the data.",
          ).optional(),
        }).describe(
          'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
        ).optional(),
        exclusionType: z.enum([
          "EXCLUSION_TYPE_UNSPECIFIED",
          "EXCLUSION_TYPE_EXCLUDE",
        ]).describe(
          "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
        ).optional(),
        fileLabelInfoType: z.object({
          googleDriveLabel: z.unknown().describe(
            "Google Drive labels published by Google.",
          ).optional(),
          sensitivityLabel: z.unknown().describe(
            "Sensitivity labels published by Microsoft.",
          ).optional(),
        }).describe(
          "Configuration for a custom infoType that detects file labels.",
        ).optional(),
        infoType: z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        }).describe("Type of information detected by the API.").optional(),
        likelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
        ).optional(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.unknown().describe(
            "The regular expression for the key. Key should be non-empty.",
          ).optional(),
          valueRegex: z.unknown().describe(
            "The regular expression for the value. Value should be non-empty.",
          ).optional(),
        }).describe(
          "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
        ).optional(),
        regex: z.object({
          groupIndexes: z.unknown().describe(
            "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
          ).optional(),
          pattern: z.unknown().describe(
            "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
          ).optional(),
        }).describe("Message defining a custom regular expression.").optional(),
        sensitivityScore: z.object({
          score: z.unknown().describe(
            "The sensitivity score applied to the resource.",
          ).optional(),
        }).describe(
          "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
        ).optional(),
        storedType: z.object({
          createTime: z.unknown().describe(
            "Timestamp indicating when the version of the `StoredInfoType` used for inspection was created. Output-only field, populated by the system.",
          ).optional(),
          name: z.unknown().describe(
            "Resource name of the requested `StoredInfoType`, for example `organizations/433245324/storedInfoTypes/432452342` or `projects/project-id/storedInfoTypes/432452342`.",
          ).optional(),
        }).describe("A reference to a StoredInfoType to use with scanning.")
          .optional(),
        surrogateType: z.object({}).describe(
          'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
        ).optional(),
      })).describe(
        "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
      ).optional(),
      excludeInfoTypes: z.boolean().describe(
        "When true, excludes type information of the findings. This is not used for data profiling.",
      ).optional(),
      includeQuote: z.boolean().describe(
        "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
      ).optional(),
      infoTypes: z.array(z.object({
        name: z.string().describe(
          "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
        ).optional(),
        sensitivityScore: z.object({
          score: z.unknown().describe(
            "The sensitivity score applied to the resource.",
          ).optional(),
        }).describe(
          "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
        ).optional(),
        version: z.string().describe("Optional version name for this InfoType.")
          .optional(),
      })).describe(
        "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
      ).optional(),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
          ).optional(),
          maxFindings: z.unknown().describe(
            "Max findings limit for the given infoType.",
          ).optional(),
        })).describe(
          "Configuration of findings limit given for specified infoTypes.",
        ).optional(),
        maxFindingsPerItem: z.number().int().describe(
          "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
        ).optional(),
        maxFindingsPerRequest: z.number().int().describe(
          "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
        ).optional(),
      }).describe(
        "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
      ).optional(),
      minLikelihood: z.enum([
        "LIKELIHOOD_UNSPECIFIED",
        "VERY_UNLIKELY",
        "UNLIKELY",
        "POSSIBLE",
        "LIKELY",
        "VERY_LIKELY",
      ]).describe(
        "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
      ).optional(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        }).describe("Type of information detected by the API.").optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
        ).optional(),
      })).describe(
        "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
      ).optional(),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.unknown()).describe(
          "List of infoTypes this rule set is applied to.",
        ).optional(),
        rules: z.array(z.unknown()).describe(
          "Set of rules to be applied to infoTypes. The rules are applied in order.",
        ).optional(),
      })).describe(
        "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
      ).optional(),
    }).describe(
      "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
    ).optional(),
    inspectTemplate: z.object({
      allowLimitedAvailabilityInfoTypes: z.boolean().describe(
        "Optional. Enables the use of [limited-availability built-in infoTypes](https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference#limited-availability-infotypes) in inspect_config. These infoTypes are supported only in specific regions and can cause scanning errors if used elsewhere.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The creation timestamp of an inspectTemplate.",
      ).optional(),
      description: z.string().describe("Short description (max 256 chars).")
        .optional(),
      displayName: z.string().describe("Display name (max 256 chars).")
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
            'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
          ).optional(),
          exclusionType: z.unknown().describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          fileLabelInfoType: z.unknown().describe(
            "Configuration for a custom infoType that detects file labels.",
          ).optional(),
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
          ).optional(),
          likelihood: z.unknown().describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.unknown().describe(
            "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
          ).optional(),
          regex: z.unknown().describe(
            "Message defining a custom regular expression.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          storedType: z.unknown().describe(
            "A reference to a StoredInfoType to use with scanning.",
          ).optional(),
          surrogateType: z.unknown().describe(
            'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
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
          "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
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
      }).describe(
        "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
      ).optional(),
      name: z.string().describe(
        "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`;",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The last update timestamp of an inspectTemplate.",
      ).optional(),
    }).describe(
      "The inspectTemplate contains a configuration (set of types of sensitive data to be detected) to be used anywhere you otherwise would normally specify InspectConfig. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
    ).optional(),
    loggingConfigs: z.array(z.object({
      logToBigQuery: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing the BigQuery table to write to.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing the BigQuery table to write to.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the BigQuery table to write to.",
        ).optional(),
      }).describe(
        "Configuration for logging content policy actions to BigQuery.",
      ).optional(),
    })).describe(
      "Optional. Log the actions taken by the content policy to external systems.",
    ).optional(),
    name: z.string().describe("Output only. Resource name of the policy.")
      .optional(),
    rules: z.array(z.object({
      action: z.object({
        returnVerdict: z.enum([
          "CONTENT_POLICY_VERDICT_UNSPECIFIED",
          "ALLOW",
          "BLOCK",
        ]).describe(
          "Optional. If set, the verdict will be returned to the user.",
        ).optional(),
      }).describe("A possible action to take when applying a content policy.")
        .optional(),
      conditions: z.array(z.object({
        infoTypeCondition: z.unknown().describe("A info type based condition.")
          .optional(),
      })).describe(
        "Optional. Conditions that must match for this rule to apply. All conditions must match (`AND`). For `OR` conditions, use multiple rules.",
      ).optional(),
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe(
        "If set, the verdict will be returned to the user. Deprecated: Use `action` instead.",
      ).optional(),
    })).describe(
      "Required. Policies to apply, based on the findings returned by inspection. The first rule to match applies.",
    ).optional(),
    unsupportedFileType: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a contentPolicy; output-only field.",
    ).optional(),
  }).describe("A policy to apply to content based on its inspection findings.")
    .optional(),
  contentPolicyId: z.string().describe(
    "Optional. The content policy ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. If empty, the system will generate a random id.",
  ).optional(),
  updateMask: z.string().describe(
    "Optional. Mask to control which fields get updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  defaultAction: z.object({
    returnVerdict: z.string(),
  }).optional(),
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
  failedToScanSupportedFileType: z.object({
    returnVerdict: z.string(),
  }).optional(),
  inputTooLarge: z.object({
    returnVerdict: z.string(),
  }).optional(),
  inspectConfig: z.object({
    contentOptions: z.array(z.string()),
    customInfoTypes: z.array(z.object({
      detectionRules: z.array(z.object({
        hotwordRule: z.unknown(),
      })),
      dictionary: z.object({
        cloudStoragePath: z.object({
          path: z.unknown(),
        }),
        wordList: z.object({
          words: z.unknown(),
        }),
      }),
      exclusionType: z.string(),
      fileLabelInfoType: z.object({
        googleDriveLabel: z.object({
          labelFieldsToMatch: z.unknown(),
          labelId: z.unknown(),
        }),
        sensitivityLabel: z.object({
          guid: z.unknown(),
        }),
      }),
      infoType: z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        version: z.string(),
      }),
      likelihood: z.string(),
      metadataKeyValueExpression: z.object({
        keyRegex: z.string(),
        valueRegex: z.string(),
      }),
      regex: z.object({
        groupIndexes: z.array(z.unknown()),
        pattern: z.string(),
      }),
      sensitivityScore: z.object({
        score: z.string(),
      }),
      storedType: z.object({
        createTime: z.string(),
        name: z.string(),
      }),
      surrogateType: z.object({}),
    })),
    excludeInfoTypes: z.boolean(),
    includeQuote: z.boolean(),
    infoTypes: z.array(z.object({
      name: z.string(),
      sensitivityScore: z.object({
        score: z.string(),
      }),
      version: z.string(),
    })),
    limits: z.object({
      maxFindingsPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
        maxFindings: z.number(),
      })),
      maxFindingsPerItem: z.number(),
      maxFindingsPerRequest: z.number(),
    }),
    minLikelihood: z.string(),
    minLikelihoodPerInfoType: z.array(z.object({
      infoType: z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        version: z.string(),
      }),
      minLikelihood: z.string(),
    })),
    ruleSet: z.array(z.object({
      infoTypes: z.array(z.object({
        name: z.unknown(),
        sensitivityScore: z.unknown(),
        version: z.unknown(),
      })),
      rules: z.array(z.object({
        adjustmentRule: z.unknown(),
        exclusionRule: z.unknown(),
        hotwordRule: z.unknown(),
      })),
    })),
  }).optional(),
  inspectTemplate: z.object({
    allowLimitedAvailabilityInfoTypes: z.boolean(),
    createTime: z.string(),
    description: z.string(),
    displayName: z.string(),
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
    name: z.string(),
    updateTime: z.string(),
  }).optional(),
  loggingConfigs: z.array(z.object({
    logToBigQuery: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
  })).optional(),
  name: z.string(),
  rules: z.array(z.object({
    action: z.object({
      returnVerdict: z.string(),
    }),
    conditions: z.array(z.object({
      infoTypeCondition: z.object({
        anyInfoType: z.unknown(),
        infoTypes: z.unknown(),
      }),
    })),
    returnVerdict: z.string(),
  })).optional(),
  unsupportedFileType: z.object({
    returnVerdict: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  contentPolicy: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a contentPolicy; output-only field.",
    ).optional(),
    defaultAction: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    displayName: z.string().describe("Optional. Display name (max 63 chars)")
      .optional(),
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the policy was applied. Output only field. Will return the last 100 errors. Whenever the policy is modified this list will be cleared.",
    ).optional(),
    failedToScanSupportedFileType: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    inputTooLarge: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    inspectConfig: z.object({
      contentOptions: z.array(
        z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
      ).describe("Deprecated and unused.").optional(),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.unknown()).describe(
          "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
        ).optional(),
        dictionary: z.object({
          cloudStoragePath: z.unknown().describe(
            "Message representing a single file or path in Cloud Storage.",
          ).optional(),
          wordList: z.unknown().describe(
            "Message defining a list of words or phrases to search for in the data.",
          ).optional(),
        }).describe(
          'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
        ).optional(),
        exclusionType: z.enum([
          "EXCLUSION_TYPE_UNSPECIFIED",
          "EXCLUSION_TYPE_EXCLUDE",
        ]).describe(
          "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
        ).optional(),
        fileLabelInfoType: z.object({
          googleDriveLabel: z.unknown().describe(
            "Google Drive labels published by Google.",
          ).optional(),
          sensitivityLabel: z.unknown().describe(
            "Sensitivity labels published by Microsoft.",
          ).optional(),
        }).describe(
          "Configuration for a custom infoType that detects file labels.",
        ).optional(),
        infoType: z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        }).describe("Type of information detected by the API.").optional(),
        likelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
        ).optional(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.unknown().describe(
            "The regular expression for the key. Key should be non-empty.",
          ).optional(),
          valueRegex: z.unknown().describe(
            "The regular expression for the value. Value should be non-empty.",
          ).optional(),
        }).describe(
          "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
        ).optional(),
        regex: z.object({
          groupIndexes: z.unknown().describe(
            "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
          ).optional(),
          pattern: z.unknown().describe(
            "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
          ).optional(),
        }).describe("Message defining a custom regular expression.").optional(),
        sensitivityScore: z.object({
          score: z.unknown().describe(
            "The sensitivity score applied to the resource.",
          ).optional(),
        }).describe(
          "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
        ).optional(),
        storedType: z.object({
          createTime: z.unknown().describe(
            "Timestamp indicating when the version of the `StoredInfoType` used for inspection was created. Output-only field, populated by the system.",
          ).optional(),
          name: z.unknown().describe(
            "Resource name of the requested `StoredInfoType`, for example `organizations/433245324/storedInfoTypes/432452342` or `projects/project-id/storedInfoTypes/432452342`.",
          ).optional(),
        }).describe("A reference to a StoredInfoType to use with scanning.")
          .optional(),
        surrogateType: z.object({}).describe(
          'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
        ).optional(),
      })).describe(
        "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
      ).optional(),
      excludeInfoTypes: z.boolean().describe(
        "When true, excludes type information of the findings. This is not used for data profiling.",
      ).optional(),
      includeQuote: z.boolean().describe(
        "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
      ).optional(),
      infoTypes: z.array(z.object({
        name: z.string().describe(
          "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
        ).optional(),
        sensitivityScore: z.object({
          score: z.unknown().describe(
            "The sensitivity score applied to the resource.",
          ).optional(),
        }).describe(
          "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
        ).optional(),
        version: z.string().describe("Optional version name for this InfoType.")
          .optional(),
      })).describe(
        "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
      ).optional(),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
          ).optional(),
          maxFindings: z.unknown().describe(
            "Max findings limit for the given infoType.",
          ).optional(),
        })).describe(
          "Configuration of findings limit given for specified infoTypes.",
        ).optional(),
        maxFindingsPerItem: z.number().int().describe(
          "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
        ).optional(),
        maxFindingsPerRequest: z.number().int().describe(
          "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
        ).optional(),
      }).describe(
        "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
      ).optional(),
      minLikelihood: z.enum([
        "LIKELIHOOD_UNSPECIFIED",
        "VERY_UNLIKELY",
        "UNLIKELY",
        "POSSIBLE",
        "LIKELY",
        "VERY_LIKELY",
      ]).describe(
        "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
      ).optional(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        }).describe("Type of information detected by the API.").optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
        ).optional(),
      })).describe(
        "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
      ).optional(),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.unknown()).describe(
          "List of infoTypes this rule set is applied to.",
        ).optional(),
        rules: z.array(z.unknown()).describe(
          "Set of rules to be applied to infoTypes. The rules are applied in order.",
        ).optional(),
      })).describe(
        "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
      ).optional(),
    }).describe(
      "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
    ).optional(),
    inspectTemplate: z.object({
      allowLimitedAvailabilityInfoTypes: z.boolean().describe(
        "Optional. Enables the use of [limited-availability built-in infoTypes](https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference#limited-availability-infotypes) in inspect_config. These infoTypes are supported only in specific regions and can cause scanning errors if used elsewhere.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. The creation timestamp of an inspectTemplate.",
      ).optional(),
      description: z.string().describe("Short description (max 256 chars).")
        .optional(),
      displayName: z.string().describe("Display name (max 256 chars).")
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
            'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
          ).optional(),
          exclusionType: z.unknown().describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          fileLabelInfoType: z.unknown().describe(
            "Configuration for a custom infoType that detects file labels.",
          ).optional(),
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
          ).optional(),
          likelihood: z.unknown().describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.unknown().describe(
            "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
          ).optional(),
          regex: z.unknown().describe(
            "Message defining a custom regular expression.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          storedType: z.unknown().describe(
            "A reference to a StoredInfoType to use with scanning.",
          ).optional(),
          surrogateType: z.unknown().describe(
            'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.unknown().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.unknown().describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.unknown().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
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
          "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.unknown().describe(
            "Type of information detected by the API.",
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
      }).describe(
        "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
      ).optional(),
      name: z.string().describe(
        "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`;",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The last update timestamp of an inspectTemplate.",
      ).optional(),
    }).describe(
      "The inspectTemplate contains a configuration (set of types of sensitive data to be detected) to be used anywhere you otherwise would normally specify InspectConfig. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
    ).optional(),
    loggingConfigs: z.array(z.object({
      logToBigQuery: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing the BigQuery table to write to.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing the BigQuery table to write to.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the BigQuery table to write to.",
        ).optional(),
      }).describe(
        "Configuration for logging content policy actions to BigQuery.",
      ).optional(),
    })).describe(
      "Optional. Log the actions taken by the content policy to external systems.",
    ).optional(),
    name: z.string().describe("Output only. Resource name of the policy.")
      .optional(),
    rules: z.array(z.object({
      action: z.object({
        returnVerdict: z.enum([
          "CONTENT_POLICY_VERDICT_UNSPECIFIED",
          "ALLOW",
          "BLOCK",
        ]).describe(
          "Optional. If set, the verdict will be returned to the user.",
        ).optional(),
      }).describe("A possible action to take when applying a content policy.")
        .optional(),
      conditions: z.array(z.object({
        infoTypeCondition: z.unknown().describe("A info type based condition.")
          .optional(),
      })).describe(
        "Optional. Conditions that must match for this rule to apply. All conditions must match (`AND`). For `OR` conditions, use multiple rules.",
      ).optional(),
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe(
        "If set, the verdict will be returned to the user. Deprecated: Use `action` instead.",
      ).optional(),
    })).describe(
      "Required. Policies to apply, based on the findings returned by inspection. The first rule to match applies.",
    ).optional(),
    unsupportedFileType: z.object({
      returnVerdict: z.enum([
        "CONTENT_POLICY_VERDICT_UNSPECIFIED",
        "ALLOW",
        "BLOCK",
      ]).describe("Optional. If set, the verdict will be returned to the user.")
        .optional(),
    }).describe("A possible action to take when applying a content policy.")
      .optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a contentPolicy; output-only field.",
    ).optional(),
  }).describe("A policy to apply to content based on its inspection findings.")
    .optional(),
  contentPolicyId: z.string().describe(
    "Optional. The content policy ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. If empty, the system will generate a random id.",
  ).optional(),
  updateMask: z.string().describe(
    "Optional. Mask to control which fields get updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) ContentPolicies. Registered at `@swamp/gcp/dlp/contentpolicies`. */
export const model = {
  type: "@swamp/gcp/dlp/contentpolicies",
  version: "2026.06.27.1",
  upgrades: [
    {
      toVersion: "2026.06.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A policy to apply to content based on its inspection findings.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a contentPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["contentPolicy"] !== undefined) {
          body["contentPolicy"] = g["contentPolicy"];
        }
        if (g["contentPolicyId"] !== undefined) {
          body["contentPolicyId"] = g["contentPolicyId"];
        }
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
      description: "Get a contentPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the contentPolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
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
      description: "Update contentPolicies attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["contentPolicy"] !== undefined) {
          body["contentPolicy"] = g["contentPolicy"];
        }
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
          BASE_URL,
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
      description: "Delete the contentPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the contentPolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync contentPolicies state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List contentPolicies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Number of results per page, max 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "contentPolicies",
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
