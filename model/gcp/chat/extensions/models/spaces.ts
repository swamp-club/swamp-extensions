// Auto-generated extension model for @swamp/gcp/chat/spaces
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Chat Spaces.
 *
 * A space in Google Chat. Spaces are conversations between two or more users or 1:1 messages between a user and a Chat app.
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

const BASE_URL = "https://chat.googleapis.com/";

const GET_CONFIG = {
  "id": "chat.spaces.get",
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
    "useAdminAccess": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "chat.spaces.create",
  "path": "v1/spaces",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "chat.spaces.patch",
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
    "useAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "chat.spaces.delete",
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
    "useAdminAccess": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "chat.spaces.list",
  "path": "v1/spaces",
  "httpMethod": "GET",
  "parameterOrder": [],
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
  },
} as const;

const GlobalArgsSchema = z.object({
  accessSettings: z.object({
    accessState: z.enum(["ACCESS_STATE_UNSPECIFIED", "PRIVATE", "DISCOVERABLE"])
      .describe("Output only. Indicates the access state of the space.")
      .optional(),
    audience: z.string().describe(
      "Optional. The resource name of the [target audience](https://support.google.com/a/answer/9934697) who can discover the space, join the space, and preview the messages in the space. If unset, only users or Google Groups who have been individually invited or added to the space can access it. For details, see [Make a space discoverable to a target audience](https://developers.google.com/workspace/chat/space-target-audience). Format: `audiences/{audience}` To use the default target audience for the Google Workspace organization, set to `audiences/default`. Reading the target audience supports: - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. This field is not populated when using the `chat.bot` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). Setting the target audience requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
    ).optional(),
  }).describe(
    "Represents the [access setting](https://support.google.com/chat/answer/11971020) of the space.",
  ).optional(),
  customer: z.string().describe(
    "Optional. Immutable. The customer id of the domain of the space. Required only when creating a space with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and `SpaceType` is `SPACE`, otherwise should not be set. In the format `customers/{customer}`, where `customer` is the `id` from the [Admin SDK customer resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). Private apps can also use the `customers/my_customer` alias to create the space in the same Google Workspace organization as the app. This field isn't populated for direct messages (DMs) or when the space is created by non-Google Workspace users.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The space's display name. Required when [creating a space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/create) with a `spaceType` of `SPACE`. If you receive the error message `ALREADY_EXISTS` when creating a space or updating the `displayName`, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. For direct messages, this field might be empty. Supports up to 128 characters.",
  ).optional(),
  importMode: z.boolean().describe(
    "Optional. Whether this space is created in `Import Mode` as part of a data migration into Google Workspace. While spaces are being imported, they aren't visible to users until the import is complete. Creating a space in `Import Mode`requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
  ).optional(),
  membershipCount: z.object({
    joinedDirectHumanUserCount: z.number().int().describe(
      "Output only. Count of human users that have directly joined the space, not counting users joined by having membership in a joined group.",
    ).optional(),
    joinedGroupCount: z.number().int().describe(
      "Output only. Count of all groups that have directly joined the space.",
    ).optional(),
  }).describe(
    "Represents the count of memberships of a space, grouped into categories.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`.",
  ).optional(),
  permissionSettings: z.object({
    manageApps: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    manageMembersAndGroups: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    manageWebhooks: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    modifySpaceDetails: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    postMessages: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    replyMessages: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    toggleHistory: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    useAtMentionAll: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
  }).describe(
    "[Permission settings](https://support.google.com/chat/answer/13340792) that you can specify when updating an existing named space. To set permission settings when creating a space, specify the `PredefinedPermissionSettings` field in your request.",
  ).optional(),
  predefinedPermissionSettings: z.enum([
    "PREDEFINED_PERMISSION_SETTINGS_UNSPECIFIED",
    "COLLABORATION_SPACE",
    "ANNOUNCEMENT_SPACE",
  ]).describe(
    "Optional. Input only. Predefined space permission settings, input only when creating a space. If the field is not set, a collaboration space is created. After you create the space, settings are populated in the `PermissionSettings` field. Setting predefined permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` or `chat.app.spaces.create` scopes. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user)",
  ).optional(),
  singleUserBotDm: z.boolean().describe(
    "Optional. Whether the space is a DM between a Chat app and a single human.",
  ).optional(),
  spaceDetails: z.object({
    description: z.string().describe(
      "Optional. A description of the space. For example, describe the space's discussion topic, functional purpose, or participants. Supports up to 150 characters.",
    ).optional(),
    guidelines: z.string().describe(
      "Optional. The space's rules, expectations, and etiquette. Supports up to 5,000 characters.",
    ).optional(),
  }).describe("Details about the space including description and rules.")
    .optional(),
  spaceHistoryState: z.enum([
    "HISTORY_STATE_UNSPECIFIED",
    "HISTORY_OFF",
    "HISTORY_ON",
  ]).describe(
    "Optional. The message history state for messages and threads in this space.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. A random UUID is recommended. Specifying an existing request ID returns the space created with that ID instead of creating a new space. Specifying an existing request ID from the same Chat app with a different authenticated user returns an error.",
  ).optional(),
});

const StateSchema = z.object({
  accessSettings: z.object({
    accessState: z.string(),
    audience: z.string(),
  }).optional(),
  adminInstalled: z.boolean().optional(),
  createTime: z.string().optional(),
  customer: z.string().optional(),
  displayName: z.string().optional(),
  externalUserAllowed: z.boolean().optional(),
  importMode: z.boolean().optional(),
  importModeExpireTime: z.string().optional(),
  lastActiveTime: z.string().optional(),
  membershipCount: z.object({
    joinedDirectHumanUserCount: z.number(),
    joinedGroupCount: z.number(),
  }).optional(),
  name: z.string(),
  permissionSettings: z.object({
    manageApps: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    manageMembersAndGroups: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    manageWebhooks: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    modifySpaceDetails: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    postMessages: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    replyMessages: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    toggleHistory: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
    useAtMentionAll: z.object({
      assistantManagersAllowed: z.boolean(),
      managersAllowed: z.boolean(),
      membersAllowed: z.boolean(),
    }),
  }).optional(),
  predefinedPermissionSettings: z.string().optional(),
  singleUserBotDm: z.boolean().optional(),
  spaceDetails: z.object({
    description: z.string(),
    guidelines: z.string(),
  }).optional(),
  spaceHistoryState: z.string().optional(),
  spaceThreadingState: z.string().optional(),
  spaceType: z.string().optional(),
  spaceUri: z.string().optional(),
  threaded: z.boolean().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessSettings: z.object({
    accessState: z.enum(["ACCESS_STATE_UNSPECIFIED", "PRIVATE", "DISCOVERABLE"])
      .describe("Output only. Indicates the access state of the space.")
      .optional(),
    audience: z.string().describe(
      "Optional. The resource name of the [target audience](https://support.google.com/a/answer/9934697) who can discover the space, join the space, and preview the messages in the space. If unset, only users or Google Groups who have been individually invited or added to the space can access it. For details, see [Make a space discoverable to a target audience](https://developers.google.com/workspace/chat/space-target-audience). Format: `audiences/{audience}` To use the default target audience for the Google Workspace organization, set to `audiences/default`. Reading the target audience supports: - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. This field is not populated when using the `chat.bot` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). Setting the target audience requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
    ).optional(),
  }).describe(
    "Represents the [access setting](https://support.google.com/chat/answer/11971020) of the space.",
  ).optional(),
  customer: z.string().describe(
    "Optional. Immutable. The customer id of the domain of the space. Required only when creating a space with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and `SpaceType` is `SPACE`, otherwise should not be set. In the format `customers/{customer}`, where `customer` is the `id` from the [Admin SDK customer resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). Private apps can also use the `customers/my_customer` alias to create the space in the same Google Workspace organization as the app. This field isn't populated for direct messages (DMs) or when the space is created by non-Google Workspace users.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The space's display name. Required when [creating a space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/create) with a `spaceType` of `SPACE`. If you receive the error message `ALREADY_EXISTS` when creating a space or updating the `displayName`, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. For direct messages, this field might be empty. Supports up to 128 characters.",
  ).optional(),
  importMode: z.boolean().describe(
    "Optional. Whether this space is created in `Import Mode` as part of a data migration into Google Workspace. While spaces are being imported, they aren't visible to users until the import is complete. Creating a space in `Import Mode`requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
  ).optional(),
  membershipCount: z.object({
    joinedDirectHumanUserCount: z.number().int().describe(
      "Output only. Count of human users that have directly joined the space, not counting users joined by having membership in a joined group.",
    ).optional(),
    joinedGroupCount: z.number().int().describe(
      "Output only. Count of all groups that have directly joined the space.",
    ).optional(),
  }).describe(
    "Represents the count of memberships of a space, grouped into categories.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`.",
  ).optional(),
  permissionSettings: z.object({
    manageApps: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    manageMembersAndGroups: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    manageWebhooks: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    modifySpaceDetails: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    postMessages: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    replyMessages: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    toggleHistory: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
    useAtMentionAll: z.object({
      assistantManagersAllowed: z.boolean().describe(
        "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
      ).optional(),
      managersAllowed: z.boolean().describe(
        "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
      ).optional(),
      membersAllowed: z.boolean().describe(
        "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
      ).optional(),
    }).describe("Represents a space permission setting.").optional(),
  }).describe(
    "[Permission settings](https://support.google.com/chat/answer/13340792) that you can specify when updating an existing named space. To set permission settings when creating a space, specify the `PredefinedPermissionSettings` field in your request.",
  ).optional(),
  predefinedPermissionSettings: z.enum([
    "PREDEFINED_PERMISSION_SETTINGS_UNSPECIFIED",
    "COLLABORATION_SPACE",
    "ANNOUNCEMENT_SPACE",
  ]).describe(
    "Optional. Input only. Predefined space permission settings, input only when creating a space. If the field is not set, a collaboration space is created. After you create the space, settings are populated in the `PermissionSettings` field. Setting predefined permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` or `chat.app.spaces.create` scopes. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user)",
  ).optional(),
  singleUserBotDm: z.boolean().describe(
    "Optional. Whether the space is a DM between a Chat app and a single human.",
  ).optional(),
  spaceDetails: z.object({
    description: z.string().describe(
      "Optional. A description of the space. For example, describe the space's discussion topic, functional purpose, or participants. Supports up to 150 characters.",
    ).optional(),
    guidelines: z.string().describe(
      "Optional. The space's rules, expectations, and etiquette. Supports up to 5,000 characters.",
    ).optional(),
  }).describe("Details about the space including description and rules.")
    .optional(),
  spaceHistoryState: z.enum([
    "HISTORY_STATE_UNSPECIFIED",
    "HISTORY_OFF",
    "HISTORY_ON",
  ]).describe(
    "Optional. The message history state for messages and threads in this space.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. A random UUID is recommended. Specifying an existing request ID returns the space created with that ID instead of creating a new space. Specifying an existing request ID from the same Chat app with a different authenticated user returns an error.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Chat Spaces. Registered at `@swamp/gcp/chat/spaces`. */
export const model = {
  type: "@swamp/gcp/chat/spaces",
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
      toVersion: "2026.04.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A space in Google Chat. Spaces are conversations between two or more users or...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a spaces",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["accessSettings"] !== undefined) {
          body["accessSettings"] = g["accessSettings"];
        }
        if (g["customer"] !== undefined) body["customer"] = g["customer"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["importMode"] !== undefined) body["importMode"] = g["importMode"];
        if (g["membershipCount"] !== undefined) {
          body["membershipCount"] = g["membershipCount"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["permissionSettings"] !== undefined) {
          body["permissionSettings"] = g["permissionSettings"];
        }
        if (g["predefinedPermissionSettings"] !== undefined) {
          body["predefinedPermissionSettings"] =
            g["predefinedPermissionSettings"];
        }
        if (g["singleUserBotDm"] !== undefined) {
          body["singleUserBotDm"] = g["singleUserBotDm"];
        }
        if (g["spaceDetails"] !== undefined) {
          body["spaceDetails"] = g["spaceDetails"];
        }
        if (g["spaceHistoryState"] !== undefined) {
          body["spaceHistoryState"] = g["spaceHistoryState"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a spaces",
      arguments: z.object({
        identifier: z.string().describe("The name of the spaces"),
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
    update: {
      description: "Update spaces attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accessSettings"] !== undefined) {
          body["accessSettings"] = g["accessSettings"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["importMode"] !== undefined) body["importMode"] = g["importMode"];
        if (g["membershipCount"] !== undefined) {
          body["membershipCount"] = g["membershipCount"];
        }
        if (g["permissionSettings"] !== undefined) {
          body["permissionSettings"] = g["permissionSettings"];
        }
        if (g["predefinedPermissionSettings"] !== undefined) {
          body["predefinedPermissionSettings"] =
            g["predefinedPermissionSettings"];
        }
        if (g["singleUserBotDm"] !== undefined) {
          body["singleUserBotDm"] = g["singleUserBotDm"];
        }
        if (g["spaceDetails"] !== undefined) {
          body["spaceDetails"] = g["spaceDetails"];
        }
        if (g["spaceHistoryState"] !== undefined) {
          body["spaceHistoryState"] = g["spaceHistoryState"];
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
          PATCH_CONFIG,
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
      description: "Delete the spaces",
      arguments: z.object({
        identifier: z.string().describe("The name of the spaces"),
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
      description: "Sync spaces state from GCP",
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
    complete_import: {
      description: "complete import",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "chat.spaces.completeImport",
            "path": "v1/{+name}:completeImport",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    find_direct_message: {
      description: "find direct message",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "chat.spaces.findDirectMessage",
            "path": "v1/spaces:findDirectMessage",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": { "name": { "location": "query" } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    find_group_chats: {
      description: "find group chats",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "chat.spaces.findGroupChats",
            "path": "v1/spaces:findGroupChats",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "spaceView": { "location": "query" },
              "users": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "chat.spaces.search",
            "path": "v1/spaces:search",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "query": { "location": "query" },
              "useAdminAccess": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    setup: {
      description: "setup",
      arguments: z.object({
        memberships: z.any().optional(),
        requestId: z.any().optional(),
        space: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["memberships"] !== undefined) {
          body["memberships"] = args["memberships"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["space"] !== undefined) body["space"] = args["space"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "chat.spaces.setup",
            "path": "v1/spaces:setup",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
