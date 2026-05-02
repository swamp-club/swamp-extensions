// Auto-generated extension model for @swamp/gcp/aiplatform/publishers-models
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Publishers.Models.
 *
 * A Model Garden Publisher Model.
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
  "id": "aiplatform.publishers.models.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "huggingFaceToken": {
      "location": "query",
    },
    "isHuggingFaceModel": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  frameworks: z.array(z.string()).optional(),
  launchStage: z.string().optional(),
  name: z.string(),
  openSourceCategory: z.string().optional(),
  predictSchemata: z.object({
    instanceSchemaUri: z.string(),
    parametersSchemaUri: z.string(),
    predictionSchemaUri: z.string(),
  }).optional(),
  publisherModelTemplate: z.string().optional(),
  supportedActions: z.object({
    createApplication: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    deploy: z.object({
      artifactUri: z.string(),
      automaticResources: z.object({
        maxReplicaCount: z.number(),
        minReplicaCount: z.number(),
      }),
      containerSpec: z.object({
        args: z.array(z.string()),
        command: z.array(z.string()),
        deploymentTimeout: z.string(),
        env: z.array(z.object({
          name: z.unknown(),
          value: z.unknown(),
        })),
        grpcPorts: z.array(z.object({
          containerPort: z.unknown(),
        })),
        healthProbe: z.object({
          exec: z.object({
            command: z.unknown(),
          }),
          failureThreshold: z.number(),
          grpc: z.object({
            port: z.unknown(),
            service: z.unknown(),
          }),
          httpGet: z.object({
            host: z.unknown(),
            httpHeaders: z.unknown(),
            path: z.unknown(),
            port: z.unknown(),
            scheme: z.unknown(),
          }),
          initialDelaySeconds: z.number(),
          periodSeconds: z.number(),
          successThreshold: z.number(),
          tcpSocket: z.object({
            host: z.unknown(),
            port: z.unknown(),
          }),
          timeoutSeconds: z.number(),
        }),
        healthRoute: z.string(),
        imageUri: z.string(),
        invokeRoutePrefix: z.string(),
        livenessProbe: z.object({
          exec: z.object({
            command: z.unknown(),
          }),
          failureThreshold: z.number(),
          grpc: z.object({
            port: z.unknown(),
            service: z.unknown(),
          }),
          httpGet: z.object({
            host: z.unknown(),
            httpHeaders: z.unknown(),
            path: z.unknown(),
            port: z.unknown(),
            scheme: z.unknown(),
          }),
          initialDelaySeconds: z.number(),
          periodSeconds: z.number(),
          successThreshold: z.number(),
          tcpSocket: z.object({
            host: z.unknown(),
            port: z.unknown(),
          }),
          timeoutSeconds: z.number(),
        }),
        ports: z.array(z.object({
          containerPort: z.unknown(),
        })),
        predictRoute: z.string(),
        sharedMemorySizeMb: z.string(),
        startupProbe: z.object({
          exec: z.object({
            command: z.unknown(),
          }),
          failureThreshold: z.number(),
          grpc: z.object({
            port: z.unknown(),
            service: z.unknown(),
          }),
          httpGet: z.object({
            host: z.unknown(),
            httpHeaders: z.unknown(),
            path: z.unknown(),
            port: z.unknown(),
            scheme: z.unknown(),
          }),
          initialDelaySeconds: z.number(),
          periodSeconds: z.number(),
          successThreshold: z.number(),
          tcpSocket: z.object({
            host: z.unknown(),
            port: z.unknown(),
          }),
          timeoutSeconds: z.number(),
        }),
      }),
      dedicatedResources: z.object({
        autoscalingMetricSpecs: z.array(z.object({
          metricName: z.unknown(),
          target: z.unknown(),
        })),
        machineSpec: z.object({
          acceleratorCount: z.number(),
          acceleratorType: z.string(),
          gpuPartitionSize: z.string(),
          machineType: z.string(),
          reservationAffinity: z.object({
            key: z.unknown(),
            reservationAffinityType: z.unknown(),
            values: z.unknown(),
          }),
          tpuTopology: z.string(),
        }),
        maxReplicaCount: z.number(),
        minReplicaCount: z.number(),
        requiredReplicaCount: z.number(),
        spot: z.boolean(),
      }),
      deployMetadata: z.object({
        labels: z.record(z.string(), z.unknown()),
        sampleRequest: z.string(),
      }),
      deployTaskName: z.string(),
      largeModelReference: z.object({
        name: z.string(),
      }),
      modelDisplayName: z.string(),
      publicArtifactUri: z.string(),
      sharedResources: z.string(),
      title: z.string(),
    }),
    deployGke: z.object({
      gkeYamlConfigs: z.array(z.string()),
    }),
    multiDeployVertex: z.object({
      multiDeployVertex: z.array(z.object({
        artifactUri: z.string(),
        automaticResources: z.object({
          maxReplicaCount: z.unknown(),
          minReplicaCount: z.unknown(),
        }),
        containerSpec: z.object({
          args: z.unknown(),
          command: z.unknown(),
          deploymentTimeout: z.unknown(),
          env: z.unknown(),
          grpcPorts: z.unknown(),
          healthProbe: z.unknown(),
          healthRoute: z.unknown(),
          imageUri: z.unknown(),
          invokeRoutePrefix: z.unknown(),
          livenessProbe: z.unknown(),
          ports: z.unknown(),
          predictRoute: z.unknown(),
          sharedMemorySizeMb: z.unknown(),
          startupProbe: z.unknown(),
        }),
        dedicatedResources: z.object({
          autoscalingMetricSpecs: z.unknown(),
          machineSpec: z.unknown(),
          maxReplicaCount: z.unknown(),
          minReplicaCount: z.unknown(),
          requiredReplicaCount: z.unknown(),
          spot: z.unknown(),
        }),
        deployMetadata: z.object({
          labels: z.unknown(),
          sampleRequest: z.unknown(),
        }),
        deployTaskName: z.string(),
        largeModelReference: z.object({
          name: z.unknown(),
        }),
        modelDisplayName: z.string(),
        publicArtifactUri: z.string(),
        sharedResources: z.string(),
        title: z.string(),
      })),
    }),
    openEvaluationPipeline: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    openFineTuningPipeline: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    openFineTuningPipelines: z.object({
      fineTuningPipelines: z.array(z.object({
        colabNotebookDisabled: z.boolean(),
        references: z.record(z.string(), z.unknown()),
        resourceDescription: z.string(),
        resourceTitle: z.string(),
        resourceUseCase: z.string(),
        supportsWorkbench: z.boolean(),
        title: z.string(),
      })),
    }),
    openGenerationAiStudio: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    openGenie: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    openNotebook: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    openNotebooks: z.object({
      notebooks: z.array(z.object({
        colabNotebookDisabled: z.boolean(),
        references: z.record(z.string(), z.unknown()),
        resourceDescription: z.string(),
        resourceTitle: z.string(),
        resourceUseCase: z.string(),
        supportsWorkbench: z.boolean(),
        title: z.string(),
      })),
    }),
    openPromptTuningPipeline: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    requestAccess: z.object({
      colabNotebookDisabled: z.boolean(),
      references: z.record(z.string(), z.unknown()),
      resourceDescription: z.string(),
      resourceTitle: z.string(),
      resourceUseCase: z.string(),
      supportsWorkbench: z.boolean(),
      title: z.string(),
    }),
    viewRestApi: z.object({
      documentations: z.array(z.object({
        content: z.string(),
        title: z.string(),
      })),
      title: z.string(),
    }),
  }).optional(),
  versionId: z.string().optional(),
  versionState: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Agent Platform Publishers.Models. Registered at `@swamp/gcp/aiplatform/publishers-models`. */
export const model = {
  type: "@swamp/gcp/aiplatform/publishers-models",
  version: "2026.05.02.1",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Model Garden Publisher Model.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a models",
      arguments: z.object({
        identifier: z.string().describe("The name of the models"),
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
      description: "Sync models state from GCP",
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
    compute_tokens: {
      description: "compute tokens",
      arguments: z.object({
        contents: z.any().optional(),
        instances: z.any().optional(),
        model: z.any().optional(),
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
        params["endpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["model"] !== undefined) body["model"] = args["model"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.computeTokens",
            "path": "v1/{+endpoint}:computeTokens",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    count_tokens: {
      description: "count tokens",
      arguments: z.object({
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        instances: z.any().optional(),
        model: z.any().optional(),
        systemInstruction: z.any().optional(),
        tools: z.any().optional(),
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
        params["endpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.countTokens",
            "path": "v1/{+endpoint}:countTokens",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetch_predict_operation: {
      description: "fetch predict operation",
      arguments: z.object({
        operationName: z.any().optional(),
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
        params["endpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.fetchPredictOperation",
            "path": "v1/{+endpoint}:fetchPredictOperation",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_content: {
      description: "generate content",
      arguments: z.object({
        cachedContent: z.any().optional(),
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        labels: z.any().optional(),
        modelArmorConfig: z.any().optional(),
        safetySettings: z.any().optional(),
        systemInstruction: z.any().optional(),
        toolConfig: z.any().optional(),
        tools: z.any().optional(),
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
        params["model"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cachedContent"] !== undefined) {
          body["cachedContent"] = args["cachedContent"];
        }
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["modelArmorConfig"] !== undefined) {
          body["modelArmorConfig"] = args["modelArmorConfig"];
        }
        if (args["safetySettings"] !== undefined) {
          body["safetySettings"] = args["safetySettings"];
        }
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["toolConfig"] !== undefined) {
          body["toolConfig"] = args["toolConfig"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.generateContent",
            "path": "v1/{+model}:generateContent",
            "httpMethod": "POST",
            "parameterOrder": ["model"],
            "parameters": { "model": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    predict: {
      description: "predict",
      arguments: z.object({
        instances: z.any().optional(),
        labels: z.any().optional(),
        parameters: z.any().optional(),
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
        params["endpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.predict",
            "path": "v1/{+endpoint}:predict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    predict_long_running: {
      description: "predict long running",
      arguments: z.object({
        instances: z.any().optional(),
        labels: z.any().optional(),
        parameters: z.any().optional(),
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
        params["endpoint"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.predictLongRunning",
            "path": "v1/{+endpoint}:predictLongRunning",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stream_generate_content: {
      description: "stream generate content",
      arguments: z.object({
        cachedContent: z.any().optional(),
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        labels: z.any().optional(),
        modelArmorConfig: z.any().optional(),
        safetySettings: z.any().optional(),
        systemInstruction: z.any().optional(),
        toolConfig: z.any().optional(),
        tools: z.any().optional(),
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
        params["model"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cachedContent"] !== undefined) {
          body["cachedContent"] = args["cachedContent"];
        }
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["modelArmorConfig"] !== undefined) {
          body["modelArmorConfig"] = args["modelArmorConfig"];
        }
        if (args["safetySettings"] !== undefined) {
          body["safetySettings"] = args["safetySettings"];
        }
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["toolConfig"] !== undefined) {
          body["toolConfig"] = args["toolConfig"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.publishers.models.streamGenerateContent",
            "path": "v1/{+model}:streamGenerateContent",
            "httpMethod": "POST",
            "parameterOrder": ["model"],
            "parameters": { "model": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
