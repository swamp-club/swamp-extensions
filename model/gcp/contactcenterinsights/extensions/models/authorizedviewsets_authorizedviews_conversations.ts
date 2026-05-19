// Auto-generated extension model for @swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.get",
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

const DELETE_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations. Registered at `@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations`. */
export const model = {
  type:
    "@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations",
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
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.calculateStats",
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
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.generateSignedAudio",
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
  },
};
