// Auto-generated extension model for @swamp/gcp/compute/healthchecks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine HealthChecks.
 *
 * Represents a health check resource. Google Compute Engine has two health check resources: * [Regional](/compute/docs/reference/rest/v1/regionHealthChecks) * [Global](/compute/docs/reference/rest/v1/healthChecks) These health check resources can be used for load balancing and for autohealing VMs in a managed instance group (MIG). **Load balancing** Health check requirements vary depending on the type of load balancer. For details about the type of health check supported for each load balancer and corresponding backend type, see Health checks overview: Load balancer guide. **Autohealing in MIGs** The health checks that you use for autohealing VMs in a MIG can be either regional or global. For more information, see Set up an application health check and autohealing. For more information, seeHealth checks overview.
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
  "id": "compute.healthChecks.get",
  "path": "projects/{project}/global/healthChecks/{healthCheck}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "healthCheck",
  ],
  "parameters": {
    "healthCheck": {
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
  "id": "compute.healthChecks.insert",
  "path": "projects/{project}/global/healthChecks",
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

const UPDATE_CONFIG = {
  "id": "compute.healthChecks.update",
  "path": "projects/{project}/global/healthChecks/{healthCheck}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "healthCheck",
  ],
  "parameters": {
    "healthCheck": {
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
  "id": "compute.healthChecks.delete",
  "path": "projects/{project}/global/healthChecks/{healthCheck}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "healthCheck",
  ],
  "parameters": {
    "healthCheck": {
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
  "id": "compute.healthChecks.list",
  "path": "projects/{project}/global/healthChecks",
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
  checkIntervalSec: z.number().int().describe(
    "How often (in seconds) to send a health check. The default value is 5 seconds.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  grpcHealthCheck: z.object({
    grpcServiceName: z.string().describe(
      "The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
  }).optional(),
  grpcTlsHealthCheck: z.object({
    grpcServiceName: z.string().describe(
      "The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535.",
    ).optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
  }).optional(),
  healthyThreshold: z.number().int().describe(
    "A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2.",
  ).optional(),
  http2HealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTP/2 health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTP/2 health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTP/2 health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  httpHealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTP health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Also supported in legacy HTTP health checks for target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example,GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for pass-through load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTP health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTP health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  httpsHealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTPS health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTPS health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTPS health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "Indicates whether or not to export logs. This is false by default, which means no health check logging will be done.",
    ).optional(),
  }).describe(
    "Configuration of logging on a health check. If logging is enabled, logs will be exported to Stackdriver.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. For example, a name that is 1-63 characters long, matches the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`, and otherwise complies with RFC1035. This regular expression describes a name where the first character is a lowercase letter, and all following characters are a dash, lowercase letter, or digit, except the last character, which isn't a dash.",
    ).optional(),
  sourceRegions: z.array(z.string()).describe(
    "The list of cloud regions from which health checks are performed. If any regions are specified, then exactly 3 regions should be specified. The region names must be valid names of Google Cloud regions. This can only be set for global health check. If this list is non-empty, then there are restrictions on what other health check fields are supported and what other resources can use this health check: - SSL, HTTP2, and GRPC protocols are not supported. - The TCP request field is not supported. - The proxyHeader field for HTTP, HTTPS, and TCP is not supported. - The checkIntervalSec field must be at least 30. - The health check cannot be used with BackendService nor with managed instance group auto-healing.",
  ).optional(),
  sslHealthCheck: z.object({
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    request: z.string().describe(
      "Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection and SSL handshake.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based SSL health check. In addition to establishing a TCP connection and the TLS handshake, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp",
    ).optional(),
  }).optional(),
  tcpHealthCheck: z.object({
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    request: z.string().describe(
      "Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based TCP health check. In addition to establishing a TCP connection, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp",
    ).optional(),
  }).optional(),
  timeoutSec: z.number().int().describe(
    "How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec.",
  ).optional(),
  type: z.enum([
    "GRPC",
    "GRPC_WITH_TLS",
    "HTTP",
    "HTTP2",
    "HTTPS",
    "INVALID",
    "SSL",
    "TCP",
  ]).describe(
    "Specifies the type of the healthCheck, either TCP,SSL, HTTP, HTTPS,HTTP2 or GRPC. Exactly one of the protocol-specific health check fields must be specified, which must matchtype field.",
  ).optional(),
  unhealthyThreshold: z.number().int().describe(
    "A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  checkIntervalSec: z.number().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  grpcHealthCheck: z.object({
    grpcServiceName: z.string(),
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
  }).optional(),
  grpcTlsHealthCheck: z.object({
    grpcServiceName: z.string(),
    port: z.number(),
    portSpecification: z.string(),
  }).optional(),
  healthyThreshold: z.number().optional(),
  http2HealthCheck: z.object({
    host: z.string(),
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
    proxyHeader: z.string(),
    requestPath: z.string(),
    response: z.string(),
  }).optional(),
  httpHealthCheck: z.object({
    host: z.string(),
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
    proxyHeader: z.string(),
    requestPath: z.string(),
    response: z.string(),
  }).optional(),
  httpsHealthCheck: z.object({
    host: z.string(),
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
    proxyHeader: z.string(),
    requestPath: z.string(),
    response: z.string(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  logConfig: z.object({
    enable: z.boolean(),
  }).optional(),
  name: z.string(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  sourceRegions: z.array(z.string()).optional(),
  sslHealthCheck: z.object({
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
    proxyHeader: z.string(),
    request: z.string(),
    response: z.string(),
  }).optional(),
  tcpHealthCheck: z.object({
    port: z.number(),
    portName: z.string(),
    portSpecification: z.string(),
    proxyHeader: z.string(),
    request: z.string(),
    response: z.string(),
  }).optional(),
  timeoutSec: z.number().optional(),
  type: z.string().optional(),
  unhealthyThreshold: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  checkIntervalSec: z.number().int().describe(
    "How often (in seconds) to send a health check. The default value is 5 seconds.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  grpcHealthCheck: z.object({
    grpcServiceName: z.string().describe(
      "The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
  }).optional(),
  grpcTlsHealthCheck: z.object({
    grpcServiceName: z.string().describe(
      "The gRPC service name for the health check. This field is optional. The value of grpc_service_name has the following meanings by convention: - Empty service_name means the overall status of all services at the backend. - Non-empty service_name means the health of that gRPC service, as defined by the owner of the service. The grpc_service_name can only be ASCII.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. Valid values are 1 through 65535.",
    ).optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
  }).optional(),
  healthyThreshold: z.number().int().describe(
    "A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2.",
  ).optional(),
  http2HealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTP/2 health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTP/2 health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTP/2 health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  httpHealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTP health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Also supported in legacy HTTP health checks for target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example,GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for pass-through load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTP health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTP health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  httpsHealthCheck: z.object({
    host: z.string().describe(
      "The value of the host header in the HTTPS health check request. If left empty (default value), the host header is set to the destination IP address to which health check packets are sent. The destination IP address depends on the type of load balancer. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#hc-packet-dest",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    requestPath: z.string().describe(
      "The request path of the HTTPS health check request. The default value is/. Must comply withRFC3986.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based HTTPS health check. In addition to the required HTTP 200 (OK) status code, you can configure the health check to pass only when the backend sends this specific ASCII response string within the first 1024 bytes of the HTTP response body. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-http",
    ).optional(),
  }).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "Indicates whether or not to export logs. This is false by default, which means no health check logging will be done.",
    ).optional(),
  }).describe(
    "Configuration of logging on a health check. If logging is enabled, logs will be exported to Stackdriver.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. For example, a name that is 1-63 characters long, matches the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`, and otherwise complies with RFC1035. This regular expression describes a name where the first character is a lowercase letter, and all following characters are a dash, lowercase letter, or digit, except the last character, which isn't a dash.",
    ).optional(),
  sourceRegions: z.array(z.string()).describe(
    "The list of cloud regions from which health checks are performed. If any regions are specified, then exactly 3 regions should be specified. The region names must be valid names of Google Cloud regions. This can only be set for global health check. If this list is non-empty, then there are restrictions on what other health check fields are supported and what other resources can use this health check: - SSL, HTTP2, and GRPC protocols are not supported. - The TCP request field is not supported. - The proxyHeader field for HTTP, HTTPS, and TCP is not supported. - The checkIntervalSec field must be at least 30. - The health check cannot be used with BackendService nor with managed instance group auto-healing.",
  ).optional(),
  sslHealthCheck: z.object({
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    request: z.string().describe(
      "Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection and SSL handshake.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based SSL health check. In addition to establishing a TCP connection and the TLS handshake, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp",
    ).optional(),
  }).optional(),
  tcpHealthCheck: z.object({
    port: z.number().int().describe(
      "The TCP port number to which the health check prober sends packets. The default value is 80. Valid values are 1 through65535.",
    ).optional(),
    portName: z.string().describe("Not supported.").optional(),
    portSpecification: z.enum([
      "USE_FIXED_PORT",
      "USE_NAMED_PORT",
      "USE_SERVING_PORT",
    ]).describe(
      "Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports.",
    ).optional(),
    proxyHeader: z.enum(["NONE", "PROXY_V1"]).describe(
      "Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE.",
    ).optional(),
    request: z.string().describe(
      "Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection.",
    ).optional(),
    response: z.string().describe(
      "Creates a content-based TCP health check. In addition to establishing a TCP connection, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp",
    ).optional(),
  }).optional(),
  timeoutSec: z.number().int().describe(
    "How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have greater value than checkIntervalSec.",
  ).optional(),
  type: z.enum([
    "GRPC",
    "GRPC_WITH_TLS",
    "HTTP",
    "HTTP2",
    "HTTPS",
    "INVALID",
    "SSL",
    "TCP",
  ]).describe(
    "Specifies the type of the healthCheck, either TCP,SSL, HTTP, HTTPS,HTTP2 or GRPC. Exactly one of the protocol-specific health check fields must be specified, which must matchtype field.",
  ).optional(),
  unhealthyThreshold: z.number().int().describe(
    "A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine HealthChecks. Registered at `@swamp/gcp/compute/healthchecks`. */
export const model = {
  type: "@swamp/gcp/compute/healthchecks",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a health check resource. Google Compute Engine has two health chec...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a healthChecks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["checkIntervalSec"] !== undefined) {
          body["checkIntervalSec"] = g["checkIntervalSec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["grpcHealthCheck"] !== undefined) {
          body["grpcHealthCheck"] = g["grpcHealthCheck"];
        }
        if (g["grpcTlsHealthCheck"] !== undefined) {
          body["grpcTlsHealthCheck"] = g["grpcTlsHealthCheck"];
        }
        if (g["healthyThreshold"] !== undefined) {
          body["healthyThreshold"] = g["healthyThreshold"];
        }
        if (g["http2HealthCheck"] !== undefined) {
          body["http2HealthCheck"] = g["http2HealthCheck"];
        }
        if (g["httpHealthCheck"] !== undefined) {
          body["httpHealthCheck"] = g["httpHealthCheck"];
        }
        if (g["httpsHealthCheck"] !== undefined) {
          body["httpsHealthCheck"] = g["httpsHealthCheck"];
        }
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sourceRegions"] !== undefined) {
          body["sourceRegions"] = g["sourceRegions"];
        }
        if (g["sslHealthCheck"] !== undefined) {
          body["sslHealthCheck"] = g["sslHealthCheck"];
        }
        if (g["tcpHealthCheck"] !== undefined) {
          body["tcpHealthCheck"] = g["tcpHealthCheck"];
        }
        if (g["timeoutSec"] !== undefined) body["timeoutSec"] = g["timeoutSec"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["unhealthyThreshold"] !== undefined) {
          body["unhealthyThreshold"] = g["unhealthyThreshold"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["healthCheck"] = String(g["name"]);
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
      description: "Get a healthChecks",
      arguments: z.object({
        identifier: z.string().describe("The name of the healthChecks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["healthCheck"] = args.identifier;
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
      description: "Update healthChecks attributes",
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
        params["healthCheck"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["checkIntervalSec"] !== undefined) {
          body["checkIntervalSec"] = g["checkIntervalSec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["grpcHealthCheck"] !== undefined) {
          body["grpcHealthCheck"] = g["grpcHealthCheck"];
        }
        if (g["grpcTlsHealthCheck"] !== undefined) {
          body["grpcTlsHealthCheck"] = g["grpcTlsHealthCheck"];
        }
        if (g["healthyThreshold"] !== undefined) {
          body["healthyThreshold"] = g["healthyThreshold"];
        }
        if (g["http2HealthCheck"] !== undefined) {
          body["http2HealthCheck"] = g["http2HealthCheck"];
        }
        if (g["httpHealthCheck"] !== undefined) {
          body["httpHealthCheck"] = g["httpHealthCheck"];
        }
        if (g["httpsHealthCheck"] !== undefined) {
          body["httpsHealthCheck"] = g["httpsHealthCheck"];
        }
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sourceRegions"] !== undefined) {
          body["sourceRegions"] = g["sourceRegions"];
        }
        if (g["sslHealthCheck"] !== undefined) {
          body["sslHealthCheck"] = g["sslHealthCheck"];
        }
        if (g["tcpHealthCheck"] !== undefined) {
          body["tcpHealthCheck"] = g["tcpHealthCheck"];
        }
        if (g["timeoutSec"] !== undefined) body["timeoutSec"] = g["timeoutSec"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["unhealthyThreshold"] !== undefined) {
          body["unhealthyThreshold"] = g["unhealthyThreshold"];
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
          UPDATE_CONFIG,
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
      description: "Delete the healthChecks",
      arguments: z.object({
        identifier: z.string().describe("The name of the healthChecks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["healthCheck"] = args.identifier;
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
      description: "Sync healthChecks state from GCP",
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
          params["healthCheck"] = identifier;
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.healthChecks.testIamPermissions",
            "path":
              "projects/{project}/global/healthChecks/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
