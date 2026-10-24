// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/aiplatform/evaluationitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform EvaluationItems.
 *
 * EvaluationItem is a single evaluation request or result. The content of an EvaluationItem is immutable - it cannot be updated once created. EvaluationItems can be deleted when no longer needed.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/evaluationItems/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationItems.get",
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
  "id": "aiplatform.projects.locations.evaluationItems.create",
  "path": "v1/{+parent}/evaluationItems",
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

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationItems.delete",
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
  "id": "aiplatform.projects.locations.evaluationItems.list",
  "path": "v1/{+parent}/evaluationItems",
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
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
  ).optional(),
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      agentData: z.object({
        agents: z.record(z.string(), z.unknown()).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.unknown()).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This field is used to provide the full output of an agent's run, including all turns and events, for direct evaluation.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
      ).optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Output only. Error while scraping model or agent.")
        .optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
      agentData: z.object({
        agents: z.record(
          z.string(),
          z.object({
            agentId: z.unknown().describe(
              "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
            ).optional(),
            agentType: z.unknown().describe(
              'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
            ).optional(),
            description: z.unknown().describe(
              "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
            ).optional(),
            instruction: z.unknown().describe(
              "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
            ).optional(),
            subAgents: z.unknown().describe(
              "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
            ).optional(),
            tools: z.unknown().describe(
              "Optional. The list of tools available to this agent.",
            ).optional(),
          }),
        ).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.object({
          events: z.unknown().describe(
            "Optional. The list of events that occurred during this turn.",
          ).optional(),
          turnId: z.unknown().describe(
            "Optional. A unique identifier for the turn. Useful for referencing specific turns across systems.",
          ).optional(),
          turnIndex: z.unknown().describe(
            "Required. The 0-based index of the turn in the conversation sequence.",
          ).optional(),
        })).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This field is used to provide the full output of an agent's run, including all turns and events, for direct evaluation.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
      ).optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Output only. Error while scraping model or agent.")
        .optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Optional. The Ideal response or ground truth.").optional(),
    prompt: z.object({
      agentData: z.object({
        agents: z.record(
          z.string(),
          z.object({
            agentId: z.unknown().describe(
              "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
            ).optional(),
            agentType: z.unknown().describe(
              'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
            ).optional(),
            description: z.unknown().describe(
              "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
            ).optional(),
            instruction: z.unknown().describe(
              "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
            ).optional(),
            subAgents: z.unknown().describe(
              "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
            ).optional(),
            tools: z.unknown().describe(
              "Optional. The list of tools available to this agent.",
            ).optional(),
          }),
        ).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.object({
          events: z.unknown().describe(
            "Optional. The list of events that occurred during this turn.",
          ).optional(),
          turnId: z.unknown().describe(
            "Optional. A unique identifier for the turn. Useful for referencing specific turns across systems.",
          ).optional(),
          turnIndex: z.unknown().describe(
            "Required. The 0-based index of the turn in the conversation sequence.",
          ).optional(),
        })).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This serves as the input context for agent scraping.",
      ).optional(),
      promptTemplateData: z.object({
        values: z.record(
          z.string(),
          z.object({
            parts: z.unknown().describe(
              "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
            ).optional(),
            role: z.unknown().describe(
              "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
            ).optional(),
          }),
        ).describe("The values for fields in the prompt template.").optional(),
      }).describe("Prompt template data.").optional(),
      text: z.string().describe("Text prompt.").optional(),
      userScenario: z.object({
        conversationPlan: z.string().describe(
          "Required. The plan for the conversation, used to drive the multi-turn agent run and generate the simulated agent evaluation dataset.",
        ).optional(),
        startingPrompt: z.string().describe(
          "Required. The prompt that starts the conversation between the simulated user and the agent under test.",
        ).optional(),
      }).describe(
        "Optional. The generated user scenario used to drive multi-turn agent running results.",
      ).optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe("Optional. The request/prompt to evaluate.").optional(),
    rubrics: z.record(
      z.string(),
      z.object({
        displayName: z.string().describe(
          'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
        ).optional(),
        groupId: z.string().describe("Unique identifier for the group.")
          .optional(),
        rubrics: z.array(z.object({
          content: z.unknown().describe(
            "Required. The actual testable criteria for the rubric.",
          ).optional(),
          importance: z.unknown().describe(
            "Optional. The relative importance of this rubric.",
          ).optional(),
          rubricId: z.unknown().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.unknown().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        })).describe("Rubrics that are part of this group.").optional(),
      }),
    ).describe(
      "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
    ).optional(),
  }).describe("The request to evaluate.").optional(),
  gcsUri: z.string().describe(
    "The Cloud Storage object where the request or response is stored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the EvaluationItem.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationItem.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationItem. Format: `projects/{project}/locations/{location}/evaluationItems/{evaluation_item}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  evaluationItemType: z.string().optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      agentData: z.object({
        agents: z.record(z.string(), z.unknown()),
        turns: z.array(z.unknown()),
      }),
      candidate: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      text: z.string(),
      value: z.string(),
    })),
    goldenResponse: z.object({
      agentData: z.object({
        agents: z.record(z.string(), z.unknown()),
        turns: z.array(z.object({
          events: z.unknown(),
          turnId: z.unknown(),
          turnIndex: z.unknown(),
        })),
      }),
      candidate: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      text: z.string(),
      value: z.string(),
    }),
    prompt: z.object({
      agentData: z.object({
        agents: z.record(z.string(), z.unknown()),
        turns: z.array(z.object({
          events: z.unknown(),
          turnId: z.unknown(),
          turnIndex: z.unknown(),
        })),
      }),
      promptTemplateData: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
      text: z.string(),
      userScenario: z.object({
        conversationPlan: z.string(),
        startingPrompt: z.string(),
      }),
      value: z.string(),
    }),
    rubrics: z.record(z.string(), z.unknown()),
  }).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string(),
      candidate: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      explanation: z.string(),
      metric: z.string(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.unknown(),
        reasoning: z.unknown(),
        verdict: z.unknown(),
      })),
      score: z.number(),
    })),
    evaluationRequest: z.string(),
    evaluationRun: z.string(),
    metadata: z.string(),
    metric: z.string(),
    request: z.object({
      candidateResponses: z.array(z.object({
        agentData: z.object({
          agents: z.unknown(),
          turns: z.unknown(),
        }),
        candidate: z.string(),
        error: z.object({
          code: z.unknown(),
          details: z.unknown(),
          message: z.unknown(),
        }),
        text: z.string(),
        value: z.string(),
      })),
      goldenResponse: z.object({
        agentData: z.object({
          agents: z.record(z.string(), z.unknown()),
          turns: z.array(z.unknown()),
        }),
        candidate: z.string(),
        error: z.object({
          code: z.number(),
          details: z.array(z.unknown()),
          message: z.string(),
        }),
        text: z.string(),
        value: z.string(),
      }),
      prompt: z.object({
        agentData: z.object({
          agents: z.record(z.string(), z.unknown()),
          turns: z.array(z.unknown()),
        }),
        promptTemplateData: z.object({
          values: z.record(z.string(), z.unknown()),
        }),
        text: z.string(),
        userScenario: z.object({
          conversationPlan: z.string(),
          startingPrompt: z.string(),
        }),
        value: z.string(),
      }),
      rubrics: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  gcsUri: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
  ).optional(),
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      agentData: z.object({
        agents: z.record(z.string(), z.unknown()).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.unknown()).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This field is used to provide the full output of an agent's run, including all turns and events, for direct evaluation.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
      ).optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Output only. Error while scraping model or agent.")
        .optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
      agentData: z.object({
        agents: z.record(
          z.string(),
          z.object({
            agentId: z.unknown().describe(
              "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
            ).optional(),
            agentType: z.unknown().describe(
              'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
            ).optional(),
            description: z.unknown().describe(
              "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
            ).optional(),
            instruction: z.unknown().describe(
              "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
            ).optional(),
            subAgents: z.unknown().describe(
              "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
            ).optional(),
            tools: z.unknown().describe(
              "Optional. The list of tools available to this agent.",
            ).optional(),
          }),
        ).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.object({
          events: z.unknown().describe(
            "Optional. The list of events that occurred during this turn.",
          ).optional(),
          turnId: z.unknown().describe(
            "Optional. A unique identifier for the turn. Useful for referencing specific turns across systems.",
          ).optional(),
          turnIndex: z.unknown().describe(
            "Required. The 0-based index of the turn in the conversation sequence.",
          ).optional(),
        })).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This field is used to provide the full output of an agent's run, including all turns and events, for direct evaluation.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
      ).optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Output only. Error while scraping model or agent.")
        .optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Optional. The Ideal response or ground truth.").optional(),
    prompt: z.object({
      agentData: z.object({
        agents: z.record(
          z.string(),
          z.object({
            agentId: z.unknown().describe(
              "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
            ).optional(),
            agentType: z.unknown().describe(
              'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
            ).optional(),
            description: z.unknown().describe(
              "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
            ).optional(),
            instruction: z.unknown().describe(
              "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
            ).optional(),
            subAgents: z.unknown().describe(
              "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
            ).optional(),
            tools: z.unknown().describe(
              "Optional. The list of tools available to this agent.",
            ).optional(),
          }),
        ).describe(
          "Optional. A map containing the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
        ).optional(),
        turns: z.array(z.object({
          events: z.unknown().describe(
            "Optional. The list of events that occurred during this turn.",
          ).optional(),
          turnId: z.unknown().describe(
            "Optional. A unique identifier for the turn. Useful for referencing specific turns across systems.",
          ).optional(),
          turnIndex: z.unknown().describe(
            "Required. The 0-based index of the turn in the conversation sequence.",
          ).optional(),
        })).describe(
          "Optional. A chronological list of conversation turns. Each turn represents a logical execution cycle (e.g., User Input -> Agent Response).",
        ).optional(),
      }).describe(
        "Optional. Represents the complete execution trace of a multi-turn conversation, which can involve single or multiple agents. This serves as the input context for agent scraping.",
      ).optional(),
      promptTemplateData: z.object({
        values: z.record(
          z.string(),
          z.object({
            parts: z.unknown().describe(
              "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
            ).optional(),
            role: z.unknown().describe(
              "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
            ).optional(),
          }),
        ).describe("The values for fields in the prompt template.").optional(),
      }).describe("Prompt template data.").optional(),
      text: z.string().describe("Text prompt.").optional(),
      userScenario: z.object({
        conversationPlan: z.string().describe(
          "Required. The plan for the conversation, used to drive the multi-turn agent run and generate the simulated agent evaluation dataset.",
        ).optional(),
        startingPrompt: z.string().describe(
          "Required. The prompt that starts the conversation between the simulated user and the agent under test.",
        ).optional(),
      }).describe(
        "Optional. The generated user scenario used to drive multi-turn agent running results.",
      ).optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe("Optional. The request/prompt to evaluate.").optional(),
    rubrics: z.record(
      z.string(),
      z.object({
        displayName: z.string().describe(
          'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
        ).optional(),
        groupId: z.string().describe("Unique identifier for the group.")
          .optional(),
        rubrics: z.array(z.object({
          content: z.unknown().describe(
            "Required. The actual testable criteria for the rubric.",
          ).optional(),
          importance: z.unknown().describe(
            "Optional. The relative importance of this rubric.",
          ).optional(),
          rubricId: z.unknown().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.unknown().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        })).describe("Rubrics that are part of this group.").optional(),
      }),
    ).describe(
      "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
    ).optional(),
  }).describe("The request to evaluate.").optional(),
  gcsUri: z.string().describe(
    "The Cloud Storage object where the request or response is stored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the EvaluationItem.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationItem.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationItem. Format: `projects/{project}/locations/{location}/evaluationItems/{evaluation_item}`",
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

/** Swamp extension model for Google Cloud Agent Platform EvaluationItems. Registered at `@swamp/gcp/aiplatform/evaluationitems`. */
export const model = {
  type: "@swamp/gcp/aiplatform/evaluationitems",
  version: "2026.10.23.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
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
      toVersion: "2026.07.04.1",
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
      description: "Removed: error, evaluationResponse",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          error: _error,
          evaluationResponse: _evaluationResponse,
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "EvaluationItem is a single evaluation request or result. The content of an Ev...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationItems",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["evaluationItemType"] !== undefined) {
          body["evaluationItemType"] = g["evaluationItemType"];
        }
        if (g["evaluationRequest"] !== undefined) {
          body["evaluationRequest"] = g["evaluationRequest"];
        }
        if (g["gcsUri"] !== undefined) body["gcsUri"] = g["gcsUri"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
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
    delete: {
      description: "Delete the evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
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
      description: "Sync evaluationItems state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific evaluationItems by name (e.g. one discovered by list)",
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
      description: "List evaluationItems resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression that matches a subset of the EvaluationItems to show. For field names both snake_case and camelCase are supported. For more information about filter syntax, see [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by, sorted in ascending order by default. Use `desc` after a field name for descending.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of Evaluation Items to return.",
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
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "evaluationItems",
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
