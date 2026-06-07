// Auto-generated extension model for @swamp/gcp/vault/matters-savedqueries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Vault Matters.SavedQueries.
 *
 * The definition of a saved query. To work with Vault resources, the account must have the [required Vault privileges](https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege.
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
  "id": "vault.matters.savedQueries.get",
  "path": "v1/matters/{matterId}/savedQueries/{savedQueryId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
    "savedQueryId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
    "savedQueryId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "vault.matters.savedQueries.create",
  "path": "v1/matters/{matterId}/savedQueries",
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
  "id": "vault.matters.savedQueries.delete",
  "path": "v1/matters/{matterId}/savedQueries/{savedQueryId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "matterId",
    "savedQueryId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
    "savedQueryId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "vault.matters.savedQueries.list",
  "path": "v1/matters/{matterId}/savedQueries",
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
  displayName: z.string().describe("The name of the saved query.").optional(),
  matterId: z.string().describe(
    "Output only. The matter ID of the matter the saved query is saved in. The server does not use this field during create and always uses matter ID in the URL.",
  ).optional(),
  query: z.object({
    accountInfo: z.object({
      emails: z.array(z.string()).describe("A set of accounts to search.")
        .optional(),
    }).describe("The accounts to search").optional(),
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
    }).describe("Additional options for Calendar search").optional(),
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
    }).describe("The Drive documents to search.").optional(),
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
    }).describe("Additional options for Drive search.").optional(),
    endTime: z.string().describe(
      "The end time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    geminiOptions: z.object({}).describe("Additional options for Gemini search")
      .optional(),
    hangoutsChatInfo: z.object({
      roomId: z.array(z.string()).describe(
        "A list of Chat spaces IDs, as provided by the [Chat API](https://developers.google.com/workspace/chat). There is a limit of exporting from 500 Chat spaces per request.",
      ).optional(),
    }).describe("The Chat spaces to search").optional(),
    hangoutsChatOptions: z.object({
      includeRooms: z.boolean().describe(
        "For searches by account or organizational unit, set to **true** to include rooms.",
      ).optional(),
    }).describe("Additional options for Google Chat search").optional(),
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
    }).describe("Additional options for Gmail search").optional(),
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
    }).describe("The organizational unit to search").optional(),
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
    }).describe("The shared drives to search").optional(),
    sitesUrlInfo: z.object({
      urls: z.array(z.string()).describe("A list of published site URLs.")
        .optional(),
    }).describe("The published site URLs of new Google Sites to search")
      .optional(),
    startTime: z.string().describe(
      "The start time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    teamDriveInfo: z.object({
      teamDriveIds: z.array(z.string()).describe(
        "List of Team Drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Team Drives to search").optional(),
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
    }).describe("Additional options for Voice search").optional(),
  }).describe("The query definition used for search and export.").optional(),
  savedQueryId: z.string().describe("A unique identifier for the saved query.")
    .optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  matterId: z.string().optional(),
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
  savedQueryId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe("The name of the saved query.").optional(),
  matterId: z.string().describe(
    "Output only. The matter ID of the matter the saved query is saved in. The server does not use this field during create and always uses matter ID in the URL.",
  ).optional(),
  query: z.object({
    accountInfo: z.object({
      emails: z.array(z.string()).describe("A set of accounts to search.")
        .optional(),
    }).describe("The accounts to search").optional(),
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
    }).describe("Additional options for Calendar search").optional(),
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
    }).describe("The Drive documents to search.").optional(),
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
    }).describe("Additional options for Drive search.").optional(),
    endTime: z.string().describe(
      "The end time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    geminiOptions: z.object({}).describe("Additional options for Gemini search")
      .optional(),
    hangoutsChatInfo: z.object({
      roomId: z.array(z.string()).describe(
        "A list of Chat spaces IDs, as provided by the [Chat API](https://developers.google.com/workspace/chat). There is a limit of exporting from 500 Chat spaces per request.",
      ).optional(),
    }).describe("The Chat spaces to search").optional(),
    hangoutsChatOptions: z.object({
      includeRooms: z.boolean().describe(
        "For searches by account or organizational unit, set to **true** to include rooms.",
      ).optional(),
    }).describe("Additional options for Google Chat search").optional(),
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
    }).describe("Additional options for Gmail search").optional(),
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
    }).describe("The organizational unit to search").optional(),
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
    }).describe("The shared drives to search").optional(),
    sitesUrlInfo: z.object({
      urls: z.array(z.string()).describe("A list of published site URLs.")
        .optional(),
    }).describe("The published site URLs of new Google Sites to search")
      .optional(),
    startTime: z.string().describe(
      "The start time for the search query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
    ).optional(),
    teamDriveInfo: z.object({
      teamDriveIds: z.array(z.string()).describe(
        "List of Team Drive IDs, as provided by the [Drive API](https://developers.google.com/drive).",
      ).optional(),
    }).describe("Team Drives to search").optional(),
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
    }).describe("Additional options for Voice search").optional(),
  }).describe("The query definition used for search and export.").optional(),
  savedQueryId: z.string().describe("A unique identifier for the saved query.")
    .optional(),
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

/** Swamp extension model for Google Cloud Google Vault Matters.SavedQueries. Registered at `@swamp/gcp/vault/matters-savedqueries`. */
export const model = {
  type: "@swamp/gcp/vault/matters-savedqueries",
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
        "The definition of a saved query. To work with Vault resources, the account mu...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a savedQueries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["query"] !== undefined) body["query"] = g["query"];
        if (g["savedQueryId"] !== undefined) {
          body["savedQueryId"] = g["savedQueryId"];
        }
        if (g["name"] !== undefined) params["savedQueryId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "matterId": String(g["matterId"] ?? "") },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a savedQueries",
      arguments: z.object({
        identifier: z.string().describe("The name of the savedQueries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["savedQueryId"] = args.identifier;
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
    delete: {
      description: "Delete the savedQueries",
      arguments: z.object({
        identifier: z.string().describe("The name of the savedQueries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["savedQueryId"] = args.identifier;
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
      description: "Sync savedQueries state from GCP",
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
          if (g["matterId"] !== undefined) {
            params["matterId"] = String(g["matterId"]);
          } else if (existing["matterId"]) {
            params["matterId"] = String(existing["matterId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["savedQueryId"] = identifier;
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
      description: "List savedQueries resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of saved queries to return.",
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
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "savedQueries",
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
