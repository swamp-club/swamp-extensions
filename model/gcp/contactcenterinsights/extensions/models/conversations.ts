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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
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
  correlationInfo: z.object({
    correlationTypes: z.array(
      z.enum([
        "CORRELATION_TYPE_UNSPECIFIED",
        "SEGMENT",
        "PARTIAL",
        "FULL",
        "SYNTHETIC",
      ]),
    ).describe(
      "Output only. The correlation types of this conversation. A single conversation can have multiple correlation types. For example a conversation that only has a single segment is both a SEGMENT and a FULL_CONVERSATION.",
    ).optional(),
    fullConversationCorrelationId: z.string().describe(
      "Output only. The full conversation correlation id this conversation is a segment of.",
    ).optional(),
    mergedFullConversationCorrelationId: z.string().describe(
      "Output only. The full conversation correlation id this conversation is a merged conversation of.",
    ).optional(),
  }).describe("Info for correlating across conversations.").optional(),
  dataSource: z.object({
    dialogflowSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      dialogflowConversation: z.string().describe(
        "Output only. The name of the Dialogflow conversation that this conversation resource is derived from. Format: projects/{project}/locations/{location}/conversations/{conversation}",
      ).optional(),
    }).describe("A Dialogflow source of conversation data.").optional(),
    gcsSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      transcriptUri: z.string().describe(
        "Immutable. Cloud Storage URI that points to a file that contains the conversation transcript.",
      ).optional(),
    }).describe("A Cloud Storage source of conversation data.").optional(),
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
  }).describe(
    "The conversation source, which is a combination of transcript and audio.",
  ).optional(),
  expireTime: z.string().describe(
    "The time at which this conversation should expire. After this time, the conversation data and any associated analyses will be deleted.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A map for the user to specify any custom fields. A maximum of 100 labels per conversation is allowed, with a maximum of 256 characters per entry.",
  ).optional(),
  languageCode: z.string().describe(
    "A user-specified language code for the conversation.",
  ).optional(),
  latestAnalysis: z.object({
    analysisResult: z.object({
      callAnalysisMetadata: z.object({
        annotations: z.array(z.object({
          annotationEndBoundary: z.unknown().describe(
            "A point in a conversation that marks the start or the end of an annotation.",
          ).optional(),
          annotationStartBoundary: z.unknown().describe(
            "A point in a conversation that marks the start or the end of an annotation.",
          ).optional(),
          channelTag: z.unknown().describe(
            "The channel of the audio where the annotation occurs. For single-channel audio, this field is not populated.",
          ).optional(),
          entityMentionData: z.unknown().describe(
            "The data for an entity mention annotation. This represents a mention of an `Entity` in the conversation.",
          ).optional(),
          holdData: z.unknown().describe("The data for a hold annotation.")
            .optional(),
          intentMatchData: z.unknown().describe(
            "The data for an intent match. Represents an intent match for a text segment in the conversation. A text segment can be part of a sentence, a complete sentence, or an utterance with multiple sentences.",
          ).optional(),
          interruptionData: z.unknown().describe(
            "The data for an interruption annotation.",
          ).optional(),
          issueMatchData: z.unknown().describe(
            "The data for an issue match annotation.",
          ).optional(),
          phraseMatchData: z.unknown().describe(
            "The data for a matched phrase matcher. Represents information identifying a phrase matcher for a given match.",
          ).optional(),
          sentimentData: z.unknown().describe(
            "The data for a sentiment annotation.",
          ).optional(),
          silenceData: z.unknown().describe(
            "The data for a silence annotation.",
          ).optional(),
        })).describe("A list of call annotations that apply to this call.")
          .optional(),
        entities: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The representative name for the entity.",
            ).optional(),
            metadata: z.unknown().describe(
              "Metadata associated with the entity. For most entity types, the metadata is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if they are available. For the metadata associated with other entity types, see the Type table below.",
            ).optional(),
            salience: z.unknown().describe(
              "The salience score associated with the entity in the [0, 1.0] range. The salience score for an entity provides information about the importance or centrality of that entity to the entire document text. Scores closer to 0 are less salient, while scores closer to 1.0 are highly salient.",
            ).optional(),
            sentiment: z.unknown().describe(
              "The data for a sentiment annotation.",
            ).optional(),
            type: z.unknown().describe("The entity type.").optional(),
          }),
        ).describe("All the entities in the call.").optional(),
        intents: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The human-readable name of the intent.",
            ).optional(),
            id: z.unknown().describe("The unique identifier of the intent.")
              .optional(),
          }),
        ).describe("All the matched intents in the call.").optional(),
        issueModelResult: z.object({
          issueModel: z.string().describe(
            "Issue model that generates the result. Format: projects/{project}/locations/{location}/issueModels/{issue_model}",
          ).optional(),
          issues: z.array(z.unknown()).describe("All the matched issues.")
            .optional(),
        }).describe("Issue Modeling result on a conversation.").optional(),
        phraseMatchers: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The human-readable name of the phrase matcher.",
            ).optional(),
            phraseMatcher: z.unknown().describe(
              "The unique identifier (the resource name) of the phrase matcher.",
            ).optional(),
          }),
        ).describe("All the matched phrase matchers in the call.").optional(),
        qaScorecardResults: z.array(z.object({
          agentId: z.unknown().describe(
            "ID of the agent that handled the conversation.",
          ).optional(),
          conversation: z.unknown().describe(
            "The conversation scored by this result.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The timestamp that the revision was created.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The name of the scorecard result. Format: projects/{project}/locations/{location}/qaScorecardResults/{qa_scorecard_result}",
          ).optional(),
          normalizedScore: z.unknown().describe(
            "The normalized score, which is the score divided by the potential score. Any manual edits are included if they exist.",
          ).optional(),
          potentialScore: z.unknown().describe(
            "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
          ).optional(),
          qaAnswers: z.unknown().describe(
            "Set of QaAnswers represented in the result.",
          ).optional(),
          qaScorecardRevision: z.unknown().describe(
            "The QaScorecardRevision scored by this result.",
          ).optional(),
          qaTagResults: z.unknown().describe(
            "Collection of tags and their scores.",
          ).optional(),
          score: z.unknown().describe(
            "The overall numerical score of the result, incorporating any manual edits if they exist.",
          ).optional(),
          scoreSources: z.unknown().describe(
            "List of all individual score sets.",
          ).optional(),
        })).describe("Results of scoring QaScorecards.").optional(),
        sentiments: z.array(z.object({
          channelTag: z.unknown().describe(
            "The channel of the audio that the data applies to.",
          ).optional(),
          sentimentData: z.unknown().describe(
            "The data for a sentiment annotation.",
          ).optional(),
        })).describe(
          "Overall conversation-level sentiment for each channel of the call.",
        ).optional(),
        silence: z.object({
          silenceDuration: z.string().describe(
            "Amount of time calculated to be in silence.",
          ).optional(),
          silencePercentage: z.number().describe(
            "Percentage of the total conversation spent in silence.",
          ).optional(),
        }).describe("Conversation-level silence data.").optional(),
      }).describe("Call-specific metadata created during analysis.").optional(),
      endTime: z.string().describe("The time at which the analysis ended.")
        .optional(),
    }).describe("The result of an analysis.").optional(),
    annotatorSelector: z.object({
      issueModels: z.array(z.string()).describe(
        "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
      ).optional(),
      phraseMatchers: z.array(z.string()).describe(
        "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
      ).optional(),
      qaConfig: z.object({
        scorecardList: z.object({
          qaScorecardRevisions: z.array(z.unknown()).describe(
            "List of QaScorecardRevisions.",
          ).optional(),
        }).describe("Container for a list of scorecards.").optional(),
      }).describe("Configuration for the QA feature.").optional(),
      runAutoLabelingAnnotator: z.boolean().describe(
        "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
      ).optional(),
      runEntityAnnotator: z.boolean().describe(
        "Whether to run the entity annotator.",
      ).optional(),
      runIntentAnnotator: z.boolean().describe(
        "Whether to run the intent annotator.",
      ).optional(),
      runInterruptionAnnotator: z.boolean().describe(
        "Whether to run the interruption annotator.",
      ).optional(),
      runIssueModelAnnotator: z.boolean().describe(
        "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
      ).optional(),
      runPhraseMatcherAnnotator: z.boolean().describe(
        "Whether to run the active phrase matcher annotator(s).",
      ).optional(),
      runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
        .optional(),
      runSentimentAnnotator: z.boolean().describe(
        "Whether to run the sentiment annotator.",
      ).optional(),
      runSilenceAnnotator: z.boolean().describe(
        "Whether to run the silence annotator.",
      ).optional(),
      runSummarizationAnnotator: z.boolean().describe(
        "Whether to run the summarization annotator.",
      ).optional(),
      summarizationConfig: z.object({
        conversationProfile: z.string().describe(
          "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
        ).optional(),
        generator: z.string().describe(
          "The resource name of the existing created generator. Format: projects//locations//generators/",
        ).optional(),
        summarizationModel: z.enum([
          "SUMMARIZATION_MODEL_UNSPECIFIED",
          "BASELINE_MODEL",
          "BASELINE_MODEL_V2_0",
        ]).describe("Default summarization model to be used.").optional(),
      }).describe("Configuration for summarization.").optional(),
    }).describe(
      "Selector of all available annotators and phrase matchers to run.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the analysis was created, which occurs when the long-running operation completes.",
    ).optional(),
    name: z.string().describe(
      "Immutable. The resource name of the analysis. Format: projects/{project}/locations/{location}/conversations/{conversation}/analyses/{analysis}",
    ).optional(),
    requestTime: z.string().describe(
      "Output only. The time at which the analysis was requested.",
    ).optional(),
  }).describe("The analysis resource.").optional(),
  latestSummary: z.object({
    answerRecord: z.string().describe(
      "The name of the answer record. Format: projects/{project}/locations/{location}/answerRecords/{answer_record}",
    ).optional(),
    confidence: z.number().describe(
      "The confidence score of the summarization.",
    ).optional(),
    conversationModel: z.string().describe(
      "The name of the model that generates this summary. Format: projects/{project}/locations/{location}/conversationModels/{conversation_model}",
    ).optional(),
    generatorId: z.string().describe("Agent Assist generator ID.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "A map that contains metadata about the summarization and the document from which it originates.",
    ).optional(),
    text: z.string().describe(
      "The summarization content that is concatenated into one string.",
    ).optional(),
    textSections: z.record(z.string(), z.string()).describe(
      "The summarization content that is divided into sections. The key is the section's name and the value is the section's content. There is no specific format for the key or value.",
    ).optional(),
  }).describe("Conversation summarization suggestion data.").optional(),
  medium: z.enum(["MEDIUM_UNSPECIFIED", "PHONE_CALL", "CHAT"]).describe(
    "Immutable. The conversation medium.",
  ).optional(),
  metadataJson: z.string().describe(
    "Input only. JSON metadata encoded as a string. This field is primarily used by Insights integrations with various telephony systems and must be in one of Insight's supported formats.",
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
      }).describe(
        "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
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
  transcript: z.object({
    transcriptSegments: z.array(z.object({
      channelTag: z.number().int().describe(
        "For conversations derived from multi-channel audio, this is the channel number corresponding to the audio from that channel. For audioChannelCount = N, its output values can range from '1' to 'N'. A channel tag of 0 indicates that the audio is mono.",
      ).optional(),
      confidence: z.number().describe(
        "A confidence estimate between 0.0 and 1.0 of the fidelity of this segment. A default value of 0.0 indicates that the value is unset.",
      ).optional(),
      dialogflowSegmentMetadata: z.object({
        smartReplyAllowlistCovered: z.boolean().describe(
          "Whether the transcript segment was covered under the configured smart reply allowlist in Agent Assist.",
        ).optional(),
      }).describe(
        "Metadata from Dialogflow relating to the current transcript segment.",
      ).optional(),
      languageCode: z.string().describe(
        'The language code of this segment as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. Example: "en-US".',
      ).optional(),
      messageTime: z.string().describe(
        "The time that the message occurred, if provided.",
      ).optional(),
      segmentParticipant: z.object({
        dialogflowParticipant: z.string().describe(
          "Deprecated. Use `dialogflow_participant_name` instead. The name of the Dialogflow participant. Format: projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}",
        ).optional(),
        dialogflowParticipantName: z.string().describe(
          "The name of the participant provided by Dialogflow. Format: projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}",
        ).optional(),
        obfuscatedExternalUserId: z.string().describe(
          "Obfuscated user ID from Dialogflow.",
        ).optional(),
        role: z.enum([
          "ROLE_UNSPECIFIED",
          "HUMAN_AGENT",
          "AUTOMATED_AGENT",
          "END_USER",
          "ANY_AGENT",
        ]).describe("The role of the participant.").optional(),
        userId: z.string().describe(
          "A user-specified ID representing the participant.",
        ).optional(),
      }).describe("The call participant speaking for a given utterance.")
        .optional(),
      sentiment: z.object({
        magnitude: z.number().describe(
          "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
        ).optional(),
        score: z.number().describe(
          "The sentiment score between -1.0 (negative) and 1.0 (positive).",
        ).optional(),
      }).describe("The data for a sentiment annotation.").optional(),
      text: z.string().describe("The text of this segment.").optional(),
      turnLevelAudio: z.object({
        audioDuration: z.string().describe("The duration of the audio.")
          .optional(),
        audioGcsUri: z.string().describe(
          "The Cloud Storage URI of the audio for any given turn.",
        ).optional(),
      }).describe("A wrapper for holding the audio for any given turn.")
        .optional(),
      words: z.array(z.object({
        confidence: z.unknown().describe(
          "A confidence estimate between 0.0 and 1.0 of the fidelity of this word. A default value of 0.0 indicates that the value is unset.",
        ).optional(),
        endOffset: z.unknown().describe(
          "Time offset of the end of this word relative to the beginning of the total conversation.",
        ).optional(),
        startOffset: z.unknown().describe(
          "Time offset of the start of this word relative to the beginning of the total conversation.",
        ).optional(),
        word: z.unknown().describe(
          "The word itself. Includes punctuation marks that surround the word.",
        ).optional(),
      })).describe(
        "A list of the word-specific information for each word in the segment.",
      ).optional(),
    })).describe(
      "A list of sequential transcript segments that comprise the conversation.",
    ).optional(),
  }).describe("A message representing the transcript of a conversation.")
    .optional(),
  ttl: z.string().describe(
    "Input only. The TTL for this resource. If specified, then this TTL will be used to calculate the expire time.",
  ).optional(),
  conversationId: z.string().describe(
    "A unique ID for the new conversation. This ID will become the final component of the conversation's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`",
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
  correlationInfo: z.object({
    correlationTypes: z.array(
      z.enum([
        "CORRELATION_TYPE_UNSPECIFIED",
        "SEGMENT",
        "PARTIAL",
        "FULL",
        "SYNTHETIC",
      ]),
    ).describe(
      "Output only. The correlation types of this conversation. A single conversation can have multiple correlation types. For example a conversation that only has a single segment is both a SEGMENT and a FULL_CONVERSATION.",
    ).optional(),
    fullConversationCorrelationId: z.string().describe(
      "Output only. The full conversation correlation id this conversation is a segment of.",
    ).optional(),
    mergedFullConversationCorrelationId: z.string().describe(
      "Output only. The full conversation correlation id this conversation is a merged conversation of.",
    ).optional(),
  }).describe("Info for correlating across conversations.").optional(),
  dataSource: z.object({
    dialogflowSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      dialogflowConversation: z.string().describe(
        "Output only. The name of the Dialogflow conversation that this conversation resource is derived from. Format: projects/{project}/locations/{location}/conversations/{conversation}",
      ).optional(),
    }).describe("A Dialogflow source of conversation data.").optional(),
    gcsSource: z.object({
      audioUri: z.string().describe(
        "Cloud Storage URI that points to a file that contains the conversation audio.",
      ).optional(),
      transcriptUri: z.string().describe(
        "Immutable. Cloud Storage URI that points to a file that contains the conversation transcript.",
      ).optional(),
    }).describe("A Cloud Storage source of conversation data.").optional(),
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
  }).describe(
    "The conversation source, which is a combination of transcript and audio.",
  ).optional(),
  expireTime: z.string().describe(
    "The time at which this conversation should expire. After this time, the conversation data and any associated analyses will be deleted.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "A map for the user to specify any custom fields. A maximum of 100 labels per conversation is allowed, with a maximum of 256 characters per entry.",
  ).optional(),
  languageCode: z.string().describe(
    "A user-specified language code for the conversation.",
  ).optional(),
  latestAnalysis: z.object({
    analysisResult: z.object({
      callAnalysisMetadata: z.object({
        annotations: z.array(z.object({
          annotationEndBoundary: z.unknown().describe(
            "A point in a conversation that marks the start or the end of an annotation.",
          ).optional(),
          annotationStartBoundary: z.unknown().describe(
            "A point in a conversation that marks the start or the end of an annotation.",
          ).optional(),
          channelTag: z.unknown().describe(
            "The channel of the audio where the annotation occurs. For single-channel audio, this field is not populated.",
          ).optional(),
          entityMentionData: z.unknown().describe(
            "The data for an entity mention annotation. This represents a mention of an `Entity` in the conversation.",
          ).optional(),
          holdData: z.unknown().describe("The data for a hold annotation.")
            .optional(),
          intentMatchData: z.unknown().describe(
            "The data for an intent match. Represents an intent match for a text segment in the conversation. A text segment can be part of a sentence, a complete sentence, or an utterance with multiple sentences.",
          ).optional(),
          interruptionData: z.unknown().describe(
            "The data for an interruption annotation.",
          ).optional(),
          issueMatchData: z.unknown().describe(
            "The data for an issue match annotation.",
          ).optional(),
          phraseMatchData: z.unknown().describe(
            "The data for a matched phrase matcher. Represents information identifying a phrase matcher for a given match.",
          ).optional(),
          sentimentData: z.unknown().describe(
            "The data for a sentiment annotation.",
          ).optional(),
          silenceData: z.unknown().describe(
            "The data for a silence annotation.",
          ).optional(),
        })).describe("A list of call annotations that apply to this call.")
          .optional(),
        entities: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The representative name for the entity.",
            ).optional(),
            metadata: z.unknown().describe(
              "Metadata associated with the entity. For most entity types, the metadata is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if they are available. For the metadata associated with other entity types, see the Type table below.",
            ).optional(),
            salience: z.unknown().describe(
              "The salience score associated with the entity in the [0, 1.0] range. The salience score for an entity provides information about the importance or centrality of that entity to the entire document text. Scores closer to 0 are less salient, while scores closer to 1.0 are highly salient.",
            ).optional(),
            sentiment: z.unknown().describe(
              "The data for a sentiment annotation.",
            ).optional(),
            type: z.unknown().describe("The entity type.").optional(),
          }),
        ).describe("All the entities in the call.").optional(),
        intents: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The human-readable name of the intent.",
            ).optional(),
            id: z.unknown().describe("The unique identifier of the intent.")
              .optional(),
          }),
        ).describe("All the matched intents in the call.").optional(),
        issueModelResult: z.object({
          issueModel: z.string().describe(
            "Issue model that generates the result. Format: projects/{project}/locations/{location}/issueModels/{issue_model}",
          ).optional(),
          issues: z.array(z.unknown()).describe("All the matched issues.")
            .optional(),
        }).describe("Issue Modeling result on a conversation.").optional(),
        phraseMatchers: z.record(
          z.string(),
          z.object({
            displayName: z.unknown().describe(
              "The human-readable name of the phrase matcher.",
            ).optional(),
            phraseMatcher: z.unknown().describe(
              "The unique identifier (the resource name) of the phrase matcher.",
            ).optional(),
          }),
        ).describe("All the matched phrase matchers in the call.").optional(),
        qaScorecardResults: z.array(z.object({
          agentId: z.unknown().describe(
            "ID of the agent that handled the conversation.",
          ).optional(),
          conversation: z.unknown().describe(
            "The conversation scored by this result.",
          ).optional(),
          createTime: z.unknown().describe(
            "Output only. The timestamp that the revision was created.",
          ).optional(),
          name: z.unknown().describe(
            "Identifier. The name of the scorecard result. Format: projects/{project}/locations/{location}/qaScorecardResults/{qa_scorecard_result}",
          ).optional(),
          normalizedScore: z.unknown().describe(
            "The normalized score, which is the score divided by the potential score. Any manual edits are included if they exist.",
          ).optional(),
          potentialScore: z.unknown().describe(
            "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
          ).optional(),
          qaAnswers: z.unknown().describe(
            "Set of QaAnswers represented in the result.",
          ).optional(),
          qaScorecardRevision: z.unknown().describe(
            "The QaScorecardRevision scored by this result.",
          ).optional(),
          qaTagResults: z.unknown().describe(
            "Collection of tags and their scores.",
          ).optional(),
          score: z.unknown().describe(
            "The overall numerical score of the result, incorporating any manual edits if they exist.",
          ).optional(),
          scoreSources: z.unknown().describe(
            "List of all individual score sets.",
          ).optional(),
        })).describe("Results of scoring QaScorecards.").optional(),
        sentiments: z.array(z.object({
          channelTag: z.unknown().describe(
            "The channel of the audio that the data applies to.",
          ).optional(),
          sentimentData: z.unknown().describe(
            "The data for a sentiment annotation.",
          ).optional(),
        })).describe(
          "Overall conversation-level sentiment for each channel of the call.",
        ).optional(),
        silence: z.object({
          silenceDuration: z.string().describe(
            "Amount of time calculated to be in silence.",
          ).optional(),
          silencePercentage: z.number().describe(
            "Percentage of the total conversation spent in silence.",
          ).optional(),
        }).describe("Conversation-level silence data.").optional(),
      }).describe("Call-specific metadata created during analysis.").optional(),
      endTime: z.string().describe("The time at which the analysis ended.")
        .optional(),
    }).describe("The result of an analysis.").optional(),
    annotatorSelector: z.object({
      issueModels: z.array(z.string()).describe(
        "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
      ).optional(),
      phraseMatchers: z.array(z.string()).describe(
        "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
      ).optional(),
      qaConfig: z.object({
        scorecardList: z.object({
          qaScorecardRevisions: z.array(z.unknown()).describe(
            "List of QaScorecardRevisions.",
          ).optional(),
        }).describe("Container for a list of scorecards.").optional(),
      }).describe("Configuration for the QA feature.").optional(),
      runAutoLabelingAnnotator: z.boolean().describe(
        "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
      ).optional(),
      runEntityAnnotator: z.boolean().describe(
        "Whether to run the entity annotator.",
      ).optional(),
      runIntentAnnotator: z.boolean().describe(
        "Whether to run the intent annotator.",
      ).optional(),
      runInterruptionAnnotator: z.boolean().describe(
        "Whether to run the interruption annotator.",
      ).optional(),
      runIssueModelAnnotator: z.boolean().describe(
        "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
      ).optional(),
      runPhraseMatcherAnnotator: z.boolean().describe(
        "Whether to run the active phrase matcher annotator(s).",
      ).optional(),
      runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
        .optional(),
      runSentimentAnnotator: z.boolean().describe(
        "Whether to run the sentiment annotator.",
      ).optional(),
      runSilenceAnnotator: z.boolean().describe(
        "Whether to run the silence annotator.",
      ).optional(),
      runSummarizationAnnotator: z.boolean().describe(
        "Whether to run the summarization annotator.",
      ).optional(),
      summarizationConfig: z.object({
        conversationProfile: z.string().describe(
          "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
        ).optional(),
        generator: z.string().describe(
          "The resource name of the existing created generator. Format: projects//locations//generators/",
        ).optional(),
        summarizationModel: z.enum([
          "SUMMARIZATION_MODEL_UNSPECIFIED",
          "BASELINE_MODEL",
          "BASELINE_MODEL_V2_0",
        ]).describe("Default summarization model to be used.").optional(),
      }).describe("Configuration for summarization.").optional(),
    }).describe(
      "Selector of all available annotators and phrase matchers to run.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the analysis was created, which occurs when the long-running operation completes.",
    ).optional(),
    name: z.string().describe(
      "Immutable. The resource name of the analysis. Format: projects/{project}/locations/{location}/conversations/{conversation}/analyses/{analysis}",
    ).optional(),
    requestTime: z.string().describe(
      "Output only. The time at which the analysis was requested.",
    ).optional(),
  }).describe("The analysis resource.").optional(),
  latestSummary: z.object({
    answerRecord: z.string().describe(
      "The name of the answer record. Format: projects/{project}/locations/{location}/answerRecords/{answer_record}",
    ).optional(),
    confidence: z.number().describe(
      "The confidence score of the summarization.",
    ).optional(),
    conversationModel: z.string().describe(
      "The name of the model that generates this summary. Format: projects/{project}/locations/{location}/conversationModels/{conversation_model}",
    ).optional(),
    generatorId: z.string().describe("Agent Assist generator ID.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "A map that contains metadata about the summarization and the document from which it originates.",
    ).optional(),
    text: z.string().describe(
      "The summarization content that is concatenated into one string.",
    ).optional(),
    textSections: z.record(z.string(), z.string()).describe(
      "The summarization content that is divided into sections. The key is the section's name and the value is the section's content. There is no specific format for the key or value.",
    ).optional(),
  }).describe("Conversation summarization suggestion data.").optional(),
  medium: z.enum(["MEDIUM_UNSPECIFIED", "PHONE_CALL", "CHAT"]).describe(
    "Immutable. The conversation medium.",
  ).optional(),
  metadataJson: z.string().describe(
    "Input only. JSON metadata encoded as a string. This field is primarily used by Insights integrations with various telephony systems and must be in one of Insight's supported formats.",
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
      }).describe(
        "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
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
  transcript: z.object({
    transcriptSegments: z.array(z.object({
      channelTag: z.number().int().describe(
        "For conversations derived from multi-channel audio, this is the channel number corresponding to the audio from that channel. For audioChannelCount = N, its output values can range from '1' to 'N'. A channel tag of 0 indicates that the audio is mono.",
      ).optional(),
      confidence: z.number().describe(
        "A confidence estimate between 0.0 and 1.0 of the fidelity of this segment. A default value of 0.0 indicates that the value is unset.",
      ).optional(),
      dialogflowSegmentMetadata: z.object({
        smartReplyAllowlistCovered: z.boolean().describe(
          "Whether the transcript segment was covered under the configured smart reply allowlist in Agent Assist.",
        ).optional(),
      }).describe(
        "Metadata from Dialogflow relating to the current transcript segment.",
      ).optional(),
      languageCode: z.string().describe(
        'The language code of this segment as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. Example: "en-US".',
      ).optional(),
      messageTime: z.string().describe(
        "The time that the message occurred, if provided.",
      ).optional(),
      segmentParticipant: z.object({
        dialogflowParticipant: z.string().describe(
          "Deprecated. Use `dialogflow_participant_name` instead. The name of the Dialogflow participant. Format: projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}",
        ).optional(),
        dialogflowParticipantName: z.string().describe(
          "The name of the participant provided by Dialogflow. Format: projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}",
        ).optional(),
        obfuscatedExternalUserId: z.string().describe(
          "Obfuscated user ID from Dialogflow.",
        ).optional(),
        role: z.enum([
          "ROLE_UNSPECIFIED",
          "HUMAN_AGENT",
          "AUTOMATED_AGENT",
          "END_USER",
          "ANY_AGENT",
        ]).describe("The role of the participant.").optional(),
        userId: z.string().describe(
          "A user-specified ID representing the participant.",
        ).optional(),
      }).describe("The call participant speaking for a given utterance.")
        .optional(),
      sentiment: z.object({
        magnitude: z.number().describe(
          "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
        ).optional(),
        score: z.number().describe(
          "The sentiment score between -1.0 (negative) and 1.0 (positive).",
        ).optional(),
      }).describe("The data for a sentiment annotation.").optional(),
      text: z.string().describe("The text of this segment.").optional(),
      turnLevelAudio: z.object({
        audioDuration: z.string().describe("The duration of the audio.")
          .optional(),
        audioGcsUri: z.string().describe(
          "The Cloud Storage URI of the audio for any given turn.",
        ).optional(),
      }).describe("A wrapper for holding the audio for any given turn.")
        .optional(),
      words: z.array(z.object({
        confidence: z.unknown().describe(
          "A confidence estimate between 0.0 and 1.0 of the fidelity of this word. A default value of 0.0 indicates that the value is unset.",
        ).optional(),
        endOffset: z.unknown().describe(
          "Time offset of the end of this word relative to the beginning of the total conversation.",
        ).optional(),
        startOffset: z.unknown().describe(
          "Time offset of the start of this word relative to the beginning of the total conversation.",
        ).optional(),
        word: z.unknown().describe(
          "The word itself. Includes punctuation marks that surround the word.",
        ).optional(),
      })).describe(
        "A list of the word-specific information for each word in the segment.",
      ).optional(),
    })).describe(
      "A list of sequential transcript segments that comprise the conversation.",
    ).optional(),
  }).describe("A message representing the transcript of a conversation.")
    .optional(),
  ttl: z.string().describe(
    "Input only. The TTL for this resource. If specified, then this TTL will be used to calculate the expire time.",
  ).optional(),
  conversationId: z.string().describe(
    "A unique ID for the new conversation. This ID will become the final component of the conversation's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights Conversations. Registered at `@swamp/gcp/contactcenterinsights/conversations`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/conversations",
  version: "2026.05.19.2",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentId"] !== undefined) body["agentId"] = g["agentId"];
        if (g["callMetadata"] !== undefined) {
          body["callMetadata"] = g["callMetadata"];
        }
        if (g["correlationInfo"] !== undefined) {
          body["correlationInfo"] = g["correlationInfo"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["latestAnalysis"] !== undefined) {
          body["latestAnalysis"] = g["latestAnalysis"];
        }
        if (g["latestSummary"] !== undefined) {
          body["latestSummary"] = g["latestSummary"];
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
        if (g["transcript"] !== undefined) body["transcript"] = g["transcript"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
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
      description: "Update conversations attributes",
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
        if (g["agentId"] !== undefined) body["agentId"] = g["agentId"];
        if (g["callMetadata"] !== undefined) {
          body["callMetadata"] = g["callMetadata"];
        }
        if (g["correlationInfo"] !== undefined) {
          body["correlationInfo"] = g["correlationInfo"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["latestAnalysis"] !== undefined) {
          body["latestAnalysis"] = g["latestAnalysis"];
        }
        if (g["latestSummary"] !== undefined) {
          body["latestSummary"] = g["latestSummary"];
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
        if (g["transcript"] !== undefined) body["transcript"] = g["transcript"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
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
      description: "Delete the conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
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
      description: "Sync conversations state from GCP",
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
        );
        return { result };
      },
    },
    calculate_stats: {
      description: "calculate stats",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const result = await createResource(
          BASE_URL,
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
          {},
        );
        return { result };
      },
    },
    generate_signed_audio: {
      description: "generate signed audio",
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
              "contactcenterinsights.projects.locations.conversations.generateSignedAudio",
            "path": "v1/{+name}:generateSignedAudio",
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
