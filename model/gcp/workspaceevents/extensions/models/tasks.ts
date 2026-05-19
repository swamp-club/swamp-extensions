// Auto-generated extension model for @swamp/gcp/workspaceevents/tasks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Workspace Events Tasks.
 *
 * Task is the core unit of action for A2A. It has a current status and when results are created for the task they are stored in the artifact. If there are multiple turns for a task, these are stored in history.
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
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://workspaceevents.googleapis.com/";

const GET_CONFIG = {
  "id": "workspaceevents.tasks.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "historyLength": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "tenant": {
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
  artifacts: z.array(z.object({
    artifactId: z.string(),
    description: z.string(),
    extensions: z.array(z.string()),
    metadata: z.record(z.string(), z.unknown()),
    name: z.string(),
    parts: z.array(z.object({
      data: z.object({
        data: z.unknown(),
      }),
      file: z.object({
        fileWithBytes: z.unknown(),
        fileWithUri: z.unknown(),
        mimeType: z.unknown(),
        name: z.unknown(),
      }),
      metadata: z.record(z.string(), z.unknown()),
      text: z.string(),
    })),
  })).optional(),
  contextId: z.string().optional(),
  history: z.array(z.object({
    content: z.array(z.object({
      data: z.object({
        data: z.unknown(),
      }),
      file: z.object({
        fileWithBytes: z.unknown(),
        fileWithUri: z.unknown(),
        mimeType: z.unknown(),
        name: z.unknown(),
      }),
      metadata: z.record(z.string(), z.unknown()),
      text: z.string(),
    })),
    contextId: z.string(),
    extensions: z.array(z.string()),
    messageId: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    role: z.string(),
    taskId: z.string(),
  })).optional(),
  id: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  status: z.object({
    message: z.object({
      content: z.array(z.object({
        data: z.object({
          data: z.unknown(),
        }),
        file: z.object({
          fileWithBytes: z.unknown(),
          fileWithUri: z.unknown(),
          mimeType: z.unknown(),
          name: z.unknown(),
        }),
        metadata: z.record(z.string(), z.unknown()),
        text: z.string(),
      })),
      contextId: z.string(),
      extensions: z.array(z.string()),
      messageId: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      role: z.string(),
      taskId: z.string(),
    }),
    state: z.string(),
    timestamp: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Workspace Events Tasks. Registered at `@swamp/gcp/workspaceevents/tasks`. */
export const model = {
  type: "@swamp/gcp/workspaceevents/tasks",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Task is the core unit of action for A2A. It has a current status and when res...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
    sync: {
      description: "Sync tasks state from GCP",
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
          params["name"] = identifier;
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        tenant: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["tenant"] !== undefined) body["tenant"] = args["tenant"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "workspaceevents.tasks.cancel",
            "path": "v1/{+name}:cancel",
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
    subscribe: {
      description: "subscribe",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "workspaceevents.tasks.subscribe",
            "path": "v1/{+name}:subscribe",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "tenant": { "location": "query" },
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
