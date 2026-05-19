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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
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
        vectorConfig: z.unknown().describe(
          "The index configuration to support vector search operations",
        ).optional(),
      })).describe(
        "The fields supported by this index. For composite indexes, this requires a minimum of 2 and a maximum of 100 fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field.",
      ).optional(),
      multikey: z.boolean().describe(
        "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      name: z.string().describe(
        "Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty.",
      ).optional(),
      queryScope: z.enum([
        "QUERY_SCOPE_UNSPECIFIED",
        "COLLECTION",
        "COLLECTION_GROUP",
        "COLLECTION_RECURSIVE",
      ]).describe(
        "Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index.",
      ).optional(),
      shardCount: z.number().int().describe(
        "Optional. The number of shards for the index.",
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
  }).describe("The index configuration for this field.").optional(),
  name: z.string().describe(
    "Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value`, e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.",
  ).optional(),
  ttlConfig: z.object({
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "ACTIVE", "NEEDS_REPAIR"])
      .describe("Output only. The state of the TTL configuration.").optional(),
  }).describe(
    "The TTL (time-to-live) configuration for documents that have this `Field` set. Storing a timestamp value into a TTL-enabled field will be treated as the document's absolute expiration time. For Enterprise edition databases, the timestamp value may also be stored in an array value in the TTL-enabled field. Timestamp values in the past indicate that the document is eligible for immediate expiration. Using any other data type or leaving the field absent will disable expiration for the individual document.",
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
        vectorConfig: z.unknown(),
      })),
      multikey: z.boolean(),
      name: z.string(),
      queryScope: z.string(),
      shardCount: z.number(),
      state: z.string(),
      unique: z.boolean(),
    })),
    reverting: z.boolean(),
    usesAncestorConfig: z.boolean(),
  }).optional(),
  name: z.string(),
  ttlConfig: z.object({
    state: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
        vectorConfig: z.unknown().describe(
          "The index configuration to support vector search operations",
        ).optional(),
      })).describe(
        "The fields supported by this index. For composite indexes, this requires a minimum of 2 and a maximum of 100 fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field.",
      ).optional(),
      multikey: z.boolean().describe(
        "Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope.",
      ).optional(),
      name: z.string().describe(
        "Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty.",
      ).optional(),
      queryScope: z.enum([
        "QUERY_SCOPE_UNSPECIFIED",
        "COLLECTION",
        "COLLECTION_GROUP",
        "COLLECTION_RECURSIVE",
      ]).describe(
        "Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index.",
      ).optional(),
      shardCount: z.number().int().describe(
        "Optional. The number of shards for the index.",
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
  }).describe("The index configuration for this field.").optional(),
  name: z.string().describe(
    "Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value`, e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.",
  ).optional(),
  ttlConfig: z.object({
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "ACTIVE", "NEEDS_REPAIR"])
      .describe("Output only. The state of the TTL configuration.").optional(),
  }).describe(
    "The TTL (time-to-live) configuration for documents that have this `Field` set. Storing a timestamp value into a TTL-enabled field will be treated as the document's absolute expiration time. For Enterprise edition databases, the timestamp value may also be stored in an array value in the TTL-enabled field. Timestamp values in the past indicate that the document is eligible for immediate expiration. Using any other data type or leaving the field absent will disable expiration for the individual document.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firestore Databases.CollectionGroups.Fields. Registered at `@swamp/gcp/firestore/databases-collectiongroups-fields`. */
export const model = {
  type: "@swamp/gcp/firestore/databases-collectiongroups-fields",
  version: "2026.05.19.2",
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
      description: "Update fields attributes",
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
        if (g["indexConfig"] !== undefined) {
          body["indexConfig"] = g["indexConfig"];
        }
        if (g["ttlConfig"] !== undefined) body["ttlConfig"] = g["ttlConfig"];
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
    sync: {
      description: "Sync fields state from GCP",
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
