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
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: experimentConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { experimentConfig: _experimentConfig, ...rest } = old;
        return rest;
      },
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
      toVersion: "2026.05.25.1",
      description: "Removed: experimentConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { experimentConfig: _experimentConfig, ...rest } = old;
        return rest;
      },
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
          "deployments",
          (args.maxPages as number | undefined) ?? 10,
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
