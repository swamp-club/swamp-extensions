// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/sasportal/customers-deployments-devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud SAS Portal Customers.Deployments.Devices.
 *
 * Lists devices under a node or customer.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://sasportal.googleapis.com/";

const INSERT_CONFIG = {
  "id": "sasportal.customers.deployments.devices.create",
  "path": "v1alpha1/{+parent}/devices",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "sasportal.customers.deployments.devices.list",
  "path": "v1alpha1/{+parent}/devices",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  activeConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.enum([
        "RADIO_TECHNOLOGY_UNSPECIFIED",
        "E_UTRA",
        "CAMBIUM_NETWORKS",
        "FOUR_G_BBW_SAA_1",
        "NR",
        "DOODLE_CBRS",
        "CW",
        "REDLINE",
        "TARANA_WIRELESS",
        "FAROS",
      ]).describe(
        "Conditional. This field specifies the radio access technology that is used for the CBSD.",
      ).optional(),
      supportedSpec: z.string().describe(
        "Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration.",
      ).optional(),
    }).describe("Information about the device's air interface.").optional(),
    callSign: z.string().describe("The call sign of the device operator.")
      .optional(),
    category: z.enum([
      "DEVICE_CATEGORY_UNSPECIFIED",
      "DEVICE_CATEGORY_A",
      "DEVICE_CATEGORY_B",
    ]).describe("FCC category of the device.").optional(),
    installationParams: z.object({
      antennaAzimuth: z.number().int().describe(
        "Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaBeamwidth: z.number().int().describe(
        "3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaDowntilt: z.number().int().describe(
        "Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaGain: z.number().describe(
        "Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value",
      ).optional(),
      antennaModel: z.string().describe(
        "If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets.",
      ).optional(),
      cpeCbsdIndication: z.boolean().describe(
        "If present, this parameter specifies whether the CBSD is a CPE-CBSD or not.",
      ).optional(),
      eirpCapability: z.number().int().describe(
        "This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category.",
      ).optional(),
      height: z.number().describe(
        'Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum.',
      ).optional(),
      heightType: z.enum([
        "HEIGHT_TYPE_UNSPECIFIED",
        "HEIGHT_TYPE_AGL",
        "HEIGHT_TYPE_AMSL",
      ]).describe("Specifies how the height is measured.").optional(),
      horizontalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters.",
      ).optional(),
      indoorDeployment: z.boolean().describe(
        "Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor.",
      ).optional(),
      latitude: z.number().describe(
        "Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator.",
      ).optional(),
      longitude: z.number().describe(
        "Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian.",
      ).optional(),
      verticalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters.",
      ).optional(),
    }).describe("Information about the device installation parameters.")
      .optional(),
    isSigned: z.boolean().describe(
      "Output only. Whether the configuration has been signed by a CPI.",
    ).optional(),
    measurementCapabilities: z.array(
      z.enum([
        "MEASUREMENT_CAPABILITY_UNSPECIFIED",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT",
      ]),
    ).describe("Measurement reporting capabilities of the device.").optional(),
    model: z.object({
      firmwareVersion: z.string().describe(
        "The firmware version of the device.",
      ).optional(),
      hardwareVersion: z.string().describe(
        "The hardware version of the device.",
      ).optional(),
      name: z.string().describe("The name of the device model.").optional(),
      softwareVersion: z.string().describe(
        "The software version of the device.",
      ).optional(),
      vendor: z.string().describe("The name of the device vendor.").optional(),
    }).describe("Information about the model of the device.").optional(),
    state: z.enum(["DEVICE_CONFIG_STATE_UNSPECIFIED", "DRAFT", "FINAL"])
      .describe("State of the configuration.").optional(),
    updateTime: z.string().describe(
      "Output only. The last time the device configuration was edited.",
    ).optional(),
    userId: z.string().describe("The identifier of a device user.").optional(),
  }).describe("Information about the device configuration.").optional(),
  deviceMetadata: z.object({
    antennaModel: z.string().describe(
      "If populated, the Antenna Model Pattern to use. Format is: `RecordCreatorId:PatternId`",
    ).optional(),
    commonChannelGroup: z.string().describe(
      "Common Channel Group (CCG). A group of CBSDs in the same ICG requesting a common primary channel assignment. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).",
    ).optional(),
    interferenceCoordinationGroup: z.string().describe(
      "Interference Coordination Group (ICG). A group of CBSDs that manage their own interference with the group. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).",
    ).optional(),
    nrqzValidated: z.boolean().describe(
      "Output only. Set to `true` if a CPI has validated that they have coordinated with the National Quiet Zone office.",
    ).optional(),
    nrqzValidation: z.object({
      caseId: z.string().describe("Validation case ID.").optional(),
      cpiId: z.string().describe("CPI who signed the validation.").optional(),
      latitude: z.number().describe(
        "Device latitude that's associated with the validation.",
      ).optional(),
      longitude: z.number().describe(
        "Device longitude that's associated with the validation.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "FINAL"]).describe(
        "State of the NRQZ validation info.",
      ).optional(),
    }).describe("Information about National Radio Quiet Zone validation.")
      .optional(),
  }).describe(
    "Device data overridable by both SAS Portal and registration requests.",
  ).optional(),
  displayName: z.string().describe("Device display name.").optional(),
  fccId: z.string().describe(
    "The FCC identifier of the device. Refer to https://www.fcc.gov/oet/ea/fccid for FccID format. Accept underscores and periods because some test-SAS customers use them.",
  ).optional(),
  grantRangeAllowlists: z.array(z.object({
    highFrequencyMhz: z.number().describe(
      "The highest frequency of the frequency range in MHz.",
    ).optional(),
    lowFrequencyMhz: z.number().describe(
      "The lowest frequency of the frequency range in MHz.",
    ).optional(),
  })).describe(
    "Only ranges that are within the allowlists are available for new grants.",
  ).optional(),
  preloadedConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.enum([
        "RADIO_TECHNOLOGY_UNSPECIFIED",
        "E_UTRA",
        "CAMBIUM_NETWORKS",
        "FOUR_G_BBW_SAA_1",
        "NR",
        "DOODLE_CBRS",
        "CW",
        "REDLINE",
        "TARANA_WIRELESS",
        "FAROS",
      ]).describe(
        "Conditional. This field specifies the radio access technology that is used for the CBSD.",
      ).optional(),
      supportedSpec: z.string().describe(
        "Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration.",
      ).optional(),
    }).describe("Information about the device's air interface.").optional(),
    callSign: z.string().describe("The call sign of the device operator.")
      .optional(),
    category: z.enum([
      "DEVICE_CATEGORY_UNSPECIFIED",
      "DEVICE_CATEGORY_A",
      "DEVICE_CATEGORY_B",
    ]).describe("FCC category of the device.").optional(),
    installationParams: z.object({
      antennaAzimuth: z.number().int().describe(
        "Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaBeamwidth: z.number().int().describe(
        "3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaDowntilt: z.number().int().describe(
        "Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaGain: z.number().describe(
        "Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value",
      ).optional(),
      antennaModel: z.string().describe(
        "If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets.",
      ).optional(),
      cpeCbsdIndication: z.boolean().describe(
        "If present, this parameter specifies whether the CBSD is a CPE-CBSD or not.",
      ).optional(),
      eirpCapability: z.number().int().describe(
        "This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category.",
      ).optional(),
      height: z.number().describe(
        'Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum.',
      ).optional(),
      heightType: z.enum([
        "HEIGHT_TYPE_UNSPECIFIED",
        "HEIGHT_TYPE_AGL",
        "HEIGHT_TYPE_AMSL",
      ]).describe("Specifies how the height is measured.").optional(),
      horizontalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters.",
      ).optional(),
      indoorDeployment: z.boolean().describe(
        "Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor.",
      ).optional(),
      latitude: z.number().describe(
        "Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator.",
      ).optional(),
      longitude: z.number().describe(
        "Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian.",
      ).optional(),
      verticalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters.",
      ).optional(),
    }).describe("Information about the device installation parameters.")
      .optional(),
    isSigned: z.boolean().describe(
      "Output only. Whether the configuration has been signed by a CPI.",
    ).optional(),
    measurementCapabilities: z.array(
      z.enum([
        "MEASUREMENT_CAPABILITY_UNSPECIFIED",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT",
      ]),
    ).describe("Measurement reporting capabilities of the device.").optional(),
    model: z.object({
      firmwareVersion: z.string().describe(
        "The firmware version of the device.",
      ).optional(),
      hardwareVersion: z.string().describe(
        "The hardware version of the device.",
      ).optional(),
      name: z.string().describe("The name of the device model.").optional(),
      softwareVersion: z.string().describe(
        "The software version of the device.",
      ).optional(),
      vendor: z.string().describe("The name of the device vendor.").optional(),
    }).describe("Information about the model of the device.").optional(),
    state: z.enum(["DEVICE_CONFIG_STATE_UNSPECIFIED", "DRAFT", "FINAL"])
      .describe("State of the configuration.").optional(),
    updateTime: z.string().describe(
      "Output only. The last time the device configuration was edited.",
    ).optional(),
    userId: z.string().describe("The identifier of a device user.").optional(),
  }).describe("Information about the device configuration.").optional(),
  serialNumber: z.string().describe(
    "A serial number assigned to the device by the device manufacturer.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  activeConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.string(),
      supportedSpec: z.string(),
    }),
    callSign: z.string(),
    category: z.string(),
    installationParams: z.object({
      antennaAzimuth: z.number(),
      antennaBeamwidth: z.number(),
      antennaDowntilt: z.number(),
      antennaGain: z.number(),
      antennaModel: z.string(),
      cpeCbsdIndication: z.boolean(),
      eirpCapability: z.number(),
      height: z.number(),
      heightType: z.string(),
      horizontalAccuracy: z.number(),
      indoorDeployment: z.boolean(),
      latitude: z.number(),
      longitude: z.number(),
      verticalAccuracy: z.number(),
    }),
    isSigned: z.boolean(),
    measurementCapabilities: z.array(z.string()),
    model: z.object({
      firmwareVersion: z.string(),
      hardwareVersion: z.string(),
      name: z.string(),
      softwareVersion: z.string(),
      vendor: z.string(),
    }),
    state: z.string(),
    updateTime: z.string(),
    userId: z.string(),
  }).optional(),
  currentChannels: z.array(z.object({
    frequencyRange: z.object({
      highFrequencyMhz: z.number(),
      lowFrequencyMhz: z.number(),
    }),
    score: z.number(),
  })).optional(),
  deviceMetadata: z.object({
    antennaModel: z.string(),
    commonChannelGroup: z.string(),
    interferenceCoordinationGroup: z.string(),
    nrqzValidated: z.boolean(),
    nrqzValidation: z.object({
      caseId: z.string(),
      cpiId: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      state: z.string(),
    }),
  }).optional(),
  displayName: z.string().optional(),
  fccId: z.string().optional(),
  grantRangeAllowlists: z.array(z.object({
    highFrequencyMhz: z.number(),
    lowFrequencyMhz: z.number(),
  })).optional(),
  grants: z.array(z.object({
    channelType: z.string(),
    expireTime: z.string(),
    frequencyRange: z.object({
      highFrequencyMhz: z.number(),
      lowFrequencyMhz: z.number(),
    }),
    grantId: z.string(),
    lastHeartbeatTransmitExpireTime: z.string(),
    maxEirp: z.number(),
    moveList: z.array(z.object({
      dpaId: z.string(),
      frequencyRange: z.object({
        highFrequencyMhz: z.unknown(),
        lowFrequencyMhz: z.unknown(),
      }),
    })),
    state: z.string(),
    suspensionReason: z.array(z.string()),
  })).optional(),
  name: z.string(),
  preloadedConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.string(),
      supportedSpec: z.string(),
    }),
    callSign: z.string(),
    category: z.string(),
    installationParams: z.object({
      antennaAzimuth: z.number(),
      antennaBeamwidth: z.number(),
      antennaDowntilt: z.number(),
      antennaGain: z.number(),
      antennaModel: z.string(),
      cpeCbsdIndication: z.boolean(),
      eirpCapability: z.number(),
      height: z.number(),
      heightType: z.string(),
      horizontalAccuracy: z.number(),
      indoorDeployment: z.boolean(),
      latitude: z.number(),
      longitude: z.number(),
      verticalAccuracy: z.number(),
    }),
    isSigned: z.boolean(),
    measurementCapabilities: z.array(z.string()),
    model: z.object({
      firmwareVersion: z.string(),
      hardwareVersion: z.string(),
      name: z.string(),
      softwareVersion: z.string(),
      vendor: z.string(),
    }),
    state: z.string(),
    updateTime: z.string(),
    userId: z.string(),
  }).optional(),
  serialNumber: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  activeConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.enum([
        "RADIO_TECHNOLOGY_UNSPECIFIED",
        "E_UTRA",
        "CAMBIUM_NETWORKS",
        "FOUR_G_BBW_SAA_1",
        "NR",
        "DOODLE_CBRS",
        "CW",
        "REDLINE",
        "TARANA_WIRELESS",
        "FAROS",
      ]).describe(
        "Conditional. This field specifies the radio access technology that is used for the CBSD.",
      ).optional(),
      supportedSpec: z.string().describe(
        "Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration.",
      ).optional(),
    }).describe("Information about the device's air interface.").optional(),
    callSign: z.string().describe("The call sign of the device operator.")
      .optional(),
    category: z.enum([
      "DEVICE_CATEGORY_UNSPECIFIED",
      "DEVICE_CATEGORY_A",
      "DEVICE_CATEGORY_B",
    ]).describe("FCC category of the device.").optional(),
    installationParams: z.object({
      antennaAzimuth: z.number().int().describe(
        "Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaBeamwidth: z.number().int().describe(
        "3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaDowntilt: z.number().int().describe(
        "Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaGain: z.number().describe(
        "Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value",
      ).optional(),
      antennaModel: z.string().describe(
        "If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets.",
      ).optional(),
      cpeCbsdIndication: z.boolean().describe(
        "If present, this parameter specifies whether the CBSD is a CPE-CBSD or not.",
      ).optional(),
      eirpCapability: z.number().int().describe(
        "This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category.",
      ).optional(),
      height: z.number().describe(
        'Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum.',
      ).optional(),
      heightType: z.enum([
        "HEIGHT_TYPE_UNSPECIFIED",
        "HEIGHT_TYPE_AGL",
        "HEIGHT_TYPE_AMSL",
      ]).describe("Specifies how the height is measured.").optional(),
      horizontalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters.",
      ).optional(),
      indoorDeployment: z.boolean().describe(
        "Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor.",
      ).optional(),
      latitude: z.number().describe(
        "Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator.",
      ).optional(),
      longitude: z.number().describe(
        "Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian.",
      ).optional(),
      verticalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters.",
      ).optional(),
    }).describe("Information about the device installation parameters.")
      .optional(),
    isSigned: z.boolean().describe(
      "Output only. Whether the configuration has been signed by a CPI.",
    ).optional(),
    measurementCapabilities: z.array(
      z.enum([
        "MEASUREMENT_CAPABILITY_UNSPECIFIED",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT",
      ]),
    ).describe("Measurement reporting capabilities of the device.").optional(),
    model: z.object({
      firmwareVersion: z.string().describe(
        "The firmware version of the device.",
      ).optional(),
      hardwareVersion: z.string().describe(
        "The hardware version of the device.",
      ).optional(),
      name: z.string().describe("The name of the device model.").optional(),
      softwareVersion: z.string().describe(
        "The software version of the device.",
      ).optional(),
      vendor: z.string().describe("The name of the device vendor.").optional(),
    }).describe("Information about the model of the device.").optional(),
    state: z.enum(["DEVICE_CONFIG_STATE_UNSPECIFIED", "DRAFT", "FINAL"])
      .describe("State of the configuration.").optional(),
    updateTime: z.string().describe(
      "Output only. The last time the device configuration was edited.",
    ).optional(),
    userId: z.string().describe("The identifier of a device user.").optional(),
  }).describe("Information about the device configuration.").optional(),
  deviceMetadata: z.object({
    antennaModel: z.string().describe(
      "If populated, the Antenna Model Pattern to use. Format is: `RecordCreatorId:PatternId`",
    ).optional(),
    commonChannelGroup: z.string().describe(
      "Common Channel Group (CCG). A group of CBSDs in the same ICG requesting a common primary channel assignment. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).",
    ).optional(),
    interferenceCoordinationGroup: z.string().describe(
      "Interference Coordination Group (ICG). A group of CBSDs that manage their own interference with the group. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).",
    ).optional(),
    nrqzValidated: z.boolean().describe(
      "Output only. Set to `true` if a CPI has validated that they have coordinated with the National Quiet Zone office.",
    ).optional(),
    nrqzValidation: z.object({
      caseId: z.string().describe("Validation case ID.").optional(),
      cpiId: z.string().describe("CPI who signed the validation.").optional(),
      latitude: z.number().describe(
        "Device latitude that's associated with the validation.",
      ).optional(),
      longitude: z.number().describe(
        "Device longitude that's associated with the validation.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "FINAL"]).describe(
        "State of the NRQZ validation info.",
      ).optional(),
    }).describe("Information about National Radio Quiet Zone validation.")
      .optional(),
  }).describe(
    "Device data overridable by both SAS Portal and registration requests.",
  ).optional(),
  displayName: z.string().describe("Device display name.").optional(),
  fccId: z.string().describe(
    "The FCC identifier of the device. Refer to https://www.fcc.gov/oet/ea/fccid for FccID format. Accept underscores and periods because some test-SAS customers use them.",
  ).optional(),
  grantRangeAllowlists: z.array(z.object({
    highFrequencyMhz: z.number().describe(
      "The highest frequency of the frequency range in MHz.",
    ).optional(),
    lowFrequencyMhz: z.number().describe(
      "The lowest frequency of the frequency range in MHz.",
    ).optional(),
  })).describe(
    "Only ranges that are within the allowlists are available for new grants.",
  ).optional(),
  preloadedConfig: z.object({
    airInterface: z.object({
      radioTechnology: z.enum([
        "RADIO_TECHNOLOGY_UNSPECIFIED",
        "E_UTRA",
        "CAMBIUM_NETWORKS",
        "FOUR_G_BBW_SAA_1",
        "NR",
        "DOODLE_CBRS",
        "CW",
        "REDLINE",
        "TARANA_WIRELESS",
        "FAROS",
      ]).describe(
        "Conditional. This field specifies the radio access technology that is used for the CBSD.",
      ).optional(),
      supportedSpec: z.string().describe(
        "Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration.",
      ).optional(),
    }).describe("Information about the device's air interface.").optional(),
    callSign: z.string().describe("The call sign of the device operator.")
      .optional(),
    category: z.enum([
      "DEVICE_CATEGORY_UNSPECIFIED",
      "DEVICE_CATEGORY_A",
      "DEVICE_CATEGORY_B",
    ]).describe("FCC category of the device.").optional(),
    installationParams: z.object({
      antennaAzimuth: z.number().int().describe(
        "Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaBeamwidth: z.number().int().describe(
        "3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaDowntilt: z.number().int().describe(
        "Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices.",
      ).optional(),
      antennaGain: z.number().describe(
        "Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value",
      ).optional(),
      antennaModel: z.string().describe(
        "If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets.",
      ).optional(),
      cpeCbsdIndication: z.boolean().describe(
        "If present, this parameter specifies whether the CBSD is a CPE-CBSD or not.",
      ).optional(),
      eirpCapability: z.number().int().describe(
        "This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category.",
      ).optional(),
      height: z.number().describe(
        'Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum.',
      ).optional(),
      heightType: z.enum([
        "HEIGHT_TYPE_UNSPECIFIED",
        "HEIGHT_TYPE_AGL",
        "HEIGHT_TYPE_AMSL",
      ]).describe("Specifies how the height is measured.").optional(),
      horizontalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters.",
      ).optional(),
      indoorDeployment: z.boolean().describe(
        "Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor.",
      ).optional(),
      latitude: z.number().describe(
        "Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator.",
      ).optional(),
      longitude: z.number().describe(
        "Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian.",
      ).optional(),
      verticalAccuracy: z.number().describe(
        "A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters.",
      ).optional(),
    }).describe("Information about the device installation parameters.")
      .optional(),
    isSigned: z.boolean().describe(
      "Output only. Whether the configuration has been signed by a CPI.",
    ).optional(),
    measurementCapabilities: z.array(
      z.enum([
        "MEASUREMENT_CAPABILITY_UNSPECIFIED",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT",
        "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT",
      ]),
    ).describe("Measurement reporting capabilities of the device.").optional(),
    model: z.object({
      firmwareVersion: z.string().describe(
        "The firmware version of the device.",
      ).optional(),
      hardwareVersion: z.string().describe(
        "The hardware version of the device.",
      ).optional(),
      name: z.string().describe("The name of the device model.").optional(),
      softwareVersion: z.string().describe(
        "The software version of the device.",
      ).optional(),
      vendor: z.string().describe("The name of the device vendor.").optional(),
    }).describe("Information about the model of the device.").optional(),
    state: z.enum(["DEVICE_CONFIG_STATE_UNSPECIFIED", "DRAFT", "FINAL"])
      .describe("State of the configuration.").optional(),
    updateTime: z.string().describe(
      "Output only. The last time the device configuration was edited.",
    ).optional(),
    userId: z.string().describe("The identifier of a device user.").optional(),
  }).describe("Information about the device configuration.").optional(),
  serialNumber: z.string().describe(
    "A serial number assigned to the device by the device manufacturer.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud SAS Portal Customers.Deployments.Devices. Registered at `@swamp/gcp/sasportal/customers-deployments-devices`. */
export const model = {
  type: "@swamp/gcp/sasportal/customers-deployments-devices",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lists devices under a node or customer.",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["activeConfig"] !== undefined) {
          body["activeConfig"] = g["activeConfig"];
        }
        if (g["deviceMetadata"] !== undefined) {
          body["deviceMetadata"] = g["deviceMetadata"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["fccId"] !== undefined) body["fccId"] = g["fccId"];
        if (g["grantRangeAllowlists"] !== undefined) {
          body["grantRangeAllowlists"] = g["grantRangeAllowlists"];
        }
        if (g["preloadedConfig"] !== undefined) {
          body["preloadedConfig"] = g["preloadedConfig"];
        }
        if (g["serialNumber"] !== undefined) {
          body["serialNumber"] = g["serialNumber"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync devices state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List devices resources",
      arguments: z.object({
        filter: z.string().describe(
          'The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive.',
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000].",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "devices",
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
    create_signed: {
      description: "create signed",
      arguments: z.object({
        encodedDevice: z.any().optional(),
        installerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["encodedDevice"] !== undefined) {
          body["encodedDevice"] = args["encodedDevice"];
        }
        if (args["installerId"] !== undefined) {
          body["installerId"] = args["installerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "sasportal.customers.deployments.devices.createSigned",
            "path": "v1alpha1/{+parent}/devices:createSigned",
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
