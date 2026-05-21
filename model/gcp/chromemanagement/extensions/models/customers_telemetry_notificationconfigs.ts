// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-telemetry-notificationconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.NotificationConfigs.
 *
 * Configuration to receive notifications of telemetry data.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromemanagement.googleapis.com/";

const INSERT_CONFIG = {
  "id": "chromemanagement.customers.telemetry.notificationConfigs.create",
  "path": "v1/{+parent}/telemetry/notificationConfigs",
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

const DELETE_CONFIG = {
  "id": "chromemanagement.customers.telemetry.notificationConfigs.delete",
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
  "id": "chromemanagement.customers.telemetry.notificationConfigs.list",
  "path": "v1/{+parent}/telemetry/notificationConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  filter: z.object({
    deviceId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from this device.",
    ).optional(),
    deviceOrgUnitId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices in this org unit.",
    ).optional(),
    telemetryEventNotificationFilter: z.object({
      eventTypes: z.array(
        z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "AUDIO_SEVERE_UNDERRUN",
          "NETWORK_STATE_CHANGE",
          "USB_ADDED",
          "USB_REMOVED",
          "NETWORK_HTTPS_LATENCY_CHANGE",
          "WIFI_SIGNAL_STRENGTH_LOW",
          "WIFI_SIGNAL_STRENGTH_RECOVERED",
          "VPN_CONNECTION_STATE_CHANGE",
          "APP_INSTALLED",
          "APP_UNINSTALLED",
          "APP_LAUNCHED",
          "OS_CRASH",
          "EXTERNAL_DISPLAY_CONNECTED",
          "EXTERNAL_DISPLAY_DISCONNECTED",
        ]),
      ).describe(
        "Only sends the notifications for events of these types. Must not be empty.",
      ).optional(),
    }).describe("Configures how the telemetry events should be filtered.")
      .optional(),
    userEmail: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices owned by this user.",
    ).optional(),
    userOrgUnitId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices owned by users in this org unit.",
    ).optional(),
  }).describe("Configures how the telemetry data should be filtered.")
    .optional(),
  googleCloudPubsubTopic: z.string().describe(
    "The pubsub topic to which notifications are published to.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  customer: z.string().optional(),
  filter: z.object({
    deviceId: z.string(),
    deviceOrgUnitId: z.string(),
    telemetryEventNotificationFilter: z.object({
      eventTypes: z.array(z.string()),
    }),
    userEmail: z.string(),
    userOrgUnitId: z.string(),
  }).optional(),
  googleCloudPubsubTopic: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  filter: z.object({
    deviceId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from this device.",
    ).optional(),
    deviceOrgUnitId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices in this org unit.",
    ).optional(),
    telemetryEventNotificationFilter: z.object({
      eventTypes: z.array(
        z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "AUDIO_SEVERE_UNDERRUN",
          "NETWORK_STATE_CHANGE",
          "USB_ADDED",
          "USB_REMOVED",
          "NETWORK_HTTPS_LATENCY_CHANGE",
          "WIFI_SIGNAL_STRENGTH_LOW",
          "WIFI_SIGNAL_STRENGTH_RECOVERED",
          "VPN_CONNECTION_STATE_CHANGE",
          "APP_INSTALLED",
          "APP_UNINSTALLED",
          "APP_LAUNCHED",
          "OS_CRASH",
          "EXTERNAL_DISPLAY_CONNECTED",
          "EXTERNAL_DISPLAY_DISCONNECTED",
        ]),
      ).describe(
        "Only sends the notifications for events of these types. Must not be empty.",
      ).optional(),
    }).describe("Configures how the telemetry events should be filtered.")
      .optional(),
    userEmail: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices owned by this user.",
    ).optional(),
    userOrgUnitId: z.string().describe(
      "If set, only sends notifications for telemetry data coming from devices owned by users in this org unit.",
    ).optional(),
  }).describe("Configures how the telemetry data should be filtered.")
    .optional(),
  googleCloudPubsubTopic: z.string().describe(
    "The pubsub topic to which notifications are published to.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Telemetry.NotificationConfigs. Registered at `@swamp/gcp/chromemanagement/customers-telemetry-notificationconfigs`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-telemetry-notificationconfigs",
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
      description: "Configuration to receive notifications of telemetry data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a notificationConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["googleCloudPubsubTopic"] !== undefined) {
          body["googleCloudPubsubTopic"] = g["googleCloudPubsubTopic"];
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
      description: "Get a notificationConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the notificationConfigs"),
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
    delete: {
      description: "Delete the notificationConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the notificationConfigs"),
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
      description: "Sync notificationConfigs state from GCP",
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
