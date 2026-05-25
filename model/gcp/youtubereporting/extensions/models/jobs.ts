// Auto-generated extension model for @swamp/gcp/youtubereporting/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Reporting Jobs.
 *
 * A job creating reports of a specific type.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtubereporting.googleapis.com/";

const GET_CONFIG = {
  "id": "youtubereporting.jobs.get",
  "path": "v1/jobs/{jobId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "youtubereporting.jobs.create",
  "path": "v1/jobs",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtubereporting.jobs.delete",
  "path": "v1/jobs/{jobId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtubereporting.jobs.list",
  "path": "v1/jobs",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "includeSystemManaged": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  createTime: z.string().describe("The creation date/time of the job.")
    .optional(),
  expireTime: z.string().describe(
    "The date/time when this job will expire/expired. After a job expired, no new reports are generated.",
  ).optional(),
  id: z.string().describe(
    "The server-generated ID of the job (max. 40 characters).",
  ).optional(),
  name: z.string().describe("The name of the job (max. 100 characters).")
    .optional(),
  reportTypeId: z.string().describe(
    "The type of reports this job creates. Corresponds to the ID of a ReportType.",
  ).optional(),
  systemManaged: z.boolean().describe(
    "True if this a system-managed job that cannot be modified by the user; otherwise false.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel).",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  expireTime: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  reportTypeId: z.string().optional(),
  systemManaged: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  createTime: z.string().describe("The creation date/time of the job.")
    .optional(),
  expireTime: z.string().describe(
    "The date/time when this job will expire/expired. After a job expired, no new reports are generated.",
  ).optional(),
  id: z.string().describe(
    "The server-generated ID of the job (max. 40 characters).",
  ).optional(),
  name: z.string().describe("The name of the job (max. 100 characters).")
    .optional(),
  reportTypeId: z.string().describe(
    "The type of reports this job creates. Corresponds to the ID of a ReportType.",
  ).optional(),
  systemManaged: z.boolean().describe(
    "True if this a system-managed job that cannot be modified by the user; otherwise false.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel).",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Reporting Jobs. Registered at `@swamp/gcp/youtubereporting/jobs`. */
export const model = {
  type: "@swamp/gcp/youtubereporting/jobs",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A job creating reports of a specific type.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["reportTypeId"] !== undefined) {
          body["reportTypeId"] = g["reportTypeId"];
        }
        if (g["systemManaged"] !== undefined) {
          body["systemManaged"] = g["systemManaged"];
        }
        if (g["onBehalfOfContentOwner"] !== undefined) {
          body["onBehalfOfContentOwner"] = g["onBehalfOfContentOwner"];
        }
        if (g["name"] !== undefined) params["jobId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["jobId"] = args.identifier;
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
    delete: {
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["jobId"] = args.identifier;
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
      description: "Sync jobs state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["jobId"] = identifier;
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
      description: "List jobs resources",
      arguments: z.object({
        includeSystemManaged: z.boolean().describe(
          "If set to true, also system-managed jobs will be returned; otherwise only user-created jobs will be returned. System-managed jobs can neither be modified nor deleted.",
        ).optional(),
        onBehalfOfContentOwner: z.string().describe(
          "The content owner's external ID on which behalf the user is acting on. If not set, the user is acting for himself (his own channel).",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer jobs than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["includeSystemManaged"] !== undefined) {
          params["includeSystemManaged"] = String(args["includeSystemManaged"]);
        }
        if (args["onBehalfOfContentOwner"] !== undefined) {
          params["onBehalfOfContentOwner"] = String(
            args["onBehalfOfContentOwner"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "jobs",
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
