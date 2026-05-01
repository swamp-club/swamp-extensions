// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores-widgetconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine DataStores.WidgetConfigs.
 *
 * WidgetConfig captures configs at the Widget level.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.widgetConfigs.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "acceptCache": {
      "location": "query",
    },
    "getWidgetConfigRequestOption.turnOffCollectionComponents": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.widgetConfigs.patch",
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

const GlobalArgsSchema = z.object({
  accessSettings: z.object({
    allowPublicAccess: z.boolean().describe(
      "Whether public unauthenticated access is allowed.",
    ).optional(),
    allowlistedDomains: z.array(z.string()).describe(
      "List of domains that are allowed to integrate the search widget.",
    ).optional(),
    enableWebApp: z.boolean().describe("Whether web app access is enabled.")
      .optional(),
    languageCode: z.string().describe(
      'Optional. Language code for user interface. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). If unset, the default language code is "en-US".',
    ).optional(),
    workforceIdentityPoolProvider: z.string().describe(
      "Optional. The workforce identity pool provider used to access the widget.",
    ).optional(),
  }).describe("Describes widget access settings.").optional(),
  assistantSettings: z.object({
    defaultWebGroundingToggleOff: z.boolean().describe(
      "Output only. This field controls the default web grounding toggle for end users if `web_grounding_type` is set to `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`. By default, this field is set to false. If `web_grounding_type` is `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`, end users will have web grounding enabled by default on UI. If true, grounding toggle will be disabled by default on UI. End users can still enable web grounding in the UI if web grounding is enabled.",
    ).optional(),
    disableLocationContext: z.boolean().describe(
      "Optional. Output only. Whether to disable user location context.",
    ).optional(),
    googleSearchGroundingEnabled: z.boolean().describe(
      "Whether or not the Google search grounding toggle is shown. Deprecated. Use web_grounding_type instead.",
    ).optional(),
    webGroundingType: z.enum([
      "WEB_GROUNDING_TYPE_UNSPECIFIED",
      "WEB_GROUNDING_TYPE_DISABLED",
      "WEB_GROUNDING_TYPE_GOOGLE_SEARCH",
      "WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH",
    ]).describe("Optional. The type of web grounding to use.").optional(),
  }).describe("Describes the assistant settings of the widget.").optional(),
  collectionComponents: z.array(z.object({
    connectorIconLink: z.string().describe(
      "Output only. The icon link of the connector source.",
    ).optional(),
    dataSource: z.string().describe(
      "The name of the data source, retrieved from `Collection.data_connector.data_source`.",
    ).optional(),
    dataSourceDisplayName: z.string().describe(
      "Output only. The display name of the data source.",
    ).optional(),
    dataStoreComponents: z.array(z.object({
      dataStoreConfigType: z.enum([
        "DATA_STORE_CONFIG_TYPE_UNSPECIFIED",
        "ALLOW_DB_CONFIG",
        "THIRD_PARTY_OAUTH_CONFIG",
        "NOTEBOOKLM_CONFIG",
      ]).describe("Output only. The type of the data store config.").optional(),
      displayName: z.string().describe("The display name of the data store.")
        .optional(),
      entityName: z.string().describe(
        "The name of the entity, retrieved from `Collection.data_connector.entities.entityName`.",
      ).optional(),
      id: z.string().describe(
        "Output only. the identifier of the data store, used for widget service. For now it refers to data_store_id, in the future we will migrate the field to encrypted data store name UUID.",
      ).optional(),
      name: z.string().describe(
        "The name of the data store. It should be data store resource name Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
      ).optional(),
    })).describe(
      "For the data store collection, list of the children data stores.",
    ).optional(),
    displayName: z.string().describe("The display name of the collection.")
      .optional(),
    id: z.string().describe(
      "Output only. the identifier of the collection, used for widget service. For now it refers to collection_id, in the future we will migrate the field to encrypted collection name UUID.",
    ).optional(),
    name: z.string().describe(
      "The name of the collection. It should be collection resource name. Format: `projects/{project}/locations/{location}/collections/{collection_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
    ).optional(),
  })).describe(
    "Output only. Collection components that lists all collections and child data stores associated with the widget config, those data sources can be used for filtering in widget service APIs, users can return results that from selected data sources.",
  ).optional(),
  configId: z.string().describe(
    "Output only. Unique obfuscated identifier of a WidgetConfig.",
  ).optional(),
  contentSearchSpec: z.object({
    chunkSpec: z.object({
      numNextChunks: z.number().int().describe(
        "The number of next chunks to be returned of the current chunk. The maximum allowed value is 3. If not specified, no next chunks will be returned.",
      ).optional(),
      numPreviousChunks: z.number().int().describe(
        "The number of previous chunks to be returned of the current chunk. The maximum allowed value is 3. If not specified, no previous chunks will be returned.",
      ).optional(),
    }).describe(
      "Specifies the chunk spec to be returned from the search response. Only available if the SearchRequest.ContentSearchSpec.search_result_mode is set to CHUNKS",
    ).optional(),
    extractiveContentSpec: z.object({
      maxExtractiveAnswerCount: z.number().int().describe(
        "The maximum number of extractive answers returned in each search result. An extractive answer is a verbatim answer extracted from the original document, which provides a precise and contextually relevant answer to the search query. If the number of matching answers is less than the `max_extractive_answer_count`, return all of the answers. Otherwise, return the `max_extractive_answer_count`. At most five answers are returned for each SearchResult.",
      ).optional(),
      maxExtractiveSegmentCount: z.number().int().describe(
        "The max number of extractive segments returned in each search result. Only applied if the DataStore is set to DataStore.ContentConfig.CONTENT_REQUIRED or DataStore.solution_types is SOLUTION_TYPE_CHAT. An extractive segment is a text segment extracted from the original document that is relevant to the search query, and, in general, more verbose than an extractive answer. The segment could then be used as input for LLMs to generate summaries and answers. If the number of matching segments is less than `max_extractive_segment_count`, return all of the segments. Otherwise, return the `max_extractive_segment_count`.",
      ).optional(),
      numNextSegments: z.number().int().describe(
        "Return at most `num_next_segments` segments after each selected segments.",
      ).optional(),
      numPreviousSegments: z.number().int().describe(
        "Specifies whether to also include the adjacent from each selected segments. Return at most `num_previous_segments` segments before each selected segments.",
      ).optional(),
      returnExtractiveSegmentScore: z.boolean().describe(
        "Specifies whether to return the confidence score from the extractive segments in each search result. This feature is available only for new or allowlisted data stores. To allowlist your data store, contact your Customer Engineer. The default value is `false`.",
      ).optional(),
    }).describe(
      "A specification for configuring the extractive content in a search response.",
    ).optional(),
    searchResultMode: z.enum([
      "SEARCH_RESULT_MODE_UNSPECIFIED",
      "DOCUMENTS",
      "CHUNKS",
    ]).describe(
      "Specifies the search result mode. If unspecified, the search result mode defaults to `DOCUMENTS`.",
    ).optional(),
    snippetSpec: z.object({
      maxSnippetCount: z.number().int().describe(
        "[DEPRECATED] This field is deprecated. To control snippet return, use `return_snippet` field. For backwards compatibility, we will return snippet if max_snippet_count > 0.",
      ).optional(),
      referenceOnly: z.boolean().describe(
        "[DEPRECATED] This field is deprecated and will have no affect on the snippet.",
      ).optional(),
      returnSnippet: z.boolean().describe(
        'If `true`, then return snippet. If no snippet can be generated, we return "No snippet is available for this page." A `snippet_status` with `SUCCESS` or `NO_SNIPPET_AVAILABLE` will also be returned.',
      ).optional(),
    }).describe(
      "A specification for configuring snippets in a search response.",
    ).optional(),
    summarySpec: z.object({
      ignoreAdversarialQuery: z.boolean().describe(
        "Specifies whether to filter out adversarial queries. The default value is `false`. Google employs search-query classification to detect adversarial queries. No summary is returned if the search query is classified as an adversarial query. For example, a user might ask a question regarding negative comments about the company or submit a query designed to generate unsafe, policy-violating output. If this field is set to `true`, we skip generating summaries for adversarial queries and return fallback messages instead.",
      ).optional(),
      ignoreJailBreakingQuery: z.boolean().describe(
        'Optional. Specifies whether to filter out jail-breaking queries. The default value is `false`. Google employs search-query classification to detect jail-breaking queries. No summary is returned if the search query is classified as a jail-breaking query. A user might add instructions to the query to change the tone, style, language, content of the answer, or ask the model to act as a different entity, e.g. "Reply in the tone of a competing company\'s CEO". If this field is set to `true`, we skip generating summaries for jail-breaking queries and return fallback messages instead.',
      ).optional(),
      ignoreLowRelevantContent: z.boolean().describe(
        "Specifies whether to filter out queries that have low relevance. The default value is `false`. If this field is set to `false`, all search results are used regardless of relevance to generate answers. If set to `true`, only queries with high relevance search results will generate answers.",
      ).optional(),
      ignoreNonSummarySeekingQuery: z.boolean().describe(
        "Specifies whether to filter out queries that are not summary-seeking. The default value is `false`. Google employs search-query classification to detect summary-seeking queries. No summary is returned if the search query is classified as a non-summary seeking query. For example, `why is the sky blue` and `Who is the best soccer player in the world?` are summary-seeking queries, but `SFO airport` and `world cup 2026` are not. They are most likely navigational queries. If this field is set to `true`, we skip generating summaries for non-summary seeking queries and return fallback messages instead.",
      ).optional(),
      includeCitations: z.boolean().describe(
        "Specifies whether to include citations in the summary. The default value is `false`. When this field is set to `true`, summaries include in-line citation numbers. Example summary including citations: BigQuery is Google Cloud's fully managed and completely serverless enterprise data warehouse [1]. BigQuery supports all data types, works across clouds, and has built-in machine learning and business intelligence, all within a unified platform [2, 3]. The citation numbers refer to the returned search results and are 1-indexed. For example, [1] means that the sentence is attributed to the first search result. [2, 3] means that the sentence is attributed to both the second and third search results.",
      ).optional(),
      languageCode: z.string().describe(
        "Language code for Summary. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Note: This is an experimental feature.",
      ).optional(),
      modelPromptSpec: z.object({
        preamble: z.string().describe(
          "Text at the beginning of the prompt that instructs the assistant. Examples are available in the user guide.",
        ).optional(),
      }).describe("Specification of the prompt to use with the model.")
        .optional(),
      modelSpec: z.object({
        version: z.string().describe(
          "The model version used to generate the summary. Supported values are: * `stable`: string. Default value when no value is specified. Uses a generally available, fine-tuned model. For more information, see [Answer generation model versions and lifecycle](https://cloud.google.com/generative-ai-app-builder/docs/answer-generation-models). * `preview`: string. (Public preview) Uses a preview model. For more information, see [Answer generation model versions and lifecycle](https://cloud.google.com/generative-ai-app-builder/docs/answer-generation-models).",
        ).optional(),
      }).describe("Specification of the model.").optional(),
      summaryResultCount: z.number().int().describe(
        "The number of top results to generate the summary from. If the number of results returned is less than `summaryResultCount`, the summary is generated from all of the results. At most 10 results for documents mode, or 50 for chunks mode, can be used to generate a summary. The chunks mode is used when SearchRequest.ContentSearchSpec.search_result_mode is set to CHUNKS.",
      ).optional(),
      useSemanticChunks: z.boolean().describe(
        "If true, answer will be generated from most relevant chunks from top search results. This feature will improve summary quality. Note that with this feature enabled, not all top search results will be referenced and included in the reference list, so the citation source index only points to the search results listed in the reference list.",
      ).optional(),
    }).describe(
      "A specification for configuring a summary returned in a search response.",
    ).optional(),
  }).describe("A specification for configuring the behavior of content search.")
    .optional(),
  createTime: z.string().describe(
    "Output only. Timestamp the WidgetConfig was created.",
  ).optional(),
  customerProvidedConfig: z.object({
    customerType: z.enum(["DEFAULT_CUSTOMER", "GOVERNMENT_CUSTOMER"]).describe(
      "Customer type.",
    ).optional(),
  }).describe("Customer provided configurations.").optional(),
  dataStoreType: z.enum([
    "DATA_STORE_TYPE_UNSPECIFIED",
    "SITE_SEARCH",
    "STRUCTURED",
    "UNSTRUCTURED",
    "BLENDED",
  ]).describe("Output only. The type of the parent data store.").optional(),
  displayName: z.string().describe(
    "Required. The human readable widget config display name. Used in Discovery UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  enablePrivateKnowledgeGraph: z.boolean().describe(
    "Optional. Output only. Whether to enable private knowledge graph.",
  ).optional(),
  enableResultScore: z.boolean().describe("Whether to show the result score.")
    .optional(),
  geminiBundle: z.boolean().describe(
    "Output only. Whether the subscription is gemini bundle or not.",
  ).optional(),
  homepageSetting: z.object({
    shortcuts: z.array(z.object({
      destinationUri: z.string().describe(
        "Optional. Destination URL of shortcut.",
      ).optional(),
      icon: z.object({
        url: z.string().describe("Image URL.").optional(),
      }).describe("Options to store an image.").optional(),
      title: z.string().describe("Optional. Title of the shortcut.").optional(),
    })).describe("Optional. The shortcuts to display on the homepage.")
      .optional(),
  }).describe(
    "Describes the homepage setting of the widget. It includes all homepage related settings and configurations, such as shortcuts.",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe(
    "Output only. The industry vertical that the WidgetConfig registers. The WidgetConfig industry vertical is based on the associated Engine.",
  ).optional(),
  llmEnabled: z.boolean().describe(
    "Output only. Whether LLM is enabled in the corresponding data store.",
  ).optional(),
  minimumDataTermAccepted: z.boolean().describe(
    "Output only. Whether the customer accepted data use terms.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the widget config. Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}/widgetConfigs/{widget_config_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  nodes: z.array(z.object({
    description: z.string().describe(
      "Output only. A detailed description of what the node does.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. A human readable name for the node.",
    ).optional(),
    iconUrl: z.string().describe(
      "Output only. An identifier or URL pointing to an icon representing this node type.",
    ).optional(),
    outputSchema: z.record(z.string(), z.string()).describe(
      "Output only. The output schema of the tool. This schema is expected to conform to the OpenAPI Schema standard (see https://spec.openapis.org/oas/v3.0.3.html/ and AIP-146). It describes the structure of the output produced by this node.",
    ).optional(),
    parameterSchema: z.record(z.string(), z.string()).describe(
      "Output only. The parameter schema of the tool. This schema is expected to conform to the OpenAPI Schema standard (see https://spec.openapis.org/oas/v3.0.3.html and AIP-146). It describes the expected structure of the parameters that this node accepts.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "FLOW", "CONNECTOR"]).describe(
      "Output only. The type of the node.",
    ).optional(),
  })).describe("Output only. The nodes associated with the Widget Config.")
    .optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. Specifies the solution type that this WidgetConfig can be used for.",
  ).optional(),
  uiBranding: z.object({
    logo: z.object({
      url: z.string().describe("Image URL.").optional(),
    }).describe("Options to store an image.").optional(),
  }).describe("Describes widget UI branding settings.").optional(),
  uiSettings: z.object({
    dataStoreUiConfigs: z.array(z.object({
      facetField: z.array(z.object({
        displayName: z.unknown().describe(
          "Optional. The field name that end users will see.",
        ).optional(),
        field: z.unknown().describe(
          "Required. Registered field name. The format is `field.abc`.",
        ).optional(),
      })).describe(
        "Facet fields that store the mapping of fields to end user widget appearance.",
      ).optional(),
      fieldsUiComponentsMap: z.record(
        z.string(),
        z.object({
          deviceVisibility: z.unknown().describe(
            "The field visibility on different types of devices.",
          ).optional(),
          displayTemplate: z.unknown().describe(
            'The template to customize how the field is displayed. An example value would be a string that looks like: "Price: {value}".',
          ).optional(),
          field: z.unknown().describe(
            "Required. Registered field name. The format is `field.abc`.",
          ).optional(),
        }),
      ).describe(
        "The key is the UI component. Mock. Currently supported `title`, `thumbnail`, `url`, `custom1`, `custom2`, `custom3`. The value is the name of the field along with its device visibility. The 3 custom fields are optional and can be added or removed. `title`, `thumbnail`, `url` are required UI components that cannot be removed.",
      ).optional(),
      id: z.string().describe(
        "Output only. the identifier of the data store, used for widget service. For now it refers to data_store_id, in the future we will migrate the field to encrypted data store name UUID.",
      ).optional(),
      name: z.string().describe(
        "The name of the data store. It should be data store resource name Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
      ).optional(),
    })).describe("Per data store configuration.").optional(),
    defaultSearchRequestOrderBy: z.string().describe(
      "The default ordering for search results if specified. Used to set SearchRequest#order_by on applicable requests. https://cloud.google.com/generative-ai-app-builder/docs/reference/rest/v1alpha/projects.locations.dataStores.servingConfigs/search#request-body",
    ).optional(),
    disableUserEventsCollection: z.boolean().describe(
      "If set to true, the widget will not collect user events.",
    ).optional(),
    enableAutocomplete: z.boolean().describe(
      "Whether or not to enable autocomplete.",
    ).optional(),
    enableCreateAgentButton: z.boolean().describe(
      "Optional. If set to true, the widget will enable the create agent button.",
    ).optional(),
    enablePeopleSearch: z.boolean().describe(
      "Optional. If set to true, the widget will enable people search.",
    ).optional(),
    enableQualityFeedback: z.boolean().describe(
      "Turn on or off collecting the search result quality feedback from end users.",
    ).optional(),
    enableSafeSearch: z.boolean().describe("Whether to enable safe search.")
      .optional(),
    enableSearchAsYouType: z.boolean().describe(
      "Whether to enable search-as-you-type behavior for the search widget.",
    ).optional(),
    enableVisualContentSummary: z.boolean().describe(
      "If set to true, the widget will enable visual content summary on applicable search requests. Only used by healthcare search.",
    ).optional(),
    features: z.record(
      z.string(),
      z.enum([
        "FEATURE_STATE_UNSPECIFIED",
        "FEATURE_STATE_ON",
        "FEATURE_STATE_OFF",
      ]),
    ).describe(
      "Output only. Feature config for the engine to opt in or opt out of features. Supported keys: * `agent-gallery` * `no-code-agent-builder` * `prompt-gallery` * `model-selector` * `notebook-lm` * `people-search` * `people-search-org-chart` * `bi-directional-audio` * `feedback` * `session-sharing` * `personalization-memory` * `personalization-suggested-highlights` * `disable-mobile-app-access` * `disable-agent-sharing` * `disable-image-generation` * `disable-video-generation` * `disable-onedrive-upload` * `disable-talk-to-content` * `disable-google-drive-upload` * `disable-welcome-emails` * `disable-canvas` * `disable-canvas-workspace` * `disable-skills`",
    ).optional(),
    generativeAnswerConfig: z.object({
      disableRelatedQuestions: z.boolean().describe(
        "Whether generated answer contains suggested related questions.",
      ).optional(),
      ignoreAdversarialQuery: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are adversarial.",
      ).optional(),
      ignoreLowRelevantContent: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are not relevant to the content.",
      ).optional(),
      ignoreNonAnswerSeekingQuery: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are not answer-seeking. The default value is `false`. No answer is returned if the search query is classified as a non-answer seeking query. If this field is set to `true`, we skip generating answers for non-answer seeking queries and return fallback messages instead.",
      ).optional(),
      imageSource: z.enum([
        "IMAGE_SOURCE_UNSPECIFIED",
        "ALL_AVAILABLE_SOURCES",
        "CORPUS_IMAGE_ONLY",
        "FIGURE_GENERATION_ONLY",
      ]).describe("Optional. Source of image returned in the answer.")
        .optional(),
      languageCode: z.string().describe(
        "Language code for Summary. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Note: This is an experimental feature.",
      ).optional(),
      maxRephraseSteps: z.number().int().describe(
        "Max rephrase steps. The max number is 5 steps. If not set or set to < 1, it will be set to 1 by default.",
      ).optional(),
      modelPromptPreamble: z.string().describe(
        "Text at the beginning of the prompt that instructs the model that generates the answer.",
      ).optional(),
      modelVersion: z.string().describe(
        "The model version used to generate the answer.",
      ).optional(),
      resultCount: z.number().int().describe(
        "The number of top results to generate the answer from. Up to 10.",
      ).optional(),
    }).describe("Describes configuration for generative answer.").optional(),
    interactionType: z.enum([
      "INTERACTION_TYPE_UNSPECIFIED",
      "SEARCH_ONLY",
      "SEARCH_WITH_ANSWER",
      "SEARCH_WITH_FOLLOW_UPS",
    ]).describe("Describes widget (or web app) interaction type").optional(),
    modelConfigs: z.record(
      z.string(),
      z.enum(["MODEL_STATE_UNSPECIFIED", "MODEL_ENABLED", "MODEL_DISABLED"]),
    ).describe(
      "Output only. Maps a model name to its specific configuration for this engine. This allows admin users to turn on/off individual models. This only stores models whose states are overridden by the admin. When the state is unspecified, or model_configs is empty for this model, the system will decide if this model should be available or not based on the default configuration. For example, a preview model should be disabled by default if the admin has not chosen to enable it.",
    ).optional(),
    resultDescriptionType: z.enum([
      "RESULT_DISPLAY_TYPE_UNSPECIFIED",
      "SNIPPET",
      "EXTRACTIVE_ANSWER",
    ]).describe(
      "Controls whether result extract is display and how (snippet or extractive answer). Default to no result if unspecified.",
    ).optional(),
  }).describe(
    "Describes general widget (or web app) UI settings as seen in the cloud console UI configuration page.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Timestamp the WidgetConfig was updated.",
  ).optional(),
});

const StateSchema = z.object({
  accessSettings: z.object({
    allowPublicAccess: z.boolean(),
    allowlistedDomains: z.array(z.string()),
    enableWebApp: z.boolean(),
    languageCode: z.string(),
    workforceIdentityPoolProvider: z.string(),
  }).optional(),
  allowPublicAccess: z.boolean().optional(),
  allowlistedDomains: z.array(z.string()).optional(),
  assistantSettings: z.object({
    defaultWebGroundingToggleOff: z.boolean(),
    disableLocationContext: z.boolean(),
    googleSearchGroundingEnabled: z.boolean(),
    webGroundingType: z.string(),
  }).optional(),
  collectionComponents: z.array(z.object({
    connectorIconLink: z.string(),
    dataSource: z.string(),
    dataSourceDisplayName: z.string(),
    dataStoreComponents: z.array(z.object({
      dataStoreConfigType: z.string(),
      displayName: z.string(),
      entityName: z.string(),
      id: z.string(),
      name: z.string(),
    })),
    displayName: z.string(),
    id: z.string(),
    name: z.string(),
  })).optional(),
  configId: z.string().optional(),
  contentSearchSpec: z.object({
    chunkSpec: z.object({
      numNextChunks: z.number(),
      numPreviousChunks: z.number(),
    }),
    extractiveContentSpec: z.object({
      maxExtractiveAnswerCount: z.number(),
      maxExtractiveSegmentCount: z.number(),
      numNextSegments: z.number(),
      numPreviousSegments: z.number(),
      returnExtractiveSegmentScore: z.boolean(),
    }),
    searchResultMode: z.string(),
    snippetSpec: z.object({
      maxSnippetCount: z.number(),
      referenceOnly: z.boolean(),
      returnSnippet: z.boolean(),
    }),
    summarySpec: z.object({
      ignoreAdversarialQuery: z.boolean(),
      ignoreJailBreakingQuery: z.boolean(),
      ignoreLowRelevantContent: z.boolean(),
      ignoreNonSummarySeekingQuery: z.boolean(),
      includeCitations: z.boolean(),
      languageCode: z.string(),
      modelPromptSpec: z.object({
        preamble: z.string(),
      }),
      modelSpec: z.object({
        version: z.string(),
      }),
      summaryResultCount: z.number(),
      useSemanticChunks: z.boolean(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  customerProvidedConfig: z.object({
    customerType: z.string(),
  }).optional(),
  dataStoreType: z.string().optional(),
  dataStoreUiConfigs: z.array(z.object({
    facetField: z.array(z.object({
      displayName: z.string(),
      field: z.string(),
    })),
    fieldsUiComponentsMap: z.record(z.string(), z.unknown()),
    id: z.string(),
    name: z.string(),
  })).optional(),
  defaultSearchRequestOrderBy: z.string().optional(),
  displayName: z.string().optional(),
  enableAutocomplete: z.boolean().optional(),
  enableConversationalSearch: z.boolean().optional(),
  enablePrivateKnowledgeGraph: z.boolean().optional(),
  enableQualityFeedback: z.boolean().optional(),
  enableResultScore: z.boolean().optional(),
  enableSafeSearch: z.boolean().optional(),
  enableSearchAsYouType: z.boolean().optional(),
  enableSnippetResultSummary: z.boolean().optional(),
  enableSummarization: z.boolean().optional(),
  enableWebApp: z.boolean().optional(),
  facetField: z.array(z.object({
    displayName: z.string(),
    field: z.string(),
  })).optional(),
  fieldsUiComponentsMap: z.record(z.string(), z.unknown()).optional(),
  geminiBundle: z.boolean().optional(),
  homepageSetting: z.object({
    shortcuts: z.array(z.object({
      destinationUri: z.string(),
      icon: z.object({
        url: z.string(),
      }),
      title: z.string(),
    })),
  }).optional(),
  industryVertical: z.string().optional(),
  llmEnabled: z.boolean().optional(),
  minimumDataTermAccepted: z.boolean().optional(),
  name: z.string(),
  nodes: z.array(z.object({
    description: z.string(),
    displayName: z.string(),
    iconUrl: z.string(),
    outputSchema: z.record(z.string(), z.unknown()),
    parameterSchema: z.record(z.string(), z.unknown()),
    type: z.string(),
  })).optional(),
  resultDisplayType: z.string().optional(),
  solutionType: z.string().optional(),
  uiBranding: z.object({
    logo: z.object({
      url: z.string(),
    }),
  }).optional(),
  uiSettings: z.object({
    dataStoreUiConfigs: z.array(z.object({
      facetField: z.array(z.object({
        displayName: z.unknown(),
        field: z.unknown(),
      })),
      fieldsUiComponentsMap: z.record(z.string(), z.unknown()),
      id: z.string(),
      name: z.string(),
    })),
    defaultSearchRequestOrderBy: z.string(),
    disableUserEventsCollection: z.boolean(),
    enableAutocomplete: z.boolean(),
    enableCreateAgentButton: z.boolean(),
    enablePeopleSearch: z.boolean(),
    enableQualityFeedback: z.boolean(),
    enableSafeSearch: z.boolean(),
    enableSearchAsYouType: z.boolean(),
    enableVisualContentSummary: z.boolean(),
    features: z.record(z.string(), z.unknown()),
    generativeAnswerConfig: z.object({
      disableRelatedQuestions: z.boolean(),
      ignoreAdversarialQuery: z.boolean(),
      ignoreLowRelevantContent: z.boolean(),
      ignoreNonAnswerSeekingQuery: z.boolean(),
      imageSource: z.string(),
      languageCode: z.string(),
      maxRephraseSteps: z.number(),
      modelPromptPreamble: z.string(),
      modelVersion: z.string(),
      resultCount: z.number(),
    }),
    interactionType: z.string(),
    modelConfigs: z.record(z.string(), z.unknown()),
    resultDescriptionType: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessSettings: z.object({
    allowPublicAccess: z.boolean().describe(
      "Whether public unauthenticated access is allowed.",
    ).optional(),
    allowlistedDomains: z.array(z.string()).describe(
      "List of domains that are allowed to integrate the search widget.",
    ).optional(),
    enableWebApp: z.boolean().describe("Whether web app access is enabled.")
      .optional(),
    languageCode: z.string().describe(
      'Optional. Language code for user interface. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). If unset, the default language code is "en-US".',
    ).optional(),
    workforceIdentityPoolProvider: z.string().describe(
      "Optional. The workforce identity pool provider used to access the widget.",
    ).optional(),
  }).describe("Describes widget access settings.").optional(),
  assistantSettings: z.object({
    defaultWebGroundingToggleOff: z.boolean().describe(
      "Output only. This field controls the default web grounding toggle for end users if `web_grounding_type` is set to `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`. By default, this field is set to false. If `web_grounding_type` is `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`, end users will have web grounding enabled by default on UI. If true, grounding toggle will be disabled by default on UI. End users can still enable web grounding in the UI if web grounding is enabled.",
    ).optional(),
    disableLocationContext: z.boolean().describe(
      "Optional. Output only. Whether to disable user location context.",
    ).optional(),
    googleSearchGroundingEnabled: z.boolean().describe(
      "Whether or not the Google search grounding toggle is shown. Deprecated. Use web_grounding_type instead.",
    ).optional(),
    webGroundingType: z.enum([
      "WEB_GROUNDING_TYPE_UNSPECIFIED",
      "WEB_GROUNDING_TYPE_DISABLED",
      "WEB_GROUNDING_TYPE_GOOGLE_SEARCH",
      "WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH",
    ]).describe("Optional. The type of web grounding to use.").optional(),
  }).describe("Describes the assistant settings of the widget.").optional(),
  collectionComponents: z.array(z.object({
    connectorIconLink: z.string().describe(
      "Output only. The icon link of the connector source.",
    ).optional(),
    dataSource: z.string().describe(
      "The name of the data source, retrieved from `Collection.data_connector.data_source`.",
    ).optional(),
    dataSourceDisplayName: z.string().describe(
      "Output only. The display name of the data source.",
    ).optional(),
    dataStoreComponents: z.array(z.object({
      dataStoreConfigType: z.enum([
        "DATA_STORE_CONFIG_TYPE_UNSPECIFIED",
        "ALLOW_DB_CONFIG",
        "THIRD_PARTY_OAUTH_CONFIG",
        "NOTEBOOKLM_CONFIG",
      ]).describe("Output only. The type of the data store config.").optional(),
      displayName: z.string().describe("The display name of the data store.")
        .optional(),
      entityName: z.string().describe(
        "The name of the entity, retrieved from `Collection.data_connector.entities.entityName`.",
      ).optional(),
      id: z.string().describe(
        "Output only. the identifier of the data store, used for widget service. For now it refers to data_store_id, in the future we will migrate the field to encrypted data store name UUID.",
      ).optional(),
      name: z.string().describe(
        "The name of the data store. It should be data store resource name Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
      ).optional(),
    })).describe(
      "For the data store collection, list of the children data stores.",
    ).optional(),
    displayName: z.string().describe("The display name of the collection.")
      .optional(),
    id: z.string().describe(
      "Output only. the identifier of the collection, used for widget service. For now it refers to collection_id, in the future we will migrate the field to encrypted collection name UUID.",
    ).optional(),
    name: z.string().describe(
      "The name of the collection. It should be collection resource name. Format: `projects/{project}/locations/{location}/collections/{collection_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
    ).optional(),
  })).describe(
    "Output only. Collection components that lists all collections and child data stores associated with the widget config, those data sources can be used for filtering in widget service APIs, users can return results that from selected data sources.",
  ).optional(),
  configId: z.string().describe(
    "Output only. Unique obfuscated identifier of a WidgetConfig.",
  ).optional(),
  contentSearchSpec: z.object({
    chunkSpec: z.object({
      numNextChunks: z.number().int().describe(
        "The number of next chunks to be returned of the current chunk. The maximum allowed value is 3. If not specified, no next chunks will be returned.",
      ).optional(),
      numPreviousChunks: z.number().int().describe(
        "The number of previous chunks to be returned of the current chunk. The maximum allowed value is 3. If not specified, no previous chunks will be returned.",
      ).optional(),
    }).describe(
      "Specifies the chunk spec to be returned from the search response. Only available if the SearchRequest.ContentSearchSpec.search_result_mode is set to CHUNKS",
    ).optional(),
    extractiveContentSpec: z.object({
      maxExtractiveAnswerCount: z.number().int().describe(
        "The maximum number of extractive answers returned in each search result. An extractive answer is a verbatim answer extracted from the original document, which provides a precise and contextually relevant answer to the search query. If the number of matching answers is less than the `max_extractive_answer_count`, return all of the answers. Otherwise, return the `max_extractive_answer_count`. At most five answers are returned for each SearchResult.",
      ).optional(),
      maxExtractiveSegmentCount: z.number().int().describe(
        "The max number of extractive segments returned in each search result. Only applied if the DataStore is set to DataStore.ContentConfig.CONTENT_REQUIRED or DataStore.solution_types is SOLUTION_TYPE_CHAT. An extractive segment is a text segment extracted from the original document that is relevant to the search query, and, in general, more verbose than an extractive answer. The segment could then be used as input for LLMs to generate summaries and answers. If the number of matching segments is less than `max_extractive_segment_count`, return all of the segments. Otherwise, return the `max_extractive_segment_count`.",
      ).optional(),
      numNextSegments: z.number().int().describe(
        "Return at most `num_next_segments` segments after each selected segments.",
      ).optional(),
      numPreviousSegments: z.number().int().describe(
        "Specifies whether to also include the adjacent from each selected segments. Return at most `num_previous_segments` segments before each selected segments.",
      ).optional(),
      returnExtractiveSegmentScore: z.boolean().describe(
        "Specifies whether to return the confidence score from the extractive segments in each search result. This feature is available only for new or allowlisted data stores. To allowlist your data store, contact your Customer Engineer. The default value is `false`.",
      ).optional(),
    }).describe(
      "A specification for configuring the extractive content in a search response.",
    ).optional(),
    searchResultMode: z.enum([
      "SEARCH_RESULT_MODE_UNSPECIFIED",
      "DOCUMENTS",
      "CHUNKS",
    ]).describe(
      "Specifies the search result mode. If unspecified, the search result mode defaults to `DOCUMENTS`.",
    ).optional(),
    snippetSpec: z.object({
      maxSnippetCount: z.number().int().describe(
        "[DEPRECATED] This field is deprecated. To control snippet return, use `return_snippet` field. For backwards compatibility, we will return snippet if max_snippet_count > 0.",
      ).optional(),
      referenceOnly: z.boolean().describe(
        "[DEPRECATED] This field is deprecated and will have no affect on the snippet.",
      ).optional(),
      returnSnippet: z.boolean().describe(
        'If `true`, then return snippet. If no snippet can be generated, we return "No snippet is available for this page." A `snippet_status` with `SUCCESS` or `NO_SNIPPET_AVAILABLE` will also be returned.',
      ).optional(),
    }).describe(
      "A specification for configuring snippets in a search response.",
    ).optional(),
    summarySpec: z.object({
      ignoreAdversarialQuery: z.boolean().describe(
        "Specifies whether to filter out adversarial queries. The default value is `false`. Google employs search-query classification to detect adversarial queries. No summary is returned if the search query is classified as an adversarial query. For example, a user might ask a question regarding negative comments about the company or submit a query designed to generate unsafe, policy-violating output. If this field is set to `true`, we skip generating summaries for adversarial queries and return fallback messages instead.",
      ).optional(),
      ignoreJailBreakingQuery: z.boolean().describe(
        'Optional. Specifies whether to filter out jail-breaking queries. The default value is `false`. Google employs search-query classification to detect jail-breaking queries. No summary is returned if the search query is classified as a jail-breaking query. A user might add instructions to the query to change the tone, style, language, content of the answer, or ask the model to act as a different entity, e.g. "Reply in the tone of a competing company\'s CEO". If this field is set to `true`, we skip generating summaries for jail-breaking queries and return fallback messages instead.',
      ).optional(),
      ignoreLowRelevantContent: z.boolean().describe(
        "Specifies whether to filter out queries that have low relevance. The default value is `false`. If this field is set to `false`, all search results are used regardless of relevance to generate answers. If set to `true`, only queries with high relevance search results will generate answers.",
      ).optional(),
      ignoreNonSummarySeekingQuery: z.boolean().describe(
        "Specifies whether to filter out queries that are not summary-seeking. The default value is `false`. Google employs search-query classification to detect summary-seeking queries. No summary is returned if the search query is classified as a non-summary seeking query. For example, `why is the sky blue` and `Who is the best soccer player in the world?` are summary-seeking queries, but `SFO airport` and `world cup 2026` are not. They are most likely navigational queries. If this field is set to `true`, we skip generating summaries for non-summary seeking queries and return fallback messages instead.",
      ).optional(),
      includeCitations: z.boolean().describe(
        "Specifies whether to include citations in the summary. The default value is `false`. When this field is set to `true`, summaries include in-line citation numbers. Example summary including citations: BigQuery is Google Cloud's fully managed and completely serverless enterprise data warehouse [1]. BigQuery supports all data types, works across clouds, and has built-in machine learning and business intelligence, all within a unified platform [2, 3]. The citation numbers refer to the returned search results and are 1-indexed. For example, [1] means that the sentence is attributed to the first search result. [2, 3] means that the sentence is attributed to both the second and third search results.",
      ).optional(),
      languageCode: z.string().describe(
        "Language code for Summary. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Note: This is an experimental feature.",
      ).optional(),
      modelPromptSpec: z.object({
        preamble: z.string().describe(
          "Text at the beginning of the prompt that instructs the assistant. Examples are available in the user guide.",
        ).optional(),
      }).describe("Specification of the prompt to use with the model.")
        .optional(),
      modelSpec: z.object({
        version: z.string().describe(
          "The model version used to generate the summary. Supported values are: * `stable`: string. Default value when no value is specified. Uses a generally available, fine-tuned model. For more information, see [Answer generation model versions and lifecycle](https://cloud.google.com/generative-ai-app-builder/docs/answer-generation-models). * `preview`: string. (Public preview) Uses a preview model. For more information, see [Answer generation model versions and lifecycle](https://cloud.google.com/generative-ai-app-builder/docs/answer-generation-models).",
        ).optional(),
      }).describe("Specification of the model.").optional(),
      summaryResultCount: z.number().int().describe(
        "The number of top results to generate the summary from. If the number of results returned is less than `summaryResultCount`, the summary is generated from all of the results. At most 10 results for documents mode, or 50 for chunks mode, can be used to generate a summary. The chunks mode is used when SearchRequest.ContentSearchSpec.search_result_mode is set to CHUNKS.",
      ).optional(),
      useSemanticChunks: z.boolean().describe(
        "If true, answer will be generated from most relevant chunks from top search results. This feature will improve summary quality. Note that with this feature enabled, not all top search results will be referenced and included in the reference list, so the citation source index only points to the search results listed in the reference list.",
      ).optional(),
    }).describe(
      "A specification for configuring a summary returned in a search response.",
    ).optional(),
  }).describe("A specification for configuring the behavior of content search.")
    .optional(),
  createTime: z.string().describe(
    "Output only. Timestamp the WidgetConfig was created.",
  ).optional(),
  customerProvidedConfig: z.object({
    customerType: z.enum(["DEFAULT_CUSTOMER", "GOVERNMENT_CUSTOMER"]).describe(
      "Customer type.",
    ).optional(),
  }).describe("Customer provided configurations.").optional(),
  dataStoreType: z.enum([
    "DATA_STORE_TYPE_UNSPECIFIED",
    "SITE_SEARCH",
    "STRUCTURED",
    "UNSTRUCTURED",
    "BLENDED",
  ]).describe("Output only. The type of the parent data store.").optional(),
  displayName: z.string().describe(
    "Required. The human readable widget config display name. Used in Discovery UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  enablePrivateKnowledgeGraph: z.boolean().describe(
    "Optional. Output only. Whether to enable private knowledge graph.",
  ).optional(),
  enableResultScore: z.boolean().describe("Whether to show the result score.")
    .optional(),
  geminiBundle: z.boolean().describe(
    "Output only. Whether the subscription is gemini bundle or not.",
  ).optional(),
  homepageSetting: z.object({
    shortcuts: z.array(z.object({
      destinationUri: z.string().describe(
        "Optional. Destination URL of shortcut.",
      ).optional(),
      icon: z.object({
        url: z.string().describe("Image URL.").optional(),
      }).describe("Options to store an image.").optional(),
      title: z.string().describe("Optional. Title of the shortcut.").optional(),
    })).describe("Optional. The shortcuts to display on the homepage.")
      .optional(),
  }).describe(
    "Describes the homepage setting of the widget. It includes all homepage related settings and configurations, such as shortcuts.",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe(
    "Output only. The industry vertical that the WidgetConfig registers. The WidgetConfig industry vertical is based on the associated Engine.",
  ).optional(),
  llmEnabled: z.boolean().describe(
    "Output only. Whether LLM is enabled in the corresponding data store.",
  ).optional(),
  minimumDataTermAccepted: z.boolean().describe(
    "Output only. Whether the customer accepted data use terms.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the widget config. Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}/widgetConfigs/{widget_config_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  nodes: z.array(z.object({
    description: z.string().describe(
      "Output only. A detailed description of what the node does.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. A human readable name for the node.",
    ).optional(),
    iconUrl: z.string().describe(
      "Output only. An identifier or URL pointing to an icon representing this node type.",
    ).optional(),
    outputSchema: z.record(z.string(), z.string()).describe(
      "Output only. The output schema of the tool. This schema is expected to conform to the OpenAPI Schema standard (see https://spec.openapis.org/oas/v3.0.3.html/ and AIP-146). It describes the structure of the output produced by this node.",
    ).optional(),
    parameterSchema: z.record(z.string(), z.string()).describe(
      "Output only. The parameter schema of the tool. This schema is expected to conform to the OpenAPI Schema standard (see https://spec.openapis.org/oas/v3.0.3.html and AIP-146). It describes the expected structure of the parameters that this node accepts.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "FLOW", "CONNECTOR"]).describe(
      "Output only. The type of the node.",
    ).optional(),
  })).describe("Output only. The nodes associated with the Widget Config.")
    .optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. Specifies the solution type that this WidgetConfig can be used for.",
  ).optional(),
  uiBranding: z.object({
    logo: z.object({
      url: z.string().describe("Image URL.").optional(),
    }).describe("Options to store an image.").optional(),
  }).describe("Describes widget UI branding settings.").optional(),
  uiSettings: z.object({
    dataStoreUiConfigs: z.array(z.object({
      facetField: z.array(z.object({
        displayName: z.unknown().describe(
          "Optional. The field name that end users will see.",
        ).optional(),
        field: z.unknown().describe(
          "Required. Registered field name. The format is `field.abc`.",
        ).optional(),
      })).describe(
        "Facet fields that store the mapping of fields to end user widget appearance.",
      ).optional(),
      fieldsUiComponentsMap: z.record(
        z.string(),
        z.object({
          deviceVisibility: z.unknown().describe(
            "The field visibility on different types of devices.",
          ).optional(),
          displayTemplate: z.unknown().describe(
            'The template to customize how the field is displayed. An example value would be a string that looks like: "Price: {value}".',
          ).optional(),
          field: z.unknown().describe(
            "Required. Registered field name. The format is `field.abc`.",
          ).optional(),
        }),
      ).describe(
        "The key is the UI component. Mock. Currently supported `title`, `thumbnail`, `url`, `custom1`, `custom2`, `custom3`. The value is the name of the field along with its device visibility. The 3 custom fields are optional and can be added or removed. `title`, `thumbnail`, `url` are required UI components that cannot be removed.",
      ).optional(),
      id: z.string().describe(
        "Output only. the identifier of the data store, used for widget service. For now it refers to data_store_id, in the future we will migrate the field to encrypted data store name UUID.",
      ).optional(),
      name: z.string().describe(
        "The name of the data store. It should be data store resource name Format: `projects/{project}/locations/{location}/collections/{collection_id}/dataStores/{data_store_id}`. For APIs under WidgetService, such as WidgetService.LookupWidgetConfig, the project number and location part is erased in this field.",
      ).optional(),
    })).describe("Per data store configuration.").optional(),
    defaultSearchRequestOrderBy: z.string().describe(
      "The default ordering for search results if specified. Used to set SearchRequest#order_by on applicable requests. https://cloud.google.com/generative-ai-app-builder/docs/reference/rest/v1alpha/projects.locations.dataStores.servingConfigs/search#request-body",
    ).optional(),
    disableUserEventsCollection: z.boolean().describe(
      "If set to true, the widget will not collect user events.",
    ).optional(),
    enableAutocomplete: z.boolean().describe(
      "Whether or not to enable autocomplete.",
    ).optional(),
    enableCreateAgentButton: z.boolean().describe(
      "Optional. If set to true, the widget will enable the create agent button.",
    ).optional(),
    enablePeopleSearch: z.boolean().describe(
      "Optional. If set to true, the widget will enable people search.",
    ).optional(),
    enableQualityFeedback: z.boolean().describe(
      "Turn on or off collecting the search result quality feedback from end users.",
    ).optional(),
    enableSafeSearch: z.boolean().describe("Whether to enable safe search.")
      .optional(),
    enableSearchAsYouType: z.boolean().describe(
      "Whether to enable search-as-you-type behavior for the search widget.",
    ).optional(),
    enableVisualContentSummary: z.boolean().describe(
      "If set to true, the widget will enable visual content summary on applicable search requests. Only used by healthcare search.",
    ).optional(),
    features: z.record(
      z.string(),
      z.enum([
        "FEATURE_STATE_UNSPECIFIED",
        "FEATURE_STATE_ON",
        "FEATURE_STATE_OFF",
      ]),
    ).describe(
      "Output only. Feature config for the engine to opt in or opt out of features. Supported keys: * `agent-gallery` * `no-code-agent-builder` * `prompt-gallery` * `model-selector` * `notebook-lm` * `people-search` * `people-search-org-chart` * `bi-directional-audio` * `feedback` * `session-sharing` * `personalization-memory` * `personalization-suggested-highlights` * `disable-mobile-app-access` * `disable-agent-sharing` * `disable-image-generation` * `disable-video-generation` * `disable-onedrive-upload` * `disable-talk-to-content` * `disable-google-drive-upload` * `disable-welcome-emails` * `disable-canvas` * `disable-canvas-workspace` * `disable-skills`",
    ).optional(),
    generativeAnswerConfig: z.object({
      disableRelatedQuestions: z.boolean().describe(
        "Whether generated answer contains suggested related questions.",
      ).optional(),
      ignoreAdversarialQuery: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are adversarial.",
      ).optional(),
      ignoreLowRelevantContent: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are not relevant to the content.",
      ).optional(),
      ignoreNonAnswerSeekingQuery: z.boolean().describe(
        "Optional. Specifies whether to filter out queries that are not answer-seeking. The default value is `false`. No answer is returned if the search query is classified as a non-answer seeking query. If this field is set to `true`, we skip generating answers for non-answer seeking queries and return fallback messages instead.",
      ).optional(),
      imageSource: z.enum([
        "IMAGE_SOURCE_UNSPECIFIED",
        "ALL_AVAILABLE_SOURCES",
        "CORPUS_IMAGE_ONLY",
        "FIGURE_GENERATION_ONLY",
      ]).describe("Optional. Source of image returned in the answer.")
        .optional(),
      languageCode: z.string().describe(
        "Language code for Summary. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Note: This is an experimental feature.",
      ).optional(),
      maxRephraseSteps: z.number().int().describe(
        "Max rephrase steps. The max number is 5 steps. If not set or set to < 1, it will be set to 1 by default.",
      ).optional(),
      modelPromptPreamble: z.string().describe(
        "Text at the beginning of the prompt that instructs the model that generates the answer.",
      ).optional(),
      modelVersion: z.string().describe(
        "The model version used to generate the answer.",
      ).optional(),
      resultCount: z.number().int().describe(
        "The number of top results to generate the answer from. Up to 10.",
      ).optional(),
    }).describe("Describes configuration for generative answer.").optional(),
    interactionType: z.enum([
      "INTERACTION_TYPE_UNSPECIFIED",
      "SEARCH_ONLY",
      "SEARCH_WITH_ANSWER",
      "SEARCH_WITH_FOLLOW_UPS",
    ]).describe("Describes widget (or web app) interaction type").optional(),
    modelConfigs: z.record(
      z.string(),
      z.enum(["MODEL_STATE_UNSPECIFIED", "MODEL_ENABLED", "MODEL_DISABLED"]),
    ).describe(
      "Output only. Maps a model name to its specific configuration for this engine. This allows admin users to turn on/off individual models. This only stores models whose states are overridden by the admin. When the state is unspecified, or model_configs is empty for this model, the system will decide if this model should be available or not based on the default configuration. For example, a preview model should be disabled by default if the admin has not chosen to enable it.",
    ).optional(),
    resultDescriptionType: z.enum([
      "RESULT_DISPLAY_TYPE_UNSPECIFIED",
      "SNIPPET",
      "EXTRACTIVE_ANSWER",
    ]).describe(
      "Controls whether result extract is display and how (snippet or extractive answer). Default to no result if unspecified.",
    ).optional(),
  }).describe(
    "Describes general widget (or web app) UI settings as seen in the cloud console UI configuration page.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Timestamp the WidgetConfig was updated.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine DataStores.WidgetConfigs. Registered at `@swamp/gcp/discoveryengine/datastores-widgetconfigs`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/datastores-widgetconfigs",
  version: "2026.05.01.1",
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
      toVersion: "2026.04.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WidgetConfig captures configs at the Widget level.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a widgetConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the widgetConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update widgetConfigs attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accessSettings"] !== undefined) {
          body["accessSettings"] = g["accessSettings"];
        }
        if (g["assistantSettings"] !== undefined) {
          body["assistantSettings"] = g["assistantSettings"];
        }
        if (g["collectionComponents"] !== undefined) {
          body["collectionComponents"] = g["collectionComponents"];
        }
        if (g["configId"] !== undefined) body["configId"] = g["configId"];
        if (g["contentSearchSpec"] !== undefined) {
          body["contentSearchSpec"] = g["contentSearchSpec"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["customerProvidedConfig"] !== undefined) {
          body["customerProvidedConfig"] = g["customerProvidedConfig"];
        }
        if (g["dataStoreType"] !== undefined) {
          body["dataStoreType"] = g["dataStoreType"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enablePrivateKnowledgeGraph"] !== undefined) {
          body["enablePrivateKnowledgeGraph"] =
            g["enablePrivateKnowledgeGraph"];
        }
        if (g["enableResultScore"] !== undefined) {
          body["enableResultScore"] = g["enableResultScore"];
        }
        if (g["geminiBundle"] !== undefined) {
          body["geminiBundle"] = g["geminiBundle"];
        }
        if (g["homepageSetting"] !== undefined) {
          body["homepageSetting"] = g["homepageSetting"];
        }
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["llmEnabled"] !== undefined) body["llmEnabled"] = g["llmEnabled"];
        if (g["minimumDataTermAccepted"] !== undefined) {
          body["minimumDataTermAccepted"] = g["minimumDataTermAccepted"];
        }
        if (g["nodes"] !== undefined) body["nodes"] = g["nodes"];
        if (g["solutionType"] !== undefined) {
          body["solutionType"] = g["solutionType"];
        }
        if (g["uiBranding"] !== undefined) body["uiBranding"] = g["uiBranding"];
        if (g["uiSettings"] !== undefined) body["uiSettings"] = g["uiSettings"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
    sync: {
      description: "Sync widgetConfigs state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
