// Auto-generated extension model for @swamp/gcp/gmail/users-settings-filters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Settings.Filters.
 *
 * Resource definition for Gmail filters. Filters apply to specific messages instead of an entire email thread.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.settings.filters.get",
  "path": "gmail/v1/users/{userId}/settings/filters/{id}",
  "httpMethod": "GET",
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

const INSERT_CONFIG = {
  "id": "gmail.users.settings.filters.create",
  "path": "gmail/v1/users/{userId}/settings/filters",
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

const DELETE_CONFIG = {
  "id": "gmail.users.settings.filters.delete",
  "path": "gmail/v1/users/{userId}/settings/filters/{id}",
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
  action: z.object({
    addLabelIds: z.array(z.string()).describe(
      "List of labels to add to the message.",
    ).optional(),
    forward: z.string().describe(
      'Email address that the message should be forwarded to. This effectively redirects the message to the address specified in this field, maintaining the original sender in the "From" field.',
    ).optional(),
    removeLabelIds: z.array(z.string()).describe(
      "List of labels to remove from the message.",
    ).optional(),
  }).describe("A set of actions to perform on a message.").optional(),
  criteria: z.object({
    excludeChats: z.boolean().describe(
      "Whether the response should exclude chats.",
    ).optional(),
    from: z.string().describe("The sender's display name or email address.")
      .optional(),
    hasAttachment: z.boolean().describe(
      "Whether the message has any attachment.",
    ).optional(),
    negatedQuery: z.string().describe(
      'Only return messages not matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`.',
    ).optional(),
    query: z.string().describe(
      'Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`.',
    ).optional(),
    size: z.number().int().describe(
      "The size of the entire RFC822 message in bytes, including all headers and attachments.",
    ).optional(),
    sizeComparison: z.enum(["unspecified", "smaller", "larger"]).describe(
      "How the message size in bytes should be in relation to the size field.",
    ).optional(),
    subject: z.string().describe(
      "Case-insensitive phrase found in the message's subject. Trailing and leading whitespace are be trimmed and adjacent spaces are collapsed.",
    ).optional(),
    to: z.string().describe(
      'The recipient\'s display name or email address. Includes recipients in the "to", "cc", and "bcc" header fields. You can use simply the local part of the email address. For example, "example" and "example@" both match "example@gmail.com". This field is case-insensitive.',
    ).optional(),
  }).describe("Message matching criteria.").optional(),
  id: z.string().describe("The server assigned ID of the filter.").optional(),
  userId: z.string().describe(
    'User\'s email address. The special value "me" can be used to indicate the authenticated user.',
  ),
});

const StateSchema = z.object({
  action: z.object({
    addLabelIds: z.array(z.string()),
    forward: z.string(),
    removeLabelIds: z.array(z.string()),
  }).optional(),
  criteria: z.object({
    excludeChats: z.boolean(),
    from: z.string(),
    hasAttachment: z.boolean(),
    negatedQuery: z.string(),
    query: z.string(),
    size: z.number(),
    sizeComparison: z.string(),
    subject: z.string(),
    to: z.string(),
  }).optional(),
  id: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  action: z.object({
    addLabelIds: z.array(z.string()).describe(
      "List of labels to add to the message.",
    ).optional(),
    forward: z.string().describe(
      'Email address that the message should be forwarded to. This effectively redirects the message to the address specified in this field, maintaining the original sender in the "From" field.',
    ).optional(),
    removeLabelIds: z.array(z.string()).describe(
      "List of labels to remove from the message.",
    ).optional(),
  }).describe("A set of actions to perform on a message.").optional(),
  criteria: z.object({
    excludeChats: z.boolean().describe(
      "Whether the response should exclude chats.",
    ).optional(),
    from: z.string().describe("The sender's display name or email address.")
      .optional(),
    hasAttachment: z.boolean().describe(
      "Whether the message has any attachment.",
    ).optional(),
    negatedQuery: z.string().describe(
      'Only return messages not matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`.',
    ).optional(),
    query: z.string().describe(
      'Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`.',
    ).optional(),
    size: z.number().int().describe(
      "The size of the entire RFC822 message in bytes, including all headers and attachments.",
    ).optional(),
    sizeComparison: z.enum(["unspecified", "smaller", "larger"]).describe(
      "How the message size in bytes should be in relation to the size field.",
    ).optional(),
    subject: z.string().describe(
      "Case-insensitive phrase found in the message's subject. Trailing and leading whitespace are be trimmed and adjacent spaces are collapsed.",
    ).optional(),
    to: z.string().describe(
      'The recipient\'s display name or email address. Includes recipients in the "to", "cc", and "bcc" header fields. You can use simply the local part of the email address. For example, "example" and "example@" both match "example@gmail.com". This field is case-insensitive.',
    ).optional(),
  }).describe("Message matching criteria.").optional(),
  id: z.string().describe("The server assigned ID of the filter.").optional(),
  userId: z.string().describe(
    'User\'s email address. The special value "me" can be used to indicate the authenticated user.',
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Settings.Filters. Registered at `@swamp/gcp/gmail/users-settings-filters`. */
export const model = {
  type: "@swamp/gcp/gmail/users-settings-filters",
  version: "2026.05.18.2",
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
      toVersion: "2026.05.01.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Resource definition for Gmail filters. Filters apply to specific messages ins...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a filters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["id"] !== undefined) body["id"] = g["id"];
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
      description: "Get a filters",
      arguments: z.object({
        identifier: z.string().describe("The id of the filters"),
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
      description: "Delete the filters",
      arguments: z.object({
        identifier: z.string().describe("The id of the filters"),
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
      description: "Sync filters state from GCP",
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
  },
};
