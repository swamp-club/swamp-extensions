// Auto-generated extension model for @swamp/gcp/chat/spaces-messages-reactions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Chat Spaces.Messages.Reactions.
 *
 * A reaction to a message.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chat.googleapis.com/";

const INSERT_CONFIG = {
  "id": "chat.spaces.messages.reactions.create",
  "path": "v1/{+parent}/reactions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "chat.spaces.messages.reactions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "chat.spaces.messages.reactions.list",
  "path": "v1/{+parent}/reactions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  emoji: z.object({
    customEmoji: z.object({
      emojiName: z.string().describe(
        "Optional. Immutable. User-provided name for the custom emoji, which is unique within the organization. Required when the custom emoji is created, output only otherwise. Emoji names must start and end with colons, must be lowercase and can only contain alphanumeric characters, hyphens, and underscores. Hyphens and underscores should be used to separate words and cannot be used consecutively. Example: `:valid-emoji-name:`",
      ).optional(),
      name: z.string().describe(
        "Identifier. The resource name of the custom emoji, assigned by the server. Format: `customEmojis/{customEmoji}`",
      ).optional(),
      payload: z.object({
        fileContent: z.string().describe(
          "Required. Input only. The image used for the custom emoji. The payload must be under 256 KB and the dimension of the image must be square and between 64 and 500 pixels. The restrictions are subject to change.",
        ).optional(),
        filename: z.string().describe(
          "Required. Input only. The image file name. Supported file extensions: `.png`, `.jpg`, `.gif`.",
        ).optional(),
      }).describe("Payload data for the custom emoji.").optional(),
      temporaryImageUri: z.string().describe(
        "Output only. A temporary image URL for the custom emoji, valid for at least 10 minutes. Note that this is not populated in the response when the custom emoji is created.",
      ).optional(),
      uid: z.string().describe(
        "Output only. Unique key for the custom emoji resource.",
      ).optional(),
    }).describe(
      "Represents a [custom emoji](https://support.google.com/chat/answer/12800149).",
    ).optional(),
    unicode: z.string().describe(
      "Optional. A basic emoji represented by a unicode string.",
    ).optional(),
  }).describe("An emoji that is used as a reaction to a message.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the reaction. Format: `spaces/{space}/messages/{message}/reactions/{reaction}`",
  ).optional(),
  user: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  emoji: z.object({
    customEmoji: z.object({
      emojiName: z.string(),
      name: z.string(),
      payload: z.object({
        fileContent: z.string(),
        filename: z.string(),
      }),
      temporaryImageUri: z.string(),
      uid: z.string(),
    }),
    unicode: z.string(),
  }).optional(),
  name: z.string(),
  user: z.object({
    displayName: z.string(),
    domainId: z.string(),
    isAnonymous: z.boolean(),
    name: z.string(),
    type: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  emoji: z.object({
    customEmoji: z.object({
      emojiName: z.string().describe(
        "Optional. Immutable. User-provided name for the custom emoji, which is unique within the organization. Required when the custom emoji is created, output only otherwise. Emoji names must start and end with colons, must be lowercase and can only contain alphanumeric characters, hyphens, and underscores. Hyphens and underscores should be used to separate words and cannot be used consecutively. Example: `:valid-emoji-name:`",
      ).optional(),
      name: z.string().describe(
        "Identifier. The resource name of the custom emoji, assigned by the server. Format: `customEmojis/{customEmoji}`",
      ).optional(),
      payload: z.object({
        fileContent: z.string().describe(
          "Required. Input only. The image used for the custom emoji. The payload must be under 256 KB and the dimension of the image must be square and between 64 and 500 pixels. The restrictions are subject to change.",
        ).optional(),
        filename: z.string().describe(
          "Required. Input only. The image file name. Supported file extensions: `.png`, `.jpg`, `.gif`.",
        ).optional(),
      }).describe("Payload data for the custom emoji.").optional(),
      temporaryImageUri: z.string().describe(
        "Output only. A temporary image URL for the custom emoji, valid for at least 10 minutes. Note that this is not populated in the response when the custom emoji is created.",
      ).optional(),
      uid: z.string().describe(
        "Output only. Unique key for the custom emoji resource.",
      ).optional(),
    }).describe(
      "Represents a [custom emoji](https://support.google.com/chat/answer/12800149).",
    ).optional(),
    unicode: z.string().describe(
      "Optional. A basic emoji represented by a unicode string.",
    ).optional(),
  }).describe("An emoji that is used as a reaction to a message.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the reaction. Format: `spaces/{space}/messages/{message}/reactions/{reaction}`",
  ).optional(),
  user: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Chat Spaces.Messages.Reactions. Registered at `@swamp/gcp/chat/spaces-messages-reactions`. */
export const model = {
  type: "@swamp/gcp/chat/spaces-messages-reactions",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A reaction to a message.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reactions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["emoji"] !== undefined) body["emoji"] = g["emoji"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["user"] !== undefined) body["user"] = g["user"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a reactions",
      arguments: z.object({
        identifier: z.string().describe("The name of the reactions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Delete the reactions",
      arguments: z.object({
        identifier: z.string().describe("The name of the reactions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync reactions state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
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
  },
};
