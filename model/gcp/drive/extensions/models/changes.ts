// Auto-generated extension model for @swamp/gcp/drive/changes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Changes.
 *
 * A change to a file or shared drive.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const LIST_CONFIG = {
  "id": "drive.changes.list",
  "path": "changes",
  "httpMethod": "GET",
  "parameterOrder": [
    "pageToken",
  ],
  "parameters": {
    "driveId": {
      "location": "query",
    },
    "includeCorpusRemovals": {
      "location": "query",
    },
    "includeItemsFromAllDrives": {
      "location": "query",
    },
    "includeLabels": {
      "location": "query",
    },
    "includePermissionsForView": {
      "location": "query",
    },
    "includeRemoved": {
      "location": "query",
    },
    "includeTeamDriveItems": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
      "required": true,
    },
    "restrictToMyDrive": {
      "location": "query",
    },
    "spaces": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "teamDriveId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  changeType: z.string().optional(),
  drive: z.object({
    backgroundImageFile: z.object({
      id: z.string(),
      width: z.number(),
      xCoordinate: z.number(),
      yCoordinate: z.number(),
    }),
    backgroundImageLink: z.string(),
    capabilities: z.object({
      canAddChildren: z.boolean(),
      canChangeCopyRequiresWriterPermissionRestriction: z.boolean(),
      canChangeDomainUsersOnlyRestriction: z.boolean(),
      canChangeDownloadRestriction: z.boolean(),
      canChangeDriveBackground: z.boolean(),
      canChangeDriveMembersOnlyRestriction: z.boolean(),
      canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z
        .boolean(),
      canComment: z.boolean(),
      canCopy: z.boolean(),
      canDeleteChildren: z.boolean(),
      canDeleteDrive: z.boolean(),
      canDownload: z.boolean(),
      canEdit: z.boolean(),
      canListChildren: z.boolean(),
      canManageMembers: z.boolean(),
      canReadRevisions: z.boolean(),
      canRename: z.boolean(),
      canRenameDrive: z.boolean(),
      canResetDriveRestrictions: z.boolean(),
      canShare: z.boolean(),
      canTrashChildren: z.boolean(),
    }),
    colorRgb: z.string(),
    createdTime: z.string(),
    hidden: z.boolean(),
    id: z.string(),
    kind: z.string(),
    name: z.string(),
    orgUnitId: z.string(),
    restrictions: z.object({
      adminManagedRestrictions: z.boolean(),
      copyRequiresWriterPermission: z.boolean(),
      domainUsersOnly: z.boolean(),
      downloadRestriction: z.object({
        restrictedForReaders: z.boolean(),
        restrictedForWriters: z.boolean(),
      }),
      driveMembersOnly: z.boolean(),
      sharingFoldersRequiresOrganizerPermission: z.boolean(),
    }),
    themeId: z.string(),
  }).optional(),
  driveId: z.string().optional(),
  file: z.object({
    appProperties: z.record(z.string(), z.unknown()),
    capabilities: z.object({
      canAcceptOwnership: z.boolean(),
      canAddChildren: z.boolean(),
      canAddFolderFromAnotherDrive: z.boolean(),
      canAddMyDriveParent: z.boolean(),
      canChangeCopyRequiresWriterPermission: z.boolean(),
      canChangeItemDownloadRestriction: z.boolean(),
      canChangeSecurityUpdateEnabled: z.boolean(),
      canChangeViewersCanCopyContent: z.boolean(),
      canComment: z.boolean(),
      canCopy: z.boolean(),
      canDelete: z.boolean(),
      canDeleteChildren: z.boolean(),
      canDisableInheritedPermissions: z.boolean(),
      canDownload: z.boolean(),
      canEdit: z.boolean(),
      canEnableInheritedPermissions: z.boolean(),
      canListChildren: z.boolean(),
      canModifyContent: z.boolean(),
      canModifyContentRestriction: z.boolean(),
      canModifyEditorContentRestriction: z.boolean(),
      canModifyLabels: z.boolean(),
      canModifyOwnerContentRestriction: z.boolean(),
      canMoveChildrenOutOfDrive: z.boolean(),
      canMoveChildrenOutOfTeamDrive: z.boolean(),
      canMoveChildrenWithinDrive: z.boolean(),
      canMoveChildrenWithinTeamDrive: z.boolean(),
      canMoveItemIntoTeamDrive: z.boolean(),
      canMoveItemOutOfDrive: z.boolean(),
      canMoveItemOutOfTeamDrive: z.boolean(),
      canMoveItemWithinDrive: z.boolean(),
      canMoveItemWithinTeamDrive: z.boolean(),
      canMoveTeamDriveItem: z.boolean(),
      canReadDrive: z.boolean(),
      canReadLabels: z.boolean(),
      canReadRevisions: z.boolean(),
      canReadTeamDrive: z.boolean(),
      canRemoveChildren: z.boolean(),
      canRemoveContentRestriction: z.boolean(),
      canRemoveMyDriveParent: z.boolean(),
      canRename: z.boolean(),
      canShare: z.boolean(),
      canStartApproval: z.boolean(),
      canTrash: z.boolean(),
      canTrashChildren: z.boolean(),
      canUntrash: z.boolean(),
    }),
    clientEncryptionDetails: z.object({
      decryptionMetadata: z.object({
        aes256GcmChunkSize: z.string(),
        encryptionResourceKeyHash: z.string(),
        jwt: z.string(),
        kaclsId: z.string(),
        kaclsName: z.string(),
        keyFormat: z.string(),
        wrappedKey: z.string(),
      }),
      encryptionState: z.string(),
    }),
    contentHints: z.object({
      indexableText: z.string(),
      thumbnail: z.object({
        image: z.string(),
        mimeType: z.string(),
      }),
    }),
    contentRestrictions: z.array(z.object({
      ownerRestricted: z.boolean(),
      readOnly: z.boolean(),
      reason: z.string(),
      restrictingUser: z.object({
        displayName: z.string(),
        emailAddress: z.string(),
        kind: z.string(),
        me: z.boolean(),
        permissionId: z.string(),
        photoLink: z.string(),
      }),
      restrictionTime: z.string(),
      systemRestricted: z.boolean(),
      type: z.string(),
    })),
    copyRequiresWriterPermission: z.boolean(),
    createdTime: z.string(),
    description: z.string(),
    downloadRestrictions: z.object({
      effectiveDownloadRestrictionWithContext: z.object({
        restrictedForReaders: z.boolean(),
        restrictedForWriters: z.boolean(),
      }),
      itemDownloadRestriction: z.object({
        restrictedForReaders: z.boolean(),
        restrictedForWriters: z.boolean(),
      }),
    }),
    driveId: z.string(),
    explicitlyTrashed: z.boolean(),
    exportLinks: z.record(z.string(), z.unknown()),
    fileExtension: z.string(),
    folderColorRgb: z.string(),
    fullFileExtension: z.string(),
    hasAugmentedPermissions: z.boolean(),
    hasThumbnail: z.boolean(),
    headRevisionId: z.string(),
    iconLink: z.string(),
    id: z.string(),
    imageMediaMetadata: z.object({
      aperture: z.number(),
      cameraMake: z.string(),
      cameraModel: z.string(),
      colorSpace: z.string(),
      exposureBias: z.number(),
      exposureMode: z.string(),
      exposureTime: z.number(),
      flashUsed: z.boolean(),
      focalLength: z.number(),
      height: z.number(),
      isoSpeed: z.number(),
      lens: z.string(),
      location: z.object({
        altitude: z.number(),
        latitude: z.number(),
        longitude: z.number(),
      }),
      maxApertureValue: z.number(),
      meteringMode: z.string(),
      rotation: z.number(),
      sensor: z.string(),
      subjectDistance: z.number(),
      time: z.string(),
      whiteBalance: z.string(),
      width: z.number(),
    }),
    inheritedPermissionsDisabled: z.boolean(),
    isAppAuthorized: z.boolean(),
    kind: z.string(),
    labelInfo: z.object({
      labels: z.array(z.object({
        fields: z.record(z.string(), z.unknown()),
        id: z.string(),
        kind: z.string(),
        revisionId: z.string(),
      })),
    }),
    lastModifyingUser: z.object({
      displayName: z.string(),
      emailAddress: z.string(),
      kind: z.string(),
      me: z.boolean(),
      permissionId: z.string(),
      photoLink: z.string(),
    }),
    linkShareMetadata: z.object({
      securityUpdateEligible: z.boolean(),
      securityUpdateEnabled: z.boolean(),
    }),
    md5Checksum: z.string(),
    mimeType: z.string(),
    modifiedByMe: z.boolean(),
    modifiedByMeTime: z.string(),
    modifiedTime: z.string(),
    name: z.string(),
    originalFilename: z.string(),
    ownedByMe: z.boolean(),
    owners: z.array(z.object({
      displayName: z.string(),
      emailAddress: z.string(),
      kind: z.string(),
      me: z.boolean(),
      permissionId: z.string(),
      photoLink: z.string(),
    })),
    parents: z.array(z.string()),
    permissionIds: z.array(z.string()),
    permissions: z.array(z.object({
      allowFileDiscovery: z.boolean(),
      deleted: z.boolean(),
      displayName: z.string(),
      domain: z.string(),
      emailAddress: z.string(),
      expirationTime: z.string(),
      id: z.string(),
      inheritedPermissionsDisabled: z.boolean(),
      kind: z.string(),
      pendingOwner: z.boolean(),
      permissionDetails: z.array(z.object({
        inherited: z.unknown(),
        inheritedFrom: z.unknown(),
        permissionType: z.unknown(),
        role: z.unknown(),
      })),
      photoLink: z.string(),
      role: z.string(),
      teamDrivePermissionDetails: z.array(z.object({
        inherited: z.unknown(),
        inheritedFrom: z.unknown(),
        role: z.unknown(),
        teamDrivePermissionType: z.unknown(),
      })),
      type: z.string(),
      view: z.string(),
    })),
    properties: z.record(z.string(), z.unknown()),
    quotaBytesUsed: z.string(),
    resourceKey: z.string(),
    sha1Checksum: z.string(),
    sha256Checksum: z.string(),
    shared: z.boolean(),
    sharedWithMeTime: z.string(),
    sharingUser: z.object({
      displayName: z.string(),
      emailAddress: z.string(),
      kind: z.string(),
      me: z.boolean(),
      permissionId: z.string(),
      photoLink: z.string(),
    }),
    shortcutDetails: z.object({
      targetId: z.string(),
      targetMimeType: z.string(),
      targetResourceKey: z.string(),
    }),
    size: z.string(),
    spaces: z.array(z.string()),
    starred: z.boolean(),
    teamDriveId: z.string(),
    thumbnailLink: z.string(),
    thumbnailVersion: z.string(),
    trashed: z.boolean(),
    trashedTime: z.string(),
    trashingUser: z.object({
      displayName: z.string(),
      emailAddress: z.string(),
      kind: z.string(),
      me: z.boolean(),
      permissionId: z.string(),
      photoLink: z.string(),
    }),
    version: z.string(),
    videoMediaMetadata: z.object({
      durationMillis: z.string(),
      height: z.number(),
      width: z.number(),
    }),
    viewedByMe: z.boolean(),
    viewedByMeTime: z.string(),
    viewersCanCopyContent: z.boolean(),
    webContentLink: z.string(),
    webViewLink: z.string(),
    writersCanShare: z.boolean(),
  }).optional(),
  fileId: z.string().optional(),
  kind: z.string().optional(),
  removed: z.boolean().optional(),
  teamDrive: z.object({
    backgroundImageFile: z.object({
      id: z.string(),
      width: z.number(),
      xCoordinate: z.number(),
      yCoordinate: z.number(),
    }),
    backgroundImageLink: z.string(),
    capabilities: z.object({
      canAddChildren: z.boolean(),
      canChangeCopyRequiresWriterPermissionRestriction: z.boolean(),
      canChangeDomainUsersOnlyRestriction: z.boolean(),
      canChangeDownloadRestriction: z.boolean(),
      canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z
        .boolean(),
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
    }),
    colorRgb: z.string(),
    createdTime: z.string(),
    id: z.string(),
    kind: z.string(),
    name: z.string(),
    orgUnitId: z.string(),
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
    }),
    themeId: z.string(),
  }).optional(),
  teamDriveId: z.string().optional(),
  time: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Drive Changes. Registered at `@swamp/gcp/drive/changes`. */
export const model = {
  type: "@swamp/gcp/drive/changes",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.09.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A change to a file or shared drive.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a changes",
      arguments: z.object({
        identifier: z.string().describe("The name of the changes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["pageToken"] !== undefined) {
          params["pageToken"] = String(g["pageToken"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync changes state from GCP",
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
          if (g["pageToken"] !== undefined) {
            params["pageToken"] = String(g["pageToken"]);
          } else if (existing["pageToken"]) {
            params["pageToken"] = String(existing["pageToken"]);
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
    get_start_page_token: {
      description: "get start page token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.changes.getStartPageToken",
            "path": "changes/startPageToken",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "driveId": { "location": "query" },
              "supportsAllDrives": { "location": "query" },
              "supportsTeamDrives": { "location": "query" },
              "teamDriveId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    watch: {
      description: "watch",
      arguments: z.object({
        address: z.any().optional(),
        expiration: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        params: z.any().optional(),
        payload: z.any().optional(),
        resourceId: z.any().optional(),
        resourceUri: z.any().optional(),
        token: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["pageToken"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["address"] !== undefined) body["address"] = args["address"];
        if (args["expiration"] !== undefined) {
          body["expiration"] = args["expiration"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["resourceUri"] !== undefined) {
          body["resourceUri"] = args["resourceUri"];
        }
        if (args["token"] !== undefined) body["token"] = args["token"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.changes.watch",
            "path": "changes/watch",
            "httpMethod": "POST",
            "parameterOrder": ["pageToken"],
            "parameters": {
              "driveId": { "location": "query" },
              "includeCorpusRemovals": { "location": "query" },
              "includeItemsFromAllDrives": { "location": "query" },
              "includeLabels": { "location": "query" },
              "includePermissionsForView": { "location": "query" },
              "includeRemoved": { "location": "query" },
              "includeTeamDriveItems": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query", "required": true },
              "restrictToMyDrive": { "location": "query" },
              "spaces": { "location": "query" },
              "supportsAllDrives": { "location": "query" },
              "supportsTeamDrives": { "location": "query" },
              "teamDriveId": { "location": "query" },
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
