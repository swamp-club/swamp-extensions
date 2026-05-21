// Auto-generated extension model for @swamp/gcp/dlp/inspecttemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) InspectTemplates.
 *
 * The inspectTemplate contains a configuration (set of types of sensitive data to be detected) to be used anywhere you otherwise would normally specify InspectConfig. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.
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
  return `${parent}/inspectTemplates/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.inspectTemplates.get",
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
  "id": "dlp.organizations.inspectTemplates.create",
  "path": "v2/{+parent}/inspectTemplates",
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
  "id": "dlp.organizations.inspectTemplates.patch",
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
  "id": "dlp.organizations.inspectTemplates.delete",
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
  "id": "dlp.organizations.inspectTemplates.list",
  "path": "v2/{+parent}/inspectTemplates",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  inspectTemplate: z.object({
    allowLimitedAvailabilityInfoTypes: z.boolean().describe(
      "Optional. Enables the use of limited-availability built-in infoTypes in inspect_config. These infoTypes are supported only in specific regions and can cause scanning errors if used elsewhere. For more information, see https://cloud.google.com/sensitive-data-protection/docs/locations#location-specific_limitations to learn more about location-specific limitations.",
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
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`;",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe(
    "The inspectTemplate contains a configuration (set of types of sensitive data to be detected) to be used anywhere you otherwise would normally specify InspectConfig. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  allowLimitedAvailabilityInfoTypes: z.boolean().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
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
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  inspectTemplate: z.object({
    allowLimitedAvailabilityInfoTypes: z.boolean().describe(
      "Optional. Enables the use of limited-availability built-in infoTypes in inspect_config. These infoTypes are supported only in specific regions and can cause scanning errors if used elsewhere. For more information, see https://cloud.google.com/sensitive-data-protection/docs/locations#location-specific_limitations to learn more about location-specific limitations.",
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
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`;",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe(
    "The inspectTemplate contains a configuration (set of types of sensitive data to be detected) to be used anywhere you otherwise would normally specify InspectConfig. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) InspectTemplates. Registered at `@swamp/gcp/dlp/inspecttemplates`. */
export const model = {
  type: "@swamp/gcp/dlp/inspecttemplates",
  version: "2026.05.21.1",
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
      toVersion: "2026.05.15.1",
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
        "The inspectTemplate contains a configuration (set of types of sensitive data ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a inspectTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["inspectTemplate"] !== undefined) {
          body["inspectTemplate"] = g["inspectTemplate"];
        }
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["templateId"] !== undefined) body["templateId"] = g["templateId"];
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
      description: "Get a inspectTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the inspectTemplates"),
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
      description: "Update inspectTemplates attributes",
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
        if (g["inspectTemplate"] !== undefined) {
          body["inspectTemplate"] = g["inspectTemplate"];
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
      description: "Delete the inspectTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the inspectTemplates"),
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
      description: "Sync inspectTemplates state from GCP",
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
  },
};
