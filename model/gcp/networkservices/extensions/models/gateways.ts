// Auto-generated extension model for @swamp/gcp/networkservices/gateways
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services Gateways.
 *
 * Gateway represents the configuration for a proxy, typically a load balancer. It captures the ip:port over which the services are exposed by the proxy, along with any policy configurations. Routes have reference to to Gateways to dictate how requests should be routed by this Gateway.
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
  return `${parent}/gateways/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.gateways.get",
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
  "id": "networkservices.projects.locations.gateways.create",
  "path": "v1/{+parent}/gateways",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "gatewayId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.gateways.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkservices.projects.locations.gateways.delete",
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
  "id": "networkservices.projects.locations.gateways.list",
  "path": "v1/{+parent}/gateways",
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
  addresses: z.array(z.string()).describe(
    "Optional. Zero or one IPv4 or IPv6 address on which the Gateway will receive the traffic. When no address is provided, an IP from the subnetwork is allocated This field only applies to gateways of type 'SECURE_WEB_GATEWAY'. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and:: for IPv6.",
  ).optional(),
  allPorts: z.boolean().describe(
    "Optional. If true, the Gateway will listen on all ports. This is mutually exclusive with the `ports` field. This field only applies to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  allowGlobalAccess: z.boolean().describe(
    "Optional. If true, the gateway will allow traffic from clients outside of the region where the gateway is located. This field is configurable only for gateways of type SECURE_WEB_GATEWAY.",
  ).optional(),
  certificateUrls: z.array(z.string()).describe(
    "Optional. A fully-qualified Certificates URL reference. The proxy presents a Certificate (selected based on SNI) when establishing a TLS connection. This feature only applies to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  envoyHeaders: z.enum(["ENVOY_HEADERS_UNSPECIFIED", "NONE", "DEBUG_HEADERS"])
    .describe(
      "Optional. Determines if envoy will insert internal debug headers into upstream requests. Other Envoy headers may still be injected. By default, envoy will not insert any debug headers.",
    ).optional(),
  gatewaySecurityPolicy: z.string().describe(
    "Optional. A fully-qualified GatewaySecurityPolicy URL reference. Defines how a server should apply security policy to inbound (VM to Proxy) initiated connections. For example: `projects/*/locations/*/gatewaySecurityPolicies/swg-policy`. This policy is specific to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
    "Optional. The IP Version that will be used by this gateway. Valid options are IPV4 or IPV6. Default is IPV4.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the Gateway resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the Gateway resource. It matches pattern `projects/*/locations/*/gateways/`.",
  ).optional(),
  network: z.string().describe(
    "Optional. The relative resource name identifying the VPC network that is using this configuration. For example: `projects/*/global/networks/network-1`. Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  ports: z.array(z.number().int()).describe(
    "Required. One or more port numbers (1-65535), on which the Gateway will receive traffic. The proxy binds to the specified ports. Gateways of type 'SECURE_WEB_GATEWAY' are limited to 5 ports. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and:: for IPv6 and support multiple ports.",
  ).optional(),
  routingMode: z.enum(["EXPLICIT_ROUTING_MODE", "NEXT_HOP_ROUTING_MODE"])
    .describe(
      "Optional. The routing mode of the Gateway. This field is configurable only for gateways of type SECURE_WEB_GATEWAY. This field is required for gateways of type SECURE_WEB_GATEWAY.",
    ).optional(),
  scope: z.string().describe(
    "Optional. Scope determines how configuration across multiple Gateway instances are merged. The configuration for multiple Gateway instances with the same scope will be merged as presented as a single configuration to the proxy/load balancer. Max length 64 characters. Scope should start with a letter and can only have letters, numbers, hyphens.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A fully-qualified ServerTLSPolicy URL reference. Specifies how TLS traffic is terminated. If empty, TLS termination is disabled.",
  ).optional(),
  subnetwork: z.string().describe(
    "Optional. The relative resource name identifying the subnetwork in which this SWG is allocated. For example: `projects/*/regions/us-central1/subnetworks/network-1` Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY\".",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "OPEN_MESH", "SECURE_WEB_GATEWAY"])
    .describe(
      "Immutable. The type of the customer managed gateway. This field is required. If unspecified, an error is returned.",
    ).optional(),
  gatewayId: z.string().describe(
    "Required. Short name of the Gateway resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  addresses: z.array(z.string()).optional(),
  allPorts: z.boolean().optional(),
  allowGlobalAccess: z.boolean().optional(),
  certificateUrls: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  envoyHeaders: z.string().optional(),
  gatewaySecurityPolicy: z.string().optional(),
  ipVersion: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  ports: z.array(z.number()).optional(),
  routingMode: z.string().optional(),
  scope: z.string().optional(),
  selfLink: z.string().optional(),
  serverTlsPolicy: z.string().optional(),
  subnetwork: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  addresses: z.array(z.string()).describe(
    "Optional. Zero or one IPv4 or IPv6 address on which the Gateway will receive the traffic. When no address is provided, an IP from the subnetwork is allocated This field only applies to gateways of type 'SECURE_WEB_GATEWAY'. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and:: for IPv6.",
  ).optional(),
  allPorts: z.boolean().describe(
    "Optional. If true, the Gateway will listen on all ports. This is mutually exclusive with the `ports` field. This field only applies to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  allowGlobalAccess: z.boolean().describe(
    "Optional. If true, the gateway will allow traffic from clients outside of the region where the gateway is located. This field is configurable only for gateways of type SECURE_WEB_GATEWAY.",
  ).optional(),
  certificateUrls: z.array(z.string()).describe(
    "Optional. A fully-qualified Certificates URL reference. The proxy presents a Certificate (selected based on SNI) when establishing a TLS connection. This feature only applies to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  envoyHeaders: z.enum(["ENVOY_HEADERS_UNSPECIFIED", "NONE", "DEBUG_HEADERS"])
    .describe(
      "Optional. Determines if envoy will insert internal debug headers into upstream requests. Other Envoy headers may still be injected. By default, envoy will not insert any debug headers.",
    ).optional(),
  gatewaySecurityPolicy: z.string().describe(
    "Optional. A fully-qualified GatewaySecurityPolicy URL reference. Defines how a server should apply security policy to inbound (VM to Proxy) initiated connections. For example: `projects/*/locations/*/gatewaySecurityPolicies/swg-policy`. This policy is specific to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
    "Optional. The IP Version that will be used by this gateway. Valid options are IPV4 or IPV6. Default is IPV4.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the Gateway resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the Gateway resource. It matches pattern `projects/*/locations/*/gateways/`.",
  ).optional(),
  network: z.string().describe(
    "Optional. The relative resource name identifying the VPC network that is using this configuration. For example: `projects/*/global/networks/network-1`. Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY'.",
  ).optional(),
  ports: z.array(z.number().int()).describe(
    "Required. One or more port numbers (1-65535), on which the Gateway will receive traffic. The proxy binds to the specified ports. Gateways of type 'SECURE_WEB_GATEWAY' are limited to 5 ports. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and:: for IPv6 and support multiple ports.",
  ).optional(),
  routingMode: z.enum(["EXPLICIT_ROUTING_MODE", "NEXT_HOP_ROUTING_MODE"])
    .describe(
      "Optional. The routing mode of the Gateway. This field is configurable only for gateways of type SECURE_WEB_GATEWAY. This field is required for gateways of type SECURE_WEB_GATEWAY.",
    ).optional(),
  scope: z.string().describe(
    "Optional. Scope determines how configuration across multiple Gateway instances are merged. The configuration for multiple Gateway instances with the same scope will be merged as presented as a single configuration to the proxy/load balancer. Max length 64 characters. Scope should start with a letter and can only have letters, numbers, hyphens.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A fully-qualified ServerTLSPolicy URL reference. Specifies how TLS traffic is terminated. If empty, TLS termination is disabled.",
  ).optional(),
  subnetwork: z.string().describe(
    "Optional. The relative resource name identifying the subnetwork in which this SWG is allocated. For example: `projects/*/regions/us-central1/subnetworks/network-1` Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY\".",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "OPEN_MESH", "SECURE_WEB_GATEWAY"])
    .describe(
      "Immutable. The type of the customer managed gateway. This field is required. If unspecified, an error is returned.",
    ).optional(),
  gatewayId: z.string().describe(
    "Required. Short name of the Gateway resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Services Gateways. Registered at `@swamp/gcp/networkservices/gateways`. */
export const model = {
  type: "@swamp/gcp/networkservices/gateways",
  version: "2026.05.21.1",
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
      description: "Added: allPorts",
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
      description: "Removed: allPorts",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { allPorts: _allPorts, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: allPorts",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: allPorts",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { allPorts: _allPorts, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: allPorts",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Gateway represents the configuration for a proxy, typically a load balancer. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a gateways",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["addresses"] !== undefined) body["addresses"] = g["addresses"];
        if (g["allPorts"] !== undefined) body["allPorts"] = g["allPorts"];
        if (g["allowGlobalAccess"] !== undefined) {
          body["allowGlobalAccess"] = g["allowGlobalAccess"];
        }
        if (g["certificateUrls"] !== undefined) {
          body["certificateUrls"] = g["certificateUrls"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["envoyHeaders"] !== undefined) {
          body["envoyHeaders"] = g["envoyHeaders"];
        }
        if (g["gatewaySecurityPolicy"] !== undefined) {
          body["gatewaySecurityPolicy"] = g["gatewaySecurityPolicy"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["ports"] !== undefined) body["ports"] = g["ports"];
        if (g["routingMode"] !== undefined) {
          body["routingMode"] = g["routingMode"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["gatewayId"] !== undefined) body["gatewayId"] = g["gatewayId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
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
      description: "Get a gateways",
      arguments: z.object({
        identifier: z.string().describe("The name of the gateways"),
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
      description: "Update gateways attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["addresses"] !== undefined) body["addresses"] = g["addresses"];
        if (g["allPorts"] !== undefined) body["allPorts"] = g["allPorts"];
        if (g["allowGlobalAccess"] !== undefined) {
          body["allowGlobalAccess"] = g["allowGlobalAccess"];
        }
        if (g["certificateUrls"] !== undefined) {
          body["certificateUrls"] = g["certificateUrls"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["envoyHeaders"] !== undefined) {
          body["envoyHeaders"] = g["envoyHeaders"];
        }
        if (g["gatewaySecurityPolicy"] !== undefined) {
          body["gatewaySecurityPolicy"] = g["gatewaySecurityPolicy"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["ports"] !== undefined) body["ports"] = g["ports"];
        if (g["routingMode"] !== undefined) {
          body["routingMode"] = g["routingMode"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
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
      description: "Delete the gateways",
      arguments: z.object({
        identifier: z.string().describe("The name of the gateways"),
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
      description: "Sync gateways state from GCP",
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
