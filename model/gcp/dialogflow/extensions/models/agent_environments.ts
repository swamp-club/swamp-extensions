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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agent.Environments. Registered at `@swamp/gcp/dialogflow/agent-environments`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agent-environments",
  version: "2026.06.05.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
          body["environmentId"] = g["environmentId"];
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Update environments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
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
      description: "Sync environments state from GCP",
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
      description: "List environments resources",
      arguments: z.object({
        pageSize: z.number().optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "environments",
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
    get_history: {
      description: "get history",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
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
          {},
        );
        return { result };
      },
    },
  },
};
