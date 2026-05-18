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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
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
    }).describe("Version release for the experiment.").optional(),
  }).describe("Experiment for the deployment.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`",
  ).optional(),
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appVersion: z.string().optional(),
  channelProfile: z.object({
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
        allowedOrigins: z.array(z.string()),
        enableOriginCheck: z.boolean(),
        enablePublicAccess: z.boolean(),
        enableRecaptcha: z.boolean(),
      }),
      theme: z.string(),
      webWidgetTitle: z.string(),
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
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
    }).describe("Version release for the experiment.").optional(),
  }).describe("Experiment for the deployment.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}`",
  ).optional(),
  deploymentId: z.string().describe(
    "Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Deployments. Registered at `@swamp/gcp/ces/apps-deployments`. */
export const model = {
  type: "@swamp/gcp/ces/apps-deployments",
  version: "2026.05.18.2",
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
      toVersion: "2026.05.18.1",
      description: "Removed: experimentConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { experimentConfig: _experimentConfig, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: experimentConfig",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["deploymentId"] !== undefined) {
          body["deploymentId"] = g["deploymentId"];
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Update deployments attributes",
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Sync deployments state from GCP",
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
