// Auto-generated extension model for @swamp/gcp/aiplatform/featureonlinestores-featureviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform FeatureOnlineStores.FeatureViews.
 *
 * FeatureView is representation of values that the FeatureOnlineStore will serve based on its syncConfig.
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
  return `${parent}/featureViews/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.featureOnlineStores.featureViews.get",
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
  "id": "aiplatform.projects.locations.featureOnlineStores.featureViews.create",
  "path": "v1/{+parent}/featureViews",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "featureViewId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "runSyncImmediately": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.featureOnlineStores.featureViews.patch",
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
  "id": "aiplatform.projects.locations.featureOnlineStores.featureViews.delete",
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
  bigQuerySource: z.object({
    entityIdColumns: z.array(z.string()).describe(
      "Required. Columns to construct entity_id / row keys.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view URI that will be materialized on each sync trigger based on FeatureView.SyncConfig.",
    ).optional(),
  }).optional(),
  bigtableMetadata: z.object({
    readAppProfile: z.string().describe(
      "Output only. The Bigtable App Profile to use for reading from Bigtable.",
    ).optional(),
  }).describe(
    "Metadata for the Cloud Bigtable that supports directly interacting Bigtable instances.",
  ).optional(),
  featureRegistrySource: z.object({
    featureGroups: z.array(z.object({
      featureGroupId: z.string().describe(
        "Required. Identifier of the feature group.",
      ).optional(),
      featureIds: z.array(z.string()).describe(
        "Required. Identifiers of features under the feature group.",
      ).optional(),
    })).describe(
      "Required. List of features that need to be synced to Online Store.",
    ).optional(),
    projectNumber: z.string().describe(
      "Optional. The project number of the parent project of the Feature Groups.",
    ).optional(),
  }).describe(
    "A Feature Registry source for features that need to be synced to Online Store.",
  ).optional(),
  indexConfig: z.object({
    bruteForceConfig: z.object({}).describe(
      "Configuration options for using brute force search.",
    ).optional(),
    crowdingColumn: z.string().describe(
      "Optional. Column of crowding. This column contains crowding attribute which is a constraint on a neighbor list produced by FeatureOnlineStoreService.SearchNearestEntities to diversify search results. If NearestNeighborQuery.per_crowding_attribute_neighbor_count is set to K in SearchNearestEntitiesRequest, it's guaranteed that no more than K entities of the same crowding attribute are returned in the response.",
    ).optional(),
    distanceMeasureType: z.enum([
      "DISTANCE_MEASURE_TYPE_UNSPECIFIED",
      "SQUARED_L2_DISTANCE",
      "COSINE_DISTANCE",
      "DOT_PRODUCT_DISTANCE",
    ]).describe(
      "Optional. The distance measure used in nearest neighbor search.",
    ).optional(),
    embeddingColumn: z.string().describe(
      "Optional. Column of embedding. This column contains the source data to create index for vector search. embedding_column must be set when using vector search.",
    ).optional(),
    embeddingDimension: z.number().int().describe(
      "Optional. The number of dimensions of the input embedding.",
    ).optional(),
    filterColumns: z.array(z.string()).describe(
      "Optional. Columns of features that're used to filter vector search results.",
    ).optional(),
    treeAhConfig: z.object({
      leafNodeEmbeddingCount: z.string().describe(
        "Optional. Number of embeddings on each leaf node. The default value is 1000 if not set.",
      ).optional(),
    }).describe("Configuration options for the tree-AH algorithm.").optional(),
  }).describe("Configuration for vector indexing.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. The labels with user-defined metadata to organize your FeatureViews. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information on and examples of labels. No more than 64 user labels can be associated with one FeatureOnlineStore(System labels are excluded)." System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the FeatureView. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}`",
  ).optional(),
  optimizedConfig: z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Vertex AI may be unable to scale beyond certain replica number.",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
      ).optional(),
    }).describe(
      "A description of resources that to large degree are decided by Vertex AI, and require only a modest additional configuration. Each Model supporting these resources documents its specific guidelines.",
    ).optional(),
  }).describe(
    "Configuration for FeatureViews created in Optimized FeatureOnlineStore.",
  ).optional(),
  serviceAgentType: z.enum([
    "SERVICE_AGENT_TYPE_UNSPECIFIED",
    "SERVICE_AGENT_TYPE_PROJECT",
    "SERVICE_AGENT_TYPE_FEATURE_VIEW",
  ]).describe(
    "Optional. Service agent type used during data sync. By default, the Vertex AI Service Agent is used. When using an IAM Policy to isolate this FeatureView within a project, a separate service account should be provisioned by setting this field to `SERVICE_AGENT_TYPE_FEATURE_VIEW`. This will generate a separate service account to access the BigQuery source table.",
  ).optional(),
  syncConfig: z.object({
    continuous: z.boolean().describe(
      "Optional. If true, syncs the FeatureView in a continuous manner to Online Store.",
    ).optional(),
    cron: z.string().describe(
      'Cron schedule (https://en.wikipedia.org/wiki/Cron) to launch scheduled runs. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, "CRON_TZ=America/New_York 1 * * * *", or "TZ=America/New_York 1 * * * *".',
    ).optional(),
  }).describe("Configuration for Sync. Only one option is set.").optional(),
  vertexRagSource: z.object({
    ragCorpusId: z.string().describe(
      "Optional. The RAG corpus id corresponding to this FeatureView.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view/table URI that will be materialized on each manual sync trigger. The table/view is expected to have the following columns and types at least: - `corpus_id` (STRING, NULLABLE/REQUIRED) - `file_id` (STRING, NULLABLE/REQUIRED) - `chunk_id` (STRING, NULLABLE/REQUIRED) - `chunk_data_type` (STRING, NULLABLE/REQUIRED) - `chunk_data` (STRING, NULLABLE/REQUIRED) - `embeddings` (FLOAT, REPEATED) - `file_original_uri` (STRING, NULLABLE/REQUIRED)",
    ).optional(),
  }).describe(
    "A Vertex Rag source for features that need to be synced to Online Store.",
  ).optional(),
  featureViewId: z.string().describe(
    "Required. The ID to use for the FeatureView, which will become the final component of the FeatureView's resource name. This value may be up to 60 characters, and valid characters are `[a-z0-9_]`. The first character cannot be a number. The value must be unique within a FeatureOnlineStore.",
  ).optional(),
  runSyncImmediately: z.string().describe(
    "Immutable. If set to true, one on demand sync will be run immediately, regardless whether the FeatureView.sync_config is configured or not.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bigQuerySource: z.object({
    entityIdColumns: z.array(z.string()),
    uri: z.string(),
  }).optional(),
  bigtableMetadata: z.object({
    readAppProfile: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  etag: z.string().optional(),
  featureRegistrySource: z.object({
    featureGroups: z.array(z.object({
      featureGroupId: z.string(),
      featureIds: z.array(z.string()),
    })),
    projectNumber: z.string(),
  }).optional(),
  indexConfig: z.object({
    bruteForceConfig: z.object({}),
    crowdingColumn: z.string(),
    distanceMeasureType: z.string(),
    embeddingColumn: z.string(),
    embeddingDimension: z.number(),
    filterColumns: z.array(z.string()),
    treeAhConfig: z.object({
      leafNodeEmbeddingCount: z.string(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  optimizedConfig: z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number(),
      minReplicaCount: z.number(),
    }),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceAccountEmail: z.string().optional(),
  serviceAgentType: z.string().optional(),
  syncConfig: z.object({
    continuous: z.boolean(),
    cron: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  vertexRagSource: z.object({
    ragCorpusId: z.string(),
    uri: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bigQuerySource: z.object({
    entityIdColumns: z.array(z.string()).describe(
      "Required. Columns to construct entity_id / row keys.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view URI that will be materialized on each sync trigger based on FeatureView.SyncConfig.",
    ).optional(),
  }).optional(),
  bigtableMetadata: z.object({
    readAppProfile: z.string().describe(
      "Output only. The Bigtable App Profile to use for reading from Bigtable.",
    ).optional(),
  }).describe(
    "Metadata for the Cloud Bigtable that supports directly interacting Bigtable instances.",
  ).optional(),
  featureRegistrySource: z.object({
    featureGroups: z.array(z.object({
      featureGroupId: z.string().describe(
        "Required. Identifier of the feature group.",
      ).optional(),
      featureIds: z.array(z.string()).describe(
        "Required. Identifiers of features under the feature group.",
      ).optional(),
    })).describe(
      "Required. List of features that need to be synced to Online Store.",
    ).optional(),
    projectNumber: z.string().describe(
      "Optional. The project number of the parent project of the Feature Groups.",
    ).optional(),
  }).describe(
    "A Feature Registry source for features that need to be synced to Online Store.",
  ).optional(),
  indexConfig: z.object({
    bruteForceConfig: z.object({}).describe(
      "Configuration options for using brute force search.",
    ).optional(),
    crowdingColumn: z.string().describe(
      "Optional. Column of crowding. This column contains crowding attribute which is a constraint on a neighbor list produced by FeatureOnlineStoreService.SearchNearestEntities to diversify search results. If NearestNeighborQuery.per_crowding_attribute_neighbor_count is set to K in SearchNearestEntitiesRequest, it's guaranteed that no more than K entities of the same crowding attribute are returned in the response.",
    ).optional(),
    distanceMeasureType: z.enum([
      "DISTANCE_MEASURE_TYPE_UNSPECIFIED",
      "SQUARED_L2_DISTANCE",
      "COSINE_DISTANCE",
      "DOT_PRODUCT_DISTANCE",
    ]).describe(
      "Optional. The distance measure used in nearest neighbor search.",
    ).optional(),
    embeddingColumn: z.string().describe(
      "Optional. Column of embedding. This column contains the source data to create index for vector search. embedding_column must be set when using vector search.",
    ).optional(),
    embeddingDimension: z.number().int().describe(
      "Optional. The number of dimensions of the input embedding.",
    ).optional(),
    filterColumns: z.array(z.string()).describe(
      "Optional. Columns of features that're used to filter vector search results.",
    ).optional(),
    treeAhConfig: z.object({
      leafNodeEmbeddingCount: z.string().describe(
        "Optional. Number of embeddings on each leaf node. The default value is 1000 if not set.",
      ).optional(),
    }).describe("Configuration options for the tree-AH algorithm.").optional(),
  }).describe("Configuration for vector indexing.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. The labels with user-defined metadata to organize your FeatureViews. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information on and examples of labels. No more than 64 user labels can be associated with one FeatureOnlineStore(System labels are excluded)." System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the FeatureView. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}`",
  ).optional(),
  optimizedConfig: z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Vertex AI may be unable to scale beyond certain replica number.",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
      ).optional(),
    }).describe(
      "A description of resources that to large degree are decided by Vertex AI, and require only a modest additional configuration. Each Model supporting these resources documents its specific guidelines.",
    ).optional(),
  }).describe(
    "Configuration for FeatureViews created in Optimized FeatureOnlineStore.",
  ).optional(),
  serviceAgentType: z.enum([
    "SERVICE_AGENT_TYPE_UNSPECIFIED",
    "SERVICE_AGENT_TYPE_PROJECT",
    "SERVICE_AGENT_TYPE_FEATURE_VIEW",
  ]).describe(
    "Optional. Service agent type used during data sync. By default, the Vertex AI Service Agent is used. When using an IAM Policy to isolate this FeatureView within a project, a separate service account should be provisioned by setting this field to `SERVICE_AGENT_TYPE_FEATURE_VIEW`. This will generate a separate service account to access the BigQuery source table.",
  ).optional(),
  syncConfig: z.object({
    continuous: z.boolean().describe(
      "Optional. If true, syncs the FeatureView in a continuous manner to Online Store.",
    ).optional(),
    cron: z.string().describe(
      'Cron schedule (https://en.wikipedia.org/wiki/Cron) to launch scheduled runs. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, "CRON_TZ=America/New_York 1 * * * *", or "TZ=America/New_York 1 * * * *".',
    ).optional(),
  }).describe("Configuration for Sync. Only one option is set.").optional(),
  vertexRagSource: z.object({
    ragCorpusId: z.string().describe(
      "Optional. The RAG corpus id corresponding to this FeatureView.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view/table URI that will be materialized on each manual sync trigger. The table/view is expected to have the following columns and types at least: - `corpus_id` (STRING, NULLABLE/REQUIRED) - `file_id` (STRING, NULLABLE/REQUIRED) - `chunk_id` (STRING, NULLABLE/REQUIRED) - `chunk_data_type` (STRING, NULLABLE/REQUIRED) - `chunk_data` (STRING, NULLABLE/REQUIRED) - `embeddings` (FLOAT, REPEATED) - `file_original_uri` (STRING, NULLABLE/REQUIRED)",
    ).optional(),
  }).describe(
    "A Vertex Rag source for features that need to be synced to Online Store.",
  ).optional(),
  featureViewId: z.string().describe(
    "Required. The ID to use for the FeatureView, which will become the final component of the FeatureView's resource name. This value may be up to 60 characters, and valid characters are `[a-z0-9_]`. The first character cannot be a number. The value must be unique within a FeatureOnlineStore.",
  ).optional(),
  runSyncImmediately: z.string().describe(
    "Immutable. If set to true, one on demand sync will be run immediately, regardless whether the FeatureView.sync_config is configured or not.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform FeatureOnlineStores.FeatureViews. Registered at `@swamp/gcp/aiplatform/featureonlinestores-featureviews`. */
export const model = {
  type: "@swamp/gcp/aiplatform/featureonlinestores-featureviews",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "FeatureView is representation of values that the FeatureOnlineStore will serv...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a featureViews",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bigQuerySource"] !== undefined) {
          body["bigQuerySource"] = g["bigQuerySource"];
        }
        if (g["bigtableMetadata"] !== undefined) {
          body["bigtableMetadata"] = g["bigtableMetadata"];
        }
        if (g["featureRegistrySource"] !== undefined) {
          body["featureRegistrySource"] = g["featureRegistrySource"];
        }
        if (g["indexConfig"] !== undefined) {
          body["indexConfig"] = g["indexConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["optimizedConfig"] !== undefined) {
          body["optimizedConfig"] = g["optimizedConfig"];
        }
        if (g["serviceAgentType"] !== undefined) {
          body["serviceAgentType"] = g["serviceAgentType"];
        }
        if (g["syncConfig"] !== undefined) body["syncConfig"] = g["syncConfig"];
        if (g["vertexRagSource"] !== undefined) {
          body["vertexRagSource"] = g["vertexRagSource"];
        }
        if (g["featureViewId"] !== undefined) {
          body["featureViewId"] = g["featureViewId"];
        }
        if (g["runSyncImmediately"] !== undefined) {
          body["runSyncImmediately"] = g["runSyncImmediately"];
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
      description: "Get a featureViews",
      arguments: z.object({
        identifier: z.string().describe("The name of the featureViews"),
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
      description: "Update featureViews attributes",
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
        if (g["bigQuerySource"] !== undefined) {
          body["bigQuerySource"] = g["bigQuerySource"];
        }
        if (g["bigtableMetadata"] !== undefined) {
          body["bigtableMetadata"] = g["bigtableMetadata"];
        }
        if (g["featureRegistrySource"] !== undefined) {
          body["featureRegistrySource"] = g["featureRegistrySource"];
        }
        if (g["indexConfig"] !== undefined) {
          body["indexConfig"] = g["indexConfig"];
        }
        if (g["optimizedConfig"] !== undefined) {
          body["optimizedConfig"] = g["optimizedConfig"];
        }
        if (g["serviceAgentType"] !== undefined) {
          body["serviceAgentType"] = g["serviceAgentType"];
        }
        if (g["syncConfig"] !== undefined) body["syncConfig"] = g["syncConfig"];
        if (g["vertexRagSource"] !== undefined) {
          body["vertexRagSource"] = g["vertexRagSource"];
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
      description: "Delete the featureViews",
      arguments: z.object({
        identifier: z.string().describe("The name of the featureViews"),
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
      description: "Sync featureViews state from GCP",
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
    direct_write: {
      description: "direct write",
      arguments: z.object({
        dataKeyAndFeatureValues: z.any().optional(),
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
        params["featureView"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dataKeyAndFeatureValues"] !== undefined) {
          body["dataKeyAndFeatureValues"] = args["dataKeyAndFeatureValues"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.directWrite",
            "path": "v1/{+featureView}:directWrite",
            "httpMethod": "POST",
            "parameterOrder": ["featureView"],
            "parameters": {
              "featureView": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetch_feature_values: {
      description: "fetch feature values",
      arguments: z.object({
        dataFormat: z.any().optional(),
        dataKey: z.any().optional(),
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
        params["featureView"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dataFormat"] !== undefined) {
          body["dataFormat"] = args["dataFormat"];
        }
        if (args["dataKey"] !== undefined) body["dataKey"] = args["dataKey"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.fetchFeatureValues",
            "path": "v1/{+featureView}:fetchFeatureValues",
            "httpMethod": "POST",
            "parameterOrder": ["featureView"],
            "parameters": {
              "featureView": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_fetch_access_token: {
      description: "generate fetch access token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["featureView"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.generateFetchAccessToken",
            "path": "v1/{+featureView}:generateFetchAccessToken",
            "httpMethod": "POST",
            "parameterOrder": ["featureView"],
            "parameters": {
              "featureView": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_nearest_entities: {
      description: "search nearest entities",
      arguments: z.object({
        query: z.any().optional(),
        returnFullEntity: z.any().optional(),
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
        params["featureView"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["returnFullEntity"] !== undefined) {
          body["returnFullEntity"] = args["returnFullEntity"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.searchNearestEntities",
            "path": "v1/{+featureView}:searchNearestEntities",
            "httpMethod": "POST",
            "parameterOrder": ["featureView"],
            "parameters": {
              "featureView": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    action_sync: {
      description: "sync",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["featureView"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.sync",
            "path": "v1/{+featureView}:sync",
            "httpMethod": "POST",
            "parameterOrder": ["featureView"],
            "parameters": {
              "featureView": { "location": "path", "required": true },
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
