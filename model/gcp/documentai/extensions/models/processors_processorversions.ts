// Auto-generated extension model for @swamp/gcp/documentai/processors-processorversions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Processors.ProcessorVersions.
 *
 * A processor version is an implementation of a processor. Each processor can have multiple versions, pretrained by Google internally or uptrained by the customer. A processor can only have one default version at a time. Its document-processing behavior is defined by that version.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/processorVersions/${shortName}`;
}

const BASE_URL = "https://documentai.googleapis.com/";

const GET_CONFIG = {
  "id": "documentai.projects.locations.processors.processorVersions.get",
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

const DELETE_CONFIG = {
  "id": "documentai.projects.locations.processors.processorVersions.delete",
  "path": "v1/{+name}",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deprecationInfo: z.object({
    deprecationTime: z.string(),
    replacementProcessorVersion: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  documentSchema: z.object({
    description: z.string(),
    displayName: z.string(),
    documentPrompt: z.string(),
    entityTypes: z.array(z.object({
      baseTypes: z.array(z.string()),
      displayName: z.string(),
      enumValues: z.object({
        values: z.array(z.unknown()),
      }),
      name: z.string(),
      properties: z.array(z.object({
        displayName: z.unknown(),
        method: z.unknown(),
        name: z.unknown(),
        occurrenceType: z.unknown(),
        valueType: z.unknown(),
      })),
    })),
    metadata: z.object({
      documentAllowMultipleLabels: z.boolean(),
      documentSplitter: z.boolean(),
      prefixedNamingOnProperties: z.boolean(),
      skipNamingValidation: z.boolean(),
    }),
  }).optional(),
  genAiModelInfo: z.object({
    customGenAiModelInfo: z.object({
      baseProcessorVersionId: z.string(),
      customModelType: z.string(),
    }),
    foundationGenAiModelInfo: z.object({
      finetuningAllowed: z.boolean(),
      minTrainLabeledDocuments: z.number(),
    }),
  }).optional(),
  googleManaged: z.boolean().optional(),
  kmsKeyName: z.string().optional(),
  kmsKeyVersionName: z.string().optional(),
  latestEvaluation: z.object({
    aggregateMetrics: z.object({
      f1Score: z.number(),
      falseNegativesCount: z.number(),
      falsePositivesCount: z.number(),
      groundTruthDocumentCount: z.number(),
      groundTruthOccurrencesCount: z.number(),
      precision: z.number(),
      predictedDocumentCount: z.number(),
      predictedOccurrencesCount: z.number(),
      recall: z.number(),
      totalDocumentsCount: z.number(),
      truePositivesCount: z.number(),
    }),
    aggregateMetricsExact: z.object({
      f1Score: z.number(),
      falseNegativesCount: z.number(),
      falsePositivesCount: z.number(),
      groundTruthDocumentCount: z.number(),
      groundTruthOccurrencesCount: z.number(),
      precision: z.number(),
      predictedDocumentCount: z.number(),
      predictedOccurrencesCount: z.number(),
      recall: z.number(),
      totalDocumentsCount: z.number(),
      truePositivesCount: z.number(),
    }),
    evaluation: z.string(),
    operation: z.string(),
  }).optional(),
  modelType: z.string().optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Document AI Processors.ProcessorVersions. Registered at `@swamp/gcp/documentai/processors-processorversions`. */
export const model = {
  type: "@swamp/gcp/documentai/processors-processorversions",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A processor version is an implementation of a processor. Each processor can h...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a processorVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the processorVersions"),
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
    delete: {
      description: "Delete the processorVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the processorVersions"),
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
      description: "Sync processorVersions state from GCP",
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
    batch_process: {
      description: "batch process",
      arguments: z.object({
        documentOutputConfig: z.any().optional(),
        inputDocuments: z.any().optional(),
        labels: z.any().optional(),
        processOptions: z.any().optional(),
        skipHumanReview: z.any().optional(),
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
        if (args["documentOutputConfig"] !== undefined) {
          body["documentOutputConfig"] = args["documentOutputConfig"];
        }
        if (args["inputDocuments"] !== undefined) {
          body["inputDocuments"] = args["inputDocuments"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["processOptions"] !== undefined) {
          body["processOptions"] = args["processOptions"];
        }
        if (args["skipHumanReview"] !== undefined) {
          body["skipHumanReview"] = args["skipHumanReview"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "documentai.projects.locations.processors.processorVersions.batchProcess",
            "path": "v1/{+name}:batchProcess",
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
    deploy: {
      description: "deploy",
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
            "id":
              "documentai.projects.locations.processors.processorVersions.deploy",
            "path": "v1/{+name}:deploy",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    evaluate_processor_version: {
      description: "evaluate processor version",
      arguments: z.object({
        evaluationDocuments: z.any().optional(),
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
        params["processorVersion"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["evaluationDocuments"] !== undefined) {
          body["evaluationDocuments"] = args["evaluationDocuments"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "documentai.projects.locations.processors.processorVersions.evaluateProcessorVersion",
            "path": "v1/{+processorVersion}:evaluateProcessorVersion",
            "httpMethod": "POST",
            "parameterOrder": ["processorVersion"],
            "parameters": {
              "processorVersion": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    process: {
      description: "process",
      arguments: z.object({
        fieldMask: z.any().optional(),
        gcsDocument: z.any().optional(),
        imagelessMode: z.any().optional(),
        inlineDocument: z.any().optional(),
        labels: z.any().optional(),
        processOptions: z.any().optional(),
        rawDocument: z.any().optional(),
        skipHumanReview: z.any().optional(),
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
        if (args["fieldMask"] !== undefined) {
          body["fieldMask"] = args["fieldMask"];
        }
        if (args["gcsDocument"] !== undefined) {
          body["gcsDocument"] = args["gcsDocument"];
        }
        if (args["imagelessMode"] !== undefined) {
          body["imagelessMode"] = args["imagelessMode"];
        }
        if (args["inlineDocument"] !== undefined) {
          body["inlineDocument"] = args["inlineDocument"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["processOptions"] !== undefined) {
          body["processOptions"] = args["processOptions"];
        }
        if (args["rawDocument"] !== undefined) {
          body["rawDocument"] = args["rawDocument"];
        }
        if (args["skipHumanReview"] !== undefined) {
          body["skipHumanReview"] = args["skipHumanReview"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "documentai.projects.locations.processors.processorVersions.process",
            "path": "v1/{+name}:process",
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
    train: {
      description: "train",
      arguments: z.object({
        baseProcessorVersion: z.any().optional(),
        customDocumentExtractionOptions: z.any().optional(),
        documentSchema: z.any().optional(),
        foundationModelTuningOptions: z.any().optional(),
        inputData: z.any().optional(),
        processorVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["baseProcessorVersion"] !== undefined) {
          body["baseProcessorVersion"] = args["baseProcessorVersion"];
        }
        if (args["customDocumentExtractionOptions"] !== undefined) {
          body["customDocumentExtractionOptions"] =
            args["customDocumentExtractionOptions"];
        }
        if (args["documentSchema"] !== undefined) {
          body["documentSchema"] = args["documentSchema"];
        }
        if (args["foundationModelTuningOptions"] !== undefined) {
          body["foundationModelTuningOptions"] =
            args["foundationModelTuningOptions"];
        }
        if (args["inputData"] !== undefined) {
          body["inputData"] = args["inputData"];
        }
        if (args["processorVersion"] !== undefined) {
          body["processorVersion"] = args["processorVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "documentai.projects.locations.processors.processorVersions.train",
            "path": "v1/{+parent}/processorVersions:train",
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
    undeploy: {
      description: "undeploy",
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
            "id":
              "documentai.projects.locations.processors.processorVersions.undeploy",
            "path": "v1/{+name}:undeploy",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
