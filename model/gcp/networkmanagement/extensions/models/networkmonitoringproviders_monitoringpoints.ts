// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/networkmanagement/networkmonitoringproviders-monitoringpoints
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Management NetworkMonitoringProviders.MonitoringPoints.
 *
 * Message describing MonitoringPoint resource.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/monitoringPoints/${shortName}`;
}

const BASE_URL = "https://networkmanagement.googleapis.com/";

const GET_CONFIG = {
  "id":
    "networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.get",
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

const LIST_CONFIG = {
  "id":
    "networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.list",
  "path": "v1/{+parent}/monitoringPoints",
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoGeoLocationEnabled: z.boolean().optional(),
  connectionStatus: z.string().optional(),
  createTime: z.string().optional(),
  deploymentType: z.string().optional(),
  displayName: z.string().optional(),
  errors: z.array(z.string()).optional(),
  geoLocation: z.object({
    formattedAddress: z.string(),
    regionCode: z.string(),
  }).optional(),
  guid: z.string().optional(),
  host: z.object({
    cloudInstanceId: z.string(),
    cloudProjectId: z.string(),
    cloudProvider: z.string(),
    cloudRegion: z.string(),
    cloudVirtualNetworkIds: z.array(z.string()),
    cloudZone: z.string(),
    os: z.string(),
  }).optional(),
  hostname: z.string().optional(),
  name: z.string(),
  networkInterfaces: z.array(z.object({
    adapterDescription: z.string(),
    cidr: z.string(),
    interfaceName: z.string(),
    ipAddress: z.string(),
    macAddress: z.string(),
    speed: z.string(),
    vlanId: z.string(),
  })).optional(),
  originatingIp: z.string().optional(),
  providerTags: z.array(z.object({
    category: z.string(),
    resourceType: z.string(),
    value: z.string(),
  })).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  upgradeAvailable: z.boolean().optional(),
  upgradeType: z.string().optional(),
  version: z.string().optional(),
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Network Management NetworkMonitoringProviders.MonitoringPoints. Registered at `@swamp/gcp/networkmanagement/networkmonitoringproviders-monitoringpoints`. */
export const model = {
  type:
    "@swamp/gcp/networkmanagement/networkmonitoringproviders-monitoringpoints",
  version: "2026.10.13.1",
  upgrades: [
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing MonitoringPoint resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a monitoringPoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the monitoringPoints"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
    sync: {
      description: "Sync monitoringPoints state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific monitoringPoints by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
      description: "List monitoringPoints resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of monitoring points to return. The service may return fewer than this value. If unspecified, at most 20 monitoring points will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "monitoringPoints",
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
    download_install_script: {
      description: "download install script",
      arguments: z.object({
        _password: z.any().optional(),
        hostname: z.any().optional(),
        monitoringPointType: z.any().optional(),
        ntpServerAddress: z.any().optional(),
        ntpServerSecondaryAddress: z.any().optional(),
        privateConnectivityEnabled: z.any().optional(),
        staticIpAddress_dnsServerAddress: z.any().optional(),
        staticIpAddress_dnsServerSecondaryAddress: z.any().optional(),
        staticIpAddress_domain: z.any().optional(),
        staticIpAddress_gatewayAddress: z.any().optional(),
        staticIpAddress_ipAddress: z.any().optional(),
        staticIpAddress_netmask: z.any().optional(),
        timeZone_id: z.any().optional(),
        timeZone_version: z.any().optional(),
        useDhcp: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["_password"] !== undefined) {
          params["_password"] = String(args["_password"]);
        }
        if (args["hostname"] !== undefined) {
          params["hostname"] = String(args["hostname"]);
        }
        if (args["monitoringPointType"] !== undefined) {
          params["monitoringPointType"] = String(args["monitoringPointType"]);
        }
        if (args["ntpServerAddress"] !== undefined) {
          params["ntpServerAddress"] = String(args["ntpServerAddress"]);
        }
        if (args["ntpServerSecondaryAddress"] !== undefined) {
          params["ntpServerSecondaryAddress"] = String(
            args["ntpServerSecondaryAddress"],
          );
        }
        if (args["privateConnectivityEnabled"] !== undefined) {
          params["privateConnectivityEnabled"] = String(
            args["privateConnectivityEnabled"],
          );
        }
        if (args["staticIpAddress_dnsServerAddress"] !== undefined) {
          params["staticIpAddress.dnsServerAddress"] = String(
            args["staticIpAddress_dnsServerAddress"],
          );
        }
        if (args["staticIpAddress_dnsServerSecondaryAddress"] !== undefined) {
          params["staticIpAddress.dnsServerSecondaryAddress"] = String(
            args["staticIpAddress_dnsServerSecondaryAddress"],
          );
        }
        if (args["staticIpAddress_domain"] !== undefined) {
          params["staticIpAddress.domain"] = String(
            args["staticIpAddress_domain"],
          );
        }
        if (args["staticIpAddress_gatewayAddress"] !== undefined) {
          params["staticIpAddress.gatewayAddress"] = String(
            args["staticIpAddress_gatewayAddress"],
          );
        }
        if (args["staticIpAddress_ipAddress"] !== undefined) {
          params["staticIpAddress.ipAddress"] = String(
            args["staticIpAddress_ipAddress"],
          );
        }
        if (args["staticIpAddress_netmask"] !== undefined) {
          params["staticIpAddress.netmask"] = String(
            args["staticIpAddress_netmask"],
          );
        }
        if (args["timeZone_id"] !== undefined) {
          params["timeZone.id"] = String(args["timeZone_id"]);
        }
        if (args["timeZone_version"] !== undefined) {
          params["timeZone.version"] = String(args["timeZone_version"]);
        }
        if (args["useDhcp"] !== undefined) {
          params["useDhcp"] = String(args["useDhcp"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadInstallScript",
            "path": "v1/{+parent}/monitoringPoints:downloadInstallScript",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "_password": { "location": "query" },
              "hostname": { "location": "query" },
              "monitoringPointType": { "location": "query" },
              "ntpServerAddress": { "location": "query" },
              "ntpServerSecondaryAddress": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "privateConnectivityEnabled": { "location": "query" },
              "staticIpAddress.dnsServerAddress": { "location": "query" },
              "staticIpAddress.dnsServerSecondaryAddress": {
                "location": "query",
              },
              "staticIpAddress.domain": { "location": "query" },
              "staticIpAddress.gatewayAddress": { "location": "query" },
              "staticIpAddress.ipAddress": { "location": "query" },
              "staticIpAddress.netmask": { "location": "query" },
              "timeZone.id": { "location": "query" },
              "timeZone.version": { "location": "query" },
              "useDhcp": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    download_recreate_install_script: {
      description: "download recreate install script",
      arguments: z.object({
        hostname: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        if (args["hostname"] !== undefined) {
          params["hostname"] = String(args["hostname"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadRecreateInstallScript",
            "path": "v1/{+name}:downloadRecreateInstallScript",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "hostname": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    download_server_connect_config: {
      description: "download server connect config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          baseUrl,
          {
            "id":
              "networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadServerConnectConfig",
            "path": "v1/{+parent}/monitoringPoints:downloadServerConnectConfig",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
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
