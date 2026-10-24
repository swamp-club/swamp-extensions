// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.apps.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.meet.readonly",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.scripts",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  pageToken: z.string().describe(
    "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.",
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
      canAccessViaGenAi: z.boolean(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  pageToken: z.string().describe(
    "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Google Drive Changes. Registered at `@swamp/gcp/drive/changes`. */
export const model = {
  type: "@swamp/gcp/drive/changes",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.2",
      description: "Added: pageToken",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["pageToken"] !== undefined) {
          params["pageToken"] = String(g["pageToken"]);
        }
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync changes state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific changes by name (e.g. one discovered by list)",
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
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List changes resources",
      arguments: z.object({
        driveId: z.string().describe(
          "The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.",
        ).optional(),
        includeCorpusRemovals: z.boolean().describe(
          "Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.",
        ).optional(),
        includeItemsFromAllDrives: z.boolean().describe(
          "Whether both My Drive and shared drive items should be included in results.",
        ).optional(),
        includeLabels: z.string().describe(
          "A comma-separated list of IDs of labels to include in the `labelInfo` part of the response.",
        ).optional(),
        includePermissionsForView: z.string().describe(
          "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
        ).optional(),
        includeRemoved: z.boolean().describe(
          "Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of changes to return. The service may return fewer than this value. If unspecified, at most 100 changes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        restrictToMyDrive: z.boolean().describe(
          "Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.",
        ).optional(),
        spaces: z.string().describe(
          "A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'.",
        ).optional(),
        supportsAllDrives: z.boolean().describe(
          "Whether the requesting application supports both My Drives and shared drives.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["pageToken"] !== undefined) {
          params["pageToken"] = String(g["pageToken"]);
        }
        if (args["driveId"] !== undefined) {
          params["driveId"] = String(args["driveId"]);
        }
        if (args["includeCorpusRemovals"] !== undefined) {
          params["includeCorpusRemovals"] = String(
            args["includeCorpusRemovals"],
          );
        }
        if (args["includeItemsFromAllDrives"] !== undefined) {
          params["includeItemsFromAllDrives"] = String(
            args["includeItemsFromAllDrives"],
          );
        }
        if (args["includeLabels"] !== undefined) {
          params["includeLabels"] = String(args["includeLabels"]);
        }
        if (args["includePermissionsForView"] !== undefined) {
          params["includePermissionsForView"] = String(
            args["includePermissionsForView"],
          );
        }
        if (args["includeRemoved"] !== undefined) {
          params["includeRemoved"] = String(args["includeRemoved"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["restrictToMyDrive"] !== undefined) {
          params["restrictToMyDrive"] = String(args["restrictToMyDrive"]);
        }
        if (args["spaces"] !== undefined) {
          params["spaces"] = String(args["spaces"]);
        }
        if (args["supportsAllDrives"] !== undefined) {
          params["supportsAllDrives"] = String(args["supportsAllDrives"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "changes",
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
    get_start_page_token: {
      description: "get start page token",
      arguments: z.object({
        driveId: z.any().optional(),
        supportsAllDrives: z.any().optional(),
        supportsTeamDrives: z.any().optional(),
        teamDriveId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["driveId"] !== undefined) {
          params["driveId"] = String(args["driveId"]);
        }
        if (args["supportsAllDrives"] !== undefined) {
          params["supportsAllDrives"] = String(args["supportsAllDrives"]);
        }
        if (args["supportsTeamDrives"] !== undefined) {
          params["supportsTeamDrives"] = String(args["supportsTeamDrives"]);
        }
        if (args["teamDriveId"] !== undefined) {
          params["teamDriveId"] = String(args["teamDriveId"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
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
        driveId: z.any().optional(),
        includeCorpusRemovals: z.any().optional(),
        includeItemsFromAllDrives: z.any().optional(),
        includeLabels: z.any().optional(),
        includePermissionsForView: z.any().optional(),
        includeRemoved: z.any().optional(),
        includeTeamDriveItems: z.any().optional(),
        pageSize: z.any().optional(),
        restrictToMyDrive: z.any().optional(),
        spaces: z.any().optional(),
        supportsAllDrives: z.any().optional(),
        supportsTeamDrives: z.any().optional(),
        teamDriveId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["pageToken"] !== undefined) {
          params["pageToken"] = String(g["pageToken"]);
        }
        if (args["driveId"] !== undefined) {
          params["driveId"] = String(args["driveId"]);
        }
        if (args["includeCorpusRemovals"] !== undefined) {
          params["includeCorpusRemovals"] = String(
            args["includeCorpusRemovals"],
          );
        }
        if (args["includeItemsFromAllDrives"] !== undefined) {
          params["includeItemsFromAllDrives"] = String(
            args["includeItemsFromAllDrives"],
          );
        }
        if (args["includeLabels"] !== undefined) {
          params["includeLabels"] = String(args["includeLabels"]);
        }
        if (args["includePermissionsForView"] !== undefined) {
          params["includePermissionsForView"] = String(
            args["includePermissionsForView"],
          );
        }
        if (args["includeRemoved"] !== undefined) {
          params["includeRemoved"] = String(args["includeRemoved"]);
        }
        if (args["includeTeamDriveItems"] !== undefined) {
          params["includeTeamDriveItems"] = String(
            args["includeTeamDriveItems"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["restrictToMyDrive"] !== undefined) {
          params["restrictToMyDrive"] = String(args["restrictToMyDrive"]);
        }
        if (args["spaces"] !== undefined) {
          params["spaces"] = String(args["spaces"]);
        }
        if (args["supportsAllDrives"] !== undefined) {
          params["supportsAllDrives"] = String(args["supportsAllDrives"]);
        }
        if (args["supportsTeamDrives"] !== undefined) {
          params["supportsTeamDrives"] = String(args["supportsTeamDrives"]);
        }
        if (args["teamDriveId"] !== undefined) {
          params["teamDriveId"] = String(args["teamDriveId"]);
        }
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
          baseUrl,
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
