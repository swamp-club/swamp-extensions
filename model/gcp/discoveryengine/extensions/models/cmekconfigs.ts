// Auto-generated extension model for @swamp/gcp/discoveryengine/cmekconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine CmekConfigs.
 *
 * Configurations used to enable CMEK data encryption with Cloud KMS keys.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/cmekConfigs/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.cmekConfigs.get",
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
  "id": "discoveryengine.projects.locations.cmekConfigs.patch",
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
    "setDefault": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "discoveryengine.projects.locations.cmekConfigs.delete",
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
  isDefault: z.boolean().describe(
    "Output only. The default CmekConfig for the Customer.",
  ).optional(),
  kmsKey: z.string().describe(
    "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
  ).optional(),
  kmsKeyVersion: z.string().describe(
    "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
  ).optional(),
  lastRotationTimestampMicros: z.string().describe(
    "Output only. The timestamp of the last key rotation.",
  ).optional(),
  name: z.string().describe(
    "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
  ).optional(),
  notebooklmState: z.enum([
    "NOTEBOOK_LM_STATE_UNSPECIFIED",
    "NOTEBOOK_LM_NOT_READY",
    "NOTEBOOK_LM_READY",
    "NOTEBOOK_LM_NOT_ENABLED",
  ]).describe("Output only. Whether the NotebookLM Corpus is ready to be used.")
    .optional(),
  singleRegionKeys: z.array(z.object({
    kmsKey: z.string().describe(
      "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
  })).describe(
    "Optional. Single-regional CMEKs that are required for some VAIS features.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "KEY_ISSUE",
    "DELETING",
    "DELETE_FAILED",
    "UNUSABLE",
    "ACTIVE_ROTATING",
    "DELETED",
    "EXPIRED",
  ]).describe("Output only. The states of the CmekConfig.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  isDefault: z.boolean().optional(),
  kmsKey: z.string().optional(),
  kmsKeyVersion: z.string().optional(),
  lastRotationTimestampMicros: z.string().optional(),
  name: z.string(),
  notebooklmState: z.string().optional(),
  singleRegionKeys: z.array(z.object({
    kmsKey: z.string(),
  })).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  isDefault: z.boolean().describe(
    "Output only. The default CmekConfig for the Customer.",
  ).optional(),
  kmsKey: z.string().describe(
    "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
  ).optional(),
  kmsKeyVersion: z.string().describe(
    "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
  ).optional(),
  lastRotationTimestampMicros: z.string().describe(
    "Output only. The timestamp of the last key rotation.",
  ).optional(),
  name: z.string().describe(
    "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
  ).optional(),
  notebooklmState: z.enum([
    "NOTEBOOK_LM_STATE_UNSPECIFIED",
    "NOTEBOOK_LM_NOT_READY",
    "NOTEBOOK_LM_READY",
    "NOTEBOOK_LM_NOT_ENABLED",
  ]).describe("Output only. Whether the NotebookLM Corpus is ready to be used.")
    .optional(),
  singleRegionKeys: z.array(z.object({
    kmsKey: z.string().describe(
      "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
  })).describe(
    "Optional. Single-regional CMEKs that are required for some VAIS features.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "KEY_ISSUE",
    "DELETING",
    "DELETE_FAILED",
    "UNUSABLE",
    "ACTIVE_ROTATING",
    "DELETED",
    "EXPIRED",
  ]).describe("Output only. The states of the CmekConfig.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Discovery Engine CmekConfigs. Registered at `@swamp/gcp/discoveryengine/cmekconfigs`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/cmekconfigs",
  version: "2026.05.21.1",
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
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a cmekConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the cmekConfigs"),
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
      description: "Update cmekConfigs attributes",
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
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["kmsKeyVersion"] !== undefined) {
          body["kmsKeyVersion"] = g["kmsKeyVersion"];
        }
        if (g["lastRotationTimestampMicros"] !== undefined) {
          body["lastRotationTimestampMicros"] =
            g["lastRotationTimestampMicros"];
        }
        if (g["notebooklmState"] !== undefined) {
          body["notebooklmState"] = g["notebooklmState"];
        }
        if (g["singleRegionKeys"] !== undefined) {
          body["singleRegionKeys"] = g["singleRegionKeys"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
      description: "Delete the cmekConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the cmekConfigs"),
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
      description: "Sync cmekConfigs state from GCP",
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
