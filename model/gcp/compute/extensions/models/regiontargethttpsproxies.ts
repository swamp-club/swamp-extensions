// Auto-generated extension model for @swamp/gcp/compute/regiontargethttpsproxies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionTargetHttpsProxies.
 *
 * Represents a Target HTTPS Proxy resource. Google Compute Engine has two Target HTTPS Proxy resources: * [Global](/compute/docs/reference/rest/v1/targetHttpsProxies) * [Regional](/compute/docs/reference/rest/v1/regionTargetHttpsProxies) A target HTTPS proxy is a component of Google Cloud HTTPS load balancers. * targetHttpsProxies are used by global external Application Load Balancers, classic Application Load Balancers, cross-region internal Application Load Balancers, and Traffic Director. * regionTargetHttpsProxies are used by regional internal Application Load Balancers and regional external Application Load Balancers. Forwarding rules reference a target HTTPS proxy, and the target proxy then references a URL map. For more information, readUsing Target Proxies and Forwarding rule concepts.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionTargetHttpsProxies.get",
  "path":
    "projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "targetHttpsProxy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "targetHttpsProxy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionTargetHttpsProxies.insert",
  "path": "projects/{project}/regions/{region}/targetHttpsProxies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.regionTargetHttpsProxies.patch",
  "path":
    "projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "targetHttpsProxy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "targetHttpsProxy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.regionTargetHttpsProxies.delete",
  "path":
    "projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "targetHttpsProxy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "targetHttpsProxy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.regionTargetHttpsProxies.list",
  "path": "projects/{project}/regions/{region}/targetHttpsProxies",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
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
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  authorizationPolicy: z.string().describe(
    "Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy. Refer to the AuthorizationPolicy resource for additional details. authorizationPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED. Note: This field currently has no impact.",
  ).optional(),
  certificateMap: z.string().describe(
    "URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpsProxy. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpsProxy.",
  ).optional(),
  httpKeepAliveTimeoutSec: z.number().int().describe(
    "Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  proxyBind: z.boolean().describe(
    "This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false.",
  ).optional(),
  quicOverride: z.enum(["DISABLE", "ENABLE", "NONE"]).describe(
    "Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify NONE, ENABLE, orDISABLE. - When quic-override is set to NONE, Google manages whether QUIC is used. - When quic-override is set to ENABLE, the load balancer uses QUIC when possible. - When quic-override is set to DISABLE, the load balancer doesn't use QUIC. - If the quic-override flag is not specified,NONE is implied.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic. serverTlsPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL orEXTERNAL_MANAGED or INTERNAL_MANAGED. It also applies to a regional TargetHttpsProxy attached to regional forwardingRules with theloadBalancingScheme set to EXTERNAL_MANAGED orINTERNAL_MANAGED. For details whichServerTlsPolicy resources are accepted withINTERNAL_SELF_MANAGED and which with EXTERNAL,INTERNAL_MANAGED, EXTERNAL_MANAGEDloadBalancingScheme consult ServerTlsPolicy documentation. If left blank, communications are not encrypted.",
  ).optional(),
  sslCertificates: z.array(z.string()).describe(
    "URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificate_map instead. Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates. Certificate Manager Certificates accepted formats are: - //certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}. - https://certificatemanager.googleapis.com/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}.",
  ).optional(),
  sslPolicy: z.string().describe(
    "URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured.",
  ).optional(),
  tlsEarlyData: z.enum(["DISABLED", "PERMISSIVE", "STRICT", "UNRESTRICTED"])
    .describe(
      'Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3). This can improve application performance, especially on networks where interruptions may be common, such as on mobile. Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included. Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant. The default value is DISABLED.',
    ).optional(),
  urlMap: z.string().describe(
    "A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map: - https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map - projects/project/global/urlMaps/url-map - global/urlMaps/url-map",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  authorizationPolicy: z.string().optional(),
  certificateMap: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  httpKeepAliveTimeoutSec: z.number().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  proxyBind: z.boolean().optional(),
  quicOverride: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  serverTlsPolicy: z.string().optional(),
  sslCertificates: z.array(z.string()).optional(),
  sslPolicy: z.string().optional(),
  tlsEarlyData: z.string().optional(),
  urlMap: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  authorizationPolicy: z.string().describe(
    "Optional. A URL referring to a networksecurity.AuthorizationPolicy resource that describes how the proxy should authorize inbound traffic. If left blank, access will not be restricted by an authorization policy. Refer to the AuthorizationPolicy resource for additional details. authorizationPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED. Note: This field currently has no impact.",
  ).optional(),
  certificateMap: z.string().describe(
    "URL of a certificate map that identifies a certificate map associated with the given target proxy. This field can only be set for Global external Application Load Balancer or Classic Application Load Balancer. For other products use Certificate Manager Certificates instead. If set, sslCertificates will be ignored. Accepted format is//certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificateMaps/{resourceName}.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a TargetHttpsProxy. An up-to-date fingerprint must be provided in order to patch the TargetHttpsProxy; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the TargetHttpsProxy.",
  ).optional(),
  httpKeepAliveTimeoutSec: z.number().int().describe(
    "Specifies how long to keep a connection open, after completing a response, while there is no matching traffic (in seconds). If an HTTP keep-alive is not specified, a default value (610 seconds) will be used. For global external Application Load Balancers, the minimum allowed value is 5 seconds and the maximum allowed value is 1200 seconds. For classic Application Load Balancers, this option is not supported.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  proxyBind: z.boolean().describe(
    "This field only applies when the forwarding rule that references this target proxy has a loadBalancingScheme set toINTERNAL_SELF_MANAGED. When this field is set to true, Envoy proxies set up inbound traffic interception and bind to the IP address and port specified in the forwarding rule. This is generally useful when using Traffic Director to configure Envoy as a gateway or middle proxy (in other words, not a sidecar proxy). The Envoy proxy listens for inbound requests and handles requests when it receives them. The default is false.",
  ).optional(),
  quicOverride: z.enum(["DISABLE", "ENABLE", "NONE"]).describe(
    "Specifies the QUIC override policy for this TargetHttpsProxy resource. This setting determines whether the load balancer attempts to negotiate QUIC with clients. You can specify NONE, ENABLE, orDISABLE. - When quic-override is set to NONE, Google manages whether QUIC is used. - When quic-override is set to ENABLE, the load balancer uses QUIC when possible. - When quic-override is set to DISABLE, the load balancer doesn't use QUIC. - If the quic-override flag is not specified,NONE is implied.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional TargetHttpsProxy resides. This field is not applicable to global TargetHttpsProxies.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A URL referring to a networksecurity.ServerTlsPolicy resource that describes how the proxy should authenticate inbound traffic. serverTlsPolicy only applies to a globalTargetHttpsProxy attached toglobalForwardingRules with theloadBalancingScheme set to INTERNAL_SELF_MANAGED or EXTERNAL orEXTERNAL_MANAGED or INTERNAL_MANAGED. It also applies to a regional TargetHttpsProxy attached to regional forwardingRules with theloadBalancingScheme set to EXTERNAL_MANAGED orINTERNAL_MANAGED. For details whichServerTlsPolicy resources are accepted withINTERNAL_SELF_MANAGED and which with EXTERNAL,INTERNAL_MANAGED, EXTERNAL_MANAGEDloadBalancingScheme consult ServerTlsPolicy documentation. If left blank, communications are not encrypted.",
  ).optional(),
  sslCertificates: z.array(z.string()).describe(
    "URLs to SslCertificate resources that are used to authenticate connections between users and the load balancer. At least one SSL certificate must be specified. SslCertificates do not apply when the load balancing scheme is set to INTERNAL_SELF_MANAGED. The URLs should refer to a SSL Certificate resource or Certificate Manager Certificate resource. Mixing Classic Certificates and Certificate Manager Certificates is not allowed. Certificate Manager Certificates must include the certificatemanager API namespace. Using Certificate Manager Certificates in this field is not supported by Global external Application Load Balancer or Classic Application Load Balancer, use certificate_map instead. Currently, you may specify up to 15 Classic SSL Certificates or up to 100 Certificate Manager Certificates. Certificate Manager Certificates accepted formats are: - //certificatemanager.googleapis.com/projects/{project}/locations/{location}/certificates/{resourceName}. - https://certificatemanager.googleapis.com/v1alpha1/projects/{project}/locations/{location}/certificates/{resourceName}.",
  ).optional(),
  sslPolicy: z.string().describe(
    "URL of SslPolicy resource that will be associated with the TargetHttpsProxy resource. If not set, the TargetHttpsProxy resource has no SSL policy configured.",
  ).optional(),
  tlsEarlyData: z.enum(["DISABLED", "PERMISSIVE", "STRICT", "UNRESTRICTED"])
    .describe(
      'Specifies whether TLS 1.3 0-RTT Data ("Early Data") should be accepted for this service. Early Data allows a TLS resumption handshake to include the initial application payload (a HTTP request) alongside the handshake, reducing the effective round trips to "zero". This applies to TLS 1.3 connections over TCP (HTTP/2) as well as over UDP (QUIC/h3). This can improve application performance, especially on networks where interruptions may be common, such as on mobile. Requests with Early Data will have the "Early-Data" HTTP header set on the request, with a value of "1", to allow the backend to determine whether Early Data was included. Note: TLS Early Data may allow requests to be replayed, as the data is sent to the backend before the handshake has fully completed. Applications that allow idempotent HTTP methods to make non-idempotent changes, such as a GET request updating a database, should not accept Early Data on those requests, and reject requests with the "Early-Data: 1" HTTP header by returning a HTTP 425 (Too Early) status code, in order to remain RFC compliant. The default value is DISABLED.',
    ).optional(),
  urlMap: z.string().describe(
    "A fully-qualified or valid partial URL to the UrlMap resource that defines the mapping from URL to the BackendService. For example, the following are all valid URLs for specifying a URL map: - https://www.googleapis.compute/v1/projects/project/global/urlMaps/url-map - projects/project/global/urlMaps/url-map - global/urlMaps/url-map",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionTargetHttpsProxies. Registered at `@swamp/gcp/compute/regiontargethttpsproxies`. */
export const model = {
  type: "@swamp/gcp/compute/regiontargethttpsproxies",
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
      description:
        "Represents a Target HTTPS Proxy resource. Google Compute Engine has two Targe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionTargetHttpsProxies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["authorizationPolicy"] !== undefined) {
          body["authorizationPolicy"] = g["authorizationPolicy"];
        }
        if (g["certificateMap"] !== undefined) {
          body["certificateMap"] = g["certificateMap"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["httpKeepAliveTimeoutSec"] !== undefined) {
          body["httpKeepAliveTimeoutSec"] = g["httpKeepAliveTimeoutSec"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["proxyBind"] !== undefined) body["proxyBind"] = g["proxyBind"];
        if (g["quicOverride"] !== undefined) {
          body["quicOverride"] = g["quicOverride"];
        }
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["sslCertificates"] !== undefined) {
          body["sslCertificates"] = g["sslCertificates"];
        }
        if (g["sslPolicy"] !== undefined) body["sslPolicy"] = g["sslPolicy"];
        if (g["tlsEarlyData"] !== undefined) {
          body["tlsEarlyData"] = g["tlsEarlyData"];
        }
        if (g["urlMap"] !== undefined) body["urlMap"] = g["urlMap"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["targetHttpsProxy"] = String(g["name"]);
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
              "project": projectId,
              "region": String(g["region"] ?? ""),
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
      description: "Get a regionTargetHttpsProxies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionTargetHttpsProxies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["targetHttpsProxy"] = args.identifier;
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
      description: "Update regionTargetHttpsProxies attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["targetHttpsProxy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["authorizationPolicy"] !== undefined) {
          body["authorizationPolicy"] = g["authorizationPolicy"];
        }
        if (g["certificateMap"] !== undefined) {
          body["certificateMap"] = g["certificateMap"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["httpKeepAliveTimeoutSec"] !== undefined) {
          body["httpKeepAliveTimeoutSec"] = g["httpKeepAliveTimeoutSec"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["proxyBind"] !== undefined) body["proxyBind"] = g["proxyBind"];
        if (g["quicOverride"] !== undefined) {
          body["quicOverride"] = g["quicOverride"];
        }
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["sslCertificates"] !== undefined) {
          body["sslCertificates"] = g["sslCertificates"];
        }
        if (g["sslPolicy"] !== undefined) body["sslPolicy"] = g["sslPolicy"];
        if (g["tlsEarlyData"] !== undefined) {
          body["tlsEarlyData"] = g["tlsEarlyData"];
        }
        if (g["urlMap"] !== undefined) body["urlMap"] = g["urlMap"];
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
      description: "Delete the regionTargetHttpsProxies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionTargetHttpsProxies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["targetHttpsProxy"] = args.identifier;
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
      description: "Sync regionTargetHttpsProxies state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["targetHttpsProxy"] = identifier;
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
    set_ssl_certificates: {
      description: "set ssl certificates",
      arguments: z.object({
        sslCertificates: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetHttpsProxy"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sslCertificates"] !== undefined) {
          body["sslCertificates"] = args["sslCertificates"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionTargetHttpsProxies.setSslCertificates",
            "path":
              "projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}/setSslCertificates",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetHttpsProxy"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetHttpsProxy": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_url_map: {
      description: "set url map",
      arguments: z.object({
        urlMap: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetHttpsProxy"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["urlMap"] !== undefined) body["urlMap"] = args["urlMap"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionTargetHttpsProxies.setUrlMap",
            "path":
              "projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}/setUrlMap",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetHttpsProxy"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetHttpsProxy": { "location": "path", "required": true },
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
