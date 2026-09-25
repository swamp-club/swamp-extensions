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

// Auto-generated extension model for @swamp/gcp/ces/apps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.
 *
 * An app serves as a top-level container for a group of agents, including the root agent and its sub-agents, along with their associated configurations. These agents work together to achieve specific goals within the app's context.
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
  return `${parent}/apps/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.get",
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
  "id": "ces.projects.locations.apps.create",
  "path": "v1/{+parent}/apps",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "appId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.patch",
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
  "id": "ces.projects.locations.apps.delete",
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
  "id": "ces.projects.locations.apps.list",
  "path": "v1/{+parent}/apps",
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
      "Optional. Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation.",
    ).optional(),
    bargeInConfig: z.object({
      bargeInAwareness: z.boolean().describe(
        "Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually.",
      ).optional(),
      disableBargeIn: z.boolean().describe(
        "Optional. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored.",
      ).optional(),
    }).describe(
      "Optional. Configures the agent behavior for the user barge-in activities.",
    ).optional(),
    customVoiceSamples: z.array(z.object({
      consentAudioGcsUri: z.string().describe(
        "Optional. Consent audio for voice cloning.",
      ).optional(),
      name: z.string().describe(
        "Optional. The user-defined name for the custom voice sample.",
      ).optional(),
      previewAudioContent: z.string().describe(
        "Output only. Synthesized preview audio for custom voice, formatted as canonical WAV (LINEAR16, 24kHz, 16-bit, mono).",
      ).optional(),
      previewText: z.string().describe(
        "Optional. Text for synthesizing preview audio for custom voice.",
      ).optional(),
      voiceInstruction: z.string().describe(
        "Optional. Natural language instructions for voice style, tone, pacing, or pronunciation.",
      ).optional(),
      voiceInstructionMode: z.enum([
        "VOICE_INSTRUCTION_MODE_UNSPECIFIED",
        "NO_INSTRUCTION",
        "GENERATE_INSTRUCTION",
        "CUSTOM_INSTRUCTION",
      ]).describe(
        "Optional. Instruction mode for the voice sample. If unspecified, defaults to NO_INSTRUCTION.",
      ).optional(),
      voiceSampleGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI to the audio sample for voice cloning. The audio sample should be a mono-channel, 24kHz WAV file.",
      ).optional(),
      warnings: z.array(z.object({
        message: z.unknown().describe(
          "Output only. A human-readable description of the warning.",
        ).optional(),
        type: z.unknown().describe("Output only. The type of the warning.")
          .optional(),
      })).describe(
        "Output only. Warning messages encountered during voice clone processing (e.g. low audio level).",
      ).optional(),
    })).describe("Optional. Configures custom voice samples for voice cloning.")
      .optional(),
    inactivityTimeout: z.string().describe(
      "Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement.",
    ).optional(),
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        instruction: z.string().describe(
          "Optional. The instruction used to synthesize speech when using a generative model.",
        ).optional(),
        model: z.string().describe(
          'Optional. The model used to synthesize audio. Currently supported values: - "gemini-3.1-flash-tts-preview" If empty, Chirp3-HD is used.',
        ).optional(),
        speakingRate: z.number().describe(
          "Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error.",
        ).optional(),
        voice: z.string().describe(
          "Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech.",
        ).optional(),
      }),
    ).describe(
      'Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive.',
    ).optional(),
  }).describe("Optional. Audio processing configuration of the app.")
    .optional(),
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
  }).describe("Optional. The default client certificate settings for the app.")
    .optional(),
  dashboardSettings: z.object({
    defaultDashboard: z.string().describe(
      "Optional. The resource name of the default Contact Center Insights dashboard associated with the app. This is the dashboard that will be displayed when users navigate to the Monitoring view for the app. Format: `projects/{project}/locations/{location}/dashboards/{dashboard}`",
    ).optional(),
  }).describe(
    "Optional. App-specific dashboard settings for linking and configuring Contact Center Insights dashboards.",
  ).optional(),
  dataStoreSettings: z.object({
    engines: z.array(z.object({
      name: z.string().describe(
        "Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "ENGINE_TYPE_SEARCH",
        "ENGINE_TYPE_CHAT",
      ]).describe("Output only. The type of the engine.").optional(),
    })).describe("Output only. The engines for the app.").optional(),
  }).describe("Optional. The data store settings for the app.").optional(),
  defaultChannelProfile: z.object({
    channelType: z.enum([
      "UNKNOWN",
      "WEB_UI",
      "API",
      "TWILIO",
      "GOOGLE_TELEPHONY_PLATFORM",
      "CONTACT_CENTER_AS_A_SERVICE",
      "CONTACT_CENTER_AS_A_SERVICE_CHAT",
      "FIVE9",
      "CONTACT_CENTER_INTEGRATION",
      "WHATSAPP",
      "INSTAGRAM",
    ]).describe("Optional. The type of the channel profile.").optional(),
    disableBargeInControl: z.boolean().describe(
      "Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt.",
    ).optional(),
    disableDtmf: z.boolean().describe(
      "Optional. Whether to disable DTMF (dual-tone multi-frequency).",
    ).optional(),
    instagramConfig: z.object({
      description: z.string().describe(
        "Output only. The description of the Meta business page or profile.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The fetched Meta business page name.",
      ).optional(),
      instagramAccountId: z.string().describe(
        "Required. The Instagram Account ID.",
      ).optional(),
      thumbnailUrl: z.string().describe(
        "Output only. The fetched Meta business profile thumbnail URL.",
      ).optional(),
    }).describe("Optional. Configuration specific to Instagram deployments.")
      .optional(),
    noiseSuppressionLevel: z.string().describe(
      'Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high".',
    ).optional(),
    personaProperty: z.object({
      persona: z.enum(["UNKNOWN", "CONCISE", "CHATTY"]).describe(
        "Optional. The persona of the channel.",
      ).optional(),
    }).describe("Optional. The persona property of the channel profile.")
      .optional(),
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
        allowedOrigins: z.array(z.string()).describe(
          'Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com"',
        ).optional(),
        enableOriginCheck: z.boolean().describe(
          "Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins.",
        ).optional(),
        enablePublicAccess: z.boolean().describe(
          "Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent.",
        ).optional(),
        enableRecaptcha: z.boolean().describe(
          "Optional. Indicates whether reCAPTCHA verification for the web widget is enabled.",
        ).optional(),
      }).describe("Optional. The security settings of the web widget.")
        .optional(),
      theme: z.enum(["THEME_UNSPECIFIED", "LIGHT", "DARK"]).describe(
        "Optional. The theme of the web widget.",
      ).optional(),
      webWidgetTitle: z.string().describe(
        "Optional. The title of the web widget.",
      ).optional(),
    }).describe("Optional. The configuration for the web widget.").optional(),
    whatsappConfig: z.object({
      description: z.string().describe(
        "Output only. The description of the Meta business page or profile.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The fetched Meta business page name.",
      ).optional(),
      phoneNumber: z.string().describe(
        "Optional. The phone number in E.164 format.",
      ).optional(),
      phoneNumberId: z.string().describe("Required. The Meta phone number ID.")
        .optional(),
      thumbnailUrl: z.string().describe(
        "Output only. The fetched Meta business profile thumbnail URL.",
      ).optional(),
      wabaId: z.string().describe("Required. The WhatsApp Business Account ID.")
        .optional(),
    }).describe("Optional. Configuration specific to WhatsApp deployments.")
      .optional(),
  }).describe("Optional. The default channel profile used by the app.")
    .optional(),
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
      "Optional. Configuration for ending the session in case of system errors (e.g. LLM errors).",
    ).optional(),
    errorHandlingStrategy: z.enum([
      "ERROR_HANDLING_STRATEGY_UNSPECIFIED",
      "NONE",
      "FALLBACK_RESPONSE",
      "END_SESSION",
    ]).describe("Optional. The strategy to use for error handling.").optional(),
    fallbackResponseConfig: z.object({
      customFallbackMessages: z.record(z.string(), z.string()).describe(
        "Optional. The fallback messages in case of system errors (e.g. LLM errors), mapped by [supported language code](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/reference/language).",
      ).optional(),
      maxFallbackAttempts: z.number().int().describe(
        "Optional. The maximum number of fallback attempts to make before the agent emitting EndSession Signal.",
      ).optional(),
    }).describe("Optional. Configuration for handling fallback responses.")
      .optional(),
  }).describe("Optional. Error handling settings of the app.").optional(),
  evaluationMetricsThresholds: z.object({
    goldenEvaluationMetricsThresholds: z.object({
      expectationLevelMetricsThresholds: z.object({
        toolInvocationParameterCorrectnessThreshold: z.number().describe(
          "Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0.",
        ).optional(),
      }).describe("Optional. The expectation level metrics thresholds.")
        .optional(),
      toolMatchingSettings: z.object({
        extraToolCallBehavior: z.enum([
          "EXTRA_TOOL_CALL_BEHAVIOR_UNSPECIFIED",
          "FAIL",
          "ALLOW",
        ]).describe(
          "Optional. Behavior for extra tool calls. Defaults to FAIL.",
        ).optional(),
      }).describe(
        "Optional. The tool matching settings. An extra tool call is a tool call that is present in the execution but does not match any tool call in the golden expectation.",
      ).optional(),
      turnLevelMetricsThresholds: z.object({
        overallToolInvocationCorrectnessThreshold: z.number().describe(
          "Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0.",
        ).optional(),
        semanticSimilarityChannel: z.enum([
          "SEMANTIC_SIMILARITY_CHANNEL_UNSPECIFIED",
          "TEXT",
          "AUDIO",
        ]).describe(
          "Optional. The semantic similarity channel to use for evaluation.",
        ).optional(),
        semanticSimilaritySuccessThreshold: z.number().int().describe(
          "Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3.",
        ).optional(),
      }).describe("Optional. The turn level metrics thresholds.").optional(),
    }).describe("Optional. The golden evaluation metrics thresholds.")
      .optional(),
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
  }).describe("Optional. The evaluation thresholds for the app.").optional(),
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
  }).describe("Optional. Language settings of the app.").optional(),
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
      "Optional. Configuration for how audio interactions should be recorded. The audio is subject to redaction as configured in RedactionConfig.",
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
      "Optional. Configures the BigQuery export behaviors for the app. The conversation data is subject to redaction as configured in RedactionConfig.",
    ).optional(),
    cloudLoggingSettings: z.object({
      enableCloudLogging: z.boolean().describe(
        "Optional. Whether to enable Cloud Logging for the sessions.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the Cloud Logging behaviors for the app.",
    ).optional(),
    conversationLoggingSettings: z.object({
      disableConversationLogging: z.boolean().describe(
        "Optional. Whether to disable conversation logging for the sessions.",
      ).optional(),
      retentionWindow: z.string().describe(
        "Optional. Controls the retention window for the conversation. If not set, the conversation will be retained for 365 days.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the conversation logging behaviors for the app.",
    ).optional(),
    evaluationAudioRecordingConfig: z.object({
      gcsBucket: z.string().describe(
        'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
      ).optional(),
      gcsPathPrefix: z.string().describe(
        "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
      ).optional(),
    }).describe(
      "Optional. Configuration for how audio interactions should be recorded for the evaluation. By default, audio recording is not enabled for evaluation sessions.",
    ).optional(),
    metricAnalysisSettings: z.object({
      llmMetricsOptedOut: z.boolean().describe(
        "Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the conversation data collection behaviors for the LLM analysis pipeline for the app.",
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
      "Optional. Configuration for how sensitive data should be redacted.",
    ).optional(),
    unredactedAudioRecordingConfig: z.object({
      gcsBucket: z.string().describe(
        'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
      ).optional(),
      gcsPathPrefix: z.string().describe(
        "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
      ).optional(),
    }).describe(
      "Optional. Configures an additional recording of unredacted audio. This can be used to maintain a raw audio copy when audio redaction is enabled, typically for auditing or monitoring purposes.",
    ).optional(),
    unredactedBigqueryExportSettings: z.object({
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
      "Optional. Configures the BigQuery export behaviors for the app. The unredacted conversation data will be exported to BigQuery tables if it is enabled.",
    ).optional(),
  }).describe("Optional. Logging settings of the app.").optional(),
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
    thinkingLevel: z.enum([
      "THINKING_LEVEL_UNSPECIFIED",
      "DEFAULT",
      "LOW",
      "MEDIUM",
      "HIGH",
    ]).describe("Optional. The thinking level of the model.").optional(),
  }).describe(
    "Optional. The default LLM model settings for the app. Individual resources (e.g. agents, guardrails) can override these configurations as needed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}`",
  ).optional(),
  pinned: z.boolean().describe(
    "Optional. Whether the app is pinned in the app list.",
  ).optional(),
  rootAgent: z.string().describe(
    "Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  timeZoneSettings: z.object({
    timeZone: z.string().describe(
      "Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris.",
    ).optional(),
  }).describe("Optional. TimeZone settings of the app.").optional(),
  toolExecutionMode: z.enum([
    "TOOL_EXECUTION_MODE_UNSPECIFIED",
    "PARALLEL",
    "SEQUENTIAL",
  ]).describe(
    "Optional. The tool execution mode for the app. If not provided, will default to PARALLEL.",
  ).optional(),
  variableDeclarations: z.array(z.object({
    description: z.string().describe(
      "Required. The description of the variable.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
    ).optional(),
    schema: z.object({
      additionalProperties: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Schema",
      ).optional(),
      anyOf: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
      ).optional(),
      default: z.string().describe("Optional. Default value of the data.")
        .optional(),
      defs: z.record(z.string(), z.record(z.string(), z.unknown())).describe(
        "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
      ).optional(),
      description: z.string().describe("Optional. The description of the data.")
        .optional(),
      enum: z.array(z.string()).describe(
        'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
      ).optional(),
      items: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Schema",
      ).optional(),
      maxItems: z.string().describe(
        "Optional. Maximum number of the elements for Type.ARRAY.",
      ).optional(),
      maximum: z.number().describe(
        "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
      ).optional(),
      minItems: z.string().describe(
        "Optional. Minimum number of the elements for Type.ARRAY.",
      ).optional(),
      minimum: z.number().describe(
        "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
      ).optional(),
      nullable: z.boolean().describe(
        "Optional. Indicates if the value may be null.",
      ).optional(),
      prefixItems: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. Schemas of initial elements of Type.ARRAY.",
      ).optional(),
      properties: z.record(z.string(), z.record(z.string(), z.unknown()))
        .describe("Optional. Properties of Type.OBJECT.").optional(),
      ref: z.string().describe(
        'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
      ).optional(),
      required: z.array(z.string()).describe(
        "Optional. Required properties of Type.OBJECT.",
      ).optional(),
      title: z.string().describe("Optional. The title of the schema.")
        .optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "STRING",
        "INTEGER",
        "NUMBER",
        "BOOLEAN",
        "OBJECT",
        "ARRAY",
      ]).describe("Required. The type of the data.").optional(),
      uniqueItems: z.boolean().describe(
        "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
      ).optional(),
    }).describe("Required. The schema of the variable.").optional(),
  })).describe("Optional. The declarations of the variables.").optional(),
  vpcScSettings: z.object({
    allowedOrigins: z.array(z.string()).describe(
      'Optional. The allowed HTTP(s) origins that OpenAPI tools in the App are able to directly call when VPC Service Controls are enabled. These strings must match the origin exactly, including the port if specified. For example, "https://example.com" or "https://example.com:443". This list does not yet apply to Python tools that may make direct HTTP calls.',
    ).optional(),
  }).describe("Optional. VPC-SC settings for the app.").optional(),
  appId: z.string().describe(
    "Optional. The ID to use for the app, which will become the final component of the app's resource name. If not provided, a unique ID will be automatically assigned for the app.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
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
    customVoiceSamples: z.array(z.object({
      consentAudioGcsUri: z.string(),
      name: z.string(),
      previewAudioContent: z.string(),
      previewText: z.string(),
      voiceInstruction: z.string(),
      voiceInstructionMode: z.string(),
      voiceSampleGcsUri: z.string(),
      warnings: z.array(z.object({
        message: z.unknown(),
        type: z.unknown(),
      })),
    })),
    inactivityTimeout: z.string(),
    synthesizeSpeechConfigs: z.record(z.string(), z.unknown()),
  }).optional(),
  clientCertificateSettings: z.object({
    passphrase: z.string(),
    privateKey: z.string(),
    tlsCertificate: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dashboardSettings: z.object({
    defaultDashboard: z.string(),
  }).optional(),
  dataStoreSettings: z.object({
    engines: z.array(z.object({
      name: z.string(),
      type: z.string(),
    })),
  }).optional(),
  defaultChannelProfile: z.object({
    channelType: z.string(),
    disableBargeInControl: z.boolean(),
    disableDtmf: z.boolean(),
    instagramConfig: z.object({
      description: z.string(),
      displayName: z.string(),
      instagramAccountId: z.string(),
      thumbnailUrl: z.string(),
    }),
    noiseSuppressionLevel: z.string(),
    personaProperty: z.object({
      persona: z.string(),
    }),
    profileId: z.string(),
    webWidgetConfig: z.object({
      modality: z.string(),
      securitySettings: z.object({
        allowedOrigins: z.array(z.string()),
        enableOriginCheck: z.boolean(),
        enablePublicAccess: z.boolean(),
        enableRecaptcha: z.boolean(),
      }),
      theme: z.string(),
      webWidgetTitle: z.string(),
    }),
    whatsappConfig: z.object({
      description: z.string(),
      displayName: z.string(),
      phoneNumber: z.string(),
      phoneNumberId: z.string(),
      thumbnailUrl: z.string(),
      wabaId: z.string(),
    }),
  }).optional(),
  deploymentCount: z.number().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  errorHandlingSettings: z.object({
    endSessionConfig: z.object({
      escalateSession: z.boolean(),
    }),
    errorHandlingStrategy: z.string(),
    fallbackResponseConfig: z.object({
      customFallbackMessages: z.record(z.string(), z.unknown()),
      maxFallbackAttempts: z.number(),
    }),
  }).optional(),
  etag: z.string().optional(),
  evaluationMetricsThresholds: z.object({
    goldenEvaluationMetricsThresholds: z.object({
      expectationLevelMetricsThresholds: z.object({
        toolInvocationParameterCorrectnessThreshold: z.number(),
      }),
      toolMatchingSettings: z.object({
        extraToolCallBehavior: z.string(),
      }),
      turnLevelMetricsThresholds: z.object({
        overallToolInvocationCorrectnessThreshold: z.number(),
        semanticSimilarityChannel: z.string(),
        semanticSimilaritySuccessThreshold: z.number(),
      }),
    }),
    goldenHallucinationMetricBehavior: z.string(),
    hallucinationMetricBehavior: z.string(),
    scenarioHallucinationMetricBehavior: z.string(),
  }).optional(),
  globalInstruction: z.string().optional(),
  guardrails: z.array(z.string()).optional(),
  languageSettings: z.object({
    defaultLanguageCode: z.string(),
    enableMultilingualSupport: z.boolean(),
    fallbackAction: z.string(),
    supportedLanguageCodes: z.array(z.string()),
  }).optional(),
  locked: z.boolean().optional(),
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
    unredactedBigqueryExportSettings: z.object({
      dataset: z.string(),
      enabled: z.boolean(),
      project: z.string(),
    }),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  modelSettings: z.object({
    model: z.string(),
    temperature: z.number(),
    thinkingLevel: z.string(),
  }).optional(),
  name: z.string(),
  pinned: z.boolean().optional(),
  predefinedVariableDeclarations: z.array(z.object({
    description: z.string(),
    name: z.string(),
    schema: z.object({
      additionalProperties: z.record(z.string(), z.unknown()),
      anyOf: z.array(z.record(z.string(), z.unknown())),
      default: z.string(),
      defs: z.record(z.string(), z.unknown()),
      description: z.string(),
      enum: z.array(z.string()),
      items: z.record(z.string(), z.unknown()),
      maxItems: z.string(),
      maximum: z.number(),
      minItems: z.string(),
      minimum: z.number(),
      nullable: z.boolean(),
      prefixItems: z.array(z.record(z.string(), z.unknown())),
      properties: z.record(z.string(), z.unknown()),
      ref: z.string(),
      required: z.array(z.string()),
      title: z.string(),
      type: z.string(),
      uniqueItems: z.boolean(),
    }),
  })).optional(),
  rootAgent: z.string().optional(),
  timeZoneSettings: z.object({
    timeZone: z.string(),
  }).optional(),
  toolExecutionMode: z.string().optional(),
  updateTime: z.string().optional(),
  validationErrors: z.array(z.string()).optional(),
  variableDeclarations: z.array(z.object({
    description: z.string(),
    name: z.string(),
    schema: z.object({
      additionalProperties: z.record(z.string(), z.unknown()),
      anyOf: z.array(z.record(z.string(), z.unknown())),
      default: z.string(),
      defs: z.record(z.string(), z.unknown()),
      description: z.string(),
      enum: z.array(z.string()),
      items: z.record(z.string(), z.unknown()),
      maxItems: z.string(),
      maximum: z.number(),
      minItems: z.string(),
      minimum: z.number(),
      nullable: z.boolean(),
      prefixItems: z.array(z.record(z.string(), z.unknown())),
      properties: z.record(z.string(), z.unknown()),
      ref: z.string(),
      required: z.array(z.string()),
      title: z.string(),
      type: z.string(),
      uniqueItems: z.boolean(),
    }),
  })).optional(),
  vpcScSettings: z.object({
    allowedOrigins: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
      "Optional. Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation.",
    ).optional(),
    bargeInConfig: z.object({
      bargeInAwareness: z.boolean().describe(
        "Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually.",
      ).optional(),
      disableBargeIn: z.boolean().describe(
        "Optional. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored.",
      ).optional(),
    }).describe(
      "Optional. Configures the agent behavior for the user barge-in activities.",
    ).optional(),
    customVoiceSamples: z.array(z.object({
      consentAudioGcsUri: z.string().describe(
        "Optional. Consent audio for voice cloning.",
      ).optional(),
      name: z.string().describe(
        "Optional. The user-defined name for the custom voice sample.",
      ).optional(),
      previewAudioContent: z.string().describe(
        "Output only. Synthesized preview audio for custom voice, formatted as canonical WAV (LINEAR16, 24kHz, 16-bit, mono).",
      ).optional(),
      previewText: z.string().describe(
        "Optional. Text for synthesizing preview audio for custom voice.",
      ).optional(),
      voiceInstruction: z.string().describe(
        "Optional. Natural language instructions for voice style, tone, pacing, or pronunciation.",
      ).optional(),
      voiceInstructionMode: z.enum([
        "VOICE_INSTRUCTION_MODE_UNSPECIFIED",
        "NO_INSTRUCTION",
        "GENERATE_INSTRUCTION",
        "CUSTOM_INSTRUCTION",
      ]).describe(
        "Optional. Instruction mode for the voice sample. If unspecified, defaults to NO_INSTRUCTION.",
      ).optional(),
      voiceSampleGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI to the audio sample for voice cloning. The audio sample should be a mono-channel, 24kHz WAV file.",
      ).optional(),
      warnings: z.array(z.object({
        message: z.unknown().describe(
          "Output only. A human-readable description of the warning.",
        ).optional(),
        type: z.unknown().describe("Output only. The type of the warning.")
          .optional(),
      })).describe(
        "Output only. Warning messages encountered during voice clone processing (e.g. low audio level).",
      ).optional(),
    })).describe("Optional. Configures custom voice samples for voice cloning.")
      .optional(),
    inactivityTimeout: z.string().describe(
      "Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement.",
    ).optional(),
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        instruction: z.string().describe(
          "Optional. The instruction used to synthesize speech when using a generative model.",
        ).optional(),
        model: z.string().describe(
          'Optional. The model used to synthesize audio. Currently supported values: - "gemini-3.1-flash-tts-preview" If empty, Chirp3-HD is used.',
        ).optional(),
        speakingRate: z.number().describe(
          "Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error.",
        ).optional(),
        voice: z.string().describe(
          "Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech.",
        ).optional(),
      }),
    ).describe(
      'Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive.',
    ).optional(),
  }).describe("Optional. Audio processing configuration of the app.")
    .optional(),
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
  }).describe("Optional. The default client certificate settings for the app.")
    .optional(),
  dashboardSettings: z.object({
    defaultDashboard: z.string().describe(
      "Optional. The resource name of the default Contact Center Insights dashboard associated with the app. This is the dashboard that will be displayed when users navigate to the Monitoring view for the app. Format: `projects/{project}/locations/{location}/dashboards/{dashboard}`",
    ).optional(),
  }).describe(
    "Optional. App-specific dashboard settings for linking and configuring Contact Center Insights dashboards.",
  ).optional(),
  dataStoreSettings: z.object({
    engines: z.array(z.object({
      name: z.string().describe(
        "Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}`",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "ENGINE_TYPE_SEARCH",
        "ENGINE_TYPE_CHAT",
      ]).describe("Output only. The type of the engine.").optional(),
    })).describe("Output only. The engines for the app.").optional(),
  }).describe("Optional. The data store settings for the app.").optional(),
  defaultChannelProfile: z.object({
    channelType: z.enum([
      "UNKNOWN",
      "WEB_UI",
      "API",
      "TWILIO",
      "GOOGLE_TELEPHONY_PLATFORM",
      "CONTACT_CENTER_AS_A_SERVICE",
      "CONTACT_CENTER_AS_A_SERVICE_CHAT",
      "FIVE9",
      "CONTACT_CENTER_INTEGRATION",
      "WHATSAPP",
      "INSTAGRAM",
    ]).describe("Optional. The type of the channel profile.").optional(),
    disableBargeInControl: z.boolean().describe(
      "Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt.",
    ).optional(),
    disableDtmf: z.boolean().describe(
      "Optional. Whether to disable DTMF (dual-tone multi-frequency).",
    ).optional(),
    instagramConfig: z.object({
      description: z.string().describe(
        "Output only. The description of the Meta business page or profile.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The fetched Meta business page name.",
      ).optional(),
      instagramAccountId: z.string().describe(
        "Required. The Instagram Account ID.",
      ).optional(),
      thumbnailUrl: z.string().describe(
        "Output only. The fetched Meta business profile thumbnail URL.",
      ).optional(),
    }).describe("Optional. Configuration specific to Instagram deployments.")
      .optional(),
    noiseSuppressionLevel: z.string().describe(
      'Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high".',
    ).optional(),
    personaProperty: z.object({
      persona: z.enum(["UNKNOWN", "CONCISE", "CHATTY"]).describe(
        "Optional. The persona of the channel.",
      ).optional(),
    }).describe("Optional. The persona property of the channel profile.")
      .optional(),
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
        allowedOrigins: z.array(z.string()).describe(
          'Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com"',
        ).optional(),
        enableOriginCheck: z.boolean().describe(
          "Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins.",
        ).optional(),
        enablePublicAccess: z.boolean().describe(
          "Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent.",
        ).optional(),
        enableRecaptcha: z.boolean().describe(
          "Optional. Indicates whether reCAPTCHA verification for the web widget is enabled.",
        ).optional(),
      }).describe("Optional. The security settings of the web widget.")
        .optional(),
      theme: z.enum(["THEME_UNSPECIFIED", "LIGHT", "DARK"]).describe(
        "Optional. The theme of the web widget.",
      ).optional(),
      webWidgetTitle: z.string().describe(
        "Optional. The title of the web widget.",
      ).optional(),
    }).describe("Optional. The configuration for the web widget.").optional(),
    whatsappConfig: z.object({
      description: z.string().describe(
        "Output only. The description of the Meta business page or profile.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The fetched Meta business page name.",
      ).optional(),
      phoneNumber: z.string().describe(
        "Optional. The phone number in E.164 format.",
      ).optional(),
      phoneNumberId: z.string().describe("Required. The Meta phone number ID.")
        .optional(),
      thumbnailUrl: z.string().describe(
        "Output only. The fetched Meta business profile thumbnail URL.",
      ).optional(),
      wabaId: z.string().describe("Required. The WhatsApp Business Account ID.")
        .optional(),
    }).describe("Optional. Configuration specific to WhatsApp deployments.")
      .optional(),
  }).describe("Optional. The default channel profile used by the app.")
    .optional(),
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
      "Optional. Configuration for ending the session in case of system errors (e.g. LLM errors).",
    ).optional(),
    errorHandlingStrategy: z.enum([
      "ERROR_HANDLING_STRATEGY_UNSPECIFIED",
      "NONE",
      "FALLBACK_RESPONSE",
      "END_SESSION",
    ]).describe("Optional. The strategy to use for error handling.").optional(),
    fallbackResponseConfig: z.object({
      customFallbackMessages: z.record(z.string(), z.string()).describe(
        "Optional. The fallback messages in case of system errors (e.g. LLM errors), mapped by [supported language code](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/reference/language).",
      ).optional(),
      maxFallbackAttempts: z.number().int().describe(
        "Optional. The maximum number of fallback attempts to make before the agent emitting EndSession Signal.",
      ).optional(),
    }).describe("Optional. Configuration for handling fallback responses.")
      .optional(),
  }).describe("Optional. Error handling settings of the app.").optional(),
  evaluationMetricsThresholds: z.object({
    goldenEvaluationMetricsThresholds: z.object({
      expectationLevelMetricsThresholds: z.object({
        toolInvocationParameterCorrectnessThreshold: z.number().describe(
          "Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0.",
        ).optional(),
      }).describe("Optional. The expectation level metrics thresholds.")
        .optional(),
      toolMatchingSettings: z.object({
        extraToolCallBehavior: z.enum([
          "EXTRA_TOOL_CALL_BEHAVIOR_UNSPECIFIED",
          "FAIL",
          "ALLOW",
        ]).describe(
          "Optional. Behavior for extra tool calls. Defaults to FAIL.",
        ).optional(),
      }).describe(
        "Optional. The tool matching settings. An extra tool call is a tool call that is present in the execution but does not match any tool call in the golden expectation.",
      ).optional(),
      turnLevelMetricsThresholds: z.object({
        overallToolInvocationCorrectnessThreshold: z.number().describe(
          "Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0.",
        ).optional(),
        semanticSimilarityChannel: z.enum([
          "SEMANTIC_SIMILARITY_CHANNEL_UNSPECIFIED",
          "TEXT",
          "AUDIO",
        ]).describe(
          "Optional. The semantic similarity channel to use for evaluation.",
        ).optional(),
        semanticSimilaritySuccessThreshold: z.number().int().describe(
          "Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3.",
        ).optional(),
      }).describe("Optional. The turn level metrics thresholds.").optional(),
    }).describe("Optional. The golden evaluation metrics thresholds.")
      .optional(),
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
  }).describe("Optional. The evaluation thresholds for the app.").optional(),
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
  }).describe("Optional. Language settings of the app.").optional(),
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
      "Optional. Configuration for how audio interactions should be recorded. The audio is subject to redaction as configured in RedactionConfig.",
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
      "Optional. Configures the BigQuery export behaviors for the app. The conversation data is subject to redaction as configured in RedactionConfig.",
    ).optional(),
    cloudLoggingSettings: z.object({
      enableCloudLogging: z.boolean().describe(
        "Optional. Whether to enable Cloud Logging for the sessions.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the Cloud Logging behaviors for the app.",
    ).optional(),
    conversationLoggingSettings: z.object({
      disableConversationLogging: z.boolean().describe(
        "Optional. Whether to disable conversation logging for the sessions.",
      ).optional(),
      retentionWindow: z.string().describe(
        "Optional. Controls the retention window for the conversation. If not set, the conversation will be retained for 365 days.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the conversation logging behaviors for the app.",
    ).optional(),
    evaluationAudioRecordingConfig: z.object({
      gcsBucket: z.string().describe(
        'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
      ).optional(),
      gcsPathPrefix: z.string().describe(
        "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
      ).optional(),
    }).describe(
      "Optional. Configuration for how audio interactions should be recorded for the evaluation. By default, audio recording is not enabled for evaluation sessions.",
    ).optional(),
    metricAnalysisSettings: z.object({
      llmMetricsOptedOut: z.boolean().describe(
        "Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected.",
      ).optional(),
    }).describe(
      "Optional. Settings to describe the conversation data collection behaviors for the LLM analysis pipeline for the app.",
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
      "Optional. Configuration for how sensitive data should be redacted.",
    ).optional(),
    unredactedAudioRecordingConfig: z.object({
      gcsBucket: z.string().describe(
        'Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.',
      ).optional(),
      gcsPathPrefix: z.string().describe(
        "Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used.",
      ).optional(),
    }).describe(
      "Optional. Configures an additional recording of unredacted audio. This can be used to maintain a raw audio copy when audio redaction is enabled, typically for auditing or monitoring purposes.",
    ).optional(),
    unredactedBigqueryExportSettings: z.object({
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
      "Optional. Configures the BigQuery export behaviors for the app. The unredacted conversation data will be exported to BigQuery tables if it is enabled.",
    ).optional(),
  }).describe("Optional. Logging settings of the app.").optional(),
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
    thinkingLevel: z.enum([
      "THINKING_LEVEL_UNSPECIFIED",
      "DEFAULT",
      "LOW",
      "MEDIUM",
      "HIGH",
    ]).describe("Optional. The thinking level of the model.").optional(),
  }).describe(
    "Optional. The default LLM model settings for the app. Individual resources (e.g. agents, guardrails) can override these configurations as needed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}`",
  ).optional(),
  pinned: z.boolean().describe(
    "Optional. Whether the app is pinned in the app list.",
  ).optional(),
  rootAgent: z.string().describe(
    "Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  timeZoneSettings: z.object({
    timeZone: z.string().describe(
      "Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris.",
    ).optional(),
  }).describe("Optional. TimeZone settings of the app.").optional(),
  toolExecutionMode: z.enum([
    "TOOL_EXECUTION_MODE_UNSPECIFIED",
    "PARALLEL",
    "SEQUENTIAL",
  ]).describe(
    "Optional. The tool execution mode for the app. If not provided, will default to PARALLEL.",
  ).optional(),
  variableDeclarations: z.array(z.object({
    description: z.string().describe(
      "Required. The description of the variable.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores.",
    ).optional(),
    schema: z.object({
      additionalProperties: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Schema",
      ).optional(),
      anyOf: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. The value should be validated against any (one or more) of the subschemas in the list.",
      ).optional(),
      default: z.string().describe("Optional. Default value of the data.")
        .optional(),
      defs: z.record(z.string(), z.record(z.string(), z.unknown())).describe(
        "Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema.",
      ).optional(),
      description: z.string().describe("Optional. The description of the data.")
        .optional(),
      enum: z.array(z.string()).describe(
        'Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as: {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as: {type:INTEGER, format:enum, enum:["101", "201", "301"]}',
      ).optional(),
      items: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Schema",
      ).optional(),
      maxItems: z.string().describe(
        "Optional. Maximum number of the elements for Type.ARRAY.",
      ).optional(),
      maximum: z.number().describe(
        "Optional. Maximum value for Type.INTEGER and Type.NUMBER.",
      ).optional(),
      minItems: z.string().describe(
        "Optional. Minimum number of the elements for Type.ARRAY.",
      ).optional(),
      minimum: z.number().describe(
        "Optional. Minimum value for Type.INTEGER and Type.NUMBER.",
      ).optional(),
      nullable: z.boolean().describe(
        "Optional. Indicates if the value may be null.",
      ).optional(),
      prefixItems: z.array(z.record(z.string(), z.unknown())).describe(
        "Optional. Schemas of initial elements of Type.ARRAY.",
      ).optional(),
      properties: z.record(z.string(), z.record(z.string(), z.unknown()))
        .describe("Optional. Properties of Type.OBJECT.").optional(),
      ref: z.string().describe(
        'Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring.',
      ).optional(),
      required: z.array(z.string()).describe(
        "Optional. Required properties of Type.OBJECT.",
      ).optional(),
      title: z.string().describe("Optional. The title of the schema.")
        .optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "STRING",
        "INTEGER",
        "NUMBER",
        "BOOLEAN",
        "OBJECT",
        "ARRAY",
      ]).describe("Required. The type of the data.").optional(),
      uniqueItems: z.boolean().describe(
        "Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY.",
      ).optional(),
    }).describe("Required. The schema of the variable.").optional(),
  })).describe("Optional. The declarations of the variables.").optional(),
  vpcScSettings: z.object({
    allowedOrigins: z.array(z.string()).describe(
      'Optional. The allowed HTTP(s) origins that OpenAPI tools in the App are able to directly call when VPC Service Controls are enabled. These strings must match the origin exactly, including the port if specified. For example, "https://example.com" or "https://example.com:443". This list does not yet apply to Python tools that may make direct HTTP calls.',
    ).optional(),
  }).describe("Optional. VPC-SC settings for the app.").optional(),
  appId: z.string().describe(
    "Optional. The ID to use for the app, which will become the final component of the app's resource name. If not provided, a unique ID will be automatically assigned for the app.",
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

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps. Registered at `@swamp/gcp/ces/apps`. */
export const model = {
  type: "@swamp/gcp/ces/apps",
  version: "2026.09.25.1",
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
      description: "Added: vpcScSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: vpcScSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: vpcScSettings",
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
      toVersion: "2026.05.26.1",
      description: "Added: vpcScSettings",
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
      toVersion: "2026.07.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.13.1",
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
      toVersion: "2026.07.20.2",
      description: "Added: vpcScSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "Added: vpcScSettings",
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
      toVersion: "2026.08.28.1",
      description: "Added: dashboardSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An app serves as a top-level container for a group of agents, including the r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apps",
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
        if (g["audioProcessingConfig"] !== undefined) {
          body["audioProcessingConfig"] = g["audioProcessingConfig"];
        }
        if (g["clientCertificateSettings"] !== undefined) {
          body["clientCertificateSettings"] = g["clientCertificateSettings"];
        }
        if (g["dashboardSettings"] !== undefined) {
          body["dashboardSettings"] = g["dashboardSettings"];
        }
        if (g["dataStoreSettings"] !== undefined) {
          body["dataStoreSettings"] = g["dataStoreSettings"];
        }
        if (g["defaultChannelProfile"] !== undefined) {
          body["defaultChannelProfile"] = g["defaultChannelProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["errorHandlingSettings"] !== undefined) {
          body["errorHandlingSettings"] = g["errorHandlingSettings"];
        }
        if (g["evaluationMetricsThresholds"] !== undefined) {
          body["evaluationMetricsThresholds"] =
            g["evaluationMetricsThresholds"];
        }
        if (g["globalInstruction"] !== undefined) {
          body["globalInstruction"] = g["globalInstruction"];
        }
        if (g["guardrails"] !== undefined) body["guardrails"] = g["guardrails"];
        if (g["languageSettings"] !== undefined) {
          body["languageSettings"] = g["languageSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["loggingSettings"] !== undefined) {
          body["loggingSettings"] = g["loggingSettings"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pinned"] !== undefined) body["pinned"] = g["pinned"];
        if (g["rootAgent"] !== undefined) body["rootAgent"] = g["rootAgent"];
        if (g["timeZoneSettings"] !== undefined) {
          body["timeZoneSettings"] = g["timeZoneSettings"];
        }
        if (g["toolExecutionMode"] !== undefined) {
          body["toolExecutionMode"] = g["toolExecutionMode"];
        }
        if (g["variableDeclarations"] !== undefined) {
          body["variableDeclarations"] = g["variableDeclarations"];
        }
        if (g["vpcScSettings"] !== undefined) {
          body["vpcScSettings"] = g["vpcScSettings"];
        }
        if (g["appId"] !== undefined) params["appId"] = String(g["appId"]);
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
      description: "Get a apps",
      arguments: z.object({
        identifier: z.string().describe("The name of the apps"),
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
      description: "Update apps attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific apps by name (e.g. one discovered by list)",
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
        if (g["audioProcessingConfig"] !== undefined) {
          body["audioProcessingConfig"] = g["audioProcessingConfig"];
        }
        if (g["clientCertificateSettings"] !== undefined) {
          body["clientCertificateSettings"] = g["clientCertificateSettings"];
        }
        if (g["dashboardSettings"] !== undefined) {
          body["dashboardSettings"] = g["dashboardSettings"];
        }
        if (g["dataStoreSettings"] !== undefined) {
          body["dataStoreSettings"] = g["dataStoreSettings"];
        }
        if (g["defaultChannelProfile"] !== undefined) {
          body["defaultChannelProfile"] = g["defaultChannelProfile"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["errorHandlingSettings"] !== undefined) {
          body["errorHandlingSettings"] = g["errorHandlingSettings"];
        }
        if (g["evaluationMetricsThresholds"] !== undefined) {
          body["evaluationMetricsThresholds"] =
            g["evaluationMetricsThresholds"];
        }
        if (g["globalInstruction"] !== undefined) {
          body["globalInstruction"] = g["globalInstruction"];
        }
        if (g["guardrails"] !== undefined) body["guardrails"] = g["guardrails"];
        if (g["languageSettings"] !== undefined) {
          body["languageSettings"] = g["languageSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["loggingSettings"] !== undefined) {
          body["loggingSettings"] = g["loggingSettings"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["pinned"] !== undefined) body["pinned"] = g["pinned"];
        if (g["rootAgent"] !== undefined) body["rootAgent"] = g["rootAgent"];
        if (g["timeZoneSettings"] !== undefined) {
          body["timeZoneSettings"] = g["timeZoneSettings"];
        }
        if (g["toolExecutionMode"] !== undefined) {
          body["toolExecutionMode"] = g["toolExecutionMode"];
        }
        if (g["variableDeclarations"] !== undefined) {
          body["variableDeclarations"] = g["variableDeclarations"];
        }
        if (g["vpcScSettings"] !== undefined) {
          body["vpcScSettings"] = g["vpcScSettings"];
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
          undefined,
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
      description: "Delete the apps",
      arguments: z.object({
        identifier: z.string().describe("The name of the apps"),
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
      description: "Sync apps state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific apps by name (e.g. one discovered by list)",
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
      description: "List apps resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter to be applied when listing the apps. See https://google.aip.dev/160 for more details.",
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
          "apps",
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
    execute_tool: {
      description: "execute tool",
      arguments: z.object({
        args: z.any().optional(),
        context: z.any().optional(),
        mockConfig: z.any().optional(),
        tool: z.any().optional(),
        toolsetTool: z.any().optional(),
        variables: z.any().optional(),
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
        const body: Record<string, unknown> = {};
        if (args["args"] !== undefined) body["args"] = args["args"];
        if (args["context"] !== undefined) body["context"] = args["context"];
        if (args["mockConfig"] !== undefined) {
          body["mockConfig"] = args["mockConfig"];
        }
        if (args["tool"] !== undefined) body["tool"] = args["tool"];
        if (args["toolsetTool"] !== undefined) {
          body["toolsetTool"] = args["toolsetTool"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.executeTool",
            "path": "v1/{+parent}:executeTool",
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
    export_app: {
      description: "export app",
      arguments: z.object({
        appVersion: z.any().optional(),
        exportFormat: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["appVersion"] !== undefined) {
          body["appVersion"] = args["appVersion"];
        }
        if (args["exportFormat"] !== undefined) {
          body["exportFormat"] = args["exportFormat"];
        }
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.exportApp",
            "path": "v1/{+name}:exportApp",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    generate_onboarding_suggestions: {
      description: "generate onboarding suggestions",
      arguments: z.object({
        maxSuggestions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["maxSuggestions"] !== undefined) {
          body["maxSuggestions"] = args["maxSuggestions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.generateOnboardingSuggestions",
            "path": "v1/{+name}:generateOnboardingSuggestions",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_extended_agent_card: {
      description: "get extended agent card",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["tenant"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.getExtendedAgentCard",
            "path": "v1/{+tenant}/extendedAgentCard",
            "httpMethod": "GET",
            "parameterOrder": ["tenant"],
            "parameters": {
              "tenant": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    import_app: {
      description: "import app",
      arguments: z.object({
        appContent: z.any().optional(),
        appId: z.any().optional(),
        displayName: z.any().optional(),
        gcsUri: z.any().optional(),
        ignoreAppLock: z.any().optional(),
        importOptions: z.any().optional(),
        jsonPatchContent: z.any().optional(),
        jsonPatchGcsUri: z.any().optional(),
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
        const body: Record<string, unknown> = {};
        if (args["appContent"] !== undefined) {
          body["appContent"] = args["appContent"];
        }
        if (args["appId"] !== undefined) body["appId"] = args["appId"];
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        if (args["ignoreAppLock"] !== undefined) {
          body["ignoreAppLock"] = args["ignoreAppLock"];
        }
        if (args["importOptions"] !== undefined) {
          body["importOptions"] = args["importOptions"];
        }
        if (args["jsonPatchContent"] !== undefined) {
          body["jsonPatchContent"] = args["jsonPatchContent"];
        }
        if (args["jsonPatchGcsUri"] !== undefined) {
          body["jsonPatchGcsUri"] = args["jsonPatchGcsUri"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.importApp",
            "path": "v1/{+parent}/apps:importApp",
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
    retrieve_tool_schema: {
      description: "retrieve tool schema",
      arguments: z.object({
        tool: z.any().optional(),
        toolsetTool: z.any().optional(),
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
        const body: Record<string, unknown> = {};
        if (args["tool"] !== undefined) body["tool"] = args["tool"];
        if (args["toolsetTool"] !== undefined) {
          body["toolsetTool"] = args["toolsetTool"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "ces.projects.locations.apps.retrieveToolSchema",
            "path": "v1/{+parent}:retrieveToolSchema",
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
