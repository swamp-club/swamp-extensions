// Auto-generated extension model for @swamp/gcp/androidmanagement/enterprises
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Android Management Enterprises.
 *
 * The configuration applied to an enterprise.
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

const BASE_URL = "https://androidmanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "androidmanagement.enterprises.get",
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
  "id": "androidmanagement.enterprises.create",
  "path": "v1/enterprises",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "agreementAccepted": {
      "location": "query",
    },
    "enterpriseToken": {
      "location": "query",
    },
    "projectId": {
      "location": "query",
    },
    "signupUrlName": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "androidmanagement.enterprises.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidmanagement.enterprises.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "androidmanagement.enterprises.list",
  "path": "v1/enterprises",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  contactInfo: z.object({
    contactEmail: z.string().describe(
      "Email address for a point of contact, which will be used to send important announcements related to managed Google Play.",
    ).optional(),
    dataProtectionOfficerEmail: z.string().describe(
      "The email of the data protection officer. The email is validated but not verified.",
    ).optional(),
    dataProtectionOfficerName: z.string().describe(
      "The name of the data protection officer.",
    ).optional(),
    dataProtectionOfficerPhone: z.string().describe(
      "The phone number of the data protection officer The phone number is validated but not verified.",
    ).optional(),
    euRepresentativeEmail: z.string().describe(
      "The email of the EU representative. The email is validated but not verified.",
    ).optional(),
    euRepresentativeName: z.string().describe(
      "The name of the EU representative.",
    ).optional(),
    euRepresentativePhone: z.string().describe(
      "The phone number of the EU representative. The phone number is validated but not verified.",
    ).optional(),
  }).describe("Contact details for managed Google Play enterprises.")
    .optional(),
  enabledNotificationTypes: z.array(
    z.enum([
      "NOTIFICATION_TYPE_UNSPECIFIED",
      "ENROLLMENT",
      "COMPLIANCE_REPORT",
      "STATUS_REPORT",
      "COMMAND",
      "USAGE_LOGS",
      "ENTERPRISE_UPGRADE",
    ]),
  ).describe(
    "The types of Google Pub/Sub notifications enabled for the enterprise.",
  ).optional(),
  enterpriseDisplayName: z.string().describe(
    "The name of the enterprise displayed to users. This field has a maximum length of 100 characters.",
  ).optional(),
  googleAuthenticationSettings: z.object({
    googleAuthenticationRequired: z.enum([
      "GOOGLE_AUTHENTICATION_REQUIRED_UNSPECIFIED",
      "NOT_REQUIRED",
      "REQUIRED",
    ]).describe(
      "Output only. Whether users need to be authenticated by Google during the enrollment process. IT admin can specify if Google authentication is enabled for the enterprise for knowledge worker devices. This value can be set only via the Google Admin Console. Google authentication can be used with signin_url In the case where Google authentication is required and a signin_url is specified, Google authentication will be launched before signin_url. This value is overridden by EnrollmentToken.googleAuthenticationOptions and SigninDetail.googleAuthenticationOptions, if they are set.",
    ).optional(),
  }).describe("Contains settings for Google-provided user authentication.")
    .optional(),
  logo: z.object({
    sha256Hash: z.string().describe(
      "The base-64 encoded SHA-256 hash of the content hosted at url. If the content doesn't match this hash, Android Device Policy won't use the data.",
    ).optional(),
    url: z.string().describe(
      "The absolute URL to the data, which must use either the http or https scheme. Android Device Policy doesn't provide any credentials in the GET request, so the URL must be publicly accessible. Including a long, random component in the URL may be used to prevent attackers from discovering the URL.",
    ).optional(),
  }).describe(
    "Data hosted at an external location. The data is to be downloaded by Android Device Policy and verified against the hash.",
  ).optional(),
  name: z.string().describe(
    "The name of the enterprise which is generated by the server during creation, in the form enterprises/{enterpriseId}.",
  ).optional(),
  primaryColor: z.number().int().describe(
    "A color in RGB format that indicates the predominant color to display in the device management app UI. The color components are stored as follows: (red << 16) | (green << 8) | blue, where the value of each component is between 0 and 255, inclusive.",
  ).optional(),
  pubsubTopic: z.string().describe(
    "The topic which Pub/Sub notifications are published to, in the form projects/{project}/topics/{topic}. This field is only required if Pub/Sub notifications are enabled.",
  ).optional(),
  signinDetails: z.array(z.object({
    allowPersonalUsage: z.enum([
      "ALLOW_PERSONAL_USAGE_UNSPECIFIED",
      "PERSONAL_USAGE_ALLOWED",
      "PERSONAL_USAGE_DISALLOWED",
      "PERSONAL_USAGE_DISALLOWED_USERLESS",
    ]).describe(
      "Controls whether personal usage is allowed on a device provisioned with this enrollment token.For company-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage requires the user provision the device as a fully managed device.For personally-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage will prevent the device from provisioning. Personal usage cannot be disabled on personally-owned device.",
    ).optional(),
    defaultStatus: z.enum([
      "SIGNIN_DETAIL_DEFAULT_STATUS_UNSPECIFIED",
      "SIGNIN_DETAIL_IS_DEFAULT",
      "SIGNIN_DETAIL_IS_NOT_DEFAULT",
    ]).describe(
      "Optional. Whether the sign-in URL should be used by default for the enterprise. The SigninDetail with defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT is used for Google account enrollment method. Only one of an enterprise's signinDetails can have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT. If an Enterprise has at least one signinDetails and none of them have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT then the first one from the list is selected and has set defaultStatus to SIGNIN_DETAIL_IS_DEFAULT. If no signinDetails specified for the Enterprise then the Google Account device enrollment will fail.",
    ).optional(),
    qrCode: z.string().describe(
      "A JSON string whose UTF-8 representation can be used to generate a QR code to enroll a device with this enrollment token. To enroll a device using NFC, the NFC record must contain a serialized java.util.Properties representation of the properties in the JSON. This is a read-only field generated by the server.",
    ).optional(),
    signinEnrollmentToken: z.string().describe(
      "An enterprise wide enrollment token used to trigger custom sign-in flow. This is a read-only field generated by the server.",
    ).optional(),
    signinUrl: z.string().describe(
      "Sign-in URL for authentication when device is provisioned with a sign-in enrollment token. The sign-in endpoint should finish authentication flow with a URL in the form of https://enterprise.google.com/android/enroll?et= for a successful login, or https://enterprise.google.com/android/enroll/invalid for a failed login.",
    ).optional(),
    tokenTag: z.string().describe(
      "An EMM-specified metadata to distinguish between instances of SigninDetail.",
    ).optional(),
  })).describe("Sign-in details of the enterprise.").optional(),
  termsAndConditions: z.array(z.object({
    content: z.object({
      defaultMessage: z.string().describe(
        "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
      ).optional(),
      localizedMessages: z.record(z.string(), z.string()).describe(
        "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
      ).optional(),
    }).describe(
      "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
    ).optional(),
    header: z.object({
      defaultMessage: z.string().describe(
        "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
      ).optional(),
      localizedMessages: z.record(z.string(), z.string()).describe(
        "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
      ).optional(),
    }).describe(
      "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
    ).optional(),
  })).describe(
    "Terms and conditions that must be accepted when provisioning a device for this enterprise. A page of terms is generated for each value in this list.",
  ).optional(),
  enterpriseToken: z.string().describe(
    "The enterprise token appended to the callback URL. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).",
  ).optional(),
  projectId: z.string().describe(
    "The ID of the Google Cloud Platform project which will own the enterprise.",
  ).optional(),
  signupUrlName: z.string().describe(
    "The name of the SignupUrl used to sign up for the enterprise. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).",
  ).optional(),
});

const StateSchema = z.object({
  appAutoApprovalEnabled: z.boolean().optional(),
  contactInfo: z.object({
    contactEmail: z.string(),
    dataProtectionOfficerEmail: z.string(),
    dataProtectionOfficerName: z.string(),
    dataProtectionOfficerPhone: z.string(),
    euRepresentativeEmail: z.string(),
    euRepresentativeName: z.string(),
    euRepresentativePhone: z.string(),
  }).optional(),
  enabledNotificationTypes: z.array(z.string()).optional(),
  enterpriseDisplayName: z.string().optional(),
  enterpriseType: z.string().optional(),
  googleAuthenticationSettings: z.object({
    googleAuthenticationRequired: z.string(),
  }).optional(),
  logo: z.object({
    sha256Hash: z.string(),
    url: z.string(),
  }).optional(),
  managedGoogleDomainType: z.string().optional(),
  managedGooglePlayAccountsEnterpriseType: z.string().optional(),
  name: z.string(),
  primaryColor: z.number().optional(),
  pubsubTopic: z.string().optional(),
  signinDetails: z.array(z.object({
    allowPersonalUsage: z.string(),
    defaultStatus: z.string(),
    qrCode: z.string(),
    signinEnrollmentToken: z.string(),
    signinUrl: z.string(),
    tokenTag: z.string(),
  })).optional(),
  termsAndConditions: z.array(z.object({
    content: z.object({
      defaultMessage: z.string(),
      localizedMessages: z.record(z.string(), z.unknown()),
    }),
    header: z.object({
      defaultMessage: z.string(),
      localizedMessages: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  contactInfo: z.object({
    contactEmail: z.string().describe(
      "Email address for a point of contact, which will be used to send important announcements related to managed Google Play.",
    ).optional(),
    dataProtectionOfficerEmail: z.string().describe(
      "The email of the data protection officer. The email is validated but not verified.",
    ).optional(),
    dataProtectionOfficerName: z.string().describe(
      "The name of the data protection officer.",
    ).optional(),
    dataProtectionOfficerPhone: z.string().describe(
      "The phone number of the data protection officer The phone number is validated but not verified.",
    ).optional(),
    euRepresentativeEmail: z.string().describe(
      "The email of the EU representative. The email is validated but not verified.",
    ).optional(),
    euRepresentativeName: z.string().describe(
      "The name of the EU representative.",
    ).optional(),
    euRepresentativePhone: z.string().describe(
      "The phone number of the EU representative. The phone number is validated but not verified.",
    ).optional(),
  }).describe("Contact details for managed Google Play enterprises.")
    .optional(),
  enabledNotificationTypes: z.array(
    z.enum([
      "NOTIFICATION_TYPE_UNSPECIFIED",
      "ENROLLMENT",
      "COMPLIANCE_REPORT",
      "STATUS_REPORT",
      "COMMAND",
      "USAGE_LOGS",
      "ENTERPRISE_UPGRADE",
    ]),
  ).describe(
    "The types of Google Pub/Sub notifications enabled for the enterprise.",
  ).optional(),
  enterpriseDisplayName: z.string().describe(
    "The name of the enterprise displayed to users. This field has a maximum length of 100 characters.",
  ).optional(),
  googleAuthenticationSettings: z.object({
    googleAuthenticationRequired: z.enum([
      "GOOGLE_AUTHENTICATION_REQUIRED_UNSPECIFIED",
      "NOT_REQUIRED",
      "REQUIRED",
    ]).describe(
      "Output only. Whether users need to be authenticated by Google during the enrollment process. IT admin can specify if Google authentication is enabled for the enterprise for knowledge worker devices. This value can be set only via the Google Admin Console. Google authentication can be used with signin_url In the case where Google authentication is required and a signin_url is specified, Google authentication will be launched before signin_url. This value is overridden by EnrollmentToken.googleAuthenticationOptions and SigninDetail.googleAuthenticationOptions, if they are set.",
    ).optional(),
  }).describe("Contains settings for Google-provided user authentication.")
    .optional(),
  logo: z.object({
    sha256Hash: z.string().describe(
      "The base-64 encoded SHA-256 hash of the content hosted at url. If the content doesn't match this hash, Android Device Policy won't use the data.",
    ).optional(),
    url: z.string().describe(
      "The absolute URL to the data, which must use either the http or https scheme. Android Device Policy doesn't provide any credentials in the GET request, so the URL must be publicly accessible. Including a long, random component in the URL may be used to prevent attackers from discovering the URL.",
    ).optional(),
  }).describe(
    "Data hosted at an external location. The data is to be downloaded by Android Device Policy and verified against the hash.",
  ).optional(),
  name: z.string().describe(
    "The name of the enterprise which is generated by the server during creation, in the form enterprises/{enterpriseId}.",
  ).optional(),
  primaryColor: z.number().int().describe(
    "A color in RGB format that indicates the predominant color to display in the device management app UI. The color components are stored as follows: (red << 16) | (green << 8) | blue, where the value of each component is between 0 and 255, inclusive.",
  ).optional(),
  pubsubTopic: z.string().describe(
    "The topic which Pub/Sub notifications are published to, in the form projects/{project}/topics/{topic}. This field is only required if Pub/Sub notifications are enabled.",
  ).optional(),
  signinDetails: z.array(z.object({
    allowPersonalUsage: z.enum([
      "ALLOW_PERSONAL_USAGE_UNSPECIFIED",
      "PERSONAL_USAGE_ALLOWED",
      "PERSONAL_USAGE_DISALLOWED",
      "PERSONAL_USAGE_DISALLOWED_USERLESS",
    ]).describe(
      "Controls whether personal usage is allowed on a device provisioned with this enrollment token.For company-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage requires the user provision the device as a fully managed device.For personally-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage will prevent the device from provisioning. Personal usage cannot be disabled on personally-owned device.",
    ).optional(),
    defaultStatus: z.enum([
      "SIGNIN_DETAIL_DEFAULT_STATUS_UNSPECIFIED",
      "SIGNIN_DETAIL_IS_DEFAULT",
      "SIGNIN_DETAIL_IS_NOT_DEFAULT",
    ]).describe(
      "Optional. Whether the sign-in URL should be used by default for the enterprise. The SigninDetail with defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT is used for Google account enrollment method. Only one of an enterprise's signinDetails can have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT. If an Enterprise has at least one signinDetails and none of them have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT then the first one from the list is selected and has set defaultStatus to SIGNIN_DETAIL_IS_DEFAULT. If no signinDetails specified for the Enterprise then the Google Account device enrollment will fail.",
    ).optional(),
    qrCode: z.string().describe(
      "A JSON string whose UTF-8 representation can be used to generate a QR code to enroll a device with this enrollment token. To enroll a device using NFC, the NFC record must contain a serialized java.util.Properties representation of the properties in the JSON. This is a read-only field generated by the server.",
    ).optional(),
    signinEnrollmentToken: z.string().describe(
      "An enterprise wide enrollment token used to trigger custom sign-in flow. This is a read-only field generated by the server.",
    ).optional(),
    signinUrl: z.string().describe(
      "Sign-in URL for authentication when device is provisioned with a sign-in enrollment token. The sign-in endpoint should finish authentication flow with a URL in the form of https://enterprise.google.com/android/enroll?et= for a successful login, or https://enterprise.google.com/android/enroll/invalid for a failed login.",
    ).optional(),
    tokenTag: z.string().describe(
      "An EMM-specified metadata to distinguish between instances of SigninDetail.",
    ).optional(),
  })).describe("Sign-in details of the enterprise.").optional(),
  termsAndConditions: z.array(z.object({
    content: z.object({
      defaultMessage: z.string().describe(
        "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
      ).optional(),
      localizedMessages: z.record(z.string(), z.string()).describe(
        "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
      ).optional(),
    }).describe(
      "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
    ).optional(),
    header: z.object({
      defaultMessage: z.string().describe(
        "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
      ).optional(),
      localizedMessages: z.record(z.string(), z.string()).describe(
        "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
      ).optional(),
    }).describe(
      "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
    ).optional(),
  })).describe(
    "Terms and conditions that must be accepted when provisioning a device for this enterprise. A page of terms is generated for each value in this list.",
  ).optional(),
  enterpriseToken: z.string().describe(
    "The enterprise token appended to the callback URL. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).",
  ).optional(),
  projectId: z.string().describe(
    "The ID of the Google Cloud Platform project which will own the enterprise.",
  ).optional(),
  signupUrlName: z.string().describe(
    "The name of the SignupUrl used to sign up for the enterprise. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Android Management Enterprises. Registered at `@swamp/gcp/androidmanagement/enterprises`. */
export const model = {
  type: "@swamp/gcp/androidmanagement/enterprises",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The configuration applied to an enterprise.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a enterprises",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["contactInfo"] !== undefined) {
          body["contactInfo"] = g["contactInfo"];
        }
        if (g["enabledNotificationTypes"] !== undefined) {
          body["enabledNotificationTypes"] = g["enabledNotificationTypes"];
        }
        if (g["enterpriseDisplayName"] !== undefined) {
          body["enterpriseDisplayName"] = g["enterpriseDisplayName"];
        }
        if (g["googleAuthenticationSettings"] !== undefined) {
          body["googleAuthenticationSettings"] =
            g["googleAuthenticationSettings"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["primaryColor"] !== undefined) {
          body["primaryColor"] = g["primaryColor"];
        }
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["signinDetails"] !== undefined) {
          body["signinDetails"] = g["signinDetails"];
        }
        if (g["termsAndConditions"] !== undefined) {
          body["termsAndConditions"] = g["termsAndConditions"];
        }
        if (g["enterpriseToken"] !== undefined) {
          body["enterpriseToken"] = g["enterpriseToken"];
        }
        if (g["projectId"] !== undefined) body["projectId"] = g["projectId"];
        if (g["signupUrlName"] !== undefined) {
          body["signupUrlName"] = g["signupUrlName"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a enterprises",
      arguments: z.object({
        identifier: z.string().describe("The name of the enterprises"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update enterprises attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["contactInfo"] !== undefined) {
          body["contactInfo"] = g["contactInfo"];
        }
        if (g["enabledNotificationTypes"] !== undefined) {
          body["enabledNotificationTypes"] = g["enabledNotificationTypes"];
        }
        if (g["enterpriseDisplayName"] !== undefined) {
          body["enterpriseDisplayName"] = g["enterpriseDisplayName"];
        }
        if (g["googleAuthenticationSettings"] !== undefined) {
          body["googleAuthenticationSettings"] =
            g["googleAuthenticationSettings"];
        }
        if (g["logo"] !== undefined) body["logo"] = g["logo"];
        if (g["primaryColor"] !== undefined) {
          body["primaryColor"] = g["primaryColor"];
        }
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["signinDetails"] !== undefined) {
          body["signinDetails"] = g["signinDetails"];
        }
        if (g["termsAndConditions"] !== undefined) {
          body["termsAndConditions"] = g["termsAndConditions"];
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
      description: "Delete the enterprises",
      arguments: z.object({
        identifier: z.string().describe("The name of the enterprises"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync enterprises state from GCP",
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
          params["name"] = identifier;
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
    generate_enterprise_upgrade_url: {
      description: "generate enterprise upgrade url",
      arguments: z.object({
        adminEmail: z.any().optional(),
        allowedDomains: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["adminEmail"] !== undefined) {
          body["adminEmail"] = args["adminEmail"];
        }
        if (args["allowedDomains"] !== undefined) {
          body["allowedDomains"] = args["allowedDomains"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidmanagement.enterprises.generateEnterpriseUpgradeUrl",
            "path": "v1/{+name}:generateEnterpriseUpgradeUrl",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
