// Auto-generated extension model for @swamp/gcp/dialogflow/conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Conversations.
 *
 * GCP dialogflow Conversations resource
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.conversations.get",
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
  "id": "dialogflow.projects.conversations.create",
  "path": "v2/{+parent}/conversations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "conversationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dialogflow.projects.conversations.list",
  "path": "v2/{+parent}/conversations",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  conversationProfile: z.string().optional(),
  conversationStage: z.enum([
    "CONVERSATION_STAGE_UNSPECIFIED",
    "VIRTUAL_AGENT_STAGE",
    "HUMAN_ASSIST_STAGE",
  ]).optional(),
  endTime: z.string().optional(),
  ingestedContextReferences: z.record(
    z.string(),
    z.object({
      contextContents: z.array(z.object({
        answerRecord: z.string().optional(),
        content: z.string().optional(),
        contentFormat: z.enum([
          "CONTENT_FORMAT_UNSPECIFIED",
          "JSON",
          "PLAIN_TEXT",
        ]).optional(),
        ingestionTime: z.string().optional(),
      })).optional(),
      createTime: z.string().optional(),
      languageCode: z.string().optional(),
      updateMode: z.enum(["UPDATE_MODE_UNSPECIFIED", "APPEND", "OVERWRITE"])
        .optional(),
    }),
  ).optional(),
  initialConversationProfile: z.object({
    automatedAgentConfig: z.object({
      agent: z.string().optional(),
      sessionTtl: z.string().optional(),
    }).optional(),
    createTime: z.string().optional(),
    displayName: z.string().optional(),
    humanAgentAssistantConfig: z.object({
      endUserSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean().optional(),
        enableAsyncToolCall: z.boolean().optional(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown().optional(),
          conversationProcessConfig: z.unknown().optional(),
          disableAgentQueryLogging: z.unknown().optional(),
          disableQuerySearchContext: z.unknown().optional(),
          enableConversationAugmentedQuery: z.unknown().optional(),
          enableEventBasedSuggestion: z.unknown().optional(),
          enableQuerySuggestionOnly: z.unknown().optional(),
          enableQuerySuggestionWhenNoAnswer: z.unknown().optional(),
          enableResponseDebugInfo: z.unknown().optional(),
          queryConfig: z.unknown().optional(),
          raiSettings: z.unknown().optional(),
          suggestionFeature: z.unknown().optional(),
          suggestionTriggerEvent: z.unknown().optional(),
          suggestionTriggerSettings: z.unknown().optional(),
        })).optional(),
        generators: z.array(z.string()).optional(),
        groupSuggestionResponses: z.boolean().optional(),
        skipEmptyEventBasedSuggestion: z.boolean().optional(),
        useUnredactedConversationData: z.boolean().optional(),
      }).optional(),
      humanAgentSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean().optional(),
        enableAsyncToolCall: z.boolean().optional(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown().optional(),
          conversationProcessConfig: z.unknown().optional(),
          disableAgentQueryLogging: z.unknown().optional(),
          disableQuerySearchContext: z.unknown().optional(),
          enableConversationAugmentedQuery: z.unknown().optional(),
          enableEventBasedSuggestion: z.unknown().optional(),
          enableQuerySuggestionOnly: z.unknown().optional(),
          enableQuerySuggestionWhenNoAnswer: z.unknown().optional(),
          enableResponseDebugInfo: z.unknown().optional(),
          queryConfig: z.unknown().optional(),
          raiSettings: z.unknown().optional(),
          suggestionFeature: z.unknown().optional(),
          suggestionTriggerEvent: z.unknown().optional(),
          suggestionTriggerSettings: z.unknown().optional(),
        })).optional(),
        generators: z.array(z.string()).optional(),
        groupSuggestionResponses: z.boolean().optional(),
        skipEmptyEventBasedSuggestion: z.boolean().optional(),
        useUnredactedConversationData: z.boolean().optional(),
      }).optional(),
      messageAnalysisConfig: z.object({
        enableEntityExtraction: z.boolean().optional(),
        enableSentimentAnalysis: z.boolean().optional(),
        enableSentimentAnalysisV3: z.boolean().optional(),
      }).optional(),
      notificationConfig: z.object({
        messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
          .optional(),
        topic: z.string().optional(),
      }).optional(),
    }).optional(),
    humanAgentHandoffConfig: z.object({
      livePersonConfig: z.object({
        accountNumber: z.string().optional(),
      }).optional(),
      salesforceLiveAgentConfig: z.object({
        buttonId: z.string().optional(),
        deploymentId: z.string().optional(),
        endpointDomain: z.string().optional(),
        organizationId: z.string().optional(),
      }).optional(),
    }).optional(),
    languageCode: z.string().optional(),
    loggingConfig: z.object({
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    name: z.string().optional(),
    newMessageEventNotificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    newRecognitionResultNotificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    notificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    securitySettings: z.string().optional(),
    sipConfig: z.object({
      allowVirtualAgentInteraction: z.boolean().optional(),
      copyInboundCallLegHeaders: z.array(z.string()).optional(),
      createConversationOnTheFly: z.boolean().optional(),
      ignoreReinviteMediaDirection: z.boolean().optional(),
      inactiveStart: z.boolean().optional(),
      keepConversationRunning: z.boolean().optional(),
      maxAudioRecordingDuration: z.string().optional(),
    }).optional(),
    sttConfig: z.object({
      audioEncoding: z.enum([
        "AUDIO_ENCODING_UNSPECIFIED",
        "AUDIO_ENCODING_LINEAR_16",
        "AUDIO_ENCODING_FLAC",
        "AUDIO_ENCODING_MULAW",
        "AUDIO_ENCODING_AMR",
        "AUDIO_ENCODING_AMR_WB",
        "AUDIO_ENCODING_OGG_OPUS",
        "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
        "AUDIO_ENCODING_ALAW",
      ]).optional(),
      enableWordInfo: z.boolean().optional(),
      languageCode: z.string().optional(),
      model: z.string().optional(),
      phraseSets: z.array(z.string()).optional(),
      sampleRateHertz: z.number().int().optional(),
      speechModelVariant: z.enum([
        "SPEECH_MODEL_VARIANT_UNSPECIFIED",
        "USE_BEST_AVAILABLE",
        "USE_STANDARD",
        "USE_ENHANCED",
      ]).optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
    timeZone: z.string().optional(),
    ttsConfig: z.object({
      effectsProfileId: z.array(z.string()).optional(),
      pitch: z.number().optional(),
      pronunciations: z.array(z.object({
        phoneticEncoding: z.enum([
          "PHONETIC_ENCODING_UNSPECIFIED",
          "PHONETIC_ENCODING_IPA",
          "PHONETIC_ENCODING_X_SAMPA",
        ]).optional(),
        phrase: z.string().optional(),
        pronunciation: z.string().optional(),
      })).optional(),
      speakingRate: z.number().optional(),
      voice: z.object({
        name: z.string().optional(),
        ssmlGender: z.enum([
          "SSML_VOICE_GENDER_UNSPECIFIED",
          "SSML_VOICE_GENDER_MALE",
          "SSML_VOICE_GENDER_FEMALE",
          "SSML_VOICE_GENDER_NEUTRAL",
        ]).optional(),
      }).optional(),
      volumeGainDb: z.number().optional(),
    }).optional(),
    updateTime: z.string().optional(),
  }).optional(),
  initialGeneratorContexts: z.record(
    z.string(),
    z.object({
      generatorType: z.enum([
        "GENERATOR_TYPE_UNSPECIFIED",
        "FREE_FORM",
        "AGENT_COACHING",
        "SUMMARIZATION",
        "TRANSLATION",
        "AGENT_FEEDBACK",
        "CUSTOMER_MESSAGE_GENERATION",
      ]).optional(),
    }),
  ).optional(),
  lifecycleState: z.enum([
    "LIFECYCLE_STATE_UNSPECIFIED",
    "IN_PROGRESS",
    "COMPLETED",
  ]).optional(),
  name: z.string().optional(),
  phoneNumber: z.object({
    countryCode: z.number().int().optional(),
    phoneNumber: z.string().optional(),
  }).optional(),
  startTime: z.string().optional(),
  telephonyConnectionInfo: z.object({
    dialedNumber: z.string().optional(),
    extraMimeContents: z.array(z.object({
      content: z.string().optional(),
      mimeType: z.string().optional(),
    })).optional(),
    sdp: z.string().optional(),
    sipHeaders: z.array(z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
  }).optional(),
  conversationId: z.string().describe("The conversationId for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  conversationProfile: z.string().optional(),
  conversationStage: z.string().optional(),
  endTime: z.string().optional(),
  ingestedContextReferences: z.record(z.string(), z.unknown()).optional(),
  initialConversationProfile: z.object({
    automatedAgentConfig: z.object({
      agent: z.string(),
      sessionTtl: z.string(),
    }),
    createTime: z.string(),
    displayName: z.string(),
    humanAgentAssistantConfig: z.object({
      endUserSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean(),
        enableAsyncToolCall: z.boolean(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown(),
          conversationProcessConfig: z.unknown(),
          disableAgentQueryLogging: z.unknown(),
          disableQuerySearchContext: z.unknown(),
          enableConversationAugmentedQuery: z.unknown(),
          enableEventBasedSuggestion: z.unknown(),
          enableQuerySuggestionOnly: z.unknown(),
          enableQuerySuggestionWhenNoAnswer: z.unknown(),
          enableResponseDebugInfo: z.unknown(),
          queryConfig: z.unknown(),
          raiSettings: z.unknown(),
          suggestionFeature: z.unknown(),
          suggestionTriggerEvent: z.unknown(),
          suggestionTriggerSettings: z.unknown(),
        })),
        generators: z.array(z.string()),
        groupSuggestionResponses: z.boolean(),
        skipEmptyEventBasedSuggestion: z.boolean(),
        useUnredactedConversationData: z.boolean(),
      }),
      humanAgentSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean(),
        enableAsyncToolCall: z.boolean(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown(),
          conversationProcessConfig: z.unknown(),
          disableAgentQueryLogging: z.unknown(),
          disableQuerySearchContext: z.unknown(),
          enableConversationAugmentedQuery: z.unknown(),
          enableEventBasedSuggestion: z.unknown(),
          enableQuerySuggestionOnly: z.unknown(),
          enableQuerySuggestionWhenNoAnswer: z.unknown(),
          enableResponseDebugInfo: z.unknown(),
          queryConfig: z.unknown(),
          raiSettings: z.unknown(),
          suggestionFeature: z.unknown(),
          suggestionTriggerEvent: z.unknown(),
          suggestionTriggerSettings: z.unknown(),
        })),
        generators: z.array(z.string()),
        groupSuggestionResponses: z.boolean(),
        skipEmptyEventBasedSuggestion: z.boolean(),
        useUnredactedConversationData: z.boolean(),
      }),
      messageAnalysisConfig: z.object({
        enableEntityExtraction: z.boolean(),
        enableSentimentAnalysis: z.boolean(),
        enableSentimentAnalysisV3: z.boolean(),
      }),
      notificationConfig: z.object({
        messageFormat: z.string(),
        topic: z.string(),
      }),
    }),
    humanAgentHandoffConfig: z.object({
      livePersonConfig: z.object({
        accountNumber: z.string(),
      }),
      salesforceLiveAgentConfig: z.object({
        buttonId: z.string(),
        deploymentId: z.string(),
        endpointDomain: z.string(),
        organizationId: z.string(),
      }),
    }),
    languageCode: z.string(),
    loggingConfig: z.object({
      enableStackdriverLogging: z.boolean(),
    }),
    name: z.string(),
    newMessageEventNotificationConfig: z.object({
      messageFormat: z.string(),
      topic: z.string(),
    }),
    newRecognitionResultNotificationConfig: z.object({
      messageFormat: z.string(),
      topic: z.string(),
    }),
    notificationConfig: z.object({
      messageFormat: z.string(),
      topic: z.string(),
    }),
    securitySettings: z.string(),
    sipConfig: z.object({
      allowVirtualAgentInteraction: z.boolean(),
      copyInboundCallLegHeaders: z.array(z.string()),
      createConversationOnTheFly: z.boolean(),
      ignoreReinviteMediaDirection: z.boolean(),
      inactiveStart: z.boolean(),
      keepConversationRunning: z.boolean(),
      maxAudioRecordingDuration: z.string(),
    }),
    sttConfig: z.object({
      audioEncoding: z.string(),
      enableWordInfo: z.boolean(),
      languageCode: z.string(),
      model: z.string(),
      phraseSets: z.array(z.string()),
      sampleRateHertz: z.number(),
      speechModelVariant: z.string(),
      useTimeoutBasedEndpointing: z.boolean(),
    }),
    timeZone: z.string(),
    ttsConfig: z.object({
      effectsProfileId: z.array(z.string()),
      pitch: z.number(),
      pronunciations: z.array(z.object({
        phoneticEncoding: z.string(),
        phrase: z.string(),
        pronunciation: z.string(),
      })),
      speakingRate: z.number(),
      voice: z.object({
        name: z.string(),
        ssmlGender: z.string(),
      }),
      volumeGainDb: z.number(),
    }),
    updateTime: z.string(),
  }).optional(),
  initialGeneratorContexts: z.record(z.string(), z.unknown()).optional(),
  lifecycleState: z.string().optional(),
  name: z.string(),
  phoneNumber: z.object({
    countryCode: z.number(),
    phoneNumber: z.string(),
  }).optional(),
  startTime: z.string().optional(),
  telephonyConnectionInfo: z.object({
    dialedNumber: z.string(),
    extraMimeContents: z.array(z.object({
      content: z.string(),
      mimeType: z.string(),
    })),
    sdp: z.string(),
    sipHeaders: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  conversationProfile: z.string().optional(),
  conversationStage: z.enum([
    "CONVERSATION_STAGE_UNSPECIFIED",
    "VIRTUAL_AGENT_STAGE",
    "HUMAN_ASSIST_STAGE",
  ]).optional(),
  endTime: z.string().optional(),
  ingestedContextReferences: z.record(
    z.string(),
    z.object({
      contextContents: z.array(z.object({
        answerRecord: z.string().optional(),
        content: z.string().optional(),
        contentFormat: z.enum([
          "CONTENT_FORMAT_UNSPECIFIED",
          "JSON",
          "PLAIN_TEXT",
        ]).optional(),
        ingestionTime: z.string().optional(),
      })).optional(),
      createTime: z.string().optional(),
      languageCode: z.string().optional(),
      updateMode: z.enum(["UPDATE_MODE_UNSPECIFIED", "APPEND", "OVERWRITE"])
        .optional(),
    }),
  ).optional(),
  initialConversationProfile: z.object({
    automatedAgentConfig: z.object({
      agent: z.string().optional(),
      sessionTtl: z.string().optional(),
    }).optional(),
    createTime: z.string().optional(),
    displayName: z.string().optional(),
    humanAgentAssistantConfig: z.object({
      endUserSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean().optional(),
        enableAsyncToolCall: z.boolean().optional(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown().optional(),
          conversationProcessConfig: z.unknown().optional(),
          disableAgentQueryLogging: z.unknown().optional(),
          disableQuerySearchContext: z.unknown().optional(),
          enableConversationAugmentedQuery: z.unknown().optional(),
          enableEventBasedSuggestion: z.unknown().optional(),
          enableQuerySuggestionOnly: z.unknown().optional(),
          enableQuerySuggestionWhenNoAnswer: z.unknown().optional(),
          enableResponseDebugInfo: z.unknown().optional(),
          queryConfig: z.unknown().optional(),
          raiSettings: z.unknown().optional(),
          suggestionFeature: z.unknown().optional(),
          suggestionTriggerEvent: z.unknown().optional(),
          suggestionTriggerSettings: z.unknown().optional(),
        })).optional(),
        generators: z.array(z.string()).optional(),
        groupSuggestionResponses: z.boolean().optional(),
        skipEmptyEventBasedSuggestion: z.boolean().optional(),
        useUnredactedConversationData: z.boolean().optional(),
      }).optional(),
      humanAgentSuggestionConfig: z.object({
        disableHighLatencyFeaturesSyncDelivery: z.boolean().optional(),
        enableAsyncToolCall: z.boolean().optional(),
        featureConfigs: z.array(z.object({
          conversationModelConfig: z.unknown().optional(),
          conversationProcessConfig: z.unknown().optional(),
          disableAgentQueryLogging: z.unknown().optional(),
          disableQuerySearchContext: z.unknown().optional(),
          enableConversationAugmentedQuery: z.unknown().optional(),
          enableEventBasedSuggestion: z.unknown().optional(),
          enableQuerySuggestionOnly: z.unknown().optional(),
          enableQuerySuggestionWhenNoAnswer: z.unknown().optional(),
          enableResponseDebugInfo: z.unknown().optional(),
          queryConfig: z.unknown().optional(),
          raiSettings: z.unknown().optional(),
          suggestionFeature: z.unknown().optional(),
          suggestionTriggerEvent: z.unknown().optional(),
          suggestionTriggerSettings: z.unknown().optional(),
        })).optional(),
        generators: z.array(z.string()).optional(),
        groupSuggestionResponses: z.boolean().optional(),
        skipEmptyEventBasedSuggestion: z.boolean().optional(),
        useUnredactedConversationData: z.boolean().optional(),
      }).optional(),
      messageAnalysisConfig: z.object({
        enableEntityExtraction: z.boolean().optional(),
        enableSentimentAnalysis: z.boolean().optional(),
        enableSentimentAnalysisV3: z.boolean().optional(),
      }).optional(),
      notificationConfig: z.object({
        messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
          .optional(),
        topic: z.string().optional(),
      }).optional(),
    }).optional(),
    humanAgentHandoffConfig: z.object({
      livePersonConfig: z.object({
        accountNumber: z.string().optional(),
      }).optional(),
      salesforceLiveAgentConfig: z.object({
        buttonId: z.string().optional(),
        deploymentId: z.string().optional(),
        endpointDomain: z.string().optional(),
        organizationId: z.string().optional(),
      }).optional(),
    }).optional(),
    languageCode: z.string().optional(),
    loggingConfig: z.object({
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    name: z.string().optional(),
    newMessageEventNotificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    newRecognitionResultNotificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    notificationConfig: z.object({
      messageFormat: z.enum(["MESSAGE_FORMAT_UNSPECIFIED", "PROTO", "JSON"])
        .optional(),
      topic: z.string().optional(),
    }).optional(),
    securitySettings: z.string().optional(),
    sipConfig: z.object({
      allowVirtualAgentInteraction: z.boolean().optional(),
      copyInboundCallLegHeaders: z.array(z.string()).optional(),
      createConversationOnTheFly: z.boolean().optional(),
      ignoreReinviteMediaDirection: z.boolean().optional(),
      inactiveStart: z.boolean().optional(),
      keepConversationRunning: z.boolean().optional(),
      maxAudioRecordingDuration: z.string().optional(),
    }).optional(),
    sttConfig: z.object({
      audioEncoding: z.enum([
        "AUDIO_ENCODING_UNSPECIFIED",
        "AUDIO_ENCODING_LINEAR_16",
        "AUDIO_ENCODING_FLAC",
        "AUDIO_ENCODING_MULAW",
        "AUDIO_ENCODING_AMR",
        "AUDIO_ENCODING_AMR_WB",
        "AUDIO_ENCODING_OGG_OPUS",
        "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
        "AUDIO_ENCODING_ALAW",
      ]).optional(),
      enableWordInfo: z.boolean().optional(),
      languageCode: z.string().optional(),
      model: z.string().optional(),
      phraseSets: z.array(z.string()).optional(),
      sampleRateHertz: z.number().int().optional(),
      speechModelVariant: z.enum([
        "SPEECH_MODEL_VARIANT_UNSPECIFIED",
        "USE_BEST_AVAILABLE",
        "USE_STANDARD",
        "USE_ENHANCED",
      ]).optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
    timeZone: z.string().optional(),
    ttsConfig: z.object({
      effectsProfileId: z.array(z.string()).optional(),
      pitch: z.number().optional(),
      pronunciations: z.array(z.object({
        phoneticEncoding: z.enum([
          "PHONETIC_ENCODING_UNSPECIFIED",
          "PHONETIC_ENCODING_IPA",
          "PHONETIC_ENCODING_X_SAMPA",
        ]).optional(),
        phrase: z.string().optional(),
        pronunciation: z.string().optional(),
      })).optional(),
      speakingRate: z.number().optional(),
      voice: z.object({
        name: z.string().optional(),
        ssmlGender: z.enum([
          "SSML_VOICE_GENDER_UNSPECIFIED",
          "SSML_VOICE_GENDER_MALE",
          "SSML_VOICE_GENDER_FEMALE",
          "SSML_VOICE_GENDER_NEUTRAL",
        ]).optional(),
      }).optional(),
      volumeGainDb: z.number().optional(),
    }).optional(),
    updateTime: z.string().optional(),
  }).optional(),
  initialGeneratorContexts: z.record(
    z.string(),
    z.object({
      generatorType: z.enum([
        "GENERATOR_TYPE_UNSPECIFIED",
        "FREE_FORM",
        "AGENT_COACHING",
        "SUMMARIZATION",
        "TRANSLATION",
        "AGENT_FEEDBACK",
        "CUSTOMER_MESSAGE_GENERATION",
      ]).optional(),
    }),
  ).optional(),
  lifecycleState: z.enum([
    "LIFECYCLE_STATE_UNSPECIFIED",
    "IN_PROGRESS",
    "COMPLETED",
  ]).optional(),
  name: z.string().optional(),
  phoneNumber: z.object({
    countryCode: z.number().int().optional(),
    phoneNumber: z.string().optional(),
  }).optional(),
  startTime: z.string().optional(),
  telephonyConnectionInfo: z.object({
    dialedNumber: z.string().optional(),
    extraMimeContents: z.array(z.object({
      content: z.string().optional(),
      mimeType: z.string().optional(),
    })).optional(),
    sdp: z.string().optional(),
    sipHeaders: z.array(z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
  }).optional(),
  conversationId: z.string().describe("The conversationId for this resource")
    .optional(),
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

/** Swamp extension model for Google Cloud Dialogflow Conversations. Registered at `@swamp/gcp/dialogflow/conversations`. */
export const model = {
  type: "@swamp/gcp/dialogflow/conversations",
  version: "2026.06.07.1",
  upgrades: [
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
      description: "GCP dialogflow Conversations resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversations",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["conversationProfile"] !== undefined) {
          body["conversationProfile"] = g["conversationProfile"];
        }
        if (g["conversationStage"] !== undefined) {
          body["conversationStage"] = g["conversationStage"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["ingestedContextReferences"] !== undefined) {
          body["ingestedContextReferences"] = g["ingestedContextReferences"];
        }
        if (g["initialConversationProfile"] !== undefined) {
          body["initialConversationProfile"] = g["initialConversationProfile"];
        }
        if (g["initialGeneratorContexts"] !== undefined) {
          body["initialGeneratorContexts"] = g["initialGeneratorContexts"];
        }
        if (g["lifecycleState"] !== undefined) {
          body["lifecycleState"] = g["lifecycleState"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["telephonyConnectionInfo"] !== undefined) {
          body["telephonyConnectionInfo"] = g["telephonyConnectionInfo"];
        }
        if (g["conversationId"] !== undefined) {
          body["conversationId"] = g["conversationId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "lifecycleState",
              "readyValues": ["COMPLETED"],
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
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
    sync: {
      description: "Sync conversations state from GCP",
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
      description: "List conversations resources",
      arguments: z.object({
        filter: z.string().optional(),
        pageSize: z.number().optional(),
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
          "conversations",
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
    complete: {
      description: "complete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "dialogflow.projects.conversations.complete",
            "path": "v2/{+name}:complete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
