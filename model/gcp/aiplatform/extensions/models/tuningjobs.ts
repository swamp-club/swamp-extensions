// Auto-generated extension model for @swamp/gcp/aiplatform/tuningjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI TuningJobs.
 *
 * Represents a TuningJob that runs with Google owned models.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/tuningJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.tuningJobs.get",
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
  "id": "aiplatform.projects.locations.tuningJobs.create",
  "path": "v1/{+parent}/tuningJobs",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  baseModel: z.string().describe(
    "The base model that is being tuned. See [Supported models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/tuning#supported_models).",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the TuningJob.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels with user-defined metadata to organize TuningJob and generated resources such as Model and Endpoint. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  preTunedModel: z.object({
    baseModel: z.string().describe(
      "Output only. The name of the base model this PreTunedModel was tuned from.",
    ).optional(),
    checkpointId: z.string().describe(
      "Optional. The source checkpoint id. If not specified, the default checkpoint will be used.",
    ).optional(),
    tunedModelName: z.string().describe(
      "The resource name of the Model. E.g., a model resource name with a specified version id or alias: `projects/{project}/locations/{location}/models/{model}@{version_id}` `projects/{project}/locations/{location}/models/{model}@{alias}` Or, omit the version id to use the default version: `projects/{project}/locations/{location}/models/{model}`",
    ).optional(),
  }).describe("A pre-tuned model for continuous tuning.").optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for Preference Optimization and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for Preference Optimization. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for preference optimization.")
        .optional(),
      beta: z.number().describe(
        "Optional. Weight for KL Divergence regularization.",
      ).optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate.",
      ).optional(),
    }).describe("Hyperparameters for Preference Optimization.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Cloud Storage path to file containing training dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Cloud Storage path to file containing validation dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
  }).describe("Tuning Spec for Preference Optimization.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the tuningJob workload runs as. If not specified, the Vertex AI Secure Fine-Tuned Service Agent in the project will be used. See https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-agent Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
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
              "The image output format for generated images.",
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
            "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
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
          responseJsonSchema: z.string().describe(
            "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
          ).optional(),
          responseLogprobs: z.boolean().describe(
            "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
          ).optional(),
          responseMimeType: z.string().describe(
            "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
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
            "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.unknown().describe(
              "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
            ).optional(),
            manualMode: z.unknown().describe(
              "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
            ).optional(),
          }).describe(
            "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
          ).optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.unknown().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.unknown().describe(
              "Configuration for a multi-speaker text-to-speech request.",
            ).optional(),
            voiceConfig: z.unknown().describe("Configuration for a voice.")
              .optional(),
          }).describe("Configuration for speech generation.").optional(),
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
            'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
          ).optional(),
          topK: z.number().describe(
            "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
          ).optional(),
          topP: z.number().describe(
            "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
          ).optional(),
        }).describe(
          "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
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
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
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
          }).describe("The image output format for generated images.")
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
          "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
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
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
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
          items: z.string().describe(
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
          "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe(
            "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
          ).optional(),
        }).describe(
          "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
        ).optional(),
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
            "Configuration for a multi-speaker text-to-speech request.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "Configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "The configuration for the replicated voice to use.",
            ).optional(),
          }).describe("Configuration for a voice.").optional(),
        }).describe("Configuration for speech generation.").optional(),
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
          'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
      }).describe(
        "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
      ).optional(),
      metrics: z.array(z.object({
        aggregationMetrics: z.array(z.unknown()).describe(
          "Optional. The aggregation metrics to use.",
        ).optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.unknown().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe(
          "Spec for bleu score metric - calculates the precision of n-grams in the prediction as compared to reference - returns a score ranging between 0 to 1.",
        ).optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.unknown().describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the computation based metric.",
          ).optional(),
        }).describe("Specification for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.unknown().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe(
          "Specificies a metric that is populated by evaluating user-defined Python code.",
        ).optional(),
        exactMatchSpec: z.object({}).describe(
          "Spec for exact match metric - returns 1 if prediction and reference exactly matches, otherwise 0.",
        ).optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.unknown().describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.unknown().describe(
            "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.unknown().describe(
            "The spec for a pre-defined metric.",
          ).optional(),
          rubricGenerationSpec: z.unknown().describe(
            "Specification for how rubrics should be generated.",
          ).optional(),
          rubricGroupKey: z.unknown().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Specification for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.unknown().describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.unknown().describe(
            "The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.unknown().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.unknown().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.unknown().describe(
            "Spec for custom output format configuration.",
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
            "Spec for custom output format configuration.",
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
        }).describe(
          "Spec for rouge score metric - calculates the recall of n-grams in prediction as compared to reference - returns a score ranging between 0 and 1.",
        ).optional(),
      })).describe("Required. The metrics used for evaluation.").optional(),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string().describe(
            "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
          ).optional(),
        }).describe(
          "The Google Cloud Storage location where the output is to be written to.",
        ).optional(),
      }).describe("Config for evaluation output.").optional(),
    }).describe("Evaluation Config for Tuning Job.").optional(),
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for SFT and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for SFT. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for tuning.").optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate. Mutually exclusive with `learning_rate`. This feature is only available for 1P models.",
      ).optional(),
    }).describe("Hyperparameters for SFT.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Training dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Validation dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
  }).describe("Tuning Spec for Supervised Tuning for first party models.")
    .optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      endpoint: z.string().describe(
        "The Endpoint resource name that the checkpoint is deployed to. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
      ).optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe(
      "Output only. The checkpoints associated with this TunedModel. This field is only populated for tuning jobs that enable intermediate checkpoints.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. A resource name of an Endpoint. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
    ).optional(),
    model: z.string().describe(
      "Output only. The resource name of the TunedModel. Format: `projects/{project}/locations/{location}/models/{model}@{version_id}` When tuning from a base model, the version ID will be 1. For continuous tuning, if the provided tuned_model_display_name is set and different from parent model's display name, the tuned model will have a new parent model with version 1. Otherwise the version id will be incremented by 1 from the last version ID in the parent model. E.g., `projects/{project}/locations/{location}/models/{model}@{last_version_id + 1}`",
    ).optional(),
  }).describe(
    "The Model Registry Model and Online Prediction Endpoint associated with this TuningJob.",
  ).optional(),
  tunedModelDisplayName: z.string().describe(
    "Optional. The display name of the TunedModel. The name can be up to 128 characters long and can consist of any UTF-8 characters. For continuous tuning, tuned_model_display_name will by default use the same display name as the pre-tuned model. If a new display name is provided, the tuning job will create a new model instead of a new version.",
  ).optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `dropped_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.unknown()).describe(
          "List of completions for a given prompt.",
        ).optional(),
        contents: z.array(z.unknown()).describe(
          "Multi-turn contents that represents the Prompt.",
        ).optional(),
      })).describe("Output only. Sample user examples in the training dataset.")
        .optional(),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
    }).describe(
      "Statistics computed for datasets used for preference optimization.",
    ).optional(),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `truncated_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      totalBillableCharacterCount: z.string().describe(
        "Output only. Number of billable characters in the tuning dataset.",
      ).optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      totalTruncatedExampleCount: z.string().describe(
        "Output only. The number of examples in the dataset that have been dropped. An example can be dropped for reasons including: too many tokens, contains an invalid image, contains too many images, etc.",
      ).optional(),
      totalTuningCharacterCount: z.string().describe(
        "Output only. Number of tuning characters in the tuning dataset.",
      ).optional(),
      truncatedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.unknown()).describe(
          "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
        ).optional(),
        role: z.string().describe(
          "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
        ).optional(),
      })).describe(
        "Output only. Sample user messages in the training dataset uri.",
      ).optional(),
      userInputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userOutputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
    }).describe("Tuning data statistics for Supervised Tuning.").optional(),
  }).describe("The tuning data statistic values for TuningJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  baseModel: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  evaluateDatasetRuns: z.array(z.object({
    checkpointId: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    evaluateDatasetResponse: z.object({
      aggregationOutput: z.object({
        aggregationResults: z.array(z.unknown()),
        dataset: z.object({
          bigquerySource: z.unknown(),
          gcsSource: z.unknown(),
        }),
      }),
      outputInfo: z.object({
        gcsOutputDirectory: z.string(),
      }),
    }),
    evaluationRun: z.string(),
    operationName: z.string(),
  })).optional(),
  experiment: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  preTunedModel: z.object({
    baseModel: z.string(),
    checkpointId: z.string(),
    tunedModelName: z.string(),
  }).optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean(),
    hyperParameters: z.object({
      adapterSize: z.string(),
      beta: z.number(),
      epochCount: z.string(),
      learningRateMultiplier: z.number(),
    }),
    trainingDatasetUri: z.string(),
    validationDatasetUri: z.string(),
  }).optional(),
  serviceAccount: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
        autoraterModel: z.string(),
        flipEnabled: z.boolean(),
        generationConfig: z.object({
          audioTimestamp: z.boolean(),
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
        }),
        samplingCount: z.number(),
      }),
      datasetCustomMetrics: z.array(z.object({
        aggregationFunction: z.string(),
        displayName: z.string(),
      })),
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean(),
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
          items: z.string(),
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
      }),
      metrics: z.array(z.object({
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
      })),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string(),
        }),
      }),
    }),
    exportLastCheckpointOnly: z.boolean(),
    hyperParameters: z.object({
      adapterSize: z.string(),
      epochCount: z.string(),
      learningRateMultiplier: z.number(),
    }),
    trainingDatasetUri: z.string(),
    validationDatasetUri: z.string(),
  }).optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string(),
      endpoint: z.string(),
      epoch: z.string(),
      step: z.string(),
    })),
    endpoint: z.string(),
    model: z.string(),
  }).optional(),
  tunedModelDisplayName: z.string().optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()),
      droppedExampleReasons: z.array(z.string()),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      totalBillableTokenCount: z.string(),
      tuningDatasetExampleCount: z.string(),
      tuningStepCount: z.string(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.unknown()),
        contents: z.array(z.unknown()),
      })),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
    }),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()),
      totalBillableCharacterCount: z.string(),
      totalBillableTokenCount: z.string(),
      totalTruncatedExampleCount: z.string(),
      totalTuningCharacterCount: z.string(),
      truncatedExampleIndices: z.array(z.string()),
      tuningDatasetExampleCount: z.string(),
      tuningStepCount: z.string(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.unknown()),
        role: z.string(),
      })),
      userInputTokenDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
      userOutputTokenDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.unknown(),
          left: z.unknown(),
          right: z.unknown(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  baseModel: z.string().describe(
    "The base model that is being tuned. See [Supported models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/tuning#supported_models).",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the TuningJob.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels with user-defined metadata to organize TuningJob and generated resources such as Model and Endpoint. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  preTunedModel: z.object({
    baseModel: z.string().describe(
      "Output only. The name of the base model this PreTunedModel was tuned from.",
    ).optional(),
    checkpointId: z.string().describe(
      "Optional. The source checkpoint id. If not specified, the default checkpoint will be used.",
    ).optional(),
    tunedModelName: z.string().describe(
      "The resource name of the Model. E.g., a model resource name with a specified version id or alias: `projects/{project}/locations/{location}/models/{model}@{version_id}` `projects/{project}/locations/{location}/models/{model}@{alias}` Or, omit the version id to use the default version: `projects/{project}/locations/{location}/models/{model}`",
    ).optional(),
  }).describe("A pre-tuned model for continuous tuning.").optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for Preference Optimization and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for Preference Optimization. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for preference optimization.")
        .optional(),
      beta: z.number().describe(
        "Optional. Weight for KL Divergence regularization.",
      ).optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate.",
      ).optional(),
    }).describe("Hyperparameters for Preference Optimization.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Cloud Storage path to file containing training dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Cloud Storage path to file containing validation dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
  }).describe("Tuning Spec for Preference Optimization.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the tuningJob workload runs as. If not specified, the Vertex AI Secure Fine-Tuned Service Agent in the project will be used. See https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-agent Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
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
              "The image output format for generated images.",
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
            "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
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
          responseJsonSchema: z.string().describe(
            "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
          ).optional(),
          responseLogprobs: z.boolean().describe(
            "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
          ).optional(),
          responseMimeType: z.string().describe(
            "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
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
            "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.unknown().describe(
              "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
            ).optional(),
            manualMode: z.unknown().describe(
              "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
            ).optional(),
          }).describe(
            "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
          ).optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.unknown().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.unknown().describe(
              "Configuration for a multi-speaker text-to-speech request.",
            ).optional(),
            voiceConfig: z.unknown().describe("Configuration for a voice.")
              .optional(),
          }).describe("Configuration for speech generation.").optional(),
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
            'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
          ).optional(),
          topK: z.number().describe(
            "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
          ).optional(),
          topP: z.number().describe(
            "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
          ).optional(),
        }).describe(
          "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
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
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
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
          }).describe("The image output format for generated images.")
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
          "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
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
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
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
          items: z.string().describe(
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
          "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.unknown().describe(
              "The model routing preference.",
            ).optional(),
          }).describe(
            "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
          ).optional(),
          manualMode: z.object({
            modelName: z.unknown().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe(
            "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
          ).optional(),
        }).describe(
          "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
        ).optional(),
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
            "Configuration for a multi-speaker text-to-speech request.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.unknown().describe(
              "Configuration for a prebuilt voice.",
            ).optional(),
            replicatedVoiceConfig: z.unknown().describe(
              "The configuration for the replicated voice to use.",
            ).optional(),
          }).describe("Configuration for a voice.").optional(),
        }).describe("Configuration for speech generation.").optional(),
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
          'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
      }).describe(
        "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
      ).optional(),
      metrics: z.array(z.object({
        aggregationMetrics: z.array(z.unknown()).describe(
          "Optional. The aggregation metrics to use.",
        ).optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.unknown().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe(
          "Spec for bleu score metric - calculates the precision of n-grams in the prediction as compared to reference - returns a score ranging between 0 to 1.",
        ).optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.unknown().describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.unknown().describe(
            "Required. The type of the computation based metric.",
          ).optional(),
        }).describe("Specification for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.unknown().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe(
          "Specificies a metric that is populated by evaluating user-defined Python code.",
        ).optional(),
        exactMatchSpec: z.object({}).describe(
          "Spec for exact match metric - returns 1 if prediction and reference exactly matches, otherwise 0.",
        ).optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.unknown().describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.unknown().describe(
            "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
          ).optional(),
          metricPromptTemplate: z.unknown().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.unknown().describe(
            "The spec for a pre-defined metric.",
          ).optional(),
          rubricGenerationSpec: z.unknown().describe(
            "Specification for how rubrics should be generated.",
          ).optional(),
          rubricGroupKey: z.unknown().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.unknown().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Specification for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.unknown().describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.unknown().describe(
            "The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.unknown().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.unknown().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.unknown().describe(
            "Spec for custom output format configuration.",
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
            "Spec for custom output format configuration.",
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
        }).describe(
          "Spec for rouge score metric - calculates the recall of n-grams in prediction as compared to reference - returns a score ranging between 0 and 1.",
        ).optional(),
      })).describe("Required. The metrics used for evaluation.").optional(),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string().describe(
            "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
          ).optional(),
        }).describe(
          "The Google Cloud Storage location where the output is to be written to.",
        ).optional(),
      }).describe("Config for evaluation output.").optional(),
    }).describe("Evaluation Config for Tuning Job.").optional(),
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for SFT and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for SFT. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for tuning.").optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate. Mutually exclusive with `learning_rate`. This feature is only available for 1P models.",
      ).optional(),
    }).describe("Hyperparameters for SFT.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Training dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Validation dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
  }).describe("Tuning Spec for Supervised Tuning for first party models.")
    .optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      endpoint: z.string().describe(
        "The Endpoint resource name that the checkpoint is deployed to. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
      ).optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe(
      "Output only. The checkpoints associated with this TunedModel. This field is only populated for tuning jobs that enable intermediate checkpoints.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. A resource name of an Endpoint. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
    ).optional(),
    model: z.string().describe(
      "Output only. The resource name of the TunedModel. Format: `projects/{project}/locations/{location}/models/{model}@{version_id}` When tuning from a base model, the version ID will be 1. For continuous tuning, if the provided tuned_model_display_name is set and different from parent model's display name, the tuned model will have a new parent model with version 1. Otherwise the version id will be incremented by 1 from the last version ID in the parent model. E.g., `projects/{project}/locations/{location}/models/{model}@{last_version_id + 1}`",
    ).optional(),
  }).describe(
    "The Model Registry Model and Online Prediction Endpoint associated with this TuningJob.",
  ).optional(),
  tunedModelDisplayName: z.string().describe(
    "Optional. The display name of the TunedModel. The name can be up to 128 characters long and can consist of any UTF-8 characters. For continuous tuning, tuned_model_display_name will by default use the same display name as the pre-tuned model. If a new display name is provided, the tuning job will create a new model instead of a new version.",
  ).optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `dropped_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.unknown()).describe(
          "List of completions for a given prompt.",
        ).optional(),
        contents: z.array(z.unknown()).describe(
          "Multi-turn contents that represents the Prompt.",
        ).optional(),
      })).describe("Output only. Sample user examples in the training dataset.")
        .optional(),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
    }).describe(
      "Statistics computed for datasets used for preference optimization.",
    ).optional(),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `truncated_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      totalBillableCharacterCount: z.string().describe(
        "Output only. Number of billable characters in the tuning dataset.",
      ).optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      totalTruncatedExampleCount: z.string().describe(
        "Output only. The number of examples in the dataset that have been dropped. An example can be dropped for reasons including: too many tokens, contains an invalid image, contains too many images, etc.",
      ).optional(),
      totalTuningCharacterCount: z.string().describe(
        "Output only. Number of tuning characters in the tuning dataset.",
      ).optional(),
      truncatedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.unknown()).describe(
          "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
        ).optional(),
        role: z.string().describe(
          "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
        ).optional(),
      })).describe(
        "Output only. Sample user messages in the training dataset uri.",
      ).optional(),
      userInputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userOutputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.unknown().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.unknown().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.unknown().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
    }).describe("Tuning data statistics for Supervised Tuning.").optional(),
  }).describe("The tuning data statistic values for TuningJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI TuningJobs. Registered at `@swamp/gcp/aiplatform/tuningjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/tuningjobs",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a TuningJob that runs with Google owned models.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tuningJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["baseModel"] !== undefined) body["baseModel"] = g["baseModel"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["preTunedModel"] !== undefined) {
          body["preTunedModel"] = g["preTunedModel"];
        }
        if (g["preferenceOptimizationSpec"] !== undefined) {
          body["preferenceOptimizationSpec"] = g["preferenceOptimizationSpec"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["supervisedTuningSpec"] !== undefined) {
          body["supervisedTuningSpec"] = g["supervisedTuningSpec"];
        }
        if (g["tunedModel"] !== undefined) body["tunedModel"] = g["tunedModel"];
        if (g["tunedModelDisplayName"] !== undefined) {
          body["tunedModelDisplayName"] = g["tunedModelDisplayName"];
        }
        if (g["tuningDataStats"] !== undefined) {
          body["tuningDataStats"] = g["tuningDataStats"];
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
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a tuningJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the tuningJobs"),
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
    sync: {
      description: "Sync tuningJobs state from GCP",
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
    cancel: {
      description: "cancel",
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
            "id": "aiplatform.projects.locations.tuningJobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rebase_tuned_model: {
      description: "rebase tuned model",
      arguments: z.object({
        artifactDestination: z.any().optional(),
        deployToSameEndpoint: z.any().optional(),
        tunedModelRef: z.any().optional(),
        tuningJob: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["artifactDestination"] !== undefined) {
          body["artifactDestination"] = args["artifactDestination"];
        }
        if (args["deployToSameEndpoint"] !== undefined) {
          body["deployToSameEndpoint"] = args["deployToSameEndpoint"];
        }
        if (args["tunedModelRef"] !== undefined) {
          body["tunedModelRef"] = args["tunedModelRef"];
        }
        if (args["tuningJob"] !== undefined) {
          body["tuningJob"] = args["tuningJob"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.tuningJobs.rebaseTunedModel",
            "path": "v1/{+parent}/tuningJobs:rebaseTunedModel",
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
