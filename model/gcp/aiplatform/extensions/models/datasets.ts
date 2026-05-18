// Auto-generated extension model for @swamp/gcp/aiplatform/datasets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Datasets.
 *
 * A collection of DataItems and Annotations on them.
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

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.datasets.get",
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "aiplatform.datasets.create",
  "path": "v1/datasets",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "parent": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.datasets.patch",
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
  "id": "aiplatform.datasets.delete",
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
  description: z.string().describe("The description of the Dataset.")
    .optional(),
  displayName: z.string().describe(
    "Required. The user-defined name of the Dataset. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  metadata: z.string().describe(
    "Required. Additional information about the Dataset.",
  ).optional(),
  metadataSchemaUri: z.string().describe(
    "Required. Points to a YAML file stored on Google Cloud Storage describing additional information about the Dataset. The schema is defined as an OpenAPI 3.0.2 Schema Object. The schema files that can be used here are found in gs://google-cloud-aiplatform/schema/dataset/metadata/.",
  ).optional(),
  modelReference: z.string().describe(
    "Optional. Reference to the public base model last used by the dataset. Only set for prompt datasets.",
  ).optional(),
  savedQueries: z.array(z.object({
    annotationFilter: z.string().describe(
      "Output only. Filters on the Annotations in the dataset.",
    ).optional(),
    annotationSpecCount: z.number().int().describe(
      "Output only. Number of AnnotationSpecs in the context of the SavedQuery.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this SavedQuery was created.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The user-defined name of the SavedQuery. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform a consistent read-modify-write update. If not set, a blind "overwrite" update happens.',
    ).optional(),
    metadata: z.string().describe(
      "Some additional information about the SavedQuery.",
    ).optional(),
    name: z.string().describe("Output only. Resource name of the SavedQuery.")
      .optional(),
    problemType: z.string().describe(
      "Required. Problem type of the SavedQuery. Allowed values: * IMAGE_CLASSIFICATION_SINGLE_LABEL * IMAGE_CLASSIFICATION_MULTI_LABEL * IMAGE_BOUNDING_POLY * IMAGE_BOUNDING_BOX * TEXT_CLASSIFICATION_SINGLE_LABEL * TEXT_CLASSIFICATION_MULTI_LABEL * TEXT_EXTRACTION * TEXT_SENTIMENT * VIDEO_CLASSIFICATION * VIDEO_OBJECT_TRACKING",
    ).optional(),
    supportAutomlTraining: z.boolean().describe(
      "Output only. If the Annotations belonging to the SavedQuery can be used for AutoML training.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when SavedQuery was last updated.",
    ).optional(),
  })).describe(
    "All SavedQueries belong to the Dataset will be returned in List/Get Dataset response. The annotation_specs field will not be populated except for UI cases which will only use annotation_spec_count. In CreateDataset request, a SavedQuery is created together if this field is set, up to one SavedQuery can be set in CreateDatasetRequest. The SavedQuery should not contain any AnnotationSpec.",
  ).optional(),
  parent: z.string().describe(
    "Required. The resource name of the Location to create the Dataset in. Format: `projects/{project}/locations/{location}`",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dataItemCount: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.string().optional(),
  metadataArtifact: z.string().optional(),
  metadataSchemaUri: z.string().optional(),
  modelReference: z.string().optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  savedQueries: z.array(z.object({
    annotationFilter: z.string(),
    annotationSpecCount: z.number(),
    createTime: z.string(),
    displayName: z.string(),
    etag: z.string(),
    metadata: z.string(),
    name: z.string(),
    problemType: z.string(),
    supportAutomlTraining: z.boolean(),
    updateTime: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe("The description of the Dataset.")
    .optional(),
  displayName: z.string().describe(
    "Required. The user-defined name of the Dataset. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  metadata: z.string().describe(
    "Required. Additional information about the Dataset.",
  ).optional(),
  metadataSchemaUri: z.string().describe(
    "Required. Points to a YAML file stored on Google Cloud Storage describing additional information about the Dataset. The schema is defined as an OpenAPI 3.0.2 Schema Object. The schema files that can be used here are found in gs://google-cloud-aiplatform/schema/dataset/metadata/.",
  ).optional(),
  modelReference: z.string().describe(
    "Optional. Reference to the public base model last used by the dataset. Only set for prompt datasets.",
  ).optional(),
  savedQueries: z.array(z.object({
    annotationFilter: z.string().describe(
      "Output only. Filters on the Annotations in the dataset.",
    ).optional(),
    annotationSpecCount: z.number().int().describe(
      "Output only. Number of AnnotationSpecs in the context of the SavedQuery.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this SavedQuery was created.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The user-defined name of the SavedQuery. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform a consistent read-modify-write update. If not set, a blind "overwrite" update happens.',
    ).optional(),
    metadata: z.string().describe(
      "Some additional information about the SavedQuery.",
    ).optional(),
    name: z.string().describe("Output only. Resource name of the SavedQuery.")
      .optional(),
    problemType: z.string().describe(
      "Required. Problem type of the SavedQuery. Allowed values: * IMAGE_CLASSIFICATION_SINGLE_LABEL * IMAGE_CLASSIFICATION_MULTI_LABEL * IMAGE_BOUNDING_POLY * IMAGE_BOUNDING_BOX * TEXT_CLASSIFICATION_SINGLE_LABEL * TEXT_CLASSIFICATION_MULTI_LABEL * TEXT_EXTRACTION * TEXT_SENTIMENT * VIDEO_CLASSIFICATION * VIDEO_OBJECT_TRACKING",
    ).optional(),
    supportAutomlTraining: z.boolean().describe(
      "Output only. If the Annotations belonging to the SavedQuery can be used for AutoML training.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when SavedQuery was last updated.",
    ).optional(),
  })).describe(
    "All SavedQueries belong to the Dataset will be returned in List/Get Dataset response. The annotation_specs field will not be populated except for UI cases which will only use annotation_spec_count. In CreateDataset request, a SavedQuery is created together if this field is set, up to one SavedQuery can be set in CreateDatasetRequest. The SavedQuery should not contain any AnnotationSpec.",
  ).optional(),
  parent: z.string().describe(
    "Required. The resource name of the Location to create the Dataset in. Format: `projects/{project}/locations/{location}`",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform Datasets. Registered at `@swamp/gcp/aiplatform/datasets`. */
export const model = {
  type: "@swamp/gcp/aiplatform/datasets",
  version: "2026.05.18.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A collection of DataItems and Annotations on them.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a datasets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["metadataSchemaUri"] !== undefined) {
          body["metadataSchemaUri"] = g["metadataSchemaUri"];
        }
        if (g["modelReference"] !== undefined) {
          body["modelReference"] = g["modelReference"];
        }
        if (g["savedQueries"] !== undefined) {
          body["savedQueries"] = g["savedQueries"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
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
    update: {
      description: "Update datasets attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["metadataSchemaUri"] !== undefined) {
          body["metadataSchemaUri"] = g["metadataSchemaUri"];
        }
        if (g["modelReference"] !== undefined) {
          body["modelReference"] = g["modelReference"];
        }
        if (g["savedQueries"] !== undefined) {
          body["savedQueries"] = g["savedQueries"];
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
      description: "Delete the datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync datasets state from GCP",
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
  },
};
