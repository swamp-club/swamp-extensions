// Auto-generated extension model for @swamp/gcp/datamanager/accounttypes-accounts-userlists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Manager AccountTypes.Accounts.UserLists.
 *
 * A user list resource.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/userLists/${shortName}`;
}

const BASE_URL = "https://datamanager.googleapis.com/";

const GET_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userLists.get",
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

const INSERT_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userLists.create",
  "path": "v1/{+parent}/userLists",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userLists.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userLists.delete",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userLists.list",
  "path": "v1/{+parent}/userLists",
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
  accountAccessStatus: z.enum([
    "ACCESS_STATUS_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe(
    "Optional. Indicates if this share is still enabled. When a user list is shared with the account this field is set to `ENABLED`. Later the user list owner can decide to revoke the share and make it `DISABLED`.",
  ).optional(),
  description: z.string().describe("Optional. A description of the user list.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the user list.",
  ).optional(),
  ingestedUserListInfo: z.object({
    contactIdInfo: z.object({
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data").optional(),
      matchRatePercentage: z.number().int().describe(
        "Output only. Match rate for customer match user lists.",
      ).optional(),
    }).describe(
      "Additional information when `CONTACT_ID` is one of the `upload_key_types`.",
    ).optional(),
    mobileIdInfo: z.object({
      appId: z.string().describe(
        "Required. Immutable. A string that uniquely identifies a mobile application from which the data was collected.",
      ).optional(),
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data.").optional(),
      keySpace: z.enum(["KEY_SPACE_UNSPECIFIED", "IOS", "ANDROID"]).describe(
        "Required. Immutable. The key space of mobile IDs.",
      ).optional(),
    }).describe(
      "Additional information when `MOBILE_ID` is one of the `upload_key_types`.",
    ).optional(),
    pairIdInfo: z.object({
      advertiserIdentifierCount: z.string().describe(
        "Optional. The count of the advertiser's first party data records that have been uploaded to a clean room provider. This does not signify the size of a PAIR user list.",
      ).optional(),
      cleanRoomIdentifier: z.string().describe(
        "Required. Immutable. Identifies a unique advertiser to publisher relationship with one clean room provider or across multiple clean room providers.",
      ).optional(),
      matchRatePercentage: z.number().int().describe(
        "Required. This field denotes the percentage of membership match of this user list with the corresponding publisher's first party data. Must be between 0 and 100 inclusive.",
      ).optional(),
      publisherId: z.string().describe(
        "Required. Immutable. Identifies the publisher that the Publisher Advertiser Identity Reconciliation user list is reconciled with. This field is provided by the cleanroom provider and is only unique in the scope of that cleanroom. This cannot be used as a global identifier across multiple cleanrooms.",
      ).optional(),
      publisherName: z.string().describe(
        "Required. Descriptive name of the publisher to be displayed in the UI for a better targeting experience.",
      ).optional(),
    }).describe(
      "Additional information when `PAIR_ID` is one of the `upload_key_types`. This feature is only available to data partners.",
    ).optional(),
    partnerAudienceInfo: z.object({
      commercePartner: z.string().describe(
        "Optional. The commerce partner name. Only allowed if `partner_audience_source` is `COMMERCE_AUDIENCE`.",
      ).optional(),
      partnerAudienceSource: z.enum([
        "PARTNER_AUDIENCE_SOURCE_UNSPECIFIED",
        "COMMERCE_AUDIENCE",
        "LINEAR_TV_AUDIENCE",
        "AGENCY_PROVIDER_AUDIENCE",
      ]).describe("Required. Immutable. The source of the partner audience.")
        .optional(),
    }).describe(
      "Additional information for partner audiences. This feature is only available to data partners.",
    ).optional(),
    pseudonymousIdInfo: z.object({
      billableRecordCount: z.string().describe(
        "Optional. Immutable. The number of billable records (e.g. uploaded or matched).",
      ).optional(),
      syncStatus: z.enum([
        "SYNC_STATUS_UNSPECIFIED",
        "CREATED",
        "READY_FOR_USE",
        "FAILED",
      ]).describe("Output only. Sync status of the user list.").optional(),
    }).describe(
      "Additional information when `PSEUDONYMOUS_ID` is one of the `upload_key_types`.",
    ).optional(),
    uploadKeyTypes: z.array(
      z.enum([
        "UPLOAD_KEY_TYPE_UNSPECIFIED",
        "CONTACT_ID",
        "MOBILE_ID",
        "USER_ID",
        "PAIR_ID",
        "PSEUDONYMOUS_ID",
      ]),
    ).describe("Required. Immutable. Upload key types of this user list.")
      .optional(),
    userIdInfo: z.object({
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data.").optional(),
    }).describe(
      "Additional information when `USER_ID` is one of the `upload_key_types`.",
    ).optional(),
  }).describe("Represents a user list that is populated by user provided data.")
    .optional(),
  integrationCode: z.string().describe(
    "Optional. An ID from external system. It is used by user list sellers to correlate IDs on their systems.",
  ).optional(),
  membershipDuration: z.string().describe(
    "Optional. The duration a user remains in the user list. Valid durations are exact multiples of 24 hours (86400 seconds). Providing a value that is not an exact multiple of 24 hours will result in an INVALID_ARGUMENT error.",
  ).optional(),
  membershipStatus: z.enum(["MEMBERSHIP_STATUS_UNSPECIFIED", "OPEN", "CLOSED"])
    .describe("Optional. Membership status of this user list.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the user list. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list}",
  ).optional(),
  sizeInfo: z.object({
    displayNetworkMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list, on the Google Display Network.",
    ).optional(),
    gmailMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list on Gmail.",
    ).optional(),
    searchNetworkMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list in the google.com domain. These are the members available for targeting in Search campaigns.",
    ).optional(),
    youtubeMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list on YouTube.",
    ).optional(),
  }).describe(
    "Estimated number of members in this user list in different target networks.",
  ).optional(),
  targetNetworkInfo: z.object({
    eligibleForDisplay: z.boolean().describe(
      "Output only. Indicates this user list is eligible for Google Display Network.",
    ).optional(),
    eligibleForSearch: z.boolean().describe(
      "Optional. Indicates if this user list is eligible for Google Search Network.",
    ).optional(),
  }).describe("Eligibility information for different target networks.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessReason: z.string().optional(),
  accountAccessStatus: z.string().optional(),
  closingReason: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  id: z.string().optional(),
  ingestedUserListInfo: z.object({
    contactIdInfo: z.object({
      dataSourceType: z.string(),
      matchRatePercentage: z.number(),
    }),
    mobileIdInfo: z.object({
      appId: z.string(),
      dataSourceType: z.string(),
      keySpace: z.string(),
    }),
    pairIdInfo: z.object({
      advertiserIdentifierCount: z.string(),
      cleanRoomIdentifier: z.string(),
      matchRatePercentage: z.number(),
      publisherId: z.string(),
      publisherName: z.string(),
    }),
    partnerAudienceInfo: z.object({
      commercePartner: z.string(),
      partnerAudienceSource: z.string(),
    }),
    pseudonymousIdInfo: z.object({
      billableRecordCount: z.string(),
      syncStatus: z.string(),
    }),
    uploadKeyTypes: z.array(z.string()),
    userIdInfo: z.object({
      dataSourceType: z.string(),
    }),
  }).optional(),
  integrationCode: z.string().optional(),
  membershipDuration: z.string().optional(),
  membershipStatus: z.string().optional(),
  name: z.string(),
  readOnly: z.boolean().optional(),
  sizeInfo: z.object({
    displayNetworkMembersCount: z.string(),
    gmailMembersCount: z.string(),
    searchNetworkMembersCount: z.string(),
    youtubeMembersCount: z.string(),
  }).optional(),
  targetNetworkInfo: z.object({
    eligibleForDisplay: z.boolean(),
    eligibleForSearch: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountAccessStatus: z.enum([
    "ACCESS_STATUS_UNSPECIFIED",
    "ENABLED",
    "DISABLED",
  ]).describe(
    "Optional. Indicates if this share is still enabled. When a user list is shared with the account this field is set to `ENABLED`. Later the user list owner can decide to revoke the share and make it `DISABLED`.",
  ).optional(),
  description: z.string().describe("Optional. A description of the user list.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the user list.",
  ).optional(),
  ingestedUserListInfo: z.object({
    contactIdInfo: z.object({
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data").optional(),
      matchRatePercentage: z.number().int().describe(
        "Output only. Match rate for customer match user lists.",
      ).optional(),
    }).describe(
      "Additional information when `CONTACT_ID` is one of the `upload_key_types`.",
    ).optional(),
    mobileIdInfo: z.object({
      appId: z.string().describe(
        "Required. Immutable. A string that uniquely identifies a mobile application from which the data was collected.",
      ).optional(),
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data.").optional(),
      keySpace: z.enum(["KEY_SPACE_UNSPECIFIED", "IOS", "ANDROID"]).describe(
        "Required. Immutable. The key space of mobile IDs.",
      ).optional(),
    }).describe(
      "Additional information when `MOBILE_ID` is one of the `upload_key_types`.",
    ).optional(),
    pairIdInfo: z.object({
      advertiserIdentifierCount: z.string().describe(
        "Optional. The count of the advertiser's first party data records that have been uploaded to a clean room provider. This does not signify the size of a PAIR user list.",
      ).optional(),
      cleanRoomIdentifier: z.string().describe(
        "Required. Immutable. Identifies a unique advertiser to publisher relationship with one clean room provider or across multiple clean room providers.",
      ).optional(),
      matchRatePercentage: z.number().int().describe(
        "Required. This field denotes the percentage of membership match of this user list with the corresponding publisher's first party data. Must be between 0 and 100 inclusive.",
      ).optional(),
      publisherId: z.string().describe(
        "Required. Immutable. Identifies the publisher that the Publisher Advertiser Identity Reconciliation user list is reconciled with. This field is provided by the cleanroom provider and is only unique in the scope of that cleanroom. This cannot be used as a global identifier across multiple cleanrooms.",
      ).optional(),
      publisherName: z.string().describe(
        "Required. Descriptive name of the publisher to be displayed in the UI for a better targeting experience.",
      ).optional(),
    }).describe(
      "Additional information when `PAIR_ID` is one of the `upload_key_types`. This feature is only available to data partners.",
    ).optional(),
    partnerAudienceInfo: z.object({
      commercePartner: z.string().describe(
        "Optional. The commerce partner name. Only allowed if `partner_audience_source` is `COMMERCE_AUDIENCE`.",
      ).optional(),
      partnerAudienceSource: z.enum([
        "PARTNER_AUDIENCE_SOURCE_UNSPECIFIED",
        "COMMERCE_AUDIENCE",
        "LINEAR_TV_AUDIENCE",
        "AGENCY_PROVIDER_AUDIENCE",
      ]).describe("Required. Immutable. The source of the partner audience.")
        .optional(),
    }).describe(
      "Additional information for partner audiences. This feature is only available to data partners.",
    ).optional(),
    pseudonymousIdInfo: z.object({
      billableRecordCount: z.string().describe(
        "Optional. Immutable. The number of billable records (e.g. uploaded or matched).",
      ).optional(),
      syncStatus: z.enum([
        "SYNC_STATUS_UNSPECIFIED",
        "CREATED",
        "READY_FOR_USE",
        "FAILED",
      ]).describe("Output only. Sync status of the user list.").optional(),
    }).describe(
      "Additional information when `PSEUDONYMOUS_ID` is one of the `upload_key_types`.",
    ).optional(),
    uploadKeyTypes: z.array(
      z.enum([
        "UPLOAD_KEY_TYPE_UNSPECIFIED",
        "CONTACT_ID",
        "MOBILE_ID",
        "USER_ID",
        "PAIR_ID",
        "PSEUDONYMOUS_ID",
      ]),
    ).describe("Required. Immutable. Upload key types of this user list.")
      .optional(),
    userIdInfo: z.object({
      dataSourceType: z.enum([
        "DATA_SOURCE_TYPE_UNSPECIFIED",
        "DATA_SOURCE_TYPE_FIRST_PARTY",
        "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU",
        "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE",
        "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA",
      ]).describe("Optional. Immutable. Source of the upload data.").optional(),
    }).describe(
      "Additional information when `USER_ID` is one of the `upload_key_types`.",
    ).optional(),
  }).describe("Represents a user list that is populated by user provided data.")
    .optional(),
  integrationCode: z.string().describe(
    "Optional. An ID from external system. It is used by user list sellers to correlate IDs on their systems.",
  ).optional(),
  membershipDuration: z.string().describe(
    "Optional. The duration a user remains in the user list. Valid durations are exact multiples of 24 hours (86400 seconds). Providing a value that is not an exact multiple of 24 hours will result in an INVALID_ARGUMENT error.",
  ).optional(),
  membershipStatus: z.enum(["MEMBERSHIP_STATUS_UNSPECIFIED", "OPEN", "CLOSED"])
    .describe("Optional. Membership status of this user list.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the user list. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list}",
  ).optional(),
  sizeInfo: z.object({
    displayNetworkMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list, on the Google Display Network.",
    ).optional(),
    gmailMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list on Gmail.",
    ).optional(),
    searchNetworkMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list in the google.com domain. These are the members available for targeting in Search campaigns.",
    ).optional(),
    youtubeMembersCount: z.string().describe(
      "Output only. Estimated number of members in this user list on YouTube.",
    ).optional(),
  }).describe(
    "Estimated number of members in this user list in different target networks.",
  ).optional(),
  targetNetworkInfo: z.object({
    eligibleForDisplay: z.boolean().describe(
      "Output only. Indicates this user list is eligible for Google Display Network.",
    ).optional(),
    eligibleForSearch: z.boolean().describe(
      "Optional. Indicates if this user list is eligible for Google Search Network.",
    ).optional(),
  }).describe("Eligibility information for different target networks.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Manager AccountTypes.Accounts.UserLists. Registered at `@swamp/gcp/datamanager/accounttypes-accounts-userlists`. */
export const model = {
  type: "@swamp/gcp/datamanager/accounttypes-accounts-userlists",
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
      toVersion: "2026.05.09.1",
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
      description: "A user list resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a userLists",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountAccessStatus"] !== undefined) {
          body["accountAccessStatus"] = g["accountAccessStatus"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["ingestedUserListInfo"] !== undefined) {
          body["ingestedUserListInfo"] = g["ingestedUserListInfo"];
        }
        if (g["integrationCode"] !== undefined) {
          body["integrationCode"] = g["integrationCode"];
        }
        if (g["membershipDuration"] !== undefined) {
          body["membershipDuration"] = g["membershipDuration"];
        }
        if (g["membershipStatus"] !== undefined) {
          body["membershipStatus"] = g["membershipStatus"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sizeInfo"] !== undefined) body["sizeInfo"] = g["sizeInfo"];
        if (g["targetNetworkInfo"] !== undefined) {
          body["targetNetworkInfo"] = g["targetNetworkInfo"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
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
      description: "Get a userLists",
      arguments: z.object({
        identifier: z.string().describe("The name of the userLists"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update userLists attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["accountAccessStatus"] !== undefined) {
          body["accountAccessStatus"] = g["accountAccessStatus"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["ingestedUserListInfo"] !== undefined) {
          body["ingestedUserListInfo"] = g["ingestedUserListInfo"];
        }
        if (g["integrationCode"] !== undefined) {
          body["integrationCode"] = g["integrationCode"];
        }
        if (g["membershipDuration"] !== undefined) {
          body["membershipDuration"] = g["membershipDuration"];
        }
        if (g["membershipStatus"] !== undefined) {
          body["membershipStatus"] = g["membershipStatus"];
        }
        if (g["sizeInfo"] !== undefined) body["sizeInfo"] = g["sizeInfo"];
        if (g["targetNetworkInfo"] !== undefined) {
          body["targetNetworkInfo"] = g["targetNetworkInfo"];
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
      description: "Delete the userLists",
      arguments: z.object({
        identifier: z.string().describe("The name of the userLists"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync userLists state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
