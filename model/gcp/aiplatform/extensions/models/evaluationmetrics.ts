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

// Auto-generated extension model for @swamp/gcp/aiplatform/evaluationmetrics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform EvaluationMetrics.
 *
 * EvaluationMetric is a resource that represents a reusable metric configuration.
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
  return `${parent}/evaluationMetrics/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationMetrics.get",
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
  "id": "aiplatform.projects.locations.evaluationMetrics.create",
  "path": "v1/{+parent}/evaluationMetrics",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "evaluationMetricId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationMetrics.delete",
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
  "id": "aiplatform.projects.locations.evaluationMetrics.list",
  "path": "v1/{+parent}/evaluationMetrics",
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
  description: z.string().describe(
    "Optional. A description of the EvaluationMetric.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-friendly display name for the EvaluationMetric.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Customer-managed encryption key spec for this EvaluationMetric. If set, this EvaluationMetric will be secured by this key.",
  ).optional(),
  gcsUri: z.string().describe(
    "Optional. The Google Cloud Storage URI that stores the metric specification..",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the evaluation metric.",
  ).optional(),
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
      parameters: z.record(z.string(), z.string()).describe(
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
      additionalConfig: z.record(z.string(), z.string()).describe(
        "Optional. Optional additional configuration for the metric.",
      ).optional(),
      judgeAutoraterConfig: z.object({
        autoraterModel: z.string().describe(
          "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        flipEnabled: z.boolean().describe(
          "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
        ).optional(),
        generationConfig: z.object({
          audioTimestamp: z.boolean().describe(
            "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
          ).optional(),
          audioTranscriptionConfig: z.object({
            adaptationPhrases: z.unknown().describe(
              "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
            ).optional(),
            customVocabulary: z.unknown().describe(
              "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
            ).optional(),
            diarization: z.unknown().describe(
              "Optional. Configures speaker diarization.",
            ).optional(),
            languageAuto: z.unknown().describe(
              "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
            ).optional(),
            languageCodes: z.unknown().describe(
              "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
            ).optional(),
            languageHints: z.unknown().describe(
              "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
            ).optional(),
            wordTimestamp: z.unknown().describe(
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
            aspectRatio: z.unknown().describe(
              'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
            ).optional(),
            imageOutputOptions: z.unknown().describe(
              "Optional. The image output format for generated images.",
            ).optional(),
            imageSize: z.unknown().describe(
              "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
            ).optional(),
            personGeneration: z.unknown().describe(
              "Optional. Controls whether the model can generate people.",
            ).optional(),
            prominentPeople: z.unknown().describe(
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
          responseFormat: z.array(z.unknown()).describe(
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
          responseModalities: z.array(z.unknown()).describe(
            "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
          ).optional(),
          responseSchema: z.object({
            additionalProperties: z.unknown().describe(
              "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
            ).optional(),
            anyOf: z.unknown().describe(
              "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
            ).optional(),
            default: z.unknown().describe(
              "Optional. Default value to use if the field is not specified.",
            ).optional(),
            defs: z.unknown().describe(
              "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
            ).optional(),
            description: z.unknown().describe(
              "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
            ).optional(),
            enum: z.unknown().describe(
              'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
            ).optional(),
            example: z.unknown().describe(
              "Optional. Example of an instance of this schema.",
            ).optional(),
            format: z.unknown().describe(
              "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
            ).optional(),
            items: z.unknown().describe(
              "Circular reference to GoogleCloudAiplatformV1Schema",
            ).optional(),
            maxItems: z.unknown().describe(
              "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
            ).optional(),
            maxLength: z.unknown().describe(
              "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
            ).optional(),
            maxProperties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
            ).optional(),
            maximum: z.unknown().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
            ).optional(),
            minItems: z.unknown().describe(
              "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
            ).optional(),
            minLength: z.unknown().describe(
              "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
            ).optional(),
            minProperties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
            ).optional(),
            minimum: z.unknown().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
            ).optional(),
            nullable: z.unknown().describe(
              "Optional. Indicates if the value of this field can be null.",
            ).optional(),
            pattern: z.unknown().describe(
              "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
            ).optional(),
            properties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
            ).optional(),
            propertyOrdering: z.unknown().describe(
              "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
            ).optional(),
            ref: z.unknown().describe(
              'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
            ).optional(),
            required: z.unknown().describe(
              "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
            ).optional(),
            title: z.unknown().describe("Optional. Title for the schema.")
              .optional(),
            type: z.unknown().describe(
              "Optional. Data type of the schema field.",
            ).optional(),
          }).describe(
            "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.unknown().describe(
              "In this mode, the model is selected automatically based on the content of the request.",
            ).optional(),
            manualMode: z.unknown().describe(
              "In this mode, the model is specified manually.",
            ).optional(),
          }).describe("Optional. Routing configuration.").optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.unknown().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.unknown().describe(
              "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
            ).optional(),
            voiceConfig: z.unknown().describe(
              "The configuration for the voice to use.",
            ).optional(),
          }).describe("Optional. The speech generation config.").optional(),
          stopSequences: z.array(z.unknown()).describe(
            'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
          ).optional(),
          temperature: z.number().describe(
            "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
          ).optional(),
          thinkingConfig: z.object({
            includeThoughts: z.unknown().describe(
              'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
            ).optional(),
            thinkingBudget: z.unknown().describe(
              "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
            ).optional(),
            thinkingLevel: z.unknown().describe(
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
            echoTargetLanguage: z.unknown().describe(
              "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
            ).optional(),
            targetLanguageCode: z.unknown().describe(
              'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
            ).optional(),
          }).describe("Optional. Config for translation.").optional(),
        }).describe(
          "Optional. Configuration options for model generation and outputs.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "Optional. Optional configuration for the judge LLM (Autorater).",
      ).optional(),
      metricPromptTemplate: z.string().describe(
        "Required. Template for the prompt sent to the judge model.",
      ).optional(),
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        metricSpecParameters: z.record(z.string(), z.string()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Dynamically generate rubrics using a predefined spec.")
        .optional(),
      resultParserConfig: z.object({
        customCodeParserConfig: z.object({
          parsingFunction: z.string().describe(
            'Required. Python function for parsing results. The function should be defined within this string. The function takes a list of strings (LLM responses) and should return either a list of dictionaries (for rubrics) or a single dictionary (for a metric result). Example function signature: def parse(responses: list[str]) -> list[dict[str, Any]] | dict[str, Any]: When parsing rubrics, return a list of dictionaries, where each dictionary represents a Rubric. Example for rubrics: [ { "content": {"property": {"description": "The response is factual."}}, "type": "FACTUALITY", "importance": "HIGH" }, { "content": {"property": {"description": "The response is fluent."}}, "type": "FLUENCY", "importance": "MEDIUM" } ] When parsing critique results, return a dictionary representing a MetricResult. Example for a metric result: { "score": 0.8, "explanation": "The model followed most instructions.", "rubric_verdicts": [...] }... code for result extraction and aggregation',
          ).optional(),
        }).describe("Optional. Use custom code to parse the LLM response.")
          .optional(),
      }).describe("Optional. The parser config for the metric result.")
        .optional(),
      rubricGenerationSpec: z.object({
        modelConfig: z.object({
          autoraterModel: z.string().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          flipEnabled: z.boolean().describe(
            "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
          ).optional(),
          generationConfig: z.object({
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
          }).describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          samplingCount: z.number().int().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
        ).optional(),
        promptTemplate: z.string().describe(
          "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
        ).optional(),
        rubricContentType: z.enum([
          "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
          "PROPERTY",
          "NL_QUESTION_ANSWER",
          "PYTHON_CODE_ASSERTION",
        ]).describe("The type of rubric content to be generated.").optional(),
        rubricTypeOntology: z.array(z.string()).describe(
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
      otherMetadata: z.record(z.string(), z.string()).describe(
        "Optional. Flexible metadata for user-defined attributes.",
      ).optional(),
      scoreRange: z.object({
        description: z.string().describe(
          "Optional. The description of the score explaining the directionality etc.",
        ).optional(),
        max: z.number().describe(
          "Required. The maximum value of the score range (inclusive).",
        ).optional(),
        min: z.number().describe(
          "Required. The minimum value of the score range (inclusive).",
        ).optional(),
        step: z.number().describe(
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
        returnRawOutput: z.boolean().describe(
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
        returnRawOutput: z.boolean().describe(
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
      metricSpecParameters: z.record(z.string(), z.string()).describe(
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
  }).describe(
    "Optional. The metric configuration. Only LLMMetric and CustomCodeExecutionMetric are supported.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationMetric. Format: `projects/{project}/locations/{location}/evaluationMetrics/{evaluation_metric}`",
  ).optional(),
  evaluationMetricId: z.string().describe(
    "Optional. The ID to use for the EvaluationMetric, which will become the final component of the EvaluationMetric's resource name. This value should be 1-63 characters, and valid characters are /a-z-/. The first character must be a lowercase letter, and the last character must be a lowercase letter or number.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  gcsUri: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
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
        autoraterModel: z.string(),
        flipEnabled: z.boolean(),
        generationConfig: z.object({
          audioTimestamp: z.boolean(),
          audioTranscriptionConfig: z.object({
            adaptationPhrases: z.unknown(),
            customVocabulary: z.unknown(),
            diarization: z.unknown(),
            languageAuto: z.unknown(),
            languageCodes: z.unknown(),
            languageHints: z.unknown(),
            wordTimestamp: z.unknown(),
          }),
          candidateCount: z.number(),
          enableAffectiveDialog: z.boolean(),
          frequencyPenalty: z.number(),
          imageConfig: z.object({
            aspectRatio: z.unknown(),
            imageOutputOptions: z.unknown(),
            imageSize: z.unknown(),
            personGeneration: z.unknown(),
            prominentPeople: z.unknown(),
          }),
          logprobs: z.number(),
          maxOutputTokens: z.number(),
          mediaResolution: z.string(),
          presencePenalty: z.number(),
          responseFormat: z.array(z.unknown()),
          responseJsonSchema: z.string(),
          responseLogprobs: z.boolean(),
          responseMimeType: z.string(),
          responseModalities: z.array(z.unknown()),
          responseSchema: z.object({
            additionalProperties: z.unknown(),
            anyOf: z.unknown(),
            default: z.unknown(),
            defs: z.unknown(),
            description: z.unknown(),
            enum: z.unknown(),
            example: z.unknown(),
            format: z.unknown(),
            items: z.unknown(),
            maxItems: z.unknown(),
            maxLength: z.unknown(),
            maxProperties: z.unknown(),
            maximum: z.unknown(),
            minItems: z.unknown(),
            minLength: z.unknown(),
            minProperties: z.unknown(),
            minimum: z.unknown(),
            nullable: z.unknown(),
            pattern: z.unknown(),
            properties: z.unknown(),
            propertyOrdering: z.unknown(),
            ref: z.unknown(),
            required: z.unknown(),
            title: z.unknown(),
            type: z.unknown(),
          }),
          routingConfig: z.object({
            autoMode: z.unknown(),
            manualMode: z.unknown(),
          }),
          seed: z.number(),
          speechConfig: z.object({
            languageCode: z.unknown(),
            multiSpeakerVoiceConfig: z.unknown(),
            voiceConfig: z.unknown(),
          }),
          stopSequences: z.array(z.unknown()),
          temperature: z.number(),
          thinkingConfig: z.object({
            includeThoughts: z.unknown(),
            thinkingBudget: z.unknown(),
            thinkingLevel: z.unknown(),
          }),
          topK: z.number(),
          topP: z.number(),
          translationConfig: z.object({
            echoTargetLanguage: z.unknown(),
            targetLanguageCode: z.unknown(),
          }),
        }),
        samplingCount: z.number(),
      }),
      metricPromptTemplate: z.string(),
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string(),
        metricSpecParameters: z.record(z.string(), z.unknown()),
      }),
      resultParserConfig: z.object({
        customCodeParserConfig: z.object({
          parsingFunction: z.string(),
        }),
      }),
      rubricGenerationSpec: z.object({
        modelConfig: z.object({
          autoraterModel: z.string(),
          flipEnabled: z.boolean(),
          generationConfig: z.object({
            audioTimestamp: z.unknown(),
            audioTranscriptionConfig: z.unknown(),
            candidateCount: z.unknown(),
            enableAffectiveDialog: z.unknown(),
            frequencyPenalty: z.unknown(),
            imageConfig: z.unknown(),
            logprobs: z.unknown(),
            maxOutputTokens: z.unknown(),
            mediaResolution: z.unknown(),
            presencePenalty: z.unknown(),
            responseFormat: z.unknown(),
            responseJsonSchema: z.unknown(),
            responseLogprobs: z.unknown(),
            responseMimeType: z.unknown(),
            responseModalities: z.unknown(),
            responseSchema: z.unknown(),
            routingConfig: z.unknown(),
            seed: z.unknown(),
            speechConfig: z.unknown(),
            stopSequences: z.unknown(),
            temperature: z.unknown(),
            thinkingConfig: z.unknown(),
            topK: z.unknown(),
            topP: z.unknown(),
            translationConfig: z.unknown(),
          }),
          samplingCount: z.number(),
        }),
        promptTemplate: z.string(),
        rubricContentType: z.string(),
        rubricTypeOntology: z.array(z.string()),
      }),
      rubricGroupKey: z.string(),
      systemInstruction: z.string(),
    }),
    metadata: z.object({
      otherMetadata: z.record(z.string(), z.unknown()),
      scoreRange: z.object({
        description: z.string(),
        max: z.number(),
        min: z.number(),
        step: z.number(),
      }),
      title: z.string(),
    }),
    pairwiseMetricSpec: z.object({
      baselineResponseFieldName: z.string(),
      candidateResponseFieldName: z.string(),
      customOutputFormatConfig: z.object({
        returnRawOutput: z.boolean(),
      }),
      metricPromptTemplate: z.string(),
      systemInstruction: z.string(),
    }),
    pointwiseMetricSpec: z.object({
      customOutputFormatConfig: z.object({
        returnRawOutput: z.boolean(),
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
  }).optional(),
  name: z.string(),
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
  description: z.string().describe(
    "Optional. A description of the EvaluationMetric.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-friendly display name for the EvaluationMetric.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Customer-managed encryption key spec for this EvaluationMetric. If set, this EvaluationMetric will be secured by this key.",
  ).optional(),
  gcsUri: z.string().describe(
    "Optional. The Google Cloud Storage URI that stores the metric specification..",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the evaluation metric.",
  ).optional(),
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
      parameters: z.record(z.string(), z.string()).describe(
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
      additionalConfig: z.record(z.string(), z.string()).describe(
        "Optional. Optional additional configuration for the metric.",
      ).optional(),
      judgeAutoraterConfig: z.object({
        autoraterModel: z.string().describe(
          "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        flipEnabled: z.boolean().describe(
          "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
        ).optional(),
        generationConfig: z.object({
          audioTimestamp: z.boolean().describe(
            "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
          ).optional(),
          audioTranscriptionConfig: z.object({
            adaptationPhrases: z.unknown().describe(
              "Optional. Deprecated: Use `custom_vocabulary` instead. A list of phrases to bias the speech recognition model towards.",
            ).optional(),
            customVocabulary: z.unknown().describe(
              "Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms.",
            ).optional(),
            diarization: z.unknown().describe(
              "Optional. Configures speaker diarization.",
            ).optional(),
            languageAuto: z.unknown().describe(
              "Optional. Deprecated: Use top-level `language_codes` instead. The model will detect the language automatically.",
            ).optional(),
            languageCodes: z.unknown().describe(
              "Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.",
            ).optional(),
            languageHints: z.unknown().describe(
              "Optional. Deprecated: Use top-level `language_codes` instead. Specifies one or more languages in the audio.",
            ).optional(),
            wordTimestamp: z.unknown().describe(
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
            aspectRatio: z.unknown().describe(
              'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
            ).optional(),
            imageOutputOptions: z.unknown().describe(
              "Optional. The image output format for generated images.",
            ).optional(),
            imageSize: z.unknown().describe(
              "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
            ).optional(),
            personGeneration: z.unknown().describe(
              "Optional. Controls whether the model can generate people.",
            ).optional(),
            prominentPeople: z.unknown().describe(
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
          responseFormat: z.array(z.unknown()).describe(
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
          responseModalities: z.array(z.unknown()).describe(
            "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
          ).optional(),
          responseSchema: z.object({
            additionalProperties: z.unknown().describe(
              "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
            ).optional(),
            anyOf: z.unknown().describe(
              "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
            ).optional(),
            default: z.unknown().describe(
              "Optional. Default value to use if the field is not specified.",
            ).optional(),
            defs: z.unknown().describe(
              "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
            ).optional(),
            description: z.unknown().describe(
              "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
            ).optional(),
            enum: z.unknown().describe(
              'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
            ).optional(),
            example: z.unknown().describe(
              "Optional. Example of an instance of this schema.",
            ).optional(),
            format: z.unknown().describe(
              "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
            ).optional(),
            items: z.unknown().describe(
              "Circular reference to GoogleCloudAiplatformV1Schema",
            ).optional(),
            maxItems: z.unknown().describe(
              "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
            ).optional(),
            maxLength: z.unknown().describe(
              "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
            ).optional(),
            maxProperties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
            ).optional(),
            maximum: z.unknown().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
            ).optional(),
            minItems: z.unknown().describe(
              "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
            ).optional(),
            minLength: z.unknown().describe(
              "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
            ).optional(),
            minProperties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
            ).optional(),
            minimum: z.unknown().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
            ).optional(),
            nullable: z.unknown().describe(
              "Optional. Indicates if the value of this field can be null.",
            ).optional(),
            pattern: z.unknown().describe(
              "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
            ).optional(),
            properties: z.unknown().describe(
              "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
            ).optional(),
            propertyOrdering: z.unknown().describe(
              "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
            ).optional(),
            ref: z.unknown().describe(
              'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
            ).optional(),
            required: z.unknown().describe(
              "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
            ).optional(),
            title: z.unknown().describe("Optional. Title for the schema.")
              .optional(),
            type: z.unknown().describe(
              "Optional. Data type of the schema field.",
            ).optional(),
          }).describe(
            "Optional. Lets you to specify a schema for the model's response, ensuring that the output conforms to a particular structure. This is useful for generating structured data such as JSON. The schema is a subset of the [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema) object. When this field is set, you must also set the `response_mime_type` to `application/json`. Deprecated: Use `response_format` instead.",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.unknown().describe(
              "In this mode, the model is selected automatically based on the content of the request.",
            ).optional(),
            manualMode: z.unknown().describe(
              "In this mode, the model is specified manually.",
            ).optional(),
          }).describe("Optional. Routing configuration.").optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.unknown().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.unknown().describe(
              "The configuration for a multi-speaker text-to-speech request. This field is mutually exclusive with `voice_config`.",
            ).optional(),
            voiceConfig: z.unknown().describe(
              "The configuration for the voice to use.",
            ).optional(),
          }).describe("Optional. The speech generation config.").optional(),
          stopSequences: z.array(z.unknown()).describe(
            'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
          ).optional(),
          temperature: z.number().describe(
            "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
          ).optional(),
          thinkingConfig: z.object({
            includeThoughts: z.unknown().describe(
              'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
            ).optional(),
            thinkingBudget: z.unknown().describe(
              "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
            ).optional(),
            thinkingLevel: z.unknown().describe(
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
            echoTargetLanguage: z.unknown().describe(
              "Optional. If `true`, the model will generate audio when the target language is spoken, essentially it will parrot the input. If `false`, we will not produce audio for the target language.",
            ).optional(),
            targetLanguageCode: z.unknown().describe(
              'Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").',
            ).optional(),
          }).describe("Optional. Config for translation.").optional(),
        }).describe(
          "Optional. Configuration options for model generation and outputs.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "Optional. Optional configuration for the judge LLM (Autorater).",
      ).optional(),
      metricPromptTemplate: z.string().describe(
        "Required. Template for the prompt sent to the judge model.",
      ).optional(),
      predefinedRubricGenerationSpec: z.object({
        metricSpecName: z.string().describe(
          'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
        ).optional(),
        metricSpecParameters: z.record(z.string(), z.string()).describe(
          "Optional. The parameters needed to run the pre-defined metric.",
        ).optional(),
      }).describe("Dynamically generate rubrics using a predefined spec.")
        .optional(),
      resultParserConfig: z.object({
        customCodeParserConfig: z.object({
          parsingFunction: z.string().describe(
            'Required. Python function for parsing results. The function should be defined within this string. The function takes a list of strings (LLM responses) and should return either a list of dictionaries (for rubrics) or a single dictionary (for a metric result). Example function signature: def parse(responses: list[str]) -> list[dict[str, Any]] | dict[str, Any]: When parsing rubrics, return a list of dictionaries, where each dictionary represents a Rubric. Example for rubrics: [ { "content": {"property": {"description": "The response is factual."}}, "type": "FACTUALITY", "importance": "HIGH" }, { "content": {"property": {"description": "The response is fluent."}}, "type": "FLUENCY", "importance": "MEDIUM" } ] When parsing critique results, return a dictionary representing a MetricResult. Example for a metric result: { "score": 0.8, "explanation": "The model followed most instructions.", "rubric_verdicts": [...] }... code for result extraction and aggregation',
          ).optional(),
        }).describe("Optional. Use custom code to parse the LLM response.")
          .optional(),
      }).describe("Optional. The parser config for the metric result.")
        .optional(),
      rubricGenerationSpec: z.object({
        modelConfig: z.object({
          autoraterModel: z.string().describe(
            "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
          ).optional(),
          flipEnabled: z.boolean().describe(
            "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
          ).optional(),
          generationConfig: z.object({
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
          }).describe(
            "Optional. Configuration options for model generation and outputs.",
          ).optional(),
          samplingCount: z.number().int().describe(
            "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
          ).optional(),
        }).describe(
          "Configuration for the model used in rubric generation. Configs including sampling count and base model can be specified here. Flipping is not supported for rubric generation.",
        ).optional(),
        promptTemplate: z.string().describe(
          "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
        ).optional(),
        rubricContentType: z.enum([
          "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
          "PROPERTY",
          "NL_QUESTION_ANSWER",
          "PYTHON_CODE_ASSERTION",
        ]).describe("The type of rubric content to be generated.").optional(),
        rubricTypeOntology: z.array(z.string()).describe(
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
      otherMetadata: z.record(z.string(), z.string()).describe(
        "Optional. Flexible metadata for user-defined attributes.",
      ).optional(),
      scoreRange: z.object({
        description: z.string().describe(
          "Optional. The description of the score explaining the directionality etc.",
        ).optional(),
        max: z.number().describe(
          "Required. The maximum value of the score range (inclusive).",
        ).optional(),
        min: z.number().describe(
          "Required. The minimum value of the score range (inclusive).",
        ).optional(),
        step: z.number().describe(
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
        returnRawOutput: z.boolean().describe(
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
        returnRawOutput: z.boolean().describe(
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
      metricSpecParameters: z.record(z.string(), z.string()).describe(
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
  }).describe(
    "Optional. The metric configuration. Only LLMMetric and CustomCodeExecutionMetric are supported.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationMetric. Format: `projects/{project}/locations/{location}/evaluationMetrics/{evaluation_metric}`",
  ).optional(),
  evaluationMetricId: z.string().describe(
    "Optional. The ID to use for the EvaluationMetric, which will become the final component of the EvaluationMetric's resource name. This value should be 1-63 characters, and valid characters are /a-z-/. The first character must be a lowercase letter, and the last character must be a lowercase letter or number.",
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

/** Swamp extension model for Google Cloud Agent Platform EvaluationMetrics. Registered at `@swamp/gcp/aiplatform/evaluationmetrics`. */
export const model = {
  type: "@swamp/gcp/aiplatform/evaluationmetrics",
  version: "2026.09.04.1",
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
        "EvaluationMetric is a resource that represents a reusable metric configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationMetrics",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["gcsUri"] !== undefined) body["gcsUri"] = g["gcsUri"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metric"] !== undefined) body["metric"] = g["metric"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["evaluationMetricId"] !== undefined) {
          params["evaluationMetricId"] = String(g["evaluationMetricId"]);
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
      description: "Get a evaluationMetrics",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationMetrics"),
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
      description: "Delete the evaluationMetrics",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationMetrics"),
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
      description: "Sync evaluationMetrics state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific evaluationMetrics by name (e.g. one discovered by list)",
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
      description: "List evaluationMetrics resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression that matches a subset of the EvaluationMetrics to show. For field names both snake_case and camelCase are supported. For more information about filter syntax, see [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by, sorted in ascending order by default. Use `desc` after a field name for descending.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of EvaluationMetrics to return.",
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
          "evaluationMetrics",
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
