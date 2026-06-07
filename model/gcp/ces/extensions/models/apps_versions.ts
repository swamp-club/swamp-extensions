// Auto-generated extension model for @swamp/gcp/ces/apps-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Versions.
 *
 * In Customer Engagement Suite (CES), an app version is a snapshot of the app at a specific point in time. It is immutable and cannot be modified once created.
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
  return `${parent}/versions/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.versions.get",
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
  "id": "ces.projects.locations.apps.versions.create",
  "path": "v1/{+parent}/versions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "appVersionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "ces.projects.locations.apps.versions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "ces.projects.locations.apps.versions.list",
  "path": "v1/{+parent}/versions",
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
  description: z.string().describe(
    "Optional. The description of the app version.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the app version.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the app version. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}`",
  ).optional(),
  snapshot: z.object({
    agents: z.array(z.object({
      afterAgentCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      afterModelCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      afterToolCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeAgentCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeModelCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeToolCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      childAgents: z.array(z.string()).describe(
        "Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the agent was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the agent.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the agent.")
        .optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      generatedSummary: z.string().describe(
        "Output only. If the agent is generated by the LLM assistant, this field contains a descriptive summary of the generation.",
      ).optional(),
      guardrails: z.array(z.string()).describe(
        "Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      instruction: z.string().describe(
        "Optional. Instructions for the LLM model to guide the agent's behavior.",
      ).optional(),
      llmAgent: z.object({}).describe(
        "Default agent type. The agent uses instructions and callbacks specified in the agent to perform the task using a large language model.",
      ).optional(),
      modelSettings: z.object({
        model: z.string().describe(
          "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
        ).optional(),
        temperature: z.number().describe(
          "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
        ).optional(),
      }).describe(
        "Model settings contains various configurations for the LLM model.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      remoteDialogflowAgent: z.object({
        agent: z.string().describe(
          "Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
        environmentId: z.string().describe(
          "Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used.",
        ).optional(),
        flowId: z.string().describe(
          "Optional. The flow ID of the flow in the Dialogflow agent.",
        ).optional(),
        inputVariableMapping: z.record(z.string(), z.unknown()).describe(
          "Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input.",
        ).optional(),
        outputVariableMapping: z.record(z.string(), z.unknown()).describe(
          "Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends.",
        ).optional(),
        respectResponseInterruptionSettings: z.boolean().describe(
          "Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings.",
        ).optional(),
      }).describe(
        "The agent which will transfer execution to a remote [Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent. The Dialogflow agent will process subsequent user queries until the session ends or flow ends, and the control is transferred back to the parent CES agent.",
      ).optional(),
      tools: z.array(z.string()).describe(
        "Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
      ).optional(),
      toolsets: z.array(z.object({
        toolIds: z.unknown().describe(
          "Optional. The tools IDs to filter the toolset.",
        ).optional(),
        toolset: z.unknown().describe(
          "Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
        ).optional(),
      })).describe("Optional. List of toolsets for the agent.").optional(),
      transferRules: z.array(z.object({
        childAgent: z.unknown().describe(
          "Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
        ).optional(),
        deterministicTransfer: z.unknown().describe(
          "Deterministic transfer rule. When the condition evaluates to true, the transfer occurs.",
        ).optional(),
        direction: z.unknown().describe(
          "Required. The direction of the transfer.",
        ).optional(),
        disablePlannerTransfer: z.unknown().describe(
          "A rule that prevents the planner from transferring to the target agent.",
        ).optional(),
      })).describe(
        "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the agent was last updated.",
      ).optional(),
      validationErrors: z.array(z.string()).describe(
        "Output only. Misconfigurations or errors in the agent that may affect agent quality.",
      ).optional(),
    })).describe("Optional. List of agents in the app.").optional(),
    app: z.object({
      audioProcessingConfig: z.object({
        ambientSoundConfig: z.object({
          gcsUri: z.string().describe(
            "Optional. Ambient noise as a mono-channel, 16kHz WAV file stored in [Cloud Storage](https://cloud.google.com/storage). Note: Please make sure the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com` has `storage.objects.get` permission to the Cloud Storage object.",
          ).optional(),
          prebuiltAmbientNoise: z.enum([
            "PREBUILT_AMBIENT_NOISE_UNSPECIFIED",
            "RETAIL_STORE",
            "CONVENTION_HALL",
            "OUTDOOR",
          ]).describe(
            "Optional. Deprecated: `prebuilt_ambient_noise` is deprecated in favor of `prebuilt_ambient_sound`.",
          ).optional(),
          prebuiltAmbientSound: z.string().describe(
            'Optional. Name of the prebuilt ambient sound. Valid values are: - "coffee_shop" - "keyboard" - "keypad" - "hum" - "office_1" - "office_2" - "office_3" - "room_1" - "room_2" - "room_3" - "room_4" - "room_5" - "air_conditioner"',
          ).optional(),
          volumeGainDb: z.number().describe(
            "Optional. Volume gain (in dB) of the normal native volume supported by ambient noise, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. We strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that.",
          ).optional(),
        }).describe(
          "Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation.",
        ).optional(),
        bargeInConfig: z.object({
          bargeInAwareness: z.boolean().describe(
            "Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually.",
          ).optional(),
          disableBargeIn: z.boolean().describe(
            "Optional. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile.",
          ).optional(),
        }).describe(
          "Configuration for how the user barge-in activities should be handled.",
        ).optional(),
        inactivityTimeout: z.string().describe(
          "Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement.",
        ).optional(),
        synthesizeSpeechConfigs: z.record(
          z.string(),
          z.object({
            speakingRate: z.unknown().describe(
              "Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error.",
            ).optional(),
            voice: z.unknown().describe(
              "Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech.",
            ).optional(),
          }),
        ).describe(
          'Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive.',
        ).optional(),
      }).describe(
        "Configuration for how the input and output audio should be processed and delivered.",
      ).optional(),
      clientCertificateSettings: z.object({
        passphrase: z.string().describe(
          "Optional. The name of the SecretManager secret version resource storing the passphrase to decrypt the private key. Should be left unset if the private key is not encrypted. Format: `projects/{project}/secrets/{secret}/versions/{version}`",
        ).optional(),
        privateKey: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the private key encoded in PEM format. Format: `projects/{project}/secrets/{secret}/versions/{version}`",
        ).optional(),
        tlsCertificate: z.string().describe(
          "Required. The TLS certificate encoded in PEM format. This string must include the begin header and end footer lines.",
        ).optional(),
      }).describe("Settings for custom client certificates.").optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the app was created.",
      ).optional(),
      dataStoreSettings: z.object({
        engines: z.array(z.object({
          name: z.unknown().describe(
            "Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
          ).optional(),
          type: z.unknown().describe("Output only. The type of the engine.")
            .optional(),
        })).describe("Output only. The engines for the app.").optional(),
      }).describe("Data store related settings for the app.").optional(),
      defaultChannelProfile: z.object({
        channelType: z.enum([
          "UNKNOWN",
          "WEB_UI",
          "API",
          "TWILIO",
          "GOOGLE_TELEPHONY_PLATFORM",
          "CONTACT_CENTER_AS_A_SERVICE",
          "FIVE9",
          "CONTACT_CENTER_INTEGRATION",
        ]).describe("Optional. The type of the channel profile.").optional(),
        disableBargeInControl: z.boolean().describe(
          "Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt.",
        ).optional(),
        disableDtmf: z.boolean().describe(
          "Optional. Whether to disable DTMF (dual-tone multi-frequency).",
        ).optional(),
        noiseSuppressionLevel: z.string().describe(
          'Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high".',
        ).optional(),
        personaProperty: z.object({
          persona: z.enum(["UNKNOWN", "CONCISE", "CHATTY"]).describe(
            "Optional. The persona of the channel.",
          ).optional(),
        }).describe("Represents the persona property of a channel.").optional(),
        profileId: z.string().describe(
          "Optional. The unique identifier of the channel profile.",
        ).optional(),
        webWidgetConfig: z.object({
          modality: z.enum([
            "MODALITY_UNSPECIFIED",
            "CHAT_AND_VOICE",
            "VOICE_ONLY",
            "CHAT_ONLY",
            "CHAT_VOICE_AND_VIDEO",
          ]).describe("Optional. The modality of the web widget.").optional(),
          securitySettings: z.object({
            allowedOrigins: z.unknown().describe(
              'Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com"',
            ).optional(),
            enableOriginCheck: z.unknown().describe(
              "Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins.",
            ).optional(),
            enablePublicAccess: z.unknown().describe(
              "Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent.",
            ).optional(),
            enableRecaptcha: z.unknown().describe(
              "Optional. Indicates whether reCAPTCHA verification for the web widget is enabled.",
            ).optional(),
          }).describe("Security settings for the web widget.").optional(),
          theme: z.enum(["THEME_UNSPECIFIED", "LIGHT", "DARK"]).describe(
            "Optional. The theme of the web widget.",
          ).optional(),
          webWidgetTitle: z.string().describe(
            "Optional. The title of the web widget.",
          ).optional(),
        }).describe("Message for configuration for the web widget.").optional(),
      }).describe(
        "A ChannelProfile configures the agent's behavior for a specific communication channel, such as web UI or telephony.",
      ).optional(),
      deploymentCount: z.number().int().describe(
        "Output only. Number of deployments in the app.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the app.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the app.")
        .optional(),
      errorHandlingSettings: z.object({
        endSessionConfig: z.object({
          escalateSession: z.boolean().describe(
            "Optional. Whether to escalate the session in EndSession. If session is escalated, metadata in EndSession will contain `session_escalated = true`. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/deploy/google-telephony-platform#transfer_a_call_to_a_human_agent for details.",
          ).optional(),
        }).describe(
          "Configuration for ending the session in case of system errors (e.g. LLM errors).",
        ).optional(),
        errorHandlingStrategy: z.enum([
          "ERROR_HANDLING_STRATEGY_UNSPECIFIED",
          "NONE",
          "FALLBACK_RESPONSE",
          "END_SESSION",
        ]).describe("Optional. The strategy to use for error handling.")
          .optional(),
        fallbackResponseConfig: z.object({
          customFallbackMessages: z.record(z.string(), z.unknown()).describe(
            "Optional. The fallback messages in case of system errors (e.g. LLM errors), mapped by [supported language code](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/reference/language).",
          ).optional(),
          maxFallbackAttempts: z.number().int().describe(
            "Optional. The maximum number of fallback attempts to make before the agent emitting EndSession Signal.",
          ).optional(),
        }).describe("Configuration for handling fallback responses.")
          .optional(),
      }).describe(
        "Settings to describe how errors should be handled in the app.",
      ).optional(),
      etag: z.string().describe(
        "Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      evaluationMetricsThresholds: z.object({
        goldenEvaluationMetricsThresholds: z.object({
          expectationLevelMetricsThresholds: z.object({
            toolInvocationParameterCorrectnessThreshold: z.unknown().describe(
              "Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0.",
            ).optional(),
          }).describe("Expectation level metrics thresholds.").optional(),
          toolMatchingSettings: z.object({
            extraToolCallBehavior: z.unknown().describe(
              "Optional. Behavior for extra tool calls. Defaults to FAIL.",
            ).optional(),
          }).describe("Settings for matching tool calls.").optional(),
          turnLevelMetricsThresholds: z.object({
            overallToolInvocationCorrectnessThreshold: z.unknown().describe(
              "Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0.",
            ).optional(),
            semanticSimilarityChannel: z.unknown().describe(
              "Optional. The semantic similarity channel to use for evaluation.",
            ).optional(),
            semanticSimilaritySuccessThreshold: z.unknown().describe(
              "Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3.",
            ).optional(),
          }).describe("Turn level metrics thresholds.").optional(),
        }).describe("Settings for golden evaluations.").optional(),
        goldenHallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. The hallucination metric behavior for golden evaluations.",
        ).optional(),
        hallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. Deprecated: Use `golden_hallucination_metric_behavior` instead. The hallucination metric behavior is currently used for golden evaluations.",
        ).optional(),
        scenarioHallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. The hallucination metric behavior for scenario evaluations.",
        ).optional(),
      }).describe("Threshold settings for metrics in an Evaluation.")
        .optional(),
      globalInstruction: z.string().describe(
        "Optional. Instructions for all the agents in the app. You can use this instruction to set up a stable identity or personality across all the agents.",
      ).optional(),
      guardrails: z.array(z.string()).describe(
        "Optional. List of guardrails for the app. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      languageSettings: z.object({
        defaultLanguageCode: z.string().describe(
          "Optional. The default language code of the app.",
        ).optional(),
        enableMultilingualSupport: z.boolean().describe(
          "Optional. Enables multilingual support. If true, agents in the app will use pre-built instructions to improve handling of multilingual input.",
        ).optional(),
        fallbackAction: z.string().describe(
          'Optional. Deprecated: This feature is no longer supported. Use `enable_multilingual_support` instead to improve handling of multilingual input. The action to perform when an agent receives input in an unsupported language. This can be a predefined action or a custom tool call. Valid values are: - A tool\'s full resource name, which triggers a specific tool execution. - A predefined system action, such as "escalate" or "exit", which triggers an EndSession signal with corresponding metadata to terminate the conversation.',
        ).optional(),
        supportedLanguageCodes: z.array(z.string()).describe(
          "Optional. List of languages codes supported by the app, in addition to the `default_language_code`.",
        ).optional(),
      }).describe("Language settings of the app.").optional(),
      locked: z.boolean().describe(
        "Optional. Indicates whether the app is locked for changes. If the app is locked, modifications to the app resources will be rejected.",
      ).optional(),
      loggingSettings: z.object({
        audioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
        bigqueryExportSettings: z.object({
          dataset: z.string().describe(
            "Optional. The BigQuery **dataset ID** to export the data to.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Indicates whether the BigQuery export is enabled.",
          ).optional(),
          project: z.string().describe(
            "Optional. The **project ID** of the BigQuery dataset to export the data to. Note: If the BigQuery dataset is in a different project from the app, you should grant `roles/bigquery.admin` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
        }).describe(
          "Settings to describe the BigQuery export behaviors for the app.",
        ).optional(),
        cloudLoggingSettings: z.object({
          enableCloudLogging: z.boolean().describe(
            "Optional. Whether to enable Cloud Logging for the sessions.",
          ).optional(),
        }).describe(
          "Settings to describe the Cloud Logging behaviors for the app.",
        ).optional(),
        conversationLoggingSettings: z.object({
          disableConversationLogging: z.boolean().describe(
            "Optional. Whether to disable conversation logging for the sessions.",
          ).optional(),
          retentionWindow: z.string().describe(
            "Optional. Controls the retention window for the conversation. If not set, the conversation will be retained for 365 days.",
          ).optional(),
        }).describe(
          "Settings to describe the conversation logging behaviors for the app.",
        ).optional(),
        evaluationAudioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
        metricAnalysisSettings: z.object({
          llmMetricsOptedOut: z.boolean().describe(
            "Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected.",
          ).optional(),
        }).describe(
          "Settings to describe the conversation data collection behaviors for LLM analysis metrics pipeline.",
        ).optional(),
        redactionConfig: z.object({
          deidentifyTemplate: z.string().describe(
            "Optional. [DLP](https://cloud.google.com/dlp/docs) deidentify template name to instruct on how to de-identify content. Format: `projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}`",
          ).optional(),
          enableRedaction: z.boolean().describe(
            "Optional. If true, redaction will be applied in various logging scenarios, including conversation history, Cloud Logging and audio recording.",
          ).optional(),
          inspectTemplate: z.string().describe(
            "Optional. [DLP](https://cloud.google.com/dlp/docs) inspect template name to configure detection of sensitive data types. Format: `projects/{project}/locations/{location}/inspectTemplates/{inspect_template}`",
          ).optional(),
        }).describe(
          "Configuration to instruct how sensitive data should be handled.",
        ).optional(),
        unredactedAudioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
      }).describe("Settings to describe the logging behaviors for the app.")
        .optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. Metadata about the app. This field can be used to store additional information relevant to the app's details or intended usages.",
      ).optional(),
      modelSettings: z.object({
        model: z.string().describe(
          "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
        ).optional(),
        temperature: z.number().describe(
          "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
        ).optional(),
      }).describe(
        "Model settings contains various configurations for the LLM model.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}`",
      ).optional(),
      pinned: z.boolean().describe(
        "Optional. Whether the app is pinned in the app list.",
      ).optional(),
      predefinedVariableDeclarations: z.array(z.object({
        description: z.string().describe(
          "Required. The description of the variable.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
        ).optional(),
        schema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      })).describe(
        "Output only. The declarations of predefined variables for the app.",
      ).optional(),
      rootAgent: z.string().describe(
        "Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      timeZoneSettings: z.object({
        timeZone: z.string().describe(
          "Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris.",
        ).optional(),
      }).describe("TimeZone settings of the app.").optional(),
      toolExecutionMode: z.enum([
        "TOOL_EXECUTION_MODE_UNSPECIFIED",
        "PARALLEL",
        "SEQUENTIAL",
      ]).describe(
        "Optional. The tool execution mode for the app. If not provided, will default to PARALLEL.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the app was last updated.",
      ).optional(),
      validationErrors: z.array(z.string()).describe(
        "Output only. Misconfigurations or warnings in the app.",
      ).optional(),
      variableDeclarations: z.array(z.object({
        description: z.string().describe(
          "Required. The description of the variable.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
        ).optional(),
        schema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      })).describe("Optional. The declarations of the variables.").optional(),
      vpcScSettings: z.object({
        allowedOrigins: z.array(z.string()).describe(
          'Optional. The allowed HTTP(s) origins that OpenAPI tools in the App are able to directly call when VPC Service Controls are enabled. These strings must match the origin exactly, including the port if specified. For example, "https://example.com" or "https://example.com:443". This list does not yet apply to Python tools that may make direct HTTP calls.',
        ).optional(),
      }).describe("VPC-SC settings for the app.").optional(),
    }).describe(
      "An app serves as a top-level container for a group of agents, including the root agent and its sub-agents, along with their associated configurations. These agents work together to achieve specific goals within the app's context.",
    ).optional(),
    examples: z.array(z.object({
      createTime: z.string().describe(
        "Output only. Timestamp when the example was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the example.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the example.")
        .optional(),
      entryAgent: z.string().describe(
        "Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      invalid: z.boolean().describe(
        "Output only. The example may become invalid if referencing resources are deleted. Invalid examples will not be used as few-shot examples.",
      ).optional(),
      messages: z.array(z.object({
        chunks: z.unknown().describe(
          "Optional. Content of the message as a series of chunks.",
        ).optional(),
        eventTime: z.unknown().describe(
          "Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example.",
        ).optional(),
        role: z.unknown().describe(
          "Optional. The role within the conversation, e.g., user, agent.",
        ).optional(),
      })).describe(
        "Optional. The collection of messages that make up the conversation.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}`",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the example was last updated.",
      ).optional(),
    })).describe("Optional. List of examples in the app.").optional(),
    guardrails: z.array(z.object({
      action: z.object({
        generativeAnswer: z.object({
          prompt: z.unknown().describe(
            "Required. The prompt to use for the generative answer.",
          ).optional(),
        }).describe(
          "The agent will immediately respond with a generative answer.",
        ).optional(),
        respondImmediately: z.object({
          responses: z.unknown().describe(
            "Required. The canned responses for the agent to choose from. The response is chosen randomly.",
          ).optional(),
        }).describe(
          "The agent will immediately respond with a preconfigured response.",
        ).optional(),
        transferAgent: z.object({
          agent: z.unknown().describe(
            "Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
          ).optional(),
        }).describe(
          "The agent will transfer the conversation to a different agent.",
        ).optional(),
      }).describe("Action that is taken when a certain precondition is met.")
        .optional(),
      codeCallback: z.object({
        afterAgentCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        afterModelCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        beforeAgentCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        beforeModelCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
      }).describe(
        "Guardrail that blocks the conversation based on the code callbacks provided.",
      ).optional(),
      contentFilter: z.object({
        bannedContents: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies to both user inputs and agent responses.",
        ).optional(),
        bannedContentsInAgentResponse: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies only to agent responses.",
        ).optional(),
        bannedContentsInUserInput: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies only to user inputs.",
        ).optional(),
        disregardDiacritics: z.boolean().describe(
          "Optional. If true, diacritics are ignored during matching.",
        ).optional(),
        matchType: z.enum([
          "MATCH_TYPE_UNSPECIFIED",
          "SIMPLE_STRING_MATCH",
          "WORD_BOUNDARY_STRING_MATCH",
          "REGEXP_MATCH",
        ]).describe("Required. Match type for the content filter.").optional(),
      }).describe(
        "Guardrail that bans certain content from being used in the conversation.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the guardrail was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the guardrail.",
      ).optional(),
      displayName: z.string().describe(
        "Required. Display name of the guardrail.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Whether the guardrail is enabled.",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      llmPolicy: z.object({
        allowShortUtterance: z.boolean().describe(
          "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
        ).optional(),
        failOpen: z.boolean().describe(
          "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
        ).optional(),
        maxConversationMessages: z.number().int().describe(
          "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
        ).optional(),
        modelSettings: z.object({
          model: z.unknown().describe(
            "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
          ).optional(),
          temperature: z.unknown().describe(
            "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
          ).optional(),
        }).describe(
          "Model settings contains various configurations for the LLM model.",
        ).optional(),
        policyScope: z.enum([
          "POLICY_SCOPE_UNSPECIFIED",
          "USER_QUERY",
          "AGENT_RESPONSE",
          "USER_QUERY_AND_AGENT_RESPONSE",
        ]).describe(
          "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
        ).optional(),
        prompt: z.string().describe("Required. Policy prompt.").optional(),
      }).describe(
        "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
      ).optional(),
      llmPromptSecurity: z.object({
        customPolicy: z.object({
          allowShortUtterance: z.unknown().describe(
            "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
          ).optional(),
          failOpen: z.unknown().describe(
            "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
          ).optional(),
          maxConversationMessages: z.unknown().describe(
            "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
          ).optional(),
          modelSettings: z.unknown().describe(
            "Model settings contains various configurations for the LLM model.",
          ).optional(),
          policyScope: z.unknown().describe(
            "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
          ).optional(),
          prompt: z.unknown().describe("Required. Policy prompt.").optional(),
        }).describe(
          "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
        ).optional(),
        defaultSettings: z.object({
          defaultPromptTemplate: z.unknown().describe(
            "Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY.",
          ).optional(),
        }).describe("Configuration for default system security settings.")
          .optional(),
        failOpen: z.boolean().describe(
          "Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration.",
        ).optional(),
      }).describe(
        "Guardrail that blocks the conversation if the input is considered unsafe based on the LLM classification.",
      ).optional(),
      modelSafety: z.object({
        safetySettings: z.array(z.unknown()).describe(
          "Required. List of safety settings.",
        ).optional(),
      }).describe(
        "Model safety settings overrides. When this is set, it will override the default settings and trigger the guardrail if the response is considered unsafe.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the guardrail was last updated.",
      ).optional(),
    })).describe("Optional. List of guardrails in the app.").optional(),
    tools: z.array(z.object({
      agentTool: z.object({
        agent: z.string().describe(
          "Optional. The resource name of the agent that is the entry point of the tool. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the tool's purpose.",
        ).optional(),
        name: z.string().describe("Required. The name of the agent tool.")
          .optional(),
        rootAgent: z.string().describe(
          "Optional. Deprecated: Use `agent` instead. The resource name of the root agent that is the entry point of the tool. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
      }).describe(
        "Represents a tool that allows the agent to call another agent.",
      ).optional(),
      clientFunction: z.object({
        description: z.string().describe("Optional. The function description.")
          .optional(),
        name: z.string().describe("Required. The function name.").optional(),
        parameters: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        response: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      }).describe(
        "Represents a client-side function that the agent can invoke. When the tool is chosen by the agent, control is handed off to the client. The client is responsible for executing the function and returning the result as a ToolResponse to continue the interaction with the agent.",
      ).optional(),
      connectorTool: z.object({
        action: z.object({
          connectionActionId: z.unknown().describe(
            "ID of a Connection action for the tool to use.",
          ).optional(),
          entityOperation: z.unknown().describe(
            "Entity CRUD operation specification.",
          ).optional(),
          inputFields: z.unknown().describe(
            "Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used.",
          ).optional(),
          outputFields: z.unknown().describe(
            "Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned.",
          ).optional(),
        }).describe(
          "Configuration of an Action for the tool to use. Note: This can be either an Action or an Operation. See https://cloud.google.com/integration-connectors/docs/entities-operation-action for details.",
        ).optional(),
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown().describe(
            "Oauth 2.0 Authorization Code authentication configuration.",
          ).optional(),
          oauth2JwtBearerConfig: z.unknown().describe(
            "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
          ).optional(),
        }).describe(
          "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
        ).optional(),
        connection: z.string().describe(
          "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the tool that can be used by the Agent to decide whether to call this ConnectorTool.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the tool that can be used by the Agent to decide whether to call this ConnectorTool.",
        ).optional(),
      }).describe(
        "A ConnectorTool allows connections to different integrations. See: https://cloud.google.com/integration-connectors/docs/overview.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the tool was created.",
      ).optional(),
      dataStoreTool: z.object({
        boostSpecs: z.array(z.unknown()).describe(
          "Optional. Boost specification to boost certain documents.",
        ).optional(),
        dataStoreSource: z.object({
          dataStore: z.unknown().describe(
            "A DataStore resource in Vertex AI Search.",
          ).optional(),
          filter: z.unknown().describe(
            "Optional. Filter specification for the DataStore. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata",
          ).optional(),
        }).describe("Configuration for searching within a specific DataStore.")
          .optional(),
        description: z.string().describe("Optional. The tool description.")
          .optional(),
        engineSource: z.object({
          dataStoreSources: z.unknown().describe(
            "Optional. Use to target specific DataStores within the Engine. If empty, the search applies to all DataStores associated with the Engine.",
          ).optional(),
          engine: z.unknown().describe(
            "Required. Full resource name of the Engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
          ).optional(),
          filter: z.unknown().describe(
            "Optional. A filter applied to the search across the Engine. Not relevant and not used if 'data_store_sources' is provided. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata",
          ).optional(),
        }).describe(
          "Configuration for searching within an Engine, potentially targeting specific DataStores.",
        ).optional(),
        filterParameterBehavior: z.enum([
          "FILTER_PARAMETER_BEHAVIOR_UNSPECIFIED",
          "ALWAYS_INCLUDE",
          "NEVER_INCLUDE",
        ]).describe("Optional. The filter parameter behavior.").optional(),
        modalityConfigs: z.array(z.unknown()).describe(
          "Optional. The modality configs for the data store.",
        ).optional(),
        name: z.string().describe("Required. The data store tool name.")
          .optional(),
      }).describe(
        "Tool to retrieve from Vertex AI Search datastore or engine for grounding. Accepts either a datastore or an engine, but not both. See Vertex AI Search: https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The display name of the tool, derived based on the tool's type. For example, display name of a ClientFunction is derived from its `name` property.",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      executionType: z.enum([
        "EXECUTION_TYPE_UNSPECIFIED",
        "SYNCHRONOUS",
        "ASYNCHRONOUS",
      ]).describe("Optional. The execution type of the tool.").optional(),
      fileSearchTool: z.object({
        corpusType: z.enum([
          "CORPUS_TYPE_UNSPECIFIED",
          "USER_OWNED",
          "FULLY_MANAGED",
        ]).describe(
          "Optional. The type of the corpus. Default is FULLY_MANAGED.",
        ).optional(),
        description: z.string().describe("Optional. The tool description.")
          .optional(),
        fileCorpus: z.string().describe(
          "Optional. The corpus where files are stored. Format: projects/{project}/locations/{location}/ragCorpora/{rag_corpus}",
        ).optional(),
        name: z.string().describe("Required. The tool name.").optional(),
      }).describe(
        "The file search tool allows the agent to search across the files uploaded by the app/agent developer. It has presets to give relatively good quality search over the uploaded files and summarization of the retrieved results.",
      ).optional(),
      generatedSummary: z.string().describe(
        "Output only. If the tool is generated by the LLM assistant, this field contains a descriptive summary of the generation.",
      ).optional(),
      googleSearchTool: z.object({
        contextUrls: z.array(z.unknown()).describe(
          'Optional. Content will be fetched directly from these URLs for context and grounding. Example: "https://example.com/path.html". A maximum of 20 URLs are allowed.',
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the tool's purpose.",
        ).optional(),
        excludeDomains: z.array(z.unknown()).describe(
          'Optional. List of domains to be excluded from the search results. Example: "example.com". A maximum of 2000 domains can be excluded.',
        ).optional(),
        name: z.string().describe("Required. The name of the tool.").optional(),
        preferredDomains: z.array(z.unknown()).describe(
          'Optional. Specifies domains to restrict search results to. Example: "example.com", "another.site". A maximum of 20 domains can be specified.',
        ).optional(),
        promptConfig: z.object({
          textPrompt: z.unknown().describe(
            "Optional. Defines the prompt used for the system instructions when interacting with the agent in chat conversations. If not set, default prompt will be used.",
          ).optional(),
          voicePrompt: z.unknown().describe(
            "Optional. Defines the prompt used for the system instructions when interacting with the agent in voice conversations. If not set, default prompt will be used.",
          ).optional(),
        }).describe(
          "Prompt settings used by the model when processing or summarizing the google search results.",
        ).optional(),
      }).describe(
        "Represents a tool to perform Google web searches for grounding. See https://cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool#google-search.",
      ).optional(),
      mcpTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        customHeaders: z.record(z.string(), z.unknown()).describe(
          "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the MCP tool.",
        ).optional(),
        inputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        name: z.string().describe("Required. The name of the MCP tool.")
          .optional(),
        outputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        serverAddress: z.string().describe(
          'Required. The server address of the MCP server, e.g., "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. This is the same as the server_address in the McpToolset. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
      }).describe(
        "An MCP tool. See https://modelcontextprotocol.io/specification/2025-06-18/server/tools for more details.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected.",
      ).optional(),
      openApiTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        description: z.string().describe(
          "Optional. The description of the tool. If not provided, the description of the tool will be derived from the OpenAPI schema, from `operation.description` or `operation.summary`.",
        ).optional(),
        ignoreUnknownFields: z.boolean().describe(
          "Optional. If true, the agent will ignore unknown fields in the API response.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the tool. If not provided, the name of the tool will be derived from the OpenAPI schema, from `operation.operationId`.",
        ).optional(),
        openApiSchema: z.string().describe(
          "Required. The OpenAPI schema in JSON or YAML format.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
        url: z.string().describe(
          "Optional. The server URL of the Open API schema. This field is only set in tools in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
        ).optional(),
      }).describe("A remote API tool defined by an OpenAPI schema.").optional(),
      pythonFunction: z.object({
        description: z.string().describe(
          "Output only. The description of the Python function, parsed from the python code's docstring.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the Python function to execute. Must match a Python function name defined in the python code. Case sensitive. If the name is not provided, the first function defined in the python code will be used.",
        ).optional(),
        pythonCode: z.string().describe(
          "Optional. The Python code to execute for the tool.",
        ).optional(),
      }).describe("A Python function tool.").optional(),
      remoteAgentTool: z.object({
        agentCard: z.object({
          description: z.unknown().describe(
            "Required. A description of the agent's domain of action/solution space.",
          ).optional(),
          name: z.unknown().describe(
            "Required. A human-readable name for the agent.",
          ).optional(),
          skills: z.unknown().describe(
            "Required. Skills represent a unit of ability an agent can perform. This may somewhat abstract but represents a more focused set of actions that the agent is highly likely to succeed at.",
          ).optional(),
          supportedInterfaces: z.unknown().describe(
            "Required. Ordered list of supported interfaces. The first entry is preferred.",
          ).optional(),
          version: z.unknown().describe("Required. The version of the agent.")
            .optional(),
        }).describe(
          "AgentCard conveys key information about a remote agent. It is a trimmed version of the AgentCard defined in the A2A protocol https://a2a-protocol.org/dev/specification/#441-agentcard",
        ).optional(),
        description: z.string().describe(
          "Required. The description of the tool.",
        ).optional(),
        name: z.string().describe("Required. The name of the tool.").optional(),
      }).describe(
        "Represents a tool that allows the agent to call another remote agent.",
      ).optional(),
      systemTool: z.object({
        description: z.string().describe(
          "Output only. The description of the system tool.",
        ).optional(),
        name: z.string().describe("Required. The name of the system tool.")
          .optional(),
      }).describe("Pre-defined system tool.").optional(),
      timeout: z.string().describe(
        "Optional. The timeout for the tool execution. If not set, the default timeout is 30 seconds for `SYNCHRONOUS` tools and 60 seconds for `ASYNCHRONOUS` tools.",
      ).optional(),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown().describe(
            "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
          ).optional(),
        }).describe("A code block to be executed instead of a real tool call.")
          .optional(),
        enableFakeMode: z.boolean().describe(
          "Optional. Whether the tool is using fake mode.",
        ).optional(),
      }).describe("Configuration for tool behavior in fake mode.").optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the tool was last updated.",
      ).optional(),
      widgetTool: z.object({
        dataMapping: z.object({
          fieldMappings: z.unknown().describe(
            "Optional. A map of widget input parameter fields to the corresponding output fields of the source tool.",
          ).optional(),
          mode: z.unknown().describe("Optional. The mode of the data mapping.")
            .optional(),
          pythonFunction: z.unknown().describe("A Python function tool.")
            .optional(),
          pythonScript: z.unknown().describe(
            "Deprecated: Use `python_function` instead.",
          ).optional(),
          sourceToolName: z.unknown().describe(
            "Optional. The resource name of the tool that provides the data for the widget (e.g., a search tool or a custom function). Format: `projects/{project}/locations/{location}/agents/{agent}/tools/{tool}`",
          ).optional(),
        }).describe(
          "Configuration for mapping data from a source tool to the widget's input parameters.",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the widget tool.",
        ).optional(),
        name: z.string().describe(
          "Required. The display name of the widget tool.",
        ).optional(),
        parameters: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        textResponseConfig: z.object({
          staticText: z.unknown().describe(
            "Optional. The static text response to return when type is STATIC.",
          ).optional(),
          textResponseInstruction: z.unknown().describe(
            "Optional. Instruction for the LLM on how to generate the text response. Used as the description for the text response parameter if type is LLM_GENERATED.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The strategy for providing the text response.",
          ).optional(),
        }).describe(
          "Configuration for the text response returned with the widget.",
        ).optional(),
        uiConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Configuration for rendering the widget.",
        ).optional(),
        widgetType: z.enum([
          "WIDGET_TYPE_UNSPECIFIED",
          "CUSTOM",
          "PRODUCT_CAROUSEL",
          "PRODUCT_DETAILS",
          "QUICK_ACTIONS",
          "PRODUCT_COMPARISON",
          "ADVANCED_PRODUCT_DETAILS",
          "SHORT_FORM",
          "OVERALL_SATISFACTION",
          "ORDER_SUMMARY",
          "APPOINTMENT_DETAILS",
          "APPOINTMENT_SCHEDULER",
          "CONTACT_FORM",
        ]).describe(
          "Optional. The type of the widget tool. If not specified, the default type will be CUSTOMIZED.",
        ).optional(),
      }).describe(
        "Represents a widget tool that the agent can invoke. When the tool is chosen by the agent, agent will return the widget to the client. The client is responsible for processing the widget and generating the next user query to continue the interaction with the agent.",
      ).optional(),
    })).describe("Optional. List of tools in the app.").optional(),
    toolsets: z.array(z.object({
      connectorToolset: z.object({
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown().describe(
            "Oauth 2.0 Authorization Code authentication configuration.",
          ).optional(),
          oauth2JwtBearerConfig: z.unknown().describe(
            "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
          ).optional(),
        }).describe(
          "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
        ).optional(),
        connection: z.string().describe(
          "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
        ).optional(),
        connectorActions: z.array(z.unknown()).describe(
          "Required. The list of connector actions/entity operations to generate tools for.",
        ).optional(),
      }).describe(
        "A toolset that generates tools from an Integration Connectors Connection.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the toolset was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The description of the toolset.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. The display name of the toolset. Must be unique within the same app.",
      ).optional(),
      etag: z.string().describe(
        "ETag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      executionType: z.enum([
        "EXECUTION_TYPE_UNSPECIFIED",
        "SYNCHRONOUS",
        "ASYNCHRONOUS",
      ]).describe("Optional. The execution type of the tools in the toolset.")
        .optional(),
      mcpToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        customHeaders: z.record(z.string(), z.unknown()).describe(
          "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
        ).optional(),
        serverAddress: z.string().describe(
          'Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
      }).describe(
        "A toolset that contains a list of tools that are offered by the MCP server.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
      ).optional(),
      openApiToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        ignoreUnknownFields: z.boolean().describe(
          "Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema.",
        ).optional(),
        openApiSchema: z.string().describe(
          "Required. The OpenAPI schema of the toolset.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
        url: z.string().describe(
          "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
        ).optional(),
      }).describe(
        "A toolset that contains a list of tools that are defined by an OpenAPI schema.",
      ).optional(),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown().describe(
            "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
          ).optional(),
        }).describe("A code block to be executed instead of a real tool call.")
          .optional(),
        enableFakeMode: z.boolean().describe(
          "Optional. Whether the tool is using fake mode.",
        ).optional(),
      }).describe("Configuration for tool behavior in fake mode.").optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the toolset was last updated.",
      ).optional(),
    })).describe("Optional. List of toolsets in the app.").optional(),
  }).describe("A snapshot of the app.").optional(),
  appVersionId: z.string().describe(
    "Optional. The ID to use for the app version, which will become the final component of the app version's resource name. If not provided, a unique ID will be automatically assigned for the app version.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creator: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  snapshot: z.object({
    agents: z.array(z.object({
      afterAgentCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      afterModelCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      afterToolCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      beforeAgentCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      beforeModelCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      beforeToolCallbacks: z.array(z.object({
        description: z.unknown(),
        disabled: z.unknown(),
        proactiveExecutionEnabled: z.unknown(),
        pythonCode: z.unknown(),
      })),
      childAgents: z.array(z.string()),
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      etag: z.string(),
      generatedSummary: z.string(),
      guardrails: z.array(z.string()),
      instruction: z.string(),
      llmAgent: z.object({}),
      modelSettings: z.object({
        model: z.string(),
        temperature: z.number(),
      }),
      name: z.string(),
      remoteDialogflowAgent: z.object({
        agent: z.string(),
        environmentId: z.string(),
        flowId: z.string(),
        inputVariableMapping: z.record(z.string(), z.unknown()),
        outputVariableMapping: z.record(z.string(), z.unknown()),
        respectResponseInterruptionSettings: z.boolean(),
      }),
      tools: z.array(z.string()),
      toolsets: z.array(z.object({
        toolIds: z.unknown(),
        toolset: z.unknown(),
      })),
      transferRules: z.array(z.object({
        childAgent: z.unknown(),
        deterministicTransfer: z.unknown(),
        direction: z.unknown(),
        disablePlannerTransfer: z.unknown(),
      })),
      updateTime: z.string(),
      validationErrors: z.array(z.string()),
    })),
    app: z.object({
      audioProcessingConfig: z.object({
        ambientSoundConfig: z.object({
          gcsUri: z.string(),
          prebuiltAmbientNoise: z.string(),
          prebuiltAmbientSound: z.string(),
          volumeGainDb: z.number(),
        }),
        bargeInConfig: z.object({
          bargeInAwareness: z.boolean(),
          disableBargeIn: z.boolean(),
        }),
        inactivityTimeout: z.string(),
        synthesizeSpeechConfigs: z.record(z.string(), z.unknown()),
      }),
      clientCertificateSettings: z.object({
        passphrase: z.string(),
        privateKey: z.string(),
        tlsCertificate: z.string(),
      }),
      createTime: z.string(),
      dataStoreSettings: z.object({
        engines: z.array(z.object({
          name: z.unknown(),
          type: z.unknown(),
        })),
      }),
      defaultChannelProfile: z.object({
        channelType: z.string(),
        disableBargeInControl: z.boolean(),
        disableDtmf: z.boolean(),
        noiseSuppressionLevel: z.string(),
        personaProperty: z.object({
          persona: z.string(),
        }),
        profileId: z.string(),
        webWidgetConfig: z.object({
          modality: z.string(),
          securitySettings: z.object({
            allowedOrigins: z.unknown(),
            enableOriginCheck: z.unknown(),
            enablePublicAccess: z.unknown(),
            enableRecaptcha: z.unknown(),
          }),
          theme: z.string(),
          webWidgetTitle: z.string(),
        }),
      }),
      deploymentCount: z.number(),
      description: z.string(),
      displayName: z.string(),
      errorHandlingSettings: z.object({
        endSessionConfig: z.object({
          escalateSession: z.boolean(),
        }),
        errorHandlingStrategy: z.string(),
        fallbackResponseConfig: z.object({
          customFallbackMessages: z.record(z.string(), z.unknown()),
          maxFallbackAttempts: z.number(),
        }),
      }),
      etag: z.string(),
      evaluationMetricsThresholds: z.object({
        goldenEvaluationMetricsThresholds: z.object({
          expectationLevelMetricsThresholds: z.object({
            toolInvocationParameterCorrectnessThreshold: z.unknown(),
          }),
          toolMatchingSettings: z.object({
            extraToolCallBehavior: z.unknown(),
          }),
          turnLevelMetricsThresholds: z.object({
            overallToolInvocationCorrectnessThreshold: z.unknown(),
            semanticSimilarityChannel: z.unknown(),
            semanticSimilaritySuccessThreshold: z.unknown(),
          }),
        }),
        goldenHallucinationMetricBehavior: z.string(),
        hallucinationMetricBehavior: z.string(),
        scenarioHallucinationMetricBehavior: z.string(),
      }),
      globalInstruction: z.string(),
      guardrails: z.array(z.string()),
      languageSettings: z.object({
        defaultLanguageCode: z.string(),
        enableMultilingualSupport: z.boolean(),
        fallbackAction: z.string(),
        supportedLanguageCodes: z.array(z.string()),
      }),
      locked: z.boolean(),
      loggingSettings: z.object({
        audioRecordingConfig: z.object({
          gcsBucket: z.string(),
          gcsPathPrefix: z.string(),
        }),
        bigqueryExportSettings: z.object({
          dataset: z.string(),
          enabled: z.boolean(),
          project: z.string(),
        }),
        cloudLoggingSettings: z.object({
          enableCloudLogging: z.boolean(),
        }),
        conversationLoggingSettings: z.object({
          disableConversationLogging: z.boolean(),
          retentionWindow: z.string(),
        }),
        evaluationAudioRecordingConfig: z.object({
          gcsBucket: z.string(),
          gcsPathPrefix: z.string(),
        }),
        metricAnalysisSettings: z.object({
          llmMetricsOptedOut: z.boolean(),
        }),
        redactionConfig: z.object({
          deidentifyTemplate: z.string(),
          enableRedaction: z.boolean(),
          inspectTemplate: z.string(),
        }),
        unredactedAudioRecordingConfig: z.object({
          gcsBucket: z.string(),
          gcsPathPrefix: z.string(),
        }),
      }),
      metadata: z.record(z.string(), z.unknown()),
      modelSettings: z.object({
        model: z.string(),
        temperature: z.number(),
      }),
      name: z.string(),
      pinned: z.boolean(),
      predefinedVariableDeclarations: z.array(z.object({
        description: z.string(),
        name: z.string(),
        schema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
      })),
      rootAgent: z.string(),
      timeZoneSettings: z.object({
        timeZone: z.string(),
      }),
      toolExecutionMode: z.string(),
      updateTime: z.string(),
      validationErrors: z.array(z.string()),
      variableDeclarations: z.array(z.object({
        description: z.string(),
        name: z.string(),
        schema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
      })),
      vpcScSettings: z.object({
        allowedOrigins: z.array(z.string()),
      }),
    }),
    examples: z.array(z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      entryAgent: z.string(),
      etag: z.string(),
      invalid: z.boolean(),
      messages: z.array(z.object({
        chunks: z.unknown(),
        eventTime: z.unknown(),
        role: z.unknown(),
      })),
      name: z.string(),
      updateTime: z.string(),
    })),
    guardrails: z.array(z.object({
      action: z.object({
        generativeAnswer: z.object({
          prompt: z.unknown(),
        }),
        respondImmediately: z.object({
          responses: z.unknown(),
        }),
        transferAgent: z.object({
          agent: z.unknown(),
        }),
      }),
      codeCallback: z.object({
        afterAgentCallback: z.object({
          description: z.unknown(),
          disabled: z.unknown(),
          proactiveExecutionEnabled: z.unknown(),
          pythonCode: z.unknown(),
        }),
        afterModelCallback: z.object({
          description: z.unknown(),
          disabled: z.unknown(),
          proactiveExecutionEnabled: z.unknown(),
          pythonCode: z.unknown(),
        }),
        beforeAgentCallback: z.object({
          description: z.unknown(),
          disabled: z.unknown(),
          proactiveExecutionEnabled: z.unknown(),
          pythonCode: z.unknown(),
        }),
        beforeModelCallback: z.object({
          description: z.unknown(),
          disabled: z.unknown(),
          proactiveExecutionEnabled: z.unknown(),
          pythonCode: z.unknown(),
        }),
      }),
      contentFilter: z.object({
        bannedContents: z.array(z.unknown()),
        bannedContentsInAgentResponse: z.array(z.unknown()),
        bannedContentsInUserInput: z.array(z.unknown()),
        disregardDiacritics: z.boolean(),
        matchType: z.string(),
      }),
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      enabled: z.boolean(),
      etag: z.string(),
      llmPolicy: z.object({
        allowShortUtterance: z.boolean(),
        failOpen: z.boolean(),
        maxConversationMessages: z.number(),
        modelSettings: z.object({
          model: z.unknown(),
          temperature: z.unknown(),
        }),
        policyScope: z.string(),
        prompt: z.string(),
      }),
      llmPromptSecurity: z.object({
        customPolicy: z.object({
          allowShortUtterance: z.unknown(),
          failOpen: z.unknown(),
          maxConversationMessages: z.unknown(),
          modelSettings: z.unknown(),
          policyScope: z.unknown(),
          prompt: z.unknown(),
        }),
        defaultSettings: z.object({
          defaultPromptTemplate: z.unknown(),
        }),
        failOpen: z.boolean(),
      }),
      modelSafety: z.object({
        safetySettings: z.array(z.unknown()),
      }),
      name: z.string(),
      updateTime: z.string(),
    })),
    tools: z.array(z.object({
      agentTool: z.object({
        agent: z.string(),
        description: z.string(),
        name: z.string(),
        rootAgent: z.string(),
      }),
      clientFunction: z.object({
        description: z.string(),
        name: z.string(),
        parameters: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
        response: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
      }),
      connectorTool: z.object({
        action: z.object({
          connectionActionId: z.unknown(),
          entityOperation: z.unknown(),
          inputFields: z.unknown(),
          outputFields: z.unknown(),
        }),
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown(),
          oauth2JwtBearerConfig: z.unknown(),
        }),
        connection: z.string(),
        description: z.string(),
        name: z.string(),
      }),
      createTime: z.string(),
      dataStoreTool: z.object({
        boostSpecs: z.array(z.unknown()),
        dataStoreSource: z.object({
          dataStore: z.unknown(),
          filter: z.unknown(),
        }),
        description: z.string(),
        engineSource: z.object({
          dataStoreSources: z.unknown(),
          engine: z.unknown(),
          filter: z.unknown(),
        }),
        filterParameterBehavior: z.string(),
        modalityConfigs: z.array(z.unknown()),
        name: z.string(),
      }),
      displayName: z.string(),
      etag: z.string(),
      executionType: z.string(),
      fileSearchTool: z.object({
        corpusType: z.string(),
        description: z.string(),
        fileCorpus: z.string(),
        name: z.string(),
      }),
      generatedSummary: z.string(),
      googleSearchTool: z.object({
        contextUrls: z.array(z.unknown()),
        description: z.string(),
        excludeDomains: z.array(z.unknown()),
        name: z.string(),
        preferredDomains: z.array(z.unknown()),
        promptConfig: z.object({
          textPrompt: z.unknown(),
          voicePrompt: z.unknown(),
        }),
      }),
      mcpTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown(),
          bearerTokenConfig: z.unknown(),
          oauthConfig: z.unknown(),
          serviceAccountAuthConfig: z.unknown(),
          serviceAgentIdTokenAuthConfig: z.unknown(),
        }),
        customHeaders: z.record(z.string(), z.unknown()),
        description: z.string(),
        inputSchema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
        name: z.string(),
        outputSchema: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
        serverAddress: z.string(),
        serviceDirectoryConfig: z.object({
          service: z.unknown(),
        }),
        tlsConfig: z.object({
          caCerts: z.unknown(),
        }),
      }),
      name: z.string(),
      openApiTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown(),
          bearerTokenConfig: z.unknown(),
          oauthConfig: z.unknown(),
          serviceAccountAuthConfig: z.unknown(),
          serviceAgentIdTokenAuthConfig: z.unknown(),
        }),
        description: z.string(),
        ignoreUnknownFields: z.boolean(),
        name: z.string(),
        openApiSchema: z.string(),
        serviceDirectoryConfig: z.object({
          service: z.unknown(),
        }),
        tlsConfig: z.object({
          caCerts: z.unknown(),
        }),
        url: z.string(),
      }),
      pythonFunction: z.object({
        description: z.string(),
        name: z.string(),
        pythonCode: z.string(),
      }),
      remoteAgentTool: z.object({
        agentCard: z.object({
          description: z.unknown(),
          name: z.unknown(),
          skills: z.unknown(),
          supportedInterfaces: z.unknown(),
          version: z.unknown(),
        }),
        description: z.string(),
        name: z.string(),
      }),
      systemTool: z.object({
        description: z.string(),
        name: z.string(),
      }),
      timeout: z.string(),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown(),
        }),
        enableFakeMode: z.boolean(),
      }),
      updateTime: z.string(),
      widgetTool: z.object({
        dataMapping: z.object({
          fieldMappings: z.unknown(),
          mode: z.unknown(),
          pythonFunction: z.unknown(),
          pythonScript: z.unknown(),
          sourceToolName: z.unknown(),
        }),
        description: z.string(),
        name: z.string(),
        parameters: z.object({
          additionalProperties: z.unknown(),
          anyOf: z.unknown(),
          default: z.unknown(),
          defs: z.unknown(),
          description: z.unknown(),
          enum: z.unknown(),
          items: z.unknown(),
          maxItems: z.unknown(),
          maximum: z.unknown(),
          minItems: z.unknown(),
          minimum: z.unknown(),
          nullable: z.unknown(),
          prefixItems: z.unknown(),
          properties: z.unknown(),
          ref: z.unknown(),
          required: z.unknown(),
          title: z.unknown(),
          type: z.unknown(),
          uniqueItems: z.unknown(),
        }),
        textResponseConfig: z.object({
          staticText: z.unknown(),
          textResponseInstruction: z.unknown(),
          type: z.unknown(),
        }),
        uiConfig: z.record(z.string(), z.unknown()),
        widgetType: z.string(),
      }),
    })),
    toolsets: z.array(z.object({
      connectorToolset: z.object({
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown(),
          oauth2JwtBearerConfig: z.unknown(),
        }),
        connection: z.string(),
        connectorActions: z.array(z.unknown()),
      }),
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      etag: z.string(),
      executionType: z.string(),
      mcpToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown(),
          bearerTokenConfig: z.unknown(),
          oauthConfig: z.unknown(),
          serviceAccountAuthConfig: z.unknown(),
          serviceAgentIdTokenAuthConfig: z.unknown(),
        }),
        customHeaders: z.record(z.string(), z.unknown()),
        serverAddress: z.string(),
        serviceDirectoryConfig: z.object({
          service: z.unknown(),
        }),
        tlsConfig: z.object({
          caCerts: z.unknown(),
        }),
      }),
      name: z.string(),
      openApiToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown(),
          bearerTokenConfig: z.unknown(),
          oauthConfig: z.unknown(),
          serviceAccountAuthConfig: z.unknown(),
          serviceAgentIdTokenAuthConfig: z.unknown(),
        }),
        ignoreUnknownFields: z.boolean(),
        openApiSchema: z.string(),
        serviceDirectoryConfig: z.object({
          service: z.unknown(),
        }),
        tlsConfig: z.object({
          caCerts: z.unknown(),
        }),
        url: z.string(),
      }),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown(),
        }),
        enableFakeMode: z.boolean(),
      }),
      updateTime: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Optional. The description of the app version.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the app version.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the app version. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}`",
  ).optional(),
  snapshot: z.object({
    agents: z.array(z.object({
      afterAgentCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      afterModelCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      afterToolCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeAgentCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeModelCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      beforeToolCallbacks: z.array(z.object({
        description: z.unknown().describe(
          "Optional. Human-readable description of the callback.",
        ).optional(),
        disabled: z.unknown().describe(
          "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
        ).optional(),
        proactiveExecutionEnabled: z.unknown().describe(
          "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
        ).optional(),
        pythonCode: z.unknown().describe(
          "Required. The python code to execute for the callback.",
        ).optional(),
      })).describe(
        "Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
      ).optional(),
      childAgents: z.array(z.string()).describe(
        "Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the agent was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the agent.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the agent.")
        .optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      generatedSummary: z.string().describe(
        "Output only. If the agent is generated by the LLM assistant, this field contains a descriptive summary of the generation.",
      ).optional(),
      guardrails: z.array(z.string()).describe(
        "Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      instruction: z.string().describe(
        "Optional. Instructions for the LLM model to guide the agent's behavior.",
      ).optional(),
      llmAgent: z.object({}).describe(
        "Default agent type. The agent uses instructions and callbacks specified in the agent to perform the task using a large language model.",
      ).optional(),
      modelSettings: z.object({
        model: z.string().describe(
          "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
        ).optional(),
        temperature: z.number().describe(
          "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
        ).optional(),
      }).describe(
        "Model settings contains various configurations for the LLM model.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      remoteDialogflowAgent: z.object({
        agent: z.string().describe(
          "Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
        environmentId: z.string().describe(
          "Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used.",
        ).optional(),
        flowId: z.string().describe(
          "Optional. The flow ID of the flow in the Dialogflow agent.",
        ).optional(),
        inputVariableMapping: z.record(z.string(), z.unknown()).describe(
          "Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input.",
        ).optional(),
        outputVariableMapping: z.record(z.string(), z.unknown()).describe(
          "Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends.",
        ).optional(),
        respectResponseInterruptionSettings: z.boolean().describe(
          "Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings.",
        ).optional(),
      }).describe(
        "The agent which will transfer execution to a remote [Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent. The Dialogflow agent will process subsequent user queries until the session ends or flow ends, and the control is transferred back to the parent CES agent.",
      ).optional(),
      tools: z.array(z.string()).describe(
        "Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
      ).optional(),
      toolsets: z.array(z.object({
        toolIds: z.unknown().describe(
          "Optional. The tools IDs to filter the toolset.",
        ).optional(),
        toolset: z.unknown().describe(
          "Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
        ).optional(),
      })).describe("Optional. List of toolsets for the agent.").optional(),
      transferRules: z.array(z.object({
        childAgent: z.unknown().describe(
          "Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
        ).optional(),
        deterministicTransfer: z.unknown().describe(
          "Deterministic transfer rule. When the condition evaluates to true, the transfer occurs.",
        ).optional(),
        direction: z.unknown().describe(
          "Required. The direction of the transfer.",
        ).optional(),
        disablePlannerTransfer: z.unknown().describe(
          "A rule that prevents the planner from transferring to the target agent.",
        ).optional(),
      })).describe(
        "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the agent was last updated.",
      ).optional(),
      validationErrors: z.array(z.string()).describe(
        "Output only. Misconfigurations or errors in the agent that may affect agent quality.",
      ).optional(),
    })).describe("Optional. List of agents in the app.").optional(),
    app: z.object({
      audioProcessingConfig: z.object({
        ambientSoundConfig: z.object({
          gcsUri: z.string().describe(
            "Optional. Ambient noise as a mono-channel, 16kHz WAV file stored in [Cloud Storage](https://cloud.google.com/storage). Note: Please make sure the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com` has `storage.objects.get` permission to the Cloud Storage object.",
          ).optional(),
          prebuiltAmbientNoise: z.enum([
            "PREBUILT_AMBIENT_NOISE_UNSPECIFIED",
            "RETAIL_STORE",
            "CONVENTION_HALL",
            "OUTDOOR",
          ]).describe(
            "Optional. Deprecated: `prebuilt_ambient_noise` is deprecated in favor of `prebuilt_ambient_sound`.",
          ).optional(),
          prebuiltAmbientSound: z.string().describe(
            'Optional. Name of the prebuilt ambient sound. Valid values are: - "coffee_shop" - "keyboard" - "keypad" - "hum" - "office_1" - "office_2" - "office_3" - "room_1" - "room_2" - "room_3" - "room_4" - "room_5" - "air_conditioner"',
          ).optional(),
          volumeGainDb: z.number().describe(
            "Optional. Volume gain (in dB) of the normal native volume supported by ambient noise, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. We strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that.",
          ).optional(),
        }).describe(
          "Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation.",
        ).optional(),
        bargeInConfig: z.object({
          bargeInAwareness: z.boolean().describe(
            "Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually.",
          ).optional(),
          disableBargeIn: z.boolean().describe(
            "Optional. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile.",
          ).optional(),
        }).describe(
          "Configuration for how the user barge-in activities should be handled.",
        ).optional(),
        inactivityTimeout: z.string().describe(
          "Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement.",
        ).optional(),
        synthesizeSpeechConfigs: z.record(
          z.string(),
          z.object({
            speakingRate: z.unknown().describe(
              "Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error.",
            ).optional(),
            voice: z.unknown().describe(
              "Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech.",
            ).optional(),
          }),
        ).describe(
          'Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive.',
        ).optional(),
      }).describe(
        "Configuration for how the input and output audio should be processed and delivered.",
      ).optional(),
      clientCertificateSettings: z.object({
        passphrase: z.string().describe(
          "Optional. The name of the SecretManager secret version resource storing the passphrase to decrypt the private key. Should be left unset if the private key is not encrypted. Format: `projects/{project}/secrets/{secret}/versions/{version}`",
        ).optional(),
        privateKey: z.string().describe(
          "Required. The name of the SecretManager secret version resource storing the private key encoded in PEM format. Format: `projects/{project}/secrets/{secret}/versions/{version}`",
        ).optional(),
        tlsCertificate: z.string().describe(
          "Required. The TLS certificate encoded in PEM format. This string must include the begin header and end footer lines.",
        ).optional(),
      }).describe("Settings for custom client certificates.").optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the app was created.",
      ).optional(),
      dataStoreSettings: z.object({
        engines: z.array(z.object({
          name: z.unknown().describe(
            "Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
          ).optional(),
          type: z.unknown().describe("Output only. The type of the engine.")
            .optional(),
        })).describe("Output only. The engines for the app.").optional(),
      }).describe("Data store related settings for the app.").optional(),
      defaultChannelProfile: z.object({
        channelType: z.enum([
          "UNKNOWN",
          "WEB_UI",
          "API",
          "TWILIO",
          "GOOGLE_TELEPHONY_PLATFORM",
          "CONTACT_CENTER_AS_A_SERVICE",
          "FIVE9",
          "CONTACT_CENTER_INTEGRATION",
        ]).describe("Optional. The type of the channel profile.").optional(),
        disableBargeInControl: z.boolean().describe(
          "Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt.",
        ).optional(),
        disableDtmf: z.boolean().describe(
          "Optional. Whether to disable DTMF (dual-tone multi-frequency).",
        ).optional(),
        noiseSuppressionLevel: z.string().describe(
          'Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high".',
        ).optional(),
        personaProperty: z.object({
          persona: z.enum(["UNKNOWN", "CONCISE", "CHATTY"]).describe(
            "Optional. The persona of the channel.",
          ).optional(),
        }).describe("Represents the persona property of a channel.").optional(),
        profileId: z.string().describe(
          "Optional. The unique identifier of the channel profile.",
        ).optional(),
        webWidgetConfig: z.object({
          modality: z.enum([
            "MODALITY_UNSPECIFIED",
            "CHAT_AND_VOICE",
            "VOICE_ONLY",
            "CHAT_ONLY",
            "CHAT_VOICE_AND_VIDEO",
          ]).describe("Optional. The modality of the web widget.").optional(),
          securitySettings: z.object({
            allowedOrigins: z.unknown().describe(
              'Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com"',
            ).optional(),
            enableOriginCheck: z.unknown().describe(
              "Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins.",
            ).optional(),
            enablePublicAccess: z.unknown().describe(
              "Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent.",
            ).optional(),
            enableRecaptcha: z.unknown().describe(
              "Optional. Indicates whether reCAPTCHA verification for the web widget is enabled.",
            ).optional(),
          }).describe("Security settings for the web widget.").optional(),
          theme: z.enum(["THEME_UNSPECIFIED", "LIGHT", "DARK"]).describe(
            "Optional. The theme of the web widget.",
          ).optional(),
          webWidgetTitle: z.string().describe(
            "Optional. The title of the web widget.",
          ).optional(),
        }).describe("Message for configuration for the web widget.").optional(),
      }).describe(
        "A ChannelProfile configures the agent's behavior for a specific communication channel, such as web UI or telephony.",
      ).optional(),
      deploymentCount: z.number().int().describe(
        "Output only. Number of deployments in the app.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the app.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the app.")
        .optional(),
      errorHandlingSettings: z.object({
        endSessionConfig: z.object({
          escalateSession: z.boolean().describe(
            "Optional. Whether to escalate the session in EndSession. If session is escalated, metadata in EndSession will contain `session_escalated = true`. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/deploy/google-telephony-platform#transfer_a_call_to_a_human_agent for details.",
          ).optional(),
        }).describe(
          "Configuration for ending the session in case of system errors (e.g. LLM errors).",
        ).optional(),
        errorHandlingStrategy: z.enum([
          "ERROR_HANDLING_STRATEGY_UNSPECIFIED",
          "NONE",
          "FALLBACK_RESPONSE",
          "END_SESSION",
        ]).describe("Optional. The strategy to use for error handling.")
          .optional(),
        fallbackResponseConfig: z.object({
          customFallbackMessages: z.record(z.string(), z.unknown()).describe(
            "Optional. The fallback messages in case of system errors (e.g. LLM errors), mapped by [supported language code](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/reference/language).",
          ).optional(),
          maxFallbackAttempts: z.number().int().describe(
            "Optional. The maximum number of fallback attempts to make before the agent emitting EndSession Signal.",
          ).optional(),
        }).describe("Configuration for handling fallback responses.")
          .optional(),
      }).describe(
        "Settings to describe how errors should be handled in the app.",
      ).optional(),
      etag: z.string().describe(
        "Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      evaluationMetricsThresholds: z.object({
        goldenEvaluationMetricsThresholds: z.object({
          expectationLevelMetricsThresholds: z.object({
            toolInvocationParameterCorrectnessThreshold: z.unknown().describe(
              "Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0.",
            ).optional(),
          }).describe("Expectation level metrics thresholds.").optional(),
          toolMatchingSettings: z.object({
            extraToolCallBehavior: z.unknown().describe(
              "Optional. Behavior for extra tool calls. Defaults to FAIL.",
            ).optional(),
          }).describe("Settings for matching tool calls.").optional(),
          turnLevelMetricsThresholds: z.object({
            overallToolInvocationCorrectnessThreshold: z.unknown().describe(
              "Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0.",
            ).optional(),
            semanticSimilarityChannel: z.unknown().describe(
              "Optional. The semantic similarity channel to use for evaluation.",
            ).optional(),
            semanticSimilaritySuccessThreshold: z.unknown().describe(
              "Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3.",
            ).optional(),
          }).describe("Turn level metrics thresholds.").optional(),
        }).describe("Settings for golden evaluations.").optional(),
        goldenHallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. The hallucination metric behavior for golden evaluations.",
        ).optional(),
        hallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. Deprecated: Use `golden_hallucination_metric_behavior` instead. The hallucination metric behavior is currently used for golden evaluations.",
        ).optional(),
        scenarioHallucinationMetricBehavior: z.enum([
          "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED",
          "DISABLED",
          "ENABLED",
        ]).describe(
          "Optional. The hallucination metric behavior for scenario evaluations.",
        ).optional(),
      }).describe("Threshold settings for metrics in an Evaluation.")
        .optional(),
      globalInstruction: z.string().describe(
        "Optional. Instructions for all the agents in the app. You can use this instruction to set up a stable identity or personality across all the agents.",
      ).optional(),
      guardrails: z.array(z.string()).describe(
        "Optional. List of guardrails for the app. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      languageSettings: z.object({
        defaultLanguageCode: z.string().describe(
          "Optional. The default language code of the app.",
        ).optional(),
        enableMultilingualSupport: z.boolean().describe(
          "Optional. Enables multilingual support. If true, agents in the app will use pre-built instructions to improve handling of multilingual input.",
        ).optional(),
        fallbackAction: z.string().describe(
          'Optional. Deprecated: This feature is no longer supported. Use `enable_multilingual_support` instead to improve handling of multilingual input. The action to perform when an agent receives input in an unsupported language. This can be a predefined action or a custom tool call. Valid values are: - A tool\'s full resource name, which triggers a specific tool execution. - A predefined system action, such as "escalate" or "exit", which triggers an EndSession signal with corresponding metadata to terminate the conversation.',
        ).optional(),
        supportedLanguageCodes: z.array(z.string()).describe(
          "Optional. List of languages codes supported by the app, in addition to the `default_language_code`.",
        ).optional(),
      }).describe("Language settings of the app.").optional(),
      locked: z.boolean().describe(
        "Optional. Indicates whether the app is locked for changes. If the app is locked, modifications to the app resources will be rejected.",
      ).optional(),
      loggingSettings: z.object({
        audioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
        bigqueryExportSettings: z.object({
          dataset: z.string().describe(
            "Optional. The BigQuery **dataset ID** to export the data to.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Indicates whether the BigQuery export is enabled.",
          ).optional(),
          project: z.string().describe(
            "Optional. The **project ID** of the BigQuery dataset to export the data to. Note: If the BigQuery dataset is in a different project from the app, you should grant `roles/bigquery.admin` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
        }).describe(
          "Settings to describe the BigQuery export behaviors for the app.",
        ).optional(),
        cloudLoggingSettings: z.object({
          enableCloudLogging: z.boolean().describe(
            "Optional. Whether to enable Cloud Logging for the sessions.",
          ).optional(),
        }).describe(
          "Settings to describe the Cloud Logging behaviors for the app.",
        ).optional(),
        conversationLoggingSettings: z.object({
          disableConversationLogging: z.boolean().describe(
            "Optional. Whether to disable conversation logging for the sessions.",
          ).optional(),
          retentionWindow: z.string().describe(
            "Optional. Controls the retention window for the conversation. If not set, the conversation will be retained for 365 days.",
          ).optional(),
        }).describe(
          "Settings to describe the conversation logging behaviors for the app.",
        ).optional(),
        evaluationAudioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
        metricAnalysisSettings: z.object({
          llmMetricsOptedOut: z.boolean().describe(
            "Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected.",
          ).optional(),
        }).describe(
          "Settings to describe the conversation data collection behaviors for LLM analysis metrics pipeline.",
        ).optional(),
        redactionConfig: z.object({
          deidentifyTemplate: z.string().describe(
            "Optional. [DLP](https://cloud.google.com/dlp/docs) deidentify template name to instruct on how to de-identify content. Format: `projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}`",
          ).optional(),
          enableRedaction: z.boolean().describe(
            "Optional. If true, redaction will be applied in various logging scenarios, including conversation history, Cloud Logging and audio recording.",
          ).optional(),
          inspectTemplate: z.string().describe(
            "Optional. [DLP](https://cloud.google.com/dlp/docs) inspect template name to configure detection of sensitive data types. Format: `projects/{project}/locations/{location}/inspectTemplates/{inspect_template}`",
          ).optional(),
        }).describe(
          "Configuration to instruct how sensitive data should be handled.",
        ).optional(),
        unredactedAudioRecordingConfig: z.object({
          gcsBucket: z.string().describe(
            'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
          ).optional(),
          gcsPathPrefix: z.string().describe(
            "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
          ).optional(),
        }).describe(
          "Configuration for how the audio interactions should be recorded.",
        ).optional(),
      }).describe("Settings to describe the logging behaviors for the app.")
        .optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. Metadata about the app. This field can be used to store additional information relevant to the app's details or intended usages.",
      ).optional(),
      modelSettings: z.object({
        model: z.string().describe(
          "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
        ).optional(),
        temperature: z.number().describe(
          "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
        ).optional(),
      }).describe(
        "Model settings contains various configurations for the LLM model.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}`",
      ).optional(),
      pinned: z.boolean().describe(
        "Optional. Whether the app is pinned in the app list.",
      ).optional(),
      predefinedVariableDeclarations: z.array(z.object({
        description: z.string().describe(
          "Required. The description of the variable.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
        ).optional(),
        schema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      })).describe(
        "Output only. The declarations of predefined variables for the app.",
      ).optional(),
      rootAgent: z.string().describe(
        "Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      timeZoneSettings: z.object({
        timeZone: z.string().describe(
          "Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris.",
        ).optional(),
      }).describe("TimeZone settings of the app.").optional(),
      toolExecutionMode: z.enum([
        "TOOL_EXECUTION_MODE_UNSPECIFIED",
        "PARALLEL",
        "SEQUENTIAL",
      ]).describe(
        "Optional. The tool execution mode for the app. If not provided, will default to PARALLEL.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the app was last updated.",
      ).optional(),
      validationErrors: z.array(z.string()).describe(
        "Output only. Misconfigurations or warnings in the app.",
      ).optional(),
      variableDeclarations: z.array(z.object({
        description: z.string().describe(
          "Required. The description of the variable.",
        ).optional(),
        name: z.string().describe(
          "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
        ).optional(),
        schema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      })).describe("Optional. The declarations of the variables.").optional(),
      vpcScSettings: z.object({
        allowedOrigins: z.array(z.string()).describe(
          'Optional. The allowed HTTP(s) origins that OpenAPI tools in the App are able to directly call when VPC Service Controls are enabled. These strings must match the origin exactly, including the port if specified. For example, "https://example.com" or "https://example.com:443". This list does not yet apply to Python tools that may make direct HTTP calls.',
        ).optional(),
      }).describe("VPC-SC settings for the app.").optional(),
    }).describe(
      "An app serves as a top-level container for a group of agents, including the root agent and its sub-agents, along with their associated configurations. These agents work together to achieve specific goals within the app's context.",
    ).optional(),
    examples: z.array(z.object({
      createTime: z.string().describe(
        "Output only. Timestamp when the example was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Human-readable description of the example.",
      ).optional(),
      displayName: z.string().describe("Required. Display name of the example.")
        .optional(),
      entryAgent: z.string().describe(
        "Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      invalid: z.boolean().describe(
        "Output only. The example may become invalid if referencing resources are deleted. Invalid examples will not be used as few-shot examples.",
      ).optional(),
      messages: z.array(z.object({
        chunks: z.unknown().describe(
          "Optional. Content of the message as a series of chunks.",
        ).optional(),
        eventTime: z.unknown().describe(
          "Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example.",
        ).optional(),
        role: z.unknown().describe(
          "Optional. The role within the conversation, e.g., user, agent.",
        ).optional(),
      })).describe(
        "Optional. The collection of messages that make up the conversation.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}`",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the example was last updated.",
      ).optional(),
    })).describe("Optional. List of examples in the app.").optional(),
    guardrails: z.array(z.object({
      action: z.object({
        generativeAnswer: z.object({
          prompt: z.unknown().describe(
            "Required. The prompt to use for the generative answer.",
          ).optional(),
        }).describe(
          "The agent will immediately respond with a generative answer.",
        ).optional(),
        respondImmediately: z.object({
          responses: z.unknown().describe(
            "Required. The canned responses for the agent to choose from. The response is chosen randomly.",
          ).optional(),
        }).describe(
          "The agent will immediately respond with a preconfigured response.",
        ).optional(),
        transferAgent: z.object({
          agent: z.unknown().describe(
            "Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
          ).optional(),
        }).describe(
          "The agent will transfer the conversation to a different agent.",
        ).optional(),
      }).describe("Action that is taken when a certain precondition is met.")
        .optional(),
      codeCallback: z.object({
        afterAgentCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        afterModelCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        beforeAgentCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
        beforeModelCallback: z.object({
          description: z.unknown().describe(
            "Optional. Human-readable description of the callback.",
          ).optional(),
          disabled: z.unknown().describe(
            "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
          ).optional(),
          proactiveExecutionEnabled: z.unknown().describe(
            "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
          ).optional(),
          pythonCode: z.unknown().describe(
            "Required. The python code to execute for the callback.",
          ).optional(),
        }).describe(
          "A callback defines the custom logic to be executed at various stages of agent interaction.",
        ).optional(),
      }).describe(
        "Guardrail that blocks the conversation based on the code callbacks provided.",
      ).optional(),
      contentFilter: z.object({
        bannedContents: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies to both user inputs and agent responses.",
        ).optional(),
        bannedContentsInAgentResponse: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies only to agent responses.",
        ).optional(),
        bannedContentsInUserInput: z.array(z.unknown()).describe(
          "Optional. List of banned phrases. Applies only to user inputs.",
        ).optional(),
        disregardDiacritics: z.boolean().describe(
          "Optional. If true, diacritics are ignored during matching.",
        ).optional(),
        matchType: z.enum([
          "MATCH_TYPE_UNSPECIFIED",
          "SIMPLE_STRING_MATCH",
          "WORD_BOUNDARY_STRING_MATCH",
          "REGEXP_MATCH",
        ]).describe("Required. Match type for the content filter.").optional(),
      }).describe(
        "Guardrail that bans certain content from being used in the conversation.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the guardrail was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. Description of the guardrail.",
      ).optional(),
      displayName: z.string().describe(
        "Required. Display name of the guardrail.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Whether the guardrail is enabled.",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      llmPolicy: z.object({
        allowShortUtterance: z.boolean().describe(
          "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
        ).optional(),
        failOpen: z.boolean().describe(
          "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
        ).optional(),
        maxConversationMessages: z.number().int().describe(
          "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
        ).optional(),
        modelSettings: z.object({
          model: z.unknown().describe(
            "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
          ).optional(),
          temperature: z.unknown().describe(
            "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
          ).optional(),
        }).describe(
          "Model settings contains various configurations for the LLM model.",
        ).optional(),
        policyScope: z.enum([
          "POLICY_SCOPE_UNSPECIFIED",
          "USER_QUERY",
          "AGENT_RESPONSE",
          "USER_QUERY_AND_AGENT_RESPONSE",
        ]).describe(
          "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
        ).optional(),
        prompt: z.string().describe("Required. Policy prompt.").optional(),
      }).describe(
        "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
      ).optional(),
      llmPromptSecurity: z.object({
        customPolicy: z.object({
          allowShortUtterance: z.unknown().describe(
            "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
          ).optional(),
          failOpen: z.unknown().describe(
            "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
          ).optional(),
          maxConversationMessages: z.unknown().describe(
            "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
          ).optional(),
          modelSettings: z.unknown().describe(
            "Model settings contains various configurations for the LLM model.",
          ).optional(),
          policyScope: z.unknown().describe(
            "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
          ).optional(),
          prompt: z.unknown().describe("Required. Policy prompt.").optional(),
        }).describe(
          "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
        ).optional(),
        defaultSettings: z.object({
          defaultPromptTemplate: z.unknown().describe(
            "Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY.",
          ).optional(),
        }).describe("Configuration for default system security settings.")
          .optional(),
        failOpen: z.boolean().describe(
          "Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration.",
        ).optional(),
      }).describe(
        "Guardrail that blocks the conversation if the input is considered unsafe based on the LLM classification.",
      ).optional(),
      modelSafety: z.object({
        safetySettings: z.array(z.unknown()).describe(
          "Required. List of safety settings.",
        ).optional(),
      }).describe(
        "Model safety settings overrides. When this is set, it will override the default settings and trigger the guardrail if the response is considered unsafe.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the guardrail was last updated.",
      ).optional(),
    })).describe("Optional. List of guardrails in the app.").optional(),
    tools: z.array(z.object({
      agentTool: z.object({
        agent: z.string().describe(
          "Optional. The resource name of the agent that is the entry point of the tool. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the tool's purpose.",
        ).optional(),
        name: z.string().describe("Required. The name of the agent tool.")
          .optional(),
        rootAgent: z.string().describe(
          "Optional. Deprecated: Use `agent` instead. The resource name of the root agent that is the entry point of the tool. Format: `projects/{project}/locations/{location}/agents/{agent}`",
        ).optional(),
      }).describe(
        "Represents a tool that allows the agent to call another agent.",
      ).optional(),
      clientFunction: z.object({
        description: z.string().describe("Optional. The function description.")
          .optional(),
        name: z.string().describe("Required. The function name.").optional(),
        parameters: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        response: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
      }).describe(
        "Represents a client-side function that the agent can invoke. When the tool is chosen by the agent, control is handed off to the client. The client is responsible for executing the function and returning the result as a ToolResponse to continue the interaction with the agent.",
      ).optional(),
      connectorTool: z.object({
        action: z.object({
          connectionActionId: z.unknown().describe(
            "ID of a Connection action for the tool to use.",
          ).optional(),
          entityOperation: z.unknown().describe(
            "Entity CRUD operation specification.",
          ).optional(),
          inputFields: z.unknown().describe(
            "Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used.",
          ).optional(),
          outputFields: z.unknown().describe(
            "Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned.",
          ).optional(),
        }).describe(
          "Configuration of an Action for the tool to use. Note: This can be either an Action or an Operation. See https://cloud.google.com/integration-connectors/docs/entities-operation-action for details.",
        ).optional(),
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown().describe(
            "Oauth 2.0 Authorization Code authentication configuration.",
          ).optional(),
          oauth2JwtBearerConfig: z.unknown().describe(
            "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
          ).optional(),
        }).describe(
          "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
        ).optional(),
        connection: z.string().describe(
          "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the tool that can be used by the Agent to decide whether to call this ConnectorTool.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the tool that can be used by the Agent to decide whether to call this ConnectorTool.",
        ).optional(),
      }).describe(
        "A ConnectorTool allows connections to different integrations. See: https://cloud.google.com/integration-connectors/docs/overview.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the tool was created.",
      ).optional(),
      dataStoreTool: z.object({
        boostSpecs: z.array(z.unknown()).describe(
          "Optional. Boost specification to boost certain documents.",
        ).optional(),
        dataStoreSource: z.object({
          dataStore: z.unknown().describe(
            "A DataStore resource in Vertex AI Search.",
          ).optional(),
          filter: z.unknown().describe(
            "Optional. Filter specification for the DataStore. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata",
          ).optional(),
        }).describe("Configuration for searching within a specific DataStore.")
          .optional(),
        description: z.string().describe("Optional. The tool description.")
          .optional(),
        engineSource: z.object({
          dataStoreSources: z.unknown().describe(
            "Optional. Use to target specific DataStores within the Engine. If empty, the search applies to all DataStores associated with the Engine.",
          ).optional(),
          engine: z.unknown().describe(
            "Required. Full resource name of the Engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
          ).optional(),
          filter: z.unknown().describe(
            "Optional. A filter applied to the search across the Engine. Not relevant and not used if 'data_store_sources' is provided. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata",
          ).optional(),
        }).describe(
          "Configuration for searching within an Engine, potentially targeting specific DataStores.",
        ).optional(),
        filterParameterBehavior: z.enum([
          "FILTER_PARAMETER_BEHAVIOR_UNSPECIFIED",
          "ALWAYS_INCLUDE",
          "NEVER_INCLUDE",
        ]).describe("Optional. The filter parameter behavior.").optional(),
        modalityConfigs: z.array(z.unknown()).describe(
          "Optional. The modality configs for the data store.",
        ).optional(),
        name: z.string().describe("Required. The data store tool name.")
          .optional(),
      }).describe(
        "Tool to retrieve from Vertex AI Search datastore or engine for grounding. Accepts either a datastore or an engine, but not both. See Vertex AI Search: https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The display name of the tool, derived based on the tool's type. For example, display name of a ClientFunction is derived from its `name` property.",
      ).optional(),
      etag: z.string().describe(
        "Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      executionType: z.enum([
        "EXECUTION_TYPE_UNSPECIFIED",
        "SYNCHRONOUS",
        "ASYNCHRONOUS",
      ]).describe("Optional. The execution type of the tool.").optional(),
      fileSearchTool: z.object({
        corpusType: z.enum([
          "CORPUS_TYPE_UNSPECIFIED",
          "USER_OWNED",
          "FULLY_MANAGED",
        ]).describe(
          "Optional. The type of the corpus. Default is FULLY_MANAGED.",
        ).optional(),
        description: z.string().describe("Optional. The tool description.")
          .optional(),
        fileCorpus: z.string().describe(
          "Optional. The corpus where files are stored. Format: projects/{project}/locations/{location}/ragCorpora/{rag_corpus}",
        ).optional(),
        name: z.string().describe("Required. The tool name.").optional(),
      }).describe(
        "The file search tool allows the agent to search across the files uploaded by the app/agent developer. It has presets to give relatively good quality search over the uploaded files and summarization of the retrieved results.",
      ).optional(),
      generatedSummary: z.string().describe(
        "Output only. If the tool is generated by the LLM assistant, this field contains a descriptive summary of the generation.",
      ).optional(),
      googleSearchTool: z.object({
        contextUrls: z.array(z.unknown()).describe(
          'Optional. Content will be fetched directly from these URLs for context and grounding. Example: "https://example.com/path.html". A maximum of 20 URLs are allowed.',
        ).optional(),
        description: z.string().describe(
          "Optional. Description of the tool's purpose.",
        ).optional(),
        excludeDomains: z.array(z.unknown()).describe(
          'Optional. List of domains to be excluded from the search results. Example: "example.com". A maximum of 2000 domains can be excluded.',
        ).optional(),
        name: z.string().describe("Required. The name of the tool.").optional(),
        preferredDomains: z.array(z.unknown()).describe(
          'Optional. Specifies domains to restrict search results to. Example: "example.com", "another.site". A maximum of 20 domains can be specified.',
        ).optional(),
        promptConfig: z.object({
          textPrompt: z.unknown().describe(
            "Optional. Defines the prompt used for the system instructions when interacting with the agent in chat conversations. If not set, default prompt will be used.",
          ).optional(),
          voicePrompt: z.unknown().describe(
            "Optional. Defines the prompt used for the system instructions when interacting with the agent in voice conversations. If not set, default prompt will be used.",
          ).optional(),
        }).describe(
          "Prompt settings used by the model when processing or summarizing the google search results.",
        ).optional(),
      }).describe(
        "Represents a tool to perform Google web searches for grounding. See https://cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool#google-search.",
      ).optional(),
      mcpTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        customHeaders: z.record(z.string(), z.unknown()).describe(
          "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the MCP tool.",
        ).optional(),
        inputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        name: z.string().describe("Required. The name of the MCP tool.")
          .optional(),
        outputSchema: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        serverAddress: z.string().describe(
          'Required. The server address of the MCP server, e.g., "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. This is the same as the server_address in the McpToolset. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
      }).describe(
        "An MCP tool. See https://modelcontextprotocol.io/specification/2025-06-18/server/tools for more details.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected.",
      ).optional(),
      openApiTool: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        description: z.string().describe(
          "Optional. The description of the tool. If not provided, the description of the tool will be derived from the OpenAPI schema, from `operation.description` or `operation.summary`.",
        ).optional(),
        ignoreUnknownFields: z.boolean().describe(
          "Optional. If true, the agent will ignore unknown fields in the API response.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the tool. If not provided, the name of the tool will be derived from the OpenAPI schema, from `operation.operationId`.",
        ).optional(),
        openApiSchema: z.string().describe(
          "Required. The OpenAPI schema in JSON or YAML format.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
        url: z.string().describe(
          "Optional. The server URL of the Open API schema. This field is only set in tools in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
        ).optional(),
      }).describe("A remote API tool defined by an OpenAPI schema.").optional(),
      pythonFunction: z.object({
        description: z.string().describe(
          "Output only. The description of the Python function, parsed from the python code's docstring.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the Python function to execute. Must match a Python function name defined in the python code. Case sensitive. If the name is not provided, the first function defined in the python code will be used.",
        ).optional(),
        pythonCode: z.string().describe(
          "Optional. The Python code to execute for the tool.",
        ).optional(),
      }).describe("A Python function tool.").optional(),
      remoteAgentTool: z.object({
        agentCard: z.object({
          description: z.unknown().describe(
            "Required. A description of the agent's domain of action/solution space.",
          ).optional(),
          name: z.unknown().describe(
            "Required. A human-readable name for the agent.",
          ).optional(),
          skills: z.unknown().describe(
            "Required. Skills represent a unit of ability an agent can perform. This may somewhat abstract but represents a more focused set of actions that the agent is highly likely to succeed at.",
          ).optional(),
          supportedInterfaces: z.unknown().describe(
            "Required. Ordered list of supported interfaces. The first entry is preferred.",
          ).optional(),
          version: z.unknown().describe("Required. The version of the agent.")
            .optional(),
        }).describe(
          "AgentCard conveys key information about a remote agent. It is a trimmed version of the AgentCard defined in the A2A protocol https://a2a-protocol.org/dev/specification/#441-agentcard",
        ).optional(),
        description: z.string().describe(
          "Required. The description of the tool.",
        ).optional(),
        name: z.string().describe("Required. The name of the tool.").optional(),
      }).describe(
        "Represents a tool that allows the agent to call another remote agent.",
      ).optional(),
      systemTool: z.object({
        description: z.string().describe(
          "Output only. The description of the system tool.",
        ).optional(),
        name: z.string().describe("Required. The name of the system tool.")
          .optional(),
      }).describe("Pre-defined system tool.").optional(),
      timeout: z.string().describe(
        "Optional. The timeout for the tool execution. If not set, the default timeout is 30 seconds for `SYNCHRONOUS` tools and 60 seconds for `ASYNCHRONOUS` tools.",
      ).optional(),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown().describe(
            "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
          ).optional(),
        }).describe("A code block to be executed instead of a real tool call.")
          .optional(),
        enableFakeMode: z.boolean().describe(
          "Optional. Whether the tool is using fake mode.",
        ).optional(),
      }).describe("Configuration for tool behavior in fake mode.").optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the tool was last updated.",
      ).optional(),
      widgetTool: z.object({
        dataMapping: z.object({
          fieldMappings: z.unknown().describe(
            "Optional. A map of widget input parameter fields to the corresponding output fields of the source tool.",
          ).optional(),
          mode: z.unknown().describe("Optional. The mode of the data mapping.")
            .optional(),
          pythonFunction: z.unknown().describe("A Python function tool.")
            .optional(),
          pythonScript: z.unknown().describe(
            "Deprecated: Use `python_function` instead.",
          ).optional(),
          sourceToolName: z.unknown().describe(
            "Optional. The resource name of the tool that provides the data for the widget (e.g., a search tool or a custom function). Format: `projects/{project}/locations/{location}/agents/{agent}/tools/{tool}`",
          ).optional(),
        }).describe(
          "Configuration for mapping data from a source tool to the widget's input parameters.",
        ).optional(),
        description: z.string().describe(
          "Optional. The description of the widget tool.",
        ).optional(),
        name: z.string().describe(
          "Required. The display name of the widget tool.",
        ).optional(),
        parameters: z.object({
          additionalProperties: z.unknown().describe(
            "Circular reference to Schema",
          ).optional(),
          anyOf: z.unknown().describe(
            "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
          ).optional(),
          default: z.unknown().describe("Optional. Default value of the data.")
            .optional(),
          defs: z.unknown().describe(
            "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
          ).optional(),
          description: z.unknown().describe(
            "Optional. The description of the data.",
          ).optional(),
          enum: z.unknown().describe(
            'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
          ).optional(),
          items: z.unknown().describe("Circular reference to Schema")
            .optional(),
          maxItems: z.unknown().describe(
            "Optional. Maximum number of the elements for Type.ARRAY.",
          ).optional(),
          maximum: z.unknown().describe(
            "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          minItems: z.unknown().describe(
            "Optional. Minimum number of the elements for Type.ARRAY.",
          ).optional(),
          minimum: z.unknown().describe(
            "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
          ).optional(),
          nullable: z.unknown().describe(
            "Optional. Indicates if the value may be null.",
          ).optional(),
          prefixItems: z.unknown().describe(
            "Optional. Schemas of initial elements of Type.ARRAY.",
          ).optional(),
          properties: z.unknown().describe(
            "Optional. Properties of Type.OBJECT.",
          ).optional(),
          ref: z.unknown().describe(
            'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
          ).optional(),
          required: z.unknown().describe(
            "Optional. Required properties of Type.OBJECT.",
          ).optional(),
          title: z.unknown().describe("Optional. The title of the schema.")
            .optional(),
          type: z.unknown().describe("Required. The type of the data.")
            .optional(),
          uniqueItems: z.unknown().describe(
            "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
          ).optional(),
        }).describe(
          "Represents a select subset of an OpenAPI 3.0 schema object.",
        ).optional(),
        textResponseConfig: z.object({
          staticText: z.unknown().describe(
            "Optional. The static text response to return when type is STATIC.",
          ).optional(),
          textResponseInstruction: z.unknown().describe(
            "Optional. Instruction for the LLM on how to generate the text response. Used as the description for the text response parameter if type is LLM_GENERATED.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. The strategy for providing the text response.",
          ).optional(),
        }).describe(
          "Configuration for the text response returned with the widget.",
        ).optional(),
        uiConfig: z.record(z.string(), z.unknown()).describe(
          "Optional. Configuration for rendering the widget.",
        ).optional(),
        widgetType: z.enum([
          "WIDGET_TYPE_UNSPECIFIED",
          "CUSTOM",
          "PRODUCT_CAROUSEL",
          "PRODUCT_DETAILS",
          "QUICK_ACTIONS",
          "PRODUCT_COMPARISON",
          "ADVANCED_PRODUCT_DETAILS",
          "SHORT_FORM",
          "OVERALL_SATISFACTION",
          "ORDER_SUMMARY",
          "APPOINTMENT_DETAILS",
          "APPOINTMENT_SCHEDULER",
          "CONTACT_FORM",
        ]).describe(
          "Optional. The type of the widget tool. If not specified, the default type will be CUSTOMIZED.",
        ).optional(),
      }).describe(
        "Represents a widget tool that the agent can invoke. When the tool is chosen by the agent, agent will return the widget to the client. The client is responsible for processing the widget and generating the next user query to continue the interaction with the agent.",
      ).optional(),
    })).describe("Optional. List of tools in the app.").optional(),
    toolsets: z.array(z.object({
      connectorToolset: z.object({
        authConfig: z.object({
          oauth2AuthCodeConfig: z.unknown().describe(
            "Oauth 2.0 Authorization Code authentication configuration.",
          ).optional(),
          oauth2JwtBearerConfig: z.unknown().describe(
            "JWT Profile Oauth 2.0 Authorization Grant authentication configuration.",
          ).optional(),
        }).describe(
          "End-user authentication configuration used for Connection calls. The field values must be the names of context variables in the format `$context.variables.`.",
        ).optional(),
        connection: z.string().describe(
          "Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}`",
        ).optional(),
        connectorActions: z.array(z.unknown()).describe(
          "Required. The list of connector actions/entity operations to generate tools for.",
        ).optional(),
      }).describe(
        "A toolset that generates tools from an Integration Connectors Connection.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the toolset was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. The description of the toolset.",
      ).optional(),
      displayName: z.string().describe(
        "Optional. The display name of the toolset. Must be unique within the same app.",
      ).optional(),
      etag: z.string().describe(
        "ETag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes.",
      ).optional(),
      executionType: z.enum([
        "EXECUTION_TYPE_UNSPECIFIED",
        "SYNCHRONOUS",
        "ASYNCHRONOUS",
      ]).describe("Optional. The execution type of the tools in the toolset.")
        .optional(),
      mcpToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        customHeaders: z.record(z.string(), z.unknown()).describe(
          "Optional. The custom headers to send in the request to the MCP server. The values must be in the format `$context.variables.` and can be set in the session variables. See https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/open-api#openapi-injection for more details.",
        ).optional(),
        serverAddress: z.string().describe(
          'Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details.',
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
      }).describe(
        "A toolset that contains a list of tools that are offered by the MCP server.",
      ).optional(),
      name: z.string().describe(
        "Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
      ).optional(),
      openApiToolset: z.object({
        apiAuthentication: z.object({
          apiKeyConfig: z.unknown().describe(
            "Configurations for authentication with API key.",
          ).optional(),
          bearerTokenConfig: z.unknown().describe(
            "Configurations for authentication with a bearer token.",
          ).optional(),
          oauthConfig: z.unknown().describe(
            "Configurations for authentication with OAuth.",
          ).optional(),
          serviceAccountAuthConfig: z.unknown().describe(
            "Configurations for authentication using a custom service account.",
          ).optional(),
          serviceAgentIdTokenAuthConfig: z.unknown().describe(
            "Configurations for authentication with [ID token](https://cloud.google.com/docs/authentication/token-types#id) generated from service agent.",
          ).optional(),
        }).describe("Authentication information required for API calls.")
          .optional(),
        ignoreUnknownFields: z.boolean().describe(
          "Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema.",
        ).optional(),
        openApiSchema: z.string().describe(
          "Required. The OpenAPI schema of the toolset.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.unknown().describe(
            "Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app.",
          ).optional(),
        }).describe("Configuration for tools using Service Directory.")
          .optional(),
        tlsConfig: z.object({
          caCerts: z.unknown().describe(
            "Required. Specifies a list of allowed custom CA certificates for HTTPS verification.",
          ).optional(),
        }).describe("The TLS configuration.").optional(),
        url: z.string().describe(
          "Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema.",
        ).optional(),
      }).describe(
        "A toolset that contains a list of tools that are defined by an OpenAPI schema.",
      ).optional(),
      toolFakeConfig: z.object({
        codeBlock: z.object({
          pythonCode: z.unknown().describe(
            "Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead.",
          ).optional(),
        }).describe("A code block to be executed instead of a real tool call.")
          .optional(),
        enableFakeMode: z.boolean().describe(
          "Optional. Whether the tool is using fake mode.",
        ).optional(),
      }).describe("Configuration for tool behavior in fake mode.").optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when the toolset was last updated.",
      ).optional(),
    })).describe("Optional. List of toolsets in the app.").optional(),
  }).describe("A snapshot of the app.").optional(),
  appVersionId: z.string().describe(
    "Optional. The ID to use for the app version, which will become the final component of the app version's resource name. If not provided, a unique ID will be automatically assigned for the app version.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Versions. Registered at `@swamp/gcp/ces/apps-versions`. */
export const model = {
  type: "@swamp/gcp/ces/apps-versions",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
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
      description:
        "In Customer Engagement Suite (CES), an app version is a snapshot of the app a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a versions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["snapshot"] !== undefined) body["snapshot"] = g["snapshot"];
        if (g["appVersionId"] !== undefined) {
          body["appVersionId"] = g["appVersionId"];
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
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Sync versions state from GCP",
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
      description: "List versions resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter to be applied when listing the app versions. See https://google.aip.dev/160 for more details.",
        ).optional(),
        orderBy: z.string().describe(
          'Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "appVersions",
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
    restore: {
      description: "restore",
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
            "id": "ces.projects.locations.apps.versions.restore",
            "path": "v1/{+name}:restore",
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
