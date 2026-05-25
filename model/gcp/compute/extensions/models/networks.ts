// Auto-generated extension model for @swamp/gcp/compute/networks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Networks.
 *
 * Represents a VPC Network resource. Networks connect resources to each other and to the internet. For more information, readVirtual Private Cloud (VPC) Network.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.networks.get",
  "path": "projects/{project}/global/networks/{network}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "network",
  ],
  "parameters": {
    "network": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.networks.insert",
  "path": "projects/{project}/global/networks",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.networks.patch",
  "path": "projects/{project}/global/networks/{network}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "network",
  ],
  "parameters": {
    "network": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.networks.delete",
  "path": "projects/{project}/global/networks/{network}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "network",
  ],
  "parameters": {
    "network": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.networks.list",
  "path": "projects/{project}/global/networks",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  autoCreateSubnetworks: z.boolean().describe(
    "Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this field when you create the resource.",
  ).optional(),
  enableUlaInternalIpv6: z.boolean().describe(
    "Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20..",
  ).optional(),
  internalIpv6Range: z.string().describe(
    "When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field..",
  ).optional(),
  mtu: z.number().int().describe(
    "Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.",
    ),
  networkFirewallPolicyEnforcementOrder: z.enum([
    "AFTER_CLASSIC_FIREWALL",
    "BEFORE_CLASSIC_FIREWALL",
  ]).describe(
    "The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified.",
  ).optional(),
  networkProfile: z.string().describe(
    "A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name}",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional network parameters.").optional(),
  routingConfig: z.object({
    bgpAlwaysCompareMed: z.boolean().describe(
      "Enable comparison of Multi-Exit Discriminators (MED) across routes with different neighbor ASNs when using the STANDARD BGP best path selection algorithm.",
    ).optional(),
    bgpBestPathSelectionMode: z.enum(["LEGACY", "STANDARD"]).describe(
      "The BGP best path selection algorithm to be employed within this network for dynamic routes learned by Cloud Routers. Can be LEGACY (default) or STANDARD.",
    ).optional(),
    bgpInterRegionCost: z.enum(["ADD_COST_TO_MED", "DEFAULT"]).describe(
      "Allows to define a preferred approach for handling inter-region cost in the selection process when using the STANDARD BGP best path selection algorithm. Can be DEFAULT orADD_COST_TO_MED.",
    ).optional(),
    effectiveBgpAlwaysCompareMed: z.boolean().describe(
      "Output only. [Output Only] Effective value of the bgp_always_compare_med field.",
    ).optional(),
    effectiveBgpInterRegionCost: z.enum(["ADD_COST_TO_MED", "DEFAULT"])
      .describe(
        "Output only. [Output Only] Effective value of the bgp_inter_region_cost field.",
      ).optional(),
    routingMode: z.enum(["GLOBAL", "REGIONAL"]).describe(
      "The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set toGLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions.",
    ).optional(),
  }).describe(
    "A routing configuration attached to a network resource. The message includes the list of routers associated with the network, and a flag indicating the type of routing behavior to enforce network-wide.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  IPv4Range: z.string().optional(),
  autoCreateSubnetworks: z.boolean().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  enableUlaInternalIpv6: z.boolean().optional(),
  firewallPolicy: z.string().optional(),
  gatewayIPv4: z.string().optional(),
  id: z.string().optional(),
  internalIpv6Range: z.string().optional(),
  kind: z.string().optional(),
  mtu: z.number().optional(),
  name: z.string(),
  networkFirewallPolicyEnforcementOrder: z.string().optional(),
  networkProfile: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  peerings: z.array(z.object({
    autoCreateRoutes: z.boolean(),
    connectionStatus: z.object({
      consensusState: z.object({
        deleteStatus: z.string(),
        updateStatus: z.string(),
      }),
      trafficConfiguration: z.object({
        exportCustomRoutesToPeer: z.boolean(),
        exportSubnetRoutesWithPublicIpToPeer: z.boolean(),
        importCustomRoutesFromPeer: z.boolean(),
        importSubnetRoutesWithPublicIpFromPeer: z.boolean(),
        stackType: z.string(),
      }),
      updateStrategy: z.string(),
    }),
    exchangeSubnetRoutes: z.boolean(),
    exportCustomRoutes: z.boolean(),
    exportSubnetRoutesWithPublicIp: z.boolean(),
    importCustomRoutes: z.boolean(),
    importSubnetRoutesWithPublicIp: z.boolean(),
    name: z.string(),
    network: z.string(),
    peerMtu: z.number(),
    stackType: z.string(),
    state: z.string(),
    stateDetails: z.string(),
    updateStrategy: z.string(),
  })).optional(),
  routingConfig: z.object({
    bgpAlwaysCompareMed: z.boolean(),
    bgpBestPathSelectionMode: z.string(),
    bgpInterRegionCost: z.string(),
    effectiveBgpAlwaysCompareMed: z.boolean(),
    effectiveBgpInterRegionCost: z.string(),
    routingMode: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  subnetworks: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  autoCreateSubnetworks: z.boolean().describe(
    "Must be set to create a VPC network. If not set, a legacy network is created. When set to true, the VPC network is created in auto mode. When set to false, the VPC network is created in custom mode. An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described inAuto mode VPC network IP ranges. For custom mode VPC networks, you can add subnets using the subnetworksinsert method.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this field when you create the resource.",
  ).optional(),
  enableUlaInternalIpv6: z.boolean().describe(
    "Enable ULA internal ipv6 on this network. Enabling this feature will assign a /48 from google defined ULA prefix fd20::/20..",
  ).optional(),
  internalIpv6Range: z.string().describe(
    "When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20. The input must be a valid /48 ULA IPv6 address and must be within the fd20::/20. Operation will fail if the speficied /48 is already in used by another resource. If the field is not speficied, then a /48 range will be randomly allocated from fd20::/20 and returned via this field..",
  ).optional(),
  mtu: z.number().int().describe(
    "Maximum Transmission Unit in bytes. The minimum value for this field is 1300 and the maximum value is 8896. The suggested value is 1500, which is the default MTU used on the Internet, or 8896 if you want to use Jumbo frames. If unspecified, the value defaults to 1460.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit.",
    ).optional(),
  networkFirewallPolicyEnforcementOrder: z.enum([
    "AFTER_CLASSIC_FIREWALL",
    "BEFORE_CLASSIC_FIREWALL",
  ]).describe(
    "The network firewall policy enforcement order. Can be either AFTER_CLASSIC_FIREWALL or BEFORE_CLASSIC_FIREWALL. Defaults to AFTER_CLASSIC_FIREWALL if the field is not specified.",
  ).optional(),
  networkProfile: z.string().describe(
    "A full or partial URL of the network profile to apply to this network. This field can be set only at resource creation time. For example, the following are valid URLs: - https://www.googleapis.com/compute/{api_version}/projects/{project_id}/global/networkProfiles/{network_profile_name} - projects/{project_id}/global/networkProfiles/{network_profile_name}",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional network parameters.").optional(),
  routingConfig: z.object({
    bgpAlwaysCompareMed: z.boolean().describe(
      "Enable comparison of Multi-Exit Discriminators (MED) across routes with different neighbor ASNs when using the STANDARD BGP best path selection algorithm.",
    ).optional(),
    bgpBestPathSelectionMode: z.enum(["LEGACY", "STANDARD"]).describe(
      "The BGP best path selection algorithm to be employed within this network for dynamic routes learned by Cloud Routers. Can be LEGACY (default) or STANDARD.",
    ).optional(),
    bgpInterRegionCost: z.enum(["ADD_COST_TO_MED", "DEFAULT"]).describe(
      "Allows to define a preferred approach for handling inter-region cost in the selection process when using the STANDARD BGP best path selection algorithm. Can be DEFAULT orADD_COST_TO_MED.",
    ).optional(),
    effectiveBgpAlwaysCompareMed: z.boolean().describe(
      "Output only. [Output Only] Effective value of the bgp_always_compare_med field.",
    ).optional(),
    effectiveBgpInterRegionCost: z.enum(["ADD_COST_TO_MED", "DEFAULT"])
      .describe(
        "Output only. [Output Only] Effective value of the bgp_inter_region_cost field.",
      ).optional(),
    routingMode: z.enum(["GLOBAL", "REGIONAL"]).describe(
      "The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set toGLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions.",
    ).optional(),
  }).describe(
    "A routing configuration attached to a network resource. The message includes the list of routers associated with the network, and a flag indicating the type of routing behavior to enforce network-wide.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Networks. Registered at `@swamp/gcp/compute/networks`. */
export const model = {
  type: "@swamp/gcp/compute/networks",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a VPC Network resource. Networks connect resources to each other a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a networks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["autoCreateSubnetworks"] !== undefined) {
          body["autoCreateSubnetworks"] = g["autoCreateSubnetworks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableUlaInternalIpv6"] !== undefined) {
          body["enableUlaInternalIpv6"] = g["enableUlaInternalIpv6"];
        }
        if (g["internalIpv6Range"] !== undefined) {
          body["internalIpv6Range"] = g["internalIpv6Range"];
        }
        if (g["mtu"] !== undefined) body["mtu"] = g["mtu"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkFirewallPolicyEnforcementOrder"] !== undefined) {
          body["networkFirewallPolicyEnforcementOrder"] =
            g["networkFirewallPolicyEnforcementOrder"];
        }
        if (g["networkProfile"] !== undefined) {
          body["networkProfile"] = g["networkProfile"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["routingConfig"] !== undefined) {
          body["routingConfig"] = g["routingConfig"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["network"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a networks",
      arguments: z.object({
        identifier: z.string().describe("The name of the networks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["network"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update networks attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["network"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["autoCreateSubnetworks"] !== undefined) {
          body["autoCreateSubnetworks"] = g["autoCreateSubnetworks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableUlaInternalIpv6"] !== undefined) {
          body["enableUlaInternalIpv6"] = g["enableUlaInternalIpv6"];
        }
        if (g["internalIpv6Range"] !== undefined) {
          body["internalIpv6Range"] = g["internalIpv6Range"];
        }
        if (g["mtu"] !== undefined) body["mtu"] = g["mtu"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkFirewallPolicyEnforcementOrder"] !== undefined) {
          body["networkFirewallPolicyEnforcementOrder"] =
            g["networkFirewallPolicyEnforcementOrder"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["routingConfig"] !== undefined) {
          body["routingConfig"] = g["routingConfig"];
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
      description: "Delete the networks",
      arguments: z.object({
        identifier: z.string().describe("The name of the networks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["network"] = args.identifier;
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
      description: "Sync networks state from GCP",
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
          params["network"] = identifier;
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
    list: {
      description: "List networks resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
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
    add_peering: {
      description: "add peering",
      arguments: z.object({
        autoCreateRoutes: z.any().optional(),
        name: z.any().optional(),
        networkPeering: z.any().optional(),
        peerNetwork: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["autoCreateRoutes"] !== undefined) {
          body["autoCreateRoutes"] = args["autoCreateRoutes"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["networkPeering"] !== undefined) {
          body["networkPeering"] = args["networkPeering"];
        }
        if (args["peerNetwork"] !== undefined) {
          body["peerNetwork"] = args["peerNetwork"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.addPeering",
            "path": "projects/{project}/global/networks/{network}/addPeering",
            "httpMethod": "POST",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "network": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_effective_firewalls: {
      description: "get effective firewalls",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.getEffectiveFirewalls",
            "path":
              "projects/{project}/global/networks/{network}/getEffectiveFirewalls",
            "httpMethod": "GET",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "network": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_peering_routes: {
      description: "list peering routes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.listPeeringRoutes",
            "path":
              "projects/{project}/global/networks/{network}/listPeeringRoutes",
            "httpMethod": "GET",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "direction": { "location": "query" },
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "network": { "location": "path", "required": true },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "peeringName": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "query" },
              "returnPartialSuccess": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    request_remove_peering: {
      description: "request remove peering",
      arguments: z.object({
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.requestRemovePeering",
            "path":
              "projects/{project}/global/networks/{network}/requestRemovePeering",
            "httpMethod": "POST",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "network": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    switch_to_custom_mode: {
      description: "switch to custom mode",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.switchToCustomMode",
            "path":
              "projects/{project}/global/networks/{network}/switchToCustomMode",
            "httpMethod": "POST",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "network": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_peering: {
      description: "update peering",
      arguments: z.object({
        networkPeering: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["network"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["networkPeering"] !== undefined) {
          body["networkPeering"] = args["networkPeering"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.networks.updatePeering",
            "path":
              "projects/{project}/global/networks/{network}/updatePeering",
            "httpMethod": "PATCH",
            "parameterOrder": ["project", "network"],
            "parameters": {
              "network": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
