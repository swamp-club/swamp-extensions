// Auto-generated extension model for @swamp/gcp/sqladmin/databases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud SQL Admin Databases.
 *
 * Represents a SQL database on the Cloud SQL instance.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://sqladmin.googleapis.com/";

const GET_CONFIG = {
  "id": "sql.databases.get",
  "path": "v1/projects/{project}/instances/{instance}/databases/{database}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "instance",
    "database",
  ],
  "parameters": {
    "database": {
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
  "id": "sql.databases.insert",
  "path": "v1/projects/{project}/instances/{instance}/databases",
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

const UPDATE_CONFIG = {
  "id": "sql.databases.update",
  "path": "v1/projects/{project}/instances/{instance}/databases/{database}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "instance",
    "database",
  ],
  "parameters": {
    "database": {
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

const DELETE_CONFIG = {
  "id": "sql.databases.delete",
  "path": "v1/projects/{project}/instances/{instance}/databases/{database}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "instance",
    "database",
  ],
  "parameters": {
    "database": {
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
  "id": "sql.databases.list",
  "path": "v1/projects/{project}/instances/{instance}/databases",
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
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  charset: z.string().describe("The Cloud SQL charset value.").optional(),
  collation: z.string().describe("The Cloud SQL collation value.").optional(),
  instance: z.string().describe(
    "The name of the Cloud SQL instance. This does not include the project ID.",
  ).optional(),
  name: z.string().describe(
    "The name of the database in the Cloud SQL instance. This does not include the project ID or instance name.",
  ).optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable.",
  ).optional(),
  sqlserverDatabaseDetails: z.object({
    compatibilityLevel: z.number().int().describe(
      "The version of SQL Server with which the database is to be made compatible",
    ).optional(),
    recoveryModel: z.string().describe(
      "The recovery model of a SQL Server database",
    ).optional(),
  }).describe("Represents a Sql Server database on the Cloud SQL instance.")
    .optional(),
});

const StateSchema = z.object({
  charset: z.string().optional(),
  collation: z.string().optional(),
  etag: z.string().optional(),
  instance: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  project: z.string().optional(),
  selfLink: z.string().optional(),
  sqlserverDatabaseDetails: z.object({
    compatibilityLevel: z.number(),
    recoveryModel: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  charset: z.string().describe("The Cloud SQL charset value.").optional(),
  collation: z.string().describe("The Cloud SQL collation value.").optional(),
  instance: z.string().describe(
    "The name of the Cloud SQL instance. This does not include the project ID.",
  ).optional(),
  name: z.string().describe(
    "The name of the database in the Cloud SQL instance. This does not include the project ID or instance name.",
  ).optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable.",
  ).optional(),
  sqlserverDatabaseDetails: z.object({
    compatibilityLevel: z.number().int().describe(
      "The version of SQL Server with which the database is to be made compatible",
    ).optional(),
    recoveryModel: z.string().describe(
      "The recovery model of a SQL Server database",
    ).optional(),
  }).describe("Represents a Sql Server database on the Cloud SQL instance.")
    .optional(),
});

/** Swamp extension model for Google Cloud SQL Admin Databases. Registered at `@swamp/gcp/sqladmin/databases`. */
export const model = {
  type: "@swamp/gcp/sqladmin/databases",
  version: "2026.05.25.2",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a SQL database on the Cloud SQL instance.",
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
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        const body: Record<string, unknown> = {};
        if (g["charset"] !== undefined) body["charset"] = g["charset"];
        if (g["collation"] !== undefined) body["collation"] = g["collation"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sqlserverDatabaseDetails"] !== undefined) {
          body["sqlserverDatabaseDetails"] = g["sqlserverDatabaseDetails"];
        }
        if (g["name"] !== undefined) params["database"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "instance": String(g["instance"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["database"] = args.identifier;
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
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        } else if (existing["instance"]) {
          params["instance"] = String(existing["instance"]);
        }
        params["database"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["charset"] !== undefined) body["charset"] = g["charset"];
        if (g["collation"] !== undefined) body["collation"] = g["collation"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sqlserverDatabaseDetails"] !== undefined) {
          body["sqlserverDatabaseDetails"] = g["sqlserverDatabaseDetails"];
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
          UPDATE_CONFIG,
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
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["database"] = args.identifier;
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
          if (g["instance"] !== undefined) {
            params["instance"] = String(g["instance"]);
          } else if (existing["instance"]) {
            params["instance"] = String(existing["instance"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["database"] = identifier;
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
    list: {
      description: "List databases resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
