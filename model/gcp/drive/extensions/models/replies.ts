// Auto-generated extension model for @swamp/gcp/drive/replies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Replies.
 *
 * A reply to a comment on a file. Some resource methods (such as `replies.update`) require a `replyId`. Use the `replies.list` method to retrieve the ID for a reply.
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
  "id": "drive.replies.get",
  "path": "files/{fileId}/comments/{commentId}/replies/{replyId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "commentId",
    "replyId",
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
    "replyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.replies.create",
  "path": "files/{fileId}/comments/{commentId}/replies",
  "httpMethod": "POST",
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

const UPDATE_CONFIG = {
  "id": "drive.replies.update",
  "path": "files/{fileId}/comments/{commentId}/replies/{replyId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "fileId",
    "commentId",
    "replyId",
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
    "replyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.replies.delete",
  "path": "files/{fileId}/comments/{commentId}/replies/{replyId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
    "commentId",
    "replyId",
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
    "replyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  action: z.string().describe(
    "The action the reply performed to the parent comment. The supported values are: * `resolve` * `reopen`",
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
    "The plain text content of the reply. This field is used for setting the content, while `htmlContent` should be displayed. This field is required by the `create` method if no `action` value is specified.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the reply was created (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "The last time the reply was modified (RFC 3339 date-time).",
  ).optional(),
  fileId: z.string().describe("The ID of the file."),
  commentId: z.string().describe("The ID of the comment."),
});

const StateSchema = z.object({
  action: z.string().optional(),
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
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  action: z.string().describe(
    "The action the reply performed to the parent comment. The supported values are: * `resolve` * `reopen`",
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
    "The plain text content of the reply. This field is used for setting the content, while `htmlContent` should be displayed. This field is required by the `create` method if no `action` value is specified.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the reply was created (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "The last time the reply was modified (RFC 3339 date-time).",
  ).optional(),
  fileId: z.string().describe("The ID of the file.").optional(),
  commentId: z.string().describe("The ID of the comment.").optional(),
});

/** Swamp extension model for Google Cloud Google Drive Replies. Registered at `@swamp/gcp/drive/replies`. */
export const model = {
  type: "@swamp/gcp/drive/replies",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A reply to a comment on a file. Some resource methods (such as `replies.updat...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a replies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        if (g["commentId"] !== undefined) {
          params["commentId"] = String(g["commentId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["name"] !== undefined) params["replyId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a replies",
      arguments: z.object({
        identifier: z.string().describe("The name of the replies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        if (g["commentId"] !== undefined) {
          params["commentId"] = String(g["commentId"]);
        }
        params["replyId"] = args.identifier;
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
      description: "Update replies attributes",
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
        if (g["commentId"] !== undefined) {
          params["commentId"] = String(g["commentId"]);
        } else if (existing["commentId"]) {
          params["commentId"] = String(existing["commentId"]);
        }
        params["replyId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
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
      description: "Delete the replies",
      arguments: z.object({
        identifier: z.string().describe("The name of the replies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        if (g["commentId"] !== undefined) {
          params["commentId"] = String(g["commentId"]);
        }
        params["replyId"] = args.identifier;
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
      description: "Sync replies state from GCP",
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
          if (g["commentId"] !== undefined) {
            params["commentId"] = String(g["commentId"]);
          } else if (existing["commentId"]) {
            params["commentId"] = String(existing["commentId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["replyId"] = identifier;
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
