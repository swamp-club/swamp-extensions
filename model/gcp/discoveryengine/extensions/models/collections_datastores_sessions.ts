// Auto-generated extension model for @swamp/gcp/discoveryengine/collections-datastores-sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine Collections.DataStores.Sessions.
 *
 * External session proto definition.
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
  return `${parent}/sessions/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.dataStores.sessions.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "includeAnswerDetails": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.dataStores.sessions.create",
  "path": "v1/{+parent}/sessions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "sessionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.dataStores.sessions.patch",
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
  "id":
    "discoveryengine.projects.locations.collections.dataStores.sessions.delete",
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
  "id":
    "discoveryengine.projects.locations.collections.dataStores.sessions.list",
  "path": "v1/{+parent}/sessions",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Optional. The display name of the session. This field is used to identify the session in the UI. By default, the display name is the first turn query text in the session.",
  ).optional(),
  isPinned: z.boolean().describe(
    "Optional. Whether the session is pinned, pinned session will be displayed on the top of the session list.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. The labels for the session. Can be set as filter in ListSessionsRequest.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*`",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS"]).describe(
    "The state of the session.",
  ).optional(),
  turns: z.array(z.object({
    answer: z.string().describe(
      "Optional. The resource name of the answer to the user query. Only set if the answer generation (/answer API call) happened in this turn.",
    ).optional(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(
        z.enum([
          "ANSWER_SKIPPED_REASON_UNSPECIFIED",
          "ADVERSARIAL_QUERY_IGNORED",
          "NON_ANSWER_SEEKING_QUERY_IGNORED",
          "OUT_OF_DOMAIN_QUERY_IGNORED",
          "POTENTIAL_POLICY_VIOLATION",
          "NO_RELEVANT_CONTENT",
          "JAIL_BREAKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
          "NON_ANSWER_SEEKING_QUERY_IGNORED_V2",
          "LOW_GROUNDED_ANSWER",
          "USER_DEFINED_CLASSIFICATION_QUERY_IGNORED",
          "UNHELPFUL_ANSWER",
        ]),
      ).describe(
        "Additional answer-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
      ).optional(),
      answerText: z.string().describe("The textual answer.").optional(),
      citations: z.array(z.object({
        endIndex: z.unknown().describe(
          "End of the attributed segment, exclusive. Measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
        sources: z.unknown().describe(
          "Citation sources for the attributed segment.",
        ).optional(),
        startIndex: z.unknown().describe(
          "Index indicates the start of the segment, measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
      })).describe("Citations.").optional(),
      completeTime: z.string().describe(
        "Output only. Answer completed timestamp.",
      ).optional(),
      createTime: z.string().describe("Output only. Answer creation timestamp.")
        .optional(),
      groundingScore: z.number().describe(
        "A score in the range of [0, 1] describing how grounded the answer is by the reference chunks.",
      ).optional(),
      groundingSupports: z.array(z.object({
        endIndex: z.unknown().describe("Required. End of the claim, exclusive.")
          .optional(),
        groundingCheckRequired: z.unknown().describe(
          "Indicates that this claim required grounding check. When the system decided this claim didn't require attribution/grounding check, this field is set to false. In that case, no grounding check was done for the claim and therefore `grounding_score`, `sources` is not returned.",
        ).optional(),
        groundingScore: z.unknown().describe(
          "A score in the range of [0, 1] describing how grounded is a specific claim by the references. Higher value means that the claim is better supported by the reference chunks.",
        ).optional(),
        sources: z.unknown().describe(
          "Optional. Citation sources for the claim.",
        ).optional(),
        startIndex: z.unknown().describe(
          "Required. Index indicates the start of the claim, measured in bytes (UTF-8 unicode).",
        ).optional(),
      })).describe("Optional. Grounding supports.").optional(),
      name: z.string().describe(
        "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*/answers/*`",
      ).optional(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.unknown()).describe(
          "Query classification information.",
        ).optional(),
      }).describe("Query understanding information.").optional(),
      references: z.array(z.object({
        chunkInfo: z.unknown().describe("Chunk information.").optional(),
        structuredDocumentInfo: z.unknown().describe(
          "Structured search information.",
        ).optional(),
        unstructuredDocumentInfo: z.unknown().describe(
          "Unstructured document information.",
        ).optional(),
      })).describe("References.").optional(),
      relatedQuestions: z.array(z.string()).describe(
        "Suggested related questions.",
      ).optional(),
      safetyRatings: z.array(z.object({
        blocked: z.unknown().describe(
          "Output only. Indicates whether the content was filtered out because of this rating.",
        ).optional(),
        category: z.unknown().describe("Output only. Harm category.")
          .optional(),
        probability: z.unknown().describe(
          "Output only. Harm probability levels in the content.",
        ).optional(),
        probabilityScore: z.unknown().describe(
          "Output only. Harm probability score.",
        ).optional(),
        severity: z.unknown().describe(
          "Output only. Harm severity levels in the content.",
        ).optional(),
        severityScore: z.unknown().describe("Output only. Harm severity score.")
          .optional(),
      })).describe("Optional. Safety ratings.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "STREAMING",
      ]).describe("The state of the answer generation.").optional(),
      steps: z.array(z.object({
        actions: z.unknown().describe("Actions.").optional(),
        description: z.unknown().describe("The description of the step.")
          .optional(),
        state: z.unknown().describe("The state of the step.").optional(),
        thought: z.unknown().describe("The thought of the step.").optional(),
      })).describe("Answer generation steps.").optional(),
    }).describe("Defines an answer.").optional(),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(
        z.enum([
          "ASSIST_SKIPPED_REASON_UNSPECIFIED",
          "NON_ASSIST_SEEKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
        ]),
      ).describe("Reasons for not answering the assist call.").optional(),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.unknown()).describe(
          "Customer policy enforcement results. Populated only if the assist call was skipped due to a policy violation. It contains results from those filters that blocked the processing of the query.",
        ).optional(),
        verdict: z.enum(["UNSPECIFIED", "ALLOW", "BLOCK"]).describe(
          "Final verdict of the customer policy enforcement. If only one policy blocked the processing, the verdict is BLOCK.",
        ).optional(),
      }).describe(
        "Customer policy enforcement results. Contains the results of the various policy checks, like the banned phrases or the Model Armor checks.",
      ).optional(),
      name: z.string().describe(
        "Immutable. Identifier. Resource name of the `AssistAnswer`. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/sessions/{session}/assistAnswers/{assist_answer}` This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
      ).optional(),
      replies: z.array(z.object({
        createTime: z.unknown().describe("The time when the reply was created.")
          .optional(),
        groundedContent: z.unknown().describe(
          'A piece of content and possibly its grounding information. Not all content needs grounding. Phrases like "Of course, I will gladly search it for you." do not need grounding.',
        ).optional(),
      })).describe("Replies of the assistant.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "SKIPPED",
        "CANCELLED",
      ]).describe("State of the answer generation.").optional(),
    }).describe("AssistAnswer resource, main part of AssistResponse.")
      .optional(),
    live: z.boolean().describe(
      "Optional. Indicates whether this turn is a live turn.",
    ).optional(),
    query: z.object({
      queryId: z.string().describe("Output only. Unique Id for the query.")
        .optional(),
      text: z.string().describe("Plain text.").optional(),
    }).describe("Defines a user inputed query.").optional(),
    queryConfig: z.record(z.string(), z.string()).describe(
      'Optional. Represents metadata related to the query config, for example LLM model and version used, model parameters (temperature, grounding parameters, etc.). The prefix "google." is reserved for Google-developed functionality.',
    ).optional(),
  })).describe("Turns.").optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  sessionId: z.string().describe(
    "Optional. The ID to use for the session, which will become the final component of the session's resource name. This value should be 1-63 characters, and valid characters are /a-z0-9{0,61}[a-z0-9]/. If not specified, a unique ID will be generated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  isPinned: z.boolean().optional(),
  labels: z.array(z.string()).optional(),
  name: z.string(),
  pendingAsyncAssistOperationId: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  turns: z.array(z.object({
    answer: z.string(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(z.string()),
      answerText: z.string(),
      citations: z.array(z.object({
        endIndex: z.unknown(),
        sources: z.unknown(),
        startIndex: z.unknown(),
      })),
      completeTime: z.string(),
      createTime: z.string(),
      groundingScore: z.number(),
      groundingSupports: z.array(z.object({
        endIndex: z.unknown(),
        groundingCheckRequired: z.unknown(),
        groundingScore: z.unknown(),
        sources: z.unknown(),
        startIndex: z.unknown(),
      })),
      name: z.string(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.unknown()),
      }),
      references: z.array(z.object({
        chunkInfo: z.unknown(),
        structuredDocumentInfo: z.unknown(),
        unstructuredDocumentInfo: z.unknown(),
      })),
      relatedQuestions: z.array(z.string()),
      safetyRatings: z.array(z.object({
        blocked: z.unknown(),
        category: z.unknown(),
        probability: z.unknown(),
        probabilityScore: z.unknown(),
        severity: z.unknown(),
        severityScore: z.unknown(),
      })),
      state: z.string(),
      steps: z.array(z.object({
        actions: z.unknown(),
        description: z.unknown(),
        state: z.unknown(),
        thought: z.unknown(),
      })),
    }),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(z.string()),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.unknown()),
        verdict: z.string(),
      }),
      name: z.string(),
      replies: z.array(z.object({
        createTime: z.unknown(),
        groundedContent: z.unknown(),
      })),
      state: z.string(),
    }),
    live: z.boolean(),
    query: z.object({
      queryId: z.string(),
      text: z.string(),
    }),
    queryConfig: z.record(z.string(), z.unknown()),
  })).optional(),
  userPseudoId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. The display name of the session. This field is used to identify the session in the UI. By default, the display name is the first turn query text in the session.",
  ).optional(),
  isPinned: z.boolean().describe(
    "Optional. Whether the session is pinned, pinned session will be displayed on the top of the session list.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. The labels for the session. Can be set as filter in ListSessionsRequest.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*`",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS"]).describe(
    "The state of the session.",
  ).optional(),
  turns: z.array(z.object({
    answer: z.string().describe(
      "Optional. The resource name of the answer to the user query. Only set if the answer generation (/answer API call) happened in this turn.",
    ).optional(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(
        z.enum([
          "ANSWER_SKIPPED_REASON_UNSPECIFIED",
          "ADVERSARIAL_QUERY_IGNORED",
          "NON_ANSWER_SEEKING_QUERY_IGNORED",
          "OUT_OF_DOMAIN_QUERY_IGNORED",
          "POTENTIAL_POLICY_VIOLATION",
          "NO_RELEVANT_CONTENT",
          "JAIL_BREAKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
          "NON_ANSWER_SEEKING_QUERY_IGNORED_V2",
          "LOW_GROUNDED_ANSWER",
          "USER_DEFINED_CLASSIFICATION_QUERY_IGNORED",
          "UNHELPFUL_ANSWER",
        ]),
      ).describe(
        "Additional answer-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
      ).optional(),
      answerText: z.string().describe("The textual answer.").optional(),
      citations: z.array(z.object({
        endIndex: z.unknown().describe(
          "End of the attributed segment, exclusive. Measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
        sources: z.unknown().describe(
          "Citation sources for the attributed segment.",
        ).optional(),
        startIndex: z.unknown().describe(
          "Index indicates the start of the segment, measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
      })).describe("Citations.").optional(),
      completeTime: z.string().describe(
        "Output only. Answer completed timestamp.",
      ).optional(),
      createTime: z.string().describe("Output only. Answer creation timestamp.")
        .optional(),
      groundingScore: z.number().describe(
        "A score in the range of [0, 1] describing how grounded the answer is by the reference chunks.",
      ).optional(),
      groundingSupports: z.array(z.object({
        endIndex: z.unknown().describe("Required. End of the claim, exclusive.")
          .optional(),
        groundingCheckRequired: z.unknown().describe(
          "Indicates that this claim required grounding check. When the system decided this claim didn't require attribution/grounding check, this field is set to false. In that case, no grounding check was done for the claim and therefore `grounding_score`, `sources` is not returned.",
        ).optional(),
        groundingScore: z.unknown().describe(
          "A score in the range of [0, 1] describing how grounded is a specific claim by the references. Higher value means that the claim is better supported by the reference chunks.",
        ).optional(),
        sources: z.unknown().describe(
          "Optional. Citation sources for the claim.",
        ).optional(),
        startIndex: z.unknown().describe(
          "Required. Index indicates the start of the claim, measured in bytes (UTF-8 unicode).",
        ).optional(),
      })).describe("Optional. Grounding supports.").optional(),
      name: z.string().describe(
        "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*/answers/*`",
      ).optional(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.unknown()).describe(
          "Query classification information.",
        ).optional(),
      }).describe("Query understanding information.").optional(),
      references: z.array(z.object({
        chunkInfo: z.unknown().describe("Chunk information.").optional(),
        structuredDocumentInfo: z.unknown().describe(
          "Structured search information.",
        ).optional(),
        unstructuredDocumentInfo: z.unknown().describe(
          "Unstructured document information.",
        ).optional(),
      })).describe("References.").optional(),
      relatedQuestions: z.array(z.string()).describe(
        "Suggested related questions.",
      ).optional(),
      safetyRatings: z.array(z.object({
        blocked: z.unknown().describe(
          "Output only. Indicates whether the content was filtered out because of this rating.",
        ).optional(),
        category: z.unknown().describe("Output only. Harm category.")
          .optional(),
        probability: z.unknown().describe(
          "Output only. Harm probability levels in the content.",
        ).optional(),
        probabilityScore: z.unknown().describe(
          "Output only. Harm probability score.",
        ).optional(),
        severity: z.unknown().describe(
          "Output only. Harm severity levels in the content.",
        ).optional(),
        severityScore: z.unknown().describe("Output only. Harm severity score.")
          .optional(),
      })).describe("Optional. Safety ratings.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "STREAMING",
      ]).describe("The state of the answer generation.").optional(),
      steps: z.array(z.object({
        actions: z.unknown().describe("Actions.").optional(),
        description: z.unknown().describe("The description of the step.")
          .optional(),
        state: z.unknown().describe("The state of the step.").optional(),
        thought: z.unknown().describe("The thought of the step.").optional(),
      })).describe("Answer generation steps.").optional(),
    }).describe("Defines an answer.").optional(),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(
        z.enum([
          "ASSIST_SKIPPED_REASON_UNSPECIFIED",
          "NON_ASSIST_SEEKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
        ]),
      ).describe("Reasons for not answering the assist call.").optional(),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.unknown()).describe(
          "Customer policy enforcement results. Populated only if the assist call was skipped due to a policy violation. It contains results from those filters that blocked the processing of the query.",
        ).optional(),
        verdict: z.enum(["UNSPECIFIED", "ALLOW", "BLOCK"]).describe(
          "Final verdict of the customer policy enforcement. If only one policy blocked the processing, the verdict is BLOCK.",
        ).optional(),
      }).describe(
        "Customer policy enforcement results. Contains the results of the various policy checks, like the banned phrases or the Model Armor checks.",
      ).optional(),
      name: z.string().describe(
        "Immutable. Identifier. Resource name of the `AssistAnswer`. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/sessions/{session}/assistAnswers/{assist_answer}` This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
      ).optional(),
      replies: z.array(z.object({
        createTime: z.unknown().describe("The time when the reply was created.")
          .optional(),
        groundedContent: z.unknown().describe(
          'A piece of content and possibly its grounding information. Not all content needs grounding. Phrases like "Of course, I will gladly search it for you." do not need grounding.',
        ).optional(),
      })).describe("Replies of the assistant.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "SKIPPED",
        "CANCELLED",
      ]).describe("State of the answer generation.").optional(),
    }).describe("AssistAnswer resource, main part of AssistResponse.")
      .optional(),
    live: z.boolean().describe(
      "Optional. Indicates whether this turn is a live turn.",
    ).optional(),
    query: z.object({
      queryId: z.string().describe("Output only. Unique Id for the query.")
        .optional(),
      text: z.string().describe("Plain text.").optional(),
    }).describe("Defines a user inputed query.").optional(),
    queryConfig: z.record(z.string(), z.string()).describe(
      'Optional. Represents metadata related to the query config, for example LLM model and version used, model parameters (temperature, grounding parameters, etc.). The prefix "google." is reserved for Google-developed functionality.',
    ).optional(),
  })).describe("Turns.").optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  sessionId: z.string().describe(
    "Optional. The ID to use for the session, which will become the final component of the session's resource name. This value should be 1-63 characters, and valid characters are /a-z0-9{0,61}[a-z0-9]/. If not specified, a unique ID will be generated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine Collections.DataStores.Sessions. Registered at `@swamp/gcp/discoveryengine/collections-datastores-sessions`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/collections-datastores-sessions",
  version: "2026.05.26.1",
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
      description: "Added: sessionId",
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
      description: "Removed: sessionId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { sessionId: _sessionId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: sessionId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: sessionId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { sessionId: _sessionId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: sessionId",
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
      description: "Removed: sessionId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { sessionId: _sessionId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: sessionId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "External session proto definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isPinned"] !== undefined) body["isPinned"] = g["isPinned"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["turns"] !== undefined) body["turns"] = g["turns"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
        }
        if (g["sessionId"] !== undefined) body["sessionId"] = g["sessionId"];
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
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
      description: "Update sessions attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isPinned"] !== undefined) body["isPinned"] = g["isPinned"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["turns"] !== undefined) body["turns"] = g["turns"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
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
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
      description: "Sync sessions state from GCP",
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
      description: "List sessions resources",
      arguments: z.object({
        filter: z.string().describe(
          'A comma-separated list of fields to filter by, in EBNF grammar. The supported fields are: * `user_pseudo_id` * `state` * `display_name` * `starred` * `is_pinned` * `labels` * `create_time` * `update_time` * `collaborative_project` Examples: * `user_pseudo_id = some_id` * `display_name = "some_name"` * `starred = true` * `is_pinned=true AND (NOT labels:hidden)` * `create_time > "1970-01-01T12:00:00Z"` * `collaborative_project = "projects/123/locations/global/collections/default_collection/engines/" "default_engine/collaborative_projects/cp1"`',
        ).optional(),
        orderBy: z.string().describe(
          'A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * `update_time` * `create_time` * `session_name` * `is_pinned` Example: * `update_time desc` * `create_time` * `is_pinned desc,update_time desc`: list sessions by is_pinned first, then by update_time.',
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of results to return. If unspecified, defaults to 50. Max allowed value is 1000.",
        ).optional(),
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "sessions",
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
  },
};
