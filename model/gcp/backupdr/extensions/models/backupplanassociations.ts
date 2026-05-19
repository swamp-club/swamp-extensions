// Auto-generated extension model for @swamp/gcp/backupdr/backupplanassociations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service BackupPlanAssociations.
 *
 * A BackupPlanAssociation represents a single BackupPlanAssociation which contains details like workload, backup plan etc
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
  return `${parent}/backupPlanAssociations/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.backupPlanAssociations.get",
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
  "id": "backupdr.projects.locations.backupPlanAssociations.create",
  "path": "v1/{+parent}/backupPlanAssociations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backupPlanAssociationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "backupdr.projects.locations.backupPlanAssociations.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "backupdr.projects.locations.backupPlanAssociations.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  alloydbClusterBackupPlanAssociationProperties: z.object({
    clusterUid: z.string().describe(
      "Output only. The cluster UID of the AlloyDB cluster.",
    ).optional(),
  }).describe("Properties for an AlloyDB cluster backup plan association.")
    .optional(),
  backupPlan: z.string().describe(
    "Required. Resource name of backup plan which needs to be applied on workload. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}",
  ).optional(),
  cloudSqlInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string().describe(
      "Output only. The time when the instance was created.",
    ).optional(),
  }).describe("Cloud SQL instance's BPA properties.").optional(),
  filestoreInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string().describe(
      "Output only. The time when the instance was created.",
    ).optional(),
  }).describe("Filestore instance's BPA properties.").optional(),
  resource: z.string().describe(
    'Required. Immutable. Resource name of workload on which the backup plan is applied. The format can either be the resource name (e.g., "projects/my-project/zones/us-central1-a/instances/my-instance") or the full resource URI (e.g., "https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/my-instance").',
  ).optional(),
  resourceType: z.string().describe(
    "Required. Immutable. Resource type of workload on which backupplan is applied",
  ).optional(),
  backupPlanAssociationId: z.string().describe(
    "Required. The name of the backup plan association to create. The name must be unique for the specified project and location.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  alloydbClusterBackupPlanAssociationProperties: z.object({
    clusterUid: z.string(),
  }).optional(),
  backupPlan: z.string().optional(),
  backupPlanRevisionId: z.string().optional(),
  backupPlanRevisionName: z.string().optional(),
  cloudSqlInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataSource: z.string().optional(),
  filestoreInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string(),
  }).optional(),
  name: z.string(),
  resource: z.string().optional(),
  resourceType: z.string().optional(),
  rulesConfigInfo: z.array(z.object({
    lastBackupError: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    lastBackupState: z.string(),
    lastSuccessfulBackupConsistencyTime: z.string(),
    ruleId: z.string(),
  })).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  alloydbClusterBackupPlanAssociationProperties: z.object({
    clusterUid: z.string().describe(
      "Output only. The cluster UID of the AlloyDB cluster.",
    ).optional(),
  }).describe("Properties for an AlloyDB cluster backup plan association.")
    .optional(),
  backupPlan: z.string().describe(
    "Required. Resource name of backup plan which needs to be applied on workload. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}",
  ).optional(),
  cloudSqlInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string().describe(
      "Output only. The time when the instance was created.",
    ).optional(),
  }).describe("Cloud SQL instance's BPA properties.").optional(),
  filestoreInstanceBackupPlanAssociationProperties: z.object({
    instanceCreateTime: z.string().describe(
      "Output only. The time when the instance was created.",
    ).optional(),
  }).describe("Filestore instance's BPA properties.").optional(),
  resource: z.string().describe(
    'Required. Immutable. Resource name of workload on which the backup plan is applied. The format can either be the resource name (e.g., "projects/my-project/zones/us-central1-a/instances/my-instance") or the full resource URI (e.g., "https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/my-instance").',
  ).optional(),
  resourceType: z.string().describe(
    "Required. Immutable. Resource type of workload on which backupplan is applied",
  ).optional(),
  backupPlanAssociationId: z.string().describe(
    "Required. The name of the backup plan association to create. The name must be unique for the specified project and location.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Backup and DR Service BackupPlanAssociations. Registered at `@swamp/gcp/backupdr/backupplanassociations`. */
export const model = {
  type: "@swamp/gcp/backupdr/backupplanassociations",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
        "A BackupPlanAssociation represents a single BackupPlanAssociation which conta...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backupPlanAssociations",
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
        if (g["alloydbClusterBackupPlanAssociationProperties"] !== undefined) {
          body["alloydbClusterBackupPlanAssociationProperties"] =
            g["alloydbClusterBackupPlanAssociationProperties"];
        }
        if (g["backupPlan"] !== undefined) body["backupPlan"] = g["backupPlan"];
        if (
          g["cloudSqlInstanceBackupPlanAssociationProperties"] !== undefined
        ) {
          body["cloudSqlInstanceBackupPlanAssociationProperties"] =
            g["cloudSqlInstanceBackupPlanAssociationProperties"];
        }
        if (
          g["filestoreInstanceBackupPlanAssociationProperties"] !== undefined
        ) {
          body["filestoreInstanceBackupPlanAssociationProperties"] =
            g["filestoreInstanceBackupPlanAssociationProperties"];
        }
        if (g["resource"] !== undefined) body["resource"] = g["resource"];
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["backupPlanAssociationId"] !== undefined) {
          body["backupPlanAssociationId"] = g["backupPlanAssociationId"];
        }
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
              "readyValues": ["ACTIVE"],
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
      description: "Get a backupPlanAssociations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the backupPlanAssociations",
        ),
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
      description: "Update backupPlanAssociations attributes",
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
        if (g["alloydbClusterBackupPlanAssociationProperties"] !== undefined) {
          body["alloydbClusterBackupPlanAssociationProperties"] =
            g["alloydbClusterBackupPlanAssociationProperties"];
        }
        if (g["backupPlan"] !== undefined) body["backupPlan"] = g["backupPlan"];
        if (
          g["cloudSqlInstanceBackupPlanAssociationProperties"] !== undefined
        ) {
          body["cloudSqlInstanceBackupPlanAssociationProperties"] =
            g["cloudSqlInstanceBackupPlanAssociationProperties"];
        }
        if (
          g["filestoreInstanceBackupPlanAssociationProperties"] !== undefined
        ) {
          body["filestoreInstanceBackupPlanAssociationProperties"] =
            g["filestoreInstanceBackupPlanAssociationProperties"];
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
      description: "Delete the backupPlanAssociations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the backupPlanAssociations",
        ),
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
      description: "Sync backupPlanAssociations state from GCP",
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
    fetch_for_resource_type: {
      description: "fetch for resource type",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "backupdr.projects.locations.backupPlanAssociations.fetchForResourceType",
            "path": "v1/{+parent}/backupPlanAssociations:fetchForResourceType",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "resourceType": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    trigger_backup: {
      description: "trigger backup",
      arguments: z.object({
        customRetentionDays: z.any().optional(),
        labels: z.any().optional(),
        requestId: z.any().optional(),
        ruleId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["customRetentionDays"] !== undefined) {
          body["customRetentionDays"] = args["customRetentionDays"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["ruleId"] !== undefined) body["ruleId"] = args["ruleId"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "backupdr.projects.locations.backupPlanAssociations.triggerBackup",
            "path": "v1/{+name}:triggerBackup",
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
  },
};
