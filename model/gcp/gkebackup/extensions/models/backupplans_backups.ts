// Auto-generated extension model for @swamp/gcp/gkebackup/backupplans-backups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup for GKE BackupPlans.Backups.
 *
 * Represents a request to perform a single point-in-time capture of some portion of the state of a GKE cluster, the record of the backup operation itself, and an anchor for the underlying artifacts that comprise the Backup (the config backup and VolumeBackups).
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

const BASE_URL = "https://gkebackup.googleapis.com/";

const GET_CONFIG = {
  "id": "gkebackup.projects.locations.backupPlans.backups.get",
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
  "id": "gkebackup.projects.locations.backupPlans.backups.create",
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
  "id": "gkebackup.projects.locations.backupPlans.backups.patch",
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
  "id": "gkebackup.projects.locations.backupPlans.backups.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gkebackup.projects.locations.backupPlans.backups.list",
  "path": "v1/{+parent}/backups",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  clusterMetadata: z.object({
    anthosVersion: z.string().describe("Output only. Anthos version")
      .optional(),
    backupCrdVersions: z.record(z.string(), z.string()).describe(
      "Output only. A list of the Backup for GKE CRD versions found in the cluster.",
    ).optional(),
    cluster: z.string().describe(
      "Output only. The source cluster from which this Backup was created. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` This is inherited from the parent BackupPlan's cluster field.",
    ).optional(),
    gkeVersion: z.string().describe("Output only. GKE version").optional(),
    k8sVersion: z.string().describe(
      "Output only. The Kubernetes server version of the source cluster.",
    ).optional(),
  }).describe(
    "Information about the GKE cluster from which this Backup was created.",
  ).optional(),
  deleteLockDays: z.number().int().describe(
    'Optional. Minimum age for this Backup (in days). If this field is set to a non-zero value, the Backup will be "locked" against deletion (either manual or automatic deletion) for the number of days provided (measured from the creation time of the Backup). MUST be an integer value between 0-90 (inclusive). Defaults to parent BackupPlan\'s backup_delete_lock_days setting and may only be increased (either at creation time or in a subsequent update).',
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this Backup.",
  ).optional(),
  encryptionKey: z.object({
    gcpKmsEncryptionKey: z.string().describe(
      "Optional. Google Cloud KMS encryption key. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
    ).optional(),
  }).describe(
    "Defined a customer managed encryption key that will be used to encrypt Backup artifacts.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. A set of custom labels supplied by user.",
  ).optional(),
  retainDays: z.number().int().describe(
    "Optional. The age (in days) after which this Backup will be automatically deleted. Must be an integer value >= 0: - If 0, no automatic deletion will occur for this Backup. - If not 0, this must be >= delete_lock_days and <= 365. Once a Backup is created, this value may only be increased. Defaults to the parent BackupPlan's backup_retain_days value.",
  ).optional(),
  selectedApplications: z.object({
    namespacedNames: z.array(z.object({
      name: z.string().describe(
        "Optional. The name of the Kubernetes resource.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. The Namespace of the Kubernetes resource.",
      ).optional(),
    })).describe("Optional. A list of namespaced Kubernetes resources.")
      .optional(),
  }).describe("A list of namespaced Kubernetes resources.").optional(),
  selectedNamespaceLabels: z.object({
    resourceLabels: z.array(z.object({
      key: z.string().describe("Optional. The key/name of the label.")
        .optional(),
      value: z.string().describe("Optional. The value of the label.")
        .optional(),
    })).describe("Optional. A list of Kubernetes label-value pairs.")
      .optional(),
  }).describe("A list of Kubernetes labels.").optional(),
  selectedNamespaces: z.object({
    namespaces: z.array(z.string()).describe(
      "Optional. A list of Kubernetes Namespaces.",
    ).optional(),
  }).describe("A list of Kubernetes Namespaces.").optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string().describe(
      "Output only. Unique code for each backup/restore operation failure message which helps user identify the failure.",
    ).optional(),
    stateReasonUri: z.string().describe(
      "Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation.",
    ).optional(),
  }).describe(
    "Stores information about troubleshooting doc for debugging a particular state of an operation (eg - backup/restore). This will be used by the end user to debug their operation failure scenario easily.",
  ).optional(),
  backupId: z.string().describe(
    "Optional. The client-provided short name for the Backup resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Backups in this BackupPlan",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allNamespaces: z.boolean().optional(),
  clusterMetadata: z.object({
    anthosVersion: z.string(),
    backupCrdVersions: z.record(z.string(), z.unknown()),
    cluster: z.string(),
    gkeVersion: z.string(),
    k8sVersion: z.string(),
  }).optional(),
  completeTime: z.string().optional(),
  configBackupSizeBytes: z.string().optional(),
  containsSecrets: z.boolean().optional(),
  containsVolumeData: z.boolean().optional(),
  createTime: z.string().optional(),
  deleteLockDays: z.number().optional(),
  deleteLockExpireTime: z.string().optional(),
  description: z.string().optional(),
  encryptionKey: z.object({
    gcpKmsEncryptionKey: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  manual: z.boolean().optional(),
  name: z.string(),
  namespaceCount: z.number().optional(),
  permissiveMode: z.boolean().optional(),
  podCount: z.number().optional(),
  resourceCount: z.number().optional(),
  retainDays: z.number().optional(),
  retainExpireTime: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  selectedApplications: z.object({
    namespacedNames: z.array(z.object({
      name: z.string(),
      namespace: z.string(),
    })),
  }).optional(),
  selectedNamespaceLabels: z.object({
    resourceLabels: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
  }).optional(),
  selectedNamespaces: z.object({
    namespaces: z.array(z.string()),
  }).optional(),
  sizeBytes: z.string().optional(),
  state: z.string().optional(),
  stateReason: z.string().optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string(),
    stateReasonUri: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  volumeCount: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  clusterMetadata: z.object({
    anthosVersion: z.string().describe("Output only. Anthos version")
      .optional(),
    backupCrdVersions: z.record(z.string(), z.string()).describe(
      "Output only. A list of the Backup for GKE CRD versions found in the cluster.",
    ).optional(),
    cluster: z.string().describe(
      "Output only. The source cluster from which this Backup was created. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*` This is inherited from the parent BackupPlan's cluster field.",
    ).optional(),
    gkeVersion: z.string().describe("Output only. GKE version").optional(),
    k8sVersion: z.string().describe(
      "Output only. The Kubernetes server version of the source cluster.",
    ).optional(),
  }).describe(
    "Information about the GKE cluster from which this Backup was created.",
  ).optional(),
  deleteLockDays: z.number().int().describe(
    'Optional. Minimum age for this Backup (in days). If this field is set to a non-zero value, the Backup will be "locked" against deletion (either manual or automatic deletion) for the number of days provided (measured from the creation time of the Backup). MUST be an integer value between 0-90 (inclusive). Defaults to parent BackupPlan\'s backup_delete_lock_days setting and may only be increased (either at creation time or in a subsequent update).',
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this Backup.",
  ).optional(),
  encryptionKey: z.object({
    gcpKmsEncryptionKey: z.string().describe(
      "Optional. Google Cloud KMS encryption key. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
    ).optional(),
  }).describe(
    "Defined a customer managed encryption key that will be used to encrypt Backup artifacts.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. A set of custom labels supplied by user.",
  ).optional(),
  retainDays: z.number().int().describe(
    "Optional. The age (in days) after which this Backup will be automatically deleted. Must be an integer value >= 0: - If 0, no automatic deletion will occur for this Backup. - If not 0, this must be >= delete_lock_days and <= 365. Once a Backup is created, this value may only be increased. Defaults to the parent BackupPlan's backup_retain_days value.",
  ).optional(),
  selectedApplications: z.object({
    namespacedNames: z.array(z.object({
      name: z.string().describe(
        "Optional. The name of the Kubernetes resource.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. The Namespace of the Kubernetes resource.",
      ).optional(),
    })).describe("Optional. A list of namespaced Kubernetes resources.")
      .optional(),
  }).describe("A list of namespaced Kubernetes resources.").optional(),
  selectedNamespaceLabels: z.object({
    resourceLabels: z.array(z.object({
      key: z.string().describe("Optional. The key/name of the label.")
        .optional(),
      value: z.string().describe("Optional. The value of the label.")
        .optional(),
    })).describe("Optional. A list of Kubernetes label-value pairs.")
      .optional(),
  }).describe("A list of Kubernetes labels.").optional(),
  selectedNamespaces: z.object({
    namespaces: z.array(z.string()).describe(
      "Optional. A list of Kubernetes Namespaces.",
    ).optional(),
  }).describe("A list of Kubernetes Namespaces.").optional(),
  troubleshootingInfo: z.object({
    stateReasonCode: z.string().describe(
      "Output only. Unique code for each backup/restore operation failure message which helps user identify the failure.",
    ).optional(),
    stateReasonUri: z.string().describe(
      "Output only. URL for the troubleshooting doc which will help the user fix the failing backup/restore operation.",
    ).optional(),
  }).describe(
    "Stores information about troubleshooting doc for debugging a particular state of an operation (eg - backup/restore). This will be used by the end user to debug their operation failure scenario easily.",
  ).optional(),
  backupId: z.string().describe(
    "Optional. The client-provided short name for the Backup resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Backups in this BackupPlan",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Backup for GKE BackupPlans.Backups. Registered at `@swamp/gcp/gkebackup/backupplans-backups`. */
export const model = {
  type: "@swamp/gcp/gkebackup/backupplans-backups",
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
        "Represents a request to perform a single point-in-time capture of some portio...",
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
        if (g["clusterMetadata"] !== undefined) {
          body["clusterMetadata"] = g["clusterMetadata"];
        }
        if (g["deleteLockDays"] !== undefined) {
          body["deleteLockDays"] = g["deleteLockDays"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["retainDays"] !== undefined) body["retainDays"] = g["retainDays"];
        if (g["selectedApplications"] !== undefined) {
          body["selectedApplications"] = g["selectedApplications"];
        }
        if (g["selectedNamespaceLabels"] !== undefined) {
          body["selectedNamespaceLabels"] = g["selectedNamespaceLabels"];
        }
        if (g["selectedNamespaces"] !== undefined) {
          body["selectedNamespaces"] = g["selectedNamespaces"];
        }
        if (g["troubleshootingInfo"] !== undefined) {
          body["troubleshootingInfo"] = g["troubleshootingInfo"];
        }
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
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
        if (g["clusterMetadata"] !== undefined) {
          body["clusterMetadata"] = g["clusterMetadata"];
        }
        if (g["deleteLockDays"] !== undefined) {
          body["deleteLockDays"] = g["deleteLockDays"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["retainDays"] !== undefined) body["retainDays"] = g["retainDays"];
        if (g["selectedApplications"] !== undefined) {
          body["selectedApplications"] = g["selectedApplications"];
        }
        if (g["selectedNamespaceLabels"] !== undefined) {
          body["selectedNamespaceLabels"] = g["selectedNamespaceLabels"];
        }
        if (g["selectedNamespaces"] !== undefined) {
          body["selectedNamespaces"] = g["selectedNamespaces"];
        }
        if (g["troubleshootingInfo"] !== undefined) {
          body["troubleshootingInfo"] = g["troubleshootingInfo"];
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
              "readyValues": ["SUCCEEDED"],
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
    get_backup_index_download_url: {
      description: "get backup index download url",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["backup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkebackup.projects.locations.backupPlans.backups.getBackupIndexDownloadUrl",
            "path": "v1/{+backup}:getBackupIndexDownloadUrl",
            "httpMethod": "GET",
            "parameterOrder": ["backup"],
            "parameters": {
              "backup": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkebackup.projects.locations.backupPlans.backups.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkebackup.projects.locations.backupPlans.backups.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        const projectId = await getProjectId();
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
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkebackup.projects.locations.backupPlans.backups.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
