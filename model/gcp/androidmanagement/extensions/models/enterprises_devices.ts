// Auto-generated extension model for @swamp/gcp/androidmanagement/enterprises-devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Android Management Enterprises.Devices.
 *
 * A device owned by an enterprise. Unless otherwise noted, all fields are read-only and can't be modified by enterprises.devices.patch.
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
  return `${parent}/devices/${shortName}`;
}

const BASE_URL = "https://androidmanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "androidmanagement.enterprises.devices.get",
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
  "id": "androidmanagement.enterprises.devices.patch",
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
  "id": "androidmanagement.enterprises.devices.delete",
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
    "wipeDataFlags": {
      "location": "query",
    },
    "wipeReasonMessage": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  apiLevel: z.number().int().describe(
    "The API level of the Android platform version running on the device.",
  ).optional(),
  applicationReports: z.array(z.object({
    applicationSource: z.enum([
      "APPLICATION_SOURCE_UNSPECIFIED",
      "SYSTEM_APP_FACTORY_VERSION",
      "SYSTEM_APP_UPDATED_VERSION",
      "INSTALLED_FROM_PLAY_STORE",
      "CUSTOM",
    ]).describe("The source of the package.").optional(),
    displayName: z.string().describe("The display name of the app.").optional(),
    events: z.array(z.object({
      createTime: z.string().describe("The creation time of the event.")
        .optional(),
      eventType: z.enum([
        "APPLICATION_EVENT_TYPE_UNSPECIFIED",
        "INSTALLED",
        "CHANGED",
        "DATA_CLEARED",
        "REMOVED",
        "REPLACED",
        "RESTARTED",
        "PINNED",
        "UNPINNED",
      ]).describe("App event type.").optional(),
    })).describe(
      "The list of app events which have occurred in the last 30 hours.",
    ).optional(),
    installerPackageName: z.string().describe(
      "The package name of the app that installed this app.",
    ).optional(),
    keyedAppStates: z.array(z.object({
      createTime: z.string().describe(
        "The creation time of the app state on the device.",
      ).optional(),
      data: z.string().describe(
        "Optionally, a machine-readable value to be read by the EMM. For example, setting values that the admin can choose to query against in the EMM console (e.g. “notify me if the battery_warning data < 10”).",
      ).optional(),
      key: z.string().describe(
        "The key for the app state. Acts as a point of reference for what the app is providing state for. For example, when providing managed configuration feedback, this key could be the managed configuration key.",
      ).optional(),
      lastUpdateTime: z.string().describe(
        "The time the app state was most recently updated.",
      ).optional(),
      message: z.string().describe(
        "Optionally, a free-form message string to explain the app state. If the state was triggered by a particular value (e.g. a managed configuration value), it should be included in the message.",
      ).optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "INFO", "ERROR"]).describe(
        "The severity of the app state.",
      ).optional(),
    })).describe("List of keyed app states reported by the app.").optional(),
    packageName: z.string().describe("Package name of the app.").optional(),
    packageSha256Hash: z.string().describe(
      "The SHA-256 hash of the app's APK file, which can be used to verify the app hasn't been modified. Each byte of the hash value is represented as a two-digit hexadecimal number.",
    ).optional(),
    signingKeyCertFingerprints: z.array(z.string()).describe(
      "Deprecated. Use signingKeyCerts instead. The SHA-1 hash of each android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the app package. Each byte of each hash value is represented as a two-digit hexadecimal number.",
    ).optional(),
    signingKeyCerts: z.array(z.object({
      signingKeyCertFingerprintSha256: z.string().describe(
        "Required. The SHA-256 hash value of the signing key certificate of the app. This must be a valid SHA-256 hash value, i.e. 32 bytes.",
      ).optional(),
    })).describe("Output only. Signing key certificates of the app.")
      .optional(),
    state: z.enum(["APPLICATION_STATE_UNSPECIFIED", "REMOVED", "INSTALLED"])
      .describe("Application state.").optional(),
    userFacingType: z.enum([
      "USER_FACING_TYPE_UNSPECIFIED",
      "NOT_USER_FACING",
      "USER_FACING",
    ]).describe("Whether the app is user facing.").optional(),
    versionCode: z.number().int().describe(
      "The app version code, which can be used to determine whether one version is more recent than another.",
    ).optional(),
    versionName: z.string().describe(
      "The app version as displayed to the user.",
    ).optional(),
  })).describe(
    "Reports for apps installed on the device. This information is only available when application_reports_enabled is true in the device's policy.",
  ).optional(),
  appliedPasswordPolicies: z.array(z.object({
    maximumFailedPasswordsForWipe: z.number().int().describe(
      "Number of incorrect device-unlock passwords that can be entered before a device is wiped. A value of 0 means there is no restriction.",
    ).optional(),
    passwordExpirationTimeout: z.string().describe(
      "Password expiration timeout.",
    ).optional(),
    passwordHistoryLength: z.number().int().describe(
      "The length of the password history. After setting this field, the user won't be able to enter a new password that is the same as any password in the history. A value of 0 means there is no restriction.",
    ).optional(),
    passwordMinimumLength: z.number().int().describe(
      "The minimum allowed password length. A value of 0 means there is no restriction. Only enforced when password_quality is NUMERIC, NUMERIC_COMPLEX, ALPHABETIC, ALPHANUMERIC, or COMPLEX.",
    ).optional(),
    passwordMinimumLetters: z.number().int().describe(
      "Minimum number of letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumLowerCase: z.number().int().describe(
      "Minimum number of lower case letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumNonLetter: z.number().int().describe(
      "Minimum number of non-letter characters (numerical digits or symbols) required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumNumeric: z.number().int().describe(
      "Minimum number of numerical digits required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumSymbols: z.number().int().describe(
      "Minimum number of symbols required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumUpperCase: z.number().int().describe(
      "Minimum number of upper case letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordQuality: z.enum([
      "PASSWORD_QUALITY_UNSPECIFIED",
      "BIOMETRIC_WEAK",
      "SOMETHING",
      "NUMERIC",
      "NUMERIC_COMPLEX",
      "ALPHABETIC",
      "ALPHANUMERIC",
      "COMPLEX",
      "COMPLEXITY_LOW",
      "COMPLEXITY_MEDIUM",
      "COMPLEXITY_HIGH",
    ]).describe("The required password quality.").optional(),
    passwordScope: z.enum([
      "SCOPE_UNSPECIFIED",
      "SCOPE_DEVICE",
      "SCOPE_PROFILE",
    ]).describe("The scope that the password requirement applies to.")
      .optional(),
    requirePasswordUnlock: z.enum([
      "REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED",
      "USE_DEFAULT_DEVICE_TIMEOUT",
      "REQUIRE_EVERY_DAY",
    ]).describe(
      "The length of time after a device or work profile is unlocked using a strong form of authentication (password, PIN, pattern) that it can be unlocked using any other authentication method (e.g. fingerprint, trust agents, face). After the specified time period elapses, only strong forms of authentication can be used to unlock the device or work profile.",
    ).optional(),
    unifiedLockSettings: z.enum([
      "UNIFIED_LOCK_SETTINGS_UNSPECIFIED",
      "ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK",
      "REQUIRE_SEPARATE_WORK_LOCK",
    ]).describe(
      "Controls whether a unified lock is allowed for the device and the work profile, on devices running Android 9 and above with a work profile. This can be set only if password_scope is set to SCOPE_PROFILE, the policy will be rejected otherwise. If user has not set a separate work lock and this field is set to REQUIRE_SEPARATE_WORK_LOCK, a NonComplianceDetail is reported with nonComplianceReason set to USER_ACTION.",
    ).optional(),
  })).describe(
    "The password requirements currently applied to the device. This field exists because the applied requirements may be slightly different from those specified in passwordPolicies in some cases. Note that this field does not provide information about password compliance. For non-compliance information, see nonComplianceDetails. NonComplianceDetail.fieldPath, is set based on passwordPolicies, not based on this field.",
  ).optional(),
  appliedPolicyName: z.string().describe(
    "The name of the policy currently applied to the device.",
  ).optional(),
  appliedPolicyVersion: z.string().describe(
    "The version of the policy currently applied to the device.",
  ).optional(),
  appliedState: z.enum([
    "DEVICE_STATE_UNSPECIFIED",
    "ACTIVE",
    "DISABLED",
    "DELETED",
    "PROVISIONING",
    "LOST",
    "PREPARING_FOR_MIGRATION",
    "DEACTIVATED_BY_DEVICE_FINANCE",
  ]).describe("The state currently applied to the device.").optional(),
  commonCriteriaModeInfo: z.object({
    commonCriteriaModeStatus: z.enum([
      "COMMON_CRITERIA_MODE_STATUS_UNKNOWN",
      "COMMON_CRITERIA_MODE_DISABLED",
      "COMMON_CRITERIA_MODE_ENABLED",
    ]).describe("Whether Common Criteria Mode is enabled.").optional(),
    policySignatureVerificationStatus: z.enum([
      "POLICY_SIGNATURE_VERIFICATION_STATUS_UNSPECIFIED",
      "POLICY_SIGNATURE_VERIFICATION_DISABLED",
      "POLICY_SIGNATURE_VERIFICATION_SUCCEEDED",
      "POLICY_SIGNATURE_VERIFICATION_NOT_SUPPORTED",
      "POLICY_SIGNATURE_VERIFICATION_FAILED",
    ]).describe("Output only. The status of policy signature verification.")
      .optional(),
  }).describe(
    "Information about Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (https://www.commoncriteriaportal.org/) (CC).This information is only available if statusReportingSettings.commonCriteriaModeEnabled is true in the device's policy.",
  ).optional(),
  defaultApplicationInfo: z.array(z.object({
    defaultApplicationSettingAttempts: z.array(z.object({
      attemptOutcome: z.enum([
        "ATTEMPT_OUTCOME_UNSPECIFIED",
        "SUCCESS",
        "APP_NOT_INSTALLED",
        "APP_SIGNING_CERT_MISMATCH",
        "OTHER_FAILURE",
      ]).describe("Output only. The outcome of setting the app as the default.")
        .optional(),
      packageName: z.string().describe(
        "Output only. The package name of the attempted application.",
      ).optional(),
    })).describe(
      "Output only. Details on the default application setting attempts, in the same order as listed in defaultApplications.",
    ).optional(),
    defaultApplicationType: z.enum([
      "DEFAULT_APPLICATION_TYPE_UNSPECIFIED",
      "DEFAULT_ASSISTANT",
      "DEFAULT_BROWSER",
      "DEFAULT_CALL_REDIRECTION",
      "DEFAULT_CALL_SCREENING",
      "DEFAULT_DIALER",
      "DEFAULT_HOME",
      "DEFAULT_SMS",
      "DEFAULT_WALLET",
    ]).describe("Output only. The default application type.").optional(),
    packageName: z.string().describe(
      "Output only. The package name of the current default application.",
    ).optional(),
  })).describe(
    "Output only. The default application information for the DefaultApplicationType. This information is only available if defaultApplicationInfoReportingEnabled is true in the device's policy. Available on Android 16 and above.All app types are reported on fully managed devices. DEFAULT_BROWSER, DEFAULT_CALL_REDIRECTION, DEFAULT_CALL_SCREENING and DEFAULT_DIALER types are reported for the work profiles on company-owned devices with a work profile and personally-owned devices. DEFAULT_WALLET is also reported for company-owned devices with a work profile, but will only include work profile information.",
  ).optional(),
  deviceSettings: z.object({
    adbEnabled: z.boolean().describe(
      "Whether ADB (https://developer.android.com/studio/command-line/adb.html) is enabled on the device.",
    ).optional(),
    developmentSettingsEnabled: z.boolean().describe(
      "Whether developer mode is enabled on the device.",
    ).optional(),
    encryptionStatus: z.enum([
      "ENCRYPTION_STATUS_UNSPECIFIED",
      "UNSUPPORTED",
      "INACTIVE",
      "ACTIVATING",
      "ACTIVE",
      "ACTIVE_DEFAULT_KEY",
      "ACTIVE_PER_USER",
    ]).describe("Encryption status from DevicePolicyManager.").optional(),
    isDeviceSecure: z.boolean().describe(
      "Whether the device is secured with PIN/password.",
    ).optional(),
    isEncrypted: z.boolean().describe(
      "Whether the storage encryption is enabled.",
    ).optional(),
    unknownSourcesEnabled: z.boolean().describe(
      "Whether installing apps from unknown sources is enabled.",
    ).optional(),
    verifyAppsEnabled: z.boolean().describe(
      "Whether Google Play Protect verification (https://support.google.com/accounts/answer/2812853) is enforced on the device.",
    ).optional(),
  }).describe("Information about security related device settings on device.")
    .optional(),
  disabledReason: z.object({
    defaultMessage: z.string().describe(
      "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
    ).optional(),
    localizedMessages: z.record(z.string(), z.string()).describe(
      "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
    ).optional(),
  }).describe(
    "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
  ).optional(),
  displays: z.array(z.object({
    density: z.number().int().describe(
      "Display density expressed as dots-per-inch.",
    ).optional(),
    displayId: z.number().int().describe("Unique display id.").optional(),
    height: z.number().int().describe("Display height in pixels.").optional(),
    name: z.string().describe("Name of the display.").optional(),
    refreshRate: z.number().int().describe(
      "Refresh rate of the display in frames per second.",
    ).optional(),
    state: z.enum([
      "DISPLAY_STATE_UNSPECIFIED",
      "OFF",
      "ON",
      "DOZE",
      "SUSPENDED",
    ]).describe("State of the display.").optional(),
    width: z.number().int().describe("Display width in pixels.").optional(),
  })).describe(
    "Detailed information about displays on the device. This information is only available if displayInfoEnabled is true in the device's policy.",
  ).optional(),
  dpcMigrationInfo: z.object({
    additionalData: z.string().describe(
      "Output only. If this device was migrated from another DPC, the additionalData field of the migration token is populated here.",
    ).optional(),
    previousDpc: z.string().describe(
      "Output only. If this device was migrated from another DPC, this is its package name. Not populated otherwise.",
    ).optional(),
  }).describe(
    "Information related to whether this device was migrated from being managed by another Device Policy Controller (DPC).",
  ).optional(),
  enrollmentTime: z.string().describe("The time of device enrollment.")
    .optional(),
  enrollmentTokenData: z.string().describe(
    "If the device was enrolled with an enrollment token with additional data provided, this field contains that data.",
  ).optional(),
  enrollmentTokenName: z.string().describe(
    "If the device was enrolled with an enrollment token, this field contains the name of the token.",
  ).optional(),
  hardwareInfo: z.object({
    batteryShutdownTemperatures: z.array(z.number()).describe(
      "Battery shutdown temperature thresholds in Celsius for each battery on the device.",
    ).optional(),
    batteryThrottlingTemperatures: z.array(z.number()).describe(
      "Battery throttling temperature thresholds in Celsius for each battery on the device.",
    ).optional(),
    brand: z.string().describe("Brand of the device. For example, Google.")
      .optional(),
    cpuShutdownTemperatures: z.array(z.number()).describe(
      "CPU shutdown temperature thresholds in Celsius for each CPU on the device.",
    ).optional(),
    cpuThrottlingTemperatures: z.array(z.number()).describe(
      "CPU throttling temperature thresholds in Celsius for each CPU on the device.",
    ).optional(),
    deviceBasebandVersion: z.string().describe(
      "Baseband version. For example, MDM9625_104662.22.05.34p.",
    ).optional(),
    enterpriseSpecificId: z.string().describe(
      "Output only. ID that uniquely identifies a personally-owned device in a particular organization. On the same physical device when enrolled with the same organization, this ID persists across setups and even factory resets. This ID is available on personally-owned devices with a work profile on devices running Android 12 and above.",
    ).optional(),
    euiccChipInfo: z.array(z.object({
      eid: z.string().describe(
        "Output only. The Embedded Identity Document (EID) that identifies the eUICC chip for each eUICC chip on the device. This is available on company owned devices running Android 13 and above.",
      ).optional(),
    })).describe("Output only. Information related to the eUICC chip.")
      .optional(),
    gpuShutdownTemperatures: z.array(z.number()).describe(
      "GPU shutdown temperature thresholds in Celsius for each GPU on the device.",
    ).optional(),
    gpuThrottlingTemperatures: z.array(z.number()).describe(
      "GPU throttling temperature thresholds in Celsius for each GPU on the device.",
    ).optional(),
    hardware: z.string().describe("Name of the hardware. For example, Angler.")
      .optional(),
    manufacturer: z.string().describe("Manufacturer. For example, Motorola.")
      .optional(),
    model: z.string().describe(
      "The model of the device. For example, Asus Nexus 7.",
    ).optional(),
    serialNumber: z.string().describe(
      "The device serial number. However, for personally-owned devices running Android 12 and above, this is the same as the enterpriseSpecificId.",
    ).optional(),
    skinShutdownTemperatures: z.array(z.number()).describe(
      "Device skin shutdown temperature thresholds in Celsius.",
    ).optional(),
    skinThrottlingTemperatures: z.array(z.number()).describe(
      "Device skin throttling temperature thresholds in Celsius.",
    ).optional(),
  }).describe(
    "Information about device hardware. The fields related to temperature thresholds are only available if hardwareStatusEnabled is true in the device's policy.",
  ).optional(),
  hardwareStatusSamples: z.array(z.object({
    batteryTemperatures: z.array(z.number()).describe(
      "Current battery temperatures in Celsius for each battery on the device.",
    ).optional(),
    cpuTemperatures: z.array(z.number()).describe(
      "Current CPU temperatures in Celsius for each CPU on the device.",
    ).optional(),
    cpuUsages: z.array(z.number()).describe(
      "CPU usages in percentage for each core available on the device. Usage is 0 for each unplugged core. Empty array implies that CPU usage is not supported in the system.",
    ).optional(),
    createTime: z.string().describe("The time the measurements were taken.")
      .optional(),
    fanSpeeds: z.array(z.number()).describe(
      "Fan speeds in RPM for each fan on the device. Empty array means that there are no fans or fan speed is not supported on the system.",
    ).optional(),
    gpuTemperatures: z.array(z.number()).describe(
      "Current GPU temperatures in Celsius for each GPU on the device.",
    ).optional(),
    skinTemperatures: z.array(z.number()).describe(
      "Current device skin temperatures in Celsius.",
    ).optional(),
  })).describe(
    "Hardware status samples in chronological order. This information is only available if hardwareStatusEnabled is true in the device's policy.",
  ).optional(),
  lastPolicySyncTime: z.string().describe(
    "The last time the device fetched its policy.",
  ).optional(),
  lastStatusReportTime: z.string().describe(
    "The last time the device sent a status report.",
  ).optional(),
  managementMode: z.enum([
    "MANAGEMENT_MODE_UNSPECIFIED",
    "DEVICE_OWNER",
    "PROFILE_OWNER",
  ]).describe(
    "The type of management mode Android Device Policy takes on the device. This influences which policy settings are supported.",
  ).optional(),
  memoryEvents: z.array(z.object({
    byteCount: z.string().describe(
      "The number of free bytes in the medium, or for EXTERNAL_STORAGE_DETECTED, the total capacity in bytes of the storage medium.",
    ).optional(),
    createTime: z.string().describe("The creation time of the event.")
      .optional(),
    eventType: z.enum([
      "MEMORY_EVENT_TYPE_UNSPECIFIED",
      "RAM_MEASURED",
      "INTERNAL_STORAGE_MEASURED",
      "EXTERNAL_STORAGE_DETECTED",
      "EXTERNAL_STORAGE_REMOVED",
      "EXTERNAL_STORAGE_MEASURED",
    ]).describe("Event type.").optional(),
  })).describe(
    "Events related to memory and storage measurements in chronological order. This information is only available if memoryInfoEnabled is true in the device's policy.Events are retained for a certain period of time and old events are deleted.",
  ).optional(),
  memoryInfo: z.object({
    totalInternalStorage: z.string().describe(
      "Total internal storage on device in bytes.",
    ).optional(),
    totalRam: z.string().describe("Total RAM on device in bytes.").optional(),
  }).describe("Information about device memory and storage.").optional(),
  name: z.string().describe(
    "The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.",
  ).optional(),
  networkInfo: z.object({
    imei: z.string().describe(
      "IMEI number of the GSM device. For example, A1000031212.",
    ).optional(),
    meid: z.string().describe(
      "MEID number of the CDMA device. For example, A00000292788E1.",
    ).optional(),
    networkOperatorName: z.string().describe(
      "Alphabetic name of current registered operator. For example, Vodafone.",
    ).optional(),
    telephonyInfos: z.array(z.object({
      activationState: z.enum([
        "ACTIVATION_STATE_UNSPECIFIED",
        "ACTIVATED",
        "NOT_ACTIVATED",
      ]).describe(
        "Output only. Activation state of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always ACTIVATION_STATE_UNSPECIFIED for physical SIMs and for devices below Android 15.",
      ).optional(),
      carrierName: z.string().describe(
        "The carrier name associated with this SIM card.",
      ).optional(),
      configMode: z.enum([
        "CONFIG_MODE_UNSPECIFIED",
        "ADMIN_CONFIGURED",
        "USER_CONFIGURED",
      ]).describe(
        "Output only. The configuration mode of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always CONFIG_MODE_UNSPECIFIED for physical SIMs and for devices below Android 15.",
      ).optional(),
      iccId: z.string().describe(
        "Output only. The ICCID associated with this SIM card.",
      ).optional(),
      phoneNumber: z.string().describe(
        "The phone number associated with this SIM card.",
      ).optional(),
    })).describe(
      "Provides telephony information associated with each SIM card on the device. Only supported on fully managed devices starting from Android 6.",
    ).optional(),
    wifiMacAddress: z.string().describe(
      "Wi-Fi MAC address of the device. For example, 7c:11:11:11:11:11.",
    ).optional(),
  }).describe("Device network info.").optional(),
  nonComplianceDetails: z.array(z.object({
    currentValue: z.string().describe(
      "If the policy setting could not be applied, the current value of the setting on the device.",
    ).optional(),
    fieldPath: z.string().describe(
      "For settings with nested fields, if a particular nested field is out of compliance, this specifies the full path to the offending field. The path is formatted in the same way the policy JSON field would be referenced in JavaScript, that is: 1) For object-typed fields, the field name is followed by a dot then by a subfield name. 2) For array-typed fields, the field name is followed by the array index enclosed in brackets. For example, to indicate a problem with the url field in the externalData field in the 3rd application, the path would be applications[2].externalData.url",
    ).optional(),
    installationFailureReason: z.enum([
      "INSTALLATION_FAILURE_REASON_UNSPECIFIED",
      "INSTALLATION_FAILURE_REASON_UNKNOWN",
      "IN_PROGRESS",
      "NOT_FOUND",
      "NOT_COMPATIBLE_WITH_DEVICE",
      "NOT_APPROVED",
      "PERMISSIONS_NOT_ACCEPTED",
      "NOT_AVAILABLE_IN_COUNTRY",
      "NO_LICENSES_REMAINING",
      "NOT_ENROLLED",
      "USER_INVALID",
      "NETWORK_ERROR_UNRELIABLE_CONNECTION",
      "INSUFFICIENT_STORAGE",
    ]).describe(
      "If package_name is set and the non-compliance reason is APP_NOT_INSTALLED or APP_NOT_UPDATED, the detailed reason the app can't be installed or updated.",
    ).optional(),
    nonComplianceReason: z.enum([
      "NON_COMPLIANCE_REASON_UNSPECIFIED",
      "API_LEVEL",
      "MANAGEMENT_MODE",
      "USER_ACTION",
      "INVALID_VALUE",
      "APP_NOT_INSTALLED",
      "UNSUPPORTED",
      "APP_INSTALLED",
      "PENDING",
      "APP_INCOMPATIBLE",
      "APP_NOT_UPDATED",
      "DEVICE_INCOMPATIBLE",
      "APP_SIGNING_CERT_MISMATCH",
      "PROJECT_NOT_PERMITTED",
    ]).describe("The reason the device is not in compliance with the setting.")
      .optional(),
    packageName: z.string().describe(
      "The package name indicating which app is out of compliance, if applicable.",
    ).optional(),
    settingName: z.string().describe(
      "The name of the policy setting. This is the JSON field name of a top-level Policy field.",
    ).optional(),
    specificNonComplianceContext: z.object({
      defaultApplicationContext: z.object({
        defaultApplicationScope: z.enum([
          "DEFAULT_APPLICATION_SCOPE_UNSPECIFIED",
          "SCOPE_FULLY_MANAGED",
          "SCOPE_WORK_PROFILE",
          "SCOPE_PERSONAL_PROFILE",
        ]).describe(
          "Output only. The scope of non-compliant default application setting.",
        ).optional(),
      }).describe(
        "Additional context for non-compliance related to default application settings.",
      ).optional(),
      oncWifiContext: z.object({
        wifiGuid: z.string().describe(
          "The GUID of non-compliant Wi-Fi configuration.",
        ).optional(),
      }).describe(
        "Additional context for non-compliance related to Wi-Fi configuration.",
      ).optional(),
      passwordPoliciesContext: z.object({
        passwordPolicyScope: z.enum([
          "SCOPE_UNSPECIFIED",
          "SCOPE_DEVICE",
          "SCOPE_PROFILE",
        ]).describe("The scope of non-compliant password.").optional(),
      }).describe(
        "Additional context for non-compliance related to password policies.",
      ).optional(),
    }).describe("Additional context for SpecificNonComplianceReason.")
      .optional(),
    specificNonComplianceReason: z.enum([
      "SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED",
      "PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED",
      "PASSWORD_POLICIES_PASSWORD_EXPIRED",
      "PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT",
      "ONC_WIFI_INVALID_VALUE",
      "ONC_WIFI_API_LEVEL",
      "ONC_WIFI_INVALID_ENTERPRISE_CONFIG",
      "ONC_WIFI_USER_SHOULD_REMOVE_NETWORK",
      "ONC_WIFI_KEY_PAIR_ALIAS_NOT_CORRESPONDING_TO_EXISTING_KEY",
      "PERMISSIBLE_USAGE_RESTRICTION",
      "REQUIRED_ACCOUNT_NOT_IN_ENTERPRISE",
      "NEW_ACCOUNT_NOT_IN_ENTERPRISE",
      "DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES",
      "DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE",
      "PRIVATE_DNS_HOST_NOT_SERVING",
    ]).describe(
      "The policy-specific reason the device is not in compliance with the setting.",
    ).optional(),
  })).describe(
    "Details about policy settings that the device is not compliant with.",
  ).optional(),
  ownership: z.enum([
    "OWNERSHIP_UNSPECIFIED",
    "COMPANY_OWNED",
    "PERSONALLY_OWNED",
  ]).describe("Ownership of the managed device.").optional(),
  policyCompliant: z.boolean().describe(
    "Whether the device is compliant with its policy.",
  ).optional(),
  policyName: z.string().describe(
    "The name of the policy applied to the device, in the form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the policy_name for the device's user is applied. This field can be modified by a patch request. You can specify only the policyId when calling enterprises.devices.patch, as long as the policyId doesn’t contain any slashes. The rest of the policy name is inferred.",
  ).optional(),
  powerManagementEvents: z.array(z.object({
    batteryLevel: z.number().describe(
      "For BATTERY_LEVEL_COLLECTED events, the battery level as a percentage.",
    ).optional(),
    createTime: z.string().describe("The creation time of the event.")
      .optional(),
    eventType: z.enum([
      "POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED",
      "BATTERY_LEVEL_COLLECTED",
      "POWER_CONNECTED",
      "POWER_DISCONNECTED",
      "BATTERY_LOW",
      "BATTERY_OKAY",
      "BOOT_COMPLETED",
      "SHUTDOWN",
    ]).describe("Event type.").optional(),
  })).describe(
    "Power management events on the device in chronological order. This information is only available if powerManagementEventsEnabled is true in the device's policy.",
  ).optional(),
  previousDeviceNames: z.array(z.string()).describe(
    "If the same physical device has been enrolled multiple times, this field contains its previous device names. The serial number is used as the unique identifier to determine if the same physical device has enrolled previously. The names are in chronological order.",
  ).optional(),
  securityPosture: z.object({
    devicePosture: z.enum([
      "POSTURE_UNSPECIFIED",
      "SECURE",
      "AT_RISK",
      "POTENTIALLY_COMPROMISED",
    ]).describe("Device's security posture value.").optional(),
    postureDetails: z.array(z.object({
      advice: z.array(z.object({
        defaultMessage: z.unknown().describe(
          "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
        ).optional(),
        localizedMessages: z.unknown().describe(
          "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
        ).optional(),
      })).describe(
        "Corresponding admin-facing advice to mitigate this security risk and improve the security posture of the device.",
      ).optional(),
      securityRisk: z.enum([
        "SECURITY_RISK_UNSPECIFIED",
        "UNKNOWN_OS",
        "COMPROMISED_OS",
        "HARDWARE_BACKED_EVALUATION_FAILED",
      ]).describe(
        "A specific security risk that negatively affects the security posture of the device.",
      ).optional(),
    })).describe(
      "Additional details regarding the security posture of the device.",
    ).optional(),
  }).describe(
    "The security posture of the device, as determined by the current device state and the policies applied.",
  ).optional(),
  softwareInfo: z.object({
    androidBuildNumber: z.string().describe(
      "Android build ID string meant for displaying to the user. For example, shamu-userdebug 6.0.1 MOB30I 2756745 dev-keys.",
    ).optional(),
    androidBuildTime: z.string().describe("Build time.").optional(),
    androidDevicePolicyVersionCode: z.number().int().describe(
      "The Android Device Policy app version code.",
    ).optional(),
    androidDevicePolicyVersionName: z.string().describe(
      "The Android Device Policy app version as displayed to the user.",
    ).optional(),
    androidVersion: z.string().describe(
      "The user-visible Android version string. For example, 6.0.1.",
    ).optional(),
    bootloaderVersion: z.string().describe(
      "The system bootloader version number, e.g. 0.6.7.",
    ).optional(),
    deviceBuildSignature: z.string().describe(
      "SHA-256 hash of android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the system package, which can be used to verify that the system build hasn't been modified.",
    ).optional(),
    deviceKernelVersion: z.string().describe(
      "Kernel version, for example, 2.6.32.9-g103d848.",
    ).optional(),
    primaryLanguageCode: z.string().describe(
      "An IETF BCP 47 language code for the primary locale on the device.",
    ).optional(),
    securityPatchLevel: z.string().describe(
      "Security patch level, e.g. 2016-05-01.",
    ).optional(),
    systemUpdateInfo: z.object({
      updateReceivedTime: z.string().describe(
        "The time when the update was first available. A zero value indicates that this field is not set. This field is set only if an update is available (that is, updateStatus is neither UPDATE_STATUS_UNKNOWN nor UP_TO_DATE).",
      ).optional(),
      updateStatus: z.enum([
        "UPDATE_STATUS_UNKNOWN",
        "UP_TO_DATE",
        "UNKNOWN_UPDATE_AVAILABLE",
        "SECURITY_UPDATE_AVAILABLE",
        "OS_UPDATE_AVAILABLE",
      ]).describe(
        "The status of an update: whether an update exists and what type it is.",
      ).optional(),
    }).describe("Information about a potential pending system update.")
      .optional(),
  }).describe("Information about device software.").optional(),
  state: z.enum([
    "DEVICE_STATE_UNSPECIFIED",
    "ACTIVE",
    "DISABLED",
    "DELETED",
    "PROVISIONING",
    "LOST",
    "PREPARING_FOR_MIGRATION",
    "DEACTIVATED_BY_DEVICE_FINANCE",
  ]).describe(
    "The state to be applied to the device. This field can be modified by a patch request. Note that when calling enterprises.devices.patch, ACTIVE and DISABLED are the only allowable values. To enter the device into a DELETED state, call enterprises.devices.delete.",
  ).optional(),
  systemProperties: z.record(z.string(), z.string()).describe(
    "Map of selected system properties name and value related to the device. This information is only available if systemPropertiesEnabled is true in the device's policy.",
  ).optional(),
  user: z.object({
    accountIdentifier: z.string().describe(
      "A unique identifier you create for this user, such as user342 or asset#44418. This field must be set when the user is created and can't be updated. This field must not contain personally identifiable information (PII). This identifier must be 1024 characters or less; otherwise, the update policy request will fail.",
    ).optional(),
  }).describe("A user belonging to an enterprise.").optional(),
  userName: z.string().describe(
    "The resource name of the user that owns this device in the form enterprises/{enterpriseId}/users/{userId}.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiLevel: z.number().optional(),
  applicationReports: z.array(z.object({
    applicationSource: z.string(),
    displayName: z.string(),
    events: z.array(z.object({
      createTime: z.string(),
      eventType: z.string(),
    })),
    installerPackageName: z.string(),
    keyedAppStates: z.array(z.object({
      createTime: z.string(),
      data: z.string(),
      key: z.string(),
      lastUpdateTime: z.string(),
      message: z.string(),
      severity: z.string(),
    })),
    packageName: z.string(),
    packageSha256Hash: z.string(),
    signingKeyCertFingerprints: z.array(z.string()),
    signingKeyCerts: z.array(z.object({
      signingKeyCertFingerprintSha256: z.string(),
    })),
    state: z.string(),
    userFacingType: z.string(),
    versionCode: z.number(),
    versionName: z.string(),
  })).optional(),
  appliedPasswordPolicies: z.array(z.object({
    maximumFailedPasswordsForWipe: z.number(),
    passwordExpirationTimeout: z.string(),
    passwordHistoryLength: z.number(),
    passwordMinimumLength: z.number(),
    passwordMinimumLetters: z.number(),
    passwordMinimumLowerCase: z.number(),
    passwordMinimumNonLetter: z.number(),
    passwordMinimumNumeric: z.number(),
    passwordMinimumSymbols: z.number(),
    passwordMinimumUpperCase: z.number(),
    passwordQuality: z.string(),
    passwordScope: z.string(),
    requirePasswordUnlock: z.string(),
    unifiedLockSettings: z.string(),
  })).optional(),
  appliedPolicyName: z.string().optional(),
  appliedPolicyVersion: z.string().optional(),
  appliedState: z.string().optional(),
  commonCriteriaModeInfo: z.object({
    commonCriteriaModeStatus: z.string(),
    policySignatureVerificationStatus: z.string(),
  }).optional(),
  defaultApplicationInfo: z.array(z.object({
    defaultApplicationSettingAttempts: z.array(z.object({
      attemptOutcome: z.string(),
      packageName: z.string(),
    })),
    defaultApplicationType: z.string(),
    packageName: z.string(),
  })).optional(),
  deviceSettings: z.object({
    adbEnabled: z.boolean(),
    developmentSettingsEnabled: z.boolean(),
    encryptionStatus: z.string(),
    isDeviceSecure: z.boolean(),
    isEncrypted: z.boolean(),
    unknownSourcesEnabled: z.boolean(),
    verifyAppsEnabled: z.boolean(),
  }).optional(),
  disabledReason: z.object({
    defaultMessage: z.string(),
    localizedMessages: z.record(z.string(), z.unknown()),
  }).optional(),
  displays: z.array(z.object({
    density: z.number(),
    displayId: z.number(),
    height: z.number(),
    name: z.string(),
    refreshRate: z.number(),
    state: z.string(),
    width: z.number(),
  })).optional(),
  dpcMigrationInfo: z.object({
    additionalData: z.string(),
    previousDpc: z.string(),
  }).optional(),
  enrollmentTime: z.string().optional(),
  enrollmentTokenData: z.string().optional(),
  enrollmentTokenName: z.string().optional(),
  hardwareInfo: z.object({
    batteryShutdownTemperatures: z.array(z.number()),
    batteryThrottlingTemperatures: z.array(z.number()),
    brand: z.string(),
    cpuShutdownTemperatures: z.array(z.number()),
    cpuThrottlingTemperatures: z.array(z.number()),
    deviceBasebandVersion: z.string(),
    enterpriseSpecificId: z.string(),
    euiccChipInfo: z.array(z.object({
      eid: z.string(),
    })),
    gpuShutdownTemperatures: z.array(z.number()),
    gpuThrottlingTemperatures: z.array(z.number()),
    hardware: z.string(),
    manufacturer: z.string(),
    model: z.string(),
    serialNumber: z.string(),
    skinShutdownTemperatures: z.array(z.number()),
    skinThrottlingTemperatures: z.array(z.number()),
  }).optional(),
  hardwareStatusSamples: z.array(z.object({
    batteryTemperatures: z.array(z.number()),
    cpuTemperatures: z.array(z.number()),
    cpuUsages: z.array(z.number()),
    createTime: z.string(),
    fanSpeeds: z.array(z.number()),
    gpuTemperatures: z.array(z.number()),
    skinTemperatures: z.array(z.number()),
  })).optional(),
  lastPolicyComplianceReportTime: z.string().optional(),
  lastPolicySyncTime: z.string().optional(),
  lastStatusReportTime: z.string().optional(),
  managementMode: z.string().optional(),
  memoryEvents: z.array(z.object({
    byteCount: z.string(),
    createTime: z.string(),
    eventType: z.string(),
  })).optional(),
  memoryInfo: z.object({
    totalInternalStorage: z.string(),
    totalRam: z.string(),
  }).optional(),
  name: z.string(),
  networkInfo: z.object({
    imei: z.string(),
    meid: z.string(),
    networkOperatorName: z.string(),
    telephonyInfos: z.array(z.object({
      activationState: z.string(),
      carrierName: z.string(),
      configMode: z.string(),
      iccId: z.string(),
      phoneNumber: z.string(),
    })),
    wifiMacAddress: z.string(),
  }).optional(),
  nonComplianceDetails: z.array(z.object({
    currentValue: z.string(),
    fieldPath: z.string(),
    installationFailureReason: z.string(),
    nonComplianceReason: z.string(),
    packageName: z.string(),
    settingName: z.string(),
    specificNonComplianceContext: z.object({
      defaultApplicationContext: z.object({
        defaultApplicationScope: z.string(),
      }),
      oncWifiContext: z.object({
        wifiGuid: z.string(),
      }),
      passwordPoliciesContext: z.object({
        passwordPolicyScope: z.string(),
      }),
    }),
    specificNonComplianceReason: z.string(),
  })).optional(),
  ownership: z.string().optional(),
  policyCompliant: z.boolean().optional(),
  policyName: z.string().optional(),
  powerManagementEvents: z.array(z.object({
    batteryLevel: z.number(),
    createTime: z.string(),
    eventType: z.string(),
  })).optional(),
  previousDeviceNames: z.array(z.string()).optional(),
  securityPosture: z.object({
    devicePosture: z.string(),
    postureDetails: z.array(z.object({
      advice: z.array(z.object({
        defaultMessage: z.unknown(),
        localizedMessages: z.unknown(),
      })),
      securityRisk: z.string(),
    })),
  }).optional(),
  softwareInfo: z.object({
    androidBuildNumber: z.string(),
    androidBuildTime: z.string(),
    androidDevicePolicyVersionCode: z.number(),
    androidDevicePolicyVersionName: z.string(),
    androidVersion: z.string(),
    bootloaderVersion: z.string(),
    deviceBuildSignature: z.string(),
    deviceKernelVersion: z.string(),
    primaryLanguageCode: z.string(),
    securityPatchLevel: z.string(),
    systemUpdateInfo: z.object({
      updateReceivedTime: z.string(),
      updateStatus: z.string(),
    }),
  }).optional(),
  state: z.string().optional(),
  systemProperties: z.record(z.string(), z.unknown()).optional(),
  user: z.object({
    accountIdentifier: z.string(),
  }).optional(),
  userName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  apiLevel: z.number().int().describe(
    "The API level of the Android platform version running on the device.",
  ).optional(),
  applicationReports: z.array(z.object({
    applicationSource: z.enum([
      "APPLICATION_SOURCE_UNSPECIFIED",
      "SYSTEM_APP_FACTORY_VERSION",
      "SYSTEM_APP_UPDATED_VERSION",
      "INSTALLED_FROM_PLAY_STORE",
      "CUSTOM",
    ]).describe("The source of the package.").optional(),
    displayName: z.string().describe("The display name of the app.").optional(),
    events: z.array(z.object({
      createTime: z.string().describe("The creation time of the event.")
        .optional(),
      eventType: z.enum([
        "APPLICATION_EVENT_TYPE_UNSPECIFIED",
        "INSTALLED",
        "CHANGED",
        "DATA_CLEARED",
        "REMOVED",
        "REPLACED",
        "RESTARTED",
        "PINNED",
        "UNPINNED",
      ]).describe("App event type.").optional(),
    })).describe(
      "The list of app events which have occurred in the last 30 hours.",
    ).optional(),
    installerPackageName: z.string().describe(
      "The package name of the app that installed this app.",
    ).optional(),
    keyedAppStates: z.array(z.object({
      createTime: z.string().describe(
        "The creation time of the app state on the device.",
      ).optional(),
      data: z.string().describe(
        "Optionally, a machine-readable value to be read by the EMM. For example, setting values that the admin can choose to query against in the EMM console (e.g. “notify me if the battery_warning data < 10”).",
      ).optional(),
      key: z.string().describe(
        "The key for the app state. Acts as a point of reference for what the app is providing state for. For example, when providing managed configuration feedback, this key could be the managed configuration key.",
      ).optional(),
      lastUpdateTime: z.string().describe(
        "The time the app state was most recently updated.",
      ).optional(),
      message: z.string().describe(
        "Optionally, a free-form message string to explain the app state. If the state was triggered by a particular value (e.g. a managed configuration value), it should be included in the message.",
      ).optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "INFO", "ERROR"]).describe(
        "The severity of the app state.",
      ).optional(),
    })).describe("List of keyed app states reported by the app.").optional(),
    packageName: z.string().describe("Package name of the app.").optional(),
    packageSha256Hash: z.string().describe(
      "The SHA-256 hash of the app's APK file, which can be used to verify the app hasn't been modified. Each byte of the hash value is represented as a two-digit hexadecimal number.",
    ).optional(),
    signingKeyCertFingerprints: z.array(z.string()).describe(
      "Deprecated. Use signingKeyCerts instead. The SHA-1 hash of each android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the app package. Each byte of each hash value is represented as a two-digit hexadecimal number.",
    ).optional(),
    signingKeyCerts: z.array(z.object({
      signingKeyCertFingerprintSha256: z.string().describe(
        "Required. The SHA-256 hash value of the signing key certificate of the app. This must be a valid SHA-256 hash value, i.e. 32 bytes.",
      ).optional(),
    })).describe("Output only. Signing key certificates of the app.")
      .optional(),
    state: z.enum(["APPLICATION_STATE_UNSPECIFIED", "REMOVED", "INSTALLED"])
      .describe("Application state.").optional(),
    userFacingType: z.enum([
      "USER_FACING_TYPE_UNSPECIFIED",
      "NOT_USER_FACING",
      "USER_FACING",
    ]).describe("Whether the app is user facing.").optional(),
    versionCode: z.number().int().describe(
      "The app version code, which can be used to determine whether one version is more recent than another.",
    ).optional(),
    versionName: z.string().describe(
      "The app version as displayed to the user.",
    ).optional(),
  })).describe(
    "Reports for apps installed on the device. This information is only available when application_reports_enabled is true in the device's policy.",
  ).optional(),
  appliedPasswordPolicies: z.array(z.object({
    maximumFailedPasswordsForWipe: z.number().int().describe(
      "Number of incorrect device-unlock passwords that can be entered before a device is wiped. A value of 0 means there is no restriction.",
    ).optional(),
    passwordExpirationTimeout: z.string().describe(
      "Password expiration timeout.",
    ).optional(),
    passwordHistoryLength: z.number().int().describe(
      "The length of the password history. After setting this field, the user won't be able to enter a new password that is the same as any password in the history. A value of 0 means there is no restriction.",
    ).optional(),
    passwordMinimumLength: z.number().int().describe(
      "The minimum allowed password length. A value of 0 means there is no restriction. Only enforced when password_quality is NUMERIC, NUMERIC_COMPLEX, ALPHABETIC, ALPHANUMERIC, or COMPLEX.",
    ).optional(),
    passwordMinimumLetters: z.number().int().describe(
      "Minimum number of letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumLowerCase: z.number().int().describe(
      "Minimum number of lower case letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumNonLetter: z.number().int().describe(
      "Minimum number of non-letter characters (numerical digits or symbols) required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumNumeric: z.number().int().describe(
      "Minimum number of numerical digits required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumSymbols: z.number().int().describe(
      "Minimum number of symbols required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordMinimumUpperCase: z.number().int().describe(
      "Minimum number of upper case letters required in the password. Only enforced when password_quality is COMPLEX.",
    ).optional(),
    passwordQuality: z.enum([
      "PASSWORD_QUALITY_UNSPECIFIED",
      "BIOMETRIC_WEAK",
      "SOMETHING",
      "NUMERIC",
      "NUMERIC_COMPLEX",
      "ALPHABETIC",
      "ALPHANUMERIC",
      "COMPLEX",
      "COMPLEXITY_LOW",
      "COMPLEXITY_MEDIUM",
      "COMPLEXITY_HIGH",
    ]).describe("The required password quality.").optional(),
    passwordScope: z.enum([
      "SCOPE_UNSPECIFIED",
      "SCOPE_DEVICE",
      "SCOPE_PROFILE",
    ]).describe("The scope that the password requirement applies to.")
      .optional(),
    requirePasswordUnlock: z.enum([
      "REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED",
      "USE_DEFAULT_DEVICE_TIMEOUT",
      "REQUIRE_EVERY_DAY",
    ]).describe(
      "The length of time after a device or work profile is unlocked using a strong form of authentication (password, PIN, pattern) that it can be unlocked using any other authentication method (e.g. fingerprint, trust agents, face). After the specified time period elapses, only strong forms of authentication can be used to unlock the device or work profile.",
    ).optional(),
    unifiedLockSettings: z.enum([
      "UNIFIED_LOCK_SETTINGS_UNSPECIFIED",
      "ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK",
      "REQUIRE_SEPARATE_WORK_LOCK",
    ]).describe(
      "Controls whether a unified lock is allowed for the device and the work profile, on devices running Android 9 and above with a work profile. This can be set only if password_scope is set to SCOPE_PROFILE, the policy will be rejected otherwise. If user has not set a separate work lock and this field is set to REQUIRE_SEPARATE_WORK_LOCK, a NonComplianceDetail is reported with nonComplianceReason set to USER_ACTION.",
    ).optional(),
  })).describe(
    "The password requirements currently applied to the device. This field exists because the applied requirements may be slightly different from those specified in passwordPolicies in some cases. Note that this field does not provide information about password compliance. For non-compliance information, see nonComplianceDetails. NonComplianceDetail.fieldPath, is set based on passwordPolicies, not based on this field.",
  ).optional(),
  appliedPolicyName: z.string().describe(
    "The name of the policy currently applied to the device.",
  ).optional(),
  appliedPolicyVersion: z.string().describe(
    "The version of the policy currently applied to the device.",
  ).optional(),
  appliedState: z.enum([
    "DEVICE_STATE_UNSPECIFIED",
    "ACTIVE",
    "DISABLED",
    "DELETED",
    "PROVISIONING",
    "LOST",
    "PREPARING_FOR_MIGRATION",
    "DEACTIVATED_BY_DEVICE_FINANCE",
  ]).describe("The state currently applied to the device.").optional(),
  commonCriteriaModeInfo: z.object({
    commonCriteriaModeStatus: z.enum([
      "COMMON_CRITERIA_MODE_STATUS_UNKNOWN",
      "COMMON_CRITERIA_MODE_DISABLED",
      "COMMON_CRITERIA_MODE_ENABLED",
    ]).describe("Whether Common Criteria Mode is enabled.").optional(),
    policySignatureVerificationStatus: z.enum([
      "POLICY_SIGNATURE_VERIFICATION_STATUS_UNSPECIFIED",
      "POLICY_SIGNATURE_VERIFICATION_DISABLED",
      "POLICY_SIGNATURE_VERIFICATION_SUCCEEDED",
      "POLICY_SIGNATURE_VERIFICATION_NOT_SUPPORTED",
      "POLICY_SIGNATURE_VERIFICATION_FAILED",
    ]).describe("Output only. The status of policy signature verification.")
      .optional(),
  }).describe(
    "Information about Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (https://www.commoncriteriaportal.org/) (CC).This information is only available if statusReportingSettings.commonCriteriaModeEnabled is true in the device's policy.",
  ).optional(),
  defaultApplicationInfo: z.array(z.object({
    defaultApplicationSettingAttempts: z.array(z.object({
      attemptOutcome: z.enum([
        "ATTEMPT_OUTCOME_UNSPECIFIED",
        "SUCCESS",
        "APP_NOT_INSTALLED",
        "APP_SIGNING_CERT_MISMATCH",
        "OTHER_FAILURE",
      ]).describe("Output only. The outcome of setting the app as the default.")
        .optional(),
      packageName: z.string().describe(
        "Output only. The package name of the attempted application.",
      ).optional(),
    })).describe(
      "Output only. Details on the default application setting attempts, in the same order as listed in defaultApplications.",
    ).optional(),
    defaultApplicationType: z.enum([
      "DEFAULT_APPLICATION_TYPE_UNSPECIFIED",
      "DEFAULT_ASSISTANT",
      "DEFAULT_BROWSER",
      "DEFAULT_CALL_REDIRECTION",
      "DEFAULT_CALL_SCREENING",
      "DEFAULT_DIALER",
      "DEFAULT_HOME",
      "DEFAULT_SMS",
      "DEFAULT_WALLET",
    ]).describe("Output only. The default application type.").optional(),
    packageName: z.string().describe(
      "Output only. The package name of the current default application.",
    ).optional(),
  })).describe(
    "Output only. The default application information for the DefaultApplicationType. This information is only available if defaultApplicationInfoReportingEnabled is true in the device's policy. Available on Android 16 and above.All app types are reported on fully managed devices. DEFAULT_BROWSER, DEFAULT_CALL_REDIRECTION, DEFAULT_CALL_SCREENING and DEFAULT_DIALER types are reported for the work profiles on company-owned devices with a work profile and personally-owned devices. DEFAULT_WALLET is also reported for company-owned devices with a work profile, but will only include work profile information.",
  ).optional(),
  deviceSettings: z.object({
    adbEnabled: z.boolean().describe(
      "Whether ADB (https://developer.android.com/studio/command-line/adb.html) is enabled on the device.",
    ).optional(),
    developmentSettingsEnabled: z.boolean().describe(
      "Whether developer mode is enabled on the device.",
    ).optional(),
    encryptionStatus: z.enum([
      "ENCRYPTION_STATUS_UNSPECIFIED",
      "UNSUPPORTED",
      "INACTIVE",
      "ACTIVATING",
      "ACTIVE",
      "ACTIVE_DEFAULT_KEY",
      "ACTIVE_PER_USER",
    ]).describe("Encryption status from DevicePolicyManager.").optional(),
    isDeviceSecure: z.boolean().describe(
      "Whether the device is secured with PIN/password.",
    ).optional(),
    isEncrypted: z.boolean().describe(
      "Whether the storage encryption is enabled.",
    ).optional(),
    unknownSourcesEnabled: z.boolean().describe(
      "Whether installing apps from unknown sources is enabled.",
    ).optional(),
    verifyAppsEnabled: z.boolean().describe(
      "Whether Google Play Protect verification (https://support.google.com/accounts/answer/2812853) is enforced on the device.",
    ).optional(),
  }).describe("Information about security related device settings on device.")
    .optional(),
  disabledReason: z.object({
    defaultMessage: z.string().describe(
      "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
    ).optional(),
    localizedMessages: z.record(z.string(), z.string()).describe(
      "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
    ).optional(),
  }).describe(
    "Provides a user-facing message with locale info. The maximum message length is 4096 characters.",
  ).optional(),
  displays: z.array(z.object({
    density: z.number().int().describe(
      "Display density expressed as dots-per-inch.",
    ).optional(),
    displayId: z.number().int().describe("Unique display id.").optional(),
    height: z.number().int().describe("Display height in pixels.").optional(),
    name: z.string().describe("Name of the display.").optional(),
    refreshRate: z.number().int().describe(
      "Refresh rate of the display in frames per second.",
    ).optional(),
    state: z.enum([
      "DISPLAY_STATE_UNSPECIFIED",
      "OFF",
      "ON",
      "DOZE",
      "SUSPENDED",
    ]).describe("State of the display.").optional(),
    width: z.number().int().describe("Display width in pixels.").optional(),
  })).describe(
    "Detailed information about displays on the device. This information is only available if displayInfoEnabled is true in the device's policy.",
  ).optional(),
  dpcMigrationInfo: z.object({
    additionalData: z.string().describe(
      "Output only. If this device was migrated from another DPC, the additionalData field of the migration token is populated here.",
    ).optional(),
    previousDpc: z.string().describe(
      "Output only. If this device was migrated from another DPC, this is its package name. Not populated otherwise.",
    ).optional(),
  }).describe(
    "Information related to whether this device was migrated from being managed by another Device Policy Controller (DPC).",
  ).optional(),
  enrollmentTime: z.string().describe("The time of device enrollment.")
    .optional(),
  enrollmentTokenData: z.string().describe(
    "If the device was enrolled with an enrollment token with additional data provided, this field contains that data.",
  ).optional(),
  enrollmentTokenName: z.string().describe(
    "If the device was enrolled with an enrollment token, this field contains the name of the token.",
  ).optional(),
  hardwareInfo: z.object({
    batteryShutdownTemperatures: z.array(z.number()).describe(
      "Battery shutdown temperature thresholds in Celsius for each battery on the device.",
    ).optional(),
    batteryThrottlingTemperatures: z.array(z.number()).describe(
      "Battery throttling temperature thresholds in Celsius for each battery on the device.",
    ).optional(),
    brand: z.string().describe("Brand of the device. For example, Google.")
      .optional(),
    cpuShutdownTemperatures: z.array(z.number()).describe(
      "CPU shutdown temperature thresholds in Celsius for each CPU on the device.",
    ).optional(),
    cpuThrottlingTemperatures: z.array(z.number()).describe(
      "CPU throttling temperature thresholds in Celsius for each CPU on the device.",
    ).optional(),
    deviceBasebandVersion: z.string().describe(
      "Baseband version. For example, MDM9625_104662.22.05.34p.",
    ).optional(),
    enterpriseSpecificId: z.string().describe(
      "Output only. ID that uniquely identifies a personally-owned device in a particular organization. On the same physical device when enrolled with the same organization, this ID persists across setups and even factory resets. This ID is available on personally-owned devices with a work profile on devices running Android 12 and above.",
    ).optional(),
    euiccChipInfo: z.array(z.object({
      eid: z.string().describe(
        "Output only. The Embedded Identity Document (EID) that identifies the eUICC chip for each eUICC chip on the device. This is available on company owned devices running Android 13 and above.",
      ).optional(),
    })).describe("Output only. Information related to the eUICC chip.")
      .optional(),
    gpuShutdownTemperatures: z.array(z.number()).describe(
      "GPU shutdown temperature thresholds in Celsius for each GPU on the device.",
    ).optional(),
    gpuThrottlingTemperatures: z.array(z.number()).describe(
      "GPU throttling temperature thresholds in Celsius for each GPU on the device.",
    ).optional(),
    hardware: z.string().describe("Name of the hardware. For example, Angler.")
      .optional(),
    manufacturer: z.string().describe("Manufacturer. For example, Motorola.")
      .optional(),
    model: z.string().describe(
      "The model of the device. For example, Asus Nexus 7.",
    ).optional(),
    serialNumber: z.string().describe(
      "The device serial number. However, for personally-owned devices running Android 12 and above, this is the same as the enterpriseSpecificId.",
    ).optional(),
    skinShutdownTemperatures: z.array(z.number()).describe(
      "Device skin shutdown temperature thresholds in Celsius.",
    ).optional(),
    skinThrottlingTemperatures: z.array(z.number()).describe(
      "Device skin throttling temperature thresholds in Celsius.",
    ).optional(),
  }).describe(
    "Information about device hardware. The fields related to temperature thresholds are only available if hardwareStatusEnabled is true in the device's policy.",
  ).optional(),
  hardwareStatusSamples: z.array(z.object({
    batteryTemperatures: z.array(z.number()).describe(
      "Current battery temperatures in Celsius for each battery on the device.",
    ).optional(),
    cpuTemperatures: z.array(z.number()).describe(
      "Current CPU temperatures in Celsius for each CPU on the device.",
    ).optional(),
    cpuUsages: z.array(z.number()).describe(
      "CPU usages in percentage for each core available on the device. Usage is 0 for each unplugged core. Empty array implies that CPU usage is not supported in the system.",
    ).optional(),
    createTime: z.string().describe("The time the measurements were taken.")
      .optional(),
    fanSpeeds: z.array(z.number()).describe(
      "Fan speeds in RPM for each fan on the device. Empty array means that there are no fans or fan speed is not supported on the system.",
    ).optional(),
    gpuTemperatures: z.array(z.number()).describe(
      "Current GPU temperatures in Celsius for each GPU on the device.",
    ).optional(),
    skinTemperatures: z.array(z.number()).describe(
      "Current device skin temperatures in Celsius.",
    ).optional(),
  })).describe(
    "Hardware status samples in chronological order. This information is only available if hardwareStatusEnabled is true in the device's policy.",
  ).optional(),
  lastPolicySyncTime: z.string().describe(
    "The last time the device fetched its policy.",
  ).optional(),
  lastStatusReportTime: z.string().describe(
    "The last time the device sent a status report.",
  ).optional(),
  managementMode: z.enum([
    "MANAGEMENT_MODE_UNSPECIFIED",
    "DEVICE_OWNER",
    "PROFILE_OWNER",
  ]).describe(
    "The type of management mode Android Device Policy takes on the device. This influences which policy settings are supported.",
  ).optional(),
  memoryEvents: z.array(z.object({
    byteCount: z.string().describe(
      "The number of free bytes in the medium, or for EXTERNAL_STORAGE_DETECTED, the total capacity in bytes of the storage medium.",
    ).optional(),
    createTime: z.string().describe("The creation time of the event.")
      .optional(),
    eventType: z.enum([
      "MEMORY_EVENT_TYPE_UNSPECIFIED",
      "RAM_MEASURED",
      "INTERNAL_STORAGE_MEASURED",
      "EXTERNAL_STORAGE_DETECTED",
      "EXTERNAL_STORAGE_REMOVED",
      "EXTERNAL_STORAGE_MEASURED",
    ]).describe("Event type.").optional(),
  })).describe(
    "Events related to memory and storage measurements in chronological order. This information is only available if memoryInfoEnabled is true in the device's policy.Events are retained for a certain period of time and old events are deleted.",
  ).optional(),
  memoryInfo: z.object({
    totalInternalStorage: z.string().describe(
      "Total internal storage on device in bytes.",
    ).optional(),
    totalRam: z.string().describe("Total RAM on device in bytes.").optional(),
  }).describe("Information about device memory and storage.").optional(),
  name: z.string().describe(
    "The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.",
  ).optional(),
  networkInfo: z.object({
    imei: z.string().describe(
      "IMEI number of the GSM device. For example, A1000031212.",
    ).optional(),
    meid: z.string().describe(
      "MEID number of the CDMA device. For example, A00000292788E1.",
    ).optional(),
    networkOperatorName: z.string().describe(
      "Alphabetic name of current registered operator. For example, Vodafone.",
    ).optional(),
    telephonyInfos: z.array(z.object({
      activationState: z.enum([
        "ACTIVATION_STATE_UNSPECIFIED",
        "ACTIVATED",
        "NOT_ACTIVATED",
      ]).describe(
        "Output only. Activation state of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always ACTIVATION_STATE_UNSPECIFIED for physical SIMs and for devices below Android 15.",
      ).optional(),
      carrierName: z.string().describe(
        "The carrier name associated with this SIM card.",
      ).optional(),
      configMode: z.enum([
        "CONFIG_MODE_UNSPECIFIED",
        "ADMIN_CONFIGURED",
        "USER_CONFIGURED",
      ]).describe(
        "Output only. The configuration mode of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always CONFIG_MODE_UNSPECIFIED for physical SIMs and for devices below Android 15.",
      ).optional(),
      iccId: z.string().describe(
        "Output only. The ICCID associated with this SIM card.",
      ).optional(),
      phoneNumber: z.string().describe(
        "The phone number associated with this SIM card.",
      ).optional(),
    })).describe(
      "Provides telephony information associated with each SIM card on the device. Only supported on fully managed devices starting from Android 6.",
    ).optional(),
    wifiMacAddress: z.string().describe(
      "Wi-Fi MAC address of the device. For example, 7c:11:11:11:11:11.",
    ).optional(),
  }).describe("Device network info.").optional(),
  nonComplianceDetails: z.array(z.object({
    currentValue: z.string().describe(
      "If the policy setting could not be applied, the current value of the setting on the device.",
    ).optional(),
    fieldPath: z.string().describe(
      "For settings with nested fields, if a particular nested field is out of compliance, this specifies the full path to the offending field. The path is formatted in the same way the policy JSON field would be referenced in JavaScript, that is: 1) For object-typed fields, the field name is followed by a dot then by a subfield name. 2) For array-typed fields, the field name is followed by the array index enclosed in brackets. For example, to indicate a problem with the url field in the externalData field in the 3rd application, the path would be applications[2].externalData.url",
    ).optional(),
    installationFailureReason: z.enum([
      "INSTALLATION_FAILURE_REASON_UNSPECIFIED",
      "INSTALLATION_FAILURE_REASON_UNKNOWN",
      "IN_PROGRESS",
      "NOT_FOUND",
      "NOT_COMPATIBLE_WITH_DEVICE",
      "NOT_APPROVED",
      "PERMISSIONS_NOT_ACCEPTED",
      "NOT_AVAILABLE_IN_COUNTRY",
      "NO_LICENSES_REMAINING",
      "NOT_ENROLLED",
      "USER_INVALID",
      "NETWORK_ERROR_UNRELIABLE_CONNECTION",
      "INSUFFICIENT_STORAGE",
    ]).describe(
      "If package_name is set and the non-compliance reason is APP_NOT_INSTALLED or APP_NOT_UPDATED, the detailed reason the app can't be installed or updated.",
    ).optional(),
    nonComplianceReason: z.enum([
      "NON_COMPLIANCE_REASON_UNSPECIFIED",
      "API_LEVEL",
      "MANAGEMENT_MODE",
      "USER_ACTION",
      "INVALID_VALUE",
      "APP_NOT_INSTALLED",
      "UNSUPPORTED",
      "APP_INSTALLED",
      "PENDING",
      "APP_INCOMPATIBLE",
      "APP_NOT_UPDATED",
      "DEVICE_INCOMPATIBLE",
      "APP_SIGNING_CERT_MISMATCH",
      "PROJECT_NOT_PERMITTED",
    ]).describe("The reason the device is not in compliance with the setting.")
      .optional(),
    packageName: z.string().describe(
      "The package name indicating which app is out of compliance, if applicable.",
    ).optional(),
    settingName: z.string().describe(
      "The name of the policy setting. This is the JSON field name of a top-level Policy field.",
    ).optional(),
    specificNonComplianceContext: z.object({
      defaultApplicationContext: z.object({
        defaultApplicationScope: z.enum([
          "DEFAULT_APPLICATION_SCOPE_UNSPECIFIED",
          "SCOPE_FULLY_MANAGED",
          "SCOPE_WORK_PROFILE",
          "SCOPE_PERSONAL_PROFILE",
        ]).describe(
          "Output only. The scope of non-compliant default application setting.",
        ).optional(),
      }).describe(
        "Additional context for non-compliance related to default application settings.",
      ).optional(),
      oncWifiContext: z.object({
        wifiGuid: z.string().describe(
          "The GUID of non-compliant Wi-Fi configuration.",
        ).optional(),
      }).describe(
        "Additional context for non-compliance related to Wi-Fi configuration.",
      ).optional(),
      passwordPoliciesContext: z.object({
        passwordPolicyScope: z.enum([
          "SCOPE_UNSPECIFIED",
          "SCOPE_DEVICE",
          "SCOPE_PROFILE",
        ]).describe("The scope of non-compliant password.").optional(),
      }).describe(
        "Additional context for non-compliance related to password policies.",
      ).optional(),
    }).describe("Additional context for SpecificNonComplianceReason.")
      .optional(),
    specificNonComplianceReason: z.enum([
      "SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED",
      "PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED",
      "PASSWORD_POLICIES_PASSWORD_EXPIRED",
      "PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT",
      "ONC_WIFI_INVALID_VALUE",
      "ONC_WIFI_API_LEVEL",
      "ONC_WIFI_INVALID_ENTERPRISE_CONFIG",
      "ONC_WIFI_USER_SHOULD_REMOVE_NETWORK",
      "ONC_WIFI_KEY_PAIR_ALIAS_NOT_CORRESPONDING_TO_EXISTING_KEY",
      "PERMISSIBLE_USAGE_RESTRICTION",
      "REQUIRED_ACCOUNT_NOT_IN_ENTERPRISE",
      "NEW_ACCOUNT_NOT_IN_ENTERPRISE",
      "DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES",
      "DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE",
      "PRIVATE_DNS_HOST_NOT_SERVING",
    ]).describe(
      "The policy-specific reason the device is not in compliance with the setting.",
    ).optional(),
  })).describe(
    "Details about policy settings that the device is not compliant with.",
  ).optional(),
  ownership: z.enum([
    "OWNERSHIP_UNSPECIFIED",
    "COMPANY_OWNED",
    "PERSONALLY_OWNED",
  ]).describe("Ownership of the managed device.").optional(),
  policyCompliant: z.boolean().describe(
    "Whether the device is compliant with its policy.",
  ).optional(),
  policyName: z.string().describe(
    "The name of the policy applied to the device, in the form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the policy_name for the device's user is applied. This field can be modified by a patch request. You can specify only the policyId when calling enterprises.devices.patch, as long as the policyId doesn’t contain any slashes. The rest of the policy name is inferred.",
  ).optional(),
  powerManagementEvents: z.array(z.object({
    batteryLevel: z.number().describe(
      "For BATTERY_LEVEL_COLLECTED events, the battery level as a percentage.",
    ).optional(),
    createTime: z.string().describe("The creation time of the event.")
      .optional(),
    eventType: z.enum([
      "POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED",
      "BATTERY_LEVEL_COLLECTED",
      "POWER_CONNECTED",
      "POWER_DISCONNECTED",
      "BATTERY_LOW",
      "BATTERY_OKAY",
      "BOOT_COMPLETED",
      "SHUTDOWN",
    ]).describe("Event type.").optional(),
  })).describe(
    "Power management events on the device in chronological order. This information is only available if powerManagementEventsEnabled is true in the device's policy.",
  ).optional(),
  previousDeviceNames: z.array(z.string()).describe(
    "If the same physical device has been enrolled multiple times, this field contains its previous device names. The serial number is used as the unique identifier to determine if the same physical device has enrolled previously. The names are in chronological order.",
  ).optional(),
  securityPosture: z.object({
    devicePosture: z.enum([
      "POSTURE_UNSPECIFIED",
      "SECURE",
      "AT_RISK",
      "POTENTIALLY_COMPROMISED",
    ]).describe("Device's security posture value.").optional(),
    postureDetails: z.array(z.object({
      advice: z.array(z.object({
        defaultMessage: z.unknown().describe(
          "The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.",
        ).optional(),
        localizedMessages: z.unknown().describe(
          "A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr.",
        ).optional(),
      })).describe(
        "Corresponding admin-facing advice to mitigate this security risk and improve the security posture of the device.",
      ).optional(),
      securityRisk: z.enum([
        "SECURITY_RISK_UNSPECIFIED",
        "UNKNOWN_OS",
        "COMPROMISED_OS",
        "HARDWARE_BACKED_EVALUATION_FAILED",
      ]).describe(
        "A specific security risk that negatively affects the security posture of the device.",
      ).optional(),
    })).describe(
      "Additional details regarding the security posture of the device.",
    ).optional(),
  }).describe(
    "The security posture of the device, as determined by the current device state and the policies applied.",
  ).optional(),
  softwareInfo: z.object({
    androidBuildNumber: z.string().describe(
      "Android build ID string meant for displaying to the user. For example, shamu-userdebug 6.0.1 MOB30I 2756745 dev-keys.",
    ).optional(),
    androidBuildTime: z.string().describe("Build time.").optional(),
    androidDevicePolicyVersionCode: z.number().int().describe(
      "The Android Device Policy app version code.",
    ).optional(),
    androidDevicePolicyVersionName: z.string().describe(
      "The Android Device Policy app version as displayed to the user.",
    ).optional(),
    androidVersion: z.string().describe(
      "The user-visible Android version string. For example, 6.0.1.",
    ).optional(),
    bootloaderVersion: z.string().describe(
      "The system bootloader version number, e.g. 0.6.7.",
    ).optional(),
    deviceBuildSignature: z.string().describe(
      "SHA-256 hash of android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the system package, which can be used to verify that the system build hasn't been modified.",
    ).optional(),
    deviceKernelVersion: z.string().describe(
      "Kernel version, for example, 2.6.32.9-g103d848.",
    ).optional(),
    primaryLanguageCode: z.string().describe(
      "An IETF BCP 47 language code for the primary locale on the device.",
    ).optional(),
    securityPatchLevel: z.string().describe(
      "Security patch level, e.g. 2016-05-01.",
    ).optional(),
    systemUpdateInfo: z.object({
      updateReceivedTime: z.string().describe(
        "The time when the update was first available. A zero value indicates that this field is not set. This field is set only if an update is available (that is, updateStatus is neither UPDATE_STATUS_UNKNOWN nor UP_TO_DATE).",
      ).optional(),
      updateStatus: z.enum([
        "UPDATE_STATUS_UNKNOWN",
        "UP_TO_DATE",
        "UNKNOWN_UPDATE_AVAILABLE",
        "SECURITY_UPDATE_AVAILABLE",
        "OS_UPDATE_AVAILABLE",
      ]).describe(
        "The status of an update: whether an update exists and what type it is.",
      ).optional(),
    }).describe("Information about a potential pending system update.")
      .optional(),
  }).describe("Information about device software.").optional(),
  state: z.enum([
    "DEVICE_STATE_UNSPECIFIED",
    "ACTIVE",
    "DISABLED",
    "DELETED",
    "PROVISIONING",
    "LOST",
    "PREPARING_FOR_MIGRATION",
    "DEACTIVATED_BY_DEVICE_FINANCE",
  ]).describe(
    "The state to be applied to the device. This field can be modified by a patch request. Note that when calling enterprises.devices.patch, ACTIVE and DISABLED are the only allowable values. To enter the device into a DELETED state, call enterprises.devices.delete.",
  ).optional(),
  systemProperties: z.record(z.string(), z.string()).describe(
    "Map of selected system properties name and value related to the device. This information is only available if systemPropertiesEnabled is true in the device's policy.",
  ).optional(),
  user: z.object({
    accountIdentifier: z.string().describe(
      "A unique identifier you create for this user, such as user342 or asset#44418. This field must be set when the user is created and can't be updated. This field must not contain personally identifiable information (PII). This identifier must be 1024 characters or less; otherwise, the update policy request will fail.",
    ).optional(),
  }).describe("A user belonging to an enterprise.").optional(),
  userName: z.string().describe(
    "The resource name of the user that owns this device in the form enterprises/{enterpriseId}/users/{userId}.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Android Management Enterprises.Devices. Registered at `@swamp/gcp/androidmanagement/enterprises-devices`. */
export const model = {
  type: "@swamp/gcp/androidmanagement/enterprises-devices",
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
      description:
        "A device owned by an enterprise. Unless otherwise noted, all fields are read-...",
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
      description: "Update devices attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["apiLevel"] !== undefined) body["apiLevel"] = g["apiLevel"];
        if (g["applicationReports"] !== undefined) {
          body["applicationReports"] = g["applicationReports"];
        }
        if (g["appliedPasswordPolicies"] !== undefined) {
          body["appliedPasswordPolicies"] = g["appliedPasswordPolicies"];
        }
        if (g["appliedPolicyName"] !== undefined) {
          body["appliedPolicyName"] = g["appliedPolicyName"];
        }
        if (g["appliedPolicyVersion"] !== undefined) {
          body["appliedPolicyVersion"] = g["appliedPolicyVersion"];
        }
        if (g["appliedState"] !== undefined) {
          body["appliedState"] = g["appliedState"];
        }
        if (g["commonCriteriaModeInfo"] !== undefined) {
          body["commonCriteriaModeInfo"] = g["commonCriteriaModeInfo"];
        }
        if (g["defaultApplicationInfo"] !== undefined) {
          body["defaultApplicationInfo"] = g["defaultApplicationInfo"];
        }
        if (g["deviceSettings"] !== undefined) {
          body["deviceSettings"] = g["deviceSettings"];
        }
        if (g["disabledReason"] !== undefined) {
          body["disabledReason"] = g["disabledReason"];
        }
        if (g["displays"] !== undefined) body["displays"] = g["displays"];
        if (g["dpcMigrationInfo"] !== undefined) {
          body["dpcMigrationInfo"] = g["dpcMigrationInfo"];
        }
        if (g["enrollmentTime"] !== undefined) {
          body["enrollmentTime"] = g["enrollmentTime"];
        }
        if (g["enrollmentTokenData"] !== undefined) {
          body["enrollmentTokenData"] = g["enrollmentTokenData"];
        }
        if (g["enrollmentTokenName"] !== undefined) {
          body["enrollmentTokenName"] = g["enrollmentTokenName"];
        }
        if (g["hardwareInfo"] !== undefined) {
          body["hardwareInfo"] = g["hardwareInfo"];
        }
        if (g["hardwareStatusSamples"] !== undefined) {
          body["hardwareStatusSamples"] = g["hardwareStatusSamples"];
        }
        if (g["lastPolicySyncTime"] !== undefined) {
          body["lastPolicySyncTime"] = g["lastPolicySyncTime"];
        }
        if (g["lastStatusReportTime"] !== undefined) {
          body["lastStatusReportTime"] = g["lastStatusReportTime"];
        }
        if (g["managementMode"] !== undefined) {
          body["managementMode"] = g["managementMode"];
        }
        if (g["memoryEvents"] !== undefined) {
          body["memoryEvents"] = g["memoryEvents"];
        }
        if (g["memoryInfo"] !== undefined) body["memoryInfo"] = g["memoryInfo"];
        if (g["networkInfo"] !== undefined) {
          body["networkInfo"] = g["networkInfo"];
        }
        if (g["nonComplianceDetails"] !== undefined) {
          body["nonComplianceDetails"] = g["nonComplianceDetails"];
        }
        if (g["ownership"] !== undefined) body["ownership"] = g["ownership"];
        if (g["policyCompliant"] !== undefined) {
          body["policyCompliant"] = g["policyCompliant"];
        }
        if (g["policyName"] !== undefined) body["policyName"] = g["policyName"];
        if (g["powerManagementEvents"] !== undefined) {
          body["powerManagementEvents"] = g["powerManagementEvents"];
        }
        if (g["previousDeviceNames"] !== undefined) {
          body["previousDeviceNames"] = g["previousDeviceNames"];
        }
        if (g["securityPosture"] !== undefined) {
          body["securityPosture"] = g["securityPosture"];
        }
        if (g["softwareInfo"] !== undefined) {
          body["softwareInfo"] = g["softwareInfo"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["systemProperties"] !== undefined) {
          body["systemProperties"] = g["systemProperties"];
        }
        if (g["user"] !== undefined) body["user"] = g["user"];
        if (g["userName"] !== undefined) body["userName"] = g["userName"];
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
              "failedValues": [],
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
      description: "Delete the devices",
      arguments: z.object({
        identifier: z.string().describe("The name of the devices"),
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
    issue_command: {
      description: "issue command",
      arguments: z.object({
        addEsimParams: z.any().optional(),
        clearAppsDataParams: z.any().optional(),
        clearAppsDataStatus: z.any().optional(),
        createTime: z.any().optional(),
        duration: z.any().optional(),
        errorCode: z.any().optional(),
        esimStatus: z.any().optional(),
        newPassword: z.any().optional(),
        removeEsimParams: z.any().optional(),
        requestDeviceInfoParams: z.any().optional(),
        requestDeviceInfoStatus: z.any().optional(),
        resetPasswordFlags: z.any().optional(),
        startLostModeParams: z.any().optional(),
        startLostModeStatus: z.any().optional(),
        stopLostModeParams: z.any().optional(),
        stopLostModeStatus: z.any().optional(),
        type: z.any().optional(),
        userName: z.any().optional(),
        wipeParams: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["addEsimParams"] !== undefined) {
          body["addEsimParams"] = args["addEsimParams"];
        }
        if (args["clearAppsDataParams"] !== undefined) {
          body["clearAppsDataParams"] = args["clearAppsDataParams"];
        }
        if (args["clearAppsDataStatus"] !== undefined) {
          body["clearAppsDataStatus"] = args["clearAppsDataStatus"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["duration"] !== undefined) body["duration"] = args["duration"];
        if (args["errorCode"] !== undefined) {
          body["errorCode"] = args["errorCode"];
        }
        if (args["esimStatus"] !== undefined) {
          body["esimStatus"] = args["esimStatus"];
        }
        if (args["newPassword"] !== undefined) {
          body["newPassword"] = args["newPassword"];
        }
        if (args["removeEsimParams"] !== undefined) {
          body["removeEsimParams"] = args["removeEsimParams"];
        }
        if (args["requestDeviceInfoParams"] !== undefined) {
          body["requestDeviceInfoParams"] = args["requestDeviceInfoParams"];
        }
        if (args["requestDeviceInfoStatus"] !== undefined) {
          body["requestDeviceInfoStatus"] = args["requestDeviceInfoStatus"];
        }
        if (args["resetPasswordFlags"] !== undefined) {
          body["resetPasswordFlags"] = args["resetPasswordFlags"];
        }
        if (args["startLostModeParams"] !== undefined) {
          body["startLostModeParams"] = args["startLostModeParams"];
        }
        if (args["startLostModeStatus"] !== undefined) {
          body["startLostModeStatus"] = args["startLostModeStatus"];
        }
        if (args["stopLostModeParams"] !== undefined) {
          body["stopLostModeParams"] = args["stopLostModeParams"];
        }
        if (args["stopLostModeStatus"] !== undefined) {
          body["stopLostModeStatus"] = args["stopLostModeStatus"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        if (args["userName"] !== undefined) body["userName"] = args["userName"];
        if (args["wipeParams"] !== undefined) {
          body["wipeParams"] = args["wipeParams"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidmanagement.enterprises.devices.issueCommand",
            "path": "v1/{+name}:issueCommand",
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
