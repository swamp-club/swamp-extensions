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

// Auto-generated extension model for @swamp/gcp/dialogflow/agent-environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agent.Environments.
 *
 * GCP dialogflow Agent.Environments resource
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/environments/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.agent.environments.get",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.agent.environments.create",
  "path": "v2/{+parent}/environments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "environmentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.agent.environments.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowLoadToDraftAndDiscardChanges": {
      "location": "query",
    },
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
  "id": "dialogflow.projects.agent.environments.delete",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.agent.environments.list",
  "path": "v2/{+parent}/environments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  agentVersion: z.string().optional(),
  description: z.string().optional(),
  fulfillment: z.object({
    displayName: z.string().optional(),
    enabled: z.boolean().optional(),
    features: z.array(z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "SMALLTALK"]).optional(),
    })).optional(),
    genericWebService: z.object({
      isCloudFunction: z.boolean().optional(),
      password: z.string().optional(),
      requestHeaders: z.record(z.string(), z.string()).optional(),
      uri: z.string().optional(),
      username: z.string().optional(),
    }).optional(),
    name: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  state: z.enum(["STATE_UNSPECIFIED", "STOPPED", "LOADING", "RUNNING"])
    .optional(),
  textToSpeechSettings: z.object({
    enableTextToSpeech: z.boolean().optional(),
    outputAudioEncoding: z.enum([
      "OUTPUT_AUDIO_ENCODING_UNSPECIFIED",
      "OUTPUT_AUDIO_ENCODING_LINEAR_16",
      "OUTPUT_AUDIO_ENCODING_MP3",
      "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS",
      "OUTPUT_AUDIO_ENCODING_OGG_OPUS",
      "OUTPUT_AUDIO_ENCODING_MULAW",
      "OUTPUT_AUDIO_ENCODING_ALAW",
    ]).optional(),
    sampleRateHertz: z.number().int().optional(),
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        effectsProfileId: z.array(z.string()).optional(),
        pitch: z.number().optional(),
        pronunciations: z.array(z.object({
          phoneticEncoding: z.unknown().optional(),
          phrase: z.unknown().optional(),
          pronunciation: z.unknown().optional(),
        })).optional(),
        speakingRate: z.number().optional(),
        voice: z.object({
          name: z.string().optional(),
          ssmlGender: z.enum([
            "SSML_VOICE_GENDER_UNSPECIFIED",
            "SSML_VOICE_GENDER_MALE",
            "SSML_VOICE_GENDER_FEMALE",
            "SSML_VOICE_GENDER_NEUTRAL",
          ]).optional(),
        }).optional(),
        volumeGainDb: z.number().optional(),
      }),
    ).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  environmentId: z.string().describe("The environmentId for this resource")
    .optional(),
  allowLoadToDraftAndDiscardChanges: z.string().describe(
    "The allowLoadToDraftAndDiscardChanges for this resource",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentVersion: z.string().optional(),
  description: z.string().optional(),
  fulfillment: z.object({
    displayName: z.string(),
    enabled: z.boolean(),
    features: z.array(z.object({
      type: z.string(),
    })),
    genericWebService: z.object({
      isCloudFunction: z.boolean(),
      password: z.string(),
      requestHeaders: z.record(z.string(), z.unknown()),
      uri: z.string(),
      username: z.string(),
    }),
    name: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  textToSpeechSettings: z.object({
    enableTextToSpeech: z.boolean(),
    outputAudioEncoding: z.string(),
    sampleRateHertz: z.number(),
    synthesizeSpeechConfigs: z.record(z.string(), z.unknown()),
  }).optional(),
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
  agentVersion: z.string().optional(),
  description: z.string().optional(),
  fulfillment: z.object({
    displayName: z.string().optional(),
    enabled: z.boolean().optional(),
    features: z.array(z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "SMALLTALK"]).optional(),
    })).optional(),
    genericWebService: z.object({
      isCloudFunction: z.boolean().optional(),
      password: z.string().optional(),
      requestHeaders: z.record(z.string(), z.string()).optional(),
      uri: z.string().optional(),
      username: z.string().optional(),
    }).optional(),
    name: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  state: z.enum(["STATE_UNSPECIFIED", "STOPPED", "LOADING", "RUNNING"])
    .optional(),
  textToSpeechSettings: z.object({
    enableTextToSpeech: z.boolean().optional(),
    outputAudioEncoding: z.enum([
      "OUTPUT_AUDIO_ENCODING_UNSPECIFIED",
      "OUTPUT_AUDIO_ENCODING_LINEAR_16",
      "OUTPUT_AUDIO_ENCODING_MP3",
      "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS",
      "OUTPUT_AUDIO_ENCODING_OGG_OPUS",
      "OUTPUT_AUDIO_ENCODING_MULAW",
      "OUTPUT_AUDIO_ENCODING_ALAW",
    ]).optional(),
    sampleRateHertz: z.number().int().optional(),
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        effectsProfileId: z.array(z.string()).optional(),
        pitch: z.number().optional(),
        pronunciations: z.array(z.object({
          phoneticEncoding: z.unknown().optional(),
          phrase: z.unknown().optional(),
          pronunciation: z.unknown().optional(),
        })).optional(),
        speakingRate: z.number().optional(),
        voice: z.object({
          name: z.string().optional(),
          ssmlGender: z.enum([
            "SSML_VOICE_GENDER_UNSPECIFIED",
            "SSML_VOICE_GENDER_MALE",
            "SSML_VOICE_GENDER_FEMALE",
            "SSML_VOICE_GENDER_NEUTRAL",
          ]).optional(),
        }).optional(),
        volumeGainDb: z.number().optional(),
      }),
    ).optional(),
  }).optional(),
  updateTime: z.string().optional(),
  environmentId: z.string().describe("The environmentId for this resource")
    .optional(),
  allowLoadToDraftAndDiscardChanges: z.string().describe(
    "The allowLoadToDraftAndDiscardChanges for this resource",
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

/** Swamp extension model for Google Cloud Dialogflow Agent.Environments. Registered at `@swamp/gcp/dialogflow/agent-environments`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agent-environments",
  version: "2026.10.23.1",
  upgrades: [
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
      toVersion: "2026.09.07.1",
      description: "Added: allowLoadToDraftAndDiscardChanges",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agent.Environments resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a environments",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["agentVersion"] !== undefined) {
          body["agentVersion"] = g["agentVersion"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fulfillment"] !== undefined) {
          body["fulfillment"] = g["fulfillment"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["textToSpeechSettings"] !== undefined) {
          body["textToSpeechSettings"] = g["textToSpeechSettings"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["environmentId"] !== undefined) {
          params["environmentId"] = String(g["environmentId"]);
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Update environments attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific environments by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["agentVersion"] !== undefined) {
          body["agentVersion"] = g["agentVersion"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fulfillment"] !== undefined) {
          body["fulfillment"] = g["fulfillment"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["textToSpeechSettings"] !== undefined) {
          body["textToSpeechSettings"] = g["textToSpeechSettings"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["allowLoadToDraftAndDiscardChanges"] !== undefined) {
          params["allowLoadToDraftAndDiscardChanges"] = String(
            g["allowLoadToDraftAndDiscardChanges"],
          );
        } else if (
          existing["allowLoadToDraftAndDiscardChanges"] !== undefined
        ) {
          params["allowLoadToDraftAndDiscardChanges"] = String(
            existing["allowLoadToDraftAndDiscardChanges"],
          );
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
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED"],
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
      description: "Delete the environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Sync environments state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific environments by name (e.g. one discovered by list)",
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
      description: "List environments resources",
      arguments: z.object({
        pageSize: z.number().optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "environments",
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
    get_history: {
      description: "get history",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "dialogflow.projects.agent.environments.getHistory",
            "path": "v2/{+parent}/history",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
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
