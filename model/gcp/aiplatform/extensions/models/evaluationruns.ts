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

// Auto-generated extension model for @swamp/gcp/aiplatform/evaluationruns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform EvaluationRuns.
 *
 * EvaluationRun is a resource that represents a single evaluation run, which includes a set of prompts, model responses, evaluation configuration and the resulting metrics.
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
  return `${parent}/evaluationRuns/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationRuns.get",
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
  "id": "aiplatform.projects.locations.evaluationRuns.create",
  "path": "v1/{+parent}/evaluationRuns",
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
  "id": "aiplatform.projects.locations.evaluationRuns.delete",
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
  "id": "aiplatform.projects.locations.evaluationRuns.list",
  "path": "v1/{+parent}/evaluationRuns",
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
  dataSource: z.object({
    bigqueryRequestSet: z.object({
      candidateResponseColumns: z.record(z.string(), z.string()).describe(
        "Optional. Map of candidate name to candidate response column name. The column will be in evaluation_item.CandidateResponse format.",
      ).optional(),
      promptColumn: z.string().describe(
        "Optional. The name of the column that contains the requests to evaluate. This will be in evaluation_item.EvalPrompt format.",
      ).optional(),
      rubricsColumn: z.string().describe(
        "Optional. The name of the column that contains the rubrics. This is in evaluation_rubric.RubricGroup format.",
      ).optional(),
      samplingConfig: z.object({
        samplingCount: z.number().int().describe(
          "Optional. The total number of logged data to import. If available data is less than the sampling count, all data will be imported. Default is 100.",
        ).optional(),
        samplingDuration: z.string().describe(
          "Optional. How long to wait before sampling data from the BigQuery table. If not specified, defaults to 0.",
        ).optional(),
        samplingMethod: z.enum(["SAMPLING_METHOD_UNSPECIFIED", "RANDOM"])
          .describe("Optional. The sampling method to use.").optional(),
      }).describe("Optional. The sampling config for the bigquery resource.")
        .optional(),
      uri: z.string().describe(
        "Required. The URI of a BigQuery table. e.g. bq://projectId.bqDatasetId.bqTableId",
      ).optional(),
    }).describe("Evaluation data in bigquery.").optional(),
    evaluationSet: z.string().describe(
      "The EvaluationSet resource name. Format: `projects/{project}/locations/{location}/evaluationSets/{evaluation_set}`",
    ).optional(),
  }).describe("Required. The data source for the evaluation run.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the Evaluation Run.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Customer-managed encryption key spec for this EvaluationRun. If set, this EvaluationRun will be secured by this key.",
  ).optional(),
  evaluationConfig: z.object({
    autoraterConfig: z.object({
      autoraterModel: z.string().describe(
        "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
      ).optional(),
      generationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        audioTranscriptionConfig: z.object({
          adaptationPhrases: z.array(z.unknown()).describe(
            "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
          ).optional(),
          customVocabulary: z.array(z.unknown()).describe(
            "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
          ).optional(),
          diarization: z.boolean().describe(
            "Optional. Configures speaker diarization.",
          ).optional(),
          languageAuto: z.object({}).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
          ).optional(),
          languageCodes: z.array(z.unknown()).describe(
            "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
          ).optional(),
          languageHints: z.object({
            languageCodes: z.unknown().describe(
              "Required. Deprecated: Use top-level `language_codes` instead. BCP-47 language codes. At least one must be specified.",
            ).optional(),
          }).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
          ).optional(),
          wordTimestamp: z.boolean().describe(
            "Optional. Configures word-level timestamp generation.",
          ).optional(),
        }).describe(
          "Optional. Configuration for audio transcription (speech recognition).",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.unknown().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.unknown().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("Optional. The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseFormat: z.array(z.object({
          audio: z.unknown().describe("Audio output format.").optional(),
          image: z.unknown().describe("Image output format.").optional(),
          text: z.unknown().describe("Text output format.").optional(),
          video: z.unknown().describe("Video output format.").optional(),
        })).describe(
          "Optional. New response format field for the model to configure output formatting and delivery.",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO", "VIDEO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.unknown()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.unknown()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.unknown()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.record(z.string(), z.unknown()).describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.unknown()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.unknown()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "In this mode, the model is selected automatically based on the content of the request.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe("In this mode, the model is specified manually.")
            .optional(),
        }).describe("Optional. Routing configuration.").optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.unknown().describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "The configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "Optional. The configuration for a replicated voice. This enables users to replicate a voice from an audio sample.",
            ).optional(),
          }).describe("The configuration for the voice to use.").optional(),
        }).describe("Optional. The speech generation config.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
        translationConfig: z.object({
          echoTargetLanguage: z.boolean().describe(
            "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
          ).optional(),
          targetLanguageCode: z.string().describe(
            'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
          ).optional(),
        }).describe("Optional. Config for translation.").optional(),
      }).describe(
        "Optional. Configuration options for model generation and outputs.",
      ).optional(),
      sampleCount: z.number().int().describe(
        "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
      ).optional(),
    }).describe("Optional. The autorater config for the evaluation run.")
      .optional(),
    cloudLoggingConfig: z.object({
      project: z.string().describe(
        "Optional. Google Cloud project to write logs to. Defaults to the request project.",
      ).optional(),
      resourceLabels: z.record(z.string(), z.string()).describe(
        "Optional. MonitoredResource labels to associate the log with. The backend will automatically inject project and location.",
      ).optional(),
      resourceType: z.string().describe(
        'Optional. MonitoredResource type. Defaults to "global" if unspecified.',
      ).optional(),
      tracingContext: z.object({
        conversationId: z.string().describe(
          "Optional. Unique identifier for a conversation (session thread), used to store and correlate messages within a conversation. The value corresponds to the `gen_ai.conversation.id` field in the the OpenTelemetry GenAI attributes.",
        ).optional(),
        spanId: z.string().describe(
          "Optional. ID of the Cloud Trace span associated with the current operation in which the log is being written. e.g., `7a2190356c3fc94b`. If a span is being evaluated, this field should be populated.",
        ).optional(),
        traceId: z.string().describe(
          "Optional. Trace ID being written to Cloud Trace in association with this log entry. e.g., `12345`, the numeric ID from the resource name. If a trace or span is being evaluated, this field should be populated.",
        ).optional(),
      }).describe("Optional. Tracing context for the evaluation run.")
        .optional(),
    }).describe(
      "Optional. Configuration for exporting evaluation results to Cloud Logging.",
    ).optional(),
    datasetCustomMetrics: z.array(z.object({
      aggregationFunction: z.string().describe(
        'Required. The Python code string containing the aggregation function. Expected function signature: `def aggregate(instances: list[dict[str, Any]]) -> dict[str, float]:` The `instances` argument is a list of dictionaries, where each dictionary represents a single evaluation result item. The structure of each dictionary corresponds to the fields in the `EvaluationResult` message. This includes: - `"request"`: Contains the original input data and model inputs (from `EvaluationResult.EvaluationRequest`). - `"candidate_results"`: Contains the results of any instance-level metrics (from `EvaluationResult.CandidateResults`). Example of a single item in the `instances` list: { "request": { "prompt": {"text": "What is the capital of France?"}, "golden_response": {"text": "Paris"}, "candidate_responses": [{"candidate": "model-v1", "text": "Paris"}] }, "candidate_results": [ {"metric": "exact_match", "score": 1.0}, {"metric": "bleu", "score": 0.9} ] }',
      ).optional(),
      displayName: z.string().describe(
        'Optional. A display name for this custom summary metric. Used to prefix keys in the output summaryMetrics map. If not provided, a default name like "dataset_custom_metric_1", "dataset_custom_metric_2", etc., will be generated based on the order in the repeated field.',
      ).optional(),
    })).describe(
      "Optional. Specifications for custom dataset-level aggregations.",
    ).optional(),
    lossAnalysisConfig: z.array(z.object({
      candidate: z.string().describe(
        'Required. The candidate model/agent to analyze (e.g., "gemini-3.0-pro"). This targets the specific CandidateResult within the EvaluationResult.',
      ).optional(),
      metric: z.string().describe(
        'Required. The metric to analyze (e.g., "tool_use_quality"). This filters the EvaluationItems in the EvalSet to only those where EvaluationResult.metric matches this value.',
      ).optional(),
    })).describe(
      "Optional. Specifications for loss analysis. Each config can be specified for one metric.",
    ).optional(),
    metrics: z.array(z.object({
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
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Optional additional configuration for the metric.",
        ).optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
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
          parameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("Dynamically generate rubrics using a predefined spec.")
          .optional(),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown().describe(
            "Optional. Resource name of the metric definition.",
          ).optional(),
          modelConfig: z.unknown().describe(
            "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "Optional. The type of rubric content to be generated.",
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
      metric: z.string().describe("Required. The name of the metric.")
        .optional(),
      metricConfig: z.object({
        aggregationMetrics: z.array(z.unknown()).describe(
          "Optional. The aggregation metrics to use.",
        ).optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.unknown().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe("Spec for bleu metric.").optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.unknown().describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the computation based metric.",
          ).optional(),
        }).describe("Spec for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.unknown().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe("Spec for Custom Code Execution metric.").optional(),
        exactMatchSpec: z.object({}).describe("Spec for exact match metric.")
          .optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.unknown().describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.unknown().describe(
            "Optional. Optional configuration for the judge LLM (Autorater).",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.unknown().describe(
            "Dynamically generate rubrics using a predefined spec.",
          ).optional(),
          resultParserConfig: z.unknown().describe(
            "Optional. The parser config for the metric result.",
          ).optional(),
          rubricGenerationSpec: z.unknown().describe(
            "Dynamically generate rubrics using this specification.",
          ).optional(),
          rubricGroupKey: z.unknown().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Spec for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.unknown().describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.unknown().describe(
            "Optional. The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Optional. Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.unknown().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.unknown().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.unknown().describe(
            "Optional. CustomOutputFormatConfig allows customization of metric output. When this config is set, the default output is replaced with the raw output string. If a custom format is chosen, the `pairwise_choice` and `explanation` fields in the corresponding metric result will be empty.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Metric prompt template for pairwise metric.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for pairwise metric.",
          ).optional(),
        }).describe("Spec for pairwise metric.").optional(),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.unknown().describe(
            "Optional. CustomOutputFormatConfig allows customization of metric output. By default, metrics return a score and explanation. When this config is set, the default output is replaced with either: - The raw output string. - A parsed output based on a user-defined schema. If a custom format is chosen, the `score` and `explanation` fields in the corresponding metric result will be empty.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Metric prompt template for pointwise metric.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for pointwise metric.",
          ).optional(),
        }).describe("Spec for pointwise metric.").optional(),
        predefinedMetricSpec: z.object({
          metricSpecName: z.unknown().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("The spec for a pre-defined metric.").optional(),
        rougeSpec: z.object({
          rougeType: z.unknown().describe(
            "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
          ).optional(),
          splitSummaries: z.unknown().describe(
            "Optional. Whether to split summaries while using rougeLsum.",
          ).optional(),
          useStemmer: z.unknown().describe(
            "Optional. Whether to use stemmer to compute rouge score.",
          ).optional(),
        }).describe("Spec for rouge metric.").optional(),
      }).describe("The metric config.").optional(),
      metricResourceName: z.string().describe(
        "Optional. The resource name of the metric definition.",
      ).optional(),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Spec for a pre-defined metric.").optional(),
      rubricBasedMetricSpec: z.object({
        inlineRubrics: z.object({
          rubrics: z.unknown().describe("The list of rubrics.").optional(),
        }).describe("Use rubrics provided directly in the spec.").optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Optional configuration for the judge LLM (Autorater). The definition of AutoraterConfig needs to be provided.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Optional. Template for the prompt used by the judge model to evaluate against rubrics.",
        ).optional(),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown().describe(
            "Optional. Resource name of the metric definition.",
          ).optional(),
          modelConfig: z.unknown().describe(
            "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "Optional. The type of rubric content to be generated.",
          ).optional(),
          rubricTypeOntology: z.unknown().describe(
            "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
          ).optional(),
        }).describe(
          "Dynamically generate rubrics for evaluation using this specification.",
        ).optional(),
        rubricGroupKey: z.string().describe(
          "Use a pre-defined group of rubrics associated with the input content. This refers to a key in the `rubric_groups` map of `RubricEnhancedContents`.",
        ).optional(),
      }).describe("Spec for rubric based metric.").optional(),
    })).describe(
      "Optional. The metrics to be calculated in the evaluation run. Required when analysis_configs is not set.",
    ).optional(),
    outputConfig: z.object({
      bigqueryDestination: z.object({
        outputUri: z.string().describe(
          "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
        ).optional(),
      }).describe("BigQuery destination for evaluation output.").optional(),
      gcsDestination: z.object({
        outputUriPrefix: z.string().describe(
          "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
        ).optional(),
      }).describe("Cloud Storage destination for evaluation output.")
        .optional(),
    }).describe("Optional. The output config for the evaluation run.")
      .optional(),
    promptTemplate: z.object({
      gcsUri: z.string().describe(
        'Prompt template stored in Cloud Storage. Format: "gs://my-bucket/file-name.txt".',
      ).optional(),
      promptTemplate: z.string().describe(
        'Inline prompt template. Template variables should be in the format "{var_name}". Example: "Translate the following from {source_lang} to {target_lang}: {text}"',
      ).optional(),
    }).describe(
      "The prompt template used for inference. The values for variables in the prompt template are defined in EvaluationItem.EvaluationPrompt.PromptTemplateData.values.",
    ).optional(),
    rubricConfigs: z.array(z.object({
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Dynamically generate rubrics using a predefined spec.")
        .optional(),
      rubricGenerationSpec: z.object({
        metricResourceName: z.string().describe(
          "Optional. Resource name of the metric definition.",
        ).optional(),
        modelConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
        ).optional(),
        promptTemplate: z.string().describe(
          "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
        ).optional(),
        rubricContentType: z.enum([
          "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
          "PROPERTY",
          "NL_QUESTION_ANSWER",
          "PYTHON_CODE_ASSERTION",
        ]).describe("Optional. The type of rubric content to be generated.")
          .optional(),
        rubricTypeOntology: z.array(z.unknown()).describe(
          "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
        ).optional(),
      }).describe("Dynamically generate rubrics using this specification.")
        .optional(),
      rubricGroupKey: z.string().describe(
        "Required. The key used to save the generated rubrics. If a generation spec is provided, this key will be used for the name of the generated rubric group. Otherwise, this key will be used to look up the existing rubric group on the evaluation item. Note that if a rubric group key is specified on both a rubric config and an evaluation metric, the key from the metric will be used to select the rubrics for evaluation.",
      ).optional(),
    })).describe(
      "Optional. The rubric configs for the evaluation run. They are used to generate rubrics which can be used by rubric-based metrics. Multiple rubric configs can be specified for rubric generation but only one rubric config can be used for a rubric-based metric. If more than one rubric config is provided, the evaluation metric must specify a rubric group key. Note that if a generation spec is specified on both a rubric config and an evaluation metric, the rubrics generated for the metric will be used for evaluation.",
    ).optional(),
  }).describe(
    "Optional. The configuration used for the evaluation. Optional when analysis_configs is provided.",
  ).optional(),
  inferenceConfigs: z.record(
    z.string(),
    z.object({
      agentRunConfig: z.object({
        agentEngine: z.string().describe(
          "Optional. The resource name of the Agent Engine. Format: projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine} For example: projects/123/locations/us-central1/reasoningEngines/456",
        ).optional(),
        geminiAgentConfig: z.object({
          geminiAgent: z.string().describe(
            "Required. The resource name of the Gemini Agent. Format: `projects/{project}/locations/{location}/agents/{agent}`. For example: `projects/123/locations/us-central1/agents/my-agent`.",
          ).optional(),
        }).describe(
          "Optional. Config for scraping a Gemini Agent via the Interactions API. The scraping service creates interactions against the agent and returns the resulting interaction traces for evaluation.",
        ).optional(),
        sessionInput: z.object({
          parameters: z.record(z.string(), z.unknown()).describe(
            'Optional. Additional parameters for the session, like app_name, etc. For example, {"app_name": "my-app"}.',
          ).optional(),
          sessionState: z.record(z.string(), z.unknown()).describe(
            "Optional. Session specific memory which stores key conversation points.",
          ).optional(),
          userId: z.string().describe(
            "Optional. The user id for the agent session. The ID can be up to 128 characters long.",
          ).optional(),
        }).describe("Optional. The session input to get agent running results.")
          .optional(),
        userSimulatorConfig: z.object({
          maxTurn: z.number().int().describe(
            "Maximum number of invocations allowed by the multi-turn agent scraping. This property allows us to stop a run-off conversation, where the agent and the user simulator get into a never ending loop. The initial fixed prompt is also counted as an invocation.",
          ).optional(),
          modelConfig: z.object({
            audioTimestamp: z.unknown().describe(
              "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
            ).optional(),
            audioTranscriptionConfig: z.unknown().describe(
              "Optional. Configuration for audio transcription (speech recognition).",
            ).optional(),
            candidateCount: z.unknown().describe(
              "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
            ).optional(),
            enableAffectiveDialog: z.unknown().describe(
              "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
            ).optional(),
            frequencyPenalty: z.unknown().describe(
              "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
            ).optional(),
            imageConfig: z.unknown().describe(
              "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
            ).optional(),
            logprobs: z.unknown().describe(
              "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
            ).optional(),
            maxOutputTokens: z.unknown().describe(
              "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
            ).optional(),
            mediaResolution: z.unknown().describe(
              "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
            ).optional(),
            presencePenalty: z.unknown().describe(
              "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
            ).optional(),
            responseFormat: z.unknown().describe(
              "Optional. New response format field for the model to configure output formatting and delivery.",
            ).optional(),
            responseJsonSchema: z.unknown().describe(
              "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
            ).optional(),
            responseLogprobs: z.unknown().describe(
              "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
            ).optional(),
            responseMimeType: z.unknown().describe(
              "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
            ).optional(),
            responseModalities: z.unknown().describe(
              "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
            ).optional(),
            responseSchema: z.unknown().describe(
              "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
            ).optional(),
            routingConfig: z.unknown().describe(
              "Optional. Routing configuration.",
            ).optional(),
            seed: z.unknown().describe(
              "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
            ).optional(),
            speechConfig: z.unknown().describe(
              "Optional. The speech generation config.",
            ).optional(),
            stopSequences: z.unknown().describe(
              'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
            ).optional(),
            temperature: z.unknown().describe(
              "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
            ).optional(),
            thinkingConfig: z.unknown().describe(
              "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
            ).optional(),
            topK: z.unknown().describe(
              "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
            ).optional(),
            topP: z.unknown().describe(
              "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
            ).optional(),
            translationConfig: z.unknown().describe(
              "Optional. Config for translation.",
            ).optional(),
          }).describe("The configuration for the model.").optional(),
          modelName: z.string().describe(
            'The model name to use for multi-turn agent scraping to get next user message, e.g. "gemini-3-flash-preview".',
          ).optional(),
        }).describe(
          "The configuration for a user simulator that uses an LLM to generate messages on behalf of the user.",
        ).optional(),
      }).describe("Optional. Agent run config.").optional(),
      agents: z.record(
        z.string(),
        z.object({
          agentId: z.string().describe(
            "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
          ).optional(),
          agentType: z.string().describe(
            'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
          ).optional(),
          description: z.string().describe(
            "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
          ).optional(),
          instruction: z.string().describe(
            "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
          ).optional(),
          subAgents: z.array(z.unknown()).describe(
            "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
          ).optional(),
          tools: z.array(z.unknown()).describe(
            "Optional. The list of tools available to this agent.",
          ).optional(),
        }),
      ).describe(
        "Optional. Contains the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
      ).optional(),
      generationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        audioTranscriptionConfig: z.object({
          adaptationPhrases: z.array(z.unknown()).describe(
            "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
          ).optional(),
          customVocabulary: z.array(z.unknown()).describe(
            "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
          ).optional(),
          diarization: z.boolean().describe(
            "Optional. Configures speaker diarization.",
          ).optional(),
          languageAuto: z.object({}).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
          ).optional(),
          languageCodes: z.array(z.unknown()).describe(
            "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
          ).optional(),
          languageHints: z.object({
            languageCodes: z.unknown().describe(
              "Required. Deprecated: Use top-level `language_codes` instead. BCP-47 language codes. At least one must be specified.",
            ).optional(),
          }).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
          ).optional(),
          wordTimestamp: z.boolean().describe(
            "Optional. Configures word-level timestamp generation.",
          ).optional(),
        }).describe(
          "Optional. Configuration for audio transcription (speech recognition).",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.unknown().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.unknown().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("Optional. The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseFormat: z.array(z.object({
          audio: z.unknown().describe("Audio output format.").optional(),
          image: z.unknown().describe("Image output format.").optional(),
          text: z.unknown().describe("Text output format.").optional(),
          video: z.unknown().describe("Video output format.").optional(),
        })).describe(
          "Optional. New response format field for the model to configure output formatting and delivery.",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO", "VIDEO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.unknown()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.unknown()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.unknown()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.record(z.string(), z.unknown()).describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.unknown()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.unknown()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "In this mode, the model is selected automatically based on the content of the request.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe("In this mode, the model is specified manually.")
            .optional(),
        }).describe("Optional. Routing configuration.").optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.unknown().describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "The configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "Optional. The configuration for a replicated voice. This enables users to replicate a voice from an audio sample.",
            ).optional(),
          }).describe("The configuration for the voice to use.").optional(),
        }).describe("Optional. The speech generation config.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
        translationConfig: z.object({
          echoTargetLanguage: z.boolean().describe(
            "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
          ).optional(),
          targetLanguageCode: z.string().describe(
            'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
          ).optional(),
        }).describe("Optional. Config for translation.").optional(),
      }).describe("Optional. Generation config.").optional(),
      model: z.string().describe(
        "Optional. The fully qualified name of the publisher model or endpoint to use. Anthropic and Llama third-party models are also supported through Model Garden. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Third-party model formats: `projects/{project}/locations/{location}/publishers/anthropic/models/{model}` or `projects/{project}/locations/{location}/publishers/llama/models/{model}` Endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
      ).optional(),
      parallelism: z.number().int().describe(
        "Optional. The parallelism of the evaluation run for the inference step. If not specified, the default parallelism will be used.",
      ).optional(),
      promptTemplate: z.object({
        gcsUri: z.string().describe(
          'Prompt template stored in Cloud Storage. Format: "gs://my-bucket/file-name.txt".',
        ).optional(),
        promptTemplate: z.string().describe(
          'Inline prompt template. Template variables should be in the format "{var_name}". Example: "Translate the following from {source_lang} to {target_lang}: {text}"',
        ).optional(),
      }).describe(
        "Optional. The prompt template used for inference. The values for variables in the prompt template are defined in EvaluationItem.EvaluationPrompt.PromptTemplateData.values. If not specified, the prompt template in the EvaluationConfig will be used.",
      ).optional(),
    }),
  ).describe(
    "Optional. The candidate to inference config map for the evaluation run. The candidate can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the evaluation run.",
  ).optional(),
  metadata: z.string().describe(
    "Optional. Metadata about the evaluation run, can be used by the caller to store additional tracking information about the evaluation run.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationRun. This is a unique identifier. Format: `projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  completionTime: z.string().optional(),
  createTime: z.string().optional(),
  dataSource: z.object({
    bigqueryRequestSet: z.object({
      candidateResponseColumns: z.record(z.string(), z.unknown()),
      promptColumn: z.string(),
      rubricsColumn: z.string(),
      samplingConfig: z.object({
        samplingCount: z.number(),
        samplingDuration: z.string(),
        samplingMethod: z.string(),
      }),
      uri: z.string(),
    }),
    evaluationSet: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  evaluationConfig: z.object({
    autoraterConfig: z.object({
      autoraterModel: z.string(),
      generationConfig: z.object({
        audioTimestamp: z.boolean(),
        audioTranscriptionConfig: z.object({
          adaptationPhrases: z.array(z.unknown()),
          customVocabulary: z.array(z.unknown()),
          diarization: z.boolean(),
          languageAuto: z.object({}),
          languageCodes: z.array(z.unknown()),
          languageHints: z.object({
            languageCodes: z.unknown(),
          }),
          wordTimestamp: z.boolean(),
        }),
        candidateCount: z.number(),
        enableAffectiveDialog: z.boolean(),
        frequencyPenalty: z.number(),
        imageConfig: z.object({
          aspectRatio: z.string(),
          imageOutputOptions: z.object({
            compressionQuality: z.unknown(),
            mimeType: z.unknown(),
          }),
          imageSize: z.string(),
          personGeneration: z.string(),
          prominentPeople: z.string(),
        }),
        logprobs: z.number(),
        maxOutputTokens: z.number(),
        mediaResolution: z.string(),
        presencePenalty: z.number(),
        responseFormat: z.array(z.object({
          audio: z.unknown(),
          image: z.unknown(),
          text: z.unknown(),
          video: z.unknown(),
        })),
        responseJsonSchema: z.string(),
        responseLogprobs: z.boolean(),
        responseMimeType: z.string(),
        responseModalities: z.array(z.string()),
        responseSchema: z.object({
          additionalProperties: z.string(),
          anyOf: z.array(z.unknown()),
          default: z.string(),
          defs: z.record(z.string(), z.unknown()),
          description: z.string(),
          enum: z.array(z.unknown()),
          example: z.string(),
          format: z.string(),
          items: z.record(z.string(), z.unknown()),
          maxItems: z.string(),
          maxLength: z.string(),
          maxProperties: z.string(),
          maximum: z.number(),
          minItems: z.string(),
          minLength: z.string(),
          minProperties: z.string(),
          minimum: z.number(),
          nullable: z.boolean(),
          pattern: z.string(),
          properties: z.record(z.string(), z.unknown()),
          propertyOrdering: z.array(z.unknown()),
          ref: z.string(),
          required: z.array(z.unknown()),
          title: z.string(),
          type: z.string(),
        }),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown(),
          }),
          manualMode: z.object({
            modelName: z.unknown(),
          }),
        }),
        seed: z.number(),
        speechConfig: z.object({
          languageCode: z.string(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.unknown(),
          }),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown(),
            replicatedVoiceConfig: z.unknown(),
          }),
        }),
        stopSequences: z.array(z.string()),
        temperature: z.number(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean(),
          thinkingBudget: z.number(),
          thinkingLevel: z.string(),
        }),
        topK: z.number(),
        topP: z.number(),
        translationConfig: z.object({
          echoTargetLanguage: z.boolean(),
          targetLanguageCode: z.string(),
        }),
      }),
      sampleCount: z.number(),
    }),
    cloudLoggingConfig: z.object({
      project: z.string(),
      resourceLabels: z.record(z.string(), z.unknown()),
      resourceType: z.string(),
      tracingContext: z.object({
        conversationId: z.string(),
        spanId: z.string(),
        traceId: z.string(),
      }),
    }),
    datasetCustomMetrics: z.array(z.object({
      aggregationFunction: z.string(),
      displayName: z.string(),
    })),
    lossAnalysisConfig: z.array(z.object({
      candidate: z.string(),
      metric: z.string(),
    })),
    metrics: z.array(z.object({
      computationBasedMetricSpec: z.object({
        parameters: z.record(z.string(), z.unknown()),
        type: z.string(),
      }),
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown(),
          generationConfig: z.unknown(),
          sampleCount: z.unknown(),
        }),
        metricPromptTemplate: z.string(),
        predefinedRubricGenerationSpec: z.object({
          metricSpecName: z.unknown(),
          parameters: z.unknown(),
        }),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown(),
          modelConfig: z.unknown(),
          promptTemplate: z.unknown(),
          rubricContentType: z.unknown(),
          rubricTypeOntology: z.unknown(),
        }),
        rubricGroupKey: z.string(),
        systemInstruction: z.string(),
      }),
      metric: z.string(),
      metricConfig: z.object({
        aggregationMetrics: z.array(z.unknown()),
        bleuSpec: z.object({
          useEffectiveOrder: z.unknown(),
        }),
        computationBasedMetricSpec: z.object({
          parameters: z.unknown(),
          type: z.unknown(),
        }),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.unknown(),
        }),
        exactMatchSpec: z.object({}),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.unknown(),
          judgeAutoraterConfig: z.unknown(),
          metricPromptTemplate: z.unknown(),
          predefinedRubricGenerationSpec: z.unknown(),
          resultParserConfig: z.unknown(),
          rubricGenerationSpec: z.unknown(),
          rubricGroupKey: z.unknown(),
          systemInstruction: z.unknown(),
        }),
        metadata: z.object({
          otherMetadata: z.unknown(),
          scoreRange: z.unknown(),
          title: z.unknown(),
        }),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.unknown(),
          candidateResponseFieldName: z.unknown(),
          customOutputFormatConfig: z.unknown(),
          metricPromptTemplate: z.unknown(),
          systemInstruction: z.unknown(),
        }),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.unknown(),
          metricPromptTemplate: z.unknown(),
          systemInstruction: z.unknown(),
        }),
        predefinedMetricSpec: z.object({
          metricSpecName: z.unknown(),
          metricSpecParameters: z.unknown(),
        }),
        rougeSpec: z.object({
          rougeType: z.unknown(),
          splitSummaries: z.unknown(),
          useStemmer: z.unknown(),
        }),
      }),
      metricResourceName: z.string(),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string(),
        parameters: z.record(z.string(), z.unknown()),
      }),
      rubricBasedMetricSpec: z.object({
        inlineRubrics: z.object({
          rubrics: z.unknown(),
        }),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown(),
          generationConfig: z.unknown(),
          sampleCount: z.unknown(),
        }),
        metricPromptTemplate: z.string(),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown(),
          modelConfig: z.unknown(),
          promptTemplate: z.unknown(),
          rubricContentType: z.unknown(),
          rubricTypeOntology: z.unknown(),
        }),
        rubricGroupKey: z.string(),
      }),
    })),
    outputConfig: z.object({
      bigqueryDestination: z.object({
        outputUri: z.string(),
      }),
      gcsDestination: z.object({
        outputUriPrefix: z.string(),
      }),
    }),
    promptTemplate: z.object({
      gcsUri: z.string(),
      promptTemplate: z.string(),
    }),
    rubricConfigs: z.array(z.object({
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string(),
        parameters: z.record(z.string(), z.unknown()),
      }),
      rubricGenerationSpec: z.object({
        metricResourceName: z.string(),
        modelConfig: z.object({
          autoraterModel: z.unknown(),
          generationConfig: z.unknown(),
          sampleCount: z.unknown(),
        }),
        promptTemplate: z.string(),
        rubricContentType: z.string(),
        rubricTypeOntology: z.array(z.unknown()),
      }),
      rubricGroupKey: z.string(),
    })),
  }).optional(),
  evaluationResults: z.object({
    evaluationSet: z.string(),
    summaryMetrics: z.object({
      failedItems: z.number(),
      metrics: z.record(z.string(), z.unknown()),
      totalItems: z.number(),
    }),
  }).optional(),
  evaluationSetSnapshot: z.string().optional(),
  inferenceConfigs: z.record(z.string(), z.unknown()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  dataSource: z.object({
    bigqueryRequestSet: z.object({
      candidateResponseColumns: z.record(z.string(), z.string()).describe(
        "Optional. Map of candidate name to candidate response column name. The column will be in evaluation_item.CandidateResponse format.",
      ).optional(),
      promptColumn: z.string().describe(
        "Optional. The name of the column that contains the requests to evaluate. This will be in evaluation_item.EvalPrompt format.",
      ).optional(),
      rubricsColumn: z.string().describe(
        "Optional. The name of the column that contains the rubrics. This is in evaluation_rubric.RubricGroup format.",
      ).optional(),
      samplingConfig: z.object({
        samplingCount: z.number().int().describe(
          "Optional. The total number of logged data to import. If available data is less than the sampling count, all data will be imported. Default is 100.",
        ).optional(),
        samplingDuration: z.string().describe(
          "Optional. How long to wait before sampling data from the BigQuery table. If not specified, defaults to 0.",
        ).optional(),
        samplingMethod: z.enum(["SAMPLING_METHOD_UNSPECIFIED", "RANDOM"])
          .describe("Optional. The sampling method to use.").optional(),
      }).describe("Optional. The sampling config for the bigquery resource.")
        .optional(),
      uri: z.string().describe(
        "Required. The URI of a BigQuery table. e.g. bq://projectId.bqDatasetId.bqTableId",
      ).optional(),
    }).describe("Evaluation data in bigquery.").optional(),
    evaluationSet: z.string().describe(
      "The EvaluationSet resource name. Format: `projects/{project}/locations/{location}/evaluationSets/{evaluation_set}`",
    ).optional(),
  }).describe("Required. The data source for the evaluation run.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the Evaluation Run.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Customer-managed encryption key spec for this EvaluationRun. If set, this EvaluationRun will be secured by this key.",
  ).optional(),
  evaluationConfig: z.object({
    autoraterConfig: z.object({
      autoraterModel: z.string().describe(
        "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
      ).optional(),
      generationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        audioTranscriptionConfig: z.object({
          adaptationPhrases: z.array(z.unknown()).describe(
            "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
          ).optional(),
          customVocabulary: z.array(z.unknown()).describe(
            "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
          ).optional(),
          diarization: z.boolean().describe(
            "Optional. Configures speaker diarization.",
          ).optional(),
          languageAuto: z.object({}).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
          ).optional(),
          languageCodes: z.array(z.unknown()).describe(
            "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
          ).optional(),
          languageHints: z.object({
            languageCodes: z.unknown().describe(
              "Required. Deprecated: Use top-level `language_codes` instead. BCP-47 language codes. At least one must be specified.",
            ).optional(),
          }).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
          ).optional(),
          wordTimestamp: z.boolean().describe(
            "Optional. Configures word-level timestamp generation.",
          ).optional(),
        }).describe(
          "Optional. Configuration for audio transcription (speech recognition).",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.unknown().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.unknown().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("Optional. The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseFormat: z.array(z.object({
          audio: z.unknown().describe("Audio output format.").optional(),
          image: z.unknown().describe("Image output format.").optional(),
          text: z.unknown().describe("Text output format.").optional(),
          video: z.unknown().describe("Video output format.").optional(),
        })).describe(
          "Optional. New response format field for the model to configure output formatting and delivery.",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO", "VIDEO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.unknown()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.unknown()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.unknown()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.record(z.string(), z.unknown()).describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.unknown()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.unknown()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "In this mode, the model is selected automatically based on the content of the request.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe("In this mode, the model is specified manually.")
            .optional(),
        }).describe("Optional. Routing configuration.").optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.unknown().describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "The configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "Optional. The configuration for a replicated voice. This enables users to replicate a voice from an audio sample.",
            ).optional(),
          }).describe("The configuration for the voice to use.").optional(),
        }).describe("Optional. The speech generation config.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
        translationConfig: z.object({
          echoTargetLanguage: z.boolean().describe(
            "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
          ).optional(),
          targetLanguageCode: z.string().describe(
            'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
          ).optional(),
        }).describe("Optional. Config for translation.").optional(),
      }).describe(
        "Optional. Configuration options for model generation and outputs.",
      ).optional(),
      sampleCount: z.number().int().describe(
        "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
      ).optional(),
    }).describe("Optional. The autorater config for the evaluation run.")
      .optional(),
    cloudLoggingConfig: z.object({
      project: z.string().describe(
        "Optional. Google Cloud project to write logs to. Defaults to the request project.",
      ).optional(),
      resourceLabels: z.record(z.string(), z.string()).describe(
        "Optional. MonitoredResource labels to associate the log with. The backend will automatically inject project and location.",
      ).optional(),
      resourceType: z.string().describe(
        'Optional. MonitoredResource type. Defaults to "global" if unspecified.',
      ).optional(),
      tracingContext: z.object({
        conversationId: z.string().describe(
          "Optional. Unique identifier for a conversation (session thread), used to store and correlate messages within a conversation. The value corresponds to the `gen_ai.conversation.id` field in the the OpenTelemetry GenAI attributes.",
        ).optional(),
        spanId: z.string().describe(
          "Optional. ID of the Cloud Trace span associated with the current operation in which the log is being written. e.g., `7a2190356c3fc94b`. If a span is being evaluated, this field should be populated.",
        ).optional(),
        traceId: z.string().describe(
          "Optional. Trace ID being written to Cloud Trace in association with this log entry. e.g., `12345`, the numeric ID from the resource name. If a trace or span is being evaluated, this field should be populated.",
        ).optional(),
      }).describe("Optional. Tracing context for the evaluation run.")
        .optional(),
    }).describe(
      "Optional. Configuration for exporting evaluation results to Cloud Logging.",
    ).optional(),
    datasetCustomMetrics: z.array(z.object({
      aggregationFunction: z.string().describe(
        'Required. The Python code string containing the aggregation function. Expected function signature: `def aggregate(instances: list[dict[str, Any]]) -> dict[str, float]:` The `instances` argument is a list of dictionaries, where each dictionary represents a single evaluation result item. The structure of each dictionary corresponds to the fields in the `EvaluationResult` message. This includes: - `"request"`: Contains the original input data and model inputs (from `EvaluationResult.EvaluationRequest`). - `"candidate_results"`: Contains the results of any instance-level metrics (from `EvaluationResult.CandidateResults`). Example of a single item in the `instances` list: { "request": { "prompt": {"text": "What is the capital of France?"}, "golden_response": {"text": "Paris"}, "candidate_responses": [{"candidate": "model-v1", "text": "Paris"}] }, "candidate_results": [ {"metric": "exact_match", "score": 1.0}, {"metric": "bleu", "score": 0.9} ] }',
      ).optional(),
      displayName: z.string().describe(
        'Optional. A display name for this custom summary metric. Used to prefix keys in the output summaryMetrics map. If not provided, a default name like "dataset_custom_metric_1", "dataset_custom_metric_2", etc., will be generated based on the order in the repeated field.',
      ).optional(),
    })).describe(
      "Optional. Specifications for custom dataset-level aggregations.",
    ).optional(),
    lossAnalysisConfig: z.array(z.object({
      candidate: z.string().describe(
        'Required. The candidate model/agent to analyze (e.g., "gemini-3.0-pro"). This targets the specific CandidateResult within the EvaluationResult.',
      ).optional(),
      metric: z.string().describe(
        'Required. The metric to analyze (e.g., "tool_use_quality"). This filters the EvaluationItems in the EvalSet to only those where EvaluationResult.metric matches this value.',
      ).optional(),
    })).describe(
      "Optional. Specifications for loss analysis. Each config can be specified for one metric.",
    ).optional(),
    metrics: z.array(z.object({
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
      llmBasedMetricSpec: z.object({
        additionalConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Optional additional configuration for the metric.",
        ).optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
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
          parameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("Dynamically generate rubrics using a predefined spec.")
          .optional(),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown().describe(
            "Optional. Resource name of the metric definition.",
          ).optional(),
          modelConfig: z.unknown().describe(
            "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "Optional. The type of rubric content to be generated.",
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
      metric: z.string().describe("Required. The name of the metric.")
        .optional(),
      metricConfig: z.object({
        aggregationMetrics: z.array(z.unknown()).describe(
          "Optional. The aggregation metrics to use.",
        ).optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.unknown().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe("Spec for bleu metric.").optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.unknown().describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the computation based metric.",
          ).optional(),
        }).describe("Spec for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.unknown().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe("Spec for Custom Code Execution metric.").optional(),
        exactMatchSpec: z.object({}).describe("Spec for exact match metric.")
          .optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.unknown().describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.unknown().describe(
            "Optional. Optional configuration for the judge LLM (Autorater).",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.unknown().describe(
            "Dynamically generate rubrics using a predefined spec.",
          ).optional(),
          resultParserConfig: z.unknown().describe(
            "Optional. The parser config for the metric result.",
          ).optional(),
          rubricGenerationSpec: z.unknown().describe(
            "Dynamically generate rubrics using this specification.",
          ).optional(),
          rubricGroupKey: z.unknown().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Spec for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.unknown().describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.unknown().describe(
            "Optional. The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Optional. Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.unknown().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.unknown().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.unknown().describe(
            "Optional. CustomOutputFormatConfig allows customization of metric output. When this config is set, the default output is replaced with the raw output string. If a custom format is chosen, the `pairwise_choice` and `explanation` fields in the corresponding metric result will be empty.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Metric prompt template for pairwise metric.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for pairwise metric.",
          ).optional(),
        }).describe("Spec for pairwise metric.").optional(),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.unknown().describe(
            "Optional. CustomOutputFormatConfig allows customization of metric output. By default, metrics return a score and explanation. When this config is set, the default output is replaced with either: - The raw output string. - A parsed output based on a user-defined schema. If a custom format is chosen, the `score` and `explanation` fields in the corresponding metric result will be empty.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Metric prompt template for pointwise metric.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for pointwise metric.",
          ).optional(),
        }).describe("Spec for pointwise metric.").optional(),
        predefinedMetricSpec: z.object({
          metricSpecName: z.unknown().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.unknown().describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("The spec for a pre-defined metric.").optional(),
        rougeSpec: z.object({
          rougeType: z.unknown().describe(
            "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
          ).optional(),
          splitSummaries: z.unknown().describe(
            "Optional. Whether to split summaries while using rougeLsum.",
          ).optional(),
          useStemmer: z.unknown().describe(
            "Optional. Whether to use stemmer to compute rouge score.",
          ).optional(),
        }).describe("Spec for rouge metric.").optional(),
      }).describe("The metric config.").optional(),
      metricResourceName: z.string().describe(
        "Optional. The resource name of the metric definition.",
      ).optional(),
      predefinedMetricSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Spec for a pre-defined metric.").optional(),
      rubricBasedMetricSpec: z.object({
        inlineRubrics: z.object({
          rubrics: z.unknown().describe("The list of rubrics.").optional(),
        }).describe("Use rubrics provided directly in the spec.").optional(),
        judgeAutoraterConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Optional configuration for the judge LLM (Autorater). The definition of AutoraterConfig needs to be provided.",
        ).optional(),
        metricPromptTemplate: z.string().describe(
          "Optional. Template for the prompt used by the judge model to evaluate against rubrics.",
        ).optional(),
        rubricGenerationSpec: z.object({
          metricResourceName: z.unknown().describe(
            "Optional. Resource name of the metric definition.",
          ).optional(),
          modelConfig: z.unknown().describe(
            "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
          ).optional(),
          promptTemplate: z.unknown().describe(
            "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
          ).optional(),
          rubricContentType: z.unknown().describe(
            "Optional. The type of rubric content to be generated.",
          ).optional(),
          rubricTypeOntology: z.unknown().describe(
            "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
          ).optional(),
        }).describe(
          "Dynamically generate rubrics for evaluation using this specification.",
        ).optional(),
        rubricGroupKey: z.string().describe(
          "Use a pre-defined group of rubrics associated with the input content. This refers to a key in the `rubric_groups` map of `RubricEnhancedContents`.",
        ).optional(),
      }).describe("Spec for rubric based metric.").optional(),
    })).describe(
      "Optional. The metrics to be calculated in the evaluation run. Required when analysis_configs is not set.",
    ).optional(),
    outputConfig: z.object({
      bigqueryDestination: z.object({
        outputUri: z.string().describe(
          "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
        ).optional(),
      }).describe("BigQuery destination for evaluation output.").optional(),
      gcsDestination: z.object({
        outputUriPrefix: z.string().describe(
          "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
        ).optional(),
      }).describe("Cloud Storage destination for evaluation output.")
        .optional(),
    }).describe("Optional. The output config for the evaluation run.")
      .optional(),
    promptTemplate: z.object({
      gcsUri: z.string().describe(
        'Prompt template stored in Cloud Storage. Format: "gs://my-bucket/file-name.txt".',
      ).optional(),
      promptTemplate: z.string().describe(
        'Inline prompt template. Template variables should be in the format "{var_name}". Example: "Translate the following from {source_lang} to {target_lang}: {text}"',
      ).optional(),
    }).describe(
      "The prompt template used for inference. The values for variables in the prompt template are defined in EvaluationItem.EvaluationPrompt.PromptTemplateData.values.",
    ).optional(),
    rubricConfigs: z.array(z.object({
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Dynamically generate rubrics using a predefined spec.")
        .optional(),
      rubricGenerationSpec: z.object({
        metricResourceName: z.string().describe(
          "Optional. Resource name of the metric definition.",
        ).optional(),
        modelConfig: z.object({
          autoraterModel: z.unknown().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          generationConfig: z.unknown().describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          sampleCount: z.unknown().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Optional. Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
        ).optional(),
        promptTemplate: z.string().describe(
          "Optional. Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
        ).optional(),
        rubricContentType: z.enum([
          "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
          "PROPERTY",
          "NL_QUESTION_ANSWER",
          "PYTHON_CODE_ASSERTION",
        ]).describe("Optional. The type of rubric content to be generated.")
          .optional(),
        rubricTypeOntology: z.array(z.unknown()).describe(
          "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
        ).optional(),
      }).describe("Dynamically generate rubrics using this specification.")
        .optional(),
      rubricGroupKey: z.string().describe(
        "Required. The key used to save the generated rubrics. If a generation spec is provided, this key will be used for the name of the generated rubric group. Otherwise, this key will be used to look up the existing rubric group on the evaluation item. Note that if a rubric group key is specified on both a rubric config and an evaluation metric, the key from the metric will be used to select the rubrics for evaluation.",
      ).optional(),
    })).describe(
      "Optional. The rubric configs for the evaluation run. They are used to generate rubrics which can be used by rubric-based metrics. Multiple rubric configs can be specified for rubric generation but only one rubric config can be used for a rubric-based metric. If more than one rubric config is provided, the evaluation metric must specify a rubric group key. Note that if a generation spec is specified on both a rubric config and an evaluation metric, the rubrics generated for the metric will be used for evaluation.",
    ).optional(),
  }).describe(
    "Optional. The configuration used for the evaluation. Optional when analysis_configs is provided.",
  ).optional(),
  inferenceConfigs: z.record(
    z.string(),
    z.object({
      agentRunConfig: z.object({
        agentEngine: z.string().describe(
          "Optional. The resource name of the Agent Engine. Format: projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine} For example: projects/123/locations/us-central1/reasoningEngines/456",
        ).optional(),
        geminiAgentConfig: z.object({
          geminiAgent: z.string().describe(
            "Required. The resource name of the Gemini Agent. Format: `projects/{project}/locations/{location}/agents/{agent}`. For example: `projects/123/locations/us-central1/agents/my-agent`.",
          ).optional(),
        }).describe(
          "Optional. Config for scraping a Gemini Agent via the Interactions API. The scraping service creates interactions against the agent and returns the resulting interaction traces for evaluation.",
        ).optional(),
        sessionInput: z.object({
          parameters: z.record(z.string(), z.unknown()).describe(
            'Optional. Additional parameters for the session, like app_name, etc. For example, {"app_name": "my-app"}.',
          ).optional(),
          sessionState: z.record(z.string(), z.unknown()).describe(
            "Optional. Session specific memory which stores key conversation points.",
          ).optional(),
          userId: z.string().describe(
            "Optional. The user id for the agent session. The ID can be up to 128 characters long.",
          ).optional(),
        }).describe("Optional. The session input to get agent running results.")
          .optional(),
        userSimulatorConfig: z.object({
          maxTurn: z.number().int().describe(
            "Maximum number of invocations allowed by the multi-turn agent scraping. This property allows us to stop a run-off conversation, where the agent and the user simulator get into a never ending loop. The initial fixed prompt is also counted as an invocation.",
          ).optional(),
          modelConfig: z.object({
            audioTimestamp: z.unknown().describe(
              "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
            ).optional(),
            audioTranscriptionConfig: z.unknown().describe(
              "Optional. Configuration for audio transcription (speech recognition).",
            ).optional(),
            candidateCount: z.unknown().describe(
              "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
            ).optional(),
            enableAffectiveDialog: z.unknown().describe(
              "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
            ).optional(),
            frequencyPenalty: z.unknown().describe(
              "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
            ).optional(),
            imageConfig: z.unknown().describe(
              "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
            ).optional(),
            logprobs: z.unknown().describe(
              "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
            ).optional(),
            maxOutputTokens: z.unknown().describe(
              "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
            ).optional(),
            mediaResolution: z.unknown().describe(
              "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
            ).optional(),
            presencePenalty: z.unknown().describe(
              "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
            ).optional(),
            responseFormat: z.unknown().describe(
              "Optional. New response format field for the model to configure output formatting and delivery.",
            ).optional(),
            responseJsonSchema: z.unknown().describe(
              "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
            ).optional(),
            responseLogprobs: z.unknown().describe(
              "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
            ).optional(),
            responseMimeType: z.unknown().describe(
              "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
            ).optional(),
            responseModalities: z.unknown().describe(
              "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
            ).optional(),
            responseSchema: z.unknown().describe(
              "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
            ).optional(),
            routingConfig: z.unknown().describe(
              "Optional. Routing configuration.",
            ).optional(),
            seed: z.unknown().describe(
              "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
            ).optional(),
            speechConfig: z.unknown().describe(
              "Optional. The speech generation config.",
            ).optional(),
            stopSequences: z.unknown().describe(
              'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
            ).optional(),
            temperature: z.unknown().describe(
              "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
            ).optional(),
            thinkingConfig: z.unknown().describe(
              "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
            ).optional(),
            topK: z.unknown().describe(
              "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
            ).optional(),
            topP: z.unknown().describe(
              "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
            ).optional(),
            translationConfig: z.unknown().describe(
              "Optional. Config for translation.",
            ).optional(),
          }).describe("The configuration for the model.").optional(),
          modelName: z.string().describe(
            'The model name to use for multi-turn agent scraping to get next user message, e.g. "gemini-3-flash-preview".',
          ).optional(),
        }).describe(
          "The configuration for a user simulator that uses an LLM to generate messages on behalf of the user.",
        ).optional(),
      }).describe("Optional. Agent run config.").optional(),
      agents: z.record(
        z.string(),
        z.object({
          agentId: z.string().describe(
            "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
          ).optional(),
          agentType: z.string().describe(
            'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
          ).optional(),
          description: z.string().describe(
            "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
          ).optional(),
          instruction: z.string().describe(
            "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
          ).optional(),
          subAgents: z.array(z.unknown()).describe(
            "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
          ).optional(),
          tools: z.array(z.unknown()).describe(
            "Optional. The list of tools available to this agent.",
          ).optional(),
        }),
      ).describe(
        "Optional. Contains the static configurations for each agent in the system. Key: agent_id (matches the `author` field in events). Value: The static configuration of the agent.",
      ).optional(),
      generationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        audioTranscriptionConfig: z.object({
          adaptationPhrases: z.array(z.unknown()).describe(
            "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
          ).optional(),
          customVocabulary: z.array(z.unknown()).describe(
            "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
          ).optional(),
          diarization: z.boolean().describe(
            "Optional. Configures speaker diarization.",
          ).optional(),
          languageAuto: z.object({}).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
          ).optional(),
          languageCodes: z.array(z.unknown()).describe(
            "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
          ).optional(),
          languageHints: z.object({
            languageCodes: z.unknown().describe(
              "Required. Deprecated: Use top-level `language_codes` instead. BCP-47 language codes. At least one must be specified.",
            ).optional(),
          }).describe(
            "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
          ).optional(),
          wordTimestamp: z.boolean().describe(
            "Optional. Configures word-level timestamp generation.",
          ).optional(),
        }).describe(
          "Optional. Configuration for audio transcription (speech recognition).",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.unknown().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.unknown().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("Optional. The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Optional. Config for image generation features. Deprecated: Use `response_format.image` instead.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseFormat: z.array(z.object({
          audio: z.unknown().describe("Audio output format.").optional(),
          image: z.unknown().describe("Image output format.").optional(),
          text: z.unknown().describe("Text output format.").optional(),
          video: z.unknown().describe("Video output format.").optional(),
        })).describe(
          "Optional. New response format field for the model to configure output formatting and delivery.",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. Deprecated: Use `response_format` instead.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO", "VIDEO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.unknown()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.unknown()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.unknown()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.record(z.string(), z.unknown()).describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.unknown()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.unknown()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "In this mode, the model is selected automatically based on the content of the request.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe("In this mode, the model is specified manually.")
            .optional(),
        }).describe("Optional. Routing configuration.").optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.unknown().describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "The configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "Optional. The configuration for a replicated voice. This enables users to replicate a voice from an audio sample.",
            ).optional(),
          }).describe("The configuration for the voice to use.").optional(),
        }).describe("Optional. The speech generation config.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          "Optional. Configuration for thinking features. An error will be returned if this field is set for models that don't support thinking.",
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
        translationConfig: z.object({
          echoTargetLanguage: z.boolean().describe(
            "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
          ).optional(),
          targetLanguageCode: z.string().describe(
            'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
          ).optional(),
        }).describe("Optional. Config for translation.").optional(),
      }).describe("Optional. Generation config.").optional(),
      model: z.string().describe(
        "Optional. The fully qualified name of the publisher model or endpoint to use. Anthropic and Llama third-party models are also supported through Model Garden. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Third-party model formats: `projects/{project}/locations/{location}/publishers/anthropic/models/{model}` or `projects/{project}/locations/{location}/publishers/llama/models/{model}` Endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
      ).optional(),
      parallelism: z.number().int().describe(
        "Optional. The parallelism of the evaluation run for the inference step. If not specified, the default parallelism will be used.",
      ).optional(),
      promptTemplate: z.object({
        gcsUri: z.string().describe(
          'Prompt template stored in Cloud Storage. Format: "gs://my-bucket/file-name.txt".',
        ).optional(),
        promptTemplate: z.string().describe(
          'Inline prompt template. Template variables should be in the format "{var_name}". Example: "Translate the following from {source_lang} to {target_lang}: {text}"',
        ).optional(),
      }).describe(
        "Optional. The prompt template used for inference. The values for variables in the prompt template are defined in EvaluationItem.EvaluationPrompt.PromptTemplateData.values. If not specified, the prompt template in the EvaluationConfig will be used.",
      ).optional(),
    }),
  ).describe(
    "Optional. The candidate to inference config map for the evaluation run. The candidate can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the evaluation run.",
  ).optional(),
  metadata: z.string().describe(
    "Optional. Metadata about the evaluation run, can be used by the caller to store additional tracking information about the evaluation run.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationRun. This is a unique identifier. Format: `projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}`",
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

/** Swamp extension model for Google Cloud Agent Platform EvaluationRuns. Registered at `@swamp/gcp/aiplatform/evaluationruns`. */
export const model = {
  type: "@swamp/gcp/aiplatform/evaluationruns",
  version: "2026.09.04.1",
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
      toVersion: "2026.04.11.1",
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
      toVersion: "2026.05.02.1",
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
      toVersion: "2026.05.27.1",
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
      toVersion: "2026.06.18.1",
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
      description: "Removed: error, evaluationResults",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          error: _error,
          evaluationResults: _evaluationResults,
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
      toVersion: "2026.08.14.1",
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
      toVersion: "2026.09.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "EvaluationRun is a resource that represents a single evaluation run, which in...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationRuns",
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
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["evaluationConfig"] !== undefined) {
          body["evaluationConfig"] = g["evaluationConfig"];
        }
        if (g["inferenceConfigs"] !== undefined) {
          body["inferenceConfigs"] = g["inferenceConfigs"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "SUCCEEDED"],
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
      description: "Get a evaluationRuns",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationRuns"),
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
      description: "Delete the evaluationRuns",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationRuns"),
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
      description: "Sync evaluationRuns state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific evaluationRuns by name (e.g. one discovered by list)",
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
      description: "List evaluationRuns resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression that matches a subset of the EvaluationRuns to show. For field names both snake_case and camelCase are supported. For more information about filter syntax, see [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by, sorted in ascending order by default. Use `desc` after a field name for descending.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of Evaluation Runs to return.",
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
          "evaluationRuns",
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
    cancel: {
      description: "cancel",
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
            "id": "aiplatform.projects.locations.evaluationRuns.cancel",
            "path": "v1/{+name}:cancel",
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
