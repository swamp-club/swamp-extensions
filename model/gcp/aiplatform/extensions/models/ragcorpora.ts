// Auto-generated extension model for @swamp/gcp/aiplatform/ragcorpora
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform RagCorpora.
 *
 * A RagCorpus is a RagFile container and a project can have multiple RagCorpora.
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
  return `${parent}/ragCorpora/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.ragCorpora.get",
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
  "id": "aiplatform.projects.locations.ragCorpora.create",
  "path": "v1/{+parent}/ragCorpora",
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
  "id": "aiplatform.projects.locations.ragCorpora.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.ragCorpora.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
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
  corpusStatus: z.object({
    errorStatus: z.string().describe(
      "Output only. Only when the `state` field is ERROR.",
    ).optional(),
    state: z.enum(["UNKNOWN", "INITIALIZED", "ACTIVE", "ERROR"]).describe(
      "Output only. RagCorpus life state.",
    ).optional(),
  }).describe("RagCorpus status.").optional(),
  description: z.string().describe(
    "Optional. The description of the RagCorpus.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the RagCorpus. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  vectorDbConfig: z.object({
    apiAuth: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The SecretManager secret version resource name storing API key. e.g. projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
        apiKeyString: z.string().describe(
          "The API key string. Either this or `api_key_secret_version` must be set.",
        ).optional(),
      }).describe("The API secret.").optional(),
    }).describe(
      "The generic reusable api auth config. Deprecated. Please use AuthConfig (google/cloud/aiplatform/master/auth.proto) instead.",
    ).optional(),
    pinecone: z.object({
      indexName: z.string().describe(
        "Pinecone index name. This value cannot be changed after it's set.",
      ).optional(),
    }).describe("The config for the Pinecone.").optional(),
    ragEmbeddingModelConfig: z.object({
      vertexPredictionEndpoint: z.object({
        endpoint: z.string().describe(
          "Required. The endpoint resource name. Format: `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}` or `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        model: z.string().describe(
          "Output only. The resource name of the model that is deployed on the endpoint. Present only when the endpoint is not a publisher model. Pattern: `projects/{project}/locations/{location}/models/{model}`",
        ).optional(),
        modelVersionId: z.string().describe(
          "Output only. Version ID of the model that is deployed on the endpoint. Present only when the endpoint is not a publisher model.",
        ).optional(),
      }).describe(
        "Config representing a model hosted on Vertex Prediction Endpoint.",
      ).optional(),
    }).describe("Config for the embedding model to use for RAG.").optional(),
    ragManagedDb: z.object({
      ann: z.object({
        leafCount: z.number().int().describe(
          "Number of leaf nodes in the tree-based structure. Each leaf node contains groups of closely related vectors along with their corresponding centroid. Recommended value is 10 * sqrt(num of RagFiles in your RagCorpus). Default value is 500.",
        ).optional(),
        treeDepth: z.number().int().describe(
          "The depth of the tree-based structure. Only depth values of 2 and 3 are supported. Recommended value is 2 if you have if you have O(10K) files in the RagCorpus and set this to 3 if more than that. Default value is 2.",
        ).optional(),
      }).describe(
        "Config for ANN search. RagManagedDb uses a tree-based structure to partition data and facilitate faster searches. As a tradeoff, it requires longer indexing time and manual triggering of index rebuild via the ImportRagFiles and UpdateRagCorpus API.",
      ).optional(),
      knn: z.object({}).describe("Config for KNN search.").optional(),
    }).describe("The config for the default RAG-managed Vector DB.").optional(),
    vertexVectorSearch: z.object({
      index: z.string().describe(
        "The resource name of the Index. Format: `projects/{project}/locations/{location}/indexes/{index}`",
      ).optional(),
      indexEndpoint: z.string().describe(
        "The resource name of the Index Endpoint. Format: `projects/{project}/locations/{location}/indexEndpoints/{index_endpoint}`",
      ).optional(),
    }).describe("The config for the Vertex Vector Search.").optional(),
  }).describe("Config for the Vector DB to use for RAG.").optional(),
  vertexAiSearchConfig: z.object({
    servingConfig: z.string().describe(
      "Vertex AI Search Serving Config resource full name. For example, `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/servingConfigs/{serving_config}` or `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/servingConfigs/{serving_config}`.",
    ).optional(),
  }).describe("Config for the Vertex AI Search.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  corpusStatus: z.object({
    errorStatus: z.string(),
    state: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  updateTime: z.string().optional(),
  vectorDbConfig: z.object({
    apiAuth: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string(),
        apiKeyString: z.string(),
      }),
    }),
    pinecone: z.object({
      indexName: z.string(),
    }),
    ragEmbeddingModelConfig: z.object({
      vertexPredictionEndpoint: z.object({
        endpoint: z.string(),
        model: z.string(),
        modelVersionId: z.string(),
      }),
    }),
    ragManagedDb: z.object({
      ann: z.object({
        leafCount: z.number(),
        treeDepth: z.number(),
      }),
      knn: z.object({}),
    }),
    vertexVectorSearch: z.object({
      index: z.string(),
      indexEndpoint: z.string(),
    }),
  }).optional(),
  vertexAiSearchConfig: z.object({
    servingConfig: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  corpusStatus: z.object({
    errorStatus: z.string().describe(
      "Output only. Only when the `state` field is ERROR.",
    ).optional(),
    state: z.enum(["UNKNOWN", "INITIALIZED", "ACTIVE", "ERROR"]).describe(
      "Output only. RagCorpus life state.",
    ).optional(),
  }).describe("RagCorpus status.").optional(),
  description: z.string().describe(
    "Optional. The description of the RagCorpus.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the RagCorpus. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  vectorDbConfig: z.object({
    apiAuth: z.object({
      apiKeyConfig: z.object({
        apiKeySecretVersion: z.string().describe(
          "Required. The SecretManager secret version resource name storing API key. e.g. projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
        apiKeyString: z.string().describe(
          "The API key string. Either this or `api_key_secret_version` must be set.",
        ).optional(),
      }).describe("The API secret.").optional(),
    }).describe(
      "The generic reusable api auth config. Deprecated. Please use AuthConfig (google/cloud/aiplatform/master/auth.proto) instead.",
    ).optional(),
    pinecone: z.object({
      indexName: z.string().describe(
        "Pinecone index name. This value cannot be changed after it's set.",
      ).optional(),
    }).describe("The config for the Pinecone.").optional(),
    ragEmbeddingModelConfig: z.object({
      vertexPredictionEndpoint: z.object({
        endpoint: z.string().describe(
          "Required. The endpoint resource name. Format: `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}` or `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        model: z.string().describe(
          "Output only. The resource name of the model that is deployed on the endpoint. Present only when the endpoint is not a publisher model. Pattern: `projects/{project}/locations/{location}/models/{model}`",
        ).optional(),
        modelVersionId: z.string().describe(
          "Output only. Version ID of the model that is deployed on the endpoint. Present only when the endpoint is not a publisher model.",
        ).optional(),
      }).describe(
        "Config representing a model hosted on Vertex Prediction Endpoint.",
      ).optional(),
    }).describe("Config for the embedding model to use for RAG.").optional(),
    ragManagedDb: z.object({
      ann: z.object({
        leafCount: z.number().int().describe(
          "Number of leaf nodes in the tree-based structure. Each leaf node contains groups of closely related vectors along with their corresponding centroid. Recommended value is 10 * sqrt(num of RagFiles in your RagCorpus). Default value is 500.",
        ).optional(),
        treeDepth: z.number().int().describe(
          "The depth of the tree-based structure. Only depth values of 2 and 3 are supported. Recommended value is 2 if you have if you have O(10K) files in the RagCorpus and set this to 3 if more than that. Default value is 2.",
        ).optional(),
      }).describe(
        "Config for ANN search. RagManagedDb uses a tree-based structure to partition data and facilitate faster searches. As a tradeoff, it requires longer indexing time and manual triggering of index rebuild via the ImportRagFiles and UpdateRagCorpus API.",
      ).optional(),
      knn: z.object({}).describe("Config for KNN search.").optional(),
    }).describe("The config for the default RAG-managed Vector DB.").optional(),
    vertexVectorSearch: z.object({
      index: z.string().describe(
        "The resource name of the Index. Format: `projects/{project}/locations/{location}/indexes/{index}`",
      ).optional(),
      indexEndpoint: z.string().describe(
        "The resource name of the Index Endpoint. Format: `projects/{project}/locations/{location}/indexEndpoints/{index_endpoint}`",
      ).optional(),
    }).describe("The config for the Vertex Vector Search.").optional(),
  }).describe("Config for the Vector DB to use for RAG.").optional(),
  vertexAiSearchConfig: z.object({
    servingConfig: z.string().describe(
      "Vertex AI Search Serving Config resource full name. For example, `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/servingConfigs/{serving_config}` or `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/servingConfigs/{serving_config}`.",
    ).optional(),
  }).describe("Config for the Vertex AI Search.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform RagCorpora. Registered at `@swamp/gcp/aiplatform/ragcorpora`. */
export const model = {
  type: "@swamp/gcp/aiplatform/ragcorpora",
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
      description:
        "A RagCorpus is a RagFile container and a project can have multiple RagCorpora.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ragCorpora",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["corpusStatus"] !== undefined) {
          body["corpusStatus"] = g["corpusStatus"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["vectorDbConfig"] !== undefined) {
          body["vectorDbConfig"] = g["vectorDbConfig"];
        }
        if (g["vertexAiSearchConfig"] !== undefined) {
          body["vertexAiSearchConfig"] = g["vertexAiSearchConfig"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
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
      description: "Get a ragCorpora",
      arguments: z.object({
        identifier: z.string().describe("The name of the ragCorpora"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    update: {
      description: "Update ragCorpora attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["corpusStatus"] !== undefined) {
          body["corpusStatus"] = g["corpusStatus"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["vectorDbConfig"] !== undefined) {
          body["vectorDbConfig"] = g["vectorDbConfig"];
        }
        if (g["vertexAiSearchConfig"] !== undefined) {
          body["vertexAiSearchConfig"] = g["vertexAiSearchConfig"];
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
      description: "Delete the ragCorpora",
      arguments: z.object({
        identifier: z.string().describe("The name of the ragCorpora"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync ragCorpora state from GCP",
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
            String(g["parent"] ?? ""),
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
