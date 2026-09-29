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

// Auto-generated extension model for @swamp/gcp/androidenterprise/managedconfigurationsfordevice
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Managedconfigurationsfordevice.
 *
 * *Deprecated:* New integrations cannot use this method and can refer to our new recommendations
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.managedconfigurationsfordevice.get",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "deviceId",
    "managedConfigurationForDeviceId",
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
    "managedConfigurationForDeviceId": {
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
  "id": "androidenterprise.managedconfigurationsfordevice.update",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "deviceId",
    "managedConfigurationForDeviceId",
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
    "managedConfigurationForDeviceId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.managedconfigurationsfordevice.delete",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "deviceId",
    "managedConfigurationForDeviceId",
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
    "managedConfigurationForDeviceId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidenterprise.managedconfigurationsfordevice.list",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice",
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/androidenterprise",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  configurationVariables: z.object({
    mcmId: z.string().describe("The ID of the managed configurations settings.")
      .optional(),
    variableSet: z.array(z.object({
      placeholder: z.string().describe(
        "The placeholder string; defined by EMM.",
      ).optional(),
      userValue: z.string().describe(
        "The value of the placeholder, specific to the user.",
      ).optional(),
    })).describe("The variable set that is attributed to the user.").optional(),
  }).describe(
    "Contains the ID of the managed configuration profile and the set of configuration variables (if any) defined for the user.",
  ).optional(),
  kind: z.string().describe("Deprecated.").optional(),
  managedProperty: z.array(z.object({
    key: z.string().describe("The unique key that identifies the property.")
      .optional(),
    valueBool: z.boolean().describe(
      "The boolean value - this will only be present if type of the property is bool.",
    ).optional(),
    valueBundle: z.object({
      managedProperty: z.array(z.record(z.string(), z.unknown())).describe(
        "The list of managed properties.",
      ).optional(),
    }).describe(
      "The bundle of managed properties - this will only be present if type of the property is bundle.",
    ).optional(),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()).describe(
        "The list of managed properties.",
      ).optional(),
    })).describe(
      "The list of bundles of properties - this will only be present if type of the property is bundle_array.",
    ).optional(),
    valueInteger: z.number().int().describe(
      "The integer value - this will only be present if type of the property is integer.",
    ).optional(),
    valueString: z.string().describe(
      "The string value - this will only be present if type of the property is string, choice or hidden.",
    ).optional(),
    valueStringArray: z.array(z.string()).describe(
      "The list of string values - this will only be present if type of the property is multiselect.",
    ).optional(),
  })).describe("The set of managed properties for this configuration.")
    .optional(),
  productId: z.string().describe(
    'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise."),
  userId: z.string().describe("The ID of the user."),
  deviceId: z.string().describe("The Android ID of the device."),
});

const StateSchema = z.object({
  configurationVariables: z.object({
    mcmId: z.string(),
    variableSet: z.array(z.object({
      placeholder: z.string(),
      userValue: z.string(),
    })),
  }).optional(),
  kind: z.string().optional(),
  managedProperty: z.array(z.object({
    key: z.string(),
    valueBool: z.boolean(),
    valueBundle: z.object({
      managedProperty: z.array(z.record(z.string(), z.unknown())),
    }),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()),
    })),
    valueInteger: z.number(),
    valueString: z.string(),
    valueStringArray: z.array(z.string()),
  })).optional(),
  productId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  configurationVariables: z.object({
    mcmId: z.string().describe("The ID of the managed configurations settings.")
      .optional(),
    variableSet: z.array(z.object({
      placeholder: z.string().describe(
        "The placeholder string; defined by EMM.",
      ).optional(),
      userValue: z.string().describe(
        "The value of the placeholder, specific to the user.",
      ).optional(),
    })).describe("The variable set that is attributed to the user.").optional(),
  }).describe(
    "Contains the ID of the managed configuration profile and the set of configuration variables (if any) defined for the user.",
  ).optional(),
  kind: z.string().describe("Deprecated.").optional(),
  managedProperty: z.array(z.object({
    key: z.string().describe("The unique key that identifies the property.")
      .optional(),
    valueBool: z.boolean().describe(
      "The boolean value - this will only be present if type of the property is bool.",
    ).optional(),
    valueBundle: z.object({
      managedProperty: z.array(z.record(z.string(), z.unknown())).describe(
        "The list of managed properties.",
      ).optional(),
    }).describe(
      "The bundle of managed properties - this will only be present if type of the property is bundle.",
    ).optional(),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()).describe(
        "The list of managed properties.",
      ).optional(),
    })).describe(
      "The list of bundles of properties - this will only be present if type of the property is bundle_array.",
    ).optional(),
    valueInteger: z.number().int().describe(
      "The integer value - this will only be present if type of the property is integer.",
    ).optional(),
    valueString: z.string().describe(
      "The string value - this will only be present if type of the property is string, choice or hidden.",
    ).optional(),
    valueStringArray: z.array(z.string()).describe(
      "The list of string values - this will only be present if type of the property is multiselect.",
    ).optional(),
  })).describe("The set of managed properties for this configuration.")
    .optional(),
  productId: z.string().describe(
    'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise.").optional(),
  userId: z.string().describe("The ID of the user.").optional(),
  deviceId: z.string().describe("The Android ID of the device.").optional(),
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

/** Swamp extension model for Google Cloud Google Play EMM Managedconfigurationsfordevice. Registered at `@swamp/gcp/androidenterprise/managedconfigurationsfordevice`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/managedconfigurationsfordevice",
  version: "2026.09.29.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.2",
      description: "Added: enterpriseId, userId, deviceId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "*Deprecated:* New integrations cannot use this method and can refer to our ne...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a managedconfigurationsfordevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the managedconfigurationsfordevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["deviceId"] !== undefined) {
          params["deviceId"] = String(g["deviceId"]);
        }
        params["managedConfigurationForDeviceId"] = args.identifier;
        const result = await readResource(
          baseUrl,
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
      description: "Update managedconfigurationsfordevice attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific managedconfigurationsfordevice by name (e.g. one discovered by list)",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        } else if (existing["enterpriseId"]) {
          params["enterpriseId"] = String(existing["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        if (g["deviceId"] !== undefined) {
          params["deviceId"] = String(g["deviceId"]);
        } else if (existing["deviceId"]) {
          params["deviceId"] = String(existing["deviceId"]);
        }
        params["managedConfigurationForDeviceId"] =
          existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["configurationVariables"] !== undefined) {
          body["configurationVariables"] = g["configurationVariables"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["managedProperty"] !== undefined) {
          body["managedProperty"] = g["managedProperty"];
        }
        if (g["productId"] !== undefined) body["productId"] = g["productId"];
        let live: Record<string, unknown> | undefined;
        const unset = [
          "configurationVariables",
          "kind",
          "managedProperty",
          "productId",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
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
    delete: {
      description: "Delete the managedconfigurationsfordevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the managedconfigurationsfordevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["deviceId"] !== undefined) {
          params["deviceId"] = String(g["deviceId"]);
        }
        params["managedConfigurationForDeviceId"] = args.identifier;
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
      description: "Sync managedconfigurationsfordevice state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific managedconfigurationsfordevice by name (e.g. one discovered by list)",
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          if (g["deviceId"] !== undefined) {
            params["deviceId"] = String(g["deviceId"]);
          } else if (existing["deviceId"]) {
            params["deviceId"] = String(existing["deviceId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["managedConfigurationForDeviceId"] = identifier;
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
      description: "List managedconfigurationsfordevice resources",
      arguments: z.object({
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["deviceId"] !== undefined) {
          params["deviceId"] = String(g["deviceId"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "managedConfigurationForDevice",
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
