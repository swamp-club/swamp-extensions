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

// Auto-generated extension model for @swamp/gcp/contactcenterinsights/conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights Conversations.
 *
 * The conversation resource.
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
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.conversations.get",
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
  "id": "contactcenterinsights.projects.locations.conversations.create",
  "path": "v1/{+parent}/conversations",
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

const PATCH_CONFIG = {
  "id": "contactcenterinsights.projects.locations.conversations.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "conversationAutoLabelingUpdateConfig.allowAutoLabelingUpdate": {
      "location": "query",
    },
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
  "id": "contactcenterinsights.projects.locations.conversations.delete",
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
  "id": "contactcenterinsights.projects.locations.conversations.list",
  "path": "v1/{+parent}/conversations",
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
    "view": {
      "location": "query",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  agentId: z.string().describe(
    "An opaque, user-specified string representing the human agent who handled the conversation.",
  ).optional(),
  callMetadata: z.object({
    agentChannel: z.number().int().describe(
      "The audio channel that contains the agent.",
    ).optional(),
    customerChannel: z.number().int().describe(
      "The audio channel that contains the customer.",
    ).optional(),
  }).describe("Call-specific metadata.").optional(),
  dataSource: z.object({
    dialogflowSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      dialogflowConversation: z.string().describe(
        "Output only. The name of the Dialogflow conversation that this conversation resource is derived from. Format: projects/{project}/locations/{location}/conversations/{conversation}",
      ).optional(),
    }).describe("The source when the conversation comes from Dialogflow.")
      .optional(),
    gcsSource: z.object({
      audioUri: z.string().describe(
        "Immutable. Deprecated: Use `audio_uris` instead. Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      audioUris: z.array(z.string()).describe(
        "Immutable. Cloud Storage URIs that point to files that contain the conversation audio. Supports both single audio files and multi-leg session recordings (e.g., call transfers, rolling recording buffers).",
      ).optional(),
      transcriptUri: z.string().describe(
        "Immutable. Cloud Storage URI that points to a file that contains the conversation transcript.",
      ).optional(),
    }).describe(
      "A Cloud Storage location specification for the audio and transcript.",
    ).optional(),
    metadataUri: z.string().describe(
      "Cloud Storage URI that points to a file that contains the conversation metadata.",
    ).optional(),
    turnLevelAudios: z.array(z.object({
      audioDuration: z.string().describe("The duration of the audio.")
        .optional(),
      audioGcsUri: z.string().describe(
        "The Cloud Storage URI of the audio for any given turn.",
      ).optional(),
    })).describe(
      "Cloud Storage URIs that points to files that contain the conversation audio for each turn. Assume the order of the URIs is the same as the order of the transcript turns.",
    ).optional(),
  }).describe("The source of the audio and transcription for the conversation.")
    .optional(),
  expireTime: z.string().describe(
    "The time at which this conversation should expire. After this time, the conversation data and any associated analyses will be deleted.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A map for the user to specify any custom fields. A maximum of 100 labels per conversation is allowed, with a maximum of 256 characters per entry.",
  ).optional(),
  languageCode: z.string().describe(
    "A user-specified language code for the conversation.",
  ).optional(),
  medium: z.enum(["MEDIUM_UNSPECIFIED", "PHONE_CALL", "CHAT"]).describe(
    "Immutable. The conversation medium.",
  ).optional(),
  metadataJson: z.string().describe(
    "Optional. JSON metadata encoded as a string. This field is primarily used by Insights integrations with various telephony systems and must be in one of Insight's supported formats.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the conversation. Format: projects/{project}/locations/{location}/conversations/{conversation}",
  ).optional(),
  obfuscatedUserId: z.string().describe(
    "Obfuscated user ID which the customer sent to us.",
  ).optional(),
  qualityMetadata: z.object({
    agentInfo: z.array(z.object({
      agentId: z.string().describe(
        "A user-specified string representing the agent.",
      ).optional(),
      agentType: z.enum([
        "ROLE_UNSPECIFIED",
        "HUMAN_AGENT",
        "AUTOMATED_AGENT",
        "END_USER",
        "ANY_AGENT",
      ]).describe("The agent type, e.g. HUMAN_AGENT.").optional(),
      deploymentDisplayName: z.string().describe(
        "The agent's deployment display name. Only applicable to automated agents.",
      ).optional(),
      deploymentId: z.string().describe(
        "The agent's deployment ID. Only applicable to automated agents.",
      ).optional(),
      displayName: z.string().describe("The agent's name.").optional(),
      dispositionCode: z.string().describe(
        "A user-provided string indicating the outcome of the agent's segment of the call.",
      ).optional(),
      entrySubagentDisplayName: z.string().describe(
        "The entry subagent's display name.",
      ).optional(),
      entrySubagentId: z.string().describe("The entry subagent's ID.")
        .optional(),
      location: z.string().describe("The agent's location.").optional(),
      team: z.string().describe(
        "A user-specified string representing the agent's team. Deprecated in favor of the `teams` field.",
      ).optional(),
      teams: z.array(z.string()).describe(
        "User-specified strings representing the agent's teams.",
      ).optional(),
      versionDisplayName: z.string().describe(
        "The agent's version display name. Only applicable to automated agents.",
      ).optional(),
      versionId: z.string().describe(
        "The agent's version ID. Only applicable to automated agents.",
      ).optional(),
    })).describe("Information about agents involved in the call.").optional(),
    customerSatisfactionRating: z.number().int().describe(
      "An arbitrary integer value indicating the customer's satisfaction rating.",
    ).optional(),
    feedbackLabels: z.array(z.object({
      createTime: z.string().describe("Output only. Create time of the label.")
        .optional(),
      label: z.string().describe("String label used for Topic Modeling.")
        .optional(),
      labeledResource: z.string().describe(
        "Name of the resource to be labeled. Supported resources are: * `projects/{project}/locations/{location}/qaScorecards/{scorecard}/revisions/{revision}/qaQuestions/{question}` * `projects/{project}/locations/{location}/issueModels/{issue_model}` * `projects/{project}/locations/{location}/generators/{generator_id}`",
      ).optional(),
      name: z.string().describe(
        "Immutable. Resource name of the FeedbackLabel. Format: projects/{project}/locations/{location}/conversations/{conversation}/feedbackLabels/{feedback_label}",
      ).optional(),
      qaAnswerLabel: z.object({
        boolValue: z.boolean().describe("Boolean value.").optional(),
        key: z.string().describe(
          "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
        ).optional(),
        naValue: z.boolean().describe(
          'A value of "Not Applicable (N/A)". Should only ever be `true`.',
        ).optional(),
        normalizedScore: z.number().describe(
          "Output only. Normalized score of the questions. Calculated as score / potential_score.",
        ).optional(),
        numValue: z.number().describe("Numerical value.").optional(),
        potentialScore: z.number().describe(
          "Output only. The maximum potential score of the question.",
        ).optional(),
        score: z.number().describe(
          "Output only. Numerical score of the answer.",
        ).optional(),
        skipValue: z.boolean().describe(
          'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
        ).optional(),
        strValue: z.string().describe("String value.").optional(),
      }).describe("QaAnswer label used for Quality AI example conversations.")
        .optional(),
      satisfiesPzi: z.boolean().describe(
        "Output only. Whether this resource is zone isolated.",
      ).optional(),
      satisfiesPzs: z.boolean().describe(
        "Output only. Whether this resource is zone separated.",
      ).optional(),
      updateTime: z.string().describe("Output only. Update time of the label.")
        .optional(),
    })).describe(
      "Input only. The feedback labels associated with the conversation.",
    ).optional(),
    menuPath: z.string().describe(
      "An arbitrary string value specifying the menu path the customer took.",
    ).optional(),
    waitDuration: z.string().describe(
      "The amount of time the customer waited to connect with an agent.",
    ).optional(),
  }).describe("Conversation metadata related to quality management.")
    .optional(),
  startTime: z.string().describe("The time at which the conversation started.")
    .optional(),
  ttl: z.string().describe(
    "Input only. The TTL for this resource. If specified, then this TTL will be used to calculate the expire time.",
  ).optional(),
  conversationId: z.string().describe(
    "A unique ID for the new conversation. This ID will become the final component of the conversation's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`",
  ).optional(),
  allowMissing: z.string().describe(
    "Optional. Defaults to false. If set to true, and the conversation is not found, a new conversation will be created. In this situation, `update_mask` is ignored.",
  ).optional(),
  conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate: z.string()
    .describe(
      "Optional. If set to true, the conversation will be updated with auto labeling results.",
    ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentId: z.string().optional(),
  callMetadata: z.object({
    agentChannel: z.number(),
    customerChannel: z.number(),
  }).optional(),
  correlationInfo: z.object({
    correlationTypes: z.array(z.string()),
    fullConversationCorrelationId: z.string(),
    mergedFullConversationCorrelationId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataSource: z.object({
    dialogflowSource: z.object({
      audioUri: z.string(),
      dialogflowConversation: z.string(),
    }),
    gcsSource: z.object({
      audioUri: z.string(),
      audioUris: z.array(z.string()),
      transcriptUri: z.string(),
    }),
    metadataUri: z.string(),
    turnLevelAudios: z.array(z.object({
      audioDuration: z.string(),
      audioGcsUri: z.string(),
    })),
  }).optional(),
  dialogflowIntents: z.record(z.string(), z.unknown()).optional(),
  duration: z.string().optional(),
  expireTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  languageCode: z.string().optional(),
  latestAnalysis: z.object({
    analysisResult: z.object({
      callAnalysisMetadata: z.object({
        annotations: z.array(z.object({
          annotationEndBoundary: z.unknown(),
          annotationStartBoundary: z.unknown(),
          channelTag: z.unknown(),
          entityMentionData: z.unknown(),
          holdData: z.unknown(),
          intentMatchData: z.unknown(),
          interruptionData: z.unknown(),
          issueMatchData: z.unknown(),
          phraseMatchData: z.unknown(),
          sentimentData: z.unknown(),
          silenceData: z.unknown(),
        })),
        entities: z.record(z.string(), z.unknown()),
        intents: z.record(z.string(), z.unknown()),
        issueModelResult: z.object({
          issueModel: z.string(),
          issues: z.array(z.unknown()),
        }),
        phraseMatchers: z.record(z.string(), z.unknown()),
        qaScorecardResults: z.array(z.object({
          agentId: z.unknown(),
          conversation: z.unknown(),
          createTime: z.unknown(),
          name: z.unknown(),
          normalizedScore: z.unknown(),
          potentialScore: z.unknown(),
          qaAnswers: z.unknown(),
          qaScorecardRevision: z.unknown(),
          qaTagResults: z.unknown(),
          score: z.unknown(),
          scoreSources: z.unknown(),
        })),
        sentiments: z.array(z.object({
          channelTag: z.unknown(),
          sentimentData: z.unknown(),
        })),
        silence: z.object({
          silenceDuration: z.string(),
          silencePercentage: z.number(),
        }),
      }),
      endTime: z.string(),
    }),
    annotatorSelector: z.object({
      issueModels: z.array(z.string()),
      phraseMatchers: z.array(z.string()),
      qaConfig: z.object({
        scorecardList: z.object({
          qaScorecardRevisions: z.array(z.unknown()),
        }),
      }),
      runAutoLabelingAnnotator: z.boolean(),
      runEntityAnnotator: z.boolean(),
      runIntentAnnotator: z.boolean(),
      runInterruptionAnnotator: z.boolean(),
      runIssueModelAnnotator: z.boolean(),
      runPhraseMatcherAnnotator: z.boolean(),
      runQaAnnotator: z.boolean(),
      runSentimentAnnotator: z.boolean(),
      runSilenceAnnotator: z.boolean(),
      runSummarizationAnnotator: z.boolean(),
      summarizationConfig: z.object({
        conversationProfile: z.string(),
        generator: z.string(),
        summarizationModel: z.string(),
      }),
    }),
    createTime: z.string(),
    name: z.string(),
    requestTime: z.string(),
    satisfiesPzi: z.boolean(),
    satisfiesPzs: z.boolean(),
  }).optional(),
  latestSummary: z.object({
    answerRecord: z.string(),
    confidence: z.number(),
    conversationModel: z.string(),
    generatorId: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    text: z.string(),
    textSections: z.record(z.string(), z.unknown()),
  }).optional(),
  medium: z.string().optional(),
  metadataJson: z.string().optional(),
  name: z.string(),
  obfuscatedUserId: z.string().optional(),
  qualityMetadata: z.object({
    agentInfo: z.array(z.object({
      agentId: z.string(),
      agentType: z.string(),
      deploymentDisplayName: z.string(),
      deploymentId: z.string(),
      displayName: z.string(),
      dispositionCode: z.string(),
      entrySubagentDisplayName: z.string(),
      entrySubagentId: z.string(),
      location: z.string(),
      team: z.string(),
      teams: z.array(z.string()),
      versionDisplayName: z.string(),
      versionId: z.string(),
    })),
    customerSatisfactionRating: z.number(),
    feedbackLabels: z.array(z.object({
      createTime: z.string(),
      label: z.string(),
      labeledResource: z.string(),
      name: z.string(),
      qaAnswerLabel: z.object({
        boolValue: z.boolean(),
        key: z.string(),
        naValue: z.boolean(),
        normalizedScore: z.number(),
        numValue: z.number(),
        potentialScore: z.number(),
        score: z.number(),
        skipValue: z.boolean(),
        strValue: z.string(),
      }),
      satisfiesPzi: z.boolean(),
      satisfiesPzs: z.boolean(),
      updateTime: z.string(),
    })),
    menuPath: z.string(),
    waitDuration: z.string(),
  }).optional(),
  runtimeAnnotations: z.array(z.object({
    annotationId: z.string(),
    answerFeedback: z.object({
      clicked: z.boolean(),
      correctnessLevel: z.string(),
      displayed: z.boolean(),
    }),
    articleSuggestion: z.object({
      confidenceScore: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      queryRecord: z.string(),
      source: z.string(),
      title: z.string(),
      uri: z.string(),
    }),
    cesEndSessionAnnotation: z.object({
      endSession: z.object({
        metadata: z.record(z.string(), z.unknown()),
      }),
    }),
    cesTurnAnnotation: z.object({
      messages: z.array(z.object({
        chunks: z.unknown(),
        eventTime: z.unknown(),
        role: z.unknown(),
      })),
      rootSpan: z.object({
        attributes: z.record(z.string(), z.unknown()),
        childSpans: z.array(z.unknown()),
        duration: z.string(),
        endTime: z.string(),
        name: z.string(),
        startTime: z.string(),
      }),
    }),
    conversationSummarizationSuggestion: z.object({
      answerRecord: z.string(),
      confidence: z.number(),
      conversationModel: z.string(),
      generatorId: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      text: z.string(),
      textSections: z.record(z.string(), z.unknown()),
    }),
    createTime: z.string(),
    dialogflowInteraction: z.object({
      confidence: z.number(),
      dialogflowIntentId: z.string(),
    }),
    endBoundary: z.object({
      transcriptIndex: z.number(),
      wordIndex: z.number(),
    }),
    faqAnswer: z.object({
      answer: z.string(),
      confidenceScore: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      queryRecord: z.string(),
      question: z.string(),
      source: z.string(),
    }),
    smartComposeSuggestion: z.object({
      confidenceScore: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      queryRecord: z.string(),
      suggestion: z.string(),
    }),
    smartReply: z.object({
      confidenceScore: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      queryRecord: z.string(),
      reply: z.string(),
    }),
    startBoundary: z.object({
      transcriptIndex: z.number(),
      wordIndex: z.number(),
    }),
    userInput: z.object({
      generatorName: z.string(),
      query: z.string(),
      querySource: z.string(),
    }),
  })).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  startTime: z.string().optional(),
  transcript: z.object({
    transcriptSegments: z.array(z.object({
      channelTag: z.number(),
      confidence: z.number(),
      dialogflowSegmentMetadata: z.object({
        smartReplyAllowlistCovered: z.boolean(),
      }),
      languageCode: z.string(),
      messageTime: z.string(),
      parts: z.array(z.object({
        citation: z.unknown(),
        customPayload: z.unknown(),
        image: z.unknown(),
        link: z.unknown(),
        list: z.unknown(),
        productCollection: z.unknown(),
        suggestionChips: z.unknown(),
        table: z.unknown(),
        text: z.unknown(),
        thought: z.unknown(),
        video: z.unknown(),
      })),
      segmentParticipant: z.object({
        dialogflowParticipant: z.string(),
        dialogflowParticipantName: z.string(),
        obfuscatedExternalUserId: z.string(),
        role: z.string(),
        userId: z.string(),
      }),
      sentiment: z.object({
        magnitude: z.number(),
        score: z.number(),
      }),
      text: z.string(),
      turnLevelAudio: z.object({
        audioDuration: z.string(),
        audioGcsUri: z.string(),
      }),
      words: z.array(z.object({
        confidence: z.unknown(),
        endOffset: z.unknown(),
        startOffset: z.unknown(),
        word: z.unknown(),
      })),
    })),
  }).optional(),
  ttl: z.string().optional(),
  turnCount: z.number().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  agentId: z.string().describe(
    "An opaque, user-specified string representing the human agent who handled the conversation.",
  ).optional(),
  callMetadata: z.object({
    agentChannel: z.number().int().describe(
      "The audio channel that contains the agent.",
    ).optional(),
    customerChannel: z.number().int().describe(
      "The audio channel that contains the customer.",
    ).optional(),
  }).describe("Call-specific metadata.").optional(),
  dataSource: z.object({
    dialogflowSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      dialogflowConversation: z.string().describe(
        "Output only. The name of the Dialogflow conversation that this conversation resource is derived from. Format: projects/{project}/locations/{location}/conversations/{conversation}",
      ).optional(),
    }).describe("The source when the conversation comes from Dialogflow.")
      .optional(),
    gcsSource: z.object({
      audioUri: z.string().describe(
        "Immutable. Deprecated: Use `audio_uris` instead. Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      audioUris: z.array(z.string()).describe(
        "Immutable. Cloud Storage URIs that point to files that contain the conversation audio. Supports both single audio files and multi-leg session recordings (e.g., call transfers, rolling recording buffers).",
      ).optional(),
      transcriptUri: z.string().describe(
        "Immutable. Cloud Storage URI that points to a file that contains the conversation transcript.",
      ).optional(),
    }).describe(
      "A Cloud Storage location specification for the audio and transcript.",
    ).optional(),
    metadataUri: z.string().describe(
      "Cloud Storage URI that points to a file that contains the conversation metadata.",
    ).optional(),
    turnLevelAudios: z.array(z.object({
      audioDuration: z.string().describe("The duration of the audio.")
        .optional(),
      audioGcsUri: z.string().describe(
        "The Cloud Storage URI of the audio for any given turn.",
      ).optional(),
    })).describe(
      "Cloud Storage URIs that points to files that contain the conversation audio for each turn. Assume the order of the URIs is the same as the order of the transcript turns.",
    ).optional(),
  }).describe("The source of the audio and transcription for the conversation.")
    .optional(),
  expireTime: z.string().describe(
    "The time at which this conversation should expire. After this time, the conversation data and any associated analyses will be deleted.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A map for the user to specify any custom fields. A maximum of 100 labels per conversation is allowed, with a maximum of 256 characters per entry.",
  ).optional(),
  languageCode: z.string().describe(
    "A user-specified language code for the conversation.",
  ).optional(),
  medium: z.enum(["MEDIUM_UNSPECIFIED", "PHONE_CALL", "CHAT"]).describe(
    "Immutable. The conversation medium.",
  ).optional(),
  metadataJson: z.string().describe(
    "Optional. JSON metadata encoded as a string. This field is primarily used by Insights integrations with various telephony systems and must be in one of Insight's supported formats.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the conversation. Format: projects/{project}/locations/{location}/conversations/{conversation}",
  ).optional(),
  obfuscatedUserId: z.string().describe(
    "Obfuscated user ID which the customer sent to us.",
  ).optional(),
  qualityMetadata: z.object({
    agentInfo: z.array(z.object({
      agentId: z.string().describe(
        "A user-specified string representing the agent.",
      ).optional(),
      agentType: z.enum([
        "ROLE_UNSPECIFIED",
        "HUMAN_AGENT",
        "AUTOMATED_AGENT",
        "END_USER",
        "ANY_AGENT",
      ]).describe("The agent type, e.g. HUMAN_AGENT.").optional(),
      deploymentDisplayName: z.string().describe(
        "The agent's deployment display name. Only applicable to automated agents.",
      ).optional(),
      deploymentId: z.string().describe(
        "The agent's deployment ID. Only applicable to automated agents.",
      ).optional(),
      displayName: z.string().describe("The agent's name.").optional(),
      dispositionCode: z.string().describe(
        "A user-provided string indicating the outcome of the agent's segment of the call.",
      ).optional(),
      entrySubagentDisplayName: z.string().describe(
        "The entry subagent's display name.",
      ).optional(),
      entrySubagentId: z.string().describe("The entry subagent's ID.")
        .optional(),
      location: z.string().describe("The agent's location.").optional(),
      team: z.string().describe(
        "A user-specified string representing the agent's team. Deprecated in favor of the `teams` field.",
      ).optional(),
      teams: z.array(z.string()).describe(
        "User-specified strings representing the agent's teams.",
      ).optional(),
      versionDisplayName: z.string().describe(
        "The agent's version display name. Only applicable to automated agents.",
      ).optional(),
      versionId: z.string().describe(
        "The agent's version ID. Only applicable to automated agents.",
      ).optional(),
    })).describe("Information about agents involved in the call.").optional(),
    customerSatisfactionRating: z.number().int().describe(
      "An arbitrary integer value indicating the customer's satisfaction rating.",
    ).optional(),
    feedbackLabels: z.array(z.object({
      createTime: z.string().describe("Output only. Create time of the label.")
        .optional(),
      label: z.string().describe("String label used for Topic Modeling.")
        .optional(),
      labeledResource: z.string().describe(
        "Name of the resource to be labeled. Supported resources are: * `projects/{project}/locations/{location}/qaScorecards/{scorecard}/revisions/{revision}/qaQuestions/{question}` * `projects/{project}/locations/{location}/issueModels/{issue_model}` * `projects/{project}/locations/{location}/generators/{generator_id}`",
      ).optional(),
      name: z.string().describe(
        "Immutable. Resource name of the FeedbackLabel. Format: projects/{project}/locations/{location}/conversations/{conversation}/feedbackLabels/{feedback_label}",
      ).optional(),
      qaAnswerLabel: z.object({
        boolValue: z.boolean().describe("Boolean value.").optional(),
        key: z.string().describe(
          "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
        ).optional(),
        naValue: z.boolean().describe(
          'A value of "Not Applicable (N/A)". Should only ever be `true`.',
        ).optional(),
        normalizedScore: z.number().describe(
          "Output only. Normalized score of the questions. Calculated as score / potential_score.",
        ).optional(),
        numValue: z.number().describe("Numerical value.").optional(),
        potentialScore: z.number().describe(
          "Output only. The maximum potential score of the question.",
        ).optional(),
        score: z.number().describe(
          "Output only. Numerical score of the answer.",
        ).optional(),
        skipValue: z.boolean().describe(
          'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
        ).optional(),
        strValue: z.string().describe("String value.").optional(),
      }).describe("QaAnswer label used for Quality AI example conversations.")
        .optional(),
      satisfiesPzi: z.boolean().describe(
        "Output only. Whether this resource is zone isolated.",
      ).optional(),
      satisfiesPzs: z.boolean().describe(
        "Output only. Whether this resource is zone separated.",
      ).optional(),
      updateTime: z.string().describe("Output only. Update time of the label.")
        .optional(),
    })).describe(
      "Input only. The feedback labels associated with the conversation.",
    ).optional(),
    menuPath: z.string().describe(
      "An arbitrary string value specifying the menu path the customer took.",
    ).optional(),
    waitDuration: z.string().describe(
      "The amount of time the customer waited to connect with an agent.",
    ).optional(),
  }).describe("Conversation metadata related to quality management.")
    .optional(),
  startTime: z.string().describe("The time at which the conversation started.")
    .optional(),
  ttl: z.string().describe(
    "Input only. The TTL for this resource. If specified, then this TTL will be used to calculate the expire time.",
  ).optional(),
  conversationId: z.string().describe(
    "A unique ID for the new conversation. This ID will become the final component of the conversation's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`",
  ).optional(),
  allowMissing: z.string().describe(
    "Optional. Defaults to false. If set to true, and the conversation is not found, a new conversation will be created. In this situation, `update_mask` is ignored.",
  ).optional(),
  conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate: z.string()
    .describe(
      "Optional. If set to true, the conversation will be updated with auto labeling results.",
    ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Contact Center AI Insights Conversations. Registered at `@swamp/gcp/contactcenterinsights/conversations`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/conversations",
  version: "2026.09.30.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.15.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
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
      description:
        "Removed: correlationInfo, latestAnalysis, latestSummary, transcript",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          correlationInfo: _correlationInfo,
          latestAnalysis: _latestAnalysis,
          latestSummary: _latestSummary,
          transcript: _transcript,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.08.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description:
        "Added: allowMissing, conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The conversation resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentId"] !== undefined) body["agentId"] = g["agentId"];
        if (g["callMetadata"] !== undefined) {
          body["callMetadata"] = g["callMetadata"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["medium"] !== undefined) body["medium"] = g["medium"];
        if (g["metadataJson"] !== undefined) {
          body["metadataJson"] = g["metadataJson"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["obfuscatedUserId"] !== undefined) {
          body["obfuscatedUserId"] = g["obfuscatedUserId"];
        }
        if (g["qualityMetadata"] !== undefined) {
          body["qualityMetadata"] = g["qualityMetadata"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["conversationId"] !== undefined) {
          params["conversationId"] = String(g["conversationId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update conversations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific conversations by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["agentId"] !== undefined) body["agentId"] = g["agentId"];
        if (g["callMetadata"] !== undefined) {
          body["callMetadata"] = g["callMetadata"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["metadataJson"] !== undefined) {
          body["metadataJson"] = g["metadataJson"];
        }
        if (g["obfuscatedUserId"] !== undefined) {
          body["obfuscatedUserId"] = g["obfuscatedUserId"];
        }
        if (g["qualityMetadata"] !== undefined) {
          body["qualityMetadata"] = g["qualityMetadata"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
        }
        if (
          g["conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate"] !==
            undefined
        ) {
          body["conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate"] =
            g["conversationAutoLabelingUpdateConfig_allowAutoLabelingUpdate"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
      description: "Delete the conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync conversations state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific conversations by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List conversations resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter to reduce results to a specific subset. Useful for querying conversations with specific properties.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The attribute by which to order conversations in the response. If empty, conversations will be ordered by descending creation time. Supported values are one of the following: * create_time * customer_satisfaction_rating * duration * latest_analysis * start_time * turn_count The default sort order is ascending. To specify order, append `asc` or `desc` (`create_time desc`). For more details, see [Google AIPs Ordering](https://google.aip.dev/132#ordering).",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of conversations to return in the response. A valid page size ranges from 0 to 100,000 inclusive. If the page size is zero or unspecified, a default page size of 100 will be chosen. Note that a call might return fewer results than the requested page size.",
        ).optional(),
        view: z.string().describe(
          "The level of details of the conversation. Default is `BASIC`.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
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
    bulk_analyze: {
      description: "bulk analyze",
      arguments: z.object({
        analysisPercentage: z.any().optional(),
        annotatorSelector: z.any().optional(),
        filter: z.any().optional(),
        parent: z.any().optional(),
        relabel: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["analysisPercentage"] !== undefined) {
          body["analysisPercentage"] = args["analysisPercentage"];
        }
        if (args["annotatorSelector"] !== undefined) {
          body["annotatorSelector"] = args["annotatorSelector"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        if (args["relabel"] !== undefined) body["relabel"] = args["relabel"];
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.bulkAnalyze",
            "path": "v1/{+parent}/conversations:bulkAnalyze",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    bulk_delete: {
      description: "bulk delete",
      arguments: z.object({
        filter: z.any().optional(),
        force: z.any().optional(),
        maxDeleteCount: z.any().optional(),
        parent: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["maxDeleteCount"] !== undefined) {
          body["maxDeleteCount"] = args["maxDeleteCount"];
        }
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.bulkDelete",
            "path": "v1/{+parent}/conversations:bulkDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    calculate_stats: {
      description: "calculate stats",
      arguments: z.object({
        filter: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.calculateStats",
            "path": "v1/{+location}/conversations:calculateStats",
            "httpMethod": "GET",
            "parameterOrder": ["location"],
            "parameters": {
              "filter": { "location": "query" },
              "location": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    generate_signed_audio: {
      description: "generate signed audio",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.generateSignedAudio",
            "path": "v1/{+name}:generateSignedAudio",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    ingest: {
      description: "ingest",
      arguments: z.object({
        conversationConfig: z.any().optional(),
        gcsSource: z.any().optional(),
        parent: z.any().optional(),
        redactionConfig: z.any().optional(),
        sampleSize: z.any().optional(),
        speechConfig: z.any().optional(),
        transcriptObjectConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["conversationConfig"] !== undefined) {
          body["conversationConfig"] = args["conversationConfig"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        if (args["redactionConfig"] !== undefined) {
          body["redactionConfig"] = args["redactionConfig"];
        }
        if (args["sampleSize"] !== undefined) {
          body["sampleSize"] = args["sampleSize"];
        }
        if (args["speechConfig"] !== undefined) {
          body["speechConfig"] = args["speechConfig"];
        }
        if (args["transcriptObjectConfig"] !== undefined) {
          body["transcriptObjectConfig"] = args["transcriptObjectConfig"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.ingest",
            "path": "v1/{+parent}/conversations:ingest",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    sample: {
      description: "sample",
      arguments: z.object({
        destinationDataset: z.any().optional(),
        parent: z.any().optional(),
        sampleRule: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["destinationDataset"] !== undefined) {
          body["destinationDataset"] = args["destinationDataset"];
        }
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        if (args["sampleRule"] !== undefined) {
          body["sampleRule"] = args["sampleRule"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.sample",
            "path": "v1/{+parent}/conversations:sample",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    upload: {
      description: "upload",
      arguments: z.object({
        conversation: z.any().optional(),
        conversationId: z.any().optional(),
        parent: z.any().optional(),
        redactionConfig: z.any().optional(),
        speechConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["conversation"] !== undefined) {
          body["conversation"] = args["conversation"];
        }
        if (args["conversationId"] !== undefined) {
          body["conversationId"] = args["conversationId"];
        }
        if (args["parent"] !== undefined) body["parent"] = args["parent"];
        if (args["redactionConfig"] !== undefined) {
          body["redactionConfig"] = args["redactionConfig"];
        }
        if (args["speechConfig"] !== undefined) {
          body["speechConfig"] = args["speechConfig"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "contactcenterinsights.projects.locations.conversations.upload",
            "path": "v1/{+parent}/conversations:upload",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
