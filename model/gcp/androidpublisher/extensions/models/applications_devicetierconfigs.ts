// Auto-generated extension model for @swamp/gcp/androidpublisher/applications-devicetierconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Applications.DeviceTierConfigs.
 *
 * Configuration describing device targeting criteria for the content of an app.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.applications.deviceTierConfigs.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/deviceTierConfigs/{deviceTierConfigId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "deviceTierConfigId",
  ],
  "parameters": {
    "deviceTierConfigId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.applications.deviceTierConfigs.create",
  "path": "androidpublisher/v3/applications/{packageName}/deviceTierConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "allowUnknownDevices": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.applications.deviceTierConfigs.list",
  "path": "androidpublisher/v3/applications/{packageName}/deviceTierConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
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
  deviceGroups: z.array(z.object({
    deviceSelectors: z.array(z.object({
      deviceRam: z.object({
        maxBytes: z.unknown().describe("Maximum RAM in bytes (bound excluded).")
          .optional(),
        minBytes: z.unknown().describe("Minimum RAM in bytes (bound included).")
          .optional(),
      }).describe("Conditions about a device's RAM capabilities.").optional(),
      excludedDeviceIds: z.array(z.unknown()).describe(
        "Device models excluded by this selector, even if they match all other conditions.",
      ).optional(),
      forbiddenSystemFeatures: z.array(z.unknown()).describe(
        "A device that has any of these system features is excluded by this selector, even if it matches all other conditions.",
      ).optional(),
      includedDeviceIds: z.array(z.unknown()).describe(
        "Device models included by this selector.",
      ).optional(),
      requiredSystemFeatures: z.array(z.unknown()).describe(
        "A device needs to have all these system features to be included by the selector.",
      ).optional(),
      systemOnChips: z.array(z.unknown()).describe(
        "Optional. The SoCs included by this selector. Only works for Android S+ devices.",
      ).optional(),
    })).describe(
      "Device selectors for this group. A device matching any of the selectors is included in this group.",
    ).optional(),
    name: z.string().describe("The name of the group.").optional(),
  })).describe("Definition of device groups for the app.").optional(),
  deviceTierSet: z.object({
    deviceTiers: z.array(z.object({
      deviceGroupNames: z.array(z.string()).describe(
        "Groups of devices included in this tier. These groups must be defined explicitly under device_groups in this configuration.",
      ).optional(),
      level: z.number().int().describe(
        "The priority level of the tier. Tiers are evaluated in descending order of level: the highest level tier has the highest priority. The highest tier matching a given device is selected for that device. You should use a contiguous range of levels for your tiers in a tier set; tier levels in a tier set must be unique. For instance, if your tier set has 4 tiers (including the global fallback), you should define tiers 1, 2 and 3 in this configuration. Note: tier 0 is implicitly defined as a global fallback and selected for devices that don't match any of the tiers explicitly defined here. You mustn't define level 0 explicitly in this configuration.",
      ).optional(),
    })).describe("Device tiers belonging to the set.").optional(),
  }).describe(
    "A set of device tiers. A tier set determines what variation of app content gets served to a specific device, for device-targeted content. You should assign a priority level to each tier, which determines the ordering by which they are evaluated by Play. See the documentation of DeviceTier.level for more details.",
  ).optional(),
  userCountrySets: z.array(z.object({
    countryCodes: z.array(z.string()).describe(
      'List of country codes representing countries. A Country code is represented in ISO 3166 alpha-2 format. For Example:- "IT" for Italy, "GE" for Georgia.',
    ).optional(),
    name: z.string().describe("Country set name.").optional(),
  })).describe("Definition of user country sets for the app.").optional(),
  packageName: z.string().describe("Package name of the app."),
  allowUnknownDevices: z.string().describe(
    "Whether the service should accept device IDs that are unknown to Play's device catalog.",
  ).optional(),
});

const StateSchema = z.object({
  deviceGroups: z.array(z.object({
    deviceSelectors: z.array(z.object({
      deviceRam: z.object({
        maxBytes: z.unknown(),
        minBytes: z.unknown(),
      }),
      excludedDeviceIds: z.array(z.unknown()),
      forbiddenSystemFeatures: z.array(z.unknown()),
      includedDeviceIds: z.array(z.unknown()),
      requiredSystemFeatures: z.array(z.unknown()),
      systemOnChips: z.array(z.unknown()),
    })),
    name: z.string(),
  })).optional(),
  deviceTierConfigId: z.string().optional(),
  deviceTierSet: z.object({
    deviceTiers: z.array(z.object({
      deviceGroupNames: z.array(z.string()),
      level: z.number(),
    })),
  }).optional(),
  userCountrySets: z.array(z.object({
    countryCodes: z.array(z.string()),
    name: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  deviceGroups: z.array(z.object({
    deviceSelectors: z.array(z.object({
      deviceRam: z.object({
        maxBytes: z.unknown().describe("Maximum RAM in bytes (bound excluded).")
          .optional(),
        minBytes: z.unknown().describe("Minimum RAM in bytes (bound included).")
          .optional(),
      }).describe("Conditions about a device's RAM capabilities.").optional(),
      excludedDeviceIds: z.array(z.unknown()).describe(
        "Device models excluded by this selector, even if they match all other conditions.",
      ).optional(),
      forbiddenSystemFeatures: z.array(z.unknown()).describe(
        "A device that has any of these system features is excluded by this selector, even if it matches all other conditions.",
      ).optional(),
      includedDeviceIds: z.array(z.unknown()).describe(
        "Device models included by this selector.",
      ).optional(),
      requiredSystemFeatures: z.array(z.unknown()).describe(
        "A device needs to have all these system features to be included by the selector.",
      ).optional(),
      systemOnChips: z.array(z.unknown()).describe(
        "Optional. The SoCs included by this selector. Only works for Android S+ devices.",
      ).optional(),
    })).describe(
      "Device selectors for this group. A device matching any of the selectors is included in this group.",
    ).optional(),
    name: z.string().describe("The name of the group.").optional(),
  })).describe("Definition of device groups for the app.").optional(),
  deviceTierSet: z.object({
    deviceTiers: z.array(z.object({
      deviceGroupNames: z.array(z.string()).describe(
        "Groups of devices included in this tier. These groups must be defined explicitly under device_groups in this configuration.",
      ).optional(),
      level: z.number().int().describe(
        "The priority level of the tier. Tiers are evaluated in descending order of level: the highest level tier has the highest priority. The highest tier matching a given device is selected for that device. You should use a contiguous range of levels for your tiers in a tier set; tier levels in a tier set must be unique. For instance, if your tier set has 4 tiers (including the global fallback), you should define tiers 1, 2 and 3 in this configuration. Note: tier 0 is implicitly defined as a global fallback and selected for devices that don't match any of the tiers explicitly defined here. You mustn't define level 0 explicitly in this configuration.",
      ).optional(),
    })).describe("Device tiers belonging to the set.").optional(),
  }).describe(
    "A set of device tiers. A tier set determines what variation of app content gets served to a specific device, for device-targeted content. You should assign a priority level to each tier, which determines the ordering by which they are evaluated by Play. See the documentation of DeviceTier.level for more details.",
  ).optional(),
  userCountrySets: z.array(z.object({
    countryCodes: z.array(z.string()).describe(
      'List of country codes representing countries. A Country code is represented in ISO 3166 alpha-2 format. For Example:- "IT" for Italy, "GE" for Georgia.',
    ).optional(),
    name: z.string().describe("Country set name.").optional(),
  })).describe("Definition of user country sets for the app.").optional(),
  packageName: z.string().describe("Package name of the app.").optional(),
  allowUnknownDevices: z.string().describe(
    "Whether the service should accept device IDs that are unknown to Play's device catalog.",
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

/** Swamp extension model for Google Cloud Google Play Android Developer Applications.DeviceTierConfigs. Registered at `@swamp/gcp/androidpublisher/applications-devicetierconfigs`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/applications-devicetierconfigs",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configuration describing device targeting criteria for the content of an app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deviceTierConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["deviceGroups"] !== undefined) {
          body["deviceGroups"] = g["deviceGroups"];
        }
        if (g["deviceTierSet"] !== undefined) {
          body["deviceTierSet"] = g["deviceTierSet"];
        }
        if (g["userCountrySets"] !== undefined) {
          body["userCountrySets"] = g["userCountrySets"];
        }
        if (g["allowUnknownDevices"] !== undefined) {
          body["allowUnknownDevices"] = g["allowUnknownDevices"];
        }
        if (g["name"] !== undefined) {
          params["deviceTierConfigId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "packageName": String(g["packageName"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a deviceTierConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the deviceTierConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["deviceTierConfigId"] = args.identifier;
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
    sync: {
      description: "Sync deviceTierConfigs state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["deviceTierConfigId"] = identifier;
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
      description: "List deviceTierConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of device tier configs to return. The service may return fewer than this value. If unspecified, at most 10 device tier configs will be returned. The maximum value for this field is 100; values above 100 will be coerced to 100. Device tier configs will be ordered by descending creation time.",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "deviceTierConfigs",
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
  },
};
