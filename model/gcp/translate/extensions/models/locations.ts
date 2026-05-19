// Auto-generated extension model for @swamp/gcp/translate/locations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Translation Locations.
 *
 * A resource that represents a Google Cloud location.
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

const BASE_URL = "https://translation.googleapis.com/";

const GET_CONFIG = {
  "id": "translate.projects.locations.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  locationId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Translation Locations. Registered at `@swamp/gcp/translate/locations`. */
export const model = {
  type: "@swamp/gcp/translate/locations",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A resource that represents a Google Cloud location.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a locations",
      arguments: z.object({
        identifier: z.string().describe("The name of the locations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Sync locations state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
    adaptive_mt_translate: {
      description: "adaptive mt translate",
      arguments: z.object({
        content: z.any().optional(),
        dataset: z.any().optional(),
        glossaryConfig: z.any().optional(),
        referenceSentenceConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["dataset"] !== undefined) body["dataset"] = args["dataset"];
        if (args["glossaryConfig"] !== undefined) {
          body["glossaryConfig"] = args["glossaryConfig"];
        }
        if (args["referenceSentenceConfig"] !== undefined) {
          body["referenceSentenceConfig"] = args["referenceSentenceConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.adaptiveMtTranslate",
            "path": "v3/{+parent}:adaptiveMtTranslate",
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
    batch_translate_document: {
      description: "batch translate document",
      arguments: z.object({
        customizedAttribution: z.any().optional(),
        enableRotationCorrection: z.any().optional(),
        enableShadowRemovalNativePdf: z.any().optional(),
        formatConversions: z.any().optional(),
        glossaries: z.any().optional(),
        inputConfigs: z.any().optional(),
        models: z.any().optional(),
        outputConfig: z.any().optional(),
        pdfNativeOnly: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
        targetLanguageCodes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["customizedAttribution"] !== undefined) {
          body["customizedAttribution"] = args["customizedAttribution"];
        }
        if (args["enableRotationCorrection"] !== undefined) {
          body["enableRotationCorrection"] = args["enableRotationCorrection"];
        }
        if (args["enableShadowRemovalNativePdf"] !== undefined) {
          body["enableShadowRemovalNativePdf"] =
            args["enableShadowRemovalNativePdf"];
        }
        if (args["formatConversions"] !== undefined) {
          body["formatConversions"] = args["formatConversions"];
        }
        if (args["glossaries"] !== undefined) {
          body["glossaries"] = args["glossaries"];
        }
        if (args["inputConfigs"] !== undefined) {
          body["inputConfigs"] = args["inputConfigs"];
        }
        if (args["models"] !== undefined) body["models"] = args["models"];
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        if (args["pdfNativeOnly"] !== undefined) {
          body["pdfNativeOnly"] = args["pdfNativeOnly"];
        }
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        if (args["targetLanguageCodes"] !== undefined) {
          body["targetLanguageCodes"] = args["targetLanguageCodes"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.batchTranslateDocument",
            "path": "v3/{+parent}:batchTranslateDocument",
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
    batch_translate_text: {
      description: "batch translate text",
      arguments: z.object({
        glossaries: z.any().optional(),
        inputConfigs: z.any().optional(),
        labels: z.any().optional(),
        models: z.any().optional(),
        outputConfig: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
        targetLanguageCodes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["glossaries"] !== undefined) {
          body["glossaries"] = args["glossaries"];
        }
        if (args["inputConfigs"] !== undefined) {
          body["inputConfigs"] = args["inputConfigs"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["models"] !== undefined) body["models"] = args["models"];
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        if (args["targetLanguageCodes"] !== undefined) {
          body["targetLanguageCodes"] = args["targetLanguageCodes"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.batchTranslateText",
            "path": "v3/{+parent}:batchTranslateText",
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
    detect_language: {
      description: "detect language",
      arguments: z.object({
        content: z.any().optional(),
        documentInputConfig: z.any().optional(),
        labels: z.any().optional(),
        mimeType: z.any().optional(),
        model: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["documentInputConfig"] !== undefined) {
          body["documentInputConfig"] = args["documentInputConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["mimeType"] !== undefined) body["mimeType"] = args["mimeType"];
        if (args["model"] !== undefined) body["model"] = args["model"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.detectLanguage",
            "path": "v3/{+parent}:detectLanguage",
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
    get_supported_languages: {
      description: "get supported languages",
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
            "id": "translate.projects.locations.getSupportedLanguages",
            "path": "v3/{+parent}/supportedLanguages",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "displayLanguageCode": { "location": "query" },
              "model": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    refine_text: {
      description: "refine text",
      arguments: z.object({
        refinementEntries: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
        targetLanguageCode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["refinementEntries"] !== undefined) {
          body["refinementEntries"] = args["refinementEntries"];
        }
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        if (args["targetLanguageCode"] !== undefined) {
          body["targetLanguageCode"] = args["targetLanguageCode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.refineText",
            "path": "v3/{+parent}:refineText",
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
    romanize_text: {
      description: "romanize text",
      arguments: z.object({
        contents: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.romanizeText",
            "path": "v3/{+parent}:romanizeText",
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
    translate_document: {
      description: "translate document",
      arguments: z.object({
        customizedAttribution: z.any().optional(),
        documentInputConfig: z.any().optional(),
        documentOutputConfig: z.any().optional(),
        enableRotationCorrection: z.any().optional(),
        enableShadowRemovalNativePdf: z.any().optional(),
        glossaryConfig: z.any().optional(),
        isTranslateNativePdfOnly: z.any().optional(),
        labels: z.any().optional(),
        model: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
        targetLanguageCode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["customizedAttribution"] !== undefined) {
          body["customizedAttribution"] = args["customizedAttribution"];
        }
        if (args["documentInputConfig"] !== undefined) {
          body["documentInputConfig"] = args["documentInputConfig"];
        }
        if (args["documentOutputConfig"] !== undefined) {
          body["documentOutputConfig"] = args["documentOutputConfig"];
        }
        if (args["enableRotationCorrection"] !== undefined) {
          body["enableRotationCorrection"] = args["enableRotationCorrection"];
        }
        if (args["enableShadowRemovalNativePdf"] !== undefined) {
          body["enableShadowRemovalNativePdf"] =
            args["enableShadowRemovalNativePdf"];
        }
        if (args["glossaryConfig"] !== undefined) {
          body["glossaryConfig"] = args["glossaryConfig"];
        }
        if (args["isTranslateNativePdfOnly"] !== undefined) {
          body["isTranslateNativePdfOnly"] = args["isTranslateNativePdfOnly"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        if (args["targetLanguageCode"] !== undefined) {
          body["targetLanguageCode"] = args["targetLanguageCode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.translateDocument",
            "path": "v3/{+parent}:translateDocument",
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
    translate_text: {
      description: "translate text",
      arguments: z.object({
        contents: z.any().optional(),
        glossaryConfig: z.any().optional(),
        labels: z.any().optional(),
        mimeType: z.any().optional(),
        model: z.any().optional(),
        sourceLanguageCode: z.any().optional(),
        targetLanguageCode: z.any().optional(),
        transliterationConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["glossaryConfig"] !== undefined) {
          body["glossaryConfig"] = args["glossaryConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["mimeType"] !== undefined) body["mimeType"] = args["mimeType"];
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["sourceLanguageCode"] !== undefined) {
          body["sourceLanguageCode"] = args["sourceLanguageCode"];
        }
        if (args["targetLanguageCode"] !== undefined) {
          body["targetLanguageCode"] = args["targetLanguageCode"];
        }
        if (args["transliterationConfig"] !== undefined) {
          body["transliterationConfig"] = args["transliterationConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "translate.projects.locations.translateText",
            "path": "v3/{+parent}:translateText",
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
