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

// Auto-generated extension model for @swamp/gcp/ces/apps-deployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Deployments.
 *
 * A deployment represents an immutable, queryable version of the app. It is used to deploy an app version with a specific channel profile.
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
  return `${parent}/deployments/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.deployments.get",
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
  "id": "ces.projects.locations.apps.deployments.create",
  "path": "v1/{+parent}/deployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "deploymentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.deployments.patch",
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
  "id": "ces.projects.locations.apps.deployments.delete",
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
  "id": "ces.projects.locations.apps.deployments.list",
  "path": "v1/{+parent}/deployments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  agentRegistryDeployment: z.object({
    agentRegistryServiceName: z.string().describe(
      "Optional. Output only. The resource name of the deployed Agent Registry service. Format: `projects/{project}/locations/{location}/services/{service}`",
    ).optional(),
  }).describe(
    "Optional. Configuration for deploying this deployment to Agent Registry. If present, this deployment will be published to Agent Registry.",
  ).optional(),
  appVersion: z.string().describe(
    "Optional. The resource name of the app version to deploy. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` Use `projects/{project}/locations/{location}/apps/{app}/versions/-` to use the draft app.",
  ).optional(),
  channelProfile: z.object({
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
  }).describe("Required. The channel profile used in the deployment.")
    .optional(),
  displayName: z.string().describe("Required. Display name of the deployment.")
    .optional(),
  experimentConfig: z.object({
    versionRelease: z.object({
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "RUNNING",
        "DONE",
        "EXPIRED",
      ]).describe("Optional. State of the version release.").optional(),
      trafficAllocations: z.array(z.object({
        appVersion: z.string().describe(
          "Optional. App version of the traffic allocation. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}`",
        ).optional(),
        id: z.string().describe(
          "Optional. Id of the traffic allocation. Free format string, up to 128 characters.",
        ).optional(),
        trafficPercentage: z.number().int().describe(
          "Optional. Traffic percentage of the traffic allocation. Must be between 0 and 100.",
        ).optional(),
      })).describe("Optional. Traffic allocations for the version release.")
        .optional(),
    }).describe("Optional. Version release for the experiment.").optional(),
  }).describe("Optional. Experiment configuration for the deployment.")
    .optional(),
  instagramCredentials: z.object({
    authCode: z.string().describe(
      "Required. The Meta auth code provided by the embedded signup flow.",
    ).optional(),
    conversationProfileId: z.string().describe(
      "Optional. The Conversation Profile ID to use for the deployment.",
    ).optional(),
  }).describe(
    "Optional. Input only. Ephemeral Instagram credentials required when configuring a Instagram channel profile.",
  ).optional(),
  modality: z.enum([
    "MODALITY_UNSPECIFIED",
    "MODALITY_TEXT",
    "MODALITY_VOICE",
    "MODALITY_VIDEO",
  ]).describe(
    "Optional. The modality of the deployment. Note: Deployment-level modality override is gated behind an allowlist. Contact the CXAS team to enable this field.",
  ).optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe(
    "Optional. Model settings for the deployment. Overrides model settings configured at the app/agent levels. Note: Deployment-level model settings override is gated behind an allowlist. Contact the CXAS team to enable this field.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`",
  ).optional(),
  whatsappCredentials: z.object({
    authCode: z.string().describe(
      "Required. The Meta auth code provided by the embedded signup flow.",
    ).optional(),
    businessAccountId: z.string().describe(
      "Required. The Business Account ID to use for the phone number.",
    ).optional(),
    conversationProfileId: z.string().describe(
      "Optional. The Conversation Profile ID to use for the deployment.",
    ).optional(),
    phoneNumber: z.string().describe(
      "Required. The phone number to register with WhatsApp.",
    ).optional(),
    pin: z.string().describe(
      "Required. The 6-digit PIN created by the user for two-step verification.",
    ).optional(),
    wabaId: z.string().describe("Required. The WhatsApp Business Account ID.")
      .optional(),
  }).describe(
    "Optional. Input only. Ephemeral WhatsApp credentials required when configuring a WhatsApp channel profile.",
  ).optional(),
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentRegistryDeployment: z.object({
    agentRegistryServiceName: z.string(),
  }).optional(),
  appVersion: z.string().optional(),
  channelProfile: z.object({
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
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  experimentConfig: z.object({
    versionRelease: z.object({
      state: z.string(),
      trafficAllocations: z.array(z.object({
        appVersion: z.string(),
        id: z.string(),
        trafficPercentage: z.number(),
      })),
    }),
  }).optional(),
  instagramCredentials: z.object({
    authCode: z.string(),
    conversationProfileId: z.string(),
  }).optional(),
  modality: z.string().optional(),
  modelSettings: z.object({
    model: z.string(),
    temperature: z.number(),
  }).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  whatsappCredentials: z.object({
    authCode: z.string(),
    businessAccountId: z.string(),
    conversationProfileId: z.string(),
    phoneNumber: z.string(),
    pin: z.string(),
    wabaId: z.string(),
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
  agentRegistryDeployment: z.object({
    agentRegistryServiceName: z.string().describe(
      "Optional. Output only. The resource name of the deployed Agent Registry service. Format: `projects/{project}/locations/{location}/services/{service}`",
    ).optional(),
  }).describe(
    "Optional. Configuration for deploying this deployment to Agent Registry. If present, this deployment will be published to Agent Registry.",
  ).optional(),
  appVersion: z.string().describe(
    "Optional. The resource name of the app version to deploy. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` Use `projects/{project}/locations/{location}/apps/{app}/versions/-` to use the draft app.",
  ).optional(),
  channelProfile: z.object({
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
  }).describe("Required. The channel profile used in the deployment.")
    .optional(),
  displayName: z.string().describe("Required. Display name of the deployment.")
    .optional(),
  experimentConfig: z.object({
    versionRelease: z.object({
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "RUNNING",
        "DONE",
        "EXPIRED",
      ]).describe("Optional. State of the version release.").optional(),
      trafficAllocations: z.array(z.object({
        appVersion: z.string().describe(
          "Optional. App version of the traffic allocation. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}`",
        ).optional(),
        id: z.string().describe(
          "Optional. Id of the traffic allocation. Free format string, up to 128 characters.",
        ).optional(),
        trafficPercentage: z.number().int().describe(
          "Optional. Traffic percentage of the traffic allocation. Must be between 0 and 100.",
        ).optional(),
      })).describe("Optional. Traffic allocations for the version release.")
        .optional(),
    }).describe("Optional. Version release for the experiment.").optional(),
  }).describe("Optional. Experiment configuration for the deployment.")
    .optional(),
  instagramCredentials: z.object({
    authCode: z.string().describe(
      "Required. The Meta auth code provided by the embedded signup flow.",
    ).optional(),
    conversationProfileId: z.string().describe(
      "Optional. The Conversation Profile ID to use for the deployment.",
    ).optional(),
  }).describe(
    "Optional. Input only. Ephemeral Instagram credentials required when configuring a Instagram channel profile.",
  ).optional(),
  modality: z.enum([
    "MODALITY_UNSPECIFIED",
    "MODALITY_TEXT",
    "MODALITY_VOICE",
    "MODALITY_VIDEO",
  ]).describe(
    "Optional. The modality of the deployment. Note: Deployment-level modality override is gated behind an allowlist. Contact the CXAS team to enable this field.",
  ).optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe(
    "Optional. Model settings for the deployment. Overrides model settings configured at the app/agent levels. Note: Deployment-level model settings override is gated behind an allowlist. Contact the CXAS team to enable this field.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`",
  ).optional(),
  whatsappCredentials: z.object({
    authCode: z.string().describe(
      "Required. The Meta auth code provided by the embedded signup flow.",
    ).optional(),
    businessAccountId: z.string().describe(
      "Required. The Business Account ID to use for the phone number.",
    ).optional(),
    conversationProfileId: z.string().describe(
      "Optional. The Conversation Profile ID to use for the deployment.",
    ).optional(),
    phoneNumber: z.string().describe(
      "Required. The phone number to register with WhatsApp.",
    ).optional(),
    pin: z.string().describe(
      "Required. The 6-digit PIN created by the user for two-step verification.",
    ).optional(),
    wabaId: z.string().describe("Required. The WhatsApp Business Account ID.")
      .optional(),
  }).describe(
    "Optional. Input only. Ephemeral WhatsApp credentials required when configuring a WhatsApp channel profile.",
  ).optional(),
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Deployments. Registered at `@swamp/gcp/ces/apps-deployments`. */
export const model = {
  type: "@swamp/gcp/ces/apps-deployments",
  version: "2026.09.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "Added: experimentConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: experimentConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: experimentConfig",
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
      description: "Added: experimentConfig",
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
      description: "Added: instagramCredentials, whatsappCredentials",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
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
      description:
        "Added: experimentConfig, instagramCredentials, whatsappCredentials",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description:
        "Added: experimentConfig, instagramCredentials, whatsappCredentials",
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
      toVersion: "2026.09.01.1",
      description: "Added: agentRegistryDeployment",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A deployment represents an immutable, queryable version of the app. It is use...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deployments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["agentRegistryDeployment"] !== undefined) {
          body["agentRegistryDeployment"] = g["agentRegistryDeployment"];
        }
        if (g["appVersion"] !== undefined) body["appVersion"] = g["appVersion"];
        if (g["channelProfile"] !== undefined) {
          body["channelProfile"] = g["channelProfile"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["experimentConfig"] !== undefined) {
          body["experimentConfig"] = g["experimentConfig"];
        }
        if (g["instagramCredentials"] !== undefined) {
          body["instagramCredentials"] = g["instagramCredentials"];
        }
        if (g["modality"] !== undefined) body["modality"] = g["modality"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["whatsappCredentials"] !== undefined) {
          body["whatsappCredentials"] = g["whatsappCredentials"];
        }
        if (g["deploymentId"] !== undefined) {
          params["deploymentId"] = String(g["deploymentId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update deployments attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deployments by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["agentRegistryDeployment"] !== undefined) {
          body["agentRegistryDeployment"] = g["agentRegistryDeployment"];
        }
        if (g["appVersion"] !== undefined) body["appVersion"] = g["appVersion"];
        if (g["channelProfile"] !== undefined) {
          body["channelProfile"] = g["channelProfile"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["experimentConfig"] !== undefined) {
          body["experimentConfig"] = g["experimentConfig"];
        }
        if (g["instagramCredentials"] !== undefined) {
          body["instagramCredentials"] = g["instagramCredentials"];
        }
        if (g["modality"] !== undefined) body["modality"] = g["modality"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["whatsappCredentials"] !== undefined) {
          body["whatsappCredentials"] = g["whatsappCredentials"];
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync deployments state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deployments by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List deployments resources",
      arguments: z.object({
        orderBy: z.string().describe(
          'Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of deployments to return. The service may return fewer than this value. If unspecified, at most 50 deployments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          "deployments",
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
            "id":
              "ces.projects.locations.apps.deployments.getExtendedAgentCard",
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
  },
};
