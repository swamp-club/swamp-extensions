// Auto-generated extension model for @swamp/gcp/drive/comments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Comments.
 *
 * A comment on a file. Some resource methods (such as `comments.update`) require a `commentId`. Use the `comments.list` method to retrieve the ID for a comment in a file.
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

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const GET_CONFIG = {
  "id": "drive.comments.get",
  "path": "files/{fileId}/comments/{commentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "commentId",
  ],
  "parameters": {
    "commentId": {
      "location": "path",
      "required": true,
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "includeDeleted": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.comments.create",
  "path": "files/{fileId}/comments",
  "httpMethod": "POST",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.comments.update",
  "path": "files/{fileId}/comments/{commentId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "fileId",
    "commentId",
  ],
  "parameters": {
    "commentId": {
      "location": "path",
      "required": true,
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.comments.delete",
  "path": "files/{fileId}/comments/{commentId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
    "commentId",
  ],
  "parameters": {
    "commentId": {
      "location": "path",
      "required": true,
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.comments.list",
  "path": "files/{fileId}/comments",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "includeDeleted": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "startModifiedTime": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  anchor: z.string().describe(
    "A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies](https://developers.google.com/workspace/drive/api/v3/manage-comments).",
  ).optional(),
  author: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  content: z.string().describe(
    "The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed.",
  ),
  createdTime: z.string().describe(
    "The time at which the comment was created (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "The last time the comment or any of its replies was modified (RFC 3339 date-time).",
  ).optional(),
  quotedFileContent: z.object({
    mimeType: z.string().describe("The MIME type of the quoted content.")
      .optional(),
    value: z.string().describe(
      "The quoted content itself. This is interpreted as plain text if set through the API.",
    ).optional(),
  }).describe(
    "The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment.",
  ).optional(),
  fileId: z.string().describe("The ID of the file."),
});

const StateSchema = z.object({
  anchor: z.string().optional(),
  assigneeEmailAddress: z.string().optional(),
  author: z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  }).optional(),
  content: z.string().optional(),
  createdTime: z.string().optional(),
  deleted: z.boolean().optional(),
  htmlContent: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  mentionedEmailAddresses: z.array(z.string()).optional(),
  modifiedTime: z.string().optional(),
  quotedFileContent: z.object({
    mimeType: z.string(),
    value: z.string(),
  }).optional(),
  replies: z.array(z.object({
    action: z.string(),
    assigneeEmailAddress: z.string(),
    author: z.object({
      displayName: z.string(),
      emailAddress: z.string(),
      kind: z.string(),
      me: z.boolean(),
      permissionId: z.string(),
      photoLink: z.string(),
    }),
    content: z.string(),
    createdTime: z.string(),
    deleted: z.boolean(),
    htmlContent: z.string(),
    id: z.string(),
    kind: z.string(),
    mentionedEmailAddresses: z.array(z.string()),
    modifiedTime: z.string(),
  })).optional(),
  resolved: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  anchor: z.string().describe(
    "A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies](https://developers.google.com/workspace/drive/api/v3/manage-comments).",
  ).optional(),
  author: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  content: z.string().describe(
    "The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the comment was created (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "The last time the comment or any of its replies was modified (RFC 3339 date-time).",
  ).optional(),
  quotedFileContent: z.object({
    mimeType: z.string().describe("The MIME type of the quoted content.")
      .optional(),
    value: z.string().describe(
      "The quoted content itself. This is interpreted as plain text if set through the API.",
    ).optional(),
  }).describe(
    "The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment.",
  ).optional(),
  fileId: z.string().describe("The ID of the file.").optional(),
});

/** Swamp extension model for Google Cloud Google Drive Comments. Registered at `@swamp/gcp/drive/comments`. */
export const model = {
  type: "@swamp/gcp/drive/comments",
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
      description:
        "A comment on a file. Some resource methods (such as `comments.update`) requir...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a comments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        const body: Record<string, unknown> = {};
        if (g["anchor"] !== undefined) body["anchor"] = g["anchor"];
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["quotedFileContent"] !== undefined) {
          body["quotedFileContent"] = g["quotedFileContent"];
        }
        if (g["name"] !== undefined) params["commentId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "fileId": String(g["fileId"] ?? "") },
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
      description: "Get a comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["commentId"] = args.identifier;
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
      description: "Update comments attributes",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        else if (existing["fileId"]) {
          params["fileId"] = String(existing["fileId"]);
        }
        params["commentId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["anchor"] !== undefined) body["anchor"] = g["anchor"];
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["quotedFileContent"] !== undefined) {
          body["quotedFileContent"] = g["quotedFileContent"];
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
      description: "Delete the comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["commentId"] = args.identifier;
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
      description: "Sync comments state from GCP",
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
          if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
          else if (existing["fileId"]) {
            params["fileId"] = String(existing["fileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["commentId"] = identifier;
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
