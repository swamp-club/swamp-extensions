// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Tasks Tasks. Registered at `@swamp/gcp/tasks/tasks`. */
export const model = {
  type: "@swamp/gcp/tasks/tasks",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          credentials,
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        params["task"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        params["task"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List tasks resources",
      arguments: z.object({
        completedMax: z.string().describe(
          "Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.",
        ).optional(),
        completedMin: z.string().describe(
          "Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.",
        ).optional(),
        dueMax: z.string().describe(
          "Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.",
        ).optional(),
        dueMin: z.string().describe(
          "Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of tasks returned on one page. Optional. The default is 20 (max allowed: 100).",
        ).optional(),
        showAssigned: z.boolean().describe(
          "Optional. Flag indicating whether tasks assigned to the current user are returned in the result. Optional. The default is False.",
        ).optional(),
        showCompleted: z.boolean().describe(
          "Flag indicating whether completed tasks are returned in the result. Note that showHidden must also be True to show tasks completed in first party clients, such as the web UI and Google's mobile apps. Optional. The default is True.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Flag indicating whether deleted tasks are returned in the result. Optional. The default is False.",
        ).optional(),
        showHidden: z.boolean().describe(
          "Flag indicating whether hidden tasks are returned in the result. Optional. The default is False.",
        ).optional(),
        updatedMin: z.string().describe(
          "Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tasklist"] !== undefined) {
          params["tasklist"] = String(g["tasklist"]);
        }
        if (args["completedMax"] !== undefined) {
          params["completedMax"] = String(args["completedMax"]);
        }
        if (args["completedMin"] !== undefined) {
          params["completedMin"] = String(args["completedMin"]);
        }
        if (args["dueMax"] !== undefined) {
          params["dueMax"] = String(args["dueMax"]);
        }
        if (args["dueMin"] !== undefined) {
          params["dueMin"] = String(args["dueMin"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["showAssigned"] !== undefined) {
          params["showAssigned"] = String(args["showAssigned"]);
        }
        if (args["showCompleted"] !== undefined) {
          params["showCompleted"] = String(args["showCompleted"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        if (args["showHidden"] !== undefined) {
          params["showHidden"] = String(args["showHidden"]);
        }
        if (args["updatedMin"] !== undefined) {
          params["updatedMin"] = String(args["updatedMin"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    clear: {
      description: "clear",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    move: {
      description: "move",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
