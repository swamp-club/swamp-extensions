// Auto-generated extension model for @swamp/gcp/displayvideo/firstandthirdpartyaudiences
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 FirstAndThirdPartyAudiences.
 *
 * Describes a first or third party audience list used for targeting. First party audiences are created via usage of client data. Third party audiences are provided by Third Party data providers and can only be licensed to customers.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.firstAndThirdPartyAudiences.get",
  "path": "v3/firstAndThirdPartyAudiences/{+firstAndThirdPartyAudienceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "firstAndThirdPartyAudienceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "firstAndThirdPartyAudienceId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.firstAndThirdPartyAudiences.create",
  "path": "v3/firstAndThirdPartyAudiences",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.firstAndThirdPartyAudiences.patch",
  "path": "v3/firstAndThirdPartyAudiences/{+firstAndThirdPartyAudienceId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "firstAndThirdPartyAudienceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "firstAndThirdPartyAudienceId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.firstAndThirdPartyAudiences.list",
  "path": "v3/firstAndThirdPartyAudiences",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "filter": {
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
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  appId: z.string().describe(
    "The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`",
  ).optional(),
  audienceType: z.enum([
    "AUDIENCE_TYPE_UNSPECIFIED",
    "CUSTOMER_MATCH_CONTACT_INFO",
    "CUSTOMER_MATCH_DEVICE_ID",
    "CUSTOMER_MATCH_USER_ID",
    "ACTIVITY_BASED",
    "FREQUENCY_CAP",
    "TAG_BASED",
    "YOUTUBE_USERS",
    "LICENSED",
  ]).describe("The type of the audience.").optional(),
  contactInfoList: z.object({
    consent: z.object({
      adPersonalization: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad personalization.").optional(),
      adUserData: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad user data.").optional(),
    }).describe("User consent status.").optional(),
    contactInfos: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the member. Must also be set with the following fields: * hashed_first_name * hashed_last_name * zip_codes",
      ).optional(),
      hashedEmails: z.array(z.string()).describe(
        "A list of SHA256 hashed email of the member. Before hashing, remove all whitespace and make sure the string is all lowercase.",
      ).optional(),
      hashedFirstName: z.string().describe(
        "SHA256 hashed first name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_last_name * zip_codes",
      ).optional(),
      hashedLastName: z.string().describe(
        "SHA256 hashed last name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_first_name * zip_codes",
      ).optional(),
      hashedPhoneNumbers: z.array(z.string()).describe(
        "A list of SHA256 hashed phone numbers of the member. Before hashing, all phone numbers must be formatted using the [E.164 format](//en.wikipedia.org/wiki/E.164) and include the country calling code.",
      ).optional(),
      zipCodes: z.array(z.string()).describe(
        "A list of zip codes of the member. Must also be set with the following fields: * country_code * hashed_first_name * hashed_last_name",
      ).optional(),
    })).describe(
      "A list of ContactInfo objects defining Customer Match audience members. The size of members after splitting the contact_infos mustn't be greater than 500,000.",
    ).optional(),
  }).describe(
    "Wrapper message for a list of contact information defining Customer Match audience members.",
  ).optional(),
  description: z.string().describe(
    "The user-provided description of the audience. Only applicable to first party audiences.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the first and third party audience.",
  ).optional(),
  firstAndThirdPartyAudienceType: z.enum([
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_UNSPECIFIED",
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_FIRST_PARTY",
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_THIRD_PARTY",
  ]).describe("Whether the audience is a first or third party audience.")
    .optional(),
  membershipDurationDays: z.string().describe(
    "The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`",
  ).optional(),
  mobileDeviceIdList: z.object({
    consent: z.object({
      adPersonalization: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad personalization.").optional(),
      adUserData: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad user data.").optional(),
    }).describe("User consent status.").optional(),
    mobileDeviceIds: z.array(z.string()).describe(
      "A list of mobile device IDs defining Customer Match audience members. The size of mobile_device_ids mustn't be greater than 500,000.",
    ).optional(),
  }).describe(
    "Wrapper message for a list of mobile device IDs defining Customer Match audience members.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser under whom the FirstAndThirdPartyAudience will be created.",
  ).optional(),
});

const StateSchema = z.object({
  activeDisplayAudienceSize: z.string().optional(),
  appId: z.string().optional(),
  audienceSource: z.string().optional(),
  audienceType: z.string().optional(),
  contactInfoList: z.object({
    consent: z.object({
      adPersonalization: z.string(),
      adUserData: z.string(),
    }),
    contactInfos: z.array(z.object({
      countryCode: z.string(),
      hashedEmails: z.array(z.string()),
      hashedFirstName: z.string(),
      hashedLastName: z.string(),
      hashedPhoneNumbers: z.array(z.string()),
      zipCodes: z.array(z.string()),
    })),
  }).optional(),
  description: z.string().optional(),
  displayAudienceSize: z.string().optional(),
  displayDesktopAudienceSize: z.string().optional(),
  displayMobileAppAudienceSize: z.string().optional(),
  displayMobileWebAudienceSize: z.string().optional(),
  displayName: z.string().optional(),
  firstAndThirdPartyAudienceId: z.string().optional(),
  firstAndThirdPartyAudienceType: z.string().optional(),
  gmailAudienceSize: z.string().optional(),
  membershipDurationDays: z.string().optional(),
  mobileDeviceIdList: z.object({
    consent: z.object({
      adPersonalization: z.string(),
      adUserData: z.string(),
    }),
    mobileDeviceIds: z.array(z.string()),
  }).optional(),
  name: z.string(),
  youtubeAudienceSize: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  appId: z.string().describe(
    "The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`",
  ).optional(),
  audienceType: z.enum([
    "AUDIENCE_TYPE_UNSPECIFIED",
    "CUSTOMER_MATCH_CONTACT_INFO",
    "CUSTOMER_MATCH_DEVICE_ID",
    "CUSTOMER_MATCH_USER_ID",
    "ACTIVITY_BASED",
    "FREQUENCY_CAP",
    "TAG_BASED",
    "YOUTUBE_USERS",
    "LICENSED",
  ]).describe("The type of the audience.").optional(),
  contactInfoList: z.object({
    consent: z.object({
      adPersonalization: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad personalization.").optional(),
      adUserData: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad user data.").optional(),
    }).describe("User consent status.").optional(),
    contactInfos: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the member. Must also be set with the following fields: * hashed_first_name * hashed_last_name * zip_codes",
      ).optional(),
      hashedEmails: z.array(z.string()).describe(
        "A list of SHA256 hashed email of the member. Before hashing, remove all whitespace and make sure the string is all lowercase.",
      ).optional(),
      hashedFirstName: z.string().describe(
        "SHA256 hashed first name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_last_name * zip_codes",
      ).optional(),
      hashedLastName: z.string().describe(
        "SHA256 hashed last name of the member. Before hashing, remove all whitespace and make sure the string is all lowercase. Must also be set with the following fields: * country_code * hashed_first_name * zip_codes",
      ).optional(),
      hashedPhoneNumbers: z.array(z.string()).describe(
        "A list of SHA256 hashed phone numbers of the member. Before hashing, all phone numbers must be formatted using the [E.164 format](//en.wikipedia.org/wiki/E.164) and include the country calling code.",
      ).optional(),
      zipCodes: z.array(z.string()).describe(
        "A list of zip codes of the member. Must also be set with the following fields: * country_code * hashed_first_name * hashed_last_name",
      ).optional(),
    })).describe(
      "A list of ContactInfo objects defining Customer Match audience members. The size of members after splitting the contact_infos mustn't be greater than 500,000.",
    ).optional(),
  }).describe(
    "Wrapper message for a list of contact information defining Customer Match audience members.",
  ).optional(),
  description: z.string().describe(
    "The user-provided description of the audience. Only applicable to first party audiences.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the first and third party audience.",
  ).optional(),
  firstAndThirdPartyAudienceType: z.enum([
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_UNSPECIFIED",
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_FIRST_PARTY",
    "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_THIRD_PARTY",
  ]).describe("Whether the audience is a first or third party audience.")
    .optional(),
  membershipDurationDays: z.string().describe(
    "The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`",
  ).optional(),
  mobileDeviceIdList: z.object({
    consent: z.object({
      adPersonalization: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad personalization.").optional(),
      adUserData: z.enum([
        "CONSENT_STATUS_UNSPECIFIED",
        "CONSENT_STATUS_GRANTED",
        "CONSENT_STATUS_DENIED",
      ]).describe("Represents consent for ad user data.").optional(),
    }).describe("User consent status.").optional(),
    mobileDeviceIds: z.array(z.string()).describe(
      "A list of mobile device IDs defining Customer Match audience members. The size of mobile_device_ids mustn't be greater than 500,000.",
    ).optional(),
  }).describe(
    "Wrapper message for a list of mobile device IDs defining Customer Match audience members.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser under whom the FirstAndThirdPartyAudience will be created.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 FirstAndThirdPartyAudiences. Registered at `@swamp/gcp/displayvideo/firstandthirdpartyaudiences`. */
export const model = {
  type: "@swamp/gcp/displayvideo/firstandthirdpartyaudiences",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Describes a first or third party audience list used for targeting. First part...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firstAndThirdPartyAudiences",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["audienceType"] !== undefined) {
          body["audienceType"] = g["audienceType"];
        }
        if (g["contactInfoList"] !== undefined) {
          body["contactInfoList"] = g["contactInfoList"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["firstAndThirdPartyAudienceType"] !== undefined) {
          body["firstAndThirdPartyAudienceType"] =
            g["firstAndThirdPartyAudienceType"];
        }
        if (g["membershipDurationDays"] !== undefined) {
          body["membershipDurationDays"] = g["membershipDurationDays"];
        }
        if (g["mobileDeviceIdList"] !== undefined) {
          body["mobileDeviceIdList"] = g["mobileDeviceIdList"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["name"] !== undefined) {
          params["firstAndThirdPartyAudienceId"] = String(g["name"]);
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
            listParams: {},
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a firstAndThirdPartyAudiences",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the firstAndThirdPartyAudiences",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["firstAndThirdPartyAudienceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update firstAndThirdPartyAudiences attributes",
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
        params["firstAndThirdPartyAudienceId"] = existing["name"]?.toString() ??
          "";
        const body: Record<string, unknown> = {};
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["audienceType"] !== undefined) {
          body["audienceType"] = g["audienceType"];
        }
        if (g["contactInfoList"] !== undefined) {
          body["contactInfoList"] = g["contactInfoList"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["firstAndThirdPartyAudienceType"] !== undefined) {
          body["firstAndThirdPartyAudienceType"] =
            g["firstAndThirdPartyAudienceType"];
        }
        if (g["membershipDurationDays"] !== undefined) {
          body["membershipDurationDays"] = g["membershipDurationDays"];
        }
        if (g["mobileDeviceIdList"] !== undefined) {
          body["mobileDeviceIdList"] = g["mobileDeviceIdList"];
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
    sync: {
      description: "Sync firstAndThirdPartyAudiences state from GCP",
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
          params["firstAndThirdPartyAudienceId"] = identifier;
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
    list: {
      description: "List firstAndThirdPartyAudiences resources",
      arguments: z.object({
        advertiserId: z.string().describe(
          "The ID of the advertiser that has access to the fetched first and third party audiences.",
        ).optional(),
        filter: z.string().describe(
          'Allows filtering by first and third party audience fields. Supported syntax: * Filter expressions for first and third party audiences can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `HAS (:)` operator. Supported fields: * `displayName` Examples: * All first and third party audiences for which the display name contains "Google": `displayName:"Google"`. The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `firstAndThirdPartyAudienceId` (default) * `displayName` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `5000`. If unspecified, this value defaults to `5000`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        partnerId: z.string().describe(
          "The ID of the partner that has access to the fetched first and third party audiences.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["partnerId"] !== undefined) {
          params["partnerId"] = String(args["partnerId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "firstAndThirdPartyAudiences",
          (args.maxPages as number | undefined) ?? 10,
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
    edit_customer_match_members: {
      description: "edit customer match members",
      arguments: z.object({
        addedContactInfoList: z.any().optional(),
        addedMobileDeviceIdList: z.any().optional(),
        advertiserId: z.any().optional(),
        removedContactInfoList: z.any().optional(),
        removedMobileDeviceIdList: z.any().optional(),
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
        params["firstAndThirdPartyAudienceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addedContactInfoList"] !== undefined) {
          body["addedContactInfoList"] = args["addedContactInfoList"];
        }
        if (args["addedMobileDeviceIdList"] !== undefined) {
          body["addedMobileDeviceIdList"] = args["addedMobileDeviceIdList"];
        }
        if (args["advertiserId"] !== undefined) {
          body["advertiserId"] = args["advertiserId"];
        }
        if (args["removedContactInfoList"] !== undefined) {
          body["removedContactInfoList"] = args["removedContactInfoList"];
        }
        if (args["removedMobileDeviceIdList"] !== undefined) {
          body["removedMobileDeviceIdList"] = args["removedMobileDeviceIdList"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.firstAndThirdPartyAudiences.editCustomerMatchMembers",
            "path":
              "v3/firstAndThirdPartyAudiences/{+firstAndThirdPartyAudienceId}:editCustomerMatchMembers",
            "httpMethod": "POST",
            "parameterOrder": ["firstAndThirdPartyAudienceId"],
            "parameters": {
              "firstAndThirdPartyAudienceId": {
                "location": "path",
                "required": true,
              },
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
