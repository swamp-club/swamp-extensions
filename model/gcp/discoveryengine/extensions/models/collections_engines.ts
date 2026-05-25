// Auto-generated extension model for @swamp/gcp/discoveryengine/collections-engines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine Collections.Engines.
 *
 * Metadata that describes the training and serving parameters of an Engine.
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
  return `${parent}/engines/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.collections.engines.get",
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
  "id": "discoveryengine.projects.locations.collections.engines.create",
  "path": "v1/{+parent}/engines",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "engineId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.collections.engines.patch",
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
  "id": "discoveryengine.projects.locations.collections.engines.delete",
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
  "id": "discoveryengine.projects.locations.collections.engines.list",
  "path": "v1/{+parent}/engines",
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
  agentGatewaySetting: z.object({
    defaultEgressAgentGateway: z.object({
      name: z.string().describe(
        "Required. Immutable. The resource name of the agent gateway. Expected format: `projects/{project_number}/locations/{location}/agentGateways/{agent_gateway}`.",
      ).optional(),
    }).describe("Reference to an Agent Gateway resource.").optional(),
  }).describe(
    "Agent Gateway setting, which may be attached to Gemini Enterprise resources for egress control of Gemini Enterprise agents to agents and tools outside of Gemini Enterprise.",
  ).optional(),
  appType: z.enum(["APP_TYPE_UNSPECIFIED", "APP_TYPE_INTRANET"]).describe(
    "Optional. Immutable. This the application type which this engine resource represents. NOTE: this is a new concept independ of existing industry vertical or solution type.",
  ).optional(),
  chatEngineConfig: z.object({
    agentCreationConfig: z.object({
      business: z.string().describe(
        "Name of the company, organization or other entity that the agent represents. Used for knowledge connector LLM prompt and for knowledge search.",
      ).optional(),
      defaultLanguageCode: z.string().describe(
        "Required. The default language of the agent as a language tag. See [Language Support](https://cloud.google.com/dialogflow/docs/reference/language) for a list of the currently supported language codes.",
      ).optional(),
      location: z.string().describe(
        "Agent location for Agent creation, supported values: global/us/eu. If not provided, us Engine will create Agent using us-central-1 by default; eu Engine will create Agent using eu-west-1 by default.",
      ).optional(),
      timeZone: z.string().describe(
        "Required. The time zone of the agent from the [time zone database](https://www.iana.org/time-zones), e.g., America/New_York, Europe/Paris.",
      ).optional(),
    }).describe(
      "Configurations for generating a Dialogflow agent. Note that these configurations are one-time consumed by and passed to Dialogflow service. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation.",
    ).optional(),
    allowCrossRegion: z.boolean().describe(
      "Optional. If the flag set to true, we allow the agent and engine are in different locations, otherwise the agent and engine are required to be in the same location. The flag is set to false by default. Note that the `allow_cross_region` are one-time consumed by and passed to EngineService.CreateEngine. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation.",
    ).optional(),
    dialogflowAgentToLink: z.string().describe(
      "The resource name of an exist Dialogflow agent to link to this Chat Engine. Customers can either provide `agent_creation_config` to create agent or provide an agent name that links the agent with the Chat engine. Format: `projects//locations//agents/`. Note that the `dialogflow_agent_to_link` are one-time consumed by and passed to Dialogflow service. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation. Use ChatEngineMetadata.dialogflow_agent for actual agent association after Engine is created.",
    ).optional(),
  }).describe("Configurations for a Chat Engine.").optional(),
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
  commonConfig: z.object({
    companyName: z.string().describe(
      "The name of the company, business or entity that is associated with the engine. Setting this may help improve LLM related features.",
    ).optional(),
  }).describe("Common configurations for an Engine.").optional(),
  configurableBillingApproach: z.enum([
    "CONFIGURABLE_BILLING_APPROACH_UNSPECIFIED",
    "CONFIGURABLE_BILLING_APPROACH_ENABLED",
  ]).describe("Optional. Configuration for configurable billing approach.")
    .optional(),
  connectorTenantInfo: z.record(z.string(), z.string()).describe(
    'Optional. Maps a connector ID (e.g., "hybrid-github", "shopify") to tenant-specific information required for that connector. The structure of the tenant information string is connector-dependent.',
  ).optional(),
  dataStoreIds: z.array(z.string()).describe(
    "Optional. The data stores associated with this engine. For SOLUTION_TYPE_SEARCH and SOLUTION_TYPE_RECOMMENDATION type of engines, they can only associate with at most one data store. If solution_type is SOLUTION_TYPE_CHAT, multiple DataStores in the same Collection can be associated here. Note that when used in CreateEngineRequest, one DataStore id must be provided as the system will use it for necessary initializations.",
  ).optional(),
  disableAnalytics: z.boolean().describe(
    "Optional. Whether to disable analytics for searches performed on this engine.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the engine. Should be human readable. UTF-8 encoded string with limit of 1024 characters.",
  ).optional(),
  features: z.record(
    z.string(),
    z.enum([
      "FEATURE_STATE_UNSPECIFIED",
      "FEATURE_STATE_ON",
      "FEATURE_STATE_OFF",
    ]),
  ).describe(
    "Optional. Feature config for the engine to opt in or opt out of features. Supported keys: * `*`: all features, if it's present, all other feature state settings are ignored. * `agent-gallery` * `no-code-agent-builder` * `prompt-gallery` * `model-selector` * `notebook-lm` * `people-search` * `people-search-org-chart` * `bi-directional-audio` * `feedback` * `session-sharing` * `personalization-memory` * `personalization-suggested-highlights` * `disable-agent-sharing` * `disable-image-generation` * `disable-video-generation` * `disable-onedrive-upload` * `disable-talk-to-content` * `disable-google-drive-upload` * `disable-welcome-emails`",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe(
    "Optional. The industry vertical that the engine registers. The restriction of the Engine industry vertical is based on DataStore: Vertical on Engine has to match vertical of the DataStore linked to the engine.",
  ).optional(),
  knowledgeGraphConfig: z.object({
    cloudKnowledgeGraphTypes: z.array(z.string()).describe(
      "Specify entity types to support.",
    ).optional(),
    enableCloudKnowledgeGraph: z.boolean().describe(
      "Whether to enable the Cloud Knowledge Graph for the engine. Defaults to false if not specified.",
    ).optional(),
    enablePrivateKnowledgeGraph: z.boolean().describe(
      "Whether to enable the Private Knowledge Graph for the engine. Defaults to false if not specified.",
    ).optional(),
    featureConfig: z.object({
      disablePrivateKgAutoComplete: z.boolean().describe(
        "Whether to disable the private KG auto complete for the engine. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgEnrichment: z.boolean().describe(
        "Whether to disable the private KG enrichment for the engine. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgQueryUiChips: z.boolean().describe(
        "Whether to disable the private KG for query UI chips. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgQueryUnderstanding: z.boolean().describe(
        "Whether to disable the private KG query understanding for the engine. Defaults to false if not specified.",
      ).optional(),
    }).describe("Feature config for the Knowledge Graph.").optional(),
    privateKnowledgeGraphTypes: z.array(z.string()).describe(
      "Specify entity types to support.",
    ).optional(),
  }).describe("Configuration message for the Knowledge Graph.").optional(),
  marketplaceAgentVisibility: z.enum([
    "MARKETPLACE_AGENT_VISIBILITY_UNSPECIFIED",
    "SHOW_AVAILABLE_AGENTS_ONLY",
    "SHOW_AGENTS_ALREADY_INTEGRATED",
    "SHOW_AGENTS_ALREADY_PURCHASED",
    "SHOW_ALL_AGENTS",
  ]).describe(
    "Optional. The visibility of marketplace agents in the agent gallery.",
  ).optional(),
  mediaRecommendationEngineConfig: z.object({
    engineFeaturesConfig: z.object({
      mostPopularConfig: z.object({
        timeWindowDays: z.string().describe(
          "The time window of which the engine is queried at training and prediction time. Positive integers only. The value translates to the last X days of events. Currently required for the `most-popular-items` engine.",
        ).optional(),
      }).describe(
        "Feature configurations that are required for creating a Most Popular engine.",
      ).optional(),
      recommendedForYouConfig: z.object({
        contextEventType: z.string().describe(
          "The type of event with which the engine is queried at prediction time. If set to `generic`, only `view-item`, `media-play`,and `media-complete` will be used as `context-event` in engine training. If set to `view-home-page`, `view-home-page` will also be used as `context-events` in addition to `view-item`, `media-play`, and `media-complete`. Currently supported for the `recommended-for-you` engine. Currently supported values: `view-home-page`, `generic`.",
        ).optional(),
      }).describe(
        "Additional feature configurations for creating a `recommended-for-you` engine.",
      ).optional(),
    }).describe("More feature configs of the selected engine type.").optional(),
    optimizationObjective: z.string().describe(
      "The optimization objective. e.g., `cvr`. This field together with optimization_objective describe engine metadata to use to control engine training and serving. Currently supported values: `ctr`, `cvr`. If not specified, we choose default based on engine type. Default depends on type of recommendation: `recommended-for-you` => `ctr` `others-you-may-like` => `ctr`",
    ).optional(),
    optimizationObjectiveConfig: z.object({
      targetField: z.string().describe(
        "Required. The name of the field to target. Currently supported values: `watch-percentage`, `watch-time`.",
      ).optional(),
      targetFieldValueFloat: z.number().describe(
        "Required. The threshold to be applied to the target (e.g., 0.5).",
      ).optional(),
    }).describe("Custom threshold for `cvr` optimization_objective.")
      .optional(),
    trainingState: z.enum(["TRAINING_STATE_UNSPECIFIED", "PAUSED", "TRAINING"])
      .describe(
        "The training state that the engine is in (e.g. `TRAINING` or `PAUSED`). Since part of the cost of running the service is frequency of training - this can be used to determine when to train engine in order to control cost. If not specified: the default value for `CreateEngine` method is `TRAINING`. The default value for `UpdateEngine` method is to keep the state the same as before.",
      ).optional(),
    type: z.string().describe(
      "Required. The type of engine. e.g., `recommended-for-you`. This field together with optimization_objective describe engine metadata to use to control engine training and serving. Currently supported values: `recommended-for-you`, `others-you-may-like`, `more-like-this`, `most-popular-items`.",
    ).optional(),
  }).describe("Additional config specs for a Media Recommendation engine.")
    .optional(),
  modelConfigs: z.record(
    z.string(),
    z.enum(["MODEL_STATE_UNSPECIFIED", "MODEL_ENABLED", "MODEL_DISABLED"]),
  ).describe(
    "Optional. Maps a model name to its specific configuration for this engine. This allows admin users to turn on/off individual models. This only stores models whose states are overridden by the admin. When the state is unspecified, or model_configs is empty for this model, the system will decide if this model should be available or not based on the default configuration. For example, a preview model should be disabled by default if the admin has not chosen to enable it.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The fully qualified resource name of the engine. This field must be a UTF-8 encoded string with a length limit of 1024 characters. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` engine should be 1-63 characters, and valid characters are /a-z0-9*/. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean().describe(
      "Optional. Enables observability. If `false`, all other flags are ignored.",
    ).optional(),
    sensitiveLoggingEnabled: z.boolean().describe(
      "Optional. Enables sensitive logging. Sensitive logging includes customer core content (e.g. prompts, responses). If `false`, will sanitize all sensitive fields.",
    ).optional(),
  }).describe("Observability config for a resource.").optional(),
  procurementContactEmails: z.array(z.string()).describe(
    "Optional. The emails of the procurement contacts.",
  ).optional(),
  searchEngineConfig: z.object({
    requiredSubscriptionTier: z.enum([
      "SUBSCRIPTION_TIER_UNSPECIFIED",
      "SUBSCRIPTION_TIER_SEARCH",
      "SUBSCRIPTION_TIER_SEARCH_AND_ASSISTANT",
      "SUBSCRIPTION_TIER_NOTEBOOK_LM",
      "SUBSCRIPTION_TIER_FRONTLINE_WORKER",
      "SUBSCRIPTION_TIER_AGENTSPACE_STARTER",
      "SUBSCRIPTION_TIER_AGENTSPACE_BUSINESS",
      "SUBSCRIPTION_TIER_ENTERPRISE",
      "SUBSCRIPTION_TIER_ENTERPRISE_EMERGING",
      "SUBSCRIPTION_TIER_EDU",
      "SUBSCRIPTION_TIER_EDU_PRO",
      "SUBSCRIPTION_TIER_EDU_EMERGING",
      "SUBSCRIPTION_TIER_EDU_PRO_EMERGING",
      "SUBSCRIPTION_TIER_FRONTLINE_STARTER",
    ]).describe(
      "Optional. The required subscription tier of this engine. They cannot be modified after engine creation. If the required subscription tier is search, user with higher license tier like assist can still access the standalone app associated with this engine.",
    ).optional(),
    searchAddOns: z.array(
      z.enum(["SEARCH_ADD_ON_UNSPECIFIED", "SEARCH_ADD_ON_LLM"]),
    ).describe("The add-on that this search engine enables.").optional(),
    searchTier: z.enum([
      "SEARCH_TIER_UNSPECIFIED",
      "SEARCH_TIER_STANDARD",
      "SEARCH_TIER_ENTERPRISE",
    ]).describe(
      "The search feature tier of this engine. Different tiers might have different pricing. To learn more, check the pricing documentation. Defaults to SearchTier.SEARCH_TIER_STANDARD if not specified.",
    ).optional(),
  }).describe("Configurations for a Search Engine.").optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe("Required. The solutions of the engine.").optional(),
  engineId: z.string().describe(
    "Required. The ID to use for the Engine, which will become the final component of the Engine's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentGatewaySetting: z.object({
    defaultEgressAgentGateway: z.object({
      name: z.string(),
    }),
  }).optional(),
  appType: z.string().optional(),
  chatEngineConfig: z.object({
    agentCreationConfig: z.object({
      business: z.string(),
      defaultLanguageCode: z.string(),
      location: z.string(),
      timeZone: z.string(),
    }),
    allowCrossRegion: z.boolean(),
    dialogflowAgentToLink: z.string(),
  }).optional(),
  chatEngineMetadata: z.object({
    dialogflowAgent: z.string(),
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
  commonConfig: z.object({
    companyName: z.string(),
  }).optional(),
  configurableBillingApproach: z.string().optional(),
  connectorTenantInfo: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  dataStoreIds: z.array(z.string()).optional(),
  disableAnalytics: z.boolean().optional(),
  displayName: z.string().optional(),
  features: z.record(z.string(), z.unknown()).optional(),
  industryVertical: z.string().optional(),
  knowledgeGraphConfig: z.object({
    cloudKnowledgeGraphTypes: z.array(z.string()),
    enableCloudKnowledgeGraph: z.boolean(),
    enablePrivateKnowledgeGraph: z.boolean(),
    featureConfig: z.object({
      disablePrivateKgAutoComplete: z.boolean(),
      disablePrivateKgEnrichment: z.boolean(),
      disablePrivateKgQueryUiChips: z.boolean(),
      disablePrivateKgQueryUnderstanding: z.boolean(),
    }),
    privateKnowledgeGraphTypes: z.array(z.string()),
  }).optional(),
  marketplaceAgentVisibility: z.string().optional(),
  mediaRecommendationEngineConfig: z.object({
    engineFeaturesConfig: z.object({
      mostPopularConfig: z.object({
        timeWindowDays: z.string(),
      }),
      recommendedForYouConfig: z.object({
        contextEventType: z.string(),
      }),
    }),
    optimizationObjective: z.string(),
    optimizationObjectiveConfig: z.object({
      targetField: z.string(),
      targetFieldValueFloat: z.number(),
    }),
    trainingState: z.string(),
    type: z.string(),
  }).optional(),
  modelConfigs: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean(),
    sensitiveLoggingEnabled: z.boolean(),
  }).optional(),
  procurementContactEmails: z.array(z.string()).optional(),
  searchEngineConfig: z.object({
    requiredSubscriptionTier: z.string(),
    searchAddOns: z.array(z.string()),
    searchTier: z.string(),
  }).optional(),
  solutionType: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  agentGatewaySetting: z.object({
    defaultEgressAgentGateway: z.object({
      name: z.string().describe(
        "Required. Immutable. The resource name of the agent gateway. Expected format: `projects/{project_number}/locations/{location}/agentGateways/{agent_gateway}`.",
      ).optional(),
    }).describe("Reference to an Agent Gateway resource.").optional(),
  }).describe(
    "Agent Gateway setting, which may be attached to Gemini Enterprise resources for egress control of Gemini Enterprise agents to agents and tools outside of Gemini Enterprise.",
  ).optional(),
  appType: z.enum(["APP_TYPE_UNSPECIFIED", "APP_TYPE_INTRANET"]).describe(
    "Optional. Immutable. This the application type which this engine resource represents. NOTE: this is a new concept independ of existing industry vertical or solution type.",
  ).optional(),
  chatEngineConfig: z.object({
    agentCreationConfig: z.object({
      business: z.string().describe(
        "Name of the company, organization or other entity that the agent represents. Used for knowledge connector LLM prompt and for knowledge search.",
      ).optional(),
      defaultLanguageCode: z.string().describe(
        "Required. The default language of the agent as a language tag. See [Language Support](https://cloud.google.com/dialogflow/docs/reference/language) for a list of the currently supported language codes.",
      ).optional(),
      location: z.string().describe(
        "Agent location for Agent creation, supported values: global/us/eu. If not provided, us Engine will create Agent using us-central-1 by default; eu Engine will create Agent using eu-west-1 by default.",
      ).optional(),
      timeZone: z.string().describe(
        "Required. The time zone of the agent from the [time zone database](https://www.iana.org/time-zones), e.g., America/New_York, Europe/Paris.",
      ).optional(),
    }).describe(
      "Configurations for generating a Dialogflow agent. Note that these configurations are one-time consumed by and passed to Dialogflow service. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation.",
    ).optional(),
    allowCrossRegion: z.boolean().describe(
      "Optional. If the flag set to true, we allow the agent and engine are in different locations, otherwise the agent and engine are required to be in the same location. The flag is set to false by default. Note that the `allow_cross_region` are one-time consumed by and passed to EngineService.CreateEngine. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation.",
    ).optional(),
    dialogflowAgentToLink: z.string().describe(
      "The resource name of an exist Dialogflow agent to link to this Chat Engine. Customers can either provide `agent_creation_config` to create agent or provide an agent name that links the agent with the Chat engine. Format: `projects//locations//agents/`. Note that the `dialogflow_agent_to_link` are one-time consumed by and passed to Dialogflow service. It means they cannot be retrieved using EngineService.GetEngine or EngineService.ListEngines API after engine creation. Use ChatEngineMetadata.dialogflow_agent for actual agent association after Engine is created.",
    ).optional(),
  }).describe("Configurations for a Chat Engine.").optional(),
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
  commonConfig: z.object({
    companyName: z.string().describe(
      "The name of the company, business or entity that is associated with the engine. Setting this may help improve LLM related features.",
    ).optional(),
  }).describe("Common configurations for an Engine.").optional(),
  configurableBillingApproach: z.enum([
    "CONFIGURABLE_BILLING_APPROACH_UNSPECIFIED",
    "CONFIGURABLE_BILLING_APPROACH_ENABLED",
  ]).describe("Optional. Configuration for configurable billing approach.")
    .optional(),
  connectorTenantInfo: z.record(z.string(), z.string()).describe(
    'Optional. Maps a connector ID (e.g., "hybrid-github", "shopify") to tenant-specific information required for that connector. The structure of the tenant information string is connector-dependent.',
  ).optional(),
  dataStoreIds: z.array(z.string()).describe(
    "Optional. The data stores associated with this engine. For SOLUTION_TYPE_SEARCH and SOLUTION_TYPE_RECOMMENDATION type of engines, they can only associate with at most one data store. If solution_type is SOLUTION_TYPE_CHAT, multiple DataStores in the same Collection can be associated here. Note that when used in CreateEngineRequest, one DataStore id must be provided as the system will use it for necessary initializations.",
  ).optional(),
  disableAnalytics: z.boolean().describe(
    "Optional. Whether to disable analytics for searches performed on this engine.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the engine. Should be human readable. UTF-8 encoded string with limit of 1024 characters.",
  ).optional(),
  features: z.record(
    z.string(),
    z.enum([
      "FEATURE_STATE_UNSPECIFIED",
      "FEATURE_STATE_ON",
      "FEATURE_STATE_OFF",
    ]),
  ).describe(
    "Optional. Feature config for the engine to opt in or opt out of features. Supported keys: * `*`: all features, if it's present, all other feature state settings are ignored. * `agent-gallery` * `no-code-agent-builder` * `prompt-gallery` * `model-selector` * `notebook-lm` * `people-search` * `people-search-org-chart` * `bi-directional-audio` * `feedback` * `session-sharing` * `personalization-memory` * `personalization-suggested-highlights` * `disable-agent-sharing` * `disable-image-generation` * `disable-video-generation` * `disable-onedrive-upload` * `disable-talk-to-content` * `disable-google-drive-upload` * `disable-welcome-emails`",
  ).optional(),
  industryVertical: z.enum([
    "INDUSTRY_VERTICAL_UNSPECIFIED",
    "GENERIC",
    "MEDIA",
    "HEALTHCARE_FHIR",
  ]).describe(
    "Optional. The industry vertical that the engine registers. The restriction of the Engine industry vertical is based on DataStore: Vertical on Engine has to match vertical of the DataStore linked to the engine.",
  ).optional(),
  knowledgeGraphConfig: z.object({
    cloudKnowledgeGraphTypes: z.array(z.string()).describe(
      "Specify entity types to support.",
    ).optional(),
    enableCloudKnowledgeGraph: z.boolean().describe(
      "Whether to enable the Cloud Knowledge Graph for the engine. Defaults to false if not specified.",
    ).optional(),
    enablePrivateKnowledgeGraph: z.boolean().describe(
      "Whether to enable the Private Knowledge Graph for the engine. Defaults to false if not specified.",
    ).optional(),
    featureConfig: z.object({
      disablePrivateKgAutoComplete: z.boolean().describe(
        "Whether to disable the private KG auto complete for the engine. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgEnrichment: z.boolean().describe(
        "Whether to disable the private KG enrichment for the engine. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgQueryUiChips: z.boolean().describe(
        "Whether to disable the private KG for query UI chips. Defaults to false if not specified.",
      ).optional(),
      disablePrivateKgQueryUnderstanding: z.boolean().describe(
        "Whether to disable the private KG query understanding for the engine. Defaults to false if not specified.",
      ).optional(),
    }).describe("Feature config for the Knowledge Graph.").optional(),
    privateKnowledgeGraphTypes: z.array(z.string()).describe(
      "Specify entity types to support.",
    ).optional(),
  }).describe("Configuration message for the Knowledge Graph.").optional(),
  marketplaceAgentVisibility: z.enum([
    "MARKETPLACE_AGENT_VISIBILITY_UNSPECIFIED",
    "SHOW_AVAILABLE_AGENTS_ONLY",
    "SHOW_AGENTS_ALREADY_INTEGRATED",
    "SHOW_AGENTS_ALREADY_PURCHASED",
    "SHOW_ALL_AGENTS",
  ]).describe(
    "Optional. The visibility of marketplace agents in the agent gallery.",
  ).optional(),
  mediaRecommendationEngineConfig: z.object({
    engineFeaturesConfig: z.object({
      mostPopularConfig: z.object({
        timeWindowDays: z.string().describe(
          "The time window of which the engine is queried at training and prediction time. Positive integers only. The value translates to the last X days of events. Currently required for the `most-popular-items` engine.",
        ).optional(),
      }).describe(
        "Feature configurations that are required for creating a Most Popular engine.",
      ).optional(),
      recommendedForYouConfig: z.object({
        contextEventType: z.string().describe(
          "The type of event with which the engine is queried at prediction time. If set to `generic`, only `view-item`, `media-play`,and `media-complete` will be used as `context-event` in engine training. If set to `view-home-page`, `view-home-page` will also be used as `context-events` in addition to `view-item`, `media-play`, and `media-complete`. Currently supported for the `recommended-for-you` engine. Currently supported values: `view-home-page`, `generic`.",
        ).optional(),
      }).describe(
        "Additional feature configurations for creating a `recommended-for-you` engine.",
      ).optional(),
    }).describe("More feature configs of the selected engine type.").optional(),
    optimizationObjective: z.string().describe(
      "The optimization objective. e.g., `cvr`. This field together with optimization_objective describe engine metadata to use to control engine training and serving. Currently supported values: `ctr`, `cvr`. If not specified, we choose default based on engine type. Default depends on type of recommendation: `recommended-for-you` => `ctr` `others-you-may-like` => `ctr`",
    ).optional(),
    optimizationObjectiveConfig: z.object({
      targetField: z.string().describe(
        "Required. The name of the field to target. Currently supported values: `watch-percentage`, `watch-time`.",
      ).optional(),
      targetFieldValueFloat: z.number().describe(
        "Required. The threshold to be applied to the target (e.g., 0.5).",
      ).optional(),
    }).describe("Custom threshold for `cvr` optimization_objective.")
      .optional(),
    trainingState: z.enum(["TRAINING_STATE_UNSPECIFIED", "PAUSED", "TRAINING"])
      .describe(
        "The training state that the engine is in (e.g. `TRAINING` or `PAUSED`). Since part of the cost of running the service is frequency of training - this can be used to determine when to train engine in order to control cost. If not specified: the default value for `CreateEngine` method is `TRAINING`. The default value for `UpdateEngine` method is to keep the state the same as before.",
      ).optional(),
    type: z.string().describe(
      "Required. The type of engine. e.g., `recommended-for-you`. This field together with optimization_objective describe engine metadata to use to control engine training and serving. Currently supported values: `recommended-for-you`, `others-you-may-like`, `more-like-this`, `most-popular-items`.",
    ).optional(),
  }).describe("Additional config specs for a Media Recommendation engine.")
    .optional(),
  modelConfigs: z.record(
    z.string(),
    z.enum(["MODEL_STATE_UNSPECIFIED", "MODEL_ENABLED", "MODEL_DISABLED"]),
  ).describe(
    "Optional. Maps a model name to its specific configuration for this engine. This allows admin users to turn on/off individual models. This only stores models whose states are overridden by the admin. When the state is unspecified, or model_configs is empty for this model, the system will decide if this model should be available or not based on the default configuration. For example, a preview model should be disabled by default if the admin has not chosen to enable it.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The fully qualified resource name of the engine. This field must be a UTF-8 encoded string with a length limit of 1024 characters. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` engine should be 1-63 characters, and valid characters are /a-z0-9*/. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean().describe(
      "Optional. Enables observability. If `false`, all other flags are ignored.",
    ).optional(),
    sensitiveLoggingEnabled: z.boolean().describe(
      "Optional. Enables sensitive logging. Sensitive logging includes customer core content (e.g. prompts, responses). If `false`, will sanitize all sensitive fields.",
    ).optional(),
  }).describe("Observability config for a resource.").optional(),
  procurementContactEmails: z.array(z.string()).describe(
    "Optional. The emails of the procurement contacts.",
  ).optional(),
  searchEngineConfig: z.object({
    requiredSubscriptionTier: z.enum([
      "SUBSCRIPTION_TIER_UNSPECIFIED",
      "SUBSCRIPTION_TIER_SEARCH",
      "SUBSCRIPTION_TIER_SEARCH_AND_ASSISTANT",
      "SUBSCRIPTION_TIER_NOTEBOOK_LM",
      "SUBSCRIPTION_TIER_FRONTLINE_WORKER",
      "SUBSCRIPTION_TIER_AGENTSPACE_STARTER",
      "SUBSCRIPTION_TIER_AGENTSPACE_BUSINESS",
      "SUBSCRIPTION_TIER_ENTERPRISE",
      "SUBSCRIPTION_TIER_ENTERPRISE_EMERGING",
      "SUBSCRIPTION_TIER_EDU",
      "SUBSCRIPTION_TIER_EDU_PRO",
      "SUBSCRIPTION_TIER_EDU_EMERGING",
      "SUBSCRIPTION_TIER_EDU_PRO_EMERGING",
      "SUBSCRIPTION_TIER_FRONTLINE_STARTER",
    ]).describe(
      "Optional. The required subscription tier of this engine. They cannot be modified after engine creation. If the required subscription tier is search, user with higher license tier like assist can still access the standalone app associated with this engine.",
    ).optional(),
    searchAddOns: z.array(
      z.enum(["SEARCH_ADD_ON_UNSPECIFIED", "SEARCH_ADD_ON_LLM"]),
    ).describe("The add-on that this search engine enables.").optional(),
    searchTier: z.enum([
      "SEARCH_TIER_UNSPECIFIED",
      "SEARCH_TIER_STANDARD",
      "SEARCH_TIER_ENTERPRISE",
    ]).describe(
      "The search feature tier of this engine. Different tiers might have different pricing. To learn more, check the pricing documentation. Defaults to SearchTier.SEARCH_TIER_STANDARD if not specified.",
    ).optional(),
  }).describe("Configurations for a Search Engine.").optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe("Required. The solutions of the engine.").optional(),
  engineId: z.string().describe(
    "Required. The ID to use for the Engine, which will become the final component of the Engine's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine Collections.Engines. Registered at `@swamp/gcp/discoveryengine/collections-engines`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/collections-engines",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.14.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Metadata that describes the training and serving parameters of an Engine.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a engines",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentGatewaySetting"] !== undefined) {
          body["agentGatewaySetting"] = g["agentGatewaySetting"];
        }
        if (g["appType"] !== undefined) body["appType"] = g["appType"];
        if (g["chatEngineConfig"] !== undefined) {
          body["chatEngineConfig"] = g["chatEngineConfig"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["commonConfig"] !== undefined) {
          body["commonConfig"] = g["commonConfig"];
        }
        if (g["configurableBillingApproach"] !== undefined) {
          body["configurableBillingApproach"] =
            g["configurableBillingApproach"];
        }
        if (g["connectorTenantInfo"] !== undefined) {
          body["connectorTenantInfo"] = g["connectorTenantInfo"];
        }
        if (g["dataStoreIds"] !== undefined) {
          body["dataStoreIds"] = g["dataStoreIds"];
        }
        if (g["disableAnalytics"] !== undefined) {
          body["disableAnalytics"] = g["disableAnalytics"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["knowledgeGraphConfig"] !== undefined) {
          body["knowledgeGraphConfig"] = g["knowledgeGraphConfig"];
        }
        if (g["marketplaceAgentVisibility"] !== undefined) {
          body["marketplaceAgentVisibility"] = g["marketplaceAgentVisibility"];
        }
        if (g["mediaRecommendationEngineConfig"] !== undefined) {
          body["mediaRecommendationEngineConfig"] =
            g["mediaRecommendationEngineConfig"];
        }
        if (g["modelConfigs"] !== undefined) {
          body["modelConfigs"] = g["modelConfigs"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["procurementContactEmails"] !== undefined) {
          body["procurementContactEmails"] = g["procurementContactEmails"];
        }
        if (g["searchEngineConfig"] !== undefined) {
          body["searchEngineConfig"] = g["searchEngineConfig"];
        }
        if (g["solutionType"] !== undefined) {
          body["solutionType"] = g["solutionType"];
        }
        if (g["engineId"] !== undefined) body["engineId"] = g["engineId"];
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
      description: "Get a engines",
      arguments: z.object({
        identifier: z.string().describe("The name of the engines"),
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
      description: "Update engines attributes",
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
        if (g["agentGatewaySetting"] !== undefined) {
          body["agentGatewaySetting"] = g["agentGatewaySetting"];
        }
        if (g["chatEngineConfig"] !== undefined) {
          body["chatEngineConfig"] = g["chatEngineConfig"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["commonConfig"] !== undefined) {
          body["commonConfig"] = g["commonConfig"];
        }
        if (g["configurableBillingApproach"] !== undefined) {
          body["configurableBillingApproach"] =
            g["configurableBillingApproach"];
        }
        if (g["connectorTenantInfo"] !== undefined) {
          body["connectorTenantInfo"] = g["connectorTenantInfo"];
        }
        if (g["dataStoreIds"] !== undefined) {
          body["dataStoreIds"] = g["dataStoreIds"];
        }
        if (g["disableAnalytics"] !== undefined) {
          body["disableAnalytics"] = g["disableAnalytics"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["knowledgeGraphConfig"] !== undefined) {
          body["knowledgeGraphConfig"] = g["knowledgeGraphConfig"];
        }
        if (g["marketplaceAgentVisibility"] !== undefined) {
          body["marketplaceAgentVisibility"] = g["marketplaceAgentVisibility"];
        }
        if (g["mediaRecommendationEngineConfig"] !== undefined) {
          body["mediaRecommendationEngineConfig"] =
            g["mediaRecommendationEngineConfig"];
        }
        if (g["modelConfigs"] !== undefined) {
          body["modelConfigs"] = g["modelConfigs"];
        }
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["procurementContactEmails"] !== undefined) {
          body["procurementContactEmails"] = g["procurementContactEmails"];
        }
        if (g["searchEngineConfig"] !== undefined) {
          body["searchEngineConfig"] = g["searchEngineConfig"];
        }
        if (g["solutionType"] !== undefined) {
          body["solutionType"] = g["solutionType"];
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
      description: "Delete the engines",
      arguments: z.object({
        identifier: z.string().describe("The name of the engines"),
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
      description: "Sync engines state from GCP",
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
    list: {
      description: "List engines resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter by solution type. For example: solution_type=SOLUTION_TYPE_SEARCH",
        ).optional(),
        pageSize: z.number().describe("Optional. Not supported.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
          "engines",
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
            "id":
              "discoveryengine.projects.locations.collections.engines.getIamPolicy",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.collections.engines.setIamPolicy",
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
  },
};
