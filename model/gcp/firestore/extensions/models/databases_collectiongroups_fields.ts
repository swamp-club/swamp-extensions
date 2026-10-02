// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/firestore/databases-collectiongroups-fields
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firestore Databases.CollectionGroups.Fields.
 *
 * Represents a single field in the database. Fields are grouped by their "Collection Group", which represent all collections in the database with the same ID.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/fields/${shortName}`;
}

const BASE_URL = "https://firestore.googleapis.com/";

const GET_CONFIG = {
  "id": "firestore.projects.databases.collectionGroups.fields.get",
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

const PATCH_CONFIG = {
  "id": "firestore.projects.databases.collectionGroups.fields.patch",
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

const LIST_CONFIG = {
  "id": "firestore.projects.databases.collectionGroups.fields.list",
  "path": "v1/{+parent}/fields",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  indexConfig: z.object({
    ancestorField: z.string().describe(
      "Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it *would* be set if this field had no index configuration (when `uses_ancestor_config` is false).",
    ).optional(),
    indexes: z.array(z.object({
      apiScope: z.enum([
        "ANY_API",
        "DATASTORE_MODE_API",
        "MONGODB_COMPATIBLE_API",
      ]).describe("The API scope supported by this index.").optional(),
      density: z.enum([
        "DENSITY_UNSPECIFIED",
        "SPARSE_ALL",
        "SPARSE_ANY",
        "DENSE",
      ]).describe("Immutable. The density configuration of the index.")
        .optional(),
      fields: z.array(z.object({
        arrayConfig: z.unknown().describe(
          "Indicates that this field supports operations on `array_value`s.",
        ).optional(),
        fieldPath: z.unknown().describe(
          "Can be __name__. For single field indexes, this must match the name of the field or may be omitted.",
        ).optional(),
        order: z.unknown().describe(
          "Indicates that this field supports ordering by the specified order or comparing using =,!=, , >=.",
        ).optional(),
        searchConfig: z.unknown().describe(
          "Indicates that this field supports search operations.",
        ).optional(),
        vectorConfig: z.unknown().describe(
          "Indicates that this field supports nearest neighbor and distance operations on vector.",
        ).optional(),
      })).describe(
        "The fields supported by this index. At most 100 fields may be specified. In Standard edition databases only: - At least 2 fields must be specified. - The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in the index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified).",
      ).optional(),
      multikey: z.boolean().describe(
        "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      name: z.string().describe(
        "A server-defined name for this index. Output only. When used in the google.firestore.admin.v1.Index resource, the value is of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` When used in the google.firestore.admin.v1.Field resource, the value is empty.",
      ).optional(),
      queryScope: z.enum([
        "QUERY_SCOPE_UNSPECIFIED",
        "COLLECTION",
        "COLLECTION_GROUP",
        "COLLECTION_RECURSIVE",
      ]).describe(
        "Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index.",
      ).optional(),
      searchIndexOptions: z.object({
        textLanguage: z.string().describe(
          "Optional. The language to use for text search indexes. Used as the default language if not overridden at the document level by specifying the `text_language_override_field`. The language is specified as a BCP 47 language code. For indexes with MONGODB_COMPATIBLE_API ApiScope: If unspecified, the default language is English. For indexes with `ANY_API` ApiScope: If unspecified, the default behavior is autodetect.",
        ).optional(),
        textLanguageOverrideFieldPath: z.string().describe(
          'Optional. The field in the document that specifies which language to use for that specific document. For indexes with MONGODB_COMPATIBLE_API ApiScope: if unspecified, the language is taken from the "language" field if it exists or from `text_language` if it does not.',
        ).optional(),
      }).describe(
        "Optional. Options for search indexes that are at the index definition level. This field is only currently supported for indexes with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      shardCount: z.number().int().describe(
        'Optional. The number of physical shards for the index. In Cloud Firestore, data and index entries are stored in contiguous, ordered key ranges called splits. While document keys within a collection are hashed to distribute write traffic across splits, secondary index entries are ordered lexicographically by their indexed field values. When an index contains fields with sequential or monotonically increasing or decreasing values (such as timestamps or auto-incrementing IDs), every incoming index write targets the boundary of the index keyspace on a single split. Because sequential writes continuously advance to the newest split at the edge of the range, automatic load-based splitting cannot divide the write traffic across storage servers. Under high write rates, this concentration creates an append hotspot on that single split, resulting in elevated write latency, contention errors, and transaction aborts. Sharded indexes solve this write bottleneck by hash partitioning the secondary index keyspace. When `shard_count` is configured to N, Firestore automatically prepends a virtual computed shard field (with values from 0 to N-1) as the leading field of the index. This splits a single sequential key range into N independent key ranges, uniformly scattering adjacent writes across distinct splits and storage servers to enable linear write scaling. Query trade-offs: Hash partitioning trades query performance for write throughput. Because matching index entries are scattered across all shards, queries executing against a sharded index cannot read from a single contiguous range. The query engine must fan out parallel seeks across all N shards and merge the ordered results. Even index point lookups and queries with `LIMIT 1` must seek across all N shards. Sizing and best practices: - Indexes cannot be updated in-place. `shard_count` is immutable once an index is created; to "reshard" an index, create a new index with the desired `shard_count` and delete the original index. - Use sharded indexes only for indexes experiencing write bottlenecks (typically exceeding 500-1,000 writes/sec) on sequential or timestamp fields. - Do not shard indexes on uniformly distributed fields (such as UUIDs or hash tokens), where writes naturally spread across splits without sharding. Sharding uniform indexes adds query overhead without improving write throughput. - Do not shard read-heavy or low-write collections. - Size `shard_count` based on expected peak write throughput. Because a single split sustains roughly 500-1,000 writes/sec on sequential keys, estimate `shard_count ≈ ceil(peak_write_qps / 500)`. - e.g., 4 for up to ~2,000-4,000 writes/sec, 16 for up to ~10,000+ writes/sec. - Setting an excessively high shard count produces diminishing write returns while needlessly increasing read latency and seek costs. If <= 1, the index is unsharded (1 physical shard).',
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY", "NEEDS_REPAIR"])
        .describe("Output only. The serving state of the index.").optional(),
      unique: z.boolean().describe(
        "Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents.",
      ).optional(),
    })).describe("The indexes supported for this field.").optional(),
    reverting: z.boolean().describe(
      "Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`.",
    ).optional(),
    usesAncestorConfig: z.boolean().describe(
      "Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly.",
    ).optional(),
  }).describe(
    "The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes.",
  ).optional(),
  name: z.string().describe(
    "Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value`, e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.",
  ).optional(),
  ttlConfig: z.object({
    expirationOffset: z.string().describe(
      "Optional. The offset, relative to the timestamp value from the TTL-enabled field, used to determine the document's expiration time. `expiration_offset.seconds` must be between 0 and 2,147,483,647 inclusive. Values more precise than seconds are rejected. If unset, defaults to 0, in which case the expiration time is the same as the timestamp value from the TTL-enabled field.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "ACTIVE", "NEEDS_REPAIR"])
      .describe("Output only. The state of the TTL configuration.").optional(),
  }).describe(
    "The TTL configuration for this `Field`. Setting or unsetting this will enable or disable the TTL for documents that have this `Field`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  indexConfig: z.object({
    ancestorField: z.string(),
    indexes: z.array(z.object({
      apiScope: z.string(),
      density: z.string(),
      fields: z.array(z.object({
        arrayConfig: z.unknown(),
        fieldPath: z.unknown(),
        order: z.unknown(),
        searchConfig: z.unknown(),
        vectorConfig: z.unknown(),
      })),
      multikey: z.boolean(),
      name: z.string(),
      queryScope: z.string(),
      searchIndexOptions: z.object({
        textLanguage: z.string(),
        textLanguageOverrideFieldPath: z.string(),
      }),
      shardCount: z.number(),
      state: z.string(),
      unique: z.boolean(),
    })),
    reverting: z.boolean(),
    usesAncestorConfig: z.boolean(),
  }).optional(),
  name: z.string(),
  ttlConfig: z.object({
    expirationOffset: z.string(),
    state: z.string(),
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
  indexConfig: z.object({
    ancestorField: z.string().describe(
      "Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it *would* be set if this field had no index configuration (when `uses_ancestor_config` is false).",
    ).optional(),
    indexes: z.array(z.object({
      apiScope: z.enum([
        "ANY_API",
        "DATASTORE_MODE_API",
        "MONGODB_COMPATIBLE_API",
      ]).describe("The API scope supported by this index.").optional(),
      density: z.enum([
        "DENSITY_UNSPECIFIED",
        "SPARSE_ALL",
        "SPARSE_ANY",
        "DENSE",
      ]).describe("Immutable. The density configuration of the index.")
        .optional(),
      fields: z.array(z.object({
        arrayConfig: z.unknown().describe(
          "Indicates that this field supports operations on `array_value`s.",
        ).optional(),
        fieldPath: z.unknown().describe(
          "Can be __name__. For single field indexes, this must match the name of the field or may be omitted.",
        ).optional(),
        order: z.unknown().describe(
          "Indicates that this field supports ordering by the specified order or comparing using =,!=, , >=.",
        ).optional(),
        searchConfig: z.unknown().describe(
          "Indicates that this field supports search operations.",
        ).optional(),
        vectorConfig: z.unknown().describe(
          "Indicates that this field supports nearest neighbor and distance operations on vector.",
        ).optional(),
      })).describe(
        "The fields supported by this index. At most 100 fields may be specified. In Standard edition databases only: - At least 2 fields must be specified. - The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in the index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified).",
      ).optional(),
      multikey: z.boolean().describe(
        "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      name: z.string().describe(
        "A server-defined name for this index. Output only. When used in the google.firestore.admin.v1.Index resource, the value is of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` When used in the google.firestore.admin.v1.Field resource, the value is empty.",
      ).optional(),
      queryScope: z.enum([
        "QUERY_SCOPE_UNSPECIFIED",
        "COLLECTION",
        "COLLECTION_GROUP",
        "COLLECTION_RECURSIVE",
      ]).describe(
        "Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index.",
      ).optional(),
      searchIndexOptions: z.object({
        textLanguage: z.string().describe(
          "Optional. The language to use for text search indexes. Used as the default language if not overridden at the document level by specifying the `text_language_override_field`. The language is specified as a BCP 47 language code. For indexes with MONGODB_COMPATIBLE_API ApiScope: If unspecified, the default language is English. For indexes with `ANY_API` ApiScope: If unspecified, the default behavior is autodetect.",
        ).optional(),
        textLanguageOverrideFieldPath: z.string().describe(
          'Optional. The field in the document that specifies which language to use for that specific document. For indexes with MONGODB_COMPATIBLE_API ApiScope: if unspecified, the language is taken from the "language" field if it exists or from `text_language` if it does not.',
        ).optional(),
      }).describe(
        "Optional. Options for search indexes that are at the index definition level. This field is only currently supported for indexes with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      shardCount: z.number().int().describe(
        'Optional. The number of physical shards for the index. In Cloud Firestore, data and index entries are stored in contiguous, ordered key ranges called splits. While document keys within a collection are hashed to distribute write traffic across splits, secondary index entries are ordered lexicographically by their indexed field values. When an index contains fields with sequential or monotonically increasing or decreasing values (such as timestamps or auto-incrementing IDs), every incoming index write targets the boundary of the index keyspace on a single split. Because sequential writes continuously advance to the newest split at the edge of the range, automatic load-based splitting cannot divide the write traffic across storage servers. Under high write rates, this concentration creates an append hotspot on that single split, resulting in elevated write latency, contention errors, and transaction aborts. Sharded indexes solve this write bottleneck by hash partitioning the secondary index keyspace. When `shard_count` is configured to N, Firestore automatically prepends a virtual computed shard field (with values from 0 to N-1) as the leading field of the index. This splits a single sequential key range into N independent key ranges, uniformly scattering adjacent writes across distinct splits and storage servers to enable linear write scaling. Query trade-offs: Hash partitioning trades query performance for write throughput. Because matching index entries are scattered across all shards, queries executing against a sharded index cannot read from a single contiguous range. The query engine must fan out parallel seeks across all N shards and merge the ordered results. Even index point lookups and queries with `LIMIT 1` must seek across all N shards. Sizing and best practices: - Indexes cannot be updated in-place. `shard_count` is immutable once an index is created; to "reshard" an index, create a new index with the desired `shard_count` and delete the original index. - Use sharded indexes only for indexes experiencing write bottlenecks (typically exceeding 500-1,000 writes/sec) on sequential or timestamp fields. - Do not shard indexes on uniformly distributed fields (such as UUIDs or hash tokens), where writes naturally spread across splits without sharding. Sharding uniform indexes adds query overhead without improving write throughput. - Do not shard read-heavy or low-write collections. - Size `shard_count` based on expected peak write throughput. Because a single split sustains roughly 500-1,000 writes/sec on sequential keys, estimate `shard_count ≈ ceil(peak_write_qps / 500)`. - e.g., 4 for up to ~2,000-4,000 writes/sec, 16 for up to ~10,000+ writes/sec. - Setting an excessively high shard count produces diminishing write returns while needlessly increasing read latency and seek costs. If <= 1, the index is unsharded (1 physical shard).',
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY", "NEEDS_REPAIR"])
        .describe("Output only. The serving state of the index.").optional(),
      unique: z.boolean().describe(
        "Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents.",
      ).optional(),
    })).describe("The indexes supported for this field.").optional(),
    reverting: z.boolean().describe(
      "Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`.",
    ).optional(),
    usesAncestorConfig: z.boolean().describe(
      "Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly.",
    ).optional(),
  }).describe(
    "The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes.",
  ).optional(),
  name: z.string().describe(
    "Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value`, e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.",
  ).optional(),
  ttlConfig: z.object({
    expirationOffset: z.string().describe(
      "Optional. The offset, relative to the timestamp value from the TTL-enabled field, used to determine the document's expiration time. `expiration_offset.seconds` must be between 0 and 2,147,483,647 inclusive. Values more precise than seconds are rejected. If unset, defaults to 0, in which case the expiration time is the same as the timestamp value from the TTL-enabled field.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "ACTIVE", "NEEDS_REPAIR"])
      .describe("Output only. The state of the TTL configuration.").optional(),
  }).describe(
    "The TTL configuration for this `Field`. Setting or unsetting this will enable or disable the TTL for documents that have this `Field`.",
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

/** Swamp extension model for Google Cloud Firestore Databases.CollectionGroups.Fields. Registered at `@swamp/gcp/firestore/databases-collectiongroups-fields`. */
export const model = {
  type: "@swamp/gcp/firestore/databases-collectiongroups-fields",
  version: "2026.10.02.1",
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
      toVersion: "2026.04.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
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
      toVersion: "2026.06.03.1",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
      toVersion: "2026.08.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        'Represents a single field in the database. Fields are grouped by their "Colle...',
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a fields",
      arguments: z.object({
        identifier: z.string().describe("The name of the fields"),
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
      description: "Update fields attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific fields by name (e.g. one discovered by list)",
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
        if (g["indexConfig"] !== undefined) {
          body["indexConfig"] = g["indexConfig"];
        }
        if (g["ttlConfig"] !== undefined) body["ttlConfig"] = g["ttlConfig"];
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
    sync: {
      description: "Sync fields state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific fields by name (e.g. one discovered by list)",
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
      description: "List fields resources",
      arguments: z.object({
        filter: z.string().describe(
          "The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with a filter that includes `indexConfig.usesAncestorConfig:false` or `ttlConfig:*`.",
        ).optional(),
        pageSize: z.number().describe("The number of results to return.")
          .optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "fields",
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
  },
};
