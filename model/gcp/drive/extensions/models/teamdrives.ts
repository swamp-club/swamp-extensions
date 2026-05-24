// Auto-generated extension model for @swamp/gcp/drive/teamdrives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Teamdrives.
 *
 * Deprecated: use the drive collection instead. Next ID: 33
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
  "id": "drive.teamdrives.get",
  "path": "teamdrives/{teamDriveId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "teamDriveId",
  ],
  "parameters": {
    "teamDriveId": {
      "location": "path",
      "required": true,
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.teamdrives.create",
  "path": "teamdrives",
  "httpMethod": "POST",
  "parameterOrder": [
    "requestId",
  ],
  "parameters": {
    "requestId": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.teamdrives.update",
  "path": "teamdrives/{teamDriveId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "teamDriveId",
  ],
  "parameters": {
    "teamDriveId": {
      "location": "path",
      "required": true,
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.teamdrives.delete",
  "path": "teamdrives/{teamDriveId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "teamDriveId",
  ],
  "parameters": {
    "teamDriveId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.teamdrives.list",
  "path": "teamdrives",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string().describe(
      "The ID of an image file in Drive to use for the background image.",
    ).optional(),
    width: z.number().describe(
      "The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.",
    ).optional(),
    xCoordinate: z.number().describe(
      "The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image.",
    ).optional(),
    yCoordinate: z.number().describe(
      "The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image.",
    ).optional(),
  }).describe("The background image file for a Team Drive.").optional(),
  backgroundImageLink: z.string().describe(
    "A short-lived link to this Team Drive's background image.",
  ).optional(),
  capabilities: z.object({
    canAddChildren: z.boolean().describe(
      "Whether the current user can add children to folders in this Team Drive.",
    ).optional(),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean().describe(
      "Whether the current user can change the `copyRequiresWriterPermission` restriction of this Team Drive.",
    ).optional(),
    canChangeDomainUsersOnlyRestriction: z.boolean().describe(
      "Whether the current user can change the `domainUsersOnly` restriction of this Team Drive.",
    ).optional(),
    canChangeDownloadRestriction: z.boolean().describe(
      "Output only. Whether the current user can change organizer-applied download restrictions of this shared drive.",
    ).optional(),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean()
      .describe(
        "Whether the current user can change the `sharingFoldersRequiresOrganizerPermission` restriction of this Team Drive.",
      ).optional(),
    canChangeTeamDriveBackground: z.boolean().describe(
      "Whether the current user can change the background of this Team Drive.",
    ).optional(),
    canChangeTeamMembersOnlyRestriction: z.boolean().describe(
      "Whether the current user can change the `teamMembersOnly` restriction of this Team Drive.",
    ).optional(),
    canComment: z.boolean().describe(
      "Whether the current user can comment on files in this Team Drive.",
    ).optional(),
    canCopy: z.boolean().describe(
      "Whether the current user can copy files in this Team Drive.",
    ).optional(),
    canDeleteChildren: z.boolean().describe(
      "Whether the current user can delete children from folders in this Team Drive.",
    ).optional(),
    canDeleteTeamDrive: z.boolean().describe(
      "Whether the current user can delete this Team Drive. Attempting to delete the Team Drive may still fail if there are untrashed items inside the Team Drive.",
    ).optional(),
    canDownload: z.boolean().describe(
      "Whether the current user can download files in this Team Drive.",
    ).optional(),
    canEdit: z.boolean().describe(
      "Whether the current user can edit files in this Team Drive",
    ).optional(),
    canListChildren: z.boolean().describe(
      "Whether the current user can list the children of folders in this Team Drive.",
    ).optional(),
    canManageMembers: z.boolean().describe(
      "Whether the current user can add members to this Team Drive or remove them or change their role.",
    ).optional(),
    canReadRevisions: z.boolean().describe(
      "Whether the current user can read the revisions resource of files in this Team Drive.",
    ).optional(),
    canRemoveChildren: z.boolean().describe(
      "Deprecated: Use `canDeleteChildren` or `canTrashChildren` instead.",
    ).optional(),
    canRename: z.boolean().describe(
      "Whether the current user can rename files or folders in this Team Drive.",
    ).optional(),
    canRenameTeamDrive: z.boolean().describe(
      "Whether the current user can rename this Team Drive.",
    ).optional(),
    canResetTeamDriveRestrictions: z.boolean().describe(
      "Whether the current user can reset the Team Drive restrictions to defaults.",
    ).optional(),
    canShare: z.boolean().describe(
      "Whether the current user can share files or folders in this Team Drive.",
    ).optional(),
    canTrashChildren: z.boolean().describe(
      "Whether the current user can trash children from folders in this Team Drive.",
    ).optional(),
  }).describe("Capabilities the current user has on this Team Drive.")
    .optional(),
  colorRgb: z.string().describe(
    "The color of this Team Drive as an RGB hex string. It can only be set on a `drive.teamdrives.update` request that does not set `themeId`.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the Team Drive was created (RFC 3339 date-time).",
  ).optional(),
  id: z.string().describe(
    "The ID of this Team Drive which is also the ID of the top level folder of this Team Drive.",
  ).optional(),
  name: z.string().describe("The name of this Team Drive.").optional(),
  orgUnitId: z.string().describe(
    "The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`.",
  ).optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().describe(
      "Whether administrative privileges on this Team Drive are required to modify restrictions.",
    ).optional(),
    copyRequiresWriterPermission: z.boolean().describe(
      "Whether the options to copy, print, or download files inside this Team Drive, should be disabled for readers and commenters. When this restriction is set to `true`, it will override the similarly named field to `true` for any file inside this Team Drive.",
    ).optional(),
    domainUsersOnly: z.boolean().describe(
      "Whether access to this Team Drive and items inside this Team Drive is restricted to users of the domain to which this Team Drive belongs. This restriction may be overridden by other sharing policies controlled outside of this Team Drive.",
    ).optional(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    sharingFoldersRequiresOrganizerPermission: z.boolean().describe(
      "If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders.",
    ).optional(),
    teamMembersOnly: z.boolean().describe(
      "Whether access to items inside this Team Drive is restricted to members of this Team Drive.",
    ).optional(),
  }).describe(
    "A set of restrictions that apply to this Team Drive or items inside this Team Drive.",
  ).optional(),
  themeId: z.string().describe(
    "The ID of the theme from which the background image and color will be set. The set of possible `teamDriveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.teamdrives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`.",
  ).optional(),
  requestId: z.string().describe(
    "Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned.",
  ),
});

const StateSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string(),
    width: z.number(),
    xCoordinate: z.number(),
    yCoordinate: z.number(),
  }).optional(),
  backgroundImageLink: z.string().optional(),
  capabilities: z.object({
    canAddChildren: z.boolean(),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean(),
    canChangeDomainUsersOnlyRestriction: z.boolean(),
    canChangeDownloadRestriction: z.boolean(),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean(),
    canChangeTeamDriveBackground: z.boolean(),
    canChangeTeamMembersOnlyRestriction: z.boolean(),
    canComment: z.boolean(),
    canCopy: z.boolean(),
    canDeleteChildren: z.boolean(),
    canDeleteTeamDrive: z.boolean(),
    canDownload: z.boolean(),
    canEdit: z.boolean(),
    canListChildren: z.boolean(),
    canManageMembers: z.boolean(),
    canReadRevisions: z.boolean(),
    canRemoveChildren: z.boolean(),
    canRename: z.boolean(),
    canRenameTeamDrive: z.boolean(),
    canResetTeamDriveRestrictions: z.boolean(),
    canShare: z.boolean(),
    canTrashChildren: z.boolean(),
  }).optional(),
  colorRgb: z.string().optional(),
  createdTime: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  orgUnitId: z.string().optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean(),
    copyRequiresWriterPermission: z.boolean(),
    domainUsersOnly: z.boolean(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean(),
      restrictedForWriters: z.boolean(),
    }),
    sharingFoldersRequiresOrganizerPermission: z.boolean(),
    teamMembersOnly: z.boolean(),
  }).optional(),
  themeId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string().describe(
      "The ID of an image file in Drive to use for the background image.",
    ).optional(),
    width: z.number().describe(
      "The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.",
    ).optional(),
    xCoordinate: z.number().describe(
      "The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image.",
    ).optional(),
    yCoordinate: z.number().describe(
      "The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image.",
    ).optional(),
  }).describe("The background image file for a Team Drive.").optional(),
  backgroundImageLink: z.string().describe(
    "A short-lived link to this Team Drive's background image.",
  ).optional(),
  capabilities: z.object({
    canAddChildren: z.boolean().describe(
      "Whether the current user can add children to folders in this Team Drive.",
    ).optional(),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean().describe(
      "Whether the current user can change the `copyRequiresWriterPermission` restriction of this Team Drive.",
    ).optional(),
    canChangeDomainUsersOnlyRestriction: z.boolean().describe(
      "Whether the current user can change the `domainUsersOnly` restriction of this Team Drive.",
    ).optional(),
    canChangeDownloadRestriction: z.boolean().describe(
      "Output only. Whether the current user can change organizer-applied download restrictions of this shared drive.",
    ).optional(),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean()
      .describe(
        "Whether the current user can change the `sharingFoldersRequiresOrganizerPermission` restriction of this Team Drive.",
      ).optional(),
    canChangeTeamDriveBackground: z.boolean().describe(
      "Whether the current user can change the background of this Team Drive.",
    ).optional(),
    canChangeTeamMembersOnlyRestriction: z.boolean().describe(
      "Whether the current user can change the `teamMembersOnly` restriction of this Team Drive.",
    ).optional(),
    canComment: z.boolean().describe(
      "Whether the current user can comment on files in this Team Drive.",
    ).optional(),
    canCopy: z.boolean().describe(
      "Whether the current user can copy files in this Team Drive.",
    ).optional(),
    canDeleteChildren: z.boolean().describe(
      "Whether the current user can delete children from folders in this Team Drive.",
    ).optional(),
    canDeleteTeamDrive: z.boolean().describe(
      "Whether the current user can delete this Team Drive. Attempting to delete the Team Drive may still fail if there are untrashed items inside the Team Drive.",
    ).optional(),
    canDownload: z.boolean().describe(
      "Whether the current user can download files in this Team Drive.",
    ).optional(),
    canEdit: z.boolean().describe(
      "Whether the current user can edit files in this Team Drive",
    ).optional(),
    canListChildren: z.boolean().describe(
      "Whether the current user can list the children of folders in this Team Drive.",
    ).optional(),
    canManageMembers: z.boolean().describe(
      "Whether the current user can add members to this Team Drive or remove them or change their role.",
    ).optional(),
    canReadRevisions: z.boolean().describe(
      "Whether the current user can read the revisions resource of files in this Team Drive.",
    ).optional(),
    canRemoveChildren: z.boolean().describe(
      "Deprecated: Use `canDeleteChildren` or `canTrashChildren` instead.",
    ).optional(),
    canRename: z.boolean().describe(
      "Whether the current user can rename files or folders in this Team Drive.",
    ).optional(),
    canRenameTeamDrive: z.boolean().describe(
      "Whether the current user can rename this Team Drive.",
    ).optional(),
    canResetTeamDriveRestrictions: z.boolean().describe(
      "Whether the current user can reset the Team Drive restrictions to defaults.",
    ).optional(),
    canShare: z.boolean().describe(
      "Whether the current user can share files or folders in this Team Drive.",
    ).optional(),
    canTrashChildren: z.boolean().describe(
      "Whether the current user can trash children from folders in this Team Drive.",
    ).optional(),
  }).describe("Capabilities the current user has on this Team Drive.")
    .optional(),
  colorRgb: z.string().describe(
    "The color of this Team Drive as an RGB hex string. It can only be set on a `drive.teamdrives.update` request that does not set `themeId`.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the Team Drive was created (RFC 3339 date-time).",
  ).optional(),
  id: z.string().describe(
    "The ID of this Team Drive which is also the ID of the top level folder of this Team Drive.",
  ).optional(),
  name: z.string().describe("The name of this Team Drive.").optional(),
  orgUnitId: z.string().describe(
    "The organizational unit of this shared drive. This field is only populated on `drives.list` responses when the `useDomainAdminAccess` parameter is set to `true`.",
  ).optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().describe(
      "Whether administrative privileges on this Team Drive are required to modify restrictions.",
    ).optional(),
    copyRequiresWriterPermission: z.boolean().describe(
      "Whether the options to copy, print, or download files inside this Team Drive, should be disabled for readers and commenters. When this restriction is set to `true`, it will override the similarly named field to `true` for any file inside this Team Drive.",
    ).optional(),
    domainUsersOnly: z.boolean().describe(
      "Whether access to this Team Drive and items inside this Team Drive is restricted to users of the domain to which this Team Drive belongs. This restriction may be overridden by other sharing policies controlled outside of this Team Drive.",
    ).optional(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    sharingFoldersRequiresOrganizerPermission: z.boolean().describe(
      "If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders.",
    ).optional(),
    teamMembersOnly: z.boolean().describe(
      "Whether access to items inside this Team Drive is restricted to members of this Team Drive.",
    ).optional(),
  }).describe(
    "A set of restrictions that apply to this Team Drive or items inside this Team Drive.",
  ).optional(),
  themeId: z.string().describe(
    "The ID of the theme from which the background image and color will be set. The set of possible `teamDriveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.teamdrives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`.",
  ).optional(),
  requestId: z.string().describe(
    "Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Drive Teamdrives. Registered at `@swamp/gcp/drive/teamdrives`. */
export const model = {
  type: "@swamp/gcp/drive/teamdrives",
  version: "2026.05.24.1",
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
      description: "Deprecated: use the drive collection instead. Next ID: 33",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a teamdrives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["backgroundImageFile"] !== undefined) {
          body["backgroundImageFile"] = g["backgroundImageFile"];
        }
        if (g["backgroundImageLink"] !== undefined) {
          body["backgroundImageLink"] = g["backgroundImageLink"];
        }
        if (g["capabilities"] !== undefined) {
          body["capabilities"] = g["capabilities"];
        }
        if (g["colorRgb"] !== undefined) body["colorRgb"] = g["colorRgb"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["orgUnitId"] !== undefined) body["orgUnitId"] = g["orgUnitId"];
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
        }
        if (g["themeId"] !== undefined) body["themeId"] = g["themeId"];
        if (g["name"] !== undefined) params["teamDriveId"] = String(g["name"]);
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
      description: "Get a teamdrives",
      arguments: z.object({
        identifier: z.string().describe("The name of the teamdrives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["teamDriveId"] = args.identifier;
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
      description: "Update teamdrives attributes",
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
        params["teamDriveId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["backgroundImageFile"] !== undefined) {
          body["backgroundImageFile"] = g["backgroundImageFile"];
        }
        if (g["backgroundImageLink"] !== undefined) {
          body["backgroundImageLink"] = g["backgroundImageLink"];
        }
        if (g["capabilities"] !== undefined) {
          body["capabilities"] = g["capabilities"];
        }
        if (g["colorRgb"] !== undefined) body["colorRgb"] = g["colorRgb"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["orgUnitId"] !== undefined) body["orgUnitId"] = g["orgUnitId"];
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
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
      description: "Delete the teamdrives",
      arguments: z.object({
        identifier: z.string().describe("The name of the teamdrives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["teamDriveId"] = args.identifier;
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
      description: "Sync teamdrives state from GCP",
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
          params["teamDriveId"] = identifier;
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
