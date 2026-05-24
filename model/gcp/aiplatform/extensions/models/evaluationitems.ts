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
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Responses from model or agent.").optional(),
    prompt: z.object({
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
      }).describe(
        "Message to hold a prompt template and the values to populate the template.",
      ).optional(),
      text: z.string().describe("Text prompt.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe(
      "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
    ).optional(),
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
            "Content of the rubric, defining the testable criteria.",
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
  }).describe(
    "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
  ).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string().describe(
        "Optional. Additional results for the metric.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The candidate that is being evaluated. The value is the same as the candidate name in the EvaluationRequest.",
      ).optional(),
      explanation: z.string().describe(
        "Optional. The explanation for the metric.",
      ).optional(),
      metric: z.string().describe("Required. The metric that was evaluated.")
        .optional(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.unknown().describe(
          "Message representing a single testable criterion for evaluation. One input prompt could have multiple rubrics.",
        ).optional(),
        reasoning: z.unknown().describe(
          "Optional. Human-readable reasoning or explanation for the verdict. This can include specific examples or details from the evaluated content that justify the given verdict.",
        ).optional(),
        verdict: z.unknown().describe(
          'Required. Outcome of the evaluation against the rubric, represented as a boolean. `true` indicates a "Pass", `false` indicates a "Fail".',
        ).optional(),
      })).describe("Optional. The rubric verdicts for the metric.").optional(),
      score: z.number().describe("Optional. The score for the metric.")
        .optional(),
    })).describe("Optional. The results for the metric.").optional(),
    evaluationRequest: z.string().describe(
      "Required. The request item that was evaluated. Format: projects/{project}/locations/{location}/evaluationItems/{evaluation_item}",
    ).optional(),
    evaluationRun: z.string().describe(
      "Required. The evaluation run that was used to generate the result. Format: projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}",
    ).optional(),
    metadata: z.string().describe(
      "Optional. Metadata about the evaluation result.",
    ).optional(),
    metric: z.string().describe("Required. The metric that was evaluated.")
      .optional(),
    request: z.object({
      candidateResponses: z.array(z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
        ).optional(),
        error: z.object({
          code: z.unknown().describe(
            "The status code, which should be an enum value of google.rpc.Code.",
          ).optional(),
          details: z.unknown().describe(
            "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
          ).optional(),
          message: z.unknown().describe(
            "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
          ).optional(),
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      })).describe(
        "Optional. Responses from model under test and other baseline models for comparison.",
      ).optional(),
      goldenResponse: z.object({
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
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      }).describe("Responses from model or agent.").optional(),
      prompt: z.object({
        promptTemplateData: z.object({
          values: z.record(z.string(), z.unknown()).describe(
            "The values for fields in the prompt template.",
          ).optional(),
        }).describe(
          "Message to hold a prompt template and the values to populate the template.",
        ).optional(),
        text: z.string().describe("Text prompt.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the prompt template.",
        ).optional(),
      }).describe(
        "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
      ).optional(),
      rubrics: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
          ).optional(),
          groupId: z.string().describe("Unique identifier for the group.")
            .optional(),
          rubrics: z.array(z.unknown()).describe(
            "Rubrics that are part of this group.",
          ).optional(),
        }),
      ).describe(
        "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
      ).optional(),
    }).describe(
      "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
    ).optional(),
  }).describe("Evaluation result.").optional(),
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
      promptTemplateData: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
      text: z.string(),
      value: z.string(),
    }),
    rubrics: z.record(z.string(), z.unknown()),
  }).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string(),
      candidate: z.string(),
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
        promptTemplateData: z.object({
          values: z.record(z.string(), z.unknown()),
        }),
        text: z.string(),
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
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Responses from model or agent.").optional(),
    prompt: z.object({
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
      }).describe(
        "Message to hold a prompt template and the values to populate the template.",
      ).optional(),
      text: z.string().describe("Text prompt.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe(
      "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
    ).optional(),
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
            "Content of the rubric, defining the testable criteria.",
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
  }).describe(
    "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
  ).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string().describe(
        "Optional. Additional results for the metric.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The candidate that is being evaluated. The value is the same as the candidate name in the EvaluationRequest.",
      ).optional(),
      explanation: z.string().describe(
        "Optional. The explanation for the metric.",
      ).optional(),
      metric: z.string().describe("Required. The metric that was evaluated.")
        .optional(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.unknown().describe(
          "Message representing a single testable criterion for evaluation. One input prompt could have multiple rubrics.",
        ).optional(),
        reasoning: z.unknown().describe(
          "Optional. Human-readable reasoning or explanation for the verdict. This can include specific examples or details from the evaluated content that justify the given verdict.",
        ).optional(),
        verdict: z.unknown().describe(
          'Required. Outcome of the evaluation against the rubric, represented as a boolean. `true` indicates a "Pass", `false` indicates a "Fail".',
        ).optional(),
      })).describe("Optional. The rubric verdicts for the metric.").optional(),
      score: z.number().describe("Optional. The score for the metric.")
        .optional(),
    })).describe("Optional. The results for the metric.").optional(),
    evaluationRequest: z.string().describe(
      "Required. The request item that was evaluated. Format: projects/{project}/locations/{location}/evaluationItems/{evaluation_item}",
    ).optional(),
    evaluationRun: z.string().describe(
      "Required. The evaluation run that was used to generate the result. Format: projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}",
    ).optional(),
    metadata: z.string().describe(
      "Optional. Metadata about the evaluation result.",
    ).optional(),
    metric: z.string().describe("Required. The metric that was evaluated.")
      .optional(),
    request: z.object({
      candidateResponses: z.array(z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
        ).optional(),
        error: z.object({
          code: z.unknown().describe(
            "The status code, which should be an enum value of google.rpc.Code.",
          ).optional(),
          details: z.unknown().describe(
            "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
          ).optional(),
          message: z.unknown().describe(
            "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
          ).optional(),
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      })).describe(
        "Optional. Responses from model under test and other baseline models for comparison.",
      ).optional(),
      goldenResponse: z.object({
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
        }).describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      }).describe("Responses from model or agent.").optional(),
      prompt: z.object({
        promptTemplateData: z.object({
          values: z.record(z.string(), z.unknown()).describe(
            "The values for fields in the prompt template.",
          ).optional(),
        }).describe(
          "Message to hold a prompt template and the values to populate the template.",
        ).optional(),
        text: z.string().describe("Text prompt.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the prompt template.",
        ).optional(),
      }).describe(
        "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
      ).optional(),
      rubrics: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
          ).optional(),
          groupId: z.string().describe("Unique identifier for the group.")
            .optional(),
          rubrics: z.array(z.unknown()).describe(
            "Rubrics that are part of this group.",
          ).optional(),
        }),
      ).describe(
        "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
      ).optional(),
    }).describe(
      "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
    ).optional(),
  }).describe("Evaluation result.").optional(),
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

/** Swamp extension model for Google Cloud Agent Platform EvaluationItems. Registered at `@swamp/gcp/aiplatform/evaluationitems`. */
export const model = {
  type: "@swamp/gcp/aiplatform/evaluationitems",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["evaluationItemType"] !== undefined) {
          body["evaluationItemType"] = g["evaluationItemType"];
        }
        if (g["evaluationRequest"] !== undefined) {
          body["evaluationRequest"] = g["evaluationRequest"];
        }
        if (g["evaluationResponse"] !== undefined) {
          body["evaluationResponse"] = g["evaluationResponse"];
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
      description: "Get a evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
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
    delete: {
      description: "Delete the evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
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
      description: "Sync evaluationItems state from GCP",
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
  },
};
