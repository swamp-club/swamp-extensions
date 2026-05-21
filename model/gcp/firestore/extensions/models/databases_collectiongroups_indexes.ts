// Auto-generated extension model for @swamp/gcp/firestore/databases-collectiongroups-indexes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firestore Databases.CollectionGroups.Indexes.
 *
 * Cloud Firestore indexes enable simple and complex queries against documents in a database.
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
  return `${parent}/indexes/${shortName}`;
}

const BASE_URL = "https://firestore.googleapis.com/";

const GET_CONFIG = {
  "id": "firestore.projects.databases.collectionGroups.indexes.get",
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
  "id": "firestore.projects.databases.collectionGroups.indexes.create",
  "path": "v1/{+parent}/indexes",
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

const DELETE_CONFIG = {
  "id": "firestore.projects.databases.collectionGroups.indexes.delete",
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
  "id": "firestore.projects.databases.collectionGroups.indexes.list",
  "path": "v1/{+parent}/indexes",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  apiScope: z.enum(["ANY_API", "DATASTORE_MODE_API", "MONGODB_COMPATIBLE_API"])
    .describe("The API scope supported by this index.").optional(),
  density: z.enum(["DENSITY_UNSPECIFIED", "SPARSE_ALL", "SPARSE_ANY", "DENSE"])
    .describe("Immutable. The density configuration of the index.").optional(),
  fields: z.array(z.object({
    arrayConfig: z.enum(["ARRAY_CONFIG_UNSPECIFIED", "CONTAINS"]).describe(
      "Indicates that this field supports operations on `array_value`s.",
    ).optional(),
    fieldPath: z.string().describe(
      "Can be __name__. For single field indexes, this must match the name of the field or may be omitted.",
    ).optional(),
    order: z.enum(["ORDER_UNSPECIFIED", "ASCENDING", "DESCENDING"]).describe(
      "Indicates that this field supports ordering by the specified order or comparing using =,!=, , >=.",
    ).optional(),
    searchConfig: z.object({
      geoSpec: z.object({
        geoJsonIndexingDisabled: z.boolean().describe(
          "Optional. Disables geoJSON indexing for the field. By default, geoJSON points are indexed. Firestore GeoPoints are indexed regardless of this value.",
        ).optional(),
      }).describe(
        "The specification for how to build a geo search index for a field.",
      ).optional(),
      textSpec: z.object({
        indexSpecs: z.array(z.unknown()).describe(
          "Required. Specifications for how the field should be indexed. Repeated so that the field can be indexed in multiple ways.",
        ).optional(),
      }).describe(
        "The specification for how to build a text search index for a field.",
      ).optional(),
    }).describe("The configuration for how to index a field for search.")
      .optional(),
    vectorConfig: z.object({
      dimension: z.number().int().describe(
        "Required. The vector dimension this configuration applies to. The resulting index will only include vectors of this dimension, and can be used for vector search with the same dimension.",
      ).optional(),
      flat: z.object({}).describe(
        "An index that stores vectors in a flat data structure, and supports exhaustive search.",
      ).optional(),
    }).describe("The index configuration to support vector search operations")
      .optional(),
  })).describe(
    "The fields supported by this index. For composite indexes, this requires a minimum of 2 and a maximum of 100 fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field.",
  ).optional(),
  multikey: z.boolean().describe(
    "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
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
      'Optional. The field in the document that specifies which language to use for that specific document. If unspecified, the language is taken from the "language" field if it exists or from `text_language` if it does not.',
    ).optional(),
  }).describe("Options for search indexes at the definition level.").optional(),
  shardCount: z.number().int().describe(
    "Optional. The number of shards for the index.",
  ).optional(),
  unique: z.boolean().describe(
    "Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  apiScope: z.string().optional(),
  density: z.string().optional(),
  fields: z.array(z.object({
    arrayConfig: z.string(),
    fieldPath: z.string(),
    order: z.string(),
    searchConfig: z.object({
      geoSpec: z.object({
        geoJsonIndexingDisabled: z.boolean(),
      }),
      textSpec: z.object({
        indexSpecs: z.array(z.unknown()),
      }),
    }),
    vectorConfig: z.object({
      dimension: z.number(),
      flat: z.object({}),
    }),
  })).optional(),
  multikey: z.boolean().optional(),
  name: z.string(),
  queryScope: z.string().optional(),
  searchIndexOptions: z.object({
    textLanguage: z.string(),
    textLanguageOverrideFieldPath: z.string(),
  }).optional(),
  shardCount: z.number().optional(),
  state: z.string().optional(),
  unique: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  apiScope: z.enum(["ANY_API", "DATASTORE_MODE_API", "MONGODB_COMPATIBLE_API"])
    .describe("The API scope supported by this index.").optional(),
  density: z.enum(["DENSITY_UNSPECIFIED", "SPARSE_ALL", "SPARSE_ANY", "DENSE"])
    .describe("Immutable. The density configuration of the index.").optional(),
  fields: z.array(z.object({
    arrayConfig: z.enum(["ARRAY_CONFIG_UNSPECIFIED", "CONTAINS"]).describe(
      "Indicates that this field supports operations on `array_value`s.",
    ).optional(),
    fieldPath: z.string().describe(
      "Can be __name__. For single field indexes, this must match the name of the field or may be omitted.",
    ).optional(),
    order: z.enum(["ORDER_UNSPECIFIED", "ASCENDING", "DESCENDING"]).describe(
      "Indicates that this field supports ordering by the specified order or comparing using =,!=, , >=.",
    ).optional(),
    searchConfig: z.object({
      geoSpec: z.object({
        geoJsonIndexingDisabled: z.boolean().describe(
          "Optional. Disables geoJSON indexing for the field. By default, geoJSON points are indexed. Firestore GeoPoints are indexed regardless of this value.",
        ).optional(),
      }).describe(
        "The specification for how to build a geo search index for a field.",
      ).optional(),
      textSpec: z.object({
        indexSpecs: z.array(z.unknown()).describe(
          "Required. Specifications for how the field should be indexed. Repeated so that the field can be indexed in multiple ways.",
        ).optional(),
      }).describe(
        "The specification for how to build a text search index for a field.",
      ).optional(),
    }).describe("The configuration for how to index a field for search.")
      .optional(),
    vectorConfig: z.object({
      dimension: z.number().int().describe(
        "Required. The vector dimension this configuration applies to. The resulting index will only include vectors of this dimension, and can be used for vector search with the same dimension.",
      ).optional(),
      flat: z.object({}).describe(
        "An index that stores vectors in a flat data structure, and supports exhaustive search.",
      ).optional(),
    }).describe("The index configuration to support vector search operations")
      .optional(),
  })).describe(
    "The fields supported by this index. For composite indexes, this requires a minimum of 2 and a maximum of 100 fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field.",
  ).optional(),
  multikey: z.boolean().describe(
    "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
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
      'Optional. The field in the document that specifies which language to use for that specific document. If unspecified, the language is taken from the "language" field if it exists or from `text_language` if it does not.',
    ).optional(),
  }).describe("Options for search indexes at the definition level.").optional(),
  shardCount: z.number().int().describe(
    "Optional. The number of shards for the index.",
  ).optional(),
  unique: z.boolean().describe(
    "Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firestore Databases.CollectionGroups.Indexes. Registered at `@swamp/gcp/firestore/databases-collectiongroups-indexes`. */
export const model = {
  type: "@swamp/gcp/firestore/databases-collectiongroups-indexes",
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
      description: "Added: searchIndexOptions",
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
      description: "Removed: searchIndexOptions",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { searchIndexOptions: _searchIndexOptions, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: searchIndexOptions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: searchIndexOptions",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { searchIndexOptions: _searchIndexOptions, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: searchIndexOptions",
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
        "Cloud Firestore indexes enable simple and complex queries against documents i...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a indexes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["apiScope"] !== undefined) body["apiScope"] = g["apiScope"];
        if (g["density"] !== undefined) body["density"] = g["density"];
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["multikey"] !== undefined) body["multikey"] = g["multikey"];
        if (g["queryScope"] !== undefined) body["queryScope"] = g["queryScope"];
        if (g["searchIndexOptions"] !== undefined) {
          body["searchIndexOptions"] = g["searchIndexOptions"];
        }
        if (g["shardCount"] !== undefined) body["shardCount"] = g["shardCount"];
        if (g["unique"] !== undefined) body["unique"] = g["unique"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a indexes",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexes"),
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
      description: "Delete the indexes",
      arguments: z.object({
        identifier: z.string().describe("The name of the indexes"),
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
      description: "Sync indexes state from GCP",
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
