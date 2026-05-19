// Auto-generated extension model for @swamp/gcp/androidenterprise/devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Devices.
 *
 * A Devices resource represents a mobile device managed by the EMM and belonging to a specific enterprise user.
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

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.devices.get",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "deviceId",
  ],
  "parameters": {
    "deviceId": {
      "location": "path",
      "required": true,
    },
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidenterprise.devices.update",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "deviceId",
  ],
  "parameters": {
    "deviceId": {
      "location": "path",
      "required": true,
    },
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  androidId: z.string().describe(
    'The Google Play Services Android ID for the device encoded as a lowercase hex string. For example, "123456789abcdef0".',
  ).optional(),
  device: z.string().describe(
    'The internal hardware codename of the device. This comes from android.os.Build.DEVICE. (field named "device" per logs/wireless/android/android_checkin.proto)',
  ).optional(),
  latestBuildFingerprint: z.string().describe(
    "The build fingerprint of the device if known.",
  ).optional(),
  maker: z.string().describe(
    "The manufacturer of the device. This comes from android.os.Build.MANUFACTURER.",
  ).optional(),
  managementType: z.enum([
    "managedDevice",
    "managedProfile",
    "containerApp",
    "unmanagedProfile",
  ]).describe(
    'Identifies the extent to which the device is controlled by a managed Google Play EMM in various deployment configurations. Possible values include: - "managedDevice", a device that has the EMM\'s device policy controller (DPC) as the device owner. - "managedProfile", a device that has a profile managed by the DPC (DPC is profile owner) in addition to a separate, personal profile that is unavailable to the DPC. - "containerApp", no longer used (deprecated). - "unmanagedProfile", a device that has been allowed (by the domain\'s admin, using the Admin Console to enable the privilege) to use managed Google Play, but the profile is itself not owned by a DPC.',
  ).optional(),
  model: z.string().describe(
    "The model name of the device. This comes from android.os.Build.MODEL.",
  ).optional(),
  policy: z.object({
    autoUpdatePolicy: z.enum([
      "autoUpdatePolicyUnspecified",
      "choiceToTheUser",
      "never",
      "wifiOnly",
      "always",
    ]).describe(
      "Controls when automatic app updates on the device can be applied. Recommended alternative: autoUpdateMode which is set per app, provides greater flexibility around update frequency. When autoUpdateMode is set to AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, autoUpdatePolicy has no effect. - choiceToTheUser allows the device's user to configure the app update policy. - always enables auto updates. - never disables auto updates. - wifiOnly enables auto updates only when the device is connected to wifi. *Important:* Changes to app update policies don't affect updates that are in progress. Any policy changes will apply to subsequent app updates.",
    ).optional(),
    deviceReportPolicy: z.enum([
      "deviceReportPolicyUnspecified",
      "deviceReportDisabled",
      "deviceReportEnabled",
    ]).describe(
      'Whether the device reports app states to the EMM. The default value is "deviceReportDisabled".',
    ).optional(),
    maintenanceWindow: z.object({
      durationMs: z.string().describe(
        "Duration of the maintenance window, in milliseconds. The duration must be between 30 minutes and 24 hours (inclusive).",
      ).optional(),
      startTimeAfterMidnightMs: z.string().describe(
        "Start time of the maintenance window, in milliseconds after midnight on the device. Windows can span midnight.",
      ).optional(),
    }).describe(
      "Maintenance window for managed Google Play Accounts. This allows Play store to update the apps on the foreground in the designated window.",
    ).optional(),
    policyId: z.string().describe(
      "An identifier for the policy that will be passed with the app install feedback sent from the Play Store.",
    ).optional(),
    productAvailabilityPolicy: z.enum([
      "productAvailabilityPolicyUnspecified",
      "whitelist",
      "all",
    ]).describe(
      'The availability granted to the device for the specified products. "all" gives the device access to all products, regardless of approval status. "all" does not enable automatic visibility of "alpha" or "beta" tracks. "whitelist" grants the device access the products specified in productPolicy[]. Only products that are approved or products that were previously approved (products with revoked approval) by the enterprise can be whitelisted. If no value is provided, the availability set at the user level is applied by default.',
    ).optional(),
    productPolicy: z.array(z.object({
      autoInstallPolicy: z.object({
        autoInstallConstraint: z.array(z.unknown()).describe(
          "The constraints for auto-installing the app. You can specify a maximum of one constraint.",
        ).optional(),
        autoInstallMode: z.enum([
          "autoInstallModeUnspecified",
          "doNotAutoInstall",
          "autoInstallOnce",
          "forceAutoInstall",
        ]).describe(
          'The auto-install mode. If unset, defaults to "doNotAutoInstall". An app is automatically installed regardless of a set maintenance window.',
        ).optional(),
        autoInstallPriority: z.number().int().describe(
          "The priority of the install, as an unsigned integer. A lower number means higher priority.",
        ).optional(),
        minimumVersionCode: z.number().int().describe(
          "The minimum version of the app. If a lower version of the app is installed, then the app will be auto-updated according to the auto-install constraints, instead of waiting for the regular auto-update. You can set a minimum version code for at most 20 apps per device.",
        ).optional(),
      }).optional(),
      autoUpdateMode: z.enum([
        "autoUpdateModeUnspecified",
        "autoUpdateDefault",
        "autoUpdatePostponed",
        "autoUpdateHighPriority",
      ]).describe(
        "The auto-update mode for the product. When autoUpdateMode is used, it always takes precedence over the user's choice. So when a user makes changes to the device settings manually, these changes are ignored.",
      ).optional(),
      enterpriseAuthenticationAppLinkConfigs: z.array(z.object({
        uri: z.unknown().describe("An authentication url.").optional(),
      })).describe(
        "An authentication URL configuration for the authenticator app of an identity provider. This helps to launch the identity provider's authenticator app during the authentication happening in a private app using Android WebView. Authenticator app should already be the default handler for the authentication url on the device.",
      ).optional(),
      managedConfiguration: z.object({
        configurationVariables: z.object({
          mcmId: z.unknown().describe(
            "The ID of the managed configurations settings.",
          ).optional(),
          variableSet: z.unknown().describe(
            "The variable set that is attributed to the user.",
          ).optional(),
        }).describe(
          "A configuration variables resource contains the managed configuration settings ID to be applied to a single user, as well as the variable set that is attributed to the user. The variable set will be used to replace placeholders in the managed configuration settings.",
        ).optional(),
        kind: z.string().describe("Deprecated.").optional(),
        managedProperty: z.array(z.unknown()).describe(
          "The set of managed properties for this configuration.",
        ).optional(),
        productId: z.string().describe(
          'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
        ).optional(),
      }).describe(
        "*Deprecated:* New integrations cannot use this method and can refer to our new recommendations",
      ).optional(),
      productId: z.string().describe(
        'The ID of the product. For example, "app:com.google.android.gm".',
      ).optional(),
      trackIds: z.array(z.string()).describe(
        "Grants the device visibility to the specified product release track(s), identified by trackIds. The list of release tracks of a product can be obtained by calling Products.Get.",
      ).optional(),
      tracks: z.array(
        z.enum(["appTrackUnspecified", "production", "beta", "alpha"]),
      ).describe("Deprecated. Use trackIds instead.").optional(),
    })).describe(
      "The list of product policies. The productAvailabilityPolicy needs to be set to WHITELIST or ALL for the product policies to be applied.",
    ).optional(),
  }).describe("The device policy for a given managed device.").optional(),
  product: z.string().describe(
    "The product name of the device. This comes from android.os.Build.PRODUCT.",
  ).optional(),
  report: z.object({
    appState: z.array(z.object({
      keyedAppState: z.array(z.object({
        data: z.unknown().describe(
          "Additional field intended for machine-readable data. For example, a number or JSON object. To prevent XSS, we recommend removing any HTML from the data before displaying it.",
        ).optional(),
        key: z.unknown().describe(
          "Key indicating what the app is providing a state for. The content of the key is set by the app's developer. To prevent XSS, we recommend removing any HTML from the key before displaying it. This field will always be present.",
        ).optional(),
        message: z.unknown().describe(
          "Free-form, human-readable message describing the app state. For example, an error message. To prevent XSS, we recommend removing any HTML from the message before displaying it.",
        ).optional(),
        severity: z.unknown().describe(
          "Severity of the app state. This field will always be present.",
        ).optional(),
        stateTimestampMillis: z.unknown().describe(
          "Timestamp of when the app set the state in milliseconds since epoch. This field will always be present.",
        ).optional(),
      })).describe(
        "List of keyed app states. This field will always be present.",
      ).optional(),
      packageName: z.string().describe(
        "The package name of the app. This field will always be present.",
      ).optional(),
    })).describe(
      "List of app states set by managed apps on the device. App states are defined by the app's developers. This field will always be present.",
    ).optional(),
    lastUpdatedTimestampMillis: z.string().describe(
      "The timestamp of the last report update in milliseconds since epoch. This field will always be present.",
    ).optional(),
  }).describe(
    "Device report updated with the latest app states for managed apps on the device.",
  ).optional(),
  retailBrand: z.string().describe(
    "Retail brand for the device, if set. See android.os.Build.BRAND",
  ).optional(),
  sdkVersion: z.number().int().describe("API compatibility version.")
    .optional(),
});

const StateSchema = z.object({
  androidId: z.string().optional(),
  device: z.string().optional(),
  latestBuildFingerprint: z.string().optional(),
  maker: z.string().optional(),
  managementType: z.string().optional(),
  model: z.string().optional(),
  policy: z.object({
    autoUpdatePolicy: z.string(),
    deviceReportPolicy: z.string(),
    maintenanceWindow: z.object({
      durationMs: z.string(),
      startTimeAfterMidnightMs: z.string(),
    }),
    policyId: z.string(),
    productAvailabilityPolicy: z.string(),
    productPolicy: z.array(z.object({
      autoInstallPolicy: z.object({
        autoInstallConstraint: z.array(z.unknown()),
        autoInstallMode: z.string(),
        autoInstallPriority: z.number(),
        minimumVersionCode: z.number(),
      }),
      autoUpdateMode: z.string(),
      enterpriseAuthenticationAppLinkConfigs: z.array(z.object({
        uri: z.unknown(),
      })),
      managedConfiguration: z.object({
        configurationVariables: z.object({
          mcmId: z.unknown(),
          variableSet: z.unknown(),
        }),
        kind: z.string(),
        managedProperty: z.array(z.unknown()),
        productId: z.string(),
      }),
      productId: z.string(),
      trackIds: z.array(z.string()),
      tracks: z.array(z.string()),
    })),
  }).optional(),
  product: z.string().optional(),
  report: z.object({
    appState: z.array(z.object({
      keyedAppState: z.array(z.object({
        data: z.unknown(),
        key: z.unknown(),
        message: z.unknown(),
        severity: z.unknown(),
        stateTimestampMillis: z.unknown(),
      })),
      packageName: z.string(),
    })),
    lastUpdatedTimestampMillis: z.string(),
  }).optional(),
  retailBrand: z.string().optional(),
  sdkVersion: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  androidId: z.string().describe(
    'The Google Play Services Android ID for the device encoded as a lowercase hex string. For example, "123456789abcdef0".',
  ).optional(),
  device: z.string().describe(
    'The internal hardware codename of the device. This comes from android.os.Build.DEVICE. (field named "device" per logs/wireless/android/android_checkin.proto)',
  ).optional(),
  latestBuildFingerprint: z.string().describe(
    "The build fingerprint of the device if known.",
  ).optional(),
  maker: z.string().describe(
    "The manufacturer of the device. This comes from android.os.Build.MANUFACTURER.",
  ).optional(),
  managementType: z.enum([
    "managedDevice",
    "managedProfile",
    "containerApp",
    "unmanagedProfile",
  ]).describe(
    'Identifies the extent to which the device is controlled by a managed Google Play EMM in various deployment configurations. Possible values include: - "managedDevice", a device that has the EMM\'s device policy controller (DPC) as the device owner. - "managedProfile", a device that has a profile managed by the DPC (DPC is profile owner) in addition to a separate, personal profile that is unavailable to the DPC. - "containerApp", no longer used (deprecated). - "unmanagedProfile", a device that has been allowed (by the domain\'s admin, using the Admin Console to enable the privilege) to use managed Google Play, but the profile is itself not owned by a DPC.',
  ).optional(),
  model: z.string().describe(
    "The model name of the device. This comes from android.os.Build.MODEL.",
  ).optional(),
  policy: z.object({
    autoUpdatePolicy: z.enum([
      "autoUpdatePolicyUnspecified",
      "choiceToTheUser",
      "never",
      "wifiOnly",
      "always",
    ]).describe(
      "Controls when automatic app updates on the device can be applied. Recommended alternative: autoUpdateMode which is set per app, provides greater flexibility around update frequency. When autoUpdateMode is set to AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, autoUpdatePolicy has no effect. - choiceToTheUser allows the device's user to configure the app update policy. - always enables auto updates. - never disables auto updates. - wifiOnly enables auto updates only when the device is connected to wifi. *Important:* Changes to app update policies don't affect updates that are in progress. Any policy changes will apply to subsequent app updates.",
    ).optional(),
    deviceReportPolicy: z.enum([
      "deviceReportPolicyUnspecified",
      "deviceReportDisabled",
      "deviceReportEnabled",
    ]).describe(
      'Whether the device reports app states to the EMM. The default value is "deviceReportDisabled".',
    ).optional(),
    maintenanceWindow: z.object({
      durationMs: z.string().describe(
        "Duration of the maintenance window, in milliseconds. The duration must be between 30 minutes and 24 hours (inclusive).",
      ).optional(),
      startTimeAfterMidnightMs: z.string().describe(
        "Start time of the maintenance window, in milliseconds after midnight on the device. Windows can span midnight.",
      ).optional(),
    }).describe(
      "Maintenance window for managed Google Play Accounts. This allows Play store to update the apps on the foreground in the designated window.",
    ).optional(),
    policyId: z.string().describe(
      "An identifier for the policy that will be passed with the app install feedback sent from the Play Store.",
    ).optional(),
    productAvailabilityPolicy: z.enum([
      "productAvailabilityPolicyUnspecified",
      "whitelist",
      "all",
    ]).describe(
      'The availability granted to the device for the specified products. "all" gives the device access to all products, regardless of approval status. "all" does not enable automatic visibility of "alpha" or "beta" tracks. "whitelist" grants the device access the products specified in productPolicy[]. Only products that are approved or products that were previously approved (products with revoked approval) by the enterprise can be whitelisted. If no value is provided, the availability set at the user level is applied by default.',
    ).optional(),
    productPolicy: z.array(z.object({
      autoInstallPolicy: z.object({
        autoInstallConstraint: z.array(z.unknown()).describe(
          "The constraints for auto-installing the app. You can specify a maximum of one constraint.",
        ).optional(),
        autoInstallMode: z.enum([
          "autoInstallModeUnspecified",
          "doNotAutoInstall",
          "autoInstallOnce",
          "forceAutoInstall",
        ]).describe(
          'The auto-install mode. If unset, defaults to "doNotAutoInstall". An app is automatically installed regardless of a set maintenance window.',
        ).optional(),
        autoInstallPriority: z.number().int().describe(
          "The priority of the install, as an unsigned integer. A lower number means higher priority.",
        ).optional(),
        minimumVersionCode: z.number().int().describe(
          "The minimum version of the app. If a lower version of the app is installed, then the app will be auto-updated according to the auto-install constraints, instead of waiting for the regular auto-update. You can set a minimum version code for at most 20 apps per device.",
        ).optional(),
      }).optional(),
      autoUpdateMode: z.enum([
        "autoUpdateModeUnspecified",
        "autoUpdateDefault",
        "autoUpdatePostponed",
        "autoUpdateHighPriority",
      ]).describe(
        "The auto-update mode for the product. When autoUpdateMode is used, it always takes precedence over the user's choice. So when a user makes changes to the device settings manually, these changes are ignored.",
      ).optional(),
      enterpriseAuthenticationAppLinkConfigs: z.array(z.object({
        uri: z.unknown().describe("An authentication url.").optional(),
      })).describe(
        "An authentication URL configuration for the authenticator app of an identity provider. This helps to launch the identity provider's authenticator app during the authentication happening in a private app using Android WebView. Authenticator app should already be the default handler for the authentication url on the device.",
      ).optional(),
      managedConfiguration: z.object({
        configurationVariables: z.object({
          mcmId: z.unknown().describe(
            "The ID of the managed configurations settings.",
          ).optional(),
          variableSet: z.unknown().describe(
            "The variable set that is attributed to the user.",
          ).optional(),
        }).describe(
          "A configuration variables resource contains the managed configuration settings ID to be applied to a single user, as well as the variable set that is attributed to the user. The variable set will be used to replace placeholders in the managed configuration settings.",
        ).optional(),
        kind: z.string().describe("Deprecated.").optional(),
        managedProperty: z.array(z.unknown()).describe(
          "The set of managed properties for this configuration.",
        ).optional(),
        productId: z.string().describe(
          'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
        ).optional(),
      }).describe(
        "*Deprecated:* New integrations cannot use this method and can refer to our new recommendations",
      ).optional(),
      productId: z.string().describe(
        'The ID of the product. For example, "app:com.google.android.gm".',
      ).optional(),
      trackIds: z.array(z.string()).describe(
        "Grants the device visibility to the specified product release track(s), identified by trackIds. The list of release tracks of a product can be obtained by calling Products.Get.",
      ).optional(),
      tracks: z.array(
        z.enum(["appTrackUnspecified", "production", "beta", "alpha"]),
      ).describe("Deprecated. Use trackIds instead.").optional(),
    })).describe(
      "The list of product policies. The productAvailabilityPolicy needs to be set to WHITELIST or ALL for the product policies to be applied.",
    ).optional(),
  }).describe("The device policy for a given managed device.").optional(),
  product: z.string().describe(
    "The product name of the device. This comes from android.os.Build.PRODUCT.",
  ).optional(),
  report: z.object({
    appState: z.array(z.object({
      keyedAppState: z.array(z.object({
        data: z.unknown().describe(
          "Additional field intended for machine-readable data. For example, a number or JSON object. To prevent XSS, we recommend removing any HTML from the data before displaying it.",
        ).optional(),
        key: z.unknown().describe(
          "Key indicating what the app is providing a state for. The content of the key is set by the app's developer. To prevent XSS, we recommend removing any HTML from the key before displaying it. This field will always be present.",
        ).optional(),
        message: z.unknown().describe(
          "Free-form, human-readable message describing the app state. For example, an error message. To prevent XSS, we recommend removing any HTML from the message before displaying it.",
        ).optional(),
        severity: z.unknown().describe(
          "Severity of the app state. This field will always be present.",
        ).optional(),
        stateTimestampMillis: z.unknown().describe(
          "Timestamp of when the app set the state in milliseconds since epoch. This field will always be present.",
        ).optional(),
      })).describe(
        "List of keyed app states. This field will always be present.",
      ).optional(),
      packageName: z.string().describe(
        "The package name of the app. This field will always be present.",
      ).optional(),
    })).describe(
      "List of app states set by managed apps on the device. App states are defined by the app's developers. This field will always be present.",
    ).optional(),
    lastUpdatedTimestampMillis: z.string().describe(
      "The timestamp of the last report update in milliseconds since epoch. This field will always be present.",
    ).optional(),
  }).describe(
    "Device report updated with the latest app states for managed apps on the device.",
  ).optional(),
  retailBrand: z.string().describe(
    "Retail brand for the device, if set. See android.os.Build.BRAND",
  ).optional(),
  sdkVersion: z.number().int().describe("API compatibility version.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Devices. Registered at `@swamp/gcp/androidenterprise/devices`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/devices",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Devices resource represents a mobile device managed by the EMM and belongin...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a devices",
      arguments: z.object({
        identifier: z.string().describe("The name of the devices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["deviceId"] = args.identifier;
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
      description: "Update devices attributes",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        } else if (existing["enterpriseId"]) {
          params["enterpriseId"] = String(existing["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["deviceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["androidId"] !== undefined) body["androidId"] = g["androidId"];
        if (g["device"] !== undefined) body["device"] = g["device"];
        if (g["latestBuildFingerprint"] !== undefined) {
          body["latestBuildFingerprint"] = g["latestBuildFingerprint"];
        }
        if (g["maker"] !== undefined) body["maker"] = g["maker"];
        if (g["managementType"] !== undefined) {
          body["managementType"] = g["managementType"];
        }
        if (g["model"] !== undefined) body["model"] = g["model"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["product"] !== undefined) body["product"] = g["product"];
        if (g["report"] !== undefined) body["report"] = g["report"];
        if (g["retailBrand"] !== undefined) {
          body["retailBrand"] = g["retailBrand"];
        }
        if (g["sdkVersion"] !== undefined) body["sdkVersion"] = g["sdkVersion"];
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
          UPDATE_CONFIG,
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["deviceId"] = identifier;
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
    force_report_upload: {
      description: "force report upload",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["deviceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.devices.forceReportUpload",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/forceReportUpload",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId", "userId", "deviceId"],
            "parameters": {
              "deviceId": { "location": "path", "required": true },
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_state: {
      description: "get state",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["deviceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.devices.getState",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/state",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId", "userId", "deviceId"],
            "parameters": {
              "deviceId": { "location": "path", "required": true },
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_state: {
      description: "set state",
      arguments: z.object({
        accountState: z.any().optional(),
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["userId"] = existing["userId"]?.toString() ??
          g["userId"]?.toString() ?? "";
        params["deviceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["accountState"] !== undefined) {
          body["accountState"] = args["accountState"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.devices.setState",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/state",
            "httpMethod": "PUT",
            "parameterOrder": ["enterpriseId", "userId", "deviceId"],
            "parameters": {
              "deviceId": { "location": "path", "required": true },
              "enterpriseId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
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
