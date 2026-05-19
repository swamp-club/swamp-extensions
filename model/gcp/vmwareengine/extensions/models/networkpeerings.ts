// Auto-generated extension model for @swamp/gcp/vmwareengine/networkpeerings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VMware Engine NetworkPeerings.
 *
 * Details of a network peering.
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
  return `${parent}/networkPeerings/${shortName}`;
}

const BASE_URL = "https://vmwareengine.googleapis.com/";

const GET_CONFIG = {
  "id": "vmwareengine.projects.locations.networkPeerings.get",
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

const INSERT_CONFIG = {
  "id": "vmwareengine.projects.locations.networkPeerings.create",
  "path": "v1/{+parent}/networkPeerings",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "networkPeeringId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "vmwareengine.projects.locations.networkPeerings.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vmwareengine.projects.locations.networkPeerings.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe(
    "Optional. User-provided description for this network peering.",
  ).optional(),
  exchangeSubnetRoutes: z.boolean().describe(
    "Optional. True if full mesh connectivity is created and managed automatically between peered networks; false otherwise. Currently this field is always true because Google Compute Engine automatically creates and manages subnetwork routes between two VPC networks when peering state is 'ACTIVE'.",
  ).optional(),
  exportCustomRoutes: z.boolean().describe(
    "Optional. True if custom routes are exported to the peered network; false otherwise. The default value is true.",
  ).optional(),
  exportCustomRoutesWithPublicIp: z.boolean().describe(
    "Optional. True if all subnet routes with a public IP address range are exported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always exported to peers and are not controlled by this field.",
  ).optional(),
  importCustomRoutes: z.boolean().describe(
    "Optional. True if custom routes are imported from the peered network; false otherwise. The default value is true.",
  ).optional(),
  importCustomRoutesWithPublicIp: z.boolean().describe(
    "Optional. True if all subnet routes with public IP address range are imported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always imported to peers and are not controlled by this field.",
  ).optional(),
  peerMtu: z.number().int().describe(
    "Optional. Maximum transmission unit (MTU) in bytes. The default value is `1500`. If a value of `0` is provided for this field, VMware Engine uses the default value instead.",
  ).optional(),
  peerNetwork: z.string().describe(
    "Required. The relative resource name of the network to peer with a standard VMware Engine network. The provided network can be a consumer VPC network or another standard VMware Engine network. If the `peer_network_type` is VMWARE_ENGINE_NETWORK, specify the name in the form: `projects/{project}/locations/global/vmwareEngineNetworks/{vmware_engine_network_id}`. Otherwise specify the name in the form: `projects/{project}/global/networks/{network_id}`, where `{project}` can either be a project number or a project ID.",
  ).optional(),
  peerNetworkType: z.enum([
    "PEER_NETWORK_TYPE_UNSPECIFIED",
    "STANDARD",
    "VMWARE_ENGINE_NETWORK",
    "PRIVATE_SERVICES_ACCESS",
    "NETAPP_CLOUD_VOLUMES",
    "THIRD_PARTY_SERVICE",
    "DELL_POWERSCALE",
    "GOOGLE_CLOUD_NETAPP_VOLUMES",
    "GOOGLE_CLOUD_FILESTORE_INSTANCES",
  ]).describe(
    "Required. The type of the network to peer with the VMware Engine network.",
  ).optional(),
  vmwareEngineNetwork: z.string().describe(
    "Required. The relative resource name of the VMware Engine network. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID.",
  ).optional(),
  networkPeeringId: z.string().describe(
    "Required. The user-provided identifier of the new `NetworkPeering`. This identifier must be unique among `NetworkPeering` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  exchangeSubnetRoutes: z.boolean().optional(),
  exportCustomRoutes: z.boolean().optional(),
  exportCustomRoutesWithPublicIp: z.boolean().optional(),
  importCustomRoutes: z.boolean().optional(),
  importCustomRoutesWithPublicIp: z.boolean().optional(),
  name: z.string(),
  peerMtu: z.number().optional(),
  peerNetwork: z.string().optional(),
  peerNetworkType: z.string().optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  vmwareEngineNetwork: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe(
    "Optional. User-provided description for this network peering.",
  ).optional(),
  exchangeSubnetRoutes: z.boolean().describe(
    "Optional. True if full mesh connectivity is created and managed automatically between peered networks; false otherwise. Currently this field is always true because Google Compute Engine automatically creates and manages subnetwork routes between two VPC networks when peering state is 'ACTIVE'.",
  ).optional(),
  exportCustomRoutes: z.boolean().describe(
    "Optional. True if custom routes are exported to the peered network; false otherwise. The default value is true.",
  ).optional(),
  exportCustomRoutesWithPublicIp: z.boolean().describe(
    "Optional. True if all subnet routes with a public IP address range are exported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always exported to peers and are not controlled by this field.",
  ).optional(),
  importCustomRoutes: z.boolean().describe(
    "Optional. True if custom routes are imported from the peered network; false otherwise. The default value is true.",
  ).optional(),
  importCustomRoutesWithPublicIp: z.boolean().describe(
    "Optional. True if all subnet routes with public IP address range are imported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always imported to peers and are not controlled by this field.",
  ).optional(),
  peerMtu: z.number().int().describe(
    "Optional. Maximum transmission unit (MTU) in bytes. The default value is `1500`. If a value of `0` is provided for this field, VMware Engine uses the default value instead.",
  ).optional(),
  peerNetwork: z.string().describe(
    "Required. The relative resource name of the network to peer with a standard VMware Engine network. The provided network can be a consumer VPC network or another standard VMware Engine network. If the `peer_network_type` is VMWARE_ENGINE_NETWORK, specify the name in the form: `projects/{project}/locations/global/vmwareEngineNetworks/{vmware_engine_network_id}`. Otherwise specify the name in the form: `projects/{project}/global/networks/{network_id}`, where `{project}` can either be a project number or a project ID.",
  ).optional(),
  peerNetworkType: z.enum([
    "PEER_NETWORK_TYPE_UNSPECIFIED",
    "STANDARD",
    "VMWARE_ENGINE_NETWORK",
    "PRIVATE_SERVICES_ACCESS",
    "NETAPP_CLOUD_VOLUMES",
    "THIRD_PARTY_SERVICE",
    "DELL_POWERSCALE",
    "GOOGLE_CLOUD_NETAPP_VOLUMES",
    "GOOGLE_CLOUD_FILESTORE_INSTANCES",
  ]).describe(
    "Required. The type of the network to peer with the VMware Engine network.",
  ).optional(),
  vmwareEngineNetwork: z.string().describe(
    "Required. The relative resource name of the VMware Engine network. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID.",
  ).optional(),
  networkPeeringId: z.string().describe(
    "Required. The user-provided identifier of the new `NetworkPeering`. This identifier must be unique among `NetworkPeering` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VMware Engine NetworkPeerings. Registered at `@swamp/gcp/vmwareengine/networkpeerings`. */
export const model = {
  type: "@swamp/gcp/vmwareengine/networkpeerings",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.18.1",
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
      description: "Details of a network peering.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a networkPeerings",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exchangeSubnetRoutes"] !== undefined) {
          body["exchangeSubnetRoutes"] = g["exchangeSubnetRoutes"];
        }
        if (g["exportCustomRoutes"] !== undefined) {
          body["exportCustomRoutes"] = g["exportCustomRoutes"];
        }
        if (g["exportCustomRoutesWithPublicIp"] !== undefined) {
          body["exportCustomRoutesWithPublicIp"] =
            g["exportCustomRoutesWithPublicIp"];
        }
        if (g["importCustomRoutes"] !== undefined) {
          body["importCustomRoutes"] = g["importCustomRoutes"];
        }
        if (g["importCustomRoutesWithPublicIp"] !== undefined) {
          body["importCustomRoutesWithPublicIp"] =
            g["importCustomRoutesWithPublicIp"];
        }
        if (g["peerMtu"] !== undefined) body["peerMtu"] = g["peerMtu"];
        if (g["peerNetwork"] !== undefined) {
          body["peerNetwork"] = g["peerNetwork"];
        }
        if (g["peerNetworkType"] !== undefined) {
          body["peerNetworkType"] = g["peerNetworkType"];
        }
        if (g["vmwareEngineNetwork"] !== undefined) {
          body["vmwareEngineNetwork"] = g["vmwareEngineNetwork"];
        }
        if (g["networkPeeringId"] !== undefined) {
          body["networkPeeringId"] = g["networkPeeringId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
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
      description: "Get a networkPeerings",
      arguments: z.object({
        identifier: z.string().describe("The name of the networkPeerings"),
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
    update: {
      description: "Update networkPeerings attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exchangeSubnetRoutes"] !== undefined) {
          body["exchangeSubnetRoutes"] = g["exchangeSubnetRoutes"];
        }
        if (g["exportCustomRoutes"] !== undefined) {
          body["exportCustomRoutes"] = g["exportCustomRoutes"];
        }
        if (g["exportCustomRoutesWithPublicIp"] !== undefined) {
          body["exportCustomRoutesWithPublicIp"] =
            g["exportCustomRoutesWithPublicIp"];
        }
        if (g["importCustomRoutes"] !== undefined) {
          body["importCustomRoutes"] = g["importCustomRoutes"];
        }
        if (g["importCustomRoutesWithPublicIp"] !== undefined) {
          body["importCustomRoutesWithPublicIp"] =
            g["importCustomRoutesWithPublicIp"];
        }
        if (g["peerMtu"] !== undefined) body["peerMtu"] = g["peerMtu"];
        if (g["peerNetwork"] !== undefined) {
          body["peerNetwork"] = g["peerNetwork"];
        }
        if (g["peerNetworkType"] !== undefined) {
          body["peerNetworkType"] = g["peerNetworkType"];
        }
        if (g["vmwareEngineNetwork"] !== undefined) {
          body["vmwareEngineNetwork"] = g["vmwareEngineNetwork"];
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
      description: "Delete the networkPeerings",
      arguments: z.object({
        identifier: z.string().describe("The name of the networkPeerings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync networkPeerings state from GCP",
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
  },
};
