// Auto-generated extension model for @swamp/gcp/drive/files
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Files.
 *
 * The metadata for a file. Some resource methods (such as `files.update`) require a `fileId`. Use the `files.list` method to retrieve the ID for a file.
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
  "id": "drive.files.get",
  "path": "files/{fileId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "acknowledgeAbuse": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "includeLabels": {
      "location": "query",
    },
    "includePermissionsForView": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.files.create",
  "path": "files",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "enforceSingleParent": {
      "location": "query",
    },
    "ignoreDefaultVisibility": {
      "location": "query",
    },
    "includeLabels": {
      "location": "query",
    },
    "includePermissionsForView": {
      "location": "query",
    },
    "keepRevisionForever": {
      "location": "query",
    },
    "ocrLanguage": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "useContentAsIndexableText": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.files.update",
  "path": "files/{fileId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "addParents": {
      "location": "query",
    },
    "enforceSingleParent": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "includeLabels": {
      "location": "query",
    },
    "includePermissionsForView": {
      "location": "query",
    },
    "keepRevisionForever": {
      "location": "query",
    },
    "ocrLanguage": {
      "location": "query",
    },
    "removeParents": {
      "location": "query",
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
    "useContentAsIndexableText": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.files.delete",
  "path": "files/{fileId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "enforceSingleParent": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "supportsAllDrives": {
      "location": "query",
    },
    "supportsTeamDrives": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.files.list",
  "path": "files",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "corpora": {
      "location": "query",
    },
    "corpus": {
      "location": "query",
    },
    "driveId": {
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
    "includeTeamDriveItems": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "q": {
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
  appProperties: z.record(z.string(), z.string()).describe(
    "A collection of arbitrary key-value pairs which are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties.",
  ).optional(),
  clientEncryptionDetails: z.object({
    decryptionMetadata: z.object({
      aes256GcmChunkSize: z.string().describe(
        "Chunk size used if content was encrypted with the AES 256 GCM Cipher. Possible values are: - default - small",
      ).optional(),
      encryptionResourceKeyHash: z.string().describe(
        "The URL-safe Base64 encoded HMAC-SHA256 digest of the resource metadata with its DEK (Data Encryption Key); see https://developers.google.com/workspace/cse/reference",
      ).optional(),
      jwt: z.string().describe(
        "The signed JSON Web Token (JWT) which can be used to authorize the requesting user with the Key ACL Service (KACLS). The JWT asserts that the requesting user has at least read permissions on the file.",
      ).optional(),
      kaclsId: z.string().describe(
        "The ID of the KACLS (Key ACL Service) used to encrypt the file.",
      ).optional(),
      kaclsName: z.string().describe(
        "The name of the KACLS (Key ACL Service) used to encrypt the file.",
      ).optional(),
      keyFormat: z.string().describe(
        "Key format for the unwrapped key. Must be `tinkAesGcmKey`.",
      ).optional(),
      wrappedKey: z.string().describe(
        "The URL-safe Base64 encoded wrapped key used to encrypt the contents of the file.",
      ).optional(),
    }).describe("Representation of the CSE DecryptionMetadata.").optional(),
    encryptionState: z.string().describe(
      "The encryption state of the file. The values expected here are: - encrypted - unencrypted",
    ).optional(),
  }).describe("Details about the client-side encryption applied to the file.")
    .optional(),
  contentHints: z.object({
    indexableText: z.string().describe(
      "Text to be indexed for the file to improve fullText queries. This is limited to 128 KB in length and may contain HTML elements.",
    ).optional(),
    thumbnail: z.object({
      image: z.string().describe(
        "The thumbnail data encoded with URL-safe Base64 ([RFC 4648 section 5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)).",
      ).optional(),
      mimeType: z.string().describe("The MIME type of the thumbnail.")
        .optional(),
    }).describe(
      "A thumbnail for the file. This will only be used if Google Drive cannot generate a standard thumbnail.",
    ).optional(),
  }).describe(
    "Additional information about the content of the file. These fields are never populated in responses.",
  ).optional(),
  contentRestrictions: z.array(z.object({
    ownerRestricted: z.boolean().describe(
      "Whether the content restriction can only be modified or removed by a user who owns the file. For files in shared drives, any user with `organizer` capabilities can modify or remove this content restriction.",
    ).optional(),
    readOnly: z.boolean().describe(
      "Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified.",
    ).optional(),
    reason: z.string().describe(
      "Reason for why the content of the file is restricted. This is only mutable on requests that also set `readOnly=true`.",
    ).optional(),
    restrictingUser: z.object({
      displayName: z.string().describe(
        "Output only. A plain text displayable name for this user.",
      ).optional(),
      emailAddress: z.string().describe(
        "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
      ).optional(),
      kind: z.string().describe(
        "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
      ).optional(),
      me: z.boolean().describe(
        "Output only. Whether this user is the requesting user.",
      ).optional(),
      permissionId: z.string().describe(
        "Output only. The user's ID as visible in Permission resources.",
      ).optional(),
      photoLink: z.string().describe(
        "Output only. A link to the user's profile photo, if available.",
      ).optional(),
    }).describe("Information about a Drive user.").optional(),
    restrictionTime: z.string().describe(
      "The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true.",
    ).optional(),
    systemRestricted: z.boolean().describe(
      "Output only. Whether the content restriction was applied by the system, for example due to an esignature. Users cannot modify or remove system restricted content restrictions.",
    ).optional(),
    type: z.string().describe(
      "Output only. The type of the content restriction. Currently the only possible value is `globalContentRestriction`.",
    ).optional(),
  })).describe(
    "Restrictions for accessing the content of the file. Only populated if such a restriction exists.",
  ).optional(),
  copyRequiresWriterPermission: z.boolean().describe(
    "Whether the options to copy, print, or download this file should be disabled for readers and commenters.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the file was created (RFC 3339 date-time).",
  ).optional(),
  description: z.string().describe("A short description of the file.")
    .optional(),
  downloadRestrictions: z.object({
    effectiveDownloadRestrictionWithContext: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    itemDownloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
  }).describe("Download restrictions applied to the file.").optional(),
  folderColorRgb: z.string().describe(
    "The color for a folder or a shortcut to a folder as an RGB hex string. The supported colors are published in the `folderColorPalette` field of the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. If an unsupported color is specified, the closest color in the palette is used instead.",
  ).optional(),
  id: z.string().describe("The ID of the file.").optional(),
  inheritedPermissionsDisabled: z.boolean().describe(
    "Whether this file has inherited permissions disabled. Inherited permissions are enabled by default.",
  ).optional(),
  labelInfo: z.object({
    labels: z.array(z.object({
      fields: z.record(
        z.string(),
        z.object({
          dateString: z.unknown().describe(
            "Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD.",
          ).optional(),
          id: z.unknown().describe("The identifier of this label field.")
            .optional(),
          integer: z.unknown().describe(
            "Only present if `valueType` is `integer`.",
          ).optional(),
          kind: z.unknown().describe("This is always drive#labelField.")
            .optional(),
          selection: z.unknown().describe(
            "Only present if `valueType` is `selection`",
          ).optional(),
          text: z.unknown().describe("Only present if `valueType` is `text`.")
            .optional(),
          user: z.unknown().describe("Only present if `valueType` is `user`.")
            .optional(),
          valueType: z.unknown().describe(
            "The field type. While new values may be supported in the future, the following are currently allowed: * `dateString` * `integer` * `selection` * `text` * `user`",
          ).optional(),
        }),
      ).describe("A map of the fields on the label, keyed by the field's ID.")
        .optional(),
      id: z.string().describe("The ID of the label.").optional(),
      kind: z.string().describe("This is always drive#label").optional(),
      revisionId: z.string().describe("The revision ID of the label.")
        .optional(),
    })).describe(
      "Output only. The set of labels on the file as requested by the label IDs in the `includeLabels` parameter. By default, no labels are returned.",
    ).optional(),
  }).describe("Label information on the file.").optional(),
  lastModifyingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  linkShareMetadata: z.object({
    securityUpdateEligible: z.boolean().describe(
      "Output only. Whether the file is eligible for security update.",
    ).optional(),
    securityUpdateEnabled: z.boolean().describe(
      "Output only. Whether the security update is enabled for this file.",
    ).optional(),
  }).describe(
    "Contains details about the link URLs that clients are using to refer to this item.",
  ).optional(),
  mimeType: z.string().describe(
    "The MIME type of the file. Google Drive attempts to automatically detect an appropriate value from uploaded content, if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content is imported, if possible. The supported import formats are published in the [`about`](/workspace/drive/api/reference/rest/v3/about) resource.",
  ).optional(),
  modifiedByMeTime: z.string().describe(
    "The last time the file was modified by the user (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "he last time the file was modified by anyone (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user.",
  ).optional(),
  name: z.string().describe(
    "The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, the My Drive root folder, and the Application Data folder, the name is constant.",
  ).optional(),
  originalFilename: z.string().describe(
    "The original filename of the uploaded content if available, or else the original value of the `name` field. This is only available for files with binary content in Google Drive.",
  ).optional(),
  parents: z.array(z.string()).describe(
    "The ID of the parent folder containing the file. A file can only have one parent folder; specifying multiple parents isn't supported. If not specified as part of a create request, the file is placed directly in the user's My Drive folder. If not specified as part of a copy request, the file inherits any discoverable parent of the source file. Update requests must use the `addParents` and `removeParents` parameters to modify the parents list.",
  ).optional(),
  properties: z.record(z.string(), z.string()).describe(
    "A collection of arbitrary key-value pairs which are visible to all apps. Entries with null values are cleared in update and copy requests.",
  ).optional(),
  sharedWithMeTime: z.string().describe(
    "The time at which the file was shared with the user, if applicable (RFC 3339 date-time).",
  ).optional(),
  sharingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  shortcutDetails: z.object({
    targetId: z.string().describe(
      "The ID of the file that this shortcut points to. Can only be set on `files.create` requests.",
    ).optional(),
    targetMimeType: z.string().describe(
      "Output only. The MIME type of the file that this shortcut points to. The value of this field is a snapshot of the target's MIME type, captured when the shortcut is created.",
    ).optional(),
    targetResourceKey: z.string().describe(
      "Output only. The `resourceKey` for the target file.",
    ).optional(),
  }).describe("Information about a shortcut file.").optional(),
  starred: z.boolean().describe("Whether the user has starred the file.")
    .optional(),
  trashed: z.boolean().describe(
    "Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner may trash a file, but other users can still access the file in the owner's trash until it's permanently deleted.",
  ).optional(),
  trashedTime: z.string().describe(
    "The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives.",
  ).optional(),
  trashingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  viewedByMeTime: z.string().describe(
    "The last time the file was viewed by the user (RFC 3339 date-time).",
  ).optional(),
  writersCanShare: z.boolean().describe(
    "Whether users with only `writer` permission can modify the file's permissions. Not populated for items in shared drives.",
  ).optional(),
  ignoreDefaultVisibility: z.string().describe(
    "Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.",
  ).optional(),
  includeLabels: z.string().describe(
    "A comma-separated list of IDs of labels to include in the `labelInfo` part of the response.",
  ).optional(),
  includePermissionsForView: z.string().describe(
    "Specifies which additional view's permissions to include in the response. Only `published` is supported.",
  ).optional(),
  keepRevisionForever: z.string().describe(
    "Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.",
  ).optional(),
  ocrLanguage: z.string().describe(
    "A language hint for OCR processing during image import (ISO 639-1 code).",
  ).optional(),
  supportsAllDrives: z.string().describe(
    "Whether the requesting application supports both My Drives and shared drives.",
  ).optional(),
  useContentAsIndexableText: z.string().describe(
    "Whether to use the uploaded content as indexable text.",
  ).optional(),
});

const StateSchema = z.object({
  appProperties: z.record(z.string(), z.unknown()).optional(),
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
  }).optional(),
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
  }).optional(),
  contentHints: z.object({
    indexableText: z.string(),
    thumbnail: z.object({
      image: z.string(),
      mimeType: z.string(),
    }),
  }).optional(),
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
  })).optional(),
  copyRequiresWriterPermission: z.boolean().optional(),
  createdTime: z.string().optional(),
  description: z.string().optional(),
  downloadRestrictions: z.object({
    effectiveDownloadRestrictionWithContext: z.object({
      restrictedForReaders: z.boolean(),
      restrictedForWriters: z.boolean(),
    }),
    itemDownloadRestriction: z.object({
      restrictedForReaders: z.boolean(),
      restrictedForWriters: z.boolean(),
    }),
  }).optional(),
  driveId: z.string().optional(),
  explicitlyTrashed: z.boolean().optional(),
  exportLinks: z.record(z.string(), z.unknown()).optional(),
  fileExtension: z.string().optional(),
  folderColorRgb: z.string().optional(),
  fullFileExtension: z.string().optional(),
  hasAugmentedPermissions: z.boolean().optional(),
  hasThumbnail: z.boolean().optional(),
  headRevisionId: z.string().optional(),
  iconLink: z.string().optional(),
  id: z.string().optional(),
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
  }).optional(),
  inheritedPermissionsDisabled: z.boolean().optional(),
  isAppAuthorized: z.boolean().optional(),
  kind: z.string().optional(),
  labelInfo: z.object({
    labels: z.array(z.object({
      fields: z.record(z.string(), z.unknown()),
      id: z.string(),
      kind: z.string(),
      revisionId: z.string(),
    })),
  }).optional(),
  lastModifyingUser: z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  }).optional(),
  linkShareMetadata: z.object({
    securityUpdateEligible: z.boolean(),
    securityUpdateEnabled: z.boolean(),
  }).optional(),
  md5Checksum: z.string().optional(),
  mimeType: z.string().optional(),
  modifiedByMe: z.boolean().optional(),
  modifiedByMeTime: z.string().optional(),
  modifiedTime: z.string().optional(),
  name: z.string(),
  originalFilename: z.string().optional(),
  ownedByMe: z.boolean().optional(),
  owners: z.array(z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  })).optional(),
  parents: z.array(z.string()).optional(),
  permissionIds: z.array(z.string()).optional(),
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
      inherited: z.boolean(),
      inheritedFrom: z.string(),
      permissionType: z.string(),
      role: z.string(),
    })),
    photoLink: z.string(),
    role: z.string(),
    teamDrivePermissionDetails: z.array(z.object({
      inherited: z.boolean(),
      inheritedFrom: z.string(),
      role: z.string(),
      teamDrivePermissionType: z.string(),
    })),
    type: z.string(),
    view: z.string(),
  })).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  quotaBytesUsed: z.string().optional(),
  resourceKey: z.string().optional(),
  sha1Checksum: z.string().optional(),
  sha256Checksum: z.string().optional(),
  shared: z.boolean().optional(),
  sharedWithMeTime: z.string().optional(),
  sharingUser: z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  }).optional(),
  shortcutDetails: z.object({
    targetId: z.string(),
    targetMimeType: z.string(),
    targetResourceKey: z.string(),
  }).optional(),
  size: z.string().optional(),
  spaces: z.array(z.string()).optional(),
  starred: z.boolean().optional(),
  teamDriveId: z.string().optional(),
  thumbnailLink: z.string().optional(),
  thumbnailVersion: z.string().optional(),
  trashed: z.boolean().optional(),
  trashedTime: z.string().optional(),
  trashingUser: z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  }).optional(),
  version: z.string().optional(),
  videoMediaMetadata: z.object({
    durationMillis: z.string(),
    height: z.number(),
    width: z.number(),
  }).optional(),
  viewedByMe: z.boolean().optional(),
  viewedByMeTime: z.string().optional(),
  viewersCanCopyContent: z.boolean().optional(),
  webContentLink: z.string().optional(),
  webViewLink: z.string().optional(),
  writersCanShare: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appProperties: z.record(z.string(), z.string()).describe(
    "A collection of arbitrary key-value pairs which are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties.",
  ).optional(),
  clientEncryptionDetails: z.object({
    decryptionMetadata: z.object({
      aes256GcmChunkSize: z.string().describe(
        "Chunk size used if content was encrypted with the AES 256 GCM Cipher. Possible values are: - default - small",
      ).optional(),
      encryptionResourceKeyHash: z.string().describe(
        "The URL-safe Base64 encoded HMAC-SHA256 digest of the resource metadata with its DEK (Data Encryption Key); see https://developers.google.com/workspace/cse/reference",
      ).optional(),
      jwt: z.string().describe(
        "The signed JSON Web Token (JWT) which can be used to authorize the requesting user with the Key ACL Service (KACLS). The JWT asserts that the requesting user has at least read permissions on the file.",
      ).optional(),
      kaclsId: z.string().describe(
        "The ID of the KACLS (Key ACL Service) used to encrypt the file.",
      ).optional(),
      kaclsName: z.string().describe(
        "The name of the KACLS (Key ACL Service) used to encrypt the file.",
      ).optional(),
      keyFormat: z.string().describe(
        "Key format for the unwrapped key. Must be `tinkAesGcmKey`.",
      ).optional(),
      wrappedKey: z.string().describe(
        "The URL-safe Base64 encoded wrapped key used to encrypt the contents of the file.",
      ).optional(),
    }).describe("Representation of the CSE DecryptionMetadata.").optional(),
    encryptionState: z.string().describe(
      "The encryption state of the file. The values expected here are: - encrypted - unencrypted",
    ).optional(),
  }).describe("Details about the client-side encryption applied to the file.")
    .optional(),
  contentHints: z.object({
    indexableText: z.string().describe(
      "Text to be indexed for the file to improve fullText queries. This is limited to 128 KB in length and may contain HTML elements.",
    ).optional(),
    thumbnail: z.object({
      image: z.string().describe(
        "The thumbnail data encoded with URL-safe Base64 ([RFC 4648 section 5](https://datatracker.ietf.org/doc/html/rfc4648#section-5)).",
      ).optional(),
      mimeType: z.string().describe("The MIME type of the thumbnail.")
        .optional(),
    }).describe(
      "A thumbnail for the file. This will only be used if Google Drive cannot generate a standard thumbnail.",
    ).optional(),
  }).describe(
    "Additional information about the content of the file. These fields are never populated in responses.",
  ).optional(),
  contentRestrictions: z.array(z.object({
    ownerRestricted: z.boolean().describe(
      "Whether the content restriction can only be modified or removed by a user who owns the file. For files in shared drives, any user with `organizer` capabilities can modify or remove this content restriction.",
    ).optional(),
    readOnly: z.boolean().describe(
      "Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified.",
    ).optional(),
    reason: z.string().describe(
      "Reason for why the content of the file is restricted. This is only mutable on requests that also set `readOnly=true`.",
    ).optional(),
    restrictingUser: z.object({
      displayName: z.string().describe(
        "Output only. A plain text displayable name for this user.",
      ).optional(),
      emailAddress: z.string().describe(
        "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
      ).optional(),
      kind: z.string().describe(
        "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
      ).optional(),
      me: z.boolean().describe(
        "Output only. Whether this user is the requesting user.",
      ).optional(),
      permissionId: z.string().describe(
        "Output only. The user's ID as visible in Permission resources.",
      ).optional(),
      photoLink: z.string().describe(
        "Output only. A link to the user's profile photo, if available.",
      ).optional(),
    }).describe("Information about a Drive user.").optional(),
    restrictionTime: z.string().describe(
      "The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true.",
    ).optional(),
    systemRestricted: z.boolean().describe(
      "Output only. Whether the content restriction was applied by the system, for example due to an esignature. Users cannot modify or remove system restricted content restrictions.",
    ).optional(),
    type: z.string().describe(
      "Output only. The type of the content restriction. Currently the only possible value is `globalContentRestriction`.",
    ).optional(),
  })).describe(
    "Restrictions for accessing the content of the file. Only populated if such a restriction exists.",
  ).optional(),
  copyRequiresWriterPermission: z.boolean().describe(
    "Whether the options to copy, print, or download this file should be disabled for readers and commenters.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the file was created (RFC 3339 date-time).",
  ).optional(),
  description: z.string().describe("A short description of the file.")
    .optional(),
  downloadRestrictions: z.object({
    effectiveDownloadRestrictionWithContext: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    itemDownloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If true, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
  }).describe("Download restrictions applied to the file.").optional(),
  folderColorRgb: z.string().describe(
    "The color for a folder or a shortcut to a folder as an RGB hex string. The supported colors are published in the `folderColorPalette` field of the [`about`](/workspace/drive/api/reference/rest/v3/about) resource. If an unsupported color is specified, the closest color in the palette is used instead.",
  ).optional(),
  id: z.string().describe("The ID of the file.").optional(),
  inheritedPermissionsDisabled: z.boolean().describe(
    "Whether this file has inherited permissions disabled. Inherited permissions are enabled by default.",
  ).optional(),
  labelInfo: z.object({
    labels: z.array(z.object({
      fields: z.record(
        z.string(),
        z.object({
          dateString: z.unknown().describe(
            "Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD.",
          ).optional(),
          id: z.unknown().describe("The identifier of this label field.")
            .optional(),
          integer: z.unknown().describe(
            "Only present if `valueType` is `integer`.",
          ).optional(),
          kind: z.unknown().describe("This is always drive#labelField.")
            .optional(),
          selection: z.unknown().describe(
            "Only present if `valueType` is `selection`",
          ).optional(),
          text: z.unknown().describe("Only present if `valueType` is `text`.")
            .optional(),
          user: z.unknown().describe("Only present if `valueType` is `user`.")
            .optional(),
          valueType: z.unknown().describe(
            "The field type. While new values may be supported in the future, the following are currently allowed: * `dateString` * `integer` * `selection` * `text` * `user`",
          ).optional(),
        }),
      ).describe("A map of the fields on the label, keyed by the field's ID.")
        .optional(),
      id: z.string().describe("The ID of the label.").optional(),
      kind: z.string().describe("This is always drive#label").optional(),
      revisionId: z.string().describe("The revision ID of the label.")
        .optional(),
    })).describe(
      "Output only. The set of labels on the file as requested by the label IDs in the `includeLabels` parameter. By default, no labels are returned.",
    ).optional(),
  }).describe("Label information on the file.").optional(),
  lastModifyingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  linkShareMetadata: z.object({
    securityUpdateEligible: z.boolean().describe(
      "Output only. Whether the file is eligible for security update.",
    ).optional(),
    securityUpdateEnabled: z.boolean().describe(
      "Output only. Whether the security update is enabled for this file.",
    ).optional(),
  }).describe(
    "Contains details about the link URLs that clients are using to refer to this item.",
  ).optional(),
  mimeType: z.string().describe(
    "The MIME type of the file. Google Drive attempts to automatically detect an appropriate value from uploaded content, if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content is imported, if possible. The supported import formats are published in the [`about`](/workspace/drive/api/reference/rest/v3/about) resource.",
  ).optional(),
  modifiedByMeTime: z.string().describe(
    "The last time the file was modified by the user (RFC 3339 date-time).",
  ).optional(),
  modifiedTime: z.string().describe(
    "he last time the file was modified by anyone (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user.",
  ).optional(),
  name: z.string().describe(
    "The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, the My Drive root folder, and the Application Data folder, the name is constant.",
  ).optional(),
  originalFilename: z.string().describe(
    "The original filename of the uploaded content if available, or else the original value of the `name` field. This is only available for files with binary content in Google Drive.",
  ).optional(),
  parents: z.array(z.string()).describe(
    "The ID of the parent folder containing the file. A file can only have one parent folder; specifying multiple parents isn't supported. If not specified as part of a create request, the file is placed directly in the user's My Drive folder. If not specified as part of a copy request, the file inherits any discoverable parent of the source file. Update requests must use the `addParents` and `removeParents` parameters to modify the parents list.",
  ).optional(),
  properties: z.record(z.string(), z.string()).describe(
    "A collection of arbitrary key-value pairs which are visible to all apps. Entries with null values are cleared in update and copy requests.",
  ).optional(),
  sharedWithMeTime: z.string().describe(
    "The time at which the file was shared with the user, if applicable (RFC 3339 date-time).",
  ).optional(),
  sharingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  shortcutDetails: z.object({
    targetId: z.string().describe(
      "The ID of the file that this shortcut points to. Can only be set on `files.create` requests.",
    ).optional(),
    targetMimeType: z.string().describe(
      "Output only. The MIME type of the file that this shortcut points to. The value of this field is a snapshot of the target's MIME type, captured when the shortcut is created.",
    ).optional(),
    targetResourceKey: z.string().describe(
      "Output only. The `resourceKey` for the target file.",
    ).optional(),
  }).describe("Information about a shortcut file.").optional(),
  starred: z.boolean().describe("Whether the user has starred the file.")
    .optional(),
  trashed: z.boolean().describe(
    "Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner may trash a file, but other users can still access the file in the owner's trash until it's permanently deleted.",
  ).optional(),
  trashedTime: z.string().describe(
    "The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives.",
  ).optional(),
  trashingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  viewedByMeTime: z.string().describe(
    "The last time the file was viewed by the user (RFC 3339 date-time).",
  ).optional(),
  writersCanShare: z.boolean().describe(
    "Whether users with only `writer` permission can modify the file's permissions. Not populated for items in shared drives.",
  ).optional(),
  ignoreDefaultVisibility: z.string().describe(
    "Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.",
  ).optional(),
  includeLabels: z.string().describe(
    "A comma-separated list of IDs of labels to include in the `labelInfo` part of the response.",
  ).optional(),
  includePermissionsForView: z.string().describe(
    "Specifies which additional view's permissions to include in the response. Only `published` is supported.",
  ).optional(),
  keepRevisionForever: z.string().describe(
    "Whether to set the `keepForever` field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.",
  ).optional(),
  ocrLanguage: z.string().describe(
    "A language hint for OCR processing during image import (ISO 639-1 code).",
  ).optional(),
  supportsAllDrives: z.string().describe(
    "Whether the requesting application supports both My Drives and shared drives.",
  ).optional(),
  useContentAsIndexableText: z.string().describe(
    "Whether to use the uploaded content as indexable text.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Drive Files. Registered at `@swamp/gcp/drive/files`. */
export const model = {
  type: "@swamp/gcp/drive/files",
  version: "2026.05.21.1",
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
      toVersion: "2026.04.09.1",
      description: "Added: clientEncryptionDetails",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "Added: labelInfo",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: clientEncryptionDetails, labelInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          clientEncryptionDetails: _clientEncryptionDetails,
          labelInfo: _labelInfo,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: clientEncryptionDetails, labelInfo",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: clientEncryptionDetails, labelInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          clientEncryptionDetails: _clientEncryptionDetails,
          labelInfo: _labelInfo,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: clientEncryptionDetails, labelInfo",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The metadata for a file. Some resource methods (such as `files.update`) requi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a files",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appProperties"] !== undefined) {
          body["appProperties"] = g["appProperties"];
        }
        if (g["clientEncryptionDetails"] !== undefined) {
          body["clientEncryptionDetails"] = g["clientEncryptionDetails"];
        }
        if (g["contentHints"] !== undefined) {
          body["contentHints"] = g["contentHints"];
        }
        if (g["contentRestrictions"] !== undefined) {
          body["contentRestrictions"] = g["contentRestrictions"];
        }
        if (g["copyRequiresWriterPermission"] !== undefined) {
          body["copyRequiresWriterPermission"] =
            g["copyRequiresWriterPermission"];
        }
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["downloadRestrictions"] !== undefined) {
          body["downloadRestrictions"] = g["downloadRestrictions"];
        }
        if (g["folderColorRgb"] !== undefined) {
          body["folderColorRgb"] = g["folderColorRgb"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["inheritedPermissionsDisabled"] !== undefined) {
          body["inheritedPermissionsDisabled"] =
            g["inheritedPermissionsDisabled"];
        }
        if (g["labelInfo"] !== undefined) body["labelInfo"] = g["labelInfo"];
        if (g["lastModifyingUser"] !== undefined) {
          body["lastModifyingUser"] = g["lastModifyingUser"];
        }
        if (g["linkShareMetadata"] !== undefined) {
          body["linkShareMetadata"] = g["linkShareMetadata"];
        }
        if (g["mimeType"] !== undefined) body["mimeType"] = g["mimeType"];
        if (g["modifiedByMeTime"] !== undefined) {
          body["modifiedByMeTime"] = g["modifiedByMeTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["originalFilename"] !== undefined) {
          body["originalFilename"] = g["originalFilename"];
        }
        if (g["parents"] !== undefined) body["parents"] = g["parents"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sharedWithMeTime"] !== undefined) {
          body["sharedWithMeTime"] = g["sharedWithMeTime"];
        }
        if (g["sharingUser"] !== undefined) {
          body["sharingUser"] = g["sharingUser"];
        }
        if (g["shortcutDetails"] !== undefined) {
          body["shortcutDetails"] = g["shortcutDetails"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["trashedTime"] !== undefined) {
          body["trashedTime"] = g["trashedTime"];
        }
        if (g["trashingUser"] !== undefined) {
          body["trashingUser"] = g["trashingUser"];
        }
        if (g["viewedByMeTime"] !== undefined) {
          body["viewedByMeTime"] = g["viewedByMeTime"];
        }
        if (g["writersCanShare"] !== undefined) {
          body["writersCanShare"] = g["writersCanShare"];
        }
        if (g["ignoreDefaultVisibility"] !== undefined) {
          body["ignoreDefaultVisibility"] = g["ignoreDefaultVisibility"];
        }
        if (g["includeLabels"] !== undefined) {
          body["includeLabels"] = g["includeLabels"];
        }
        if (g["includePermissionsForView"] !== undefined) {
          body["includePermissionsForView"] = g["includePermissionsForView"];
        }
        if (g["keepRevisionForever"] !== undefined) {
          body["keepRevisionForever"] = g["keepRevisionForever"];
        }
        if (g["ocrLanguage"] !== undefined) {
          body["ocrLanguage"] = g["ocrLanguage"];
        }
        if (g["supportsAllDrives"] !== undefined) {
          body["supportsAllDrives"] = g["supportsAllDrives"];
        }
        if (g["useContentAsIndexableText"] !== undefined) {
          body["useContentAsIndexableText"] = g["useContentAsIndexableText"];
        }
        if (g["name"] !== undefined) params["fileId"] = String(g["name"]);
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
      description: "Get a files",
      arguments: z.object({
        identifier: z.string().describe("The name of the files"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["fileId"] = args.identifier;
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
      description: "Update files attributes",
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
        params["fileId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["appProperties"] !== undefined) {
          body["appProperties"] = g["appProperties"];
        }
        if (g["clientEncryptionDetails"] !== undefined) {
          body["clientEncryptionDetails"] = g["clientEncryptionDetails"];
        }
        if (g["contentHints"] !== undefined) {
          body["contentHints"] = g["contentHints"];
        }
        if (g["contentRestrictions"] !== undefined) {
          body["contentRestrictions"] = g["contentRestrictions"];
        }
        if (g["copyRequiresWriterPermission"] !== undefined) {
          body["copyRequiresWriterPermission"] =
            g["copyRequiresWriterPermission"];
        }
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["downloadRestrictions"] !== undefined) {
          body["downloadRestrictions"] = g["downloadRestrictions"];
        }
        if (g["folderColorRgb"] !== undefined) {
          body["folderColorRgb"] = g["folderColorRgb"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["inheritedPermissionsDisabled"] !== undefined) {
          body["inheritedPermissionsDisabled"] =
            g["inheritedPermissionsDisabled"];
        }
        if (g["labelInfo"] !== undefined) body["labelInfo"] = g["labelInfo"];
        if (g["lastModifyingUser"] !== undefined) {
          body["lastModifyingUser"] = g["lastModifyingUser"];
        }
        if (g["linkShareMetadata"] !== undefined) {
          body["linkShareMetadata"] = g["linkShareMetadata"];
        }
        if (g["modifiedByMeTime"] !== undefined) {
          body["modifiedByMeTime"] = g["modifiedByMeTime"];
        }
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["originalFilename"] !== undefined) {
          body["originalFilename"] = g["originalFilename"];
        }
        if (g["parents"] !== undefined) body["parents"] = g["parents"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sharedWithMeTime"] !== undefined) {
          body["sharedWithMeTime"] = g["sharedWithMeTime"];
        }
        if (g["sharingUser"] !== undefined) {
          body["sharingUser"] = g["sharingUser"];
        }
        if (g["shortcutDetails"] !== undefined) {
          body["shortcutDetails"] = g["shortcutDetails"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["trashedTime"] !== undefined) {
          body["trashedTime"] = g["trashedTime"];
        }
        if (g["trashingUser"] !== undefined) {
          body["trashingUser"] = g["trashingUser"];
        }
        if (g["viewedByMeTime"] !== undefined) {
          body["viewedByMeTime"] = g["viewedByMeTime"];
        }
        if (g["writersCanShare"] !== undefined) {
          body["writersCanShare"] = g["writersCanShare"];
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
      description: "Delete the files",
      arguments: z.object({
        identifier: z.string().describe("The name of the files"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["fileId"] = args.identifier;
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
      description: "Sync files state from GCP",
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
          params["fileId"] = identifier;
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
    copy: {
      description: "copy",
      arguments: z.object({
        appProperties: z.any().optional(),
        capabilities: z.any().optional(),
        clientEncryptionDetails: z.any().optional(),
        contentHints: z.any().optional(),
        contentRestrictions: z.any().optional(),
        copyRequiresWriterPermission: z.any().optional(),
        createdTime: z.any().optional(),
        description: z.any().optional(),
        downloadRestrictions: z.any().optional(),
        driveId: z.any().optional(),
        explicitlyTrashed: z.any().optional(),
        exportLinks: z.any().optional(),
        fileExtension: z.any().optional(),
        folderColorRgb: z.any().optional(),
        fullFileExtension: z.any().optional(),
        hasAugmentedPermissions: z.any().optional(),
        hasThumbnail: z.any().optional(),
        headRevisionId: z.any().optional(),
        iconLink: z.any().optional(),
        id: z.any().optional(),
        imageMediaMetadata: z.any().optional(),
        inheritedPermissionsDisabled: z.any().optional(),
        isAppAuthorized: z.any().optional(),
        kind: z.any().optional(),
        labelInfo: z.any().optional(),
        lastModifyingUser: z.any().optional(),
        linkShareMetadata: z.any().optional(),
        md5Checksum: z.any().optional(),
        mimeType: z.any().optional(),
        modifiedByMe: z.any().optional(),
        modifiedByMeTime: z.any().optional(),
        modifiedTime: z.any().optional(),
        name: z.any().optional(),
        originalFilename: z.any().optional(),
        ownedByMe: z.any().optional(),
        owners: z.any().optional(),
        parents: z.any().optional(),
        permissionIds: z.any().optional(),
        permissions: z.any().optional(),
        properties: z.any().optional(),
        quotaBytesUsed: z.any().optional(),
        resourceKey: z.any().optional(),
        sha1Checksum: z.any().optional(),
        sha256Checksum: z.any().optional(),
        shared: z.any().optional(),
        sharedWithMeTime: z.any().optional(),
        sharingUser: z.any().optional(),
        shortcutDetails: z.any().optional(),
        size: z.any().optional(),
        spaces: z.any().optional(),
        starred: z.any().optional(),
        teamDriveId: z.any().optional(),
        thumbnailLink: z.any().optional(),
        thumbnailVersion: z.any().optional(),
        trashed: z.any().optional(),
        trashedTime: z.any().optional(),
        trashingUser: z.any().optional(),
        version: z.any().optional(),
        videoMediaMetadata: z.any().optional(),
        viewedByMe: z.any().optional(),
        viewedByMeTime: z.any().optional(),
        viewersCanCopyContent: z.any().optional(),
        webContentLink: z.any().optional(),
        webViewLink: z.any().optional(),
        writersCanShare: z.any().optional(),
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
        params["fileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["appProperties"] !== undefined) {
          body["appProperties"] = args["appProperties"];
        }
        if (args["capabilities"] !== undefined) {
          body["capabilities"] = args["capabilities"];
        }
        if (args["clientEncryptionDetails"] !== undefined) {
          body["clientEncryptionDetails"] = args["clientEncryptionDetails"];
        }
        if (args["contentHints"] !== undefined) {
          body["contentHints"] = args["contentHints"];
        }
        if (args["contentRestrictions"] !== undefined) {
          body["contentRestrictions"] = args["contentRestrictions"];
        }
        if (args["copyRequiresWriterPermission"] !== undefined) {
          body["copyRequiresWriterPermission"] =
            args["copyRequiresWriterPermission"];
        }
        if (args["createdTime"] !== undefined) {
          body["createdTime"] = args["createdTime"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["downloadRestrictions"] !== undefined) {
          body["downloadRestrictions"] = args["downloadRestrictions"];
        }
        if (args["driveId"] !== undefined) body["driveId"] = args["driveId"];
        if (args["explicitlyTrashed"] !== undefined) {
          body["explicitlyTrashed"] = args["explicitlyTrashed"];
        }
        if (args["exportLinks"] !== undefined) {
          body["exportLinks"] = args["exportLinks"];
        }
        if (args["fileExtension"] !== undefined) {
          body["fileExtension"] = args["fileExtension"];
        }
        if (args["folderColorRgb"] !== undefined) {
          body["folderColorRgb"] = args["folderColorRgb"];
        }
        if (args["fullFileExtension"] !== undefined) {
          body["fullFileExtension"] = args["fullFileExtension"];
        }
        if (args["hasAugmentedPermissions"] !== undefined) {
          body["hasAugmentedPermissions"] = args["hasAugmentedPermissions"];
        }
        if (args["hasThumbnail"] !== undefined) {
          body["hasThumbnail"] = args["hasThumbnail"];
        }
        if (args["headRevisionId"] !== undefined) {
          body["headRevisionId"] = args["headRevisionId"];
        }
        if (args["iconLink"] !== undefined) body["iconLink"] = args["iconLink"];
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["imageMediaMetadata"] !== undefined) {
          body["imageMediaMetadata"] = args["imageMediaMetadata"];
        }
        if (args["inheritedPermissionsDisabled"] !== undefined) {
          body["inheritedPermissionsDisabled"] =
            args["inheritedPermissionsDisabled"];
        }
        if (args["isAppAuthorized"] !== undefined) {
          body["isAppAuthorized"] = args["isAppAuthorized"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["labelInfo"] !== undefined) {
          body["labelInfo"] = args["labelInfo"];
        }
        if (args["lastModifyingUser"] !== undefined) {
          body["lastModifyingUser"] = args["lastModifyingUser"];
        }
        if (args["linkShareMetadata"] !== undefined) {
          body["linkShareMetadata"] = args["linkShareMetadata"];
        }
        if (args["md5Checksum"] !== undefined) {
          body["md5Checksum"] = args["md5Checksum"];
        }
        if (args["mimeType"] !== undefined) body["mimeType"] = args["mimeType"];
        if (args["modifiedByMe"] !== undefined) {
          body["modifiedByMe"] = args["modifiedByMe"];
        }
        if (args["modifiedByMeTime"] !== undefined) {
          body["modifiedByMeTime"] = args["modifiedByMeTime"];
        }
        if (args["modifiedTime"] !== undefined) {
          body["modifiedTime"] = args["modifiedTime"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["originalFilename"] !== undefined) {
          body["originalFilename"] = args["originalFilename"];
        }
        if (args["ownedByMe"] !== undefined) {
          body["ownedByMe"] = args["ownedByMe"];
        }
        if (args["owners"] !== undefined) body["owners"] = args["owners"];
        if (args["parents"] !== undefined) body["parents"] = args["parents"];
        if (args["permissionIds"] !== undefined) {
          body["permissionIds"] = args["permissionIds"];
        }
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        if (args["properties"] !== undefined) {
          body["properties"] = args["properties"];
        }
        if (args["quotaBytesUsed"] !== undefined) {
          body["quotaBytesUsed"] = args["quotaBytesUsed"];
        }
        if (args["resourceKey"] !== undefined) {
          body["resourceKey"] = args["resourceKey"];
        }
        if (args["sha1Checksum"] !== undefined) {
          body["sha1Checksum"] = args["sha1Checksum"];
        }
        if (args["sha256Checksum"] !== undefined) {
          body["sha256Checksum"] = args["sha256Checksum"];
        }
        if (args["shared"] !== undefined) body["shared"] = args["shared"];
        if (args["sharedWithMeTime"] !== undefined) {
          body["sharedWithMeTime"] = args["sharedWithMeTime"];
        }
        if (args["sharingUser"] !== undefined) {
          body["sharingUser"] = args["sharingUser"];
        }
        if (args["shortcutDetails"] !== undefined) {
          body["shortcutDetails"] = args["shortcutDetails"];
        }
        if (args["size"] !== undefined) body["size"] = args["size"];
        if (args["spaces"] !== undefined) body["spaces"] = args["spaces"];
        if (args["starred"] !== undefined) body["starred"] = args["starred"];
        if (args["teamDriveId"] !== undefined) {
          body["teamDriveId"] = args["teamDriveId"];
        }
        if (args["thumbnailLink"] !== undefined) {
          body["thumbnailLink"] = args["thumbnailLink"];
        }
        if (args["thumbnailVersion"] !== undefined) {
          body["thumbnailVersion"] = args["thumbnailVersion"];
        }
        if (args["trashed"] !== undefined) body["trashed"] = args["trashed"];
        if (args["trashedTime"] !== undefined) {
          body["trashedTime"] = args["trashedTime"];
        }
        if (args["trashingUser"] !== undefined) {
          body["trashingUser"] = args["trashingUser"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        if (args["videoMediaMetadata"] !== undefined) {
          body["videoMediaMetadata"] = args["videoMediaMetadata"];
        }
        if (args["viewedByMe"] !== undefined) {
          body["viewedByMe"] = args["viewedByMe"];
        }
        if (args["viewedByMeTime"] !== undefined) {
          body["viewedByMeTime"] = args["viewedByMeTime"];
        }
        if (args["viewersCanCopyContent"] !== undefined) {
          body["viewersCanCopyContent"] = args["viewersCanCopyContent"];
        }
        if (args["webContentLink"] !== undefined) {
          body["webContentLink"] = args["webContentLink"];
        }
        if (args["webViewLink"] !== undefined) {
          body["webViewLink"] = args["webViewLink"];
        }
        if (args["writersCanShare"] !== undefined) {
          body["writersCanShare"] = args["writersCanShare"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.copy",
            "path": "files/{fileId}/copy",
            "httpMethod": "POST",
            "parameterOrder": ["fileId"],
            "parameters": {
              "enforceSingleParent": { "location": "query" },
              "fileId": { "location": "path", "required": true },
              "ignoreDefaultVisibility": { "location": "query" },
              "includeLabels": { "location": "query" },
              "includePermissionsForView": { "location": "query" },
              "keepRevisionForever": { "location": "query" },
              "ocrLanguage": { "location": "query" },
              "supportsAllDrives": { "location": "query" },
              "supportsTeamDrives": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    download: {
      description: "download",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["fileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.download",
            "path": "files/{fileId}/download",
            "httpMethod": "POST",
            "parameterOrder": ["fileId"],
            "parameters": {
              "fileId": { "location": "path", "required": true },
              "mimeType": { "location": "query" },
              "revisionId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    empty_trash: {
      description: "empty trash",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.emptyTrash",
            "path": "files/trash",
            "httpMethod": "DELETE",
            "parameterOrder": [],
            "parameters": {
              "driveId": { "location": "query" },
              "enforceSingleParent": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["mimeType"] !== undefined) {
          params["mimeType"] = String(g["mimeType"]);
        }
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
        params["fileId"] = existing["fileId"]?.toString() ??
          g["fileId"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.export",
            "path": "files/{fileId}/export",
            "httpMethod": "GET",
            "parameterOrder": ["fileId", "mimeType"],
            "parameters": {
              "fileId": { "location": "path", "required": true },
              "mimeType": { "location": "query", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    generate_cse_token: {
      description: "generate cse token",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.generateCseToken",
            "path": "files/generateCseToken",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "fileId": { "location": "query" },
              "parent": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    generate_ids: {
      description: "generate ids",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.generateIds",
            "path": "files/generateIds",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "count": { "location": "query" },
              "space": { "location": "query" },
              "type": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_labels: {
      description: "list labels",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["fileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.listLabels",
            "path": "files/{fileId}/listLabels",
            "httpMethod": "GET",
            "parameterOrder": ["fileId"],
            "parameters": {
              "fileId": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    modify_labels: {
      description: "modify labels",
      arguments: z.object({
        kind: z.any().optional(),
        labelModifications: z.any().optional(),
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
        params["fileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["labelModifications"] !== undefined) {
          body["labelModifications"] = args["labelModifications"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.files.modifyLabels",
            "path": "files/{fileId}/modifyLabels",
            "httpMethod": "POST",
            "parameterOrder": ["fileId"],
            "parameters": {
              "fileId": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        params["fileId"] = existing["name"]?.toString() ??
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
            "id": "drive.files.watch",
            "path": "files/{fileId}/watch",
            "httpMethod": "POST",
            "parameterOrder": ["fileId"],
            "parameters": {
              "acknowledgeAbuse": { "location": "query" },
              "fileId": { "location": "path", "required": true },
              "includeLabels": { "location": "query" },
              "includePermissionsForView": { "location": "query" },
              "supportsAllDrives": { "location": "query" },
              "supportsTeamDrives": { "location": "query" },
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
