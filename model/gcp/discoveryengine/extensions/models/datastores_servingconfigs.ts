// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores-servingconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine DataStores.ServingConfigs.
 *
 * Configures metadata that is used to generate serving time results (e.g. search results or recommendation predictions). The ServingConfig is passed in the search and predict request and generates results.
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
  return `${parent}/servingConfigs/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.servingConfigs.get",
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
  "id": "discoveryengine.projects.locations.dataStores.servingConfigs.create",
  "path": "v1/{+parent}/servingConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "servingConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.servingConfigs.patch",
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
  "id": "discoveryengine.projects.locations.dataStores.servingConfigs.delete",
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
  "id": "discoveryengine.projects.locations.dataStores.servingConfigs.list",
  "path": "v1/{+parent}/servingConfigs",
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
  answerGenerationSpec: z.object({
    userDefinedClassifierSpec: z.object({
      enableUserDefinedClassifier: z.boolean().describe(
        "Optional. Whether or not to enable and include user defined classifier.",
      ).optional(),
      modelId: z.string().describe(
        "Optional. The model id to be used for the user defined classifier.",
      ).optional(),
      preamble: z.string().describe(
        "Optional. The preamble to be used for the user defined classifier.",
      ).optional(),
      seed: z.number().int().describe(
        "Optional. The seed value to be used for the user defined classifier.",
      ).optional(),
      taskMarker: z.string().describe(
        "Optional. The task marker to be used for the user defined classifier.",
      ).optional(),
      temperature: z.number().describe(
        "Optional. The temperature value to be used for the user defined classifier.",
      ).optional(),
      topK: z.string().describe(
        "Optional. The top-k value to be used for the user defined classifier.",
      ).optional(),
      topP: z.number().describe(
        "Optional. The top-p value to be used for the user defined classifier.",
      ).optional(),
    }).describe("The specification for user defined classifier.").optional(),
  }).describe("The specification for answer generation.").optional(),
  boostControlIds: z.array(z.string()).describe(
    "Boost controls to use in serving path. All triggered boost controls will be applied. Boost controls must be in the same data store as the serving config. Maximum of 20 boost controls.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The human readable serving config display name. Used in Discovery UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  dissociateControlIds: z.array(z.string()).describe(
    "Condition do not associate specifications. If multiple do not associate conditions match, all matching do not associate controls in the list will execute. Order does not matter. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  diversityLevel: z.string().describe(
    "How much diversity to use in recommendation model results e.g. `medium-diversity` or `high-diversity`. Currently supported values: * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` * `auto-diversity` If not specified, we choose default based on recommendation model type. Default value: `no-diversity`. Can only be set if SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  filterControlIds: z.array(z.string()).describe(
    "Filter controls to use in serving path. All triggered filter controls will be applied. Filter controls must be in the same data store as the serving config. Maximum of 20 filter controls.",
  ).optional(),
  genericConfig: z.object({
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
    }).describe(
      "A specification for configuring the behavior of content search.",
    ).optional(),
  }).describe(
    "Specifies the configurations needed for Generic Discovery.Currently we support: * `content_search_spec`: configuration for generic content search.",
  ).optional(),
  ignoreControlIds: z.array(z.string()).describe(
    "Condition ignore specifications. If multiple ignore conditions match, all matching ignore controls in the list will execute. Order does not matter. Maximum number of specifications is 100.",
  ).optional(),
  mediaConfig: z.object({
    contentFreshnessCutoffDays: z.number().int().describe(
      "Specifies the content freshness used for recommendation result. Contents will be demoted if contents were published for more than content freshness cutoff days.",
    ).optional(),
    contentWatchedPercentageThreshold: z.number().describe(
      "Specifies the content watched percentage threshold for demotion. Threshold value must be between [0, 1.0] inclusive.",
    ).optional(),
    contentWatchedSecondsThreshold: z.number().describe(
      "Specifies the content watched minutes threshold for demotion.",
    ).optional(),
    demoteContentWatchedPastDays: z.number().int().describe(
      "Optional. Specifies the number of days to look back for demoting watched content. If set to zero or unset, defaults to the maximum of 365 days.",
    ).optional(),
    demotionEventType: z.string().describe(
      "Specifies the event type used for demoting recommendation result. Currently supported values: * `view-item`: Item viewed. * `media-play`: Start/resume watching a video, playing a song, etc. * `media-complete`: Finished or stopped midway through a video, song, etc. If unset, watch history demotion will not be applied. Content freshness demotion will still be applied.",
    ).optional(),
  }).describe(
    "Specifies the configurations needed for Media Discovery. Currently we support: * `demote_content_watched`: Threshold for watched content demotion. Customers can specify if using watched content demotion or use viewed detail page. Using the content watched demotion, customers need to specify the watched minutes or percentage exceeds the threshold, the content will be demoted in the recommendation result. * `promote_fresh_content`: cutoff days for fresh content promotion. Customers can specify if using content freshness promotion. If the content was published within the cutoff days, the content will be promoted in the recommendation result. Can only be set if SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  modelId: z.string().describe(
    "The id of the model to use at serving time. Currently only RecommendationModels are supported. Can be changed but only to a compatible model (e.g. others-you-may-like CTR to others-you-may-like CVR). Required when SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/{location}/collections/{collection_id}/engines/{engine_id}/servingConfigs/{serving_config_id}`",
  ).optional(),
  onewaySynonymsControlIds: z.array(z.string()).describe(
    "Condition oneway synonyms specifications. If multiple oneway synonyms conditions match, all matching oneway synonyms controls in the list will execute. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  promoteControlIds: z.array(z.string()).describe(
    "Condition promote specifications. Maximum number of specifications is 100.",
  ).optional(),
  rankingExpression: z.string().describe(
    'The ranking expression controls the customized ranking on retrieval documents. To leverage this, document embedding is required. The ranking expression setting in ServingConfig applies to all search requests served by the serving config. However, if `SearchRequest.ranking_expression` is specified, it overrides the ServingConfig ranking expression. The ranking expression is a single function or multiple functions that are joined by "+". * ranking_expression = function, { " + ", function }; Supported functions: * double * relevance_score * double * dotProduct(embedding_field_path) Function variables: * `relevance_score`: pre-defined keywords, used for measure relevance between query and document. * `embedding_field_path`: the document embedding field used with query embedding vector. * `dotProduct`: embedding function between embedding_field_path and query embedding vector. Example ranking expression: If document has an embedding field doc_embedding, the ranking expression could be `0.5 * relevance_score + 0.3 * dotProduct(doc_embedding)`.',
  ).optional(),
  redirectControlIds: z.array(z.string()).describe(
    "IDs of the redirect controls. Only the first triggered redirect action is applied, even if multiple apply. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  replacementControlIds: z.array(z.string()).describe(
    "Condition replacement specifications. Applied according to the order in the list. A previously replaced term can not be re-replaced. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. Specifies the solution type that a serving config can be associated with.",
  ).optional(),
  synonymsControlIds: z.array(z.string()).describe(
    "Condition synonyms specifications. If multiple synonyms conditions match, all matching synonyms controls in the list will execute. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  servingConfigId: z.string().describe(
    "Required. The ID to use for the ServingConfig, which will become the final component of the ServingConfig's resource name. This value should be 4-63 characters, and valid characters are /a-zA-Z0-9+/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  answerGenerationSpec: z.object({
    userDefinedClassifierSpec: z.object({
      enableUserDefinedClassifier: z.boolean(),
      modelId: z.string(),
      preamble: z.string(),
      seed: z.number(),
      taskMarker: z.string(),
      temperature: z.number(),
      topK: z.string(),
      topP: z.number(),
    }),
  }).optional(),
  boostControlIds: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  dissociateControlIds: z.array(z.string()).optional(),
  diversityLevel: z.string().optional(),
  filterControlIds: z.array(z.string()).optional(),
  genericConfig: z.object({
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
    }),
  }).optional(),
  ignoreControlIds: z.array(z.string()).optional(),
  mediaConfig: z.object({
    contentFreshnessCutoffDays: z.number(),
    contentWatchedPercentageThreshold: z.number(),
    contentWatchedSecondsThreshold: z.number(),
    demoteContentWatchedPastDays: z.number(),
    demotionEventType: z.string(),
  }).optional(),
  modelId: z.string().optional(),
  name: z.string(),
  onewaySynonymsControlIds: z.array(z.string()).optional(),
  promoteControlIds: z.array(z.string()).optional(),
  rankingExpression: z.string().optional(),
  redirectControlIds: z.array(z.string()).optional(),
  replacementControlIds: z.array(z.string()).optional(),
  solutionType: z.string().optional(),
  synonymsControlIds: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  answerGenerationSpec: z.object({
    userDefinedClassifierSpec: z.object({
      enableUserDefinedClassifier: z.boolean().describe(
        "Optional. Whether or not to enable and include user defined classifier.",
      ).optional(),
      modelId: z.string().describe(
        "Optional. The model id to be used for the user defined classifier.",
      ).optional(),
      preamble: z.string().describe(
        "Optional. The preamble to be used for the user defined classifier.",
      ).optional(),
      seed: z.number().int().describe(
        "Optional. The seed value to be used for the user defined classifier.",
      ).optional(),
      taskMarker: z.string().describe(
        "Optional. The task marker to be used for the user defined classifier.",
      ).optional(),
      temperature: z.number().describe(
        "Optional. The temperature value to be used for the user defined classifier.",
      ).optional(),
      topK: z.string().describe(
        "Optional. The top-k value to be used for the user defined classifier.",
      ).optional(),
      topP: z.number().describe(
        "Optional. The top-p value to be used for the user defined classifier.",
      ).optional(),
    }).describe("The specification for user defined classifier.").optional(),
  }).describe("The specification for answer generation.").optional(),
  boostControlIds: z.array(z.string()).describe(
    "Boost controls to use in serving path. All triggered boost controls will be applied. Boost controls must be in the same data store as the serving config. Maximum of 20 boost controls.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The human readable serving config display name. Used in Discovery UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  dissociateControlIds: z.array(z.string()).describe(
    "Condition do not associate specifications. If multiple do not associate conditions match, all matching do not associate controls in the list will execute. Order does not matter. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  diversityLevel: z.string().describe(
    "How much diversity to use in recommendation model results e.g. `medium-diversity` or `high-diversity`. Currently supported values: * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` * `auto-diversity` If not specified, we choose default based on recommendation model type. Default value: `no-diversity`. Can only be set if SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  filterControlIds: z.array(z.string()).describe(
    "Filter controls to use in serving path. All triggered filter controls will be applied. Filter controls must be in the same data store as the serving config. Maximum of 20 filter controls.",
  ).optional(),
  genericConfig: z.object({
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
    }).describe(
      "A specification for configuring the behavior of content search.",
    ).optional(),
  }).describe(
    "Specifies the configurations needed for Generic Discovery.Currently we support: * `content_search_spec`: configuration for generic content search.",
  ).optional(),
  ignoreControlIds: z.array(z.string()).describe(
    "Condition ignore specifications. If multiple ignore conditions match, all matching ignore controls in the list will execute. Order does not matter. Maximum number of specifications is 100.",
  ).optional(),
  mediaConfig: z.object({
    contentFreshnessCutoffDays: z.number().int().describe(
      "Specifies the content freshness used for recommendation result. Contents will be demoted if contents were published for more than content freshness cutoff days.",
    ).optional(),
    contentWatchedPercentageThreshold: z.number().describe(
      "Specifies the content watched percentage threshold for demotion. Threshold value must be between [0, 1.0] inclusive.",
    ).optional(),
    contentWatchedSecondsThreshold: z.number().describe(
      "Specifies the content watched minutes threshold for demotion.",
    ).optional(),
    demoteContentWatchedPastDays: z.number().int().describe(
      "Optional. Specifies the number of days to look back for demoting watched content. If set to zero or unset, defaults to the maximum of 365 days.",
    ).optional(),
    demotionEventType: z.string().describe(
      "Specifies the event type used for demoting recommendation result. Currently supported values: * `view-item`: Item viewed. * `media-play`: Start/resume watching a video, playing a song, etc. * `media-complete`: Finished or stopped midway through a video, song, etc. If unset, watch history demotion will not be applied. Content freshness demotion will still be applied.",
    ).optional(),
  }).describe(
    "Specifies the configurations needed for Media Discovery. Currently we support: * `demote_content_watched`: Threshold for watched content demotion. Customers can specify if using watched content demotion or use viewed detail page. Using the content watched demotion, customers need to specify the watched minutes or percentage exceeds the threshold, the content will be demoted in the recommendation result. * `promote_fresh_content`: cutoff days for fresh content promotion. Customers can specify if using content freshness promotion. If the content was published within the cutoff days, the content will be promoted in the recommendation result. Can only be set if SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  modelId: z.string().describe(
    "The id of the model to use at serving time. Currently only RecommendationModels are supported. Can be changed but only to a compatible model (e.g. others-you-may-like CTR to others-you-may-like CVR). Required when SolutionType is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/{location}/collections/{collection_id}/engines/{engine_id}/servingConfigs/{serving_config_id}`",
  ).optional(),
  onewaySynonymsControlIds: z.array(z.string()).describe(
    "Condition oneway synonyms specifications. If multiple oneway synonyms conditions match, all matching oneway synonyms controls in the list will execute. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  promoteControlIds: z.array(z.string()).describe(
    "Condition promote specifications. Maximum number of specifications is 100.",
  ).optional(),
  rankingExpression: z.string().describe(
    'The ranking expression controls the customized ranking on retrieval documents. To leverage this, document embedding is required. The ranking expression setting in ServingConfig applies to all search requests served by the serving config. However, if `SearchRequest.ranking_expression` is specified, it overrides the ServingConfig ranking expression. The ranking expression is a single function or multiple functions that are joined by "+". * ranking_expression = function, { " + ", function }; Supported functions: * double * relevance_score * double * dotProduct(embedding_field_path) Function variables: * `relevance_score`: pre-defined keywords, used for measure relevance between query and document. * `embedding_field_path`: the document embedding field used with query embedding vector. * `dotProduct`: embedding function between embedding_field_path and query embedding vector. Example ranking expression: If document has an embedding field doc_embedding, the ranking expression could be `0.5 * relevance_score + 0.3 * dotProduct(doc_embedding)`.',
  ).optional(),
  redirectControlIds: z.array(z.string()).describe(
    "IDs of the redirect controls. Only the first triggered redirect action is applied, even if multiple apply. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  replacementControlIds: z.array(z.string()).describe(
    "Condition replacement specifications. Applied according to the order in the list. A previously replaced term can not be re-replaced. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. Specifies the solution type that a serving config can be associated with.",
  ).optional(),
  synonymsControlIds: z.array(z.string()).describe(
    "Condition synonyms specifications. If multiple synonyms conditions match, all matching synonyms controls in the list will execute. Maximum number of specifications is 100. Can only be set if SolutionType is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  servingConfigId: z.string().describe(
    "Required. The ID to use for the ServingConfig, which will become the final component of the ServingConfig's resource name. This value should be 4-63 characters, and valid characters are /a-zA-Z0-9+/.",
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

/** Swamp extension model for Google Cloud Discovery Engine DataStores.ServingConfigs. Registered at `@swamp/gcp/discoveryengine/datastores-servingconfigs`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/datastores-servingconfigs",
  version: "2026.06.07.1",
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
      toVersion: "2026.04.08.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configures metadata that is used to generate serving time results (e.g. searc...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a servingConfigs",
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
        if (g["answerGenerationSpec"] !== undefined) {
          body["answerGenerationSpec"] = g["answerGenerationSpec"];
        }
        if (g["boostControlIds"] !== undefined) {
          body["boostControlIds"] = g["boostControlIds"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["dissociateControlIds"] !== undefined) {
          body["dissociateControlIds"] = g["dissociateControlIds"];
        }
        if (g["diversityLevel"] !== undefined) {
          body["diversityLevel"] = g["diversityLevel"];
        }
        if (g["filterControlIds"] !== undefined) {
          body["filterControlIds"] = g["filterControlIds"];
        }
        if (g["genericConfig"] !== undefined) {
          body["genericConfig"] = g["genericConfig"];
        }
        if (g["ignoreControlIds"] !== undefined) {
          body["ignoreControlIds"] = g["ignoreControlIds"];
        }
        if (g["mediaConfig"] !== undefined) {
          body["mediaConfig"] = g["mediaConfig"];
        }
        if (g["modelId"] !== undefined) body["modelId"] = g["modelId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["onewaySynonymsControlIds"] !== undefined) {
          body["onewaySynonymsControlIds"] = g["onewaySynonymsControlIds"];
        }
        if (g["promoteControlIds"] !== undefined) {
          body["promoteControlIds"] = g["promoteControlIds"];
        }
        if (g["rankingExpression"] !== undefined) {
          body["rankingExpression"] = g["rankingExpression"];
        }
        if (g["redirectControlIds"] !== undefined) {
          body["redirectControlIds"] = g["redirectControlIds"];
        }
        if (g["replacementControlIds"] !== undefined) {
          body["replacementControlIds"] = g["replacementControlIds"];
        }
        if (g["solutionType"] !== undefined) {
          body["solutionType"] = g["solutionType"];
        }
        if (g["synonymsControlIds"] !== undefined) {
          body["synonymsControlIds"] = g["synonymsControlIds"];
        }
        if (g["servingConfigId"] !== undefined) {
          body["servingConfigId"] = g["servingConfigId"];
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
          credentials,
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
      description: "Get a servingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the servingConfigs"),
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
      description: "Update servingConfigs attributes",
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
        if (g["answerGenerationSpec"] !== undefined) {
          body["answerGenerationSpec"] = g["answerGenerationSpec"];
        }
        if (g["boostControlIds"] !== undefined) {
          body["boostControlIds"] = g["boostControlIds"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["dissociateControlIds"] !== undefined) {
          body["dissociateControlIds"] = g["dissociateControlIds"];
        }
        if (g["diversityLevel"] !== undefined) {
          body["diversityLevel"] = g["diversityLevel"];
        }
        if (g["filterControlIds"] !== undefined) {
          body["filterControlIds"] = g["filterControlIds"];
        }
        if (g["genericConfig"] !== undefined) {
          body["genericConfig"] = g["genericConfig"];
        }
        if (g["ignoreControlIds"] !== undefined) {
          body["ignoreControlIds"] = g["ignoreControlIds"];
        }
        if (g["mediaConfig"] !== undefined) {
          body["mediaConfig"] = g["mediaConfig"];
        }
        if (g["modelId"] !== undefined) body["modelId"] = g["modelId"];
        if (g["onewaySynonymsControlIds"] !== undefined) {
          body["onewaySynonymsControlIds"] = g["onewaySynonymsControlIds"];
        }
        if (g["promoteControlIds"] !== undefined) {
          body["promoteControlIds"] = g["promoteControlIds"];
        }
        if (g["rankingExpression"] !== undefined) {
          body["rankingExpression"] = g["rankingExpression"];
        }
        if (g["redirectControlIds"] !== undefined) {
          body["redirectControlIds"] = g["redirectControlIds"];
        }
        if (g["replacementControlIds"] !== undefined) {
          body["replacementControlIds"] = g["replacementControlIds"];
        }
        if (g["synonymsControlIds"] !== undefined) {
          body["synonymsControlIds"] = g["synonymsControlIds"];
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
      description: "Delete the servingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the servingConfigs"),
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
      description: "Sync servingConfigs state from GCP",
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
      description: "List servingConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of results to return. If unspecified, defaults to 100. If a value greater than 100 is provided, at most 100 results are returned.",
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
          "servingConfigs",
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
    answer: {
      description: "answer",
      arguments: z.object({
        answerGenerationSpec: z.any().optional(),
        asynchronousMode: z.any().optional(),
        endUserSpec: z.any().optional(),
        groundingSpec: z.any().optional(),
        query: z.any().optional(),
        queryUnderstandingSpec: z.any().optional(),
        relatedQuestionsSpec: z.any().optional(),
        safetySpec: z.any().optional(),
        searchSpec: z.any().optional(),
        session: z.any().optional(),
        userLabels: z.any().optional(),
        userPseudoId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["answerGenerationSpec"] !== undefined) {
          body["answerGenerationSpec"] = args["answerGenerationSpec"];
        }
        if (args["asynchronousMode"] !== undefined) {
          body["asynchronousMode"] = args["asynchronousMode"];
        }
        if (args["endUserSpec"] !== undefined) {
          body["endUserSpec"] = args["endUserSpec"];
        }
        if (args["groundingSpec"] !== undefined) {
          body["groundingSpec"] = args["groundingSpec"];
        }
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryUnderstandingSpec"] !== undefined) {
          body["queryUnderstandingSpec"] = args["queryUnderstandingSpec"];
        }
        if (args["relatedQuestionsSpec"] !== undefined) {
          body["relatedQuestionsSpec"] = args["relatedQuestionsSpec"];
        }
        if (args["safetySpec"] !== undefined) {
          body["safetySpec"] = args["safetySpec"];
        }
        if (args["searchSpec"] !== undefined) {
          body["searchSpec"] = args["searchSpec"];
        }
        if (args["session"] !== undefined) body["session"] = args["session"];
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["userPseudoId"] !== undefined) {
          body["userPseudoId"] = args["userPseudoId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.servingConfigs.answer",
            "path": "v1/{+servingConfig}:answer",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
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
    recommend: {
      description: "recommend",
      arguments: z.object({
        filter: z.any().optional(),
        pageSize: z.any().optional(),
        params: z.any().optional(),
        userEvent: z.any().optional(),
        userLabels: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["userEvent"] !== undefined) {
          body["userEvent"] = args["userEvent"];
        }
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.servingConfigs.recommend",
            "path": "v1/{+servingConfig}:recommend",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
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
    search: {
      description: "search",
      arguments: z.object({
        boostSpec: z.any().optional(),
        branch: z.any().optional(),
        canonicalFilter: z.any().optional(),
        contentSearchSpec: z.any().optional(),
        crowdingSpecs: z.any().optional(),
        customRankingParams: z.any().optional(),
        dataStoreSpecs: z.any().optional(),
        displaySpec: z.any().optional(),
        entity: z.any().optional(),
        facetSpecs: z.any().optional(),
        filter: z.any().optional(),
        imageQuery: z.any().optional(),
        languageCode: z.any().optional(),
        naturalLanguageQueryUnderstandingSpec: z.any().optional(),
        numResultsPerDataStore: z.any().optional(),
        offset: z.any().optional(),
        oneBoxPageSize: z.any().optional(),
        orderBy: z.any().optional(),
        pageCategories: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        params: z.any().optional(),
        query: z.any().optional(),
        queryExpansionSpec: z.any().optional(),
        rankingExpression: z.any().optional(),
        rankingExpressionBackend: z.any().optional(),
        relevanceScoreSpec: z.any().optional(),
        relevanceThreshold: z.any().optional(),
        safeSearch: z.any().optional(),
        searchAsYouTypeSpec: z.any().optional(),
        session: z.any().optional(),
        sessionSpec: z.any().optional(),
        spellCorrectionSpec: z.any().optional(),
        userInfo: z.any().optional(),
        userLabels: z.any().optional(),
        userPseudoId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["boostSpec"] !== undefined) {
          body["boostSpec"] = args["boostSpec"];
        }
        if (args["branch"] !== undefined) body["branch"] = args["branch"];
        if (args["canonicalFilter"] !== undefined) {
          body["canonicalFilter"] = args["canonicalFilter"];
        }
        if (args["contentSearchSpec"] !== undefined) {
          body["contentSearchSpec"] = args["contentSearchSpec"];
        }
        if (args["crowdingSpecs"] !== undefined) {
          body["crowdingSpecs"] = args["crowdingSpecs"];
        }
        if (args["customRankingParams"] !== undefined) {
          body["customRankingParams"] = args["customRankingParams"];
        }
        if (args["dataStoreSpecs"] !== undefined) {
          body["dataStoreSpecs"] = args["dataStoreSpecs"];
        }
        if (args["displaySpec"] !== undefined) {
          body["displaySpec"] = args["displaySpec"];
        }
        if (args["entity"] !== undefined) body["entity"] = args["entity"];
        if (args["facetSpecs"] !== undefined) {
          body["facetSpecs"] = args["facetSpecs"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["imageQuery"] !== undefined) {
          body["imageQuery"] = args["imageQuery"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["naturalLanguageQueryUnderstandingSpec"] !== undefined) {
          body["naturalLanguageQueryUnderstandingSpec"] =
            args["naturalLanguageQueryUnderstandingSpec"];
        }
        if (args["numResultsPerDataStore"] !== undefined) {
          body["numResultsPerDataStore"] = args["numResultsPerDataStore"];
        }
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["oneBoxPageSize"] !== undefined) {
          body["oneBoxPageSize"] = args["oneBoxPageSize"];
        }
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageCategories"] !== undefined) {
          body["pageCategories"] = args["pageCategories"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryExpansionSpec"] !== undefined) {
          body["queryExpansionSpec"] = args["queryExpansionSpec"];
        }
        if (args["rankingExpression"] !== undefined) {
          body["rankingExpression"] = args["rankingExpression"];
        }
        if (args["rankingExpressionBackend"] !== undefined) {
          body["rankingExpressionBackend"] = args["rankingExpressionBackend"];
        }
        if (args["relevanceScoreSpec"] !== undefined) {
          body["relevanceScoreSpec"] = args["relevanceScoreSpec"];
        }
        if (args["relevanceThreshold"] !== undefined) {
          body["relevanceThreshold"] = args["relevanceThreshold"];
        }
        if (args["safeSearch"] !== undefined) {
          body["safeSearch"] = args["safeSearch"];
        }
        if (args["searchAsYouTypeSpec"] !== undefined) {
          body["searchAsYouTypeSpec"] = args["searchAsYouTypeSpec"];
        }
        if (args["session"] !== undefined) body["session"] = args["session"];
        if (args["sessionSpec"] !== undefined) {
          body["sessionSpec"] = args["sessionSpec"];
        }
        if (args["spellCorrectionSpec"] !== undefined) {
          body["spellCorrectionSpec"] = args["spellCorrectionSpec"];
        }
        if (args["userInfo"] !== undefined) body["userInfo"] = args["userInfo"];
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["userPseudoId"] !== undefined) {
          body["userPseudoId"] = args["userPseudoId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.servingConfigs.search",
            "path": "v1/{+servingConfig}:search",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
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
    search_lite: {
      description: "search lite",
      arguments: z.object({
        boostSpec: z.any().optional(),
        branch: z.any().optional(),
        canonicalFilter: z.any().optional(),
        contentSearchSpec: z.any().optional(),
        crowdingSpecs: z.any().optional(),
        customRankingParams: z.any().optional(),
        dataStoreSpecs: z.any().optional(),
        displaySpec: z.any().optional(),
        entity: z.any().optional(),
        facetSpecs: z.any().optional(),
        filter: z.any().optional(),
        imageQuery: z.any().optional(),
        languageCode: z.any().optional(),
        naturalLanguageQueryUnderstandingSpec: z.any().optional(),
        numResultsPerDataStore: z.any().optional(),
        offset: z.any().optional(),
        oneBoxPageSize: z.any().optional(),
        orderBy: z.any().optional(),
        pageCategories: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        params: z.any().optional(),
        query: z.any().optional(),
        queryExpansionSpec: z.any().optional(),
        rankingExpression: z.any().optional(),
        rankingExpressionBackend: z.any().optional(),
        relevanceScoreSpec: z.any().optional(),
        relevanceThreshold: z.any().optional(),
        safeSearch: z.any().optional(),
        searchAsYouTypeSpec: z.any().optional(),
        session: z.any().optional(),
        sessionSpec: z.any().optional(),
        spellCorrectionSpec: z.any().optional(),
        userInfo: z.any().optional(),
        userLabels: z.any().optional(),
        userPseudoId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["boostSpec"] !== undefined) {
          body["boostSpec"] = args["boostSpec"];
        }
        if (args["branch"] !== undefined) body["branch"] = args["branch"];
        if (args["canonicalFilter"] !== undefined) {
          body["canonicalFilter"] = args["canonicalFilter"];
        }
        if (args["contentSearchSpec"] !== undefined) {
          body["contentSearchSpec"] = args["contentSearchSpec"];
        }
        if (args["crowdingSpecs"] !== undefined) {
          body["crowdingSpecs"] = args["crowdingSpecs"];
        }
        if (args["customRankingParams"] !== undefined) {
          body["customRankingParams"] = args["customRankingParams"];
        }
        if (args["dataStoreSpecs"] !== undefined) {
          body["dataStoreSpecs"] = args["dataStoreSpecs"];
        }
        if (args["displaySpec"] !== undefined) {
          body["displaySpec"] = args["displaySpec"];
        }
        if (args["entity"] !== undefined) body["entity"] = args["entity"];
        if (args["facetSpecs"] !== undefined) {
          body["facetSpecs"] = args["facetSpecs"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["imageQuery"] !== undefined) {
          body["imageQuery"] = args["imageQuery"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["naturalLanguageQueryUnderstandingSpec"] !== undefined) {
          body["naturalLanguageQueryUnderstandingSpec"] =
            args["naturalLanguageQueryUnderstandingSpec"];
        }
        if (args["numResultsPerDataStore"] !== undefined) {
          body["numResultsPerDataStore"] = args["numResultsPerDataStore"];
        }
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["oneBoxPageSize"] !== undefined) {
          body["oneBoxPageSize"] = args["oneBoxPageSize"];
        }
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageCategories"] !== undefined) {
          body["pageCategories"] = args["pageCategories"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryExpansionSpec"] !== undefined) {
          body["queryExpansionSpec"] = args["queryExpansionSpec"];
        }
        if (args["rankingExpression"] !== undefined) {
          body["rankingExpression"] = args["rankingExpression"];
        }
        if (args["rankingExpressionBackend"] !== undefined) {
          body["rankingExpressionBackend"] = args["rankingExpressionBackend"];
        }
        if (args["relevanceScoreSpec"] !== undefined) {
          body["relevanceScoreSpec"] = args["relevanceScoreSpec"];
        }
        if (args["relevanceThreshold"] !== undefined) {
          body["relevanceThreshold"] = args["relevanceThreshold"];
        }
        if (args["safeSearch"] !== undefined) {
          body["safeSearch"] = args["safeSearch"];
        }
        if (args["searchAsYouTypeSpec"] !== undefined) {
          body["searchAsYouTypeSpec"] = args["searchAsYouTypeSpec"];
        }
        if (args["session"] !== undefined) body["session"] = args["session"];
        if (args["sessionSpec"] !== undefined) {
          body["sessionSpec"] = args["sessionSpec"];
        }
        if (args["spellCorrectionSpec"] !== undefined) {
          body["spellCorrectionSpec"] = args["spellCorrectionSpec"];
        }
        if (args["userInfo"] !== undefined) body["userInfo"] = args["userInfo"];
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["userPseudoId"] !== undefined) {
          body["userPseudoId"] = args["userPseudoId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.servingConfigs.searchLite",
            "path": "v1/{+servingConfig}:searchLite",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
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
    stream_answer: {
      description: "stream answer",
      arguments: z.object({
        answerGenerationSpec: z.any().optional(),
        asynchronousMode: z.any().optional(),
        endUserSpec: z.any().optional(),
        groundingSpec: z.any().optional(),
        query: z.any().optional(),
        queryUnderstandingSpec: z.any().optional(),
        relatedQuestionsSpec: z.any().optional(),
        safetySpec: z.any().optional(),
        searchSpec: z.any().optional(),
        session: z.any().optional(),
        userLabels: z.any().optional(),
        userPseudoId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["answerGenerationSpec"] !== undefined) {
          body["answerGenerationSpec"] = args["answerGenerationSpec"];
        }
        if (args["asynchronousMode"] !== undefined) {
          body["asynchronousMode"] = args["asynchronousMode"];
        }
        if (args["endUserSpec"] !== undefined) {
          body["endUserSpec"] = args["endUserSpec"];
        }
        if (args["groundingSpec"] !== undefined) {
          body["groundingSpec"] = args["groundingSpec"];
        }
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryUnderstandingSpec"] !== undefined) {
          body["queryUnderstandingSpec"] = args["queryUnderstandingSpec"];
        }
        if (args["relatedQuestionsSpec"] !== undefined) {
          body["relatedQuestionsSpec"] = args["relatedQuestionsSpec"];
        }
        if (args["safetySpec"] !== undefined) {
          body["safetySpec"] = args["safetySpec"];
        }
        if (args["searchSpec"] !== undefined) {
          body["searchSpec"] = args["searchSpec"];
        }
        if (args["session"] !== undefined) body["session"] = args["session"];
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["userPseudoId"] !== undefined) {
          body["userPseudoId"] = args["userPseudoId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.dataStores.servingConfigs.streamAnswer",
            "path": "v1/{+servingConfig}:streamAnswer",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
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
