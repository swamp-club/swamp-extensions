// Auto-generated extension model for @swamp/gcp/aiplatform/locations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Locations.
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

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.get",
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

/** Swamp extension model for Google Cloud Agent Platform Locations. Registered at `@swamp/gcp/aiplatform/locations`. */
export const model = {
  type: "@swamp/gcp/aiplatform/locations",
  version: "2026.05.20.1",
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
      toVersion: "2026.05.02.1",
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
    ask_contexts: {
      description: "ask contexts",
      arguments: z.object({
        query: z.any().optional(),
        tools: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.askContexts",
            "path": "v1/{+parent}:askContexts",
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
    async_retrieve_contexts: {
      description: "async retrieve contexts",
      arguments: z.object({
        query: z.any().optional(),
        tools: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.asyncRetrieveContexts",
            "path": "v1/{+parent}:asyncRetrieveContexts",
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
    augment_prompt: {
      description: "augment prompt",
      arguments: z.object({
        contents: z.any().optional(),
        model: z.any().optional(),
        vertexRagStore: z.any().optional(),
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
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["vertexRagStore"] !== undefined) {
          body["vertexRagStore"] = args["vertexRagStore"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.augmentPrompt",
            "path": "v1/{+parent}:augmentPrompt",
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
    corroborate_content: {
      description: "corroborate content",
      arguments: z.object({
        content: z.any().optional(),
        facts: z.any().optional(),
        parameters: z.any().optional(),
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
        if (args["facts"] !== undefined) body["facts"] = args["facts"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.corroborateContent",
            "path": "v1/{+parent}:corroborateContent",
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
    deploy: {
      description: "deploy",
      arguments: z.object({
        deployConfig: z.any().optional(),
        endpointConfig: z.any().optional(),
        huggingFaceModelId: z.any().optional(),
        modelConfig: z.any().optional(),
        publisherModelName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["destination"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deployConfig"] !== undefined) {
          body["deployConfig"] = args["deployConfig"];
        }
        if (args["endpointConfig"] !== undefined) {
          body["endpointConfig"] = args["endpointConfig"];
        }
        if (args["huggingFaceModelId"] !== undefined) {
          body["huggingFaceModelId"] = args["huggingFaceModelId"];
        }
        if (args["modelConfig"] !== undefined) {
          body["modelConfig"] = args["modelConfig"];
        }
        if (args["publisherModelName"] !== undefined) {
          body["publisherModelName"] = args["publisherModelName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.deploy",
            "path": "v1/{+destination}:deploy",
            "httpMethod": "POST",
            "parameterOrder": ["destination"],
            "parameters": {
              "destination": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    evaluate_dataset: {
      description: "evaluate dataset",
      arguments: z.object({
        autoraterConfig: z.any().optional(),
        dataset: z.any().optional(),
        location: z.any().optional(),
        metrics: z.any().optional(),
        outputConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["location"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["autoraterConfig"] !== undefined) {
          body["autoraterConfig"] = args["autoraterConfig"];
        }
        if (args["dataset"] !== undefined) body["dataset"] = args["dataset"];
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["metrics"] !== undefined) body["metrics"] = args["metrics"];
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.evaluateDataset",
            "path": "v1/{+location}:evaluateDataset",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    evaluate_instances: {
      description: "evaluate instances",
      arguments: z.object({
        autoraterConfig: z.any().optional(),
        bleuInput: z.any().optional(),
        coherenceInput: z.any().optional(),
        cometInput: z.any().optional(),
        exactMatchInput: z.any().optional(),
        fluencyInput: z.any().optional(),
        fulfillmentInput: z.any().optional(),
        groundednessInput: z.any().optional(),
        instance: z.any().optional(),
        location: z.any().optional(),
        metricSources: z.any().optional(),
        metrics: z.any().optional(),
        metricxInput: z.any().optional(),
        pairwiseMetricInput: z.any().optional(),
        pairwiseQuestionAnsweringQualityInput: z.any().optional(),
        pairwiseSummarizationQualityInput: z.any().optional(),
        pointwiseMetricInput: z.any().optional(),
        questionAnsweringCorrectnessInput: z.any().optional(),
        questionAnsweringHelpfulnessInput: z.any().optional(),
        questionAnsweringQualityInput: z.any().optional(),
        questionAnsweringRelevanceInput: z.any().optional(),
        rougeInput: z.any().optional(),
        rubricBasedInstructionFollowingInput: z.any().optional(),
        safetyInput: z.any().optional(),
        summarizationHelpfulnessInput: z.any().optional(),
        summarizationQualityInput: z.any().optional(),
        summarizationVerbosityInput: z.any().optional(),
        toolCallValidInput: z.any().optional(),
        toolNameMatchInput: z.any().optional(),
        toolParameterKeyMatchInput: z.any().optional(),
        toolParameterKvMatchInput: z.any().optional(),
        trajectoryAnyOrderMatchInput: z.any().optional(),
        trajectoryExactMatchInput: z.any().optional(),
        trajectoryInOrderMatchInput: z.any().optional(),
        trajectoryPrecisionInput: z.any().optional(),
        trajectoryRecallInput: z.any().optional(),
        trajectorySingleToolUseInput: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["location"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["autoraterConfig"] !== undefined) {
          body["autoraterConfig"] = args["autoraterConfig"];
        }
        if (args["bleuInput"] !== undefined) {
          body["bleuInput"] = args["bleuInput"];
        }
        if (args["coherenceInput"] !== undefined) {
          body["coherenceInput"] = args["coherenceInput"];
        }
        if (args["cometInput"] !== undefined) {
          body["cometInput"] = args["cometInput"];
        }
        if (args["exactMatchInput"] !== undefined) {
          body["exactMatchInput"] = args["exactMatchInput"];
        }
        if (args["fluencyInput"] !== undefined) {
          body["fluencyInput"] = args["fluencyInput"];
        }
        if (args["fulfillmentInput"] !== undefined) {
          body["fulfillmentInput"] = args["fulfillmentInput"];
        }
        if (args["groundednessInput"] !== undefined) {
          body["groundednessInput"] = args["groundednessInput"];
        }
        if (args["instance"] !== undefined) body["instance"] = args["instance"];
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["metricSources"] !== undefined) {
          body["metricSources"] = args["metricSources"];
        }
        if (args["metrics"] !== undefined) body["metrics"] = args["metrics"];
        if (args["metricxInput"] !== undefined) {
          body["metricxInput"] = args["metricxInput"];
        }
        if (args["pairwiseMetricInput"] !== undefined) {
          body["pairwiseMetricInput"] = args["pairwiseMetricInput"];
        }
        if (args["pairwiseQuestionAnsweringQualityInput"] !== undefined) {
          body["pairwiseQuestionAnsweringQualityInput"] =
            args["pairwiseQuestionAnsweringQualityInput"];
        }
        if (args["pairwiseSummarizationQualityInput"] !== undefined) {
          body["pairwiseSummarizationQualityInput"] =
            args["pairwiseSummarizationQualityInput"];
        }
        if (args["pointwiseMetricInput"] !== undefined) {
          body["pointwiseMetricInput"] = args["pointwiseMetricInput"];
        }
        if (args["questionAnsweringCorrectnessInput"] !== undefined) {
          body["questionAnsweringCorrectnessInput"] =
            args["questionAnsweringCorrectnessInput"];
        }
        if (args["questionAnsweringHelpfulnessInput"] !== undefined) {
          body["questionAnsweringHelpfulnessInput"] =
            args["questionAnsweringHelpfulnessInput"];
        }
        if (args["questionAnsweringQualityInput"] !== undefined) {
          body["questionAnsweringQualityInput"] =
            args["questionAnsweringQualityInput"];
        }
        if (args["questionAnsweringRelevanceInput"] !== undefined) {
          body["questionAnsweringRelevanceInput"] =
            args["questionAnsweringRelevanceInput"];
        }
        if (args["rougeInput"] !== undefined) {
          body["rougeInput"] = args["rougeInput"];
        }
        if (args["rubricBasedInstructionFollowingInput"] !== undefined) {
          body["rubricBasedInstructionFollowingInput"] =
            args["rubricBasedInstructionFollowingInput"];
        }
        if (args["safetyInput"] !== undefined) {
          body["safetyInput"] = args["safetyInput"];
        }
        if (args["summarizationHelpfulnessInput"] !== undefined) {
          body["summarizationHelpfulnessInput"] =
            args["summarizationHelpfulnessInput"];
        }
        if (args["summarizationQualityInput"] !== undefined) {
          body["summarizationQualityInput"] = args["summarizationQualityInput"];
        }
        if (args["summarizationVerbosityInput"] !== undefined) {
          body["summarizationVerbosityInput"] =
            args["summarizationVerbosityInput"];
        }
        if (args["toolCallValidInput"] !== undefined) {
          body["toolCallValidInput"] = args["toolCallValidInput"];
        }
        if (args["toolNameMatchInput"] !== undefined) {
          body["toolNameMatchInput"] = args["toolNameMatchInput"];
        }
        if (args["toolParameterKeyMatchInput"] !== undefined) {
          body["toolParameterKeyMatchInput"] =
            args["toolParameterKeyMatchInput"];
        }
        if (args["toolParameterKvMatchInput"] !== undefined) {
          body["toolParameterKvMatchInput"] = args["toolParameterKvMatchInput"];
        }
        if (args["trajectoryAnyOrderMatchInput"] !== undefined) {
          body["trajectoryAnyOrderMatchInput"] =
            args["trajectoryAnyOrderMatchInput"];
        }
        if (args["trajectoryExactMatchInput"] !== undefined) {
          body["trajectoryExactMatchInput"] = args["trajectoryExactMatchInput"];
        }
        if (args["trajectoryInOrderMatchInput"] !== undefined) {
          body["trajectoryInOrderMatchInput"] =
            args["trajectoryInOrderMatchInput"];
        }
        if (args["trajectoryPrecisionInput"] !== undefined) {
          body["trajectoryPrecisionInput"] = args["trajectoryPrecisionInput"];
        }
        if (args["trajectoryRecallInput"] !== undefined) {
          body["trajectoryRecallInput"] = args["trajectoryRecallInput"];
        }
        if (args["trajectorySingleToolUseInput"] !== undefined) {
          body["trajectorySingleToolUseInput"] =
            args["trajectorySingleToolUseInput"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.evaluateInstances",
            "path": "v1/{+location}:evaluateInstances",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_instance_rubrics: {
      description: "generate instance rubrics",
      arguments: z.object({
        agentConfig: z.any().optional(),
        contents: z.any().optional(),
        location: z.any().optional(),
        metricResourceName: z.any().optional(),
        predefinedRubricGenerationSpec: z.any().optional(),
        rubricGenerationSpec: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["location"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["agentConfig"] !== undefined) {
          body["agentConfig"] = args["agentConfig"];
        }
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["metricResourceName"] !== undefined) {
          body["metricResourceName"] = args["metricResourceName"];
        }
        if (args["predefinedRubricGenerationSpec"] !== undefined) {
          body["predefinedRubricGenerationSpec"] =
            args["predefinedRubricGenerationSpec"];
        }
        if (args["rubricGenerationSpec"] !== undefined) {
          body["rubricGenerationSpec"] = args["rubricGenerationSpec"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.generateInstanceRubrics",
            "path": "v1/{+location}:generateInstanceRubrics",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_synthetic_data: {
      description: "generate synthetic data",
      arguments: z.object({
        count: z.any().optional(),
        examples: z.any().optional(),
        outputFieldSpecs: z.any().optional(),
        taskDescription: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["location"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["count"] !== undefined) body["count"] = args["count"];
        if (args["examples"] !== undefined) body["examples"] = args["examples"];
        if (args["outputFieldSpecs"] !== undefined) {
          body["outputFieldSpecs"] = args["outputFieldSpecs"];
        }
        if (args["taskDescription"] !== undefined) {
          body["taskDescription"] = args["taskDescription"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.generateSyntheticData",
            "path": "v1/{+location}:generateSyntheticData",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_rag_engine_config: {
      description: "get rag engine config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.getRagEngineConfig",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    retrieve_contexts: {
      description: "retrieve contexts",
      arguments: z.object({
        query: z.any().optional(),
        vertexRagStore: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["vertexRagStore"] !== undefined) {
          body["vertexRagStore"] = args["vertexRagStore"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.retrieveContexts",
            "path": "v1/{+parent}:retrieveContexts",
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
    update_rag_engine_config: {
      description: "update rag engine config",
      arguments: z.object({
        name: z.any().optional(),
        ragManagedDbConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["ragManagedDbConfig"] !== undefined) {
          body["ragManagedDbConfig"] = args["ragManagedDbConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.updateRagEngineConfig",
            "path": "v1/{+name}",
            "httpMethod": "PATCH",
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
