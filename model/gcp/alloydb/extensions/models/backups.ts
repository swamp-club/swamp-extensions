// Auto-generated extension model for @swamp/gcp/alloydb/backups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AlloyDB Backups.
 *
 * Message describing Backup object
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
  return `${parent}/backups/${shortName}`;
}

const BASE_URL = "https://alloydb.googleapis.com/";

const GET_CONFIG = {
  "id": "alloydb.projects.locations.backups.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "alloydb.projects.locations.backups.create",
  "path": "v1/{+parent}/backups",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backupId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "alloydb.projects.locations.backups.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "alloydb.projects.locations.backups.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  clusterName: z.string().describe(
    "Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}).",
  ).optional(),
  description: z.string().describe("User-provided description of the backup.")
    .optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Backup.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  expiryQuantity: z.object({
    retentionCount: z.number().int().describe(
      "Output only. The backup's position among its backups with the same source cluster and type, by descending chronological order create time(i.e. newest first).",
    ).optional(),
    totalRetentionCount: z.number().int().describe(
      "Output only. The length of the quantity-based queue, specified by the backup's retention policy.",
    ).optional(),
  }).describe(
    "A backup's position in a quantity-based retention queue, of backups with the same source cluster and type, with length, retention, specified by the backup's retention policy. Once the position is greater than the retention, the backup is eligible to be garbage collected. Example: 5 backups from the same source cluster and type with a quantity-based retention of 3 and denoted by backup_id (position, retention). Safe: backup_5 (1, 3), backup_4, (2, 3), backup_3 (3, 3). Awaiting garbage collection: backup_2 (4, 3), backup_1 (5, 3)",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "ON_DEMAND", "AUTOMATED", "CONTINUOUS"])
    .describe("The backup type, which suggests the trigger for the backup.")
    .optional(),
  backupId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  clusterName: z.string().optional(),
  clusterUid: z.string().optional(),
  createCompletionTime: z.string().optional(),
  createTime: z.string().optional(),
  databaseVersion: z.string().optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  encryptionInfo: z.object({
    encryptionType: z.string(),
    kmsKeyVersions: z.array(z.string()),
  }).optional(),
  etag: z.string().optional(),
  expiryQuantity: z.object({
    retentionCount: z.number(),
    totalRetentionCount: z.number(),
  }).optional(),
  expiryTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  sizeBytes: z.string().optional(),
  state: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  clusterName: z.string().describe(
    "Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}).",
  ).optional(),
  description: z.string().describe("User-provided description of the backup.")
    .optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Backup.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  expiryQuantity: z.object({
    retentionCount: z.number().int().describe(
      "Output only. The backup's position among its backups with the same source cluster and type, by descending chronological order create time(i.e. newest first).",
    ).optional(),
    totalRetentionCount: z.number().int().describe(
      "Output only. The length of the quantity-based queue, specified by the backup's retention policy.",
    ).optional(),
  }).describe(
    "A backup's position in a quantity-based retention queue, of backups with the same source cluster and type, with length, retention, specified by the backup's retention policy. Once the position is greater than the retention, the backup is eligible to be garbage collected. Example: 5 backups from the same source cluster and type with a quantity-based retention of 3 and denoted by backup_id (position, retention). Safe: backup_5 (1, 3), backup_4, (2, 3), backup_3 (3, 3). Awaiting garbage collection: backup_2 (4, 3), backup_1 (5, 3)",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "ON_DEMAND", "AUTOMATED", "CONTINUOUS"])
    .describe("The backup type, which suggests the trigger for the backup.")
    .optional(),
  backupId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud AlloyDB Backups. Registered at `@swamp/gcp/alloydb/backups`. */
export const model = {
  type: "@swamp/gcp/alloydb/backups",
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
      toVersion: "2026.05.18.1",
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
      description: "Message describing Backup object",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backups",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["clusterName"] !== undefined) {
          body["clusterName"] = g["clusterName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["expiryQuantity"] !== undefined) {
          body["expiryQuantity"] = g["expiryQuantity"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["backupId"] !== undefined) body["backupId"] = g["backupId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a backups",
      arguments: z.object({
        identifier: z.string().describe("The name of the backups"),
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
    update: {
      description: "Update backups attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["clusterName"] !== undefined) {
          body["clusterName"] = g["clusterName"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["expiryQuantity"] !== undefined) {
          body["expiryQuantity"] = g["expiryQuantity"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the backups",
      arguments: z.object({
        identifier: z.string().describe("The name of the backups"),
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
      description: "Sync backups state from GCP",
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
