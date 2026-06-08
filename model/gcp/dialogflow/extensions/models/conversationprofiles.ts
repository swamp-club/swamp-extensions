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

// Auto-generated extension model for @swamp/gcp/dialogflow/conversationprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow ConversationProfiles.
 *
 * GCP dialogflow ConversationProfiles resource
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
  return `${parent}/conversationProfiles/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.conversationProfiles.get",
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
  "id": "dialogflow.projects.conversationProfiles.create",
  "path": "v2/{+parent}/conversationProfiles",
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
  "id": "dialogflow.projects.conversationProfiles.patch",
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
  "id": "dialogflow.projects.conversationProfiles.delete",
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
  "id": "dialogflow.projects.conversationProfiles.list",
  "path": "v2/{+parent}/conversationProfiles",
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
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown().optional(),
          model: z.unknown().optional(),
        }).optional(),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown().optional(),
        }).optional(),
        disableAgentQueryLogging: z.boolean().optional(),
        disableQuerySearchContext: z.boolean().optional(),
        enableConversationAugmentedQuery: z.boolean().optional(),
        enableEventBasedSuggestion: z.boolean().optional(),
        enableQuerySuggestionOnly: z.boolean().optional(),
        enableQuerySuggestionWhenNoAnswer: z.boolean().optional(),
        enableResponseDebugInfo: z.boolean().optional(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown().optional(),
          contextFilterSettings: z.unknown().optional(),
          contextSize: z.unknown().optional(),
          dialogflowQuerySource: z.unknown().optional(),
          documentQuerySource: z.unknown().optional(),
          knowledgeBaseQuerySource: z.unknown().optional(),
          maxResults: z.unknown().optional(),
          sections: z.unknown().optional(),
        }).optional(),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown().optional(),
        }).optional(),
        suggestionFeature: z.object({
          type: z.unknown().optional(),
        }).optional(),
        suggestionTriggerEvent: z.enum([
          "TRIGGER_EVENT_UNSPECIFIED",
          "END_OF_UTTERANCE",
          "MANUAL_CALL",
          "CUSTOMER_MESSAGE",
          "AGENT_MESSAGE",
        ]).optional(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown().optional(),
          onlyEndUser: z.unknown().optional(),
        }).optional(),
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
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown().optional(),
          model: z.unknown().optional(),
        }).optional(),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown().optional(),
        }).optional(),
        disableAgentQueryLogging: z.boolean().optional(),
        disableQuerySearchContext: z.boolean().optional(),
        enableConversationAugmentedQuery: z.boolean().optional(),
        enableEventBasedSuggestion: z.boolean().optional(),
        enableQuerySuggestionOnly: z.boolean().optional(),
        enableQuerySuggestionWhenNoAnswer: z.boolean().optional(),
        enableResponseDebugInfo: z.boolean().optional(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown().optional(),
          contextFilterSettings: z.unknown().optional(),
          contextSize: z.unknown().optional(),
          dialogflowQuerySource: z.unknown().optional(),
          documentQuerySource: z.unknown().optional(),
          knowledgeBaseQuerySource: z.unknown().optional(),
          maxResults: z.unknown().optional(),
          sections: z.unknown().optional(),
        }).optional(),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown().optional(),
        }).optional(),
        suggestionFeature: z.object({
          type: z.unknown().optional(),
        }).optional(),
        suggestionTriggerEvent: z.enum([
          "TRIGGER_EVENT_UNSPECIFIED",
          "END_OF_UTTERANCE",
          "MANUAL_CALL",
          "CUSTOMER_MESSAGE",
          "AGENT_MESSAGE",
        ]).optional(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown().optional(),
          onlyEndUser: z.unknown().optional(),
        }).optional(),
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  automatedAgentConfig: z.object({
    agent: z.string(),
    sessionTtl: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  humanAgentAssistantConfig: z.object({
    endUserSuggestionConfig: z.object({
      disableHighLatencyFeaturesSyncDelivery: z.boolean(),
      enableAsyncToolCall: z.boolean(),
      featureConfigs: z.array(z.object({
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown(),
          model: z.unknown(),
        }),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown(),
        }),
        disableAgentQueryLogging: z.boolean(),
        disableQuerySearchContext: z.boolean(),
        enableConversationAugmentedQuery: z.boolean(),
        enableEventBasedSuggestion: z.boolean(),
        enableQuerySuggestionOnly: z.boolean(),
        enableQuerySuggestionWhenNoAnswer: z.boolean(),
        enableResponseDebugInfo: z.boolean(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown(),
          contextFilterSettings: z.unknown(),
          contextSize: z.unknown(),
          dialogflowQuerySource: z.unknown(),
          documentQuerySource: z.unknown(),
          knowledgeBaseQuerySource: z.unknown(),
          maxResults: z.unknown(),
          sections: z.unknown(),
        }),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown(),
        }),
        suggestionFeature: z.object({
          type: z.unknown(),
        }),
        suggestionTriggerEvent: z.string(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown(),
          onlyEndUser: z.unknown(),
        }),
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
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown(),
          model: z.unknown(),
        }),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown(),
        }),
        disableAgentQueryLogging: z.boolean(),
        disableQuerySearchContext: z.boolean(),
        enableConversationAugmentedQuery: z.boolean(),
        enableEventBasedSuggestion: z.boolean(),
        enableQuerySuggestionOnly: z.boolean(),
        enableQuerySuggestionWhenNoAnswer: z.boolean(),
        enableResponseDebugInfo: z.boolean(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown(),
          contextFilterSettings: z.unknown(),
          contextSize: z.unknown(),
          dialogflowQuerySource: z.unknown(),
          documentQuerySource: z.unknown(),
          knowledgeBaseQuerySource: z.unknown(),
          maxResults: z.unknown(),
          sections: z.unknown(),
        }),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown(),
        }),
        suggestionFeature: z.object({
          type: z.unknown(),
        }),
        suggestionTriggerEvent: z.string(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown(),
          onlyEndUser: z.unknown(),
        }),
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
  }).optional(),
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
  }).optional(),
  languageCode: z.string().optional(),
  loggingConfig: z.object({
    enableStackdriverLogging: z.boolean(),
  }).optional(),
  name: z.string(),
  newMessageEventNotificationConfig: z.object({
    messageFormat: z.string(),
    topic: z.string(),
  }).optional(),
  newRecognitionResultNotificationConfig: z.object({
    messageFormat: z.string(),
    topic: z.string(),
  }).optional(),
  notificationConfig: z.object({
    messageFormat: z.string(),
    topic: z.string(),
  }).optional(),
  securitySettings: z.string().optional(),
  sipConfig: z.object({
    allowVirtualAgentInteraction: z.boolean(),
    copyInboundCallLegHeaders: z.array(z.string()),
    createConversationOnTheFly: z.boolean(),
    ignoreReinviteMediaDirection: z.boolean(),
    inactiveStart: z.boolean(),
    keepConversationRunning: z.boolean(),
    maxAudioRecordingDuration: z.string(),
  }).optional(),
  sttConfig: z.object({
    audioEncoding: z.string(),
    enableWordInfo: z.boolean(),
    languageCode: z.string(),
    model: z.string(),
    phraseSets: z.array(z.string()),
    sampleRateHertz: z.number(),
    speechModelVariant: z.string(),
    useTimeoutBasedEndpointing: z.boolean(),
  }).optional(),
  timeZone: z.string().optional(),
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
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown().optional(),
          model: z.unknown().optional(),
        }).optional(),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown().optional(),
        }).optional(),
        disableAgentQueryLogging: z.boolean().optional(),
        disableQuerySearchContext: z.boolean().optional(),
        enableConversationAugmentedQuery: z.boolean().optional(),
        enableEventBasedSuggestion: z.boolean().optional(),
        enableQuerySuggestionOnly: z.boolean().optional(),
        enableQuerySuggestionWhenNoAnswer: z.boolean().optional(),
        enableResponseDebugInfo: z.boolean().optional(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown().optional(),
          contextFilterSettings: z.unknown().optional(),
          contextSize: z.unknown().optional(),
          dialogflowQuerySource: z.unknown().optional(),
          documentQuerySource: z.unknown().optional(),
          knowledgeBaseQuerySource: z.unknown().optional(),
          maxResults: z.unknown().optional(),
          sections: z.unknown().optional(),
        }).optional(),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown().optional(),
        }).optional(),
        suggestionFeature: z.object({
          type: z.unknown().optional(),
        }).optional(),
        suggestionTriggerEvent: z.enum([
          "TRIGGER_EVENT_UNSPECIFIED",
          "END_OF_UTTERANCE",
          "MANUAL_CALL",
          "CUSTOMER_MESSAGE",
          "AGENT_MESSAGE",
        ]).optional(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown().optional(),
          onlyEndUser: z.unknown().optional(),
        }).optional(),
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
        conversationModelConfig: z.object({
          baselineModelVersion: z.unknown().optional(),
          model: z.unknown().optional(),
        }).optional(),
        conversationProcessConfig: z.object({
          recentSentencesCount: z.unknown().optional(),
        }).optional(),
        disableAgentQueryLogging: z.boolean().optional(),
        disableQuerySearchContext: z.boolean().optional(),
        enableConversationAugmentedQuery: z.boolean().optional(),
        enableEventBasedSuggestion: z.boolean().optional(),
        enableQuerySuggestionOnly: z.boolean().optional(),
        enableQuerySuggestionWhenNoAnswer: z.boolean().optional(),
        enableResponseDebugInfo: z.boolean().optional(),
        queryConfig: z.object({
          confidenceThreshold: z.unknown().optional(),
          contextFilterSettings: z.unknown().optional(),
          contextSize: z.unknown().optional(),
          dialogflowQuerySource: z.unknown().optional(),
          documentQuerySource: z.unknown().optional(),
          knowledgeBaseQuerySource: z.unknown().optional(),
          maxResults: z.unknown().optional(),
          sections: z.unknown().optional(),
        }).optional(),
        raiSettings: z.object({
          raiCategoryConfigs: z.unknown().optional(),
        }).optional(),
        suggestionFeature: z.object({
          type: z.unknown().optional(),
        }).optional(),
        suggestionTriggerEvent: z.enum([
          "TRIGGER_EVENT_UNSPECIFIED",
          "END_OF_UTTERANCE",
          "MANUAL_CALL",
          "CUSTOMER_MESSAGE",
          "AGENT_MESSAGE",
        ]).optional(),
        suggestionTriggerSettings: z.object({
          noSmalltalk: z.unknown().optional(),
          onlyEndUser: z.unknown().optional(),
        }).optional(),
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

/** Swamp extension model for Google Cloud Dialogflow ConversationProfiles. Registered at `@swamp/gcp/dialogflow/conversationprofiles`. */
export const model = {
  type: "@swamp/gcp/dialogflow/conversationprofiles",
  version: "2026.06.08.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow ConversationProfiles resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversationProfiles",
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
        if (g["automatedAgentConfig"] !== undefined) {
          body["automatedAgentConfig"] = g["automatedAgentConfig"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["humanAgentAssistantConfig"] !== undefined) {
          body["humanAgentAssistantConfig"] = g["humanAgentAssistantConfig"];
        }
        if (g["humanAgentHandoffConfig"] !== undefined) {
          body["humanAgentHandoffConfig"] = g["humanAgentHandoffConfig"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["newMessageEventNotificationConfig"] !== undefined) {
          body["newMessageEventNotificationConfig"] =
            g["newMessageEventNotificationConfig"];
        }
        if (g["newRecognitionResultNotificationConfig"] !== undefined) {
          body["newRecognitionResultNotificationConfig"] =
            g["newRecognitionResultNotificationConfig"];
        }
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["securitySettings"] !== undefined) {
          body["securitySettings"] = g["securitySettings"];
        }
        if (g["sipConfig"] !== undefined) body["sipConfig"] = g["sipConfig"];
        if (g["sttConfig"] !== undefined) body["sttConfig"] = g["sttConfig"];
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["ttsConfig"] !== undefined) body["ttsConfig"] = g["ttsConfig"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Get a conversationProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversationProfiles"),
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
      description: "Update conversationProfiles attributes",
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
        if (g["automatedAgentConfig"] !== undefined) {
          body["automatedAgentConfig"] = g["automatedAgentConfig"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["humanAgentAssistantConfig"] !== undefined) {
          body["humanAgentAssistantConfig"] = g["humanAgentAssistantConfig"];
        }
        if (g["humanAgentHandoffConfig"] !== undefined) {
          body["humanAgentHandoffConfig"] = g["humanAgentHandoffConfig"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["newMessageEventNotificationConfig"] !== undefined) {
          body["newMessageEventNotificationConfig"] =
            g["newMessageEventNotificationConfig"];
        }
        if (g["newRecognitionResultNotificationConfig"] !== undefined) {
          body["newRecognitionResultNotificationConfig"] =
            g["newRecognitionResultNotificationConfig"];
        }
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["securitySettings"] !== undefined) {
          body["securitySettings"] = g["securitySettings"];
        }
        if (g["sipConfig"] !== undefined) body["sipConfig"] = g["sipConfig"];
        if (g["sttConfig"] !== undefined) body["sttConfig"] = g["sttConfig"];
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["ttsConfig"] !== undefined) body["ttsConfig"] = g["ttsConfig"];
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
      description: "Delete the conversationProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversationProfiles"),
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
      description: "Sync conversationProfiles state from GCP",
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
      description: "List conversationProfiles resources",
      arguments: z.object({
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "conversationProfiles",
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
    clear_suggestion_feature_config: {
      description: "clear suggestion feature config",
      arguments: z.object({
        participantRole: z.any().optional(),
        suggestionFeatureType: z.any().optional(),
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
        params["conversationProfile"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["participantRole"] !== undefined) {
          body["participantRole"] = args["participantRole"];
        }
        if (args["suggestionFeatureType"] !== undefined) {
          body["suggestionFeatureType"] = args["suggestionFeatureType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.conversationProfiles.clearSuggestionFeatureConfig",
            "path": "v2/{+conversationProfile}:clearSuggestionFeatureConfig",
            "httpMethod": "POST",
            "parameterOrder": ["conversationProfile"],
            "parameters": {
              "conversationProfile": { "location": "path", "required": true },
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
    set_suggestion_feature_config: {
      description: "set suggestion feature config",
      arguments: z.object({
        participantRole: z.any().optional(),
        suggestionFeatureConfig: z.any().optional(),
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
        params["conversationProfile"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["participantRole"] !== undefined) {
          body["participantRole"] = args["participantRole"];
        }
        if (args["suggestionFeatureConfig"] !== undefined) {
          body["suggestionFeatureConfig"] = args["suggestionFeatureConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.conversationProfiles.setSuggestionFeatureConfig",
            "path": "v2/{+conversationProfile}:setSuggestionFeatureConfig",
            "httpMethod": "POST",
            "parameterOrder": ["conversationProfile"],
            "parameters": {
              "conversationProfile": { "location": "path", "required": true },
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
