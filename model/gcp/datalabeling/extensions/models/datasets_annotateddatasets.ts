// Auto-generated extension model for @swamp/gcp/datalabeling/datasets-annotateddatasets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Labeling Datasets.AnnotatedDatasets.
 *
 * AnnotatedDataset is a set holding annotations for data in a Dataset. Each labeling task will generate an AnnotatedDataset under the Dataset that the task is requested for.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/annotatedDatasets/${shortName}`;
}

const BASE_URL = "https://datalabeling.googleapis.com/";

const GET_CONFIG = {
  "id": "datalabeling.projects.datasets.annotatedDatasets.get",
  "path": "v1beta1/{+name}",
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
  "id": "datalabeling.projects.datasets.annotatedDatasets.delete",
  "path": "v1beta1/{+name}",
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
  annotationSource: z.string().optional(),
  annotationType: z.string().optional(),
  blockingResources: z.array(z.string()).optional(),
  completedExampleCount: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  exampleCount: z.string().optional(),
  labelStats: z.object({
    exampleCount: z.record(z.string(), z.unknown()),
  }).optional(),
  metadata: z.object({
    boundingPolyConfig: z.object({
      annotationSpecSet: z.string(),
      instructionMessage: z.string(),
    }),
    eventConfig: z.object({
      annotationSpecSets: z.array(z.string()),
      clipLength: z.number(),
      overlapLength: z.number(),
    }),
    humanAnnotationConfig: z.object({
      annotatedDatasetDescription: z.string(),
      annotatedDatasetDisplayName: z.string(),
      contributorEmails: z.array(z.string()),
      instruction: z.string(),
      labelGroup: z.string(),
      languageCode: z.string(),
      questionDuration: z.string(),
      replicaCount: z.number(),
      userEmailAddress: z.string(),
    }),
    imageClassificationConfig: z.object({
      allowMultiLabel: z.boolean(),
      annotationSpecSet: z.string(),
      answerAggregationType: z.string(),
    }),
    objectDetectionConfig: z.object({
      annotationSpecSet: z.string(),
      extractionFrameRate: z.number(),
    }),
    objectTrackingConfig: z.object({
      annotationSpecSet: z.string(),
      clipLength: z.number(),
      overlapLength: z.number(),
    }),
    polylineConfig: z.object({
      annotationSpecSet: z.string(),
      instructionMessage: z.string(),
    }),
    segmentationConfig: z.object({
      annotationSpecSet: z.string(),
      instructionMessage: z.string(),
    }),
    textClassificationConfig: z.object({
      allowMultiLabel: z.boolean(),
      annotationSpecSet: z.string(),
      sentimentConfig: z.object({
        enableLabelSentimentSelection: z.boolean(),
      }),
    }),
    textEntityExtractionConfig: z.object({
      annotationSpecSet: z.string(),
    }),
    videoClassificationConfig: z.object({
      annotationSpecSetConfigs: z.array(z.object({
        allowMultiLabel: z.boolean(),
        annotationSpecSet: z.string(),
      })),
      applyShotDetection: z.boolean(),
    }),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Labeling Datasets.AnnotatedDatasets. Registered at `@swamp/gcp/datalabeling/datasets-annotateddatasets`. */
export const model = {
  type: "@swamp/gcp/datalabeling/datasets-annotateddatasets",
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
        "AnnotatedDataset is a set holding annotations for data in a Dataset. Each lab...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a annotatedDatasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the annotatedDatasets"),
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
      description: "Delete the annotatedDatasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the annotatedDatasets"),
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
      description: "Sync annotatedDatasets state from GCP",
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
