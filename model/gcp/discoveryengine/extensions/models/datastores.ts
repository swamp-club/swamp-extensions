// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine DataStores.
 *
 * DataStore captures global settings and configs at the DataStore level.
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
  return `${parent}/dataStores/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.get",
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
  "id": "discoveryengine.projects.locations.dataStores.create",
  "path": "v1/{+parent}/dataStores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cmekConfigName": {
      "location": "query",
    },
    "createAdvancedSiteSearch": {
      "location": "query",
    },
    "dataStoreId": {
      "location": "query",
    },
    "disableCmek": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "skipDefaultSchemaCreation": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.list",
  "path": "v1/{+parent}/dataStores",
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
  aclEnabled: z.boolean().describe(
    "Immutable. Whether data in the DataStore has ACL information. If set to `true`, the source data must have ACL. ACL will be ingested when data is ingested by DocumentService.ImportDocuments methods. When ACL is enabled for the DataStore, Document can't be accessed by calling DocumentService.GetDocument or DocumentService.ListDocuments. Currently ACL is only supported in `GENERIC` industry vertical with non-`PUBLIC_WEBSITE` content config.",
  ).optional(),
  advancedSiteSearchConfig: z.object({
    disableAutomaticRefresh: z.boolean().describe(
      "If set true, automatic refresh is disabled for the DataStore.",
    ).optional(),
    disableInitialIndex: z.boolean().describe(
      "If set true, initial indexing is disabled for the DataStore.",
    ).optional(),
  }).describe("Configuration data for advance site search.").optional(),
  billingEstimation: z.object({
    structuredDataSize: z.string().describe(
      "Data size for structured data in terms of bytes.",
    ).optional(),
    structuredDataUpdateTime: z.string().describe(
      "Last updated timestamp for structured data.",
    ).optional(),
    unstructuredDataSize: z.string().describe(
      "Data size for unstructured data in terms of bytes.",
    ).optional(),
    unstructuredDataUpdateTime: z.string().describe(
      "Last updated timestamp for unstructured data.",
    ).optional(),
    websiteDataSize: z.string().describe(
      "Data size for websites in terms of bytes.",
    ).optional(),
    websiteDataUpdateTime: z.string().describe(
      "Last updated timestamp for websites.",
    ).optional(),
  }).describe("Estimation of data size per data store.").optional(),
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  configurableBillingApproach: z.enum([
    "CONFIGURABLE_BILLING_APPROACH_UNSPECIFIED",
    "CONFIGURABLE_SUBSCRIPTION_INDEXING_CORE",
    "CONFIGURABLE_CONSUMPTION_EMBEDDING",
  ]).describe("Optional. Configuration for configurable billing approach. See")
    .optional(),
  contentConfig: z.enum([
    "CONTENT_CONFIG_UNSPECIFIED",
    "NO_CONTENT",
    "CONTENT_REQUIRED",
    "PUBLIC_WEBSITE",
    "GOOGLE_WORKSPACE",
  ]).describe(
    "Immutable. The content config of the data store. If this field is unset, the server behavior defaults to ContentConfig.NO_CONTENT.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The data store display name. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  documentProcessingConfig: z.object({
    chunkingConfig: z.object({
      layoutBasedChunkingConfig: z.object({
        chunkSize: z.number().int().describe(
          "The token size limit for each chunk. Supported values: 100-500 (inclusive). Default value: 500.",
        ).optional(),
        includeAncestorHeadings: z.boolean().describe(
          "Whether to include appending different levels of headings to chunks from the middle of the document to prevent context loss. Default value: False.",
        ).optional(),
      }).describe("Configuration for the layout based chunking.").optional(),
    }).describe("Configuration for chunking config.").optional(),
    defaultParsingConfig: z.object({
      digitalParsingConfig: z.object({}).describe(
        "The digital parsing configurations for documents.",
      ).optional(),
      layoutParsingConfig: z.object({
        enableGetProcessedDocument: z.boolean().describe(
          "Optional. If true, the processed document will be made available for the GetProcessedDocument API.",
        ).optional(),
        enableImageAnnotation: z.boolean().describe(
          "Optional. If true, the LLM based annotation is added to the image during parsing.",
        ).optional(),
        enableLlmLayoutParsing: z.boolean().describe(
          "Optional. If true, the pdf layout will be refined using an LLM.",
        ).optional(),
        enableTableAnnotation: z.boolean().describe(
          "Optional. If true, the LLM based annotation is added to the table during parsing.",
        ).optional(),
        excludeHtmlClasses: z.array(z.string()).describe(
          "Optional. List of HTML classes to exclude from the parsed content.",
        ).optional(),
        excludeHtmlElements: z.array(z.string()).describe(
          "Optional. List of HTML elements to exclude from the parsed content.",
        ).optional(),
        excludeHtmlIds: z.array(z.string()).describe(
          "Optional. List of HTML ids to exclude from the parsed content.",
        ).optional(),
        structuredContentTypes: z.array(z.string()).describe(
          "Optional. Contains the required structure types to extract from the document. Supported values: * `shareholder-structure`",
        ).optional(),
      }).describe("The layout parsing configurations for documents.")
        .optional(),
      ocrParsingConfig: z.object({
        enhancedDocumentElements: z.array(z.string()).describe(
          "[DEPRECATED] This field is deprecated. To use the additional enhanced document elements processing, please switch to `layout_parsing_config`.",
        ).optional(),
        useNativeText: z.boolean().describe(
          "If true, will use native text instead of OCR text on pages containing native text.",
        ).optional(),
      }).describe("The OCR parsing configurations for documents.").optional(),
    }).describe(
      "Related configurations applied to a specific type of document parser.",
    ).optional(),
    name: z.string().describe(
      "The full resource name of the Document Processing Config. Format: `projects/*/locations/*/collections/*/dataStores/*/documentProcessingConfig`.",
    ).optional(),
    parsingConfigOverrides: z.record(
      z.string(),
      z.object({
        digitalParsingConfig: z.object({}).describe(
          "The digital parsing configurations for documents.",
        ).optional(),
        layoutParsingConfig: z.object({
          enableGetProcessedDocument: z.boolean().describe(
            "Optional. If true, the processed document will be made available for the GetProcessedDocument API.",
          ).optional(),
          enableImageAnnotation: z.boolean().describe(
            "Optional. If true, the LLM based annotation is added to the image during parsing.",
          ).optional(),
          enableLlmLayoutParsing: z.boolean().describe(
            "Optional. If true, the pdf layout will be refined using an LLM.",
          ).optional(),
          enableTableAnnotation: z.boolean().describe(
            "Optional. If true, the LLM based annotation is added to the table during parsing.",
          ).optional(),
          excludeHtmlClasses: z.array(z.unknown()).describe(
            "Optional. List of HTML classes to exclude from the parsed content.",
          ).optional(),
          excludeHtmlElements: z.array(z.unknown()).describe(
            "Optional. List of HTML elements to exclude from the parsed content.",
          ).optional(),
          excludeHtmlIds: z.array(z.unknown()).describe(
            "Optional. List of HTML ids to exclude from the parsed content.",
          ).optional(),
          structuredContentTypes: z.array(z.unknown()).describe(
            "Optional. Contains the required structure types to extract from the document. Supported values: * `shareholder-structure`",
          ).optional(),
        }).describe("The layout parsing configurations for documents.")
          .optional(),
        ocrParsingConfig: z.object({
          enhancedDocumentElements: z.array(z.unknown()).describe(
            "[DEPRECATED] This field is deprecated. To use the additional enhanced document elements processing, please switch to `layout_parsing_config`.",
          ).optional(),
          useNativeText: z.boolean().describe(
            "If true, will use native text instead of OCR text on pages containing native text.",
          ).optional(),
        }).describe("The OCR parsing configurations for documents.").optional(),
      }),
    ).describe(
      "Map from file type to override the default parsing configuration based on the file type. Supported keys: * `pdf`: Override parsing config for PDF files, either digital parsing, ocr parsing or layout parsing is supported. * `html`: Override parsing config for HTML files, only digital parsing and layout parsing are supported. * `docx`: Override parsing config for DOCX files, only digital parsing and layout parsing are supported. * `pptx`: Override parsing config for PPTX files, only digital parsing and layout parsing are supported. * `xlsm`: Override parsing config for XLSM files, only digital parsing and layout parsing are supported. * `xlsx`: Override parsing config for XLSX files, only digital parsing and layout parsing are supported.",
    ).optional(),
  }).describe(
    "A singleton resource of DataStore. If it's empty when DataStore is created and DataStore is set to DataStore.ContentConfig.CONTENT_REQUIRED, the default parser will default to digital parser.",
  ).optional(),
  federatedSearchConfig: z.object({
    alloyDbConfig: z.object({
      alloydbAiNlConfig: z.object({
        nlConfigId: z.string().describe(
          "Optional. AlloyDb AI NL config id, i.e. the value that was used for calling `SELECT alloydb_ai_nl.g_create_configuration(...)`. Can be empty.",
        ).optional(),
      }).describe("Configuration for AlloyDB AI Natural Language.").optional(),
      alloydbConnectionConfig: z.object({
        authMode: z.enum([
          "AUTH_MODE_UNSPECIFIED",
          "AUTH_MODE_SERVICE_ACCOUNT",
          "AUTH_MODE_END_USER_ACCOUNT",
        ]).describe("Optional. Auth mode.").optional(),
        database: z.string().describe(
          "Required. The AlloyDB database to connect to.",
        ).optional(),
        enablePsvs: z.boolean().describe(
          "Optional. If true, enable PSVS for AlloyDB.",
        ).optional(),
        instance: z.string().describe(
          "Required. The AlloyDB instance to connect to.",
        ).optional(),
        password: z.string().describe(
          "Required. Database password. If auth_mode = END_USER_ACCOUNT, it can be unset. In that case, the password will be inferred on the AlloyDB side, based on the authenticated user.",
        ).optional(),
        user: z.string().describe(
          "Required. Database user. If auth_mode = END_USER_ACCOUNT, it can be unset. In that case, the user will be inferred on the AlloyDB side, based on the authenticated user.",
        ).optional(),
      }).describe("Configuration for connecting to AlloyDB.").optional(),
      returnedFields: z.array(z.string()).describe(
        "Optional. Fields to be returned in the search results. If empty, all fields will be returned.",
      ).optional(),
    }).describe("Stores information for connecting to AlloyDB.").optional(),
    notebooklmConfig: z.object({
      searchConfig: z.string().describe(
        "Required. Search config name. Format: projects/*/locations/global/notebookLmSearchConfigs/*",
      ).optional(),
    }).describe("Config for connecting to NotebookLM Enterprise.").optional(),
    thirdPartyOauthConfig: z.object({
      appName: z.string().describe(
        'Optional. The type of the application. E.g., "jira", "box", etc.',
      ).optional(),
      instanceName: z.string().describe(
        'Optional. The instance name identifying the 3P app, e.g., "vaissptbots-my". This is different from the instance_uri which is the full URL of the 3P app e.g., "https://vaissptbots-my.sharepoint.com".',
      ).optional(),
    }).describe("Stores information for third party applicationOAuth.")
      .optional(),
  }).describe("Stores information for federated search.").optional(),
  healthcareFhirConfig: z.object({
    enableConfigurableSchema: z.boolean().describe(
      "Whether to enable configurable schema for `HEALTHCARE_FHIR` vertical. If set to `true`, the predefined healthcare fhir schema can be extended for more customized searching and filtering.",
    ).optional(),
    enableStaticIndexingForBatchIngestion: z.boolean().describe(
      "Whether to enable static indexing for `HEALTHCARE_FHIR` batch ingestion. If set to `true`, the batch ingestion will be processed in a static indexing mode which is slower but more capable of handling larger volume.",
    ).optional(),
    initialFilterGroups: z.array(z.string()).describe(
      "Optional. Names of the Group resources to use as a basis for the initial patient filter, in format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Group/{group_id}`. The filter group must be a FHIR resource name of type Group, and the filter will be constructed from the direct members of the group which are Patient resources.",
    ).optional(),
  }).describe("Config to data store for `HEALTHCARE_FHIR` vertical.")
    .optional(),
  identityMappingStore: z.string().describe(
    "Immutable. The fully qualified resource name of the associated IdentityMappingStore. This field can only be set for acl_enabled DataStores with `THIRD_PARTY` or `GSUITE` IdP. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`.",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe("Immutable. The industry vertical that the data store registers.")
    .optional(),
  isInfobotFaqDataStore: z.boolean().describe(
    "Optional. If set, this DataStore is an Infobot FAQ DataStore.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this DataStore at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the DataStore will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The full resource name of the data store. Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  naturalLanguageQueryUnderstandingConfig: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
      "Mode of Natural Language Query Understanding. If this field is unset, the behavior defaults to NaturalLanguageQueryUnderstandingConfig.Mode.DISABLED.",
    ).optional(),
  }).describe("Configuration for Natural Language Query Understanding.")
    .optional(),
  servingConfigDataStore: z.object({
    disabledForServing: z.boolean().describe(
      "Optional. If set true, the DataStore will not be available for serving search requests.",
    ).optional(),
  }).describe(
    "Stores information regarding the serving configurations at DataStore level.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
      "SOLUTION_TYPE_CHAT",
      "SOLUTION_TYPE_GENERATIVE_CHAT",
      "SOLUTION_TYPE_AI_MODE",
    ]),
  ).describe(
    "The solutions that the data store enrolls. Available solutions for each industry_vertical: * `MEDIA`: `SOLUTION_TYPE_RECOMMENDATION` and `SOLUTION_TYPE_SEARCH`. * `SITE_SEARCH`: `SOLUTION_TYPE_SEARCH` is automatically enrolled. Other solutions cannot be enrolled.",
  ).optional(),
  startingSchema: z.object({
    jsonSchema: z.string().describe("The JSON representation of the schema.")
      .optional(),
    name: z.string().describe(
      "Immutable. The full resource name of the schema, in the format of `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/schemas/{schema}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
    ).optional(),
    structSchema: z.record(z.string(), z.string()).describe(
      "The structured representation of the schema.",
    ).optional(),
  }).describe("Defines the structure and layout of a type of document data.")
    .optional(),
  workspaceConfig: z.object({
    dasherCustomerId: z.string().describe("Obfuscated Dasher customer ID.")
      .optional(),
    superAdminEmailAddress: z.string().describe(
      "Optional. The super admin email address for the workspace that will be used for access token generation. For now we only use it for Native Google Drive connector data ingestion.",
    ).optional(),
    superAdminServiceAccount: z.string().describe(
      "Optional. The super admin service account for the workspace that will be used for access token generation. For now we only use it for Native Google Drive connector data ingestion.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DRIVE",
      "GOOGLE_MAIL",
      "GOOGLE_SITES",
      "GOOGLE_CALENDAR",
      "GOOGLE_CHAT",
      "GOOGLE_GROUPS",
      "GOOGLE_KEEP",
      "GOOGLE_PEOPLE",
    ]).describe("The Google Workspace data source.").optional(),
  }).describe(
    "Config to store data store type configuration for workspace data",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this DataStore.",
  ).optional(),
  createAdvancedSiteSearch: z.string().describe(
    "A boolean flag indicating whether user want to directly create an advanced data store for site search. If the data store is not configured as site search (GENERIC vertical and PUBLIC_WEBSITE content_config), this flag will be ignored.",
  ).optional(),
  dataStoreId: z.string().describe(
    "Required. The ID to use for the DataStore, which will become the final component of the DataStore's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  disableCmek: z.string().describe(
    "DataStore without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  skipDefaultSchemaCreation: z.string().describe(
    "A boolean flag indicating whether to skip the default schema creation for the data store. Only enable this flag if you are certain that the default schema is incompatible with your use case. If set to true, you must manually create a schema for the data store before any documents can be ingested. This flag cannot be specified if `data_store.starting_schema` is specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aclEnabled: z.boolean().optional(),
  advancedSiteSearchConfig: z.object({
    disableAutomaticRefresh: z.boolean(),
    disableInitialIndex: z.boolean(),
  }).optional(),
  billingEstimation: z.object({
    structuredDataSize: z.string(),
    structuredDataUpdateTime: z.string(),
    unstructuredDataSize: z.string(),
    unstructuredDataUpdateTime: z.string(),
    websiteDataSize: z.string(),
    websiteDataUpdateTime: z.string(),
  }).optional(),
  cmekConfig: z.object({
    isDefault: z.boolean(),
    kmsKey: z.string(),
    kmsKeyVersion: z.string(),
    lastRotationTimestampMicros: z.string(),
    name: z.string(),
    notebooklmState: z.string(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string(),
    })),
    state: z.string(),
  }).optional(),
  configurableBillingApproach: z.string().optional(),
  configurableBillingApproachUpdateTime: z.string().optional(),
  contentConfig: z.string().optional(),
  createTime: z.string().optional(),
  defaultSchemaId: z.string().optional(),
  displayName: z.string().optional(),
  documentProcessingConfig: z.object({
    chunkingConfig: z.object({
      layoutBasedChunkingConfig: z.object({
        chunkSize: z.number(),
        includeAncestorHeadings: z.boolean(),
      }),
    }),
    defaultParsingConfig: z.object({
      digitalParsingConfig: z.object({}),
      layoutParsingConfig: z.object({
        enableGetProcessedDocument: z.boolean(),
        enableImageAnnotation: z.boolean(),
        enableLlmLayoutParsing: z.boolean(),
        enableTableAnnotation: z.boolean(),
        excludeHtmlClasses: z.array(z.string()),
        excludeHtmlElements: z.array(z.string()),
        excludeHtmlIds: z.array(z.string()),
        structuredContentTypes: z.array(z.string()),
      }),
      ocrParsingConfig: z.object({
        enhancedDocumentElements: z.array(z.string()),
        useNativeText: z.boolean(),
      }),
    }),
    name: z.string(),
    parsingConfigOverrides: z.record(z.string(), z.unknown()),
  }).optional(),
  federatedSearchConfig: z.object({
    alloyDbConfig: z.object({
      alloydbAiNlConfig: z.object({
        nlConfigId: z.string(),
      }),
      alloydbConnectionConfig: z.object({
        authMode: z.string(),
        database: z.string(),
        enablePsvs: z.boolean(),
        instance: z.string(),
        password: z.string(),
        user: z.string(),
      }),
      returnedFields: z.array(z.string()),
    }),
    notebooklmConfig: z.object({
      searchConfig: z.string(),
    }),
    thirdPartyOauthConfig: z.object({
      appName: z.string(),
      instanceName: z.string(),
    }),
  }).optional(),
  healthcareFhirConfig: z.object({
    enableConfigurableSchema: z.boolean(),
    enableStaticIndexingForBatchIngestion: z.boolean(),
    initialFilterGroups: z.array(z.string()),
  }).optional(),
  identityMappingStore: z.string().optional(),
  industryVertical: z.string().optional(),
  isInfobotFaqDataStore: z.boolean().optional(),
  kmsKeyName: z.string().optional(),
  name: z.string(),
  naturalLanguageQueryUnderstandingConfig: z.object({
    mode: z.string(),
  }).optional(),
  servingConfigDataStore: z.object({
    disabledForServing: z.boolean(),
  }).optional(),
  solutionTypes: z.array(z.string()).optional(),
  startingSchema: z.object({
    jsonSchema: z.string(),
    name: z.string(),
    structSchema: z.record(z.string(), z.unknown()),
  }).optional(),
  workspaceConfig: z.object({
    dasherCustomerId: z.string(),
    superAdminEmailAddress: z.string(),
    superAdminServiceAccount: z.string(),
    type: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aclEnabled: z.boolean().describe(
    "Immutable. Whether data in the DataStore has ACL information. If set to `true`, the source data must have ACL. ACL will be ingested when data is ingested by DocumentService.ImportDocuments methods. When ACL is enabled for the DataStore, Document can't be accessed by calling DocumentService.GetDocument or DocumentService.ListDocuments. Currently ACL is only supported in `GENERIC` industry vertical with non-`PUBLIC_WEBSITE` content config.",
  ).optional(),
  advancedSiteSearchConfig: z.object({
    disableAutomaticRefresh: z.boolean().describe(
      "If set true, automatic refresh is disabled for the DataStore.",
    ).optional(),
    disableInitialIndex: z.boolean().describe(
      "If set true, initial indexing is disabled for the DataStore.",
    ).optional(),
  }).describe("Configuration data for advance site search.").optional(),
  billingEstimation: z.object({
    structuredDataSize: z.string().describe(
      "Data size for structured data in terms of bytes.",
    ).optional(),
    structuredDataUpdateTime: z.string().describe(
      "Last updated timestamp for structured data.",
    ).optional(),
    unstructuredDataSize: z.string().describe(
      "Data size for unstructured data in terms of bytes.",
    ).optional(),
    unstructuredDataUpdateTime: z.string().describe(
      "Last updated timestamp for unstructured data.",
    ).optional(),
    websiteDataSize: z.string().describe(
      "Data size for websites in terms of bytes.",
    ).optional(),
    websiteDataUpdateTime: z.string().describe(
      "Last updated timestamp for websites.",
    ).optional(),
  }).describe("Estimation of data size per data store.").optional(),
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  configurableBillingApproach: z.enum([
    "CONFIGURABLE_BILLING_APPROACH_UNSPECIFIED",
    "CONFIGURABLE_SUBSCRIPTION_INDEXING_CORE",
    "CONFIGURABLE_CONSUMPTION_EMBEDDING",
  ]).describe("Optional. Configuration for configurable billing approach. See")
    .optional(),
  contentConfig: z.enum([
    "CONTENT_CONFIG_UNSPECIFIED",
    "NO_CONTENT",
    "CONTENT_REQUIRED",
    "PUBLIC_WEBSITE",
    "GOOGLE_WORKSPACE",
  ]).describe(
    "Immutable. The content config of the data store. If this field is unset, the server behavior defaults to ContentConfig.NO_CONTENT.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The data store display name. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  documentProcessingConfig: z.object({
    chunkingConfig: z.object({
      layoutBasedChunkingConfig: z.object({
        chunkSize: z.number().int().describe(
          "The token size limit for each chunk. Supported values: 100-500 (inclusive). Default value: 500.",
        ).optional(),
        includeAncestorHeadings: z.boolean().describe(
          "Whether to include appending different levels of headings to chunks from the middle of the document to prevent context loss. Default value: False.",
        ).optional(),
      }).describe("Configuration for the layout based chunking.").optional(),
    }).describe("Configuration for chunking config.").optional(),
    defaultParsingConfig: z.object({
      digitalParsingConfig: z.object({}).describe(
        "The digital parsing configurations for documents.",
      ).optional(),
      layoutParsingConfig: z.object({
        enableGetProcessedDocument: z.boolean().describe(
          "Optional. If true, the processed document will be made available for the GetProcessedDocument API.",
        ).optional(),
        enableImageAnnotation: z.boolean().describe(
          "Optional. If true, the LLM based annotation is added to the image during parsing.",
        ).optional(),
        enableLlmLayoutParsing: z.boolean().describe(
          "Optional. If true, the pdf layout will be refined using an LLM.",
        ).optional(),
        enableTableAnnotation: z.boolean().describe(
          "Optional. If true, the LLM based annotation is added to the table during parsing.",
        ).optional(),
        excludeHtmlClasses: z.array(z.string()).describe(
          "Optional. List of HTML classes to exclude from the parsed content.",
        ).optional(),
        excludeHtmlElements: z.array(z.string()).describe(
          "Optional. List of HTML elements to exclude from the parsed content.",
        ).optional(),
        excludeHtmlIds: z.array(z.string()).describe(
          "Optional. List of HTML ids to exclude from the parsed content.",
        ).optional(),
        structuredContentTypes: z.array(z.string()).describe(
          "Optional. Contains the required structure types to extract from the document. Supported values: * `shareholder-structure`",
        ).optional(),
      }).describe("The layout parsing configurations for documents.")
        .optional(),
      ocrParsingConfig: z.object({
        enhancedDocumentElements: z.array(z.string()).describe(
          "[DEPRECATED] This field is deprecated. To use the additional enhanced document elements processing, please switch to `layout_parsing_config`.",
        ).optional(),
        useNativeText: z.boolean().describe(
          "If true, will use native text instead of OCR text on pages containing native text.",
        ).optional(),
      }).describe("The OCR parsing configurations for documents.").optional(),
    }).describe(
      "Related configurations applied to a specific type of document parser.",
    ).optional(),
    name: z.string().describe(
      "The full resource name of the Document Processing Config. Format: `projects/*/locations/*/collections/*/dataStores/*/documentProcessingConfig`.",
    ).optional(),
    parsingConfigOverrides: z.record(
      z.string(),
      z.object({
        digitalParsingConfig: z.object({}).describe(
          "The digital parsing configurations for documents.",
        ).optional(),
        layoutParsingConfig: z.object({
          enableGetProcessedDocument: z.boolean().describe(
            "Optional. If true, the processed document will be made available for the GetProcessedDocument API.",
          ).optional(),
          enableImageAnnotation: z.boolean().describe(
            "Optional. If true, the LLM based annotation is added to the image during parsing.",
          ).optional(),
          enableLlmLayoutParsing: z.boolean().describe(
            "Optional. If true, the pdf layout will be refined using an LLM.",
          ).optional(),
          enableTableAnnotation: z.boolean().describe(
            "Optional. If true, the LLM based annotation is added to the table during parsing.",
          ).optional(),
          excludeHtmlClasses: z.array(z.unknown()).describe(
            "Optional. List of HTML classes to exclude from the parsed content.",
          ).optional(),
          excludeHtmlElements: z.array(z.unknown()).describe(
            "Optional. List of HTML elements to exclude from the parsed content.",
          ).optional(),
          excludeHtmlIds: z.array(z.unknown()).describe(
            "Optional. List of HTML ids to exclude from the parsed content.",
          ).optional(),
          structuredContentTypes: z.array(z.unknown()).describe(
            "Optional. Contains the required structure types to extract from the document. Supported values: * `shareholder-structure`",
          ).optional(),
        }).describe("The layout parsing configurations for documents.")
          .optional(),
        ocrParsingConfig: z.object({
          enhancedDocumentElements: z.array(z.unknown()).describe(
            "[DEPRECATED] This field is deprecated. To use the additional enhanced document elements processing, please switch to `layout_parsing_config`.",
          ).optional(),
          useNativeText: z.boolean().describe(
            "If true, will use native text instead of OCR text on pages containing native text.",
          ).optional(),
        }).describe("The OCR parsing configurations for documents.").optional(),
      }),
    ).describe(
      "Map from file type to override the default parsing configuration based on the file type. Supported keys: * `pdf`: Override parsing config for PDF files, either digital parsing, ocr parsing or layout parsing is supported. * `html`: Override parsing config for HTML files, only digital parsing and layout parsing are supported. * `docx`: Override parsing config for DOCX files, only digital parsing and layout parsing are supported. * `pptx`: Override parsing config for PPTX files, only digital parsing and layout parsing are supported. * `xlsm`: Override parsing config for XLSM files, only digital parsing and layout parsing are supported. * `xlsx`: Override parsing config for XLSX files, only digital parsing and layout parsing are supported.",
    ).optional(),
  }).describe(
    "A singleton resource of DataStore. If it's empty when DataStore is created and DataStore is set to DataStore.ContentConfig.CONTENT_REQUIRED, the default parser will default to digital parser.",
  ).optional(),
  federatedSearchConfig: z.object({
    alloyDbConfig: z.object({
      alloydbAiNlConfig: z.object({
        nlConfigId: z.string().describe(
          "Optional. AlloyDb AI NL config id, i.e. the value that was used for calling `SELECT alloydb_ai_nl.g_create_configuration(...)`. Can be empty.",
        ).optional(),
      }).describe("Configuration for AlloyDB AI Natural Language.").optional(),
      alloydbConnectionConfig: z.object({
        authMode: z.enum([
          "AUTH_MODE_UNSPECIFIED",
          "AUTH_MODE_SERVICE_ACCOUNT",
          "AUTH_MODE_END_USER_ACCOUNT",
        ]).describe("Optional. Auth mode.").optional(),
        database: z.string().describe(
          "Required. The AlloyDB database to connect to.",
        ).optional(),
        enablePsvs: z.boolean().describe(
          "Optional. If true, enable PSVS for AlloyDB.",
        ).optional(),
        instance: z.string().describe(
          "Required. The AlloyDB instance to connect to.",
        ).optional(),
        password: z.string().describe(
          "Required. Database password. If auth_mode = END_USER_ACCOUNT, it can be unset. In that case, the password will be inferred on the AlloyDB side, based on the authenticated user.",
        ).optional(),
        user: z.string().describe(
          "Required. Database user. If auth_mode = END_USER_ACCOUNT, it can be unset. In that case, the user will be inferred on the AlloyDB side, based on the authenticated user.",
        ).optional(),
      }).describe("Configuration for connecting to AlloyDB.").optional(),
      returnedFields: z.array(z.string()).describe(
        "Optional. Fields to be returned in the search results. If empty, all fields will be returned.",
      ).optional(),
    }).describe("Stores information for connecting to AlloyDB.").optional(),
    notebooklmConfig: z.object({
      searchConfig: z.string().describe(
        "Required. Search config name. Format: projects/*/locations/global/notebookLmSearchConfigs/*",
      ).optional(),
    }).describe("Config for connecting to NotebookLM Enterprise.").optional(),
    thirdPartyOauthConfig: z.object({
      appName: z.string().describe(
        'Optional. The type of the application. E.g., "jira", "box", etc.',
      ).optional(),
      instanceName: z.string().describe(
        'Optional. The instance name identifying the 3P app, e.g., "vaissptbots-my". This is different from the instance_uri which is the full URL of the 3P app e.g., "https://vaissptbots-my.sharepoint.com".',
      ).optional(),
    }).describe("Stores information for third party applicationOAuth.")
      .optional(),
  }).describe("Stores information for federated search.").optional(),
  healthcareFhirConfig: z.object({
    enableConfigurableSchema: z.boolean().describe(
      "Whether to enable configurable schema for `HEALTHCARE_FHIR` vertical. If set to `true`, the predefined healthcare fhir schema can be extended for more customized searching and filtering.",
    ).optional(),
    enableStaticIndexingForBatchIngestion: z.boolean().describe(
      "Whether to enable static indexing for `HEALTHCARE_FHIR` batch ingestion. If set to `true`, the batch ingestion will be processed in a static indexing mode which is slower but more capable of handling larger volume.",
    ).optional(),
    initialFilterGroups: z.array(z.string()).describe(
      "Optional. Names of the Group resources to use as a basis for the initial patient filter, in format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Group/{group_id}`. The filter group must be a FHIR resource name of type Group, and the filter will be constructed from the direct members of the group which are Patient resources.",
    ).optional(),
  }).describe("Config to data store for `HEALTHCARE_FHIR` vertical.")
    .optional(),
  identityMappingStore: z.string().describe(
    "Immutable. The fully qualified resource name of the associated IdentityMappingStore. This field can only be set for acl_enabled DataStores with `THIRD_PARTY` or `GSUITE` IdP. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`.",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe("Immutable. The industry vertical that the data store registers.")
    .optional(),
  isInfobotFaqDataStore: z.boolean().describe(
    "Optional. If set, this DataStore is an Infobot FAQ DataStore.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this DataStore at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the DataStore will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The full resource name of the data store. Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  naturalLanguageQueryUnderstandingConfig: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
      "Mode of Natural Language Query Understanding. If this field is unset, the behavior defaults to NaturalLanguageQueryUnderstandingConfig.Mode.DISABLED.",
    ).optional(),
  }).describe("Configuration for Natural Language Query Understanding.")
    .optional(),
  servingConfigDataStore: z.object({
    disabledForServing: z.boolean().describe(
      "Optional. If set true, the DataStore will not be available for serving search requests.",
    ).optional(),
  }).describe(
    "Stores information regarding the serving configurations at DataStore level.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
      "SOLUTION_TYPE_CHAT",
      "SOLUTION_TYPE_GENERATIVE_CHAT",
      "SOLUTION_TYPE_AI_MODE",
    ]),
  ).describe(
    "The solutions that the data store enrolls. Available solutions for each industry_vertical: * `MEDIA`: `SOLUTION_TYPE_RECOMMENDATION` and `SOLUTION_TYPE_SEARCH`. * `SITE_SEARCH`: `SOLUTION_TYPE_SEARCH` is automatically enrolled. Other solutions cannot be enrolled.",
  ).optional(),
  startingSchema: z.object({
    jsonSchema: z.string().describe("The JSON representation of the schema.")
      .optional(),
    name: z.string().describe(
      "Immutable. The full resource name of the schema, in the format of `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/schemas/{schema}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
    ).optional(),
    structSchema: z.record(z.string(), z.string()).describe(
      "The structured representation of the schema.",
    ).optional(),
  }).describe("Defines the structure and layout of a type of document data.")
    .optional(),
  workspaceConfig: z.object({
    dasherCustomerId: z.string().describe("Obfuscated Dasher customer ID.")
      .optional(),
    superAdminEmailAddress: z.string().describe(
      "Optional. The super admin email address for the workspace that will be used for access token generation. For now we only use it for Native Google Drive connector data ingestion.",
    ).optional(),
    superAdminServiceAccount: z.string().describe(
      "Optional. The super admin service account for the workspace that will be used for access token generation. For now we only use it for Native Google Drive connector data ingestion.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DRIVE",
      "GOOGLE_MAIL",
      "GOOGLE_SITES",
      "GOOGLE_CALENDAR",
      "GOOGLE_CHAT",
      "GOOGLE_GROUPS",
      "GOOGLE_KEEP",
      "GOOGLE_PEOPLE",
    ]).describe("The Google Workspace data source.").optional(),
  }).describe(
    "Config to store data store type configuration for workspace data",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this DataStore.",
  ).optional(),
  createAdvancedSiteSearch: z.string().describe(
    "A boolean flag indicating whether user want to directly create an advanced data store for site search. If the data store is not configured as site search (GENERIC vertical and PUBLIC_WEBSITE content_config), this flag will be ignored.",
  ).optional(),
  dataStoreId: z.string().describe(
    "Required. The ID to use for the DataStore, which will become the final component of the DataStore's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  disableCmek: z.string().describe(
    "DataStore without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  skipDefaultSchemaCreation: z.string().describe(
    "A boolean flag indicating whether to skip the default schema creation for the data store. Only enable this flag if you are certain that the default schema is incompatible with your use case. If set to true, you must manually create a schema for the data store before any documents can be ingested. This flag cannot be specified if `data_store.starting_schema` is specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine DataStores. Registered at `@swamp/gcp/discoveryengine/datastores`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/datastores",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "DataStore captures global settings and configs at the DataStore level.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aclEnabled"] !== undefined) body["aclEnabled"] = g["aclEnabled"];
        if (g["advancedSiteSearchConfig"] !== undefined) {
          body["advancedSiteSearchConfig"] = g["advancedSiteSearchConfig"];
        }
        if (g["billingEstimation"] !== undefined) {
          body["billingEstimation"] = g["billingEstimation"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["configurableBillingApproach"] !== undefined) {
          body["configurableBillingApproach"] =
            g["configurableBillingApproach"];
        }
        if (g["contentConfig"] !== undefined) {
          body["contentConfig"] = g["contentConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentProcessingConfig"] !== undefined) {
          body["documentProcessingConfig"] = g["documentProcessingConfig"];
        }
        if (g["federatedSearchConfig"] !== undefined) {
          body["federatedSearchConfig"] = g["federatedSearchConfig"];
        }
        if (g["healthcareFhirConfig"] !== undefined) {
          body["healthcareFhirConfig"] = g["healthcareFhirConfig"];
        }
        if (g["identityMappingStore"] !== undefined) {
          body["identityMappingStore"] = g["identityMappingStore"];
        }
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["isInfobotFaqDataStore"] !== undefined) {
          body["isInfobotFaqDataStore"] = g["isInfobotFaqDataStore"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["naturalLanguageQueryUnderstandingConfig"] !== undefined) {
          body["naturalLanguageQueryUnderstandingConfig"] =
            g["naturalLanguageQueryUnderstandingConfig"];
        }
        if (g["servingConfigDataStore"] !== undefined) {
          body["servingConfigDataStore"] = g["servingConfigDataStore"];
        }
        if (g["solutionTypes"] !== undefined) {
          body["solutionTypes"] = g["solutionTypes"];
        }
        if (g["startingSchema"] !== undefined) {
          body["startingSchema"] = g["startingSchema"];
        }
        if (g["workspaceConfig"] !== undefined) {
          body["workspaceConfig"] = g["workspaceConfig"];
        }
        if (g["cmekConfigName"] !== undefined) {
          body["cmekConfigName"] = g["cmekConfigName"];
        }
        if (g["createAdvancedSiteSearch"] !== undefined) {
          body["createAdvancedSiteSearch"] = g["createAdvancedSiteSearch"];
        }
        if (g["dataStoreId"] !== undefined) {
          body["dataStoreId"] = g["dataStoreId"];
        }
        if (g["disableCmek"] !== undefined) {
          body["disableCmek"] = g["disableCmek"];
        }
        if (g["skipDefaultSchemaCreation"] !== undefined) {
          body["skipDefaultSchemaCreation"] = g["skipDefaultSchemaCreation"];
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
      description: "Get a dataStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataStores"),
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
      description: "Update dataStores attributes",
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
        if (g["advancedSiteSearchConfig"] !== undefined) {
          body["advancedSiteSearchConfig"] = g["advancedSiteSearchConfig"];
        }
        if (g["billingEstimation"] !== undefined) {
          body["billingEstimation"] = g["billingEstimation"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["configurableBillingApproach"] !== undefined) {
          body["configurableBillingApproach"] =
            g["configurableBillingApproach"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentProcessingConfig"] !== undefined) {
          body["documentProcessingConfig"] = g["documentProcessingConfig"];
        }
        if (g["federatedSearchConfig"] !== undefined) {
          body["federatedSearchConfig"] = g["federatedSearchConfig"];
        }
        if (g["healthcareFhirConfig"] !== undefined) {
          body["healthcareFhirConfig"] = g["healthcareFhirConfig"];
        }
        if (g["isInfobotFaqDataStore"] !== undefined) {
          body["isInfobotFaqDataStore"] = g["isInfobotFaqDataStore"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["naturalLanguageQueryUnderstandingConfig"] !== undefined) {
          body["naturalLanguageQueryUnderstandingConfig"] =
            g["naturalLanguageQueryUnderstandingConfig"];
        }
        if (g["servingConfigDataStore"] !== undefined) {
          body["servingConfigDataStore"] = g["servingConfigDataStore"];
        }
        if (g["solutionTypes"] !== undefined) {
          body["solutionTypes"] = g["solutionTypes"];
        }
        if (g["startingSchema"] !== undefined) {
          body["startingSchema"] = g["startingSchema"];
        }
        if (g["workspaceConfig"] !== undefined) {
          body["workspaceConfig"] = g["workspaceConfig"];
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
      description: "Delete the dataStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataStores"),
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
      description: "Sync dataStores state from GCP",
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
    complete_query: {
      description: "complete query",
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
        params["dataStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "discoveryengine.projects.locations.dataStores.completeQuery",
            "path": "v1/{+dataStore}:completeQuery",
            "httpMethod": "GET",
            "parameterOrder": ["dataStore"],
            "parameters": {
              "dataStore": { "location": "path", "required": true },
              "includeTailSuggestions": { "location": "query" },
              "query": { "location": "query" },
              "queryModel": { "location": "query" },
              "userPseudoId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_site_search_engine: {
      description: "get site search engine",
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
              "discoveryengine.projects.locations.dataStores.getSiteSearchEngine",
            "path": "v1/{+name}",
            "httpMethod": "GET",
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
