// Auto-generated extension model for @swamp/gcp/displayvideo/firstpartyandpartneraudiences
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 FirstPartyAndPartnerAudiences.
 *
 * Describes a first or partner audience list used for targeting. First party audiences are created via usage of client data. Partner audiences are provided by Third Party data providers and can only be licensed to customers.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.firstPartyAndPartnerAudiences.get",
  "path": "v4/firstPartyAndPartnerAudiences/{+firstPartyAndPartnerAudienceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "firstPartyAndPartnerAudienceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "firstPartyAndPartnerAudienceId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.firstPartyAndPartnerAudiences.create",
  "path": "v4/firstPartyAndPartnerAudiences",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.firstPartyAndPartnerAudiences.patch",
  "path": "v4/firstPartyAndPartnerAudiences/{+firstPartyAndPartnerAudienceId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "firstPartyAndPartnerAudienceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "firstPartyAndPartnerAudienceId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.firstPartyAndPartnerAudiences.list",
  "path": "v4/firstPartyAndPartnerAudiences",
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
    "Optional. The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`",
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
    "THIRD_PARTY",
    "COMMERCE",
    "LINEAR",
    "AGENCY",
  ]).describe("Immutable. The type of the audience.").optional(),
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
    "Optional. The user-provided description of the audience. Only applicable to first party audiences.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the first party and partner audience.",
  ).optional(),
  firstPartyAndPartnerAudienceId: z.string().describe(
    "Identifier. The unique ID of the first party and partner audience. Assigned by the system.",
  ).optional(),
  membershipDurationDays: z.string().describe(
    "Optional. The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`",
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
    "Required. The ID of the advertiser under whom the FirstPartyAndPartnerAudience will be created.",
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
  firstPartyAndPartnerAudienceId: z.string().optional(),
  firstPartyAndPartnerAudienceType: z.string().optional(),
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
    "Optional. The app_id matches with the type of the mobile_device_ids being uploaded. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`",
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
    "THIRD_PARTY",
    "COMMERCE",
    "LINEAR",
    "AGENCY",
  ]).describe("Immutable. The type of the audience.").optional(),
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
    "Optional. The user-provided description of the audience. Only applicable to first party audiences.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. The display name of the first party and partner audience.",
  ).optional(),
  firstPartyAndPartnerAudienceId: z.string().describe(
    "Identifier. The unique ID of the first party and partner audience. Assigned by the system.",
  ).optional(),
  membershipDurationDays: z.string().describe(
    "Optional. The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540. Only applicable to first party audiences. This field is required if one of the following audience_type is used: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`",
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
    "Required. The ID of the advertiser under whom the FirstPartyAndPartnerAudience will be created.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 FirstPartyAndPartnerAudiences. Registered at `@swamp/gcp/displayvideo/firstpartyandpartneraudiences`. */
export const model = {
  type: "@swamp/gcp/displayvideo/firstpartyandpartneraudiences",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Describes a first or partner audience list used for targeting. First party au...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firstPartyAndPartnerAudiences",
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
        if (g["firstPartyAndPartnerAudienceId"] !== undefined) {
          body["firstPartyAndPartnerAudienceId"] =
            g["firstPartyAndPartnerAudienceId"];
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
          params["firstPartyAndPartnerAudienceId"] = String(g["name"]);
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
      description: "Get a firstPartyAndPartnerAudiences",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the firstPartyAndPartnerAudiences",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["firstPartyAndPartnerAudienceId"] = args.identifier;
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
      description: "Update firstPartyAndPartnerAudiences attributes",
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
        params["firstPartyAndPartnerAudienceId"] =
          existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["contactInfoList"] !== undefined) {
          body["contactInfoList"] = g["contactInfoList"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
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
      description: "Sync firstPartyAndPartnerAudiences state from GCP",
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
          params["firstPartyAndPartnerAudienceId"] = identifier;
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
        if (g["firstPartyAndPartnerAudienceId"] !== undefined) {
          params["firstPartyAndPartnerAudienceId"] = String(
            g["firstPartyAndPartnerAudienceId"],
          );
        }
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
              "displayvideo.firstPartyAndPartnerAudiences.editCustomerMatchMembers",
            "path":
              "v4/firstPartyAndPartnerAudiences/{+firstPartyAndPartnerAudienceId}:editCustomerMatchMembers",
            "httpMethod": "POST",
            "parameterOrder": ["firstPartyAndPartnerAudienceId"],
            "parameters": {
              "firstPartyAndPartnerAudienceId": {
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
