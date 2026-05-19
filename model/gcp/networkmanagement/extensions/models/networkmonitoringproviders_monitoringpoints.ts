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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Management NetworkMonitoringProviders.MonitoringPoints. Registered at `@swamp/gcp/networkmanagement/networkmonitoringproviders-monitoringpoints`. */
export const model = {
  type:
    "@swamp/gcp/networkmanagement/networkmonitoringproviders-monitoringpoints",
  version: "2026.05.19.2",
  upgrades: [
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync monitoringPoints state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    download_install_script: {
      description: "download install script",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
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
          {},
        );
        return { result };
      },
    },
    download_recreate_install_script: {
      description: "download recreate install script",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
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
          {},
        );
        return { result };
      },
    },
    download_server_connect_config: {
      description: "download server connect config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
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
          {},
        );
        return { result };
      },
    },
  },
};
