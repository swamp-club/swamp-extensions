// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.featureOnlineStores.featureViews.list",
  "path": "v1/{+parent}/featureViews",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  bigQuerySource: z.object({
    entityIdColumns: z.array(z.string()).describe(
      "Required. Columns to construct entity_id / row keys.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view URI that will be materialized on each sync trigger based on FeatureView.SyncConfig.",
    ).optional(),
  }).describe(
    "Optional. Configures how data is supposed to be extracted from a BigQuery source to be loaded onto the FeatureOnlineStore.",
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
    "Optional. Configures the features from a Feature Registry source that need to be loaded onto the FeatureOnlineStore.",
  ).optional(),
  indexConfig: z.object({
    bruteForceConfig: z.object({}).describe(
      "Optional. Configuration options for using brute force search, which simply implements the standard linear search in the database for each query. It is primarily meant for benchmarking and to generate the ground truth for approximate search.",
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
    }).describe(
      "Optional. Configuration options for the tree-AH algorithm (Shallow tree + Asymmetric Hashing). Please refer to this paper for more details: https://arxiv.org/abs/1908.10396",
    ).optional(),
  }).describe(
    "Optional. Configuration for index preparation for vector search. It contains the required configurations to create an index from source data, so that approximate nearest neighbor (a.k.a ANN) algorithms search can be performed during online serving.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. The labels with user-defined metadata to organize your FeatureViews. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information on and examples of labels. No more than 64 user labels can be associated with one FeatureOnlineStore(System labels are excluded)." System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the FeatureView. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}`",
  ).optional(),
  optimizedConfig: z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Agent Platform may be unable to scale beyond certain replica number.",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
      ).optional(),
    }).describe(
      "Optional. A description of resources that the FeatureView uses, which to large degree are decided by Vertex AI, and optionally allows only a modest additional configuration. If min_replica_count is not set, the default value is 2. If max_replica_count is not set, the default value is 6. The max allowed replica count is 1000.",
    ).optional(),
  }).describe(
    "Optional. Configuration for FeatureView created under Optimized FeatureOnlineStore.",
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
  }).describe(
    "Configures when data is to be synced/updated for this FeatureView. At the end of the sync the latest featureValues for each entityId of this FeatureView are made ready for online serving.",
  ).optional(),
  vertexRagSource: z.object({
    ragCorpusId: z.string().describe(
      "Optional. The RAG corpus id corresponding to this FeatureView.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view/table URI that will be materialized on each manual sync trigger. The table/view is expected to have the following columns and types at least: - `corpus_id` (STRING, NULLABLE/REQUIRED) - `file_id` (STRING, NULLABLE/REQUIRED) - `chunk_id` (STRING, NULLABLE/REQUIRED) - `chunk_data_type` (STRING, NULLABLE/REQUIRED) - `chunk_data` (STRING, NULLABLE/REQUIRED) - `embeddings` (FLOAT, REPEATED) - `file_original_uri` (STRING, NULLABLE/REQUIRED)",
    ).optional(),
  }).describe(
    "Optional. The Vertex RAG Source that the FeatureView is linked to.",
  ).optional(),
  featureViewId: z.string().describe(
    "Required. The ID to use for the FeatureView, which will become the final component of the FeatureView's resource name. This value may be up to 60 characters, and valid characters are `[a-z0-9_]`. The first character cannot be a number. The value must be unique within a FeatureOnlineStore.",
  ).optional(),
  runSyncImmediately: z.string().describe(
    "Immutable. If set to true, one on demand sync will be run immediately, regardless whether the FeatureView.sync_config is configured or not.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  bigQuerySource: z.object({
    entityIdColumns: z.array(z.string()).describe(
      "Required. Columns to construct entity_id / row keys.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view URI that will be materialized on each sync trigger based on FeatureView.SyncConfig.",
    ).optional(),
  }).describe(
    "Optional. Configures how data is supposed to be extracted from a BigQuery source to be loaded onto the FeatureOnlineStore.",
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
    "Optional. Configures the features from a Feature Registry source that need to be loaded onto the FeatureOnlineStore.",
  ).optional(),
  indexConfig: z.object({
    bruteForceConfig: z.object({}).describe(
      "Optional. Configuration options for using brute force search, which simply implements the standard linear search in the database for each query. It is primarily meant for benchmarking and to generate the ground truth for approximate search.",
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
    }).describe(
      "Optional. Configuration options for the tree-AH algorithm (Shallow tree + Asymmetric Hashing). Please refer to this paper for more details: https://arxiv.org/abs/1908.10396",
    ).optional(),
  }).describe(
    "Optional. Configuration for index preparation for vector search. It contains the required configurations to create an index from source data, so that approximate nearest neighbor (a.k.a ANN) algorithms search can be performed during online serving.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. The labels with user-defined metadata to organize your FeatureViews. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information on and examples of labels. No more than 64 user labels can be associated with one FeatureOnlineStore(System labels are excluded)." System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the FeatureView. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}`",
  ).optional(),
  optimizedConfig: z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Agent Platform may be unable to scale beyond certain replica number.",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
      ).optional(),
    }).describe(
      "Optional. A description of resources that the FeatureView uses, which to large degree are decided by Vertex AI, and optionally allows only a modest additional configuration. If min_replica_count is not set, the default value is 2. If max_replica_count is not set, the default value is 6. The max allowed replica count is 1000.",
    ).optional(),
  }).describe(
    "Optional. Configuration for FeatureView created under Optimized FeatureOnlineStore.",
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
  }).describe(
    "Configures when data is to be synced/updated for this FeatureView. At the end of the sync the latest featureValues for each entityId of this FeatureView are made ready for online serving.",
  ).optional(),
  vertexRagSource: z.object({
    ragCorpusId: z.string().describe(
      "Optional. The RAG corpus id corresponding to this FeatureView.",
    ).optional(),
    uri: z.string().describe(
      "Required. The BigQuery view/table URI that will be materialized on each manual sync trigger. The table/view is expected to have the following columns and types at least: - `corpus_id` (STRING, NULLABLE/REQUIRED) - `file_id` (STRING, NULLABLE/REQUIRED) - `chunk_id` (STRING, NULLABLE/REQUIRED) - `chunk_data_type` (STRING, NULLABLE/REQUIRED) - `chunk_data` (STRING, NULLABLE/REQUIRED) - `embeddings` (FLOAT, REPEATED) - `file_original_uri` (STRING, NULLABLE/REQUIRED)",
    ).optional(),
  }).describe(
    "Optional. The Vertex RAG Source that the FeatureView is linked to.",
  ).optional(),
  featureViewId: z.string().describe(
    "Required. The ID to use for the FeatureView, which will become the final component of the FeatureView's resource name. This value may be up to 60 characters, and valid characters are `[a-z0-9_]`. The first character cannot be a number. The value must be unique within a FeatureOnlineStore.",
  ).optional(),
  runSyncImmediately: z.string().describe(
    "Immutable. If set to true, one on demand sync will be run immediately, regardless whether the FeatureView.sync_config is configured or not.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Agent Platform FeatureOnlineStores.FeatureViews. Registered at `@swamp/gcp/aiplatform/featureonlinestores-featureviews`. */
export const model = {
  type: "@swamp/gcp/aiplatform/featureonlinestores-featureviews",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: bigtableMetadata",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { bigtableMetadata: _bigtableMetadata, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: entityIdColumns, uri, featureGroups, featureGroupId, featureIds, projectNumber, bruteForceConfig, crowdingColumn, distanceMeasureType, embeddingColumn, embeddingDimension, filterColumns, treeAhConfig, leafNodeEmbeddingCount, automaticResources, maxReplicaCount, minReplicaCount, continuous, cron, ragCorpusId, uri",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          entityIdColumns: _entityIdColumns,
          uri: _uri,
          featureGroups: _featureGroups,
          featureGroupId: _featureGroupId,
          featureIds: _featureIds,
          projectNumber: _projectNumber,
          bruteForceConfig: _bruteForceConfig,
          crowdingColumn: _crowdingColumn,
          distanceMeasureType: _distanceMeasureType,
          embeddingColumn: _embeddingColumn,
          embeddingDimension: _embeddingDimension,
          filterColumns: _filterColumns,
          treeAhConfig: _treeAhConfig,
          leafNodeEmbeddingCount: _leafNodeEmbeddingCount,
          automaticResources: _automaticResources,
          maxReplicaCount: _maxReplicaCount,
          minReplicaCount: _minReplicaCount,
          continuous: _continuous,
          cron: _cron,
          ragCorpusId: _ragCorpusId,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["bigQuerySource"] !== undefined) {
          body["bigQuerySource"] = g["bigQuerySource"];
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
          params["featureViewId"] = String(g["featureViewId"]);
        }
        if (g["runSyncImmediately"] !== undefined) {
          params["runSyncImmediately"] = String(g["runSyncImmediately"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific featureViews by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["bigQuerySource"] !== undefined) {
          body["bigQuerySource"] = g["bigQuerySource"];
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
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          params,
          credentials,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific featureViews by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
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
      description: "List featureViews resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists the FeatureViews that match the filter expression. The following filters are supported: * `create_time`: Supports `=`, `!=`, `<`, `>`, `>=`, and `<=` comparisons. Values must be in RFC 3339 format. * `update_time`: Supports `=`, `!=`, `<`, `>`, `>=`, and `<=` comparisons. Values must be in RFC 3339 format. * `labels`: Supports key-value equality as well as key presence. Examples: * `create_time > \\"2020-01-31T15:30:00.000000Z\\" OR update_time > \\"2020-01-31T15:30:00.000000Z\\"` --> FeatureViews created or updated after 2020-01-31T15:30:00.000000Z. * `labels.active = yes AND labels.env = prod` --> FeatureViews having both (active: yes) and (env: prod) labels. * `labels.env: *` --> Any FeatureView which has a label with \'env\' as the key.',
        ).optional(),
        orderBy: z.string().describe(
          'A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * `feature_view_id` * `create_time` * `update_time`',
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of FeatureViews to return. The service may return fewer than this value. If unspecified, at most 1000 FeatureViews will be returned. The maximum value is 1000; any value greater than 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "featureViews",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    direct_write: {
      description: "direct write",
      arguments: z.object({
        dataKeyAndFeatureValues: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    generate_fetch_access_token: {
      description: "generate fetch access token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          baseUrl,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    action_sync: {
      description: "sync",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["permissions"] !== undefined) {
          params["permissions"] = String(args["permissions"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "aiplatform.projects.locations.featureOnlineStores.featureViews.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "permissions": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
