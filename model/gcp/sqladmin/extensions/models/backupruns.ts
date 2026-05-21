// Auto-generated extension model for @swamp/gcp/sqladmin/backupruns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud SQL Admin BackupRuns.
 *
 * A BackupRun resource.
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

const BASE_URL = "https://sqladmin.googleapis.com/";

const GET_CONFIG = {
  "id": "sql.backupRuns.get",
  "path": "v1/projects/{project}/instances/{instance}/backupRuns/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "instance",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "sql.backupRuns.insert",
  "path": "v1/projects/{project}/instances/{instance}/backupRuns",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "sql.backupRuns.delete",
  "path": "v1/projects/{project}/instances/{instance}/backupRuns/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "instance",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "sql.backupRuns.list",
  "path": "v1/projects/{project}/instances/{instance}/backupRuns",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  backupKind: z.enum(["SQL_BACKUP_KIND_UNSPECIFIED", "SNAPSHOT", "PHYSICAL"])
    .describe("Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT.")
    .optional(),
  description: z.string().describe(
    "The description of this run, only applicable to on-demand backups.",
  ).optional(),
  diskEncryptionConfiguration: z.object({
    kind: z.string().describe(
      "This is always `sql#diskEncryptionConfiguration`.",
    ).optional(),
    kmsKeyName: z.string().describe(
      "Resource name of KMS key for disk encryption",
    ).optional(),
  }).describe("Disk encryption configuration for an instance.").optional(),
  diskEncryptionStatus: z.object({
    kind: z.string().describe("This is always `sql#diskEncryptionStatus`.")
      .optional(),
    kmsKeyVersionName: z.string().describe(
      "KMS key version used to encrypt the Cloud SQL instance resource",
    ).optional(),
  }).describe("Disk encryption status for an instance.").optional(),
  endTime: z.string().describe(
    "The time the backup operation completed in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  enqueuedTime: z.string().describe(
    "The time the run was enqueued in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  error: z.object({
    code: z.string().describe("Identifies the specific error that occurred.")
      .optional(),
    kind: z.string().describe("This is always `sql#operationError`.")
      .optional(),
    message: z.string().describe(
      "Additional information about the error encountered.",
    ).optional(),
  }).describe("Database instance operation error.").optional(),
  id: z.string().describe(
    "The identifier for this backup run. Unique only for a specific Cloud SQL instance.",
  ).optional(),
  instance: z.string().describe("Name of the database instance.").optional(),
  location: z.string().describe("Location of the backups.").optional(),
  startTime: z.string().describe(
    "The time the backup operation actually started in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  status: z.enum([
    "SQL_BACKUP_RUN_STATUS_UNSPECIFIED",
    "ENQUEUED",
    "OVERDUE",
    "RUNNING",
    "FAILED",
    "SUCCESSFUL",
    "SKIPPED",
    "DELETION_PENDING",
    "DELETION_FAILED",
    "DELETED",
  ]).describe("The status of this run.").optional(),
  timeZone: z.string().describe(
    "Backup time zone to prevent restores to an instance with a different time zone. Now relevant only for SQL Server.",
  ).optional(),
  type: z.enum(["SQL_BACKUP_RUN_TYPE_UNSPECIFIED", "AUTOMATED", "ON_DEMAND"])
    .describe(
      'The type of this run; can be either "AUTOMATED" or "ON_DEMAND" or "FINAL". This field defaults to "ON_DEMAND" and is ignored, when specified for insert requests.',
    ).optional(),
  windowStartTime: z.string().describe(
    "The start time of the backup window during which this the backup was attempted in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
});

const StateSchema = z.object({
  backupKind: z.string().optional(),
  databaseVersion: z.string().optional(),
  description: z.string().optional(),
  diskEncryptionConfiguration: z.object({
    kind: z.string(),
    kmsKeyName: z.string(),
  }).optional(),
  diskEncryptionStatus: z.object({
    kind: z.string(),
    kmsKeyVersionName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  enqueuedTime: z.string().optional(),
  error: z.object({
    code: z.string(),
    kind: z.string(),
    message: z.string(),
  }).optional(),
  id: z.string(),
  instance: z.string().optional(),
  kind: z.string().optional(),
  location: z.string().optional(),
  maxChargeableBytes: z.string().optional(),
  selfLink: z.string().optional(),
  startTime: z.string().optional(),
  status: z.string().optional(),
  timeZone: z.string().optional(),
  type: z.string().optional(),
  windowStartTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backupKind: z.enum(["SQL_BACKUP_KIND_UNSPECIFIED", "SNAPSHOT", "PHYSICAL"])
    .describe("Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT.")
    .optional(),
  description: z.string().describe(
    "The description of this run, only applicable to on-demand backups.",
  ).optional(),
  diskEncryptionConfiguration: z.object({
    kind: z.string().describe(
      "This is always `sql#diskEncryptionConfiguration`.",
    ).optional(),
    kmsKeyName: z.string().describe(
      "Resource name of KMS key for disk encryption",
    ).optional(),
  }).describe("Disk encryption configuration for an instance.").optional(),
  diskEncryptionStatus: z.object({
    kind: z.string().describe("This is always `sql#diskEncryptionStatus`.")
      .optional(),
    kmsKeyVersionName: z.string().describe(
      "KMS key version used to encrypt the Cloud SQL instance resource",
    ).optional(),
  }).describe("Disk encryption status for an instance.").optional(),
  endTime: z.string().describe(
    "The time the backup operation completed in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  enqueuedTime: z.string().describe(
    "The time the run was enqueued in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  error: z.object({
    code: z.string().describe("Identifies the specific error that occurred.")
      .optional(),
    kind: z.string().describe("This is always `sql#operationError`.")
      .optional(),
    message: z.string().describe(
      "Additional information about the error encountered.",
    ).optional(),
  }).describe("Database instance operation error.").optional(),
  id: z.string().describe(
    "The identifier for this backup run. Unique only for a specific Cloud SQL instance.",
  ).optional(),
  instance: z.string().describe("Name of the database instance.").optional(),
  location: z.string().describe("Location of the backups.").optional(),
  startTime: z.string().describe(
    "The time the backup operation actually started in UTC timezone in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
  status: z.enum([
    "SQL_BACKUP_RUN_STATUS_UNSPECIFIED",
    "ENQUEUED",
    "OVERDUE",
    "RUNNING",
    "FAILED",
    "SUCCESSFUL",
    "SKIPPED",
    "DELETION_PENDING",
    "DELETION_FAILED",
    "DELETED",
  ]).describe("The status of this run.").optional(),
  timeZone: z.string().describe(
    "Backup time zone to prevent restores to an instance with a different time zone. Now relevant only for SQL Server.",
  ).optional(),
  type: z.enum(["SQL_BACKUP_RUN_TYPE_UNSPECIFIED", "AUTOMATED", "ON_DEMAND"])
    .describe(
      'The type of this run; can be either "AUTOMATED" or "ON_DEMAND" or "FINAL". This field defaults to "ON_DEMAND" and is ignored, when specified for insert requests.',
    ).optional(),
  windowStartTime: z.string().describe(
    "The start time of the backup window during which this the backup was attempted in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud SQL Admin BackupRuns. Registered at `@swamp/gcp/sqladmin/backupruns`. */
export const model = {
  type: "@swamp/gcp/sqladmin/backupruns",
  version: "2026.05.21.1",
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
      description: "A BackupRun resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backupRuns",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        const body: Record<string, unknown> = {};
        if (g["backupKind"] !== undefined) body["backupKind"] = g["backupKind"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskEncryptionConfiguration"] !== undefined) {
          body["diskEncryptionConfiguration"] =
            g["diskEncryptionConfiguration"];
        }
        if (g["diskEncryptionStatus"] !== undefined) {
          body["diskEncryptionStatus"] = g["diskEncryptionStatus"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["enqueuedTime"] !== undefined) {
          body["enqueuedTime"] = g["enqueuedTime"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["windowStartTime"] !== undefined) {
          body["windowStartTime"] = g["windowStartTime"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["RUNNING"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "instance": String(g["instance"] ?? ""),
            },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a backupRuns",
      arguments: z.object({
        identifier: z.string().describe("The id of the backupRuns"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Delete the backupRuns",
      arguments: z.object({
        identifier: z.string().describe("The id of the backupRuns"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync backupRuns state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["instance"] !== undefined) {
            params["instance"] = String(g["instance"]);
          } else if (existing["instance"]) {
            params["instance"] = String(existing["instance"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
