// Auto-generated extension model for @swamp/gcp/gmail/users-messages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Messages.
 *
 * An email message.
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

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.messages.get",
  "path": "gmail/v1/users/{userId}/messages/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "id",
  ],
  "parameters": {
    "format": {
      "location": "query",
    },
    "id": {
      "location": "path",
      "required": true,
    },
    "metadataHeaders": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gmail.users.messages.insert",
  "path": "gmail/v1/users/{userId}/messages",
  "httpMethod": "POST",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "deleted": {
      "location": "query",
    },
    "internalDateSource": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gmail.users.messages.delete",
  "path": "gmail/v1/users/{userId}/messages/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gmail.users.messages.list",
  "path": "gmail/v1/users/{userId}/messages",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "includeSpamTrash": {
      "location": "query",
    },
    "labelIds": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  classificationLabelValues: z.array(z.object({
    fields: z.array(z.object({
      fieldId: z.string().describe(
        "Required. The field ID for the Classification Label Value. Maps to the ID field of the Google Drive `Label.Field` object.",
      ).optional(),
      selection: z.string().describe(
        "Selection choice ID for the selection option. Should only be set if the field type is `SELECTION` in the Google Drive `Label.Field` object. Maps to the id field of the Google Drive `Label.Field.SelectionOptions` resource.",
      ).optional(),
    })).describe("Field values for the given classification label ID.")
      .optional(),
    labelId: z.string().describe(
      "Required. The canonical or raw alphanumeric classification label ID. Maps to the ID field of the Google Drive Label resource.",
    ).optional(),
  })).describe(
    "Classification Label values on the message. Available Classification Label schemas can be queried using the Google Drive Labels API. Each classification label ID must be unique. If duplicate IDs are provided, only one will be retained, and the selection is arbitrary. Only used for Google Workspace accounts.",
  ).optional(),
  historyId: z.string().describe(
    "The ID of the last history record that modified this message.",
  ).optional(),
  id: z.string().describe("The immutable ID of the message.").optional(),
  internalDate: z.string().describe(
    "The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header.",
  ).optional(),
  labelIds: z.array(z.string()).describe(
    "List of IDs of labels applied to this message.",
  ).optional(),
  payload: z.object({
    body: z.object({
      attachmentId: z.string().describe(
        "When present, contains the ID of an external attachment that can be retrieved in a separate `messages.attachments.get` request. When not present, the entire content of the message part body is contained in the data field.",
      ).optional(),
      data: z.string().describe(
        "The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment.",
      ).optional(),
      size: z.number().int().describe(
        "Number of bytes for the message part data (encoding notwithstanding).",
      ).optional(),
    }).describe("The body of a single MIME message part.").optional(),
    filename: z.string().describe(
      "The filename of the attachment. Only present if this message part represents an attachment.",
    ).optional(),
    headers: z.array(z.object({
      name: z.string().describe(
        "The name of the header before the `:` separator. For example, `To`.",
      ).optional(),
      value: z.string().describe(
        "The value of the header after the `:` separator. For example, `someuser@example.com`.",
      ).optional(),
    })).describe(
      "List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as `To`, `From`, and `Subject`.",
    ).optional(),
    mimeType: z.string().describe("The MIME type of the message part.")
      .optional(),
    partId: z.string().describe("The immutable ID of the message part.")
      .optional(),
    parts: z.array(z.string()).describe(
      "The child MIME message parts of this part. This only applies to container MIME message parts, for example `multipart/*`. For non- container MIME message part types, such as `text/plain`, this field is empty. For more information, see RFC 1521.",
    ).optional(),
  }).describe("A single MIME message part.").optional(),
  raw: z.string().describe(
    "The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied.",
  ),
  sizeEstimate: z.number().int().describe(
    "Estimated size in bytes of the message.",
  ).optional(),
  snippet: z.string().describe("A short part of the message text.").optional(),
  threadId: z.string().describe(
    "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.",
  ).optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ),
  deleted: z.string().describe(
    "Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts.",
  ).optional(),
  internalDateSource: z.string().describe(
    "Source for Gmail's internal date of the message.",
  ).optional(),
});

const StateSchema = z.object({
  classificationLabelValues: z.array(z.object({
    fields: z.array(z.object({
      fieldId: z.string(),
      selection: z.string(),
    })),
    labelId: z.string(),
  })).optional(),
  historyId: z.string().optional(),
  id: z.string(),
  internalDate: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  payload: z.object({
    body: z.object({
      attachmentId: z.string(),
      data: z.string(),
      size: z.number(),
    }),
    filename: z.string(),
    headers: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    mimeType: z.string(),
    partId: z.string(),
    parts: z.array(z.string()),
  }).optional(),
  raw: z.string().optional(),
  sizeEstimate: z.number().optional(),
  snippet: z.string().optional(),
  threadId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  classificationLabelValues: z.array(z.object({
    fields: z.array(z.object({
      fieldId: z.string().describe(
        "Required. The field ID for the Classification Label Value. Maps to the ID field of the Google Drive `Label.Field` object.",
      ).optional(),
      selection: z.string().describe(
        "Selection choice ID for the selection option. Should only be set if the field type is `SELECTION` in the Google Drive `Label.Field` object. Maps to the id field of the Google Drive `Label.Field.SelectionOptions` resource.",
      ).optional(),
    })).describe("Field values for the given classification label ID.")
      .optional(),
    labelId: z.string().describe(
      "Required. The canonical or raw alphanumeric classification label ID. Maps to the ID field of the Google Drive Label resource.",
    ).optional(),
  })).describe(
    "Classification Label values on the message. Available Classification Label schemas can be queried using the Google Drive Labels API. Each classification label ID must be unique. If duplicate IDs are provided, only one will be retained, and the selection is arbitrary. Only used for Google Workspace accounts.",
  ).optional(),
  historyId: z.string().describe(
    "The ID of the last history record that modified this message.",
  ).optional(),
  id: z.string().describe("The immutable ID of the message.").optional(),
  internalDate: z.string().describe(
    "The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header.",
  ).optional(),
  labelIds: z.array(z.string()).describe(
    "List of IDs of labels applied to this message.",
  ).optional(),
  payload: z.object({
    body: z.object({
      attachmentId: z.string().describe(
        "When present, contains the ID of an external attachment that can be retrieved in a separate `messages.attachments.get` request. When not present, the entire content of the message part body is contained in the data field.",
      ).optional(),
      data: z.string().describe(
        "The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment.",
      ).optional(),
      size: z.number().int().describe(
        "Number of bytes for the message part data (encoding notwithstanding).",
      ).optional(),
    }).describe("The body of a single MIME message part.").optional(),
    filename: z.string().describe(
      "The filename of the attachment. Only present if this message part represents an attachment.",
    ).optional(),
    headers: z.array(z.object({
      name: z.string().describe(
        "The name of the header before the `:` separator. For example, `To`.",
      ).optional(),
      value: z.string().describe(
        "The value of the header after the `:` separator. For example, `someuser@example.com`.",
      ).optional(),
    })).describe(
      "List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as `To`, `From`, and `Subject`.",
    ).optional(),
    mimeType: z.string().describe("The MIME type of the message part.")
      .optional(),
    partId: z.string().describe("The immutable ID of the message part.")
      .optional(),
    parts: z.array(z.string()).describe(
      "The child MIME message parts of this part. This only applies to container MIME message parts, for example `multipart/*`. For non- container MIME message part types, such as `text/plain`, this field is empty. For more information, see RFC 1521.",
    ).optional(),
  }).describe("A single MIME message part.").optional(),
  raw: z.string().describe(
    "The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied.",
  ).optional(),
  sizeEstimate: z.number().int().describe(
    "Estimated size in bytes of the message.",
  ).optional(),
  snippet: z.string().describe("A short part of the message text.").optional(),
  threadId: z.string().describe(
    "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.",
  ).optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ).optional(),
  deleted: z.string().describe(
    "Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts.",
  ).optional(),
  internalDateSource: z.string().describe(
    "Source for Gmail's internal date of the message.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Messages. Registered at `@swamp/gcp/gmail/users-messages`. */
export const model = {
  type: "@swamp/gcp/gmail/users-messages",
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
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      description: "An email message.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a messages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["classificationLabelValues"] !== undefined) {
          body["classificationLabelValues"] = g["classificationLabelValues"];
        }
        if (g["historyId"] !== undefined) body["historyId"] = g["historyId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalDate"] !== undefined) {
          body["internalDate"] = g["internalDate"];
        }
        if (g["labelIds"] !== undefined) body["labelIds"] = g["labelIds"];
        if (g["payload"] !== undefined) body["payload"] = g["payload"];
        if (g["raw"] !== undefined) body["raw"] = g["raw"];
        if (g["sizeEstimate"] !== undefined) {
          body["sizeEstimate"] = g["sizeEstimate"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["threadId"] !== undefined) body["threadId"] = g["threadId"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["internalDateSource"] !== undefined) {
          body["internalDateSource"] = g["internalDateSource"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "userId": String(g["userId"] ?? "") },
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
      description: "Get a messages",
      arguments: z.object({
        identifier: z.string().describe("The id of the messages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
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
      description: "Delete the messages",
      arguments: z.object({
        identifier: z.string().describe("The id of the messages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
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
      description: "Sync messages state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
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
    list: {
      description: "List messages resources",
      arguments: z.object({
        includeSpamTrash: z.boolean().describe(
          "Include messages from `SPAM` and `TRASH` in the results.",
        ).optional(),
        labelIds: z.string().describe(
          "Only return messages with labels that match all of the specified label IDs. Messages in a thread might have labels that other messages in the same thread don't have. To learn more, see [Manage labels on messages and threads](https://developers.google.com/workspace/gmail/api/guides/labels#manage_labels_on_messages_threads).",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500.",
        ).optional(),
        q: z.string().describe(
          'Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope.',
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (args["includeSpamTrash"] !== undefined) {
          params["includeSpamTrash"] = String(args["includeSpamTrash"]);
        }
        if (args["labelIds"] !== undefined) {
          params["labelIds"] = String(args["labelIds"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "messages",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        ids: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (args["ids"] !== undefined) body["ids"] = args["ids"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.batchDelete",
            "path": "gmail/v1/users/{userId}/messages/batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["userId"],
            "parameters": {
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_modify: {
      description: "batch modify",
      arguments: z.object({
        addLabelIds: z.any().optional(),
        ids: z.any().optional(),
        removeLabelIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (args["addLabelIds"] !== undefined) {
          body["addLabelIds"] = args["addLabelIds"];
        }
        if (args["ids"] !== undefined) body["ids"] = args["ids"];
        if (args["removeLabelIds"] !== undefined) {
          body["removeLabelIds"] = args["removeLabelIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.batchModify",
            "path": "gmail/v1/users/{userId}/messages/batchModify",
            "httpMethod": "POST",
            "parameterOrder": ["userId"],
            "parameters": {
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        classificationLabelValues: z.any().optional(),
        historyId: z.any().optional(),
        id: z.any().optional(),
        internalDate: z.any().optional(),
        labelIds: z.any().optional(),
        payload: z.any().optional(),
        raw: z.any().optional(),
        sizeEstimate: z.any().optional(),
        snippet: z.any().optional(),
        threadId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (args["classificationLabelValues"] !== undefined) {
          body["classificationLabelValues"] = args["classificationLabelValues"];
        }
        if (args["historyId"] !== undefined) {
          body["historyId"] = args["historyId"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["internalDate"] !== undefined) {
          body["internalDate"] = args["internalDate"];
        }
        if (args["labelIds"] !== undefined) body["labelIds"] = args["labelIds"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["raw"] !== undefined) body["raw"] = args["raw"];
        if (args["sizeEstimate"] !== undefined) {
          body["sizeEstimate"] = args["sizeEstimate"];
        }
        if (args["snippet"] !== undefined) body["snippet"] = args["snippet"];
        if (args["threadId"] !== undefined) body["threadId"] = args["threadId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.import",
            "path": "gmail/v1/users/{userId}/messages/import",
            "httpMethod": "POST",
            "parameterOrder": ["userId"],
            "parameters": {
              "deleted": { "location": "query" },
              "internalDateSource": { "location": "query" },
              "neverMarkSpam": { "location": "query" },
              "processForCalendar": { "location": "query" },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    modify: {
      description: "modify",
      arguments: z.object({
        addLabelIds: z.any().optional(),
        removeLabelIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const body: Record<string, unknown> = {};
        if (args["addLabelIds"] !== undefined) {
          body["addLabelIds"] = args["addLabelIds"];
        }
        if (args["removeLabelIds"] !== undefined) {
          body["removeLabelIds"] = args["removeLabelIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.modify",
            "path": "gmail/v1/users/{userId}/messages/{id}/modify",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    send: {
      description: "send",
      arguments: z.object({
        classificationLabelValues: z.any().optional(),
        historyId: z.any().optional(),
        id: z.any().optional(),
        internalDate: z.any().optional(),
        labelIds: z.any().optional(),
        payload: z.any().optional(),
        raw: z.any().optional(),
        sizeEstimate: z.any().optional(),
        snippet: z.any().optional(),
        threadId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (args["classificationLabelValues"] !== undefined) {
          body["classificationLabelValues"] = args["classificationLabelValues"];
        }
        if (args["historyId"] !== undefined) {
          body["historyId"] = args["historyId"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["internalDate"] !== undefined) {
          body["internalDate"] = args["internalDate"];
        }
        if (args["labelIds"] !== undefined) body["labelIds"] = args["labelIds"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["raw"] !== undefined) body["raw"] = args["raw"];
        if (args["sizeEstimate"] !== undefined) {
          body["sizeEstimate"] = args["sizeEstimate"];
        }
        if (args["snippet"] !== undefined) body["snippet"] = args["snippet"];
        if (args["threadId"] !== undefined) body["threadId"] = args["threadId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.send",
            "path": "gmail/v1/users/{userId}/messages/send",
            "httpMethod": "POST",
            "parameterOrder": ["userId"],
            "parameters": {
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    trash: {
      description: "trash",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.trash",
            "path": "gmail/v1/users/{userId}/messages/{id}/trash",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    untrash: {
      description: "untrash",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.messages.untrash",
            "path": "gmail/v1/users/{userId}/messages/{id}/untrash",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
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
