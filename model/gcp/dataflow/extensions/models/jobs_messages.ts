// Auto-generated extension model for @swamp/gcp/dataflow/jobs-messages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataflow Jobs.Messages.
 *
 * A structured message reporting an autoscaling decision made by the Dataflow service.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dataflow.googleapis.com/";

const LIST_CONFIG = {
  "id": "dataflow.projects.jobs.messages.list",
  "path": "v1b3/projects/{projectId}/jobs/{jobId}/messages",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "jobId",
  ],
  "parameters": {
    "endTime": {
      "location": "query",
    },
    "jobId": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "minimumImportance": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "startTime": {
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
  currentNumWorkers: z.string().optional(),
  description: z.object({
    messageKey: z.string(),
    messageText: z.string(),
    parameters: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
  }).optional(),
  eventType: z.string().optional(),
  targetNumWorkers: z.string().optional(),
  time: z.string().optional(),
  workerPool: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Dataflow Jobs.Messages. Registered at `@swamp/gcp/dataflow/jobs-messages`. */
export const model = {
  type: "@swamp/gcp/dataflow/jobs-messages",
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
        "A structured message reporting an autoscaling decision made by the Dataflow s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a messages",
      arguments: z.object({
        identifier: z.string().describe("The name of the messages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["jobId"] !== undefined) params["jobId"] = String(g["jobId"]);
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
      description: "Sync messages state from GCP",
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
          if (g["jobId"] !== undefined) params["jobId"] = String(g["jobId"]);
          else if (existing["jobId"]) {
            params["jobId"] = String(existing["jobId"]);
          }
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
      description: "List messages resources",
      arguments: z.object({
        endTime: z.string().describe(
          "Return only messages with timestamps < end_time. The default is now (i.e. return up to the latest messages available).",
        ).optional(),
        location: z.string().describe(
          "The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.",
        ).optional(),
        minimumImportance: z.string().describe(
          "Filter to only get messages with importance >= level",
        ).optional(),
        pageSize: z.number().describe(
          "If specified, determines the maximum number of messages to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results.",
        ).optional(),
        startTime: z.string().describe(
          "If specified, return only messages with timestamps >= start_time. The default is the job creation time (i.e. beginning of messages).",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["jobId"] !== undefined) params["jobId"] = String(g["jobId"]);
        if (args["endTime"] !== undefined) {
          params["endTime"] = String(args["endTime"]);
        }
        if (args["location"] !== undefined) {
          params["location"] = String(args["location"]);
        }
        if (args["minimumImportance"] !== undefined) {
          params["minimumImportance"] = String(args["minimumImportance"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["startTime"] !== undefined) {
          params["startTime"] = String(args["startTime"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "autoscalingEvents",
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
