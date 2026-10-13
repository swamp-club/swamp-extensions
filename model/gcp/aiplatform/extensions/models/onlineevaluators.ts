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

// Auto-generated extension model for @swamp/gcp/aiplatform/onlineevaluators
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform OnlineEvaluators.
 *
 * An OnlineEvaluator contains the configuration for an Online Evaluation.
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
  return `${parent}/onlineEvaluators/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.onlineEvaluators.get",
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
  "id": "aiplatform.projects.locations.onlineEvaluators.create",
  "path": "v1/{+parent}/onlineEvaluators",
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
  "id": "aiplatform.projects.locations.onlineEvaluators.patch",
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
  "id": "aiplatform.projects.locations.onlineEvaluators.delete",
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
  "id": "aiplatform.projects.locations.onlineEvaluators.list",
  "path": "v1/{+parent}/onlineEvaluators",
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
  agentResource: z.string().describe(
    "Required. Immutable. The name of the agent that the OnlineEvaluator evaluates periodically. This value is used to filter the traces with a matching cloud.resource_id and link the evaluation results with relevant dashboards/UIs. This field is immutable. Once set, it cannot be changed.",
  ).optional(),
  cloudObservability: z.object({
    logView: z.string().describe(
      "Optional. Optional log view that will be used to query logs. If empty, the project's default view (`projects/{project_id}`) will be used.",
    ).optional(),
    openTelemetry: z.object({
      semconvVersion: z.string().describe(
        'Required. Defines which version OTel Semantic Convention the data follows. Can be "1.39.0" or newer.',
      ).optional(),
    }).describe("Data source follows OpenTelemetry convention.").optional(),
    sessionScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the duration of a session (in seconds).")
          .optional(),
        modelCallErrors: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the number of LLM call errors within a session.")
          .optional(),
        modelCalls: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of underlying LLM calls within a session.",
        ).optional(),
        toolCallErrors: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of tool call errors within a session.",
        ).optional(),
        toolCalls: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of underlying tool calls within a session.",
        ).optional(),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the total token usage within a session.")
          .optional(),
        userTurns: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the number of user turns within a session.")
          .optional(),
      })).describe(
        "Optional. A list of predicates to filter sessions. Multiple predicates are combined using AND. The maximum number of predicates is 10.",
      ).optional(),
      inactivityTrigger: z.object({
        threshold: z.string().describe(
          "Required. The amount of time that must pass with no new traces before a session is considered ready for evaluation. This is a required field if InactivityTrigger is used. The value must be a positive duration no greater than 7 days (604800 seconds).",
        ).optional(),
      }).describe(
        "Session is considered ready for evaluation when there are no new traces for a specified period of inactivity.",
      ).optional(),
    }).describe(
      "Scope online evaluation to OTel sessions (i.e. group of traces with the same conversation ID).",
    ).optional(),
    traceScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the duration of a trace (in seconds).")
          .optional(),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the total token usage within a trace.")
          .optional(),
      })).describe(
        "Optional. A list of predicates to filter traces. Multiple predicates are combined using AND. The maximum number of predicates is 10.",
      ).optional(),
    }).describe("Scope online evaluation to single traces.").optional(),
    traceView: z.string().describe(
      "Optional. Optional trace view that will be used to query traces. If empty, the `_AllSpans` view from `_Trace` US bucket will be used, i.e. `projects/{project_id}/locations/us/buckets/_Trace/datasets/Spans/views/_AllSpans`.",
    ).optional(),
  }).describe(
    "Data source for the OnlineEvaluator, based on Google Cloud Observability stack (Cloud Trace & Cloud Logging).",
  ).optional(),
  config: z.object({
    maxEvaluatedSamplesPerRun: z.string().describe(
      "Optional. The maximum number of evaluations to perform per run. If set to 0, the number is unbounded.",
    ).optional(),
    randomSampling: z.object({
      percentage: z.number().int().describe(
        "Required. The percentage of traces to sample for evaluation. Must be an integer between `1` and `100`.",
      ).optional(),
    }).describe("Random sampling method.").optional(),
  }).describe("Required. Configuration for the OnlineEvaluator.").optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for the OnlineEvaluator. The name doesn't have to be unique. The name can consist of any UTF-8 characters. The maximum length is `63` characters. If the display name exceeds max characters, an `INVALID_ARGUMENT` error is returned.",
  ).optional(),
  metricSources: z.array(z.object({
    metric: z.object({
      aggregationMetrics: z.array(
        z.enum([
          "AGGREGATION_METRIC_UNSPECIFIED",
          "AVERAGE",
          "MODE",
          "STANDARD_DEVIATION",
          "VARIANCE",
          "MINIMUM",
          "MAXIMUM",
          "MEDIAN",
          "PERCENTILE_P90",
          "PERCENTILE_P95",
          "PERCENTILE_P99",
        ]),
      ).describe("Optional. The aggregation metrics to use.").optional(),
      bleuSpec: z.object({
        useEffectiveOrder: z.boolean().describe(
          "Optional. Whether to use_effective_order to compute bleu score.",
        ).optional(),
      }).describe("Spec for bleu metric.").optional(),
      computationBasedMetricSpec: z.object({
        parameters: z.record(z.string(), z.unknown()).describe(
          'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
        ).optional(),
        type: z.enum([
          "COMPUTATION_BASED_METRIC_TYPE_UNSPECIFIED",
          "EXACT_MATCH",
          "BLEU",
          "ROUGE",
        ]).describe("Required. The type of the computation based metric.")
          .optional(),
      }).describe("Spec for a computation based metric.").optional(),
      customCodeExecutionSpec: z.object({
        evaluationFunction: z.string().describe(
          "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
        ).optional(),
      }).describe("Spec for Custom Code Execution metric.").optional(),
      exactMatchSpec: z.object({}).describe("Spec for exact match metric.")
        .optional(),
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Optional additional configuration for the metric.",
        ).optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          flipEnabled: z.unknown().describe(
            "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          samplingCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Optional configuration for the judge LLM (Autorater).",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Template for the prompt sent to the judge model.",
        ).optional(),
        predefinedRubricGenerationSpec: z.object({
          metricSpecName: z.unknown().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("Dynamically generate rubrics using a predefined spec.")
          .optional(),
        resultParserConfig: z.object({
          customCodeParserConfig: z.unknown().describe(
            "Optional. Use custom code to parse the LLM response.",
          ).optional(),
        }).describe("Optional. The parser config for the metric result.")
          .optional(),
        rubricGenerationSpec: z.object({
          modelConfig: z.unknown().describe(
            "Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "The type of rubric content to be generated.",
          ).optional(),
          rubricTypeOntology: z.unknown().describe(
            "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
          ).optional(),
        }).describe("Dynamically generate rubrics using this specification.")
          .optional(),
        rubricGroupKey: z.string().describe(
          "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for the judge model.",
        ).optional(),
      }).describe("Spec for an LLM based metric.").optional(),
      metadata: z.object({
        otherMetadata: z.record(z.string(), z.unknown()).describe(
          "Optional. Flexible metadata for user-defined attributes.",
        ).optional(),
        scoreRange: z.object({
          description: z.unknown().describe(
            "Optional. The description of the score explaining the directionality etc.",
          ).optional(),
          max: z.unknown().describe(
            "Required. The maximum value of the score range (inclusive).",
          ).optional(),
          min: z.unknown().describe(
            "Required. The minimum value of the score range (inclusive).",
          ).optional(),
          step: z.unknown().describe(
            "Optional. The distance between discrete steps in the range. If unset, the range is assumed to be continuous.",
          ).optional(),
        }).describe(
          "Optional. The range of possible scores for this metric, used for plotting.",
        ).optional(),
        title: z.string().describe(
          "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
        ).optional(),
      }).describe(
        "Optional. Metadata about the metric, used for visualization and organization.",
      ).optional(),
      pairwiseMetricSpec: z.object({
        baselineResponseFieldName: z.string().describe(
          "Optional. The field name of the baseline response.",
        ).optional(),
        candidateResponseFieldName: z.string().describe(
          "Optional. The field name of the candidate response.",
        ).optional(),
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown().describe(
            "Optional. Whether to return raw output.",
          ).optional(),
        }).describe(
          "Optional. CustomOutputFormatConfig allows customization of metric output. When this config is set, the default output is replaced with the raw output string. If a custom format is chosen, the `pairwise_choice` and `explanation` fields in the corresponding metric result will be empty.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Metric prompt template for pairwise metric.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for pairwise metric.",
        ).optional(),
      }).describe("Spec for pairwise metric.").optional(),
      pointwiseMetricSpec: z.object({
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown().describe(
            "Optional. Whether to return raw output.",
          ).optional(),
        }).describe(
          "Optional. CustomOutputFormatConfig allows customization of metric output. By default, metrics return a score and explanation. When this config is set, the default output is replaced with either: - The raw output string. - A parsed output based on a user-defined schema. If a custom format is chosen, the `score` and `explanation` fields in the corresponding metric result will be empty.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Metric prompt template for pointwise metric.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for pointwise metric.",
        ).optional(),
      }).describe("Spec for pointwise metric.").optional(),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        metricSpecParameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("The spec for a pre-defined metric.").optional(),
      rougeSpec: z.object({
        rougeType: z.string().describe(
          "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
        ).optional(),
        splitSummaries: z.boolean().describe(
          "Optional. Whether to split summaries while using rougeLsum.",
        ).optional(),
        useStemmer: z.boolean().describe(
          "Optional. Whether to use stemmer to compute rouge score.",
        ).optional(),
      }).describe("Spec for rouge metric.").optional(),
    }).describe("Inline metric config.").optional(),
    metricResourceName: z.string().describe(
      "Optional. Resource name for registered metric.",
    ).optional(),
  })).describe(
    "Required. A list of metric sources to be used for evaluating samples. At least one MetricSource must be provided. Right now, only predefined metrics and registered metrics are supported. Every registered metric must have `display_name` (or `title`) and `score_range` defined. Otherwise, the evaluations will fail. The maximum number of `metric_sources` is 25.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the OnlineEvaluator. Format: projects/{project}/locations/{location}/onlineEvaluators/{id}.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentResource: z.string().optional(),
  cloudObservability: z.object({
    logView: z.string(),
    openTelemetry: z.object({
      semconvVersion: z.string(),
    }),
    sessionScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        modelCallErrors: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        modelCalls: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        toolCallErrors: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        toolCalls: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        userTurns: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
      })),
      inactivityTrigger: z.object({
        threshold: z.string(),
      }),
    }),
    traceScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown(),
          value: z.unknown(),
        }),
      })),
    }),
    traceView: z.string(),
  }).optional(),
  config: z.object({
    maxEvaluatedSamplesPerRun: z.string(),
    randomSampling: z.object({
      percentage: z.number(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  metricSources: z.array(z.object({
    metric: z.object({
      aggregationMetrics: z.array(z.string()),
      bleuSpec: z.object({
        useEffectiveOrder: z.boolean(),
      }),
      computationBasedMetricSpec: z.object({
        parameters: z.record(z.string(), z.unknown()),
        type: z.string(),
      }),
      customCodeExecutionSpec: z.object({
        evaluationFunction: z.string(),
      }),
      exactMatchSpec: z.object({}),
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown(),
          flipEnabled: z.unknown(),
          generationConfig: z.unknown(),
          samplingCount: z.unknown(),
        }),
        metricPromptTemplate: z.string(),
        predefinedRubricGenerationSpec: z.object({
          metricSpecName: z.unknown(),
          metricSpecParameters: z.unknown(),
        }),
        resultParserConfig: z.object({
          customCodeParserConfig: z.unknown(),
        }),
        rubricGenerationSpec: z.object({
          modelConfig: z.unknown(),
          promptTemplate: z.unknown(),
          rubricContentType: z.unknown(),
          rubricTypeOntology: z.unknown(),
        }),
        rubricGroupKey: z.string(),
        systemInstruction: z.string(),
      }),
      metadata: z.object({
        otherMetadata: z.record(z.string(), z.unknown()),
        scoreRange: z.object({
          description: z.unknown(),
          max: z.unknown(),
          min: z.unknown(),
          step: z.unknown(),
        }),
        title: z.string(),
      }),
      pairwiseMetricSpec: z.object({
        baselineResponseFieldName: z.string(),
        candidateResponseFieldName: z.string(),
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown(),
        }),
        metricPromptTemplate: z.string(),
        systemInstruction: z.string(),
      }),
      pointwiseMetricSpec: z.object({
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown(),
        }),
        metricPromptTemplate: z.string(),
        systemInstruction: z.string(),
      }),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string(),
        metricSpecParameters: z.record(z.string(), z.unknown()),
      }),
      rougeSpec: z.object({
        rougeType: z.string(),
        splitSummaries: z.boolean(),
        useStemmer: z.boolean(),
      }),
    }),
    metricResourceName: z.string(),
  })).optional(),
  name: z.string(),
  state: z.string().optional(),
  stateDetails: z.array(z.object({
    message: z.string(),
  })).optional(),
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
  agentResource: z.string().describe(
    "Required. Immutable. The name of the agent that the OnlineEvaluator evaluates periodically. This value is used to filter the traces with a matching cloud.resource_id and link the evaluation results with relevant dashboards/UIs. This field is immutable. Once set, it cannot be changed.",
  ).optional(),
  cloudObservability: z.object({
    logView: z.string().describe(
      "Optional. Optional log view that will be used to query logs. If empty, the project's default view (`projects/{project_id}`) will be used.",
    ).optional(),
    openTelemetry: z.object({
      semconvVersion: z.string().describe(
        'Required. Defines which version OTel Semantic Convention the data follows. Can be "1.39.0" or newer.',
      ).optional(),
    }).describe("Data source follows OpenTelemetry convention.").optional(),
    sessionScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the duration of a session (in seconds).")
          .optional(),
        modelCallErrors: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the number of LLM call errors within a session.")
          .optional(),
        modelCalls: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of underlying LLM calls within a session.",
        ).optional(),
        toolCallErrors: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of tool call errors within a session.",
        ).optional(),
        toolCalls: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe(
          "Filter on the number of underlying tool calls within a session.",
        ).optional(),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the total token usage within a session.")
          .optional(),
        userTurns: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the number of user turns within a session.")
          .optional(),
      })).describe(
        "Optional. A list of predicates to filter sessions. Multiple predicates are combined using AND. The maximum number of predicates is 10.",
      ).optional(),
      inactivityTrigger: z.object({
        threshold: z.string().describe(
          "Required. The amount of time that must pass with no new traces before a session is considered ready for evaluation. This is a required field if InactivityTrigger is used. The value must be a positive duration no greater than 7 days (604800 seconds).",
        ).optional(),
      }).describe(
        "Session is considered ready for evaluation when there are no new traces for a specified period of inactivity.",
      ).optional(),
    }).describe(
      "Scope online evaluation to OTel sessions (i.e. group of traces with the same conversation ID).",
    ).optional(),
    traceScope: z.object({
      filter: z.array(z.object({
        duration: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the duration of a trace (in seconds).")
          .optional(),
        totalTokenUsage: z.object({
          comparisonOperator: z.unknown().describe(
            "Required. The comparison operator to apply.",
          ).optional(),
          value: z.unknown().describe("Required. The value to compare against.")
            .optional(),
        }).describe("Filter on the total token usage within a trace.")
          .optional(),
      })).describe(
        "Optional. A list of predicates to filter traces. Multiple predicates are combined using AND. The maximum number of predicates is 10.",
      ).optional(),
    }).describe("Scope online evaluation to single traces.").optional(),
    traceView: z.string().describe(
      "Optional. Optional trace view that will be used to query traces. If empty, the `_AllSpans` view from `_Trace` US bucket will be used, i.e. `projects/{project_id}/locations/us/buckets/_Trace/datasets/Spans/views/_AllSpans`.",
    ).optional(),
  }).describe(
    "Data source for the OnlineEvaluator, based on Google Cloud Observability stack (Cloud Trace & Cloud Logging).",
  ).optional(),
  config: z.object({
    maxEvaluatedSamplesPerRun: z.string().describe(
      "Optional. The maximum number of evaluations to perform per run. If set to 0, the number is unbounded.",
    ).optional(),
    randomSampling: z.object({
      percentage: z.number().int().describe(
        "Required. The percentage of traces to sample for evaluation. Must be an integer between `1` and `100`.",
      ).optional(),
    }).describe("Random sampling method.").optional(),
  }).describe("Required. Configuration for the OnlineEvaluator.").optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for the OnlineEvaluator. The name doesn't have to be unique. The name can consist of any UTF-8 characters. The maximum length is `63` characters. If the display name exceeds max characters, an `INVALID_ARGUMENT` error is returned.",
  ).optional(),
  metricSources: z.array(z.object({
    metric: z.object({
      aggregationMetrics: z.array(
        z.enum([
          "AGGREGATION_METRIC_UNSPECIFIED",
          "AVERAGE",
          "MODE",
          "STANDARD_DEVIATION",
          "VARIANCE",
          "MINIMUM",
          "MAXIMUM",
          "MEDIAN",
          "PERCENTILE_P90",
          "PERCENTILE_P95",
          "PERCENTILE_P99",
        ]),
      ).describe("Optional. The aggregation metrics to use.").optional(),
      bleuSpec: z.object({
        useEffectiveOrder: z.boolean().describe(
          "Optional. Whether to use_effective_order to compute bleu score.",
        ).optional(),
      }).describe("Spec for bleu metric.").optional(),
      computationBasedMetricSpec: z.object({
        parameters: z.record(z.string(), z.unknown()).describe(
          'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
        ).optional(),
        type: z.enum([
          "COMPUTATION_BASED_METRIC_TYPE_UNSPECIFIED",
          "EXACT_MATCH",
          "BLEU",
          "ROUGE",
        ]).describe("Required. The type of the computation based metric.")
          .optional(),
      }).describe("Spec for a computation based metric.").optional(),
      customCodeExecutionSpec: z.object({
        evaluationFunction: z.string().describe(
          "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
        ).optional(),
      }).describe("Spec for Custom Code Execution metric.").optional(),
      exactMatchSpec: z.object({}).describe("Spec for exact match metric.")
        .optional(),
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Optional additional configuration for the metric.",
        ).optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          flipEnabled: z.unknown().describe(
            "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          samplingCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Optional configuration for the judge LLM (Autorater).",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Template for the prompt sent to the judge model.",
        ).optional(),
        predefinedRubricGenerationSpec: z.object({
          metricSpecName: z.unknown().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("Dynamically generate rubrics using a predefined spec.")
          .optional(),
        resultParserConfig: z.object({
          customCodeParserConfig: z.unknown().describe(
            "Optional. Use custom code to parse the LLM response.",
          ).optional(),
        }).describe("Optional. The parser config for the metric result.")
          .optional(),
        rubricGenerationSpec: z.object({
          modelConfig: z.unknown().describe(
            "Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "The type of rubric content to be generated.",
          ).optional(),
          rubricTypeOntology: z.unknown().describe(
            "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
          ).optional(),
        }).describe("Dynamically generate rubrics using this specification.")
          .optional(),
        rubricGroupKey: z.string().describe(
          "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for the judge model.",
        ).optional(),
      }).describe("Spec for an LLM based metric.").optional(),
      metadata: z.object({
        otherMetadata: z.record(z.string(), z.unknown()).describe(
          "Optional. Flexible metadata for user-defined attributes.",
        ).optional(),
        scoreRange: z.object({
          description: z.unknown().describe(
            "Optional. The description of the score explaining the directionality etc.",
          ).optional(),
          max: z.unknown().describe(
            "Required. The maximum value of the score range (inclusive).",
          ).optional(),
          min: z.unknown().describe(
            "Required. The minimum value of the score range (inclusive).",
          ).optional(),
          step: z.unknown().describe(
            "Optional. The distance between discrete steps in the range. If unset, the range is assumed to be continuous.",
          ).optional(),
        }).describe(
          "Optional. The range of possible scores for this metric, used for plotting.",
        ).optional(),
        title: z.string().describe(
          "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
        ).optional(),
      }).describe(
        "Optional. Metadata about the metric, used for visualization and organization.",
      ).optional(),
      pairwiseMetricSpec: z.object({
        baselineResponseFieldName: z.string().describe(
          "Optional. The field name of the baseline response.",
        ).optional(),
        candidateResponseFieldName: z.string().describe(
          "Optional. The field name of the candidate response.",
        ).optional(),
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown().describe(
            "Optional. Whether to return raw output.",
          ).optional(),
        }).describe(
          "Optional. CustomOutputFormatConfig allows customization of metric output. When this config is set, the default output is replaced with the raw output string. If a custom format is chosen, the `pairwise_choice` and `explanation` fields in the corresponding metric result will be empty.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Metric prompt template for pairwise metric.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for pairwise metric.",
        ).optional(),
      }).describe("Spec for pairwise metric.").optional(),
      pointwiseMetricSpec: z.object({
        customOutputFormatConfig: z.object({
          returnRawOutput: z.unknown().describe(
            "Optional. Whether to return raw output.",
          ).optional(),
        }).describe(
          "Optional. CustomOutputFormatConfig allows customization of metric output. By default, metrics return a score and explanation. When this config is set, the default output is replaced with either: - The raw output string. - A parsed output based on a user-defined schema. If a custom format is chosen, the `score` and `explanation` fields in the corresponding metric result will be empty.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Required. Metric prompt template for pointwise metric.",
        ).optional(),
        systemInstruction: z.string().describe(
          "Optional. System instructions for pointwise metric.",
        ).optional(),
      }).describe("Spec for pointwise metric.").optional(),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        metricSpecParameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("The spec for a pre-defined metric.").optional(),
      rougeSpec: z.object({
        rougeType: z.string().describe(
          "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
        ).optional(),
        splitSummaries: z.boolean().describe(
          "Optional. Whether to split summaries while using rougeLsum.",
        ).optional(),
        useStemmer: z.boolean().describe(
          "Optional. Whether to use stemmer to compute rouge score.",
        ).optional(),
      }).describe("Spec for rouge metric.").optional(),
    }).describe("Inline metric config.").optional(),
    metricResourceName: z.string().describe(
      "Optional. Resource name for registered metric.",
    ).optional(),
  })).describe(
    "Required. A list of metric sources to be used for evaluating samples. At least one MetricSource must be provided. Right now, only predefined metrics and registered metrics are supported. Every registered metric must have `display_name` (or `title`) and `score_range` defined. Otherwise, the evaluations will fail. The maximum number of `metric_sources` is 25.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the OnlineEvaluator. Format: projects/{project}/locations/{location}/onlineEvaluators/{id}.",
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

/** Swamp extension model for Google Cloud Agent Platform OnlineEvaluators. Registered at `@swamp/gcp/aiplatform/onlineevaluators`. */
export const model = {
  type: "@swamp/gcp/aiplatform/onlineevaluators",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.27.1",
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
      toVersion: "2026.08.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An OnlineEvaluator contains the configuration for an Online Evaluation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a onlineEvaluators",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["agentResource"] !== undefined) {
          body["agentResource"] = g["agentResource"];
        }
        if (g["cloudObservability"] !== undefined) {
          body["cloudObservability"] = g["cloudObservability"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["metricSources"] !== undefined) {
          body["metricSources"] = g["metricSources"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a onlineEvaluators",
      arguments: z.object({
        identifier: z.string().describe("The name of the onlineEvaluators"),
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
      description: "Update onlineEvaluators attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific onlineEvaluators by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
        if (g["cloudObservability"] !== undefined) {
          body["cloudObservability"] = g["cloudObservability"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["metricSources"] !== undefined) {
          body["metricSources"] = g["metricSources"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the onlineEvaluators",
      arguments: z.object({
        identifier: z.string().describe("The name of the onlineEvaluators"),
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
      description: "Sync onlineEvaluators state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific onlineEvaluators by name (e.g. one discovered by list)",
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
      description: "List onlineEvaluators resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Standard list filter. Supported fields: * `create_time` * `update_time` * `agent_resource` Example: `create_time>"2026-01-01T00:00:00-04:00"` where the timestamp is in RFC 3339 format) Based on aip.dev/160.',
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A comma-separated list of fields to order by. The default sorting order is ascending. Use "desc" after a field name for descending. Supported fields: * `create_time` * `update_time` Example: `create_time desc`. Based on aip.dev/132.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of OnlineEvaluators to return. The service may return fewer than this value. If unspecified, at most 100 OnlineEvaluators will be returned. The maximum value is 100; values above 100 will be coerced to 100. Based on aip.dev/158.",
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
          "onlineEvaluators",
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
    activate: {
      description: "activate",
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
            "id": "aiplatform.projects.locations.onlineEvaluators.activate",
            "path": "v1/{+name}:activate",
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
    suspend: {
      description: "suspend",
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
            "id": "aiplatform.projects.locations.onlineEvaluators.suspend",
            "path": "v1/{+name}:suspend",
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
