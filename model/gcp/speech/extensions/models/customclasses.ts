// Auto-generated extension model for @swamp/gcp/speech/customclasses
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Speech-to-Text CustomClasses.
 *
 * A set of words or phrases that represents a common concept likely to appear in your audio, for example a list of passenger ship names. CustomClass items can be substituted into placeholders that you set in PhraseSet phrases.
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
  return `${parent}/customClasses/${shortName}`;
}

const BASE_URL = "https://speech.googleapis.com/";

const GET_CONFIG = {
  "id": "speech.projects.locations.customClasses.get",
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
  "id": "speech.projects.locations.customClasses.create",
  "path": "v1/{+parent}/customClasses",
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
  "id": "speech.projects.locations.customClasses.patch",
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
  "id": "speech.projects.locations.customClasses.delete",
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
  customClass: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used.",
    ).optional(),
    customClassId: z.string().describe(
      "If this custom class is a resource, the custom_class_id is the resource id of the CustomClass. Case sensitive.",
    ).optional(),
    deleteTime: z.string().describe(
      "Output only. The time at which this resource was requested for deletion. This field is not used.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. User-settable, human-readable name for the CustomClass. Must be 63 characters or less. This field is not used.",
    ).optional(),
    etag: z.string().describe(
      "Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. The time at which this resource will be purged. This field is not used.",
    ).optional(),
    items: z.array(z.object({
      value: z.string().describe("The class item's value.").optional(),
    })).describe("A collection of class items.").optional(),
    kmsKeyName: z.string().describe(
      "Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
    kmsKeyVersionName: z.string().describe(
      "Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`.",
    ).optional(),
    name: z.string().describe("The resource name of the custom class.")
      .optional(),
    reconciling: z.boolean().describe(
      "Output only. Whether or not this CustomClass is in the process of being updated. This field is not used.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
      "Output only. The CustomClass lifecycle state. This field is not used.",
    ).optional(),
    uid: z.string().describe(
      "Output only. System-assigned unique identifier for the CustomClass. This field is not used.",
    ).optional(),
  }).describe(
    "A set of words or phrases that represents a common concept likely to appear in your audio, for example a list of passenger ship names. CustomClass items can be substituted into placeholders that you set in PhraseSet phrases.",
  ).optional(),
  customClassId: z.string().describe(
    "If this custom class is a resource, the custom_class_id is the resource id of the CustomClass. Case sensitive.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used.",
  ).optional(),
  deleteTime: z.string().describe(
    "Output only. The time at which this resource was requested for deletion. This field is not used.",
  ).optional(),
  displayName: z.string().describe(
    "Output only. User-settable, human-readable name for the CustomClass. Must be 63 characters or less. This field is not used.",
  ).optional(),
  etag: z.string().describe(
    "Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used.",
  ).optional(),
  expireTime: z.string().describe(
    "Output only. The time at which this resource will be purged. This field is not used.",
  ).optional(),
  items: z.array(z.object({
    value: z.string().describe("The class item's value.").optional(),
  })).describe("A collection of class items.").optional(),
  kmsKeyName: z.string().describe(
    "Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
  ).optional(),
  kmsKeyVersionName: z.string().describe(
    "Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`.",
  ).optional(),
  name: z.string().describe("The resource name of the custom class.")
    .optional(),
  reconciling: z.boolean().describe(
    "Output only. Whether or not this CustomClass is in the process of being updated. This field is not used.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
    "Output only. The CustomClass lifecycle state. This field is not used.",
  ).optional(),
  uid: z.string().describe(
    "Output only. System-assigned unique identifier for the CustomClass. This field is not used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  customClassId: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  expireTime: z.string().optional(),
  items: z.array(z.object({
    value: z.string(),
  })).optional(),
  kmsKeyName: z.string().optional(),
  kmsKeyVersionName: z.string().optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  customClass: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used.",
    ).optional(),
    customClassId: z.string().describe(
      "If this custom class is a resource, the custom_class_id is the resource id of the CustomClass. Case sensitive.",
    ).optional(),
    deleteTime: z.string().describe(
      "Output only. The time at which this resource was requested for deletion. This field is not used.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. User-settable, human-readable name for the CustomClass. Must be 63 characters or less. This field is not used.",
    ).optional(),
    etag: z.string().describe(
      "Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. The time at which this resource will be purged. This field is not used.",
    ).optional(),
    items: z.array(z.object({
      value: z.string().describe("The class item's value.").optional(),
    })).describe("A collection of class items.").optional(),
    kmsKeyName: z.string().describe(
      "Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
    kmsKeyVersionName: z.string().describe(
      "Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`.",
    ).optional(),
    name: z.string().describe("The resource name of the custom class.")
      .optional(),
    reconciling: z.boolean().describe(
      "Output only. Whether or not this CustomClass is in the process of being updated. This field is not used.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
      "Output only. The CustomClass lifecycle state. This field is not used.",
    ).optional(),
    uid: z.string().describe(
      "Output only. System-assigned unique identifier for the CustomClass. This field is not used.",
    ).optional(),
  }).describe(
    "A set of words or phrases that represents a common concept likely to appear in your audio, for example a list of passenger ship names. CustomClass items can be substituted into placeholders that you set in PhraseSet phrases.",
  ).optional(),
  customClassId: z.string().describe(
    "If this custom class is a resource, the custom_class_id is the resource id of the CustomClass. Case sensitive.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used.",
  ).optional(),
  deleteTime: z.string().describe(
    "Output only. The time at which this resource was requested for deletion. This field is not used.",
  ).optional(),
  displayName: z.string().describe(
    "Output only. User-settable, human-readable name for the CustomClass. Must be 63 characters or less. This field is not used.",
  ).optional(),
  etag: z.string().describe(
    "Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used.",
  ).optional(),
  expireTime: z.string().describe(
    "Output only. The time at which this resource will be purged. This field is not used.",
  ).optional(),
  items: z.array(z.object({
    value: z.string().describe("The class item's value.").optional(),
  })).describe("A collection of class items.").optional(),
  kmsKeyName: z.string().describe(
    "Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
  ).optional(),
  kmsKeyVersionName: z.string().describe(
    "Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`.",
  ).optional(),
  name: z.string().describe("The resource name of the custom class.")
    .optional(),
  reconciling: z.boolean().describe(
    "Output only. Whether or not this CustomClass is in the process of being updated. This field is not used.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
    "Output only. The CustomClass lifecycle state. This field is not used.",
  ).optional(),
  uid: z.string().describe(
    "Output only. System-assigned unique identifier for the CustomClass. This field is not used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Speech-to-Text CustomClasses. Registered at `@swamp/gcp/speech/customclasses`. */
export const model = {
  type: "@swamp/gcp/speech/customclasses",
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
      toVersion: "2026.05.18.1",
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
        "A set of words or phrases that represents a common concept likely to appear i...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customClasses",
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
        if (g["customClass"] !== undefined) {
          body["customClass"] = g["customClass"];
        }
        if (g["customClassId"] !== undefined) {
          body["customClassId"] = g["customClassId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a customClasses",
      arguments: z.object({
        identifier: z.string().describe("The name of the customClasses"),
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
      description: "Update customClasses attributes",
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
        if (g["customClassId"] !== undefined) {
          body["customClassId"] = g["customClassId"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["deleteTime"] !== undefined) body["deleteTime"] = g["deleteTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["items"] !== undefined) body["items"] = g["items"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["kmsKeyVersionName"] !== undefined) {
          body["kmsKeyVersionName"] = g["kmsKeyVersionName"];
        }
        if (g["reconciling"] !== undefined) {
          body["reconciling"] = g["reconciling"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Delete the customClasses",
      arguments: z.object({
        identifier: z.string().describe("The name of the customClasses"),
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
      description: "Sync customClasses state from GCP",
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
