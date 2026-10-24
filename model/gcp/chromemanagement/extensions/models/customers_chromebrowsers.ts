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

// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-chromebrowsers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.ChromeBrowsers.
 *
 * A device with managed Chrome Browsers.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/chromeBrowsers/${shortName}`;
}

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.chromeBrowsers.get",
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

const PATCH_CONFIG = {
  "id": "chromemanagement.customers.chromeBrowsers.patch",
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
  "id": "chromemanagement.customers.chromeBrowsers.delete",
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
  "id": "chromemanagement.customers.chromeBrowsers.list",
  "path": "v1/{+parent}/chromeBrowsers",
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/chrome.management.appdetails.readonly",
  "https://www.googleapis.com/auth/chrome.management.profiles",
  "https://www.googleapis.com/auth/chrome.management.profiles.readonly",
  "https://www.googleapis.com/auth/chrome.management.reports.readonly",
  "https://www.googleapis.com/auth/chrome.management.securityinsights",
  "https://www.googleapis.com/auth/chrome.management.securityinsights.readonly",
  "https://www.googleapis.com/auth/chrome.management.telemetry.readonly",
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
  annotatedAssetId: z.string().describe(
    "Optional. Asset identifier as annotated by the administrator or specified during enrollment.",
  ).optional(),
  annotatedLocation: z.string().describe(
    "Optional. Address or location of the device as annotated by the administrator.",
  ).optional(),
  annotatedNotes: z.string().describe(
    "Optional. Notes about this device as annotated by the administrator.",
  ).optional(),
  annotatedUser: z.string().describe(
    "Optional. User of the device as annotated by the administrator.",
  ).optional(),
  attestationCredential: z.object({
    keyRotationTime: z.string().describe(
      "Output only. Latest rotation timestamp of the public key rotation.",
    ).optional(),
    keyTrustLevel: z.enum([
      "KEY_TRUST_LEVEL_UNSPECIFIED",
      "CHROME_BROWSER_HW_KEY",
      "CHROME_BROWSER_OS_KEY",
    ]).describe("Output only. Trust level of the public key.").optional(),
    keyType: z.enum(["KEY_TYPE_UNSPECIFIED", "RSA_KEY", "EC_KEY"]).describe(
      "Output only. Type of the public key.",
    ).optional(),
    publicKey: z.string().describe("Output only. Value of the public key.")
      .optional(),
  }).describe(
    "Output only. The attestation credential used for Device Trust Connector.",
  ).optional(),
  browserPermanentId: z.string().describe(
    "Output only. Unique identifier of Chrome Browser.",
  ).optional(),
  browserVersions: z.array(z.string()).describe(
    "Output only. List of all browser versions installed on this device.",
  ).optional(),
  browsers: z.array(z.object({
    browserVersion: z.string().describe(
      "Output only. Browser version installed.",
    ).optional(),
    channel: z.enum([
      "CHANNEL_UNSPECIFIED",
      "CHANNEL_STABLE",
      "CHANNEL_BETA",
      "CHANNEL_DEV",
      "CHANNEL_CANARY",
    ]).describe("Output only. The channel of the browser installed.")
      .optional(),
    executablePath: z.string().describe(
      "Output only. The path to the Chrome.exe executable for this browser.",
    ).optional(),
    lastPolicyFetchTime: z.string().describe(
      "Output only. The time when the last request to fetch policies succeeded on this Chrome browser.",
    ).optional(),
    lastStatusReportTime: z.string().describe(
      "Output only. The time when the last report was received from this Chrome browser.",
    ).optional(),
    pendingInstallVersion: z.string().describe(
      'Output only. Pending version of a browser is installed. This field is only set when the current active browser has a different version as in "browser_version".',
    ).optional(),
    plugins: z.array(z.object({
      description: z.string().describe(
        "Output only. The description of the installed plugin.",
      ).optional(),
      filename: z.string().describe(
        "Output only. The filename of the installed plugin.",
      ).optional(),
      pluginName: z.string().describe(
        "Output only. The name of the installed plugin.",
      ).optional(),
    })).describe(
      "Output only. List of all plugins installed on this Chrome browser.",
    ).optional(),
    profiles: z.array(z.object({
      chromeSignedInUserEmail: z.string().describe(
        "Output only. The email of the user signed in to this profile, if any.",
      ).optional(),
      extensionPolicies: z.array(z.unknown()).describe(
        "Output only. The list of extensions with applied extension policies.",
      ).optional(),
      extensions: z.array(z.unknown()).describe(
        "Output only. The list of extensions installed for this profile.",
      ).optional(),
      id: z.string().describe("Output only. A unique ID for this profile.")
        .optional(),
      lastPolicyFetchTime: z.string().describe(
        "Output only. The time when the last request to fetch policies succeeded for this profile.",
      ).optional(),
      lastStatusReportTime: z.string().describe(
        "Output only. The time when the last report was received from this profile.",
      ).optional(),
      profileName: z.string().describe(
        "Output only. The name given to this profile.",
      ).optional(),
      safeBrowsingWarnings: z.string().describe(
        "Output only. The number of safe browsing warnings that were shown on this profile.",
      ).optional(),
      safeBrowsingWarningsClickThroughs: z.string().describe(
        "Output only. The number of safe browsing warnings that were clicked through on this profile.",
      ).optional(),
      safeBrowsingWarningsResetTime: z.string().describe(
        "Output only. The last time the safe browsing warning info was reset to 0.",
      ).optional(),
      userPolicies: z.array(z.unknown()).describe(
        "Output only. The list of Chrome browser policies applied to this profile.",
      ).optional(),
    })).describe("Output only. The list of profiles for this browser.")
      .optional(),
  })).describe("Output only. List of Chrome browsers installed on this device.")
    .optional(),
  deviceIdentifiersHistory: z.object({
    deviceIdCollision: z.boolean().describe(
      "Output only. The device id is potentially being used by multiple devices.",
    ).optional(),
    lastDeviceIdCollisionDetectionTime: z.string().describe(
      "Output only. The last time we detected the device id collision.",
    ).optional(),
    records: z.array(z.object({
      firstRecordTime: z.string().describe(
        "Output only. The first time these identifiers were reported.",
      ).optional(),
      identifiers: z.object({
        hostName: z.string().describe("Output only. The device's host name.")
          .optional(),
        machineName: z.string().describe(
          "Output only. The name of the machine associated with the device.",
        ).optional(),
        serialNumber: z.string().describe(
          "Output only. The device's serial number.",
        ).optional(),
      }).describe("Output only. Device identifiers.").optional(),
      lastActivityTime: z.string().describe(
        "Output only. The time of the last activity of these identifiers either from reporting, policy fetching or registration.",
      ).optional(),
    })).describe(
      "Output only. List of device identifiers sent by this device. In descending order by last_activity_time.",
    ).optional(),
  }).describe(
    "Output only. The history of identifiers reported to this device.",
  ).optional(),
  extensionCount: z.string().describe(
    "Output only. The number of distinct extensions installed on all the Chrome browsers of this device.",
  ).optional(),
  lastActivityTime: z.string().describe(
    "Output only. The time of the last activity on the device device either from reporting, policy fetching or registration.",
  ).optional(),
  lastDeviceUser: z.string().describe(
    "Output only. The last user who logged into a Chrome browser on this device.",
  ).optional(),
  lastDeviceUsers: z.array(z.object({
    lastStatusReportTime: z.string().describe(
      "Output only. The time when this user info last reported a status.",
    ).optional(),
    userName: z.string().describe(
      "Output only. The user name of the user that signed into chrome.",
    ).optional(),
  })).describe(
    "Output only. List of recent browser users, in descending order by last report time.",
  ).optional(),
  lastPolicyFetchTime: z.string().describe(
    "Output only. The time the last policy fetch succeeded on this device.",
  ).optional(),
  lastRegistrationTime: z.string().describe(
    "Output only. The time the device last tried to register.",
  ).optional(),
  lastStatusReportTime: z.string().describe(
    "Output only. The time the device last sent a status report.",
  ).optional(),
  machineExtensionPolicies: z.array(z.object({
    extensionId: z.string().describe(
      "Output only. The id of the extension the policies are applied to.",
    ).optional(),
    extensionName: z.string().describe(
      "Output only. The name of the extension the policies are applied to.",
    ).optional(),
    policies: z.array(z.object({
      error: z.string().describe(
        "Output only. A localized string with all the errors reported when trying to apply this policy, if any.",
      ).optional(),
      policyName: z.string().describe("Output only. The name of the policy.")
        .optional(),
      source: z.enum([
        "POLICY_SOURCE_UNSPECIFIED",
        "MACHINE_PLATFORM",
        "USER_PLATFORM",
        "MACHINE_LEVEL_USER_CLOUD",
        "USER_CLOUD",
        "MACHINE_MERGED",
      ]).describe("Output only. The source of the policy.").optional(),
      value: z.string().describe("Output only. The value of the policy.")
        .optional(),
    })).describe("Output only. List of policies applied to this extension.")
      .optional(),
  })).describe(
    "Output only. The list of all device level policies set for extensions installed in Chrome on this device.",
  ).optional(),
  machineName: z.string().describe("Output only. Machine name.").optional(),
  machinePolicies: z.array(z.object({
    error: z.string().describe(
      "Output only. A localized string with all the errors reported when trying to apply this policy, if any.",
    ).optional(),
    policyName: z.string().describe("Output only. The name of the policy.")
      .optional(),
    source: z.enum([
      "POLICY_SOURCE_UNSPECIFIED",
      "MACHINE_PLATFORM",
      "USER_PLATFORM",
      "MACHINE_LEVEL_USER_CLOUD",
      "USER_CLOUD",
      "MACHINE_MERGED",
    ]).describe("Output only. The source of the policy.").optional(),
    value: z.string().describe("Output only. The value of the policy.")
      .optional(),
  })).describe(
    "Output only. The list of all device level policies set for Chrome browsers on this device.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Format: customers/{customer_id}/chromeBrowsers/{browser_permanent_id}",
  ).optional(),
  omahaRecentFetchTime: z.string().describe(
    "Output only. Recent policy fetch activity by Omaha. Not necessarily the last fetch since this field is only updated daily.",
  ).optional(),
  orgUnitId: z.string().describe(
    "Output only. The obfuscated organizational unit ID of the browser.",
  ).optional(),
  osArchitecture: z.string().describe("Output only. Device CPU architecture.")
    .optional(),
  osPlatform: z.string().describe("Output only. Device Os platform.")
    .optional(),
  osPlatformVersion: z.string().describe(
    "Output only. Device Os platform and version combined.",
  ).optional(),
  osVersion: z.string().describe("Output only. Device Os Version.").optional(),
  policyCount: z.string().describe(
    "Output only. The number of distinct policies set on all the Chrome browsers of this device.",
  ).optional(),
  serialNumber: z.string().describe("Output only. The device's serial number.")
    .optional(),
  virtualDeviceId: z.string().describe(
    "Output only. The initial device id sent by the first Chrome browser that enrolled this device.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  annotatedAssetId: z.string().optional(),
  annotatedLocation: z.string().optional(),
  annotatedNotes: z.string().optional(),
  annotatedUser: z.string().optional(),
  attestationCredential: z.object({
    keyRotationTime: z.string(),
    keyTrustLevel: z.string(),
    keyType: z.string(),
    publicKey: z.string(),
  }).optional(),
  browserPermanentId: z.string().optional(),
  browserVersions: z.array(z.string()).optional(),
  browsers: z.array(z.object({
    browserVersion: z.string(),
    channel: z.string(),
    executablePath: z.string(),
    lastPolicyFetchTime: z.string(),
    lastStatusReportTime: z.string(),
    pendingInstallVersion: z.string(),
    plugins: z.array(z.object({
      description: z.string(),
      filename: z.string(),
      pluginName: z.string(),
    })),
    profiles: z.array(z.object({
      chromeSignedInUserEmail: z.string(),
      extensionPolicies: z.array(z.unknown()),
      extensions: z.array(z.unknown()),
      id: z.string(),
      lastPolicyFetchTime: z.string(),
      lastStatusReportTime: z.string(),
      profileName: z.string(),
      safeBrowsingWarnings: z.string(),
      safeBrowsingWarningsClickThroughs: z.string(),
      safeBrowsingWarningsResetTime: z.string(),
      userPolicies: z.array(z.unknown()),
    })),
  })).optional(),
  deviceIdentifiersHistory: z.object({
    deviceIdCollision: z.boolean(),
    lastDeviceIdCollisionDetectionTime: z.string(),
    records: z.array(z.object({
      firstRecordTime: z.string(),
      identifiers: z.object({
        hostName: z.string(),
        machineName: z.string(),
        serialNumber: z.string(),
      }),
      lastActivityTime: z.string(),
    })),
  }).optional(),
  extensionCount: z.string().optional(),
  lastActivityTime: z.string().optional(),
  lastDeviceUser: z.string().optional(),
  lastDeviceUsers: z.array(z.object({
    lastStatusReportTime: z.string(),
    userName: z.string(),
  })).optional(),
  lastPolicyFetchTime: z.string().optional(),
  lastRegistrationTime: z.string().optional(),
  lastStatusReportTime: z.string().optional(),
  machineExtensionPolicies: z.array(z.object({
    extensionId: z.string(),
    extensionName: z.string(),
    policies: z.array(z.object({
      error: z.string(),
      policyName: z.string(),
      source: z.string(),
      value: z.string(),
    })),
  })).optional(),
  machineName: z.string().optional(),
  machinePolicies: z.array(z.object({
    error: z.string(),
    policyName: z.string(),
    source: z.string(),
    value: z.string(),
  })).optional(),
  name: z.string(),
  omahaRecentFetchTime: z.string().optional(),
  orgUnitId: z.string().optional(),
  osArchitecture: z.string().optional(),
  osPlatform: z.string().optional(),
  osPlatformVersion: z.string().optional(),
  osVersion: z.string().optional(),
  policyCount: z.string().optional(),
  serialNumber: z.string().optional(),
  virtualDeviceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  annotatedAssetId: z.string().describe(
    "Optional. Asset identifier as annotated by the administrator or specified during enrollment.",
  ).optional(),
  annotatedLocation: z.string().describe(
    "Optional. Address or location of the device as annotated by the administrator.",
  ).optional(),
  annotatedNotes: z.string().describe(
    "Optional. Notes about this device as annotated by the administrator.",
  ).optional(),
  annotatedUser: z.string().describe(
    "Optional. User of the device as annotated by the administrator.",
  ).optional(),
  attestationCredential: z.object({
    keyRotationTime: z.string().describe(
      "Output only. Latest rotation timestamp of the public key rotation.",
    ).optional(),
    keyTrustLevel: z.enum([
      "KEY_TRUST_LEVEL_UNSPECIFIED",
      "CHROME_BROWSER_HW_KEY",
      "CHROME_BROWSER_OS_KEY",
    ]).describe("Output only. Trust level of the public key.").optional(),
    keyType: z.enum(["KEY_TYPE_UNSPECIFIED", "RSA_KEY", "EC_KEY"]).describe(
      "Output only. Type of the public key.",
    ).optional(),
    publicKey: z.string().describe("Output only. Value of the public key.")
      .optional(),
  }).describe(
    "Output only. The attestation credential used for Device Trust Connector.",
  ).optional(),
  browserPermanentId: z.string().describe(
    "Output only. Unique identifier of Chrome Browser.",
  ).optional(),
  browserVersions: z.array(z.string()).describe(
    "Output only. List of all browser versions installed on this device.",
  ).optional(),
  browsers: z.array(z.object({
    browserVersion: z.string().describe(
      "Output only. Browser version installed.",
    ).optional(),
    channel: z.enum([
      "CHANNEL_UNSPECIFIED",
      "CHANNEL_STABLE",
      "CHANNEL_BETA",
      "CHANNEL_DEV",
      "CHANNEL_CANARY",
    ]).describe("Output only. The channel of the browser installed.")
      .optional(),
    executablePath: z.string().describe(
      "Output only. The path to the Chrome.exe executable for this browser.",
    ).optional(),
    lastPolicyFetchTime: z.string().describe(
      "Output only. The time when the last request to fetch policies succeeded on this Chrome browser.",
    ).optional(),
    lastStatusReportTime: z.string().describe(
      "Output only. The time when the last report was received from this Chrome browser.",
    ).optional(),
    pendingInstallVersion: z.string().describe(
      'Output only. Pending version of a browser is installed. This field is only set when the current active browser has a different version as in "browser_version".',
    ).optional(),
    plugins: z.array(z.object({
      description: z.string().describe(
        "Output only. The description of the installed plugin.",
      ).optional(),
      filename: z.string().describe(
        "Output only. The filename of the installed plugin.",
      ).optional(),
      pluginName: z.string().describe(
        "Output only. The name of the installed plugin.",
      ).optional(),
    })).describe(
      "Output only. List of all plugins installed on this Chrome browser.",
    ).optional(),
    profiles: z.array(z.object({
      chromeSignedInUserEmail: z.string().describe(
        "Output only. The email of the user signed in to this profile, if any.",
      ).optional(),
      extensionPolicies: z.array(z.unknown()).describe(
        "Output only. The list of extensions with applied extension policies.",
      ).optional(),
      extensions: z.array(z.unknown()).describe(
        "Output only. The list of extensions installed for this profile.",
      ).optional(),
      id: z.string().describe("Output only. A unique ID for this profile.")
        .optional(),
      lastPolicyFetchTime: z.string().describe(
        "Output only. The time when the last request to fetch policies succeeded for this profile.",
      ).optional(),
      lastStatusReportTime: z.string().describe(
        "Output only. The time when the last report was received from this profile.",
      ).optional(),
      profileName: z.string().describe(
        "Output only. The name given to this profile.",
      ).optional(),
      safeBrowsingWarnings: z.string().describe(
        "Output only. The number of safe browsing warnings that were shown on this profile.",
      ).optional(),
      safeBrowsingWarningsClickThroughs: z.string().describe(
        "Output only. The number of safe browsing warnings that were clicked through on this profile.",
      ).optional(),
      safeBrowsingWarningsResetTime: z.string().describe(
        "Output only. The last time the safe browsing warning info was reset to 0.",
      ).optional(),
      userPolicies: z.array(z.unknown()).describe(
        "Output only. The list of Chrome browser policies applied to this profile.",
      ).optional(),
    })).describe("Output only. The list of profiles for this browser.")
      .optional(),
  })).describe("Output only. List of Chrome browsers installed on this device.")
    .optional(),
  deviceIdentifiersHistory: z.object({
    deviceIdCollision: z.boolean().describe(
      "Output only. The device id is potentially being used by multiple devices.",
    ).optional(),
    lastDeviceIdCollisionDetectionTime: z.string().describe(
      "Output only. The last time we detected the device id collision.",
    ).optional(),
    records: z.array(z.object({
      firstRecordTime: z.string().describe(
        "Output only. The first time these identifiers were reported.",
      ).optional(),
      identifiers: z.object({
        hostName: z.string().describe("Output only. The device's host name.")
          .optional(),
        machineName: z.string().describe(
          "Output only. The name of the machine associated with the device.",
        ).optional(),
        serialNumber: z.string().describe(
          "Output only. The device's serial number.",
        ).optional(),
      }).describe("Output only. Device identifiers.").optional(),
      lastActivityTime: z.string().describe(
        "Output only. The time of the last activity of these identifiers either from reporting, policy fetching or registration.",
      ).optional(),
    })).describe(
      "Output only. List of device identifiers sent by this device. In descending order by last_activity_time.",
    ).optional(),
  }).describe(
    "Output only. The history of identifiers reported to this device.",
  ).optional(),
  extensionCount: z.string().describe(
    "Output only. The number of distinct extensions installed on all the Chrome browsers of this device.",
  ).optional(),
  lastActivityTime: z.string().describe(
    "Output only. The time of the last activity on the device device either from reporting, policy fetching or registration.",
  ).optional(),
  lastDeviceUser: z.string().describe(
    "Output only. The last user who logged into a Chrome browser on this device.",
  ).optional(),
  lastDeviceUsers: z.array(z.object({
    lastStatusReportTime: z.string().describe(
      "Output only. The time when this user info last reported a status.",
    ).optional(),
    userName: z.string().describe(
      "Output only. The user name of the user that signed into chrome.",
    ).optional(),
  })).describe(
    "Output only. List of recent browser users, in descending order by last report time.",
  ).optional(),
  lastPolicyFetchTime: z.string().describe(
    "Output only. The time the last policy fetch succeeded on this device.",
  ).optional(),
  lastRegistrationTime: z.string().describe(
    "Output only. The time the device last tried to register.",
  ).optional(),
  lastStatusReportTime: z.string().describe(
    "Output only. The time the device last sent a status report.",
  ).optional(),
  machineExtensionPolicies: z.array(z.object({
    extensionId: z.string().describe(
      "Output only. The id of the extension the policies are applied to.",
    ).optional(),
    extensionName: z.string().describe(
      "Output only. The name of the extension the policies are applied to.",
    ).optional(),
    policies: z.array(z.object({
      error: z.string().describe(
        "Output only. A localized string with all the errors reported when trying to apply this policy, if any.",
      ).optional(),
      policyName: z.string().describe("Output only. The name of the policy.")
        .optional(),
      source: z.enum([
        "POLICY_SOURCE_UNSPECIFIED",
        "MACHINE_PLATFORM",
        "USER_PLATFORM",
        "MACHINE_LEVEL_USER_CLOUD",
        "USER_CLOUD",
        "MACHINE_MERGED",
      ]).describe("Output only. The source of the policy.").optional(),
      value: z.string().describe("Output only. The value of the policy.")
        .optional(),
    })).describe("Output only. List of policies applied to this extension.")
      .optional(),
  })).describe(
    "Output only. The list of all device level policies set for extensions installed in Chrome on this device.",
  ).optional(),
  machineName: z.string().describe("Output only. Machine name.").optional(),
  machinePolicies: z.array(z.object({
    error: z.string().describe(
      "Output only. A localized string with all the errors reported when trying to apply this policy, if any.",
    ).optional(),
    policyName: z.string().describe("Output only. The name of the policy.")
      .optional(),
    source: z.enum([
      "POLICY_SOURCE_UNSPECIFIED",
      "MACHINE_PLATFORM",
      "USER_PLATFORM",
      "MACHINE_LEVEL_USER_CLOUD",
      "USER_CLOUD",
      "MACHINE_MERGED",
    ]).describe("Output only. The source of the policy.").optional(),
    value: z.string().describe("Output only. The value of the policy.")
      .optional(),
  })).describe(
    "Output only. The list of all device level policies set for Chrome browsers on this device.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Format: customers/{customer_id}/chromeBrowsers/{browser_permanent_id}",
  ).optional(),
  omahaRecentFetchTime: z.string().describe(
    "Output only. Recent policy fetch activity by Omaha. Not necessarily the last fetch since this field is only updated daily.",
  ).optional(),
  orgUnitId: z.string().describe(
    "Output only. The obfuscated organizational unit ID of the browser.",
  ).optional(),
  osArchitecture: z.string().describe("Output only. Device CPU architecture.")
    .optional(),
  osPlatform: z.string().describe("Output only. Device Os platform.")
    .optional(),
  osPlatformVersion: z.string().describe(
    "Output only. Device Os platform and version combined.",
  ).optional(),
  osVersion: z.string().describe("Output only. Device Os Version.").optional(),
  policyCount: z.string().describe(
    "Output only. The number of distinct policies set on all the Chrome browsers of this device.",
  ).optional(),
  serialNumber: z.string().describe("Output only. The device's serial number.")
    .optional(),
  virtualDeviceId: z.string().describe(
    "Output only. The initial device id sent by the first Chrome browser that enrolled this device.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Chrome Management Customers.ChromeBrowsers. Registered at `@swamp/gcp/chromemanagement/customers-chromebrowsers`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-chromebrowsers",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.22.1",
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
      description: "A device with managed Chrome Browsers.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a chromeBrowsers",
      arguments: z.object({
        identifier: z.string().describe("The name of the chromeBrowsers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
    update: {
      description: "Update chromeBrowsers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific chromeBrowsers by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["annotatedAssetId"] !== undefined) {
          body["annotatedAssetId"] = g["annotatedAssetId"];
        }
        if (g["annotatedLocation"] !== undefined) {
          body["annotatedLocation"] = g["annotatedLocation"];
        }
        if (g["annotatedNotes"] !== undefined) {
          body["annotatedNotes"] = g["annotatedNotes"];
        }
        if (g["annotatedUser"] !== undefined) {
          body["annotatedUser"] = g["annotatedUser"];
        }
        if (g["attestationCredential"] !== undefined) {
          body["attestationCredential"] = g["attestationCredential"];
        }
        if (g["browserPermanentId"] !== undefined) {
          body["browserPermanentId"] = g["browserPermanentId"];
        }
        if (g["browserVersions"] !== undefined) {
          body["browserVersions"] = g["browserVersions"];
        }
        if (g["browsers"] !== undefined) body["browsers"] = g["browsers"];
        if (g["deviceIdentifiersHistory"] !== undefined) {
          body["deviceIdentifiersHistory"] = g["deviceIdentifiersHistory"];
        }
        if (g["extensionCount"] !== undefined) {
          body["extensionCount"] = g["extensionCount"];
        }
        if (g["lastActivityTime"] !== undefined) {
          body["lastActivityTime"] = g["lastActivityTime"];
        }
        if (g["lastDeviceUser"] !== undefined) {
          body["lastDeviceUser"] = g["lastDeviceUser"];
        }
        if (g["lastDeviceUsers"] !== undefined) {
          body["lastDeviceUsers"] = g["lastDeviceUsers"];
        }
        if (g["lastPolicyFetchTime"] !== undefined) {
          body["lastPolicyFetchTime"] = g["lastPolicyFetchTime"];
        }
        if (g["lastRegistrationTime"] !== undefined) {
          body["lastRegistrationTime"] = g["lastRegistrationTime"];
        }
        if (g["lastStatusReportTime"] !== undefined) {
          body["lastStatusReportTime"] = g["lastStatusReportTime"];
        }
        if (g["machineExtensionPolicies"] !== undefined) {
          body["machineExtensionPolicies"] = g["machineExtensionPolicies"];
        }
        if (g["machineName"] !== undefined) {
          body["machineName"] = g["machineName"];
        }
        if (g["machinePolicies"] !== undefined) {
          body["machinePolicies"] = g["machinePolicies"];
        }
        if (g["omahaRecentFetchTime"] !== undefined) {
          body["omahaRecentFetchTime"] = g["omahaRecentFetchTime"];
        }
        if (g["orgUnitId"] !== undefined) body["orgUnitId"] = g["orgUnitId"];
        if (g["osArchitecture"] !== undefined) {
          body["osArchitecture"] = g["osArchitecture"];
        }
        if (g["osPlatform"] !== undefined) body["osPlatform"] = g["osPlatform"];
        if (g["osPlatformVersion"] !== undefined) {
          body["osPlatformVersion"] = g["osPlatformVersion"];
        }
        if (g["osVersion"] !== undefined) body["osVersion"] = g["osVersion"];
        if (g["policyCount"] !== undefined) {
          body["policyCount"] = g["policyCount"];
        }
        if (g["serialNumber"] !== undefined) {
          body["serialNumber"] = g["serialNumber"];
        }
        if (g["virtualDeviceId"] !== undefined) {
          body["virtualDeviceId"] = g["virtualDeviceId"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
      description: "Delete the chromeBrowsers",
      arguments: z.object({
        identifier: z.string().describe("The name of the chromeBrowsers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync chromeBrowsers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific chromeBrowsers by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
      description: "List chromeBrowsers resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. The filter used to filter browsers. The following fields can be used in the filter: * `browser_permanent_id` * `last_policy_fetch_time` * `os_platform` * `os_architecture` * `os_version` * `machine_name` * `annotated_location` * `annotated_user` * `annotated_asset_id` * `annotated_note` * `org_unit_path` * `org_unit_id` * `last_registration_time` * `os_platform_version` * `browser_version` * `last_status_report_time` * `extension_count` * `policy_count` * `last_device_user` * `last_activity_time` * `device_id_collision` The following functions can be used in the filter: * `in_group(string)`: Filters browsers that belong to the specified Cloud Identity group resource name (e.g. `in_group("groups/{group_id}")`). Any of the above fields or functions can be used to specify a filter, and filtering by multiple fields or functions is supported with AND operator. String type, Integer type fields and enum type fields support `=` and `:` operators. The timestamp type fields support `=`, `<=` and `>=` operators. Timestamps expect an RFC-3339 formatted string enclosed in double quotes (e.g., `"2012-04-21T11:30:00-04:00"`). Wildcard `*` is only supported for `machine_name`, `annotated_asset_id`, and `browser_version`. In addition, global string literal filtering without a field name is supported: a single term (e.g., `ABC`) matches if any indexed string field contains `ABC`, and multiple terms joined by `AND` or whitespace (e.g., `machine AND 73` or `machine 73`) match browsers where every term appears in at least one indexed string field (whereas a single quoted phrase like `"machine 73"` matches the contiguous phrase within a single field).',
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The fields used to specify the ordering of the results. The supported fields are: * `browser_permanent_id` * `last_policy_fetch_time` * `annotated_user` * `annotated_location` * `annotated_asset_id` * `annotated_notes` * `org_unit_path` * `os_version` * `last_registration_time` * `extension_count` * `policy_count` * `last_device_user` * `machine_name` * `browser_version_channel` * `os_platform_version` * `last_activity_time` * `browser_version` By default, sorting is in ascending order, to specify descending order for a field, a suffix ` desc` should be added to the field name. The default ordering is the ascending order of `browser_permanent_id`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of results to return. Maximum and default are 100.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "chromeBrowsers",
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
    move: {
      description: "move",
      arguments: z.object({
        destinationOrgUnitId: z.any().optional(),
        resourceIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["destinationOrgUnitId"] !== undefined) {
          body["destinationOrgUnitId"] = args["destinationOrgUnitId"];
        }
        if (args["resourceIds"] !== undefined) {
          body["resourceIds"] = args["resourceIds"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "chromemanagement.customers.chromeBrowsers.move",
            "path": "v1/{+parent}/chromeBrowsers:move",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
