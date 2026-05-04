// Auto-generated extension model for @swamp/gcp/firestore/databases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firestore Databases.
 *
 * A Cloud Firestore Database.
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
  return `${parent}/databases/${shortName}`;
}

const BASE_URL = "https://firestore.googleapis.com/";

const GET_CONFIG = {
  "id": "firestore.projects.databases.get",
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
  "id": "firestore.projects.databases.create",
  "path": "v1/{+parent}/databases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "databaseId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "firestore.projects.databases.patch",
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
  "id": "firestore.projects.databases.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  appEngineIntegrationMode: z.enum([
    "APP_ENGINE_INTEGRATION_MODE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe("The App Engine integration mode to use for this database.")
    .optional(),
  cmekConfig: z.object({
    activeKeyVersion: z.array(z.string()).describe(
      "Output only. Currently in-use [KMS key versions](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions). During [key rotation](https://cloud.google.com/kms/docs/key-rotation), there can be multiple in-use key versions. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{key_version}`.",
    ).optional(),
    kmsKeyName: z.string().describe(
      "Required. Only keys in the same location as this database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "The CMEK (Customer Managed Encryption Key) configuration for a Firestore database. If not present, the database is secured by the default Google encryption key.",
  ).optional(),
  concurrencyMode: z.enum([
    "CONCURRENCY_MODE_UNSPECIFIED",
    "OPTIMISTIC",
    "PESSIMISTIC",
    "OPTIMISTIC_WITH_ENTITY_GROUPS",
  ]).describe(
    "The concurrency control mode to use for this database. If unspecified in a CreateDatabase request, this will default based on the database edition: Optimistic for Enterprise and Pessimistic for all other databases.",
  ).optional(),
  databaseEdition: z.enum([
    "DATABASE_EDITION_UNSPECIFIED",
    "STANDARD",
    "ENTERPRISE",
  ]).describe("Immutable. The edition of the database.").optional(),
  deleteProtectionState: z.enum([
    "DELETE_PROTECTION_STATE_UNSPECIFIED",
    "DELETE_PROTECTION_DISABLED",
    "DELETE_PROTECTION_ENABLED",
  ]).describe("State of delete protection for the database.").optional(),
  firestoreDataAccessMode: z.enum([
    "DATA_ACCESS_MODE_UNSPECIFIED",
    "DATA_ACCESS_MODE_ENABLED",
    "DATA_ACCESS_MODE_DISABLED",
  ]).describe(
    "Optional. The Firestore API data access mode to use for this database. If not set on write: - the default value is DATA_ACCESS_MODE_DISABLED for Enterprise Edition. - the default value is DATA_ACCESS_MODE_ENABLED for Standard Edition.",
  ).optional(),
  locationId: z.string().describe(
    "Required. The location of the database. Available locations are listed at https://cloud.google.com/firestore/docs/locations.",
  ).optional(),
  mongodbCompatibleDataAccessMode: z.enum([
    "DATA_ACCESS_MODE_UNSPECIFIED",
    "DATA_ACCESS_MODE_ENABLED",
    "DATA_ACCESS_MODE_DISABLED",
  ]).describe(
    "Optional. The MongoDB compatible API data access mode to use for this database. If not set on write, the default value is DATA_ACCESS_MODE_ENABLED for Enterprise Edition. The value is always DATA_ACCESS_MODE_DISABLED for Standard Edition.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the Database. Format: `projects/{project}/databases/{database}`",
  ).optional(),
  pointInTimeRecoveryEnablement: z.enum([
    "POINT_IN_TIME_RECOVERY_ENABLEMENT_UNSPECIFIED",
    "POINT_IN_TIME_RECOVERY_ENABLED",
    "POINT_IN_TIME_RECOVERY_DISABLED",
  ]).describe("Whether to enable the PITR feature on this database.")
    .optional(),
  realtimeUpdatesMode: z.enum([
    "REALTIME_UPDATES_MODE_UNSPECIFIED",
    "REALTIME_UPDATES_MODE_ENABLED",
    "REALTIME_UPDATES_MODE_DISABLED",
  ]).describe(
    "Immutable. The default Realtime Updates mode to use for this database.",
  ).optional(),
  sourceInfo: z.object({
    backup: z.object({
      backup: z.string().describe(
        "The resource name of the backup that was used to restore this database. Format: `projects/{project}/locations/{location}/backups/{backup}`.",
      ).optional(),
    }).describe(
      "Information about a backup that was used to restore a database.",
    ).optional(),
    operation: z.string().describe(
      "The associated long-running operation. This field may not be set after the operation has completed. Format: `projects/{project}/databases/{database}/operations/{operation}`.",
    ).optional(),
  }).describe("Information about the provenance of this database.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  type: z.enum([
    "DATABASE_TYPE_UNSPECIFIED",
    "FIRESTORE_NATIVE",
    "DATASTORE_MODE",
  ]).describe(
    "Required. The type of the database. See https://cloud.google.com/datastore/docs/firestore-or-datastore for information about how to choose.",
  ).optional(),
  databaseId: z.string().describe(
    'Required. The ID to use for the database, which will become the final component of the database\'s resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. "(default)" database ID is also valid if the database is Standard edition.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appEngineIntegrationMode: z.string().optional(),
  cmekConfig: z.object({
    activeKeyVersion: z.array(z.string()),
    kmsKeyName: z.string(),
  }).optional(),
  concurrencyMode: z.string().optional(),
  createTime: z.string().optional(),
  databaseEdition: z.string().optional(),
  deleteProtectionState: z.string().optional(),
  deleteTime: z.string().optional(),
  earliestVersionTime: z.string().optional(),
  etag: z.string().optional(),
  firestoreDataAccessMode: z.string().optional(),
  freeTier: z.boolean().optional(),
  keyPrefix: z.string().optional(),
  locationId: z.string().optional(),
  mongodbCompatibleDataAccessMode: z.string().optional(),
  name: z.string(),
  pointInTimeRecoveryEnablement: z.string().optional(),
  previousId: z.string().optional(),
  realtimeUpdatesMode: z.string().optional(),
  sourceInfo: z.object({
    backup: z.object({
      backup: z.string(),
    }),
    operation: z.string(),
  }).optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  versionRetentionPeriod: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appEngineIntegrationMode: z.enum([
    "APP_ENGINE_INTEGRATION_MODE_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe("The App Engine integration mode to use for this database.")
    .optional(),
  cmekConfig: z.object({
    activeKeyVersion: z.array(z.string()).describe(
      "Output only. Currently in-use [KMS key versions](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions). During [key rotation](https://cloud.google.com/kms/docs/key-rotation), there can be multiple in-use key versions. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{key_version}`.",
    ).optional(),
    kmsKeyName: z.string().describe(
      "Required. Only keys in the same location as this database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "The CMEK (Customer Managed Encryption Key) configuration for a Firestore database. If not present, the database is secured by the default Google encryption key.",
  ).optional(),
  concurrencyMode: z.enum([
    "CONCURRENCY_MODE_UNSPECIFIED",
    "OPTIMISTIC",
    "PESSIMISTIC",
    "OPTIMISTIC_WITH_ENTITY_GROUPS",
  ]).describe(
    "The concurrency control mode to use for this database. If unspecified in a CreateDatabase request, this will default based on the database edition: Optimistic for Enterprise and Pessimistic for all other databases.",
  ).optional(),
  databaseEdition: z.enum([
    "DATABASE_EDITION_UNSPECIFIED",
    "STANDARD",
    "ENTERPRISE",
  ]).describe("Immutable. The edition of the database.").optional(),
  deleteProtectionState: z.enum([
    "DELETE_PROTECTION_STATE_UNSPECIFIED",
    "DELETE_PROTECTION_DISABLED",
    "DELETE_PROTECTION_ENABLED",
  ]).describe("State of delete protection for the database.").optional(),
  firestoreDataAccessMode: z.enum([
    "DATA_ACCESS_MODE_UNSPECIFIED",
    "DATA_ACCESS_MODE_ENABLED",
    "DATA_ACCESS_MODE_DISABLED",
  ]).describe(
    "Optional. The Firestore API data access mode to use for this database. If not set on write: - the default value is DATA_ACCESS_MODE_DISABLED for Enterprise Edition. - the default value is DATA_ACCESS_MODE_ENABLED for Standard Edition.",
  ).optional(),
  locationId: z.string().describe(
    "Required. The location of the database. Available locations are listed at https://cloud.google.com/firestore/docs/locations.",
  ).optional(),
  mongodbCompatibleDataAccessMode: z.enum([
    "DATA_ACCESS_MODE_UNSPECIFIED",
    "DATA_ACCESS_MODE_ENABLED",
    "DATA_ACCESS_MODE_DISABLED",
  ]).describe(
    "Optional. The MongoDB compatible API data access mode to use for this database. If not set on write, the default value is DATA_ACCESS_MODE_ENABLED for Enterprise Edition. The value is always DATA_ACCESS_MODE_DISABLED for Standard Edition.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the Database. Format: `projects/{project}/databases/{database}`",
  ).optional(),
  pointInTimeRecoveryEnablement: z.enum([
    "POINT_IN_TIME_RECOVERY_ENABLEMENT_UNSPECIFIED",
    "POINT_IN_TIME_RECOVERY_ENABLED",
    "POINT_IN_TIME_RECOVERY_DISABLED",
  ]).describe("Whether to enable the PITR feature on this database.")
    .optional(),
  realtimeUpdatesMode: z.enum([
    "REALTIME_UPDATES_MODE_UNSPECIFIED",
    "REALTIME_UPDATES_MODE_ENABLED",
    "REALTIME_UPDATES_MODE_DISABLED",
  ]).describe(
    "Immutable. The default Realtime Updates mode to use for this database.",
  ).optional(),
  sourceInfo: z.object({
    backup: z.object({
      backup: z.string().describe(
        "The resource name of the backup that was used to restore this database. Format: `projects/{project}/locations/{location}/backups/{backup}`.",
      ).optional(),
    }).describe(
      "Information about a backup that was used to restore a database.",
    ).optional(),
    operation: z.string().describe(
      "The associated long-running operation. This field may not be set after the operation has completed. Format: `projects/{project}/databases/{database}/operations/{operation}`.",
    ).optional(),
  }).describe("Information about the provenance of this database.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  type: z.enum([
    "DATABASE_TYPE_UNSPECIFIED",
    "FIRESTORE_NATIVE",
    "DATASTORE_MODE",
  ]).describe(
    "Required. The type of the database. See https://cloud.google.com/datastore/docs/firestore-or-datastore for information about how to choose.",
  ).optional(),
  databaseId: z.string().describe(
    'Required. The ID to use for the database, which will become the final component of the database\'s resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/. "(default)" database ID is also valid if the database is Standard edition.',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firestore Databases. Registered at `@swamp/gcp/firestore/databases`. */
export const model = {
  type: "@swamp/gcp/firestore/databases",
  version: "2026.05.04.1",
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
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Cloud Firestore Database.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a databases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["appEngineIntegrationMode"] !== undefined) {
          body["appEngineIntegrationMode"] = g["appEngineIntegrationMode"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["concurrencyMode"] !== undefined) {
          body["concurrencyMode"] = g["concurrencyMode"];
        }
        if (g["databaseEdition"] !== undefined) {
          body["databaseEdition"] = g["databaseEdition"];
        }
        if (g["deleteProtectionState"] !== undefined) {
          body["deleteProtectionState"] = g["deleteProtectionState"];
        }
        if (g["firestoreDataAccessMode"] !== undefined) {
          body["firestoreDataAccessMode"] = g["firestoreDataAccessMode"];
        }
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["mongodbCompatibleDataAccessMode"] !== undefined) {
          body["mongodbCompatibleDataAccessMode"] =
            g["mongodbCompatibleDataAccessMode"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pointInTimeRecoveryEnablement"] !== undefined) {
          body["pointInTimeRecoveryEnablement"] =
            g["pointInTimeRecoveryEnablement"];
        }
        if (g["realtimeUpdatesMode"] !== undefined) {
          body["realtimeUpdatesMode"] = g["realtimeUpdatesMode"];
        }
        if (g["sourceInfo"] !== undefined) body["sourceInfo"] = g["sourceInfo"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["databaseId"] !== undefined) body["databaseId"] = g["databaseId"];
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
      description: "Get a databases",
      arguments: z.object({
        identifier: z.string().describe("The name of the databases"),
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
      description: "Update databases attributes",
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
        if (g["appEngineIntegrationMode"] !== undefined) {
          body["appEngineIntegrationMode"] = g["appEngineIntegrationMode"];
        }
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["concurrencyMode"] !== undefined) {
          body["concurrencyMode"] = g["concurrencyMode"];
        }
        if (g["deleteProtectionState"] !== undefined) {
          body["deleteProtectionState"] = g["deleteProtectionState"];
        }
        if (g["firestoreDataAccessMode"] !== undefined) {
          body["firestoreDataAccessMode"] = g["firestoreDataAccessMode"];
        }
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["mongodbCompatibleDataAccessMode"] !== undefined) {
          body["mongodbCompatibleDataAccessMode"] =
            g["mongodbCompatibleDataAccessMode"];
        }
        if (g["pointInTimeRecoveryEnablement"] !== undefined) {
          body["pointInTimeRecoveryEnablement"] =
            g["pointInTimeRecoveryEnablement"];
        }
        if (g["sourceInfo"] !== undefined) body["sourceInfo"] = g["sourceInfo"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the databases",
      arguments: z.object({
        identifier: z.string().describe("The name of the databases"),
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
      description: "Sync databases state from GCP",
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
    bulk_delete_documents: {
      description: "bulk delete documents",
      arguments: z.object({
        collectionIds: z.any().optional(),
        namespaceIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["collectionIds"] !== undefined) {
          body["collectionIds"] = args["collectionIds"];
        }
        if (args["namespaceIds"] !== undefined) {
          body["namespaceIds"] = args["namespaceIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.bulkDeleteDocuments",
            "path": "v1/{+name}:bulkDeleteDocuments",
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
    clone: {
      description: "clone",
      arguments: z.object({
        databaseId: z.any().optional(),
        encryptionConfig: z.any().optional(),
        pitrSnapshot: z.any().optional(),
        tags: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["databaseId"] !== undefined) {
          body["databaseId"] = args["databaseId"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["pitrSnapshot"] !== undefined) {
          body["pitrSnapshot"] = args["pitrSnapshot"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.clone",
            "path": "v1/{+parent}/databases:clone",
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
    export_documents: {
      description: "export documents",
      arguments: z.object({
        collectionIds: z.any().optional(),
        namespaceIds: z.any().optional(),
        outputUriPrefix: z.any().optional(),
        snapshotTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["collectionIds"] !== undefined) {
          body["collectionIds"] = args["collectionIds"];
        }
        if (args["namespaceIds"] !== undefined) {
          body["namespaceIds"] = args["namespaceIds"];
        }
        if (args["outputUriPrefix"] !== undefined) {
          body["outputUriPrefix"] = args["outputUriPrefix"];
        }
        if (args["snapshotTime"] !== undefined) {
          body["snapshotTime"] = args["snapshotTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.exportDocuments",
            "path": "v1/{+name}:exportDocuments",
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
    import_documents: {
      description: "import documents",
      arguments: z.object({
        collectionIds: z.any().optional(),
        inputUriPrefix: z.any().optional(),
        namespaceIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["collectionIds"] !== undefined) {
          body["collectionIds"] = args["collectionIds"];
        }
        if (args["inputUriPrefix"] !== undefined) {
          body["inputUriPrefix"] = args["inputUriPrefix"];
        }
        if (args["namespaceIds"] !== undefined) {
          body["namespaceIds"] = args["namespaceIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.importDocuments",
            "path": "v1/{+name}:importDocuments",
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
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
        databaseId: z.any().optional(),
        encryptionConfig: z.any().optional(),
        tags: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["databaseId"] !== undefined) {
          body["databaseId"] = args["databaseId"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "firestore.projects.databases.restore",
            "path": "v1/{+parent}/databases:restore",
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
  },
};
