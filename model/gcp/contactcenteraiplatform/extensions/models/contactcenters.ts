// Auto-generated extension model for @swamp/gcp/contactcenteraiplatform/contactcenters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Platform ContactCenters.
 *
 * Message describing ContactCenter object
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
  return `${parent}/contactCenters/${shortName}`;
}

const BASE_URL = "https://contactcenteraiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenteraiplatform.projects.locations.contactCenters.get",
  "path": "v1alpha1/{+name}",
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
  "id": "contactcenteraiplatform.projects.locations.contactCenters.create",
  "path": "v1alpha1/{+parent}/contactCenters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "contactCenterId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contactcenteraiplatform.projects.locations.contactCenters.patch",
  "path": "v1alpha1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "contactcenteraiplatform.projects.locations.contactCenters.delete",
  "path": "v1alpha1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "contactcenteraiplatform.projects.locations.contactCenters.list",
  "path": "v1alpha1/{+parent}/contactCenters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  adminUser: z.object({
    familyName: z.string().describe(
      "Optional. Last/family name of the first admin user.",
    ).optional(),
    givenName: z.string().describe(
      "Optional. First/given name of the first admin user.",
    ).optional(),
  }).describe("Message storing info about the first admin user. Next ID: 3")
    .optional(),
  advancedReportingEnabled: z.boolean().describe(
    "Optional. Whether the advanced reporting feature is enabled.",
  ).optional(),
  ccaipManagedUsers: z.boolean().describe(
    "Optional. Whether to enable users to be created in the CCAIP-instance concurrently to having users in Cloud identity",
  ).optional(),
  critical: z.object({
    peakHours: z.array(z.object({
      days: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe("Required. Days of the week this schedule applies to.")
        .optional(),
      duration: z.string().describe("Optional. Duration of the schedule.")
        .optional(),
      endTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Required. Hours during which the instance should not be updated.",
    ).optional(),
  }).describe(
    "Instances in this Channel will receive updates after all instances in `Normal` were updated. They also will only be updated outside of their peak hours.",
  ).optional(),
  customerDomainPrefix: z.string().describe(
    "Required. Immutable. At least 2 and max 16 char long, must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt).",
  ).optional(),
  displayName: z.string().describe(
    "Required. A user friendly name for the ContactCenter.",
  ).optional(),
  early: z.object({}).describe(
    "LINT.IfChange First Channel to receive the updates. Meant to dev/test instances",
  ).optional(),
  featureConfig: z.object({
    agentDesktopEnabled: z.boolean().describe(
      "Optional. If true - enables the agent desktop feature. Default is false.",
    ).optional(),
  }).optional(),
  instanceConfig: z.object({
    instanceSize: z.enum([
      "INSTANCE_SIZE_UNSPECIFIED",
      "STANDARD_SMALL",
      "STANDARD_MEDIUM",
      "STANDARD_LARGE",
      "STANDARD_XLARGE",
      "STANDARD_2XLARGE",
      "STANDARD_3XLARGE",
      "MULTIREGION_SMALL",
      "MULTIREGION_MEDIUM",
      "MULTIREGION_LARGE",
      "MULTIREGION_XLARGE",
      "MULTIREGION_2XLARGE",
      "MULTIREGION_3XLARGE",
      "DEV_SMALL",
      "SANDBOX_SMALL",
      "TRIAL_SMALL",
      "TIME_LIMITED_TRIAL_SMALL",
    ]).describe("The instance size of this the instance configuration.")
      .optional(),
  }).describe("Message storing the instance configuration.").optional(),
  kmsKey: z.string().describe(
    "Immutable. The KMS key name to encrypt the user input (`ContactCenter`).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  name: z.string().describe("name of resource").optional(),
  normal: z.object({}).describe(
    "Instances in this Channel will receive updates after all instances in `Early` were updated + 2 days.",
  ).optional(),
  privateAccess: z.object({
    egressSettings: z.array(z.object({
      name: z.string().describe("Name of the component.").optional(),
      serviceAttachmentNames: z.array(z.string()).describe(
        'Associated service attachments. The service attachment names that will be used for sending private traffic to the CCAIP tenant project. Example service attachment name: "projects/${TENANT_PROJECT_ID}/regions/${REGION}/serviceAttachments/ingress-default".',
      ).optional(),
    })).describe(
      "List of egress components that should not be accessed via the Internet. For more information see go/ccaip-private-path-v2.",
    ).optional(),
    ingressSettings: z.array(z.object({
      name: z.string().describe("Name of the component.").optional(),
      serviceAttachmentNames: z.array(z.string()).describe(
        'Associated service attachments. The service attachment names that will be used for sending private traffic to the CCAIP tenant project. Example service attachment name: "projects/${TENANT_PROJECT_ID}/regions/${REGION}/serviceAttachments/ingress-default".',
      ).optional(),
    })).describe(
      "List of ingress components that should not be accessed via the Internet. For more information see go/ccaip-private-path-v2.",
    ).optional(),
    pscSetting: z.object({
      allowedConsumerProjectIds: z.array(z.string()).describe(
        "The list of project ids that are allowed to send traffic to the service attachment. This field should be filled only for the ingress components.",
      ).optional(),
      producerProjectIds: z.array(z.string()).describe(
        "Output only. The CCAIP tenant project ids.",
      ).optional(),
    }).describe("Private service connect settings.").optional(),
  }).describe(
    "Defines ingress and egress private traffic settings for CCAIP instances.",
  ).optional(),
  samlParams: z.object({
    authenticationContexts: z.array(
      z.enum([
        "AUTHENTICATION_CONTEXT_UNSPECIFIED",
        "INTERNET_PROTOCOL",
        "INTERNET_PROTOCOL_PASSWORD",
        "KERBEROS",
        "MOBILE_ONE_FACTOR_UNREGISTERED",
        "MOBILE_TWO_FACTOR_UNREGISTERED",
        "MOBILE_ONE_FACTOR_CONTRACT",
        "MOBILE_TWO_FACTOR_CONTRACT",
        "PASSWORD",
        "PASSWORD_PROTECTED_TRANSPORT",
        "PREVIOUS_SESSION",
        "PUBLIC_KEY_X509",
        "PUBLIC_KEY_PGP",
        "PUBLIC_KEY_SPKI",
        "PUBLIC_KEY_XML_DIGITAL_SIGNATURE",
        "SMARTCARD",
        "SMARTCARD_PKI",
        "SOFTWARE_PKI",
        "TELEPHONY",
        "TELEPHONY_NOMADIC",
        "TELEPHONY_PERSONALIZED",
        "TELEPHONY_AUTHENTICATED",
        "SECURE_REMOTE_PASSWORD",
        "SSL_TLS_CERTIFICATE_BASED",
        "TIME_SYNC_TOKEN",
      ]),
    ).describe("Additional contexts used for authentication.").optional(),
    certificate: z.string().describe("SAML certificate").optional(),
    emailMapping: z.string().describe(
      "IdP field that maps to the user’s email address",
    ).optional(),
    entityId: z.string().describe("Entity id URL").optional(),
    ssoUri: z.string().describe("Single sign-on URL").optional(),
    userEmail: z.string().describe("Email address of the first admin users.")
      .optional(),
  }).describe("Message storing SAML params to enable Google as IDP.")
    .optional(),
  uris: z.object({
    chatBotUri: z.string().describe("Chat Bot Uri of the ContactCenter")
      .optional(),
    mediaUri: z.string().describe("Media Uri of the ContactCenter.").optional(),
    rootUri: z.string().describe("Root Uri of the ContactCenter.").optional(),
    virtualAgentStreamingServiceUri: z.string().describe(
      "Virtual Agent Streaming Service Uri of the ContactCenter.",
    ).optional(),
  }).describe("Message storing the URIs of the ContactCenter.").optional(),
  userEmail: z.string().describe(
    "Optional. Email address of the first admin user.",
  ).optional(),
  contactCenterId: z.string().describe(
    "Required. Id of the requesting object If auto-generating Id server-side, remove this field and contact_center_id from the method_signature of Create RPC",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminUser: z.object({
    familyName: z.string(),
    givenName: z.string(),
  }).optional(),
  advancedReportingEnabled: z.boolean().optional(),
  ccaipManagedUsers: z.boolean().optional(),
  createTime: z.string().optional(),
  critical: z.object({
    peakHours: z.array(z.object({
      days: z.array(z.string()),
      duration: z.string(),
      endTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  customerDomainPrefix: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  early: z.object({}).optional(),
  expireTime: z.string().optional(),
  featureConfig: z.object({
    agentDesktopEnabled: z.boolean(),
  }).optional(),
  instanceConfig: z.object({
    instanceSize: z.string(),
  }).optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  normal: z.object({}).optional(),
  privateAccess: z.object({
    egressSettings: z.array(z.object({
      name: z.string(),
      serviceAttachmentNames: z.array(z.string()),
    })),
    ingressSettings: z.array(z.object({
      name: z.string(),
      serviceAttachmentNames: z.array(z.string()),
    })),
    pscSetting: z.object({
      allowedConsumerProjectIds: z.array(z.string()),
      producerProjectIds: z.array(z.string()),
    }),
  }).optional(),
  privateComponents: z.array(z.string()).optional(),
  purgeTime: z.string().optional(),
  releaseVersion: z.string().optional(),
  samlParams: z.object({
    authenticationContexts: z.array(z.string()),
    certificate: z.string(),
    emailMapping: z.string(),
    entityId: z.string(),
    ssoUri: z.string(),
    userEmail: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  uris: z.object({
    chatBotUri: z.string(),
    mediaUri: z.string(),
    rootUri: z.string(),
    virtualAgentStreamingServiceUri: z.string(),
  }).optional(),
  userEmail: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adminUser: z.object({
    familyName: z.string().describe(
      "Optional. Last/family name of the first admin user.",
    ).optional(),
    givenName: z.string().describe(
      "Optional. First/given name of the first admin user.",
    ).optional(),
  }).describe("Message storing info about the first admin user. Next ID: 3")
    .optional(),
  advancedReportingEnabled: z.boolean().describe(
    "Optional. Whether the advanced reporting feature is enabled.",
  ).optional(),
  ccaipManagedUsers: z.boolean().describe(
    "Optional. Whether to enable users to be created in the CCAIP-instance concurrently to having users in Cloud identity",
  ).optional(),
  critical: z.object({
    peakHours: z.array(z.object({
      days: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe("Required. Days of the week this schedule applies to.")
        .optional(),
      duration: z.string().describe("Optional. Duration of the schedule.")
        .optional(),
      endTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Required. Hours during which the instance should not be updated.",
    ).optional(),
  }).describe(
    "Instances in this Channel will receive updates after all instances in `Normal` were updated. They also will only be updated outside of their peak hours.",
  ).optional(),
  customerDomainPrefix: z.string().describe(
    "Required. Immutable. At least 2 and max 16 char long, must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt).",
  ).optional(),
  displayName: z.string().describe(
    "Required. A user friendly name for the ContactCenter.",
  ).optional(),
  early: z.object({}).describe(
    "LINT.IfChange First Channel to receive the updates. Meant to dev/test instances",
  ).optional(),
  featureConfig: z.object({
    agentDesktopEnabled: z.boolean().describe(
      "Optional. If true - enables the agent desktop feature. Default is false.",
    ).optional(),
  }).optional(),
  instanceConfig: z.object({
    instanceSize: z.enum([
      "INSTANCE_SIZE_UNSPECIFIED",
      "STANDARD_SMALL",
      "STANDARD_MEDIUM",
      "STANDARD_LARGE",
      "STANDARD_XLARGE",
      "STANDARD_2XLARGE",
      "STANDARD_3XLARGE",
      "MULTIREGION_SMALL",
      "MULTIREGION_MEDIUM",
      "MULTIREGION_LARGE",
      "MULTIREGION_XLARGE",
      "MULTIREGION_2XLARGE",
      "MULTIREGION_3XLARGE",
      "DEV_SMALL",
      "SANDBOX_SMALL",
      "TRIAL_SMALL",
      "TIME_LIMITED_TRIAL_SMALL",
    ]).describe("The instance size of this the instance configuration.")
      .optional(),
  }).describe("Message storing the instance configuration.").optional(),
  kmsKey: z.string().describe(
    "Immutable. The KMS key name to encrypt the user input (`ContactCenter`).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  name: z.string().describe("name of resource").optional(),
  normal: z.object({}).describe(
    "Instances in this Channel will receive updates after all instances in `Early` were updated + 2 days.",
  ).optional(),
  privateAccess: z.object({
    egressSettings: z.array(z.object({
      name: z.string().describe("Name of the component.").optional(),
      serviceAttachmentNames: z.array(z.string()).describe(
        'Associated service attachments. The service attachment names that will be used for sending private traffic to the CCAIP tenant project. Example service attachment name: "projects/${TENANT_PROJECT_ID}/regions/${REGION}/serviceAttachments/ingress-default".',
      ).optional(),
    })).describe(
      "List of egress components that should not be accessed via the Internet. For more information see go/ccaip-private-path-v2.",
    ).optional(),
    ingressSettings: z.array(z.object({
      name: z.string().describe("Name of the component.").optional(),
      serviceAttachmentNames: z.array(z.string()).describe(
        'Associated service attachments. The service attachment names that will be used for sending private traffic to the CCAIP tenant project. Example service attachment name: "projects/${TENANT_PROJECT_ID}/regions/${REGION}/serviceAttachments/ingress-default".',
      ).optional(),
    })).describe(
      "List of ingress components that should not be accessed via the Internet. For more information see go/ccaip-private-path-v2.",
    ).optional(),
    pscSetting: z.object({
      allowedConsumerProjectIds: z.array(z.string()).describe(
        "The list of project ids that are allowed to send traffic to the service attachment. This field should be filled only for the ingress components.",
      ).optional(),
      producerProjectIds: z.array(z.string()).describe(
        "Output only. The CCAIP tenant project ids.",
      ).optional(),
    }).describe("Private service connect settings.").optional(),
  }).describe(
    "Defines ingress and egress private traffic settings for CCAIP instances.",
  ).optional(),
  samlParams: z.object({
    authenticationContexts: z.array(
      z.enum([
        "AUTHENTICATION_CONTEXT_UNSPECIFIED",
        "INTERNET_PROTOCOL",
        "INTERNET_PROTOCOL_PASSWORD",
        "KERBEROS",
        "MOBILE_ONE_FACTOR_UNREGISTERED",
        "MOBILE_TWO_FACTOR_UNREGISTERED",
        "MOBILE_ONE_FACTOR_CONTRACT",
        "MOBILE_TWO_FACTOR_CONTRACT",
        "PASSWORD",
        "PASSWORD_PROTECTED_TRANSPORT",
        "PREVIOUS_SESSION",
        "PUBLIC_KEY_X509",
        "PUBLIC_KEY_PGP",
        "PUBLIC_KEY_SPKI",
        "PUBLIC_KEY_XML_DIGITAL_SIGNATURE",
        "SMARTCARD",
        "SMARTCARD_PKI",
        "SOFTWARE_PKI",
        "TELEPHONY",
        "TELEPHONY_NOMADIC",
        "TELEPHONY_PERSONALIZED",
        "TELEPHONY_AUTHENTICATED",
        "SECURE_REMOTE_PASSWORD",
        "SSL_TLS_CERTIFICATE_BASED",
        "TIME_SYNC_TOKEN",
      ]),
    ).describe("Additional contexts used for authentication.").optional(),
    certificate: z.string().describe("SAML certificate").optional(),
    emailMapping: z.string().describe(
      "IdP field that maps to the user’s email address",
    ).optional(),
    entityId: z.string().describe("Entity id URL").optional(),
    ssoUri: z.string().describe("Single sign-on URL").optional(),
    userEmail: z.string().describe("Email address of the first admin users.")
      .optional(),
  }).describe("Message storing SAML params to enable Google as IDP.")
    .optional(),
  uris: z.object({
    chatBotUri: z.string().describe("Chat Bot Uri of the ContactCenter")
      .optional(),
    mediaUri: z.string().describe("Media Uri of the ContactCenter.").optional(),
    rootUri: z.string().describe("Root Uri of the ContactCenter.").optional(),
    virtualAgentStreamingServiceUri: z.string().describe(
      "Virtual Agent Streaming Service Uri of the ContactCenter.",
    ).optional(),
  }).describe("Message storing the URIs of the ContactCenter.").optional(),
  userEmail: z.string().describe(
    "Optional. Email address of the first admin user.",
  ).optional(),
  contactCenterId: z.string().describe(
    "Required. Id of the requesting object If auto-generating Id server-side, remove this field and contact_center_id from the method_signature of Create RPC",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Platform ContactCenters. Registered at `@swamp/gcp/contactcenteraiplatform/contactcenters`. */
export const model = {
  type: "@swamp/gcp/contactcenteraiplatform/contactcenters",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing ContactCenter object",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a contactCenters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["adminUser"] !== undefined) body["adminUser"] = g["adminUser"];
        if (g["advancedReportingEnabled"] !== undefined) {
          body["advancedReportingEnabled"] = g["advancedReportingEnabled"];
        }
        if (g["ccaipManagedUsers"] !== undefined) {
          body["ccaipManagedUsers"] = g["ccaipManagedUsers"];
        }
        if (g["critical"] !== undefined) body["critical"] = g["critical"];
        if (g["customerDomainPrefix"] !== undefined) {
          body["customerDomainPrefix"] = g["customerDomainPrefix"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["early"] !== undefined) body["early"] = g["early"];
        if (g["featureConfig"] !== undefined) {
          body["featureConfig"] = g["featureConfig"];
        }
        if (g["instanceConfig"] !== undefined) {
          body["instanceConfig"] = g["instanceConfig"];
        }
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["normal"] !== undefined) body["normal"] = g["normal"];
        if (g["privateAccess"] !== undefined) {
          body["privateAccess"] = g["privateAccess"];
        }
        if (g["samlParams"] !== undefined) body["samlParams"] = g["samlParams"];
        if (g["uris"] !== undefined) body["uris"] = g["uris"];
        if (g["userEmail"] !== undefined) body["userEmail"] = g["userEmail"];
        if (g["contactCenterId"] !== undefined) {
          body["contactCenterId"] = g["contactCenterId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a contactCenters",
      arguments: z.object({
        identifier: z.string().describe("The name of the contactCenters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update contactCenters attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["adminUser"] !== undefined) body["adminUser"] = g["adminUser"];
        if (g["advancedReportingEnabled"] !== undefined) {
          body["advancedReportingEnabled"] = g["advancedReportingEnabled"];
        }
        if (g["ccaipManagedUsers"] !== undefined) {
          body["ccaipManagedUsers"] = g["ccaipManagedUsers"];
        }
        if (g["critical"] !== undefined) body["critical"] = g["critical"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["early"] !== undefined) body["early"] = g["early"];
        if (g["featureConfig"] !== undefined) {
          body["featureConfig"] = g["featureConfig"];
        }
        if (g["instanceConfig"] !== undefined) {
          body["instanceConfig"] = g["instanceConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["normal"] !== undefined) body["normal"] = g["normal"];
        if (g["privateAccess"] !== undefined) {
          body["privateAccess"] = g["privateAccess"];
        }
        if (g["samlParams"] !== undefined) body["samlParams"] = g["samlParams"];
        if (g["uris"] !== undefined) body["uris"] = g["uris"];
        if (g["userEmail"] !== undefined) body["userEmail"] = g["userEmail"];
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
      description: "Delete the contactCenters",
      arguments: z.object({
        identifier: z.string().describe("The name of the contactCenters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync contactCenters state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
