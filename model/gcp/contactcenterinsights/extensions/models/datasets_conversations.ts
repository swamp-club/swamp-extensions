// Auto-generated extension model for @swamp/gcp/contactcenterinsights/datasets-conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights Datasets.Conversations.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.datasets.conversations.get",
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
    "contactcenterinsights.projects.locations.datasets.conversations.delete",
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
  "id": "contactcenterinsights.projects.locations.datasets.conversations.list",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Contact Center AI Insights Datasets.Conversations. Registered at `@swamp/gcp/contactcenterinsights/datasets-conversations`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/datasets-conversations",
  version: "2026.06.07.1",
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
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.datasets.conversations.bulkDelete",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.datasets.conversations.calculateStats",
            "path": "v1/{+location}/conversations:calculateStats",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
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
    generate_signed_audio: {
      description: "generate signed audio",
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
            "id":
              "contactcenterinsights.projects.locations.datasets.conversations.generateSignedAudio",
            "path": "v1/{+name}:generateSignedAudio",
            "httpMethod": "GET",
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
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.datasets.conversations.ingest",
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
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.datasets.conversations.sample",
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
  },
};
