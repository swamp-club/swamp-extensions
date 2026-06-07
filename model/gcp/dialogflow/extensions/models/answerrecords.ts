// Auto-generated extension model for @swamp/gcp/dialogflow/answerrecords
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow AnswerRecords.
 *
 * GCP dialogflow AnswerRecords resource
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dialogflow.googleapis.com/";

const PATCH_CONFIG = {
  "id": "dialogflow.projects.answerRecords.patch",
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

const LIST_CONFIG = {
  "id": "dialogflow.projects.answerRecords.list",
  "path": "v2/{+parent}/answerRecords",
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
  agentAssistantRecord: z.object({
    articleSuggestionAnswer: z.object({
      answerRecord: z.string().optional(),
      confidence: z.number().optional(),
      metadata: z.record(z.string(), z.string()).optional(),
      snippets: z.array(z.string()).optional(),
      title: z.string().optional(),
      uri: z.string().optional(),
    }).optional(),
    dialogflowAssistAnswer: z.object({
      answerRecord: z.string().optional(),
      intentSuggestion: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        intentV2: z.string().optional(),
      }).optional(),
      queryResult: z.object({
        action: z.string().optional(),
        allRequiredParamsPresent: z.boolean().optional(),
        cancelsSlotFilling: z.boolean().optional(),
        diagnosticInfo: z.record(z.string(), z.string()).optional(),
        fulfillmentMessages: z.array(z.object({
          basicCard: z.unknown().optional(),
          browseCarouselCard: z.unknown().optional(),
          card: z.unknown().optional(),
          carouselSelect: z.unknown().optional(),
          image: z.unknown().optional(),
          linkOutSuggestion: z.unknown().optional(),
          listSelect: z.unknown().optional(),
          mediaContent: z.unknown().optional(),
          payload: z.unknown().optional(),
          platform: z.unknown().optional(),
          quickReplies: z.unknown().optional(),
          simpleResponses: z.unknown().optional(),
          suggestions: z.unknown().optional(),
          tableCard: z.unknown().optional(),
          text: z.unknown().optional(),
        })).optional(),
        fulfillmentText: z.string().optional(),
        intent: z.object({
          action: z.string().optional(),
          defaultResponsePlatforms: z.array(z.unknown()).optional(),
          displayName: z.string().optional(),
          endInteraction: z.boolean().optional(),
          events: z.array(z.unknown()).optional(),
          followupIntentInfo: z.array(z.unknown()).optional(),
          inputContextNames: z.array(z.unknown()).optional(),
          isFallback: z.boolean().optional(),
          liveAgentHandoff: z.boolean().optional(),
          messages: z.array(z.unknown()).optional(),
          mlDisabled: z.boolean().optional(),
          name: z.string().optional(),
          outputContexts: z.array(z.unknown()).optional(),
          parameters: z.array(z.unknown()).optional(),
          parentFollowupIntentName: z.string().optional(),
          priority: z.number().int().optional(),
          resetContexts: z.boolean().optional(),
          rootFollowupIntentName: z.string().optional(),
          trainingPhrases: z.array(z.unknown()).optional(),
          webhookState: z.enum([
            "WEBHOOK_STATE_UNSPECIFIED",
            "WEBHOOK_STATE_ENABLED",
            "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING",
          ]).optional(),
        }).optional(),
        intentDetectionConfidence: z.number().optional(),
        languageCode: z.string().optional(),
        outputContexts: z.array(z.object({
          lifespanCount: z.unknown().optional(),
          name: z.unknown().optional(),
          parameters: z.unknown().optional(),
        })).optional(),
        parameters: z.record(z.string(), z.string()).optional(),
        queryText: z.string().optional(),
        sentimentAnalysisResult: z.object({
          queryTextSentiment: z.object({
            magnitude: z.unknown().optional(),
            score: z.unknown().optional(),
          }).optional(),
        }).optional(),
        speechRecognitionConfidence: z.number().optional(),
        webhookPayload: z.record(z.string(), z.string()).optional(),
        webhookSource: z.string().optional(),
      }).optional(),
    }).optional(),
    faqAnswer: z.object({
      answer: z.string().optional(),
      answerRecord: z.string().optional(),
      confidence: z.number().optional(),
      metadata: z.record(z.string(), z.string()).optional(),
      question: z.string().optional(),
      source: z.string().optional(),
    }).optional(),
    generatorSuggestion: z.object({
      agentCoachingSuggestion: z.object({
        agentActionSuggestions: z.array(z.object({
          agentAction: z.unknown().optional(),
          duplicateCheckResult: z.unknown().optional(),
          sources: z.unknown().optional(),
        })).optional(),
        applicableInstructions: z.array(z.object({
          agentAction: z.unknown().optional(),
          condition: z.unknown().optional(),
          displayDetails: z.unknown().optional(),
          displayName: z.unknown().optional(),
          duplicateCheckResult: z.unknown().optional(),
          systemAction: z.unknown().optional(),
          triggeringEvent: z.unknown().optional(),
        })).optional(),
        sampleResponses: z.array(z.object({
          duplicateCheckResult: z.unknown().optional(),
          responseText: z.unknown().optional(),
          sources: z.unknown().optional(),
        })).optional(),
      }).optional(),
      freeFormSuggestion: z.object({
        response: z.string().optional(),
      }).optional(),
      summarySuggestion: z.object({
        summarySections: z.array(z.object({
          section: z.unknown().optional(),
          summary: z.unknown().optional(),
        })).optional(),
      }).optional(),
      toolCallInfo: z.array(z.object({
        toolCall: z.object({
          action: z.unknown().optional(),
          answerRecord: z.unknown().optional(),
          cesApp: z.unknown().optional(),
          cesTool: z.unknown().optional(),
          cesToolset: z.unknown().optional(),
          createTime: z.unknown().optional(),
          inputParameters: z.unknown().optional(),
          state: z.unknown().optional(),
          tool: z.unknown().optional(),
          toolDisplayDetails: z.unknown().optional(),
          toolDisplayName: z.unknown().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.unknown().optional(),
          answerRecord: z.unknown().optional(),
          cesApp: z.unknown().optional(),
          cesTool: z.unknown().optional(),
          cesToolset: z.unknown().optional(),
          content: z.unknown().optional(),
          createTime: z.unknown().optional(),
          error: z.unknown().optional(),
          rawContent: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  answerFeedback: z.object({
    agentAssistantDetailFeedback: z.object({
      answerRelevance: z.enum([
        "ANSWER_RELEVANCE_UNSPECIFIED",
        "IRRELEVANT",
        "RELEVANT",
      ]).optional(),
      documentCorrectness: z.enum([
        "DOCUMENT_CORRECTNESS_UNSPECIFIED",
        "INCORRECT",
        "CORRECT",
      ]).optional(),
      documentEfficiency: z.enum([
        "DOCUMENT_EFFICIENCY_UNSPECIFIED",
        "INEFFICIENT",
        "EFFICIENT",
      ]).optional(),
      knowledgeAssistFeedback: z.object({
        answerCopied: z.boolean().optional(),
        clickedUris: z.array(z.string()).optional(),
      }).optional(),
      knowledgeSearchFeedback: z.object({
        answerCopied: z.boolean().optional(),
        clickedUris: z.array(z.string()).optional(),
      }).optional(),
      summarizationFeedback: z.object({
        startTime: z.string().optional(),
        submitTime: z.string().optional(),
        summaryText: z.string().optional(),
        textSections: z.record(z.string(), z.string()).optional(),
      }).optional(),
    }).optional(),
    clickTime: z.string().optional(),
    clicked: z.boolean().optional(),
    correctnessLevel: z.enum([
      "CORRECTNESS_LEVEL_UNSPECIFIED",
      "NOT_CORRECT",
      "PARTIALLY_CORRECT",
      "FULLY_CORRECT",
    ]).optional(),
    displayTime: z.string().optional(),
    displayed: z.boolean().optional(),
  }).optional(),
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentAssistantRecord: z.object({
    articleSuggestionAnswer: z.object({
      answerRecord: z.string(),
      confidence: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      snippets: z.array(z.string()),
      title: z.string(),
      uri: z.string(),
    }),
    dialogflowAssistAnswer: z.object({
      answerRecord: z.string(),
      intentSuggestion: z.object({
        description: z.string(),
        displayName: z.string(),
        intentV2: z.string(),
      }),
      queryResult: z.object({
        action: z.string(),
        allRequiredParamsPresent: z.boolean(),
        cancelsSlotFilling: z.boolean(),
        diagnosticInfo: z.record(z.string(), z.unknown()),
        fulfillmentMessages: z.array(z.object({
          basicCard: z.unknown(),
          browseCarouselCard: z.unknown(),
          card: z.unknown(),
          carouselSelect: z.unknown(),
          image: z.unknown(),
          linkOutSuggestion: z.unknown(),
          listSelect: z.unknown(),
          mediaContent: z.unknown(),
          payload: z.unknown(),
          platform: z.unknown(),
          quickReplies: z.unknown(),
          simpleResponses: z.unknown(),
          suggestions: z.unknown(),
          tableCard: z.unknown(),
          text: z.unknown(),
        })),
        fulfillmentText: z.string(),
        intent: z.object({
          action: z.string(),
          defaultResponsePlatforms: z.array(z.unknown()),
          displayName: z.string(),
          endInteraction: z.boolean(),
          events: z.array(z.unknown()),
          followupIntentInfo: z.array(z.unknown()),
          inputContextNames: z.array(z.unknown()),
          isFallback: z.boolean(),
          liveAgentHandoff: z.boolean(),
          messages: z.array(z.unknown()),
          mlDisabled: z.boolean(),
          name: z.string(),
          outputContexts: z.array(z.unknown()),
          parameters: z.array(z.unknown()),
          parentFollowupIntentName: z.string(),
          priority: z.number(),
          resetContexts: z.boolean(),
          rootFollowupIntentName: z.string(),
          trainingPhrases: z.array(z.unknown()),
          webhookState: z.string(),
        }),
        intentDetectionConfidence: z.number(),
        languageCode: z.string(),
        outputContexts: z.array(z.object({
          lifespanCount: z.unknown(),
          name: z.unknown(),
          parameters: z.unknown(),
        })),
        parameters: z.record(z.string(), z.unknown()),
        queryText: z.string(),
        sentimentAnalysisResult: z.object({
          queryTextSentiment: z.object({
            magnitude: z.unknown(),
            score: z.unknown(),
          }),
        }),
        speechRecognitionConfidence: z.number(),
        webhookPayload: z.record(z.string(), z.unknown()),
        webhookSource: z.string(),
      }),
    }),
    faqAnswer: z.object({
      answer: z.string(),
      answerRecord: z.string(),
      confidence: z.number(),
      metadata: z.record(z.string(), z.unknown()),
      question: z.string(),
      source: z.string(),
    }),
    generatorSuggestion: z.object({
      agentCoachingSuggestion: z.object({
        agentActionSuggestions: z.array(z.object({
          agentAction: z.unknown(),
          duplicateCheckResult: z.unknown(),
          sources: z.unknown(),
        })),
        applicableInstructions: z.array(z.object({
          agentAction: z.unknown(),
          condition: z.unknown(),
          displayDetails: z.unknown(),
          displayName: z.unknown(),
          duplicateCheckResult: z.unknown(),
          systemAction: z.unknown(),
          triggeringEvent: z.unknown(),
        })),
        sampleResponses: z.array(z.object({
          duplicateCheckResult: z.unknown(),
          responseText: z.unknown(),
          sources: z.unknown(),
        })),
      }),
      freeFormSuggestion: z.object({
        response: z.string(),
      }),
      summarySuggestion: z.object({
        summarySections: z.array(z.object({
          section: z.unknown(),
          summary: z.unknown(),
        })),
      }),
      toolCallInfo: z.array(z.object({
        toolCall: z.object({
          action: z.unknown(),
          answerRecord: z.unknown(),
          cesApp: z.unknown(),
          cesTool: z.unknown(),
          cesToolset: z.unknown(),
          createTime: z.unknown(),
          inputParameters: z.unknown(),
          state: z.unknown(),
          tool: z.unknown(),
          toolDisplayDetails: z.unknown(),
          toolDisplayName: z.unknown(),
        }),
        toolCallResult: z.object({
          action: z.unknown(),
          answerRecord: z.unknown(),
          cesApp: z.unknown(),
          cesTool: z.unknown(),
          cesToolset: z.unknown(),
          content: z.unknown(),
          createTime: z.unknown(),
          error: z.unknown(),
          rawContent: z.unknown(),
          tool: z.unknown(),
        }),
      })),
    }),
  }).optional(),
  answerFeedback: z.object({
    agentAssistantDetailFeedback: z.object({
      answerRelevance: z.string(),
      documentCorrectness: z.string(),
      documentEfficiency: z.string(),
      knowledgeAssistFeedback: z.object({
        answerCopied: z.boolean(),
        clickedUris: z.array(z.string()),
      }),
      knowledgeSearchFeedback: z.object({
        answerCopied: z.boolean(),
        clickedUris: z.array(z.string()),
      }),
      summarizationFeedback: z.object({
        startTime: z.string(),
        submitTime: z.string(),
        summaryText: z.string(),
        textSections: z.record(z.string(), z.unknown()),
      }),
    }),
    clickTime: z.string(),
    clicked: z.boolean(),
    correctnessLevel: z.string(),
    displayTime: z.string(),
    displayed: z.boolean(),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  agentAssistantRecord: z.object({
    articleSuggestionAnswer: z.object({
      answerRecord: z.string().optional(),
      confidence: z.number().optional(),
      metadata: z.record(z.string(), z.string()).optional(),
      snippets: z.array(z.string()).optional(),
      title: z.string().optional(),
      uri: z.string().optional(),
    }).optional(),
    dialogflowAssistAnswer: z.object({
      answerRecord: z.string().optional(),
      intentSuggestion: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        intentV2: z.string().optional(),
      }).optional(),
      queryResult: z.object({
        action: z.string().optional(),
        allRequiredParamsPresent: z.boolean().optional(),
        cancelsSlotFilling: z.boolean().optional(),
        diagnosticInfo: z.record(z.string(), z.string()).optional(),
        fulfillmentMessages: z.array(z.object({
          basicCard: z.unknown().optional(),
          browseCarouselCard: z.unknown().optional(),
          card: z.unknown().optional(),
          carouselSelect: z.unknown().optional(),
          image: z.unknown().optional(),
          linkOutSuggestion: z.unknown().optional(),
          listSelect: z.unknown().optional(),
          mediaContent: z.unknown().optional(),
          payload: z.unknown().optional(),
          platform: z.unknown().optional(),
          quickReplies: z.unknown().optional(),
          simpleResponses: z.unknown().optional(),
          suggestions: z.unknown().optional(),
          tableCard: z.unknown().optional(),
          text: z.unknown().optional(),
        })).optional(),
        fulfillmentText: z.string().optional(),
        intent: z.object({
          action: z.string().optional(),
          defaultResponsePlatforms: z.array(z.unknown()).optional(),
          displayName: z.string().optional(),
          endInteraction: z.boolean().optional(),
          events: z.array(z.unknown()).optional(),
          followupIntentInfo: z.array(z.unknown()).optional(),
          inputContextNames: z.array(z.unknown()).optional(),
          isFallback: z.boolean().optional(),
          liveAgentHandoff: z.boolean().optional(),
          messages: z.array(z.unknown()).optional(),
          mlDisabled: z.boolean().optional(),
          name: z.string().optional(),
          outputContexts: z.array(z.unknown()).optional(),
          parameters: z.array(z.unknown()).optional(),
          parentFollowupIntentName: z.string().optional(),
          priority: z.number().int().optional(),
          resetContexts: z.boolean().optional(),
          rootFollowupIntentName: z.string().optional(),
          trainingPhrases: z.array(z.unknown()).optional(),
          webhookState: z.enum([
            "WEBHOOK_STATE_UNSPECIFIED",
            "WEBHOOK_STATE_ENABLED",
            "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING",
          ]).optional(),
        }).optional(),
        intentDetectionConfidence: z.number().optional(),
        languageCode: z.string().optional(),
        outputContexts: z.array(z.object({
          lifespanCount: z.unknown().optional(),
          name: z.unknown().optional(),
          parameters: z.unknown().optional(),
        })).optional(),
        parameters: z.record(z.string(), z.string()).optional(),
        queryText: z.string().optional(),
        sentimentAnalysisResult: z.object({
          queryTextSentiment: z.object({
            magnitude: z.unknown().optional(),
            score: z.unknown().optional(),
          }).optional(),
        }).optional(),
        speechRecognitionConfidence: z.number().optional(),
        webhookPayload: z.record(z.string(), z.string()).optional(),
        webhookSource: z.string().optional(),
      }).optional(),
    }).optional(),
    faqAnswer: z.object({
      answer: z.string().optional(),
      answerRecord: z.string().optional(),
      confidence: z.number().optional(),
      metadata: z.record(z.string(), z.string()).optional(),
      question: z.string().optional(),
      source: z.string().optional(),
    }).optional(),
    generatorSuggestion: z.object({
      agentCoachingSuggestion: z.object({
        agentActionSuggestions: z.array(z.object({
          agentAction: z.unknown().optional(),
          duplicateCheckResult: z.unknown().optional(),
          sources: z.unknown().optional(),
        })).optional(),
        applicableInstructions: z.array(z.object({
          agentAction: z.unknown().optional(),
          condition: z.unknown().optional(),
          displayDetails: z.unknown().optional(),
          displayName: z.unknown().optional(),
          duplicateCheckResult: z.unknown().optional(),
          systemAction: z.unknown().optional(),
          triggeringEvent: z.unknown().optional(),
        })).optional(),
        sampleResponses: z.array(z.object({
          duplicateCheckResult: z.unknown().optional(),
          responseText: z.unknown().optional(),
          sources: z.unknown().optional(),
        })).optional(),
      }).optional(),
      freeFormSuggestion: z.object({
        response: z.string().optional(),
      }).optional(),
      summarySuggestion: z.object({
        summarySections: z.array(z.object({
          section: z.unknown().optional(),
          summary: z.unknown().optional(),
        })).optional(),
      }).optional(),
      toolCallInfo: z.array(z.object({
        toolCall: z.object({
          action: z.unknown().optional(),
          answerRecord: z.unknown().optional(),
          cesApp: z.unknown().optional(),
          cesTool: z.unknown().optional(),
          cesToolset: z.unknown().optional(),
          createTime: z.unknown().optional(),
          inputParameters: z.unknown().optional(),
          state: z.unknown().optional(),
          tool: z.unknown().optional(),
          toolDisplayDetails: z.unknown().optional(),
          toolDisplayName: z.unknown().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.unknown().optional(),
          answerRecord: z.unknown().optional(),
          cesApp: z.unknown().optional(),
          cesTool: z.unknown().optional(),
          cesToolset: z.unknown().optional(),
          content: z.unknown().optional(),
          createTime: z.unknown().optional(),
          error: z.unknown().optional(),
          rawContent: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  answerFeedback: z.object({
    agentAssistantDetailFeedback: z.object({
      answerRelevance: z.enum([
        "ANSWER_RELEVANCE_UNSPECIFIED",
        "IRRELEVANT",
        "RELEVANT",
      ]).optional(),
      documentCorrectness: z.enum([
        "DOCUMENT_CORRECTNESS_UNSPECIFIED",
        "INCORRECT",
        "CORRECT",
      ]).optional(),
      documentEfficiency: z.enum([
        "DOCUMENT_EFFICIENCY_UNSPECIFIED",
        "INEFFICIENT",
        "EFFICIENT",
      ]).optional(),
      knowledgeAssistFeedback: z.object({
        answerCopied: z.boolean().optional(),
        clickedUris: z.array(z.string()).optional(),
      }).optional(),
      knowledgeSearchFeedback: z.object({
        answerCopied: z.boolean().optional(),
        clickedUris: z.array(z.string()).optional(),
      }).optional(),
      summarizationFeedback: z.object({
        startTime: z.string().optional(),
        submitTime: z.string().optional(),
        summaryText: z.string().optional(),
        textSections: z.record(z.string(), z.string()).optional(),
      }).optional(),
    }).optional(),
    clickTime: z.string().optional(),
    clicked: z.boolean().optional(),
    correctnessLevel: z.enum([
      "CORRECTNESS_LEVEL_UNSPECIFIED",
      "NOT_CORRECT",
      "PARTIALLY_CORRECT",
      "FULLY_CORRECT",
    ]).optional(),
    displayTime: z.string().optional(),
    displayed: z.boolean().optional(),
  }).optional(),
  name: z.string().optional(),
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

/** Swamp extension model for Google Cloud Dialogflow AnswerRecords. Registered at `@swamp/gcp/dialogflow/answerrecords`. */
export const model = {
  type: "@swamp/gcp/dialogflow/answerrecords",
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
      description: "GCP dialogflow AnswerRecords resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a answerRecords",
      arguments: z.object({
        identifier: z.string().describe("The name of the answerRecords"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update answerRecords attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["agentAssistantRecord"] !== undefined) {
          body["agentAssistantRecord"] = g["agentAssistantRecord"];
        }
        if (g["answerFeedback"] !== undefined) {
          body["answerFeedback"] = g["answerFeedback"];
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
          undefined,
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
    sync: {
      description: "Sync answerRecords state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List answerRecords resources",
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
          "answerRecords",
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
