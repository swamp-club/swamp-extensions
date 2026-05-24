// Auto-generated extension model for @swamp/gcp/dialogflow/agents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.
 *
 * GCP dialogflow Agents resource
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
  return `${parent}/agents/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.create",
  "path": "v3/{+parent}/agents",
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

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.patch",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.delete",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.list",
  "path": "v3/{+parent}/agents",
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
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  answerFeedbackSettings: z.object({
    enableAnswerFeedback: z.boolean().optional(),
  }).optional(),
  avatarUri: z.string().optional(),
  clientCertificateSettings: z.object({
    passphrase: z.string().optional(),
    privateKey: z.string().optional(),
    sslCertificate: z.string().optional(),
  }).optional(),
  defaultLanguageCode: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enableMultiLanguageTraining: z.boolean().optional(),
  enableSpellCorrection: z.boolean().optional(),
  genAppBuilderSettings: z.object({
    engine: z.string().optional(),
  }).optional(),
  gitIntegrationSettings: z.object({
    githubSettings: z.object({
      accessToken: z.string().optional(),
      branches: z.array(z.string()).optional(),
      displayName: z.string().optional(),
      repositoryUri: z.string().optional(),
      trackingBranch: z.string().optional(),
    }).optional(),
  }).optional(),
  locked: z.boolean().optional(),
  name: z.string().optional(),
  personalizationSettings: z.object({
    defaultEndUserMetadata: z.record(z.string(), z.string()).optional(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  securitySettings: z.string().optional(),
  speechToTextSettings: z.object({
    enableSpeechAdaptation: z.boolean().optional(),
  }).optional(),
  startFlow: z.string().optional(),
  startPlaybook: z.string().optional(),
  supportedLanguageCodes: z.array(z.string()).optional(),
  textToSpeechSettings: z.object({
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        effectsProfileId: z.array(z.string()).optional(),
        pitch: z.number().optional(),
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
  timeZone: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string(),
    }),
    dtmfSettings: z.object({
      enabled: z.boolean(),
      endpointingTimeoutDuration: z.string(),
      finishDigit: z.string(),
      interdigitTimeoutDuration: z.string(),
      maxDigits: z.number(),
    }),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean(),
      enableInteractionLogging: z.boolean(),
      enableStackdriverLogging: z.boolean(),
    }),
    speechSettings: z.object({
      endpointerSensitivity: z.number(),
      models: z.record(z.string(), z.unknown()),
      noSpeechTimeout: z.string(),
      useTimeoutBasedEndpointing: z.boolean(),
    }),
  }).optional(),
  answerFeedbackSettings: z.object({
    enableAnswerFeedback: z.boolean(),
  }).optional(),
  avatarUri: z.string().optional(),
  clientCertificateSettings: z.object({
    passphrase: z.string(),
    privateKey: z.string(),
    sslCertificate: z.string(),
  }).optional(),
  defaultLanguageCode: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enableMultiLanguageTraining: z.boolean().optional(),
  enableSpellCorrection: z.boolean().optional(),
  enableStackdriverLogging: z.boolean().optional(),
  genAppBuilderSettings: z.object({
    engine: z.string(),
  }).optional(),
  gitIntegrationSettings: z.object({
    githubSettings: z.object({
      accessToken: z.string(),
      branches: z.array(z.string()),
      displayName: z.string(),
      repositoryUri: z.string(),
      trackingBranch: z.string(),
    }),
  }).optional(),
  locked: z.boolean().optional(),
  name: z.string(),
  personalizationSettings: z.object({
    defaultEndUserMetadata: z.record(z.string(), z.unknown()),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  securitySettings: z.string().optional(),
  speechToTextSettings: z.object({
    enableSpeechAdaptation: z.boolean(),
  }).optional(),
  startFlow: z.string().optional(),
  startPlaybook: z.string().optional(),
  supportedLanguageCodes: z.array(z.string()).optional(),
  textToSpeechSettings: z.object({
    synthesizeSpeechConfigs: z.record(z.string(), z.unknown()),
  }).optional(),
  timeZone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  answerFeedbackSettings: z.object({
    enableAnswerFeedback: z.boolean().optional(),
  }).optional(),
  avatarUri: z.string().optional(),
  clientCertificateSettings: z.object({
    passphrase: z.string().optional(),
    privateKey: z.string().optional(),
    sslCertificate: z.string().optional(),
  }).optional(),
  defaultLanguageCode: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enableMultiLanguageTraining: z.boolean().optional(),
  enableSpellCorrection: z.boolean().optional(),
  genAppBuilderSettings: z.object({
    engine: z.string().optional(),
  }).optional(),
  gitIntegrationSettings: z.object({
    githubSettings: z.object({
      accessToken: z.string().optional(),
      branches: z.array(z.string()).optional(),
      displayName: z.string().optional(),
      repositoryUri: z.string().optional(),
      trackingBranch: z.string().optional(),
    }).optional(),
  }).optional(),
  locked: z.boolean().optional(),
  name: z.string().optional(),
  personalizationSettings: z.object({
    defaultEndUserMetadata: z.record(z.string(), z.string()).optional(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  securitySettings: z.string().optional(),
  speechToTextSettings: z.object({
    enableSpeechAdaptation: z.boolean().optional(),
  }).optional(),
  startFlow: z.string().optional(),
  startPlaybook: z.string().optional(),
  supportedLanguageCodes: z.array(z.string()).optional(),
  textToSpeechSettings: z.object({
    synthesizeSpeechConfigs: z.record(
      z.string(),
      z.object({
        effectsProfileId: z.array(z.string()).optional(),
        pitch: z.number().optional(),
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
  timeZone: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents. Registered at `@swamp/gcp/dialogflow/agents`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents",
  version: "2026.05.24.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["answerFeedbackSettings"] !== undefined) {
          body["answerFeedbackSettings"] = g["answerFeedbackSettings"];
        }
        if (g["avatarUri"] !== undefined) body["avatarUri"] = g["avatarUri"];
        if (g["clientCertificateSettings"] !== undefined) {
          body["clientCertificateSettings"] = g["clientCertificateSettings"];
        }
        if (g["defaultLanguageCode"] !== undefined) {
          body["defaultLanguageCode"] = g["defaultLanguageCode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableMultiLanguageTraining"] !== undefined) {
          body["enableMultiLanguageTraining"] =
            g["enableMultiLanguageTraining"];
        }
        if (g["enableSpellCorrection"] !== undefined) {
          body["enableSpellCorrection"] = g["enableSpellCorrection"];
        }
        if (g["genAppBuilderSettings"] !== undefined) {
          body["genAppBuilderSettings"] = g["genAppBuilderSettings"];
        }
        if (g["gitIntegrationSettings"] !== undefined) {
          body["gitIntegrationSettings"] = g["gitIntegrationSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["personalizationSettings"] !== undefined) {
          body["personalizationSettings"] = g["personalizationSettings"];
        }
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["securitySettings"] !== undefined) {
          body["securitySettings"] = g["securitySettings"];
        }
        if (g["speechToTextSettings"] !== undefined) {
          body["speechToTextSettings"] = g["speechToTextSettings"];
        }
        if (g["startFlow"] !== undefined) body["startFlow"] = g["startFlow"];
        if (g["startPlaybook"] !== undefined) {
          body["startPlaybook"] = g["startPlaybook"];
        }
        if (g["supportedLanguageCodes"] !== undefined) {
          body["supportedLanguageCodes"] = g["supportedLanguageCodes"];
        }
        if (g["textToSpeechSettings"] !== undefined) {
          body["textToSpeechSettings"] = g["textToSpeechSettings"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
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
      description: "Get a agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Update agents attributes",
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
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["answerFeedbackSettings"] !== undefined) {
          body["answerFeedbackSettings"] = g["answerFeedbackSettings"];
        }
        if (g["avatarUri"] !== undefined) body["avatarUri"] = g["avatarUri"];
        if (g["clientCertificateSettings"] !== undefined) {
          body["clientCertificateSettings"] = g["clientCertificateSettings"];
        }
        if (g["defaultLanguageCode"] !== undefined) {
          body["defaultLanguageCode"] = g["defaultLanguageCode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableMultiLanguageTraining"] !== undefined) {
          body["enableMultiLanguageTraining"] =
            g["enableMultiLanguageTraining"];
        }
        if (g["enableSpellCorrection"] !== undefined) {
          body["enableSpellCorrection"] = g["enableSpellCorrection"];
        }
        if (g["genAppBuilderSettings"] !== undefined) {
          body["genAppBuilderSettings"] = g["genAppBuilderSettings"];
        }
        if (g["gitIntegrationSettings"] !== undefined) {
          body["gitIntegrationSettings"] = g["gitIntegrationSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["personalizationSettings"] !== undefined) {
          body["personalizationSettings"] = g["personalizationSettings"];
        }
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["securitySettings"] !== undefined) {
          body["securitySettings"] = g["securitySettings"];
        }
        if (g["speechToTextSettings"] !== undefined) {
          body["speechToTextSettings"] = g["speechToTextSettings"];
        }
        if (g["startFlow"] !== undefined) body["startFlow"] = g["startFlow"];
        if (g["startPlaybook"] !== undefined) {
          body["startPlaybook"] = g["startPlaybook"];
        }
        if (g["supportedLanguageCodes"] !== undefined) {
          body["supportedLanguageCodes"] = g["supportedLanguageCodes"];
        }
        if (g["textToSpeechSettings"] !== undefined) {
          body["textToSpeechSettings"] = g["textToSpeechSettings"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
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
      description: "Delete the agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Sync agents state from GCP",
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
    export: {
      description: "export",
      arguments: z.object({
        agentUri: z.any().optional(),
        dataFormat: z.any().optional(),
        environment: z.any().optional(),
        gitDestination: z.any().optional(),
        includeBigqueryExportSettings: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["agentUri"] !== undefined) body["agentUri"] = args["agentUri"];
        if (args["dataFormat"] !== undefined) {
          body["dataFormat"] = args["dataFormat"];
        }
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        if (args["gitDestination"] !== undefined) {
          body["gitDestination"] = args["gitDestination"];
        }
        if (args["includeBigqueryExportSettings"] !== undefined) {
          body["includeBigqueryExportSettings"] =
            args["includeBigqueryExportSettings"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.export",
            "path": "v3/{+name}:export",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_generative_settings: {
      description: "get generative settings",
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
            "id": "dialogflow.projects.locations.agents.getGenerativeSettings",
            "path": "v3/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "languageCode": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_validation_result: {
      description: "get validation result",
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
            "id": "dialogflow.projects.locations.agents.getValidationResult",
            "path": "v3/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "languageCode": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        agentContent: z.any().optional(),
        agentUri: z.any().optional(),
        gitSource: z.any().optional(),
        restoreOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["agentContent"] !== undefined) {
          body["agentContent"] = args["agentContent"];
        }
        if (args["agentUri"] !== undefined) body["agentUri"] = args["agentUri"];
        if (args["gitSource"] !== undefined) {
          body["gitSource"] = args["gitSource"];
        }
        if (args["restoreOption"] !== undefined) {
          body["restoreOption"] = args["restoreOption"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.restore",
            "path": "v3/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_generative_settings: {
      description: "update generative settings",
      arguments: z.object({
        fallbackSettings: z.any().optional(),
        generativeSafetySettings: z.any().optional(),
        knowledgeConnectorSettings: z.any().optional(),
        languageCode: z.any().optional(),
        llmModelSettings: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["fallbackSettings"] !== undefined) {
          body["fallbackSettings"] = args["fallbackSettings"];
        }
        if (args["generativeSafetySettings"] !== undefined) {
          body["generativeSafetySettings"] = args["generativeSafetySettings"];
        }
        if (args["knowledgeConnectorSettings"] !== undefined) {
          body["knowledgeConnectorSettings"] =
            args["knowledgeConnectorSettings"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["llmModelSettings"] !== undefined) {
          body["llmModelSettings"] = args["llmModelSettings"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.updateGenerativeSettings",
            "path": "v3/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    validate: {
      description: "validate",
      arguments: z.object({
        languageCode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.validate",
            "path": "v3/{+name}:validate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
