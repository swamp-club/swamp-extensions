// Auto-generated extension model for @swamp/gcp/looker/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Looker (Google Cloud core) Instances.
 *
 * A Looker instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://looker.googleapis.com/";

const GET_CONFIG = {
  "id": "looker.projects.locations.instances.get",
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
  "id": "looker.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "looker.projects.locations.instances.patch",
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
  "id": "looker.projects.locations.instances.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  adminSettings: z.object({
    allowedEmailDomains: z.array(z.string()).describe(
      "Email domain allowlist for the instance.",
    ).optional(),
  }).describe("Looker instance Admin settings fields.").optional(),
  classType: z.enum(["CLASS_TYPE_UNSPECIFIED", "R1", "P1"]).describe(
    "Optional. Storage class of the instance.",
  ).optional(),
  consumerNetwork: z.string().describe(
    "Network name in the consumer project. Format: `projects/{project}/global/networks/{network}`. Note that the consumer network may be in a different GCP project than the consumer project that is hosting the Looker Instance.",
  ).optional(),
  controlledEgressConfig: z.object({
    egressFqdns: z.array(z.string()).describe(
      "Optional. List of fully qualified domain names to be added to the allowlist for outbound traffic.",
    ).optional(),
    marketplaceEnabled: z.boolean().describe(
      "Optional. Whether marketplace is enabled.",
    ).optional(),
    webProxyIps: z.array(z.string()).describe(
      "Output only. The list of IP addresses used by Secure Web Proxy for outbound traffic.",
    ).optional(),
  }).describe("Controlled egress configuration.").optional(),
  controlledEgressEnabled: z.boolean().describe(
    "Optional. Whether controlled egress is enabled on the Looker instance.",
  ).optional(),
  customDomain: z.object({
    domain: z.string().describe("Domain name.").optional(),
    state: z.enum([
      "CUSTOM_DOMAIN_STATE_UNSPECIFIED",
      "UNVERIFIED",
      "VERIFIED",
      "MODIFYING",
      "AVAILABLE",
      "UNAVAILABLE",
      "UNKNOWN",
    ]).describe("Domain state.").optional(),
  }).describe("Custom domain information.").optional(),
  denyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    time: z.object({
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
  }).describe("Specifies the maintenance denial period.").optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "Name of the CMEK key in KMS (input parameter).",
    ).optional(),
    kmsKeyNameVersion: z.string().describe(
      "Output only. Full name and version of the CMEK key currently in use to encrypt Looker data. Format: `projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key}/cryptoKeyVersions/{version}`. Empty if CMEK is not configured in this instance.",
    ).optional(),
    kmsKeyState: z.enum(["KMS_KEY_STATE_UNSPECIFIED", "VALID", "REVOKED"])
      .describe("Output only. Status of the CMEK key.").optional(),
  }).describe("Encryption configuration (i.e. CMEK).").optional(),
  fipsEnabled: z.boolean().describe(
    "Optional. Whether FIPS is enabled on the Looker instance.",
  ).optional(),
  geminiEnabled: z.boolean().describe(
    "Optional. Whether Gemini feature is enabled on the Looker instance or not.",
  ).optional(),
  lastDenyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    time: z.object({
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
  }).describe("Specifies the maintenance denial period.").optional(),
  linkedLspProjectNumber: z.string().describe(
    "Optional. Linked Google Cloud Project Number for Looker Studio Pro.",
  ).optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe("The scheduled end time for the maintenance.")
      .optional(),
    startTime: z.string().describe(
      "The scheduled start time for the maintenance.",
    ).optional(),
  }).describe("Published upcoming future maintenance schedule.").optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe(
      "Required. Day of the week for this MaintenanceWindow (in UTC).",
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
  }).describe("Specifies the recurring maintenance window.").optional(),
  oauthConfig: z.object({
    clientId: z.string().describe(
      "Input only. Client ID from an external OAuth application. This is an input-only field, and thus will not be set in any responses.",
    ).optional(),
    clientSecret: z.string().describe(
      "Input only. Client secret from an external OAuth application. This is an input-only field, and thus will not be set in any responses.",
    ).optional(),
    sharedOauthClientEnabled: z.boolean().describe(
      "Optional. Whether to use the shared OAuth client. Instances specifying this field do not need to provide client_id and client_secret.",
    ).optional(),
  }).describe("Looker instance OAuth login settings.").optional(),
  periodicExportConfig: z.object({
    gcsUri: z.string().describe(
      "Required. Cloud Storage bucket URI for periodic export. Format: gs://{bucket_name}",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. Name of the CMEK key in KMS. Format: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}",
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
  }).describe("Configuration for periodic export.").optional(),
  platformEdition: z.enum([
    "PLATFORM_EDITION_UNSPECIFIED",
    "LOOKER_CORE_TRIAL",
    "LOOKER_CORE_STANDARD",
    "LOOKER_CORE_STANDARD_ANNUAL",
    "LOOKER_CORE_ENTERPRISE_ANNUAL",
    "LOOKER_CORE_EMBED_ANNUAL",
    "LOOKER_CORE_NONPROD_STANDARD_ANNUAL",
    "LOOKER_CORE_NONPROD_ENTERPRISE_ANNUAL",
    "LOOKER_CORE_NONPROD_EMBED_ANNUAL",
    "LOOKER_CORE_TRIAL_STANDARD",
    "LOOKER_CORE_TRIAL_ENTERPRISE",
    "LOOKER_CORE_TRIAL_EMBED",
  ]).describe("Platform edition.").optional(),
  privateIpEnabled: z.boolean().describe(
    "Whether private IP is enabled on the Looker instance.",
  ).optional(),
  pscConfig: z.object({
    allowedVpcs: z.array(z.string()).describe(
      "Optional. List of VPCs that are allowed ingress into looker. Format: projects/{project}/global/networks/{network}",
    ).optional(),
    lookerServiceAttachmentUri: z.string().describe(
      "Output only. URI of the Looker service attachment.",
    ).optional(),
    serviceAttachments: z.array(z.object({
      connectionStatus: z.enum([
        "UNKNOWN",
        "ACCEPTED",
        "PENDING",
        "REJECTED",
        "NEEDS_ATTENTION",
        "CLOSED",
      ]).describe("Output only. Connection status.").optional(),
      failureReason: z.string().describe(
        "Output only. Reason the service attachment creation failed. This value will only be populated if the service attachment encounters an issue during provisioning.",
      ).optional(),
      localFqdn: z.string().describe(
        "Optional. Fully qualified domain name that will be used in the private DNS record created for the service attachment.",
      ).optional(),
      localFqdns: z.array(z.string()).describe(
        "Optional. List of fully qualified domain names that will be used in the private DNS record created for the service attachment.",
      ).optional(),
      targetServiceAttachmentUri: z.string().describe(
        "Required. URI of the service attachment to connect to. Format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment}",
      ).optional(),
    })).describe("Optional. List of egress service attachment configurations.")
      .optional(),
  }).describe(
    "Information for Private Service Connect (PSC) setup for a Looker instance.",
  ).optional(),
  pscEnabled: z.boolean().describe(
    "Optional. Whether to use Private Service Connect (PSC) for private IP connectivity. If true, neither `public_ip_enabled` nor `private_ip_enabled` can be true.",
  ).optional(),
  publicIpEnabled: z.boolean().describe(
    "Whether public IP is enabled on the Looker instance.",
  ).optional(),
  reservedRange: z.string().describe(
    "Name of a reserved IP address range within the Instance.consumer_network, to be used for private services access connection. May or may not be specified in a create request.",
  ).optional(),
  userMetadata: z.object({
    additionalDeveloperUserCount: z.number().int().describe(
      "Optional. The number of additional developer users the instance owner has purchased.",
    ).optional(),
    additionalStandardUserCount: z.number().int().describe(
      "Optional. The number of additional standard users the instance owner has purchased.",
    ).optional(),
    additionalViewerUserCount: z.number().int().describe(
      "Optional. The number of additional viewer users the instance owner has purchased.",
    ).optional(),
  }).describe("Metadata about users for a Looker instance.").optional(),
  instanceId: z.string().describe(
    "Required. The unique instance identifier. Must contain only lowercase letters, numbers, or hyphens, with the first character a letter and the last a letter or a number. 63 characters maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminSettings: z.object({
    allowedEmailDomains: z.array(z.string()),
  }).optional(),
  classType: z.string().optional(),
  consumerNetwork: z.string().optional(),
  controlledEgressConfig: z.object({
    egressFqdns: z.array(z.string()),
    marketplaceEnabled: z.boolean(),
    webProxyIps: z.array(z.string()),
  }).optional(),
  controlledEgressEnabled: z.boolean().optional(),
  createTime: z.string().optional(),
  customDomain: z.object({
    domain: z.string(),
    state: z.string(),
  }).optional(),
  denyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    startDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    time: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
  }).optional(),
  egressPublicIp: z.string().optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string(),
    kmsKeyNameVersion: z.string(),
    kmsKeyState: z.string(),
  }).optional(),
  fipsEnabled: z.boolean().optional(),
  geminiEnabled: z.boolean().optional(),
  ingressPrivateIp: z.string().optional(),
  ingressPublicIp: z.string().optional(),
  lastDenyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    startDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    time: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
  }).optional(),
  linkedLspProjectNumber: z.string().optional(),
  lookerUri: z.string().optional(),
  lookerVersion: z.string().optional(),
  maintenanceSchedule: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.string(),
    startTime: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
  }).optional(),
  name: z.string(),
  oauthConfig: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    sharedOauthClientEnabled: z.boolean(),
  }).optional(),
  periodicExportConfig: z.object({
    gcsUri: z.string(),
    kmsKey: z.string(),
    startTime: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
  }).optional(),
  platformEdition: z.string().optional(),
  privateIpEnabled: z.boolean().optional(),
  pscConfig: z.object({
    allowedVpcs: z.array(z.string()),
    lookerServiceAttachmentUri: z.string(),
    serviceAttachments: z.array(z.object({
      connectionStatus: z.string(),
      failureReason: z.string(),
      localFqdn: z.string(),
      localFqdns: z.array(z.string()),
      targetServiceAttachmentUri: z.string(),
    })),
  }).optional(),
  pscEnabled: z.boolean().optional(),
  publicIpEnabled: z.boolean().optional(),
  reservedRange: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  userMetadata: z.object({
    additionalDeveloperUserCount: z.number(),
    additionalStandardUserCount: z.number(),
    additionalViewerUserCount: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adminSettings: z.object({
    allowedEmailDomains: z.array(z.string()).describe(
      "Email domain allowlist for the instance.",
    ).optional(),
  }).describe("Looker instance Admin settings fields.").optional(),
  classType: z.enum(["CLASS_TYPE_UNSPECIFIED", "R1", "P1"]).describe(
    "Optional. Storage class of the instance.",
  ).optional(),
  consumerNetwork: z.string().describe(
    "Network name in the consumer project. Format: `projects/{project}/global/networks/{network}`. Note that the consumer network may be in a different GCP project than the consumer project that is hosting the Looker Instance.",
  ).optional(),
  controlledEgressConfig: z.object({
    egressFqdns: z.array(z.string()).describe(
      "Optional. List of fully qualified domain names to be added to the allowlist for outbound traffic.",
    ).optional(),
    marketplaceEnabled: z.boolean().describe(
      "Optional. Whether marketplace is enabled.",
    ).optional(),
    webProxyIps: z.array(z.string()).describe(
      "Output only. The list of IP addresses used by Secure Web Proxy for outbound traffic.",
    ).optional(),
  }).describe("Controlled egress configuration.").optional(),
  controlledEgressEnabled: z.boolean().describe(
    "Optional. Whether controlled egress is enabled on the Looker instance.",
  ).optional(),
  customDomain: z.object({
    domain: z.string().describe("Domain name.").optional(),
    state: z.enum([
      "CUSTOM_DOMAIN_STATE_UNSPECIFIED",
      "UNVERIFIED",
      "VERIFIED",
      "MODIFYING",
      "AVAILABLE",
      "UNAVAILABLE",
      "UNKNOWN",
    ]).describe("Domain state.").optional(),
  }).describe("Custom domain information.").optional(),
  denyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    time: z.object({
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
  }).describe("Specifies the maintenance denial period.").optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "Name of the CMEK key in KMS (input parameter).",
    ).optional(),
    kmsKeyNameVersion: z.string().describe(
      "Output only. Full name and version of the CMEK key currently in use to encrypt Looker data. Format: `projects/{project}/locations/{location}/keyRings/{ring}/cryptoKeys/{key}/cryptoKeyVersions/{version}`. Empty if CMEK is not configured in this instance.",
    ).optional(),
    kmsKeyState: z.enum(["KMS_KEY_STATE_UNSPECIFIED", "VALID", "REVOKED"])
      .describe("Output only. Status of the CMEK key.").optional(),
  }).describe("Encryption configuration (i.e. CMEK).").optional(),
  fipsEnabled: z.boolean().describe(
    "Optional. Whether FIPS is enabled on the Looker instance.",
  ).optional(),
  geminiEnabled: z.boolean().describe(
    "Optional. Whether Gemini feature is enabled on the Looker instance or not.",
  ).optional(),
  lastDenyMaintenancePeriod: z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    time: z.object({
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
  }).describe("Specifies the maintenance denial period.").optional(),
  linkedLspProjectNumber: z.string().describe(
    "Optional. Linked Google Cloud Project Number for Looker Studio Pro.",
  ).optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe("The scheduled end time for the maintenance.")
      .optional(),
    startTime: z.string().describe(
      "The scheduled start time for the maintenance.",
    ).optional(),
  }).describe("Published upcoming future maintenance schedule.").optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe(
      "Required. Day of the week for this MaintenanceWindow (in UTC).",
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
  }).describe("Specifies the recurring maintenance window.").optional(),
  oauthConfig: z.object({
    clientId: z.string().describe(
      "Input only. Client ID from an external OAuth application. This is an input-only field, and thus will not be set in any responses.",
    ).optional(),
    clientSecret: z.string().describe(
      "Input only. Client secret from an external OAuth application. This is an input-only field, and thus will not be set in any responses.",
    ).optional(),
    sharedOauthClientEnabled: z.boolean().describe(
      "Optional. Whether to use the shared OAuth client. Instances specifying this field do not need to provide client_id and client_secret.",
    ).optional(),
  }).describe("Looker instance OAuth login settings.").optional(),
  periodicExportConfig: z.object({
    gcsUri: z.string().describe(
      "Required. Cloud Storage bucket URI for periodic export. Format: gs://{bucket_name}",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. Name of the CMEK key in KMS. Format: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}",
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
  }).describe("Configuration for periodic export.").optional(),
  platformEdition: z.enum([
    "PLATFORM_EDITION_UNSPECIFIED",
    "LOOKER_CORE_TRIAL",
    "LOOKER_CORE_STANDARD",
    "LOOKER_CORE_STANDARD_ANNUAL",
    "LOOKER_CORE_ENTERPRISE_ANNUAL",
    "LOOKER_CORE_EMBED_ANNUAL",
    "LOOKER_CORE_NONPROD_STANDARD_ANNUAL",
    "LOOKER_CORE_NONPROD_ENTERPRISE_ANNUAL",
    "LOOKER_CORE_NONPROD_EMBED_ANNUAL",
    "LOOKER_CORE_TRIAL_STANDARD",
    "LOOKER_CORE_TRIAL_ENTERPRISE",
    "LOOKER_CORE_TRIAL_EMBED",
  ]).describe("Platform edition.").optional(),
  privateIpEnabled: z.boolean().describe(
    "Whether private IP is enabled on the Looker instance.",
  ).optional(),
  pscConfig: z.object({
    allowedVpcs: z.array(z.string()).describe(
      "Optional. List of VPCs that are allowed ingress into looker. Format: projects/{project}/global/networks/{network}",
    ).optional(),
    lookerServiceAttachmentUri: z.string().describe(
      "Output only. URI of the Looker service attachment.",
    ).optional(),
    serviceAttachments: z.array(z.object({
      connectionStatus: z.enum([
        "UNKNOWN",
        "ACCEPTED",
        "PENDING",
        "REJECTED",
        "NEEDS_ATTENTION",
        "CLOSED",
      ]).describe("Output only. Connection status.").optional(),
      failureReason: z.string().describe(
        "Output only. Reason the service attachment creation failed. This value will only be populated if the service attachment encounters an issue during provisioning.",
      ).optional(),
      localFqdn: z.string().describe(
        "Optional. Fully qualified domain name that will be used in the private DNS record created for the service attachment.",
      ).optional(),
      localFqdns: z.array(z.string()).describe(
        "Optional. List of fully qualified domain names that will be used in the private DNS record created for the service attachment.",
      ).optional(),
      targetServiceAttachmentUri: z.string().describe(
        "Required. URI of the service attachment to connect to. Format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment}",
      ).optional(),
    })).describe("Optional. List of egress service attachment configurations.")
      .optional(),
  }).describe(
    "Information for Private Service Connect (PSC) setup for a Looker instance.",
  ).optional(),
  pscEnabled: z.boolean().describe(
    "Optional. Whether to use Private Service Connect (PSC) for private IP connectivity. If true, neither `public_ip_enabled` nor `private_ip_enabled` can be true.",
  ).optional(),
  publicIpEnabled: z.boolean().describe(
    "Whether public IP is enabled on the Looker instance.",
  ).optional(),
  reservedRange: z.string().describe(
    "Name of a reserved IP address range within the Instance.consumer_network, to be used for private services access connection. May or may not be specified in a create request.",
  ).optional(),
  userMetadata: z.object({
    additionalDeveloperUserCount: z.number().int().describe(
      "Optional. The number of additional developer users the instance owner has purchased.",
    ).optional(),
    additionalStandardUserCount: z.number().int().describe(
      "Optional. The number of additional standard users the instance owner has purchased.",
    ).optional(),
    additionalViewerUserCount: z.number().int().describe(
      "Optional. The number of additional viewer users the instance owner has purchased.",
    ).optional(),
  }).describe("Metadata about users for a Looker instance.").optional(),
  instanceId: z.string().describe(
    "Required. The unique instance identifier. Must contain only lowercase letters, numbers, or hyphens, with the first character a letter and the last a letter or a number. 63 characters maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Looker (Google Cloud core) Instances. Registered at `@swamp/gcp/looker/instances`. */
export const model = {
  type: "@swamp/gcp/looker/instances",
  version: "2026.05.18.1",
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
      description: "Added: catalogIntegrationOptOut, ingressIpAllowlistConfig",
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
      description:
        "Removed: catalogIntegrationOptOut, ingressIpAllowlistConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          catalogIntegrationOptOut: _catalogIntegrationOptOut,
          ingressIpAllowlistConfig: _ingressIpAllowlistConfig,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Looker instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["adminSettings"] !== undefined) {
          body["adminSettings"] = g["adminSettings"];
        }
        if (g["classType"] !== undefined) body["classType"] = g["classType"];
        if (g["consumerNetwork"] !== undefined) {
          body["consumerNetwork"] = g["consumerNetwork"];
        }
        if (g["controlledEgressConfig"] !== undefined) {
          body["controlledEgressConfig"] = g["controlledEgressConfig"];
        }
        if (g["controlledEgressEnabled"] !== undefined) {
          body["controlledEgressEnabled"] = g["controlledEgressEnabled"];
        }
        if (g["customDomain"] !== undefined) {
          body["customDomain"] = g["customDomain"];
        }
        if (g["denyMaintenancePeriod"] !== undefined) {
          body["denyMaintenancePeriod"] = g["denyMaintenancePeriod"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["fipsEnabled"] !== undefined) {
          body["fipsEnabled"] = g["fipsEnabled"];
        }
        if (g["geminiEnabled"] !== undefined) {
          body["geminiEnabled"] = g["geminiEnabled"];
        }
        if (g["lastDenyMaintenancePeriod"] !== undefined) {
          body["lastDenyMaintenancePeriod"] = g["lastDenyMaintenancePeriod"];
        }
        if (g["linkedLspProjectNumber"] !== undefined) {
          body["linkedLspProjectNumber"] = g["linkedLspProjectNumber"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceWindow"] !== undefined) {
          body["maintenanceWindow"] = g["maintenanceWindow"];
        }
        if (g["oauthConfig"] !== undefined) {
          body["oauthConfig"] = g["oauthConfig"];
        }
        if (g["periodicExportConfig"] !== undefined) {
          body["periodicExportConfig"] = g["periodicExportConfig"];
        }
        if (g["platformEdition"] !== undefined) {
          body["platformEdition"] = g["platformEdition"];
        }
        if (g["privateIpEnabled"] !== undefined) {
          body["privateIpEnabled"] = g["privateIpEnabled"];
        }
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["pscEnabled"] !== undefined) body["pscEnabled"] = g["pscEnabled"];
        if (g["publicIpEnabled"] !== undefined) {
          body["publicIpEnabled"] = g["publicIpEnabled"];
        }
        if (g["reservedRange"] !== undefined) {
          body["reservedRange"] = g["reservedRange"];
        }
        if (g["userMetadata"] !== undefined) {
          body["userMetadata"] = g["userMetadata"];
        }
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["adminSettings"] !== undefined) {
          body["adminSettings"] = g["adminSettings"];
        }
        if (g["classType"] !== undefined) body["classType"] = g["classType"];
        if (g["consumerNetwork"] !== undefined) {
          body["consumerNetwork"] = g["consumerNetwork"];
        }
        if (g["controlledEgressConfig"] !== undefined) {
          body["controlledEgressConfig"] = g["controlledEgressConfig"];
        }
        if (g["controlledEgressEnabled"] !== undefined) {
          body["controlledEgressEnabled"] = g["controlledEgressEnabled"];
        }
        if (g["customDomain"] !== undefined) {
          body["customDomain"] = g["customDomain"];
        }
        if (g["denyMaintenancePeriod"] !== undefined) {
          body["denyMaintenancePeriod"] = g["denyMaintenancePeriod"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["fipsEnabled"] !== undefined) {
          body["fipsEnabled"] = g["fipsEnabled"];
        }
        if (g["geminiEnabled"] !== undefined) {
          body["geminiEnabled"] = g["geminiEnabled"];
        }
        if (g["lastDenyMaintenancePeriod"] !== undefined) {
          body["lastDenyMaintenancePeriod"] = g["lastDenyMaintenancePeriod"];
        }
        if (g["linkedLspProjectNumber"] !== undefined) {
          body["linkedLspProjectNumber"] = g["linkedLspProjectNumber"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceWindow"] !== undefined) {
          body["maintenanceWindow"] = g["maintenanceWindow"];
        }
        if (g["oauthConfig"] !== undefined) {
          body["oauthConfig"] = g["oauthConfig"];
        }
        if (g["periodicExportConfig"] !== undefined) {
          body["periodicExportConfig"] = g["periodicExportConfig"];
        }
        if (g["platformEdition"] !== undefined) {
          body["platformEdition"] = g["platformEdition"];
        }
        if (g["privateIpEnabled"] !== undefined) {
          body["privateIpEnabled"] = g["privateIpEnabled"];
        }
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["pscEnabled"] !== undefined) body["pscEnabled"] = g["pscEnabled"];
        if (g["publicIpEnabled"] !== undefined) {
          body["publicIpEnabled"] = g["publicIpEnabled"];
        }
        if (g["reservedRange"] !== undefined) {
          body["reservedRange"] = g["reservedRange"];
        }
        if (g["userMetadata"] !== undefined) {
          body["userMetadata"] = g["userMetadata"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
    export: {
      description: "export",
      arguments: z.object({
        encryptionConfig: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "looker.projects.locations.instances.export",
            "path": "v1/{+name}:export",
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
    import: {
      description: "import",
      arguments: z.object({
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "looker.projects.locations.instances.import",
            "path": "v1/{+name}:import",
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
    restart: {
      description: "restart",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "looker.projects.locations.instances.restart",
            "path": "v1/{+name}:restart",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "looker.projects.locations.instances.restore",
            "path": "v1/{+name}:restore",
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
