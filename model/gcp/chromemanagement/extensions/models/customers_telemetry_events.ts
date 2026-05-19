// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-telemetry-events
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.Events.
 *
 * Telemetry data reported by a managed device.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromemanagement.googleapis.com/";

const LIST_CONFIG = {
  "id": "chromemanagement.customers.telemetry.events.list",
  "path": "v1/{+parent}/telemetry/events",
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
  appInstallEvent: z.object({
    appId: z.string(),
    appInstallReason: z.string(),
    appInstallSource: z.string(),
    appInstallTime: z.string(),
    appType: z.string(),
  }).optional(),
  appLaunchEvent: z.object({
    appId: z.string(),
    appLaunchSource: z.string(),
    appType: z.string(),
  }).optional(),
  appUninstallEvent: z.object({
    appId: z.string(),
    appType: z.string(),
    appUninstallSource: z.string(),
  }).optional(),
  audioSevereUnderrunEvent: z.object({}).optional(),
  device: z.object({
    deviceId: z.string(),
    orgUnitId: z.string(),
  }).optional(),
  eventType: z.string().optional(),
  externalDisplaysEvent: z.object({
    externalDisplayData: z.array(z.object({
      displayName: z.string(),
      edidVersion: z.string(),
      refreshRate: z.string(),
      resolutionHorizontal: z.number(),
      resolutionVertical: z.number(),
      serialNumber: z.number(),
    })),
  }).optional(),
  httpsLatencyChangeEvent: z.object({
    httpsLatencyRoutineData: z.object({
      latency: z.string(),
      problem: z.string(),
    }),
    httpsLatencyState: z.string(),
  }).optional(),
  name: z.string(),
  networkStateChangeEvent: z.object({
    connectionState: z.string(),
    guid: z.string(),
  }).optional(),
  osCrashEvent: z.object({
    crashId: z.string(),
    crashType: z.string(),
    sessionType: z.string(),
  }).optional(),
  reportTime: z.string().optional(),
  usbPeripheralsEvent: z.object({
    usbPeripheralReport: z.array(z.object({
      categories: z.array(z.string()),
      classId: z.number(),
      firmwareVersion: z.string(),
      name: z.string(),
      pid: z.number(),
      subclassId: z.number(),
      vendor: z.string(),
      vid: z.number(),
    })),
  }).optional(),
  user: z.object({
    email: z.string(),
    orgUnitId: z.string(),
  }).optional(),
  vpnConnectionStateChangeEvent: z.object({
    connectionState: z.string(),
    guid: z.string(),
  }).optional(),
  wifiSignalStrengthEvent: z.object({
    guid: z.string(),
    signalStrengthDbm: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.Events. Registered at `@swamp/gcp/chromemanagement/customers-telemetry-events`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-telemetry-events",
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
      description: "Telemetry data reported by a managed device.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync events state from GCP",
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
