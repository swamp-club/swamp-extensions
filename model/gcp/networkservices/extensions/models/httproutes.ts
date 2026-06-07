// Auto-generated extension model for @swamp/gcp/networkservices/httproutes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services HttpRoutes.
 *
 * HttpRoute is the resource defining how HTTP traffic should be routed by a Mesh or Gateway resource.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/httpRoutes/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.httpRoutes.get",
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
  "id": "networkservices.projects.locations.httpRoutes.create",
  "path": "v1/{+parent}/httpRoutes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "httpRouteId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.httpRoutes.patch",
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
  "id": "networkservices.projects.locations.httpRoutes.delete",
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
  "id": "networkservices.projects.locations.httpRoutes.list",
  "path": "v1/{+parent}/httpRoutes",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this HttpRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  hostnames: z.array(z.string()).describe(
    'Required. Hostnames define a set of hosts that should match against the HTTP host header to select a HttpRoute to process the request. Hostname is the fully qualified domain name of a network host, as defined by RFC 1123 with the exception that: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or \'-\', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateways must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same Mesh (or Gateways under the same scope), it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the HttpRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this HttpRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the HttpRoute resource. It matches pattern `projects/*/locations/*/httpRoutes/http_route_name>`.",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean().describe(
          "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This translates to the Access-Control-Allow-Credentials header. Default value is false.",
        ).optional(),
        allowHeaders: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Allow-Headers header.",
        ).optional(),
        allowMethods: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Allow-Methods header.",
        ).optional(),
        allowOriginRegexes: z.array(z.unknown()).describe(
          "Specifies the regular expression patterns that match allowed origins. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax.",
        ).optional(),
        allowOrigins: z.array(z.unknown()).describe(
          "Specifies the list of origins that will be allowed to do CORS requests. An origin is allowed if it matches either an item in allow_origins or an item in allow_origin_regexes.",
        ).optional(),
        disabled: z.boolean().describe(
          "If true, the CORS policy is disabled. The default value is false, which indicates that the CORS policy is in effect.",
        ).optional(),
        exposeHeaders: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Expose-Headers header.",
        ).optional(),
        maxAge: z.string().describe(
          "Specifies how long result of a preflight request can be cached in seconds. This translates to the Access-Control-Max-Age header.",
        ).optional(),
      }).describe(
        "The Specification for allowing client side cross-origin requests.",
      ).optional(),
      destinations: z.array(z.object({
        requestHeaderModifier: z.unknown().describe(
          "The specification for modifying HTTP header in HTTP request and HTTP response.",
        ).optional(),
        responseHeaderModifier: z.unknown().describe(
          "The specification for modifying HTTP header in HTTP request and HTTP response.",
        ).optional(),
        serviceName: z.unknown().describe(
          "The URL of a BackendService to route traffic to.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
        ).optional(),
      })).describe("The destination to which traffic should be forwarded.")
        .optional(),
      directResponse: z.object({
        bytesBody: z.string().describe(
          "Optional. Response body as bytes. Maximum body size is 4096B.",
        ).optional(),
        status: z.number().int().describe(
          "Required. Status to return as part of HTTP Response. Must be a positive integer.",
        ).optional(),
        stringBody: z.string().describe(
          "Optional. Response body as a string. Maximum body length is 1024 characters.",
        ).optional(),
      }).describe("Static HTTP response object to be returned.").optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic which will be aborted. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are aborted as part of fault injection before being sent to a destination.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specify a fixed delay before forwarding the request.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic on which delay will be injected. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are delayed as part of fault injection before being sent to a destination.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced by client proxy on a percentage of requests before sending those requests to the destination service. Similarly requests can be aborted by client proxy for a percentage of requests.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
      redirect: z.object({
        hostRedirect: z.string().describe(
          "The host that will be used in the redirect response instead of the one that was supplied in the request.",
        ).optional(),
        httpsRedirect: z.boolean().describe(
          "If set to true, the URL scheme in the redirected request is set to https. If set to false, the URL scheme of the redirected request will remain the same as that of the request. The default is set to false.",
        ).optional(),
        pathRedirect: z.string().describe(
          "The path that will be used in the redirect response instead of the one that was supplied in the request. path_redirect can not be supplied together with prefix_redirect. Supply one alone or neither. If neither is supplied, the path of the original request will be used for the redirect.",
        ).optional(),
        portRedirect: z.number().int().describe(
          "The port that will be used in the redirected request instead of the one that was supplied in the request.",
        ).optional(),
        prefixRewrite: z.string().describe(
          "Indicates that during redirection, the matched prefix (or path) should be swapped with this value. This option allows URLs be dynamically created based on the request.",
        ).optional(),
        responseCode: z.enum([
          "RESPONSE_CODE_UNSPECIFIED",
          "MOVED_PERMANENTLY_DEFAULT",
          "FOUND",
          "SEE_OTHER",
          "TEMPORARY_REDIRECT",
          "PERMANENT_REDIRECT",
        ]).describe("The HTTP Status code to use for the redirect.").optional(),
        stripQuery: z.boolean().describe(
          "if set to true, any accompanying query portion of the original URL is removed prior to redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("The specification for redirecting traffic.").optional(),
      requestHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()).describe(
          "Add the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
        remove: z.array(z.unknown()).describe(
          "Remove headers (matching by header names) specified in the list.",
        ).optional(),
        set: z.record(z.string(), z.unknown()).describe(
          "Completely overwrite/replace the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
      }).describe(
        "The specification for modifying HTTP header in HTTP request and HTTP response.",
      ).optional(),
      requestMirrorPolicy: z.object({
        destination: z.object({
          requestHeaderModifier: z.unknown().describe(
            "The specification for modifying HTTP header in HTTP request and HTTP response.",
          ).optional(),
          responseHeaderModifier: z.unknown().describe(
            "The specification for modifying HTTP header in HTTP request and HTTP response.",
          ).optional(),
          serviceName: z.unknown().describe(
            "The URL of a BackendService to route traffic to.",
          ).optional(),
          weight: z.unknown().describe(
            "Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
          ).optional(),
        }).describe(
          "Specifications of a destination to which the request should be routed to.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "Optional. The percentage of requests to get mirrored to the desired destination.",
        ).optional(),
      }).describe(
        "Specifies the policy on how requests are shadowed to a separate mirrored destination service. The proxy does not wait for responses from the shadow service. Prior to sending traffic to the shadow service, the host/authority header is suffixed with -shadow. Mirroring is currently not supported for Cloud Run destinations.",
      ).optional(),
      responseHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()).describe(
          "Add the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
        remove: z.array(z.unknown()).describe(
          "Remove headers (matching by header names) specified in the list.",
        ).optional(),
        set: z.record(z.string(), z.unknown()).describe(
          "Completely overwrite/replace the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
      }).describe(
        "The specification for modifying HTTP header in HTTP request and HTTP response.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1.",
        ).optional(),
        perTryTimeout: z.string().describe(
          "Specifies a non-zero timeout per retry attempt.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: 5xx: Proxy will attempt a retry if the destination service responds with any 5xx response code, of if the destination service does not respond at all, example: disconnect, reset, read timeout, connection failure and refused streams. gateway-error: Similar to 5xx, but only applies to response codes 502, 503, 504. reset: Proxy will attempt a retry if the destination service does not respond at all (disconnect/reset/read timeout) connect-failure: Proxy will retry on failures connecting to destination for example due to connection timeouts. retriable-4xx: Proxy will retry fro retriable 4xx response codes. Currently the only retriable error supported is 409. refused-stream: Proxy will retry if the destination resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry.",
        ).optional(),
      }).describe("The specifications for retries.").optional(),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string().describe(
          "Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration.",
        ).optional(),
      }).describe(
        'The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.',
      ).optional(),
      timeout: z.string().describe(
        "Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries.",
      ).optional(),
      urlRewrite: z.object({
        hostRewrite: z.string().describe(
          "Prior to forwarding the request to the selected destination, the requests host header is replaced by this value.",
        ).optional(),
        pathPrefixRewrite: z.string().describe(
          "Prior to forwarding the request to the selected destination, the matching portion of the requests path is replaced by this value.",
        ).optional(),
      }).describe(
        "The specification for modifying the URL of the request, prior to forwarding the request to the destination.",
      ).optional(),
    }).describe(
      "The specifications for routing traffic and applying associated policies.",
    ).optional(),
    matches: z.array(z.object({
      fullPathMatch: z.string().describe(
        "The HTTP request path value should exactly match this value. Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
      headers: z.array(z.unknown()).describe(
        "Specifies a list of HTTP request headers to match against. ALL of the supplied headers must be matched.",
      ).optional(),
      ignoreCase: z.boolean().describe(
        "Specifies if prefix_match and full_path_match matches are case sensitive. The default value is false.",
      ).optional(),
      prefixMatch: z.string().describe(
        "The HTTP request path value must begin with specified prefix_match. prefix_match must begin with a /. Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
      queryParameters: z.array(z.unknown()).describe(
        "Specifies a list of query parameters to match against. ALL of the query parameters must be matched.",
      ).optional(),
      regexMatch: z.string().describe(
        "The HTTP request path value must satisfy the regular expression specified by regex_match after removing any query parameters and anchor supplied with the original URL. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
    })).describe(
      "A list of matches define conditions used for matching the rule against incoming HTTP requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic. If a default rule is desired to be configured, add a rule with no matches specified to the end of the rules list.",
    ).optional(),
  })).describe(
    "Required. Rules that define how traffic is routed and handled. Rules will be matched sequentially based on the RouteMatch specified for the rule.",
  ).optional(),
  httpRouteId: z.string().describe(
    "Required. Short name of the HttpRoute resource to be created.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  gateways: z.array(z.string()).optional(),
  hostnames: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  meshes: z.array(z.string()).optional(),
  name: z.string(),
  rules: z.array(z.object({
    action: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean(),
        allowHeaders: z.array(z.unknown()),
        allowMethods: z.array(z.unknown()),
        allowOriginRegexes: z.array(z.unknown()),
        allowOrigins: z.array(z.unknown()),
        disabled: z.boolean(),
        exposeHeaders: z.array(z.unknown()),
        maxAge: z.string(),
      }),
      destinations: z.array(z.object({
        requestHeaderModifier: z.unknown(),
        responseHeaderModifier: z.unknown(),
        serviceName: z.unknown(),
        weight: z.unknown(),
      })),
      directResponse: z.object({
        bytesBody: z.string(),
        status: z.number(),
        stringBody: z.string(),
      }),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown(),
          percentage: z.unknown(),
        }),
        delay: z.object({
          fixedDelay: z.unknown(),
          percentage: z.unknown(),
        }),
      }),
      idleTimeout: z.string(),
      redirect: z.object({
        hostRedirect: z.string(),
        httpsRedirect: z.boolean(),
        pathRedirect: z.string(),
        portRedirect: z.number(),
        prefixRewrite: z.string(),
        responseCode: z.string(),
        stripQuery: z.boolean(),
      }),
      requestHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()),
        remove: z.array(z.unknown()),
        set: z.record(z.string(), z.unknown()),
      }),
      requestMirrorPolicy: z.object({
        destination: z.object({
          requestHeaderModifier: z.unknown(),
          responseHeaderModifier: z.unknown(),
          serviceName: z.unknown(),
          weight: z.unknown(),
        }),
        mirrorPercent: z.number(),
      }),
      responseHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()),
        remove: z.array(z.unknown()),
        set: z.record(z.string(), z.unknown()),
      }),
      retryPolicy: z.object({
        numRetries: z.number(),
        perTryTimeout: z.string(),
        retryConditions: z.array(z.unknown()),
      }),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string(),
      }),
      timeout: z.string(),
      urlRewrite: z.object({
        hostRewrite: z.string(),
        pathPrefixRewrite: z.string(),
      }),
    }),
    matches: z.array(z.object({
      fullPathMatch: z.string(),
      headers: z.array(z.unknown()),
      ignoreCase: z.boolean(),
      prefixMatch: z.string(),
      queryParameters: z.array(z.unknown()),
      regexMatch: z.string(),
    })),
  })).optional(),
  selfLink: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  gateways: z.array(z.string()).describe(
    "Optional. Gateways defines a list of gateways this HttpRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/`",
  ).optional(),
  hostnames: z.array(z.string()).describe(
    'Required. Hostnames define a set of hosts that should match against the HTTP host header to select a HttpRoute to process the request. Hostname is the fully qualified domain name of a network host, as defined by RFC 1123 with the exception that: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or \'-\', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateways must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same Mesh (or Gateways under the same scope), it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the HttpRoute resource.",
  ).optional(),
  meshes: z.array(z.string()).describe(
    "Optional. Meshes defines a list of meshes this HttpRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the HttpRoute resource. It matches pattern `projects/*/locations/*/httpRoutes/http_route_name>`.",
  ).optional(),
  rules: z.array(z.object({
    action: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean().describe(
          "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This translates to the Access-Control-Allow-Credentials header. Default value is false.",
        ).optional(),
        allowHeaders: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Allow-Headers header.",
        ).optional(),
        allowMethods: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Allow-Methods header.",
        ).optional(),
        allowOriginRegexes: z.array(z.unknown()).describe(
          "Specifies the regular expression patterns that match allowed origins. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax.",
        ).optional(),
        allowOrigins: z.array(z.unknown()).describe(
          "Specifies the list of origins that will be allowed to do CORS requests. An origin is allowed if it matches either an item in allow_origins or an item in allow_origin_regexes.",
        ).optional(),
        disabled: z.boolean().describe(
          "If true, the CORS policy is disabled. The default value is false, which indicates that the CORS policy is in effect.",
        ).optional(),
        exposeHeaders: z.array(z.unknown()).describe(
          "Specifies the content for Access-Control-Expose-Headers header.",
        ).optional(),
        maxAge: z.string().describe(
          "Specifies how long result of a preflight request can be cached in seconds. This translates to the Access-Control-Max-Age header.",
        ).optional(),
      }).describe(
        "The Specification for allowing client side cross-origin requests.",
      ).optional(),
      destinations: z.array(z.object({
        requestHeaderModifier: z.unknown().describe(
          "The specification for modifying HTTP header in HTTP request and HTTP response.",
        ).optional(),
        responseHeaderModifier: z.unknown().describe(
          "The specification for modifying HTTP header in HTTP request and HTTP response.",
        ).optional(),
        serviceName: z.unknown().describe(
          "The URL of a BackendService to route traffic to.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
        ).optional(),
      })).describe("The destination to which traffic should be forwarded.")
        .optional(),
      directResponse: z.object({
        bytesBody: z.string().describe(
          "Optional. Response body as bytes. Maximum body size is 4096B.",
        ).optional(),
        status: z.number().int().describe(
          "Required. Status to return as part of HTTP Response. Must be a positive integer.",
        ).optional(),
        stringBody: z.string().describe(
          "Optional. Response body as a string. Maximum body length is 1024 characters.",
        ).optional(),
      }).describe("Static HTTP response object to be returned.").optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic which will be aborted. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are aborted as part of fault injection before being sent to a destination.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specify a fixed delay before forwarding the request.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic on which delay will be injected. The value must be between [0, 100]",
          ).optional(),
        }).describe(
          "Specification of how client requests are delayed as part of fault injection before being sent to a destination.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced by client proxy on a percentage of requests before sending those requests to the destination service. Similarly requests can be aborted by client proxy for a percentage of requests.",
      ).optional(),
      idleTimeout: z.string().describe(
        "Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled.",
      ).optional(),
      redirect: z.object({
        hostRedirect: z.string().describe(
          "The host that will be used in the redirect response instead of the one that was supplied in the request.",
        ).optional(),
        httpsRedirect: z.boolean().describe(
          "If set to true, the URL scheme in the redirected request is set to https. If set to false, the URL scheme of the redirected request will remain the same as that of the request. The default is set to false.",
        ).optional(),
        pathRedirect: z.string().describe(
          "The path that will be used in the redirect response instead of the one that was supplied in the request. path_redirect can not be supplied together with prefix_redirect. Supply one alone or neither. If neither is supplied, the path of the original request will be used for the redirect.",
        ).optional(),
        portRedirect: z.number().int().describe(
          "The port that will be used in the redirected request instead of the one that was supplied in the request.",
        ).optional(),
        prefixRewrite: z.string().describe(
          "Indicates that during redirection, the matched prefix (or path) should be swapped with this value. This option allows URLs be dynamically created based on the request.",
        ).optional(),
        responseCode: z.enum([
          "RESPONSE_CODE_UNSPECIFIED",
          "MOVED_PERMANENTLY_DEFAULT",
          "FOUND",
          "SEE_OTHER",
          "TEMPORARY_REDIRECT",
          "PERMANENT_REDIRECT",
        ]).describe("The HTTP Status code to use for the redirect.").optional(),
        stripQuery: z.boolean().describe(
          "if set to true, any accompanying query portion of the original URL is removed prior to redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("The specification for redirecting traffic.").optional(),
      requestHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()).describe(
          "Add the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
        remove: z.array(z.unknown()).describe(
          "Remove headers (matching by header names) specified in the list.",
        ).optional(),
        set: z.record(z.string(), z.unknown()).describe(
          "Completely overwrite/replace the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
      }).describe(
        "The specification for modifying HTTP header in HTTP request and HTTP response.",
      ).optional(),
      requestMirrorPolicy: z.object({
        destination: z.object({
          requestHeaderModifier: z.unknown().describe(
            "The specification for modifying HTTP header in HTTP request and HTTP response.",
          ).optional(),
          responseHeaderModifier: z.unknown().describe(
            "The specification for modifying HTTP header in HTTP request and HTTP response.",
          ).optional(),
          serviceName: z.unknown().describe(
            "The URL of a BackendService to route traffic to.",
          ).optional(),
          weight: z.unknown().describe(
            "Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them.",
          ).optional(),
        }).describe(
          "Specifications of a destination to which the request should be routed to.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "Optional. The percentage of requests to get mirrored to the desired destination.",
        ).optional(),
      }).describe(
        "Specifies the policy on how requests are shadowed to a separate mirrored destination service. The proxy does not wait for responses from the shadow service. Prior to sending traffic to the shadow service, the host/authority header is suffixed with -shadow. Mirroring is currently not supported for Cloud Run destinations.",
      ).optional(),
      responseHeaderModifier: z.object({
        add: z.record(z.string(), z.unknown()).describe(
          "Add the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
        remove: z.array(z.unknown()).describe(
          "Remove headers (matching by header names) specified in the list.",
        ).optional(),
        set: z.record(z.string(), z.unknown()).describe(
          "Completely overwrite/replace the headers with given map where key is the name of the header, value is the value of the header.",
        ).optional(),
      }).describe(
        "The specification for modifying HTTP header in HTTP request and HTTP response.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1.",
        ).optional(),
        perTryTimeout: z.string().describe(
          "Specifies a non-zero timeout per retry attempt.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: 5xx: Proxy will attempt a retry if the destination service responds with any 5xx response code, of if the destination service does not respond at all, example: disconnect, reset, read timeout, connection failure and refused streams. gateway-error: Similar to 5xx, but only applies to response codes 502, 503, 504. reset: Proxy will attempt a retry if the destination service does not respond at all (disconnect/reset/read timeout) connect-failure: Proxy will retry on failures connecting to destination for example due to connection timeouts. retriable-4xx: Proxy will retry fro retriable 4xx response codes. Currently the only retriable error supported is 409. refused-stream: Proxy will retry if the destination resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry.",
        ).optional(),
      }).describe("The specifications for retries.").optional(),
      statefulSessionAffinity: z.object({
        cookieTtl: z.string().describe(
          "Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration.",
        ).optional(),
      }).describe(
        'The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.',
      ).optional(),
      timeout: z.string().describe(
        "Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries.",
      ).optional(),
      urlRewrite: z.object({
        hostRewrite: z.string().describe(
          "Prior to forwarding the request to the selected destination, the requests host header is replaced by this value.",
        ).optional(),
        pathPrefixRewrite: z.string().describe(
          "Prior to forwarding the request to the selected destination, the matching portion of the requests path is replaced by this value.",
        ).optional(),
      }).describe(
        "The specification for modifying the URL of the request, prior to forwarding the request to the destination.",
      ).optional(),
    }).describe(
      "The specifications for routing traffic and applying associated policies.",
    ).optional(),
    matches: z.array(z.object({
      fullPathMatch: z.string().describe(
        "The HTTP request path value should exactly match this value. Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
      headers: z.array(z.unknown()).describe(
        "Specifies a list of HTTP request headers to match against. ALL of the supplied headers must be matched.",
      ).optional(),
      ignoreCase: z.boolean().describe(
        "Specifies if prefix_match and full_path_match matches are case sensitive. The default value is false.",
      ).optional(),
      prefixMatch: z.string().describe(
        "The HTTP request path value must begin with specified prefix_match. prefix_match must begin with a /. Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
      queryParameters: z.array(z.unknown()).describe(
        "Specifies a list of query parameters to match against. ALL of the query parameters must be matched.",
      ).optional(),
      regexMatch: z.string().describe(
        "The HTTP request path value must satisfy the regular expression specified by regex_match after removing any query parameters and anchor supplied with the original URL. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax Only one of full_path_match, prefix_match, or regex_match should be used.",
      ).optional(),
    })).describe(
      "A list of matches define conditions used for matching the rule against incoming HTTP requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic. If a default rule is desired to be configured, add a rule with no matches specified to the end of the rules list.",
    ).optional(),
  })).describe(
    "Required. Rules that define how traffic is routed and handled. Rules will be matched sequentially based on the RouteMatch specified for the rule.",
  ).optional(),
  httpRouteId: z.string().describe(
    "Required. Short name of the HttpRoute resource to be created.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Network Services HttpRoutes. Registered at `@swamp/gcp/networkservices/httproutes`. */
export const model = {
  type: "@swamp/gcp/networkservices/httproutes",
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
      toVersion: "2026.05.04.1",
      description: "Added: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { requestId: _requestId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { requestId: _requestId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: requestId",
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
      description: "Removed: requestId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { requestId: _requestId, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: requestId",
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
        "HttpRoute is the resource defining how HTTP traffic should be routed by a Mes...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a httpRoutes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gateways"] !== undefined) body["gateways"] = g["gateways"];
        if (g["hostnames"] !== undefined) body["hostnames"] = g["hostnames"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["httpRouteId"] !== undefined) {
          body["httpRouteId"] = g["httpRouteId"];
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
          credentials,
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
      description: "Get a httpRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the httpRoutes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update httpRoutes attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gateways"] !== undefined) body["gateways"] = g["gateways"];
        if (g["hostnames"] !== undefined) body["hostnames"] = g["hostnames"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["meshes"] !== undefined) body["meshes"] = g["meshes"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
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
      description: "Delete the httpRoutes",
      arguments: z.object({
        identifier: z.string().describe("The name of the httpRoutes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync httpRoutes state from GCP",
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
      description: "List httpRoutes resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression to restrict the list.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of HttpRoutes to return per call.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "httpRoutes",
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
