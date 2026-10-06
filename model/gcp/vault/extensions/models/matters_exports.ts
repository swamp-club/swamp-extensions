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

// Auto-generated extension model for @swamp/gcp/vault/matters-exports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Vault Matters.Exports.
 *
 * An export. To work with Vault resources, the account must have the [required Vault privileges](https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://vault.googleapis.com/";

const GET_CONFIG = {
  "id": "vault.matters.exports.get",
  "path": "v1/matters/{matterId}/exports/{exportId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
    "exportId",
  ],
  "parameters": {
    "exportId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "vault.matters.exports.create",
  "path": "v1/matters/{matterId}/exports",
  "httpMethod": "POST",
  "parameterOrder": [
    "matterId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vault.matters.exports.delete",
  "path": "v1/matters/{matterId}/exports/{exportId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "matterId",
    "exportId",
  ],
  "parameters": {
    "exportId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "vault.matters.exports.list",
  "path": "v1/matters/{matterId}/exports",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/ediscovery",
  "https://www.googleapis.com/auth/ediscovery.readonly",
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
  exportOptions: z.object({
    calendarOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported text messages.").optional(),
    }).describe("Option available for Calendar export.").optional(),
    driveOptions: z.object({
      includeAccessInfo: z.boolean().describe(
        "To include access level information for users with [indirect access](https://support.google.com/vault/answer/6099459#metadata) to files, set to **true**.",
      ).optional(),
    }).describe("Options for Drive exports.").optional(),
    geminiOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Option available for Gemini export.").optional(),
    groupsOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Options for Groups exports.").optional(),
    hangoutsChatOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Options for Chat exports.").optional(),
    mailOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
      exportLinkedDriveFiles: z.boolean().describe(
        "Optional. To enable exporting linked Drive files, set to **true**.",
      ).optional(),
      showConfidentialModeContent: z.boolean().describe(
        "To export confidential mode content, set to **true**.",
      ).optional(),
      useNewExport: z.boolean().describe(
        "To use the new export system, set to **true**.",
      ).optional(),
    }).describe("Options for Gmail exports.").optional(),
    region: z.enum(["EXPORT_REGION_UNSPECIFIED", "ANY", "US", "EUROPE"])
      .describe("The requested data region for the export.").optional(),
    voiceOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported text messages.").optional(),
    }).describe("Options for Voice exports.").optional(),
  }).describe("Additional export options.").optional(),
  matterId: z.string().describe("Output only. The matter ID.").optional(),
  name: z.string().describe(
    "The export name. Don't use special characters (~!$'(),;@:/?) in the name, they can prevent you from downloading exports.",
  ).optional(),
  query: z.object({
    accountInfo: z.object({
      emails: z.array(z.string()).describe("A set of accounts to search.")
        .optional(),
    }).describe("Required when **SearchMethod** is **ACCOUNT**.").optional(),
    calendarOptions: z.object({
      locationQuery: z.array(z.string()).describe(
        'Matches only those events whose location contains all of the words in the given set. If the string contains quoted phrases, this method only matches those events whose location contain the exact phrase. Entries in the set are considered in "and". Word splitting example: ["New Zealand"] vs ["New","Zealand"] "New Zealand": matched by both "New and better Zealand": only matched by the later',
      ).optional(),
      minusWords: z.array(z.string()).describe(
        'Matches only those events that do not contain any of the words in the given set in title, description, location, or attendees. Entries in the set are considered in "or".',
      ).optional(),
      peopleQuery: z.array(z.string()).describe(
        'Matches only those events whose attendees contain all of the words in the given set. Entries in the set are considered in "and".',
      ).optional(),
      responseStatuses: z.array(
        z.enum([
          "ATTENDEE_RESPONSE_UNSPECIFIED",
          "ATTENDEE_RESPONSE_NEEDS_ACTION",
          "ATTENDEE_RESPONSE_ACCEPTED",
          "ATTENDEE_RESPONSE_DECLINED",
          "ATTENDEE_RESPONSE_TENTATIVE",
        ]),
      ).describe(
        "Matches only events for which the custodian gave one of these responses. If the set is empty or contains ATTENDEE_RESPONSE_UNSPECIFIED there will be no filtering on responses.",
      ).optional(),
      versionDate: z.string().describe(
        "Search the current version of the Calendar event, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC.",
      ).optional(),
    }).describe("Set Calendar search-specific options.").optional(),
    corpus: z.enum([
      "CORPUS_TYPE_UNSPECIFIED",
      "DRIVE",
      "MAIL",
      "GROUPS",
      "HANGOUTS_CHAT",
      "VOICE",
      "CALENDAR",
      "GEMINI",
    ]).describe("The Google Workspace service to search.").optional(),
    dataScope: z.enum([
      "DATA_SCOPE_UNSPECIFIED",
      "ALL_DATA",
      "HELD_DATA",
      "UNPROCESSED_DATA",
    ]).describe("The data source to search.").optional(),
    driveDocumentInfo: z.object({
      documentIds: z.object({
        ids: z.array(z.string()).describe(
          "Required. A list of Drive document IDs.",
        ).optional(),
      }).describe("Specify Drive documents by document ID.").optional(),
    }).describe("Required when **SearchMethod** is **DRIVE_DOCUMENT**.")
      .optional(),
    driveOptions: z.object({
      clientSideEncryptedOption: z.enum([
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ANY",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED",
      ]).describe(
        "Set whether the results include only content encrypted with [Google Workspace Client-side encryption](https://support.google.com/a?p=cse_ov) content, only unencrypted content, or both. Defaults to both. Currently supported for Drive.",
      ).optional(),
      includeSharedDrives: z.boolean().describe(
        "Set to **true** to include shared drives.",
      ).optional(),
      includeTeamDrives: z.boolean().describe(
        "Set to true to include Team Drive.",
      ).optional(),
      sharedDrivesOption: z.enum([
        "SHARED_DRIVES_OPTION_UNSPECIFIED",
        "NOT_INCLUDED",
        "INCLUDED_IF_ACCOUNT_IS_NOT_A_MEMBER",
        "INCLUDED",
      ]).describe(
        "Optional. Options to include or exclude documents in shared drives. We recommend using this field over include_shared_drives. This field overrides include_shared_drives and include_team_drives when set.",
      ).optional(),
      versionDate: z.string().describe(
        "Search the current version of the Drive file, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC.",
      ).optional(),
    }).describe("Set Drive search-specific options.").optional(),
    endTime: z.string().describe(
      "The end time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    geminiOptions: z.object({}).describe("Set Gemini search-specific options.")
      .optional(),
    hangoutsChatInfo: z.object({
      roomId: z.array(z.string()).describe(
        "A list of Chat spaces IDs, as provided by the [Chat API](https://developers.google.com/workspace/chat). There is a limit of exporting from 500 Chat spaces per request.",
      ).optional(),
    }).describe("Required when **SearchMethod** is **ROOM**. (read-only)")
      .optional(),
    hangoutsChatOptions: z.object({
      includeRooms: z.boolean().describe(
        "For searches by account or organizational unit, set to **true** to include rooms.",
      ).optional(),
    }).describe("Set Chat search-specific options. (read-only)").optional(),
    mailOptions: z.object({
      clientSideEncryptedOption: z.enum([
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ANY",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED",
      ]).describe(
        "Specifies whether the results should include encrypted content, unencrypted content, or both. Defaults to including both.",
      ).optional(),
      excludeDrafts: z.boolean().describe("Set to **true** to exclude drafts.")
        .optional(),
    }).describe("Set Gmail search-specific options.").optional(),
    method: z.enum([
      "SEARCH_METHOD_UNSPECIFIED",
      "ACCOUNT",
      "ORG_UNIT",
      "TEAM_DRIVE",
      "ENTIRE_ORG",
      "ROOM",
      "SITES_URL",
      "SHARED_DRIVE",
      "DRIVE_DOCUMENT",
    ]).describe(
      "The entity to search. This field replaces **searchMethod** to support shared drives. When **searchMethod** is **TEAM_DRIVE**, the response of this field is **SHARED_DRIVE**.",
    ).optional(),
    orgUnitInfo: z.object({
      orgUnitId: z.string().describe(
        "The name of the organizational unit to search, as provided by the [Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **ORG_UNIT**.").optional(),
    searchMethod: z.enum([
      "SEARCH_METHOD_UNSPECIFIED",
      "ACCOUNT",
      "ORG_UNIT",
      "TEAM_DRIVE",
      "ENTIRE_ORG",
      "ROOM",
      "SITES_URL",
      "SHARED_DRIVE",
      "DRIVE_DOCUMENT",
    ]).describe("The search method to use.").optional(),
    sharedDriveInfo: z.object({
      sharedDriveIds: z.array(z.string()).describe(
        "A list of shared drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **SHARED_DRIVE**.")
      .optional(),
    sitesUrlInfo: z.object({
      urls: z.array(z.string()).describe("A list of published site URLs.")
        .optional(),
    }).describe("Required when **SearchMethod** is **SITES_URL**.").optional(),
    startTime: z.string().describe(
      "The start time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    teamDriveInfo: z.object({
      teamDriveIds: z.array(z.string()).describe(
        "List of Team Drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **TEAM_DRIVE**.").optional(),
    terms: z.string().describe(
      "Service-specific [search operators](https://support.google.com/vault/answer/2474474) to filter search results.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone name. It should be an IANA TZ name, such as "America/Los_Angeles". For a list of time zone names, see [Time Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For more information about how Vault uses time zones, see [the Vault help center](https://support.google.com/vault/answer/6092995#time).',
    ).optional(),
    voiceOptions: z.object({
      coveredData: z.array(
        z.enum([
          "COVERED_DATA_UNSPECIFIED",
          "TEXT_MESSAGES",
          "VOICEMAILS",
          "CALL_LOGS",
        ]),
      ).describe("Datatypes to search").optional(),
    }).describe("Set Voice search-specific options.").optional(),
  }).describe("The query parameters used to create the export.").optional(),
});

const StateSchema = z.object({
  cloudStorageSink: z.object({
    files: z.array(z.object({
      bucketName: z.string(),
      md5Hash: z.string(),
      objectName: z.string(),
      size: z.string(),
    })),
  }).optional(),
  createTime: z.string().optional(),
  exportOptions: z.object({
    calendarOptions: z.object({
      exportFormat: z.string(),
    }),
    driveOptions: z.object({
      includeAccessInfo: z.boolean(),
    }),
    geminiOptions: z.object({
      exportFormat: z.string(),
    }),
    groupsOptions: z.object({
      exportFormat: z.string(),
    }),
    hangoutsChatOptions: z.object({
      exportFormat: z.string(),
    }),
    mailOptions: z.object({
      exportFormat: z.string(),
      exportLinkedDriveFiles: z.boolean(),
      showConfidentialModeContent: z.boolean(),
      useNewExport: z.boolean(),
    }),
    region: z.string(),
    voiceOptions: z.object({
      exportFormat: z.string(),
    }),
  }).optional(),
  id: z.string().optional(),
  matterId: z.string().optional(),
  name: z.string(),
  parentExportId: z.string().optional(),
  query: z.object({
    accountInfo: z.object({
      emails: z.array(z.string()),
    }),
    calendarOptions: z.object({
      locationQuery: z.array(z.string()),
      minusWords: z.array(z.string()),
      peopleQuery: z.array(z.string()),
      responseStatuses: z.array(z.string()),
      versionDate: z.string(),
    }),
    corpus: z.string(),
    dataScope: z.string(),
    driveDocumentInfo: z.object({
      documentIds: z.object({
        ids: z.array(z.string()),
      }),
    }),
    driveOptions: z.object({
      clientSideEncryptedOption: z.string(),
      includeSharedDrives: z.boolean(),
      includeTeamDrives: z.boolean(),
      sharedDrivesOption: z.string(),
      versionDate: z.string(),
    }),
    endTime: z.string(),
    geminiOptions: z.object({}),
    hangoutsChatInfo: z.object({
      roomId: z.array(z.string()),
    }),
    hangoutsChatOptions: z.object({
      includeRooms: z.boolean(),
    }),
    mailOptions: z.object({
      clientSideEncryptedOption: z.string(),
      excludeDrafts: z.boolean(),
    }),
    method: z.string(),
    orgUnitInfo: z.object({
      orgUnitId: z.string(),
    }),
    searchMethod: z.string(),
    sharedDriveInfo: z.object({
      sharedDriveIds: z.array(z.string()),
    }),
    sitesUrlInfo: z.object({
      urls: z.array(z.string()),
    }),
    startTime: z.string(),
    teamDriveInfo: z.object({
      teamDriveIds: z.array(z.string()),
    }),
    terms: z.string(),
    timeZone: z.string(),
    voiceOptions: z.object({
      coveredData: z.array(z.string()),
    }),
  }).optional(),
  requester: z.object({
    displayName: z.string(),
    email: z.string(),
  }).optional(),
  stats: z.object({
    exportedArtifactCount: z.string(),
    sizeInBytes: z.string(),
    totalArtifactCount: z.string(),
  }).optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  exportOptions: z.object({
    calendarOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported text messages.").optional(),
    }).describe("Option available for Calendar export.").optional(),
    driveOptions: z.object({
      includeAccessInfo: z.boolean().describe(
        "To include access level information for users with [indirect access](https://support.google.com/vault/answer/6099459#metadata) to files, set to **true**.",
      ).optional(),
    }).describe("Options for Drive exports.").optional(),
    geminiOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Option available for Gemini export.").optional(),
    groupsOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Options for Groups exports.").optional(),
    hangoutsChatOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
    }).describe("Options for Chat exports.").optional(),
    mailOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported messages.").optional(),
      exportLinkedDriveFiles: z.boolean().describe(
        "Optional. To enable exporting linked Drive files, set to **true**.",
      ).optional(),
      showConfidentialModeContent: z.boolean().describe(
        "To export confidential mode content, set to **true**.",
      ).optional(),
      useNewExport: z.boolean().describe(
        "To use the new export system, set to **true**.",
      ).optional(),
    }).describe("Options for Gmail exports.").optional(),
    region: z.enum(["EXPORT_REGION_UNSPECIFIED", "ANY", "US", "EUROPE"])
      .describe("The requested data region for the export.").optional(),
    voiceOptions: z.object({
      exportFormat: z.enum([
        "EXPORT_FORMAT_UNSPECIFIED",
        "MBOX",
        "PST",
        "ICS",
        "XML",
        "JSON",
      ]).describe("The file format for exported text messages.").optional(),
    }).describe("Options for Voice exports.").optional(),
  }).describe("Additional export options.").optional(),
  matterId: z.string().describe("Output only. The matter ID.").optional(),
  name: z.string().describe(
    "The export name. Don't use special characters (~!$'(),;@:/?) in the name, they can prevent you from downloading exports.",
  ).optional(),
  query: z.object({
    accountInfo: z.object({
      emails: z.array(z.string()).describe("A set of accounts to search.")
        .optional(),
    }).describe("Required when **SearchMethod** is **ACCOUNT**.").optional(),
    calendarOptions: z.object({
      locationQuery: z.array(z.string()).describe(
        'Matches only those events whose location contains all of the words in the given set. If the string contains quoted phrases, this method only matches those events whose location contain the exact phrase. Entries in the set are considered in "and". Word splitting example: ["New Zealand"] vs ["New","Zealand"] "New Zealand": matched by both "New and better Zealand": only matched by the later',
      ).optional(),
      minusWords: z.array(z.string()).describe(
        'Matches only those events that do not contain any of the words in the given set in title, description, location, or attendees. Entries in the set are considered in "or".',
      ).optional(),
      peopleQuery: z.array(z.string()).describe(
        'Matches only those events whose attendees contain all of the words in the given set. Entries in the set are considered in "and".',
      ).optional(),
      responseStatuses: z.array(
        z.enum([
          "ATTENDEE_RESPONSE_UNSPECIFIED",
          "ATTENDEE_RESPONSE_NEEDS_ACTION",
          "ATTENDEE_RESPONSE_ACCEPTED",
          "ATTENDEE_RESPONSE_DECLINED",
          "ATTENDEE_RESPONSE_TENTATIVE",
        ]),
      ).describe(
        "Matches only events for which the custodian gave one of these responses. If the set is empty or contains ATTENDEE_RESPONSE_UNSPECIFIED there will be no filtering on responses.",
      ).optional(),
      versionDate: z.string().describe(
        "Search the current version of the Calendar event, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC.",
      ).optional(),
    }).describe("Set Calendar search-specific options.").optional(),
    corpus: z.enum([
      "CORPUS_TYPE_UNSPECIFIED",
      "DRIVE",
      "MAIL",
      "GROUPS",
      "HANGOUTS_CHAT",
      "VOICE",
      "CALENDAR",
      "GEMINI",
    ]).describe("The Google Workspace service to search.").optional(),
    dataScope: z.enum([
      "DATA_SCOPE_UNSPECIFIED",
      "ALL_DATA",
      "HELD_DATA",
      "UNPROCESSED_DATA",
    ]).describe("The data source to search.").optional(),
    driveDocumentInfo: z.object({
      documentIds: z.object({
        ids: z.array(z.string()).describe(
          "Required. A list of Drive document IDs.",
        ).optional(),
      }).describe("Specify Drive documents by document ID.").optional(),
    }).describe("Required when **SearchMethod** is **DRIVE_DOCUMENT**.")
      .optional(),
    driveOptions: z.object({
      clientSideEncryptedOption: z.enum([
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ANY",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED",
      ]).describe(
        "Set whether the results include only content encrypted with [Google Workspace Client-side encryption](https://support.google.com/a?p=cse_ov) content, only unencrypted content, or both. Defaults to both. Currently supported for Drive.",
      ).optional(),
      includeSharedDrives: z.boolean().describe(
        "Set to **true** to include shared drives.",
      ).optional(),
      includeTeamDrives: z.boolean().describe(
        "Set to true to include Team Drive.",
      ).optional(),
      sharedDrivesOption: z.enum([
        "SHARED_DRIVES_OPTION_UNSPECIFIED",
        "NOT_INCLUDED",
        "INCLUDED_IF_ACCOUNT_IS_NOT_A_MEMBER",
        "INCLUDED",
      ]).describe(
        "Optional. Options to include or exclude documents in shared drives. We recommend using this field over include_shared_drives. This field overrides include_shared_drives and include_team_drives when set.",
      ).optional(),
      versionDate: z.string().describe(
        "Search the current version of the Drive file, but export the contents of the last version saved before 12:00 AM UTC on the specified date. Enter the date in UTC.",
      ).optional(),
    }).describe("Set Drive search-specific options.").optional(),
    endTime: z.string().describe(
      "The end time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    geminiOptions: z.object({}).describe("Set Gemini search-specific options.")
      .optional(),
    hangoutsChatInfo: z.object({
      roomId: z.array(z.string()).describe(
        "A list of Chat spaces IDs, as provided by the [Chat API](https://developers.google.com/workspace/chat). There is a limit of exporting from 500 Chat spaces per request.",
      ).optional(),
    }).describe("Required when **SearchMethod** is **ROOM**. (read-only)")
      .optional(),
    hangoutsChatOptions: z.object({
      includeRooms: z.boolean().describe(
        "For searches by account or organizational unit, set to **true** to include rooms.",
      ).optional(),
    }).describe("Set Chat search-specific options. (read-only)").optional(),
    mailOptions: z.object({
      clientSideEncryptedOption: z.enum([
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ANY",
        "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED",
        "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED",
      ]).describe(
        "Specifies whether the results should include encrypted content, unencrypted content, or both. Defaults to including both.",
      ).optional(),
      excludeDrafts: z.boolean().describe("Set to **true** to exclude drafts.")
        .optional(),
    }).describe("Set Gmail search-specific options.").optional(),
    method: z.enum([
      "SEARCH_METHOD_UNSPECIFIED",
      "ACCOUNT",
      "ORG_UNIT",
      "TEAM_DRIVE",
      "ENTIRE_ORG",
      "ROOM",
      "SITES_URL",
      "SHARED_DRIVE",
      "DRIVE_DOCUMENT",
    ]).describe(
      "The entity to search. This field replaces **searchMethod** to support shared drives. When **searchMethod** is **TEAM_DRIVE**, the response of this field is **SHARED_DRIVE**.",
    ).optional(),
    orgUnitInfo: z.object({
      orgUnitId: z.string().describe(
        "The name of the organizational unit to search, as provided by the [Admin SDK Directory API](https://developers.google.com/admin-sdk/directory/).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **ORG_UNIT**.").optional(),
    searchMethod: z.enum([
      "SEARCH_METHOD_UNSPECIFIED",
      "ACCOUNT",
      "ORG_UNIT",
      "TEAM_DRIVE",
      "ENTIRE_ORG",
      "ROOM",
      "SITES_URL",
      "SHARED_DRIVE",
      "DRIVE_DOCUMENT",
    ]).describe("The search method to use.").optional(),
    sharedDriveInfo: z.object({
      sharedDriveIds: z.array(z.string()).describe(
        "A list of shared drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **SHARED_DRIVE**.")
      .optional(),
    sitesUrlInfo: z.object({
      urls: z.array(z.string()).describe("A list of published site URLs.")
        .optional(),
    }).describe("Required when **SearchMethod** is **SITES_URL**.").optional(),
    startTime: z.string().describe(
      "The start time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    teamDriveInfo: z.object({
      teamDriveIds: z.array(z.string()).describe(
        "List of Team Drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Required when **SearchMethod** is **TEAM_DRIVE**.").optional(),
    terms: z.string().describe(
      "Service-specific [search operators](https://support.google.com/vault/answer/2474474) to filter search results.",
    ).optional(),
    timeZone: z.string().describe(
      'The time zone name. It should be an IANA TZ name, such as "America/Los_Angeles". For a list of time zone names, see [Time Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For more information about how Vault uses time zones, see [the Vault help center](https://support.google.com/vault/answer/6092995#time).',
    ).optional(),
    voiceOptions: z.object({
      coveredData: z.array(
        z.enum([
          "COVERED_DATA_UNSPECIFIED",
          "TEXT_MESSAGES",
          "VOICEMAILS",
          "CALL_LOGS",
        ]),
      ).describe("Datatypes to search").optional(),
    }).describe("Set Voice search-specific options.").optional(),
  }).describe("The query parameters used to create the export.").optional(),
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

/** Swamp extension model for Google Cloud Google Vault Matters.Exports. Registered at `@swamp/gcp/vault/matters-exports`. */
export const model = {
  type: "@swamp/gcp/vault/matters-exports",
  version: "2026.10.06.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.01.1",
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
      toVersion: "2026.07.17.1",
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
      description: "Removed: cloudStorageSink, requester, stats",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          cloudStorageSink: _cloudStorageSink,
          requester: _requester,
          stats: _stats,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.07.21.4",
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
        "An export. To work with Vault resources, the account must have the [required ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a exports",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["exportOptions"] !== undefined) {
          body["exportOptions"] = g["exportOptions"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["query"] !== undefined) body["query"] = g["query"];
        if (g["name"] !== undefined) params["exportId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["COMPLETED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "matterId": String(g["matterId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a exports",
      arguments: z.object({
        identifier: z.string().describe("The name of the exports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["exportId"] = args.identifier;
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
    delete: {
      description: "Delete the exports",
      arguments: z.object({
        identifier: z.string().describe("The name of the exports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["exportId"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync exports state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific exports by name (e.g. one discovered by list)",
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
          if (g["matterId"] !== undefined) {
            params["matterId"] = String(g["matterId"]);
          } else if (existing["matterId"]) {
            params["matterId"] = String(existing["matterId"]);
          }
          const identifier = existing["id"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["exportId"] = identifier;
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
    list: {
      description: "List exports resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The number of exports to return in the response.",
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
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "exports",
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
