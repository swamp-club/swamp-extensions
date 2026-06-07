// Auto-generated extension model for @swamp/gcp/admin/chromeosdevices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Chromeosdevices.
 *
 * Google Chrome devices run on the [Chrome OS](https://support.google.com/chromeos). For more information about common API tasks, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.chromeosdevices.get",
  "path":
    "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
    "deviceId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "deviceId": {
      "location": "path",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.chromeosdevices.update",
  "path":
    "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customerId",
    "deviceId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "deviceId": {
      "location": "path",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.chromeosdevices.list",
  "path": "admin/directory/v1/customer/{customerId}/devices/chromeos",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "includeChildOrgunits": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "orgUnitPath": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projection": {
      "location": "query",
    },
    "query": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  activeTimeRanges: z.array(z.object({
    activeTime: z.number().int().describe("Duration of usage in milliseconds.")
      .optional(),
    date: z.string().describe("Date of usage").optional(),
  })).describe("A list of active time ranges (Read-only).").optional(),
  annotatedAssetId: z.string().describe(
    "The asset identifier as noted by an administrator or specified during enrollment.",
  ).optional(),
  annotatedLocation: z.string().describe(
    "The address or location of the device as noted by the administrator. Maximum length is `200` characters. Empty values are allowed.",
  ).optional(),
  annotatedUser: z.string().describe(
    "The user of the device as noted by the administrator. Maximum length is 100 characters. Empty values are allowed.",
  ).optional(),
  autoUpdateThrough: z.string().describe(
    "Output only. The timestamp after which the device will stop receiving Chrome updates or support.",
  ).optional(),
  backlightInfo: z.array(z.object({
    brightness: z.number().int().describe(
      "Output only. Current brightness of the backlight, between 0 and max_brightness.",
    ).optional(),
    maxBrightness: z.number().int().describe(
      "Output only. Maximum brightness for the backlight.",
    ).optional(),
    path: z.string().describe(
      "Output only. Path to this backlight on the system. Useful if the caller needs to correlate with other information.",
    ).optional(),
  })).describe("Output only. Contains backlight information for the device.")
    .optional(),
  bluetoothAdapterInfo: z.array(z.object({
    address: z.string().describe("Output only. The MAC address of the adapter.")
      .optional(),
    numConnectedDevices: z.number().int().describe(
      "Output only. The number of devices connected to this adapter.",
    ).optional(),
  })).describe(
    "Output only. Information about Bluetooth adapters of the device.",
  ).optional(),
  bootMode: z.string().describe(
    "The boot mode for the device. The possible values are: * `Verified`: The device is running a valid version of the Chrome OS. * `Dev`: The devices's developer hardware switch is enabled. When booted, the device has a command line shell. For an example of a developer switch, see the [Chromebook developer information](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-series-5-chromebook#TOC-Developer-switch).",
  ).optional(),
  chromeOsType: z.enum(["chromeOsTypeUnspecified", "chromeOsFlex", "chromeOs"])
    .describe("Output only. Chrome OS type of the device.").optional(),
  cpuInfo: z.array(z.object({
    architecture: z.string().describe("The CPU architecture.").optional(),
    logicalCpus: z.array(z.object({
      cStates: z.array(z.unknown()).describe(
        "C-States indicate the power consumption state of the CPU. For more information look at documentation published by the CPU maker.",
      ).optional(),
      currentScalingFrequencyKhz: z.number().int().describe(
        "Current frequency the CPU is running at.",
      ).optional(),
      idleDuration: z.string().describe("Idle time since last boot.")
        .optional(),
      maxScalingFrequencyKhz: z.number().int().describe(
        "Maximum frequency the CPU is allowed to run at, by policy.",
      ).optional(),
    })).describe("Information for the Logical CPUs").optional(),
    maxClockSpeedKhz: z.number().int().describe(
      "The max CPU clock speed in kHz.",
    ).optional(),
    model: z.string().describe("The CPU model name.").optional(),
  })).describe("Information regarding CPU specs in the device.").optional(),
  cpuStatusReports: z.array(z.object({
    cpuTemperatureInfo: z.array(z.object({
      label: z.string().describe("CPU label").optional(),
      temperature: z.number().int().describe("Temperature in Celsius degrees.")
        .optional(),
    })).describe("A list of CPU temperature samples.").optional(),
    cpuUtilizationPercentageInfo: z.array(z.number().int()).optional(),
    reportTime: z.string().describe("Date and time the report was received.")
      .optional(),
  })).describe("Reports of CPU utilization and temperature (Read-only)")
    .optional(),
  deprovisionReason: z.enum([
    "DEPROVISION_REASON_UNSPECIFIED",
    "DEPROVISION_REASON_SAME_MODEL_REPLACEMENT",
    "DEPROVISION_REASON_UPGRADE",
    "DEPROVISION_REASON_DOMAIN_MOVE",
    "DEPROVISION_REASON_SERVICE_EXPIRATION",
    "DEPROVISION_REASON_OTHER",
    "DEPROVISION_REASON_DIFFERENT_MODEL_REPLACEMENT",
    "DEPROVISION_REASON_RETIRING_DEVICE",
    "DEPROVISION_REASON_UPGRADE_TRANSFER",
    "DEPROVISION_REASON_NOT_REQUIRED",
    "DEPROVISION_REASON_REPAIR_CENTER",
  ]).describe("(Read-only) Deprovision reason.").optional(),
  deviceFiles: z.array(z.object({
    createTime: z.string().describe("Date and time the file was created")
      .optional(),
    downloadUrl: z.string().describe("File download URL").optional(),
    name: z.string().describe("File name").optional(),
    type: z.string().describe("File type").optional(),
  })).describe("A list of device files to download (Read-only)").optional(),
  deviceId: z.string().describe("The unique ID of the Chrome device.")
    .optional(),
  deviceLicenseType: z.enum([
    "deviceLicenseTypeUnspecified",
    "enterprise",
    "enterpriseUpgrade",
    "educationUpgrade",
    "education",
    "kioskUpgrade",
    "enterpriseUpgradePerpetual",
    "enterpriseUpgradeFixedTerm",
    "educationUpgradePerpetual",
    "educationUpgradeFixedTerm",
  ]).describe("Output only. Device license type.").optional(),
  diskSpaceUsage: z.object({
    capacityBytes: z.string().describe(
      "Output only. The total capacity value, in bytes.",
    ).optional(),
    usedBytes: z.string().describe(
      "Output only. The current usage value, in bytes.",
    ).optional(),
  }).describe(
    "Represents a data capacity with some amount of current usage in bytes.",
  ).optional(),
  diskVolumeReports: z.array(z.object({
    volumeInfo: z.array(z.object({
      storageFree: z.string().describe("Free disk space [in bytes]").optional(),
      storageTotal: z.string().describe("Total disk space [in bytes]")
        .optional(),
      volumeId: z.string().describe("Volume id").optional(),
    })).describe("Disk volumes").optional(),
  })).describe(
    "Reports of disk space and other info about mounted/connected volumes.",
  ).optional(),
  dockMacAddress: z.string().describe(
    "(Read-only) Built-in MAC address for the docking station that the device connected to. Factory sets Media access control address (MAC address) assigned for use by a dock. It is reserved specifically for MAC pass through device policy. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices.",
  ).optional(),
  etag: z.string().describe("ETag of the resource.").optional(),
  ethernetMacAddress: z.string().describe(
    "The device's MAC address on the ethernet network interface.",
  ).optional(),
  ethernetMacAddress0: z.string().describe(
    "(Read-only) MAC address used by the Chromebook’s internal ethernet port, and for onboard network (ethernet) interface. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices.",
  ).optional(),
  extendedSupportEligible: z.boolean().describe(
    "Output only. Whether or not the device requires the extended support opt in.",
  ).optional(),
  extendedSupportEnabled: z.boolean().describe(
    "Output only. Whether extended support policy is enabled on the device.",
  ).optional(),
  extendedSupportStart: z.string().describe(
    "Output only. Date of the device when extended support policy for automatic updates starts.",
  ).optional(),
  fanInfo: z.array(z.object({
    speedRpm: z.number().int().describe("Output only. Fan speed in RPM.")
      .optional(),
  })).describe("Output only. Fan information for the device.").optional(),
  firmwareVersion: z.string().describe("The Chrome device's firmware version.")
    .optional(),
  firstEnrollmentTime: z.string().describe(
    "Date and time for the first time the device was enrolled.",
  ).optional(),
  kind: z.string().describe(
    "The type of resource. For the Chromeosdevices resource, the value is `admin#directory#chromeosdevice`.",
  ).optional(),
  lastDeprovisionTimestamp: z.string().describe(
    "(Read-only) Date and time for the last deprovision of the device.",
  ).optional(),
  lastEnrollmentTime: z.string().describe(
    "Date and time the device was last enrolled (Read-only)",
  ).optional(),
  lastKnownNetwork: z.array(z.object({
    ipAddress: z.string().describe("The IP address.").optional(),
    wanIpAddress: z.string().describe("The WAN IP address.").optional(),
  })).describe("Contains last known network (Read-only)").optional(),
  lastSync: z.string().describe(
    "Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only)",
  ).optional(),
  macAddress: z.string().describe(
    "The device's wireless MAC address. If the device does not have this information, it is not included in the response.",
  ).optional(),
  manufactureDate: z.string().describe(
    "(Read-only) The date the device was manufactured in yyyy-mm-dd format.",
  ).optional(),
  meid: z.string().describe(
    "The Mobile Equipment Identifier (MEID) or the International Mobile Equipment Identity (IMEI) for the 3G mobile card in a mobile device. A MEID/IMEI is typically used when adding a device to a wireless carrier's post-pay service plan. If the device does not have this information, this property is not included in the response. For more information on how to export a MEID/IMEI list, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices.html#export_meid).",
  ).optional(),
  model: z.string().describe(
    "The device's model information. If the device does not have this information, this property is not included in the response.",
  ).optional(),
  notes: z.string().describe(
    "Notes about this device added by the administrator. This property can be [searched](https://support.google.com/chrome/a/answer/1698333) with the [list](https://developers.google.com/workspace/admin/directory/v1/reference/chromeosdevices/list) method's `query` parameter. Maximum length is 500 characters. Empty values are allowed.",
  ).optional(),
  orderNumber: z.string().describe(
    "The device's order number. Only devices directly purchased from Google have an order number.",
  ).optional(),
  orgUnitId: z.string().describe(
    "The unique ID of the organizational unit. orgUnitPath is the human readable version of orgUnitId. While orgUnitPath may change by renaming an organizational unit within the path, orgUnitId is unchangeable for one organizational unit. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433).",
  ).optional(),
  orgUnitPath: z.string().describe(
    "The full parent path with the organizational unit's name associated with the device. Path names are case insensitive. If the parent organizational unit is the top-level organization, it is represented as a forward slash, `/`. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433).",
  ).optional(),
  osUpdateStatus: z.object({
    rebootTime: z.string().describe("Date and time of the last reboot.")
      .optional(),
    state: z.enum([
      "updateStateUnspecified",
      "updateStateNotStarted",
      "updateStateDownloadInProgress",
      "updateStateNeedReboot",
    ]).describe("The update state of an OS update.").optional(),
    targetKioskAppVersion: z.string().describe(
      "New required platform version from the pending updated kiosk app.",
    ).optional(),
    targetOsVersion: z.string().describe(
      'New platform version of the OS image being downloaded and applied. It is only set when update status is UPDATE_STATUS_DOWNLOAD_IN_PROGRESS or UPDATE_STATUS_NEED_REBOOT. Note this could be a dummy "0.0.0.0" for UPDATE_STATUS_NEED_REBOOT for some edge cases, e.g. update engine is restarted without a reboot.',
    ).optional(),
    updateCheckTime: z.string().describe(
      "Date and time of the last update check.",
    ).optional(),
    updateTime: z.string().describe(
      "Date and time of the last successful OS update.",
    ).optional(),
  }).describe("Contains information regarding the current OS update status.")
    .optional(),
  osVersion: z.string().describe(
    "The Chrome device's operating system version.",
  ).optional(),
  osVersionCompliance: z.enum([
    "complianceUnspecified",
    "compliant",
    "pending",
    "notCompliant",
  ]).describe("Output only. Device policy compliance status of the OS version.")
    .optional(),
  platformVersion: z.string().describe("The Chrome device's platform version.")
    .optional(),
  recentUsers: z.array(z.object({
    email: z.string().describe(
      "The user's email address. This is only present if the user type is `USER_TYPE_MANAGED`.",
    ).optional(),
    type: z.string().describe("The type of the user.").optional(),
  })).describe(
    "A list of recent device users, in descending order, by last login time.",
  ).optional(),
  screenshotFiles: z.array(z.object({
    createTime: z.string().describe("Date and time the file was created")
      .optional(),
    downloadUrl: z.string().describe("File download URL").optional(),
    name: z.string().describe("File name").optional(),
    type: z.string().describe("File type").optional(),
  })).describe(
    'A list of screenshot files to download. Type is always "SCREENSHOT_FILE". (Read-only)',
  ).optional(),
  serialNumber: z.string().describe(
    "The Chrome device serial number entered when the device was enabled. This value is the same as the Admin console's *Serial Number* in the *Chrome OS Devices* tab.",
  ).optional(),
  status: z.string().describe("The status of the device.").optional(),
  supportEndDate: z.string().describe(
    "Final date the device will be supported (Read-only)",
  ).optional(),
  systemRamFreeReports: z.array(z.object({
    reportTime: z.string().describe("Date and time the report was received.")
      .optional(),
    systemRamFreeInfo: z.array(z.string()).optional(),
  })).describe("Reports of amounts of available RAM memory (Read-only)")
    .optional(),
  systemRamTotal: z.string().describe(
    "Total RAM on the device [in bytes] (Read-only)",
  ).optional(),
  tpmVersionInfo: z.object({
    family: z.string().describe(
      'TPM family. We use the TPM 2.0 style encoding, e.g.: TPM 1.2: "1.2" -> 312e3200 TPM 2.0: "2.0" -> 322e3000',
    ).optional(),
    firmwareVersion: z.string().describe("TPM firmware version.").optional(),
    manufacturer: z.string().describe("TPM manufacturer code.").optional(),
    specLevel: z.string().describe(
      "TPM specification level. See Library Specification for TPM 2.0 and Main Specification for TPM 1.2.",
    ).optional(),
    tpmModel: z.string().describe("TPM model number.").optional(),
    vendorSpecific: z.string().describe(
      "Vendor-specific information such as Vendor ID.",
    ).optional(),
  }).describe("Trusted Platform Module (TPM) (Read-only)").optional(),
  willAutoRenew: z.boolean().describe(
    "Determines if the device will auto renew its support after the support end date. This is a read-only property.",
  ).optional(),
});

const StateSchema = z.object({
  activeTimeRanges: z.array(z.object({
    activeTime: z.number(),
    date: z.string(),
  })).optional(),
  annotatedAssetId: z.string().optional(),
  annotatedLocation: z.string().optional(),
  annotatedUser: z.string().optional(),
  autoUpdateExpiration: z.string().optional(),
  autoUpdateThrough: z.string().optional(),
  backlightInfo: z.array(z.object({
    brightness: z.number(),
    maxBrightness: z.number(),
    path: z.string(),
  })).optional(),
  bluetoothAdapterInfo: z.array(z.object({
    address: z.string(),
    numConnectedDevices: z.number(),
  })).optional(),
  bootMode: z.string().optional(),
  chromeOsType: z.string().optional(),
  cpuInfo: z.array(z.object({
    architecture: z.string(),
    logicalCpus: z.array(z.object({
      cStates: z.array(z.unknown()),
      currentScalingFrequencyKhz: z.number(),
      idleDuration: z.string(),
      maxScalingFrequencyKhz: z.number(),
    })),
    maxClockSpeedKhz: z.number(),
    model: z.string(),
  })).optional(),
  cpuStatusReports: z.array(z.object({
    cpuTemperatureInfo: z.array(z.object({
      label: z.string(),
      temperature: z.number(),
    })),
    cpuUtilizationPercentageInfo: z.array(z.number()),
    reportTime: z.string(),
  })).optional(),
  deprovisionReason: z.string().optional(),
  deviceFiles: z.array(z.object({
    createTime: z.string(),
    downloadUrl: z.string(),
    name: z.string(),
    type: z.string(),
  })).optional(),
  deviceId: z.string().optional(),
  deviceLicenseType: z.string().optional(),
  diskSpaceUsage: z.object({
    capacityBytes: z.string(),
    usedBytes: z.string(),
  }).optional(),
  diskVolumeReports: z.array(z.object({
    volumeInfo: z.array(z.object({
      storageFree: z.string(),
      storageTotal: z.string(),
      volumeId: z.string(),
    })),
  })).optional(),
  dockMacAddress: z.string().optional(),
  etag: z.string().optional(),
  ethernetMacAddress: z.string().optional(),
  ethernetMacAddress0: z.string().optional(),
  extendedSupportEligible: z.boolean().optional(),
  extendedSupportEnabled: z.boolean().optional(),
  extendedSupportStart: z.string().optional(),
  fanInfo: z.array(z.object({
    speedRpm: z.number(),
  })).optional(),
  firmwareVersion: z.string().optional(),
  firstEnrollmentTime: z.string().optional(),
  kind: z.string().optional(),
  lastDeprovisionTimestamp: z.string().optional(),
  lastEnrollmentTime: z.string().optional(),
  lastKnownNetwork: z.array(z.object({
    ipAddress: z.string(),
    wanIpAddress: z.string(),
  })).optional(),
  lastSync: z.string().optional(),
  macAddress: z.string().optional(),
  manufactureDate: z.string().optional(),
  meid: z.string().optional(),
  model: z.string().optional(),
  notes: z.string().optional(),
  orderNumber: z.string().optional(),
  orgUnitId: z.string().optional(),
  orgUnitPath: z.string().optional(),
  osUpdateStatus: z.object({
    rebootTime: z.string(),
    state: z.string(),
    targetKioskAppVersion: z.string(),
    targetOsVersion: z.string(),
    updateCheckTime: z.string(),
    updateTime: z.string(),
  }).optional(),
  osVersion: z.string().optional(),
  osVersionCompliance: z.string().optional(),
  platformVersion: z.string().optional(),
  recentUsers: z.array(z.object({
    email: z.string(),
    type: z.string(),
  })).optional(),
  screenshotFiles: z.array(z.object({
    createTime: z.string(),
    downloadUrl: z.string(),
    name: z.string(),
    type: z.string(),
  })).optional(),
  serialNumber: z.string().optional(),
  status: z.string().optional(),
  supportEndDate: z.string().optional(),
  systemRamFreeReports: z.array(z.object({
    reportTime: z.string(),
    systemRamFreeInfo: z.array(z.string()),
  })).optional(),
  systemRamTotal: z.string().optional(),
  tpmVersionInfo: z.object({
    family: z.string(),
    firmwareVersion: z.string(),
    manufacturer: z.string(),
    specLevel: z.string(),
    tpmModel: z.string(),
    vendorSpecific: z.string(),
  }).optional(),
  willAutoRenew: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  activeTimeRanges: z.array(z.object({
    activeTime: z.number().int().describe("Duration of usage in milliseconds.")
      .optional(),
    date: z.string().describe("Date of usage").optional(),
  })).describe("A list of active time ranges (Read-only).").optional(),
  annotatedAssetId: z.string().describe(
    "The asset identifier as noted by an administrator or specified during enrollment.",
  ).optional(),
  annotatedLocation: z.string().describe(
    "The address or location of the device as noted by the administrator. Maximum length is `200` characters. Empty values are allowed.",
  ).optional(),
  annotatedUser: z.string().describe(
    "The user of the device as noted by the administrator. Maximum length is 100 characters. Empty values are allowed.",
  ).optional(),
  autoUpdateThrough: z.string().describe(
    "Output only. The timestamp after which the device will stop receiving Chrome updates or support.",
  ).optional(),
  backlightInfo: z.array(z.object({
    brightness: z.number().int().describe(
      "Output only. Current brightness of the backlight, between 0 and max_brightness.",
    ).optional(),
    maxBrightness: z.number().int().describe(
      "Output only. Maximum brightness for the backlight.",
    ).optional(),
    path: z.string().describe(
      "Output only. Path to this backlight on the system. Useful if the caller needs to correlate with other information.",
    ).optional(),
  })).describe("Output only. Contains backlight information for the device.")
    .optional(),
  bluetoothAdapterInfo: z.array(z.object({
    address: z.string().describe("Output only. The MAC address of the adapter.")
      .optional(),
    numConnectedDevices: z.number().int().describe(
      "Output only. The number of devices connected to this adapter.",
    ).optional(),
  })).describe(
    "Output only. Information about Bluetooth adapters of the device.",
  ).optional(),
  bootMode: z.string().describe(
    "The boot mode for the device. The possible values are: * `Verified`: The device is running a valid version of the Chrome OS. * `Dev`: The devices's developer hardware switch is enabled. When booted, the device has a command line shell. For an example of a developer switch, see the [Chromebook developer information](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-series-5-chromebook#TOC-Developer-switch).",
  ).optional(),
  chromeOsType: z.enum(["chromeOsTypeUnspecified", "chromeOsFlex", "chromeOs"])
    .describe("Output only. Chrome OS type of the device.").optional(),
  cpuInfo: z.array(z.object({
    architecture: z.string().describe("The CPU architecture.").optional(),
    logicalCpus: z.array(z.object({
      cStates: z.array(z.unknown()).describe(
        "C-States indicate the power consumption state of the CPU. For more information look at documentation published by the CPU maker.",
      ).optional(),
      currentScalingFrequencyKhz: z.number().int().describe(
        "Current frequency the CPU is running at.",
      ).optional(),
      idleDuration: z.string().describe("Idle time since last boot.")
        .optional(),
      maxScalingFrequencyKhz: z.number().int().describe(
        "Maximum frequency the CPU is allowed to run at, by policy.",
      ).optional(),
    })).describe("Information for the Logical CPUs").optional(),
    maxClockSpeedKhz: z.number().int().describe(
      "The max CPU clock speed in kHz.",
    ).optional(),
    model: z.string().describe("The CPU model name.").optional(),
  })).describe("Information regarding CPU specs in the device.").optional(),
  cpuStatusReports: z.array(z.object({
    cpuTemperatureInfo: z.array(z.object({
      label: z.string().describe("CPU label").optional(),
      temperature: z.number().int().describe("Temperature in Celsius degrees.")
        .optional(),
    })).describe("A list of CPU temperature samples.").optional(),
    cpuUtilizationPercentageInfo: z.array(z.number().int()).optional(),
    reportTime: z.string().describe("Date and time the report was received.")
      .optional(),
  })).describe("Reports of CPU utilization and temperature (Read-only)")
    .optional(),
  deprovisionReason: z.enum([
    "DEPROVISION_REASON_UNSPECIFIED",
    "DEPROVISION_REASON_SAME_MODEL_REPLACEMENT",
    "DEPROVISION_REASON_UPGRADE",
    "DEPROVISION_REASON_DOMAIN_MOVE",
    "DEPROVISION_REASON_SERVICE_EXPIRATION",
    "DEPROVISION_REASON_OTHER",
    "DEPROVISION_REASON_DIFFERENT_MODEL_REPLACEMENT",
    "DEPROVISION_REASON_RETIRING_DEVICE",
    "DEPROVISION_REASON_UPGRADE_TRANSFER",
    "DEPROVISION_REASON_NOT_REQUIRED",
    "DEPROVISION_REASON_REPAIR_CENTER",
  ]).describe("(Read-only) Deprovision reason.").optional(),
  deviceFiles: z.array(z.object({
    createTime: z.string().describe("Date and time the file was created")
      .optional(),
    downloadUrl: z.string().describe("File download URL").optional(),
    name: z.string().describe("File name").optional(),
    type: z.string().describe("File type").optional(),
  })).describe("A list of device files to download (Read-only)").optional(),
  deviceId: z.string().describe("The unique ID of the Chrome device.")
    .optional(),
  deviceLicenseType: z.enum([
    "deviceLicenseTypeUnspecified",
    "enterprise",
    "enterpriseUpgrade",
    "educationUpgrade",
    "education",
    "kioskUpgrade",
    "enterpriseUpgradePerpetual",
    "enterpriseUpgradeFixedTerm",
    "educationUpgradePerpetual",
    "educationUpgradeFixedTerm",
  ]).describe("Output only. Device license type.").optional(),
  diskSpaceUsage: z.object({
    capacityBytes: z.string().describe(
      "Output only. The total capacity value, in bytes.",
    ).optional(),
    usedBytes: z.string().describe(
      "Output only. The current usage value, in bytes.",
    ).optional(),
  }).describe(
    "Represents a data capacity with some amount of current usage in bytes.",
  ).optional(),
  diskVolumeReports: z.array(z.object({
    volumeInfo: z.array(z.object({
      storageFree: z.string().describe("Free disk space [in bytes]").optional(),
      storageTotal: z.string().describe("Total disk space [in bytes]")
        .optional(),
      volumeId: z.string().describe("Volume id").optional(),
    })).describe("Disk volumes").optional(),
  })).describe(
    "Reports of disk space and other info about mounted/connected volumes.",
  ).optional(),
  dockMacAddress: z.string().describe(
    "(Read-only) Built-in MAC address for the docking station that the device connected to. Factory sets Media access control address (MAC address) assigned for use by a dock. It is reserved specifically for MAC pass through device policy. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices.",
  ).optional(),
  etag: z.string().describe("ETag of the resource.").optional(),
  ethernetMacAddress: z.string().describe(
    "The device's MAC address on the ethernet network interface.",
  ).optional(),
  ethernetMacAddress0: z.string().describe(
    "(Read-only) MAC address used by the Chromebook’s internal ethernet port, and for onboard network (ethernet) interface. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices.",
  ).optional(),
  extendedSupportEligible: z.boolean().describe(
    "Output only. Whether or not the device requires the extended support opt in.",
  ).optional(),
  extendedSupportEnabled: z.boolean().describe(
    "Output only. Whether extended support policy is enabled on the device.",
  ).optional(),
  extendedSupportStart: z.string().describe(
    "Output only. Date of the device when extended support policy for automatic updates starts.",
  ).optional(),
  fanInfo: z.array(z.object({
    speedRpm: z.number().int().describe("Output only. Fan speed in RPM.")
      .optional(),
  })).describe("Output only. Fan information for the device.").optional(),
  firmwareVersion: z.string().describe("The Chrome device's firmware version.")
    .optional(),
  firstEnrollmentTime: z.string().describe(
    "Date and time for the first time the device was enrolled.",
  ).optional(),
  kind: z.string().describe(
    "The type of resource. For the Chromeosdevices resource, the value is `admin#directory#chromeosdevice`.",
  ).optional(),
  lastDeprovisionTimestamp: z.string().describe(
    "(Read-only) Date and time for the last deprovision of the device.",
  ).optional(),
  lastEnrollmentTime: z.string().describe(
    "Date and time the device was last enrolled (Read-only)",
  ).optional(),
  lastKnownNetwork: z.array(z.object({
    ipAddress: z.string().describe("The IP address.").optional(),
    wanIpAddress: z.string().describe("The WAN IP address.").optional(),
  })).describe("Contains last known network (Read-only)").optional(),
  lastSync: z.string().describe(
    "Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only)",
  ).optional(),
  macAddress: z.string().describe(
    "The device's wireless MAC address. If the device does not have this information, it is not included in the response.",
  ).optional(),
  manufactureDate: z.string().describe(
    "(Read-only) The date the device was manufactured in yyyy-mm-dd format.",
  ).optional(),
  meid: z.string().describe(
    "The Mobile Equipment Identifier (MEID) or the International Mobile Equipment Identity (IMEI) for the 3G mobile card in a mobile device. A MEID/IMEI is typically used when adding a device to a wireless carrier's post-pay service plan. If the device does not have this information, this property is not included in the response. For more information on how to export a MEID/IMEI list, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices.html#export_meid).",
  ).optional(),
  model: z.string().describe(
    "The device's model information. If the device does not have this information, this property is not included in the response.",
  ).optional(),
  notes: z.string().describe(
    "Notes about this device added by the administrator. This property can be [searched](https://support.google.com/chrome/a/answer/1698333) with the [list](https://developers.google.com/workspace/admin/directory/v1/reference/chromeosdevices/list) method's `query` parameter. Maximum length is 500 characters. Empty values are allowed.",
  ).optional(),
  orderNumber: z.string().describe(
    "The device's order number. Only devices directly purchased from Google have an order number.",
  ).optional(),
  orgUnitId: z.string().describe(
    "The unique ID of the organizational unit. orgUnitPath is the human readable version of orgUnitId. While orgUnitPath may change by renaming an organizational unit within the path, orgUnitId is unchangeable for one organizational unit. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433).",
  ).optional(),
  orgUnitPath: z.string().describe(
    "The full parent path with the organizational unit's name associated with the device. Path names are case insensitive. If the parent organizational unit is the top-level organization, it is represented as a forward slash, `/`. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433).",
  ).optional(),
  osUpdateStatus: z.object({
    rebootTime: z.string().describe("Date and time of the last reboot.")
      .optional(),
    state: z.enum([
      "updateStateUnspecified",
      "updateStateNotStarted",
      "updateStateDownloadInProgress",
      "updateStateNeedReboot",
    ]).describe("The update state of an OS update.").optional(),
    targetKioskAppVersion: z.string().describe(
      "New required platform version from the pending updated kiosk app.",
    ).optional(),
    targetOsVersion: z.string().describe(
      'New platform version of the OS image being downloaded and applied. It is only set when update status is UPDATE_STATUS_DOWNLOAD_IN_PROGRESS or UPDATE_STATUS_NEED_REBOOT. Note this could be a dummy "0.0.0.0" for UPDATE_STATUS_NEED_REBOOT for some edge cases, e.g. update engine is restarted without a reboot.',
    ).optional(),
    updateCheckTime: z.string().describe(
      "Date and time of the last update check.",
    ).optional(),
    updateTime: z.string().describe(
      "Date and time of the last successful OS update.",
    ).optional(),
  }).describe("Contains information regarding the current OS update status.")
    .optional(),
  osVersion: z.string().describe(
    "The Chrome device's operating system version.",
  ).optional(),
  osVersionCompliance: z.enum([
    "complianceUnspecified",
    "compliant",
    "pending",
    "notCompliant",
  ]).describe("Output only. Device policy compliance status of the OS version.")
    .optional(),
  platformVersion: z.string().describe("The Chrome device's platform version.")
    .optional(),
  recentUsers: z.array(z.object({
    email: z.string().describe(
      "The user's email address. This is only present if the user type is `USER_TYPE_MANAGED`.",
    ).optional(),
    type: z.string().describe("The type of the user.").optional(),
  })).describe(
    "A list of recent device users, in descending order, by last login time.",
  ).optional(),
  screenshotFiles: z.array(z.object({
    createTime: z.string().describe("Date and time the file was created")
      .optional(),
    downloadUrl: z.string().describe("File download URL").optional(),
    name: z.string().describe("File name").optional(),
    type: z.string().describe("File type").optional(),
  })).describe(
    'A list of screenshot files to download. Type is always "SCREENSHOT_FILE". (Read-only)',
  ).optional(),
  serialNumber: z.string().describe(
    "The Chrome device serial number entered when the device was enabled. This value is the same as the Admin console's *Serial Number* in the *Chrome OS Devices* tab.",
  ).optional(),
  status: z.string().describe("The status of the device.").optional(),
  supportEndDate: z.string().describe(
    "Final date the device will be supported (Read-only)",
  ).optional(),
  systemRamFreeReports: z.array(z.object({
    reportTime: z.string().describe("Date and time the report was received.")
      .optional(),
    systemRamFreeInfo: z.array(z.string()).optional(),
  })).describe("Reports of amounts of available RAM memory (Read-only)")
    .optional(),
  systemRamTotal: z.string().describe(
    "Total RAM on the device [in bytes] (Read-only)",
  ).optional(),
  tpmVersionInfo: z.object({
    family: z.string().describe(
      'TPM family. We use the TPM 2.0 style encoding, e.g.: TPM 1.2: "1.2" -> 312e3200 TPM 2.0: "2.0" -> 322e3000',
    ).optional(),
    firmwareVersion: z.string().describe("TPM firmware version.").optional(),
    manufacturer: z.string().describe("TPM manufacturer code.").optional(),
    specLevel: z.string().describe(
      "TPM specification level. See Library Specification for TPM 2.0 and Main Specification for TPM 1.2.",
    ).optional(),
    tpmModel: z.string().describe("TPM model number.").optional(),
    vendorSpecific: z.string().describe(
      "Vendor-specific information such as Vendor ID.",
    ).optional(),
  }).describe("Trusted Platform Module (TPM) (Read-only)").optional(),
  willAutoRenew: z.boolean().describe(
    "Determines if the device will auto renew its support after the support end date. This is a read-only property.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Admin SDK Chromeosdevices. Registered at `@swamp/gcp/admin/chromeosdevices`. */
export const model = {
  type: "@swamp/gcp/admin/chromeosdevices",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Google Chrome devices run on the [Chrome OS](https://support.google.com/chrom...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a chromeosdevices",
      arguments: z.object({
        identifier: z.string().describe("The name of the chromeosdevices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        params["deviceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update chromeosdevices attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        } else if (existing["customerId"]) {
          params["customerId"] = String(existing["customerId"]);
        }
        params["deviceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["activeTimeRanges"] !== undefined) {
          body["activeTimeRanges"] = g["activeTimeRanges"];
        }
        if (g["annotatedAssetId"] !== undefined) {
          body["annotatedAssetId"] = g["annotatedAssetId"];
        }
        if (g["annotatedLocation"] !== undefined) {
          body["annotatedLocation"] = g["annotatedLocation"];
        }
        if (g["annotatedUser"] !== undefined) {
          body["annotatedUser"] = g["annotatedUser"];
        }
        if (g["autoUpdateThrough"] !== undefined) {
          body["autoUpdateThrough"] = g["autoUpdateThrough"];
        }
        if (g["backlightInfo"] !== undefined) {
          body["backlightInfo"] = g["backlightInfo"];
        }
        if (g["bluetoothAdapterInfo"] !== undefined) {
          body["bluetoothAdapterInfo"] = g["bluetoothAdapterInfo"];
        }
        if (g["bootMode"] !== undefined) body["bootMode"] = g["bootMode"];
        if (g["chromeOsType"] !== undefined) {
          body["chromeOsType"] = g["chromeOsType"];
        }
        if (g["cpuInfo"] !== undefined) body["cpuInfo"] = g["cpuInfo"];
        if (g["cpuStatusReports"] !== undefined) {
          body["cpuStatusReports"] = g["cpuStatusReports"];
        }
        if (g["deprovisionReason"] !== undefined) {
          body["deprovisionReason"] = g["deprovisionReason"];
        }
        if (g["deviceFiles"] !== undefined) {
          body["deviceFiles"] = g["deviceFiles"];
        }
        if (g["deviceLicenseType"] !== undefined) {
          body["deviceLicenseType"] = g["deviceLicenseType"];
        }
        if (g["diskSpaceUsage"] !== undefined) {
          body["diskSpaceUsage"] = g["diskSpaceUsage"];
        }
        if (g["diskVolumeReports"] !== undefined) {
          body["diskVolumeReports"] = g["diskVolumeReports"];
        }
        if (g["dockMacAddress"] !== undefined) {
          body["dockMacAddress"] = g["dockMacAddress"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["ethernetMacAddress"] !== undefined) {
          body["ethernetMacAddress"] = g["ethernetMacAddress"];
        }
        if (g["ethernetMacAddress0"] !== undefined) {
          body["ethernetMacAddress0"] = g["ethernetMacAddress0"];
        }
        if (g["extendedSupportEligible"] !== undefined) {
          body["extendedSupportEligible"] = g["extendedSupportEligible"];
        }
        if (g["extendedSupportEnabled"] !== undefined) {
          body["extendedSupportEnabled"] = g["extendedSupportEnabled"];
        }
        if (g["extendedSupportStart"] !== undefined) {
          body["extendedSupportStart"] = g["extendedSupportStart"];
        }
        if (g["fanInfo"] !== undefined) body["fanInfo"] = g["fanInfo"];
        if (g["firmwareVersion"] !== undefined) {
          body["firmwareVersion"] = g["firmwareVersion"];
        }
        if (g["firstEnrollmentTime"] !== undefined) {
          body["firstEnrollmentTime"] = g["firstEnrollmentTime"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["lastDeprovisionTimestamp"] !== undefined) {
          body["lastDeprovisionTimestamp"] = g["lastDeprovisionTimestamp"];
        }
        if (g["lastEnrollmentTime"] !== undefined) {
          body["lastEnrollmentTime"] = g["lastEnrollmentTime"];
        }
        if (g["lastKnownNetwork"] !== undefined) {
          body["lastKnownNetwork"] = g["lastKnownNetwork"];
        }
        if (g["lastSync"] !== undefined) body["lastSync"] = g["lastSync"];
        if (g["macAddress"] !== undefined) body["macAddress"] = g["macAddress"];
        if (g["manufactureDate"] !== undefined) {
          body["manufactureDate"] = g["manufactureDate"];
        }
        if (g["meid"] !== undefined) body["meid"] = g["meid"];
        if (g["model"] !== undefined) body["model"] = g["model"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["orderNumber"] !== undefined) {
          body["orderNumber"] = g["orderNumber"];
        }
        if (g["orgUnitId"] !== undefined) body["orgUnitId"] = g["orgUnitId"];
        if (g["orgUnitPath"] !== undefined) {
          body["orgUnitPath"] = g["orgUnitPath"];
        }
        if (g["osUpdateStatus"] !== undefined) {
          body["osUpdateStatus"] = g["osUpdateStatus"];
        }
        if (g["osVersion"] !== undefined) body["osVersion"] = g["osVersion"];
        if (g["osVersionCompliance"] !== undefined) {
          body["osVersionCompliance"] = g["osVersionCompliance"];
        }
        if (g["platformVersion"] !== undefined) {
          body["platformVersion"] = g["platformVersion"];
        }
        if (g["recentUsers"] !== undefined) {
          body["recentUsers"] = g["recentUsers"];
        }
        if (g["screenshotFiles"] !== undefined) {
          body["screenshotFiles"] = g["screenshotFiles"];
        }
        if (g["serialNumber"] !== undefined) {
          body["serialNumber"] = g["serialNumber"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["supportEndDate"] !== undefined) {
          body["supportEndDate"] = g["supportEndDate"];
        }
        if (g["systemRamFreeReports"] !== undefined) {
          body["systemRamFreeReports"] = g["systemRamFreeReports"];
        }
        if (g["systemRamTotal"] !== undefined) {
          body["systemRamTotal"] = g["systemRamTotal"];
        }
        if (g["tpmVersionInfo"] !== undefined) {
          body["tpmVersionInfo"] = g["tpmVersionInfo"];
        }
        if (g["willAutoRenew"] !== undefined) {
          body["willAutoRenew"] = g["willAutoRenew"];
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
          UPDATE_CONFIG,
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
    sync: {
      description: "Sync chromeosdevices state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["customerId"] !== undefined) {
            params["customerId"] = String(g["customerId"]);
          } else if (existing["customerId"]) {
            params["customerId"] = String(existing["customerId"]);
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
      description: "List chromeosdevices resources",
      arguments: z.object({
        includeChildOrgunits: z.boolean().describe(
          "Return devices from all child orgunits, as well as the specified org unit. If this is set to true, 'orgUnitPath' must be provided.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of results to return. Value should not exceed 300.",
        ).optional(),
        orderBy: z.string().describe(
          "Device property to use for sorting results.",
        ).optional(),
        orgUnitPath: z.string().describe(
          "The full path of the organizational unit (minus the leading `/`) or its unique ID.",
        ).optional(),
        projection: z.string().describe(
          "Determines whether the response contains the full list of properties or only a subset.",
        ).optional(),
        query: z.string().describe(
          "Search string in the format given at [List query operators](https://developers.google.com/workspace/admin/directory/v1/list-query-operators).",
        ).optional(),
        sortOrder: z.string().describe(
          "Whether to return results in ascending or descending order. Must be used with the `orderBy` parameter.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        if (args["includeChildOrgunits"] !== undefined) {
          params["includeChildOrgunits"] = String(args["includeChildOrgunits"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["orgUnitPath"] !== undefined) {
          params["orgUnitPath"] = String(args["orgUnitPath"]);
        }
        if (args["projection"] !== undefined) {
          params["projection"] = String(args["projection"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "chromeosdevices",
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
    action: {
      description: "action",
      arguments: z.object({
        action: z.any().optional(),
        deprovisionReason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["customerId"] = existing["customerId"]?.toString() ??
          g["customerId"]?.toString() ?? "";
        params["resourceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["deprovisionReason"] !== undefined) {
          body["deprovisionReason"] = args["deprovisionReason"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "directory.chromeosdevices.action",
            "path":
              "admin/directory/v1/customer/{customerId}/devices/chromeos/{resourceId}/action",
            "httpMethod": "POST",
            "parameterOrder": ["customerId", "resourceId"],
            "parameters": {
              "customerId": { "location": "path", "required": true },
              "resourceId": { "location": "path", "required": true },
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
    move_devices_to_ou: {
      description: "move devices to ou",
      arguments: z.object({
        deviceIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["orgUnitPath"] !== undefined) {
          params["orgUnitPath"] = String(g["orgUnitPath"]);
        }
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
        params["customerId"] = existing["customerId"]?.toString() ??
          g["customerId"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deviceIds"] !== undefined) {
          body["deviceIds"] = args["deviceIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "directory.chromeosdevices.moveDevicesToOu",
            "path":
              "admin/directory/v1/customer/{customerId}/devices/chromeos/moveDevicesToOu",
            "httpMethod": "POST",
            "parameterOrder": ["customerId", "orgUnitPath"],
            "parameters": {
              "customerId": { "location": "path", "required": true },
              "orgUnitPath": { "location": "query", "required": true },
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
