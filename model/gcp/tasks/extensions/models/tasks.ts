// Auto-generated extension model for @swamp/gcp/tasks/tasks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Tasks Tasks.
 *
 * Returns the specified task.
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

const BASE_URL = "https://tasks.googleapis.com/";

const GET_CONFIG = {
  "id": "tasks.tasks.get",
  "path": "tasks/v1/lists/{tasklist}/tasks/{task}",
  "httpMethod": "GET",
  "parameterOrder": [
    "tasklist",
    "task",
  ],
  "parameters": {
    "task": {
      "location": "path",
      "required": true,
    },
    "tasklist": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tasks.tasks.insert",
  "path": "tasks/v1/lists/{tasklist}/tasks",
  "httpMethod": "POST",
  "parameterOrder": [
    "tasklist",
  ],
  "parameters": {
    "parent": {
      "location": "query",
    },
    "previous": {
      "location": "query",
    },
    "tasklist": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tasks.tasks.update",
  "path": "tasks/v1/lists/{tasklist}/tasks/{task}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "tasklist",
    "task",
  ],
  "parameters": {
    "task": {
      "location": "path",
      "required": true,
    },
    "tasklist": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tasks.tasks.delete",
  "path": "tasks/v1/lists/{tasklist}/tasks/{task}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "tasklist",
    "task",
  ],
  "parameters": {
    "task": {
      "location": "path",
      "required": true,
    },
    "tasklist": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tasks.tasks.list",
  "path": "tasks/v1/lists/{tasklist}/tasks",
  "httpMethod": "GET",
  "parameterOrder": [
    "tasklist",
  ],
  "parameters": {
    "completedMax": {
      "location": "query",
    },
    "completedMin": {
      "location": "query",
    },
    "dueMax": {
      "location": "query",
    },
    "dueMin": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "showAssigned": {
      "location": "query",
    },
    "showCompleted": {
      "location": "query",
    },
    "showDeleted": {
      "location": "query",
    },
    "showHidden": {
      "location": "query",
    },
    "tasklist": {
      "location": "path",
      "required": true,
    },
    "updatedMin": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  assignmentInfo: z.object({
    driveResourceInfo: z.object({
      driveFileId: z.string().describe(
        "Output only. Identifier of the file in the Drive API.",
      ).optional(),
      resourceKey: z.string().describe(
        "Output only. Resource key required to access files shared via a shared link. Not required for all files. See also developers.google.com/drive/api/guides/resource-keys.",
      ).optional(),
    }).describe(
      "Information about the Drive resource where a task was assigned from (the document, sheet, etc.).",
    ).optional(),
    linkToTask: z.string().describe(
      "Output only. An absolute link to the original task in the surface of assignment (Docs, Chat spaces, etc.).",
    ).optional(),
    spaceInfo: z.object({
      space: z.string().describe(
        'Output only. The Chat space where this task originates from. The format is "spaces/{space}".',
      ).optional(),
    }).describe(
      "Information about the Chat Space where a task was assigned from.",
    ).optional(),
    surfaceType: z.enum([
      "CONTEXT_TYPE_UNSPECIFIED",
      "GMAIL",
      "DOCUMENT",
      "SPACE",
    ]).describe(
      "Output only. The type of surface this assigned task originates from. Currently limited to DOCUMENT or SPACE.",
    ).optional(),
  }).describe(
    "Information about the source of the task assignment (Document, Chat Space).",
  ).optional(),
  completed: z.string().describe(
    "Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed.",
  ).optional(),
  deleted: z.boolean().describe(
    "Flag indicating whether the task has been deleted. For assigned tasks this field is read-only. They can only be deleted by calling tasks.delete, in which case both the assigned task and the original task (in Docs or Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there. The default is False.",
  ).optional(),
  due: z.string().describe(
    "Scheduled date for the task (as an RFC 3339 timestamp). Optional. This represents the day that the task should be done, or that the task is visible on the calendar grid. It doesn't represent the deadline of the task. Only date information is recorded; the time portion of the timestamp is discarded when setting this field. It isn't possible to read or write the time that a task is scheduled for using the API.",
  ).optional(),
  hidden: z.boolean().describe(
    "Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only.",
  ).optional(),
  id: z.string().describe("Task identifier.").optional(),
  notes: z.string().describe(
    "Notes describing the task. Tasks assigned from Google Docs cannot have notes. Optional. Maximum length allowed: 8192 characters.",
  ).optional(),
  status: z.string().describe(
    'Status of the task. This is either "needsAction" or "completed".',
  ).optional(),
  title: z.string().describe(
    "Title of the task. Maximum length allowed: 1024 characters.",
  ).optional(),
  tasklist: z.string().describe("Task list identifier."),
  previous: z.string().describe(
    "Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.",
  ).optional(),
});

const StateSchema = z.object({
  assignmentInfo: z.object({
    driveResourceInfo: z.object({
      driveFileId: z.string(),
      resourceKey: z.string(),
    }),
    linkToTask: z.string(),
    spaceInfo: z.object({
      space: z.string(),
    }),
    surfaceType: z.string(),
  }).optional(),
  completed: z.string().optional(),
  deleted: z.boolean().optional(),
  due: z.string().optional(),
  etag: z.string().optional(),
  hidden: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  links: z.array(z.object({
    description: z.string(),
    link: z.string(),
    type: z.string(),
  })).optional(),
  notes: z.string().optional(),
  parent: z.string().optional(),
  position: z.string().optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  updated: z.string().optional(),
  webViewLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  assignmentInfo: z.object({
    driveResourceInfo: z.object({
      driveFileId: z.string().describe(
        "Output only. Identifier of the file in the Drive API.",
      ).optional(),
      resourceKey: z.string().describe(
        "Output only. Resource key required to access files shared via a shared link. Not required for all files. See also developers.google.com/drive/api/guides/resource-keys.",
      ).optional(),
    }).describe(
      "Information about the Drive resource where a task was assigned from (the document, sheet, etc.).",
    ).optional(),
    linkToTask: z.string().describe(
      "Output only. An absolute link to the original task in the surface of assignment (Docs, Chat spaces, etc.).",
    ).optional(),
    spaceInfo: z.object({
      space: z.string().describe(
        'Output only. The Chat space where this task originates from. The format is "spaces/{space}".',
      ).optional(),
    }).describe(
      "Information about the Chat Space where a task was assigned from.",
    ).optional(),
    surfaceType: z.enum([
      "CONTEXT_TYPE_UNSPECIFIED",
      "GMAIL",
      "DOCUMENT",
      "SPACE",
    ]).describe(
      "Output only. The type of surface this assigned task originates from. Currently limited to DOCUMENT or SPACE.",
    ).optional(),
  }).describe(
    "Information about the source of the task assignment (Document, Chat Space).",
  ).optional(),
  completed: z.string().describe(
    "Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed.",
  ).optional(),
  deleted: z.boolean().describe(
    "Flag indicating whether the task has been deleted. For assigned tasks this field is read-only. They can only be deleted by calling tasks.delete, in which case both the assigned task and the original task (in Docs or Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there. The default is False.",
  ).optional(),
  due: z.string().describe(
    "Scheduled date for the task (as an RFC 3339 timestamp). Optional. This represents the day that the task should be done, or that the task is visible on the calendar grid. It doesn't represent the deadline of the task. Only date information is recorded; the time portion of the timestamp is discarded when setting this field. It isn't possible to read or write the time that a task is scheduled for using the API.",
  ).optional(),
  hidden: z.boolean().describe(
    "Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only.",
  ).optional(),
  id: z.string().describe("Task identifier.").optional(),
  notes: z.string().describe(
    "Notes describing the task. Tasks assigned from Google Docs cannot have notes. Optional. Maximum length allowed: 8192 characters.",
  ).optional(),
  status: z.string().describe(
    'Status of the task. This is either "needsAction" or "completed".',
  ).optional(),
  title: z.string().describe(
    "Title of the task. Maximum length allowed: 1024 characters.",
  ).optional(),
  tasklist: z.string().describe("Task list identifier.").optional(),
  previous: z.string().describe(
    "Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Tasks Tasks. Registered at `@swamp/gcp/tasks/tasks`. */
export const model = {
  type: "@swamp/gcp/tasks/tasks",
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
      description: "Returns the specified task.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tasks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        const body: Record<string, unknown> = {};
        if (g["assignmentInfo"] !== undefined) {
          body["assignmentInfo"] = g["assignmentInfo"];
        }
        if (g["completed"] !== undefined) body["completed"] = g["completed"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["due"] !== undefined) body["due"] = g["due"];
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["previous"] !== undefined) body["previous"] = g["previous"];
        if (g["name"] !== undefined) params["task"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "tasklist": String(g["tasklist"] ?? "") },
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
      description: "Get a tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        params["task"] = args.identifier;
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
      description: "Update tasks attributes",
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
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        } else if (existing["tasklist"]) {
          params["tasklist"] = String(existing["tasklist"]);
        }
        params["task"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["assignmentInfo"] !== undefined) {
          body["assignmentInfo"] = g["assignmentInfo"];
        }
        if (g["completed"] !== undefined) body["completed"] = g["completed"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["due"] !== undefined) body["due"] = g["due"];
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
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
      description: "Delete the tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        params["task"] = args.identifier;
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
          if (g["tasklist"] !== undefined) {
            params["tasklist"] = String(g["tasklist"]);
          } else if (existing["tasklist"]) {
            params["tasklist"] = String(existing["tasklist"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["task"] = identifier;
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
    clear: {
      description: "clear",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "tasks.tasks.clear",
            "path": "tasks/v1/lists/{tasklist}/clear",
            "httpMethod": "POST",
            "parameterOrder": ["tasklist"],
            "parameters": {
              "tasklist": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    move: {
      description: "move",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
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
        params["task"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "tasks.tasks.move",
            "path": "tasks/v1/lists/{tasklist}/tasks/{task}/move",
            "httpMethod": "POST",
            "parameterOrder": ["tasklist", "task"],
            "parameters": {
              "destinationTasklist": { "location": "query" },
              "parent": { "location": "query" },
              "previous": { "location": "query" },
              "task": { "location": "path", "required": true },
              "tasklist": { "location": "path", "required": true },
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
