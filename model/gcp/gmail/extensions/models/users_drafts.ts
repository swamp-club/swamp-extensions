// Auto-generated extension model for @swamp/gcp/gmail/users-drafts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Drafts.
 *
 * A draft email in the user's mailbox.
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

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.drafts.get",
  "path": "gmail/v1/users/{userId}/drafts/{id}",
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
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gmail.users.drafts.create",
  "path": "gmail/v1/users/{userId}/drafts",
  "httpMethod": "POST",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "gmail.users.drafts.update",
  "path": "gmail/v1/users/{userId}/drafts/{id}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "gmail.users.drafts.delete",
  "path": "gmail/v1/users/{userId}/drafts/{id}",
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

const GlobalArgsSchema = z.object({
  id: z.string().describe("The immutable ID of the draft.").optional(),
  message: z.object({
    classificationLabelValues: z.array(z.object({
      fields: z.array(z.object({
        fieldId: z.unknown().describe(
          "Required. The field ID for the Classification Label Value. Maps to the ID field of the Google Drive `Label.Field` object.",
        ).optional(),
        selection: z.unknown().describe(
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
    snippet: z.string().describe("A short part of the message text.")
      .optional(),
    threadId: z.string().describe(
      "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.",
    ).optional(),
  }).describe("An email message.").optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ),
});

const StateSchema = z.object({
  id: z.string(),
  message: z.object({
    classificationLabelValues: z.array(z.object({
      fields: z.array(z.object({
        fieldId: z.unknown(),
        selection: z.unknown(),
      })),
      labelId: z.string(),
    })),
    historyId: z.string(),
    id: z.string(),
    internalDate: z.string(),
    labelIds: z.array(z.string()),
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
    }),
    raw: z.string(),
    sizeEstimate: z.number(),
    snippet: z.string(),
    threadId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  id: z.string().describe("The immutable ID of the draft.").optional(),
  message: z.object({
    classificationLabelValues: z.array(z.object({
      fields: z.array(z.object({
        fieldId: z.unknown().describe(
          "Required. The field ID for the Classification Label Value. Maps to the ID field of the Google Drive `Label.Field` object.",
        ).optional(),
        selection: z.unknown().describe(
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
    snippet: z.string().describe("A short part of the message text.")
      .optional(),
    threadId: z.string().describe(
      "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.",
    ).optional(),
  }).describe("An email message.").optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Drafts. Registered at `@swamp/gcp/gmail/users-drafts`. */
export const model = {
  type: "@swamp/gcp/gmail/users-drafts",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A draft email in the user's mailbox.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a drafts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["message"] !== undefined) body["message"] = g["message"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a drafts",
      arguments: z.object({
        identifier: z.string().describe("The id of the drafts"),
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
    update: {
      description: "Update drafts attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["message"] !== undefined) body["message"] = g["message"];
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
      description: "Delete the drafts",
      arguments: z.object({
        identifier: z.string().describe("The id of the drafts"),
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
      description: "Sync drafts state from GCP",
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
    send: {
      description: "send",
      arguments: z.object({
        id: z.any().optional(),
        message: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["message"] !== undefined) body["message"] = args["message"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.drafts.send",
            "path": "gmail/v1/users/{userId}/drafts/send",
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
  },
};
