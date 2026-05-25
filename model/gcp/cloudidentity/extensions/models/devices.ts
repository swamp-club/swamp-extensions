// Auto-generated extension model for @swamp/gcp/cloudidentity/devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity Devices.
 *
 * A Device within the Cloud Identity Devices API. Represents a Device known to Google Cloud, independent of the device ownership, type, and whether it is assigned or in use by a user.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudidentity.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudidentity.devices.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudidentity.devices.create",
  "path": "v1/devices",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "customer": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudidentity.devices.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "customer": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudidentity.devices.list",
  "path": "v1/devices",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "customer": {
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  androidSpecificAttributes: z.object({
    ctsProfileMatch: z.boolean().describe(
      "Whether the device passes Android CTS compliance.",
    ).optional(),
    enabledUnknownSources: z.boolean().describe(
      "Whether applications from unknown sources can be installed on device.",
    ).optional(),
    hasPotentiallyHarmfulApps: z.boolean().describe(
      "Whether any potentially harmful apps were detected on the device.",
    ).optional(),
    ownerProfileAccount: z.boolean().describe(
      "Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles.",
    ).optional(),
    ownershipPrivilege: z.enum([
      "OWNERSHIP_PRIVILEGE_UNSPECIFIED",
      "DEVICE_ADMINISTRATOR",
      "PROFILE_OWNER",
      "DEVICE_OWNER",
    ]).describe("Ownership privileges on device.").optional(),
    supportsWorkProfile: z.boolean().describe(
      'Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy.',
    ).optional(),
    verifiedBoot: z.boolean().describe(
      "Whether Android verified boot status is GREEN.",
    ).optional(),
    verifyAppsEnabled: z.boolean().describe(
      "Whether Google Play Protect Verify Apps is enabled.",
    ).optional(),
  }).describe(
    "Resource representing the Android specific attributes of a Device.",
  ).optional(),
  assetTag: z.string().describe("Asset tag of the device.").optional(),
  deviceId: z.string().describe("Unique identifier for the device.").optional(),
  endpointVerificationSpecificAttributes: z.object({
    additionalSignals: z.record(z.string(), z.string()).describe(
      "[Additional signals](https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: * Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. * [Configurable attributes](https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist.",
    ).optional(),
    browserAttributes: z.array(z.object({
      chromeBrowserInfo: z.object({
        browserManagementState: z.enum([
          "UNSPECIFIED",
          "UNMANAGED",
          "MANAGED_BY_OTHER_DOMAIN",
          "PROFILE_MANAGED",
          "BROWSER_MANAGED",
        ]).describe("Output only. Browser's management state.").optional(),
        browserVersion: z.string().describe(
          "Version of the request initiating browser. E.g. `91.0.4442.4`.",
        ).optional(),
        isBuiltInDnsClientEnabled: z.boolean().describe(
          "Current state of [built-in DNS client](https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled).",
        ).optional(),
        isBulkDataEntryAnalysisEnabled: z.boolean().describe(
          "Current state of [bulk data analysis](https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isChromeCleanupEnabled: z.boolean().describe(
          "Deprecated: This field is not used for Chrome version 118 and later. Current state of [Chrome Cleanup](https://chromeenterprise.google/policies/#ChromeCleanupEnabled).",
        ).optional(),
        isChromeRemoteDesktopAppBlocked: z.boolean().describe(
          "Current state of [Chrome Remote Desktop app](https://chromeenterprise.google/policies/#URLBlocklist).",
        ).optional(),
        isFileDownloadAnalysisEnabled: z.boolean().describe(
          "Current state of [file download analysis](https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isFileUploadAnalysisEnabled: z.boolean().describe(
          "Current state of [file upload analysis](https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isRealtimeUrlCheckEnabled: z.boolean().describe(
          "Current state of [real-time URL check](https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isSecurityEventAnalysisEnabled: z.boolean().describe(
          "Current state of [security event analysis](https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isSiteIsolationEnabled: z.boolean().describe(
          "Current state of [site isolation](https://chromeenterprise.google/policies/?policy=IsolateOrigins).",
        ).optional(),
        isThirdPartyBlockingEnabled: z.boolean().describe(
          "Current state of [third-party blocking](https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled).",
        ).optional(),
        passwordProtectionWarningTrigger: z.enum([
          "PASSWORD_PROTECTION_TRIGGER_UNSPECIFIED",
          "PROTECTION_OFF",
          "PASSWORD_REUSE",
          "PHISHING_REUSE",
        ]).describe(
          "Current state of [password protection trigger](https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger).",
        ).optional(),
        safeBrowsingProtectionLevel: z.enum([
          "SAFE_BROWSING_LEVEL_UNSPECIFIED",
          "DISABLED",
          "STANDARD",
          "ENHANCED",
        ]).describe(
          "Current state of [Safe Browsing protection level](https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel).",
        ).optional(),
      }).describe(
        "Browser-specific fields reported by the [Endpoint Verification extension](https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1).",
      ).optional(),
      chromeProfileId: z.string().describe(
        "Chrome profile ID that is exposed by the Chrome API. It is unique for each device.",
      ).optional(),
      lastProfileSyncTime: z.string().describe(
        "Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced.",
      ).optional(),
    })).describe(
      "Details of browser profiles reported by Endpoint Verification.",
    ).optional(),
    certificateAttributes: z.array(z.object({
      certificateTemplate: z.object({
        id: z.string().describe(
          'The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047".',
        ).optional(),
        majorVersion: z.number().int().describe(
          "The Major version of the template. Example: 100.",
        ).optional(),
        minorVersion: z.number().int().describe(
          "The minor version of the template. Example: 12.",
        ).optional(),
      }).describe("CertificateTemplate (v3 Extension in X.509).").optional(),
      fingerprint: z.string().describe("The encoded certificate fingerprint.")
        .optional(),
      issuer: z.string().describe("The name of the issuer of this certificate.")
        .optional(),
      serialNumber: z.string().describe(
        'Serial number of the certificate, Example: "123456789".',
      ).optional(),
      subject: z.string().describe("The subject name of this certificate.")
        .optional(),
      thumbprint: z.string().describe("The certificate thumbprint.").optional(),
      validationState: z.enum([
        "CERTIFICATE_VALIDATION_STATE_UNSPECIFIED",
        "VALIDATION_SUCCESSFUL",
        "VALIDATION_FAILED",
      ]).describe("Output only. Validation state of this certificate.")
        .optional(),
      validityExpirationTime: z.string().describe(
        "Certificate not valid at or after this timestamp.",
      ).optional(),
      validityStartTime: z.string().describe(
        "Certificate not valid before this timestamp.",
      ).optional(),
    })).describe("Details of certificates.").optional(),
  }).describe(
    "Resource representing the [Endpoint Verification-specific attributes](https://cloud.google.com/endpoint-verification/docs/device-information) of a device.",
  ).optional(),
  hostname: z.string().describe("Host name of the device.").optional(),
  lastSyncTime: z.string().describe(
    "Most recent time when device synced with this service.",
  ).optional(),
  serialNumber: z.string().describe(
    "Serial Number of device. Example: HT82V1A01076.",
  ).optional(),
  wifiMacAddresses: z.array(z.string()).describe(
    "WiFi MAC addresses of device.",
  ).optional(),
  customer: z.string().describe(
    "Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs.",
  ).optional(),
});

const StateSchema = z.object({
  androidSpecificAttributes: z.object({
    ctsProfileMatch: z.boolean(),
    enabledUnknownSources: z.boolean(),
    hasPotentiallyHarmfulApps: z.boolean(),
    ownerProfileAccount: z.boolean(),
    ownershipPrivilege: z.string(),
    supportsWorkProfile: z.boolean(),
    verifiedBoot: z.boolean(),
    verifyAppsEnabled: z.boolean(),
  }).optional(),
  assetTag: z.string().optional(),
  basebandVersion: z.string().optional(),
  bootloaderVersion: z.string().optional(),
  brand: z.string().optional(),
  buildNumber: z.string().optional(),
  compromisedState: z.string().optional(),
  createTime: z.string().optional(),
  deviceId: z.string().optional(),
  deviceType: z.string().optional(),
  enabledDeveloperOptions: z.boolean().optional(),
  enabledUsbDebugging: z.boolean().optional(),
  encryptionState: z.string().optional(),
  endpointVerificationSpecificAttributes: z.object({
    additionalSignals: z.record(z.string(), z.unknown()),
    browserAttributes: z.array(z.object({
      chromeBrowserInfo: z.object({
        browserManagementState: z.string(),
        browserVersion: z.string(),
        isBuiltInDnsClientEnabled: z.boolean(),
        isBulkDataEntryAnalysisEnabled: z.boolean(),
        isChromeCleanupEnabled: z.boolean(),
        isChromeRemoteDesktopAppBlocked: z.boolean(),
        isFileDownloadAnalysisEnabled: z.boolean(),
        isFileUploadAnalysisEnabled: z.boolean(),
        isRealtimeUrlCheckEnabled: z.boolean(),
        isSecurityEventAnalysisEnabled: z.boolean(),
        isSiteIsolationEnabled: z.boolean(),
        isThirdPartyBlockingEnabled: z.boolean(),
        passwordProtectionWarningTrigger: z.string(),
        safeBrowsingProtectionLevel: z.string(),
      }),
      chromeProfileId: z.string(),
      lastProfileSyncTime: z.string(),
    })),
    certificateAttributes: z.array(z.object({
      certificateTemplate: z.object({
        id: z.string(),
        majorVersion: z.number(),
        minorVersion: z.number(),
      }),
      fingerprint: z.string(),
      issuer: z.string(),
      serialNumber: z.string(),
      subject: z.string(),
      thumbprint: z.string(),
      validationState: z.string(),
      validityExpirationTime: z.string(),
      validityStartTime: z.string(),
    })),
  }).optional(),
  hostname: z.string().optional(),
  imei: z.string().optional(),
  kernelVersion: z.string().optional(),
  lastSyncTime: z.string().optional(),
  managementState: z.string().optional(),
  manufacturer: z.string().optional(),
  meid: z.string().optional(),
  model: z.string().optional(),
  name: z.string(),
  networkOperator: z.string().optional(),
  osVersion: z.string().optional(),
  otherAccounts: z.array(z.string()).optional(),
  ownerType: z.string().optional(),
  releaseVersion: z.string().optional(),
  securityPatchTime: z.string().optional(),
  serialNumber: z.string().optional(),
  unifiedDeviceId: z.string().optional(),
  wifiMacAddresses: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  androidSpecificAttributes: z.object({
    ctsProfileMatch: z.boolean().describe(
      "Whether the device passes Android CTS compliance.",
    ).optional(),
    enabledUnknownSources: z.boolean().describe(
      "Whether applications from unknown sources can be installed on device.",
    ).optional(),
    hasPotentiallyHarmfulApps: z.boolean().describe(
      "Whether any potentially harmful apps were detected on the device.",
    ).optional(),
    ownerProfileAccount: z.boolean().describe(
      "Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles.",
    ).optional(),
    ownershipPrivilege: z.enum([
      "OWNERSHIP_PRIVILEGE_UNSPECIFIED",
      "DEVICE_ADMINISTRATOR",
      "PROFILE_OWNER",
      "DEVICE_OWNER",
    ]).describe("Ownership privileges on device.").optional(),
    supportsWorkProfile: z.boolean().describe(
      'Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy.',
    ).optional(),
    verifiedBoot: z.boolean().describe(
      "Whether Android verified boot status is GREEN.",
    ).optional(),
    verifyAppsEnabled: z.boolean().describe(
      "Whether Google Play Protect Verify Apps is enabled.",
    ).optional(),
  }).describe(
    "Resource representing the Android specific attributes of a Device.",
  ).optional(),
  assetTag: z.string().describe("Asset tag of the device.").optional(),
  deviceId: z.string().describe("Unique identifier for the device.").optional(),
  endpointVerificationSpecificAttributes: z.object({
    additionalSignals: z.record(z.string(), z.string()).describe(
      "[Additional signals](https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: * Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. * [Configurable attributes](https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist.",
    ).optional(),
    browserAttributes: z.array(z.object({
      chromeBrowserInfo: z.object({
        browserManagementState: z.enum([
          "UNSPECIFIED",
          "UNMANAGED",
          "MANAGED_BY_OTHER_DOMAIN",
          "PROFILE_MANAGED",
          "BROWSER_MANAGED",
        ]).describe("Output only. Browser's management state.").optional(),
        browserVersion: z.string().describe(
          "Version of the request initiating browser. E.g. `91.0.4442.4`.",
        ).optional(),
        isBuiltInDnsClientEnabled: z.boolean().describe(
          "Current state of [built-in DNS client](https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled).",
        ).optional(),
        isBulkDataEntryAnalysisEnabled: z.boolean().describe(
          "Current state of [bulk data analysis](https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isChromeCleanupEnabled: z.boolean().describe(
          "Deprecated: This field is not used for Chrome version 118 and later. Current state of [Chrome Cleanup](https://chromeenterprise.google/policies/#ChromeCleanupEnabled).",
        ).optional(),
        isChromeRemoteDesktopAppBlocked: z.boolean().describe(
          "Current state of [Chrome Remote Desktop app](https://chromeenterprise.google/policies/#URLBlocklist).",
        ).optional(),
        isFileDownloadAnalysisEnabled: z.boolean().describe(
          "Current state of [file download analysis](https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isFileUploadAnalysisEnabled: z.boolean().describe(
          "Current state of [file upload analysis](https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isRealtimeUrlCheckEnabled: z.boolean().describe(
          "Current state of [real-time URL check](https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isSecurityEventAnalysisEnabled: z.boolean().describe(
          "Current state of [security event analysis](https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty.",
        ).optional(),
        isSiteIsolationEnabled: z.boolean().describe(
          "Current state of [site isolation](https://chromeenterprise.google/policies/?policy=IsolateOrigins).",
        ).optional(),
        isThirdPartyBlockingEnabled: z.boolean().describe(
          "Current state of [third-party blocking](https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled).",
        ).optional(),
        passwordProtectionWarningTrigger: z.enum([
          "PASSWORD_PROTECTION_TRIGGER_UNSPECIFIED",
          "PROTECTION_OFF",
          "PASSWORD_REUSE",
          "PHISHING_REUSE",
        ]).describe(
          "Current state of [password protection trigger](https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger).",
        ).optional(),
        safeBrowsingProtectionLevel: z.enum([
          "SAFE_BROWSING_LEVEL_UNSPECIFIED",
          "DISABLED",
          "STANDARD",
          "ENHANCED",
        ]).describe(
          "Current state of [Safe Browsing protection level](https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel).",
        ).optional(),
      }).describe(
        "Browser-specific fields reported by the [Endpoint Verification extension](https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1).",
      ).optional(),
      chromeProfileId: z.string().describe(
        "Chrome profile ID that is exposed by the Chrome API. It is unique for each device.",
      ).optional(),
      lastProfileSyncTime: z.string().describe(
        "Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced.",
      ).optional(),
    })).describe(
      "Details of browser profiles reported by Endpoint Verification.",
    ).optional(),
    certificateAttributes: z.array(z.object({
      certificateTemplate: z.object({
        id: z.string().describe(
          'The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047".',
        ).optional(),
        majorVersion: z.number().int().describe(
          "The Major version of the template. Example: 100.",
        ).optional(),
        minorVersion: z.number().int().describe(
          "The minor version of the template. Example: 12.",
        ).optional(),
      }).describe("CertificateTemplate (v3 Extension in X.509).").optional(),
      fingerprint: z.string().describe("The encoded certificate fingerprint.")
        .optional(),
      issuer: z.string().describe("The name of the issuer of this certificate.")
        .optional(),
      serialNumber: z.string().describe(
        'Serial number of the certificate, Example: "123456789".',
      ).optional(),
      subject: z.string().describe("The subject name of this certificate.")
        .optional(),
      thumbprint: z.string().describe("The certificate thumbprint.").optional(),
      validationState: z.enum([
        "CERTIFICATE_VALIDATION_STATE_UNSPECIFIED",
        "VALIDATION_SUCCESSFUL",
        "VALIDATION_FAILED",
      ]).describe("Output only. Validation state of this certificate.")
        .optional(),
      validityExpirationTime: z.string().describe(
        "Certificate not valid at or after this timestamp.",
      ).optional(),
      validityStartTime: z.string().describe(
        "Certificate not valid before this timestamp.",
      ).optional(),
    })).describe("Details of certificates.").optional(),
  }).describe(
    "Resource representing the [Endpoint Verification-specific attributes](https://cloud.google.com/endpoint-verification/docs/device-information) of a device.",
  ).optional(),
  hostname: z.string().describe("Host name of the device.").optional(),
  lastSyncTime: z.string().describe(
    "Most recent time when device synced with this service.",
  ).optional(),
  serialNumber: z.string().describe(
    "Serial Number of device. Example: HT82V1A01076.",
  ).optional(),
  wifiMacAddresses: z.array(z.string()).describe(
    "WiFi MAC addresses of device.",
  ).optional(),
  customer: z.string().describe(
    "Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity Devices. Registered at `@swamp/gcp/cloudidentity/devices`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/devices",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Device within the Cloud Identity Devices API. Represents a Device known to ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a devices",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["androidSpecificAttributes"] !== undefined) {
          body["androidSpecificAttributes"] = g["androidSpecificAttributes"];
        }
        if (g["assetTag"] !== undefined) body["assetTag"] = g["assetTag"];
        if (g["deviceId"] !== undefined) body["deviceId"] = g["deviceId"];
        if (g["endpointVerificationSpecificAttributes"] !== undefined) {
          body["endpointVerificationSpecificAttributes"] =
            g["endpointVerificationSpecificAttributes"];
        }
        if (g["hostname"] !== undefined) body["hostname"] = g["hostname"];
        if (g["lastSyncTime"] !== undefined) {
          body["lastSyncTime"] = g["lastSyncTime"];
        }
        if (g["serialNumber"] !== undefined) {
          body["serialNumber"] = g["serialNumber"];
        }
        if (g["wifiMacAddresses"] !== undefined) {
          body["wifiMacAddresses"] = g["wifiMacAddresses"];
        }
        if (g["customer"] !== undefined) body["customer"] = g["customer"];
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
      description: "Get a devices",
      arguments: z.object({
        identifier: z.string().describe("The name of the devices"),
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
      description: "Delete the devices",
      arguments: z.object({
        identifier: z.string().describe("The name of the devices"),
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
      description: "Sync devices state from GCP",
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
    list: {
      description: "List devices resources",
      arguments: z.object({
        customer: z.string().describe(
          "Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer in the format: `customers/{customer}`, where customer is the customer to whom the device belongs. If you're using this API for your own organization, use `customers/my_customer`. If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs.",
        ).optional(),
        filter: z.string().describe(
          "Optional. Additional restrictions when fetching list of devices. For a list of search fields, refer to [Mobile device search fields](https://developers.google.com/admin-sdk/directory/v1/search-operators). Multiple search fields are separated by the space character.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Order specification for devices in the response. Only one of the following field names may be used to specify the order: `create_time`, `last_sync_time`, `model`, `os_version`, `device_type` and `serial_number`. `desc` may be specified optionally at the end to specify results to be sorted in descending order. Default order is ascending.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of Devices to return. If unspecified, at most 20 Devices will be returned. The maximum value is 100; values above 100 will be coerced to 100.",
        ).optional(),
        view: z.string().describe(
          "Optional. The view to use for the List request.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["customer"] !== undefined) {
          params["customer"] = String(args["customer"]);
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "devices",
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
    cancel_wipe: {
      description: "cancel wipe",
      arguments: z.object({
        customer: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["customer"] !== undefined) body["customer"] = args["customer"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.devices.cancelWipe",
            "path": "v1/{+name}:cancelWipe",
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
    wipe: {
      description: "wipe",
      arguments: z.object({
        customer: z.any().optional(),
        removeResetLock: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["customer"] !== undefined) body["customer"] = args["customer"];
        if (args["removeResetLock"] !== undefined) {
          body["removeResetLock"] = args["removeResetLock"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.devices.wipe",
            "path": "v1/{+name}:wipe",
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
