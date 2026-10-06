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

// Auto-generated extension model for @swamp/gcp/chat/users-availability
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Chat Users.Availability.
 *
 * Represents a user's current availability information in Google Chat, including their state (for example, Active, Away, Do Not Disturb) and any custom status.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chat.googleapis.com/";

const GET_CONFIG = {
  "id": "chat.users.availability.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
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

const PATCH_CONFIG = {
  "id": "chat.users.availability.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/chat.admin.delete",
  "https://www.googleapis.com/auth/chat.admin.memberships",
  "https://www.googleapis.com/auth/chat.admin.memberships.readonly",
  "https://www.googleapis.com/auth/chat.admin.spaces",
  "https://www.googleapis.com/auth/chat.admin.spaces.readonly",
  "https://www.googleapis.com/auth/chat.app.all.memberships.readonly",
  "https://www.googleapis.com/auth/chat.app.all.messages.readonly",
  "https://www.googleapis.com/auth/chat.app.all.spaces.readonly",
  "https://www.googleapis.com/auth/chat.app.delete",
  "https://www.googleapis.com/auth/chat.app.memberships",
  "https://www.googleapis.com/auth/chat.app.memberships.readonly",
  "https://www.googleapis.com/auth/chat.app.messages.readonly",
  "https://www.googleapis.com/auth/chat.app.spaces",
  "https://www.googleapis.com/auth/chat.app.spaces.create",
  "https://www.googleapis.com/auth/chat.app.spaces.readonly",
  "https://www.googleapis.com/auth/chat.bot",
  "https://www.googleapis.com/auth/chat.customemojis",
  "https://www.googleapis.com/auth/chat.customemojis.readonly",
  "https://www.googleapis.com/auth/chat.delete",
  "https://www.googleapis.com/auth/chat.import",
  "https://www.googleapis.com/auth/chat.memberships",
  "https://www.googleapis.com/auth/chat.memberships.app",
  "https://www.googleapis.com/auth/chat.memberships.readonly",
  "https://www.googleapis.com/auth/chat.messages",
  "https://www.googleapis.com/auth/chat.messages.create",
  "https://www.googleapis.com/auth/chat.messages.reactions",
  "https://www.googleapis.com/auth/chat.messages.reactions.create",
  "https://www.googleapis.com/auth/chat.messages.reactions.readonly",
  "https://www.googleapis.com/auth/chat.messages.readonly",
  "https://www.googleapis.com/auth/chat.spaces",
  "https://www.googleapis.com/auth/chat.spaces.create",
  "https://www.googleapis.com/auth/chat.spaces.pins",
  "https://www.googleapis.com/auth/chat.spaces.pins.readonly",
  "https://www.googleapis.com/auth/chat.spaces.readonly",
  "https://www.googleapis.com/auth/chat.users.availability",
  "https://www.googleapis.com/auth/chat.users.availability.readonly",
  "https://www.googleapis.com/auth/chat.users.readstate",
  "https://www.googleapis.com/auth/chat.users.readstate.readonly",
  "https://www.googleapis.com/auth/chat.users.sections",
  "https://www.googleapis.com/auth/chat.users.sections.readonly",
  "https://www.googleapis.com/auth/chat.users.spacesettings",
];

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  customStatus: z.object({
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
        }).describe(
          "Optional. Input only. Payload data. Required when the custom emoji is created.",
        ).optional(),
        temporaryImageUri: z.string().describe(
          "Output only. A temporary image URL for the custom emoji, valid for at least 10 minutes. Note that this is not populated in the response when the custom emoji is created.",
        ).optional(),
        uid: z.string().describe(
          "Output only. Unique key for the custom emoji resource.",
        ).optional(),
      }).describe("A custom emoji.").optional(),
      unicode: z.string().describe(
        "Optional. A basic emoji represented by a unicode string.",
      ).optional(),
    }).describe(
      "Required. The emoji of the custom status. Only Unicode emojis are supported; custom emojis are not supported.",
    ).optional(),
    expireTime: z.string().describe(
      "The timestamp when the custom status expires.",
    ).optional(),
    text: z.string().describe(
      "Required. The text of the custom status. This will be a string with maximum length of 64.",
    ).optional(),
    ttl: z.string().describe(
      "Input only. The time-to-live duration after which the custom status expires.",
    ).optional(),
  }).describe("Optional. The user's custom status.").optional(),
  doNotDisturbMetadata: z.object({
    expirationTime: z.string().describe(
      "Output only. Timestamp until which the user should be marked as DO_NOT_DISTURB. This can be maximum of 1 year in the future.",
    ).optional(),
  }).describe(
    "Output only. Metadata if the user state is set to DO_NOT_DISTURB.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the user's availability. Format: `users/{user}/availability` `{user}` is the id for the Person in the People API or Admin SDK directory API. For example, `users/123456789`. The user's email address or `me` can also be used as an alias to refer to the caller. For example, `users/user@example.com` or `users/me`.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "ACTIVE",
    "IDLE",
    "AWAY",
    "DO_NOT_DISTURB",
  ]).describe("Output only. The user's current availability state.").optional(),
});

const StateSchema = z.object({
  customStatus: z.object({
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
    }),
    expireTime: z.string(),
    text: z.string(),
    ttl: z.string(),
  }).optional(),
  doNotDisturbMetadata: z.object({
    expirationTime: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  customStatus: z.object({
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
        }).describe(
          "Optional. Input only. Payload data. Required when the custom emoji is created.",
        ).optional(),
        temporaryImageUri: z.string().describe(
          "Output only. A temporary image URL for the custom emoji, valid for at least 10 minutes. Note that this is not populated in the response when the custom emoji is created.",
        ).optional(),
        uid: z.string().describe(
          "Output only. Unique key for the custom emoji resource.",
        ).optional(),
      }).describe("A custom emoji.").optional(),
      unicode: z.string().describe(
        "Optional. A basic emoji represented by a unicode string.",
      ).optional(),
    }).describe(
      "Required. The emoji of the custom status. Only Unicode emojis are supported; custom emojis are not supported.",
    ).optional(),
    expireTime: z.string().describe(
      "The timestamp when the custom status expires.",
    ).optional(),
    text: z.string().describe(
      "Required. The text of the custom status. This will be a string with maximum length of 64.",
    ).optional(),
    ttl: z.string().describe(
      "Input only. The time-to-live duration after which the custom status expires.",
    ).optional(),
  }).describe("Optional. The user's custom status.").optional(),
  doNotDisturbMetadata: z.object({
    expirationTime: z.string().describe(
      "Output only. Timestamp until which the user should be marked as DO_NOT_DISTURB. This can be maximum of 1 year in the future.",
    ).optional(),
  }).describe(
    "Output only. Metadata if the user state is set to DO_NOT_DISTURB.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the user's availability. Format: `users/{user}/availability` `{user}` is the id for the Person in the People API or Admin SDK directory API. For example, `users/123456789`. The user's email address or `me` can also be used as an alias to refer to the caller. For example, `users/user@example.com` or `users/me`.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "ACTIVE",
    "IDLE",
    "AWAY",
    "DO_NOT_DISTURB",
  ]).describe("Output only. The user's current availability state.").optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Chat Users.Availability. Registered at `@swamp/gcp/chat/users-availability`. */
export const model = {
  type: "@swamp/gcp/chat/users-availability",
  version: "2026.10.06.1",
  upgrades: [
    {
      toVersion: "2026.07.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a user's current availability information in Google Chat, includin...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a availability",
      arguments: z.object({
        identifier: z.string().describe("The name of the availability"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update availability attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific availability by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["name"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["customStatus"] !== undefined) {
          body["customStatus"] = g["customStatus"];
        }
        if (g["doNotDisturbMetadata"] !== undefined) {
          body["doNotDisturbMetadata"] = g["doNotDisturbMetadata"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
    sync: {
      description: "Sync availability state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific availability by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
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
            baseUrl,
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
    mark_as_active: {
      description: "mark as active",
      arguments: z.object({
        expireTime: z.any().optional(),
        ttl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["expireTime"] !== undefined) {
          body["expireTime"] = args["expireTime"];
        }
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        const result = await createResource(
          baseUrl,
          {
            "id": "chat.users.availability.markAsActive",
            "path": "v1/{+name}:markAsActive",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    mark_as_away: {
      description: "mark as away",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          {
            "id": "chat.users.availability.markAsAway",
            "path": "v1/{+name}:markAsAway",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    mark_as_do_not_disturb: {
      description: "mark as do not disturb",
      arguments: z.object({
        expireTime: z.any().optional(),
        ttl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["expireTime"] !== undefined) {
          body["expireTime"] = args["expireTime"];
        }
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        const result = await createResource(
          baseUrl,
          {
            "id": "chat.users.availability.markAsDoNotDisturb",
            "path": "v1/{+name}:markAsDoNotDisturb",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
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
