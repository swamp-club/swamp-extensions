// Auto-generated extension model for @swamp/gcp/logging/buckets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Logging Buckets.
 *
 * Describes a repository in which log entries are stored.
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
  return `${parent}/buckets/${shortName}`;
}

const BASE_URL = "https://logging.googleapis.com/";

const GET_CONFIG = {
  "id": "logging.billingAccounts.locations.buckets.get",
  "path": "v2/{+name}",
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
  "id": "logging.billingAccounts.locations.buckets.create",
  "path": "v2/{+parent}/buckets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "bucketId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "logging.billingAccounts.locations.buckets.patch",
  "path": "v2/{+name}",
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
  "id": "logging.billingAccounts.locations.buckets.delete",
  "path": "v2/{+name}",
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
  analyticsEnabled: z.boolean().describe(
    "Optional. Whether log analytics is enabled for this bucket.Once enabled, log analytics features cannot be disabled.",
  ).optional(),
  cmekSettings: z.object({
    kmsKeyName: z.string().describe(
      'Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK for the Log Router, set this field to a valid kms_key_name for which the associated service account has the needed cloudkms.cryptoKeyEncrypterDecrypter roles assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name or disabled by setting the key name to an empty string. Encryption operations that are in progress will be completed with the key that was in use when they started. Decryption operations will be completed using the key that was used at the time of encryption unless access to that key has been revoked.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.',
    ).optional(),
    kmsKeyVersionName: z.string().describe(
      'Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[VERSION]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1"This is a read-only field used to convey the specific configured CryptoKeyVersion of kms_key that has been configured. It will be populated in cases where the CMEK settings are bound to a single key version.If this field is populated, the kms_key is tied to a specific CryptoKeyVersion.',
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name of the CMEK settings.",
    ).optional(),
    serviceAccountId: z.string().describe(
      "Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK for Log Router, you must first assign the cloudkms.cryptoKeyEncrypterDecrypter role to the service account that the Log Router will use to access your Cloud KMS key. Use GetCmekSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.",
    ).optional(),
  }).describe(
    "Describes the customer-managed encryption key (CMEK) settings associated with a project, folder, organization, billing account, or flexible resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.",
  ).optional(),
  description: z.string().describe("Optional. Describes this bucket.")
    .optional(),
  indexConfigs: z.array(z.object({
    createTime: z.string().describe(
      "Output only. The timestamp when the index was last modified.This is used to return the timestamp, and will be ignored if supplied during update.",
    ).optional(),
    fieldPath: z.string().describe(
      "Required. The LogEntry field path to index.Note that some paths are automatically indexed, and other paths are not eligible for indexing. See indexing documentation( https://docs.cloud.google.com/logging/docs/analyze/custom-index) for details.For example: jsonPayload.request.status",
    ).optional(),
    type: z.enum([
      "INDEX_TYPE_UNSPECIFIED",
      "INDEX_TYPE_STRING",
      "INDEX_TYPE_INTEGER",
    ]).describe("Required. The type of data in this index.").optional(),
  })).describe(
    "Optional. A list of indexed fields and related configuration data.",
  ).optional(),
  locked: z.boolean().describe(
    "Optional. Whether the bucket is locked.The retention period on a locked bucket cannot be changed. Locked buckets may only be deleted if they are empty.",
  ).optional(),
  restrictedFields: z.array(z.string()).describe(
    "Optional. Log entry field paths that are denied access in this bucket.The following fields and their children are eligible: textPayload, jsonPayload, protoPayload, httpRequest, labels, sourceLocation.Restricting a repeated field will restrict all values. Adding a parent will block all child fields. (e.g. foo.bar will block foo.bar.baz)",
  ).optional(),
  retentionDays: z.number().int().describe(
    "Optional. Logs will be retained by default for this amount of time, after which they will automatically be deleted. The minimum retention period is 1 day. If this value is set to zero at bucket creation time, the default time of 30 days will be used.",
  ).optional(),
  bucketId: z.string().describe(
    'Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  analyticsEnabled: z.boolean().optional(),
  cmekSettings: z.object({
    kmsKeyName: z.string(),
    kmsKeyVersionName: z.string(),
    name: z.string(),
    serviceAccountId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  indexConfigs: z.array(z.object({
    createTime: z.string(),
    fieldPath: z.string(),
    type: z.string(),
  })).optional(),
  lifecycleState: z.string().optional(),
  locked: z.boolean().optional(),
  name: z.string(),
  restrictedFields: z.array(z.string()).optional(),
  retentionDays: z.number().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  analyticsEnabled: z.boolean().describe(
    "Optional. Whether log analytics is enabled for this bucket.Once enabled, log analytics features cannot be disabled.",
  ).optional(),
  cmekSettings: z.object({
    kmsKeyName: z.string().describe(
      'Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK for the Log Router, set this field to a valid kms_key_name for which the associated service account has the needed cloudkms.cryptoKeyEncrypterDecrypter roles assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name or disabled by setting the key name to an empty string. Encryption operations that are in progress will be completed with the key that was in use when they started. Decryption operations will be completed using the key that was used at the time of encryption unless access to that key has been revoked.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.',
    ).optional(),
    kmsKeyVersionName: z.string().describe(
      'Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key.KMS key name format: "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[VERSION]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1"This is a read-only field used to convey the specific configured CryptoKeyVersion of kms_key that has been configured. It will be populated in cases where the CMEK settings are bound to a single key version.If this field is populated, the kms_key is tied to a specific CryptoKeyVersion.',
    ).optional(),
    name: z.string().describe(
      "Output only. The resource name of the CMEK settings.",
    ).optional(),
    serviceAccountId: z.string().describe(
      "Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK for Log Router, you must first assign the cloudkms.cryptoKeyEncrypterDecrypter role to the service account that the Log Router will use to access your Cloud KMS key. Use GetCmekSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.",
    ).optional(),
  }).describe(
    "Describes the customer-managed encryption key (CMEK) settings associated with a project, folder, organization, billing account, or flexible resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.",
  ).optional(),
  description: z.string().describe("Optional. Describes this bucket.")
    .optional(),
  indexConfigs: z.array(z.object({
    createTime: z.string().describe(
      "Output only. The timestamp when the index was last modified.This is used to return the timestamp, and will be ignored if supplied during update.",
    ).optional(),
    fieldPath: z.string().describe(
      "Required. The LogEntry field path to index.Note that some paths are automatically indexed, and other paths are not eligible for indexing. See indexing documentation( https://docs.cloud.google.com/logging/docs/analyze/custom-index) for details.For example: jsonPayload.request.status",
    ).optional(),
    type: z.enum([
      "INDEX_TYPE_UNSPECIFIED",
      "INDEX_TYPE_STRING",
      "INDEX_TYPE_INTEGER",
    ]).describe("Required. The type of data in this index.").optional(),
  })).describe(
    "Optional. A list of indexed fields and related configuration data.",
  ).optional(),
  locked: z.boolean().describe(
    "Optional. Whether the bucket is locked.The retention period on a locked bucket cannot be changed. Locked buckets may only be deleted if they are empty.",
  ).optional(),
  restrictedFields: z.array(z.string()).describe(
    "Optional. Log entry field paths that are denied access in this bucket.The following fields and their children are eligible: textPayload, jsonPayload, protoPayload, httpRequest, labels, sourceLocation.Restricting a repeated field will restrict all values. Adding a parent will block all child fields. (e.g. foo.bar will block foo.bar.baz)",
  ).optional(),
  retentionDays: z.number().int().describe(
    "Optional. Logs will be retained by default for this amount of time, after which they will automatically be deleted. The minimum retention period is 1 day. If this value is set to zero at bucket creation time, the default time of 30 days will be used.",
  ).optional(),
  bucketId: z.string().describe(
    'Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Logging Buckets. Registered at `@swamp/gcp/logging/buckets`. */
export const model = {
  type: "@swamp/gcp/logging/buckets",
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
      toVersion: "2026.04.23.1",
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
      description: "Describes a repository in which log entries are stored.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a buckets",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["analyticsEnabled"] !== undefined) {
          body["analyticsEnabled"] = g["analyticsEnabled"];
        }
        if (g["cmekSettings"] !== undefined) {
          body["cmekSettings"] = g["cmekSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["indexConfigs"] !== undefined) {
          body["indexConfigs"] = g["indexConfigs"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["restrictedFields"] !== undefined) {
          body["restrictedFields"] = g["restrictedFields"];
        }
        if (g["retentionDays"] !== undefined) {
          body["retentionDays"] = g["retentionDays"];
        }
        if (g["bucketId"] !== undefined) body["bucketId"] = g["bucketId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "lifecycleState",
              "readyValues": ["ACTIVE"],
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
      description: "Get a buckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the buckets"),
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
      description: "Update buckets attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["analyticsEnabled"] !== undefined) {
          body["analyticsEnabled"] = g["analyticsEnabled"];
        }
        if (g["cmekSettings"] !== undefined) {
          body["cmekSettings"] = g["cmekSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["indexConfigs"] !== undefined) {
          body["indexConfigs"] = g["indexConfigs"];
        }
        if (g["restrictedFields"] !== undefined) {
          body["restrictedFields"] = g["restrictedFields"];
        }
        if (g["retentionDays"] !== undefined) {
          body["retentionDays"] = g["retentionDays"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "lifecycleState",
              "readyValues": ["ACTIVE"],
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
      description: "Delete the buckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the buckets"),
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
      description: "Sync buckets state from GCP",
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
    create_async: {
      description: "create async",
      arguments: z.object({
        analyticsEnabled: z.any().optional(),
        cmekSettings: z.any().optional(),
        createTime: z.any().optional(),
        description: z.any().optional(),
        indexConfigs: z.any().optional(),
        lifecycleState: z.any().optional(),
        locked: z.any().optional(),
        name: z.any().optional(),
        restrictedFields: z.any().optional(),
        retentionDays: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["analyticsEnabled"] !== undefined) {
          body["analyticsEnabled"] = args["analyticsEnabled"];
        }
        if (args["cmekSettings"] !== undefined) {
          body["cmekSettings"] = args["cmekSettings"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["indexConfigs"] !== undefined) {
          body["indexConfigs"] = args["indexConfigs"];
        }
        if (args["lifecycleState"] !== undefined) {
          body["lifecycleState"] = args["lifecycleState"];
        }
        if (args["locked"] !== undefined) body["locked"] = args["locked"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["restrictedFields"] !== undefined) {
          body["restrictedFields"] = args["restrictedFields"];
        }
        if (args["retentionDays"] !== undefined) {
          body["retentionDays"] = args["retentionDays"];
        }
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.billingAccounts.locations.buckets.createAsync",
            "path": "v2/{+parent}/buckets:createAsync",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "bucketId": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.billingAccounts.locations.buckets.undelete",
            "path": "v2/{+name}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_async: {
      description: "update async",
      arguments: z.object({
        analyticsEnabled: z.any().optional(),
        cmekSettings: z.any().optional(),
        createTime: z.any().optional(),
        description: z.any().optional(),
        indexConfigs: z.any().optional(),
        lifecycleState: z.any().optional(),
        locked: z.any().optional(),
        name: z.any().optional(),
        restrictedFields: z.any().optional(),
        retentionDays: z.any().optional(),
        updateTime: z.any().optional(),
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
        if (args["analyticsEnabled"] !== undefined) {
          body["analyticsEnabled"] = args["analyticsEnabled"];
        }
        if (args["cmekSettings"] !== undefined) {
          body["cmekSettings"] = args["cmekSettings"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["indexConfigs"] !== undefined) {
          body["indexConfigs"] = args["indexConfigs"];
        }
        if (args["lifecycleState"] !== undefined) {
          body["lifecycleState"] = args["lifecycleState"];
        }
        if (args["locked"] !== undefined) body["locked"] = args["locked"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["restrictedFields"] !== undefined) {
          body["restrictedFields"] = args["restrictedFields"];
        }
        if (args["retentionDays"] !== undefined) {
          body["retentionDays"] = args["retentionDays"];
        }
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.billingAccounts.locations.buckets.updateAsync",
            "path": "v2/{+name}:updateAsync",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
