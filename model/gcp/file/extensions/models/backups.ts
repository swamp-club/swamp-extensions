// Auto-generated extension model for @swamp/gcp/file/backups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Filestore Backups.
 *
 * A Filestore backup.
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

const BASE_URL = "https://file.googleapis.com/";

const GET_CONFIG = {
  "id": "file.projects.locations.backups.get",
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
  "id": "file.projects.locations.backups.create",
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
  },
} as const;

const PATCH_CONFIG = {
  "id": "file.projects.locations.backups.patch",
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
  "id": "file.projects.locations.backups.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe(
    "A description of the backup with 2048 characters or less. Requests with longer descriptions will be rejected.",
  ).optional(),
  kmsKey: z.string().describe(
    "Immutable. KMS key name used for data encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  sourceFileShare: z.string().describe(
    "Name of the file share in the source Filestore instance that the backup is created from.",
  ).optional(),
  sourceInstance: z.string().describe(
    "The resource name of the source Filestore instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`, used to create this backup.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment": "production", "123456789013/costCenter": "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value',
  ).optional(),
  backupId: z.string().describe(
    "Required. The ID to use for the backup. The ID must be unique within the specified project and location. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. Values that do not match this pattern will trigger an INVALID_ARGUMENT error.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  capacityGb: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  downloadBytes: z.string().optional(),
  fileSystemProtocol: z.string().optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  sourceFileShare: z.string().optional(),
  sourceInstance: z.string().optional(),
  sourceInstanceTier: z.string().optional(),
  state: z.string().optional(),
  storageBytes: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe(
    "A description of the backup with 2048 characters or less. Requests with longer descriptions will be rejected.",
  ).optional(),
  kmsKey: z.string().describe(
    "Immutable. KMS key name used for data encryption.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  sourceFileShare: z.string().describe(
    "Name of the file share in the source Filestore instance that the backup is created from.",
  ).optional(),
  sourceInstance: z.string().describe(
    "The resource name of the source Filestore instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`, used to create this backup.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment": "production", "123456789013/costCenter": "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value',
  ).optional(),
  backupId: z.string().describe(
    "Required. The ID to use for the backup. The ID must be unique within the specified project and location. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. Values that do not match this pattern will trigger an INVALID_ARGUMENT error.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Filestore Backups. Registered at `@swamp/gcp/file/backups`. */
export const model = {
  type: "@swamp/gcp/file/backups",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Filestore backup.",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["sourceFileShare"] !== undefined) {
          body["sourceFileShare"] = g["sourceFileShare"];
        }
        if (g["sourceInstance"] !== undefined) {
          body["sourceInstance"] = g["sourceInstance"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["backupId"] !== undefined) body["backupId"] = g["backupId"];
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["sourceFileShare"] !== undefined) {
          body["sourceFileShare"] = g["sourceFileShare"];
        }
        if (g["sourceInstance"] !== undefined) {
          body["sourceInstance"] = g["sourceInstance"];
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
              "statusField": "state",
              "readyValues": ["READY"],
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
