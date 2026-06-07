// Auto-generated extension model for @swamp/gcp/drive/permissions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Permissions.
 *
 * A permission for a file. A permission grants a user, group, domain, or the world access to a file or a folder hierarchy. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). By default, permission requests only return a subset of fields. Permission `kind`, `ID`, `type`, and `role` are always returned. To retrieve specific fields, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter). Some resource methods (such as `permissions.update`) require a `permissionId`. Use the `permissions.list` method to retrieve the ID for a file, folder, or shared drive.
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

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const GET_CONFIG = {
  "id": "drive.permissions.get",
  "path": "files/{fileId}/permissions/{permissionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "permissionId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "permissionId": {
      "location": "path",
      "required": true,
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.permissions.create",
  "path": "files/{fileId}/permissions",
  "httpMethod": "POST",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "emailMessage": {
      "location": "query",
    },
    "enforceExpansiveAccess": {
      "location": "query",
    },
    "enforceSingleParent": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "moveToNewOwnersRoot": {
      "location": "query",
    },
    "sendNotificationEmail": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "transferOwnership": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.permissions.update",
  "path": "files/{fileId}/permissions/{permissionId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "fileId",
    "permissionId",
  ],
  "parameters": {
    "enforceExpansiveAccess": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "permissionId": {
      "location": "path",
      "required": true,
    },
    "removeExpiration": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "transferOwnership": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.permissions.delete",
  "path": "files/{fileId}/permissions/{permissionId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
    "permissionId",
  ],
  "parameters": {
    "enforceExpansiveAccess": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "permissionId": {
      "location": "path",
      "required": true,
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.permissions.list",
  "path": "files/{fileId}/permissions",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "includePermissionsForView": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "useDomainAdminAccess": {
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
  allowFileDiscovery: z.boolean().describe(
    "Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type `domain` or `anyone`.",
  ).optional(),
  expirationTime: z.string().describe(
    "The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions: - They can only be set on user and group permissions - The time must be in the future - The time cannot be more than a year in the future",
  ).optional(),
  inheritedPermissionsDisabled: z.boolean().describe(
    "When `true`, only organizers, owners, and users with permissions added directly on the item can access it.",
  ).optional(),
  pendingOwner: z.boolean().describe(
    "Whether the account associated with this permission is a pending owner. Only populated for permissions of type `user` for files that aren't in a shared drive.",
  ).optional(),
  role: z.string().describe(
    "The role granted by this permission. Supported values include: * `owner` * `organizer` * `fileOrganizer` * `writer` * `commenter` * `reader` For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles).",
  ),
  type: z.string().describe(
    "The type of the grantee. Supported values include: * `user` * `group` * `domain` * `anyone` When creating a permission, if `type` is `user` or `group`, you must provide an `emailAddress` for the user or group. If `type` is `domain`, you must provide a `domain`. If `type` is `anyone`, no extra information is required.",
  ),
  view: z.string().describe(
    "Indicates the view for this permission. Only populated for permissions that belong to a view. The only supported values are `published` and `metadata`: * `published`: The permission's role is `publishedReader`. * `metadata`: The item is only visible to the `metadata` view because the item has limited access and the scope has at least read access to the parent. The `metadata` view is only supported on folders. For more information, see [Views](https://developers.google.com/workspace/drive/api/guides/ref-roles#views).",
  ).optional(),
  fileId: z.string().describe("The ID of the file or shared drive."),
  emailMessage: z.string().describe(
    "A plain text custom message to include in the notification email.",
  ).optional(),
  moveToNewOwnersRoot: z.string().describe(
    "This parameter only takes effect if the item isn't in a shared drive and the request is attempting to transfer the ownership of the item. If set to `true`, the item is moved to the new owner's My Drive root folder and all prior parents removed. If set to `false`, parents aren't changed.",
  ).optional(),
  sendNotificationEmail: z.string().describe(
    "Whether to send a notification email when sharing to users or groups. This defaults to `true` for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers.",
  ).optional(),
  supportsAllDrives: z.string().describe(
    "Whether the requesting application supports both My Drives and shared drives.",
  ).optional(),
  transferOwnership: z.string().describe(
    "Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com/workspace/drive/api/guides/transfer-file).",
  ).optional(),
  useDomainAdminAccess: z.string().describe(
    "Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators).",
  ).optional(),
});

const StateSchema = z.object({
  allowFileDiscovery: z.boolean().optional(),
  deleted: z.boolean().optional(),
  displayName: z.string().optional(),
  domain: z.string().optional(),
  emailAddress: z.string().optional(),
  expirationTime: z.string().optional(),
  id: z.string().optional(),
  inheritedPermissionsDisabled: z.boolean().optional(),
  kind: z.string().optional(),
  pendingOwner: z.boolean().optional(),
  permissionDetails: z.array(z.object({
    inherited: z.boolean(),
    inheritedFrom: z.string(),
    permissionType: z.string(),
    role: z.string(),
  })).optional(),
  photoLink: z.string().optional(),
  role: z.string().optional(),
  teamDrivePermissionDetails: z.array(z.object({
    inherited: z.boolean(),
    inheritedFrom: z.string(),
    role: z.string(),
    teamDrivePermissionType: z.string(),
  })).optional(),
  type: z.string().optional(),
  view: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  allowFileDiscovery: z.boolean().describe(
    "Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type `domain` or `anyone`.",
  ).optional(),
  expirationTime: z.string().describe(
    "The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions: - They can only be set on user and group permissions - The time must be in the future - The time cannot be more than a year in the future",
  ).optional(),
  inheritedPermissionsDisabled: z.boolean().describe(
    "When `true`, only organizers, owners, and users with permissions added directly on the item can access it.",
  ).optional(),
  pendingOwner: z.boolean().describe(
    "Whether the account associated with this permission is a pending owner. Only populated for permissions of type `user` for files that aren't in a shared drive.",
  ).optional(),
  role: z.string().describe(
    "The role granted by this permission. Supported values include: * `owner` * `organizer` * `fileOrganizer` * `writer` * `commenter` * `reader` For more information, see [Roles and permissions](https://developers.google.com/workspace/drive/api/guides/ref-roles).",
  ).optional(),
  type: z.string().describe(
    "The type of the grantee. Supported values include: * `user` * `group` * `domain` * `anyone` When creating a permission, if `type` is `user` or `group`, you must provide an `emailAddress` for the user or group. If `type` is `domain`, you must provide a `domain`. If `type` is `anyone`, no extra information is required.",
  ).optional(),
  view: z.string().describe(
    "Indicates the view for this permission. Only populated for permissions that belong to a view. The only supported values are `published` and `metadata`: * `published`: The permission's role is `publishedReader`. * `metadata`: The item is only visible to the `metadata` view because the item has limited access and the scope has at least read access to the parent. The `metadata` view is only supported on folders. For more information, see [Views](https://developers.google.com/workspace/drive/api/guides/ref-roles#views).",
  ).optional(),
  fileId: z.string().describe("The ID of the file or shared drive.").optional(),
  emailMessage: z.string().describe(
    "A plain text custom message to include in the notification email.",
  ).optional(),
  moveToNewOwnersRoot: z.string().describe(
    "This parameter only takes effect if the item isn't in a shared drive and the request is attempting to transfer the ownership of the item. If set to `true`, the item is moved to the new owner's My Drive root folder and all prior parents removed. If set to `false`, parents aren't changed.",
  ).optional(),
  sendNotificationEmail: z.string().describe(
    "Whether to send a notification email when sharing to users or groups. This defaults to `true` for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers.",
  ).optional(),
  supportsAllDrives: z.string().describe(
    "Whether the requesting application supports both My Drives and shared drives.",
  ).optional(),
  transferOwnership: z.string().describe(
    "Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. For more information, see [Transfer file ownership](https://developers.google.com/workspace/drive/api/guides/transfer-file).",
  ).optional(),
  useDomainAdminAccess: z.string().describe(
    "Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators).",
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

/** Swamp extension model for Google Cloud Google Drive Permissions. Registered at `@swamp/gcp/drive/permissions`. */
export const model = {
  type: "@swamp/gcp/drive/permissions",
  version: "2026.06.07.1",
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
      description: "Removed: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain: _domain, emailAddress: _emailAddress, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.1",
      description: "Added: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Removed: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain: _domain, emailAddress: _emailAddress, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Added: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "Removed: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain: _domain, emailAddress: _emailAddress, ...rest } = old;
        return rest;
      },
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
      description: "Added: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "Removed: domain, emailAddress",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain: _domain, emailAddress: _emailAddress, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A permission for a file. A permission grants a user, group, domain, or the wo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a permissions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        const body: Record<string, unknown> = {};
        if (g["allowFileDiscovery"] !== undefined) {
          body["allowFileDiscovery"] = g["allowFileDiscovery"];
        }
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["inheritedPermissionsDisabled"] !== undefined) {
          body["inheritedPermissionsDisabled"] =
            g["inheritedPermissionsDisabled"];
        }
        if (g["pendingOwner"] !== undefined) {
          body["pendingOwner"] = g["pendingOwner"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["view"] !== undefined) body["view"] = g["view"];
        if (g["emailMessage"] !== undefined) {
          body["emailMessage"] = g["emailMessage"];
        }
        if (g["moveToNewOwnersRoot"] !== undefined) {
          body["moveToNewOwnersRoot"] = g["moveToNewOwnersRoot"];
        }
        if (g["sendNotificationEmail"] !== undefined) {
          body["sendNotificationEmail"] = g["sendNotificationEmail"];
        }
        if (g["supportsAllDrives"] !== undefined) {
          body["supportsAllDrives"] = g["supportsAllDrives"];
        }
        if (g["transferOwnership"] !== undefined) {
          body["transferOwnership"] = g["transferOwnership"];
        }
        if (g["useDomainAdminAccess"] !== undefined) {
          body["useDomainAdminAccess"] = g["useDomainAdminAccess"];
        }
        if (g["name"] !== undefined) params["permissionId"] = String(g["name"]);
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
      description: "Get a permissions",
      arguments: z.object({
        identifier: z.string().describe("The name of the permissions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["permissionId"] = args.identifier;
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
      description: "Update permissions attributes",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        else if (existing["fileId"]) {
          params["fileId"] = String(existing["fileId"]);
        }
        params["permissionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allowFileDiscovery"] !== undefined) {
          body["allowFileDiscovery"] = g["allowFileDiscovery"];
        }
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["inheritedPermissionsDisabled"] !== undefined) {
          body["inheritedPermissionsDisabled"] =
            g["inheritedPermissionsDisabled"];
        }
        if (g["pendingOwner"] !== undefined) {
          body["pendingOwner"] = g["pendingOwner"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["view"] !== undefined) body["view"] = g["view"];
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
      description: "Delete the permissions",
      arguments: z.object({
        identifier: z.string().describe("The name of the permissions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["permissionId"] = args.identifier;
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
      description: "Sync permissions state from GCP",
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
          params["permissionId"] = identifier;
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
      description: "List permissions resources",
      arguments: z.object({
        includePermissionsForView: z.string().describe(
          "Specifies which additional view's permissions to include in the response. Only `published` is supported.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned.",
        ).optional(),
        supportsAllDrives: z.boolean().describe(
          "Whether the requesting application supports both My Drives and shared drives.",
        ).optional(),
        useDomainAdminAccess: z.boolean().describe(
          "Issue the request as a domain administrator. If set to `true`, and if the following additional conditions are met, the requester is granted access: 1. The file ID parameter refers to a shared drive. 2. The requester is an administrator of the domain to which the shared drive belongs. For more information, see [Manage shared drives as domain administrators](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives#manage-administrators).",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        if (args["includePermissionsForView"] !== undefined) {
          params["includePermissionsForView"] = String(
            args["includePermissionsForView"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["supportsAllDrives"] !== undefined) {
          params["supportsAllDrives"] = String(args["supportsAllDrives"]);
        }
        if (args["useDomainAdminAccess"] !== undefined) {
          params["useDomainAdminAccess"] = String(args["useDomainAdminAccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "permissions",
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
  },
};
