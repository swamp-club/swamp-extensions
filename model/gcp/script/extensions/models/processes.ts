// Auto-generated extension model for @swamp/gcp/script/processes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apps Script Processes.
 *
 * Representation of a single script process execution that was started from the script editor, a trigger, an application, or using the Apps Script API. This is distinct from the `Operation` resource, which only represents executions started via the Apps Script API.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://script.googleapis.com/";

const LIST_CONFIG = {
  "id": "script.processes.list",
  "path": "v1/processes",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "userProcessFilter.deploymentId": {
      "location": "query",
    },
    "userProcessFilter.endTime": {
      "location": "query",
    },
    "userProcessFilter.functionName": {
      "location": "query",
    },
    "userProcessFilter.projectName": {
      "location": "query",
    },
    "userProcessFilter.scriptId": {
      "location": "query",
    },
    "userProcessFilter.startTime": {
      "location": "query",
    },
    "userProcessFilter.statuses": {
      "location": "query",
    },
    "userProcessFilter.types": {
      "location": "query",
    },
    "userProcessFilter.userAccessLevels": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  duration: z.string().optional(),
  functionName: z.string().optional(),
  processStatus: z.string().optional(),
  processType: z.string().optional(),
  projectName: z.string().optional(),
  runtimeVersion: z.string().optional(),
  startTime: z.string().optional(),
  userAccessLevel: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Apps Script Processes. Registered at `@swamp/gcp/script/processes`. */
export const model = {
  type: "@swamp/gcp/script/processes",
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
      description:
        "Representation of a single script process execution that was started from the...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a processes",
      arguments: z.object({
        identifier: z.string().describe("The name of the processes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync processes state from GCP",
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
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List processes resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of returned processes per page of results. Defaults to 50.",
        ).optional(),
        userProcessFilter_deploymentId: z.string().describe(
          "Optional field used to limit returned processes to those originating from projects with a specific deployment ID.",
        ).optional(),
        userProcessFilter_endTime: z.string().describe(
          "Optional field used to limit returned processes to those that completed on or before the given timestamp.",
        ).optional(),
        userProcessFilter_functionName: z.string().describe(
          "Optional field used to limit returned processes to those originating from a script function with the given function name.",
        ).optional(),
        userProcessFilter_projectName: z.string().describe(
          "Optional field used to limit returned processes to those originating from projects with project names containing a specific string.",
        ).optional(),
        userProcessFilter_scriptId: z.string().describe(
          "Optional field used to limit returned processes to those originating from projects with a specific script ID.",
        ).optional(),
        userProcessFilter_startTime: z.string().describe(
          "Optional field used to limit returned processes to those that were started on or after the given timestamp.",
        ).optional(),
        userProcessFilter_statuses: z.string().describe(
          "Optional field used to limit returned processes to those having one of the specified process statuses.",
        ).optional(),
        userProcessFilter_types: z.string().describe(
          "Optional field used to limit returned processes to those having one of the specified process types.",
        ).optional(),
        userProcessFilter_userAccessLevels: z.string().describe(
          "Optional field used to limit returned processes to those having one of the specified user access levels.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["userProcessFilter_deploymentId"] !== undefined) {
          params["userProcessFilter.deploymentId"] = String(
            args["userProcessFilter_deploymentId"],
          );
        }
        if (args["userProcessFilter_endTime"] !== undefined) {
          params["userProcessFilter.endTime"] = String(
            args["userProcessFilter_endTime"],
          );
        }
        if (args["userProcessFilter_functionName"] !== undefined) {
          params["userProcessFilter.functionName"] = String(
            args["userProcessFilter_functionName"],
          );
        }
        if (args["userProcessFilter_projectName"] !== undefined) {
          params["userProcessFilter.projectName"] = String(
            args["userProcessFilter_projectName"],
          );
        }
        if (args["userProcessFilter_scriptId"] !== undefined) {
          params["userProcessFilter.scriptId"] = String(
            args["userProcessFilter_scriptId"],
          );
        }
        if (args["userProcessFilter_startTime"] !== undefined) {
          params["userProcessFilter.startTime"] = String(
            args["userProcessFilter_startTime"],
          );
        }
        if (args["userProcessFilter_statuses"] !== undefined) {
          params["userProcessFilter.statuses"] = String(
            args["userProcessFilter_statuses"],
          );
        }
        if (args["userProcessFilter_types"] !== undefined) {
          params["userProcessFilter.types"] = String(
            args["userProcessFilter_types"],
          );
        }
        if (args["userProcessFilter_userAccessLevels"] !== undefined) {
          params["userProcessFilter.userAccessLevels"] = String(
            args["userProcessFilter_userAccessLevels"],
          );
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "processes",
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
    list_script_processes: {
      description: "list script processes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "script.processes.listScriptProcesses",
            "path": "v1/processes:listScriptProcesses",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "scriptId": { "location": "query" },
              "scriptProcessFilter.deploymentId": { "location": "query" },
              "scriptProcessFilter.endTime": { "location": "query" },
              "scriptProcessFilter.functionName": { "location": "query" },
              "scriptProcessFilter.startTime": { "location": "query" },
              "scriptProcessFilter.statuses": { "location": "query" },
              "scriptProcessFilter.types": { "location": "query" },
              "scriptProcessFilter.userAccessLevels": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
