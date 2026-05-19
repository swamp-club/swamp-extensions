// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-telemetry-devices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.Devices.
 *
 * Telemetry data collected from a managed device. * Granular permission needed: TELEMETRY_API_DEVICE
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.telemetry.devices.get",
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  appReport: z.array(z.object({
    reportTime: z.string(),
    usageData: z.array(z.object({
      appId: z.string(),
      appInstanceId: z.string(),
      appType: z.string(),
      runningDuration: z.string(),
    })),
  })).optional(),
  audioStatusReport: z.array(z.object({
    inputDevice: z.string(),
    inputGain: z.number(),
    inputMute: z.boolean(),
    outputDevice: z.string(),
    outputMute: z.boolean(),
    outputVolume: z.number(),
    reportTime: z.string(),
  })).optional(),
  batteryInfo: z.array(z.object({
    designCapacity: z.string(),
    designMinVoltage: z.number(),
    manufactureDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    manufacturer: z.string(),
    serialNumber: z.string(),
    technology: z.string(),
  })).optional(),
  batteryStatusReport: z.array(z.object({
    batteryHealth: z.string(),
    cycleCount: z.number(),
    fullChargeCapacity: z.string(),
    reportTime: z.string(),
    sample: z.array(z.object({
      chargeRate: z.number(),
      current: z.string(),
      dischargeRate: z.number(),
      remainingCapacity: z.string(),
      reportTime: z.string(),
      status: z.string(),
      temperature: z.number(),
      voltage: z.string(),
    })),
    serialNumber: z.string(),
  })).optional(),
  bootPerformanceReport: z.array(z.object({
    bootUpDuration: z.string(),
    bootUpTime: z.string(),
    reportTime: z.string(),
    shutdownDuration: z.string(),
    shutdownReason: z.string(),
    shutdownTime: z.string(),
  })).optional(),
  cpuInfo: z.array(z.object({
    architecture: z.string(),
    keylockerConfigured: z.boolean(),
    keylockerSupported: z.boolean(),
    maxClockSpeed: z.number(),
    model: z.string(),
  })).optional(),
  cpuStatusReport: z.array(z.object({
    cpuTemperatureInfo: z.array(z.object({
      label: z.string(),
      temperatureCelsius: z.number(),
    })),
    cpuUtilizationPct: z.number(),
    reportTime: z.string(),
    sampleFrequency: z.string(),
  })).optional(),
  customer: z.string().optional(),
  deviceId: z.string().optional(),
  graphicsInfo: z.object({
    adapterInfo: z.object({
      adapter: z.string(),
      deviceId: z.string(),
      driverVersion: z.string(),
    }),
    displayDevices: z.array(z.object({
      displayHeightMm: z.number(),
      displayName: z.string(),
      displayWidthMm: z.number(),
      edidVersion: z.string(),
      internal: z.boolean(),
      manufactureYear: z.number(),
      manufacturerId: z.string(),
      modelId: z.number(),
      serialNumber: z.number(),
    })),
    eprivacySupported: z.boolean(),
    touchScreenInfo: z.object({
      devices: z.array(z.object({
        displayName: z.string(),
        stylusCapable: z.boolean(),
        touchPointCount: z.number(),
      })),
      touchpadLibrary: z.string(),
    }),
  }).optional(),
  graphicsStatusReport: z.array(z.object({
    displays: z.array(z.object({
      deviceId: z.string(),
      displayName: z.string(),
      edidVersion: z.string(),
      isInternal: z.boolean(),
      refreshRate: z.number(),
      resolutionHeight: z.number(),
      resolutionWidth: z.number(),
      serialNumber: z.number(),
    })),
    reportTime: z.string(),
  })).optional(),
  heartbeatStatusReport: z.array(z.object({
    reportTime: z.string(),
    state: z.string(),
  })).optional(),
  kioskAppStatusReport: z.array(z.object({
    appId: z.string(),
    appVersion: z.string(),
    reportTime: z.string(),
  })).optional(),
  memoryInfo: z.object({
    availableRamBytes: z.string(),
    totalMemoryEncryption: z.object({
      encryptionAlgorithm: z.string(),
      encryptionState: z.string(),
      keyLength: z.string(),
      maxKeys: z.string(),
    }),
    totalRamBytes: z.string(),
  }).optional(),
  memoryStatusReport: z.array(z.object({
    pageFaults: z.number(),
    reportTime: z.string(),
    sampleFrequency: z.string(),
    systemRamFreeBytes: z.string(),
  })).optional(),
  name: z.string(),
  networkBandwidthReport: z.array(z.object({
    downloadSpeedKbps: z.string(),
    reportTime: z.string(),
  })).optional(),
  networkDiagnosticsReport: z.array(z.object({
    httpsLatencyData: z.object({
      latency: z.string(),
      problem: z.string(),
    }),
    reportTime: z.string(),
  })).optional(),
  networkInfo: z.object({
    networkDevices: z.array(z.object({
      iccid: z.string(),
      imei: z.string(),
      macAddress: z.string(),
      mdn: z.string(),
      meid: z.string(),
      type: z.string(),
    })),
  }).optional(),
  networkStatusReport: z.array(z.object({
    connectionState: z.string(),
    connectionType: z.string(),
    encryptionOn: z.boolean(),
    gatewayIpAddress: z.string(),
    gatewayIpv6Address: z.string(),
    guid: z.string(),
    ipv6Address: z.array(z.string()),
    lanIpAddress: z.string(),
    linkDownSpeedKbps: z.string(),
    metered: z.boolean(),
    receivingBitRateMbps: z.string(),
    reportTime: z.string(),
    sampleFrequency: z.string(),
    signalStrengthDbm: z.number(),
    transmissionBitRateMbps: z.string(),
    transmissionPowerDbm: z.number(),
    wifiLinkQuality: z.string(),
    wifiPowerManagementEnabled: z.boolean(),
  })).optional(),
  orgUnitId: z.string().optional(),
  osUpdateStatus: z.array(z.object({
    lastRebootTime: z.string(),
    lastUpdateCheckTime: z.string(),
    lastUpdateTime: z.string(),
    newPlatformVersion: z.string(),
    newRequestedPlatformVersion: z.string(),
    updateState: z.string(),
  })).optional(),
  peripheralsReport: z.array(z.object({
    reportTime: z.string(),
    usbPeripheralReport: z.array(z.object({
      categories: z.array(z.unknown()),
      classId: z.number(),
      firmwareVersion: z.string(),
      name: z.string(),
      pid: z.number(),
      subclassId: z.number(),
      vendor: z.string(),
      vid: z.number(),
    })),
  })).optional(),
  runtimeCountersReport: z.array(z.object({
    enterHibernationCount: z.string(),
    enterPoweroffCount: z.string(),
    enterSleepCount: z.string(),
    reportTime: z.string(),
    uptimeRuntimeDuration: z.string(),
  })).optional(),
  serialNumber: z.string().optional(),
  storageInfo: z.object({
    availableDiskBytes: z.string(),
    totalDiskBytes: z.string(),
    volume: z.array(z.object({
      storageFreeBytes: z.string(),
      storageTotalBytes: z.string(),
      volumeId: z.string(),
    })),
  }).optional(),
  storageStatusReport: z.array(z.object({
    disk: z.array(z.object({
      bytesReadThisSession: z.string(),
      bytesWrittenThisSession: z.string(),
      discardTimeThisSession: z.string(),
      health: z.string(),
      ioTimeThisSession: z.string(),
      manufacturer: z.string(),
      model: z.string(),
      readTimeThisSession: z.string(),
      serialNumber: z.string(),
      sizeBytes: z.string(),
      type: z.string(),
      volumeIds: z.array(z.unknown()),
      writeTimeThisSession: z.string(),
    })),
    reportTime: z.string(),
  })).optional(),
  thunderboltInfo: z.array(z.object({
    securityLevel: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.Devices. Registered at `@swamp/gcp/chromemanagement/customers-telemetry-devices`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-telemetry-devices",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Telemetry data collected from a managed device. * Granular permission needed:...",
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
  },
};
